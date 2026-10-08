/* 일반물리학 · 회전 운동과 만유인력
 * 대학 1학년 일반물리 수준. 회전 운동학, 관성 모멘트와 회전 운동 에너지(평행축 정리), 돌림힘과 회전의 제2법칙,
 * 굴림 운동, 각운동량 보존, 만유인력 법칙·케플러 법칙·탈출 속도.
 * 계산 문제(등각가속도 운동, 회전 운동 에너지, 돌림힘과 각가속도, 각운동량 보존, 경사면 굴림, 행성 비교)는 생성기로 낸다. g = 9.8 m/s². */
Tutor.registerUnit({
  id: 'sci-u-phy-05',
  course: 'sci-u-phy',
  title: '회전 운동과 만유인력',
  summary: '각속도·관성 모멘트·돌림힘으로 강체의 회전을 기술하고, 각운동량 보존과 만유인력 법칙으로 행성과 위성의 운동을 이해합니다.',
  goals: [
    '각변위·각속도·각가속도로 회전을 기술하고, 등각가속도 운동의 식을 쓸 수 있다.',
    '관성 모멘트와 평행축 정리로 회전 운동 에너지를 구하고, 돌림힘과 각가속도의 관계($\\sum\\tau=I\\alpha$)를 적용할 수 있다.',
    '굴림 운동의 에너지를 분석하고, 각운동량 보존으로 회전 속도의 변화를 설명할 수 있다.',
    '만유인력 법칙으로 중력 가속도·궤도 속력·탈출 속도를 구하고, 케플러 법칙을 설명할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '회전 운동학 — 각변위, 각속도, 각가속도',
      body: '고정된 축을 중심으로 도는 강체의 모든 점은 같은 각도만큼 돕니다. 그래서 회전은 **각**으로 기술합니다.\n\n- **각변위** $\\Delta\\theta$: 돈 각도. 단위는 **라디안**(rad)입니다. 반지름 $r$인 원에서 호의 길이가 $s$이면 $\\theta=\\dfrac{s}{r}$이고, 한 바퀴는 $2\\pi$ rad $=360^\\circ$입니다.\n- **각속도** $\\omega=\\dfrac{d\\theta}{dt}$ (rad/s), **각가속도** $\\alpha=\\dfrac{d\\omega}{dt}$ (rad/s²)\n\n각가속도가 일정하면 직선 운동의 등가속도 식과 똑같은 꼴의 식이 성립합니다($x\\to\\theta$, $v\\to\\omega$, $a\\to\\alpha$).\n\n$\\omega=\\omega_0+\\alpha t,\\qquad \\theta=\\omega_0t+\\frac{1}{2}\\alpha t^2,\\qquad \\omega^2=\\omega_0^2+2\\alpha\\theta$\n\n축에서 $r$만큼 떨어진 점의 속력·가속도와는 다음처럼 이어집니다.\n\n$v=r\\omega,\\qquad a_t=r\\alpha\\ (\\text{접선 가속도}),\\qquad a_c=\\dfrac{v^2}{r}=r\\omega^2\\ (\\text{구심 가속도})$\n\n> ⚠️ $v=r\\omega$는 $\\omega$가 rad/s일 때만 성립합니다. 분당 회전수(rpm)는 $1\\ \\text{rpm}=\\dfrac{2\\pi}{60}$ rad/s로 바꿔서 씁니다.',
      easy: '회전목마를 떠올려 보세요. 가운데 기둥 가까이 탄 사람과 바깥쪽 말에 탄 사람은 한 바퀴를 도는 데 걸리는 시간이 같습니다. 그래서 "1초에 몇 도(몇 라디안) 도는가"인 각속도는 둘이 같습니다.\n\n하지만 바깥쪽 사람은 같은 시간에 더 큰 원을 돌므로 실제로 달리는 빠르기는 더 큽니다. 그것이 $v=r\\omega$입니다. 반지름이 2배면 빠르기도 2배입니다.',
      check: {
        type: 'short', check: 'number', unit: 'rad',
        q: '정지해 있던 바퀴가 일정한 각가속도 2 rad/s²로 3 s 동안 돌았습니다. 그동안 바퀴가 돈 각변위는 몇 rad입니까?',
        answer: '9',
        wrong: [
          { a: '18', why: '$\\frac{1}{2}$을 빠뜨렸습니다. 정지에서 출발하면 $\\theta=\\frac{1}{2}\\alpha t^2$입니다.' },
          { a: '6', why: '3 s 뒤의 각속도 $\\omega=\\alpha t=6$ rad/s를 구했습니다. 묻는 것은 돈 각도입니다.' },
        ],
        explain: '$\\theta=\\omega_0t+\\frac{1}{2}\\alpha t^2=0+\\frac{1}{2}\\times 2\\times 3^2=9$ rad입니다. 직선 운동의 $x=\\frac{1}{2}at^2$과 같은 꼴입니다.',
      },
    },
    {
      title: '관성 모멘트와 회전 운동 에너지, 평행축 정리',
      body: '강체가 각속도 $\\omega$로 돌 때, 축에서 $r_i$ 떨어진 질량 $m_i$는 속력 $r_i\\omega$로 움직입니다. 운동 에너지를 모두 더하면\n\n$K=\\sum\\frac{1}{2}m_i(r_i\\omega)^2=\\frac{1}{2}\\left(\\sum m_ir_i^2\\right)\\omega^2=\\frac{1}{2}I\\omega^2$\n\n이 됩니다. 여기서 $I=\\sum m_ir_i^2$ (연속체는 $I=\\int r^2\\,dm$)를 **관성 모멘트**라고 하며 단위는 kg·m²입니다. 직선 운동에서 질량이 "가속하기 어려운 정도"이듯, 관성 모멘트는 "회전을 바꾸기 어려운 정도"입니다. 같은 질량이라도 **축에서 멀리 퍼져 있을수록** 큽니다. 그래서 관성 모멘트는 물체만이 아니라 **회전축**에 따라 달라집니다.\n\n| 물체 (질량 $M$) | 회전축 | 관성 모멘트 |\n|---|---|---|\n| 얇은 고리(반지름 $R$) | 중심을 지나 고리면에 수직 | $MR^2$ |\n| 속이 찬 원판·원기둥 | 중심축 | $\\frac{1}{2}MR^2$ |\n| 속이 찬 구 | 지름 | $\\frac{2}{5}MR^2$ |\n| 얇은 구 껍질 | 지름 | $\\frac{2}{3}MR^2$ |\n| 가는 막대(길이 $L$) | 중심, 막대에 수직 | $\\frac{1}{12}ML^2$ |\n| 가는 막대(길이 $L$) | 한쪽 끝, 막대에 수직 | $\\frac{1}{3}ML^2$ |\n\n**평행축 정리**: 질량 중심을 지나는 축에 대한 관성 모멘트가 $I_{\\text{cm}}$이면, 그 축과 평행하고 거리 $d$만큼 떨어진 축에 대해\n\n$I=I_{\\text{cm}}+Md^2$\n\n입니다. 예: 막대의 끝을 지나는 축은 중심에서 $d=\\frac{L}{2}$이므로 $I=\\frac{1}{12}ML^2+M\\left(\\frac{L}{2}\\right)^2=\\frac{1}{3}ML^2$입니다. 질량 중심을 지나는 축의 관성 모멘트가 평행한 축들 가운데 가장 작습니다.',
      easy: '긴 막대를 가운데를 잡고 빙빙 돌리면 쉽지만, 끝을 잡고 돌리면 훨씬 힘듭니다. 막대는 그대로인데 돌리는 축이 바뀌자 무게가 축에서 더 멀리 퍼졌기 때문입니다.\n\n관성 모멘트는 "질량 × (축까지 거리)²"을 모두 더한 값이라, 거리가 2배가 되면 4배로 커집니다. 같은 무게의 고리와 원판을 비교하면, 무게가 모두 바깥 테두리에 있는 고리가 더 돌리기 어렵습니다.',
      check: {
        type: 'choice',
        q: '질량과 반지름이 같은 얇은 고리와 속이 찬 원판이 각자의 중심축을 중심으로 같은 각속도로 돌고 있습니다. 회전 운동 에너지가 더 큰 것은 무엇입니까?',
        choices: ['얇은 고리', '속이 찬 원판', '둘이 같다'],
        answer: 0,
        why: ['', '원판은 질량의 일부가 축 가까이 있어 관성 모멘트가 $\\frac{1}{2}MR^2$으로 고리보다 작습니다.', '질량과 반지름이 같아도 질량이 퍼진 모양이 다르면 관성 모멘트가 다릅니다.'],
        explain: '$K=\\frac{1}{2}I\\omega^2$이고 고리는 $I=MR^2$, 원판은 $I=\\frac{1}{2}MR^2$입니다. 질량이 모두 테두리에 있는 고리의 회전 운동 에너지가 2배 큽니다.',
      },
    },
    {
      title: '돌림힘과 회전에 대한 뉴턴 제2법칙',
      body: '문을 열 때 경첩에서 먼 손잡이를, 문에 수직으로 밀어야 잘 열립니다. 힘이 회전을 일으키는 효과를 **돌림힘**(토크)이라고 합니다.\n\n$\\tau=rF\\sin\\phi=r_\\perp F$\n\n$r$은 회전축에서 힘의 작용점까지의 거리, $\\phi$는 $\\vec{r}$과 $\\vec{F}$ 사이의 각, $r_\\perp=r\\sin\\phi$는 축에서 힘의 작용선까지의 수직 거리(**지레 팔**)입니다. 벡터로는 $\\vec{\\tau}=\\vec{r}\\times\\vec{F}$이며, 단위는 N·m입니다. 힘이 $\\vec{r}$과 나란하거나($\\phi=0^\\circ$ 또는 $180^\\circ$) 힘의 작용선이 축을 지나면 돌림힘은 0입니다. 고정축 문제에서는 보통 시계 반대 방향을 +로 잡습니다.\n\n고정축에 대한 **회전의 제2법칙**은\n\n$\\sum\\tau=I\\alpha$\n\n입니다($\\sum F=ma$와 같은 꼴). 예: 질량 4 kg, 반지름 0.2 m인 원판($I=\\frac{1}{2}\\times 4\\times 0.2^2=0.08$ kg·m²)에 감은 줄을 2 N으로 당기면 $\\tau=0.2\\times 2=0.4$ N·m, $\\alpha=\\dfrac{0.4}{0.08}=5$ rad/s²입니다.\n\n- 강체가 정지해 있으려면(정적 평형) $\\sum\\vec{F}=0$과 $\\sum\\vec{\\tau}=0$이 **둘 다** 성립해야 합니다.\n- 돌림힘이 한 일은 $W=\\int\\tau\\,d\\theta$, 일률은 $P=\\tau\\omega$입니다.\n\n> ⚠️ 돌림힘의 단위 N·m는 일의 단위 J과 차원이 같지만 다른 양입니다. 돌림힘은 N·m로만 씁니다.',
      easy: '시소에서 가벼운 동생이 끝에 앉고, 무거운 형이 가운데 가까이 앉으면 균형이 맞을 수 있습니다. 회전에서는 힘의 크기만이 아니라 "축에서 얼마나 먼 곳에서" 힘을 주는지가 함께 중요하기 때문입니다. 그 곱이 돌림힘입니다.\n\n그리고 같은 돌림힘이라도 관성 모멘트가 큰 물체는 천천히 빨라집니다. 무거운 짐을 미는 것과 같습니다.',
      check: {
        type: 'ox',
        q: '문을 밀 때 경첩(회전축)을 똑바로 향하도록 힘을 주면, 아무리 세게 밀어도 문은 돌지 않는다.',
        answer: true,
        explain: '힘의 작용선이 회전축을 지나면 지레 팔 $r_\\perp=r\\sin 180^\\circ=0$이라 돌림힘이 0입니다. 그래서 문은 회전하지 않습니다(경첩이 그 힘을 받아 냅니다).',
      },
    },
    {
      title: '굴림 운동',
      fig: {
        type: 'svg',
        alt: '바닥 위를 오른쪽으로 미끄러지지 않고 구르는 바퀴. 바닥에 닿은 점의 속도는 0, 중심의 속도는 v, 맨 위 점의 속도는 2v인 화살표로 나타낸 그림.',
        svg: '<svg viewBox="0 0 320 170"><line x1="10" y1="150" x2="310" y2="150" stroke="currentColor" stroke-width="2"/><circle cx="120" cy="90" r="60" fill="var(--fig-2)" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/><circle cx="120" cy="90" r="3" fill="currentColor"/><line x1="120" y1="90" x2="172" y2="90" stroke="var(--fig-1)" stroke-width="2"/><polygon points="180,90 171,85 171,95" fill="var(--fig-1)"/><text x="184" y="95" font-size="14" fill="currentColor">v</text><circle cx="120" cy="30" r="3" fill="currentColor"/><line x1="120" y1="30" x2="226" y2="30" stroke="var(--fig-3)" stroke-width="2"/><polygon points="234,30 225,25 225,35" fill="var(--fig-3)"/><text x="238" y="35" font-size="14" fill="currentColor">2v</text><circle cx="120" cy="150" r="4" fill="currentColor"/><text x="128" y="166" font-size="13" fill="currentColor">닿은 점: 속도 0</text></svg>',
      },
      body: '바퀴나 공이 바닥에서 **미끄러지지 않고 구를** 때는 한 바퀴 돌면 둘레 $2\\pi R$만큼 나아가므로\n\n$v_{\\text{cm}}=R\\omega,\\qquad a_{\\text{cm}}=R\\alpha$\n\n입니다. 굴림은 "질량 중심의 평행 이동 + 질량 중심에 대한 회전"을 합친 운동입니다. 그래서 바닥에 닿은 점의 속도는 $v_{\\text{cm}}-R\\omega=0$으로 순간적으로 정지해 있고, 맨 위 점은 $2v_{\\text{cm}}$로 움직입니다.\n\n운동 에너지도 두 부분의 합입니다.\n\n$K=\\frac{1}{2}Mv_{\\text{cm}}^2+\\frac{1}{2}I_{\\text{cm}}\\omega^2=\\frac{1}{2}M(1+\\beta)v_{\\text{cm}}^2,\\qquad \\beta=\\dfrac{I_{\\text{cm}}}{MR^2}$\n\n정지 상태에서 높이 $h$인 경사면을 굴러 내려오면 $Mgh=\\frac{1}{2}M(1+\\beta)v^2$이므로\n\n$v=\\sqrt{\\dfrac{2gh}{1+\\beta}}$\n\n- 속이 찬 구($\\beta=\\frac{2}{5}$): $v=\\sqrt{\\frac{10}{7}gh}$ / 원판($\\beta=\\frac{1}{2}$): $v=\\sqrt{\\frac{4}{3}gh}$ / 고리($\\beta=1$): $v=\\sqrt{gh}$\n- 속력은 질량과 반지름에 관계없고 **모양**($\\beta$)으로만 정해집니다. 같은 높이에서 동시에 굴리면 구 → 원판 → 고리 순으로 도착합니다. 마찰 없이 미끄러지는 상자($v=\\sqrt{2gh}$)보다는 모두 느립니다. 위치 에너지의 일부가 회전 에너지로 가기 때문입니다.\n\n> 💡 미끄러지지 않고 구를 때 바닥의 정지 마찰력은 회전을 일으키지만, 닿은 점이 미끄러지지 않으므로 **일을 하지 않습니다**. 그래서 역학적 에너지 보존을 쓸 수 있습니다.',
      easy: '자전거 바퀴의 맨 아래, 땅에 닿은 부분은 그 순간 땅에 "찍혀" 있어서 움직이지 않습니다. 대신 맨 위 부분은 자전거보다 두 배 빠르게 앞으로 나갑니다. 달리는 자전거 바퀴 사진에서 위쪽 바큇살이 더 흐릿하게 찍히는 까닭입니다.\n\n언덕을 굴러 내려가는 공은 내려오며 얻은 에너지를 "앞으로 가기"와 "빙글빙글 돌기"에 나눠 써야 합니다. 그래서 그냥 미끄러지는 물체보다 느립니다. 돌기에 에너지를 많이 쓰는 고리가 가장 느립니다.',
      check: {
        type: 'choice',
        q: '질량과 반지름이 서로 다른 속이 찬 구, 속이 찬 원기둥, 얇은 고리를 같은 경사면의 같은 높이에서 동시에 놓아 미끄러지지 않고 구르게 했습니다. 가장 먼저 바닥에 도착하는 것은 무엇입니까?',
        choices: ['속이 찬 구', '속이 찬 원기둥', '얇은 고리', '셋이 동시에 도착한다'],
        answer: 0,
        why: [
          '',
          '원기둥은 $\\beta=\\frac{1}{2}$로 구($\\frac{2}{5}$)보다 회전에 에너지를 더 많이 씁니다.',
          '고리는 $\\beta=1$로 에너지의 절반을 회전에 써서 가장 느립니다.',
          '질량과 반지름에는 관계없지만, 모양($\\beta=\\frac{I}{MR^2}$)에 따라 속력이 다릅니다.',
        ],
        explain: '$v=\\sqrt{\\dfrac{2gh}{1+\\beta}}$에서 $\\beta$가 작을수록 빠릅니다. 구 $\\frac{2}{5}$ < 원기둥 $\\frac{1}{2}$ < 고리 $1$이므로 속이 찬 구가 가장 먼저 도착합니다.',
      },
    },
    {
      title: '각운동량과 각운동량 보존',
      body: '운동량에 대응하는 회전의 양이 **각운동량**입니다. 원점에 대한 입자의 각운동량은\n\n$\\vec{L}=\\vec{r}\\times\\vec{p},\\qquad L=mvr_\\perp$\n\n이고, 고정축을 중심으로 도는 강체는 $L=I\\omega$입니다. 단위는 kg·m²/s입니다. 돌림힘은 각운동량을 바꿉니다.\n\n$\\sum\\vec{\\tau}_{\\text{외부}}=\\dfrac{d\\vec{L}}{dt}$\n\n그러므로 **외부 돌림힘의 합이 0이면 계의 각운동량은 보존됩니다.**\n\n$I_i\\omega_i=I_f\\omega_f$\n\n- 회전하던 피겨 스케이터가 팔을 오므리면 $I$가 작아지므로 $\\omega$가 커집니다. 다이빙 선수가 몸을 웅크려 빨리 도는 것도 같습니다.\n- 이때 회전 운동 에너지 $K=\\dfrac{L^2}{2I}$은 **늘어납니다**. 팔을 안쪽으로 당기는 근육이 일을 했기 때문입니다. 각운동량 보존과 에너지 보존은 별개의 법칙입니다.\n- 행성에 작용하는 태양의 중력은 태양을 향하는 힘(중심력)이라 태양에 대한 돌림힘이 0입니다. 그래서 행성의 각운동량이 보존되고, 이것이 케플러 제2법칙의 원인입니다.\n\n> 💡 각운동량은 방향도 보존됩니다. 빠르게 도는 팽이나 자이로스코프의 축이 잘 기울어지지 않는 것, 굴러가는 자전거가 잘 넘어지지 않는 데 도움이 되는 것도 이 때문입니다.',
      easy: '바퀴 달린 회전 의자에 앉아 양손에 물병을 들고 팔을 쫙 편 채 돌다가, 팔을 가슴 쪽으로 당기면 의자가 갑자기 빨라집니다. 무게가 축 가까이 모이면 "돌기 어려운 정도"(관성 모멘트)가 줄어드는데, "도는 기세"(각운동량)는 그대로 유지되어야 하므로 빨라지는 것입니다.\n\n다시 팔을 펴면 느려집니다. 의자를 돌리는 사람이 없으니 기세의 총량은 변하지 않습니다.',
      check: {
        type: 'short', check: 'number', unit: 'rad/s',
        q: '관성 모멘트 4 kg·m²인 자세로 2 rad/s로 돌던 피겨 스케이터가 팔을 오므려 관성 모멘트가 1.6 kg·m²가 되었습니다. 이때 각속도는 몇 rad/s입니까? (얼음의 마찰 무시)',
        answer: '5',
        wrong: [
          { a: '0.8', why: '관성 모멘트의 비를 거꾸로 곱했습니다. 관성 모멘트가 작아지면 각속도는 커집니다.' },
          { a: '2', why: '각속도가 그대로라고 보았습니다. 보존되는 것은 각속도가 아니라 각운동량 $I\\omega$입니다.' },
        ],
        explain: '외부 돌림힘이 없으므로 $I_i\\omega_i=I_f\\omega_f$, $4\\times 2=1.6\\,\\omega_f$, $\\omega_f=5$ rad/s입니다. 회전 운동 에너지는 8 J에서 20 J로 늘었습니다(근육이 한 일).',
      },
    },
    {
      title: '만유인력 법칙, 케플러 법칙, 탈출 속도',
      body: '질량을 가진 모든 물체는 서로 끌어당깁니다(뉴턴의 **만유인력 법칙**).\n\n$F=G\\dfrac{m_1m_2}{r^2},\\qquad G=6.67\\times 10^{-11}\\ \\mathrm{N·m²/kg²}$\n\n밀도가 구 대칭인 천체는 질량이 모두 중심에 모인 것처럼 끌어당깁니다. 그래서 지표면의 중력 가속도는 $g=\\dfrac{GM}{R^2}\\approx 9.8\\ \\mathrm{m/s²}$이고, 지구 중심에서 거리가 2배면 중력은 $\\frac{1}{4}$배입니다.\n\n**원 궤도**: 중력이 구심력 역할을 하므로 $\\dfrac{GMm}{r^2}=\\dfrac{mv^2}{r}$에서\n\n$v=\\sqrt{\\dfrac{GM}{r}},\\qquad T^2=\\dfrac{4\\pi^2}{GM}r^3$\n\n궤도 반지름 $r$은 **천체 중심에서** 잰 거리이고, 위성의 질량과 관계없습니다.\n\n**케플러 법칙**(행성 운동)\n1. 행성은 태양을 한 초점으로 하는 **타원** 궤도를 돈다.\n2. 태양과 행성을 잇는 선분은 같은 시간에 **같은 넓이**를 쓸고 지나간다(각운동량 보존). 그래서 태양에 가까울 때 빠르고 멀 때 느리다.\n3. 공전 주기의 제곱은 궤도 긴반지름의 세제곱에 비례한다: $T^2\\propto a^3$.\n\n**중력 퍼텐셜 에너지와 탈출 속도**: 무한히 먼 곳을 기준(0)으로 하면 $U=-\\dfrac{GMm}{r}$입니다. 표면에서 쏘아 올린 물체가 다시 돌아오지 않으려면 $\\frac{1}{2}mv^2-\\dfrac{GMm}{R}\\ge 0$이어야 하므로\n\n$v_{\\text{탈출}}=\\sqrt{\\dfrac{2GM}{R}}=\\sqrt{2gR}$\n\n지구는 약 11.2 km/s입니다(공기 저항 무시). 탈출 속도는 물체의 질량에 관계없습니다.',
      easy: '사과가 땅으로 떨어지게 하는 힘과 달이 지구 둘레를 돌게 하는 힘은 같은 중력입니다. 달도 사실은 지구를 향해 계속 "떨어지고" 있는데, 옆으로 워낙 빠르게 움직여서 떨어지는 만큼 지구 표면이 둥글게 비켜 가 버립니다. 그래서 땅에 닿지 않고 계속 돕니다.\n\n공을 더 세게, 더 세게 위로 던진다고 생각해 보세요. 어느 빠르기(지구에서는 1초에 약 11 km)를 넘으면 공은 다시 돌아오지 않습니다. 그 빠르기가 탈출 속도입니다.',
      check: {
        type: 'ox',
        q: '지구 표면에서 물체를 쏘아 올릴 때, 물체의 질량이 클수록 탈출 속도가 크다.',
        answer: false,
        explain: '$\\frac{1}{2}mv^2=\\dfrac{GMm}{R}$의 양쪽에 물체의 질량 $m$이 똑같이 들어 있어 지워집니다. 그래서 $v_{\\text{탈출}}=\\sqrt{\\dfrac{2GM}{R}}$은 물체의 질량과 관계없습니다. 무거운 물체는 필요한 **에너지**가 클 뿐입니다.',
      },
    },
  ],

  examples: [
    {
      q: '질량 2 kg, 반지름 0.1 m인 원판 모양의 도르래가 마찰 없는 수평축에 달려 있습니다. 도르래에 감은 가벼운 줄 끝에 1 kg인 물체를 매달고 가만히 놓았습니다. 물체의 가속도, 줄의 장력, 도르래의 각가속도를 구하십시오. ($g=9.8\\ \\mathrm{m/s²}$, 줄은 미끄러지지 않음)',
      steps: [
        '도르래의 관성 모멘트: $I=\\frac{1}{2}MR^2=\\frac{1}{2}\\times 2\\times 0.1^2=0.01$ kg·m²',
        '물체(아래를 +): $mg-T=ma$ … ①. 도르래: $TR=I\\alpha$이고 줄이 미끄러지지 않으므로 $\\alpha=\\dfrac{a}{R}$, 곧 $T=\\dfrac{I}{R^2}a=\\dfrac{0.01}{0.01}a=1\\times a$ … ②',
        '①에 ②를 넣으면 $9.8-a=a$, $a=4.9\\ \\mathrm{m/s²}$. 도르래가 없을 때(자유 낙하 9.8)의 절반입니다.',
        '장력 $T=1\\times 4.9=4.9$ N (물체의 무게 9.8 N보다 작습니다), 각가속도 $\\alpha=\\dfrac{a}{R}=\\dfrac{4.9}{0.1}=49\\ \\mathrm{rad/s²}$',
      ],
      answer: '$a=4.9\\ \\mathrm{m/s²}$, $T=4.9$ N, $\\alpha=49\\ \\mathrm{rad/s²}$',
    },
    {
      q: '속이 찬 원기둥이 높이 0.6 m인 경사면 꼭대기에서 정지 상태로 출발해 미끄러지지 않고 굴러 내려왔습니다. 바닥에서 원기둥 중심의 속력을 구하고, 운동 에너지 가운데 회전 에너지의 비율을 구하십시오. ($g=9.8\\ \\mathrm{m/s²}$)',
      steps: [
        '원기둥은 $I_{\\text{cm}}=\\frac{1}{2}MR^2$이므로 $\\beta=\\frac{1}{2}$, 운동 에너지는 $K=\\frac{1}{2}Mv^2+\\frac{1}{2}\\left(\\frac{1}{2}MR^2\\right)\\left(\\frac{v}{R}\\right)^2=\\frac{3}{4}Mv^2$',
        '역학적 에너지 보존(정지 마찰력은 일을 하지 않음): $Mgh=\\frac{3}{4}Mv^2$, $v^2=\\frac{4}{3}gh=\\frac{4}{3}\\times 9.8\\times 0.6=7.84$',
        '$v=2.8$ m/s. 질량과 반지름은 지워져서 필요 없습니다.',
        '회전 에너지 비율: $\\dfrac{\\frac{1}{4}Mv^2}{\\frac{3}{4}Mv^2}=\\dfrac{1}{3}$. 마찰 없이 미끄러졌다면 $v=\\sqrt{2gh}\\approx 3.43$ m/s로 더 빨랐을 것입니다.',
      ],
      answer: '$v=2.8$ m/s, 회전 에너지는 전체의 $\\frac{1}{3}$',
    },
    {
      q: '지구 표면 바로 위(높이를 무시)를 도는 원 궤도 위성의 속력과, 지구 표면에서의 탈출 속도를 구하십시오. (지구 반지름 $R=6.4\\times 10^6$ m, $g=9.8\\ \\mathrm{m/s²}$, 공기 저항 무시)',
      steps: [
        '표면에서 $g=\\dfrac{GM}{R^2}$이므로 $GM=gR^2$입니다.',
        '원 궤도 속력: $v_1=\\sqrt{\\dfrac{GM}{R}}=\\sqrt{gR}=\\sqrt{9.8\\times 6.4\\times 10^6}=\\sqrt{6.272\\times 10^7}\\approx 7.9\\times 10^3$ m/s',
        '탈출 속도: $v_2=\\sqrt{\\dfrac{2GM}{R}}=\\sqrt{2gR}=\\sqrt{1.2544\\times 10^8}=1.12\\times 10^4$ m/s',
        '$v_2=\\sqrt{2}\\,v_1$입니다. 약 7.9 km/s면 지구를 돌고, 약 11.2 km/s면 지구를 벗어납니다.',
      ],
      answer: '원 궤도 약 7.9 km/s, 탈출 속도 약 11.2 km/s',
    },
  ],

  terms: [
    { term: '라디안', def: '호의 길이를 반지름으로 나눈 각의 단위 $\\theta=\\dfrac{s}{r}$. 한 바퀴는 $2\\pi$ rad $=360^\\circ$입니다.' },
    { term: '각속도', def: '단위 시간 동안 돈 각 $\\omega=\\dfrac{d\\theta}{dt}$ (rad/s). 축에서 $r$ 떨어진 점의 속력은 $v=r\\omega$입니다.' },
    { term: '관성 모멘트', def: '회전 상태를 바꾸기 어려운 정도 $I=\\sum m_ir_i^2$ (kg·m²). 질량이 축에서 멀리 퍼질수록 크며, 회전축에 따라 다릅니다.' },
    { term: '평행축 정리', def: '질량 중심을 지나는 축과 평행하고 $d$만큼 떨어진 축에 대한 관성 모멘트 $I=I_{\\text{cm}}+Md^2$.' },
    { term: '돌림힘', def: '힘이 회전을 일으키는 효과 $\\tau=rF\\sin\\phi$ (N·m). 고정축에서 $\\sum\\tau=I\\alpha$입니다. 토크라고도 합니다.' },
    { term: '굴림 운동', def: '미끄러지지 않고 구르는 운동. $v_{\\text{cm}}=R\\omega$이고, 운동 에너지는 평행 이동 에너지와 회전 에너지의 합입니다.' },
    { term: '각운동량', def: '회전의 운동량 $\\vec{L}=\\vec{r}\\times\\vec{p}$, 고정축 강체는 $L=I\\omega$ (kg·m²/s). 외부 돌림힘이 0이면 보존됩니다.' },
    { term: '만유인력 법칙', def: '두 질량 사이의 끌어당기는 힘 $F=G\\dfrac{m_1m_2}{r^2}$, $G=6.67\\times 10^{-11}\\ \\mathrm{N·m²/kg²}$.' },
    { term: '케플러 법칙', def: '행성 운동의 세 법칙: 타원 궤도(태양은 한 초점), 같은 시간에 같은 넓이(면적 속도 일정), $T^2\\propto a^3$.' },
    { term: '탈출 속도', def: '천체 표면에서 다시 돌아오지 않고 벗어나는 데 필요한 최소 속력 $v=\\sqrt{\\dfrac{2GM}{R}}$. 지구는 약 11.2 km/s.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '1200 rpm(분당 1200회전)으로 도는 모터 축의 각속도는 얼마입니까?',
      choices: ['$40\\pi$ rad/s', '$20\\pi$ rad/s', '20 rad/s', '$2400\\pi$ rad/s'],
      answer: 0,
      why: [
        '',
        '1초에 20바퀴까지는 맞았지만, 한 바퀴가 $\\pi$가 아니라 $2\\pi$ rad입니다.',
        '1초에 도는 바퀴 수(20회/s)를 그대로 썼습니다. 한 바퀴는 $2\\pi$ rad이므로 $2\\pi$를 곱해야 합니다.',
        '분을 초로 바꾸지 않았습니다. 1분은 60 s이므로 60으로 나눠야 합니다.',
      ],
      explain: '1200 rpm은 1초에 $\\dfrac{1200}{60}=20$바퀴이고, 한 바퀴는 $2\\pi$ rad이므로 $\\omega=20\\times 2\\pi=40\\pi\\approx 126$ rad/s입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: 'm/s', concept: 0,
      q: '반지름 0.5 m인 바퀴가 각속도 8 rad/s로 돌고 있습니다. 바퀴 가장자리 한 점의 속력은 몇 m/s입니까?',
      answer: '4',
      wrong: [{ a: '16', why: '각속도를 반지름으로 나눴습니다. 속력은 $v=r\\omega$로 곱합니다.' }],
      explain: '$v=r\\omega=0.5\\times 8=4$ m/s입니다.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: 'kg·m²', concept: 1,
      q: '질량 2 kg, 반지름 0.3 m인 속이 찬 원판이 중심축을 중심으로 돕니다. 원판의 관성 모멘트는 몇 kg·m²입니까?',
      answer: '0.09',
      wrong: [
        { a: '0.18', why: '얇은 고리의 식 $MR^2$을 썼습니다. 속이 찬 원판은 $\\frac{1}{2}MR^2$입니다.' },
        { a: '0.3', why: '반지름을 제곱하지 않았습니다. 관성 모멘트는 거리의 제곱에 비례합니다.' },
      ],
      explain: '$I=\\frac{1}{2}MR^2=\\frac{1}{2}\\times 2\\times 0.3^2=0.09$ kg·m²입니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: 'J', concept: 1,
      q: '관성 모멘트가 0.5 kg·m²인 바퀴가 4 rad/s로 돌고 있습니다. 바퀴의 회전 운동 에너지는 몇 J입니까?',
      answer: '4',
      wrong: [
        { a: '8', why: '$\\frac{1}{2}$을 빠뜨렸습니다. $K=\\frac{1}{2}I\\omega^2$입니다.' },
        { a: '1', why: '각속도를 제곱하지 않았습니다. $\\omega^2=16$입니다.' },
      ],
      explain: '$K=\\frac{1}{2}I\\omega^2=\\frac{1}{2}\\times 0.5\\times 4^2=4$ J입니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: 'N·m', concept: 2,
      q: '길이 0.4 m인 렌치의 끝을 25 N의 힘으로 당겼습니다. 힘의 방향이 렌치와 $30^\\circ$를 이룰 때, 너트(회전축)에 대한 돌림힘의 크기는 몇 N·m입니까?',
      answer: '5',
      hint: '$\\tau=rF\\sin\\phi$에서 $\\phi$는 렌치(위치 벡터)와 힘 사이의 각입니다.',
      wrong: [
        { a: '10', why: '$\\sin 30^\\circ$를 빠뜨렸습니다. 렌치에 수직인 힘의 성분만 돌림힘을 만듭니다.' },
        { a: '8.66', why: '$\\cos 30^\\circ$를 곱했습니다. 그것은 렌치 방향 성분으로, 회전에 기여하지 않습니다.' },
      ],
      explain: '$\\tau=rF\\sin\\phi=0.4\\times 25\\times\\sin 30^\\circ=10\\times 0.5=5$ N·m입니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: 'rad/s²', concept: 2,
      q: '관성 모멘트가 2 kg·m²인 회전체에 알짜 돌림힘 6 N·m가 작용합니다. 각가속도는 몇 rad/s²입니까?',
      answer: '3',
      wrong: [{ a: '12', why: '돌림힘과 관성 모멘트를 곱했습니다. $\\alpha=\\dfrac{\\tau}{I}$입니다.' }],
      explain: '$\\sum\\tau=I\\alpha$에서 $\\alpha=\\dfrac{6}{2}=3$ rad/s²입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '자전거가 속력 $v$로 달리고 있고 바퀴는 미끄러지지 않고 구릅니다. 바퀴 맨 위 점의 땅에 대한 속력은 얼마입니까?',
      choices: ['$2v$', '$v$', '0', '$\\frac{v}{2}$'],
      answer: 0,
      why: [
        '',
        '바퀴 중심(축)의 속력입니다. 맨 위 점은 중심의 이동 $v$에 회전 속력 $R\\omega=v$가 같은 방향으로 더해집니다.',
        '땅에 닿은 맨 아래 점의 속력입니다. 맨 위 점은 정반대입니다.',
        '맨 위 점에서는 이동과 회전의 속력이 같은 방향이라 더해집니다.',
      ],
      explain: '굴림 = 중심의 이동($v$) + 중심에 대한 회전($R\\omega=v$). 맨 위 점은 두 속도가 같은 방향이라 $2v$, 맨 아래 점은 반대 방향이라 0입니다.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'number', unit: 'rad/s', concept: 4,
      q: '회전 의자에 앉은 사람이 아령을 든 팔을 펴고 1.5 rad/s로 돌고 있습니다. 이때 관성 모멘트는 6 kg·m²입니다. 팔을 오므려 관성 모멘트가 2 kg·m²가 되면 각속도는 몇 rad/s가 됩니까? (축의 마찰 무시)',
      answer: '4.5',
      wrong: [
        { a: '0.5', why: '관성 모멘트의 비를 거꾸로 곱했습니다. 관성 모멘트가 줄면 각속도는 커집니다.' },
        { a: '1.5', why: '각속도가 그대로라고 보았습니다. 보존되는 양은 $I\\omega$입니다.' },
      ],
      explain: '외부 돌림힘이 없으므로 $6\\times 1.5=2\\,\\omega_f$, $\\omega_f=4.5$ rad/s입니다.',
    },
    {
      id: 'p9', level: 1, type: 'ox', concept: 5,
      q: '인공위성이 지구 중심에서 떨어진 거리가 2배가 되면, 위성이 받는 지구의 중력은 $\\frac{1}{2}$배가 된다.',
      answer: false,
      explain: '만유인력은 거리의 제곱에 반비례합니다. 거리가 2배면 중력은 $\\frac{1}{2^2}=\\frac{1}{4}$배가 됩니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: 'm/s', concept: 3,
      q: '얇은 고리가 높이 0.8 m인 경사면 꼭대기에서 정지 상태로 출발해 미끄러지지 않고 굴러 내려왔습니다. 바닥에서 고리 중심의 속력은 몇 m/s입니까? ($g=9.8\\ \\mathrm{m/s²}$)',
      answer: '2.8',
      hint: '고리는 $I=MR^2$이라 회전 에너지가 평행 이동 에너지와 같습니다.',
      wrong: [{ a: '3.96', why: '회전 에너지를 빠뜨리고 $v=\\sqrt{2gh}$로 계산했습니다. 미끄러지는 물체가 아니라 구르는 고리입니다.' }],
      explain: '고리는 $K=\\frac{1}{2}Mv^2+\\frac{1}{2}(MR^2)\\left(\\frac{v}{R}\\right)^2=Mv^2$이므로 $Mgh=Mv^2$, $v=\\sqrt{gh}=\\sqrt{9.8\\times 0.8}=\\sqrt{7.84}=2.8$ m/s입니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: 'm/s²', concept: 5,
      q: '어떤 행성의 질량은 지구의 2배, 반지름은 지구의 2배입니다. 이 행성 표면의 중력 가속도는 몇 m/s²입니까? (지구 표면은 9.8 m/s²)',
      answer: '4.9',
      hint: '$g=\\dfrac{GM}{R^2}$에서 질량과 반지름이 각각 몇 배인지 넣어 보십시오.',
      wrong: [
        { a: '9.8', why: '질량 2배와 반지름 2배가 지워진다고 보았습니다. 반지름은 제곱으로 들어갑니다.' },
        { a: '19.6', why: '질량만 반영했습니다. 반지름이 2배면 $R^2$은 4배입니다.' },
      ],
      explain: '$g\'=\\dfrac{G(2M)}{(2R)^2}=\\dfrac{2}{4}\\cdot\\dfrac{GM}{R^2}=\\frac{1}{2}\\times 9.8=4.9$ m/s²입니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: 'kg·m²', concept: 1,
      q: '질량 1 kg, 길이 1.2 m인 가는 막대를 한쪽 끝을 지나고 막대에 수직인 축을 중심으로 돌립니다. 관성 모멘트는 몇 kg·m²입니까? (중심에 대한 관성 모멘트는 $\\frac{1}{12}ML^2$)',
      answer: '0.48',
      hint: '평행축 정리 $I=I_{\\text{cm}}+Md^2$에서 $d$는 중심에서 끝까지의 거리입니다.',
      wrong: [
        { a: '0.12', why: '중심을 지나는 축에 대한 값입니다. 축이 끝으로 옮겨 갔으므로 $Md^2$을 더합니다.' },
        { a: '0.36', why: '$Md^2$만 구했습니다. $I_{\\text{cm}}$도 더해야 합니다.' },
      ],
      explain: '$I_{\\text{cm}}=\\frac{1}{12}\\times 1\\times 1.2^2=0.12$, $d=0.6$ m이므로 $I=0.12+1\\times 0.6^2=0.12+0.36=0.48$ kg·m²입니다. $\\frac{1}{3}ML^2=\\frac{1}{3}\\times 1.44=0.48$과 같습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: 'm/s²', concept: 2,
      q: '마찰 없는 축에 달린 원판 모양의 도르래(질량 2 kg)에 가벼운 줄을 걸고, 양쪽에 3 kg과 1 kg인 물체를 매달아 놓았습니다. 줄이 도르래에서 미끄러지지 않을 때 물체의 가속도는 몇 m/s²입니까? ($g=9.8\\ \\mathrm{m/s²}$)',
      answer: '3.92',
      hint: '도르래 양쪽 줄의 장력이 다릅니다. 원판의 $\\dfrac{I}{R^2}=\\frac{1}{2}M$을 "회전하는 질량"처럼 더하십시오.',
      wrong: [{ a: '4.9', why: '도르래의 관성 모멘트를 무시했습니다. 도르래를 돌리는 데에도 돌림힘이 필요합니다.' }],
      explain: '3 kg: $3g-T_1=3a$, 1 kg: $T_2-g=a$, 도르래: $(T_1-T_2)R=I\\dfrac{a}{R}$이므로 $T_1-T_2=\\frac{1}{2}(2)a=a$. 세 식을 더하면 $2g=(3+1+1)a$, $a=\\dfrac{2\\times 9.8}{5}=3.92$ m/s²입니다. 이때 $T_1=17.64$ N, $T_2=13.72$ N으로 장력이 다릅니다.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: 'rad/s', concept: 4,
      q: '관성 모멘트 200 kg·m²인 회전판이 축에 대해 1 rad/s로 자유롭게 돌고 있습니다. 질량 50 kg인 사람이 회전판의 중심에서 2 m 떨어진 가장자리에 수직으로 내려앉았습니다(내려앉기 전 사람의 각운동량은 0). 사람이 올라탄 뒤 회전판의 각속도는 몇 rad/s입니까? (사람은 점 질량으로 봄)',
      answer: '0.5',
      hint: '사람의 관성 모멘트는 $mr^2$입니다.',
      wrong: [
        { a: '0.8', why: '사람의 관성 모멘트를 $mr^2$이 아니라 $m$으로 더했습니다.' },
        { a: '1', why: '각속도가 그대로라고 보았습니다. 관성 모멘트가 늘어나면 각속도는 줄어듭니다.' },
      ],
      explain: '나중 관성 모멘트 $I_f=200+50\\times 2^2=400$ kg·m². 각운동량 보존 $200\\times 1=400\\,\\omega_f$에서 $\\omega_f=0.5$ rad/s입니다. 회전 운동 에너지는 100 J에서 50 J로 줄었습니다(완전 비탄성 충돌과 비슷).',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', concept: 5,
      q: '같은 행성을 원 궤도로 도는 두 위성 A, B가 있습니다. A의 궤도 반지름이 B의 4배라면, A의 공전 주기는 B의 몇 배입니까?',
      answer: '8',
      hint: '케플러 제3법칙 $T^2\\propto r^3$을 쓰십시오.',
      wrong: [
        { a: '16', why: '주기가 반지름의 제곱에 비례한다고 보았습니다. $T^2\\propto r^3$이므로 $T\\propto r^{3/2}$입니다.' },
        { a: '4', why: '주기가 반지름에 비례한다고 보았습니다. 바깥 궤도는 둘레도 길고 속력도 느립니다.' },
        { a: '2', why: '반지름의 제곱근을 구했습니다. $4^{3/2}=8$입니다.' },
      ],
      explain: '$T^2\\propto r^3$이므로 $\\left(\\dfrac{T_A}{T_B}\\right)^2=4^3=64$, $\\dfrac{T_A}{T_B}=8$입니다. 바깥 궤도는 둘레가 4배이고 속력이 $\\sqrt{\\frac{1}{4}}=\\frac{1}{2}$배라서 $4\\times 2=8$배라고 보아도 됩니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'km/s', concept: 5,
      q: '어떤 행성의 질량은 지구의 8배, 반지름은 지구의 2배입니다. 지구의 탈출 속도가 11.2 km/s일 때, 이 행성 표면의 탈출 속도는 몇 km/s입니까?',
      answer: '22.4',
      wrong: [
        { a: '44.8', why: '제곱근을 빠뜨렸습니다. $v=\\sqrt{\\dfrac{2GM}{R}}$이므로 $\\dfrac{M}{R}$ 비의 제곱근만큼 바뀝니다.' },
        { a: '11.2', why: '탈출 속도가 어느 천체에서나 같다고 보았습니다. 천체의 질량과 반지름에 따라 다릅니다.' },
      ],
      explain: '$\\dfrac{v\'}{v}=\\sqrt{\\dfrac{M\'/R\'}{M/R}}=\\sqrt{\\dfrac{8}{2}}=2$이므로 $v\'=2\\times 11.2=22.4$ km/s입니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 3,
      q: '속이 찬 구가 경사면을 미끄러지지 않고 굴러 내려갑니다. 어느 순간이든 구의 전체 운동 에너지 가운데 회전 운동 에너지가 차지하는 비율은 얼마입니까?',
      choices: ['$\\frac{2}{7}$', '$\\frac{2}{5}$', '$\\frac{5}{7}$', '$\\frac{1}{2}$'],
      answer: 0,
      why: [
        '',
        '$\\beta=\\dfrac{I}{MR^2}=\\frac{2}{5}$는 회전 에너지와 **평행 이동 에너지**의 비입니다. 전체에 대한 비율은 $\\dfrac{\\beta}{1+\\beta}$입니다.',
        '평행 이동 에너지의 비율입니다.',
        '고리처럼 $I=MR^2$일 때의 비율입니다. 구는 질량이 중심 쪽에 몰려 있어 회전 에너지 비율이 더 작습니다.',
      ],
      explain: '$K_{\\text{회전}}=\\frac{1}{2}\\left(\\frac{2}{5}MR^2\\right)\\dfrac{v^2}{R^2}=\\frac{1}{5}Mv^2$, $K_{\\text{이동}}=\\frac{1}{2}Mv^2$. 비율은 $\\dfrac{1/5}{1/5+1/2}=\\dfrac{2}{7}$입니다.',
    },
    {
      id: 'a6', level: 3, type: 'short', check: 'number', unit: 'km/s', concept: 4,
      q: '어떤 혜성은 태양에 가장 가까울 때(근일점) 태양에서 0.5 AU 떨어져 있고 속력이 59 km/s입니다. 가장 멀 때(원일점) 태양에서 29.5 AU 떨어져 있다면 그때의 속력은 몇 km/s입니까? (근일점과 원일점에서 속도는 태양 쪽 방향과 수직입니다.)',
      answer: '1',
      hint: '태양의 중력은 태양을 향하므로 태양에 대한 돌림힘이 0입니다.',
      wrong: [
        { a: '3481', why: '거리의 비를 거꾸로 곱했습니다. 멀어지면 느려집니다.' },
        { a: '59', why: '속력이 일정하다고 보았습니다. 각운동량 $mvr$이 일정하므로 멀수록 느립니다.' },
      ],
      explain: '태양에 대한 각운동량이 보존되고, 두 지점에서 속도가 반지름에 수직이므로 $mv_1r_1=mv_2r_2$입니다. $v_2=59\\times\\dfrac{0.5}{29.5}=1$ km/s. 케플러 제2법칙(같은 시간에 같은 넓이)과 같은 내용입니다.',
    },
  ],

  deeper: [
    {
      title: '직선 운동과 회전 운동의 대응',
      body: '회전 운동의 식은 직선 운동의 식에서 기호만 바꾼 꼴입니다. 표로 정리하면 새 식을 외우지 않아도 됩니다.\n\n| 직선 운동 | 회전 운동 | 잇는 관계 |\n|---|---|---|\n| 위치 $x$ | 각 $\\theta$ | $s=r\\theta$ |\n| 속도 $v$ | 각속도 $\\omega$ | $v=r\\omega$ |\n| 가속도 $a$ | 각가속도 $\\alpha$ | $a_t=r\\alpha$ |\n| 질량 $m$ | 관성 모멘트 $I$ | $I=\\sum mr^2$ |\n| 힘 $F$ | 돌림힘 $\\tau$ | $\\vec{\\tau}=\\vec{r}\\times\\vec{F}$ |\n| $\\sum F=ma$ | $\\sum\\tau=I\\alpha$ | |\n| 운동량 $p=mv$ | 각운동량 $L=I\\omega$ | $\\vec{L}=\\vec{r}\\times\\vec{p}$ |\n| 운동 에너지 $\\frac{1}{2}mv^2$ | 회전 운동 에너지 $\\frac{1}{2}I\\omega^2$ | |\n| 일 $W=\\int F\\,dx$ | 일 $W=\\int\\tau\\,d\\theta$ | |\n\n다만 질량은 물체마다 하나로 정해지지만, 관성 모멘트는 회전축을 고를 때마다 달라진다는 점이 다릅니다. 또 3차원 회전에서는 각운동량과 각속도의 방향이 서로 다를 수도 있어, 관성 모멘트를 행렬(관성 텐서)로 다룹니다. 이것은 고전역학 과목에서 배웁니다.',
    },
    {
      title: '사과와 달 — 뉴턴의 확인',
      body: '뉴턴은 지표면의 물체를 떨어뜨리는 힘과 달을 붙잡아 두는 힘이 같은 중력인지 확인하고 싶었습니다. 달은 지구 중심에서 지구 반지름의 약 60배 거리에 있습니다. 중력이 거리의 제곱에 반비례한다면 달 위치의 중력 가속도는 $\\dfrac{9.8}{60^2}\\approx 2.7\\times 10^{-3}\\ \\mathrm{m/s²}$이어야 합니다.\n\n한편 달의 실제 구심 가속도는 공전 반지름 약 $3.84\\times 10^8$ m와 공전 주기 약 27.3일($2.36\\times 10^6$ s)로 계산할 수 있습니다.\n\n$a=\\dfrac{4\\pi^2r}{T^2}=\\dfrac{4\\pi^2\\times 3.84\\times 10^8}{(2.36\\times 10^6)^2}\\approx 2.7\\times 10^{-3}\\ \\mathrm{m/s²}$\n\n두 값이 맞아떨어졌고, 이것이 하늘과 땅의 운동을 한 법칙으로 묶은 첫 증거가 되었습니다. 오늘날 인공위성의 궤도 설계, 행성 탐사선의 항로 계산도 같은 법칙에서 출발합니다. 다만 매우 강한 중력이나 매우 정밀한 계산(위성 항법의 시계 보정 등)에는 일반 상대성 이론이 필요합니다.',
    },
  ],

  faq: [
    {
      q: '우주 정거장 안에서 우주인이 둥둥 떠다니는 건 거기에 중력이 없어서인가요?',
      a: '아닙니다. 지상 약 400 km 높이에서 중력 가속도는 지표면의 약 89%(약 8.7 m/s²)나 됩니다. 우주 정거장과 우주인이 함께 지구를 향해 계속 떨어지면서(자유 낙하) 옆으로 빠르게 움직여 원 궤도를 돌기 때문에, 서로에 대해 떠 있는 것처럼 보이는 것입니다. 이것을 무중력이 아니라 **무게를 느끼지 못하는 상태**라고 이해해야 합니다.',
    },
    {
      q: '돌림힘의 단위 N·m는 일의 단위 J과 같은데, 돌림힘도 에너지인가요?',
      a: '아닙니다. 차원은 같지만 뜻이 다릅니다. 일은 힘과 **힘 방향으로 움직인 거리**의 곱(스칼라)이고, 돌림힘은 힘과 **축에서 작용선까지의 수직 거리**의 곱(벡터)입니다. 그래서 돌림힘은 J로 쓰지 않고 N·m로 씁니다. 돌림힘이 각 $\\Delta\\theta$(rad)만큼 돌리며 하는 일이 $W=\\tau\\Delta\\theta$ (J)입니다.',
    },
    {
      q: '왜 구르는 공은 미끄러지는 상자보다 경사면을 늦게 내려와요?',
      a: '내려오며 줄어든 위치 에너지를 공은 "앞으로 가는 운동 에너지"와 "도는 회전 에너지"로 나눠 가져야 하기 때문입니다. 마찰 없이 미끄러지는 상자는 모두를 앞으로 가는 데 씁니다. 그래서 같은 높이에서 출발하면 상자 $\\sqrt{2gh}$ > 구 $\\sqrt{\\frac{10}{7}gh}$ > 고리 $\\sqrt{gh}$ 순으로 빠릅니다.',
    },
    {
      q: '스케이터가 팔을 오므리면 각운동량은 그대로인데 회전 에너지는 왜 늘어나요? 에너지가 어디서 생긴 거예요?',
      a: '스케이터의 근육이 일을 했습니다. 빠르게 도는 상태에서 팔을 안쪽으로 당기려면 원 운동의 구심력보다 큰 힘으로 팔을 끌어당겨야 하고, 그 힘이 팔을 안쪽으로 움직이며 일을 합니다. 그 일만큼 회전 에너지 $K=\\dfrac{L^2}{2I}$이 늘어납니다. 반대로 팔을 펼 때는 회전 에너지가 줄어듭니다.',
    },
  ],

  mistakes: [
    '각도를 도($^\\circ$)나 회전수 그대로 $v=r\\omega$, $s=r\\theta$에 넣는 실수 — 이 식들은 각을 **라디안**으로 쓸 때만 성립합니다. 한 바퀴는 $2\\pi$ rad입니다.',
    '관성 모멘트가 질량만으로 정해진다고 생각하는 실수 — 같은 물체라도 질량이 축에서 어떻게 퍼져 있는지, 곧 **회전축**에 따라 달라집니다(평행축 정리).',
    '원 궤도 문제에서 위성의 **지표면에서의 높이**를 반지름 $r$로 넣는 실수 — 만유인력 법칙의 $r$은 지구 **중심**에서 잰 거리(지구 반지름 + 높이)입니다.',
  ],

  gens: [
    {
      id: 'angular-kinematics',
      level: 1,
      title: '등각가속도 회전 운동',
      make: function (R) {
        var w0 = R.pick([0, 0, 2, 3, 4, 5]);
        var a = R.int(1, 6);
        var t = R.int(2, 8);
        var askAngle = R.bool();
        var w = w0 + a * t;
        var th = R.F(2 * w0 * t + a * t * t, 2); // θ = ω0 t + ½αt²
        var thText = th.toDecimal() || th.toString();
        var start = w0 === 0 ? '정지해 있던 바퀴가 일정한 각가속도 ' + a + ' rad/s²로 ' + t + ' s 동안 돌았습니다.'
          : '각속도 ' + w0 + ' rad/s로 돌던 바퀴가 일정한 각가속도 ' + a + ' rad/s²로 ' + t + ' s 동안 더 빨라졌습니다.';
        if (askAngle) {
          var noHalf = String(w0 * t + a * t * t);
          var wrong = [];
          if (noHalf !== thText) wrong.push({ a: noHalf, why: '$\\frac{1}{2}$을 빠뜨렸습니다. $\\theta=\\omega_0t+\\frac{1}{2}\\alpha t^2$입니다.' });
          if (String(w) !== thText && String(w) !== noHalf) wrong.push({ a: String(w), why: '나중 각속도 $\\omega=\\omega_0+\\alpha t$를 구했습니다. 묻는 것은 그동안 돈 각입니다.' });
          return {
            type: 'short', check: 'number', unit: 'rad', concept: 0,
            q: start + ' 그동안 바퀴가 돈 각변위는 몇 rad입니까?',
            answer: thText,
            wrong: wrong,
            explain: '$\\theta=\\omega_0t+\\frac{1}{2}\\alpha t^2=' + w0 + '\\times ' + t + '+\\frac{1}{2}\\times ' + a + '\\times ' + t + '^2=' + thText + '$ rad입니다.',
          };
        }
        var wrong2 = [];
        if (String(a * t) !== String(w)) wrong2.push({ a: String(a * t), why: '처음 각속도 ' + w0 + ' rad/s를 더하지 않았습니다. $\\omega=\\omega_0+\\alpha t$입니다.' });
        if (thText !== String(w) && thText !== String(a * t)) wrong2.push({ a: thText, why: '그동안 돈 각변위를 구했습니다. 묻는 것은 나중 각속도입니다.' });
        return {
          type: 'short', check: 'number', unit: 'rad/s', concept: 0,
          q: start + ' 이때 바퀴의 각속도는 몇 rad/s입니까?',
          answer: String(w),
          wrong: wrong2,
          explain: '$\\omega=\\omega_0+\\alpha t=' + w0 + '+' + a + '\\times ' + t + '=' + w + '$ rad/s입니다.',
        };
      },
    },
    {
      id: 'rotational-energy',
      level: 1,
      title: '여러 모양의 회전 운동 에너지',
      make: function (R) {
        var shapes = [
          { name: '얇은 고리', axis: '중심을 지나 고리면에 수직인 축', b: R.F(1, 1), tex: 'MR^2' },
          { name: '속이 찬 원판', axis: '중심축', b: R.F(1, 2), tex: '\\frac{1}{2}MR^2' },
          { name: '속이 찬 구', axis: '중심을 지나는 축', b: R.F(2, 5), tex: '\\frac{2}{5}MR^2' },
        ];
        var s = R.pick(shapes);
        var M = R.pick([2, 4, 5, 10]);
        var r = R.pick([R.F(1, 10), R.F(1, 5), R.F(1, 2)]);
        var w = R.int(2, 10);
        var I = s.b.mul(M).mul(r).mul(r);
        var K = I.mul(w * w).mul(R.F(1, 2));
        var dec = function (f) { return f.toDecimal() || f.toString(); };
        var wrong = [{ a: dec(I.mul(w * w)), why: '$\\frac{1}{2}$을 빠뜨렸습니다. $K=\\frac{1}{2}I\\omega^2$입니다.' }];
        if (s.b.num !== 1 || s.b.den !== 1) {
          var hoop = R.F(M, 1).mul(r).mul(r).mul(w * w).mul(R.F(1, 2));
          if (dec(hoop) !== dec(I.mul(w * w)))
          wrong.push({ a: dec(hoop), why: '관성 모멘트를 $MR^2$(고리)로 썼습니다. ' + s.name + R.josa(s.name, '은/는') + ' $I=' + s.tex + '$입니다.' });
        }
        return {
          type: 'short', check: 'number', unit: 'J', concept: 1,
          q: '질량 ' + M + ' kg, 반지름 ' + dec(r) + ' m인 ' + s.name + R.josa(s.name, '이/가') + ' ' + s.axis + '을 중심으로 ' + w + ' rad/s로 돌고 있습니다. 회전 운동 에너지는 몇 J입니까? (' + s.name + '의 관성 모멘트는 $' + s.tex + '$)',
          answer: dec(K),
          wrong: wrong,
          explain: '$I=' + s.tex + '=' + dec(I) + '$ kg·m²이고, $K=\\frac{1}{2}I\\omega^2=\\frac{1}{2}\\times ' + dec(I) + '\\times ' + w + '^2=' + dec(K) + '$ J입니다.',
        };
      },
    },
    {
      id: 'torque-disk',
      level: 2,
      title: '줄을 감은 원판의 각가속도',
      make: function (R) {
        var M = R.pick([2, 4, 5, 8, 10]);
        var r = R.pick([R.F(1, 10), R.F(1, 5), R.F(1, 4), R.F(1, 2)]);
        var Fz = R.int(2, 12);
        var dec = function (f) { return f.toDecimal() || f.toString(); };
        var I = R.F(1, 2).mul(M).mul(r).mul(r);
        var tau = r.mul(Fz);
        var alpha = tau.div(I);
        var hoopAlpha = tau.div(R.F(M, 1).mul(r).mul(r));
        var wrong = [{ a: dec(hoopAlpha), why: '관성 모멘트를 $MR^2$(고리)로 썼습니다. 원판은 $\\frac{1}{2}MR^2$입니다.' }];
        if (dec(tau) !== dec(alpha) && dec(tau) !== dec(hoopAlpha)) wrong.push({ a: dec(tau), why: '돌림힘 $\\tau=FR$까지만 구했습니다. 각가속도는 $\\alpha=\\dfrac{\\tau}{I}$입니다.' });
        return {
          type: 'short', check: 'number', unit: 'rad/s²', concept: 2,
          q: '마찰 없는 고정축에 달린 질량 ' + M + ' kg, 반지름 ' + dec(r) + ' m인 속이 찬 원판의 가장자리에 줄을 감고, 줄을 접선 방향으로 ' + Fz + ' N의 힘으로 당깁니다. 원판의 각가속도는 몇 rad/s²입니까?',
          answer: dec(alpha),
          wrong: wrong,
          hint: '먼저 돌림힘 $\\tau=FR$과 관성 모멘트 $I=\\frac{1}{2}MR^2$을 구하십시오.',
          explain: '$\\tau=FR=' + Fz + '\\times ' + dec(r) + '=' + dec(tau) + '$ N·m, $I=\\frac{1}{2}MR^2=\\frac{1}{2}\\times ' + M + '\\times ' + dec(r) + '^2=' + dec(I) + '$ kg·m²이므로 $\\alpha=\\dfrac{\\tau}{I}=\\dfrac{' + dec(tau) + '}{' + dec(I) + '}=' + dec(alpha) + '$ rad/s²입니다.',
        };
      },
    },
    {
      id: 'angular-momentum',
      level: 2,
      title: '각운동량 보존',
      make: function (R) {
        var k = R.pick([R.F(3, 2), R.F(2, 1), R.F(5, 2), R.F(3, 1), R.F(4, 1)]);
        var I2 = R.pick([R.F(6, 5), R.F(3, 2), R.F(8, 5), R.F(2, 1), R.F(5, 2)]);
        var w1 = R.pick([R.F(1, 1), R.F(6, 5), R.F(3, 2), R.F(2, 1), R.F(5, 2), R.F(3, 1)]);
        var dec = function (f) { return f.toDecimal() || f.toString(); };
        var I1 = I2.mul(k);
        var w2 = w1.mul(k);
        var who = R.pick([['피겨 스케이터', '팔을 오므려'], ['회전 의자에 앉은 사람', '아령을 든 팔을 가슴 쪽으로 당겨'], ['다이빙 선수', '공중에서 몸을 웅크려']]);
        return {
          type: 'short', check: 'number', unit: 'rad/s', concept: 4,
          q: '관성 모멘트 ' + dec(I1) + ' kg·m²인 자세로 ' + dec(w1) + ' rad/s로 돌던 ' + who[0] + R.josa(who[0], '이/가') + ' ' + who[1] + ' 관성 모멘트가 ' + dec(I2) + ' kg·m²가 되었습니다. 이때 각속도는 몇 rad/s입니까? (외부 돌림힘 무시)',
          answer: dec(w2),
          wrong: [
            { a: dec(w1.div(k)), why: '관성 모멘트의 비를 거꾸로 곱했습니다. 관성 모멘트가 작아지면 각속도는 커집니다.' },
            { a: dec(w1), why: '각속도가 그대로라고 보았습니다. 보존되는 양은 각운동량 $I\\omega$입니다.' },
          ],
          explain: '외부 돌림힘이 없으므로 $I_i\\omega_i=I_f\\omega_f$, $' + dec(I1) + '\\times ' + dec(w1) + '=' + dec(I2) + '\\,\\omega_f$, $\\omega_f=' + dec(w2) + '$ rad/s입니다. 관성 모멘트가 $' + R.fmt.frac(R.F(k.den, k.num)) + '$배가 되었으니 각속도는 ' + dec(k) + '배입니다.',
        };
      },
    },
    {
      id: 'rolling-incline',
      level: 2,
      title: '경사면을 굴러 내려온 속력',
      make: function (R) {
        var shapes = [
          { name: '얇은 고리', beta: '1', c: R.F(1, 5), formula: 'v=\\sqrt{gh}', slide: R.F(98, 25) },
          { name: '속이 찬 원기둥', beta: '\\frac{1}{2}', c: R.F(3, 20), formula: 'v=\\sqrt{\\frac{4}{3}gh}', slide: R.F(147, 50) },
          { name: '속이 찬 구', beta: '\\frac{2}{5}', c: R.F(7, 50), formula: 'v=\\sqrt{\\frac{10}{7}gh}', slide: R.F(343, 125) },
        ];
        var s = R.pick(shapes);
        var k = R.int(1, 5);
        var M = R.pick([1, 2, 3, 5]);
        var h = s.c.mul(k * k);
        var v = R.F(7 * k, 5); // 1.4k
        var dec = function (f) { return f.toDecimal() || f.toString(); };
        var slideV = Math.round(Math.sqrt(s.slide.valueOf()) * k * 100) / 100; // √(2gh) = √(2g·c)·k
        return {
          type: 'short', check: 'number', unit: 'm/s', concept: 3,
          q: '질량 ' + M + ' kg인 ' + s.name + R.josa(s.name, '이/가') + ' 높이 ' + dec(h) + ' m인 경사면 꼭대기에서 정지 상태로 출발해 미끄러지지 않고 굴러 내려왔습니다. 바닥에서 중심의 속력은 몇 m/s입니까? ($g=9.8\\ \\mathrm{m/s²}$)',
          answer: dec(v),
          wrong: [{ a: R.fmt.dec(slideV, 2), why: '회전 에너지를 빠뜨리고 미끄러지는 물체처럼 $v=\\sqrt{2gh}$로 계산했습니다. 구르는 물체는 위치 에너지의 일부가 회전 에너지가 됩니다.' }],
          hint: '$Mgh=\\frac{1}{2}M(1+\\beta)v^2$, $\\beta=\\dfrac{I}{MR^2}$입니다. 질량은 지워집니다.',
          explain: s.name + R.josa(s.name, '은/는') + ' $\\beta=' + s.beta + '$이므로 $' + s.formula + '$입니다. $v^2=' + dec(v.mul(v)) + '$, $v=' + dec(v) + '$ m/s입니다. 질량 ' + M + ' kg은 답에 영향을 주지 않습니다.',
        };
      },
    },
    {
      id: 'planet-ratio',
      level: 2,
      title: '행성과 궤도의 비례 관계',
      make: function (R) {
        var kind = R.pick(['g', 'kepler', 'escape']);
        if (kind === 'g') {
          var a = R.pick([2, 3, 4, 8, 9, 16]);
          var b = R.pick([2, 3, 4]);
          var g = R.F(a, b * b);
          var wrong = [];
          var lin = R.F(a, b);
          if (!lin.eq(g)) wrong.push({ a: lin.toString(), why: '반지름을 제곱하지 않았습니다. $g=\\dfrac{GM}{R^2}$입니다.' });
          var inv = R.F(b * b, a);
          if (!inv.eq(g) && !inv.eq(lin)) wrong.push({ a: inv.toString(), why: '비를 거꾸로 구했습니다. 질량이 크면 $g$가 커지고, 반지름이 크면 작아집니다.' });
          return {
            type: 'short', check: 'number', concept: 5,
            q: '어떤 행성의 질량은 지구의 ' + a + '배, 반지름은 지구의 ' + b + '배입니다. 이 행성 표면의 중력 가속도는 지구 표면의 몇 배입니까? (분수로 써도 됩니다.)',
            answer: g.toString(),
            wrong: wrong,
            explain: '$g=\\dfrac{GM}{R^2}$이므로 $\\dfrac{g\'}{g}=\\dfrac{' + a + '}{' + b + '^2}=' + R.fmt.frac(g) + '$입니다.',
          };
        }
        if (kind === 'kepler') {
          var opt = R.pick([[4, 1, 8, 1], [9, 1, 27, 1], [16, 1, 64, 1], [1, 4, 1, 8], [1, 9, 1, 27]]);
          var rr = R.F(opt[0], opt[1]);
          var tt = R.F(opt[2], opt[3]);
          var sq = rr.mul(rr);
          return {
            type: 'short', check: 'number', concept: 5,
            q: '같은 행성을 원 궤도로 도는 두 위성 A, B가 있습니다. A의 궤도 반지름이 B의 $' + R.fmt.frac(rr) + '$배일 때, A의 공전 주기는 B의 몇 배입니까? (분수로 써도 됩니다.)',
            answer: tt.toString(),
            wrong: [
              { a: rr.toString(), why: '주기가 반지름에 비례한다고 보았습니다. 케플러 제3법칙은 $T^2\\propto r^3$입니다.' },
              { a: sq.toString(), why: '주기가 반지름의 제곱에 비례한다고 보았습니다. $T\\propto r^{3/2}$입니다.' },
            ],
            explain: '$T^2\\propto r^3$이므로 $\\dfrac{T_A}{T_B}=\\left(' + R.fmt.frac(rr) + '\\right)^{3/2}$입니다. 반지름 비의 제곱근을 세제곱하면 $' + R.fmt.frac(tt) + '$배입니다.',
          };
        }
        var pair = R.pick([[8, 2, 2, 1], [18, 2, 3, 1], [12, 3, 2, 1], [27, 3, 3, 1], [16, 4, 2, 1], [36, 4, 3, 1], [2, 8, 1, 2], [9, 4, 3, 2]]);
        var ratio = R.F(pair[2], pair[3]);
        var v = R.F(56, 5).mul(ratio);
        var noRoot = R.F(56, 5).mul(R.F(pair[0], pair[1]));
        var dec = function (f) { return f.toDecimal() || f.toString(); };
        var wr = [];
        if (!noRoot.eq(v)) wr.push({ a: dec(noRoot), why: '제곱근을 빠뜨렸습니다. $v=\\sqrt{\\dfrac{2GM}{R}}$이므로 $\\dfrac{M}{R}$ 비의 제곱근만큼 바뀝니다.' });
        if (!ratio.eq(1)) wr.push({ a: '11.2', why: '탈출 속도가 어느 천체에서나 같다고 보았습니다. 천체의 질량과 반지름에 따라 다릅니다.' });
        return {
          type: 'short', check: 'number', unit: 'km/s', concept: 5,
          q: '어떤 행성의 질량은 지구의 ' + pair[0] + '배, 반지름은 지구의 ' + pair[1] + '배입니다. 지구 표면의 탈출 속도가 11.2 km/s일 때, 이 행성 표면의 탈출 속도는 몇 km/s입니까?',
          answer: dec(v),
          wrong: wr,
          explain: '$v=\\sqrt{\\dfrac{2GM}{R}}$이므로 $\\dfrac{v\'}{v}=\\sqrt{\\dfrac{' + pair[0] + '}{' + pair[1] + '}}=' + R.fmt.frac(ratio) + '$, $v\'=11.2\\times ' + R.fmt.frac(ratio) + '=' + dec(v) + '$ km/s입니다.',
        };
      },
    },
  ],
});
