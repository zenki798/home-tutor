/* 중2 수학 · 평행선과 선분의 길이의 비
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 아래 도우미(draw)가 직접 그린 svg (색은 currentColor·var(--fig-n)). 그림은 실제 길이의 비에 맞춰 그렸다(생성기는 대강) */
(function () {
  // ---------- 그림 도우미 (화면 좌표: y 아래쪽) ----------
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function txt(x, y, s, size, color) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 14) + '" text-anchor="middle" dominant-baseline="central" fill="' + (color || 'currentColor') + '">' + s + '</text>';
  }
  function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
  // P: { 이름: [x, y] }, lines: [[이름1, 이름2, 'dash'|'thin'|'blue'?]], labs: [[이름, dx, dy, 글?]], texts: [[x, y, 글]], dots: [이름…]
  function draw(P, lines, labs, alt, texts, dots) {
    var out = '', xs = [], ys = [];
    lines.forEach(function (l) {
      var a = P[l[0]], b = P[l[1]], k = l[2];
      out += '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" stroke="' + (k === 'blue' ? 'var(--fig-1, #2563eb)' : 'currentColor') + '" stroke-width="' + (k === 'dash' || k === 'thin' ? 1.5 : 2) + '"' +
        (k === 'dash' ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>';
      xs.push(a[0], b[0]); ys.push(a[1], b[1]);
    });
    (dots || []).forEach(function (n) { var p = P[n]; out += '<circle cx="' + r1(p[0]) + '" cy="' + r1(p[1]) + '" r="2.6" fill="currentColor"/>'; });
    (labs || []).forEach(function (l) {
      var p = P[l[0]], x = p[0] + l[1], y = p[1] + l[2];
      out += txt(x, y, l[3] || l[0]); xs.push(x - 7, x + 7); ys.push(y - 9, y + 9);
    });
    (texts || []).forEach(function (t) {
      var w = String(t[2]).length * 3.8;
      out += txt(t[0], t[1], t[2], 13, t[3]); xs.push(t[0] - w, t[0] + w); ys.push(t[1] - 9, t[1] + 9);
    });
    var x0 = Math.min.apply(null, xs) - 6, x1 = Math.max.apply(null, xs) + 6, y0 = Math.min.apply(null, ys) - 4, y1 = Math.max.apply(null, ys) + 4;
    return {
      type: 'svg', alt: alt,
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + r1(x0) + ' ' + r1(y0) + ' ' + r1(x1 - x0) + ' ' + r1(y1 - y0) + '">' + out + '</svg>',
    };
  }
  function mid(a, b) { return lerp(a, b, 0.5); }
  function offs(a, b, d) { // 선분 ab 의 가운데에서 (오른쪽·아래가 아닌) 바깥쪽으로 d 만큼
    var m = mid(a, b), dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1;
    return [m[0] - dy / l * d, m[1] + dx / l * d];
  }

  // 삼각형 ABC 와 DE∥BC (t = AD/AB). 글: [AD, DB, AE, EC, DE, BC] (null 이면 안 씀)
  function triPar(t, L, alt, nm) {
    nm = nm || ['D', 'E'];
    var A = [150, 10], B = [40, 200], C = [280, 200];
    var P = { A: A, B: B, C: C, D: lerp(A, B, t), E: lerp(A, C, t) };
    var texts = [];
    function side(a, b, s, d) { if (s !== null && s !== undefined) { var o = offs(a, b, d); texts.push([o[0], o[1], String(s)]); } }
    side(P.A, P.D, L[0], 14); side(P.D, P.B, L[1], 14); side(P.A, P.E, L[2], -14); side(P.E, P.C, L[3], -14);
    if (L[4] !== null && L[4] !== undefined) texts.push([(P.D[0] + P.E[0]) / 2, P.D[1] - 10, String(L[4])]);
    if (L[5] !== null && L[5] !== undefined) texts.push([(B[0] + C[0]) / 2, 216, String(L[5])]);
    return draw(P, [['A', 'B'], ['B', 'C'], ['C', 'A'], ['D', 'E', 'blue']],
      [['A', 0, -10], ['B', -10, 6], ['C', 10, 6], ['D', -14, 0, nm[0]], ['E', 14, 0, nm[1]]], alt, texts);
  }

  // 세 평행선 l, m, n 과 두 직선. g1 = l~m 간격, g2 = m~n 간격 (화면 px). 글: [a, b, a', b']
  function parLines(g1, g2, L, alt) {
    var y0 = 10, y1 = y0 + g1, y2 = y1 + g2;
    var P = {
      l0: [0, y0], l1: [300, y0], m0: [0, y1], m1: [300, y1], n0: [0, y2], n1: [300, y2],
      A: [60, y0], B: [60 + (y1 - y0) * 0.25, y1], C: [60 + (y2 - y0) * 0.25, y2],
      D: [180, y0], E: [180 + (y1 - y0) * 0.55, y1], F: [180 + (y2 - y0) * 0.55, y2],
    };
    var texts = [];
    if (L[0] !== null) texts.push([(P.A[0] + P.B[0]) / 2 - 14, (y0 + y1) / 2, String(L[0])]);
    if (L[1] !== null) texts.push([(P.B[0] + P.C[0]) / 2 - 14, (y1 + y2) / 2, String(L[1])]);
    if (L[2] !== null) texts.push([(P.D[0] + P.E[0]) / 2 + 16, (y0 + y1) / 2, String(L[2])]);
    if (L[3] !== null) texts.push([(P.E[0] + P.F[0]) / 2 + 16, (y1 + y2) / 2, String(L[3])]);
    return draw(P, [['l0', 'l1', 'thin'], ['m0', 'm1', 'thin'], ['n0', 'n1', 'thin'], ['A', 'C'], ['D', 'F']],
      [['l1', 12, 0, 'l'], ['m1', 12, 0, 'm'], ['n1', 12, 0, 'n'], ['A', -8, -9], ['B', -10, -9], ['C', -10, 9], ['D', 8, -9], ['E', 12, -9], ['F', 12, 9]],
      alt, texts, ['A', 'B', 'C', 'D', 'E', 'F']);
  }

  // 사다리꼴 ABCD (AD∥BC) 와 EF∥BC (t = AE/AB). 글: [AD, BC, AE, EB, EF], diag: 대각선 AC 점선
  function trap(t, L, alt, diag) {
    var A = [80, 10], D = [200, 10], B = [20, 170], C = [300, 170];
    var P = { A: A, B: B, C: C, D: D, E: lerp(A, B, t), F: lerp(D, C, t) };
    var lines = [['A', 'D'], ['D', 'C'], ['C', 'B'], ['B', 'A'], ['E', 'F', 'blue']];
    var labs = [['A', -6, -10], ['D', 6, -10], ['B', -10, 6], ['C', 10, 6], ['E', -14, 0], ['F', 14, 0]];
    if (diag) {
      P.G = lerp(A, C, t); lines.push(['A', 'C', 'dash']); labs.push(['G', 2, -11]);
    }
    var texts = [];
    if (L[0] !== null) texts.push([140, -2, String(L[0])]);
    if (L[1] !== null) texts.push([160, 184, String(L[1])]);
    if (L[2] !== null) { var o = offs(P.A, P.E, 14); texts.push([o[0], o[1], String(L[2])]); }
    if (L[3] !== null) { var o2 = offs(P.E, P.B, 14); texts.push([o2[0], o2[1], String(L[3])]); }
    if (L[4] !== null) texts.push([(P.E[0] + P.F[0]) / 2 + (diag ? 40 : 0), P.E[1] + 11, String(L[4])]);
    return draw(P, lines, labs, alt, texts);
  }

  // 무게중심: 삼각형 ABC 와 세 중선
  function centroidFig(alt, texts, only) {
    var A = [120, 10], B = [20, 190], C = [280, 190];
    var P = { A: A, B: B, C: C, D: mid(B, C), E: mid(C, A), F: mid(A, B) };
    P.G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    var lines = [['A', 'B'], ['B', 'C'], ['C', 'A'], ['A', 'D', 'blue']];
    var labs = [['A', 0, -10], ['B', -10, 6], ['C', 10, 6], ['D', 0, 13], ['G', 12, 4]];
    if (!only) { lines.push(['B', 'E', 'thin'], ['C', 'F', 'thin']); labs.push(['E', 11, -6], ['F', -11, -6]); }
    return draw(P, lines, labs, alt, texts || [], ['G']);
  }

  function wrongs(ans, list) {
    var seen = [Number(ans)], out = [];
    list.forEach(function (w) {
      var sv = String(w[0]).split('/'), v = sv.length === 2 ? Number(sv[0]) / Number(sv[1]) : Number(w[0]);
      if (!isFinite(v) || seen.some(function (s) { return Math.abs(s - v) < 1e-9; })) return;
      seen.push(v);
      out.push({ a: String(w[0]), why: w[1] });
    });
    return out;
  }
  function frs(n, d) {
    var a = Math.abs(n), b = Math.abs(d); while (b) { var t = a % b; a = b; b = t; }
    return (d / a === 1) ? String(n / a) : (n / a) + '/' + (d / a);
  }

  Tutor.registerUnit({
    id: 'math-m2-10',
    course: 'math-m2',
    title: '평행선과 선분의 길이의 비',
    summary: '삼각형과 평행선에서 선분의 길이의 비를 구하고, 중점을 연결한 선분과 삼각형의 무게중심의 성질을 알아봐요.',
    goals: [
      '삼각형에서 평행선과 선분의 길이의 비를 이용해 길이를 구하고, 두 선분이 평행한지 판단할 수 있어요.',
      '삼각형의 두 변의 중점을 연결한 선분의 성질을 알고 이용할 수 있어요.',
      '평행선 사이의 선분의 길이의 비를 이용해 사다리꼴에서 선분의 길이를 구할 수 있어요.',
      '삼각형의 무게중심이 중선을 2:1로 나눈다는 것을 알고 길이와 넓이를 구할 수 있어요.',
    ],
    standards: ['[9수03-14]'],

    concepts: [
      {
        title: '삼각형에서 평행선과 선분의 길이의 비',
        body: '삼각형 ABC에서 변 AB, AC 위에 각각 점 D, E가 있고 $\\overline{BC} \\parallel \\overline{DE}$이면\n\n' +
          '1. $\\overline{AD}:\\overline{AB}=\\overline{AE}:\\overline{AC}=\\overline{DE}:\\overline{BC}$\n' +
          '2. $\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$\n\n' +
          '**왜 그럴까요?** $\\overline{BC} \\parallel \\overline{DE}$이면 동위각의 크기가 같아서 $\\angle ADE=\\angle ABC$, $\\angle AED=\\angle ACB$예요. 그래서 $\\triangle ADE ∽ \\triangle ABC$ (AA 닮음)이고 1번이 나와요.\n\n' +
          '2번은 1번에서 나와요. 예를 들어 $\\overline{AD}:\\overline{AB}=1:3$이면 $\\overline{AD}:\\overline{DB}=1:2$이고, 같은 비율로 $\\overline{AE}:\\overline{EC}=1:2$예요.\n\n' +
          '점 D, E가 변 BA, CA의 **연장선** 위에 있어도(꼭짓점 A 너머에 있어도) $\\overline{BC} \\parallel \\overline{DE}$이면 1번과 2번이 그대로 성립해요.\n\n' +
          '> ⚠️ $\\overline{DE}:\\overline{BC}$는 $\\overline{AD}:\\overline{AB}$와 같아요. $\\overline{AD}:\\overline{DB}$와 같지 **않아요**.',
        easy: '삼각형 모양의 텐트를 떠올려 보세요. 바닥과 나란하게(평행하게) 빨랫줄을 걸었어요. 꼭대기에서 빨랫줄까지가 텐트 옆면 길이의 $\\frac{1}{3}$이라면, 빨랫줄의 길이도 바닥 폭의 $\\frac{1}{3}$이에요. 위쪽의 작은 삼각형이 전체 삼각형을 그대로 줄인 모양이니까요.\n\n' +
          '그리고 왼쪽 옆면이 1 : 2로 나뉘면 오른쪽 옆면도 똑같이 1 : 2로 나뉘어요.',
        fig: triPar(0.4, [null, null, null, null, null, null], '삼각형 ABC 와 변 BC 에 평행한 선분 DE'),
        check: {
          type: 'short', check: 'number',
          q: '삼각형 ABC에서 $\\overline{BC} \\parallel \\overline{DE}$이고 $\\overline{AD}=3$, $\\overline{DB}=6$, $\\overline{AE}=4$예요. $\\overline{EC}$의 길이는 얼마일까요?',
          answer: '8',
          wrong: [
            { a: '2', why: '비를 거꾸로 맞추었어요. $\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$이므로 $3:6=4:\\overline{EC}$예요.' },
            { a: '7', why: '차(3)를 더했어요. 길이의 차가 아니라 비가 같아요.' },
          ],
          explain: '$\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$이므로 $3:6=4:\\overline{EC}$, $3\\times\\overline{EC}=24$에서 $\\overline{EC}=8$이에요.',
        },
      },
      {
        title: '두 선분이 평행한지 판단하기',
        body: '앞의 성질을 거꾸로 쓸 수도 있어요. 삼각형 ABC에서 변 AB, AC 위의 점 D, E에 대하여\n\n' +
          '$\\overline{AD}:\\overline{AB}=\\overline{AE}:\\overline{AC}$ 또는 $\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$\n\n' +
          '이면 $\\overline{BC} \\parallel \\overline{DE}$예요.\n\n' +
          '**왜 그럴까요?** $\\angle A$가 공통이고 끼인 두 변의 비가 같으므로 $\\triangle ADE ∽ \\triangle ABC$ (SAS 닮음)예요. 그러면 $\\angle ADE=\\angle ABC$이고, 이 두 각은 동위각이므로 $\\overline{BC} \\parallel \\overline{DE}$예요.\n\n' +
          '예: $\\overline{AD}=2$, $\\overline{DB}=4$, $\\overline{AE}=3$, $\\overline{EC}=6$이면 $2:4=3:6=1:2$이므로 평행해요.\n\n' +
          '> ⚠️ $\\overline{AD}:\\overline{AB}=\\overline{DE}:\\overline{BC}$만으로는 평행하다고 말할 수 **없어요**. 끼인각이 아닌 각을 쓰는 셈이라 닮음이 보장되지 않아요.',
        easy: '양쪽 옆면을 **같은 비율**로 자르는 점끼리 이으면 바닥과 나란한 선이 돼요. 왼쪽을 위에서 $\\frac{1}{3}$ 지점에서 잘랐다면 오른쪽도 위에서 $\\frac{1}{3}$ 지점에서 잘라야 바닥과 평행해요.\n\n' +
          '한쪽은 $\\frac{1}{3}$, 다른 쪽은 $\\frac{1}{2}$ 지점이면 두 점을 이은 선은 비스듬히 기울어져요.',
        check: {
          type: 'ox',
          q: '삼각형 ABC에서 변 AB, AC 위의 점 D, E에 대하여 $\\overline{AD}=4$, $\\overline{DB}=2$, $\\overline{AE}=6$, $\\overline{EC}=3$이면 $\\overline{BC} \\parallel \\overline{DE}$예요.',
          answer: true,
          explain: '$\\overline{AD}:\\overline{DB}=4:2=2:1$, $\\overline{AE}:\\overline{EC}=6:3=2:1$로 비가 같으므로 $\\overline{BC} \\parallel \\overline{DE}$예요.',
        },
      },
      {
        title: '삼각형의 두 변의 중점을 연결한 선분',
        body: '삼각형 ABC에서 두 변 AB, AC의 중점을 각각 M, N이라고 하면\n\n' +
          '$\\overline{MN} \\parallel \\overline{BC}$, $\\quad\\overline{MN}=\\frac{1}{2}\\overline{BC}$\n\n' +
          '**왜 그럴까요?** $\\overline{AM}:\\overline{AB}=\\overline{AN}:\\overline{AC}=1:2$이므로, 앞에서 배운 대로 $\\overline{MN} \\parallel \\overline{BC}$이고 $\\overline{MN}:\\overline{BC}=1:2$예요.\n\n' +
          '거꾸로, 변 AB의 중점 M을 지나고 변 BC에 평행한 직선이 변 AC와 만나는 점을 N이라고 하면\n\n' +
          '$\\overline{AN}=\\overline{NC}$ (N은 AC의 중점), $\\quad\\overline{MN}=\\frac{1}{2}\\overline{BC}$\n\n' +
          '예: $\\overline{BC}=10$ cm이면 $\\overline{MN}=5$ cm예요.\n\n' +
          '> 💡 삼각형의 세 변의 중점을 이어 만든 삼각형의 둘레는 처음 삼각형의 둘레의 $\\frac{1}{2}$이에요. 각 변이 마주 보는 변의 $\\frac{1}{2}$이기 때문이에요.',
        easy: '삼각형 모양 산의 양쪽 비탈 한가운데에 깃발을 꽂고 줄로 이었다고 생각해 보세요. 그 줄은 땅(밑변)과 나란하고, 길이는 땅 폭의 딱 절반이에요.\n\n' +
          '산 꼭대기에서 보면 "절반 높이까지 내려온 작은 산"이 전체 산을 반으로 줄인 모양이라서 폭도 반이 되는 거예요.',
        fig: triPar(0.5, [null, null, null, null, null, null], '삼각형 ABC 에서 두 변 AB, AC 의 중점 M, N 을 이은 선분', ['M', 'N']),
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '삼각형 ABC에서 두 변 AB, AC의 중점을 각각 M, N이라고 해요. $\\overline{BC}=14$ cm일 때, $\\overline{MN}$의 길이는 몇 cm일까요?',
          answer: '7',
          wrong: [{ a: '28', why: '2배를 했어요. $\\overline{MN}$은 $\\overline{BC}$의 절반이에요.' }],
          explain: '두 변의 중점을 연결한 선분의 길이는 나머지 한 변의 $\\frac{1}{2}$이에요. $\\overline{MN}=\\frac{1}{2}\\times14=7$ (cm)예요.',
        },
      },
      {
        title: '평행선 사이의 선분의 길이의 비',
        body: '세 직선 $l$, $m$, $n$이 서로 평행하고, 두 직선이 이 평행선과 각각 점 A, B, C와 점 D, E, F에서 만나면\n\n' +
          '$\\overline{AB}:\\overline{BC}=\\overline{DE}:\\overline{EF}$\n\n' +
          '**왜 그럴까요?** 점 A를 지나고 직선 DF에 평행한 직선을 그어 직선 $m$, $n$과 만나는 점을 P, Q라고 해요. 그러면 사각형 APED와 PQFE는 평행사변형이라서 $\\overline{AP}=\\overline{DE}$, $\\overline{PQ}=\\overline{EF}$예요. 삼각형 ACQ에서 $\\overline{BP} \\parallel \\overline{CQ}$이므로 $\\overline{AB}:\\overline{BC}=\\overline{AP}:\\overline{PQ}=\\overline{DE}:\\overline{EF}$예요.\n\n' +
          '예: $\\overline{AB}=3$, $\\overline{BC}=5$, $\\overline{DE}=6$이면 $3:5=6:\\overline{EF}$에서 $\\overline{EF}=10$이에요.\n\n' +
          '> ⚠️ 두 직선이 비스듬한 정도가 달라서 $\\overline{AB}$와 $\\overline{DE}$의 길이는 다를 수 있어요. 같은 것은 **비**예요.',
        easy: '공책의 가로줄은 서로 평행하지요. 공책 위에 연필 두 자루를 비스듬히 올려놓아 보세요. 한 연필이 줄 칸을 2칸, 3칸으로 지나가면 다른 연필도 2칸, 3칸으로 지나가요. 연필마다 칸을 지나는 길이는 달라도, **칸 수의 비**는 같아요.',
        fig: parLines(60, 90, [null, null, null, null], '평행한 세 직선 l, m, n 과 두 직선이 만나는 점 A, B, C 와 D, E, F'),
        check: {
          type: 'short', check: 'number',
          q: '세 직선 $l$, $m$, $n$이 서로 평행하고 두 직선과 만나는 점이 각각 A, B, C와 D, E, F예요. $\\overline{AB}=3$, $\\overline{BC}=6$, $\\overline{DE}=4$일 때, $\\overline{EF}$의 길이는 얼마일까요?',
          answer: '8',
          wrong: [
            { a: '7', why: '$\\overline{AB}$와 $\\overline{BC}$의 차(3)를 더했어요. 같은 것은 차가 아니라 비예요.' },
            { a: '2', why: '비를 거꾸로 맞추었어요. $\\overline{AB}:\\overline{BC}=\\overline{DE}:\\overline{EF}$예요.' },
          ],
          explain: '$\\overline{AB}:\\overline{BC}=\\overline{DE}:\\overline{EF}$이므로 $3:6=4:\\overline{EF}$, $3\\times\\overline{EF}=24$에서 $\\overline{EF}=8$이에요.',
        },
      },
      {
        title: '사다리꼴에서 평행선과 선분의 길이',
        body: '$\\overline{AD} \\parallel \\overline{BC}$인 사다리꼴 ABCD에서, 변 AB, DC 위의 점 E, F에 대하여 $\\overline{EF} \\parallel \\overline{BC}$일 때 $\\overline{EF}$의 길이를 구해 봐요.\n\n' +
          '**대각선 AC를 그어** $\\overline{EF}$와 만나는 점을 G라고 하면, 사다리꼴이 삼각형 두 개로 나뉘어요.\n\n' +
          '예: $\\overline{AD}=6$, $\\overline{BC}=12$, $\\overline{AE}:\\overline{EB}=1:2$\n\n' +
          '- 삼각형 ABC에서 $\\overline{EG} \\parallel \\overline{BC}$이므로 $\\overline{EG}:\\overline{BC}=\\overline{AE}:\\overline{AB}=1:3$, 곧 $\\overline{EG}=4$\n' +
          '- 삼각형 CDA에서 $\\overline{GF} \\parallel \\overline{AD}$이므로 $\\overline{GF}:\\overline{AD}=\\overline{CF}:\\overline{CD}=2:3$, 곧 $\\overline{GF}=4$\n' +
          '- $\\overline{EF}=\\overline{EG}+\\overline{GF}=4+4=8$\n\n' +
          '여기서 $\\overline{CF}:\\overline{CD}=\\overline{BE}:\\overline{BA}=2:3$인 것은 평행선 사이의 선분의 길이의 비 때문이에요.\n\n' +
          '> 💡 E, F가 두 변의 **중점**이면 $\\overline{EF}=\\frac{1}{2}(\\overline{AD}+\\overline{BC})$예요. 윗변과 아랫변의 평균이지요.',
        easy: '사다리꼴은 모양이 애매해서 한 번에 계산하기 어려워요. 그래서 **대각선 하나로 잘라** 익숙한 삼각형 두 개로 만들어요.\n\n' +
          '위쪽 삼각형과 아래쪽 삼각형에서 각각 "평행선 → 비" 를 쓰고, 두 조각을 더하면 끝이에요.',
        fig: trap(1 / 3, ['6', '12', null, null, null], '사다리꼴 ABCD 에 변 BC 에 평행한 선분 EF 와 대각선 AC, 둘이 만나는 점 G. AD=6, BC=12', true),
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '$\\overline{AD} \\parallel \\overline{BC}$인 사다리꼴 ABCD에서 두 변 AB, DC의 중점을 각각 E, F라고 해요. $\\overline{AD}=6$ cm, $\\overline{BC}=10$ cm일 때, $\\overline{EF}$의 길이는 몇 cm일까요?',
          answer: '8',
          wrong: [
            { a: '16', why: '두 밑변을 더하기만 했어요. 중점을 이은 선분은 두 밑변의 평균이에요.' },
            { a: '5', why: '아랫변의 절반만 구했어요. 대각선으로 나눈 두 조각 $3$과 $5$를 더해요.' },
          ],
          explain: 'E, F가 두 변의 중점이므로 $\\overline{EF}=\\frac{1}{2}(6+10)=8$ (cm)예요. 대각선 AC를 그으면 $\\overline{EG}=\\frac{1}{2}\\times10=5$, $\\overline{GF}=\\frac{1}{2}\\times6=3$이라서 합이 8이 돼요.',
        },
      },
      {
        title: '삼각형의 중선과 무게중심',
        body: '삼각형의 한 꼭짓점과 마주 보는 변의 중점을 이은 선분을 **중선**이라고 해요. 중선은 삼각형의 넓이를 이등분해요(밑변의 길이와 높이가 같은 두 삼각형으로 나누므로).\n\n' +
          '삼각형의 세 중선은 한 점에서 만나요. 이 점을 **무게중심**이라 하고 보통 G로 나타내요. 무게중심은 **세 중선을 각 꼭짓점으로부터 각각 $2:1$로 나눠요.**\n\n' +
          '$\\overline{AG}:\\overline{GD}=\\overline{BG}:\\overline{GE}=\\overline{CG}:\\overline{GF}=2:1$\n\n' +
          '**왜 $2:1$일까요?** D, E가 변 BC, CA의 중점이므로 $\\overline{DE} \\parallel \\overline{AB}$, $\\overline{DE}=\\frac{1}{2}\\overline{AB}$예요. 엇각이 같아 $\\triangle GAB ∽ \\triangle GDE$ (AA 닮음)이고 닮음비가 $2:1$이므로 $\\overline{AG}:\\overline{GD}=2:1$이에요.\n\n' +
          '예: 중선 AD의 길이가 9 cm이면 $\\overline{AG}=6$ cm, $\\overline{GD}=3$ cm예요.\n\n' +
          '> 💡 세 중선은 삼각형을 넓이가 같은 삼각형 6개로 나눠요. 그래서 $\\triangle GAB$, $\\triangle GBC$, $\\triangle GCA$의 넓이는 각각 $\\triangle ABC$의 넓이의 $\\frac{1}{3}$이에요.',
        easy: '두꺼운 종이로 삼각형을 오려 연필 끝 위에 올려 보세요. 대부분의 점에서는 한쪽으로 기울어 떨어지지만, 딱 한 점에서는 균형을 잡고 버텨요. 그 점이 **무게중심**이에요.\n\n' +
          '무게중심은 각 꼭짓점에서 마주 보는 변의 한가운데까지 가는 길(중선)을 3등분했을 때, 꼭짓점에서 2칸 간 곳에 있어요.',
        fig: centroidFig('삼각형 ABC 의 세 중선 AD, BE, CF 와 무게중심 G'),
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '삼각형 ABC의 무게중심을 G, 중선을 AD라고 해요. $\\overline{AD}=12$ cm일 때, $\\overline{AG}$의 길이는 몇 cm일까요?',
          answer: '8',
          wrong: [
            { a: '6', why: '중선의 절반을 구했어요. 무게중심은 중선을 $1:1$이 아니라 $2:1$로 나눠요.' },
            { a: '4', why: '$\\overline{GD}$를 구했어요. 꼭짓점 A 쪽이 더 긴 2칸이에요.' },
          ],
          explain: '$\\overline{AG}:\\overline{GD}=2:1$이므로 $\\overline{AG}=12\\times\\frac{2}{3}=8$ (cm)예요.',
        },
      },
    ],

    examples: [
      {
        q: '삼각형 ABC에서 $\\overline{BC} \\parallel \\overline{DE}$이고 $\\overline{AD}=6$, $\\overline{DB}=3$, $\\overline{BC}=12$, $\\overline{AE}=4$예요. $\\overline{DE}$와 $\\overline{EC}$의 길이를 구하세요.',
        fig: triPar(2 / 3, ['6', '3', '4', null, null, '12'], '삼각형 ABC 에서 BC 에 평행한 선분 DE. AD=6, DB=3, AE=4, BC=12'),
        steps: [
          '$\\overline{AB}=6+3=9$예요. $\\overline{DE}$는 $\\overline{AD}:\\overline{AB}$의 비를 따라요.',
          '$\\overline{AD}:\\overline{AB}=\\overline{DE}:\\overline{BC}$이므로 $6:9=\\overline{DE}:12$, $9\\times\\overline{DE}=72$에서 $\\overline{DE}=8$이에요.',
          '$\\overline{EC}$는 $\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$로 구해요. $6:3=4:\\overline{EC}$, $6\\times\\overline{EC}=12$에서 $\\overline{EC}=2$예요.',
        ],
        answer: '$\\overline{DE}=8$, $\\overline{EC}=2$',
      },
      {
        q: '$\\overline{AD} \\parallel \\overline{EF} \\parallel \\overline{BC}$인 사다리꼴 ABCD에서 $\\overline{AD}=9$, $\\overline{BC}=15$, $\\overline{AE}:\\overline{EB}=1:2$예요. $\\overline{EF}$의 길이를 구하세요.',
        fig: trap(1 / 3, ['9', '15', null, null, null], '사다리꼴 ABCD 와 BC 에 평행한 선분 EF, 대각선 AC 와 EF 가 만나는 점 G', true),
        steps: [
          '대각선 AC를 긋고 $\\overline{EF}$와 만나는 점을 G라고 해요.',
          '삼각형 ABC에서 $\\overline{EG}:\\overline{BC}=\\overline{AE}:\\overline{AB}=1:3$이므로 $\\overline{EG}=15\\times\\frac{1}{3}=5$예요.',
          '삼각형 CDA에서 $\\overline{GF}:\\overline{AD}=\\overline{CF}:\\overline{CD}=2:3$이므로 $\\overline{GF}=9\\times\\frac{2}{3}=6$이에요.',
          '$\\overline{EF}=\\overline{EG}+\\overline{GF}=5+6=11$이에요.',
        ],
        answer: '$\\overline{EF}=11$',
      },
      {
        q: '삼각형 ABC의 무게중심을 G, 중선을 AD라고 해요. $\\overline{AD}=18$ cm이고 삼각형 ABC의 넓이가 30 cm²일 때, $\\overline{AG}$, $\\overline{GD}$의 길이와 삼각형 GAB의 넓이를 구하세요.',
        steps: [
          '무게중심은 중선을 꼭짓점으로부터 $2:1$로 나눠요. $\\overline{AG}=18\\times\\frac{2}{3}=12$ (cm), $\\overline{GD}=18\\times\\frac{1}{3}=6$ (cm)예요.',
          '세 중선은 삼각형을 넓이가 같은 6개의 삼각형으로 나누고, 삼각형 GAB는 그중 2개예요.',
          '그래서 삼각형 GAB의 넓이는 $30\\times\\frac{1}{3}=10$ (cm²)예요.',
        ],
        answer: '$\\overline{AG}=12$ cm, $\\overline{GD}=6$ cm, 넓이 10 cm²',
      },
    ],

    terms: [
      { term: '평행', def: '한 평면 위의 두 직선이 서로 만나지 않는 것이에요. 기호 $\\parallel$로 나타내요. 예: $\\overline{BC} \\parallel \\overline{DE}$' },
      { term: '중점', def: '선분을 길이가 같은 두 부분으로 나누는 점이에요.' },
      { term: '동위각', def: '두 직선이 다른 한 직선과 만날 때 같은 위치에 있는 각이에요. 두 직선이 평행하면 동위각의 크기가 같아요.' },
      { term: '엇각', def: '두 직선이 다른 한 직선과 만날 때 엇갈린 위치에 있는 각이에요. 두 직선이 평행하면 엇각의 크기가 같아요.' },
      { term: '사다리꼴', def: '한 쌍의 대변이 평행한 사각형이에요. 평행한 두 변을 윗변과 아랫변이라고 해요.' },
      { term: '중선', def: '삼각형의 한 꼭짓점과 그 대변의 중점을 이은 선분이에요. 중선은 삼각형의 넓이를 이등분해요.' },
      { term: '무게중심', def: '삼각형의 세 중선이 만나는 점이에요. 각 중선을 꼭짓점으로부터 $2:1$로 나눠요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 0,
        q: '삼각형 ABC에서 $\\overline{BC} \\parallel \\overline{DE}$이고 $\\overline{AD}=4$ cm, $\\overline{DB}=8$ cm, $\\overline{BC}=15$ cm예요. $\\overline{DE}$의 길이는 몇 cm일까요?',
        fig: triPar(1 / 3, ['4', '8', null, null, '?', '15'], '삼각형 ABC 에서 BC 에 평행한 선분 DE. AD=4, DB=8, BC=15'),
        answer: '5',
        wrong: [
          { a: '15/2', why: '$\\overline{AD}:\\overline{DB}$를 썼어요. $\\overline{DE}:\\overline{BC}$는 $\\overline{AD}:\\overline{AB}=4:12$와 같아요.' },
          { a: '45', why: '비를 거꾸로 맞추었어요. $\\overline{DE}$는 $\\overline{BC}$보다 짧아야 해요.' },
        ],
        explain: '$\\overline{AB}=4+8=12$이고 $\\overline{AD}:\\overline{AB}=\\overline{DE}:\\overline{BC}$이므로 $4:12=\\overline{DE}:15$예요. $12\\times\\overline{DE}=60$에서 $\\overline{DE}=5$ cm예요.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 0,
        q: '삼각형 ABC에서 $\\overline{BC} \\parallel \\overline{DE}$이고 $\\overline{AD}=6$ cm, $\\overline{DB}=4$ cm, $\\overline{AE}=9$ cm예요. $\\overline{EC}$의 길이는 몇 cm일까요?',
        fig: triPar(0.6, ['6', '4', '9', '?', null, null], '삼각형 ABC 에서 BC 에 평행한 선분 DE. AD=6, DB=4, AE=9'),
        answer: '6',
        wrong: [
          { a: '27/2', why: '비를 거꾸로 맞추었어요. $\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$, 곧 $6:4=9:\\overline{EC}$예요.' },
          { a: '7', why: '길이의 차(2 cm)를 뺐어요. 같은 것은 차가 아니라 비예요.' },
        ],
        explain: '$\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$이므로 $6:4=9:\\overline{EC}$, $6\\times\\overline{EC}=36$에서 $\\overline{EC}=6$ cm예요.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '삼각형 ABC에서 변 AB 위의 점 D에 대하여 $\\overline{AD}=3$, $\\overline{DB}=6$이에요. 변 AC 위의 점 E가 다음과 같을 때, $\\overline{BC} \\parallel \\overline{DE}$인 것은 무엇일까요?',
        choices: ['$\\overline{AE}=4$, $\\overline{EC}=8$', '$\\overline{AE}=4$, $\\overline{EC}=6$', '$\\overline{AE}=6$, $\\overline{EC}=3$', '$\\overline{AE}=5$, $\\overline{EC}=8$'],
        answer: 0,
        why: [
          '',
          '$\\overline{AE}:\\overline{EC}=4:6=2:3$이라서 $1:2$와 달라요.',
          '$6:3=2:1$로 순서가 거꾸로예요. $\\overline{AE}:\\overline{EC}$도 $1:2$여야 해요.',
          '차(3)가 같다고 평행한 것은 아니에요. $5:8$은 $1:2$가 아니에요.',
        ],
        explain: '$\\overline{AD}:\\overline{DB}=3:6=1:2$이므로 $\\overline{AE}:\\overline{EC}$도 $1:2$이면 평행해요. $4:8=1:2$인 첫째 보기가 답이에요.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '삼각형 ABC에서 두 변 AB, AC의 중점을 각각 M, N이라고 해요. $\\overline{BC}=18$ cm일 때, $\\overline{MN}$의 길이는 몇 cm일까요?',
        answer: '9',
        wrong: [{ a: '36', why: '2배를 했어요. 중점을 연결한 선분은 나머지 변의 절반이에요.' }],
        explain: '$\\overline{MN}=\\frac{1}{2}\\overline{BC}=\\frac{1}{2}\\times18=9$ (cm)예요.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 2,
        q: '삼각형 ABC에서 변 AB의 중점 M을 지나고 변 BC에 평행한 직선이 변 AC와 만나는 점을 N이라고 하면, N은 변 AC의 중점이에요.',
        answer: true,
        explain: '$\\overline{MN} \\parallel \\overline{BC}$이므로 $\\overline{AN}:\\overline{NC}=\\overline{AM}:\\overline{MB}=1:1$이에요. 그래서 N은 AC의 중점이고, $\\overline{MN}=\\frac{1}{2}\\overline{BC}$이기도 해요.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 3,
        q: '그림에서 세 직선 $l$, $m$, $n$은 서로 평행해요. $\\overline{AB}=4$, $\\overline{BC}=6$, $\\overline{DE}=6$일 때, $\\overline{EF}$의 길이는 얼마일까요?',
        fig: parLines(60, 90, ['4', '6', '6', '?'], '평행한 세 직선 l, m, n 과 두 직선. AB=4, BC=6, DE=6, EF 는 모름'),
        answer: '9',
        wrong: [
          { a: '8', why: '차(2)를 더했어요. 같은 것은 비예요.' },
          { a: '4', why: '비를 거꾸로 맞추었어요. $\\overline{AB}:\\overline{BC}=\\overline{DE}:\\overline{EF}$예요.' },
        ],
        explain: '$\\overline{AB}:\\overline{BC}=\\overline{DE}:\\overline{EF}$이므로 $4:6=6:\\overline{EF}$, $4\\times\\overline{EF}=36$에서 $\\overline{EF}=9$예요.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 5,
        q: '삼각형 ABC의 무게중심을 G, 중선을 AD라고 해요. $\\overline{AD}=15$ cm일 때, $\\overline{AG}$의 길이는 몇 cm일까요?',
        fig: centroidFig('삼각형 ABC 의 중선 AD 와 무게중심 G', null, true),
        answer: '10',
        wrong: [
          { a: '15/2', why: 'G를 중선의 중점으로 생각했어요. 무게중심은 중선을 $2:1$로 나눠요.' },
          { a: '5', why: '$\\overline{GD}$를 구했어요. 꼭짓점 쪽인 $\\overline{AG}$가 더 길어요.' },
        ],
        explain: '$\\overline{AG}:\\overline{GD}=2:1$이므로 $\\overline{AG}=15\\times\\frac{2}{3}=10$ (cm)예요.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '$\\overline{AD} \\parallel \\overline{EF} \\parallel \\overline{BC}$인 사다리꼴 ABCD에서 $\\overline{AD}=6$ cm, $\\overline{BC}=15$ cm, $\\overline{AE}:\\overline{EB}=1:2$예요. $\\overline{EF}$의 길이는 몇 cm일까요?',
        fig: trap(1 / 3, ['6', '15', null, null, '?'], '사다리꼴 ABCD 와 BC 에 평행한 선분 EF. AD=6, BC=15'),
        answer: '9',
        hint: '대각선 AC를 그어 사다리꼴을 삼각형 두 개로 나누어 보세요.',
        wrong: [
          { a: '21/2', why: 'E, F를 중점으로 생각해 두 밑변의 평균을 구했어요. $\\overline{AE}:\\overline{EB}=1:2$예요.' },
          { a: '12', why: '비를 거꾸로 썼어요. E는 A에 더 가까우므로 $\\overline{EF}$는 $\\overline{AD}$ 쪽에 가까운 값이에요.' },
          { a: '5', why: '대각선으로 나눈 한 조각 $\\overline{EG}$만 구했어요. $\\overline{GF}$도 더해요.' },
        ],
        explain: '대각선 AC와 $\\overline{EF}$가 만나는 점을 G라고 해요. 삼각형 ABC에서 $\\overline{EG}=15\\times\\frac{1}{3}=5$, 삼각형 CDA에서 $\\overline{GF}=6\\times\\frac{2}{3}=4$예요. 그래서 $\\overline{EF}=5+4=9$ (cm)예요.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '세 변의 길이가 6 cm, 8 cm, 10 cm인 삼각형이 있어요. 세 변의 중점을 이어 만든 삼각형의 둘레의 길이는 몇 cm일까요?',
        answer: '12',
        wrong: [
          { a: '24', why: '처음 삼각형의 둘레를 구했어요. 중점을 이은 삼각형의 각 변은 마주 보는 변의 절반이에요.' },
          { a: '6', why: '둘레의 $\\frac{1}{4}$을 구했어요. 각 변이 절반이므로 둘레도 절반이에요.' },
        ],
        explain: '중점을 이은 삼각형의 세 변은 각각 $3$ cm, $4$ cm, $5$ cm예요(마주 보는 변의 절반). 둘레는 $3+4+5=12$ (cm), 곧 처음 둘레 24 cm의 절반이에요.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 5,
        q: '삼각형 ABC의 넓이는 36 cm²예요. 무게중심을 G, 변 BC의 중점을 D라고 할 때, 삼각형 GBD의 넓이는 몇 cm²일까요?',
        fig: centroidFig('삼각형 ABC 의 세 중선과 무게중심 G, 변 BC 의 중점 D'),
        answer: '6',
        hint: '세 중선은 삼각형을 넓이가 같은 몇 개의 삼각형으로 나눌까요?',
        wrong: [
          { a: '12', why: '삼각형 GBC의 넓이를 구했어요. 삼각형 GBD는 그 절반이에요.' },
          { a: '9', why: '넓이를 4등분했어요. 세 중선은 삼각형을 넓이가 같은 6개로 나눠요.' },
        ],
        explain: '세 중선은 삼각형 ABC를 넓이가 같은 삼각형 6개로 나누고, 삼각형 GBD는 그중 하나예요. 그래서 $36\\times\\frac{1}{6}=6$ (cm²)예요.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 0,
        q: '그림에서 두 직선 BD, CE는 점 A에서 만나고 $\\overline{BC} \\parallel \\overline{DE}$예요. $\\overline{AD}=4$, $\\overline{AB}=8$, $\\overline{BC}=10$일 때, $\\overline{DE}$의 길이는 얼마일까요?',
        fig: draw({ A: [150, 80], B: [60, 200], C: [260, 200], D: [195, 20], E: [95, 20] },
          [['B', 'D'], ['C', 'E'], ['B', 'C'], ['D', 'E', 'blue']],
          [['A', 0, 16], ['B', -10, 6], ['C', 10, 6], ['D', 10, -8], ['E', -10, -8]],
          '두 직선 BD, CE 가 점 A 에서 만나고, BC 와 DE 가 평행한 그림. AD=4, AB=8, BC=10',
          [[184, 52, '4'], [92, 138, '8'], [160, 214, '10'], [145, 8, '?']]),
        answer: '5',
        wrong: [
          { a: '20', why: '비를 거꾸로 맞추었어요. $\\overline{AD}$가 $\\overline{AB}$보다 짧으니 $\\overline{DE}$도 $\\overline{BC}$보다 짧아요.' },
          { a: '6', why: '차(4)를 뺐어요. 같은 것은 차가 아니라 비예요.' },
        ],
        explain: '맞꼭지각 $\\angle DAE=\\angle BAC$이고, 엇각 $\\angle ADE=\\angle ABC$이므로 $\\triangle ADE ∽ \\triangle ABC$ (AA 닮음)예요. 점 D, E가 연장선 위에 있어도 비는 그대로 성립해요.\n\n$\\overline{AD}:\\overline{AB}=\\overline{DE}:\\overline{BC}$이므로 $4:8=\\overline{DE}:10$, $\\overline{DE}=5$예요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 5,
        q: '삼각형 ABC의 무게중심을 G, 중선을 AD라고 해요. 삼각형 GBC의 무게중심을 G\'이라고 할 때, $\\overline{AD}=18$ cm이면 $\\overline{GG\'}$의 길이는 몇 cm일까요?',
        fig: draw({ A: [120, 10], B: [20, 190], C: [280, 190], D: [150, 190], G: [140, 130], H: [146.7, 170] },
          [['A', 'B'], ['B', 'C'], ['C', 'A'], ['A', 'D', 'blue'], ['G', 'B', 'thin'], ['G', 'C', 'thin']],
          [['A', 0, -10], ['B', -10, 6], ['C', 10, 6], ['D', 0, 13], ['G', 12, -6], ['H', 16, 0, 'G\'']],
          '삼각형 ABC 와 중선 AD, 무게중심 G, 삼각형 GBC 와 그 무게중심 G\'', [], ['G', 'H']),
        answer: '4',
        hint: '$\\overline{GD}$는 삼각형 GBC의 중선이에요.',
        wrong: [
          { a: '6', why: '$\\overline{GD}$까지 구했어요. G\'은 $\\overline{GD}$를 다시 $2:1$로 나눠요.' },
          { a: '2', why: '$\\overline{G\'D}$를 구했어요. G 쪽이 2칸이에요.' },
        ],
        explain: '$\\overline{GD}=18\\times\\frac{1}{3}=6$ (cm)예요. D는 변 BC의 중점이므로 $\\overline{GD}$는 삼각형 GBC의 중선이고, G\'은 이 중선을 G로부터 $2:1$로 나눠요. 그래서 $\\overline{GG\'}=6\\times\\frac{2}{3}=4$ (cm)예요.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '$\\overline{AD} \\parallel \\overline{BC}$인 사다리꼴 ABCD에서 $\\overline{AD}=8$ cm, $\\overline{BC}=14$ cm예요. 두 변 AB, DC의 중점 M, N을 이은 선분이 두 대각선 BD, AC와 만나는 점을 각각 P, Q라고 할 때, $\\overline{PQ}$의 길이는 몇 cm일까요?',
        fig: draw({ A: [80, 10], D: [200, 10], B: [20, 170], C: [300, 170], M: [50, 90], N: [250, 90], P: [110, 90], Q: [190, 90] },
          [['A', 'D'], ['D', 'C'], ['C', 'B'], ['B', 'A'], ['B', 'D', 'dash'], ['A', 'C', 'dash'], ['M', 'N', 'blue']],
          [['A', -6, -10], ['D', 6, -10], ['B', -10, 6], ['C', 10, 6], ['M', -13, 0], ['N', 13, 0], ['P', 6, 12], ['Q', -6, 12]],
          '사다리꼴 ABCD 의 두 대각선과 두 변의 중점 M, N 을 이은 선분, 대각선과 만나는 점 P, Q. AD=8, BC=14',
          [[140, -2, '8'], [160, 184, '14']], ['P', 'Q']),
        answer: '3',
        hint: '삼각형 ABD와 삼각형 ABC에서 각각 중점을 연결한 선분의 성질을 써 보세요.',
        wrong: [
          { a: '11', why: '$\\overline{MN}$의 길이를 구했어요. 그중 두 대각선 사이의 부분만 구해요.' },
          { a: '6', why: '두 밑변의 차를 그대로 썼어요. $\\overline{PQ}$는 그 절반이에요.' },
        ],
        explain: '삼각형 ABD에서 M은 AB의 중점이고 $\\overline{MP} \\parallel \\overline{AD}$이므로 $\\overline{MP}=\\frac{1}{2}\\times8=4$ (cm)예요.\n\n삼각형 ABC에서 $\\overline{MQ} \\parallel \\overline{BC}$이므로 $\\overline{MQ}=\\frac{1}{2}\\times14=7$ (cm)예요.\n\n그래서 $\\overline{PQ}=\\overline{MQ}-\\overline{MP}=7-4=3$ (cm)예요.',
      },
      {
        id: 'a3', level: 3, type: 'ox', concept: 1,
        q: '삼각형 ABC에서 변 AB, AC 위의 점 D, E에 대하여 $\\overline{AD}:\\overline{AB}=\\overline{DE}:\\overline{BC}$이면 항상 $\\overline{BC} \\parallel \\overline{DE}$예요.',
        answer: false,
        explain: '평행을 판단하려면 $\\overline{AD}:\\overline{AB}=\\overline{AE}:\\overline{AC}$처럼 **공통인 각 A를 끼고 있는 변**의 비가 같아야 해요.\n\n점 D를 중심으로 반지름이 $\\overline{DE}$인 원을 그리면 변 AC와 두 점에서 만날 수 있어요. 두 점 모두 $\\overline{DE}$의 길이가 같아 $\\overline{AD}:\\overline{AB}=\\overline{DE}:\\overline{BC}$를 만족하지만, 그중 한 점만 $\\overline{BC}$와 평행한 선분을 만들어요.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 0,
        q: '삼각형 ABC에서 변 AB 위의 점 D를 지나 변 BC에 평행한 직선이 변 AC와 만나는 점을 E, 점 E를 지나 변 AB에 평행한 직선이 변 BC와 만나는 점을 F라고 해요. $\\overline{AD}:\\overline{DB}=2:1$이고 $\\overline{BC}=12$ cm일 때, $\\overline{FC}$의 길이는 몇 cm일까요?',
        fig: draw({ A: [150, 10], B: [40, 200], C: [280, 200], D: [76.7, 136.7], E: [236.7, 136.7], F: [200, 200] },
          [['A', 'B'], ['B', 'C'], ['C', 'A'], ['D', 'E', 'blue'], ['E', 'F', 'blue']],
          [['A', 0, -10], ['B', -10, 6], ['C', 10, 6], ['D', -14, 0], ['E', 14, -2], ['F', 0, 13]],
          '삼각형 ABC 에서 BC 에 평행한 DE 와 AB 에 평행한 EF'),
        answer: '4',
        hint: '사각형 DBFE는 어떤 사각형일까요?',
        wrong: [
          { a: '8', why: '$\\overline{BF}$(또는 $\\overline{DE}$)의 길이를 구했어요. $\\overline{FC}=\\overline{BC}-\\overline{BF}$예요.' },
          { a: '6', why: '$\\overline{BC}$를 반으로 나누었어요. $\\overline{AD}:\\overline{DB}=2:1$을 써요.' },
        ],
        explain: '$\\overline{DE} \\parallel \\overline{BC}$이므로 $\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{AB}=2:3$, $\\overline{DE}=12\\times\\frac{2}{3}=8$ (cm)예요.\n\n사각형 DBFE는 두 쌍의 대변이 각각 평행하므로 평행사변형이고, $\\overline{BF}=\\overline{DE}=8$ cm예요. 그래서 $\\overline{FC}=12-8=4$ (cm)예요.\n\n(다른 방법: 삼각형 CAB에서 $\\overline{EF} \\parallel \\overline{AB}$이므로 $\\overline{CF}:\\overline{CB}=\\overline{CE}:\\overline{CA}=1:3$이에요.)',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 5,
        q: '평행사변형 ABCD에서 변 BC의 중점을 M이라 하고, $\\overline{AM}$과 대각선 BD가 만나는 점을 P라고 해요. $\\overline{BD}=18$ cm일 때, $\\overline{BP}$의 길이는 몇 cm일까요?',
        fig: draw({ A: [60, 10], D: [260, 10], C: [220, 150], B: [20, 150], M: [120, 150], P: [100, 103.3] },
          [['A', 'D'], ['D', 'C'], ['C', 'B'], ['B', 'A'], ['A', 'M', 'blue'], ['B', 'D', 'dash']],
          [['A', -6, -10], ['D', 6, -10], ['B', -10, 6], ['C', 10, 6], ['M', 0, 13], ['P', -13, -4]],
          '평행사변형 ABCD 에서 BC 의 중점 M, AM 과 대각선 BD 가 만나는 점 P', [], ['P']),
        answer: '6',
        hint: '대각선 AC를 그어 보세요. 평행사변형의 두 대각선은 서로를 이등분해요.',
        wrong: [
          { a: '9', why: '대각선의 절반 $\\overline{BO}$를 구했어요. P는 그보다 B에 더 가까워요.' },
          { a: '12', why: '$\\overline{PD}$를 구했어요. 문제는 $\\overline{BP}$예요.' },
        ],
        explain: '대각선 AC를 긋고 두 대각선이 만나는 점을 O라고 하면, 평행사변형의 대각선은 서로를 이등분하므로 O는 AC의 중점이에요.\n\n삼각형 ABC에서 $\\overline{AM}$과 $\\overline{BO}$는 모두 중선이므로 P는 삼각형 ABC의 무게중심이에요. 그래서 $\\overline{BP}=\\frac{2}{3}\\overline{BO}=\\frac{2}{3}\\times9=6$ (cm)예요.',
      },
    ],

    deeper: [
      {
        title: '무게중심은 정말 "무게의 중심"일까?',
        body: '두꺼운 종이로 만든 삼각형은 무게중심 G 한 점만 받쳐도 균형을 잡아요. 중선은 삼각형을 넓이가 같은 두 부분으로 나누므로, 고르게 두꺼운 판이라면 중선 양쪽의 무게가 같아요. 세 중선 모두에서 균형이 맞는 점이 세 중선이 만나는 점, 곧 무게중심이에요.\n\n' +
          '꼭짓점 A, B, C의 좌표가 주어지면 무게중심의 좌표는 세 꼭짓점의 $x$좌표의 평균, $y$좌표의 평균이 돼요. 이 내용은 고등학교에서 좌표를 이용해 다시 다뤄요.',
      },
      {
        title: '평행선으로 선분을 똑같이 나누기',
        body: '자 눈금 없이도 선분을 3등분할 수 있어요. 선분 AB의 한 끝 A에서 비스듬한 반직선을 긋고, 컴퍼스로 같은 길이를 세 번 잘라 점 1, 2, 3을 찍어요. 점 3과 B를 이은 뒤, 점 1, 2를 지나며 이 선분에 평행한 직선을 그으면 선분 AB가 정확히 3등분돼요.\n\n' +
          '오늘 배운 **평행선 사이의 선분의 길이의 비**가 바로 그 이유예요. 비스듬한 반직선 위의 $1:1:1$이 선분 AB 위로 그대로 옮겨 와요.',
      },
    ],

    faq: [
      {
        q: 'DE:BC는 왜 AD:DB가 아니라 AD:AB랑 같아요?',
        a: '$\\overline{DE}$와 $\\overline{BC}$는 작은 삼각형 ADE와 큰 삼각형 ABC의 대응변이에요. 두 삼각형의 닮음비는 $\\overline{AD}:\\overline{AB}$이지요. $\\overline{DB}$는 큰 삼각형에서 작은 삼각형을 빼고 남은 부분이라 대응변이 아니에요.',
      },
      {
        q: '무게중심은 왜 중선을 2:1로 나눠요?',
        a: '두 중선 AD, BE를 그으면 $\\overline{DE}$는 두 변의 중점을 이은 선분이라 $\\overline{AB}$의 절반이고 평행해요. 그래서 삼각형 GAB와 삼각형 GDE가 닮음비 $2:1$로 닮아요. 대응변 $\\overline{AG}$와 $\\overline{GD}$도 $2:1$이 돼요.',
      },
      {
        q: '사다리꼴에서 EF는 그냥 두 밑변의 평균 아니에요?',
        a: 'E, F가 두 변의 **중점**일 때만 평균이에요. $\\overline{AE}:\\overline{EB}=1:2$처럼 중점이 아니면 대각선을 그어 두 삼각형으로 나눈 뒤, 각각의 비로 조각을 구해 더해야 해요.',
      },
    ],

    mistakes: [
      '$\\overline{BC} \\parallel \\overline{DE}$일 때 $\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{DB}$로 계산하는 실수 — $\\overline{DE}:\\overline{BC}$는 $\\overline{AD}:\\overline{AB}$와 같아요.',
      '무게중심이 중선의 한가운데에 있다고 생각하는 실수 — 무게중심은 중선을 꼭짓점으로부터 $2:1$로 나눠요.',
      '사다리꼴에서 E, F가 중점이 아닌데도 $\\overline{EF}$를 두 밑변의 평균으로 계산하는 실수 — 대각선을 그어 나누어 구해요.',
    ],

    gens: [
      {
        id: 'tri-parallel',
        level: 1,
        title: '삼각형에서 평행선과 선분의 길이의 비',
        make: function (R) {
          var pr = R.pick([[1, 2], [1, 3], [2, 3], [2, 1], [3, 2], [3, 4], [1, 4], [3, 1], [4, 3], [2, 5]]);
          var m = pr[0], n = pr[1], t = m / (m + n);
          var a = R.int(1, 4), b = R.int(1, 4);
          if (b === a) b = a === 4 ? 1 : a + 1;
          var kind = R.int(0, 2);
          var AD = m * a, DB = n * a;
          var head = '삼각형 ABC에서 $\\overline{BC} \\parallel \\overline{DE}$이고 ';
          if (kind === 2) {
            var c = R.int(1, 5), BC = (m + n) * c, DE = m * c;
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 0,
              q: head + '$\\overline{AD}=' + AD + '$ cm, $\\overline{DB}=' + DB + '$ cm, $\\overline{BC}=' + BC + '$ cm예요. $\\overline{DE}$의 길이는 몇 cm일까요?',
              fig: triPar(t, [AD, DB, null, null, '?', BC], '삼각형 ABC 에서 BC 에 평행한 선분 DE (그림의 길이는 정확하지 않음)'),
              answer: String(DE),
              wrong: wrongs(DE, [
                [frs(BC * m, n), '$\\overline{AD}:\\overline{DB}$를 썼어요. $\\overline{DE}:\\overline{BC}$는 $\\overline{AD}:\\overline{AB}$와 같아요.'],
                [frs(BC * (m + n), m), '비를 거꾸로 맞추었어요. $\\overline{DE}$는 $\\overline{BC}$보다 짧아야 해요.'],
              ]),
              explain: '$\\overline{AB}=' + AD + '+' + DB + '=' + (AD + DB) + '$이고 $\\overline{AD}:\\overline{AB}=\\overline{DE}:\\overline{BC}$이므로 $' + AD + ':' + (AD + DB) + '=\\overline{DE}:' + BC + '$' + R.josa(BC, '이에요/예요') + '.\n\n' +
                '$' + (AD + DB) + '\\times\\overline{DE}=' + (AD * BC) + '$에서 $\\overline{DE}=' + DE + '$ cm예요.',
            };
          }
          var AE = m * b, EC = n * b;
          var askEC = kind === 0;
          var ans = askEC ? EC : AE, given = askEC ? AE : EC;
          var wl = askEC
            ? [[frs(AE * m, n), '비를 거꾸로 맞추었어요. $' + AD + ':' + DB + '=' + AE + ':\\overline{EC}$를 세워요.'],
              [AE + (DB - AD), '길이의 차를 이용했어요. 같은 것은 차가 아니라 비예요.']]
            : [[frs(EC * n, m), '비를 거꾸로 맞추었어요. $' + AD + ':' + DB + '=\\overline{AE}:' + EC + '$' + R.josa(EC, '을/를') + ' 세워요.'],
              [EC - (DB - AD), '길이의 차를 이용했어요. 같은 것은 차가 아니라 비예요.']];
          wl = wl.filter(function (w) { return typeof w[0] === 'string' || w[0] > 0; });
          var unknown = askEC ? '\\overline{EC}' : '\\overline{AE}';
          var eq = askEC ? AD + ':' + DB + '=' + AE + ':\\overline{EC}' : AD + ':' + DB + '=\\overline{AE}:' + EC;
          var prod = askEC ? DB * AE : AD * EC, coef = askEC ? AD : DB;
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 0,
            q: head + '$\\overline{AD}=' + AD + '$ cm, $\\overline{DB}=' + DB + '$ cm, $' + (askEC ? '\\overline{AE}' : '\\overline{EC}') + '=' + given + '$ cm예요. $' + unknown + '$의 길이는 몇 cm일까요?',
            fig: triPar(t, [AD, DB, askEC ? AE : '?', askEC ? '?' : EC, null, null], '삼각형 ABC 에서 BC 에 평행한 선분 DE (그림의 길이는 정확하지 않음)'),
            answer: String(ans),
            wrong: wrongs(ans, wl),
            explain: '$\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$이므로 $' + eq + '$' + R.josa(askEC ? 'C' : EC, '이에요/예요') + '.\n\n' +
              '$' + coef + '\\times' + unknown + '=' + prod + '$에서 $' + unknown + '=' + ans + '$ cm예요.',
          };
        },
      },
      {
        id: 'midpoint-centroid',
        level: 1,
        title: '중점을 연결한 선분과 무게중심',
        make: function (R) {
          var kind = R.int(0, 4), k = R.int(3, 15);
          if (kind === 0) {
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 2,
              q: '삼각형 ABC에서 두 변 AB, AC의 중점을 각각 M, N이라고 해요. $\\overline{BC}=' + (2 * k) + '$ cm일 때, $\\overline{MN}$의 길이는 몇 cm일까요?',
              answer: String(k),
              wrong: wrongs(k, [[4 * k, '2배를 했어요. $\\overline{MN}$은 $\\overline{BC}$의 절반이에요.']]),
              explain: '두 변의 중점을 연결한 선분은 나머지 변의 절반이에요. $\\overline{MN}=\\frac{1}{2}\\times' + (2 * k) + '=' + k + '$ (cm)예요.',
            };
          }
          if (kind === 1) {
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 2,
              q: '삼각형 ABC에서 두 변 AB, AC의 중점을 각각 M, N이라고 해요. $\\overline{MN}=' + k + '$ cm일 때, $\\overline{BC}$의 길이는 몇 cm일까요?',
              answer: String(2 * k),
              wrong: wrongs(2 * k, [[frs(k, 2), '반으로 나누었어요. $\\overline{BC}$는 $\\overline{MN}$의 2배예요.']]),
              explain: '$\\overline{MN}=\\frac{1}{2}\\overline{BC}$이므로 $\\overline{BC}=2\\times' + k + '=' + (2 * k) + '$ (cm)예요.',
            };
          }
          if (kind === 2) {
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 5,
              q: '삼각형 ABC의 무게중심을 G, 중선을 AD라고 해요. $\\overline{AD}=' + (3 * k) + '$ cm일 때, $\\overline{AG}$의 길이는 몇 cm일까요?',
              answer: String(2 * k),
              wrong: wrongs(2 * k, [
                [frs(3 * k, 2), 'G를 중선의 중점으로 생각했어요. 무게중심은 중선을 $2:1$로 나눠요.'],
                [k, '$\\overline{GD}$를 구했어요. 꼭짓점 A 쪽이 더 긴 2칸이에요.'],
              ]),
              explain: '$\\overline{AG}:\\overline{GD}=2:1$이므로 $\\overline{AG}=' + (3 * k) + '\\times\\frac{2}{3}=' + (2 * k) + '$ (cm)예요.',
            };
          }
          if (kind === 3) {
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 5,
              q: '삼각형 ABC의 무게중심을 G, 중선을 AD라고 해요. $\\overline{GD}=' + k + '$ cm일 때, 중선 AD의 길이는 몇 cm일까요?',
              answer: String(3 * k),
              wrong: wrongs(3 * k, [
                [2 * k, '$\\overline{AG}$만 구했거나 G를 중선의 중점으로 생각했어요. $\\overline{AD}=\\overline{AG}+\\overline{GD}$이고 $\\overline{AG}=2\\overline{GD}$예요.'],
                [frs(3 * k, 2), '$\\overline{GD}$를 2칸으로 생각했어요. $\\overline{GD}$가 1칸, $\\overline{AG}$가 2칸이에요.'],
              ]),
              explain: '$\\overline{AG}:\\overline{GD}=2:1$이므로 $\\overline{AG}=2\\times' + k + '=' + (2 * k) + '$ (cm), $\\overline{AD}=' + (2 * k) + '+' + k + '=' + (3 * k) + '$ (cm)예요.',
            };
          }
          var S = 6 * k, part = R.pick([['GBC', 2 * k, 3], ['GAB', 2 * k, 3], ['GBD', k, 6], ['GCD', k, 6]]);
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 5,
            q: '삼각형 ABC의 넓이는 ' + S + ' cm²예요. 무게중심을 G, 변 BC의 중점을 D라고 할 때, 삼각형 ' + part[0] + '의 넓이는 몇 cm²일까요?',
            fig: centroidFig('삼각형 ABC 의 세 중선과 무게중심 G, 변 BC 의 중점 D'),
            answer: String(part[1]),
            wrong: wrongs(part[1], [
              [3 * k, '넓이를 절반으로 나누었어요. 세 중선은 삼각형을 넓이가 같은 6개로 나눠요.'],
              [part[2] === 3 ? k : 2 * k, part[2] === 3 ? '삼각형 6개 중 1개의 넓이를 구했어요. 삼각형 ' + part[0] + '는 그중 2개예요.' : '삼각형 6개 중 2개의 넓이를 구했어요. 삼각형 ' + part[0] + '는 그중 1개예요.'],
            ]),
            explain: '세 중선은 삼각형 ABC를 넓이가 같은 삼각형 6개로 나눠요. 삼각형 ' + part[0] + '는 ' + (part[2] === 3 ? '그중 2개, 곧 전체의 $\\frac{1}{3}$' : '그중 1개, 곧 전체의 $\\frac{1}{6}$') + '이에요.\n\n' +
              '넓이는 $' + S + '\\times\\frac{1}{' + part[2] + '}=' + part[1] + '$ (cm²)예요.',
          };
        },
      },
      {
        id: 'parallel-lines',
        level: 2,
        title: '평행선 사이의 선분의 길이의 비',
        make: function (R) {
          var pr = R.pick([[1, 2], [2, 3], [3, 4], [2, 5], [3, 5], [1, 3], [3, 2], [4, 3], [5, 3], [2, 1]]);
          var p = pr[0], q = pr[1], a = R.int(1, 4), b = R.int(1, 5);
          if (b === a) b = a + 1;
          var L = [p * a, q * a, p * b, q * b], names = ['\\overline{AB}', '\\overline{BC}', '\\overline{DE}', '\\overline{EF}'];
          var ask = R.pick([1, 2, 3]);
          var ans = L[ask], shown = L.map(function (v, i) { return i === ask ? '?' : v; });
          var given = [0, 1, 2, 3].filter(function (i) { return i !== ask; });
          var parts = given.map(function (i) { return '$' + names[i] + '=' + L[i] + '$'; });
          // 비례식 (AB:BC = DE:EF) 에서 모르는 칸을 구한다
          var eq = L.map(function (v, i) { return i === ask ? names[i] : String(v); });
          var cross = (ask === 1 || ask === 2) ? L[0] * L[3] : L[1] * L[2];
          var coef = ask === 1 ? L[2] : ask === 2 ? L[1] : L[0];
          var other = ask === 3 ? L[2] + (L[1] - L[0]) : ask === 2 ? L[3] - (L[1] - L[0]) : L[0] + (L[3] - L[2]);
          var inv = ask === 3 ? frs(L[2] * L[0], L[1]) : ask === 2 ? frs(L[3] * L[1], L[0]) : frs(L[0] * L[2], L[3]);
          var wl = [[inv, '비를 거꾸로 맞추었어요. $\\overline{AB}:\\overline{BC}=\\overline{DE}:\\overline{EF}$로 순서를 맞춰요.']];
          if (other > 0) wl.push([other, '길이의 차가 같다고 생각했어요. 같은 것은 차가 아니라 비예요.']);
          return {
            type: 'short', check: 'number', concept: 3,
            q: '세 직선 $l$, $m$, $n$이 서로 평행하고, 두 직선과 만나는 점이 각각 A, B, C와 D, E, F예요. ' + parts.join(', ') + '일 때, $' + names[ask] + '$의 길이는 얼마일까요?',
            fig: parLines(150 * p / (p + q), 150 * q / (p + q), shown, '평행한 세 직선 l, m, n 과 두 직선 (그림의 길이는 정확하지 않음)'),
            answer: String(ans),
            wrong: wrongs(ans, wl),
            explain: '평행선 사이의 선분의 길이의 비에서 $\\overline{AB}:\\overline{BC}=\\overline{DE}:\\overline{EF}$이므로 $' + eq[0] + ':' + eq[1] + '=' + eq[2] + ':' + eq[3] + '$' + R.josa(ask === 3 ? 'F' : L[3], '이에요/예요') + '.\n\n' +
              '$' + coef + '\\times' + names[ask] + '=' + cross + '$에서 $' + names[ask] + '=' + ans + '$' + R.josa(ans, '이에요/예요') + '.',
          };
        },
      },
      {
        id: 'trapezoid',
        level: 3,
        title: '사다리꼴에서 평행선과 선분의 길이',
        make: function (R) {
          var pr = R.pick([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 1]]);
          var m = pr[0], n = pr[1], s = m + n;
          var i = R.int(1, s <= 3 ? 4 : 3), j = R.int(i + 1, i + 4);
          var AD = s * i, BC = s * j, EG = m * j, GF = n * i, EF = EG + GF;
          var swap = m * i + n * j;
          var wl = [];
          if (m !== n) wl.push([frs(AD + BC, 2), 'E, F를 중점으로 생각해 두 밑변의 평균을 구했어요. $\\overline{AE}:\\overline{EB}=' + m + ':' + n + '$' + R.josa(n, '이에요/예요') + '.']);
          if (m !== n) wl.push([swap, '비를 거꾸로 썼어요. $\\overline{EG}$는 $\\overline{BC}$의 $\\frac{' + m + '}{' + s + '}$, $\\overline{GF}$는 $\\overline{AD}$의 $\\frac{' + n + '}{' + s + '}$' + R.josa(n, '이에요/예요') + '.']);
          wl.push([EG, '대각선으로 나눈 한 조각 $\\overline{EG}$만 구했어요. $\\overline{GF}$도 더해요.']);
          wl.push([AD + BC, '두 밑변을 더하기만 했어요. 각 조각은 밑변의 일부예요.']);
          var mtex = m === n ? '중점' : '';
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 4,
            q: '$\\overline{AD} \\parallel \\overline{EF} \\parallel \\overline{BC}$인 사다리꼴 ABCD에서 $\\overline{AD}=' + AD + '$ cm, $\\overline{BC}=' + BC + '$ cm, $\\overline{AE}:\\overline{EB}=' + m + ':' + n + '$' + R.josa(n, '이에요/예요') + '. $\\overline{EF}$의 길이는 몇 cm일까요?',
            fig: trap(m / s, [AD, BC, null, null, '?'], '사다리꼴 ABCD 와 BC 에 평행한 선분 EF (그림의 길이는 정확하지 않음)'),
            answer: String(EF),
            wrong: wrongs(EF, wl),
            explain: '대각선 AC와 $\\overline{EF}$가 만나는 점을 G라고 해요.' + (mtex ? ' (E, F가 중점이라 두 밑변의 평균으로 구해도 같아요.)' : '') + '\n\n' +
              '- 삼각형 ABC에서 $\\overline{EG}:\\overline{BC}=\\overline{AE}:\\overline{AB}=' + m + ':' + s + '$이므로 $\\overline{EG}=' + BC + '\\times\\frac{' + m + '}{' + s + '}=' + EG + '$\n' +
              '- 삼각형 CDA에서 $\\overline{GF}:\\overline{AD}=\\overline{CF}:\\overline{CD}=' + n + ':' + s + '$이므로 $\\overline{GF}=' + AD + '\\times\\frac{' + n + '}{' + s + '}=' + GF + '$\n\n' +
              '그래서 $\\overline{EF}=' + EG + '+' + GF + '=' + EF + '$ (cm)예요.',
          };
        },
      },
    ],
  });
})();
