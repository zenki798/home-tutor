/* 2학년 수학 · 길이 재기(m)
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 2학년 범위: 길이의 합과 차는 받아올림·받아내림이 없는 것만 다룬다(받아올림이 있는 길이 계산은 3학년). */
(function () {
  var NAMES = ['민수', '지아', '서준', '하윤', '도윤', '수아', '예준', '서연'];

  // 몇 m 몇 cm 글자 (cm 가 0 이면 몇 m 만)
  function L(m, c) {
    if (m === 0) return c + ' cm';
    return c === 0 ? m + ' m' : m + ' m ' + c + ' cm';
  }

  // 줄자 그림: from~to cm 눈금, at 에 물건 끝
  function tape(from, to, at, label) {
    return {
      type: 'numberline', min: from, max: to, step: 1, labelEvery: 10,
      points: [{ x: at, label: label || '끝' }],
      alt: from + ' cm부터 ' + to + ' cm까지 눈금이 있는 줄자. 물건의 끝이 한 눈금을 가리켜요.',
    };
  }

Tutor.registerUnit({
  id: 'math-e2-09',
  course: 'math-e2',
  title: '길이 재기(m)',
  summary: '1 m=100 cm임을 알고, 길이를 몇 m 몇 cm로 나타내며, 길이를 더하고 빼고 어림해요.',
  goals: [
    '1 m가 100 cm인 것을 알아요.',
    '길이를 몇 m 몇 cm와 몇 cm로 바꾸어 나타낼 수 있어요.',
    '줄자로 길이를 재고, 길이의 합과 차를 구할 수 있어요.',
    '몸의 일부를 이용해 길이를 어림할 수 있어요.',
  ],
  standards: ['[2수03-10]', '[2수03-11]', '[2수03-12]', '[2수03-13]'],

  concepts: [
    {
      title: '1 m 알아보기',
      body: '긴 길이는 cm로 재면 수가 너무 커요. 그래서 더 긴 단위를 써요.\n\n**100 cm는 1 m**예요. 1 m는 **1 미터**라고 읽어요.\n\n$1\\text{ m}=100\\text{ cm}$\n\n1 cm가 100번 모이면 1 m가 돼요. 2 m는 200 cm, 3 m는 300 cm예요.\n\n> 💡 어른 걸음으로 두 걸음쯤이 1 m예요.',
      easy: '30 cm 자를 생각해 보세요. 그 자를 세 번 대고 조금 더 가면 1 m쯤이에요.\n\n1 cm짜리 작은 칸이 100개 모인 긴 막대가 1 m예요. 그래서 1 m는 100 cm예요.',
      fig: { type: 'numberline', min: 0, max: 100, step: 10, labelEvery: 1, alt: '0부터 100 cm까지 10 cm마다 눈금이 있는 1 m 자' },
      check: {
        type: 'ox',
        q: '1 m는 10 cm와 길이가 같아요.',
        answer: false,
        explain: '1 m는 10 cm가 아니라 **100 cm**예요. 1 cm가 100번 모여야 1 m가 돼요.',
      },
    },
    {
      title: '몇 m 몇 cm',
      body: '130 cm는 100 cm와 30 cm를 합한 길이예요. 100 cm는 1 m이니까 130 cm는 **1 m 30 cm**예요.\n\n1 m 30 cm는 **1 미터 30 센티미터**라고 읽어요.\n\n| 몇 cm | 몇 m 몇 cm |\n|---|---|\n| 130 cm | 1 m 30 cm |\n| 245 cm | 2 m 45 cm |\n| 308 cm | 3 m 8 cm |\n\n> ⚠️ 3 m 8 cm는 38 cm가 아니에요. 3 m는 300 cm이니까 **308 cm**예요.',
      easy: '돈으로 생각해 보세요. 100원짜리 동전 1개와 10원짜리 동전 3개는 130원이지요.\n\n길이도 같아요. 1 m(100 cm) 하나와 30 cm를 합하면 130 cm예요. 백의 자리 수가 m, 나머지가 cm예요.',
      check: {
        type: 'short', check: 'number', unit: 'cm',
        q: '1 m 40 cm는 몇 cm일까요?',
        answer: '140',
        wrong: [
          { a: '41', why: '1 m를 1 cm로 생각했어요. 1 m는 100 cm예요.' },
          { a: '1040', why: '100과 40을 이어 썼어요. 100 cm와 40 cm를 더하면 140 cm예요.' },
        ],
        explain: '1 m는 100 cm예요. 100 cm와 40 cm를 합하면 140 cm예요.',
      },
    },
    {
      title: '줄자로 길이 재기',
      body: '**줄자**는 길게 늘어나는 자예요. 긴 길이나 둥근 물건의 둘레를 잴 때 좋아요.\n\n재는 방법:\n1. 물건의 한쪽 끝을 줄자의 **0 눈금**에 맞춰요.\n2. 줄자를 곧게 펴요.\n3. 다른 쪽 끝이 가리키는 **눈금을 읽어요.**\n\n눈금이 135를 가리키면 135 cm, 곧 1 m 35 cm예요.',
      easy: '줄자는 말려 있는 긴 자예요. 쭉 당기면 나와요.\n\n출발선이 0이라고 생각해요. 달리기할 때 출발선에서 출발하듯, 물건의 끝도 0에서 출발해야 바르게 잴 수 있어요.',
      fig: tape(100, 150, 135),
      check: {
        type: 'choice',
        q: '줄자로 길이를 잴 때 물건의 한쪽 끝을 어느 눈금에 맞출까요?',
        choices: ['0', '1', '10'],
        answer: 0,
        why: ['', '1에 맞추면 1 cm만큼 길게 읽게 돼요. 0에 맞춰요.', '10에 맞추면 10 cm만큼 길게 읽게 돼요. 0에 맞춰요.'],
        explain: '물건의 한쪽 끝을 0 눈금에 맞춰야 다른 쪽 끝의 눈금이 바로 길이가 돼요.',
      },
    },
    {
      title: '길이의 합',
      body: '두 길이를 더할 때는 **m는 m끼리, cm는 cm끼리** 더해요.\n\n1 m 20 cm + 2 m 50 cm\n\n- m끼리: 1 + 2 = 3\n- cm끼리: 20 + 50 = 70\n\n그래서 **3 m 70 cm**예요.\n\n> 💡 같은 단위끼리 더해요. m와 cm를 섞어 더하면 안 돼요.',
      easy: '사과는 사과끼리, 귤은 귤끼리 세는 것과 같아요.\n\n사과 1개, 귤 20개에 사과 2개, 귤 50개를 더하면 사과 3개, 귤 70개예요. 길이도 m는 m끼리, cm는 cm끼리 모아요.',
      check: {
        type: 'choice',
        q: '2 m 10 cm + 1 m 30 cm는 얼마일까요?',
        choices: ['3 m 40 cm', '3 m 10 cm', '2 m 40 cm'],
        answer: 0,
        why: ['', 'cm끼리 더하는 것을 잊었어요. 10 + 30 = 40이에요.', 'm끼리 더하는 것을 잊었어요. 2 + 1 = 3이에요.'],
        explain: 'm끼리 2 + 1 = 3, cm끼리 10 + 30 = 40이에요. 그래서 3 m 40 cm예요.',
      },
    },
    {
      title: '길이의 차',
      body: '길이를 뺄 때도 **m는 m끼리, cm는 cm끼리** 빼요.\n\n3 m 80 cm − 1 m 50 cm\n\n- m끼리: 3 − 1 = 2\n- cm끼리: 80 − 50 = 30\n\n그래서 **2 m 30 cm**예요.\n\n두 길이의 차는 "얼마나 더 긴지", "얼마나 남았는지"를 알려 줘요.',
      easy: '끈이 3 m 80 cm 있어요. 1 m 50 cm를 잘라 쓰면 남은 끈은 얼마일까요?\n\nm 쪽에서 1을 빼고, cm 쪽에서 50을 빼요. 남은 끈은 2 m 30 cm예요.',
      check: {
        type: 'ox',
        q: '4 m 60 cm − 2 m 20 cm = 2 m 40 cm예요.',
        answer: true,
        explain: 'm끼리 4 − 2 = 2, cm끼리 60 − 20 = 40이에요. 그래서 2 m 40 cm가 맞아요.',
      },
    },
    {
      title: '몸으로 길이 어림하기',
      body: '자가 없을 때는 **몸의 일부**로 길이를 어림할 수 있어요. **어림**은 대강 짐작하는 거예요.\n\n| 몸의 일부 | 길이(어린이, 약) |\n|---|---|\n| 한 뼘 | 약 15 cm |\n| 한 걸음 | 약 50 cm |\n| 양팔을 벌린 길이 | 약 1 m |\n\n두 걸음이 약 1 m라면, 칠판 앞을 6걸음 걸었을 때 칠판 길이는 **약 3 m**예요.\n\n어림한 길이는 앞에 **약**을 붙여 말해요.\n\n> 💡 사람마다 걸음과 팔 길이가 달라요. 내 몸의 길이를 먼저 재어 두면 좋아요.',
      easy: '양팔을 쭉 벌려 보세요. 손끝에서 손끝까지가 1 m쯤이에요.\n\n침대 길이를 양팔로 재어 보니 두 번쯤이면 침대는 약 2 m예요. 꼭 맞지 않아도 괜찮아요. 그래서 "약"이라고 해요.',
      check: {
        type: 'choice',
        q: '교실 문의 높이는 약 얼마일까요?',
        choices: ['약 2 m', '약 2 cm', '약 20 m'],
        answer: 0,
        why: ['', '2 cm는 손톱만큼 짧은 길이예요. 문은 훨씬 높아요.', '20 m는 건물 여러 층 높이예요. 문은 그보다 훨씬 낮아요.'],
        explain: '교실 문은 어른 키보다 조금 높아요. 그래서 약 2 m가 알맞아요.',
      },
    },
  ],

  examples: [
    {
      q: '245 cm는 몇 m 몇 cm일까요?',
      steps: [
        '245 cm를 200 cm와 45 cm로 나누어요.',
        '100 cm가 1 m이니까 200 cm는 2 m예요.',
        '그래서 245 cm는 2 m 45 cm예요.',
      ],
      answer: '2 m 45 cm',
    },
    {
      q: '빨간 끈은 1 m 35 cm, 파란 끈은 2 m 40 cm예요. 두 끈을 겹치지 않게 이으면 모두 몇 m 몇 cm일까요?',
      steps: [
        '이으면 길이를 더해요. 1 m 35 cm + 2 m 40 cm',
        'm끼리 더해요: 1 + 2 = 3',
        'cm끼리 더해요: 35 + 40 = 75',
        '그래서 모두 3 m 75 cm예요.',
      ],
      answer: '3 m 75 cm',
    },
  ],

  terms: [
    { term: '미터(m)', def: '길이의 단위예요. 1 m는 100 cm와 같아요. "1 미터"라고 읽어요.' },
    { term: '센티미터(cm)', def: '길이의 단위예요. 100 cm가 모이면 1 m가 돼요.' },
    { term: '줄자', def: '길게 늘어나는 자예요. 긴 길이나 둥근 물건의 둘레를 잴 때 써요.' },
    { term: '어림', def: '자로 재지 않고 대강 짐작하는 거예요. "약 3 m"처럼 앞에 "약"을 붙여요.' },
    { term: '뼘', def: '손을 쫙 폈을 때 엄지 끝에서 새끼손가락 끝까지의 길이예요.' },
    { term: '길이의 합', def: '두 길이를 더한 것이에요. m는 m끼리, cm는 cm끼리 더해요.' },
    { term: '길이의 차', def: '긴 길이에서 짧은 길이를 뺀 것이에요. m는 m끼리, cm는 cm끼리 빼요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 0,
      q: '3 m는 몇 cm일까요?',
      answer: '300',
      wrong: [
        { a: '30', why: '1 m를 10 cm로 생각했어요. 1 m는 100 cm예요.' },
        { a: '3', why: 'm를 cm로 바꾸지 않았어요. 1 m는 100 cm예요.' },
      ],
      explain: '1 m는 100 cm예요. 3 m는 100 cm가 3번이니까 300 cm예요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '1 m 6 cm를 cm로 나타낸 것은 무엇일까요?',
      choices: ['106 cm', '16 cm', '160 cm', '1006 cm'],
      answer: 0,
      why: [
        '',
        '1 m를 1 cm로 생각했어요. 1 m는 100 cm예요.',
        '6 cm를 60 cm로 읽었어요. 6 cm는 십의 자리가 0이에요.',
        '100과 6을 이어 썼어요. 100 cm와 6 cm를 더하면 106 cm예요.',
      ],
      explain: '1 m는 100 cm예요. 100 cm와 6 cm를 합하면 106 cm예요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', concept: 1,
      q: '□ 안에 알맞은 수를 써 보세요.\n\n254 cm = □ m 54 cm',
      answer: '2',
      wrong: [{ a: '25', why: '앞의 두 자리를 m로 썼어요. 100 cm가 1 m이니까 백의 자리 수 2가 m예요.' }],
      explain: '254 cm는 200 cm와 54 cm예요. 200 cm는 2 m이니까 254 cm는 2 m 54 cm예요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 2,
      q: '줄자로 막대의 길이를 재었어요. 막대의 한쪽 끝은 0 눈금에 맞췄어요. 그림은 다른 쪽 끝 부분의 줄자예요. 눈금을 읽으면 몇 cm일까요?',
      fig: tape(100, 150, 128, '?'),
      answer: '128',
      wrong: [
        { a: '138', why: '눈금을 한 칸(10 cm) 더 세었어요. 120 다음 작은 눈금을 하나씩 세어 보세요.' },
        { a: '122', why: '작은 눈금을 덜 세었어요. 120에서 작은 눈금 8칸을 더 가요.' },
      ],
      explain: '큰 눈금 120을 지나 작은 눈금 8칸을 더 갔어요. 그래서 128 cm, 곧 1 m 28 cm예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '1 m 25 cm + 3 m 60 cm는 얼마일까요?',
      choices: ['4 m 85 cm', '4 m 25 cm', '3 m 85 cm', '2 m 35 cm'],
      answer: 0,
      why: [
        '',
        'cm끼리 더하는 것을 잊었어요. 25 + 60 = 85예요.',
        'm끼리 더하는 것을 잊었어요. 1 + 3 = 4예요.',
        '빼기를 했어요. 문제는 더하기예요.',
      ],
      explain: 'm끼리 1 + 3 = 4, cm끼리 25 + 60 = 85예요. 그래서 4 m 85 cm예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', concept: 4,
      q: '□ 안에 알맞은 수를 써 보세요.\n\n5 m 70 cm − 2 m 30 cm = 3 m □ cm',
      answer: '40',
      wrong: [{ a: '100', why: 'cm끼리 더했어요. 빼기이므로 70 − 30을 계산해요.' }],
      explain: 'm끼리 5 − 2 = 3, cm끼리 70 − 30 = 40이에요. 그래서 3 m 40 cm예요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 5,
      q: '길이를 **m**로 나타내기에 가장 알맞은 것은 무엇일까요?',
      choices: ['교실 칠판의 긴 쪽 길이', '연필의 길이', '지우개의 길이', '공책의 짧은 쪽 길이'],
      answer: 0,
      why: [
        '',
        '연필은 1 m보다 훨씬 짧아요. cm로 나타내는 것이 알맞아요.',
        '지우개는 아주 짧아요. cm로 나타내는 것이 알맞아요.',
        '공책은 1 m보다 훨씬 짧아요. cm로 나타내는 것이 알맞아요.',
      ],
      explain: '칠판은 1 m보다 훨씬 길어서 m로 나타내기 좋아요. 연필·지우개·공책은 1 m보다 짧아서 cm가 알맞아요.',
    },
    {
      id: 'p8', level: 2, type: 'ox', concept: 1,
      q: '4 m 7 cm를 cm로 나타내면 47 cm예요.',
      answer: false,
      explain: '4 m는 400 cm예요. 400 cm와 7 cm를 합하면 **407 cm**예요. 47 cm는 1 m도 안 되는 길이예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      q: '두 길이 중 더 긴 것은 무엇일까요?\n\n2 m 15 cm, 209 cm',
      choices: ['2 m 15 cm', '209 cm', '두 길이가 같아요'],
      answer: 0,
      why: [
        '',
        '209라는 수가 커 보여서 골랐어요. 2 m 15 cm를 cm로 바꾸면 215 cm예요.',
        '2 m 15 cm는 215 cm예요. 209 cm와 같지 않아요.',
      ],
      hint: '2 m 15 cm를 몇 cm로 바꾸어 비교해 보세요.',
      explain: '2 m 15 cm는 215 cm예요. 215 cm가 209 cm보다 기니까 2 m 15 cm가 더 길어요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 3,
      q: '지아의 키는 1 m 32 cm예요. 지아가 높이 25 cm인 받침대 위에 올라섰어요. 바닥에서 지아의 머리끝까지는 몇 cm일까요?',
      answer: '157',
      hint: '1 m 32 cm를 먼저 몇 cm로 바꾸어 보세요.',
      wrong: [
        { a: '57', why: '1 m를 빠뜨렸어요. 1 m 32 cm는 132 cm예요.' },
        { a: '107', why: '빼기를 했어요. 받침대 위에 올라서면 높이가 더해져요.' },
      ],
      explain: '1 m 32 cm는 132 cm예요. 132 cm + 25 cm = 157 cm예요. 1 m 57 cm라고 해도 같아요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '리본이 3 m 85 cm 있었어요. 선물을 묶는 데 1 m 20 cm를 썼어요. 남은 리본은 얼마일까요?',
      choices: ['2 m 65 cm', '2 m 85 cm', '1 m 65 cm', '3 m 65 cm'],
      answer: 0,
      why: [
        '',
        'cm끼리 빼는 것을 잊었어요. 85 − 20 = 65예요.',
        'm끼리 뺄 때 잘못 계산했어요. 3 − 1 = 2예요.',
        'm끼리 빼는 것을 잊었어요. 3 − 1 = 2예요.',
      ],
      hint: '남은 길이는 처음 길이에서 쓴 길이를 빼요.',
      explain: 'm끼리 3 − 1 = 2, cm끼리 85 − 20 = 65예요. 남은 리본은 2 m 65 cm예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '민수의 두 걸음은 약 1 m예요. 민수가 교실 앞에서 뒤까지 걸었더니 14걸음이었어요. 교실의 길이는 약 몇 m일까요?',
      choices: ['약 7 m', '약 14 m', '약 28 m', '약 70 m'],
      answer: 0,
      why: [
        '',
        '걸음 수를 그대로 m로 썼어요. 두 걸음이 1 m예요.',
        '걸음 수를 두 번 더했어요. 두 걸음이 모여야 1 m예요.',
        '1 m를 10 cm처럼 생각했어요. 두 걸음씩 묶어 세어 보세요.',
      ],
      hint: '14걸음을 두 걸음씩 묶어 보세요.',
      explain: '두 걸음이 약 1 m예요. 14걸음을 두 걸음씩 묶으면 7묶음이에요. 그래서 교실은 약 7 m예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 3,
      q: '어떤 끈에서 1 m 20 cm를 잘라 냈더니 2 m 45 cm가 남았어요. 처음 끈의 길이는 몇 cm일까요?',
      answer: '365',
      hint: '잘라 낸 길이와 남은 길이를 합하면 처음 길이예요.',
      wrong: [{ a: '125', why: '남은 길이에서 잘라 낸 길이를 뺐어요. 처음 길이는 둘을 더해야 해요.' }],
      explain: '처음 길이 = 남은 길이 + 잘라 낸 길이예요. 2 m 45 cm + 1 m 20 cm = 3 m 65 cm이고, 이것은 365 cm예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
      q: '빨간 끈은 1 m 10 cm, 파란 끈은 2 m 30 cm, 노란 끈은 1 m 25 cm예요. 가장 긴 끈은 가장 짧은 끈보다 몇 cm 더 길까요?',
      answer: '120',
      hint: '세 끈을 모두 cm로 바꾸어 길이를 비교해 보세요.',
      wrong: [
        { a: '105', why: '노란 끈을 가장 짧다고 생각했어요. 1 m 10 cm(110 cm)가 가장 짧아요.' },
        { a: '20', why: 'm끼리 빼는 것을 잊었어요. 2 m 30 cm − 1 m 10 cm = 1 m 20 cm예요.' },
      ],
      explain: '세 끈은 110 cm, 230 cm, 125 cm예요. 가장 긴 끈은 파란 끈(230 cm), 가장 짧은 끈은 빨간 끈(110 cm)이에요. 230 − 110 = 120이니까 120 cm 더 길어요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '걸음', concept: 5,
      q: '도윤이의 한 걸음은 약 50 cm예요. 길이가 약 2 m인 줄넘기 줄을 바닥에 곧게 놓았어요. 도윤이가 줄의 한쪽 끝에서 다른 쪽 끝까지 걸으면 약 몇 걸음일까요?',
      answer: '4',
      hint: '두 걸음이 약 몇 cm인지 먼저 생각해 보세요.',
      wrong: [{ a: '2', why: '한 걸음을 1 m로 생각했어요. 한 걸음은 약 50 cm라서 두 걸음이 1 m예요.' }],
      explain: '50 cm + 50 cm = 100 cm, 곧 두 걸음이 약 1 m예요. 2 m는 1 m가 두 번이니까 두 걸음이 두 번, 약 4걸음이에요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', concept: 1,
      q: '0부터 9까지의 수 중에서 □ 안에 들어갈 수 있는 가장 큰 수를 구해 보세요.\n\n3 m 4□ cm는 348 cm보다 짧아요.',
      answer: '7',
      hint: '3 m 4□ cm를 몇 cm로 바꾸어 348 cm와 비교해 보세요.',
      wrong: [{ a: '8', why: '□가 8이면 348 cm와 길이가 같아져요. 더 짧아야 하니 8은 안 돼요.' }],
      explain: '3 m 4□ cm는 34□ cm예요. 34□가 348보다 작으려면 □는 8보다 작아야 해요. 그래서 가장 큰 수는 7이에요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '막대 두 개의 길이를 합하면 4 m 80 cm예요. 한 막대가 2 m 50 cm라면 다른 막대는 얼마일까요?',
      choices: ['2 m 30 cm', '7 m 30 cm', '2 m 50 cm', '1 m 30 cm'],
      answer: 0,
      why: [
        '',
        '두 길이를 더했어요. 합에서 아는 길이를 빼야 해요.',
        '한 막대의 길이를 그대로 골랐어요. 4 m 80 cm − 2 m 50 cm를 계산해 보세요.',
        'm끼리 뺄 때 잘못 계산했어요. 4 − 2 = 2예요.',
      ],
      hint: '전체 길이에서 아는 막대의 길이를 빼요.',
      explain: '다른 막대 = 4 m 80 cm − 2 m 50 cm예요. m끼리 4 − 2 = 2, cm끼리 80 − 50 = 30이니까 2 m 30 cm예요.',
    },
  ],

  deeper: [
    {
      title: '미터는 어떻게 정해졌을까?',
      body: '옛날에는 나라마다, 마을마다 길이의 단위가 달랐어요. 한 뼘, 한 걸음처럼 몸으로 재니 사람마다 길이가 달라 다툼이 생기기도 했어요.\n\n그래서 약 230년 전 프랑스에서 모두가 함께 쓸 길이 단위로 **미터**를 만들었어요. 지금은 세계 대부분의 나라가 미터를 써요.\n\n3학년에서는 1 m보다 훨씬 긴 **킬로미터(km)**와 1 cm보다 짧은 **밀리미터(mm)**를 배워요.',
    },
  ],

  faq: [
    {
      q: 'm랑 cm는 어떻게 바꿔요?',
      a: '1 m는 100 cm예요. 그래서 몇 m를 cm로 바꿀 때는 뒤에 0을 두 개 붙여요(2 m → 200 cm).\n\n몇 cm를 몇 m 몇 cm로 바꿀 때는 백의 자리 수가 m, 나머지가 cm예요(245 cm → 2 m 45 cm).',
    },
    {
      q: '3 m 5 cm는 왜 35 cm가 아니에요?',
      a: '3 m는 300 cm예요. 300 cm에 5 cm를 더하면 305 cm예요.\n\n35 cm는 1 m도 안 되는 짧은 길이예요. cm가 한 자리 수일 때는 십의 자리에 0을 꼭 써요.',
    },
    {
      q: '어림한 길이는 왜 "약"을 붙여요?',
      a: '걸음이나 뼘으로 잰 길이는 정확하지 않아요. 대강 그쯤이라는 뜻으로 "약"을 붙여요.\n\n정확한 길이가 필요하면 자나 줄자로 재요.',
    },
  ],

  mistakes: [
    '3 m 5 cm를 35 cm라고 쓰는 실수 — 3 m는 300 cm이니까 305 cm예요.',
    '줄자의 끝을 0이 아니라 1에 맞추고 재는 실수 — 물건의 한쪽 끝은 0 눈금에 맞춰요.',
    '길이를 더할 때 m와 cm를 섞어 더하는 실수 — m는 m끼리, cm는 cm끼리 더해요.',
  ],

  gens: [
    {
      id: 'm-cm-convert',
      level: 1,
      title: '몇 m 몇 cm와 몇 cm 바꾸기',
      make: function (R) {
        var m = R.int(1, 9);
        var c = R.bool(0.3) ? R.int(1, 9) : R.int(10, 99);
        var total = m * 100 + c;
        var mode = R.int(0, 2);
        if (mode === 0) {
          // 몇 m 몇 cm → 몇 cm
          var wrong = [{ a: String(m + c), why: 'm와 cm의 수를 그냥 더했어요. ' + m + ' m는 ' + (m * 100) + ' cm예요.' }];
          if (c < 10) wrong.push({ a: String(m * 10 + c), why: 'cm가 한 자리 수일 때는 십의 자리에 0을 써야 해요. ' + m + ' m ' + c + ' cm는 ' + total + ' cm예요.' });
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 1,
            q: m + ' m ' + c + ' cm는 몇 cm일까요?',
            answer: String(total),
            wrong: wrong,
            explain: m + ' m는 ' + (m * 100) + ' cm예요. ' + (m * 100) + ' cm와 ' + c + ' cm를 합하면 ' + total + ' cm예요.',
          };
        }
        if (mode === 1) {
          // 몇 cm → □ m 몇 cm
          var w1 = Math.floor(total / 10);
          return {
            type: 'short', check: 'number', concept: 1,
            q: '□ 안에 알맞은 수를 써 보세요.\n\n' + total + ' cm = □ m ' + c + ' cm',
            answer: String(m),
            wrong: w1 !== m ? [{ a: String(w1), why: '앞의 두 자리를 m로 썼어요. 100 cm가 1 m이니까 백의 자리 수가 m예요.' }] : [],
            explain: total + ' cm는 ' + (m * 100) + ' cm와 ' + c + ' cm예요. ' + (m * 100) + ' cm는 ' + m + ' m이니까 ' + L(m, c) + '예요.',
          };
        }
        // 몇 cm → 몇 m □ cm
        return {
          type: 'short', check: 'number', concept: 1,
          q: '□ 안에 알맞은 수를 써 보세요.\n\n' + total + ' cm = ' + m + ' m □ cm',
          answer: String(c),
          wrong: [{ a: String(total), why: 'cm 칸에 처음 길이를 그대로 썼어요. ' + m + ' m(' + (m * 100) + ' cm)를 빼고 남은 길이를 써요.' }],
          explain: total + ' cm에서 ' + m + ' m, 곧 ' + (m * 100) + ' cm를 빼면 ' + c + ' cm가 남아요. 그래서 ' + L(m, c) + '예요.',
        };
      },
    },
    {
      id: 'len-add-sub',
      level: 1,
      title: '길이의 합과 차 (받아올림·받아내림 없음)',
      make: function (R) {
        var add = R.bool();
        var a1, b1, a2, b2, A, B;
        if (add) {
          a1 = R.int(1, 5); a2 = R.int(1, 4);
          b1 = R.int(10, 60); b2 = R.int(10, 99 - b1);
          A = a1 + a2; B = b1 + b2;
        } else {
          a1 = R.int(3, 9); a2 = R.int(1, a1 - 1);
          b1 = R.int(30, 95); b2 = R.int(10, b1 - 5);
          A = a1 - a2; B = b1 - b2;
        }
        var correct = L(A, B);
        var sign = add ? ' + ' : ' − ';
        var word = add ? '더해요' : '빼요';
        var cands = [
          [L(a1, B), 'm끼리 ' + (add ? '더하는' : '빼는') + ' 것을 잊었어요. ' + a1 + sign + a2 + ' = ' + A + R.josa(A, '이에요/예요') + '.'],
          [L(A, b1), 'cm끼리 ' + (add ? '더하는' : '빼는') + ' 것을 잊었어요. ' + b1 + sign + b2 + ' = ' + B + R.josa(B, '이에요/예요') + '.'],
          [L(A + 1, B), 'm끼리 계산한 값을 다시 확인해 보세요. ' + a1 + sign + a2 + ' = ' + A + R.josa(A, '이에요/예요') + '.'],
          [L(A, B + 10 <= 99 ? B + 10 : B - 10), 'cm끼리 계산한 값을 다시 확인해 보세요. ' + b1 + sign + b2 + ' = ' + B + R.josa(B, '이에요/예요') + '.'],
        ];
        if (add) cands.push([L(a1 - a2 > 0 ? a1 - a2 : a2 - a1, Math.abs(b1 - b2)), '빼기를 했어요. 문제는 더하기예요.']);
        else if (b1 + b2 <= 99) cands.push([L(a1 + a2, b1 + b2), '더하기를 했어요. 문제는 빼기예요.']);
        else cands.push([L(A - 1 > 0 ? A - 1 : A + 2, B), 'm끼리 계산한 값을 다시 확인해 보세요.']);
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: add ? 3 : 4,
          q: '계산해 보세요.\n\n' + L(a1, b1) + sign + L(a2, b2),
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: 'm는 m끼리, cm는 cm끼리 ' + word + '. m끼리 ' + a1 + sign + a2 + ' = ' + A + ', cm끼리 ' + b1 + sign + b2 + ' = ' + B + '이니까 답은 ' + correct + '예요.',
        };
      },
    },
    {
      id: 'len-story',
      level: 2,
      title: '길이의 합과 차 문장제',
      make: function (R) {
        var kind = R.int(0, 2);
        var name = R.pick(NAMES);
        var a1, b1, a2, b2, A, B, q, op;
        if (kind === 0) {
          // 두 끈 잇기
          a1 = R.int(1, 4); a2 = R.int(1, 4);
          b1 = R.int(10, 60); b2 = R.int(5, 99 - b1);
          A = a1 + a2; B = b1 + b2; op = '+';
          q = name + R.josa(name, '이/가') + ' 가진 빨간 끈은 ' + L(a1, b1) + ', 파란 끈은 ' + L(a2, b2) + '예요. 두 끈을 겹치지 않게 이으면 모두 몇 cm일까요?';
        } else if (kind === 1) {
          // 쓰고 남은 길이
          a1 = R.int(3, 8); a2 = R.int(1, a1 - 1);
          b1 = R.int(40, 95); b2 = R.int(10, b1 - 10);
          A = a1 - a2; B = b1 - b2; op = '-';
          q = name + R.josa(name, '이/가') + ' 색 테이프 ' + L(a1, b1) + ' 중에서 ' + L(a2, b2) + '를 썼어요. 남은 색 테이프는 몇 cm일까요?';
        } else {
          // 키 차이 (1 m 몇 cm 와 1 m 몇 cm)
          a1 = 1; a2 = 1;
          b2 = R.int(10, 40); b1 = R.int(b2 + 10, 90);
          A = 0; B = b1 - b2; op = '-';
          var name2 = R.pick(NAMES.filter(function (x) { return x !== name; }));
          q = name2 + '의 키는 ' + L(a1, b1) + ', ' + name + '의 키는 ' + L(a2, b2) + '예요. ' + name2 + R.josa(name2, '은/는') + ' ' + name + '보다 몇 cm 더 클까요?';
        }
        var total = A * 100 + B;
        var other = op === '+' ? (a1 - a2) * 100 + (b1 - b2) : (a1 + a2) * 100 + (b1 + b2);
        var wrong = [];
        if (A > 0) wrong.push({ a: String(B), why: 'm 부분을 빠뜨렸어요. 답은 ' + L(A, B) + ', 곧 ' + total + ' cm예요.' });
        if (other > 0 && other !== total) wrong.push({ a: String(other), why: op === '+' ? '빼기를 했어요. 두 끈을 이으면 길이를 더해요.' : '더하기를 했어요. 남은 길이나 더 긴 길이는 빼서 구해요.' });
        return {
          type: 'short', check: 'number', unit: 'cm', concept: op === '+' ? 3 : 4,
          q: q,
          answer: String(total),
          wrong: wrong,
          hint: op === '+' ? '두 길이를 더한 다음 몇 cm로 바꾸어요.' : '긴 길이에서 짧은 길이를 뺀 다음 몇 cm로 바꾸어요.',
          explain: 'm는 m끼리, cm는 cm끼리 계산해요. ' + L(a1, b1) + (op === '+' ? ' + ' : ' − ') + L(a2, b2) + ' = ' + L(A, B) + '예요. ' +
            (A > 0 ? L(A, B) + '는 ' + total + ' cm예요.' : ''),
        };
      },
    },
    {
      id: 'compare-digit',
      level: 3,
      title: '길이 비교에서 □ 안에 들어갈 수',
      make: function (R) {
        var m = R.int(1, 9), t = R.int(1, 9);
        var less = R.bool();
        var u = less ? R.int(2, 9) : R.int(0, 7);
        var N = m * 100 + t * 10 + u;
        var ans = less ? u - 1 : u + 1;
        return {
          type: 'short', check: 'number', concept: 1,
          q: '0부터 9까지의 수 중에서 □ 안에 들어갈 수 있는 가장 ' + (less ? '큰' : '작은') + ' 수를 구해 보세요.\n\n' +
            m + ' m ' + t + '□ cm는 ' + N + ' cm보다 ' + (less ? '짧아요.' : '길어요.'),
          answer: String(ans),
          hint: m + ' m ' + t + '□ cm를 몇 cm로 바꾸어 비교해 보세요.',
          wrong: [{ a: String(u), why: '□에 ' + u + R.josa(u, '을/를') + ' 넣으면 ' + N + ' cm와 길이가 같아져요. 같으면 ' + (less ? '더 짧은' : '더 긴') + ' 것이 아니에요.' }],
          explain: m + ' m ' + t + '□ cm는 ' + m + t + '□ cm예요. ' + m + t + '□가 ' + N + '보다 ' + (less ? '작으려면' : '크려면') + ' □는 ' + u + '보다 ' + (less ? '작아야' : '커야') + ' 해요. 그래서 가장 ' + (less ? '큰' : '작은') + ' 수는 ' + ans + R.josa(ans, '이에요/예요') + '.',
        };
      },
    },
  ],
});
})();
