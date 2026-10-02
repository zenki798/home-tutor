/* 6학년 수학 · 각기둥과 각뿔
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: 각기둥·각뿔 겨냥도와 각기둥 전개도는 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  function r1(v) { return Math.round(v * 10) / 10; }
  function svg(w, h, body, alt) {
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + w + ' ' + h + '">' + body + '</svg>', alt: alt };
  }
  function txt(x, y, s, size) {
    size = size || 14;
    return '<text x="' + r1(x) + '" y="' + r1(y + size * 0.35) + '" font-size="' + size + '" text-anchor="middle" fill="currentColor">' + s + '</text>';
  }
  function seg(a, b, dashed, color) {
    return '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" stroke="' +
      (color ? 'var(--fig-' + color + ')' : 'currentColor') + '" stroke-width="' + (dashed ? 1.5 : 2) + '"' +
      (dashed ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>';
  }
  function face(pts, fill) {
    return '<polygon points="' + pts.map(function (p) { return r1(p[0]) + ',' + r1(p[1]); }).join(' ') +
      '" fill="var(--fig-' + fill + ')" fill-opacity="0.22" stroke="none"/>';
  }
  function poly(pts, fill) {
    return '<polygon points="' + pts.map(function (p) { return r1(p[0]) + ',' + r1(p[1]); }).join(' ') + '" fill="' +
      (fill ? 'var(--fig-' + fill + ')' : 'none') + '"' + (fill ? ' fill-opacity="0.2"' : '') +
      ' stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
  }

  // 밑면(정n각형)을 비스듬히 본 모양. 반환: 꼭짓점 좌표·각 꼭짓점이 가려졌는지·각 밑면 모서리가 뒤쪽인지
  // 돌린 각도는 n마다 골랐다: 두 꼭짓점이 거의 같은 세로줄에 겹쳐 세로 모서리가 포개져 보이지 않게
  var TURN = { 3: 0.35, 4: 0.35, 5: 0.65, 6: 0.2, 7: 0.45, 8: 0.25, 9: 0.35, 10: 0.5 };
  function base(n, cx, cy, A, B) {
    var t0 = Math.PI / 2 + Math.PI / n - (TURN[n] || 0.35), pts = [], ang = [];
    for (var i = 0; i < n; i++) {
      var t = t0 + 2 * Math.PI * i / n;
      ang.push(t);
      pts.push([cx + A * Math.cos(t), cy + B * Math.sin(t)]);
    }
    var xs = pts.map(function (p) { return p[0]; });
    var mn = Math.min.apply(null, xs), mx = Math.max.apply(null, xs);
    var hidden = ang.map(function (t, i) { return Math.sin(t) < -0.01 && xs[i] > mn + 0.5 && xs[i] < mx - 0.5; });
    var back = ang.map(function (t) { return Math.sin(t + Math.PI / n) < -0.01; });
    return { pts: pts, hidden: hidden, back: back };
  }

  // 각기둥 겨냥도. o.shade: 'base'(두 밑면 색칠) | 'side'(옆면 하나 색칠); o.hLabel, o.aLabel: 높이·밑면 모서리 옆 글
  function prism(n, o) {
    o = o || {};
    var W = o.hLabel ? 262 : 240, H = o.aLabel ? 226 : 210, cx = 120, by = 170, h = 115, A = 78, B = 26;
    var bot = base(n, cx, by, A, B), top = base(n, cx, by - h, A, B), out = '';
    if (o.shade === 'base') { out += face(bot.pts, 1) + face(top.pts, 1); }
    if (o.shade === 'side') {
      // 앞쪽에 보이는 옆면 하나
      for (var s = 0; s < n; s++) {
        var j = (s + 1) % n;
        if (!bot.back[s] && !bot.hidden[s] && !bot.hidden[j]) { out += face([bot.pts[s], bot.pts[j], top.pts[j], top.pts[s]], 2); break; }
      }
    }
    for (var i = 0; i < n; i++) {
      var k = (i + 1) % n;
      out += seg(bot.pts[i], bot.pts[k], bot.back[i]);
      out += seg(top.pts[i], top.pts[k], false);
      out += seg(bot.pts[i], top.pts[i], bot.hidden[i]);
    }
    // 글: 높이는 가장 오른쪽 세로 모서리 옆, 밑면 모서리는 앞쪽 모서리 아래
    if (o.hLabel || o.aLabel) {
      var ri = 0, fi = -1;
      bot.pts.forEach(function (p, i2) { if (p[0] > bot.pts[ri][0]) ri = i2; });
      for (var e = 0; e < n; e++) if (!bot.back[e] && (fi < 0 || (bot.pts[e][1] + bot.pts[(e + 1) % n][1]) > (bot.pts[fi][1] + bot.pts[(fi + 1) % n][1]))) fi = e;
      if (o.hLabel) out += txt(bot.pts[ri][0] + 26, by - h / 2, o.hLabel, 14);
      if (o.aLabel && fi >= 0) {
        var p1 = bot.pts[fi], p2 = bot.pts[(fi + 1) % n];
        out += txt((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2 + 16, o.aLabel, 14);
      }
    }
    return svg(W, H, out, o.alt);
  }

  // 각뿔 겨냥도. o.shade: 'base' | 'side'; o.height: 높이(점선)와 직각 표시
  function pyramid(n, o) {
    o = o || {};
    var W = 240, H = 210, cx = 120, by = 170, A = 82, B = 27, apex = [cx, 22];
    var bot = base(n, cx, by, A, B), out = '';
    if (o.shade === 'base') out += face(bot.pts, 1);
    if (o.shade === 'side') {
      for (var s = 0; s < n; s++) {
        var j = (s + 1) % n;
        if (!bot.back[s] && !bot.hidden[s] && !bot.hidden[j]) { out += face([bot.pts[s], bot.pts[j], apex], 2); break; }
      }
    }
    for (var i = 0; i < n; i++) {
      out += seg(bot.pts[i], bot.pts[(i + 1) % n], bot.back[i]);
      out += seg(apex, bot.pts[i], bot.hidden[i]);
    }
    if (o.height) {
      out += seg(apex, [cx, by], true, 3);
      out += '<polyline points="' + (cx + 9) + ',' + by + ' ' + (cx + 9) + ',' + (by - 9) + ' ' + cx + ',' + (by - 9) + '" fill="none" stroke="var(--fig-3)" stroke-width="1.5"/>';
      out += '<circle cx="' + cx + '" cy="' + by + '" r="2.5" fill="var(--fig-3)"/>';
    }
    out += '<circle cx="' + apex[0] + '" cy="' + apex[1] + '" r="3" fill="currentColor"/>';
    return svg(W, H, out, o.alt);
  }

  // 밑면이 정n각형인 각기둥의 전개도: 옆면 직사각형 n개를 가로로 잇고, 둘째 직사각형 위·아래에 밑면
  function net(n, o) {
    o = o || {};
    var s = n <= 4 ? 52 : (n === 5 ? 44 : 38), h = 70, x0 = 18, ext = 0;
    // 밑면이 차지하는 높이 (정n각형의 한 변을 바닥에 놓았을 때)
    var poly1 = [], d = 0, p = [x0 + s, 0];
    for (var i = 0; i < n; i++) { poly1.push(p); p = [p[0] + s * Math.cos(d), p[1] + s * Math.sin(d)]; d -= 2 * Math.PI / n; }
    poly1.forEach(function (q) { if (-q[1] > ext) ext = -q[1]; });
    var y0 = ext + 14, W = x0 * 2 + s * n, H = y0 * 2 + h, out = '';
    var topB = poly1.map(function (q) { return [q[0], q[1] + y0]; });
    var botB = poly1.map(function (q) { return [q[0], y0 + h - (q[1])]; });
    // 색칠(선 없음) → 선: 잘린 모서리는 실선, 접는 선(옆면끼리·옆면과 밑면이 맞닿은 선)은 점선
    out += face(topB, 1) + face(botB, 1);
    if (o.shadeSide) for (var k0 = 0; k0 < n; k0++) out += face([[x0 + s * k0, y0], [x0 + s * (k0 + 1), y0], [x0 + s * (k0 + 1), y0 + h], [x0 + s * k0, y0 + h]], 2);
    [topB, botB].forEach(function (B) {
      for (var e = 0; e < n; e++) out += seg(B[e], B[(e + 1) % n], e === 0);   // 0번 변은 둘째 옆면에 붙은 접는 선
    });
    for (var k = 0; k < n; k++) {
      if (k === 1) continue;                                                        // 둘째 옆면의 위·아래 변은 밑면과 맞닿은 접는 선(위에서 그림)
      out += seg([x0 + s * k, y0], [x0 + s * (k + 1), y0], false);
      out += seg([x0 + s * k, y0 + h], [x0 + s * (k + 1), y0 + h], false);
    }
    for (var v = 0; v <= n; v++) out += seg([x0 + s * v, y0], [x0 + s * v, y0 + h], v > 0 && v < n);
    if (o.aLabel) out += txt(x0 + s * (n - 0.5), y0 + h + 13, o.aLabel, 13);
    if (o.hLabel) out += txt(x0 + s * n + 26, y0 + h / 2, o.hLabel, 13);
    if (o.hLabel) W += 40;
    return svg(Math.max(W, 200), H, out, o.alt);
  }

  var NUM = ['', '', '', '삼', '사', '오', '육', '칠', '팔', '구', '십', '십일', '십이'];
  function prismName(n) { return NUM[n] + '각기둥'; }
  function pyrName(n) { return NUM[n] + '각뿔'; }

Tutor.registerUnit({
  id: 'math-e6-02',
  course: 'math-e6',
  title: '각기둥과 각뿔',
  summary: '각기둥과 각뿔의 밑면, 옆면 같은 구성 요소와 성질을 알고, 각기둥의 전개도를 그려요.',
  goals: [
    '각기둥과 각뿔을 알고, 밑면과 옆면을 찾을 수 있어요.',
    '각기둥과 각뿔의 이름과 구성 요소(모서리, 꼭짓점, 높이)를 알 수 있어요.',
    '각기둥의 전개도를 이해하고 전개도를 보고 입체도형을 알 수 있어요.',
    '꼭짓점, 면, 모서리의 수 사이의 규칙을 찾을 수 있어요.',
  ],
  standards: ['[6수03-05]', '[6수03-06]'],

  concepts: [
    {
      title: '각기둥',
      body: '위와 아래에 있는 면이 **서로 평행하고 합동인 다각형**으로 이루어진 입체도형을 **각기둥**이라고 해요.\n\n' +
        '- **밑면**: 각기둥에서 서로 평행하고 합동인 두 면이에요. 밑면은 2개예요.\n' +
        '- **옆면**: 두 밑면과 만나는 면이에요. 각기둥의 옆면은 모두 **직사각형**이에요.\n\n' +
        '5학년에서 배운 직육면체도 위아래 두 면이 평행하고 합동이니 각기둥이에요.\n\n' +
        '> 💡 밑면은 "아래에 놓인 면"이라는 뜻이 아니에요. 각기둥을 눕혀 놓아도 서로 평행하고 합동인 두 면이 밑면이에요.',
      easy: '똑같은 모양의 색종이 여러 장을 차곡차곡 쌓아 올린다고 생각해 보세요. 삼각형 색종이를 쌓으면 삼각형 모양 기둥이 생기지요.\n\n' +
        '맨 아래와 맨 위의 색종이가 **밑면**이에요. 두 장은 모양과 크기가 똑같고 나란해요. 쌓인 옆쪽 벽이 **옆면**이고, 모두 직사각형이에요.',
      fig: prism(3, { shade: 'base', alt: '두 밑면을 색칠한 삼각기둥' }),
      check: {
        type: 'ox',
        q: '각기둥에서 두 밑면은 서로 평행하고 합동이에요.',
        answer: true,
        explain: '각기둥의 두 밑면은 서로 평행하고, 모양과 크기가 같은(합동인) 다각형이에요. 옆면은 두 밑면과 만나는 직사각형이에요.',
      },
    },
    {
      title: '각기둥의 이름과 구성 요소',
      body: '각기둥은 **밑면의 모양**에 따라 이름이 정해져요. 밑면이 삼각형이면 **삼각기둥**, 사각형이면 **사각기둥**, 오각형이면 **오각기둥**이에요.\n\n' +
        '- **모서리**: 면과 면이 만나는 선분\n' +
        '- **꼭짓점**: 모서리와 모서리가 만나는 점\n' +
        '- **높이**: 두 밑면 사이의 거리\n\n' +
        '각기둥의 옆면이 직사각형이므로, 두 밑면을 잇는 모서리의 길이가 곧 높이예요.\n\n' +
        '> ⚠️ 이름은 옆면이 아니라 밑면의 모양으로 정해요. 오각기둥의 옆면은 직사각형이지만 밑면은 오각형이에요.',
      easy: '각기둥의 이름 짓기는 "밑면이 무슨 모양인가요?"라는 질문에 답하는 거예요.\n\n밑면이 육각형이면 육각기둥, 팔각형이면 팔각기둥이에요. 높이는 바닥에서 천장까지 잰 거리처럼, 아래 밑면에서 위 밑면까지 똑바로 잰 거리예요.',
      fig: prism(5, { alt: '오각기둥. 보이지 않는 모서리는 점선' }),
      check: {
        type: 'choice',
        q: '밑면이 육각형인 각기둥의 이름은 무엇일까요?',
        choices: ['육각기둥', '육각뿔', '팔각기둥'],
        answer: 0,
        why: ['', '밑면이 2개이고 옆면이 직사각형이면 각뿔이 아니라 각기둥이에요.', '면의 수(6+2=8)로 이름을 지었어요. 이름은 밑면의 모양으로 정해요.'],
        explain: '각기둥은 밑면의 모양으로 이름을 지어요. 밑면이 육각형이니 육각기둥이에요.',
      },
    },
    {
      title: '각기둥의 전개도',
      body: '각기둥의 모서리를 잘라서 평면 위에 펼쳐 놓은 그림을 **각기둥의 전개도**라고 해요.\n\n' +
        '- 밑면 2개와 직사각형 모양의 옆면이 있어요. 삼각기둥이면 옆면이 3개, 오각기둥이면 5개예요.\n' +
        '- 접었을 때 **맞닿는 선분의 길이는 같아요.**\n' +
        '- 옆면을 이어 붙인 큰 직사각형의 가로는 **밑면의 둘레**와 같고, 세로는 각기둥의 **높이**예요.\n\n' +
        '전개도에서 잘린 모서리는 실선, 접는 선은 점선으로 그려요. 어느 모서리를 자르느냐에 따라 전개도는 여러 가지가 나올 수 있어요.',
      easy: '과자 상자를 모서리를 따라 가위로 잘라 쫙 펼쳐 본 적이 있나요? 그렇게 펼친 모양이 전개도예요.\n\n삼각기둥 상자를 펼치면 직사각형 3장이 한 줄로 붙어 있고, 위아래에 삼각형 뚜껑이 하나씩 달려 있어요. 직사각형들이 상자의 옆을 한 바퀴 두르니까, 가로를 다 합치면 삼각형의 둘레가 돼요.',
      fig: net(3, { alt: '삼각기둥의 전개도: 직사각형 3개가 가로로 이어져 있고, 가운데 직사각형 위아래에 삼각형이 하나씩 붙어 있음' }),
      check: {
        type: 'choice',
        q: '삼각기둥의 전개도에는 옆면인 직사각형이 몇 개 있을까요?',
        choices: ['3개', '2개', '5개'],
        answer: 0,
        why: ['', '밑면의 수를 셌어요. 옆면은 밑면의 변의 수만큼 있어요.', '밑면 2개까지 함께 센 면의 수예요. 옆면만 세면 3개예요.'],
        explain: '각기둥의 옆면 수는 밑면의 변의 수와 같아요. 삼각기둥의 밑면은 삼각형이니 옆면인 직사각형은 3개예요.',
      },
    },
    {
      title: '각뿔',
      body: '밑에 놓인 면이 다각형이고 옆으로 둘러싼 면이 모두 **삼각형**인 입체도형을 **각뿔**이라고 해요.\n\n' +
        '- **밑면**: 각뿔에서 밑에 놓인 다각형인 면이에요. 각뿔의 밑면은 **1개**예요.\n' +
        '- **옆면**: 밑면과 만나는 면이에요. 각뿔의 옆면은 모두 **삼각형**이에요.\n\n' +
        '| | 각기둥 | 각뿔 |\n|---|---|---|\n| 밑면의 수 | 2개 | 1개 |\n| 옆면의 모양 | 직사각형 | 삼각형 |',
      easy: '이집트 피라미드를 떠올려 보세요. 바닥은 다각형 한 개이고, 옆의 벽들은 위로 갈수록 좁아져 한 점에서 만나요.\n\n그래서 각뿔의 옆면은 모두 뾰족한 삼각형이고, 밑면은 바닥 한 개뿐이에요.',
      fig: pyramid(4, { shade: 'base', alt: '밑면을 색칠한 사각뿔' }),
      check: {
        type: 'ox',
        q: '각뿔의 밑면은 2개예요.',
        answer: false,
        explain: '각뿔의 밑면은 1개예요. 밑면이 2개인 것은 각기둥이에요. 각뿔의 옆면은 모두 삼각형이에요.',
      },
    },
    {
      title: '각뿔의 이름과 구성 요소',
      body: '각뿔도 **밑면의 모양**에 따라 이름이 정해져요. 밑면이 삼각형이면 **삼각뿔**, 사각형이면 **사각뿔**, 오각형이면 **오각뿔**이에요.\n\n' +
        '- **모서리**: 면과 면이 만나는 선분\n' +
        '- **꼭짓점**: 모서리와 모서리가 만나는 점\n' +
        '- **각뿔의 꼭짓점**: 꼭짓점 가운데에서 **옆면이 모두 만나는 점**\n' +
        '- **높이**: 각뿔의 꼭짓점에서 밑면에 **수직인 선분의 길이**\n\n' +
        '> ⚠️ 각뿔의 높이는 옆 모서리의 길이가 아니에요. 각뿔의 꼭짓점에서 밑면까지 똑바로 내린 선분의 길이예요.',
      easy: '고깔모자를 책상 위에 세워 두고, 맨 위 뾰족한 점에서 책상까지 실에 추를 달아 똑바로 내렸다고 생각해 보세요. 그 실의 길이가 높이예요.\n\n비스듬한 옆 모서리를 따라 잰 길이는 실보다 길어요. 그래서 높이가 아니에요.',
      fig: pyramid(4, { height: true, alt: '사각뿔. 각뿔의 꼭짓점에서 밑면에 수직으로 내린 점선(높이)과 직각 표시' }),
      check: {
        type: 'choice',
        q: '각뿔에서 각뿔의 꼭짓점에서 밑면에 수직인 선분의 길이를 무엇이라고 할까요?',
        choices: ['높이', '모서리', '밑면'],
        answer: 0,
        why: ['', '모서리는 면과 면이 만나는 선분이에요. 옆 모서리는 비스듬해서 밑면에 수직이 아니에요.', '밑면은 길이가 아니라 면이에요.'],
        explain: '각뿔의 꼭짓점에서 밑면에 수직인 선분의 길이를 높이라고 해요.',
      },
    },
    {
      title: '꼭짓점, 면, 모서리의 수',
      body: '밑면의 변의 수를 ■라고 하면 꼭짓점·면·모서리의 수에 규칙이 있어요.\n\n' +
        '| | ■각기둥 | ■각뿔 |\n|---|---|---|\n| 꼭짓점의 수 | ■×2 | ■+1 |\n| 면의 수 | ■+2 | ■+1 |\n| 모서리의 수 | ■×3 | ■×2 |\n\n' +
        '- 각기둥: 밑면이 2개이니 꼭짓점은 한 밑면의 꼭짓점의 2배예요. 면은 옆면 ■개와 밑면 2개, 모서리는 위 밑면 ■개·아래 밑면 ■개·옆 ■개예요.\n' +
        '- 각뿔: 꼭짓점은 밑면의 ■개와 각뿔의 꼭짓점 1개, 면은 옆면 ■개와 밑면 1개, 모서리는 밑면 ■개와 옆 ■개예요.\n\n' +
        '예: 오각기둥은 꼭짓점 10개, 면 7개, 모서리 15개예요. 오각뿔은 꼭짓점 6개, 면 6개, 모서리 10개예요.',
      easy: '외우기보다 세는 방법을 기억해요.\n\n오각기둥: 위에 오각형, 아래에 오각형이 있어요. 꼭짓점은 위 5개 + 아래 5개 = 10개. 모서리는 위 5개 + 아래 5개 + 위아래를 잇는 기둥 5개 = 15개. 면은 옆면 5개 + 뚜껑 2개 = 7개예요.',
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '칠각기둥의 모서리는 몇 개일까요?',
        answer: '21',
        wrong: [
          { a: '14', why: '위아래 밑면의 모서리만 셌어요. 두 밑면을 잇는 옆 모서리 7개도 더해요.' },
          { a: '9', why: '면의 수를 구했어요. 모서리의 수는 7×3이에요.' },
        ],
        explain: '칠각기둥의 모서리는 위 밑면 7개, 아래 밑면 7개, 옆 모서리 7개로 $7\\times3=21$(개)예요.',
      },
    },
  ],

  examples: [
    {
      q: '육각기둥의 꼭짓점, 면, 모서리의 수를 각각 구해 보세요.',
      fig: prism(6, { alt: '육각기둥' }),
      steps: [
        '밑면이 육각형이니 한 밑면의 꼭짓점은 6개예요.',
        '꼭짓점: 밑면이 2개이니 $6\\times2=12$(개)',
        '면: 옆면 6개와 밑면 2개를 더해 $6+2=8$(개)',
        '모서리: 위 밑면 6개, 아래 밑면 6개, 옆 모서리 6개로 $6\\times3=18$(개)',
      ],
      answer: '꼭짓점 12개, 면 8개, 모서리 18개',
    },
    {
      q: '모서리가 16개인 각뿔의 이름을 써 보세요.',
      steps: [
        '각뿔의 모서리는 밑면의 모서리와 옆 모서리로, 밑면의 변의 수의 2배예요.',
        '밑면의 변의 수를 ■라고 하면 ■×2=16이므로 ■=8이에요.',
        '밑면이 팔각형이니 팔각뿔이에요.',
      ],
      answer: '팔각뿔',
    },
  ],

  terms: [
    { term: '각기둥', def: '위와 아래에 있는 면이 서로 평행하고 합동인 다각형으로 이루어진 입체도형이에요. 예: 삼각기둥, 직육면체(사각기둥)' },
    { term: '각뿔', def: '밑면이 다각형이고 옆면이 모두 삼각형인 입체도형이에요. 예: 삼각뿔, 사각뿔' },
    { term: '밑면', def: '각기둥에서는 서로 평행하고 합동인 두 면, 각뿔에서는 밑에 놓인 다각형인 면이에요. 각기둥은 2개, 각뿔은 1개예요.' },
    { term: '옆면', def: '밑면과 만나는 면이에요. 각기둥의 옆면은 직사각형, 각뿔의 옆면은 삼각형이에요.' },
    { term: '모서리', def: '입체도형에서 면과 면이 만나는 선분이에요.' },
    { term: '꼭짓점', def: '입체도형에서 모서리와 모서리가 만나는 점이에요.' },
    { term: '각뿔의 꼭짓점', def: '각뿔의 꼭짓점 가운데에서 옆면이 모두 만나는 점이에요. 맨 위 뾰족한 점이지요.' },
    { term: '높이', def: '각기둥에서는 두 밑면 사이의 거리, 각뿔에서는 각뿔의 꼭짓점에서 밑면에 수직인 선분의 길이예요.' },
    { term: '전개도', def: '입체도형의 모서리를 잘라서 평면 위에 펼쳐 놓은 그림이에요. 잘린 모서리는 실선, 접는 선은 점선으로 그려요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '다음 입체도형의 이름은 무엇일까요?',
      fig: prism(5, { alt: '밑면이 오각형인 각기둥' }),
      choices: ['오각기둥', '오각뿔', '칠각기둥', '사각기둥'],
      answer: 0,
      why: [
        '',
        '두 밑면이 평행하고 옆면이 직사각형이니 각뿔이 아니라 각기둥이에요.',
        '면의 수(5+2=7)로 이름을 지었어요. 이름은 밑면의 모양으로 정해요.',
        '옆면 가운데 앞에 보이는 것만 센 것 같아요. 밑면인 다각형의 변을 세어 보세요.',
      ],
      explain: '두 밑면이 서로 평행하고 합동인 오각형이고 옆면이 직사각형이니 오각기둥이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 4,
      q: '다음 입체도형의 이름은 무엇일까요?',
      fig: pyramid(6, { alt: '밑면이 육각형인 각뿔' }),
      choices: ['육각뿔', '육각기둥', '칠각뿔', '오각뿔'],
      answer: 0,
      why: [
        '',
        '밑면이 1개이고 옆면이 삼각형이니 각기둥이 아니라 각뿔이에요.',
        '면의 수(6+1=7)나 꼭짓점의 수로 이름을 지었어요. 이름은 밑면의 모양으로 정해요.',
        '밑면의 변을 하나 덜 셌어요. 점선으로 그린 뒤쪽 모서리까지 세어 보세요.',
      ],
      explain: '밑면이 육각형 1개이고 옆면이 모두 삼각형이니 육각뿔이에요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 0,
      q: '각기둥의 옆면은 모두 직사각형이에요.',
      answer: true,
      explain: '각기둥의 옆면은 두 밑면과 만나는 면이고, 모두 직사각형이에요. 옆면이 삼각형인 것은 각뿔이에요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '사각뿔의 꼭짓점은 몇 개일까요?',
      answer: '5',
      wrong: [
        { a: '4', why: '밑면의 꼭짓점만 셌어요. 맨 위의 각뿔의 꼭짓점 1개도 더해요.' },
        { a: '8', why: '사각기둥의 꼭짓점 수예요. 각뿔은 밑면이 1개예요.' },
      ],
      explain: '사각뿔의 꼭짓점은 밑면의 꼭짓점 4개와 각뿔의 꼭짓점 1개로 $4+1=5$(개)예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '각뿔의 옆면은 어떤 모양일까요?',
      choices: ['삼각형', '직사각형', '밑면과 같은 다각형', '원'],
      answer: 0,
      why: [
        '',
        '각기둥의 옆면 모양이에요. 각뿔의 옆면은 위로 갈수록 좁아져 한 점에서 만나요.',
        '밑면의 모양과 헷갈렸어요. 옆면은 밑면과 만나는 면으로 모두 삼각형이에요.',
        '각뿔의 면은 모두 다각형이에요. 원은 없어요.',
      ],
      explain: '각뿔의 옆면은 모두 각뿔의 꼭짓점에서 만나는 삼각형이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '육각기둥의 면은 모두 몇 개일까요?',
      answer: '8',
      wrong: [
        { a: '6', why: '옆면만 셌어요. 밑면 2개도 더해요.' },
        { a: '7', why: '밑면을 1개만 셌어요. 각기둥의 밑면은 2개예요.' },
      ],
      explain: '육각기둥은 옆면 6개와 밑면 2개가 있어요. $6+2=8$(개)예요.',
    },
    {
      id: 'p7', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 1,
      q: '다음 사각기둥에서 밑면의 한 모서리는 4 cm, 두 밑면을 잇는 모서리는 9 cm예요. 이 사각기둥의 높이는 몇 cm일까요?',
      fig: prism(4, { hLabel: '9 cm', aLabel: '4 cm', alt: '사각기둥. 세로 모서리 옆에 9 cm, 밑면 모서리 아래에 4 cm' }),
      answer: '9',
      hint: '각기둥의 높이는 두 밑면 사이의 거리예요.',
      wrong: [{ a: '4', why: '밑면의 모서리 길이를 골랐어요. 높이는 두 밑면 사이의 거리예요.' }],
      explain: '각기둥의 높이는 두 밑면 사이의 거리예요. 옆면이 직사각형이므로 두 밑면을 잇는 모서리의 길이 9 cm가 높이예요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 2,
      q: '밑면이 한 변이 4 cm인 정삼각형이고 높이가 7 cm인 삼각기둥의 전개도예요. 옆면 3개를 이어 붙인 큰 직사각형의 가로는 몇 cm일까요?',
      fig: net(3, { aLabel: '4 cm', hLabel: '7 cm', alt: '삼각기둥의 전개도. 옆면 직사각형 한 개의 가로 4 cm, 세로 7 cm' }),
      answer: '12',
      hint: '옆면들의 가로를 모두 더하면 밑면의 둘레가 돼요.',
      wrong: [
        { a: '4', why: '옆면 하나의 가로만 구했어요. 옆면 3개의 가로를 모두 더해요.' },
        { a: '21', why: '높이 7 cm를 3번 더했어요. 가로는 밑면의 변 4 cm가 3개예요.' },
      ],
      explain: '옆면 직사각형의 가로는 밑면의 변과 맞닿아요. 그래서 큰 직사각형의 가로는 밑면의 둘레와 같아요. $4\\times3=12$ (cm)예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      q: '다음 전개도를 접었을 때 만들어지는 입체도형은 무엇일까요?',
      fig: net(5, { alt: '직사각형 5개가 가로로 이어져 있고, 둘째 직사각형 위아래에 오각형이 하나씩 붙은 전개도' }),
      choices: ['오각기둥', '오각뿔', '칠각기둥', '사각기둥'],
      answer: 0,
      why: [
        '',
        '각뿔은 옆면이 삼각형이에요. 이 전개도의 옆면은 직사각형이에요.',
        '면의 수(5+2=7)로 이름을 지었어요. 이름은 밑면의 모양으로 정해요.',
        '직사각형을 다시 세어 보세요. 옆면이 5개이고 밑면도 오각형이에요.',
      ],
      explain: '밑면이 오각형 2개이고 옆면이 직사각형 5개이니 접으면 오각기둥이 돼요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '모서리가 15개인 각기둥이 있어요. 이 각기둥의 꼭짓점은 몇 개일까요?',
      answer: '10',
      hint: '먼저 밑면의 변의 수를 구해요. 각기둥의 모서리 수는 밑면의 변의 수의 3배예요.',
      wrong: [
        { a: '5', why: '밑면의 변의 수까지만 구했어요. 각기둥의 꼭짓점은 그 2배예요.' },
        { a: '7', why: '면의 수를 구했어요. 꼭짓점은 밑면의 변의 수의 2배예요.' },
      ],
      explain: '밑면의 변의 수를 ■라고 하면 ■×3=15이므로 ■=5, 곧 오각기둥이에요. 꼭짓점은 $5\\times2=10$(개)예요.',
    },
    {
      id: 'p11', level: 2, type: 'ox', concept: 5,
      q: '어떤 각뿔이든 면의 수와 꼭짓점의 수는 같아요.',
      answer: true,
      explain: '밑면의 변의 수를 ■라고 하면 각뿔의 면은 옆면 ■개와 밑면 1개로 ■+1개, 꼭짓점은 밑면의 ■개와 각뿔의 꼭짓점 1개로 ■+1개예요. 그래서 언제나 같아요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '각기둥과 각뿔에 대한 설명으로 **옳지 않은** 것은 무엇일까요?',
      choices: ['각뿔의 옆면은 직사각형이에요.', '각기둥의 밑면은 2개예요.', '각뿔의 밑면은 1개예요.', '각기둥의 옆면은 직사각형이에요.'],
      answer: 0,
      why: [
        '',
        '옳은 설명이에요. 각기둥은 서로 평행하고 합동인 밑면이 2개예요.',
        '옳은 설명이에요. 각뿔은 밑면이 1개예요.',
        '옳은 설명이에요. 각기둥의 옆면은 모두 직사각형이에요.',
      ],
      explain: '각뿔의 옆면은 직사각형이 아니라 삼각형이에요. 나머지는 모두 옳은 설명이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'text', concept: 5,
      q: '어떤 각기둥의 꼭짓점, 면, 모서리의 수를 모두 더했더니 32였어요. 이 각기둥의 이름을 써 보세요.',
      answer: ['오각기둥', '5각기둥'],
      hint: '밑면의 변의 수를 ■라고 하고, 꼭짓점·면·모서리의 수를 ■로 나타내어 더해 보세요.',
      wrong: [
        { a: '육각기둥', why: '육각기둥은 꼭짓점 12개, 면 8개, 모서리 18개로 합이 38이에요. 다시 계산해 보세요.' },
        { a: '오각뿔', why: '문제는 각기둥을 묻고 있어요. 이름 끝을 확인해 보세요.' },
      ],
      explain: '밑면의 변의 수를 ■라고 하면 꼭짓점 ■×2, 면 ■+2, 모서리 ■×3이에요. 모두 더하면 ■×6+2=32이므로 ■×6=30, ■=5예요. 그래서 오각기둥이에요. (확인: 10+7+15=32)',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '개', concept: 5,
      q: '면이 9개인 각뿔이 있어요. 이 각뿔의 모서리는 몇 개일까요?',
      answer: '16',
      hint: '각뿔의 면은 옆면과 밑면 1개예요. 먼저 밑면의 변의 수를 구해요.',
      wrong: [
        { a: '18', why: '면의 수 9를 밑면의 변의 수로 생각했어요. 면 9개 가운데 1개는 밑면이니 밑면의 변은 8개예요.' },
        { a: '24', why: '각기둥의 모서리 규칙(×3)을 썼어요. 각뿔의 모서리는 밑면의 변의 수의 2배예요.' },
      ],
      explain: '각뿔의 면은 옆면 ■개와 밑면 1개로 ■+1=9이므로 ■=8, 곧 팔각뿔이에요. 모서리는 $8\\times2=16$(개)예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 5,
      q: '모서리의 수가 육각뿔과 같은 각기둥이 있어요. 이 각기둥의 이름을 써 보세요.',
      answer: ['사각기둥', '4각기둥'],
      hint: '먼저 육각뿔의 모서리 수를 구해요.',
      wrong: [
        { a: '육각기둥', why: '육각기둥의 모서리는 18개로 육각뿔(12개)과 달라요.' },
        { a: '삼각기둥', why: '삼각기둥의 모서리는 9개예요. 12개인 각기둥을 찾아보세요.' },
      ],
      explain: '육각뿔의 모서리는 $6\\times2=12$(개)예요. 각기둥의 모서리는 밑면의 변의 수의 3배이므로 ■×3=12, ■=4예요. 그래서 사각기둥이에요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 1,
      q: '밑면이 한 변이 3 cm인 정육각형이고 높이가 10 cm인 육각기둥이 있어요. 이 육각기둥의 모든 모서리의 길이를 더하면 몇 cm일까요?',
      fig: prism(6, { hLabel: '10 cm', aLabel: '3 cm', alt: '육각기둥. 세로 모서리 옆에 10 cm, 밑면 모서리 아래에 3 cm' }),
      answer: '96',
      hint: '길이가 3 cm인 모서리와 10 cm인 모서리가 각각 몇 개인지 세어 보세요.',
      wrong: [
        { a: '78', why: '밑면 하나의 모서리만 더했어요. 위아래 밑면에 3 cm인 모서리가 6개씩, 모두 12개예요.' },
        { a: '13', why: '모서리 두 개의 길이만 더했어요. 같은 길이의 모서리가 몇 개씩 있는지 세어요.' },
      ],
      explain: '3 cm인 모서리는 위 밑면 6개, 아래 밑면 6개로 12개, 10 cm인 모서리(옆 모서리)는 6개예요. $3\\times12+10\\times6=36+60=96$ (cm)예요.',
    },
  ],

  deeper: [
    {
      title: '꼭짓점 − 모서리 + 면 = 2',
      body: '각기둥과 각뿔의 수를 이렇게 계산해 보세요: (꼭짓점의 수) − (모서리의 수) + (면의 수).\n\n' +
        '- 오각기둥: $10-15+7=2$\n- 오각뿔: $6-10+6=2$\n- 직육면체: $8-12+6=2$\n\n' +
        '어떤 각기둥, 어떤 각뿔이든 답은 언제나 2예요. 이 규칙은 수학자 오일러(1707~1783)가 널리 알려서 **오일러의 다면체 공식**이라고 불러요. 구멍이 뚫리지 않은, 다각형으로 둘러싸인 입체도형이면 모두 성립해요.',
    },
    {
      title: '다음에 만날 입체도형',
      body: '각기둥의 밑면이 다각형 대신 **원**이면 어떻게 될까요? 그것이 **원기둥**이에요. 각뿔의 밑면이 원이면 **원뿔**이에요.\n\n' +
        '2학기에 원기둥, 원뿔, 구를 배울 때 각기둥·각뿔과 무엇이 같고 무엇이 다른지 비교해 보세요. 예를 들어 원기둥의 전개도에서도 옆면을 펼친 직사각형의 가로는 밑면의 둘레와 같아요.',
    },
  ],

  faq: [
    {
      q: '직육면체도 각기둥이에요?',
      a: '네. 직육면체는 마주 보는 두 면이 서로 평행하고 합동인 직사각형이고, 옆면도 직사각형이에요. 그래서 밑면이 사각형인 각기둥, 곧 **사각기둥**이에요.\n\n직육면체는 어느 쪽 두 면을 밑면으로 보아도 사각기둥이 돼요.',
    },
    {
      q: '꼭짓점이랑 각뿔의 꼭짓점은 뭐가 달라요?',
      a: '꼭짓점은 모서리와 모서리가 만나는 모든 점이에요. 그중에서 **옆면이 모두 만나는 한 점**만 따로 각뿔의 꼭짓점이라고 불러요.\n\n사각뿔에는 꼭짓점이 5개 있고, 그 가운데 맨 위의 한 점이 각뿔의 꼭짓점이에요.',
    },
    {
      q: '각기둥을 눕혀 놓으면 밑면이 바뀌어요?',
      a: '아니요. 밑면은 놓인 방향이 아니라 "서로 평행하고 합동인 두 다각형"으로 정해요. 삼각기둥을 눕혀서 직사각형이 바닥에 닿아도 밑면은 여전히 두 삼각형이에요.',
    },
    {
      q: '모서리 수를 외우기 어려워요.',
      a: '외우지 말고 세는 방법을 기억하세요. 각기둥은 "위 밑면 + 아래 밑면 + 기둥"이라서 밑면의 변의 수의 3배, 각뿔은 "밑면 + 옆으로 올라가는 선"이라서 2배예요.',
    },
  ],

  mistakes: [
    '각기둥의 면을 셀 때 밑면 2개를 빠뜨리는 실수 — 육각기둥의 면은 옆면 6개 + 밑면 2개 = 8개예요.',
    '각뿔의 꼭짓점을 셀 때 맨 위의 각뿔의 꼭짓점을 빠뜨리는 실수 — 사각뿔의 꼭짓점은 4 + 1 = 5개예요.',
    '옆면이나 면의 수로 이름을 짓는 실수 — 각기둥·각뿔의 이름은 밑면의 모양으로 정해요.',
  ],

  gens: [
    {
      id: 'prism-count',
      level: 1,
      title: '각기둥의 꼭짓점·면·모서리의 수',
      make: function (R) {
        var n = R.int(3, 10);
        var what = R.pick(['v', 'f', 'e']);
        var name = prismName(n);
        var q, ans, wrong, explain;
        if (what === 'v') {
          q = name + '의 꼭짓점은 몇 개일까요?';
          ans = 2 * n;
          wrong = [{ a: String(n), why: '한 밑면의 꼭짓점만 셌어요. 밑면이 2개이니 2배해요.' },
            { a: String(n + 1), why: '각뿔의 꼭짓점 규칙(■+1)을 썼어요. 각기둥은 밑면이 2개라서 ■×2예요.' }];
          explain = '밑면이 ' + NUM[n] + '각형 2개이니 꼭짓점은 $' + n + '\\times2=' + ans + '$(개)예요.';
        } else if (what === 'f') {
          q = name + '의 면은 모두 몇 개일까요?';
          ans = n + 2;
          wrong = [{ a: String(n), why: '옆면만 셌어요. 밑면 2개도 더해요.' },
            { a: String(n + 1), why: '밑면을 1개만 셌어요. 각기둥의 밑면은 2개예요.' }];
          explain = '옆면 ' + n + '개와 밑면 2개가 있으니 면은 $' + n + '+2=' + ans + '$(개)예요.';
        } else {
          q = name + '의 모서리는 몇 개일까요?';
          ans = 3 * n;
          wrong = [{ a: String(2 * n), why: '위아래 밑면의 모서리만 셌어요. 두 밑면을 잇는 옆 모서리 ' + n + '개도 더해요.' },
            { a: String(n + 2), why: '면의 수를 구했어요. 모서리는 밑면의 변의 수의 3배예요.' }];
          explain = '위 밑면 ' + n + '개, 아래 밑면 ' + n + '개, 옆 모서리 ' + n + '개로 모서리는 $' + n + '\\times3=' + ans + '$(개)예요.';
        }
        return { type: 'short', check: 'number', unit: '개', concept: 5, q: q, answer: String(ans), wrong: wrong, explain: explain };
      },
    },
    {
      id: 'pyramid-count',
      level: 1,
      title: '각뿔의 꼭짓점·면·모서리의 수',
      make: function (R) {
        var n = R.int(3, 10);
        var what = R.pick(['v', 'f', 'e']);
        var name = pyrName(n);
        var q, ans, wrong, explain;
        if (what === 'v') {
          q = name + '의 꼭짓점은 몇 개일까요?';
          ans = n + 1;
          wrong = [{ a: String(n), why: '밑면의 꼭짓점만 셌어요. 각뿔의 꼭짓점 1개도 더해요.' },
            { a: String(2 * n), why: '각기둥의 꼭짓점 규칙(■×2)을 썼어요. 각뿔은 밑면이 1개예요.' }];
          explain = '밑면의 꼭짓점 ' + n + '개와 각뿔의 꼭짓점 1개로 $' + n + '+1=' + ans + '$(개)예요.';
        } else if (what === 'f') {
          q = name + '의 면은 모두 몇 개일까요?';
          ans = n + 1;
          wrong = [{ a: String(n), why: '옆면만 셌어요. 밑면 1개도 더해요.' },
            { a: String(n + 2), why: '밑면을 2개로 셌어요. 각뿔의 밑면은 1개예요.' }];
          explain = '옆면 ' + n + '개와 밑면 1개로 면은 $' + n + '+1=' + ans + '$(개)예요.';
        } else {
          q = name + '의 모서리는 몇 개일까요?';
          ans = 2 * n;
          wrong = [{ a: String(n), why: '밑면의 모서리만 셌어요. 각뿔의 꼭짓점으로 올라가는 옆 모서리 ' + n + '개도 더해요.' },
            { a: String(3 * n), why: '각기둥의 모서리 규칙(■×3)을 썼어요. 각뿔은 밑면이 1개라서 ■×2예요.' }];
          explain = '밑면의 모서리 ' + n + '개와 옆 모서리 ' + n + '개로 모서리는 $' + n + '\\times2=' + ans + '$(개)예요.';
        }
        return { type: 'short', check: 'number', unit: '개', concept: 5, q: q, answer: String(ans), wrong: wrong, explain: explain };
      },
    },
    {
      id: 'name-from-count',
      level: 2,
      title: '구성 요소의 수로 이름 알아내기',
      make: function (R) {
        var isPrism = R.bool();
        var n = R.int(3, 10);
        var what = R.pick(['v', 'f', 'e']);
        var kind = isPrism ? '각기둥' : '각뿔';
        var label = { v: '꼭짓점', f: '면', e: '모서리' }[what];
        var cnt, rule;
        if (isPrism) {
          cnt = { v: 2 * n, f: n + 2, e: 3 * n }[what];
          rule = { v: '■×2', f: '■+2', e: '■×3' }[what];
        } else {
          cnt = { v: n + 1, f: n + 1, e: 2 * n }[what];
          rule = { v: '■+1', f: '■+1', e: '■×2' }[what];
        }
        var nameOf = isPrism ? prismName : pyrName;
        var other = isPrism ? pyrName : prismName;
        var correct = nameOf(n);
        var cands = [
          [other(n), '문제는 ' + kind + R.josa(kind, '을/를') + ' 묻고 있어요. 이름의 끝을 확인해 보세요.'],
          [nameOf(n + 1), label + '의 수를 구하는 규칙을 다시 확인해 보세요. ' + kind + '의 ' + label + '의 수는 ' + rule + R.josa(+rule.slice(-1), '이에요/예요') + '.'],
          [nameOf(n + 2), label + '의 수를 구하는 규칙을 다시 확인해 보세요. ' + kind + '의 ' + label + '의 수는 ' + rule + R.josa(+rule.slice(-1), '이에요/예요') + '.'],
        ];
        if (n - 1 >= 3) cands.push([nameOf(n - 1), label + '의 수를 구하는 규칙을 다시 확인해 보세요. ' + kind + '의 ' + label + '의 수는 ' + rule + R.josa(+rule.slice(-1), '이에요/예요') + '.']);
        if (cnt >= 3 && cnt <= 12 && cnt !== n) cands.push([nameOf(cnt), label + '의 수를 그대로 밑면의 변의 수로 썼어요. ' + rule + '=' + cnt + '인 ■를 구해요.']);
        var reason = {}, wrongs = [];
        cands.forEach(function (c) { if (c[0] !== correct && !(c[0] in reason)) { reason[c[0]] = c[1]; wrongs.push(c[0]); } });
        var pick = R.choices(correct, wrongs);
        var solve = rule + '=' + cnt + '이므로 ■=' + n;
        return {
          type: 'choice', concept: 5,
          q: label + R.josa(label, '이/가') + ' ' + cnt + '개인 ' + kind + '의 이름은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '밑면의 변의 수를 ■라고 하면 ' + kind + '의 ' + label + '의 수는 ' + rule + R.josa(+rule.slice(-1), '이에요/예요') + '. ' + solve + R.josa(n, '이에요/예요') + '. 밑면이 ' + NUM[n] + '각형이니 ' + correct + '이에요.',
        };
      },
    },
    {
      id: 'edge-length-sum',
      level: 2,
      title: '모든 모서리의 길이의 합',
      make: function (R) {
        var isPrism = R.bool(0.6);
        var n = R.int(3, 8);
        var a = R.int(2, 9);
        var h = R.int(3, 15);
        if (!isPrism) {
          // 각뿔의 옆 모서리는 밑면의 중심에서 꼭짓점까지의 거리보다 길어야 각뿔이 만들어진다
          var lo = Math.ceil(a / (2 * Math.sin(Math.PI / n))) + 1;
          h = R.int(Math.max(3, lo), Math.max(3, lo) + 10);
        }
        while (h === a) h += 1;
        var q, ans, wrong, explain, fig;
        if (isPrism) {
          ans = 2 * n * a + n * h;
          q = '밑면이 한 변이 ' + a + ' cm인 정' + NUM[n] + '각형이고 높이가 ' + h + ' cm인 ' + prismName(n) + '이 있어요. 이 ' + prismName(n) + '의 모든 모서리의 길이를 더하면 몇 cm일까요?';
          fig = prism(n, { hLabel: h + ' cm', aLabel: a + ' cm', alt: prismName(n) + '. 세로 모서리 옆에 ' + h + ' cm, 밑면 모서리 아래에 ' + a + ' cm' });
          wrong = [{ a: String(n * a + n * h), why: '밑면 하나의 모서리만 더했어요. 위아래 밑면에 ' + a + ' cm인 모서리가 ' + n + '개씩 있어요.' },
            { a: String(2 * n * a + h), why: '옆 모서리를 하나만 더했어요. 높이와 같은 옆 모서리가 ' + n + '개 있어요.' }];
          explain = a + ' cm인 모서리는 위아래 밑면에 ' + n + '개씩 ' + (2 * n) + '개, ' + h + ' cm인 옆 모서리는 ' + n + '개예요. $' + a + '\\times' + (2 * n) + '+' + h + '\\times' + n + '=' + (2 * n * a) + '+' + (n * h) + '=' + ans + '$ (cm)';
        } else {
          ans = n * a + n * h;
          q = '밑면이 한 변이 ' + a + ' cm인 정' + NUM[n] + '각형이고, 옆 모서리가 모두 ' + h + ' cm인 ' + pyrName(n) + '이 있어요. 이 ' + pyrName(n) + '의 모든 모서리의 길이를 더하면 몇 cm일까요?';
          fig = pyramid(n, { alt: pyrName(n) });
          wrong = [{ a: String(2 * n * a + n * h), why: '밑면을 2개로 생각했어요. 각뿔의 밑면은 1개예요.' },
            { a: String(n * a + h), why: '옆 모서리를 하나만 더했어요. 각뿔의 꼭짓점으로 올라가는 옆 모서리가 ' + n + '개 있어요.' }];
          explain = '밑면의 모서리 ' + a + ' cm가 ' + n + '개, 옆 모서리 ' + h + ' cm가 ' + n + '개예요. $' + a + '\\times' + n + '+' + h + '\\times' + n + '=' + (n * a) + '+' + (n * h) + '=' + ans + '$ (cm)';
        }
        return { type: 'short', check: 'number', unit: 'cm', concept: isPrism ? 1 : 4, q: q, fig: fig, answer: String(ans), wrong: wrong,
          hint: '길이가 같은 모서리가 각각 몇 개인지 먼저 세어 보세요.', explain: explain };
      },
    },
    {
      id: 'prism-to-pyramid',
      level: 3,
      title: '각기둥과 각뿔의 구성 요소 연결하기',
      make: function (R) {
        var n = R.int(3, 10);
        var from = R.pick(['f', 'v', 'e']);
        var given = { f: n + 2, v: 2 * n, e: 3 * n }[from];
        var label = { f: '면', v: '꼭짓점', e: '모서리' }[from];
        var rule = { f: '■+2', v: '■×2', e: '■×3' }[from];
        var ask = R.pick(['v', 'e']);
        var askLabel = { v: '꼭짓점', e: '모서리' }[ask];
        var ans = ask === 'v' ? n + 1 : 2 * n;
        var askRule = ask === 'v' ? '■+1' : '■×2';
        var wrong = given === ans ? [] : [{ a: String(given), why: '각기둥의 ' + label + '의 수를 그대로 썼어요. 먼저 밑면의 변의 수를 구한 뒤 각뿔의 규칙을 써요.' }];
        var prismAns = ask === 'v' ? 2 * n : 3 * n;
        if (prismAns !== given) wrong.push({ a: String(prismAns), why: '각기둥의 ' + askLabel + '의 수를 구했어요. 문제는 각뿔을 묻고 있어요.' });
        return {
          type: 'short', check: 'number', unit: '개', concept: 5,
          q: label + R.josa(label, '이/가') + ' ' + given + '개인 각기둥이 있어요. 이 각기둥과 밑면의 모양이 같은 각뿔의 ' + askLabel + R.josa(askLabel, '은/는') + ' 몇 개일까요?',
          answer: String(ans),
          wrong: wrong,
          hint: '먼저 각기둥의 밑면이 몇 각형인지 구해요.',
          explain: '밑면의 변의 수를 ■라고 하면 각기둥의 ' + label + '의 수는 ' + rule + '=' + given + '이므로 ■=' + n + ', 곧 ' + prismName(n) + '이에요. ' +
            '밑면의 모양이 같은 각뿔은 ' + pyrName(n) + '이고, ' + askLabel + '의 수는 ' + askRule + '=' + ans + '(개)예요.',
        };
      },
    },
  ],
});
})();
