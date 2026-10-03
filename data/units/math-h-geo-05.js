/* 기하 · 직선과 평면의 위치 관계
 * 평면의 결정 조건, 두 직선·직선과 평면·두 평면의 위치 관계, 교선과 평행한 두 평면의 성질,
 * 꼬인 위치에 있는 두 직선이 이루는 각, 직선과 평면의 평행에 관한 간단한 증명을 다룬다.
 * (직선과 평면의 수직·삼수선 정리·정사영은 다음 단원)
 * 그림: 겨냥도는 아래 도우미(scene·boxFig)가 직접 그린 svg — 보이지 않는 모서리는 점선 */
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

  // ---------- 생성기에서 쓰는 입체 ----------
  // 위치 관계를 좌표로 판단한다(설명에는 좌표를 쓰지 않는다)
  var SOLIDS = [
    {
      name: '정육면체 ABCD-EFGH',
      V: boxV(1, 1, 1),
      E: BOX_E,
      fig: function (e) { return cubeFig([[e]], '정육면체 ABCD-EFGH 의 겨냥도. 모서리 ' + e + ' 를 굵게 표시했다'); },
    },
    {
      name: '삼각기둥 ABC-DEF',
      V: { A: [0, 0, 0], B: [2, 0, 0], C: [1.4, 1.9, 0], D: [0, 0, 2], E: [2, 0, 2], F: [1.4, 1.9, 2] },
      E: ['AB', 'BC', 'CA', 'DE', 'EF', 'FD', 'AD', 'BE', 'CF'],
      hidden: ['AC', 'CA'],
    },
    {
      name: '정사각뿔 O-ABCD',
      V: { A: [0, 0, 0], B: [2, 0, 0], C: [2, 2, 0], D: [0, 2, 0], O: [1, 1, 2] },
      E: ['AB', 'BC', 'CD', 'DA', 'OA', 'OB', 'OC', 'OD'],
      hidden: ['CD', 'DC', 'DA', 'AD', 'OD', 'DO'],
    },
    {
      name: '정사면체 ABCD',
      V: { A: [0, 0, 0], B: [2, 0, 0], C: [1, 1.732, 0], D: [1, 0.577, 1.633] },
      E: ['AB', 'BC', 'CA', 'AD', 'BD', 'CD'],
      hidden: ['CA', 'AC'],
    },
  ];
  // hl: [['OA', 색], …] 강조할 모서리
  function solidHL(S, hl, alt) {
    var segs = S.E.map(function (k) { return { a: S.V[k[0]], b: S.V[k[1]], dash: S.hidden.indexOf(k) >= 0 }; });
    hl.forEach(function (h) { segs.push({ a: S.V[h[0][0]], b: S.V[h[0][1]], color: h[1] || C4, w: 3, dash: S.hidden.indexOf(h[0]) >= 0 }); });
    var pts = Object.keys(S.V).map(function (k) { return { p: S.V[k], label: k, dot: false }; });
    return scene({ segs: segs, pts: pts, width: 230 }, alt);
  }
  function solidFig(S, e) {
    if (S.fig) return S.fig(e);
    return solidHL(S, [[e]], S.name + ' 의 겨냥도. 모서리 ' + e + ' 를 굵게 표시했다');
  }
  function sub3(p, q) { return [p[0] - q[0], p[1] - q[1], p[2] - q[2]]; }
  function cross(u, v) { return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]; }
  function dot(u, v) { return u[0] * v[0] + u[1] * v[1] + u[2] * v[2]; }
  function isZero(v) { return Math.abs(v[0]) < 1e-6 && Math.abs(v[1]) < 1e-6 && Math.abs(v[2]) < 1e-6; }
  // 두 모서리(직선)의 위치 관계: 'meet' | 'para' | 'skew'
  function relation(S, e, f) {
    if (e[0] === f[0] || e[0] === f[1] || e[1] === f[0] || e[1] === f[1]) return 'meet';
    var u = sub3(S.V[e[1]], S.V[e[0]]), v = sub3(S.V[f[1]], S.V[f[0]]);
    if (isZero(cross(u, v))) return 'para';
    var w = sub3(S.V[f[0]], S.V[e[0]]);
    if (Math.abs(dot(cross(u, v), w)) < 1e-6) return 'meet-ext'; // 연장하면 만난다(이 입체들에는 없다)
    return 'skew';
  }

  // 정육면체의 모서리·면의 대각선 (꼬인 위치의 두 직선이 이루는 각 생성기)
  var CV = boxV(1, 1, 1);
  var CSEG = [];
  (function () {
    var ks = 'ABCDEFGH'.split('');
    for (var i = 0; i < 8; i++) for (var j = i + 1; j < 8; j++) {
      var d = sub3(CV[ks[j]], CV[ks[i]]), L = dot(d, d);
      if (L <= 2) CSEG.push(ks[i] + ks[j]); // 모서리(1)·면의 대각선(2). 공간 대각선(3)은 뺀다
    }
  })();
  function len2(s) { var d = sub3(CV[s[1]], CV[s[0]]); return dot(d, d); }
  function rootTex(L) { return L === 1 ? '1' : '\\sqrt{' + L + '}'; }
  function para(s, t) { return isZero(cross(sub3(CV[s[1]], CV[s[0]]), sub3(CV[t[1]], CV[t[0]]))); }
  // 꼬인 위치의 두 선분 s1, s2: s2 와 평행하고 s1 과 꼭짓점을 공유하는 선분 s3 를 찾아 각을 삼각형 XVY 로 옮긴다
  var CUBE_PAIRS = [];
  (function () {
    var S = { V: CV };
    function common(s, t) { for (var i = 0; i < 2; i++) if (t.indexOf(s[i]) >= 0) return s[i]; return null; }
    function other(s, v) { return s[0] === v ? s[1] : s[0]; }
    for (var i = 0; i < CSEG.length; i++) for (var j = 0; j < CSEG.length; j++) {
      if (i === j) continue;
      var s1 = CSEG[i], s2 = CSEG[j];
      if (relation(S, s1, s2) !== 'skew') continue;
      for (var k = 0; k < CSEG.length; k++) {
        var s3 = CSEG[k];
        if (s3 === s2 || !para(s3, s2)) continue;
        var v = common(s1, s3);
        if (!v) continue;
        CUBE_PAIRS.push({ s1: s1, s2: s2, s3: s3, V: v, X: other(s1, v), Y: other(s3, v) });
        break;
      }
    }
  })();
  function C3(n) { return n * (n - 1) * (n - 2) / 6; }

  Tutor.registerUnit({
    id: 'math-h-geo-05',
    course: 'math-h-geo',
    title: '직선과 평면의 위치 관계',
    summary: '공간에서 평면이 하나로 정해지는 조건과 두 직선, 직선과 평면, 두 평면의 위치 관계를 알고, 꼬인 위치에 있는 두 직선이 이루는 각과 직선·평면의 평행에 관한 성질을 증명합니다.',
    goals: [
      '평면이 하나로 정해지는 조건을 알고, 주어진 점과 직선으로 정해지는 평면의 개수를 셀 수 있다.',
      '공간에서 두 직선, 직선과 평면, 두 평면의 위치 관계를 구별할 수 있다.',
      '꼬인 위치에 있는 두 직선이 이루는 각의 크기를 구할 수 있다.',
      '교선과 평행에 관한 성질을 이해하고 간단한 증명을 할 수 있다.',
    ],
    standards: ['[12기하02-01]'],

    concepts: [
      {
        title: '평면이 하나로 정해지는 조건',
        body: '서로 다른 두 점을 지나는 직선은 하나뿐이지만, 두 점을 지나는 평면은 무수히 많습니다. 두 점을 지나는 직선을 축으로 책장을 넘기듯 평면을 돌릴 수 있기 때문입니다. 평면이 **하나로 정해지려면** 다음 중 하나가 주어져야 합니다.\n\n1. 한 직선 위에 있지 않은 서로 다른 세 점\n2. 한 직선과 그 직선 위에 있지 않은 한 점\n3. 한 점에서 만나는 두 직선\n4. 평행한 두 직선\n\n2~4는 모두 1로 바꿔 생각할 수 있습니다. 예를 들어 한 점에서 만나는 두 직선은 교점과 각 직선 위의 다른 한 점씩, 곧 한 직선 위에 있지 않은 세 점을 줍니다.\n\n예: 공간의 네 점 A, B, C, D가 한 평면 위에 있지 않으면(이때 어느 세 점도 한 직선 위에 있지 않습니다), 세 점씩 골라 정하는 평면은 ${}_{4}\\mathrm{C}_{3}=4$개입니다.\n\n> ⚠️ 한 직선 위에 있는 세 점이나 **꼬인 위치에 있는 두 직선**은 평면을 하나로 정하지 못합니다. 꼬인 위치에 있는 두 직선을 함께 포함하는 평면은 없습니다.',
        easy: '바닥이 고르지 않은 곳에서 다리가 네 개인 의자는 덜컹거리지만, 다리가 세 개인 삼각대는 흔들리지 않습니다. 세 다리 끝(한 직선 위에 있지 않은 세 점)이 닿는 평면은 딱 하나로 정해지기 때문입니다. 네 다리 끝은 한 평면 위에 있지 않을 수 있습니다.\n\n문을 생각해도 좋습니다. 경첩 두 개(두 점)만으로는 문이 빙글빙글 돌지만, 문이 문틀의 한 점(세 번째 점)에 닿으면 문의 위치가 하나로 정해집니다.',
        fig: scene({
          planes: [{ pts: [[0, 0, 0], [4, 0, 0], [4, 5, 0], [0, 5, 0]], label: 'α', at: [0.5, 4.4, 0] }],
          pts: [{ p: [0.9, 1.0, 0], label: 'A', off: [-10, 6] }, { p: [3.0, 1.8, 0], label: 'B', off: [10, 6] }, { p: [1.6, 3.8, 0], label: 'C', off: [0, -11] }],
        }, '평면 α 위에 한 직선 위에 있지 않은 세 점 A, B, C가 있다'),
        check: {
          type: 'choice',
          q: '다음 중 평면을 하나로 정하는 것은 무엇입니까?',
          choices: ['한 점에서 만나는 두 직선', '꼬인 위치에 있는 두 직선', '한 직선 위에 있는 세 점'],
          answer: 0,
          why: ['', '꼬인 위치에 있는 두 직선을 함께 포함하는 평면은 없습니다.', '한 직선 위의 세 점을 지나는 평면은 그 직선을 축으로 돌릴 수 있어 무수히 많습니다.'],
          explain: '한 점에서 만나는 두 직선은 평면을 하나로 정합니다. 교점과 두 직선 위의 다른 점 하나씩이 한 직선 위에 있지 않은 세 점이 되기 때문입니다.',
        },
      },
      {
        title: '공간에서 두 직선의 위치 관계',
        body: '공간에서 서로 다른 두 직선의 위치 관계는 세 가지입니다.\n\n| 위치 관계 | 만나는가 | 한 평면 위에 있는가 |\n|---|---|---|\n| 한 점에서 만난다 | 만난다 | 있다 |\n| 평행하다 | 만나지 않는다 | 있다 |\n| 꼬인 위치에 있다 | 만나지 않는다 | 없다 |\n\n평면에서는 만나지 않는 두 직선이 곧 평행한 두 직선이지만, 공간에서는 **만나지도 않고 평행하지도 않은** 두 직선이 있습니다. 이런 두 직선을 **꼬인 위치에 있다**고 합니다.\n\n정육면체 ABCD-EFGH에서 직선 AB를 기준으로 보면 다음과 같습니다.\n\n- 한 점에서 만나는 직선: AD, AE, BC, BF\n- 평행한 직선: DC, EF, HG\n- 꼬인 위치에 있는 직선: CG, DH, EH, FG\n\n> 💡 공간에서도 평행은 이어집니다. $l \\parallel m$이고 $m \\parallel n$이면 $l \\parallel n$입니다.',
        easy: '교실을 커다란 직육면체라고 생각해 봅시다. 칠판 아래쪽 모서리와 뒤쪽 벽의 위쪽 모서리는 둘 다 가로 방향이라 평행합니다. 그런데 칠판 아래쪽 모서리와 뒤쪽 벽의 세로 모서리는 아무리 늘여도 만나지 않으면서 방향도 다릅니다. 이것이 꼬인 위치입니다.\n\n두 직선이 꼬인 위치인지 알아보려면 "둘을 한꺼번에 담는 평평한 판이 있을까?"를 생각해 보면 됩니다. 그런 판이 없으면 꼬인 위치입니다.',
        fig: cubeFig([['AB', C4], ['CG', C1]], '정육면체 ABCD-EFGH. 모서리 AB와 꼬인 위치에 있는 모서리 CG를 색으로 표시했다'),
        check: {
          type: 'ox',
          q: '공간에서 서로 만나지 않는 두 직선은 항상 평행합니다.',
          answer: false,
          explain: '공간에서는 만나지 않으면서 평행하지도 않은 두 직선, 곧 꼬인 위치에 있는 두 직선이 있습니다. 정육면체의 두 직선 AB와 CG가 그 예입니다.',
        },
      },
      {
        title: '직선과 평면, 두 평면의 위치 관계',
        body: '**직선과 평면**의 위치 관계는 세 가지입니다.\n\n1. 직선이 평면에 포함된다 — 직선 위의 두 점이 평면 위에 있으면 직선 전체가 평면 위에 있습니다.\n2. 한 점에서 만난다\n3. 평행하다 — 만나지 않습니다. 직선 $l$과 평면 $\\alpha$가 평행하면 $l \\parallel \\alpha$로 나타냅니다.\n\n**서로 다른 두 평면**의 위치 관계는 두 가지입니다.\n\n1. 만난다 — 두 평면이 만나면 그 공통 부분은 **직선**이 되고, 이 직선을 두 평면의 **교선**이라고 합니다.\n2. 평행하다 — 만나지 않습니다. $\\alpha \\parallel \\beta$로 나타냅니다.\n\n정육면체 ABCD-EFGH에서 직선 AE는 평면 ABCD와 한 점 A에서 만나고, 평면 BFGC와 평행하며, 평면 AEHD에 포함됩니다. 평면 ABCD와 평면 EFGH는 평행하고, 평면 ABCD와 평면 ABFE의 교선은 직선 AB입니다.\n\n> 💡 서로 다른 두 평면이 한 점에서만 만나는 일은 없습니다. 공통인 점이 하나 있으면 그 점을 지나는 교선이 생깁니다.',
        easy: '책상 위에서 연필을 놓는 세 가지 방법을 떠올려 보십시오. 연필을 책상 면에 눕히면 "포함", 책상에 비스듬히 꽂으면 "한 점에서 만남", 책상 면 위로 띄워 나란히 들고 있으면 "평행"입니다.\n\n두 평면은 펼친 책의 두 쪽처럼 한 줄(교선)에서 만나거나, 방의 바닥과 천장처럼 끝없이 떨어져 있습니다(평행).',
        fig: scene({
          planes: [{ pts: [[0, 0, 0], [5, 0, 0], [5, 5, 0], [0, 5, 0]], label: 'α', at: [4.5, 0.6, 0] }],
          segs: [
            { a: [0.2, 3.8, 1.6], b: [3.0, 3.8, 1.6], color: C4, w: 2.5 },
            { a: [3.6, 1.2, 0], b: [4.3, 2.4, 2.2], color: C1, w: 2.5 },
            { a: [0.6, 0.6, 0], b: [2.4, 2.6, 0], color: C2, w: 2.5 },
          ],
          pts: [{ p: [3.6, 1.2, 0] }],
          texts: [{ p: [3.0, 3.8, 1.6], s: 'l', off: [9, 0] }, { p: [4.3, 2.4, 2.2], s: 'm', off: [10, 0] }, { p: [2.4, 2.6, 0], s: 'n', off: [9, -3] }],
        }, '평면 α와 평행한 직선 l, 평면 α와 한 점에서 만나는 직선 m, 평면 α에 포함되는 직선 n'),
        check: {
          type: 'choice',
          q: '서로 다른 두 평면이 만날 때, 두 평면의 공통 부분은 무엇입니까?',
          choices: ['직선', '한 점', '선분'],
          answer: 0,
          why: ['', '두 평면이 한 점에서만 만나는 일은 없습니다. 공통인 점이 하나 있으면 그 점을 지나는 직선 전체가 공통 부분이 됩니다.', '평면은 끝없이 펼쳐져 있으므로 공통 부분도 끝이 없는 직선입니다.'],
          explain: '서로 다른 두 평면이 만나면 공통 부분은 직선이고, 이 직선을 교선이라고 합니다.',
        },
      },
      {
        title: '두 평면의 교선과 평행한 두 평면의 성질',
        body: '평면과 교선에 관한 다음 두 성질이 자주 쓰입니다.\n\n**성질 1** 평행한 두 평면 $\\alpha$, $\\beta$가 다른 한 평면 $\\gamma$와 만나서 생기는 두 교선 $l$, $m$은 평행합니다.\n\n이유: $l$은 $\\alpha$ 위에, $m$은 $\\beta$ 위에 있고 $\\alpha$와 $\\beta$는 만나지 않으므로 $l$과 $m$도 만나지 않습니다. 또 $l$, $m$은 모두 평면 $\\gamma$ 위에 있으므로 꼬인 위치일 수 없습니다. 한 평면 위에 있으면서 만나지 않으니 $l \\parallel m$입니다.\n\n**성질 2** 직선 $l$이 평면 $\\alpha$와 평행할 때, $l$을 포함하는 평면 $\\beta$가 $\\alpha$와 만나서 생기는 교선 $m$은 $l$과 평행합니다.\n\n이유: $m$은 $\\alpha$ 위에 있고 $l$은 $\\alpha$와 만나지 않으므로 $l$과 $m$은 만나지 않습니다. 또 $l$, $m$은 모두 $\\beta$ 위에 있으므로 $l \\parallel m$입니다.\n\n> 💡 두 성질 모두 "만나지 않는다 + 한 평면 위에 있다 → 평행"이라는 같은 생각으로 설명합니다.',
        easy: '두께가 고른 두부를 칼로 자르는 모습을 떠올려 보십시오. 두부의 윗면과 아랫면은 평행한 두 평면이고, 칼날이 지나간 면이 세 번째 평면입니다. 잘린 자리에 생기는 윗면의 선과 아랫면의 선은 언제나 나란합니다.\n\n칼을 비스듬히 넣어도 마찬가지입니다. 위아래 두 선은 같은 칼날 면 위에 있으면서 서로 만날 수 없기 때문입니다.',
        fig: scene({
          planes: [
            { pts: [[0, 0, 0], [5, 0, 0], [5, 3, 0], [0, 3, 0]], label: 'α', at: [0.4, 2.6, 0] },
            { pts: [[0.5, 1, 0], [4.5, 1, 0], [4.5, 2, 2], [0.5, 2, 2]], label: 'γ', at: [1.1, 1.5, 1], color: C2 },
            { pts: [[0, 0, 2], [5, 0, 2], [5, 3, 2], [0, 3, 2]], label: 'β', at: [0.4, 2.6, 2] },
          ],
          segs: [{ a: [0.5, 1, 0], b: [4.5, 1, 0], color: C4, w: 2.5 }, { a: [0.5, 2, 2], b: [4.5, 2, 2], color: C4, w: 2.5 }],
          texts: [{ p: [4.5, 1, 0], s: 'l', off: [9, 4] }, { p: [4.5, 2, 2], s: 'm', off: [10, 4] }],
        }, '평행한 두 평면 α, β가 평면 γ와 만나서 생기는 두 교선 l, m은 평행하다'),
        check: {
          type: 'ox',
          q: '평행한 두 평면이 다른 한 평면과 만나서 생기는 두 교선은 꼬인 위치에 있을 수도 있습니다.',
          answer: false,
          explain: '두 교선은 모두 세 번째 평면 위에 있으므로 꼬인 위치일 수 없고, 평행한 두 평면 위에 하나씩 있으므로 만나지도 않습니다. 따라서 두 교선은 항상 평행합니다.',
        },
      },
      {
        title: '꼬인 위치에 있는 두 직선이 이루는 각',
        body: '꼬인 위치에 있는 두 직선 $l$, $m$은 만나지 않으므로 각을 바로 잴 수 없습니다. 그래서 한 직선을 **평행이동**하여 다른 직선과 만나게 한 뒤 각을 잽니다.\n\n$l$ 위의 한 점 O를 지나고 $m$과 평행한 직선 $m^{\\prime}$을 그으면, $l$과 $m^{\\prime}$이 이루는 각 가운데 **크지 않은 쪽**($0^\\circ$보다 크고 $90^\\circ$ 이하)을 두 직선 $l$, $m$이 이루는 각이라고 합니다. 이 각의 크기는 점 O를 어디로 잡아도 같습니다.\n\n특히 이루는 각이 직각이면 두 직선은 **서로 수직**이라 하고 $l \\perp m$으로 나타냅니다. 꼬인 위치에 있는 두 직선도 수직일 수 있습니다.\n\n예: 정육면체 ABCD-EFGH에서 두 직선 AB와 CH가 이루는 각을 구해 봅시다. 사각형 BCHE는 직사각형이므로 직선 CH와 직선 BE는 평행합니다. 따라서 구하는 각은 $\\angle ABE$입니다. 삼각형 ABE는 $\\overline{AB}=\\overline{AE}$, $\\angle BAE=90^\\circ$인 직각이등변삼각형이므로 $\\angle ABE=45^\\circ$입니다.',
        easy: '젓가락 두 짝을 하나는 책상 위에, 하나는 공중에 꼬인 위치로 들고 있다고 해 봅시다. 공중의 젓가락을 방향은 그대로 둔 채 쭉 내려 책상 위의 젓가락과 만나게 하면, 두 젓가락 사이에 각이 보입니다. 그 각이 두 직선이 이루는 각입니다.\n\n방향만 중요하므로, 같은 방향의 다른 선(평행한 선)으로 바꿔 끼워도 각은 그대로입니다. 둔각이 보이면 그 옆의 예각을 답으로 합니다.',
        fig: cubeFig([['AB', C4], ['CH', C1], ['BE', C2]], '정육면체 ABCD-EFGH. 직선 AB, 직선 CH와 CH에 평행한 직선 BE를 색으로 표시했다'),
        check: {
          type: 'short', check: 'number', unit: '°',
          q: '정육면체 ABCD-EFGH에서 두 직선 AB와 FG가 이루는 각의 크기는 몇 도입니까?',
          answer: '90',
          wrong: [{ a: '0', why: '꼬인 위치라서 만나지 않는다고 0°로 생각했습니다. 직선 FG를 평행한 직선 BC로 옮겨 $\\angle ABC$를 재 보십시오.' }],
          explain: '직선 FG는 직선 BC와 평행하므로 두 직선 AB, FG가 이루는 각은 $\\angle ABC=90^\\circ$입니다. 두 직선은 꼬인 위치에 있으면서 서로 수직입니다.',
        },
      },
      {
        title: '직선과 평면의 평행에 관한 증명',
        body: '직선과 평면이 평행한지는 다음 성질로 판정할 수 있습니다.\n\n**정리** 평면 $\\alpha$ 위에 있지 않은 직선 $l$이 $\\alpha$ 위의 한 직선 $m$과 평행하면 $l \\parallel \\alpha$입니다.\n\n**증명**\n\n1. 평행한 두 직선 $l$, $m$은 한 평면을 정합니다. 이 평면을 $\\beta$라 하면 $\\alpha$와 $\\beta$의 교선은 $m$입니다.\n2. $l$이 $\\alpha$와 한 점 P에서 만난다고 가정합니다.\n3. P는 $l$ 위에 있으므로 $\\beta$ 위의 점이고, 동시에 $\\alpha$ 위의 점입니다. 따라서 P는 교선 $m$ 위에 있습니다.\n4. 그러면 $l$과 $m$이 점 P에서 만나게 되어 $l \\parallel m$에 모순입니다.\n\n따라서 $l$은 $\\alpha$와 만나지 않으므로 $l \\parallel \\alpha$입니다.\n\n> 💡 결론을 부정하여 모순을 이끌어 내는 증명 방법을 **귀류법**이라고 합니다. 공간도형의 위치 관계를 증명할 때 자주 씁니다.',
        easy: '방바닥에 그어 둔 선 하나와 나란하게, 바닥에서 떨어진 곳에 막대를 들고 있다고 해 봅시다. 막대가 바닥에 닿으려면 기울어져야 하는데, 그러면 더 이상 바닥의 선과 나란하지 않게 됩니다. 그래서 바닥의 선과 나란한 막대는 바닥과 만나지 않습니다. 곧 평행합니다.\n\n증명은 이 생각을 "만난다고 하면 모순이 생긴다"는 꼴로 정확하게 쓴 것입니다.',
        fig: scene({
          planes: [
            { pts: [[0, 0, 0], [5, 0, 0], [5, 3, 0], [0, 3, 0]], label: 'α', at: [4.6, 0.35, 0] },
            { pts: [[0.3, 1.5, 0], [4.7, 1.5, 0], [4.7, 1.5, 2.2], [0.3, 1.5, 2.2]], label: 'β', at: [0.7, 1.5, 1.9], color: C2 },
          ],
          segs: [{ a: [0.3, 1.5, 0], b: [4.7, 1.5, 0], color: C4, w: 2.5 }, { a: [0.3, 1.5, 1.4], b: [4.7, 1.5, 1.4], color: C4, w: 2.5 }],
          texts: [{ p: [4.7, 1.5, 0], s: 'm', off: [11, 2] }, { p: [4.7, 1.5, 1.4], s: 'l', off: [9, 0] }],
        }, '평면 α 위의 직선 m과 평행한 직선 l. 두 직선 l, m이 정하는 평면 β와 평면 α의 교선이 m이다'),
        check: {
          type: 'choice',
          q: '위 정리의 증명에서, $l$과 $\\alpha$가 만나는 점 P가 직선 $m$ 위에 있는 까닭은 무엇입니까?',
          choices: ['P가 $\\alpha$와 $\\beta$에 함께 있는 점이기 때문', '$l$ 위의 점은 모두 $m$ 위에 있기 때문', '평행한 두 직선은 반드시 만나기 때문'],
          answer: 0,
          why: ['', '$l$과 $m$은 서로 다른 직선이므로 $l$ 위의 점이 모두 $m$ 위에 있지는 않습니다.', '평행한 두 직선은 만나지 않습니다. 이 사실이 마지막에 모순을 만듭니다.'],
          explain: 'P는 $l$ 위의 점이라서 평면 $\\beta$ 위에 있고, 가정에 따라 평면 $\\alpha$ 위에도 있습니다. 두 평면에 공통인 점은 교선 $m$ 위에 있습니다.',
        },
      },
    ],

    examples: [
      {
        q: '정육면체 ABCD-EFGH에서 두 직선 AF와 BG가 이루는 각의 크기를 구하십시오.',
        fig: cubeFig([['AF', C4], ['BG', C1]], '정육면체 ABCD-EFGH. 직선 AF와 직선 BG를 색으로 표시했다'),
        steps: [
          '두 직선 AF, BG는 만나지도 평행하지도 않으므로 꼬인 위치에 있습니다. 한 직선을 평행한 직선으로 옮겨 만나게 합니다.',
          '사각형 ABGH는 직사각형이므로 직선 BG는 직선 AH와 평행합니다. 따라서 구하는 각은 두 직선 AF, AH가 이루는 각, 곧 $\\angle FAH$입니다.',
          '선분 AF, AH, FH는 모두 정육면체의 면의 대각선이므로 길이가 같습니다. 곧 삼각형 AFH는 정삼각형입니다.',
          '따라서 $\\angle FAH=60^\\circ$입니다.',
        ],
        answer: '$60^\\circ$',
      },
      {
        q: '공간에 서로 다른 6개의 점이 있습니다. 이 중 4개의 점은 한 평면 위에 있고, 이 4개의 점 가운데에서만 고른 네 점이 아니면 어느 네 점도 한 평면 위에 있지 않습니다. 또 어느 세 점도 한 직선 위에 있지 않습니다. 세 점으로 정해지는 서로 다른 평면의 개수를 구하십시오.',
        steps: [
          '한 직선 위에 있지 않은 세 점은 평면을 하나 정합니다. 6개의 점에서 세 점을 고르는 방법은 ${}_{6}\\mathrm{C}_{3}=20$가지입니다.',
          '그런데 한 평면 위에 있는 4개의 점에서 세 점을 고르는 ${}_{4}\\mathrm{C}_{3}=4$가지는 모두 같은 평면 하나를 정합니다.',
          '그래서 20가지에서 이 4가지를 빼고, 그 평면 1개를 더합니다. $20-4+1=17$',
        ],
        answer: '17개',
      },
    ],

    terms: [
      { term: '평면의 결정 조건', def: '평면이 하나로 정해지는 조건입니다. 한 직선 위에 있지 않은 세 점, 한 직선과 그 위에 있지 않은 한 점, 한 점에서 만나는 두 직선, 평행한 두 직선이 있습니다.' },
      { term: '꼬인 위치', def: '공간에서 두 직선이 만나지도 않고 평행하지도 않은 위치 관계입니다. 꼬인 위치에 있는 두 직선은 한 평면 위에 있지 않습니다.' },
      { term: '교선', def: '서로 다른 두 평면이 만날 때 생기는 공통 부분인 직선입니다.' },
      { term: '직선과 평면의 평행', def: '직선과 평면이 만나지 않을 때 평행하다고 하고, $l \\parallel \\alpha$로 나타냅니다.' },
      { term: '두 평면의 평행', def: '서로 다른 두 평면이 만나지 않을 때 평행하다고 하고, $\\alpha \\parallel \\beta$로 나타냅니다.' },
      { term: '두 직선이 이루는 각', def: '꼬인 위치에 있는 두 직선은 한 직선 위의 점을 지나고 다른 직선과 평행한 직선을 그어 생기는 각 가운데 크지 않은 쪽($90^\\circ$ 이하)으로 정합니다.' },
      { term: '두 직선의 수직', def: '두 직선이 이루는 각이 $90^\\circ$일 때 수직이라 하고 $l \\perp m$으로 나타냅니다. 공간에서는 꼬인 위치에 있는 두 직선도 수직일 수 있습니다.' },
      { term: '귀류법', def: '결론을 부정하면 모순이 생긴다는 것을 보여 결론이 참임을 증명하는 방법입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 평면이 하나로 정해지지 **않는** 것은 무엇입니까?',
        choices: ['한 직선 위에 있지 않은 세 점', '평행한 두 직선', '한 직선과 그 위에 있지 않은 한 점', '꼬인 위치에 있는 두 직선'],
        answer: 3,
        why: ['한 직선 위에 있지 않은 세 점은 평면을 하나로 정합니다.', '평행한 두 직선은 한 평면 위에 있고, 그 평면은 하나뿐입니다.', '직선 위의 두 점과 직선 밖의 한 점, 곧 한 직선 위에 있지 않은 세 점이 되므로 평면이 하나로 정해집니다.', ''],
        explain: '꼬인 위치에 있는 두 직선을 함께 포함하는 평면은 없으므로 평면이 정해지지 않습니다. 나머지 셋은 모두 평면을 하나로 정합니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 1,
        q: '공간에서 서로 만나지 않는 두 직선은 한 평면 위에 있지 않을 수도 있습니다.',
        answer: true,
        explain: '만나지 않는 두 직선은 평행하거나 꼬인 위치에 있습니다. 꼬인 위치에 있는 두 직선은 한 평면 위에 있지 않으므로 옳은 문장입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', unit: '개', concept: 0,
        q: '공간에 서로 다른 5개의 점이 있고, 어느 네 점도 한 평면 위에 있지 않습니다. 이 중 세 점으로 정해지는 서로 다른 평면의 개수를 구하십시오.',
        answer: '10',
        wrong: [{ a: '60', why: '세 점을 고르는 순서까지 생각해서 ${}_{5}\\mathrm{P}_{3}$으로 셌습니다. 같은 세 점은 순서와 관계없이 같은 평면을 정하므로 조합으로 셉니다.' }],
        explain: '어느 네 점도 한 평면 위에 있지 않으므로 어느 세 점도 한 직선 위에 있지 않고, 서로 다른 세 점을 고를 때마다 서로 다른 평면이 정해집니다. 따라서 ${}_{5}\\mathrm{C}_{3}=10$개입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '정육면체 ABCD-EFGH에서 직선 BF와 꼬인 위치에 있는 직선은 무엇입니까?',
        fig: cubeFig([['BF', C4]], '정육면체 ABCD-EFGH. 모서리 BF를 굵게 표시했다'),
        choices: ['직선 AD', '직선 CG', '직선 EF', '직선 BC'],
        answer: 0,
        why: ['', '직선 CG는 직선 BF와 평행합니다. 사각형 BCGF는 정사각형입니다.', '직선 EF는 직선 BF와 점 F에서 만납니다.', '직선 BC는 직선 BF와 점 B에서 만납니다.'],
        explain: '직선 AD는 직선 BF와 만나지 않고 평행하지도 않으므로 꼬인 위치에 있습니다. 직선 BF와 꼬인 위치에 있는 직선은 AD, CD, EH, GH입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', unit: '개', concept: 2,
        q: '정육면체 ABCD-EFGH의 여섯 면을 각각 포함하는 평면 가운데 직선 CG와 평행한 평면은 몇 개입니까?',
        fig: cubeFig([['CG', C4]], '정육면체 ABCD-EFGH. 모서리 CG를 굵게 표시했다'),
        answer: '2',
        wrong: [{ a: '4', why: '직선 CG를 포함하는 평면 BFGC, CGHD까지 셌습니다. 직선이 평면에 포함되면 평행이 아닙니다.' }],
        explain: '직선 CG를 포함하는 평면은 BFGC, CGHD이고, CG와 한 점에서 만나는 평면은 ABCD, EFGH입니다. 나머지 평면 ABFE, AEHD는 CG와 만나지 않으므로 평행합니다. 따라서 2개입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '평면 $\\alpha$와 평행한 직선 $l$을 포함하는 평면 $\\beta$가 평면 $\\alpha$와 만나서 생기는 교선을 $m$이라 할 때, 두 직선 $l$, $m$의 위치 관계는 무엇입니까?',
        choices: ['평행하다', '한 점에서 만난다', '꼬인 위치에 있다', '항상 수직이다'],
        answer: 0,
        why: ['', '$l$은 $\\alpha$와 만나지 않고 $m$은 $\\alpha$ 위에 있으므로 $l$과 $m$은 만날 수 없습니다.', '$l$과 $m$은 모두 평면 $\\beta$ 위에 있으므로 꼬인 위치일 수 없습니다.', '$l$과 $m$은 만나지 않고 한 평면 위에 있으므로 평행합니다. 수직이 될 수 없습니다.'],
        explain: '$l$, $m$은 모두 $\\beta$ 위에 있고, $m$은 $\\alpha$ 위에 있는데 $l$은 $\\alpha$와 만나지 않으므로 $l$과 $m$은 만나지 않습니다. 한 평면 위에 있으면서 만나지 않으므로 $l \\parallel m$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', unit: '°', concept: 4,
        q: '정육면체 ABCD-EFGH에서 두 직선 AD와 BG가 이루는 각의 크기는 몇 도입니까?',
        fig: cubeFig([['AD', C4], ['BG', C1]], '정육면체 ABCD-EFGH. 직선 AD와 직선 BG를 색으로 표시했다'),
        answer: '45',
        hint: '직선 BG와 평행하면서 점 A를 지나는 직선을 정육면체에서 찾아보십시오.',
        wrong: [{ a: '135', why: '평행이동해서 생긴 각 중 둔각을 골랐습니다. 두 직선이 이루는 각은 크지 않은 쪽($90^\\circ$ 이하)입니다.' }, { a: '90', why: '두 직선이 꼬인 위치에 있다고 해서 수직인 것은 아닙니다. 직선 BG를 평행한 직선 AH로 옮겨 재 보십시오.' }],
        explain: '사각형 ABGH는 직사각형이므로 직선 BG는 직선 AH와 평행합니다. 따라서 구하는 각은 $\\angle DAH$입니다. 삼각형 ADH는 $\\overline{AD}=\\overline{DH}$, $\\angle ADH=90^\\circ$인 직각이등변삼각형이므로 $\\angle DAH=45^\\circ$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 1,
        q: '공간에서 서로 다른 세 직선 $l$, $m$, $n$과 서로 다른 두 평면 $\\alpha$, $\\beta$에 대하여 항상 옳은 것은 무엇입니까?',
        choices: [
          '$l \\parallel m$이고 $m \\parallel n$이면 $l \\parallel n$이다.',
          '$l \\parallel \\alpha$이고 $m \\parallel \\alpha$이면 $l \\parallel m$이다.',
          '$l \\perp m$이고 $m \\perp n$이면 $l \\parallel n$이다.',
          '$l \\parallel \\alpha$이고 $l \\parallel \\beta$이면 $\\alpha \\parallel \\beta$이다.',
        ],
        answer: 0,
        why: [
          '',
          '한 평면과 평행한 두 직선은 평행할 수도, 만날 수도, 꼬인 위치일 수도 있습니다. 예: 정육면체에서 직선 EF와 FG는 모두 평면 ABCD와 평행하지만 점 F에서 만납니다.',
          '예: 정육면체에서 직선 AB와 AE는 수직이고 AE와 AD도 수직이지만, AB와 AD는 평행하지 않습니다.',
          '두 평면이 만나고 $l$이 그 교선과 평행할 수도 있습니다. 예: 정육면체에서 직선 FG는 평면 ABCD와 평면 AEHD에 모두 평행하지만, 두 평면은 직선 AD에서 만납니다.',
        ],
        hint: '정육면체의 모서리와 면으로 반례를 찾아보십시오.',
        explain: '공간에서도 한 직선과 평행한 두 직선은 서로 평행하므로 첫 번째 문장이 옳습니다. 나머지는 정육면체에서 반례를 찾을 수 있습니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: '°', concept: 4,
        q: '모든 모서리의 길이가 같은 정사각뿔 O-ABCD에서 두 직선 OA와 BC가 이루는 각의 크기는 몇 도입니까?',
        fig: solidHL(SOLIDS[2], [['OA', C4], ['BC', C1]], '정사각뿔 O-ABCD. 모서리 OA와 모서리 BC를 색으로 표시했다'),
        answer: '60',
        hint: '밑면 ABCD는 정사각형입니다. 직선 BC와 평행하면서 점 A를 지나는 모서리를 찾아보십시오.',
        wrong: [{ a: '90', why: '밑면에서 $\\overline{AB} \\perp \\overline{BC}$인 것과 헷갈렸습니다. 직선 BC를 평행한 직선 AD로 옮겨 $\\angle OAD$를 구해 보십시오.' }, { a: '120', why: '둔각을 골랐습니다. 두 직선이 이루는 각은 $90^\\circ$ 이하입니다.' }],
        explain: '밑면 ABCD는 정사각형이므로 직선 BC는 직선 AD와 평행합니다. 따라서 구하는 각은 $\\angle OAD$입니다. 모든 모서리의 길이가 같으므로 삼각형 OAD는 정삼각형이고, $\\angle OAD=60^\\circ$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'ox', concept: 2,
        q: '직선 $l$이 평면 $\\alpha$와 평행하면, $l$은 $\\alpha$ 위의 모든 직선과 평행합니다.',
        answer: false,
        explain: '$l$은 $\\alpha$ 위의 어떤 직선과도 만나지 않지만, 평행할 수도 있고 꼬인 위치에 있을 수도 있습니다. 예: 정육면체에서 직선 EF는 평면 ABCD와 평행하지만, 평면 ABCD 위의 직선 BC와는 꼬인 위치에 있습니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', unit: '개', concept: 0,
        q: '평행한 두 직선 $l$, $m$이 있고, $l$과 $m$이 정하는 평면 위에 있지 않은 점 P가 있습니다. 두 직선 $l$, $m$과 점 P 가운데 두 개로 정해지는 서로 다른 평면은 모두 몇 개입니까?',
        answer: '3',
        hint: '"$l$과 $m$", "$l$과 P", "$m$과 P"가 각각 평면을 정하는지 살펴보십시오.',
        wrong: [{ a: '1', why: '평행한 두 직선이 정하는 평면만 셌습니다. 직선과 그 위에 있지 않은 한 점도 평면을 하나 정합니다.' }, { a: '2', why: '평행한 두 직선 $l$, $m$도 평면을 하나 정합니다.' }],
        explain: '평행한 두 직선 $l$, $m$이 평면을 하나 정하고, 직선 $l$과 점 P, 직선 $m$과 점 P가 각각 평면을 하나씩 정합니다. P는 $l$, $m$이 정하는 평면 위에 있지 않으므로 세 평면은 모두 다릅니다. 따라서 3개입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 0,
        q: '평행한 두 직선 $l$, $m$이 있습니다. 직선 $l$ 위에 서로 다른 점 3개, 직선 $m$ 위에 서로 다른 점 4개가 있고, 두 직선 $l$, $m$이 정하는 평면 위에 있지 않은 점 P가 있습니다. 이 8개의 점 가운데 한 직선 위에 있지 않은 세 점으로 정해지는 서로 다른 평면의 개수를 구하십시오.',
        answer: '15',
        hint: '점 P를 포함하는 경우와 포함하지 않는 경우로 나누어 세어 보십시오.',
        wrong: [
          { a: '56', why: '8개의 점에서 세 점을 고르는 ${}_{8}\\mathrm{C}_{3}$을 그대로 답했습니다. 한 직선 위의 세 점은 평면을 정하지 않고, 같은 평면을 정하는 경우도 많습니다.' },
          { a: '14', why: '점 P를 포함하지 않는 7개의 점이 모두 한 평면 위에 있다는 것, 곧 그 평면 1개를 빠뜨렸습니다.' },
        ],
        explain: '점 P를 포함하지 않는 세 점은 모두 $l$, $m$이 정하는 평면 위에 있으므로 평면 1개를 정합니다.\n\n점 P를 포함할 때\n\n- P와 $l$ 위의 두 점: 평면 하나(직선 $l$과 점 P가 정하는 평면)\n- P와 $m$ 위의 두 점: 평면 하나(직선 $m$과 점 P가 정하는 평면)\n- P와 $l$ 위의 한 점, $m$ 위의 한 점: $3 \\times 4=12$개. 이 평면들은 $l$, $m$이 정하는 평면과 서로 다른 직선에서 만나므로 모두 다릅니다.\n\n따라서 $1+1+1+12=15$개입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: '개', concept: 1,
        q: '정육면체 ABCD-EFGH의 12개의 모서리 가운데, 대각선 AG를 포함하는 직선과 꼬인 위치에 있는 모서리는 몇 개입니까?',
        fig: cubeFig([['AG', C4]], '정육면체 ABCD-EFGH. 대각선 AG를 굵게 표시했다'),
        answer: '6',
        hint: '점 A 또는 점 G를 끝점으로 하는 모서리는 직선 AG와 만납니다. 나머지 모서리 가운데 직선 AG와 평행하거나 한 평면 위에 있는 것이 있는지 살펴보십시오.',
        wrong: [{ a: '12', why: '모서리를 모두 셌습니다. 점 A나 점 G를 끝점으로 하는 6개의 모서리는 직선 AG와 만납니다.' },{ a: '4', why: '정육면체의 모서리에 대한 꼬인 위치(4개)와 헷갈렸습니다. 대각선 AG를 기준으로 다시 세어 보십시오.' }],
        explain: '점 A를 끝점으로 하는 모서리 AB, AD, AE와 점 G를 끝점으로 하는 모서리 CG, FG, GH는 직선 AG와 만납니다. 나머지 BC, CD, BF, DH, EF, EH의 6개는 직선 AG와 만나지 않고, 방향이 달라 평행하지도 않습니다. 예를 들어 직선 AG와 직선 BC를 함께 포함하는 평면은 직선 BC와 점 A가 정하는 평면 ABCD인데, 점 G는 이 평면 위에 있지 않습니다. 따라서 6개 모두 꼬인 위치에 있습니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', unit: '°', concept: 4,
        q: '정육면체 ABCD-EFGH의 네 꼭짓점 A, C, F, H를 이으면 모든 모서리가 정육면체의 면의 대각선인 정사면체 ACFH가 생깁니다. 이 정사면체에서 마주 보는 두 모서리 AC와 FH가 이루는 각의 크기는 몇 도입니까?',
        fig: cubeFig([['AC', C4], ['FH', C1], ['AF', C2], ['AH', C2], ['CF', C2], ['CH', C2]], '정육면체 안의 정사면체 ACFH. 모서리 AC와 FH를 색으로 표시했다'),
        answer: '90',
        hint: '직선 FH와 평행한 직선을 정육면체의 밑면에서 찾아보십시오.',
        wrong: [{ a: '60', why: '정사면체의 면이 정삼각형이라 $60^\\circ$로 생각했습니다. AC와 FH는 한 면에 함께 있지 않은, 꼬인 위치의 두 직선입니다.' }],
        explain: '사각형 BDHF는 직사각형이므로 직선 FH는 직선 BD와 평행합니다. 따라서 두 직선 AC, FH가 이루는 각은 두 직선 AC, BD가 이루는 각과 같습니다. AC와 BD는 정사각형 ABCD의 두 대각선이므로 서로 수직입니다. 따라서 $90^\\circ$입니다.\n\n> 💡 정사면체의 마주 보는 두 모서리는 항상 서로 수직입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', fixed: true, concept: 3,
        q: '공간에서 다음 중 항상 옳은 것을 모두 고른 것은 무엇입니까?\n\nㄱ. 한 평면과 평행한 서로 다른 두 직선은 평행하다.\nㄴ. 한 직선과 평행한 서로 다른 두 평면은 평행하다.\nㄷ. 한 평면과 평행한 서로 다른 두 평면은 평행하다.',
        choices: ['ㄱ', 'ㄷ', 'ㄱ, ㄴ', 'ㄴ, ㄷ', 'ㄱ, ㄴ, ㄷ'],
        answer: 1,
        why: [
          'ㄱ은 옳지 않습니다. 한 평면과 평행한 두 직선은 만나거나 꼬인 위치에 있을 수도 있습니다. 또 ㄷ은 옳습니다.',
          '',
          'ㄱ, ㄴ 모두 반례가 있습니다. 정육면체의 면과 모서리로 찾아보십시오.',
          'ㄴ은 옳지 않습니다. 두 평면이 만나고, 그 교선과 평행한 직선이 두 평면 모두와 평행할 수 있습니다.',
          'ㄱ, ㄴ은 옳지 않습니다. 정육면체에서 반례를 찾아보십시오.',
        ],
        hint: '정육면체의 모서리와 면으로 ㄱ, ㄴ의 반례를 찾아보십시오.',
        explain: 'ㄱ. 정육면체에서 직선 EF와 FG는 모두 평면 ABCD와 평행하지만 점 F에서 만납니다. (거짓)\n\nㄴ. 정육면체에서 직선 FG는 평면 ABCD와 평면 AEHD에 모두 평행하지만, 두 평면은 직선 AD에서 만납니다. (거짓)\n\nㄷ. 두 평면이 만난다고 하면, 두 평면에 공통인 한 점을 지나면서 처음의 한 평면과 평행한 평면이 두 개가 되어 모순입니다. 한 점을 지나고 주어진 평면과 평행한 평면은 하나뿐입니다. (참)\n\n따라서 옳은 것은 ㄷ입니다.',
      },
    ],

    deeper: [
      {
        title: '정사면체의 마주 보는 모서리는 왜 수직일까',
        body: '정육면체 ABCD-EFGH에서 네 꼭짓점 A, C, F, H를 골라 이으면 여섯 모서리가 모두 면의 대각선인 정사면체가 생깁니다. 정사면체를 정육면체 안에 넣어 보면 성질이 잘 보입니다.\n\n마주 보는 두 모서리 AC와 FH는 정육면체의 아랫면과 윗면에 있습니다. 윗면의 대각선 FH는 아랫면의 대각선 BD와 평행하고, 정사각형의 두 대각선 AC, BD는 수직이므로 AC와 FH는 꼬인 위치에 있으면서 수직입니다. 다른 두 쌍의 마주 보는 모서리도 마찬가지입니다.\n\n다음 단원에서는 **직선과 평면의 수직**과 **삼수선 정리**를 배워, 이런 수직 관계를 정육면체 없이도 증명합니다.',
      },
      {
        title: '세 평면은 공간을 몇 부분으로 나눌까',
        body: '평면 하나는 공간을 2부분으로, 만나는 두 평면은 4부분으로 나눕니다. 세 평면이 서로 만나고 세 교선이 한 점에서 만나면(방의 한 구석에서 만나는 바닥과 두 벽을 끝없이 늘인 모습) 공간은 8부분으로 나뉩니다. 이것이 세 평면이 공간을 나눌 수 있는 가장 많은 개수입니다.\n\n세 평면이 모두 평행하면 4부분, 세 평면이 한 직선에서 만나면 6부분입니다. 위치 관계에 따라 결과가 달라지므로, 공간도형 문제에서는 가능한 위치 관계를 빠짐없이 나누어 생각하는 습관이 중요합니다.',
      },
    ],

    faq: [
      {
        q: '꼬인 위치에 있는 두 직선이 이루는 각을 구할 때 어느 직선을 옮겨야 해요?',
        a: '어느 쪽을 옮겨도 각의 크기는 같습니다. 도형 안에서 평행한 선분을 찾기 쉬운 쪽을 옮기면 됩니다. 정육면체라면 마주 보는 면의 같은 방향 대각선이나, 같은 방향의 모서리가 평행합니다. 옮긴 뒤 생기는 삼각형에서 각을 구하고, 둔각이 나오면 그 보각을 답합니다.',
      },
      {
        q: '공간에서 두 직선이 수직이면 꼭 만나야 하나요?',
        a: '아닙니다. 공간에서는 두 직선이 이루는 각이 $90^\\circ$이면 수직이라고 하므로, 꼬인 위치에 있는 두 직선도 수직일 수 있습니다. 예를 들어 정육면체에서 직선 AB와 CG는 만나지 않지만 수직입니다.',
      },
      {
        q: '평면이 "하나로 정해진다"는 게 무슨 뜻이에요?',
        a: '주어진 점이나 직선을 모두 포함하는 평면이 꼭 하나만 있다는 뜻입니다. 두 점만 주어지면 그 두 점을 지나는 평면은 무수히 많고, 꼬인 위치의 두 직선이 주어지면 둘을 모두 포함하는 평면은 하나도 없습니다. 둘 다 "하나로 정해지지 않는" 경우입니다.',
      },
    ],

    mistakes: [
      '공간에서 만나지 않는 두 직선을 무조건 평행하다고 하는 실수 — 꼬인 위치일 수도 있습니다. 한 평면 위에 있는지 함께 확인합니다.',
      '꼬인 위치의 두 직선이 이루는 각을 둔각($135^\\circ$, $120^\\circ$ 등)으로 답하는 실수 — 두 직선이 이루는 각은 $90^\\circ$ 이하인 쪽입니다.',
      '평면의 개수를 셀 때 한 평면 위에 있는 여러 점에서 고른 세 점을 서로 다른 평면으로 세는 실수 — 그 경우는 모두 합쳐 평면 1개입니다.',
    ],

    gens: [
      {
        id: 'edge-relation',
        level: 1,
        title: '입체도형에서 모서리의 위치 관계',
        make: function (R) {
          var S = R.pick(SOLIDS), e = R.pick(S.E);
          var g = { meet: [], para: [], skew: [] };
          S.E.forEach(function (f) {
            if (f === e) return;
            var r = relation(S, e, f);
            if (r === 'meet-ext') throw new Error('모서리를 늘이면 만나는 경우가 생겼습니다');
            g[r].push(f);
          });
          var kind = R.pick(['meet', 'para', 'skew']);
          var NAME = { meet: '한 점에서 만나는', para: '평행한', skew: '꼬인 위치에 있는' };
          var ans = g[kind].length;
          var wrong = [];
          function add(v, why) {
            if (v !== ans && !wrong.some(function (w) { return w.a === String(v); })) wrong.push({ a: String(v), why: why });
          }
          if (kind === 'skew') add(g.skew.length + g.para.length, '평행한 모서리까지 셌습니다. 평행한 두 직선은 한 평면 위에 있으므로 꼬인 위치가 아닙니다.');
          if (kind === 'para') add(g.para.length + g.skew.length, '만나지 않는 모서리를 모두 셌습니다. 그중 한 평면 위에 있지 않은 것은 꼬인 위치입니다.');
          if (kind === 'meet') {
            var one = g.meet.filter(function (f) { return f.indexOf(e[0]) >= 0; }).length;
            add(one, '한쪽 끝점 ' + e[0] + '에서 만나는 모서리만 셌습니다. 다른 끝점 ' + e[1] + '에서 만나는 모서리도 셉니다.');
          }
          function list(a) { return a.length ? a.join(', ') : '없음'; }
          return {
            type: 'short', check: 'number', unit: '개', concept: 1,
            fig: solidFig(S, e),
            q: '그림의 ' + S.name + '에서 모서리 ' + e + '를 포함하는 직선과 ' + NAME[kind] + ' 모서리는 몇 개입니까?',
            answer: String(ans),
            wrong: wrong,
            explain: '모서리 ' + e + '를 기준으로 나머지 모서리를 나누면 다음과 같습니다.\n\n- 한 점에서 만나는 모서리: ' + list(g.meet) + '\n- 평행한 모서리: ' + list(g.para) + '\n- 꼬인 위치에 있는 모서리: ' + list(g.skew) +
              '\n\n따라서 ' + NAME[kind] + ' 모서리는 ' + ans + '개입니다.',
          };
        },
      },
      {
        id: 'plane-count',
        level: 2,
        title: '세 점으로 정해지는 평면의 개수',
        make: function (R) {
          var n = R.int(5, 11), k = R.int(4, n - 1);
          var all = C3(n), ck = C3(k), ans = all - ck + 1;
          return {
            type: 'short', check: 'number', unit: '개', concept: 0,
            q: '공간에 서로 다른 ' + n + '개의 점이 있습니다. 이 중 ' + k + '개의 점은 한 평면 위에 있고, 이 ' + k + '개의 점 가운데에서만 고른 네 점이 아니면 어느 네 점도 한 평면 위에 있지 않습니다. 또 어느 세 점도 한 직선 위에 있지 않습니다. 이 점들 가운데 세 점으로 정해지는 서로 다른 평면의 개수를 구하십시오.',
            answer: String(ans),
            hint: '세 점을 고르는 방법의 수에서, 같은 평면을 정하는 경우를 하나로 묶어 보십시오.',
            wrong: [
              { a: String(all), why: '한 평면 위에 있는 ' + k + '개의 점에서 고른 세 점은 모두 같은 평면을 정한다는 것을 빠뜨렸습니다.' },
              { a: String(all - ck), why: '같은 평면을 정하는 경우를 뺀 뒤, 그 평면 1개를 다시 더하지 않았습니다.' },
            ],
            explain: '세 점을 고르는 방법은 ${}_{' + n + '}\\mathrm{C}_{3}=' + all + '$가지입니다. 그런데 한 평면 위에 있는 ' + k + '개의 점에서 세 점을 고르는 ${}_{' + k + '}\\mathrm{C}_{3}=' + ck + '$가지는 모두 같은 평면 하나를 정합니다.\n\n따라서 평면의 개수는 $' + all + '-' + ck + '+1=' + ans + '$입니다.',
          };
        },
      },
      {
        id: 'skew-angle-cube',
        level: 2,
        title: '정육면체에서 꼬인 위치에 있는 두 직선이 이루는 각',
        make: function (R) {
          var t = R.pick(CUBE_PAIRS);
          var V = t.V, X = t.X, Y = t.Y;
          var p = len2(V + X), q = len2(V + Y), r = len2(X + Y);
          var th = Math.round(Math.acos((p + q - r) / (2 * Math.sqrt(p * q))) * 180 / Math.PI);
          var ang = '\\angle ' + X + V + Y;
          var reason;
          if (th === 90) reason = '$\\overline{' + V + X + '}^2+\\overline{' + V + Y + '}^2=\\overline{' + X + Y + '}^2$이므로 $' + ang + '=90^\\circ$입니다.';
          else if (th === 60) reason = '세 변의 길이가 모두 $\\sqrt{2}$로 같은 정삼각형이므로 $' + ang + '=60^\\circ$입니다.';
          else if (th === 45) {
            var rightAt = p === 2 ? '\\angle ' + V + Y + X : '\\angle ' + V + X + Y;
            reason = '길이가 1인 두 변 사이의 각 $' + rightAt + '$가 직각인 직각이등변삼각형이므로 $' + ang + '=45^\\circ$입니다.';
          } else throw new Error('예상하지 못한 각: ' + th);
          // 평행한 두 선분 s2, s3 로 이루어진 직사각형의 이름 (꼭짓점을 차례대로)
          var d2 = sub3(CV[t.s2[1]], CV[t.s2[0]]), d3 = sub3(CV[t.s3[1]], CV[t.s3[0]]);
          var quad = dot(d2, d3) > 0 ? t.s2[0] + t.s2[1] + t.s3[1] + t.s3[0] : t.s2[0] + t.s2[1] + t.s3[0] + t.s3[1];
          return {
            type: 'short', check: 'number', unit: '°', concept: 4,
            fig: cubeFig([[t.s1, C4], [t.s2, C1]], '정육면체 ABCD-EFGH. 직선 ' + t.s1 + '와 직선 ' + t.s2 + '를 색으로 표시했다'),
            q: '정육면체 ABCD-EFGH에서 두 직선 ' + t.s1 + '와 ' + t.s2 + '가 이루는 각의 크기는 몇 도입니까?',
            answer: String(th),
            hint: '직선 ' + t.s2 + '와 평행하면서 직선 ' + t.s1 + '와 만나는 선분을 정육면체에서 찾아보십시오.',
            wrong: th === 90 ? [] : [{ a: String(180 - th), why: '둔각을 골랐습니다. 두 직선이 이루는 각은 크지 않은 쪽($90^\\circ$ 이하)입니다.' }],
            explain: '사각형 ' + quad + '는 직사각형이므로 직선 ' + t.s2 + '는 직선 ' + t.s3 + '와 평행합니다. 두 직선 ' + t.s1 + ', ' + t.s3 + '는 점 ' + V + '에서 만나므로 구하는 각은 $' + ang + '$입니다.\n\n' +
              '정육면체의 한 모서리의 길이를 1이라 하면 삼각형 ' + X + V + Y + '에서 $\\overline{' + V + X + '}=' + rootTex(p) + '$, $\\overline{' + V + Y + '}=' + rootTex(q) + '$, $\\overline{' + X + Y + '}=' + rootTex(r) + '$이고, ' + reason,
          };
        },
      },
      {
        id: 'skew-cos-box',
        level: 3,
        title: '직육면체에서 두 직선이 이루는 각의 코사인',
        make: function (R) {
          var t = R.pick([
            { s1: 'AC', s2: 'FH', s3: 'BD', face: 'ABCD', quad: 'BDHF', P: 'A', Q: 'B', u: 'a', v: 'b' },
            { s1: 'AF', s2: 'CH', s3: 'BE', face: 'ABFE', quad: 'BCHE', P: 'A', Q: 'B', u: 'a', v: 'c' },
            { s1: 'DE', s2: 'BG', s3: 'AH', face: 'AEHD', quad: 'ABGH', P: 'A', Q: 'D', u: 'b', v: 'c' },
          ]);
          var d = { a: R.int(1, 6), b: R.int(1, 6), c: R.int(1, 6) };
          if (d[t.u] === d[t.v]) d[t.v] = d[t.u] + R.int(1, 3);
          var u = d[t.u], v = d[t.v], U = u * u, VV = v * v, den = U + VV, num = VV - U;
          var cAns = R.F(Math.abs(num), den);
          var raw = '\\dfrac{' + Math.abs(num) + '}{' + den + '}';
          var shown = cAns.den === den ? raw : raw + '=' + R.fmt.frac(cAns);
          var M = 'M';
          var cosLine = '$\\cos(\\angle ' + t.P + M + t.Q + ')=\\dfrac{\\frac{' + den + '}{4}+\\frac{' + den + '}{4}-' + U + '}{2 \\cdot \\frac{' + den + '}{4}}=\\dfrac{' + num + '}{' + den + '}$';
          return {
            type: 'short', check: 'number', concept: 4,
            fig: boxFig({ a: d.a, b: d.b, c: d.c, dims: { a: String(d.a), b: String(d.b), c: String(d.c) }, hl: [[t.s1, C4], [t.s2, C1]] },
              '세 모서리의 길이가 ' + d.a + ', ' + d.b + ', ' + d.c + '인 직육면체 ABCD-EFGH. 직선 ' + t.s1 + '와 직선 ' + t.s2 + '를 색으로 표시했다'),
            q: '$\\overline{AB}=' + d.a + '$, $\\overline{AD}=' + d.b + '$, $\\overline{AE}=' + d.c + '$인 직육면체 ABCD-EFGH에서 두 직선 ' + t.s1 + '와 ' + t.s2 + '가 이루는 각의 크기를 $\\theta$라 할 때, $\\cos\\theta$의 값을 구하십시오.',
            answer: cAns.toString(),
            hint: '직선 ' + t.s2 + '와 평행한 직선을 찾으면, 두 직선이 한 직사각형의 두 대각선이 됩니다.',
            wrong: [{ a: R.F(-Math.abs(num), den).toString(), why: '둔각의 코사인을 답했습니다. 두 직선이 이루는 각은 $90^\\circ$ 이하이므로 $\\cos\\theta \\ge 0$입니다.' }],
            explain: '사각형 ' + t.quad + '는 직사각형이므로 직선 ' + t.s2 + '는 직선 ' + t.s3 + '와 평행합니다. 따라서 $\\theta$는 두 직선 ' + t.s1 + ', ' + t.s3 + '가 이루는 각입니다.\n\n' +
              '두 선분 ' + t.s1 + ', ' + t.s3 + '는 직사각형 ' + t.face + '의 두 대각선이므로 길이가 같고 서로를 이등분합니다. 대각선의 길이의 제곱은 $' + U + '+' + VV + '=' + den + '$이므로, 두 대각선의 교점을 M이라 하면 $\\overline{M' + t.P + '}^2=\\overline{M' + t.Q + '}^2=\\frac{' + den + '}{4}$이고 $\\overline{' + t.P + t.Q + '}^2=' + U + '$입니다.\n\n' +
              '삼각형 ' + M + t.P + t.Q + '에서 코사인법칙에 의하여\n\n' + cosLine + '\n\n' +
              (num < 0 ? '이 값이 음수이므로 $\\angle ' + t.P + M + t.Q + '$는 둔각이고, 두 직선이 이루는 각 $\\theta$는 그 보각입니다. ' : '') +
              '따라서 $\\cos\\theta=' + shown + '$입니다.',
          };
        },
      },
    ],
  });
})();
