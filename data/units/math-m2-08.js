/* 중2 수학 · 사각형의 성질
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 아래 도우미 geo() 가 직접 그린 svg (색은 currentColor·var(--fig-n)). 좌표는 수학 좌표(y 위쪽) */
(function () {
  // ---------- 그림 도우미 ----------
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function rad(d) { return d * Math.PI / 180; }
  function dist(p, q) { var dx = p[0] - q[0], dy = p[1] - q[1]; return Math.sqrt(dx * dx + dy * dy); }
  // 삼각형 ABC: B(0, 0), C(1, 0), 꼭짓점 B·C 의 내각 b, c(도)
  function tri(b, c) {
    var a = 180 - b - c, ab = Math.sin(rad(c)) / Math.sin(rad(a));
    return { A: [ab * Math.cos(rad(b)), ab * Math.sin(rad(b))], B: [0, 0], C: [1, 0] };
  }
  function circum(A, B, C) {
    var d = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]));
    var a2 = A[0] * A[0] + A[1] * A[1], b2 = B[0] * B[0] + B[1] * B[1], c2 = C[0] * C[0] + C[1] * C[1];
    return [(a2 * (B[1] - C[1]) + b2 * (C[1] - A[1]) + c2 * (A[1] - B[1])) / d, (a2 * (C[0] - B[0]) + b2 * (A[0] - C[0]) + c2 * (B[0] - A[0])) / d];
  }
  function incenter(A, B, C) {
    var a = dist(B, C), b = dist(C, A), c = dist(A, B), s = a + b + c;
    return [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s];
  }
  // 점 P 에서 직선 QR 에 내린 수선의 발
  function foot(P, Q, R) {
    var dx = R[0] - Q[0], dy = R[1] - Q[1], t = ((P[0] - Q[0]) * dx + (P[1] - Q[1]) * dy) / (dx * dx + dy * dy);
    return [Q[0] + t * dx, Q[1] + t * dy];
  }
  function txt(p, s, size) {
    return '<text x="' + r1(p[0]) + '" y="' + r1(p[1]) + '" font-size="' + (size || 14) + '" text-anchor="middle" dominant-baseline="central" fill="currentColor"' +
      (s === 'x' ? ' font-style="italic"' : '') + '>' + s + '</text>';
  }
  /* o.pts: { 이름: [x, y] }   o.polys: [[이름…]] (첫째는 파란 바탕)   o.lines: [[P, Q, 점선?]]
     o.ticks: [[P, Q, 개수]] 같은 길이 표시   o.rights: [[꼭짓점, P, Q]] 직각 표시
     o.angles: [[꼭짓점, P, Q, 글, 호 개수, 반지름]]   o.circles: [[중심, 반지름(수학 단위)]]   o.dots: [이름]
     o.labels: [이름] (중심에서 바깥쪽으로, o.off[이름] = [dx, dy] 로 직접)   o.texts: [[점|[x, y], 글, dx, dy]] */
  function geo(o) {
    var P = o.pts, keys = Object.keys(P), xs = [], ys = [];
    keys.forEach(function (k) { xs.push(P[k][0]); ys.push(P[k][1]); });
    (o.circles || []).forEach(function (c) { var q = P[c[0]]; xs.push(q[0] - c[1], q[0] + c[1]); ys.push(q[1] - c[1], q[1] + c[1]); });
    var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs), minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    var W = 300, pad = 32, maxH = 230;
    var s = (W - 2 * pad) / Math.max(maxX - minX, 1e-9);
    if ((maxY - minY) * s + 2 * pad > maxH) s = (maxH - 2 * pad) / (maxY - minY);
    var H = Math.round((maxY - minY) * s + 2 * pad);
    var ox = (W - (maxX - minX) * s) / 2;
    function g(k) { var q = typeof k === 'string' ? P[k] : k; return [ox + (q[0] - minX) * s, pad + (maxY - q[1]) * s]; }
    function pt(q) { return r1(q[0]) + ' ' + r1(q[1]); }
    function unit(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1; return [dx / l, dy / l]; }
    var body = '';
    (o.polys || []).forEach(function (pl, i) {
      body += '<path d="M ' + pl.map(function (k) { return pt(g(k)); }).join(' L ') + ' Z" fill="' + (i === 0 ? 'var(--fig-1, #2563eb)' : 'var(--fig-2, #f59e0b)') +
        '" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
    });
    (o.circles || []).forEach(function (c) {
      var q = g(c[0]);
      body += '<circle cx="' + r1(q[0]) + '" cy="' + r1(q[1]) + '" r="' + r1(c[1] * s) + '" fill="none" stroke="var(--fig-3, #10b981)" stroke-width="1.8"/>';
    });
    (o.lines || []).forEach(function (l) {
      var a = g(l[0]), b = g(l[1]);
      body += '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" stroke="currentColor" stroke-width="' + (l[2] ? 1.5 : 2) + '"' +
        (l[2] ? ' stroke-dasharray="5 4"' : '') + '/>';
    });
    (o.ticks || []).forEach(function (t) {
      var a = g(t[0]), b = g(t[1]), u = unit(a, b), nr = [-u[1], u[0]], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], n = t[2] || 1;
      for (var i = 0; i < n; i++) {
        var off = (i - (n - 1) / 2) * 5, c = [m[0] + u[0] * off, m[1] + u[1] * off];
        body += '<line x1="' + r1(c[0] - nr[0] * 6) + '" y1="' + r1(c[1] - nr[1] * 6) + '" x2="' + r1(c[0] + nr[0] * 6) + '" y2="' + r1(c[1] + nr[1] * 6) + '" stroke="currentColor" stroke-width="1.6"/>';
      }
    });
    (o.rights || []).forEach(function (r) {
      var v = g(r[0]), u = unit(v, g(r[1])), w = unit(v, g(r[2])), q = 9;
      body += '<path d="M ' + pt([v[0] + u[0] * q, v[1] + u[1] * q]) + ' L ' + pt([v[0] + (u[0] + w[0]) * q, v[1] + (u[1] + w[1]) * q]) + ' L ' + pt([v[0] + w[0] * q, v[1] + w[1] * q]) +
        '" fill="none" stroke="currentColor" stroke-width="1.5"/>';
    });
    (o.angles || []).forEach(function (an) {
      var v = g(an[0]), p = g(an[1]), q = g(an[2]);
      var a1 = Math.atan2(p[1] - v[1], p[0] - v[0]), a2 = Math.atan2(q[1] - v[1], q[0] - v[0]), d = a2 - a1;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d <= -Math.PI) d += 2 * Math.PI;
      var n = an[4] || 1, r0 = an[5] || 18;
      for (var i = 0; i < n; i++) {
        var r = r0 + i * 4;
        body += '<path d="M ' + pt([v[0] + r * Math.cos(a1), v[1] + r * Math.sin(a1)]) + ' A ' + r + ' ' + r + ' 0 0 ' + (d > 0 ? 1 : 0) + ' ' +
          pt([v[0] + r * Math.cos(a1 + d), v[1] + r * Math.sin(a1 + d)]) + '" fill="none" stroke="var(--fig-4, #ef4444)" stroke-width="1.6"/>';
      }
      if (an[3]) {
        var mid = a1 + d / 2, rr = r0 + (n - 1) * 4 + (Math.abs(d) < 0.7 ? 22 : 15);
        body += txt([v[0] + rr * Math.cos(mid), v[1] + rr * Math.sin(mid)], an[3], 12);
      }
    });
    (o.dots || []).forEach(function (k) { var q = g(k); body += '<circle cx="' + r1(q[0]) + '" cy="' + r1(q[1]) + '" r="2.6" fill="currentColor"/>'; });
    var base = (o.polys && o.polys[0]) || keys, cx = 0, cy = 0;
    base.forEach(function (k) { var q = g(k); cx += q[0] / base.length; cy += q[1] / base.length; });
    (o.labels || []).forEach(function (k) {
      var q = g(k), off = o.off && o.off[k], at;
      if (off) at = [q[0] + off[0], q[1] + off[1]];
      else {
        var u = dist(q, [cx, cy]) < 1 ? [0, 1] : unit([cx, cy], q);
        at = [q[0] + u[0] * 15, q[1] + u[1] * 15];
      }
      body += txt(at, k, 15);
    });
    (o.texts || []).forEach(function (t) { var q = g(t[0]); body += txt([q[0] + (t[2] || 0), q[1] + (t[3] || 0)], t[1], 13); });
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + body + '</svg>', alt: o.alt };
  }
  function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }

  // ---------- 사각형 그림 ----------
  var QUADS = {
    para: { A: [1.2, 2.2], B: [0, 0], C: [4, 0], D: [5.2, 2.2] },
    rect: { A: [0, 2.4], B: [0, 0], C: [4, 0], D: [4, 2.4] },
    rhom: { A: [0, 1.7], B: [-2.4, 0], C: [0, -1.7], D: [2.4, 0] },
    sq: { A: [0, 2.6], B: [0, 0], C: [2.6, 0], D: [2.6, 2.6] },
    trap: { A: [1.3, 2.2], B: [0, 0], C: [4.6, 0], D: [3.3, 2.2] },
    rhom60: { A: [-1.732, 0], B: [0, -1], C: [1.732, 0], D: [0, 1] },
    trap60: { A: [3, 5.196], B: [0, 0], C: [10, 0], D: [7, 5.196] },
  };
  var NEXT = { A: ['D', 'B'], B: ['A', 'C'], C: ['B', 'D'], D: ['C', 'A'] };
  // 직선 P1P2 와 직선 P3P4 의 교점
  function inter(P1, P2, P3, P4) {
    var d = (P1[0] - P2[0]) * (P3[1] - P4[1]) - (P1[1] - P2[1]) * (P3[0] - P4[0]);
    var a = P1[0] * P2[1] - P1[1] * P2[0], b = P3[0] * P4[1] - P3[1] * P4[0];
    return [(a * (P3[0] - P4[0]) - (P1[0] - P2[0]) * b) / d, (a * (P3[1] - P4[1]) - (P1[1] - P2[1]) * b) / d];
  }
  /* 사각형 ABCD. o.diag: 대각선과 교점 O, o.ang: { A: 글 | [글, 호 개수] } 내각 표시, o.sides: { AB: 글 } 변 글,
     o.pts: 더 그릴 점, o.lines·o.angles·o.ticks·o.rights: geo 형식 그대로 */
  function quadFig(kind, o) {
    o = o || {};
    var Q = o.Q || QUADS[kind], pts = { A: Q.A, B: Q.B, C: Q.C, D: Q.D };
    var spec = { pts: pts, polys: [['A', 'B', 'C', 'D']], lines: (o.lines || []).slice(), angles: (o.angles || []).slice(), ticks: o.ticks || [], rights: o.rights || [],
      labels: ['A', 'B', 'C', 'D'], off: {}, texts: [], dots: [] };
    if (o.diag) {
      pts.O = inter(Q.A, Q.C, Q.B, Q.D);
      spec.lines.push(['A', 'C'], ['B', 'D']);
      spec.labels.push('O');
      spec.off.O = o.offO || [0, 15];
    }
    Object.keys(o.pts || {}).forEach(function (k) { pts[k] = o.pts[k]; spec.labels.push(k); if (o.off && o.off[k]) spec.off[k] = o.off[k]; });
    Object.keys(o.ang || {}).forEach(function (k) {
      var v = o.ang[k], lab = Array.isArray(v) ? v[0] : v, n = Array.isArray(v) ? v[1] : 1;
      spec.angles.push([k, NEXT[k][0], NEXT[k][1], lab, n]);
    });
    var G = [(Q.A[0] + Q.B[0] + Q.C[0] + Q.D[0]) / 4, (Q.A[1] + Q.B[1] + Q.C[1] + Q.D[1]) / 4];
    if (o.sides) {
      // 변 글이 그림 밖으로 잘리지 않게 좌우로 빈 자리를 둔다(그리지 않는 점)
      var xs = [Q.A[0], Q.B[0], Q.C[0], Q.D[0]], w = Math.max.apply(null, xs) - Math.min.apply(null, xs);
      pts._L = [Math.min.apply(null, xs) - w * 0.22, G[1]];
      pts._R = [Math.max.apply(null, xs) + w * 0.22, G[1]];
    }
    Object.keys(o.sides || {}).forEach(function (e) {
      // 변의 바깥쪽 법선 방향으로, 글이 길면 가로로 더 띄운다 (화면 좌표: y 아래)
      var P1 = pts[e[0]], P2 = pts[e[1]], M = mid(P1, P2), tx = P2[0] - P1[0], ty = P2[1] - P1[1], tl = Math.sqrt(tx * tx + ty * ty) || 1;
      var nx = -ty / tl, ny = tx / tl;
      if (nx * (M[0] - G[0]) + ny * (M[1] - G[1]) < 0) { nx = -nx; ny = -ny; }
      var px = 12 + String(o.sides[e]).length * 3.6 * Math.abs(nx);
      spec.texts.push([M, o.sides[e], nx * px, -ny * px]);
    });
    spec.alt = o.alt || '사각형 ABCD';
    return geo(spec);
  }
  // 여러 가지 사각형 사이의 관계 (위에서 아래로: 조건이 더해질수록 특별한 사각형)
  function relFig() {
    var N = { q: [160, 22, '사각형'], t: [160, 70, '사다리꼴'], p: [100, 120, '평행사변형'], it: [250, 120, '등변사다리꼴'], r: [50, 172, '직사각형'], h: [150, 172, '마름모'], s: [100, 224, '정사각형'] };
    var body = '';
    function arrow(a, b) {
      var A = N[a], B = N[b], x1 = A[0], y1 = A[1] + 12, x2 = B[0], y2 = B[1] - 13;
      var dx = x2 - x1, dy = y2 - y1, l = Math.sqrt(dx * dx + dy * dy), ux = dx / l, uy = dy / l;
      body += '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="currentColor" stroke-width="1.6"/>';
      body += '<path d="M ' + r1(x2) + ' ' + r1(y2) + ' L ' + r1(x2 - 8 * ux - 4 * uy) + ' ' + r1(y2 - 8 * uy + 4 * ux) + ' L ' + r1(x2 - 8 * ux + 4 * uy) + ' ' + r1(y2 - 8 * uy - 4 * ux) + ' Z" fill="currentColor"/>';
    }
    arrow('q', 't'); arrow('t', 'p'); arrow('t', 'it'); arrow('p', 'r'); arrow('p', 'h'); arrow('r', 's'); arrow('h', 's');
    Object.keys(N).forEach(function (k) {
      var n = N[k], w = n[2].length * 14 + 16;
      body += '<rect x="' + r1(n[0] - w / 2) + '" y="' + (n[1] - 12) + '" width="' + w + '" height="24" rx="6" fill="var(--fig-1, #2563eb)" fill-opacity="0.12" stroke="currentColor" stroke-width="1.4"/>';
      body += txt([n[0], n[1]], n[2], 13);
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 320 244">' + body + '</svg>', alt: '사각형에서 사다리꼴, 평행사변형과 등변사다리꼴, 직사각형과 마름모, 정사각형으로 이어지는 관계도' };
  }

Tutor.registerUnit({
  id: 'math-m2-08',
  course: 'math-m2',
  title: '사각형의 성질',
  summary: '평행사변형의 성질과 조건을 알고, 직사각형, 마름모, 정사각형 등 여러 사각형의 관계를 알아봐요.',
  goals: [
    '평행사변형의 성질을 알고 증명할 수 있어요.',
    '사각형이 평행사변형이 되는 조건을 알고 판단할 수 있어요.',
    '직사각형, 마름모, 정사각형, 등변사다리꼴의 성질을 대각선과 함께 설명할 수 있어요.',
    '여러 가지 사각형 사이의 관계를 이해할 수 있어요.',
  ],
  standards: ['[9수03-11]'],

  concepts: [
    {
      title: '평행사변형의 성질',
      body: '두 쌍의 대변이 각각 평행한 사각형을 **평행사변형**이라고 해요. 평행사변형 ABCD에서 이 성질들이 성립해요.\n\n' +
        '1. 두 쌍의 대변의 길이가 각각 같아요. $\\overline{AB}=\\overline{DC}$, $\\overline{AD}=\\overline{BC}$\n' +
        '2. 두 쌍의 대각의 크기가 각각 같아요. $\\angle A=\\angle C$, $\\angle B=\\angle D$\n' +
        '3. 두 대각선은 서로 다른 것을 이등분해요. $\\overline{OA}=\\overline{OC}$, $\\overline{OB}=\\overline{OD}$\n\n' +
        '**증명(1, 2)** 대각선 AC를 그으면 $\\triangle ABC$와 $\\triangle CDA$에서 $\\overline{AB}\\parallel\\overline{DC}$이므로 $\\angle BAC=\\angle DCA$(엇각), $\\overline{AD}\\parallel\\overline{BC}$이므로 $\\angle BCA=\\angle DAC$(엇각)이고 $\\overline{AC}$는 공통이에요. ASA 합동이므로 $\\overline{AB}=\\overline{CD}$, $\\overline{BC}=\\overline{DA}$, $\\angle B=\\angle D$예요.\n\n' +
        '> 💡 네 내각의 합은 $360°$이고 $\\angle A=\\angle C$, $\\angle B=\\angle D$이므로 **이웃하는 두 내각의 합은 $180°$**예요. $\\angle A+\\angle B=180°$',
      easy: '평행사변형은 직사각형을 옆으로 살짝 민 모양이에요. 책 더미를 옆으로 밀면 위아래 면은 그대로 평행하고 길이도 그대로지요.\n\n' +
        '그래서 마주 보는 변은 길이가 같고, 마주 보는 각도 같아요. 한쪽 각이 뾰족해지면(작아지면) 이웃한 각은 그만큼 넓어져서, 이웃한 두 각을 더하면 늘 $180°$예요.',
      fig: quadFig('para', { diag: true, ticks: [['O', 'A', 1], ['O', 'C', 1], ['O', 'B', 2], ['O', 'D', 2]], ang: { A: '', C: '', B: ['', 2], D: ['', 2] }, alt: '평행사변형 ABCD 와 두 대각선의 교점 O' }),
      check: {
        type: 'short', check: 'number', unit: '°',
        q: '평행사변형 ABCD에서 $\\angle A=110°$일 때, $\\angle B$의 크기는 몇 도일까요?',
        answer: '70',
        wrong: [{ a: '110', why: '$\\angle B$는 $\\angle A$의 대각이 아니라 이웃한 각이에요. 대각은 $\\angle C$예요.' }],
        explain: '이웃하는 두 내각의 합은 $180°$이므로 $\\angle B=180°-110°=70°$예요.',
      },
    },
    {
      title: '평행사변형이 되는 조건',
      body: '사각형이 다음 중 **어느 하나**를 만족하면 평행사변형이에요.\n\n' +
        '1. 두 쌍의 대변이 각각 평행해요. (정의)\n' +
        '2. 두 쌍의 대변의 길이가 각각 같아요.\n' +
        '3. 두 쌍의 대각의 크기가 각각 같아요.\n' +
        '4. 두 대각선이 서로 다른 것을 이등분해요.\n' +
        '5. 한 쌍의 대변이 평행하고, 그 길이가 같아요.\n\n' +
        '예를 들어 4를 증명해 볼까요? $\\overline{OA}=\\overline{OC}$, $\\overline{OB}=\\overline{OD}$이면 $\\angle AOB=\\angle COD$(맞꼭지각)이므로 $\\triangle OAB\\equiv\\triangle OCD$(SAS 합동)예요. 그래서 $\\angle OAB=\\angle OCD$이고, 엇각의 크기가 같으니 $\\overline{AB}\\parallel\\overline{DC}$예요. 같은 방법으로 $\\overline{AD}\\parallel\\overline{BC}$예요.\n\n' +
        '> ⚠️ 5에서는 **같은** 한 쌍의 대변이 평행하고 길이도 같아야 해요. 한 쌍은 평행, **다른** 한 쌍은 길이가 같은 사각형은 등변사다리꼴일 수도 있어요.',
      easy: '"평행사변형인가?"를 확인하는 검사 방법이 다섯 가지 있다고 생각하면 돼요. 이 중 하나만 통과해도 평행사변형이에요.\n\n' +
        '예를 들어 길이가 같은 막대 두 쌍으로 사각형 틀을 만들어 마주 보게 끼우면, 아무리 기울여도 늘 평행사변형이 돼요(조건 2).',
      fig: quadFig('para', { diag: true, ticks: [['O', 'A', 1], ['O', 'C', 1], ['O', 'B', 2], ['O', 'D', 2]], alt: '두 대각선이 서로 다른 것을 이등분하는 사각형 ABCD' }),
      check: {
        type: 'choice',
        q: '사각형 ABCD가 평행사변형이라고 **할 수 없는** 것은 무엇일까요?',
        choices: [
          '$\\overline{AD}\\parallel\\overline{BC}$, $\\overline{AB}=\\overline{DC}$',
          '$\\overline{AB}=\\overline{DC}$, $\\overline{AD}=\\overline{BC}$',
          '$\\overline{AD}\\parallel\\overline{BC}$, $\\overline{AD}=\\overline{BC}$',
        ],
        answer: 0,
        why: [
          '',
          '두 쌍의 대변의 길이가 각각 같으면 평행사변형이에요.',
          '같은 한 쌍의 대변이 평행하고 길이도 같으면 평행사변형이에요.',
        ],
        explain: '평행한 변($\\overline{AD}$, $\\overline{BC}$)과 길이가 같은 변($\\overline{AB}$, $\\overline{DC}$)이 서로 다른 쌍이에요. 이런 사각형은 등변사다리꼴일 수도 있어서 평행사변형이라고 할 수 없어요.',
      },
    },
    {
      title: '직사각형의 성질',
      body: '네 내각의 크기가 모두 같은 사각형을 **직사각형**이라고 해요(네 각이 모두 $90°$).\n\n' +
        '직사각형은 두 쌍의 대각의 크기가 같으므로 평행사변형이에요. 그래서 평행사변형의 성질을 모두 가지고, 하나가 더 있어요.\n\n' +
        '**직사각형의 두 대각선은 길이가 같고, 서로 다른 것을 이등분해요.** 그래서 $\\overline{OA}=\\overline{OB}=\\overline{OC}=\\overline{OD}$예요.\n\n' +
        '(이유: $\\triangle ABC$와 $\\triangle DCB$에서 $\\overline{AB}=\\overline{DC}$, $\\angle B=\\angle C=90°$, $\\overline{BC}$는 공통이므로 SAS 합동이고 $\\overline{AC}=\\overline{DB}$예요.)\n\n' +
        '**평행사변형이 직사각형이 되는 조건**: 한 내각이 직각이거나, 두 대각선의 길이가 같아요.',
      easy: '문틀이 똑바른 직사각형인지 확인할 때 목수는 두 대각선의 길이를 줄자로 재어 봐요. 마주 보는 변의 길이가 같게 짠 틀(평행사변형)이라면, 두 대각선의 길이가 같을 때 네 모서리가 모두 직각이에요.\n\n' +
        '직사각형에서는 대각선이 만나는 점 O에서 네 꼭짓점까지의 거리가 모두 같아요. 그래서 $\\triangle OAB$, $\\triangle OBC$ 같은 삼각형이 모두 이등변삼각형이 돼요.',
      fig: quadFig('rect', { diag: true, ticks: [['O', 'A', 1], ['O', 'B', 1], ['O', 'C', 1], ['O', 'D', 1]], rights: [['B', 'A', 'C'], ['C', 'B', 'D'], ['D', 'C', 'A'], ['A', 'D', 'B']], offO: [0, 16], alt: '직사각형 ABCD 와 길이가 같은 두 대각선' }),
      check: {
        type: 'short', check: 'number', unit: 'cm',
        q: '직사각형 ABCD의 두 대각선의 교점을 O라고 해요. $\\overline{OA}=5$ cm일 때, $\\overline{BD}$의 길이는 몇 cm일까요?',
        answer: '10',
        wrong: [{ a: '5', why: '$\\overline{OB}$의 길이를 구했어요. $\\overline{BD}$는 그 2배예요.' }],
        explain: '직사각형의 두 대각선은 길이가 같고 서로 다른 것을 이등분해요. $\\overline{AC}=2\\times5=10$ (cm)이므로 $\\overline{BD}=10$ cm예요.',
      },
    },
    {
      title: '마름모의 성질',
      body: '네 변의 길이가 모두 같은 사각형을 **마름모**라고 해요.\n\n' +
        '마름모는 두 쌍의 대변의 길이가 같으므로 평행사변형이에요. 그리고 하나가 더 있어요.\n\n' +
        '**마름모의 두 대각선은 서로 다른 것을 수직이등분해요.** $\\overline{AC}\\perp\\overline{BD}$\n\n' +
        '(이유: $\\triangle ABO$와 $\\triangle ADO$에서 $\\overline{AB}=\\overline{AD}$, $\\overline{BO}=\\overline{DO}$, $\\overline{AO}$는 공통이므로 SSS 합동이에요. $\\angle AOB=\\angle AOD$이고 두 각의 합이 $180°$이므로 각각 $90°$예요.)\n\n' +
        '**평행사변형이 마름모가 되는 조건**: 이웃하는 두 변의 길이가 같거나, 두 대각선이 서로 수직이에요.\n\n' +
        '> ⚠️ 마름모의 두 대각선은 수직이지만 길이가 같지는 않아요.',
      easy: '연을 만들 때 대나무 살 두 개를 십자 모양으로 묶지요. 두 살이 서로의 한가운데에서 직각으로 만나게 묶고 끝을 이으면 마름모가 돼요.\n\n' +
        '그래서 마름모의 대각선은 "서로 반으로 나누고, 직각으로 만난다(수직이등분)"예요.',
      fig: quadFig('rhom', { diag: true, ticks: [['A', 'B', 1], ['B', 'C', 1], ['C', 'D', 1], ['D', 'A', 1]], rights: [['O', 'A', 'D']], offO: [-10, 12], alt: '마름모 ABCD 와 서로 수직인 두 대각선' }),
      check: {
        type: 'ox',
        q: '마름모의 두 대각선의 길이는 항상 같아요.',
        answer: false,
        explain: '마름모의 두 대각선은 서로 다른 것을 **수직이등분**하지만, 길이는 같지 않을 수 있어요. 두 대각선의 길이까지 같으면 정사각형이에요.',
      },
    },
    {
      title: '정사각형과 등변사다리꼴',
      body: '네 변의 길이가 모두 같고 네 내각의 크기가 모두 같은 사각형을 **정사각형**이라고 해요. 정사각형은 직사각형이면서 마름모예요. 그래서\n\n' +
        '**정사각형의 두 대각선은 길이가 같고, 서로 다른 것을 수직이등분해요.**\n\n' +
        '- 직사각형이 정사각형이 되는 조건: 이웃하는 두 변의 길이가 같거나, 두 대각선이 서로 수직이에요.\n' +
        '- 마름모가 정사각형이 되는 조건: 한 내각이 직각이거나, 두 대각선의 길이가 같아요.\n\n' +
        '한 쌍의 대변이 평행한 사각형을 **사다리꼴**이라 하고, 그중 아랫변의 양 끝 각의 크기가 같은 사다리꼴을 **등변사다리꼴**이라고 해요. $\\overline{AD}\\parallel\\overline{BC}$, $\\angle B=\\angle C$인 등변사다리꼴 ABCD에서\n\n' +
        '1. 평행하지 않은 두 변의 길이가 같아요. $\\overline{AB}=\\overline{DC}$\n' +
        '2. 두 대각선의 길이가 같아요. $\\overline{AC}=\\overline{DB}$',
      easy: '정사각형은 "직사각형 자격증"과 "마름모 자격증"을 둘 다 가진 사각형이에요. 그래서 대각선도 두 가지 성질(길이가 같다, 수직이다)을 모두 가져요.\n\n' +
        '등변사다리꼴은 좌우가 똑같은 사다리꼴이에요. 가운데에 거울을 세우면 왼쪽과 오른쪽이 꼭 겹쳐서, 양쪽 다리의 길이와 두 대각선의 길이가 같아요.',
      fig: quadFig('trap', { lines: [['A', 'C', true], ['B', 'D', true]], ticks: [['A', 'B', 1], ['D', 'C', 1]], ang: { B: '', C: '' }, alt: '변 AD 와 변 BC 가 평행한 등변사다리꼴 ABCD 와 두 대각선' }),
      check: {
        type: 'choice',
        q: '등변사다리꼴의 성질이 **아닌** 것은 무엇일까요?',
        choices: ['두 대각선이 서로 수직이에요.', '두 대각선의 길이가 같아요.', '평행하지 않은 두 변의 길이가 같아요.'],
        answer: 0,
        why: ['', '등변사다리꼴의 성질이 맞아요. 좌우가 똑같아서 두 대각선의 길이가 같아요.', '등변사다리꼴의 성질이 맞아요. 아랫변의 양 끝 각이 같으면 두 다리의 길이도 같아요.'],
        explain: '등변사다리꼴의 두 대각선은 길이가 같지만 서로 수직인 것은 아니에요. 대각선이 수직인 것은 마름모와 정사각형의 성질이에요.',
      },
    },
    {
      title: '여러 가지 사각형 사이의 관계',
      body: '조건이 하나씩 더해질수록 더 특별한 사각형이 돼요.\n\n' +
        '- 사각형 → 한 쌍의 대변이 평행 → **사다리꼴**\n' +
        '- 사다리꼴 → 다른 한 쌍의 대변도 평행 → **평행사변형**\n' +
        '- 평행사변형 → 한 내각이 직각 또는 두 대각선의 길이가 같다 → **직사각형**\n' +
        '- 평행사변형 → 이웃하는 두 변의 길이가 같다 또는 두 대각선이 수직 → **마름모**\n' +
        '- 직사각형·마름모 → 둘의 조건을 함께 → **정사각형**\n\n' +
        '| 대각선의 성질 | 평행사변형 | 직사각형 | 마름모 | 정사각형 | 등변사다리꼴 |\n|---|---|---|---|---|---|\n' +
        '| 서로 다른 것을 이등분 | O | O | O | O | X |\n| 길이가 같다 | X | O | X | O | O |\n| 서로 수직 | X | X | O | O | X |\n\n' +
        '> 💡 정사각형은 직사각형이고 마름모이며 평행사변형이에요. 거꾸로 직사각형이 모두 정사각형인 것은 아니에요.',
      easy: '사각형 가족을 "자격증"으로 생각해 보세요. 평행사변형 자격증을 딴 사각형이 "직각" 시험을 통과하면 직사각형, "네 변 같음" 시험을 통과하면 마름모가 돼요. 두 시험을 모두 통과하면 정사각형이에요.\n\n' +
        '그래서 정사각형은 위쪽 가족(직사각형, 마름모, 평행사변형, 사다리꼴)의 성질을 모두 물려받아요.',
      fig: relFig(),
      check: {
        type: 'choice',
        q: '두 대각선이 서로 다른 것을 수직이등분하는 사각형이라고 **할 수 없는** 것은 무엇일까요?',
        choices: ['직사각형', '마름모', '정사각형'],
        answer: 0,
        why: ['', '마름모의 두 대각선은 서로 다른 것을 수직이등분해요.', '정사각형은 마름모이기도 해서 두 대각선이 서로 다른 것을 수직이등분해요.'],
        explain: '직사각형의 두 대각선은 길이가 같고 서로 다른 것을 이등분하지만, 일반적으로 수직은 아니에요. 수직이등분은 마름모와 정사각형의 성질이에요.',
      },
    },
  ],

  examples: [
    {
      q: '평행사변형 ABCD에서 $\\angle A:\\angle B=7:2$일 때, $\\angle C$와 $\\angle D$의 크기를 구해 보세요.',
      steps: [
        '이웃하는 두 내각의 합은 $180°$이므로 $\\angle A+\\angle B=180°$예요.',
        '$7:2$로 나누면 $\\angle A=180°\\times\\frac{7}{9}=140°$, $\\angle B=180°\\times\\frac{2}{9}=40°$예요.',
        '대각의 크기는 같으므로 $\\angle C=\\angle A=140°$, $\\angle D=\\angle B=40°$예요.',
      ],
      answer: '$\\angle C=140°$, $\\angle D=40°$',
    },
    {
      q: '직사각형 ABCD의 두 대각선의 교점을 O라고 해요. $\\angle OBC=28°$일 때, $\\angle AOB$의 크기를 구해 보세요.',
      fig: quadFig('rect', { Q: rectQ(62), diag: true, angles: [['B', 'C', 'O', '28°', 1, 26]], offO: [0, 16], alt: '직사각형 ABCD 와 대각선의 교점 O, 각 OBC 는 28도' }),
      steps: [
        '직사각형의 두 대각선은 길이가 같고 서로 다른 것을 이등분하므로 $\\overline{OB}=\\overline{OC}$예요.',
        '$\\triangle OBC$는 이등변삼각형이므로 $\\angle OCB=\\angle OBC=28°$예요.',
        '$\\angle BOC=180°-28°\\times2=124°$예요.',
        '$\\angle AOB$와 $\\angle BOC$는 한 직선 위에서 이웃하므로 $\\angle AOB=180°-124°=56°$예요.',
      ],
      answer: '$56°$',
    },
  ],

  terms: [
    { term: '평행사변형', def: '두 쌍의 대변이 각각 평행한 사각형이에요. 대변의 길이와 대각의 크기가 각각 같고, 두 대각선은 서로 다른 것을 이등분해요.' },
    { term: '대변과 대각', def: '사각형에서 서로 마주 보는 변을 대변, 서로 마주 보는 각을 대각이라고 해요.' },
    { term: '직사각형', def: '네 내각의 크기가 모두 같은 사각형이에요. 두 대각선은 길이가 같고 서로 다른 것을 이등분해요.' },
    { term: '마름모', def: '네 변의 길이가 모두 같은 사각형이에요. 두 대각선은 서로 다른 것을 수직이등분해요.' },
    { term: '정사각형', def: '네 변의 길이가 모두 같고 네 내각의 크기가 모두 같은 사각형이에요. 두 대각선은 길이가 같고 서로 다른 것을 수직이등분해요.' },
    { term: '사다리꼴', def: '한 쌍의 대변이 평행한 사각형이에요.' },
    { term: '등변사다리꼴', def: '아랫변의 양 끝 각의 크기가 같은 사다리꼴이에요. 평행하지 않은 두 변의 길이가 같고, 두 대각선의 길이가 같아요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: '°', concept: 0,
      q: '평행사변형 ABCD에서 $\\angle B=65°$일 때, $\\angle x$($\\angle A$)의 크기는 몇 도일까요?',
      fig: quadFig('para', { Q: paraQ(115), ang: { B: '65°', A: 'x' }, alt: '평행사변형 ABCD, 각 B 는 65도' }),
      answer: '115',
      wrong: [{ a: '65', why: '$\\angle A$는 $\\angle B$의 대각이 아니라 이웃한 각이에요. 이웃한 두 각의 합이 $180°$예요.' }],
      explain: '이웃하는 두 내각의 합은 $180°$이므로 $\\angle A=180°-65°=115°$예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 0,
      q: '평행사변형 ABCD의 두 대각선의 교점을 O라고 해요. $\\overline{AC}=14$ cm, $\\overline{BD}=10$ cm일 때, $\\overline{OB}$의 길이는 몇 cm일까요?',
      fig: quadFig('para', { diag: true, alt: '평행사변형 ABCD 와 두 대각선의 교점 O' }),
      answer: '5',
      wrong: [
        { a: '7', why: '$\\overline{OA}$의 길이를 구했어요. $\\overline{OB}$는 대각선 BD의 절반이에요.' },
        { a: '10', why: '대각선 BD 전체의 길이예요. 두 대각선은 서로 다른 것을 이등분하므로 절반이에요.' },
      ],
      explain: '평행사변형의 두 대각선은 서로 다른 것을 이등분하므로 $\\overline{OB}=\\frac{1}{2}\\overline{BD}=5$ cm예요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '사각형 ABCD가 평행사변형이 되는 조건이 **아닌** 것은 무엇일까요?',
      choices: [
        '$\\overline{AB}\\parallel\\overline{DC}$, $\\overline{AD}=\\overline{BC}$',
        '$\\overline{AB}=\\overline{DC}$, $\\overline{AD}=\\overline{BC}$',
        '$\\angle A=\\angle C$, $\\angle B=\\angle D$',
        '$\\overline{AB}\\parallel\\overline{DC}$, $\\overline{AB}=\\overline{DC}$',
      ],
      answer: 0,
      why: [
        '',
        '두 쌍의 대변의 길이가 각각 같으면 평행사변형이에요.',
        '두 쌍의 대각의 크기가 각각 같으면 평행사변형이에요.',
        '한 쌍의 대변이 평행하고 그 길이가 같으면 평행사변형이에요.',
      ],
      explain: '평행한 쌍($\\overline{AB}$, $\\overline{DC}$)과 길이가 같은 쌍($\\overline{AD}$, $\\overline{BC}$)이 서로 달라요. 이런 사각형은 등변사다리꼴일 수 있으므로 평행사변형이 되는 조건이 아니에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '두 대각선이 서로 다른 것을 이등분하는 사각형은 평행사변형이에요.',
      answer: true,
      explain: '평행사변형이 되는 조건 중 하나예요. 맞꼭지각과 SAS 합동으로 엇각이 같음을 보이면 두 쌍의 대변이 각각 평행해요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 2,
      q: '직사각형 ABCD의 두 대각선의 교점을 O라고 해요. $\\overline{AC}=12$ cm일 때, $\\overline{OB}$의 길이는 몇 cm일까요?',
      answer: '6',
      wrong: [{ a: '12', why: '대각선 전체의 길이예요. $\\overline{OB}$는 대각선 BD의 절반이에요.' }],
      explain: '직사각형의 두 대각선은 길이가 같으므로 $\\overline{BD}=12$ cm이고, 서로 다른 것을 이등분하므로 $\\overline{OB}=6$ cm예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: '°', concept: 3,
      q: '마름모 ABCD의 두 대각선의 교점을 O라고 해요. $\\angle ABO=35°$일 때, $\\angle x$($\\angle BAO$)의 크기는 몇 도일까요?',
      fig: quadFig('rhom', { Q: rhomQ(35), diag: true, angles: [['B', 'A', 'O', '35°', 1, 30], ['A', 'B', 'O', 'x', 1, 22]], offO: [-10, 12], alt: '마름모 ABCD 와 대각선의 교점 O, 각 ABO 는 35도' }),
      answer: '55',
      wrong: [
        { a: '35', why: '두 각이 같다고 생각했어요. $\\angle AOB=90°$이므로 나머지 두 각의 합이 $90°$예요.' },
        { a: '145', why: '$180°-35°$를 계산했어요. $\\angle AOB=90°$도 빼야 해요.' },
      ],
      explain: '마름모의 두 대각선은 서로 수직이므로 $\\angle AOB=90°$예요. $\\angle x=180°-90°-35°=55°$예요.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 4,
      q: '정사각형의 두 대각선은 길이가 같고, 서로 다른 것을 수직이등분해요.',
      answer: true,
      explain: '정사각형은 직사각형(대각선의 길이가 같음)이면서 마름모(대각선이 수직이등분)이므로 두 성질을 모두 가져요.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'number', unit: '°', concept: 4,
      q: '$\\overline{AD}\\parallel\\overline{BC}$인 등변사다리꼴 ABCD에서 $\\angle B=70°$일 때, $\\angle x$($\\angle A$)의 크기는 몇 도일까요?',
      fig: quadFig('trap', { ticks: [['A', 'B', 1], ['D', 'C', 1]], ang: { B: '70°', A: 'x' }, alt: '변 AD 와 변 BC 가 평행한 등변사다리꼴 ABCD, 각 B 는 70도' }),
      answer: '110',
      wrong: [{ a: '70', why: '$\\angle A$와 $\\angle B$가 같다고 생각했어요. 같은 것은 $\\angle B$와 $\\angle C$예요.' }],
      explain: '$\\overline{AD}\\parallel\\overline{BC}$이므로 $\\angle A+\\angle B=180°$예요. $\\angle A=180°-70°=110°$예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 5,
      q: '다음 중 옳지 **않은** 것은 무엇일까요?',
      choices: ['마름모는 정사각형이에요.', '정사각형은 마름모예요.', '직사각형은 평행사변형이에요.', '정사각형은 직사각형이에요.'],
      answer: 0,
      why: [
        '',
        '옳아요. 정사각형은 네 변의 길이가 모두 같으니 마름모예요.',
        '옳아요. 직사각형은 두 쌍의 대각의 크기가 같으니 평행사변형이에요.',
        '옳아요. 정사각형은 네 내각의 크기가 모두 같으니 직사각형이에요.',
      ],
      explain: '마름모는 네 변의 길이만 같으면 돼요. 네 각이 직각이 아닌 마름모가 많으므로 "마름모는 정사각형이다"는 옳지 않아요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '두 대각선의 길이가 같은 사각형을 바르게 모두 고른 것은 무엇일까요?',
      choices: ['직사각형, 정사각형, 등변사다리꼴', '직사각형, 정사각형', '마름모, 정사각형', '평행사변형, 직사각형, 정사각형'],
      answer: 0,
      why: [
        '',
        '등변사다리꼴을 빠뜨렸어요. 등변사다리꼴도 두 대각선의 길이가 같아요.',
        '마름모의 두 대각선은 수직이지만 길이가 같지는 않아요.',
        '평행사변형의 두 대각선은 서로 이등분할 뿐 길이가 같지는 않아요.',
      ],
      explain: '두 대각선의 길이가 같은 것은 직사각형, 정사각형, 등변사다리꼴이에요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 0,
      q: '평행사변형 ABCD에서 $\\overline{AB}=(2x+3)$ cm, $\\overline{DC}=(5x-6)$ cm일 때, $\\overline{AB}$의 길이는 몇 cm일까요?',
      fig: quadFig('para', { sides: { AB: '(2x+3) cm', DC: '(5x-6) cm' }, alt: '평행사변형 ABCD 의 두 변 AB, DC 의 길이를 x 로 나타낸 그림' }),
      answer: '9',
      hint: '평행사변형의 대변의 길이는 같아요. 식을 세워 $x$부터 구해요.',
      wrong: [{ a: '3', why: '$x$의 값을 구했어요. 이 값을 $2x+3$에 넣어 길이를 구해요.' }],
      explain: '대변의 길이가 같으므로 $2x+3=5x-6$, $3x=9$, $x=3$이에요. $\\overline{AB}=2\\times3+3=9$ (cm)예요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: '°', concept: 2,
      q: '직사각형 ABCD의 두 대각선의 교점을 O라고 해요. $\\angle OAB=32°$일 때, $\\angle x$($\\angle AOD$)의 크기는 몇 도일까요?',
      fig: quadFig('rect', { Q: rectQ(32), diag: true, angles: [['A', 'B', 'O', '32°', 1, 26], ['O', 'A', 'D', 'x', 1, 16]], offO: [0, 16], alt: '직사각형 ABCD 와 대각선의 교점 O, 각 OAB 는 32도' }),
      answer: '64',
      hint: '$\\overline{OA}=\\overline{OB}$이므로 $\\triangle OAB$는 이등변삼각형이에요.',
      wrong: [
        { a: '116', why: '$\\angle AOB$를 구했어요. $\\angle AOD$는 그 이웃한 각이에요.' },
        { a: '32', why: '$\\angle AOD$는 $\\angle OAB$와 같지 않아요. 먼저 $\\triangle OAB$의 꼭지각을 구해요.' },
      ],
      explain: '$\\overline{OA}=\\overline{OB}$이므로 $\\angle OBA=32°$이고 $\\angle AOB=180°-64°=116°$예요. $\\angle x=180°-116°=64°$예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 0,
      q: '평행사변형 ABCD에서 $\\angle A$의 이등분선이 변 BC와 만나는 점을 E라고 해요. $\\overline{AB}=6$ cm, $\\overline{AD}=10$ cm일 때, $\\overline{EC}$의 길이는 몇 cm일까요?',
      fig: quadFig('para', { pts: { E: [2.5, 0] }, off: { E: [0, 15] }, lines: [['A', 'E']], angles: [['A', 'B', 'E', '', 1, 22], ['A', 'E', 'D', '', 1, 26]], sides: { AB: '6 cm', AD: '10 cm' }, alt: '평행사변형 ABCD 와 각 A 의 이등분선 AE' }),
      answer: '4',
      hint: '$\\angle DAE$와 $\\angle AEB$는 엇각이에요. $\\triangle ABE$는 어떤 삼각형일까요?',
      wrong: [
        { a: '6', why: '$\\overline{BE}$의 길이를 구했어요. $\\overline{EC}=\\overline{BC}-\\overline{BE}$예요.' },
        { a: '5', why: '점 E가 변 BC의 중점이라고 생각했어요. $\\triangle ABE$가 이등변삼각형임을 이용해요.' },
      ],
      explain: '$\\overline{AD}\\parallel\\overline{BC}$이므로 $\\angle DAE=\\angle AEB$(엇각)이고, $\\angle BAE=\\angle DAE$이므로 $\\angle BAE=\\angle BEA$예요. $\\triangle ABE$는 이등변삼각형이라 $\\overline{BE}=\\overline{AB}=6$ cm예요. $\\overline{BC}=\\overline{AD}=10$ cm이므로 $\\overline{EC}=10-6=4$ (cm)예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm²', concept: 0,
      q: '평행사변형 ABCD의 두 대각선의 교점을 O라고 해요. $\\triangle AOB$의 넓이가 8 cm²일 때, 평행사변형 ABCD의 넓이는 몇 cm²일까요?',
      fig: quadFig('para', { diag: true, alt: '평행사변형 ABCD 와 두 대각선의 교점 O' }),
      answer: '32',
      hint: '$\\overline{OA}=\\overline{OC}$이므로 $\\triangle AOB$와 $\\triangle COB$는 밑변의 길이와 높이가 같아요.',
      wrong: [
        { a: '16', why: '삼각형 두 개만 더했어요. 두 대각선이 평행사변형을 넓이가 같은 삼각형 4개로 나눠요.' },
        { a: '24', why: '삼각형 세 개만 더했어요. 두 대각선으로 나뉜 삼각형은 4개예요.' },
      ],
      explain: '$\\overline{OA}=\\overline{OC}$이므로 $\\triangle AOB$와 $\\triangle COB$는 밑변($\\overline{OA}$, $\\overline{OC}$)의 길이와 높이가 같아 넓이가 같아요. 같은 방법으로 네 삼각형의 넓이가 모두 8 cm²이므로 평행사변형의 넓이는 $8\\times4=32$ (cm²)예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 3,
      q: '둘레의 길이가 40 cm인 마름모 ABCD에서 $\\angle A=60°$예요. 대각선 BD의 길이는 몇 cm일까요?',
      fig: quadFig('rhom60', { lines: [['B', 'D', true]], ticks: [['A', 'B', 1], ['B', 'C', 1], ['C', 'D', 1], ['D', 'A', 1]], ang: { A: '60°' }, alt: '각 A 가 60도인 마름모 ABCD 와 대각선 BD' }),
      answer: '10',
      hint: '$\\triangle ABD$에서 $\\overline{AB}=\\overline{AD}$이고 $\\angle A=60°$예요.',
      wrong: [
        { a: '20', why: '대각선이 한 변의 2배라고 생각했어요. $\\triangle ABD$가 어떤 삼각형인지 살펴보세요.' },
        { a: '5', why: '대각선 BD의 절반인 $\\overline{BO}$를 구했어요. $\\triangle ABD$가 정삼각형이므로 $\\overline{BD}$는 한 변의 길이 $40\\div4=10$ (cm)와 같아요.' },
      ],
      explain: '한 변의 길이는 $40\\div4=10$ (cm)예요. $\\triangle ABD$에서 $\\overline{AB}=\\overline{AD}$이므로 $\\angle ABD=\\angle ADB=(180°-60°)\\div2=60°$예요. 세 각이 모두 $60°$인 정삼각형이므로 $\\overline{BD}=10$ cm예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
      q: '$\\overline{AD}\\parallel\\overline{BC}$인 등변사다리꼴 ABCD에서 $\\overline{AD}=4$ cm, $\\overline{BC}=10$ cm, $\\angle B=60°$예요. $\\overline{AB}$의 길이는 몇 cm일까요?',
      fig: quadFig('trap60', { ticks: [['A', 'B', 1], ['D', 'C', 1]], ang: { B: '60°' }, sides: { AD: '4 cm', BC: '10 cm' }, alt: '윗변 4 cm, 아랫변 10 cm, 각 B 가 60도인 등변사다리꼴 ABCD' }),
      answer: '6',
      hint: '점 D를 지나고 $\\overline{AB}$에 평행한 직선을 그어 변 BC와 만나는 점을 E라고 해 보세요.',
      wrong: [
        { a: '3', why: '$(10-4)\\div2=3$은 한쪽 끝에 남는 길이예요. 보조선을 그어 정삼각형을 찾아보세요.' },
        { a: '7', why: '두 밑변의 평균을 구했어요. $\\overline{AB}$는 다리의 길이예요.' },
      ],
      explain: '점 D를 지나고 $\\overline{AB}$에 평행한 직선이 $\\overline{BC}$와 만나는 점을 E라고 하면 ABED는 평행사변형이므로 $\\overline{BE}=\\overline{AD}=4$ cm, $\\overline{DE}=\\overline{AB}$예요. $\\overline{EC}=10-4=6$ (cm)이고, $\\angle DEC=\\angle B=60°$(동위각), $\\angle C=\\angle B=60°$이므로 $\\triangle DEC$는 정삼각형이에요. 그래서 $\\overline{AB}=\\overline{DE}=6$ cm예요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: '°', concept: 0,
      q: '평행사변형 ABCD에서 $\\angle A$의 이등분선과 $\\angle B$의 이등분선이 만나는 점을 P라고 해요. $\\angle APB$의 크기는 몇 도일까요?',
      answer: '90',
      hint: '$\\angle A+\\angle B$의 값을 먼저 떠올려 보세요.',
      wrong: [
        { a: '180', why: '$\\angle A+\\angle B=180°$까지 구했어요. $\\triangle ABP$에서는 그 절반을 써요.' },
        { a: '45', why: '$\\angle PAB+\\angle PBA=90°$를 한 번 더 반으로 나누었어요. $\\angle APB$는 $180°$에서 $90°$를 빼서 구해요.' },
      ],
      explain: '$\\angle A+\\angle B=180°$이므로 $\\angle PAB+\\angle PBA=\\frac{1}{2}(\\angle A+\\angle B)=90°$예요. $\\triangle ABP$에서 $\\angle APB=180°-90°=90°$예요. $\\angle A$의 크기와 관계없이 항상 직각이에요.',
    },
  ],

  deeper: [
    {
      title: '평행사변형이 쓰이는 곳',
      body: '열면 여러 층의 칸이 펼쳐지는 공구함이나 탁상 스탠드의 팔에는 길이가 같은 막대 두 쌍을 마주 보게 이은 구조가 많아요. 이 구조는 모양이 바뀌어도 늘 평행사변형이어서(두 쌍의 대변의 길이가 같으면 평행사변형) 마주 보는 막대가 계속 평행하게 움직여요.\n\n' +
        '그래서 공구함의 칸이 기울지 않고 수평을 유지하고, 스탠드의 전등도 팔을 움직여도 같은 방향을 향할 수 있어요.',
    },
    {
      title: '사각형의 포함 관계와 다음 단원',
      body: '사각형 사이의 관계는 집합의 포함 관계로 볼 수 있어요. 정사각형의 모임은 직사각형의 모임에도, 마름모의 모임에도 들어 있고, 직사각형과 마름모의 모임은 평행사변형의 모임에 들어 있어요. 정사각형은 직사각형과 마름모의 **공통부분**이에요.\n\n' +
        '다음 단원에서는 모양은 같고 크기만 다른 **닮은 도형**을 배워요. 평행선이 만드는 엇각·동위각과 합동 조건을 이용한 오늘의 생각이 닮음의 조건을 이해하는 바탕이 돼요.',
    },
  ],

  faq: [
    {
      q: '정사각형도 직사각형이라고 해도 돼요?',
      a: '네. 직사각형은 "네 내각의 크기가 모두 같은 사각형"이에요. 정사각형도 네 각이 모두 $90°$이므로 직사각형이에요. 다만 직사각형이 모두 정사각형인 것은 아니에요(이웃하는 변의 길이가 다를 수 있어요).',
    },
    {
      q: '평행사변형이 되는 조건이 왜 이렇게 많아요?',
      a: '정의(두 쌍의 대변이 평행)를 직접 확인하기 어려울 때가 많아서, 길이나 각, 대각선으로 확인하는 방법을 함께 알아 두는 거예요. 다섯 가지 중 하나만 확인하면 돼요.',
    },
    {
      q: '사다리꼴과 등변사다리꼴은 뭐가 달라요?',
      a: '사다리꼴은 한 쌍의 대변만 평행하면 돼요. 등변사다리꼴은 그중에서 아랫변의 양 끝 각의 크기가 같은 것이라, 평행하지 않은 두 변의 길이가 같고 좌우가 똑같은 모양이에요.',
    },
  ],

  mistakes: [
    '한 쌍의 대변은 평행하고 **다른** 한 쌍의 대변은 길이가 같으면 평행사변형이라고 생각하는 실수 — 등변사다리꼴일 수도 있어요. 같은 한 쌍이 평행하고 길이도 같아야 해요.',
    '마름모의 두 대각선의 길이가 같다고 생각하는 실수 — 마름모의 대각선은 수직이등분할 뿐, 길이가 같은 것은 직사각형이에요.',
    '평행사변형에서 이웃한 각과 대각을 헷갈리는 실수 — 대각은 크기가 같고, 이웃한 두 각은 합이 $180°$예요.',
  ],

  gens: [
    {
      id: 'para-angle',
      level: 1,
      title: '평행사변형의 각의 크기',
      make: function (R) {
        var a = R.int(50, 130);
        if (a === 90) a = R.pick([88, 92]);
        var ask = R.pick(['B', 'C', 'D']);
        var ans = ask === 'C' ? a : 180 - a;
        var ang = { A: a + '°' };
        ang[ask] = 'x';
        var wrong = ask === 'C'
          ? [{ a: String(180 - a), why: '$\\angle C$는 $\\angle A$의 이웃한 각이 아니라 대각이에요. 대각의 크기는 같아요.' }]
          : [{ a: String(a), why: '$\\angle ' + ask + '$' + R.josa(ask, '은/는') + ' $\\angle A$의 대각이 아니라 이웃한 각이에요. 이웃한 두 각의 합이 $180°$예요.' }];
        return {
          type: 'short', check: 'number', unit: '°', concept: 0,
          q: '평행사변형 ABCD에서 $\\angle A=' + a + '°$일 때, $\\angle x$($\\angle ' + ask + '$)의 크기는 몇 도일까요?',
          fig: quadFig('para', { Q: paraQ(a), ang: ang, alt: '평행사변형 ABCD, 각 A 는 ' + a + '도' }),
          answer: String(ans),
          wrong: wrong,
          explain: ask === 'C'
            ? '평행사변형의 대각의 크기는 같으므로 $\\angle C=\\angle A=' + a + '°$예요.'
            : '이웃하는 두 내각의 합은 $180°$이므로 $\\angle ' + ask + '=180°-' + a + '°=' + ans + '°$예요.',
        };
      },
    },
    {
      id: 'para-expr',
      level: 2,
      title: '평행사변형의 성질로 길이 구하기',
      make: function (R) {
        var x = R.int(2, 8);
        var p = R.int(1, 5), r = R.int(1, 5);
        while (r === p) r = R.int(1, 5);
        var q = R.int(-3, 9);
        while (q === 0 || p * x + q <= 0) q = R.int(1, 9);
        var s = (p - r) * x + q;
        function lin(m, c) { return (m === 1 ? '' : m) + 'x' + (c > 0 ? '+' + c : c < 0 ? String(c) : ''); }
        var L = p * x + q, side = R.bool();
        var e1 = lin(p, q), e2 = lin(r, s);
        var ans = side ? L : 2 * L;
        var wrong = x === ans ? [] : [{ a: String(x), why: '$x$의 값을 구했어요. 이 값을 식에 넣어 길이를 구해요.' }];
        if (!side) { if (L !== x) wrong.push({ a: String(L), why: '$\\overline{OA}$의 길이를 구했어요. $\\overline{AC}$는 그 2배예요.' }); }
        else if (2 * L !== x) wrong.push({ a: String(2 * L), why: '두 변의 길이를 더했어요. 묻는 것은 $\\overline{AB}$ 하나의 길이예요.' });
        var lhs = (p - r === 1 ? '' : p - r === -1 ? '-' : String(p - r)) + 'x';
        // 계수가 1 이면 "x=8, x=8" 처럼 같은 식이 두 번 나오지 않게 한 단계로 쓴다
        var solve = '$' + e1 + '=' + e2 + '$에서 ' + (p - r === 1 ? '' : '$' + lhs + '=' + (s - q) + '$, ') + '$x=' + x + '$' + R.josa(x, '이에요/예요') + '.';
        return {
          type: 'short', check: 'number', unit: 'cm', concept: 0,
          q: side
            ? '평행사변형 ABCD에서 $\\overline{AB}=(' + e1 + ')$ cm, $\\overline{DC}=(' + e2 + ')$ cm일 때, $\\overline{AB}$의 길이는 몇 cm일까요?'
            : '평행사변형 ABCD의 두 대각선의 교점을 O라고 해요. $\\overline{OA}=(' + e1 + ')$ cm, $\\overline{OC}=(' + e2 + ')$ cm일 때, $\\overline{AC}$의 길이는 몇 cm일까요?',
          fig: side ? quadFig('para', { sides: { AB: '(' + e1 + ') cm', DC: '(' + e2 + ') cm' }, alt: '평행사변형 ABCD 의 두 변 AB, DC 의 길이를 x 로 나타낸 그림' }) : quadFig('para', { diag: true, alt: '평행사변형 ABCD 와 두 대각선의 교점 O' }),
          answer: String(ans),
          wrong: wrong,
          hint: side ? '평행사변형의 대변의 길이는 같아요.' : '평행사변형의 두 대각선은 서로 다른 것을 이등분해요.',
          explain: (side ? '대변의 길이가 같으므로 ' : '두 대각선은 서로 다른 것을 이등분하므로 $\\overline{OA}=\\overline{OC}$, 곧 ') + solve +
            (side ? ' $\\overline{AB}=' + p + '\\times ' + x + (q > 0 ? '+' + q : String(q)) + '=' + L + '$ (cm)예요.'
              : ' $\\overline{OA}=' + L + '$ cm이므로 $\\overline{AC}=2\\times' + L + '=' + (2 * L) + '$ (cm)예요.'),
        };
      },
    },
    {
      id: 'special-quad-angle',
      level: 2,
      title: '직사각형·마름모의 대각선과 각',
      make: function (R) {
        var rect = R.bool(), ans, q, fig, explain, hint, wrong = [];
        function add(v, why) {
          if (v === ans || v <= 0) return;
          for (var i = 0; i < wrong.length; i++) if (wrong[i].a === String(v)) return;
          wrong.push({ a: String(v), why: why });
        }
        if (rect) {
          var a = R.int(20, 70);
          if (a === 45) a = R.pick([40, 50]);
          var askAOB = R.bool();
          ans = askAOB ? 180 - 2 * a : 2 * a;
          q = '직사각형 ABCD의 두 대각선의 교점을 O라고 해요. $\\angle OAB=' + a + '°$일 때, $\\angle x$($\\angle ' + (askAOB ? 'AOB' : 'AOD') + '$)의 크기는 몇 도일까요?';
          fig = quadFig('rect', { Q: rectQ(a), diag: true, angles: [['A', 'B', 'O', a + '°', 1, 26], askAOB ? ['O', 'A', 'B', 'x', 1, 16] : ['O', 'A', 'D', 'x', 1, 16]], offO: [0, 16], alt: '직사각형 ABCD 와 대각선의 교점 O, 각 OAB 는 ' + a + '도' });
          hint = '직사각형에서는 $\\overline{OA}=\\overline{OB}$예요.';
          if (askAOB) {
            add(2 * a, '$\\angle AOD$를 구했어요. $\\angle AOB$는 $\\triangle OAB$의 꼭지각이에요.');
            add(180 - a, '$\\angle OBA$도 $' + a + '°$예요. $180°$에서 두 밑각을 모두 빼요.');
            explain = '$\\overline{OA}=\\overline{OB}$이므로 $\\angle OBA=\\angle OAB=' + a + '°$예요. $\\angle x=180°-' + a + '°\\times2=' + ans + '°$예요.';
          } else {
            add(180 - 2 * a, '$\\angle AOB$를 구했어요. $\\angle AOD$는 그 이웃한 각이에요.');
            add(a, '$\\angle AOD$는 $\\angle OAB$와 같지 않아요. 먼저 $\\angle AOB$를 구해요.');
            explain = '$\\overline{OA}=\\overline{OB}$이므로 $\\angle OBA=' + a + '°$이고 $\\angle AOB=180°-' + (2 * a) + '°=' + (180 - 2 * a) + '°$예요. $\\angle x=180°-' + (180 - 2 * a) + '°=' + ans + '°$예요.';
          }
        } else {
          var b = R.int(20, 70);
          if (b === 45) b = R.pick([40, 50]);
          var ask = R.pick(['BAO', 'ABC', 'BAD']);
          ans = ask === 'BAO' ? 90 - b : ask === 'ABC' ? 2 * b : 180 - 2 * b;
          q = '마름모 ABCD의 두 대각선의 교점을 O라고 해요. $\\angle ABO=' + b + '°$일 때, ' + (ask === 'BAO' ? '$\\angle x$($\\angle BAO$)' : '$\\angle ' + ask + '$') + '의 크기는 몇 도일까요?';
          var xa = ask === 'BAO' ? ['A', 'B', 'O', 'x', 1, 22] : null;
          fig = quadFig('rhom', { Q: rhomQ(b), diag: true, angles: xa ? [['B', 'A', 'O', b + '°', 1, 26], xa] : [['B', 'A', 'O', b + '°', 1, 26]], offO: [-10, 12], alt: '마름모 ABCD 와 대각선의 교점 O, 각 ABO 는 ' + b + '도' });
          hint = '마름모의 두 대각선은 서로 다른 것을 수직이등분하고, 각을 이등분해요.';
          if (ask === 'BAO') {
            add(b, '두 각이 같다고 생각했어요. $\\angle AOB=90°$이므로 두 각의 합이 $90°$예요.');
            add(180 - b, '$\\angle AOB=90°$도 빼야 해요.');
            explain = '마름모의 두 대각선은 수직이므로 $\\angle AOB=90°$예요. $\\angle x=180°-90°-' + b + '°=' + ans + '°$예요.';
          } else if (ask === 'ABC') {
            add(b, '$\\angle ABO$는 $\\angle ABC$의 절반이에요.');
            add(180 - 2 * b, '$\\angle BAD$를 구했어요. $\\angle ABC$는 $\\angle ABO$의 2배예요.');
            explain = '$\\triangle ABO\\equiv\\triangle CBO$(SSS 합동)이므로 대각선 BD는 $\\angle B$를 이등분해요. $\\angle ABC=2\\times' + b + '°=' + ans + '°$예요.';
          } else {
            add(2 * b, '$\\angle ABC$를 구했어요. $\\angle BAD$는 그 이웃한 각이에요.');
            add(90 - b, '$\\angle BAO$를 구했어요. $\\angle BAD$는 그 2배예요.');
            explain = '$\\angle BAO=90°-' + b + '°=' + (90 - b) + '°$이고 대각선 AC는 $\\angle A$를 이등분하므로 $\\angle BAD=2\\times' + (90 - b) + '°=' + ans + '°$예요.';
          }
        }
        return { type: 'short', check: 'number', unit: '°', concept: rect ? 2 : 3, q: q, fig: fig, answer: String(ans), wrong: wrong, hint: hint, explain: explain };
      },
    },
    {
      id: 'quad-relation',
      level: 1,
      title: '조건을 더하면 어떤 사각형이 될까',
      make: function (R) {
        var V = ['A', 'B', 'C', 'D'];
        function rectCond() {
          return R.bool() ? '$\\angle ' + R.pick(V) + '=90°$' : '$\\overline{AC}=\\overline{BD}$';
        }
        function rhomCond() {
          if (R.bool()) return '$\\overline{AC}\\perp\\overline{BD}$';
          var i = R.int(0, 3);
          return '$\\overline{' + V[i] + V[(i + 1) % 4] + '}=\\overline{' + V[(i + 1) % 4] + V[(i + 2) % 4] + '}$';
        }
        var NAMES = ['평행사변형', '직사각형', '마름모', '정사각형'];
        var kind = R.int(0, 4), start, cond, target;
        if (kind === 0) { start = 0; cond = rectCond(); target = 1; }
        else if (kind === 1) { start = 0; cond = rhomCond(); target = 2; }
        else if (kind === 2) { start = 0; cond = rectCond() + '이고 ' + rhomCond(); target = 3; }
        else if (kind === 3) { start = 1; cond = rhomCond(); target = 3; }
        else { start = 2; cond = rectCond(); target = 3; }
        var why = NAMES.map(function (n, i) {
          if (i === target) return '';
          if (i === start) return '조건이 더해져서 더 특별한 사각형이 돼요. 그 조건이 무엇을 뜻하는지 살펴보세요.';
          if (i === 0) return '평행사변형은 이미 갖고 있는 성질이에요. 더 특별한 사각형을 골라요.';
          if (target === 3 && start !== 0) return '틀린 말은 아니지만, 처음부터 ' + NAMES[start] + '이기도 하므로 두 성질을 모두 가진 정사각형이 가장 알맞아요.';
          if (target === 3) return '한쪽 조건만 보았어요. 직사각형의 조건과 마름모의 조건을 함께 만족하면 정사각형이에요.';
          if (i === 3) return '정사각형이 되려면 직사각형의 조건과 마름모의 조건이 모두 필요해요. 여기서는 한쪽만 더해졌어요.';
          if (i === 1) return '직사각형이 되는 조건은 한 내각이 직각이거나 두 대각선의 길이가 같은 것이에요.';
          return '마름모가 되는 조건은 이웃하는 두 변의 길이가 같거나 두 대각선이 수직인 것이에요.';
        });
        var explain = target === 1 ? '평행사변형에서 한 내각이 직각이거나 두 대각선의 길이가 같으면 직사각형이에요.'
          : target === 2 ? '평행사변형에서 이웃하는 두 변의 길이가 같거나 두 대각선이 서로 수직이면 마름모예요.'
            : start === 0 ? '직사각형이 되는 조건과 마름모가 되는 조건을 함께 만족하므로 정사각형이에요.'
              : start === 1 ? '직사각형에서 이웃하는 두 변의 길이가 같거나 두 대각선이 서로 수직이면 정사각형이에요.'
                : '마름모에서 한 내각이 직각이거나 두 대각선의 길이가 같으면 정사각형이에요.';
        return {
          type: 'choice', fixed: true, concept: 5,
          q: NAMES[start] + ' ABCD가 ' + cond + '를 만족하면 어떤 사각형이 될까요? (가장 알맞은 것을 고르세요.)',
          choices: NAMES,
          answer: target,
          why: why,
          explain: explain,
        };
      },
    },
  ],
});

  // 평행사변형: ∠A 의 크기가 a 도
  function paraQ(a) {
    var A = [-2.6 * Math.cos(rad(a)), 2.6 * Math.sin(rad(a))];
    return { A: A, B: [0, 0], C: [4, 0], D: [A[0] + 4, A[1]] };
  }
  // 직사각형: ∠OAB 가 a 도 (세로 2.4)
  function rectQ(a) {
    var w = 2.4 * Math.tan(rad(a));
    return { A: [0, 2.4], B: [0, 0], C: [w, 0], D: [w, 2.4] };
  }
  // 마름모: ∠ABO 가 b 도 (가로 대각선의 절반 2.4)
  function rhomQ(b) {
    var h = 2.4 * Math.tan(rad(b));
    return { A: [0, h], B: [-2.4, 0], C: [0, -h], D: [2.4, 0] };
  }
})();
