/* 중1 수학 · 작도와 합동
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림은 아래 도우미가 만드는 svg (선·글자는 currentColor, 강조는 var(--fig-1)) */
var M108 = (function () {
  var PI = Math.PI;
  function r(v) { return Math.round(v * 10) / 10; }
  function ln(x1, y1, x2, y2, o) {
    o = o || {};
    return '<line x1="' + r(x1) + '" y1="' + r(y1) + '" x2="' + r(x2) + '" y2="' + r(y2) + '" stroke="' + (o.c || 'currentColor') +
      '" stroke-width="' + (o.w || 2) + '"' + (o.dash ? ' stroke-dasharray="6 4"' : '') + ' stroke-linecap="round"/>';
  }
  function tx(x, y, s, o) {
    o = o || {};
    return '<text x="' + r(x) + '" y="' + r(y) + '" font-size="' + (o.size || 15) + '" text-anchor="middle" dominant-baseline="central" fill="' +
      (o.c || 'currentColor') + '"' + (o.it ? ' font-style="italic"' : '') + '>' + s + '</text>';
  }
  function dot(x, y) { return '<circle cx="' + r(x) + '" cy="' + r(y) + '" r="3.5" fill="currentColor"/>'; }
  function pol(cx, cy, rad, deg) { return [cx + rad * Math.cos(deg * PI / 180), cy - rad * Math.sin(deg * PI / 180)]; }
  function dir(V, Q) { return Math.atan2(-(Q[1] - V[1]), Q[0] - V[0]) * 180 / PI; }
  function arc(cx, cy, rad, d0, d1, o) {
    o = o || {};
    var p = pol(cx, cy, rad, d0), q = pol(cx, cy, rad, d1);
    return '<path d="M' + r(p[0]) + ' ' + r(p[1]) + ' A' + rad + ' ' + rad + ' 0 ' + (d1 - d0 > 180 ? 1 : 0) + ' 0 ' + r(q[0]) + ' ' + r(q[1]) +
      '" fill="none" stroke="' + (o.c || 'var(--fig-1)') + '" stroke-width="' + (o.w || 2) + '"' + (o.dash ? ' stroke-dasharray="4 4"' : '') + '/>';
  }
  function fig(w, h, body, alt) { return { type: 'svg', svg: '<svg viewBox="0 0 ' + w + ' ' + h + '">' + body + '</svg>', alt: alt }; }
  // 꼭짓점 V 에서 두 점 Q1, Q2 를 향한 각의 [작은 방향, 큰 방향] (안쪽 각이 되도록)
  function span(V, Q1, Q2) {
    var a = dir(V, Q1), b = dir(V, Q2);
    if (b < a) { var t = a; a = b; b = t; }
    if (b - a > 180) { var t2 = a + 360; a = b; b = t2; }
    return [a, b];
  }

  // 삼각형 하나. P: 꼭짓점 3개, names: 이름, o.sides: 변 P0P1, P1P2, P2P0 옆 글자, o.ticks: 변마다 같은 길이 표시 개수,
  // o.angles: 꼭짓점마다 각 안 글자, o.arcs: 꼭짓점마다 같은 각 표시 개수
  function tri(P, names, o) {
    o = o || {};
    var G = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3], s = '';
    s += '<path d="M' + P.map(function (p) { return r(p[0]) + ' ' + r(p[1]); }).join(' L') + ' Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
    for (var i = 0; i < 3; i++) {
      var A = P[i], B = P[(i + 1) % 3];
      var M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], len = Math.hypot(B[0] - A[0], B[1] - A[1]);
      var u = [(B[0] - A[0]) / len, (B[1] - A[1]) / len], nrm = [-u[1], u[0]];
      if ((M[0] - G[0]) * nrm[0] + (M[1] - G[1]) * nrm[1] < 0) nrm = [-nrm[0], -nrm[1]];
      var k = (o.ticks || [])[i] || 0;
      for (var j = 0; j < k; j++) {
        var off = (j - (k - 1) / 2) * 5, c = [M[0] + u[0] * off, M[1] + u[1] * off];
        s += ln(c[0] - nrm[0] * 6, c[1] - nrm[1] * 6, c[0] + nrm[0] * 6, c[1] + nrm[1] * 6, { w: 1.6 });
      }
      var sl = (o.sides || [])[i];
      if (sl) s += tx(M[0] + nrm[0] * 24, M[1] + nrm[1] * 24, sl, { size: 14 });
    }
    for (var v = 0; v < 3; v++) {
      var V = P[v], sp = span(V, P[(v + 1) % 3], P[(v + 2) % 3]);
      var na = (o.arcs || [])[v] || 0, al = (o.angles || [])[v];
      for (var q = 0; q < na; q++) s += arc(V[0], V[1], 16 + q * 4, sp[0], sp[1]);
      if (al) { var lp = pol(V[0], V[1], 34, (sp[0] + sp[1]) / 2); s += tx(lp[0], lp[1], al, { size: 13 }); }
      var out = [V[0] - G[0], V[1] - G[1]], ol = Math.hypot(out[0], out[1]);
      s += tx(V[0] + out[0] / ol * 14, V[1] + out[1] / ol * 14, names[v]);
    }
    return s;
  }
  var T1 = [[80, 30], [30, 150], [180, 150]];
  var T2 = [[355, 30], [405, 150], [255, 150]]; // T1 을 좌우로 뒤집은 자리
  // 합동인 두 삼각형: n1, n2 는 T1, T2 의 꼭짓점 이름(대응 순서), o1·o2 는 tri 의 꾸밈
  function pair(n1, n2, o1, o2, alt) {
    return fig(430, 185, tri(T1, n1, o1) + tri(T2, n2, o2), alt);
  }
  function one(names, o, alt) {
    return fig(220, 185, tri(T1, names, o), alt);
  }

  // 길이가 같은 선분의 작도
  function copySeg() {
    var o = '', len = 120;
    o += ln(40, 40, 40 + len, 40) + dot(40, 40) + dot(40 + len, 40) + tx(40, 58, 'A') + tx(40 + len, 58, 'B');
    o += ln(20, 125, 350, 125) + tx(360, 125, 'l', { it: true });
    o += arc(80, 125, len, -18, 30) + dot(80, 125) + dot(80 + len, 125) + tx(80, 143, 'P') + tx(80 + len, 143, 'Q');
    return fig(375, 160, o, '선분 AB의 길이를 컴퍼스로 재어, 직선 l 위의 점 P를 중심으로 원을 그려 교점 Q를 찾는 작도');
  }
  // 크기가 같은 각의 작도
  function copyAngle() {
    var o = '', R0 = 75, ang = 42, O = [30, 160], P = [215, 160];
    var A = pol(O[0], O[1], R0, 0), B = pol(O[0], O[1], R0, ang);
    var X = pol(O[0], O[1], 150, 0), Y = pol(O[0], O[1], 150, ang);
    o += ln(O[0], O[1], X[0], X[1]) + ln(O[0], O[1], Y[0], Y[1]);
    o += arc(O[0], O[1], R0, -8, ang + 10, { w: 1.5 }) + dot(A[0], A[1]) + dot(B[0], B[1]);
    o += tx(O[0] - 4, O[1] + 16, 'O') + tx(A[0] + 6, A[1] + 16, 'A') + tx(B[0] - 6, B[1] - 14, 'B') + tx(X[0] + 6, X[1] + 14, 'X') + tx(Y[0] + 6, Y[1] - 10, 'Y');
    var C = pol(P[0], P[1], R0, 0), D = pol(P[0], P[1], R0, ang), Q = pol(P[0], P[1], 150, 0), E = pol(P[0], P[1], 150, ang);
    var ab = 2 * R0 * Math.sin(ang / 2 * PI / 180);
    o += ln(P[0], P[1], Q[0], Q[1]) + ln(P[0], P[1], E[0], E[1], { c: 'var(--fig-1)', dash: true });
    o += arc(P[0], P[1], R0, -8, ang + 10, { w: 1.5 }) + arc(C[0], C[1], r(ab), 70, 130, { w: 1.5 });
    o += dot(C[0], C[1]) + dot(D[0], D[1]) + tx(P[0] - 4, P[1] + 16, 'P') + tx(C[0] + 6, C[1] + 16, 'C') + tx(D[0] - 10, D[1] - 12, 'D') + tx(Q[0] + 6, Q[1] + 14, 'Q');
    return fig(380, 190, o, '각 XOY와 크기가 같은 각 DPC를 작도하는 과정');
  }
  // 두 선분 AB, CD 가 서로의 중점 M 에서 만나는 그림
  function bowtie() {
    var A = [60, 40], B = [300, 160], C = [80, 150], D = [280, 50], M = [180, 100], o = '';
    o += ln(A[0], A[1], B[0], B[1]) + ln(C[0], C[1], D[0], D[1]) + ln(A[0], A[1], C[0], C[1]) + ln(B[0], B[1], D[0], D[1]);
    o += dot(M[0], M[1]) + tx(A[0] - 12, A[1] - 6, 'A') + tx(B[0] + 12, B[1] + 6, 'B') + tx(C[0] - 12, C[1] + 6, 'C') + tx(D[0] + 12, D[1] - 6, 'D') + tx(M[0], M[1] + 18, 'M');
    return fig(360, 190, o, '두 선분 AB와 CD가 점 M에서 만나고 선분 AC, BD를 그은 그림');
  }
  return { pair: pair, one: one, copySeg: copySeg, copyAngle: copyAngle, bowtie: bowtie };
})();

