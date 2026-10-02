/* 3학년 영어 · 수 세고 개수 묻기
 * one~twenty 의 낱말과 철자, How many ~? 로 개수 묻고 답하기, 둘 이상일 때 -s 붙이기 */
(function () {
  var NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  // 자주 틀리는 철자 (오답 보기)
  var MISSPELL = {
    2: 'tow', 3: 'tree', 5: 'fiv', 8: 'eigth', 11: 'elevn', 12: 'twelf', 13: 'threeteen', 14: 'fourten',
    15: 'fiveteen', 16: 'sixten', 17: 'seventen', 18: 'eightteen', 19: 'ninteen', 20: 'twenteen',
  };

  function cap(w) { return w.charAt(0).toUpperCase() + w.slice(1); }

  // 물건 n 개 그림: 공(원) 또는 달걀(타원), 한 줄에 5개
  function itemsSvg(n, kind) {
    var rows = Math.ceil(n / 5);
    var h = rows * 50 + 20;
    var out = '<svg viewBox="0 0 260 ' + h + '"><g fill="var(--fig-1)" stroke="currentColor" stroke-width="3">';
    for (var i = 0; i < n; i++) {
      var cx = 30 + (i % 5) * 50;
      var cy = 35 + Math.floor(i / 5) * 50;
      if (kind === 'egg') out += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="15" ry="20"/>';
      else out += '<circle cx="' + cx + '" cy="' + cy + '" r="18"/>';
    }
    return out + '</g></svg>';
  }

  Tutor.registerUnit({
    id: 'eng-e3-07',
    course: 'eng-e3',
    title: '수 세고 개수 묻기',
    summary: 'one부터 twenty까지 수를 세고 How many ~?로 개수를 묻고 답하는 법을 배워요.',
    goals: [
      '1부터 20까지의 수를 영어로 말하고 쓸 수 있어요.',
      '둘 이상인 물건을 말할 때 낱말 끝에 -s를 붙일 수 있어요.',
      'How many ~?로 개수를 묻고, 수로 대답할 수 있어요.',
    ],
    standards: [],

    concepts: [
      {
        title: '1부터 10까지: one ~ ten',
        body: '1부터 10까지의 수를 영어로 말해요.\n\n| 수 | 영어 | 수 | 영어 |\n|---|---|---|---|\n| 1 | **one** | 6 | **six** |\n| 2 | **two** | 7 | **seven** |\n| 3 | **three** | 8 | **eight** |\n| 4 | **four** | 9 | **nine** |\n| 5 | **five** | 10 | **ten** |\n\n수를 셀 때는 "One, two, three …"처럼 차례대로 말해요.\n\n> ⚠️ 쓸 때 조심할 낱말이 있어요. **two**에는 w가, **eight**에는 g와 h가 들어 있어요. 소리 내어 읽을 때와 글자가 조금 달라서 철자를 눈으로 잘 봐 두어야 해요.',
        easy: '손가락으로 하나씩 세면서 말해 보세요. 엄지를 펴며 one, 검지를 펴며 two … 열 손가락을 다 펴면 ten이에요.\n\n계단을 오를 때, 줄넘기를 할 때도 영어로 세어 보면 금방 익숙해져요.',
        check: {
          type: 'choice',
          q: '**eight**는 어떤 수일까요?',
          choices: ['8', '3', '18'],
          answer: 0,
          why: ['', '3은 three예요.', '18은 eighteen이에요. eight에 teen이 붙으면 18이 돼요.'],
          explain: 'eight는 8이에요. 철자 e-i-g-h-t를 잘 봐 두세요.',
        },
      },
      {
        title: '11부터 20까지: eleven ~ twenty',
        body: '11과 12는 따로 외우는 낱말이고, 13부터 19까지는 끝에 **-teen**이 붙어요.\n\n| 수 | 영어 | 수 | 영어 |\n|---|---|---|---|\n| 11 | **eleven** | 16 | six**teen** |\n| 12 | **twelve** | 17 | seven**teen** |\n| 13 | thir**teen** | 18 | eigh**teen** |\n| 14 | four**teen** | 19 | nine**teen** |\n| 15 | fif**teen** | 20 | **twenty** |\n\n> ⚠️ 철자가 바뀌는 수를 조심해요.\n> - 13은 three가 아니라 **thir**teen\n> - 15는 five가 아니라 **fif**teen\n> - 18은 t를 하나만 써서 **eighteen**\n\n> 💡 -teen이 붙은 수(13~19)는 "teen"을 조금 힘주어 말하는 경우가 많아요.',
        easy: '13부터 19까지는 "작은 수 + teen"이라고 생각하면 쉬워요. four + teen = fourteen(14), six + teen = sixteen(16)처럼요.\n\n다만 13, 15, 18은 앞부분 모양이 조금 바뀌어요. 이 세 개만 따로 기억해 두세요: thirteen, fifteen, eighteen.',
        check: {
          type: 'choice',
          q: '15를 영어로 바르게 쓴 것은 무엇일까요?',
          choices: ['fifteen', 'fiveteen', 'fifty'],
          answer: 0,
          why: ['', 'five에 teen을 그대로 붙이지 않아요. 15는 fif를 써서 fifteen이에요.', 'fifty는 50이에요. 15는 끝이 -teen인 fifteen이에요.'],
          explain: '15는 fifteen이에요. five가 fif로 바뀌는 것을 기억해요.',
        },
      },
      {
        title: '둘 이상이면 -s를 붙여요',
        body: '물건이 **하나**일 때와 **둘 이상**일 때 낱말 모양이 달라요. 둘 이상이면 낱말 끝에 **-s**를 붙여요.\n\n| 하나 | 둘 이상 |\n|---|---|\n| one cat | two cat**s** |\n| one apple | three apple**s** |\n| one pencil | ten pencil**s** |\n\n이렇게 둘 이상을 나타내는 모양을 **복수**라고 해요.\n\n> ⚠️ one 뒤에는 -s를 붙이지 않아요. one cats(✕) → one cat(○)\n\n> 💡 -es를 붙이거나 모양이 바뀌는 낱말도 있는데, 그런 낱말은 나중에 배워요. 이 단원에서는 -s만 붙이는 낱말을 연습해요.',
        easy: '-s는 "여러 개"라는 꼬리표예요. 고양이가 한 마리면 꼬리표 없이 cat, 두 마리 이상이면 꼬리표를 붙여 cats라고 해요.\n\n수가 one이면 꼬리표 없음, two 이상이면 꼬리표 붙이기! 이것만 기억하면 돼요.',
        check: {
          type: 'choice',
          q: '바르게 나타낸 것은 무엇일까요?',
          choices: ['two cats', 'two cat', 'one cats'],
          answer: 0,
          why: ['', '둘 이상이면 끝에 -s를 붙여요. two cats예요.', 'one은 하나라서 -s를 붙이지 않아요. one cat이에요.'],
          explain: '둘 이상이면 -s를 붙여요. two cats가 바른 말이에요.',
        },
      },
      {
        title: 'How many ~? 개수 묻고 답하기',
        body: '개수를 물을 때는 **How many** 뒤에 물건 이름을 -s를 붙인 모양으로 써요.\n\nA: **How many** apples? (사과가 몇 개예요?)\nB: **Three** apples. (사과 세 개요.)\n\n대답할 때는 수와 물건 이름을 함께 말하거나, 수만 짧게 말해도 돼요.\n\n- Three apples.\n- Three.\n\n> ⚠️ 하나뿐이면 대답할 때 -s를 붙이지 않아요. How many dogs? – **One dog.**\n\n> 💡 물을 때는 개수를 모르니까 How many 뒤에 늘 -s 모양(apples)을 써요.',
        easy: '"몇 개?"라고 묻고 싶을 때 How many를 앞에 붙이면 돼요.\n\n공을 가리키며 "How many balls?" 하고 물으면, 친구는 손가락으로 세어 보고 "Five balls."라고 대답해요.',
        fig: { type: 'svg', svg: itemsSvg(5, 'ball'), alt: '공 5개 그림' },
        check: {
          type: 'choice',
          q: 'A: How many balls?\nB: [[대답]]\n\n그림의 공 개수에 맞는 대답은 무엇일까요?',
          fig: { type: 'svg', svg: itemsSvg(6, 'ball'), alt: '공 그림' },
          choices: ['Six balls.', 'Five balls.', 'Six ball.'],
          answer: 0,
          why: ['', '공을 다시 세어 보세요. 윗줄에 5개, 아랫줄에 1개가 있어요.', '둘 이상이면 -s를 붙여요. Six balls.예요.'],
          explain: '공은 6개예요. 6은 six이고, 둘 이상이니 -s를 붙여 Six balls.라고 대답해요.',
        },
      },
    ],

    examples: [
      {
        q: '그림을 보고 물음에 영어로 답해 보세요.\n\nHow many eggs?',
        fig: { type: 'svg', svg: itemsSvg(7, 'egg'), alt: '달걀 그림' },
        steps: [
          'How many eggs?는 "달걀이 몇 개예요?"라는 뜻이에요.',
          '달걀을 세어 봐요. 윗줄에 5개, 아랫줄에 2개라서 모두 7개예요.',
          '7은 영어로 seven이에요.',
          '둘 이상이니 egg에 -s를 붙여 eggs라고 해요.',
        ],
        answer: '**Seven eggs.** (또는 짧게 **Seven.**)',
      },
      {
        q: '18을 영어로 써 보세요.',
        steps: [
          '18은 8(eight)에 -teen이 붙는 수예요.',
          'eight 끝의 t와 teen의 t가 겹치므로 t는 한 번만 써요.',
          '그래서 eighteen이에요. eightteen이라고 쓰지 않도록 조심해요.',
        ],
        answer: '**eighteen**',
      },
    ],

    terms: [
      { term: 'How many ~?', def: '"~이 몇 개예요?"라고 개수를 묻는 말이에요. 뒤에 -s를 붙인 물건 이름이 와요. 예: How many apples?' },
      { term: '-teen', def: '13부터 19까지의 수 끝에 붙는 말이에요. 예: fourteen(14), sixteen(16)' },
      { term: '복수', def: '둘 이상을 나타내는 낱말 모양이에요. 낱말 끝에 -s를 붙여요. 예: one cat → two cats' },
      { term: '단수', def: '하나를 나타내는 낱말 모양이에요. -s를 붙이지 않아요. 예: one dog' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '**seven**은 어떤 수일까요?',
        choices: ['7', '6', '17', '11'],
        answer: 0,
        why: [
          '',
          '6은 six예요. 둘 다 s로 시작해서 헷갈리기 쉬워요.',
          '17은 seventeen이에요. 끝에 -teen이 있어야 17이에요.',
          '11은 eleven이에요. 끝소리가 비슷해서 헷갈릴 수 있어요.',
        ],
        explain: 'seven은 7이에요. seven에 -teen이 붙으면 seventeen(17)이 돼요.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
        q: '영어로 쓴 수를 숫자로 쓰세요.\n\n**twelve**',
        answer: '12',
        wrong: [
          { a: '20', why: '20은 twenty예요. twelve와 twenty는 둘 다 tw로 시작해서 헷갈리기 쉬워요.' },
          { a: '2', why: '2는 two예요. twelve는 따로 외우는 낱말로 12예요.' },
        ],
        explain: 'twelve는 12예요. 11(eleven)과 12(twelve)는 -teen 없이 따로 외워요.',
      },
      {
        id: 'p3', level: 1, type: 'short', concept: 1,
        q: '15를 영어로 쓰세요.',
        answer: ['fifteen'],
        wrong: [
          { a: 'fiveteen', why: 'five에 teen을 그대로 붙이지 않아요. five가 fif로 바뀌어서 fifteen이에요.' },
          { a: 'fifty', why: 'fifty는 50이에요. 15는 끝이 -teen인 fifteen이에요.' },
        ],
        explain: '15는 fifteen이에요. f-i-f-t-e-e-n, 철자를 한 글자씩 확인해요.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '**thirteen**은 13이에요.',
        answer: true,
        explain: '맞아요. thirteen은 13이에요. 3은 three지만 13에서는 thir로 바뀌어서 thirteen이라고 써요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: 'A: How many balls?\nB: [[대답]]\n\n그림을 보고 알맞은 대답을 고르세요.',
        fig: { type: 'svg', svg: itemsSvg(4, 'ball'), alt: '공 그림' },
        choices: ['Four balls.', 'Five balls.', 'Four ball.', 'Fourteen balls.'],
        answer: 0,
        why: [
          '',
          '공을 다시 하나씩 세어 보세요. 공은 4개예요.',
          '둘 이상이면 -s를 붙여요. Four balls.예요.',
          'fourteen은 14예요. 4는 four예요.',
        ],
        explain: '공은 4개예요. 4는 four이고, 둘 이상이니 -s를 붙여 Four balls.라고 대답해요.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 2,
        q: '바르게 나타낸 것은 무엇일까요?',
        choices: ['three dogs', 'three dog', 'one dogs', 'a dogs'],
        answer: 0,
        why: [
          '',
          '셋은 둘 이상이라서 -s를 붙여요. three dogs예요.',
          'one은 하나라서 -s를 붙이지 않아요. one dog예요.',
          'a도 "하나"라는 뜻이라 -s를 붙이지 않아요. a dog예요.',
        ],
        explain: '둘 이상이면 낱말 끝에 -s를 붙여요. three dogs가 바른 말이에요.',
      },
      {
        id: 'p7', level: 1, type: 'short', concept: 3,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nHow [[many]] pencils? (연필이 몇 자루예요?)',
        answer: ['many'],
        wrong: [
          { a: 'much', why: '개수를 물을 때는 How many를 써요. much는 이 단원에서 쓰지 않아요.' },
          { a: 'any', why: 'any가 아니라 many예요. m을 앞에 붙여요.' },
        ],
        explain: '개수를 물을 때는 How many ~?를 써요. How many pencils?는 "연필이 몇 자루예요?"예요.',
      },
      {
        id: 'p8', level: 2, type: 'order', concept: 3,
        q: '낱말을 순서대로 놓아 "사과가 몇 개예요?"라는 물음을 만드세요.',
        choices: ['many', 'apples?', 'How'],
        answer: [2, 0, 1],
        hint: '물음표가 있는 낱말이 맨 끝이에요.',
        explain: 'How many 뒤에 -s를 붙인 물건 이름이 와요. How many apples?',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        q: 'A: How many pencils?\nB: [[대답]]\n\n연필이 딱 1자루 있어요. 알맞은 대답은 무엇일까요?',
        choices: ['One pencil.', 'One pencils.', 'Two pencils.', 'Eleven pencils.'],
        answer: 0,
        why: [
          '',
          '하나일 때는 -s를 붙이지 않아요. One pencil.이에요.',
          'two는 2예요. 연필은 1자루예요.',
          'eleven은 11이에요. 1은 one이에요.',
        ],
        hint: '하나일 때 낱말 끝 모양을 생각해 보세요.',
        explain: '연필이 하나뿐이니 one을 쓰고, 하나일 때는 -s를 붙이지 않아요. 그래서 One pencil.이에요.',
      },
      {
        id: 'p10', level: 2, type: 'short', concept: 1,
        q: '**fourteen**보다 1 큰 수를 영어로 쓰세요.',
        answer: ['fifteen'],
        hint: 'fourteen이 몇인지 먼저 숫자로 생각해 보세요.',
        wrong: [
          { a: 'thirteen', why: '1 작은 수를 썼어요. fourteen(14)보다 1 큰 수는 15예요.' },
          { a: 'fiveteen', why: '15는 맞게 생각했지만 철자가 틀렸어요. five가 fif로 바뀌어서 fifteen이에요.' },
        ],
        explain: 'fourteen은 14예요. 14보다 1 큰 수는 15이고, 15는 영어로 fifteen이에요.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 1,
        q: '18을 영어로 바르게 쓴 것은 무엇일까요?',
        choices: ['eighteen', 'eightteen', 'eighten', 'eigteen'],
        answer: 0,
        why: [
          '',
          't를 두 번 썼어요. eight 끝의 t와 teen의 t가 겹쳐서 t는 한 번만 써요.',
          '끝의 e가 하나 빠졌어요. -teen은 e를 두 번 써요.',
          'eight 가운데의 h가 빠졌어요. e-i-g-h까지 쓰고 teen을 붙여요.',
        ],
        hint: 'eight와 teen을 이을 때 겹치는 글자를 살펴보세요.',
        explain: '18은 eighteen이에요. eight의 끝 t와 teen의 첫 t가 겹쳐서 t는 한 번만 써요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', concept: 0,
        q: '다음 글을 읽고 물음에 답하세요.\n\nThree red apples.\nFive green apples.\n\n사과는 모두 몇 개일까요? 수를 영어 낱말로 쓰세요.',
        answer: ['eight'],
        hint: 'three와 five가 각각 몇인지 먼저 생각해 보세요.',
        wrong: [
          { a: '8', why: '개수는 맞았어요. 문제에서 영어 낱말로 쓰라고 했으니 eight로 써요.' },
          { a: 'eigth', why: '개수는 맞았지만 철자가 틀렸어요. e-i-g-h-t 순서로 써요.' },
          { a: 'five', why: '초록 사과(green apples)만 셌어요. 빨간 사과 three(3)도 더해요.' },
        ],
        explain: 'three는 3, five는 5예요. 3 + 5 = 8이고, 8은 영어로 eight예요.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '**twenty**보다 1 작은 수는 무엇일까요?',
        choices: ['nineteen', 'twelve', 'twenty-one', 'nine'],
        answer: 0,
        why: [
          '',
          'twelve는 12예요. twenty와는 앞부분 tw만 같아요.',
          'twenty-one은 21로, 1 큰 수예요.',
          'nine은 9예요. 19는 nine에 -teen을 붙인 nineteen이에요.',
        ],
        hint: 'twenty를 숫자로 바꿔 생각해 보세요.',
        explain: 'twenty는 20이에요. 20보다 1 작은 수는 19이고, 영어로 nineteen이에요.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: 'A: How many [[물건]]?\nB: Six dogs.\n\n빈칸에 알맞은 말은 무엇일까요?',
        choices: ['dogs', 'dog', 'cats', 'six'],
        answer: 0,
        why: [
          '',
          'How many 뒤에는 -s를 붙인 모양이 와요. How many dogs?예요.',
          'B는 개(dogs)의 수를 대답했어요. 고양이를 물은 것이 아니에요.',
          'six는 대답에 나오는 수예요. 물을 때는 개수를 모르니 물건 이름을 써요.',
        ],
        hint: 'B의 대답에서 무엇의 개수를 말했는지 보세요.',
        explain: 'B가 Six dogs.라고 개의 수를 말했으니 A는 개의 수를 물었어요. How many 뒤에는 -s를 붙인 dogs가 와요.',
      },
      {
        id: 'a4', level: 3, type: 'order', concept: 1,
        q: '작은 수부터 차례대로 놓으세요.',
        choices: ['eleven', 'thirteen', 'twelve', 'fourteen'],
        answer: [0, 2, 1, 3],
        hint: '낱말마다 숫자로 바꿔 생각해 보세요.',
        explain: 'eleven(11) → twelve(12) → thirteen(13) → fourteen(14) 순서예요.',
      },
      {
        id: 'a5', level: 3, type: 'short', concept: 0,
        q: '규칙에 맞게 빈칸에 들어갈 수를 영어 낱말로 쓰세요.\n\ntwo, four, six, [[?]], ten',
        answer: ['eight'],
        hint: '수가 얼마씩 커지는지 숫자로 바꿔 보세요.',
        wrong: [
          { a: 'seven', why: '1씩 커지는 것이 아니라 2씩 커져요. 6 다음은 8이에요.' },
          { a: '8', why: '수는 맞았어요. 영어 낱말로 eight라고 써요.' },
        ],
        explain: '2, 4, 6, ?, 10은 2씩 커져요. 6 다음은 8이고, 8은 영어로 eight예요.',
      },
    ],

    deeper: [
      {
        title: '20 다음은 어떻게 셀까?',
        body: '20(twenty) 다음부터는 규칙이 아주 쉬워져요. twenty 뒤에 one부터 nine까지를 붙이면 돼요.\n\n- 21: twenty-one\n- 22: twenty-two\n- 25: twenty-five\n\n30은 thirty, 40은 forty, 50은 fifty예요. 끝이 **-ty**로 끝나지요. -teen(13~19)과 -ty(20, 30 …)는 소리도 철자도 비슷해서 헷갈리기 쉬우니, 철자를 끝까지 잘 보는 습관을 들여요.\n\n큰 수는 고학년에서 더 배워요. 지금은 1부터 20까지를 정확하게 말하고 쓰는 것이 먼저예요.',
      },
    ],

    faq: [
      {
        q: '11이랑 12는 왜 -teen이 안 붙어요?',
        a: '영어에서 11(eleven)과 12(twelve)는 아주 오래전부터 따로 쓰던 낱말이라서 규칙을 따르지 않아요. 그냥 두 낱말은 따로 외워 두세요. 13부터는 -teen 규칙을 따라요.',
      },
      {
        q: 'How many 대답할 때 수만 말해도 돼요?',
        a: '네, 돼요. How many apples?에 Three apples.라고 해도 되고, 짧게 Three.라고만 해도 돼요. 물건 이름까지 말할 때는 둘 이상이면 -s를 붙이는 것만 잊지 마세요.',
      },
      {
        q: '왜 one cat이고 two cats예요?',
        a: '영어는 하나인지 여럿인지를 낱말 모양으로 알려 줘요. 하나면 cat, 둘 이상이면 끝에 -s를 붙여 cats라고 해요. 우리말은 "고양이 두 마리"처럼 모양이 바뀌지 않아서 처음에는 낯설 수 있어요.',
      },
    ],

    mistakes: [
      '15를 fiveteen, 13을 threeteen으로 쓰는 실수 — 15는 fifteen, 13은 thirteen이에요. 앞부분 모양이 바뀌어요.',
      '둘 이상인데 -s를 빠뜨리는 실수 — three apple(✕) → three apples(○)',
      'one 뒤에 -s를 붙이는 실수 — one cats(✕) → one cat(○)',
    ],

    gens: [
      {
        id: 'word-to-number',
        level: 1,
        title: '영어 낱말을 숫자로 쓰기',
        make: function (R) {
          var n = R.int(1, 20);
          var w = NUM[n];
          var wrong = [];
          if (n >= 13 && n <= 19) wrong.push({ a: String(n - 10), why: '끝에 -teen이 붙으면 10이 더해져요. **' + w + '** = ' + n });
          if (n === 12) wrong.push({ a: '20', why: '20은 twenty예요. **twelve** = 12' });
          if (n === 20) wrong.push({ a: '12', why: '12는 twelve예요. **twenty** = 20' });
          var how = n >= 13 && n <= 19 ? '\n\n13부터 19까지는 끝에 -teen이 붙어요.' : '';
          return {
            type: 'short', check: 'number', concept: n <= 10 ? 0 : 1,
            q: '영어로 쓴 수를 숫자로 쓰세요.\n\n**' + w + '**',
            answer: String(n),
            wrong: wrong,
            explain: '**' + w + '** = ' + n + how,
          };
        },
      },
      {
        id: 'number-to-word',
        level: 1,
        title: '수를 영어 낱말로 바르게 쓴 것 고르기',
        make: function (R) {
          var n = R.int(1, 20);
          var correct = NUM[n];
          var cands = [];
          var reason = {};
          function add(word, why) {
            if (!word || word === correct || word in reason) return;
            reason[word] = why;
            cands.push(word);
          }
          if (MISSPELL[n]) add(MISSPELL[n], '철자가 틀렸어요. 바른 철자: **' + correct + '**');
          if (n + 1 <= 20) add(NUM[n + 1], '**' + NUM[n + 1] + '** = ' + (n + 1) + '. 1 큰 수예요.');
          if (n - 1 >= 1) add(NUM[n - 1], '**' + NUM[n - 1] + '** = ' + (n - 1) + '. 1 작은 수예요.');
          if (n >= 13 && n <= 19) add(NUM[n - 10], '**' + NUM[n - 10] + '** = ' + (n - 10) + '. 끝에 -teen이 있어야 ' + n + R.josa(n, '이에요/예요') + '.');
          if (n <= 9) add(NUM[n + 10], '**' + NUM[n + 10] + '** = ' + (n + 10) + '. 낱말 끝을 잘 보세요.');
          if (n === 12) add('twenty', '**twenty** = 20. 앞부분 tw만 같아요.');
          if (n === 20) add('twelve', '**twelve** = 12. 앞부분 tw만 같아요.');
          if (n + 2 <= 20) add(NUM[n + 2], '**' + NUM[n + 2] + '** = ' + (n + 2) + '. 수를 다시 확인해 보세요.');
          else add(NUM[n - 2], '**' + NUM[n - 2] + '** = ' + (n - 2) + '. 수를 다시 확인해 보세요.');
          var pick = R.choices(correct, R.shuffle(cands));
          return {
            type: 'choice', concept: n <= 10 ? 0 : 1,
            q: n + R.josa(n, '을/를') + ' 영어로 바르게 쓴 것은 무엇일까요?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
            explain: n + ' = **' + correct + '**' + (n >= 13 && n <= 19 ? '\n\n13부터 19까지는 끝에 -teen이 붙어요.' : ''),
          };
        },
      },
      {
        id: 'how-many',
        level: 2,
        title: '그림을 보고 How many ~?에 대답하기',
        make: function (R) {
          var kind = R.pick(['ball', 'egg']);
          var kor = kind === 'ball' ? '공' : '달걀';
          var n = R.int(2, 15);
          var plural = kind + 's';
          var correct = cap(NUM[n]) + ' ' + plural + '.';
          var tip = n > 5 ? ' 한 줄에 5개씩 있으니 줄마다 세어 보세요.' : ' 하나씩 짚으며 다시 세어 보세요.';
          var cands = [];
          var reason = {};
          function add(text, why) {
            if (text === correct || text in reason) return;
            reason[text] = why;
            cands.push(text);
          }
          add(cap(NUM[n]) + ' ' + kind + '.', '둘 이상이면 끝에 -s를 붙여요: ' + plural);
          add(cap(NUM[n + 1]) + ' ' + plural + '.', '하나 더 세었어요.' + tip);
          if (n - 1 >= 2) add(cap(NUM[n - 1]) + ' ' + plural + '.', '하나 덜 세었어요.' + tip);
          else add(cap(NUM[n + 2]) + ' ' + plural + '.', '수를 잘못 세었어요.' + tip);
          if (n >= 13) add(cap(NUM[n - 10]) + ' ' + plural + '.', '끝에 -teen이 빠졌어요. ' + n + R.josa(n, '은/는') + ' ' + NUM[n]);
          else if (n >= 3 && n <= 9) add(cap(NUM[n + 10]) + ' ' + plural + '.', '-teen이 붙으면 10이 더 커져요. ' + n + R.josa(n, '은/는') + ' ' + NUM[n]);
          var pick = R.choices(correct, R.shuffle(cands));
          return {
            type: 'choice', concept: 3,
            q: 'A: How many ' + plural + '?\nB: [[대답]]\n\n그림을 보고 알맞은 대답을 고르세요.',
            fig: { type: 'svg', svg: itemsSvg(n, kind), alt: kor + ' 그림' },
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
            explain: '그림의 ' + kor + ': ' + n + '개 → ' + NUM[n] + '\n\n둘 이상이니 -s를 붙여요. 답: **' + correct + '**',
          };
        },
      },
    ],

    vocab: [
      { w: 'three', m: '3, 셋', ex: 'I have **three** pencils.', exm: '나는 연필이 세 자루 있어요.' },
      { w: 'five', m: '5, 다섯', ex: 'I see **five** cats.', exm: '고양이 다섯 마리가 보여요.' },
      { w: 'eight', m: '8, 여덟', ex: 'I have **eight** balls.', exm: '나는 공이 여덟 개 있어요.' },
      { w: 'ten', m: '10, 열', ex: 'Count to **ten**.', exm: '열까지 세어 보세요.' },
      { w: 'eleven', m: '11, 열하나', ex: 'I see **eleven** eggs.', exm: '달걀 열한 개가 보여요.' },
      { w: 'twelve', m: '12, 열둘', ex: 'I have **twelve** pencils.', exm: '나는 연필이 열두 자루 있어요.' },
      { w: 'thirteen', m: '13, 열셋', ex: '**Thirteen** apples.', exm: '사과 열세 개요.' },
      { w: 'fifteen', m: '15, 열다섯', ex: 'I see **fifteen** dogs.', exm: '개 열다섯 마리가 보여요.' },
      { w: 'eighteen', m: '18, 열여덟', ex: '**Eighteen** balls.', exm: '공 열여덟 개요.' },
      { w: 'twenty', m: '20, 스물', ex: 'Count to **twenty**.', exm: '스물까지 세어 보세요.' },
      { w: 'apple', m: '사과', ex: 'How many **apples**?', exm: '사과가 몇 개예요?' },
      { w: 'ball', m: '공', ex: 'I have one **ball**.', exm: '나는 공이 하나 있어요.' },
      { w: 'pencil', m: '연필', ex: 'Two **pencils**.', exm: '연필 두 자루요.' },
      { w: 'egg', m: '달걀', ex: 'How many **eggs**?', exm: '달걀이 몇 개예요?' },
      { w: 'many', m: '(수가) 많은 · How many ~? 몇 개', ex: 'How **many** cats?', exm: '고양이가 몇 마리예요?' },
      { w: 'count', m: '세다', ex: 'Let me **count**.', exm: '내가 세어 볼게요.' },
    ],
  });
})();
