/* 6학년 수학 · 공간과 입체
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 쌓기나무 겨냥도·위/앞/옆에서 본 모양·층별 모양은 아래 도우미가 직접 그린 svg.
 * 쌓은 모양은 g[r][c] (r=0 맨 뒤 줄 → 마지막이 맨 앞 줄, c=0 맨 왼쪽)에 그 자리의 쌓기나무 수로 적는다.
 * "옆에서 본 모양"은 오른쪽 옆에서 본 모양이다(보는 사람의 왼쪽이 앞, 오른쪽이 뒤). */
(function () {
  var ST = '" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>';
  var LAB = ['가', '나', '다', '라'];
  function r1(v) { return Math.round(v * 10) / 10; }
  function txt(x, y, s, size) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 14) + '" text-anchor="middle" fill="currentColor">' + s + '</text>';
  }
  function maxOf(g) { var m = 0; g.forEach(function (row) { row.forEach(function (h) { if (h > m) m = h; }); }); return m; }
  function total(g) { var t = 0; g.forEach(function (row) { row.forEach(function (h) { t += h; }); }); return t; }
  function cells(g) { var t = 0; g.forEach(function (row) { row.forEach(function (h) { if (h > 0) t++; }); }); return t; }
  function atLeast(g, k) { var t = 0; g.forEach(function (row) { row.forEach(function (h) { if (h >= k) t++; }); }); return t; }
  // 앞에서 본 모양: 왼쪽 줄부터 각 줄의 가장 높은 층
  function frontOf(g) {
    return g[0].map(function (_, c) { var m = 0; g.forEach(function (row) { if (row[c] > m) m = row[c]; }); return m; });
  }
  // 오른쪽 옆에서 본 모양: 앞 줄부터 뒤 줄 순서로 각 줄의 가장 높은 층
  function sideOf(g) {
    var out = [];
    for (var r = g.length - 1; r >= 0; r--) out.push(Math.max.apply(null, g[r]));
    return out;
  }
  function sum(a) { return a.reduce(function (s, x) { return s + x; }, 0); }

  // 겨냥도 조각 (앞·위·오른쪽 옆이 보이게)
  function isoPart(g, s) {
    s = s || 30;
    var dx = Math.round(s * 0.45), dy = Math.round(s * 0.38), nr = g.length, nc = g[0].length, mz = maxOf(g);
    var w = nc * s + nr * dx, h = mz * s + nr * dy, body = '';
    for (var r = 0; r < nr; r++) {            // 뒤 줄부터 그린다
      var y = nr - 1 - r;
      for (var z = 0; z < mz; z++) {
        for (var c = 0; c < nc; c++) {
          if (g[r][c] <= z) continue;
          var X = c * s + y * dx, Y = h - (z + 1) * s - y * dy;
          body += '<polygon points="' + X + ',' + (Y + s) + ' ' + X + ',' + Y + ' ' + (X + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y + s - dy) + ' ' + (X + s) + ',' + (Y + s) + '" fill="var(--surface, #fff)"/>';  // 뒤의 쌓기나무가 비쳐 보이지 않게 불투명한 바탕
          body += '<rect x="' + X + '" y="' + Y + '" width="' + s + '" height="' + s + '" fill="var(--fig-1)" fill-opacity="0.3' + ST;
          body += '<polygon points="' + X + ',' + Y + ' ' + (X + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y - dy) + ' ' + (X + s) + ',' + Y + '" fill="var(--fig-1)" fill-opacity="0.65' + ST;
          body += '<polygon points="' + (X + s) + ',' + Y + ' ' + (X + s + dx) + ',' + (Y - dy) + ' ' + (X + s + dx) + ',' + (Y + s - dy) + ' ' + (X + s) + ',' + (Y + s) + '" fill="var(--fig-1)" fill-opacity="0.48' + ST;
        }
      }
    }
    return { w: w, h: h, body: body };
  }
  // 위에서 본 모양 조각 (nums: 칸에 쌓기나무 수를 쓴다)
  function topPart(g, cell, nums) {
    var body = '';
    g.forEach(function (row, r) {
      row.forEach(function (hh, c) {
        if (hh <= 0) return;
        body += '<rect x="' + c * cell + '" y="' + r * cell + '" width="' + cell + '" height="' + cell + '" fill="var(--fig-2)" fill-opacity="0.3' + ST;
        if (nums) body += txt(c * cell + cell / 2, r * cell + cell / 2 + 6, String(hh), 17);
      });
    });
    return { w: g[0].length * cell, h: g.length * cell, body: body };
  }
  // 앞·옆에서 본 모양 조각: hs = 왼쪽부터 각 줄의 높이
  function viewPart(hs, cell) {
    var m = Math.max.apply(null, hs), body = '';
    hs.forEach(function (hh, i) {
      for (var k = 0; k < hh; k++) {
        body += '<rect x="' + i * cell + '" y="' + (m - 1 - k) * cell + '" width="' + cell + '" height="' + cell + '" fill="var(--fig-3)" fill-opacity="0.3' + ST;
      }
    });
    return { w: hs.length * cell, h: m * cell, body: body };
  }
  // 층별로 나타낸 모양 조각: k층에 쌓기나무가 있는 칸만 칠하고, 바닥 자리는 점선
  function layerPart(g, k, cell) {
    var body = '';
    g.forEach(function (row, r) {
      row.forEach(function (hh, c) {
        var on = hh >= k;
        body += '<rect x="' + c * cell + '" y="' + r * cell + '" width="' + cell + '" height="' + cell + '" fill="' + (on ? 'var(--fig-2)' : 'none') + '" fill-opacity="0.35" stroke="currentColor" stroke-width="' + (on ? 1.4 : 0.8) + '"' + (on ? '' : ' stroke-dasharray="3 3"') + '/>';
      });
    });
    return { w: g[0].length * cell, h: g.length * cell, body: body };
  }
  // 조각들을 줄마다 가로로 늘어놓고 이름표를 붙인다: rows = [[{ p, label }]]
  function board(rows, alt) {
    var gap = 28, pad = 10, out = '', y = pad;
    var lay = rows.map(function (row) {
      var w = 0, h = 0;
      row.forEach(function (it, i) { it.sw = Math.max(it.p.w, it.label ? it.label.length * 14 : 0); w += it.sw + (i ? gap : 0); if (it.p.h > h) h = it.p.h; });
      return { row: row, w: w, h: h };
    });
    var W = 0;
    lay.forEach(function (l) { if (l.w > W) W = l.w; });
    W = Math.max(W + 2 * pad + 16, 200);
    lay.forEach(function (l) {
      var x = (W - l.w) / 2, hasLab = false;
      l.row.forEach(function (it) {
        var px = r1(x + (it.sw - it.p.w) / 2), py = r1(y + 8 + l.h - it.p.h);
        out += '<g transform="translate(' + px + ',' + py + ')">' + it.p.body + '</g>';
        if (it.label) { out += txt(x + it.sw / 2, y + 8 + l.h + 20, it.label, 14); hasLab = true; }
        x += it.sw + gap;
      });
      y += 8 + l.h + (hasLab ? 30 : 8);
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + r1(W) + ' ' + r1(y + pad) + '">' + out + '</svg>', alt: alt };
  }
  function gridWords(g) {
    return g.map(function (row, r) {
      return (r === g.length - 1 ? '맨 앞 줄 ' : r === 0 ? '맨 뒤 줄 ' : '가운데 줄 ') + row.map(function (h) { return h > 0 ? String(h) : '빈칸'; }).join(', ');
    }).join(' / ');
  }

  // 생성기: 모든 줄·칸이 이어지고 비지 않은 모양
  function okGrid(g) {
    var nr = g.length, nc = g[0].length, r, c;
    for (r = 0; r < nr; r++) if (Math.max.apply(null, g[r]) === 0) return false;
    for (c = 0; c < nc; c++) { var any = false; for (r = 0; r < nr; r++) if (g[r][c] > 0) any = true; if (!any) return false; }
    var seen = {}, stack = [], start = null, n = 0;
    for (r = 0; r < nr; r++) for (c = 0; c < nc; c++) if (g[r][c] > 0) { n++; if (!start) start = [r, c]; }
    stack.push(start); seen[start.join()] = 1;
    var cnt = 0;
    while (stack.length) {
      var p = stack.pop(); cnt++;
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
        var a = p[0] + d[0], b = p[1] + d[1];
        if (a < 0 || b < 0 || a >= nr || b >= nc || g[a][b] <= 0 || seen[a + ',' + b]) return;
        seen[a + ',' + b] = 1; stack.push([a, b]);
      });
    }
    return cnt === n;
  }
  function makeGrid(R, nr, nc, maxH, holes) {
    var g = [], r, c;
    for (r = 0; r < nr; r++) { var row = []; for (c = 0; c < nc; c++) row.push(R.int(1, maxH)); g.push(row); }
    for (var t = 0; t < holes; t++) {
      r = R.int(0, nr - 1); c = R.int(0, nc - 1);
      var old = g[r][c];
      g[r][c] = 0;
      if (!okGrid(g)) g[r][c] = old;
    }
    return g;
  }

  // 단원에 쓰는 모양들
  var A = [[2, 2, 1], [1, 0, 1]];          // 7개
  var G1 = [[3, 1], [2, 1]];               // 7개, 뒤 왼쪽 아래 두 개는 보이지 않는다
  var C = [[1, 2, 0], [2, 1, 1]];          // 7개
  var E = [[3, 2, 1], [2, 1, 0], [1, 0, 0]]; // 10개 (1층 6, 2층 3, 3층 1)
  function threeViews(g, cell) {
    return [
      { p: viewPart(frontOf(g), cell), label: '앞' },
      { p: viewPart(sideOf(g), cell), label: '오른쪽 옆' },
      { p: topPart(g, cell, false), label: '위' },
    ];
  }

