/* 기하 · 쌍곡선
 * 쌍곡선의 뜻(두 초점까지의 거리의 차가 일정), 초점·꼭짓점·주축·중심,
 * x^2/a^2-y^2/b^2=1 과 초점 (±c, 0) (c^2=a^2+b^2), 점근선 y=±(b/a)x,
 * 초점이 y축 위에 있는 쌍곡선(=-1), 평행이동한 쌍곡선, 정의를 이용한 문제. */
(function () {
  function rt(n) {
    var k = 1, m = n;
    for (var d = 2; d * d <= m; d++) { while (m % (d * d) === 0) { m /= d * d; k *= d; } }
    if (m === 1) return String(k);
    return (k === 1 ? '' : String(k)) + '\\sqrt{' + m + '}';
  }
  function isSq(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  function plusRt(m, n, sign) {
    if (isSq(n)) return String(m + sign * Math.round(Math.sqrt(n)));
    if (m === 0) return (sign < 0 ? '-' : '') + rt(n);
    return m + (sign < 0 ? '-' : '+') + rt(n);
  }
  /* 두 점 (m±√n, k) 또는 (k, m±√n) 을 한 보기 글자로 */
  function pair(onX, m, k, n) {
    if (onX) return '$(' + plusRt(m, n, 1) + ', ' + k + ')$, $(' + plusRt(m, n, -1) + ', ' + k + ')$';
    return '$(' + k + ', ' + plusRt(m, n, 1) + ')$, $(' + k + ', ' + plusRt(m, n, -1) + ')$';
  }
  function sq(v, m) {
    if (m === 0) return v + '^{2}';
    return '(' + v + (m > 0 ? '-' + m : '+' + (-m)) + ')^{2}';
  }
  function fr(top, d) { return d === 1 ? top : '\\frac{' + top + '}{' + d + '}'; }
  /* 쌍곡선: x 쪽 분모 A, y 쪽 분모 B, 우변 s(1 또는 -1), 중심 (m, n) */
  function hypTex(A, B, s, m, n) { return fr(sq('x', m), A) + '-' + fr(sq('y', n), B) + '=' + s; }
  function sumTex(terms) {
    var s = '';
    terms.forEach(function (t) {
      var c = t[0], v = t[1];
      if (c === 0) return;
      var a = Math.abs(c), sign = c < 0 ? '-' : (s ? '+' : '');
      s += sign + (v && a === 1 ? '' : String(a)) + v;
    });
    return s || '0';
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }

  /* 쌍곡선 x^2/9 - y^2/16 = 1 그림 (점근선·직사각형 선택) */
  function hypFig(withAsym, alt) {
    var f = {
      type: 'coord', xmin: -8, xmax: 8, ymin: -7, ymax: 7,
      fns: [{ expr: '4*sqrt(x^2/9-1)' }, { expr: '-4*sqrt(x^2/9-1)' }],
      points: [{ x: 5, y: 0, label: 'F' }, { x: -5, y: 0, label: "F'" }],
      alt: alt,
    };
    if (withAsym) {
      f.segments = [
        { from: [-5.25, -7], to: [5.25, 7], dashed: true }, { from: [-5.25, 7], to: [5.25, -7], dashed: true },
        { from: [-3, -4], to: [3, -4], dashed: true }, { from: [3, -4], to: [3, 4], dashed: true },
        { from: [3, 4], to: [-3, 4], dashed: true }, { from: [-3, 4], to: [-3, -4], dashed: true },
      ];
    } else {
      f.points.push({ x: 5, y: 16 / 3, label: 'P' });
      f.segments = [{ from: [5, 16 / 3], to: [5, 0] }, { from: [5, 16 / 3], to: [-5, 0] }];
    }
    return f;
  }

  /* 평행이동한 쌍곡선의 초점 고르기 */
  function shiftedFoci(R, expanded) {
    var c = R.int(2, 5), a2 = R.int(1, c * c - 1), b2 = c * c - a2;
    var m = R.int(-4, 4), n = R.int(-4, 4);
    if (m === 0 && n === 0) n = R.pick([-3, -2, 2, 3]);
    var s = R.bool() ? 1 : -1, onX = s === 1;
    var std = hypTex(a2, b2, s, m, n);
    var shown = std;
    if (expanded) {
      // b2(x-m)^2 - a2(y-n)^2 = s·a2·b2 를 전개
      shown = sumTex([[b2, 'x^{2}'], [-a2, 'y^{2}'], [-2 * b2 * m, 'x'], [2 * a2 * n, 'y'], [b2 * m * m - a2 * n * n - s * a2 * b2, '']]) + '=0';
    }
    var correct = onX ? pair(true, m, n, c * c) : pair(false, n, m, c * c);
    var cands = [
      [onX ? pair(true, -m, -n, c * c) : pair(false, -n, -m, c * c), '중심의 부호를 반대로 읽었습니다. 괄호 안의 부호와 이동 방향은 반대이므로 중심은 $(' + m + ', ' + n + ')$입니다.'],
      [onX ? pair(false, n, m, c * c) : pair(true, m, n, c * c), '주축의 방향을 잘못 잡았습니다. 우변이 1이면 초점은 중심의 왼쪽·오른쪽에, $-1$이면 위·아래에 있습니다.'],
      [onX ? pair(true, m, n, a2) : pair(false, n, m, b2), '꼭짓점을 골랐습니다. 초점은 중심에서 $c=\\sqrt{a^2+b^2}$만큼 떨어져 있어 꼭짓점보다 바깥입니다.'],
      [onX ? pair(true, 0, 0, c * c) : pair(false, 0, 0, c * c), '평행이동을 하지 않았습니다. 중심이 원점이 아니므로 초점도 같이 옮겨집니다.'],
    ];
    if (a2 !== b2) {
      cands.push([onX ? pair(true, m, n, Math.abs(a2 - b2)) : pair(false, n, m, Math.abs(a2 - b2)), '두 분모의 차로 계산했습니다. 그것은 타원의 계산이고, 쌍곡선은 $c^2=a^2+b^2$입니다.']);
    }
    var reason = {};
    cands.forEach(function (x) { if (!(x[0] in reason)) reason[x[0]] = x[1]; });
    var pick = R.choices(correct, R.shuffle(cands.map(function (x) { return x[0]; })));
    var lead = expanded ? '완전제곱식으로 묶어 정리하면 $' + std + '$입니다. ' : '';
    return {
      type: 'choice', concept: 4,
      q: '쌍곡선 $' + shown + '$의 두 초점의 좌표는 무엇입니까?',
      choices: pick.choices,
      answer: pick.answer,
      why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
      explain: lead + '중심은 $(' + m + ', ' + n + ')$이고 우변이 ' + (onX ? '1' : '$-1$') + '이므로 초점은 중심의 ' + (onX ? '왼쪽과 오른쪽' : '위와 아래') + '에 있습니다. $c^2=' + a2 + '+' + b2 + '=' + (c * c) + '$에서 $c=' + c + '$이므로 두 초점은 ' + correct + '입니다.',
    };
  }

  Tutor.registerUnit({
    id: 'math-h-geo-03',
    course: 'math-h-geo',
    title: '쌍곡선',
    summary: '두 초점까지의 거리의 차가 일정한 점들이 이루는 쌍곡선의 뜻을 알고, 쌍곡선의 방정식과 초점·꼭짓점·주축·점근선을 구합니다. 초점이 $y$축 위에 있는 쌍곡선, 평행이동한 쌍곡선, 정의를 이용한 문제도 다룹니다.',
    goals: [
      '쌍곡선의 뜻과 초점·꼭짓점·주축·중심을 설명할 수 있다.',
      '쌍곡선의 방정식 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$에서 초점의 좌표와 주축의 길이를 구할 수 있다.',
      '쌍곡선의 점근선의 방정식을 구할 수 있다.',
      '초점이 $y$축 위에 있는 쌍곡선과 평행이동한 쌍곡선을 다루고, 정의를 이용하여 문제를 해결할 수 있다.',
    ],
    standards: ['[12기하01-03]'],

    concepts: [
      {
        title: '쌍곡선의 뜻',
        body: '평면 위의 서로 다른 두 점 $\\mathrm{F}$, $\\mathrm{F}\'$에서의 **거리의 차가 일정한 점들의 집합**을 **쌍곡선**이라고 합니다. 두 점 $\\mathrm{F}$, $\\mathrm{F}\'$을 쌍곡선의 **초점**이라고 합니다.\n\n' +
          '- 두 초점을 이은 직선이 쌍곡선과 만나는 두 점을 쌍곡선의 **꼭짓점**이라고 합니다.\n' +
          '- 두 꼭짓점을 이은 선분을 **주축**이라 하고, 주축의 중점(곧 선분 $\\mathrm{FF}\'$의 중점)을 쌍곡선의 **중심**이라고 합니다.\n\n' +
          '쌍곡선은 서로 떨어진 **두 곡선**으로 이루어집니다. $\\mathrm{F}$에 가까운 쪽 곡선에서는 $\\overline{\\mathrm{PF}\'}-\\overline{\\mathrm{PF}}$가, $\\mathrm{F}\'$에 가까운 쪽 곡선에서는 $\\overline{\\mathrm{PF}}-\\overline{\\mathrm{PF}\'}$가 같은 값입니다. 그래서 정의를 $|\\overline{\\mathrm{PF}}-\\overline{\\mathrm{PF}\'}|=(\\text{일정})$으로 씁니다.\n\n' +
          '그림은 두 초점이 $\\mathrm{F}(5, 0)$, $\\mathrm{F}\'(-5, 0)$이고 거리의 차가 6인 쌍곡선입니다. 점 $\\mathrm{P}\\left(5, \\frac{16}{3}\\right)$에서 $\\overline{\\mathrm{PF}}=\\frac{16}{3}$, $\\overline{\\mathrm{PF}\'}=\\frac{34}{3}$이고 차는 6입니다.\n\n' +
          '> ⚠️ 삼각형의 두 변의 길이의 차는 나머지 한 변보다 작으므로, 거리의 차는 두 초점 사이의 거리보다 작아야 합니다.',
        easy: '타원은 "두 거리의 **합**이 일정", 쌍곡선은 "두 거리의 **차**가 일정"입니다. 한 글자 차이지만 모양은 전혀 다릅니다.\n\n' +
          '두 가로등 $\\mathrm{F}$, $\\mathrm{F}\'$ 사이에서 "$\\mathrm{F}\'$까지가 $\\mathrm{F}$까지보다 언제나 6 m 더 먼 곳"을 모두 찾아 표시하면 $\\mathrm{F}$ 쪽으로 휘어진 곡선 하나가 생깁니다. 반대로 "$\\mathrm{F}$까지가 6 m 더 먼 곳"을 찾으면 $\\mathrm{F}\'$ 쪽에 또 하나가 생깁니다. 이 두 곡선을 합친 것이 쌍곡선입니다.',
        fig: hypFig(false, '두 초점 F(5, 0), F\'(-5, 0)을 가진 쌍곡선의 두 곡선. 오른쪽 곡선 위의 점 P(5, 16/3)에서 두 초점까지 선분이 그려져 있다'),
        check: {
          type: 'choice',
          q: '평면 위의 두 점 $\\mathrm{F}$, $\\mathrm{F}\'$에서의 **거리의 차**가 일정한 점들의 집합은 무엇입니까? (단, 일정한 값은 0보다 크고 $\\overline{\\mathrm{FF}\'}$보다 작다.)',
          choices: ['쌍곡선', '타원', '포물선'],
          answer: 0,
          why: ['', '타원은 두 초점까지의 거리의 합이 일정한 점들의 집합입니다.', '포물선은 한 점과 한 직선에서 같은 거리에 있는 점들의 집합입니다.'],
          explain: '두 초점까지의 거리의 차가 일정한 점들의 집합이 쌍곡선입니다. 합이면 타원입니다.',
        },
      },
      {
        title: '쌍곡선의 방정식 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$',
        body: '두 초점이 $\\mathrm{F}(c, 0)$, $\\mathrm{F}\'(-c, 0)$이고 거리의 차가 $2a$ ($c>a>0$)인 쌍곡선 위의 점 $\\mathrm{P}(x, y)$에 대하여\n\n' +
          '$\\left|\\sqrt{(x-c)^2+y^2}-\\sqrt{(x+c)^2+y^2}\\right|=2a$\n\n' +
          '타원과 같은 방법으로 정리하면 $(c^2-a^2)x^2-a^2y^2=a^2(c^2-a^2)$이고, $b^2=c^2-a^2$ ($b>0$)으로 놓으면\n\n' +
          '$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$\n\n' +
          '| 항목 | 값 |\n|---|---|\n' +
          '| 초점 | $(c, 0)$, $(-c, 0)$, $c^2=a^2+b^2$ |\n' +
          '| 꼭짓점 | $(a, 0)$, $(-a, 0)$ |\n' +
          '| 주축의 길이 | $2a$ |\n' +
          '| 두 초점까지의 거리의 차 | $2a$ (주축의 길이) |\n\n' +
          '타원과 달리 $c$가 가장 큽니다. 초점이 꼭짓점보다 바깥(곡선의 안쪽)에 있기 때문입니다. 또 $x=0$을 넣으면 $y^2=-b^2$이 되어 $y$축과 만나지 않습니다.\n\n' +
          '예: $\\frac{x^2}{9}-\\frac{y^2}{16}=1$은 $a=3$, $b=4$, $c=\\sqrt{9+16}=5$이므로 초점은 $(\\pm 5, 0)$, 꼭짓점은 $(\\pm 3, 0)$, 주축의 길이는 6입니다.',
        easy: '쌍곡선의 초점은 "두 분모를 **더해서** 제곱근"입니다. $\\frac{x^2}{9}-\\frac{y^2}{16}=1$이면 $9+16=25$, $\\sqrt{25}=5$이므로 초점은 $(5, 0)$과 $(-5, 0)$입니다.\n\n' +
          '타원은 빼고 쌍곡선은 더한다고 기억하면 헷갈리지 않습니다. 쌍곡선은 식에 빼기($-$)가 있으니 거꾸로 더한다고 외워도 좋습니다.',
        check: {
          type: 'short', check: 'number',
          q: '쌍곡선 $\\frac{x^2}{16}-\\frac{y^2}{9}=1$의 두 초점 사이의 거리를 구하시오.',
          answer: '10',
          wrong: [
            { a: '5', why: '$c$만 구했습니다. 두 초점 사이의 거리는 $2c$입니다.' },
            { a: '8', why: '주축의 길이 $2a$를 구했습니다. 초점은 $c=\\sqrt{a^2+b^2}$으로 구합니다.' },
          ],
          explain: '$c^2=16+9=25$이므로 $c=5$, 두 초점은 $(5, 0)$, $(-5, 0)$입니다. 두 초점 사이의 거리는 $2c=10$입니다.',
        },
      },
      {
        title: '쌍곡선의 점근선',
        body: '쌍곡선 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$을 $y$에 대하여 풀면 $y=\\pm\\frac{b}{a}\\sqrt{x^2-a^2}$입니다. $|x|$가 한없이 커지면 $\\sqrt{x^2-a^2}$은 $|x|$에 한없이 가까워지므로, 곡선은 두 직선\n\n' +
          '$y=\\frac{b}{a}x$, $y=-\\frac{b}{a}x$\n\n' +
          '에 한없이 가까워집니다. 이 두 직선을 쌍곡선의 **점근선**이라고 합니다. 곡선은 점근선에 가까워지기만 할 뿐 만나지는 않습니다.\n\n' +
          '**그리는 법**: 네 점 $(\\pm a, \\pm b)$를 꼭짓점으로 하는 직사각형을 그리면 그 두 대각선을 늘인 직선이 점근선입니다. 직사각형의 대각선의 절반의 길이는 $\\sqrt{a^2+b^2}=c$이므로, 중심에서 직사각형의 꼭짓점까지의 거리가 초점까지의 거리와 같습니다.\n\n' +
          '> 💡 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$의 우변 1을 0으로 바꾼 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=0$을 인수분해하면 $\\left(\\frac{x}{a}-\\frac{y}{b}\\right)\\left(\\frac{x}{a}+\\frac{y}{b}\\right)=0$, 곧 두 점근선이 됩니다.',
        easy: '쌍곡선의 두 곡선은 멀리 갈수록 거의 곧은 선처럼 펴집니다. 그 곧은 선이 점근선입니다. 마치 기찻길 옆을 달리는 길이 점점 기찻길에 붙어 가는데 끝내 만나지는 않는 것과 비슷합니다.\n\n' +
          '기울기는 "$y$ 쪽 분모의 제곱근 ÷ $x$ 쪽 분모의 제곱근"입니다. $\\frac{x^2}{9}-\\frac{y^2}{16}=1$이면 $\\frac{4}{3}$이므로 점근선은 $y=\\pm\\frac{4}{3}x$입니다.',
        fig: hypFig(true, '쌍곡선 x²/9 - y²/16 = 1과 두 점근선 y = ±(4/3)x(점선), 네 점 (±3, ±4)를 꼭짓점으로 하는 점선 직사각형'),
        check: {
          type: 'choice',
          q: '쌍곡선 $\\frac{x^2}{9}-\\frac{y^2}{4}=1$의 점근선의 방정식은 무엇입니까?',
          choices: ['$y=\\pm\\frac{2}{3}x$', '$y=\\pm\\frac{3}{2}x$', '$y=\\pm\\frac{4}{9}x$'],
          answer: 0,
          why: ['', '분자와 분모를 바꾸었습니다. 기울기는 $\\frac{b}{a}$($y$ 쪽 분모의 제곱근이 분자)입니다.', '제곱근을 구하지 않았습니다. $a=3$, $b=2$이므로 기울기는 $\\frac{2}{3}$입니다.'],
          explain: '$a=3$, $b=2$이므로 점근선은 $y=\\pm\\frac{b}{a}x=\\pm\\frac{2}{3}x$입니다.',
        },
      },
      {
        title: '초점이 $y$축 위에 있는 쌍곡선',
        body: '두 초점이 $(0, c)$, $(0, -c)$이고 거리의 차가 $2b$ ($c>b>0$)인 쌍곡선의 방정식은 같은 방법으로\n\n' +
          '$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=-1$ ($a^2=c^2-b^2$)\n\n' +
          '입니다. 우변이 $-1$이라는 점이 핵심입니다.\n\n' +
          '| 방정식 | 초점 | 꼭짓점 | 주축의 길이 | 점근선 |\n|---|---|---|---|---|\n' +
          '| $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ | $(\\pm c, 0)$ | $(\\pm a, 0)$ | $2a$ | $y=\\pm\\frac{b}{a}x$ |\n' +
          '| $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=-1$ | $(0, \\pm c)$ | $(0, \\pm b)$ | $2b$ | $y=\\pm\\frac{b}{a}x$ |\n\n' +
          '두 경우 모두 $c^2=a^2+b^2$이고, **점근선이 같습니다.** 같은 직사각형의 대각선을 공유하며, 하나는 좌우로, 하나는 위아래로 열려 있습니다.\n\n' +
          '예: $\\frac{x^2}{4}-\\frac{y^2}{12}=-1$은 $c^2=4+12=16$이므로 초점은 $(0, \\pm 4)$, 꼭짓점은 $(0, \\pm 2\\sqrt{3})$입니다.\n\n' +
          '> ⚠️ 쌍곡선은 타원처럼 분모의 크기로 방향을 정하지 않습니다. 우변이 1이면 좌우($x$축 위), $-1$이면 위아래($y$축 위)로 열립니다.',
        easy: '$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=-1$의 양변에 $-1$을 곱하면 $\\frac{y^2}{b^2}-\\frac{x^2}{a^2}=1$이 됩니다. 이번에는 $y$ 쪽이 플러스이니 $x$와 $y$의 역할이 바뀐 것뿐입니다.\n\n' +
          '그래서 "플러스가 붙은 문자의 축 위에 초점과 꼭짓점이 있다"고 기억하면 됩니다.',
        check: {
          type: 'choice',
          q: '쌍곡선 $\\frac{x^2}{4}-\\frac{y^2}{12}=-1$의 두 초점의 좌표는 무엇입니까?',
          choices: ['$(0, 4)$, $(0, -4)$', '$(4, 0)$, $(-4, 0)$', '$(0, 2\\sqrt{2})$, $(0, -2\\sqrt{2})$'],
          answer: 0,
          why: ['', '우변이 $-1$인 것을 놓쳤습니다. 우변이 $-1$이면 초점은 $y$축 위에 있습니다.', '분모의 차로 계산했습니다. 쌍곡선은 $c^2=4+12$처럼 더합니다.'],
          explain: '우변이 $-1$이므로 초점은 $y$축 위에 있고, $c^2=4+12=16$에서 $c=4$입니다. 두 초점은 $(0, 4)$, $(0, -4)$입니다.',
        },
      },
      {
        title: '평행이동한 쌍곡선',
        body: '쌍곡선을 $x$축의 방향으로 $m$만큼, $y$축의 방향으로 $n$만큼 평행이동하면\n\n' +
          '$\\frac{(x-m)^2}{a^2}-\\frac{(y-n)^2}{b^2}=1$ (또는 $=-1$)\n\n' +
          '이 되고 중심은 $(m, n)$입니다. 초점·꼭짓점·점근선도 모두 같은 만큼 옮겨집니다.\n\n' +
          '- 우변이 1이면 초점 $(m \\pm c, n)$, 꼭짓점 $(m \\pm a, n)$\n' +
          '- 우변이 $-1$이면 초점 $(m, n \\pm c)$, 꼭짓점 $(m, n \\pm b)$\n' +
          '- 점근선: $y-n=\\pm\\frac{b}{a}(x-m)$ — 두 점근선은 중심 $(m, n)$에서 만납니다.\n\n' +
          '예: $9x^2-4y^2-18x-16y-43=0$은 $9(x-1)^2-4(y+2)^2=36$, 곧 $\\frac{(x-1)^2}{4}-\\frac{(y+2)^2}{9}=1$입니다. 중심 $(1, -2)$, $c^2=4+9=13$이므로 두 초점은 $(1 \\pm \\sqrt{13}, -2)$, 점근선은 $y+2=\\pm\\frac{3}{2}(x-1)$입니다.',
        easy: '평행이동한 쌍곡선은 원점에 있던 쌍곡선을 점근선째로 통째로 옮긴 것입니다. 원점에서 만나던 두 점근선이 이제 중심 $(m, n)$에서 만납니다.\n\n' +
          '그래서 ① 괄호를 보고 중심을 찾고, ② 원점일 때처럼 $c$와 기울기 $\\frac{b}{a}$를 구한 다음, ③ 중심을 기준으로 옮겨 적으면 됩니다.',
        check: {
          type: 'choice',
          q: '쌍곡선 $\\frac{(x-2)^2}{9}-\\frac{(y+1)^2}{16}=1$의 두 점근선의 교점의 좌표는 무엇입니까?',
          choices: ['$(2, -1)$', '$(-2, 1)$', '$(0, 0)$'],
          answer: 0,
          why: ['', '괄호 안의 부호를 그대로 읽었습니다. $(x-2)$, $(y+1)$이면 중심은 $(2, -1)$입니다.', '평행이동을 하지 않았습니다. 두 점근선은 쌍곡선의 중심에서 만납니다.'],
          explain: '두 점근선은 쌍곡선의 중심에서 만납니다. 중심은 $(2, -1)$이므로 교점도 $(2, -1)$입니다. 점근선은 $y+1=\\pm\\frac{4}{3}(x-2)$입니다.',
        },
      },
      {
        title: '쌍곡선의 정의를 이용한 문제',
        body: '쌍곡선 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여\n\n' +
          '$|\\overline{\\mathrm{PF}}-\\overline{\\mathrm{PF}\'}|=2a$ (주축의 길이)\n\n' +
          '입니다. 한 거리를 알면 다른 거리를 구할 수 있지만, **$\\mathrm{P}$가 어느 쪽 곡선 위에 있는지**에 따라 더할지 뺄지가 정해집니다.\n\n' +
          '$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$, $\\mathrm{F}(c, 0)$, $\\mathrm{F}\'(-c, 0)$일 때\n' +
          '- $\\mathrm{P}$가 오른쪽 곡선($x>0$) 위에 있으면 $\\mathrm{F}$에 더 가까우므로 $\\overline{\\mathrm{PF}\'}-\\overline{\\mathrm{PF}}=2a$\n' +
          '- $\\mathrm{P}$가 왼쪽 곡선($x<0$) 위에 있으면 $\\overline{\\mathrm{PF}}-\\overline{\\mathrm{PF}\'}=2a$\n\n' +
          '예: $\\frac{x^2}{9}-\\frac{y^2}{16}=1$의 오른쪽 곡선 위의 점 $\\mathrm{P}$에서 $\\overline{\\mathrm{PF}}=4$이면 $\\overline{\\mathrm{PF}\'}=4+6=10$입니다.\n\n' +
          '> 💡 한 곡선 위의 점에서 가까운 초점까지의 거리는 $c-a$ 이상입니다(꼭짓점에서 가장 작습니다). 그래서 오른쪽 곡선 위의 점이라도 $\\overline{\\mathrm{PF}}=4$에서 $\\overline{\\mathrm{PF}\'}=4-6$처럼 음수가 나오는 계산은 버립니다.',
        easy: '쌍곡선 위의 점에서는 먼 초점까지의 거리가 가까운 초점까지의 거리보다 언제나 주축의 길이($2a$)만큼 깁니다.\n\n' +
          '그러니 가까운 쪽 거리를 알면 $2a$를 더하고, 먼 쪽 거리를 알면 $2a$를 빼면 됩니다. 어느 쪽이 가까운지는 점이 어느 곡선 위에 있는지 보고 정합니다.',
        check: {
          type: 'short', check: 'number',
          q: '쌍곡선 $\\frac{x^2}{9}-\\frac{y^2}{16}=1$의 두 초점을 $\\mathrm{F}(5, 0)$, $\\mathrm{F}\'(-5, 0)$이라 하자. 오른쪽 곡선($x>0$) 위의 점 $\\mathrm{P}$에 대하여 $\\overline{\\mathrm{PF}}=4$일 때, $\\overline{\\mathrm{PF}\'}$의 길이를 구하시오.',
          answer: '10',
          wrong: [
            { a: '7', why: '$a=3$을 더했습니다. 거리의 차는 주축의 길이 $2a=6$입니다.' },
            { a: '6', why: '거리의 차를 답했습니다. $\\overline{\\mathrm{PF}\'}=\\overline{\\mathrm{PF}}+6$입니다.' },
          ],
          explain: '$a=3$이므로 거리의 차는 $2a=6$입니다. $\\mathrm{P}$가 오른쪽 곡선 위에 있으므로 $\\mathrm{F}$에 더 가깝고, $\\overline{\\mathrm{PF}\'}=\\overline{\\mathrm{PF}}+6=10$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '두 초점이 $(5, 0)$, $(-5, 0)$이고 주축의 길이가 6인 쌍곡선의 방정식과 점근선의 방정식을 구하시오.',
        steps: [
          '초점이 $x$축 위에 있고 중심이 원점이므로 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ 꼴입니다.',
          '주축의 길이 $2a=6$에서 $a=3$, 초점에서 $c=5$입니다.',
          '$b^2=c^2-a^2=25-9=16$이므로 방정식은 $\\frac{x^2}{9}-\\frac{y^2}{16}=1$입니다.',
          '$b=4$이므로 점근선은 $y=\\pm\\frac{4}{3}x$입니다.',
        ],
        answer: '$\\frac{x^2}{9}-\\frac{y^2}{16}=1$, 점근선 $y=\\pm\\frac{4}{3}x$',
      },
      {
        q: '쌍곡선 $9x^2-4y^2-18x-16y-43=0$의 중심, 두 초점의 좌표와 점근선의 방정식을 구하시오.',
        steps: [
          '$x$끼리, $y$끼리 묶습니다: $9(x^2-2x)-4(y^2+4y)=43$',
          '완전제곱식으로 고칩니다: $9(x-1)^2-9-4(y+2)^2+16=43$, 곧 $9(x-1)^2-4(y+2)^2=36$',
          '양변을 36으로 나누면 $\\frac{(x-1)^2}{4}-\\frac{(y+2)^2}{9}=1$이므로 중심은 $(1, -2)$입니다.',
          '우변이 1이므로 초점은 중심의 왼쪽·오른쪽에 있고, $c^2=4+9=13$이므로 두 초점은 $(1+\\sqrt{13}, -2)$, $(1-\\sqrt{13}, -2)$입니다.',
          '$a=2$, $b=3$이므로 점근선은 $y+2=\\pm\\frac{3}{2}(x-1)$입니다.',
        ],
        answer: '중심 $(1, -2)$, 초점 $(1 \\pm \\sqrt{13}, -2)$, 점근선 $y+2=\\pm\\frac{3}{2}(x-1)$',
      },
      {
        q: '두 점근선이 $y=\\pm 2x$이고 두 초점이 $(\\sqrt{5}, 0)$, $(-\\sqrt{5}, 0)$인 쌍곡선의 방정식을 구하시오.',
        steps: [
          '초점이 $x$축 위에 있으므로 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ 꼴이고, 점근선의 기울기에서 $\\frac{b}{a}=2$, 곧 $b=2a$입니다.',
          '$c^2=a^2+b^2$에 넣으면 $5=a^2+4a^2=5a^2$이므로 $a^2=1$, $b^2=4$입니다.',
          '따라서 방정식은 $x^2-\\frac{y^2}{4}=1$입니다.',
        ],
        answer: '$x^2-\\frac{y^2}{4}=1$',
      },
    ],

    terms: [
      { term: '쌍곡선', def: '평면 위의 서로 다른 두 점(초점)에서의 거리의 차가 일정한 점들의 집합입니다. 서로 떨어진 두 곡선으로 이루어집니다. 예: $\\frac{x^2}{9}-\\frac{y^2}{16}=1$' },
      { term: '쌍곡선의 초점', def: '쌍곡선을 정의하는 두 점입니다. $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$의 초점은 $(\\pm c, 0)$, $c^2=a^2+b^2$입니다.' },
      { term: '주축', def: '쌍곡선의 두 꼭짓점을 이은 선분입니다. 길이는 두 초점까지의 거리의 차와 같습니다.' },
      { term: '쌍곡선의 꼭짓점', def: '두 초점을 지나는 직선과 쌍곡선이 만나는 두 점입니다. $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$이면 $(\\pm a, 0)$입니다.' },
      { term: '쌍곡선의 중심', def: '주축의 중점이며, 두 초점을 이은 선분의 중점입니다. 두 점근선도 중심에서 만납니다.' },
      { term: '점근선', def: '곡선이 한없이 가까워지는 직선입니다. 쌍곡선 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=\\pm 1$의 점근선은 $y=\\pm\\frac{b}{a}x$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 1,
        q: '쌍곡선 $\\frac{x^2}{25}-\\frac{y^2}{11}=1$의 주축의 길이를 구하시오.',
        answer: '10',
        wrong: [
          { a: '5', why: '$a$의 값을 답했습니다. 주축의 길이는 $2a$입니다.' },
          { a: '12', why: '두 초점 사이의 거리 $2c$를 구했습니다. 주축은 두 꼭짓점을 이은 선분입니다.' },
        ],
        explain: '$a^2=25$이므로 $a=5$이고, 주축의 길이는 $2a=10$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '쌍곡선 $\\frac{x^2}{7}-\\frac{y^2}{9}=1$의 두 초점의 좌표는 무엇입니까?',
        choices: ['$(4, 0)$, $(-4, 0)$', '$(\\sqrt{2}, 0)$, $(-\\sqrt{2}, 0)$', '$(0, 4)$, $(0, -4)$', '$(\\sqrt{7}, 0)$, $(-\\sqrt{7}, 0)$'],
        answer: 0,
        why: ['', '분모의 차로 계산했습니다. 그것은 타원의 계산이고 쌍곡선은 $c^2=7+9$입니다.', '우변이 1이므로 초점은 $x$축 위에 있습니다. 쌍곡선은 분모의 크기로 방향을 정하지 않습니다.', '꼭짓점을 골랐습니다. 초점은 $c=\\sqrt{a^2+b^2}$으로 구합니다.'],
        explain: '$c^2=7+9=16$이므로 $c=4$입니다. 우변이 1이므로 두 초점은 $x$축 위의 $(4, 0)$, $(-4, 0)$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 2,
        q: '쌍곡선 $\\frac{x^2}{16}-\\frac{y^2}{9}=1$의 점근선의 방정식은 무엇입니까?',
        choices: ['$y=\\pm\\frac{3}{4}x$', '$y=\\pm\\frac{4}{3}x$', '$y=\\pm\\frac{9}{16}x$', '$y=\\pm\\frac{5}{4}x$'],
        answer: 0,
        why: ['', '분자와 분모를 바꾸었습니다. 기울기는 $\\frac{b}{a}$입니다.', '제곱근을 구하지 않았습니다. $a=4$, $b=3$입니다.', '$\\frac{c}{a}$를 계산했습니다. 점근선의 기울기는 $\\frac{b}{a}$입니다.'],
        explain: '$a=4$, $b=3$이므로 점근선은 $y=\\pm\\frac{3}{4}x$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 3,
        q: '두 쌍곡선 $\\frac{x^2}{4}-\\frac{y^2}{9}=1$과 $\\frac{x^2}{4}-\\frac{y^2}{9}=-1$의 점근선은 같습니다.',
        answer: true,
        explain: '두 쌍곡선 모두 $a=2$, $b=3$이므로 점근선은 $y=\\pm\\frac{3}{2}x$로 같습니다. 하나는 좌우로, 다른 하나는 위아래로 열려 있습니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 5,
        q: '쌍곡선 $\\frac{x^2}{16}-\\frac{y^2}{20}=1$의 두 초점을 $\\mathrm{F}(6, 0)$, $\\mathrm{F}\'(-6, 0)$이라 하자. 오른쪽 곡선($x>0$) 위의 점 $\\mathrm{P}$에 대하여 $\\overline{\\mathrm{PF}}=13$일 때, $\\overline{\\mathrm{PF}\'}$의 길이를 구하시오.',
        answer: '21',
        wrong: [
          { a: '5', why: '$2a$를 뺐습니다. 오른쪽 곡선 위의 점은 $\\mathrm{F}$에 더 가까우므로 $\\overline{\\mathrm{PF}\'}=\\overline{\\mathrm{PF}}+2a$입니다.' },
          { a: '17', why: '$a=4$만 더했습니다. 거리의 차는 주축의 길이 $2a=8$입니다.' },
        ],
        explain: '$a=4$이므로 거리의 차는 $2a=8$입니다. $\\mathrm{P}$가 오른쪽 곡선 위에 있으므로 $\\overline{\\mathrm{PF}\'}-\\overline{\\mathrm{PF}}=8$, $\\overline{\\mathrm{PF}\'}=13+8=21$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '쌍곡선 $\\frac{x^2}{9}-\\frac{y^2}{16}=-1$의 두 꼭짓점의 좌표는 무엇입니까?',
        choices: ['$(0, 4)$, $(0, -4)$', '$(3, 0)$, $(-3, 0)$', '$(0, 5)$, $(0, -5)$', '$(0, 3)$, $(0, -3)$'],
        answer: 0,
        why: ['', '우변이 $-1$인 것을 놓쳤습니다. 이 쌍곡선은 위아래로 열려 있어 꼭짓점이 $y$축 위에 있습니다.', '초점을 골랐습니다. 꼭짓점은 $(0, \\pm b)$입니다.', '$x$ 쪽 분모의 제곱근을 썼습니다. 우변이 $-1$이면 꼭짓점은 $(0, \\pm b)$, $b^2=16$입니다.'],
        explain: '우변이 $-1$이므로 $y$축 위에 꼭짓점이 있습니다. $x=0$을 넣으면 $-\\frac{y^2}{16}=-1$, $y=\\pm 4$이므로 꼭짓점은 $(0, 4)$, $(0, -4)$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'choice', concept: 4,
        q: '쌍곡선 $\\frac{(x+2)^2}{9}-\\frac{(y-1)^2}{16}=1$의 두 초점의 좌표는 무엇입니까?',
        choices: ['$(3, 1)$, $(-7, 1)$', '$(7, -1)$, $(-3, -1)$', '$(-2, 6)$, $(-2, -4)$', '$(1, 1)$, $(-5, 1)$'],
        answer: 0,
        why: ['', '중심의 부호를 반대로 읽었습니다. 중심은 $(-2, 1)$입니다.', '우변이 1이므로 초점은 중심의 왼쪽·오른쪽에 있습니다.', '꼭짓점을 골랐습니다. 중심에서 $a=3$이 아니라 $c=5$만큼 떨어진 곳이 초점입니다.'],
        hint: '중심을 찾고, 원점에 있을 때처럼 $c$를 구하세요.',
        explain: '중심은 $(-2, 1)$이고 $c^2=9+16=25$, $c=5$입니다. 우변이 1이므로 두 초점은 $(-2+5, 1)=(3, 1)$, $(-2-5, 1)=(-7, 1)$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 2,
        q: '쌍곡선 $4x^2-y^2=16$의 점근선 중 기울기가 양수인 것의 기울기를 구하시오.',
        answer: '2',
        wrong: [
          { a: '1/2', why: '기울기를 $\\frac{a}{b}$로 계산했습니다. 기울기는 $\\frac{b}{a}$입니다.' },
          { a: '4', why: '$x^2$의 계수 4를 그대로 썼습니다. 표준형으로 고치거나 $4x^2-y^2=0$을 풀어 보세요.' },
        ],
        hint: '양변을 16으로 나누어 표준형으로 고쳐 보세요.',
        explain: '양변을 16으로 나누면 $\\frac{x^2}{4}-\\frac{y^2}{16}=1$이므로 $a=2$, $b=4$입니다. 점근선은 $y=\\pm 2x$이고 양수인 기울기는 2입니다. ($4x^2-y^2=0$에서 $y=\\pm 2x$로 구해도 됩니다.)',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 4,
        q: '쌍곡선 $\\frac{(x-1)^2}{4}-\\frac{(y+3)^2}{9}=1$의 점근선 중 기울기가 양수인 것의 방정식은 무엇입니까?',
        choices: ['$y=\\frac{3}{2}x-\\frac{9}{2}$', '$y=\\frac{3}{2}x$', '$y=\\frac{3}{2}x+\\frac{9}{2}$', '$y=\\frac{2}{3}x-\\frac{11}{3}$'],
        answer: 0,
        why: ['', '평행이동을 하지 않았습니다. 점근선은 중심 $(1, -3)$을 지납니다.', '중심의 부호를 반대로 읽었습니다. 중심은 $(-1, 3)$이 아니라 $(1, -3)$입니다.', '기울기를 $\\frac{a}{b}$로 계산했습니다. 기울기는 $\\frac{b}{a}=\\frac{3}{2}$입니다.'],
        hint: '점근선은 중심을 지나고 기울기가 $\\pm\\frac{b}{a}$입니다.',
        explain: '중심은 $(1, -3)$, $a=2$, $b=3$이므로 점근선은 $y+3=\\pm\\frac{3}{2}(x-1)$입니다. 기울기가 양수인 것은 $y=\\frac{3}{2}x-\\frac{3}{2}-3=\\frac{3}{2}x-\\frac{9}{2}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 1,
        q: '두 초점이 $(3, 0)$, $(-3, 0)$이고 주축의 길이가 4인 쌍곡선의 방정식을 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$로 나타낼 때, $b^2$의 값을 구하시오.',
        answer: '5',
        wrong: [
          { a: '13', why: '$b^2=a^2+c^2$으로 계산했습니다. 쌍곡선은 $c^2=a^2+b^2$이므로 $b^2=c^2-a^2$입니다.' },
          { a: '-5', why: '$b^2=a^2-c^2$으로 계산했습니다. 쌍곡선에서는 $c$가 가장 크므로 $b^2=c^2-a^2$입니다.' },
        ],
        explain: '주축의 길이 $2a=4$에서 $a=2$, $c=3$이므로 $b^2=c^2-a^2=9-4=5$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 1,
        q: '두 점 $\\mathrm{F}(5, 0)$, $\\mathrm{F}\'(-5, 0)$에서의 거리의 차가 8인 점들이 이루는 도형의 방정식은 무엇입니까?',
        choices: ['$\\frac{x^2}{16}-\\frac{y^2}{9}=1$', '$\\frac{x^2}{16}+\\frac{y^2}{9}=1$', '$\\frac{x^2}{9}-\\frac{y^2}{16}=1$', '$\\frac{x^2}{16}-\\frac{y^2}{41}=1$'],
        answer: 0,
        why: ['', '타원의 방정식입니다. 거리의 차가 일정하면 쌍곡선입니다.', '$a$와 $b$를 바꾸었습니다. 거리의 차 $2a=8$에서 $a=4$, $a^2=16$입니다.', '$b^2=a^2+c^2$으로 계산했습니다. $b^2=c^2-a^2=25-16$입니다.'],
        hint: '거리의 차가 $2a$, 두 초점에서 $c$를 읽으세요.',
        explain: '거리의 차가 일정하므로 쌍곡선이고, $2a=8$에서 $a=4$, $c=5$입니다. $b^2=25-16=9$이므로 $\\frac{x^2}{16}-\\frac{y^2}{9}=1$입니다.',
      },
      {
        id: 'p12', level: 1, type: 'ox', concept: 0,
        q: '두 점 $\\mathrm{F}$, $\\mathrm{F}\'$ 사이의 거리가 6일 때, $\\mathrm{F}$, $\\mathrm{F}\'$에서의 거리의 차가 8인 점은 존재하지 않습니다.',
        answer: true,
        explain: '삼각형 $\\mathrm{PFF}\'$에서 두 변의 길이의 차는 나머지 한 변보다 작으므로 $|\\overline{\\mathrm{PF}}-\\overline{\\mathrm{PF}\'}| \\le \\overline{\\mathrm{FF}\'}=6$입니다(한 직선 위에 있을 때 등호). 따라서 차가 8인 점은 없습니다. 쌍곡선의 거리의 차는 두 초점 사이의 거리보다 작아야 합니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '두 점근선이 $y=\\pm\\frac{3}{4}x$이고 한 초점이 $(5, 0)$인 쌍곡선의 주축의 길이를 구하시오.',
        answer: '8',
        wrong: [
          { a: '6', why: '$2b$를 구했습니다. 초점이 $x$축 위에 있으므로 주축의 길이는 $2a$입니다.' },
          { a: '4', why: '$a$의 값을 답했습니다. 주축의 길이는 $2a$입니다.' },
        ],
        hint: '$b=\\frac{3}{4}a$로 놓고 $c^2=a^2+b^2$을 이용하세요.',
        explain: '초점이 $x$축 위에 있으므로 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ 꼴이고 $\\frac{b}{a}=\\frac{3}{4}$입니다. $b=\\frac{3}{4}a$를 $c^2=a^2+b^2=25$에 넣으면 $\\frac{25}{16}a^2=25$, $a^2=16$, $a=4$입니다. 주축의 길이는 $2a=8$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 5,
        q: '쌍곡선 $\\frac{x^2}{9}-\\frac{y^2}{16}=1$ 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여 $\\angle \\mathrm{FPF}\'=90^\\circ$일 때, 삼각형 $\\mathrm{PFF}\'$의 넓이를 구하시오.',
        answer: '16',
        wrong: [
          { a: '32', why: '$\\overline{\\mathrm{PF}} \\times \\overline{\\mathrm{PF}\'}$까지만 구했습니다. 넓이는 그 값의 $\\frac{1}{2}$입니다.' },
          { a: '9', why: '$a^2$을 답했습니다. 거리의 차와 피타고라스 정리로 두 거리의 곱을 구해 보세요.' },
        ],
        hint: '$|p-q|=2a$와 $p^2+q^2=(2c)^2$을 함께 쓰세요.',
        explain: '$a=3$, $c=5$입니다. $\\overline{\\mathrm{PF}}=p$, $\\overline{\\mathrm{PF}\'}=q$라 하면 $|p-q|=6$이고, 직각삼각형이므로 $p^2+q^2=(2c)^2=100$입니다. $(p-q)^2=p^2+q^2-2pq$에서 $36=100-2pq$, $pq=32$이므로 넓이는 $\\frac{1}{2}pq=16$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 5,
        q: '쌍곡선 $\\frac{x^2}{4}-\\frac{y^2}{5}=1$의 두 초점을 $\\mathrm{F}(3, 0)$, $\\mathrm{F}\'(-3, 0)$이라 하자. 오른쪽 곡선($x>0$) 위의 점 $\\mathrm{P}$와 점 $\\mathrm{A}(9, 5)$에 대하여 $\\overline{\\mathrm{PA}}+\\overline{\\mathrm{PF}}$의 최솟값을 구하시오.',
        answer: '9',
        wrong: [
          { a: '13', why: '$\\overline{\\mathrm{AF}\'}$에서 $2a$를 빼지 않았습니다. $\\overline{\\mathrm{PF}}=\\overline{\\mathrm{PF}\'}-4$입니다.' },
          { a: '17', why: '$2a$를 더했습니다. 오른쪽 곡선 위에서는 $\\overline{\\mathrm{PF}}=\\overline{\\mathrm{PF}\'}-2a$입니다.' },
        ],
        hint: '$\\overline{\\mathrm{PF}}$를 $\\overline{\\mathrm{PF}\'}$으로 바꾸어 보세요.',
        explain: '$a=2$이고 $\\mathrm{P}$가 오른쪽 곡선 위에 있으므로 $\\overline{\\mathrm{PF}\'}-\\overline{\\mathrm{PF}}=4$, 곧 $\\overline{\\mathrm{PF}}=\\overline{\\mathrm{PF}\'}-4$입니다. 따라서 $\\overline{\\mathrm{PA}}+\\overline{\\mathrm{PF}}=\\overline{\\mathrm{PA}}+\\overline{\\mathrm{PF}\'}-4 \\ge \\overline{\\mathrm{AF}\'}-4$입니다. $\\overline{\\mathrm{AF}\'}=\\sqrt{12^2+5^2}=13$이고, $\\mathrm{A}$는 오른쪽 곡선의 안쪽($\\frac{81}{4}-\\frac{25}{5}>1$), $\\mathrm{F}\'$은 왼쪽 곡선의 안쪽에 있어서 선분 $\\mathrm{AF}\'$이 오른쪽 곡선과 만납니다. 그 교점이 $\\mathrm{P}$일 때 등호가 성립하므로 최솟값은 $13-4=9$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '쌍곡선 $x^2-4y^2-4x-8y-4=0$의 두 초점의 좌표는 무엇입니까?',
        choices: [
          '$(2+\\sqrt{5}, -1)$, $(2-\\sqrt{5}, -1)$',
          '$(2+\\sqrt{3}, -1)$, $(2-\\sqrt{3}, -1)$',
          '$(-2+\\sqrt{5}, 1)$, $(-2-\\sqrt{5}, 1)$',
          '$(2, -1+\\sqrt{5})$, $(2, -1-\\sqrt{5})$',
        ],
        answer: 0,
        why: ['', '분모의 차로 계산했습니다. 쌍곡선은 $c^2=4+1$처럼 더합니다.', '중심의 부호를 반대로 읽었습니다. 정리하면 $(x-2)^2$, $(y+1)^2$입니다.', '정리한 식의 우변이 1이므로 초점은 중심의 왼쪽·오른쪽에 있습니다.'],
        hint: '$x$끼리, $y$끼리 묶어 완전제곱식으로 고치세요. $y$ 쪽은 $-4$로 묶습니다.',
        explain: '$(x^2-4x)-4(y^2+2y)=4$에서 $(x-2)^2-4-4(y+1)^2+4=4$, 곧 $(x-2)^2-4(y+1)^2=4$입니다. 양변을 4로 나누면 $\\frac{(x-2)^2}{4}-(y+1)^2=1$입니다. 중심은 $(2, -1)$, $c^2=4+1=5$이므로 두 초점은 $(2+\\sqrt{5}, -1)$, $(2-\\sqrt{5}, -1)$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 1,
        q: '타원 $\\frac{x^2}{25}+\\frac{y^2}{16}=1$과 두 초점이 같고 주축의 길이가 4인 쌍곡선의 방정식을 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$로 나타낼 때, $b^2$의 값을 구하시오.',
        answer: '5',
        wrong: [
          { a: '13', why: '$b^2=a^2+c^2$으로 계산했습니다. 쌍곡선은 $b^2=c^2-a^2$입니다.' },
          { a: '21', why: '타원의 장축의 끝 $(\\pm 5, 0)$을 초점으로 잡았습니다($c=5$). 타원의 초점은 $c^2=25-16=9$에서 $(\\pm 3, 0)$입니다.' },
        ],
        hint: '먼저 타원의 초점을 구하세요. 타원은 분모를 빼고, 쌍곡선은 더합니다.',
        explain: '타원의 초점은 $c^2=25-16=9$에서 $(\\pm 3, 0)$입니다. 쌍곡선도 $c=3$이고 주축의 길이 $2a=4$에서 $a=2$이므로 $b^2=c^2-a^2=9-4=5$입니다. 쌍곡선은 $\\frac{x^2}{4}-\\frac{y^2}{5}=1$입니다.',
      },
    ],

    deeper: [
      {
        title: '쌍곡선은 어디에 쓰일까?',
        body: '두 지점에서 같은 신호를 동시에 보냈을 때, 배가 두 신호를 받은 **시간의 차**를 알면 두 지점까지의 **거리의 차**를 알 수 있습니다. 거리의 차가 일정한 점들은 두 지점을 초점으로 하는 쌍곡선 위에 있으므로, 배는 그 쌍곡선 위 어딘가에 있습니다. 다른 한 쌍의 지점으로 쌍곡선을 하나 더 얻으면 두 쌍곡선의 교점에서 배의 위치를 알아낼 수 있습니다. 예전의 전파 항법이 이 원리를 썼습니다.\n\n' +
          '또 원기둥 모양의 전등갓 아래 벽에 비친 빛의 경계는 원뿔을 벽(평면)으로 자른 것과 같아서 쌍곡선 모양이 됩니다.',
      },
      {
        title: '직각쌍곡선과 반비례 그래프',
        body: '$a=b$인 쌍곡선 $x^2-y^2=a^2$은 점근선이 $y=\\pm x$로 서로 수직이어서 **직각쌍곡선**이라고 부릅니다.\n\n' +
          '중학교에서 배운 반비례 그래프 $y=\\frac{k}{x}$도 사실 직각쌍곡선입니다. 좌표축을 $45^\\circ$ 돌려 보면 $x^2-y^2=2k$ 꼴의 쌍곡선과 모양이 같고, 점근선은 $x$축과 $y$축입니다. 다만 이 단원에서는 축이 좌표축과 나란한 쌍곡선만 다룹니다.',
      },
    ],

    faq: [
      {
        q: '쌍곡선은 왜 분모의 크기로 방향을 정하지 않아요?',
        a: '쌍곡선은 $a$와 $b$ 가운데 어느 것이 커도 됩니다. 방향은 플러스가 붙은 문자가 정합니다. $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$은 $x^2$ 쪽이 플러스라서 좌우로 열리고 초점이 $x$축 위에, $=-1$(곧 $\\frac{y^2}{b^2}-\\frac{x^2}{a^2}=1$)은 위아래로 열리고 초점이 $y$축 위에 있습니다.',
      },
      {
        q: '쌍곡선은 점근선과 정말 안 만나요?',
        a: '네. $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$에 $y=\\frac{b}{a}x$를 넣으면 $0=1$이 되어 해가 없습니다. 곡선은 점근선에 한없이 가까워지지만 만나지는 않습니다.',
      },
      {
        q: '거리의 차를 구할 때 더해야 할지 빼야 할지 모르겠어요.',
        a: '점이 어느 곡선 위에 있는지 보세요. 점에서 가까운 초점까지의 거리에 $2a$를 더하면 먼 초점까지의 거리가 됩니다. 오른쪽 곡선 위의 점은 오른쪽 초점이 가깝습니다. 계산 결과가 음수이거나 $c-a$보다 작으면 잘못된 쪽을 고른 것입니다.',
      },
    ],

    mistakes: [
      '쌍곡선의 초점을 $c^2=a^2-b^2$으로 구하는 실수 — 쌍곡선은 $c^2=a^2+b^2$으로, 분모를 더합니다.',
      '점근선의 기울기를 $\\frac{a}{b}$로 쓰는 실수 — $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=\\pm 1$의 점근선은 $y=\\pm\\frac{b}{a}x$입니다. $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=0$을 풀면 확인할 수 있습니다.',
      '$\\frac{x^2}{9}-\\frac{y^2}{16}=-1$의 초점을 $x$축 위에서 찾는 실수 — 우변이 $-1$이면 초점은 $y$축 위에 있습니다.',
    ],

    gens: [
      {
        id: 'hyperbola-foci',
        level: 1,
        title: '쌍곡선의 초점과 두 초점 사이의 거리',
        make: function (R) {
          var c = R.int(2, 7), A = R.int(1, c * c - 1), B = c * c - A;
          var s = R.bool() ? 1 : -1, onX = s === 1;
          var eq = hypTex(A, B, s, 0, 0);
          var base = '우변이 ' + (onX ? '1' : '$-1$') + '이므로 초점은 ' + (onX ? '$x$' : '$y$') + '축 위에 있습니다. $c^2=' + A + '+' + B + '=' + (c * c) + '$이므로 $c=' + c + '$입니다. ';
          if (R.bool()) {
            var correct = pair(onX, 0, 0, c * c);
            var cands = [
              [pair(!onX, 0, 0, c * c), '초점이 놓인 축을 잘못 잡았습니다. 우변이 1이면 $x$축 위, $-1$이면 $y$축 위에 초점이 있습니다.'],
              [pair(onX, 0, 0, onX ? A : B), '꼭짓점을 골랐습니다. 초점은 중심에서 $c=\\sqrt{a^2+b^2}$만큼 떨어져 꼭짓점보다 바깥에 있습니다.'],
              [pair(!onX, 0, 0, onX ? B : A), '축과 계산을 모두 다시 확인해 보세요. 쌍곡선의 초점은 $c^2=a^2+b^2$으로 구합니다.'],
            ];
            if (A !== B) {
              cands.push([pair(onX, 0, 0, Math.abs(A - B)), '분모의 차로 계산했습니다. 그것은 타원의 계산이고 쌍곡선은 분모를 더합니다.']);
              cands.push([pair(!onX, 0, 0, Math.abs(A - B)), '타원처럼 분모를 빼고, 축도 바꾸었습니다. 쌍곡선은 분모를 더하고, 우변의 부호로 축을 정합니다.']);
            }
            var reason = {};
            cands.forEach(function (x) { if (!(x[0] in reason)) reason[x[0]] = x[1]; });
            var pick = R.choices(correct, R.shuffle(cands.map(function (x) { return x[0]; })));
            return {
              type: 'choice', concept: onX ? 1 : 3,
              q: '쌍곡선 $' + eq + '$의 두 초점의 좌표는 무엇입니까?',
              choices: pick.choices,
              answer: pick.answer,
              why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
              explain: base + '따라서 두 초점은 ' + correct + '입니다.',
            };
          }
          var wrong = [{ a: String(c), why: '$c$만 구했습니다. 두 초점 사이의 거리는 $2c$입니다.' }];
          var d = Math.abs(A - B);
          if (d > 0 && isSq(d) && 2 * Math.round(Math.sqrt(d)) !== c) wrong.push({ a: String(2 * Math.round(Math.sqrt(d))), why: '분모의 차로 계산했습니다. 쌍곡선은 $c^2=a^2+b^2$으로 분모를 더합니다.' });
          var v = onX ? A : B;
          if (isSq(v) && 2 * Math.round(Math.sqrt(v)) !== c && v !== d) wrong.push({ a: String(2 * Math.round(Math.sqrt(v))), why: '주축의 길이를 구했습니다. 초점은 꼭짓점보다 바깥에 있고, 두 초점 사이의 거리는 $2c$입니다.' });
          return {
            type: 'short', check: 'number', concept: onX ? 1 : 3,
            q: '쌍곡선 $' + eq + '$의 두 초점 사이의 거리를 구하시오.',
            answer: String(2 * c),
            wrong: wrong,
            explain: base + '두 초점 사이의 거리는 $2c=' + (2 * c) + '$입니다.',
          };
        },
      },
      {
        id: 'asymptote-slope',
        level: 2,
        title: '쌍곡선의 점근선의 기울기',
        make: function (R) {
          var a = R.int(1, 6), b = R.int(1, 6);
          if (a === b) b = a === 6 ? 5 : a + 1;
          var s = R.bool() ? 1 : -1;
          var eq, lead = '';
          if (R.bool()) {
            eq = hypTex(a * a, b * b, s, 0, 0);
          } else {
            var g = gcd(a * a, b * b), P = b * b / g, Q = a * a / g, Rt = s * a * a * b * b / g;
            eq = (P === 1 ? '' : P) + 'x^{2}-' + (Q === 1 ? '' : Q) + 'y^{2}=' + Rt;
            lead = '양변을 $' + Rt + '$' + R.josa(Math.abs(Rt), '으로/로') + ' 나누면 $' + hypTex(a * a, b * b, s, 0, 0) + '$입니다. ';
          }
          var ans = R.F(b, a);
          var wrong = [
            { a: R.F(a, b).toString(), why: '기울기를 $\\frac{a}{b}$로 계산했습니다. 점근선의 기울기는 $\\frac{b}{a}$($y$ 쪽 분모의 제곱근이 분자)입니다.' },
            { a: R.F(b * b, a * a).toString(), why: '제곱근을 구하지 않았습니다. 분모는 $a^2$, $b^2$이므로 제곱근을 구해 $\\frac{b}{a}$를 계산합니다.' },
          ];
          return {
            type: 'short', check: 'number', concept: 2,
            q: '쌍곡선 $' + eq + '$의 점근선 중 기울기가 양수인 것의 기울기를 구하시오.',
            answer: ans.toString(),
            wrong: wrong,
            hint: '표준형 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=\\pm 1$로 고친 뒤 $\\frac{b}{a}$를 구하세요. 우변을 0으로 바꾸어 풀어도 됩니다.',
            explain: lead + '$a=' + a + '$, $b=' + b + '$이므로 점근선은 $y=\\pm\\frac{b}{a}x=\\pm ' + ans.toTex() + 'x$입니다. 우변이 1이든 $-1$이든 점근선은 같습니다. 양수인 기울기는 $' + ans.toTex() + '$입니다.',
          };
        },
      },
      {
        id: 'hyperbola-difference',
        level: 2,
        title: '쌍곡선의 정의(거리의 차)를 이용한 길이',
        make: function (R) {
          var a = R.int(2, 6), c = R.int(a + 1, a + 4), b2 = c * c - a * a;
          var eq = hypTex(a * a, b2, 1, 0, 0);
          var head = '쌍곡선 $' + eq + '$의 두 초점을 $\\mathrm{F}(' + c + ', 0)$, $\\mathrm{F}\'(' + (-c) + ', 0)$이라 하자. ';
          var base = '$a=' + a + '$이므로 거리의 차는 $2a=' + (2 * a) + '$입니다. ';
          var q, ans, wrong = [], explain;
          if (R.bool()) {
            var d = R.int(c - a, c - a + 10);
            ans = d + 2 * a;
            q = head + '오른쪽 곡선($x>0$) 위의 점 $\\mathrm{P}$에 대하여 $\\overline{\\mathrm{PF}}=' + d + '$일 때, $\\overline{\\mathrm{PF}\'}$의 길이를 구하시오.';
            if (d - 2 * a > 0) wrong.push({ a: String(d - 2 * a), why: '$2a$를 뺐습니다. 오른쪽 곡선 위의 점은 $\\mathrm{F}$에 더 가까우므로 $\\overline{\\mathrm{PF}\'}=\\overline{\\mathrm{PF}}+2a$입니다.' });
            wrong.push({ a: String(d + a), why: '$a$만 더했습니다. 거리의 차는 주축의 길이 $2a$입니다.' });
            wrong.push({ a: String(d + 2 * c), why: '두 초점 사이의 거리를 더했습니다. 거리의 차는 $2a$입니다.' });
            explain = base + '$\\mathrm{P}$가 오른쪽 곡선 위에 있으므로 $\\mathrm{F}$에 더 가깝고, $\\overline{\\mathrm{PF}\'}=' + d + '+' + (2 * a) + '=' + ans + '$입니다.';
          } else {
            var e = R.int(c + a, c + a + 10);
            ans = e - 2 * a;
            q = head + '오른쪽 곡선($x>0$) 위의 점 $\\mathrm{P}$에 대하여 $\\overline{\\mathrm{PF}\'}=' + e + '$일 때, $\\overline{\\mathrm{PF}}$의 길이를 구하시오.';
            wrong.push({ a: String(e + 2 * a), why: '$2a$를 더했습니다. 오른쪽 곡선 위의 점에서는 $\\mathrm{F}$까지의 거리가 더 짧으므로 $\\overline{\\mathrm{PF}}=\\overline{\\mathrm{PF}\'}-2a$입니다.' });
            wrong.push({ a: String(e - a), why: '$a$만 뺐습니다. 거리의 차는 주축의 길이 $2a$입니다.' });
            if (e - 2 * c > 0 && e - 2 * c !== ans) wrong.push({ a: String(e - 2 * c), why: '두 초점 사이의 거리를 뺐습니다. 거리의 차는 $2a$입니다.' });
            explain = base + '$\\mathrm{P}$가 오른쪽 곡선 위에 있으므로 $\\mathrm{F}$까지가 더 가깝고, $\\overline{\\mathrm{PF}}=' + e + '-' + (2 * a) + '=' + ans + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 5,
            q: q,
            answer: String(ans),
            wrong: wrong,
            hint: '쌍곡선 위의 점에서 먼 초점까지의 거리는 가까운 초점까지의 거리보다 주축의 길이만큼 깁니다.',
            explain: explain,
          };
        },
      },
      {
        id: 'hyperbola-shifted',
        level: 3,
        title: '평행이동한 쌍곡선의 초점',
        make: function (R) { return shiftedFoci(R, R.bool()); },
      },
    ],
  });
})();
