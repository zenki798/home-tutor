/* 중3 수학 · 원주각
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 원·원주각·접선은 아래 도우미(cfig)가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  // ---------- 수 도우미 ----------
  // 틀린 답 목록: [[값, 진단], …] → 정답·서로 같은 값·음수를 뺀 wrong 칸
  function wrongs(ans, list) {
    var seen = [Number(ans)], out = [];
    list.forEach(function (w) {
      var v = Number(w[0]);
      if (!isFinite(v) || v <= 0 || seen.some(function (s) { return Math.abs(s - v) < 1e-9; })) return;
      seen.push(v);
      out.push({ a: String(w[0]), why: w[1] });
    });
    return out;
  }

  // ---------- 그림 도우미 (수학 좌표: 원의 중심 (0,0), 반지름 1, y 위쪽 · 각은 도, 반시계) ----------
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function rad(d) { return d * Math.PI / 180; }
  function on(d, k) { k = k === undefined ? 1 : k; return [k * Math.cos(rad(d)), k * Math.sin(rad(d))]; }
  function unit(v) { var l = Math.sqrt(v[0] * v[0] + v[1] * v[1]) || 1; return [v[0] / l, v[1] / l]; }
  // 접점이 t1°, t2° 인 두 접선이 만나는 점
  function tp(t1, t2) { return on((t1 + t2) / 2, 1 / Math.cos(rad((t2 - t1) / 2))); }
  // 중심에서 dir° 방향으로 dist(0~1) 떨어진 현: [한 끝, 다른 끝, 중점]
  function chord(dir, dist) { var h = Math.acos(dist) * 180 / Math.PI; return [on(dir - h), on(dir + h), on(dir, dist)]; }
  function txt(p, s, size) {
    return '<text x="' + r1(p[0]) + '" y="' + r1(p[1]) + '" font-size="' + (size || 14) + '" text-anchor="middle" dominant-baseline="central" fill="currentColor">' + s + '</text>';
  }
  /* o: { S: 반지름 픽셀, pts: {이름: [x,y]}, center: false 면 O 없음, segs: [[p, q, {dash, label, side, color}]],
          rights: [[꼭짓점, p, q]], angs: [[꼭짓점, p, q, 글]], arcs: [[시작°, 끝°, 글?]], lab: {이름: 글자 방향°}, hide: [점 안 찍을 이름] } */
  function cfig(o, alt) {
    var S = o.S || 70, P = {}, out = '', xs = [], ys = [];
    Object.keys(o.pts || {}).forEach(function (k) { P[k] = o.pts[k]; });
    if (o.center !== false && !P.O) P.O = [0, 0];
    function X(p) { return [p[0] * S, -p[1] * S]; }
    function G(n) { return X(typeof n === 'string' ? P[n] : n); }
    function keep(p, w, h) { xs.push(p[0] - w, p[0] + w); ys.push(p[1] - h, p[1] + h); }
    out += '<circle cx="0" cy="0" r="' + S + '" fill="none" stroke="currentColor" stroke-width="2"/>';
    keep([0, 0], S, S);
    (o.arcs || []).forEach(function (a) {
      var sw = ((a[1] - a[0]) % 360 + 360) % 360, p1 = X(on(a[0])), p2 = X(on(a[1]));
      out += '<path d="M' + r1(p1[0]) + ' ' + r1(p1[1]) + ' A' + S + ' ' + S + ' 0 ' + (sw > 180 ? 1 : 0) + ' 0 ' + r1(p2[0]) + ' ' + r1(p2[1]) +
        '" fill="none" stroke="var(--fig-1, #3b82f6)" stroke-width="5" stroke-linecap="round"/>';
      if (a[2]) { var q = X(on(a[0] + sw / 2, 1 + 22 / S)); out += txt(q, a[2], 13); keep(q, 16, 9); }
    });
    (o.segs || []).forEach(function (s) {
      var a = G(s[0]), b = G(s[1]), op = s[2] || {};
      out += '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" stroke="' + (op.color || 'currentColor') +
        '" stroke-width="' + (op.w || 2) + '"' + (op.dash ? ' stroke-dasharray="5 4"' : '') + '/>';
      keep(a, 0, 0); keep(b, 0, 0);
      if (op.label) {
        var m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], n = unit([-(b[1] - a[1]), b[0] - a[0]]);
        var side = op.side || ((n[0] * m[0] + n[1] * m[1]) >= 0 ? 1 : -1);
        var w = String(op.label).length * 3.6 + 3;
        var off = 8 + w * Math.abs(n[0]) + 7 * Math.abs(n[1]);
        var q = [m[0] + n[0] * side * off, m[1] + n[1] * side * off];
        out += txt(q, op.label, 13); keep(q, w, 9);
      }
    });
    (o.rights || []).forEach(function (r) {
      var v = G(r[0]), u = unit([G(r[1])[0] - v[0], G(r[1])[1] - v[1]]), w = unit([G(r[2])[0] - v[0], G(r[2])[1] - v[1]]);
      out += '<path d="M' + r1(v[0] + u[0] * 9) + ' ' + r1(v[1] + u[1] * 9) + ' L' + r1(v[0] + u[0] * 9 + w[0] * 9) + ' ' + r1(v[1] + u[1] * 9 + w[1] * 9) +
        ' L' + r1(v[0] + w[0] * 9) + ' ' + r1(v[1] + w[1] * 9) + '" fill="none" stroke="currentColor" stroke-width="1.4"/>';
    });
    (o.angs || []).forEach(function (r) {
      var v = G(r[0]), u = unit([G(r[1])[0] - v[0], G(r[1])[1] - v[1]]), w = unit([G(r[2])[0] - v[0], G(r[2])[1] - v[1]]);
      var sweep = u[0] * w[1] - u[1] * w[0] > 0 ? 1 : 0, b = unit([u[0] + w[0], u[1] + w[1]]), rr = r[4] || 17;
      out += '<path d="M' + r1(v[0] + u[0] * rr) + ' ' + r1(v[1] + u[1] * rr) + ' A' + rr + ' ' + rr + ' 0 0 ' + sweep + ' ' + r1(v[0] + w[0] * rr) + ' ' + r1(v[1] + w[1] * rr) +
        '" fill="none" stroke="var(--fig-4, #ef4444)" stroke-width="1.6"/>';
      if (r[3]) { var d = rr + 10 + String(r[3]).length * 2.5, q = [v[0] + b[0] * d, v[1] + b[1] * d]; out += txt(q, r[3], 12); keep(q, 12, 8); }
    });
    var hide = o.hide || [];
    Object.keys(P).forEach(function (k) {
      var p = G(k);
      if (hide.indexOf(k) < 0) out += '<circle cx="' + r1(p[0]) + '" cy="' + r1(p[1]) + '" r="2.6" fill="currentColor"/>';
      var dir;
      if (o.lab && o.lab[k] !== undefined) { var t = on(o.lab[k]); dir = [t[0], -t[1]]; }
      else if (P[k][0] === 0 && P[k][1] === 0) dir = unit([-1, -1]);
      else dir = unit([P[k][0], -P[k][1]]);
      var q = [p[0] + dir[0] * 14, p[1] + dir[1] * 14];
      out += txt(q, k, 14); keep(q, 7, 9);
    });
    var x0 = Math.min.apply(null, xs) - 6, x1 = Math.max.apply(null, xs) + 6, y0 = Math.min.apply(null, ys) - 4, y1 = Math.max.apply(null, ys) + 4;
    if (x1 - x0 < 220) { var e = (220 - (x1 - x0)) / 2; x0 -= e; x1 += e; }
    return {
      type: 'svg', alt: alt,
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + r1(x0) + ' ' + r1(y0) + ' ' + r1(x1 - x0) + ' ' + r1(y1 - y0) + '">' + out + '</svg>',
    };
  }

  // 세 자연수의 최대공약수
  function g3(a, b, c) { function g(x, y) { while (y) { var t = x % y; x = y; y = t; } return x; } return g(g(a, b), c); }
  // 두 선분(직선) p1p2, p3p4 의 교점
  function inter(p1, p2, p3, p4) {
    var d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
    var a = p1[0] * p2[1] - p1[1] * p2[0], b = p3[0] * p4[1] - p3[1] * p4[0];
    return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d];
  }

  // ---------- 자주 쓰는 그림 ----------
  var FIG_CENTRAL = cfig({
    pts: { P: on(100), A: on(210), B: on(330) },
    segs: [['P', 'A'], ['P', 'B'], ['O', 'A'], ['O', 'B']],
    angs: [['P', 'A', 'B', 'x', 20], ['O', 'A', 'B', '2x', 16]],
    arcs: [[210, 330]],
    lab: { O: 90 },
  }, '호 AB에 대한 원주각 APB와 중심각 AOB');
  var FIG_SAME = cfig({
    pts: { P: on(60), Q: on(115), R: on(160), A: on(215), B: on(325) },
    segs: [['P', 'A'], ['P', 'B'], ['Q', 'A'], ['Q', 'B'], ['R', 'A'], ['R', 'B']],
    angs: [['P', 'A', 'B', '', 16], ['Q', 'A', 'B', '', 16], ['R', 'A', 'B', '', 16]],
    arcs: [[215, 325]],
    hide: ['O'], center: false,
  }, '호 AB에 대한 원주각 APB, AQB, ARB');
  var FIG_SEMI = cfig({
    pts: { A: on(180), B: on(0), P: on(60) },
    segs: [['A', 'B'], ['P', 'A'], ['P', 'B']],
    rights: [['P', 'A', 'B']],
    lab: { O: -90 },
  }, '지름 AB와 원 위의 점 P');
  var FIG_ARCS = cfig({
    pts: { P: on(115), A: on(200), B: on(260), C: on(300), D: on(0) },
    segs: [['P', 'A'], ['P', 'B'], ['P', 'C'], ['P', 'D']],
    angs: [['P', 'A', 'B', '', 30], ['P', 'C', 'D', '', 22]],
    arcs: [[200, 260], [300, 360]],
    center: false,
  }, '같은 원에서 길이가 같은 두 호 AB, CD와, 점 P에서의 원주각');
  var QC = { A: on(100), B: on(200), C: on(300), D: on(30) };
  QC.E = [QC.C[0] + 0.55 * (QC.C[0] - QC.B[0]), QC.C[1] + 0.55 * (QC.C[1] - QC.B[1])];
  var FIG_CYCLIC = cfig({
    pts: QC,
    segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['C', 'E', { dash: true }]],
    angs: [['A', 'B', 'D', '', 18], ['C', 'D', 'E', '', 18]],
    center: false,
  }, '원에 내접하는 사각형 ABCD와 변 BC의 연장선 위의 점 E');
  var FIG_TANCHORD = cfig({
    pts: { A: [0, -1], B: on(30), P: on(150), T: [1.45, -1], S: [-1.45, -1] },
    segs: [['S', 'T'], ['A', 'B'], ['P', 'A'], ['P', 'B']],
    angs: [['A', 'B', 'T', '', 20], ['P', 'A', 'B', '', 20]],
    arcs: [[270, 390]],
    hide: ['S'], center: false,
    lab: { A: -90, T: -90, S: -90 },
  }, '원 위의 점 A에서 그은 접선 ST와 현 AB, 원 위의 점 P');
  // 두 현 AC, BD 가 점 P 에서 만나는 그림 (호 BC = 70°, 호 AD = 80° 에 맞춘 위치)
  var XC = { D: on(60), A: on(140), B: on(220), C: on(290) };
  XC.P = inter(XC.A, XC.C, XC.B, XC.D);
  var FIG_CROSS = cfig({
    pts: XC,
    segs: [['A', 'C'], ['B', 'D'], ['D', 'C'], ['A', 'B', { dash: true }]],
    angs: [['D', 'B', 'C', '35°', 26], ['C', 'A', 'D', '40°', 26], ['P', 'B', 'C', 'x', 14]],
    center: false, lab: { P: 180 },
  }, '원 위의 네 점 A, B, C, D와 두 현 AC, BD의 교점 P. 각 BDC는 35도, 각 ACD는 40도, 각 BPC는 x');
  // 접선 PA 와 할선 PBC (∠PAB = 40°, ∠APB = 30° 에 맞춘 위치)
  var SC = { A: on(120), B: on(200) };
  SC.P = [SC.A[0] + 2.416 * Math.cos(rad(210)), SC.A[1] + 2.416 * Math.sin(rad(210))];
  (function () {
    var d = [SC.B[0] - SC.P[0], SC.B[1] - SC.P[1]];
    var t = (SC.P[0] * SC.P[0] + SC.P[1] * SC.P[1] - 1) / (d[0] * d[0] + d[1] * d[1]);
    SC.C = [SC.P[0] + t * d[0], SC.P[1] + t * d[1]];
  })();
  var FIG_SECANT = cfig({
    S: 50, pts: SC,
    segs: [['P', 'A'], ['P', 'C'], ['A', 'B'], ['A', 'C']],
    angs: [['P', 'A', 'C', '30°', 30], ['C', 'A', 'B', '40°', 22]],
    center: false, lab: { P: 200 },
  }, '점 P에서 그은 접선 PA와, 점 P를 지나 원과 두 점 B, C에서 만나는 직선. 각 APB는 30도, 각 ACB는 40도');
  // 지름 AB = 10, AP = 6, PB = 8 에 맞춘 위치
  var FIG_SEMI68 = cfig({
    pts: { A: on(180), B: on(0), P: on(106.26) },
    segs: [['A', 'B'], ['P', 'A'], ['P', 'B']],
    rights: [['P', 'A', 'B']],
    lab: { O: -90 },
  }, '지름 AB와 원 위의 점 P');

  Tutor.registerUnit({
    id: 'math-m3-10',
    course: 'math-m3',
    title: '원주각',
    summary: '원주각과 중심각의 관계를 알고, 원주각의 성질을 이용하여 각의 크기와 호의 길이를 구해요.',
    goals: [
      '한 호에 대한 원주각의 크기가 중심각의 크기의 $\\frac{1}{2}$임을 알고 이용할 수 있어요.',
      '한 호에 대한 원주각의 크기가 모두 같고, 반원에 대한 원주각이 직각임을 이용할 수 있어요.',
      '원주각의 크기와 호의 길이 사이의 관계를 이용할 수 있어요.',
      '원에 내접하는 사각형의 성질과 접선과 현이 이루는 각의 성질을 이용해 각의 크기를 구할 수 있어요.',
    ],
    standards: ['[9수03-19]'],

    concepts: [
      {
        title: '원주각과 중심각',
        body: '원 O에서 호 AB 위에 있지 않은 원 위의 점 P에 대하여 $\\angle APB$를 호 AB에 대한 **원주각**이라고 해요. $\\angle AOB$는 호 AB에 대한 **중심각**이에요.\n\n**한 호에 대한 원주각의 크기는 그 호에 대한 중심각의 크기의 $\\frac{1}{2}$이에요.**\n\n$\\angle APB=\\frac{1}{2}\\angle AOB$\n\n**왜 그럴까요?** 점 P를 지나는 지름 PQ를 그어 보세요. $\\overline{OP}=\\overline{OA}$이므로 $\\triangle OPA$는 이등변삼각형이고, 두 밑각을 $a$라 하면 삼각형의 외각인 $\\angle AOQ=2a$예요. 같은 방법으로 $\\angle BOQ=2b$이고 $\\angle APB=a+b$예요. 그래서 $\\angle AOB=2a+2b=2\\angle APB$예요.\n\n예: $\\angle AOB=120°$이면 $\\angle APB=60°$예요.\n\n> 💡 중심각이 $180°$보다 큰 경우(점 P가 짧은 호 위에 있을 때)도 같아요. 예: 중심각이 $250°$이면 원주각은 $125°$예요.',
        easy: '중심 O에서 호 AB를 바라보는 각(중심각)과, 원 둘레의 점 P에서 같은 호 AB를 바라보는 각(원주각)을 비교해 보세요.\n\nP는 O보다 호에서 멀리 떨어져 있어서 호가 더 "좁게" 보여요. 정확히 반만큼 좁게 보인다는 것이 이 성질이에요. 중심각이 $80°$이면 원주각은 $40°$예요.',
        fig: FIG_CENTRAL,
        check: {
          type: 'short', check: 'number', unit: '°',
          q: '원 O에서 호 AB에 대한 중심각 $\\angle AOB$의 크기가 $100°$예요. 호 AB에 대한 원주각 $\\angle APB$의 크기는 몇 도일까요?',
          answer: '50',
          wrong: [
            { a: '100', why: '원주각과 중심각이 같다고 생각했어요. 원주각은 중심각의 $\\frac{1}{2}$이에요.' },
            { a: '200', why: '거꾸로 두 배를 했어요. 원주각은 중심각의 반이에요.' },
          ],
          explain: '원주각은 중심각의 $\\frac{1}{2}$이므로 $\\angle APB=100°\\div2=50°$예요.',
        },
      },
      {
        title: '한 호에 대한 원주각의 크기',
        body: '**한 원에서 한 호에 대한 원주각의 크기는 모두 같아요.**\n\n호 AB 위에 있지 않은 점 P, Q, R을 어디에 잡아도 $\\angle APB=\\angle AQB=\\angle ARB$예요.\n\n**왜 그럴까요?** 원주각은 모두 같은 중심각 $\\angle AOB$의 $\\frac{1}{2}$이기 때문이에요. 중심각은 호 AB 하나로 정해지니, 원주각도 하나로 정해져요.\n\n> 💡 그림에서 같은 호를 "바라보는" 각을 찾으세요. 두 각의 꼭짓점이 원 위에 있고, 두 각의 변이 같은 두 점(A, B)을 지나면 크기가 같아요.',
        easy: '극장의 둥근 객석에서 무대 양 끝 A, B를 바라본다고 생각해 보세요. 객석이 무대를 지나는 원 위에 있다면 어느 자리에 앉든 무대 양 끝이 이루는 각이 똑같아요.\n\n그래서 같은 호를 바라보는 원주각은 꼭짓점이 어디에 있든 크기가 같아요.',
        fig: FIG_SAME,
        check: {
          type: 'ox',
          q: '한 원에서 같은 호 AB에 대한 원주각 $\\angle APB$와 $\\angle AQB$는 점 P, Q의 위치에 따라 크기가 달라져요. (단, P, Q는 호 AB 위에 있지 않아요.)',
          answer: false,
          explain: '한 호에 대한 원주각은 모두 중심각의 $\\frac{1}{2}$이라서 크기가 같아요. 점 P, Q를 어디에 잡아도 $\\angle APB=\\angle AQB$예요.',
        },
      },
      {
        title: '반원에 대한 원주각',
        body: '선분 AB가 원 O의 **지름**이면 호 AB는 반원이고, 반원에 대한 중심각은 $180°$예요. 그래서\n\n**반원에 대한 원주각의 크기는 $90°$예요.** 지름 AB와 원 위의 점 P에 대하여 $\\angle APB=90°$\n\n곧 지름의 양 끝과 원 위의 다른 한 점을 이어 만든 삼각형은 항상 **직각삼각형**이고, 지름이 빗변이에요.\n\n거꾸로, 원주각이 $90°$이면 그 현은 지름이에요.\n\n> 💡 그림에 지름이 보이면 지름의 양 끝과 원 위의 점을 이어 직각을 찾으세요. 피타고라스 정리나 삼각형의 내각의 합을 쓸 수 있어요.',
        easy: '중심각 $180°$는 "일직선"이에요. 원주각은 그 반이니 $90°$, 곧 직각이지요.\n\n지름을 빗변으로 하는 삼각형을 원 안에 그리면, 원 위의 꼭짓점을 어디에 두든 그 꼭짓점의 각은 언제나 직각이에요.',
        fig: FIG_SEMI,
        check: {
          type: 'choice',
          q: '$\\overline{AB}$가 원 O의 지름이고 점 P가 원 위의 점일 때, $\\angle APB$의 크기는 무엇일까요?',
          choices: ['$90°$', '$180°$', '$45°$'],
          answer: 0,
          why: ['', '$180°$는 반원에 대한 중심각이에요. 원주각은 그 반이에요.', '점 P의 위치와 상관없이 $90°$예요. 반원에 대한 중심각 $180°$의 반이에요.'],
          explain: '반원에 대한 중심각은 $180°$이고 원주각은 그 반이므로 $\\angle APB=90°$예요.',
        },
      },
      {
        title: '원주각의 크기와 호의 길이',
        body: '한 원(또는 크기가 같은 원)에서\n\n- **길이가 같은 호에 대한 원주각의 크기는 같아요.**\n- 거꾸로, **크기가 같은 원주각에 대한 호의 길이는 같아요.**\n- **호의 길이는 원주각의 크기에 정비례**해요. 원주각이 2배가 되면 호의 길이도 2배예요.\n\n이것은 중1에서 배운 "호의 길이는 중심각의 크기에 정비례한다"에서 나와요. 원주각은 중심각의 $\\frac{1}{2}$이니 원주각에도 정비례하지요.\n\n예: 원주각이 $20°$인 호의 길이가 3 cm이면, 원주각이 $60°$인 호의 길이는 9 cm예요.\n\n> ⚠️ **현의 길이**는 원주각에 정비례하지 않아요. 정비례하는 것은 **호의 길이**예요.\n\n> 💡 원 둘레를 여러 호로 나누면, 그 호들에 대한 중심각의 합은 $360°$이므로 원주각의 합은 그 반인 $180°$예요. 그래서 원 위의 세 점으로 원 둘레를 세 호로 나누면, 그 호들에 대한 원주각(삼각형의 세 내각)의 합이 $180°$예요.',
        easy: '피자를 생각해 보세요. 테두리(호)가 길수록 조각의 뾰족한 각(중심각)도 커지지요. 원주각은 그 중심각의 반이니, 호가 2배 길면 원주각도 2배예요.\n\n다만 조각을 가로지르는 직선(현)의 길이는 이렇게 딱 2배가 되지 않아요.',
        fig: FIG_ARCS,
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '한 원에서 원주각이 $25°$인 호의 길이가 4 cm예요. 같은 원에서 원주각이 $75°$인 호의 길이는 몇 cm일까요?',
          answer: '12',
          wrong: [{ a: '4', why: '원주각이 커지면 호도 길어져요. 원주각이 3배이므로 호의 길이도 3배예요.' }],
          explain: '$75°$는 $25°$의 3배이고 호의 길이는 원주각의 크기에 정비례하므로 $4\\times3=12$ (cm)예요.',
        },
      },
      {
        title: '원에 내접하는 사각형',
        body: '사각형의 네 꼭짓점이 모두 한 원 위에 있을 때, 사각형이 원에 **내접**한다고 해요.\n\n**원에 내접하는 사각형에서 마주 보는 두 각(대각)의 크기의 합은 $180°$예요.**\n\n$\\angle A+\\angle C=180°,\\quad \\angle B+\\angle D=180°$\n\n**왜 그럴까요?** $\\angle A$와 $\\angle C$는 각각 호 BCD와 호 BAD에 대한 원주각이에요. 두 호를 합하면 원 전체이고, 중심각의 합은 $360°$이니 원주각의 합은 $180°$예요.\n\n또 **한 외각의 크기는 그와 이웃한 내각의 대각의 크기와 같아요.** 변 BC의 연장선 위의 점 E에 대하여 $\\angle DCE=\\angle A$예요. ($\\angle DCE=180°-\\angle C=\\angle A$)\n\n> 💡 거꾸로, 한 쌍의 대각의 합이 $180°$인 사각형은 원에 내접해요.',
        easy: '원에 내접하는 사각형을 대각선으로 가르지 말고, 마주 보는 두 꼭짓점 A와 C를 보세요. A는 원의 한쪽 호를, C는 나머지 호를 바라봐요. 두 호를 합치면 원 한 바퀴(중심각 $360°$)이고, 원주각은 그 반이라서 $\\angle A+\\angle C=180°$예요.',
        fig: FIG_CYCLIC,
        check: {
          type: 'short', check: 'number', unit: '°',
          q: '원에 내접하는 사각형 ABCD에서 $\\angle A=110°$예요. $\\angle C$의 크기는 몇 도일까요?',
          answer: '70',
          wrong: [
            { a: '110', why: '대각의 크기가 같다고 생각했어요. 대각의 크기의 합이 $180°$예요.' },
            { a: '250', why: '$360°$에서 뺐어요. 대각의 합은 $360°$가 아니라 $180°$예요.' },
          ],
          explain: '원에 내접하는 사각형에서 대각의 크기의 합은 $180°$이므로 $\\angle C=180°-110°=70°$예요.',
        },
      },
      {
        title: '접선과 현이 이루는 각',
        body: '원 위의 점 A에서 그은 접선 AT와 현 AB가 이루는 각을 생각해 보세요.\n\n**원의 접선과 그 접점을 지나는 현이 이루는 각의 크기는, 그 각의 내부에 있는 호에 대한 원주각의 크기와 같아요.**\n\n$\\angle BAT=\\angle APB$ (P는 각 BAT의 내부에 있는 호 AB 위에 있지 않은 원 위의 점)\n\n**왜 그럴까요?** 접선은 접점을 지나는 반지름에 수직이에요. 점 A를 지나는 지름 AQ를 그으면 $\\angle QAT=90°$이고, 반원에 대한 원주각 $\\angle ABQ=90°$예요. $\\triangle ABQ$에서 $\\angle BAT=90°-\\angle BAQ=\\angle AQB$이고, $\\angle AQB$는 호 AB에 대한 원주각이라 $\\angle APB$와 같아요.\n\n예: $\\angle BAT=50°$이면 호 AB에 대한 원주각은 $50°$, 중심각 $\\angle AOB$는 $100°$예요.',
        easy: '현 AB 위의 점 B가 원을 따라 점 A 쪽으로 다가간다고 상상해 보세요. 점 B가 A에 거의 붙으면 현 AB는 접선과 거의 같아져요.\n\n그동안 "호 AB에 대한 원주각"이라는 관계는 그대로 유지되기 때문에, 접선과 현이 이루는 각도 원주각처럼 생각할 수 있어요.',
        fig: FIG_TANCHORD,
        check: {
          type: 'choice',
          q: '직선 AT는 원의 접선이고 점 A는 접점이에요. 현 AB에 대하여 $\\angle BAT=65°$이고, 점 P가 각 BAT의 내부에 있는 호 AB 위에 있지 않은 원 위의 점일 때, $\\angle APB$의 크기는 무엇일까요?',
          choices: ['$65°$', '$130°$', '$25°$'],
          answer: 0,
          why: ['', '중심각 $\\angle AOB$의 크기예요. 원주각은 그 반이에요.', '$90°-65°$를 했어요. 접선과 현이 이루는 각은 그 호에 대한 원주각과 같아요.'],
          explain: '접선과 현이 이루는 각은 그 각의 내부에 있는 호에 대한 원주각과 같으므로 $\\angle APB=\\angle BAT=65°$예요.',
        },
      },
    ],

    examples: [
      {
        q: '원 O에서 $\\angle AOB=140°$이고, 점 P는 호 AB(짧은 호) 위에 있지 않은 원 위의 점이에요. $\\angle APB$의 크기를 구해 보세요. 또 점 Q가 짧은 호 AB 위에 있을 때 $\\angle AQB$의 크기도 구해 보세요.',
        steps: [
          '$\\angle APB$는 짧은 호 AB에 대한 원주각이에요. 중심각이 $140°$이므로 $\\angle APB=140°\\div2=70°$예요.',
          '점 Q는 짧은 호 위에 있으니 $\\angle AQB$는 긴 호 AB에 대한 원주각이에요.',
          '긴 호 AB에 대한 중심각은 $360°-140°=220°$예요.',
          '그래서 $\\angle AQB=220°\\div2=110°$예요. (확인: 사각형 APBQ는 원에 내접하므로 $70°+110°=180°$)',
        ],
        answer: '$\\angle APB=70°$, $\\angle AQB=110°$',
      },
      {
        q: '원 위의 점 A에서 그은 접선 AT와 현 AB가 이루는 각 $\\angle BAT$의 크기가 $35°$예요. 호 AB(각 BAT의 내부에 있는 호)에 대한 중심각 $\\angle AOB$의 크기를 구해 보세요.',
        steps: [
          '접선과 현이 이루는 각은 그 각의 내부에 있는 호에 대한 원주각과 같아요. 그래서 호 AB에 대한 원주각은 $35°$예요.',
          '중심각은 원주각의 2배이므로 $\\angle AOB=2\\times35°=70°$예요.',
          '(다른 방법) $\\angle OAT=90°$이므로 $\\angle OAB=90°-35°=55°$이고, $\\triangle OAB$는 이등변삼각형이라 $\\angle AOB=180°-2\\times55°=70°$예요.',
        ],
        answer: '$70°$',
      },
    ],

    terms: [
      { term: '원주각', def: '원 위의 한 점에서 그은 두 현이 이루는 각이에요. 원 O에서 호 AB 위에 있지 않은 점 P에 대하여 $\\angle APB$를 호 AB에 대한 원주각이라고 해요.' },
      { term: '중심각', def: '원의 두 반지름이 이루는 각이에요. 호 AB에 대한 중심각은 $\\angle AOB$예요. 원주각의 2배예요.' },
      { term: '호', def: '원 위의 두 점 사이의 원의 일부분이에요. 짧은 호와 긴 호가 있어요.' },
      { term: '반원', def: '지름으로 나뉜 원의 절반이에요. 반원에 대한 원주각은 $90°$예요.' },
      { term: '원에 내접하는 사각형', def: '네 꼭짓점이 모두 한 원 위에 있는 사각형이에요. 대각의 크기의 합이 $180°$예요.' },
      { term: '대각', def: '사각형에서 서로 마주 보는 두 각이에요. 사각형 ABCD에서 $\\angle A$와 $\\angle C$, $\\angle B$와 $\\angle D$가 대각이에요.' },
      { term: '외각', def: '다각형의 한 변과 그 이웃한 변의 연장선이 이루는 각이에요. 원에 내접하는 사각형의 한 외각은 그 내대각(이웃한 내각의 대각)과 크기가 같아요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', unit: '°', concept: 0, fig: FIG_CENTRAL,
        q: '원 O에서 호 AB에 대한 중심각 $\\angle AOB$의 크기가 $130°$예요. 호 AB에 대한 원주각 $\\angle APB$의 크기는 몇 도일까요?',
        answer: '65',
        wrong: [
          { a: '130', why: '원주각과 중심각이 같다고 생각했어요. 원주각은 중심각의 $\\frac{1}{2}$이에요.' },
          { a: '260', why: '거꾸로 두 배를 했어요. 원주각이 중심각의 반이에요.' },
        ],
        explain: '원주각은 중심각의 $\\frac{1}{2}$이므로 $\\angle APB=130°\\div2=65°$예요.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1, fig: FIG_SAME,
        q: '세 점 P, Q, R이 호 AB 위에 있지 않은 한 원 위의 점이에요. $\\angle APB=35°$일 때, $\\angle AQB$의 크기는 무엇일까요?',
        choices: ['$35°$', '$70°$', '$17.5°$', '$145°$'],
        answer: 0,
        why: ['', '중심각의 크기예요. $\\angle AQB$도 원주각이에요.', '원주각을 한 번 더 반으로 나누었어요. 같은 호에 대한 원주각끼리는 크기가 같아요.', '$180°$에서 뺐어요. 같은 호에 대한 원주각끼리는 크기가 같아요.'],
        explain: '$\\angle APB$와 $\\angle AQB$는 같은 호 AB에 대한 원주각이므로 크기가 같아요. $\\angle AQB=35°$예요.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 2,
        q: '$\\overline{AB}$가 원의 지름이고 점 P가 원 위의 점(A, B가 아닌 점)이면 $\\triangle APB$는 직각삼각형이에요.',
        answer: true,
        explain: '반원에 대한 원주각은 $90°$이므로 $\\angle APB=90°$예요. 그래서 $\\triangle APB$는 $\\overline{AB}$를 빗변으로 하는 직각삼각형이에요.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', unit: '°', concept: 2, fig: FIG_SEMI,
        q: '$\\overline{AB}$는 원 O의 지름이고 점 P는 원 위의 점이에요. $\\angle PAB=28°$일 때, $\\angle PBA$의 크기는 몇 도일까요?',
        answer: '62',
        wrong: [
          { a: '152', why: '$\\angle APB=90°$를 빼지 않았어요. 반원에 대한 원주각은 $90°$예요.' },
          { a: '28', why: '두 각이 같다고 생각했어요. $\\triangle APB$는 이등변삼각형이 아니라 직각삼각형이에요.' },
        ],
        explain: '반원에 대한 원주각이므로 $\\angle APB=90°$예요. 삼각형의 내각의 합에서 $\\angle PBA=180°-90°-28°=62°$예요.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', unit: '°', concept: 4, fig: FIG_CYCLIC,
        q: '원에 내접하는 사각형 ABCD에서 $\\angle B=105°$예요. $\\angle D$의 크기는 몇 도일까요?',
        answer: '75',
        wrong: [
          { a: '105', why: '대각의 크기가 같다고 생각했어요. 대각의 크기의 합이 $180°$예요.' },
          { a: '255', why: '$360°$에서 뺐어요. 대각의 합은 $180°$예요.' },
        ],
        explain: '$\\angle B$와 $\\angle D$는 대각이므로 합이 $180°$예요. $\\angle D=180°-105°=75°$예요.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '한 원에서 원주각이 $20°$인 호 AB의 길이가 6 cm예요. 같은 원에서 원주각이 $40°$인 호 CD의 길이는 무엇일까요?',
        choices: ['12 cm', '6 cm', '3 cm', '24 cm'],
        answer: 0,
        why: ['', '원주각이 커지면 호도 길어져요. 호의 길이는 원주각의 크기에 정비례해요.', '거꾸로 생각했어요. 원주각이 2배이면 호의 길이도 2배예요.', '4배를 했어요. $40°$는 $20°$의 2배예요.'],
        explain: '호의 길이는 원주각의 크기에 정비례해요. $40°$는 $20°$의 2배이므로 호 CD의 길이는 $6\\times2=12$ (cm)예요.',
      },
      {
        id: 'p7', level: 1, type: 'ox', concept: 5,
        q: '원의 접선과 그 접점을 지나는 현이 이루는 각의 크기는, 그 각의 내부에 있는 호에 대한 **중심각**의 크기와 같아요.',
        answer: false,
        explain: '중심각이 아니라 **원주각**과 같아요. 예를 들어 접선과 현이 이루는 각이 $40°$이면 그 호에 대한 원주각이 $40°$, 중심각은 $80°$예요.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', unit: '°', concept: 0,
        fig: cfig({
          S: 95, pts: { A: on(215), B: on(325), P: on(270) },
          segs: [['O', 'A'], ['O', 'B'], ['P', 'A'], ['P', 'B']],
          angs: [['O', 'A', 'B', '110°', 16], ['P', 'A', 'B', 'x', 14]],
          lab: { O: 90, P: -90 },
        }, '원 O에서 중심각 AOB는 110도이고, 점 P는 짧은 호 AB 위에 있어요. 각 APB는 x'),
        q: '원 O에서 $\\angle AOB=110°$이고, 점 P는 짧은 호 AB 위에 있어요. $\\angle APB$의 크기 $x$는 몇 도일까요?',
        answer: '125',
        wrong: [
          { a: '55', why: '짧은 호 AB에 대한 원주각을 구했어요. 점 P가 짧은 호 위에 있으므로 $\\angle APB$는 긴 호에 대한 원주각이에요.' },
          { a: '250', why: '긴 호에 대한 중심각을 구했어요. 원주각은 그 반이에요.' },
        ],
        hint: '점 P가 바라보는 호는 짧은 호일까요, 긴 호일까요?',
        explain: '점 P가 짧은 호 위에 있으므로 $\\angle APB$는 긴 호 AB에 대한 원주각이에요. 긴 호에 대한 중심각은 $360°-110°=250°$이므로 $x=250°\\div2=125°$예요.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: '°', concept: 4, fig: FIG_CYCLIC,
        q: '원에 내접하는 사각형 ABCD에서 변 BC의 연장선 위에 점 E가 있어요. $\\angle DCE=75°$, $\\angle ABC=80°$일 때, $\\angle ADC$의 크기는 몇 도일까요?',
        answer: '100',
        wrong: [
          { a: '80', why: '$\\angle ABC$와 같다고 생각했어요. $\\angle ADC$는 $\\angle ABC$의 대각이므로 합이 $180°$예요.' },
          { a: '105', why: '$\\angle BCD$를 구했어요. 묻는 것은 $\\angle ADC$예요.' },
        ],
        hint: '$\\angle ADC$와 마주 보는 각을 찾아보세요.',
        explain: '$\\angle ADC$와 $\\angle ABC$는 대각이므로 $\\angle ADC=180°-80°=100°$예요. ($\\angle DCE=75°$는 $\\angle BAD$와 같다는 것을 알려 줘요. 확인: $\\angle BCD=105°$이고 $75°+105°=180°$)',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 5,
        fig: cfig({
          pts: { A: [0, -1], B: on(10), P: on(150), T: [1.45, -1], S: [-1.45, -1] },
          segs: [['S', 'T'], ['A', 'B'], ['P', 'A'], ['P', 'B']],
          angs: [['A', 'B', 'T', '50°', 22], ['A', 'P', 'B', '70°', 18]],
          hide: ['S'], center: false,
          lab: { A: -90, T: -90, S: -90 },
        }, '원 위의 점 A에서 그은 접선 ST. 각 BAT는 50도, 각 PAB는 70도'),
        q: '직선 ST는 원 위의 점 A에서 그은 접선이에요. 원 위의 두 점 B, P에 대하여 $\\angle BAT=50°$, $\\angle PAB=70°$일 때, $\\angle ABP$의 크기는 무엇일까요?',
        choices: ['$60°$', '$50°$', '$70°$', '$80°$'],
        answer: 0,
        why: ['', '$\\angle APB$의 크기예요. $\\angle ABP$는 삼각형의 내각의 합으로 구해요.', '$\\angle PAB$와 같다고 생각했어요. $\\triangle ABP$의 세 각을 모두 따져 보세요.', '$\\angle APB$를 $30°$로 잘못 보았어요. $\\angle APB=\\angle BAT=50°$예요.'],
        hint: '먼저 $\\angle APB$를 접선과 현이 이루는 각으로 구해요.',
        explain: '접선과 현이 이루는 각의 성질로 $\\angle APB=\\angle BAT=50°$예요. $\\triangle ABP$에서 $\\angle ABP=180°-70°-50°=60°$예요.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', unit: '°', concept: 1, fig: FIG_CROSS,
        q: '원 위의 네 점 A, B, C, D에 대하여 두 현 AC, BD가 점 P에서 만나요. $\\angle BDC=35°$, $\\angle ACD=40°$일 때, $\\angle BPC$의 크기 $x$는 몇 도일까요?',
        answer: '75',
        wrong: [
          { a: '105', why: '$\\angle BPC$ 대신 $\\angle CPD$를 구했어요. 맞꼭지각과 이웃한 각을 구별해 보세요.' },
          { a: '40', why: '한 각만 옮겼어요. $\\angle BPC$는 $\\triangle ABP$의 외각이므로 두 내각의 합이에요.' },
        ],
        hint: '$\\angle BAC$와 $\\angle ABD$는 각각 어느 각과 같은 호에 대한 원주각일까요?',
        explain: '$\\angle BAC=\\angle BDC=35°$(호 BC에 대한 원주각), $\\angle ABD=\\angle ACD=40°$(호 AD에 대한 원주각)예요. $\\angle BPC$는 $\\triangle ABP$의 한 외각이므로 $x=35°+40°=75°$예요.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', unit: '°', concept: 3,
        q: '삼각형 ABC의 세 꼭짓점이 원 위에 있어요. 점 A를 포함하지 않는 호 BC의 길이가 점 C를 포함하지 않는 호 AB의 길이의 $\\frac{3}{2}$배이고, $\\angle ACB=30°$예요. $\\angle BAC$의 크기는 몇 도일까요?',
        answer: '45',
        wrong: [
          { a: '20', why: '비를 거꾸로 적용했어요. 호 BC가 호 AB보다 길므로 $\\angle BAC$가 $\\angle ACB$보다 커요.' },
          { a: '90', why: '중심각을 구했어요. 원주각은 그 반이에요.' },
        ],
        hint: '$\\angle BAC$는 호 BC에 대한 원주각, $\\angle ACB$는 호 AB에 대한 원주각이에요.',
        explain: '$\\angle BAC$는 호 BC에, $\\angle ACB$는 호 AB에 대한 원주각이에요. 원주각의 크기는 호의 길이에 정비례하므로 $\\angle BAC=30°\\times\\frac{3}{2}=45°$예요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: '°', concept: 2,
        fig: cfig({
          pts: { A: on(180), B: on(0), C: on(50), D: on(300) },
          segs: [['A', 'B'], ['A', 'C'], ['C', 'B'], ['A', 'D'], ['D', 'C']],
          angs: [['A', 'C', 'B', '25°', 22], ['D', 'A', 'C', 'x', 16]],
          lab: { O: 90 },
        }, '지름 AB와 원 위의 점 C, D. 각 CAB는 25도, 각 ADC는 x'),
        q: '$\\overline{AB}$는 원 O의 지름이고, 점 C, D는 원 위의 점이에요. 점 D는 현 AC에 대하여 점 B와 같은 쪽에 있어요. $\\angle CAB=25°$일 때, $\\angle ADC$의 크기 $x$는 몇 도일까요?',
        answer: '65',
        wrong: [
          { a: '25', why: '$\\angle CAB$와 같다고 생각했어요. $\\angle ADC$는 호 AC에 대한 원주각이라 $\\angle ABC$와 같아요.' },
          { a: '115', why: '$180°-65°$를 했어요. 점 D와 점 B는 같은 쪽에 있으므로 두 원주각은 크기가 같아요.' },
        ],
        hint: '반원에 대한 원주각 $\\angle ACB$부터 구해 보세요.',
        explain: '$\\overline{AB}$가 지름이므로 $\\angle ACB=90°$이고 $\\angle ABC=180°-90°-25°=65°$예요. $\\angle ADC$와 $\\angle ABC$는 같은 호 AC에 대한 원주각이므로 $x=65°$예요.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: '°', concept: 4,
        fig: cfig({
          pts: { A: on(90), B: on(160), C: on(230), D: on(310), E: on(20) },
          segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'A'], ['O', 'C', { dash: true }], ['O', 'D', { dash: true }]],
          angs: [['O', 'C', 'D', '80°', 16]],
          lab: { O: 90 },
        }, '원 O에 내접하는 오각형 ABCDE. 중심각 COD는 80도'),
        q: '오각형 ABCDE의 다섯 꼭짓점이 원 O 위에 있어요. $\\angle COD=80°$일 때, $\\angle B+\\angle E$의 크기는 몇 도일까요?',
        answer: '220',
        wrong: [
          { a: '180', why: '사각형처럼 대각의 합으로 생각했어요. 오각형에서는 대각선 AD를 그어 사각형 ABCD와 삼각형 ACD로 나누어 생각해요.' },
          { a: '260', why: '중심각 $80°$를 그대로 더했어요. $\\angle CAD$는 원주각이라 $40°$예요.' },
        ],
        hint: '대각선 AC, AD를 그어 보세요. 사각형 ABCD와 사각형 ACDE는 모두 원에 내접해요.',
        explain: '대각선 AC, AD를 그어요. 사각형 ABCD는 원에 내접하므로 $\\angle B+\\angle ADC=180°$, 사각형 ACDE도 원에 내접하므로 $\\angle E+\\angle ACD=180°$예요. 더하면 $\\angle B+\\angle E=360°-(\\angle ADC+\\angle ACD)$이고, $\\triangle ACD$에서 $\\angle ADC+\\angle ACD=180°-\\angle CAD$예요. $\\angle CAD=80°\\div2=40°$이므로 $\\angle B+\\angle E=360°-140°=220°$예요.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', unit: '°', concept: 5, fig: FIG_SECANT,
        q: '점 P에서 원에 그은 접선의 접점을 A라 하고, 점 P를 지나는 직선이 원과 두 점 B, C에서 만나요(점 B가 P에 더 가까워요). $\\angle APB=30°$, $\\angle ACB=40°$일 때, $\\angle ABC$의 크기는 몇 도일까요?',
        answer: '70',
        wrong: [
          { a: '110', why: '$\\angle ABP$를 구했어요. $\\angle ABC$는 그 이웃한 각으로 $180°-110°$예요.' },
          { a: '40', why: '$\\angle PAB$를 구했어요. $\\angle ABC$는 $\\triangle PAB$의 외각이에요.' },
        ],
        hint: '접선 PA와 현 AB가 이루는 각 $\\angle PAB$는 어떤 원주각과 같을까요?',
        explain: '접선과 현이 이루는 각의 성질로 $\\angle PAB=\\angle ACB=40°$예요. $\\angle ABC$는 $\\triangle PAB$의 한 외각이므로 $\\angle ABC=\\angle APB+\\angle PAB=30°+40°=70°$예요.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: '°', concept: 3,
        q: '삼각형 ABC의 세 꼭짓점이 원 위에 있고, 세 꼭짓점으로 나뉜 세 호의 길이의 비가 (호 AB) : (호 BC) : (호 CA) $=3:4:5$예요(각 호는 나머지 한 꼭짓점을 포함하지 않아요). 삼각형 ABC에서 가장 큰 각의 크기는 몇 도일까요?',
        answer: '75',
        wrong: [
          { a: '150', why: '중심각을 구했어요. 원주각은 그 반이에요.' },
          { a: '60', why: '호 BC에 대한 원주각 $\\angle A$를 구했어요. 가장 긴 호 CA에 대한 원주각이 가장 커요.' },
        ],
        hint: '세 호에 대한 원주각의 합은 $180°$예요.',
        explain: '세 호에 대한 원주각은 삼각형의 세 내각이고 합은 $180°$예요. 원주각은 호의 길이에 정비례하므로 세 각은 $180°$를 $3:4:5$로 나눈 $45°$, $60°$, $75°$예요. 가장 긴 호 CA에 대한 원주각 $\\angle B=75°$가 가장 커요.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', unit: 'cm²', concept: 2, fig: FIG_SEMI68,
        q: '$\\overline{AB}$는 원 O의 지름이고 길이는 10 cm예요. 원 위의 점 P에 대하여 $\\overline{AP}=6$ cm일 때, $\\triangle APB$의 넓이는 몇 cm²일까요?',
        answer: '24',
        wrong: [
          { a: '30', why: '$\\overline{AP}$와 지름을 밑변과 높이로 썼어요. 직각은 점 P에 있으므로 $\\overline{AP}$와 $\\overline{PB}$가 밑변과 높이예요.' },
          { a: '48', why: '$\\frac{1}{2}$을 곱하지 않았어요.' },
        ],
        hint: '반원에 대한 원주각이 직각이라는 것을 이용해 $\\overline{PB}$를 먼저 구해요.',
        explain: '반원에 대한 원주각이므로 $\\angle APB=90°$예요. 피타고라스 정리로 $\\overline{PB}=\\sqrt{10^2-6^2}=8$ cm이므로 넓이는 $\\frac{1}{2}\\times6\\times8=24$ (cm²)예요.',
      },
    ],

    deeper: [
      {
        title: '탈레스와 반원에 대한 원주각',
        body: '"반원에 대한 원주각은 직각이다"라는 성질은 고대 그리스의 수학자 탈레스가 처음 증명했다고 전해져서 **탈레스의 정리**라고도 불러요.\n\n이 성질을 쓰면 직각을 쉽게 만들 수 있어요. 원을 그리고 지름의 양 끝과 원 위의 아무 점이나 이으면 그 점에서 직각이 생기지요. 거꾸로, 직각자의 두 변이 종이 위의 두 못에 각각 닿도록 하면서 직각자를 움직이면, 직각인 꼭짓점은 두 못을 지름의 양 끝으로 하는 원의 둘레를 따라 움직여요.',
      },
      {
        title: '고등학교에서 만나는 원주각',
        body: '원주각의 성질은 고등학교의 삼각함수에서 다시 나와요. 삼각형의 세 꼭짓점을 지나는 원(외접원)의 반지름을 $R$라 하면\n\n$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$\n\n이 성립하는데(사인법칙), 이를 보이는 핵심이 "한 호에 대한 원주각은 모두 같다"와 "반원에 대한 원주각은 직각이다"예요. 중3에서 배운 삼각비와 원주각이 여기서 만나요.',
      },
    ],

    faq: [
      {
        q: '원주각은 왜 중심각의 반이에요?',
        a: '점 P를 지나는 지름을 그으면 반지름 두 개로 이등변삼각형이 생겨요. 이등변삼각형의 두 밑각을 $a$라 하면 그 삼각형의 외각인 중심 쪽 각은 $2a$가 돼요. 이 관계를 두 번 쓰면 중심각이 원주각의 2배라는 것이 나와요.',
      },
      {
        q: '원주각이 2배가 되면 현의 길이도 2배가 돼요?',
        a: '아니에요. 정비례하는 것은 **호의 길이**예요. 현은 원 위의 두 점을 잇는 곧은 선분이라 원주각이 커져도 같은 비율로 길어지지 않아요. 예를 들어 지름은 반원에 대한 현인데, 반원의 절반 호에 대한 현의 2배보다 짧아요.',
      },
      {
        q: '사각형이 원에 내접하는지 어떻게 알 수 있어요?',
        a: '원에 내접하는 사각형은 대각의 합이 $180°$예요. 거꾸로, 한 쌍의 대각의 합이 $180°$인 사각형은 원에 내접해요. 직사각형·정사각형·등변사다리꼴은 모두 원에 내접하지만, 직사각형이 아닌 평행사변형은 원에 내접하지 않아요.',
      },
    ],

    mistakes: [
      '원주각을 중심각과 같다고 보거나, 중심각을 원주각의 반이라고 거꾸로 계산하는 실수 — 원주각이 중심각의 $\\frac{1}{2}$이에요.',
      '점 P가 짧은 호 위에 있는데 짧은 호의 중심각을 반으로 나누는 실수 — 점 P가 바라보는 호(P가 없는 쪽 호)의 중심각을 써요.',
      '접선과 현이 이루는 각을 중심각과 같다고 보는 실수 — 그 각의 내부에 있는 호에 대한 **원주각**과 같아요.',
    ],

    gens: [
      {
        id: 'central-inscribed',
        level: 1,
        title: '원주각과 중심각',
        make: function (R) {
          var kind = R.int(0, 2), c, x, ans, q, ws, ex, fig = FIG_CENTRAL;
          if (kind === 0) {
            c = R.int(20, 85) * 2; ans = c / 2;
            q = '원 O에서 호 AB에 대한 중심각 $\\angle AOB$의 크기가 $' + c + '°$예요. 호 AB에 대한 원주각 $\\angle APB$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [c, '원주각과 중심각이 같다고 생각했어요. 원주각은 중심각의 $\\frac{1}{2}$이에요.'],
              [2 * c, '거꾸로 두 배를 했어요. 원주각이 중심각의 반이에요.'],
              [180 - c / 2, '$180°$에서 뺐어요. 원주각은 중심각을 2로 나누기만 하면 돼요.'],
            ]);
            ex = '원주각은 중심각의 $\\frac{1}{2}$이므로 $\\angle APB=' + c + '°\\div2=' + ans + '°$예요.';
          } else if (kind === 1) {
            x = R.int(15, 85); ans = 2 * x;
            q = '원 O에서 호 AB에 대한 원주각 $\\angle APB$의 크기가 $' + x + '°$예요. 호 AB에 대한 중심각 $\\angle AOB$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [x, '원주각과 중심각이 같다고 생각했어요. 중심각은 원주각의 2배예요.'],
              [x / 2, '거꾸로 반으로 나누었어요. 중심각이 원주각의 2배예요.'],
              [180 - x, '$180°$에서 뺐어요. 중심각은 원주각의 2배예요.'],
            ]);
            ex = '중심각은 원주각의 2배이므로 $\\angle AOB=2\\times' + x + '°=' + ans + '°$예요.';
          } else {
            c = R.int(30, 80) * 2; ans = 180 - c / 2; fig = undefined;
            q = '원 O에서 $\\angle AOB=' + c + '°$이고, 점 P는 짧은 호 AB 위에 있어요. $\\angle APB$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [c / 2, '짧은 호 AB에 대한 원주각을 구했어요. 점 P가 짧은 호 위에 있으므로 $\\angle APB$는 긴 호에 대한 원주각이에요.'],
              [360 - c, '긴 호에 대한 중심각을 구했어요. 원주각은 그 반이에요.'],
              [c, '중심각을 그대로 썼어요. 점 P가 바라보는 긴 호의 중심각을 반으로 나눠요.'],
            ]);
            ex = '점 P가 짧은 호 위에 있으므로 $\\angle APB$는 긴 호 AB에 대한 원주각이에요. 긴 호에 대한 중심각은 $360°-' + c + '°=' + (360 - c) + '°$이므로 $\\angle APB=' + (360 - c) + '°\\div2=' + ans + '°$예요.';
          }
          var p = { type: 'short', check: 'number', unit: '°', concept: 0, q: q, answer: String(ans), wrong: ws, explain: ex };
          if (fig) p.fig = fig;
          return p;
        },
      },
      {
        id: 'cyclic-quad',
        level: 1,
        title: '원에 내접하는 사각형의 각',
        make: function (R) {
          var x = R.int(50, 130), kind = R.int(0, 2), q, ans, ws, ex;
          if (x === 90) x = 95;
          if (kind < 2) {
            var given = kind === 0 ? 'A' : 'B', ask = kind === 0 ? 'C' : 'D';
            ans = 180 - x;
            q = '원에 내접하는 사각형 ABCD에서 $\\angle ' + given + '=' + x + '°$예요. $\\angle ' + ask + '$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [x, '대각의 크기가 같다고 생각했어요. 대각의 크기의 합이 $180°$예요.'],
              [360 - x, '$360°$에서 뺐어요. 대각의 합은 $180°$예요.'],
            ]);
            ex = '$\\angle ' + given + '$와 $\\angle ' + ask + '$는 대각이므로 합이 $180°$예요. $\\angle ' + ask + '=180°-' + x + '°=' + ans + '°$예요.';
          } else {
            ans = x;
            q = '원에 내접하는 사각형 ABCD에서 변 BC의 연장선 위에 점 E가 있어요. $\\angle BAD=' + x + '°$일 때, $\\angle DCE$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [180 - x, '$\\angle BCD$를 구했어요. $\\angle DCE$는 그 외각이에요.'],
              [360 - x, '$360°$에서 뺐어요. 외각은 내대각과 같아요.'],
            ]);
            ex = '$\\angle BCD=180°-' + x + '°=' + (180 - x) + '°$이므로 외각 $\\angle DCE=180°-' + (180 - x) + '°=' + x + '°$예요. 원에 내접하는 사각형의 한 외각은 내대각 $\\angle BAD$와 같아요.';
          }
          return { type: 'short', check: 'number', unit: '°', concept: 4, fig: FIG_CYCLIC, q: q, answer: String(ans), wrong: ws, explain: ex };
        },
      },
      {
        id: 'tangent-chord',
        level: 2,
        title: '접선과 현이 이루는 각',
        make: function (R) {
          var x = R.int(20, 80), kind = R.int(0, 3), q, ans, ws, ex;
          var pre = '직선 AT는 원 O 위의 점 A에서 그은 접선이고, 점 P는 각 BAT의 내부에 있는 호 AB 위에 있지 않은 원 위의 점이에요. ';
          if (kind === 0) {
            ans = x;
            q = pre + '$\\angle BAT=' + x + '°$일 때, $\\angle APB$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [2 * x, '중심각 $\\angle AOB$를 구했어요. 원주각은 그 반이에요.'],
              [90 - x, '$90°$에서 뺐어요. 접선과 현이 이루는 각은 그 호에 대한 원주각과 같아요.'],
              [180 - x, '$180°$에서 뺐어요. 접선과 현이 이루는 각은 그 호에 대한 원주각과 같아요.'],
            ]);
            ex = '접선과 현이 이루는 각은 그 각의 내부에 있는 호에 대한 원주각과 같아요. 그래서 $\\angle APB=\\angle BAT=' + x + '°$예요.';
          } else if (kind === 1) {
            ans = 2 * x;
            q = pre + '$\\angle BAT=' + x + '°$일 때, $\\angle AOB$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [x, '원주각의 크기를 답했어요. 중심각은 원주각의 2배예요.'],
              [90 - x, '$\\angle OAB$를 구했어요. 묻는 것은 중심각 $\\angle AOB$예요.'],
              [180 - x, '$180°$에서 뺐어요. 먼저 원주각을 찾고 2배를 해요.'],
            ]);
            ex = '호 AB에 대한 원주각은 $\\angle BAT=' + x + '°$와 같고, 중심각은 그 2배이므로 $\\angle AOB=' + ans + '°$예요. (다른 방법: $\\angle OAB=90°-' + x + '°=' + (90 - x) + '°$이고 $\\triangle OAB$는 이등변삼각형이므로 $\\angle AOB=180°-2\\times' + (90 - x) + '°=' + ans + '°$)';
          } else if (kind === 2) {
            ans = x;
            q = pre + '$\\angle AOB=' + (2 * x) + '°$일 때, $\\angle BAT$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [2 * x, '중심각과 같다고 생각했어요. 접선과 현이 이루는 각은 원주각과 같아요.'],
              [90 - x, '$\\angle OAB$를 구했어요. $\\angle BAT=90°-\\angle OAB$예요.'],
              [180 - 2 * x, '$180°$에서 중심각을 뺐어요. 원주각을 먼저 구해 보세요.'],
            ]);
            ex = '호 AB에 대한 원주각은 $' + (2 * x) + '°\\div2=' + x + '°$예요. 접선과 현이 이루는 각은 그 호에 대한 원주각과 같으므로 $\\angle BAT=' + x + '°$예요.';
          } else {
            var y = R.int(30, 150 - x);
            ans = 180 - x - y;
            q = pre + '$\\angle BAT=' + x + '°$, $\\angle PAB=' + y + '°$일 때, $\\angle ABP$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [x, '$\\angle APB$의 크기를 답했어요. $\\angle ABP$는 삼각형의 내각의 합으로 구해요.'],
              [180 - y, '$\\angle APB$를 빼지 않았어요. $\\angle APB=\\angle BAT=' + x + '°$예요.'],
              [180 - y - 2 * x, '$\\angle APB$를 중심각으로 계산했어요. 원주각은 $' + x + '°$예요.'],
            ]);
            ex = '접선과 현이 이루는 각의 성질로 $\\angle APB=\\angle BAT=' + x + '°$예요. $\\triangle ABP$에서 $\\angle ABP=180°-' + y + '°-' + x + '°=' + ans + '°$예요.';
          }
          return { type: 'short', check: 'number', unit: '°', concept: 5, fig: FIG_TANCHORD, q: q, answer: String(ans), wrong: ws, explain: ex };
        },
      },
      {
        id: 'arc-angle',
        level: 3,
        title: '원주각의 크기와 호의 길이',
        make: function (R) {
          var kind = R.int(0, 1), q, ans, ws, ex;
          if (kind === 0) {
            var a = 3, b = 4, c = 5;
            for (var i = 0; i < 60; i++) {
              var a1 = R.int(1, 8), b1 = R.int(1, 8), c1 = R.int(1, 8);
              if (180 % (a1 + b1 + c1) === 0 && !(a1 === b1 && b1 === c1) && g3(a1, b1, c1) === 1) { a = a1; b = b1; c = c1; break; }
            }
            var s = a + b + c, which = R.int(0, 2);
            var angName = ['A', 'B', 'C'][which], arcName = ['BC', 'CA', 'AB'][which], k = [b, c, a][which], kOther = [a, b, c][which];
            ans = 180 * k / s;
            q = '삼각형 ABC의 세 꼭짓점이 원 위에 있어요. 세 꼭짓점으로 나뉜 세 호(각 호는 나머지 한 꼭짓점을 포함하지 않아요)의 길이의 비가 (호 AB) : (호 BC) : (호 CA) $=' + a + ':' + b + ':' + c + '$일 때, $\\angle ' + angName + '$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [360 * k / s, '중심각을 구했어요. 원주각은 그 반이에요.'],
              [180 * kOther / s, '다른 호를 골랐어요. $\\angle ' + angName + '$는 마주 보는 호 ' + arcName + '에 대한 원주각이에요.'],
              [60, '세 각이 같다고 생각했어요. 원주각은 호의 길이에 정비례해요.'],
            ]);
            ex = '세 호에 대한 원주각은 삼각형의 세 내각이므로 합이 $180°$이고, 원주각의 크기는 호의 길이에 정비례해요. $\\angle ' + angName + '$는 호 ' + arcName + '에 대한 원주각이므로 $\\angle ' + angName + '=180°\\times\\frac{' + k + '}{' + s + '}=' + ans + '°$예요.';
            return { type: 'short', check: 'number', unit: '°', concept: 3, q: q, answer: String(ans), wrong: ws, explain: ex,
              hint: '세 호에 대한 원주각의 합은 $180°$예요.' };
          }
          var L = R.pick([36, 40, 45, 60, 72, 90, 120, 180]), xs = [];
          for (var x1 = 10; x1 <= 85; x1 += 5) if ((L * x1) % 180 === 0) xs.push(x1);   // 호의 길이가 자연수가 되는 원주각
          var x = R.pick(xs);
          ans = L * x / 180;
          q = '둘레의 길이가 ' + L + ' cm인 원에서 호 AB에 대한 원주각의 크기가 $' + x + '°$예요. 호 AB의 길이는 몇 cm일까요?';
          ws = wrongs(ans, [
            [L * x / 360, '원주각을 중심각처럼 썼어요. 호 AB에 대한 중심각은 $' + (2 * x) + '°$예요.'],
            [L * x / 90, '중심각을 두 번 곱했어요. 중심각은 원주각의 2배인 $' + (2 * x) + '°$예요.'],
          ]);
          ex = '호 AB에 대한 중심각은 원주각의 2배인 $' + (2 * x) + '°$예요. 호의 길이는 중심각에 정비례하므로 $' + L + '\\times\\frac{' + (2 * x) + '}{360}=' + ans + '$ (cm)예요.';
          return { type: 'short', check: 'number', unit: 'cm', concept: 3, q: q, answer: String(ans), wrong: ws, explain: ex,
            hint: '먼저 호 AB에 대한 중심각을 구해 보세요.' };
        },
      },
    ],
  });
})();
