/* 중2 수학 · 삼각형의 성질
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

  // ---------- 자주 쓰는 그림 ----------
  // 이등변삼각형 ABC (AB=AC), 밑각 b. o.apex, o.base: 꼭지각·밑각 글, o.D: 꼭지각의 이등분선 AD, o.ext: 변 BC 를 C 쪽으로 늘인 점 D 와 외각 글
  function isoFig(b, o) {
    o = o || {};
    var T = tri(b, b), pts = { A: T.A, B: T.B, C: T.C };
    var spec = { pts: pts, polys: [['A', 'B', 'C']], ticks: [['A', 'B', 1], ['A', 'C', 1]], angles: [], lines: [], rights: [], labels: ['A', 'B', 'C'], off: {}, texts: [] };
    if (o.apex !== undefined) spec.angles.push(['A', 'B', 'C', o.apex, 1, 20]);
    if (o.base !== undefined) spec.angles.push(['B', 'C', 'A', o.base]);
    if (o.baseC !== undefined) spec.angles.push(['C', 'A', 'B', o.baseC]);
    if (o.D) {
      pts.D = [0.5, 0];
      spec.lines.push(['A', 'D', true]);
      spec.rights.push(['D', 'C', 'A']);
      spec.labels.push('D');
      spec.off.D = [0, 15];
    }
    if (o.ext) {
      pts.D = [1.45, 0];
      spec.lines.push(['C', 'D']);
      spec.angles.push(['C', 'D', 'A', o.ext, 1, 16]);
      spec.labels.push('D');
      spec.off.D = [4, 15];
      spec.off.C = [0, 15];
    }
    if (o.bc) spec.texts.push([[o.D ? 0.25 : 0.5, 0], o.bc, 0, 16]);
    spec.alt = o.alt || '두 변 AB, AC 의 길이가 같은 이등변삼각형 ABC';
    return geo(spec);
  }
  // 삼각형 ABC 와 외심 O (o.lines: O 와 이을 꼭짓점들, o.angles: 각 표시, o.circle: 외접원)
  function circumFig(b, c, o) {
    o = o || {};
    var T = tri(b, c), O = circum(T.A, T.B, T.C);
    var spec = { pts: { A: T.A, B: T.B, C: T.C, O: O }, polys: [['A', 'B', 'C']], dots: ['O'], labels: ['A', 'B', 'C', 'O'], off: { O: o.offO || ((o.join || 'ABC').indexOf('A') >= 0 ? [0, 14] : [0, -14]) },
      lines: (o.join || ['A', 'B', 'C']).map(function (k) { return ['O', k]; }), angles: o.angles || [], circles: o.circle ? [['O', dist(O, T.A)]] : [] };
    spec.alt = o.alt || '삼각형 ABC 와 외심 O';
    return geo(spec);
  }
  // 삼각형 ABC 와 내심 I
  function inFig(b, c, o) {
    o = o || {};
    var T = tri(b, c), I = incenter(T.A, T.B, T.C);
    var spec = { pts: { A: T.A, B: T.B, C: T.C, I: I }, polys: [['A', 'B', 'C']], dots: ['I'], labels: ['A', 'B', 'C', 'I'], off: { I: o.offI || ((o.join || 'ABC').indexOf('A') >= 0 ? [13, -8] : [0, -14]) },
      lines: (o.join || ['A', 'B', 'C']).map(function (k) { return ['I', k]; }), angles: o.angles || [], circles: [] };
    if (o.circle) spec.circles.push(['I', dist(I, foot(I, T.B, T.C))]);
    spec.alt = o.alt || '삼각형 ABC 와 내심 I';
    return geo(spec);
  }
  // 각 XOY(50°)의 이등분선 위의 점 P 와 두 변에 내린 수선의 발 (이름 n1, n2)
  function bisectFig(n1, n2, o) {
    o = o || {};
    var X = [5, 0], Y = [5 * Math.cos(rad(50)), 5 * Math.sin(rad(50))], Pp = [3.5 * Math.cos(rad(25)), 3.5 * Math.sin(rad(25))];
    var pts = { O: [0, 0], X: X, Y: Y, P: Pp };
    pts[n1] = foot(Pp, [0, 0], X);
    pts[n2] = foot(Pp, [0, 0], Y);
    var spec = { pts: pts, lines: [['O', 'X'], ['O', 'Y'], ['O', [5 * Math.cos(rad(25)), 5 * Math.sin(rad(25))], true], ['P', n1], ['P', n2]],
      rights: [[n1, 'O', 'P'], [n2, 'O', 'P']], angles: [['O', 'X', 'P', '', 1, 30], ['O', 'P', 'Y', '', 2, 34]], dots: ['P'],
      labels: ['O', 'X', 'Y', 'P', n1, n2], off: { O: [-12, 6], X: [12, 0], Y: [6, -12], P: [14, -4] }, texts: o.texts || [] };
    spec.off[n1] = [0, 15];
    spec.off[n2] = [-13, -6];
    spec.alt = o.alt || ('각 XOY 의 이등분선 위의 점 P 에서 두 변에 내린 수선의 발 ' + n1 + ', ' + n2);
    return geo(spec);
  }

Tutor.registerUnit({
  id: 'math-m2-07',
  course: 'math-m2',
  title: '삼각형의 성질',
  summary: '이등변삼각형의 성질과 직각삼각형의 합동 조건을 알고, 삼각형의 외심과 내심의 성질을 설명해요.',
  goals: [
    '이등변삼각형의 성질과 이등변삼각형이 되는 조건을 증명하고 이용할 수 있어요.',
    '직각삼각형의 합동 조건(RHA, RHS)을 알고 각의 이등분선의 성질을 설명할 수 있어요.',
    '삼각형의 외심과 내심의 뜻과 성질을 알고 각의 크기와 길이를 구할 수 있어요.',
  ],
  standards: ['[9수03-09]', '[9수03-10]'],

  concepts: [
    {
      title: '이등변삼각형의 성질과 증명',
      body: '두 변의 길이가 같은 삼각형을 **이등변삼각형**이라고 해요. $\\overline{AB}=\\overline{AC}$일 때 $\\angle A$를 **꼭지각**, 변 BC를 **밑변**, $\\angle B$와 $\\angle C$를 **밑각**이라고 해요.\n\n' +
        '이등변삼각형에는 두 가지 성질이 있어요.\n' +
        '1. 두 밑각의 크기는 같아요. $\\angle B=\\angle C$\n' +
        '2. 꼭지각의 이등분선은 밑변을 수직이등분해요.\n\n' +
        '이미 옳다고 밝혀진 성질을 근거로 하여 어떤 성질이 옳다는 것을 논리적으로 밝히는 것을 **증명**이라고 해요.\n\n' +
        '**증명** $\\angle A$의 이등분선이 변 BC와 만나는 점을 D라고 해요. $\\triangle ABD$와 $\\triangle ACD$에서 $\\overline{AB}=\\overline{AC}$, $\\angle BAD=\\angle CAD$, $\\overline{AD}$는 공통이므로 두 삼각형은 SAS 합동이에요. 그래서 $\\angle B=\\angle C$예요.\n\n' +
        '또 합동이므로 $\\overline{BD}=\\overline{CD}$이고, $\\angle ADB=\\angle ADC$인데 두 각의 합이 $180°$이니 각각 $90°$예요. 곧 $\\overline{AD}$는 밑변을 수직이등분해요.',
      easy: '이등변삼각형 모양 종이를 꼭짓점 A에서 밑변 쪽으로 반을 접어 보세요. 두 쪽이 꼭 맞게 겹쳐요.\n\n' +
        '꼭 맞게 겹친다는 것은 왼쪽 밑각과 오른쪽 밑각이 같고, 밑변이 똑같이 반으로 나뉘며, 접힌 선이 밑변과 직각을 이룬다는 뜻이에요. 증명은 이렇게 "접어 보니 맞더라"를 합동 조건으로 누구나 인정하게 설명하는 것이에요.',
      fig: isoFig(65, { D: true, base: '', baseC: '', alt: '이등변삼각형 ABC 와 꼭지각의 이등분선 AD' }),
      check: {
        type: 'short', check: 'number', unit: '°',
        q: '$\\overline{AB}=\\overline{AC}$인 이등변삼각형 ABC에서 $\\angle A=40°$일 때, $\\angle B$의 크기는 몇 도일까요?',
        answer: '70',
        wrong: [
          { a: '140', why: '$180°-40°$에서 멈췄어요. 두 밑각의 크기가 같으니 2로 나누어요.' },
          { a: '40', why: '꼭지각과 밑각이 같다고 생각했어요. 같은 것은 두 밑각이에요.' },
        ],
        explain: '두 밑각의 크기가 같으므로 $\\angle B=(180°-40°)\\div2=70°$예요.',
      },
    },
    {
      title: '이등변삼각형이 되는 조건',
      body: '이등변삼각형의 성질을 거꾸로 하면 이것도 성립해요.\n\n' +
        '**두 내각의 크기가 같은 삼각형은 이등변삼각형이에요.** $\\triangle ABC$에서 $\\angle B=\\angle C$이면 $\\overline{AB}=\\overline{AC}$예요.\n\n' +
        '**증명** $\\angle A$의 이등분선이 변 BC와 만나는 점을 D라고 해요. $\\triangle ABD$와 $\\triangle ACD$에서 $\\angle BAD=\\angle CAD$이고, $\\angle B=\\angle C$이므로 나머지 각 $\\angle ADB=\\angle ADC$예요. $\\overline{AD}$는 공통이므로 ASA 합동이에요. 그래서 $\\overline{AB}=\\overline{AC}$예요.\n\n' +
        '예: 폭이 일정한 종이 테이프를 비스듬히 접으면 겹쳐진 부분은 이등변삼각형이에요. 접은 각과 엇각이 같아서 두 내각의 크기가 같아지기 때문이에요.\n\n' +
        '> 💡 세 내각의 크기가 모두 같은 삼각형은 세 변의 길이도 모두 같은 정삼각형이에요.',
      easy: '"같은 크기의 각이 마주 보는 변은 길이도 같다"라고 기억해요.\n\n' +
        '시소의 양쪽을 같은 각도로 올린 지붕을 떠올려 보세요. 양쪽 경사가 같으면 꼭대기는 정확히 가운데에 오고, 양쪽 지붕의 길이도 같아져요.',
      fig: isoFig(55, { base: '55°', baseC: '55°', alt: '두 밑각이 55도로 같은 삼각형 ABC' }),
      check: {
        type: 'ox',
        q: '$\\triangle ABC$에서 $\\angle A=50°$, $\\angle B=65°$이면 $\\triangle ABC$는 이등변삼각형이에요.',
        answer: true,
        explain: '$\\angle C=180°-50°-65°=65°$이므로 $\\angle B=\\angle C$예요. 두 내각의 크기가 같으니 이등변삼각형이에요($\\overline{AB}=\\overline{AC}$).',
      },
    },
    {
      title: '직각삼각형의 합동 조건',
      body: '직각삼각형에서 직각의 대변을 **빗변**이라고 해요. 두 직각삼각형은 다음 중 하나를 만족하면 합동이에요.\n\n' +
        '1. 빗변의 길이와 한 예각의 크기가 각각 같을 때 — **RHA 합동**\n' +
        '2. 빗변의 길이와 다른 한 변의 길이가 각각 같을 때 — **RHS 합동**\n\n' +
        'R은 직각(Right angle), H는 빗변(Hypotenuse), A는 각(Angle), S는 변(Side)의 첫 글자예요.\n\n' +
        '왜 그럴까요? 직각과 한 예각이 같으면 나머지 예각도 같아지므로 RHA는 ASA 합동이 돼요. RHS는 두 삼각형을 길이가 같은 변끼리 맞붙이면 이등변삼각형이 만들어지고, 밑각이 같아져서 RHA 합동이 돼요.\n\n' +
        '> ⚠️ 반드시 **빗변**이 같아야 해요. 빗변이 아닌 두 변이 같다면 그 사이의 각이 직각이므로 SAS 합동이에요.',
      easy: '보통 삼각형은 합동을 보이려면 세 가지 정보가 필요해요. 그런데 직각삼각형은 "직각이 있다"는 정보 하나를 이미 가지고 시작해요.\n\n' +
        '그래서 빗변 하나와 나머지 정보 하나(예각 하나 또는 다른 변 하나)만 같으면 충분해요. 미끄럼틀의 길이(빗변)와 경사(예각)가 같으면 모양과 크기가 똑같은 것과 같아요.',
      fig: geo({
        pts: { A: [0, 2], C: [0, 0], B: [3, 0], D: [4.5, 2], F: [4.5, 0], E: [7.5, 0] },
        polys: [['A', 'C', 'B'], ['D', 'F', 'E']], rights: [['C', 'A', 'B'], ['F', 'D', 'E']], ticks: [['A', 'B', 1], ['D', 'E', 1]],
        angles: [['B', 'A', 'C', '', 1, 22], ['E', 'D', 'F', '', 1, 22]], labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        off: { A: [-10, -8], C: [-10, 10], B: [10, 10], D: [-10, -8], F: [-10, 10], E: [10, 10] },
        alt: '빗변의 길이와 한 예각의 크기가 같은 두 직각삼각형 ABC, DEF',
      }),
      check: {
        type: 'choice',
        q: '두 직각삼각형에서 빗변의 길이와 다른 한 변의 길이가 각각 같으면 어떤 합동일까요?',
        choices: ['RHS 합동', 'RHA 합동', 'ASA 합동'],
        answer: 0,
        why: ['', 'RHA는 빗변과 한 **예각**이 같을 때예요. 여기서는 각이 아니라 변이 같아요.', '두 변의 길이가 같다는 정보이므로 ASA가 아니에요. 직각삼각형의 RHS 합동이에요.'],
        explain: 'R(직각), H(빗변), S(다른 한 변)가 같으므로 RHS 합동이에요.',
      },
    },
    {
      title: '각의 이등분선의 성질',
      body: '점과 직선 사이의 거리는 그 점에서 직선에 내린 수선의 발까지의 거리예요. 직각삼각형의 합동 조건으로 각의 이등분선의 성질을 알 수 있어요.\n\n' +
        '1. **각의 이등분선 위의 한 점에서 그 각의 두 변까지의 거리는 같아요.**\n' +
        '$\\angle XOY$의 이등분선 위의 점 P에서 두 변에 내린 수선의 발을 A, B라고 하면 $\\triangle POA$와 $\\triangle POB$는 빗변 OP가 공통이고 $\\angle POA=\\angle POB$이므로 RHA 합동이에요. 그래서 $\\overline{PA}=\\overline{PB}$예요.\n\n' +
        '2. **거꾸로, 각의 두 변에서 같은 거리에 있는 점은 그 각의 이등분선 위에 있어요.**\n' +
        '$\\overline{PA}=\\overline{PB}$이면 빗변 OP가 공통이므로 RHS 합동이고, $\\angle POA=\\angle POB$예요.',
      easy: '두 담장이 만나는 모퉁이에서 정확히 가운데로 뻗은 길을 생각해 보세요. 이 길 위 어디에 서 있어도 왼쪽 담장과 오른쪽 담장까지의 거리가 똑같아요.\n\n' +
        '반대로 두 담장에서 똑같이 떨어진 곳들을 이어 보면 바로 그 가운데 길이 돼요.',
      fig: bisectFig('A', 'B'),
      check: {
        type: 'choice',
        q: '"각의 이등분선 위의 한 점에서 그 각의 두 변까지의 거리는 같다"를 증명할 때 쓰는 합동 조건은 무엇일까요?',
        choices: ['RHA 합동', 'RHS 합동', 'SSS 합동'],
        answer: 0,
        why: ['', 'RHS는 거꾸로 "두 변까지의 거리가 같은 점은 이등분선 위에 있다"를 보일 때 써요. 여기서는 같은 각을 알고 있어요.', '세 변의 길이가 같은지는 알 수 없어요. 빗변 OP와 한 예각이 같다는 것을 알아요.'],
        explain: '빗변 OP가 공통이고, 이등분선이므로 한 예각($\\angle POA=\\angle POB$)이 같아요. 그래서 RHA 합동이에요.',
      },
    },
    {
      title: '삼각형의 외심',
      body: '삼각형의 세 꼭짓점을 모두 지나는 원을 **외접원**, 그 중심을 **외심**이라고 해요(보통 O로 나타내요).\n\n' +
        '삼각형의 **세 변의 수직이등분선은 한 점에서 만나고, 이 점이 외심**이에요. 선분의 수직이등분선 위의 점은 선분의 양 끝점까지의 거리가 같으므로 $\\overline{OA}=\\overline{OB}=\\overline{OC}$(외접원의 반지름)예요.\n\n' +
        '| 삼각형 | 외심의 위치 |\n|---|---|\n| 예각삼각형 | 삼각형의 내부 |\n| 직각삼각형 | 빗변의 중점 |\n| 둔각삼각형 | 삼각형의 외부 |\n\n' +
        '$\\triangle OAB$, $\\triangle OBC$, $\\triangle OCA$는 모두 이등변삼각형이에요. 그 밑각을 이용하면\n' +
        '- $\\angle OAB+\\angle OBC+\\angle OCA=90°$\n- $\\angle BOC=2\\angle A$\n\n' +
        '> 💡 직각삼각형의 외접원의 반지름은 빗변의 길이의 $\\frac{1}{2}$이에요.',
      easy: '세 마을 A, B, C에서 똑같은 거리에 우물을 파려고 해요. A와 B에서 같은 거리인 곳은 선분 AB의 수직이등분선 위, B와 C에서 같은 거리인 곳은 선분 BC의 수직이등분선 위에 있어요.\n\n' +
        '두 선이 만나는 곳이 세 마을 모두에서 같은 거리인 곳, 곧 외심이에요. 여기에 컴퍼스를 꽂으면 세 마을을 모두 지나는 원(외접원)을 그릴 수 있어요.',
      fig: circumFig(70, 50, { circle: true, alt: '삼각형 ABC 와 외심 O, 외접원' }),
      check: {
        type: 'short', check: 'number', unit: 'cm',
        q: '빗변의 길이가 10 cm인 직각삼각형의 외접원의 반지름은 몇 cm일까요?',
        answer: '5',
        wrong: [{ a: '10', why: '빗변 전체가 아니라 외심에서 꼭짓점까지가 반지름이에요. 외심은 빗변의 중점이에요.' }],
        explain: '직각삼각형의 외심은 빗변의 중점이므로 외접원의 반지름은 빗변의 절반, $10\\div2=5$ (cm)예요.',
      },
    },
    {
      title: '삼각형의 내심',
      body: '원이 직선과 한 점에서 만날 때 원이 직선에 **접한다**고 해요. 이때 그 점(접점)을 지나는 반지름은 직선에 수직이에요. 삼각형의 세 변에 모두 접하는 원을 **내접원**, 그 중심을 **내심**이라고 해요(보통 I로 나타내요).\n\n' +
        '삼각형의 **세 내각의 이등분선은 한 점에서 만나고, 이 점이 내심**이에요. 각의 이등분선 위의 점은 두 변까지의 거리가 같으므로, 내심에서 세 변까지의 거리는 모두 같아요(내접원의 반지름 $r$). 내심은 항상 삼각형의 내부에 있어요.\n\n' +
        '- $\\angle IAB+\\angle IBC+\\angle ICA=90°$\n- $\\angle BIC=90°+\\frac{1}{2}\\angle A$\n\n' +
        '내심 I와 세 꼭짓점을 이으면 높이가 $r$인 삼각형 세 개로 나뉘므로\n\n$(\\triangle ABC\\text{의 넓이})=\\frac{1}{2}r(a+b+c)$ ($a$, $b$, $c$는 세 변의 길이)',
      easy: '삼각형 모양 마당에 가장 큰 동그란 연못을 만든다고 해 봐요. 연못은 세 담장(변)에 모두 닿아야 하니, 연못의 중심은 세 담장에서 같은 거리에 있어야 해요.\n\n' +
        '두 담장에서 같은 거리인 곳은 그 모퉁이 각의 이등분선 위였지요. 그래서 세 모퉁이의 이등분선이 만나는 곳이 연못의 중심, 곧 내심이에요.\n\n' +
        '외심은 "꼭짓점"에서 같은 거리, 내심은 "변"에서 같은 거리라고 구별해요.',
      fig: inFig(70, 50, { circle: true, alt: '삼각형 ABC 와 내심 I, 내접원' }),
      check: {
        type: 'choice',
        q: '$\\triangle ABC$의 내심을 I라고 할 때, $\\angle A=80°$이면 $\\angle BIC$의 크기는 얼마일까요?',
        choices: ['$130°$', '$160°$', '$100°$'],
        answer: 0,
        why: ['', '외심의 성질 $\\angle BOC=2\\angle A$를 썼어요. 내심은 $\\angle BIC=90°+\\frac{1}{2}\\angle A$예요.', '$180°-\\angle A$를 계산했어요. 내심은 $\\angle BIC=90°+\\frac{1}{2}\\angle A$예요.'],
        explain: '$\\angle BIC=90°+\\frac{1}{2}\\times80°=90°+40°=130°$예요.',
      },
    },
  ],

  examples: [
    {
      q: '점 O는 $\\triangle ABC$의 외심이에요. $\\angle OAB=25°$, $\\angle OCB=35°$일 때 $\\angle OCA$와 $\\angle BOC$의 크기를 구해 보세요.',
      fig: circumFig(60, 65, { angles: [['A', 'B', 'O', '25°', 1, 26], ['C', 'B', 'O', '35°', 1, 26]], alt: '외심 O 와 삼각형 ABC, 각 OAB 25도, 각 OCB 35도' }),
      steps: [
        '$\\overline{OB}=\\overline{OC}$이므로 $\\triangle OBC$는 이등변삼각형이고 $\\angle OBC=\\angle OCB=35°$예요.',
        '$\\angle OAB+\\angle OBC+\\angle OCA=90°$이므로 $\\angle OCA=90°-25°-35°=30°$예요.',
        '$\\angle A=\\angle OAB+\\angle OAC=25°+30°=55°$예요($\\angle OAC=\\angle OCA$).',
        '$\\angle BOC=2\\angle A=110°$예요. (확인: $180°-35°\\times2=110°$)',
      ],
      answer: '$\\angle OCA=30°$, $\\angle BOC=110°$',
    },
    {
      q: '세 변의 길이가 5 cm, 12 cm, 13 cm인 직각삼각형의 내접원의 반지름의 길이를 구해 보세요.',
      steps: [
        '빗변이 13 cm이므로 직각을 낀 두 변은 5 cm, 12 cm예요. 넓이는 $\\frac{1}{2}\\times5\\times12=30$ (cm²)예요.',
        '내접원의 반지름을 $r$ cm라고 하면 넓이는 $\\frac{1}{2}r(5+12+13)=15r$이에요.',
        '$15r=30$이므로 $r=2$예요.',
      ],
      answer: '2 cm',
    },
  ],

  terms: [
    { term: '이등변삼각형', def: '두 변의 길이가 같은 삼각형이에요. 두 밑각의 크기가 같아요.' },
    { term: '꼭지각과 밑각', def: '이등변삼각형에서 길이가 같은 두 변이 이루는 각을 꼭지각, 밑변의 양 끝 각을 밑각이라고 해요. 두 밑각의 크기는 같아요.' },
    { term: '증명', def: '이미 옳다고 밝혀진 성질을 근거로 하여 어떤 성질이 옳다는 것을 논리적으로 밝히는 것이에요.' },
    { term: '빗변', def: '직각삼각형에서 직각의 대변이에요. 직각삼각형에서 가장 긴 변이에요.' },
    { term: 'RHA 합동', def: '두 직각삼각형의 빗변의 길이와 한 예각의 크기가 각각 같아서 합동인 것이에요.' },
    { term: 'RHS 합동', def: '두 직각삼각형의 빗변의 길이와 다른 한 변의 길이가 각각 같아서 합동인 것이에요.' },
    { term: '외심', def: '삼각형의 외접원의 중심이에요. 세 변의 수직이등분선의 교점이고, 세 꼭짓점까지의 거리가 같아요.' },
    { term: '외접원', def: '삼각형의 세 꼭짓점을 모두 지나는 원이에요.' },
    { term: '내심', def: '삼각형의 내접원의 중심이에요. 세 내각의 이등분선의 교점이고, 세 변까지의 거리가 같아요.' },
    { term: '내접원', def: '삼각형의 세 변에 모두 접하는 원이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: '°', concept: 0,
      q: '$\\overline{AB}=\\overline{AC}$인 이등변삼각형 ABC에서 $\\angle B=65°$일 때, $\\angle x$의 크기는 몇 도일까요?',
      fig: isoFig(65, { base: '65°', apex: 'x' }),
      answer: '50',
      wrong: [
        { a: '115', why: '$\\angle C$도 $65°$예요. $180°$에서 두 밑각을 모두 빼요.' },
        { a: '65', why: '꼭지각과 밑각이 같다고 생각했어요. 같은 것은 두 밑각끼리예요.' },
      ],
      explain: '두 밑각의 크기가 같으므로 $\\angle C=65°$예요. $\\angle x=180°-65°\\times2=50°$예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 0,
      q: '$\\overline{AB}=\\overline{AC}$인 이등변삼각형 ABC에서 $\\angle A$의 이등분선이 변 BC와 만나는 점을 D라고 해요. $\\overline{BC}=12$ cm일 때, $\\overline{BD}$의 길이는 몇 cm일까요?',
      fig: isoFig(62, { D: true, bc: '12 cm', alt: '이등변삼각형 ABC 와 꼭지각의 이등분선 AD, 밑변 BC 는 12 cm' }),
      answer: '6',
      wrong: [{ a: '12', why: '$\\overline{BC}$ 전체를 썼어요. 꼭지각의 이등분선은 밑변을 이등분하므로 절반이에요.' }],
      explain: '꼭지각의 이등분선은 밑변을 수직이등분해요. $\\overline{BD}=12\\div2=6$ (cm)예요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: '두 내각의 크기가 같은 삼각형은 이등변삼각형이에요.',
      answer: true,
      explain: '$\\angle B=\\angle C$이면 $\\angle A$의 이등분선을 그어 ASA 합동을 보일 수 있어요. 그래서 $\\overline{AB}=\\overline{AC}$, 곧 이등변삼각형이에요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 1,
      q: '$\\triangle ABC$에서 $\\angle A=80°$, $\\angle B=50°$, $\\overline{AB}=6$ cm예요. $\\overline{AC}$의 길이는 몇 cm일까요?',
      fig: triFig(50, 50, { A: '80°', B: '50°', AB: '6 cm' }),
      answer: '6',
      hint: '먼저 $\\angle C$의 크기를 구해 보세요.',
      wrong: [{ a: '3', why: '길이를 반으로 나눌 이유가 없어요. $\\angle C$를 구해 두 내각의 크기가 같은지 살펴보세요.' }],
      explain: '$\\angle C=180°-80°-50°=50°$이므로 $\\angle B=\\angle C$예요. 두 내각의 크기가 같으니 이등변삼각형이고, 같은 두 각의 대변인 $\\overline{AB}$와 $\\overline{AC}$의 길이가 같아요. 그래서 $\\overline{AC}=6$ cm예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '$\\angle C=\\angle F=90°$인 두 직각삼각형 ABC, DEF에서 $\\overline{AB}=\\overline{DE}$, $\\angle A=\\angle D$예요. 두 삼각형은 어떤 합동일까요?',
      choices: ['RHA 합동', 'RHS 합동', 'SAS 합동', '합동이라고 할 수 없어요.'],
      answer: 0,
      why: [
        '',
        'RHS는 빗변과 다른 한 **변**이 같을 때예요. 여기서는 한 예각이 같아요.',
        'SAS는 두 변과 그 끼인각이 같을 때예요. 여기서 같은 변은 빗변 하나뿐이에요.',
        '빗변($\\overline{AB}$, $\\overline{DE}$)과 한 예각이 같으면 합동이에요.',
      ],
      explain: '직각의 대변 $\\overline{AB}$, $\\overline{DE}$가 빗변이에요. 빗변의 길이와 한 예각의 크기가 같으므로 RHA 합동이에요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 2,
      q: '두 직각삼각형에서 빗변의 길이만 같으면 두 삼각형은 항상 합동이에요.',
      answer: false,
      explain: '빗변이 같아도 모양이 다를 수 있어요(예각이 다르면 납작하거나 뾰족해져요). 빗변과 함께 한 예각(RHA)이나 다른 한 변(RHS)이 같아야 합동이에요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 3,
      q: '$\\angle XOY$의 이등분선 위의 점 P에서 두 변 OX, OY에 내린 수선의 발을 각각 Q, R라고 해요. $\\overline{PQ}=5$ cm일 때, $\\overline{PR}$의 길이는 몇 cm일까요?',
      fig: bisectFig('Q', 'R', { texts: [['Q', '5 cm', 22, -34]] }),
      answer: '5',
      wrong: [{ a: '10', why: '두 거리를 더했어요. 각의 이등분선 위의 점에서 두 변까지의 거리는 같아요.' }],
      explain: '각의 이등분선 위의 점에서 두 변까지의 거리는 같아요($\\triangle POQ\\equiv\\triangle POR$, RHA 합동). 그래서 $\\overline{PR}=\\overline{PQ}=5$ cm예요.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 4,
      q: '빗변의 길이가 12 cm인 직각삼각형에서 외심과 직각인 꼭짓점 사이의 거리는 몇 cm일까요?',
      answer: '6',
      wrong: [
        { a: '12', why: '빗변 전체를 썼어요. 외심은 빗변의 중점이고, 외심에서 세 꼭짓점까지의 거리는 모두 반지름이에요.' },
        { a: '4', why: '빗변을 3으로 나누었어요. 외심은 빗변의 중점이에요.' },
      ],
      explain: '직각삼각형의 외심은 빗변의 중점이고, 외심에서 세 꼭짓점까지의 거리는 모두 같아요(외접원의 반지름). 그래서 $12\\div2=6$ (cm)예요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '°', concept: 4,
      q: '점 O는 $\\triangle ABC$의 외심이에요. $\\angle OAB=20°$, $\\angle OBC=30°$일 때, $\\angle x$의 크기는 몇 도일까요?',
      fig: circumFig(50, 70, { angles: [['A', 'B', 'O', '20°', 1, 28], ['B', 'C', 'O', '30°', 1, 28], ['C', 'A', 'O', 'x', 1, 24]], alt: '외심 O 와 삼각형 ABC, 각 OAB 20도, 각 OBC 30도, 각 OCA 는 x' }),
      answer: '40',
      hint: '$\\angle OAB+\\angle OBC+\\angle OCA$의 값을 떠올려 보세요.',
      wrong: [
        { a: '130', why: '$180°$에서 뺐어요. 외심에서는 $\\angle OAB+\\angle OBC+\\angle OCA=90°$예요.' },
        { a: '50', why: '두 각을 더하기만 했어요. $90°$에서 빼요.' },
      ],
      explain: '$\\angle OAB+\\angle OBC+\\angle OCA=90°$이므로 $\\angle x=90°-20°-30°=40°$예요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '점 I는 $\\triangle ABC$의 내심이에요. $\\angle A=70°$일 때, $\\angle BIC$의 크기는 몇 도일까요?',
      fig: inFig(60, 50, { join: ['B', 'C'], angles: [['A', 'B', 'C', '70°', 1, 20], ['I', 'B', 'C', 'x', 1, 14]], alt: '내심 I 와 삼각형 ABC, 각 A 는 70도' }),
      answer: '125',
      hint: '$\\angle IBC+\\angle ICB$는 $\\angle B+\\angle C$의 절반이에요.',
      wrong: [
        { a: '140', why: '외심의 성질 $2\\angle A$를 썼어요. 내심은 $90°+\\frac{1}{2}\\angle A$예요.' },
        { a: '110', why: '$180°-\\angle A$를 계산했어요. $\\angle IBC+\\angle ICB=\\frac{1}{2}(\\angle B+\\angle C)$예요.' },
      ],
      explain: '$\\angle B+\\angle C=110°$이고, BI와 CI는 각의 이등분선이므로 $\\angle IBC+\\angle ICB=55°$예요. 그래서 $\\angle BIC=180°-55°=125°$예요. ($90°+\\frac{1}{2}\\times70°=125°$로도 구해요.)',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 5,
      q: '삼각형의 외심과 내심에 대한 설명으로 **옳지 않은** 것은 무엇일까요?',
      choices: [
        '내심에서 세 꼭짓점까지의 거리는 모두 같아요.',
        '외심에서 세 꼭짓점까지의 거리는 모두 같아요.',
        '내심은 세 내각의 이등분선의 교점이에요.',
        '둔각삼각형의 외심은 삼각형의 외부에 있어요.',
      ],
      answer: 0,
      why: [
        '',
        '옳은 설명이에요. 외심은 외접원의 중심이라 세 꼭짓점까지의 거리가 반지름으로 같아요.',
        '옳은 설명이에요. 각의 이등분선 위의 점은 두 변까지의 거리가 같기 때문이에요.',
        '옳은 설명이에요. 예각삼각형은 내부, 직각삼각형은 빗변의 중점, 둔각삼각형은 외부에 외심이 있어요.',
      ],
      explain: '내심에서 같은 것은 세 **변**까지의 거리(내접원의 반지름)예요. 세 **꼭짓점**까지의 거리가 같은 점은 외심이에요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 5,
      q: '$\\triangle ABC$의 내접원의 반지름의 길이가 2 cm이고, 세 변의 길이의 합이 24 cm예요. $\\triangle ABC$의 넓이는 몇 cm²일까요?',
      answer: '24',
      hint: '내심과 세 꼭짓점을 이어 삼각형 세 개로 나누어 보세요.',
      wrong: [{ a: '48', why: '$\\frac{1}{2}$을 곱하는 것을 빠뜨렸어요. 넓이는 $\\frac{1}{2}r(a+b+c)$예요.' }],
      explain: '내심과 세 꼭짓점을 이으면 높이가 2 cm인 삼각형 세 개로 나뉘어요. 넓이는 $\\frac{1}{2}\\times2\\times24=24$ (cm²)예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '°', concept: 0,
      q: '$\\overline{AB}=\\overline{AC}$이고 $\\angle A=36°$인 이등변삼각형 ABC가 있어요. 변 AC 위에 $\\overline{BC}=\\overline{BD}$가 되도록 점 D를 잡을 때, $\\angle x$($\\angle ABD$)의 크기는 몇 도일까요?',
      fig: goldenFig(),
      answer: '36',
      hint: '$\\triangle BCD$도 이등변삼각형이에요. 어느 두 각이 같을까요?',
      wrong: [
        { a: '72', why: '$\\angle ABC$ 전체를 구했어요. 여기서 $\\angle DBC$를 빼야 해요.' },
        { a: '54', why: '$\\triangle BCD$에서 같은 두 각을 잘못 골랐어요. $\\overline{BC}=\\overline{BD}$이므로 $\\angle BDC=\\angle C$예요.' },
      ],
      explain: '$\\angle ABC=\\angle C=(180°-36°)\\div2=72°$예요. $\\triangle BCD$에서 $\\overline{BC}=\\overline{BD}$이므로 $\\angle BDC=\\angle C=72°$이고, $\\angle DBC=180°-72°\\times2=36°$예요. 그래서 $\\angle x=72°-36°=36°$예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm²', concept: 3,
      q: '$\\angle C=90°$인 직각삼각형 ABC에서 $\\angle A$의 이등분선이 변 BC와 만나는 점을 D, 점 D에서 변 AB에 내린 수선의 발을 E라고 해요. $\\overline{AB}=10$ cm, $\\overline{CD}=3$ cm일 때, $\\triangle ABD$의 넓이는 몇 cm²일까요?',
      fig: rightBisectFig(),
      answer: '15',
      hint: '$\\overline{DE}$의 길이는 $\\overline{DC}$와 같아요. 왜 그럴까요?',
      wrong: [
        { a: '30', why: '$\\frac{1}{2}$을 곱하는 것을 빠뜨렸어요.' },
        { a: '24', why: '$\\triangle ABC$ 전체의 넓이를 구했어요. 묻는 것은 $\\triangle ABD$예요.' },
      ],
      explain: '점 D는 $\\angle A$의 이등분선 위에 있으므로 두 변 AC, AB까지의 거리가 같아요. 그래서 $\\overline{DE}=\\overline{DC}=3$ cm예요($\\triangle ADC\\equiv\\triangle ADE$, RHA 합동). $\\triangle ABD$는 밑변 $\\overline{AB}=10$ cm, 높이 $\\overline{DE}=3$ cm이므로 넓이는 $\\frac{1}{2}\\times10\\times3=15$ (cm²)예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '°', concept: 4,
      q: '점 O는 $\\triangle ABC$의 외심이에요. $\\angle A=50°$일 때, $\\angle x$($\\angle OBC$)의 크기는 몇 도일까요?',
      fig: circumFig(60, 70, { join: ['B', 'C'], angles: [['A', 'B', 'C', '50°', 1, 20], ['B', 'C', 'O', 'x', 1, 24]], alt: '외심 O 와 삼각형 ABC, 각 A 는 50도' }),
      answer: '40',
      hint: '$\\angle BOC$를 먼저 구하고, $\\triangle OBC$가 어떤 삼각형인지 살펴보세요.',
      wrong: [
        { a: '100', why: '$\\angle BOC$를 구했어요. $\\triangle OBC$의 밑각까지 구해야 해요.' },
        { a: '65', why: '$\\angle BOC=\\angle A$로 생각했어요. 외심에서는 $\\angle BOC=2\\angle A$예요.' },
      ],
      explain: '$\\angle BOC=2\\angle A=100°$예요. $\\overline{OB}=\\overline{OC}$이므로 $\\triangle OBC$는 이등변삼각형이고, $\\angle x=(180°-100°)\\div2=40°$예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '점 I는 $\\triangle ABC$의 내심이에요. $\\angle BIC=116°$일 때, $\\angle x$($\\angle A$)의 크기는 몇 도일까요?',
      fig: inFig(60, 68, { join: ['B', 'C'], angles: [['A', 'B', 'C', 'x', 1, 20], ['I', 'B', 'C', '116°', 1, 14]], alt: '내심 I 와 삼각형 ABC, 각 BIC 는 116도' }),
      answer: '52',
      hint: '$\\angle BIC=90°+\\frac{1}{2}\\angle A$를 거꾸로 써 보세요.',
      wrong: [
        { a: '26', why: '$116°-90°=26°$는 $\\angle A$의 절반이에요. 2배 해요.' },
        { a: '58', why: '외심의 성질($\\angle BOC=2\\angle A$)을 썼어요. 내심은 $90°+\\frac{1}{2}\\angle A$예요.' },
      ],
      explain: '$90°+\\frac{1}{2}\\angle A=116°$이므로 $\\frac{1}{2}\\angle A=26°$, $\\angle A=52°$예요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '$\\triangle ABC$에서 $\\angle A=40°$이고, 외심을 O, 내심을 I라고 해요. $\\angle BIC-\\angle BOC$의 크기는 몇 도일까요?',
      answer: '30',
      hint: '외심과 내심의 각의 성질을 각각 써 보세요.',
      wrong: [
        { a: '-30', why: '빼는 순서를 바꾸었어요. $\\angle BIC=110°$가 $\\angle BOC=80°$보다 커요.' },
        { a: '70', why: '$\\angle BOC$를 $40°$로 보았어요. 외심에서는 $\\angle BOC=2\\angle A=80°$예요.' },
      ],
      explain: '외심: $\\angle BOC=2\\times40°=80°$. 내심: $\\angle BIC=90°+\\frac{1}{2}\\times40°=110°$. 차는 $110°-80°=30°$예요.',
    },
  ],

  deeper: [
    {
      title: '정삼각형에서는 외심과 내심이 한 점',
      body: '정삼각형은 세 변이 같고 세 각이 같아서, 한 꼭짓점에서 그은 각의 이등분선이 맞은편 변의 수직이등분선이기도 해요(이등변삼각형의 성질). 그래서 세 내각의 이등분선의 교점(내심)과 세 변의 수직이등분선의 교점(외심)이 **같은 점**이 돼요.\n\n' +
        '이등변삼각형에서는 외심과 내심이 모두 꼭지각의 이등분선 위에 있지만, 일반적으로 서로 다른 점이에요. 다음 단원 이후에는 삼각형의 세 중선이 만나는 **무게중심**도 배우는데, 정삼각형에서는 이 점까지 모두 한 점에서 만나요.',
    },
    {
      title: '외심과 내심을 생활에서 찾기',
      body: '세 도시에서 같은 거리에 있는 곳에 소방서나 기지국을 세우려면 외심을 찾으면 돼요. 세 도시를 꼭짓점으로 하는 삼각형의 변마다 수직이등분선을 그어 만나는 점이에요.\n\n' +
        '삼각형 모양 땅에 가장 큰 원 모양 화단을 만들려면 내심을 중심으로 내접원을 그려요. 이처럼 "꼭짓점에서 같은 거리"인지 "변에서 같은 거리"인지에 따라 외심과 내심을 골라 써요.',
    },
  ],

  faq: [
    {
      q: '외심과 내심이 자꾸 헷갈려요.',
      a: '이름으로 기억해 보세요. **외**심은 삼각형 바깥을 둘러싸는 원(외접원)의 중심이라 세 **꼭짓점**까지 거리가 같고, 세 변의 **수직이등분선**이 만나는 점이에요. **내**심은 삼각형 안에 들어가는 원(내접원)의 중심이라 세 **변**까지 거리가 같고, 세 **내각의 이등분선**이 만나는 점이에요.',
    },
    {
      q: 'RHA, RHS 합동은 왜 직각삼각형에만 써요?',
      a: '직각이라는 정보가 이미 하나 있기 때문이에요. 일반 삼각형에서 "두 변과 끼인각이 아닌 한 각"이 같으면 합동이 아닐 수도 있지만, 그 각이 직각이고 그 대변이 빗변일 때는 항상 합동이에요. 그래서 직각삼각형에만 특별히 쓰는 조건이에요.',
    },
    {
      q: '증명은 왜 해야 해요? 그림으로 재 보면 되잖아요.',
      a: '그림은 하나의 경우만 보여 주고, 각도기로 재면 오차가 생겨요. 증명은 이미 옳다고 밝혀진 성질(합동 조건 등)만을 근거로 하기 때문에 **모든** 경우에 옳다는 것을 보장해요. 한 번 증명한 성질은 다음 증명의 근거로 다시 쓸 수 있어요.',
    },
  ],

  mistakes: [
    '외심의 성질($\\angle BOC=2\\angle A$)과 내심의 성질($\\angle BIC=90°+\\frac{1}{2}\\angle A$)을 바꿔 쓰는 실수 — 외심은 꼭짓점, 내심은 변과 관계가 있어요.',
    '빗변이 아닌 변을 빗변으로 착각해 RHS 합동이라고 하는 실수 — 빗변은 직각의 대변이에요.',
    '이등변삼각형에서 꼭지각과 밑각을 헷갈리는 실수 — 크기가 같은 두 각은 길이가 같은 두 변의 끼인각이 아니라 밑변의 양 끝 각이에요.',
  ],

  gens: [
    {
      id: 'iso-angle',
      level: 1,
      title: '이등변삼각형의 꼭지각과 밑각',
      make: function (R) {
        var askBase = R.bool(), apex, base;
        if (askBase) { apex = 2 * R.int(10, 70); base = (180 - apex) / 2; }
        else { base = R.int(20, 80); apex = 180 - 2 * base; }
        var ans = askBase ? base : apex;
        var wrong = [];
        function add(x, why) {
          if (x === ans || x <= 0) return;
          for (var i = 0; i < wrong.length; i++) if (wrong[i].a === String(x)) return;
          wrong.push({ a: String(x), why: why });
        }
        if (askBase) {
          add(180 - apex, '$180°-' + apex + '°$에서 멈췄어요. 두 밑각의 크기가 같으니 2로 나누어요.');
          add(apex, '꼭지각과 밑각이 같다고 생각했어요. 크기가 같은 것은 두 밑각끼리예요.');
        } else {
          add(180 - base, '밑각 하나만 뺐어요. $\\angle C$도 $' + base + '°$이므로 두 밑각을 모두 빼요.');
          add(base, '꼭지각과 밑각이 같다고 생각했어요. 크기가 같은 것은 두 밑각끼리예요.');
        }
        return {
          type: 'short', check: 'number', unit: '°', concept: 0,
          q: '$\\overline{AB}=\\overline{AC}$인 이등변삼각형 ABC에서 ' + (askBase ? '$\\angle A=' + apex + '°$' : '$\\angle B=' + base + '°$') + '일 때, $\\angle x$의 크기는 몇 도일까요?',
          fig: isoFig(base, askBase ? { apex: apex + '°', base: 'x' } : { base: base + '°', apex: 'x' }),
          answer: String(ans),
          wrong: wrong,
          explain: askBase
            ? '두 밑각의 크기가 같으므로 $\\angle x=(180°-' + apex + '°)\\div2=' + base + '°$예요.'
            : '두 밑각의 크기가 같으므로 $\\angle C=' + base + '°$예요. $\\angle x=180°-' + base + '°\\times2=' + apex + '°$예요.',
        };
      },
    },
    {
      id: 'iso-exterior',
      level: 2,
      title: '이등변삼각형과 외각',
      make: function (R) {
        var a = 2 * R.int(10, 70), base = (180 - a) / 2, ext = 180 - base;
        var askExt = R.bool();
        var ans = askExt ? ext : a;
        var wrong = [];
        function add(x, why) {
          if (x === ans || x <= 0) return;
          for (var i = 0; i < wrong.length; i++) if (wrong[i].a === String(x)) return;
          wrong.push({ a: String(x), why: why });
        }
        if (askExt) {
          add(base, '$\\angle ACB$를 구했어요. $\\angle x$는 그 바깥쪽 각(외각)이에요.');
          add(180 - a, '$180°-\\angle A$를 계산했어요. 먼저 밑각 $\\angle ACB$를 구해요.');
          add(a, '외각이 꼭지각과 같다고 생각했어요. 외각은 이웃하지 않는 두 내각의 합이에요.');
        } else {
          add(180 - ext, '$\\angle ACB$(밑각)를 구했어요. 꼭지각까지 구해야 해요.');
          add(ext - 90, '외각에서 $90°$를 뺀 값은 꼭지각의 절반이에요. 2배 해요.');
          add(ext - (180 - ext) / 2, '외각에서 밑각의 절반을 뺐어요. 외각은 $\\angle A+\\angle B$이므로 $\\angle A=' + ext + '°-\\angle B$예요.');
        }
        return {
          type: 'short', check: 'number', unit: '°', concept: 0,
          q: '$\\overline{AB}=\\overline{AC}$인 이등변삼각형 ABC에서 변 BC의 연장선 위에 점 D를 잡았어요. ' +
            (askExt ? '$\\angle A=' + a + '°$일 때, $\\angle x$($\\angle ACD$)의 크기는 몇 도일까요?' : '$\\angle ACD=' + ext + '°$일 때, $\\angle x$($\\angle A$)의 크기는 몇 도일까요?'),
          fig: isoFig(base, askExt ? { apex: a + '°', ext: 'x' } : { apex: 'x', ext: ext + '°' }),
          answer: String(ans),
          wrong: wrong,
          hint: askExt ? '먼저 밑각 $\\angle ACB$의 크기를 구해 보세요.' : '$\\angle ACB$를 먼저 구하면 $\\angle B$도 알 수 있어요.',
          explain: askExt
            ? '$\\angle ACB=(180°-' + a + '°)\\div2=' + base + '°$이므로 $\\angle x=180°-' + base + '°=' + ext + '°$예요. (외각은 이웃하지 않는 두 내각의 합: $' + a + '°+' + base + '°=' + ext + '°$)'
            : '$\\angle ACB=180°-' + ext + '°=' + base + '°$이고 두 밑각의 크기가 같으므로 $\\angle B=' + base + '°$예요. $\\angle x=180°-' + base + '°\\times2=' + a + '°$예요.',
        };
      },
    },
    {
      id: 'circum-angle',
      level: 2,
      title: '외심과 각의 크기',
      make: function (R) {
        var kind = R.int(0, 2), ans, q, fig, explain, hint, wrong = [];
        function add(x, why) {
          if (x === ans || x <= 0) return;
          for (var i = 0; i < wrong.length; i++) if (wrong[i].a === String(x)) return;
          wrong.push({ a: String(x), why: why });
        }
        if (kind === 0) {
          var x1, x2, x3;
          do { x1 = R.int(10, 40); x2 = R.int(10, 40); x3 = 90 - x1 - x2; } while (x3 < 15 || x3 > 60);
          ans = x3;
          q = '점 O는 $\\triangle ABC$의 외심이에요. $\\angle OAB=' + x1 + '°$, $\\angle OBC=' + x2 + '°$일 때, $\\angle x$($\\angle OCA$)의 크기는 몇 도일까요?';
          fig = circumFig(x1 + x2, x2 + x3, { angles: [['A', 'B', 'O', x1 + '°', 1, 28], ['B', 'C', 'O', x2 + '°', 1, 28], ['C', 'A', 'O', 'x', 1, 24]] });
          hint = '외심에서는 $\\angle OAB+\\angle OBC+\\angle OCA$가 일정해요.';
          add(180 - x1 - x2, '$180°$에서 뺐어요. 외심에서는 세 각의 합이 $90°$예요.');
          add(x1 + x2, '두 각을 더하기만 했어요. $90°$에서 빼요.');
          explain = '$\\angle OAB+\\angle OBC+\\angle OCA=90°$이므로 $\\angle x=90°-' + x1 + '°-' + x2 + '°=' + x3 + '°$예요.';
        } else {
          var a = R.int(30, 80);
          var B = R.int(Math.max(25, 95 - a), Math.min(85, 155 - a)), C = 180 - a - B;
          var t = 2 * a;
          if (kind === 1) {
            ans = t;
            q = '점 O는 $\\triangle ABC$의 외심이에요. $\\angle A=' + a + '°$일 때, $\\angle x$($\\angle BOC$)의 크기는 몇 도일까요?';
            fig = circumFig(B, C, { join: ['B', 'C'], angles: [['A', 'B', 'C', a + '°', 1, 20], ['O', 'B', 'C', 'x', 1, 16]] });
            add(a, '$\\angle BOC$가 $\\angle A$와 같다고 생각했어요. 외심에서는 $\\angle BOC=2\\angle A$예요.');
            if (a % 2 === 0) add(90 + a / 2, '내심의 성질($90°+\\frac{1}{2}\\angle A$)을 썼어요. 외심은 $2\\angle A$예요.');
            add(180 - a, '$180°-\\angle A$를 계산했어요. 외심에서는 $\\angle BOC=2\\angle A$예요.');
            explain = '외심에서는 $\\angle BOC=2\\angle A$이므로 $\\angle x=2\\times' + a + '°=' + t + '°$예요.';
          } else {
            ans = a;
            q = '점 O는 $\\triangle ABC$의 외심이에요. $\\angle BOC=' + t + '°$일 때, $\\angle x$($\\angle A$)의 크기는 몇 도일까요?';
            fig = circumFig(B, C, { join: ['B', 'C'], angles: [['A', 'B', 'C', 'x', 1, 20], ['O', 'B', 'C', t + '°', 1, 16]] });
            add(t, '$\\angle A$가 $\\angle BOC$와 같다고 생각했어요. $\\angle BOC=2\\angle A$이므로 2로 나누어요.');
            add(180 - t, '$180°-\\angle BOC$를 계산했어요. $\\angle A=\\frac{1}{2}\\angle BOC$예요.');
            add(2 * (t - 90), '내심의 성질을 거꾸로 썼어요. 외심에서는 $\\angle A=\\frac{1}{2}\\angle BOC$예요.');
            explain = '외심에서는 $\\angle BOC=2\\angle A$이므로 $\\angle x=' + t + '°\\div2=' + a + '°$예요.';
          }
          hint = '외심에서 $\\angle BOC$와 $\\angle A$ 사이의 관계를 떠올려 보세요.';
        }
        return {
          type: 'short', check: 'number', unit: '°', concept: 4,
          q: q, fig: fig, answer: String(ans), wrong: wrong, hint: hint, explain: explain,
        };
      },
    },
    {
      id: 'in-angle',
      level: 2,
      title: '내심과 각의 크기',
      make: function (R) {
        var kind = R.int(0, 2), ans, q, fig, explain, hint, wrong = [];
        function add(x, why) {
          if (x === ans || x <= 0) return;
          for (var i = 0; i < wrong.length; i++) if (wrong[i].a === String(x)) return;
          wrong.push({ a: String(x), why: why });
        }
        if (kind === 0) {
          var x1, x2, x3;
          do { x1 = R.int(10, 40); x2 = R.int(10, 40); x3 = 90 - x1 - x2; } while (x3 < 15 || x3 > 60);
          ans = x3;
          q = '점 I는 $\\triangle ABC$의 내심이에요. $\\angle IAB=' + x1 + '°$, $\\angle IBC=' + x2 + '°$일 때, $\\angle x$($\\angle ICA$)의 크기는 몇 도일까요?';
          fig = inFig(2 * x2, 2 * x3, { angles: [['A', 'B', 'I', x1 + '°', 1, 30], ['B', 'C', 'I', x2 + '°', 1, 30], ['C', 'A', 'I', 'x', 1, 26]] });
          hint = '내심과 꼭짓점을 이은 선분은 각의 이등분선이에요. 세 내각의 절반을 더하면 얼마일까요?';
          add(180 - x1 - x2, '$180°$에서 뺐어요. 세 내각의 절반의 합은 $90°$예요.');
          add(2 * x3, '$\\angle C$ 전체를 구했어요. CI는 $\\angle C$를 이등분해요.');
          explain = '세 내각의 이등분선이므로 $\\angle IAB+\\angle IBC+\\angle ICA=\\frac{1}{2}\\times180°=90°$예요. 그래서 $\\angle x=90°-' + x1 + '°-' + x2 + '°=' + x3 + '°$예요.';
        } else {
          var a = 2 * R.int(15, 65);
          var B = R.int(20, 160 - a), C = 180 - a - B;
          var t = 90 + a / 2;
          if (kind === 1) {
            ans = t;
            q = '점 I는 $\\triangle ABC$의 내심이에요. $\\angle A=' + a + '°$일 때, $\\angle x$($\\angle BIC$)의 크기는 몇 도일까요?';
            fig = inFig(B, C, { join: ['B', 'C'], angles: [['A', 'B', 'C', a + '°', 1, 20], ['I', 'B', 'C', 'x', 1, 14]] });
            add(2 * a, '외심의 성질($2\\angle A$)을 썼어요. 내심은 $90°+\\frac{1}{2}\\angle A$예요.');
            add(180 - a, '$180°-\\angle A$를 계산했어요. $\\angle IBC+\\angle ICB$는 $\\angle B+\\angle C$의 절반이에요.');
            add(90 - a / 2, '$90°$에서 뺐어요. $\\angle BIC=90°+\\frac{1}{2}\\angle A$예요.');
            explain = '$\\angle IBC+\\angle ICB=\\frac{1}{2}(180°-' + a + '°)=' + (90 - a / 2) + '°$이므로 $\\angle x=180°-' + (90 - a / 2) + '°=' + t + '°$예요. ($90°+\\frac{1}{2}\\times' + a + '°$와 같아요.)';
          } else {
            ans = a;
            q = '점 I는 $\\triangle ABC$의 내심이에요. $\\angle BIC=' + t + '°$일 때, $\\angle x$($\\angle A$)의 크기는 몇 도일까요?';
            fig = inFig(B, C, { join: ['B', 'C'], angles: [['A', 'B', 'C', 'x', 1, 20], ['I', 'B', 'C', t + '°', 1, 14]] });
            add(t - 90, '$' + t + '°-90°$는 $\\angle A$의 절반이에요. 2배 해요.');
            if (t % 2 === 0) add(t / 2, '외심의 성질($\\angle BOC=2\\angle A$)을 썼어요. 내심은 $\\angle BIC=90°+\\frac{1}{2}\\angle A$예요.');
            add(180 - t, '$180°-\\angle BIC$는 $\\angle IBC+\\angle ICB$예요. 여기서 $\\angle A$를 구해야 해요.');
            explain = '$90°+\\frac{1}{2}\\angle A=' + t + '°$이므로 $\\frac{1}{2}\\angle A=' + (t - 90) + '°$, $\\angle x=' + a + '°$예요.';
          }
          hint = '내심에서는 $\\angle BIC=90°+\\frac{1}{2}\\angle A$예요.';
        }
        return {
          type: 'short', check: 'number', unit: '°', concept: 5,
          q: q, fig: fig, answer: String(ans), wrong: wrong, hint: hint, explain: explain,
        };
      },
    },
  ],
});

  // 삼각형 ABC (B 왼쪽 아래, C 오른쪽 아래). o.A·o.B·o.C: 각 글, o.AB·o.BC·o.CA: 변 글
  function triFig(b, c, o) {
    o = o || {};
    var T = tri(b, c), G = [(T.A[0] + 1) / 3, T.A[1] / 3];
    var spec = { pts: { A: T.A, B: T.B, C: T.C }, polys: [['A', 'B', 'C']], angles: [], labels: ['A', 'B', 'C'], texts: [] };
    if (o.A) spec.angles.push(['A', 'B', 'C', o.A, 1, 20]);
    if (o.B) spec.angles.push(['B', 'C', 'A', o.B]);
    if (o.C) spec.angles.push(['C', 'A', 'B', o.C]);
    [['AB', T.A, T.B], ['BC', T.B, T.C], ['CA', T.C, T.A]].forEach(function (e) {
      if (!o[e[0]]) return;
      var M = mid(e[1], e[2]), d = dist(M, G) || 1, k = 0.12;
      spec.texts.push([[M[0] + (M[0] - G[0]) / d * k, M[1] + (M[1] - G[1]) / d * k], o[e[0]], 0, 0]);
    });
    spec.alt = o.alt || '삼각형 ABC';
    return geo(spec);
  }
  // AB=AC, ∠A=36° 인 이등변삼각형과 BC=BD 인 점 D
  function goldenFig() {
    var T = tri(72, 72), D = [Math.cos(rad(36)), Math.sin(rad(36))];
    return geo({
      pts: { A: T.A, B: T.B, C: T.C, D: D }, polys: [['A', 'B', 'C']], lines: [['B', 'D']],
      ticks: [['A', 'B', 1], ['A', 'C', 1], ['B', 'C', 2], ['B', 'D', 2]],
      angles: [['A', 'B', 'C', '36°', 1, 26], ['B', 'A', 'D', 'x', 1, 30]], labels: ['A', 'B', 'C', 'D'], off: { D: [14, -2] },
      alt: '꼭지각이 36도인 이등변삼각형 ABC 와 변 AC 위의 점 D, 선분 BC 와 BD 의 길이가 같아요',
    });
  }
  // ∠C=90°, AB=10, CD=3 인 직각삼각형과 ∠A 의 이등분선 AD, 수선 DE
  function rightBisectFig() {
    return geo({
      pts: { A: [0, 6], C: [0, 0], D: [3, 0], B: [8, 0], E: [4.8, 2.4] }, polys: [['A', 'C', 'B']],
      lines: [['A', 'D'], ['D', 'E', true]], rights: [['C', 'A', 'B'], ['E', 'D', 'B']],
      angles: [['A', 'C', 'D', '', 1, 30], ['A', 'D', 'B', '', 1, 34]], labels: ['A', 'B', 'C', 'D', 'E'],
      off: { A: [-10, -8], C: [-10, 10], D: [0, 15], B: [10, 10], E: [10, -10] },
      texts: [[[4, 3], '10 cm', 22, -14], [[1.5, 0], '3 cm', 0, 14]],
      alt: '각 C 가 직각인 직각삼각형 ABC, 각 A 의 이등분선 AD, 점 D 에서 AB 에 내린 수선 DE',
    });
  }
})();
