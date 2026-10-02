/* 중2 수학 · 도형의 닮음
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 닮은 두 삼각형은 아래 도우미(tris)가 직접 그린 svg (색은 currentColor·var(--fig-n)), 겹친 삼각형은 polygon */
(function () {
  // ---------- 그림 도우미 (화면 좌표: y 아래쪽) ----------
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function unit(x, y) { var l = Math.sqrt(x * x + y * y) || 1; return [x / l, y / l]; }
  function txt(x, y, s, size) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 14) + '" text-anchor="middle" dominant-baseline="central" fill="currentColor">' + s + '</text>';
  }
  // 삼각형 여러 개: [{ p: [[x,y]×3], n: ['A','B','C'], s: [p0p1, p1p2, p2p0 글 또는 null], ang: [글|null ×3], right: 꼭짓점 번호 }]
  function tris(list, alt) {
    var out = '', xs = [], ys = [];
    function keep(x, y, w) { xs.push(x - (w || 0), x + (w || 0)); ys.push(y - 9, y + 9); }
    list.forEach(function (t) {
      var p = t.p, cx = (p[0][0] + p[1][0] + p[2][0]) / 3, cy = (p[0][1] + p[1][1] + p[2][1]) / 3;
      out += '<polygon points="' + p.map(function (q) { return r1(q[0]) + ',' + r1(q[1]); }).join(' ') + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
      p.forEach(function (q, i) {
        keep(q[0], q[1], 2);
        var nx = p[(i + 1) % 3], pv = p[(i + 2) % 3];
        if (t.n && t.n[i]) {
          var d = unit(q[0] - cx, q[1] - cy), lx = q[0] + d[0] * 15, ly = q[1] + d[1] * 15;
          out += txt(lx, ly, t.n[i]); keep(lx, ly, 6);
        }
        if (t.s && t.s[i]) {
          var mx = (q[0] + nx[0]) / 2, my = (q[1] + nx[1]) / 2, e = unit(mx - cx, my - cy), w = String(t.s[i]).length * 3.6;
          var off = 9 + w * Math.abs(e[0]) + 4 * Math.abs(e[1]);
          var sx = mx + e[0] * off, sy = my + e[1] * off;
          out += txt(sx, sy, t.s[i], 13); keep(sx, sy, w + 2);
        }
        var u = unit(nx[0] - q[0], nx[1] - q[1]), v = unit(pv[0] - q[0], pv[1] - q[1]);
        if (t.right === i) {
          out += '<path d="M' + r1(q[0] + u[0] * 10) + ' ' + r1(q[1] + u[1] * 10) + ' L' + r1(q[0] + u[0] * 10 + v[0] * 10) + ' ' + r1(q[1] + u[1] * 10 + v[1] * 10) +
            ' L' + r1(q[0] + v[0] * 10) + ' ' + r1(q[1] + v[1] * 10) + '" fill="none" stroke="currentColor" stroke-width="1.4"/>';
        } else if (t.ang && t.ang[i]) {
          var sweep = u[0] * v[1] - u[1] * v[0] > 0 ? 1 : 0, b = unit(u[0] + v[0], u[1] + v[1]);
          out += '<path d="M' + r1(q[0] + u[0] * 16) + ' ' + r1(q[1] + u[1] * 16) + ' A16 16 0 0 ' + sweep + ' ' + r1(q[0] + v[0] * 16) + ' ' + r1(q[1] + v[1] * 16) +
            '" fill="none" stroke="var(--fig-4, #ef4444)" stroke-width="1.6"/>';
          if (t.ang[i] !== '•') out += txt(q[0] + b[0] * 32, q[1] + b[1] * 32, t.ang[i], 12);
        }
      });
    });
    var x0 = Math.min.apply(null, xs) - 6, x1 = Math.max.apply(null, xs) + 6, y0 = Math.min.apply(null, ys) - 4, y1 = Math.max.apply(null, ys) + 4;
    return {
      type: 'svg', alt: alt,
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + r1(x0) + ' ' + r1(y0) + ' ' + r1(x1 - x0) + ' ' + r1(y1 - y0) + '">' + out + '</svg>',
    };
  }
  // 닮은 두 삼각형: 모양 base(작은 쪽 화면 좌표)를 k 배 키워 오른쪽에 놓는다
  var BASE = [[30, 0], [0, 70], [80, 70]];
  // k 는 (둘째):(첫째) 길이 비 — 1보다 작으면 둘째를 작게 그린다. 그림 크기는 보기 좋게 줄여 잡는다(정확한 축척 아님)
  function pair(k, n1, s1, n2, s2, alt, ang1, ang2, base) {
    var b0 = base || BASE;
    var kk = k >= 1 ? Math.max(1.15, Math.min(k, 1.9)) : Math.max(0.55, Math.min(k, 0.87));
    var bottom = Math.max.apply(null, b0.map(function (q) { return q[1]; }));
    var right = Math.max.apply(null, b0.map(function (q) { return q[0]; }));
    var sec = b0.map(function (q) { return [right + 60 + q[0] * kk, bottom - bottom * kk + q[1] * kk]; });
    return tris([{ p: b0, n: n1, s: s1, ang: ang1 }, { p: sec, n: n2, s: s2, ang: ang2 }], alt);
  }
  // 세 변이 4 : 8 : 6 (AB : BC : CA) 인 삼각형 모양
  var BASE468 = [[27.5, 40.95], [0, 70], [80, 70]];
  // 정답·서로 같은 값을 뺀 wrong 칸 (수 비교)
  function wrongs(ans, list) {
    var seen = [Number(ans)], out = [];
    list.forEach(function (w) {
      var sv = String(w[0]).split('/'), v = sv.length === 2 ? Number(sv[0]) / Number(sv[1]) : Number(w[0]);
      if (!isFinite(v) || seen.some(function (s) { return Math.abs(s - v) < 1e-9; })) return;
      seen.push(v);
      out.push({ a: String(w[0]), why: w[1] });
    });
    return out;
  }
  function frs(n, d) { // n/d 를 문자열로 (wrong 칸용)
    var a = Math.abs(n), b = Math.abs(d); while (b) { var t = a % b; a = b; b = t; }
    return (d / a === 1) ? String(n / a) : (n / a) + '/' + (d / a);
  }

  // 겹친 삼각형 (실제 길이에 맞춘 좌표): A 위, D 는 AB 위, E 는 AC 위
  // OV: AB=12, AC=8, BC=10, AD=4, AE=6 (△ADE∽△ACB, SAS)
  var OV = { A: [9, 7.937], D: [6, 5.291], B: [0, 0], C: [10, 0], E: [9.75, 1.984] };
  // OW: AB=10, AC=8, BC=9, AD=4, AE=5 (∠ADE=∠C 이므로 △ADE∽△ACB, AA)
  var OW = { A: [6.5, 7.599], D: [3.9, 4.559], B: [0, 0], C: [9, 0], E: [8.063, 2.85] };

  Tutor.registerUnit({
    id: 'math-m2-09',
    course: 'math-m2',
    title: '도형의 닮음',
    summary: '닮은 도형과 닮음비를 알아보고, 삼각형의 닮음 조건으로 닮음을 판별하여 길이를 구해요.',
    goals: [
      '닮은 도형의 뜻을 알고 닮음을 기호 ∽로 나타낼 수 있어요.',
      '닮음비를 구하고, 닮은 평면도형·입체도형의 성질을 이용해 길이와 각을 구할 수 있어요.',
      '삼각형의 닮음 조건(SSS, SAS, AA)으로 두 삼각형이 닮음인지 판별하고 변의 길이를 구할 수 있어요.',
      '닮은 도형의 넓이의 비와 부피의 비를 구하고, 닮음을 실생활 문제에 쓸 수 있어요.',
    ],
    standards: ['[9수03-12]', '[9수03-13]'],

    concepts: [
      {
        title: '닮은 도형과 닮음의 기호',
        body: '한 도형을 일정한 비율로 확대하거나 축소한 것이 다른 도형과 합동일 때, 두 도형은 서로 **닮음인 관계**에 있다고 해요. 닮음인 관계에 있는 두 도형을 **닮은 도형**이라고 해요.\n\n' +
          '삼각형 ABC와 삼각형 DEF가 닮은 도형이면 기호 **∽**를 써서 이렇게 나타내요.\n\n$\\triangle ABC ∽ \\triangle DEF$\n\n' +
          '이때 **대응하는 꼭짓점을 같은 순서로** 써요. 위 식은 A와 D, B와 E, C와 F가 서로 대응한다는 뜻이에요.\n\n' +
          '| 관계 | 기호 | 뜻 |\n|---|---|---|\n| 합동 | ≡ | 모양과 크기가 모두 같아요 |\n| 닮음 | ∽ | 모양이 같아요(크기는 달라도 돼요) |\n\n' +
          '두 원, 두 정사각형, 두 정삼각형, 두 구는 **항상** 닮은 도형이에요. 모양을 정하는 조건이 크기 하나뿐이기 때문이에요. 하지만 두 직사각형, 두 마름모, 두 이등변삼각형은 모양이 다를 수 있어서 항상 닮은 것은 아니에요.\n\n' +
          '> 💡 합동인 두 도형도 닮은 도형이에요. 확대·축소 비율이 1인 경우라고 보면 돼요.',
        easy: '휴대폰으로 사진을 찍고 두 손가락으로 벌려 확대해 보세요. 사진 속 얼굴은 커지지만 눈·코·입의 모양과 배치는 그대로예요. 이렇게 **모양은 그대로 두고 크기만 바꾼** 관계가 닮음이에요.\n\n' +
          '그런데 사진을 가로로만 길게 늘이면 얼굴이 홀쭉해지지요? 이건 모양이 바뀐 것이라 닮음이 아니에요. 가로와 세로를 **같은 비율로** 늘여야 닮음이에요.',
        fig: pair(1.5, ['A', 'B', 'C'], null, ['D', 'E', 'F'], null, '삼각형 ABC 와 그것을 확대한 모양의 삼각형 DEF'),
        check: {
          type: 'choice',
          q: '다음 중 **항상** 닮은 도형인 것은 무엇일까요?',
          choices: ['두 정사각형', '두 직사각형', '두 이등변삼각형'],
          answer: 0,
          why: [
            '',
            '가로와 세로의 비가 다르면 모양이 달라요. 예를 들어 가로 2, 세로 1인 직사각형과 가로 3, 세로 1인 직사각형은 닮지 않았어요.',
            '꼭지각이 다르면 모양이 달라요. 꼭지각이 $30°$인 이등변삼각형과 $100°$인 이등변삼각형은 닮지 않았어요.',
          ],
          explain: '정사각형은 네 변의 길이가 모두 같고 네 각이 모두 $90°$라서, 크기만 다를 뿐 모양은 항상 같아요. 그래서 두 정사각형은 항상 닮은 도형이에요.',
        },
      },
      {
        title: '닮음비와 닮은 도형의 성질',
        body: '닮은 두 도형에서 **대응변의 길이의 비**를 **닮음비**라고 해요.\n\n' +
          '닮은 두 평면도형에는 다음 성질이 있어요.\n\n' +
          '1. 대응변의 길이의 비는 모두 같아요(= 닮음비).\n2. 대응각의 크기는 각각 같아요.\n\n' +
          '예를 들어 $\\triangle ABC ∽ \\triangle DEF$이고 $\\overline{AB}=4$ cm, $\\overline{DE}=6$ cm이면 닮음비는 $4:6=2:3$이에요. 그러면 $\\overline{BC}:\\overline{EF}$도, $\\overline{CA}:\\overline{FD}$도 $2:3$이에요. 하지만 각은 커지지 않아요. $\\angle B=\\angle E$예요.\n\n' +
          '**닮은 두 입체도형**에서도 마찬가지로\n\n1. 대응하는 모서리의 길이의 비는 모두 같고(= 닮음비),\n2. 대응하는 면은 닮은 도형이에요.\n\n' +
          '원기둥·원뿔·구처럼 모서리가 없는 입체도형은 반지름이나 높이처럼 **대응하는 길이의 비**가 닮음비예요.\n\n' +
          '> ⚠️ 닮음비는 보통 가장 간단한 자연수의 비로 나타내요. $4:6$보다 $2:3$으로 써요.',
        easy: '지도와 실제 땅을 떠올려 보세요. 지도에서 1 cm가 실제로 1 km라면, 지도에서 3 cm인 길은 실제로 3 km예요. **모든 길이가 같은 비율로** 바뀌지요.\n\n' +
          '그런데 지도에서 두 길이 만나는 각도는 실제와 똑같아요. 직각으로 만나는 사거리는 지도에서도 직각이에요. 그래서 닮은 도형에서 **길이는 비율만큼 바뀌고, 각은 그대로**예요.',
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '$\\triangle ABC ∽ \\triangle DEF$이고 닮음비가 $2:3$이에요. $\\overline{BC}=8$ cm일 때, $\\overline{EF}$의 길이는 몇 cm일까요?',
          answer: '12',
          wrong: [
            { a: '16/3', why: '비를 거꾸로 썼어요. $\\overline{BC}:\\overline{EF}=2:3$이므로 $\\overline{EF}$가 더 길어요.' },
            { a: '9', why: '닮음비의 수(2와 3)의 차 1만큼 더했어요. 길이는 차가 아니라 비율로 바뀌어요.' },
          ],
          explain: '$\\overline{BC}$와 $\\overline{EF}$는 대응변이므로 $8:\\overline{EF}=2:3$이에요. $2\\times\\overline{EF}=24$에서 $\\overline{EF}=12$ cm예요.',
        },
      },
      {
        title: '삼각형의 닮음 조건',
        body: '두 삼각형은 다음 중 하나를 만족하면 닮은 도형이에요.\n\n' +
          '1. **SSS 닮음**: 세 쌍의 대응변의 길이의 비가 같아요. $a:a\'=b:b\'=c:c\'$\n' +
          '2. **SAS 닮음**: 두 쌍의 대응변의 길이의 비가 같고, 그 **끼인각**의 크기가 같아요.\n' +
          '3. **AA 닮음**: 두 쌍의 대응각의 크기가 각각 같아요.\n\n' +
          '왜 그럴까요? 한 삼각형을 닮음비만큼 확대(축소)하면, 그 결과가 다른 삼각형과 합동이 돼요. 그때 쓰는 합동 조건이 각각 SSS, SAS, ASA 합동이에요.\n\n' +
          'AA 닮음은 각만 두 개 같으면 돼요. 삼각형의 세 내각의 크기의 합은 $180°$이므로 두 각이 같으면 나머지 한 각도 저절로 같아지고, 크기는 확대·축소로 맞출 수 있기 때문이에요.\n\n' +
          '| 합동 조건 | 닮음 조건 |\n|---|---|\n| 세 변의 길이가 같다 (SSS) | 세 변의 길이의 비가 같다 (SSS) |\n| 두 변의 길이와 끼인각이 같다 (SAS) | 두 변의 길이의 비와 끼인각이 같다 (SAS) |\n| 한 변과 양 끝 각이 같다 (ASA) | 두 각이 같다 (AA) |\n\n' +
          '> ⚠️ SAS 닮음에서 크기가 같은 각은 반드시 비가 같은 두 변 **사이의 각(끼인각)**이어야 해요.',
        easy: '각은 모양을 정하고, 길이는 크기를 정해요. 삼각형의 두 각이 정해지면 세 번째 각도 정해지니까 모양이 완전히 정해져요. 크기만 정해지지 않았지요.\n\n' +
          '그래서 두 각이 같은 삼각형들은 크기만 다를 뿐 모양은 똑같아요. 마치 같은 모양 쿠키 틀을 크기별로 늘어놓은 것과 같아요. 이것이 AA 닮음이에요.',
        fig: pair(1.5, ['A', 'B', 'C'], null, ['D', 'E', 'F'], null, '두 쌍의 대응각에 같은 표시를 한 삼각형 ABC 와 삼각형 DEF', [null, '•', '•'], [null, '•', '•']),
        check: {
          type: 'choice',
          q: '$\\triangle ABC$와 $\\triangle DEF$에서 $\\angle A=\\angle D=50°$, $\\angle B=\\angle E=70°$예요. 두 삼각형은 어떤 닮음 조건으로 닮은 도형일까요?',
          choices: ['AA 닮음', 'SAS 닮음', 'SSS 닮음'],
          answer: 0,
          why: [
            '',
            'SAS 닮음은 두 쌍의 변의 길이의 비와 끼인각이 필요해요. 문제에는 변의 길이가 없어요.',
            'SSS 닮음은 세 쌍의 변의 길이의 비가 필요해요. 문제에는 각만 주어졌어요.',
          ],
          explain: '두 쌍의 대응각의 크기가 각각 같으므로 **AA 닮음**이에요. 나머지 각도 $\\angle C=\\angle F=60°$로 저절로 같아요.',
        },
      },
      {
        title: '닮음 조건으로 변의 길이 구하기',
        body: '도형 안에 삼각형이 겹쳐 있을 때는 **공통인 각**을 먼저 찾아요. 그다음 닮음 조건을 확인하고 대응변의 비로 길이를 구해요.\n\n' +
          '**예 (SAS 닮음)** 그림에서 $\\overline{AD}=4$, $\\overline{DB}=8$, $\\overline{AE}=6$, $\\overline{EC}=2$, $\\overline{BC}=10$이라고 해 볼게요.\n\n' +
          '- $\\overline{AD}:\\overline{AC}=4:8=1:2$, $\\overline{AE}:\\overline{AB}=6:12=1:2$\n- $\\angle A$는 공통\n\n' +
          '그래서 $\\triangle ADE ∽ \\triangle ACB$ (SAS 닮음)이고 닮음비는 $1:2$예요. $\\overline{DE}:\\overline{CB}=1:2$이므로 $\\overline{DE}=5$예요.\n\n' +
          '꼭짓점 A끼리, D와 C, E와 B가 대응한다는 것을 잘 보세요. D는 변 AB 위에 있지만 $\\triangle ACB$의 C와 대응해요. **대응하는 각을 보고** 짝을 정해야 해요.\n\n' +
          '> 💡 직각삼각형 ABC에서 $\\angle A=90°$이고 꼭짓점 A에서 빗변 BC에 수선 AH를 그으면 $\\triangle ABC ∽ \\triangle HBA ∽ \\triangle HAC$ (AA 닮음)예요. 그래서 $\\overline{AH}^2=\\overline{BH}\\times\\overline{CH}$ 같은 관계를 얻어요.',
        easy: '겹쳐 있는 두 삼각형을 머릿속에서 **떼어 내어 같은 방향으로 돌려 놓는다**고 생각해 보세요. 작은 삼각형 ADE를 뒤집으면 큰 삼각형 ACB와 같은 모양으로 겹쳐져요.\n\n' +
          '그렇게 놓고 보면 어느 변끼리 짝인지 잘 보여요. 짝을 찾은 다음에는 "작은 것이 큰 것의 몇 배인가"만 따지면 돼요.',
        fig: {
          type: 'polygon', points: [OV.A, OV.D, OV.B, OV.C, OV.E], labels: ['A', 'D', 'B', 'C', 'E'],
          sides: ['4', '8', '10', '2', '6'],
          segments: [{ from: OV.D, to: OV.E }],
          alt: '삼각형 ABC 에서 변 AB 위의 점 D, 변 AC 위의 점 E 를 이은 선분 DE. AD=4, DB=8, AE=6, EC=2, BC=10',
        },
        check: {
          type: 'ox',
          q: '그림의 두 삼각형이 $\\triangle ADE ∽ \\triangle ACB$일 때, 꼭짓점 D와 대응하는 꼭짓점은 B예요.',
          answer: false,
          explain: '기호에서 같은 순서에 있는 꼭짓점끼리 대응해요. $\\triangle ADE ∽ \\triangle ACB$이므로 A와 A, **D와 C**, E와 B가 대응해요.',
        },
      },
      {
        title: '닮음을 이용하여 거리와 높이 구하기',
        body: '직접 잴 수 없는 높이나 거리도 닮은 삼각형을 만들면 구할 수 있어요.\n\n' +
          '**그림자 이용하기** 같은 시각에는 햇빛이 같은 각도로 비치므로, 막대와 그 그림자가 만드는 직각삼각형과 나무와 그 그림자가 만드는 직각삼각형은 AA 닮음이에요.\n\n' +
          '길이가 1 m인 막대의 그림자가 1.5 m이고 같은 시각 나무의 그림자가 6 m이면\n\n$1:(\\text{나무의 높이})=1.5:6$, 그래서 나무의 높이는 $4$ m예요.\n\n' +
          '**축도와 축척** 실제 도형을 일정한 비율로 줄여 그린 그림을 **축도**라고 하고, 축도에서 줄인 비율을 **축척**이라고 해요. 축척이 $1:50000$인 지도에서 2 cm는 실제로 $2\\times50000=100000$ (cm), 곧 1 km예요.\n\n' +
          '> ⚠️ 단위를 꼭 맞추세요. 1 m $=100$ cm, 1 km $=1000$ m $=100000$ cm예요.',
        easy: '해가 비치는 날, 막대와 나무를 나란히 세워 두었다고 생각해 보세요. 막대 그림자가 막대 길이의 1.5배라면, 나무 그림자도 나무 높이의 1.5배예요. 햇빛이 둘에게 똑같이 비치니까요.\n\n' +
          '그래서 나무 그림자가 6 m라면, "1.5배 해서 6이 되는 수"인 4가 나무의 높이예요. 나무에 올라가지 않아도 높이를 알 수 있지요.',
        fig: tris([
          { p: [[0, 30], [0, 70], [60, 70]], n: [null, null, null], s: ['1 m', '1.5 m', null], right: 1 },
          { p: [[100, -90], [100, 70], [340, 70]], n: [null, null, null], s: ['?', '6 m', null], right: 1 },
        ], '길이 1 m 막대와 그림자 1.5 m, 높이를 모르는 나무와 그림자 6 m 가 만드는 두 직각삼각형'),
        check: {
          type: 'short', check: 'number', unit: 'km',
          q: '축척이 $1:100000$인 지도에서 두 마을 사이의 거리가 3 cm예요. 실제 거리는 몇 km일까요?',
          answer: '3',
          wrong: [
            { a: '300000', why: 'cm로 구한 값이에요. $100000$ cm$=1$ km이므로 km로 바꿔요.' },
            { a: '30', why: '단위를 바꿀 때 0의 개수를 잘못 셌어요. $300000$ cm$=3000$ m$=3$ km예요.' },
          ],
          explain: '실제 거리는 $3\\times100000=300000$ (cm)예요. $100000$ cm$=1$ km이므로 3 km예요.',
        },
      },
      {
        title: '닮은 도형의 넓이의 비와 부피의 비',
        body: '닮음비가 $m:n$인 두 도형에서\n\n' +
          '| 무엇의 비 | 비 |\n|---|---|\n| 길이(변, 둘레, 높이) | $m:n$ |\n| 넓이(넓이, 겉넓이) | $m^2:n^2$ |\n| 부피 | $m^3:n^3$ |\n\n' +
          '**왜 그럴까요?** 넓이는 (길이)$\\times$(길이)로 구해요. 가로와 세로가 모두 $\\frac{n}{m}$배가 되면 넓이는 $\\frac{n}{m}\\times\\frac{n}{m}$배가 돼요. 부피는 (길이)$\\times$(길이)$\\times$(길이)이므로 $\\frac{n}{m}$을 세 번 곱해요.\n\n' +
          '예: 닮음비가 $2:3$인 두 삼각형에서 작은 삼각형의 넓이가 $8$ cm²이면 넓이의 비는 $4:9$이므로 $8:(\\text{큰 넓이})=4:9$, 큰 삼각형의 넓이는 $18$ cm²예요.\n\n' +
          '> ⚠️ 닮음비가 2배라고 넓이도 2배가 되는 것이 아니에요. 넓이는 4배, 부피는 8배예요.',
        easy: '한 변이 1 cm인 정사각형 타일을 생각해 보세요. 한 변을 2 cm로 늘이면, 그 안에 1 cm 타일이 가로 2줄, 세로 2줄로 **4개** 들어가요.\n\n' +
          '한 모서리가 1 cm인 주사위 모양 블록이라면, 한 모서리가 2 cm인 정육면체 안에 가로 2개 × 세로 2개 × 높이 2층 = **8개**가 들어가요. 그래서 길이가 2배면 넓이는 4배, 부피는 8배예요.',
        check: {
          type: 'choice',
          q: '닮음비가 $1:3$인 두 정육면체의 부피의 비는 무엇일까요?',
          choices: ['$1:27$', '$1:9$', '$1:3$'],
          answer: 0,
          why: ['', '넓이의 비를 구했어요. 부피는 닮음비를 세 번 곱해요.', '닮음비를 그대로 썼어요. 부피는 길이를 세 번 곱한 양이에요.'],
          explain: '부피의 비는 닮음비를 세제곱한 $1^3:3^3=1:27$이에요.',
        },
      },
    ],

    examples: [
      {
        q: '삼각형 ABC에서 변 AB 위에 점 D, 변 AC 위에 점 E가 있어요. $\\overline{AD}=6$, $\\overline{DB}=6$, $\\overline{AE}=8$, $\\overline{EC}=1$, $\\overline{BC}=12$일 때 $\\overline{DE}$의 길이를 구하세요.',
        steps: [
          '두 삼각형 ADE와 ACB는 $\\angle A$를 공통으로 가져요. 이 각을 끼고 있는 변의 비를 확인해요.',
          '$\\overline{AB}=6+6=12$, $\\overline{AC}=8+1=9$예요. $\\overline{AD}:\\overline{AC}=6:9=2:3$, $\\overline{AE}:\\overline{AB}=8:12=2:3$으로 비가 같아요.',
          '그래서 $\\triangle ADE ∽ \\triangle ACB$ (SAS 닮음)이고 닮음비는 $2:3$이에요. D는 C와, E는 B와 대응해요.',
          '$\\overline{DE}$의 대응변은 $\\overline{CB}$이므로 $\\overline{DE}:12=2:3$, $3\\times\\overline{DE}=24$에서 $\\overline{DE}=8$이에요.',
        ],
        answer: '$\\overline{DE}=8$',
      },
      {
        q: '길이가 2 m인 막대의 그림자가 3 m일 때, 같은 시각에 탑의 그림자가 18 m였어요. 탑의 높이를 구하세요.',
        steps: [
          '막대와 그림자, 탑과 그림자는 각각 직각삼각형을 만들어요. 햇빛이 비치는 각도가 같으므로 두 직각삼각형은 AA 닮음이에요.',
          '대응변의 비를 세워요. (막대):(탑)$=$(막대 그림자):(탑 그림자)이므로 $2:(\\text{탑의 높이})=3:18$이에요.',
          '$3\\times(\\text{탑의 높이})=36$에서 탑의 높이는 $12$ m예요.',
        ],
        answer: '12 m',
      },
      {
        q: '닮은 두 원기둥의 닮음비가 $2:5$이고 작은 원기둥의 부피가 $24$ cm³일 때, 큰 원기둥의 부피를 구하세요.',
        steps: [
          '닮음비가 $2:5$이면 부피의 비는 $2^3:5^3=8:125$예요.',
          '$24:(\\text{큰 부피})=8:125$이므로 $8\\times(\\text{큰 부피})=24\\times125=3000$이에요.',
          '큰 원기둥의 부피는 $375$ cm³예요. (작은 부피를 8로 나눈 3에 125를 곱해도 돼요.)',
        ],
        answer: '375 cm³',
      },
    ],

    terms: [
      { term: '닮음', def: '한 도형을 일정한 비율로 확대하거나 축소한 것이 다른 도형과 합동일 때, 두 도형의 관계예요. 기호 ∽로 나타내요.' },
      { term: '닮은 도형', def: '서로 닮음인 관계에 있는 두 도형이에요. 모양은 같고 크기는 달라도 돼요. 예: 두 원, 두 정사각형' },
      { term: '닮음비', def: '닮은 두 도형에서 대응변의 길이의 비예요. 보통 가장 간단한 자연수의 비로 나타내요. 예: $4:6=2:3$' },
      { term: 'SSS 닮음', def: '세 쌍의 대응변의 길이의 비가 같은 두 삼각형은 닮은 도형이에요.' },
      { term: 'SAS 닮음', def: '두 쌍의 대응변의 길이의 비가 같고 그 끼인각의 크기가 같은 두 삼각형은 닮은 도형이에요.' },
      { term: 'AA 닮음', def: '두 쌍의 대응각의 크기가 각각 같은 두 삼각형은 닮은 도형이에요.' },
      { term: '축도', def: '실제 도형을 일정한 비율로 줄여 그린 그림이에요. 지도나 설계도가 축도예요.' },
      { term: '축척', def: '축도에서 실제 길이를 줄인 비율이에요. 예: 축척 $1:50000$이면 지도의 1 cm가 실제로 50000 cm(500 m)예요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '$\\triangle ABC ∽ \\triangle DEF$일 때, $\\angle B$에 대응하는 각은 무엇일까요?',
        choices: ['$\\angle E$', '$\\angle D$', '$\\angle F$', '$\\angle C$'],
        answer: 0,
        why: [
          '',
          '$\\angle D$는 첫째 자리끼리, 곧 $\\angle A$와 대응해요.',
          '$\\angle F$는 셋째 자리끼리, 곧 $\\angle C$와 대응해요.',
          '$\\angle C$는 같은 삼각형 ABC 안의 각이에요. 대응각은 다른 삼각형에서 찾아요.',
        ],
        explain: '닮음 기호에서는 대응하는 꼭짓점을 같은 순서로 써요. B는 둘째 자리이므로 둘째 자리인 E와 대응해요. 그래서 $\\angle B$의 대응각은 $\\angle E$예요.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '$\\triangle ABC ∽ \\triangle DEF$에서 $\\overline{AB}=6$ cm, $\\overline{DE}=9$ cm예요. $\\triangle ABC$와 $\\triangle DEF$의 닮음비는 무엇일까요?',
        choices: ['$2:3$', '$3:2$', '$4:9$'],
        answer: 0,
        why: [
          '',
          '순서를 바꾸어 썼어요. $\\triangle ABC$ 쪽을 앞에 쓰므로 $6:9$예요.',
          '넓이의 비와 헷갈렸어요. 닮음비는 대응변의 길이의 비 그대로예요.',
        ],
        explain: '$\\overline{AB}$와 $\\overline{DE}$는 대응변이므로 닮음비는 $6:9=2:3$이에요.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', unit: '°', concept: 1,
        q: '사각형 ABCD와 사각형 EFGH는 닮은 도형이고($\\square ABCD ∽ \\square EFGH$) 닮음비는 $2:3$이에요. $\\angle B=80°$일 때, $\\angle F$의 크기는 몇 도일까요?',
        answer: '80',
        wrong: [
          { a: '120', why: '각에도 닮음비를 적용했어요. 닮은 도형에서 대응각의 크기는 같아요.' },
          { a: '160/3', why: '각에 닮음비를 거꾸로 적용했어요. 대응각의 크기는 바뀌지 않아요.' },
        ],
        explain: '$\\angle B$와 $\\angle F$는 둘째 자리끼리라서 대응각이에요. 닮은 도형에서 대응각의 크기는 같으므로 $\\angle F=80°$예요. 닮음비는 길이에만 쓰여요.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 0,
        q: '두 마름모는 항상 닮은 도형이에요.',
        answer: false,
        explain: '마름모는 네 변의 길이가 같지만 각의 크기는 여러 가지일 수 있어요. 정사각형 모양의 마름모와 납작하게 눌린 마름모는 모양이 달라서 닮은 도형이 아니에요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '그림의 두 삼각형은 어떤 조건으로 닮은 도형일까요?',
        fig: pair(1.5, ['A', 'B', 'C'], ['4', '8', '6'], ['D', 'E', 'F'], ['6', '12', '9'], '세 변이 4, 8, 6 인 삼각형 ABC 와 세 변이 6, 12, 9 인 삼각형 DEF', null, null, BASE468),
        choices: ['SSS 닮음', 'SAS 닮음', 'AA 닮음', '닮은 도형이 아니에요'],
        answer: 0,
        why: [
          '',
          'SAS 닮음은 끼인각의 크기가 주어져야 해요. 그림에는 각의 크기가 없어요.',
          'AA 닮음은 두 쌍의 각의 크기가 필요해요. 그림에는 변의 길이만 있어요.',
          '세 쌍의 변의 비를 확인해 보세요. $4:6$, $8:12$, $6:9$가 모두 $2:3$이에요.',
        ],
        explain: '$\\overline{AB}:\\overline{DE}=4:6=2:3$, $\\overline{BC}:\\overline{EF}=8:12=2:3$, $\\overline{CA}:\\overline{FD}=6:9=2:3$으로 세 쌍의 대응변의 길이의 비가 모두 같아요. 그래서 **SSS 닮음**이에요.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 1,
        q: '닮은 두 원기둥이 있어요. 작은 원기둥의 밑면의 반지름은 3 cm, 높이는 6 cm이고, 큰 원기둥의 밑면의 반지름은 5 cm예요. 큰 원기둥의 높이는 몇 cm일까요?',
        answer: '10',
        wrong: [
          { a: '8', why: '반지름의 차(2 cm)만큼 높이에 더했어요. 닮은 도형에서 길이는 차가 아니라 비율로 바뀌어요.' },
          { a: '18/5', why: '비를 거꾸로 썼어요. 큰 원기둥이 더 높아야 해요.' },
        ],
        explain: '닮음비는 반지름의 비 $3:5$예요. 높이의 비도 $3:5$이므로 $6:(\\text{높이})=3:5$, $3\\times(\\text{높이})=30$에서 높이는 10 cm예요.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 3,
        q: '그림의 삼각형 ABC에서 $\\angle ADE=\\angle ACB$이고 $\\overline{AD}=4$ cm, $\\overline{DB}=6$ cm, $\\overline{AE}=5$ cm예요. $\\overline{EC}$의 길이는 몇 cm일까요?',
        fig: {
          type: 'polygon', points: [OW.A, OW.D, OW.B, OW.C, OW.E], labels: ['A', 'D', 'B', 'C', 'E'],
          sides: ['4', '6', null, null, '5'],
          segments: [{ from: OW.D, to: OW.E }],
          alt: '삼각형 ABC 에서 변 AB 위의 점 D, 변 AC 위의 점 E 를 이은 선분 DE. AD=4, DB=6, AE=5',
        },
        answer: '3',
        hint: '$\\angle A$가 공통이에요. 어느 삼각형과 어느 삼각형이 닮았는지, 꼭짓점의 짝부터 정해 보세요.',
        wrong: [
          { a: '8', why: '$\\overline{AC}$의 길이를 구했어요. 문제는 $\\overline{EC}=\\overline{AC}-\\overline{AE}$예요.' },
          { a: '15/2', why: '$\\overline{DE}$와 $\\overline{BC}$가 평행하다고 생각해 $4:6=5:\\overline{EC}$로 계산했어요. 이 그림에서는 D가 C와 대응해요.' },
        ],
        explain: '$\\triangle ADE$와 $\\triangle ACB$에서 $\\angle A$는 공통이고 $\\angle ADE=\\angle ACB$이므로 $\\triangle ADE ∽ \\triangle ACB$ (AA 닮음)예요. D는 C와, E는 B와 대응해요.\n\n' +
          '$\\overline{AB}=4+6=10$이므로 $\\overline{AD}:\\overline{AC}=\\overline{AE}:\\overline{AB}$, 곧 $4:\\overline{AC}=5:10$이에요. $5\\times\\overline{AC}=40$에서 $\\overline{AC}=8$ cm, 그래서 $\\overline{EC}=8-5=3$ cm예요.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', unit: 'm', concept: 4,
        q: '키가 1.6 m인 지아의 그림자 길이가 2 m일 때, 같은 시각에 어떤 건물의 그림자 길이가 15 m였어요. 건물의 높이는 몇 m일까요?',
        answer: '12',
        hint: '(지아의 키):(건물의 높이) $=$ (지아의 그림자):(건물의 그림자)',
        wrong: [
          { a: '18.75', why: '비를 거꾸로 세웠어요. 그림자가 키보다 길므로 건물의 높이는 그림자 15 m보다 짧아야 해요.' },
          { a: '14.6', why: '그림자와 키의 차(0.4 m)를 뺐어요. 닮음에서는 차가 아니라 비율이 같아요.' },
        ],
        explain: '지아와 그림자, 건물과 그림자가 만드는 두 직각삼각형은 AA 닮음이에요. $1.6:(\\text{높이})=2:15$이므로 $2\\times(\\text{높이})=24$, 건물의 높이는 12 m예요.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 5,
        q: '닮음비가 $3:4$인 닮은 두 삼각형이 있어요. 작은 삼각형의 넓이가 27 cm²일 때, 큰 삼각형의 넓이는 몇 cm²일까요?',
        answer: '48',
        wrong: [
          { a: '36', why: '닮음비 $3:4$를 넓이에 그대로 썼어요. 넓이의 비는 $3^2:4^2=9:16$이에요.' },
          { a: '64', why: '부피의 비 $27:64$를 썼어요. 넓이는 닮음비를 두 번만 곱해요.' },
        ],
        explain: '넓이의 비는 $3^2:4^2=9:16$이에요. $27:(\\text{큰 넓이})=9:16$이므로 큰 넓이는 $27\\div9\\times16=48$ (cm²)예요.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 5,
        q: '반지름이 4 cm인 구와 반지름이 6 cm인 구의 부피의 비는 무엇일까요?',
        choices: ['$8:27$', '$4:9$', '$2:3$', '$27:8$'],
        answer: 0,
        why: [
          '',
          '넓이(겉넓이)의 비를 구했어요. 부피는 닮음비를 세제곱해요.',
          '닮음비를 그대로 썼어요. 부피는 길이를 세 번 곱한 양이에요.',
          '순서를 거꾸로 썼어요. 반지름이 4 cm인 구가 앞이에요.',
        ],
        explain: '두 구는 항상 닮은 도형이고 닮음비는 반지름의 비 $4:6=2:3$이에요. 부피의 비는 $2^3:3^3=8:27$이에요.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', unit: 'km', concept: 4,
        q: '축척이 $1:25000$인 지도에서 길이가 4 cm인 길은 실제로 몇 km일까요?',
        answer: '1',
        wrong: [
          { a: '100000', why: 'cm 단위의 값이에요. $100000$ cm$=1000$ m$=1$ km로 바꿔요.' },
          { a: '10', why: '단위를 바꿀 때 0의 개수를 잘못 셌어요. 1 km는 $100000$ cm예요.' },
        ],
        explain: '실제 길이는 $4\\times25000=100000$ (cm)예요. $100000$ cm$=1000$ m$=1$ km예요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 3,
        q: '$\\angle A=90°$인 직각삼각형 ABC의 꼭짓점 A에서 빗변 BC에 내린 수선의 발을 H라고 해요. $\\overline{BH}=4$ cm, $\\overline{CH}=9$ cm일 때, $\\overline{AH}$의 길이는 몇 cm일까요?',
        fig: {
          type: 'polygon', points: [[4, 6], [0, 0], [4, 0], [13, 0]], labels: ['A', 'B', 'H', 'C'],
          sides: [null, '4', '9', null], angles: [{ at: 0, right: true }],
          segments: [{ from: [4, 6], to: [4, 0], right: true }],
          alt: '각 A 가 직각인 삼각형 ABC 와 A 에서 BC 에 내린 수선 AH. BH=4, CH=9',
        },
        answer: '6',
        hint: '$\\triangle HBA$와 $\\triangle HAC$가 닮음이에요. 직각과 다른 한 각을 비교해 보세요.',
        wrong: [
          { a: '36', why: '$\\overline{AH}\\times\\overline{AH}=36$까지 구했어요. 같은 수를 두 번 곱해 36이 되는 양수를 찾아요.' },
          { a: '13/2', why: '$\\overline{BH}$와 $\\overline{CH}$의 평균을 구했어요. 닮은 삼각형의 비로 구해요.' },
        ],
        explain: '$\\triangle HBA$와 $\\triangle HAC$에서 $\\angle AHB=\\angle CHA=90°$이고, $\\angle HBA=90°-\\angle C=\\angle HAC$예요. 그래서 $\\triangle HBA ∽ \\triangle HAC$ (AA 닮음)예요.\n\n' +
          '대응변의 비로 $\\overline{BH}:\\overline{AH}=\\overline{AH}:\\overline{CH}$, 곧 $\\overline{AH}\\times\\overline{AH}=4\\times9=36$이에요. $6\\times6=36$이므로 $\\overline{AH}=6$ cm예요.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm³', concept: 5,
        q: '두 정육면체 (가), (나)의 겉넓이의 비가 $4:9$예요. (가)의 부피가 16 cm³일 때, (나)의 부피는 몇 cm³일까요?',
        answer: '54',
        hint: '겉넓이의 비에서 먼저 닮음비를 찾아요. 같은 수를 두 번 곱해 4, 9가 되는 수는?',
        wrong: [
          { a: '36', why: '겉넓이의 비 $4:9$를 부피에 그대로 썼어요. 닮음비 $2:3$을 먼저 구해 세제곱해요.' },
          { a: '24', why: '닮음비 $2:3$을 부피에 그대로 썼어요. 부피의 비는 $2^3:3^3=8:27$이에요.' },
        ],
        explain: '두 정육면체는 항상 닮은 도형이에요. 겉넓이의 비가 $4:9=2^2:3^2$이므로 닮음비는 $2:3$이고, 부피의 비는 $2^3:3^3=8:27$이에요.\n\n$16:(\\text{(나)의 부피})=8:27$이므로 (나)의 부피는 $16\\div8\\times27=54$ (cm³)예요.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', unit: 'mL', concept: 5,
        q: '꼭짓점이 아래로 향하게 놓인 원뿔 모양의 그릇에 물을 부었더니, 물의 높이가 그릇 높이의 $\\frac{1}{3}$이 되었고 물의 부피는 20 mL였어요. 그릇에 물을 가득 채우려면 물을 몇 mL 더 부어야 할까요?',
        answer: '520',
        hint: '물이 이룬 원뿔과 그릇 전체의 원뿔은 닮은 도형이에요. 닮음비는?',
        wrong: [
          { a: '540', why: '그릇 전체의 부피를 구했어요. 이미 들어 있는 20 mL를 빼야 해요.' },
          { a: '40', why: '닮음비 $1:3$을 부피에 그대로 썼어요. 부피의 비는 $1:27$이에요.' },
          { a: '160', why: '넓이의 비 $1:9$를 썼어요. 부피의 비는 닮음비를 세제곱한 $1:27$이에요.' },
        ],
        explain: '물이 이룬 원뿔과 그릇 전체의 원뿔은 닮음비가 $1:3$인 닮은 도형이에요. 부피의 비는 $1^3:3^3=1:27$이므로 그릇 전체의 부피는 $20\\times27=540$ (mL)예요.\n\n더 부어야 할 물은 $540-20=520$ (mL)예요.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: 'm', concept: 4,
        q: '평평한 땅에 작은 거울을 놓고, 거울에서 2 m 떨어진 곳에 서서 거울을 보았더니 나무 꼭대기가 보였어요. 눈높이는 1.5 m이고 거울에서 나무 밑동까지는 8 m예요. 빛이 거울에 들어오는 각과 반사되어 나가는 각의 크기가 같을 때, 나무의 높이는 몇 m일까요? (사람과 나무는 땅에 수직으로 서 있어요.)',
        answer: '6',
        hint: '눈·발·거울이 만드는 직각삼각형과 나무 꼭대기·밑동·거울이 만드는 직각삼각형을 비교해요.',
        wrong: [
          { a: '3/8', why: '비를 거꾸로 세웠어요. 거울에서 더 먼 나무 쪽 삼각형이 더 커요.' },
          { a: '7.5', why: '거리의 차(6 m)를 눈높이에 더했어요. 닮음에서는 비율이 같아요.' },
        ],
        explain: '두 직각삼각형은 직각이 하나씩 있고, 거울에서 빛이 들어오고 나가는 각이 같으므로 AA 닮음이에요.\n\n(눈높이):(나무의 높이)$=$(사람과 거울 사이):(나무와 거울 사이)이므로 $1.5:(\\text{높이})=2:8$이에요. $2\\times(\\text{높이})=12$에서 나무의 높이는 6 m예요.',
      },
      {
        id: 'a5', level: 3, type: 'ox', concept: 2,
        q: '한 각의 크기가 같은 두 이등변삼각형은 항상 닮은 도형이에요.',
        answer: false,
        explain: '같은 각이 한쪽에서는 꼭지각이고 다른 쪽에서는 밑각일 수 있어요. 예를 들어 꼭지각이 $40°$인 이등변삼각형(밑각 $70°$, $70°$)과 밑각이 $40°$인 이등변삼각형(꼭지각 $100°$)은 각의 크기가 달라서 닮지 않았어요.\n\n꼭지각끼리 같거나 밑각끼리 같으면 세 각이 모두 같아져서 AA 닮음이 돼요.',
      },
    ],

    deeper: [
      {
        title: '그림자로 피라미드의 높이를 잰 탈레스',
        body: '고대 그리스의 수학자 탈레스는 이집트의 피라미드 높이를 그림자로 쟀다는 이야기가 전해져요. 막대를 세워 두고 **막대의 그림자 길이가 막대의 길이와 같아지는 순간**을 기다렸다가, 바로 그때 피라미드의 그림자 길이를 재었다고 해요.\n\n' +
          '그 순간에는 햇빛이 만드는 직각삼각형이 모두 직각이등변삼각형 모양이 되므로, 피라미드의 높이도 그림자 길이(피라미드 밑면의 중심부터 잰 길이)와 같아요. 오늘 배운 AA 닮음을 아주 오래전에 쓴 셈이에요.',
      },
      {
        title: '복사 용지와 닮음, 그리고 다음 학년',
        body: 'A3 용지를 긴 변의 가운데에서 반으로 자르면 A4 용지가 돼요. 놀랍게도 A3와 A4는 **닮은 도형**이 되도록 가로와 세로의 비가 정해져 있어요. 그래서 A4 문서를 A3로 확대 복사해도 여백 모양이 그대로예요.\n\n' +
          'A3의 넓이는 A4의 2배이므로 넓이의 비가 $2:1$이에요. 그러면 닮음비는 "두 번 곱해서 2가 되는 수"와 1의 비가 되는데, 이런 수는 중학교 3학년의 **제곱근**에서 배워요. 또 3학년에서 배우는 **삼각비**도 "닮은 직각삼각형에서 변의 비는 일정하다"는 오늘의 내용에서 출발해요.',
      },
    ],

    faq: [
      {
        q: '합동이랑 닮음은 뭐가 달라요?',
        a: '합동은 모양과 크기가 모두 같은 것이고, 닮음은 모양만 같으면 돼요. 그래서 합동인 두 도형은 닮음비가 $1:1$인 닮은 도형이기도 해요. 기호도 달라서 합동은 ≡, 닮음은 ∽를 써요.',
      },
      {
        q: '닮음비가 2:3이면 넓이는 왜 4:9예요?',
        a: '넓이는 가로와 세로처럼 길이 두 개를 곱해서 구해요. 두 길이가 모두 $\\frac{3}{2}$배가 되니 넓이는 $\\frac{3}{2}\\times\\frac{3}{2}=\\frac{9}{4}$배가 돼요. 그래서 넓이의 비는 $4:9$예요. 부피는 길이 세 개를 곱하니 $8:27$이에요.',
      },
      {
        q: '△ABC∽△DEF에서 꼭짓점 순서가 왜 중요해요?',
        a: '기호에서 같은 자리에 쓴 꼭짓점끼리 대응한다는 약속이 있기 때문이에요. $\\triangle ABC ∽ \\triangle DEF$라고 쓰면 A와 D, B와 E, C와 F가 짝이에요. 순서를 아무렇게나 쓰면 어느 변끼리 비를 세워야 하는지 알 수 없어요.',
      },
      {
        q: 'AA 닮음은 왜 각 두 개만 같으면 돼요?',
        a: '삼각형의 세 내각의 크기의 합은 항상 $180°$라서, 두 각이 같으면 나머지 한 각도 저절로 같아요. 세 각이 같으면 모양이 같고 크기만 다를 수 있으니 닮은 도형이에요.',
      },
    ],

    mistakes: [
      '겹쳐 있는 삼각형에서 위치만 보고 짝을 정하는 실수 — $\\angle ADE=\\angle ACB$이면 D는 B가 아니라 C와 대응해요. 크기가 같은 각을 보고 짝을 정해요.',
      '넓이나 부피에 닮음비를 그대로 쓰는 실수 — 닮음비가 $m:n$이면 넓이의 비는 $m^2:n^2$, 부피의 비는 $m^3:n^3$이에요.',
      '닮음비를 "차"로 생각하는 실수 — 3 cm가 5 cm가 되었다고 다른 변에도 2 cm를 더하면 안 돼요. 모든 길이가 같은 비율($\\frac{5}{3}$배)로 바뀌어요.',
    ],

    gens: [
      {
        id: 'sim-side',
        level: 1,
        title: '닮음비로 대응변의 길이 구하기',
        make: function (R) {
          var pr = R.pick([[1, 2], [2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [1, 3], [3, 2], [5, 3], [4, 3], [5, 2]]);
          var m = pr[0], n = pr[1];
          var s = R.int(2, 5), t = R.int(2, 6);
          if (t === s) t = s + 1;
          var idx = R.pick([1, 2]);
          var X = idx === 1 ? '\\overline{BC}' : '\\overline{CA}', Y = idx === 1 ? '\\overline{EF}' : '\\overline{FD}';
          var askBig = R.bool();   // true: △DEF 쪽 변을 묻는다
          var given = askBig ? m * t : n * t, ans = askBig ? n * t : m * t;
          var GV = askBig ? X : Y, AS = askBig ? Y : X;
          var L1 = [m * s, null, null], L2 = [n * s, null, null];
          if (askBig) { L1[idx] = String(given); L2[idx] = '?'; } else { L1[idx] = '?'; L2[idx] = String(given); }
          var inv = askBig ? frs(given * m, n) : frs(given * n, m);
          var add = askBig ? given + (n - m) * s : given - (n - m) * s;
          var wl = [[inv, '닮음비를 거꾸로 썼어요. $' + X + ':' + Y + '=' + m + ':' + n + '$의 순서를 확인해요.']];
          if (add > 0) wl.push([add, '대응변의 길이의 차(' + Math.abs(n - m) * s + ' cm)를 더하거나 뺐어요. 닮은 도형에서 길이는 차가 아니라 비율로 바뀌어요.']);
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 1,
            q: '$\\triangle ABC ∽ \\triangle DEF$이고 $\\overline{AB}=' + m * s + '$ cm, $\\overline{DE}=' + n * s + '$ cm, $' + GV + '=' + given + '$ cm예요. $' + AS + '$의 길이는 몇 cm일까요?',
            fig: pair(n / m, ['A', 'B', 'C'], L1, ['D', 'E', 'F'], L2, '삼각형 ABC 와 그와 닮은 삼각형 DEF (그림의 크기는 정확하지 않음)'),
            answer: String(ans),
            wrong: wrongs(ans, wl),
            explain: '대응변 $\\overline{AB}$와 $\\overline{DE}$로 닮음비를 구하면 $' + m * s + ':' + n * s + '=' + m + ':' + n + '$' + R.josa(n, '이에요/예요') + '.\n\n' +
              '$' + X + '$와 $' + Y + '$도 대응변이므로 $' + X + ':' + Y + '=' + m + ':' + n + '$에서 $' + AS + '=' + ans + '$ cm예요.',
          };
        },
      },
      {
        id: 'shadow',
        level: 2,
        title: '그림자로 높이 구하기',
        make: function (R) {
          var pr = R.pick([[1, 2], [1, 3], [2, 3], [2, 5], [2, 1], [1, 4], [2, 7], [1, 5]]);   // 막대 1~2 m
          var h = pr[0], sh = pr[1], k = R.int(3, 9);
          var H = h * k, S = sh * k;
          var obj = R.pick(['나무', '건물', '가로등', '깃대', '탑']);
          var inv = frs(S * sh, h);
          var add = S + (h - sh);
          var wl = [[inv, '비를 거꾸로 세웠어요. (막대):(' + obj + ')$=$(막대 그림자):(' + obj + ' 그림자)로 세워요.']];
          if (add > 0) wl.push([add, '막대와 그림자의 길이의 차를 이용했어요. 닮음에서는 차가 아니라 비율이 같아요.']);
          return {
            type: 'short', check: 'number', unit: 'm', concept: 4,
            q: '길이가 ' + h + ' m인 막대를 땅에 수직으로 세웠더니 그림자의 길이가 ' + sh + ' m였어요. 같은 시각에 ' + obj + '의 그림자의 길이는 ' + S + ' m였어요. ' + obj + '의 높이는 몇 m일까요?',
            answer: String(H),
            wrong: wrongs(H, wl),
            explain: '같은 시각에는 햇빛이 같은 각도로 비치므로, 막대와 그림자가 만드는 직각삼각형과 ' + obj + R.josa(obj, '과/와') + ' 그림자가 만드는 직각삼각형은 AA 닮음이에요.\n\n' +
              '$' + h + ':(\\text{높이})=' + sh + ':' + S + '$이므로 $' + sh + '\\times(\\text{높이})=' + (h * S) + '$, ' + obj + '의 높이는 ' + H + ' m예요.',
          };
        },
      },
      {
        id: 'area-volume',
        level: 2,
        title: '닮은 도형의 넓이와 부피 구하기',
        make: function (R) {
          var pr = R.pick([[1, 2], [2, 3], [1, 3], [3, 4], [2, 5], [3, 2], [4, 3], [3, 5], [2, 1], [5, 2]]);
          var m = pr[0], n = pr[1];
          var vol = R.bool();
          var p = vol ? 3 : 2;
          var t = vol ? R.int(1, 3) : R.int(1, 6);
          var G = Math.pow(m, p) * t, A = Math.pow(n, p) * t;
          var shape = vol ? R.pick(['원기둥', '사각뿔', '직육면체', '원뿔', '삼각기둥']) : R.pick(['삼각형', '오각형', '사다리꼴', '평행사변형', '육각형']);
          var what = vol ? '부피' : '넓이', u = vol ? 'cm³' : 'cm²';
          var wl = [[frs(G * n, m), '닮음비 $' + m + ':' + n + '$' + R.josa(n, '을/를') + ' ' + what + '에 그대로 썼어요. ' + what + '의 비는 $' + m + '^' + p + ':' + n + '^' + p + '$이에요.']];
          if (vol) wl.push([frs(G * n * n, m * m), '넓이의 비 $' + m * m + ':' + n * n + '$' + R.josa(n * n, '을/를') + ' 썼어요. 부피의 비는 닮음비를 세제곱해요.']);
          else wl.push([frs(G * n * n * n, m * m * m), '부피의 비를 썼어요. 넓이의 비는 닮음비를 제곱해요.']);
          wl.push([frs(G * m * m, n * n), '비를 거꾸로 썼어요. (가)와 (나)의 순서를 확인해요.']);
          var ratio = Math.pow(m, p) + ':' + Math.pow(n, p);
          return {
            type: 'short', check: 'number', unit: u, concept: 5,
            q: '닮은 두 ' + shape + ' (가), (나)의 닮음비가 $' + m + ':' + n + '$' + R.josa(n, '이에요/예요') + '. (가)의 ' + what + '가 ' + G + ' ' + u + '일 때, (나)의 ' + what + '는 몇 ' + u + '일까요?',
            answer: String(A),
            wrong: wrongs(A, wl),
            explain: '닮음비가 $' + m + ':' + n + '$이면 ' + what + '의 비는 $' + m + '^' + p + ':' + n + '^' + p + '$, 곧 $' + ratio + '$' + R.josa(Math.pow(n, p), '이에요/예요') + '.\n\n' +
              '$' + G + ':(\\text{(나)의 ' + what + '})=' + ratio + '$이므로 (나)의 ' + what + '는 $' + G + '\\div' + Math.pow(m, p) + '\\times' + Math.pow(n, p) + '=' + A + '$ (' + u + ')예요.',
          };
        },
      },
      {
        id: 'volume-from-ratio',
        level: 3,
        title: '넓이의 비나 높이의 비에서 부피 구하기',
        make: function (R) {
          if (R.bool()) {
            var k = R.pick([2, 3, 4]);
            var w = R.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]);
            var total = w * k * k * k, add = total - w;
            return {
              type: 'short', check: 'number', unit: 'mL', concept: 5,
              q: '꼭짓점이 아래로 향하게 놓인 원뿔 모양의 그릇에 물을 부었더니, 물의 높이가 그릇 높이의 $\\frac{1}{' + k + '}$이 되었고 물의 부피는 ' + w + ' mL였어요. 그릇에 물을 가득 채우려면 물을 몇 mL 더 부어야 할까요?',
              answer: String(add),
              wrong: wrongs(add, [
                [total, '그릇 전체의 부피를 구했어요. 이미 들어 있는 ' + w + ' mL를 빼야 해요.'],
                [w * k - w, '닮음비 $1:' + k + '$' + R.josa(k, '을/를') + ' 부피에 그대로 썼어요. 부피의 비는 $1:' + (k * k * k) + '$' + R.josa(k * k * k, '이에요/예요') + '.'],
                [w * k * k - w, '넓이의 비 $1:' + (k * k) + '$' + R.josa(k * k, '을/를') + ' 썼어요. 부피의 비는 닮음비를 세제곱해요.'],
              ]),
              explain: '물이 이룬 원뿔과 그릇 전체의 원뿔은 닮음비가 $1:' + k + '$인 닮은 도형이에요. 부피의 비는 $1^3:' + k + '^3=1:' + (k * k * k) + '$이므로 그릇 전체의 부피는 $' + w + '\\times' + (k * k * k) + '=' + total + '$ (mL)예요.\n\n' +
                '더 부어야 할 물은 $' + total + '-' + w + '=' + add + '$ (mL)예요.',
            };
          }
          var pr = R.pick([[1, 2], [2, 3], [1, 3], [3, 4], [2, 5], [3, 2], [4, 3]]);
          var m = pr[0], n = pr[1], t = R.int(1, 4);
          var G = m * m * m * t, A = n * n * n * t;
          var shape = R.pick(['원기둥', '정육면체', '원뿔', '구', '사각뿔']);
          return {
            type: 'short', check: 'number', unit: 'cm³', concept: 5,
            q: '닮은 두 ' + shape + ' (가), (나)의 겉넓이의 비가 $' + (m * m) + ':' + (n * n) + '$' + R.josa(n * n, '이에요/예요') + '. (가)의 부피가 ' + G + ' cm³일 때, (나)의 부피는 몇 cm³일까요?',
            answer: String(A),
            wrong: wrongs(A, [
              [frs(G * n * n, m * m), '겉넓이의 비를 부피에 그대로 썼어요. 닮음비 $' + m + ':' + n + '$' + R.josa(n, '을/를') + ' 먼저 구해 세제곱해요.'],
              [frs(G * n, m), '닮음비를 부피에 그대로 썼어요. 부피의 비는 닮음비를 세제곱해요.'],
            ]),
            explain: '겉넓이의 비가 $' + (m * m) + ':' + (n * n) + '=' + m + '^2:' + n + '^2$이므로 닮음비는 $' + m + ':' + n + '$' + R.josa(n, '이에요/예요') + '. 부피의 비는 $' + m + '^3:' + n + '^3$, 곧 $' + (m * m * m) + ':' + (n * n * n) + '$' + R.josa(n * n * n, '이에요/예요') + '.\n\n' +
              '(나)의 부피는 $' + G + '\\div' + (m * m * m) + '\\times' + (n * n * n) + '=' + A + '$ (cm³)예요.',
          };
        },
      },
    ],
  });
})();
