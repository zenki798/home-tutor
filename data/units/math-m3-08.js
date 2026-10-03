/* 중3 수학 · 삼각비
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
Tutor.registerUnit({
  id: 'math-m3-08',
  course: 'math-m3',
  title: '삼각비',
  summary: '직각삼각형에서 삼각비의 뜻과 특수한 각의 삼각비의 값을 알고, 길이와 넓이를 구하는 데 활용해요.',
  goals: [
    '직각삼각형에서 사인, 코사인, 탄젠트의 뜻을 알고 그 값을 구할 수 있어요.',
    '30°, 45°, 60°의 삼각비의 값을 구하고, 0°에서 90°까지의 삼각비의 값을 삼각비의 표에서 읽을 수 있어요.',
    '삼각비를 이용하여 변의 길이, 높이, 거리를 구할 수 있어요.',
    '삼각비를 이용하여 삼각형과 사각형의 넓이를 구할 수 있어요.',
  ],
  standards: ['[9수03-16]', '[9수03-17]'],

  concepts: [
    {
      title: '삼각비의 뜻',
      body: '$\\angle C=90°$인 직각삼각형 $ABC$에서 $\\angle A$를 기준으로 보면, 빗변은 $\\overline{AB}$, 높이는 $\\angle A$와 마주 보는 변 $\\overline{BC}$, 밑변은 $\\overline{AC}$예요.\n\n' +
        '| 이름 | 뜻 |\n|---|---|\n' +
        '| $\\angle A$의 **사인** | $\\sin A=\\dfrac{\\overline{BC}}{\\overline{AB}}=\\dfrac{\\text{높이}}{\\text{빗변}}$ |\n' +
        '| $\\angle A$의 **코사인** | $\\cos A=\\dfrac{\\overline{AC}}{\\overline{AB}}=\\dfrac{\\text{밑변}}{\\text{빗변}}$ |\n' +
        '| $\\angle A$의 **탄젠트** | $\\tan A=\\dfrac{\\overline{BC}}{\\overline{AC}}=\\dfrac{\\text{높이}}{\\text{밑변}}$ |\n\n' +
        '이 세 가지를 통틀어 $\\angle A$의 **삼각비**라고 해요.\n\n' +
        '왜 각만 정해지면 값이 하나로 정해질까요? $\\angle A$의 크기가 같은 직각삼각형은 크기가 달라도 모두 **닮음**(두 각이 같으므로)이에요. 닮은 도형은 대응하는 변의 길이의 비가 같으니, 삼각형의 크기와 관계없이 삼각비의 값이 같아요.\n\n' +
        '> ⚠️ 기준이 되는 각이 바뀌면 높이와 밑변도 바뀌어요. $\\angle B$를 기준으로 하면 높이는 $\\overline{AC}$, 밑변은 $\\overline{BC}$예요.',
      easy: '미끄럼틀을 떠올려 보세요. 기울어진 판이 빗변, 바닥에 놓인 길이가 밑변, 꼭대기의 높이가 높이예요.\n\n' +
        '기울기(각)가 같은 미끄럼틀은 크든 작든 "높이 ÷ 빗변"이 늘 같아요. 그 비율에 이름을 붙인 것이 $\\sin$이에요. 마찬가지로 "밑변 ÷ 빗변"은 $\\cos$, "높이 ÷ 밑변"은 $\\tan$예요.',
      fig: {
        type: 'polygon', points: [[0, 0], [4, 0], [4, 3]], labels: ['A', 'C', 'B'], sides: ['밑변', '높이', '빗변'],
        angles: [{ at: 1, right: true }],
        alt: '각 C가 직각인 직각삼각형 ABC. 각 A를 기준으로 AC는 밑변, BC는 높이, AB는 빗변',
      },
      check: {
        type: 'choice',
        q: '$\\angle C=90°$인 직각삼각형 $ABC$에서 $\\overline{AB}=5$, $\\overline{BC}=3$, $\\overline{CA}=4$예요. $\\sin A$의 값은 무엇일까요?',
        choices: ['$\\frac{3}{5}$', '$\\frac{4}{5}$', '$\\frac{3}{4}$'],
        answer: 0,
        why: ['', '$\\frac{4}{5}$는 밑변 ÷ 빗변, 곧 $\\cos A$예요.', '$\\frac{3}{4}$은 높이 ÷ 밑변, 곧 $\\tan A$예요.'],
        explain: '$\\angle A$와 마주 보는 변(높이)은 $\\overline{BC}=3$, 빗변은 $\\overline{AB}=5$이므로 $\\sin A=\\frac{3}{5}$이에요.',
      },
    },
    {
      title: '삼각비의 값 구하기',
      body: '직각삼각형에서 두 변의 길이를 알면 **피타고라스 정리**로 나머지 한 변의 길이를 구한 뒤 삼각비를 구할 수 있어요.\n\n' +
        '예: $\\angle C=90°$, $\\overline{AB}=13$, $\\overline{AC}=12$이면 $\\overline{BC}=\\sqrt{13^2-12^2}=\\sqrt{25}=5$\n\n' +
        '$\\sin A=\\frac{5}{13}$, $\\cos A=\\frac{12}{13}$, $\\tan A=\\frac{5}{12}$\n\n' +
        '삼각비 하나의 값을 알 때도 같은 방법을 써요. $\\sin A=\\frac{1}{3}$이면 빗변이 3, 높이가 1인 직각삼각형을 그리면 돼요. 밑변은 $\\sqrt{3^2-1^2}=2\\sqrt{2}$이므로 $\\cos A=\\frac{2\\sqrt{2}}{3}$예요.',
      easy: '삼각비를 구하는 순서는 늘 같아요.\n\n' +
        '1. 직각삼각형을 그리고 기준각에 표시해요.\n' +
        '2. 빗변(직각의 맞은편), 높이(기준각의 맞은편), 밑변(나머지)을 찾아 이름을 적어요.\n' +
        '3. 모르는 변은 피타고라스 정리 $a^2+b^2=c^2$으로 구해요.\n' +
        '4. 비율을 만들어요.',
      check: {
        type: 'short', check: 'number',
        q: '$\\angle C=90°$인 직각삼각형 $ABC$에서 $\\overline{AB}=13$, $\\overline{AC}=12$일 때, $\\tan A$의 값을 구하세요.',
        answer: '5/12',
        wrong: [
          { a: '5/13', why: '$\\frac{5}{13}$는 높이 ÷ 빗변, 곧 $\\sin A$예요. $\\tan A$는 높이 ÷ 밑변이에요.' },
          { a: '12/5', why: '분자와 분모를 바꾸었어요. $\\tan A$는 높이 ÷ 밑변이에요.' },
        ],
        explain: '$\\overline{BC}=\\sqrt{13^2-12^2}=5$예요. $\\tan A=\\frac{\\overline{BC}}{\\overline{AC}}=\\frac{5}{12}$예요.',
      },
    },
    {
      title: '30°, 45°, 60°의 삼각비의 값',
      body: '특별한 직각삼각형 두 개로 30°, 45°, 60°의 삼각비를 정확히 구할 수 있어요.\n\n' +
        '- **45°**: 한 변이 1인 정사각형을 대각선으로 자르면 변이 $1$, $1$, $\\sqrt{2}$인 직각이등변삼각형이 돼요.\n' +
        '- **30°, 60°**: 한 변이 2인 정삼각형을 반으로 자르면 변이 $1$, $\\sqrt{3}$, $2$인 직각삼각형이 돼요. 30°와 마주 보는 변이 1이에요.\n\n' +
        '| | $30°$ | $45°$ | $60°$ |\n|---|---|---|---|\n' +
        '| $\\sin$ | $\\frac{1}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{3}}{2}$ |\n' +
        '| $\\cos$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{1}{2}$ |\n' +
        '| $\\tan$ | $\\frac{\\sqrt{3}}{3}$ | $1$ | $\\sqrt{3}$ |\n\n' +
        '> 💡 $\\sin$ 줄은 $\\frac{\\sqrt{1}}{2}$, $\\frac{\\sqrt{2}}{2}$, $\\frac{\\sqrt{3}}{2}$처럼 근호 안이 1, 2, 3으로 커지고, $\\cos$ 줄은 그 반대 순서예요.',
      easy: '외우기 전에 삼각형 두 개를 그려 보세요.\n\n' +
        '정삼각형(한 변 2)을 반으로 접으면 빗변 2, 짧은 변 1인 직각삼각형이 생겨요. 피타고라스 정리로 나머지 변은 $\\sqrt{3}$이에요. 30°의 맞은편이 가장 짧은 변 1이니 $\\sin 30°=\\frac{1}{2}$이에요.\n\n' +
        '그림만 떠올릴 수 있으면 표를 잊어도 언제든 다시 만들 수 있어요.',
      fig: {
        type: 'polygon', points: [[0, 0], [1.732, 0], [1.732, 1]], labels: ['A', 'C', 'B'], sides: ['√3', '1', '2'],
        angles: [{ at: 0, label: '30°' }, { at: 1, right: true }, { at: 2, label: '60°' }],
        alt: '세 각이 30°, 90°, 60°이고 세 변이 √3, 1, 2인 직각삼각형',
      },
      check: {
        type: 'choice',
        q: '$\\tan 60°$의 값은 무엇일까요?',
        choices: ['$\\sqrt{3}$', '$\\frac{\\sqrt{3}}{3}$', '$\\frac{\\sqrt{3}}{2}$'],
        answer: 0,
        why: ['', '$\\frac{\\sqrt{3}}{3}$은 $\\tan 30°$예요.', '$\\frac{\\sqrt{3}}{2}$은 $\\sin 60°$예요.'],
        explain: '변이 $1$, $\\sqrt{3}$, $2$인 직각삼각형에서 60°를 기준으로 하면 높이는 $\\sqrt{3}$, 밑변은 1이에요. $\\tan 60°=\\frac{\\sqrt{3}}{1}=\\sqrt{3}$이에요.',
      },
    },
    {
      title: '0°에서 90°까지의 삼각비와 삼각비의 표',
      body: '원점 $O$를 중심으로 하고 반지름이 1인 사분원을 그려요. 사분원 위의 점 $P$에 대하여 $\\angle POx=x$라 하면 빗변 $\\overline{OP}=1$이므로\n\n' +
        '- $\\sin x=$ 점 $P$의 $y$좌표 (높이)\n' +
        '- $\\cos x=$ 점 $P$의 $x$좌표 (밑변)\n' +
        '- $\\tan x=$ 점 $(1, 0)$에서 그은 세로선이 직선 $OP$와 만나는 점의 높이\n\n' +
        '이 그림에서 $x$를 0°와 90°로 보내면\n\n' +
        '| | $0°$ | $90°$ |\n|---|---|---|\n| $\\sin$ | $0$ | $1$ |\n| $\\cos$ | $1$ | $0$ |\n| $\\tan$ | $0$ | 정할 수 없어요 |\n\n' +
        '$x$가 0°에서 90°로 커지면 $\\sin x$는 0에서 1로 **커지고**, $\\cos x$는 1에서 0으로 **작아지고**, $\\tan x$는 0에서 한없이 **커져요**.\n\n' +
        '0°에서 90°까지 1° 간격으로 삼각비의 값을 소수 넷째 자리까지(반올림한 어림값) 정리한 것이 **삼각비의 표**예요. 예: $\\sin 35°=0.5736$, $\\cos 35°=0.8192$, $\\tan 35°=0.7002$',
      easy: '반지름 1짜리 시계 바늘이 오른쪽(0°)에서 위쪽(90°)으로 돌아간다고 생각해 보세요.\n\n' +
        '바늘 끝의 높이가 $\\sin$, 오른쪽으로 떨어진 거리가 $\\cos$예요. 바늘이 올라갈수록 높이($\\sin$)는 커지고 옆 거리($\\cos$)는 줄어들지요. 바늘이 똑바로 서면(90°) 높이 1, 옆 거리 0이에요.',
      fig: {
        type: 'coord', xmin: -0.2, xmax: 1.4, ymin: -0.2, ymax: 1.2, grid: false,
        fns: [{ expr: 'sqrt(1-x^2)', from: 0, to: 1 }],
        segments: [{ from: [0, 0], to: [1, 0.839] }, { from: [0.766, 0.643], to: [0.766, 0], dashed: true }, { from: [1, 0], to: [1, 0.839] }],
        points: [{ x: 0, y: 0, label: 'O' }, { x: 0.766, y: 0.643, label: 'P' }, { x: 1, y: 0.839, label: 'T' }, { x: 1, y: 0 }],
        alt: '반지름이 1인 사분원 위의 점 P(cos x, sin x)와, 점 (1, 0)에서 그은 세로선이 직선 OP와 만나는 점 T. T의 높이가 tan x',
      },
      check: {
        type: 'ox',
        q: '$x$의 크기가 0°에서 90°까지 커지면 $\\cos x$의 값도 커져요.',
        answer: false,
        explain: '$\\cos x$는 사분원 위의 점의 $x$좌표라서, 각이 커질수록 1에서 0으로 작아져요. 커지는 것은 $\\sin x$와 $\\tan x$예요.',
      },
    },
    {
      title: '삼각비를 이용하여 길이 구하기',
      body: '직각삼각형에서 한 변의 길이와 한 예각의 크기를 알면 나머지 변의 길이를 구할 수 있어요. $\\angle C=90°$일 때\n\n' +
        '- 빗변 $\\overline{AB}$를 알면: $\\overline{BC}=\\overline{AB}\\sin A$, $\\overline{AC}=\\overline{AB}\\cos A$\n' +
        '- 밑변 $\\overline{AC}$를 알면: $\\overline{BC}=\\overline{AC}\\tan A$\n\n' +
        '예: 나무에서 10 m 떨어진 곳에서 나무 꼭대기를 올려본각이 35°이고 눈높이가 1.5 m이면, 나무의 높이는\n\n' +
        '$10\\tan 35°+1.5=10\\times0.7002+1.5=8.502$ 이므로 약 8.5 m예요.\n\n' +
        '직각삼각형이 아닐 때는 **꼭짓점에서 수선을 내려** 직각삼각형을 만들어요. (예제 2 참고)\n\n' +
        '> 💡 수평선과 눈에서 물체를 잇는 선이 이루는 각을, 위를 볼 때 **올려본각**, 아래를 볼 때 **내려본각**이라고 해요.',
      easy: '삼각비는 "길이를 재지 않고 계산하는 자"예요. 나무 꼭대기까지 줄자를 댈 수는 없지만, 땅에서 나무까지의 거리와 올려다본 각만 재면 $\\tan$로 높이를 계산할 수 있어요.\n\n' +
        '어떤 삼각비를 쓸지는 "아는 변"과 "구할 변"이 무엇인지 보고 골라요. 빗변과 높이 → $\\sin$, 빗변과 밑변 → $\\cos$, 밑변과 높이 → $\\tan$.',
      fig: {
        type: 'polygon', points: [[0, 0], [10, 0], [10, 7]], labels: ['A', 'C', 'B'], sides: ['10 m', null, null],
        angles: [{ at: 0, label: '35°' }, { at: 1, right: true }],
        alt: '눈높이에서 나무까지 수평 거리 10 m, 나무 꼭대기를 올려본각 35°인 직각삼각형',
      },
      check: {
        type: 'short', check: 'number',
        q: '$\\angle C=90°$인 직각삼각형 $ABC$에서 $\\overline{AB}=10$, $\\angle A=30°$일 때, $\\overline{BC}$의 길이를 구하세요.',
        answer: '5',
        wrong: [{ a: '20', why: '빗변에 $\\sin A$를 곱해야 해요. $\\overline{BC}=10\\times\\sin 30°$예요. 나누었어요.' }],
        explain: '$\\overline{BC}$는 $\\angle A$의 높이, $\\overline{AB}$는 빗변이므로 $\\overline{BC}=10\\sin 30°=10\\times\\frac{1}{2}=5$예요.',
      },
    },
    {
      title: '삼각비를 이용하여 넓이 구하기',
      body: '**삼각형의 넓이**: 두 변의 길이가 $a$, $b$이고 그 끼인각의 크기가 $x$일 때\n\n' +
        '- $x$가 예각이면 $S=\\frac{1}{2}ab\\sin x$\n' +
        '- $x$가 둔각이면 $S=\\frac{1}{2}ab\\sin(180°-x)$\n\n' +
        '이유: 한 변 $b$를 밑변으로 보면 높이가 $a\\sin x$(둔각이면 바깥으로 수선을 내려 $a\\sin(180°-x)$)이기 때문이에요.\n\n' +
        '**평행사변형의 넓이**: 이웃한 두 변 $a$, $b$와 끼인각 $x$(예각)이면 $S=ab\\sin x$ (대각선으로 나눈 삼각형 두 개)\n\n' +
        '**사각형의 넓이**: 두 대각선의 길이가 $p$, $q$이고 끼인각이 $x$(예각)이면 $S=\\frac{1}{2}pq\\sin x$\n\n' +
        '예: 두 변이 6, 8이고 끼인각이 30°인 삼각형의 넓이는 $\\frac{1}{2}\\times6\\times8\\times\\sin 30°=12$예요.',
      easy: '삼각형의 넓이는 원래 $\\frac{1}{2}\\times$ 밑변 $\\times$ 높이예요. 그런데 높이를 모를 때가 많지요.\n\n' +
        '비스듬한 변 $a$가 끼인각 $x$만큼 기울어져 있으면, 그 끝의 높이는 $a\\sin x$예요(미끄럼틀의 높이 = 판의 길이 × $\\sin$). 그래서 넓이가 $\\frac{1}{2}\\times b\\times a\\sin x$가 돼요.',
      fig: {
        type: 'polygon', points: [[0, 0], [8, 0], [5.196, 3]], labels: ['B', 'C', 'A'], sides: ['8', null, '6'],
        angles: [{ at: 0, label: '30°' }],
        segments: [{ from: [5.196, 3], to: [5.196, 0], dashed: true, right: true }],
        alt: '두 변 6과 8 사이의 끼인각이 30°인 삼각형과 높이를 나타내는 점선',
      },
      check: {
        type: 'choice',
        q: '$\\overline{AB}=6$, $\\overline{AC}=8$, $\\angle A=30°$인 삼각형 $ABC$의 넓이는 무엇일까요?',
        choices: ['$12$', '$24$', '$12\\sqrt{3}$'],
        answer: 0,
        why: ['', '$\\frac{1}{2}$을 곱하지 않았어요. 삼각형의 넓이는 $\\frac{1}{2}ab\\sin x$예요.', '$\\sin 30°$ 대신 $\\cos 30°=\\frac{\\sqrt{3}}{2}$을 썼어요.'],
        explain: '$\\frac{1}{2}\\times6\\times8\\times\\sin 30°=24\\times\\frac{1}{2}=12$예요.',
      },
    },
  ],

  examples: [
    {
      q: '$\\angle C=90°$인 직각삼각형 $ABC$에서 $\\overline{AC}=8$, $\\overline{BC}=6$일 때, $\\sin A$, $\\cos A$, $\\tan A$의 값을 구하세요.',
      steps: [
        '피타고라스 정리로 빗변을 구해요. $\\overline{AB}=\\sqrt{8^2+6^2}=\\sqrt{100}=10$',
        '$\\angle A$를 기준으로 높이는 $\\overline{BC}=6$, 밑변은 $\\overline{AC}=8$이에요.',
        '$\\sin A=\\frac{6}{10}=\\frac{3}{5}$, $\\cos A=\\frac{8}{10}=\\frac{4}{5}$, $\\tan A=\\frac{6}{8}=\\frac{3}{4}$',
      ],
      answer: '$\\sin A=\\frac{3}{5}$, $\\cos A=\\frac{4}{5}$, $\\tan A=\\frac{3}{4}$',
    },
    {
      q: '삼각형 $ABC$에서 $\\overline{AB}=8$, $\\overline{BC}=10$, $\\angle B=60°$일 때, $\\overline{AC}$의 길이를 구하세요.',
      fig: {
        type: 'polygon', points: [[0, 0], [10, 0], [4, 6.928]], labels: ['B', 'C', 'A'], sides: ['10', null, '8'],
        angles: [{ at: 0, label: '60°' }],
        segments: [{ from: [4, 6.928], to: [4, 0], dashed: true, right: true }],
        alt: '삼각형 ABC에서 꼭짓점 A에서 변 BC에 내린 수선 AH',
      },
      steps: [
        '꼭짓점 $A$에서 $\\overline{BC}$에 수선 $\\overline{AH}$를 내려 직각삼각형을 만들어요.',
        '직각삼각형 $ABH$에서 $\\overline{AH}=8\\sin 60°=4\\sqrt{3}$, $\\overline{BH}=8\\cos 60°=4$',
        '$\\overline{CH}=10-4=6$',
        '직각삼각형 $AHC$에서 $\\overline{AC}=\\sqrt{(4\\sqrt{3})^2+6^2}=\\sqrt{48+36}=\\sqrt{84}=2\\sqrt{21}$',
      ],
      answer: '$2\\sqrt{21}$',
    },
    {
      q: '이웃한 두 변의 길이가 6 cm, 10 cm이고 그 끼인각의 크기가 120°인 평행사변형의 넓이를 구하세요.',
      steps: [
        '평행사변형에서 이웃한 두 각의 합은 180°이므로 끼인각 120° 대신 예각 60°를 써도 돼요.',
        '$S=6\\times10\\times\\sin 60°=60\\times\\frac{\\sqrt{3}}{2}=30\\sqrt{3}$',
      ],
      answer: '$30\\sqrt{3}$ cm²',
    },
  ],

  terms: [
    { term: '삼각비', def: '직각삼각형에서 두 변의 길이의 비로 나타낸 사인, 코사인, 탄젠트를 통틀어 이르는 말이에요.' },
    { term: '사인(sin)', def: '직각삼각형에서 기준각의 높이 ÷ 빗변이에요. $\\sin A=\\dfrac{\\overline{BC}}{\\overline{AB}}$' },
    { term: '코사인(cos)', def: '직각삼각형에서 기준각의 밑변 ÷ 빗변이에요. $\\cos A=\\dfrac{\\overline{AC}}{\\overline{AB}}$' },
    { term: '탄젠트(tan)', def: '직각삼각형에서 기준각의 높이 ÷ 밑변이에요. $\\tan A=\\dfrac{\\overline{BC}}{\\overline{AC}}$' },
    { term: '빗변', def: '직각삼각형에서 직각과 마주 보는 가장 긴 변이에요.' },
    { term: '올려본각', def: '아래에서 위의 물체를 볼 때, 수평선과 눈과 물체를 잇는 선이 이루는 각이에요.' },
    { term: '내려본각', def: '위에서 아래의 물체를 볼 때, 수평선과 눈과 물체를 잇는 선이 이루는 각이에요.' },
    { term: '삼각비의 표', def: '0°에서 90°까지 1° 간격으로 사인, 코사인, 탄젠트의 값을 소수 넷째 자리까지 어림하여 나타낸 표예요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '그림과 같이 $\\angle C=90°$인 직각삼각형 $ABC$에서 $\\cos A$의 값은 무엇일까요?',
      fig: {
        type: 'polygon', points: [[0, 0], [15, 0], [15, 8]], labels: ['A', 'C', 'B'], sides: ['15', '8', '17'],
        angles: [{ at: 1, right: true }],
        alt: '각 C가 직각이고 AC=15, BC=8, AB=17인 직각삼각형',
      },
      choices: ['$\\frac{15}{17}$', '$\\frac{8}{17}$', '$\\frac{8}{15}$', '$\\frac{17}{15}$'],
      answer: 0,
      why: [
        '',
        '$\\frac{8}{17}$은 높이 ÷ 빗변, 곧 $\\sin A$예요.',
        '$\\frac{8}{15}$은 높이 ÷ 밑변, 곧 $\\tan A$예요.',
        '분자와 분모를 바꾸었어요. 삼각비에서 빗변은 분모에 와요(탄젠트 제외).',
      ],
      explain: '$\\angle A$를 기준으로 밑변은 $\\overline{AC}=15$, 빗변은 $\\overline{AB}=17$이므로 $\\cos A=\\frac{15}{17}$예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
      q: '$\\angle C=90°$인 직각삼각형 $ABC$에서 $\\overline{AB}=10$, $\\overline{BC}=6$일 때, $\\tan A$의 값을 구하세요.',
      answer: '3/4',
      wrong: [
        { a: '3/5', why: '$\\frac{6}{10}$은 높이 ÷ 빗변, 곧 $\\sin A$예요. 밑변 $\\overline{AC}$를 먼저 구해요.' },
        { a: '4/3', why: '분자와 분모를 바꾸었어요. $\\tan A$는 높이($\\overline{BC}$) ÷ 밑변($\\overline{AC}$)이에요.' },
      ],
      hint: '피타고라스 정리로 $\\overline{AC}$를 먼저 구해요.',
      explain: '$\\overline{AC}=\\sqrt{10^2-6^2}=\\sqrt{64}=8$이므로 $\\tan A=\\frac{6}{8}=\\frac{3}{4}$이에요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 0,
      q: '크기가 다른 두 직각삼각형이라도 한 예각의 크기가 같으면, 그 각의 사인의 값은 같아요.',
      answer: true,
      explain: '한 예각과 직각이 같으면 두 직각삼각형은 닮음이에요. 닮은 도형은 대응하는 변의 길이의 비가 같으므로 사인의 값도 같아요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '$\\sin 30°+\\cos 60°$의 값은 무엇일까요?',
      choices: ['$1$', '$\\sqrt{3}$', '$\\frac{1+\\sqrt{3}}{2}$', '$\\frac{1}{4}$'],
      answer: 0,
      why: [
        '',
        '두 값을 모두 $\\frac{\\sqrt{3}}{2}$으로 잘못 썼어요. $\\sin 30°=\\cos 60°=\\frac{1}{2}$이에요.',
        '$\\cos 60°$를 $\\cos 30°$의 값 $\\frac{\\sqrt{3}}{2}$으로 착각했어요.',
        '더하기가 아니라 곱했어요.',
      ],
      explain: '$\\sin 30°=\\frac{1}{2}$, $\\cos 60°=\\frac{1}{2}$이므로 합은 1이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '다음 중 값이 가장 큰 것은 무엇일까요?',
      choices: ['$\\tan 60°$', '$\\sin 90°$', '$\\cos 0°$', '$\\tan 45°$'],
      answer: 0,
      why: [
        '',
        '$\\sin 90°=1$이에요. $\\tan 60°=\\sqrt{3}$은 1보다 커요.',
        '$\\cos 0°=1$이에요. $\\tan 60°=\\sqrt{3}$은 1보다 커요.',
        '$\\tan 45°=1$이에요. $\\tan$의 값은 각이 커질수록 커져요.',
      ],
      explain: '$\\sin 90°=\\cos 0°=\\tan 45°=1$이고, $\\tan 60°=\\sqrt{3}$은 약 1.732이므로 가장 커요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 3,
      q: '$\\tan 90°$의 값은 1이에요.',
      answer: false,
      explain: '$x$가 90°에 가까워질수록 $\\tan x$는 한없이 커져요. 그래서 $\\tan 90°$의 값은 정할 수 없어요. 값이 1인 것은 $\\tan 45°$예요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
      q: '$\\angle C=90°$인 직각삼각형 $ABC$에서 $\\overline{AB}=12$, $\\angle A=30°$일 때, $\\overline{BC}$의 길이를 구하세요.',
      fig: {
        type: 'polygon', points: [[0, 0], [10.392, 0], [10.392, 6]], labels: ['A', 'C', 'B'], sides: [null, null, '12'],
        angles: [{ at: 0, label: '30°' }, { at: 1, right: true }],
        alt: '빗변 AB가 12이고 각 A가 30°, 각 C가 직각인 직각삼각형',
      },
      answer: '6',
      wrong: [{ a: '24', why: '빗변에 $\\sin 30°$를 곱해야 하는데 나누었어요.' }],
      explain: '$\\overline{BC}$는 $\\angle A$의 높이이므로 $\\overline{BC}=12\\sin 30°=12\\times\\frac{1}{2}=6$이에요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: 'm', concept: 4,
      q: '나무에서 20 m 떨어진 곳에서 나무의 꼭대기를 올려본각의 크기가 35°였어요. 눈높이가 1.5 m일 때, 나무의 높이는 약 몇 m일까요? ($\\sin 35°=0.5736$, $\\cos 35°=0.8192$, $\\tan 35°=0.7002$로 계산하고, 반올림하여 소수 첫째 자리까지 구하세요.)',
      fig: {
        type: 'polygon', points: [[0, 0], [20, 0], [20, 14]], labels: ['A', 'C', 'B'], sides: ['20 m', null, null],
        angles: [{ at: 0, label: '35°' }, { at: 1, right: true }],
        alt: '눈의 위치 A에서 나무까지 수평 거리 20 m, 나무 꼭대기 B를 올려본각 35°',
      },
      answer: '15.5',
      wrong: [
        { a: '14', why: '눈높이 1.5 m를 더하지 않았어요. 삼각형으로 구한 길이는 눈높이부터 꼭대기까지예요.' },
        { a: '13', why: '$\\sin 35°$를 썼어요. 수평 거리(밑변)와 높이의 관계는 $\\tan$이에요.' },
      ],
      hint: '수평 거리는 밑변, 구할 길이는 높이예요. 어떤 삼각비가 두 변을 잇는지 생각해 보세요.',
      explain: '$\\overline{BC}=20\\tan 35°=20\\times0.7002=14.004$ (m)이고, 눈높이를 더하면 $14.004+1.5=15.504$이므로 나무의 높이는 약 15.5 m예요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'expr', concept: 4,
      q: '삼각형 $ABC$에서 $\\overline{AB}=4$, $\\overline{BC}=6$, $\\angle B=60°$일 때, $\\overline{AC}$의 길이를 구하세요. (근호는 √ 로 써요.)',
      fig: {
        type: 'polygon', points: [[0, 0], [6, 0], [2, 3.464]], labels: ['B', 'C', 'A'], sides: ['6', null, '4'],
        angles: [{ at: 0, label: '60°' }],
        alt: '두 변이 4와 6이고 그 끼인각 B가 60°인 삼각형',
      },
      answer: '2√7',
      wrong: [{ a: '√(16+36)', why: '삼각형 $ABC$는 직각삼각형이 아니에요. 꼭짓점 $A$에서 수선을 내려 직각삼각형을 만들어야 해요.' }],
      hint: '꼭짓점 $A$에서 $\\overline{BC}$에 수선 $\\overline{AH}$를 내려 보세요.',
      explain: '$A$에서 $\\overline{BC}$에 수선 $\\overline{AH}$를 내리면 $\\overline{AH}=4\\sin 60°=2\\sqrt{3}$, $\\overline{BH}=4\\cos 60°=2$이므로 $\\overline{CH}=6-2=4$예요. $\\overline{AC}=\\sqrt{(2\\sqrt{3})^2+4^2}=\\sqrt{12+16}=\\sqrt{28}=2\\sqrt{7}$이에요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '$\\overline{AB}=8$, $\\overline{AC}=6$, $\\angle A=120°$인 삼각형 $ABC$의 넓이는 무엇일까요?',
      choices: ['$12\\sqrt{3}$', '$12$', '$24\\sqrt{3}$', '$6\\sqrt{3}$'],
      answer: 0,
      why: [
        '',
        '$\\sin 60°$ 대신 $\\cos 60°=\\frac{1}{2}$을 곱했어요.',
        '$\\frac{1}{2}$을 곱하지 않았어요.',
        '$\\frac{1}{2}$을 두 번 곱했어요. $\\frac{1}{2}\\times8\\times6=24$에 $\\frac{\\sqrt{3}}{2}$을 곱해요.',
      ],
      hint: '끼인각이 둔각이면 $180°$에서 뺀 각의 사인을 써요.',
      explain: '$\\angle A$가 둔각이므로 $S=\\frac{1}{2}\\times8\\times6\\times\\sin(180°-120°)=24\\times\\frac{\\sqrt{3}}{2}=12\\sqrt{3}$이에요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'expr', concept: 5,
      q: '평행사변형 $ABCD$에서 $\\overline{AB}=5$ cm, $\\overline{BC}=8$ cm, $\\angle B=45°$일 때, 넓이는 몇 cm²일까요? (근호는 √ 로 쓰고, 단위는 쓰지 않아요.)',
      answer: '20√2',
      wrong: [{ a: '10√2', why: '평행사변형은 삼각형 두 개로 이루어져서 $\\frac{1}{2}$을 곱하지 않아요. $S=ab\\sin x$예요.' }],
      explain: '$S=5\\times8\\times\\sin 45°=40\\times\\frac{\\sqrt{2}}{2}=20\\sqrt{2}$ (cm²)이에요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 5,
      q: '두 대각선의 길이가 10 cm, 12 cm이고, 두 대각선이 이루는 각 가운데 예각의 크기가 30°인 사각형의 넓이는 몇 cm²일까요?',
      answer: '30',
      wrong: [{ a: '60', why: '사각형의 넓이는 $\\frac{1}{2}pq\\sin x$예요. $\\frac{1}{2}$을 곱하지 않았어요.' }],
      explain: '$S=\\frac{1}{2}\\times10\\times12\\times\\sin 30°=60\\times\\frac{1}{2}=30$ (cm²)이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'expr', concept: 1,
      q: '$0°<A<90°$이고 $\\sin A=\\frac{2}{3}$일 때, $\\tan A$의 값을 구하세요. (분모를 유리화하지 않아도 돼요. 근호는 √ 로 써요.)',
      answer: '2√5/5',
      wrong: [
        { a: '√5/2', why: '분자와 분모를 바꾸었어요. $\\tan A$는 높이 ÷ 밑변이에요.' },
        { a: '2/3', why: '$\\frac{2}{3}$는 $\\sin A$의 값이에요. 밑변을 구해 높이 ÷ 밑변을 계산해요.' },
      ],
      hint: '빗변이 3, 높이가 2인 직각삼각형을 그려 밑변을 구해요.',
      explain: '빗변 3, 높이 2인 직각삼각형을 그리면 밑변은 $\\sqrt{3^2-2^2}=\\sqrt{5}$예요. $\\tan A=\\frac{2}{\\sqrt{5}}=\\frac{2\\sqrt{5}}{5}$예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'expr', concept: 4,
      q: '100 m 떨어진 두 지점 $A$, $B$에서 강 건너편의 탑 꼭대기 $C$를 바라보았더니 그림과 같이 $\\angle A=45°$, $\\angle B=60°$였어요. 점 $C$에서 $\\overline{AB}$에 내린 수선의 길이 $h$는 몇 m일까요? (근호는 √ 로 쓰고, 단위는 쓰지 않아요.)',
      fig: {
        type: 'polygon', points: [[0, 0], [100, 0], [63.4, 63.4]], labels: ['A', 'B', 'C'], sides: ['100 m', null, null],
        angles: [{ at: 0, label: '45°' }, { at: 1, label: '60°' }],
        segments: [{ from: [63.4, 63.4], to: [63.4, 0], dashed: true, right: true, label: 'h' }],
        alt: '두 지점 A, B 사이가 100 m이고 각 A가 45°, 각 B가 60°인 삼각형 ABC와 C에서 AB에 내린 수선 h',
      },
      answer: '150-50√3',
      wrong: [{ a: '50√3-50', why: '$\\overline{BH}$는 $h$를 $\\tan 60°$로 나누어야 해요. $h\\times\\tan 60°$로 계산했어요.' }],
      hint: '수선의 발을 $H$라 하면 $\\overline{AH}=h\\div\\tan 45°$, $\\overline{BH}=h\\div\\tan 60°$이고, 두 길이의 합이 100이에요.',
      explain: '$\\overline{AH}=\\frac{h}{\\tan 45°}=h$, $\\overline{BH}=\\frac{h}{\\tan 60°}=\\frac{h}{\\sqrt{3}}$예요. $h+\\frac{h}{\\sqrt{3}}=100$이므로 양변에 $\\sqrt{3}$을 곱하면 $(\\sqrt{3}+1)h=100\\sqrt{3}$, $h=\\frac{100\\sqrt{3}}{\\sqrt{3}+1}=\\frac{100\\sqrt{3}(\\sqrt{3}-1)}{2}=150-50\\sqrt{3}$ (약 63.4 m)이에요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '°', concept: 2,
      q: '$\\sin(2x-10°)=\\frac{\\sqrt{3}}{2}$일 때, $x$의 크기를 구하세요. (단, $0°<2x-10°<90°$)',
      answer: '35',
      wrong: [
        { a: '30', why: '$2x-10°=60°$에서 $10°$를 옮기는 것을 빠뜨렸어요. $2x=70°$예요.' },
        { a: '20', why: '$\\sin 30°=\\frac{1}{2}$이에요. $\\frac{\\sqrt{3}}{2}$이 되는 각은 60°예요.' },
      ],
      hint: '사인의 값이 $\\frac{\\sqrt{3}}{2}$인 각을 먼저 떠올려요.',
      explain: '$\\sin 60°=\\frac{\\sqrt{3}}{2}$이므로 $2x-10°=60°$, $2x=70°$, $x=35°$예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'cm²', concept: 5,
      q: '두 변의 길이가 6 cm, 10 cm인 삼각형 가운데 넓이가 가장 큰 삼각형의 넓이는 몇 cm²일까요?',
      answer: '30',
      wrong: [
        { a: '60', why: '삼각형의 넓이에는 $\\frac{1}{2}$을 곱해요.' },
        { a: '15', why: '끼인각이 30°일 때의 넓이예요. $\\sin x$의 값이 가장 클 때를 생각해 보세요.' },
      ],
      hint: '넓이 $\\frac{1}{2}\\times6\\times10\\times\\sin x$에서 $\\sin x$가 가장 클 때를 찾아요.',
      explain: '넓이는 $\\frac{1}{2}\\times6\\times10\\times\\sin x=30\\sin x$예요. $\\sin x$는 $x=90°$일 때 가장 큰 값 1을 가지므로, 두 변이 수직일 때 넓이가 최대 30 cm²예요.',
    },
  ],

  deeper: [
    {
      title: '재지 않고 재는 기술, 삼각 측량',
      body: '높은 산이나 강 건너의 거리는 줄자로 잴 수 없어요. 그래서 옛날부터 사람들은 길이를 잴 수 있는 기준선 하나와 각의 크기만 재서 나머지 거리를 계산했어요. 이것을 **삼각 측량**이라고 해요.\n\n' +
        '심화 문제의 강 건너 탑처럼, 두 지점 사이의 거리와 두 각만 알면 탑까지의 거리를 구할 수 있지요. 지도를 만들 때, 건물을 지을 때 이런 계산이 쓰여요.',
    },
    {
      title: '고등학교에서 이어지는 내용',
      body: '중학교에서는 0°에서 90°까지의 각만 다뤘어요. 고등학교에서는 각을 좌표평면 위에서 회전하는 양으로 넓혀 90°보다 큰 각, 음의 각에 대해서도 $\\sin$, $\\cos$, $\\tan$를 정의하고, 이를 **삼각함수**라고 불러요.\n\n' +
        '또 $\\sin x$와 $\\cos x$ 사이의 관계, 삼각형의 변과 각의 관계(사인법칙, 코사인법칙)를 배워요. 이 단원의 사분원 그림이 그 출발점이에요.',
    },
  ],

  faq: [
    {
      q: 'sin, cos, tan이 너무 헷갈려요.',
      a: '기준각을 먼저 찾고, 빗변(직각의 맞은편)·높이(기준각의 맞은편)·밑변(나머지)의 이름을 그림에 적어 보세요. 그다음 $\\sin$=높이÷빗변, $\\cos$=밑변÷빗변, $\\tan$=높이÷밑변을 차례로 적용해요. 그림에 이름을 적는 습관이 가장 확실해요.',
    },
    {
      q: '삼각형 크기가 달라도 왜 삼각비는 같아요?',
      a: '한 예각의 크기가 같은 직각삼각형들은 모두 닮음이에요. 닮은 도형은 확대·축소만 한 것이라 변의 길이의 비가 그대로예요. 그래서 삼각비는 삼각형의 크기가 아니라 각의 크기로만 정해져요.',
    },
    {
      q: '$\\tan 90°$는 왜 값이 없어요?',
      a: '$\\tan x$는 높이 ÷ 밑변인데, 각이 90°에 가까워지면 밑변이 0에 가까워져요. 0에 가까운 수로 나누면 값이 한없이 커지고, 90°에서는 밑변이 0이 되어 나눌 수 없어요. 그래서 하나의 값으로 정할 수 없어요.',
    },
    {
      q: '삼각비의 표에 있는 값은 정확한 값이에요?',
      a: '아니에요. $\\sin 35°$ 같은 값은 끝없이 이어지는 소수라서, 표에는 소수 다섯째 자리에서 반올림한 어림값을 적어요. 그래서 표로 계산한 길이도 어림값이고, 문제에서 정한 자리까지 반올림해서 답해요.',
    },
  ],

  mistakes: [
    '기준각이 바뀌었는데 높이와 밑변을 그대로 쓰는 실수 — $\\angle B$를 기준으로 하면 높이는 $\\overline{AC}$, 밑변은 $\\overline{BC}$예요.',
    '$\\sin 30°$와 $\\cos 30°$를 바꿔 쓰는 실수 — 30°의 맞은편이 가장 짧은 변이라 $\\sin 30°=\\frac{1}{2}$이에요.',
    '끼인각이 둔각인 삼각형의 넓이를 구할 때 $180°$에서 빼지 않는 실수 — 120°이면 $\\sin 60°$를 써요.',
  ],

  gens: [
    {
      id: 'ratio-from-sides',
      level: 1,
      title: '직각삼각형에서 삼각비의 값 구하기',
      make: function (R) {
        var T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [6, 8, 10], [9, 12, 15], [9, 40, 41], [12, 16, 20]]);
        var swap = R.bool();
        var a = swap ? T[1] : T[0], b = swap ? T[0] : T[1], c = T[2]; // a = BC, b = AC, c = AB
        var ang = R.pick(['A', 'B']);
        var fn = R.pick(['sin', 'cos', 'tan']);
        var opp = ang === 'A' ? a : b, adj = ang === 'A' ? b : a;
        var oppName = ang === 'A' ? '\\overline{BC}' : '\\overline{AC}', adjName = ang === 'A' ? '\\overline{AC}' : '\\overline{BC}';
        function tex(n, d) { return '$' + R.F(n, d).toTex() + '$'; }
        var pairs = { sin: [opp, c], cos: [adj, c], tan: [opp, adj] };
        var correct = tex(pairs[fn][0], pairs[fn][1]);
        var cands = [
          [tex(opp, c), '높이 ÷ 빗변, 곧 $\\sin ' + ang + '$의 값이에요.'],
          [tex(adj, c), '밑변 ÷ 빗변, 곧 $\\cos ' + ang + '$의 값이에요.'],
          [tex(opp, adj), '높이 ÷ 밑변, 곧 $\\tan ' + ang + '$의 값이에요.'],
          [tex(adj, opp), '밑변 ÷ 높이예요. 분자와 분모를 바꾸었어요.'],
          [tex(c, opp), '빗변 ÷ 높이예요. 사인과 코사인에서 빗변은 분모에 와요.'],
          [tex(c, adj), '빗변 ÷ 밑변이에요. 사인과 코사인에서 빗변은 분모에 와요.'],
        ];
        var pre = ang === 'B' ? '$\\angle B$를 기준으로 하면 높이는 $\\overline{AC}$, 밑변은 $\\overline{BC}$예요. ' : '';
        var reason = {};
        cands.forEach(function (x) { if (!(x[0] in reason)) reason[x[0]] = pre + x[1]; });
        var pick = R.choices(correct, cands.map(function (x) { return x[0]; }));
        var n = pairs[fn][0], d = pairs[fn][1], F = R.F(n, d);
        var ratio = '\\frac{' + n + '}{' + d + '}' + (F.num === n ? '' : '=' + F.toTex());
        var what = fn === 'sin' ? '높이 ÷ 빗변' : fn === 'cos' ? '밑변 ÷ 빗변' : '높이 ÷ 밑변';
        return {
          type: 'choice', concept: 0,
          q: '그림과 같이 $\\angle C=90°$인 직각삼각형 $ABC$에서 $\\' + fn + ' ' + ang + '$의 값은 무엇일까요?',
          fig: {
            type: 'polygon', points: [[0, 0], [b, 0], [b, a]], labels: ['A', 'C', 'B'], sides: [String(b), String(a), String(c)],
            angles: [{ at: 1, right: true }],
            alt: '각 C가 직각이고 AC=' + b + ', BC=' + a + ', AB=' + c + '인 직각삼각형',
          },
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
          explain: '$\\angle ' + ang + '$를 기준으로 빗변은 $\\overline{AB}=' + c + '$, 높이는 $' + oppName + '=' + opp + '$, 밑변은 $' + adjName + '=' + adj + '$' + R.josa(adj, '이에요/예요') + '.\n\n' +
            '$\\' + fn + ' ' + ang + '$는 ' + what + '이므로 $\\' + fn + ' ' + ang + '=' + ratio + '$' + R.josa(F, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'special-angle-values',
      level: 1,
      title: '30°, 45°, 60°의 삼각비의 값 계산',
      make: function (R) {
        var F = R.F;
        // 값 = c·√k 꼴의 항들의 합 { k: Frac }
        var V = {
          sin: { 30: [F(1, 2), 1], 45: [F(1, 2), 2], 60: [F(1, 2), 3] },
          cos: { 30: [F(1, 2), 3], 45: [F(1, 2), 2], 60: [F(1, 2), 1] },
          tan: { 30: [F(1, 3), 3], 45: [F(1, 1), 1], 60: [F(1, 1), 3] },
        };
        function single(fn, t) { var o = {}; o[V[fn][t][1]] = V[fn][t][0]; return o; }
        function add(x, y) {
          var o = {}, k;
          for (k in x) o[k] = x[k];
          for (k in y) o[k] = o[k] ? o[k].add(y[k]) : y[k];
          return o;
        }
        function mul(x, y) {
          var o = {};
          for (var i in x) {
            for (var j in y) {
              var k = Number(i) * Number(j), c = x[i].mul(y[j]);
              if (k === 4) { k = 1; c = c.mul(2); } else if (k === 9) { k = 1; c = c.mul(3); }
              o[k] = o[k] ? o[k].add(c) : c;
            }
          }
          return o;
        }
        function texOf(x) {
          var keys = Object.keys(x).map(Number).filter(function (k) { return !x[k].isZero(); }).sort(function (p, q) { return p - q; });
          if (!keys.length) return '0';
          return keys.map(function (k) {
            var c = x[k];
            if (k === 1) return c.toTex();
            var nn = c.num === 1 ? '' : String(c.num);
            return c.den === 1 ? nn + '\\sqrt{' + k + '}' : '\\frac{' + nn + '\\sqrt{' + k + '}}{' + c.den + '}';
          }).join('+');
        }
        var other = { sin: 'cos', cos: 'sin', tan: 'tan' };
        var fns = ['sin', 'cos', 'tan'], angs = [30, 45, 60];
        var f1 = R.pick(fns), t1 = R.pick(angs), f2 = R.pick(fns), t2 = R.pick(angs);
        if (f1 === f2 && t1 === t2) t2 = t1 === 60 ? 30 : t1 + 15;
        var op = R.pick(['+', '×']);
        function calc(a1, a2, o) { return o === '+' ? add(a1, a2) : mul(a1, a2); }
        var v1 = single(f1, t1), v2 = single(f2, t2);
        var ans = calc(v1, v2, op);
        var correct = '$' + texOf(ans) + '$';
        function swapped(fn, t) {
          if (fn === 'tan') return single('tan', t === 30 ? 60 : t === 60 ? 30 : 45);
          return single(other[fn], t);
        }
        var cands = [
          ['$' + texOf(calc(swapped(f1, t1), v2, op)) + '$', f1 === 'tan' ? '$\\tan 30°$와 $\\tan 60°$의 값을 바꿔 썼어요.' : '$\\sin$과 $\\cos$의 값을 바꿔 썼어요. 첫째 항의 값을 다시 확인해 보세요.'],
          ['$' + texOf(calc(v1, swapped(f2, t2), op)) + '$', f2 === 'tan' ? '$\\tan 30°$와 $\\tan 60°$의 값을 바꿔 썼어요.' : '$\\sin$과 $\\cos$의 값을 바꿔 썼어요. 둘째 항의 값을 다시 확인해 보세요.'],
          ['$' + texOf(calc(swapped(f1, t1), swapped(f2, t2), op)) + '$', '두 항 모두 값을 잘못 썼어요. 30°, 45°, 60°의 삼각비 표를 다시 떠올려 보세요.'],
          ['$' + texOf(calc(v1, v2, op === '+' ? '×' : '+')) + '$', op === '+' ? '더하기가 아니라 곱했어요.' : '곱하기가 아니라 더했어요.'],
          ['$' + texOf(add(ans, { 1: F(1, 1) })) + '$', '계산 과정을 다시 확인해 보세요.'],
          ['$' + texOf(mul(ans, { 1: F(2, 1) })) + '$', '계산 과정을 다시 확인해 보세요. $\\frac{1}{2}$을 빠뜨리지 않았나요?'],
          ['$' + texOf(mul(ans, { 1: F(1, 2) })) + '$', '계산 과정을 다시 확인해 보세요. $\\frac{1}{2}$을 한 번 더 곱하지 않았나요?'],
          ['$' + texOf(add(ans, { 1: F(1, 2) })) + '$', '각 삼각비의 값을 다시 확인해 보세요.'],
        ];
        var reason = {};
        cands.forEach(function (x) { if (!(x[0] in reason)) reason[x[0]] = x[1]; });
        var pick = R.choices(correct, cands.map(function (x) { return x[0]; }));
        var opT = op === '+' ? '+' : '\\times';
        var e1 = '\\' + f1 + ' ' + t1 + '°', e2 = '\\' + f2 + ' ' + t2 + '°';
        return {
          type: 'choice', concept: 2,
          q: '다음을 계산한 값은 무엇일까요?\n\n$' + e1 + opT + e2 + '$',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
          explain: '$' + e1 + '=' + texOf(v1) + '$, $' + e2 + '=' + texOf(v2) + '$이므로\n\n$' + e1 + opT + e2 + '=' + texOf(v1) + opT + texOf(v2) + (texOf(v1) + opT + texOf(v2) === texOf(ans) ? '' : '=' + texOf(ans)) + '$',
        };
      },
    },
    {
      id: 'length-with-table',
      level: 2,
      title: '삼각비의 표를 이용하여 높이와 거리 구하기',
      make: function (R) {
        // 각: [sin, cos, tan] × 10000 (소수 넷째 자리까지 반올림한 값)
        var TB = { 20: [3420, 9397, 3640], 25: [4226, 9063, 4663], 35: [5736, 8192, 7002], 40: [6428, 7660, 8391], 50: [7660, 6428, 11918], 55: [8192, 5736, 14281], 65: [9063, 4226, 21445], 70: [9397, 3420, 27475] };
        function dec4(X) { // X/10000 을 정확한 소수로
          var s = String(Math.floor(X / 10000)), f = String(X % 10000);
          while (f.length < 4) f = '0' + f;
          f = f.replace(/0+$/, '');
          return f ? s + '.' + f : s;
        }
        function tb(X) { var f = String(X % 10000); while (f.length < 4) f = '0' + f; return Math.floor(X / 10000) + '.' + f; }
        function r1(X) { var r = Math.round(X / 1000); return Math.floor(r / 10) + '.' + (r % 10); } // 반올림하여 소수 첫째 자리
        var kind = R.pick(['tree', 'kite', 'ramp']);
        var th, L, idx, X, name, wrongIdx, eye = 0, q, fig, setup;
        if (kind === 'tree') {
          th = R.pick([20, 25, 35, 40, 50, 55]);
          L = R.int(8, 30);
          eye = R.bool() ? 15000 : 0; // 1.5 m
          idx = 2; wrongIdx = 0;
          q = '나무에서 ' + L + ' m 떨어진 곳에서 나무의 꼭대기를 올려본각의 크기가 ' + th + '°였어요.' + (eye ? ' 눈높이가 1.5 m일 때,' : ' 눈높이를 생각하지 않을 때,') + ' 나무의 높이는 약 몇 m일까요?';
          fig = { type: 'polygon', points: [[0, 0], [L, 0], [L, L * TB[th][2] / 10000]], labels: ['A', 'C', 'B'], sides: [L + ' m', null, null], angles: [{ at: 0, label: th + '°' }, { at: 1, right: true }], alt: '수평 거리 ' + L + ' m, 올려본각 ' + th + '°인 직각삼각형' };
          setup = '수평 거리는 밑변, 나무의 높이는 높이이므로 $\\tan$를 써요. $' + L + '\\tan ' + th + '°=' + L + '\\times' + tb(TB[th][2]) + '=' + dec4(L * TB[th][2]) + '$';
        } else if (kind === 'kite') {
          th = R.pick([25, 35, 40, 50, 55, 65, 70]);
          L = R.int(20, 60);
          idx = 0; wrongIdx = 1;
          q = '길이가 ' + L + ' m인 연줄이 땅과 ' + th + '°의 각을 이루며 팽팽하게 당겨져 있어요. 연은 줄을 잡은 손보다 약 몇 m 높이 있을까요?';
          fig = { type: 'polygon', points: [[0, 0], [L * TB[th][1] / 10000, 0], [L * TB[th][1] / 10000, L * TB[th][0] / 10000]], labels: ['A', 'C', 'B'], sides: [null, null, L + ' m'], angles: [{ at: 0, label: th + '°' }, { at: 1, right: true }], alt: '빗변(연줄) ' + L + ' m, 수평선과 이루는 각 ' + th + '°인 직각삼각형' };
          setup = '연줄은 빗변, 구할 길이는 높이이므로 $\\sin$을 써요. $' + L + '\\sin ' + th + '°=' + L + '\\times' + tb(TB[th][0]) + '=' + dec4(L * TB[th][0]) + '$';
        } else {
          th = R.pick([20, 25, 35, 40]);
          L = R.int(5, 30);
          idx = 1; wrongIdx = 0;
          q = '길이가 ' + L + ' m인 비탈길이 수평면과 ' + th + '°의 각을 이루고 있어요. 이 비탈길의 수평 거리는 약 몇 m일까요?';
          fig = { type: 'polygon', points: [[0, 0], [L * TB[th][1] / 10000, 0], [L * TB[th][1] / 10000, L * TB[th][0] / 10000]], labels: ['A', 'C', 'B'], sides: [null, null, L + ' m'], angles: [{ at: 0, label: th + '°' }, { at: 1, right: true }], alt: '빗변(비탈길) ' + L + ' m, 수평면과 이루는 각 ' + th + '°인 직각삼각형' };
          setup = '비탈길은 빗변, 수평 거리는 밑변이므로 $\\cos$을 써요. $' + L + '\\cos ' + th + '°=' + L + '\\times' + tb(TB[th][1]) + '=' + dec4(L * TB[th][1]) + '$';
        }
        X = L * TB[th][idx] + eye;
        var ans = r1(X);
        var names = ['\\sin', '\\cos', '\\tan'];
        var wrong = [];
        var wX = L * TB[th][wrongIdx] + eye, wAns = r1(wX);
        if (Number(wAns) !== Number(ans)) wrong.push({ a: wAns, why: '$' + names[wrongIdx] + '$' + R.josa(wrongIdx === 0 ? '사인' : '코사인', '을/를') + ' 썼어요. 아는 변과 구할 변이 무엇인지(빗변·높이·밑변) 다시 확인해 보세요.' });
        if (eye) {
          var nAns = r1(X - eye);
          if (Number(nAns) !== Number(ans)) wrong.push({ a: nAns, why: '눈높이 1.5 m를 더하지 않았어요. 삼각형으로 구한 길이는 눈높이부터 꼭대기까지예요.' });
        }
        return {
          type: 'short', check: 'number', unit: 'm', concept: 4,
          q: q + ' ($\\sin ' + th + '°=' + tb(TB[th][0]) + '$, $\\cos ' + th + '°=' + tb(TB[th][1]) + '$, $\\tan ' + th + '°=' + tb(TB[th][2]) + '$' + R.josa(tb(TB[th][2]), '으로/로') + ' 계산하고, 반올림하여 소수 첫째 자리까지 구하세요.)',
          fig: fig,
          answer: ans,
          wrong: wrong,
          hint: '아는 변과 구할 변이 빗변·높이·밑변 가운데 무엇인지 먼저 정해요.',
          explain: setup + (eye ? '\n\n눈높이를 더하면 $' + dec4(X - eye) + '+1.5=' + dec4(X) + '$' : '') + '\n\n반올림하여 소수 첫째 자리까지 구하면 약 ' + ans + ' m예요.',
        };
      },
    },
    {
      id: 'area-with-trig',
      level: 2,
      title: '삼각비를 이용한 삼각형·평행사변형의 넓이',
      make: function (R) {
        var shape = R.pick(['tri', 'tri', 'para']);
        var th = R.pick([30, 45, 60, 120, 135, 150]);
        var a = R.int(3, 12), b;
        do { b = R.int(3, 12); } while (b === a);
        var acute = th > 90 ? 180 - th : th;
        var k = acute === 30 ? 1 : acute === 45 ? 2 : 3; // sin(acute) = (1/2)√k
        function val(coef, kk) { return { c: coef, k: kk }; }
        function str(v) {
          if (v.k === 1) return v.c.toString();
          return (v.c.num === 1 ? '' : v.c.num) + '√' + v.k + (v.c.den === 1 ? '' : '/' + v.c.den);
        }
        function tex(v) {
          if (v.k === 1) return v.c.toTex();
          var nn = v.c.num === 1 ? '' : String(v.c.num);
          return v.c.den === 1 ? nn + '\\sqrt{' + v.k + '}' : '\\frac{' + nn + '\\sqrt{' + v.k + '}}{' + v.c.den + '}';
        }
        var half = shape === 'tri' ? R.F(1, 2) : R.F(1, 1);
        var coef = half.mul(a * b).mul(R.F(1, 2));
        var ans = val(coef, k);
        var sinT = { 1: '\\frac{1}{2}', 2: '\\frac{\\sqrt{2}}{2}', 3: '\\frac{\\sqrt{3}}{2}' }[k];
        var cands = [];
        if (shape === 'tri') cands.push({ a: str(val(coef.mul(2), k)), why: '삼각형의 넓이에는 $\\frac{1}{2}$을 곱해요. $S=\\frac{1}{2}ab\\sin x$예요.' });
        else cands.push({ a: str(val(coef.mul(R.F(1, 2)), k)), why: '평행사변형은 삼각형 두 개로 이루어져서 $\\frac{1}{2}$을 곱하지 않아요. $S=ab\\sin x$예요.' });
        if (k !== 2) cands.push({ a: str(val(coef, 4 - k)), why: '$\\sin ' + acute + '°$ 대신 $\\cos ' + acute + '°$의 값을 썼어요.' });
        var wrong = cands; // 2배·반 배, 또는 근호 안이 다른 값이라 정답과 같아지지 않는다
        var q, explain;
        var angleNote = th > 90 ? '끼인각이 둔각이므로 $180°-' + th + '°=' + acute + '°$의 사인을 써요.\n\n' : '';
        if (shape === 'tri') {
          q = '$\\overline{AB}=' + a + '$ cm, $\\overline{AC}=' + b + '$ cm, $\\angle A=' + th + '°$인 삼각형 $ABC$의 넓이는 몇 cm²일까요? (근호는 √ 로 쓰고, 단위는 쓰지 않아요.)';
          explain = angleNote + '$S=\\frac{1}{2}\\times' + a + '\\times' + b + '\\times\\sin ' + acute + '°=' + R.F(a * b, 2).toTex() + '\\times' + sinT + '=' + tex(ans) + '$ (cm²)';
        } else {
          q = '평행사변형 $ABCD$에서 $\\overline{AB}=' + a + '$ cm, $\\overline{BC}=' + b + '$ cm, $\\angle B=' + th + '°$일 때, 넓이는 몇 cm²일까요? (근호는 √ 로 쓰고, 단위는 쓰지 않아요.)';
          explain = angleNote + '$S=' + a + '\\times' + b + '\\times\\sin ' + acute + '°=' + (a * b) + '\\times' + sinT + '=' + tex(ans) + '$ (cm²)';
        }
        return {
          type: 'short', check: 'expr', concept: 5,
          q: q,
          answer: str(ans),
          wrong: wrong,
          hint: shape === 'tri' ? '두 변과 끼인각을 알면 $S=\\frac{1}{2}ab\\sin x$예요.' : '이웃한 두 변과 끼인각을 알면 $S=ab\\sin x$예요.',
          explain: explain,
        };
      },
    },
  ],
});
