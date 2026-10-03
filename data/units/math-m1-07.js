/* 중1 수학 · 기본 도형
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림은 아래 도우미가 만드는 svg (선·글자는 currentColor, 강조는 var(--fig-1)) */
var M107 = (function () {
  var PI = Math.PI;
  function r(v) { return Math.round(v * 10) / 10; }
  function ln(x1, y1, x2, y2, o) {
    o = o || {};
    return '<line x1="' + r(x1) + '" y1="' + r(y1) + '" x2="' + r(x2) + '" y2="' + r(y2) + '" stroke="' + (o.c || 'currentColor') +
      '" stroke-width="' + (o.w || 2) + '"' + (o.dash ? ' stroke-dasharray="6 4"' : '') + ' stroke-linecap="round"/>';
  }
  function tx(x, y, s, o) {
    o = o || {};
    return '<text x="' + r(x) + '" y="' + r(y) + '" font-size="' + (o.size || 15) + '" text-anchor="' + (o.anchor || 'middle') +
      '" dominant-baseline="central" fill="' + (o.c || 'currentColor') + '"' + (o.it ? ' font-style="italic"' : '') + '>' + s + '</text>';
  }
  function dot(x, y) { return '<circle cx="' + r(x) + '" cy="' + r(y) + '" r="3.5" fill="currentColor"/>'; }
  // 수학 방향(도, 시계 반대 방향, 위가 +)으로 잰 점
  function pol(cx, cy, rad, deg) { return [cx + rad * Math.cos(deg * PI / 180), cy - rad * Math.sin(deg * PI / 180)]; }
  // (x, y) 에서 deg 방향을 가리키는 화살촉
  function head(x, y, deg) {
    var a = pol(x, y, 10, deg + 155), b = pol(x, y, 10, deg - 155);
    return '<path d="M' + r(x) + ' ' + r(y) + ' L' + r(a[0]) + ' ' + r(a[1]) + ' L' + r(b[0]) + ' ' + r(b[1]) + ' Z" fill="currentColor"/>';
  }
  // 각 표시 호: d0 에서 d1 까지 (도, 시계 반대 방향)
  function arc(cx, cy, rad, d0, d1, c) {
    var p = pol(cx, cy, rad, d0), q = pol(cx, cy, rad, d1);
    return '<path d="M' + r(p[0]) + ' ' + r(p[1]) + ' A' + rad + ' ' + rad + ' 0 ' + (d1 - d0 > 180 ? 1 : 0) + ' 0 ' + r(q[0]) + ' ' + r(q[1]) +
      '" fill="none" stroke="' + (c || 'var(--fig-1)') + '" stroke-width="2"/>';
  }
  // 직각 표시: 꼭짓점 (cx, cy), 한 변의 방향 d0 (다른 변은 d0+90)
  function right(cx, cy, d0) {
    var s = 11, p = pol(cx, cy, s, d0), q = pol(cx, cy, s, d0 + 90), m = [p[0] + q[0] - cx, p[1] + q[1] - cy];
    return '<path d="M' + r(p[0]) + ' ' + r(p[1]) + ' L' + r(m[0]) + ' ' + r(m[1]) + ' L' + r(q[0]) + ' ' + r(q[1]) + '" fill="none" stroke="currentColor" stroke-width="1.6"/>';
  }
  function fig(w, h, body, alt) { return { type: 'svg', svg: '<svg viewBox="0 0 ' + w + ' ' + h + '">' + body + '</svg>', alt: alt }; }
  // 각 안쪽에 글자: 꼭짓점, 두 방향(도), 글자
  function angLabel(cx, cy, d0, d1, s) {
    var half = (d1 - d0) / 2, len = String(s).length;
    var d = Math.min(72, Math.max(27, (9 + 3.6 * len) / Math.max(Math.sin(half * PI / 180), 0.25)));
    var p = pol(cx, cy, d, d0 + half);
    return tx(p[0], p[1], s, { size: 14 });
  }

  // 한 점에서 만나는 두 직선. 영역 0: [base, base+phi], 1: [base+phi, base+180], 2, 3 은 맞은편. labels[i] 가 있으면 그 영역에 글자·호
  function cross(phi, labels, alt) {
    var cx = 180, cy = 100, R = 125, base = 8, o = '';
    [base, base + phi].forEach(function (d) {
      var p = pol(cx, cy, R, d), q = pol(cx, cy, R, d + 180);
      o += ln(p[0], p[1], q[0], q[1]);
    });
    var edges = [base, base + phi, base + 180, base + 180 + phi, base + 360];
    for (var i = 0; i < 4; i++) {
      if (!labels[i]) continue;
      o += arc(cx, cy, 16 + (i % 2) * 4, edges[i], edges[i + 1]) + angLabel(cx, cy, edges[i], edges[i + 1], labels[i]);
    }
    o += dot(cx, cy);
    return fig(360, 200, o, alt);
  }

  // 평행한 두 직선 l, m 과 직선 n. 칸 0~3: 위 교점의 [0,θ] [θ,180] [180,180+θ] [180+θ,360], 칸 4~7: 아래 교점의 같은 자리
  function par(theta, labels, alt, opt) {
    opt = opt || {};
    var yl = 60, ym = 165, cot = Math.cos(theta * PI / 180) / Math.sin(theta * PI / 180), gap = ym - yl;
    var P = [195 + gap / 2 * cot, yl], Q = [195 - gap / 2 * cot, ym], o = '';
    o += ln(20, yl, 350, yl) + ln(20, ym, 350, ym);
    if (opt.parallel !== false) {
      [yl, ym].forEach(function (y) { o += '<path d="M52 ' + (y - 6) + ' L60 ' + y + ' L52 ' + (y + 6) + '" fill="none" stroke="currentColor" stroke-width="2"/>'; });
    }
    var e1 = pol(P[0], P[1], 42, theta), e2 = pol(Q[0], Q[1], 42, theta + 180);
    o += ln(e1[0], e1[1], e2[0], e2[1]);
    o += tx(364, yl, 'l', { it: true }) + tx(364, ym, 'm', { it: true });
    var nl = pol(e1[0], e1[1], 12, theta);
    o += tx(nl[0] + 8, nl[1], 'n', { it: true });
    var edges = [0, theta, 180, 180 + theta, 360];
    for (var i = 0; i < 8; i++) {
      var s = labels[i];
      if (!s) continue;
      var C = i < 4 ? P : Q, k = i % 4;
      if (opt.arcs !== false) o += arc(C[0], C[1], 15, edges[k], edges[k + 1]);
      o += angLabel(C[0], C[1], edges[k], edges[k + 1], s);
    }
    o += dot(P[0], P[1]) + dot(Q[0], Q[1]);
    return fig(380, 225, o, alt);
  }

  // 평행한 두 직선 사이에서 한 번 꺾인 선: 위 직선과 alpha, 아래 직선과 beta, 꺾인 점의 각
  function zig(alpha, beta, la, lb, lx, alt) {
    var yl = 40, ym = 200, ax = 50, ta = Math.tan(alpha * PI / 180), tb = Math.tan(beta * PI / 180);
    var d = (ym - yl) / (ta + tb), P = [ax + d, yl + d * ta], o = '';
    o += ln(10, yl, 340, yl) + ln(10, ym, 340, ym);
    [yl, ym].forEach(function (y) { o += '<path d="M262 ' + (y - 6) + ' L270 ' + y + ' L262 ' + (y + 6) + '" fill="none" stroke="currentColor" stroke-width="2"/>'; });
    o += ln(ax, yl, P[0], P[1]) + ln(ax, ym, P[0], P[1]);
    o += tx(354, yl, 'l', { it: true }) + tx(354, ym, 'm', { it: true });
    o += arc(ax, yl, 18, -alpha, 0) + angLabel(ax, yl, -alpha, 0, la);
    o += arc(ax, ym, 18, 0, beta) + angLabel(ax, ym, 0, beta, lb);
    o += arc(P[0], P[1], 16, 180 - alpha, 180 + beta) + angLabel(P[0], P[1], 180 - alpha, 180 + beta, lx);
    o += dot(ax, yl) + dot(ax, ym) + dot(P[0], P[1]);
    return fig(370, 240, o, alt);
  }

  // 선분 위의 점들: pts = [[이름, 0~1 위치], …], marks = [[t0, t1], …] 같은 길이 표시
  function seg(pts, marks, alt, opt) {
    opt = opt || {};
    var x0 = 40, x1 = 320, y = 40, o = '';
    o += ln(x0, y, x1, y);
    if (opt.lineArrows) o += ln(x0 - 25, y, x0, y) + ln(x1, y, x1 + 25, y) + head(x0 - 25, y, 180) + head(x1 + 25, y, 0);
    (marks || []).forEach(function (m) {
      var x = x0 + (x1 - x0) * (m[0] + m[1]) / 2;
      o += ln(x - 3, y - 7, x + 3, y + 7, { w: 1.6 });
    });
    pts.forEach(function (p) {
      var x = x0 + (x1 - x0) * p[1];
      o += dot(x, y) + tx(x, y + 22, p[0]);
    });
    return fig(360, 80, o, alt);
  }

  // 직육면체 ABCD-EFGH (윗면 ABCD, A 아래 E, B 아래 F …). 보이지 않는 모서리는 점선
  function cuboid(alt) {
    var V = { A: [60, 80], B: [240, 80], C: [300, 35], D: [120, 35], E: [60, 200], F: [240, 200], G: [300, 155], H: [120, 155] };
    var off = { A: [-14, 0], B: [4, 14], C: [14, 0], D: [-12, -10], E: [-14, 6], F: [6, 14], G: [14, 4], H: [-14, -8] };
    var o = '';
    [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['E', 'F'], ['F', 'G'], ['A', 'E'], ['B', 'F'], ['C', 'G']].forEach(function (e) {
      o += ln(V[e[0]][0], V[e[0]][1], V[e[1]][0], V[e[1]][1]);
    });
    [['D', 'H'], ['E', 'H'], ['G', 'H']].forEach(function (e) {
      o += ln(V[e[0]][0], V[e[0]][1], V[e[1]][0], V[e[1]][1], { dash: true, w: 1.5 });
    });
    Object.keys(V).forEach(function (k) { o += tx(V[k][0] + off[k][0], V[k][1] + off[k][1], k); });
    return fig(340, 225, o, alt || '직육면체 ABCD-EFGH');
  }

  // 한 점 O 에서 나간 반직선들 (일직선 위의 각): rays = 방향(도) 목록, labels = [[d0, d1, 글자], …]
  function rays(dirs, labels, alt) {
    var cx = 180, cy = 130, o = '';
    o += ln(30, cy, 330, cy);
    dirs.forEach(function (d) { var p = pol(cx, cy, 120, d); o += ln(cx, cy, p[0], p[1]); });
    labels.forEach(function (L) { o += arc(cx, cy, 18 + (L[3] || 0), L[0], L[1]) + angLabel(cx, cy, L[0], L[1], L[2]); });
    o += dot(cx, cy) + tx(cx, cy + 16, 'O');
    return fig(360, 160, o, alt);
  }

  // 직선·반직선·선분 비교
  function kinds() {
    var o = '', rows = [['직선 AB', 'line'], ['반직선 AB', 'ray'], ['선분 AB', 'seg']];
    rows.forEach(function (row, i) {
      var y = 30 + i * 50, ax = 170, bx = 270;
      o += tx(20, y, row[0], { anchor: 'start', size: 14 });
      var L = row[1] === 'line' ? 120 : ax, Rr = row[1] === 'seg' ? bx : 335;
      o += ln(L, y, Rr, y);
      if (row[1] === 'line') o += head(L, y, 180);
      if (row[1] !== 'seg') o += head(Rr, y, 0);
      o += dot(ax, y) + dot(bx, y) + tx(ax, y + 17, 'A', { size: 13 }) + tx(bx, y + 17, 'B', { size: 13 });
    });
    return fig(360, 160, o, '직선 AB는 양쪽으로 끝없이, 반직선 AB는 A에서 B 쪽으로 끝없이, 선분 AB는 A부터 B까지');
  }

  // 점 P 와 직선 l, 수선의 발 H
  function foot() {
    var o = '', y = 125;
    o += ln(20, y, 340, y) + tx(352, y, 'l', { it: true });
    o += ln(180, 30, 180, y, { c: 'var(--fig-1)', w: 2.5 }) + right(180, y, 0);
    o += ln(180, 30, 270, y, { w: 1.5 }) + ln(180, 30, 70, y, { w: 1.5 });
    o += dot(180, 30) + tx(180, 14, 'P');
    o += dot(180, y) + tx(180, y + 18, 'H') + dot(270, y) + tx(270, y + 18, 'Q') + dot(70, y) + tx(70, y + 18, 'R');
    return fig(370, 155, o, '직선 l 밖의 점 P에서 l에 내린 수선 PH와 선분 PQ, PR');
  }

  return { cross: cross, par: par, zig: zig, seg: seg, cuboid: cuboid, rays: rays, kinds: kinds, foot: foot, pol: pol };
})();