Tutor.registerUnit({
  id: 'math-m1-08',
  course: 'math-m1',
  title: '작도와 합동',
  summary: '눈금 없는 자와 컴퍼스로 선분, 각, 삼각형을 작도하고, 삼각형의 합동 조건을 알아봐요.',
  goals: [
    '눈금 없는 자와 컴퍼스로 길이가 같은 선분과 크기가 같은 각을 작도할 수 있어요.',
    '삼각형의 세 변의 길이 사이의 관계를 알고, 삼각형이 하나로 정해지는 조건을 말할 수 있어요.',
    '합동인 도형에서 대응변과 대응각을 찾을 수 있어요.',
    '삼각형의 합동 조건(SSS, SAS, ASA)을 이용해 두 삼각형이 합동인지 판단할 수 있어요.',
  ],
  standards: ['[9수03-03]', '[9수03-04]'],

  concepts: [
    {
      title: '작도와 길이가 같은 선분의 작도',
      body: '**눈금 없는 자와 컴퍼스만**을 써서 도형을 그리는 것을 **작도**라고 해요.\n\n' +
        '- **눈금 없는 자**: 두 점을 이어 선분을 긋거나, 선분을 연장할 때 써요. 길이를 재는 데는 쓰지 않아요.\n' +
        '- **컴퍼스**: 원을 그리거나, 선분의 길이를 재어 다른 곳으로 옮길 때 써요.\n\n' +
        '**선분 AB와 길이가 같은 선분 PQ 작도하기**\n\n' +
        '1. 눈금 없는 자로 직선 $l$을 긋고, 그 위에 점 P를 잡아요.\n' +
        '2. 컴퍼스로 선분 AB의 길이를 재요.\n' +
        '3. 점 P를 중심으로 반지름이 $\\overline{AB}$인 원을 그려 직선 $l$과 만나는 점을 Q라고 해요. 그러면 $\\overline{PQ}=\\overline{AB}$예요.\n\n' +
        '> 💡 같은 방법을 두 번 하면 길이가 $\\overline{AB}$의 2배인 선분도 작도할 수 있어요.',
      easy: '작도는 "자의 눈금을 볼 수 없는 상태로 그림 그리기"예요. 컴퍼스는 다리 사이의 벌어진 정도를 그대로 들고 다니는 "길이 운반기"라고 생각하면 돼요.\n\n' +
        '선분 AB에 컴퍼스 다리를 맞춰 벌린 다음, 그 벌림을 그대로 들고 점 P로 가서 원을 그리면 P에서 같은 거리에 있는 점 Q를 찾을 수 있어요.',
      fig: M108.copySeg(),
      check: {
        type: 'ox',
        q: '작도에서 선분의 길이를 재어 다른 곳으로 옮길 때는 눈금 없는 자를 써요.',
        answer: false,
        explain: '길이를 재어 옮길 때는 **컴퍼스**를 써요. 눈금 없는 자는 두 점을 잇거나 선분을 연장할 때만 써요.',
      },
    },
    {
      title: '크기가 같은 각의 작도',
      body: '**$\\angle XOY$와 크기가 같은 각을 반직선 PQ를 한 변으로 하여 작도하기**\n\n' +
        '1. 점 O를 중심으로 원을 그려 두 반직선 OX, OY와 만나는 점을 각각 A, B라고 해요.\n' +
        '2. 점 P를 중심으로 반지름이 $\\overline{OA}$인 원을 그려 반직선 PQ와 만나는 점을 C라고 해요.\n' +
        '3. 컴퍼스로 $\\overline{AB}$의 길이를 재어, 점 C를 중심으로 반지름이 $\\overline{AB}$인 원을 그려 2의 원과 만나는 점을 D라고 해요.\n' +
        '4. 반직선 PD를 그으면 $\\angle DPC=\\angle XOY$예요.\n\n' +
        '세 변의 길이 $\\overline{OA}=\\overline{PC}$, $\\overline{OB}=\\overline{PD}$, $\\overline{AB}=\\overline{CD}$가 같은 두 삼각형을 만든 셈이라 각의 크기도 같아져요(뒤에서 배우는 SSS 합동).\n\n' +
        '> 💡 이 방법으로 **평행선**도 작도할 수 있어요. 직선 밖의 점에서 동위각(또는 엇각)의 크기가 같도록 각을 작도하면, 동위각이 같으니 두 직선은 평행해요.',
      easy: '각을 옮기는 것은 "각의 입 벌린 정도"를 옮기는 거예요. 각의 크기를 각도기로 잴 수 없으니, 꼭짓점에서 같은 거리에 있는 두 점 A, B 사이의 거리(입 벌린 폭)를 컴퍼스로 재어 옮겨요.\n\n' +
        '같은 거리만큼 떨어진 곳에서 입 벌린 폭이 같으면, 각의 크기도 같아요.',
      fig: M108.copyAngle(),
      check: {
        type: 'choice',
        q: '직선 $l$ 밖의 한 점 P를 지나고 직선 $l$에 평행한 직선을 작도할 때 이용하는 성질은 무엇일까요?',
        choices: ['동위각(또는 엇각)의 크기가 같으면 두 직선은 평행하다.', '맞꼭지각의 크기는 서로 같다.', '두 점을 지나는 직선은 오직 하나뿐이다.'],
        answer: 0,
        why: ['', '맞꼭지각은 두 직선이 만날 때 생기는 각이에요. 평행인지 알려 주지는 않아요.', '직선을 그을 수 있다는 사실일 뿐, 평행하게 만드는 방법은 아니에요.'],
        explain: '점 P를 지나는 직선을 그어 직선 $l$과 이루는 각과 크기가 같은 각을 점 P에 작도하면 동위각(또는 엇각)의 크기가 같아져요. 그래서 두 직선이 평행해요.',
      },
    },
    {
      title: '삼각형의 세 변의 길이 사이의 관계',
      body: '세 선분 AB, BC, CA로 이루어진 도형을 **삼각형 ABC**라 하고 $\\triangle ABC$로 나타내요. $\\angle A$와 마주 보는 변 BC를 $\\angle A$의 **대변**, $\\angle A$를 변 BC의 **대각**이라고 해요. 보통 $\\angle A$, $\\angle B$, $\\angle C$의 대변의 길이를 각각 $a$, $b$, $c$로 나타내요.\n\n' +
        '세 선분의 길이가 주어진다고 언제나 삼각형이 되지는 않아요. 삼각형이 되려면\n\n' +
        '**(가장 긴 변의 길이) $<$ (나머지 두 변의 길이의 합)**\n\n' +
        '이어야 해요. 두 점 사이를 잇는 가장 짧은 길은 선분이므로, 꼭짓점을 돌아가는 두 변의 합은 곧장 가는 한 변보다 길어야 하기 때문이에요.\n\n' +
        '예: 3 cm, 4 cm, 5 cm → $5<3+4$이므로 삼각형이 돼요. 3 cm, 4 cm, 7 cm → $7=3+4$이므로 삼각형이 되지 않아요(일직선으로 납작해져요).',
      easy: '막대 세 개로 삼각형을 만든다고 생각해 보세요. 긴 막대 하나의 양 끝에 짧은 막대 두 개를 세워 꼭대기에서 만나게 해야 해요.\n\n' +
        '짧은 두 막대를 이어 붙인 길이가 긴 막대보다 짧거나 같으면 꼭대기에서 만날 수 없어요. 그래서 "짧은 두 개의 합이 가장 긴 것보다 **길어야**" 삼각형이 돼요.',
      fig: M108.one(['A', 'B', 'C'], { sides: ['c', 'a', 'b'] }, '삼각형 ABC와 세 변의 길이 a, b, c'),
      check: {
        type: 'ox',
        q: '길이가 3 cm, 4 cm, 7 cm인 세 선분으로 삼각형을 만들 수 있어요.',
        answer: false,
        explain: '가장 긴 변 7 cm가 나머지 두 변의 합 $3+4=7$ (cm)보다 작아야 하는데 같아요. 그래서 삼각형을 만들 수 없어요.',
      },
    },
    {
      title: '삼각형의 작도와 하나로 정해지는 조건',
      body: '다음 세 경우에는 삼각형을 작도할 수 있고, 그 모양과 크기가 **하나로 정해져요.**\n\n' +
        '1. **세 변의 길이**가 주어질 때 (단, 가장 긴 변 $<$ 나머지 두 변의 합)\n' +
        '2. **두 변의 길이와 그 끼인각의 크기**가 주어질 때\n' +
        '3. **한 변의 길이와 그 양 끝 각의 크기**가 주어질 때 (단, 두 각의 합 $<180°$)\n\n' +
        '다음 경우에는 하나로 정해지지 **않아요.**\n\n' +
        '- 가장 긴 변의 길이가 나머지 두 변의 길이의 합보다 크거나 같을 때: 삼각형이 생기지 않아요.\n' +
        '- 두 변의 길이와 **끼인각이 아닌** 각이 주어질 때: 생기지 않거나 두 개가 생길 수 있어요.\n' +
        '- 세 각의 크기만 주어질 때: 모양은 같고 크기가 다른 삼각형이 무수히 많아요.\n\n' +
        '> 💡 한 변의 길이와 두 각이 주어지면, 나머지 한 각은 $180°$에서 빼서 구할 수 있어요. 그래서 그 변의 양 끝 각을 알게 되어 하나로 정해져요.',
      easy: '삼각형을 "친구에게 전화로 설명해서 똑같이 그리게 하기"라고 생각해 보세요. "세 변이 4, 5, 6 cm야", "두 변이 4, 5 cm이고 그 사이 각이 60°야", "한 변이 5 cm이고 양 끝 각이 40°, 70°야" — 이렇게 말하면 친구도 똑같은 삼각형을 그릴 수 있어요.\n\n' +
        '그런데 "세 각이 50°, 60°, 70°야"라고만 하면 친구는 크게도, 작게도 그릴 수 있어서 똑같이 그린다는 보장이 없어요.',
      check: {
        type: 'choice',
        q: '다음 중 $\\triangle ABC$가 하나로 정해지는 것은 무엇일까요?',
        choices: ['$\\overline{AB}=5$ cm, $\\overline{BC}=6$ cm, $\\angle B=50°$', '$\\overline{AB}=5$ cm, $\\overline{BC}=6$ cm, $\\angle A=50°$', '$\\angle A=50°$, $\\angle B=60°$, $\\angle C=70°$'],
        answer: 0,
        why: ['', '$\\angle A$는 변 AB와 BC의 끼인각이 아니에요. 끼인각은 두 변이 만나는 꼭짓점의 각, 곧 $\\angle B$예요.', '세 각의 크기만 같으면 크기가 다른 삼각형이 무수히 많아요.'],
        explain: '$\\angle B$는 두 변 AB, BC의 끼인각이에요. 두 변의 길이와 그 끼인각의 크기가 주어지면 삼각형이 하나로 정해져요.',
      },
    },
    {
      title: '도형의 합동',
      body: '한 도형을 모양과 크기를 바꾸지 않고 옮겨서 다른 도형에 **완전히 포갤 수 있을 때**, 두 도형을 서로 **합동**이라고 해요. $\\triangle ABC$와 $\\triangle DEF$가 합동이면 기호 $\\equiv$를 써서 $\\triangle ABC\\equiv\\triangle DEF$로 나타내요.\n\n' +
        '포개어지는 꼭짓점, 변, 각을 각각 **대응점**, **대응변**, **대응각**이라고 해요. 합동인 두 도형에서는\n\n' +
        '- 대응변의 길이가 서로 같아요.\n' +
        '- 대응각의 크기가 서로 같아요.\n\n' +
        '> ⚠️ 합동 기호를 쓸 때는 **대응점의 순서를 맞춰** 써요. $\\triangle ABC\\equiv\\triangle DEF$이면 A와 D, B와 E, C와 F가 대응점이에요. 그래서 $\\overline{BC}$의 대응변은 $\\overline{EF}$예요.\n\n' +
        '> 💡 넓이가 같다고 합동인 것은 아니에요. 넓이가 같아도 모양이 다를 수 있어요.',
      easy: '같은 틀로 찍어 낸 쿠키 두 개를 생각해 보세요. 하나를 돌리거나 뒤집어서 다른 하나 위에 올리면 꼭 맞게 포개지지요. 이런 두 도형이 **합동**이에요.\n\n' +
        '포갰을 때 겹치는 짝(꼭짓점끼리, 변끼리, 각끼리)을 "대응"한다고 해요. 겹치니까 길이도 크기도 같아요.',
      fig: M108.pair(['A', 'B', 'C'], ['D', 'E', 'F'], { sides: [null, '7 cm', null], angles: ['70°', null, null] }, { arcs: [0, 0, 0] }, '합동인 두 삼각형 ABC와 DEF. BC = 7 cm, ∠A = 70°'),
      check: {
        type: 'short', check: 'number', unit: 'cm',
        q: '$\\triangle ABC\\equiv\\triangle DEF$이고 $\\overline{BC}=7$ cm일 때, $\\overline{EF}$의 길이는 몇 cm일까요?',
        answer: '7',
        explain: '$\\triangle ABC\\equiv\\triangle DEF$에서 B와 E, C와 F가 대응점이므로 $\\overline{BC}$의 대응변은 $\\overline{EF}$예요. 합동인 도형에서 대응변의 길이는 같으니 7 cm예요.',
      },
    },
    {
      title: '삼각형의 합동 조건',
      body: '두 삼각형은 다음 중 하나를 만족하면 합동이에요. (S는 변 Side, A는 각 Angle의 첫 글자예요.)\n\n' +
        '| 조건 | 뜻 | 예 ($\\triangle ABC$와 $\\triangle DEF$) |\n' +
        '|---|---|---|\n' +
        '| **SSS 합동** | 세 쌍의 대응변의 길이가 각각 같다 | $\\overline{AB}=\\overline{DE}$, $\\overline{BC}=\\overline{EF}$, $\\overline{CA}=\\overline{FD}$ |\n' +
        '| **SAS 합동** | 두 쌍의 대응변의 길이가 각각 같고, 그 끼인각의 크기가 같다 | $\\overline{AB}=\\overline{DE}$, $\\overline{BC}=\\overline{EF}$, $\\angle B=\\angle E$ |\n' +
        '| **ASA 합동** | 한 쌍의 대응변의 길이가 같고, 그 양 끝 각의 크기가 각각 같다 | $\\overline{BC}=\\overline{EF}$, $\\angle B=\\angle E$, $\\angle C=\\angle F$ |\n\n' +
        '이 세 가지는 앞에서 배운 "삼각형이 하나로 정해지는 조건"과 같아요. 조건이 같으면 똑같은 삼각형이 하나만 그려지니 두 삼각형은 포개어져요.\n\n' +
        '> ⚠️ 두 쌍의 변과 **끼인각이 아닌** 각이 같거나, 세 쌍의 각만 같을 때는 합동이라고 할 수 없어요.',
      easy: '합동 조건은 "이것만 같으면 나머지도 저절로 같아진다"는 최소한의 확인 목록이에요.\n\n' +
        '- 변 셋 → SSS\n- 변 둘 + 그 사이 각 → SAS (각이 두 변 사이에 끼어 있어요: S-A-S)\n- 각 둘 + 그 사이 변 → ASA (변이 두 각 사이에 끼어 있어요: A-S-A)\n\n' +
        '글자 순서가 그림 속 순서와 같다고 기억하면 쉬워요.',
      fig: M108.pair(['A', 'B', 'C'], ['D', 'E', 'F'], { ticks: [1, 2, 0], arcs: [0, 1, 0] }, { ticks: [1, 2, 0], arcs: [0, 1, 0] }, '변 AB와 DE, 변 BC와 EF의 길이가 같고 각 B와 각 E의 크기가 같은 두 삼각형 (SAS 합동)'),
      check: {
        type: 'choice',
        q: '$\\triangle ABC$와 $\\triangle DEF$에서 $\\overline{AB}=\\overline{DE}$, $\\overline{BC}=\\overline{EF}$, $\\angle B=\\angle E$일 때, 두 삼각형은 어떤 조건으로 합동일까요?',
        choices: ['SAS 합동', 'SSS 합동', 'ASA 합동'],
        answer: 0,
        why: ['', 'SSS 합동은 세 쌍의 변이 모두 같을 때예요. 여기서는 변이 두 쌍뿐이에요.', 'ASA 합동은 각이 두 쌍 필요해요. 여기서는 각이 한 쌍뿐이에요.'],
        explain: '두 쌍의 대응변 AB와 DE, BC와 EF의 길이가 같고, 그 끼인각 $\\angle B$와 $\\angle E$의 크기가 같으므로 SAS 합동이에요.',
      },
    },
  ],

  examples: [
    {
      q: '두 변의 길이가 4 cm, 9 cm인 삼각형에서 나머지 한 변의 길이를 $x$ cm라고 할 때, $x$의 값의 범위를 구해 보세요.',
      steps: [
        '가장 긴 변이 어느 것인지 모르니 두 경우로 나눠요.',
        '9 cm가 가장 긴 변이면 $9<4+x$이어야 하므로 $x>5$예요.',
        '$x$ cm가 가장 긴 변이면 $x<4+9$이어야 하므로 $x<13$이에요.',
        '두 조건을 모두 만족해야 하므로 $5<x<13$이에요. (두 변의 차보다 크고, 두 변의 합보다 작아요.)',
      ],
      answer: '$5<x<13$',
    },
    {
      q: '그림에서 두 선분 AB와 CD가 점 M에서 만나고 $\\overline{AM}=\\overline{BM}$, $\\overline{CM}=\\overline{DM}$이에요. $\\triangle AMC$와 $\\triangle BMD$가 합동인지 알아보세요.',
      fig: M108.bowtie(),
      steps: [
        '$\\overline{AM}=\\overline{BM}$이에요. (주어진 조건)',
        '$\\overline{CM}=\\overline{DM}$이에요. (주어진 조건)',
        '$\\angle AMC=\\angle BMD$예요. (맞꼭지각)',
        '두 쌍의 대응변의 길이가 같고 그 끼인각의 크기가 같으므로 $\\triangle AMC\\equiv\\triangle BMD$ (SAS 합동)이에요.',
      ],
      answer: '$\\triangle AMC\\equiv\\triangle BMD$ (SAS 합동)',
    },
  ],

  terms: [
    { term: '작도', def: '눈금 없는 자와 컴퍼스만을 써서 도형을 그리는 것이에요.' },
    { term: '대변', def: '삼각형에서 한 각과 마주 보는 변이에요. $\\triangle ABC$에서 $\\angle A$의 대변은 $\\overline{BC}$예요.' },
    { term: '대각', def: '삼각형에서 한 변과 마주 보는 각이에요. $\\triangle ABC$에서 $\\overline{BC}$의 대각은 $\\angle A$예요.' },
    { term: '끼인각', def: '두 변 사이에 끼어 있는 각, 곧 두 변이 만나는 꼭짓점의 각이에요. 변 AB와 BC의 끼인각은 $\\angle B$예요.' },
    { term: '합동', def: '모양과 크기가 같아서 완전히 포갤 수 있는 두 도형의 관계예요. 기호 $\\equiv$로 나타내요.' },
    { term: '대응변', def: '합동인 두 도형을 포갰을 때 서로 겹치는 변이에요. 길이가 같아요.' },
    { term: '대응각', def: '합동인 두 도형을 포갰을 때 서로 겹치는 각이에요. 크기가 같아요.' },
    { term: 'SAS 합동', def: '두 쌍의 대응변의 길이가 각각 같고 그 끼인각의 크기가 같은 두 삼각형은 합동이라는 조건이에요. SSS 합동, ASA 합동과 함께 삼각형의 합동 조건이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '작도에서 컴퍼스를 쓰는 경우로 알맞은 것은 무엇일까요?',
      choices: ['선분의 길이를 재어 다른 곳으로 옮긴다.', '두 점을 이어 선분을 긋는다.', '각도기 대신 각의 크기를 잰다.', '선분의 길이를 cm 단위로 잰다.'],
      answer: 0,
      why: ['', '두 점을 잇는 것은 눈금 없는 자의 쓰임이에요.', '작도에서는 각의 크기를 숫자로 재지 않아요.', '작도에서는 길이를 숫자로 재지 않아요. 컴퍼스로 길이를 그대로 옮겨요.'],
      explain: '컴퍼스는 원을 그리거나 선분의 길이를 재어 옮길 때 써요. 작도에서는 눈금으로 길이나 각도를 숫자로 재지 않아요.',
    },
    {
      id: 'p2', level: 1, type: 'order', concept: 1,
      q: '$\\angle XOY$와 크기가 같은 각을 반직선 PQ를 한 변으로 하여 작도하려고 해요. 순서대로 놓으세요.',
      choices: [
        '점 O를 중심으로 원을 그려 반직선 OX, OY와 만나는 점을 A, B라 한다.',
        '점 P를 중심으로 반지름이 OA인 원을 그려 반직선 PQ와 만나는 점을 C라 한다.',
        '점 C를 중심으로 반지름이 AB인 원을 그려 앞의 원과 만나는 점을 D라 한다.',
        '반직선 PD를 긋는다.',
      ],
      answer: [0, 1, 2, 3],
      explain: '먼저 점 O에서 같은 거리에 있는 두 점 A, B를 정하고, 같은 반지름으로 점 P에서 점 C를 정해요. 그다음 A, B 사이의 거리를 C에서 옮겨 점 D를 찾고, 마지막에 반직선 PD를 그어요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 0,
      q: '작도에서 눈금 없는 자로 선분을 연장할 수 있어요.',
      answer: true,
      explain: '눈금 없는 자는 두 점을 이어 선분을 긋거나 선분을 연장하는 데 써요. 길이를 재는 데만 쓰지 않아요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '세 선분의 길이가 다음과 같을 때, 삼각형을 만들 수 있는 것은 무엇일까요?',
      choices: ['4 cm, 5 cm, 8 cm', '2 cm, 3 cm, 5 cm', '3 cm, 4 cm, 8 cm', '5 cm, 5 cm, 11 cm'],
      answer: 0,
      why: ['', '$5=2+3$이에요. 가장 긴 변이 나머지 두 변의 합과 같으면 삼각형이 되지 않아요.', '$8>3+4$이므로 삼각형이 되지 않아요.', '$11>5+5$이므로 삼각형이 되지 않아요.'],
      explain: '가장 긴 변이 나머지 두 변의 합보다 작아야 해요. $8<4+5=9$이므로 4 cm, 5 cm, 8 cm는 삼각형이 돼요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '$\\triangle ABC$에서 $\\angle A$의 대변은 무엇일까요?',
      fig: M108.one(['A', 'B', 'C'], {}, '삼각형 ABC'),
      choices: ['$\\overline{BC}$', '$\\overline{AB}$', '$\\overline{CA}$'],
      answer: 0,
      why: ['', '$\\overline{AB}$는 꼭짓점 A에서 시작하는 변이에요. 대변은 마주 보는 변이에요.', '$\\overline{CA}$는 꼭짓점 A에서 시작하는 변이에요. 대변은 마주 보는 변이에요.'],
      explain: '$\\angle A$와 마주 보는 변, 곧 꼭짓점 A를 지나지 않는 변이 대변이에요. 그래서 $\\overline{BC}$예요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '다음 중 $\\triangle ABC$가 하나로 정해지지 **않는** 것은 무엇일까요?',
      choices: [
        '$\\angle A=30°$, $\\angle B=60°$, $\\angle C=90°$',
        '$\\overline{AB}=4$ cm, $\\overline{BC}=5$ cm, $\\overline{CA}=6$ cm',
        '$\\overline{AB}=5$ cm, $\\angle A=40°$, $\\angle B=70°$',
        '$\\overline{AB}=6$ cm, $\\overline{BC}=4$ cm, $\\angle B=80°$',
      ],
      answer: 0,
      why: [
        '',
        '세 변의 길이가 주어지고 $6<4+5$이므로 하나로 정해져요.',
        '한 변 AB와 그 양 끝 각 $\\angle A$, $\\angle B$가 주어졌으므로 하나로 정해져요.',
        '두 변 AB, BC와 그 끼인각 $\\angle B$가 주어졌으므로 하나로 정해져요.',
      ],
      explain: '세 각의 크기만 주어지면 모양은 같지만 크기가 다른 삼각형을 무수히 많이 그릴 수 있어요. 그래서 하나로 정해지지 않아요.',
    },
    {
      id: 'p7', level: 2, type: 'choice', concept: 3,
      q: '$\\overline{AB}=7$ cm, $\\overline{BC}=5$ cm일 때, $\\triangle ABC$가 하나로 정해지려면 어떤 조건이 더 필요할까요?',
      choices: ['$\\angle B=60°$', '$\\angle A=60°$', '$\\angle C=60°$', '$\\overline{CA}=13$ cm'],
      answer: 0,
      why: [
        '',
        '$\\angle A$는 두 변 AB, BC의 끼인각이 아니에요. 이때는 삼각형이 생기지 않거나 두 개가 생길 수 있어요.',
        '$\\angle C$는 두 변 AB, BC의 끼인각이 아니에요.',
        '$13>7+5=12$이므로 삼각형이 생기지 않아요.',
      ],
      hint: '두 변이 주어졌으니 그 두 변이 만나는 꼭짓점을 찾아보세요.',
      explain: '두 변 AB와 BC는 꼭짓점 B에서 만나요. 그 끼인각 $\\angle B$의 크기가 주어지면 삼각형이 하나로 정해져요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: '°', concept: 4,
      q: '그림에서 $\\triangle ABC\\equiv\\triangle DEF$예요. $\\angle D$의 크기를 구해 보세요.',
      fig: M108.pair(['A', 'B', 'C'], ['D', 'E', 'F'], { angles: [null, '65°', '45°'] }, {}, '합동인 두 삼각형 ABC와 DEF. 각 B = 65°, 각 C = 45°'),
      answer: '70',
      hint: '$\\angle D$의 대응각은 $\\angle A$예요.',
      wrong: [{ a: '65', why: '$\\angle B$의 크기를 그대로 썼어요. $\\angle D$의 대응각은 $\\angle A$예요.' }, { a: '45', why: '$\\angle C$의 크기를 그대로 썼어요. $\\angle D$의 대응각은 $\\angle A$예요.' }],
      explain: '$\\angle D$의 대응각은 $\\angle A$예요. $\\angle A=180°-(65°+45°)=70°$이므로 $\\angle D=70°$예요.',
    },
    {
      id: 'p9', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 4,
      q: '$\\triangle ABC\\equiv\\triangle PQR$이고 $\\overline{AB}=6$ cm, $\\overline{BC}=9$ cm, $\\overline{CA}=8$ cm예요. $\\overline{QR}$의 길이는 몇 cm일까요?',
      answer: '9',
      wrong: [{ a: '6', why: '$\\overline{AB}$의 길이를 썼어요. Q는 B, R은 C와 대응하므로 $\\overline{QR}$의 대응변은 $\\overline{BC}$예요.' }, { a: '8', why: '$\\overline{CA}$의 길이를 썼어요. $\\overline{QR}$의 대응변은 $\\overline{BC}$예요.' }],
      explain: '$\\triangle ABC\\equiv\\triangle PQR$에서 A와 P, B와 Q, C와 R이 대응점이에요. $\\overline{QR}$의 대응변은 $\\overline{BC}$이므로 9 cm예요.',
    },
    {
      id: 'p10', level: 1, type: 'choice', fixed: true, concept: 5,
      q: '그림에서 같은 표시를 한 변의 길이와 각의 크기가 서로 같아요. 두 삼각형은 어떤 조건으로 합동일까요?',
      fig: M108.pair(['A', 'B', 'C'], ['D', 'E', 'F'], { ticks: [0, 1, 0], arcs: [0, 1, 2] }, { ticks: [0, 1, 0], arcs: [0, 1, 2] }, '변 BC와 EF의 길이가 같고, 각 B와 각 E, 각 C와 각 F의 크기가 각각 같은 두 삼각형'),
      choices: ['SSS 합동', 'SAS 합동', 'ASA 합동', '합동이라고 할 수 없다'],
      answer: 2,
      why: [
        '같은 변이 한 쌍뿐이에요. SSS 합동은 세 쌍의 변이 같아야 해요.',
        '같은 변이 한 쌍뿐이에요. SAS 합동은 두 쌍의 변과 그 끼인각이 같아야 해요.',
        '',
        '한 변과 그 양 끝 각이 같으니 합동 조건을 만족해요.',
      ],
      explain: '$\\overline{BC}=\\overline{EF}$이고, 그 양 끝 각 $\\angle B=\\angle E$, $\\angle C=\\angle F$이므로 ASA 합동이에요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', fixed: true, concept: 5,
      q: '그림에서 두 선분 AB, CD가 점 M에서 만나고 $\\overline{AM}=\\overline{BM}$, $\\angle MAC=\\angle MBD$예요. $\\triangle AMC$와 $\\triangle BMD$는 어떤 조건으로 합동일까요?',
      fig: M108.bowtie(),
      choices: ['SSS 합동', 'SAS 합동', 'ASA 합동', '합동이라고 할 수 없다'],
      answer: 2,
      why: [
        '같은 변은 $\\overline{AM}=\\overline{BM}$ 한 쌍뿐이에요.',
        '같은 변이 한 쌍뿐이에요. 대신 같은 각이 두 쌍 있어요.',
        '',
        '$\\angle AMC$와 $\\angle BMD$는 맞꼭지각이라 크기가 같아요. 이것까지 찾으면 합동 조건을 만족해요.',
      ],
      hint: '점 M에서 생기는 두 각은 어떤 관계일까요?',
      explain: '$\\overline{AM}=\\overline{BM}$, $\\angle MAC=\\angle MBD$이고, $\\angle AMC=\\angle BMD$(맞꼭지각)예요. 변 AM과 BM의 양 끝 각이 각각 같으므로 ASA 합동이에요.',
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 5,
      q: '세 쌍의 대응각의 크기가 각각 같은 두 삼각형은 항상 합동이에요.',
      answer: false,
      explain: '세 각의 크기가 같아도 크기가 다를 수 있어요. 예를 들어 세 변이 3 cm, 4 cm, 5 cm인 삼각형과 6 cm, 8 cm, 10 cm인 삼각형은 세 각의 크기가 같지만 합동이 아니에요. 합동 조건에는 변의 길이가 꼭 들어가요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '길이가 2 cm, 3 cm, 4 cm, 5 cm인 막대가 하나씩 있어요. 이 가운데 3개를 골라 만들 수 있는 삼각형은 모두 몇 개일까요?',
      answer: '3',
      hint: '3개를 고르는 방법을 모두 써 보고, 가장 긴 변이 나머지 두 변의 합보다 작은지 하나씩 확인해요.',
      wrong: [{ a: '4', why: '(2, 3, 5)도 셌어요. $5=2+3$이라 삼각형이 되지 않아요.' }],
      explain: '고르는 방법은 (2, 3, 4), (2, 3, 5), (2, 4, 5), (3, 4, 5)의 4가지예요. (2, 3, 5)는 $5=2+3$이라 안 되고, 나머지는 $4<5$, $5<6$, $5<7$이라 돼요. 그래서 3개예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 5,
      q: '사각형 ABCD에서 $\\overline{AB}=\\overline{CD}$, $\\overline{AD}=\\overline{CB}$예요. 대각선 AC를 그었을 때 $\\triangle ABC$와 $\\triangle CDA$는 어떤 조건으로 합동일까요?',
      fig: { type: 'polygon', points: [[0, 0], [6, 0], [8, 4], [2, 4]], labels: ['A', 'B', 'C', 'D'], segments: [{ from: [0, 0], to: [8, 4] }], alt: '사각형 ABCD와 대각선 AC' },
      choices: ['SSS 합동', 'SAS 합동', 'ASA 합동', '합동이라고 할 수 없다'],
      answer: 0,
      why: [
        '',
        '각에 대한 조건은 주어지지 않았어요. 대신 변이 세 쌍 같아요.',
        '각에 대한 조건은 주어지지 않았어요.',
        '$\\overline{AC}$는 두 삼각형이 함께 쓰는 변이라 길이가 같아요. 이것까지 세면 변이 세 쌍이에요.',
      ],
      hint: '두 삼각형이 함께 가진 변이 있어요.',
      explain: '$\\overline{AB}=\\overline{CD}$, $\\overline{BC}=\\overline{DA}$이고, $\\overline{AC}$는 공통인 변이에요. 세 쌍의 대응변의 길이가 같으므로 $\\triangle ABC\\equiv\\triangle CDA$ (SSS 합동)이에요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', fixed: true, concept: 1,
      q: '크기가 같은 각의 작도에서 $\\angle XOY$의 두 변 위에 점 A, B를, 새 각에 점 C, D를 잡았어요($\\overline{OA}=\\overline{OB}=\\overline{PC}=\\overline{PD}$, $\\overline{AB}=\\overline{CD}$). $\\angle XOY=\\angle DPC$인 까닭은 두 삼각형 OAB와 PCD가 어떤 조건으로 합동이기 때문일까요?',
      fig: M108.copyAngle(),
      choices: ['SSS 합동', 'SAS 합동', 'ASA 합동', '합동이라고 할 수 없다'],
      answer: 0,
      why: [
        '',
        'SAS 합동을 쓰려면 끼인각이 같다는 것을 알아야 해요. 그런데 각이 같은지는 우리가 보이려는 결론이에요.',
        '각에 대한 조건은 작도로 만든 것이 아니에요. 작도에서 같게 만든 것은 세 변의 길이예요.',
        '세 변의 길이가 각각 같으니 합동 조건을 만족해요.',
      ],
      explain: '작도에서 $\\overline{OA}=\\overline{PC}$, $\\overline{OB}=\\overline{PD}$, $\\overline{AB}=\\overline{CD}$가 되도록 했어요. 세 쌍의 변이 같으므로 $\\triangle OAB\\equiv\\triangle PCD$ (SSS 합동)이고, 대응각인 $\\angle AOB$와 $\\angle CPD$의 크기가 같아요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '$\\overline{AB}=5$ cm, $\\angle A=40°$, $\\angle B=x°$일 때 $\\triangle ABC$가 하나로 정해져요. 다음 중 $x$의 값이 될 수 **없는** 것은 무엇일까요?',
      choices: ['140', '30', '100', '139'],
      answer: 0,
      why: ['', '$40+30<180$이므로 삼각형이 하나로 정해져요.', '$40+100<180$이므로 삼각형이 하나로 정해져요.', '$40+139=179<180$이므로 삼각형이 하나로 정해져요.'],
      hint: '한 변의 양 끝 각의 합은 $180°$보다 작아야 해요.',
      explain: '두 각의 합이 $180°$보다 작아야 나머지 두 변이 만나 삼각형이 돼요. $x=140$이면 $40+140=180$이 되어 두 변이 평행해져 만나지 않아요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 5,
      q: '선분 AB의 중점을 M이라 하고, 점 M을 지나고 선분 AB에 수직인 직선 위에 점 P를 잡았어요. $\\overline{PA}=7$ cm일 때 $\\overline{PB}$의 길이는 몇 cm일까요?',
      answer: '7',
      hint: '$\\triangle PAM$과 $\\triangle PBM$이 합동인지 살펴보세요.',
      wrong: [{ a: '3.5', why: '$\\overline{PB}$는 $\\overline{PA}$의 절반이 아니에요. 두 삼각형이 합동이라 대응변의 길이가 같아요.' }],
      explain: '$\\overline{AM}=\\overline{BM}$(중점), $\\angle PMA=\\angle PMB=90°$, $\\overline{PM}$은 공통이므로 $\\triangle PAM\\equiv\\triangle PBM$ (SAS 합동)이에요. 대응변이므로 $\\overline{PB}=\\overline{PA}=7$ cm예요. 수직이등분선 위의 점은 선분의 양 끝에서 같은 거리에 있어요.',
    },
  ],

  deeper: [
    {
      title: '작도로 할 수 없는 세 가지 문제',
      body: '고대 그리스 사람들은 눈금 없는 자와 컴퍼스만으로 다음 세 가지를 작도하려고 오랫동안 애썼어요.\n\n' +
        '1. 주어진 각을 삼등분하기\n2. 주어진 정육면체의 부피의 2배인 정육면체 만들기\n3. 주어진 원과 넓이가 같은 정사각형 만들기\n\n' +
        '2000년이 넘도록 아무도 성공하지 못했고, 19세기에 이르러서야 수학자들이 "이 세 가지는 자와 컴퍼스만으로는 **불가능하다**"는 것을 증명했어요. 할 수 없다는 것을 증명하는 것도 수학의 중요한 일이에요.',
    },
    {
      title: '다음 학년에서는',
      body: '중학교 2학년에서는 합동 조건을 써서 이등변삼각형의 두 밑각의 크기가 같다는 것처럼 도형의 성질을 **증명**해요. 직각삼각형에만 쓰는 합동 조건(RHA, RHS 합동)도 배워요.\n\n' +
        '또 모양은 같고 크기만 다른 도형의 관계인 **닮음**도 배워요. 세 각이 같은 두 삼각형은 합동은 아니어도 닮음이에요.',
    },
  ],

  faq: [
    {
      q: '작도할 때 왜 눈금 있는 자를 쓰면 안 돼요?',
      a: '작도는 눈금으로 재는 대신 "같은 길이를 그대로 옮기는" 방법으로 도형을 그리는 약속이에요. 눈금은 아무리 정확해도 어림이 섞이지만, 컴퍼스로 옮긴 길이는 원리상 정확히 같아요. 그래서 도형의 성질을 따지는 데 작도를 써요.',
    },
    {
      q: '두 변과 한 각이 같은데 왜 합동이 아닐 수 있어요?',
      a: '그 각이 두 변 사이에 끼인 각이어야 SAS 합동이에요. 끼인각이 아닌 각이 같으면, 한 변이 다른 변의 끝에서 두 방향으로 놓일 수 있어서 모양이 다른 삼각형이 두 개 생길 수 있어요.',
    },
    {
      q: '합동 기호를 쓸 때 꼭짓점 순서가 중요해요?',
      a: '네. $\\triangle ABC\\equiv\\triangle DEF$는 A와 D, B와 E, C와 F가 대응한다는 뜻이에요. 순서를 바꾸어 쓰면 대응이 달라지니, 포갰을 때 겹치는 꼭짓점끼리 같은 자리에 쓰세요.',
    },
  ],

  mistakes: [
    '가장 긴 변이 나머지 두 변의 합과 같아도 삼각형이 된다고 하는 실수 — 같으면 납작해져 삼각형이 되지 않아요(반드시 작아야 해요).',
    '두 변과 끼인각이 아닌 각이 같을 때 SAS 합동이라고 하는 실수 — 각이 두 변 사이에 있어야 해요.',
    '합동 기호의 순서를 보지 않고 그림의 위치만으로 대응변을 찾는 실수 — $\\triangle ABC\\equiv\\triangle DEF$면 $\\overline{BC}$의 대응변은 $\\overline{EF}$예요.',
  ],

  gens: [
    {
      id: 'triangle-inequality',
      level: 1,
      title: '세 변의 길이로 삼각형을 만들 수 있는지 판단하기',
      make: function (R) {
        var a = R.int(2, 12), b = R.int(2, 12), kind = R.int(0, 2), c;
        if (kind === 0) c = R.int(Math.abs(a - b) + 1, a + b - 1);   // 삼각형이 된다
        else if (kind === 1) c = a + b;                              // 합과 같다
        else c = a + b + R.int(1, 5);                               // 합보다 크다
        var L = R.shuffle([a, b, c]);
        var s = L.slice().sort(function (x, y) { return x - y; });
        var ok = s[2] < s[0] + s[1];
        var sum = s[0] + s[1];
        var cmp = s[2] < sum ? '<' : s[2] === sum ? '=' : '>';
        return {
          type: 'ox', concept: 2,
          q: '길이가 ' + L[0] + ' cm, ' + L[1] + ' cm, ' + L[2] + ' cm인 세 선분으로 삼각형을 만들 수 있어요.',
          answer: ok,
          explain: '가장 긴 변 ' + s[2] + ' cm와 나머지 두 변의 합 $' + s[0] + '+' + s[1] + '=' + sum + '$ (cm)를 비교하면 $' + s[2] + cmp + sum + '$' + R.josa(sum, '이에요/예요') + '. ' +
            (ok ? '가장 긴 변이 더 짧으므로 삼각형을 만들 수 있어요.' : cmp === '=' ? '가장 긴 변이 나머지 두 변의 합과 같으면 납작해져서 삼각형이 되지 않아요.' : '가장 긴 변이 나머지 두 변의 합보다 길어서 삼각형이 되지 않아요.'),
        };
      },
    },
    {
      id: 'third-side',
      level: 2,
      title: '나머지 한 변의 길이가 될 수 있는 자연수',
      make: function (R) {
        var a = R.int(3, 15), b = R.int(3, 15);
        while (b === a) b = R.int(3, 15);
        var lo = Math.abs(a - b), hi = a + b;
        if (R.bool()) {
          var cnt = hi - lo - 1;
          return {
            type: 'short', check: 'number', unit: '개', concept: 2,
            q: '삼각형의 두 변의 길이가 ' + a + ' cm, ' + b + ' cm예요. 나머지 한 변의 길이가 될 수 있는 자연수(cm)는 모두 몇 개일까요?',
            answer: String(cnt),
            hint: '나머지 한 변은 두 변의 길이의 차보다 크고, 합보다 작아야 해요.',
            wrong: [
              { a: String(cnt + 2), why: '$' + lo + '$' + R.josa(lo, '과/와') + ' $' + hi + '$까지 셌어요. 차나 합과 같으면 삼각형이 되지 않아요.' },
            ].concat(hi - 1 === cnt + 2 ? [] : [{ a: String(hi - 1), why: '두 변의 합보다 작은 수만 생각했어요. 나머지 한 변은 두 변의 차 ' + lo + '보다도 커야 해요.' }]),
            explain: '나머지 한 변의 길이를 $x$ cm라 하면 $' + lo + '<x<' + hi + '$이어야 해요. 이 범위의 자연수는 ' + (lo + 1) + '부터 ' + (hi - 1) + '까지 ' + cnt + '개예요.',
          };
        }
        return {
          type: 'short', check: 'number', unit: 'cm', concept: 2,
          q: '삼각형의 두 변의 길이가 ' + a + ' cm, ' + b + ' cm예요. 나머지 한 변의 길이가 자연수일 때, 가장 긴 경우는 몇 cm일까요?',
          answer: String(hi - 1),
          hint: '나머지 한 변은 두 변의 길이의 합보다 작아야 해요.',
          wrong: [{ a: String(hi), why: '두 변의 합과 같으면 납작해져서 삼각형이 되지 않아요. 합보다 작아야 해요.' }],
          explain: '나머지 한 변의 길이는 두 변의 합 $' + a + '+' + b + '=' + hi + '$보다 작아야 하므로 가장 긴 자연수는 ' + (hi - 1) + R.josa(hi - 1, '이에요/예요') + '. (두 변의 차 ' + lo + '보다는 크니 괜찮아요.)',
        };
      },
    },
    {
      id: 'congruent-parts',
      level: 1,
      title: '합동인 삼각형의 대응변·대응각',
      make: function (R) {
        var A, B, C;
        do {
          A = R.int(7, 18) * 5; B = R.int(7, 18) * 5; C = 180 - A - B;
        } while (C < 35 || C > 100 || C === 90 || A === B || B === C || A === C);
        var n2 = R.shuffle(['D', 'E', 'F']);
        var tri2 = n2.join('');
        var stmt = '$\\triangle ABC\\equiv\\triangle ' + tri2 + '$';
        var v = R.int(0, 2);
        if (v === 0) {
          var s = R.int(5, 14), t = R.int(5, 14);
          while (t === s) t = R.int(5, 14);
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 4,
            q: '그림에서 ' + stmt + '예요. $\\overline{' + n2[1] + n2[2] + '}$의 길이는 몇 cm일까요?',
            fig: M108.pair(['A', 'B', 'C'], n2, { sides: [t + ' cm', s + ' cm', null] }, {}, '합동인 두 삼각형. AB = ' + t + ' cm, BC = ' + s + ' cm'),
            answer: String(s),
            wrong: [{ a: String(t), why: '대응변을 잘못 찾았어요. ' + stmt + '에서 ' + n2[1] + R.josa(n2[1], '은/는') + ' B, ' + n2[2] + R.josa(n2[2], '은/는') + ' C와 대응해요.' }],
            explain: stmt + '에서 B와 ' + n2[1] + ', C와 ' + n2[2] + R.josa(n2[2], '이/가') + ' 대응점이에요. 그래서 $\\overline{' + n2[1] + n2[2] + '}$의 대응변은 $\\overline{BC}$이고, 길이는 ' + s + ' cm예요.',
          };
        }
        if (v === 1) {
          return {
            type: 'short', check: 'number', unit: '°', concept: 4,
            q: '그림에서 ' + stmt + '예요. $\\angle ' + n2[1] + '$의 크기를 구해 보세요.',
            fig: M108.pair(['A', 'B', 'C'], n2, { angles: [A + '°', B + '°', null] }, {}, '합동인 두 삼각형. 각 A = ' + A + '°, 각 B = ' + B + '°'),
            answer: String(B),
            wrong: [{ a: String(A), why: '대응각을 잘못 찾았어요. ' + stmt + '에서 $\\angle ' + n2[1] + '$의 대응각은 $\\angle B$예요.' }],
            explain: stmt + '에서 두 번째 꼭짓점끼리 대응하므로 $\\angle ' + n2[1] + '$의 대응각은 $\\angle B$예요. 그래서 $' + B + '°$예요.',
          };
        }
        return {
          type: 'short', check: 'number', unit: '°', concept: 4,
          q: '그림에서 ' + stmt + '예요. $\\angle ' + n2[2] + '$의 크기를 구해 보세요.',
          fig: M108.pair(['A', 'B', 'C'], n2, { angles: [A + '°', B + '°', null] }, {}, '합동인 두 삼각형. 각 A = ' + A + '°, 각 B = ' + B + '°'),
          answer: String(C),
          hint: '$\\angle ' + n2[2] + '$의 대응각을 먼저 찾고, 삼각형의 세 각의 합이 $180°$임을 이용해요.',
          wrong: [{ a: String(A + B), why: '두 각의 합을 구했어요. 세 각의 합이 $180°$이므로 $180°$에서 빼야 해요.' }],
          explain: '$\\angle ' + n2[2] + '$의 대응각은 $\\angle C$예요. $\\angle C=180°-(' + A + '°+' + B + '°)=' + C + '°$이므로 $\\angle ' + n2[2] + '=' + C + '°$예요.',
        };
      },
    },
    {
      id: 'congruence-condition',
      level: 2,
      title: '삼각형의 합동 조건 고르기',
      make: function (R) {
        var X = ['A', 'B', 'C'], Y = ['D', 'E', 'F'];
        var rot = R.int(0, 2), i = rot, j = (rot + 1) % 3, k = (rot + 2) % 3;
        function side(p, q) { return '$\\overline{' + X[p] + X[q] + '}=\\overline{' + Y[p] + Y[q] + '}$'; }
        function ang(p) { return '$\\angle ' + X[p] + '=\\angle ' + Y[p] + '$'; }
        var T = [
          { c: [side(i, j), side(j, k), side(k, i)], ans: 0, nS: 3, nA: 0, ex: '세 쌍의 대응변의 길이가 각각 같으므로 SSS 합동이에요.' },
          { c: [side(i, j), side(j, k), ang(j)], ans: 1, nS: 2, nA: 1, ex: '두 쌍의 대응변의 길이가 같고, 그 끼인각 ' + ang(j) + '이므로 SAS 합동이에요.' },
          { c: [side(i, j), ang(i), ang(j)], ans: 2, nS: 1, nA: 2, ex: '한 쌍의 대응변의 길이가 같고, 그 양 끝 각의 크기가 각각 같으므로 ASA 합동이에요.' },
          { c: [side(i, j), ang(i), ang(k)], ans: 2, nS: 1, nA: 2, ex: '세 각의 합이 $180°$이므로 ' + ang(i) + ', ' + ang(k) + '이면 ' + ang(j) + '도 돼요. 그러면 변 ' + X[i] + X[j] + '의 양 끝 각이 같으므로 ASA 합동이에요.' },
          { c: [side(i, j), side(j, k), ang(i)], ans: 3, nS: 2, nA: 1, ssa: true, ex: '$\\angle ' + X[i] + '$는 두 변 ' + X[i] + X[j] + ', ' + X[j] + X[k] + '의 끼인각이 아니에요. 그래서 합동이라고 할 수 없어요.' },
          { c: [ang(i), ang(j), ang(k)], ans: 3, nS: 0, nA: 3, ex: '세 쌍의 각만 같으면 크기가 다른 삼각형일 수 있어서 합동이라고 할 수 없어요.' },
        ];
        var t = R.pick(T);
        var conds = R.shuffle(t.c);
        var names = ['SSS 합동', 'SAS 합동', 'ASA 합동', '합동이라고 할 수 없다'];
        var why = [0, 1, 2, 3].map(function (n) {
          if (n === t.ans) return '';
          if (n === 0) return '같은 변이 ' + t.nS + '쌍뿐이에요. SSS 합동은 세 쌍의 변이 모두 같아야 해요.';
          if (n === 1) {
            if (t.ssa) return '같은 각 $\\angle ' + X[i] + '$는 두 변의 끼인각이 아니에요. 끼인각은 $\\angle ' + X[j] + '$예요.';
            if (t.nS === 3) return '세 쌍의 변이 같으니 SSS 합동이에요. 각에 대한 조건은 없어요.';
            return 'SAS 합동은 두 쌍의 변과 그 끼인각이 같아야 해요. 같은 변이 ' + t.nS + '쌍이에요.';
          }
          if (n === 2) {
            if (t.nA === 3) return '세 각이 같아도 같은 변이 하나도 없어요. 크기가 다른 삼각형일 수 있어요.';
            return 'ASA 합동은 같은 각이 두 쌍 필요해요. 여기서는 같은 각이 ' + t.nA + '쌍이에요.';
          }
          return names[t.ans] + ' 조건에 맞아요. 다시 확인해 보세요.';
        });
        return {
          type: 'choice', fixed: true, concept: 5,
          q: '$\\triangle ABC$와 $\\triangle DEF$에서 ' + conds.join(', ') + '일 때, 두 삼각형은 어떤 조건으로 합동일까요?',
          choices: names,
          answer: t.ans,
          why: why,
          explain: t.ex,
        };
      },
    },
  ],
});
