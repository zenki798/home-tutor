/* 4학년 수학 · 각도
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
(function () {
  var RAD = Math.PI / 180;
  function r1(x) { return Math.round(x * 10) / 10; }
  function r2(x) { return Math.round(x * 100) / 100; }

  // 각도기 그림: 각의 한 변을 밑금(0°)에 맞추고 다른 변이 deg 만큼 벌어진 모습.
  // baseRight 가 true 면 오른쪽 변이 0°(안쪽 눈금이 0부터), false 면 왼쪽 변이 0°(바깥쪽 눈금이 0부터).
  function protractor(deg, baseRight) {
    var cx = 160, cy = 160, R = 135, ticks = '', labels = '';
    function px(t, r) { return r1(cx + r * Math.cos(t * RAD)); }
    function py(t, r) { return r1(cy - r * Math.sin(t * RAD)); }
    for (var t = 0; t <= 180; t++) {
      var len = t % 10 === 0 ? 13 : t % 5 === 0 ? 8 : 4;
      ticks += 'M' + px(t, R) + ' ' + py(t, R) + 'L' + px(t, R - len) + ' ' + py(t, R - len);
      if (t % 10 === 0) {
        // 바깥쪽 눈금: 왼쪽이 0, 안쪽 눈금: 오른쪽이 0
        labels += '<text x="' + px(t, R - 22) + '" y="' + r1(py(t, R - 22) + 3.5) + '" font-size="10" text-anchor="middle" fill="currentColor">' + (180 - t) + '</text>';
        labels += '<text x="' + px(t, R - 40) + '" y="' + r1(py(t, R - 40) + 3) + '" font-size="8.5" text-anchor="middle" fill="var(--fig-1)">' + t + '</text>';
      }
    }
    var t0 = baseRight ? 0 : 180, t1 = baseRight ? deg : 180 - deg, L = 155;
    return {
      type: 'svg',
      alt: '각도기의 중심에 각의 꼭짓점을 맞추고 밑금에 한 변을 맞춘 그림. 다른 한 변이 가리키는 눈금을 읽는다.',
      svg: '<svg viewBox="0 0 320 175">' +
        '<path d="M' + (cx - R) + ' ' + cy + 'A' + R + ' ' + R + ' 0 0 1 ' + (cx + R) + ' ' + cy + 'Z" fill="var(--fig-1)" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/>' +
        '<path d="' + ticks + '" stroke="currentColor" stroke-width="0.8"/>' + labels +
        '<line x1="' + px(t0, 0) + '" y1="' + cy + '" x2="' + px(t0, L) + '" y2="' + py(t0, L) + '" stroke="var(--fig-4)" stroke-width="2.6" stroke-linecap="round"/>' +
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + px(t1, L) + '" y2="' + py(t1, L) + '" stroke="var(--fig-4)" stroke-width="2.6" stroke-linecap="round"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="3.5" fill="currentColor"/></svg>',
    };
  }

  // 직선 위의 한 점에서 반직선을 그은 그림: 오른쪽 각 theta, 두 각에 글자를 붙인다.
  function lineRay(theta, rightLabel, leftLabel) {
    var cx = 150, cy = 120, L = 115, ar = 30, lr = 52;
    function px(t, r) { return r1(cx + r * Math.cos(t * RAD)); }
    function py(t, r) { return r1(cy - r * Math.sin(t * RAD)); }
    function arc(a, b) { return 'M' + px(a, ar) + ' ' + py(a, ar) + 'A' + ar + ' ' + ar + ' 0 0 0 ' + px(b, ar) + ' ' + py(b, ar); }
    function text(t, s) { return '<text x="' + px(t, lr) + '" y="' + r1(py(t, lr) + 5) + '" font-size="15" text-anchor="middle" fill="currentColor">' + s + '</text>'; }
    return {
      type: 'svg',
      alt: '직선 위의 한 점에서 반직선을 그어 생긴 두 각. 오른쪽 각은 ' + rightLabel + ', 왼쪽 각은 ' + leftLabel,
      svg: '<svg viewBox="0 0 300 140">' +
        '<line x1="15" y1="' + cy + '" x2="285" y2="' + cy + '" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + px(theta, L) + '" y2="' + py(theta, L) + '" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
        '<path d="' + arc(0, theta) + '" fill="none" stroke="var(--fig-4)" stroke-width="1.8"/>' +
        '<path d="' + arc(theta, 180) + '" fill="none" stroke="var(--fig-1)" stroke-width="1.8"/>' +
        text(theta / 2, rightLabel) + text((theta + 180) / 2, leftLabel) +
        '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="currentColor"/></svg>',
    };
  }

  // 두 각이 A, B 인 삼각형의 꼭짓점 (밑변 10, 왼쪽 아래 꼭짓점이 원점)
  function triPts(A, B) {
    var ac = 10 * Math.sin(B * RAD) / Math.sin((A + B) * RAD);
    return [[0, 0], [10, 0], [r2(ac * Math.cos(A * RAD)), r2(ac * Math.sin(A * RAD))]];
  }
  // 네 각이 A, B, C, (360-A-B-C) 인 사각형의 꼭짓점 (시계 반대 방향 A→B→C→D)
  function quadPts(A, B, C) {
    var dirs = [0, 180 - B, 360 - B - C, 180 + A].map(function (d) { return [Math.cos(d * RAD), Math.sin(d * RAD)]; });
    var tries = [8, 6, 10, 5, 12, 4, 14, 3];
    for (var i = 0; i < tries.length; i++) {
      var q = tries[i];
      var bx = -(10 * dirs[0][0] + q * dirs[1][0]), by = -(10 * dirs[0][1] + q * dirs[1][1]);
      var det = dirs[2][0] * dirs[3][1] - dirs[3][0] * dirs[2][1];
      if (Math.abs(det) < 1e-9) continue;
      var r = (bx * dirs[3][1] - dirs[3][0] * by) / det;
      var p = (dirs[2][0] * by - bx * dirs[2][1]) / det;
      if (r > 3 && p > 3) {
        var Cx = 10 + q * dirs[1][0], Cy = q * dirs[1][1];
        return [[0, 0], [10, 0], [r2(Cx), r2(Cy)], [r2(Cx + r * dirs[2][0]), r2(Cy + r * dirs[2][1])]];
      }
    }
    throw new Error('사각형을 그릴 수 없어요');
  }

  // 삼각형 ㄱㄴㄷ의 변 ㄱㄴ을 ㄴ 쪽으로 늘인 그림: ㄱ의 각 A, ㄴ의 바깥쪽 각(180-B), ㄷ의 각에 글자
  function extTri(A, B, labA, labOut, labC) {
    var P = triPts(A, B);
    var pts = P.concat([[14.5, 0]]);
    var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
    var mnx = Math.min.apply(null, xs), mxx = Math.max.apply(null, xs), mxy = Math.max.apply(null, ys);
    var sc = Math.min(250 / (mxx - mnx), 130 / mxy);
    function X(p) { return r1(25 + (p[0] - mnx) * sc); }
    function Y(p) { return r1(155 - p[1] * sc); }
    var a = P[0], b = P[1], c = P[2], e = pts[3];
    var dirC = Math.atan2(c[1] - b[1], c[0] - b[0]) / RAD;        // ㄴ에서 ㄷ 쪽 방향 (180-B)
    var dirCA = Math.atan2(a[1] - c[1], a[0] - c[0]) / RAD;       // ㄷ에서 ㄱ 쪽
    var dirCB = Math.atan2(b[1] - c[1], b[0] - c[0]) / RAD;       // ㄷ에서 ㄴ 쪽
    function arcAt(p, t1, t2, rr, color) {
      // 수학 방향(반시계) t1 → t2 의 호. 화면은 y 가 아래로 커지므로 sweep 0.
      return '<path d="M' + r1(X(p) + rr * Math.cos(t1 * RAD)) + ' ' + r1(Y(p) - rr * Math.sin(t1 * RAD)) + 'A' + rr + ' ' + rr + ' 0 0 0 ' +
        r1(X(p) + rr * Math.cos(t2 * RAD)) + ' ' + r1(Y(p) - rr * Math.sin(t2 * RAD)) + '" fill="none" stroke="' + color + '" stroke-width="1.8"/>';
    }
    function textAt(p, t, rr, s) {
      return '<text x="' + r1(X(p) + rr * Math.cos(t * RAD)) + '" y="' + r1(Y(p) - rr * Math.sin(t * RAD) + 5) + '" font-size="14" text-anchor="middle" fill="currentColor">' + s + '</text>';
    }
    function name(p, dx, dy, s) { return '<text x="' + r1(X(p) + dx) + '" y="' + r1(Y(p) + dy) + '" font-size="14" text-anchor="middle" fill="currentColor">' + s + '</text>'; }
    var cMid = (dirCA + dirCB) / 2;
    return {
      type: 'svg',
      alt: '삼각형 ㄱㄴㄷ에서 변 ㄱㄴ을 ㄴ 쪽으로 길게 늘인 그림. 각 ㄱ은 ' + labA + ', ㄴ의 바깥쪽 각은 ' + labOut + ', 각 ㄷ은 ' + labC,
      svg: '<svg viewBox="0 0 300 185">' +
        '<path d="M' + X(a) + ' ' + Y(a) + 'L' + X(b) + ' ' + Y(b) + 'L' + X(c) + ' ' + Y(c) + 'Z" fill="var(--fig-1)" fill-opacity="0.08" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<line x1="' + X(b) + '" y1="' + Y(b) + '" x2="' + X(e) + '" y2="' + Y(e) + '" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
        arcAt(a, 0, A, 24, 'var(--fig-4)') + textAt(a, A / 2, 42, labA) +
        arcAt(b, 0, dirC, 20, 'var(--fig-1)') + textAt(b, dirC / 2, 40, labOut) +
        arcAt(c, Math.min(dirCA, dirCB), Math.max(dirCA, dirCB), 20, 'var(--fig-3)') + textAt(c, cMid, 38, labC) +
        name(a, -10, 16, 'ㄱ') + name(b, 0, 18, 'ㄴ') + name(c, 0, -10, 'ㄷ') + '</svg>',
    };
  }

Tutor.registerUnit({
  id: 'math-e4-02',
  course: 'math-e4',
  title: '각도',
  summary: '각도의 단위 1도를 알고 각도기로 재고 어림하며, 삼각형과 사각형의 각의 크기의 합을 알아봐요.',
  goals: [
    '각의 크기를 비교하고, 각도기로 각도를 잴 수 있어요.',
    '예각과 둔각을 구별하고, 각도를 어림할 수 있어요.',
    '각도의 합과 차를 구할 수 있어요.',
    '삼각형의 세 각의 크기의 합이 180°, 사각형의 네 각의 크기의 합이 360°임을 알고 모르는 각을 구할 수 있어요.',
  ],
  standards: ['[4수03-02]', '[4수03-24]', '[4수03-25]'],

  concepts: [
    {
      title: '각의 크기 비교하기',
      body: '한 점에서 그은 두 반직선으로 이루어진 도형을 **각**이라고 해요(3학년에서 배웠어요). 각의 **크기**는 두 변이 **벌어진 정도**예요.\n\n> ⚠️ 각의 크기는 변의 길이와 상관이 없어요. 변을 길게 그려도 벌어진 정도가 같으면 크기가 같은 각이에요.\n\n두 각의 크기를 비교할 때는\n- 투명 종이에 한 각을 본떠서 다른 각에 꼭짓점과 한 변을 맞추어 겹쳐 보거나,\n- 작은 부채꼴 조각 같은 것이 각 안에 몇 번 들어가는지 세어 비교해요.\n\n두 변이 더 많이 벌어진 각이 더 큰 각이에요.',
      easy: '가위를 떠올려 보세요. 가윗날을 조금 벌리면 작은 각, 많이 벌리면 큰 각이에요.\n\n큰 가위든 작은 가위든 벌린 정도가 같으면 각의 크기도 같아요. 날의 길이(변의 길이)는 각의 크기와 상관없어요.',
      fig: { type: 'angle', deg: 50, label: '', alt: '두 변이 조금 벌어진 각' },
      check: {
        type: 'ox',
        q: '두 변을 길게 그린 각일수록 각의 크기가 커요.',
        answer: false,
        explain: '각의 크기는 두 변이 벌어진 정도예요. 변의 길이는 각의 크기와 상관이 없어요.',
      },
    },
    {
      title: '1도와 각도기로 각도 재기',
      body: '각의 크기를 **각도**라고 해요. 직각을 똑같이 90으로 나눈 것 하나를 **1도**라 하고 **1°**라고 써요. 그래서 **직각은 90°**예요.\n\n각도는 **각도기**로 재요.\n1. 각도기의 **중심**을 각의 꼭짓점에 맞춰요.\n2. 각도기의 **밑금**을 각의 한 변에 맞춰요.\n3. 다른 한 변이 가리키는 눈금을 읽어요.\n\n> ⚠️ 각도기에는 눈금이 안쪽과 바깥쪽에 두 줄 있어요. 밑금에 맞춘 변 쪽에서 **0부터 시작하는 눈금**을 따라 읽어요. 그림에서는 오른쪽 변이 밑금에 맞춰져 있고, 오른쪽에서 0부터 시작하는 것은 안쪽 눈금이에요. 그래서 이 각은 65°예요.',
      easy: '각도기는 각을 재는 "자"예요. 자로 길이를 잴 때 물건 끝을 0에 맞추듯이, 각도기도 한 변을 0에 맞춰요.\n\n그다음 다른 변까지 0, 10, 20, …으로 눈금을 따라가요. 각이 직각보다 작아 보이면 답도 90보다 작아야 해요. 이렇게 확인하면 눈금을 잘못 읽는 실수를 막을 수 있어요.',
      fig: protractor(65, true),
      check: {
        type: 'choice',
        q: '직각의 크기는 몇 도일까요?',
        choices: ['90°', '180°', '360°'],
        answer: 0,
        why: ['', '180°는 직각 두 개를 합한 크기예요. 일직선의 크기지요.', '360°는 한 바퀴의 크기예요. 직각 4개가 모여야 한 바퀴예요.'],
        explain: '직각을 똑같이 90으로 나눈 하나가 1°이므로 직각은 90°예요.',
      },
    },
    {
      title: '예각과 둔각',
      body: '각도에 따라 각을 이렇게 불러요.\n\n| 이름 | 크기 |\n|---|---|\n| **예각** | 0°보다 크고 직각(90°)보다 작은 각 |\n| **직각** | 90°인 각 |\n| **둔각** | 직각(90°)보다 크고 180°보다 작은 각 |\n\n예를 들어 40°인 각은 예각, 130°인 각은 둔각이에요. 직각과 비교해서 작으면 예각, 크면 둔각이에요.\n\n> 💡 예각의 "예"는 날카롭다, 둔각의 "둔"은 무디다는 뜻이에요. 예각은 뾰족하고 둔각은 뭉툭해 보여요.',
      easy: '공책의 모서리는 직각이에요. 공책 모서리를 각에 대어 보세요. 각이 모서리 안에 쏙 들어가면 예각, 모서리보다 더 벌어져 있으면 둔각이에요.',
      fig: { type: 'angle', deg: 130, alt: '크기가 130°인 둔각' },
      check: {
        type: 'choice',
        q: '크기가 120°인 각은 무엇일까요?',
        choices: ['예각', '직각', '둔각'],
        answer: 2,
        why: ['예각은 직각(90°)보다 작은 각이에요. 120°는 90°보다 커요.', '직각은 꼭 90°인 각이에요.', ''],
        explain: '120°는 직각(90°)보다 크고 180°보다 작으므로 둔각이에요.',
      },
    },
    {
      title: '각도 어림하기',
      body: '각도기 없이 각도를 대강 짐작하는 것을 **어림하기**라고 해요. 어림할 때는 잘 아는 각을 기준으로 삼아요.\n\n- 직각: 90°\n- 직각의 반쯤: 45°\n- 직각을 똑같이 셋으로 나눈 하나: 30°, 둘: 60°\n- 직각 두 개(일직선): 180°\n\n직각보다 조금 작으면 "약 80°", 직각의 반보다 조금 크면 "약 50°"처럼 어림해요.\n\n어림한 다음에는 각도기로 재어 확인해요. **어림한 각도와 잰 각도의 차가 작을수록 잘 어림한 것**이에요.',
      easy: '시계를 떠올려 보세요. 12와 3 사이가 직각(90°)이에요. 그 사이는 숫자 칸으로 3칸이니까 한 칸이 30°예요.\n\n두 변이 숫자 1칸만큼 벌어졌으면 약 30°, 2칸이면 약 60°라고 어림할 수 있어요.',
      check: {
        type: 'choice',
        q: '그림의 각도를 어림한 것으로 가장 알맞은 것은 무엇일까요?',
        fig: { type: 'angle', deg: 40, label: '', alt: '직각의 반쯤 벌어진 각' },
        choices: ['약 40°', '약 90°', '약 140°'],
        answer: 0,
        why: ['', '직각만큼 벌어지지 않았어요. 직각의 반쯤이에요.', '이 각은 직각보다 작은 예각이에요. 140°는 둔각이에요.'],
        explain: '두 변이 직각의 반(45°)쯤 벌어졌으므로 약 40°라고 어림하는 것이 알맞아요.',
      },
    },
    {
      title: '각도의 합과 차',
      body: '각도의 합과 차는 자연수의 덧셈, 뺄셈과 같은 방법으로 계산하고, 답에 **°**를 붙여요.\n\n40° + 75° = 115°\n\n150° − 65° = 85°\n\n두 각을 이어 붙이면 더 큰 각이 되니 합을 구하고, 큰 각에서 작은 각을 떼어 내면 차를 구해요.\n\n> 💡 일직선이 이루는 각은 직각 두 개만큼인 **180°**, 한 바퀴는 직각 네 개만큼인 **360°**예요. 그래서 그림처럼 직선 위에서 나란히 붙어 있는 두 각의 합은 180°예요. 한쪽이 65°이면 다른 쪽은 180° − 65° = 115°예요.',
      easy: '부채를 펼친다고 생각해 보세요. 40°만큼 펼친 부채를 75°만큼 더 펼치면 모두 115°가 펼쳐져요.\n\n각도의 덧셈은 "더 펼치기", 뺄셈은 "도로 접기"예요.',
      fig: lineRay(65, '65°', '115°'),
      check: {
        type: 'short', check: 'number', unit: '°',
        q: '75° + 40°는 몇 도일까요?',
        answer: '115',
        wrong: [{ a: '35', why: '빼기를 했어요. 문제는 두 각도의 합이에요.' }],
        explain: '자연수의 덧셈처럼 75 + 40 = 115이므로 75° + 40° = 115°예요.',
      },
    },
    {
      title: '삼각형과 사각형의 각의 크기의 합',
      body: '**삼각형의 세 각의 크기의 합은 180°**예요. 삼각형을 종이로 오려 세 각을 잘라 꼭짓점이 한 점에 모이게 이어 붙이면 일직선(180°)이 돼요. 모양과 크기가 달라도 모든 삼각형이 그래요.\n\n**사각형의 네 각의 크기의 합은 360°**예요. 사각형에 마주 보는 꼭짓점끼리 잇는 선을 하나 그으면 삼각형 2개로 나뉘니까 180° + 180° = 360°예요.\n\n그래서 모르는 한 각은 합에서 아는 각들을 빼서 구해요.\n- 삼각형: 두 각이 50°, 70°이면 나머지 각은 180° − 50° − 70° = 60°\n- 사각형: 세 각이 80°, 100°, 70°이면 나머지 각은 360° − 80° − 100° − 70° = 110°',
      easy: '삼각형 모양 종이의 세 귀퉁이를 찢어서 한곳에 모아 보세요. 세 조각이 딱 맞게 일직선을 만들어요. 일직선은 180°이니까 세 각을 더하면 180°예요.\n\n사각형은 삼각형 두 개로 자를 수 있으니 180°가 두 번, 곧 360°예요.',
      fig: { type: 'polygon', points: triPts(50, 70), angles: [{ at: 0, label: '50°' }, { at: 1, label: '70°' }, { at: 2, label: '60°' }], alt: '세 각이 50°, 70°, 60°인 삼각형' },
      check: {
        type: 'short', check: 'number', unit: '°',
        q: '삼각형의 두 각의 크기가 40°, 85°예요. 나머지 한 각의 크기는 몇 도일까요?',
        answer: '55',
        wrong: [
          { a: '125', why: '두 각의 합만 구했어요. 세 각의 합 180°에서 두 각을 빼요.' },
          { a: '235', why: '사각형의 네 각의 합 360°를 썼어요. 삼각형의 세 각의 합은 180°예요.' },
        ],
        explain: '삼각형의 세 각의 합은 180°예요. 180° − 40° − 85° = 55°예요.',
      },
    },
  ],

  examples: [
    {
      q: '각도기로 잰 그림을 보고 각도를 읽어 보세요.',
      fig: protractor(140, false),
      steps: [
        '각의 꼭짓점이 각도기의 중심에, 왼쪽 변이 밑금에 맞춰져 있어요.',
        '왼쪽 변에서 0부터 시작하는 눈금은 바깥쪽 눈금이에요. 바깥쪽 눈금을 따라 읽어요.',
        '다른 한 변이 바깥쪽 눈금 140을 가리켜요.',
        '확인: 이 각은 직각보다 크게 벌어진 둔각이니 90°보다 커야 해요. 안쪽 눈금 40을 읽으면 틀려요.',
      ],
      answer: '140°',
    },
    {
      q: '사각형에서 ?의 크기를 구해 보세요.',
      fig: { type: 'polygon', points: quadPts(85, 100, 75), angles: [{ at: 0, label: '85°' }, { at: 1, label: '100°' }, { at: 2, label: '75°' }, { at: 3, label: '?' }], alt: '세 각이 85°, 100°, 75°이고 한 각이 ?인 사각형' },
      steps: [
        '사각형의 네 각의 크기의 합은 360°예요.',
        '아는 세 각의 합: 85° + 100° + 75° = 260°',
        '모르는 각: 360° − 260° = 100°',
      ],
      answer: '100°',
    },
  ],

  terms: [
    { term: '각도', def: '각의 크기예요. 두 변이 벌어진 정도를 수로 나타낸 것이에요.' },
    { term: '1도', def: '직각을 똑같이 90으로 나눈 것 하나의 크기예요. 1°라고 써요.' },
    { term: '직각', def: '크기가 90°인 각이에요. 공책 모서리처럼 반듯한 각이에요.' },
    { term: '각도기', def: '각도를 재는 도구예요. 중심을 꼭짓점에, 밑금을 한 변에 맞추고 다른 변이 가리키는 눈금을 읽어요.' },
    { term: '예각', def: '0°보다 크고 직각(90°)보다 작은 각이에요. 예: 40°' },
    { term: '둔각', def: '직각(90°)보다 크고 180°보다 작은 각이에요. 예: 130°' },
    { term: '어림하기', def: '정확히 재지 않고 대강 짐작하는 것이에요. 예: 직각보다 조금 작으니 약 80°' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '각의 크기에 대한 설명으로 옳은 것은 무엇일까요?',
      choices: ['두 변이 많이 벌어질수록 각이 커요.', '변이 길수록 각이 커요.', '변을 굵게 그릴수록 각이 커요.', '꼭짓점이 위쪽에 있을수록 각이 커요.'],
      answer: 0,
      why: ['', '변의 길이는 각의 크기와 상관이 없어요. 벌어진 정도를 봐요.', '선의 굵기는 각의 크기와 상관이 없어요. 벌어진 정도를 봐요.', '각이 놓인 위치는 각의 크기와 상관이 없어요. 벌어진 정도를 봐요.'],
      explain: '각의 크기는 두 변이 벌어진 정도예요. 변의 길이, 선의 굵기, 놓인 위치와는 상관이 없어요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: '°', concept: 1,
      q: '각도기로 잰 그림을 보고 각도를 읽어 보세요. 몇 도일까요?',
      fig: protractor(55, true),
      answer: '55',
      wrong: [{ a: '125', why: '바깥쪽 눈금을 읽었어요. 오른쪽 변이 밑금에 맞춰져 있으니 오른쪽에서 0부터 시작하는 안쪽 눈금을 읽어요. 이 각은 예각이라 90°보다 작아야 해요.' }],
      explain: '오른쪽 변이 밑금에 맞춰져 있으니 오른쪽에서 0부터 시작하는 안쪽 눈금을 읽어요. 다른 한 변이 55를 가리키므로 55°예요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: '°', concept: 1,
      q: '각도기로 잰 그림을 보고 각도를 읽어 보세요. 몇 도일까요?',
      fig: protractor(115, false),
      answer: '115',
      wrong: [{ a: '65', why: '안쪽 눈금을 읽었어요. 왼쪽 변이 밑금에 맞춰져 있으니 왼쪽에서 0부터 시작하는 바깥쪽 눈금을 읽어요. 이 각은 둔각이라 90°보다 커야 해요.' }],
      explain: '왼쪽 변이 밑금에 맞춰져 있으니 왼쪽에서 0부터 시작하는 바깥쪽 눈금을 읽어요. 다른 한 변이 115를 가리키므로 115°예요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', fixed: true, concept: 2,
      q: '둔각은 어느 것일까요?',
      choices: ['35°', '90°', '125°', '180°'],
      answer: 2,
      why: ['35°는 직각보다 작은 예각이에요.', '90°는 직각이에요. 둔각은 직각보다 커야 해요.', '', '180°는 일직선이에요. 둔각은 180°보다 작아야 해요.'],
      explain: '둔각은 직각(90°)보다 크고 180°보다 작은 각이에요. 125°만 여기에 들어가요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '85°인 각은 예각이에요.',
      answer: true,
      explain: '85°는 0°보다 크고 직각(90°)보다 작으므로 예각이에요. 직각에 가깝지만 직각보다 작아요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: '°', concept: 4,
      q: '계산해 보세요.\n\n135° − 65°',
      answer: '70',
      wrong: [
        { a: '200', why: '더하기를 했어요. 문제는 두 각도의 차예요.' },
        { a: '130', why: '십의 자리에서 받아내림을 하지 않았어요. 13 − 6 = 7이므로 십의 자리 숫자는 7이에요.' },
      ],
      explain: '자연수의 뺄셈처럼 135 − 65 = 70이므로 135° − 65° = 70°예요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', unit: '°', concept: 4,
      q: '직선 위의 한 점에서 반직선을 그었어요. ?의 크기는 몇 도일까요?',
      fig: lineRay(65, '65°', '?'),
      answer: '115',
      wrong: [
        { a: '25', why: '직각(90°)에서 뺐어요. 일직선이 이루는 각은 180°예요.' },
        { a: '295', why: '한 바퀴(360°)에서 뺐어요. 일직선이 이루는 각은 180°예요.' },
      ],
      explain: '일직선이 이루는 각은 180°예요. ?는 180° − 65° = 115°예요.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '삼각형에서 ?의 크기는 몇 도일까요?',
      fig: { type: 'polygon', points: triPts(35, 85), angles: [{ at: 0, label: '35°' }, { at: 1, label: '85°' }, { at: 2, label: '?' }], alt: '두 각이 35°, 85°이고 한 각이 ?인 삼각형' },
      answer: '60',
      wrong: [
        { a: '120', why: '두 각의 합만 구했어요. 세 각의 합 180°에서 두 각을 빼요.' },
        { a: '240', why: '사각형의 네 각의 합 360°를 썼어요. 삼각형의 세 각의 합은 180°예요.' },
      ],
      explain: '삼각형의 세 각의 합은 180°예요. ? = 180° − 35° − 85° = 60°예요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '사각형에서 ?의 크기는 몇 도일까요?',
      fig: { type: 'polygon', points: quadPts(75, 110, 85), angles: [{ at: 0, label: '75°' }, { at: 1, label: '110°' }, { at: 2, label: '85°' }, { at: 3, label: '?' }], alt: '세 각이 75°, 110°, 85°이고 한 각이 ?인 사각형' },
      answer: '90',
      hint: '사각형의 네 각의 크기의 합은 360°예요.',
      wrong: [{ a: '270', why: '아는 세 각의 합만 구했어요. 360°에서 그 합을 빼요.' }],
      explain: '아는 세 각의 합은 75° + 110° + 85° = 270°예요. 사각형의 네 각의 합은 360°이므로 ? = 360° − 270° = 90°예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '실제 크기가 70°인 각을 네 사람이 어림했어요. 가장 잘 어림한 사람은 누구일까요?',
      choices: ['민수: 약 65°', '지아: 약 80°', '서준: 약 60°', '하윤: 약 76°'],
      answer: 0,
      why: ['', '지아는 70°와 10° 차이가 나요. 차가 더 작은 사람이 있어요.', '서준은 70°와 10° 차이가 나요. 차가 더 작은 사람이 있어요.', '하윤은 70°와 6° 차이가 나요. 5°만 차이 나는 사람이 있어요.'],
      hint: '어림한 각도와 실제 각도의 차를 각각 구해 보세요.',
      explain: '실제 각도와의 차를 구하면 민수 5°, 지아 10°, 서준 10°, 하윤 6°예요. 차가 가장 작은 민수가 가장 잘 어림했어요.',
    },
    {
      id: 'p11', level: 2, type: 'ox', concept: 5,
      q: '세 각의 크기가 50°, 60°, 80°인 삼각형이 있어요.',
      answer: false,
      explain: '50° + 60° + 80° = 190°예요. 삼각형의 세 각의 합은 언제나 180°이므로 이런 삼각형은 그릴 수 없어요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '사각형의 네 각 중 두 각은 직각이고, 다른 한 각은 115°예요. 나머지 한 각은 몇 도일까요?',
      answer: '65',
      hint: '직각은 90°예요. 네 각의 합 360°에서 아는 각을 모두 빼요.',
      wrong: [{ a: '155', why: '직각을 하나만 뺐어요. 직각이 두 개이니 90°를 두 번 빼요.' }],
      explain: '아는 세 각의 합은 90° + 90° + 115° = 295°예요. 나머지 한 각은 360° − 295° = 65°예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '°', concept: 4,
      q: '시계가 4시를 가리키고 있어요. 긴바늘과 짧은바늘이 이루는 작은 쪽의 각은 몇 도일까요?',
      fig: { type: 'clock', h: 4, m: 0, alt: '4시를 가리키는 시계' },
      answer: '120',
      hint: '12와 3 사이가 직각(90°)이에요. 숫자 한 칸은 몇 도일까요?',
      wrong: [
        { a: '240', why: '큰 쪽의 각을 구했어요. 작은 쪽의 각을 물었어요.' },
        { a: '4', why: '숫자 칸 수만 셌어요. 숫자 한 칸이 몇 도인지 먼저 구해요.' },
      ],
      explain: '12와 3 사이가 직각(90°)이고 숫자 3칸이므로, 숫자 한 칸은 30°예요(30° + 30° + 30° = 90°). 4시에는 긴바늘이 12, 짧은바늘이 4를 가리키니 4칸 벌어졌어요. 30° + 30° + 30° + 30° = 120°예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '두 삼각자의 각은 각각 30°, 60°, 90°와 45°, 45°, 90°예요. 두 삼각자의 각을 하나씩 골라 이어 붙여서 만들 수 **없는** 각도는 무엇일까요?',
      choices: ['75°', '105°', '135°', '100°'],
      answer: 3,
      why: ['30° + 45° = 75°로 만들 수 있어요.', '60° + 45° = 105°로 만들 수 있어요.', '90° + 45° = 135°로 만들 수 있어요.', ''],
      hint: '한 삼각자에서 30°, 60°, 90° 중 하나, 다른 삼각자에서 45°, 90° 중 하나를 골라 더해 보세요.',
      explain: '만들 수 있는 각도는 30° + 45° = 75°, 30° + 90° = 120°, 60° + 45° = 105°, 60° + 90° = 150°, 90° + 45° = 135°, 90° + 90° = 180°예요. 100°는 만들 수 없어요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '어떤 삼각형의 두 각은 크기가 서로 같고, 나머지 한 각은 40°예요. 크기가 같은 두 각 중 한 각은 몇 도일까요?',
      answer: '70',
      hint: '180°에서 40°를 빼면 같은 두 각의 합이에요.',
      wrong: [{ a: '140', why: '같은 두 각의 합을 구했어요. 한 각은 그 절반이에요.' }],
      explain: '세 각의 합은 180°이므로 같은 두 각의 합은 180° − 40° = 140°예요. 같은 수 두 개를 더해 140이 되려면 70 + 70 = 140이므로 한 각은 70°예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '삼각형 ㄱㄴㄷ의 변 ㄱㄴ을 ㄴ 쪽으로 길게 늘였어요. 각 ㄷ(?)의 크기는 몇 도일까요?',
      fig: extTri(55, 60, '55°', '120°', '?'),
      answer: '65',
      hint: '먼저 일직선이 180°인 것을 써서 삼각형 안쪽의 각 ㄴ을 구해요.',
      wrong: [
        { a: '5', why: '120°를 삼각형 안쪽 각처럼 썼어요. 120°는 바깥쪽 각이고, 안쪽 각 ㄴ은 180° − 120° = 60°예요.' },
        { a: '125', why: '각 ㄱ과 각 ㄴ의 합만 구했어요. 180°에서 그 합을 빼요.' },
      ],
      explain: '일직선은 180°이므로 삼각형 안쪽의 각 ㄴ은 180° − 120° = 60°예요. 삼각형의 세 각의 합은 180°이므로 각 ㄷ = 180° − 55° − 60° = 65°예요.',
    },
  ],

  deeper: [
    {
      title: '한 바퀴는 왜 360°일까?',
      body: '한 바퀴를 360으로 나눈 것을 1°로 정한 방법은 아주 오래전 메소포타미아 지역에서 쓰던 방법에서 왔다고 알려져 있어요.\n\n360은 2, 3, 4, 5, 6, 8, 9, 10, 12, …처럼 많은 수로 나누어떨어져요. 그래서 한 바퀴를 똑같이 나누기가 아주 편리해요. 한 바퀴를 4로 나누면 직각 90°, 12로 나누면 시계 숫자 한 칸 30°가 되지요.\n\n2학기에는 각의 크기로 삼각형을 나누어 **예각삼각형**, **둔각삼각형**을 배우고, 여러 가지 다각형의 각도 살펴봐요.',
    },
  ],

  faq: [
    {
      q: '각도기 눈금이 두 줄인데 어느 쪽을 읽어요?',
      a: '밑금에 맞춘 변 쪽에서 0부터 시작하는 눈금을 읽어요. 오른쪽 변을 0에 맞췄으면 오른쪽에서 0으로 시작하는 줄, 왼쪽 변을 맞췄으면 왼쪽에서 0으로 시작하는 줄이에요.\n\n읽은 다음에는 예각인지 둔각인지 눈으로 보고 확인해요. 예각인데 90보다 큰 수를 읽었다면 다른 줄을 읽은 거예요.',
    },
    {
      q: '큰 삼각형은 세 각의 합도 더 크지 않아요?',
      a: '아니에요. 삼각형이 크든 작든 세 각의 합은 언제나 180°예요. 삼각형을 크게 그려도 변이 길어질 뿐 각이 벌어진 정도는 그대로일 수 있어요. 각의 크기는 변의 길이와 상관이 없으니까요.',
    },
    {
      q: '각도를 어림할 때 정답이 하나예요?',
      a: '어림은 대강 짐작하는 것이라 정답이 딱 하나는 아니에요. 다만 실제 각도와의 차가 작을수록 잘 어림한 것이에요. 직각(90°), 직각의 반(45°) 같은 기준 각과 비교하면 더 가깝게 어림할 수 있어요.',
    },
  ],

  mistakes: [
    '각도기의 안쪽 눈금과 바깥쪽 눈금을 바꿔 읽는 실수 — 읽은 뒤에 예각인지 둔각인지 확인해요.',
    '변이 길게 그려진 각을 더 큰 각이라고 생각하는 실수 — 각의 크기는 벌어진 정도예요.',
    '삼각형에서 360°를 쓰거나 사각형에서 180°를 쓰는 실수 — 삼각형은 180°, 사각형은 360°예요.',
  ],

  gens: [
    {
      id: 'protractor-read',
      level: 1,
      title: '각도기로 잰 각도 읽기',
      make: function (R) {
        var deg = 5 * R.int(3, 33);
        if (deg === 90) deg = 5 * R.pick([4, 7, 22, 29]);
        var right = R.bool();
        var acute = deg < 90;
        return {
          type: 'short', check: 'number', unit: '°', concept: 1,
          q: '각도기로 잰 그림을 보고 각도를 읽어 보세요. 몇 도일까요?',
          fig: protractor(deg, right),
          answer: String(deg),
          wrong: [{ a: String(180 - deg), why: '다른 줄의 눈금을 읽었어요. 밑금에 맞춘 변 쪽에서 0부터 시작하는 눈금을 읽어요. 이 각은 ' + (acute ? '예각이라 90°보다 작아야' : '둔각이라 90°보다 커야') + ' 해요.' }],
          explain: (right ? '오른쪽 변이 밑금에 맞춰져 있으니 오른쪽에서 0부터 시작하는 안쪽 눈금' : '왼쪽 변이 밑금에 맞춰져 있으니 왼쪽에서 0부터 시작하는 바깥쪽 눈금') +
            '을 읽어요. 다른 한 변이 ' + deg + R.josa(deg, '을/를') + ' 가리키므로 ' + deg + '°예요. ' + (acute ? '예각이니 90°보다 작은 것이 맞아요.' : '둔각이니 90°보다 큰 것이 맞아요.'),
        };
      },
    },
    {
      id: 'angle-add-sub',
      level: 1,
      title: '각도의 합과 차',
      make: function (R) {
        var a = R.int(25, 170), b = R.int(15, 160);
        if (a === b) b = a - 10;
        if (R.bool()) {
          var s = a + b;
          return {
            type: 'short', check: 'number', unit: '°', concept: 4,
            q: '계산해 보세요.\n\n' + a + '° + ' + b + '°',
            answer: String(s),
            wrong: [{ a: String(Math.abs(a - b)), why: '빼기를 했어요. 문제는 두 각도의 합이에요.' }],
            explain: '자연수의 덧셈처럼 ' + a + ' + ' + b + ' = ' + s + '이므로 답은 ' + s + '°예요.',
          };
        }
        var big = Math.max(a, b), small = Math.min(a, b), d = big - small;
        return {
          type: 'short', check: 'number', unit: '°', concept: 4,
          q: '계산해 보세요.\n\n' + big + '° − ' + small + '°',
          answer: String(d),
          wrong: [{ a: String(big + small), why: '더하기를 했어요. 문제는 두 각도의 차예요.' }],
          explain: '자연수의 뺄셈처럼 ' + big + ' − ' + small + ' = ' + d + '이므로 답은 ' + d + '°예요.',
        };
      },
    },
    {
      id: 'shape-angle-sum',
      level: 2,
      title: '삼각형·사각형에서 모르는 각 구하기',
      make: function (R) {
        var tri = R.bool(), vals, pts;
        if (tri) {
          var A = R.int(25, 100), B = R.int(25, 150 - A);
          vals = [A, B, 180 - A - B];
          pts = triPts(A, B);
        } else {
          for (var k = 0; k < 50 && !pts; k++) {
            var a = R.int(60, 125), b = R.int(60, 125), c = R.int(60, 125), d = 360 - a - b - c;
            if (d < 50 || d > 150) continue;
            try { pts = quadPts(a, b, c); vals = [a, b, c, d]; } catch (e) { pts = null; }
          }
          if (!pts) { vals = [90, 100, 80, 90]; pts = quadPts(90, 100, 80); }
        }
        var n = vals.length, u = R.int(0, n - 1), total = tri ? 180 : 360, known = [], ks = 0;
        for (var i = 0; i < n; i++) if (i !== u) { known.push(vals[i] + '°'); ks += vals[i]; }
        var ans = vals[u];
        var name = tri ? '삼각형' : '사각형';
        var wrong = [{ a: String(ks), why: '아는 각들의 합만 구했어요. ' + total + '°에서 그 합을 빼요.' }];
        if (tri) wrong.push({ a: String(360 - ks), why: '사각형의 네 각의 합 360°를 썼어요. 삼각형의 세 각의 합은 180°예요.' });
        else if (180 - ks > 0) wrong.push({ a: String(180 - ks), why: '삼각형의 세 각의 합 180°를 썼어요. 사각형의 네 각의 합은 360°예요.' });
        return {
          type: 'short', check: 'number', unit: '°', concept: 5,
          q: name + '에서 ?의 크기는 몇 도일까요?',
          fig: {
            type: 'polygon', points: pts,
            angles: vals.map(function (v, j) { return { at: j, label: j === u ? '?' : v + '°' }; }),
            alt: name + '의 각 ' + known.join(', ') + '와 모르는 각 ?',
          },
          answer: String(ans),
          wrong: wrong,
          hint: name + '의 ' + (tri ? '세' : '네') + ' 각의 크기의 합은 ' + total + '°예요.',
          explain: name + '의 ' + (tri ? '세' : '네') + ' 각의 크기의 합은 ' + total + '°예요. 아는 각의 합은 ' + known.join(' + ') + ' = ' + ks + '°이므로 ? = ' + total + '° − ' + ks + '° = ' + ans + '°예요.',
        };
      },
    },
    {
      id: 'outside-angle',
      level: 3,
      title: '일직선과 삼각형의 각을 함께 써서 각 구하기',
      make: function (R) {
        var A = R.int(30, 75), B = R.int(40, Math.min(80, 150 - A));
        var C = 180 - A - B, ext = 180 - B;
        var wrong = [{ a: String(A + B), why: '각 ㄱ과 각 ㄴ의 합만 구했어요. 180°에서 그 합을 빼요.' }];
        if (180 - A - ext > 0 && 180 - A - ext !== C) wrong.push({ a: String(180 - A - ext), why: ext + '°를 삼각형 안쪽 각처럼 썼어요. ' + ext + '°는 바깥쪽 각이고, 안쪽 각 ㄴ은 180° − ' + ext + '° = ' + B + '°예요.' });
        return {
          type: 'short', check: 'number', unit: '°', concept: 5,
          q: '삼각형 ㄱㄴㄷ의 변 ㄱㄴ을 ㄴ 쪽으로 길게 늘였어요. 각 ㄷ(?)의 크기는 몇 도일까요?',
          fig: extTri(A, B, A + '°', ext + '°', '?'),
          answer: String(C),
          wrong: wrong,
          hint: '먼저 일직선이 180°인 것을 써서 삼각형 안쪽의 각 ㄴ을 구해요.',
          explain: '일직선은 180°이므로 삼각형 안쪽의 각 ㄴ은 180° − ' + ext + '° = ' + B + '°예요. 삼각형의 세 각의 합은 180°이므로 각 ㄷ = 180° − ' + A + '° − ' + B + '° = ' + C + '°예요.',
        };
      },
    },
  ],
});
})();