Tutor.registerUnit({
  id: 'math-m1-07',
  course: 'math-m1',
  title: '기본 도형',
  summary: '점, 선, 면, 각과 위치 관계를 알아보고, 평행선에서 동위각과 엇각의 성질을 이해해요.',
  goals: [
    '점, 선, 면과 직선·반직선·선분의 뜻을 알고 구별할 수 있어요.',
    '두 점 사이의 거리와 선분의 중점, 맞꼭지각, 수직과 수선을 이해해요.',
    '공간에서 점, 직선, 평면의 위치 관계를 말할 수 있어요.',
    '평행선에서 동위각과 엇각의 성질을 이용해 각의 크기를 구할 수 있어요.',
  ],
  standards: ['[9수03-01]', '[9수03-02]'],

  concepts: [
    {
      title: '점, 선, 면과 직선·반직선·선분',
      body: '도형을 이루는 기본 요소는 **점, 선, 면**이에요. 점이 움직이면 선이 되고, 선이 움직이면 면이 돼요. 선과 선 또는 선과 면이 만나서 생기는 점을 **교점**, 면과 면이 만나서 생기는 선을 **교선**이라고 해요.\n\n' +
        '> 💡 각기둥처럼 평면으로만 둘러싸인 입체도형에서는 (교점의 개수)$=$(꼭짓점의 개수), (교선의 개수)$=$(모서리의 개수)예요. 직육면체는 교점 8개, 교선 12개예요.\n\n' +
        '서로 다른 두 점 A, B를 지나는 직선은 **오직 하나**뿐이에요. 이 직선을 **직선 AB**라고 해요. 또\n\n' +
        '- **반직선 AB** $\\overrightarrow{AB}$: 점 A에서 시작해 점 B 쪽으로 끝없이 뻗은 부분\n' +
        '- **선분 AB** $\\overline{AB}$: 점 A에서 점 B까지의 부분\n\n' +
        '선분 AB와 선분 BA는 같지만, 반직선 AB와 반직선 BA는 시작점과 방향이 달라서 서로 달라요. ($\\overrightarrow{AB}\\ne\\overrightarrow{BA}$)',
      easy: '손전등을 생각해 보세요. 손전등 빛은 손전등(시작점)에서 한쪽으로만 끝없이 뻗어 나가요 — 이것이 **반직선**이에요. 양쪽으로 끝없이 뻗은 것은 **직선**, 양쪽 끝이 정해진 막대기는 **선분**이에요.\n\n' +
        '그래서 "A에서 B 쪽으로 비춘 빛"과 "B에서 A 쪽으로 비춘 빛"은 서로 다른 반직선이에요.',
      fig: M107.kinds(),
      check: {
        type: 'ox',
        q: '반직선 AB와 반직선 BA는 같은 도형이에요.',
        answer: false,
        explain: '반직선 AB는 A에서 시작해 B 쪽으로, 반직선 BA는 B에서 시작해 A 쪽으로 뻗어요. 시작점과 방향이 달라서 서로 다른 도형이에요. 선분 AB와 선분 BA는 같아요.',
      },
    },
    {
      title: '두 점 사이의 거리와 선분의 중점',
      body: '두 점 A, B를 잇는 수많은 선 가운데 가장 짧은 것은 선분 AB예요. 이 선분 AB의 길이를 **두 점 A, B 사이의 거리**라고 해요. $\\overline{AB}$는 선분 AB를 나타내기도 하고 그 길이를 나타내기도 해요. 예: $\\overline{AB}=6$ cm\n\n' +
        '선분 AB 위의 점 M에 대하여 $\\overline{AM}=\\overline{MB}$일 때, 점 M을 선분 AB의 **중점**이라고 해요. 그러면\n\n' +
        '$\\overline{AM}=\\overline{MB}=\\frac{1}{2}\\overline{AB}$, $\\overline{AB}=2\\overline{AM}$\n\n' +
        '예: $\\overline{AB}=12$ cm이고 점 M이 선분 AB의 중점이면 $\\overline{AM}=6$ cm예요. 다시 점 N이 선분 AM의 중점이면 $\\overline{AN}=3$ cm, $\\overline{NB}=9$ cm예요.',
      easy: '끈을 반으로 접었을 때 접힌 자리가 바로 **중점**이에요. 중점에서 양쪽 끝까지의 길이가 똑같지요.\n\n' +
        '12 cm 끈을 반으로 접으면 6 cm씩, 그 반을 또 반으로 접으면 3 cm씩이에요. 그림을 그려 길이를 적어 가며 풀면 헷갈리지 않아요.',
      fig: M107.seg([['A', 0], ['M', 0.5], ['B', 1]], [[0, 0.5], [0.5, 1]], '선분 AB와 중점 M, 두 부분의 길이가 같음을 나타낸 표시'),
      check: {
        type: 'short', check: 'number', unit: 'cm',
        q: '$\\overline{AB}=10$ cm이고 점 M이 선분 AB의 중점일 때, $\\overline{AM}$의 길이는 몇 cm일까요?',
        answer: '5',
        wrong: [{ a: '20', why: '중점은 선분을 반으로 나누는 점이에요. $\\overline{AM}=\\frac{1}{2}\\overline{AB}$예요.' }],
        explain: '점 M이 중점이므로 $\\overline{AM}=\\frac{1}{2}\\overline{AB}=\\frac{1}{2}\\times10=5$ (cm)예요.',
      },
    },
    {
      title: '각과 맞꼭지각',
      body: '한 점 O에서 시작하는 두 반직선 OA, OB로 이루어진 도형을 **각 AOB**라 하고 $\\angle AOB$로 나타내요. $\\angle BOA$, $\\angle O$, $\\angle a$처럼 쓰기도 해요. $\\angle AOB$는 각의 크기를 나타내기도 해요.\n\n' +
        '| 이름 | 크기 |\n|---|---|\n| 평각 | $180°$ (두 반직선이 일직선) |\n| 직각 | $90°$ |\n| 예각 | $0°$보다 크고 $90°$보다 작은 각 |\n| 둔각 | $90°$보다 크고 $180°$보다 작은 각 |\n\n' +
        '두 직선이 한 점에서 만나면 네 개의 각(**교각**)이 생겨요. 이 가운데 서로 마주 보는 두 각을 **맞꼭지각**이라고 해요. **맞꼭지각의 크기는 서로 같아요.**\n\n' +
        '왜 그럴까요? 그림에서 $\\angle a+\\angle b=180°$(평각)이고 $\\angle b+\\angle c=180°$(평각)예요. 둘 다 $180°$에서 $\\angle b$를 뺀 것이니 $\\angle a=\\angle c$예요.',
      easy: '가위를 벌려 보세요. 손잡이 쪽이 벌어진 만큼 날 쪽도 똑같이 벌어지지요? 가위의 두 날처럼 X자로 만난 두 직선에서 서로 마주 보는 각은 크기가 같아요. 이것이 **맞꼭지각**이에요.\n\n' +
        '그리고 옆으로 붙어 있는 두 각은 합쳐서 일직선(평각), 곧 $180°$가 돼요.',
      fig: M107.cross(60, ['a', 'b', 'c', 'd'], '두 직선이 만나서 생긴 네 각 a, b, c, d (a와 c, b와 d가 맞꼭지각)'),
      check: {
        type: 'choice',
        q: '두 직선이 한 점에서 만나서 생긴 각 가운데 하나가 $70°$일 때, 그 각의 맞꼭지각의 크기는 얼마일까요?',
        choices: ['$70°$', '$110°$', '$20°$'],
        answer: 0,
        why: ['', '이웃한 각을 구했어요. 이웃한 두 각의 합이 $180°$예요. 맞꼭지각은 마주 보는 각이에요.', '$90°$에서 뺐어요. 맞꼭지각은 크기가 같아요.'],
        explain: '맞꼭지각의 크기는 서로 같으므로 $70°$예요.',
      },
    },
    {
      title: '수직과 수선',
      body: '두 직선 AB와 CD의 교각이 직각일 때, 두 직선은 서로 **직교**한다고 하고 $\\text{AB}\\perp\\text{CD}$로 나타내요. 이때 두 직선은 서로 **수직**이고, 한 직선을 다른 직선의 **수선**이라고 해요.\n\n' +
        '선분 AB의 중점 M을 지나고 선분 AB에 수직인 직선을 선분 AB의 **수직이등분선**이라고 해요. 수직이등분선은 선분을 수직으로, 똑같이 둘로 나눠요.\n\n' +
        '직선 $l$ 위에 있지 않은 점 P에서 직선 $l$에 수선을 그어 생기는 교점 H를 점 P에서 직선 $l$에 내린 **수선의 발**이라고 해요. 이때 $\\overline{PH}$의 길이를 **점 P와 직선 $l$ 사이의 거리**라고 해요.\n\n' +
        '> 💡 점 P에서 직선 $l$ 위의 점까지 이은 선분 가운데 가장 짧은 것이 $\\overline{PH}$예요. 그래서 이 길이를 "거리"로 정해요.',
      easy: '벽에서 가장 가까운 곳까지 가려면 벽을 향해 똑바로(수직으로) 걸어가면 돼요. 비스듬히 가면 더 멀어지지요.\n\n' +
        '그림에서 점 P에서 직선 $l$까지 똑바로 내려온 선분 PH가 가장 짧아요. 그래서 PH의 길이가 "점과 직선 사이의 거리"예요.',
      fig: M107.foot(),
      check: {
        type: 'ox',
        q: '점 P에서 직선 $l$에 내린 수선의 발이 H일 때, $\\overline{PH}$의 길이를 점 P와 직선 $l$ 사이의 거리라고 해요.',
        answer: true,
        explain: '맞아요. 점 P에서 직선 $l$ 위의 점까지의 선분 가운데 수선 PH가 가장 짧아서, 그 길이를 점과 직선 사이의 거리로 정해요.',
      },
    },
    {
      title: '점, 직선, 평면의 위치 관계',
      body: '**평면에서 두 직선**의 위치 관계는 세 가지예요: 한 점에서 만난다, 평행하다($l\\parallel m$), 일치한다.\n\n' +
        '**공간에서 두 직선**은 여기에 하나가 더 있어요. 만나지도 않고 평행하지도 않은 경우로, 이것을 **꼬인 위치**에 있다고 해요. 꼬인 위치에 있는 두 직선은 한 평면 위에 있지 않아요.\n\n' +
        '**공간에서 직선과 평면**: 직선이 평면에 포함된다, 한 점에서 만난다, 평행하다. 직선 $l$이 평면과 한 점 H에서 만나고 H를 지나는 평면 위의 모든 직선과 수직이면 직선 $l$과 평면은 **직교**한다고 해요.\n\n' +
        '**공간에서 두 평면**: 한 직선(교선)에서 만난다, 평행하다, 일치한다.\n\n' +
        '예: 그림의 직육면체에서 모서리 AB와\n\n' +
        '- 평행한 모서리: $\\overline{DC}$, $\\overline{EF}$, $\\overline{HG}$\n' +
        '- 만나는 모서리: $\\overline{AD}$, $\\overline{BC}$, $\\overline{AE}$, $\\overline{BF}$\n' +
        '- 꼬인 위치에 있는 모서리: $\\overline{CG}$, $\\overline{DH}$, $\\overline{EH}$, $\\overline{FG}$',
      easy: '교실에서 찾아보세요. 칠판 윗변과 바닥의 뒷벽 쪽 모서리는 평행해요. 그런데 칠판 윗변과, 교실 뒤쪽 구석에서 바닥에서 천장으로 올라가는 모서리는 어떨까요? 아무리 늘여도 만나지 않지만 방향도 달라 평행하지도 않아요. 이것이 **꼬인 위치**예요.\n\n' +
        '꼬인 위치를 찾을 때는 "만나는 것"과 "평행한 것"을 먼저 지우고 남은 것을 고르면 쉬워요.',
      fig: M107.cuboid(),
      check: {
        type: 'choice',
        q: '공간에서 두 직선이 만나지도 않고 평행하지도 않을 때, 두 직선의 위치 관계를 무엇이라고 할까요?',
        choices: ['꼬인 위치에 있다', '수직이다', '일치한다'],
        answer: 0,
        why: ['', '수직인 두 직선은 한 점에서 만나요(직각으로).', '일치하는 두 직선은 모든 점에서 만나요.'],
        explain: '공간에서 만나지도 않고 평행하지도 않은 두 직선은 **꼬인 위치**에 있다고 해요. 평면 위에서는 생기지 않는 관계예요.',
      },
    },
    {
      title: '평행선에서 동위각과 엇각',
      body: '두 직선 $l$, $m$이 다른 한 직선 $n$과 만나면 각이 8개 생겨요.\n\n' +
        '- **동위각**: 같은 위치에 있는 두 각. 그림에서 $\\angle a$와 $\\angle e$, $\\angle b$와 $\\angle f$, $\\angle c$와 $\\angle g$, $\\angle d$와 $\\angle h$\n' +
        '- **엇각**: 두 직선 $l$, $m$ 사이에서 직선 $n$을 사이에 두고 엇갈린 위치에 있는 두 각. 그림에서 $\\angle c$와 $\\angle e$, $\\angle d$와 $\\angle f$\n\n' +
        '**두 직선이 평행하면** 동위각의 크기가 같고, 엇각의 크기도 같아요. 거꾸로 동위각(또는 엇각)의 크기가 같으면 두 직선은 평행해요.\n\n' +
        '> ⚠️ 동위각·엇각은 위치로 정하는 이름이라 평행하지 않아도 있어요. 하지만 크기가 같다고 할 수 있는 것은 **두 직선이 평행할 때뿐**이에요.\n\n' +
        '예: $l\\parallel m$이고 $\\angle a=65°$이면 동위각 $\\angle e=65°$, $\\angle c$는 $\\angle a$의 맞꼭지각이라 $65°$, $\\angle f=180°-65°=115°$예요.',
      easy: '평행한 두 직선은 기찻길처럼 같은 방향으로 나란히 뻗어 있어요. 직선 $n$이 두 기찻길을 같은 기울기로 가로지르니, 위 교차점과 아래 교차점의 모양이 **똑같아요.** 그래서 같은 자리의 각(동위각)이 같아요.\n\n' +
        '엇각은 "Z 모양"을 찾으면 돼요. Z 글자의 위쪽 꺾인 곳과 아래쪽 꺾인 곳의 각이 엇각이고, 평행선에서는 크기가 같아요.',
      fig: M107.par(62, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], '평행한 두 직선 l, m과 직선 n이 만나서 생긴 각 a~h', { arcs: false }),
      check: {
        type: 'choice',
        q: '두 직선 $l$, $m$이 평행할 때, $\\angle a=65°$이면 $\\angle a$의 동위각의 크기는 얼마일까요?',
        choices: ['$65°$', '$115°$', '$25°$'],
        answer: 0,
        why: ['', '이웃한 각과 헷갈렸어요. $180°-65°$는 동위각이 아니라 이웃한 각의 크기예요.', '$90°$에서 뺐어요. 평행선에서 동위각의 크기는 같아요.'],
        explain: '두 직선이 평행하면 동위각의 크기가 같아요. 그래서 $65°$예요.',
      },
    },
  ],

  examples: [
    {
      q: '점 M은 선분 AB의 중점이고, 점 N은 선분 MB의 중점이에요. $\\overline{AB}=16$ cm일 때 $\\overline{AN}$의 길이를 구해 보세요.',
      fig: M107.seg([['A', 0], ['M', 0.5], ['N', 0.75], ['B', 1]], [], '선분 AB 위의 점 M, N'),
      steps: [
        '점 M이 선분 AB의 중점이므로 $\\overline{AM}=\\overline{MB}=\\frac{1}{2}\\times16=8$ (cm)예요.',
        '점 N이 선분 MB의 중점이므로 $\\overline{MN}=\\frac{1}{2}\\times8=4$ (cm)예요.',
        '$\\overline{AN}=\\overline{AM}+\\overline{MN}=8+4=12$ (cm)예요.',
      ],
      answer: '12 cm',
    },
    {
      q: '그림과 같이 두 직선이 한 점에서 만날 때, $x$의 값을 구해 보세요.',
      fig: M107.cross(70, ['(2x+10)°', null, '(3x-20)°', null], '두 직선이 만나서 생긴 맞꼭지각 (2x+10)°와 (3x-20)°'),
      steps: [
        '두 각은 서로 마주 보고 있으니 맞꼭지각이에요. 맞꼭지각의 크기는 같아요.',
        '$2x+10=3x-20$',
        '이항하면 $2x-3x=-20-10$, $-x=-30$, 곧 $x=30$이에요.',
        '확인: 두 각은 모두 $70°$예요.',
      ],
      answer: '$x=30$',
    },
    {
      q: '그림에서 $l\\parallel m$일 때, $\\angle x$의 크기를 구해 보세요.',
      fig: M107.zig(40, 30, '40°', '30°', 'x', '평행한 두 직선 l, m 사이에서 꺾인 선. 위 직선과 40°, 아래 직선과 30°를 이루고 꺾인 점의 각이 x'),
      steps: [
        '꺾인 점을 지나고 직선 $l$에 평행한 직선을 하나 그어요. 이 직선은 $m$에도 평행해요.',
        '새 직선은 $\\angle x$를 위아래 두 부분으로 나눠요. 위쪽 부분은 $40°$인 각과 엇각이라 $40°$예요.',
        '아래쪽 부분은 $30°$인 각과 엇각이라 $30°$예요.',
        '따라서 $\\angle x=40°+30°=70°$예요.',
      ],
      answer: '$70°$',
    },
  ],

  terms: [
    { term: '교점', def: '선과 선 또는 선과 면이 만나서 생기는 점이에요. 면과 면이 만나서 생기는 선은 교선이라고 해요.' },
    { term: '반직선', def: '한 점에서 시작해 한쪽으로만 끝없이 뻗은 직선의 부분이에요. 반직선 AB는 A에서 시작해 B 쪽으로 뻗어요.' },
    { term: '선분', def: '직선 위의 두 점과 그 사이의 부분이에요. 선분 AB의 길이가 두 점 A, B 사이의 거리예요.' },
    { term: '중점', def: '선분을 길이가 같은 두 부분으로 나누는 점이에요. 점 M이 선분 AB의 중점이면 $\\overline{AM}=\\overline{MB}$예요.' },
    { term: '맞꼭지각', def: '두 직선이 한 점에서 만날 때 생기는 네 각 가운데 서로 마주 보는 두 각이에요. 크기가 서로 같아요.' },
    { term: '수직이등분선', def: '선분의 중점을 지나고 그 선분에 수직인 직선이에요.' },
    { term: '수선의 발', def: '직선 밖의 한 점에서 그 직선에 수선을 그었을 때 생기는 교점이에요.' },
    { term: '꼬인 위치', def: '공간에서 두 직선이 만나지도 않고 평행하지도 않은 위치 관계예요.' },
    { term: '동위각', def: '두 직선이 다른 한 직선과 만날 때 같은 위치에 있는 두 각이에요. 두 직선이 평행하면 크기가 같아요.' },
    { term: '엇각', def: '두 직선이 다른 한 직선과 만날 때, 두 직선 사이에서 엇갈린 위치에 있는 두 각이에요. 두 직선이 평행하면 크기가 같아요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '삼각기둥에서 교점의 개수와 교선의 개수를 차례로 나타낸 것은 무엇일까요?',
      choices: ['6개, 9개', '6개, 5개', '5개, 9개', '9개, 6개'],
      answer: 0,
      why: [
        '',
        '5는 면의 개수예요. 교선의 개수는 모서리의 개수와 같아요.',
        '5는 면의 개수예요. 교점의 개수는 꼭짓점의 개수와 같아요.',
        '순서를 바꾸었어요. 교점(꼭짓점) 6개, 교선(모서리) 9개예요.',
      ],
      explain: '평면으로만 둘러싸인 입체도형에서 교점의 개수는 꼭짓점의 개수, 교선의 개수는 모서리의 개수와 같아요. 삼각기둥은 꼭짓점 6개, 모서리 9개예요.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '선분 AB와 선분 BA는 같은 도형이에요.',
      answer: true,
      explain: '선분은 두 점과 그 사이의 부분이라 방향이 없어요. 그래서 $\\overline{AB}=\\overline{BA}$예요. 반직선은 방향이 있어서 $\\overrightarrow{AB}\\ne\\overrightarrow{BA}$인 것과 달라요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 0,
      q: '세 점 A, B, C가 한 직선 위에 이 순서로 있어요. 다음 중 $\\overrightarrow{AB}$와 같은 것은 무엇일까요?',
      fig: M107.seg([['A', 0], ['B', 0.45], ['C', 1]], [], '한 직선 위에 차례로 놓인 세 점 A, B, C', { lineArrows: true }),
      choices: ['$\\overrightarrow{AC}$', '$\\overrightarrow{BA}$', '$\\overrightarrow{BC}$', '$\\overrightarrow{CA}$'],
      answer: 0,
      why: [
        '',
        '시작점과 방향이 모두 달라요. $\\overrightarrow{BA}$는 B에서 A 쪽으로 뻗어요.',
        '방향은 같지만 시작점이 B예요. $\\overrightarrow{AB}$는 A에서 시작해요.',
        '$\\overrightarrow{CA}$는 C에서 시작해 A 쪽으로 뻗어서 시작점과 방향이 모두 달라요.',
      ],
      explain: '$\\overrightarrow{AB}$는 A에서 시작해 B 쪽(C 쪽)으로 끝없이 뻗어요. $\\overrightarrow{AC}$도 A에서 시작해 같은 쪽으로 뻗으니 같은 반직선이에요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 1,
      q: '두 점 M, N이 선분 AB를 삼등분하는 점이에요. 곧 $\\overline{AM}=\\overline{MN}=\\overline{NB}$예요. $\\overline{AB}=24$ cm일 때 $\\overline{AN}$의 길이는 몇 cm일까요?',
      fig: M107.seg([['A', 0], ['M', 1 / 3], ['N', 2 / 3], ['B', 1]], [[0, 1 / 3], [1 / 3, 2 / 3], [2 / 3, 1]], '선분 AB를 삼등분하는 두 점 M, N'),
      answer: '16',
      wrong: [{ a: '8', why: '$\\overline{AM}$ 하나의 길이만 구했어요. $\\overline{AN}$은 $\\overline{AM}$ 두 개 길이예요.' }, { a: '12', why: '반으로 나누었어요. 세 부분으로 똑같이 나누면 한 부분은 8 cm예요.' }],
      explain: '$\\overline{AM}=\\overline{MN}=\\overline{NB}=24\\div3=8$ (cm)이므로 $\\overline{AN}=8+8=16$ (cm)예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '다음 중 **둔각**은 무엇일까요?',
      choices: ['$135°$', '$90°$', '$45°$', '$180°$'],
      answer: 0,
      why: ['', '$90°$는 직각이에요.', '$45°$는 $90°$보다 작은 예각이에요.', '$180°$는 평각이에요. 둔각은 $180°$보다 작아요.'],
      explain: '둔각은 $90°$보다 크고 $180°$보다 작은 각이에요. 그래서 $135°$가 둔각이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: '°', concept: 2,
      q: '그림에서 세 각은 일직선 위에 나란히 놓여 있어요. $x$의 값을 구해 보세요.',
      fig: M107.rays([50, 120], [[0, 50, '50°'], [50, 120, 'x°', 4], [120, 180, '60°']], '일직선 위에 나란히 놓인 세 각 50°, x°, 60°'),
      answer: '70',
      wrong: [{ a: '130', why: '$50°$만 뺐어요. 세 각의 합이 $180°$이니 $60°$도 빼야 해요.' }],
      explain: '세 각을 합치면 평각이므로 $50+x+60=180$, 곧 $x=70$이에요.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 3,
      q: '선분 AB의 수직이등분선은 선분 AB의 중점을 지나요.',
      answer: true,
      explain: '수직이등분선은 선분의 중점을 지나고 그 선분에 수직인 직선이에요. "이등분"이 선분을 똑같이 둘로 나눈다는 뜻이에요.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 3,
      q: '그림에서 점 P와 직선 $l$ 사이의 거리를 나타내는 선분은 무엇일까요? (점 H는 점 P에서 직선 $l$에 내린 수선의 발이에요.)',
      fig: M107.foot(),
      choices: ['$\\overline{PH}$', '$\\overline{PQ}$', '$\\overline{PR}$', '$\\overline{QH}$'],
      answer: 0,
      why: [
        '',
        '$\\overline{PQ}$는 비스듬한 선분이라 $\\overline{PH}$보다 길어요.',
        '$\\overline{PR}$은 비스듬한 선분이라 $\\overline{PH}$보다 길어요.',
        '$\\overline{QH}$는 직선 $l$ 위의 선분이에요. 점 P를 지나지 않아요.',
      ],
      explain: '점과 직선 사이의 거리는 그 점에서 직선에 내린 수선의 발까지의 거리예요. 그래서 $\\overline{PH}$의 길이예요.',
    },
    {
      id: 'p9', level: 1, type: 'choice', concept: 4,
      q: '그림의 직육면체에서 모서리 AB와 **꼬인 위치**에 있는 모서리는 무엇일까요?',
      fig: M107.cuboid(),
      choices: ['$\\overline{CG}$', '$\\overline{CD}$', '$\\overline{BF}$', '$\\overline{EF}$'],
      answer: 0,
      why: [
        '',
        '$\\overline{CD}$는 $\\overline{AB}$와 평행해요.',
        '$\\overline{BF}$는 $\\overline{AB}$와 점 B에서 만나요.',
        '$\\overline{EF}$는 $\\overline{AB}$와 평행해요.',
      ],
      explain: '모서리 AB와 만나는 모서리(AD, BC, AE, BF)와 평행한 모서리(DC, EF, HG)를 빼면 꼬인 위치에 있는 모서리는 CG, DH, EH, FG예요. 보기 가운데에서는 $\\overline{CG}$예요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '그림의 직육면체에서 모서리 AE와 평행한 면은 모두 몇 개일까요?',
      fig: M107.cuboid(),
      answer: '2',
      hint: '모서리 AE를 포함하는 면, AE와 만나는 면을 먼저 빼 보세요.',
      wrong: [{ a: '3', why: '모서리 AE와 평행한 모서리(BF, CG, DH) 수를 셌어요. 문제는 면의 개수예요.' }, { a: '4', why: '모서리 AE를 포함하는 면은 AE와 평행한 것이 아니에요. 면 ABFE와 면 AEHD는 빼요.' }],
      explain: '면 ABFE와 면 AEHD는 모서리 AE를 포함하고, 면 ABCD와 면 EFGH는 AE와 한 점에서 만나요. 남은 면 BFGC와 면 CGHD가 AE와 평행하므로 2개예요.',
    },
    {
      id: 'p11', level: 2, type: 'ox', concept: 4,
      q: '공간에서 한 직선에 수직인 서로 다른 두 직선은 항상 서로 평행해요.',
      answer: false,
      hint: '직육면체의 한 모서리에 수직인 다른 모서리들을 살펴보세요.',
      explain: '항상 평행한 것은 아니에요. 직육면체에서 모서리 AE에 수직인 모서리 AB와 AD는 점 A에서 만나고, AB와 EH는 꼬인 위치에 있어요. 평면에서라면 평행하지만, 공간에서는 아닐 수 있어요.',
    },
    {
      id: 'p12', level: 1, type: 'choice', concept: 5,
      q: '그림에서 $\\angle c$의 엇각은 무엇일까요?',
      fig: M107.par(62, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], '두 직선 l, m과 직선 n이 만나서 생긴 각 a~h', { arcs: false }),
      choices: ['$\\angle e$', '$\\angle g$', '$\\angle f$', '$\\angle a$'],
      answer: 0,
      why: [
        '',
        '$\\angle g$는 $\\angle c$와 같은 위치에 있는 동위각이에요.',
        '$\\angle f$는 직선 $n$을 기준으로 $\\angle c$와 같은 쪽에 있어요. 엇각은 엇갈린 쪽에 있어요.',
        '$\\angle a$는 $\\angle c$의 맞꼭지각이에요.',
      ],
      explain: '엇각은 두 직선 사이에서 직선 $n$을 사이에 두고 엇갈린 위치에 있는 두 각이에요. Z 모양을 그려 보면 $\\angle c$와 $\\angle e$가 엇각이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 0,
      q: '한 평면 위에 네 점 A, B, C, D가 있고, 어느 세 점도 한 직선 위에 있지 않아요. 이 가운데 두 점을 골라 만들 수 있는 서로 다른 반직선은 모두 몇 개일까요?',
      answer: '12',
      hint: '반직선은 시작점이 다르면 다른 도형이에요. $\\overrightarrow{AB}$와 $\\overrightarrow{BA}$를 따로 세요.',
      wrong: [{ a: '6', why: '직선이나 선분의 개수예요. 반직선은 $\\overrightarrow{AB}$와 $\\overrightarrow{BA}$가 다르니 두 배예요.' }],
      explain: '두 점을 고르는 방법은 AB, AC, AD, BC, BD, CD의 6가지예요. 각각에서 시작점을 어느 쪽으로 하느냐에 따라 반직선이 2개씩 생기므로 $6\\times2=12$ (개)예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '°', concept: 2,
      q: '시계가 3시 40분을 가리킬 때, 시침과 분침이 이루는 각 가운데 작은 쪽 각의 크기를 구해 보세요.',
      fig: { type: 'clock', h: 3, m: 40, alt: '3시 40분을 가리키는 시계' },
      answer: '130',
      hint: '분침은 1분에 $6°$, 시침은 1분에 $0.5°$씩 움직여요. 12를 기준으로 각각 몇 도 돌았는지 구해 보세요.',
      wrong: [{ a: '150', why: '시침이 3에 그대로 있다고 생각했어요. 40분 동안 시침도 $40\\times0.5°=20°$ 움직여요.' }],
      explain: '12를 기준으로 분침은 $6°\\times40=240°$, 시침은 $30°\\times3+0.5°\\times40=110°$ 돌았어요. 두 바늘 사이의 각은 $240°-110°=130°$예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '그림에서 $l\\parallel m$이고, 꺾인 점에서 생긴 각이 $80°$예요. $x$의 값을 구해 보세요.',
      fig: M107.zig(35, 45, '35°', 'x°', '80°', '평행한 두 직선 l, m 사이의 꺾인 선. 위 직선과 35°, 꺾인 점의 각 80°, 아래 직선과 x°'),
      answer: '45',
      hint: '꺾인 점을 지나고 $l$에 평행한 직선을 그어 보세요.',
      wrong: [{ a: '115', why: '$80+35$를 계산했어요. 꺾인 점의 각은 두 엇각의 합이므로 $35+x=80$이에요.' }],
      explain: '꺾인 점을 지나고 $l$에 평행한 직선을 그으면 꺾인 점의 각은 두 엇각으로 나뉘어요. 위쪽은 $35°$, 아래쪽은 $x°$이므로 $35+x=80$, $x=45$예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '쌍', concept: 2,
      q: '서로 다른 세 직선이 한 점에서 만날 때 생기는 맞꼭지각은 모두 몇 쌍일까요?',
      answer: '6',
      hint: '두 직선씩 짝 지어 보세요. 또 두 직선이 이룬 각이 다른 직선에 의해 나뉘어도 맞꼭지각을 이룰 수 있어요.',
      wrong: [{ a: '3', why: '작은 각끼리의 맞꼭지각만 셌어요. 이웃한 두 작은 각을 합친 각끼리도 맞꼭지각이에요.' }],
      explain: '세 직선이 한 점에서 만나면 작은 각이 6개 생겨요. 작은 각 하나끼리 마주 보는 쌍이 3쌍, 이웃한 작은 각 두 개를 합친 각끼리 마주 보는 쌍이 3쌍이므로 모두 6쌍이에요. (두 직선씩 고르는 3가지마다 맞꼭지각이 2쌍씩 생긴다고 세어도 $3\\times2=6$이에요.)',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '공간에서 서로 다른 두 직선 $l$, $m$과 평면 P에 대한 설명으로 **옳은** 것은 무엇일까요?',
      choices: [
        '$l\\perp \\text{P}$이고 $m\\perp \\text{P}$이면 $l\\parallel m$이에요.',
        '$l\\parallel \\text{P}$이고 $m\\parallel \\text{P}$이면 $l\\parallel m$이에요.',
        '$l\\parallel m$이고 $l\\parallel \\text{P}$이면 항상 $m\\parallel \\text{P}$예요.',
        '$l\\perp m$이고 $m\\parallel \\text{P}$이면 $l\\perp \\text{P}$예요.',
      ],
      answer: 0,
      why: [
        '',
        '한 평면에 평행한 두 직선은 만날 수도, 꼬인 위치에 있을 수도 있어요. 교실 천장에 평행한 바닥의 가로 모서리와 세로 모서리는 만나요.',
        '직선 $m$이 평면 P 안에 놓일 수도 있어요. 그러면 평행하다고 하지 않아요.',
        '직육면체 윗면에 평행한 모서리 EF에 수직인 모서리 FG는 윗면에 수직이 아니라 평행해요.',
      ],
      explain: '한 평면에 수직인 두 직선은 서로 평행해요. 교실 바닥에 수직으로 선 기둥들이 서로 평행한 것과 같아요.',
    },
  ],

  deeper: [
    {
      title: '유클리드의 「원론」',
      body: '약 2300년 전 고대 그리스의 수학자 유클리드는 「원론」이라는 책에서 "점은 부분이 없는 것", "선은 폭이 없는 길이"처럼 도형의 기본 요소를 정의하고, 몇 가지 당연한 사실(공리)에서 출발해 수많은 성질을 차례로 증명했어요.\n\n' +
        '"두 점을 지나는 직선은 하나뿐이다", "맞꼭지각의 크기는 같다" 같은 이번 단원의 내용도 그 흐름 속에 있어요. 오늘날 학교에서 배우는 도형의 성질 대부분이 이 책에서 시작되었어요.',
    },
    {
      title: '다음 단원과의 연결',
      body: '이번에 배운 평행선의 엇각을 쓰면 "삼각형의 세 내각의 크기의 합은 $180°$"임을 설명할 수 있어요. 삼각형의 한 꼭짓점을 지나고 마주 보는 변에 평행한 직선을 그으면, 세 내각이 엇각으로 옮겨져 일직선(평각)을 이루기 때문이에요.\n\n' +
        '이 설명은 뒤에 나오는 「평면도형의 성질」 단원에서 자세히 다뤄요.',
    },
  ],

  faq: [
    {
      q: '직선 AB와 선분 AB는 뭐가 달라요?',
      a: '직선 AB는 두 점 A, B를 지나 양쪽으로 끝없이 뻗어 길이를 잴 수 없어요. 선분 AB는 A에서 B까지만이라 길이가 정해져 있어요. 그래서 "두 점 사이의 거리"는 선분 AB의 길이로 정해요.',
    },
    {
      q: '동위각은 항상 크기가 같아요?',
      a: '아니에요. 동위각은 위치로 정한 이름이라 두 직선이 평행하지 않아도 있어요. 크기가 같은 것은 두 직선이 평행할 때뿐이에요. 문제에 $l\\parallel m$ 같은 조건이 있는지 꼭 확인하세요.',
    },
    {
      q: '꼬인 위치는 왜 평면에서는 없어요?',
      a: '한 평면 위의 두 직선은 만나지 않으면 반드시 평행해요. 꼬인 위치는 두 직선이 서로 다른 높이에서 엇갈려 지나가는 경우라서, 한 평면 위에 놓을 수 없어요. 그래서 공간에서만 생겨요.',
    },
    {
      q: '맞꼭지각은 왜 크기가 같아요?',
      a: '두 직선이 만날 때 이웃한 두 각의 합은 일직선이라 $180°$예요. $\\angle a+\\angle b=180°$, $\\angle b+\\angle c=180°$이므로 $\\angle a$와 $\\angle c$는 둘 다 $180°$에서 $\\angle b$를 뺀 값이에요. 그래서 같아요.',
    },
  ],

  mistakes: [
    '반직선 AB와 반직선 BA를 같다고 하는 실수 — 시작점과 방향이 달라 서로 다른 반직선이에요.',
    '평행하다는 조건이 없는데 동위각·엇각의 크기가 같다고 하는 실수 — 두 직선이 평행할 때만 같아요.',
    '꼬인 위치에 있는 모서리를 찾을 때 평행한 모서리까지 세는 실수 — 만나는 것과 평행한 것을 모두 빼요.',
  ],

  gens: [
    {
      id: 'midpoint',
      level: 1,
      title: '선분의 중점과 길이',
      make: function (R) {
        var k = R.int(2, 12);
        var v = R.int(0, 2);
        var AB = 4 * k;
        var fig = M107.seg([['A', 0], ['M', 0.5], ['N', 0.75], ['B', 1]], [], '선분 AB 위의 점 M, N');
        var pre = '점 M은 선분 AB의 중점이고, 점 N은 선분 MB의 중점이에요. ';
        if (v === 0) {
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 1, fig: fig,
            q: pre + '$\\overline{AB}=' + AB + '$ cm일 때 $\\overline{MN}$의 길이는 몇 cm일까요?',
            answer: String(k),
            wrong: [{ a: String(2 * k), why: '$\\overline{MB}$의 길이를 구했어요. 점 N이 선분 MB의 중점이니 한 번 더 반으로 나눠요.' }],
            explain: '$\\overline{MB}=\\frac{1}{2}\\overline{AB}=' + (2 * k) + '$ (cm)이고, $\\overline{MN}=\\frac{1}{2}\\overline{MB}=' + k + '$ (cm)예요.',
          };
        }
        if (v === 1) {
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 1, fig: fig,
            q: pre + '$\\overline{AB}=' + AB + '$ cm일 때 $\\overline{AN}$의 길이는 몇 cm일까요?',
            answer: String(3 * k),
            wrong: [{ a: String(2 * k), why: '$\\overline{AM}$의 길이만 구했어요. $\\overline{AN}=\\overline{AM}+\\overline{MN}$이에요.' }, { a: String(k), why: '$\\overline{MN}$의 길이예요. 여기에 $\\overline{AM}$을 더해야 해요.' }],
            explain: '$\\overline{AM}=\\frac{1}{2}\\times' + AB + '=' + (2 * k) + '$ (cm), $\\overline{MN}=\\frac{1}{2}\\times' + (2 * k) + '=' + k + '$ (cm)이므로 $\\overline{AN}=' + (2 * k) + '+' + k + '=' + (3 * k) + '$ (cm)예요.',
          };
        }
        return {
          type: 'short', check: 'number', unit: 'cm', concept: 1, fig: fig,
          q: pre + '$\\overline{MN}=' + k + '$ cm일 때 $\\overline{AB}$의 길이는 몇 cm일까요?',
          answer: String(AB),
          wrong: [{ a: String(2 * k), why: '$\\overline{MB}$의 길이까지만 구했어요. $\\overline{AB}=2\\overline{MB}$예요.' }],
          explain: '$\\overline{MB}=2\\overline{MN}=' + (2 * k) + '$ (cm)이고, $\\overline{AB}=2\\overline{MB}=' + AB + '$ (cm)예요.',
        };
      },
    },
    {
      id: 'parallel-angle',
      level: 1,
      title: '평행선에서 동위각·엇각으로 각 구하기',
      make: function (R) {
        var TH = [];
        for (var t = 35; t <= 145; t += 5) if (t !== 90) TH.push(t);
        var th = R.pick(TH);
        var s1 = R.int(0, 7), s2 = R.int(0, 7);
        while (s2 === s1) s2 = R.int(0, 7);
        function val(i) { return i % 2 === 0 ? th : 180 - th; }
        var v1 = val(s1), ans = val(s2);
        var labels = [];
        labels[s1] = v1 + '°';
        labels[s2] = 'x°';
        var k1 = s1 % 4, k2 = s2 % 4, same = (s1 < 4) === (s2 < 4), why;
        if (same) {
          why = Math.abs(k1 - k2) === 2 ? '두 각은 맞꼭지각이라 크기가 같아요.' : '두 각은 이웃한 각이라 합이 $180°$예요.';
        } else if (k1 === k2) {
          why = '$l\\parallel m$이고 두 각은 동위각이라 크기가 같아요.';
        } else {
          var top = s1 < 4 ? k1 : k2, bot = s1 < 4 ? k2 : k1;
          if ((top === 2 && bot === 0) || (top === 3 && bot === 1)) why = '$l\\parallel m$이고 두 각은 엇각이라 크기가 같아요.';
          else why = '$x°$인 각의 동위각은 $' + v1 + '°$인 각과 같은 교점에 있어요. 평행선에서 동위각의 크기는 같고, 그 각은 $' + v1 + '°$인 각과 ' +
            (Math.abs(k1 - k2) === 2 ? '맞꼭지각이라 크기가 같아요.' : '이웃한 각이라 합이 $180°$예요.');
        }
        return {
          type: 'short', check: 'number', unit: '°', concept: 5,
          q: '그림에서 $l\\parallel m$일 때, $x$의 값을 구해 보세요.',
          fig: M107.par(th, labels, '평행한 두 직선 l, m과 직선 n이 만나서 생긴 각 가운데 ' + v1 + '°와 x°'),
          answer: String(ans),
          wrong: [{ a: String(180 - ans), why: ans === v1 ? '크기가 같은 두 각인데 $180°$에서 뺐어요. 두 각의 위치 관계를 다시 보세요.' : '두 각의 합이 $180°$인데 크기가 같다고 생각했어요. 위치 관계를 다시 보세요.' }],
          explain: why + ' 따라서 $x=' + (ans === v1 ? String(ans) : '180-' + v1 + '=' + ans) + '$' + R.josa(ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'vertical-angles',
      level: 2,
      title: '맞꼭지각·평각으로 x 구하기',
      make: function (R) {
        var AS = [];
        for (var t = 40; t <= 140; t += 5) if (t !== 90) AS.push(t);
        var A0 = R.pick(AS);
        function lab(a, b) { return (b === 0 ? R.fmt.poly([a, 0]) : '(' + R.fmt.poly([a, b]) + ')') + '°'; }
        if (R.bool()) {
          var a = R.int(1, 5), c = R.int(1, 5);
          while (c === a) c = R.int(1, 5);
          var x0 = R.int(5, Math.floor((A0 + 30) / Math.max(a, c)));
          var b = A0 - a * x0, d = A0 - c * x0;
          var wrong = [];
          var w = R.F(180 - b - d, a + c);
          if (!w.eq(x0)) wrong.push({ a: w.toString(), why: '두 각은 마주 보는 맞꼭지각이라 크기가 같아요. 합이 $180°$인 것은 이웃한 두 각이에요.' });
          return {
            type: 'short', check: 'number', concept: 2,
            q: '그림과 같이 두 직선이 한 점에서 만날 때, $x$의 값을 구해 보세요.',
            fig: M107.cross(A0, [lab(a, b), null, lab(c, d), null], '두 직선이 만나서 생긴 맞꼭지각 ' + lab(a, b) + '와 ' + lab(c, d)),
            answer: String(x0),
            wrong: wrong,
            explain: '두 각은 맞꼭지각이므로 크기가 같아요. $' + R.fmt.poly([a, b]) + '=' + R.fmt.poly([c, d]) + '$' + R.josa(d === 0 ? 'x' : d, '을/를') + ' 풀면 $x=' + x0 + '$' + R.josa(x0, '이에요/예요') + '. (확인: 두 각 모두 $' + A0 + '°$)',
          };
        }
        var a2 = R.int(1, 5), c2 = R.int(1, 5);
        var x1 = R.int(5, Math.min(Math.floor((A0 + 30) / a2), Math.floor((210 - A0) / c2)));
        var b2 = A0 - a2 * x1, d2 = 180 - A0 - c2 * x1;
        var wrong2 = [];
        if (a2 !== c2) {
          var w2 = R.F(d2 - b2, a2 - c2);
          if (!w2.eq(x1)) wrong2.push({ a: w2.toString(), why: '두 각은 이웃한 각이라 합이 $180°$예요. 크기가 같은 것은 마주 보는 맞꼭지각이에요.' });
        }
        var sumC = b2 + d2;
        return {
          type: 'short', check: 'number', concept: 2,
          q: '그림과 같이 두 직선이 한 점에서 만날 때, $x$의 값을 구해 보세요.',
          fig: M107.cross(A0, [lab(a2, b2), lab(c2, d2), null, null], '두 직선이 만나서 생긴 이웃한 두 각 ' + lab(a2, b2) + '와 ' + lab(c2, d2)),
          answer: String(x1),
          wrong: wrong2,
          explain: '두 각은 이웃해서 일직선(평각)을 이루므로 합이 $180°$예요. $(' + R.fmt.poly([a2, b2]) + ')+(' + R.fmt.poly([c2, d2]) + ')=180$, 곧 $' + R.fmt.poly([a2 + c2, sumC]) + '=180$이므로 $x=' + x1 + '$' + R.josa(x1, '이에요/예요') + '. (확인: $' + A0 + '°+' + (180 - A0) + '°=180°$)',
        };
      },
    },
    {
      id: 'zigzag',
      level: 3,
      title: '평행선 사이에서 꺾인 선의 각',
      make: function (R) {
        var al, be;
        do { al = R.int(5, 13) * 5; be = R.int(5, 13) * 5; } while (al + be === 90);
        var s = al + be;
        if (R.bool()) {
          return {
            type: 'short', check: 'number', unit: '°', concept: 5,
            q: '그림에서 $l\\parallel m$일 때, $x$의 값을 구해 보세요.',
            fig: M107.zig(al, be, al + '°', be + '°', 'x°', '평행한 두 직선 l, m 사이의 꺾인 선. 위 직선과 ' + al + '°, 아래 직선과 ' + be + '°, 꺾인 점의 각 x°'),
            answer: String(s),
            hint: '꺾인 점을 지나고 $l$에 평행한 직선을 그어 보세요.',
            wrong: [{ a: String(180 - s), why: '두 각의 합을 $180°$에서 뺐어요. 꺾인 점에 평행선을 그으면 $x°$는 두 엇각의 합이에요.' }],
            explain: '꺾인 점을 지나고 $l$에 평행한 직선을 그으면 $x°$인 각이 두 부분으로 나뉘어요. 위쪽은 $' + al + '°$인 각의 엇각, 아래쪽은 $' + be + '°$인 각의 엇각이에요. 따라서 $x=' + al + '+' + be + '=' + s + '$' + R.josa(s, '이에요/예요') + '.',
          };
        }
        return {
          type: 'short', check: 'number', unit: '°', concept: 5,
          q: '그림에서 $l\\parallel m$일 때, $x$의 값을 구해 보세요.',
          fig: M107.zig(al, be, al + '°', 'x°', s + '°', '평행한 두 직선 l, m 사이의 꺾인 선. 위 직선과 ' + al + '°, 꺾인 점의 각 ' + s + '°, 아래 직선과 x°'),
          answer: String(be),
          hint: '꺾인 점을 지나고 $l$에 평행한 직선을 그어 보세요.',
          wrong: [{ a: String(s + al), why: '두 각을 더했어요. 꺾인 점의 각이 두 엇각의 합이므로 $' + al + '+x=' + s + '$' + R.josa(s, '이에요/예요') + '.' }],
          explain: '꺾인 점을 지나고 $l$에 평행한 직선을 그으면 꺾인 점의 각 $' + s + '°$는 엇각인 $' + al + '°$와 $x°$의 합이에요. $' + al + '+x=' + s + '$이므로 $x=' + be + '$' + R.josa(be, '이에요/예요') + '.',
        };
      },
    },
  ],
});
