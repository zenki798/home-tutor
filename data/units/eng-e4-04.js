/* 4학년 영어 · 짧은 모음 소리 익히기 */
Tutor.registerUnit({
  id: 'eng-e4-04',
  course: 'eng-e4',
  title: '짧은 모음 소리 익히기',
  summary: 'cat의 a, pen의 e처럼 모음 글자가 내는 짧은 소리를 익히고 세 글자 낱말을 소리 내어 읽어요.',
  goals: [
    '모음 글자 a, e, i, o, u 가 세 글자 낱말에서 내는 짧은 소리를 알 수 있어요.',
    '글자 소리를 차례대로 이어 c-a-t → cat 처럼 낱말을 읽을 수 있어요.',
    'cat, hat, bat 처럼 끝소리가 같은 낱말끼리 묶을 수 있어요.',
    'bag → big → bug 처럼 가운데 모음을 바꿔 새 낱말을 만들 수 있어요.',
  ],
  standards: ['[4영01-04]', '[4영02-03]', '[4영01-01]'],

  concepts: [
    {
      title: '모음 글자와 짧은 a 소리',
      body: '알파벳 26글자 가운데 **a, e, i, o, u** 다섯 글자를 **모음**이라고 해요. 나머지 글자(b, c, d, f …)는 **자음**이에요.\n\ncat, map 처럼 **자음 + 모음 + 자음**으로 된 세 글자 낱말에서는 대부분 가운데 모음이 짧고 가볍게 소리 나요. 이 소리를 **짧은 모음 소리**라고 해요.\n\n짧은 a 소리가 나는 낱말: **cat**(고양이), **map**(지도), **bag**(가방), **hat**(모자)\n\n> 💡 짧은 a 소리를 낼 때는 입을 양옆으로 크게 벌리고 턱을 아래로 내려요. 거울을 보며 cat, map, bag 을 차례로 말해 보세요.',
      easy: '세 글자 낱말을 샌드위치라고 생각해 보세요. 위아래 빵(자음) 사이에 속 재료(모음) 하나가 끼어 있어요.\n\nc-a-t 에서 빵은 c 와 t, 속 재료는 a 예요. m-a-p 에서도 속 재료는 a 지요.\n\n속 재료가 같으면 가운데 소리도 같아요. 그래서 cat 과 map 은 가운데 소리가 같아요.',
      check: {
        type: 'choice',
        q: '**map** 에서 모음 글자를 고르세요.',
        choices: ['a', 'm', 'p'],
        answer: 0,
        why: ['', 'm 은 자음이에요. 모음은 a, e, i, o, u 다섯 글자예요.', 'p 는 자음이에요. 모음은 a, e, i, o, u 다섯 글자예요.'],
        explain: 'map 은 자음 m + 모음 a + 자음 p 예요. 가운데 a 가 짧은 a 소리를 내요.',
      },
    },
    {
      title: '짧은 e 와 i 소리',
      body: '짧은 e 소리와 짧은 i 소리가 나는 낱말이에요.\n\n| 모음 | 입 모양 | 낱말 |\n|---|---|---|\n| e | 입을 양옆으로 조금 벌리고 짧게 | **pen**(펜), **bed**(침대), **ten**(10), **red**(빨간) |\n| i | 입을 아주 조금만 벌리고 힘을 빼서 짧게 | **pig**(돼지), **six**(6), **big**(큰), **sit**(앉다) |\n\n> ⚠️ 짧은 e 소리와 짧은 i 소리는 비슷하게 들려서 헷갈리기 쉬워요. pen 과 pin, ten 과 tin 처럼 짝을 지어 소리 내 보면 차이를 느낄 수 있어요. i 쪽이 입을 더 작게 벌려요.',
      easy: '대표 낱말을 하나씩 정해 두면 쉬워요.\n- e 소리의 대표: pen\n- i 소리의 대표: pig\n\n새 낱말의 가운데 소리가 헷갈리면 대표 낱말을 먼저 말해 보고, 같은 소리인지 비교해요. bed 는 pen 과 같은 소리, six 는 pig 와 같은 소리예요.',
      check: {
        type: 'choice',
        q: '**pig** 와 가운데 모음 소리가 같은 낱말을 고르세요.',
        choices: ['six', 'pen', 'bed'],
        answer: 0,
        why: ['', 'pen 은 첫 글자가 같지만 가운데 모음이 e 예요.', 'bed 의 가운데 모음은 e 예요. pig 는 i 예요.'],
        explain: 'pig 와 six 는 가운데 모음이 모두 i 라서 짧은 i 소리가 나요.',
      },
    },
    {
      title: '짧은 o 와 u 소리',
      body: '짧은 o 소리와 짧은 u 소리가 나는 낱말이에요.\n\n| 모음 | 입 모양 | 낱말 |\n|---|---|---|\n| o | 입을 위아래로 크게 벌리고 턱을 내려 짧게 | **dog**(개), **box**(상자), **hot**(뜨거운), **top**(팽이, 맨 위) |\n| u | 입에 힘을 빼고 조금만 벌려 짧고 가볍게 | **cup**(컵), **sun**(해), **bus**(버스), **bug**(벌레) |\n\n> 💡 o 는 입을 크게, u 는 입을 작게 벌려요. box 와 bus 를 번갈아 말하며 입 크기를 비교해 보세요.',
      easy: '입 모양 놀이를 해 보세요.\n- o: 깜짝 놀라 입을 크게 벌린 모양으로 짧게 → dog, box\n- u: 입에 힘을 빼고 살짝만 벌려 툭 내는 소리 → cup, sun\n\n입이 크면 o, 작으면 u 예요.',
      check: {
        type: 'ox',
        q: '**box** 와 **bus** 는 가운데 모음 소리가 같아요.',
        answer: false,
        explain: 'box 의 가운데 모음은 o, bus 의 가운데 모음은 u 라서 소리가 달라요. 첫 글자 b 만 같아요.',
      },
    },
    {
      title: '소리를 이어 낱말 읽기',
      body: '처음 보는 낱말도 글자 소리를 하나씩 이어 붙이면 읽을 수 있어요.\n\n1. 글자마다 소리를 따로 내요: c / a / t\n2. 조금씩 빠르게 붙여요: c-a-t\n3. 한 번에 이어 말해요: **cat**\n\n이렇게 소리를 이어 붙여 읽는 것을 **소리 합치기**라고 해요. 글자마다 내는 첫소리는 3학년 "알파벳 첫소리 익히기"에서 배웠어요.\n\n> ⚠️ 왼쪽에서 오른쪽으로 차례대로 읽어요. 거꾸로 읽으면 t-a-c 처럼 전혀 다른 소리가 돼요.',
      easy: '기차를 떠올려 보세요. 첫 칸 c, 가운데 칸 a, 마지막 칸 t.\n\n천천히 달리면 칸이 하나씩 따로 보이지만, 빨리 달리면 하나로 이어져 보이지요. 소리도 천천히 c, a, t 하다가 점점 빠르게 하면 cat 이 돼요.',
      check: {
        type: 'choice',
        q: '**s - u - n** 소리를 차례대로 이어 읽은 낱말을 고르세요.',
        choices: ['sun', 'sit', 'bus'],
        answer: 0,
        why: ['', 'sit 은 첫소리는 같지만 가운데가 i, 끝이 t 예요.', 'bus 는 첫소리가 b 예요. 글자를 왼쪽부터 차례대로 이어요.'],
        explain: 's, u, n 소리를 차례대로 붙이면 sun(해)예요.',
      },
    },
    {
      title: '끝소리가 같은 낱말',
      body: '**cat, hat, bat** 은 첫소리만 다르고 뒷부분 **-at** 이 같아요. 이렇게 **가운데 모음부터 끝까지의 소리**(끝소리)가 같은 낱말끼리 묶을 수 있어요.\n\n| 끝소리 | 낱말 |\n|---|---|\n| -at | cat, hat, bat |\n| -ig | pig, big, dig |\n| -en | pen, ten, hen |\n| -un | sun, run, fun |\n| -op | top, mop, hop |\n\n끝소리가 같은 낱말은 이어서 읽으면 노래처럼 리듬이 맞아요. 한 낱말을 읽을 줄 알면 첫 글자만 바꿔서 같은 묶음의 낱말을 쉽게 읽을 수 있어요.\n\n> ⚠️ cat 과 cup 처럼 **첫소리**만 같은 것은 끝소리가 같은 것이 아니에요.',
      easy: '끝소리가 같은 낱말은 성이 같은 가족이라고 생각해 보세요. "-at 가족"에는 cat, hat, bat 이 살고, "-ig 가족"에는 pig, big, dig 가 살아요.\n\n가족을 알아보려면 첫 글자를 손가락으로 가리고 남은 부분을 읽어 보세요. 남은 부분이 같으면 같은 가족이에요.',
      check: {
        type: 'choice',
        q: '**pig** 와 끝소리가 같은 낱말을 고르세요.',
        choices: ['dig', 'pin', 'pen'],
        answer: 0,
        why: ['', 'pin 은 첫소리와 가운데 모음은 같지만 끝이 n 이에요. 끝소리는 -in 이에요.', 'pen 은 첫소리만 같아요. 끝소리는 -en 이에요.'],
        explain: '첫 글자를 가리면 pig 는 -ig, dig 도 -ig 예요. 그래서 끝소리가 같아요.',
      },
    },
    {
      title: '가운데 모음을 바꿔 새 낱말 만들기',
      body: '세 글자 낱말에서 **가운데 모음만 바꾸면** 새 낱말이 돼요.\n\n- b**a**g(가방) → b**i**g(큰) → b**u**g(벌레)\n- h**a**t(모자) → h**o**t(뜨거운)\n- p**e**n(펜) → p**i**n(핀)\n\n첫소리와 끝소리는 그대로이고 가운데 소리만 달라져요. 모음 하나가 바뀌면 소리도 뜻도 완전히 달라지니, 읽을 때 가운데 글자를 꼼꼼히 봐야 해요.',
      easy: '샌드위치의 속 재료만 바꾼다고 생각해 보세요. 빵(b 와 g)은 그대로 두고 속 재료를 a 에서 i 로 바꾸면 bag(가방)이 big(큰)으로, u 로 바꾸면 bug(벌레)로 변해요.\n\n글자 카드 b, g 를 놓고 가운데에 a, i, u 카드를 번갈아 넣으며 읽어 보세요.',
      check: {
        type: 'short', check: 'text',
        q: '**bag** 의 가운데 모음 a 를 u 로 바꾸어 쓰세요.',
        answer: ['bug'],
        wrong: [{ a: 'big', why: 'big 은 a 를 i 로 바꾼 낱말이에요. u 로 바꾸면 bug 예요.' }],
        explain: 'b-a-g 의 가운데 a 를 u 로 바꾸면 b-u-g, 곧 bug(벌레)예요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글자 소리를 이어 읽어 보세요.\n\n**h - o - t**\n\n그리고 가운데 모음을 a 로 바꾸면 어떤 낱말이 될까요?',
      steps: [
        '글자마다 소리를 따로 내요. h 의 첫소리, 입을 크게 벌린 짧은 o 소리, t 의 소리.',
        '세 소리를 점점 빠르게 붙여 읽으면 hot(뜨거운)이에요.',
        '첫 글자 h 와 끝 글자 t 는 그대로 두고 가운데 o 만 a 로 바꿔요: h-a-t',
        '이어 읽으면 hat(모자)예요.',
      ],
      answer: 'hot(뜨거운) → hat(모자)',
    },
    {
      q: '**cat** 과 끝소리가 같은 낱말을 모두 찾아보세요.\n\nhat, cup, bat, can',
      steps: [
        'cat 의 첫 글자 c 를 가리면 -at 이 남아요.',
        'hat 은 -at, bat 도 -at 이에요. 끝소리가 같아요.',
        'cup 은 -up, can 은 -an 이에요. 첫 글자 c 는 같지만 끝소리가 달라요.',
      ],
      answer: 'hat, bat',
    },
  ],

  terms: [
    { term: '모음', def: '알파벳에서 a, e, i, o, u 다섯 글자예요. 세 글자 낱말 cat 에서는 가운데 a 가 모음이에요.' },
    { term: '자음', def: '알파벳에서 모음(a, e, i, o, u)을 뺀 나머지 글자예요. 예: b, c, d, m, t' },
    { term: '짧은 모음 소리', def: 'cat, pen, pig, dog, cup 처럼 자음 사이에 낀 모음이 짧고 가볍게 내는 소리예요.' },
    { term: '소리 합치기', def: '글자 소리를 하나씩 낸 뒤 차례대로 이어 붙여 낱말을 읽는 방법이에요. 예: c-a-t → cat' },
    { term: '끝소리', def: '이 단원에서는 낱말의 가운데 모음부터 끝까지의 소리를 말해요. cat, hat, bat 은 끝소리 -at 이 같아요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 중 **모음** 글자를 고르세요.',
      choices: ['e', 'b', 't', 'm'],
      answer: 0,
      why: [
        '',
        'b 는 자음이에요. 모음은 a, e, i, o, u 다섯 글자예요.',
        't 는 자음이에요. 모음은 a, e, i, o, u 다섯 글자예요.',
        'm 은 자음이에요. 모음은 a, e, i, o, u 다섯 글자예요.',
      ],
      explain: '모음은 a, e, i, o, u 다섯 글자예요. 보기 가운데 e 만 모음이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '다음 낱말과 가운데 모음 소리가 같은 것을 고르세요.\n\n**pen**',
      choices: ['bed', 'pig', 'cup', 'map'],
      answer: 0,
      why: [
        '',
        'pig 의 가운데 모음은 i 예요. e 와 i 는 소리가 비슷해서 헷갈리기 쉬워요.',
        'cup 의 가운데 모음은 u 예요.',
        'map 의 가운데 모음은 a 예요.',
      ],
      explain: 'pen 과 bed 는 가운데 모음이 모두 e 라서 짧은 e 소리가 나요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 2,
      q: '**sun** 과 **cup** 은 가운데 모음 소리가 같아요.',
      answer: true,
      explain: 'sun 과 cup 은 가운데 모음이 모두 u 라서 짧은 u 소리가 나요. 첫 글자와 끝 글자는 달라도 가운데 소리는 같아요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 3,
      q: '**b - u - s** 소리를 차례대로 이어 읽은 낱말을 고르세요.',
      choices: ['bus', 'box', 'sub', 'bug'],
      answer: 0,
      why: [
        '',
        'box 는 가운데가 o, 끝이 x 예요.',
        '글자를 거꾸로 읽었어요. 왼쪽의 b 부터 차례대로 이어요.',
        'bug 는 끝 글자가 g 예요. 끝 글자 s 의 소리를 다시 들어 보세요.',
      ],
      explain: 'b, u, s 소리를 왼쪽부터 차례대로 붙이면 bus(버스)예요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'text', concept: 3,
      q: '글자 소리를 차례대로 이어 읽은 낱말을 쓰세요.\n\n**h - a - t**',
      answer: ['hat'],
      wrong: [
        { a: 'hot', why: '가운데 글자는 o 가 아니라 a 예요. 입을 양옆으로 크게 벌리는 짧은 a 소리예요.' },
        { a: 'tah', why: '거꾸로 이었어요. 왼쪽의 h 부터 차례대로 이어요.' },
      ],
      explain: 'h, a, t 소리를 차례대로 붙이면 hat(모자)이에요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '다음 낱말과 끝소리가 같은 것을 고르세요.\n\n**cat**',
      choices: ['hat', 'cup', 'can', 'pig'],
      answer: 0,
      why: [
        '',
        'cup 은 첫소리 c 만 같아요. 끝소리는 -up 이에요.',
        'can 은 앞의 ca 가 같지만 끝 글자가 n 이에요. 끝소리는 -an 이에요.',
        'pig 는 끝소리가 -ig 예요.',
      ],
      explain: '첫 글자를 가리면 cat 은 -at, hat 도 -at 이에요. 그래서 끝소리가 같아요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 5,
      q: '**bag** 의 가운데 모음 a 를 i 로 바꾸면 어떤 낱말이 될까요?',
      choices: ['big', 'bug', 'beg', 'dig'],
      answer: 0,
      why: [
        '',
        'bug 는 a 를 u 로 바꾼 낱말이에요.',
        'beg 는 a 를 e 로 바꾼 낱말이에요.',
        'dig 는 가운데는 i 지만 첫 글자도 d 로 바뀌었어요. 첫 글자 b 는 그대로 둬요.',
      ],
      explain: 'b-a-g 의 가운데 a 만 i 로 바꾸면 b-i-g, 곧 big(큰)이에요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 3,
      q: '글자를 차례대로 놓아 "개"를 뜻하는 낱말을 만드세요.',
      choices: ['d', 'o', 'g'],
      answer: [0, 1, 2],
      hint: '"개"는 짧은 o 소리가 나는 낱말이에요.',
      explain: 'd-o-g 를 이어 읽으면 dog(개)예요. 가운데 o 가 짧은 o 소리를 내요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '끝소리가 같은 낱말끼리만 묶은 것을 고르세요.',
      choices: ['pig, big, dig', 'pig, pen, pot', 'sun, six, sit', 'cat, cup, cut'],
      answer: 0,
      hint: '낱말마다 첫 글자를 가리고 남은 부분을 비교해 보세요.',
      why: [
        '',
        '첫소리 p 만 같아요. 끝소리는 -ig, -en, -ot 으로 모두 달라요.',
        '첫소리 s 만 같아요. 끝소리는 -un, -ix, -it 으로 모두 달라요.',
        '첫소리 c 만 같아요. 끝소리는 -at, -up, -ut 으로 모두 달라요.',
      ],
      explain: 'pig, big, dig 는 첫 글자를 가리면 모두 -ig 예요. 나머지 묶음은 첫소리만 같고 끝소리는 달라요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 5,
      q: '**hot** 의 가운데 모음만 바꾸어 "모자"라는 뜻의 낱말을 쓰세요.',
      answer: ['hat'],
      hint: '첫 글자 h 와 끝 글자 t 는 그대로 두어요.',
      wrong: [
        { a: 'hut', why: 'hut 은 "오두막"이에요. 가운데를 a 로 바꿔야 "모자"가 돼요.' },
        { a: 'hit', why: 'hit 은 "치다"예요. 가운데를 a 로 바꿔야 "모자"가 돼요.' },
        { a: 'cap', why: 'cap 도 모자를 뜻하지만, 이 문제는 hot 의 가운데 모음만 바꾸는 문제예요.' },
      ],
      explain: 'h-o-t 의 가운데 o 를 a 로 바꾸면 h-a-t, 곧 hat(모자)이에요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '가운데 모음 소리가 나머지와 **다른** 하나를 고르세요.',
      choices: ['box', 'dog', 'top', 'cup'],
      answer: 3,
      hint: '낱말마다 가운데 글자를 찾아보세요.',
      why: [
        'box 의 가운데 모음은 o 예요. dog, top 과 같아요.',
        'dog 의 가운데 모음은 o 예요. box, top 과 같아요.',
        'top 의 가운데 모음은 o 예요. box, dog 와 같아요.',
        '',
      ],
      explain: 'box, dog, top 은 가운데가 o 라서 짧은 o 소리가 나요. cup 만 가운데가 u 라서 소리가 달라요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 5,
      q: 'bag → big → bug 처럼 **가운데 모음만** 바꾼 것이 **아닌** 것을 고르세요.',
      choices: ['hat → hot', 'pen → pin', 'cat → cut', 'dog → log'],
      answer: 3,
      hint: '두 낱말에서 어느 자리 글자가 바뀌었는지 살펴보세요.',
      why: [
        'h 와 t 는 그대로이고 가운데 a 만 o 로 바뀌었어요.',
        'p 와 n 은 그대로이고 가운데 e 만 i 로 바뀌었어요.',
        'c 와 t 는 그대로이고 가운데 a 만 u 로 바뀌었어요.',
        '',
      ],
      explain: 'dog → log 는 가운데 o 는 그대로이고 첫 글자 d 가 l 로 바뀌었어요. 그래서 가운데 모음을 바꾼 것이 아니에요. (끝소리 -og 가 같은 낱말이에요.)',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
      q: '두 빈칸에 **같은 모음 글자** 하나를 넣어 두 낱말을 만들려고 해요. 알맞은 모음 글자를 쓰세요.\n\nh [[ ]] t (뜨거운)\np [[ ]] t (냄비)',
      answer: ['o'],
      hint: '입을 위아래로 크게 벌리는 짧은 소리를 떠올려 보세요.',
      wrong: [
        { a: 'a', why: 'a 를 넣으면 hat 은 "모자", pat 은 "토닥이다"라는 뜻이 돼요. "뜨거운"과 "냄비"가 아니에요.' },
        { a: 'u', why: 'u 를 넣으면 hut(오두막)이 돼요. "뜨거운"은 hot 이에요.' },
        { a: 'i', why: 'i 를 넣으면 hit 은 "치다", pit 은 "구덩이"라는 뜻이 돼요. "뜨거운"은 hot 이에요.' },
      ],
      explain: '"뜨거운"은 hot, "냄비"는 pot 이에요. 두 낱말 모두 가운데 모음이 o 예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '짧은 글을 읽고 물음에 답하세요.\n\nI see a pig.\nThe pig is big.\nThe pig can dig.\n\n글에서 **pig** 와 끝소리가 같은 낱말끼리만 고른 것을 고르세요.',
      choices: ['big, dig', 'see, big', 'can, dig', 'is, big'],
      answer: 0,
      hint: '낱말마다 첫 글자를 가리고 -ig 가 남는지 확인해 보세요.',
      why: [
        '',
        'see 는 -ig 로 끝나지 않아요.',
        'can 은 끝소리가 -an 이에요.',
        'is 는 i 소리는 같지만 끝이 s 예요. -ig 가 아니에요.',
      ],
      explain: 'big 과 dig 는 첫 글자를 가리면 -ig 가 남아서 pig 와 끝소리가 같아요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 0,
      q: '자음 + 모음 + 자음으로 된 세 글자 낱말에서 가운데 모음은 대부분 짧은 소리를 내요. 다음 중 **자음 + 모음 + 자음** 꼴이 **아닌** 낱말을 고르세요.',
      choices: ['see', 'cat', 'sun', 'bed'],
      answer: 0,
      hint: '세 글자를 하나씩 자음인지 모음인지 따져 보세요.',
      why: [
        '',
        'c(자음) + a(모음) + t(자음)이에요.',
        's(자음) + u(모음) + n(자음)이에요.',
        'b(자음) + e(모음) + d(자음)이에요.',
      ],
      explain: 'see 는 s(자음) + e(모음) + e(모음)이라서 자음 + 모음 + 자음 꼴이 아니에요. 그래서 짧은 e 소리가 아닌 다른 소리가 나요. 이런 소리는 2학기에 "긴 모음" 단원에서 배워요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'text', concept: 4,
      q: '**sun** 과 끝소리가 같도록 첫 글자만 바꾸어 "달리다"라는 뜻의 낱말을 쓰세요.',
      answer: ['run'],
      hint: '끝소리 -un 앞에 r 을 붙여 보세요.',
      wrong: [
        { a: 'ran', why: 'ran 은 끝소리가 -an 이에요. sun 과 끝소리가 같으려면 -un 이어야 해요.' },
        { a: 'fun', why: 'fun 은 끝소리는 같지만 "재미"라는 뜻이에요. "달리다"는 run 이에요.' },
      ],
      explain: 'sun 의 끝소리 -un 앞에 r 을 붙이면 run(달리다)이에요.',
    },
  ],

  deeper: [
    {
      title: '끝에 e 가 붙으면 소리가 바뀌어요',
      body: '이 단원에서 배운 짧은 모음 소리는 자음 + 모음 + 자음 낱말에서 나요. 그런데 끝에 e 를 하나 붙이면 가운데 모음 소리가 달라져요.\n\n| 짧은 소리 | 끝에 e 를 붙이면 |\n|---|---|\n| cap(모자) | cape(망토) |\n| kit(도구 세트) | kite(연) |\n| hop(깡충 뛰다) | hope(바라다) |\n| cub(새끼 곰) | cube(정육면체) |\n\n끝의 e 는 소리를 내지 않고, 가운데 모음이 알파벳 이름처럼 길게 소리 나게 해요. 이 소리는 2학기 "긴 모음과 두 글자 소리" 단원에서 자세히 배워요.',
    },
  ],

  faq: [
    {
      q: '모음이 뭐예요? 자음이랑 뭐가 달라요?',
      a: '알파벳 가운데 a, e, i, o, u 다섯 글자가 모음이고, 나머지 21글자가 자음이에요. 세 글자 낱말 cat 에서는 앞뒤의 c, t 가 자음이고 가운데 a 가 모음이에요. 모음이 바뀌면 cat 이 cut 이 되는 것처럼 낱말이 달라져요.',
    },
    {
      q: 'e 랑 i 소리가 너무 비슷해요. 어떻게 구별해요?',
      a: '입 크기로 구별해요. e 는 입을 양옆으로 조금 벌리고, i 는 그보다 더 작게 벌리고 힘을 빼요. pen 과 pin, ten 과 tin 처럼 짝을 지어 번갈아 소리 내 보면 차이를 느낄 수 있어요.',
    },
    {
      q: 'a 는 언제나 cat 의 a 소리가 나요?',
      a: '아니에요. 이 단원의 짧은 소리는 cat, map 처럼 자음 사이에 모음이 하나 낀 낱말에서 나요. cake 처럼 끝에 e 가 붙으면 다른 소리가 나요. 그런 소리는 뒤에서 배워요.',
    },
  ],

  mistakes: [
    '글자를 거꾸로 이어 b-u-s 를 sub 처럼 읽는 실수 — 언제나 왼쪽 글자부터 차례대로 이어요.',
    '첫소리만 같은 cat 과 cup 을 끝소리가 같다고 생각하는 실수 — 첫 글자를 가리고 남은 부분(-at, -up)을 비교해요.',
    '짧은 e 와 짧은 i 를 바꾸어 읽는 실수(pen 을 pin 처럼) — i 는 e 보다 입을 더 작게 벌려요.',
  ],

  gens: [
    {
      id: 'same-vowel',
      level: 1,
      title: '가운데 모음 소리가 같은 낱말 찾기',
      make: function (R) {
        var bank = {
          a: ['cat', 'map', 'bag', 'hat', 'fan', 'jam', 'can', 'dad'],
          e: ['pen', 'bed', 'ten', 'red', 'hen', 'leg', 'net', 'web'],
          i: ['pig', 'six', 'big', 'sit', 'dig', 'pin', 'lip', 'wig'],
          o: ['dog', 'box', 'hot', 'top', 'pot', 'fox', 'mop', 'log'],
          u: ['cup', 'sun', 'bus', 'bug', 'run', 'fun', 'nut', 'mud'],
        };
        var concept = { a: 0, e: 1, i: 1, o: 2, u: 2 };
        var vs = ['a', 'e', 'i', 'o', 'u'];
        var v = R.pick(vs);
        var two = R.sample(bank[v], 2);
        var key = two[0];
        var correct = two[1];
        var reason = {};
        var wrongs = vs.filter(function (x) { return x !== v; }).map(function (x) {
          var w = R.pick(bank[x]);
          reason[w] = w + ' → 가운데 모음 ' + x + ', ' + key + ' → 가운데 모음 ' + v + '. 가운데 글자가 달라서 소리도 달라요.';
          return w;
        });
        var pick = R.choices(correct, wrongs);
        return {
          type: 'choice', concept: concept[v],
          q: '다음 낱말과 가운데 모음 소리가 같은 것을 고르세요.\n\n**' + key + '**',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: key + ', ' + correct + ' 둘 다 가운데 모음이 ' + v + '라서 짧은 ' + v + ' 소리가 나요.',
        };
      },
    },
    {
      id: 'change-vowel',
      level: 2,
      title: '가운데 모음을 바꿔 새 낱말 만들기',
      make: function (R) {
        var mean = {
          bag: '가방', big: '큰', bug: '벌레', beg: '조르다',
          hat: '모자', hit: '치다', hot: '뜨거운', hut: '오두막',
          pan: '프라이팬', pen: '펜', pin: '핀',
          pet: '반려동물', pot: '냄비', pit: '구덩이',
          ten: '열', tin: '깡통',
          cat: '고양이', cut: '자르다',
          bad: '나쁜', bed: '침대', bud: '꽃봉오리',
          map: '지도', mop: '대걸레',
          net: '그물', nut: '견과',
          leg: '다리', log: '통나무',
          fan: '선풍기', fin: '지느러미', fun: '재미',
          dig: '파다', dog: '개',
          jog: '천천히 달리다', jug: '주전자',
        };
        var frames = [
          ['bag', 'big', 'bug', 'beg'], ['hat', 'hit', 'hot', 'hut'], ['pan', 'pen', 'pin'], ['pet', 'pot', 'pit'],
          ['ten', 'tin'], ['cat', 'cut'], ['bad', 'bed', 'bud'], ['map', 'mop'], ['net', 'nut'], ['leg', 'log'],
          ['fan', 'fin', 'fun'], ['dig', 'dog'], ['jog', 'jug'],
        ];
        var fr = R.pick(frames);
        var two = R.sample(fr, 2);
        var from = two[0];
        var to = two[1];
        var vf = from.charAt(1);
        var vt = to.charAt(1);
        var wrong = [{ a: from, why: '처음 낱말을 그대로 썼어요. 가운데 ' + vf + '를 ' + vt + '로 바꿔요.' }];
        fr.forEach(function (w) {
          if (w !== from && w !== to) {
            wrong.push({ a: w, why: w + '(' + mean[w] + ') → 가운데 모음 ' + w.charAt(1) + '. 가운데를 ' + vt + '로 바꿔야 해요.' });
          }
        });
        return {
          type: 'short', check: 'text', concept: 5,
          q: '**' + from + '**(' + mean[from] + ')의 가운데 모음 ' + vf + '를 ' + vt + '로 바꾸어 만든 낱말을 쓰세요.',
          answer: [to],
          hint: '첫 글자(' + from.charAt(0) + ')와 끝 글자(' + from.charAt(2) + ')는 그대로 두어요.',
          wrong: wrong,
          explain: from.split('').join('-') + '의 가운데 ' + vf + '를 ' + vt + '로 바꾸면 ' + to.split('').join('-') + ', 곧 ' + to + '(' + mean[to] + ')' + R.josa(mean[to], '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'rhyme',
      level: 2,
      title: '끝소리가 같은 낱말 찾기',
      make: function (R) {
        var fams = {
          at: ['cat', 'hat', 'bat', 'mat'], ap: ['map', 'cap', 'nap', 'tap'], an: ['can', 'fan', 'man', 'pan'],
          ig: ['pig', 'big', 'dig', 'wig'], it: ['sit', 'hit', 'bit', 'kit'],
          en: ['pen', 'ten', 'hen', 'men'], et: ['net', 'pet', 'wet', 'jet'],
          op: ['top', 'mop', 'hop', 'pop'], ot: ['hot', 'pot', 'dot', 'not'],
          un: ['sun', 'run', 'fun', 'bun'], ug: ['bug', 'hug', 'mug', 'rug'],
        };
        var keys = Object.keys(fams);
        var famOf = {};
        keys.forEach(function (k) { fams[k].forEach(function (w) { famOf[w] = k; }); });
        var F = R.pick(keys);
        var two = R.sample(fams[F], 2);
        var key = two[0];
        var correct = two[1];
        var others = keys.filter(function (k) { return k !== F; });
        var all = [];
        others.forEach(function (k) { all = all.concat(fams[k]); });
        var sameFirst = all.filter(function (w) { return w.charAt(0) === key.charAt(0); });
        var sameVowel = all.filter(function (w) { return w.charAt(1) === key.charAt(1); });
        var cands = [];
        if (sameFirst.length) cands.push(R.pick(sameFirst));
        if (sameVowel.length) cands.push(R.pick(sameVowel));
        R.sample(all, 4).forEach(function (w) { cands.push(w); });
        var reason = {};
        cands.forEach(function (w) {
          var why = w + ' → 끝소리 -' + famOf[w] + ', ' + key + ' → 끝소리 -' + F + '.';
          var s0 = w.charAt(0) === key.charAt(0), s1 = w.charAt(1) === key.charAt(1), s2 = w.charAt(2) === key.charAt(2);
          if (s0 && s1) why += ' 앞의 두 글자는 같지만 끝 글자가 달라요.';
          else if (s0 && s2) why += ' 첫 글자와 끝 글자는 같지만 가운데 모음이 달라요.';
          else if (s0) why += ' 첫소리만 같아요.';
          else if (s1) why += ' 가운데 모음은 같지만 끝 글자가 달라요.';
          else if (s2) why += ' 끝 글자만 같고 가운데 모음이 달라요. 끝소리는 가운데 모음부터 끝까지를 비교해요.';
          reason[w] = why;
        });
        var pick = R.choices(correct, cands);
        return {
          type: 'choice', concept: 4,
          q: '다음 낱말과 끝소리가 같은 것을 고르세요.\n\n**' + key + '**',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '첫 글자를 가리면 ' + key + ' → -' + F + ', ' + correct + ' → -' + F + '. 끝소리가 같아요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'cat', m: '고양이', ex: 'I have a cat.', exm: '나는 고양이가 있어요.' },
    { w: 'map', m: '지도', ex: 'This is a map.', exm: '이것은 지도예요.' },
    { w: 'bag', m: '가방', ex: 'My bag is red.', exm: '내 가방은 빨간색이에요.' },
    { w: 'hat', m: '모자', ex: 'I like your hat.', exm: '네 모자가 마음에 들어.' },
    { w: 'pen', m: '펜', ex: 'Do you have a pen?', exm: '너 펜 있니?' },
    { w: 'bed', m: '침대', ex: 'The cat is on the bed.', exm: '고양이가 침대 위에 있어요.' },
    { w: 'ten', m: '열, 10', ex: 'I have ten pens.', exm: '나는 펜이 열 개 있어요.' },
    { w: 'pig', m: '돼지', ex: 'The pig is big.', exm: '그 돼지는 커요.' },
    { w: 'six', m: '여섯, 6', ex: 'I see six bugs.', exm: '벌레 여섯 마리가 보여요.' },
    { w: 'big', m: '큰', ex: 'It\'s a big box.', exm: '그것은 큰 상자예요.' },
    { w: 'dog', m: '개', ex: 'My dog can run.', exm: '우리 개는 달릴 수 있어요.' },
    { w: 'box', m: '상자', ex: 'What\'s in the box?', exm: '상자 안에 무엇이 있니?' },
    { w: 'hot', m: '뜨거운, 더운', ex: 'It\'s hot today.', exm: '오늘은 더워요.' },
    { w: 'cup', m: '컵', ex: 'This is my cup.', exm: '이것은 내 컵이에요.' },
    { w: 'sun', m: '해, 태양', ex: 'The sun is hot.', exm: '해가 뜨거워요.' },
    { w: 'bus', m: '버스', ex: 'It\'s a big bus.', exm: '그것은 큰 버스예요.' },
    { w: 'bug', m: '벌레', ex: 'Look at the bug.', exm: '저 벌레 좀 봐.' },
  ],
});
