/* 중1 수학 · 입체도형의 겉넓이와 부피
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 각기둥·각뿔·원기둥·원뿔·구·반구의 겨냥도는 아래 도우미가 직접 그린 svg
 *       (보이지 않는 모서리는 점선, 색은 currentColor·var(--fig-n)) */
(function () {
  var C1 = 'var(--fig-1, #2563eb)';
  // ---------- 수 도우미 ----------
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function fr(n, d) { d = d || 1; var g = gcd(n, d); return { n: n / g, d: d / g }; }
  function fstr(f) { return f.d === 1 ? String(f.n) : f.n + '/' + f.d; }
  function feq(f, g) { return f.n * g.d === g.n * f.d; }
  function ftex(f) { return f.d === 1 ? String(f.n) : '\\frac{' + f.n + '}{' + f.d + '}'; }
  function piTex(f) { if (f.d === 1) return (f.n === 1 ? '' : f.n) + '\\pi'; return '\\frac{' + f.n + '}{' + f.d + '}\\pi'; }
  // 조사 기준: 분수면 분자, 정수면 그 수
  function lead(f) { return f.n; }
  function wrongList(ans, list) {
    var seen = [ans], out = [];
    list.forEach(function (w) {
      if (seen.some(function (s) { return feq(s, w[0]); })) return;
      seen.push(w[0]);
      out.push({ a: fstr(w[0]), why: w[1] });
    });
    return out;
  }

  // ---------- 그림 도우미 ----------
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function pt(p) { return r1(p[0]) + ' ' + r1(p[1]); }
  function txt(p, s, o) {
    o = o || {};
    return '<text x="' + r1(p[0]) + '" y="' + r1(p[1]) + '" font-size="' + (o.size || 13) + '" text-anchor="' + (o.anchor || 'middle') + '" dominant-baseline="central" fill="currentColor">' + s + '</text>';
  }
  function seg(a, b, dash) {
    return '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" stroke="currentColor" stroke-width="' + (dash ? 1.5 : 2) + '"' +
      (dash ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>';
  }
  function dot(p) { return '<circle cx="' + r1(p[0]) + '" cy="' + r1(p[1]) + '" r="2.5" fill="currentColor"/>'; }
  function fillPath(d) { return '<path d="' + d + '" fill="' + C1 + '" fill-opacity="0.12" stroke="none"/>'; }
  function ellipse(cx, cy, rx, ry, full) {
    if (full) return '<ellipse cx="' + r1(cx) + '" cy="' + r1(cy) + '" rx="' + r1(rx) + '" ry="' + r1(ry) + '" fill="' + C1 + '" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>';
    var L = pt([cx - rx, cy]), Rr = pt([cx + rx, cy]);
    return '<path d="M ' + L + ' A ' + r1(rx) + ' ' + r1(ry) + ' 0 0 1 ' + Rr + '" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>' +
      '<path d="M ' + L + ' A ' + r1(rx) + ' ' + r1(ry) + ' 0 0 0 ' + Rr + '" fill="none" stroke="currentColor" stroke-width="2"/>';
  }
  function svgFig(w, h, body, alt) { return { type: 'svg', svg: '<svg viewBox="0 0 ' + w + ' ' + h + '">' + body + '</svg>', alt: alt }; }

  // 원기둥 o.r·o.h
  function cylinderFig(o) {
    o = o || {};
    var cx = 110, rx = 65, ry = 20, yt = 40, yb = 180;
    var body = fillPath('M ' + pt([cx - rx, yt]) + ' L ' + pt([cx - rx, yb]) + ' A ' + rx + ' ' + ry + ' 0 0 0 ' + pt([cx + rx, yb]) + ' L ' + pt([cx + rx, yt]) + ' Z');
    body += seg([cx - rx, yt], [cx - rx, yb]) + seg([cx + rx, yt], [cx + rx, yb]) + ellipse(cx, yt, rx, ry, true) + ellipse(cx, yb, rx, ry, false);
    if (o.r) body += seg([cx, yt], [cx + rx, yt], true) + dot([cx, yt]) + txt([cx + rx / 2, yt - 8], o.r, { size: 12 });
    if (o.h) body += txt([cx + rx + 8, (yt + yb) / 2], o.h, { anchor: 'start' });
    return svgFig(240, 215, body, o.alt || '원기둥');
  }
  // 원뿔 o.r·o.h·o.l
  function coneFig(o) {
    o = o || {};
    var cx = 110, rx = 65, ry = 20, ya = 25, yb = 180;
    var body = fillPath('M ' + pt([cx, ya]) + ' L ' + pt([cx - rx, yb]) + ' A ' + rx + ' ' + ry + ' 0 0 0 ' + pt([cx + rx, yb]) + ' Z');
    body += seg([cx, ya], [cx - rx, yb]) + seg([cx, ya], [cx + rx, yb]) + ellipse(cx, yb, rx, ry, false);
    if (o.h) body += seg([cx, ya], [cx, yb], true) + txt([cx - 6, (ya + yb) / 2 + 12], o.h, { anchor: 'end', size: 12 });
    if (o.r) body += seg([cx, yb], [cx + rx, yb], true) + txt([cx + rx / 2, yb + 8], o.r, { size: 12 });
    if (o.h || o.r) body += dot([cx, yb]);
    if (o.l) body += txt([cx + rx / 2 + 12, (ya + yb) / 2 - 6], o.l, { anchor: 'start' });
    return svgFig(240, 215, body, o.alt || '원뿔');
  }
  // 구 o.r
  function sphereFig(o) {
    o = o || {};
    var cx = 110, cy = 105, R = 80;
    var body = '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + C1 + '" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>' + ellipse(cx, cy, R, 20, false) + dot([cx, cy]);
    if (o.r) body += seg([cx, cy], [cx + R, cy], true) + txt([cx + R / 2, cy - 10], o.r, { size: 12 });
    return svgFig(220, 200, body, o.alt || '구');
  }
  // 반구 (평평한 면이 위) o.r
  function hemisphereFig(o) {
    o = o || {};
    var cx = 110, cy = 50, R = 85, ry = 22;
    var body = '<path d="M ' + pt([cx - R, cy]) + ' A ' + R + ' ' + R + ' 0 0 0 ' + pt([cx + R, cy]) + '" fill="' + C1 + '" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>';
    body += ellipse(cx, cy, R, ry, true) + dot([cx, cy]);
    if (o.r) body += seg([cx, cy], [cx + R, cy], true) + txt([cx + R / 2, cy - 9], o.r, { size: 12 });
    return svgFig(220, 150, body, o.alt || '반구');
  }
  // 직각삼각형을 밑면으로 하는 삼각기둥 (앞면이 밑면). a: 밑변, b: 높이(세로 변), c: 빗변, h: 기둥의 높이 — 모두 글
  function triPrismFig(o) {
    var P0 = [40, 170], P1 = [150, 170], P2 = [40, 80], d = [70, -45];
    function bk(p) { return [p[0] + d[0], p[1] + d[1]]; }
    var Q0 = bk(P0), Q1 = bk(P1), Q2 = bk(P2);
    var body = fillPath('M ' + pt(P0) + ' L ' + pt(P1) + ' L ' + pt(Q1) + ' L ' + pt(Q2) + ' L ' + pt(P2) + ' Z');
    body += seg(P0, Q0, true) + seg(Q0, Q1, true) + seg(Q0, Q2, true);
    body += '<path d="M ' + pt(P0) + ' L ' + pt(P1) + ' L ' + pt(P2) + ' Z" fill="' + C1 + '" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>';
    body += seg(P1, Q1) + seg(P2, Q2) + seg(Q1, Q2);
    body += '<path d="M 40 158 L 52 158 L 52 170" fill="none" stroke="currentColor" stroke-width="1.5"/>';
    if (o.a) body += txt([95, 186], o.a);
    if (o.b) body += txt([32, 125], o.b, { anchor: 'end' });
    if (o.c) body += txt([110, 110], o.c);
    if (o.h) body += txt([196, 150], o.h, { anchor: 'start' });
    return svgFig(270, 200, body, o.alt || '밑면이 직각삼각형인 삼각기둥');
  }
  // 정사각뿔 o.a: 밑변, o.s: 옆면 삼각형의 높이, o.h: 높이
  function sqPyramidFig(o) {
    o = o || {};
    var F0 = [30, 190], F1 = [170, 190], B0 = [90, 140], B1 = [230, 140], M = [130, 165], A = [130, 25];
    var body = fillPath('M ' + pt(F0) + ' L ' + pt(F1) + ' L ' + pt(B1) + ' L ' + pt(A) + ' Z');
    body += seg(F0, B0, true) + seg(B0, B1, true) + seg(A, B0, true);
    body += seg(F0, F1) + seg(F1, B1) + seg(A, F0) + seg(A, F1) + seg(A, B1);
    var mF = [(F0[0] + F1[0]) / 2, F0[1]];
    var mR = [(F1[0] + B1[0]) / 2, (F1[1] + B1[1]) / 2];
    if (o.s) body += seg(A, mR, true) + txt([mR[0] + 6, mR[1] + 8], o.s, { anchor: 'start', size: 12 });
    if (o.h) body += seg(A, M, true) + dot(M) + txt([124, 152], o.h, { anchor: 'end', size: 12 });
    if (o.a) body += txt([mF[0], F0[1] + 14], o.a);
    return svgFig(250, 215, body, o.alt || '밑면이 정사각형인 사각뿔');
  }
  // 원뿔대 (위 반지름 rt, 아래 rb 글)
  function coneFrustumFig(o) {
    o = o || {};
    var cx = 110, rt = 35, ryt = 10, yt = 55, rb = 75, ryb = 21, yb = 180;
    var body = fillPath('M ' + pt([cx - rt, yt]) + ' L ' + pt([cx - rb, yb]) + ' A ' + rb + ' ' + ryb + ' 0 0 0 ' + pt([cx + rb, yb]) + ' L ' + pt([cx + rt, yt]) + ' Z');
    body += seg([cx - rt, yt], [cx - rb, yb]) + seg([cx + rt, yt], [cx + rb, yb]) + ellipse(cx, yt, rt, ryt, true) + ellipse(cx, yb, rb, ryb, false);
    if (o.rt) body += seg([cx, yt], [cx + rt, yt], true) + dot([cx, yt]) + txt([cx + rt / 2, yt - 18], o.rt, { size: 12 });
    if (o.rb) body += seg([cx, yb], [cx + rb, yb], true) + dot([cx, yb]) + txt([cx + rb / 2, yb + 8], o.rb, { size: 12 });
    if (o.h) body += seg([cx, yt], [cx, yb], true) + txt([cx - 6, (yt + yb) / 2], o.h, { anchor: 'end', size: 12 });
    return svgFig(240, 215, body, o.alt || '원뿔대');
  }

Tutor.registerUnit({
  id: 'math-m1-11',
  course: 'math-m1',
  title: '입체도형의 겉넓이와 부피',
  summary: '기둥, 뿔, 구의 겉넓이와 부피를 구하는 방법을 알고 여러 입체도형에 활용해요.',
  goals: [
    '각기둥과 원기둥의 겉넓이와 부피를 구할 수 있어요.',
    '각뿔과 원뿔의 겉넓이와 부피를 구할 수 있어요.',
    '구의 겉넓이와 부피를 구할 수 있어요.',
    '여러 입체도형을 나누거나 빼서 겉넓이와 부피를 구할 수 있어요.',
  ],
  standards: ['[9수03-08]'],

  concepts: [
    {
      title: '기둥의 겉넓이',
      body: '입체도형의 겉면 전체의 넓이를 **겉넓이**라고 해요. 겉넓이는 전개도의 넓이와 같아요.\n\n기둥의 전개도는 합동인 밑면 2개와 옆면으로 이루어져 있어요. 옆면을 펼치면 가로가 **밑면의 둘레**, 세로가 **기둥의 높이**인 직사각형이 돼요.\n\n(기둥의 겉넓이) $=$ (밑넓이)$\\times2+$(옆넓이), $\\quad$ (옆넓이) $=$ (밑면의 둘레)$\\times$(높이)\n\n**원기둥**(밑면의 반지름 $r$, 높이 $h$): 밑넓이는 $\\pi r^{2}$, 옆면은 가로 $2\\pi r$, 세로 $h$인 직사각형이므로\n\n$S=2\\pi r^{2}+2\\pi rh$\n\n예: 밑면의 반지름이 3 cm, 높이가 5 cm인 원기둥의 겉넓이는 $2\\times9\\pi+2\\pi\\times3\\times5=18\\pi+30\\pi=48\\pi$ (cm²)예요.\n\n> ⚠️ 밑면은 **두 개**예요. 하나만 더하는 실수를 조심해요.',
      easy: '통조림 깡통에 종이 라벨을 붙인다고 생각해 보세요. 라벨을 떼어 펴면 직사각형인데, 가로는 깡통을 한 바퀴 두르는 길이(밑면의 둘레), 세로는 깡통의 높이예요.\n\n깡통 전체를 종이로 싸려면 이 라벨에 뚜껑과 바닥(원 2개)까지 더해야 해요. 그것이 겉넓이예요.',
      fig: cylinderFig({ r: '3 cm', h: '5 cm', alt: '밑면의 반지름이 3 cm, 높이가 5 cm 인 원기둥' }),
      check: {
        type: 'short', check: 'number', unit: 'cm²',
        q: '한 모서리의 길이가 3 cm인 정육면체의 겉넓이는 몇 cm²일까요?',
        answer: '54',
        wrong: [
          { a: '27', why: '부피를 구했어요. 겉넓이는 넓이가 $3\\times3=9$ (cm²)인 면 6개의 넓이의 합이에요.' },
          { a: '9', why: '한 면의 넓이만 구했어요. 정육면체의 면은 6개예요.' },
          { a: '36', why: '옆면 4개만 더했어요. 밑면 2개도 더해요.' },
        ],
        explain: '정육면체는 넓이가 $3\\times3=9$ (cm²)인 정사각형 6개로 둘러싸여 있어요. 겉넓이는 $9\\times6=54$ (cm²)예요.',
      },
    },
    {
      title: '기둥의 부피',
      body: '기둥의 부피는 **밑넓이에 높이를 곱해서** 구해요.\n\n(기둥의 부피) $=$ (밑넓이)$\\times$(높이), $\\quad V=Sh$\n\n밑면과 똑같은 모양의 얇은 판을 높이만큼 쌓아 올린 것이 기둥이라고 생각하면 이해가 쉬워요. 판 한 장의 부피가 밑넓이에 비례하고, 쌓은 높이만큼 늘어나지요.\n\n**원기둥**(밑면의 반지름 $r$, 높이 $h$): $V=\\pi r^{2}h$\n\n예: 밑면이 넓이 6 cm²인 삼각형이고 높이가 10 cm인 삼각기둥의 부피는 $6\\times10=60$ (cm³), 밑면의 반지름이 2 cm이고 높이가 5 cm인 원기둥의 부피는 $\\pi\\times2^{2}\\times5=20\\pi$ (cm³)예요.',
      easy: '동전을 차곡차곡 쌓으면 원기둥 모양이 되지요. 동전 한 개의 크기(밑넓이)가 같으니, 몇 층 쌓았는지(높이)만 알면 전체 양을 알 수 있어요.\n\n그래서 기둥은 모양이 삼각형이든 원이든 **(바닥 넓이) × (높이)** 하나로 부피를 구해요.',
      fig: triPrismFig({ a: '4 cm', b: '3 cm', c: '5 cm', h: '10 cm', alt: '밑면이 두 변 3 cm, 4 cm 사이의 각이 직각인 직각삼각형이고 높이가 10 cm 인 삼각기둥' }),
      check: {
        type: 'short', check: 'number', unit: 'π cm³',
        q: '밑면의 반지름의 길이가 2 cm, 높이가 5 cm인 원기둥의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
        answer: '20',
        wrong: [
          { a: '10', why: '반지름을 한 번만 곱했어요. 밑넓이는 $\\pi r^{2}=\\pi\\times2\\times2$예요.' },
          { a: '80', why: '지름 4 cm를 반지름처럼 썼어요. 밑넓이는 $\\pi\\times2^{2}$이에요.' },
        ],
        explain: '밑넓이는 $\\pi\\times2^{2}=4\\pi$ (cm²), 부피는 $4\\pi\\times5=20\\pi$ (cm³)예요.',
      },
    },
    {
      title: '뿔의 겉넓이',
      body: '뿔은 밑면이 하나뿐이에요.\n\n(뿔의 겉넓이) $=$ (밑넓이) $+$ (옆넓이)\n\n**각뿔**: 옆면은 삼각형이에요. 예를 들어 밑면이 한 변의 길이가 $a$인 정사각형이고, 옆면인 삼각형의 높이가 $s$인 사각뿔의 겉넓이는 $a^{2}+4\\times\\dfrac{1}{2}as$예요.\n\n**원뿔**(밑면의 반지름 $r$, 모선의 길이 $l$): 옆면을 펼치면 반지름이 $l$, 호의 길이가 $2\\pi r$인 부채꼴이에요. 부채꼴의 넓이 공식 $\\dfrac{1}{2}\\times(\\text{반지름})\\times(\\text{호의 길이})$를 쓰면\n\n(원뿔의 옆넓이) $=\\dfrac{1}{2}\\times l\\times2\\pi r=\\pi rl$\n\n$S=\\pi r^{2}+\\pi rl$\n\n예: 밑면의 반지름이 3 cm, 모선의 길이가 5 cm인 원뿔의 겉넓이는 $9\\pi+15\\pi=24\\pi$ (cm²)예요.\n\n> ⚠️ 원뿔의 옆넓이에는 높이가 아니라 **모선의 길이**를 써요.',
      easy: '고깔모자를 만들려면 부채꼴 모양 종이가 필요해요. 그 부채꼴의 반지름은 모자의 꼭대기에서 테두리까지 비스듬히 잰 길이(모선)이고, 둥근 가장자리는 테두리 둘레($2\\pi r$)와 같아요.\n\n부채꼴의 넓이는 $\\dfrac{1}{2}\\times$(반지름)$\\times$(호의 길이)이니, $\\dfrac{1}{2}\\times l\\times2\\pi r=\\pi rl$이에요. 여기에 바닥의 원($\\pi r^{2}$)을 더하면 원뿔의 겉넓이예요.',
      fig: coneFig({ r: '3 cm', l: '5 cm', alt: '밑면의 반지름이 3 cm, 모선의 길이가 5 cm 인 원뿔' }),
      check: {
        type: 'short', check: 'number', unit: 'π cm²',
        q: '밑면의 반지름의 길이가 3 cm, 모선의 길이가 5 cm인 원뿔의 겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
        answer: '24',
        wrong: [
          { a: '15', why: '옆넓이만 구했어요. 밑면인 원의 넓이 $9\\pi$도 더해요.' },
          { a: '9', why: '밑넓이만 구했어요. 옆넓이 $\\pi rl=15\\pi$도 더해요.' },
          { a: '39', why: '옆넓이를 $2\\pi rl$로 계산했어요. 부채꼴의 넓이는 $\\dfrac{1}{2}\\times l\\times2\\pi r=\\pi rl$이에요.' },
        ],
        explain: '밑넓이 $\\pi\\times3^{2}=9\\pi$, 옆넓이 $\\pi\\times3\\times5=15\\pi$이므로 겉넓이는 $9\\pi+15\\pi=24\\pi$ (cm²)예요.',
      },
    },
    {
      title: '뿔의 부피',
      body: '**뿔의 부피는 밑면이 합동이고 높이가 같은 기둥의 부피의 $\\dfrac{1}{3}$이에요.**\n\n(뿔의 부피) $=\\dfrac{1}{3}\\times$(밑넓이)$\\times$(높이), $\\quad V=\\dfrac{1}{3}Sh$\n\n**원뿔**(밑면의 반지름 $r$, 높이 $h$): $V=\\dfrac{1}{3}\\pi r^{2}h$\n\n밑면이 합동이고 높이가 같은 뿔 모양 그릇과 기둥 모양 그릇을 준비해요. 뿔 모양 그릇에 물을 가득 채워 기둥 모양 그릇에 부으면, **세 번** 부어야 가득 차요. 그래서 뿔의 부피는 기둥의 $\\dfrac{1}{3}$이에요.\n\n예: 밑면의 반지름이 3 cm, 높이가 4 cm인 원뿔의 부피는 $\\dfrac{1}{3}\\times\\pi\\times3^{2}\\times4=12\\pi$ (cm³)예요.\n\n> ⚠️ 뿔의 부피에서 높이는 꼭짓점에서 밑면에 수직으로 내린 길이예요. 모선이나 옆면 삼각형의 높이가 아니에요.',
      easy: '아이스크림 콘(원뿔)과, 바닥 크기와 높이가 똑같은 컵(원기둥)이 있다고 해 봐요. 콘에 물을 가득 담아 컵에 부으면 한 번, 두 번, 세 번째에야 컵이 가득 차요.\n\n그래서 뿔은 **같은 바닥, 같은 높이인 기둥의 3분의 1**만큼 들어가요. 기둥의 부피 공식에 $\\dfrac{1}{3}$만 곱하면 돼요.',
      fig: sqPyramidFig({ a: '6 cm', h: '4 cm', alt: '밑면이 한 변 6 cm 인 정사각형이고 높이가 4 cm 인 사각뿔' }),
      check: {
        type: 'choice',
        q: '밑면이 합동이고 높이가 같은 원뿔과 원기둥의 부피의 비 (원뿔) : (원기둥)은 무엇일까요?',
        choices: ['$1:3$', '$1:2$', '$2:3$'],
        answer: 0,
        why: [
          '',
          '반으로 생각했어요. 원뿔에 담은 물을 원기둥에 세 번 부어야 가득 차요.',
          '구와 원기둥의 부피의 비와 헷갈렸어요. 원뿔은 원기둥의 $\\dfrac{1}{3}$이에요.',
        ],
        explain: '뿔의 부피는 밑면이 합동이고 높이가 같은 기둥의 부피의 $\\dfrac{1}{3}$이므로 $1:3$이에요.',
      },
    },
    {
      title: '구의 겉넓이와 부피',
      body: '반지름의 길이가 $r$인 구의\n\n- 겉넓이: $S=4\\pi r^{2}$\n- 부피: $V=\\dfrac{4}{3}\\pi r^{3}$\n\n**겉넓이**: 구의 겉면을 끈으로 빈틈없이 감은 뒤, 그 끈을 풀어 반지름이 $r$인 원을 덮으면 원 4개를 덮을 수 있어요. 그래서 구의 겉넓이는 반지름이 같은 원의 넓이 $\\pi r^{2}$의 4배예요.\n\n**부피**: 구가 꼭 들어가는 원기둥(밑면의 반지름 $r$, 높이 $2r$)에 물을 가득 채우고 구를 넣었다가 빼면, 물이 처음의 $\\dfrac{1}{3}$만 남아요. 구의 부피는 원기둥 부피 $\\pi r^{2}\\times2r=2\\pi r^{3}$의 $\\dfrac{2}{3}$, 곧 $\\dfrac{4}{3}\\pi r^{3}$이에요.\n\n예: 반지름이 3 cm인 구의 겉넓이는 $4\\pi\\times3^{2}=36\\pi$ (cm²), 부피는 $\\dfrac{4}{3}\\pi\\times3^{3}=36\\pi$ (cm³)예요. (수는 같지만 단위가 달라요.)',
      easy: '귤 껍질을 잘게 벗겨서, 귤과 반지름이 같은 원을 종이에 그려 놓고 그 위에 껍질 조각을 깔아 보세요. 원을 4개쯤 덮을 수 있어요. 그래서 구의 겉넓이는 $4\\times\\pi r^{2}$이에요.\n\n부피는 "구가 꼭 맞는 통"과 비교해요. 통의 부피를 3이라고 하면 구는 2만큼이에요. 같은 통에 꼭 맞는 원뿔은 1만큼이고요.',
      fig: sphereFig({ r: '3 cm', alt: '반지름이 3 cm 인 구' }),
      check: {
        type: 'short', check: 'number', unit: 'π cm²',
        q: '반지름의 길이가 5 cm인 구의 겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
        answer: '100',
        wrong: [
          { a: '25', why: '원 하나의 넓이 $\\pi r^{2}$만 구했어요. 구의 겉넓이는 그 4배예요.' },
          { a: '20', why: '$4\\pi r$로 계산했어요. 반지름을 제곱해요: $4\\pi\\times5^{2}$' },
          { a: '500/3', why: '부피를 구했어요. 겉넓이는 $4\\pi r^{2}$이에요.' },
        ],
        explain: '$4\\pi\\times5^{2}=4\\pi\\times25=100\\pi$ (cm²)예요.',
      },
    },
    {
      title: '여러 가지 입체도형의 겉넓이와 부피',
      body: '복잡한 입체도형은 **아는 입체도형으로 나누거나, 큰 것에서 작은 것을 빼서** 구해요.\n\n- **반구**(반지름 $r$)의 겉넓이 $=$ (구의 겉넓이의 반) $+$ (잘린 면인 원) $=2\\pi r^{2}+\\pi r^{2}=3\\pi r^{2}$\n- **반구**의 부피 $=\\dfrac{1}{2}\\times\\dfrac{4}{3}\\pi r^{3}=\\dfrac{2}{3}\\pi r^{3}$\n- **뿔대**의 부피 $=$ (큰 뿔의 부피) $-$ (잘라 낸 작은 뿔의 부피)\n- **구멍이 뚫린 입체**의 부피 $=$ (바깥 입체) $-$ (구멍)\n- **회전체**는 돌려서 생기는 입체도형이 무엇인지(원기둥, 원뿔, 구, …) 먼저 알아낸 뒤 공식을 써요.\n\n> ⚠️ 입체를 자르면 잘린 자리에 새 면이 생겨요. 반구의 겉넓이에서 평평한 원을 빠뜨리지 않도록 해요. 반대로 두 입체를 붙이면 붙은 면은 겉넓이에서 빠져요.',
      easy: '레고 작품의 크기를 잴 때 블록 하나하나의 크기를 더하는 것처럼, 처음 보는 모양도 아는 모양 조각으로 나눠 보면 돼요.\n\n수박을 반으로 자른 반구를 생각해 보세요. 겉면은 껍질(구 겉넓이의 반)과 빨간 단면(원) 두 부분이에요. 그래서 $2\\pi r^{2}+\\pi r^{2}=3\\pi r^{2}$이에요.',
      fig: hemisphereFig({ r: '2 cm', alt: '반지름이 2 cm 인 반구' }),
      check: {
        type: 'short', check: 'number', unit: 'π cm²',
        q: '반지름의 길이가 2 cm인 반구의 겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
        answer: '12',
        wrong: [
          { a: '8', why: '둥근 겉면만 구했어요. 잘린 자리에 생긴 원의 넓이 $4\\pi$도 더해요.' },
          { a: '16', why: '구 전체의 겉넓이를 구했어요. 반구는 둥근 면이 그 반이에요.' },
        ],
        explain: '둥근 면은 구의 겉넓이의 반이므로 $\\dfrac{1}{2}\\times4\\pi\\times2^{2}=8\\pi$, 잘린 면인 원은 $\\pi\\times2^{2}=4\\pi$예요. 겉넓이는 $8\\pi+4\\pi=12\\pi$ (cm²)예요.',
      },
    },
  ],

  examples: [
    {
      q: '밑면의 반지름의 길이가 6 cm, 높이가 8 cm, 모선의 길이가 10 cm인 원뿔의 겉넓이와 부피를 구하세요.',
      fig: coneFig({ r: '6 cm', h: '8 cm', l: '10 cm', alt: '밑면의 반지름이 6 cm, 높이가 8 cm, 모선의 길이가 10 cm 인 원뿔' }),
      steps: [
        '밑넓이: $\\pi\\times6^{2}=36\\pi$ (cm²)',
        '옆넓이는 모선의 길이를 써요: $\\pi rl=\\pi\\times6\\times10=60\\pi$ (cm²)',
        '겉넓이: $36\\pi+60\\pi=96\\pi$ (cm²)',
        '부피는 높이를 써요: $\\dfrac{1}{3}\\times36\\pi\\times8=96\\pi$ (cm³)',
      ],
      answer: '겉넓이 $96\\pi$ cm², 부피 $96\\pi$ cm³',
    },
    {
      q: '반지름의 길이가 3 cm인 구가 꼭 들어가는 원기둥이 있어요. 이 원기둥과 밑면이 합동이고 높이가 같은 원뿔, 구, 원기둥의 부피의 비를 구하세요.',
      steps: [
        '원기둥은 밑면의 반지름 3 cm, 높이 $3\\times2=6$ (cm)예요. 부피는 $\\pi\\times3^{2}\\times6=54\\pi$ (cm³)',
        '구의 부피: $\\dfrac{4}{3}\\pi\\times3^{3}=36\\pi$ (cm³)',
        '원뿔의 부피: $\\dfrac{1}{3}\\times\\pi\\times3^{2}\\times6=18\\pi$ (cm³)',
        '(원뿔) : (구) : (원기둥) $=18\\pi:36\\pi:54\\pi=1:2:3$',
      ],
      answer: '$1:2:3$',
    },
  ],

  terms: [
    { term: '겉넓이', def: '입체도형의 겉면 전체의 넓이예요. 전개도의 넓이와 같아요. 단위는 cm², m² 등이에요.' },
    { term: '밑넓이', def: '입체도형의 한 밑면의 넓이예요.' },
    { term: '옆넓이', def: '입체도형의 옆면 전체의 넓이예요. 기둥의 옆넓이는 (밑면의 둘레)×(높이)예요.' },
    { term: '부피', def: '입체도형이 차지하는 공간의 크기예요. 단위는 cm³, m³ 등이에요.' },
    { term: '기둥의 부피', def: '(밑넓이)×(높이)예요. 원기둥은 $\\pi r^{2}h$예요.' },
    { term: '뿔의 부피', def: '밑면이 합동이고 높이가 같은 기둥의 부피의 $\\dfrac{1}{3}$이에요. 원뿔은 $\\dfrac{1}{3}\\pi r^{2}h$예요.' },
    { term: '원뿔의 옆넓이', def: '옆면인 부채꼴의 넓이로 $\\pi rl$이에요. ($r$: 밑면의 반지름, $l$: 모선의 길이)' },
    { term: '구의 겉넓이와 부피', def: '반지름이 $r$인 구의 겉넓이는 $4\\pi r^{2}$, 부피는 $\\dfrac{4}{3}\\pi r^{3}$이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 0,
      q: '가로 5 cm, 세로 4 cm, 높이 3 cm인 직육면체의 겉넓이는 몇 cm²일까요?',
      fig: { type: 'cuboid', w: 5, h: 3, d: 4, labels: { w: '5 cm', h: '3 cm', d: '4 cm' }, alt: '가로 5 cm, 세로 4 cm, 높이 3 cm 인 직육면체' },
      answer: '94',
      wrong: [
        { a: '60', why: '부피를 구했어요. 겉넓이는 여섯 면의 넓이의 합이에요.' },
        { a: '47', why: '서로 다른 세 면의 넓이만 더했어요. 마주 보는 면이 하나씩 더 있으니 2배 해요.' },
      ],
      explain: '밑넓이는 $5\\times4=20$, 밑면의 둘레는 $2\\times(5+4)=18$, 옆넓이는 $18\\times3=54$예요. 겉넓이는 $20\\times2+54=94$ (cm²)예요. ($2\\times(20+15+12)=94$로 구해도 같아요.)',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: 'cm³', concept: 1,
      q: '밑면이 그림과 같은 직각삼각형이고 높이가 10 cm인 삼각기둥의 부피는 몇 cm³일까요?',
      fig: triPrismFig({ a: '4 cm', b: '3 cm', c: '5 cm', h: '10 cm', alt: '밑면이 세 변 3 cm, 4 cm, 5 cm 인 직각삼각형이고 높이가 10 cm 인 삼각기둥' }),
      answer: '60',
      wrong: [
        { a: '120', why: '밑넓이를 $3\\times4=12$로 계산했어요. 삼각형의 넓이는 $\\dfrac{1}{2}\\times3\\times4=6$이에요.' },
        { a: '200', why: '빗변 5 cm를 넣어 $4\\times5\\times10$을 계산했어요. 밑넓이는 직각을 낀 두 변으로 구해요.' },
      ],
      explain: '밑넓이는 $\\dfrac{1}{2}\\times4\\times3=6$ (cm²)이므로 부피는 $6\\times10=60$ (cm³)예요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 0,
      q: '밑면이 그림과 같은 직각삼각형이고 높이가 10 cm인 삼각기둥의 겉넓이는 몇 cm²일까요?',
      fig: triPrismFig({ a: '4 cm', b: '3 cm', c: '5 cm', h: '10 cm', alt: '밑면이 세 변 3 cm, 4 cm, 5 cm 인 직각삼각형이고 높이가 10 cm 인 삼각기둥' }),
      answer: '132',
      hint: '옆면을 펼치면 가로가 밑면의 둘레인 직사각형이에요.',
      wrong: [
        { a: '126', why: '밑면을 하나만 더했어요. 기둥의 밑면은 2개예요.' },
        { a: '120', why: '옆넓이만 구했어요. 밑면 2개의 넓이도 더해요.' },
      ],
      explain: '밑넓이는 $\\dfrac{1}{2}\\times4\\times3=6$, 옆넓이는 (밑면의 둘레)$\\times$(높이)$=(3+4+5)\\times10=120$이에요. 겉넓이는 $6\\times2+120=132$ (cm²)예요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: 'π cm³', concept: 1,
      q: '밑면의 반지름의 길이가 3 cm, 높이가 7 cm인 원기둥의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      fig: cylinderFig({ r: '3 cm', h: '7 cm', alt: '밑면의 반지름이 3 cm, 높이가 7 cm 인 원기둥' }),
      answer: '63',
      wrong: [
        { a: '21', why: '반지름을 한 번만 곱했어요. 밑넓이는 $\\pi\\times3^{2}=9\\pi$예요.' },
        { a: '42', why: '옆넓이 $2\\pi rh$를 구했어요. 부피는 (밑넓이)$\\times$(높이)예요.' },
      ],
      explain: '$\\pi\\times3^{2}\\times7=63\\pi$ (cm³)예요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: 'π cm²', concept: 0,
      q: '밑면의 반지름의 길이가 3 cm, 높이가 7 cm인 원기둥의 겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      answer: '60',
      wrong: [
        { a: '51', why: '밑면을 하나만 더했어요. 원기둥의 밑면은 2개예요.' },
        { a: '42', why: '옆넓이만 구했어요. 두 밑면의 넓이 $2\\times9\\pi$도 더해요.' },
        { a: '39', why: '옆넓이를 $\\pi rh$로 계산했어요. 옆면의 가로는 밑면의 둘레 $2\\pi r$이에요.' },
      ],
      explain: '밑넓이 $9\\pi$ 두 개와 옆넓이 $2\\pi\\times3\\times7=42\\pi$를 더하면 $18\\pi+42\\pi=60\\pi$ (cm²)예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 2,
      q: '밑면이 한 변의 길이가 6 cm인 정사각형이고, 옆면이 모두 높이가 5 cm인 합동인 이등변삼각형인 사각뿔의 겉넓이는 몇 cm²일까요?',
      fig: sqPyramidFig({ a: '6 cm', s: '5 cm', alt: '밑면이 한 변 6 cm 인 정사각형이고 옆면인 삼각형의 높이가 5 cm 인 사각뿔' }),
      answer: '96',
      wrong: [
        { a: '156', why: '삼각형의 넓이에서 $\\dfrac{1}{2}$을 빠뜨렸어요. 옆면 하나는 $\\dfrac{1}{2}\\times6\\times5=15$예요.' },
        { a: '60', why: '옆넓이만 구했어요. 밑면인 정사각형의 넓이 36도 더해요.' },
      ],
      explain: '밑넓이는 $6\\times6=36$, 옆넓이는 $4\\times\\left(\\dfrac{1}{2}\\times6\\times5\\right)=60$이에요. 겉넓이는 $36+60=96$ (cm²)예요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', unit: 'cm³', concept: 3,
      q: '밑면이 한 변의 길이가 6 cm인 정사각형이고 높이가 4 cm인 사각뿔의 부피는 몇 cm³일까요?',
      fig: sqPyramidFig({ a: '6 cm', h: '4 cm', alt: '밑면이 한 변 6 cm 인 정사각형이고 높이가 4 cm 인 사각뿔' }),
      answer: '48',
      wrong: [{ a: '144', why: '$\\dfrac{1}{3}$을 곱하지 않았어요. 그것은 밑면과 높이가 같은 사각기둥의 부피예요.' }],
      explain: '$\\dfrac{1}{3}\\times(6\\times6)\\times4=\\dfrac{1}{3}\\times144=48$ (cm³)예요.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 3,
      q: '밑면이 합동이고 높이가 같을 때, 원뿔의 부피는 원기둥의 부피의 $\\dfrac{1}{2}$이에요.',
      answer: false,
      explain: '뿔의 부피는 밑면이 합동이고 높이가 같은 기둥의 부피의 $\\dfrac{1}{3}$이에요. 원뿔 그릇으로 물을 세 번 부어야 원기둥 그릇이 가득 차요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: 'π cm²', concept: 2,
      q: '밑면의 반지름의 길이가 5 cm, 높이가 12 cm, 모선의 길이가 13 cm인 원뿔의 겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      fig: coneFig({ r: '5 cm', h: '12 cm', l: '13 cm', alt: '밑면의 반지름이 5 cm, 높이가 12 cm, 모선의 길이가 13 cm 인 원뿔' }),
      answer: '90',
      hint: '옆넓이에는 높이와 모선 중 무엇을 써야 할까요?',
      wrong: [
        { a: '85', why: '옆넓이에 높이 12 cm를 썼어요. 옆면인 부채꼴의 반지름은 모선의 길이 13 cm예요.' },
        { a: '65', why: '옆넓이만 구했어요. 밑넓이 $25\\pi$도 더해요.' },
      ],
      explain: '밑넓이 $\\pi\\times5^{2}=25\\pi$, 옆넓이 $\\pi\\times5\\times13=65\\pi$이므로 겉넓이는 $90\\pi$ (cm²)예요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: 'π cm³', concept: 3,
      q: '밑면의 반지름의 길이가 5 cm, 높이가 12 cm, 모선의 길이가 13 cm인 원뿔의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      answer: '100',
      hint: '부피에는 높이와 모선 중 무엇을 써야 할까요?',
      wrong: [
        { a: '300', why: '$\\dfrac{1}{3}$을 곱하지 않았어요. 그것은 원기둥의 부피예요.' },
        { a: '325/3', why: '모선의 길이 13 cm를 높이로 썼어요. 부피에는 꼭짓점에서 밑면에 수직으로 잰 높이 12 cm를 써요.' },
      ],
      explain: '$\\dfrac{1}{3}\\times\\pi\\times5^{2}\\times12=\\dfrac{1}{3}\\times300\\pi=100\\pi$ (cm³)예요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: 'π cm³', concept: 4,
      q: '반지름의 길이가 6 cm인 구의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      fig: sphereFig({ r: '6 cm', alt: '반지름이 6 cm 인 구' }),
      answer: '288',
      wrong: [
        { a: '144', why: '겉넓이 $4\\pi r^{2}$을 구했어요. 부피는 $\\dfrac{4}{3}\\pi r^{3}$이에요.' },
        { a: '864', why: '$\\dfrac{4}{3}$ 대신 4를 곱했어요.' },
        { a: '216', why: '$r^{3}$만 계산했어요. $\\dfrac{4}{3}$를 곱해요.' },
      ],
      explain: '$\\dfrac{4}{3}\\pi\\times6^{3}=\\dfrac{4}{3}\\times216\\pi=288\\pi$ (cm³)예요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: 'π cm²', concept: 4,
      q: '지름의 길이가 10 cm인 구의 겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      answer: '100',
      wrong: [{ a: '400', why: '지름 10 cm를 반지름으로 썼어요. 반지름은 5 cm예요.' }],
      explain: '반지름은 $10\\div2=5$ (cm)이므로 겉넓이는 $4\\pi\\times5^{2}=100\\pi$ (cm²)예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '번', concept: 3,
      q: '밑면의 반지름이 3 cm, 높이가 12 cm인 원기둥 모양의 그릇에 물이 가득 들어 있어요. 이 물을 밑면의 반지름이 3 cm, 높이가 4 cm인 원뿔 모양의 그릇으로 가득 채워 퍼내려고 해요. 모두 몇 번 퍼내야 할까요?',
      answer: '9',
      hint: '두 그릇의 부피를 각각 구해 보세요.',
      wrong: [{ a: '3', why: '높이만 비교했어요. 원뿔은 높이가 같은 원기둥의 $\\dfrac{1}{3}$이라는 것까지 생각해요.' }],
      explain: '원기둥 그릇의 부피는 $\\pi\\times3^{2}\\times12=108\\pi$, 원뿔 그릇의 부피는 $\\dfrac{1}{3}\\times\\pi\\times3^{2}\\times4=12\\pi$예요. $108\\pi\\div12\\pi=9$이므로 9번이에요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
      q: '반지름의 길이가 3 cm인 구와, 밑면의 반지름의 길이가 3 cm인 원뿔의 부피가 같아요. 원뿔의 높이는 몇 cm일까요?',
      answer: '12',
      hint: '두 부피를 식으로 쓰고 같다고 놓아요.',
      wrong: [{ a: '4', why: '원뿔의 부피에서 $\\dfrac{1}{3}$을 빠뜨렸어요. $9\\pi\\times h=36\\pi$가 아니라 $\\dfrac{1}{3}\\times9\\pi\\times h=36\\pi$, 곧 $3\\pi h=36\\pi$에서 $h$를 구해요.' }],
      explain: '구의 부피는 $\\dfrac{4}{3}\\pi\\times3^{3}=36\\pi$예요. 원뿔의 부피 $\\dfrac{1}{3}\\times\\pi\\times3^{2}\\times h=3\\pi h$가 $36\\pi$와 같으므로 $h=12$ (cm)예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: 'π cm³', concept: 5,
      q: '밑면의 반지름이 6 cm, 높이가 8 cm인 원뿔을 밑면에 평행한 평면으로 잘랐더니, 위쪽에 밑면의 반지름이 3 cm, 높이가 4 cm인 작은 원뿔이 생겼어요. 아래쪽 원뿔대의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      fig: coneFrustumFig({ rt: '3 cm', rb: '6 cm', h: '4 cm', alt: '위 밑면의 반지름이 3 cm, 아래 밑면의 반지름이 6 cm, 높이가 4 cm 인 원뿔대' }),
      answer: '84',
      hint: '(큰 원뿔의 부피) − (작은 원뿔의 부피)',
      wrong: [
        { a: '12', why: '잘라 낸 작은 원뿔의 부피예요. 큰 원뿔에서 빼야 해요.' },
        { a: '96', why: '처음 큰 원뿔의 부피예요. 잘라 낸 작은 원뿔의 부피를 빼요.' },
        { a: '48', why: '원뿔대를 밑면의 반지름 6 cm, 높이 4 cm인 원뿔의 부피로 계산했어요. 큰 원뿔에서 작은 원뿔을 빼요.' },
      ],
      explain: '큰 원뿔: $\\dfrac{1}{3}\\times\\pi\\times6^{2}\\times8=96\\pi$\n\n작은 원뿔: $\\dfrac{1}{3}\\times\\pi\\times3^{2}\\times4=12\\pi$\n\n원뿔대의 부피는 $96\\pi-12\\pi=84\\pi$ (cm³)예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'π cm³', concept: 5,
      q: '가로 3 cm, 세로 5 cm인 직사각형이 있어요. 길이가 5 cm인 변을 회전축으로 하여 1회전 시킨 입체도형과, 길이가 3 cm인 변을 회전축으로 하여 1회전 시킨 입체도형의 부피의 차를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      answer: '30',
      hint: '두 경우 모두 원기둥이에요. 회전축이 되는 변이 높이, 다른 변이 밑면의 반지름이에요.',
      wrong: [{ a: '0', why: '두 원기둥의 부피가 같다고 생각했어요. 반지름은 제곱이 되므로 어느 변이 반지름이 되느냐에 따라 부피가 달라져요.' }],
      explain: '5 cm인 변이 축이면 반지름 3 cm, 높이 5 cm인 원기둥: $\\pi\\times3^{2}\\times5=45\\pi$\n\n3 cm인 변이 축이면 반지름 5 cm, 높이 3 cm인 원기둥: $\\pi\\times5^{2}\\times3=75\\pi$\n\n부피의 차는 $75\\pi-45\\pi=30\\pi$ (cm³)예요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'expr', concept: 5,
      q: '한 모서리의 길이가 6 cm인 정육면체 모양의 상자 안에 구가 꼭 맞게 들어 있어요. 상자 안에서 구를 뺀 빈 공간의 부피는 몇 cm³일까요? $\\pi$를 써서 나타내고, 단위는 쓰지 않아요. ($\\pi$는 pi로 써도 돼요.)',
      answer: '216-36π',
      hint: '구가 꼭 맞으면 구의 지름이 정육면체의 한 모서리의 길이와 같아요.',
      wrong: [
        { a: '216-288π', why: '구의 반지름을 6 cm로 보았어요. 지름이 6 cm이니 반지름은 3 cm예요.' },
        { a: '36π', why: '구의 부피만 구했어요. 정육면체의 부피에서 빼요.' },
      ],
      explain: '정육면체의 부피는 $6^{3}=216$ (cm³)예요. 구의 반지름은 3 cm이므로 구의 부피는 $\\dfrac{4}{3}\\pi\\times3^{3}=36\\pi$ (cm³)예요. 빈 공간은 $216-36\\pi$ (cm³)예요.',
    },
  ],

  deeper: [
    {
      title: '아르키메데스가 가장 자랑스러워한 발견',
      body: '구가 꼭 들어가는 원기둥이 있을 때, 같은 원기둥에 꼭 맞는 원뿔과 구와 원기둥의 부피의 비는\n\n(원뿔) : (구) : (원기둥) $=1:2:3$\n\n이에요. 겉넓이도 놀라워요. 구의 겉넓이 $4\\pi r^{2}$은 원기둥의 옆넓이 $2\\pi r\\times2r=4\\pi r^{2}$과 똑같아요.\n\n고대 그리스의 아르키메데스는 이 관계를 밝혀낸 것을 매우 자랑스러워해서, 자신의 무덤에 원기둥 안에 구가 들어 있는 그림을 새겨 달라고 했다는 이야기가 전해져요.',
    },
    {
      title: '뿔의 부피가 1/3인 까닭을 정육면체로 확인하기',
      body: '정육면체의 한 꼭짓점을 골라, 그 꼭짓점과 나머지 꼭짓점들을 잇는 선을 따라 자르면, 그 꼭짓점을 공통인 꼭짓점으로 하는 **합동인 사각뿔 3개**로 나눌 수 있어요. 각 사각뿔의 밑면은 그 꼭짓점을 포함하지 않는 정육면체의 한 면이고, 높이는 정육면체의 한 모서리의 길이예요.\n\n합동인 세 사각뿔이 정육면체를 꽉 채우니, 사각뿔 하나의 부피는 정육면체 부피의 $\\dfrac{1}{3}$이에요. 곧 (밑넓이)$\\times$(높이)$\\times\\dfrac{1}{3}$이지요. 물 붓기 실험의 결과와 똑같아요.',
    },
  ],

  faq: [
    {
      q: '겉넓이와 부피는 단위가 왜 달라요?',
      a: '겉넓이는 넓이라서 가로와 세로, 두 길이를 곱한 단위인 cm²(제곱센티미터)를 써요. 부피는 가로, 세로, 높이 세 길이를 곱하므로 cm³(세제곱센티미터)를 써요. 반지름이 3 cm인 구처럼 수가 같게 나와도 단위가 다르면 서로 다른 양이에요.',
    },
    {
      q: '원뿔의 옆넓이가 왜 πrl이에요?',
      a: '원뿔의 옆면을 펼치면 반지름이 모선의 길이 $l$이고 호의 길이가 밑면의 둘레 $2\\pi r$인 부채꼴이에요. 부채꼴의 넓이는 $\\dfrac{1}{2}\\times$(반지름)$\\times$(호의 길이)이므로 $\\dfrac{1}{2}\\times l\\times2\\pi r=\\pi rl$이에요.',
    },
    {
      q: '원뿔에서 높이와 모선은 어떻게 구별해요?',
      a: '높이는 꼭짓점에서 밑면에 **수직으로** 내린 길이이고, 모선은 꼭짓점에서 밑면의 둘레까지 **비스듬히** 잰 길이예요. 모선이 높이보다 항상 길어요. 겉넓이(옆넓이)에는 모선을, 부피에는 높이를 써요.',
    },
  ],

  mistakes: [
    '원뿔의 옆넓이를 구할 때 모선 대신 높이를 쓰는 실수 — 옆넓이는 $\\pi rl$($l$: 모선), 부피는 $\\dfrac{1}{3}\\pi r^{2}h$($h$: 높이)예요.',
    '뿔의 부피에서 $\\dfrac{1}{3}$을 빠뜨리는 실수 — 뿔은 같은 밑면, 같은 높이인 기둥의 $\\dfrac{1}{3}$이에요.',
    '기둥의 겉넓이에서 밑면을 하나만 더하거나, 반구의 겉넓이에서 잘린 면(원)을 빠뜨리는 실수 — 전개도를 떠올려 모든 면을 세어요.',
  ],

  gens: [
    {
      id: 'prism',
      level: 1,
      title: '직육면체·원기둥의 겉넓이와 부피',
      make: function (R) {
        var mode = R.pick(['cuboid-v', 'cuboid-s', 'cyl-v', 'cyl-s']);
        var a, b, c, r, h, ans;
        if (mode === 'cuboid-v' || mode === 'cuboid-s') {
          a = R.int(2, 9); b = R.int(2, 9); c = R.int(2, 9);
          var fig = { type: 'cuboid', w: a, h: c, d: b, labels: { w: a + ' cm', h: c + ' cm', d: b + ' cm' }, alt: '가로 ' + a + ' cm, 세로 ' + b + ' cm, 높이 ' + c + ' cm 인 직육면체' };
          var base = '가로 ' + a + ' cm, 세로 ' + b + ' cm, 높이 ' + c + ' cm인 직육면체';
          var S = 2 * (a * b + b * c + c * a), V = a * b * c;
          if (mode === 'cuboid-v') {
            return {
              type: 'short', check: 'number', unit: 'cm³', concept: 1,
              q: base + '의 부피는 몇 cm³일까요?', fig: fig,
              answer: String(V),
              wrong: wrongList(fr(V), [[fr(S), '겉넓이를 구했어요. 부피는 (밑넓이)$\\times$(높이)예요.'], [fr(a * b), '밑넓이만 구했어요. 높이 ' + c + ' cm를 곱해요.']]),
              explain: '밑넓이는 $' + a + '\\times' + b + '=' + (a * b) + '$ (cm²)이고, 부피는 $' + (a * b) + '\\times' + c + '=' + V + '$ (cm³)예요.',
            };
          }
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 0,
            q: base + '의 겉넓이는 몇 cm²일까요?', fig: fig,
            answer: String(S),
            wrong: wrongList(fr(S), [
              [fr(V), '부피를 구했어요. 겉넓이는 여섯 면의 넓이의 합이에요.'],
              [fr(S / 2), '서로 다른 세 면의 넓이만 더했어요. 마주 보는 면이 하나씩 더 있으니 2배 해요.'],
              [fr(a * b + 2 * (a + b) * c), '밑면을 하나만 더했어요. 직육면체의 밑면은 2개예요.'],
            ]),
            explain: '밑넓이 $' + a + '\\times' + b + '=' + (a * b) + '$ 두 개와 옆넓이 (밑면의 둘레)$\\times$(높이)$=' + (2 * (a + b)) + '\\times' + c + '=' + (2 * (a + b) * c) + '$' + R.josa(2 * (a + b) * c, '을/를') + ' 더하면 $' + (2 * a * b) + '+' + (2 * (a + b) * c) + '=' + S + '$ (cm²)예요.',
          };
        }
        r = R.int(1, 8); h = R.int(2, 12);
        var cfig = cylinderFig({ r: r + ' cm', h: h + ' cm', alt: '밑면의 반지름이 ' + r + ' cm, 높이가 ' + h + ' cm 인 원기둥' });
        var cq = '밑면의 반지름의 길이가 ' + r + ' cm, 높이가 ' + h + ' cm인 원기둥의 ';
        if (mode === 'cyl-v') {
          ans = fr(r * r * h);
          return {
            type: 'short', check: 'number', unit: 'π cm³', concept: 1,
            q: cq + '부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.', fig: cfig,
            answer: fstr(ans),
            wrong: wrongList(ans, [
              [fr(r * h), '반지름을 한 번만 곱했어요. 밑넓이는 $\\pi r^{2}$이에요.'],
              [fr(2 * r * h), '옆넓이 $2\\pi rh$를 구했어요. 부피는 (밑넓이)$\\times$(높이)예요.'],
              [fr(4 * r * r * h), '반지름 대신 지름을 썼어요. 밑넓이는 $\\pi\\times' + r + '^{2}$이에요.'],
            ]),
            explain: '밑넓이는 $\\pi\\times' + r + '^{2}=' + piTex(fr(r * r)) + '$ (cm²), 부피는 $' + piTex(fr(r * r)) + '\\times' + h + '=' + piTex(ans) + '$ (cm³)예요.',
          };
        }
        ans = fr(2 * r * r + 2 * r * h);
        return {
          type: 'short', check: 'number', unit: 'π cm²', concept: 0,
          q: cq + '겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.', fig: cfig,
          answer: fstr(ans),
          wrong: wrongList(ans, [
            [fr(r * r + 2 * r * h), '밑면을 하나만 더했어요. 원기둥의 밑면은 2개예요.'],
            [fr(2 * r * h), '옆넓이만 구했어요. 두 밑면의 넓이도 더해요.'],
            [fr(2 * r * r + r * h), '옆넓이를 $\\pi rh$로 계산했어요. 옆면의 가로는 밑면의 둘레 $2\\pi r$이에요.'],
            [fr(r * r * h), '부피를 구했어요. 겉넓이는 전개도의 넓이예요.'],
          ]),
          explain: '밑넓이는 $\\pi\\times' + r + '^{2}=' + piTex(fr(r * r)) + '$, 옆넓이는 $2\\pi\\times' + r + '\\times' + h + '=' + piTex(fr(2 * r * h)) + '$예요. 겉넓이는 $' + piTex(fr(r * r)) + '\\times2+' + piTex(fr(2 * r * h)) + '=' + piTex(ans) + '$ (cm²)예요.',
        };
      },
    },
    {
      id: 'pyramid-cone',
      level: 2,
      title: '각뿔·원뿔의 겉넓이와 부피',
      make: function (R) {
        var mode = R.pick(['pyr-v', 'pyr-s', 'cone-v', 'cone-s']);
        var t, ans;
        if (mode === 'pyr-v' || mode === 'pyr-s') {
          t = R.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]);   // [밑변의 반, 높이, 옆면 삼각형의 높이]
          var a = 2 * t[0], h = t[1], s = t[2];
          var fig = sqPyramidFig({ a: a + ' cm', h: h + ' cm', s: s + ' cm', alt: '밑면이 한 변 ' + a + ' cm 인 정사각형, 높이 ' + h + ' cm, 옆면인 삼각형의 높이 ' + s + ' cm 인 사각뿔' });
          var base = '밑면이 한 변의 길이가 ' + a + ' cm인 정사각형이고, 높이가 ' + h + ' cm, 옆면인 이등변삼각형의 높이가 ' + s + ' cm인 사각뿔';
          if (mode === 'pyr-v') {
            ans = fr(a * a * h, 3);
            return {
              type: 'short', check: 'number', unit: 'cm³', concept: 3,
              q: base + '의 부피는 몇 cm³일까요?', fig: fig,
              answer: fstr(ans),
              hint: '부피에는 꼭짓점에서 밑면에 수직으로 잰 높이를 써요.',
              wrong: wrongList(ans, [
                [fr(a * a * h), '$\\dfrac{1}{3}$을 곱하지 않았어요. 그것은 사각기둥의 부피예요.'],
                [fr(a * a * s, 3), '옆면 삼각형의 높이 ' + s + ' cm를 썼어요. 부피에는 사각뿔의 높이 ' + h + ' cm를 써요.'],
              ]),
              explain: '$\\dfrac{1}{3}\\times(' + a + '\\times' + a + ')\\times' + h + '=\\dfrac{1}{3}\\times' + (a * a * h) + '=' + ftex(ans) + '$ (cm³)예요.',
            };
          }
          ans = fr(a * a + 2 * a * s);
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 2,
            q: base + '의 겉넓이는 몇 cm²일까요?', fig: fig,
            answer: fstr(ans),
            hint: '옆면은 밑변이 ' + a + ' cm인 삼각형 4개예요. 그 높이는 무엇일까요?',
            wrong: wrongList(ans, [
              [fr(a * a + 4 * a * s), '삼각형의 넓이에서 $\\dfrac{1}{2}$을 빠뜨렸어요.'],
              [fr(2 * a * s), '옆넓이만 구했어요. 밑면인 정사각형의 넓이도 더해요.'],
              [fr(a * a + 2 * a * h), '옆면 삼각형의 높이 대신 사각뿔의 높이 ' + h + ' cm를 썼어요.'],
            ]),
            explain: '밑넓이는 $' + a + '\\times' + a + '=' + (a * a) + '$, 옆넓이는 $4\\times\\left(\\dfrac{1}{2}\\times' + a + '\\times' + s + '\\right)=' + (2 * a * s) + '$' + R.josa(2 * a * s, '이에요/예요') + '. 겉넓이는 $' + (a * a) + '+' + (2 * a * s) + '=' + ftex(ans) + '$ (cm²)예요.',
          };
        }
        t = R.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [8, 15, 17]]);   // [반지름, 높이, 모선]
        var r = t[0], hh = t[1], l = t[2];
        var cfig = coneFig({ r: r + ' cm', h: hh + ' cm', l: l + ' cm', alt: '밑면의 반지름이 ' + r + ' cm, 높이가 ' + hh + ' cm, 모선의 길이가 ' + l + ' cm 인 원뿔' });
        var cq = '밑면의 반지름의 길이가 ' + r + ' cm, 높이가 ' + hh + ' cm, 모선의 길이가 ' + l + ' cm인 원뿔의 ';
        if (mode === 'cone-v') {
          ans = fr(r * r * hh, 3);
          return {
            type: 'short', check: 'number', unit: 'π cm³', concept: 3,
            q: cq + '부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.', fig: cfig,
            answer: fstr(ans),
            hint: '부피에는 높이와 모선 중 무엇을 써야 할까요?',
            wrong: wrongList(ans, [
              [fr(r * r * hh), '$\\dfrac{1}{3}$을 곱하지 않았어요. 그것은 원기둥의 부피예요.'],
              [fr(r * r * l, 3), '모선의 길이 ' + l + ' cm를 높이로 썼어요. 부피에는 높이 ' + hh + ' cm를 써요.'],
            ]),
            explain: '$\\dfrac{1}{3}\\times\\pi\\times' + r + '^{2}\\times' + hh + '=\\dfrac{1}{3}\\times' + piTex(fr(r * r * hh)) + '=' + piTex(ans) + '$ (cm³)예요.',
          };
        }
        ans = fr(r * r + r * l);
        return {
          type: 'short', check: 'number', unit: 'π cm²', concept: 2,
          q: cq + '겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.', fig: cfig,
          answer: fstr(ans),
          hint: '옆넓이에는 높이와 모선 중 무엇을 써야 할까요?',
          wrong: wrongList(ans, [
            [fr(r * r + r * hh), '옆넓이에 높이 ' + hh + ' cm를 썼어요. 옆면인 부채꼴의 반지름은 모선의 길이 ' + l + ' cm예요.'],
            [fr(r * l), '옆넓이만 구했어요. 밑넓이도 더해요.'],
            [fr(r * r + 2 * r * l), '옆넓이를 $2\\pi rl$로 계산했어요. 부채꼴의 넓이는 $\\dfrac{1}{2}\\times l\\times2\\pi r=\\pi rl$이에요.'],
          ]),
          explain: '밑넓이는 $\\pi\\times' + r + '^{2}=' + piTex(fr(r * r)) + '$, 옆넓이는 $\\pi\\times' + r + '\\times' + l + '=' + piTex(fr(r * l)) + '$예요. 겉넓이는 $' + piTex(ans) + '$ (cm²)예요.',
        };
      },
    },
    {
      id: 'sphere',
      level: 2,
      title: '구와 반구의 겉넓이와 부피',
      make: function (R) {
        var mode = R.pick(['s', 'v', 'hs', 'hv']);
        var r = R.int(1, 10);
        var byD = R.bool(0.3);
        var given = byD ? '지름의 길이가 ' + (2 * r) + ' cm인 ' : '반지름의 길이가 ' + r + ' cm인 ';
        var rStep = byD ? '반지름은 $' + (2 * r) + '\\div2=' + r + '$ (cm)예요. ' : '';
        var dWrong = function (f) { return byD ? [[f, '지름 ' + (2 * r) + ' cm를 반지름으로 썼어요. 반지름은 ' + r + ' cm예요.']] : []; };
        var ans, list;
        if (mode === 's') {
          ans = fr(4 * r * r);
          list = [[fr(r * r), '원 하나의 넓이 $\\pi r^{2}$만 구했어요. 구의 겉넓이는 그 4배예요.'], [fr(4 * r * r * r, 3), '부피를 구했어요. 겉넓이는 $4\\pi r^{2}$이에요.']].concat(dWrong(fr(16 * r * r)));
          return {
            type: 'short', check: 'number', unit: 'π cm²', concept: 4,
            q: given + '구의 겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
            fig: sphereFig({ r: byD ? null : r + ' cm' }),
            answer: fstr(ans), wrong: wrongList(ans, list),
            explain: rStep + '$4\\pi\\times' + r + '^{2}=' + piTex(ans) + '$ (cm²)예요.',
          };
        }
        if (mode === 'v') {
          ans = fr(4 * r * r * r, 3);
          list = [[fr(4 * r * r), '겉넓이를 구했어요. 부피는 $\\dfrac{4}{3}\\pi r^{3}$이에요.'], [fr(4 * r * r * r), '$\\dfrac{4}{3}$ 대신 4를 곱했어요.'], [fr(r * r * r), '$r^{3}$만 계산했어요. $\\dfrac{4}{3}$를 곱해요.']].concat(dWrong(fr(32 * r * r * r, 3)));
          return {
            type: 'short', check: 'number', unit: 'π cm³', concept: 4,
            q: given + '구의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요. (분수로 써도 돼요)',
            fig: sphereFig({ r: byD ? null : r + ' cm' }),
            answer: fstr(ans), wrong: wrongList(ans, list),
            explain: rStep + '$\\dfrac{4}{3}\\pi\\times' + r + '^{3}=\\dfrac{4}{3}\\times' + piTex(fr(r * r * r)) + '=' + piTex(ans) + '$ (cm³)예요.',
          };
        }
        if (mode === 'hs') {
          ans = fr(3 * r * r);
          list = [[fr(2 * r * r), '둥근 겉면만 구했어요. 잘린 자리의 원 $\\pi r^{2}$도 더해요.'], [fr(4 * r * r), '구 전체의 겉넓이를 구했어요. 반구의 둥근 면은 그 반이에요.']].concat(dWrong(fr(12 * r * r)));
          return {
            type: 'short', check: 'number', unit: 'π cm²', concept: 5,
            q: given + '구를 반으로 자른 반구의 겉넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
            fig: hemisphereFig({ r: byD ? null : r + ' cm' }),
            answer: fstr(ans), wrong: wrongList(ans, list),
            explain: rStep + '둥근 면은 $\\dfrac{1}{2}\\times4\\pi\\times' + r + '^{2}=' + piTex(fr(2 * r * r)) + '$, 잘린 면인 원은 $\\pi\\times' + r + '^{2}=' + piTex(fr(r * r)) + '$예요. 겉넓이는 $' + piTex(ans) + '$ (cm²)예요.',
          };
        }
        ans = fr(2 * r * r * r, 3);
        list = [[fr(4 * r * r * r, 3), '구 전체의 부피를 구했어요. 반구는 그 반이에요.'], [fr(3 * r * r), '반구의 겉넓이를 구했어요. 부피는 $\\dfrac{1}{2}\\times\\dfrac{4}{3}\\pi r^{3}$이에요.']].concat(dWrong(fr(16 * r * r * r, 3)));
        return {
          type: 'short', check: 'number', unit: 'π cm³', concept: 5,
          q: given + '구를 반으로 자른 반구의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요. (분수로 써도 돼요)',
          fig: hemisphereFig({ r: byD ? null : r + ' cm' }),
          answer: fstr(ans), wrong: wrongList(ans, list),
          explain: rStep + '$\\dfrac{1}{2}\\times\\dfrac{4}{3}\\pi\\times' + r + '^{3}=\\dfrac{2}{3}\\times' + piTex(fr(r * r * r)) + '=' + piTex(ans) + '$ (cm³)예요.',
        };
      },
    },
    {
      id: 'composite',
      level: 3,
      title: '여러 가지 입체도형의 부피',
      make: function (R) {
        var mode = R.pick(['cyl-cone', 'in-cyl', 'spin', 'cyl-hemi']);
        var r, h, ans;
        if (mode === 'cyl-cone') {
          do { r = R.int(2, 9); h = R.int(3, 12); } while ((r * r * h) % 3 !== 0);
          ans = fr(2 * r * r * h, 3);
          return {
            type: 'short', check: 'number', unit: 'π cm³', concept: 5,
            q: '밑면의 반지름이 ' + r + ' cm, 높이가 ' + h + ' cm인 원기둥에서, 밑면이 같고 높이가 같은 원뿔 모양을 파냈어요. 남은 입체도형의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
            answer: fstr(ans),
            hint: '(원기둥의 부피) − (원뿔의 부피)',
            wrong: wrongList(ans, [
              [fr(r * r * h, 3), '파낸 원뿔의 부피를 구했어요. 원기둥에서 빼요.'],
              [fr(r * r * h), '원기둥의 부피예요. 파낸 원뿔의 부피를 빼요.'],
            ]),
            explain: '원기둥의 부피는 $\\pi\\times' + r + '^{2}\\times' + h + '=' + piTex(fr(r * r * h)) + '$, 원뿔의 부피는 그 $\\dfrac{1}{3}$인 $' + piTex(fr(r * r * h, 3)) + '$예요. 남은 부피는 $' + piTex(fr(r * r * h)) + '-' + piTex(fr(r * r * h, 3)) + '=' + piTex(ans) + '$ (cm³)예요.',
          };
        }
        if (mode === 'in-cyl') {
          r = R.int(1, 9);
          var cyl = fr(2 * r * r * r);
          ans = fr(4 * r * r * r, 3);
          return {
            type: 'short', check: 'number', unit: 'π cm³', concept: 4,
            q: '구가 꼭 들어가는 원기둥의 부피가 $' + piTex(cyl) + '$ cm³예요. 이 구의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요. (분수로 써도 돼요)',
            answer: fstr(ans),
            hint: '구가 꼭 맞는 원기둥에서 (원뿔) : (구) : (원기둥) $=1:2:3$이에요.',
            wrong: wrongList(ans, [
              [fr(2 * r * r * r, 3), '원뿔의 부피($\\dfrac{1}{3}$)를 구했어요. 구는 원기둥의 $\\dfrac{2}{3}$예요.'],
              [fr(r * r * r), '원기둥의 반으로 계산했어요. 구는 원기둥의 $\\dfrac{2}{3}$예요.'],
            ]),
            explain: '구의 부피는 꼭 맞는 원기둥 부피의 $\\dfrac{2}{3}$예요. $' + piTex(cyl) + '\\times\\dfrac{2}{3}=' + piTex(ans) + '$ (cm³)예요. (반지름을 $r$이라 하면 원기둥은 $\\pi r^{2}\\times2r=2\\pi r^{3}$, 구는 $\\dfrac{4}{3}\\pi r^{3}$이에요.)',
          };
        }
        if (mode === 'spin') {
          var a = R.int(2, 9), b;
          do { b = R.int(2, 9); } while (b === a);
          var Va = a * a * b, Vb = b * b * a;   // a 가 반지름(축은 b 인 변) / b 가 반지름(축은 a 인 변)
          ans = fr(Math.abs(Va - Vb));
          return {
            type: 'short', check: 'number', unit: 'π cm³', concept: 5,
            q: '두 변의 길이가 ' + a + ' cm, ' + b + ' cm인 직사각형을, 길이가 ' + a + ' cm인 변을 회전축으로 하여 1회전 시킨 입체도형과 길이가 ' + b + ' cm인 변을 회전축으로 하여 1회전 시킨 입체도형이 있어요. 두 입체도형의 부피의 차를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
            answer: fstr(ans),
            hint: '두 경우 모두 원기둥이에요. 회전축이 되는 변이 높이예요.',
            wrong: wrongList(ans, [[fr(0), '두 원기둥의 부피가 같다고 생각했어요. 반지름은 제곱이 되므로 부피가 달라요.'], [fr(Va + Vb), '두 부피를 더했어요. 차를 구해요.']]),
            explain: a + ' cm인 변이 축이면 반지름 ' + b + ' cm, 높이 ' + a + ' cm인 원기둥: $\\pi\\times' + b + '^{2}\\times' + a + '=' + piTex(fr(Vb)) + '$\n\n' +
              b + ' cm인 변이 축이면 반지름 ' + a + ' cm, 높이 ' + b + ' cm인 원기둥: $\\pi\\times' + a + '^{2}\\times' + b + '=' + piTex(fr(Va)) + '$\n\n부피의 차는 $' + piTex(ans) + '$ (cm³)예요.',
          };
        }
        r = R.int(1, 6); h = R.int(2, 10);
        ans = fr(3 * r * r * h + 2 * r * r * r, 3);
        return {
          type: 'short', check: 'number', unit: 'π cm³', concept: 5,
          q: '밑면의 반지름이 ' + r + ' cm, 높이가 ' + h + ' cm인 원기둥 위에 반지름이 ' + r + ' cm인 반구를 붙인 입체도형이 있어요. 이 입체도형의 부피를 $\\square\\pi$ cm³라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요. (분수로 써도 돼요)',
          answer: fstr(ans),
          hint: '(원기둥의 부피) + (반구의 부피)',
          wrong: wrongList(ans, [
            [fr(3 * r * r * h + 4 * r * r * r, 3), '반구 대신 구 전체의 부피를 더했어요.'],
            [fr(r * r * h), '원기둥의 부피만 구했어요. 반구의 부피도 더해요.'],
          ]),
          explain: '원기둥의 부피는 $\\pi\\times' + r + '^{2}\\times' + h + '=' + piTex(fr(r * r * h)) + '$, 반구의 부피는 $\\dfrac{1}{2}\\times\\dfrac{4}{3}\\pi\\times' + r + '^{3}=' + piTex(fr(2 * r * r * r, 3)) + '$예요. 모두 더하면 $' + piTex(ans) + '$ (cm³)예요.',
        };
      },
    },
  ],
});
})();
