/* 5학년 영어 · 이야기 읽고 순서 파악하기
 * 이야기 세 편은 모두 이 단원을 위해 새로 쓴 글이다 (The Lost Kite, The Little Plant, A Rainy Saturday). */
(function () {
  var KITE = 'Minsu had a red kite. One windy day, he went to the park with his sister, Jia. The kite flew high in the sky. Suddenly, the string broke! The kite flew away. Minsu was very sad. Jia said, "Don\'t worry. Let\'s look for it." They looked behind the bench and under the slide. Finally, they found the kite in a big tree. Dad got it down with a long stick. Minsu smiled. "Thank you, Jia! Thank you, Dad!"';
  var PLANT = 'Sua planted a small seed in a pot. She watered it every morning. After a week, a tiny green leaf came out. Sua jumped with joy. One hot day, she forgot to water the plant. The next day, the leaf looked weak. Sua felt sorry. She gave it water right away and said, "I\'m sorry, little plant." The next morning, the leaf stood up again. Sua smiled.';
  var RAIN = 'Doyun wanted to play soccer with his friends. But it rained all morning. He looked out the window and sighed. Then his grandma gave him some paper. They made paper boats together. In the afternoon, the rain stopped. Doyun and his grandma put the boats in a puddle. The boats sailed! Doyun laughed.';

  var KITE_PIC = {
    type: 'svg',
    alt: '큰 나무의 가지 사이에 끈이 끊어진 연 하나가 걸려 있는 그림',
    svg: '<svg viewBox="0 0 240 200">' +
      '<rect x="105" y="110" width="30" height="80" rx="3" fill="var(--fig-3)" stroke="currentColor" stroke-width="2"/>' +
      '<circle cx="120" cy="80" r="62" fill="var(--fig-2)" fill-opacity="0.35" stroke="currentColor" stroke-width="2"/>' +
      '<polygon points="150,30 172,58 150,92 128,58" fill="var(--fig-1)" stroke="currentColor" stroke-width="2"/>' +
      '<line x1="150" y1="30" x2="150" y2="92" stroke="currentColor" stroke-width="1.5"/>' +
      '<line x1="128" y1="58" x2="172" y2="58" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M150 92 Q 160 110 150 125 Q 142 138 152 150" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>' +
      '<line x1="10" y1="190" x2="230" y2="190" stroke="currentColor" stroke-width="2"/>' +
      '</svg>',
  };

  // 생성기용 상황: [영어 상황(과거), 우리말 상황, 알맞은 마음, 묶음 +(좋은 마음)/-(힘든 마음)]
  var SITUATIONS = [
    ['found {his} lost puppy', '잃어버렸던 강아지를 찾았어요', 'happy', '+'],
    ['got a new bike for {his} birthday', '생일 선물로 새 자전거를 받았어요', 'happy', '+'],
    ['got a letter from {his} best friend', '가장 친한 친구에게서 편지를 받았어요', 'glad', '+'],
    ['packed {his} bag for a trip to the beach', '바닷가 여행을 가려고 가방을 쌌어요', 'excited', '+'],
    ['lost {his} favorite cap', '가장 아끼는 모자를 잃어버렸어요', 'sad', '-'],
    ['said goodbye to a friend who moved far away', '먼 곳으로 이사 가는 친구와 작별 인사를 했어요', 'sad', '-'],
    ['heard a strange noise in the dark', '어둠 속에서 이상한 소리를 들었어요', 'scared', '-'],
    ['had a big test the next day', '다음 날 중요한 시험이 있었어요', 'worried', '-'],
  ];
  var FEEL = {
    happy: ['+', '기쁜, 행복한'], glad: ['+', '기쁜, 반가운'], excited: ['+', '신이 난, 들뜬'],
    sad: ['-', '슬픈'], scared: ['-', '무서운, 겁이 난'], worried: ['-', '걱정되는'],
  };
  var KIDS = [['Minsu', 'he', 'his'], ['Seojun', 'he', 'his'], ['Doyun', 'he', 'his'], ['Jia', 'she', 'her'], ['Hayun', 'she', 'her'], ['Sua', 'she', 'her']];

  Tutor.registerUnit({
    id: 'eng-e5-12',
    course: 'eng-e5',
    title: '이야기 읽고 순서 파악하기',
    summary: '짧은 이야기를 소리 내어 읽고 중심 내용과 일이 일어난 순서를 파악하며 인물의 마음에 공감해요.',
    goals: [
      '제목과 그림을 보고 이야기 내용을 미리 짐작할 수 있어요.',
      '이야기의 중심 내용을 찾고, 일이 일어난 순서대로 사건을 정리할 수 있어요.',
      '인물의 말과 행동에서 마음을 알아내고 공감하는 말을 할 수 있어요.',
      '의미 단위로 끊어 읽고, 중요한 낱말에 힘을 주어 소리 내어 읽을 수 있어요.',
    ],
    standards: ['[6영01-09]', '[6영01-05]', '[6영01-06]', '[6영01-02]'],

    concepts: [
      {
        title: '제목과 그림으로 내용 짐작하기',
        body: '이야기를 읽기 전에 **제목**과 **그림**을 먼저 보면 무슨 이야기일지 짐작할 수 있어요. 짐작하고 읽으면 모르는 낱말이 나와도 뜻을 알아내기 쉬워요.\n\n예를 들어 제목이 **The Lost Kite** 이고, 그림에 나무에 걸린 연이 있다고 해 봐요.\n\n- lost 는 "잃어버린", kite 는 "연"이에요. → 연을 잃어버리는 이야기일 거예요.\n- 그림에서 연이 나무에 걸려 있어요. → 연이 날아가서 나무에 걸리는 일이 있을 거예요.\n\n> 💡 짐작은 틀려도 괜찮아요. 읽으면서 "내 짐작이 맞았나?" 하고 확인하는 것이 중요해요.',
        easy: '영화 포스터를 보고 "이건 모험 이야기겠다!" 하고 짐작해 본 적 있지요? 이야기 제목과 그림도 포스터와 같아요.\n\n제목에서 아는 낱말 하나만 찾아도 충분해요. **Kite** 를 알면 "연에 관한 이야기구나", **Lost** 를 알면 "무엇을 잃어버리는구나" 하고 생각할 수 있어요.',
        fig: KITE_PIC,
        check: {
          type: 'choice',
          q: '제목이 The Lost Kite 이고, 그림에 나무에 걸린 연이 있어요. 어떤 이야기일까요?',
          fig: KITE_PIC,
          choices: ['연을 잃어버렸다가 찾는 이야기', '연을 새로 사는 이야기', '나무를 심는 이야기'],
          answer: 0,
          why: [
            '',
            'lost 는 "잃어버린"이라는 뜻이에요. 새로 사는 이야기와는 거리가 멀어요.',
            '그림의 나무는 연이 걸린 곳이에요. 제목은 연(kite)에 관한 것이에요.',
          ],
          explain: 'lost(잃어버린) + kite(연), 그리고 나무에 걸린 연 그림을 보면 **연을 잃어버렸다가 찾는 이야기**라고 짐작할 수 있어요.',
        },
      },
      {
        title: '이야기의 중심 내용 찾기',
        body: '이야기의 **중심 내용**은 "누가, 무슨 일을 겪었고, 어떻게 되었는지"를 한두 문장으로 줄인 것이에요.\n\n**The Lost Kite**\n\n' + KITE + '\n\n- 누가: Minsu (와 Jia)\n- 무슨 일: 연줄이 끊어져 연이 날아갔어요.\n- 어떻게 되었나: 함께 찾아서 나무에서 연을 찾았어요.\n\n→ 중심 내용: **민수는 날아간 연을 지아와 함께 찾았어요.**\n\n> ⚠️ "민수의 연은 빨간색이었어요", "벤치 뒤를 찾아보았어요"처럼 한 문장에만 나오는 작은 내용은 중심 내용이 아니에요.',
        easy: '친구에게 이야기를 딱 한 문장으로 전해 준다고 생각해 보세요. "민수가 연을 잃어버렸는데, 지아랑 같이 찾아다니다가 결국 찾았대!"\n\n이렇게 **처음의 문제**(연이 날아감)와 **마지막에 어떻게 되었는지**(다시 찾음)를 이으면 중심 내용이 돼요.',
        check: {
          type: 'ox',
          q: 'The Lost Kite 의 중심 내용은 "민수의 연은 빨간색이었다."예요.',
          answer: false,
          explain: '연이 빨간색이라는 것은 작은 내용이에요. 중심 내용은 **민수가 날아간 연을 지아와 함께 찾았다**는 것이에요.',
        },
      },
      {
        title: '일이 일어난 순서 정리하기',
        body: '이야기는 보통 일이 일어난 차례대로 쓰여요. **순서를 알려 주는 말**에 표시하며 읽으면 사건을 정리하기 쉬워요.\n\n| 순서 말 | 뜻 |\n|---|---|\n| **One day** | 어느 날 |\n| **First** | 먼저, 처음에 |\n| **Then / Next** | 그다음에 |\n| **After that** | 그 후에 |\n| **Suddenly** | 갑자기 |\n| **The next morning** | 다음 날 아침 |\n| **Finally** | 마침내, 마지막으로 |\n\nThe Lost Kite 를 순서대로 정리하면 이래요.\n\n1. 민수와 지아가 공원에 갔어요. (One windy day)\n2. 연이 하늘 높이 날았어요.\n3. 갑자기 연줄이 끊어졌어요. (Suddenly)\n4. 벤치 뒤와 미끄럼틀 아래를 찾았어요.\n5. 마침내 큰 나무에서 연을 찾았어요. (Finally)\n6. 아빠가 긴 막대로 연을 내려 주셨어요.',
        easy: '이야기를 만화 네 칸으로 그린다고 생각해 보세요. 첫 칸에는 공원에 가는 장면, 다음 칸에는 연줄이 끊어지는 장면, 그다음 칸에는 연을 찾는 장면, 마지막 칸에는 나무에서 연을 내리는 장면이 들어가겠지요.\n\nOne day, Suddenly, Finally 같은 말은 "여기서 새 칸이 시작돼요!" 하고 알려 주는 표지판이에요.',
        check: {
          type: 'choice',
          q: '"마침내, 마지막으로"라는 뜻의 순서 말은 무엇일까요?',
          choices: ['Finally', 'Suddenly', 'One day'],
          answer: 0,
          why: [
            '',
            'Suddenly 는 "갑자기"예요.',
            'One day 는 "어느 날"이에요. 이야기를 시작할 때 자주 써요.',
          ],
          explain: '**Finally** 는 "마침내, 마지막으로"예요. 이야기의 끝부분에서 자주 나와요.',
        },
      },
      {
        title: '인물의 마음 알아내고 공감하기',
        body: '이야기 속 인물의 마음은 **마음을 나타내는 말**에 직접 나오기도 하고, **말과 행동**에 숨어 있기도 해요.\n\n| 마음 말 | 뜻 | 이런 행동이 단서예요 |\n|---|---|---|\n| **happy** | 기쁜, 행복한 | smiled(웃었다), laughed(소리 내어 웃었다) |\n| **excited** | 신이 난 | jumped with joy(기뻐서 펄쩍 뛰었다) |\n| **sad** | 슬픈 | cried(울었다) |\n| **worried** | 걱정되는 | 무슨 일이 생길까 봐 마음 졸여요 |\n| **scared** | 무서운 | 숨거나 떨어요 |\n| **sorry** | 미안한 | I\'m sorry. 라고 말해요 |\n\n- 연이 날아갔을 때 민수의 마음은 **sad**(슬픈)예요. 글에 Minsu was very sad. 라고 직접 나와요.\n- 마지막 장면에는 Minsu smiled. 가 나와요. 웃었으니 기쁜 마음이에요.\n\n인물의 마음을 알았다면 **공감하는 말**을 해 볼 수 있어요. 내 생각은 **I think ~.** 로 말해요.\n\n- I\'m sorry about your kite. (연 일은 안됐구나.)\n- I think Jia is kind. (지아는 친절한 것 같아요.)',
        easy: '친구 얼굴을 보면 기분을 알 수 있지요? 웃고 있으면 기쁜 거고, 울고 있으면 슬픈 거예요.\n\n이야기에서는 얼굴 대신 **행동 낱말**을 봐요. smiled(웃었다)가 나오면 기쁜 마음, cried(울었다)가 나오면 슬픈 마음이에요. 그리고 "나라면 어땠을까?" 하고 그 인물이 되어 보는 것이 공감이에요.',
        check: {
          type: 'choice',
          q: 'Sua jumped with joy. 에서 수아의 마음으로 알맞은 것은 무엇일까요?',
          choices: ['excited', 'sad', 'scared'],
          answer: 0,
          why: [
            '',
            '슬플 때는 기뻐서 펄쩍 뛰지 않아요. jumped with joy 는 "기뻐서 펄쩍 뛰었다"예요.',
            '무서울 때는 숨거나 떨어요. 기뻐서(with joy) 뛰었으니 신이 난 마음이에요.',
          ],
          explain: 'jumped with joy 는 "기뻐서 펄쩍 뛰었다"라는 뜻이에요. 그래서 수아는 **excited**(신이 난) 마음이에요.',
        },
      },
      {
        title: '의미 단위로 끊어 강세를 살려 읽기',
        body: '영어 이야기를 소리 내어 읽을 때는 한 낱말씩 끊지 말고 **뜻이 이어지는 덩어리(의미 단위)**로 끊어 읽어요. 빗금(/)이 잠깐 쉬는 곳이에요.\n\n- One windy day, / he went to the park / with his sister.\n- Finally, / they found the kite / in a big tree.\n\n**누가 무엇을 했는지**, **어디서**, **언제**가 각각 한 덩어리가 돼요. 쉼표(,)에서는 잠깐, 마침표(.)에서는 조금 더 쉬어요.\n\n**강세**도 살려요. 뜻을 전하는 중요한 낱말(kite, flew, high, sky 같은 이름·움직임·꾸미는 말)은 **더 힘주어 또렷하게**, a, the, to, and, in 같은 작은 낱말은 **약하고 짧게** 읽어요.\n\n- The **kite** **flew** **high** in the **sky**.\n\n> 💡 느낌표(!)가 있는 문장은 놀란 느낌을 살려 읽어요: Suddenly, the string broke!',
        easy: '말을 할 때 "나는-오늘-학교에-갔어요"처럼 한 낱말씩 뚝뚝 끊으면 로봇처럼 들리지요. "나는 오늘 / 학교에 갔어요"처럼 덩어리로 말해야 자연스러워요.\n\n영어도 같아요. 그리고 중요한 낱말은 손뼉을 치듯 크게, 작은 낱말(a, the)은 살짝 지나가듯 읽으면 영어다운 리듬이 생겨요.',
        check: {
          type: 'ox',
          q: '영어 문장을 소리 내어 읽을 때 a, the 같은 작은 낱말은 보통 가장 힘주어 읽어요.',
          answer: false,
          explain: 'a, the, to 같은 작은 낱말은 보통 **약하고 짧게** 읽어요. kite, flew, sky 처럼 뜻을 전하는 중요한 낱말을 힘주어 읽어요.',
        },
      },
    ],

    examples: [
      {
        q: '이야기를 읽고 일이 일어난 순서대로 정리해 보세요.\n\n**The Little Plant**\n\n' + PLANT,
        steps: [
          '순서를 알려 주는 말에 표시해요: After a week, One hot day, The next day, The next morning.',
          '처음: 수아가 화분에 작은 씨앗을 심고 아침마다 물을 주었어요.',
          'After a week: 작은 초록 잎이 나왔어요. 수아는 기뻐서 펄쩍 뛰었어요.',
          'One hot day → The next day: 수아가 물 주는 것을 잊었고, 다음 날 잎이 시들었어요.',
          '수아는 미안해하며 바로 물을 주었어요. The next morning: 잎이 다시 일어섰어요.',
        ],
        answer: '씨앗 심기 → 잎이 나옴 → 물 주기를 잊음 → 잎이 시듦 → 물을 줌 → 잎이 다시 일어섬',
      },
      {
        q: 'The Little Plant 에서 수아의 마음이 어떻게 바뀌었는지 찾아보세요.',
        steps: [
          '잎이 나왔을 때: Sua jumped with joy. → 신이 나고 기뻤어요(excited).',
          '잎이 시들었을 때: Sua felt sorry. → 식물에게 미안했어요(sorry).',
          '잎이 다시 일어섰을 때: Sua smiled. → 다시 기뻤어요(happy).',
        ],
        answer: '기쁨 → 미안함 → 다시 기쁨',
      },
    ],

    terms: [
      { term: '중심 내용', def: '이야기에서 "누가, 무슨 일을 겪었고, 어떻게 되었는지"를 짧게 줄인 가장 중요한 내용이에요.' },
      { term: '사건', def: '이야기 속에서 일어난 일이에요. 사건을 일어난 차례대로 늘어놓으면 이야기의 흐름이 보여요.' },
      { term: '순서를 알려 주는 말', def: 'One day(어느 날), Then(그다음에), Suddenly(갑자기), Finally(마침내)처럼 일이 일어난 차례를 알려 주는 말이에요.' },
      { term: '공감', def: '이야기 속 인물의 마음을 내 마음처럼 느끼고 이해하는 것이에요. 예: I\'m sorry about your kite.' },
      { term: '의미 단위', def: '뜻이 이어지는 말의 덩어리예요. 소리 내어 읽을 때 이 덩어리 사이에서 잠깐 쉬어요. 예: Finally, / they found the kite / in a big tree.' },
      { term: '강세', def: '낱말을 더 힘주어 또렷하게 읽는 것이에요. 문장에서는 뜻을 전하는 중요한 낱말에 강세를 두고, a, the 같은 작은 낱말은 약하게 읽어요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '제목이 The Lost Puppy 인 이야기는 어떤 내용일지 가장 알맞게 짐작한 것은 무엇일까요?',
        choices: ['강아지를 잃어버리는 이야기', '강아지를 새로 데려오는 이야기', '강아지가 상을 받는 이야기', '고양이를 기르는 이야기'],
        answer: 0,
        why: [
          '',
          'lost 는 "잃어버린"이에요. 새로 데려오는 것과는 거리가 멀어요.',
          '제목에 상(prize)에 대한 말은 없어요. lost 의 뜻을 떠올려 보세요.',
          'puppy 는 강아지예요. 고양이는 cat 이에요.',
        ],
        explain: 'lost(잃어버린) + puppy(강아지)이니 **강아지를 잃어버리는 이야기**라고 짐작할 수 있어요.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 2,
        q: 'Suddenly 는 "갑자기"라는 뜻이에요.',
        answer: true,
        explain: '**Suddenly** 는 "갑자기"예요. 이야기에서 뜻밖의 일이 일어날 때 자주 나와요: Suddenly, the string broke!',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 3,
        q: 'Minsu cried. 에서 민수의 마음으로 알맞은 것은 무엇일까요?',
        choices: ['sad', 'happy', 'excited', 'glad'],
        answer: 0,
        why: [
          '',
          'happy 는 기쁜 마음이에요. cried(울었다)와 어울리지 않아요.',
          'excited 는 신이 난 마음이에요. cried(울었다)와 어울리지 않아요.',
          'glad 는 기쁘고 반가운 마음이에요. cried(울었다)와 어울리지 않아요.',
        ],
        explain: 'cried 는 "울었다"예요. 울고 있으니 민수는 **sad**(슬픈) 마음이에요.',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'text', concept: 2,
        q: '"마침내, 마지막으로"라는 뜻의 순서 말을 한 낱말로 쓰세요.',
        answer: ['Finally', 'Lastly'],
        wrong: [
          { a: 'Suddenly', why: 'Suddenly 는 "갑자기"예요. "마침내"는 Finally 예요.' },
          { a: 'First', why: 'First 는 "먼저, 처음에"예요. 마지막을 알리는 말은 Finally 예요.' },
        ],
        explain: '"마침내, 마지막으로"는 **Finally** 예요. (Lastly 도 "마지막으로"라는 뜻이에요.)',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 4,
        q: '의미 단위로 가장 자연스럽게 끊어 읽은 것은 무엇일까요? (/ 는 잠깐 쉬는 곳)',
        choices: [
          'Finally, / they found the kite / in a big tree.',
          'Finally, they / found the / kite in a / big tree.',
          'Finally, they found / the kite in / a big / tree.',
          'Finally / they / found / the / kite / in / a / big / tree.',
        ],
        answer: 0,
        why: [
          '',
          'they found(그들이 찾았다), the kite(그 연)처럼 붙어 있어야 할 말을 갈라 놓았어요.',
          'found 와 the kite(그 연)를 갈라 놓았고, in a big tree(큰 나무에서)도 한 덩어리인데 세 조각으로 나누었어요.',
          '한 낱말씩 끊으면 로봇처럼 들리고 뜻이 잘 전해지지 않아요.',
        ],
        explain: '**언제(Finally)** / **누가 무엇을 했나(they found the kite)** / **어디서(in a big tree)** 로 끊어 읽으면 뜻이 잘 전해져요.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: 'The kite flew high in the sky. 를 소리 내어 읽을 때 보통 **약하게** 읽는 낱말은 무엇일까요?',
        choices: ['the', 'kite', 'flew', 'sky'],
        answer: 0,
        why: [
          '',
          'kite(연)는 무엇이 날았는지 알려 주는 중요한 낱말이라 힘주어 읽어요.',
          'flew(날았다)는 무슨 일이 일어났는지 알려 주는 중요한 낱말이라 힘주어 읽어요.',
          'sky(하늘)는 어디인지 알려 주는 중요한 낱말이라 힘주어 읽어요.',
        ],
        explain: '**the** 처럼 작은 낱말은 약하고 짧게 읽어요. kite, flew, high, sky 처럼 뜻을 전하는 낱말에 힘을 줘요.',
      },
      {
        id: 'p7', level: 2, type: 'order', concept: 2,
        q: '이야기를 읽고, 일이 일어난 순서대로 놓으세요.\n\n' + KITE,
        choices: ['The string broke.', 'Minsu and Jia went to the park.', 'They found the kite in a big tree.', 'Dad got the kite down.'],
        answer: [1, 0, 2, 3],
        hint: 'One windy day, Suddenly, Finally 같은 순서 말을 찾아보세요.',
        explain: '공원에 갔어요(One windy day) → 갑자기 연줄이 끊어졌어요(Suddenly) → 마침내 나무에서 연을 찾았어요(Finally) → 아빠가 연을 내려 주셨어요.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '이야기를 읽고 물음에 답하세요.\n\n' + PLANT + '\n\nWhy did the leaf look weak?',
        choices: ['Sua forgot to water it.', 'It rained too much.', 'Sua gave it too much water.', 'The pot was too small.'],
        answer: 0,
        why: [
          '',
          '비가 왔다는 말은 없어요. 더운 날(One hot day)이었어요.',
          '물을 너무 많이 준 것이 아니라, 물 주는 것을 잊었어요(forgot to water).',
          '화분 크기에 대한 말은 이야기에 없어요.',
        ],
        hint: 'The next day, the leaf looked weak. 바로 앞 문장을 보세요.',
        explain: '바로 앞 문장 One hot day, she forgot to water the plant. 에서 이유를 알 수 있어요. 수아가 **물 주는 것을 잊었기** 때문이에요.',
      },
      {
        id: 'p9', level: 2, type: 'order', concept: 2,
        q: '이야기를 읽고, 일이 일어난 순서대로 놓으세요.\n\n' + PLANT,
        choices: ['A tiny green leaf came out.', 'Sua planted a seed.', 'The leaf stood up again.', 'Sua forgot to water the plant.'],
        answer: [1, 0, 3, 2],
        hint: 'After a week, One hot day, The next morning 의 차례를 따라가 보세요.',
        explain: '씨앗을 심었어요 → 일주일 뒤 잎이 나왔어요(After a week) → 더운 날 물 주기를 잊었어요(One hot day) → 다음 날 아침 잎이 다시 일어섰어요(The next morning).',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 1,
        q: '이야기를 읽고 중심 내용으로 가장 알맞은 것을 고르세요.\n\n' + PLANT,
        choices: [
          '수아는 씨앗을 심어 기르다가 물 주기를 잊었지만, 다시 돌보아 식물을 살렸어요.',
          '수아는 아침마다 물을 마셨어요.',
          '수아는 화분을 사러 꽃집에 갔어요.',
          '수아는 더운 날을 좋아해요.',
        ],
        answer: 0,
        why: [
          '',
          '물을 준(watered) 것은 식물이에요. 또 이것은 작은 내용이에요.',
          '꽃집에 간 이야기는 나오지 않아요.',
          '더운 날은 사건이 일어난 때일 뿐, 수아가 좋아한다는 말은 없어요.',
        ],
        hint: '누가, 무슨 일을 겪었고, 어떻게 되었는지를 한 문장에 담은 것을 고르세요.',
        explain: '누가(수아) + 무슨 일(물 주기를 잊어 잎이 시듦) + 어떻게 되었나(다시 돌보아 잎이 일어섬)를 모두 담은 첫 번째 문장이 **중심 내용**이에요.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 3,
        q: '연이 날아가서 슬퍼하는 민수에게 **공감하는** 말로 가장 알맞은 것은 무엇일까요?',
        choices: ["I'm sorry about your kite.", 'Your kite is not pretty.', 'I like rainy days.', 'Good job!'],
        answer: 0,
        why: [
          '',
          '슬퍼하는 친구의 연을 깎아내리는 말이에요. 친구의 마음이 더 아파요.',
          '민수의 일과 관계없는 말이에요.',
          '"잘했어!"는 칭찬하는 말이에요. 슬퍼하는 친구에게 어울리지 않아요.',
        ],
        explain: '**I\'m sorry about your kite.**(연 일은 정말 안됐구나.)는 민수의 슬픈 마음을 알아주는 말이에요.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '이야기를 읽고 물음에 답하세요.\n\n' + PLANT + '\n\nHow did Sua feel at the end of the story?',
        choices: ['happy', 'sad', 'scared', 'worried'],
        answer: 0,
        why: [
          '',
          '잎이 시들었을 때는 미안했지만, 마지막에는 잎이 다시 일어섰어요.',
          '무서워할 일은 이야기에 나오지 않아요.',
          '마지막에는 잎이 다시 일어서서 걱정할 일이 없어졌어요.',
        ],
        hint: '마지막 문장에서 수아가 한 행동을 보세요.',
        explain: '마지막 문장 Sua smiled.(수아는 미소 지었어요.)를 보면 수아는 **happy**(기쁜) 마음이에요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'order', concept: 2,
        q: '이야기를 읽고, 일이 일어난 순서대로 놓으세요.\n\n**A Rainy Saturday**\n\n' + RAIN,
        choices: ['It rained all morning.', 'Doyun and Grandma made paper boats.', 'The rain stopped.', 'The boats sailed in a puddle.', 'Grandma gave Doyun some paper.'],
        answer: [0, 4, 1, 2, 3],
        hint: 'Then, In the afternoon 같은 말을 찾고, 종이를 받아야 배를 접을 수 있다는 것도 생각해 보세요.',
        explain: '아침 내내 비가 왔어요 → 그때(Then) 할머니가 종이를 주셨어요 → 함께 종이배를 접었어요 → 오후에(In the afternoon) 비가 그쳤어요 → 웅덩이에서 배가 떠갔어요.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 3,
        q: '이야기를 읽고, 도윤이의 마음이 어떻게 바뀌었는지 고르세요.\n\n' + RAIN,
        choices: ['아쉬움 → 즐거움', '즐거움 → 아쉬움', '무서움 → 슬픔', '걱정 → 화남'],
        fixed: true,
        answer: 0,
        why: [
          '',
          '거꾸로예요. 처음에 한숨을 쉬었고(sighed), 마지막에 소리 내어 웃었어요(laughed).',
          '무서워할 일은 나오지 않고, 마지막에 도윤이는 웃었어요.',
          '화가 났다는 말은 없어요. 마지막에 도윤이는 웃었어요.',
        ],
        hint: '처음의 sighed(한숨을 쉬었다)와 마지막의 laughed(소리 내어 웃었다)를 비교해 보세요.',
        explain: '축구를 하고 싶었는데 비가 와서 한숨을 쉬었으니(sighed) 처음에는 **아쉬운** 마음이에요. 할머니와 종이배를 띄우고 소리 내어 웃었으니(laughed) 마지막에는 **즐거운** 마음이에요.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 0,
        q: '글을 읽고, 다음에 일어날 일로 가장 알맞은 것을 고르세요.\n\nHayun woke up late. She looked at the clock. It was 8:50! Her school starts at 9:00.',
        choices: ['하윤이는 서둘러 학교에 가요.', '하윤이는 저녁을 먹어요.', '하윤이는 시계를 사러 가요.', '하윤이는 바닷가로 여행을 떠나요.'],
        answer: 0,
        why: [
          '',
          '지금은 아침이에요. 저녁을 먹을 때가 아니에요.',
          '시계는 이미 보았어요. 시계를 살 까닭이 없어요.',
          '학교 갈 시간이 10분밖에 남지 않았어요. 여행 이야기는 나오지 않아요.',
        ],
        hint: '지금 시각과 학교가 시작하는 시각을 비교해 보세요.',
        explain: '하윤이는 늦게 일어났고(woke up late), 학교 시작까지 10분밖에 남지 않았어요. 그래서 **서둘러 학교에 갈 것**이라고 짐작할 수 있어요.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 들어갈 순서 말을 쓰세요. (한 낱말 또는 두 낱말)\n\nJia fed her cat in the morning. [[blank]], she walked to school. Finally, she arrived at school and said hello to her friends.',
        answer: ['Then', 'Next', 'After that', 'And then', 'Later', 'Afterward', 'Afterwards'],
        wrong: [
          { a: 'Suddenly', why: 'Suddenly 는 뜻밖의 일이 "갑자기" 일어날 때 써요. 학교에 걸어가는 것은 차례대로 하는 일이라 Then 이 알맞아요.' },
          { a: 'Finally', why: 'Finally 는 맨 마지막 일에 써요. 이 글에는 뒤에 마지막 일이 따로 나와요.' },
          { a: 'First', why: 'First 는 맨 처음 일에 써요. 고양이 밥을 준 일이 먼저 있었어요.' },
        ],
        hint: '고양이 밥 주기 → (빈칸) 학교에 걸어감 → (Finally) 학교에 도착. 가운데에 오는 순서 말이에요.',
        explain: '처음 일 다음에 이어지는 일이므로 **Then**(그다음에)이 알맞아요. Next, After that 도 정답이에요.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 4,
        q: '의미 단위로 가장 자연스럽게 끊어 읽은 것은 무엇일까요? (/ 는 잠깐 쉬는 곳)',
        choices: [
          'After a week, / a tiny green leaf / came out.',
          'After a / week, a tiny / green leaf came / out.',
          'After a week, a tiny / green / leaf came out.',
          'After / a week, a / tiny green leaf / came out.',
        ],
        answer: 0,
        why: [
          '',
          'After a week(일주일 뒤)를 둘로 나누었어요. 언제를 나타내는 말은 한 덩어리예요.',
          'a tiny green leaf(작은 초록 잎)는 한 덩어리인데 셋으로 나누었어요.',
          'After a week(일주일 뒤)와 a tiny green leaf(작은 초록 잎)를 엉뚱한 곳에서 끊었어요.',
        ],
        hint: '언제 / 무엇이 / 어떻게 되었나 의 세 덩어리를 찾아보세요.',
        explain: '**언제(After a week)** / **무엇이(a tiny green leaf)** / **어떻게 되었나(came out)** 로 끊어 읽어요.',
      },
      {
        id: 'a6', level: 3, type: 'choice', concept: 1,
        q: '이야기를 읽고, 이야기에 가장 알맞은 제목을 고르세요.\n\n' + RAIN,
        choices: ['A Fun Rainy Day', 'The Big Soccer Game', "Grandma's Garden", 'My New Soccer Ball'],
        answer: 0,
        why: [
          '',
          '도윤이는 비 때문에 축구를 하지 못했어요. 축구 경기는 나오지 않아요.',
          '할머니의 정원 이야기는 나오지 않아요.',
          '새 축구공을 받는 이야기는 나오지 않아요.',
        ],
        hint: '제목은 이야기의 중심 내용을 짧게 나타내요.',
        explain: '비 오는 날 할머니와 종이배를 만들어 즐겁게 보낸 이야기이므로 **A Fun Rainy Day**(즐거운 비 오는 날)가 가장 알맞아요.',
      },
    ],

    deeper: [
      {
        title: '이야기의 짜임: 처음 - 가운데 - 끝',
        body: '짧은 이야기도 대부분 세 부분으로 짜여 있어요.\n\n- **처음**: 누가, 언제, 어디에 있는지 알려 줘요. (Minsu had a red kite. One windy day, he went to the park.)\n- **가운데**: 문제가 생기고 해결하려고 애써요. (The string broke! They looked for the kite.)\n- **끝**: 문제가 풀리고 인물의 마음이 바뀌어요. (They found the kite. Minsu smiled.)\n\n이 짜임을 알면 처음 읽는 이야기도 "지금 문제가 생겼구나", "곧 해결되겠구나" 하고 따라가기 쉬워요. 6학년에서는 이야기와 함께 영어 시도 읽으며 이런 짜임과 리듬을 더 즐겨 봐요.',
      },
      {
        title: '영어의 리듬: 힘주는 낱말과 지나가는 낱말',
        body: '영어는 중요한 낱말을 힘주어 읽고, 작은 낱말은 빠르게 지나가요. 그래서 문장에 낱말 수가 달라도 힘주는 낱말 수가 같으면 읽는 시간이 비슷하게 느껴져요.\n\n- **CATS** **EAT** **FISH**.\n- The **CATS** will **EAT** the **FISH**.\n\n두 문장 모두 힘주는 낱말이 세 개(CATS, EAT, FISH)라서 손뼉을 세 번 치며 읽을 수 있어요. 두 번째 문장의 the, will 은 힘주는 낱말 사이에 살짝 끼워 읽어요. 이야기를 소리 내어 읽을 때 손뼉 리듬을 떠올려 보세요.',
      },
    ],

    faq: [
      {
        q: '모르는 낱말이 나오면 어떻게 해요?',
        a: '먼저 멈추지 말고 끝까지 읽어 보세요. 앞뒤 문장과 그림을 보면 뜻을 짐작할 수 있는 경우가 많아요. 예를 들어 The leaf looked weak. 에서 weak 를 몰라도, 바로 앞에 물을 주지 않았다는 말이 있으니 "시들었다, 힘이 없다"는 뜻이라고 짐작할 수 있어요.',
      },
      {
        q: '순서 말이 없는 이야기는 순서를 어떻게 알아요?',
        a: '이야기는 대부분 일이 일어난 차례대로 쓰여 있어요. 그래서 문장 차례를 따라가면 돼요. 또 "종이를 받아야 배를 접을 수 있다"처럼 앞뒤가 바뀔 수 없는 일을 찾아 보면 순서를 확인할 수 있어요.',
      },
      {
        q: '중심 내용이랑 제목은 같은 거예요?',
        a: '아주 가까운 사이예요. 제목은 중심 내용을 몇 낱말로 아주 짧게 나타낸 것이에요. 중심 내용이 "도윤이는 비 오는 날 할머니와 종이배를 띄우며 즐겁게 보냈다"라면, 제목은 A Fun Rainy Day 처럼 줄여서 지을 수 있어요.',
      },
      {
        q: '소리 내어 읽을 때 어디서 쉬어야 해요?',
        a: '쉼표(,)와 마침표(.)에서 쉬고, 문장 안에서는 뜻이 이어지는 덩어리 사이에서 잠깐 쉬어요. "언제 / 누가 무엇을 했나 / 어디서"처럼 나누어 보면 쉬는 곳을 찾기 쉬워요.',
      },
    ],

    mistakes: [
      '작은 내용을 중심 내용으로 고르는 실수 — "연은 빨간색이었다"는 한 문장에만 나오는 내용이에요. 이야기 전체를 묶는 내용을 찾아요.',
      '문장이 나온 차례와 일이 일어난 차례를 늘 같다고 생각하는 실수 — Before that(그 전에) 같은 말이 나오면 앞의 일이 나중에 쓰인 거예요. 순서 말을 꼭 확인해요.',
      '한 낱말씩 끊어 읽는 실수 — Finally, / they found the kite / in a big tree. 처럼 뜻의 덩어리로 읽어요.',
    ],

    gens: [
      {
        id: 'feeling',
        level: 1,
        title: '상황에 알맞은 마음 고르기',
        make: function (R) {
          var k = R.pick(KIDS);
          var s = R.pick(SITUATIONS);
          var sit = s[0].replace('{his}', k[2]);
          var correct = s[2];
          var wrongs = Object.keys(FEEL).filter(function (f) { return FEEL[f][0] !== s[3]; });
          var pick = R.choices(correct, R.shuffle(wrongs));
          var mood = s[3] === '+' ? '좋은 일이 생겼을 때의 마음과 거리가 멀어요.' : '속상하거나 걱정스러운 일이 생겼을 때의 마음과 거리가 멀어요.';
          return {
            type: 'choice', concept: 3,
            q: '글을 읽고 인물의 마음으로 가장 알맞은 것을 고르세요.\n\n' + k[0] + ' ' + sit + '. How did ' + k[1] + ' feel?\n\n(뜻: ' + s[1] + '.)',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : c + '(' + FEEL[c][1] + ') — ' + mood; }),
            explain: s[1] + '. 이럴 때는 ' + correct + '(' + FEEL[correct][1] + ') 마음이 들어요. → **' + k[0] + ' felt ' + correct + '.**',
          };
        },
      },
    ],

    vocab: [
      { w: 'story', m: '이야기', ex: 'My grandpa tells me a story every night.', exm: '할아버지는 밤마다 나에게 이야기를 들려주세요.' },
      { w: 'title', m: '제목', ex: 'The title of this book is very funny.', exm: '이 책의 제목은 아주 재미있어요.' },
      { w: 'kite', m: '연', ex: 'We fly a kite on windy days.', exm: '우리는 바람 부는 날에 연을 날려요.' },
      { w: 'string', m: '끈, 줄', ex: 'Hold the string tightly.', exm: '줄을 꽉 잡으세요.' },
      { w: 'suddenly', m: '갑자기', ex: 'Suddenly, the lights went out.', exm: '갑자기 불이 꺼졌어요.' },
      { w: 'finally', m: '마침내, 마지막으로', ex: 'Finally, I finished my homework.', exm: '마침내 나는 숙제를 끝냈어요.' },
      { w: 'look for', m: '~을 찾다', ex: 'I am looking for my pencil case.', exm: '나는 필통을 찾고 있어요.' },
      { w: 'find', m: '찾아내다 (지난 일: found)', ex: 'I found my cap under the bed.', exm: '나는 침대 밑에서 모자를 찾았어요.' },
      { w: 'smile', m: '미소 짓다', ex: 'The baby smiled at me.', exm: '아기가 나를 보고 방긋 웃었어요.' },
      { w: 'laugh', m: '소리 내어 웃다', ex: 'We laughed at the funny clown.', exm: '우리는 웃긴 광대를 보고 깔깔 웃었어요.' },
      { w: 'seed', m: '씨앗', ex: 'I planted a sunflower seed.', exm: '나는 해바라기 씨앗을 심었어요.' },
      { w: 'forget', m: '잊다 (지난 일: forgot)', ex: 'Don\'t forget your umbrella.', exm: '우산 잊지 마세요.' },
      { w: 'excited', m: '신이 난, 들뜬', ex: 'I am excited about the school trip.', exm: '나는 현장 체험 학습 때문에 신이 나요.' },
      { w: 'worried', m: '걱정되는', ex: 'Mom was worried because I came home late.', exm: '내가 늦게 와서 엄마가 걱정하셨어요.' },
      { w: 'scared', m: '무서운, 겁이 난', ex: 'My little brother is scared of the dark.', exm: '내 남동생은 어둠을 무서워해요.' },
      { w: 'sorry', m: '미안한; 안된, 안타까운', ex: 'I\'m sorry I broke your crayon.', exm: '네 크레용을 부러뜨려서 미안해.' },
    ],
  });
})();
