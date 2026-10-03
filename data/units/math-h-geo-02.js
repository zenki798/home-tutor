/* 기하 · 타원
 * 타원의 뜻(두 초점까지의 거리의 합이 일정), 초점·꼭짓점·장축·단축·중심,
 * x^2/a^2+y^2/b^2=1 과 초점 (±c, 0) (c^2=a^2-b^2), 초점이 y축 위에 있는 타원,
 * 평행이동한 타원, 정의를 이용한 문제(삼각형의 둘레 2a+2c, 4a 등). */
(function () {
  /* √n 을 k√m 꼴 TeX 로 (n 은 양의 정수) — 값이 같으면 글자도 같게 나온다 */
  function rt(n) {
    var k = 1, m = n;
    for (var d = 2; d * d <= m; d++) { while (m % (d * d) === 0) { m /= d * d; k *= d; } }
    if (m === 1) return String(k);
    return (k === 1 ? '' : String(k)) + '\\sqrt{' + m + '}';
  }
  function isSq(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  /* m ± √n 꼴 (n 은 양의 정수) */
  function plusRt(m, n, sign) {
    if (isSq(n)) return String(m + sign * Math.round(Math.sqrt(n)));
    if (m === 0) return (sign < 0 ? '-' : '') + rt(n);
    return m + (sign < 0 ? '-' : '+') + rt(n);
  }
  /* 축 위의 두 점: 큰 축이 x 방향이면 (m±√n, k), 아니면 (k, m±√n) — 한 보기 글자로 */
  function pair(onX, m, k, n) {
    if (onX) return '$(' + plusRt(m, n, 1) + ', ' + k + ')$, $(' + plusRt(m, n, -1) + ', ' + k + ')$';
    return '$(' + k + ', ' + plusRt(m, n, 1) + ')$, $(' + k + ', ' + plusRt(m, n, -1) + ')$';
  }
  /* (x-m)^2 꼴 */
  function sq(v, m) {
    if (m === 0) return v + '^{2}';
    return '(' + v + (m > 0 ? '-' + m : '+' + (-m)) + ')^{2}';
  }
  function fr(top, d) { return d === 1 ? top : '\\frac{' + top + '}{' + d + '}'; }
  /* 타원의 방정식: x 쪽 분모 A, y 쪽 분모 B, 중심 (m, n) */
  function ellTex(A, B, m, n) { return fr(sq('x', m), A) + '+' + fr(sq('y', n), B) + '=1'; }
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

  /* 평행이동한 타원의 초점 고르기 (expanded: 전개된 꼴로 보여 줄지) */
  function shiftedFoci(R, expanded) {
    var c = R.int(1, 4), b2 = R.int(1, expanded ? 9 : 12), a2 = b2 + c * c;
    var m = R.int(-4, 4), n = R.int(-4, 4);
    if (m === 0 && n === 0) m = R.pick([-3, -2, 2, 3]);
    var onX = R.bool();
    var A = onX ? a2 : b2, B = onX ? b2 : a2;
    var std = ellTex(A, B, m, n);
    var shown = std;
    if (expanded) {
      // B(x-m)^2 + A(y-n)^2 = AB 를 전개
      shown = sumTex([[B, 'x^{2}'], [A, 'y^{2}'], [-2 * B * m, 'x'], [-2 * A * n, 'y'], [B * m * m + A * n * n - A * B, '']]) + '=0';
    }
    var correct = onX ? pair(true, m, n, c * c) : pair(false, n, m, c * c);
    var cands = [
      [onX ? pair(true, -m, -n, c * c) : pair(false, -n, -m, c * c), '중심의 부호를 반대로 읽었습니다. 괄호 안의 부호와 이동 방향은 반대이므로 중심은 $(' + m + ', ' + n + ')$입니다.'],
      [onX ? pair(false, n, m, c * c) : pair(true, m, n, c * c), '장축의 방향을 잘못 잡았습니다. 분모가 큰 쪽 문자의 축 방향으로 장축이 놓입니다.'],
      [onX ? pair(true, m, n, a2 + b2) : pair(false, n, m, a2 + b2), '$c^2=a^2+b^2$으로 계산했습니다. 타원은 $c^2=a^2-b^2$입니다(쌍곡선과 헷갈리지 않게).'],
      [onX ? pair(true, m, n, a2) : pair(false, n, m, a2), '장축의 양 끝(꼭짓점)을 골랐습니다. 초점은 중심에서 $c=\\sqrt{a^2-b^2}$만큼 떨어져 있습니다.'],
      [onX ? pair(true, 0, 0, c * c) : pair(false, 0, 0, c * c), '평행이동을 하지 않았습니다. 중심이 원점이 아니므로 초점도 같이 옮겨집니다.'],
    ];
    var reason = {};
    cands.forEach(function (x) { if (!(x[0] in reason)) reason[x[0]] = x[1]; });
    var pick = R.choices(correct, R.shuffle(cands.map(function (x) { return x[0]; })));
    var lead = expanded ? '완전제곱식으로 묶어 정리하면 $' + std + '$입니다. ' : '';
    var big = onX ? '$x$' : '$y$';
    return {
      type: 'choice', concept: 3,
      q: '타원 $' + shown + '$의 두 초점의 좌표는 무엇입니까?',
      choices: pick.choices,
      answer: pick.answer,
      why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
      explain: lead + '중심은 $(' + m + ', ' + n + ')$이고, 분모가 큰 쪽이 ' + big + '이므로 장축은 ' + big + '축과 평행합니다. $c^2=' + a2 + '-' + b2 + '=' + (c * c) + '$에서 $c=' + c + '$이므로 두 초점은 중심에서 장축 방향으로 ' + c + '만큼 떨어진 ' + correct + '입니다.',
    };
  }

  Tutor.registerUnit({
    id: 'math-h-geo-02',
    course: 'math-h-geo',
    title: '타원',
    summary: '두 초점까지의 거리의 합이 일정한 점들이 이루는 타원의 뜻을 알고, 타원의 방정식과 초점·꼭짓점·장축·단축을 구합니다. 초점이 $y$축 위에 있는 타원, 평행이동한 타원, 정의를 이용한 문제도 다룹니다.',
    goals: [
      '타원의 뜻과 초점·꼭짓점·장축·단축·중심을 설명할 수 있다.',
      '타원의 방정식 $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$에서 초점의 좌표와 장축·단축의 길이를 구할 수 있다.',
      '초점이 $y$축 위에 있는 타원과 평행이동한 타원의 방정식을 다룰 수 있다.',
      '타원의 정의(두 초점까지의 거리의 합이 일정)를 이용하여 문제를 해결할 수 있다.',
    ],
    standards: ['[12기하01-02]'],

    concepts: [
      {
        title: '타원의 뜻',
        body: '평면 위의 서로 다른 두 점 $\\mathrm{F}$, $\\mathrm{F}\'$에서의 **거리의 합이 일정한 점들의 집합**을 **타원**이라고 합니다. 두 점 $\\mathrm{F}$, $\\mathrm{F}\'$을 타원의 **초점**이라고 합니다.\n\n' +
          '- 두 초점을 이은 직선이 타원과 만나는 두 점, 그리고 선분 $\\mathrm{FF}\'$의 수직이등분선이 타원과 만나는 두 점을 타원의 **꼭짓점**이라고 합니다(모두 4개).\n' +
          '- 두 초점을 지나는 쪽의 두 꼭짓점을 이은 선분이 **장축**, 다른 두 꼭짓점을 이은 선분이 **단축**입니다.\n' +
          '- 장축과 단축의 교점이 타원의 **중심**이고, 중심은 선분 $\\mathrm{FF}\'$의 중점입니다.\n\n' +
          '그림은 두 초점이 $\\mathrm{F}(4, 0)$, $\\mathrm{F}\'(-4, 0)$이고 거리의 합이 10인 타원입니다. 타원 위의 점 $\\mathrm{P}(3, 2.4)$에서 $\\overline{\\mathrm{PF}}=2.6$, $\\overline{\\mathrm{PF}\'}=7.4$이고 합은 10입니다.\n\n' +
          '> ⚠️ 거리의 합은 두 초점 사이의 거리보다 커야 합니다. 합이 두 초점 사이의 거리와 같으면 선분 $\\mathrm{FF}\'$이 되고, 더 작으면 그런 점이 없습니다.',
        easy: '종이에 압정 두 개를 꽂고, 압정보다 긴 실의 양 끝을 압정에 묶어 보세요. 연필로 실을 팽팽하게 당긴 채 한 바퀴 돌리면 타원이 그려집니다.\n\n' +
          '실의 길이는 변하지 않으니, 연필 끝에서 두 압정까지의 거리를 더한 값은 늘 실의 길이와 같습니다. 이 두 압정의 자리가 초점입니다. 압정을 가까이 꽂을수록 원에 가까워지고, 멀리 꽂을수록 길쭉해집니다.',
        fig: {
          type: 'coord', xmin: -6, xmax: 6, ymin: -4, ymax: 4,
          fns: [{ expr: '3*sqrt(1-x^2/25)' }, { expr: '-3*sqrt(1-x^2/25)' }],
          points: [{ x: 4, y: 0, label: 'F' }, { x: -4, y: 0, label: "F'" }, { x: 3, y: 2.4, label: 'P' }],
          segments: [{ from: [3, 2.4], to: [4, 0] }, { from: [3, 2.4], to: [-4, 0] }],
          alt: '두 초점 F(4, 0), F\'(-4, 0)을 가진 타원. 타원 위의 점 P(3, 2.4)에서 두 초점까지 선분이 그려져 있다',
        },
        check: {
          type: 'choice',
          q: '압정 두 개와 실 한 가닥으로 타원을 그릴 때, 압정을 꽂은 두 자리는 타원의 무엇입니까?',
          choices: ['초점', '꼭짓점', '중심'],
          answer: 0,
          why: ['', '꼭짓점은 타원 위의 점입니다. 압정은 타원 안쪽에 있습니다.', '중심은 두 압정 사이의 한가운데 한 점입니다.'],
          explain: '타원 위의 점(연필 끝)에서 두 압정까지의 거리의 합이 실의 길이로 일정하므로, 두 압정의 자리가 초점입니다.',
        },
      },
      {
        title: '타원의 방정식 $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$',
        body: '두 초점이 $\\mathrm{F}(c, 0)$, $\\mathrm{F}\'(-c, 0)$이고 거리의 합이 $2a$ ($a>c>0$)인 타원을 생각합니다. 타원 위의 점 $\\mathrm{P}(x, y)$에 대하여\n\n' +
          '$\\sqrt{(x-c)^2+y^2}+\\sqrt{(x+c)^2+y^2}=2a$\n\n' +
          '한 근호를 옮겨 두 번 제곱하여 정리하면 $(a^2-c^2)x^2+a^2y^2=a^2(a^2-c^2)$이고, $b^2=a^2-c^2$ ($b>0$)으로 놓으면\n\n' +
          '$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ ($a>b>0$)\n\n' +
          '| 항목 | 값 |\n|---|---|\n' +
          '| 초점 | $(c, 0)$, $(-c, 0)$, $c^2=a^2-b^2$ |\n' +
          '| 꼭짓점 | $(\\pm a, 0)$, $(0, \\pm b)$ |\n' +
          '| 장축의 길이 | $2a$ |\n' +
          '| 단축의 길이 | $2b$ |\n' +
          '| 두 초점까지의 거리의 합 | $2a$ (장축의 길이) |\n\n' +
          '**$c^2=a^2-b^2$인 이유**: 꼭짓점 $\\mathrm{B}(0, b)$는 두 초점에서 같은 거리에 있고 거리의 합이 $2a$이므로 $\\overline{\\mathrm{BF}}=a$입니다. 직각삼각형 $\\mathrm{OBF}$에서 $a^2=b^2+c^2$입니다.\n\n' +
          '예: $\\frac{x^2}{25}+\\frac{y^2}{9}=1$은 $a=5$, $b=3$, $c=\\sqrt{25-9}=4$이므로 초점은 $(\\pm 4, 0)$, 장축의 길이는 10, 단축의 길이는 6입니다.',
        easy: '타원을 보면 "두 분모 → 큰 쪽에서 작은 쪽을 빼기 → 제곱근"의 순서로 초점을 찾습니다. $\\frac{x^2}{25}+\\frac{y^2}{9}=1$이면 $25-9=16$, $\\sqrt{16}=4$이므로 초점은 $(4, 0)$과 $(-4, 0)$입니다.\n\n' +
          '왜 빼는지는 그림으로 기억하면 됩니다. 위쪽 꼭짓점에서 초점까지 선을 그으면 빗변이 $a$, 두 변이 $b$와 $c$인 직각삼각형이 생깁니다. 빗변이 가장 기니까 $c^2=a^2-b^2$입니다.',
        check: {
          type: 'short', check: 'number',
          q: '타원 $\\frac{x^2}{25}+\\frac{y^2}{16}=1$의 두 초점 사이의 거리를 구하시오.',
          answer: '6',
          wrong: [
            { a: '3', why: '$c$만 구했습니다. 두 초점 $(3, 0)$, $(-3, 0)$ 사이의 거리는 $2c$입니다.' },
            { a: '10', why: '장축의 길이를 구했습니다. 초점은 $c=\\sqrt{a^2-b^2}$으로 구합니다.' },
          ],
          explain: '$c^2=25-16=9$이므로 $c=3$, 두 초점은 $(3, 0)$, $(-3, 0)$입니다. 두 초점 사이의 거리는 $2c=6$입니다.',
        },
      },
      {
        title: '초점이 $y$축 위에 있는 타원',
        body: '$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$에서 $b>a>0$이면 $y$ 쪽 분모가 더 크므로 타원이 세로로 길쭉해집니다. 이때는\n\n' +
          '- 장축이 $y$축 위에 있고, 장축의 길이는 $2b$, 단축의 길이는 $2a$입니다.\n' +
          '- 두 초점은 $(0, c)$, $(0, -c)$이고 $c^2=b^2-a^2$입니다.\n' +
          '- 두 초점까지의 거리의 합은 장축의 길이 $2b$입니다.\n\n' +
          '| 방정식 ($A$, $B$는 분모) | 장축 | 초점 |\n|---|---|---|\n' +
          '| $\\frac{x^2}{A}+\\frac{y^2}{B}=1$, $A>B$ | $x$축 위 | $(\\pm\\sqrt{A-B}, 0)$ |\n' +
          '| $\\frac{x^2}{A}+\\frac{y^2}{B}=1$, $A<B$ | $y$축 위 | $(0, \\pm\\sqrt{B-A})$ |\n\n' +
          '예: $\\frac{x^2}{9}+\\frac{y^2}{25}=1$은 $y$ 쪽 분모가 크므로 초점은 $y$축 위의 $(0, \\pm 4)$, 장축의 길이는 10입니다.\n\n' +
          '> 💡 어느 경우든 **분모가 큰 쪽 문자의 축** 위에 장축과 초점이 있고, $c^2=(\\text{큰 분모})-(\\text{작은 분모})$입니다.',
        easy: '타원은 분모가 큰 쪽으로 길쭉합니다. $x$ 밑의 분모가 크면 옆으로 누운 달걀, $y$ 밑의 분모가 크면 세워 놓은 달걀 모양입니다.\n\n' +
          '초점은 언제나 길쭉한 방향(장축) 위에 있습니다. 그러니 먼저 "어느 쪽 분모가 크지?"를 보고, 그 축 위에서 $\\sqrt{\\text{큰 분모}-\\text{작은 분모}}$만큼 떨어진 곳을 찾으면 됩니다.',
        fig: {
          type: 'coord', xmin: -5, xmax: 5, ymin: -6, ymax: 6,
          fns: [{ expr: '5*sqrt(1-x^2/9)' }, { expr: '-5*sqrt(1-x^2/9)' }],
          points: [{ x: 0, y: 4, label: 'F' }, { x: 0, y: -4, label: "F'" }],
          alt: '타원 x²/9 + y²/25 = 1. 세로로 길쭉하고 두 초점 F(0, 4), F\'(0, -4)가 y축 위에 있다',
        },
        check: {
          type: 'choice',
          q: '타원 $\\frac{x^2}{9}+\\frac{y^2}{25}=1$의 두 초점의 좌표는 무엇입니까?',
          choices: ['$(0, 4)$, $(0, -4)$', '$(4, 0)$, $(-4, 0)$', '$(0, \\sqrt{34})$, $(0, -\\sqrt{34})$'],
          answer: 0,
          why: ['', '장축의 방향을 잘못 잡았습니다. $y$ 쪽 분모 25가 더 크므로 초점은 $y$축 위에 있습니다.', '분모를 더했습니다. 타원은 $c^2=25-9$처럼 큰 분모에서 작은 분모를 뺍니다.'],
          explain: '$y$ 쪽 분모가 더 크므로 장축은 $y$축 위에 있습니다. $c^2=25-9=16$, $c=4$이므로 두 초점은 $(0, 4)$, $(0, -4)$입니다.',
        },
      },
      {
        title: '평행이동한 타원',
        body: '타원 $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$을 $x$축의 방향으로 $m$만큼, $y$축의 방향으로 $n$만큼 평행이동하면\n\n' +
          '$\\frac{(x-m)^2}{a^2}+\\frac{(y-n)^2}{b^2}=1$\n\n' +
          '이 되고, 중심은 $(m, n)$으로 옮겨집니다. 초점·꼭짓점도 모두 같은 만큼 옮겨지고, 장축·단축의 길이와 $c$는 변하지 않습니다.\n\n' +
          '- $a>b$이면 초점은 $(m+c, n)$, $(m-c, n)$ ($c^2=a^2-b^2$)\n' +
          '- $a<b$이면 초점은 $(m, n+c)$, $(m, n-c)$ ($c^2=b^2-a^2$)\n\n' +
          '전개된 꼴은 $x$끼리, $y$끼리 묶어 완전제곱식으로 고칩니다.\n\n' +
          '예: $x^2+4y^2-2x-3=0$ → $(x-1)^2-1+4y^2-3=0$ → $(x-1)^2+4y^2=4$ → $\\frac{(x-1)^2}{4}+y^2=1$\n\n' +
          '중심 $(1, 0)$, $c^2=4-1=3$이므로 두 초점은 $(1+\\sqrt{3}, 0)$, $(1-\\sqrt{3}, 0)$입니다.',
        easy: '평행이동한 타원은 원점에 있던 타원을 통째로 들어서 중심을 $(m, n)$으로 옮긴 것입니다. 모양과 크기는 그대로입니다.\n\n' +
          '그래서 ① 괄호를 보고 중심을 찾고, ② 원점에 있을 때처럼 $c$를 구한 다음, ③ 중심에서 장축 방향으로 $c$만큼씩 가면 두 초점입니다.',
        check: {
          type: 'choice',
          q: '타원 $\\frac{(x+1)^2}{16}+\\frac{(y-2)^2}{7}=1$의 두 초점의 좌표는 무엇입니까?',
          choices: ['$(2, 2)$, $(-4, 2)$', '$(4, -2)$, $(-2, -2)$', '$(-1, 5)$, $(-1, -1)$'],
          answer: 0,
          why: ['', '중심의 부호를 반대로 읽었습니다. $(x+1)$, $(y-2)$이므로 중심은 $(-1, 2)$입니다.', '장축의 방향을 잘못 잡았습니다. $x$ 쪽 분모 16이 더 크므로 초점은 중심의 왼쪽과 오른쪽에 있습니다.'],
          explain: '중심은 $(-1, 2)$이고 $x$ 쪽 분모가 더 크므로 장축은 $x$축과 평행합니다. $c^2=16-7=9$, $c=3$이므로 두 초점은 $(-1+3, 2)=(2, 2)$, $(-1-3, 2)=(-4, 2)$입니다.',
        },
      },
      {
        title: '타원의 정의를 이용한 문제',
        body: '타원 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여 언제나\n\n' +
          '$\\overline{\\mathrm{PF}}+\\overline{\\mathrm{PF}\'}=2a$ (장축의 길이)\n\n' +
          '입니다. 한 거리를 알면 다른 거리가 바로 나옵니다. 이 성질로 자주 나오는 결과를 정리하면 다음과 같습니다(장축이 $x$축 위, 초점 $(\\pm c, 0)$).\n\n' +
          '- **삼각형 $\\mathrm{PFF}\'$의 둘레** $=\\overline{\\mathrm{PF}}+\\overline{\\mathrm{PF}\'}+\\overline{\\mathrm{FF}\'}=2a+2c$\n' +
          '- 초점 $\\mathrm{F}$를 지나는 직선이 타원과 만나는 두 점 $\\mathrm{A}$, $\\mathrm{B}$에 대하여 **삼각형 $\\mathrm{ABF}\'$의 둘레** $=(\\overline{\\mathrm{AF}}+\\overline{\\mathrm{AF}\'})+(\\overline{\\mathrm{BF}}+\\overline{\\mathrm{BF}\'})=4a$\n' +
          '- $\\overline{\\mathrm{PF}}$는 $a-c$ 이상 $a+c$ 이하입니다(장축의 두 끝에서 가장 작고 가장 큽니다).\n\n' +
          '예: $\\frac{x^2}{25}+\\frac{y^2}{9}=1$ 위의 점 $\\mathrm{P}$에서 $\\overline{\\mathrm{PF}}=3$이면 $\\overline{\\mathrm{PF}\'}=10-3=7$입니다.',
        easy: '압정과 실로 그린 타원을 떠올리면 됩니다. 연필이 어디에 있든 연필에서 두 압정까지 실의 길이를 더하면 늘 실 전체의 길이(장축의 길이 $2a$)입니다.\n\n' +
          '그러니 한쪽 실이 3이고 전체가 10이면 다른 쪽은 7입니다. 삼각형의 둘레를 묻는 문제는 이 "실 전체"에 압정 사이의 거리를 더하기만 하면 됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '타원 $\\frac{x^2}{25}+\\frac{y^2}{9}=1$ 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여 삼각형 $\\mathrm{PFF}\'$의 둘레의 길이를 구하시오. (단, $\\mathrm{P}$는 $x$축 위에 있지 않다.)',
          answer: '18',
          wrong: [
            { a: '10', why: '$\\overline{\\mathrm{PF}}+\\overline{\\mathrm{PF}\'}$만 구했습니다. 둘레에는 두 초점 사이의 거리 $\\overline{\\mathrm{FF}\'}$도 들어갑니다.' },
            { a: '20', why: '$4a$를 계산했습니다. 이 삼각형의 둘레는 $2a+2c$입니다.' },
          ],
          explain: '$a=5$, $c=\\sqrt{25-9}=4$입니다. 둘레는 $\\overline{\\mathrm{PF}}+\\overline{\\mathrm{PF}\'}+\\overline{\\mathrm{FF}\'}=2a+2c=10+8=18$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '두 초점이 $\\mathrm{F}(2, 0)$, $\\mathrm{F}\'(-2, 0)$이고 장축의 길이가 6인 타원의 방정식을 구하시오.',
        steps: [
          '초점이 $x$축 위에 있고 중심이 원점이므로 $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ ($a>b>0$) 꼴입니다.',
          '장축의 길이가 $2a=6$이므로 $a=3$, 초점에서 $c=2$입니다.',
          '$b^2=a^2-c^2=9-4=5$입니다.',
          '따라서 $\\frac{x^2}{9}+\\frac{y^2}{5}=1$입니다.',
        ],
        answer: '$\\frac{x^2}{9}+\\frac{y^2}{5}=1$',
      },
      {
        q: '타원 $4x^2+9y^2-16x+18y-11=0$의 중심과 두 초점의 좌표를 구하시오.',
        steps: [
          '$x$끼리, $y$끼리 묶습니다: $4(x^2-4x)+9(y^2+2y)=11$',
          '완전제곱식으로 고칩니다: $4(x-2)^2-16+9(y+1)^2-9=11$, 곧 $4(x-2)^2+9(y+1)^2=36$',
          '양변을 36으로 나누면 $\\frac{(x-2)^2}{9}+\\frac{(y+1)^2}{4}=1$이므로 중심은 $(2, -1)$입니다.',
          '$x$ 쪽 분모가 크므로 장축은 $x$축과 평행하고, $c^2=9-4=5$, $c=\\sqrt{5}$입니다.',
          '두 초점은 $(2+\\sqrt{5}, -1)$, $(2-\\sqrt{5}, -1)$입니다.',
        ],
        answer: '중심 $(2, -1)$, 초점 $(2+\\sqrt{5}, -1)$, $(2-\\sqrt{5}, -1)$',
      },
      {
        q: '타원 $\\frac{x^2}{16}+\\frac{y^2}{7}=1$의 두 초점을 $\\mathrm{F}$, $\\mathrm{F}\'$이라 하자. 점 $\\mathrm{F}$를 지나는 직선이 타원과 두 점 $\\mathrm{A}$, $\\mathrm{B}$에서 만날 때, 삼각형 $\\mathrm{ABF}\'$의 둘레의 길이를 구하시오.',
        steps: [
          '$a^2=16$이므로 $a=4$, 두 초점까지의 거리의 합은 $2a=8$입니다.',
          '$\\mathrm{A}$와 $\\mathrm{B}$는 타원 위의 점이므로 $\\overline{\\mathrm{AF}}+\\overline{\\mathrm{AF}\'}=8$, $\\overline{\\mathrm{BF}}+\\overline{\\mathrm{BF}\'}=8$입니다.',
          '$\\mathrm{F}$가 선분 $\\mathrm{AB}$ 위에 있으므로 $\\overline{\\mathrm{AB}}=\\overline{\\mathrm{AF}}+\\overline{\\mathrm{BF}}$입니다.',
          '둘레는 $\\overline{\\mathrm{AB}}+\\overline{\\mathrm{AF}\'}+\\overline{\\mathrm{BF}\'}=(\\overline{\\mathrm{AF}}+\\overline{\\mathrm{AF}\'})+(\\overline{\\mathrm{BF}}+\\overline{\\mathrm{BF}\'})=8+8=16$입니다.',
        ],
        answer: '16',
      },
    ],

    terms: [
      { term: '타원', def: '평면 위의 서로 다른 두 점(초점)에서의 거리의 합이 일정한 점들의 집합입니다. 예: $\\frac{x^2}{25}+\\frac{y^2}{9}=1$' },
      { term: '타원의 초점', def: '타원을 정의하는 두 점입니다. $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ ($a>b>0$)의 초점은 $(\\pm c, 0)$, $c^2=a^2-b^2$입니다.' },
      { term: '장축', def: '타원의 두 초점을 지나는 쪽의 두 꼭짓점을 이은 선분입니다. 길이는 두 초점까지의 거리의 합과 같습니다.' },
      { term: '단축', def: '타원의 중심을 지나고 장축에 수직인 쪽의 두 꼭짓점을 이은 선분입니다. 장축보다 짧습니다.' },
      { term: '타원의 꼭짓점', def: '타원이 장축·단축을 포함하는 직선과 만나는 네 점입니다. $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$이면 $(\\pm a, 0)$, $(0, \\pm b)$입니다.' },
      { term: '타원의 중심', def: '장축과 단축의 교점이며, 두 초점을 이은 선분의 중점입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 1,
        q: '타원 $\\frac{x^2}{36}+\\frac{y^2}{20}=1$의 장축의 길이를 구하시오.',
        answer: '12',
        wrong: [
          { a: '6', why: '$a$의 값을 답했습니다. 장축의 길이는 $2a$입니다.' },
          { a: '8', why: '두 초점 사이의 거리 $2c$를 구했습니다. 장축의 길이는 $2a$입니다.' },
        ],
        explain: '$a^2=36$이므로 $a=6$이고, 장축의 길이는 $2a=12$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '타원 $\\frac{x^2}{16}+\\frac{y^2}{12}=1$의 두 초점의 좌표는 무엇입니까?',
        choices: ['$(2, 0)$, $(-2, 0)$', '$(0, 2)$, $(0, -2)$', '$(4, 0)$, $(-4, 0)$', '$(2\\sqrt{7}, 0)$, $(-2\\sqrt{7}, 0)$'],
        answer: 0,
        why: ['', '장축의 방향을 잘못 잡았습니다. $x$ 쪽 분모가 크므로 초점은 $x$축 위에 있습니다.', '장축의 양 끝(꼭짓점)을 골랐습니다. 초점은 $c=\\sqrt{a^2-b^2}$으로 구합니다.', '분모를 더했습니다. 타원은 $c^2=16-12$처럼 뺍니다.'],
        explain: '$c^2=16-12=4$이므로 $c=2$입니다. $x$ 쪽 분모가 크므로 두 초점은 $(2, 0)$, $(-2, 0)$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 2,
        q: '타원 $\\frac{x^2}{5}+\\frac{y^2}{9}=1$의 두 초점의 좌표는 무엇입니까?',
        choices: ['$(0, 2)$, $(0, -2)$', '$(2, 0)$, $(-2, 0)$', '$(0, \\sqrt{14})$, $(0, -\\sqrt{14})$', '$(0, 3)$, $(0, -3)$'],
        answer: 0,
        why: ['', '장축의 방향을 잘못 잡았습니다. $y$ 쪽 분모 9가 더 크므로 초점은 $y$축 위에 있습니다.', '분모를 더했습니다. $c^2=9-5$입니다.', '꼭짓점을 골랐습니다. 초점은 중심에서 $c=\\sqrt{9-5}$만큼 떨어져 있습니다.'],
        explain: '$y$ 쪽 분모가 크므로 장축은 $y$축 위에 있습니다. $c^2=9-5=4$, $c=2$이므로 두 초점은 $(0, 2)$, $(0, -2)$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '타원 $\\frac{x^2}{9}+\\frac{y^2}{4}=1$의 두 초점은 $(\\sqrt{13}, 0)$, $(-\\sqrt{13}, 0)$입니다.',
        answer: false,
        explain: '타원은 $c^2=a^2-b^2$이므로 $c^2=9-4=5$, 두 초점은 $(\\sqrt{5}, 0)$, $(-\\sqrt{5}, 0)$입니다. $\\sqrt{13}$은 분모를 더한 값으로, 쌍곡선에서 쓰는 계산입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 4,
        q: '타원 $\\frac{x^2}{49}+\\frac{y^2}{24}=1$ 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여 $\\overline{\\mathrm{PF}}=4$일 때, $\\overline{\\mathrm{PF}\'}$의 길이를 구하시오.',
        answer: '10',
        wrong: [
          { a: '3', why: '$a=7$에서 4를 뺐습니다. 두 거리의 합은 $a$가 아니라 장축의 길이 $2a=14$입니다.' },
          { a: '6', why: '두 초점 사이의 거리 $2c=10$에서 뺐습니다. 두 거리의 합은 장축의 길이 $2a$입니다.' },
        ],
        explain: '$a^2=49$이므로 $a=7$, $\\overline{\\mathrm{PF}}+\\overline{\\mathrm{PF}\'}=2a=14$입니다. 따라서 $\\overline{\\mathrm{PF}\'}=14-4=10$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '타원 $\\frac{(x-3)^2}{25}+\\frac{(y+1)^2}{16}=1$의 중심의 좌표는 무엇입니까?',
        choices: ['$(3, -1)$', '$(-3, 1)$', '$(3, 1)$', '$(5, 4)$'],
        answer: 0,
        why: ['', '괄호 안의 부호를 그대로 읽었습니다. $(x-3)$은 $x$축 방향으로 3만큼 옮긴 것입니다.', '$(y+1)$의 부호를 놓쳤습니다. $y+1=y-(-1)$입니다.', '분모의 제곱근을 썼습니다. 그 값은 $a$, $b$이고 중심과는 관계없습니다.'],
        explain: '$\\frac{x^2}{25}+\\frac{y^2}{16}=1$을 $x$축의 방향으로 3만큼, $y$축의 방향으로 $-1$만큼 평행이동한 타원이므로 중심은 $(3, -1)$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 1,
        q: '두 초점이 $(4, 0)$, $(-4, 0)$이고 단축의 길이가 6인 타원의 장축의 길이를 구하시오.',
        answer: '10',
        wrong: [
          { a: '8', why: '두 초점 사이의 거리를 구했습니다. $a^2=b^2+c^2$으로 $a$를 구해야 합니다.' },
          { a: '5', why: '$a$의 값을 답했습니다. 장축의 길이는 $2a$입니다.' },
        ],
        hint: '단축의 길이에서 $b$를, 초점에서 $c$를 구한 뒤 $a^2=b^2+c^2$을 이용하세요.',
        explain: '$c=4$, 단축의 길이 $2b=6$에서 $b=3$입니다. $a^2=b^2+c^2=9+16=25$이므로 $a=5$, 장축의 길이는 $2a=10$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '타원 $4x^2+y^2+8x-4y-8=0$의 두 초점의 좌표는 무엇입니까?',
        choices: [
          '$(-1, 2+2\\sqrt{3})$, $(-1, 2-2\\sqrt{3})$',
          '$(1, -2+2\\sqrt{3})$, $(1, -2-2\\sqrt{3})$',
          '$(-1+2\\sqrt{3}, 2)$, $(-1-2\\sqrt{3}, 2)$',
          '$(-1, 2+2\\sqrt{5})$, $(-1, 2-2\\sqrt{5})$',
        ],
        answer: 0,
        why: ['', '중심의 부호를 반대로 읽었습니다. 정리하면 $(x+1)^2$, $(y-2)^2$이므로 중심은 $(-1, 2)$입니다.', '장축의 방향을 잘못 잡았습니다. 정리한 식에서 $y$ 쪽 분모 16이 더 큽니다.', '분모를 더했습니다. $c^2=16-4=12$입니다.'],
        hint: '$x$끼리, $y$끼리 묶어 완전제곱식으로 고친 뒤, 양변을 우변의 수로 나누세요.',
        explain: '$4(x^2+2x)+(y^2-4y)=8$에서 $4(x+1)^2-4+(y-2)^2-4=8$, 곧 $4(x+1)^2+(y-2)^2=16$입니다. 양변을 16으로 나누면 $\\frac{(x+1)^2}{4}+\\frac{(y-2)^2}{16}=1$입니다. 중심은 $(-1, 2)$, 장축은 $y$축과 평행하고 $c^2=16-4=12$, $c=2\\sqrt{3}$이므로 두 초점은 $(-1, 2+2\\sqrt{3})$, $(-1, 2-2\\sqrt{3})$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 4,
        q: '타원 $\\frac{x^2}{12}+\\frac{y^2}{16}=1$ 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여 삼각형 $\\mathrm{PFF}\'$의 둘레의 길이를 구하시오. (단, $\\mathrm{P}$는 $y$축 위에 있지 않다.)',
        answer: '12',
        wrong: [
          { a: '8', why: '두 초점까지의 거리의 합만 구했습니다. 둘레에는 $\\overline{\\mathrm{FF}\'}$도 들어갑니다.' },
          { a: '16', why: '장축의 길이의 2배, 곧 초점을 지나는 현으로 만든 삼각형의 둘레를 계산했습니다. 삼각형 $\\mathrm{PFF}\'$의 둘레는 (장축의 길이)$+\\overline{\\mathrm{FF}\'}=8+4$입니다.' },
        ],
        hint: '어느 쪽 분모가 큰지 먼저 보고, 장축의 길이와 두 초점 사이의 거리를 구하세요.',
        explain: '$y$ 쪽 분모가 크므로 장축은 $y$축 위에 있고 장축의 길이는 $2\\sqrt{16}=8$입니다. $c^2=16-12=4$이므로 $c=2$, $\\overline{\\mathrm{FF}\'}=4$입니다. 둘레는 $8+4=12$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 2,
        q: '그림은 중심이 원점이고 네 꼭짓점이 $(2, 0)$, $(-2, 0)$, $(0, 4)$, $(0, -4)$인 타원입니다. 이 타원의 방정식은 무엇입니까?',
        fig: {
          type: 'coord', xmin: -5, xmax: 5, ymin: -5, ymax: 5,
          fns: [{ expr: '4*sqrt(1-x^2/4)' }, { expr: '-4*sqrt(1-x^2/4)' }],
          points: [{ x: 2, y: 0 }, { x: -2, y: 0 }, { x: 0, y: 4 }, { x: 0, y: -4 }],
          alt: '중심이 원점이고 x축과 (±2, 0), y축과 (0, ±4)에서 만나는 세로로 긴 타원',
        },
        choices: ['$\\frac{x^2}{4}+\\frac{y^2}{16}=1$', '$\\frac{x^2}{16}+\\frac{y^2}{4}=1$', '$\\frac{x^2}{2}+\\frac{y^2}{4}=1$', '$\\frac{x^2}{4}+\\frac{y^2}{12}=1$'],
        answer: 0,
        why: ['', '$x$와 $y$의 분모를 바꾸었습니다. $x$축과 만나는 점이 $(\\pm 2, 0)$이므로 $x$ 쪽 분모는 $2^2$입니다.', '분모에 제곱을 하지 않았습니다. 꼭짓점이 $(\\pm a, 0)$이면 분모는 $a^2$입니다.', '분모에 $c^2$을 구하는 계산($16-4$)을 넣었습니다. 분모는 꼭짓점의 좌표를 제곱한 값입니다.'],
        explain: '$x$축과 만나는 점이 $(\\pm 2, 0)$, $y$축과 만나는 점이 $(0, \\pm 4)$이므로 $\\frac{x^2}{2^2}+\\frac{y^2}{4^2}=1$, 곧 $\\frac{x^2}{4}+\\frac{y^2}{16}=1$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 0,
        q: '길이가 10 cm인 실의 양 끝을 8 cm 떨어진 두 압정에 묶고, 연필로 실을 팽팽하게 당기며 타원을 그렸습니다. 이 타원의 단축의 길이는 몇 cm입니까?',
        answer: '6',
        wrong: [
          { a: '10', why: '실의 길이는 장축의 길이(거리의 합 $2a$)입니다. 단축의 길이는 $2b$입니다.' },
          { a: '3', why: '$b$의 값을 답했습니다. 단축의 길이는 $2b$입니다.' },
        ],
        hint: '실의 길이가 두 초점까지의 거리의 합 $2a$, 압정 사이의 거리가 $2c$입니다.',
        explain: '연필 끝에서 두 압정까지의 거리의 합은 실의 길이 10 cm이므로 $2a=10$, $a=5$입니다. 두 압정 사이의 거리가 $2c=8$이므로 $c=4$입니다. $b^2=a^2-c^2=25-16=9$, $b=3$이므로 단축의 길이는 6 cm입니다.',
      },
      {
        id: 'p12', level: 1, type: 'ox', concept: 0,
        q: '타원의 두 초점은 항상 장축 위에 있습니다.',
        answer: true,
        explain: '장축은 두 초점을 지나는 직선 위의 두 꼭짓점을 이은 선분이고, 두 초점은 그 선분 안쪽에 있습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '타원 $\\frac{x^2}{20}+\\frac{y^2}{36}=1$의 두 초점을 $\\mathrm{F}$, $\\mathrm{F}\'$이라 하자. 점 $\\mathrm{F}$를 지나는 직선이 타원과 두 점 $\\mathrm{A}$, $\\mathrm{B}$에서 만날 때, 삼각형 $\\mathrm{ABF}\'$의 둘레의 길이를 구하시오.',
        answer: '24',
        wrong: [
          { a: '12', why: '한 점에 대한 거리의 합(장축의 길이 12)만 구했습니다. $\\mathrm{A}$와 $\\mathrm{B}$ 두 점에 대하여 각각 더합니다.' },
          { a: '20', why: '삼각형 $\\mathrm{PFF}\'$의 둘레처럼 계산했습니다. 이 삼각형의 변은 $\\overline{\\mathrm{AB}}$, $\\overline{\\mathrm{AF}\'}$, $\\overline{\\mathrm{BF}\'}$입니다.' },
        ],
        hint: '$\\overline{\\mathrm{AB}}=\\overline{\\mathrm{AF}}+\\overline{\\mathrm{FB}}$로 나누어 보세요.',
        explain: '$y$ 쪽 분모가 크므로 장축은 $y$축 위에 있고, 두 초점까지의 거리의 합은 $2\\sqrt{36}=12$입니다. 둘레는 $(\\overline{\\mathrm{AF}}+\\overline{\\mathrm{AF}\'})+(\\overline{\\mathrm{BF}}+\\overline{\\mathrm{BF}\'})=12+12=24$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 4,
        q: '타원 $\\frac{x^2}{25}+\\frac{y^2}{9}=1$ 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여 $\\overline{\\mathrm{PF}} \\times \\overline{\\mathrm{PF}\'}$의 최댓값을 구하시오.',
        answer: '25',
        wrong: [
          { a: '9', why: '최솟값을 구했습니다. $\\overline{\\mathrm{PF}}=1$ 또는 9일 때 곱이 가장 작고, 두 거리가 같을 때 가장 큽니다.' },
          { a: '10', why: '두 거리의 합을 답했습니다. 곱의 최댓값을 구해야 합니다.' },
        ],
        hint: '$\\overline{\\mathrm{PF}}=t$로 놓으면 $\\overline{\\mathrm{PF}\'}=10-t$입니다. $t$의 범위도 생각하세요.',
        explain: '$a=5$, $c=4$이므로 $\\overline{\\mathrm{PF}}+\\overline{\\mathrm{PF}\'}=10$이고 $\\overline{\\mathrm{PF}}=t$는 $1 \\le t \\le 9$입니다. 곱은 $t(10-t)=-(t-5)^2+25$이므로 $t=5$일 때 최댓값 25입니다. 이때 $\\mathrm{P}$는 단축의 끝 $(0, \\pm 3)$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 1,
        q: '중심이 원점이고 초점이 $x$축 위에 있는 타원 $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$의 장축의 길이가 단축의 길이의 2배이고, 두 초점 사이의 거리가 $6\\sqrt{3}$입니다. $a^2+b^2$의 값을 구하시오.',
        answer: '45',
        wrong: [
          { a: '180', why: '두 초점 사이의 거리 $6\\sqrt{3}$을 $c$로 잡았습니다. 두 초점 사이의 거리는 $2c$입니다.' },
          { a: '27', why: '$c^2$을 구했습니다. $a^2$과 $b^2$을 구해 더해야 합니다.' },
        ],
        hint: '$a=2b$와 $c=3\\sqrt{3}$을 $c^2=a^2-b^2$에 넣어 보세요.',
        explain: '$2a=2 \\times 2b$이므로 $a=2b$, $2c=6\\sqrt{3}$이므로 $c=3\\sqrt{3}$입니다. $c^2=a^2-b^2$에서 $27=4b^2-b^2=3b^2$, $b^2=9$, $a^2=36$이므로 $a^2+b^2=45$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '두 초점이 $(1, 1)$, $(7, 1)$이고 장축의 길이가 10인 타원의 방정식은 무엇입니까?',
        choices: [
          '$\\frac{(x-4)^2}{25}+\\frac{(y-1)^2}{16}=1$',
          '$\\frac{(x-4)^2}{25}+\\frac{(y-1)^2}{9}=1$',
          '$\\frac{(x+4)^2}{25}+\\frac{(y+1)^2}{16}=1$',
          '$\\frac{(x-4)^2}{100}+\\frac{(y-1)^2}{91}=1$',
        ],
        answer: 0,
        why: ['', '$c$를 4로 잡았습니다. 두 초점 사이의 거리가 6이므로 $c=3$, $b^2=25-9=16$입니다.', '중심 $(4, 1)$을 넣을 때 부호를 바꾸었습니다. 중심이 $(4, 1)$이면 $(x-4)$, $(y-1)$입니다.', '장축의 길이 10을 $a$로 잡았습니다. 장축의 길이는 $2a$이므로 $a=5$입니다.'],
        hint: '중심은 두 초점의 중점입니다.',
        explain: '중심은 두 초점의 중점 $(4, 1)$이고 장축은 $x$축과 평행합니다. $2a=10$에서 $a=5$, 두 초점 사이의 거리 $2c=6$에서 $c=3$이므로 $b^2=25-9=16$입니다. 따라서 $\\frac{(x-4)^2}{25}+\\frac{(y-1)^2}{16}=1$입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 4,
        q: '타원 $\\frac{x^2}{49}+\\frac{y^2}{24}=1$ 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여 $\\angle \\mathrm{FPF}\'=90^\\circ$일 때, 삼각형 $\\mathrm{PFF}\'$의 넓이를 구하시오.',
        answer: '24',
        wrong: [
          { a: '48', why: '$\\overline{\\mathrm{PF}} \\times \\overline{\\mathrm{PF}\'}$까지만 구했습니다. 직각삼각형의 넓이는 그 값의 $\\frac{1}{2}$입니다.' },
          { a: '35', why: '넓이를 $\\frac{1}{2} \\times \\overline{\\mathrm{FF}\'} \\times a=\\frac{1}{2} \\times 10 \\times 7$로 계산했습니다. $\\mathrm{P}$에서 $x$축까지의 거리(높이)는 $a$가 아닙니다. 두 거리의 합과 피타고라스 정리로 $\\overline{\\mathrm{PF}} \\times \\overline{\\mathrm{PF}\'}$를 구하세요.' },
        ],
        hint: '두 거리의 합(타원의 정의)과 피타고라스 정리를 함께 쓰세요.',
        explain: '$a=7$, $c=\\sqrt{49-24}=5$입니다. $\\overline{\\mathrm{PF}}=p$, $\\overline{\\mathrm{PF}\'}=q$라 하면 $p+q=14$이고, 직각삼각형이므로 $p^2+q^2=(2c)^2=100$입니다. $(p+q)^2=p^2+q^2+2pq$에서 $196=100+2pq$, $pq=48$이므로 넓이는 $\\frac{1}{2}pq=24$입니다. (실제로 $p$, $q$는 6과 8입니다.)',
      },
    ],

    deeper: [
      {
        title: '행성의 궤도와 속삭이는 방',
        body: '케플러는 행성이 태양을 **한 초점**으로 하는 타원 궤도를 따라 돈다는 사실을 밝혔습니다(케플러의 제1법칙). 지구의 궤도는 원에 매우 가까운 타원이어서, 태양까지의 거리가 1년 동안 조금씩 달라집니다.\n\n' +
          '타원에는 반사 성질도 있습니다. 한 초점에서 나온 빛이나 소리는 타원에 반사된 뒤 **다른 초점**으로 모입니다. 그래서 천장이 타원 모양인 방에서는 한 초점 자리에서 작게 속삭인 말이 멀리 떨어진 다른 초점 자리에서 또렷하게 들립니다.',
      },
      {
        title: '원은 타원의 특별한 경우',
        body: '$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$에서 $a=b$이면 $x^2+y^2=a^2$, 곧 원이 됩니다. 이때 $c=\\sqrt{a^2-b^2}=0$이므로 두 초점이 중심 한 점에 겹칩니다. "두 초점까지의 거리의 합이 $2a$"는 "중심까지의 거리가 $a$"가 되어 원의 정의와 같아집니다.\n\n' +
          '두 초점이 멀어질수록($c$가 $a$에 가까워질수록) 타원은 납작해집니다. 납작한 정도를 $\\frac{c}{a}$로 나타낸 값이 이심률이고, 타원의 이심률은 0보다 크고 1보다 작습니다.',
      },
    ],

    faq: [
      {
        q: '초점이 $x$축 위에 있는지 $y$축 위에 있는지 어떻게 알아요?',
        a: '$\\frac{x^2}{A}+\\frac{y^2}{B}=1$에서 분모 $A$와 $B$를 비교합니다. $A>B$이면 옆으로 길쭉해서 초점이 $x$축 위에, $A<B$이면 세로로 길쭉해서 초점이 $y$축 위에 있습니다. 분모가 큰 쪽 문자의 축 위에 장축과 초점이 있다고 기억하세요.',
      },
      {
        q: '타원은 $c^2=a^2-b^2$인데 쌍곡선은 왜 $c^2=a^2+b^2$이에요?',
        a: '타원에서는 단축의 끝에서 초점까지의 거리가 $a$라서 $a$가 직각삼각형의 빗변이 됩니다. 그래서 $a^2=b^2+c^2$입니다. 쌍곡선은 정의가 "거리의 차"라서 초점이 꼭짓점보다 바깥에 있고, $c$가 가장 큰 값이 되어 $c^2=a^2+b^2$입니다. 다음 단원에서 자세히 봅니다.',
      },
      {
        q: '분모가 제곱수가 아니면 어떻게 해요?',
        a: '분모가 제곱수가 아니어도 됩니다. $\\frac{x^2}{7}+\\frac{y^2}{3}=1$이면 $a=\\sqrt{7}$, $b=\\sqrt{3}$, $c^2=7-3=4$, $c=2$로 계산합니다. 장축의 길이는 $2\\sqrt{7}$입니다.',
      },
    ],

    mistakes: [
      '타원의 초점을 $c^2=a^2+b^2$으로 구하는 실수 — 타원은 $c^2=(\\text{큰 분모})-(\\text{작은 분모})$입니다. 더하는 것은 쌍곡선입니다.',
      '$\\frac{x^2}{9}+\\frac{y^2}{25}=1$의 초점을 $x$축 위에서 찾는 실수 — 분모가 큰 $y$ 쪽, 곧 $y$축 위에 초점이 있습니다.',
      '두 초점까지의 거리의 합을 $a$로 쓰는 실수 — 합은 장축의 길이 $2a$입니다.',
    ],

    gens: [
      {
        id: 'ellipse-foci',
        level: 1,
        title: '타원의 초점과 두 초점 사이의 거리',
        make: function (R) {
          var c = R.int(1, 6), b2 = R.int(1, 20);
          if (b2 === c * c) b2 += 1;
          var a2 = b2 + c * c, onX = R.bool();
          var A = onX ? a2 : b2, B = onX ? b2 : a2;
          var eq = ellTex(A, B, 0, 0);
          var big = onX ? '$x$' : '$y$';
          var base = '분모가 큰 쪽이 ' + big + '이므로 장축과 초점은 ' + big + '축 위에 있습니다. $c^2=' + a2 + '-' + b2 + '=' + (c * c) + '$이므로 $c=' + c + '$입니다. ';
          if (R.bool()) {
            var correct = pair(onX, 0, 0, c * c);
            var cands = [
              [pair(!onX, 0, 0, c * c), '장축의 방향을 잘못 잡았습니다. 분모가 큰 쪽 문자의 축 위에 초점이 있습니다.'],
              [pair(onX, 0, 0, a2 + b2), '분모를 더했습니다. 타원은 $c^2=(\\text{큰 분모})-(\\text{작은 분모})$입니다.'],
              [pair(onX, 0, 0, a2), '장축의 양 끝(꼭짓점)을 골랐습니다. 초점은 중심에서 $c=\\sqrt{a^2-b^2}$만큼 떨어져 있습니다.'],
              [pair(!onX, 0, 0, a2 + b2), '장축의 방향과 $c$를 구하는 식을 모두 다시 확인해 보세요.'],
              [pair(onX, 0, 0, b2), '작은 분모의 제곱근을 썼습니다. 초점은 $c^2=a^2-b^2$으로 구합니다.'],
            ];
            var reason = {};
            cands.forEach(function (x) { if (!(x[0] in reason)) reason[x[0]] = x[1]; });
            var pick = R.choices(correct, R.shuffle(cands.map(function (x) { return x[0]; })));
            return {
              type: 'choice', concept: onX ? 1 : 2,
              q: '타원 $' + eq + '$의 두 초점의 좌표는 무엇입니까?',
              choices: pick.choices,
              answer: pick.answer,
              why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
              explain: base + '따라서 두 초점은 ' + correct + '입니다.',
            };
          }
          var wrong = [{ a: String(c), why: '$c$만 구했습니다. 두 초점 사이의 거리는 $2c$입니다.' }];
          if (isSq(a2)) wrong.push({ a: String(2 * Math.round(Math.sqrt(a2))), why: '장축의 길이를 구했습니다. 두 초점 사이의 거리는 $2c$이고 $c^2=a^2-b^2$입니다.' });
          if (isSq(a2 + b2) && Math.round(Math.sqrt(a2 + b2)) !== c) wrong.push({ a: String(2 * Math.round(Math.sqrt(a2 + b2))), why: '분모를 더했습니다. 타원은 $c^2=(\\text{큰 분모})-(\\text{작은 분모})$입니다.' });
          return {
            type: 'short', check: 'number', concept: onX ? 1 : 2,
            q: '타원 $' + eq + '$의 두 초점 사이의 거리를 구하시오.',
            answer: String(2 * c),
            wrong: wrong,
            explain: base + '두 초점 사이의 거리는 $2c=' + (2 * c) + '$입니다.',
          };
        },
      },
      {
        id: 'ellipse-sum',
        level: 2,
        title: '타원의 정의(거리의 합)를 이용한 길이',
        make: function (R) {
          var a = R.int(3, 10), c = R.int(1, a - 1), b2 = a * a - c * c, onX = R.bool();
          var eq = onX ? ellTex(a * a, b2, 0, 0) : ellTex(b2, a * a, 0, 0);
          var mode = R.int(0, 2);
          var head = '타원 $' + eq + '$';
          var basic = '장축은 ' + (onX ? '$x$' : '$y$') + '축 위에 있고 $\\sqrt{' + (a * a) + '}=' + a + '$이므로 두 초점까지의 거리의 합은 ' + (2 * a) + '입니다. ';
          var cpart = '$c^2=' + (a * a) + '-' + b2 + '=' + (c * c) + '$에서 $c=' + c + '$이므로 두 초점 사이의 거리는 ' + (2 * c) + '입니다. ';
          var q, ans, wrong = [], explain;
          if (mode === 0) {
            var opts = [];
            for (var t = a - c; t <= a + c; t++) if (t !== a) opts.push(t);
            var d = R.pick(opts);
            ans = 2 * a - d;
            q = head + ' 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여 $\\overline{\\mathrm{PF}}=' + d + '$일 때, $\\overline{\\mathrm{PF}\'}$의 길이를 구하시오.';
            if (a - d > 0 && a - d !== ans) wrong.push({ a: String(a - d), why: '거리의 합을 $a=' + a + '$' + R.josa(a, '으로/로') + ' 잡았습니다. 합은 장축의 길이 $2a=' + (2 * a) + '$입니다.' });
            if (2 * c - d > 0 && 2 * c - d !== ans && 2 * c !== a) wrong.push({ a: String(2 * c - d), why: '두 초점 사이의 거리에서 뺐습니다. 두 거리의 합은 장축의 길이 $2a$입니다.' });
            if (!wrong.some(function (w) { return w.a === String(d); })) wrong.push({ a: String(d), why: '두 거리가 같다고 생각했습니다. 두 거리의 합이 $2a$로 일정합니다.' });
            explain = basic + '따라서 $\\overline{\\mathrm{PF}\'}=' + (2 * a) + '-' + d + '=' + ans + '$입니다.';
          } else if (mode === 1) {
            ans = 2 * a + 2 * c;
            q = head + ' 위의 점 $\\mathrm{P}$와 두 초점 $\\mathrm{F}$, $\\mathrm{F}\'$에 대하여 삼각형 $\\mathrm{PFF}\'$의 둘레의 길이를 구하시오. (단, $\\mathrm{P}$는 장축 위에 있지 않다.)';
            wrong.push({ a: String(2 * a), why: '$\\overline{\\mathrm{PF}}+\\overline{\\mathrm{PF}\'}$만 구했습니다. $\\overline{\\mathrm{FF}\'}$도 더합니다.' });
            wrong.push({ a: String(4 * a), why: '$4a$를 계산했습니다. 그것은 초점을 지나는 현으로 만든 삼각형의 둘레입니다.' });
            wrong.push({ a: String(2 * a + c), why: '두 초점 사이의 거리를 $c$로 잡았습니다. $\\overline{\\mathrm{FF}\'}=2c$입니다.' });
            explain = basic + cpart + '둘레는 $' + (2 * a) + '+' + (2 * c) + '=' + ans + '$입니다.';
          } else {
            ans = 4 * a;
            q = head + '의 두 초점을 $\\mathrm{F}$, $\\mathrm{F}\'$이라 하자. 점 $\\mathrm{F}$를 지나는 직선이 타원과 두 점 $\\mathrm{A}$, $\\mathrm{B}$에서 만날 때, 삼각형 $\\mathrm{ABF}\'$의 둘레의 길이를 구하시오.';
            wrong.push({ a: String(2 * a), why: '한 점에 대한 거리의 합만 구했습니다. $\\mathrm{A}$와 $\\mathrm{B}$ 두 점에 대하여 각각 더합니다.' });
            wrong.push({ a: String(2 * a + 2 * c), why: '삼각형 $\\mathrm{PFF}\'$의 둘레처럼 계산했습니다. 이 삼각형의 변은 $\\overline{\\mathrm{AB}}$, $\\overline{\\mathrm{AF}\'}$, $\\overline{\\mathrm{BF}\'}$입니다.' });
            explain = basic + '$\\overline{\\mathrm{AB}}=\\overline{\\mathrm{AF}}+\\overline{\\mathrm{BF}}$이므로 둘레는 $(\\overline{\\mathrm{AF}}+\\overline{\\mathrm{AF}\'})+(\\overline{\\mathrm{BF}}+\\overline{\\mathrm{BF}\'})=' + (2 * a) + '+' + (2 * a) + '=' + ans + '$입니다.';
          }
          return {
            type: 'short', check: 'number', concept: 4,
            q: q,
            answer: String(ans),
            wrong: wrong,
            hint: '타원 위의 점에서 두 초점까지의 거리의 합은 장축의 길이입니다.',
            explain: explain,
          };
        },
      },
      {
        id: 'ellipse-shifted',
        level: 2,
        title: '평행이동한 타원의 초점',
        make: function (R) { return shiftedFoci(R, false); },
      },
      {
        id: 'ellipse-expanded',
        level: 3,
        title: '전개된 꼴로 주어진 타원의 초점',
        make: function (R) { return shiftedFoci(R, true); },
      },
    ],
  });
})();
