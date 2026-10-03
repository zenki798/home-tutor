/* 공통수학2 · 명제와 조건
 * 명제와 조건·진리집합·조건의 부정, '모든'·'어떤'을 포함한 명제와 부정, p→q 의 참·거짓과 진리집합의 포함 관계,
 * 역과 대우, 충분조건·필요조건·필요충분조건. 증명(대우를 이용한 증명·귀류법)은 다음 단원. */
(function () {
  /* 벤 다이어그램 그림 (fig type 'svg', 가로 300 × 세로 200) — 집합 단원과 같은 그리기 방식.
   * 모양: two(겹친 두 원) · sub(첫 원 안에 둘째 원). 영역: a(첫 원만) · b(둘째 원만) · ab(겹친 곳) · out(원 밖) */
  var VENN = {
    two: { c: [[115, 100, 62], [185, 100, 62]], lab: [[68, 40], [232, 40]], pos: { a: [86, 100], ab: [150, 100], b: [214, 100], out: [40, 178] } },
    sub: { c: [[140, 100, 78], [168, 108, 38]], lab: [[76, 36], [168, 60]], pos: { a: [96, 100], b: [168, 108], out: [40, 178] } },
  };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function r1(x) { return Math.round(x * 10) / 10; }
  function strip(a, b, y) { var w = r1(b - a); return 'M' + r1(a) + ' ' + y + 'h' + w + 'v2.6h-' + w + 'z'; }
  function venn(kind, o) {
    var L = VENN[kind], cs = L.c, X0 = 6, Y0 = 6, X1 = 294, Y1 = 194;
    var svg = '<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">';
    if (o.shade) {
      var d = '';
      for (var y = Y0; y < Y1; y += 2) {
        var yc = y + 1, xs = [X0, X1];
        cs.forEach(function (c) {
          var h = c[2] * c[2] - (yc - c[1]) * (yc - c[1]);
          if (h > 0) { h = Math.sqrt(h); xs.push(c[0] - h, c[0] + h); }
        });
        xs.sort(function (p, q) { return p - q; });
        var s0 = null, s1 = null;
        for (var i = 0; i + 1 < xs.length; i++) {
          var xa = Math.max(X0, xs[i]), xb = Math.min(X1, xs[i + 1]);
          if (xb - xa < 0.05) continue;
          var mx = (xa + xb) / 2;
          var inn = cs.map(function (c) { return (mx - c[0]) * (mx - c[0]) + (yc - c[1]) * (yc - c[1]) < c[2] * c[2]; });
          if (o.shade(inn[0], inn[1], inn[2])) {
            if (s0 !== null && Math.abs(s1 - xa) < 0.05) s1 = xb;
            else { if (s0 !== null) d += strip(s0, s1, y); s0 = xa; s1 = xb; }
          }
        }
        if (s0 !== null) d += strip(s0, s1, y);
      }
      if (d) svg += '<path d="' + d + '" fill="var(--fig-1)" fill-opacity="0.4"/>';
    }
    if (o.U) {
      svg += '<rect x="6" y="6" width="288" height="188" fill="none" stroke="currentColor" stroke-width="2"/>' +
        '<text x="20" y="28" font-size="16" font-style="italic" fill="currentColor">' + esc(o.U) + '</text>';
    }
    cs.forEach(function (c, i) {
      svg += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="none" stroke="currentColor" stroke-width="2"/>';
      if (o.names && o.names[i]) {
        svg += '<text x="' + L.lab[i][0] + '" y="' + L.lab[i][1] + '" text-anchor="middle" font-size="17" font-style="italic" fill="currentColor">' + esc(o.names[i]) + '</text>';
      }
    });
    Object.keys(o.t || {}).forEach(function (k) {
      var p = L.pos[k];
      if (p && o.t[k]) svg += '<text x="' + p[0] + '" y="' + (p[1] + 5) + '" text-anchor="middle" font-size="15" fill="currentColor">' + esc(o.t[k]) + '</text>';
    });
    return { type: 'svg', alt: o.alt, svg: svg + '</svg>' };
  }

  // 부등호
  var OP = { gt: '>', ge: '\\ge', lt: '<', le: '\\le', eq: '=', ne: '\\ne' };
  var NEG = { gt: 'le', ge: 'lt', lt: 'ge', le: 'gt', eq: 'ne', ne: 'eq' };
  function cond(op, a) { return 'x ' + OP[op] + ' ' + a; }

  var SUF_CHOICES = ['충분조건이지만 필요조건은 아니다', '필요조건이지만 충분조건은 아니다', '필요충분조건이다', '필요조건도 충분조건도 아니다'];

  Tutor.registerUnit({
    id: 'math-h-c2-07',
    course: 'math-h-c2',
    title: '명제와 조건',
    summary: '명제와 조건의 뜻을 알고, 진리집합을 이용해 명제의 참·거짓, 역과 대우, 필요조건과 충분조건을 판단합니다.',
    goals: [
      '명제와 조건의 뜻을 알고, 조건의 진리집합과 부정을 구할 수 있다.',
      "'모든'이나 '어떤'을 포함한 명제의 참·거짓을 판별하고 그 부정을 만들 수 있다.",
      '진리집합의 포함 관계로 명제 $p \\to q$의 참·거짓을 판별하고, 역과 대우를 만들 수 있다.',
      '충분조건·필요조건·필요충분조건을 구별할 수 있다.',
    ],
    standards: ['[10공수2-02-04]', '[10공수2-02-05]', '[10공수2-02-06]'],

    concepts: [
      {
        title: '명제와 조건, 진리집합',
        body: '참인지 거짓인지를 분명하게 판별할 수 있는 문장이나 식을 **명제**라고 합니다.\n\n' +
          '- "2는 소수이다." → 참인 명제\n' +
          '- "$3+4=8$" → 거짓인 명제 (거짓이어도 분명하게 판별할 수 있으므로 명제입니다)\n' +
          '- "수학은 재미있다." → 사람마다 판단이 달라 명제가 아닙니다.\n\n' +
          '"$x+1=3$"처럼 변수의 값에 따라 참·거짓이 정해지는 문장이나 식을 **조건**이라 하고, 보통 $p$, $q$, $r$ 등으로 나타냅니다.\n\n' +
          '전체집합 $U$의 원소 가운데 조건 $p$를 참이 되게 하는 원소 전체의 집합을 조건 $p$의 **진리집합**이라 하고, 보통 대문자 $P$로 나타냅니다.\n\n' +
          '예: $U=\\{1, 2, 3, \\cdots, 10\\}$에서 조건 $p$를 "$x$는 3의 배수이다"라고 하면, 진리집합은 $P=\\{3, 6, 9\\}$입니다.\n\n' +
          '> 💡 특별한 말이 없으면 조건의 전체집합은 실수 전체의 집합으로 봅니다.',
        easy: '명제는 "O, X로 채점할 수 있는 문장"입니다. "2는 소수이다"는 O, "$3+4=8$"은 X로 채점할 수 있으니 둘 다 명제입니다. "수학은 재미있다"는 채점할 수 없으니 명제가 아닙니다.\n\n' +
          '조건은 빈칸이 있는 문장과 같습니다. "$x$는 3의 배수이다"에서 $x$ 자리에 6을 넣으면 O, 4를 넣으면 X입니다. O가 되게 하는 수를 모두 모은 것이 진리집합입니다.',
        check: {
          type: 'choice',
          q: '다음 중 명제인 것은 무엇입니까?',
          choices: ['$5>7$', '$x+2=5$', '꽃이 아름답다.'],
          answer: 0,
          why: ['', '$x$의 값에 따라 참·거짓이 달라지는 조건입니다.', '사람마다 판단이 달라 참·거짓을 판별할 수 없습니다.'],
          explain: '$5>7$은 거짓이지만, 거짓이라고 분명하게 판별할 수 있으므로 명제입니다.',
        },
      },
      {
        title: '조건의 부정',
        body: '조건 $p$에 대하여 "$p$가 아니다"를 $p$의 **부정**이라 하고 $\\sim p$로 나타냅니다. 명제의 부정도 같은 방법으로 만듭니다. 명제가 참이면 그 부정은 거짓이고, 명제가 거짓이면 그 부정은 참입니다.\n\n' +
          '조건 $p$의 진리집합이 $P$이면 $\\sim p$의 진리집합은 $P^{C}$입니다. 또 $\\sim p$의 부정은 다시 $p$입니다.\n\n' +
          '자주 쓰는 부정은 다음과 같습니다.\n\n' +
          '| 조건 | 부정 |\n|---|---|\n' +
          '| $x=a$ | $x \\ne a$ |\n' +
          '| $x>a$ | $x \\le a$ |\n' +
          '| $x \\ge a$ | $x<a$ |\n' +
          '| $p$ 또는 $q$ | $\\sim p$ 그리고 $\\sim q$ |\n' +
          '| $p$ 그리고 $q$ | $\\sim p$ 또는 $\\sim q$ |\n\n' +
          '"또는"과 "그리고"가 서로 바뀌는 것은 드모르간의 법칙 $(P \\cup Q)^{C}=P^{C} \\cap Q^{C}$ 때문입니다.\n\n' +
          '예: "$x \\ge 1$이고 $x<5$"의 부정은 "$x<1$ 또는 $x \\ge 5$"입니다.\n\n' +
          '> ⚠️ "$x>3$"의 부정은 "$x<3$"이 아니라 "$x \\le 3$"입니다. $x=3$인 경우를 빠뜨리지 않습니다.',
        easy: '부정은 "반대말 하기"가 아니라 "그 말이 틀렸다고 말하기"입니다. "$x$는 3보다 크다"가 틀렸다면 $x$는 3보다 작을 수도 있고 3일 수도 있습니다. 그래서 부정은 "$x$는 3보다 작거나 같다"입니다.\n\n' +
          '"비가 오거나 눈이 온다"가 틀렸다면 비도 안 오고 눈도 안 온 것입니다. 그래서 "또는"의 부정에는 "그리고"가 들어갑니다.',
        check: {
          type: 'choice',
          q: '조건 "$x>2$"의 부정은 무엇입니까?',
          choices: ['$x \\le 2$', '$x<2$', '$x \\ge 2$'],
          answer: 0,
          why: ['', '$x=2$인 경우를 빠뜨렸습니다. $x=2$는 "$x>2$"를 만족시키지 않습니다.', '$x=3$이면 "$x>2$"와 "$x \\ge 2$"가 둘 다 참이 됩니다. 부정은 원래 조건과 참·거짓이 반대여야 하므로 부등호 방향을 바꾸어야 합니다.'],
          explain: '"$x>2$"가 아니라는 것은 $x$가 2보다 작거나 2와 같다는 뜻이므로 부정은 $x \\le 2$입니다.',
        },
      },
      {
        title: "'모든'과 '어떤'을 포함한 명제",
        body: '전체집합 $U$에서 조건 $p$의 진리집합을 $P$라고 할 때,\n\n' +
          '- "**모든** $x$에 대하여 $p$이다"는 $P=U$이면 참, $P \\ne U$이면 거짓입니다.\n' +
          '- "**어떤** $x$에 대하여 $p$이다"는 $P \\ne \\varnothing$이면 참, $P=\\varnothing$이면 거짓입니다.\n\n' +
          '예 ($x$는 실수):\n' +
          '- "모든 실수 $x$에 대하여 $x^{2} \\ge 0$이다." → 참\n' +
          '- "모든 실수 $x$에 대하여 $x^{2}>0$이다." → 거짓 ($x=0$일 때 $x^{2}=0$)\n' +
          '- "어떤 실수 $x$에 대하여 $x^{2}=4$이다." → 참 ($x=2$일 때)\n\n' +
          '이런 명제의 부정은 다음과 같습니다.\n\n' +
          '| 명제 | 부정 |\n|---|---|\n' +
          '| 모든 $x$에 대하여 $p$이다 | 어떤 $x$에 대하여 $\\sim p$이다 |\n' +
          '| 어떤 $x$에 대하여 $p$이다 | 모든 $x$에 대하여 $\\sim p$이다 |\n\n' +
          '"모든 학생이 안경을 썼다"가 틀렸다는 것은 "안경을 쓰지 않은 학생이 **적어도 한 명** 있다"는 뜻입니다. "모든 학생이 안경을 쓰지 않았다"가 아닙니다.',
        easy: '"모든"은 "하나도 빠짐없이", "어떤"은 "적어도 하나"라는 뜻입니다.\n\n' +
          '"우리 반 모두 숙제를 했다"를 깨뜨리려면 숙제를 안 한 학생 **한 명**만 찾으면 됩니다. 그래서 "모두 ~이다"의 부정은 "적어도 하나는 ~가 아니다"입니다. 거꾸로 "숙제를 한 학생이 있다"의 부정은 "모두 숙제를 안 했다"입니다.',
        check: {
          type: 'ox',
          q: '"모든 실수 $x$에 대하여 $x+1>x$이다."는 참인 명제입니다.',
          answer: true,
          explain: '어떤 실수에 1을 더해도 처음 수보다 큽니다. 진리집합이 실수 전체의 집합과 같으므로 참입니다.',
        },
      },
      {
        title: '명제 p → q의 참·거짓과 진리집합',
        body: '두 조건 $p$, $q$로 만든 명제 "$p$이면 $q$이다"를 기호로 $p \\to q$처럼 나타내고, $p$를 **가정**, $q$를 **결론**이라고 합니다.\n\n' +
          '조건 $p$, $q$의 진리집합을 각각 $P$, $Q$라고 하면\n\n' +
          '- $P \\subset Q$이면 명제 $p \\to q$는 참입니다.\n' +
          '- $P \\not\\subset Q$이면 명제 $p \\to q$는 거짓입니다.\n\n' +
          '$P \\subset Q$는 "$p$를 만족시키는 것은 모두 $q$도 만족시킨다"는 뜻이기 때문입니다. 명제 $p \\to q$가 참일 때 기호로 $p \\Rightarrow q$처럼 나타냅니다.\n\n' +
          '명제가 거짓임을 보이려면 가정은 만족시키지만 결론은 만족시키지 않는 예, 곧 $P$에는 속하지만 $Q$에는 속하지 않는 원소를 하나 들면 됩니다. 이런 예를 **반례**라고 합니다.\n\n' +
          '예: "$x$가 4의 배수이면 $x$는 2의 배수이다"는 참입니다. 4의 배수의 집합이 2의 배수의 집합에 포함되기 때문입니다. 거꾸로 "$x$가 2의 배수이면 $x$는 4의 배수이다"는 거짓이고, 6이 반례입니다.',
        easy: '$p \\to q$가 참이라는 것은 "$p$의 울타리가 $q$의 울타리 안에 통째로 들어 있다"는 뜻입니다. $p$ 울타리 안의 누구를 데려와도 $q$ 울타리 안에 있으니까요.\n\n' +
          '$p$ 울타리 안에 있으면서 $q$ 울타리 밖에 있는 것이 하나라도 있으면 거짓이고, 그것이 반례입니다. "4의 배수이면 8의 배수이다"는 4 하나만 보여 주면 거짓임이 드러납니다.',
        fig: venn('sub', { names: ['Q', 'P'], U: 'U', alt: '직사각형 U 안에 큰 원 Q가 있고, 그 안에 작은 원 P가 통째로 들어 있는 벤 다이어그램 (P ⊂ Q)' }),
        check: {
          type: 'choice',
          q: '두 조건 $p$, $q$의 진리집합을 각각 $P$, $Q$라고 할 때, 명제 $p \\to q$가 참이면 항상 성립하는 것은 무엇입니까?',
          choices: ['$P \\subset Q$', '$Q \\subset P$', '$P \\cap Q=\\varnothing$'],
          answer: 0,
          why: ['', '포함 관계를 거꾸로 생각했습니다. 가정의 진리집합이 결론의 진리집합에 포함됩니다.', '$P \\cap Q=\\varnothing$이면 $p$를 만족시키는 것이 $q$를 만족시키지 않습니다.'],
          explain: '$p$를 만족시키는 것이 모두 $q$를 만족시켜야 하므로 $P \\subset Q$입니다.',
        },
      },
      {
        title: '명제의 역과 대우',
        body: '명제 $p \\to q$에 대하여\n\n' +
          '- 가정과 결론을 서로 바꾼 명제 $q \\to p$를 **역**이라고 합니다.\n' +
          '- 가정과 결론을 각각 부정하여 서로 바꾼 명제 $\\sim q \\to \\sim p$를 **대우**라고 합니다.\n\n' +
          '**명제가 참이면 그 대우도 참이고, 명제가 거짓이면 그 대우도 거짓입니다.** $P \\subset Q$이면 $Q^{C} \\subset P^{C}$이기 때문입니다. 그림에서 $Q$ 바깥(칠한 부분)은 $Q$ 안에 들어 있는 $P$의 바깥이기도 합니다.\n\n' +
          '그러나 명제와 그 역은 참·거짓이 같다는 보장이 없습니다.\n\n' +
          '| 명제 | 참·거짓 |\n|---|---|\n' +
          '| $x=2$이면 $x^{2}=4$이다. | 참 |\n' +
          '| (역) $x^{2}=4$이면 $x=2$이다. | 거짓 (반례 $x=-2$) |\n' +
          '| (대우) $x^{2} \\ne 4$이면 $x \\ne 2$이다. | 참 |',
        easy: '"비가 오면 땅이 젖는다"가 참이라고 합시다. 그러면 "땅이 젖지 않았다면 비가 오지 않았다"도 참입니다. 이것이 대우입니다.\n\n' +
          '하지만 "땅이 젖었다면 비가 왔다"(역)는 꼭 참이 아닙니다. 누군가 물을 뿌렸을 수도 있으니까요. 대우는 원래 명제와 참·거짓을 함께하지만, 역은 따로 따져 봐야 합니다.',
        fig: venn('sub', { names: ['Q', 'P'], U: 'U', shade: function (q) { return !q; },
          alt: '직사각형 U 안에 큰 원 Q, 그 안에 작은 원 P가 있는 벤 다이어그램. Q의 바깥 부분이 칠해져 있고, 칠한 부분은 P와 겹치지 않는다' }),
        check: {
          type: 'choice',
          q: '명제 "$x>3$이면 $x>1$이다."의 대우는 무엇입니까?',
          choices: ['$x \\le 1$이면 $x \\le 3$이다.', '$x>1$이면 $x>3$이다.', '$x \\le 3$이면 $x \\le 1$이다.'],
          answer: 0,
          why: ['', '역입니다. 가정과 결론의 자리만 바꾸었습니다.', '가정과 결론을 부정만 하고 자리를 바꾸지 않았습니다.'],
          explain: '대우는 결론의 부정 "$x \\le 1$"을 가정으로, 가정의 부정 "$x \\le 3$"을 결론으로 놓습니다. 그래서 "$x \\le 1$이면 $x \\le 3$이다"입니다.',
        },
      },
      {
        title: '충분조건과 필요조건',
        body: '명제 $p \\to q$가 참일 때, 곧 $p \\Rightarrow q$일 때\n\n' +
          '- $p$는 $q$이기 위한 **충분조건**\n' +
          '- $q$는 $p$이기 위한 **필요조건**\n\n' +
          '이라고 합니다. 또 $p \\Rightarrow q$이고 $q \\Rightarrow p$이면 기호로 $p \\Leftrightarrow q$처럼 나타내고, $p$는 $q$이기 위한 **필요충분조건**이라고 합니다.\n\n' +
          '진리집합으로 보면 다음과 같습니다.\n\n' +
          '| 진리집합의 관계 | $p$는 $q$이기 위한 |\n|---|---|\n' +
          '| $P \\subset Q$, $P \\ne Q$ | 충분조건 (필요조건은 아님) |\n' +
          '| $Q \\subset P$, $P \\ne Q$ | 필요조건 (충분조건은 아님) |\n' +
          '| $P=Q$ | 필요충분조건 |\n\n' +
          '이름의 뜻: $p$가 성립하기만 하면 $q$가 성립하기에 "충분"하고, $p$가 성립하려면 $q$는 반드시 "필요"합니다.\n\n' +
          '예: $p$: $x=1$, $q$: $x^{2}=1$이면 $P=\\{1\\}$, $Q=\\{-1, 1\\}$이므로 $P \\subset Q$, $P \\ne Q$입니다. 따라서 $p$는 $q$이기 위한 충분조건이지만 필요조건은 아닙니다.',
        easy: '"서울에 산다"는 "우리나라에 산다"이기 위한 충분조건입니다. 서울에 살기만 하면 우리나라에 산다고 말하기에 충분하니까요. 거꾸로 "우리나라에 산다"는 "서울에 산다"이기 위한 필요조건입니다. 서울에 살려면 우리나라에 사는 것이 꼭 필요하니까요.\n\n' +
          '진리집합으로는 **작은 쪽이 충분, 큰 쪽이 필요**라고 기억하면 됩니다. 화살표 $\\Rightarrow$가 나가는 쪽이 충분조건, 들어오는 쪽이 필요조건입니다.',
        check: {
          type: 'choice',
          q: '$p \\Rightarrow q$일 때, $q$는 $p$이기 위한 어떤 조건입니까?',
          choices: ['필요조건', '충분조건', '어느 쪽인지 알 수 없다'],
          answer: 0,
          why: ['', '거꾸로 생각했습니다. 화살표가 나가는 $p$가 충분조건이고, 들어오는 $q$는 필요조건입니다.', '$p \\Rightarrow q$이면 $q$는 $p$이기 위한 필요조건이라고 정해져 있습니다.'],
          explain: '$p \\Rightarrow q$이면 $p$는 $q$이기 위한 충분조건, $q$는 $p$이기 위한 필요조건입니다.',
        },
      },
    ],

    examples: [
      {
        q: '전체집합 $U=\\{1, 2, 3, \\cdots, 12\\}$에서 두 조건 $p$: "$x$는 12의 약수이다", $q$: "$x$는 짝수이다"에 대하여 명제 $p \\to q$의 참·거짓을 판별하세요.',
        steps: [
          '진리집합을 구합니다. $P=\\{1, 2, 3, 4, 6, 12\\}$, $Q=\\{2, 4, 6, 8, 10, 12\\}$',
          '$1 \\in P$이지만 $1 \\notin Q$이므로 $P \\not\\subset Q$입니다.',
          '그래서 명제 $p \\to q$는 거짓입니다. 1(또는 3)이 반례입니다.',
        ],
        answer: '거짓 (반례: $x=1$)',
      },
      {
        q: '두 조건 $p$: $1<x<3$, $q$: $0<x<5$에 대하여 $p$는 $q$이기 위한 어떤 조건인지 말하세요.',
        fig: { type: 'numberline', min: -1, max: 6, step: 1, ranges: [{ from: 1, to: 3, fromOpen: true, toOpen: true }, { from: 0, to: 5, fromOpen: true, toOpen: true }], alt: '수직선 위에 1과 3 사이(양 끝 빈 점)와 0과 5 사이(양 끝 빈 점)를 나타낸 범위' },
        steps: [
          '진리집합은 $P=\\{x \\mid 1<x<3\\}$, $Q=\\{x \\mid 0<x<5\\}$입니다.',
          '수직선에서 $P$의 범위가 $Q$의 범위 안에 들어 있으므로 $P \\subset Q$, 곧 $p \\Rightarrow q$입니다.',
          '$x=4$는 $q$를 만족시키지만 $p$를 만족시키지 않으므로 $q \\to p$는 거짓입니다.',
          '따라서 $p$는 $q$이기 위한 충분조건이지만 필요조건은 아닙니다.',
        ],
        answer: '충분조건 (필요조건은 아님)',
      },
    ],

    terms: [
      { term: '명제', def: '참인지 거짓인지를 분명하게 판별할 수 있는 문장이나 식입니다. 예: "2는 소수이다"(참), "$3+4=8$"(거짓)' },
      { term: '조건', def: '변수의 값에 따라 참·거짓이 정해지는 문장이나 식입니다. 예: "$x+1=3$"' },
      { term: '진리집합', def: '전체집합의 원소 가운데 조건을 참이 되게 하는 원소 전체의 집합입니다. 조건 $p$의 진리집합은 보통 $P$로 씁니다.' },
      { term: '부정', def: '"~가 아니다"라는 뜻의 조건이나 명제입니다. $p$의 부정은 $\\sim p$로 쓰고, 그 진리집합은 $P^{C}$입니다.' },
      { term: '가정과 결론', def: '명제 "$p$이면 $q$이다"에서 $p$를 가정, $q$를 결론이라고 합니다.' },
      { term: '반례', def: '가정은 만족시키지만 결론은 만족시키지 않는 예입니다. 반례가 하나라도 있으면 그 명제는 거짓입니다.' },
      { term: '역', def: '명제 $p \\to q$의 가정과 결론을 서로 바꾼 명제 $q \\to p$입니다.' },
      { term: '대우', def: '명제 $p \\to q$의 가정과 결론을 각각 부정하여 서로 바꾼 명제 $\\sim q \\to \\sim p$입니다. 원래 명제와 참·거짓이 같습니다.' },
      { term: '충분조건과 필요조건', def: '$p \\Rightarrow q$일 때 $p$는 $q$이기 위한 충분조건, $q$는 $p$이기 위한 필요조건이라고 합니다. 진리집합으로는 $P \\subset Q$이고, 작은 쪽이 충분조건입니다.' },
      { term: '필요충분조건', def: '$p \\Rightarrow q$이고 $q \\Rightarrow p$일 때 $p$는 $q$이기 위한 필요충분조건입니다. 진리집합으로는 $P=Q$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 명제인 것은 무엇입니까?',
        choices: ['2는 소수이다.', '$x+1=3$', '수학은 재미있다.', '$x>2$'],
        answer: 0,
        why: [
          '',
          '$x$의 값에 따라 참·거짓이 달라지는 조건입니다.',
          '사람마다 판단이 달라 참·거짓을 판별할 수 없습니다.',
          '$x$의 값에 따라 참·거짓이 달라지는 조건입니다.',
        ],
        explain: '"2는 소수이다"는 참이라고 분명하게 판별할 수 있으므로 명제입니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '"3은 짝수이다."는 거짓이므로 명제가 아닙니다.',
        answer: false,
        explain: '거짓인 문장도 참·거짓을 분명하게 판별할 수 있으면 명제입니다. "3은 짝수이다."는 **거짓인 명제**입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'set', concept: 0,
        q: '전체집합 $U=\\{1, 2, 3, \\cdots, 10\\}$에서 조건 $p$: "$x$는 소수이다"의 진리집합 $P$를 원소나열법으로 나타내세요. 원소를 쉼표로 구분해 쓰세요.',
        answer: '2, 3, 5, 7',
        wrong: [
          { a: '1, 2, 3, 5, 7', why: '1은 소수가 아닙니다.' },
          { a: '3, 5, 7', why: '2도 소수입니다.' },
        ],
        explain: '$U$의 원소 가운데 소수는 2, 3, 5, 7이므로 $P=\\{2, 3, 5, 7\\}$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '조건 "$x \\ge 3$이고 $x<7$"의 부정은 무엇입니까?',
        choices: ['$x<3$ 또는 $x \\ge 7$', '$x<3$이고 $x \\ge 7$', '$x \\le 3$ 또는 $x>7$', '$x>3$ 또는 $x \\le 7$'],
        answer: 0,
        why: [
          '',
          '"이고"를 그대로 두었습니다. "그리고"의 부정에서는 "또는"으로 바뀝니다.',
          '부등호의 등호를 잘못 옮겼습니다. $x \\ge 3$의 부정은 $x<3$, $x<7$의 부정은 $x \\ge 7$입니다.',
          '부등호 방향을 바꾸지 않고 등호만 옮겼습니다.',
        ],
        explain: '"$p$ 그리고 $q$"의 부정은 "$\\sim p$ 또는 $\\sim q$"입니다. $x \\ge 3$의 부정은 $x<3$, $x<7$의 부정은 $x \\ge 7$이므로 답은 "$x<3$ 또는 $x \\ge 7$"입니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 2,
        q: '"모든 실수 $x$에 대하여 $x^{2}>0$이다."는 참인 명제입니다.',
        answer: false,
        explain: '$x=0$이면 $x^{2}=0$이므로 $x^{2}>0$이 성립하지 않습니다. 반례가 있으므로 거짓입니다. "모든 실수 $x$에 대하여 $x^{2} \\ge 0$이다."라고 하면 참입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '명제 "모든 실수 $x$에 대하여 $x^{2}-2x+1>0$이다."의 부정은 무엇입니까?',
        choices: [
          '어떤 실수 $x$에 대하여 $x^{2}-2x+1 \\le 0$이다.',
          '모든 실수 $x$에 대하여 $x^{2}-2x+1 \\le 0$이다.',
          '어떤 실수 $x$에 대하여 $x^{2}-2x+1>0$이다.',
          '모든 실수 $x$에 대하여 $x^{2}-2x+1<0$이다.',
        ],
        answer: 0,
        why: [
          '',
          '"모든"을 그대로 두었습니다. "모든"의 부정은 "어떤"이 됩니다.',
          '"모든"만 바꾸고 조건을 부정하지 않았습니다.',
          '"모든"을 그대로 두었고, $>$의 부정도 $\\le$입니다.',
        ],
        explain: '"모든 $x$에 대하여 $p$"의 부정은 "어떤 $x$에 대하여 $\\sim p$"입니다. $x^{2}-2x+1>0$의 부정은 $x^{2}-2x+1 \\le 0$입니다.\n\n참고로 원래 명제는 $x=1$일 때 $(x-1)^{2}=0$이므로 거짓이고, 부정은 참입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '명제 "$x=2$이면 $x^{2}=4$이다."의 대우는 무엇입니까?',
        choices: ['$x^{2} \\ne 4$이면 $x \\ne 2$이다.', '$x^{2}=4$이면 $x=2$이다.', '$x \\ne 2$이면 $x^{2} \\ne 4$이다.', '$x^{2} \\ne 4$이면 $x=2$이다.'],
        answer: 0,
        why: [
          '',
          '역입니다. 가정과 결론의 자리만 바꾸었습니다.',
          '가정과 결론을 부정만 하고 자리를 바꾸지 않았습니다.',
          '결론 쪽 $x=2$도 부정해야 합니다.',
        ],
        explain: '대우는 "결론의 부정이면 가정의 부정이다"입니다. 결론 $x^{2}=4$의 부정은 $x^{2} \\ne 4$, 가정 $x=2$의 부정은 $x \\ne 2$이므로 대우는 "$x^{2} \\ne 4$이면 $x \\ne 2$이다"입니다.',
      },
      {
        id: 'p8', level: 1, type: 'choice', fixed: true, concept: 5,
        q: '두 조건 $p$: $x=1$, $q$: $x^{2}=1$에 대하여 $p$는 $q$이기 위한 어떤 조건입니까? (단, $x$는 실수)',
        choices: SUF_CHOICES,
        answer: 0,
        why: [
          '',
          '거꾸로 생각했습니다. $p \\Rightarrow q$이므로 $p$는 충분조건입니다. $q \\to p$는 $x=-1$이 반례입니다.',
          '$q \\to p$는 거짓입니다. $x=-1$이면 $x^{2}=1$이지만 $x \\ne 1$입니다.',
          '$x=1$이면 $x^{2}=1$이므로 $p \\Rightarrow q$입니다. 충분조건입니다.',
        ],
        explain: '$P=\\{1\\}$, $Q=\\{-1, 1\\}$이므로 $P \\subset Q$이고 $P \\ne Q$입니다. 따라서 $p$는 $q$이기 위한 충분조건이지만 필요조건은 아닙니다.',
      },
      {
        id: 'p9', level: 2, type: 'ox', concept: 3,
        q: '두 조건 $p$, $q$의 진리집합 $P$, $Q$ 사이의 관계가 다음 벤 다이어그램과 같을 때, 명제 $q \\to p$는 참입니다.',
        fig: venn('sub', { names: ['Q', 'P'], U: 'U', alt: '직사각형 U 안에 큰 원 Q가 있고, 그 안에 작은 원 P가 들어 있는 벤 다이어그램' }),
        answer: false,
        explain: '그림에서 $P \\subset Q$이고 $Q$에는 $P$ 밖의 부분이 있으므로 $Q \\not\\subset P$입니다. 그래서 $q \\to p$는 거짓입니다. 참인 것은 $p \\to q$와 그 대우 $\\sim q \\to \\sim p$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: '개', concept: 3,
        q: '전체집합 $U=\\{1, 2, 3, \\cdots, 10\\}$에서 두 조건 $p$: "$x$는 짝수이다", $q$: "$x$는 4의 배수이다"에 대하여 명제 $p \\to q$가 거짓임을 보이는 반례는 모두 몇 개입니까?',
        answer: '3',
        hint: '반례는 $P$에는 속하지만 $Q$에는 속하지 않는 원소, 곧 $P-Q$의 원소입니다.',
        wrong: [
          { a: '2', why: '$Q=\\{4, 8\\}$의 원소 개수입니다. 반례는 $P-Q$의 원소입니다.' },
          { a: '5', why: '$P$의 원소 개수입니다. 그중 $Q$에 속하는 4, 8은 반례가 아닙니다.' },
        ],
        explain: '$P=\\{2, 4, 6, 8, 10\\}$, $Q=\\{4, 8\\}$입니다. 반례는 $P-Q=\\{2, 6, 10\\}$의 원소이므로 3개입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '명제 $p \\to q$가 참일 때, 다음 중 반드시 참인 명제는 무엇입니까?',
        choices: ['$\\sim q \\to \\sim p$', '$q \\to p$', '$\\sim p \\to \\sim q$', '$p \\to \\sim q$'],
        answer: 0,
        why: [
          '',
          '역은 원래 명제가 참이어도 거짓일 수 있습니다.',
          '역의 대우이므로 역과 참·거짓이 같습니다. 반드시 참이라고 할 수 없습니다.',
          '$P \\subset Q$일 때 $P$가 공집합이 아니면 $P \\subset Q^{C}$이 될 수 없습니다.',
        ],
        explain: '명제와 그 대우는 참·거짓이 같습니다. $p \\to q$의 대우는 $\\sim q \\to \\sim p$이므로 반드시 참입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', fixed: true, concept: 5,
        q: '실수 $x$, $y$에 대하여 두 조건 $p$: $xy=0$, $q$: $x=0$이 있습니다. $p$는 $q$이기 위한 어떤 조건입니까?',
        choices: SUF_CHOICES,
        answer: 1,
        why: [
          '$p \\to q$는 거짓입니다. $x=1$, $y=0$이면 $xy=0$이지만 $x \\ne 0$입니다.',
          '',
          '$p \\to q$는 거짓입니다. $x=1$, $y=0$이 반례입니다.',
          '$x=0$이면 $xy=0$이므로 $q \\Rightarrow p$입니다. $p$는 필요조건입니다.',
        ],
        hint: '$xy=0$은 "$x=0$ 또는 $y=0$"과 같습니다.',
        explain: '$q \\to p$: $x=0$이면 $xy=0$이므로 참입니다. $p \\to q$: $x=1$, $y=0$이면 $xy=0$이지만 $x \\ne 0$이므로 거짓입니다. 따라서 $q \\Rightarrow p$이고, $p$는 $q$이기 위한 필요조건이지만 충분조건은 아닙니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 3,
        q: '두 조건 $p$: $x^{2}-4x+3 \\le 0$, $q$: $a-1 \\le x \\le a+3$에 대하여 명제 $p \\to q$가 참이 되도록 하는 정수 $a$의 개수를 구하세요.',
        answer: '3',
        hint: '이차부등식을 풀어 $P$를 구한 뒤 $P \\subset Q$가 되는 조건을 세워 보세요.',
        wrong: [
          { a: '1', why: '양 끝의 등호를 빼고 셌습니다. 경계에서 $P$와 $Q$의 끝이 같아도 $P \\subset Q$입니다.' },
          { a: '2', why: '한쪽 끝을 빠뜨렸습니다. $0 \\le a \\le 2$이므로 0, 1, 2입니다.' },
        ],
        explain: '$x^{2}-4x+3=(x-1)(x-3) \\le 0$이므로 $P=\\{x \\mid 1 \\le x \\le 3\\}$입니다. $p \\to q$가 참이려면 $P \\subset Q$이어야 하므로\n\n$a-1 \\le 1$이고 $3 \\le a+3$, 곧 $0 \\le a \\le 2$입니다.\n\n정수 $a$는 0, 1, 2의 3개입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '세 조건 $p$, $q$, $r$에 대하여 두 명제 $p \\to q$, $q \\to r$이 모두 참일 때, 다음 중 반드시 참인 명제는 무엇입니까?',
        choices: ['$\\sim r \\to \\sim p$', '$r \\to p$', '$\\sim p \\to \\sim r$', '$r \\to q$'],
        answer: 0,
        why: [
          '',
          '$p \\to r$의 역입니다. 역은 반드시 참이라고 할 수 없습니다.',
          '$r \\to p$의 대우이므로 반드시 참이라고 할 수 없습니다.',
          '$q \\to r$의 역입니다. 반드시 참이라고 할 수 없습니다.',
        ],
        hint: '진리집합으로 $P \\subset Q$, $Q \\subset R$을 생각해 보세요.',
        explain: '$P \\subset Q$이고 $Q \\subset R$이므로 $P \\subset R$, 곧 $p \\to r$이 참입니다. 그 대우 $\\sim r \\to \\sim p$도 참입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', fixed: true, concept: 5,
        q: '실수 $x$, $y$에 대하여 두 조건 $p$: $x+y>2$, $q$: "$x>1$이고 $y>1$"이 있습니다. $p$는 $q$이기 위한 어떤 조건입니까?',
        choices: SUF_CHOICES,
        answer: 1,
        why: [
          '$p \\to q$는 거짓입니다. $x=3$, $y=0$이면 $x+y>2$이지만 $y>1$이 아닙니다.',
          '',
          '$p \\to q$는 거짓입니다. $x=3$, $y=0$이 반례입니다.',
          '$x>1$이고 $y>1$이면 $x+y>2$이므로 $q \\Rightarrow p$입니다. $p$는 필요조건입니다.',
        ],
        hint: '$q \\to p$와 $p \\to q$를 각각 따져 보세요. 거짓이면 반례를 찾아봅니다.',
        explain: '$q \\to p$: $x>1$, $y>1$이면 두 부등식을 더해 $x+y>2$이므로 참입니다.\n\n$p \\to q$: $x=3$, $y=0$이면 $x+y=3>2$이지만 $y>1$이 아니므로 거짓입니다.\n\n따라서 $p$는 $q$이기 위한 필요조건이지만 충분조건은 아닙니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 2,
        q: '명제 "모든 실수 $x$에 대하여 $x^{2}-2x+k>0$이다."가 참이 되도록 하는 정수 $k$의 최솟값을 구하세요.',
        answer: '2',
        hint: '이차함수 $y=x^{2}-2x+k$의 그래프가 $x$축보다 항상 위에 있으려면 판별식이 어때야 할까요?',
        wrong: [
          { a: '1', why: '$k=1$이면 $x^{2}-2x+1=(x-1)^{2}$이 $x=1$에서 0이 되어 $>0$이 성립하지 않습니다.' },
          { a: '0', why: '$k=0$이면 $x=0$일 때 $x^{2}-2x=0$이므로 성립하지 않습니다.' },
        ],
        explain: '모든 실수 $x$에 대하여 $x^{2}-2x+k>0$이려면 이차방정식 $x^{2}-2x+k=0$의 판별식 $D$가 $D<0$이어야 합니다.\n\n$\\dfrac{D}{4}=1-k<0$에서 $k>1$이므로 정수 $k$의 최솟값은 2입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 2,
        q: '명제 "어떤 실수 $x$에 대하여 $x^{2}+4x+k \\le 0$이다."가 거짓이 되도록 하는 정수 $k$의 최솟값을 구하세요.',
        answer: '5',
        hint: '명제가 거짓이면 그 부정이 참입니다. 먼저 부정을 만들어 보세요.',
        wrong: [
          { a: '4', why: '$k=4$이면 $x=-2$일 때 $(x+2)^{2}=0 \\le 0$이므로 원래 명제가 참이 됩니다.' },
          { a: '3', why: '$k=3$이면 $x=-2$일 때 $4-8+3=-1 \\le 0$이므로 원래 명제가 참이 됩니다.' },
        ],
        explain: '주어진 명제가 거짓이려면 그 부정 "모든 실수 $x$에 대하여 $x^{2}+4x+k>0$이다."가 참이어야 합니다. 그러려면 판별식 $D$에 대하여 $\\dfrac{D}{4}=4-k<0$, 곧 $k>4$입니다.\n\n따라서 정수 $k$의 최솟값은 5입니다.',
      },
    ],

    deeper: [
      {
        title: '명제와 집합은 한 쌍',
        body: '이 단원의 내용은 거의 모두 집합의 말로 바꿀 수 있습니다.\n\n' +
          '| 명제·조건 | 집합 |\n|---|---|\n' +
          '| $\\sim p$ | $P^{C}$ |\n' +
          '| $p$ 또는 $q$ | $P \\cup Q$ |\n' +
          '| $p$ 그리고 $q$ | $P \\cap Q$ |\n' +
          '| $p \\Rightarrow q$ | $P \\subset Q$ |\n' +
          '| $p \\Leftrightarrow q$ | $P=Q$ |\n' +
          '| 대우가 참 | $Q^{C} \\subset P^{C}$ |\n\n' +
          '그래서 조건의 부정에서 "또는"과 "그리고"가 바뀌는 것은 드모르간의 법칙이고, 명제와 대우의 참·거짓이 같은 것은 "$P \\subset Q$이면 $Q^{C} \\subset P^{C}$"라는 집합의 성질입니다.',
      },
      {
        title: '다음 단원과의 연결: 대우로 증명하기',
        body: '명제와 대우는 참·거짓이 같으므로, 어떤 명제를 직접 증명하기 어려울 때 대우를 증명해도 됩니다.\n\n' +
          '예를 들어 "자연수 $n$에 대하여 $n^{2}$이 짝수이면 $n$은 짝수이다"는 직접 보이기가 까다롭지만, 대우 "$n$이 홀수이면 $n^{2}$은 홀수이다"는 $n=2k-1$로 놓고 $n^{2}=2(2k^{2}-2k)+1$로 계산하면 바로 보입니다.\n\n' +
          '다음 단원 "명제의 증명과 절대부등식"에서 이 방법과 귀류법을 자세히 배웁니다.',
      },
    ],

    faq: [
      {
        q: '필요조건, 충분조건이 자꾸 헷갈려요.',
        a: '$p \\Rightarrow q$에서 화살표가 **나가는** $p$가 충분조건, 화살표가 **들어오는** $q$가 필요조건입니다. 진리집합으로는 작은 쪽($P$)이 충분, 큰 쪽($Q$)이 필요입니다. "서울에 산다 ⇒ 우리나라에 산다"처럼 확실한 예 하나를 기준으로 삼아 비교해 보세요.',
      },
      {
        q: '대우는 참·거짓이 같은데 역은 왜 달라요?',
        a: '$p \\to q$가 참이라는 것은 $P \\subset Q$라는 뜻입니다. 대우 $\\sim q \\to \\sim p$는 $Q^{C} \\subset P^{C}$인데, 이것은 $P \\subset Q$와 완전히 같은 내용입니다. 하지만 역 $q \\to p$는 $Q \\subset P$를 뜻하므로 전혀 다른 포함 관계입니다. "4의 배수이면 짝수이다"는 참이지만 "짝수이면 4의 배수이다"는 거짓인 것처럼요.',
      },
      {
        q: '"모든"의 부정은 왜 "모두 아니다"가 아니에요?',
        a: '"모든 학생이 합격했다"가 틀렸다는 것은 한 명이라도 불합격한 학생이 있다는 뜻입니다. 모두가 불합격했을 필요는 없습니다. 그래서 "모든 $x$에 대하여 $p$"의 부정은 "어떤 $x$에 대하여 $\\sim p$"입니다.',
      },
      {
        q: '거짓인 명제를 증명하려면 어떻게 해요?',
        a: '명제가 거짓임을 보이려면 **반례 하나**만 들면 됩니다. 가정은 만족시키면서 결론은 만족시키지 않는 예를 찾으세요. 반대로 참임을 보일 때는 예를 아무리 많이 들어도 증명이 되지 않으므로, 진리집합의 포함 관계나 다음 단원에서 배우는 증명 방법을 씁니다.',
      },
    ],

    mistakes: [
      '"$x>3$"의 부정을 "$x<3$"으로 쓰는 실수 — 경계값을 포함해 "$x \\le 3$"입니다.',
      '"$p$ 또는 $q$"의 부정을 "$\\sim p$ 또는 $\\sim q$"로 쓰는 실수 — "또는"은 "그리고"로 바뀝니다.',
      '역과 대우를 헷갈리거나, 충분조건과 필요조건을 거꾸로 말하는 실수 — $p \\Rightarrow q$이면 $p$가 충분, $q$가 필요입니다. 원래 명제와 참·거짓이 같은 것은 대우뿐입니다.',
    ],

    gens: [
      {
        id: 'negate-condition',
        level: 1,
        title: '조건의 부정',
        make: function (R) {
          var kind = R.pick(['single', 'single', 'and', 'or']);
          var a = R.int(-5, 6), b = a + R.int(2, 6);
          var original, correct, cands;
          function m(s) { return '$' + s + '$'; }
          if (kind === 'single') {
            var op = R.pick(['gt', 'ge', 'lt', 'le', 'eq']);
            original = m(cond(op, a));
            correct = m(cond(NEG[op], a));
            var FLIP = { gt: 'lt', ge: 'le', lt: 'gt', le: 'ge' };
            var SAMEDIR = { gt: 'ge', ge: 'gt', lt: 'le', le: 'lt' };
            if (op === 'eq') {
              cands = [
                [m(cond('gt', a)), '$x<' + a + '$인 경우를 빠뜨렸습니다. "같지 않다"는 크거나 작은 경우를 모두 포함합니다.'],
                [m(cond('lt', a)), '$x>' + a + '$인 경우를 빠뜨렸습니다. "같지 않다"는 크거나 작은 경우를 모두 포함합니다.'],
                [m(cond('ge', a)), '$x=' + a + '$도 들어 있습니다. 부정에는 원래 조건을 만족시키는 값이 들어가지 않습니다.'],
              ];
            } else {
              cands = [
                [m(cond(FLIP[op], a)), '$x=' + a + '$인 경우를 잘못 처리했습니다. 부정은 원래 조건이 거짓인 값을 모두 모은 것입니다.'],
                [m(cond(SAMEDIR[op], a)), '부등호의 방향을 바꾸지 않았습니다. 이 조건은 원래 조건과 겹치는 값이 많습니다.'],
                [m(cond('ne', a)), '"같지 않다"는 "$x=' + a + '$"의 부정입니다. 부등식의 부정은 부등호를 바꿉니다.'],
              ];
            }
          } else if (kind === 'and') {
            // a ≤ x < b  →  x < a 또는 x ≥ b
            original = m('x \\ge ' + a) + '이고 ' + m('x<' + b);
            correct = m('x<' + a) + ' 또는 ' + m('x \\ge ' + b);
            cands = [
              [m('x<' + a) + '이고 ' + m('x \\ge ' + b), '"이고"를 그대로 두었습니다. "그리고"의 부정에서는 "또는"으로 바뀝니다.'],
              [m('x \\le ' + a) + ' 또는 ' + m('x>' + b), '등호를 잘못 옮겼습니다. $x \\ge ' + a + '$의 부정은 $x<' + a + '$, $x<' + b + '$의 부정은 $x \\ge ' + b + '$입니다.'],
              [m('x>' + a) + ' 또는 ' + m('x \\le ' + b), '부등호의 방향을 바꾸지 않고 등호만 옮겼습니다.'],
            ];
          } else {
            original = m('x=' + a) + ' 또는 ' + m('x=' + b);
            correct = m('x \\ne ' + a) + '이고 ' + m('x \\ne ' + b);
            cands = [
              [m('x \\ne ' + a) + ' 또는 ' + m('x \\ne ' + b), '"또는"을 그대로 두었습니다. "또는"의 부정에서는 "그리고"로 바뀝니다.'],
              [m('x=' + a) + '이고 ' + m('x=' + b), '각 조건을 부정하지 않았습니다. "같다"의 부정은 "같지 않다"입니다.'],
              [m(a + '<x<' + b), '두 값 사이의 수만 모았습니다. 부정은 $' + a + '$도 $' + b + '$도 아닌 모든 실수입니다.'],
            ];
          }
          var reason = {};
          cands.forEach(function (c) { reason[c[0]] = c[1]; });
          var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
          return {
            type: 'choice', concept: 1,
            q: '조건 "' + original + '"의 부정은 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
            explain: kind === 'single'
              ? '조건이 거짓이 되는 $x$의 값을 모두 모으면 ' + correct + '입니다. 등호가 어느 쪽에 들어가는지 꼭 확인합니다.'
              : '"' + (kind === 'and' ? '그리고' : '또는') + '"의 부정은 "' + (kind === 'and' ? '또는' : '그리고') + '"이고, 각 조건을 부정합니다. 그래서 답은 "' + correct + '"입니다.',
          };
        },
      },
      {
        id: 'implication-truth',
        level: 2,
        title: '진리집합으로 명제의 참·거짓 판별',
        make: function (R) {
          var a = R.int(-4, 4), b = a + R.int(2, 5);
          var kind = R.pick(['gt', 'ge', 'between']);
          var c = a + R.int(-2, 1), d = b + R.int(-1, 2);
          var qTex, truth, counter;
          if (kind === 'gt') {
            qTex = 'x>' + c; truth = c < a; counter = a;
          } else if (kind === 'ge') {
            qTex = 'x \\ge ' + c; truth = c <= a; counter = a;
          } else {
            qTex = c + '<x<' + d; truth = c < a && b < d; counter = c >= a ? a : b;
          }
          var pTex = a + ' \\le x \\le ' + b;
          return {
            type: 'ox', concept: 3,
            q: '명제 "$' + pTex + '$이면 $' + qTex + '$이다."는 참입니다.',
            answer: truth,
            explain: '두 조건의 진리집합은 $P=\\{x \\mid ' + pTex + '\\}$, $Q=\\{x \\mid ' + qTex + '\\}$입니다. ' +
              (truth
                ? '$P$의 범위가 $Q$의 범위 안에 모두 들어 있으므로 $P \\subset Q$이고, 명제는 참입니다.'
                : '$x=' + counter + '$' + R.josa(counter, '은/는') + ' 가정 $' + pTex + '$' + R.josa(b, '을/를') + ' 만족시키지만 결론 $' + qTex + '$' + R.josa(kind === 'between' ? d : c, '을/를') + ' 만족시키지 않으므로 $P \\not\\subset Q$입니다. 이 반례 때문에 명제는 거짓입니다. 경계값에서 등호가 있는지 꼭 확인합니다.'),
          };
        },
      },
      {
        id: 'necessary-sufficient',
        level: 2,
        title: '충분조건·필요조건 판별',
        make: function (R) {
          var kind = R.pick(['ray', 'square', 'factor', 'both', 'overlap']);
          var pTex, qTex, imp, conv, cePQ = null, ceQP = null, pre = '';
          function fac(r) { return r === 0 ? 'x' : '(x' + R.fmt.signed(-r) + ')'; }
          var a = R.nonzero(-6, 6);
          if (kind === 'ray') {
            var b = a + R.nonzero(-3, 3);
            pTex = 'x>' + a; qTex = 'x>' + b;
            imp = a > b; conv = !imp;
            if (imp) ceQP = '$x=' + a + '$'; else cePQ = '$x=' + b + '$';
          } else if (kind === 'square') {
            var sw = R.bool();
            var s1 = 'x=' + a, s2 = 'x^{2}=' + (a * a);
            pTex = sw ? s2 : s1; qTex = sw ? s1 : s2;
            imp = !sw; conv = sw;
            if (sw) cePQ = '$x=' + (-a) + '$'; else ceQP = '$x=' + (-a) + '$';
            pre = '$x^{2}=' + (a * a) + '$의 해는 $x=' + a + '$ 또는 $x=' + (-a) + '$입니다. ';
          } else if (kind === 'factor') {
            var sw2 = R.bool();
            var t1 = R.fmt.poly([1, -a, 0]) + '=0', t2 = 'x=' + a;
            pTex = sw2 ? t2 : t1; qTex = sw2 ? t1 : t2;
            imp = sw2; conv = !sw2;
            if (sw2) ceQP = '$x=0$'; else cePQ = '$x=0$';
            pre = '$' + t1 + '$에서 $' + fac(0) + fac(a) + '=0$이므로 해는 $x=0$ 또는 $x=' + a + '$입니다. ';
          } else if (kind === 'both') {
            var c2 = a + R.int(1, 5);
            pTex = R.fmt.poly([1, -(a + c2), a * c2]) + '=0';
            qTex = 'x=' + a + '\\text{ 또는 }x=' + c2;
            imp = true; conv = true;
            pre = '$' + pTex + '$에서 $' + fac(a) + fac(c2) + '=0$이므로 해는 $x=' + a + '$ 또는 $x=' + c2 + '$입니다. 두 조건의 진리집합이 같습니다. ';
          } else {
            var e = a + R.int(2, 4);
            pTex = a + '<x<' + e; qTex = (a + 1) + '<x<' + (e + 1);
            imp = false; conv = false;
            cePQ = '$x=' + (a + 1) + '$'; ceQP = '$x=' + e + '$';
          }
          var ans = imp && !conv ? 0 : !imp && conv ? 1 : imp && conv ? 2 : 3;
          var why = [
            !imp ? '$p \\to q$가 거짓이라 충분조건이 아닙니다. 반례: ' + cePQ : '$q \\to p$도 참이므로 필요조건이기도 합니다.',
            !conv ? '$q \\to p$가 거짓이라 필요조건이 아닙니다. 반례: ' + ceQP : '$p \\to q$도 참이므로 충분조건이기도 합니다.',
            !imp ? '$p \\to q$가 거짓입니다. 반례: ' + cePQ : '$q \\to p$가 거짓입니다. 반례: ' + ceQP,
            imp ? '$p \\to q$가 참이므로 $p$는 $q$이기 위한 충분조건입니다.' : '$q \\to p$가 참이므로 $p$는 $q$이기 위한 필요조건입니다.',
          ];
          why[ans] = '';
          var impText = imp ? '$p \\to q$는 참입니다.' : '$p \\to q$는 거짓입니다(반례: ' + cePQ + ').';
          var convText = conv ? '$q \\to p$는 참입니다.' : '$q \\to p$는 거짓입니다(반례: ' + ceQP + ').';

          return {
            type: 'choice', fixed: true, concept: 5,
            q: '두 조건 $p$: $' + pTex + '$, $q$: $' + qTex + '$에 대하여 $p$는 $q$이기 위한 어떤 조건입니까? (단, $x$는 실수)',
            choices: SUF_CHOICES.slice(),
            answer: ans,
            why: why,
            explain: pre + impText + ' ' + convText + ' 따라서 $p$는 $q$이기 위한 ' + SUF_CHOICES[ans].replace(/다$/, '') + '라고 할 수 있습니다.',
          };
        },
      },
      {
        id: 'inclusion-parameter',
        level: 3,
        title: '명제가 참이 되도록 하는 상수의 범위',
        make: function (R) {
          var a = R.int(-3, 3), len = R.int(2, 4), b = a + len;
          var sym = R.bool();
          var w, lo, hi, qTex;
          if (sym) {
            w = R.int(Math.ceil(len / 2) + 1, len + 2);           // q: k-w ≤ x ≤ k+w
            lo = b - w; hi = a + w;
            qTex = 'k-' + w + ' \\le x \\le k+' + w;
          } else {
            w = R.int(len + 1, len + 4);                            // q: k ≤ x ≤ k+w
            lo = b - w; hi = a;
            qTex = 'k \\le x \\le k+' + w;
          }
          var count = hi - lo + 1;
          var usePoly = R.bool();
          function fac(r) { return r === 0 ? 'x' : '(x' + R.fmt.signed(-r) + ')'; }
          var pTex = usePoly ? R.fmt.poly([1, -(a + b), a * b]) + ' \\le 0' : a + ' \\le x \\le ' + b;
          var phrase = R.pick(['명제 $p \\to q$가 참이', '$p$가 $q$이기 위한 충분조건이', '$q$가 $p$이기 위한 필요조건이']);
          var condText = sym
            ? '$k-' + w + ' \\le ' + a + '$이고 $' + b + ' \\le k+' + w + '$'
            : '$k \\le ' + a + '$이고 $' + b + ' \\le k+' + w + '$';
          return {
            type: 'short', check: 'number', unit: '개', concept: 3,
            q: '두 조건 $p$: $' + pTex + '$, $q$: $' + qTex + '$에 대하여 ' + phrase + ' 되도록 하는 정수 $k$의 개수를 구하세요.',
            answer: String(count),
            wrong: [
              { a: String(count - 2), why: '양 끝 값을 빼고 셌습니다. 진리집합의 끝이 같아져도 $P \\subset Q$입니다.' },
              { a: String(count - 1), why: '한쪽 끝 값을 빠뜨렸습니다. $' + lo + ' \\le k \\le ' + hi + '$의 정수를 다시 세어 보세요.' },
            ].filter(function (x) { return Number(x.a) > 0; }),
            hint: '어느 경우든 $P \\subset Q$가 되어야 합니다. 수직선에 $P$를 그리고 $Q$가 그것을 덮도록 해 보세요.',
            explain: (usePoly ? '$' + pTex + '$에서 $' + fac(a) + fac(b) + ' \\le 0$이므로 ' : '') +
              '$P=\\{x \\mid ' + a + ' \\le x \\le ' + b + '\\}$입니다. ' + phrase + ' 되려면 $P \\subset Q$이어야 하므로 ' + condText + ', 곧 $' + lo + ' \\le k \\le ' + hi + '$입니다.\n\n' +
              '정수 $k$는 $' + lo + '$부터 $' + hi + '$까지 ' + count + '개입니다.',
          };
        },
      },
    ],
  });
})();
