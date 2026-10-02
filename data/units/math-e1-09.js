/* 1학년 수학 · 덧셈과 뺄셈(2)
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 세 수의 덧셈·뺄셈(9까지의 수), 10이 되는 더하기, 10에서 빼기, 10을 만들어 세 수 더하기(합은 19까지).
 * 받아올림이 있는 (몇)+(몇)은 다음 단원(덧셈과 뺄셈(3))에서 배우므로 여기서는 "10을 만든 뒤 10과 몇"만 쓴다.
 * 그림: 10칸 틀과 점은 아래 도우미가 직접 그린 svg (색은 currentColor·var(--fig-n)) */
(function () {
  // 10칸 틀(2줄 × 5칸): a 개는 1번 색, 이어서 b 개는 2번 색, 마지막 cross 개(채운 것 가운데)는 × 표시
  function frame(a, b, cross, alt) {
    var s = '', n = a + (b || 0);
    for (var i = 0; i < 10; i++) {
      var x = 10 + (i % 5) * 40, y = 10 + Math.floor(i / 5) * 40;
      s += '<rect x="' + x + '" y="' + y + '" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/>';
      if (i < n) {
        s += '<circle cx="' + (x + 20) + '" cy="' + (y + 20) + '" r="13" fill="' + (i < a ? 'var(--fig-1)' : 'var(--fig-2)') + '" fill-opacity="0.75" stroke="currentColor" stroke-width="1.5"/>';
        if (cross && i >= n - cross) {
          s += '<path d="M' + (x + 8) + ' ' + (y + 8) + 'L' + (x + 32) + ' ' + (y + 32) + 'M' + (x + 32) + ' ' + (y + 8) + 'L' + (x + 8) + ' ' + (y + 32) + '" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
        }
      }
    }
    return { type: 'svg', svg: '<svg viewBox="0 0 220 100">' + s + '</svg>', alt: alt };
  }
  // 세 무리의 점 (무리마다 다른 색, 5개씩 세로 줄)
  function dots3(list, alt) {
    var FILL = ['var(--fig-1)', 'var(--fig-2)', 'var(--fig-3)'];
    var x = 16, s = '';
    list.forEach(function (n, k) {
      for (var j = 0; j < n; j++) {
        s += '<circle cx="' + (x + Math.floor(j / 5) * 26) + '" cy="' + (18 + (j % 5) * 26) + '" r="10" fill="' + FILL[k] + '" fill-opacity="0.75" stroke="currentColor" stroke-width="1.5"/>';
      }
      x += Math.ceil(n / 5) * 26 + 30;
    });
    return { type: 'svg', svg: '<svg viewBox="0 0 ' + (x - 14) + ' 140">' + s + '</svg>', alt: alt };
  }

Tutor.registerUnit({
  id: 'math-e1-09',
  course: 'math-e1',
  title: '덧셈과 뺄셈(2)',
  summary: '세 수의 덧셈과 뺄셈을 하고, 10이 되는 더하기와 10에서 빼기, 10을 만들어 세 수를 더하는 방법을 배워요.',
  goals: [
    '세 수의 덧셈과 뺄셈을 앞에서부터 차례로 계산할 수 있어요.',
    '더해서 10이 되는 두 수를 찾고, 10에서 뺄 수 있어요.',
    '10을 먼저 만들어 세 수를 더할 수 있어요.',
  ],
  standards: ['[2수01-04]', '[2수01-05]'],

  concepts: [
    {
      title: '세 수의 덧셈',
      body: '세 수를 더할 때는 **앞에서부터 차례로** 더해요.\n\n$2+3+4$를 계산해 봐요.\n\n1. 앞의 두 수를 먼저 더해요. $2+3=5$\n2. 그 답에 남은 수를 더해요. $5+4=9$\n\n그래서 $2+3+4=9$예요.\n\n> 💡 첫 번째 답을 식 위에 작게 써 두면 헷갈리지 않아요.',
      easy: '바구니에 사과를 넣는다고 생각해요.\n\n먼저 2개를 넣고, 3개를 더 넣어요. 바구니에 5개가 있어요.\n\n또 4개를 넣어요. 5개에 4개를 더하니 9개예요.\n\n한 번에 하나씩 넣으면 쉬워요.',
      fig: dots3([2, 3, 4], '점 2개, 3개, 4개가 세 무리로 있는 그림'),
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$1+3+2$',
        answer: '6',
        wrong: [{ a: '4', why: '앞의 두 수만 더했어요. $1+3=4$에 2를 더 더해요.' }],
        explain: '앞에서부터 $1+3=4$, 그다음 $4+2=6$이에요.',
      },
    },
    {
      title: '세 수의 뺄셈',
      body: '세 수의 뺄셈도 **앞에서부터 차례로** 계산해요.\n\n$9-2-3$을 계산해 봐요.\n\n1. 앞의 두 수를 먼저 계산해요. $9-2=7$\n2. 그 답에서 남은 수를 빼요. $7-3=4$\n\n그래서 $9-2-3=4$예요.\n\n> ⚠️ 뺄셈은 차례가 중요해요. 뒤의 두 수 $2-3$을 먼저 하면 안 돼요.',
      easy: '쿠키가 9개 있어요. 동생이 2개를 먹었어요. 7개가 남아요.\n\n언니가 3개를 더 먹었어요. 7개에서 3개가 줄어 4개가 남아요.\n\n먹은 차례대로 하나씩 빼면 돼요.',
      fig: frame(9, 0, 5, '9개 중 5개에 × 표시를 한 10칸 틀'),
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$8-3-2$',
        answer: '3',
        wrong: [{ a: '5', why: '앞의 두 수만 계산했어요. $8-3=5$에서 2를 더 빼요.' }],
        explain: '앞에서부터 $8-3=5$, 그다음 $5-2=3$이에요.',
      },
    },
    {
      title: '10이 되는 더하기',
      body: '더해서 **10**이 되는 두 수가 있어요.\n\n| 1과 9 | 2와 8 | 3과 7 | 4와 6 | 5와 5 |\n|---|---|---|---|---|\n| $1+9=10$ | $2+8=10$ | $3+7=10$ | $4+6=10$ | $5+5=10$ |\n\n10칸 틀에 7개가 있으면 빈칸이 3개예요. 그래서 $7+3=10$이에요.\n\n두 수를 바꾸어 더해도 10이에요. $3+7=10$\n\n> 💡 10이 되는 짝을 외워 두면 큰 수 계산이 쉬워져요.',
      easy: '두 손을 펴 봐요. 손가락이 모두 10개예요.\n\n손가락 7개를 접으면 펴진 손가락은 3개예요. 접은 것과 편 것을 더하면 10이에요.\n\n그래서 7과 3은 10의 짝꿍이에요.',
      fig: frame(7, 3, 0, '10칸 틀에 7개와 3개가 채워진 그림'),
      check: {
        type: 'choice',
        q: '6과 더해서 10이 되는 수는 무엇일까요?',
        choices: ['4', '3', '5'],
        answer: 0,
        why: ['', '$6+3=9$예요. 10이 되려면 하나 더 있어야 해요.', '$6+5=11$이에요. 10보다 커요.'],
        explain: '$6+4=10$이에요. 10칸 틀에 6개가 있으면 빈칸은 4개예요.',
      },
    },
    {
      title: '10에서 빼기',
      body: '10에서 빼는 것은 10이 되는 짝을 떠올리면 쉬워요.\n\n$10-4$를 계산해 봐요.\n\n4와 더해서 10이 되는 수는 6이에요. 그래서 $10-4=6$이에요.\n\n10칸 틀에 10개가 있어요. 4개에 ×를 그으면 6개가 남아요.\n\n> 💡 $4+6=10$이면 $10-4=6$, $10-6=4$예요.',
      easy: '연필 10자루가 필통에 있어요. 친구에게 4자루를 빌려주면 몇 자루가 남을까요?\n\n10칸 틀에서 4칸을 지우면 6칸이 남아요. 6자루가 남아요.',
      fig: frame(10, 0, 4, '10칸 틀의 10개 중 4개에 × 표시를 한 그림'),
      check: {
        type: 'short', check: 'number',
        q: '계산해 보세요.\n\n$10-3$',
        answer: '7',
        wrong: [{ a: '13', why: '빼기 대신 더했어요. 10에서 3을 빼요.' }],
        explain: '$3+7=10$이니까 $10-3=7$이에요.',
      },
    },
    {
      title: '10을 만들어 세 수 더하기',
      body: '세 수 가운데 **더해서 10이 되는 두 수**가 있으면 먼저 더해요.\n\n$6+4+3$\n\n1. 6과 4를 더하면 10이에요.\n2. 10과 3을 더하면 13이에요.\n\n$5+2+8$은 뒤의 두 수 2와 8을 먼저 더해요.\n\n1. $2+8=10$\n2. $5+10=15$\n\n> 💡 10과 몇은 "십몇"이에요. 10과 3은 13, 10과 5는 15예요.',
      easy: '10은 한 묶음이에요. 낱개 6개와 4개를 모으면 10개짜리 한 묶음이 돼요.\n\n한 묶음과 낱개 3개는 13이에요.\n\n묶음을 먼저 만들면 세기가 훨씬 쉬워요.',
      fig: dots3([6, 4, 3], '점 6개, 4개, 3개가 세 무리로 있는 그림'),
      check: {
        type: 'choice',
        q: '$3+7+5$를 계산할 때 먼저 더하면 10이 되는 두 수는 무엇일까요?',
        choices: ['3과 7', '7과 5', '3과 5'],
        answer: 0,
        why: ['', '$7+5$는 10이 아니에요. 7의 짝꿍은 3이에요.', '$3+5=8$이에요. 10이 되지 않아요.'],
        explain: '$3+7=10$이에요. 그다음 $10+5=15$로 쉽게 구해요.',
      },
    },
  ],

  examples: [
    {
      q: '계산해 보세요.\n\n$9-4-1$',
      steps: [
        '앞에서부터 차례로 계산해요.',
        '$9-4=5$',
        '$5-1=4$',
      ],
      answer: '$9-4-1=4$',
    },
    {
      q: '계산해 보세요.\n\n$4+8+2$',
      steps: [
        '세 수 가운데 더해서 10이 되는 두 수를 찾아요. 8과 2예요.',
        '$8+2=10$',
        '10과 4를 더하면 14예요.',
      ],
      answer: '$4+8+2=14$',
    },
  ],

  terms: [
    { term: '세 수의 덧셈', def: '수 세 개를 더하는 것이에요. 앞에서부터 차례로 더해요. 예: $2+3+4=9$' },
    { term: '세 수의 뺄셈', def: '한 수에서 두 수를 차례로 빼는 것이에요. 예: $9-2-3=4$' },
    { term: '10이 되는 더하기', def: '더해서 10이 되는 두 수예요. 1과 9, 2와 8, 3과 7, 4와 6, 5와 5가 있어요.' },
    { term: '10칸 틀', def: '2줄에 5칸씩 모두 10칸인 틀이에요. 빈칸을 보면 10이 되려면 몇이 더 필요한지 알 수 있어요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '계산해 보세요.\n\n$3+2+4$',
      answer: '9',
      wrong: [{ a: '5', why: '앞의 두 수만 더했어요. $3+2=5$에 4를 더 더해요.' }],
      explain: '$3+2=5$, 그다음 $5+4=9$예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
      q: '계산해 보세요.\n\n$8-2-5$',
      answer: '1',
      wrong: [
        { a: '6', why: '앞의 두 수만 계산했어요. $8-2=6$에서 5를 더 빼요.' },
        { a: '11', why: '마지막 수를 더했어요. 기호가 모두 −예요.' },
      ],
      explain: '$8-2=6$, 그다음 $6-5=1$이에요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '10이 되려면 6에 얼마를 더해야 할까요?',
      choices: ['4', '3', '5', '16'],
      answer: 0,
      why: ['', '$6+3=9$예요. 하나가 모자라요.', '$6+5=11$이에요. 10보다 커요.', '10과 6을 더했어요. 6에 더해서 10이 되는 수를 찾아요.'],
      explain: '$6+4=10$이에요. 6의 짝꿍은 4예요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', concept: 3,
      q: '계산해 보세요.\n\n$10-7$',
      answer: '3',
      wrong: [{ a: '17', why: '빼기 대신 더했어요. 10에서 7을 빼요.' }],
      explain: '$7+3=10$이니까 $10-7=3$이에요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '$1+9$와 $9+1$은 모두 10이에요.',
      answer: true,
      explain: '두 수를 바꾸어 더해도 합은 같아요. $1+9=10$, $9+1=10$이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: '개', concept: 2,
      q: '10칸 틀을 모두 채우려면 몇 개가 더 있어야 할까요?',
      fig: frame(8, 0, 0, '10칸 틀에 8개가 채워진 그림'),
      answer: '2',
      wrong: [{ a: '8', why: '채워진 칸을 셌어요. 빈칸을 세어요.' }],
      explain: '8개가 채워져 있고 빈칸이 2개예요. $8+2=10$이에요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
      q: '계산해 보세요.\n\n$4+6+5$',
      answer: '15',
      wrong: [{ a: '10', why: '10을 만든 뒤 5를 더하지 않았어요. 10과 5는 15예요.' }],
      explain: '$4+6=10$이에요. 10과 5를 더하면 15예요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 4,
      q: '$2+8+6$을 계산할 때 먼저 더하면 10이 되는 두 수는 무엇일까요?',
      choices: ['2와 8', '8과 6', '2와 6'],
      answer: 0,
      why: ['', '$8+6$은 10보다 커요. 8의 짝꿍은 2예요.', '$2+6=8$이에요. 10이 되지 않아요.'],
      hint: '10이 되는 짝(1과 9, 2와 8, 3과 7, 4와 6, 5와 5)을 떠올려요.',
      explain: '$2+8=10$이에요. 그다음 10과 6을 더하면 16이에요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '명', concept: 1,
      q: '버스에 9명이 타고 있었어요. 첫째 정류장에서 3명이 내리고, 다음 정류장에서 2명이 내렸어요. 버스에 남은 사람은 몇 명일까요?',
      answer: '4',
      hint: '내린 차례대로 빼요.',
      wrong: [
        { a: '6', why: '첫째 정류장에서 내린 사람만 뺐어요. 2명도 빼요.' },
        { a: '14', why: '내린 사람을 더했어요. 내리면 줄어드니 빼요.' },
      ],
      explain: '$9-3-2$를 앞에서부터 계산해요. $9-3=6$, $6-2=4$라서 4명이에요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '지아는 칭찬 붙임딱지를 월요일에 3개, 화요일에 7개, 수요일에 4개 받았어요. 모두 몇 개를 받았을까요?',
      answer: '14',
      hint: '세 수 가운데 10이 되는 두 수를 먼저 더해요.',
      wrong: [{ a: '10', why: '3과 7만 더했어요. 수요일에 받은 4개도 더해요.' }],
      explain: '$3+7+4$에서 $3+7=10$이에요. 10과 4를 더하면 14개예요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '계산 결과가 가장 큰 것은 무엇일까요?',
      choices: ['$10-2$', '$10-5$', '$10-7$', '$10-9$'],
      answer: 0,
      why: ['', '$10-5=5$예요. $10-2=8$이 더 커요.', '$10-7=3$이에요. 더 큰 것이 있어요.', '$10-9=1$이에요. 가장 작아요.'],
      hint: '하나씩 계산해서 비교해 봐요.',
      explain: '$10-2=8$, $10-5=5$, $10-7=3$, $10-9=1$이에요. 가장 큰 것은 $10-2$예요. 적게 뺄수록 많이 남아요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', concept: 3,
      q: '□ 안에 알맞은 수를 구해 보세요.\n\n$10-\\square=4$',
      answer: '6',
      hint: '4와 더해서 10이 되는 수를 생각해요.',
      wrong: [{ a: '14', why: '10과 4를 더했어요. 10에서 몇을 빼야 4가 남는지 찾아요.' }],
      explain: '$4+6=10$이니까 $10-6=4$예요. □는 6이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 0,
      q: '□ 안에 알맞은 수를 구해 보세요.\n\n$\\square+5+3=9$',
      answer: '1',
      hint: '뒤의 두 수를 먼저 더해 보면 □를 찾기 쉬워요.',
      wrong: [{ a: '17', why: '세 수를 모두 더했어요. 더해서 9가 되는 수를 찾아요.' }],
      explain: '$5+3=8$이에요. □에 8을 더해서 9가 되니 □는 1이에요. $1+5+3=9$로 확인해요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 2,
      q: '수 카드 2, 4, 6, 8 중에서 두 장을 골라 더해요. 합이 10이 되는 두 장은 모두 몇 가지일까요?',
      choices: ['1가지', '2가지', '3가지', '4가지'],
      answer: 1,
      why: ['한 가지를 빠뜨렸어요. 2와 8, 4와 6을 모두 찾아요.', '', '합이 10이 되는 짝은 2와 8, 4와 6뿐이에요.', '카드 수를 센 것 같아요. 합이 10이 되는 짝만 세어요.'],
      hint: '2의 짝꿍, 4의 짝꿍을 차례로 찾아요.',
      explain: '$2+8=10$, $4+6=10$이에요. 6과 4, 8과 2는 같은 두 장이에요. 그래서 2가지예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', concept: 1,
      q: '□ 안에 알맞은 수를 구해 보세요.\n\n$9-\\square-2=3$',
      answer: '4',
      hint: '2를 빼기 전에는 얼마였을지 거꾸로 생각해요.',
      wrong: [{ a: '6', why: '$9-3$만 계산했어요. 마지막에 뺀 2도 생각해요.' }],
      explain: '2를 빼서 3이 되었으니, 2를 빼기 전은 5예요. 9에서 몇을 빼면 5일까요? $9-4=5$라서 □는 4예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '사탕 10개가 있었어요. 하윤이가 몇 개를 먹고, 동생에게 2개를 주었더니 3개가 남았어요. 하윤이가 먹은 사탕은 몇 개일까요?',
      answer: '5',
      hint: '동생에게 주기 전에는 몇 개였을지 먼저 생각해요.',
      wrong: [{ a: '7', why: '남은 3개만 10에서 뺐어요. 동생에게 준 2개도 생각해요.' }],
      explain: '동생에게 주기 전에는 $3+2=5$개가 있었어요. 10개에서 먹고 5개가 남았으니 먹은 사탕은 $10-5=5$개예요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '계산 결과가 **다른** 하나는 무엇일까요?',
      choices: ['$7+3+4$', '$5+5+4$', '$1+9+4$', '$6+4+5$'],
      answer: 3,
      why: ['$7+3=10$, 10과 4는 14예요. 결과가 다른 식을 찾아요.', '$5+5=10$, 10과 4는 14예요. 결과가 다른 식을 찾아요.', '$1+9=10$, 10과 4는 14예요. 결과가 다른 식을 찾아요.', ''],
      hint: '먼저 10을 만들고, 남은 수를 봐요.',
      explain: '앞의 세 식은 모두 10과 4라서 14예요. $6+4+5$는 10과 5라서 15예요.',
    },
  ],

  deeper: [
    {
      title: '10을 만드는 힘',
      body: '"10이 되는 짝"은 앞으로 계속 쓰여요.\n\n"덧셈과 뺄셈(3)" 단원에서는 $8+5$처럼 합이 10보다 큰 덧셈을 배워요. 5를 2와 3으로 갈라서 $8+2=10$을 먼저 만들면 $10+3=13$으로 쉽게 구해요.\n\n$13-5$ 같은 뺄셈도 10을 이용하면 쉬워요. 10이 되는 짝을 잘 알아 두면 큰 수 계산이 빨라져요.',
    },
  ],

  faq: [
    {
      q: '세 수의 덧셈은 뒤에서부터 더해도 돼요?',
      a: '덧셈은 어느 두 수를 먼저 더해도 답이 같아요. 그래서 10이 되는 두 수를 먼저 더하면 편해요.\n\n하지만 뺄셈은 꼭 앞에서부터 차례로 해야 해요.',
    },
    {
      q: '왜 10을 먼저 만들어요?',
      a: '10과 몇은 바로 "십몇"으로 읽을 수 있어서 계산이 쉬워요. 10과 3은 13이에요.',
    },
    {
      q: '10이 되는 짝을 어떻게 외워요?',
      a: '손가락을 써 봐요. 접은 손가락과 편 손가락을 더하면 언제나 10이에요. 1과 9, 2와 8, 3과 7, 4와 6, 5와 5예요.',
    },
  ],

  mistakes: [
    '세 수의 덧셈에서 앞의 두 수만 더하고 멈추는 실수 — 남은 수까지 더해요.',
    '$9-2-3$에서 $2-3$을 먼저 하려는 실수 — 뺄셈은 앞에서부터 차례로 계산해요.',
  ],

  gens: [
    {
      id: 'add3',
      level: 1,
      title: '세 수의 덧셈 (합이 9까지)',
      make: function (R) {
        var a = R.int(1, 5), b = R.int(1, 7 - a), c = R.int(1, 9 - a - b);
        var ab = a + b, s = ab + c;
        var fig = R.bool() ? dots3([a, b, c], '점 ' + a + '개, ' + b + '개, ' + c + '개가 세 무리로 있는 그림') : undefined;
        var p = {
          type: 'short', check: 'number', concept: 0,
          q: '계산해 보세요.\n\n$' + a + '+' + b + '+' + c + '$',
          answer: String(s),
          wrong: [{ a: String(ab), why: '앞의 두 수만 더했어요. $' + a + '+' + b + '=' + ab + '$에 ' + c + R.josa(c, '을/를') + ' 더 더해요.' }],
          explain: '앞에서부터 차례로 더해요. $' + a + '+' + b + '=' + ab + '$, 그다음 $' + ab + '+' + c + '=' + s + '$' + R.josa(s, '이에요/예요') + '.',
        };
        if (fig) p.fig = fig;
        return p;
      },
    },
    {
      id: 'sub3',
      level: 1,
      title: '세 수의 뺄셈 (9까지의 수)',
      make: function (R) {
        var a = R.int(4, 9), b = R.int(1, a - 3), c = R.int(1, a - b - 1);
        var ab = a - b, r = ab - c;
        var wrong = [{ a: String(ab), why: '앞의 두 수만 계산했어요. $' + a + '-' + b + '=' + ab + '$에서 ' + c + R.josa(c, '을/를') + ' 더 빼요.' }];
        if (ab + c !== ab) wrong.push({ a: String(ab + c), why: '마지막 수를 더했어요. 기호가 모두 −예요.' });
        return {
          type: 'short', check: 'number', concept: 1,
          q: '계산해 보세요.\n\n$' + a + '-' + b + '-' + c + '$',
          answer: String(r),
          wrong: wrong,
          explain: '앞에서부터 차례로 계산해요. $' + a + '-' + b + '=' + ab + '$, 그다음 $' + ab + '-' + c + '=' + r + '$' + R.josa(r, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'make10',
      level: 1,
      title: '10이 되는 더하기와 10에서 빼기',
      make: function (R) {
        var mode = R.int(0, 3), a = R.int(1, 9), b = 10 - a;
        if (mode === 0) {
          return {
            type: 'short', check: 'number', concept: 2,
            q: '□ 안에 알맞은 수를 구해 보세요.\n\n$' + a + '+\\square=10$',
            answer: String(b),
            wrong: [{ a: String(10 + a), why: '10과 ' + a + R.josa(a, '을/를') + ' 더했어요. ' + a + '에 더해서 10이 되는 수를 찾아요.' }],
            explain: '10칸 틀에 ' + a + '개가 있으면 빈칸은 ' + b + '개예요. $' + a + '+' + b + '=10$이라서 □는 ' + b + R.josa(b, '이에요/예요') + '.',
          };
        }
        if (mode === 1) {
          return {
            type: 'short', check: 'number', unit: '개', concept: 2,
            q: '10칸 틀을 모두 채우려면 몇 개가 더 있어야 할까요?',
            fig: frame(a, 0, 0, '10칸 틀에 ' + a + '개가 채워진 그림'),
            answer: String(b),
            wrong: a !== b ? [{ a: String(a), why: '채워진 칸을 셌어요. 빈칸을 세어요.' }] : [],
            explain: a + '개가 채워져 있고 빈칸이 ' + b + '개예요. $' + a + '+' + b + '=10$' + R.josa(10, '이에요/예요') + '.',
          };
        }
        if (mode === 2) {
          return {
            type: 'short', check: 'number', concept: 3,
            q: '계산해 보세요.\n\n$10-' + a + '$',
            answer: String(b),
            wrong: [{ a: String(10 + a), why: '빼기 대신 더했어요. 10에서 ' + a + R.josa(a, '을/를') + ' 빼요.' }],
            explain: '$' + a + '+' + b + '=10$이니까 $10-' + a + '=' + b + '$' + R.josa(b, '이에요/예요') + '.',
          };
        }
        return {
          type: 'short', check: 'number', concept: 3,
          q: '□ 안에 알맞은 수를 구해 보세요.\n\n$10-\\square=' + b + '$',
          answer: String(a),
          wrong: [{ a: String(10 + b), why: '10과 ' + b + R.josa(b, '을/를') + ' 더했어요. 10에서 몇을 빼야 ' + b + R.josa(b, '이/가') + ' 남는지 찾아요.' }],
          explain: '$' + b + '+' + a + '=10$이니까 $10-' + a + '=' + b + '$' + R.josa(b, '이에요/예요') + '. □는 ' + a + R.josa(a, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'add3-make10',
      level: 2,
      title: '10을 만들어 세 수 더하기',
      make: function (R) {
        var a = R.int(1, 9), b = 10 - a, c = R.int(1, 9), front = R.bool();
        var s = 10 + c;
        var nums = front ? [a, b, c] : [c, a, b];
        var expr = nums.join('+');
        var pairTxt = a + R.josa(a, '과/와') + ' ' + b;
        if (a !== 5 && c !== a && c !== b && R.bool()) {
          // 먼저 더할 두 수 고르기 (다른 짝이 10이 되거나 보기가 겹치는 경우는 빼고)
          var correct = pairTxt;
          var other1 = front ? b + R.josa(b, '과/와') + ' ' + c : c + R.josa(c, '과/와') + ' ' + a;
          var other2 = front ? a + R.josa(a, '과/와') + ' ' + c : c + R.josa(c, '과/와') + ' ' + b;
          var cands = [
            [other1, '두 수를 더하면 $' + (front ? b + '+' + c + '=' + (b + c) : c + '+' + a + '=' + (c + a)) + '$' + R.josa(front ? b + c : c + a, '이에요/예요') + '. 10이 되는 짝을 찾아요.'],
            [other2, '두 수를 더하면 $' + (front ? a + '+' + c + '=' + (a + c) : c + '+' + b + '=' + (c + b)) + '$' + R.josa(front ? a + c : c + b, '이에요/예요') + '. 10이 되는 짝을 찾아요.'],
          ];
          var reason = {};
          cands.forEach(function (x) { if (!(x[0] in reason)) reason[x[0]] = x[1]; });
          var pick = R.choices(correct, cands.map(function (x) { return x[0]; }), 3);
          return {
            type: 'choice', concept: 4,
            q: '$' + expr + '$' + R.josa(nums[2], '을/를') + ' 계산할 때 먼저 더하면 10이 되는 두 수는 무엇일까요?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (x) { return x === correct ? '' : reason[x] || ''; }),
            hint: '10이 되는 짝(1과 9, 2와 8, 3과 7, 4와 6, 5와 5)을 떠올려요.',
            explain: '$' + a + '+' + b + '=10$이에요. 그다음 10과 ' + c + R.josa(c, '을/를') + ' 더하면 ' + s + R.josa(s, '이에요/예요') + '.',
          };
        }
        return {
          type: 'short', check: 'number', concept: 4,
          q: '계산해 보세요.\n\n$' + expr + '$',
          answer: String(s),
          hint: '세 수 가운데 더해서 10이 되는 두 수를 먼저 더해요.',
          wrong: [{ a: '10', why: '10을 만든 뒤 ' + c + R.josa(c, '을/를') + ' 더하지 않았어요. 10과 ' + c + R.josa(c, '은/는') + ' ' + s + R.josa(s, '이에요/예요') + '.' }],
          explain: (front ? '앞의' : '뒤의') + ' 두 수 ' + pairTxt + R.josa(b, '을/를') + ' 먼저 더하면 $' + a + '+' + b + '=10$' + R.josa(10, '이에요/예요') + '. 10과 ' + c + R.josa(c, '을/를') + ' 더하면 ' + s + R.josa(s, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'missing3',
      level: 3,
      title: '세 수의 계산에서 □ 구하기',
      make: function (R) {
        var form = R.int(0, 2);
        if (form === 0) {
          // □ + b + c = s (s ≤ 9)
          var x = R.int(1, 5), b = R.int(1, 7 - x), c = R.int(1, 9 - x - b), s = x + b + c, bc = b + c;
          return {
            type: 'short', check: 'number', concept: 0,
            q: '□ 안에 알맞은 수를 구해 보세요.\n\n$\\square+' + b + '+' + c + '=' + s + '$',
            answer: String(x),
            hint: '뒤의 두 수를 먼저 더해 봐요.',
            wrong: [{ a: String(s + bc), why: '수를 모두 더했어요. 더해서 ' + s + R.josa(s, '이/가') + ' 되는 수를 찾아요.' }],
            explain: '$' + b + '+' + c + '=' + bc + '$' + R.josa(bc, '이에요/예요') + '. □에 ' + bc + R.josa(bc, '을/를') + ' 더해서 ' + s + R.josa(s, '이/가') + ' 되니 □는 $' + s + '-' + bc + '=' + x + '$' + R.josa(x, '이에요/예요') + '.',
          };
        }
        if (form === 1) {
          // a - □ - c = r
          var a = R.int(5, 9), y = R.int(1, a - 3), c2 = R.int(1, a - y - 1), r = a - y - c2, before = r + c2;
          return {
            type: 'short', check: 'number', concept: 1,
            q: '□ 안에 알맞은 수를 구해 보세요.\n\n$' + a + '-\\square-' + c2 + '=' + r + '$',
            answer: String(y),
            hint: c2 + R.josa(c2, '을/를') + ' 빼기 전에는 얼마였을지 거꾸로 생각해요.',
            wrong: a - r !== y ? [{ a: String(a - r), why: '$' + a + '-' + r + '$만 계산했어요. 마지막에 뺀 ' + c2 + '도 생각해요.' }] : [],
            explain: c2 + R.josa(c2, '을/를') + ' 빼서 ' + r + R.josa(r, '이/가') + ' 되었으니, 빼기 전은 $' + r + '+' + c2 + '=' + before + '$' + R.josa(before, '이에요/예요') + '. $' + a + '-' + y + '=' + before + '$이므로 □는 ' + y + R.josa(y, '이에요/예요') + '.',
          };
        }
        // a + □ + c = 10 + c (a + □ = 10)
        var a3 = R.int(1, 9), c3 = R.int(1, 9), y3 = 10 - a3, s3 = 10 + c3;
        return {
          type: 'short', check: 'number', concept: 4,
          q: '□ 안에 알맞은 수를 구해 보세요.\n\n$' + a3 + '+\\square+' + c3 + '=' + s3 + '$',
          answer: String(y3),
          hint: s3 + R.josa(s3, '은/는') + ' 10과 ' + c3 + R.josa(c3, '이에요/예요') + '. 앞의 두 수를 더하면 얼마일까요?',
          wrong: c3 === y3 ? [] : [{ a: String(c3), why: '마지막 수를 그대로 썼어요. 앞의 두 수 ' + a3 + R.josa(a3, '과/와') + ' □를 더하면 10이 되어야 해요.' }],
          explain: s3 + R.josa(s3, '은/는') + ' 10과 ' + c3 + R.josa(c3, '이에요/예요') + '. 그래서 $' + a3 + '+\\square=10$이고, □는 ' + y3 + R.josa(y3, '이에요/예요') + '.',
        };
      },
    },
  ],
});
})();
