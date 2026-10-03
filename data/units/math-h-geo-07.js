/* 기하 · 공간좌표
 * 좌표공간과 점의 좌표, 좌표평면·좌표축에 내린 수선의 발과 대칭인 점, 두 점 사이의 거리,
 * 선분의 내분점·중점과 삼각형의 무게중심, 구의 방정식(표준형·전개한 꼴)을 다룬다. (벡터는 다음 단원 이후)
 * 그림: 좌표공간은 아래 도우미(scene·axesFig)가 직접 그린 svg — x축은 앞쪽(왼쪽 아래), y축은 오른쪽, z축은 위 */
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

  // 수학 좌표 (x, y, z) → 그림 좌표 (x축이 앞쪽 왼쪽 아래로 오게)
  function S3(p) { return [p[1], -p[0], p[2]]; }
  /* 좌표축과 점 P(a, b, c)(양수 좌표). o.marks: [{ p: [x,y,z], label }] 더 찍을 점, o.hl: [[p, q], …] 강조할 선분 */
  function axesFig(o, alt) {
    var a = o.p[0], b = o.p[1], c = o.p[2], L = Math.max(a, b, c) + 1.4, P = [a, b, c];
    function seg(p, q, dash, color, w) { return { a: S3(p), b: S3(q), dash: dash, color: color, w: w }; }
    var segs = [seg([0, 0, 0], [L, 0, 0]), seg([0, 0, 0], [0, L + 0.6, 0]), seg([0, 0, 0], [0, 0, L])];
    [[[a, 0, 0], [a, b, 0]], [[0, b, 0], [a, b, 0]], [[a, b, 0], P], [[0, 0, c], [a, 0, c]], [[0, 0, c], [0, b, c]],
      [[a, 0, c], P], [[0, b, c], P], [[a, 0, 0], [a, 0, c]], [[0, b, 0], [0, b, c]]].forEach(function (e) { segs.push(seg(e[0], e[1], true)); });
    (o.hl || []).forEach(function (h) { segs.push(seg(h[0], h[1], false, C4, 2.5)); });
    var pts = [{ p: S3(P), label: o.label || 'P', off: [10, -8] }];
    (o.marks || []).forEach(function (m) { pts.push({ p: S3(m.p), label: m.label, off: m.off }); });
    var texts = [
      { p: S3([L, 0, 0]), s: 'x', off: [-6, 10] }, { p: S3([0, L + 0.6, 0]), s: 'y', off: [10, 0] }, { p: S3([0, 0, L]), s: 'z', off: [0, -10] },
      { p: S3([0, 0, 0]), s: 'O', off: [-10, -6] },
    ];
    if (o.ticks !== false) texts.push({ p: S3([a, 0, 0]), s: String(a), off: [-10, 4] }, { p: S3([0, b, 0]), s: String(b), off: [2, 12] }, { p: S3([0, 0, c]), s: String(c), off: [-11, 0] });
    return scene({ segs: segs, pts: pts, texts: texts, width: 250 }, alt);
  }

  function surd(n) {
    var k = 1, m = n;
    for (var i = 2; i * i <= m; i++) while (m % (i * i) === 0) { m /= i * i; k *= i; }
    if (m === 1) return { tex: String(k), ans: String(k), root: false };
    return { tex: (k === 1 ? '' : k) + '\\sqrt{' + m + '}', ans: (k === 1 ? '' : k) + '√' + m, root: true };
  }
  function tup(R, p) { return '$(' + p.map(function (v) { return R.fmt.frac(typeof v === 'number' ? R.F(v) : v); }).join(', ') + ')$'; }
  function lin(c, v) { return c === 0 ? '' : (c > 0 ? '+' : '-') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + v; }
  function cst(c) { return c === 0 ? '' : (c > 0 ? '+' : '-') + Math.abs(c); }
  function sq(v, a) { return a === 0 ? v + '^2' : '(' + v + (a > 0 ? '-' : '+') + Math.abs(a) + ')^2'; }
  function par(n) { return n < 0 ? '(' + n + ')' : String(n); }

  // 수선의 발·대칭인 점
  var TF = [
    { q: '에서 $xy$평면에 내린 수선의 발', d: 'P에서 $xy$평면에 내린 수선의 발', rule: '$xy$평면 위의 점은 $z$좌표가 0이므로 $z$좌표만 0으로 바꿉니다.', f: function (p) { return [p[0], p[1], 0]; } },
    { q: '에서 $yz$평면에 내린 수선의 발', d: 'P에서 $yz$평면에 내린 수선의 발', rule: '$yz$평면 위의 점은 $x$좌표가 0이므로 $x$좌표만 0으로 바꿉니다.', f: function (p) { return [0, p[1], p[2]]; } },
    { q: '에서 $zx$평면에 내린 수선의 발', d: 'P에서 $zx$평면에 내린 수선의 발', rule: '$zx$평면 위의 점은 $y$좌표가 0이므로 $y$좌표만 0으로 바꿉니다.', f: function (p) { return [p[0], 0, p[2]]; } },
    { q: '에서 $x$축에 내린 수선의 발', d: 'P에서 $x$축에 내린 수선의 발', rule: '$x$축 위의 점은 $y$좌표와 $z$좌표가 0이므로 $x$좌표만 남깁니다.', f: function (p) { return [p[0], 0, 0]; } },
    { q: '에서 $y$축에 내린 수선의 발', d: 'P에서 $y$축에 내린 수선의 발', rule: '$y$축 위의 점은 $x$좌표와 $z$좌표가 0이므로 $y$좌표만 남깁니다.', f: function (p) { return [0, p[1], 0]; } },
    { q: '에서 $z$축에 내린 수선의 발', d: 'P에서 $z$축에 내린 수선의 발', rule: '$z$축 위의 점은 $x$좌표와 $y$좌표가 0이므로 $z$좌표만 남깁니다.', f: function (p) { return [0, 0, p[2]]; } },
    { q: '를 $xy$평면에 대하여 대칭이동한 점', d: '$xy$평면에 대하여 P와 대칭인 점', rule: '$xy$평면에 대하여 대칭이동하면 $x$, $y$좌표는 그대로이고 $z$좌표의 부호만 바뀝니다.', f: function (p) { return [p[0], p[1], -p[2]]; } },
    { q: '를 $yz$평면에 대하여 대칭이동한 점', d: '$yz$평면에 대하여 P와 대칭인 점', rule: '$yz$평면에 대하여 대칭이동하면 $y$, $z$좌표는 그대로이고 $x$좌표의 부호만 바뀝니다.', f: function (p) { return [-p[0], p[1], p[2]]; } },
    { q: '를 $zx$평면에 대하여 대칭이동한 점', d: '$zx$평면에 대하여 P와 대칭인 점', rule: '$zx$평면에 대하여 대칭이동하면 $z$, $x$좌표는 그대로이고 $y$좌표의 부호만 바뀝니다.', f: function (p) { return [p[0], -p[1], p[2]]; } },
    { q: '를 $x$축에 대하여 대칭이동한 점', d: '$x$축에 대하여 P와 대칭인 점', rule: '$x$축에 대하여 대칭이동하면 $x$좌표는 그대로이고 $y$, $z$좌표의 부호가 바뀝니다.', f: function (p) { return [p[0], -p[1], -p[2]]; } },
    { q: '를 $y$축에 대하여 대칭이동한 점', d: '$y$축에 대하여 P와 대칭인 점', rule: '$y$축에 대하여 대칭이동하면 $y$좌표는 그대로이고 $z$, $x$좌표의 부호가 바뀝니다.', f: function (p) { return [-p[0], p[1], -p[2]]; } },
    { q: '를 $z$축에 대하여 대칭이동한 점', d: '$z$축에 대하여 P와 대칭인 점', rule: '$z$축에 대하여 대칭이동하면 $z$좌표는 그대로이고 $x$, $y$좌표의 부호가 바뀝니다.', f: function (p) { return [-p[0], -p[1], p[2]]; } },
    { q: '를 원점에 대하여 대칭이동한 점', d: '원점에 대하여 P와 대칭인 점', rule: '원점에 대하여 대칭이동하면 세 좌표의 부호가 모두 바뀝니다.', f: function (p) { return [-p[0], -p[1], -p[2]]; } },
  ];
  var QUADS = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 6, 7, 11], [3, 4, 12, 13], [2, 10, 11, 15], [2, 5, 14, 15], [1, 12, 12, 17], [8, 9, 12, 17]];

  // 생성기 coord-basic 의 두 갈래: 수선의 발·대칭인 점(고르기) / 두 점 사이의 거리·점과 좌표축 사이의 거리(답 쓰기)
  function footSym(R) {
    var mags = R.sample([1, 2, 3, 4, 5, 6, 7], 3);
    var p = mags.map(function (m) { return R.bool() ? m : -m; });
    var k = R.int(0, TF.length - 1), t = TF[k];
    var correct = tup(R, t.f(p));
    var desc = {};
    var wrongs = [];
    TF.forEach(function (u, i) {
      if (i === k) return;
      var s = tup(R, u.f(p));
      desc[s] = '이 점은 ' + u.d + '입니다.';
      wrongs.push(s);
    });
    var pick = R.choices(correct, R.shuffle(wrongs).slice(0, 6));
    return {
      type: 'choice', concept: 1,
      q: '점 P$(' + p.join(', ') + ')$' + (t.q.charAt(0) === '를' ? R.josa(p[2], '을/를') + t.q.slice(1) : t.q) + '의 좌표는 무엇입니까?',
      choices: pick.choices,
      answer: pick.answer,
      why: pick.choices.map(function (c) { return c === correct ? '' : desc[c]; }),
      explain: t.rule + ' 따라서 ' + correct + '입니다.',
    };
  }
  function distance(R) {
    var A = [R.int(-5, 5), R.int(-5, 5), R.int(-5, 5)];
    var d, s, n;
    if (R.bool(0.3)) {
      // 점과 좌표축 사이의 거리
      var P = [R.nonzero(-7, 7), R.nonzero(-7, 7), R.nonzero(-7, 7)];
      var ax = R.int(0, 2), names = ['x', 'y', 'z'];
      var foot = [0, 0, 0]; foot[ax] = P[ax];
      n = 0; P.forEach(function (v, i) { if (i !== ax) n += v * v; });
      s = surd(n);
      var all = surd(P[0] * P[0] + P[1] * P[1] + P[2] * P[2]);
      var terms = P.map(function (v, i) { return i === ax ? '0^2' : par(v) + '^2'; }).join('+');
      return {
        type: 'short', check: s.root || all.root ? 'expr' : 'number', concept: 2,
        q: '점 P$(' + P.join(', ') + ')$' + R.josa(P[2], '과/와') + ' $' + names[ax] + '$축 사이의 거리를 구하십시오.',
        answer: s.ans,
        hint: '점 P에서 $' + names[ax] + '$축에 내린 수선의 발을 먼저 구하십시오.',
        wrong: [{ a: all.ans, why: '원점까지의 거리를 구했습니다. $' + names[ax] + '$축까지의 거리는 수선의 발 $(' + foot.join(', ') + ')$까지의 거리입니다.' }],
        explain: '점 P에서 $' + names[ax] + '$축에 내린 수선의 발은 $(' + foot.join(', ') + ')$입니다. 따라서 거리는 $\\sqrt{' + terms + '}=' + (s.tex !== '\\sqrt{' + n + '}' ? '\\sqrt{' + n + '}=' : '') + s.tex + '$입니다.',
      };
    }
    if (R.bool(0.65)) {
      var q = R.pick(QUADS);
      d = R.shuffle([q[0], q[1], q[2]]).map(function (v) { return R.bool() ? v : -v; });
    } else {
      do { d = [R.int(-6, 6), R.int(-6, 6), R.int(-6, 6)]; } while (d[0] === 0 && d[1] === 0 && d[2] === 0);
    }
    var B = [A[0] + d[0], A[1] + d[1], A[2] + d[2]];
    n = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
    s = surd(n);
    var plain = Math.abs(d[0]) + Math.abs(d[1]) + Math.abs(d[2]);
    var wrong = [];
    if (String(plain) !== s.ans) wrong.push({ a: String(plain), why: '좌표의 차를 제곱하지 않고 더했습니다. 차를 각각 제곱해 더한 뒤 제곱근을 구합니다.' });
    if (String(n) !== s.ans) wrong.push({ a: String(n), why: '제곱근을 구하지 않았습니다.' });
    var diffs = [0, 1, 2].map(function (i) { return '(' + B[i] + '-' + par(A[i]) + ')^2'; }).join('+');
    return {
      type: 'short', check: s.root ? 'expr' : 'number', concept: 2,
      q: '두 점 A$(' + A.join(', ') + ')$, B$(' + B.join(', ') + ')$ 사이의 거리를 구하십시오.',
      answer: s.ans,
      wrong: wrong,
      explain: '$\\overline{AB}=\\sqrt{' + diffs + '}=\\sqrt{' + d.map(function (v) { return v * v; }).join('+') + '}=' + (s.tex !== '\\sqrt{' + n + '}' ? '\\sqrt{' + n + '}=' : '') + s.tex + '$',
    };
  }

  Tutor.registerUnit({
    id: 'math-h-geo-07',
    course: 'math-h-geo',
    title: '공간좌표',
    summary: '좌표공간에서 점의 좌표를 나타내고, 수선의 발과 대칭인 점, 두 점 사이의 거리, 선분의 내분점과 무게중심, 구의 방정식을 구합니다.',
    goals: [
      '좌표공간에서 점의 좌표를 나타내고, 좌표평면·좌표축에 내린 수선의 발과 대칭인 점의 좌표를 구할 수 있다.',
      '좌표공간에서 두 점 사이의 거리를 구할 수 있다.',
      '좌표공간에서 선분의 내분점과 중점, 삼각형의 무게중심의 좌표를 구할 수 있다.',
      '구의 방정식을 구하고, 전개한 꼴에서 중심과 반지름을 찾을 수 있다.',
    ],
    standards: ['[12기하02-04]', '[12기하02-05]'],

    concepts: [
      {
        title: '좌표공간과 점의 좌표',
        body: '공간의 한 점 O에서 서로 수직인 세 수직선을 그어 각각 **$x$축, $y$축, $z$축**이라 하고, 이들을 통틀어 **좌표축**이라고 합니다. 점 O는 **원점**입니다.\n\n두 좌표축으로 정해지는 평면을 **좌표평면**이라 하고, $x$축과 $y$축이 정하는 평면을 $xy$평면, $y$축과 $z$축이 정하는 평면을 $yz$평면, $z$축과 $x$축이 정하는 평면을 $zx$평면이라고 합니다.\n\n공간의 점 P를 지나고 세 좌표평면과 각각 평행한 평면이 $x$축, $y$축, $z$축과 만나는 점의 좌표가 차례로 $a$, $b$, $c$이면 점 P의 좌표를 $(a, b, c)$로 나타냅니다. 좌표가 정해진 공간을 **좌표공간**이라고 합니다.\n\n| 점의 위치 | 좌표의 꼴 |\n|---|---|\n| $x$축 위 | $(a, 0, 0)$ |\n| $y$축 위 | $(0, b, 0)$ |\n| $z$축 위 | $(0, 0, c)$ |\n| $xy$평면 위 | $(a, b, 0)$ |\n| $yz$평면 위 | $(0, b, c)$ |\n| $zx$평면 위 | $(a, 0, c)$ |\n\n> 💡 어느 좌표평면 위의 점인지는 "그 평면의 이름에 없는 좌표가 0"인지 보면 됩니다. $xy$평면에는 $z$가 없으므로 $z$좌표가 0입니다.',
        easy: '교실 바닥의 한쪽 구석을 원점이라고 생각해 봅시다. 앞으로 몇 걸음($x$), 옆으로 몇 걸음($y$), 위로 몇 칸($z$) 갔는지 세 수만 말하면 교실 안의 어느 곳이든 정확히 가리킬 수 있습니다.\n\n평면에서는 두 수 $(x, y)$로 충분했지만, 공간에서는 높이가 더해져 세 수 $(x, y, z)$가 필요합니다.',
        fig: axesFig({ p: [2, 3, 2] }, '좌표공간의 세 좌표축과 점 P(2, 3, 2). 점 P에서 각 좌표평면과 평행한 면들이 직육면체를 이룬다'),
        check: {
          type: 'choice',
          q: '다음 중 $yz$평면 위에 있는 점은 무엇입니까?',
          choices: ['$(0, 2, -3)$', '$(2, 0, -3)$', '$(2, -3, 0)$'],
          answer: 0,
          why: ['', '$y$좌표가 0인 점이므로 $zx$평면 위의 점입니다.', '$z$좌표가 0인 점이므로 $xy$평면 위의 점입니다.'],
          explain: '$yz$평면 위의 점은 $x$좌표가 0입니다. 따라서 $(0, 2, -3)$입니다.',
        },
      },
      {
        title: '수선의 발과 대칭인 점',
        body: '점 P$(a, b, c)$에서 좌표평면과 좌표축에 내린 수선의 발은 다음과 같습니다.\n\n| 수선을 내린 곳 | 수선의 발 |\n|---|---|\n| $xy$평면 | $(a, b, 0)$ |\n| $yz$평면 | $(0, b, c)$ |\n| $zx$평면 | $(a, 0, c)$ |\n| $x$축 | $(a, 0, 0)$ |\n| $y$축 | $(0, b, 0)$ |\n| $z$축 | $(0, 0, c)$ |\n\n점 P와 대칭인 점은 수선의 발 반대쪽으로 같은 거리만큼 간 점입니다.\n\n| 대칭의 기준 | 대칭인 점 | 부호가 바뀌는 좌표 |\n|---|---|---|\n| $xy$평면 | $(a, b, -c)$ | $z$ |\n| $yz$평면 | $(-a, b, c)$ | $x$ |\n| $zx$평면 | $(a, -b, c)$ | $y$ |\n| $x$축 | $(a, -b, -c)$ | $y$, $z$ |\n| $y$축 | $(-a, b, -c)$ | $z$, $x$ |\n| $z$축 | $(-a, -b, c)$ | $x$, $y$ |\n| 원점 | $(-a, -b, -c)$ | 모두 |\n\n> 💡 평면에 대한 대칭은 그 평면 이름에 **없는** 좌표의 부호를, 축에 대한 대칭은 그 축이 **아닌** 두 좌표의 부호를 바꿉니다.',
        easy: '거울을 바닥($xy$평면)에 깔았다고 생각해 봅시다. 바닥 위 2칸 높이에 있는 점의 거울 속 모습은 바닥 아래 2칸에 있습니다. 앞뒤·좌우 위치는 그대로이고 높이만 반대가 됩니다. 그래서 $xy$평면에 대한 대칭은 $z$좌표의 부호만 바뀝니다.\n\n$x$축에 대한 대칭은 $x$축을 꼬챙이처럼 꿰어 반 바퀴 돌린 모습입니다. $x$좌표는 그대로이고 나머지 둘의 부호가 바뀝니다.',
        fig: axesFig({ p: [2, 3, 2], marks: [{ p: [2, 3, 0], label: 'Q', off: [10, 6] }, { p: [0, 3, 2], label: 'R', off: [10, -6] }] }, '점 P(2, 3, 2)와, P에서 xy평면에 내린 수선의 발 Q(2, 3, 0), yz평면에 내린 수선의 발 R(0, 3, 2)'),
        check: {
          type: 'choice',
          q: '점 P$(2, -1, 3)$을 $xy$평면에 대하여 대칭이동한 점의 좌표는 무엇입니까?',
          choices: ['$(2, -1, -3)$', '$(-2, 1, 3)$', '$(2, -1, 0)$'],
          answer: 0,
          why: ['', '$z$축에 대하여 대칭이동한 점입니다. $xy$평면에 대한 대칭은 $z$좌표의 부호만 바꿉니다.', '$xy$평면에 내린 수선의 발입니다. 대칭인 점은 수선의 발 반대쪽으로 같은 거리만큼 간 점입니다.'],
          explain: '$xy$평면에 대하여 대칭이동하면 $z$좌표의 부호만 바뀝니다. 따라서 $(2, -1, -3)$입니다.',
        },
      },
      {
        title: '두 점 사이의 거리',
        body: '좌표공간의 두 점 A$(x_1, y_1, z_1)$, B$(x_2, y_2, z_2)$ 사이의 거리는\n\n$\\overline{AB}=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$\n\n특히 원점 O와 점 P$(a, b, c)$ 사이의 거리는 $\\overline{OP}=\\sqrt{a^2+b^2+c^2}$입니다.\n\n**이유** 원점 O와 점 P$(a, b, c)$를 대각선의 양 끝으로 하는 직육면체를 생각합니다. P에서 $xy$평면에 내린 수선의 발 Q$(a, b, 0)$에 대하여 $\\overline{OQ}^2=a^2+b^2$(평면에서의 거리)이고, 삼각형 OQP는 $\\angle OQP=90^\\circ$인 직각삼각형이므로 $\\overline{OP}^2=\\overline{OQ}^2+\\overline{QP}^2=a^2+b^2+c^2$입니다. 두 점 A, B 사이의 거리도 같은 방법으로 얻습니다.\n\n예: A$(1, 2, 3)$, B$(3, 4, 4)$이면 $\\overline{AB}=\\sqrt{2^2+2^2+1^2}=3$입니다.',
        easy: '방의 한쪽 아래 구석에서 맞은편 위 구석까지의 거리를 재는 상황입니다. 먼저 바닥에서 대각선 길이를 피타고라스 정리로 구하고, 그 대각선과 높이로 한 번 더 피타고라스 정리를 쓰면 됩니다.\n\n그래서 공간의 거리는 "세 방향의 차이를 각각 제곱해서 더하고 제곱근"입니다.',
        fig: axesFig({ p: [2, 3, 2], marks: [{ p: [2, 3, 0], label: 'Q', off: [10, 6] }], hl: [[[0, 0, 0], [2, 3, 2]], [[0, 0, 0], [2, 3, 0]]] }, '원점 O와 점 P(2, 3, 2)를 잇는 선분 OP와, P에서 xy평면에 내린 수선의 발 Q까지의 선분 OQ'),
        check: {
          type: 'short', check: 'number',
          q: '두 점 A$(1, -2, 4)$, B$(3, 0, 5)$ 사이의 거리를 구하십시오.',
          answer: '3',
          wrong: [{ a: '5', why: '좌표의 차 2, 2, 1을 제곱하지 않고 더했습니다. $\\sqrt{2^2+2^2+1^2}$을 계산합니다.' }, { a: '9', why: '제곱근을 구하지 않았습니다. $\\sqrt{9}=3$입니다.' }],
          explain: '$\\overline{AB}=\\sqrt{(3-1)^2+(0-(-2))^2+(5-4)^2}=\\sqrt{4+4+1}=3$',
        },
      },
      {
        title: '선분의 내분점과 중점',
        body: '두 점 A$(x_1, y_1, z_1)$, B$(x_2, y_2, z_2)$에 대하여 선분 AB를 $m:n$ ($m>0$, $n>0$)으로 내분하는 점의 좌표는\n\n$\\left(\\dfrac{mx_2+nx_1}{m+n}, \\dfrac{my_2+ny_1}{m+n}, \\dfrac{mz_2+nz_1}{m+n}\\right)$\n\n특히 선분 AB의 **중점**의 좌표는 $\\left(\\dfrac{x_1+x_2}{2}, \\dfrac{y_1+y_2}{2}, \\dfrac{z_1+z_2}{2}\\right)$입니다.\n\n**이유** 세 점 A, B, P를 $xy$평면 위로 정사영해도 선분의 길이의 비는 그대로이므로, 정사영한 점의 $x$, $y$좌표는 평면에서의 내분점 공식으로 구할 수 있습니다. $z$좌표도 같은 방법($yz$평면이나 $zx$평면으로 정사영)으로 얻습니다.\n\n예: A$(1, -2, 3)$, B$(4, 1, 0)$에 대하여 선분 AB를 $2:1$로 내분하는 점은\n\n$\\left(\\dfrac{2 \\cdot 4+1 \\cdot 1}{3}, \\dfrac{2 \\cdot 1+1 \\cdot (-2)}{3}, \\dfrac{2 \\cdot 0+1 \\cdot 3}{3}\\right)=(3, 0, 1)$\n\n> ⚠️ $m:n$으로 내분할 때 $m$은 B의 좌표에, $n$은 A의 좌표에 곱합니다. $\\overline{AP}:\\overline{PB}=m:n$이므로 $m$이 클수록 점 P가 B 쪽으로 가까워지기 때문입니다.',
        easy: 'A에서 B까지 가는 길을 3칸으로 똑같이 나누었다고 생각해 봅시다. $2:1$로 내분하는 점은 A에서 출발해 2칸 간 곳입니다.\n\n$x$좌표가 1에서 4로 3만큼 늘어나니 한 칸은 1, 두 칸 가면 $1+2=3$입니다. $y$, $z$좌표도 같은 방법으로 구하면 공식 없이도 답을 확인할 수 있습니다.',
        check: {
          type: 'choice',
          q: '두 점 A$(2, 0, -1)$, B$(4, 6, 3)$에 대하여 선분 AB의 중점의 좌표는 무엇입니까?',
          choices: ['$(3, 3, 1)$', '$(6, 6, 2)$', '$(1, 3, 2)$'],
          answer: 0,
          why: ['', '두 점의 좌표를 더하기만 하고 2로 나누지 않았습니다.', '좌표의 차를 2로 나누었습니다. 중점은 좌표의 합을 2로 나눕니다.'],
          explain: '$\\left(\\dfrac{2+4}{2}, \\dfrac{0+6}{2}, \\dfrac{-1+3}{2}\\right)=(3, 3, 1)$',
        },
      },
      {
        title: '삼각형의 무게중심',
        body: '세 점 A$(x_1, y_1, z_1)$, B$(x_2, y_2, z_2)$, C$(x_3, y_3, z_3)$을 꼭짓점으로 하는 삼각형 ABC의 무게중심 G의 좌표는\n\n$\\left(\\dfrac{x_1+x_2+x_3}{3}, \\dfrac{y_1+y_2+y_3}{3}, \\dfrac{z_1+z_2+z_3}{3}\\right)$\n\n**이유** 무게중심은 중선을 꼭짓점에서부터 $2:1$로 내분하는 점입니다. 선분 BC의 중점 M$\\left(\\dfrac{x_2+x_3}{2}, \\cdots\\right)$에 대하여 선분 AM을 $2:1$로 내분하면 $x$좌표는\n\n$\\dfrac{2 \\cdot \\frac{x_2+x_3}{2}+1 \\cdot x_1}{3}=\\dfrac{x_1+x_2+x_3}{3}$\n\n이고, $y$, $z$좌표도 같습니다.\n\n예: A$(1, 0, 2)$, B$(3, 4, -1)$, C$(2, -1, 5)$이면 무게중심은 $\\left(\\dfrac{6}{3}, \\dfrac{3}{3}, \\dfrac{6}{3}\\right)=(2, 1, 2)$입니다.',
        easy: '무게중심은 세 꼭짓점의 "평균 위치"입니다. 세 사람의 키의 평균을 구할 때 모두 더해 3으로 나누듯이, 세 점의 $x$좌표, $y$좌표, $z$좌표를 각각 더해 3으로 나누면 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '세 점 A$(4, 1, 0)$, B$(-2, 3, 5)$, C$(1, -1, 4)$를 꼭짓점으로 하는 삼각형 ABC의 무게중심의 $z$좌표를 구하십시오.',
          answer: '3',
          wrong: [{ a: '9', why: '세 $z$좌표를 더하기만 하고 3으로 나누지 않았습니다.' }, { a: '9/2', why: '2로 나누었습니다. 꼭짓점이 세 개이므로 3으로 나눕니다.' }],
          explain: '무게중심의 $z$좌표는 $\\dfrac{0+5+4}{3}=3$입니다.',
        },
      },
      {
        title: '구의 방정식',
        body: '공간에서 한 점 C로부터 일정한 거리 $r$에 있는 점 전체의 도형을 **구**라 하고, C를 구의 중심, $r$을 반지름이라고 합니다.\n\n중심이 C$(a, b, c)$이고 반지름이 $r$인 구 위의 점 P$(x, y, z)$는 $\\overline{CP}=r$을 만족하므로, 구의 방정식은\n\n$(x-a)^2+(y-b)^2+(z-c)^2=r^2$\n\n특히 중심이 원점이면 $x^2+y^2+z^2=r^2$입니다.\n\n**전개한 꼴** 위 식을 전개하면 $x^2+y^2+z^2+Ax+By+Cz+D=0$ 꼴이 됩니다. 거꾸로 이런 식이 주어지면 $x$, $y$, $z$에 대하여 각각 완전제곱식으로 묶어 중심과 반지름을 찾습니다.\n\n예: $x^2+y^2+z^2-2x+4y-6z+5=0$\n\n$(x-1)^2+(y+2)^2+(z-3)^2=1+4+9-5=9$\n\n이므로 중심은 $(1, -2, 3)$, 반지름은 3입니다.\n\n> ⚠️ 완전제곱식으로 묶은 뒤 우변이 양수일 때만 구를 나타냅니다. 우변이 0이면 한 점, 음수이면 아무 도형도 나타내지 않습니다.',
        easy: '원은 "한 점에서 같은 거리에 있는 평면 위의 점들"이고, 구는 그것을 공간으로 넓힌 것입니다. 공 모양입니다.\n\n그래서 구의 방정식은 "중심까지의 거리 = 반지름"을 두 점 사이의 거리 공식으로 쓴 것뿐입니다. 거리 공식의 제곱근을 없애려고 양변을 제곱한 꼴입니다.',
        check: {
          type: 'short', check: 'number',
          q: '구 $x^2+y^2+z^2-4x+2z-4=0$의 반지름의 길이를 구하십시오.',
          answer: '3',
          wrong: [{ a: '9', why: '반지름의 제곱을 답했습니다. 우변 9의 양의 제곱근이 반지름입니다.' }],
          explain: '$(x-2)^2+y^2+(z+1)^2=4+1+4=9$이므로 중심은 $(2, 0, -1)$, 반지름은 3입니다.',
        },
      },
    ],

    examples: [
      {
        q: '두 점 A$(1, 2, -1)$, B$(3, -2, 3)$에서 같은 거리에 있는 $x$축 위의 점 P의 좌표를 구하십시오.',
        steps: [
          '$x$축 위의 점이므로 P$(p, 0, 0)$으로 놓습니다.',
          '$\\overline{AP}^2=(p-1)^2+(-2)^2+1^2=p^2-2p+6$, $\\overline{BP}^2=(p-3)^2+2^2+(-3)^2=p^2-6p+22$',
          '$\\overline{AP}=\\overline{BP}$이므로 $p^2-2p+6=p^2-6p+22$, 곧 $4p=16$에서 $p=4$입니다.',
          '확인: $\\overline{AP}^2=9+4+1=14$, $\\overline{BP}^2=1+4+9=14$',
        ],
        answer: 'P$(4, 0, 0)$',
      },
      {
        q: '구 $x^2+y^2+z^2+6x-8z+16=0$의 중심의 좌표와 반지름의 길이를 구하고, 이 구가 어느 좌표평면에 접하는지 알아보십시오.',
        steps: [
          '$x$, $z$에 대하여 각각 완전제곱식으로 묶습니다. $(x^2+6x+9)+y^2+(z^2-8z+16)=-16+9+16$',
          '$(x+3)^2+y^2+(z-4)^2=9$이므로 중심은 $(-3, 0, 4)$, 반지름은 3입니다.',
          '중심에서 $yz$평면까지의 거리는 $|x$좌표$|=3$으로 반지름과 같으므로, 이 구는 $yz$평면에 접합니다.',
          '중심에서 $xy$평면까지의 거리는 4로 반지름보다 크므로 $xy$평면과는 만나지 않고, 중심이 $zx$평면 위에 있으므로 $zx$평면과는 반지름 3인 원에서 만납니다.',
        ],
        answer: '중심 $(-3, 0, 4)$, 반지름 3, $yz$평면에 접한다',
      },
    ],

    terms: [
      { term: '좌표공간', def: '원점에서 서로 수직인 세 좌표축($x$축, $y$축, $z$축)을 정하여, 모든 점을 세 실수의 순서쌍 $(x, y, z)$로 나타낸 공간입니다.' },
      { term: '좌표평면', def: '두 좌표축으로 정해지는 평면입니다. $xy$평면, $yz$평면, $zx$평면이 있습니다.' },
      { term: '두 점 사이의 거리', def: 'A$(x_1, y_1, z_1)$, B$(x_2, y_2, z_2)$ 사이의 거리는 $\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$입니다.' },
      { term: '내분점', def: '선분 AB 위의 점 P가 $\\overline{AP}:\\overline{PB}=m:n$일 때 P를 선분 AB를 $m:n$으로 내분하는 점이라고 합니다.' },
      { term: '무게중심', def: '삼각형의 세 중선이 만나는 점입니다. 좌표공간에서는 세 꼭짓점의 좌표를 각각 더해 3으로 나눈 점입니다.' },
      { term: '구', def: '공간에서 한 점(중심)으로부터 일정한 거리(반지름)에 있는 점 전체의 도형입니다. 방정식은 $(x-a)^2+(y-b)^2+(z-c)^2=r^2$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 $z$축 위에 있는 점은 무엇입니까?',
        choices: ['$(0, 0, 5)$', '$(5, 0, 0)$', '$(0, 5, 5)$', '$(5, 5, 0)$'],
        answer: 0,
        why: ['', '$x$축 위의 점입니다.', '$x$좌표가 0이므로 $yz$평면 위의 점이지만, $z$축 위에 있지는 않습니다.', '$z$좌표가 0이므로 $xy$평면 위의 점입니다.'],
        explain: '$z$축 위의 점은 $x$좌표와 $y$좌표가 모두 0인 $(0, 0, c)$ 꼴입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '점 P$(4, -2, 5)$를 $x$축에 대하여 대칭이동한 점의 좌표는 무엇입니까?',
        choices: ['$(4, 2, -5)$', '$(-4, -2, 5)$', '$(-4, 2, -5)$', '$(4, -2, -5)$'],
        answer: 0,
        why: ['', '$z$축에 대하여 대칭이동한 점입니다.', '원점에 대하여 대칭이동한 점입니다.', '$xy$평면에 대하여 대칭이동한 점입니다. $x$축에 대한 대칭은 $y$, $z$좌표의 부호를 모두 바꿉니다.'],
        explain: '$x$축에 대하여 대칭이동하면 $x$좌표는 그대로이고 $y$, $z$좌표의 부호가 바뀝니다. 따라서 $(4, 2, -5)$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 2,
        q: '두 점 A$(-1, 3, 2)$, B$(1, 6, 8)$ 사이의 거리를 구하십시오.',
        answer: '7',
        wrong: [{ a: '11', why: '좌표의 차 2, 3, 6을 제곱하지 않고 더했습니다.' }, { a: '49', why: '제곱근을 구하지 않았습니다.' }],
        explain: '$\\overline{AB}=\\sqrt{(1-(-1))^2+(6-3)^2+(8-2)^2}=\\sqrt{4+9+36}=\\sqrt{49}=7$',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', concept: 2,
        q: '원점 O와 점 P$(4, -4, 7)$ 사이의 거리를 구하십시오.',
        answer: '9',
        wrong: [{ a: '7', why: '$(-4)^2$을 $-16$으로 계산했습니다. $(-4)^2=16$이므로 $\\sqrt{16+16+49}=\\sqrt{81}$입니다.' }, { a: '81', why: '제곱근을 구하지 않았습니다.' }],
        explain: '$\\overline{OP}=\\sqrt{4^2+(-4)^2+7^2}=\\sqrt{81}=9$',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '두 점 A$(1, 4, -3)$, B$(5, -2, 1)$에 대하여 선분 AB의 중점의 좌표는 무엇입니까?',
        choices: ['$(3, 1, -1)$', '$(6, 2, -2)$', '$(2, -3, 2)$', '$(3, -1, 1)$'],
        answer: 0,
        why: ['', '좌표를 더하기만 하고 2로 나누지 않았습니다.', '좌표의 차를 2로 나누었습니다. 중점은 좌표의 합을 2로 나눕니다.', '$y$, $z$좌표의 부호를 잘못 계산했습니다. $\\frac{4+(-2)}{2}=1$, $\\frac{-3+1}{2}=-1$입니다.'],
        explain: '$\\left(\\dfrac{1+5}{2}, \\dfrac{4+(-2)}{2}, \\dfrac{-3+1}{2}\\right)=(3, 1, -1)$',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 5,
        q: '구 $(x+2)^2+(y-3)^2+(z-1)^2=5$의 중심의 좌표는 무엇입니까?',
        choices: ['$(-2, 3, 1)$', '$(2, -3, -1)$', '$(-2, 3, 5)$', '$(2, 3, 1)$'],
        answer: 0,
        why: ['', '부호를 반대로 읽었습니다. $(x+2)^2=(x-(-2))^2$이므로 중심의 $x$좌표는 $-2$입니다.', '우변 5는 반지름의 제곱입니다. 중심의 좌표가 아닙니다.', '$(x+2)^2$에서 중심의 $x$좌표를 2로 읽었습니다. $x-a$ 꼴로 바꾸면 $a=-2$입니다.'],
        explain: '$(x-a)^2+(y-b)^2+(z-c)^2=r^2$ 꼴과 비교하면 $a=-2$, $b=3$, $c=1$입니다. 중심은 $(-2, 3, 1)$, 반지름은 $\\sqrt{5}$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 2,
        q: '점 P$(3, 4, 12)$와 $z$축 사이의 거리를 구하십시오.',
        answer: '5',
        hint: '점 P에서 $z$축에 내린 수선의 발의 좌표를 먼저 구하십시오.',
        wrong: [{ a: '13', why: '원점까지의 거리를 구했습니다. $z$축까지의 거리는 수선의 발 $(0, 0, 12)$까지의 거리입니다.' }, { a: '12', why: '$z$좌표를 답했습니다. 이것은 점 P와 $xy$평면 사이의 거리입니다.' }],
        explain: '점 P에서 $z$축에 내린 수선의 발은 $(0, 0, 12)$입니다. 따라서 거리는 $\\sqrt{3^2+4^2+0^2}=5$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '두 점 A$(-2, 1, 5)$, B$(4, 7, -1)$을 잇는 선분 AB가 $yz$평면과 만나는 점은 선분 AB를 어떤 비로 내분합니까?',
        choices: ['$1:2$', '$2:1$', '$1:3$', '$2:3$'],
        answer: 0,
        why: ['', 'A와 B의 역할을 바꾸었습니다. $m:n$으로 내분하는 점의 $x$좌표는 $\\dfrac{4m-2n}{m+n}$입니다.', '$x$좌표가 0이 되는 조건을 다시 계산해 보십시오. $4m-2n=0$입니다.', '$x$좌표가 0이 되는 조건을 다시 계산해 보십시오. $4m-2n=0$입니다.'],
        hint: '$yz$평면 위의 점은 $x$좌표가 0입니다.',
        explain: '선분 AB를 $m:n$으로 내분하는 점의 $x$좌표는 $\\dfrac{4m+(-2)n}{m+n}$입니다. 이 점이 $yz$평면 위에 있으려면 $4m-2n=0$, 곧 $n=2m$이므로 $m:n=1:2$입니다. (확인: 내분점은 $(0, 3, 3)$입니다.)',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '세 점 A$(a, 1, 2)$, B$(3, b, -1)$, C$(0, 4, c)$를 꼭짓점으로 하는 삼각형 ABC의 무게중심이 G$(2, 3, 1)$일 때, $a+b+c$의 값을 구하십시오.',
        answer: '9',
        hint: '무게중심의 각 좌표를 식으로 세워 보십시오.',
        wrong: [{ a: '6', why: '무게중심의 좌표를 그대로 더했습니다. $a$, $b$, $c$를 각각 구해 더합니다.' }],
        explain: '$\\dfrac{a+3+0}{3}=2$에서 $a=3$, $\\dfrac{1+b+4}{3}=3$에서 $b=4$, $\\dfrac{2+(-1)+c}{3}=1$에서 $c=2$입니다. 따라서 $a+b+c=9$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 5,
        q: '방정식 $x^2+y^2+z^2-4x+6y-2z+k=0$이 반지름의 길이가 3인 구를 나타낼 때, 상수 $k$의 값을 구하십시오.',
        answer: '5',
        hint: '완전제곱식으로 묶어 우변을 $k$로 나타내 보십시오.',
        wrong: [{ a: '-5', why: '상수항을 옮길 때 부호를 잘못 처리했습니다. 우변은 $14-k$입니다.' }, { a: '11', why: '우변을 반지름 3과 같게 놓았습니다. 우변은 반지름의 제곱 9와 같아야 합니다.' }],
        explain: '$(x-2)^2+(y+3)^2+(z-1)^2=4+9+1-k=14-k$이고, 이 값이 $3^2=9$와 같아야 하므로 $k=5$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'ox', concept: 5,
        q: '방정식 $x^2+y^2+z^2-2x+4z+10=0$은 구를 나타냅니다.',
        answer: false,
        explain: '완전제곱식으로 묶으면 $(x-1)^2+y^2+(z+2)^2=1+4-10=-5$입니다. 우변이 음수이므로 이 방정식을 만족하는 점은 없고, 구를 나타내지 않습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'set', concept: 5,
        q: '세 좌표평면에 모두 접하고 점 $(2, 1, 1)$을 지나는 구의 반지름의 길이를 모두 구하십시오.',
        answer: '1, 3',
        hint: '점 $(2, 1, 1)$의 좌표가 모두 양수이므로 구의 중심은 $(r, r, r)$ 꼴입니다.',
        wrong: [{ a: '3', why: '반지름 1을 빠뜨렸습니다. 이차방정식 $r^2-4r+3=0$의 두 근 1, 3이 모두 조건을 만족하므로 둘 다 답합니다.' }, { a: '1', why: '반지름 3을 빠뜨렸습니다. 이차방정식 $r^2-4r+3=0$의 두 근 1, 3이 모두 조건을 만족하므로 둘 다 답합니다.' }],
        explain: '구가 세 좌표평면에 모두 접하고 좌표가 모두 양수인 점을 지나므로 중심은 $(r, r, r)$이고 반지름은 $r$입니다.\n\n$(2-r)^2+(1-r)^2+(1-r)^2=r^2$을 정리하면 $2r^2-8r+6=0$, 곧 $r^2-4r+3=0$이므로 $r=1$ 또는 $r=3$입니다.\n\n(확인: 중심 $(1, 1, 1)$에서 점 $(2, 1, 1)$까지 거리 1, 중심 $(3, 3, 3)$에서 거리 $\\sqrt{1+4+4}=3$)',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'expr', concept: 1,
        q: '두 점 A$(1, 2, 3)$, B$(3, 4, 1)$과 $xy$평면 위를 움직이는 점 P에 대하여 $\\overline{AP}+\\overline{PB}$의 최솟값을 구하십시오.',
        answer: '2√6',
        hint: '두 점이 $xy$평면의 같은 쪽에 있습니다. 한 점을 $xy$평면에 대하여 대칭이동해 보십시오.',
        wrong: [{ a: '2√3', why: '선분 AB의 길이를 답했습니다. P는 $xy$평면 위에 있어야 하므로, 한 점을 대칭이동한 뒤 거리를 구합니다.' }],
        explain: '점 B를 $xy$평면에 대하여 대칭이동한 점을 B$^{\\prime}(3, 4, -1)$이라 하면 $xy$평면 위의 점 P에 대하여 $\\overline{PB}=\\overline{PB^{\\prime}}$입니다.\n\n따라서 $\\overline{AP}+\\overline{PB}=\\overline{AP}+\\overline{PB^{\\prime}} \\ge \\overline{AB^{\\prime}}$이고, P가 선분 AB$^{\\prime}$ 위에 있을 때 등호가 성립합니다.\n\n$\\overline{AB^{\\prime}}=\\sqrt{2^2+2^2+(-4)^2}=\\sqrt{24}=2\\sqrt{6}$',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'expr', concept: 4,
        q: '세 점 A$(2, 0, 0)$, B$(0, 4, 0)$, C$(0, 0, 6)$을 꼭짓점으로 하는 삼각형 ABC의 무게중심을 G라 할 때, 선분 OG의 길이를 구하십시오. (단, O는 원점)',
        answer: '2√14/3',
        hint: '무게중심의 좌표를 먼저 구하십시오.',
        wrong: [{ a: '2√14', why: '무게중심이 아니라 세 점의 좌표를 더한 점 $(2, 4, 6)$까지의 거리를 구했습니다. 3으로 나누어야 합니다.' }],
        explain: '무게중심은 G$\\left(\\frac{2}{3}, \\frac{4}{3}, 2\\right)$입니다.\n\n$\\overline{OG}=\\sqrt{\\frac{4}{9}+\\frac{16}{9}+\\frac{36}{9}}=\\sqrt{\\frac{56}{9}}=\\frac{2\\sqrt{14}}{3}$',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'expr', concept: 5,
        q: '구 $(x-1)^2+(y-2)^2+(z+2)^2=r^2$이 $y$축과 만나도록 하는 양수 $r$의 최솟값을 구하십시오.',
        answer: '√5',
        hint: '구의 중심과 $y$축 사이의 거리를 구해 보십시오.',
        wrong: [{ a: '3', why: '중심과 원점 사이의 거리를 구했습니다. $y$축까지의 거리는 $y$축에 내린 수선의 발 $(0, 2, 0)$까지의 거리입니다.' }, { a: '2', why: '중심의 $y$좌표를 답했습니다. 중심에서 $y$축에 내린 수선의 발까지의 거리를 구합니다.' }],
        explain: '구의 중심 $(1, 2, -2)$에서 $y$축에 내린 수선의 발은 $(0, 2, 0)$이므로 중심과 $y$축 사이의 거리는 $\\sqrt{1^2+0^2+(-2)^2}=\\sqrt{5}$입니다. 구가 $y$축과 만나려면 반지름이 이 거리 이상이어야 하므로 $r$의 최솟값은 $\\sqrt{5}$입니다.',
      },
    ],

    deeper: [
      {
        title: '세 수로 위치를 나타내는 곳',
        body: '3차원 프린터는 노즐이 갈 자리를 $(x, y, z)$ 좌표로 받아 한 층씩 쌓아 올립니다. 컴퓨터 화면 속 입체 그림도 물체의 꼭짓점들을 공간좌표로 저장해 두고, 두 점 사이의 거리 공식으로 길이를 계산합니다.\n\n좌표를 쓰면 "눈으로 보이는 공간 도형"을 "수의 계산"으로 바꿀 수 있습니다. 앞 단원에서 그림과 삼수선 정리로 풀던 문제 가운데 많은 것을 좌표로도 풀 수 있습니다.',
      },
      {
        title: '다음 단원과의 연결',
        body: '다음 단원부터는 **벡터**를 배웁니다. 좌표공간의 점 A$(a_1, a_2, a_3)$, B$(b_1, b_2, b_3)$에 대하여 A에서 B로 가는 "이동"을 $(b_1-a_1, b_2-a_2, b_3-a_3)$처럼 세 수로 나타내면, 두 점 사이의 거리는 이 이동의 크기가 됩니다.\n\n또 구의 방정식은 "중심에서의 거리가 일정하다"는 조건을 벡터로 다시 쓰게 되고, 평면의 방정식도 배우게 됩니다.',
      },
    ],

    faq: [
      {
        q: '$xy$평면에 대하여 대칭이면 어느 좌표의 부호가 바뀌어요?',
        a: '$xy$평면 이름에 없는 $z$좌표의 부호만 바뀝니다. 평면에 대한 대칭은 그 평면에서 "수직으로 반대편"으로 가는 것이라, 평면에 수직인 방향의 좌표만 바뀌기 때문입니다. 반대로 $x$축에 대한 대칭은 $x$좌표만 그대로이고 나머지 두 좌표의 부호가 바뀝니다.',
      },
      {
        q: '어떤 방정식이 구를 나타내는지 어떻게 알아요?',
        a: '$x^2$, $y^2$, $z^2$의 계수가 모두 같고 $xy$ 같은 항이 없으면, 완전제곱식으로 묶어 $(x-a)^2+(y-b)^2+(z-c)^2=k$ 꼴로 만듭니다. 이때 $k>0$이면 반지름 $\\sqrt{k}$인 구, $k=0$이면 한 점, $k<0$이면 아무 도형도 아닙니다.',
      },
      {
        q: '점과 좌표축 사이의 거리는 어떻게 구해요?',
        a: '점에서 그 축에 내린 수선의 발까지의 거리를 구합니다. 예를 들어 P$(a, b, c)$와 $x$축 사이의 거리는 수선의 발 $(a, 0, 0)$까지의 거리 $\\sqrt{b^2+c^2}$입니다. 원점까지의 거리와 헷갈리지 않도록 주의합니다.',
      },
    ],

    mistakes: [
      '$x$축에 대한 대칭에서 $x$좌표의 부호를 바꾸는 실수 — 축에 대한 대칭은 그 축의 좌표는 그대로 두고 나머지 두 좌표의 부호를 바꿉니다.',
      '선분 AB를 $m:n$으로 내분할 때 $m$을 A의 좌표에 곱하는 실수 — $\\dfrac{mx_2+nx_1}{m+n}$처럼 $m$은 B의 좌표에 곱합니다.',
      '구의 방정식에서 $(x+3)^2$을 보고 중심의 $x$좌표를 3이라고 하는 실수 — $(x-(-3))^2$이므로 $-3$입니다.',
    ],

    gens: [
      {
        id: 'coord-basic',
        level: 1,
        title: '수선의 발·대칭인 점과 거리',
        make: function (R) {
          return R.bool(0.4) ? footSym(R) : distance(R);
        },
      },
      {
        id: 'section',
        level: 2,
        title: '선분의 내분점과 삼각형의 무게중심',
        make: function (R) {
          var F = R.F;
          function addF(p, q) { return [0, 1, 2].map(function (i) { return F(p[i]).add(q[i]); }); }
          if (R.bool(0.6)) {
            var mn = R.pick([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 4], [3, 4]]);
            var m = mn[0], n = mn[1], k = m + n, A, d, P;
            do {
              A = [R.int(-5, 5), R.int(-5, 5), R.int(-5, 5)];
              d = [R.int(-2, 2), R.int(-2, 2), R.int(-2, 2)];
              P = [A[0] + m * d[0], A[1] + m * d[1], A[2] + m * d[2]];
            } while ((d[0] === 0 && d[1] === 0 && d[2] === 0) || (P[0] === 0 && P[1] === 0 && P[2] === 0));
            var B = [A[0] + k * d[0], A[1] + k * d[1], A[2] + k * d[2]];
            var correct = tup(R, P);
            var cands = [
              [tup(R, [A[0] + n * d[0], A[1] + n * d[1], A[2] + n * d[2]]), '$m$과 $n$을 곱하는 좌표를 바꾸었습니다. $m$은 B의 좌표에, $n$은 A의 좌표에 곱합니다.'],
              [tup(R, [0, 1, 2].map(function (i) { return F(A[i] + B[i], 2); })), '중점을 구했습니다. 비가 ' + m + ':' + n + '이므로 중점이 아닙니다.'],
              [tup(R, [0, 1, 2].map(function (i) { return m * B[i] + n * A[i]; })), k + R.josa(k, '으로/로') + ' 나누는 것을 빠뜨렸습니다.'],
              [tup(R, [A[0] - m * d[0], A[1] - m * d[1], A[2] - m * d[2]]), '방향을 반대로 잡았습니다. 이 점은 선분 AB 위에 있지 않습니다.'],
              [tup(R, [A[0] + d[0], A[1] + d[1], A[2] + d[2]]), '선분을 ' + k + '등분한 점 가운데 다른 점입니다. A에서 ' + m + '칸 간 점을 찾아보십시오.'],
              [tup(R, [A[0] + (k - 1) * d[0], A[1] + (k - 1) * d[1], A[2] + (k - 1) * d[2]]), '선분을 ' + k + '등분한 점 가운데 다른 점입니다. A에서 ' + m + '칸 간 점을 찾아보십시오.'],
            ];
            var reason = {};
            cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
            var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
            var co = [0, 1, 2].map(function (i) { return '\\dfrac{' + m + ' \\cdot ' + par(B[i]) + '+' + n + ' \\cdot ' + par(A[i]) + '}{' + k + '}'; }).join(', ');
            return {
              type: 'choice', concept: 3,
              q: '두 점 A$(' + A.join(', ') + ')$, B$(' + B.join(', ') + ')$에 대하여 선분 AB를 $' + m + ':' + n + '$' + R.josa(n, '으로/로') + ' 내분하는 점의 좌표는 무엇입니까?',
              choices: pick.choices,
              answer: pick.answer,
              why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
              explain: '$\\left(' + co + '\\right)$이므로 ' + correct + '입니다.',
            };
          }
          var G, A2, B2, C2;
          do {
            G = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)];
          } while (G[0] === 0 && G[1] === 0 && G[2] === 0);
          A2 = [R.int(-5, 5), R.int(-5, 5), R.int(-5, 5)];
          B2 = [R.int(-5, 5), R.int(-5, 5), R.int(-5, 5)];
          C2 = [0, 1, 2].map(function (i) { return 3 * G[i] - A2[i] - B2[i]; });
          var cor = tup(R, G);
          var cand2 = [
            [tup(R, [0, 1, 2].map(function (i) { return 3 * G[i]; })), '세 좌표를 더하기만 하고 3으로 나누지 않았습니다.'],
            [tup(R, [0, 1, 2].map(function (i) { return F(3 * G[i], 2); })), '3이 아니라 2로 나누었습니다. 꼭짓점이 세 개이므로 3으로 나눕니다.'],
            [tup(R, [0, 1, 2].map(function (i) { return F(A2[i] + B2[i], 2); })), '선분 AB의 중점을 구했습니다. 무게중심은 세 꼭짓점을 모두 써서 구합니다.'],
            [tup(R, [0, 1, 2].map(function (i) { return F(B2[i] + C2[i], 2); })), '선분 BC의 중점을 구했습니다. 무게중심은 세 꼭짓점을 모두 써서 구합니다.'],
            [tup(R, [-G[0], -G[1], -G[2]]), '부호를 다시 확인해 보십시오.'],
          ];
          var rs = {};
          cand2.forEach(function (c) { if (!(c[0] in rs)) rs[c[0]] = c[1]; });
          var pk = R.choices(cor, cand2.map(function (c) { return c[0]; }));
          var sums = [0, 1, 2].map(function (i) { return '\\dfrac{' + A2[i] + '+' + par(B2[i]) + '+' + par(C2[i]) + '}{3}'; }).join(', ');
          return {
            type: 'choice', concept: 4,
            q: '세 점 A$(' + A2.join(', ') + ')$, B$(' + B2.join(', ') + ')$, C$(' + C2.join(', ') + ')$' + R.josa(C2[2], '을/를') + ' 꼭짓점으로 하는 삼각형 ABC의 무게중심의 좌표는 무엇입니까?',
            choices: pk.choices,
            answer: pk.answer,
            why: pk.choices.map(function (c) { return c === cor ? '' : rs[c] || ''; }),
            explain: '$\\left(' + sums + '\\right)$이므로 무게중심은 ' + cor + '입니다.',
          };
        },
      },
      {
        id: 'sphere',
        level: 2,
        title: '전개한 구의 방정식에서 중심과 반지름 찾기',
        make: function (R) {
          var a, b, c;
          do { a = R.int(-5, 5); b = R.int(-5, 5); c = R.int(-5, 5); } while ((a === 0) + (b === 0) + (c === 0) > 1);
          var r = R.int(1, 7), S = a * a + b * b + c * c, D = S - r * r;
          var eq = 'x^2+y^2+z^2' + lin(-2 * a, 'x') + lin(-2 * b, 'y') + lin(-2 * c, 'z') + cst(D) + '=0';
          var std = sq('x', a) + '+' + sq('y', b) + '+' + sq('z', c) + '=' + (D === 0 ? '' : S + cst(-D) + '=') + r * r;
          var center = tup(R, [a, b, c]);
          var expl = '각 문자에 대하여 완전제곱식으로 묶으면\n\n$' + std + '$\n\n이므로 중심은 ' + center + ', 반지름은 ' + r + '입니다.';
          if (R.bool()) {
            return {
              type: 'short', check: 'number', concept: 5,
              q: '구 $' + eq + '$의 반지름의 길이를 구하십시오.',
              answer: String(r),
              wrong: r === 1 ? [] : [{ a: String(r * r), why: '반지름의 제곱을 답했습니다. 우변의 양의 제곱근이 반지름입니다.' }],
              explain: expl,
            };
          }
          var cands = [
            [tup(R, [-a, -b, -c]), '부호를 반대로 읽었습니다. $x^2-2ax$를 묶으면 $(x-a)^2$이 됩니다.'],
            [tup(R, [-2 * a, -2 * b, -2 * c]), '일차항의 계수를 그대로 좌표로 썼습니다. 계수의 절반의 부호를 바꾼 값이 중심의 좌표입니다.'],
            [tup(R, [2 * a, 2 * b, 2 * c]), '일차항의 계수를 2로 나누는 것을 빠뜨렸습니다.'],
            [tup(R, [a, b, -c]), '$z$좌표의 부호를 다시 확인해 보십시오.'],
            [tup(R, [-a, b, c]), '$x$좌표의 부호를 다시 확인해 보십시오.'],
          ];
          var reason = {};
          cands.forEach(function (x) { if (!(x[0] in reason)) reason[x[0]] = x[1]; });
          var pick = R.choices(center, cands.map(function (x) { return x[0]; }));
          return {
            type: 'choice', concept: 5,
            q: '구 $' + eq + '$의 중심의 좌표는 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (x) { return x === center ? '' : reason[x] || ''; }),
            explain: expl,
          };
        },
      },
      {
        id: 'sphere-plane',
        level: 3,
        title: '좌표평면에 접하는 구와 좌표평면이 만나서 생기는 원',
        make: function (R) {
          var PL = [
            { name: '$yz$평면', idx: 0 },
            { name: '$zx$평면', idx: 1 },
            { name: '$xy$평면', idx: 2 },
          ];
          var two = R.sample([0, 1, 2], 2), T = PL[two[0]], K = PL[two[1]];
          var r = R.int(3, 8), d = R.int(1, r - 1);
          var C = [R.nonzero(-6, 6), R.nonzero(-6, 6), R.nonzero(-6, 6)];
          C[T.idx] = R.bool() ? r : -r;
          C[K.idx] = R.bool() ? d : -d;
          var k = r * r - d * d;
          var axis = ['x', 'y', 'z'];
          return {
            type: 'short', check: 'number', concept: 5,
            q: '중심이 C$(' + C.join(', ') + ')$이고 ' + T.name + '에 접하는 구가 ' + K.name + '과 만나서 생기는 원의 넓이가 $k\\pi$일 때, 상수 $k$의 값을 구하십시오.',
            answer: String(k),
            hint: '구가 좌표평면에 접하면 반지름은 중심과 그 평면 사이의 거리와 같습니다.',
            wrong: [
              { a: String(r * r), why: '구의 반지름으로 원의 넓이를 구했습니다. 잘린 원의 반지름은 구의 반지름보다 작습니다.' },
              { a: String(r * r + d * d), why: '피타고라스 정리에서 빼야 할 것을 더했습니다. 원의 반지름의 제곱은 (구의 반지름)$^2-$(중심과 평면 사이의 거리)$^2$입니다.' },
            ],
            explain: '구가 ' + T.name + '에 접하므로 반지름은 중심과 ' + T.name + ' 사이의 거리, 곧 $|' + axis[T.idx] + '$좌표$|=' + r + '$입니다. 구의 방정식은 $' + sq('x', C[0]) + '+' + sq('y', C[1]) + '+' + sq('z', C[2]) + '=' + r * r + '$입니다.\n\n' +
              '중심과 ' + K.name + ' 사이의 거리는 $|' + axis[K.idx] + '$좌표$|=' + d + '$입니다. 중심에서 ' + K.name + '에 내린 수선의 발이 원의 중심이 되고, 원의 반지름을 $\\rho$라 하면 피타고라스 정리에 의하여 $\\rho^2=' + r + '^2-' + d + '^2=' + k + '$입니다.\n\n' +
              '따라서 원의 넓이는 $' + k + '\\pi$이고 $k=' + k + '$입니다.',
          };
        },
      },
    ],
  });
})();
