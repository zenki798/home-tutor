/* 3학년 영어 · 알파벳 대문자 익히기 */
Tutor.registerUnit({
  id: 'eng-e3-01',
  course: 'eng-e3',
  title: '알파벳 대문자 익히기',
  summary: 'A부터 Z까지 알파벳 대문자의 이름과 순서를 익히고, 모양이 비슷한 글자를 구별해 바르게 써요.',
  goals: [
    '알파벳 대문자 26자를 A부터 Z까지 순서대로 말하고 찾을 수 있어요.',
    '대문자를 네 줄 칸에 바른 순서로 쓸 수 있어요.',
    '모양이 비슷한 대문자(E와 F, M과 N, O와 Q, P와 R)를 구별할 수 있어요.',
    '간판과 표지판의 대문자 낱말(STOP, EXIT, BUS)을 읽고 뜻을 알 수 있어요.',
  ],
  standards: ['[4영01-01]', '[4영01-02]', '[4영02-02]'],

  concepts: [
    {
      title: '알파벳 26자와 순서',
      body: '영어를 쓰는 글자를 **알파벳**이라고 해요. 알파벳은 모두 **26자**이고, 늘 같은 순서로 줄을 서 있어요.\n\n**A B C D E F G**\n**H I J K L M N**\n**O P Q R S T U**\n**V W X Y Z**\n\n이렇게 크게 쓴 글자를 **대문자**라고 해요. 순서를 알면 영어 사전에서 낱말을 찾거나, 이름표를 차례대로 놓을 때 편해요.\n\n> 💡 7자씩 묶어서 외우면 쉬워요. 7자 묶음이 세 개, 마지막 묶음은 5자예요. (7+7+7+5=26)',
      easy: '알파벳 순서는 줄 서기와 같아요. A가 맨 앞에, Z가 맨 뒤에 서 있어요.\n\n어떤 글자의 "바로 앞"과 "바로 뒤"를 찾고 싶으면 A부터 손가락으로 하나씩 짚어 가 보세요. D를 찾았다면 손가락 바로 왼쪽이 C, 바로 오른쪽이 E예요.',
      check: {
        type: 'choice',
        q: '알파벳 순서에서 **G** 바로 뒤에 오는 대문자는 무엇일까요?',
        choices: ['H', 'F', 'J'],
        answer: 0,
        why: ['', 'F는 G 바로 앞에 있는 글자예요. "뒤"는 Z 쪽이에요.', 'J도 G 뒤에 있지만 바로 뒤는 아니에요. G 다음은 H, I, J 순서예요.'],
        explain: 'A B C D E F **G H** I J … 이므로 G 바로 뒤에는 H가 와요.',
      },
    },
    {
      title: '대문자 바르게 쓰기',
      body: '영어 공책에는 줄이 네 개 있어요(**네 줄 칸**). 대문자는 모두 **맨 윗줄부터 셋째 줄까지** 꽉 채워 써요. 키가 모두 같아요.\n\n글자의 선을 긋는 순서를 **획순**이라고 해요. 기본 규칙은 두 가지예요.\n- **위에서 아래로** 긋기\n- **왼쪽에서 오른쪽으로** 긋기\n\n예를 들어 **L**은 세로선을 위에서 아래로 그은 뒤, 아래 가로선을 왼쪽에서 오른쪽으로 그어요. **H**는 왼쪽 세로선 → 오른쪽 세로선 → 가운데 가로선 순서로 써요. **E**와 **F**도 세로선을 먼저 긋고, 가로선을 위에서부터 차례로 그어요.\n\n> ⚠️ 몇몇 글자의 획순은 교과서마다 조금 다를 수 있어요. 위에서 아래로, 왼쪽에서 오른쪽으로라는 규칙을 지키면 돼요.',
      easy: '대문자는 키가 모두 똑같은 친구들이에요. 네 줄 칸에서 맨 윗줄에 머리를 대고, 셋째 줄에 발을 딛고 서 있어요. 맨 아래 칸은 비워 둬요.\n\n선을 그을 때는 비가 내리듯 위에서 아래로, 글을 읽듯 왼쪽에서 오른쪽으로 그어요.',
      fig: {
        type: 'svg',
        alt: '네 줄 칸에 쓴 대문자 L, H, E, F. 모두 맨 윗줄부터 셋째 줄까지 차지한다',
        svg: '<svg viewBox="0 0 300 90" xmlns="http://www.w3.org/2000/svg">' +
          '<g stroke="var(--fig-1)" stroke-width="1.5">' +
          '<line x1="5" y1="10" x2="295" y2="10"/><line x1="5" y1="30" x2="295" y2="30" stroke-dasharray="4 4"/>' +
          '<line x1="5" y1="50" x2="295" y2="50"/><line x1="5" y1="70" x2="295" y2="70"/></g>' +
          '<g stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none">' +
          '<path d="M30 10 V50 H58"/>' +
          '<path d="M95 10 V50 M128 10 V50 M95 30 H128"/>' +
          '<path d="M170 10 V50 M170 10 H198 M170 30 H194 M170 50 H198"/>' +
          '<path d="M240 10 V50 M240 10 H268 M240 30 H264"/></g></svg>',
      },
      check: {
        type: 'choice',
        q: '대문자 **B**는 네 줄 칸의 어디에 쓸까요?',
        choices: ['맨 윗줄부터 셋째 줄까지', '둘째 줄부터 셋째 줄까지', '둘째 줄부터 맨 아랫줄까지'],
        answer: 0,
        why: ['', '대문자는 키가 커서 맨 윗줄까지 닿아요.', '대문자는 셋째 줄 아래로 내려가지 않아요.'],
        explain: '대문자는 모두 맨 윗줄부터 셋째 줄까지 꽉 채워 써요. B도 마찬가지예요.',
      },
    },
    {
      title: '모양이 비슷한 대문자 구별하기',
      body: '모양이 비슷해서 헷갈리는 대문자가 있어요. **무엇이 하나 더 있는지** 살펴보면 쉽게 구별할 수 있어요.\n\n| 글자 | 다른 점 |\n|---|---|\n| **E**와 **F** | E는 가로선이 3개(위·가운데·아래), F는 2개(위·가운데)예요. |\n| **M**과 **N** | 둘 다 세로선이 2개예요. M은 가운데가 V자로 꺾여 선이 4개, N은 비스듬한 선이 하나라서 선이 3개예요. |\n| **O**와 **Q** | Q는 O 아래쪽에 작은 꼬리가 붙어 있어요. |\n| **P**와 **R** | R은 P에 비스듬한 다리가 하나 더 있어요. |\n\n> 💡 알파벳 순서도 E→F, M→N, O→P→Q→R 이에요. 비슷한 글자가 가까이 모여 있어요.',
      easy: 'E는 빗처럼 생겼어요. 손잡이가 세로선, 빗살이 가로선이에요. 빗살 3개 가운데 맨 아래 빗살이 떨어져 나가면 F가 돼요.\n\n동그라미 O에 꼬리를 달면 Q, P에 다리를 하나 쭉 뻗으면 R이 돼요. "하나 더 붙었는지"만 보면 돼요.',
      fig: {
        type: 'svg',
        alt: '비슷한 대문자 짝 E와 F, M과 N, O와 Q, P와 R을 나란히 그린 그림',
        svg: '<svg viewBox="0 0 400 70" xmlns="http://www.w3.org/2000/svg">' +
          '<g stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
          '<path d="M10 10 V50 M10 10 H34 M10 30 H30 M10 50 H34"/><path d="M45 10 V50 M45 10 H69 M45 30 H65"/>' +
          '<path d="M110 50 V10 L124 34 L138 10 V50"/><path d="M152 50 V10 L176 50 V10"/>' +
          '<ellipse cx="222" cy="30" rx="14" ry="20"/><ellipse cx="258" cy="30" rx="14" ry="20"/><path d="M262 42 L274 54"/>' +
          '<path d="M310 50 V10 H322 A10 10 0 0 1 322 30 H310"/><path d="M350 50 V10 H362 A10 10 0 0 1 362 30 H350 M358 30 L374 50"/></g>' +
          '<g stroke="var(--fig-2)" stroke-width="1"><line x1="90" y1="5" x2="90" y2="60"/><line x1="195" y1="5" x2="195" y2="60"/><line x1="290" y1="5" x2="290" y2="60"/></g></svg>',
      },
      check: {
        type: 'choice',
        q: '**O**에 작은 꼬리가 붙은 모양의 대문자는 무엇일까요?',
        choices: ['Q', 'C', 'G'],
        answer: 0,
        why: ['', 'C는 O의 오른쪽이 열린 글자예요. 꼬리가 없어요.', 'G는 C 안쪽에 짧은 가로선이 있는 글자예요. 꼬리가 아니에요.'],
        explain: 'O 아래쪽에 작은 꼬리를 붙이면 Q가 돼요. O와 Q는 꼬리가 있는지로 구별해요.',
      },
    },
    {
      title: '간판과 표지판 속 대문자',
      body: '길이나 건물에 있는 간판·표지판에는 대문자로만 쓴 낱말이 많아요. 대문자는 크고 모양이 또렷해서 멀리서도 잘 보이기 때문이에요.\n\n| 표지판 | 뜻 | 볼 수 있는 곳 |\n|---|---|---|\n| **STOP** | 멈추세요 | 차가 다니는 길, 건널목 |\n| **EXIT** | 나가는 곳(출구) | 건물, 지하철역 |\n| **BUS** | 버스 | 버스 정류장 |\n| **OPEN** | 열려 있어요(영업 중) | 가게 문 |\n\n표지판 낱말을 읽을 때는 글자를 왼쪽부터 하나씩 읽은 뒤, 표지판이 있는 곳을 떠올리면 뜻을 짐작하기 쉬워요.',
      easy: '표지판은 "말하지 않고 알려 주는 선생님"이에요. 길가의 빨간 표지판에 쓰인 STOP은 "멈추세요"라고 알려 줘요.\n\n건물 안 비상구 표시 근처에서 EXIT를 보면 "여기로 나가요"라는 뜻이에요. 위험할 때 EXIT를 따라가면 밖으로 나갈 수 있어요.',
      check: {
        type: 'choice',
        q: '건물에서 밖으로 나가는 곳을 알려 주는 표지판 낱말은 무엇일까요?',
        choices: ['EXIT', 'STOP', 'BUS'],
        answer: 0,
        why: ['', 'STOP은 "멈추세요"라는 뜻이에요.', 'BUS는 "버스"라는 뜻이에요.'],
        explain: 'EXIT는 "나가는 곳(출구)"이라는 뜻이에요. 건물이나 지하철역에서 볼 수 있어요.',
      },
    },
  ],

  examples: [
    {
      q: '빈칸에 들어갈 대문자를 차례대로 쓰세요.\n\nJ  K  [[?]]  M  [[?]]',
      steps: [
        '알파벳 순서를 떠올려요: … H I J K L M N O …',
        'K 바로 뒤, M 바로 앞에 있는 글자는 L이에요.',
        'M 바로 뒤에 오는 글자는 N이에요.',
      ],
      answer: 'L, N',
    },
    {
      q: '지하철역 계단 위에 다음 표지판이 있어요. 무슨 뜻일까요?\n\n**EXIT**',
      steps: [
        '글자를 왼쪽부터 하나씩 읽어요: E, X, I, T',
        '지하철역이나 건물에서 자주 보는 표지판 낱말이에요.',
        'EXIT는 "나가는 곳(출구)"이라는 뜻이에요. 이 계단으로 올라가면 밖으로 나갈 수 있어요.',
      ],
      answer: '나가는 곳(출구)',
    },
  ],

  terms: [
    { term: '알파벳', def: '영어를 쓰는 글자예요. A부터 Z까지 모두 26자예요.' },
    { term: '대문자', def: '알파벳을 크게 쓴 글자예요. 예: A, B, C. 간판·표지판에 많이 쓰여요.' },
    { term: '획순', def: '글자를 쓸 때 선을 긋는 순서예요. 위에서 아래로, 왼쪽에서 오른쪽으로 그어요.' },
    { term: '네 줄 칸', def: '영어 글자를 바른 크기로 쓰도록 줄 네 개를 그은 칸이에요. 대문자는 맨 윗줄부터 셋째 줄까지 써요.' },
    { term: '표지판', def: '길이나 건물에서 알아야 할 것을 글자나 그림으로 알려 주는 판이에요. 예: STOP, EXIT' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', fixed: true, concept: 0,
      q: '알파벳 대문자는 모두 몇 자일까요?',
      choices: ['20자', '24자', '26자', '28자'],
      answer: 2,
      why: [
        '여섯 자가 모자라요. 7자 묶음 세 개와 5자 묶음 하나를 더해 보세요.',
        '24는 한글의 기본 자음과 모음을 합친 수예요. 알파벳은 26자예요.',
        '',
        '두 자를 더 셌어요. A부터 Z까지는 26자예요.',
      ],
      explain: '알파벳은 A부터 Z까지 모두 26자예요. 7자씩 세 묶음(21자)과 마지막 5자를 더하면 26자예요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '알파벳 순서에서 **M** 바로 앞에 오는 대문자는 무엇일까요?',
      choices: ['L', 'N', 'K', 'O'],
      answer: 0,
      why: [
        '',
        'N은 M 바로 뒤에 오는 글자예요. "앞"은 A 쪽이에요.',
        'K는 M 앞에 있지만 바로 앞은 아니에요. K 다음에 L, 그다음에 M이에요.',
        'O는 M보다 뒤에 있어요(M N O).',
      ],
      explain: '… K **L M** N O … 이므로 M 바로 앞에는 L이 있어요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 들어갈 대문자를 쓰세요.\n\nW  X  [[?]]  Z',
      answer: ['Y'],
      wrong: [{ a: 'V', why: 'V는 W 바로 앞 글자예요. X와 Z 사이에는 Y가 있어요.' }],
      explain: '알파벳의 끝부분은 V W X **Y** Z 예요. 그래서 X와 Z 사이에는 Y가 와요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '대문자 **F**에는 가로선이 3개 있어요.',
      answer: false,
      explain: 'F의 가로선은 위와 가운데, 모두 2개예요. 가로선이 3개(위·가운데·아래)인 글자는 E예요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '**P**에 비스듬한 다리를 하나 더 그으면 어떤 대문자가 될까요?',
      choices: ['R', 'B', 'D', 'F'],
      answer: 0,
      why: [
        '',
        'B는 P 아래에 둥근 부분이 하나 더 있는 글자예요. 다리가 아니에요.',
        'D는 둥근 부분이 위에서 아래까지 크게 이어진 글자예요.',
        'F는 둥근 부분 없이 곧은 선만 있는 글자예요.',
      ],
      explain: 'P에 비스듬한 다리를 더하면 R이 돼요. P와 R은 다리가 있는지로 구별해요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '"버스"라는 뜻의 표지판 낱말은 무엇일까요?',
      choices: ['BUS', 'EXIT', 'STOP', 'OPEN'],
      answer: 0,
      why: ['', 'EXIT는 "나가는 곳(출구)"이라는 뜻이에요.', 'STOP은 "멈추세요"라는 뜻이에요.', 'OPEN은 "열려 있어요(영업 중)"라는 뜻이에요.'],
      explain: 'BUS는 "버스"예요. 버스 정류장 표지판에서 볼 수 있어요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 1,
      q: '획순의 기본 규칙에 맞게 대문자 **H**를 쓰는 순서는 무엇일까요?',
      choices: [
        '왼쪽 세로선 → 오른쪽 세로선 → 가운데 가로선',
        '가운데 가로선 → 왼쪽 세로선 → 오른쪽 세로선',
        '오른쪽 세로선 → 왼쪽 세로선 → 가운데 가로선',
      ],
      answer: 0,
      why: [
        '',
        '가운데 가로선은 두 세로선을 잇는 선이라서 세로선을 먼저 그은 뒤에 그어요.',
        '왼쪽에서 오른쪽으로 쓰는 규칙에 맞지 않아요. 왼쪽 세로선을 먼저 그어요.',
      ],
      explain: 'H는 왼쪽 세로선을 위에서 아래로, 오른쪽 세로선을 위에서 아래로 그은 뒤, 가운데 가로선을 왼쪽에서 오른쪽으로 그어요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '알파벳 순서대로 놓으세요.',
      choices: ['C', 'F', 'J', 'P', 'U'],
      answer: [0, 1, 2, 3, 4],
      hint: 'A B C D E F G부터 차례로 말하면서 나오는 글자를 찾아보세요.',
      explain: 'A B **C** D E **F** G H I **J** K L M N O **P** Q R S T **U** V W X Y Z 이므로 C → F → J → P → U 순서예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      q: '표지판 **STOP**을 바르게 쓴 것은 무엇일까요?',
      choices: ['STOP', 'STQP', 'SOTP', 'STOR'],
      answer: 0,
      why: [
        '',
        'O 자리에 꼬리가 달린 Q를 썼어요. O에는 꼬리가 없어요.',
        'T와 O의 순서가 바뀌었어요. S, T, O, P 순서예요.',
        'P 자리에 다리가 있는 R을 썼어요. 마지막 글자는 다리가 없는 P예요.',
      ],
      hint: '글자를 하나씩 비교하면서, 모양이 비슷한 글자(O와 Q, P와 R)를 살펴보세요.',
      explain: '"멈추세요"라는 뜻의 낱말은 S, T, O, P 네 글자로 써요. Q와 O, R과 P는 모양이 비슷하니 꼬리와 다리를 잘 보세요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 0,
      q: '알파벳 순서에서 **K**와 **M** 사이에 있는 대문자를 쓰세요.',
      answer: ['L'],
      hint: 'K 바로 뒤에 오는 글자를 찾아보세요.',
      wrong: [{ a: 'N', why: 'N은 M 바로 뒤에 있어요. K와 M 사이에는 L이 있어요.' }, { a: 'J', why: 'J는 K 바로 앞에 있어요. K와 M 사이에는 L이 있어요.' }],
      explain: '… J **K L M** N … 이므로 K와 M 사이에는 L이 있어요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '건물에 불이 났어요. 어떤 낱말이 쓰인 표지판을 따라가야 밖으로 나갈 수 있을까요?',
      choices: ['EXIT', 'OPEN', 'BUS', 'STOP'],
      answer: 0,
      why: [
        '',
        'OPEN은 "열려 있어요(영업 중)"라는 뜻으로, 가게 문에 붙어 있어요.',
        'BUS는 "버스"라는 뜻이에요.',
        'STOP은 "멈추세요"라는 뜻이에요. 나가는 곳을 알려 주지 않아요.',
      ],
      hint: '"나가는 곳(출구)"이라는 뜻의 낱말을 떠올려 보세요.',
      explain: 'EXIT는 "나가는 곳(출구)"이에요. 불이 나거나 위험할 때는 EXIT 표지판을 따라 밖으로 나가요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'text', concept: 0,
      q: 'A부터 차례로 셀 때 **열 번째** 대문자를 쓰세요.',
      answer: ['J'],
      hint: '7자 묶음 A B C D E F G 다음부터 이어서 세어 보세요.',
      wrong: [
        { a: 'I', why: 'I는 아홉 번째 글자예요. 하나 더 세어 보세요.' },
        { a: 'K', why: 'K는 열한 번째 글자예요. 하나를 더 셌어요.' },
      ],
      explain: 'A(1) B(2) C(3) D(4) E(5) F(6) G(7) H(8) I(9) **J(10)** 이므로 열 번째 글자는 J예요.',
    },
    {
      id: 'a2', level: 3, type: 'order', concept: 0,
      q: '이름표를 첫 글자의 알파벳 순서대로 놓으세요.',
      choices: ['JIHO', 'MINA', 'SORA', 'TOM'],
      answer: [0, 1, 2, 3],
      hint: '이름의 첫 글자 J, M, S, T가 알파벳에서 어디쯤 있는지 찾아보세요.',
      explain: '첫 글자를 보면 J, M, S, T예요. 알파벳 순서는 … **J** K L **M** N O P Q R **S T** … 이므로 JIHO → MINA → SORA → TOM 순서예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', fixed: true, concept: 2,
      q: '다음 대문자 가운데 **곧은 선으로만** 이루어진 글자는 모두 몇 개일까요?\n\nE  F  M  N  O  Q  P  R',
      choices: ['3개', '4개', '5개', '6개'],
      answer: 1,
      why: [
        'E, F, M, N을 다시 세어 보세요. 곧은 선으로만 된 글자를 하나 빠뜨렸어요.',
        '',
        'P와 R에는 둥근 부분이 있어요. 곧은 선으로만 된 글자가 아니에요.',
        'O와 Q는 둥근 글자이고, P와 R에도 둥근 부분이 있어요.',
      ],
      hint: '둥근 부분이 있는 글자를 먼저 지워 보세요.',
      explain: 'O와 Q는 둥근 글자, P와 R에는 둥근 부분이 있어요. 곧은 선으로만 된 글자는 E, F, M, N으로 모두 4개예요.',
    },
    {
      id: 'a4', level: 3, type: 'ox', concept: 0,
      q: '**STOP**의 네 글자 S, T, O, P 가운데 알파벳 순서에서 가장 앞에 오는 글자는 O예요.',
      answer: true,
      hint: 'N 다음부터 차례로 말해 보세요: N O P Q R S T',
      explain: '알파벳 순서는 … N **O P** Q R **S T** … 이에요. 네 글자 중 O가 가장 앞, 그다음 P, S, T 순서예요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 2,
      q: '가로선 하나를 지우면 **다른 대문자**가 되는 글자는 무엇일까요?',
      choices: ['E', 'O', 'S', 'C'],
      answer: 0,
      why: [
        '',
        'O에는 가로선이 없어요. 둥근 선 하나로 된 글자예요.',
        'S에는 가로선이 없어요. 구불구불한 선 하나로 된 글자예요.',
        'C에는 가로선이 없어요. 한쪽이 열린 둥근 선이에요.',
      ],
      hint: '가로선이 있는 글자부터 찾아보세요.',
      explain: 'E에서 맨 아래 가로선을 지우면 F가 돼요. O, S, C에는 가로선이 없어요.',
    },
  ],

  deeper: [
    {
      title: '알파벳은 어디에서 왔을까?',
      body: '오늘날 영어에서 쓰는 알파벳은 아주 옛날 로마 사람들이 쓰던 글자에서 왔어요. 그래서 "로마자"라고도 불러요.\n\n옛날 로마 사람들이 돌에 새긴 글자는 지금의 대문자와 닮은 크고 반듯한 글자였어요. 그 시절 글자에는 J, U, W가 없었고, 이 세 글자는 훨씬 나중에 더해져서 지금의 26자가 되었어요.\n\n손으로 빨리 쓰다 보니 글자 모양이 둥글고 작게 바뀌었고, 그렇게 **소문자**가 생겨났어요. 다음 단원에서 소문자를 배워요.',
    },
  ],

  faq: [
    {
      q: '알파벳 순서를 꼭 외워야 해요?',
      a: '네, 외워 두면 좋아요. 영어 사전은 낱말이 알파벳 순서로 실려 있어서, 순서를 알아야 낱말을 빨리 찾을 수 있어요. 7자씩 묶어서(A~G, H~N, O~U, V~Z) 여러 번 소리 내어 말해 보세요.',
    },
    {
      q: 'E와 F가 자꾸 헷갈려요.',
      a: '가로선을 세어 보세요. E는 위·가운데·아래 가로선이 3개, F는 위·가운데 2개예요. 알파벳 순서도 E가 먼저, F가 다음이니 "선이 많은 E가 먼저"라고 기억해도 좋아요.',
    },
    {
      q: '간판은 왜 대문자로 많이 써요?',
      a: '대문자는 키가 모두 같고 모양이 크고 또렷해서 멀리서도 잘 보여요. 그래서 STOP, EXIT처럼 빨리 알아봐야 하는 표지판에 대문자를 많이 써요.',
    },
  ],

  mistakes: [
    'F를 쓰면서 아래 가로선까지 그어 E로 만드는 실수 — F의 가로선은 위와 가운데 2개뿐이에요.',
    'M과 N의 순서를 바꾸어 외우는 실수 — 순서는 L, M, N, O예요(M이 먼저).',
    'Q의 꼬리를 빠뜨려 O로 쓰거나, R의 다리를 빠뜨려 P로 쓰는 실수 — 꼬리와 다리까지 써야 다른 글자가 돼요.',
  ],

  gens: [
    {
      id: 'neighbor-letter',
      level: 1,
      title: '바로 앞·바로 뒤에 오는 대문자',
      make: function (R) {
        var L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        function ga(ch) { return 'LMNR'.indexOf(ch) >= 0 ? '이' : '가'; } // 엘·엠·엔·알만 받침이 있다
        var next = R.bool();
        var i = next ? R.int(0, 24) : R.int(1, 25);
        var st = next ? 1 : -1;
        var c = L[i];
        var ans = L[i + st];
        var side = next ? '뒤' : '앞';
        var cands = [
          [L[i - st], '바로 ' + (next ? '앞' : '뒤') + ' 글자를 골랐어요. "' + side + '"' + (next ? '는 Z 쪽' : '은 A 쪽') + '이에요.'],
          [L[i + 2 * st], '한 칸을 더 갔어요. ' + c + ' 바로 ' + side + ' 글자를 찾아보세요.'],
          [L[i + 3 * st], '너무 멀리 갔어요. ' + c + ' 바로 ' + side + ' 글자를 찾아보세요.'],
          [L[i - 2 * st], '반대쪽으로 갔어요. "' + side + '"' + (next ? '는 Z 쪽' : '은 A 쪽') + '이에요.'],
          [L[i + 4 * st], '너무 멀리 갔어요. ' + c + ' 바로 ' + side + ' 글자를 찾아보세요.'],
          [L[i - 3 * st], '반대쪽으로 갔어요. "' + side + '"' + (next ? '는 Z 쪽' : '은 A 쪽') + '이에요.'],
        ].filter(function (x) { return x[0]; });
        var reason = {};
        cands.forEach(function (x) { reason[x[0]] = x[1]; });
        var pick = R.choices(ans, cands.map(function (x) { return x[0]; }));
        var lo = Math.max(0, i - 2);
        var hi = Math.min(25, i + 2);
        var seq = [];
        for (var k = lo; k <= hi; k++) seq.push(k === i || k === i + st ? '**' + L[k] + '**' : L[k]);
        return {
          type: 'choice', concept: 0,
          q: '알파벳 순서에서 **' + c + '** 바로 ' + side + '에 오는 대문자는 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === ans ? '' : reason[x]; }),
          explain: '알파벳 순서: ' + (lo > 0 ? '… ' : '') + seq.join(' ') + (hi < 25 ? ' …' : '') + '\n\n그래서 ' + c + ' 바로 ' + side + '에는 ' + ans + ga(ans) + ' 와요.',
        };
      },
    },
    {
      id: 'missing-letter',
      level: 2,
      title: '빈칸에 들어갈 대문자 쓰기',
      make: function (R) {
        var L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        function ga(ch) { return 'LMNR'.indexOf(ch) >= 0 ? '이' : '가'; }
        var s = R.int(0, 22);
        var pos = R.int(0, 3);
        var ans = L[s + pos];
        var shown = [];
        var full = [];
        for (var k = 0; k < 4; k++) {
          shown.push(k === pos ? '[[?]]' : L[s + k]);
          full.push(k === pos ? '**' + L[s + k] + '**' : L[s + k]);
        }
        var wrong = [];
        if (pos === 0 && s > 0) wrong.push({ a: L[s - 1], why: L[s - 1] + ' 다음에 ' + ans + ga(ans) + ' 있어요. 빈칸은 ' + L[s + 1] + ' 바로 앞 글자예요.' });
        if (pos === 3 && s + 4 <= 25) wrong.push({ a: L[s + 4], why: '한 칸을 더 갔어요. 빈칸은 ' + L[s + 2] + ' 바로 뒤 글자예요.' });
        return {
          type: 'short', check: 'text', concept: 0,
          q: '빈칸에 들어갈 대문자를 쓰세요.\n\n' + shown.join('  '),
          answer: [ans],
          hint: '보이는 글자부터 알파벳 순서를 소리 내어 말해 보세요.',
          wrong: wrong,
          explain: '알파벳 순서대로 쓰면 ' + full.join(' ') + ' 이므로 빈칸에는 ' + ans + ga(ans) + ' 들어가요.',
        };
      },
    },
    {
      id: 'nth-letter',
      level: 2,
      title: '몇 번째 대문자인지 세기',
      make: function (R) {
        var L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        function eun(ch) { return 'LMNR'.indexOf(ch) >= 0 ? '은' : '는'; }
        var n = R.int(5, 20);
        var ch = L[n - 1];
        var list = [];
        for (var k = 0; k < n; k++) list.push(k === n - 1 ? '**' + L[k] + '(' + (k + 1) + ')**' : L[k] + '(' + (k + 1) + ')');
        var counted = list.join(' ');
        if (R.bool()) {
          return {
            type: 'short', check: 'text', concept: 0,
            q: 'A부터 차례로 셀 때 ' + n + '번째 대문자를 쓰세요.',
            answer: [ch],
            hint: '7자 묶음(A~G, H~N, O~U)을 떠올리며 세어 보세요.',
            wrong: [
              { a: L[n - 2], why: '하나를 덜 셌어요. A를 1번째로 세어 다시 확인해 보세요.' },
              { a: L[n], why: '하나를 더 셌어요. A를 1번째로 세어 다시 확인해 보세요.' },
            ],
            explain: counted + '\n\n그래서 ' + n + '번째 대문자는 ' + ch + ('LMNR'.indexOf(ch) >= 0 ? '이에요' : '예요') + '.',
          };
        }
        return {
          type: 'short', check: 'number', unit: '번째', concept: 0,
          q: 'A부터 차례로 셀 때 **' + ch + '**' + eun(ch) + ' 몇 번째 대문자일까요?',
          answer: String(n),
          hint: '7자 묶음(A~G, H~N, O~U)을 떠올리며 세어 보세요.',
          wrong: [
            { a: String(n - 1), why: '하나를 덜 셌어요. A를 1번째로 세어 다시 확인해 보세요.' },
            { a: String(n + 1), why: '하나를 더 셌어요. A를 1번째로 세어 다시 확인해 보세요.' },
          ],
          explain: counted + '\n\n그래서 ' + ch + eun(ch) + ' ' + n + '번째 대문자예요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'BUS', m: '버스', ex: 'BUS STOP', exm: '버스 정류장' },
    { w: 'STOP', m: '멈추세요', ex: 'STOP HERE', exm: '여기서 멈추세요.' },
    { w: 'EXIT', m: '출구(나가는 곳)', ex: 'EXIT THIS WAY', exm: '나가는 곳은 이쪽이에요.' },
    { w: 'OPEN', m: '열려 있는(영업 중)', ex: 'WE ARE OPEN', exm: '영업 중이에요.' },
    { w: 'ZOO', m: '동물원', ex: 'CITY ZOO', exm: '시립 동물원' },
    { w: 'TAXI', m: '택시', ex: 'TAXI STAND', exm: '택시 타는 곳' },
    { w: 'SCHOOL', m: '학교', ex: 'SCHOOL ZONE', exm: '어린이 보호 구역(학교 앞)' },
    { w: 'TOILET', m: '화장실', ex: 'PUBLIC TOILET', exm: '공중화장실' },
  ],
});
