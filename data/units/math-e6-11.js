/* 6학년 수학 · 원의 둘레와 넓이
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
(function () {
  var T = function (x, y, s, anchor) {
    return '<text x="' + x + '" y="' + y + '" font-size="14" text-anchor="' + (anchor || 'middle') + '" fill="currentColor">' + s + '</text>';
  };
  var SHADE = 'fill="var(--fig-1)" fill-opacity="0.3"';
  var LINE = 'stroke="currentColor" stroke-width="2"';
  function circlePath(cx, cy, r) {
    return 'M' + (cx - r) + ' ' + cy + ' a' + r + ' ' + r + ' 0 1 0 ' + (2 * r) + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0 Z';
  }
  // 원 안의 정사각형(마름모)과 원 밖의 정사각형 — 원의 넓이 어림
  function squaresSvg(dLabel) {
    return '<svg viewBox="0 0 200 215">' +
      '<rect x="20" y="20" width="160" height="160" fill="none" ' + LINE + '/>' +
      '<circle cx="100" cy="100" r="80" ' + SHADE + ' ' + LINE + '/>' +
      '<polygon points="100,20 180,100 100,180 20,100" fill="var(--fig-2)" fill-opacity="0.3" ' + LINE + '/>' +
      '<line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>' +
      '<line x1="20" y1="196" x2="180" y2="196" stroke="currentColor" stroke-width="1.5"/>' +
      '<line x1="20" y1="190" x2="20" y2="202" stroke="currentColor" stroke-width="1.5"/><line x1="180" y1="190" x2="180" y2="202" stroke="currentColor" stroke-width="1.5"/>' +
      T(100, 212, dLabel) + '</svg>';
  }
  // 원 안의 정육각형과 원 밖의 정사각형 — 원주 어림
  var HEX_SQUARE = '<svg viewBox="0 0 200 200">' +
    '<rect x="20" y="20" width="160" height="160" fill="none" stroke="var(--fig-2)" stroke-width="2"/>' +
    '<circle cx="100" cy="100" r="80" fill="none" ' + LINE + '/>' +
    '<polygon points="180,100 140,169.3 60,169.3 20,100 60,30.7 140,30.7" fill="none" stroke="var(--fig-3)" stroke-width="2"/>' +
    '<line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>' +
    '<circle cx="100" cy="100" r="3" fill="currentColor"/>' + T(100, 94, '지름') + '</svg>';
  // 반원 (지름 표시)
  function semiSvg(dLabel) {
    return '<svg viewBox="0 0 220 135">' +
      '<path d="M20 105 A90 90 0 0 1 200 105 Z" ' + SHADE + ' ' + LINE + '/>' +
      '<circle cx="110" cy="105" r="3" fill="currentColor"/>' + T(110, 126, dLabel) + '</svg>';
  }
  // 고리 (큰 원 반지름, 작은 원 반지름)
  function ringSvg(R, r, bigLabel, smallLabel) {
    var rs = Math.round(80 * r / R);
    return '<svg viewBox="0 0 240 200">' +
      '<path d="' + circlePath(100, 100, 80) + ' ' + circlePath(100, 100, rs) + '" fill-rule="evenodd" ' + SHADE + '/>' +
      '<circle cx="100" cy="100" r="80" fill="none" ' + LINE + '/><circle cx="100" cy="100" r="' + rs + '" fill="none" ' + LINE + '/>' +
      '<circle cx="100" cy="100" r="3" fill="currentColor"/>' +
      '<line x1="100" y1="100" x2="180" y2="100" ' + LINE + '/>' + T(186, 105, bigLabel, 'start') +
      '<line x1="100" y1="100" x2="100" y2="' + (100 - rs) + '" ' + LINE + '/>' + T(105, 100 - rs / 2 + 5, smallLabel, 'start') + '</svg>';
  }
  // 정사각형 안에 꼭 맞는 원 — 원 밖 부분 색칠
  function squareCircleSvg(aLabel) {
    return '<svg viewBox="0 0 200 215">' +
      '<path d="M20 20 H180 V180 H20 Z ' + circlePath(100, 100, 80) + '" fill-rule="evenodd" ' + SHADE + '/>' +
      '<rect x="20" y="20" width="160" height="160" fill="none" ' + LINE + '/><circle cx="100" cy="100" r="80" fill="none" ' + LINE + '/>' +
      T(100, 205, aLabel) + '</svg>';
  }
  // 사분원
  function quarterSvg(rLabel) {
    return '<svg viewBox="0 0 190 190">' +
      '<path d="M20 170 V20 A150 150 0 0 1 170 170 Z" ' + SHADE + ' ' + LINE + '/>' +
      T(95, 186, rLabel) + '</svg>';
  }
  // 큰 원 안에 맞닿은 작은 원 두 개 — 큰 원에서 작은 원 두 개를 뺀 부분 색칠
  var TWO_IN_ONE = '<svg viewBox="0 0 200 215">' +
    '<path d="' + circlePath(100, 100, 80) + ' ' + circlePath(60, 100, 40) + ' ' + circlePath(140, 100, 40) + '" fill-rule="evenodd" ' + SHADE + '/>' +
    '<circle cx="100" cy="100" r="80" fill="none" ' + LINE + '/><circle cx="60" cy="100" r="40" fill="none" ' + LINE + '/><circle cx="140" cy="100" r="40" fill="none" ' + LINE + '/>' +
    '<line x1="20" y1="196" x2="180" y2="196" stroke="currentColor" stroke-width="1.5"/>' +
    '<line x1="20" y1="190" x2="20" y2="202" stroke="currentColor" stroke-width="1.5"/><line x1="180" y1="190" x2="180" y2="202" stroke="currentColor" stroke-width="1.5"/>' +
    T(100, 212, '20 cm') + '</svg>';
  // 운동장 트랙 (직사각형 + 양쪽 반원)
  var TRACK = '<svg viewBox="0 0 300 160">' +
    '<path d="M75 35 H225 A45 45 0 0 1 225 125 H75 A45 45 0 0 1 75 35 Z" ' + SHADE + ' ' + LINE + '/>' +
    '<line x1="75" y1="35" x2="75" y2="125" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>' +
    '<line x1="225" y1="35" x2="225" y2="125" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>' +
    T(150, 27, '50 m') + T(82, 85, '30 m', 'start') + '</svg>';
  // 원을 잘게 잘라 엇갈려 붙인 모양
  var CUT = (function () {
    var s = '<svg viewBox="0 0 260 150">';
    for (var k = 0; k < 4; k++) {
      var x = 60 + 40 * k;
      s += '<path d="M' + x + ' 40 Q' + (x + 20) + ' 32 ' + (x + 40) + ' 40 L' + (x + 20) + ' 120 Z" fill="var(--fig-1)" fill-opacity="0.35" ' + LINE + '/>';
      s += '<path d="M' + (x + 20) + ' 120 Q' + (x + 40) + ' 128 ' + (x + 60) + ' 120 L' + (x + 40) + ' 40 Z" fill="var(--fig-2)" fill-opacity="0.35" ' + LINE + '/>';
    }
    s += T(150, 22, '원주의 반 (반지름×원주율)') + T(64, 85, '반지름', 'end').replace('font-size="14"', 'font-size="13"') + '</svg>';
    return s;
  })();

  Tutor.registerUnit({
    id: 'math-e6-11',
    course: 'math-e6',
    title: '원의 둘레와 넓이',
    summary: '원주와 지름의 관계에서 원주율을 알아보고, 원주와 원의 넓이를 구하는 방법을 배워요.',
    goals: [
      '원주와 지름의 관계를 알고 원주율의 뜻을 말할 수 있어요.',
      '지름이나 반지름으로 원주를 구하고, 원주로 지름을 구할 수 있어요.',
      '원의 넓이를 어림하고, 반지름×반지름×원주율로 원의 넓이를 구할 수 있어요.',
      '반원·고리처럼 원으로 이루어진 도형의 넓이를 구할 수 있어요.',
    ],
    standards: ['[6수03-15]', '[6수03-16]'],

    concepts: [
      {
        title: '원주와 지름의 관계',
        body: '원의 둘레를 **원주**라고 해요. 지름이 길어지면 원주도 길어져요.\n\n' +
          '원주가 지름의 몇 배쯤인지 그림으로 어림해 보아요.\n\n' +
          '- 원 안에 꼭 맞는 **정육각형**의 둘레는 반지름의 6배, 곧 **지름의 3배**예요. 원주는 이것보다 길어요.\n' +
          '- 원 밖에 꼭 맞는 **정사각형**의 둘레는 **지름의 4배**예요. 원주는 이것보다 짧아요.\n\n' +
          '그래서 **원주는 지름의 3배보다 길고, 4배보다 짧아요.**',
        easy: '지름이 10 cm인 접시의 둘레를 실로 감아 재 본다고 생각해 보세요. 실을 펴서 지름과 비교하면 지름 3개를 이은 30 cm보다 조금 길고, 지름 4개를 이은 40 cm에는 한참 못 미쳐요.\n\n' +
          '원이 크든 작든 원주는 언제나 지름의 3배와 4배 사이예요.',
        fig: { type: 'svg', alt: '원 안에 꼭 맞는 정육각형과 원 밖에 꼭 맞는 정사각형, 원의 지름을 점선으로 그린 그림', svg: HEX_SQUARE },
        check: {
          type: 'choice',
          q: '지름이 10 cm인 원의 원주는 어느 범위에 있을까요?',
          choices: ['30 cm보다 길고 40 cm보다 짧아요.', '10 cm보다 길고 20 cm보다 짧아요.', '40 cm보다 길어요.'],
          answer: 0,
          why: ['', '원주는 지름의 2배보다 훨씬 길어요. 원 안의 정육각형 둘레만 해도 지름의 3배예요.', '원주는 원 밖 정사각형의 둘레(지름의 4배)보다 짧아요.'],
          explain: '원주는 지름의 3배보다 길고 4배보다 짧아요. 지름이 10 cm이면 원주는 30 cm보다 길고 40 cm보다 짧아요.',
        },
      },
      {
        title: '원주율',
        body: '여러 원의 원주를 지름으로 나누어 보면 원의 크기와 관계없이 **언제나 같은 값**이 나와요. 이 값을 **원주율**이라고 해요.\n\n' +
          '(원주율)=(원주)÷(지름)\n\n' +
          '원주율을 소수로 나타내면 3.1415926535897932… 처럼 끝없이 이어져요. 그래서 필요에 따라 **3, 3.1, 3.14** 처럼 어림하여 써요. 문제에 "원주율: 3.14"처럼 어떤 값을 쓸지 알려 줘요.\n\n' +
          '| 원 | 지름 | 원주(어림) | 원주÷지름 |\n|---|---|---|---|\n| 동전 | 2 cm | 6.28 cm | 3.14 |\n| 접시 | 20 cm | 62.8 cm | 3.14 |\n| 훌라후프 | 80 cm | 251.2 cm | 3.14 |',
        easy: '작은 동전이든 큰 훌라후프든 둘레를 지름으로 나누면 똑같이 3.14쯤이 나와요. 원은 모두 모양이 같고 크기만 다르기 때문이에요.\n\n' +
          '그래서 원의 둘레는 "지름의 약 3.14배"라고 기억하면 돼요.',
        check: {
          type: 'ox',
          q: '큰 원일수록 원주율이 커요.',
          answer: false,
          explain: '원주율은 원의 크기와 관계없이 같아요. 큰 원은 원주도 길고 지름도 길어서 (원주)÷(지름)은 언제나 3.14…예요.',
        },
      },
      {
        title: '원주와 지름 구하기',
        body: '(원주율)=(원주)÷(지름)이므로 거꾸로 생각하면\n\n' +
          '- **(원주)=(지름)×(원주율)=(반지름)×2×(원주율)**\n' +
          '- **(지름)=(원주)÷(원주율)**\n\n' +
          '예: 지름이 5 cm인 원의 원주는 $5\\times3.14=15.7$ (cm)예요.\n\n' +
          '예: 원주가 18.6 cm인 원의 지름은 원주율을 3.1로 하면 $18.6\\div3.1=6$ (cm)예요.\n\n' +
          '> ⚠️ 반지름이 주어지면 먼저 2를 곱해 지름으로 바꾸어요. 반지름에 원주율만 곱하면 원주의 반밖에 안 돼요.',
        easy: '원주는 "지름을 약 3.14번 이은 길이"예요. 그러니 지름에 3.14를 곱하면 원주가 돼요.\n\n' +
          '거꾸로 원주를 알면 3.14로 나누어 지름을 구해요. 곱셈과 나눗셈이 서로 반대이기 때문이에요.',
        fig: { type: 'circle', r: '4 cm', showCenter: true, showRadius: true, alt: '반지름이 4 cm인 원' },
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '반지름이 4 cm인 원의 원주는 몇 cm일까요? (원주율: 3.14)',
          answer: '25.12',
          wrong: [
            { a: '12.56', why: '반지름에 원주율만 곱했어요. 지름은 반지름의 2배이니 $4\\times2\\times3.14$를 계산해요.' },
            { a: '50.24', why: '원의 넓이(반지름×반지름×원주율)를 구했어요. 원주는 지름×원주율이에요.' },
          ],
          explain: '지름은 $4\\times2=8$ (cm)이므로 원주는 $8\\times3.14=25.12$ (cm)예요.',
        },
      },
      {
        title: '원의 넓이 어림하기',
        body: '반지름이 10 cm인 원의 넓이를 어림해 보아요.\n\n' +
          '- 원 **밖**에 꼭 맞는 정사각형: 한 변이 지름 20 cm이니 넓이는 $20\\times20=400$ (cm²)\n' +
          '- 원 **안**에 꼭 맞는 정사각형: 두 대각선이 지름 20 cm인 마름모이니 넓이는 $20\\times20\\div2=200$ (cm²)\n\n' +
          '원은 안쪽 정사각형보다 크고 바깥쪽 정사각형보다 작으니, **원의 넓이는 200 cm²보다 크고 400 cm²보다 작아요.**\n\n' +
          '> 💡 모눈종이에 원을 그려 원 안에 완전히 들어간 칸과 원에 걸친 칸까지 세어서 어림할 수도 있어요.',
        easy: '원을 두 정사각형 사이에 끼워 넣는다고 생각해 보세요. 안쪽 정사각형은 원보다 작고, 바깥쪽 정사각형은 원보다 커요.\n\n' +
          '그러니 원의 넓이는 두 정사각형 넓이의 사이에 있어요. 그림에서 원은 바깥 정사각형의 대부분을 채우니, 400 cm²에 더 가까울 거라고 짐작할 수 있어요.',
        fig: { type: 'svg', alt: '지름이 20 cm인 원과, 원 안에 꼭 맞는 마름모 모양 정사각형, 원 밖에 꼭 맞는 정사각형', svg: squaresSvg('20 cm') },
        check: {
          type: 'choice',
          q: '지름이 12 cm인 원의 넓이를 원 안과 원 밖의 정사각형으로 어림하면 어느 범위일까요?',
          choices: ['72 cm²보다 크고 144 cm²보다 작아요.', '36 cm²보다 크고 72 cm²보다 작아요.', '144 cm²보다 커요.'],
          answer: 0,
          why: ['', '원 안 정사각형의 넓이를 다시 구해 보세요. 대각선이 12 cm이니 $12\\times12\\div2=72$ (cm²)예요.', '원은 원 밖 정사각형(144 cm²) 안에 들어가니 그보다 작아요.'],
          explain: '원 밖 정사각형은 $12\\times12=144$ (cm²), 원 안 정사각형은 $12\\times12\\div2=72$ (cm²)이므로 원의 넓이는 72 cm²보다 크고 144 cm²보다 작아요.',
        },
      },
      {
        title: '원의 넓이 구하기',
        body: '원을 피자처럼 아주 잘게 잘라 엇갈려 붙이면 **직사각형**에 가까워져요.\n\n' +
          '- 직사각형의 가로 = 원주의 반 = (지름)×(원주율)÷2 = **(반지름)×(원주율)**\n' +
          '- 직사각형의 세로 = **(반지름)**\n\n' +
          '그래서\n\n**(원의 넓이)=(반지름)×(반지름)×(원주율)**\n\n' +
          '예: 반지름이 5 cm인 원의 넓이는 $5\\times5\\times3.14=78.5$ (cm²)예요.\n\n' +
          '> ⚠️ 지름이 주어지면 먼저 2로 나누어 반지름을 구해요.',
        easy: '피자를 8조각, 16조각, 32조각 … 점점 잘게 잘라 위아래로 엇갈려 늘어놓으면 울퉁불퉁하던 가장자리가 점점 반듯해져서 직사각형처럼 돼요.\n\n' +
          '피자의 둘레(원주)는 위쪽과 아래쪽에 반씩 나뉘어 가로가 되고, 조각의 길이(반지름)가 세로가 돼요. 직사각형 넓이는 가로×세로이니 (반지름×원주율)×반지름이에요.',
        fig: { type: 'svg', alt: '원을 8조각으로 잘라 위아래로 엇갈려 붙인 그림. 가로는 원주의 반, 세로는 반지름이에요.', svg: CUT },
        check: {
          type: 'short', check: 'number', unit: 'cm²',
          q: '반지름이 3 cm인 원의 넓이는 몇 cm²일까요? (원주율: 3.14)',
          answer: '28.26',
          wrong: [
            { a: '18.84', why: '원주를 구했어요. 원의 넓이는 반지름×반지름×원주율이에요.' },
            { a: '113.04', why: '지름 6 cm를 두 번 곱했어요. 지름이 아니라 반지름을 두 번 곱해요.' },
          ],
          explain: '$3\\times3\\times3.14=28.26$ (cm²)예요.',
        },
      },
      {
        title: '여러 가지 원 모양 도형의 넓이',
        body: '원의 일부이거나 원을 빼낸 도형은 원의 넓이를 이용해 구해요.\n\n' +
          '| 도형 | 넓이 구하는 방법 |\n|---|---|\n' +
          '| 반원 | (원의 넓이)÷2 |\n' +
          '| 원의 $\\frac{1}{4}$ | (원의 넓이)÷4 |\n' +
          '| 고리 모양 | (큰 원의 넓이)−(작은 원의 넓이) |\n' +
          '| 정사각형에서 원을 뺀 부분 | (정사각형의 넓이)−(원의 넓이) |\n\n' +
          '예: 큰 원의 반지름이 5 cm, 작은 원의 반지름이 3 cm인 고리 모양의 넓이는\n\n$5\\times5\\times3.14-3\\times3\\times3.14=78.5-28.26=50.24$ (cm²)\n\n' +
          '> ⚠️ 고리의 넓이를 반지름의 차(5−3=2)로 구한 원의 넓이로 계산하면 틀려요.',
        easy: '도넛 모양을 생각해 보세요. 도넛의 넓이는 "큰 동그라미 전체"에서 "가운데 구멍"을 뺀 것이에요.\n\n' +
          '반원은 원을 반으로 접은 것이니 원 넓이의 반이에요. 이처럼 아는 도형(원·정사각형)으로 나누거나 빼서 생각하면 돼요.',
        fig: { type: 'svg', alt: '큰 원의 반지름이 5 cm, 작은 원의 반지름이 3 cm인 고리 모양. 고리 부분이 색칠되어 있어요.', svg: ringSvg(5, 3, '5 cm', '3 cm') },
        check: {
          type: 'choice',
          q: '지름이 8 cm인 반원의 넓이는 몇 cm²일까요? (원주율: 3.14)',
          choices: ['25.12 cm²', '50.24 cm²', '100.48 cm²'],
          answer: 0,
          why: ['', '원 전체의 넓이예요. 반원은 원의 넓이를 2로 나누어요.', '지름 8 cm를 두 번 곱했어요. 반지름 4 cm를 두 번 곱해요.'],
          explain: '반지름은 4 cm이므로 원의 넓이는 $4\\times4\\times3.14=50.24$ (cm²)이고, 반원은 그 반인 $50.24\\div2=25.12$ (cm²)예요.',
        },
      },
    ],

    examples: [
      {
        q: '원주가 31.4 cm인 원의 넓이는 몇 cm²일까요? (원주율: 3.14)',
        steps: [
          '지름은 (원주)÷(원주율)이에요. $31.4\\div3.14=10$ (cm)',
          '반지름은 지름의 반이니 $10\\div2=5$ (cm)예요.',
          '원의 넓이는 $5\\times5\\times3.14=78.5$ (cm²)예요.',
        ],
        answer: '78.5 cm²',
      },
      {
        q: '지름이 60 cm인 굴렁쇠를 굴렸더니 942 cm를 갔어요. 굴렁쇠는 몇 바퀴 굴렀을까요? (원주율: 3.14)',
        steps: [
          '굴렁쇠가 한 바퀴 구르면 원주만큼 가요. 원주는 $60\\times3.14=188.4$ (cm)예요.',
          '간 거리를 원주로 나누면 $942\\div188.4=9420\\div1884=5$예요.',
        ],
        answer: '5바퀴',
      },
    ],

    terms: [
      { term: '원주', def: '원의 둘레예요. (원주)=(지름)×(원주율)이에요.' },
      { term: '원주율', def: '원주를 지름으로 나눈 값이에요. 원의 크기와 관계없이 같고, 3.1415926…처럼 끝없이 이어져서 3, 3.1, 3.14로 어림하여 써요.' },
      { term: '지름', def: '원 위의 두 점을 이은 선분 가운데 원의 중심을 지나는 선분이에요. 반지름의 2배예요.' },
      { term: '반지름', def: '원의 중심과 원 위의 한 점을 이은 선분이에요. 지름의 반이에요.' },
      { term: '원의 넓이', def: '(반지름)×(반지름)×(원주율)로 구해요. 예: 반지름이 5 cm이면 $5\\times5\\times3.14=78.5$ (cm²)예요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 1,
        q: '원주율을 바르게 나타낸 것은 무엇일까요?',
        choices: ['(원주)÷(지름)', '(원주)÷(반지름)', '(지름)÷(원주)', '(원주)×(지름)'],
        answer: 0,
        why: ['', '반지름으로 나누면 약 6.28이 나와요. 원주율은 원주를 **지름**으로 나눈 값이에요.', '나누는 순서가 바뀌었어요. 원주를 지름으로 나누어요.', '곱하지 않고 나누어요. 원주율은 원주가 지름의 몇 배인지 나타내요.'],
        explain: '원주율은 원주가 지름의 몇 배인지 나타내는 값이라서 (원주)÷(지름)이에요. 약 3.14예요.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 1,
        q: '원주율은 정확히 3.14예요.',
        answer: false,
        explain: '원주율은 3.1415926…처럼 끝없이 이어지는 수예요. 3.14는 계산하기 편하게 어림한 값이에요.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '지름이 8 cm인 원의 원주는 몇 cm일까요? (원주율: 3.14)',
        fig: { type: 'circle', d: '8 cm', showCenter: true, showDiameter: true, alt: '지름이 8 cm인 원' },
        answer: '25.12',
        wrong: [
          { a: '50.24', why: '지름을 반지름으로 생각해 2를 한 번 더 곱했어요. 지름이 주어졌으니 바로 원주율을 곱해요.' },
          { a: '12.56', why: '지름의 반에 원주율을 곱했어요. 원주는 (지름)×(원주율)이에요.' },
        ],
        explain: '(원주)=(지름)×(원주율)이므로 $8\\times3.14=25.12$ (cm)예요.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '원주가 31 cm인 원의 지름은 몇 cm일까요? (원주율: 3.1)',
        answer: '10',
        wrong: [
          { a: '5', why: '반지름을 구했어요. (원주)÷(원주율)은 지름이에요.' },
          { a: '96.1', why: '원주에 원주율을 곱했어요. 지름은 원주를 원주율로 **나누어** 구해요.' },
        ],
        explain: '(지름)=(원주)÷(원주율)이므로 $31\\div3.1=310\\div31=10$ (cm)예요.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 4,
        q: '반지름이 5 cm인 원의 넓이는 몇 cm²일까요? (원주율: 3.14)',
        fig: { type: 'circle', r: '5 cm', showCenter: true, showRadius: true, alt: '반지름이 5 cm인 원' },
        answer: '78.5',
        wrong: [
          { a: '31.4', why: '원주를 구했어요. 원의 넓이는 (반지름)×(반지름)×(원주율)이에요.' },
          { a: '314', why: '지름 10 cm를 두 번 곱했어요. 반지름 5 cm를 두 번 곱해요.' },
        ],
        explain: '$5\\times5\\times3.14=78.5$ (cm²)예요.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 4,
        q: '지름이 14 cm인 원의 넓이는 몇 cm²일까요? (원주율: 3.14)',
        fig: { type: 'circle', d: '14 cm', showCenter: true, showDiameter: true, alt: '지름이 14 cm인 원' },
        answer: '153.86',
        wrong: [
          { a: '615.44', why: '지름을 두 번 곱했어요. 먼저 반지름 $14\\div2=7$ (cm)를 구해요.' },
          { a: '43.96', why: '원주를 구했어요. 원의 넓이는 (반지름)×(반지름)×(원주율)이에요.' },
        ],
        explain: '반지름은 $14\\div2=7$ (cm)이므로 넓이는 $7\\times7\\times3.14=153.86$ (cm²)예요.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 0,
        q: '원주와 지름에 대한 설명으로 옳은 것은 무엇일까요?',
        choices: ['지름이 길어지면 원주도 길어져요.', '원주는 지름의 2배예요.', '원주는 지름의 4배보다 길어요.', '지름이 길어져도 원주는 그대로예요.'],
        answer: 0,
        why: ['', '지름의 2배는 원 안 정육각형 둘레(지름의 3배)보다도 짧아요. 원주는 지름의 약 3.14배예요.', '원주는 원 밖 정사각형의 둘레(지름의 4배)보다 짧아요.', '원이 커지면 둘레도 길어져요. 원주는 언제나 지름의 약 3.14배예요.'],
        explain: '원주는 지름의 약 3.14배라서 지름이 길어지면 원주도 길어져요. 원주는 지름의 3배보다 길고 4배보다 짧아요.',
      },
      {
        id: 'p8', level: 2, type: 'choice', fixed: true, concept: 3,
        q: '지름이 16 cm인 원의 넓이를 그림처럼 원 안의 정사각형과 원 밖의 정사각형으로 어림했어요. 원의 넓이는 어느 범위에 있을까요?',
        fig: { type: 'svg', alt: '지름이 16 cm인 원과, 원 안에 꼭 맞는 마름모 모양 정사각형, 원 밖에 꼭 맞는 정사각형', svg: squaresSvg('16 cm') },
        choices: ['64 cm²보다 크고 128 cm²보다 작아요.', '128 cm²보다 크고 256 cm²보다 작아요.', '256 cm²보다 크고 512 cm²보다 작아요.', '256 cm²보다 커요.'],
        answer: 1,
        why: [
          '원 안 정사각형의 넓이는 64 cm²가 아니에요. 대각선이 16 cm인 마름모이니 $16\\times16\\div2=128$ (cm²)예요.',
          '',
          '원 밖 정사각형의 넓이는 $16\\times16=256$ (cm²)이고, 원은 그 안에 들어가니 더 작아요.',
          '원은 원 밖 정사각형 안에 들어가니 256 cm²보다 작아요.',
        ],
        hint: '원 안 정사각형은 두 대각선이 지름인 마름모로 보고 넓이를 구해요.',
        explain: '원 밖 정사각형은 $16\\times16=256$ (cm²), 원 안 정사각형은 $16\\times16\\div2=128$ (cm²)예요. 원의 넓이는 128 cm²보다 크고 256 cm²보다 작아요. (실제 넓이는 $8\\times8\\times3.14=200.96$ (cm²))',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '지름이 70 cm인 굴렁쇠를 5바퀴 굴렸어요. 굴렁쇠가 간 거리는 몇 cm일까요? (원주율: 3.14)',
        answer: '1099',
        hint: '굴렁쇠가 한 바퀴 구르면 원주만큼 가요.',
        wrong: [{ a: '219.8', why: '한 바퀴 간 거리(원주)만 구했어요. 5바퀴를 굴렸으니 5를 곱해요.' }],
        explain: '한 바퀴에 원주 $70\\times3.14=219.8$ (cm)만큼 가므로 5바퀴는 $219.8\\times5=1099$ (cm)예요.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 4,
        q: '원주가 37.68 cm인 원의 넓이는 몇 cm²일까요? (원주율: 3.14)',
        answer: '113.04',
        hint: '먼저 원주로 지름을 구하고, 반지름을 구해요.',
        wrong: [{ a: '452.16', why: '지름 12 cm를 두 번 곱했어요. 반지름 6 cm를 두 번 곱해요.' }],
        explain: '지름은 $37.68\\div3.14=12$ (cm), 반지름은 6 cm예요. 넓이는 $6\\times6\\times3.14=113.04$ (cm²)예요.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 5,
        q: '지름이 20 cm인 반원의 넓이는 몇 cm²일까요? (원주율: 3.14)',
        fig: { type: 'svg', alt: '지름이 20 cm인 반원', svg: semiSvg('20 cm') },
        answer: '157',
        wrong: [
          { a: '314', why: '원 전체의 넓이를 구했어요. 반원은 원의 넓이를 2로 나누어요.' },
          { a: '628', why: '지름 20 cm를 반지름처럼 두 번 곱했어요. 반지름은 10 cm예요.' },
        ],
        explain: '반지름은 10 cm이므로 원의 넓이는 $10\\times10\\times3.14=314$ (cm²)이고, 반원은 $314\\div2=157$ (cm²)예요.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 5,
        q: '큰 원의 반지름이 6 cm, 작은 원의 반지름이 4 cm인 고리 모양에서 색칠한 부분의 넓이는 몇 cm²일까요? (원주율: 3.14)',
        fig: { type: 'svg', alt: '큰 원의 반지름이 6 cm, 작은 원의 반지름이 4 cm인 고리 모양', svg: ringSvg(6, 4, '6 cm', '4 cm') },
        answer: '62.8',
        hint: '큰 원의 넓이에서 작은 원의 넓이를 빼요.',
        wrong: [
          { a: '12.56', why: '반지름의 차 2 cm로 원의 넓이를 구했어요. 큰 원의 넓이에서 작은 원의 넓이를 빼야 해요.' },
          { a: '113.04', why: '큰 원의 넓이만 구했어요. 가운데 작은 원의 넓이를 빼요.' },
        ],
        explain: '큰 원은 $6\\times6\\times3.14=113.04$ (cm²), 작은 원은 $4\\times4\\times3.14=50.24$ (cm²)이므로 색칠한 부분은 $113.04-50.24=62.8$ (cm²)예요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: 'cm²', concept: 5,
        q: '한 변이 10 cm인 정사각형 안에 꼭 맞는 원을 그렸어요. 정사각형에서 원을 뺀 색칠한 부분의 넓이는 몇 cm²일까요? (원주율: 3.14)',
        fig: { type: 'svg', alt: '한 변이 10 cm인 정사각형 안에 꼭 맞는 원. 원 밖 네 귀퉁이가 색칠되어 있어요.', svg: squareCircleSvg('10 cm') },
        answer: '21.5',
        hint: '꼭 맞는 원의 지름은 정사각형의 한 변과 같아요.',
        wrong: [{ a: '78.5', why: '원의 넓이를 구했어요. 정사각형의 넓이에서 원의 넓이를 빼요.' }],
        explain: '원의 지름은 10 cm, 반지름은 5 cm예요. 정사각형은 $10\\times10=100$ (cm²), 원은 $5\\times5\\times3.14=78.5$ (cm²)이므로 색칠한 부분은 $100-78.5=21.5$ (cm²)예요.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: '배', concept: 4,
        q: '원의 반지름을 2배로 늘리면 원의 넓이는 처음 넓이의 몇 배가 될까요?',
        answer: '4',
        hint: '반지름이 1 cm인 원과 2 cm인 원의 넓이를 비교해 보세요.',
        wrong: [{ a: '2', why: '반지름이 넓이 공식에 두 번 곱해진다는 것을 놓쳤어요. 반지름이 2배이면 넓이는 $2\\times2=4$(배)예요.' }],
        explain: '넓이는 (반지름)×(반지름)×(원주율)이에요. 반지름이 2배가 되면 반지름을 두 번 곱하므로 넓이는 $2\\times2=4$(배)가 돼요. 예: 반지름 1 cm → 3.14 cm², 반지름 2 cm → 12.56 cm²',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', unit: 'cm²', concept: 5,
        q: '지름이 20 cm인 큰 원 안에 크기가 같은 작은 원 두 개가 맞닿아 꼭 들어 있어요. 큰 원에서 작은 원 두 개를 뺀 색칠한 부분의 넓이는 몇 cm²일까요? (원주율: 3.14)',
        fig: { type: 'svg', alt: '지름이 20 cm인 큰 원 안에 같은 크기의 작은 원 두 개가 나란히 맞닿아 있어요. 작은 원 밖의 큰 원 부분이 색칠되어 있어요.', svg: TWO_IN_ONE },
        answer: '157',
        hint: '작은 원 두 개의 지름을 더하면 큰 원의 지름이에요.',
        wrong: [{ a: '235.5', why: '작은 원을 하나만 뺐어요. 작은 원 두 개를 모두 빼요.' }],
        explain: '작은 원의 지름은 $20\\div2=10$ (cm), 반지름은 5 cm예요. 큰 원은 $10\\times10\\times3.14=314$ (cm²), 작은 원 하나는 $5\\times5\\times3.14=78.5$ (cm²)이므로 색칠한 부분은 $314-78.5\\times2=157$ (cm²)예요.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: 'm', concept: 2,
        q: '그림과 같이 직사각형의 양쪽에 반원을 붙인 모양의 운동장이 있어요. 곧은 부분의 길이는 50 m, 반원의 지름은 30 m예요. 운동장의 둘레는 몇 m일까요? (원주율: 3.14)',
        fig: { type: 'svg', alt: '곧은 부분이 50 m이고 양쪽 끝이 지름 30 m인 반원으로 된 운동장 모양', svg: TRACK },
        answer: '194.2',
        hint: '양쪽 반원 두 개를 합치면 원 하나예요.',
        wrong: [
          { a: '254.2', why: '점선(반원의 지름)까지 둘레에 넣었어요. 점선은 운동장의 둘레가 아니에요.' },
          { a: '147.1', why: '반원의 곡선을 하나만 더했어요. 양쪽 반원 두 개를 합치면 원 하나의 원주예요.' },
        ],
        explain: '곧은 부분은 $50\\times2=100$ (m)이에요. 양쪽 반원 두 개를 합치면 지름 30 m인 원의 원주와 같아서 $30\\times3.14=94.2$ (m)예요. 둘레는 $100+94.2=194.2$ (m)예요.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '넓이가 200.96 cm²인 원의 원주는 몇 cm일까요? (원주율: 3.14)',
        answer: '50.24',
        hint: '넓이를 원주율로 나누면 (반지름)×(반지름)이 나와요.',
        wrong: [{ a: '25.12', why: '반지름에 원주율만 곱했어요. 원주는 (반지름)×2×(원주율)이에요.' }],
        explain: '(반지름)×(반지름)$=200.96\\div3.14=64$이므로 반지름은 8 cm예요($8\\times8=64$). 원주는 $8\\times2\\times3.14=50.24$ (cm)예요.',
      },
    ],

    deeper: [
      {
        title: '원주율을 처음 구한 사람들',
        body: '옛날 사람들도 원주가 지름의 3배쯤이라는 것을 알았어요. 고대 그리스의 수학자 아르키메데스는 원 안과 원 밖에 정육각형, 정십이각형 … 정구십육각형까지 그려 둘레를 계산했어요. 원주는 안쪽 다각형의 둘레보다 길고 바깥쪽 다각형의 둘레보다 짧으니, 원주율이 약 3.14라는 것을 알아냈지요.\n\n' +
          '오늘 정육각형과 정사각형으로 "3배보다 길고 4배보다 짧다"를 알아낸 방법과 같은 생각이에요. 변의 수를 늘릴수록 다각형이 원에 가까워져서 더 정확한 값을 얻을 수 있어요.',
      },
      {
        title: '중학교에서는 $\\pi$',
        body: '중학교에서는 원주율을 그리스 문자 $\\pi$(파이)로 나타내요. 반지름이 $r$인 원의 둘레는 $2\\pi r$, 넓이는 $\\pi r^2$으로 써요.\n\n' +
          '3.14 대신 $\\pi$를 그대로 두면 어림하지 않은 정확한 값을 나타낼 수 있어요. 오늘 배운 "원주=지름×원주율", "넓이=반지름×반지름×원주율"을 문자로 쓴 것이에요.',
      },
    ],

    faq: [
      {
        q: '원주율은 왜 3.14로 계산해요?',
        a: '원주율은 3.1415926…처럼 끝없이 이어지고 되풀이되지도 않는 수라서 그대로 계산할 수 없어요. 그래서 알맞게 어림한 3.14를 써요. 문제에서 3이나 3.1을 쓰라고 하면 그 값으로 계산해요.',
      },
      {
        q: '원주를 구할 때와 넓이를 구할 때 헷갈려요.',
        a: '원주는 **길이**라서 (지름)×(원주율), 단위는 cm예요. 넓이는 **넓이**라서 길이를 두 번 곱한 (반지름)×(반지름)×(원주율), 단위는 cm²예요. 단위를 떠올리면 덜 헷갈려요.',
      },
      {
        q: '원을 잘라 붙이면 왜 직사각형이 돼요?',
        a: '조각을 몇 개로 자르면 가장자리가 울퉁불퉁하지만, 더 잘게 자를수록 울퉁불퉁한 부분이 작아져서 직사각형에 점점 가까워져요. 가로는 원주의 반, 세로는 반지름이라서 넓이가 (반지름)×(원주율)×(반지름)이 돼요.',
      },
    ],

    mistakes: [
      '반지름이 주어졌는데 반지름에 원주율만 곱해 원주를 구하는 실수 — 원주는 (반지름)×2×(원주율)이에요.',
      '지름이 주어졌는데 지름을 두 번 곱해 넓이를 구하는 실수 — 먼저 반지름을 구해서 (반지름)×(반지름)×(원주율)로 계산해요.',
      '고리 모양의 넓이를 반지름의 차로 구한 원의 넓이로 계산하는 실수 — (큰 원의 넓이)−(작은 원의 넓이)예요.',
    ],

    gens: [
      {
        id: 'circumference',
        level: 1,
        title: '원주 구하기',
        make: function (R) {
          var pis = [['3.14', R.F(314, 100)], ['3.14', R.F(314, 100)], ['3.1', R.F(31, 10)], ['3', R.F(3, 1)]];
          var pp = R.pick(pis);
          var giveR = R.bool();
          var v = giveR ? R.int(2, 20) : R.int(3, 40);
          var d = giveR ? 2 * v : v;
          var C = pp[1].mul(d).toDecimal();
          var wrong = [];
          if (giveR) {
            wrong.push({ a: pp[1].mul(v).toDecimal(), why: '반지름에 원주율만 곱했어요. 먼저 2를 곱해 지름을 구해요.' });
            if (v !== 2) wrong.push({ a: pp[1].mul(v * v).toDecimal(), why: '원의 넓이(반지름×반지름×원주율)를 구했어요. 원주는 (지름)×(원주율)이에요.' });
          } else {
            wrong.push({ a: pp[1].mul(2 * d).toDecimal(), why: '지름을 반지름으로 생각해 2를 한 번 더 곱했어요. 지름이 주어지면 바로 원주율을 곱해요.' });
          }
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 2,
            q: (giveR ? '반지름' : '지름') + R.josa(giveR ? '반지름' : '지름', '이/가') + ' ' + v + ' cm인 원의 원주는 몇 cm일까요? (원주율: ' + pp[0] + ')',
            fig: giveR
              ? { type: 'circle', r: v + ' cm', showCenter: true, showRadius: true }
              : { type: 'circle', d: v + ' cm', showCenter: true, showDiameter: true },
            answer: C,
            wrong: wrong,
            explain: (giveR ? '지름은 $' + v + '\\times2=' + d + '$ (cm)예요. ' : '') + '(원주)=(지름)×(원주율)이므로 $' + d + '\\times' + pp[0] + '=' + C + '$ (cm)예요.',
          };
        },
      },
      {
        id: 'diameter-from-circumference',
        level: 2,
        title: '원주로 지름·반지름 구하기',
        make: function (R) {
          var pp = R.pick([['3.14', R.F(314, 100)], ['3.14', R.F(314, 100)], ['3.1', R.F(31, 10)], ['3', R.F(3, 1)]]);
          var askR = R.bool();
          var d = askR ? 2 * R.int(2, 15) : R.int(3, 30);
          var C = pp[1].mul(d).toDecimal();
          var ans = askR ? d / 2 : d;
          var wrong = [];
          if (askR) wrong.push({ a: String(d), why: '지름을 구했어요. 반지름은 지름의 반이에요.' });
          else if (d % 2 === 0) wrong.push({ a: String(d / 2), why: '반지름을 구했어요. (원주)÷(원주율)은 지름이에요.' });
          wrong.push({ a: pp[1].mul(pp[1]).mul(d).toDecimal(), why: '원주에 원주율을 곱했어요. 원주를 원주율로 **나누어** 지름을 구해요.' });
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 2,
            q: '원주가 ' + C + ' cm인 원의 ' + (askR ? '반지름' : '지름') + R.josa(askR ? '반지름' : '지름', '은/는') + ' 몇 cm일까요? (원주율: ' + pp[0] + ')',
            answer: String(ans),
            hint: '(지름)=(원주)÷(원주율)이에요.',
            wrong: wrong,
            explain: '(지름)=(원주)÷(원주율)이므로 $' + C + '\\div' + pp[0] + '=' + d + '$ (cm)예요.' + (askR ? ' 반지름은 그 반인 $' + d + '\\div2=' + ans + '$ (cm)예요.' : ''),
          };
        },
      },
      {
        id: 'circle-area',
        level: 1,
        title: '원의 넓이 구하기',
        make: function (R) {
          var pi = R.F(314, 100);
          var giveD = R.bool(0.4);
          var r = R.int(2, 20);
          var d = 2 * r;
          var A = pi.mul(r * r).toDecimal();
          var circ = pi.mul(d).toDecimal();
          var wrong = [];
          if (giveD) wrong.push({ a: pi.mul(d * d).toDecimal(), why: '지름을 두 번 곱했어요. 먼저 반지름 $' + d + '\\div2=' + r + '$ (cm)를 구해요.' });
          if (circ !== A) wrong.push({ a: circ, why: '원주를 구했어요. 원의 넓이는 (반지름)×(반지름)×(원주율)이에요.' });
          wrong.push({ a: pi.mul(r).toDecimal(), why: '반지름을 한 번만 곱했어요. 반지름을 두 번 곱한 뒤 원주율을 곱해요.' });
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 4,
            q: (giveD ? '지름이 ' + d : '반지름이 ' + r) + ' cm인 원의 넓이는 몇 cm²일까요? (원주율: 3.14)',
            fig: giveD
              ? { type: 'circle', d: d + ' cm', showCenter: true, showDiameter: true }
              : { type: 'circle', r: r + ' cm', showCenter: true, showRadius: true },
            answer: A,
            wrong: wrong,
            explain: (giveD ? '반지름은 $' + d + '\\div2=' + r + '$ (cm)예요. ' : '') + '(원의 넓이)=(반지름)×(반지름)×(원주율)이므로 $' + r + '\\times' + r + '\\times3.14=' + A + '$ (cm²)예요.',
          };
        },
      },
      {
        id: 'composite-area',
        level: 2,
        title: '여러 가지 원 모양 도형의 넓이',
        make: function (R) {
          var pi = R.F(314, 100);
          var kind = R.pick(['semi', 'quarter', 'ring', 'square']);
          var q, fig, ans, wrong = [], explain, hint;
          if (kind === 'semi') {
            var r = R.int(2, 15), d = 2 * r;
            var full = pi.mul(r * r);
            ans = full.div(2).toDecimal();
            q = '지름이 ' + d + ' cm인 반원의 넓이는 몇 cm²일까요? (원주율: 3.14)';
            fig = { type: 'svg', alt: '지름이 ' + d + ' cm인 반원', svg: semiSvg(d + ' cm') };
            wrong.push({ a: full.toDecimal(), why: '원 전체의 넓이를 구했어요. 반원은 원의 넓이를 2로 나누어요.' });
            wrong.push({ a: pi.mul(d * d).div(2).toDecimal(), why: '지름을 두 번 곱했어요. 반지름 ' + r + ' cm를 두 번 곱해요.' });
            hint = '반원은 원의 반이에요. 반지름부터 구해요.';
            explain = '반지름은 ' + r + ' cm이므로 원의 넓이는 $' + r + '\\times' + r + '\\times3.14=' + full.toDecimal() + '$ (cm²)이고, 반원은 $' + full.toDecimal() + '\\div2=' + ans + '$ (cm²)예요.';
          } else if (kind === 'quarter') {
            var rq = 2 * R.int(1, 10);
            var fq = pi.mul(rq * rq);
            ans = fq.div(4).toDecimal();
            q = '반지름이 ' + rq + ' cm인 원을 똑같이 4로 나눈 것 가운데 하나(원의 $\\frac{1}{4}$)의 넓이는 몇 cm²일까요? (원주율: 3.14)';
            fig = { type: 'svg', alt: '반지름이 ' + rq + ' cm인 원의 4분의 1 모양', svg: quarterSvg(rq + ' cm') };
            wrong.push({ a: fq.toDecimal(), why: '원 전체의 넓이를 구했어요. 4로 나누어요.' });
            wrong.push({ a: fq.div(2).toDecimal(), why: '반원의 넓이를 구했어요. 원의 $\\frac{1}{4}$은 원의 넓이를 4로 나누어요.' });
            hint = '원 전체의 넓이를 구한 다음 4로 나누어요.';
            explain = '원의 넓이는 $' + rq + '\\times' + rq + '\\times3.14=' + fq.toDecimal() + '$ (cm²)이므로 그 $\\frac{1}{4}$은 $' + fq.toDecimal() + '\\div4=' + ans + '$ (cm²)예요.';
          } else if (kind === 'ring') {
            var Rb = R.int(4, 12), rs = R.int(2, Rb - 1);
            var big = pi.mul(Rb * Rb), small = pi.mul(rs * rs);
            ans = big.sub(small).toDecimal();
            q = '큰 원의 반지름이 ' + Rb + ' cm, 작은 원의 반지름이 ' + rs + ' cm인 고리 모양에서 색칠한 부분의 넓이는 몇 cm²일까요? (원주율: 3.14)';
            fig = { type: 'svg', alt: '큰 원의 반지름이 ' + Rb + ' cm, 작은 원의 반지름이 ' + rs + ' cm인 고리 모양', svg: ringSvg(Rb, rs, Rb + ' cm', rs + ' cm') };
            var diffR = Rb - rs;
            var w1 = pi.mul(diffR * diffR).toDecimal();
            if (w1 !== ans) wrong.push({ a: w1, why: '반지름의 차 ' + diffR + ' cm로 원의 넓이를 구했어요. 큰 원의 넓이에서 작은 원의 넓이를 빼요.' });
            wrong.push({ a: big.toDecimal(), why: '큰 원의 넓이만 구했어요. 가운데 작은 원의 넓이를 빼요.' });
            hint = '큰 원의 넓이에서 작은 원의 넓이를 빼요.';
            explain = '큰 원은 $' + Rb + '\\times' + Rb + '\\times3.14=' + big.toDecimal() + '$ (cm²), 작은 원은 $' + rs + '\\times' + rs + '\\times3.14=' + small.toDecimal() + '$ (cm²)이므로 색칠한 부분은 $' + big.toDecimal() + '-' + small.toDecimal() + '=' + ans + '$ (cm²)예요.';
          } else {
            var a = 2 * R.int(2, 10), rc = a / 2;
            var sq = a * a, circle = pi.mul(rc * rc);
            ans = R.F(sq).sub(circle).toDecimal();
            q = '한 변이 ' + a + ' cm인 정사각형 안에 꼭 맞는 원을 그렸어요. 정사각형에서 원을 뺀 색칠한 부분의 넓이는 몇 cm²일까요? (원주율: 3.14)';
            fig = { type: 'svg', alt: '한 변이 ' + a + ' cm인 정사각형 안에 꼭 맞는 원. 원 밖 네 귀퉁이가 색칠되어 있어요.', svg: squareCircleSvg(a + ' cm') };
            wrong.push({ a: circle.toDecimal(), why: '원의 넓이를 구했어요. 정사각형의 넓이에서 원의 넓이를 빼요.' });
            var w2 = R.F(sq).sub(pi.mul(a));      // 원의 넓이 대신 원주를 뺀 값 (a ≥ 4 이면 양수)
            if (w2.sign() > 0 && w2.toDecimal() !== ans) wrong.push({ a: w2.toDecimal(), why: '원의 넓이 대신 원주(지름×원주율)를 뺐어요. 원의 넓이는 (반지름)×(반지름)×(원주율)이에요.' });
            hint = '꼭 맞는 원의 지름은 정사각형의 한 변과 같아요.';
            explain = '원의 반지름은 $' + a + '\\div2=' + rc + '$ (cm)예요. 정사각형은 $' + a + '\\times' + a + '=' + sq + '$ (cm²), 원은 $' + rc + '\\times' + rc + '\\times3.14=' + circle.toDecimal() + '$ (cm²)이므로 색칠한 부분은 $' + sq + '-' + circle.toDecimal() + '=' + ans + '$ (cm²)예요.';
          }
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 5,
            q: q, fig: fig, answer: ans, hint: hint, wrong: wrong, explain: explain,
          };
        },
      },
    ],
  });
})();
