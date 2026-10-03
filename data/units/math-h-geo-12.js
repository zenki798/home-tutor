/* 기하 · 평면과 구의 방정식
 * 평면의 법선벡터, 한 점과 법선벡터로 정한 평면의 방정식, ax+by+cz+d=0의 뜻(두 평면의 평행·수직 포함),
 * 벡터로 나타낸 구의 방정식(|p−c|=r, 지름의 양 끝으로 정한 구)을 다룬다. */
(function () {
  function rootParts(n) {
    var k = 1, m = n;
    for (var f = 2; f * f <= m; f++) {
      while (m % (f * f) === 0) { m /= f * f; k *= f; }
    }
    return { k: k, m: m };
  }
  function rootTex(n) {
    if (n === 0) return '0';
    var r = rootParts(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k) + '\\sqrt{' + r.m + '}';
  }
  function rootAns(n) {
    if (n === 0) return '0';
    var r = rootParts(n);
    if (r.m === 1) return String(r.k);
    return (r.k === 1 ? '' : r.k) + '√' + r.m;
  }
  function vt(v) { return '(' + v.join(', ') + ')'; }
  function dot(a, b) { return a.reduce(function (s, x, i) { return s + x * b[i]; }, 0); }
  var VARS = ['x', 'y', 'z'];
  function shift(v, c) { return c === 0 ? v : v + (c > 0 ? '-' + c : '+' + (-c)); }
  // 일차식의 항: 계수 1·-1 생략, 0 항 생략
  function linTex(coefs, d) {
    var s = '';
    coefs.forEach(function (k, i) {
      if (k === 0) return;
      var m = Math.abs(k);
      s += (k < 0 ? '-' : (s ? '+' : '')) + (m === 1 ? '' : m) + VARS[i];
    });
    if (d !== undefined && d !== null) {
      if (d !== 0 || !s) s += (d < 0 ? '-' + (-d) : (s ? '+' : '') + d);
    }
    return s;
  }
  // (x-a)^2 꼴
  function sqTerm(v, c) { return c === 0 ? v + '^2' : '(' + shift(v, c) + ')^2'; }
  function sphereTex(C, r2) { return sqTerm('x', C[0]) + '+' + sqTerm('y', C[1]) + '+' + sqTerm('z', C[2]) + '=' + r2; }

  var PLANE_SVG = '<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">' +
    '<polygon points="20,160 200,160 280,95 100,95" fill="var(--fig-1)" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5"/>' +
    '<line x1="140" y1="130" x2="140" y2="32" stroke="var(--fig-1)" stroke-width="2.4"/>' +
    '<polygon points="140,24 134,38 146,38" fill="var(--fig-1)"/>' +
    '<line x1="140" y1="130" x2="218" y2="112" stroke="var(--fig-2)" stroke-width="2.2"/>' +
    '<polygon points="226,110 212,106 215,118" fill="var(--fig-2)"/>' +
    '<polyline points="140,120 149,118 149,128" fill="none" stroke="currentColor" stroke-width="1.2"/>' +
    '<circle cx="140" cy="130" r="3" fill="currentColor"/><circle cx="226" cy="110" r="3" fill="currentColor"/>' +
    '<text x="124" y="146" font-size="13" fill="currentColor">A</text>' +
    '<text x="232" y="108" font-size="13" fill="currentColor">P</text>' +
    '<text x="150" y="44" font-size="14" fill="var(--fig-1)" font-style="italic" font-weight="bold">n</text>' +
    '<text x="34" y="152" font-size="14" fill="currentColor" font-style="italic">α</text>' +
    '</svg>';

  var SPHERE_SVG = '<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="180" cy="95" r="75" fill="var(--fig-1)" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>' +
    '<ellipse cx="180" cy="95" rx="75" ry="20" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>' +
    '<line x1="180" y1="95" x2="233" y2="42" stroke="currentColor" stroke-width="1.5"/>' +
    '<text x="212" y="78" font-size="13" fill="currentColor" font-style="italic">r</text>' +
    '<line x1="30" y1="190" x2="176" y2="98" stroke="var(--fig-2)" stroke-width="2.2"/>' +
    '<polygon points="180,95 166,98 172,107" fill="var(--fig-2)"/>' +
    '<line x1="30" y1="190" x2="229" y2="46" stroke="var(--fig-3)" stroke-width="2.2"/>' +
    '<polygon points="233,42 219,46 225,55" fill="var(--fig-3)"/>' +
    '<circle cx="30" cy="190" r="3" fill="currentColor"/><circle cx="180" cy="95" r="3" fill="currentColor"/><circle cx="233" cy="42" r="3" fill="currentColor"/>' +
    '<text x="16" y="204" font-size="13" fill="currentColor">O</text>' +
    '<text x="186" y="112" font-size="13" fill="currentColor">C</text>' +
    '<text x="239" y="40" font-size="13" fill="currentColor">P</text>' +
    '<text x="96" y="160" font-size="14" fill="var(--fig-2)" font-style="italic" font-weight="bold">c</text>' +
    '<text x="120" y="112" font-size="14" fill="var(--fig-3)" font-style="italic" font-weight="bold">p</text>' +
    '</svg>';

  Tutor.registerUnit({
    id: 'math-h-geo-12',
    course: 'math-h-geo',
    title: '평면과 구의 방정식',
    summary: '좌표공간에서 법선벡터를 이용해 평면의 방정식을 구하고, 구의 방정식을 벡터로 나타냅니다.',
    goals: [
      '평면의 법선벡터의 뜻을 알고, 한 점과 법선벡터로 평면의 방정식을 구할 수 있다.',
      '일차방정식 ax+by+cz+d=0이 나타내는 평면과 그 법선벡터를 말할 수 있다.',
      '법선벡터를 이용하여 두 평면의 평행·수직을 판단할 수 있다.',
      '중심의 위치벡터와 반지름으로 구의 방정식을 벡터로 나타내고, 중심과 반지름을 구할 수 있다.',
    ],
    standards: ['[12기하03-05]'],

    concepts: [
      {
        title: '평면의 법선벡터',
        body: '직선 $l$이 평면 $\\alpha$ 위의 모든 직선과 수직일 때 $l$과 $\\alpha$는 수직이라고 했습니다. 평면 $\\alpha$에 수직인 직선의 방향벡터, 곧 평면에 수직인 영벡터가 아닌 벡터 $\\vec{n}$을 평면 $\\alpha$의 **법선벡터**라고 합니다.\n\n- 법선벡터는 평면 위의 어떤 두 점을 이은 벡터와도 수직입니다.\n- 한 점 $\\mathrm{A}$와 법선벡터 $\\vec{n}$이 주어지면 평면은 **하나로** 정해집니다. ($\\mathrm{A}$를 지나고 $\\vec{n}$에 수직인 평면은 하나뿐이기 때문입니다.)\n- $\\vec{n}$에 0이 아닌 실수를 곱한 $k\\vec{n}$도 같은 평면의 법선벡터입니다.\n- 법선벡터가 평행한 두 평면은 서로 평행하거나 일치합니다.\n\n앞 단원에서 좌표평면의 직선이 "한 점 + 법선벡터"로 정해진 것과 같은 생각입니다. 공간에서는 같은 조건이 직선이 아니라 **평면**을 정합니다.',
        easy: '책상 위에 연필을 똑바로 세워 보십시오. 연필은 책상 면의 어느 방향으로 그은 선과도 직각을 이룹니다. 이 연필의 방향이 법선벡터입니다.\n\n연필을 세운 자리(한 점)와 연필의 방향(법선벡터)을 알면 책상 면이 어떻게 놓였는지가 정해집니다. 연필이 기울면 면도 따라 기울지요.',
        fig: { type: 'svg', svg: PLANE_SVG, alt: '평면 α 위의 점 A에서 평면에 수직으로 세운 법선벡터 n, 그리고 평면 위의 점 P에 대하여 벡터 AP는 n과 수직이다' },
        check: {
          type: 'ox',
          q: '한 평면의 법선벡터는 단 하나뿐입니다.',
          answer: false,
          explain: '$\\vec{n}$이 법선벡터이면 $2\\vec{n}$, $-\\vec{n}$처럼 0이 아닌 실수배도 모두 같은 평면에 수직이므로 법선벡터입니다. 방향(직선으로서의 방향)만 하나로 정해집니다.',
        },
      },
      {
        title: '한 점과 법선벡터로 정한 평면의 방정식',
        body: '점 $\\mathrm{A}(x_1, y_1, z_1)$을 지나고 법선벡터가 $\\vec{n}=(a, b, c)$인 평면 위의 임의의 점을 $\\mathrm{P}(x, y, z)$라 하면 $\\overrightarrow{\\mathrm{AP}}\\perp\\vec{n}$이므로\n\n$(\\vec{p}-\\vec{a})\\cdot\\vec{n}=0$\n\n입니다. 이것이 평면의 벡터방정식이고, 성분으로 쓰면\n\n$a(x-x_1)+b(y-y_1)+c(z-z_1)=0$\n\n입니다. (점 $\\mathrm{P}$가 $\\mathrm{A}$와 같을 때도 $\\vec{0}\\cdot\\vec{n}=0$으로 성립합니다.)\n\n예: 점 $(1, -2, 3)$을 지나고 법선벡터가 $(2, 1, -1)$인 평면은\n\n$2(x-1)+(y+2)-(z-3)=0$, 곧 $2x+y-z+3=0$\n\n입니다.\n\n> 💡 좌표평면의 직선 $a(x-x_1)+b(y-y_1)=0$에 $z$에 관한 항 하나가 더해진 모양입니다.',
        easy: '평면 위의 점인지 알아보는 시험은 하나입니다. "점 $\\mathrm{A}$에서 그 점으로 가는 화살표가 연필(법선벡터)과 직각인가?" 직각이면 내적이 0이니, 그 조건을 성분으로 쓴 것이 평면의 방정식입니다.\n\n그래서 식을 세울 때는 법선벡터의 성분을 계수 자리에, 지나는 점의 좌표를 괄호 안에 넣으면 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '점 $(1, 0, 2)$를 지나고 법선벡터가 $(3, -1, 2)$인 평면의 방정식을 $3x-y+2z+d=0$ 꼴로 나타낼 때, 상수 $d$의 값을 구하십시오.',
          answer: '-7',
          wrong: [{ a: '7', why: '상수항의 부호를 반대로 구했습니다. $3(x-1)-y+2(z-2)$를 전개하면 상수항은 $-3-4=-7$입니다.' }],
          explain: '$3(x-1)-(y-0)+2(z-2)=0$을 전개하면 $3x-y+2z-7=0$이므로 $d=-7$입니다.',
        },
      },
      {
        title: '평면의 방정식 ax+by+cz+d=0의 뜻',
        body: '평면의 방정식 $a(x-x_1)+b(y-y_1)+c(z-z_1)=0$을 전개하면 $ax+by+cz+d=0$ 꼴의 일차방정식이 됩니다. 거꾸로 $a$, $b$, $c$ 중 적어도 하나가 0이 아니면, 일차방정식\n\n$ax+by+cz+d=0$\n\n은 **법선벡터가 $(a, b, c)$인 평면**을 나타냅니다. 곧 $x$, $y$, $z$의 계수를 차례로 쓴 벡터가 법선벡터입니다. (빠진 문자의 계수는 0입니다.)\n\n| 방정식 | 법선벡터 | 평면의 모양 |\n|---|---|---|\n| $z=3$ | $(0, 0, 1)$ | $xy$평면에 평행 |\n| $x+y=2$ | $(1, 1, 0)$ | $z$축에 평행 |\n| $x-2y+z=0$ | $(1, -2, 1)$ | 원점을 지남 ($d=0$) |\n\n**두 평면의 평행·수직**: 두 평면의 법선벡터를 $\\vec{n_1}$, $\\vec{n_2}$라 하면\n\n- 평행(또는 일치) $\\iff \\vec{n_1}\\parallel\\vec{n_2}$\n- 수직 $\\iff \\vec{n_1}\\cdot\\vec{n_2}=0$\n\n> ⚠️ 좌표공간에서 $x+y=2$는 직선이 아니라 평면입니다. $z$가 어떤 값이든 $x+y=2$이면 되기 때문입니다.',
        easy: '평면의 방정식은 "계수 = 연필의 방향"이라는 암호문입니다. $2x-3z+6=0$을 보면 $x$의 계수 2, $y$의 계수 0($y$가 없으니까), $z$의 계수 $-3$을 읽어 법선벡터 $(2, 0, -3)$을 바로 얻습니다.\n\n두 평면이 평행한지는 연필 두 자루가 나란한지, 수직인지는 연필 두 자루가 직각인지(내적이 0인지) 보면 됩니다.',
        check: {
          type: 'choice',
          q: '평면 $2x-3z+6=0$의 법선벡터로 알맞은 것은 무엇입니까?',
          choices: ['$(2, 0, -3)$', '$(2, -3, 6)$', '$(2, -3, 0)$', '$(0, 2, -3)$'],
          answer: 0,
          why: [
            '',
            '상수항 6까지 성분으로 넣었습니다. 법선벡터는 $x$, $y$, $z$의 계수만 씁니다.',
            '$y$가 없다는 것을 놓쳤습니다. $-3$은 $z$의 계수이므로 셋째 성분입니다.',
            '성분의 자리를 밀어 썼습니다. 첫째 성분은 $x$의 계수 2입니다.',
          ],
          explain: '$2x+0\\cdot y-3z+6=0$이므로 계수를 차례로 읽은 $(2, 0, -3)$이 법선벡터입니다.',
        },
      },
      {
        title: '벡터로 나타낸 구의 방정식',
        body: '좌표공간에서 중심이 $\\mathrm{C}$이고 반지름의 길이가 $r$인 구는 $\\overline{\\mathrm{CP}}=r$인 점 $\\mathrm{P}$ 전체입니다. 중심의 위치벡터를 $\\vec{c}$, 점 $\\mathrm{P}$의 위치벡터를 $\\vec{p}$라 하면\n\n$|\\vec{p}-\\vec{c}|=r$, 곧 $(\\vec{p}-\\vec{c})\\cdot(\\vec{p}-\\vec{c})=r^2$\n\n입니다. $\\vec{c}=(a, b, c)$, $\\vec{p}=(x, y, z)$로 성분을 쓰면, 앞에서 배운 구의 방정식\n\n$(x-a)^2+(y-b)^2+(z-c)^2=r^2$\n\n이 됩니다. 전개한 꼴 $x^2+y^2+z^2+Ax+By+Cz+D=0$은 완전제곱식으로 고쳐 중심과 반지름을 읽습니다.\n\n**지름의 양 끝으로 정한 구**: 두 점 $\\mathrm{A}$, $\\mathrm{B}$를 지름의 양 끝으로 하는 구 위의 점 $\\mathrm{P}$($\\mathrm{A}$, $\\mathrm{B}$가 아닌 점)는 $\\angle\\mathrm{APB}=90^\\circ$이므로\n\n$(\\vec{p}-\\vec{a})\\cdot(\\vec{p}-\\vec{b})=0$\n\n입니다($\\mathrm{P}$가 $\\mathrm{A}$나 $\\mathrm{B}$여도 성립합니다). 중심은 $\\dfrac{\\vec{a}+\\vec{b}}{2}$, 반지름은 $\\dfrac{1}{2}|\\overrightarrow{\\mathrm{AB}}|$입니다.',
        easy: '구는 "중심에서 거리가 똑같은 점들의 모임"입니다. 중심에서 구 위의 점으로 가는 화살표 $\\vec{p}-\\vec{c}$의 길이가 언제나 $r$이라는 것을 식으로 쓰면 $|\\vec{p}-\\vec{c}|=r$입니다.\n\n길이를 다루기 쉽게 제곱하면 내적 $(\\vec{p}-\\vec{c})\\cdot(\\vec{p}-\\vec{c})=r^2$이 되고, 성분으로 풀어 쓰면 익숙한 $(x-a)^2+(y-b)^2+(z-c)^2=r^2$이 나옵니다.',
        fig: { type: 'svg', svg: SPHERE_SVG, alt: '중심이 C이고 반지름이 r인 구. 원점 O에서 중심 C로 가는 위치벡터 c와 구 위의 점 P로 가는 위치벡터 p' },
        check: {
          type: 'choice',
          q: '구 $x^2+y^2+z^2-2x+4y-6z+5=0$의 중심과 반지름의 길이로 알맞은 것은 무엇입니까?',
          choices: ['중심 $(1, -2, 3)$, 반지름 $3$', '중심 $(-1, 2, -3)$, 반지름 $3$', '중심 $(1, -2, 3)$, 반지름 $9$'],
          answer: 0,
          why: ['', '중심의 부호를 반대로 읽었습니다. $x^2-2x=(x-1)^2-1$이므로 중심의 $x$좌표는 1입니다.', '$r^2=9$에서 멈추었습니다. 반지름은 $r=3$입니다.'],
          explain: '$(x-1)^2+(y+2)^2+(z-3)^2=1+4+9-5=9$이므로 중심은 $(1, -2, 3)$, 반지름은 $3$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '점 $\\mathrm{A}(2, -1, 1)$을 지나고 직선 $\\dfrac{x-1}{3}=y+2=\\dfrac{z-4}{-2}$에 수직인 평면의 방정식을 구하십시오.',
        steps: [
          '직선의 방향벡터는 분모를 읽은 $(3, 1, -2)$입니다.',
          '평면이 이 직선에 수직이므로 직선의 방향벡터가 곧 평면의 법선벡터입니다. $\\vec{n}=(3, 1, -2)$',
          '$3(x-2)+(y+1)-2(z-1)=0$을 전개하면 $3x-6+y+1-2z+2=0$입니다.',
          '정리하면 $3x+y-2z-3=0$입니다. (확인: $\\mathrm{A}$를 넣으면 $6-1-2-3=0$)',
        ],
        answer: '$3x+y-2z-3=0$',
      },
      {
        q: '두 점 $\\mathrm{A}(1, 2, -1)$, $\\mathrm{B}(3, 0, 3)$을 지름의 양 끝으로 하는 구의 방정식을 구하십시오.',
        steps: [
          '중심은 선분 $\\mathrm{AB}$의 중점이므로 $\\left(\\dfrac{1+3}{2}, \\dfrac{2+0}{2}, \\dfrac{-1+3}{2}\\right)=(2, 1, 1)$입니다.',
          '$|\\overrightarrow{\\mathrm{AB}}|=\\sqrt{2^2+(-2)^2+4^2}=\\sqrt{24}=2\\sqrt{6}$이므로 반지름은 $\\sqrt{6}$입니다.',
          '따라서 $(x-2)^2+(y-1)^2+(z-1)^2=6$입니다.',
          '벡터로 확인: $(\\vec{p}-\\vec{a})\\cdot(\\vec{p}-\\vec{b})=(x-1)(x-3)+(y-2)y+(z+1)(z-3)=x^2+y^2+z^2-4x-2y-2z=0$이고, 완전제곱식으로 고치면 같은 식이 됩니다.',
        ],
        answer: '$(x-2)^2+(y-1)^2+(z-1)^2=6$',
      },
    ],

    terms: [
      { term: '평면의 법선벡터', def: '평면에 수직인 영벡터가 아닌 벡터입니다. 평면 위의 어떤 두 점을 이은 벡터와도 수직입니다.' },
      { term: '평면의 방정식', def: '점 $(x_1, y_1, z_1)$을 지나고 법선벡터가 $(a, b, c)$인 평면은 $a(x-x_1)+b(y-y_1)+c(z-z_1)=0$입니다. 전개하면 $ax+by+cz+d=0$ 꼴이 됩니다.' },
      { term: '평면의 벡터방정식', def: '점 $\\mathrm{A}$를 지나고 법선벡터가 $\\vec{n}$인 평면을 $(\\vec{p}-\\vec{a})\\cdot\\vec{n}=0$으로 나타낸 식입니다.' },
      { term: '구의 벡터방정식', def: '중심의 위치벡터가 $\\vec{c}$, 반지름이 $r$인 구를 $|\\vec{p}-\\vec{c}|=r$로 나타낸 식입니다.' },
      { term: '두 평면의 수직', def: '두 평면의 법선벡터가 서로 수직일 때, 곧 법선벡터의 내적이 0일 때 두 평면은 수직입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 1,
        q: '점 $(1, 2, -1)$을 지나고 법선벡터가 $(3, -1, 2)$인 평면의 방정식은 무엇입니까?',
        choices: ['$3x-y+2z+1=0$', '$3x-y+2z-1=0$', '$x+2y-z+1=0$', '$3x-y+2z=0$'],
        answer: 0,
        why: [
          '',
          '상수항의 부호를 반대로 구했습니다. $3(x-1)-(y-2)+2(z+1)$의 상수항은 $-3+2+2=1$입니다.',
          '점과 법선벡터의 자리를 바꾸었습니다. 계수에는 법선벡터의 성분이 들어갑니다.',
          '원점을 지나는 평면입니다. 점 $(1, 2, -1)$을 넣으면 $3-2-2=-1\\ne0$입니다.',
        ],
        explain: '$3(x-1)-(y-2)+2(z+1)=0$을 전개하면 $3x-y+2z+1=0$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 2,
        q: '점 $(1, k, 2)$가 평면 $2x-y+3z-6=0$ 위에 있을 때, $k$의 값을 구하십시오.',
        answer: '2',
        wrong: [{ a: '-2', why: '$-k$의 부호를 놓쳤습니다. $2-k+6-6=0$에서 $k=2$입니다.' }],
        explain: '점의 좌표를 넣으면 $2\\times1-k+3\\times2-6=0$, 곧 $2-k=0$이므로 $k=2$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 2,
        q: '평면 $x-2y+2z-3=0$의 법선벡터와 **평행한** 벡터는 무엇입니까?',
        choices: ['$(-1, 2, -2)$', '$(1, 2, 2)$', '$(2, 1, 0)$', '$(1, -2, -3)$'],
        answer: 0,
        why: [
          '',
          '$y$의 계수 $-2$의 부호를 놓쳤습니다.',
          '$(1, -2, 2)\\cdot(2, 1, 0)=0$이므로 법선벡터에 수직인 벡터, 곧 평면에 평행한 벡터입니다.',
          '상수항 $-3$을 셋째 성분으로 썼습니다. 법선벡터는 $x$, $y$, $z$의 계수 $(1, -2, 2)$입니다.',
        ],
        explain: '법선벡터는 $(1, -2, 2)$이고, $(-1, 2, -2)=-1\\times(1, -2, 2)$이므로 평행합니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 2,
        q: '좌표공간에서 평면 $z=3$은 $xy$평면에 평행합니다.',
        answer: true,
        explain: '$z=3$의 법선벡터는 $(0, 0, 1)$로 $xy$평면($z=0$)의 법선벡터와 같고, 두 평면은 겹치지 않으므로 평행합니다. $z$좌표가 3인 점을 모두 모은 평면입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 1,
        q: '점 $(2, -1, 3)$을 지나고 법선벡터가 $(1, 4, -2)$인 평면의 방정식을 $x+4y-2z+d=0$ 꼴로 나타낼 때, 상수 $d$의 값을 구하십시오.',
        answer: '8',
        wrong: [{ a: '-8', why: '상수항의 부호를 반대로 구했습니다. $(x-2)+4(y+1)-2(z-3)$의 상수항은 $-2+4+6=8$입니다.' }],
        explain: '$(x-2)+4(y+1)-2(z-3)=0$을 전개하면 $x+4y-2z+8=0$이므로 $d=8$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '중심이 $(1, -2, 0)$이고 반지름의 길이가 3인 구의 방정식은 무엇입니까?',
        choices: ['$(x-1)^2+(y+2)^2+z^2=9$', '$(x+1)^2+(y-2)^2+z^2=9$', '$(x-1)^2+(y+2)^2+z^2=3$', '$(x-1)^2+(y+2)^2+z^2=6$'],
        answer: 0,
        why: [
          '',
          '중심의 좌표의 부호를 반대로 썼습니다. 괄호 안은 (변수) − (중심의 좌표)입니다.',
          '우변은 반지름의 제곱 $3^2=9$입니다.',
          '반지름에 2를 곱했습니다. 우변은 $r^2=9$입니다.',
        ],
        explain: '$|\\vec{p}-\\vec{c}|^2=r^2$을 성분으로 쓰면 $(x-1)^2+(y+2)^2+(z-0)^2=9$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', concept: 3,
        q: '구 $x^2+y^2+z^2-4x+2z-4=0$의 반지름의 길이를 구하십시오.',
        answer: '3',
        wrong: [
          { a: '9', why: '$r^2=9$까지 구했습니다. 반지름은 제곱근을 구한 3입니다.' },
          { a: '1', why: '상수항 $-4$를 우변으로 옮길 때 부호를 놓쳤습니다. $4+1+4=9$입니다.' },
        ],
        explain: '$(x-2)^2+y^2+(z+1)^2=4+1+4=9$이므로 반지름은 3입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 2,
        q: '점 $(1, 2, 3)$을 지나고 평면 $2x-y+z=0$에 평행한 평면의 방정식을 $2x-y+z+d=0$ 꼴로 나타낼 때, 상수 $d$의 값을 구하십시오.',
        answer: '-3',
        hint: '평행한 두 평면은 법선벡터가 같습니다.',
        wrong: [{ a: '3', why: '부호를 반대로 구했습니다. $2-2+3+d=0$에서 $d=-3$입니다.' }],
        explain: '평행하므로 법선벡터 $(2, -1, 1)$을 그대로 씁니다. 점을 넣으면 $2-2+3+d=0$이므로 $d=-3$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 2,
        q: '두 평면 $x+2y-z+1=0$, $3x+ky+5z-2=0$이 서로 수직일 때, 상수 $k$의 값을 구하십시오.',
        answer: '1',
        hint: '두 평면이 수직이면 법선벡터의 내적이 0입니다.',
        wrong: [{ a: '-1', why: '이항할 때 부호를 놓쳤습니다. $3+2k-5=0$에서 $k=1$입니다.' }],
        explain: '법선벡터 $(1, 2, -1)$과 $(3, k, 5)$의 내적이 0이어야 하므로 $3+2k-5=0$, $k=1$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '점 $(1, 1, 1)$을 지나고 직선 $x-2=\\dfrac{y+1}{-2}=\\dfrac{z}{3}$에 수직인 평면의 방정식은 무엇입니까?',
        choices: ['$x-2y+3z-2=0$', '$x-2y+3z=0$', '$2x-y-1=0$', '$x-2y+3z+2=0$'],
        answer: 0,
        why: [
          '',
          '점 $(1, 1, 1)$을 지나지 않습니다. 넣으면 $1-2+3=2\\ne0$입니다.',
          '직선이 지나는 점 $(2, -1, 0)$을 법선벡터로 썼습니다. 법선벡터는 직선의 방향벡터입니다.',
          '상수항의 부호를 반대로 구했습니다. $(x-1)-2(y-1)+3(z-1)$의 상수항은 $-1+2-3=-2$입니다.',
        ],
        hint: '평면에 수직인 직선의 방향벡터는 평면의 법선벡터입니다.',
        explain: '직선의 방향벡터 $(1, -2, 3)$이 법선벡터입니다. $(x-1)-2(y-1)+3(z-1)=0$, 곧 $x-2y+3z-2=0$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 3,
        q: '두 점 $\\mathrm{A}(1, 0, 2)$, $\\mathrm{B}(3, 4, -2)$를 지름의 양 끝으로 하는 구의 반지름의 길이를 구하십시오.',
        answer: '3',
        wrong: [{ a: '6', why: '지름의 길이 $|\\overrightarrow{\\mathrm{AB}}|$를 구했습니다. 반지름은 그 절반입니다.' }],
        explain: '$\\overrightarrow{\\mathrm{AB}}=(2, 4, -4)$이므로 $|\\overrightarrow{\\mathrm{AB}}|=\\sqrt{4+16+16}=6$이고, 반지름은 $3$입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', fixed: true, concept: 3,
        q: '구 $(x-1)^2+(y+2)^2+(z-3)^2=r^2$이 $xy$평면에 접할 때, 양수 $r$의 값은 무엇입니까?',
        choices: ['$1$', '$2$', '$3$', '$\\sqrt{14}$'],
        answer: 2,
        why: [
          '중심의 $x$좌표의 크기입니다. $x$좌표는 $yz$평면까지의 거리입니다.',
          '중심의 $y$좌표의 크기입니다. $y$좌표는 $zx$평면까지의 거리입니다.',
          '',
          '원점에서 중심까지의 거리입니다. $xy$평면까지의 거리는 $|z|$입니다.',
        ],
        hint: '$xy$평면에 접하면 중심에서 $xy$평면까지의 거리가 반지름입니다.',
        explain: '중심 $(1, -2, 3)$에서 $xy$평면($z=0$)까지의 거리는 $|3|=3$이므로 $r=3$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '세 점 $\\mathrm{A}(1, 0, 0)$, $\\mathrm{B}(0, 2, 0)$, $\\mathrm{C}(0, 0, 3)$을 지나는 평면의 방정식은 무엇입니까?',
        choices: ['$6x+3y+2z-6=0$', '$x+2y+3z-1=0$', '$6x+3y+2z=0$', '$2x+3y+6z-6=0$'],
        answer: 0,
        why: [
          '',
          '세 점의 좌표를 계수로 썼습니다. 점 $\\mathrm{B}$를 넣으면 $4-1\\ne0$입니다.',
          '원점을 지나는 평면입니다. 점 $\\mathrm{A}$를 넣으면 $6\\ne0$입니다.',
          '절편을 거꾸로 맞추었습니다. 이 평면은 $(3, 0, 0)$, $(0, 2, 0)$, $(0, 0, 1)$을 지납니다.',
        ],
        hint: '법선벡터 $\\vec{n}=(a, b, c)$는 $\\overrightarrow{\\mathrm{AB}}$, $\\overrightarrow{\\mathrm{AC}}$와 모두 수직입니다.',
        explain: '$\\overrightarrow{\\mathrm{AB}}=(-1, 2, 0)$, $\\overrightarrow{\\mathrm{AC}}=(-1, 0, 3)$에 수직인 $\\vec{n}=(a, b, c)$는 $-a+2b=0$, $-a+3c=0$을 만족시키므로 $a=6$으로 잡으면 $b=3$, $c=2$입니다. $6(x-1)+3y+2z=0$, 곧 $6x+3y+2z-6=0$입니다. (양변을 6으로 나누면 $x+\\dfrac{y}{2}+\\dfrac{z}{3}=1$입니다.)',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'expr', concept: 3,
        q: '두 점 $\\mathrm{A}(2, 0, 0)$, $\\mathrm{B}(0, 4, 0)$에 대하여 $\\overrightarrow{\\mathrm{PA}}\\cdot\\overrightarrow{\\mathrm{PB}}=0$을 만족시키는 점 $\\mathrm{P}$ 전체가 이루는 도형의 겉넓이를 구하십시오. ($\\pi$는 π 또는 pi로 입력합니다.)',
        answer: '20π',
        hint: '$\\overrightarrow{\\mathrm{PA}}\\cdot\\overrightarrow{\\mathrm{PB}}=(\\vec{a}-\\vec{p})\\cdot(\\vec{b}-\\vec{p})=0$은 선분 $\\mathrm{AB}$를 지름으로 하는 구입니다.',
        wrong: [
          { a: '80π', why: '선분 $\\mathrm{AB}$의 길이를 반지름으로 썼습니다. $\\mathrm{AB}$는 지름입니다.' },
          { a: '5π', why: '구의 겉넓이는 $4\\pi r^2$입니다. $4$를 곱해야 합니다.' },
        ],
        explain: '$\\overrightarrow{\\mathrm{PA}}\\cdot\\overrightarrow{\\mathrm{PB}}=0$인 점 $\\mathrm{P}$ 전체는 선분 $\\mathrm{AB}$를 지름으로 하는 구입니다. $|\\overrightarrow{\\mathrm{AB}}|=\\sqrt{4+16}=2\\sqrt{5}$이므로 반지름은 $\\sqrt{5}$이고, 겉넓이는 $4\\pi\\times5=20\\pi$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'expr', concept: 2,
        q: '원점 $\\mathrm{O}$와 평면 $x+y+z=3$ 위의 점 $\\mathrm{P}$ 사이의 거리의 최솟값을 구하십시오. (근호는 √ 또는 sqrt로 입력합니다.)',
        answer: '√3',
        hint: '가장 가까운 점은 원점에서 평면에 내린 수선의 발입니다. 그 수선은 법선벡터 $(1, 1, 1)$ 방향입니다.',
        wrong: [
          { a: '3', why: '상수항 3을 그대로 거리로 썼습니다. 원점에서 평면 위의 점 $(3, 0, 0)$까지의 거리도 3이지만, 이 점이 가장 가까운 점은 아닙니다.' },
          { a: '1', why: '수선의 발을 구할 때의 $t$ 값입니다. 이때의 점 $(1, 1, 1)$까지의 거리를 구합니다.' },
        ],
        explain: '원점을 지나고 법선벡터 $(1, 1, 1)$ 방향인 직선 위의 점은 $(t, t, t)$입니다. 평면에 넣으면 $3t=3$, $t=1$이므로 수선의 발은 $\\mathrm{H}(1, 1, 1)$입니다. 최솟값은 $|\\overrightarrow{\\mathrm{OH}}|=\\sqrt{3}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: '°', concept: 2,
        q: '두 평면 $x-z+1=0$, $y-z-2=0$이 이루는 각의 크기는 몇 도인지 구하십시오. (두 평면이 이루는 각은 $90^\\circ$ 이하의 각으로 생각합니다.)',
        answer: '60',
        hint: '두 평면이 이루는 각은 두 법선벡터로 구합니다. 직선이 이루는 각처럼 내적에 절댓값을 씌웁니다.',
        wrong: [{ a: '120', why: '$90^\\circ$ 이하의 각을 구해야 합니다. 내적에 절댓값을 씌웁니다.' }],
        explain: '법선벡터는 $(1, 0, -1)$, $(0, 1, -1)$이고 내적은 $1$, 크기는 각각 $\\sqrt{2}$입니다. $\\cos\\theta=\\dfrac{|1|}{\\sqrt{2}\\times\\sqrt{2}}=\\dfrac{1}{2}$이므로 $\\theta=60^\\circ$입니다.',
      },
    ],

    deeper: [
      {
        title: '점과 평면 사이의 거리',
        body: '점 $\\mathrm{P}(x_1, y_1, z_1)$과 평면 $\\alpha: ax+by+cz+d=0$ 사이의 거리는, 평면 위의 한 점 $\\mathrm{A}$에 대하여 $\\overrightarrow{\\mathrm{AP}}$를 법선벡터 $\\vec{n}=(a, b, c)$ 방향으로 정사영한 길이입니다.\n\n$\\dfrac{|\\overrightarrow{\\mathrm{AP}}\\cdot\\vec{n}|}{|\\vec{n}|}=\\dfrac{|ax_1+by_1+cz_1+d|}{\\sqrt{a^2+b^2+c^2}}$\n\n좌표평면의 점과 직선 사이의 거리 공식에 $z$에 관한 항이 하나 더해진 모양입니다. 예를 들어 원점과 평면 $x+y+z=3$ 사이의 거리는 $\\dfrac{|0+0+0-3|}{\\sqrt{3}}=\\sqrt{3}$으로, 수선의 발을 직접 구한 값과 같습니다.\n\n이 공식으로 구와 평면의 위치 관계도 판단할 수 있습니다. 중심에서 평면까지의 거리가 반지름보다 작으면 구와 평면은 만나서 원을 이루고, 같으면 접하고, 크면 만나지 않습니다.',
      },
    ],

    faq: [
      {
        q: '공간에서 x+y=2는 직선 아니에요?',
        a: '좌표평면에서는 직선이지만 좌표공간에서는 평면입니다. $z$에 대한 조건이 없으므로 $z$는 어떤 값이어도 되고, 그래서 좌표평면의 직선 $x+y=2$를 $z$축 방향으로 위아래로 끌어올린 평면이 됩니다. 법선벡터는 $(1, 1, 0)$입니다.',
      },
      {
        q: '같은 평면인데 방정식이 여러 개가 나와요. 뭐가 맞아요?',
        a: '양변에 0이 아닌 같은 수를 곱해도 같은 평면입니다. $2x+y-z+3=0$과 $4x+2y-2z+6=0$은 같은 평면이고, 법선벡터도 $(2, 1, -1)$과 $(4, 2, -2)$로 실수배 관계입니다. 문제에서 꼴을 정해 주면 그 꼴에 맞춰 씁니다.',
      },
      {
        q: '구의 방정식을 굳이 벡터로 쓰는 이유가 뭐예요?',
        a: '$|\\vec{p}-\\vec{c}|=r$은 "중심에서의 거리가 $r$"이라는 정의를 그대로 옮긴 식이라 뜻이 바로 보입니다. 또 $(\\vec{p}-\\vec{a})\\cdot(\\vec{p}-\\vec{b})=0$처럼 지름의 양 끝으로 구를 나타내는 등, 내적을 써서 조건을 간단히 표현할 수 있습니다.',
      },
    ],

    mistakes: [
      '평면 $2x-3z+6=0$의 법선벡터를 $(2, -3, 6)$이나 $(2, -3, 0)$으로 쓰는 실수 — 빠진 $y$의 계수는 0이고 상수항은 넣지 않으므로 $(2, 0, -3)$입니다.',
      '좌표공간에서 $x+y=2$를 직선으로 생각하는 실수 — $z$가 자유로우므로 $z$축에 평행한 평면입니다.',
      '구의 전개형에서 중심의 부호를 반대로 읽는 실수 — $x^2-2x=(x-1)^2-1$이므로 중심의 $x$좌표는 $1$입니다.',
    ],

    gens: [
      {
        id: 'plane-point-normal',
        level: 1,
        title: '한 점과 법선벡터로 평면의 방정식 구하기',
        make: function (R) {
          var n, A, d;
          do {
            n = [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)];
            A = [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)];
            d = -dot(n, A);
          } while (n.filter(function (x) { return x !== 0; }).length < 2 || d === 0);
          var wrong = [], seen = {};
          function addW(v, why) { var st = String(v); if (v !== d && !seen[st]) { seen[st] = 1; wrong.push({ a: st, why: why }); } }
          addW(-d, '상수항의 부호를 반대로 구했습니다. 전개하면 상수항은 $-(ax_1+by_1+cz_1)$입니다.');
          for (var i = 0; i < 3; i++) {
            if (n[i] * A[i] !== 0) { addW(d + 2 * n[i] * A[i], '$' + VARS[i] + '$에 관한 항을 전개할 때 부호를 잘못 계산했습니다. 점의 좌표를 넣어 0이 되는지 확인해 봅니다.'); break; }
          }
          var lhs = '';
          n.forEach(function (k, j) {
            if (k === 0) return;
            var m = Math.abs(k);
            lhs += (k < 0 ? '-' : (lhs ? '+' : '')) + (m === 1 ? '' : m) + (A[j] === 0 ? VARS[j] : '(' + shift(VARS[j], A[j]) + ')');
          });
          return {
            type: 'short', check: 'number', concept: 1,
            q: '점 $' + vt(A) + '$' + R.josa(A[2], '을/를') + ' 지나고 법선벡터가 $' + vt(n) + '$인 평면의 방정식을 $' + linTex(n) + '+d=0$ 꼴로 나타낼 때, 상수 $d$의 값을 구하십시오.',
            answer: String(d),
            wrong: wrong,
            explain: '$a(x-x_1)+b(y-y_1)+c(z-z_1)=0$에 넣으면 $' + lhs + '=0$입니다.\n\n전개하면 $' + linTex(n, d) + '=0$이므로 $d=' + d + '$입니다.',
          };
        },
      },
      {
        id: 'sphere-radius',
        level: 1,
        title: '전개한 구의 방정식에서 반지름 구하기',
        make: function (R) {
          var C, r;
          do {
            C = [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)];
            r = R.int(1, 6);
          } while (C.filter(function (x) { return x !== 0; }).length < 2);
          var S = dot(C, C);
          var D = S - r * r;
          var lin = linTex(C.map(function (c) { return -2 * c; }), D);
          var eq = 'x^2+y^2+z^2' + (lin.charAt(0) === '-' ? '' : '+') + lin + '=0';
          var wrong = [], seen = {};
          function addW(n2, why) {
            if (n2 <= 0 || n2 === r * r) return;
            var st = rootAns(n2);
            if (!seen[st]) { seen[st] = 1; wrong.push({ a: st, why: why }); }
          }
          if (r > 1) { seen[String(r * r)] = 1; wrong.push({ a: String(r * r), why: '$r^2=' + (r * r) + '$까지 구했습니다. 반지름은 그 제곱근입니다.' }); }
          addW(S + D, '상수항을 우변으로 옮길 때 부호를 놓쳤습니다. 우변은 $' + C.map(function (c) { return c * c; }).join('+') + '-' + R.fmt.paren(D) + '$입니다.');
          addW(-D, '완전제곱식으로 고치지 않고 상수항만 보았습니다. 완전제곱식을 만들 때 생기는 수도 우변으로 옮겨야 합니다.');
          var rhs = C.filter(function (c) { return c !== 0; }).map(function (c) { return c * c; }).join('+') + (D > 0 ? '-' + D : (D < 0 ? '+' + (-D) : ''));
          return {
            type: 'short', check: 'expr', concept: 3,
            q: '구 $' + eq + '$의 반지름의 길이를 구하십시오.',
            answer: String(r),
            wrong: wrong,
            explain: '완전제곱식으로 고치면\n\n$' + sqTerm('x', C[0]) + '+' + sqTerm('y', C[1]) + '+' + sqTerm('z', C[2]) + '=' + rhs + '=' + (r * r) + '$\n\n이므로 중심은 $' + vt(C) + '$, 반지름은 $' + r + '$입니다.',
          };
        },
      },
      {
        id: 'sphere-diameter',
        level: 2,
        title: '지름의 양 끝으로 정한 구의 방정식',
        make: function (R) {
          var M, h;
          do {
            M = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)];
            h = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)];
          } while (dot(M, M) === 0 || h.filter(function (x) { return x !== 0; }).length < 2);
          var A = M.map(function (m, i) { return m - h[i]; });
          var B = M.map(function (m, i) { return m + h[i]; });
          var r2 = dot(h, h);
          var correct = '$' + sphereTex(M, r2) + '$';
          var cands = [
            ['$' + sphereTex(M, 4 * r2) + '$', '지름의 길이를 반지름으로 썼습니다. 반지름은 $\\dfrac{1}{2}|\\overrightarrow{\\mathrm{AB}}|$입니다.'],
            ['$' + sphereTex(M.map(function (m) { return -m; }), r2) + '$', '중심의 좌표의 부호를 반대로 썼습니다. 괄호 안은 (변수) − (중심의 좌표)입니다.'],
            ['$' + sphereTex(M, rootTex(r2)) + '$', '우변에 반지름을 그대로 썼습니다. 우변은 반지름의 제곱입니다.'],
            ['$' + sphereTex(A, r2) + '$', '점 $\\mathrm{A}$를 중심으로 썼습니다. 중심은 선분 $\\mathrm{AB}$의 중점입니다.'],
          ];
          var reason = {};
          cands.forEach(function (w) { if (w[0] !== correct && !(w[0] in reason)) reason[w[0]] = w[1]; });
          var pick = R.choices(correct, Object.keys(reason));
          var AB = h.map(function (x) { return 2 * x; });
          return {
            type: 'choice', concept: 3,
            q: '두 점 $\\mathrm{A}' + vt(A) + '$, $\\mathrm{B}' + vt(B) + '$' + R.josa(B[2], '을/를') + ' 지름의 양 끝으로 하는 구의 방정식을 고르십시오.',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
            hint: '중심은 지름의 중점, 반지름은 지름의 절반입니다.',
            explain: '중심은 $\\dfrac{\\vec{a}+\\vec{b}}{2}=' + vt(M) + '$입니다. $\\overrightarrow{\\mathrm{AB}}=' + vt(AB) + '$이므로 $|\\overrightarrow{\\mathrm{AB}}|=' + rootTex(4 * r2) + '$, 반지름은 $' + rootTex(r2) + '$입니다.\n\n따라서 $' + sphereTex(M, r2) + '$입니다.',
          };
        },
      },
      {
        id: 'plane-axis-intercept',
        level: 3,
        title: '직선에 수직인 평면이 좌표축과 만나는 점',
        make: function (R) {
          var B, C, n, A, nA;
          do {
            B = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)];
            n = [R.nonzero(-3, 3), R.nonzero(-3, 3), R.nonzero(-3, 3)];
            A = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)];
            nA = dot(n, A);
          } while (nA === 0);
          C = B.map(function (b, i) { return b + n[i]; });
          var k = R.int(0, 2);
          var val = R.F(nA, n[k]);
          var wrong = [], seen = {};
          function addW(f, why) { var st = f.toString(); if (!f.eq(val) && !seen[st]) { seen[st] = 1; wrong.push({ a: st, why: why }); } }
          addW(val.neg(), '부호를 반대로 구했습니다. 평면의 방정식에 다른 두 좌표를 0으로 넣고 다시 풀어 봅니다.');
          addW(R.F(dot(n, B), n[k]), '점 $\\mathrm{B}$를 지나는 평면을 구했습니다. 평면은 점 $\\mathrm{A}$를 지납니다.');
          addW(R.F(dot(n, A) * n[k], 1), '$' + VARS[k] + '$의 계수로 나누지 않고 곱했습니다.');
          return {
            type: 'short', check: 'number', concept: 1,
            q: '점 $\\mathrm{A}' + vt(A) + '$' + R.josa(A[2], '을/를') + ' 지나고 두 점 $\\mathrm{B}' + vt(B) + '$, $\\mathrm{C}' + vt(C) + '$' + R.josa(C[2], '을/를') + ' 지나는 직선에 수직인 평면이 $' + VARS[k] + '$축과 만나는 점의 $' + VARS[k] + '$좌표를 구하십시오.',
            answer: val.toString(),
            wrong: wrong,
            hint: '직선의 방향벡터 $\\overrightarrow{\\mathrm{BC}}$가 평면의 법선벡터입니다.',
            explain: '법선벡터는 $\\overrightarrow{\\mathrm{BC}}=' + vt(n) + '$이므로 평면은 $' + linTex(n, -nA) + '=0$입니다.\n\n$' + VARS[k] + '$축 위의 점은 나머지 두 좌표가 0이므로 $' + linTex(n.map(function (x, i) { return i === k ? x : 0; }), -nA) + '=0$, 곧 $' + VARS[k] + '=' + val.toTex() + '$입니다.',
          };
        },
      },
    ],
  });
})();
