/* 테스트용 · 중학교 수학 2 · 일차부등식 — 모든 칸을 쓴다(서식 글 수식, 그림 여러 종류, 문제 유형 전부, 생성기 2개,
   가정교사 흐름 칸: 이해 확인 check · 관련 카드 concept · 오답 진단 why/wrong — ARCHITECTURE §7.4) */
(function () {
  /* 수 뒤에 붙는 조사(을/를, 으로/로) — 생성기 문장에 쓴다 */
  function hasBatchim(n) {
    var d = Math.abs(n) % 10;
    return [0, 1, 3, 6, 7, 8].indexOf(d) >= 0; // 영·일·삼·육·칠·팔 (십·백도 받침이 있다)
  }
  function eul(n) { return n + (hasBatchim(n) ? '을' : '를'); }
  function eun(n) { return n + (hasBatchim(n) ? '은' : '는'); }
  function ro(n) {
    var d = Math.abs(n) % 10;
    return n + ((d === 1 || d === 7 || d === 8 || !hasBatchim(n)) ? '로' : '으로'); // ㄹ 받침(일·칠·팔)은 '로'
  }
  var FLIP = { '>': '<', '<': '>', '\\ge': '\\le', '\\le': '\\ge' };

  Tutor.registerUnit({
    id: 'math-m2-01',
    course: 'math-m2',
    title: '일차부등식',
    summary: '부등식의 뜻과 성질을 알고, 일차부등식을 풀어 해를 수직선에 나타내요.',
    goals: [
      '부등식의 뜻을 알고 부등식으로 나타낼 수 있다.',
      '부등식의 성질을 이용해 일차부등식을 풀 수 있다.',
      '일차부등식의 해를 수직선 위에 나타낼 수 있다.',
    ],
    standards: [],
    concepts: [
      {
        title: '부등식이란?',
        body: '수나 식의 크기를 부등호 $<$, $>$, $\\le$, $\\ge$ 로 나타낸 식을 **부등식**이라고 해요.\n\n' +
          '- $a<b$ : $a$ 는 $b$ 보다 작다\n- $a\\ge b$ : $a$ 는 $b$ 보다 크거나 같다\n\n' +
          '예를 들어 $x+2>5$ 는 부등식이에요.',
        easy: '시소를 떠올려 보세요. 어느 쪽이 더 무거운지를 기호로 쓴 것이 부등식이에요. 벌어진 쪽이 더 큰 쪽이에요: $5>3$.',
        fig: { type: 'numberline', min: -1, max: 6, step: 1, points: [{ x: 3, open: true }], ranges: [{ from: 3, to: Infinity, fromOpen: true }], alt: '3보다 큰 수의 범위를 나타낸 수직선' },
        check: {
          type: 'ox', q: '$x+2>5$ 는 부등식이다.', answer: true,
          explain: '부등호 $>$ 로 두 식의 크기를 나타냈으니 부등식이에요.',
        },
      },
      {
        title: '부등식의 성질',
        body: '부등식의 양쪽에 같은 일을 해도 크기 관계가 그대로일까요?\n\n' +
          '| 하는 일 | 부등호 방향 |\n|---|---|\n| 같은 수를 더하거나 빼기 | 그대로 |\n| 같은 양수를 곱하거나 나누기 | 그대로 |\n| 같은 음수를 곱하거나 나누기 | **바뀜** |\n\n' +
          '> ⚠️ $-2x<6$ 의 양쪽을 $-2$ 로 나누면 $x>-3$ 이 돼요.',
        easy: '$2<3$ 의 양쪽에 $-1$ 을 곱하면 $-2$ 와 $-3$ 이 돼요. 수직선에서 $-2$ 가 더 오른쪽에 있으니 $-2>-3$, 방향이 바뀌었죠?',
        fig: { type: 'numberline', min: -4, max: 4, step: 1, points: [{ x: -3, label: '-3' }, { x: -2, label: '-2' }, { x: 2, label: '2' }, { x: 3, label: '3' }] },
        check: {
          type: 'choice', q: '$-2<3$ 의 양쪽에 $-1$ 을 곱하면 부등호는 어떻게 될까요?',
          choices: ['방향이 그대로예요', '방향이 바뀌어요', '등호(=)가 돼요'],
          answer: 1,
          why: ['음수를 곱했어요. 음수를 곱하거나 나누면 방향이 바뀌어요.', '', '양쪽에 같은 수를 곱해도 등호가 되지는 않아요.'],
          explain: '양쪽에 $-1$ 을 곱하면 $2>-3$ 처럼 방향이 바뀌어요.',
        },
      },
      {
        title: '일차부등식 풀기',
        body: '모든 항을 왼쪽으로 옮겨 정리했을 때 (일차식) $>0$ 꼴이 되는 부등식을 **일차부등식**이라고 해요.\n\n' +
          '풀 때는 일차방정식처럼 $x$ 를 한쪽에 모으되, **음수로 나눌 때만** 방향을 바꿔요.\n\n' +
          '$2x+3>7 \\Rightarrow 2x>4 \\Rightarrow x>2$',
        fig: { type: 'coord', xmin: -1, xmax: 5, ymin: -1, ymax: 13, fns: [{ expr: '2x+3', label: 'y=2x+3' }], segments: [{ from: [-1, 7], to: [5, 7], dashed: true }], points: [{ x: 2, y: 7, label: '(2, 7)' }] },
        check: {
          type: 'short', check: 'number',
          q: '$2x>4$ 의 양쪽을 2로 나누면 $x>$ [[?]] 예요. 빈칸에 알맞은 수는?',
          answer: '2',
          wrong: [
            { a: '8', why: '2를 곱했어요. 양쪽을 2로 **나누어야** 해요.' },
            { a: '4', why: '아직 나누지 않았어요. 4를 2로 나누어 보세요.' },
          ],
          explain: '$4\\div 2=2$ 이므로 $x>2$ 예요.',
        },
      },
      {
        title: '해를 수직선에 나타내기',
        body: '$x>2$ 처럼 2를 **포함하지 않으면** 빈 점, $x\\ge 2$ 처럼 **포함하면** 채운 점으로 나타내요. 그리고 해가 있는 쪽으로 선을 그어요.',
        fig: { type: 'numberline', min: -1, max: 5, step: 1, points: [{ x: 2, label: '2' }], ranges: [{ from: 2, to: Infinity }], alt: 'x는 2 이상' },
      },
    ],
    examples: [
      {
        q: '일차부등식 $3x-1\\le 8$ 을 풀어 보세요.',
        steps: ['양쪽에 1을 더해요: $3x\\le 9$', '양쪽을 양수 3으로 나눠요. 방향은 그대로예요: $x\\le 3$'],
        answer: '$x\\le 3$',
      },
      {
        q: '일차부등식 $-2x+4>10$ 을 풀어 보세요.',
        fig: { type: 'numberline', min: -6, max: 1, step: 1, points: [{ x: -3, label: '-3', open: true }], ranges: [{ from: -Infinity, to: -3, toOpen: true }] },
        steps: ['양쪽에서 4를 빼요: $-2x>6$', '양쪽을 음수 $-2$ 로 나눠요. 음수로 나누면 부등호 방향이 바뀌어요: $x<-3$'],
        answer: '$x<-3$',
      },
    ],
    terms: [
      { term: '부등식', def: '부등호를 써서 수나 식의 크기를 나타낸 식이에요. 예: $x+2>5$' },
      { term: '부등호', def: '크기를 비교하는 기호 $<$, $>$, $\\le$, $\\ge$ 예요.' },
      { term: '일차부등식', def: '정리했을 때 (일차식) $>0$, $<0$, $\\ge 0$, $\\le 0$ 꼴이 되는 부등식이에요.' },
      { term: '부등식의 해', def: '부등식을 참이 되게 하는 $x$ 의 값이에요.' },
    ],
    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 중 **부등식**인 것은?',
        choices: ['$x+3=5$', '$2x-1$', '$x+1>4$', '$3\\times 4=12$'],
        answer: 2,
        why: ['등호(=)가 있는 식은 등식이에요.', '부등호도 등호도 없는 그냥 식이에요.', '', '등호(=)가 있는 식은 등식이에요.'],
        explain: '부등호($>$)가 있는 식은 $x+1>4$ 뿐이에요. 등호가 있는 $x+3=5$ 는 등식이고, $2x-1$ 은 그냥 식이에요.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 2,
        q: '일차부등식 $x+4<7$ 의 해는?',
        choices: ['$x<3$', '$x>3$', '$x<11$', '$x>11$'],
        answer: 0,
        why: ['', '부등호 방향을 바꿀 필요가 없어요. 양쪽에서 4를 빼도 방향은 그대로예요.', '4를 빼지 않고 더했어요.', '4를 더하고 방향까지 바꿨어요.'],
        hint: '양쪽에서 같은 수를 빼도 방향은 그대로예요.',
        explain: '양쪽에서 4를 빼면 $x<3$ 이에요. $x<11$ 은 4를 빼지 않고 더한 실수예요.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '한 변의 길이가 $x$ cm 인 정사각형의 둘레가 48 cm 보다 작지 않아요. $x$ 의 가장 작은 값은 몇 cm 일까요?',
        answer: '12',
        wrong: [
          { a: '48', why: '둘레를 그대로 썼어요. 한 변의 길이는 둘레를 4로 나누어 구해요.' },
          { a: '13', why: '"작지 않다"는 12와 같아도 된다는 뜻이에요. 12도 답이 될 수 있어요.' },
        ],
        explain: '둘레는 $4x$ 이므로 $4x\\ge 48$, 양쪽을 4로 나누면 $x\\ge 12$ 예요. 가장 작은 값은 12 cm 예요.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'set', concept: 3,
        q: '$x$ 가 자연수일 때, 부등식 $2x<7$ 의 해를 모두 쓰세요.',
        answer: '1, 2, 3',
        wrong: [{ a: '1, 2, 3, 4', why: '$x<3.5$ 이므로 4는 해가 아니에요.' }],
        explain: '양쪽을 2로 나누면 $x<3.5$ 예요. 이보다 작은 자연수는 1, 2, 3 이에요.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'text', concept: 0,
        q: '$a\\ge b$ 는 "$a$ 는 $b$ 보다 크거나 [[빈칸]]" 라고 읽어요. 빈칸에 알맞은 말을 쓰세요.',
        answer: ['같다', '같음'],
        explain: '$\\ge$ 는 "크거나 같다" 예요. $a$ 가 $b$ 와 같아도 참이에요.',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 1,
        q: '부등식 $-3x>6$ 의 양쪽을 $-3$ 으로 나누면 $x>-2$ 가 된다.',
        answer: false,
        explain: '음수로 나누면 부등호 방향이 바뀌어요. 바르게 고치면 $x<-2$ 예요.',
      },
      {
        id: 'p7', level: 2, type: 'order', concept: 2,
        q: '일차부등식 $2x+3>7$ 을 푸는 과정을 순서대로 놓으세요.',
        choices: ['부등식을 쓴다: $2x+3>7$', '양쪽에서 3을 뺀다: $2x>4$', '양쪽을 2로 나눈다: $x>2$', '해를 수직선에 나타낸다'],
        answer: [0, 1, 2, 3],
        explain: '상수항을 먼저 옮기고($2x>4$), $x$ 의 계수로 나눠요($x>2$). 마지막에 수직선에 나타내요.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'expr', concept: 0,
        q: '"$x$ 의 3배에서 2를 뺀 값" 을 $x$ 에 대한 식으로 쓰세요.',
        answer: '3x-2',
        hint: '$x$ 의 3배는 $3x$ 예요.',
        explain: '$x$ 의 3배는 $3x$, 거기서 2를 빼면 $3x-2$ 예요.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 1,
        q: '$a<b$ 일 때, 다음 중 **옳지 않은** 것은?',
        choices: ['$a+2<b+2$', '$a-5<b-5$', '$3a<3b$', '$-a<-b$'],
        answer: 3,
        why: ['양쪽에 같은 수를 더해도 방향은 그대로라서 옳아요.', '양쪽에서 같은 수를 빼도 방향은 그대로라서 옳아요.', '양수 3을 곱하면 방향은 그대로라서 옳아요.', ''],
        explain: '양쪽에 음수 $-1$ 을 곱하면 방향이 바뀌어 $-a>-b$ 가 돼요. 나머지는 모두 옳아요.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 2,
        q: '어떤 자연수 $x$ 에 5를 더한 수는 12보다 작아요. 이를 만족하는 가장 큰 자연수 $x$ 는?',
        answer: '6',
        wrong: [{ a: '7', why: '$x<7$ 이므로 7은 해가 아니에요. 7보다 작은 수 중 가장 큰 수를 찾아요.' }],
        hint: '먼저 부등식 $x+5<12$ 를 세워요.',
        explain: '$x+5<12$ 에서 $x<7$ 이므로 가장 큰 자연수는 6 이에요.',
      },
    ],
    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 2,
        q: '연속하는 두 자연수의 합이 25보다 작을 때, 두 수 중 큰 수가 될 수 있는 가장 큰 수는?',
        answer: '12',
        hint: '작은 수를 $n$ 이라 하면 큰 수는 $n+1$ 이에요.',
        explain: '$n+(n+1)<25$ 에서 $2n<24$, $n<12$ 이므로 $n$ 은 최대 11, 큰 수는 12 예요.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '부등식 $ax>3$ 의 해가 $x<-1$ 일 때, 상수 $a$ 의 값은?',
        choices: ['$-3$', '$3$', '$-\\frac{1}{3}$', '$\\frac{1}{3}$'],
        answer: 0,
        why: ['', '$a>0$ 이면 부등호 방향이 그대로라서 해가 $x>1$ 이 돼요.', '$\\frac{3}{a}=-1$ 을 다시 풀어 보세요. $a=-3$ 이에요.', '$a>0$ 이면 방향이 바뀌지 않아요.'],
        hint: '해의 부등호 방향이 바뀌었어요. $a$ 의 부호는?',
        explain: '방향이 바뀌었으니 $a<0$ 이고, 양쪽을 $a$ 로 나누면 $x<\\frac{3}{a}$ 예요. $\\frac{3}{a}=-1$ 이므로 $a=-3$ 이에요.',
      },
      {
        id: 'a3', level: 3, type: 'ox', concept: 3,
        q: '$x$ 가 정수일 때, $-2\\le x<1$ 을 만족하는 $x$ 는 3개이다.',
        answer: true,
        explain: '$-2$ 는 포함하고 1 은 포함하지 않으므로 $-2$, $-1$, $0$ 의 3개예요.',
      },
    ],
    deeper: [
      { title: '부등식과 생활', body: '"키 120 cm 이상 탈 수 있어요", "만 13세 미만" 같은 말이 모두 부등식이에요.\n\n> 💡 **이상·이하**는 그 수를 포함하고, **초과·미만**은 포함하지 않아요.' },
      { title: '다음 학년과의 연결', body: '고등학교에서는 $x^2-5x+6<0$ 같은 **이차부등식**을 배워요. 그래프와 $x$ 축의 위치 관계로 풀어요.' },
    ],
    faq: [
      { q: '왜 음수로 나누면 부등호 방향이 바뀌어요?', a: '음수를 곱하면 수직선에서 0을 기준으로 뒤집히기 때문이에요. $2<3$ 에 $-1$ 을 곱하면 $-2>-3$ 처럼 크기 순서가 거꾸로 돼요.' },
      { q: '방정식과 부등식은 뭐가 달라요?', a: '방정식은 등호(=)로 "같다"를, 부등식은 부등호로 "크다·작다"를 나타내요. 방정식의 해는 보통 한 값이지만 부등식의 해는 범위예요.' },
    ],
    mistakes: [
      '음수로 나누고도 부등호 방향을 그대로 두는 실수 — 음수로 곱하거나 나누면 방향을 바꿔요.',
      '$x\\ge 2$ 를 수직선에 빈 점으로 그리는 실수 — 2를 포함하면 채운 점이에요.',
    ],
    gens: [
      {
        id: 'solve-basic', level: 1, title: '일차부등식 풀기',
        make: function (R) {
          var a = R.int(2, 6);
          var x0 = R.int(-5, 9);
          var b = R.nonzero(-9, 9);
          var c = a * x0 + b;
          var op = R.pick(['>', '<', '\\ge', '\\le']);
          var right = '$x' + op + ' ' + x0 + '$';
          var reasons = {};
          reasons['$x' + FLIP[op] + ' ' + x0 + '$'] = '부등호 방향을 바꿨어요. 양수로 나누면 방향은 그대로예요.';
          reasons['$x' + op + ' ' + (x0 + 1) + '$'] = '계산을 다시 확인해 보세요. 상수항을 옮긴 뒤 ' + ro(a) + ' 나눠요.';
          reasons['$x' + op + ' ' + (x0 - 1) + '$'] = '계산을 다시 확인해 보세요. 상수항을 옮긴 뒤 ' + ro(a) + ' 나눠요.';
          reasons['$x' + op + ' ' + (-x0) + '$'] = '부호를 잘못 옮겼어요. 양쪽에서 같은 수를 빼거나 더해요.';
          reasons['$x' + FLIP[op] + ' ' + (x0 + 1) + '$'] = '방향도 바뀌고 값도 틀렸어요. 한 단계씩 다시 풀어 봐요.';
          var ch = R.choices(right, Object.keys(reasons), 4);
          var move = b > 0 ? '양쪽에서 ' + eul(b) + ' 빼면' : '양쪽에 ' + eul(-b) + ' 더하면';
          return {
            type: 'choice', concept: 2,
            q: '일차부등식 $' + R.fmt.poly([a, b]) + ' ' + op + ' ' + c + '$ 의 해는?',
            choices: ch.choices,
            answer: ch.answer,
            why: ch.choices.map(function (s, i) { return i === ch.answer ? '' : (reasons[s] || ''); }),
            explain: move + ' $' + a + 'x ' + op + ' ' + (c - b) + '$, 양쪽을 양수 ' + ro(a) + ' 나누면 방향은 그대로라서 $x ' + op + ' ' + x0 + '$ 예요.',
          };
        },
      },
      {
        id: 'count-natural', level: 2, title: '자연수 해의 개수',
        make: function (R) {
          var a = R.int(2, 6);
          var k = R.int(2, 8);
          var r = R.int(1, a - 1);
          var c = a * k + r;
          return {
            type: 'short', check: 'number', unit: '개', concept: 3,
            q: '$x$ 가 자연수일 때, 부등식 $' + a + 'x<' + c + '$ 를 만족하는 $x$ 는 모두 몇 개일까요?',
            answer: String(k),
            wrong: [{ a: String(k + 1), why: '$x<' + k + '\\frac{' + r + '}{' + a + '}$ 이므로 ' + eun(k + 1) + ' 해가 아니에요.' }],
            hint: '먼저 양쪽을 ' + ro(a) + ' 나눠 $x$ 의 범위를 구해요.',
            explain: '양쪽을 ' + ro(a) + ' 나누면 $x<' + k + '\\frac{' + r + '}{' + a + '}$ 이므로, 자연수 $x$ 는 1부터 ' + k + '까지 ' + k + '개예요.',
          };
        },
      },
    ],
  });
})();
