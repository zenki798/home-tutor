/* 중3 수학 · 원과 직선
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 원·현·접선은 아래 도우미(cfig)가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
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

  // ---------- 자주 쓰는 그림 ----------
  var CH = chord(-90, 0.6);   // 중심에서 아래로 0.6 떨어진 현
  var FIG_CHORD = cfig({
    pts: { A: CH[0], B: CH[1], M: CH[2] },
    segs: [['A', 'B'], ['O', 'M', { dash: true }], ['O', 'A'], ['O', 'B', { dash: true }]],
    rights: [['M', 'O', 'B']],
    lab: { M: -90 },
  }, '원 O의 현 AB와, 중심 O에서 현 AB에 내린 수선의 발 M');
  var CD2 = chord(40, 0.6);
  var FIG_TWO = cfig({
    pts: { A: CH[0], B: CH[1], M: CH[2], C: CD2[0], D: CD2[1], N: CD2[2] },
    segs: [['A', 'B'], ['C', 'D'], ['O', 'M', { dash: true }], ['O', 'N', { dash: true }]],
    rights: [['M', 'O', 'B'], ['N', 'O', 'D']],
    lab: { M: -90, N: 40 },
  }, '원 O의 중심에서 같은 거리에 있는 두 현 AB와 CD. 중심에서 두 현에 내린 수선의 발은 M, N');
  var FIG_TAN = cfig({
    pts: { T: [0, -1], P: [1.35, -1], Q: [-1.35, -1] },
    segs: [['Q', 'P'], ['O', 'T']],
    rights: [['T', 'O', 'P']],
    hide: ['Q'], lab: { T: -90, P: -90, Q: -90 },
  }, '원 O에 접하는 직선 PQ와 접점 T, 반지름 OT');
  var FIG_TWO_TAN = cfig({
    S: 60,
    pts: { A: on(60), B: on(-60), P: [2, 0] },
    segs: [['P', 'A'], ['P', 'B'], ['O', 'A'], ['O', 'B'], ['O', 'P', { dash: true }]],
    rights: [['A', 'O', 'P'], ['B', 'O', 'P']],
    lab: { P: 0, O: 180 },
  }, '원 밖의 점 P에서 원 O에 그은 두 접선 PA, PB와 접점 A, B');
  var TRI = { A: tp(20, 150), B: tp(150, 270), C: tp(-90, 20), D: on(150), E: on(270), F: on(20) };
  var FIG_INCIRCLE = cfig({
    S: 45, pts: TRI,
    segs: [['A', 'B'], ['B', 'C'], ['C', 'A']],
    lab: { A: 85, B: 210, C: -35, D: 150, E: -90, F: 20, O: 200 },
  }, '삼각형 ABC의 내접원 O가 변 AB, BC, CA와 각각 점 D, E, F에서 접하는 그림');
  var QUAD = { A: tp(100, 190), B: tp(190, 270), C: tp(270, 360), D: tp(0, 100), P: on(190), Q: on(270), R: on(0), S: on(100) };
  var FIG_QUAD = cfig({
    S: 55, pts: QUAD,
    segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']],
    lab: { A: 145, B: 230, C: -45, D: 50, P: 190, Q: -90, R: 0, S: 100, O: 200 },
  }, '원 O에 외접하는 사각형 ABCD와 네 접점 P, Q, R, S');

  Tutor.registerUnit({
    id: 'math-m3-09',
    course: 'math-m3',
    title: '원과 직선',
    summary: '원의 현에 관한 성질과 접선에 관한 성질을 알고, 이를 이용하여 선분의 길이와 각의 크기를 구해요.',
    goals: [
      '원의 중심에서 현에 내린 수선이 현을 이등분함을 알고, 현의 길이를 구할 수 있어요.',
      '원의 중심에서 같은 거리에 있는 두 현의 길이가 같음을 설명할 수 있어요.',
      '접선이 접점을 지나는 반지름에 수직이고, 원 밖의 한 점에서 그은 두 접선의 길이가 같음을 이용할 수 있어요.',
      '삼각형의 내접원과 원에 외접하는 사각형에서 접선의 길이를 이용해 변의 길이를 구할 수 있어요.',
    ],
    standards: ['[9수03-18]'],

    concepts: [
      {
        title: '원의 중심에서 현에 내린 수선',
        body: '원 위의 두 점을 이은 선분을 **현**이라고 해요. 원 O의 중심에서 현 AB에 내린 수선의 발을 M이라고 하면\n\n$\\overline{AM}=\\overline{BM}$\n\n이에요. 곧 **원의 중심에서 현에 내린 수선은 그 현을 이등분해요.**\n\n**왜 그럴까요?** $\\overline{OA}$와 $\\overline{OB}$는 둘 다 반지름이라 길이가 같아요. $\\triangle OAM$과 $\\triangle OBM$은 빗변의 길이가 같고($\\overline{OA}=\\overline{OB}$) 다른 한 변 $\\overline{OM}$을 함께 가지는 직각삼각형이므로 **RHS 합동**이에요. 그래서 $\\overline{AM}=\\overline{BM}$이에요.\n\n거꾸로, **현의 수직이등분선은 원의 중심을 지나요.**\n\n> 💡 길이를 구할 때는 직각삼각형 $OAM$에서 피타고라스 정리를 써요. $\\overline{OA}^2=\\overline{OM}^2+\\overline{AM}^2$\n> 예: 반지름이 5 cm, $\\overline{OM}=3$ cm이면 $\\overline{AM}=4$ cm이고 $\\overline{AB}=8$ cm예요.',
        easy: '종이에 원을 그려 오린 다음, 현 AB를 긋고 중심 O에서 현에 수직인 선을 따라 반으로 접어 보세요. 점 A와 점 B가 딱 겹쳐요.\n\n원은 중심을 지나는 어떤 직선으로 접어도 꼭 맞게 겹치는 도형이라서, 그 접는 선이 현을 정확히 반으로 나누어요. 그래서 $\\overline{AM}$과 $\\overline{BM}$의 길이가 같아요.',
        fig: FIG_CHORD,
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '반지름이 10 cm인 원 O의 중심에서 현 AB까지의 거리가 6 cm예요. 현 AB의 길이는 몇 cm일까요?',
          answer: '16',
          wrong: [{ a: '8', why: '$\\overline{AM}$의 길이만 구했어요. 수선은 현을 이등분하므로 $\\overline{AB}=2\\overline{AM}$이에요.' }],
          explain: '수선의 발을 M이라 하면 $\\overline{AM}^2=10^2-6^2=64$이므로 $\\overline{AM}=8$ cm예요. 수선은 현을 이등분하므로 $\\overline{AB}=2\\times8=16$ (cm)이에요.',
        },
      },
      {
        title: '중심에서 같은 거리에 있는 두 현',
        body: '한 원에서 **원의 중심으로부터 같은 거리에 있는 두 현의 길이는 같아요.**\n\n원 O의 중심에서 두 현 AB, CD에 내린 수선의 발을 각각 M, N이라 할 때, $\\overline{OM}=\\overline{ON}$이면 $\\overline{AB}=\\overline{CD}$예요.\n\n**왜 그럴까요?** $\\overline{OA}=\\overline{OC}$(반지름), $\\overline{OM}=\\overline{ON}$이므로 직각삼각형 $OAM$과 $OCN$은 RHS 합동이에요. 그래서 $\\overline{AM}=\\overline{CN}$이고, 수선은 현을 이등분하니 $\\overline{AB}=2\\overline{AM}=2\\overline{CN}=\\overline{CD}$예요.\n\n거꾸로, **길이가 같은 두 현은 원의 중심으로부터 같은 거리에 있어요.**\n\n> 💡 중심에 가까운 현일수록 길어요. 중심을 지나는 현인 지름이 가장 긴 현이에요.',
        easy: '자를 원 위에 걸쳐 놓고 원의 중심에서 똑같이 떨어진 자리로 옮겨 가며 현을 그어 보세요. 어느 방향으로 돌려도 원은 똑같이 생겼으니, 중심에서 떨어진 거리가 같으면 현의 길이도 같아요.\n\n원을 돌리면 한 현이 다른 현에 꼭 겹친다고 생각하면 쉬워요.',
        fig: FIG_TWO,
        check: {
          type: 'ox',
          q: '원 O의 중심에서 두 현 AB, CD까지의 거리가 모두 4 cm이고 $\\overline{AB}=10$ cm이면 $\\overline{CD}=10$ cm예요.',
          answer: true,
          explain: '중심으로부터 같은 거리에 있는 두 현의 길이는 같아요. 그래서 $\\overline{CD}=\\overline{AB}=10$ cm예요.',
        },
      },
      {
        title: '원의 접선과 반지름',
        body: '원과 직선이 한 점에서만 만날 때 그 직선을 원의 **접선**, 만나는 점을 **접점**이라고 해요.\n\n**원의 접선은 그 접점을 지나는 반지름에 수직이에요.** 접점을 T라 하면 $\\overline{OT}\\perp l$이에요.\n\n**왜 그럴까요?** 접선 위에서 접점 T가 아닌 점은 모두 원 밖에 있어요. 그래서 접선 위의 점 가운데 중심 O에 가장 가까운 점이 T예요. 한 점에서 직선까지 가장 짧은 선분은 그 직선에 내린 수선이므로 $\\overline{OT}$는 접선에 수직이에요.\n\n> 💡 접선과 반지름이 보이면 직각을 먼저 표시하세요. 직각삼각형이 생기면 피타고라스 정리나 삼각형의 내각의 합으로 길이와 각을 구할 수 있어요.',
        easy: '자전거 바퀴가 평평한 땅 위에 서 있다고 생각해 보세요. 바퀴는 땅에 한 점에서만 닿아요. 이 땅이 접선, 닿은 점이 접점이에요.\n\n바퀴 중심에서 땅에 닿은 점까지 바퀴살을 그으면 그 바퀴살은 땅과 직각을 이루며 똑바로 서 있어요.',
        fig: FIG_TAN,
        check: {
          type: 'choice',
          q: '직선 PQ가 원 O에 점 T에서 접할 때, $\\angle OTP$의 크기는 무엇일까요?',
          choices: ['$90°$', '$45°$', '$180°$'],
          answer: 0,
          why: ['', '접선과 반지름은 비스듬히 만나지 않아요. 접선은 접점을 지나는 반지름에 수직이에요.', '$180°$는 일직선일 때예요. 반지름 OT와 접선은 수직으로 만나요.'],
          explain: '원의 접선은 접점을 지나는 반지름에 수직이므로 $\\angle OTP=90°$예요.',
        },
      },
      {
        title: '원 밖의 한 점에서 그은 두 접선',
        body: '원 O 밖의 점 P에서 원에 접선을 두 개 그을 수 있어요. 접점을 A, B라 할 때 $\\overline{PA}$, $\\overline{PB}$를 점 P에서 원 O에 그은 **접선의 길이**라고 해요.\n\n**원 밖의 한 점에서 그 원에 그은 두 접선의 길이는 같아요.** $\\overline{PA}=\\overline{PB}$\n\n**왜 그럴까요?** $\\angle PAO=\\angle PBO=90°$, $\\overline{OA}=\\overline{OB}$(반지름), $\\overline{OP}$는 공통이므로 $\\triangle PAO\\equiv\\triangle PBO$(RHS 합동)예요.\n\n여기서 두 가지를 더 알 수 있어요.\n- 사각형 $PAOB$에서 두 각이 $90°$이므로 $\\angle APB+\\angle AOB=180°$\n- $\\triangle PAB$는 $\\overline{PA}=\\overline{PB}$인 이등변삼각형',
        easy: '공을 바닥에 놓고 한 점 P에서 공의 양쪽 옆면에 닿게 실 두 가닥을 팽팽하게 당긴다고 생각해 보세요. 점 P와 공의 중심을 잇는 선을 기준으로 그림이 좌우 똑같으니, 두 실의 길이도 같아요.\n\n이 대칭 때문에 $\\overline{PA}=\\overline{PB}$예요.',
        fig: FIG_TWO_TAN,
        check: {
          type: 'short', check: 'number', unit: '°',
          q: '원 밖의 점 P에서 원 O에 그은 두 접선의 접점을 A, B라고 해요. $\\angle APB=50°$일 때 $\\angle AOB$의 크기는 몇 도일까요?',
          answer: '130',
          wrong: [{ a: '50', why: '두 각이 같다고 생각했어요. 사각형 PAOB의 두 각이 $90°$이므로 $\\angle APB+\\angle AOB=180°$예요.' }],
          explain: '$\\angle PAO=\\angle PBO=90°$이고 사각형의 내각의 합은 $360°$이므로 $\\angle AOB=360°-90°-90°-50°=130°$예요.',
        },
      },
      {
        title: '삼각형의 내접원과 접선의 길이',
        body: '삼각형 ABC의 세 변에 모두 접하는 원을 **내접원**이라고 해요. 내접원이 변 AB, BC, CA와 접하는 점을 각각 D, E, F라고 하면, 꼭짓점마다 그 점에서 그은 두 접선의 길이가 같아요.\n\n$\\overline{AD}=\\overline{AF},\\quad \\overline{BD}=\\overline{BE},\\quad \\overline{CE}=\\overline{CF}$\n\n그래서 세 변의 길이를 알면 접선의 길이를 구할 수 있어요. $\\overline{AD}=x$, $\\overline{BE}=y$, $\\overline{CF}=z$로 놓으면\n\n$\\overline{AB}=x+y,\\quad \\overline{BC}=y+z,\\quad \\overline{CA}=z+x$\n\n예: $\\overline{AB}=7$, $\\overline{BC}=8$, $\\overline{CA}=5$이면 세 식을 모두 더해 $2(x+y+z)=20$, 곧 $x+y+z=10$이에요. 여기서 $y+z=8$을 빼면 $x=2$예요.\n\n> 💡 직각삼각형의 내접원: 직각인 꼭짓점 쪽의 두 접선의 길이는 반지름 $r$과 같아요(반지름 두 개와 두 접선의 길이가 정사각형을 이루니까요).',
        easy: '삼각형의 꼭짓점마다 "두 갈래 길"이 있다고 생각해 보세요. 꼭짓점 A에서 내접원에 닿는 두 길 AD와 AF는 길이가 같아요. 앞 카드에서 본 "원 밖의 한 점에서 그은 두 접선"과 똑같은 모양이니까요.\n\n그래서 삼각형의 세 변은 같은 길이 쌍 세 개($x$, $y$, $z$)로 나뉘어요.',
        fig: FIG_INCIRCLE,
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '삼각형 ABC의 내접원이 변 AB, BC, CA와 각각 점 D, E, F에서 접해요. $\\overline{AB}=7$ cm, $\\overline{BC}=8$ cm, $\\overline{CA}=5$ cm일 때, $\\overline{AD}$의 길이는 몇 cm일까요?',
          answer: '2',
          wrong: [{ a: '3.5', why: '변 AB를 반으로 나누었어요. 접점은 변의 중점이 아니에요. $\\overline{AD}=\\overline{AF}$를 이용해 식을 세워요.' }],
          explain: '$\\overline{AD}=\\overline{AF}=x$, $\\overline{BD}=\\overline{BE}=y$, $\\overline{CE}=\\overline{CF}=z$라 하면 $x+y=7$, $y+z=8$, $z+x=5$예요. 모두 더하면 $x+y+z=10$이고, $y+z=8$을 빼면 $x=2$예요.',
        },
      },
      {
        title: '원에 외접하는 사각형',
        body: '사각형의 네 변이 모두 한 원에 접할 때, 이 사각형은 원에 **외접**한다고 해요.\n\n**원에 외접하는 사각형은 두 쌍의 대변의 길이의 합이 서로 같아요.**\n\n$\\overline{AB}+\\overline{CD}=\\overline{AD}+\\overline{BC}$\n\n**왜 그럴까요?** 네 접점을 P, Q, R, S라 하면 꼭짓점마다 두 접선의 길이가 같아요. 꼭짓점 A, B, C, D에서의 접선의 길이를 $a$, $b$, $c$, $d$라 하면\n\n$\\overline{AB}+\\overline{CD}=(a+b)+(c+d)$\n$\\overline{AD}+\\overline{BC}=(d+a)+(b+c)$\n\n두 식이 같지요. 그래서 둘레는 $2(\\overline{AB}+\\overline{CD})$예요.\n\n> ⚠️ 마주 보는 변(대변)끼리 더해요. 이웃한 변끼리 더한 합은 같지 않을 수 있어요.',
        easy: '네 꼭짓점에서 각각 같은 길이의 "두 갈래 길"이 나와요. $a$, $b$, $c$, $d$라고 이름 붙이면 변 하나는 이웃한 두 꼭짓점의 길을 합친 것이에요.\n\n마주 보는 두 변 AB와 CD를 더하면 $a$, $b$, $c$, $d$가 하나씩 다 들어 있고, 다른 쌍 AD와 BC를 더해도 $a$, $b$, $c$, $d$가 하나씩 들어 있어요. 그래서 두 합이 같아요.',
        fig: FIG_QUAD,
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '원에 외접하는 사각형 ABCD에서 $\\overline{AB}=8$ cm, $\\overline{BC}=10$ cm, $\\overline{CD}=9$ cm예요. $\\overline{AD}$의 길이는 몇 cm일까요?',
          answer: '7',
          wrong: [{ a: '11', why: '이웃한 변끼리 짝을 지었어요. 대변끼리의 합이 같으므로 $\\overline{AB}+\\overline{CD}=\\overline{AD}+\\overline{BC}$예요.' }],
          explain: '$\\overline{AB}+\\overline{CD}=\\overline{AD}+\\overline{BC}$이므로 $8+9=\\overline{AD}+10$, $\\overline{AD}=7$ cm예요.',
        },
      },
    ],

    examples: [
      {
        q: '반지름이 13 cm인 원 O에서 길이가 24 cm인 현 AB가 있어요. 원의 중심 O에서 현 AB까지의 거리는 몇 cm일까요?',
        fig: FIG_CHORD,
        steps: [
          '중심 O에서 현 AB에 수선을 내려 그 발을 M이라 해요. 수선은 현을 이등분하므로 $\\overline{AM}=24\\div2=12$ (cm)예요.',
          '$\\overline{OA}$는 반지름이므로 13 cm예요. $\\triangle OAM$은 $\\angle OMA=90°$인 직각삼각형이에요.',
          '피타고라스 정리로 $\\overline{OM}^2=13^2-12^2=169-144=25$예요.',
          '$\\overline{OM}>0$이므로 $\\overline{OM}=5$ cm예요.',
        ],
        answer: '5 cm',
      },
      {
        q: '$\\angle C=90°$인 직각삼각형 ABC에서 $\\overline{BC}=5$ cm, $\\overline{CA}=12$ cm, $\\overline{AB}=13$ cm예요. 이 삼각형의 내접원의 반지름은 몇 cm일까요?',
        steps: [
          '내접원의 반지름을 $r$ cm라 해요. 꼭짓점 C에서 그은 두 접선과 두 반지름은 정사각형을 이루므로, C에서의 접선의 길이는 $r$ cm예요.',
          '그러면 꼭짓점 B에서의 접선의 길이는 $(5-r)$ cm, 꼭짓점 A에서의 접선의 길이는 $(12-r)$ cm예요.',
          '빗변 AB는 B와 A에서의 접선의 길이를 더한 것이므로 $(5-r)+(12-r)=13$이에요.',
          '$17-2r=13$, $2r=4$이므로 $r=2$예요.',
        ],
        answer: '2 cm',
      },
    ],

    terms: [
      { term: '현', def: '원 위의 두 점을 이은 선분이에요. 원의 중심을 지나는 현이 지름이고, 지름은 가장 긴 현이에요.' },
      { term: '현의 수직이등분선', def: '현의 중점을 지나고 현에 수직인 직선이에요. 원의 중심을 지나요.' },
      { term: '접선', def: '원과 한 점에서만 만나는 직선이에요. 원에 접한다고 해요.' },
      { term: '접점', def: '원과 접선이 만나는 점이에요. 접점을 지나는 반지름은 접선에 수직이에요.' },
      { term: '접선의 길이', def: '원 밖의 한 점에서 원에 접선을 그었을 때, 그 점에서 접점까지의 거리예요. 한 점에서 그은 두 접선의 길이는 같아요.' },
      { term: '내접원', def: '다각형의 모든 변에 접하는 원이에요. 삼각형의 내접원의 중심은 내심이에요.' },
      { term: '원에 외접하는 사각형', def: '네 변이 모두 한 원에 접하는 사각형이에요. 두 쌍의 대변의 길이의 합이 같아요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 0,
        q: '반지름이 17 cm인 원 O에서 길이가 30 cm인 현 AB가 있어요. 원의 중심 O에서 현 AB까지의 거리는 몇 cm일까요?',
        answer: '8',
        wrong: [
          { a: '2', why: '반지름에서 현의 절반을 그냥 뺐어요. 직각삼각형이므로 $\\overline{OM}^2=17^2-15^2$으로 구해요.' },
          { a: '15', why: '$\\overline{AM}$의 길이를 답했어요. 묻는 것은 중심에서 현까지의 거리 $\\overline{OM}$이에요.' },
        ],
        hint: '중심에서 현에 수선을 내리면 현이 이등분돼요.',
        explain: '수선의 발을 M이라 하면 $\\overline{AM}=15$ cm예요. $\\overline{OM}^2=17^2-15^2=289-225=64$이므로 $\\overline{OM}=8$ cm예요.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '원에서 현의 수직이등분선은 그 원의 중심을 지나요.',
        answer: true,
        explain: '원의 중심에서 현에 내린 수선은 현을 이등분해요. 곧 그 수선이 현의 수직이등분선이므로, 현의 수직이등분선은 원의 중심을 지나요.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1, fig: FIG_TWO,
        q: '원 O의 중심에서 두 현 AB, CD에 내린 수선의 발을 각각 M, N이라고 해요. $\\overline{OM}=\\overline{ON}$이고 $\\overline{AB}=12$ cm일 때, $\\overline{CN}$의 길이는 무엇일까요?',
        choices: ['6 cm', '12 cm', '3 cm', '24 cm'],
        answer: 0,
        why: ['', '$\\overline{CD}$의 길이예요. $\\overline{CN}$은 그 절반이에요.', '반을 두 번 나누었어요. $\\overline{CD}=12$ cm의 절반이에요.', '두 배를 했어요. 수선은 현을 이등분해요.'],
        explain: '중심에서 같은 거리에 있으므로 $\\overline{CD}=\\overline{AB}=12$ cm예요. 수선은 현을 이등분하므로 $\\overline{CN}=6$ cm예요.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '점 P에서 원 O에 그은 접선의 접점을 T라고 해요. 반지름 $\\overline{OT}=5$ cm, $\\overline{OP}=13$ cm일 때, $\\overline{PT}$의 길이는 몇 cm일까요?',
        answer: '12',
        wrong: [
          { a: '8', why: '두 길이를 그냥 뺐어요. $\\angle OTP=90°$이므로 피타고라스 정리를 써요.' },
          { a: '18', why: '두 길이를 더했어요. 직각삼각형 OTP에서 $\\overline{OP}$가 빗변이에요.' },
        ],
        explain: '접선은 접점을 지나는 반지름에 수직이므로 $\\angle OTP=90°$예요. $\\overline{PT}^2=13^2-5^2=144$이므로 $\\overline{PT}=12$ cm예요.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', unit: '°', concept: 3, fig: FIG_TWO_TAN,
        q: '원 밖의 점 P에서 원 O에 그은 두 접선의 접점을 A, B라고 해요. $\\angle APB=40°$일 때, $\\angle PAB$의 크기는 몇 도일까요?',
        answer: '70',
        wrong: [
          { a: '40', why: '$\\angle APB$를 그대로 썼어요. $\\triangle PAB$는 $\\overline{PA}=\\overline{PB}$인 이등변삼각형이에요.' },
          { a: '140', why: '$180°-40°$를 2로 나누지 않았어요. 두 밑각이 나누어 가져요.' },
        ],
        hint: '$\\overline{PA}=\\overline{PB}$이므로 $\\triangle PAB$는 이등변삼각형이에요.',
        explain: '$\\overline{PA}=\\overline{PB}$이므로 $\\triangle PAB$는 이등변삼각형이고 두 밑각의 크기가 같아요. $\\angle PAB=(180°-40°)\\div2=70°$예요.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 5,
        q: '원에 외접하는 사각형 ABCD에서는 항상 $\\overline{AB}+\\overline{BC}=\\overline{CD}+\\overline{DA}$예요.',
        answer: false,
        explain: '같은 것은 **대변**끼리의 합이에요. $\\overline{AB}+\\overline{CD}=\\overline{AD}+\\overline{BC}$가 성립해요. 이웃한 두 변 AB, BC의 합은 나머지 두 변의 합과 다를 수 있어요.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 4, fig: FIG_INCIRCLE,
        q: '삼각형 ABC의 내접원 O가 변 AB, BC, CA와 각각 점 D, E, F에서 접해요. $\\overline{AB}=10$ cm, $\\overline{BC}=12$ cm, $\\overline{CA}=8$ cm일 때, $\\overline{BE}$의 길이는 몇 cm일까요?',
        answer: '7',
        wrong: [
          { a: '6', why: '변 BC를 반으로 나누었어요. 접점 E는 변 BC의 중점이 아니에요.' },
          { a: '3', why: '$\\overline{AD}$의 길이를 구했어요. $\\overline{BE}=\\overline{BD}=\\overline{AB}-\\overline{AD}$예요.' },
          { a: '5', why: '$\\overline{CE}$의 길이를 구했어요. 묻는 것은 $\\overline{BE}$예요.' },
        ],
        hint: '$\\overline{AD}=\\overline{AF}=x$로 놓고 다른 접선의 길이를 $x$로 나타내 보세요.',
        explain: '$\\overline{AD}=\\overline{AF}=x$라 하면 $\\overline{BD}=10-x$, $\\overline{CF}=8-x$예요. $\\overline{BE}=\\overline{BD}$, $\\overline{CE}=\\overline{CF}$이므로 $(10-x)+(8-x)=12$, $x=3$이에요. 그래서 $\\overline{BE}=10-3=7$ cm예요.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '$\\angle C=90°$인 직각삼각형 ABC에서 $\\overline{BC}=9$ cm, $\\overline{CA}=12$ cm, $\\overline{AB}=15$ cm예요. 이 삼각형의 내접원의 반지름은 몇 cm일까요?',
        answer: '3',
        wrong: [
          { a: '7.2', why: '꼭짓점 C에서 빗변에 내린 수선의 길이를 구했어요. 내접원의 반지름은 접선의 길이로 구해요.' },
          { a: '6', why: '2로 나누는 것을 잊었어요. $21-2r=15$에서 $2r=6$이에요.' },
        ],
        hint: '꼭짓점 C에서의 접선의 길이는 반지름과 같아요.',
        explain: '반지름을 $r$ cm라 하면 C에서의 접선의 길이는 $r$ cm, B에서는 $(9-r)$ cm, A에서는 $(12-r)$ cm예요. 빗변은 $(9-r)+(12-r)=15$이므로 $2r=6$, $r=3$이에요.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        fig: cfig({
          pts: { A: [0, 1], P: [1.6, 1] },
          segs: [['A', 'P'], ['O', 'A'], ['O', 'P']],
          rights: [['A', 'O', 'P']],
          angs: [['O', 'A', 'P', '58°'], ['P', 'A', 'O', 'x']],
          lab: { A: 90, P: 30, O: 210 },
        }, '원 O 위의 점 A에서 그은 접선 위의 점 P. 각 AOP는 58도, 각 APO는 x'),
        q: '직선 AP는 원 O의 접선이고 점 A는 접점이에요. $\\angle AOP=58°$일 때, $\\angle APO$의 크기 $x$는 무엇일까요?',
        choices: ['$32°$', '$58°$', '$122°$', '$42°$'],
        answer: 0,
        why: ['', '$\\angle AOP$와 같다고 생각했어요. $\\angle OAP=90°$이므로 두 각의 합이 $90°$예요.', '$180°-58°$만 했어요. 직각 $\\angle OAP$도 빼야 해요.', '계산을 다시 해 보세요. $90°-58°$예요.'],
        explain: '접선은 접점을 지나는 반지름에 수직이므로 $\\angle OAP=90°$예요. 삼각형의 내각의 합에서 $x=180°-90°-58°=32°$예요.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 3, fig: FIG_TWO_TAN,
        q: '원 밖의 점 P에서 반지름이 6 cm인 원 O에 그은 두 접선의 접점을 A, B라고 해요. $\\overline{OP}=10$ cm일 때, 사각형 PAOB의 넓이는 몇 cm²일까요?',
        answer: '48',
        wrong: [
          { a: '24', why: '$\\triangle PAO$ 하나의 넓이만 구했어요. 사각형 PAOB는 합동인 삼각형 두 개로 이루어져요.' },
          { a: '96', why: '삼각형의 넓이에서 $\\frac{1}{2}$을 곱하지 않았어요.' },
        ],
        hint: '사각형 PAOB를 선분 OP로 나누면 합동인 직각삼각형 두 개가 생겨요.',
        explain: '$\\angle PAO=90°$이므로 $\\overline{PA}^2=10^2-6^2=64$, $\\overline{PA}=8$ cm예요. $\\triangle PAO\\equiv\\triangle PBO$이므로 넓이는 $2\\times\\left(\\frac{1}{2}\\times8\\times6\\right)=48$ (cm²)예요.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 1,
        fig: cfig({
          pts: { A: on(90), B: on(220), C: on(320), M: on(155, Math.cos(rad(65))), N: on(25, Math.cos(rad(65))) },
          segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['O', 'M', { dash: true }], ['O', 'N', { dash: true }]],
          rights: [['M', 'O', 'A'], ['N', 'O', 'A']],
          angs: [['A', 'B', 'C', '50°', 22]],
          lab: { O: 270 },
        }, '원 O 위에 세 꼭짓점이 있는 삼각형 ABC. 중심 O에서 AB, AC에 내린 수선의 발 M, N까지의 거리가 같고, 각 BAC는 50도'),
        q: '삼각형 ABC의 세 꼭짓점이 원 O 위에 있어요. 원의 중심 O에서 $\\overline{AB}$, $\\overline{AC}$에 내린 수선의 발을 각각 M, N이라 할 때 $\\overline{OM}=\\overline{ON}$이에요. $\\angle BAC=50°$이면 $\\angle ABC$의 크기는 무엇일까요?',
        choices: ['$65°$', '$50°$', '$75°$', '$130°$'],
        answer: 0,
        why: ['', '$\\angle BAC$와 같다고 생각했어요. 같은 것은 두 밑각 $\\angle ABC$와 $\\angle ACB$예요.', '계산을 다시 해 보세요. 두 밑각의 합이 $130°$예요.', '$180°-50°$를 2로 나누지 않았어요.'],
        hint: '중심에서 같은 거리에 있는 두 현의 길이는 같아요.',
        explain: '$\\overline{OM}=\\overline{ON}$이므로 $\\overline{AB}=\\overline{AC}$예요. 그래서 $\\triangle ABC$는 이등변삼각형이고 $\\angle ABC=(180°-50°)\\div2=65°$예요.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 5, fig: FIG_QUAD,
        q: '원 O에 외접하는 사각형 ABCD에서 $\\overline{AB}=6$ cm, $\\overline{CD}=8$ cm예요. 사각형 ABCD의 둘레의 길이는 몇 cm일까요?',
        answer: '28',
        wrong: [{ a: '14', why: '$\\overline{AB}+\\overline{CD}$만 구했어요. $\\overline{AD}+\\overline{BC}$도 14 cm이므로 둘레는 그 두 배예요.' }],
        hint: '대변의 길이의 합이 서로 같아요.',
        explain: '$\\overline{AD}+\\overline{BC}=\\overline{AB}+\\overline{CD}=14$ cm이므로 둘레는 $14+14=28$ (cm)예요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 0,
        fig: cfig({
          center: false,
          pts: { A: CH[0], B: CH[1], M: CH[2], C: [0, -1] },
          segs: [['A', 'B'], ['M', 'C', { label: '4 cm', side: -1 }]],
          rights: [['M', 'A', 'C']],
          lab: { M: 135, C: -90 },
        }, '원 모양 접시의 현 AB의 길이는 16 cm, 현의 중점 M에서 테두리까지 수직으로 잰 길이 MC는 4 cm'),
        q: '원 모양 접시의 깨진 조각이 있어요. 조각의 테두리 위의 두 점 A, B를 이은 현 AB의 길이는 16 cm이고, 현 AB의 중점 M에서 현에 수직으로 테두리까지 잰 길이 $\\overline{MC}$는 4 cm예요. 원래 접시의 반지름은 몇 cm일까요?',
        answer: '10',
        wrong: [
          { a: '8', why: '현의 절반을 반지름으로 보았어요. 중심은 점 M에서 4 cm보다 더 멀리 있어요.' },
          { a: '20', why: '지름을 구했어요. 묻는 것은 반지름이에요.' },
        ],
        hint: '현의 수직이등분선 MC를 늘이면 원의 중심 O를 지나요. 반지름을 $r$로 놓고 $\\overline{OM}$을 $r$로 나타내 보세요.',
        explain: '현의 수직이등분선은 원의 중심 O를 지나므로 O는 직선 CM 위에 있어요. 반지름을 $r$ cm라 하면 $\\overline{OM}=r-4$, $\\overline{AM}=8$이에요. 직각삼각형 OAM에서 $r^2=8^2+(r-4)^2$, $r^2=64+r^2-8r+16$, $8r=80$이므로 $r=10$이에요.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '직각삼각형 ABC의 빗변의 길이가 17 cm이고, 내접원의 반지름이 3 cm예요. 삼각형 ABC의 둘레의 길이는 몇 cm일까요?',
        answer: '40',
        wrong: [
          { a: '23', why: '두 직각변의 길이의 합만 구했어요. 빗변 17 cm도 더해야 둘레예요.' },
          { a: '20', why: '빗변과 반지름만 더했어요. 빗변 위의 두 접선의 길이는 두 직각변 위에 한 번씩 더 나타나요.' },
        ],
        hint: '빗변 위의 두 접선의 길이는 두 직각변 위에 한 번씩 더 나타나요.',
        explain: '직각인 꼭짓점에서의 두 접선의 길이는 반지름과 같은 3 cm예요. 나머지 두 꼭짓점에서의 접선의 길이의 합은 빗변의 길이 17 cm와 같아요. 그래서 두 직각변의 길이의 합은 $17+3+3=23$ cm이고, 둘레는 $23+17=40$ (cm)예요. 실제로 세 변이 8 cm, 15 cm, 17 cm인 직각삼각형이에요.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        fig: cfig({
          S: 60,
          pts: { A: on(60), B: on(-60), P: [2, 0], E: [1, 0], C: [1, Math.sqrt(3) / 3], D: [1, -Math.sqrt(3) / 3] },
          segs: [['P', 'A'], ['P', 'B'], ['C', 'D']],
          lab: { P: 0, E: 180, C: 80, D: -80, O: 180 },
        }, '원 밖의 점 P에서 그은 두 접선 PA, PB와, 원 위의 점 E에서 그은 접선이 PA, PB와 만나는 점 C, D'),
        q: '원 밖의 점 P에서 원 O에 그은 두 접선의 접점을 A, B라고 해요. 원 위의 점 E에서 그은 접선이 $\\overline{PA}$, $\\overline{PB}$와 만나는 점을 각각 C, D라고 해요. $\\overline{PA}=10$ cm일 때, $\\triangle PCD$의 둘레의 길이는 무엇일까요?',
        choices: ['20 cm', '10 cm', '15 cm', '30 cm'],
        answer: 0,
        why: ['', '$\\overline{PA}$ 하나만 셌어요. $\\overline{CD}=\\overline{CA}+\\overline{DB}$이므로 둘레는 $\\overline{PA}+\\overline{PB}$예요.', '$\\overline{CD}$의 길이를 짐작했어요. 접선의 길이를 옮겨 보면 정확히 구할 수 있어요.', '세 변을 모두 10 cm로 본 것 같아요. 접선의 길이를 옮겨 생각해 보세요.'],
        hint: '점 C에서 그은 두 접선 CA, CE의 길이가 같아요. 점 D도 마찬가지예요.',
        explain: '$\\overline{CE}=\\overline{CA}$, $\\overline{DE}=\\overline{DB}$이므로 $\\triangle PCD$의 둘레는 $\\overline{PC}+\\overline{CE}+\\overline{ED}+\\overline{DP}=(\\overline{PC}+\\overline{CA})+(\\overline{DB}+\\overline{DP})=\\overline{PA}+\\overline{PB}=10+10=20$ (cm)예요.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 5,
        fig: cfig({
          S: 45,
          pts: { A: [-0.5, 1], D: [0.5, 1], B: [-2, -1], C: [2, -1] },
          segs: [['A', 'D'], ['D', 'C'], ['C', 'B'], ['B', 'A']],
          lab: { A: 120, D: 60, B: 210, C: -30, O: 200 },
        }, '원 O에 외접하는 등변사다리꼴 ABCD. 윗변 AD, 아랫변 BC'),
        q: '원 O에 외접하는 등변사다리꼴 ABCD에서 $\\overline{AD}\\parallel\\overline{BC}$, $\\overline{AD}=4$ cm, $\\overline{BC}=16$ cm예요. 원 O의 반지름은 몇 cm일까요?',
        answer: '4',
        wrong: [
          { a: '8', why: '사다리꼴의 높이를 구했어요. 높이는 원의 지름과 같으므로 반지름은 그 절반이에요.' },
          { a: '10', why: '다리의 길이를 구했어요. 다리 길이로 높이를 구한 뒤 반지름을 구해요.' },
        ],
        hint: '먼저 대변의 길이의 합이 같다는 성질로 $\\overline{AB}$를 구하고, 높이를 피타고라스 정리로 구해요.',
        explain: '$\\overline{AB}+\\overline{CD}=\\overline{AD}+\\overline{BC}=20$이고 $\\overline{AB}=\\overline{CD}$이므로 $\\overline{AB}=10$ cm예요. A에서 $\\overline{BC}$에 수선을 내리면 밑에 생기는 길이는 $(16-4)\\div2=6$ cm이므로 높이는 $\\sqrt{10^2-6^2}=8$ cm예요. 원은 평행한 두 변 AD, BC에 모두 접하므로 높이가 지름과 같아요. 반지름은 4 cm예요.',
      },
    ],

    deeper: [
      {
        title: '깨진 원의 중심 찾기',
        body: '원 모양 접시가 깨져 조각만 남았을 때 원래 크기를 알아내려면 중심을 찾으면 돼요. 조각의 테두리에 현을 두 개 긋고 각각의 **수직이등분선**을 그어 보세요. 현의 수직이등분선은 원의 중심을 지나므로 두 직선이 만나는 점이 원의 중심이에요.\n\n이 방법은 옛날 기와나 그릇 조각으로 원래 크기를 짐작할 때, 바퀴나 원형 부품의 중심을 찾을 때에도 쓰여요.',
      },
      {
        title: '고등학교에서 만나는 원과 직선',
        body: '고등학교에서는 좌표평면 위에 원을 식으로 나타내요. 그러면 "원의 중심에서 직선까지의 거리"를 계산으로 구할 수 있어요.\n\n- 거리가 반지름보다 작으면 직선이 원과 두 점에서 만나요(현이 생겨요).\n- 거리가 반지름과 같으면 한 점에서 만나요(접선).\n- 거리가 반지름보다 크면 만나지 않아요.\n\n오늘 배운 "접선은 접점을 지나는 반지름에 수직"이라는 성질이 그때 접선의 식을 구하는 바탕이 돼요.',
      },
    ],

    faq: [
      {
        q: '접선은 왜 꼭 반지름과 수직이에요?',
        a: '접선 위의 점 가운데 접점만 원 위에 있고 나머지는 모두 원 밖에 있어요. 그래서 중심 O에서 접선까지 가장 가까운 점이 접점이에요. 한 점에서 직선까지 가장 짧은 선분은 수선이므로, 중심과 접점을 이은 반지름은 접선에 수직이에요.',
      },
      {
        q: '원 밖의 한 점에서 접선은 몇 개 그을 수 있어요?',
        a: '원 밖의 점에서는 접선을 꼭 2개 그을 수 있고, 두 접선의 길이는 같아요. 원 위의 점에서는 그 점을 접점으로 하는 접선이 1개뿐이고, 원 안의 점에서는 접선을 그을 수 없어요.',
      },
      {
        q: '삼각형의 내접원이 변에 닿는 점은 변의 중점이에요?',
        a: '아니에요. 정삼각형처럼 특별한 경우가 아니면 접점은 중점이 아니에요. 변을 반으로 나누지 말고, 꼭짓점마다 두 접선의 길이가 같다는 성질로 식을 세워 구해요.',
      },
    ],

    mistakes: [
      '중심에서 현에 내린 수선으로 $\\overline{AM}$을 구한 뒤 그대로 현의 길이라고 답하는 실수 — 수선은 현을 이등분하므로 $\\overline{AB}=2\\overline{AM}$이에요.',
      '원에 외접하는 사각형에서 이웃한 두 변의 합끼리 같다고 놓는 실수 — 합이 같은 것은 **대변**끼리예요. $\\overline{AB}+\\overline{CD}=\\overline{AD}+\\overline{BC}$',
      '내접원의 접점을 변의 중점으로 생각하는 실수 — 꼭짓점에서 그은 두 접선의 길이가 같다는 성질을 써요.',
    ],

    gens: [
      {
        id: 'chord-length',
        level: 1,
        title: '현의 길이·중심까지의 거리·반지름 구하기',
        make: function (R) {
          var T = R.pick([[5, 3, 4], [5, 4, 3], [10, 6, 8], [10, 8, 6], [13, 5, 12], [13, 12, 5], [15, 9, 12], [15, 12, 9],
            [17, 8, 15], [17, 15, 8], [25, 7, 24], [25, 24, 7], [20, 12, 16], [20, 16, 12], [26, 10, 24], [26, 24, 10]]);
          var r = T[0], d = T[1], h = T[2], kind = R.int(0, 2), q, ans, ws, ex;
          var pre = '원 O의 중심에서 현 AB에 내린 수선의 발을 M이라고 해요. ';
          if (kind === 0) {
            ans = 2 * h;
            q = pre + '반지름이 ' + r + ' cm이고 $\\overline{OM}=' + d + '$ cm일 때, 현 AB의 길이는 몇 cm일까요?';
            ws = wrongs(ans, [
              [h, '$\\overline{AM}$의 길이만 구했어요. 수선은 현을 이등분하므로 $\\overline{AB}=2\\overline{AM}$이에요.'],
              [r - d, '피타고라스 정리 대신 길이를 그냥 뺐어요. $\\overline{AM}^2=\\overline{OA}^2-\\overline{OM}^2$이에요.'],
              [2 * (r - d), '피타고라스 정리 대신 길이를 그냥 뺐어요. $\\overline{AM}^2=\\overline{OA}^2-\\overline{OM}^2$이에요.'],
            ]);
            ex = '직각삼각형 OAM에서 $\\overline{AM}^2=' + r + '^2-' + d + '^2=' + (r * r - d * d) + '$이므로 $\\overline{AM}=' + h + '$ cm예요. 수선은 현을 이등분하므로 $\\overline{AB}=2\\times' + h + '=' + ans + '$ (cm)예요.';
          } else if (kind === 1) {
            ans = d;
            q = pre + '반지름이 ' + r + ' cm이고 현 AB의 길이가 ' + (2 * h) + ' cm일 때, $\\overline{OM}$의 길이는 몇 cm일까요?';
            ws = wrongs(ans, [
              [r - h, '피타고라스 정리 대신 길이를 그냥 뺐어요. $\\overline{OM}^2=\\overline{OA}^2-\\overline{AM}^2$이에요.'],
              [h, '$\\overline{AM}$의 길이를 답했어요. 묻는 것은 중심에서 현까지의 거리예요.'],
            ]);
            ex = '수선은 현을 이등분하므로 $\\overline{AM}=' + (2 * h) + '\\div2=' + h + '$ (cm)예요. 직각삼각형 OAM에서 $\\overline{OM}^2=' + r + '^2-' + h + '^2=' + (d * d) + '$이므로 $\\overline{OM}=' + d + '$ cm예요.';
          } else {
            ans = r;
            q = pre + '현 AB의 길이가 ' + (2 * h) + ' cm이고 $\\overline{OM}=' + d + '$ cm일 때, 원 O의 반지름은 몇 cm일까요?';
            ws = wrongs(ans, [
              [h + d, '피타고라스 정리 대신 길이를 그냥 더했어요. $\\overline{OA}^2=\\overline{AM}^2+\\overline{OM}^2$이에요.'],
              [2 * h + d, '현 전체 길이에 거리를 그냥 더했어요. 수선은 현을 이등분하므로 $\\overline{AM}$은 현의 절반이고, 반지름은 $\\overline{OA}^2=\\overline{AM}^2+\\overline{OM}^2$으로 구해요.'],
              [h, '현의 절반을 반지름으로 보았어요. 반지름은 빗변 $\\overline{OA}$예요.'],
            ]);
            ex = '수선은 현을 이등분하므로 $\\overline{AM}=' + h + '$ cm예요. 직각삼각형 OAM에서 $\\overline{OA}^2=' + h + '^2+' + d + '^2=' + (r * r) + '$이므로 반지름은 ' + r + ' cm예요.';
          }
          return { type: 'short', check: 'number', unit: 'cm', concept: 0, fig: FIG_CHORD, q: q, answer: String(ans), wrong: ws, explain: ex };
        },
      },
      {
        id: 'tangent-angle',
        level: 1,
        title: '두 접선이 만드는 각',
        make: function (R) {
          var x = R.int(13, 77) * 2, kind = R.int(0, 2), q, ans, ws, ex;
          if (x === 90) x = 100;
          var pre = '원 밖의 점 P에서 원 O에 그은 두 접선의 접점을 A, B라고 해요. ';
          if (kind === 0) {
            ans = 180 - x;
            q = pre + '$\\angle APB=' + x + '°$일 때, $\\angle AOB$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [x, '두 각이 같다고 생각했어요. $\\angle APB+\\angle AOB=180°$예요.'],
              [270 - x, '직각을 하나만 뺐어요. $\\angle PAO$와 $\\angle PBO$가 모두 $90°$예요.'],
            ]);
            ex = '$\\angle PAO=\\angle PBO=90°$이고 사각형 PAOB의 내각의 합은 $360°$이므로 $\\angle AOB=360°-90°-90°-' + x + '°=' + ans + '°$예요.';
          } else if (kind === 1) {
            ans = 180 - x;
            q = pre + '$\\angle AOB=' + x + '°$일 때, $\\angle APB$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [x, '두 각이 같다고 생각했어요. $\\angle APB+\\angle AOB=180°$예요.'],
              [270 - x, '직각을 하나만 뺐어요. $\\angle PAO$와 $\\angle PBO$가 모두 $90°$예요.'],
            ]);
            ex = '$\\angle PAO=\\angle PBO=90°$이고 사각형 PAOB의 내각의 합은 $360°$이므로 $\\angle APB=360°-90°-90°-' + x + '°=' + ans + '°$예요.';
          } else {
            ans = 90 - x / 2;
            q = pre + '$\\angle APB=' + x + '°$일 때, $\\angle PAB$의 크기는 몇 도일까요?';
            ws = wrongs(ans, [
              [x, '$\\angle APB$를 그대로 썼어요. $\\triangle PAB$는 $\\overline{PA}=\\overline{PB}$인 이등변삼각형이에요.'],
              [180 - x, '$180°-' + x + '°$를 2로 나누지 않았어요. 두 밑각이 나누어 가져요.'],
              [x / 2, '$\\angle APB$를 반으로 나누었어요. 밑각은 $(180°-\\angle APB)\\div2$예요.'],
            ]);
            ex = '두 접선의 길이가 같으므로 $\\overline{PA}=\\overline{PB}$, 곧 $\\triangle PAB$는 이등변삼각형이에요. $\\angle PAB=(180°-' + x + '°)\\div2=' + ans + '°$예요.';
          }
          return { type: 'short', check: 'number', unit: '°', concept: 3, fig: FIG_TWO_TAN, q: q, answer: String(ans), wrong: ws, explain: ex };
        },
      },
      {
        id: 'tangent-length',
        level: 2,
        title: '내접원·외접 사각형에서 접선의 길이',
        make: function (R) {
          var kind = R.int(0, 3), q, ans, ws, ex;
          if (kind < 3) {
            var x = R.int(2, 9), y = R.int(2, 9), z = R.int(2, 9);
            var AB = x + y, BC = y + z, CA = z + x;
            var name = ['AD', 'BE', 'CF'][kind], side = [['AB', AB], ['BC', BC], ['CA', CA]][kind];
            var other = [['BD', y], ['CE', z], ['AF', x]][kind];
            ans = [x, y, z][kind];
            var f = ['\\overline{AB}+\\overline{CA}-\\overline{BC}', '\\overline{AB}+\\overline{BC}-\\overline{CA}', '\\overline{BC}+\\overline{CA}-\\overline{AB}'][kind];
            var fv = [AB + CA - BC, AB + BC - CA, BC + CA - AB][kind];
            q = '삼각형 ABC의 내접원이 변 AB, BC, CA와 각각 점 D, E, F에서 접해요. $\\overline{AB}=' + AB + '$ cm, $\\overline{BC}=' + BC + '$ cm, $\\overline{CA}=' + CA + '$ cm일 때, $\\overline{' + name + '}$의 길이는 몇 cm일까요?';
            ws = wrongs(ans, [
              [2 * ans, '2로 나누는 것을 잊었어요. $' + f + '$는 구하는 길이의 두 배예요.'],
              [side[1] / 2, '변 ' + side[0] + '를 반으로 나누었어요. 접점은 변의 중점이 아니에요.'],
              [other[1], '$\\overline{' + other[0] + '}$의 길이를 구했어요. 묻는 것은 $\\overline{' + name + '}$예요.'],
            ]);
            var dec = [
              '\\overline{AB}+\\overline{CA}-\\overline{BC}=(\\overline{AD}+\\overline{BD})+(\\overline{AF}+\\overline{CF})-(\\overline{BE}+\\overline{CE})',
              '\\overline{AB}+\\overline{BC}-\\overline{CA}=(\\overline{AD}+\\overline{BD})+(\\overline{BE}+\\overline{CE})-(\\overline{AF}+\\overline{CF})',
              '\\overline{BC}+\\overline{CA}-\\overline{AB}=(\\overline{BE}+\\overline{CE})+(\\overline{AF}+\\overline{CF})-(\\overline{AD}+\\overline{BD})'][kind];
            ex = '꼭짓점마다 두 접선의 길이가 같으므로 $\\overline{AD}=\\overline{AF}$, $\\overline{BD}=\\overline{BE}$, $\\overline{CE}=\\overline{CF}$예요.\n\n$' + dec + '$에서 길이가 같은 것끼리 지우면 $' + ['\\overline{AD}+\\overline{AF}', '\\overline{BD}+\\overline{BE}', '\\overline{CE}+\\overline{CF}'][kind] + '=2\\overline{' + name + '}$만 남아요. 그래서 $2\\overline{' + name + '}=' + [AB, AB, BC][kind] + '+' + [CA, BC, CA][kind] + '-' + [BC, CA, AB][kind] + '=' + fv + '$이고, $\\overline{' + name + '}=' + ans + '$ cm예요.';            return { type: 'short', check: 'number', unit: 'cm', concept: 4, fig: FIG_INCIRCLE, q: q, answer: String(ans), wrong: ws, explain: ex,
              hint: '$\\overline{' + name + '}$와 길이가 같은 접선의 길이를 찾아 세 변의 식을 세워 보세요.' };
          }
          var p = R.int(1, 7), s2 = R.int(1, 7), rr = R.int(1, 7), t = R.int(1, 7);
          var S = { AB: p + s2, BC: s2 + rr, CD: rr + t, DA: t + p };
          var miss = R.pick(['AB', 'BC', 'CD', 'DA']);
          var opp = { AB: 'CD', CD: 'AB', BC: 'DA', DA: 'BC' }[miss];
          var adj = { AB: ['BC', 'DA'], CD: ['BC', 'DA'], BC: ['AB', 'CD'], DA: ['AB', 'CD'] }[miss];
          ans = S[miss];
          q = '원 O에 외접하는 사각형 ABCD에서 ' + ['AB', 'BC', 'CD', 'DA'].filter(function (k) { return k !== miss; }).map(function (k) { return '$\\overline{' + k + '}=' + S[k] + '$ cm'; }).join(', ') +
            '예요. $\\overline{' + miss + '}$의 길이는 몇 cm일까요?';
          ws = wrongs(ans, [
            [S[adj[0]] + S[opp] - S[adj[1]], '대변과 이웃한 변을 섞어 짝을 지었어요. 대변끼리의 합이 같아요: $\\overline{AB}+\\overline{CD}=\\overline{AD}+\\overline{BC}$'],
            [S[adj[1]] + S[opp] - S[adj[0]], '대변과 이웃한 변을 섞어 짝을 지었어요. 대변끼리의 합이 같아요: $\\overline{AB}+\\overline{CD}=\\overline{AD}+\\overline{BC}$'],
            [S[adj[0]] + S[adj[1]], '대변의 길이를 빼는 것을 잊었어요.'],
          ]);
          ex = '원에 외접하는 사각형은 대변의 길이의 합이 같아요. $\\overline{' + miss + '}+\\overline{' + opp + '}=\\overline{' + adj[0] + '}+\\overline{' + adj[1] + '}$이므로 $\\overline{' + miss + '}=' + S[adj[0]] + '+' + S[adj[1]] + '-' + S[opp] + '=' + ans + '$ (cm)예요.';
          return { type: 'short', check: 'number', unit: 'cm', concept: 5, fig: FIG_QUAD, q: q, answer: String(ans), wrong: ws, explain: ex,
            hint: '$\\overline{' + miss + '}$와 마주 보는 변이 어느 것인지 먼저 찾아보세요.' };
        },
      },
      {
        id: 'right-incircle',
        level: 3,
        title: '직각삼각형의 내접원',
        make: function (R) {
          var T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]]);
          var k = R.int(1, 3);
          if (T[2] * k > 60) k = 1;
          var a = T[0] * k, b = T[1] * k, c = T[2] * k, r = (a + b - c) / 2, kind = R.int(0, 1), q, ans, ws, ex;
          if (R.bool()) { var tmp = a; a = b; b = tmp; }
          if (kind === 0) {
            ans = r;
            q = '$\\angle C=90°$인 직각삼각형 ABC에서 $\\overline{BC}=' + a + '$ cm, $\\overline{CA}=' + b + '$ cm, $\\overline{AB}=' + c + '$ cm예요. 이 삼각형의 내접원의 반지름은 몇 cm일까요?';
            var alt = (a * b * 1000) % c === 0 ? a * b / c : null;
            ws = wrongs(ans, [
              [a + b - c, '2로 나누는 것을 잊었어요. $' + (a + b) + '-2r=' + c + '$에서 $2r=' + (a + b - c) + '$' + R.josa(a + b - c, '이에요/예요') + '.'],
              [alt === null ? -1 : alt, '꼭짓점 C에서 빗변에 내린 수선의 길이를 구했어요. 내접원의 반지름은 접선의 길이로 구해요.'],
              [c / 2, '빗변의 절반을 구했어요. 내접원의 반지름은 접선의 길이로 구해요.'],
            ]);
            ex = '반지름을 $r$ cm라 하면 직각인 꼭짓점 C에서의 접선의 길이는 $r$ cm예요(두 접선과 두 반지름이 정사각형을 이뤄요). B에서의 접선의 길이는 $(' + a + '-r)$ cm, A에서는 $(' + b + '-r)$ cm이고, 둘을 더하면 빗변이에요.\n\n$(' + a + '-r)+(' + b + '-r)=' + c + '$, $2r=' + (a + b - c) + '$이므로 $r=' + r + '$ (cm)예요.';
          } else {
            ans = a + b + c;
            q = '직각삼각형 ABC의 빗변의 길이가 ' + c + ' cm이고, 내접원의 반지름이 ' + r + ' cm예요. 삼각형 ABC의 둘레의 길이는 몇 cm일까요?';
            ws = wrongs(ans, [
              [c + 2 * r, '두 직각변의 길이의 합만 구했어요. 빗변의 길이도 더해야 둘레예요.'],
              [c + r, '빗변과 반지름만 더했어요. 빗변 위의 두 접선의 길이는 두 직각변 위에 한 번씩 더 나타나요.'],
              [2 * c + r, '반지름을 한 번만 더했어요. 직각인 꼭짓점에서 접선의 길이 $r$이 두 번 나와요.'],
            ]);
            ex = '직각인 꼭짓점에서의 두 접선의 길이는 반지름과 같은 ' + r + ' cm예요. 나머지 두 꼭짓점에서의 접선의 길이의 합은 빗변 ' + c + ' cm와 같아요. 그래서 두 직각변의 길이의 합은 $' + c + '+' + r + '+' + r + '=' + (c + 2 * r) + '$ cm이고, 둘레는 $' + (c + 2 * r) + '+' + c + '=' + ans + '$ (cm)예요.';
          }
          return { type: 'short', check: 'number', unit: 'cm', concept: 4, q: q, answer: String(ans), wrong: ws, explain: ex,
            hint: '직각인 꼭짓점에서의 두 접선의 길이는 반지름과 같아요.' };
        },
      },
    ],
  });
})();
