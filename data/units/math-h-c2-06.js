/* 공통수학2 · 집합의 연산
 * 합집합·교집합·서로소, 전체집합·여집합·차집합(A-B = A∩Bᶜ), 연산 법칙(교환·결합·분배),
 * 드모르간의 법칙, 유한집합의 원소의 개수 n(A∪B) = n(A)+n(B)-n(A∩B). */
(function () {
  /* 벤 다이어그램 그림 (fig type 'svg', 가로 300 × 세로 200).
   * venn(모양, { names: ['A','B','C'], U: 'U'(전체집합 사각형, 선택), shade: function (a, b, c) { 칠할 영역이면 true }, t: { 영역: '글' }, alt })
   * 모양: one · two · three(세 원)
   * 영역 이름: a(첫 원만) · b(둘째 원만) · ab(겹친 곳) · out(원 밖) — three 는 a b c ab ac bc abc out
   * 칠한 부분은 높이 2짜리 가로 띠로 원의 경계를 정확히 계산해 그린다(clipPath·id 를 쓰지 않는다). */
  var VENN = {
    one: { c: [[150, 100, 70]], lab: [[92, 40]], pos: { a: [150, 100], out: [40, 178] } },
    two: { c: [[115, 100, 62], [185, 100, 62]], lab: [[68, 40], [232, 40]], pos: { a: [86, 100], ab: [150, 100], b: [214, 100], out: [40, 178] } },
    three: {
      c: [[118, 80, 52], [182, 80, 52], [150, 135, 52]], lab: [[66, 32], [234, 32], [218, 178]],
      pos: { a: [92, 66], b: [208, 66], c: [150, 168], ab: [150, 56], ac: [116, 122], bc: [184, 122], abc: [150, 100], out: [36, 180] },
    },
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

  // 두 집합 벤 다이어그램의 영역 → 칠하기 함수
  function shadeOf(regions) {
    return function (a, b) {
      var k = a && b ? 'ab' : a ? 'a' : b ? 'b' : 'out';
      return regions.indexOf(k) >= 0;
    };
  }
  var REGION_WORD = { a: '$A$에만 속하는 부분', ab: '두 원이 겹친 부분', b: '$B$에만 속하는 부분', out: '두 원 밖의 부분' };
  function setTex(arr) { return '\\{' + arr.join(', ') + '\\}'; }

  Tutor.registerUnit({
    id: 'math-h-c2-06',
    course: 'math-h-c2',
    title: '집합의 연산',
    summary: '합집합·교집합·여집합·차집합을 구하고, 집합의 연산 법칙과 드모르간의 법칙을 벤 다이어그램으로 확인하며, 유한집합의 원소의 개수를 구합니다.',
    goals: [
      '두 집합의 합집합·교집합·차집합과 한 집합의 여집합을 구할 수 있다.',
      '집합의 연산 법칙과 드모르간의 법칙을 벤 다이어그램으로 확인할 수 있다.',
      '$n(A \\cup B)=n(A)+n(B)-n(A \\cap B)$를 이용해 원소의 개수에 관한 문제를 해결할 수 있다.',
    ],
    standards: ['[10공수2-02-03]'],

    concepts: [
      {
        title: '합집합·교집합과 서로소',
        body: '두 집합 $A$, $B$에 대하여\n\n' +
          '- $A$에 속하거나 $B$에 속하는 모든 원소로 이루어진 집합을 $A$와 $B$의 **합집합**이라 하고 $A \\cup B$로 나타냅니다.\n  $A \\cup B=\\{x \\mid x \\in A \\text{ 또는 } x \\in B\\}$\n' +
          '- $A$에도 속하고 $B$에도 속하는 모든 원소로 이루어진 집합을 $A$와 $B$의 **교집합**이라 하고 $A \\cap B$로 나타냅니다.\n  $A \\cap B=\\{x \\mid x \\in A \\text{ 그리고 } x \\in B\\}$\n\n' +
          '예: $A=\\{1, 2, 3, 4\\}$, $B=\\{3, 4, 5\\}$이면 $A \\cup B=\\{1, 2, 3, 4, 5\\}$, $A \\cap B=\\{3, 4\\}$입니다. 두 집합에 모두 있는 3, 4는 합집합에 한 번만 씁니다.\n\n' +
          '두 집합에 공통인 원소가 하나도 없어 $A \\cap B=\\varnothing$일 때, $A$와 $B$는 **서로소**라고 합니다. 예를 들어 $\\{1, 3, 5\\}$와 $\\{2, 4, 6\\}$은 서로소입니다.\n\n' +
          '> 💡 언제나 $A \\cap B \\subset A \\subset A \\cup B$입니다.',
        easy: '합집합은 "두 모임의 명단을 합친 것", 교집합은 "두 모임에 모두 이름이 있는 사람"입니다. 축구부 명단과 독서부 명단을 합치면 합집합이고, 두 동아리에 모두 든 학생이 교집합입니다. 두 동아리에 모두 든 학생은 합친 명단에 한 번만 적습니다.\n\n' +
          '두 동아리에 겹치는 학생이 한 명도 없으면 두 동아리는 서로소입니다.',
        fig: venn('two', { names: ['A', 'B'], shade: shadeOf(['ab']), t: { a: '1, 2', ab: '3, 4', b: '5' },
          alt: '두 원 A, B가 겹친 벤 다이어그램. A에만 1, 2, 겹친 부분에 3, 4, B에만 5가 있고, 겹친 부분(교집합)이 칠해져 있다' }),
        check: {
          type: 'choice',
          q: '$A=\\{1, 2, 3\\}$, $B=\\{2, 3, 4\\}$일 때, $A \\cap B$는 무엇입니까?',
          choices: ['$\\{2, 3\\}$', '$\\{1, 2, 3, 4\\}$', '$\\{1, 4\\}$'],
          answer: 0,
          why: ['', '합집합을 구했습니다. 교집합은 두 집합에 모두 속하는 원소만 모읍니다.', '한쪽에만 속하는 원소를 골랐습니다. 교집합은 양쪽에 모두 있는 원소입니다.'],
          explain: '두 집합에 모두 속하는 원소는 2, 3이므로 $A \\cap B=\\{2, 3\\}$입니다.',
        },
      },
      {
        title: '전체집합과 여집합',
        body: '어떤 집합의 부분집합들을 생각할 때, 처음의 집합을 **전체집합**이라 하고 보통 $U$로 나타냅니다. 벤 다이어그램에서는 전체집합을 직사각형으로 그립니다.\n\n' +
          '전체집합 $U$의 부분집합 $A$에 대하여, $U$의 원소 중 $A$에 속하지 않는 모든 원소로 이루어진 집합을 $A$의 **여집합**이라 하며 기호로 $A^{C}$처럼 나타냅니다.\n\n' +
          '$A^{C}=\\{x \\mid x \\in U \\text{ 그리고 } x \\notin A\\}$\n\n' +
          '예: $U=\\{1, 2, 3, 4, 5, 6\\}$, $A=\\{1, 2, 3\\}$이면 $A^{C}=\\{4, 5, 6\\}$입니다.\n\n' +
          '여집합에는 다음 성질이 있습니다.\n' +
          '- $A \\cup A^{C}=U$, $A \\cap A^{C}=\\varnothing$\n' +
          '- $(A^{C})^{C}=A$\n' +
          '- $U^{C}=\\varnothing$, $\\varnothing^{C}=U$\n\n' +
          '> ⚠️ 여집합은 전체집합에 따라 달라집니다. 같은 $A=\\{1, 2, 3\\}$이라도 $U=\\{1, 2, 3, 4\\}$이면 $A^{C}=\\{4\\}$입니다.',
        easy: '전체집합은 "이번에 생각하는 모든 것이 담긴 큰 상자"입니다. 그 상자 안에서 $A$에 들지 않은 나머지가 $A$의 여집합입니다.\n\n' +
          '반 학생 전체를 전체집합으로, 안경을 쓴 학생을 $A$로 정하면 $A^{C}$은 안경을 쓰지 않은 학생입니다. 전체집합을 "학교 전체 학생"으로 바꾸면 $A^{C}$도 달라집니다.',
        fig: venn('one', { names: ['A'], U: 'U', shade: function (a) { return !a; }, t: { a: '1, 2, 3', out: '4, 5, 6' },
          alt: '직사각형 U 안에 원 A가 있는 벤 다이어그램. 원 안에 1, 2, 3, 원 밖에 4, 5, 6이 있고, 원 밖(여집합)이 칠해져 있다' }),
        check: {
          type: 'short', check: 'set',
          q: '$U=\\{1, 2, 3, 4, 5, 6, 7, 8\\}$, $A=\\{2, 4, 6, 8\\}$일 때, $A^{C}$을 원소나열법으로 나타내세요. 원소를 쉼표로 구분해 쓰세요.',
          answer: '1, 3, 5, 7',
          wrong: [{ a: '2, 4, 6, 8', why: '$A$를 그대로 썼습니다. 여집합은 $U$의 원소 중 $A$에 없는 원소입니다.' }],
          explain: '$U$의 원소 중 $A$에 속하지 않는 것은 1, 3, 5, 7이므로 $A^{C}=\\{1, 3, 5, 7\\}$입니다.',
        },
      },
      {
        title: '차집합',
        body: '집합 $A$에 속하지만 집합 $B$에는 속하지 않는 모든 원소로 이루어진 집합을 $A$에 대한 $B$의 **차집합**이라 하고 $A-B$로 나타냅니다.\n\n' +
          '$A-B=\\{x \\mid x \\in A \\text{ 그리고 } x \\notin B\\}$\n\n' +
          '"$B$에 속하지 않는다"는 "$B^{C}$에 속한다"와 같으므로 다음이 성립합니다.\n\n' +
          '$A-B=A \\cap B^{C}$\n\n' +
          '예: $A=\\{1, 2, 3, 4\\}$, $B=\\{3, 4, 5\\}$이면 $A-B=\\{1, 2\\}$, $B-A=\\{5\\}$입니다. 이처럼 일반적으로 $A-B \\ne B-A$입니다.\n\n' +
          '여집합도 차집합으로 나타낼 수 있습니다: $A^{C}=U-A$',
        easy: '차집합 $A-B$는 "$A$의 명단에서 $B$에도 있는 사람을 지운 것"입니다. 축구부 명단에서 독서부도 하는 학생을 지우면 "축구부만 하는 학생"이 남습니다.\n\n' +
          '어느 명단에서 지우느냐에 따라 남는 사람이 달라지므로 $A-B$와 $B-A$는 보통 다릅니다.',
        fig: venn('two', { names: ['A', 'B'], U: 'U', shade: shadeOf(['a']), t: { a: '1, 2', ab: '3, 4', b: '5' },
          alt: '직사각형 U 안에 겹친 두 원 A, B가 있는 벤 다이어그램. A에만 1, 2, 겹친 부분에 3, 4, B에만 5가 있고, A에만 속하는 부분(차집합 A-B)이 칠해져 있다' }),
        check: {
          type: 'ox',
          q: '$A-B=A \\cap B^{C}$입니다.',
          answer: true,
          explain: '$A-B$는 "$A$에 속하고 $B$에 속하지 않는" 원소의 집합이고, "$B$에 속하지 않는다"는 "$B^{C}$에 속한다"와 같습니다. 그래서 $A-B=A \\cap B^{C}$입니다.',
        },
      },
      {
        title: '집합의 연산 법칙',
        body: '집합의 연산에서도 수의 계산처럼 다음 법칙이 성립합니다.\n\n' +
          '| 법칙 | 합집합 | 교집합 |\n|---|---|---|\n' +
          '| 교환법칙 | $A \\cup B=B \\cup A$ | $A \\cap B=B \\cap A$ |\n' +
          '| 결합법칙 | $(A \\cup B) \\cup C=A \\cup (B \\cup C)$ | $(A \\cap B) \\cap C=A \\cap (B \\cap C)$ |\n' +
          '| 분배법칙 | $A \\cup (B \\cap C)=(A \\cup B) \\cap (A \\cup C)$ | $A \\cap (B \\cup C)=(A \\cap B) \\cup (A \\cap C)$ |\n\n' +
          '교환법칙과 결합법칙은 "또는", "그리고"로 잇는 순서와 묶음을 바꾸어도 뜻이 같다는 것입니다. 결합법칙이 성립하므로 괄호 없이 $A \\cup B \\cup C$, $A \\cap B \\cap C$처럼 씁니다.\n\n' +
          '분배법칙은 벤 다이어그램으로 확인할 수 있습니다. 아래 그림은 $B \\cup C$ 가운데 $A$와 겹치는 부분, 곧 $A \\cap (B \\cup C)$를 칠한 것입니다. $A \\cap B$와 $A \\cap C$를 각각 칠해 합쳐 보아도 똑같은 부분이 칠해집니다.\n\n' +
          '> 💡 수에서는 $a\\times(b+c)=a\\times b+a\\times c$만 성립하지만, 집합에서는 합집합과 교집합의 자리를 바꾼 분배법칙도 함께 성립합니다.',
        easy: '분배법칙을 말로 풀어 봅시다. "$A$이면서, $B$ 또는 $C$인 것"은 "$A$이면서 $B$인 것" 또는 "$A$이면서 $C$인 것"과 같습니다.\n\n' +
          '예를 들어 "안경을 썼으면서, 축구부 또는 독서부인 학생"은 "안경 쓴 축구부원"과 "안경 쓴 독서부원"을 합친 학생들과 같습니다.',
        fig: venn('three', { names: ['A', 'B', 'C'], shade: function (a, b, c) { return a && (b || c); },
          alt: '세 원 A, B, C가 서로 겹친 벤 다이어그램. A 가운데 B 또는 C와 겹치는 부분이 칠해져 있다' }),
        check: {
          type: 'choice',
          q: '$A \\cap (B \\cup C)$와 같은 집합은 무엇입니까?',
          choices: ['$(A \\cap B) \\cup (A \\cap C)$', '$(A \\cap B) \\cup C$', '$(A \\cup B) \\cap (A \\cup C)$'],
          answer: 0,
          why: ['', '$C$ 전체가 아니라 $C$ 가운데 $A$에 속하는 부분만 들어갑니다.', '이것은 $A \\cup (B \\cap C)$와 같습니다. 합집합과 교집합의 자리가 바뀌었습니다.'],
          explain: '분배법칙에 따라 $A \\cap (B \\cup C)=(A \\cap B) \\cup (A \\cap C)$입니다. "$A$이면서 $B$ 또는 $C$"는 "$A$이면서 $B$" 또는 "$A$이면서 $C$"입니다.',
        },
      },
      {
        title: '드모르간의 법칙',
        body: '전체집합 $U$의 두 부분집합 $A$, $B$에 대하여 다음이 성립합니다. 이것을 **드모르간의 법칙**이라고 합니다.\n\n' +
          '$(A \\cup B)^{C}=A^{C} \\cap B^{C}$, $(A \\cap B)^{C}=A^{C} \\cup B^{C}$\n\n' +
          '첫째 식을 말로 하면 "$A$ 또는 $B$에 속하는 것이 **아닌** 것"은 "$A$에도 속하지 않고 **그리고** $B$에도 속하지 않는 것"입니다. 여집합을 괄호 안으로 나누어 넣으면 합집합은 교집합으로, 교집합은 합집합으로 바뀝니다.\n\n' +
          '벤 다이어그램으로 확인해 봅시다. $A^{C}$은 원 $A$의 바깥, $B^{C}$은 원 $B$의 바깥이므로 두 부분이 겹치는 곳은 두 원 모두의 바깥입니다. 이것은 $A \\cup B$의 바깥, 곧 $(A \\cup B)^{C}$입니다(그림의 칠한 부분).\n\n' +
          '> ⚠️ $(A \\cup B)^{C}$을 $A^{C} \\cup B^{C}$처럼 기호를 그대로 둔 채 나누는 실수가 많습니다. 괄호를 풀 때 $\\cup$와 $\\cap$를 서로 바꿉니다.',
        easy: '"비도 오지 않고 눈도 오지 않는 날"은 "비나 눈이 오는 날"이 아닌 날입니다. 이것이 $(A \\cup B)^{C}=A^{C} \\cap B^{C}$입니다.\n\n' +
          '반대로 "비와 눈이 함께 오는 날이 아닌 날"은 "비가 안 오거나 눈이 안 오는 날"입니다. 이것이 $(A \\cap B)^{C}=A^{C} \\cup B^{C}$입니다. "아니다"를 괄호 안으로 들여보내면 "또는"과 "그리고"가 서로 바뀝니다.',
        fig: venn('two', { names: ['A', 'B'], U: 'U', shade: shadeOf(['out']),
          alt: '직사각형 U 안에 겹친 두 원 A, B가 있는 벤 다이어그램. 두 원의 바깥 부분이 칠해져 있다' }),
        check: {
          type: 'ox',
          q: '전체집합 $U$의 두 부분집합 $A$, $B$에 대하여 $(A \\cap B)^{C}=A^{C} \\cap B^{C}$이 항상 성립합니다.',
          answer: false,
          explain: '드모르간의 법칙에서 괄호를 풀 때 교집합은 합집합으로 바뀝니다. 바른 식은 $(A \\cap B)^{C}=A^{C} \\cup B^{C}$입니다. $A^{C} \\cap B^{C}$은 $(A \\cup B)^{C}$과 같습니다.',
        },
      },
      {
        title: '유한집합의 원소의 개수',
        body: '두 유한집합 $A$, $B$에 대하여 다음이 성립합니다.\n\n' +
          '$n(A \\cup B)=n(A)+n(B)-n(A \\cap B)$\n\n' +
          '$n(A)+n(B)$에서는 $A \\cap B$의 원소를 두 번 세었으므로 한 번 빼 주는 것입니다. 특히 $A$, $B$가 서로소이면 $n(A \\cup B)=n(A)+n(B)$입니다.\n\n' +
          '전체집합 $U$에 대하여 다음도 자주 씁니다.\n' +
          '- 여집합: $n(A^{C})=n(U)-n(A)$\n' +
          '- 차집합: $n(A-B)=n(A)-n(A \\cap B)=n(A \\cup B)-n(B)$\n\n' +
          '예: 학생 30명 가운데 수학을 좋아하는 학생이 18명, 과학을 좋아하는 학생이 15명, 둘 다 좋아하는 학생이 7명이면, 적어도 하나를 좋아하는 학생은 $18+15-7=26$명이고 둘 다 좋아하지 않는 학생은 $30-26=4$명입니다. 그림에 영역마다 학생 수를 적어 두었습니다.',
        easy: '친구들에게 "강아지 좋아하는 사람 손 들어", "고양이 좋아하는 사람 손 들어"를 차례로 물어서 손 든 횟수를 더하면, 둘 다 좋아하는 친구는 두 번 세어집니다.\n\n' +
          '그래서 둘 다 좋아하는 친구 수를 한 번 빼야 "적어도 하나를 좋아하는 친구 수"가 됩니다. 벤 다이어그램의 영역마다 수를 적어 두고 더하면 실수가 줄어듭니다.',
        fig: venn('two', { names: ['A', 'B'], U: 'U', t: { a: '11', ab: '7', b: '8', out: '4' },
          alt: '직사각형 U 안에 겹친 두 원 A(수학), B(과학)가 있는 벤 다이어그램. A에만 11, 겹친 부분에 7, B에만 8, 두 원 밖에 4라고 학생 수가 적혀 있다' }),
        check: {
          type: 'short', check: 'number',
          q: '$n(A)=10$, $n(B)=8$, $n(A \\cap B)=3$일 때, $n(A \\cup B)$를 구하세요.',
          answer: '15',
          wrong: [
            { a: '18', why: '$n(A)+n(B)$만 계산했습니다. 두 번 센 $n(A \\cap B)$를 빼야 합니다.' },
            { a: '21', why: '$n(A \\cap B)$를 더했습니다. 두 번 세었으니 빼야 합니다.' },
          ],
          explain: '$n(A \\cup B)=n(A)+n(B)-n(A \\cap B)=10+8-3=15$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '$U=\\{1, 2, 3, \\cdots, 10\\}$, $A=\\{1, 2, 3, 4, 5, 6\\}$, $B=\\{4, 5, 6, 7, 8\\}$일 때, $A \\cup B$, $A \\cap B$, $A-B$, $(A \\cup B)^{C}$을 각각 구하세요.',
        fig: venn('two', { names: ['A', 'B'], U: 'U', t: { a: '1, 2, 3', ab: '4, 5, 6', b: '7, 8', out: '9, 10' },
          alt: '직사각형 U 안에 겹친 두 원 A, B가 있는 벤 다이어그램. A에만 1, 2, 3, 겹친 부분에 4, 5, 6, B에만 7, 8, 두 원 밖에 9, 10이 있다' }),
        steps: [
          '먼저 벤 다이어그램의 네 영역에 원소를 나누어 적습니다. 겹친 부분은 4, 5, 6, $A$에만 1, 2, 3, $B$에만 7, 8, 두 원 밖은 9, 10입니다.',
          '$A \\cup B$는 두 원 안의 원소 전체이므로 $\\{1, 2, 3, 4, 5, 6, 7, 8\\}$입니다.',
          '$A \\cap B$는 겹친 부분이므로 $\\{4, 5, 6\\}$입니다.',
          '$A-B$는 $A$에만 속하는 부분이므로 $\\{1, 2, 3\\}$입니다.',
          '$(A \\cup B)^{C}$은 두 원 밖이므로 $\\{9, 10\\}$입니다.',
        ],
        answer: '$A \\cup B=\\{1, 2, \\cdots, 8\\}$, $A \\cap B=\\{4, 5, 6\\}$, $A-B=\\{1, 2, 3\\}$, $(A \\cup B)^{C}=\\{9, 10\\}$',
      },
      {
        q: '1부터 60까지의 자연수 중에서 3의 배수 또는 4의 배수는 몇 개입니까?',
        steps: [
          '3의 배수의 집합을 $A$, 4의 배수의 집합을 $B$라고 하면 구하는 것은 $n(A \\cup B)$입니다.',
          '$60 \\div 3=20$이므로 $n(A)=20$, $60 \\div 4=15$이므로 $n(B)=15$입니다.',
          '$A \\cap B$는 3의 배수이면서 4의 배수, 곧 12의 배수의 집합입니다. $60 \\div 12=5$이므로 $n(A \\cap B)=5$입니다.',
          '$n(A \\cup B)=20+15-5=30$입니다.',
        ],
        answer: '30개',
      },
    ],

    terms: [
      { term: '합집합', def: '$A$에 속하거나 $B$에 속하는 모든 원소로 이루어진 집합입니다. $A \\cup B$로 나타냅니다.' },
      { term: '교집합', def: '$A$에도 속하고 $B$에도 속하는 모든 원소로 이루어진 집합입니다. $A \\cap B$로 나타냅니다.' },
      { term: '서로소', def: '두 집합에 공통인 원소가 없어 $A \\cap B=\\varnothing$일 때, 두 집합은 서로소라고 합니다.' },
      { term: '전체집합', def: '부분집합들을 생각할 때 기준이 되는 처음의 집합입니다. 보통 $U$로 나타냅니다.' },
      { term: '여집합', def: '전체집합 $U$의 원소 중 $A$에 속하지 않는 원소 전체의 집합입니다. 기호로는 $A^{C}$처럼 씁니다. $A^{C}=U-A$' },
      { term: '차집합', def: '$A$에 속하지만 $B$에는 속하지 않는 원소 전체의 집합입니다. $A-B$로 나타내며 $A-B=A \\cap B^{C}$입니다.' },
      { term: '분배법칙', def: '$A \\cap (B \\cup C)=(A \\cap B) \\cup (A \\cap C)$, $A \\cup (B \\cap C)=(A \\cup B) \\cap (A \\cup C)$가 성립한다는 법칙입니다.' },
      { term: '드모르간의 법칙', def: '$(A \\cup B)^{C}=A^{C} \\cap B^{C}$, $(A \\cap B)^{C}=A^{C} \\cup B^{C}$이 성립한다는 법칙입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 두 집합이 서로소인 것은 무엇입니까?',
        choices: [
          '$\\{1, 3, 5\\}$, $\\{2, 4, 6\\}$',
          '$\\{1, 2\\}$, $\\{2, 3\\}$',
          '$\\{x \\mid x\\text{는 6의 약수}\\}$, $\\{x \\mid x\\text{는 4의 약수}\\}$',
          '$\\{x \\mid x\\text{는 짝수}\\}$, $\\{x \\mid x\\text{는 3의 배수}\\}$',
        ],
        answer: 0,
        why: [
          '',
          '2가 두 집합에 모두 있으므로 교집합이 $\\{2\\}$입니다.',
          '1, 2가 두 집합에 모두 있습니다(6의 약수 1, 2, 3, 6과 4의 약수 1, 2, 4).',
          '6, 12, …처럼 짝수이면서 3의 배수인 수가 있습니다.',
        ],
        explain: '홀수 집합 $\\{1, 3, 5\\}$와 짝수 집합 $\\{2, 4, 6\\}$에는 공통인 원소가 없어 교집합이 $\\varnothing$입니다. 그래서 서로소입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'set', concept: 0,
        q: '$A=\\{x \\mid x\\text{는 12의 약수}\\}$, $B=\\{x \\mid x\\text{는 18의 약수}\\}$일 때, $A \\cap B$를 원소나열법으로 나타내세요. 원소를 쉼표로 구분해 쓰세요.',
        answer: '1, 2, 3, 6',
        hint: '먼저 $A$와 $B$를 원소나열법으로 나타내 보세요.',
        wrong: [{ a: '1, 2, 3, 4, 6, 9, 12, 18', why: '합집합을 구했습니다. 교집합은 두 집합에 모두 속하는 원소만입니다.' }],
        explain: '$A=\\{1, 2, 3, 4, 6, 12\\}$, $B=\\{1, 2, 3, 6, 9, 18\\}$입니다. 두 집합에 모두 있는 원소는 1, 2, 3, 6이므로 $A \\cap B=\\{1, 2, 3, 6\\}$입니다. (12와 18의 공약수와 같습니다.)',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '전체집합 $U=\\{x \\mid x\\text{는 10 이하의 자연수}\\}$의 부분집합 $A=\\{x \\mid x\\text{는 짝수}\\}$에 대하여 $A^{C}=\\{1, 3, 5, 7, 9\\}$입니다.',
        answer: true,
        explain: '$U=\\{1, 2, \\cdots, 10\\}$에서 짝수가 아닌 원소는 1, 3, 5, 7, 9입니다. 그래서 $A^{C}=\\{1, 3, 5, 7, 9\\}$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'set', concept: 2,
        q: '$A=\\{1, 2, 3, 4, 5\\}$, $B=\\{2, 4, 6, 8\\}$일 때, $A-B$를 원소나열법으로 나타내세요. 원소를 쉼표로 구분해 쓰세요.',
        answer: '1, 3, 5',
        wrong: [
          { a: '6, 8', why: '$B-A$를 구했습니다. $A-B$는 $A$의 원소 중 $B$에 없는 것입니다.' },
          { a: '2, 4', why: '교집합을 구했습니다. 차집합은 $A$에서 $B$의 원소를 뺀 것입니다.' },
        ],
        explain: '$A$의 원소 가운데 $B$에도 있는 2, 4를 빼면 1, 3, 5가 남습니다. 그래서 $A-B=\\{1, 3, 5\\}$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 2,
        q: '임의의 두 집합 $A$, $B$에 대하여 $A-B=B-A$가 항상 성립합니다.',
        answer: false,
        explain: '$A=\\{1, 2\\}$, $B=\\{2, 3\\}$이면 $A-B=\\{1\\}$, $B-A=\\{3\\}$으로 다릅니다. 차집합은 순서를 바꾸면 보통 달라집니다. ($A=B$일 때처럼 같아지는 경우도 있지만 항상은 아닙니다.)',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 5,
        q: '$n(A)=12$, $n(B)=9$, $n(A \\cap B)=4$일 때, $n(A \\cup B)$를 구하세요.',
        answer: '17',
        wrong: [{ a: '21', why: '$n(A)+n(B)$만 계산했습니다. 두 번 센 $n(A \\cap B)$를 빼야 합니다.' }],
        explain: '$n(A \\cup B)=n(A)+n(B)-n(A \\cap B)=12+9-4=17$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'ox', concept: 4,
        q: '전체집합 $U$의 두 부분집합 $A$, $B$에 대하여 $(A \\cup B)^{C}=A^{C} \\cup B^{C}$이 항상 성립합니다.',
        answer: false,
        explain: '드모르간의 법칙에 따라 $(A \\cup B)^{C}=A^{C} \\cap B^{C}$입니다. 괄호를 풀면 합집합이 교집합으로 바뀝니다. $A^{C} \\cup B^{C}$은 $(A \\cap B)^{C}$과 같습니다.\n\n예: $U=\\{1, 2\\}$, $A=\\{1\\}$, $B=\\{2\\}$이면 $(A \\cup B)^{C}=\\varnothing$이지만 $A^{C} \\cup B^{C}=\\{2\\} \\cup \\{1\\}=U$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', unit: '명', concept: 5,
        q: '어느 반 학생 40명 가운데 버스로 등교하는 학생은 22명, 지하철로 등교하는 학생은 15명, 버스와 지하철을 모두 이용하는 학생은 6명입니다. 버스와 지하철을 모두 이용하지 않는 학생은 몇 명입니까?',
        answer: '9',
        hint: '먼저 버스 또는 지하철을 이용하는 학생 수를 구하세요.',
        wrong: [
          { a: '31', why: '버스 또는 지하철을 이용하는 학생 수입니다. 전체 40명에서 빼야 합니다.' },
          { a: '3', why: '40명에서 22명과 15명을 그냥 뺐습니다. 모두 이용하는 6명은 두 번 빠졌으니 $40-(22+15-6)$을 계산해 보세요.' },
        ],
        explain: '버스 이용 학생의 집합을 $A$, 지하철 이용 학생의 집합을 $B$라 하면 $n(A \\cup B)=22+15-6=31$입니다. 둘 다 이용하지 않는 학생은 $n((A \\cup B)^{C})=40-31=9$명입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'set', concept: 2,
        q: '$U=\\{1, 2, 3, 4, 5, 6, 7, 8\\}$, $A=\\{1, 2, 3, 4\\}$, $B=\\{3, 4, 5, 6\\}$일 때, $A^{C} \\cap B$를 원소나열법으로 나타내세요. 원소를 쉼표로 구분해 쓰세요.',
        answer: '5, 6',
        hint: '$A^{C} \\cap B$는 $B$에 속하고 $A$에 속하지 않는 원소의 집합입니다.',
        wrong: [
          { a: '1, 2', why: '$A-B$를 구했습니다. $A^{C} \\cap B$는 $B-A$와 같습니다.' },
          { a: '5, 6, 7, 8', why: '$A^{C}$을 구했습니다. 그중 $B$에 속하는 원소만 남겨야 합니다.' },
        ],
        explain: '$A^{C}=\\{5, 6, 7, 8\\}$이고, 이 가운데 $B$에 속하는 원소는 5, 6입니다. 그래서 $A^{C} \\cap B=\\{5, 6\\}$입니다. 이것은 $B-A$와 같습니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 5,
        q: '$n(A)=20$, $n(B)=15$, $n(A \\cup B)=28$일 때, $n(A-B)$를 구하세요.',
        answer: '13',
        hint: '$n(A \\cap B)$를 먼저 구하거나, $A \\cup B$에서 $B$를 빼 보세요.',
        wrong: [
          { a: '5', why: '$n(A)-n(B)$를 계산했습니다. 차집합의 원소의 개수는 $n(A)-n(A \\cap B)$입니다.' },
          { a: '7', why: '$n(A \\cap B)$를 구했습니다. 여기서 한 단계 더 가야 합니다.' },
        ],
        explain: '$n(A \\cap B)=n(A)+n(B)-n(A \\cup B)=20+15-28=7$이므로 $n(A-B)=n(A)-n(A \\cap B)=20-7=13$입니다. 또는 $n(A-B)=n(A \\cup B)-n(B)=28-15=13$으로 바로 구할 수도 있습니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 2,
        q: '벤 다이어그램에서 칠한 부분을 나타내는 집합은 무엇입니까?',
        fig: venn('two', { names: ['A', 'B'], U: 'U', shade: shadeOf(['a', 'b']),
          alt: '직사각형 U 안에 겹친 두 원 A, B가 있는 벤 다이어그램. A에만 속하는 부분과 B에만 속하는 부분이 칠해져 있고, 겹친 부분과 두 원 밖은 칠해져 있지 않다' }),
        choices: ['$(A \\cup B)-(A \\cap B)$', '$(A \\cup B)^{C}$', '$A \\cap B$', '$(A \\cap B)^{C}$'],
        answer: 0,
        why: [
          '',
          '두 원 밖의 부분을 나타냅니다. 칠한 부분은 원 안에 있습니다.',
          '두 원이 겹친 부분을 나타냅니다. 칠한 부분에서 빠진 곳입니다.',
          '겹친 부분을 뺀 나머지 전체여서 두 원 밖까지 포함합니다. 칠한 부분에는 두 원 밖이 없습니다.',
        ],
        explain: '칠한 부분은 $A$에만 속하는 부분과 $B$에만 속하는 부분입니다. 두 원 전체인 $A \\cup B$에서 겹친 부분 $A \\cap B$를 뺀 것이므로 $(A \\cup B)-(A \\cap B)$입니다. $(A-B) \\cup (B-A)$로 나타낼 수도 있습니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '세 집합 $A=\\{1, 2, 3, 4\\}$, $B=\\{2, 4, 6\\}$, $C=\\{3, 4, 5\\}$에 대하여 $A \\cap (B \\cup C)$는 무엇입니까?',
        choices: ['$\\{2, 3, 4\\}$', '$\\{4\\}$', '$\\{2, 3, 4, 5, 6\\}$', '$\\{1, 2, 3, 4, 5, 6\\}$'],
        answer: 0,
        why: [
          '',
          '$A \\cap B \\cap C$를 구했습니다. $B$와 $C$ 중 한쪽에만 있어도 됩니다.',
          '$B \\cup C$를 구한 뒤 $A$와 겹치는 원소만 남기는 것을 빠뜨렸습니다.',
          '$A \\cup B \\cup C$를 구했습니다. 괄호 밖은 교집합입니다.',
        ],
        hint: '괄호 안의 $B \\cup C$부터 구하세요.',
        explain: '$B \\cup C=\\{2, 3, 4, 5, 6\\}$이고, 이 가운데 $A$에도 있는 원소는 2, 3, 4입니다. 분배법칙으로 확인하면 $(A \\cap B) \\cup (A \\cap C)=\\{2, 4\\} \\cup \\{3, 4\\}=\\{2, 3, 4\\}$로 같습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'set', concept: 0,
        q: '전체집합 $U=\\{1, 2, 3, \\cdots, 10\\}$의 두 부분집합 $A=\\{1, 2, 3, 4, 5\\}$, $B$에 대하여 $A \\cap B=\\{2, 4\\}$, $A \\cup B=\\{1, 2, 3, 4, 5, 6, 7\\}$입니다. 집합 $B$를 원소나열법으로 나타내세요. 원소를 쉼표로 구분해 쓰세요.',
        answer: '2, 4, 6, 7',
        hint: '$A \\cup B$의 원소 중 $A$에 없는 것은 반드시 $B$에 있습니다.',
        wrong: [
          { a: '6, 7', why: '$B-A$만 구했습니다. $A \\cap B$의 원소 2, 4도 $B$의 원소입니다.' },
          { a: '1, 3, 5, 6, 7', why: '$A \\cap B=\\{2, 4\\}$이므로 1, 3, 5는 $B$에 없습니다.' },
        ],
        explain: '$A \\cup B$의 원소 가운데 $A$에 없는 6, 7은 $B$의 원소입니다. 또 $A \\cap B=\\{2, 4\\}$이므로 2, 4는 $B$에 있고, $A$의 나머지 1, 3, 5는 $B$에 없습니다. 그래서 $B=\\{2, 4, 6, 7\\}$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: '개', concept: 5,
        q: '1부터 100까지의 자연수 가운데 2의 배수도 아니고 3의 배수도 아닌 수는 몇 개입니까?',
        answer: '33',
        hint: '"2의 배수도 아니고 3의 배수도 아닌 수"는 "2의 배수 또는 3의 배수"의 여집합입니다.',
        wrong: [
          { a: '67', why: '2의 배수 또는 3의 배수의 개수입니다. 전체 100개에서 빼야 합니다.' },
          { a: '17', why: '2의 배수 50개와 3의 배수 33개를 빼기만 하고, 두 번 뺀 6의 배수 16개를 다시 더하지 않았습니다.' },
        ],
        explain: '2의 배수의 집합을 $A$, 3의 배수의 집합을 $B$라 하면 $n(A)=50$, $n(B)=33$이고, $A \\cap B$는 6의 배수의 집합이므로 $n(A \\cap B)=16$입니다.\n\n$n(A \\cup B)=50+33-16=67$이고, 드모르간의 법칙에 따라 $A^{C} \\cap B^{C}=(A \\cup B)^{C}$이므로 구하는 개수는 $100-67=33$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'set', concept: 4,
        q: '$U=\\{x \\mid x\\text{는 10 이하의 자연수}\\}$의 두 부분집합 $A=\\{x \\mid x\\text{는 짝수}\\}$, $B=\\{x \\mid x\\text{는 3의 배수}\\}$에 대하여 $A^{C} \\cap B^{C}$을 원소나열법으로 나타내세요. 원소를 쉼표로 구분해 쓰세요.',
        answer: '1, 5, 7',
        hint: '드모르간의 법칙으로 $A^{C} \\cap B^{C}=(A \\cup B)^{C}$입니다.',
        wrong: [
          { a: '1, 3, 5, 7, 9', why: '$A^{C}$만 구했습니다. 3, 9는 3의 배수이므로 $B^{C}$에 속하지 않습니다.' },
          { a: '1, 2, 4, 5, 7, 8, 10', why: '$B^{C}$만 구했습니다. 짝수는 $A^{C}$에 속하지 않습니다.' },
        ],
        explain: '$A \\cup B=\\{2, 3, 4, 6, 8, 9, 10\\}$이므로 드모르간의 법칙에 따라 $A^{C} \\cap B^{C}=(A \\cup B)^{C}=\\{1, 5, 7\\}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 0,
        q: '두 집합 $A$, $B$에 대하여 $A \\cap B=A$일 때, 항상 옳은 것은 무엇입니까?',
        choices: ['$A \\subset B$', '$B \\subset A$', '$A \\cup B=A$', '$A-B=B$'],
        answer: 0,
        why: [
          '',
          '반대입니다. $A=\\{1\\}$, $B=\\{1, 2\\}$이면 $A \\cap B=A$이지만 $B \\not\\subset A$입니다.',
          '$A \\subset B$이므로 $A \\cup B=B$입니다. $A=\\{1\\}$, $B=\\{1, 2\\}$에서 확인해 보세요.',
          '$A \\subset B$이므로 $A-B=\\varnothing$입니다. $B$가 공집합이 아니면 성립하지 않습니다.',
        ],
        hint: '$A \\cap B \\subset B$는 언제나 성립합니다.',
        explain: '언제나 $A \\cap B \\subset B$이므로, $A \\cap B=A$이면 $A \\subset B$입니다. 이때 $A \\cup B=B$, $A-B=\\varnothing$이 됩니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 5,
        q: '$n(A)=15$, $n(B)=12$, $n(A \\cup B)=20$일 때, $n((A-B) \\cup (B-A))$를 구하세요.',
        answer: '13',
        hint: '$(A-B) \\cup (B-A)$는 $A \\cup B$에서 $A \\cap B$를 뺀 것입니다.',
        wrong: [
          { a: '7', why: '$n(A \\cap B)$를 구했습니다. 구하는 것은 겹친 부분을 뺀 나머지입니다.' },
          { a: '27', why: '$n(A)+n(B)$를 계산했습니다. 겹친 부분은 빼야 합니다.' },
        ],
        explain: '$n(A \\cap B)=15+12-20=7$입니다. $(A-B) \\cup (B-A)=(A \\cup B)-(A \\cap B)$이므로 원소의 개수는 $20-7=13$입니다.',
      },
    ],

    deeper: [
      {
        title: '세 집합의 원소의 개수',
        body: '세 유한집합 $A$, $B$, $C$에 대해서는 다음이 성립합니다.\n\n' +
          '$n(A \\cup B \\cup C)=n(A)+n(B)+n(C)-n(A \\cap B)-n(B \\cap C)-n(C \\cap A)+n(A \\cap B \\cap C)$\n\n' +
          '세 집합을 더하면 두 집합의 겹친 부분을 두 번씩 세므로 빼 주고, 그러면 세 집합이 모두 겹친 부분은 세 번 더하고 세 번 뺀 셈이 되어 한 번 다시 더해 줍니다.\n\n' +
          '예: 1부터 100까지 자연수 중 2, 3, 5의 배수 가운데 적어도 하나인 수는 $50+33+20-16-6-10+3=74$개입니다(6의 배수 16개, 15의 배수 6개, 10의 배수 10개, 30의 배수 3개).',
      },
      {
        title: '드모르간의 법칙과 논리',
        body: '드모르간의 법칙은 말의 논리에서도 그대로 나타납니다. "$x$는 짝수이거나 3의 배수이다"를 부정하면 "$x$는 짝수가 아니고 3의 배수도 아니다"가 됩니다.\n\n' +
          '다음 단원 "명제와 조건"에서는 조건을 만족시키는 원소 전체의 집합(진리집합)을 이용해 이런 문장의 참·거짓을 판단합니다. 그때 "또는"은 합집합, "그리고"는 교집합, "아니다"는 여집합에 대응합니다.',
      },
    ],

    faq: [
      {
        q: 'A-B랑 A∩Bᶜ가 정말 같은 거예요?',
        a: '네, 같습니다. $A-B$는 "$A$에 속하고 $B$에 속하지 않는" 원소의 집합인데, "$B$에 속하지 않는다"는 "$B^{C}$에 속한다"는 뜻입니다. 그래서 "$A$에 속하고 $B^{C}$에 속하는" 원소의 집합, 곧 $A \\cap B^{C}$입니다. 벤 다이어그램에서 둘 다 "$A$에만 속하는 부분"입니다.',
      },
      {
        q: '합집합의 원소 개수를 구할 때 왜 교집합을 빼요?',
        a: '$n(A)$를 셀 때 겹친 부분의 원소를 한 번 세고, $n(B)$를 셀 때 같은 원소를 또 한 번 셉니다. 그래서 $n(A)+n(B)$에는 겹친 부분이 두 번 들어가 있으므로 $n(A \\cap B)$를 한 번 빼 줍니다. 서로소이면 겹친 부분이 없으니 그냥 더하면 됩니다.',
      },
      {
        q: '여집합은 왜 전체집합이 꼭 있어야 해요?',
        a: '"$A$에 속하지 않는 것"이라고만 하면 범위가 정해지지 않습니다. $A=\\{1, 2\\}$의 바깥이 자연수 전체인지, 10 이하의 자연수인지에 따라 답이 다르기 때문입니다. 그래서 여집합은 언제나 전체집합 $U$를 정한 뒤에 생각합니다.',
      },
      {
        q: '드모르간의 법칙을 쉽게 외우는 방법이 있나요?',
        a: '"여집합 기호를 괄호 안으로 나누어 넣으면, 안의 기호가 뒤집힌다"고 기억하세요. $\\cup$는 $\\cap$로, $\\cap$는 $\\cup$로 바뀝니다. 헷갈릴 때는 벤 다이어그램에 직접 칠해 보면 바로 확인할 수 있습니다.',
      },
    ],

    mistakes: [
      '$(A \\cup B)^{C}=A^{C} \\cup B^{C}$처럼 괄호를 풀면서 기호를 그대로 두는 실수 — 드모르간의 법칙에 따라 $(A \\cup B)^{C}=A^{C} \\cap B^{C}$입니다.',
      '$n(A \\cup B)=n(A)+n(B)$로 그냥 더하는 실수 — 두 집합이 서로소일 때만 그렇습니다. 일반적으로는 $n(A \\cap B)$를 빼야 합니다.',
      '$A-B$와 $B-A$를 헷갈리는 실수 — $A-B$는 "$A$에서 $B$의 원소를 뺀 것", 곧 $A$에만 속하는 원소입니다.',
    ],

    gens: [
      {
        id: 'set-operations',
        level: 1,
        title: '합집합·교집합·차집합·여집합 구하기',
        make: function (R) {
          var N = R.int(8, 10), U = [], reg, tries = 0;
          for (var i = 1; i <= N; i++) U.push(i);
          // 원소마다 영역(a·ab·b·out)을 정한다. 네 영역이 모두 비지 않게
          do {
            reg = { a: [], ab: [], b: [], out: [] };
            U.forEach(function (x) { reg[R.pick(['a', 'a', 'ab', 'b', 'b', 'out'])].push(x); });
            tries++;
          } while ((!reg.a.length || !reg.ab.length || !reg.b.length || !reg.out.length) && tries < 100);
          if (!reg.a.length || !reg.ab.length || !reg.b.length || !reg.out.length) {
            reg = { a: [1, 2], ab: [3, 4], b: [5, 6], out: U.slice(6) };
          }
          function pick(keys) {
            var out = [];
            keys.forEach(function (k) { out = out.concat(reg[k]); });
            return out.sort(function (p, q) { return p - q; });
          }
          var A = pick(['a', 'ab']), B = pick(['ab', 'b']);
          var OPS = {
            cup: { tex: 'A \\cup B', j: '를', keys: ['a', 'ab', 'b'], how: '$A$와 $B$의 원소를 모두 모으고, 겹치는 원소는 한 번만 씁니다.' },
            cap: { tex: 'A \\cap B', j: '를', keys: ['ab'], how: '$A$와 $B$에 모두 속하는 원소만 고릅니다.' },
            AmB: { tex: 'A-B', j: '를', keys: ['a'], how: '$A$의 원소 가운데 $B$에도 있는 원소를 뺍니다.' },
            BmA: { tex: 'B-A', j: '를', keys: ['b'], how: '$B$의 원소 가운데 $A$에도 있는 원소를 뺍니다.' },
            Ac: { tex: 'A^{C}', j: '을', keys: ['b', 'out'], how: '$U$의 원소 가운데 $A$에 속하지 않는 원소를 고릅니다.' },
            Bc: { tex: 'B^{C}', j: '을', keys: ['a', 'out'], how: '$U$의 원소 가운데 $B$에 속하지 않는 원소를 고릅니다.' },
            cupc: { tex: '(A \\cup B)^{C}', j: '을', keys: ['out'], how: '$A$에도 $B$에도 속하지 않는 원소를 고릅니다. 드모르간의 법칙으로 $A^{C} \\cap B^{C}$과 같습니다.' },
            capc: { tex: '(A \\cap B)^{C}', j: '을', keys: ['a', 'b', 'out'], how: '$U$에서 $A \\cap B$의 원소만 뺍니다. 드모르간의 법칙으로 $A^{C} \\cup B^{C}$과 같습니다.' },
          };
          // 그 연산을 고를 학생이 흔히 헷갈리는 다른 연산
          var CONFUSE = {
            cup: [['cap', '교집합을 구했습니다. 합집합은 둘 중 하나에만 속해도 들어갑니다.']],
            cap: [['cup', '합집합을 구했습니다. 교집합은 두 집합에 모두 속하는 원소만입니다.']],
            AmB: [['BmA', '$B-A$를 구했습니다. $A-B$는 $A$에서 $B$의 원소를 뺀 것입니다.'], ['cap', '교집합을 구했습니다. 차집합은 겹치는 원소를 빼고 남은 것입니다.']],
            BmA: [['AmB', '$A-B$를 구했습니다. $B-A$는 $B$에서 $A$의 원소를 뺀 것입니다.'], ['cap', '교집합을 구했습니다. 차집합은 겹치는 원소를 빼고 남은 것입니다.']],
            Ac: [['Bc', '$B^{C}$을 구했습니다. $A$에 속하지 않는 원소를 골라야 합니다.'], ['AmB', '$A-B$를 구했습니다. 여집합은 $U$에서 $A$를 뺀 것입니다.']],
            Bc: [['Ac', '$A^{C}$을 구했습니다. $B$에 속하지 않는 원소를 골라야 합니다.'], ['BmA', '$B-A$를 구했습니다. 여집합은 $U$에서 $B$를 뺀 것입니다.']],
            cupc: [['capc', '$(A \\cap B)^{C}$을 구했습니다. $(A \\cup B)^{C}$은 두 원 모두의 바깥입니다.'], ['cup', '$A \\cup B$를 구했습니다. 그 여집합을 구해야 합니다.']],
            capc: [['cupc', '$(A \\cup B)^{C}$을 구했습니다. $(A \\cap B)^{C}$은 겹친 부분만 뺀 나머지 전체입니다.'], ['cap', '$A \\cap B$를 구했습니다. 그 여집합을 구해야 합니다.']],
          };
          var key = R.pick(Object.keys(OPS));
          var op = OPS[key];
          var ans = pick(op.keys);
          var wrong = CONFUSE[key].map(function (c) { return { a: pick(OPS[c[0]].keys).join(', '), why: c[1] }; });
          return {
            type: 'short', check: 'set', concept: key === 'cup' || key === 'cap' ? 0 : key === 'Ac' || key === 'Bc' ? 1 : key === 'AmB' || key === 'BmA' ? 2 : 4,
            q: '$U=' + setTex(U) + '$의 두 부분집합 $A=' + setTex(A) + '$, $B=' + setTex(B) + '$에 대하여 $' + op.tex + '$' + op.j +
              ' 원소나열법으로 나타내세요. 원소를 쉼표로 구분해 쓰세요.',
            answer: ans.join(', '),
            wrong: wrong,
            explain: op.how + ' 그래서 $' + op.tex + '=' + setTex(ans) + '$입니다.',
          };
        },
      },
      {
        id: 'venn-shading',
        level: 1,
        title: '벤 다이어그램의 칠한 부분을 식으로',
        make: function (R) {
          // [표기들(첫째가 기본), 영역] — 영역 모음은 서로 모두 다르다
          var EX = [
            [['A \\cup B'], ['a', 'ab', 'b'], 0],
            [['A \\cap B'], ['ab'], 0],
            [['A-B', 'A \\cap B^{C}'], ['a'], 2],
            [['B-A', 'B \\cap A^{C}'], ['b'], 2],
            [['A^{C}', 'U-A'], ['b', 'out'], 1],
            [['B^{C}', 'U-B'], ['a', 'out'], 1],
            [['(A \\cup B)^{C}', 'A^{C} \\cap B^{C}'], ['out'], 4],
            [['(A \\cap B)^{C}', 'A^{C} \\cup B^{C}'], ['a', 'b', 'out'], 4],
            [['(A-B) \\cup (B-A)', '(A \\cup B)-(A \\cap B)'], ['a', 'b'], 2],
            [['A \\cup B^{C}'], ['a', 'ab', 'out'], 1],
            [['A^{C} \\cup B'], ['ab', 'b', 'out'], 1],
          ];
          var ti = R.int(0, EX.length - 1), target = EX[ti];
          var correct = '$' + R.pick(target[0]) + '$';
          function diff(r1, r2) {
            var n = 0;
            ['a', 'ab', 'b', 'out'].forEach(function (k) { if ((r1.indexOf(k) >= 0) !== (r2.indexOf(k) >= 0)) n++; });
            return n;
          }
          var near = [], far = [];
          EX.forEach(function (e, i) { if (i !== ti) (diff(e[1], target[1]) === 1 ? near : far).push(e); });
          var order = R.shuffle(near).concat(R.shuffle(far));
          var reason = {};
          order.forEach(function (e) {
            reason['$' + e[0][0] + '$'] = '이 식이 나타내는 부분은 ' + e[1].map(function (k) { return REGION_WORD[k]; }).join(', ') + '입니다. 칠한 부분과 다릅니다.';
          });
          var pick = R.choices(correct, order.map(function (e) { return '$' + e[0][0] + '$'; }));
          var words = target[1].map(function (k) { return REGION_WORD[k]; }).join(', ');
          var a = target[1].indexOf('a') >= 0, ab = target[1].indexOf('ab') >= 0, b = target[1].indexOf('b') >= 0, out = target[1].indexOf('out') >= 0;
          var regText = { a: a, ab: ab, b: b, out: out };
          var parts = ['a', 'ab', 'b', 'out'].filter(function (k) { return regText[k]; }).length;
          return {
            type: 'choice', concept: target[2],
            q: '벤 다이어그램에서 칠한 부분을 나타내는 집합은 무엇입니까?',
            fig: venn('two', { names: ['A', 'B'], U: 'U', shade: shadeOf(target[1]),
              alt: '직사각형 U 안에 겹친 두 원 A, B가 있는 벤 다이어그램. 칠한 부분: ' + words.replace(/\$/g, '') + ' (모두 ' + parts + '곳)' }),
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || '칠한 부분과 다른 부분을 나타냅니다.'; }),
            explain: '칠한 부분은 ' + words + '입니다. 이것을 나타내는 식은 ' + target[0].map(function (t) { return '$' + t + '$'; }).join(' 또는 ') + '입니다.',
          };
        },
      },
      {
        id: 'count-two-sets',
        level: 2,
        title: '두 집합의 원소의 개수 (문장제)',
        make: function (R) {
          var PAIRS = [['수학', '과학'], ['축구', '농구'], ['강아지', '고양이'], ['국어', '영어'], ['음악', '미술'], ['산', '바다']];
          var pr = R.pick(PAIRS);
          var both = R.int(2, 8), onlyA = R.int(3, 12), onlyB = R.int(3, 12), none = R.int(1, 8);
          var nA = onlyA + both, nB = onlyB + both, uni = onlyA + onlyB + both, total = uni + none;
          var likeA = pr[0] + R.josa(pr[0], '을/를') + ' 좋아하는 학생', likeB = pr[1] + R.josa(pr[1], '을/를') + ' 좋아하는 학생';
          var kind = R.pick(['union', 'both', 'bothFromNone', 'none']);
          var q, ans, wrong = [], explain;
          var setup = '$A$를 ' + likeA + '의 집합, $B$를 ' + likeB + '의 집합이라고 합시다. ';
          if (kind === 'union') {
            q = likeA + '이 ' + nA + '명, ' + likeB + '이 ' + nB + '명이고, 둘 다 좋아하는 학생이 ' + both + '명입니다. ' + pr[0] + R.josa(pr[0], '과/와') + ' ' + pr[1] + ' 중 적어도 하나를 좋아하는 학생은 몇 명입니까?';
            ans = uni;
            wrong.push({ a: String(nA + nB), why: '두 수를 그냥 더했습니다. 둘 다 좋아하는 ' + both + '명은 두 번 세었으니 한 번 빼야 합니다.' });
            explain = setup + '$n(A \\cup B)=n(A)+n(B)-n(A \\cap B)=' + nA + '+' + nB + '-' + both + '=' + uni + '$이므로 ' + uni + '명입니다.';
          } else if (kind === 'both') {
            q = likeA + '이 ' + nA + '명, ' + likeB + '이 ' + nB + '명이고, ' + pr[0] + R.josa(pr[0], '과/와') + ' ' + pr[1] + ' 중 적어도 하나를 좋아하는 학생이 ' + uni + '명입니다. 둘 다 좋아하는 학생은 몇 명입니까?';
            ans = both;
            wrong.push({ a: String(nA + nB + uni), why: '세 수를 모두 더했습니다. $n(A \\cap B)=n(A)+n(B)-n(A \\cup B)$입니다.' });
            if (uni - nA !== both) wrong.push({ a: String(uni - nA), why: '$n(A \\cup B)-n(A)$는 ' + pr[1] + '만 좋아하는 학생 수입니다.' });
            explain = setup + '$n(A \\cup B)=n(A)+n(B)-n(A \\cap B)$에서 $' + uni + '=' + nA + '+' + nB + '-n(A \\cap B)$이므로 $n(A \\cap B)=' + both + '$, 곧 ' + both + '명입니다.';
          } else if (kind === 'bothFromNone') {
            q = '어느 반 학생 ' + total + '명 가운데 ' + likeA + '이 ' + nA + '명, ' + likeB + '이 ' + nB + '명이고, 둘 다 좋아하지 않는 학생이 ' + none + '명입니다. 둘 다 좋아하는 학생은 몇 명입니까?';
            ans = both;
            wrong.push({ a: String(uni), why: '적어도 하나를 좋아하는 학생 수입니다. 여기서 한 단계 더 가야 합니다.' });
            if (nA + nB - total !== both && nA + nB - total > 0) wrong.push({ a: String(nA + nB - total), why: '둘 다 좋아하지 않는 ' + none + '명을 빼지 않고 전체를 $n(A \\cup B)$로 썼습니다.' });
            explain = setup + '둘 다 좋아하지 않는 학생이 ' + none + '명이므로 $n(A \\cup B)=' + total + '-' + none + '=' + uni + '$입니다. 그래서 $n(A \\cap B)=n(A)+n(B)-n(A \\cup B)=' + nA + '+' + nB + '-' + uni + '=' + both + '$, 곧 ' + both + '명입니다.';
          } else {
            q = '어느 반 학생 ' + total + '명 가운데 ' + likeA + '이 ' + nA + '명, ' + likeB + '이 ' + nB + '명이고, 둘 다 좋아하는 학생이 ' + both + '명입니다. 둘 다 좋아하지 않는 학생은 몇 명입니까?';
            ans = none;
            wrong.push({ a: String(uni), why: '적어도 하나를 좋아하는 학생 수입니다. 전체 ' + total + '명에서 빼야 합니다.' });
            if (total - nA - nB > 0 && total - nA - nB !== none) wrong.push({ a: String(total - nA - nB), why: '둘 다 좋아하는 ' + both + '명을 두 번 뺐습니다. $' + total + '-(' + nA + '+' + nB + '-' + both + ')$을 계산해 보세요.' });
            explain = setup + '$n(A \\cup B)=' + nA + '+' + nB + '-' + both + '=' + uni + '$이므로, 둘 다 좋아하지 않는 학생은 $n((A \\cup B)^{C})=' + total + '-' + uni + '=' + none + '$, 곧 ' + none + '명입니다.';
          }
          wrong = wrong.filter(function (w) { return Number(w.a) !== ans; });
          return {
            type: 'short', check: 'number', unit: '명', concept: 5,
            q: q, answer: String(ans), wrong: wrong, explain: explain,
            hint: '벤 다이어그램을 그리고 아는 수를 영역에 적어 보세요.',
          };
        },
      },
      {
        id: 'intersection-range',
        level: 3,
        title: '교집합의 원소의 개수의 최댓값·최솟값',
        make: function (R) {
          var nU = R.int(20, 50);
          var nA = R.int(Math.ceil(nU / 2), nU - 3);
          var nB = R.int(nU - nA + 1, nU - 2);
          var mx = Math.min(nA, nB), mn = nA + nB - nU;
          var ask = R.pick(['max', 'min', 'sum']);
          var ans = ask === 'max' ? mx : ask === 'min' ? mn : mx + mn;
          var cands = ask === 'max'
            ? [[mn, '최솟값을 구했습니다. 가장 클 때는 작은 집합이 큰 집합에 통째로 들어갈 때입니다.'], [Math.max(nA, nB), '큰 집합의 원소의 개수입니다. 교집합은 작은 집합보다 클 수 없습니다.']]
            : ask === 'min'
              ? [[0, '$n(A)+n(B)=' + (nA + nB) + '$' + R.josa(nA + nB, '이/가') + ' $n(U)=' + nU + '$보다 크므로 $A$, $B$는 서로소가 될 수 없습니다.'], [mx, '최댓값을 구했습니다. 가장 작을 때는 $A \\cup B=U$일 때입니다.']]
              : [[mx, '최댓값만 구했습니다. 최솟값도 더해야 합니다.'], [mn, '최솟값만 구했습니다. 최댓값도 더해야 합니다.'], [nA + nB, '$n(A)+n(B)$를 계산했습니다. 교집합의 원소의 개수는 $n(A)+n(B)-n(A \\cup B)$입니다.']];
          var seen = {}, wrong = [];
          seen[ans] = true;
          cands.forEach(function (c) { if (!seen[c[0]] && c[1]) { seen[c[0]] = true; wrong.push({ a: String(c[0]), why: c[1] }); } });
          var askText = ask === 'max' ? '최댓값' : ask === 'min' ? '최솟값' : '최댓값과 최솟값의 합';
          return {
            type: 'short', check: 'number', concept: 5,
            q: '전체집합 $U$의 두 부분집합 $A$, $B$에 대하여 $n(U)=' + nU + '$, $n(A)=' + nA + '$, $n(B)=' + nB + '$일 때, $n(A \\cap B)$의 ' + askText + R.josa(ask === 'sum' ? '합' : '값', '을/를') + ' 구하세요.',
            answer: String(ans),
            wrong: wrong,
            hint: '$n(A \\cap B)=n(A)+n(B)-n(A \\cup B)$이므로 $n(A \\cup B)$가 가장 클 때와 가장 작을 때를 생각해 보세요.',
            explain: '$n(A \\cap B)=n(A)+n(B)-n(A \\cup B)=' + (nA + nB) + '-n(A \\cup B)$입니다.\n\n' +
              '- 최댓값: $n(A \\cup B)$가 가장 작을 때, 곧 ' + (nA === nB ? '$A=B$일' : '작은 집합이 큰 집합에 포함될') + ' 때 $n(A \\cup B)=' + Math.max(nA, nB) + '$이고 $n(A \\cap B)=' + mx + '$입니다.\n' +
              '- 최솟값: $n(A \\cup B)$가 가장 클 때, 곧 $A \\cup B=U$일 때 $n(A \\cup B)=' + nU + '$이고 $n(A \\cap B)=' + (nA + nB) + '-' + nU + '=' + mn + '$입니다.' +
              (ask === 'sum' ? '\n\n그래서 최댓값과 최솟값의 합은 $' + mx + '+' + mn + '=' + ans + '$입니다.' : ''),
          };
        },
      },
    ],
  });
})();