Tutor.registerUnit({
  id: 'math-e6-08',
  course: 'math-e6',
  title: '공간과 입체',
  summary: '여러 방향에서 본 모양을 알고, 쌓기나무로 만든 모양을 위, 앞, 옆에서 본 모양으로 나타내요.',
  goals: [
    '어느 방향에서 본 모양인지 알 수 있어요.',
    '쌓기나무로 쌓은 모양을 보고 쌓기나무의 개수를 구할 수 있어요.',
    '쌓은 모양을 위, 앞, 옆에서 본 모양, 위에서 본 모양에 수를 쓴 것, 층별로 나타낸 모양으로 나타낼 수 있어요.',
    '조건에 맞게 쌓기나무로 여러 가지 모양을 만들 수 있어요.',
  ],
  standards: ['[6수03-09]', '[6수03-10]'],

  concepts: [
    {
      title: '어느 방향에서 본 모양일까요?',
      body: '같은 물건도 **보는 방향에 따라 모양이 달라요.** 쌓기나무로 쌓은 모양은 보통 **위**, **앞**, **옆**(오른쪽 옆) 세 방향에서 본 모양으로 나타내요.\n\n- 위에서 본 모양: 바닥에 쌓기나무가 놓인 자리\n- 앞에서 본 모양: 앞에서 바라볼 때 보이는 모양(왼쪽 줄부터)\n- 옆에서 본 모양: 오른쪽 옆에서 바라볼 때 보이는 모양(내 왼쪽이 앞, 오른쪽이 뒤)\n\n그림은 쌓기나무 7개로 쌓은 모양과, 그 모양을 앞, 오른쪽 옆, 위에서 본 모양이에요.',
      easy: '컵을 떠올려 보세요. 옆에서 보면 직사각형 같지만, 위에서 내려다보면 동그라미예요.\n\n쌓기나무도 똑같아요. 내가 어디에 서서 보느냐에 따라 보이는 모양이 달라요. 그래서 "어디에서 봤는지"를 꼭 함께 말해요.',
      fig: board([[{ p: isoPart(A, 30), label: '쌓은 모양' }], threeViews(A, 24)], '쌓기나무 7개로 쌓은 모양(맨 뒤 줄 2, 2, 1개, 맨 앞 줄 1, 0, 1개)과 앞, 오른쪽 옆, 위에서 본 모양'),
      check: {
        type: 'ox',
        q: '쌓기나무로 쌓은 모양을 앞에서 본 모양과 옆에서 본 모양은 언제나 같아요.',
        answer: false,
        explain: '보는 방향이 다르면 모양이 달라질 수 있어요. 예를 들어 맨 뒤 줄에 2, 2, 1개, 맨 앞 줄에 1, 0, 1개를 쌓은 모양은 앞에서 보면 세로줄 3개, 오른쪽 옆에서 보면 가로줄 2개가 보여요.',
      },
    },
    {
      title: '쌓기나무의 개수 구하기',
      body: '쌓은 모양을 한 방향에서 본 그림에는 **보이지 않는 쌓기나무**가 있을 수 있어요.\n\n그림에서 맨 뒤 줄 왼쪽은 3층까지 쌓여 있어요. 3층의 쌓기나무가 떠 있을 수는 없으니, 그 아래 1층과 2층에도 쌓기나무가 있어야 해요. 그중 1층의 쌓기나무는 앞과 옆의 쌓기나무에 가려 전혀 보이지 않아요.\n\n그래서 **위에서 본 모양**을 함께 보면 개수를 정확히 셀 수 있어요. 위에서 본 모양으로 바닥 자리를 알고, 자리마다 몇 층까지 쌓였는지 세어 더해요.\n\n그림: 뒤 줄 3개 + 1개, 앞 줄 2개 + 1개 → 모두 7개',
      easy: '책상 위에 상자를 쌓았는데 앞에서 사진을 찍으면 뒤에 숨은 상자는 안 찍혀요. 위에서 찍은 사진(위에서 본 모양)도 함께 보면 "어느 자리에 상자가 있는지" 알 수 있어요.\n\n그다음 자리마다 몇 층인지 세면 돼요. 맨 위 상자가 3층에 있으면 그 아래에도 2개가 더 있는 거예요.',
      fig: board([[{ p: isoPart(G1, 32), label: '쌓은 모양' }, { p: topPart(G1, 30, false), label: '위에서 본 모양' }]], '쌓기나무로 쌓은 모양(맨 뒤 줄 왼쪽 3층, 오른쪽 1층, 맨 앞 줄 왼쪽 2층, 오른쪽 1층)과 위에서 본 모양(2칸씩 2줄)'),
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '쌓은 모양과 위에서 본 모양을 보고, 쌓기나무는 모두 몇 개인지 구해 보세요.',
        fig: board([[{ p: isoPart(G1, 32), label: '쌓은 모양' }, { p: topPart(G1, 30, false), label: '위에서 본 모양' }]], '쌓기나무로 쌓은 모양과 위에서 본 모양(2칸씩 2줄)'),
        answer: '7',
        wrong: [
          { a: '6', why: '보이는 쌓기나무만 셌어요. 맨 뒤 줄 왼쪽은 3층이라 1층에 가려진 쌓기나무가 하나 더 있어요.' },
          { a: '4', why: '위에서 본 칸의 수만 셌어요. 자리마다 몇 층까지 쌓였는지 세어 더해요.' },
        ],
        explain: '자리마다 세면 맨 뒤 줄 왼쪽 3개, 오른쪽 1개, 맨 앞 줄 왼쪽 2개, 오른쪽 1개예요. $3+1+2+1=7$(개)예요.',
      },
    },
    {
      title: '위, 앞, 옆에서 본 모양 그리기',
      body: '쌓은 모양을 보고 세 방향에서 본 모양을 그리는 방법이에요.\n\n- **위**에서 본 모양: 바닥에 쌓기나무가 놓인 자리를 그려요(1층의 모양과 같아요).\n- **앞**에서 본 모양: 왼쪽 줄부터 차례로, 각 줄에서 **가장 높은 층**까지 그려요.\n- **옆**에서 본 모양: 오른쪽 옆에서 볼 때 앞 줄부터 뒤 줄까지(그림의 왼쪽부터) 각 줄에서 **가장 높은 층**까지 그려요.\n\n> 💡 앞에서 볼 때는 뒤에 있는 쌓기나무가 앞의 쌓기나무에 가려도, 더 높으면 그 위로 보여요. 그래서 각 줄의 쌓기나무 수를 더하는 것이 아니라 **가장 높은 층**만 생각해요.',
      easy: '앞에서 보는 모양은 "그림자"를 생각하면 쉬워요. 뒤에서 빛을 비추면 앞의 벽에 생기는 그림자는 각 줄에서 가장 높이 쌓인 만큼 생겨요.\n\n뒤 줄이 3층이고 앞 줄이 1층이면, 그림자는 3층 높이예요.',
      fig: board([[{ p: topPart(A, 30, true), label: '위에서 본 모양(쌓은 수)' }, { p: viewPart(frontOf(A), 30), label: '앞에서 본 모양' }]], '위에서 본 모양의 칸에 쌓은 수 맨 뒤 줄 2, 2, 1, 맨 앞 줄 1, 빈칸, 1을 쓴 것과 앞에서 본 모양(왼쪽부터 2층, 2층, 1층)'),
      check: {
        type: 'choice',
        q: '앞에서 본 모양을 그릴 때, 각 줄의 높이는 어떻게 정할까요?',
        choices: ['그 줄에서 가장 높은 층까지', '그 줄의 쌓기나무 수를 모두 더한 만큼', '맨 앞에 있는 쌓기나무의 높이만큼'],
        answer: 0,
        why: ['', '앞에서 보면 같은 줄의 쌓기나무는 겹쳐 보여요. 더하지 않고 가장 높은 층만 보여요.', '뒤에 있는 쌓기나무가 더 높으면 앞의 쌓기나무 위로 보여요. 가장 높은 층까지 그려요.'],
        explain: '앞에서 보면 같은 줄의 쌓기나무는 겹쳐 보이므로, 그 줄에서 가장 높은 층까지 보여요.',
      },
    },
    {
      title: '위에서 본 모양에 수를 써서 나타내기',
      body: '위에서 본 모양의 각 칸에 **그 자리에 쌓은 쌓기나무의 수**를 쓰면 쌓은 모양을 정확히 나타낼 수 있어요.\n\n- 쌓기나무의 개수 = 칸에 쓴 수를 모두 더한 것\n- 앞에서 본 모양 = 왼쪽부터 각 세로줄에서 가장 큰 수\n- 옆에서 본 모양 = 앞 줄부터 각 가로줄에서 가장 큰 수\n\n그림처럼 맨 뒤 줄에 2, 2, 1, 맨 앞 줄에 1, 1을 쓴 모양이라면 쌓기나무는 $2+2+1+1+1=7$(개)예요.\n\n> 💡 이 방법은 숨은 쌓기나무까지 모두 알 수 있어서 가장 정확해요.',
      easy: '아파트 단지 지도를 생각해 보세요. 지도에는 건물이 있는 자리가 보이고, 그 위에 "5층", "3층"처럼 층수를 적어 두면 건물 모양을 다 알 수 있지요.\n\n위에서 본 모양에 수를 쓰는 것도 똑같아요.',
      fig: board([[{ p: topPart(A, 34, true), label: '위에서 본 모양' }]], '위에서 본 모양의 칸에 쌓은 수: 맨 뒤 줄 2, 2, 1, 맨 앞 줄 1, 빈칸, 1'),
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '위에서 본 모양의 각 칸에 쌓은 쌓기나무의 수를 썼어요. 쌓기나무는 모두 몇 개일까요?',
        fig: board([[{ p: topPart([[3, 1], [2, 2]], 34, true), label: '위에서 본 모양' }]], '위에서 본 모양의 칸에 쓴 수: 맨 뒤 줄 3, 1, 맨 앞 줄 2, 2'),
        answer: '8',
        wrong: [{ a: '4', why: '칸의 수만 셌어요. 칸마다 쓰인 수만큼 쌓여 있으니 수를 모두 더해요.' }],
        explain: '칸에 쓴 수를 모두 더해요. $3+1+2+2=8$(개)예요.',
      },
    },
    {
      title: '층별로 나타낸 모양',
      body: '쌓은 모양을 **1층, 2층, 3층 …으로 나누어** 층마다 위에서 본 모양을 그리는 방법도 있어요.\n\n- 1층의 모양은 위에서 본 모양과 같아요.\n- 2층의 쌓기나무는 반드시 1층의 쌓기나무 **위에만** 놓여요. 3층도 마찬가지로 2층 위에만 있어요.\n- 쌓기나무의 개수 = 각 층의 쌓기나무 수를 모두 더한 것\n\n그림은 1층에 6개, 2층에 3개, 3층에 1개를 놓은 모양이에요. 모두 $6+3+1=10$(개)예요.',
      easy: '케이크를 층층이 쌓는다고 생각해 보세요. 1층 위에 2층을 올리고, 2층 위에 3층을 올려요. 아래층이 없는 곳에 위층만 떠 있을 수는 없지요.\n\n층마다 몇 개인지 세어서 더하면 전체 개수가 나와요.',
      fig: board([[{ p: layerPart(E, 1, 26), label: '1층' }, { p: layerPart(E, 2, 26), label: '2층' }, { p: layerPart(E, 3, 26), label: '3층' }]], '층별로 나타낸 모양: 1층 6칸, 2층 3칸, 3층 1칸을 칠한 3칸×3칸 바닥'),
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '쌓기나무로 쌓은 모양을 층별로 나타냈어요. 1층에 3개, 2층에 2개, 3층에 1개가 있다면 쌓기나무는 모두 몇 개일까요?',
        answer: '6',
        wrong: [{ a: '3', why: '1층만 셌어요. 2층과 3층의 쌓기나무도 더해요.' }],
        explain: '층마다의 개수를 더해요. $3+2+1=6$(개)예요.',
      },
    },
    {
      title: '조건에 맞게 모양 만들기',
      body: '쌓기나무를 **면과 면이 꼭 맞닿게** 이어 붙여 여러 가지 모양을 만들 수 있어요. 이때 돌리거나 뒤집어서 같아지는 모양은 **같은 모양**으로 봐요.\n\n- 쌓기나무 2개로 만들 수 있는 모양: 1가지\n- 쌓기나무 3개로 만들 수 있는 모양: 2가지(일자 모양, ㄱ자 모양)\n\n주어진 조건(앞·옆에서 본 모양, 위에서 본 모양, 개수)에 맞게 쌓을 때는 위에서 본 모양의 칸마다 쌓을 수 있는 수를 따져요.\n\n- 각 칸의 수는 그 세로줄의 앞에서 본 높이, 그 가로줄의 옆에서 본 높이를 넘을 수 없어요.\n- 앞·옆에서 본 높이가 실제로 나타나도록 어딘가에는 그 높이만큼 쌓아야 해요.',
      easy: '쌓기나무 3개로 모양을 만들어 보면, 한 줄로 길게 놓는 모양과 ㄱ자로 꺾인 모양 두 가지밖에 없어요. 세워서 쌓은 모양도 눕혀 보면 둘 중 하나와 같아요.\n\n조건이 있는 문제는 "이 칸에는 몇 개까지 쌓을 수 있지?"를 칸마다 따져 보면 풀려요.',
      fig: board([[{ p: isoPart([[1, 1, 1]], 30), label: '일자 모양' }, { p: isoPart([[1, 0], [1, 1]], 30), label: 'ㄱ자 모양' }]], '쌓기나무 3개로 만든 일자 모양과 ㄱ자 모양'),
      check: {
        type: 'choice',
        q: '쌓기나무 3개를 면과 면이 맞닿게 붙여서 만들 수 있는 서로 다른 모양은 몇 가지일까요? (돌리거나 뒤집어서 같은 모양은 한 가지로 세요.)',
        choices: ['2가지', '3가지', '1가지'],
        answer: 0,
        why: ['', '세워서 쌓은 일자 모양은 눕히면 옆으로 놓은 일자 모양과 같아요. 같은 모양으로 세어요.', 'ㄱ자 모양도 만들 수 있어요. 일자 모양과 ㄱ자 모양, 두 가지예요.'],
        explain: '일자 모양과 ㄱ자 모양 두 가지예요. 세우거나 돌린 모양은 둘 중 하나와 같아요.',
      },
    },
  ],

  examples: [
    {
      q: '위에서 본 모양의 칸에 쌓은 쌓기나무의 수를 썼어요. 쌓기나무의 개수와, 앞과 오른쪽 옆에서 본 모양의 각 줄의 높이를 구하세요.',
      fig: board([[{ p: topPart([[2, 1, 3], [1, 2, 1]], 34, true), label: '위에서 본 모양' }]], '위에서 본 모양의 칸에 쓴 수: 맨 뒤 줄 2, 1, 3, 맨 앞 줄 1, 2, 1'),
      steps: [
        '개수: 칸의 수를 모두 더해요. $2+1+3+1+2+1=10$(개)',
        '앞에서 본 모양: 왼쪽 세로줄부터 가장 큰 수를 골라요. 왼쪽 줄 2와 1 중 2, 가운데 줄 1과 2 중 2, 오른쪽 줄 3과 1 중 3 → 왼쪽부터 2층, 2층, 3층',
        '오른쪽 옆에서 본 모양: 앞 줄부터 가로줄의 가장 큰 수를 골라요. 맨 앞 줄(1, 2, 1)에서 2, 맨 뒤 줄(2, 1, 3)에서 3 → 왼쪽부터 2층, 3층',
      ],
      answer: '10개, 앞: 2층·2층·3층, 오른쪽 옆: 2층·3층',
    },
  ],

  terms: [
    { term: '쌓기나무', def: '크기가 같은 정육면체 모양의 나무 조각이에요. 면과 면을 맞대어 쌓아 여러 모양을 만들어요.' },
    { term: '위에서 본 모양', def: '쌓은 모양을 위에서 내려다본 모양이에요. 바닥에 쌓기나무가 놓인 자리(1층의 모양)와 같아요.' },
    { term: '앞에서 본 모양', def: '쌓은 모양을 앞에서 본 모양이에요. 왼쪽 줄부터 각 줄에서 가장 높은 층까지 보여요.' },
    { term: '옆에서 본 모양', def: '쌓은 모양을 오른쪽 옆에서 본 모양이에요. 앞 줄부터 뒤 줄까지 각 줄에서 가장 높은 층까지 보여요.' },
    { term: '층별로 나타낸 모양', def: '쌓은 모양을 1층, 2층, 3층 …으로 나누어 층마다 위에서 본 모양을 그린 것이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', fixed: true, concept: 0,
      q: '쌓은 모양을 **앞**에서 본 모양은 가, 나, 다 가운데 어느 것일까요?',
      fig: board([
        [{ p: isoPart(A, 30), label: '쌓은 모양' }],
        [{ p: viewPart(sideOf(A), 24), label: '가' }, { p: viewPart(frontOf(A), 24), label: '나' }, { p: viewPart(frontOf(A).slice().reverse(), 24), label: '다' }],
      ], '쌓기나무 7개로 쌓은 모양(맨 뒤 줄 2, 2, 1개, 맨 앞 줄 1, 0, 1개)과 보기 가: 왼쪽부터 1층, 2층 / 나: 2층, 2층, 1층 / 다: 1층, 2층, 2층'),
      choices: ['가', '나', '다'],
      answer: 1,
      why: ['가는 오른쪽 옆에서 본 모양이에요. 앞에서 보면 세로줄이 3개 보여요.', '', '다는 왼쪽과 오른쪽이 바뀌었어요(뒤에서 본 모양). 앞에서 볼 때 왼쪽 줄부터 2층, 2층, 1층이에요.'],
      explain: '앞에서 보면 왼쪽 줄부터 각 줄에서 가장 높은 층이 보여요. 왼쪽 2층, 가운데 2층, 오른쪽 1층이므로 나예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '위에서 본 모양의 각 칸에 쌓은 쌓기나무의 수를 썼어요. 쌓기나무는 모두 몇 개일까요?',
      fig: board([[{ p: topPart([[1, 3, 2], [2, 1, 1]], 34, true), label: '위에서 본 모양' }]], '위에서 본 모양의 칸에 쓴 수: 맨 뒤 줄 1, 3, 2, 맨 앞 줄 2, 1, 1'),
      answer: '10',
      wrong: [{ a: '6', why: '칸의 수만 셌어요. 칸에 쓰인 수만큼 쌓여 있으니 수를 모두 더해요.' }],
      explain: '칸에 쓴 수를 모두 더해요. $1+3+2+2+1+1=10$(개)예요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: '쌓기나무로 쌓은 모양을 한 방향에서 본 그림만 있으면 쌓기나무의 개수를 언제나 정확히 알 수 있어요.',
      answer: false,
      explain: '한 방향에서 본 그림에는 뒤나 아래에 가려 보이지 않는 쌓기나무가 있을 수 있어요. 위에서 본 모양 등을 함께 보아야 정확히 알 수 있어요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '쌓기나무로 쌓은 모양을 층별로 나타냈어요. 쌓기나무는 모두 몇 개일까요?',
      fig: board([[{ p: layerPart([[2, 3, 1], [1, 2, 0]], 1, 28), label: '1층' }, { p: layerPart([[2, 3, 1], [1, 2, 0]], 2, 28), label: '2층' }, { p: layerPart([[2, 3, 1], [1, 2, 0]], 3, 28), label: '3층' }]],
        '층별로 나타낸 모양: 1층은 맨 뒤 줄 3칸과 맨 앞 줄 왼쪽 2칸, 2층은 맨 뒤 줄 왼쪽 2칸과 맨 앞 줄 가운데 1칸, 3층은 맨 뒤 줄 가운데 1칸'),
      answer: '9',
      wrong: [{ a: '5', why: '1층만 셌어요. 2층과 3층의 쌓기나무도 더해요.' }],
      explain: '1층 5개, 2층 3개, 3층 1개이므로 $5+3+1=9$(개)예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', fixed: true, concept: 0,
      q: '쌓은 모양을 **위**에서 본 모양은 가, 나, 다, 라 가운데 어느 것일까요?',
      fig: board([
        [{ p: isoPart(C, 30), label: '쌓은 모양' }],
        [{ p: topPart([[1, 1, 1], [1, 1, 0]], 20, false), label: '가' }, { p: topPart([[0, 1, 1], [1, 1, 1]], 20, false), label: '나' }, { p: topPart([[1, 1, 0], [1, 1, 1]], 20, false), label: '다' }, { p: topPart([[1, 1, 1], [1, 1, 1]], 20, false), label: '라' }],
      ], '쌓기나무로 쌓은 모양(맨 뒤 줄 1, 2, 0개, 맨 앞 줄 2, 1, 1개)과 위에서 본 모양의 보기 가, 나, 다, 라'),
      choices: ['가', '나', '다', '라'],
      answer: 2,
      why: [
        '앞 줄과 뒤 줄이 바뀌었어요. 맨 앞 줄에는 3자리, 맨 뒤 줄에는 왼쪽 2자리에 쌓기나무가 있어요.',
        '왼쪽과 오른쪽이 바뀌었어요. 맨 뒤 줄은 왼쪽 2자리에 쌓기나무가 있어요.',
        '',
        '맨 뒤 줄 오른쪽 자리에는 쌓기나무가 없어요.',
      ],
      explain: '위에서 보면 바닥에 쌓기나무가 놓인 자리가 보여요. 맨 뒤 줄은 왼쪽 2자리, 맨 앞 줄은 3자리 모두이므로 다예요.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 4,
      q: '층별로 나타낸 모양에서 2층에 쌓기나무가 있는 자리에는 반드시 1층에도 쌓기나무가 있어요.',
      answer: true,
      explain: '2층의 쌓기나무는 1층의 쌓기나무 위에 놓여요. 아래가 비어 있으면 떠 있게 되니 쌓을 수 없어요.',
    },
    {
      id: 'p7', level: 2, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '위에서 본 모양의 각 칸에 쌓은 쌓기나무의 수를 썼어요. 이 모양을 **오른쪽 옆**에서 본 모양은 작은 정사각형 몇 개로 이루어져 있을까요?',
      fig: board([[{ p: topPart([[3, 1, 2], [1, 2, 1]], 34, true), label: '위에서 본 모양' }]], '위에서 본 모양의 칸에 쓴 수: 맨 뒤 줄 3, 1, 2, 맨 앞 줄 1, 2, 1'),
      answer: '5',
      hint: '오른쪽 옆에서 보면 가로줄(앞 줄, 뒤 줄)마다 가장 높은 층이 보여요.',
      wrong: [
        { a: '10', why: '쌓기나무의 개수를 모두 셌어요. 옆에서 보면 같은 가로줄의 쌓기나무는 겹쳐 보여요.' },
        { a: '7', why: '앞에서 본 모양(왼쪽부터 3층, 2층, 2층)을 구했어요. 오른쪽 옆에서는 앞 줄과 뒤 줄 두 줄이 보여요.' },
      ],
      explain: '오른쪽 옆에서 보면 앞 줄(1, 2, 1)에서 가장 높은 2층, 뒤 줄(3, 1, 2)에서 가장 높은 3층이 보여요. 정사각형은 $2+3=5$(개)예요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '쌓은 모양과 위에서 본 모양을 보고, 쌓기나무는 모두 몇 개인지 구해 보세요.',
      fig: board([[{ p: isoPart([[1, 3, 2], [1, 2, 1]], 30), label: '쌓은 모양' }, { p: topPart([[1, 3, 2], [1, 2, 1]], 28, false), label: '위에서 본 모양' }]],
        '쌓기나무로 쌓은 모양(맨 뒤 줄 왼쪽부터 1, 3, 2층, 맨 앞 줄 1, 2, 1층)과 위에서 본 모양(3칸씩 2줄)'),
      answer: '10',
      hint: '위에서 본 모양으로 자리를 확인하고, 자리마다 몇 층인지 세어요. 가려진 쌓기나무도 생각해요.',
      wrong: [
        { a: '6', why: '위에서 본 칸의 수만 셌어요. 자리마다 몇 층까지 쌓였는지 세어 더해요.' },
        { a: '8', why: '보이는 쌓기나무만 셌어요. 맨 뒤 줄 가운데는 3층이므로 그 아래 가려진 2개도 세어요.' },
      ],
      explain: '맨 뒤 줄은 왼쪽부터 1층, 3층, 2층, 맨 앞 줄은 1층, 2층, 1층이에요. $1+3+2+1+2+1=10$(개)예요. 맨 뒤 줄 가운데의 1층과 2층 쌓기나무 2개는 앞의 쌓기나무에 가려 보이지 않지만, 3층이 있으니 그 아래도 채워져 있어요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '가지', concept: 5,
      q: '쌓기나무 4개를 면과 면이 맞닿게 붙여 모양을 만들었어요. 위에서 본 모양이 작은 정사각형 4개로 이루어진 큰 정사각형이 되는 모양은 몇 가지일까요?',
      answer: '1',
      hint: '위에서 본 모양이 4칸이면 바닥에 몇 개가 놓여야 할까요?',
      wrong: [{ a: '2', why: '위에서 본 모양이 4칸이면 4개 모두 바닥(1층)에 놓아야 해요. 그런 모양은 한 가지뿐이에요.' }],
      explain: '위에서 본 모양이 4칸이려면 바닥 4자리에 하나씩, 4개가 모두 1층에 놓여야 해요. 그래서 2개씩 2줄로 놓은 모양 한 가지뿐이에요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '쌓기나무로 쌓은 모양을 위, 앞, 오른쪽 옆에서 본 모양이에요. 쌓기나무는 모두 몇 개일까요?',
      fig: board([[{ p: topPart([[1, 1], [1, 1]], 28, false), label: '위' }, { p: viewPart([2, 1], 28), label: '앞' }, { p: viewPart([1, 2], 28), label: '오른쪽 옆' }]],
        '위에서 본 모양 2칸씩 2줄, 앞에서 본 모양 왼쪽부터 2층, 1층, 오른쪽 옆에서 본 모양 왼쪽(앞 줄)부터 1층, 2층'),
      answer: '5',
      hint: '위에서 본 모양의 칸마다 몇 개까지 쌓을 수 있는지 앞과 옆에서 본 모양으로 따져 보세요.',
      wrong: [
        { a: '4', why: '위에서 본 칸의 수만 셌어요. 2층이 있는 자리를 찾아 더해요.' },
        { a: '6', why: '앞과 옆에서 본 정사각형 수를 더했어요. 칸마다 쌓은 수를 구해서 더해요.' },
      ],
      explain: '옆에서 본 모양에서 앞 줄은 1층이므로 앞 줄 두 칸은 1개씩이에요. 앞에서 본 모양에서 오른쪽 줄은 1층이므로 뒤 줄 오른쪽도 1개예요. 2층이 보이려면 뒤 줄 왼쪽이 2개여야 해요. 모두 $1+1+1+2=5$(개)예요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 0,
      q: '오른쪽 그림(이 모양)은 쌓은 모양을 어느 방향에서 본 것일까요?',
      fig: board([[{ p: isoPart(A, 30), label: '쌓은 모양' }, { p: viewPart(sideOf(A), 26), label: '이 모양' }]], '쌓기나무 7개로 쌓은 모양(맨 뒤 줄 2, 2, 1개, 맨 앞 줄 1, 0, 1개)과, 왼쪽부터 1층, 2층인 모양'),
      choices: ['오른쪽 옆', '앞', '위'],
      answer: 0,
      why: ['', '앞에서 보면 세로줄 3개가 2층, 2층, 1층으로 보여요.', '위에서 보면 바닥 자리 5칸이 보여요. 층의 높이는 보이지 않아요.'],
      explain: '오른쪽 옆에서 보면 앞 줄(가장 높은 층 1층)과 뒤 줄(가장 높은 층 2층) 두 줄이 보여요. 그래서 왼쪽부터 1층, 2층인 모양이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '위, 앞, 오른쪽 옆에서 본 모양이 다음과 같도록 쌓기나무를 쌓으려고 해요. 쌓기나무가 **가장 적게** 필요할 때는 몇 개일까요?',
      fig: board([[{ p: topPart([[1, 1], [1, 1]], 28, false), label: '위' }, { p: viewPart([2, 2], 28), label: '앞' }, { p: viewPart([2, 2], 28), label: '오른쪽 옆' }]],
        '위에서 본 모양 2칸씩 2줄, 앞에서 본 모양 2층, 2층, 오른쪽 옆에서 본 모양 2층, 2층'),
      answer: '6',
      hint: '2층짜리 자리 하나가 세로줄 하나와 가로줄 하나를 함께 채울 수 있어요.',
      wrong: [
        { a: '8', why: '가장 많을 때의 개수예요. 2층짜리 자리를 줄일 수 있는지 생각해요.' },
        { a: '5', why: '2층짜리 자리가 하나뿐이면 세로줄 하나와 가로줄 하나만 2층으로 보여요. 두 자리가 필요해요.' },
      ],
      explain: '앞에서 두 세로줄이, 옆에서 두 가로줄이 모두 2층으로 보여야 해요. 맨 뒤 줄 왼쪽과 맨 앞 줄 오른쪽(대각선)에 2개씩 쌓으면 두 세로줄과 두 가로줄이 모두 2층이 돼요. 나머지 두 자리는 1개씩이면 되므로 $2+2+1+1=6$(개)예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '위에서 본 모양의 칸에 쌓은 쌓기나무의 수를 썼어요. 쌓기나무를 더 쌓아서 가장 작은 정육면체 모양을 만들려면 쌓기나무가 적어도 몇 개 더 필요할까요?',
      fig: board([[{ p: topPart([[1, 3], [2, 1]], 34, true), label: '위에서 본 모양' }]], '위에서 본 모양의 칸에 쓴 수: 맨 뒤 줄 1, 3, 맨 앞 줄 2, 1'),
      answer: '20',
      hint: '가장 높은 곳이 3층이에요. 정육면체의 한 모서리에는 쌓기나무가 몇 개 놓여야 할까요?',
      wrong: [
        { a: '1', why: '바닥이 2칸×2칸이라 $2 \\times 2 \\times 2=8$(개)짜리 정육면체를 생각했어요. 이미 3층까지 쌓여 있어서 한 모서리에 3개가 필요해요.' },
        { a: '27', why: '정육면체 전체의 개수예요. 이미 쌓은 7개를 빼요.' },
      ],
      explain: '가장 높은 곳이 3층이므로 가장 작은 정육면체는 가로, 세로, 높이에 쌓기나무가 3개씩인 $3 \\times 3 \\times 3=27$(개)짜리예요. 지금 $1+3+2+1=7$(개)가 있으므로 $27-7=20$(개)가 더 필요해요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '위, 앞, 오른쪽 옆에서 본 모양이 다음과 같도록 쌓기나무를 쌓으려고 해요. 쌓기나무를 **가장 많이** 쓸 때는 몇 개일까요?',
      fig: board([[{ p: topPart([[1, 1, 1], [1, 1, 1]], 26, false), label: '위' }, { p: viewPart([3, 1, 2], 26), label: '앞' }, { p: viewPart([2, 3], 26), label: '오른쪽 옆' }]],
        '위에서 본 모양 3칸씩 2줄, 앞에서 본 모양 왼쪽부터 3층, 1층, 2층, 오른쪽 옆에서 본 모양 왼쪽(앞 줄)부터 2층, 3층'),
      answer: '11',
      hint: '각 칸에는 그 세로줄의 앞 높이와 그 가로줄의 옆 높이 가운데 작은 수만큼까지 쌓을 수 있어요.',
      wrong: [
        { a: '9', why: '가장 적게 쓸 때의 개수예요. 칸마다 쌓을 수 있는 가장 큰 수를 넣어요.' },
        { a: '12', why: '앞 줄 왼쪽 칸에 3개를 넣었어요. 옆에서 본 앞 줄은 2층이므로 앞 줄에는 2개까지만 쌓을 수 있어요.' },
      ],
      explain: '옆에서 보면 앞 줄은 2층, 뒤 줄은 3층까지예요. 앞에서 보면 세로줄은 왼쪽부터 3층, 1층, 2층까지예요.\n\n- 뒤 줄: 3, 1, 2 (각 세로줄의 높이까지)\n- 앞 줄: 2, 1, 2 (2층을 넘을 수 없어요)\n\n모두 $3+1+2+2+1+2=11$(개)예요.',
    },
  ],

  deeper: [
    {
      title: '쌓기나무 4개로는 몇 가지 모양을 만들 수 있을까?',
      body: '쌓기나무 3개로는 일자 모양과 ㄱ자 모양 2가지뿐이지만, 4개가 되면 훨씬 많아져요. 바닥에 납작하게 놓는 모양(일자, 네모, ㄱ자, ㅗ자, 번개 모양)뿐 아니라, 위로 쌓아 올려야만 만들 수 있는 입체 모양도 생겨요.\n\n돌리거나 뒤집어서 같아지는 것을 한 가지로 세면 모두 **8가지**예요. 입체 모양 가운데 두 개는 서로 거울에 비친 모양이라서, 아무리 돌려도 겹쳐지지 않아 다른 모양으로 세요. 실제로 만들어 보며 확인해 보세요.',
    },
    {
      title: '건물 설계도와 중학교 입체도형',
      body: '건물을 지을 때 그리는 설계도에도 위에서 본 그림(평면도)과 앞·옆에서 본 그림(입면도)이 있어요. 이 단원에서 배운 것처럼 여러 방향에서 본 모양을 함께 보아야 건물의 모양을 정확히 알 수 있어요.\n\n중학교 1학년에서는 여러 가지 입체도형(다면체, 회전체)의 성질을 배우고, 입체도형을 여러 방향에서 보거나 잘라 보며 공간 감각을 더 키워요.',
    },
  ],

  faq: [
    {
      q: '옆에서 본 모양은 왼쪽 옆이에요, 오른쪽 옆이에요?',
      a: '보통 **오른쪽 옆**에서 본 모양을 말해요. 오른쪽 옆에 서서 보면 내 왼쪽이 쌓은 모양의 앞, 내 오른쪽이 뒤가 돼요. 그래서 옆에서 본 모양은 왼쪽부터 앞 줄, 뒤 줄 순서로 그려요.',
    },
    {
      q: '그림에 안 보이는 쌓기나무는 어떻게 세요?',
      a: '위에서 본 모양을 함께 보고, 자리마다 몇 층까지 있는지 생각해요. 위층에 쌓기나무가 보이면 그 아래층은 모두 채워져 있어야 해요(떠 있을 수 없으니까요). 위에서 본 모양에 수를 쓰는 방법을 쓰면 가장 정확해요.',
    },
    {
      q: '앞에서 본 모양과 옆에서 본 모양이 같으면 쌓은 모양도 하나로 정해져요?',
      a: '아니요, 그렇지 않을 때가 많아요. 앞과 옆에서 보아 2층, 2층인 모양도 대각선 두 자리만 2층으로 쌓거나 네 자리를 모두 2층으로 쌓을 수 있어요. 그래서 "가장 적게", "가장 많이" 같은 조건을 묻는 문제가 나와요.',
    },
  ],

  mistakes: [
    '앞에서 본 모양을 그릴 때 같은 줄의 쌓기나무 수를 모두 더하는 실수 — 겹쳐 보이므로 가장 높은 층까지만 그려요.',
    '가려서 보이지 않는 쌓기나무를 빼고 세는 실수 — 위층의 쌓기나무 아래는 모두 채워져 있어요.',
    '옆에서 본 모양의 왼쪽과 오른쪽을 바꾸어 그리는 실수 — 오른쪽 옆에서 보면 왼쪽이 앞 줄이에요.',
  ],

  gens: [
    {
      id: 'count-top',
      level: 1,
      title: '위에서 본 모양에 쓴 수로 개수 구하기',
      make: function (R) {
        var nr = R.int(2, 3), nc = R.int(2, 3);
        if (nr === 2 && nc === 2) nc = 3;
        var g = makeGrid(R, nr, nc, 3, R.int(0, 2));
        var all = [];
        g.forEach(function (row) { row.forEach(function (h) { if (h > 0) all.push(h); }); });
        var T = total(g), n = cells(g);
        return {
          type: 'short', check: 'number', unit: '개', concept: 3,
          q: '위에서 본 모양의 각 칸에 그 자리에 쌓은 쌓기나무의 수를 썼어요(' + gridWords(g) + '). 쌓기나무는 모두 몇 개일까요?',
          fig: board([[{ p: isoPart(g, 28), label: '쌓은 모양' }, { p: topPart(g, 32, true), label: '위에서 본 모양' }]], '쌓기나무로 쌓은 모양과 위에서 본 모양의 칸에 쓴 수: ' + gridWords(g)),
          answer: String(T),
          wrong: T === n ? [] : [{ a: String(n), why: '칸의 수만 셌어요. 칸에 쓰인 수만큼 쌓여 있으니 수를 모두 더해요.' }],
          explain: '칸에 쓴 수를 모두 더해요. $' + all.join('+') + '=' + T + '$(개)예요.',
        };
      },
    },
    {
      id: 'which-view',
      level: 2,
      title: '앞이나 옆에서 본 모양 고르기',
      make: function (R) {
        var nr = R.int(2, 3), g = makeGrid(R, nr, 3, 3, R.int(0, 2));
        var askFront = R.bool();
        var correct = askFront ? frontOf(g) : sideOf(g), key = correct.join(',');
        var cands = [];
        function sums(list) { return list.every(function (x) { return x <= 5; }) ? list : null; }
        if (askFront) {
          var colSum = g[0].map(function (_, c) { var s = 0; g.forEach(function (row) { s += row[c]; }); return s; });
          cands.push([sideOf(g), '오른쪽 옆에서 본 모양이에요. 앞에서 보면 세로줄 3개가 보여요.']);
          cands.push([g[nr - 1].slice(), '맨 앞 줄의 쌓기나무만 보았어요. 뒤 줄이 더 높으면 앞 줄 위로 보여요.']);
          cands.push([correct.slice().reverse(), '왼쪽과 오른쪽이 바뀌었어요(뒤에서 본 모양). 앞에서 볼 때의 왼쪽 줄부터 그려요.']);
          cands.push([sums(colSum), '세로줄의 쌓기나무 수를 모두 더했어요. 앞에서 보면 겹쳐 보여서 가장 높은 층까지만 보여요.']);
        } else {
          var rowSum = [];
          for (var r = nr - 1; r >= 0; r--) rowSum.push(sum(g[r]));
          var rightCol = [];
          for (var r2 = nr - 1; r2 >= 0; r2--) rightCol.push(g[r2][2]);
          cands.push([frontOf(g), '앞에서 본 모양이에요. 오른쪽 옆에서 보면 가로줄 ' + nr + '개가 보여요.']);
          cands.push([correct.slice().reverse(), '왼쪽과 오른쪽이 바뀌었어요(왼쪽 옆에서 본 모양). 오른쪽 옆에서 보면 왼쪽이 앞 줄이에요.']);
          cands.push([rightCol, '맨 오른쪽 세로줄만 보았어요. 안쪽 줄이 더 높으면 그 위로 보여요.']);
          cands.push([sums(rowSum), '가로줄의 쌓기나무 수를 모두 더했어요. 옆에서 보면 겹쳐 보여서 가장 높은 층까지만 보여요.']);
        }
        // 그래도 모자랄 때를 위한 후보: 한 줄의 높이만 1 다른 모양
        correct.forEach(function (h, i) {
          var up = correct.slice(); up[i] = h + 1;
          cands.push([up, '높이를 잘못 셌어요. 각 줄에서 가장 높은 층을 다시 확인해 보세요.']);
        });
        var reason = {}, keys = [];
        cands.forEach(function (x) {
          if (!x[0] || Math.max.apply(null, x[0]) === 0) return;
          var k = x[0].join(',');
          if (k === key || k in reason) return;
          reason[k] = x[1]; keys.push(k);
        });
        var pick = R.choices(key, keys);
        var dir = askFront ? '앞' : '오른쪽 옆';
        var views = pick.choices.map(function (k, i) {
          return { p: viewPart(k.split(',').map(Number), 20), label: LAB[i] };
        });
        var expl = askFront
          ? '앞에서 보면 왼쪽 세로줄부터 각 줄에서 가장 큰 수만큼 보여요: ' + correct.join('층, ') + '층.'
          : '오른쪽 옆에서 보면 앞 줄부터 뒤 줄까지 각 가로줄에서 가장 큰 수만큼 보여요: ' + correct.join('층, ') + '층.';
        return {
          type: 'choice', fixed: true, concept: 2,
          q: '위에서 본 모양의 칸에 쌓은 쌓기나무의 수를 썼어요(' + gridWords(g) + '). **' + dir + '**에서 본 모양은 가, 나, 다, 라 가운데 어느 것일까요?',
          fig: board([[{ p: topPart(g, 32, true), label: '위에서 본 모양' }], views],
            '위에서 본 모양의 칸에 쓴 수: ' + gridWords(g) + '. 보기: ' + pick.choices.map(function (k, i) { return LAB[i] + ' 왼쪽부터 ' + k.split(',').join('층, ') + '층'; }).join(' / ')),
          choices: LAB.slice(0, pick.choices.length),
          answer: pick.answer,
          why: pick.choices.map(function (k) { return k === key ? '' : reason[k] || ''; }),
          explain: expl + ' 그래서 ' + LAB[pick.answer] + '예요.',
        };
      },
    },
    {
      id: 'layers',
      level: 2,
      title: '몇 층에 쌓기나무가 몇 개 있는지 구하기',
      make: function (R) {
        var nr = R.int(2, 3), g = makeGrid(R, nr, 3, 3, R.int(0, 2));
        if (maxOf(g) < 2) g[0][1] = 2;
        var k = maxOf(g) >= 3 ? R.pick([2, 3]) : 2;
        var ans = atLeast(g, k), exact = 0;
        g.forEach(function (row) { row.forEach(function (h) { if (h === k) exact++; }); });
        var wrong = [];
        if (exact !== ans) wrong.push({ a: String(exact), why: '수가 ' + k + '인 칸만 셌어요. ' + k + '보다 큰 수가 쓰인 자리에도 ' + k + '층이 있어요.' });
        if (cells(g) !== ans) wrong.push({ a: String(cells(g)), why: '1층의 쌓기나무를 셌어요. ' + k + '층에는 ' + k + ' 이상이 쓰인 칸에만 쌓기나무가 있어요.' });
        return {
          type: 'short', check: 'number', unit: '개', concept: 4,
          q: '위에서 본 모양의 각 칸에 그 자리에 쌓은 쌓기나무의 수를 썼어요(' + gridWords(g) + '). ' + k + '층에 있는 쌓기나무는 몇 개일까요?',
          fig: board([[{ p: isoPart(g, 28), label: '쌓은 모양' }, { p: topPart(g, 32, true), label: '위에서 본 모양' }]], '쌓기나무로 쌓은 모양과 위에서 본 모양의 칸에 쓴 수: ' + gridWords(g)),
          answer: String(ans),
          hint: k + '층에 쌓기나무가 있으려면 그 자리에 몇 개 이상 쌓여 있어야 할까요?',
          wrong: wrong,
          explain: k + '층에 쌓기나무가 있으려면 그 자리에 ' + k + '개 이상 쌓여 있어야 해요. ' + k + ' 이상의 수가 쓰인 칸은 ' + ans + '칸이므로 ' + k + '층에는 ' + ans + '개가 있어요.',
        };
      },
    },
    {
      id: 'make-cube',
      level: 3,
      title: '더 쌓아서 가장 작은 정육면체 만들기',
      make: function (R) {
        var nr = R.int(2, 3), nc = R.int(2, 3), g = makeGrid(R, nr, nc, R.int(2, 4), R.int(0, 2));
        var s = Math.max(nr, nc, maxOf(g)), T = total(g);
        if (s * s * s === T) { g[0][0] = g[0][0] - 1; if (!okGrid(g)) g[0][0] = g[0][0] + 1; T = total(g); }
        s = Math.max(nr, nc, maxOf(g));
        var need = s * s * s - T, flat = Math.max(nr, nc), wrong = [{ a: String(s * s * s), why: '정육면체 전체의 개수예요. 이미 쌓은 ' + T + '개를 빼요.' }];
        if (flat < s && flat * flat * flat > T) wrong.push({ a: String(flat * flat * flat - T), why: '바닥의 크기만 보고 한 모서리를 ' + flat + '개로 생각했어요. 가장 높은 곳이 ' + maxOf(g) + '층이에요.' });
        if (flat > maxOf(g) && Math.pow(maxOf(g), 3) > T) wrong.push({ a: String(Math.pow(maxOf(g), 3) - T), why: '높이만 보고 한 모서리를 ' + maxOf(g) + '개로 생각했어요. 바닥이 앞뒤로 ' + nr + '줄, 좌우로 ' + nc + '줄이에요.' });
        var why = s === maxOf(g) && s > flat ? '가장 높은 곳이 ' + s + '층이므로' : '바닥의 한 방향에 ' + s + '줄이 있으므로';
        return {
          type: 'short', check: 'number', unit: '개', concept: 3,
          q: '위에서 본 모양의 각 칸에 그 자리에 쌓은 쌓기나무의 수를 썼어요(' + gridWords(g) + '). 쌓기나무를 더 쌓아서 가장 작은 정육면체 모양을 만들려면 쌓기나무가 적어도 몇 개 더 필요할까요?',
          fig: board([[{ p: topPart(g, 34, true), label: '위에서 본 모양' }]], '위에서 본 모양의 칸에 쓴 수: ' + gridWords(g)),
          answer: String(need),
          hint: '가로, 세로, 높이 가운데 가장 긴 것에 맞추어 정육면체를 만들어야 해요.',
          wrong: wrong,
          explain: '바닥은 앞뒤로 ' + nr + '줄, 좌우로 ' + nc + '줄이고 가장 높은 곳은 ' + maxOf(g) + '층이에요. ' + why + ' 가장 작은 정육면체는 한 모서리에 쌓기나무가 ' + s + '개씩, 모두 $' + s + ' \\times ' + s + ' \\times ' + s + '=' + (s * s * s) + '$(개)예요.\n\n' +
            '지금 쌓은 쌓기나무는 ' + T + '개이므로 $' + (s * s * s) + '-' + T + '=' + need + '$(개)가 더 필요해요.',
        };
      },
    },
  ],
});
})();

