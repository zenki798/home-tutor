/* 중1 수학 · 입체도형의 성질
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 각기둥·각뿔·각뿔대·원기둥·원뿔·구의 겨냥도와 전개도는 아래 도우미가 직접 그린 svg
 *       (보이지 않는 모서리는 점선, 색은 currentColor·var(--fig-n)) */
(function () {
  var C1 = 'var(--fig-1, #2563eb)', C2 = 'var(--fig-2, #f59e0b)', C4 = 'var(--fig-4, #ef4444)';
  var SINO = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  function sino(n) { var t = Math.floor(n / 10), o = n % 10; return (t ? (t > 1 ? SINO[t] : '') + '십' : '') + SINO[o]; }
  // 틀린 답 목록: [[값, 진단], …] → 정답·서로 같은 값을 뺀 wrong 칸
  function wrongList(ans, list) {
    var seen = [ans], out = [];
    list.forEach(function (w) {
      if (seen.indexOf(w[0]) >= 0) return;
      seen.push(w[0]);
      out.push({ a: String(w[0]), why: w[1] });
    });
    return out;
  }

  // ---------- 그림 도우미 ----------
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function pt(p) { return r1(p[0]) + ' ' + r1(p[1]); }
  function rad(d) { return d * Math.PI / 180; }
  function txt(p, s, o) {
    o = o || {};
    return '<text x="' + r1(p[0]) + '" y="' + r1(p[1]) + '" font-size="' + (o.size || 13) + '" text-anchor="' + (o.anchor || 'middle') + '" dominant-baseline="central" fill="currentColor">' + s + '</text>';
  }
  function seg(a, b, dash, color) {
    return '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" stroke="' + (color || 'currentColor') + '" stroke-width="' + (dash ? 1.5 : 2) + '"' +
      (dash ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>';
  }
  // 타원의 앞쪽(아래) 반은 실선, 뒤쪽(위) 반은 점선. full 이면 모두 실선
  function ellipse(cx, cy, rx, ry, full, fill) {
    if (full) return '<ellipse cx="' + r1(cx) + '" cy="' + r1(cy) + '" rx="' + r1(rx) + '" ry="' + r1(ry) + '" fill="' + (fill || 'none') + '"' + (fill ? ' fill-opacity="0.25"' : '') + ' stroke="currentColor" stroke-width="2"/>';
    var L = pt([cx - rx, cy]), Rr = pt([cx + rx, cy]);
    return '<path d="M ' + L + ' A ' + r1(rx) + ' ' + r1(ry) + ' 0 0 1 ' + Rr + '" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>' +
      '<path d="M ' + L + ' A ' + r1(rx) + ' ' + r1(ry) + ' 0 0 0 ' + Rr + '" fill="none" stroke="currentColor" stroke-width="2"/>';
  }
  function svgFig(w, h, body, alt) { return { type: 'svg', svg: '<svg viewBox="0 0 ' + w + ' ' + h + '">' + body + '</svg>', alt: alt }; }

  // 각기둥(prism)·각뿔(pyramid)·각뿔대(frustum) 겨냥도. 밑면은 정n각형을 비스듬히 본 모양
  function polySolid(n, kind, alt) {
    var cx = 120, rx = 80, ry = 26, yb = 185, yt = kind === 'pyramid' ? 22 : 50, k = kind === 'frustum' ? 0.5 : 1;
    var B = [], T = [], mids = [], i;
    for (i = 0; i < n; i++) {
      var th = 90 - 180 / n + 360 * i / n + (n === 3 ? 0 : 20);
      B.push([cx + rx * Math.cos(rad(th)), yb + ry * Math.sin(rad(th))]);
      T.push([cx + k * rx * Math.cos(rad(th)), yt + k * ry * Math.sin(rad(th))]);
      mids.push(Math.sin(rad(th + 180 / n)));
    }
    function hidE(j) { return mids[(j + n) % n] < -1e-9; }
    var apex = [cx, yt];
    var body = '';
    // 옆면 색칠(앞쪽 윤곽)
    for (i = 0; i < n; i++) {
      if (hidE(i)) continue;
      var j = (i + 1) % n;
      var top = kind === 'pyramid' ? pt(apex) : pt(T[j]) + ' L ' + pt(T[i]);
      body += '<path d="M ' + pt(B[i]) + ' L ' + pt(B[j]) + ' L ' + top + ' Z" fill="' + C1 + '" fill-opacity="0.12" stroke="none"/>';
    }
    for (i = 0; i < n; i++) {
      body += seg(B[i], B[(i + 1) % n], hidE(i));
      var hv = hidE(i) && hidE(i - 1);
      body += seg(B[i], kind === 'pyramid' ? apex : T[i], hv);
      if (kind !== 'pyramid') body += seg(T[i], T[(i + 1) % n], false);
    }
    return svgFig(240, 215, body, alt);
  }
  // 원기둥 o.r·o.h: 반지름·높이 글
  function cylinderFig(o) {
    o = o || {};
    var cx = 110, rx = 65, ry = 20, yt = 40, yb = 180;
    var body = '<path d="M ' + pt([cx - rx, yt]) + ' L ' + pt([cx - rx, yb]) + ' A ' + rx + ' ' + ry + ' 0 0 0 ' + pt([cx + rx, yb]) + ' L ' + pt([cx + rx, yt]) + ' Z" fill="' + C1 + '" fill-opacity="0.12" stroke="none"/>';
    body += seg([cx - rx, yt], [cx - rx, yb]) + seg([cx + rx, yt], [cx + rx, yb]);
    body += ellipse(cx, yt, rx, ry, true, C1) + ellipse(cx, yb, rx, ry, false);
    if (o.r) body += seg([cx, yt], [cx + rx, yt], true) + '<circle cx="' + cx + '" cy="' + yt + '" r="2.5" fill="currentColor"/>' + txt([cx + rx / 2, yt - 8], o.r, { size: 12 });
    if (o.h) body += txt([cx + rx + 8, (yt + yb) / 2], o.h, { anchor: 'start' });
    return svgFig(240, 215, body, o.alt || '원기둥');
  }
  // 원뿔 o.r·o.h·o.l: 반지름·높이·모선 글
  function coneFig(o) {
    o = o || {};
    var cx = 110, rx = 65, ry = 20, ya = 25, yb = 180;
    var body = '<path d="M ' + pt([cx, ya]) + ' L ' + pt([cx - rx, yb]) + ' A ' + rx + ' ' + ry + ' 0 0 0 ' + pt([cx + rx, yb]) + ' Z" fill="' + C1 + '" fill-opacity="0.12" stroke="none"/>';
    body += seg([cx, ya], [cx - rx, yb]) + seg([cx, ya], [cx + rx, yb]) + ellipse(cx, yb, rx, ry, false);
    if (o.axis) body += seg([cx, ya - 18], [cx, yb + 30], true) + txt([cx + 8, ya - 12], o.axis, { anchor: 'start', size: 12 });
    if (o.h) body += seg([cx, ya], [cx, yb], true) + txt([cx + 6, (ya + yb) / 2 + 20], o.h, { anchor: 'start', size: 12 });
    if (o.r) body += seg([cx, yb], [cx + rx, yb], true) + txt([cx + rx / 2, yb + 8], o.r, { size: 12 });
    if (o.h || o.r || o.axis) body += '<circle cx="' + cx + '" cy="' + yb + '" r="2.5" fill="currentColor"/>';
    if (o.l) body += txt([cx + rx / 2 + 12, (ya + yb) / 2 - 6], o.l, { anchor: 'start' });
    return svgFig(240, 215, body, o.alt || '원뿔');
  }
  function coneFrustumFig(alt) {
    var cx = 110, rt = 35, ryt = 10, yt = 50, rb = 70, ryb = 20, yb = 180;
    var body = '<path d="M ' + pt([cx - rt, yt]) + ' L ' + pt([cx - rb, yb]) + ' A ' + rb + ' ' + ryb + ' 0 0 0 ' + pt([cx + rb, yb]) + ' L ' + pt([cx + rt, yt]) + ' Z" fill="' + C1 + '" fill-opacity="0.12" stroke="none"/>';
    body += seg([cx - rt, yt], [cx - rb, yb]) + seg([cx + rt, yt], [cx + rb, yb]) + ellipse(cx, yt, rt, ryt, true, C1) + ellipse(cx, yb, rb, ryb, false);
    return svgFig(240, 215, body, alt || '원뿔대');
  }
  function sphereFig(o) {
    o = o || {};
    var cx = 110, cy = 110, R = 80;
    var body = '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + C1 + '" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>' + ellipse(cx, cy, R, 20, false);
    body += '<circle cx="' + cx + '" cy="' + cy + '" r="2.5" fill="currentColor"/>';
    if (o.r) body += seg([cx, cy], [cx + R, cy], true) + txt([cx + R / 2, cy - 10], o.r, { size: 12 });
    return svgFig(220, 220, body, o.alt || '구');
  }
  // 정육면체 전개도: 십자 모양. names 는 면 이름 6개 [위, 왼쪽, 가운데, 오른쪽, 맨 오른쪽, 아래]
  function cubeNetFig(names, alt) {
    var s = 46, x0 = 20, y0 = 15, cells = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], body = '';
    cells.forEach(function (c, i) {
      var x = x0 + c[0] * s, y = y0 + c[1] * s;
      body += '<rect x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" fill="' + C1 + '" fill-opacity="0.1" stroke="currentColor" stroke-width="2"/>';
      body += txt([x + s / 2, y + s / 2], names[i], { size: 15 });
    });
    return svgFig(x0 * 2 + 4 * s, y0 * 2 + 3 * s, body, alt);
  }
  // 원뿔의 전개도: 중심각 deg 인 부채꼴(모선 l) + 밑면인 원
  function coneNetFig(deg, o) {
    o = o || {};
    var R = 95, c = [130, 22], st = 270 - deg / 2;
    var p1 = [c[0] + R * Math.cos(rad(st)), c[1] - R * Math.sin(rad(st))], p2 = [c[0] + R * Math.cos(rad(st + deg)), c[1] - R * Math.sin(rad(st + deg))];
    var rr = R * deg / 360, cc = [c[0], c[1] + R + rr];
    var top = Math.min(c[1], p1[1], p2[1]);
    var dy = top < 12 ? 12 - top : 0;
    function sh(p) { return [p[0], p[1] + dy]; }
    c = sh(c); p1 = sh(p1); p2 = sh(p2); cc = sh(cc);
    var body = '<path d="M ' + pt(c) + ' L ' + pt(p1) + ' A ' + R + ' ' + R + ' 0 ' + (deg > 180 ? 1 : 0) + ' 0 ' + pt(p2) + ' Z" fill="' + C1 + '" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>';
    body += '<circle cx="' + r1(cc[0]) + '" cy="' + r1(cc[1]) + '" r="' + r1(rr) + '" fill="' + C2 + '" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/>';
    if (o.l) { var m = [(c[0] + p2[0]) / 2, (c[1] + p2[1]) / 2], oa = rad(st + deg + 90); body += txt([m[0] + 16 * Math.cos(oa), m[1] - 16 * Math.sin(oa)], o.l, { size: 12 }); }
    if (o.angle) body += txt([c[0], c[1] + 26], o.angle, { size: 12 });
    if (o.r) body += seg(cc, [cc[0] + rr, cc[1]], true) + txt([cc[0] + rr + 6, cc[1]], o.r, { anchor: 'start', size: 12 });
    return svgFig(260, r1(cc[1] + rr + 12), body, o.alt || '원뿔의 전개도');
  }
  // 원기둥의 전개도: 옆면 직사각형 + 위아래 원
  function cylNetFig(o) {
    o = o || {};
    var w = 170, h = 80, rr = w / (2 * Math.PI), x0 = 35, yR = 12 + 2 * rr;
    var body = '<circle cx="' + r1(x0 + w / 2) + '" cy="' + r1(12 + rr) + '" r="' + r1(rr) + '" fill="' + C2 + '" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/>';
    body += '<rect x="' + x0 + '" y="' + r1(yR) + '" width="' + w + '" height="' + h + '" fill="' + C1 + '" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>';
    body += '<circle cx="' + r1(x0 + w / 2) + '" cy="' + r1(yR + h + rr) + '" r="' + r1(rr) + '" fill="' + C2 + '" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/>';
    if (o.w) body += txt([x0 + w / 2, yR + h / 2], o.w, { size: 12 });
    if (o.h) body += txt([x0 + w + 6, yR + h / 2], o.h, { anchor: 'start', size: 12 });
    if (o.r) body += seg([x0 + w / 2, 12 + rr], [x0 + w / 2 + rr, 12 + rr], true) + txt([x0 + w / 2 + rr + 6, 12 + rr], o.r, { anchor: 'start', size: 12 });
    return svgFig(260, r1(yR + h + 2 * rr + 12), body, o.alt || '원기둥의 전개도');
  }
  // 회전축(점선, 세로) 옆의 평면도형 — polygon 그림
  function spinFig(points, alt, axisX) {
    var ys = points.map(function (p) { return p[1]; });
    var lo = Math.min.apply(null, ys) - 0.8, hi = Math.max.apply(null, ys) + 0.8;
    return { type: 'polygon', points: points, fill: true, segments: [{ from: [axisX || 0, lo], to: [axisX || 0, hi], dashed: true, label: 'ℓ' }], alt: alt };
  }
  var TETRA = [[0, 6.93], [-2, 3.46], [-4, 0], [0, 0], [4, 0], [2, 3.46]];

  // 각기둥·각뿔·각뿔대의 면·모서리·꼭짓점
  var KINDS = {
    '각기둥': { f: function (n) { return n + 2; }, e: function (n) { return 3 * n; }, v: function (n) { return 2 * n; }, ftex: 'n+2', etex: '3n', vtex: '2n' },
    '각뿔': { f: function (n) { return n + 1; }, e: function (n) { return 2 * n; }, v: function (n) { return n + 1; }, ftex: 'n+1', etex: '2n', vtex: 'n+1' },
    '각뿔대': { f: function (n) { return n + 2; }, e: function (n) { return 3 * n; }, v: function (n) { return 2 * n; }, ftex: 'n+2', etex: '3n', vtex: '2n' },
  };
  var PROP = { f: '면', e: '모서리', v: '꼭짓점' };
  var REGULAR = [
    { name: '정사면체', face: '정삼각형', meet: 3, f: 4, e: 6, v: 4 },
    { name: '정육면체', face: '정사각형', meet: 3, f: 6, e: 12, v: 8 },
    { name: '정팔면체', face: '정삼각형', meet: 4, f: 8, e: 12, v: 6 },
    { name: '정십이면체', face: '정오각형', meet: 3, f: 12, e: 30, v: 20 },
    { name: '정이십면체', face: '정삼각형', meet: 5, f: 20, e: 30, v: 12 },
  ];

Tutor.registerUnit({
  id: 'math-m1-10',
  course: 'math-m1',
  title: '입체도형의 성질',
  summary: '다면체와 정다면체, 회전체를 알아보고, 회전체를 여러 방향으로 자른 단면을 살펴봐요.',
  goals: [
    '다면체와 각뿔대의 뜻을 알고 면, 모서리, 꼭짓점의 개수를 구할 수 있어요.',
    '정다면체가 다섯 가지뿐인 까닭을 설명하고, 그 성질과 전개도를 알 수 있어요.',
    '회전체의 뜻을 알고, 회전체를 자른 단면의 모양을 말할 수 있어요.',
    '원기둥과 원뿔의 전개도에서 길이와 각의 관계를 알 수 있어요.',
  ],
  standards: ['[9수03-07]'],

  concepts: [
    {
      title: '다면체와 각뿔대',
      body: '다각형인 면으로만 둘러싸인 입체도형을 **다면체**라고 해요. 다면체를 둘러싼 다각형을 **면**, 면과 면이 만나는 선분을 **모서리**, 모서리와 모서리가 만나는 점을 **꼭짓점**이라고 해요. 다면체는 면의 개수에 따라 사면체, 오면체, 육면체, … 라고 불러요.\n\n**각뿔대**는 각뿔을 밑면에 평행한 평면으로 잘랐을 때 생기는 두 입체도형 가운데 각뿔이 아닌 쪽이에요. 서로 평행한 두 면을 **밑면**, 밑면이 아닌 면을 **옆면**, 두 밑면 사이의 거리를 **높이**라고 해요. 두 밑면은 모양은 같지만 크기가 달라서 합동이 아니고, 옆면은 모두 **사다리꼴**이에요. 밑면의 모양에 따라 삼각뿔대, 사각뿔대, … 라고 해요.\n\n| | $n$각기둥 | $n$각뿔 | $n$각뿔대 |\n|---|---|---|---|\n| 면의 개수 | $n+2$ | $n+1$ | $n+2$ |\n| 모서리의 개수 | $3n$ | $2n$ | $3n$ |\n| 꼭짓점의 개수 | $2n$ | $n+1$ | $2n$ |\n| 옆면의 모양 | 직사각형 | 삼각형 | 사다리꼴 |\n\n> ⚠️ 원기둥, 원뿔, 구처럼 곡면이 있는 입체도형은 다면체가 아니에요.',
      easy: '다면체는 **평평한 다각형 조각만 붙여 만든 입체**예요. 주사위(정육면체)는 정사각형 6장, 피라미드 모양(사각뿔)은 사각형 1장과 삼각형 4장으로 만들어져요.\n\n사각뿔의 뾰족한 윗부분을 바닥과 나란하게 싹둑 잘라 내면, 남은 아랫부분이 **사각뿔대**예요. 위아래가 모두 사각형이고, 옆면은 위가 좁고 아래가 넓은 사다리꼴 4장이지요.',
      fig: polySolid(4, 'frustum', '사각뿔대의 겨냥도. 보이지 않는 모서리는 점선'),
      check: {
        type: 'choice',
        q: '오각뿔대의 면은 몇 개일까요?',
        choices: ['7개', '6개', '10개'],
        answer: 0,
        why: [
          '',
          '오각뿔의 면의 개수예요. 각뿔대는 밑면이 2개라서 옆면 5개와 밑면 2개를 더해요.',
          '오각뿔대의 꼭짓점의 개수예요. 면은 옆면 5개와 밑면 2개예요.',
        ],
        explain: '오각뿔대는 옆면(사다리꼴) 5개와 밑면 2개로 둘러싸여 있어요. 그래서 면은 $5+2=7$(개)이고, 칠면체예요.',
      },
    },
    {
      title: '정다면체',
      body: '모든 면이 합동인 정다각형이고, 각 꼭짓점에 모인 면의 개수가 같은 다면체를 **정다면체**라고 해요. 정다면체는 다음 다섯 가지뿐이에요.\n\n| 정다면체 | 면의 모양 | 한 꼭짓점에 모인 면 | 면 | 모서리 | 꼭짓점 |\n|---|---|---|---|---|---|\n| 정사면체 | 정삼각형 | 3개 | 4 | 6 | 4 |\n| 정육면체 | 정사각형 | 3개 | 6 | 12 | 8 |\n| 정팔면체 | 정삼각형 | 4개 | 8 | 12 | 6 |\n| 정십이면체 | 정오각형 | 3개 | 12 | 30 | 20 |\n| 정이십면체 | 정삼각형 | 5개 | 20 | 30 | 12 |\n\n**왜 다섯 가지뿐일까요?** 입체도형의 꼭짓점이 되려면 한 꼭짓점에 면이 3개 이상 모여야 하고, 모인 각의 크기의 합이 $360°$보다 작아야 해요. $360°$가 되면 평평하게 펴져서 꼭짓점이 생기지 않아요.\n\n- 정삼각형(한 내각 $60°$): 3개, 4개, 5개가 모일 수 있어요. 6개는 $60°\\times6=360°$라서 안 돼요.\n- 정사각형(한 내각 $90°$): 3개만 돼요.\n- 정오각형(한 내각 $108°$): 3개만 돼요.\n- 정육각형(한 내각 $120°$): 3개만 모여도 $360°$라서 안 돼요. 변이 더 많은 정다각형도 마찬가지예요.\n\n그래서 면의 모양은 정삼각형, 정사각형, 정오각형뿐이고, 정다면체는 모두 5가지예요.',
      easy: '정다면체는 **똑같은 정다각형 타일만으로, 어느 꼭짓점에서 보아도 똑같은 모양이 되게 만든 입체**예요. 주사위 모양인 정육면체가 대표적이지요.\n\n종이 정삼각형을 한 점에 3장, 4장, 5장 모아 붙이면 오목하게 접히면서 뾰족한 꼭짓점이 생겨요. 그런데 6장을 모으면 바닥에 평평하게 깔려 버려 꼭짓점이 생기지 않아요. 이렇게 꼭짓점을 만들 수 있는 경우가 몇 가지 안 되어서 정다면체도 5가지뿐이에요.',
      fig: polySolid(3, 'pyramid', '정사면체(삼각뿔)의 겨냥도. 보이지 않는 모서리는 점선'),
      check: {
        type: 'choice',
        q: '정다면체의 면의 모양이 될 수 **없는** 것은 무엇일까요?',
        choices: ['정육각형', '정삼각형', '정오각형'],
        answer: 0,
        why: [
          '',
          '정삼각형은 정사면체, 정팔면체, 정이십면체의 면이에요.',
          '정오각형은 정십이면체의 면이에요.',
        ],
        explain: '정육각형은 한 내각이 $120°$라서 3개만 모여도 $360°$가 되어 평평해져요. 그래서 꼭짓점을 만들 수 없어요.',
      },
    },
    {
      title: '정다면체의 전개도',
      body: '입체도형의 겉면을 잘라 평면 위에 펼쳐 놓은 그림을 **전개도**라고 해요. 정다면체의 전개도에서는 접었을 때 **어느 꼭짓점끼리 만나고, 어느 모서리끼리 겹치는지**를 생각하는 것이 중요해요.\n\n- **정사면체**: 정삼각형 4개. 큰 정삼각형의 세 변의 가운데 점을 이어 네 개로 나눈 모양이 대표적이에요(그림).\n- **정육면체**: 정사각형 6개. 서로 다른 모양의 전개도가 모두 11가지 있어요.\n- **정팔면체**(정삼각형 8개), **정십이면체**(정오각형 12개), **정이십면체**(정삼각형 20개)도 전개도를 접어 만들 수 있어요.\n\n그림의 전개도에서 가운데 삼각형 DEF를 바닥에 두고 바깥의 세 삼각형을 세우면, 세 꼭짓점 A, B, C가 위에서 한 점으로 만나요. 이때 모서리 AD와 BD, BE와 CE, CF와 AF가 각각 겹쳐요.\n\n> 💡 전개도의 면의 개수는 입체도형의 면의 개수와 같아요. 하지만 꼭짓점과 모서리는 접으면 여러 개가 하나로 합쳐지므로, 전개도에 보이는 개수와 달라요.',
      easy: '과자 상자를 모서리를 따라 잘라 납작하게 펼쳐 본 적이 있나요? 그렇게 펼친 모양이 전개도예요.\n\n전개도를 다시 접을 때는 "어느 두 변이 맞붙을까?"만 생각하면 돼요. 정사면체 전개도에서 바깥쪽 세 뾰족한 끝 A, B, C는 접으면 꼭대기에서 모두 만나요. 그래서 A 쪽 변과 B 쪽 변처럼, 이웃한 두 삼각형의 바깥 변끼리 맞붙어요.',
      fig: { type: 'polygon', points: TETRA, labels: ['A', 'D', 'B', 'E', 'C', 'F'], fill: true, segments: [{ from: TETRA[1], to: TETRA[3] }, { from: TETRA[3], to: TETRA[5] }, { from: TETRA[5], to: TETRA[1] }], alt: '큰 정삼각형 ABC 의 세 변의 가운데 점 D, E, F 를 이어 정삼각형 4개로 나눈 정사면체의 전개도' },
      check: {
        type: 'ox',
        q: '정사면체의 전개도를 접으면 꼭짓점 A, B, C가 한 점에서 만나요. (큰 정삼각형 ABC의 세 변의 가운데 점을 이어 4개로 나눈 전개도)',
        answer: true,
        explain: '가운데 삼각형 DEF를 바닥으로 하고 바깥 삼각형 세 개를 세우면 A, B, C가 꼭대기의 한 꼭짓점에서 만나요. 정사면체의 꼭짓점은 D, E, F와 이 점, 모두 4개예요.',
      },
    },
    {
      title: '회전체',
      body: '평면도형을 한 직선을 축으로 하여 1회전 시킬 때 생기는 입체도형을 **회전체**라고 하고, 축으로 쓴 직선을 **회전축**이라고 해요. 원기둥, 원뿔에서 옆면을 만드는 선분을 **모선**이라고 해요.\n\n| 돌리는 평면도형 | 회전체 |\n|---|---|\n| 직사각형 (한 변을 축으로) | 원기둥 |\n| 직각삼각형 (직각을 낀 한 변을 축으로) | 원뿔 |\n| 두 각이 직각인 사다리꼴 (두 직각을 낀 변을 축으로) | 원뿔대 |\n| 반원 (지름을 축으로) | 구 |\n\n**원뿔대**는 원뿔을 밑면에 평행한 평면으로 잘랐을 때 생기는 두 입체도형 가운데 원뿔이 아닌 쪽이에요.\n\n> ⚠️ 같은 직각삼각형이라도 **빗변**을 축으로 돌리면 원뿔이 아니라, 밑면끼리 맞붙인 원뿔 두 개 모양이 돼요. 어느 변을 축으로 하느냐가 중요해요.',
      easy: '도자기를 만드는 물레를 떠올려 보세요. 흙을 빙글빙글 돌리면서 모양을 만들면 위에서 본 모양이 늘 동그래요. 회전체는 이렇게 **축을 중심으로 한 바퀴 돌려서 생기는 입체**예요.\n\n종이에 직각삼각형을 그려 오린 뒤, 직각을 낀 한 변에 빨대를 붙이고 빨대를 두 손바닥 사이에 끼워 빠르게 비벼 돌려 보세요. 눈앞에 원뿔 모양이 보여요.',
      fig: spinFig([[0, 0], [3, 0], [0, 4]], '직각을 낀 한 변을 회전축 ℓ 위에 둔 직각삼각형'),
      check: {
        type: 'choice',
        q: '직사각형의 한 변을 회전축으로 하여 1회전 시킬 때 생기는 회전체는 무엇일까요?',
        choices: ['원기둥', '원뿔', '구'],
        answer: 0,
        why: [
          '',
          '원뿔은 직각삼각형을 직각을 낀 한 변을 축으로 돌려서 생겨요.',
          '구는 반원을 지름을 축으로 돌려서 생겨요.',
        ],
        explain: '직사각형의 한 변을 축으로 돌리면 마주 보는 변이 원기둥의 옆면(모선)을 만들고, 나머지 두 변이 두 밑면인 원을 만들어요. 그래서 원기둥이에요.',
      },
    },
    {
      title: '회전체의 성질과 단면',
      body: '회전체를 평면으로 자르면 자르는 방향에 따라 단면의 모양이 달라져요.\n\n1. **회전축에 수직인 평면**으로 자르면 단면은 항상 **원**이에요.\n2. **회전축을 포함하는 평면**으로 자르면 단면은 모두 합동이고, 회전축에 대하여 **선대칭도형**이에요. 이 단면은 돌린 평면도형과, 그것을 회전축에 대하여 뒤집은 도형을 붙인 모양이에요.\n\n| 회전체 | 회전축에 수직인 단면 | 회전축을 포함하는 단면 |\n|---|---|---|\n| 원기둥 | 원 | 직사각형 |\n| 원뿔 | 원 | 이등변삼각형 |\n| 원뿔대 | 원 | 사다리꼴 |\n| 구 | 원 | 원 |\n\n> 💡 구는 어느 방향으로 잘라도 단면이 원이에요. 구의 중심을 지나는 평면으로 자를 때 단면인 원이 가장 커요.',
      easy: '김밥을 떠올려 보세요. 먹기 좋게 썰 때처럼 길이 방향에 수직으로 자르면 단면이 동그란 원이에요. 그런데 김밥을 길이 방향으로 길게 반 가르면 단면이 긴 직사각형이에요.\n\n원기둥도 똑같아요. 회전축에 수직으로 자르면 원, 회전축을 따라 세로로 자르면 직사각형이 나와요.',
      fig: coneFig({ axis: '회전축', alt: '원뿔과 꼭짓점에서 밑면의 중심까지 그은 회전축' }),
      check: {
        type: 'choice',
        q: '원뿔을 회전축을 포함하는 평면으로 자른 단면의 모양은 무엇일까요?',
        choices: ['이등변삼각형', '원', '직사각형'],
        answer: 0,
        why: [
          '',
          '원은 회전축에 **수직인** 평면으로 잘랐을 때의 단면이에요.',
          '직사각형은 원기둥을 회전축을 포함하는 평면으로 잘랐을 때의 단면이에요.',
        ],
        explain: '원뿔은 직각삼각형을 돌린 회전체라서, 회전축을 포함하는 평면으로 자르면 그 직각삼각형 두 개를 회전축을 사이에 두고 붙인 모양, 곧 이등변삼각형이 돼요.',
      },
    },
    {
      title: '회전체의 전개도',
      body: '- **원기둥**의 전개도: 밑면인 원 2개와 옆면인 **직사각형** 1개예요. 직사각형의 가로의 길이는 밑면인 원의 둘레의 길이 $2\\pi r$과 같고, 세로의 길이는 원기둥의 높이와 같아요.\n- **원뿔**의 전개도: 밑면인 원 1개와 옆면인 **부채꼴** 1개예요. 부채꼴의 반지름의 길이는 원뿔의 **모선의 길이**와 같고, 부채꼴의 **호의 길이는 밑면인 원의 둘레의 길이**와 같아요.\n- **원뿔대**의 전개도: 크기가 다른 원 2개와, 큰 부채꼴에서 작은 부채꼴을 잘라 낸 모양의 옆면 1개예요.\n- **구**는 종이처럼 평평하게 펼 수 없어서 전개도를 그릴 수 없어요.\n\n예: 밑면의 반지름의 길이가 3 cm, 모선의 길이가 9 cm인 원뿔의 전개도에서 부채꼴의 호의 길이는 밑면의 둘레와 같은 $2\\pi\\times3=6\\pi$ (cm)예요. 반지름이 9 cm인 원의 둘레는 $18\\pi$ cm이고, 호의 길이는 그 $\\dfrac{6\\pi}{18\\pi}=\\dfrac{1}{3}$이므로 부채꼴의 중심각은 $360°\\times\\dfrac{1}{3}=120°$예요.',
      easy: '고깔모자를 옆선을 따라 잘라 펼쳐 보세요. 부채 모양(부채꼴)이 나와요. 펼치기 전 모자의 둥근 아래 테두리가 그대로 부채꼴의 둥근 가장자리(호)가 되니까, **호의 길이 = 밑면의 둘레**예요. 부채꼴의 반지름은 모자의 꼭대기에서 테두리까지의 길이(모선)이고요.\n\n두루마리 휴지의 심(원기둥의 옆면)을 세로로 잘라 펼치면 직사각형이 되고, 그 가로의 길이는 심의 둘레와 같아요.',
      fig: coneNetFig(120, { l: '9 cm', r: '3 cm', angle: '120°', alt: '반지름 9 cm, 중심각 120도인 부채꼴과 반지름 3 cm 인 원으로 이루어진 원뿔의 전개도' }),
      check: {
        type: 'ox',
        q: '원뿔의 전개도에서 옆면인 부채꼴의 호의 길이는 원뿔의 모선의 길이와 같아요.',
        answer: false,
        explain: '부채꼴의 **반지름**이 모선의 길이와 같아요. 부채꼴의 **호의 길이**는 밑면인 원의 둘레의 길이와 같아요.',
      },
    },
  ],

  examples: [
    {
      q: '팔각뿔대의 면, 모서리, 꼭짓점의 개수를 각각 구하세요.',
      steps: [
        '팔각뿔대의 밑면은 팔각형 2개, 옆면은 사다리꼴 8개예요. 그래서 면은 $8+2=10$(개)예요.',
        '모서리는 위 밑면에 8개, 아래 밑면에 8개, 두 밑면을 잇는 옆 모서리가 8개 있어요. $8\\times3=24$(개)예요.',
        '꼭짓점은 위 밑면에 8개, 아래 밑면에 8개로 $8\\times2=16$(개)예요.',
      ],
      answer: '면 10개, 모서리 24개, 꼭짓점 16개',
    },
    {
      q: '밑면의 반지름의 길이가 5 cm, 모선의 길이가 12 cm인 원뿔의 전개도에서 옆면인 부채꼴의 중심각의 크기를 구하세요.',
      fig: coneNetFig(150, { l: '12 cm', r: '5 cm', angle: '?', alt: '반지름 12 cm 인 부채꼴과 반지름 5 cm 인 원으로 이루어진 원뿔의 전개도' }),
      steps: [
        '부채꼴의 호의 길이는 밑면의 둘레와 같아요. $2\\pi\\times5=10\\pi$ (cm)',
        '부채꼴의 반지름은 모선의 길이 12 cm이므로, 반지름이 12 cm인 원 전체의 둘레는 $2\\pi\\times12=24\\pi$ (cm)예요.',
        '호의 길이는 원 전체 둘레의 $\\dfrac{10\\pi}{24\\pi}=\\dfrac{5}{12}$예요.',
        '중심각은 $360°\\times\\dfrac{5}{12}=150°$예요.',
      ],
      answer: '$150°$',
    },
  ],

  terms: [
    { term: '다면체', def: '다각형인 면으로만 둘러싸인 입체도형이에요. 면의 개수에 따라 사면체, 오면체, 육면체 … 라고 해요.' },
    { term: '각뿔대', def: '각뿔을 밑면에 평행한 평면으로 잘랐을 때 생기는 두 입체도형 가운데 각뿔이 아닌 쪽이에요. 옆면은 모두 사다리꼴이에요.' },
    { term: '정다면체', def: '모든 면이 합동인 정다각형이고 각 꼭짓점에 모인 면의 개수가 같은 다면체예요. 정사면체, 정육면체, 정팔면체, 정십이면체, 정이십면체의 5가지뿐이에요.' },
    { term: '회전체', def: '평면도형을 한 직선을 축으로 하여 1회전 시킬 때 생기는 입체도형이에요. 예: 원기둥, 원뿔, 원뿔대, 구' },
    { term: '회전축', def: '회전체를 만들 때 축으로 쓴 직선이에요.' },
    { term: '모선', def: '원기둥이나 원뿔에서 옆면을 만드는 선분이에요. 원뿔의 전개도에서 부채꼴의 반지름이 모선의 길이와 같아요.' },
    { term: '원뿔대', def: '원뿔을 밑면에 평행한 평면으로 잘랐을 때 생기는 두 입체도형 가운데 원뿔이 아닌 쪽이에요.' },
    { term: '전개도', def: '입체도형의 겉면을 잘라 평면 위에 펼쳐 놓은 그림이에요.' },
    { term: '단면', def: '입체도형을 평면으로 잘랐을 때 생기는 면이에요. 회전체를 회전축에 수직인 평면으로 자른 단면은 원이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: '개', concept: 0,
      q: '육각기둥의 모서리는 몇 개일까요?',
      fig: polySolid(6, 'prism', '육각기둥의 겨냥도. 보이지 않는 모서리는 점선'),
      answer: '18',
      wrong: [
        { a: '12', why: '꼭짓점의 개수를 구했어요. 모서리는 위 밑면 6개, 아래 밑면 6개, 옆 모서리 6개예요.' },
        { a: '8', why: '면의 개수를 구했어요. 묻는 것은 모서리의 개수예요.' },
      ],
      explain: '육각기둥의 모서리는 두 밑면에 6개씩, 옆 모서리 6개로 $6\\times3=18$(개)예요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '다음 중 다면체가 **아닌** 것은 무엇일까요?',
      choices: ['원기둥', '삼각뿔', '오각기둥', '사각뿔대'],
      answer: 0,
      why: [
        '',
        '삼각뿔은 삼각형 4개로 둘러싸인 다면체(사면체)예요.',
        '오각기둥은 오각형 2개와 직사각형 5개로 둘러싸인 다면체(칠면체)예요.',
        '사각뿔대는 사각형 2개와 사다리꼴 4개로 둘러싸인 다면체(육면체)예요.',
      ],
      explain: '원기둥은 옆면이 굽은 면(곡면)이라서 다각형인 면으로만 둘러싸여 있지 않아요. 그래서 다면체가 아니에요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 0,
      q: '다음 중 칠면체가 **아닌** 것은 무엇일까요?',
      choices: ['칠각뿔', '오각기둥', '육각뿔', '오각뿔대'],
      answer: 0,
      why: [
        '',
        '오각기둥은 면이 $5+2=7$(개)라서 칠면체예요.',
        '육각뿔은 면이 $6+1=7$(개)라서 칠면체예요.',
        '오각뿔대는 면이 $5+2=7$(개)라서 칠면체예요.',
      ],
      explain: '칠각뿔은 옆면 7개와 밑면 1개로 면이 $7+1=8$(개)인 팔면체예요. 이름의 "칠"은 밑면의 모양(칠각형)을 뜻해요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 0,
      q: '각뿔대의 옆면은 모두 직사각형이에요.',
      answer: false,
      explain: '각뿔대의 두 밑면은 크기가 달라서 옆면은 위가 좁고 아래가 넓은 **사다리꼴**이에요. 옆면이 직사각형인 것은 각기둥이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '한 꼭짓점에 모인 면의 개수가 4개인 정다면체는 무엇일까요?',
      choices: ['정팔면체', '정사면체', '정이십면체', '정십이면체'],
      answer: 0,
      why: [
        '',
        '정사면체는 한 꼭짓점에 면이 3개 모여요.',
        '정이십면체는 한 꼭짓점에 면이 5개 모여요.',
        '정십이면체는 한 꼭짓점에 면이 3개 모여요.',
      ],
      explain: '정삼각형 4개가 한 꼭짓점에 모인 정다면체는 정팔면체예요. ($60°\\times4=240°<360°$)',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '정이십면체의 꼭짓점은 몇 개일까요?',
      answer: '12',
      wrong: [
        { a: '30', why: '모서리의 개수예요. 정이십면체의 꼭짓점은 12개예요.' },
        { a: '20', why: '면의 개수예요. 정이십면체는 면이 20개, 꼭짓점이 12개예요.' },
      ],
      explain: '정이십면체는 면 20개, 모서리 30개, 꼭짓점 12개예요. (면 20개의 꼭짓점 $20\\times3=60$개가 5개씩 모이므로 $60\\div5=12$)',
    },
    {
      id: 'p7', level: 2, type: 'choice', concept: 2,
      q: '그림과 같은 정사면체의 전개도를 접었을 때, 모서리 AD와 겹치는 모서리는 무엇일까요?',
      fig: { type: 'polygon', points: TETRA, labels: ['A', 'D', 'B', 'E', 'C', 'F'], fill: true, segments: [{ from: TETRA[1], to: TETRA[3] }, { from: TETRA[3], to: TETRA[5] }, { from: TETRA[5], to: TETRA[1] }], alt: '큰 정삼각형 ABC 의 세 변의 가운데 점 D, E, F 를 이어 4개로 나눈 정사면체의 전개도' },
      choices: ['선분 BD', '선분 AF', '선분 CE', '선분 DE'],
      answer: 0,
      why: [
        '',
        'AF는 AD와 같은 삼각형 ADF의 다른 변이에요. 접으면 AF는 CF와 겹쳐요.',
        'CE는 BE와 겹쳐요. 점 A, B가 만나므로 A 쪽 변 AD는 B 쪽 변 BD와 겹쳐요.',
        'DE는 가운데 삼각형의 변이라 접는 선이 될 뿐 다른 모서리와 겹치지 않아요.',
      ],
      hint: '접으면 꼭짓점 A, B, C가 한 점에서 만나요. 점 D에서 만나는 두 바깥 변을 찾아보세요.',
      explain: '전개도를 접으면 A와 B가 만나고, D는 그대로이므로 선분 AD와 선분 BD가 겹쳐요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '그림과 같은 정육면체의 전개도를 접었을 때, 면 **가**와 마주 보는(평행한) 면은 무엇일까요?',
      fig: cubeNetFig(['가', '나', '다', '라', '마', '바'], '정사각형 6개로 된 십자 모양 전개도. 윗줄에 가, 가운뎃줄에 왼쪽부터 나, 다, 라, 마, 아랫줄에 바가 있고 가와 바는 다의 위와 아래에 붙어 있어요'),
      choices: ['면 바', '면 다', '면 라', '면 마'],
      answer: 0,
      why: [
        '',
        '면 다는 면 가와 변을 맞대고 있어서, 접으면 이웃한 면이 돼요.',
        '면 라는 접으면 면 가와 모서리를 맞대는 이웃한 면이에요.',
        '면 마는 접으면 면 가와 모서리를 맞대는 이웃한 면이에요.',
      ],
      hint: '한 줄로 이어진 정사각형 세 개에서 첫째와 셋째는 접으면 마주 봐요.',
      explain: '세로로 이어진 가–다–바에서 가운데 면 다를 바닥으로 놓고 접으면, 가와 바가 서로 마주 봐요. (같은 방법으로 나와 라, 다와 마가 마주 봐요.)',
    },
    {
      id: 'p9', level: 1, type: 'choice', concept: 3,
      q: '그림과 같이 두 각이 직각인 사다리꼴을 직선 ℓ을 회전축으로 하여 1회전 시킬 때 생기는 회전체는 무엇일까요?',
      fig: spinFig([[0, 0], [3, 0], [1.5, 3], [0, 3]], '두 각이 직각인 사다리꼴. 두 직각을 낀 변이 회전축 ℓ 위에 있어요'),
      choices: ['원뿔대', '원뿔', '원기둥', '구'],
      answer: 0,
      why: [
        '',
        '원뿔은 직각삼각형을 돌려야 생겨요. 이 도형은 윗변도 있어서 꼭대기가 뾰족하지 않아요.',
        '원기둥은 직사각형을 돌려야 생겨요. 이 도형은 윗변과 아랫변의 길이가 달라요.',
        '구는 반원을 지름을 축으로 돌려서 생겨요.',
      ],
      explain: '두 밑변이 회전축에 수직이고 길이가 다르므로, 돌리면 크기가 다른 두 원이 밑면이 되는 원뿔대가 생겨요.',
    },
    {
      id: 'p10', level: 1, type: 'choice', concept: 4,
      q: '회전체와 그 회전체를 **회전축을 포함하는 평면**으로 자른 단면의 모양을 짝 지은 것으로 **옳지 않은** 것은 무엇일까요?',
      choices: ['원기둥 – 직사각형', '원뿔 – 이등변삼각형', '구 – 원', '원뿔대 – 원'],
      answer: 3,
      why: [
        '옳은 짝이에요. 원기둥을 회전축을 따라 자르면 직사각형이 나와요.',
        '옳은 짝이에요. 원뿔을 회전축을 따라 자르면 이등변삼각형이 나와요.',
        '옳은 짝이에요. 구는 어느 방향으로 잘라도 원이 나와요.',
        '',
      ],
      explain: '원뿔대를 회전축을 포함하는 평면으로 자르면 **사다리꼴**이 나와요. 원은 회전축에 **수직인** 평면으로 잘랐을 때의 단면이에요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: 'π cm', concept: 5,
      q: '밑면의 반지름의 길이가 4 cm, 높이가 10 cm인 원기둥의 전개도에서 옆면인 직사각형의 가로의 길이를 $\\square\\pi$ cm라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      fig: cylNetFig({ h: '10 cm', r: '4 cm', w: '?', alt: '원 두 개와 직사각형으로 이루어진 원기둥의 전개도' }),
      answer: '8',
      hint: '직사각형의 가로는 밑면을 한 바퀴 감싸요.',
      wrong: [
        { a: '4', why: '원의 둘레를 $\\pi r$로 계산했어요. 원의 둘레는 $2\\pi r$이에요.' },
        { a: '16', why: '밑면의 넓이 $\\pi r^{2}$을 구했어요. 가로의 길이는 밑면의 둘레와 같아요.' },
      ],
      explain: '옆면인 직사각형의 가로의 길이는 밑면인 원의 둘레와 같아요. $2\\pi\\times4=8\\pi$ (cm)예요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: '°', concept: 5,
      q: '밑면의 반지름의 길이가 4 cm, 모선의 길이가 10 cm인 원뿔의 전개도에서 옆면인 부채꼴의 중심각의 크기는 몇 도일까요?',
      fig: coneNetFig(144, { l: '10 cm', r: '4 cm', angle: '?', alt: '반지름 10 cm 인 부채꼴과 반지름 4 cm 인 원으로 이루어진 원뿔의 전개도' }),
      answer: '144',
      hint: '부채꼴의 호의 길이는 밑면의 둘레와 같아요.',
      wrong: [{ a: '216', why: '원에서 부채꼴을 빼고 남은 부분의 중심각을 구했어요. 호의 길이 $8\\pi$가 둘레 $20\\pi$의 몇 분의 몇인지 보세요.' }],
      explain: '호의 길이는 $2\\pi\\times4=8\\pi$ (cm), 반지름 10 cm인 원의 둘레는 $20\\pi$ cm예요. $\\dfrac{8\\pi}{20\\pi}=\\dfrac{2}{5}$이므로 중심각은 $360°\\times\\dfrac{2}{5}=144°$예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 0,
      q: '모서리의 개수와 꼭짓점의 개수의 합이 50인 각기둥의 면은 몇 개일까요?',
      answer: '12',
      hint: '$n$각기둥의 모서리는 $3n$개, 꼭짓점은 $2n$개예요.',
      wrong: [{ a: '10', why: '밑면이 십각형이라는 것까지 구했어요. 십각기둥의 면은 옆면 10개와 밑면 2개예요.' }],
      explain: '$n$각기둥이라고 하면 $3n+2n=50$, $5n=50$이므로 $n=10$이에요. 십각기둥의 면은 $10+2=12$(개)예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '정다면체에 대한 설명으로 옳은 것은 무엇일까요?',
      choices: [
        '정십이면체와 정이십면체는 모서리의 개수가 같아요.',
        '정팔면체의 면은 정사각형이에요.',
        '한 꼭짓점에 모인 면의 개수가 가장 많은 것은 정팔면체예요.',
        '꼭짓점의 개수가 가장 많은 것은 정이십면체예요.',
      ],
      answer: 0,
      why: [
        '',
        '정팔면체의 면은 정삼각형이에요. 면이 정사각형인 정다면체는 정육면체뿐이에요.',
        '정팔면체는 4개, 정이십면체는 5개가 모여요. 가장 많은 것은 정이십면체예요.',
        '정이십면체의 꼭짓점은 12개예요. 가장 많은 것은 꼭짓점이 20개인 정십이면체예요.',
      ],
      explain: '정십이면체(면 12, 모서리 30, 꼭짓점 20)와 정이십면체(면 20, 모서리 30, 꼭짓점 12)는 모서리가 30개로 같아요. 면과 꼭짓점의 개수는 서로 바뀌어 있어요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '정이십면체는 정삼각형 20개로 둘러싸여 있고, 한 꼭짓점에 면이 5개씩 모여요. 이것만 이용하여 정이십면체의 꼭짓점의 개수를 구하세요.',
      answer: '12',
      hint: '면 20개를 따로 떼어 놓았을 때 삼각형의 꼭짓점은 모두 몇 개인지 먼저 세어 보세요.',
      wrong: [
        { a: '60', why: '면을 따로 떼어 놓았을 때의 꼭짓점 수예요. 입체에서는 그 꼭짓점이 5개씩 한 점에 모여요.' },
        { a: '30', why: '모서리의 개수예요. 꼭짓점은 $60\\div5$로 구해요.' },
      ],
      explain: '정삼각형 20개의 꼭짓점은 따로 세면 $20\\times3=60$(개)예요. 입체에서는 한 꼭짓점에 면이 5개씩 모이므로, 실제 꼭짓점은 $60\\div5=12$(개)예요. (모서리도 같은 방법으로 $60\\div2=30$(개))',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 5,
      q: '원뿔의 전개도에서 옆면이 반지름의 길이가 12 cm이고 중심각의 크기가 $120°$인 부채꼴이에요. 이 원뿔의 밑면의 반지름의 길이는 몇 cm일까요?',
      answer: '4',
      hint: '부채꼴의 호의 길이와 밑면의 둘레가 같아요.',
      wrong: [
        { a: '8', why: '밑면의 지름을 구했어요. $2\\pi r=8\\pi$에서 $r=4$예요.' },
        { a: '12', why: '모선의 길이(부채꼴의 반지름)를 썼어요. 밑면의 반지름은 호의 길이로 구해요.' },
      ],
      explain: '부채꼴의 호의 길이는 $2\\pi\\times12\\times\\dfrac{120}{360}=8\\pi$ (cm)예요. 이것이 밑면의 둘레 $2\\pi r$과 같으므로 $2\\pi r=8\\pi$, $r=4$ (cm)예요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '그림과 같이 회전축 ℓ에서 떨어져 있는 직사각형을 ℓ을 회전축으로 하여 1회전 시켰어요. 이 회전체를 **회전축을 포함하는 평면**으로 자른 단면의 모양은 무엇일까요?',
      fig: spinFig([[1, 0], [3, 0], [3, 3], [1, 3]], '회전축 ℓ에서 1만큼 떨어진 곳에 놓인 직사각형'),
      choices: ['직사각형 2개가 떨어져 있는 모양', '직사각형 1개', '두 원 사이의 고리 모양', '원 2개'],
      answer: 0,
      why: [
        '',
        '직사각형과 회전축 사이가 비어 있어서, 회전체는 가운데가 뚫린 관 모양이에요. 단면 가운데에도 빈 곳이 생겨요.',
        '고리 모양은 회전축에 **수직인** 평면으로 잘랐을 때의 단면이에요.',
        '원은 회전축에 수직으로 잘라야 나와요. 회전축을 포함하는 단면은 돌린 도형과 그 대칭인 도형이에요.',
      ],
      hint: '회전축을 포함하는 단면은 돌린 평면도형과, 그것을 회전축에 대하여 뒤집은 도형을 붙인 모양이에요.',
      explain: '회전체는 가운데가 뚫린 원기둥(관) 모양이에요. 회전축을 포함하는 평면으로 자르면 처음 직사각형과, 회전축에 대하여 대칭인 직사각형이 떨어져서 나타나요.',
    },
  ],

  deeper: [
    {
      title: '오일러의 공식: 꼭짓점 − 모서리 + 면 = 2',
      body: '스위스의 수학자 오일러는 볼록한 다면체라면 언제나\n\n(꼭짓점의 개수) $-$ (모서리의 개수) $+$ (면의 개수) $=2$\n\n가 성립한다는 것을 알아냈어요.\n\n| 다면체 | 꼭짓점 | 모서리 | 면 | 계산 |\n|---|---|---|---|---|\n| 정육면체 | 8 | 12 | 6 | $8-12+6=2$ |\n| 오각뿔 | 6 | 10 | 6 | $6-10+6=2$ |\n| 정이십면체 | 12 | 30 | 20 | $12-30+20=2$ |\n\n$n$각기둥으로 확인해 볼까요? $2n-3n+(n+2)=2$로 $n$이 무엇이든 성립해요. 개수를 세다가 헷갈릴 때 이 공식으로 검산할 수 있어요.',
    },
    {
      title: '생활 속의 회전체',
      body: '도자기를 빚는 물레, 나무를 깎는 선반은 재료를 빠르게 돌리면서 칼을 대어 모양을 만들어요. 그래서 꽃병, 그릇, 야구 방망이처럼 회전축에 수직으로 자르면 단면이 원인 물건이 많아요.\n\n원뿔대 모양도 흔해요. 종이컵, 양동이, 화분은 위가 넓고 아래가 좁은 원뿔대 모양이라서 여러 개를 포개어 쌓을 수 있어요.',
    },
  ],

  faq: [
    {
      q: '각뿔대의 두 밑면은 합동이에요?',
      a: '아니에요. 두 밑면은 서로 평행하고 모양은 같지만 크기가 달라서 합동이 아니에요. 각기둥의 두 밑면은 합동이라는 점과 구별해요.',
    },
    {
      q: '축구공은 정다면체예요?',
      a: '아니에요. 흔히 보는 축구공 무늬는 정오각형 12개와 정육각형 20개로 이루어져 있어요. 면의 모양이 두 가지라서 "모든 면이 합동인 정다각형"이라는 조건에 맞지 않아요.',
    },
    {
      q: '구는 왜 전개도가 없어요?',
      a: '구의 겉면은 어느 부분을 떼어 내도 둥글게 휘어 있어서, 찢거나 늘이지 않고는 평평하게 펼 수 없어요. 그래서 원기둥이나 원뿔과 달리 전개도를 그릴 수 없어요. 귤껍질을 평평하게 펴려고 하면 꼭 갈라지는 것과 같아요.',
    },
  ],

  mistakes: [
    '$n$각뿔의 면을 $n+2$개라고 세는 실수 — 각뿔은 밑면이 1개라서 면이 $n+1$개예요. 밑면이 2개인 것은 각기둥과 각뿔대예요.',
    '원뿔의 전개도에서 부채꼴의 호의 길이가 모선의 길이와 같다고 생각하는 실수 — 호의 길이는 밑면의 둘레와 같고, 모선의 길이는 부채꼴의 반지름이에요.',
    '회전체의 단면은 언제나 원이라고 생각하는 실수 — 원은 회전축에 수직으로 자를 때이고, 회전축을 포함하도록 자르면 선대칭도형이 나와요.',
  ],

  gens: [
    {
      id: 'poly-count',
      level: 1,
      title: '각기둥·각뿔·각뿔대의 면, 모서리, 꼭짓점의 개수',
      make: function (R) {
        var kind = R.pick(['각기둥', '각뿔', '각뿔대']);
        var n = R.int(3, 12);
        var p = R.pick(['f', 'e', 'v']);
        var K = KINDS[kind], name = sino(n) + kind, ans = K[p](n);
        var list = [];
        ['각기둥', '각뿔', '각뿔대'].forEach(function (k2) {
          if (k2 === kind) return;
          list.push([KINDS[k2][p](n), sino(n) + k2 + '의 ' + PROP[p] + '의 개수예요. ' + kind + '의 ' + PROP[p] + R.josa(PROP[p], '은/는') + ' $' + K[p + 'tex'] + '$개예요.']);
        });
        ['f', 'e', 'v'].forEach(function (p2) {
          if (p2 === p) return;
          list.push([K[p2](n), PROP[p2] + '의 개수를 구했어요. 묻는 것은 ' + PROP[p] + '의 개수예요.']);
        });
        list.push([n, '밑면의 변의 개수만 셌어요. ' + kind + '의 ' + PROP[p] + R.josa(PROP[p], '은/는') + ' $' + K[p + 'tex'] + '$개예요.']);
        var tx = K[p + 'tex'];
        var how = (tx === '3n' || tx === '2n') ? tx.charAt(0) + '\\times' + n : n + '+' + tx.charAt(2);
        return {
          type: 'short', check: 'number', unit: '개', concept: 0,
          q: name + '의 ' + PROP[p] + R.josa(PROP[p], '은/는') + ' 몇 개일까요?',
          answer: String(ans),
          wrong: wrongList(ans, list),
          explain: '$n$' + kind + '의 ' + PROP[p] + R.josa(PROP[p], '은/는') + ' $' + K[p + 'tex'] + '$개예요. ' + name + R.josa(name, '은/는') + ' $n=' + n + '$이므로 $' + how + '=' + ans + '$(개)예요.',
        };
      },
    },
    {
      id: 'poly-reverse',
      level: 2,
      title: '개수로 입체도형 알아내기',
      make: function (R) {
        var kind = R.pick(['각기둥', '각뿔', '각뿔대']);
        var n = R.int(3, 12);
        var ps = R.shuffle(['f', 'e', 'v']);
        var p1 = ps[0], p2 = ps[1];
        if (kind === '각뿔' && p1 !== 'e' && p2 !== 'e') p2 = 'e';   // 각뿔은 면과 꼭짓점의 개수가 같아서 그 둘끼리는 묻지 않는다
        var K = KINDS[kind], given = K[p1](n), ans = K[p2](n);
        var t1 = K[p1 + 'tex'];
        var solve = '$' + t1 + '=' + given + '$에서 $n=' + n + '$';
        return {
          type: 'short', check: 'number', unit: '개', concept: 0,
          q: PROP[p1] + '의 개수가 ' + given + '개인 ' + kind + '의 ' + PROP[p2] + R.josa(PROP[p2], '은/는') + ' 몇 개일까요?',
          answer: String(ans),
          hint: '먼저 밑면이 몇 각형인지 알아내요. ' + kind + '의 ' + PROP[p1] + R.josa(PROP[p1], '은/는') + ' $' + t1 + '$개예요.',
          wrong: wrongList(ans, [
            [n, '밑면이 ' + sino(n) + '각형이라는 것까지 구했어요. ' + sino(n) + kind + '의 ' + PROP[p2] + '의 개수까지 구해요.'],
            [given, '주어진 ' + PROP[p1] + '의 개수를 그대로 썼어요. 묻는 것은 ' + PROP[p2] + '의 개수예요.'],
          ]),
          explain: '$n$' + kind + R.josa(kind, '이라고/라고') + ' 하면 ' + PROP[p1] + R.josa(PROP[p1], '은/는') + ' $' + t1 + '$개이므로 ' + solve + R.josa(n, '이에요/예요') + '. ' + sino(n) + kind + '의 ' + PROP[p2] + R.josa(PROP[p2], '은/는') + ' $' + K[p2 + 'tex'] + '$개, 곧 ' + ans + '개예요.',
        };
      },
    },
    {
      id: 'regular-poly',
      level: 1,
      title: '정다면체의 성질',
      make: function (R) {
        var P = R.pick(REGULAR);
        var mode = R.pick(['face', 'meet', 'f', 'e', 'v']);
        var all = '면 ' + P.f + '개, 모서리 ' + P.e + '개, 꼭짓점 ' + P.v + '개';
        if (mode === 'face') {
          var shapes = ['정삼각형', '정사각형', '정오각형', '정육각형'];
          var why = {
            '정삼각형': '면이 정삼각형인 정다면체는 정사면체, 정팔면체, 정이십면체예요.',
            '정사각형': '면이 정사각형인 정다면체는 정육면체뿐이에요.',
            '정오각형': '면이 정오각형인 정다면체는 정십이면체뿐이에요.',
            '정육각형': '정육각형은 3개만 모여도 $360°$라서 정다면체의 면이 될 수 없어요.',
          };
          return {
            type: 'choice', fixed: true, concept: 1,
            q: P.name + '의 면의 모양은 무엇일까요?',
            choices: shapes,
            answer: shapes.indexOf(P.face),
            why: shapes.map(function (s) { return s === P.face ? '' : why[s]; }),
            explain: P.name + R.josa(P.name, '은/는') + ' 합동인 ' + P.face + ' ' + P.f + '개로 둘러싸여 있고, 한 꼭짓점에 면이 ' + P.meet + '개씩 모여요.',
          };
        }
        if (mode === 'meet') {
          return {
            type: 'short', check: 'number', unit: '개', concept: 1,
            q: P.name + '에서 한 꼭짓점에 모인 면은 몇 개일까요?',
            answer: String(P.meet),
            wrong: wrongList(P.meet, [
              [P.v, '꼭짓점의 개수를 구했어요. 한 꼭짓점에 모이는 면의 개수를 물었어요.'],
              [P.f, '면 전체의 개수예요. 한 꼭짓점에 모이는 면만 세어요.'],
            ]),
            explain: P.name + R.josa(P.name, '은/는') + ' 한 꼭짓점에 ' + P.face + ' ' + P.meet + '개가 모여요. (' + all + ')',
          };
        }
        var list = [];
        ['f', 'e', 'v'].forEach(function (q2) { if (q2 !== mode) list.push([P[q2], PROP[q2] + '의 개수예요. 묻는 것은 ' + PROP[mode] + '의 개수예요.']); });
        return {
          type: 'short', check: 'number', unit: '개', concept: 1,
          q: P.name + '의 ' + PROP[mode] + R.josa(PROP[mode], '은/는') + ' 몇 개일까요?',
          answer: String(P[mode]),
          wrong: wrongList(P[mode], list),
          explain: P.name + R.josa(P.name, '은/는') + ' ' + all + '예요.',
        };
      },
    },
    {
      id: 'solid-net',
      level: 2,
      title: '원기둥·원뿔의 전개도',
      make: function (R) {
        var mode = R.pick(['cone-angle', 'cone-angle', 'cone-r', 'cyl']);
        var r, l, x, h, tries = 0;
        if (mode === 'cyl') {
          r = R.int(2, 12); h = R.int(3, 15);
          return {
            type: 'short', check: 'number', unit: 'π cm', concept: 5,
            q: '밑면의 반지름의 길이가 ' + r + ' cm, 높이가 ' + h + ' cm인 원기둥의 전개도에서 옆면인 직사각형의 가로의 길이를 $\\square\\pi$ cm라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
            fig: cylNetFig({ h: h + ' cm', r: r + ' cm', w: '?', alt: '원 두 개와 직사각형으로 이루어진 원기둥의 전개도' }),
            answer: String(2 * r),
            wrong: wrongList(2 * r, [
              [r, '원의 둘레를 $\\pi r$로 계산했어요. 원의 둘레는 $2\\pi r$이에요.'],
              [r * r, '밑면의 넓이 $\\pi r^{2}$을 구했어요. 가로의 길이는 밑면의 둘레와 같아요.'],
              [h, '높이를 썼어요. 높이는 직사각형의 세로의 길이예요.'],
            ]),
            explain: '옆면인 직사각형의 가로의 길이는 밑면인 원의 둘레와 같아요. $2\\pi\\times' + r + '=' + (2 * r) + '\\pi$ (cm)예요.',
          };
        }
        do { l = R.int(4, 18); r = R.int(1, l - 1); tries++; } while ((360 * r) % l !== 0 && tries < 200);
        if ((360 * r) % l !== 0) { l = 9; r = 3; }
        x = 360 * r / l;
        if (mode === 'cone-angle') {
          return {
            type: 'short', check: 'number', unit: '°', concept: 5,
            q: '밑면의 반지름의 길이가 ' + r + ' cm, 모선의 길이가 ' + l + ' cm인 원뿔의 전개도에서 옆면인 부채꼴의 중심각의 크기는 몇 도일까요?',
            fig: coneNetFig(x, { l: l + ' cm', r: r + ' cm', angle: '?', alt: '반지름 ' + l + ' cm 인 부채꼴과 반지름 ' + r + ' cm 인 원으로 이루어진 원뿔의 전개도' }),
            answer: String(x),
            hint: '부채꼴의 호의 길이는 밑면의 둘레와 같아요.',
            wrong: wrongList(x, [
              [360 - x, '원에서 부채꼴을 빼고 남은 부분의 중심각이에요. 호의 길이가 둘레의 몇 분의 몇인지 보세요.'],
              [2 * x, '반지름이 모선인 원의 둘레를 $\\pi l$로 보았어요. 둘레는 $2\\pi l$이에요.'],
            ]),
            explain: '호의 길이는 밑면의 둘레와 같아서 $2\\pi\\times' + r + '=' + (2 * r) + '\\pi$ (cm)예요. 반지름이 ' + l + ' cm인 원의 둘레는 $' + (2 * l) + '\\pi$ cm이므로, 중심각은 $360°\\times\\dfrac{' + (2 * r) + '\\pi}{' + (2 * l) + '\\pi}=' + x + '°$예요.',
          };
        }
        return {
          type: 'short', check: 'number', unit: 'cm', concept: 5,
          q: '원뿔의 전개도에서 옆면이 반지름의 길이가 ' + l + ' cm이고 중심각의 크기가 $' + x + '°$인 부채꼴이에요. 이 원뿔의 밑면의 반지름의 길이는 몇 cm일까요?',
          fig: coneNetFig(x, { l: l + ' cm', angle: x + '°', r: '?', alt: '반지름 ' + l + ' cm, 중심각 ' + x + '도인 부채꼴과 밑면인 원으로 이루어진 원뿔의 전개도' }),
          answer: String(r),
          hint: '부채꼴의 호의 길이를 먼저 구하고, 그것이 밑면의 둘레와 같다는 것을 이용해요.',
          wrong: wrongList(r, [
            [2 * r, '밑면의 지름을 구했어요. $2\\pi r=' + (2 * r) + '\\pi$에서 $r=' + r + '$' + R.josa(r, '이에요/예요') + '.'],
            [l, '모선의 길이를 썼어요. 모선은 부채꼴의 반지름이고, 밑면의 반지름과 달라요.'],
          ]),
          explain: '호의 길이는 $2\\pi\\times' + l + '\\times\\dfrac{' + x + '}{360}=' + (2 * r) + '\\pi$ (cm)예요. 이것이 밑면의 둘레 $2\\pi r$과 같으므로 $r=' + r + '$ (cm)예요.',
        };
      },
    },
  ],
});
})();
