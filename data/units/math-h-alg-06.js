/* 대수 · 일반각과 호도법
 * 시초선과 동경, 양의 각·음의 각, 일반각 360°×n+α 와 사분면의 각,
 * 호도법(1라디안, 180°=π), 부채꼴의 호의 길이 l=rθ 와 넓이 S=½r²θ 를 다룬다. */
(function () {
  // Frac f 에 π 를 곱한 값 → [답 칸 글자, TeX]   예: 5/6 → ['5π/6', '\\frac{5\\pi}{6}']
  function piStr(f) {
    if (f.isZero()) return ['0', '0'];
    var a = Math.abs(f.num), b = f.den, s = f.num < 0 ? '-' : '';
    var top = (a === 1 ? '' : a) + 'π';
    var topT = (a === 1 ? '' : a) + '\\pi';
    if (b === 1) return [s + top, s + topT];
    return [s + top + '/' + b, s + '\\frac{' + topT + '}{' + b + '}'];
  }
  var QUAD = ['제1사분면', '제2사분면', '제3사분면', '제4사분면'];
  function mod360(t) { return ((t % 360) + 360) % 360; }

  var RAD_SVG = '<svg viewBox="0 0 220 170" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="90" cy="120" r="80" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.5"/>' +
    '<path d="M170 120 A80 80 0 0 0 133.2 52.7" fill="none" stroke="var(--fig-1)" stroke-width="4"/>' +
    '<line x1="90" y1="120" x2="170" y2="120" stroke="currentColor" stroke-width="2"/>' +
    '<line x1="90" y1="120" x2="133.2" y2="52.7" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M112 120 A22 22 0 0 0 101.9 101.5" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
    '<circle cx="90" cy="120" r="3" fill="currentColor"/>' +
    '<text x="130" y="137" font-size="14" fill="currentColor" text-anchor="middle">r</text>' +
    '<text x="100" y="82" font-size="14" fill="currentColor" text-anchor="middle">r</text>' +
    '<text x="178" y="76" font-size="14" fill="var(--fig-1)" text-anchor="middle">호 r</text>' +
    '<text x="124" y="108" font-size="12" fill="currentColor" text-anchor="start">1</text>' +
    '<text x="80" y="138" font-size="12" fill="currentColor" text-anchor="middle">O</text>' +
    '</svg>';

  var SECTOR_SVG = '<svg viewBox="0 0 200 175" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M40 150 L160 150 A120 120 0 0 0 117.1 58.1 Z" fill="var(--fig-2)" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M70 150 A30 30 0 0 0 59.3 127" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
    '<text x="100" y="167" font-size="14" fill="currentColor" text-anchor="middle">r</text>' +
    '<text x="72" y="138" font-size="14" fill="currentColor" text-anchor="start">θ</text>' +
    '<text x="166" y="96" font-size="14" fill="currentColor" text-anchor="start">l</text>' +
    '<text x="30" y="165" font-size="12" fill="currentColor" text-anchor="middle">O</text>' +
    '</svg>';

  var SIGN_SVG = '<svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg">' +
    '<line x1="100" y1="100" x2="200" y2="100" stroke="currentColor" stroke-width="2"/>' +
    '<line x1="100" y1="100" x2="145" y2="22" stroke="var(--fig-1)" stroke-width="2.5"/>' +
    '<line x1="100" y1="100" x2="145" y2="178" stroke="var(--fig-2)" stroke-width="2.5"/>' +
    '<path d="M135 100 A35 35 0 0 0 117.5 69.7" fill="none" stroke="var(--fig-1)" stroke-width="1.5"/>' +
    '<path d="M135 100 A35 35 0 0 1 117.5 130.3" fill="none" stroke="var(--fig-2)" stroke-width="1.5"/>' +
    '<circle cx="100" cy="100" r="3" fill="currentColor"/>' +
    '<text x="90" y="104" font-size="12" fill="currentColor" text-anchor="end">O</text>' +
    '<text x="204" y="96" font-size="12" fill="currentColor" text-anchor="end">X (시초선)</text>' +
    '<text x="150" y="20" font-size="12" fill="var(--fig-1)" text-anchor="start">P</text>' +
    '<text x="150" y="186" font-size="12" fill="var(--fig-2)" text-anchor="start">Q</text>' +
    '<text x="142" y="74" font-size="12" fill="var(--fig-1)" text-anchor="start">60°</text>' +
    '<text x="142" y="134" font-size="12" fill="var(--fig-2)" text-anchor="start">−60°</text>' +
    '</svg>';

  Tutor.registerUnit({
    id: 'math-h-alg-06',
    course: 'math-h-alg',
    title: '일반각과 호도법',
    summary: '회전하는 동경으로 일반각을 나타내고, 각을 라디안으로 재는 호도법과 부채꼴의 호의 길이·넓이를 구합니다.',
    goals: [
      '시초선과 동경을 이용하여 양의 각과 음의 각을 나타낼 수 있다.',
      '일반각을 $360°\\times n+\\alpha°$ 꼴로 나타내고, 동경이 놓인 사분면을 말할 수 있다.',
      '육십분법과 호도법 사이의 관계를 이해하고 서로 바꿀 수 있다.',
      '호도법을 이용하여 부채꼴의 호의 길이와 넓이를 구할 수 있다.',
    ],
    standards: ['[12대수02-01]'],

    concepts: [
      {
        title: '시초선과 동경, 양의 각과 음의 각',
        body: '점 O를 중심으로 반직선 OP가 고정된 반직선 OX의 위치에서 출발하여 회전한다고 합시다. 이때 반직선 OX를 **시초선**, 회전하는 반직선 OP를 **동경**이라고 합니다.\n\n동경이 도는 방향에 따라 각의 부호를 정합니다.\n\n- 시곗바늘이 도는 방향과 **반대** 방향: **양의 방향** → 양의 각\n- 시곗바늘이 도는 방향: **음의 방향** → 음의 각\n\n동경이 양의 방향으로 $60°$만큼 돌면 $60°$, 음의 방향으로 $60°$만큼 돌면 $-60°$입니다.\n\n각을 이렇게 **회전의 양**으로 생각하면 $360°$보다 큰 각도 생깁니다. 동경이 양의 방향으로 한 바퀴 돌고 $30°$를 더 돌면 $390°$입니다. 좌표평면에서는 보통 시초선을 $x$축의 양의 방향으로 잡습니다.',
        easy: '선풍기 날개 하나를 떠올려 보십시오. 날개가 출발한 위치가 시초선, 돌고 있는 날개가 동경입니다.\n\n시계 반대 방향으로 돌면 +, 시계 방향으로 돌면 −를 붙이고, 여러 바퀴 돌면 도는 만큼 각이 커집니다. 각이 "두 변이 벌어진 정도"에서 "얼마나 돌았는가"로 바뀌는 것입니다.',
        fig: { type: 'svg', svg: SIGN_SVG, alt: '시초선 OX에서 시계 반대 방향으로 60도 돈 동경 OP와 시계 방향으로 60도 돈 동경 OQ. OP는 60도, OQ는 -60도' },
        check: {
          type: 'ox',
          q: '동경이 시곗바늘이 도는 방향으로 $90°$만큼 회전하여 생긴 각은 $-90°$입니다.',
          answer: true,
          explain: '시곗바늘이 도는 방향은 음의 방향입니다. 그래서 $90°$만큼 돌면 $-90°$입니다.',
        },
      },
      {
        title: '일반각',
        body: '시초선 OX와 동경 OP의 위치가 정해져도 동경 OP가 나타내는 각은 하나로 정해지지 않습니다. 동경이 한 바퀴($360°$)를 더 돌거나 덜 돌아도 같은 위치에 오기 때문입니다.\n\n$\\angle XOP$의 크기 가운데 하나를 $\\alpha°$라고 하면 동경 OP가 나타내는 각은\n\n$360°\\times n+\\alpha°$ ($n$은 정수)\n\n로 나타낼 수 있습니다. 이것을 동경 OP가 나타내는 **일반각**이라고 합니다. 보통 $\\alpha$는 $0°\\le\\alpha°<360°$에서 잡습니다.\n\n예: $780°=360°\\times2+60°$ → 동경은 $60°$를 나타내는 동경과 같은 위치\n\n예: $-300°=360°\\times(-1)+60°$ → 역시 $60°$를 나타내는 동경과 같은 위치\n\n> 💡 음의 각은 $360°$를 몇 번 **더해서** $0°$ 이상 $360°$ 미만으로 만듭니다. $-300°+360°=60°$',
        easy: '시계의 분침은 1시간이 지나든 2시간이 지나든 같은 자리(정각)를 가리킵니다. 돈 바퀴 수만 다를 뿐입니다.\n\n동경도 같습니다. $60°$, $420°$, $780°$, $-300°$는 바퀴 수만 다르고 모두 같은 자리에 멈춥니다. 그래서 "바퀴 수($n$) + 남은 각($\\alpha$)"으로 나누어 쓰는 것이 일반각입니다.',
        check: {
          type: 'choice',
          q: '다음 중 $50°$를 나타내는 동경과 같은 위치에 있는 동경이 나타내는 각은 무엇입니까?',
          choices: ['$410°$', '$310°$', '$-50°$'],
          answer: 0,
          why: [
            '',
            '$360°$에서 $50°$를 뺐습니다. 같은 위치가 되려면 $360°$의 정수배를 더하거나 빼야 합니다.',
            '부호만 바꾸면 시초선에 대하여 대칭인 위치가 됩니다. $-50°+360°=310°$로 $50°$와 다릅니다.',
          ],
          explain: '$410°=360°\\times1+50°$이므로 $50°$를 나타내는 동경과 같은 위치입니다.',
        },
      },
      {
        title: '사분면의 각',
        body: '시초선을 $x$축의 양의 방향으로 잡을 때, 동경이 제몇사분면에 있느냐에 따라 그 각을 **제1사분면의 각**, **제2사분면의 각**, … 이라고 합니다.\n\n| 사분면 | $\\alpha$ ($0°\\le\\alpha°<360°$)의 범위 |\n|---|---|\n| 제1사분면 | $0°<\\alpha°<90°$ |\n| 제2사분면 | $90°<\\alpha°<180°$ |\n| 제3사분면 | $180°<\\alpha°<270°$ |\n| 제4사분면 | $270°<\\alpha°<360°$ |\n\n일반각을 $360°\\times n+\\alpha°$ 꼴로 바꾸면 $\\alpha$만 보고 사분면을 알 수 있습니다.\n\n예: $-130°=360°\\times(-1)+230°$이므로 $-130°$는 제3사분면의 각입니다.\n\n> ⚠️ 동경이 좌표축 위에 있는 각($0°$, $90°$, $180°$, $270°$, …)은 어느 사분면에도 속하지 않습니다.',
        easy: '먼저 바퀴 수를 떼어 내고 남은 각 $\\alpha$를 구합니다. 그다음 $\\alpha$가 $90°$, $180°$, $270°$ 가운데 어디와 어디 사이에 있는지만 보면 됩니다.\n\n$0°$에서 시작해 시계 반대 방향으로 오른쪽 위(제1사분면) → 왼쪽 위(제2사분면) → 왼쪽 아래(제3사분면) → 오른쪽 아래(제4사분면) 순서입니다.',
        check: {
          type: 'choice',
          q: '$500°$는 제몇사분면의 각입니까?',
          choices: ['제2사분면', '제1사분면', '제3사분면'],
          answer: 0,
          why: [
            '',
            '$500°-360°=140°$입니다. $140°$는 $90°$보다 크므로 제1사분면이 아닙니다.',
            '$500°$를 $360°$로 나눈 나머지 $140°$를 다시 확인하십시오. $90°<140°<180°$입니다.',
          ],
          explain: '$500°=360°\\times1+140°$이고 $90°<140°<180°$이므로 제2사분면의 각입니다.',
        },
      },
      {
        title: '호도법 — 1라디안과 180°=π',
        body: '반지름의 길이가 $r$인 원에서 **길이가 $r$인 호에 대한 중심각**의 크기는 원의 크기와 관계없이 일정합니다. 이 각의 크기를 **1라디안**이라 하고, 라디안을 단위로 각을 나타내는 방법을 **호도법**이라고 합니다. 지금까지 쓴 도($°$) 단위는 **육십분법**입니다.\n\n원 한 바퀴의 호의 길이는 $2\\pi r$이므로 한 바퀴의 각은 $\\frac{2\\pi r}{r}=2\\pi$ 라디안입니다. 곧\n\n$360°=2\\pi$ 라디안, $180°=\\pi$ 라디안\n\n- $1$라디안 $=\\frac{180°}{\\pi}$ (약 $57°$)\n- $1°=\\frac{\\pi}{180}$ 라디안\n\n| 육십분법 | $30°$ | $45°$ | $60°$ | $90°$ | $120°$ | $180°$ | $270°$ | $360°$ |\n|---|---|---|---|---|---|---|---|---|\n| 호도법 | $\\frac{\\pi}{6}$ | $\\frac{\\pi}{4}$ | $\\frac{\\pi}{3}$ | $\\frac{\\pi}{2}$ | $\\frac{2\\pi}{3}$ | $\\pi$ | $\\frac{3\\pi}{2}$ | $2\\pi$ |\n\n> 💡 호도법에서는 단위 "라디안"을 보통 생략합니다. $\\theta=\\frac{\\pi}{3}$는 $\\frac{\\pi}{3}$ 라디안이라는 뜻입니다. 일반각도 $2n\\pi+\\alpha$ ($n$은 정수)로 씁니다.',
        easy: '"$\\pi$ 라디안 $=180°$" 하나만 기억하면 됩니다.\n\n- 도 → 라디안: $\\frac{\\pi}{180}$를 곱합니다. $60°\\times\\frac{\\pi}{180}=\\frac{\\pi}{3}$\n- 라디안 → 도: $\\pi$ 자리에 $180°$를 넣습니다. $\\frac{\\pi}{3}$ → $\\frac{180°}{3}=60°$\n\n1라디안은 반지름 길이만큼의 끈을 원둘레에 붙였을 때 생기는 중심각입니다. 원둘레에는 이런 끈이 $2\\pi$개(약 6.28개) 들어갑니다.',
        fig: { type: 'svg', svg: RAD_SVG, alt: '반지름이 r인 원에서 길이가 r인 호와 그 호에 대한 중심각 1라디안' },
        check: {
          type: 'short', check: 'expr',
          q: '$150°$를 호도법으로 나타내십시오. ($\\pi$는 pi로 써도 됩니다.)',
          answer: '5π/6',
          wrong: [{ a: '5/6', why: '$\\pi$를 빠뜨렸습니다. $150°\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}$입니다.' }],
          explain: '$150°\\times\\frac{\\pi}{180}=\\frac{150}{180}\\pi=\\frac{5\\pi}{6}$입니다.',
        },
      },
      {
        title: '부채꼴의 호의 길이와 넓이',
        body: '한 원에서 부채꼴의 호의 길이와 넓이는 중심각의 크기에 비례합니다. 반지름의 길이가 $r$, 중심각의 크기가 $\\theta$ (라디안)인 부채꼴에서 한 바퀴의 각 $2\\pi$와 비교하면\n\n- 호의 길이: $l=2\\pi r\\times\\frac{\\theta}{2\\pi}=r\\theta$\n- 넓이: $S=\\pi r^{2}\\times\\frac{\\theta}{2\\pi}=\\frac{1}{2}r^{2}\\theta$\n\n두 식을 합치면 $S=\\frac{1}{2}r\\cdot r\\theta=\\frac{1}{2}rl$로도 쓸 수 있습니다.\n\n예: 반지름 6, 중심각 $\\frac{\\pi}{3}$인 부채꼴 → $l=6\\times\\frac{\\pi}{3}=2\\pi$, $S=\\frac{1}{2}\\times6^{2}\\times\\frac{\\pi}{3}=6\\pi$\n\n> ⚠️ 이 공식의 $\\theta$는 **라디안**입니다. 중심각이 도로 주어지면 먼저 호도법으로 바꿉니다.\n\n> 💡 중학교에서 쓴 $l=2\\pi r\\times\\frac{x}{360}$보다 훨씬 간단합니다. 호도법을 쓰는 큰 이유입니다.',
        easy: '호도법에서 중심각 $\\theta$는 "호의 길이가 반지름의 몇 배인가"입니다. 그래서 호의 길이는 반지름에 $\\theta$를 곱하면 바로 나옵니다: $l=r\\theta$.\n\n넓이는 삼각형 넓이 공식과 닮았습니다. 부채꼴을 아주 가늘게 잘라 붙이면 밑변이 $l$, 높이가 $r$인 삼각형처럼 되어 $S=\\frac{1}{2}rl$입니다.',
        fig: { type: 'svg', svg: SECTOR_SVG, alt: '반지름 r, 중심각 θ, 호의 길이 l인 부채꼴' },
        check: {
          type: 'short', check: 'expr',
          q: '반지름의 길이가 4이고 중심각의 크기가 $\\frac{\\pi}{2}$인 부채꼴의 호의 길이를 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
          answer: '2π',
          wrong: [{ a: '4π', why: '넓이 공식 $\\frac{1}{2}r^{2}\\theta$로 계산했습니다. 호의 길이는 $l=r\\theta$입니다.' }],
          explain: '$l=r\\theta=4\\times\\frac{\\pi}{2}=2\\pi$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$-1000°$를 $360°\\times n+\\alpha°$ ($n$은 정수, $0°\\le\\alpha°<360°$) 꼴로 나타내고, 제몇사분면의 각인지 말하십시오.',
        steps: [
          '음의 각이므로 $360°$를 몇 번 더해 $0°$ 이상 $360°$ 미만으로 만듭니다.',
          '$-1000°+360°\\times3=-1000°+1080°=80°$입니다.',
          '그래서 $-1000°=360°\\times(-3)+80°$이고, $n=-3$, $\\alpha=80$입니다.',
          '$0°<80°<90°$이므로 제1사분면의 각입니다.',
        ],
        answer: '$-1000°=360°\\times(-3)+80°$, 제1사분면의 각',
      },
      {
        q: '반지름의 길이가 8이고 중심각의 크기가 $135°$인 부채꼴의 호의 길이 $l$과 넓이 $S$를 구하십시오.',
        steps: [
          '중심각을 호도법으로 바꿉니다. $135°\\times\\frac{\\pi}{180}=\\frac{3\\pi}{4}$',
          '호의 길이: $l=r\\theta=8\\times\\frac{3\\pi}{4}=6\\pi$',
          '넓이: $S=\\frac{1}{2}r^{2}\\theta=\\frac{1}{2}\\times64\\times\\frac{3\\pi}{4}=24\\pi$',
          '확인: $S=\\frac{1}{2}rl=\\frac{1}{2}\\times8\\times6\\pi=24\\pi$로 같습니다.',
        ],
        answer: '$l=6\\pi$, $S=24\\pi$',
      },
    ],

    terms: [
      { term: '시초선', def: '각을 잴 때 기준이 되는 고정된 반직선입니다. 좌표평면에서는 보통 $x$축의 양의 방향입니다.' },
      { term: '동경', def: '시초선의 위치에서 출발하여 한 점을 중심으로 회전하는 반직선입니다.' },
      { term: '양의 각·음의 각', def: '동경이 시곗바늘이 도는 방향과 반대로 돌면 양의 각, 같은 방향으로 돌면 음의 각입니다.' },
      { term: '일반각', def: '동경이 나타내는 모든 각을 $360°\\times n+\\alpha°$ ($n$은 정수) 꼴로 나타낸 것입니다. 호도법으로는 $2n\\pi+\\alpha$입니다.' },
      { term: '사분면의 각', def: '동경이 제몇사분면에 있느냐에 따라 부르는 이름입니다. 동경이 좌표축 위에 있으면 어느 사분면의 각도 아닙니다.' },
      { term: '라디안', def: '반지름의 길이와 같은 길이의 호에 대한 중심각의 크기를 1라디안이라고 합니다. $\\pi$ 라디안은 $180°$입니다.' },
      { term: '호도법', def: '라디안을 단위로 각의 크기를 나타내는 방법입니다. 단위 "라디안"은 보통 생략합니다.' },
      { term: '육십분법', def: '원 한 바퀴를 $360°$로 하여 도($°$) 단위로 각의 크기를 나타내는 방법입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'ox', concept: 0,
        q: '동경이 시곗바늘이 도는 방향으로 회전하여 생긴 각은 양의 각입니다.',
        answer: false,
        explain: '시곗바늘이 도는 방향은 음의 방향이므로 음의 각입니다. 양의 각은 시곗바늘이 도는 방향과 반대로 회전하여 생긴 각입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '$-40°$를 나타내는 동경과 같은 위치에 있는 동경이 나타내는 각은 무엇입니까?',
        choices: ['$320°$', '$40°$', '$140°$', '$220°$'],
        answer: 0,
        why: [
          '',
          '부호만 바꾸었습니다. $40°$는 $-40°$와 시초선에 대하여 대칭인 위치입니다.',
          '$180°$에서 $40°$를 뺐습니다. 같은 위치가 되려면 $360°$의 정수배를 더해야 합니다.',
          '$180°$에 $40°$를 더했습니다. $-40°+360°$를 계산해 보십시오.',
        ],
        explain: '$-40°+360°=320°$이므로 $-40°=360°\\times(-1)+320°$입니다. $320°$를 나타내는 동경과 같은 위치입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', unit: '°', concept: 1,
        q: '$1000°$를 $360°\\times n+\\alpha°$ ($n$은 정수, $0°\\le\\alpha°<360°$) 꼴로 나타낼 때, $\\alpha$의 값을 구하십시오.',
        answer: '280',
        wrong: [
          { a: '640', why: '$360°$를 한 번만 뺐습니다. $640°$는 아직 $360°$보다 크므로 한 번 더 뺍니다.' },
          { a: '80', why: '$1080°-1000°$를 계산했습니다. $\\alpha$는 $1000°$에서 $360°$의 정수배를 뺀 값입니다.' },
        ],
        explain: '$1000°=360°\\times2+280°$이므로 $\\alpha=280$입니다. ($n=2$)',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '다음 중 제4사분면의 각은 무엇입니까?',
        choices: ['$-60°$', '$240°$', '$-200°$', '$420°$'],
        answer: 0,
        why: [
          '',
          '$180°<240°<270°$이므로 제3사분면의 각입니다.',
          '$-200°+360°=160°$이므로 제2사분면의 각입니다.',
          '$420°-360°=60°$이므로 제1사분면의 각입니다.',
        ],
        explain: '$-60°=360°\\times(-1)+300°$이고 $270°<300°<360°$이므로 제4사분면의 각입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', unit: '°', concept: 3,
        q: '$\\frac{7\\pi}{6}$를 육십분법으로 나타내면 몇 도입니까?',
        answer: '210',
        wrong: [{ a: '420', why: '$\\pi$를 $360°$로 바꾸었습니다. $\\pi$ 라디안은 $180°$입니다.' }],
        explain: '$\\pi$ 라디안이 $180°$이므로 $\\frac{7\\pi}{6}=\\frac{7\\times180°}{6}=210°$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '1라디안에 대한 설명으로 옳은 것은 무엇입니까?',
        choices: [
          '반지름의 길이와 호의 길이가 같은 부채꼴의 중심각의 크기',
          '원의 둘레를 360등분한 호에 대한 중심각의 크기',
          '$180°$와 같은 크기의 각',
          '지름의 길이와 호의 길이가 같은 부채꼴의 중심각의 크기',
        ],
        answer: 0,
        why: [
          '',
          '그것은 $1°$의 뜻입니다(육십분법).',
          '$180°$는 $\\pi$ 라디안입니다. 1라디안은 약 $57°$입니다.',
          '지름이 아니라 반지름과 같은 길이의 호입니다.',
        ],
        explain: '반지름의 길이가 $r$인 원에서 길이가 $r$인 호에 대한 중심각의 크기가 1라디안입니다. 원의 크기와 관계없이 $\\frac{180°}{\\pi}$, 약 $57°$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'expr', concept: 4,
        q: '반지름의 길이가 6이고 중심각의 크기가 $150°$인 부채꼴의 넓이를 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
        answer: '15π',
        hint: '중심각을 먼저 호도법으로 바꾸십시오.',
        wrong: [
          { a: '30π', why: '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다. $S=\\frac{1}{2}r^{2}\\theta$입니다.' },
          { a: '2700', why: '중심각을 도 단위 그대로 넣었습니다. $150°=\\frac{5\\pi}{6}$로 바꾸어야 합니다.' },
        ],
        explain: '$150°=\\frac{5\\pi}{6}$이므로 $S=\\frac{1}{2}\\times6^{2}\\times\\frac{5\\pi}{6}=15\\pi$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 4,
        q: '반지름의 길이가 5이고 호의 길이가 4인 부채꼴의 넓이를 구하십시오.',
        answer: '10',
        hint: '$S=\\frac{1}{2}rl$을 쓰면 중심각을 구하지 않아도 됩니다.',
        wrong: [{ a: '20', why: '$\\frac{1}{2}$을 빠뜨렸습니다. $S=\\frac{1}{2}rl$입니다.' }],
        explain: '$S=\\frac{1}{2}rl=\\frac{1}{2}\\times5\\times4=10$입니다. (중심각은 $\\theta=\\frac{l}{r}=\\frac{4}{5}$입니다.)',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '호의 길이가 $2\\pi$이고 넓이가 $6\\pi$인 부채꼴의 반지름의 길이를 구하십시오.',
        answer: '6',
        hint: '넓이와 호의 길이를 함께 쓰는 공식 $S=\\frac{1}{2}rl$을 떠올리십시오.',
        wrong: [{ a: '3', why: '$\\frac{1}{2}$을 빠뜨려 $6\\pi=r\\times2\\pi$로 풀었습니다.' }],
        explain: '$S=\\frac{1}{2}rl$에서 $6\\pi=\\frac{1}{2}\\times r\\times2\\pi=\\pi r$이므로 $r=6$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'expr', concept: 3,
        q: '$\\frac{17\\pi}{4}$를 $2n\\pi+\\alpha$ ($n$은 정수, $0\\le\\alpha<2\\pi$) 꼴로 나타낼 때, $\\alpha$를 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
        answer: 'π/4',
        hint: '$2\\pi=\\frac{8\\pi}{4}$입니다. $\\frac{17\\pi}{4}$에서 $\\frac{8\\pi}{4}$를 몇 번 뺄 수 있는지 보십시오.',
        wrong: [{ a: '9π/4', why: '$2\\pi$를 한 번만 뺐습니다. $\\frac{9\\pi}{4}$는 아직 $2\\pi$보다 크므로 한 번 더 뺍니다.' }],
        explain: '$\\frac{17\\pi}{4}=\\frac{16\\pi}{4}+\\frac{\\pi}{4}=2\\times2\\pi+\\frac{\\pi}{4}$이므로 $n=2$, $\\alpha=\\frac{\\pi}{4}$입니다.',
      },
      {
        id: 'p11', level: 1, type: 'choice', fixed: true, concept: 2,
        q: '$-\\frac{5\\pi}{3}$는 제몇사분면의 각입니까?',
        choices: ['제1사분면', '제2사분면', '제3사분면', '제4사분면'],
        answer: 0,
        why: [
          '',
          '$-\\frac{5\\pi}{3}+2\\pi=\\frac{\\pi}{3}$이고, $\\frac{\\pi}{3}$는 0과 $\\frac{\\pi}{2}$ 사이에 있습니다. 제2사분면의 각은 $\\frac{\\pi}{2}$와 $\\pi$ 사이입니다.',
          '$-\\frac{5\\pi}{3}+2\\pi=\\frac{\\pi}{3}$입니다. $\\frac{\\pi}{3}$는 $60°$입니다.',
          '부호를 빼고 $\\frac{5\\pi}{3}$ (제4사분면)로 판단했습니다. 음의 각은 $2\\pi$를 더해 바꿉니다.',
        ],
        explain: '$-\\frac{5\\pi}{3}=2\\pi\\times(-1)+\\frac{\\pi}{3}$이고 $0<\\frac{\\pi}{3}<\\frac{\\pi}{2}$이므로 제1사분면의 각입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '$\\theta$가 제2사분면의 각일 때, $\\frac{\\theta}{2}$를 나타내는 동경이 있을 수 있는 사분면을 모두 고른 것은 무엇입니까?',
        choices: ['제1사분면 또는 제3사분면', '제1사분면', '제1사분면 또는 제2사분면', '제2사분면 또는 제4사분면'],
        answer: 0,
        why: [
          '',
          '$\\theta$를 $90°<\\theta<180°$로만 생각했습니다. 일반각 $360°\\times n$을 붙이면 $\\frac{\\theta}{2}$에는 $180°\\times n$이 붙습니다.',
          '$\\frac{\\theta}{2}$의 범위를 다시 계산하십시오. $45°+180°\\times n<\\frac{\\theta}{2}<90°+180°\\times n$입니다.',
          '범위를 $90°$씩 잘못 옮겼습니다. $n$이 짝수일 때와 홀수일 때를 나누어 보십시오.',
        ],
        hint: '$\\theta$를 일반각 $360°\\times n+90°<\\theta<360°\\times n+180°$로 놓고 2로 나누어 보십시오.',
        explain: '$360°\\times n+90°<\\theta<360°\\times n+180°$이므로 $180°\\times n+45°<\\frac{\\theta}{2}<180°\\times n+90°$입니다.\n\n- $n$이 짝수이면 $45°$와 $90°$ 사이와 같은 위치 → 제1사분면\n- $n$이 홀수이면 $225°$와 $270°$ 사이와 같은 위치 → 제3사분면',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'set', concept: 1,
        q: '각 $\\theta$를 나타내는 동경과 각 $7\\theta$를 나타내는 동경이 일치할 때, $0<\\theta<\\pi$인 $\\theta$의 값을 모두 구하십시오. (쉼표로 구분, $\\pi$는 pi로 써도 됩니다.)',
        answer: ['π/3', '2π/3'],
        hint: '두 동경이 일치하면 두 각의 차가 $2\\pi$의 정수배입니다.',
        wrong: [
          { a: ['π/3', '2π/3', 'π'], why: '$\\theta=\\pi$는 $0<\\theta<\\pi$에 들어가지 않습니다(끝 값 제외).' },
          { a: ['π/3'], why: '$n=2$일 때의 $\\theta=\\frac{2\\pi}{3}$도 범위 안에 있습니다.' },
        ],
        explain: '두 동경이 일치하므로 $7\\theta-\\theta=2n\\pi$ ($n$은 정수), 곧 $\\theta=\\frac{n\\pi}{3}$입니다. $0<\\frac{n\\pi}{3}<\\pi$에서 $0<n<3$이므로 $n=1, 2$, $\\theta=\\frac{\\pi}{3}, \\frac{2\\pi}{3}$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'expr', concept: 4,
        q: '어떤 부채꼴의 둘레의 길이가 같은 반지름을 가진 원의 둘레의 길이의 절반과 같습니다. 이 부채꼴의 중심각의 크기를 호도법으로 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
        answer: 'π-2',
        hint: '부채꼴의 둘레는 (반지름 2개) + (호)입니다.',
        wrong: [{ a: 'π', why: '부채꼴의 둘레에 반지름 두 개가 들어간다는 것을 빠뜨렸습니다. 둘레는 $2r+r\\theta$입니다.' }],
        explain: '반지름을 $r$, 중심각을 $\\theta$라고 하면 둘레는 $2r+r\\theta$, 원 둘레의 절반은 $\\pi r$입니다. $2r+r\\theta=\\pi r$에서 $\\theta=\\pi-2$입니다. (약 1.14 라디안으로 양수이므로 알맞습니다.)',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'expr', concept: 4,
        q: '밑면의 반지름의 길이가 3이고 모선의 길이가 9인 원뿔의 전개도에서, 옆면인 부채꼴의 중심각의 크기를 호도법으로 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
        answer: '2π/3',
        hint: '옆면 부채꼴의 호의 길이는 밑면인 원의 둘레와 같습니다.',
        wrong: [
          { a: '120', why: '육십분법으로 답했습니다. $120°$를 호도법으로 바꾸면 $\\frac{2\\pi}{3}$입니다.' },
          { a: 'π/3', why: '밑면의 둘레를 $\\pi r$로 계산했습니다. 원의 둘레는 $2\\pi r=6\\pi$입니다.' },
        ],
        explain: '옆면 부채꼴의 반지름은 모선의 길이 9이고, 호의 길이는 밑면의 둘레 $2\\pi\\times3=6\\pi$입니다. $l=r\\theta$에서 $6\\pi=9\\theta$이므로 $\\theta=\\frac{2\\pi}{3}$입니다.',
      },
    ],

    deeper: [
      {
        title: '왜 라디안을 쓸까',
        body: '도($°$)는 원 한 바퀴를 360으로 나눈 약속에서 나온 단위입니다(고대 바빌로니아의 60진법 천문학에서 비롯되었다는 설명이 널리 알려져 있습니다). 360은 약수가 많아 나누기 편한 수이지만, 원의 성질에서 저절로 나오는 수는 아닙니다.\n\n라디안은 "호의 길이 ÷ 반지름"이라는 **길이의 비**이므로 단위가 없는 실수입니다. 그래서\n\n- 부채꼴의 공식이 $l=r\\theta$, $S=\\frac{1}{2}r^{2}\\theta$로 간단해지고,\n- 각을 실수처럼 다룰 수 있어 다음 단원의 삼각함수를 실수 $x$에 대한 함수 $y=\\sin x$로 정의할 수 있습니다.\n\n나중에 미적분을 배우면 삼각함수의 극한·미분 공식이 라디안을 쓸 때 가장 깔끔해진다는 것도 알게 됩니다. 그래서 고등학교 이후 수학에서는 각을 대부분 호도법으로 나타냅니다.',
      },
    ],

    faq: [
      {
        q: '호도법에서는 왜 단위를 안 써요?',
        a: '라디안은 (호의 길이)÷(반지름의 길이), 곧 길이를 길이로 나눈 비라서 실제로는 단위가 없는 수입니다. 그래서 $\\theta=2$라고 쓰면 2라디안을 뜻합니다. 도 단위는 반드시 $°$를 붙여 구별합니다.',
      },
      {
        q: '음의 각은 어떻게 0°~360° 사이 각으로 바꿔요?',
        a: '$360°$를 더하는 것을 결과가 $0°$ 이상이 될 때까지 되풀이합니다. 예를 들어 $-500°+360°=-140°$, 다시 $-140°+360°=220°$이므로 $-500°=360°\\times(-2)+220°$입니다. 부호만 떼고 $500°$를 줄이면 위치가 달라지므로 주의합니다.',
      },
      {
        q: '1라디안은 몇 도예요?',
        a: '$\\pi$ 라디안이 $180°$이므로 1라디안은 $\\frac{180°}{\\pi}$입니다. $\\pi$를 약 3.14로 하면 약 $57.3°$입니다. 정삼각형의 한 각($60°$)보다 조금 작은 각이라고 기억하면 편합니다.',
      },
    ],

    mistakes: [
      '음의 각의 부호만 떼어 $-40°$를 $40°$와 같은 위치로 생각하는 실수 — $360°$를 더해 $320°$로 바꿉니다.',
      '부채꼴 공식 $l=r\\theta$, $S=\\frac{1}{2}r^{2}\\theta$에 중심각을 도 단위 그대로 넣는 실수 — 반드시 라디안으로 바꿉니다.',
      '$0°$, $90°$, $180°$처럼 동경이 좌표축 위에 있는 각을 어느 사분면에 넣는 실수 — 어느 사분면에도 속하지 않습니다.',
    ],

    gens: [
      {
        id: 'deg-to-rad',
        level: 1,
        title: '육십분법을 호도법으로',
        make: function (R) {
          var deg = 15 * R.pick([-24, -20, -18, -16, -14, -12, -10, -9, -8, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 21, 22, 24, 28, 30, 32]);
          var f = R.F(deg, 180);
          var ans = piStr(f);
          var wrong = [];
          function add(g, why) {
            if (g.eq(f)) return;                                    // 값이 정답과 같으면 버린다
            if (wrong.some(function (w) { return w.v.eq(g); })) return;
            wrong.push({ v: g, a: piStr(g)[0], why: why });
          }
          add(R.F(deg, 360), '$360°$를 $\\pi$로 생각했습니다. $\\pi$ 라디안은 $180°$입니다.');
          add(R.F(180, deg), '$\\frac{\\pi}{180}$ 대신 $\\frac{180}{' + deg + '}$처럼 거꾸로 나누었습니다.');
          // π 를 빠뜨린 답 (π 가 없는 수이므로 값이 정답과 다르다)
          wrong.push({ a: f.toString(), why: '$\\pi$를 빠뜨렸습니다. $' + deg + '°\\times\\frac{\\pi}{180}=' + ans[1] + '$입니다.' });
          return {
            type: 'short', check: 'expr', concept: 3,
            q: '$' + deg + '°$를 호도법으로 나타내십시오. ($\\pi$는 pi로 써도 됩니다.)',
            answer: ans[0],
            wrong: wrong.map(function (w) { return { a: w.a, why: w.why }; }),
            explain: '$1°=\\frac{\\pi}{180}$ 라디안이므로 $' + deg + '°\\times\\frac{\\pi}{180}=\\frac{' + deg + '}{180}\\pi=' + ans[1] + '$입니다.',
          };
        },
      },
      {
        id: 'rad-to-deg',
        level: 1,
        title: '호도법을 육십분법으로',
        make: function (R) {
          var b = R.pick([2, 3, 4, 5, 6, 9, 10, 12, 18]);
          var a;
          do { a = R.int(1, 2 * b + 3); } while (TutorMath.gcd(a, b) !== 1);
          if (R.int(1, 4) === 1) a = -a;
          var f = R.F(a, b);
          var t = piStr(f)[1];
          var deg = 180 * a / b;
          var wrong = [];
          if (360 * a / b !== deg) wrong.push({ a: String(360 * a / b), why: '$\\pi$를 $360°$로 바꾸었습니다. $\\pi$ 라디안은 $180°$입니다.' });
          if (Math.abs(a) !== 1 && (180 * b) % a === 0 && 180 * b / a !== deg) wrong.push({ a: String(180 * b / a), why: '분자와 분모를 거꾸로 계산했습니다. $\\pi$ 자리에 $180°$를 넣어 $\\frac{' + a + '\\times180°}{' + b + '}$를 계산합니다.' });
          return {
            type: 'short', check: 'number', unit: '°', concept: 3,
            q: '$' + t + '$를 육십분법으로 나타내면 몇 도입니까?',
            answer: String(deg),
            wrong: wrong,
            explain: '$\\pi$ 라디안이 $180°$이므로 $' + t + '=\\frac{' + a + '\\times180°}{' + b + '}=' + deg + '°$입니다.',
          };
        },
      },
      {
        id: 'general-angle',
        level: 2,
        title: '일반각과 사분면',
        make: function (R) {
          var alpha;
          do { alpha = 5 * R.int(1, 71); } while (alpha % 90 === 0);
          var n = R.pick([-3, -2, -1, 1, 2, 3]);
          var th = 360 * n + alpha;
          var quad = Math.floor(alpha / 90);                     // 0~3
          var head = '$' + th + '°=360°\\times' + (n < 0 ? '(' + n + ')' : n) + '+' + alpha + '°$';
          var qExplain = head + '이므로 $\\alpha=' + alpha + '$이고, ' + QUAD[quad] + '의 각입니다.';
          if (R.bool()) {
            var wrong = [];
            var naive = mod360(Math.abs(th));                    // 부호를 떼고 계산한 값
            if (th < 0 && naive !== alpha) wrong.push({ a: String(naive), why: '부호를 떼고 $' + Math.abs(th) + '°$에서 $360°$의 배수를 뺐습니다. 음의 각은 $360°$의 배수를 더해야 합니다.' });
            if (th < 0) wrong.push({ a: String(alpha - 360), why: '$\\alpha$는 $0°$ 이상이어야 합니다. $360°$를 한 번 더 더하십시오.' });
            else if (th >= 720) wrong.push({ a: String(th - 360), why: '$360°$를 한 번만 뺐습니다. $\\alpha$는 $360°$보다 작아야 합니다.' });
            return {
              type: 'short', check: 'number', unit: '°', concept: 1,
              q: '$' + th + '°$를 $360°\\times n+\\alpha°$ ($n$은 정수, $0°\\le\\alpha°<360°$) 꼴로 나타낼 때, $\\alpha$의 값을 구하십시오.',
              answer: String(alpha),
              wrong: wrong,
              explain: qExplain,
            };
          }
          var naiveQ = Math.floor(mod360(Math.abs(th)) / 90);
          var why = QUAD.map(function (name, i) {
            if (i === quad) return '';
            if (th < 0 && i === naiveQ) return '부호를 떼고 $' + Math.abs(th) + '°$로 판단했습니다. 음의 각은 $360°$의 배수를 더해 $0°$ 이상으로 바꿉니다.';
            return '$\\alpha$를 다시 구해 보십시오. $' + th + '°$에 $360°$의 정수배를 더하거나 빼서 $0°$ 이상 $360°$ 미만으로 만듭니다.';
          });
          return {
            type: 'choice', fixed: true, concept: 2,
            q: '$' + th + '°$는 제몇사분면의 각입니까?',
            choices: QUAD.slice(),
            answer: quad,
            why: why,
            explain: qExplain,
          };
        },
      },
      {
        id: 'sector',
        level: 2,
        title: '부채꼴의 호의 길이와 넓이',
        make: function (R) {
          var r = R.int(2, 12);
          var b = R.pick([2, 3, 4, 5, 6]);
          var a;
          do { a = R.int(1, 2 * b - 1); } while (TutorMath.gcd(a, b) !== 1);
          var th = R.F(a, b);
          var thT = piStr(th)[1];
          var useDeg = R.bool();
          var thText = useDeg ? '$' + (180 * a / b) + '°$' : '$' + thT + '$';
          var L = th.mul(r), S = th.mul(r * r).div(2);
          var askArea = R.bool();
          var ans = askArea ? S : L;
          var wrong = [];
          function add(g, why) {
            if (g.eq(ans) || wrong.some(function (w) { return w.v.eq(g); })) return;
            wrong.push({ v: g, a: piStr(g)[0], why: why });
          }
          if (askArea) {
            add(th.mul(r * r), '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다. $S=\\frac{1}{2}r^{2}\\theta$입니다.');
            add(L, '호의 길이 $r\\theta$를 구했습니다. 넓이는 $\\frac{1}{2}r^{2}\\theta$입니다.');
          } else {
            add(S, '넓이 공식 $\\frac{1}{2}r^{2}\\theta$로 계산했습니다. 호의 길이는 $r\\theta$입니다.');
            add(th.mul(r).mul(2), '원의 둘레 $2\\pi r$처럼 2를 더 곱했습니다. 호의 길이는 $l=r\\theta$입니다.');
          }
          var conv = useDeg ? '중심각을 호도법으로 바꾸면 $' + (180 * a / b) + '°=' + thT + '$입니다. ' : '';
          var body = askArea
            ? '$S=\\frac{1}{2}r^{2}\\theta=\\frac{1}{2}\\times' + r + '^{2}\\times' + thT + '=' + piStr(S)[1] + '$입니다.'
            : '$l=r\\theta=' + r + '\\times' + thT + '=' + piStr(L)[1] + '$입니다.';
          return {
            type: 'short', check: 'expr', concept: 4,
            q: '반지름의 길이가 ' + r + '이고 중심각의 크기가 ' + thText + '인 부채꼴의 ' + (askArea ? '넓이' : '호의 길이') + '를 구하십시오. ($\\pi$는 pi로 써도 됩니다.)',
            answer: piStr(ans)[0],
            wrong: wrong.map(function (w) { return { a: w.a, why: w.why }; }),
            explain: conv + body,
          };
        },
      },
      {
        id: 'sector-max',
        level: 3,
        title: '둘레가 일정한 부채꼴의 넓이의 최댓값',
        make: function (R) {
          var P = 2 * R.int(4, 24);                               // 둘레 8~48
          var askR = R.bool();
          var rr = R.F(P, 4), Smax = R.F(P * P, 16);
          var ans = askR ? rr : Smax;
          var wrong = askR
            ? [{ a: R.F(P, 2).toString(), why: '호의 길이를 구했습니다. 넓이가 최대일 때 반지름은 둘레의 $\\frac{1}{4}$입니다.' }]
            : [{ a: R.F(P * P, 8).toString(), why: '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다. $S=\\frac{1}{2}rl$입니다.' }, { a: '2', why: '넓이가 최대일 때의 중심각(2라디안)을 답했습니다. 묻는 것은 넓이입니다.' }];
          wrong = wrong.filter(function (w) { return !R.F(0).add(w.a).eq(ans); });
          return {
            type: 'short', check: 'number', concept: 4,
            q: '둘레의 길이가 ' + P + '인 부채꼴 가운데 넓이가 가장 큰 것의 ' + (askR ? '반지름의 길이' : '넓이') + '를 구하십시오.',
            answer: ans.toString(),
            hint: '반지름을 $r$로 놓으면 호의 길이는 $' + P + '-2r$입니다. 넓이를 $r$에 대한 이차함수로 나타내 보십시오.',
            wrong: wrong,
            explain: '반지름을 $r$로 놓으면 호의 길이는 $l=' + P + '-2r$ ($0<r<' + R.F(P, 2).toTex() + '$)입니다.\n\n' +
              '$S=\\frac{1}{2}rl=\\frac{1}{2}r(' + P + '-2r)=-r^{2}+' + R.F(P, 2).toTex() + 'r=-\\left(r-' + rr.toTex() + '\\right)^{2}+' + Smax.toTex() + '$\n\n' +
              '따라서 $r=' + rr.toTex() + '$일 때 넓이가 최대이고, 최댓값은 $' + Smax.toTex() + '$입니다. 이때 $l=' + R.F(P, 2).toTex() + '$, 중심각은 $\\frac{l}{r}=2$입니다.',
          };
        },
      },
    ],
  });
})();
