/* 기하 · 삼수선 정리와 정사영
 * 직선과 평면의 수직, 삼수선 정리, 이면각과 두 평면이 이루는 각, 점·선분·도형의 정사영,
 * 정사영의 길이 l cosθ 와 넓이 S cosθ 를 다룬다. (좌표·벡터는 쓰지 않는다 — 다음 단원 이후)
 * 그림: 겨냥도는 아래 도우미(scene·boxFig)가 직접 그린 svg — 보이지 않는 선은 점선 */
(function () {
  var C1 = 'var(--fig-1, #2563eb)', C2 = 'var(--fig-2, #f59e0b)', C4 = 'var(--fig-4, #ef4444)';

  // ---------- 그림 도우미 ----------
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  // 겨냥도 투영: x 는 오른쪽, y 는 안쪽(비스듬히 오른쪽 위), z 는 위
  function prj(p) { return [p[0] + 0.5 * p[1], -(p[2] + 0.35 * p[1])]; }
  function unit3(v) { var l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function txt(q, s, color) {
    return '<text x="' + r1(q[0]) + '" y="' + r1(q[1]) + '" font-size="13" text-anchor="middle" dominant-baseline="central" fill="' + (color || 'currentColor') + '">' + s + '</text>';
  }
  /* 3차원 장면 → svg 그림 칸
     o.planes: [{ pts: [[x,y,z],…], label?, at?: [x,y,z], color? }]   옅게 칠한 평면
     o.segs:   [{ a, b, dash?, color?, w? }]                          선분 (a, b: [x,y,z])
     o.pts:    [{ p, label?, dot?, off?: [dx,dy] }]                    점과 이름 (이름은 그림 바깥쪽으로)
     o.texts:  [{ p, s, color?, off?: [dx,dy] }]                       글
     o.rights: [{ at, u, v }]                                          직각 표시 (u, v: 두 방향) */
  function scene(o, alt) {
    var W = o.width || 260, all = [];
    (o.planes || []).forEach(function (pl) { pl.pts.forEach(function (p) { all.push(prj(p)); }); });
    (o.segs || []).forEach(function (s) { all.push(prj(s.a), prj(s.b)); });
    (o.pts || []).forEach(function (q) { all.push(prj(q.p)); });
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    all.forEach(function (q) {
      minX = Math.min(minX, q[0]); maxX = Math.max(maxX, q[0]);
      minY = Math.min(minY, q[1]); maxY = Math.max(maxY, q[1]);
    });
    var M = 24, sc = (W - 2 * M) / Math.max(maxX - minX, 1e-6);
    if ((maxY - minY) * sc > 250) sc = 250 / (maxY - minY);
    var cw = (maxX - minX) * sc;
    W = Math.max(Math.round(cw + 2 * M), 200); // 길쭉한 그림도 너비 200 이상 (가운데 맞춤)
    var ox = (W - cw) / 2;
    var H = Math.round((maxY - minY) * sc + 2 * M);
    var cx = W / 2, cy = H / 2;
    function P(p) { var q = prj(p); return [ox + (q[0] - minX) * sc, M + (q[1] - minY) * sc]; }
    function line(a, b, dash, color, w) {
      return '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" stroke="' + (color || 'currentColor') +
        '" stroke-width="' + (w || (dash ? 1.5 : 2)) + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>';
    }
    var body = '';
    (o.planes || []).forEach(function (pl) {
      var d = pl.pts.map(function (p) { var q = P(p); return r1(q[0]) + ' ' + r1(q[1]); }).join(' L ');
      body += '<path d="M ' + d + ' Z" fill="' + (pl.color || C1) + '" fill-opacity="0.12" stroke="currentColor" stroke-width="1.2"/>';
      if (pl.label) body += txt(P(pl.at || pl.pts[0]), pl.label);
    });
    (o.segs || []).forEach(function (s) { body += line(P(s.a), P(s.b), s.dash, s.color, s.w); });
    (o.rights || []).forEach(function (rt) {
      var e = rt.size || 0.22, u = unit3(rt.u), v = unit3(rt.v), a = rt.at;
      var p1 = [a[0] + e * u[0], a[1] + e * u[1], a[2] + e * u[2]];
      var p3 = [a[0] + e * v[0], a[1] + e * v[1], a[2] + e * v[2]];
      var p2 = [p1[0] + e * v[0], p1[1] + e * v[1], p1[2] + e * v[2]];
      body += '<path d="M ' + [p1, p2, p3].map(function (p) { var q = P(p); return r1(q[0]) + ' ' + r1(q[1]); }).join(' L ') + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
    });
    (o.pts || []).forEach(function (q) {
      var s = P(q.p);
      if (q.dot !== false) body += '<circle cx="' + r1(s[0]) + '" cy="' + r1(s[1]) + '" r="2.6" fill="currentColor"/>';
      if (q.label) {
        var off = q.off;
        if (!off) {
          var dx = s[0] - cx, dy = s[1] - cy, l = Math.sqrt(dx * dx + dy * dy) || 1;
          off = [13 * dx / l, 13 * dy / l];
        }
        body += txt([s[0] + off[0], s[1] + off[1]], q.label);
      }
    });
    (o.texts || []).forEach(function (t) { var s = P(t.p), off = t.off || [0, 0]; body += txt([s[0] + off[0], s[1] + off[1]], t.s, t.color); });
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + body + '</svg>', alt: alt };
  }
  // 직육면체 ABCD-EFGH (밑면 ABCD, A 가 앞 왼쪽 아래)
  function boxV(a, b, c) {
    return { A: [0, 0, 0], B: [a, 0, 0], C: [a, b, 0], D: [0, b, 0], E: [0, 0, c], F: [a, 0, c], G: [a, b, c], H: [0, b, c] };
  }
  var BOX_E = ['AB', 'BC', 'CD', 'DA', 'EF', 'FG', 'GH', 'HE', 'AE', 'BF', 'CG', 'DH'];
  // 보이는 면은 윗면 EFGH·앞면 ABFE·오른쪽 면 BCGF. 두 끝점이 한 보이는 면 위에 있으면 실선, 아니면 점선
  function boxSeen(p, q, a, c) {
    return (p[2] === c && q[2] === c) || (p[1] === 0 && q[1] === 0) || (p[0] === a && q[0] === a);
  }
  /* o.hl: [['AB', 색?], …] 강조할 선분, o.dims: { a: '3', b: '4', c: '2' } 모서리 길이 글 */
  function boxFig(o, alt) {
    var a = o.a || 1, b = o.b || 1, c = o.c || 1, V = boxV(a, b, c);
    var segs = BOX_E.map(function (e) { return { a: V[e[0]], b: V[e[1]], dash: !boxSeen(V[e[0]], V[e[1]], a, c) }; });
    (o.hl || []).forEach(function (h) {
      var p = V[h[0][0]], q = V[h[0][1]];
      segs.push({ a: p, b: q, color: h[1] || C4, w: 3, dash: !boxSeen(p, q, a, c) });
    });
    var pts = 'ABCDEFGH'.split('').map(function (k) { return { p: V[k], label: k, dot: false }; });
    var texts = [];
    if (o.dims) {
      if (o.dims.a) texts.push({ p: [a / 2, 0, 0], s: o.dims.a, off: [0, 13] });
      if (o.dims.b) texts.push({ p: [a, b / 2, 0], s: o.dims.b, off: [14, 6] });
      if (o.dims.c) texts.push({ p: [0, 0, c / 2], s: o.dims.c, off: [-12, 0] });
    }
    return scene({ segs: segs, pts: pts, texts: texts, width: o.width || 240 }, alt);
  }

  // 정육면체 겨냥도 (자주 쓴다)
  function cubeFig(hl, alt) { return boxFig({ hl: hl }, alt); }

  var PLANE = [[0, 0, 0], [5, 0, 0], [5, 4.5, 0], [0, 4.5, 0]];
  // 삼수선 정리 그림: 평면 α 밖의 점 P, 수선의 발 O, α 위의 직선 l, O 에서 l 에 내린 수선의 발 H
  // o.po·o.oh·o.ph: 선분 옆에 쓸 글(없으면 생략)
  function perpFig(o, alt) {
    var O = [1.6, 1.0, 0], P = [1.6, 1.0, 3.0], H = [1.6, 3.3, 0];
    var texts = [{ p: [4.8, 3.3, 0], s: 'l', off: [9, 0] }];
    if (o.po) texts.push({ p: [1.6, 1.0, 1.5], s: o.po, off: [-14, 0] });
    if (o.oh) texts.push({ p: [1.6, 2.15, 0], s: o.oh, off: [13, 6] });
    if (o.ph) texts.push({ p: [1.6, 2.15, 1.5], s: o.ph, off: [14, -4] });
    return scene({
      planes: [{ pts: PLANE, label: 'α', at: [4.6, 0.35, 0] }],
      segs: [
        { a: [0.2, 3.3, 0], b: [4.8, 3.3, 0], color: C1, w: 2.5 },
        { a: P, b: O },
        { a: O, b: H, dash: true },
        { a: P, b: H, color: C4, w: 2.5 },
      ],
      rights: [{ at: O, u: [0, 0, 1], v: [0, 1, 0] }, { at: H, u: [0, -1, 0], v: [1, 0, 0] }],
      pts: [{ p: P, label: 'P', off: [0, -12] }, { p: O, label: 'O', off: [-11, 7] }, { p: H, label: 'H', off: [10, 9] }],
      texts: texts,
    }, alt);
  }
  // 선분 AB 와 평면 α 위로의 정사영 A′B′
  function projSegFig(o, alt) {
    var A = [1, 1, 1.3], B = [4, 1.6, 2.6], A2 = [1, 1, 0], B2 = [4, 1.6, 0], C = [4, 1.6, 1.3];
    var texts = [{ p: [1.55, 1.11, 1.3], s: 'θ', off: [10, 2] }];
    if (o && o.ab) texts.push({ p: [2.5, 1.3, 1.95], s: o.ab, off: [-8, -10] });
    var pts = [{ p: A, label: 'A', off: [-10, -6] }, { p: B, label: 'B', off: [0, -12] }, { p: A2, label: 'A′', off: [-12, 6] }, { p: B2, label: 'B′', off: [12, 6] }];
    if (o && o.c) pts.push({ p: C, label: 'C', off: [11, 2], dot: false });
    return scene({
      planes: [{ pts: PLANE, label: 'α', at: [4.6, 0.35, 0] }],
      segs: [
        { a: A, b: B, color: C4, w: 2.5 },
        { a: A, b: A2, dash: true }, { a: B, b: B2, dash: true }, { a: A, b: C, dash: true },
        { a: A2, b: B2, color: C1, w: 2.5 },
      ],
      rights: [{ at: A2, u: [0, 0, 1], v: [3, 0.6, 0], size: 0.25 }, { at: C, u: [0, 0, 1], v: [-3, -0.6, 0], size: 0.25 }],
      pts: pts,
      texts: texts,
    }, alt);
  }
  // 정사각뿔 O-ABCD: 밑면의 중심 H, 모서리 AB 의 중점 M
  var PY = { A: [0, 0, 0], B: [2, 0, 0], C: [2, 2, 0], D: [0, 2, 0], O: [1, 1, 1.8], H: [1, 1, 0], M: [1, 0, 0] };
  function pyramidFig(alt) {
    var V = PY;
    function s(a, b, dash, color, w) { return { a: V[a], b: V[b], dash: dash, color: color, w: w }; }
    return scene({
      segs: [
        s('A', 'B'), s('B', 'C'), s('C', 'D', true), s('D', 'A', true),
        s('O', 'A'), s('O', 'B'), s('O', 'C'), s('O', 'D', true),
        s('O', 'H', true), s('H', 'M', true), s('O', 'M', false, C4, 2.5),
      ],
      rights: [{ at: V.H, u: [0, 0, 1], v: [0, -1, 0], size: 0.18 }, { at: V.M, u: [0, 1, 1.8], v: [1, 0, 0], size: 0.18 }],
      pts: ['A', 'B', 'C', 'D', 'O'].map(function (k) { return { p: V[k], label: k, dot: false }; })
        .concat([{ p: V.H, label: 'H', off: [10, 6] }, { p: V.M, label: 'M', off: [0, 12] }]),
      width: 230,
    }, alt);
  }
  // 근호 간단히: n = k²m → { tex: 'k\\sqrt{m}', ans: 'k√m', root: m ≠ 1 }
  function surd(n) {
    var k = 1, m = n;
    for (var i = 2; i * i <= m; i++) while (m % (i * i) === 0) { m /= i * i; k *= i; }
    if (m === 1) return { tex: String(k), ans: String(k), root: false };
    return { tex: (k === 1 ? '' : k) + '\\sqrt{' + m + '}', ans: (k === 1 ? '' : k) + '√' + m, root: true };
  }
  // r·√m (r: Frac, m: 1·2·3·6) → TeX·답 글자
  function rootNum(R, r, m) {
    if (m === 1) return { tex: R.fmt.frac(r), ans: r.toString(), root: false };
    var n = r.num, d = r.den;
    var top = (n === 1 ? '' : n) + '\\sqrt{' + m + '}', topA = (n === 1 ? '' : n) + '√' + m;
    return d === 1 ? { tex: top, ans: topA, root: true } : { tex: '\\frac{' + top + '}{' + d + '}', ans: topA + '/' + d, root: true };
  }
  var ANG = [
    { d: 30, c: [1, 2, 3], tex: '\\frac{\\sqrt{3}}{2}' },
    { d: 45, c: [1, 2, 2], tex: '\\frac{\\sqrt{2}}{2}' },
    { d: 60, c: [1, 2, 1], tex: '\\frac{1}{2}' },
  ]; // c: [분자, 분모, 근호 안] — cos 값 = (분자/분모)·√(근호 안)

  Tutor.registerUnit({
    id: 'math-h-geo-06',
    course: 'math-h-geo',
    title: '삼수선 정리와 정사영',
    summary: '직선과 평면의 수직 조건과 삼수선 정리, 이면각을 알고, 선분과 도형의 정사영의 길이와 넓이를 구합니다.',
    goals: [
      '직선과 평면이 수직일 조건을 알고, 이를 이용하여 수직 관계를 설명할 수 있다.',
      '삼수선 정리를 이해하고, 점과 직선 사이의 거리를 구하는 데 활용할 수 있다.',
      '이면각과 두 평면이 이루는 각의 뜻을 알고 그 크기를 구할 수 있다.',
      '정사영의 뜻을 알고, 정사영의 길이와 넓이를 구할 수 있다.',
    ],
    standards: ['[12기하02-02]', '[12기하02-03]'],

    concepts: [
      {
        title: '직선과 평면의 수직',
        body: '직선 $l$이 평면 $\\alpha$와 한 점 O에서 만나고, 점 O를 지나는 $\\alpha$ 위의 **모든 직선과 수직**일 때 직선 $l$과 평면 $\\alpha$는 **수직**이라 하고 $l \\perp \\alpha$로 나타냅니다. 이때 $l$을 평면 $\\alpha$의 **수선**, 점 O를 **수선의 발**이라고 합니다.\n\n모든 직선을 일일이 확인할 수는 없으므로 다음 판정법을 씁니다.\n\n> 💡 직선 $l$이 평면 $\\alpha$ 위의 **한 점에서 만나는 두 직선**과 각각 수직이면 $l \\perp \\alpha$입니다.\n\n또 $l \\perp \\alpha$이면 $l$은 $\\alpha$ 위의 모든 직선과 수직입니다(꼬인 위치에 있는 직선과도 수직).\n\n평면 $\\alpha$ 밖의 점 P에서 $\\alpha$에 내린 수선의 발을 H라 할 때, 선분 PH의 길이를 **점 P와 평면 $\\alpha$ 사이의 거리**라고 합니다.\n\n예: 정육면체 ABCD-EFGH에서 직선 AE는 평면 ABCD 위의 두 직선 AB, AD와 각각 수직이므로 평면 ABCD와 수직입니다. 따라서 직선 AE는 평면 ABCD 위의 직선 BD와도 수직입니다.',
        easy: '책상 위에 연필을 똑바로 세웠다고 생각해 봅시다. 연필이 정말 똑바른지 확인하려면, 연필 밑동을 지나는 책상 위의 선 두 개(예: 가로선과 세로선)에 대해 각각 직각인지만 보면 됩니다. 두 방향에서 모두 직각이면 어느 방향에서 보아도 똑바로 서 있습니다.\n\n한 방향만 직각이면 부족합니다. 연필이 다른 방향으로 기울어 있을 수 있기 때문입니다.',
        fig: scene({
          planes: [{ pts: PLANE, label: 'α', at: [4.6, 0.35, 0] }],
          segs: [
            { a: [0.8, 1.5, 0], b: [4.2, 2.9, 0], color: C1, w: 2 },
            { a: [1.6, 3.4, 0], b: [3.4, 1.0, 0], color: C1, w: 2 },
            { a: [2.5, 2.2, 0], b: [2.5, 2.2, 2.6], color: C4, w: 2.5 },
          ],
          rights: [{ at: [2.5, 2.2, 0], u: [0, 0, 1], v: [1.7, 0.7, 0] }, { at: [2.5, 2.2, 0], u: [0, 0, 1], v: [0.9, -1.2, 0] }],
          pts: [{ p: [2.5, 2.2, 0], label: 'O', off: [-12, 6] }],
          texts: [{ p: [2.5, 2.2, 2.6], s: 'l', off: [9, 0] }],
        }, '평면 α 위의 점 O에서 만나는 두 직선과 각각 수직인 직선 l'),
        check: {
          type: 'ox',
          q: '직선 $l$이 평면 $\\alpha$ 위의 한 직선과 수직이면 $l \\perp \\alpha$입니다.',
          answer: false,
          explain: '한 직선과만 수직이면 $l$이 다른 방향으로 기울어 있을 수 있습니다. 평면 위의 한 점에서 만나는 두 직선과 각각 수직이어야 $l \\perp \\alpha$입니다.',
        },
      },
      {
        title: '삼수선 정리',
        body: '평면 $\\alpha$ 위에 있지 않은 점 P, 평면 $\\alpha$ 위의 점 O, $\\alpha$ 위의 직선 $l$, 직선 $l$ 위의 점 H에 대하여 다음이 성립합니다. 이것을 **삼수선 정리**라고 합니다.\n\n1. $\\overline{PO} \\perp \\alpha$, $\\overline{OH} \\perp l$이면 $\\overline{PH} \\perp l$\n2. $\\overline{PO} \\perp \\alpha$, $\\overline{PH} \\perp l$이면 $\\overline{OH} \\perp l$\n3. $\\overline{PH} \\perp l$, $\\overline{OH} \\perp l$, $\\overline{PO} \\perp \\overline{OH}$이면 $\\overline{PO} \\perp \\alpha$\n\n**1의 증명** $\\overline{PO} \\perp \\alpha$이므로 직선 PO는 $\\alpha$ 위의 직선 $l$과 수직입니다. 또 $\\overline{OH} \\perp l$입니다. 곧 $l$은 평면 POH 위의 만나는 두 직선 PO, OH와 각각 수직이므로 평면 POH와 수직이고, 평면 POH 위의 직선 PH와도 수직입니다.\n\n**쓰임** 점 P와 평면 위의 직선 $l$ 사이의 거리 PH를 구할 때, 삼각형 POH가 $\\angle POH=90^\\circ$인 직각삼각형이므로\n\n$\\overline{PH}=\\sqrt{\\overline{PO}^2+\\overline{OH}^2}$\n\n예: $\\overline{PO}=4$, $\\overline{OH}=3$이면 $\\overline{PH}=\\sqrt{16+9}=5$입니다.',
        easy: '방 바닥(평면) 위에 곧게 놓인 막대(직선 $l$)와 천장의 전등(점 P)을 생각해 봅시다. 전등 바로 아래 바닥의 점이 O입니다.\n\nO에서 막대에 수직으로 선을 그어 만나는 점을 H라 하면, 전등에서 막대까지 가장 가까운 점도 바로 H입니다. "바닥에서의 수직"이 "공중에서의 수직"으로 이어지는 것입니다. 수직이 세 번 나와서 삼수선 정리라고 부릅니다.',
        fig: perpFig({}, '평면 α 밖의 점 P, 수선의 발 O, α 위의 직선 l, O에서 l에 내린 수선의 발 H. 선분 PH도 l과 수직이다'),
        check: {
          type: 'short', check: 'number',
          q: '평면 $\\alpha$ 밖의 점 P에서 $\\alpha$에 내린 수선의 발을 O, 점 O에서 $\\alpha$ 위의 직선 $l$에 내린 수선의 발을 H라 합니다. $\\overline{PO}=6$, $\\overline{OH}=8$일 때, 선분 PH의 길이를 구하십시오.',
          answer: '10',
          wrong: [{ a: '14', why: '두 길이를 그냥 더했습니다. 삼각형 POH는 $\\angle POH=90^\\circ$인 직각삼각형이므로 피타고라스 정리를 씁니다.' }],
          explain: '삼수선 정리에 의하여 $\\overline{PH} \\perp l$이고, 삼각형 POH는 $\\angle POH=90^\\circ$인 직각삼각형입니다. $\\overline{PH}=\\sqrt{6^2+8^2}=\\sqrt{100}=10$',
        },
      },
      {
        title: '이면각과 두 평면이 이루는 각',
        body: '평면 위의 한 직선은 평면을 두 부분으로 나누는데, 그 각각을 **반평면**이라고 합니다. 직선 $l$을 공유하는 두 반평면으로 이루어진 도형을 **이면각**이라 하고, $l$을 이면각의 변, 두 반평면을 이면각의 면이라고 합니다.\n\n**이면각의 크기** 변 $l$ 위의 한 점 O에서 두 반평면 위에 각각 $l$에 **수직인** 반직선 OA, OB를 그을 때, $\\angle AOB$의 크기를 이면각의 크기라고 합니다. 이 크기는 점 O의 위치와 관계없이 일정합니다.\n\n**두 평면이 이루는 각** 서로 다른 두 평면이 만나면 네 개의 이면각이 생기는데, 이 가운데 크기가 크지 않은 것($90^\\circ$ 이하)을 두 평면이 이루는 각이라고 합니다. 그 크기가 $90^\\circ$이면 두 평면은 **수직**이라고 합니다.\n\n예: 정육면체 ABCD-EFGH에서 평면 ABCD와 평면 ABGH의 교선은 AB입니다. 평면 ABCD 위에서 $\\overline{BC} \\perp \\overline{AB}$이고, 평면 ABGH 위에서 $\\overline{BG} \\perp \\overline{AB}$이므로 두 평면이 이루는 각은 $\\angle CBG=45^\\circ$입니다.\n\n> ⚠️ 교선에 수직이 아닌 직선을 그으면 각의 크기가 달라집니다. 반드시 교선 위의 같은 점에서 교선에 수직인 두 직선을 긋습니다.',
        easy: '반쯤 펼친 책을 세워 놓았다고 생각해 봅시다. 두 쪽이 벌어진 정도가 이면각입니다.\n\n그 크기를 재려면 책등(교선)에 수직인 방향으로 두 쪽 위에 선을 그어, 그 두 선 사이의 각을 잽니다. 비스듬한 선을 그으면 실제와 다른 각이 나옵니다.',
        fig: scene({
          planes: [
            { pts: [[0, 0, 0], [5, 0, 0], [5, -3, 0], [0, -3, 0]], label: 'α', at: [4.4, -2.6, 0] },
            { pts: [[0, 0, 0], [5, 0, 0], [5, 1.6, 2.4], [0, 1.6, 2.4]], label: 'β', at: [4.4, 1.4, 2.1], color: C2 },
          ],
          segs: [
            { a: [-0.3, 0, 0], b: [5.3, 0, 0], w: 2.5 },
            { a: [2.5, 0, 0], b: [2.5, -2.6, 0], color: C4, w: 2.5 },
            { a: [2.5, 0, 0], b: [2.5, 1.35, 2.0], color: C4, w: 2.5 },
          ],
          rights: [{ at: [2.5, 0, 0], u: [1, 0, 0], v: [0, -1, 0], size: 0.3 }, { at: [2.5, 0, 0], u: [1, 0, 0], v: [0, 1.6, 2.4], size: 0.3 }],
          pts: [{ p: [2.5, 0, 0], label: 'O', off: [-6, 12] }, { p: [2.5, -2.6, 0], label: 'A', off: [-10, 8] }, { p: [2.5, 1.35, 2.0], label: 'B', off: [-10, -8] }],
          texts: [{ p: [5.3, 0, 0], s: 'l', off: [9, 0] }],
        }, '변 l을 공유하는 두 반평면 α, β와, 점 O에서 l에 수직으로 그은 반직선 OA, OB. 각 AOB가 이면각의 크기이다'),
        check: {
          type: 'choice',
          q: '이면각의 크기를 잴 때, 변 $l$ 위의 점 O에서 두 반평면 위에 긋는 두 반직선은 어떤 조건을 만족해야 합니까?',
          choices: ['둘 다 $l$에 수직이다', '둘 다 $l$과 $45^\\circ$를 이룬다', '두 반직선의 길이가 같다'],
          answer: 0,
          why: ['', '$l$과 이루는 각이 같아도 $90^\\circ$가 아니면 이면각의 크기와 다른 각이 나옵니다.', '반직선의 길이는 각의 크기와 관계없습니다. 방향이 $l$에 수직이어야 합니다.'],
          explain: '이면각의 크기는 변 위의 한 점에서 두 면 위에 각각 변에 수직인 반직선을 그었을 때 두 반직선이 이루는 각입니다.',
        },
      },
      {
        title: '정사영',
        body: '점 P에서 평면 $\\alpha$에 내린 수선의 발 P′을 점 P의 평면 $\\alpha$ 위로의 **정사영**이라고 합니다. 점 P가 $\\alpha$ 위에 있으면 P의 정사영은 P 자신입니다.\n\n도형 F에 속하는 모든 점의 정사영으로 이루어진 도형 F′을 도형 F의 평면 $\\alpha$ 위로의 정사영이라고 합니다.\n\n- 선분의 정사영은 보통 선분이지만, 선분이 평면에 **수직**이면 한 점입니다.\n- 직선 $l$이 평면 $\\alpha$와 수직이 아닐 때, $l$과 그 정사영 $l^{\\prime}$이 이루는 각을 **직선 $l$과 평면 $\\alpha$가 이루는 각**이라고 합니다.\n- 직선이 평면과 평행하거나 평면에 포함되면 이루는 각은 $0^\\circ$, 수직이면 $90^\\circ$로 봅니다.\n\n예: 정육면체 ABCD-EFGH에서 점 G의 평면 ABCD 위로의 정사영은 C이므로, 선분 AG의 정사영은 선분 AC이고 직선 AG와 평면 ABCD가 이루는 각은 $\\angle GAC$입니다.',
        easy: '한낮에 해가 머리 바로 위에 있을 때 땅에 생기는 그림자를 떠올려 보십시오. 빛이 땅에 수직으로 내리쬐면 물체의 각 점이 땅으로 수직으로 옮겨져 그림자를 만듭니다. 이 그림자가 정사영입니다.\n\n막대를 땅에 똑바로 세우면 그림자는 점 하나가 되고, 땅과 나란히 들면 그림자의 길이는 막대와 같습니다.',
        fig: projSegFig(null, '선분 AB와 그 평면 α 위로의 정사영 A′B′'),
        check: {
          type: 'ox',
          q: '평면에 수직인 선분의 그 평면 위로의 정사영은 한 점입니다.',
          answer: true,
          explain: '선분이 평면에 수직이면 선분 위의 모든 점에서 내린 수선의 발이 같은 한 점이므로 정사영은 점입니다.',
        },
      },
      {
        title: '정사영의 길이',
        body: '선분 AB의 평면 $\\alpha$ 위로의 정사영을 선분 A′B′, 직선 AB와 평면 $\\alpha$가 이루는 각의 크기를 $\\theta$라 하면\n\n$\\overline{A^{\\prime}B^{\\prime}}=\\overline{AB}\\cos\\theta$\n\n**이유** 점 A를 지나고 A′B′과 평행한 직선이 선분 BB′과 만나는 점을 C라 하면, 사각형 AA′B′C는 직사각형이므로 $\\overline{AC}=\\overline{A^{\\prime}B^{\\prime}}$입니다. 삼각형 ABC는 $\\angle ACB=90^\\circ$, $\\angle BAC=\\theta$인 직각삼각형이므로 $\\overline{AC}=\\overline{AB}\\cos\\theta$입니다.\n\n정사영의 길이는 원래 길이보다 길지 않습니다. $\\theta=0^\\circ$이면 길이가 같고, $\\theta=90^\\circ$이면 0(한 점)입니다.\n\n예: 길이가 10인 선분이 평면과 $60^\\circ$를 이루면 정사영의 길이는 $10\\cos60^\\circ=5$입니다.',
        easy: '길이 10인 막대를 땅에 비스듬히 기대어 놓았다고 해 봅시다. 머리 위에서 빛을 비추면 땅의 그림자는 막대보다 짧습니다. 막대가 많이 서 있을수록(각이 클수록) 그림자는 더 짧아집니다.\n\n그 비율이 바로 $\\cos\\theta$입니다. 막대와 그림자와 세로 높이가 직각삼각형을 이루고, 그림자는 각 $\\theta$에 이웃한 변이기 때문입니다.',
        fig: projSegFig({ c: true }, '선분 AB, 정사영 A′B′, 점 A에서 A′B′과 평행하게 그은 선분 AC. 각 BAC가 θ이다'),
        check: {
          type: 'short', check: 'expr',
          q: '길이가 8인 선분 AB와 평면 $\\alpha$가 이루는 각의 크기가 $60^\\circ$일 때, 선분 AB의 평면 $\\alpha$ 위로의 정사영의 길이를 구하십시오.',
          answer: '4',
          wrong: [{ a: '4√3', why: '$\\cos$ 대신 $\\sin$을 썼습니다. 정사영은 각 $\\theta$에 이웃한 변이므로 $\\overline{AB}\\cos\\theta$입니다.' }],
          explain: '$\\overline{A^{\\prime}B^{\\prime}}=8\\cos60^\\circ=8 \\times \\frac{1}{2}=4$',
        },
      },
      {
        title: '정사영의 넓이',
        body: '평면 $\\beta$ 위의 도형의 넓이를 $S$, 이 도형의 평면 $\\alpha$ 위로의 정사영의 넓이를 $S^{\\prime}$, 두 평면 $\\alpha$, $\\beta$가 이루는 각의 크기를 $\\theta$라 하면\n\n$S^{\\prime}=S\\cos\\theta$\n\n**이유** 먼저 한 변이 두 평면의 교선 $l$ 위에 있는 삼각형 ABC를 생각합니다. 꼭짓점 C에서 $l$에 내린 수선의 발을 H, C의 정사영을 C′이라 하면 삼수선 정리에 의하여 $\\overline{C^{\\prime}H} \\perp l$이므로 $\\angle CHC^{\\prime}=\\theta$입니다. 밑변 AB는 그대로이고 높이는 $\\overline{C^{\\prime}H}=\\overline{CH}\\cos\\theta$가 되므로 넓이도 $\\cos\\theta$배가 됩니다. 일반적인 도형은 이런 삼각형들로 잘게 나누어 생각하면 같은 관계가 성립합니다.\n\n예: 넓이가 20인 도형이 들어 있는 평면이 다른 평면과 $60^\\circ$를 이루면, 정사영의 넓이는 $20\\cos60^\\circ=10$입니다.\n\n> 💡 거꾸로 $\\cos\\theta=\\dfrac{S^{\\prime}}{S}$이므로, 두 평면이 이루는 각을 넓이의 비로 구할 수도 있습니다.',
        easy: '종이 한 장을 비스듬히 들고 바로 위에서 빛을 비추면 바닥의 그림자는 종이보다 작습니다. 종이가 기울어진 방향으로만 줄어들고, 교선 방향의 길이는 그대로입니다.\n\n그래서 한 방향의 길이가 $\\cos\\theta$배가 되고, 넓이도 $\\cos\\theta$배가 됩니다.',
        fig: scene({
          planes: [
            { pts: [[0, -2.4, 0], [5, -2.4, 0], [5, 0.4, 0], [0, 0.4, 0]], label: 'α', at: [4.6, -2.1, 0] },
            { pts: [[0, 0, 0], [5, 0, 0], [5, -1.5, 2.5], [0, -1.5, 2.5]], label: 'β', at: [4.5, -1.3, 2.2], color: C2 },
            { pts: [[1, 0, 0], [4, 0, 0], [2.5, -1.2, 2]], color: C4 },
            { pts: [[1, 0, 0], [4, 0, 0], [2.5, -1.2, 0]], color: C1 },
          ],
          segs: [{ a: [2.5, -1.2, 2], b: [2.5, -1.2, 0], dash: true }, { a: [2.5, -1.2, 2], b: [2.5, 0, 0], dash: true }, { a: [2.5, -1.2, 0], b: [2.5, 0, 0], dash: true }],
          pts: [{ p: [1, 0, 0], label: 'A', off: [-8, 10] }, { p: [4, 0, 0], label: 'B', off: [8, 10] }, { p: [2.5, -1.2, 2], label: 'C', off: [0, -12] }, { p: [2.5, -1.2, 0], label: 'C′', off: [0, 12] }, { p: [2.5, 0, 0], label: 'H', off: [9, -7] }],
        }, '평면 β 위의 삼각형 ABC와 평면 α 위로의 정사영 ABC′. 밑변 AB는 교선 위에 있고 높이만 줄어든다'),
        check: {
          type: 'short', check: 'number',
          q: '넓이가 30인 도형이 들어 있는 평면 $\\beta$와 평면 $\\alpha$가 이루는 각의 크기가 $60^\\circ$일 때, 이 도형의 평면 $\\alpha$ 위로의 정사영의 넓이를 구하십시오.',
          answer: '15',
          wrong: [{ a: '60', why: '$\\cos60^\\circ$로 나누었습니다. 정사영의 넓이는 원래 넓이보다 크지 않습니다. $S^{\\prime}=S\\cos\\theta$입니다.' }],
          explain: '$S^{\\prime}=S\\cos\\theta=30\\cos60^\\circ=30 \\times \\frac{1}{2}=15$',
        },
      },
    ],

    examples: [
      {
        q: '한 모서리의 길이가 2인 정육면체 ABCD-EFGH에서 점 E와 직선 BD 사이의 거리를 구하십시오.',
        fig: cubeFig([['BD', C1], ['AC', C2]], '정육면체 ABCD-EFGH. 직선 BD와 대각선 AC를 색으로 표시했다'),
        steps: [
          '점 E에서 평면 ABCD에 내린 수선의 발은 A입니다. 곧 $\\overline{EA} \\perp$ (평면 ABCD)입니다.',
          '정사각형 ABCD의 두 대각선은 서로를 수직이등분하므로, 대각선의 교점을 M이라 하면 $\\overline{AM} \\perp \\overline{BD}$이고 $\\overline{AM}=\\frac{1}{2}\\overline{AC}=\\sqrt{2}$입니다.',
          '삼수선 정리에 의하여 $\\overline{EM} \\perp \\overline{BD}$이므로, 점 E와 직선 BD 사이의 거리는 EM입니다.',
          '삼각형 EAM은 $\\angle EAM=90^\\circ$인 직각삼각형이므로 $\\overline{EM}=\\sqrt{2^2+(\\sqrt{2})^2}=\\sqrt{6}$입니다.',
        ],
        answer: '$\\sqrt{6}$',
      },
      {
        q: '한 변의 길이가 4인 정삼각형이 들어 있는 평면이 평면 $\\alpha$와 $30^\\circ$를 이룰 때, 이 정삼각형의 평면 $\\alpha$ 위로의 정사영의 넓이를 구하십시오.',
        steps: [
          '정삼각형의 넓이는 $S=\\frac{\\sqrt{3}}{4} \\times 4^2=4\\sqrt{3}$입니다.',
          '정사영의 넓이는 $S^{\\prime}=S\\cos30^\\circ$입니다.',
          '$S^{\\prime}=4\\sqrt{3} \\times \\frac{\\sqrt{3}}{2}=6$',
        ],
        answer: '6',
      },
    ],

    terms: [
      { term: '수선과 수선의 발', def: '직선 $l$이 평면 $\\alpha$와 수직일 때 $l$을 $\\alpha$의 수선, $l$과 $\\alpha$가 만나는 점을 수선의 발이라고 합니다.' },
      { term: '점과 평면 사이의 거리', def: '평면 밖의 점 P에서 평면에 내린 수선의 발을 H라 할 때 선분 PH의 길이입니다.' },
      { term: '삼수선 정리', def: '평면 밖의 점 P, 평면 위의 점 O와 직선 $l$, $l$ 위의 점 H에 대하여 $\\overline{PO} \\perp \\alpha$, $\\overline{OH} \\perp l$이면 $\\overline{PH} \\perp l$이라는 정리입니다. 다른 두 형태의 정리도 함께 이릅니다.' },
      { term: '이면각', def: '한 직선을 공유하는 두 반평면으로 이루어진 도형입니다. 그 크기는 공유한 직선 위의 한 점에서 두 반평면 위에 각각 그 직선에 수직인 반직선을 그어 잽니다.' },
      { term: '두 평면이 이루는 각', def: '두 평면이 만나서 생기는 이면각 가운데 크기가 크지 않은 것입니다. $90^\\circ$이면 두 평면은 수직입니다.' },
      { term: '정사영', def: '점 P에서 평면에 내린 수선의 발을 P의 정사영이라 하고, 도형의 모든 점의 정사영으로 이루어진 도형을 그 도형의 정사영이라고 합니다.' },
      { term: '직선과 평면이 이루는 각', def: '직선과 그 직선의 평면 위로의 정사영이 이루는 각입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 2, type: 'ox', concept: 0,
        q: '직선 $l$이 평면 $\\alpha$ 위의 서로 다른 두 직선과 각각 수직이면 항상 $l \\perp \\alpha$입니다.',
        answer: false,
        explain: '두 직선이 서로 평행하면 $l$이 평면에 수직이 아닐 수 있습니다. 예: 정육면체에서 직선 BG는 평면 ABCD 위의 평행한 두 직선 AB, DC와 모두 수직이지만 평면 ABCD와 수직이 아닙니다. 판정법에는 "한 점에서 만나는" 두 직선이라는 조건이 꼭 필요합니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: '정육면체 ABCD-EFGH에서 평면 ABCD와 수직인 직선은 무엇입니까?',
        fig: cubeFig([], '정육면체 ABCD-EFGH'),
        choices: ['직선 CG', '직선 AC', '직선 EG', '직선 BG'],
        answer: 0,
        why: ['', '직선 AC는 평면 ABCD에 포함됩니다.', '직선 EG는 평면 ABCD와 평행합니다.', '직선 BG는 평면 ABCD와 $45^\\circ$를 이룹니다. 점 G의 정사영이 C이므로 각은 $\\angle GBC$입니다.'],
        explain: '직선 CG는 평면 ABCD 위의 한 점 C에서 만나는 두 직선 BC, CD와 각각 수직이므로 평면 ABCD와 수직입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
        q: '평면 $\\alpha$ 밖의 점 P에서 $\\alpha$에 내린 수선의 발을 O, 점 O에서 $\\alpha$ 위의 직선 $l$에 내린 수선의 발을 H라 합니다. $\\overline{PO}=5$, $\\overline{OH}=12$일 때, 점 P와 직선 $l$ 사이의 거리를 구하십시오.',
        fig: perpFig({ po: '5', oh: '12' }, '평면 α 밖의 점 P, 수선의 발 O, 직선 l, O에서 l에 내린 수선의 발 H. PO=5, OH=12'),
        answer: '13',
        wrong: [{ a: '12', why: '점 O와 직선 $l$ 사이의 거리를 답했습니다. 구하는 것은 점 P와 직선 $l$ 사이의 거리 PH입니다.' }, { a: '17', why: '두 길이를 그냥 더했습니다. 삼각형 POH는 직각삼각형입니다.' }],
        explain: '삼수선 정리에 의하여 $\\overline{PH} \\perp l$이므로 점 P와 직선 $l$ 사이의 거리는 PH입니다. 삼각형 POH는 $\\angle POH=90^\\circ$인 직각삼각형이므로 $\\overline{PH}=\\sqrt{5^2+12^2}=13$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'expr', concept: 4,
        q: '길이가 12인 선분 AB와 평면 $\\alpha$가 이루는 각의 크기가 $30^\\circ$일 때, 선분 AB의 평면 $\\alpha$ 위로의 정사영의 길이를 구하십시오.',
        answer: '6√3',
        wrong: [{ a: '6', why: '$\\cos$ 대신 $\\sin$을 썼습니다. 정사영의 길이는 $\\overline{AB}\\cos\\theta$입니다.' }],
        explain: '$\\overline{A^{\\prime}B^{\\prime}}=12\\cos30^\\circ=12 \\times \\frac{\\sqrt{3}}{2}=6\\sqrt{3}$\n\n(답 칸에는 6√3 또는 6sqrt(3)으로 씁니다.)',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 5,
        q: '넓이가 24인 도형이 들어 있는 평면 $\\beta$와 평면 $\\alpha$가 이루는 각의 크기를 $\\theta$라 할 때, $\\cos\\theta=\\frac{3}{4}$입니다. 이 도형의 평면 $\\alpha$ 위로의 정사영의 넓이를 구하십시오.',
        answer: '18',
        wrong: [{ a: '32', why: '$\\cos\\theta$로 나누었습니다. 정사영의 넓이는 원래 넓이보다 크지 않으므로 $S\\cos\\theta$입니다.' }],
        explain: '$S^{\\prime}=S\\cos\\theta=24 \\times \\frac{3}{4}=18$',
      },
      {
        id: 'p6', level: 1, type: 'choice', fixed: true, concept: 2,
        q: '정육면체 ABCD-EFGH에서 두 평면 ABCD와 AFGD가 이루는 각의 크기는 무엇입니까?',
        fig: cubeFig([['AF', C4], ['DG', C4], ['FG', C4]], '정육면체 ABCD-EFGH. 평면 AFGD의 모서리를 색으로 표시했다'),
        choices: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'],
        answer: 1,
        why: ['교선 AD에 수직인 두 직선 AB, AF가 이루는 각을 다시 확인해 보십시오. 삼각형 ABF는 직각이등변삼각형입니다.', '', '삼각형 ABF는 정삼각형이 아니라 $\\angle ABF=90^\\circ$인 직각이등변삼각형입니다.', '평면 AFGD는 평면 ABCD에 수직이 아니라 비스듬합니다. 교선에 수직인 두 직선 AB, AF 사이의 각을 재 보십시오.'],
        hint: '두 평면의 교선을 먼저 찾고, 교선 위의 한 점에서 두 평면 위에 각각 교선에 수직인 직선을 찾아보십시오.',
        explain: '두 평면의 교선은 AD입니다. 평면 ABCD 위에서 $\\overline{AB} \\perp \\overline{AD}$이고, 직선 AD는 평면 ABFE와 수직이므로 평면 AFGD 위에서 $\\overline{AF} \\perp \\overline{AD}$입니다. 따라서 두 평면이 이루는 각은 $\\angle BAF=45^\\circ$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', unit: '°', concept: 3,
        q: '정육면체 ABCD-EFGH에서 직선 BG와 평면 ABCD가 이루는 각의 크기는 몇 도입니까?',
        fig: cubeFig([['BG', C4]], '정육면체 ABCD-EFGH. 대각선 BG를 굵게 표시했다'),
        answer: '45',
        wrong: [{ a: '90', why: '직선 BG가 모서리 AB와 수직인 것과 헷갈렸습니다. 직선과 평면이 이루는 각은 직선과 그 정사영이 이루는 각입니다.' }],
        explain: '점 G의 평면 ABCD 위로의 정사영은 C이므로 직선 BG의 정사영은 직선 BC입니다. 따라서 구하는 각은 $\\angle GBC$이고, 삼각형 GBC는 직각이등변삼각형이므로 $45^\\circ$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 1,
        q: '평면 $\\alpha$ 위에 $\\angle C=90^\\circ$, $\\overline{AC}=3$인 직각삼각형 ABC가 있습니다. 점 A를 지나고 평면 $\\alpha$에 수직인 직선 위에 $\\overline{PA}=4$인 점 P를 잡을 때, 점 P와 직선 BC 사이의 거리를 구하십시오.',
        fig: scene({
          planes: [{ pts: [[0, 0, 0], [5, 0, 0], [5, 4.5, 0], [0, 4.5, 0]], label: 'α', at: [4.6, 0.35, 0] }],
          segs: [
            { a: [1, 0.6, 0], b: [3.4, 0.6, 0], color: C1, w: 2 }, { a: [3.4, 0.6, 0], b: [3.4, 3.8, 0], color: C1, w: 2 }, { a: [3.4, 3.8, 0], b: [1, 0.6, 0], color: C1, w: 2 },
            { a: [1, 0.6, 3], b: [1, 0.6, 0] }, { a: [1, 0.6, 3], b: [3.4, 3.8, 0] }, { a: [1, 0.6, 3], b: [3.4, 0.6, 0], color: C4, w: 2.5 },
          ],
          rights: [{ at: [1, 0.6, 0], u: [0, 0, 1], v: [1, 0, 0] }, { at: [3.4, 0.6, 0], u: [-1, 0, 0], v: [0, 1, 0] }],
          pts: [{ p: [1, 0.6, 0], label: 'A', off: [-10, 6] }, { p: [3.4, 0.6, 0], label: 'C', off: [8, 9] }, { p: [3.4, 3.8, 0], label: 'B', off: [10, -4] }, { p: [1, 0.6, 3], label: 'P', off: [0, -12] }],
        }, '평면 α 위의 직각삼각형 ABC(각 C가 직각)와 점 A에서 평면에 수직으로 세운 선분 PA'),
        answer: '5',
        hint: '$\\overline{PA} \\perp \\alpha$이고 $\\overline{AC} \\perp \\overline{BC}$입니다. 삼수선 정리를 떠올려 보십시오.',
        wrong: [{ a: '4', why: '점 P와 평면 $\\alpha$ 사이의 거리를 답했습니다. 직선 BC까지의 거리를 구해야 합니다.' }, { a: '7', why: '두 길이를 그냥 더했습니다. 삼각형 PAC는 직각삼각형입니다.' }],
        explain: '$\\overline{PA} \\perp \\alpha$, $\\overline{AC} \\perp \\overline{BC}$이므로 삼수선 정리에 의하여 $\\overline{PC} \\perp \\overline{BC}$입니다. 따라서 점 P와 직선 BC 사이의 거리는 PC이고, 삼각형 PAC는 $\\angle PAC=90^\\circ$인 직각삼각형이므로 $\\overline{PC}=\\sqrt{4^2+3^2}=5$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'expr', concept: 4,
        q: '한 모서리의 길이가 6인 정육면체 ABCD-EFGH에서 대각선 AG의 평면 ABCD 위로의 정사영의 길이를 구하십시오.',
        fig: cubeFig([['AG', C4]], '정육면체 ABCD-EFGH. 대각선 AG를 굵게 표시했다'),
        answer: '6√2',
        hint: '점 A와 점 G의 평면 ABCD 위로의 정사영을 각각 찾아보십시오.',
        wrong: [{ a: '6√3', why: '대각선 AG의 길이를 답했습니다. 정사영은 평면 위의 그림자입니다.' }, { a: '6', why: '점 G의 정사영을 B나 D로 잘못 잡았습니다. G에서 평면 ABCD에 내린 수선의 발은 C입니다.' }],
        explain: '점 A의 정사영은 A 자신이고, 점 G의 정사영은 C입니다. 따라서 AG의 정사영은 선분 AC이고, 그 길이는 정사각형 ABCD의 대각선의 길이 $6\\sqrt{2}$입니다.\n\n(직선 AG와 평면 ABCD가 이루는 각을 $\\theta$라 하면 $\\overline{AC}=\\overline{AG}\\cos\\theta$에서 $\\cos\\theta=\\frac{6\\sqrt{2}}{6\\sqrt{3}}=\\frac{\\sqrt{6}}{3}$임도 알 수 있습니다.)',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'expr', concept: 5,
        q: '한 변의 길이가 4인 정삼각형 ABC가 들어 있는 평면이 평면 $\\alpha$와 $60^\\circ$를 이룰 때, 삼각형 ABC의 평면 $\\alpha$ 위로의 정사영의 넓이를 구하십시오.',
        answer: '2√3',
        hint: '먼저 정삼각형의 넓이를 구하십시오.',
        wrong: [{ a: '6', why: '$\\cos60^\\circ$ 대신 $\\cos30^\\circ$($=\\sin60^\\circ$)를 곱했습니다. $S^{\\prime}=S\\cos\\theta$에서 $\\theta=60^\\circ$입니다.' }, { a: '4√3', why: '정삼각형의 넓이를 그대로 답했습니다. 여기에 $\\cos60^\\circ$를 곱해야 합니다.' }],
        explain: '정삼각형의 넓이는 $S=\\frac{\\sqrt{3}}{4} \\times 4^2=4\\sqrt{3}$입니다. 따라서 $S^{\\prime}=4\\sqrt{3}\\cos60^\\circ=4\\sqrt{3} \\times \\frac{1}{2}=2\\sqrt{3}$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'ox', concept: 2,
        q: '두 평면이 이루는 각은 교선 위의 한 점에서 두 평면 위에 각각 그은 아무 두 직선이 이루는 각과 같습니다.',
        answer: false,
        explain: '아무 직선이나 그으면 각의 크기가 달라집니다. 교선 위의 한 점에서 두 평면 위에 각각 **교선에 수직인** 직선을 그어야 두 평면이 이루는 각(이면각의 크기)이 됩니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '정사면체 ABCD에서 이웃한 두 면 ABC와 BCD가 이루는 각의 크기를 $\\theta$라 할 때, $\\cos\\theta$의 값을 구하십시오.',
        answer: '1/3',
        hint: '모서리 BC의 중점을 M이라 하면, 정삼각형의 성질에서 $\\overline{AM} \\perp \\overline{BC}$, $\\overline{DM} \\perp \\overline{BC}$입니다.',
        wrong: [{ a: '1/2', why: '두 면이 이루는 각을 정삼각형의 내각 $60^\\circ$로 생각했습니다. 교선 BC에 수직인 두 선분 AM, DM이 이루는 각을 구해야 합니다.' }, { a: '-1/3', why: '두 평면이 이루는 각은 $90^\\circ$ 이하이므로 코사인 값은 음수가 아닙니다.' }],
        explain: '한 모서리의 길이를 $a$라 하고 모서리 BC의 중점을 M이라 하면, 두 정삼각형 ABC, DBC에서 $\\overline{AM} \\perp \\overline{BC}$, $\\overline{DM} \\perp \\overline{BC}$이므로 $\\theta=\\angle AMD$입니다.\n\n$\\overline{AM}=\\overline{DM}=\\frac{\\sqrt{3}}{2}a$, $\\overline{AD}=a$이므로 코사인법칙에 의하여\n\n$\\cos\\theta=\\dfrac{\\frac{3}{4}a^2+\\frac{3}{4}a^2-a^2}{2 \\times \\frac{3}{4}a^2}=\\dfrac{\\frac{1}{2}a^2}{\\frac{3}{2}a^2}=\\frac{1}{3}$',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'expr', concept: 5,
        q: '정육면체 ABCD-EFGH에서 평면 BDE와 평면 ABCD가 이루는 각의 크기를 $\\theta$라 할 때, $\\cos\\theta$의 값을 구하십시오.',
        fig: cubeFig([['BD', C4], ['BE', C4], ['DE', C4]], '정육면체 ABCD-EFGH. 삼각형 BDE의 변을 색으로 표시했다'),
        answer: '√3/3',
        hint: '삼각형 BDE의 평면 ABCD 위로의 정사영은 어떤 삼각형인지 생각해 보십시오.',
        wrong: [{ a: '1/2', why: '삼각형 BDE의 넓이와 정사영의 넓이를 다시 계산해 보십시오. 정사영은 삼각형 BDA입니다.' }, { a: '√2/2', why: '$45^\\circ$로 생각했습니다. 교선 BD에 수직인 선분으로 다시 확인해 보십시오.' }],
        explain: '한 모서리의 길이를 $a$라 합시다. 점 E의 정사영이 A이므로 삼각형 BDE의 정사영은 삼각형 BDA이고, 그 넓이는 $S^{\\prime}=\\frac{1}{2}a^2$입니다.\n\n삼각형 BDE는 한 변의 길이가 $\\sqrt{2}a$인 정삼각형이므로 $S=\\frac{\\sqrt{3}}{4}(\\sqrt{2}a)^2=\\frac{\\sqrt{3}}{2}a^2$입니다.\n\n$\\cos\\theta=\\dfrac{S^{\\prime}}{S}=\\dfrac{\\frac{1}{2}a^2}{\\frac{\\sqrt{3}}{2}a^2}=\\frac{1}{\\sqrt{3}}=\\frac{\\sqrt{3}}{3}$\n\n(교선 BD의 중점 M을 잡으면 삼수선 정리에 의하여 $\\overline{EM} \\perp \\overline{BD}$이므로 $\\theta=\\angle EMA$로 구해도 같은 값이 나옵니다.)',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'expr', concept: 1,
        q: '평면 $\\alpha$ 밖의 점 P에서 $\\alpha$에 내린 수선의 발을 O라 하면 $\\overline{PO}=3$입니다. 평면 $\\alpha$ 위의 직선 $l$ 위에 $\\overline{PA}=\\overline{PB}=5$, $\\overline{AB}=6$인 두 점 A, B가 있을 때, 점 O와 직선 $l$ 사이의 거리를 구하십시오.',
        answer: '√7',
        hint: '선분 AB의 중점을 H라 하면 $\\overline{PH} \\perp l$입니다. 그다음 삼수선 정리의 두 번째 형태를 생각해 보십시오.',
        wrong: [{ a: '4', why: '점 P와 직선 $l$ 사이의 거리 PH를 답했습니다. 점 O에서 $l$까지의 거리 OH를 구해야 합니다.' }, { a: '1', why: '빗변의 길이에서 다른 변의 길이를 그냥 뺐습니다. 피타고라스 정리로 $\\sqrt{4^2-3^2}$을 계산합니다.' }],
        explain: '삼각형 PAB는 $\\overline{PA}=\\overline{PB}$인 이등변삼각형이므로 선분 AB의 중점 H에 대하여 $\\overline{PH} \\perp l$이고 $\\overline{PH}=\\sqrt{5^2-3^2}=4$입니다.\n\n$\\overline{PO} \\perp \\alpha$, $\\overline{PH} \\perp l$이므로 삼수선 정리에 의하여 $\\overline{OH} \\perp l$입니다. 곧 점 O와 직선 $l$ 사이의 거리는 OH입니다.\n\n삼각형 POH는 $\\angle POH=90^\\circ$인 직각삼각형이므로 $\\overline{OH}=\\sqrt{4^2-3^2}=\\sqrt{7}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'expr', concept: 2,
        q: '한 변의 길이가 2인 정사각형 ABCD를 대각선 BD를 접는 선으로 하여 접었더니, 두 평면 ABD와 CBD가 서로 수직이 되었습니다. 이때 두 점 A, C 사이의 거리를 구하십시오.',
        answer: '2',
        hint: '대각선 BD의 중점을 M이라 하면 접은 뒤에도 $\\overline{AM} \\perp \\overline{BD}$, $\\overline{CM} \\perp \\overline{BD}$입니다.',
        wrong: [{ a: '2√2', why: '접기 전의 대각선 AC의 길이를 답했습니다. 접은 뒤에는 두 점이 가까워집니다.' }],
        explain: '대각선 BD의 중점을 M이라 하면 $\\overline{AM} \\perp \\overline{BD}$, $\\overline{CM} \\perp \\overline{BD}$이므로, 두 평면이 이루는 각은 $\\angle AMC$이고 그 크기가 $90^\\circ$입니다.\n\n$\\overline{AM}=\\overline{CM}=\\frac{1}{2}\\overline{BD}=\\sqrt{2}$이므로 $\\overline{AC}=\\sqrt{(\\sqrt{2})^2+(\\sqrt{2})^2}=2$입니다.',
      },
    ],

    deeper: [
      {
        title: '그림자의 넓이와 비스듬한 판',
        body: '해가 바로 위에 있을 때 비스듬히 놓인 판의 그림자 넓이는 $S\\cos\\theta$입니다. 거꾸로 생각하면, 같은 판이라도 빛을 받는 양은 판이 빛에 수직으로 놓일 때 가장 많고 기울어질수록 $\\cos\\theta$배로 줄어듭니다.\n\n그래서 햇빛을 모으는 판은 빛이 들어오는 방향과 수직이 되도록 기울여 설치합니다. 계절과 위도에 따라 해의 높이가 달라지므로, 알맞은 기울기도 달라집니다.',
      },
      {
        title: '다음 단원과의 연결',
        body: '다음 단원 **공간좌표**에서는 점 P$(a, b, c)$의 $xy$평면 위로의 정사영이 점 $(a, b, 0)$이 되는 것처럼, 정사영을 좌표로 간단히 나타냅니다.\n\n또 **벡터의 내적**에서는 한 벡터를 다른 벡터 방향으로 정사영한 길이 $|\\vec{a}|\\cos\\theta$가 핵심 역할을 합니다. 이번 단원의 $l\\cos\\theta$가 그대로 이어집니다.',
      },
    ],

    faq: [
      {
        q: '삼수선 정리는 언제 써요?',
        a: '평면 밖의 점에서 평면 위의 직선까지의 거리를 구할 때와, 두 평면이 이루는 각을 찾을 때 가장 많이 씁니다. 평면에 수선을 내린 다음, 수선의 발에서 직선에 다시 수선을 내리면 공중의 점에서 그 직선에 내린 수선의 발도 같은 점이 됩니다. 덕분에 공간의 문제를 직각삼각형 문제로 바꿀 수 있습니다.',
      },
      {
        q: '정사영의 길이는 왜 sin이 아니고 cos이에요?',
        a: '선분, 정사영, 수직 높이가 직각삼각형을 이루는데, 선분이 빗변이고 정사영은 각 $\\theta$에 이웃한 변입니다. 이웃한 변 ÷ 빗변이 $\\cos\\theta$이므로 정사영의 길이는 $l\\cos\\theta$입니다. 수직 높이가 $l\\sin\\theta$입니다.',
      },
      {
        q: '두 평면이 이루는 각을 직접 찾기 어려우면 어떻게 해요?',
        a: '넓이를 이용할 수 있습니다. 한 평면 위의 도형의 넓이 $S$와 그 정사영의 넓이 $S^{\\prime}$을 구하면 $\\cos\\theta=\\dfrac{S^{\\prime}}{S}$입니다. 꼭짓점의 정사영이 도형의 다른 꼭짓점이 되는 경우(정육면체 등)에 특히 편리합니다.',
      },
    ],

    mistakes: [
      '직선이 평면 위의 평행한 두 직선과 수직인 것만으로 평면에 수직이라고 판단하는 실수 — 두 직선은 한 점에서 만나야 합니다.',
      '정사영의 길이나 넓이에 $\\cos\\theta$ 대신 $\\sin\\theta$를 곱하거나 $\\cos\\theta$로 나누는 실수 — 정사영은 원래보다 크지 않으므로 $\\cos\\theta$를 곱합니다.',
      '두 평면이 이루는 각을 잴 때 교선에 수직이 아닌 선분 사이의 각을 재는 실수 — 교선 위의 한 점에서 교선에 수직인 두 직선을 긋습니다.',
    ],

    gens: [
      {
        id: 'proj-length',
        level: 1,
        title: '정사영의 길이와 직선과 평면이 이루는 각',
        make: function (R) {
          var a = R.pick(ANG), L = 2 * R.int(2, 9), h = L / 2, m = a.c[2];
          var proj = m === 1 ? { tex: String(h), ans: String(h) } : { tex: h + '\\sqrt{' + m + '}', ans: h + '√' + m };
          var fig = projSegFig({ ab: String(L) }, '길이가 ' + L + '인 선분 AB와 평면 α 위로의 정사영 A′B′. 직선 AB와 평면 α가 이루는 각은 θ이다');
          if (R.bool(0.6)) {
            var sinWhy = '$\\cos$ 대신 $\\sin$을 곱했습니다. 정사영은 각 $\\theta$에 이웃한 변이므로 $\\overline{AB}\\cos\\theta$입니다.';
            var wrong = a.d === 30 ? [{ a: String(h), why: sinWhy }] : a.d === 60 ? [{ a: h + '√3', why: sinWhy }] : [];
            wrong.push({ a: String(L), why: '선분 AB의 길이를 그대로 답했습니다. 기울어진 선분의 정사영은 더 짧습니다.' });
            return {
              type: 'short', check: 'expr', concept: 4, fig: fig,
              q: '길이가 ' + L + '인 선분 AB와 평면 $\\alpha$가 이루는 각의 크기가 $' + a.d + '^\\circ$일 때, 선분 AB의 평면 $\\alpha$ 위로의 정사영 A′B′의 길이를 구하십시오.',
              answer: proj.ans,
              wrong: wrong,
              explain: '$\\overline{A^{\\prime}B^{\\prime}}=\\overline{AB}\\cos\\theta=' + L + '\\cos' + a.d + '^\\circ=' + L + ' \\times ' + a.tex + '=' + proj.tex + '$',
            };
          }
          return {
            type: 'short', check: 'number', unit: '°', concept: 4, fig: fig,
            q: '길이가 ' + L + '인 선분 AB의 평면 $\\alpha$ 위로의 정사영의 길이가 $' + proj.tex + '$일 때, 직선 AB와 평면 $\\alpha$가 이루는 각의 크기는 몇 도입니까?',
            answer: String(a.d),
            wrong: a.d === 45 ? [] : [{ a: String(90 - a.d), why: '길이의 비 $\\dfrac{\\overline{A^{\\prime}B^{\\prime}}}{\\overline{AB}}$를 $\\sin\\theta$로 생각했습니다. 이 비는 $\\cos\\theta$입니다.' }],
            explain: '$\\cos\\theta=\\dfrac{\\overline{A^{\\prime}B^{\\prime}}}{\\overline{AB}}=\\dfrac{' + proj.tex + '}{' + L + '}=' + a.tex + '$이므로 $\\theta=' + a.d + '^\\circ$입니다.',
          };
        },
      },
      {
        id: 'three-perp',
        level: 2,
        title: '삼수선 정리로 거리 구하기',
        make: function (R) {
          var a = R.int(2, 9), s, b, c;
          var head = '평면 $\\alpha$ 밖의 점 P에서 $\\alpha$에 내린 수선의 발을 O라 하고, $\\alpha$ 위의 직선 $l$이 있습니다. ';
          if (R.bool()) {
            b = R.int(2, 9);
            s = surd(a * a + b * b);
            return {
              type: 'short', check: s.root ? 'expr' : 'number', concept: 1,
              fig: perpFig({ po: String(a), oh: String(b) }, '점 P, 수선의 발 O, 직선 l, O에서 l에 내린 수선의 발 H. PO=' + a + ', OH=' + b),
              q: head + '점 O에서 직선 $l$에 내린 수선의 발을 H라 할 때, $\\overline{PO}=' + a + '$, $\\overline{OH}=' + b + '$입니다. 점 P와 직선 $l$ 사이의 거리를 구하십시오.',
              answer: s.ans,
              wrong: [{ a: String(a + b), why: '두 길이를 그냥 더했습니다. 삼각형 POH는 $\\angle POH=90^\\circ$인 직각삼각형입니다.' }],
              explain: '$\\overline{PO} \\perp \\alpha$, $\\overline{OH} \\perp l$이므로 삼수선 정리에 의하여 $\\overline{PH} \\perp l$입니다. 곧 점 P와 직선 $l$ 사이의 거리는 PH입니다.\n\n' +
                '삼각형 POH는 $\\angle POH=90^\\circ$인 직각삼각형이므로 $\\overline{PH}=\\sqrt{' + a + '^2+' + b + '^2}=' + (s.root && s.tex !== '\\sqrt{' + (a * a + b * b) + '}' ? '\\sqrt{' + (a * a + b * b) + '}=' : '') + s.tex + '$입니다.',
            };
          }
          c = a + R.int(1, 6);
          s = surd(c * c - a * a);
          return {
            type: 'short', check: s.root ? 'expr' : 'number', concept: 1,
            fig: perpFig({ po: String(a), ph: String(c) }, '점 P, 수선의 발 O, 직선 l, P에서 l에 내린 수선의 발 H. PO=' + a + ', PH=' + c),
            q: head + '점 P에서 직선 $l$에 내린 수선의 발을 H라 할 때, $\\overline{PO}=' + a + '$, $\\overline{PH}=' + c + '$입니다. 점 O와 직선 $l$ 사이의 거리를 구하십시오.',
            answer: s.ans,
            wrong: [{ a: String(c - a), why: '빗변의 길이에서 다른 변의 길이를 그냥 뺐습니다. 삼각형 POH는 직각삼각형이므로 피타고라스 정리를 씁니다.' }],
            explain: '$\\overline{PO} \\perp \\alpha$, $\\overline{PH} \\perp l$이므로 삼수선 정리에 의하여 $\\overline{OH} \\perp l$입니다. 곧 점 O와 직선 $l$ 사이의 거리는 OH입니다.\n\n' +
              '삼각형 POH는 $\\angle POH=90^\\circ$인 직각삼각형이므로 $\\overline{OH}=\\sqrt{' + c + '^2-' + a + '^2}=' + (s.root && s.tex !== '\\sqrt{' + (c * c - a * a) + '}' ? '\\sqrt{' + (c * c - a * a) + '}=' : '') + s.tex + '$입니다.',
          };
        },
      },
      {
        id: 'proj-area',
        level: 2,
        title: '정사영의 넓이',
        make: function (R) {
          // 넓이 S = Sr·√Sm
          var shapes = [
            function () { var a = R.int(3, 9), b = R.int(3, 9); if (a === b) b += 1; return { name: '가로의 길이가 ' + a + ', 세로의 길이가 ' + b + '인 직사각형', r: R.F(a * b), m: 1, how: a + ' \\times ' + b + '=' + a * b }; },
            function () { var a = R.int(3, 9); return { name: '한 변의 길이가 ' + a + '인 정사각형', r: R.F(a * a), m: 1, how: a + '^2=' + a * a }; },
            function () { var a = R.int(3, 9), b = R.int(3, 9); var f = R.F(a * b, 2); return { name: '직각을 낀 두 변의 길이가 ' + a + ', ' + b + '인 직각삼각형', r: f, m: 1, how: '\\frac{1}{2} \\times ' + a + ' \\times ' + b + '=' + R.fmt.frac(f) }; },
            function () { var k = R.int(1, 4), a = 2 * k; return { name: '한 변의 길이가 ' + a + '인 정삼각형', r: R.F(k * k), m: 3, how: '\\frac{\\sqrt{3}}{4} \\times ' + a + '^2=' + (k === 1 ? '' : k * k) + '\\sqrt{3}' }; },
          ];
          var useRat = R.bool(0.4);
          var sh = useRat ? R.pick(shapes.slice(0, 3))() : R.pick(shapes)();
          var STex = rootNum(R, sh.r, sh.m).tex;
          function mul(r1, m1, r2, m2) { var r = r1.mul(r2), m = m1 * m2; if (m === 9) { r = r.mul(3); m = 1; } return rootNum(R, r, m); }
          var cosR, cosM, cosTex, cond, wrong = [];
          if (useRat) {
            var pq = R.pick([[1, 3], [2, 3], [3, 4], [3, 5], [4, 5], [1, 4]]);
            cosR = R.F(pq[0], pq[1]); cosM = 1; cosTex = R.fmt.frac(cosR);
            cond = '두 평면 $\\alpha$, $\\beta$가 이루는 각의 크기를 $\\theta$라 하면 $\\cos\\theta=' + cosTex + '$';
            if (R.bool(0.4)) {
              // 넓이의 비로 cos θ 구하기
              var Sp = sh.r.mul(cosR);
              return {
                type: 'short', check: 'number', concept: 5,
                q: '평면 $\\beta$ 위에 ' + sh.name + '이 있습니다. 이 도형의 평면 $\\alpha$ 위로의 정사영의 넓이가 $' + R.fmt.frac(Sp) + '$일 때, 두 평면 $\\alpha$, $\\beta$가 이루는 각의 크기를 $\\theta$라 하면 $\\cos\\theta$의 값은 얼마입니까?',
                answer: cosR.toString(),
                wrong: [{ a: cosR.inv().toString(), why: '넓이의 비를 거꾸로 잡았습니다. $\\cos\\theta=\\dfrac{S^{\\prime}}{S}$이므로 1보다 크지 않습니다.' }],
                explain: '도형의 넓이는 $S=' + sh.how + '$입니다. $S^{\\prime}=S\\cos\\theta$이므로 $\\cos\\theta=\\dfrac{S^{\\prime}}{S}=\\dfrac{' + R.fmt.frac(Sp) + '}{' + R.fmt.frac(sh.r) + '}=' + cosTex + '$입니다.',
              };
            }
            wrong.push({ a: rootNum(R, sh.r.div(cosR), sh.m).ans, why: '$\\cos\\theta$로 나누었습니다. 정사영의 넓이는 원래 넓이보다 크지 않으므로 $S\\cos\\theta$입니다.' });
          } else {
            var a = R.pick(ANG);
            cosR = R.F(a.c[0], a.c[1]); cosM = a.c[2]; cosTex = a.tex;
            cond = '두 평면 $\\alpha$, $\\beta$가 이루는 각의 크기가 $' + a.d + '^\\circ$';
            var sinWhy = '$\\cos$ 대신 $\\sin$을 곱했습니다. $S^{\\prime}=S\\cos\\theta$입니다.';
            if (a.d === 30) wrong.push({ a: mul(sh.r, sh.m, R.F(1, 2), 1).ans, why: sinWhy });
            if (a.d === 60) wrong.push({ a: mul(sh.r, sh.m, R.F(1, 2), 3).ans, why: sinWhy });
          }
          wrong.push({ a: rootNum(R, sh.r, sh.m).ans, why: '도형의 넓이를 그대로 답했습니다. 기울어진 도형의 정사영은 넓이가 $\\cos\\theta$배가 됩니다.' });
          var res = mul(sh.r, sh.m, cosR, cosM);
          return {
            type: 'short', check: 'expr', concept: 5,
            q: '평면 $\\beta$ 위에 ' + sh.name + '이 있습니다. ' + cond + '일 때, 이 도형의 평면 $\\alpha$ 위로의 정사영의 넓이를 구하십시오.',
            answer: res.ans,
            wrong: wrong,
            explain: '도형의 넓이는 $S=' + sh.how + '$입니다. 따라서 $S^{\\prime}=S\\cos\\theta=' + STex + ' \\times ' + cosTex + '=' + res.tex + '$입니다.',
          };
        },
      },
      {
        id: 'pyramid-face',
        level: 3,
        title: '정사각뿔의 옆면과 밑면이 이루는 각',
        make: function (R) {
          var t = R.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [9, 12, 15], [12, 9, 15], [7, 24, 25], [24, 7, 25], [20, 21, 29], [21, 20, 29]]);
          var m = t[0], h = t[1], s = t[2];
          var fig = pyramidFig('정사각뿔 O-ABCD. 밑면의 중심 H, 모서리 AB의 중점 M, 선분 OM을 표시했다');
          var head = '밑면의 한 변의 길이가 ' + (2 * m) + ', 높이가 ' + h + '인 정사각뿔 O-ABCD가 있습니다. ';
          var why1 = '밑면의 중심을 H, 모서리 AB의 중점을 M이라 하면 $\\overline{OH} \\perp$ (평면 ABCD), $\\overline{HM} \\perp \\overline{AB}$이므로 삼수선 정리에 의하여 $\\overline{OM} \\perp \\overline{AB}$입니다. 따라서 옆면 OAB와 밑면이 이루는 각은 $\\theta=\\angle OMH$입니다.\n\n' +
            '$\\overline{HM}=' + m + '$, $\\overline{OH}=' + h + '$이므로 $\\overline{OM}=\\sqrt{' + m + '^2+' + h + '^2}=' + s + '$이고, $\\cos\\theta=\\dfrac{\\overline{HM}}{\\overline{OM}}=' + R.fmt.frac(R.F(m, s)) + '$입니다.';
          if (R.bool()) {
            return {
              type: 'short', check: 'number', concept: 2, fig: fig,
              q: head + '옆면 OAB와 밑면 ABCD가 이루는 각의 크기를 $\\theta$라 할 때, $\\cos\\theta$의 값을 구하십시오.',
              answer: R.F(m, s).toString(),
              hint: '밑면의 중심 H와 모서리 AB의 중점 M을 잡고 삼수선 정리를 이용해 보십시오.',
              wrong: [
                { a: R.F(h, s).toString(), why: '$\\sin\\theta$를 구했습니다. $\\theta=\\angle OMH$에 이웃한 변은 HM입니다.' },
                { a: R.F(m, h).toString(), why: '$\\dfrac{\\overline{HM}}{\\overline{OH}}$를 구했습니다. 코사인은 이웃한 변 ÷ 빗변 $\\dfrac{\\overline{HM}}{\\overline{OM}}$입니다.' },
              ],
              explain: why1,
            };
          }
          return {
            type: 'short', check: 'number', concept: 5, fig: fig,
            q: head + '옆면 OAB의 밑면 ABCD 위로의 정사영의 넓이를 구하십시오.',
            answer: String(m * m),
            hint: '옆면 OAB의 넓이와, 옆면과 밑면이 이루는 각의 코사인을 먼저 구해 보십시오.',
            wrong: [
              { a: String(m * s), why: '옆면 OAB의 넓이를 그대로 답했습니다. 여기에 $\\cos\\theta$를 곱해야 합니다.' },
              { a: String(4 * m * m), why: '밑면 전체의 넓이를 답했습니다. 옆면 하나의 정사영은 삼각형 HAB입니다.' },
            ],
            explain: why1 + '\n\n옆면 OAB의 넓이는 $S=\\frac{1}{2} \\times ' + (2 * m) + ' \\times ' + s + '=' + (m * s) + '$이므로 정사영의 넓이는 $S\\cos\\theta=' + (m * s) + ' \\times ' + R.fmt.frac(R.F(m, s)) + '=' + (m * m) + '$입니다.\n\n' +
              '(정사영은 꼭짓점 O가 H로 옮겨진 삼각형 HAB이므로 $\\frac{1}{2} \\times ' + (2 * m) + ' \\times ' + m + '=' + (m * m) + '$' + R.josa(m * m, '으로/로') + ' 확인할 수 있습니다.)',
          };
        },
      },
    ],
  });
})();

