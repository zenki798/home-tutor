/* 중1 수학 · 평면도형의 성질
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 삼각형의 외각·원과 부채꼴은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  // ---------- 수 도우미 ----------
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function fr(n, d) { var g = gcd(n, d || 1); d = d || 1; if (d < 0) { n = -n; d = -d; } return { n: n / g, d: d / g }; }
  function fstr(f) { return f.d === 1 ? String(f.n) : f.n + '/' + f.d; }
  function feq(f, g) { return f.n * g.d === g.n * f.d; }
  function piTex(f) {   // 계수 f 를 곱한 π (TeX)
    if (f.d === 1) return (f.n === 1 ? '' : f.n) + '\\pi';
    return '\\frac{' + f.n + '}{' + f.d + '}\\pi';
  }
  // 틀린 답 목록: [[값(fr), 진단], …] → 정답·서로 같은 값을 뺀 wrong 칸
  function wrongList(ans, list) {
    var seen = [ans], out = [];
    list.forEach(function (w) {
      if (seen.some(function (s) { return feq(s, w[0]); })) return;
      seen.push(w[0]);
      out.push({ a: fstr(w[0]), why: w[1] });
    });
    return out;
  }
  var SINO = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  function sino(n) { var t = Math.floor(n / 10), o = n % 10; return (t ? (t > 1 ? SINO[t] : '') + '십' : '') + SINO[o]; }
  function gon(n) { return sino(n) + '각형'; }

  // ---------- 그림 도우미 (화면 좌표: y 아래쪽, 각은 수학 방향: 반시계, 도) ----------
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function pt(p) { return r1(p[0]) + ' ' + r1(p[1]); }
  function rad(d) { return d * Math.PI / 180; }
  function at(c, r, d) { return [c[0] + r * Math.cos(rad(d)), c[1] - r * Math.sin(rad(d))]; }
  function dirDeg(from, to) { return Math.atan2(-(to[1] - from[1]), to[0] - from[0]) * 180 / Math.PI; }
  function txt(p, s, o) {
    o = o || {};
    return '<text x="' + r1(p[0]) + '" y="' + r1(p[1]) + '" font-size="' + (o.size || 14) + '" text-anchor="middle" dominant-baseline="central" fill="currentColor"' +
      (o.italic ? ' font-style="italic"' : '') + '>' + s + '</text>';
  }
  function seg(a, b, o) {
    o = o || {};
    return '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" stroke="' + (o.color || 'currentColor') + '" stroke-width="' + (o.w || 2) + '"' +
      (o.dash ? ' stroke-dasharray="5 4"' : '') + '/>';
  }
  // c 를 중심으로 a1 도에서 반시계로 sweep 도만큼 도는 호
  function arcD(c, r, a1, sweep) {
    var p1 = at(c, r, a1), p2 = at(c, r, a1 + sweep);
    return 'M ' + pt(p1) + ' A ' + r1(r) + ' ' + r1(r) + ' 0 ' + (sweep > 180 ? 1 : 0) + ' 0 ' + pt(p2);
  }
  // 꼭짓점 v 에서 p 쪽과 q 쪽 사이(180° 미만)의 각 표시와 글
  function angleMark(v, p, q, r, label, color) {
    var a1 = dirDeg(v, p), a2 = dirDeg(v, q);
    var d = ((a2 - a1) % 360 + 360) % 360;
    if (d > 180) { a1 = a2; d = 360 - d; }
    var s = '<path d="' + arcD(v, r, a1, d) + '" fill="none" stroke="' + (color || 'var(--fig-1, #2563eb)') + '" stroke-width="2"/>';
    if (label) s += txt(at(v, r + (d < 45 ? 26 : 17), a1 + d / 2), label, { size: 13, italic: label === 'x' });
    return s;
  }
  // 삼각형 ABC (B 왼쪽 아래, C 오른쪽 아래). b, c: 꼭짓점 B, C 의 내각(도)
  // o.A·o.B·o.C: 각 글, o.ext: 꼭짓점 C 의 외각 글(있으면 변 BC 를 C 쪽으로 늘여 D 까지 그린다)
  function triFig(b, c, o) {
    o = o || {};
    var a = 180 - b - c;
    var ab = Math.sin(rad(c)) / Math.sin(rad(a));
    var M = [[ab * Math.cos(rad(b)), ab * Math.sin(rad(b))], [0, 0], [1, 0], [1.5, 0]];
    var use = o.ext ? M : M.slice(0, 3);
    var xs = use.map(function (p) { return p[0]; }), ys = use.map(function (p) { return p[1]; });
    var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs), maxY = Math.max.apply(null, ys);
    var W = 320, H = 210, pad = 34;
    var s = Math.min((W - 2 * pad) / (maxX - minX), (H - 2 * pad) / maxY);
    var ox = (W - (maxX - minX) * s) / 2;
    function map(p) { return [ox + (p[0] - minX) * s, H - pad - p[1] * s]; }
    var A = map(M[0]), B = map(M[1]), C = map(M[2]), D = map(M[3]);
    var body = '<path d="M ' + pt(A) + ' L ' + pt(B) + ' L ' + pt(C) + ' Z" fill="var(--fig-1, #2563eb)" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>';
    if (o.ext) body += seg(C, D);
    if (o.A) body += angleMark(A, B, C, 22, o.A);
    if (o.B) body += angleMark(B, C, A, 22, o.B);
    if (o.C) body += angleMark(C, A, B, 22, o.C);
    if (o.ext) body += angleMark(C, D, A, 18, o.ext, 'var(--fig-4, #ef4444)');
    body += txt([A[0], A[1] - 14], 'A') + txt([B[0] - 12, B[1] + 12], 'B') + txt([C[0], C[1] + 16], 'C');
    if (o.ext) body += txt([D[0] + 4, D[1] + 16], 'D');
    var alt = o.alt || ('삼각형 ABC' + (o.ext ? '와 변 BC 의 연장선 위의 점 D' : ''));
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + W + ' ' + H + '">' + body + '</svg>', alt: alt };
  }
  // 부채꼴: 중심각 deg, o.r 반지름 글, o.angle 중심각 글, o.arc 호 글. 원 전체는 흐린 점선
  function sectorFig(deg, o) {
    o = o || {};
    var c = [130, 125], R = 85, st = 90 - deg / 2;
    var p1 = at(c, R, st), p2 = at(c, R, st + deg);
    var body = '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + R + '" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="4 4" stroke-width="1.5"/>';
    body += '<path d="M ' + pt(c) + ' L ' + pt(p1) + ' A ' + R + ' ' + R + ' 0 ' + (deg > 180 ? 1 : 0) + ' 0 ' + pt(p2) + ' Z" fill="var(--fig-1, #2563eb)" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>';
    body += '<path d="' + arcD(c, 18, st, deg) + '" fill="none" stroke="var(--fig-4, #ef4444)" stroke-width="2"/>';
    body += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="3" fill="currentColor"/>' + txt([c[0], c[1] + (deg > 180 ? 26 : 16)], 'O', { size: 13 });
    if (o.r) { var m = at(c, R / 2, st); body += txt(at(m, 22, st - 90), o.r, { size: 13 }); }
    if (o.angle) body += txt(at(c, deg < 70 ? 50 : 34, 90), o.angle, { size: 13 });
    if (o.arc) body += txt(at(c, R + 16, 90), o.arc, { size: 13 });
    return { type: 'svg', svg: '<svg viewBox="0 0 260 240">' + body + '</svg>', alt: o.alt || ('중심각이 ' + deg + '도인 부채꼴') };
  }
  // 원 O 와 호·현·부채꼴·활꼴
  function circlePartsFig() {
    var c = [130, 120], R = 88;
    var A = at(c, R, 20), B = at(c, R, 80), P = at(c, R, 205), Q = at(c, R, 325);
    var body = '<circle cx="130" cy="120" r="' + R + '" fill="none" stroke="currentColor" stroke-width="2"/>';
    body += '<path d="M ' + pt(c) + ' L ' + pt(A) + ' A ' + R + ' ' + R + ' 0 0 0 ' + pt(B) + ' Z" fill="var(--fig-1, #2563eb)" fill-opacity="0.3" stroke="currentColor" stroke-width="2"/>';
    body += '<path d="M ' + pt(P) + ' A ' + R + ' ' + R + ' 0 0 0 ' + pt(Q) + ' Z" fill="var(--fig-2, #f59e0b)" fill-opacity="0.35" stroke="currentColor" stroke-width="2"/>';
    body += '<path d="' + arcD(c, 16, 20, 60) + '" fill="none" stroke="var(--fig-4, #ef4444)" stroke-width="2"/>';
    body += '<circle cx="130" cy="120" r="3" fill="currentColor"/>' + txt([118, 126], 'O', { size: 13 });
    body += txt(at(c, R + 13, 20), 'A') + txt(at(c, R + 13, 80), 'B');
    body += txt(at(c, 65, 50), '부채꼴', { size: 12 }) + txt(at(c, 40, 50), '중심각', { size: 11 });
    body += txt(at(c, R + 22, 50), '호 AB', { size: 13 });
    body += txt(at(c, 69, 265), '활꼴', { size: 12 }) + txt(at(c, 34, 265), '현', { size: 13 });
    return { type: 'svg', svg: '<svg viewBox="0 0 260 245">' + body + '</svg>', alt: '원 O 에서 반지름 OA, OB 와 호 AB 로 둘러싸인 부채꼴, 그리고 현과 호로 둘러싸인 활꼴' };
  }
  // 한 원에서 중심각이 같은 두 부채꼴 AOB, BOC 와 현 AB, BC, AC
  function twoSectorsFig() {
    var c = [130, 150], R = 100;
    var A = at(c, R, 30), B = at(c, R, 70), C = at(c, R, 110);
    var body = '<path d="M ' + pt(c) + ' L ' + pt(A) + ' A ' + R + ' ' + R + ' 0 0 0 ' + pt(C) + ' Z" fill="var(--fig-1, #2563eb)" fill-opacity="0.18" stroke="none"/>';
    body += '<path d="' + arcD(c, R, 10, 120) + '" fill="none" stroke="currentColor" stroke-width="2"/>';
    body += seg(c, A) + seg(c, B) + seg(c, C);
    body += seg(A, B, { color: 'var(--fig-2, #f59e0b)', w: 2.5 }) + seg(B, C, { color: 'var(--fig-2, #f59e0b)', w: 2.5 }) + seg(A, C, { dash: true, color: 'var(--fig-4, #ef4444)' });
    body += txt(at(c, 62, 50), '40°', { size: 12 }) + txt(at(c, 62, 90), '40°', { size: 12 });
    body += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="3" fill="currentColor"/>' + txt([c[0], c[1] + 16], 'O', { size: 13 });
    body += txt(at(c, R + 13, 30), 'A') + txt(at(c, R + 13, 70), 'B') + txt(at(c, R + 13, 110), 'C');
    return { type: 'svg', svg: '<svg viewBox="0 0 260 180">' + body + '</svg>', alt: '중심각이 40도로 같은 두 부채꼴 AOB, BOC 와 현 AB, BC, 그리고 점선으로 그은 현 AC' };
  }
  // 한 변이 10 cm 인 정사각형 안에서 두 사분원이 겹친 부분
  function lensFig() {
    var body = '<rect x="50" y="20" width="160" height="160" fill="none" stroke="currentColor" stroke-width="2"/>';
    body += '<path d="M 210 180 A 160 160 0 0 0 50 20 A 160 160 0 0 0 210 180 Z" fill="var(--fig-1, #2563eb)" fill-opacity="0.35" stroke="currentColor" stroke-width="2"/>';
    body += txt([130, 196], '10 cm', { size: 13 }) + txt([236, 100], '10 cm', { size: 13 });
    return { type: 'svg', svg: '<svg viewBox="0 0 260 210">' + body + '</svg>', alt: '정사각형의 마주 보는 두 꼭짓점을 중심으로 그린 사분원 두 개가 겹친 부분을 색칠한 그림' };
  }

  var PENTA = [[0, 10], [-9.51, 3.09], [-5.88, -8.09], [5.88, -8.09], [9.51, 3.09]];

Tutor.registerUnit({
  id: 'math-m1-09',
  course: 'math-m1',
  title: '평면도형의 성질',
  summary: '다각형의 대각선과 내각, 외각의 성질을 알고, 부채꼴의 호의 길이와 넓이를 구해요.',
  goals: [
    '다각형의 대각선의 개수를 구할 수 있어요.',
    '삼각형의 내각과 외각의 성질을 이해하고 각의 크기를 구할 수 있어요.',
    '다각형의 내각의 크기의 합과 외각의 크기의 합을 구할 수 있어요.',
    '부채꼴의 중심각과 호의 길이, 넓이 사이의 관계를 알고 호의 길이와 넓이를 구할 수 있어요.',
  ],
  standards: ['[9수03-05]', '[9수03-06]'],

  concepts: [
    {
      title: '다각형의 대각선',
      body: '선분 $n$개로 둘러싸인 다각형을 $n$각형이라고 해요. 다각형에서 **서로 이웃하지 않는 두 꼭짓점을 이은 선분**을 **대각선**이라고 해요.\n\n$n$각형의 한 꼭짓점에서는 자기 자신과 이웃한 두 꼭짓점을 뺀 나머지 꼭짓점으로 대각선을 그을 수 있어요. 그래서 **한 꼭짓점에서 그을 수 있는 대각선은 $(n-3)$개**예요.\n\n꼭짓점이 $n$개이니 모두 $n(n-3)$개를 그은 것 같지만, 대각선 하나를 양 끝 꼭짓점에서 한 번씩, 두 번 센 셈이에요. 그래서 2로 나눠요.\n\n$(n\\text{각형의 대각선의 개수})=\\dfrac{n(n-3)}{2}$\n\n예: 오각형의 대각선은 $\\dfrac{5\\times2}{2}=5$(개), 육각형의 대각선은 $\\dfrac{6\\times3}{2}=9$(개)예요.\n\n> ⚠️ 대각선 AC와 대각선 CA는 같은 선분이에요. 2로 나누는 것을 잊지 마세요.',
      easy: '친구 5명이 둥글게 앉아서, 양옆에 앉은 친구를 뺀 모든 친구와 한 번씩 악수한다고 생각해 보세요. 한 사람은 자기 자신과 양옆 2명, 곧 3명을 뺀 2명과 악수해요.\n\n5명이 2번씩이면 $5\\times2=10$번 같지만, 민수와 지아의 악수를 민수 쪽에서 한 번, 지아 쪽에서 한 번 센 거예요. 그래서 실제 악수는 $10\\div2=5$번이에요.\n\n친구를 꼭짓점, 악수를 대각선이라고 보면 오각형의 대각선이 5개인 것과 똑같아요.',
      fig: {
        type: 'polygon', points: PENTA, labels: ['A', 'B', 'C', 'D', 'E'],
        segments: [
          { from: PENTA[0], to: PENTA[2], dashed: true }, { from: PENTA[0], to: PENTA[3], dashed: true },
          { from: PENTA[1], to: PENTA[3], dashed: true }, { from: PENTA[1], to: PENTA[4], dashed: true },
          { from: PENTA[2], to: PENTA[4], dashed: true },
        ],
        alt: '오각형 ABCDE 와 점선으로 그은 대각선 5개',
      },
      check: {
        type: 'choice',
        q: '육각형의 한 꼭짓점에서 그을 수 있는 대각선은 몇 개일까요?',
        choices: ['3개', '5개', '9개'],
        answer: 0,
        why: [
          '',
          '자기 자신만 뺐어요. 이웃한 두 꼭짓점과 이은 선분은 변이라서 대각선이 아니에요.',
          '육각형 전체의 대각선의 개수예요. 한 꼭짓점에서 그을 수 있는 것만 세어요.',
        ],
        explain: '자기 자신과 이웃한 두 꼭짓점을 빼면 $6-3=3$(개)의 꼭짓점이 남아요. 그래서 한 꼭짓점에서 그을 수 있는 대각선은 3개예요.',
      },
    },
    {
      title: '삼각형의 내각과 외각',
      body: '다각형에서 이웃한 두 변이 안쪽에 만드는 각을 **내각**, 한 변과 그 이웃한 변의 **연장선**이 이루는 각을 **외각**이라고 해요. 한 꼭짓점에서 (내각)+(외각)$=180°$예요.\n\n**삼각형의 세 내각의 크기의 합은 $180°$예요.** 꼭짓점 A를 지나면서 변 BC에 평행한 직선을 그으면, 평행선에서 엇각의 크기가 같으므로 $\\angle B$와 $\\angle C$가 꼭짓점 A 옆으로 옮겨 와요. 그러면 세 각이 모여 평각($180°$)을 이루지요.\n\n**삼각형의 한 외각의 크기는 그와 이웃하지 않는 두 내각의 크기의 합과 같아요.** 그림에서\n\n$\\angle ACD=\\angle A+\\angle B$\n\n$\\angle ACB+\\angle ACD=180°$이고 $\\angle A+\\angle B+\\angle ACB=180°$이니, $\\angle ACD$와 $\\angle A+\\angle B$는 둘 다 $180°$에서 $\\angle ACB$를 뺀 크기예요.\n\n예: $\\angle A=50°$, $\\angle B=60°$이면 $\\angle ACD=50°+60°=110°$예요.',
      easy: '종이로 삼각형을 오려서 세 꼭짓점을 찢어 한곳에 모아 보세요. 세 조각의 뾰족한 끝을 맞대면 반듯한 일직선이 돼요. 일직선이 이루는 각은 $180°$이니 세 내각의 합도 $180°$예요.\n\n외각은 일직선($180°$)에서 그 자리의 내각을 뺀 나머지예요. 그런데 나머지 두 내각을 더한 것도 $180°$에서 같은 내각을 뺀 것이지요. 그래서 외각 = 이웃하지 않는 두 내각의 합이에요.',
      fig: triFig(60, 70, { A: '50°', B: '60°', ext: '∠ACD', alt: '삼각형 ABC 에서 각 A 는 50도, 각 B 는 60도이고, 변 BC 를 늘인 선 위의 점 D 와 외각 ACD' }),
      check: {
        type: 'ox',
        q: '삼각형의 한 외각의 크기는 그와 이웃한 내각의 크기와 같아요.',
        answer: false,
        explain: '외각과 이웃한 내각은 크기의 합이 $180°$예요. 외각의 크기는 **이웃하지 않는** 두 내각의 크기의 합과 같아요.',
      },
    },
    {
      title: '다각형의 내각과 외각의 크기의 합',
      body: '$n$각형의 한 꼭짓점에서 대각선을 모두 그으면 $(n-2)$개의 삼각형으로 나뉘어요. 삼각형 하나의 내각의 크기의 합이 $180°$이므로\n\n$(n\\text{각형의 내각의 크기의 합})=180°\\times(n-2)$\n\n예: 오각형은 삼각형 3개로 나뉘니 내각의 크기의 합은 $180°\\times3=540°$예요.\n\n**외각의 크기의 합은 $n$에 상관없이 항상 $360°$예요.** 꼭짓점마다 (내각)+(외각)$=180°$이니 모두 더하면 $180°\\times n$이에요. 여기서 내각의 크기의 합 $180°\\times(n-2)$를 빼면 $180°\\times2=360°$가 남아요.\n\n**정다각형**은 모든 변의 길이가 같고 모든 내각의 크기가 같은 다각형이에요. 그래서 정$n$각형에서\n\n- 한 내각의 크기 $=\\dfrac{180°\\times(n-2)}{n}$\n- 한 외각의 크기 $=\\dfrac{360°}{n}$\n\n예: 정육각형의 한 외각은 $360°\\div6=60°$, 한 내각은 $180°-60°=120°$예요.',
      easy: '오각형 모양의 땅을 한 꼭짓점에서 줄을 쳐서 나눠 보세요. 삼각형 3개로 나뉘지요. 삼각형 하나의 세 각을 모으면 $180°$이니, 오각형의 다섯 각을 모으면 $180°\\times3$이에요.\n\n외각은 다각형의 둘레를 따라 걷는다고 생각하면 쉬워요. 꼭짓점마다 외각만큼 몸을 돌리며 한 바퀴 걸어서 제자리로 오면 몸은 정확히 한 바퀴, 곧 $360°$를 돌아요. 삼각형이든 십각형이든 똑같아요.',
      fig: {
        type: 'polygon', points: PENTA, labels: ['A', 'B', 'C', 'D', 'E'],
        segments: [{ from: PENTA[0], to: PENTA[2], dashed: true }, { from: PENTA[0], to: PENTA[3], dashed: true }],
        alt: '오각형 ABCDE 를 꼭짓점 A 에서 그은 대각선 2개로 삼각형 3개로 나눈 그림',
      },
      check: {
        type: 'short', check: 'number', unit: '°',
        q: '정팔각형의 한 외각의 크기는 몇 도일까요?',
        answer: '45',
        wrong: [
          { a: '135', why: '한 내각의 크기를 구했어요. 외각의 크기의 합은 $360°$이니 $360°\\div8$을 계산해요.' },
          { a: '1080', why: '내각의 크기의 합을 구했어요. 묻는 것은 한 외각의 크기예요.' },
        ],
        explain: '외각의 크기의 합은 항상 $360°$이고, 정팔각형의 외각 8개는 크기가 모두 같아요. 그래서 한 외각은 $360°\\div8=45°$예요.',
      },
    },
    {
      title: '원과 부채꼴',
      body: '원 O 위의 두 점 A, B를 양 끝으로 하는 원의 일부분을 **호** AB라 하고, 기호로 $\\widehat{AB}$와 같이 나타내요. 보통 $\\widehat{AB}$는 길이가 짧은 쪽의 호를 말해요.\n\n- **현**: 원 위의 두 점을 이은 선분\n- **할선**: 원 위의 두 점을 지나는 직선\n- **부채꼴**: 두 반지름 OA, OB와 호 AB로 둘러싸인 도형\n- **중심각**: 부채꼴에서 두 반지름이 이루는 각 $\\angle AOB$ (호 AB에 대한 중심각이라고도 해요)\n- **활꼴**: 현과 호로 둘러싸인 도형\n\n> 💡 지름은 원의 중심을 지나는 현이에요. 그래서 **반원은 부채꼴이면서 활꼴**이에요. 중심각이 $180°$인 부채꼴이고, 현(지름)과 호로 둘러싸인 활꼴이기도 하지요.\n\n> 💡 한 원에서 가장 긴 현은 지름이에요.',
      easy: '둥근 피자를 떠올려 보세요. 가운데에서 바깥쪽으로 칼질을 두 번 해서 떼어 낸 한 조각이 **부채꼴**이에요. 조각 끝의 둥근 테두리가 **호**, 조각의 뾰족한 끝(피자의 가운데)에 생긴 각이 **중심각**이지요.\n\n피자 가장자리 쪽을 칼로 반듯하게 한 번 잘라 낸 자투리는 **활꼴**이에요. 이때 칼이 지나간 곧은 자리가 **현**이에요.',
      fig: circlePartsFig(),
      check: {
        type: 'choice',
        q: '원에서 현과 호로 둘러싸인 도형을 무엇이라고 할까요?',
        choices: ['활꼴', '부채꼴', '중심각'],
        answer: 0,
        why: [
          '',
          '부채꼴은 두 **반지름**과 호로 둘러싸인 도형이에요.',
          '중심각은 도형이 아니라 부채꼴에서 두 반지름이 이루는 **각**이에요.',
        ],
        explain: '현과 호로 둘러싸인 도형은 활꼴이에요. 두 반지름과 호로 둘러싸인 도형인 부채꼴과 구별해요.',
      },
    },
    {
      title: '중심각과 호의 길이, 넓이의 관계',
      body: '한 원 또는 합동인 두 원에서\n\n1. 중심각의 크기가 같은 두 부채꼴은 호의 길이와 넓이가 각각 같아요.\n2. **부채꼴의 호의 길이와 넓이는 각각 중심각의 크기에 정비례해요.** 중심각이 2배, 3배가 되면 호의 길이와 넓이도 2배, 3배가 돼요.\n\n그래서 비례식으로 구할 수 있어요.\n\n(중심각의 크기의 비) $=$ (호의 길이의 비) $=$ (넓이의 비)\n\n예: 한 원에서 중심각이 $40°$인 부채꼴의 호의 길이가 5 cm이면, 중심각이 $120°$인 부채꼴의 호의 길이는 $5\\times3=15$ (cm)예요.\n\n> ⚠️ **현의 길이는 중심각의 크기에 정비례하지 않아요.** 중심각이 같으면 현의 길이도 같지만, 그림처럼 중심각이 2배가 되어도 현 AC의 길이는 현 AB의 2배보다 짧아요. 삼각형 ABC에서 두 변 AB, BC의 길이의 합은 나머지 한 변 AC의 길이보다 길기 때문이에요.',
      easy: '똑같은 크기로 자른 피자 조각 두 개를 붙여 보세요. 뾰족한 끝의 각(중심각)도 2배, 둥근 테두리(호)도 2배, 피자의 양(넓이)도 2배가 돼요.\n\n그런데 붙인 조각의 양 끝을 곧게 잇는 선(현)은 두 조각 각각의 현을 이어 붙인 길이보다 짧아요. 곧장 가는 길이 꺾어서 돌아가는 길보다 짧으니까요.',
      fig: twoSectorsFig(),
      check: {
        type: 'ox',
        q: '한 원에서 중심각의 크기가 2배가 되면 현의 길이도 2배가 돼요.',
        answer: false,
        explain: '호의 길이와 넓이는 중심각의 크기에 정비례하지만, **현의 길이는 정비례하지 않아요.** 중심각이 2배가 되어도 현의 길이는 2배보다 짧아요.',
      },
    },
    {
      title: '부채꼴의 호의 길이와 넓이',
      body: '원의 둘레의 길이와 지름의 길이의 비율을 **원주율**이라고 해요. 원주율은 $3.141592\\cdots$로 끝없이 이어지는 소수라서, 중학교부터는 원주율을 문자 $\\pi$(파이)로 나타내요. 반지름의 길이가 $r$인 원의 둘레의 길이는 $2\\pi r$, 넓이는 $\\pi r^{2}$이에요.\n\n중심각의 크기가 $x°$인 부채꼴은 원 전체($360°$)의 $\\dfrac{x}{360}$이므로, 반지름의 길이가 $r$인 부채꼴의 호의 길이 $l$과 넓이 $S$는\n\n$l=2\\pi r\\times\\dfrac{x}{360}$, $\\quad S=\\pi r^{2}\\times\\dfrac{x}{360}$\n\n예: 반지름의 길이가 6 cm, 중심각의 크기가 $60°$인 부채꼴의 호의 길이는 $2\\pi\\times6\\times\\dfrac{60}{360}=2\\pi$ (cm), 넓이는 $\\pi\\times6^{2}\\times\\dfrac{60}{360}=6\\pi$ (cm²)예요.\n\n중심각을 몰라도 반지름 $r$과 호의 길이 $l$을 알면 넓이를 구할 수 있어요.\n\n$S=\\dfrac{1}{2}rl$\n\n위의 예에서도 $\\dfrac{1}{2}\\times6\\times2\\pi=6\\pi$로 같아요.\n\n> 💡 답에 $\\pi$가 있으면 $6\\pi$처럼 수 뒤에 $\\pi$를 붙여 써요. $\\pi$를 3.14로 바꾸라는 말이 없으면 그대로 둬요.',
      easy: '부채꼴은 원을 잘라 낸 조각이에요. 중심각이 $90°$이면 원 전체($360°$)의 $\\frac{90}{360}=\\frac{1}{4}$이니, 호의 길이도 원 둘레의 $\\frac{1}{4}$, 넓이도 원 넓이의 $\\frac{1}{4}$이에요.\n\n그러니 **원 전체를 구하고 → 몇 분의 몇만큼인지 곱하기**만 기억하면 돼요. 반지름이 4 cm, 중심각이 $90°$이면 원 둘레 $8\\pi$ cm의 $\\frac{1}{4}$인 $2\\pi$ cm가 호의 길이, 원 넓이 $16\\pi$ cm²의 $\\frac{1}{4}$인 $4\\pi$ cm²가 넓이예요.',
      fig: sectorFig(60, { r: '6 cm', angle: '60°', alt: '반지름이 6 cm 이고 중심각이 60도인 부채꼴' }),
      check: {
        type: 'short', check: 'number', unit: 'π cm²',
        q: '반지름의 길이가 4 cm이고 중심각의 크기가 $90°$인 부채꼴의 넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
        answer: '4',
        wrong: [
          { a: '2', why: '호의 길이를 구했어요. 넓이는 $\\pi r^{2}\\times\\dfrac{x}{360}$로 구해요.' },
          { a: '16', why: '원 전체의 넓이예요. 중심각이 $90°$이니 원의 $\\frac{1}{4}$만큼이에요.' },
        ],
        explain: '$\\pi\\times4^{2}\\times\\dfrac{90}{360}=16\\pi\\times\\dfrac{1}{4}=4\\pi$ (cm²)예요. 그래서 $\\square$ 안에 알맞은 수는 4예요.',
      },
    },
  ],

  examples: [
    {
      q: '내각의 크기의 합이 $1440°$인 다각형의 대각선은 모두 몇 개일까요?',
      steps: [
        '구하는 다각형을 $n$각형이라고 하면 내각의 크기의 합은 $180°\\times(n-2)$예요.',
        '$180\\times(n-2)=1440$에서 $n-2=8$, 곧 $n=10$이에요. 이 다각형은 십각형이에요.',
        '십각형의 대각선의 개수는 $\\dfrac{10\\times(10-3)}{2}=\\dfrac{70}{2}=35$(개)예요.',
      ],
      answer: '35개',
    },
    {
      q: '반지름의 길이가 9 cm이고 중심각의 크기가 $120°$인 부채꼴의 호의 길이와 넓이를 구하세요.',
      fig: sectorFig(120, { r: '9 cm', angle: '120°', alt: '반지름이 9 cm 이고 중심각이 120도인 부채꼴' }),
      steps: [
        '중심각이 $120°$이므로 이 부채꼴은 원 전체의 $\\dfrac{120}{360}=\\dfrac{1}{3}$이에요.',
        '호의 길이: $2\\pi\\times9\\times\\dfrac{1}{3}=6\\pi$ (cm)',
        '넓이: $\\pi\\times9^{2}\\times\\dfrac{1}{3}=27\\pi$ (cm²)',
        '확인: $S=\\dfrac{1}{2}rl=\\dfrac{1}{2}\\times9\\times6\\pi=27\\pi$로 같아요.',
      ],
      answer: '호의 길이 $6\\pi$ cm, 넓이 $27\\pi$ cm²',
    },
  ],

  terms: [
    { term: '대각선', def: '다각형에서 서로 이웃하지 않는 두 꼭짓점을 이은 선분이에요. $n$각형의 대각선은 모두 $\\dfrac{n(n-3)}{2}$개예요.' },
    { term: '내각', def: '다각형에서 이웃한 두 변이 안쪽에 만드는 각이에요. 삼각형의 세 내각의 크기의 합은 $180°$예요.' },
    { term: '외각', def: '다각형에서 한 변과 그 이웃한 변의 연장선이 이루는 각이에요. 한 꼭짓점에서 내각과 외각의 크기의 합은 $180°$예요.' },
    { term: '정다각형', def: '모든 변의 길이가 같고 모든 내각의 크기가 같은 다각형이에요. 예: 정삼각형, 정사각형, 정오각형' },
    { term: '호', def: '원 위의 두 점을 양 끝으로 하는 원의 일부분이에요. 두 점 A, B를 양 끝으로 하는 호를 $\\widehat{AB}$로 나타내요.' },
    { term: '현', def: '원 위의 두 점을 이은 선분이에요. 한 원에서 가장 긴 현은 지름이에요.' },
    { term: '부채꼴', def: '원에서 두 반지름과 호로 둘러싸인 도형이에요.' },
    { term: '중심각', def: '부채꼴에서 두 반지름이 이루는 각이에요. 호의 길이와 부채꼴의 넓이는 중심각의 크기에 정비례해요.' },
    { term: '활꼴', def: '원에서 현과 호로 둘러싸인 도형이에요. 반원은 부채꼴이면서 활꼴이에요.' },
    { term: '원주율', def: '원의 둘레의 길이와 지름의 길이의 비율이에요. $3.141592\\cdots$로 끝없이 이어지는 소수라서 문자 $\\pi$(파이)로 나타내요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: '개', concept: 0,
      q: '팔각형의 대각선은 모두 몇 개일까요?',
      answer: '20',
      wrong: [
        { a: '40', why: '2로 나누는 것을 빠뜨렸어요. 대각선 하나를 양 끝 꼭짓점에서 두 번 셌으니 2로 나눠요.' },
        { a: '5', why: '한 꼭짓점에서 그을 수 있는 대각선의 개수예요. 전체 개수는 $\\dfrac{8\\times5}{2}$로 구해요.' },
      ],
      explain: '$\\dfrac{8\\times(8-3)}{2}=\\dfrac{40}{2}=20$(개)예요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '한 꼭짓점에서 그을 수 있는 대각선이 7개인 다각형은 무엇일까요?',
      choices: ['십각형', '칠각형', '팔각형', '구각형'],
      answer: 0,
      why: [
        '',
        '대각선의 개수를 그대로 꼭짓점의 개수로 보았어요. 한 꼭짓점에서는 $(n-3)$개를 그을 수 있어요.',
        '자기 자신만 빼고 셌어요. 이웃한 두 꼭짓점도 빼야 해요.',
        '자기 자신과 이웃한 꼭짓점 하나만 뺐어요. 이웃한 꼭짓점은 양쪽에 둘이에요.',
      ],
      explain: '$n$각형의 한 꼭짓점에서 그을 수 있는 대각선은 $(n-3)$개예요. $n-3=7$이므로 $n=10$, 십각형이에요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: '°', concept: 1,
      q: '삼각형 ABC에서 $\\angle B=48°$, $\\angle C=67°$일 때, $\\angle x$의 크기는 몇 도일까요?',
      fig: triFig(48, 67, { A: 'x', B: '48°', C: '67°', alt: '삼각형 ABC 에서 각 B 는 48도, 각 C 는 67도이고 각 A 를 x 로 나타낸 그림' }),
      answer: '65',
      wrong: [{ a: '115', why: '두 각의 크기를 더하기만 했어요. 그 값은 꼭짓점 A의 외각의 크기예요. 세 내각의 합 $180°$에서 빼요.' }],
      explain: '삼각형의 세 내각의 크기의 합은 $180°$이므로 $\\angle x=180°-(48°+67°)=65°$예요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: '°', concept: 1,
      q: '삼각형 ABC에서 변 BC의 연장선 위에 점 D가 있어요. $\\angle A=70°$, $\\angle B=45°$일 때, $\\angle x$의 크기는 몇 도일까요? ($\\angle x=\\angle ACD$)',
      fig: triFig(45, 65, { A: '70°', B: '45°', ext: 'x', alt: '삼각형 ABC 에서 각 A 는 70도, 각 B 는 45도이고 꼭짓점 C 의 외각을 x 로 나타낸 그림' }),
      answer: '115',
      wrong: [{ a: '65', why: '꼭짓점 C의 내각 $\\angle ACB$를 구했어요. 외각은 이웃하지 않는 두 내각의 크기의 합이에요.' }],
      explain: '삼각형의 한 외각의 크기는 그와 이웃하지 않는 두 내각의 크기의 합과 같아요. $\\angle x=70°+45°=115°$예요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: '°', concept: 2,
      q: '칠각형의 내각의 크기의 합은 몇 도일까요?',
      answer: '900',
      wrong: [
        { a: '1260', why: '$180°\\times7$을 계산했어요. 칠각형은 한 꼭짓점에서 그은 대각선으로 삼각형 $7-2=5$(개)로 나뉘어요.' },
        { a: '360', why: '외각의 크기의 합이에요. 묻는 것은 내각의 크기의 합이에요.' },
      ],
      explain: '칠각형은 삼각형 $7-2=5$(개)로 나뉘므로 내각의 크기의 합은 $180°\\times5=900°$예요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 2,
      q: '십이각형의 외각의 크기의 합은 오각형의 외각의 크기의 합보다 커요.',
      answer: false,
      explain: '다각형의 외각의 크기의 합은 변의 개수에 상관없이 항상 $360°$예요. 그래서 두 값은 같아요. (내각의 크기의 합은 십이각형이 $1800°$, 오각형이 $540°$로 달라요.)',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '원에 대한 설명으로 **옳지 않은** 것은 무엇일까요?',
      choices: [
        '현은 원 위의 두 점을 이은 선분이에요.',
        '반원은 부채꼴이면서 활꼴이에요.',
        '한 원에서 가장 긴 현은 지름이에요.',
        '중심각은 현과 호가 이루는 각이에요.',
      ],
      answer: 3,
      why: [
        '옳은 설명이에요. 현은 원 위의 두 점을 이은 선분이에요.',
        '옳은 설명이에요. 반원은 중심각이 $180°$인 부채꼴이고, 현(지름)과 호로 둘러싸인 활꼴이에요.',
        '옳은 설명이에요. 지름은 원의 중심을 지나는 현으로, 가장 길어요.',
        '',
      ],
      explain: '중심각은 부채꼴에서 **두 반지름**이 이루는 각이에요. 나머지 설명은 모두 옳아요.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 4,
      q: '한 원에서 중심각의 크기가 $30°$인 부채꼴의 넓이가 4 cm²예요. 중심각의 크기가 $150°$인 부채꼴의 넓이는 몇 cm²일까요?',
      answer: '20',
      wrong: [{ a: '5', why: '중심각이 몇 배인지만 구했어요. 넓이도 5배가 되니 $4\\times5$를 계산해요.' }],
      explain: '부채꼴의 넓이는 중심각의 크기에 정비례해요. $150°$는 $30°$의 5배이므로 넓이도 $4\\times5=20$ (cm²)예요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: 'π cm', concept: 5,
      q: '반지름의 길이가 6 cm이고 중심각의 크기가 $120°$인 부채꼴의 호의 길이를 $\\square\\pi$ cm라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      fig: sectorFig(120, { r: '6 cm', angle: '120°', alt: '반지름이 6 cm 이고 중심각이 120도인 부채꼴' }),
      answer: '4',
      hint: '원의 둘레 $2\\pi r$의 몇 분의 몇인지 생각해 보세요.',
      wrong: [
        { a: '12', why: '넓이를 구했어요. 호의 길이는 $2\\pi r\\times\\dfrac{x}{360}$로 구해요.' },
        { a: '2', why: '$2\\pi r$에서 2를 빠뜨렸어요. 원의 둘레는 $\\pi r$이 아니라 $2\\pi r$이에요.' },
      ],
      explain: '$2\\pi\\times6\\times\\dfrac{120}{360}=12\\pi\\times\\dfrac{1}{3}=4\\pi$ (cm)예요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: 'π cm²', concept: 5,
      q: '반지름의 길이가 10 cm이고 호의 길이가 $4\\pi$ cm인 부채꼴의 넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      answer: '20',
      hint: '중심각을 몰라도 반지름과 호의 길이로 넓이를 구하는 공식이 있어요.',
      wrong: [{ a: '40', why: '$\\dfrac{1}{2}$을 곱하는 것을 빠뜨렸어요. $S=\\dfrac{1}{2}rl$이에요.' }],
      explain: '$S=\\dfrac{1}{2}rl=\\dfrac{1}{2}\\times10\\times4\\pi=20\\pi$ (cm²)예요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '한 내각의 크기가 $140°$인 정다각형은 무엇일까요?',
      choices: ['정구각형', '정칠각형', '정팔각형', '정십각형'],
      answer: 0,
      why: [
        '',
        '정칠각형의 한 내각은 $\\dfrac{900°}{7}$로 $140°$보다 작아요. 한 외각부터 구해 보세요.',
        '정팔각형의 한 내각은 $135°$예요. 한 외각부터 구해 보세요.',
        '정십각형의 한 내각은 $144°$예요. 한 외각부터 구해 보세요.',
      ],
      hint: '한 외각의 크기를 먼저 구해 보세요.',
      explain: '한 외각의 크기는 $180°-140°=40°$예요. 외각의 크기의 합은 $360°$이므로 꼭짓점은 $360\\div40=9$(개), 정구각형이에요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', concept: 1,
      q: '삼각형 ABC에서 $\\angle A=2x°$, $\\angle B=(x+10)°$이고, 꼭짓점 C에서의 외각 $\\angle ACD$의 크기가 $100°$예요. $x$의 값을 구하세요.',
      fig: triFig(40, 80, { A: '2x°', B: '(x+10)°', ext: '100°', alt: '삼각형 ABC 에서 각 A 는 2x도, 각 B 는 x+10도, 꼭짓점 C 의 외각은 100도인 그림' }),
      answer: '30',
      hint: '외각의 크기는 이웃하지 않는 두 내각의 크기의 합이에요.',
      wrong: [
        { a: '70/3', why: '$100°$를 내각으로 보았어요. 꼭짓점 C의 외각이므로 $\\angle A+\\angle B=100°$예요.' },
        { a: '90', why: '$3x=90$에서 3으로 나누는 것을 빠뜨렸어요.' },
      ],
      explain: '외각의 성질에서 $2x+(x+10)=100$이에요. $3x+10=100$, $3x=90$이므로 $x=30$이에요. (확인: $\\angle A=60°$, $\\angle B=40°$, 합이 $100°$예요.)',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '°', concept: 0,
      q: '대각선이 모두 54개인 다각형의 내각의 크기의 합은 몇 도일까요?',
      answer: '1800',
      hint: '$\\dfrac{n(n-3)}{2}=54$를 만족하는 $n$을 먼저 찾아요. 차가 3인 두 자연수 $n$과 $n-3$의 곱이 108이에요.',
      wrong: [{ a: '12', why: '다각형이 십이각형이라는 것까지 구했어요. 내각의 크기의 합 $180°\\times(12-2)$까지 계산해요.' }],
      explain: '$\\dfrac{n(n-3)}{2}=54$이면 $n(n-3)=108$이에요. $12\\times9=108$이므로 $n=12$, 십이각형이에요. 내각의 크기의 합은 $180°\\times(12-2)=1800°$예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '°', concept: 1,
      q: '그림과 같은 별 모양에서 다섯 꼭짓점 A, B, C, D, E에 생긴 뾰족한 각의 크기의 합은 몇 도일까요?',
      fig: {
        type: 'polygon',
        points: [[0, 10], [5.88, -8.09], [-9.51, 3.09], [9.51, 3.09], [-5.88, -8.09]],
        labels: ['A', 'C', 'E', 'B', 'D'],
        alt: '꼭짓점 A, B, C, D, E 를 한 번에 이어 그린 별 모양',
      },
      answer: '180',
      hint: '꼭짓점 A를 꼭짓점으로 하는 작은 삼각형을 찾고, 그 삼각형의 나머지 두 각을 외각의 성질로 나타내 보세요.',
      wrong: [
        { a: '540', why: '오각형의 내각의 크기의 합이에요. 별의 뾰족한 각은 오각형의 내각이 아니에요.' },
        { a: '360', why: '외각의 크기의 합과 헷갈렸어요. 별의 꼭짓점 다섯 각을 한 삼각형의 세 내각으로 모아 보세요.' },
      ],
      explain: '선분 BE가 선분 AC, AD와 만나는 점을 각각 P, Q라고 해요.\n\n- 삼각형 PCE에서 $\\angle APQ$는 꼭짓점 P의 외각이므로 $\\angle APQ=\\angle C+\\angle E$\n- 삼각형 QBD에서 $\\angle AQP$는 꼭짓점 Q의 외각이므로 $\\angle AQP=\\angle B+\\angle D$\n\n삼각형 APQ의 세 내각의 크기의 합은 $180°$이므로 $\\angle A+\\angle B+\\angle C+\\angle D+\\angle E=180°$예요. (정오각형으로 만든 별이면 한 각이 $36°$이고, $36°\\times5=180°$로 맞아요.)',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'expr', concept: 5,
      q: '한 변의 길이가 10 cm인 정사각형의 마주 보는 두 꼭짓점을 중심으로, 반지름의 길이가 10 cm인 사분원(중심각이 $90°$인 부채꼴)을 그렸어요. 색칠한 부분의 넓이는 몇 cm²일까요? $\\pi$를 써서 나타내고, 단위는 쓰지 않아요. ($\\pi$는 pi로 써도 돼요.)',
      fig: lensFig(),
      answer: '50π-100',
      hint: '색칠한 부분을 정사각형의 대각선으로 반 나누면, 한쪽은 (사분원)$-$(직각삼각형)이에요.',
      wrong: [
        { a: '50π', why: '사분원 두 개의 넓이만 더했어요. 겹친 부분만 구하려면 직각삼각형 부분을 빼야 해요.' },
        { a: '25π-50', why: '색칠한 부분의 절반만 구했어요. 대각선의 양쪽에 같은 모양이 하나씩 있어요.' },
      ],
      explain: '정사각형의 대각선을 그으면 색칠한 부분이 똑같은 두 조각으로 나뉘어요.\n\n한 조각 $=$ (사분원) $-$ (직각삼각형) $=\\pi\\times10^{2}\\times\\dfrac{90}{360}-\\dfrac{1}{2}\\times10\\times10=25\\pi-50$\n\n두 조각이므로 $2\\times(25\\pi-50)=50\\pi-100$ (cm²)예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '한 내각의 크기와 한 외각의 크기의 비가 $7:2$인 정다각형의 대각선은 모두 몇 개일까요?',
      answer: '27',
      hint: '한 꼭짓점에서 (내각)+(외각)$=180°$예요. 이것을 $7:2$로 나눠 보세요.',
      wrong: [
        { a: '9', why: '정구각형이라는 것까지 구했어요. 대각선의 개수 $\\dfrac{9\\times6}{2}$까지 계산해요.' },
        { a: '54', why: '2로 나누는 것을 빠뜨렸어요.' },
      ],
      explain: '(내각)+(외각)$=180°$이므로 한 외각은 $180°\\times\\dfrac{2}{9}=40°$예요. 외각의 크기의 합이 $360°$이니 $360\\div40=9$, 정구각형이에요. 대각선은 $\\dfrac{9\\times(9-3)}{2}=27$(개)예요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: 'π cm²', concept: 5,
      q: '반지름의 길이가 6 cm인 부채꼴의 둘레의 길이가 $(12+4\\pi)$ cm예요. 이 부채꼴의 넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
      answer: '12',
      hint: '부채꼴의 둘레는 반지름 두 개와 호로 이루어져 있어요.',
      wrong: [{ a: '24', why: '$S=\\dfrac{1}{2}rl$에서 $\\dfrac{1}{2}$을 빠뜨렸어요.' }],
      explain: '부채꼴의 둘레 $=$ (반지름)$\\times2+$(호의 길이)이므로 호의 길이는 $(12+4\\pi)-12=4\\pi$ (cm)예요. 넓이는 $\\dfrac{1}{2}\\times6\\times4\\pi=12\\pi$ (cm²)예요.',
    },
  ],

  deeper: [
    {
      title: '외각의 합이 항상 360°인 까닭 — 걸어서 확인하기',
      body: '운동장에 커다란 오각형을 그리고 그 둘레를 따라 걸어 본다고 생각해 보세요. 한 변을 따라 걷다가 꼭짓점에 이르면 다음 변 쪽으로 몸을 돌려야 해요. 이때 몸을 돌린 각이 바로 그 꼭짓점의 **외각**이에요.\n\n둘레를 한 바퀴 돌아 처음 자리에 처음 방향으로 돌아오면, 몸은 모두 합해 정확히 한 바퀴, 곧 $360°$를 돈 거예요. 변이 몇 개이든 마찬가지예요. 그래서 볼록한 다각형의 외각의 크기의 합은 항상 $360°$예요.\n\n이 생각은 컴퓨터로 도형을 그릴 때도 쓰여요. 정$n$각형을 그리려면 "앞으로 가기, $\\dfrac{360°}{n}$만큼 돌기"를 $n$번 되풀이하면 돼요.',
    },
    {
      title: '원주율 π 이야기',
      body: '원의 크기가 달라도 (둘레의 길이)÷(지름의 길이)는 언제나 같은 값이에요. 이 값이 원주율 $\\pi$예요.\n\n고대 그리스의 아르키메데스는 원의 안쪽과 바깥쪽에 정구십육각형을 그려 둘레를 비교하는 방법으로, $\\pi$가 $\\dfrac{223}{71}$보다 크고 $\\dfrac{22}{7}$보다 작다는 것을 알아냈어요. 소수로 쓰면 약 3.1408과 약 3.1429 사이예요.\n\n$\\pi$는 분수로 정확히 나타낼 수 없고, 소수점 아래 숫자가 되풀이되는 규칙 없이 끝없이 이어져요. 그래서 중학교부터는 3.14 같은 어림값 대신 문자 $\\pi$를 그대로 써서 정확한 값을 나타내요.',
    },
  ],

  faq: [
    {
      q: '외각은 한 꼭짓점에 두 개 생기지 않아요?',
      a: '맞아요. 한 꼭짓점에서 두 변 중 어느 쪽을 늘이느냐에 따라 외각이 두 개 생겨요. 그런데 두 외각은 맞꼭지각이라 크기가 같아요. 그래서 외각의 크기의 합을 구할 때는 꼭짓점마다 하나씩만 더해요.',
    },
    {
      q: '부채꼴의 넓이를 1/2 × 반지름 × 호의 길이로 구할 수 있는 건 왜예요?',
      a: '부채꼴을 아주 가늘게 여러 조각으로 잘라 위아래로 엇갈리게 늘어놓으면 평행사변형에 가까운 모양이 돼요. 밑변은 호의 길이의 절반인 $\\dfrac{1}{2}l$, 높이는 반지름 $r$에 가까워지지요. 그래서 넓이는 $\\dfrac{1}{2}l\\times r=\\dfrac{1}{2}rl$이에요.\n\n식으로도 $\\pi r^{2}\\times\\dfrac{x}{360}=\\dfrac{1}{2}r\\times\\left(2\\pi r\\times\\dfrac{x}{360}\\right)$로 확인할 수 있어요.',
    },
    {
      q: '답에 π를 3.14로 바꿔서 써야 하지 않아요?',
      a: '문제에서 "원주율은 3.14로 계산하세요"라고 하지 않았다면 $\\pi$를 그대로 써요. 3.14는 어림값이라서 정확한 답이 아니에요. 이 사이트에서 "$\\square\\pi$ cm" 꼴로 물으면 $\\pi$ 앞의 수만 쓰면 돼요.',
    },
  ],

  mistakes: [
    '대각선의 개수를 $n(n-3)$으로 구하고 2로 나누지 않는 실수 — 대각선 하나를 양 끝에서 두 번 셌으니 $\\dfrac{n(n-3)}{2}$예요.',
    '$n$각형의 내각의 크기의 합을 $180°\\times n$으로 계산하는 실수 — 한 꼭짓점에서 대각선을 그으면 삼각형이 $(n-2)$개 생겨요.',
    '현의 길이도 중심각의 크기에 정비례한다고 생각하는 실수 — 정비례하는 것은 호의 길이와 부채꼴의 넓이예요.',
  ],

  gens: [
    {
      id: 'diagonals',
      level: 1,
      title: '다각형의 대각선의 개수',
      make: function (R) {
        var n = R.int(4, 20);
        var total = n * (n - 3) / 2;
        if (R.bool()) {
          return {
            type: 'short', check: 'number', unit: '개', concept: 0,
            q: gon(n) + '의 대각선은 모두 몇 개일까요?',
            answer: String(total),
            wrong: wrongList(fr(total), [
              [fr(n * (n - 3)), '2로 나누는 것을 빠뜨렸어요. 대각선 하나를 양 끝 꼭짓점에서 두 번 셌으니 2로 나눠요.'],
              [fr(n - 3), '한 꼭짓점에서 그을 수 있는 대각선의 개수예요. 꼭짓점 ' + n + '개에서 모두 그은 것을 세어요.'],
              [fr(n * (n - 1) / 2), '변까지 함께 셌어요. 이웃한 두 꼭짓점을 이은 선분은 변이에요.'],
            ]),
            explain: '$n$각형의 대각선의 개수는 $\\dfrac{n(n-3)}{2}$예요. ' + gon(n) + '이므로 $\\dfrac{' + n + '\\times' + (n - 3) + '}{2}=' + total + '$(개)예요.',
          };
        }
        return {
          type: 'short', check: 'number', unit: '개', concept: 0,
          q: gon(n) + '의 한 꼭짓점에서 그을 수 있는 대각선은 몇 개일까요?',
          answer: String(n - 3),
          wrong: wrongList(fr(n - 3), [
            [fr(n - 1), '자기 자신만 뺐어요. 이웃한 두 꼭짓점과 이은 선분은 변이라서 대각선이 아니에요.'],
            [fr(n - 2), '이웃한 꼭짓점을 하나만 뺐어요. 이웃한 꼭짓점은 양쪽에 둘이에요.'],
            [fr(total), gon(n) + ' 전체의 대각선의 개수예요. 한 꼭짓점에서 그을 수 있는 것만 세어요.'],
          ]),
          explain: '꼭짓점 ' + n + '개 가운데 자기 자신과 이웃한 두 꼭짓점을 빼면 $' + n + '-3=' + (n - 3) + '$(개)가 남아요. 그래서 대각선은 ' + (n - 3) + '개예요.',
        };
      },
    },
    {
      id: 'triangle-angle',
      level: 1,
      title: '삼각형의 내각과 외각',
      make: function (R) {
        var b, c, a;
        do { b = R.int(6, 16) * 5; c = R.int(6, 16) * 5; a = 180 - b - c; } while (a < 30);
        var mode = R.pick(['in', 'ext', 'back']);
        var D = '°';
        if (mode === 'in') {
          return {
            type: 'short', check: 'number', unit: '°', concept: 1,
            q: '삼각형 ABC에서 $\\angle B=' + b + D + '$, $\\angle C=' + c + D + '$일 때, $\\angle x$의 크기는 몇 도일까요?',
            fig: triFig(b, c, { A: 'x', B: b + '°', C: c + '°', alt: '삼각형 ABC 에서 각 B 는 ' + b + '도, 각 C 는 ' + c + '도이고 각 A 를 x 로 나타낸 그림' }),
            answer: String(a),
            wrong: wrongList(fr(a), [
              [fr(b + c), '두 각의 크기를 더하기만 했어요. 그 값은 꼭짓점 A의 외각의 크기예요. 세 내각의 합 $180' + D + '$에서 빼요.'],
              [fr(360 - b - c), '세 내각의 크기의 합을 $360' + D + '$로 보았어요. 삼각형의 세 내각의 합은 $180' + D + '$예요.'],
            ]),
            explain: '삼각형의 세 내각의 크기의 합은 $180' + D + '$이므로 $\\angle x=180' + D + '-(' + b + D + '+' + c + D + ')=' + a + D + '$예요.',
          };
        }
        if (mode === 'ext') {
          return {
            type: 'short', check: 'number', unit: '°', concept: 1,
            q: '삼각형 ABC에서 변 BC의 연장선 위에 점 D가 있어요. $\\angle A=' + a + D + '$, $\\angle B=' + b + D + '$일 때, $\\angle x$의 크기는 몇 도일까요? ($\\angle x=\\angle ACD$)',
            fig: triFig(b, c, { A: a + '°', B: b + '°', ext: 'x', alt: '삼각형 ABC 에서 각 A 는 ' + a + '도, 각 B 는 ' + b + '도이고 꼭짓점 C 의 외각을 x 로 나타낸 그림' }),
            answer: String(a + b),
            wrong: wrongList(fr(a + b), [
              [fr(c), '꼭짓점 C의 내각 $\\angle ACB$를 구했어요. 외각은 이웃하지 않는 두 내각의 크기의 합이에요.'],
              [fr(180 - a), '꼭짓점 A에서의 외각을 구했어요. 꼭짓점 C에서의 외각은 $\\angle A+\\angle B$예요.'],
              [fr(180 - b), '꼭짓점 B에서의 외각을 구했어요. 꼭짓점 C에서의 외각은 $\\angle A+\\angle B$예요.'],
            ]),
            explain: '삼각형의 한 외각의 크기는 그와 이웃하지 않는 두 내각의 크기의 합과 같아요. $\\angle x=' + a + D + '+' + b + D + '=' + (a + b) + D + '$예요.',
          };
        }
        return {
          type: 'short', check: 'number', unit: '°', concept: 1,
          q: '삼각형 ABC에서 변 BC의 연장선 위에 점 D가 있어요. $\\angle B=' + b + D + '$, $\\angle ACD=' + (a + b) + D + '$일 때, $\\angle x$의 크기는 몇 도일까요? ($\\angle x=\\angle A$)',
          fig: triFig(b, c, { A: 'x', B: b + '°', ext: (a + b) + '°', alt: '삼각형 ABC 에서 각 B 는 ' + b + '도, 꼭짓점 C 의 외각은 ' + (a + b) + '도이고 각 A 를 x 로 나타낸 그림' }),
          answer: String(a),
          wrong: wrongList(fr(a), [
            [fr(a + 2 * b), '두 각을 더했어요. 외각 $=\\angle A+\\angle B$이므로 $\\angle A$는 외각에서 $\\angle B$를 빼서 구해요.'],
            [fr(c), '꼭짓점 C의 내각 $\\angle ACB$를 구했어요. 묻는 것은 $\\angle A$예요.'],
          ]),
          explain: '외각의 성질에서 $\\angle ACD=\\angle x+\\angle B$예요. 그래서 $\\angle x=' + (a + b) + D + '-' + b + D + '=' + a + D + '$예요.',
        };
      },
    },
    {
      id: 'polygon-angles',
      level: 2,
      title: '다각형의 내각과 외각의 크기의 합',
      make: function (R) {
        var D = '°';
        var mode = R.pick(['sum', 'reg-in', 'reg-ex', 'find-sum', 'find-ex', 'find-in']);
        var REG = [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36];
        var n, S, e, i;
        if (mode === 'sum') {
          n = R.int(5, 16); S = 180 * (n - 2);
          return {
            type: 'short', check: 'number', unit: '°', concept: 2,
            q: gon(n) + '의 내각의 크기의 합은 몇 도일까요?',
            answer: String(S),
            wrong: wrongList(fr(S), [
              [fr(180 * n), '$180' + D + '\\times' + n + '$' + R.josa(n, '을/를') + ' 계산했어요. ' + gon(n) + '은 삼각형 $' + n + '-2=' + (n - 2) + '$(개)로 나뉘어요.'],
              [fr(180 * (n - 3)), '대각선의 개수 $(n-3)$을 삼각형의 개수로 보았어요. 삼각형은 $(n-2)$개 생겨요.'],
              [fr(360), '외각의 크기의 합이에요. 묻는 것은 내각의 크기의 합이에요.'],
            ]),
            explain: gon(n) + '은 한 꼭짓점에서 그은 대각선으로 삼각형 $' + (n - 2) + '$개로 나뉘어요. 내각의 크기의 합은 $180' + D + '\\times' + (n - 2) + '=' + S + D + '$예요.',
          };
        }
        if (mode === 'reg-in' || mode === 'reg-ex') {
          n = R.pick(REG.slice(1, 11)); e = 360 / n; i = 180 - e;
          if (mode === 'reg-in') {
            return {
              type: 'short', check: 'number', unit: '°', concept: 2,
              q: '정' + gon(n) + '의 한 내각의 크기는 몇 도일까요?',
              answer: String(i),
              wrong: wrongList(fr(i), [
                [fr(e), '한 외각의 크기를 구했어요. 한 내각은 $180' + D + '$에서 한 외각을 빼요.'],
                [fr(180 * (n - 2)), '내각의 크기의 합이에요. 정다각형은 내각의 크기가 모두 같으니 꼭짓점의 개수 ' + n + R.josa(n, '으로/로') + ' 나눠요.'],
              ]),
              explain: '한 외각은 $360' + D + '\\div' + n + '=' + e + D + '$이므로 한 내각은 $180' + D + '-' + e + D + '=' + i + D + '$예요. (또는 $\\dfrac{180' + D + '\\times' + (n - 2) + '}{' + n + '}=' + i + D + '$)',
            };
          }
          return {
            type: 'short', check: 'number', unit: '°', concept: 2,
            q: '정' + gon(n) + '의 한 외각의 크기는 몇 도일까요?',
            answer: String(e),
            wrong: wrongList(fr(e), [
              [fr(i), '한 내각의 크기를 구했어요. 외각의 크기의 합 $360' + D + '$를 ' + n + R.josa(n, '으로/로') + ' 나눠요.'],
              [fr(180, n), '$180' + D + '$를 꼭짓점의 개수로 나눴어요. 외각의 크기의 합은 $360' + D + '$예요.'],
            ]),
            explain: '외각의 크기의 합은 항상 $360' + D + '$이고, 정' + gon(n) + '의 외각은 크기가 모두 같아요. 한 외각은 $360' + D + '\\div' + n + '=' + e + D + '$예요.',
          };
        }
        if (mode === 'find-sum') {
          n = R.int(5, 16); S = 180 * (n - 2);
          return {
            type: 'short', check: 'number', unit: '각형', concept: 2,
            q: '내각의 크기의 합이 $' + S + D + '$인 다각형은 몇 각형일까요? 수로 답하세요.',
            answer: String(n),
            wrong: wrongList(fr(n), [
              [fr(n - 2), '$' + S + '\\div180$은 삼각형의 개수예요. 다각형의 꼭짓점의 개수는 그보다 2 커요.'],
              [fr(n - 1), '$180' + D + '\\times(n-2)$에서 $n-2$를 다시 확인해 보세요.'],
            ]),
            explain: '$180\\times(n-2)=' + S + '$에서 $n-2=' + (n - 2) + '$, 곧 $n=' + n + '$' + R.josa(n, '이에요/예요') + '. ' + gon(n) + '이에요.',
          };
        }
        if (mode === 'find-ex') {
          n = R.pick(REG.slice(2)); e = 360 / n;
          return {
            type: 'short', check: 'number', concept: 2,
            q: '한 외각의 크기가 $' + e + D + '$인 정다각형을 정$\\square$각형이라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
            answer: String(n),
            wrong: [],
            explain: '외각의 크기의 합은 $360' + D + '$이므로 꼭짓점의 개수는 $360\\div' + e + '=' + n + '$' + R.josa(n, '이에요/예요') + '. 정' + gon(n) + '이에요.',
          };
        }
        n = R.pick(REG.slice(2)); e = 360 / n; i = 180 - e;
        return {
          type: 'short', check: 'number', concept: 2,
          q: '한 내각의 크기가 $' + i + D + '$인 정다각형을 정$\\square$각형이라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
          answer: String(n),
          hint: '한 외각의 크기를 먼저 구해 보세요.',
          wrong: wrongList(fr(n), [
            [fr(360, i), '내각의 크기로 $360' + D + '$를 나눴어요. $360' + D + '$를 나누는 것은 한 외각의 크기예요.'],
          ]),
          explain: '한 외각의 크기는 $180' + D + '-' + i + D + '=' + e + D + '$예요. 외각의 크기의 합은 $360' + D + '$이므로 꼭짓점의 개수는 $360\\div' + e + '=' + n + '$, 정' + gon(n) + '이에요.',
        };
      },
    },
    {
      id: 'sector',
      level: 2,
      title: '부채꼴의 호의 길이와 넓이',
      make: function (R) {
        var XS = [30, 40, 45, 60, 72, 90, 120, 135, 150, 180, 210, 240, 270, 300];
        var mode = R.pick(['arc', 'area', 'rl', 'angle']);
        var r, x, k, tries = 0;
        function ok() {
          if (mode === 'area') return (r * r * x) % 360 === 0;
          return (r * x) % 180 === 0;
        }
        do { r = R.int(2, 12); x = R.pick(XS); tries++; } while (!ok() && tries < 200);
        if (!ok()) { r = 6; x = 60; }
        k = fr(r * x, 180);                 // 호의 길이 = kπ
        var area = fr(r * r * x, 360);      // 넓이 = (area)π
        var Dg = '°';
        var frac = '\\dfrac{' + x + '}{360}';
        if (mode === 'arc') {
          return {
            type: 'short', check: 'number', unit: 'π cm', concept: 5,
            q: '반지름의 길이가 ' + r + ' cm이고 중심각의 크기가 $' + x + Dg + '$인 부채꼴의 호의 길이를 $\\square\\pi$ cm라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
            fig: sectorFig(x, { r: r + ' cm', angle: x + '°' }),
            answer: fstr(k),
            wrong: wrongList(k, [
              [area, '넓이를 구했어요. 호의 길이는 $2\\pi r\\times' + frac + '$' + R.josa(x, '으로/로') + ' 구해요.'],
              [fr(r * x, 360), '$2\\pi r$에서 2를 빠뜨렸어요. 원의 둘레는 $2\\pi r$이에요.'],
              [fr(2 * r), '원 전체의 둘레를 구했어요. 중심각이 $' + x + Dg + '$이니 $' + frac + '$' + R.josa(x, '을/를') + ' 곱해요.'],
            ]),
            explain: '$l=2\\pi\\times' + r + '\\times' + frac + '=' + piTex(k) + '$ (cm)예요.',
          };
        }
        if (mode === 'area') {
          return {
            type: 'short', check: 'number', unit: 'π cm²', concept: 5,
            q: '반지름의 길이가 ' + r + ' cm이고 중심각의 크기가 $' + x + Dg + '$인 부채꼴의 넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
            fig: sectorFig(x, { r: r + ' cm', angle: x + '°' }),
            answer: fstr(area),
            wrong: wrongList(area, [
              [k, '호의 길이를 구했어요. 넓이는 $\\pi r^{2}\\times' + frac + '$' + R.josa(x, '으로/로') + ' 구해요.'],
              [fr(r * r), '원 전체의 넓이를 구했어요. 중심각이 $' + x + Dg + '$이니 $' + frac + '$' + R.josa(x, '을/를') + ' 곱해요.'],
              [fr(2 * r * x, 360), '$r^{2}$ 대신 $2r$를 곱했어요. 반지름을 두 번 곱해요: $' + r + '^{2}=' + (r * r) + '$'],
            ]),
            explain: '$S=\\pi\\times' + r + '^{2}\\times' + frac + '=' + piTex(area) + '$ (cm²)예요.',
          };
        }
        var S2 = fr(r * k.n, 2 * k.d);
        if (mode === 'rl') {
          return {
            type: 'short', check: 'number', unit: 'π cm²', concept: 5,
            q: '반지름의 길이가 ' + r + ' cm이고 호의 길이가 $' + piTex(k) + '$ cm인 부채꼴의 넓이를 $\\square\\pi$ cm²라고 할 때, $\\square$ 안에 알맞은 수를 쓰세요.',
            fig: sectorFig(x, { r: r + ' cm', arc: fstr(k) === '1' ? 'π cm' : fstr(k) + 'π cm' }),
            answer: fstr(S2),
            hint: '중심각을 몰라도 반지름과 호의 길이로 넓이를 구할 수 있어요.',
            wrong: wrongList(S2, [
              [fr(r * k.n, k.d), '$\\dfrac{1}{2}$을 곱하는 것을 빠뜨렸어요. $S=\\dfrac{1}{2}rl$이에요.'],
            ]),
            explain: '$S=\\dfrac{1}{2}rl=\\dfrac{1}{2}\\times' + r + '\\times' + piTex(k) + '=' + piTex(S2) + '$ (cm²)예요.',
          };
        }
        return {
          type: 'short', check: 'number', unit: '°', concept: 5,
          q: '반지름의 길이가 ' + r + ' cm이고 호의 길이가 $' + piTex(k) + '$ cm인 부채꼴의 중심각의 크기는 몇 도일까요?',
          fig: sectorFig(x, { r: r + ' cm', arc: fstr(k) === '1' ? 'π cm' : fstr(k) + 'π cm', angle: '?' }),
          answer: String(x),
          hint: '원 전체의 둘레를 먼저 구하고, 호의 길이가 그 몇 분의 몇인지 생각해 보세요.',
          wrong: wrongList(fr(x), [
            [fr(2 * x), '원의 둘레를 $\\pi r$로 보았어요. 원의 둘레는 $2\\pi r=' + (2 * r) + '\\pi$예요.'],
            [fr(x, 2), '원 한 바퀴를 $180' + Dg + '$로 보았어요. 호의 길이가 원 둘레 $' + (2 * r) + '\\pi$의 몇 분의 몇인지 구한 뒤 $360' + Dg + '$를 곱해요.'],
          ]),
          explain: '원 전체의 둘레는 $2\\pi\\times' + r + '=' + (2 * r) + '\\pi$ (cm)예요. 호의 길이 $' + piTex(k) + '$는 그 $\\dfrac{' + x + '}{360}$이므로 중심각의 크기는 $' + x + Dg + '$예요. (식: $2\\pi\\times' + r + '\\times\\dfrac{x}{360}=' + piTex(k) + '$에서 $x=' + x + '$)',
        };
      },
    },
  ],
});
})();
