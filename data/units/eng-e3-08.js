/* 3학년 영어 · 좋아하는 것 말하기
 * I like ~. / I don't like ~. / Do you like ~? – Yes, I do. / No, I don't. 와 음식·동물 낱말 */
(function () {
  // 생성기용: [영어(좋아한다고 말할 때 모양), 뜻]
  var THINGS = [
    ['grapes', '포도'], ['apples', '사과'], ['bananas', '바나나'], ['carrots', '당근'], ['milk', '우유'],
    ['cats', '고양이'], ['dogs', '개'], ['tigers', '호랑이'], ['snakes', '뱀'], ['rabbits', '토끼'],
  ];

  Tutor.registerUnit({
    id: 'eng-e3-08',
    course: 'eng-e3',
    title: '좋아하는 것 말하기',
    summary: 'I like ~.와 I don\'t like ~.로 좋아하는 것과 싫어하는 것을 말하고 Do you like ~?로 물어요.',
    goals: [
      'I like ~.로 좋아하는 것을 말할 수 있어요.',
      'I don\'t like ~.로 좋아하지 않는 것을 말할 수 있어요.',
      'Do you like ~?로 묻고 Yes, I do. / No, I don\'t.로 대답할 수 있어요.',
      '음식과 동물을 나타내는 낱말을 알아요.',
    ],
    standards: ['[4영02-08]', '[4영01-06]', '[4영02-04]'],

    concepts: [
      {
        title: '좋아하는 것 말하기: I like ~.',
        body: '좋아하는 것을 말할 때는 **I like** 뒤에 좋아하는 것을 써요.\n\n- **I like** grapes. (나는 포도를 좋아해요.)\n- **I like** dogs. (나는 개를 좋아해요.)\n- **I like** milk. (나는 우유를 좋아해요.)\n\n**like**는 "좋아하다"라는 뜻이에요. 우리말은 "포도를 좋아해요"처럼 좋아하는 것이 앞에 오지만, 영어는 **I like**가 먼저 오고 좋아하는 것이 뒤에 와요.\n\n> 💡 과일이나 동물을 "그런 것 모두" 좋아한다고 말할 때는 보통 끝에 -s를 붙여요(grapes, dogs). milk처럼 셀 수 없는 것은 -s를 붙이지 않아요.',
        easy: '"I like"는 "나는 ~이 좋아!"라는 마법 주문이에요. 주문 뒤에 좋아하는 것만 바꿔 넣으면 돼요.\n\nI like … bananas! / I like … cats! / I like … milk!\n\n좋아하는 것을 하나씩 떠올리며 소리 내어 말해 보세요.',
        check: {
          type: 'choice',
          q: '"나는 개를 좋아해요."를 영어로 바르게 말한 것은 무엇일까요?',
          choices: ['I like dogs.', 'I dogs like.', 'Like I dogs.'],
          answer: 0,
          why: ['', '영어는 I like가 먼저 오고, 좋아하는 것(dogs)이 맨 뒤에 와요.', '나(I)가 맨 앞에 와요. I like 순서로 말해요.'],
          explain: 'I like 뒤에 좋아하는 것을 써요. 그래서 I like dogs.예요.',
        },
      },
      {
        title: '좋아하지 않는 것 말하기: I don\'t like ~.',
        body: '좋아하지 않는 것을 말할 때는 like 앞에 **don\'t**를 넣어요.\n\n- I **don\'t** like snakes. (나는 뱀을 좋아하지 않아요.)\n- I **don\'t** like carrots. (나는 당근을 좋아하지 않아요.)\n\n**don\'t**는 **do not**을 줄인 말이에요. I do not like snakes.라고 해도 뜻은 같아요. 말할 때는 줄인 말 don\'t를 더 자주 써요.\n\n> ⚠️ "아니"라는 뜻으로 no를 넣어 I no like snakes.라고 하지 않아요. like 앞에는 don\'t를 써요.',
        easy: 'I like 사이에 "싫어 버튼" don\'t를 끼워 넣는다고 생각해 보세요.\n\nI like snakes. (좋아해요) → I **don\'t** like snakes. (좋아하지 않아요)\n\n버튼 하나로 뜻이 반대가 돼요.',
        check: {
          type: 'ox',
          q: '**I don\'t like carrots.**는 "나는 당근을 좋아해요."라는 뜻이에요.',
          answer: false,
          explain: 'don\'t가 들어가면 "좋아하지 않아요"가 돼요. I don\'t like carrots.는 "나는 당근을 좋아하지 않아요."예요.',
        },
      },
      {
        title: '좋아하는지 묻고 답하기: Do you like ~?',
        body: '상대가 좋아하는지 물을 때는 **Do you like ~?**라고 해요.\n\nA: **Do you like** carrots? (너는 당근을 좋아하니?)\nB: **Yes, I do.** (응, 좋아해.)\nB: **No, I don\'t.** (아니, 좋아하지 않아.)\n\n대답할 때는 like와 좋아하는 것을 다시 말하지 않고 짧게 **Yes, I do.** 또는 **No, I don\'t.**라고 해요.\n\n> ⚠️ Yes, I like.라고 대답하지 않아요. 좋아하면 Yes, I do.예요.\n\n> 💡 Yes 뒤에는 do, No 뒤에는 don\'t가 짝이에요.',
        easy: '질문이 Do로 시작했으니 대답도 do로 해요.\n\n- 좋아하면 → Yes, I **do**.\n- 좋아하지 않으면 → No, I **don\'t**.\n\nYes와 do, No와 don\'t를 짝꿍으로 기억하세요.',
        check: {
          type: 'choice',
          q: 'A: Do you like tigers?\nB: [[대답]]\n\nB는 호랑이를 좋아해요. 알맞은 대답은 무엇일까요?',
          choices: ['Yes, I do.', 'No, I don\'t.', 'Yes, I like.'],
          answer: 0,
          why: ['', 'B는 호랑이를 좋아하니 Yes로 대답해요.', 'Yes, I like.라고 하지 않아요. Yes 뒤에는 I do를 써요.'],
          explain: '좋아할 때는 Yes, I do.라고 짧게 대답해요.',
        },
      },
      {
        title: '음식과 동물 낱말',
        body: '좋아하는 것을 말할 때 자주 쓰는 낱말이에요. 좋아한다고 말할 때 쓰는 모양(-s를 붙인 모양)도 함께 봐 두세요.\n\n| 낱말 | 뜻 | 좋아한다고 말할 때 |\n|---|---|---|\n| apple | 사과 | I like apple**s**. |\n| grape | 포도 | I like grape**s**. |\n| banana | 바나나 | I like banana**s**. |\n| carrot | 당근 | I like carrot**s**. |\n| milk | 우유 | I like milk. |\n| cat | 고양이 | I like cat**s**. |\n| dog | 개 | I like dog**s**. |\n| tiger | 호랑이 | I like tiger**s**. |\n\n> 💡 milk는 한 개, 두 개로 세지 않아서 -s를 붙이지 않아요.',
        easy: '과일 가게와 동물원을 떠올려 보세요.\n\n과일 가게에는 apple(사과), grape(포도), banana(바나나), 채소 칸에는 carrot(당근), 냉장고에는 milk(우유)가 있어요. 동물원에는 tiger(호랑이)가 있고, 집에는 cat(고양이), dog(개)가 있지요.',
        check: {
          type: 'choice',
          q: '**carrot**의 뜻은 무엇일까요?',
          choices: ['당근', '포도', '호랑이'],
          answer: 0,
          why: ['', '포도는 grape예요.', '호랑이는 tiger예요.'],
          explain: 'carrot은 당근이에요. 당근을 좋아한다고 말할 때는 I like carrots.예요.',
        },
      },
    ],

    examples: [
      {
        q: '친구에게 바나나를 좋아하는지 묻고, 친구가 좋아하지 않는다고 대답하는 대화를 만들어 보세요.',
        steps: [
          '좋아하는지 물을 때는 Do you like ~?를 써요. 바나나는 bananas로 써요.',
          '그래서 묻는 말은 Do you like bananas?예요.',
          '좋아하지 않으면 No로 대답하고, No와 짝인 don\'t를 써요.',
          '대답은 No, I don\'t.예요. 더 말하고 싶으면 I don\'t like bananas.를 덧붙여도 돼요.',
        ],
        answer: 'A: **Do you like bananas?**\nB: **No, I don\'t.**',
      },
      {
        q: '"나는 고양이를 좋아하지만, 호랑이는 좋아하지 않아요."를 두 문장으로 말해 보세요.',
        steps: [
          '좋아하는 것: I like 뒤에 cats를 써요. → I like cats.',
          '좋아하지 않는 것: like 앞에 don\'t를 넣고 tigers를 써요. → I don\'t like tigers.',
        ],
        answer: '**I like cats. I don\'t like tigers.**',
      },
    ],

    terms: [
      { term: 'like', def: '"좋아하다"라는 뜻이에요. 예: I like grapes. (나는 포도를 좋아해요.)' },
      { term: 'don\'t', def: 'do not을 줄인 말이에요. like 앞에 넣으면 "좋아하지 않아요"가 돼요. 예: I don\'t like snakes.' },
      { term: 'Do you like ~?', def: '"너는 ~을 좋아하니?"라고 묻는 말이에요. Yes, I do. 또는 No, I don\'t.로 대답해요.' },
      { term: '줄인 말', def: '두 낱말을 하나로 줄여 쓴 말이에요. 빠진 글자 자리에 \' 표시를 해요. 예: do not → don\'t' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '"나는 포도를 좋아해요."를 영어로 바르게 말한 것은 무엇일까요?',
        choices: ['I like grapes.', 'I don\'t like grapes.', 'Do you like grapes?', 'I like carrots.'],
        answer: 0,
        why: [
          '',
          'don\'t가 들어가면 "좋아하지 않아요"가 돼요.',
          '이것은 "너는 포도를 좋아하니?"라고 묻는 말이에요.',
          'carrots는 당근이에요. 포도는 grapes예요.',
        ],
        explain: 'I like 뒤에 좋아하는 것(grapes)을 써요. 그래서 I like grapes.예요.',
      },
      {
        id: 'p2', level: 1, type: 'short', concept: 2,
        q: '빈칸에 알맞은 말을 쓰세요.\n\nA: Do you like snakes?\nB: No, I [[don\'t]].',
        answer: ['don\'t', 'do not'],
        wrong: [
          { a: 'do', why: 'No로 대답할 때는 don\'t를 써요. Yes, I do. / No, I don\'t.' },
          { a: 'like', why: '대답할 때는 like를 다시 쓰지 않아요. No 뒤에는 I don\'t를 써요.' },
        ],
        explain: '좋아하지 않을 때는 No, I don\'t.라고 대답해요. don\'t는 do not을 줄인 말이에요.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 2,
        q: 'Do you like dogs?라고 물었을 때, 개를 좋아하면 **Yes, I do.**라고 대답해요.',
        answer: true,
        explain: '맞아요. 좋아하면 Yes, I do., 좋아하지 않으면 No, I don\'t.라고 대답해요.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '**I don\'t like milk.**의 뜻으로 알맞은 것은 무엇일까요?',
        choices: ['나는 우유를 좋아하지 않아요.', '나는 우유를 좋아해요.', '너는 우유를 좋아하니?', '나는 우유가 없어요.'],
        answer: 0,
        why: [
          '',
          'don\'t가 있으면 "좋아하지 않아요"예요.',
          '묻는 말은 Do you like milk?처럼 Do로 시작해요.',
          '"없다"라는 말이 아니에요. like는 "좋아하다"예요.',
        ],
        explain: 'don\'t like는 "좋아하지 않다"예요. I don\'t like milk.는 "나는 우유를 좋아하지 않아요."예요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '**tiger**의 뜻은 무엇일까요?',
        choices: ['호랑이', '고양이', '바나나', '토끼'],
        answer: 0,
        why: ['', '고양이는 cat이에요.', '바나나는 banana예요.', '토끼는 rabbit이에요.'],
        explain: 'tiger는 호랑이예요. 호랑이를 좋아하면 I like tigers.라고 해요.',
      },
      {
        id: 'p6', level: 1, type: 'short', concept: 0,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nI [[like]] bananas. (나는 바나나를 좋아해요.)',
        answer: ['like'],
        wrong: [
          { a: 'likes', why: 'I 뒤에는 like를 그대로 써요. -s를 붙이지 않아요.' },
          { a: 'love', why: 'love는 "아주 좋아하다, 사랑하다"예요. 이 단원에서 배운 "좋아하다"는 like예요.' },
        ],
        explain: '"좋아하다"는 like예요. I like bananas.는 "나는 바나나를 좋아해요."예요.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 1,
        q: '"나는 뱀을 좋아하지 않아요."를 영어로 바르게 말한 것은 무엇일까요?',
        choices: ['I don\'t like snakes.', 'I no like snakes.', 'I like snakes.', 'I don\'t snakes like.'],
        answer: 0,
        why: [
          '',
          'no를 넣지 않아요. like 앞에는 don\'t를 써요.',
          'don\'t가 없으면 "좋아해요"라는 뜻이 돼요.',
          '좋아하는 것(snakes)은 like 뒤에 와요.',
        ],
        explain: 'like 앞에 don\'t를 넣어요. I don\'t like snakes.',
      },
      {
        id: 'p8', level: 2, type: 'order', concept: 1,
        q: '낱말을 순서대로 놓아 "나는 당근을 좋아하지 않아요."를 만드세요.',
        choices: ['like', 'I', 'carrots.', 'don\'t'],
        answer: [1, 3, 0, 2],
        hint: 'I 다음에 무엇이 올지, like의 앞인지 뒤인지 생각해 보세요.',
        explain: 'I → don\'t → like → carrots. 순서예요. don\'t는 like 앞에 와요.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        q: 'A: Do you like apples?\nB: [[대답]] I like apples.\n\n빈칸에 알맞은 대답은 무엇일까요?',
        choices: ['Yes, I do.', 'No, I don\'t.', 'Yes, I like.', 'No, I do.'],
        answer: 0,
        why: [
          '',
          'B가 뒤에서 I like apples.라고 했으니 좋아해요. Yes로 대답해요.',
          'Yes, I like.라고 하지 않아요. Yes 뒤에는 I do를 써요.',
          'No 뒤에는 don\'t가 와요. 그리고 B는 사과를 좋아해요.',
        ],
        hint: 'B가 빈칸 뒤에 한 말을 먼저 읽어 보세요.',
        explain: 'B가 I like apples.라고 했으니 사과를 좋아해요. 그래서 Yes, I do.가 알맞아요.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 2,
        q: 'A: Do you like carrots?\nB: No, I don\'t.\n\nB에 대해 바르게 말한 것은 무엇일까요?',
        choices: ['B는 당근을 좋아하지 않아요.', 'B는 당근을 좋아해요.', 'B는 포도를 좋아하지 않아요.', 'B는 당근이 무엇인지 몰라요.'],
        answer: 0,
        why: [
          '',
          'No, I don\'t.는 "아니, 좋아하지 않아."라는 대답이에요.',
          'A는 포도(grapes)가 아니라 당근(carrots)을 물었어요.',
          '모른다는 말이 아니라 좋아하지 않는다는 대답이에요.',
        ],
        hint: 'A가 무엇을 물었는지, B가 Yes와 No 중 무엇으로 대답했는지 보세요.',
        explain: 'A가 당근을 좋아하는지 물었고, B는 No, I don\'t.라고 대답했어요. B는 당근을 좋아하지 않아요.',
      },
      {
        id: 'p11', level: 2, type: 'short', concept: 0,
        q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nDo you like [[?]]? (너는 호랑이를 좋아하니?)',
        answer: ['tigers'],
        hint: '"호랑이"를 영어로 쓰고, 좋아하는지 물을 때 쓰는 모양으로 바꿔 보세요.',
        wrong: [
          { a: 'tiger', why: '낱말은 맞았어요. 동물을 좋아하는지 말할 때는 보통 끝에 -s를 붙여 tigers라고 해요.' },
          { a: 'cats', why: 'cats는 고양이예요. 호랑이는 tiger예요.' },
        ],
        explain: '호랑이는 tiger예요. 좋아하는지 묻거나 말할 때는 보통 -s를 붙여 Do you like tigers?라고 해요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 0,
        q: '다음 글을 읽고 물음에 답하세요.\n\nHi, I\'m Jia.\nI like bananas. I like milk, too.\nI don\'t like carrots.\nI like cats. I don\'t like tigers.\n\n(too: ~도)\n\n지아가 **좋아하는** 것끼리 묶은 것은 무엇일까요?',
        choices: ['bananas, milk, cats', 'bananas, carrots, cats', 'milk, cats, tigers', 'carrots, tigers'],
        answer: 0,
        why: [
          '',
          '지아는 I don\'t like carrots.라고 했어요. 당근은 좋아하지 않아요.',
          '지아는 I don\'t like tigers.라고 했어요. 호랑이는 좋아하지 않아요.',
          '둘 다 지아가 좋아하지 않는 것이에요. don\'t가 있는 문장을 다시 보세요.',
        ],
        hint: 'I like로 시작하는 문장과 I don\'t like로 시작하는 문장을 나누어 보세요.',
        explain: 'I like 문장에 나온 것은 bananas, milk, cats예요. carrots와 tigers는 I don\'t like 문장에 나왔으니 좋아하지 않는 것이에요.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 2,
        q: 'A: Do you like grapes?\nB: Yes, I do.\nA: Do you like milk?\nB: [[대답]] I don\'t like milk.\n\n빈칸에 알맞은 대답은 무엇일까요?',
        choices: ['No, I don\'t.', 'Yes, I do.', 'No, I like.', 'Yes, I don\'t.'],
        answer: 0,
        why: [
          '',
          'B가 뒤에서 I don\'t like milk.라고 했으니 우유를 좋아하지 않아요.',
          'No 뒤에는 I don\'t가 와요. No, I like.라고 하지 않아요.',
          'Yes와 don\'t는 짝이 아니에요. Yes, I do. / No, I don\'t.',
        ],
        hint: 'B가 빈칸 뒤에 한 말에 don\'t가 있는지 보세요.',
        explain: 'B는 우유를 좋아하지 않으니 No, I don\'t.라고 대답해요. 포도는 좋아해서 앞에서는 Yes, I do.라고 했어요.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 1,
        q: '바르게 쓰지 **않은** 문장은 무엇일까요?',
        choices: ['I no like carrots.', 'I don\'t like carrots.', 'I like milk.', 'Do you like dogs?'],
        answer: 0,
        why: [
          '',
          '바른 문장이에요. 좋아하지 않을 때는 like 앞에 don\'t를 넣어요.',
          '바른 문장이에요. milk는 -s를 붙이지 않아요.',
          '바른 문장이에요. 좋아하는지 물을 때 Do you like ~?를 써요.',
        ],
        hint: '좋아하지 않는다고 말할 때 like 앞에 무엇을 쓰는지 떠올려 보세요.',
        explain: '좋아하지 않는다고 할 때는 no가 아니라 don\'t를 써요. I no like carrots.는 I don\'t like carrots.로 고쳐야 해요.',
      },
      {
        id: 'a4', level: 3, type: 'short', concept: 1,
        q: '뜻이 반대가 되도록 빈칸에 알맞은 말을 쓰세요.\n\nI like cats. (나는 고양이를 좋아해요.)\n→ I [[?]] like cats. (나는 고양이를 좋아하지 않아요.)',
        answer: ['don\'t', 'do not'],
        hint: 'like 앞에 넣는 말이에요.',
        wrong: [
          { a: 'not', why: 'like 앞에 not만 쓰지 않아요. do not, 줄여서 don\'t를 써요.' },
          { a: 'no', why: 'no를 넣지 않아요. like 앞에는 don\'t를 써요.' },
        ],
        explain: 'like 앞에 don\'t(do not)를 넣으면 "좋아하지 않아요"가 돼요. I don\'t like cats.',
      },
    ],

    deeper: [
      {
        title: '얼마나 좋아하는지도 말할 수 있어요',
        body: '좋아하는 마음이 아주 크면 문장 끝에 **very much**를 붙여요.\n\n- I like dogs **very much**. (나는 개를 아주 많이 좋아해요.)\n\n**love**를 써서 I love dogs.라고 하면 "정말 좋아해요, 너무 좋아요"처럼 더 강한 느낌이 돼요.\n\n친구가 좋아하는 것을 물어보고 나도 좋아하면 **Me, too.**(나도 그래.)라고 맞장구칠 수도 있어요. 좋아하는 것을 묻고 답하는 말은 친구를 사귈 때 자주 쓰는 말이에요.',
      },
    ],

    faq: [
      {
        q: 'Yes, I like.라고 대답하면 안 돼요?',
        a: '그렇게 말하지 않아요. like 뒤에는 무엇을 좋아하는지가 꼭 와야 해서 like로 끝나면 말이 덜 끝난 것처럼 들려요.\n\n그래서 Do you like ~?에는 Yes, I do. 또는 No, I don\'t.로 짧게 대답해요.',
      },
      {
        q: 'I like apple이 아니라 왜 I like apples예요?',
        a: '사과라는 과일을 "통틀어" 좋아한다고 말할 때는 보통 -s를 붙여 apples라고 해요. 동물도 마찬가지로 I like dogs.라고 해요.\n\nmilk(우유)처럼 하나, 둘로 세지 않는 것은 -s를 붙이지 않고 I like milk.라고 해요.',
      },
      {
        q: 'don\'t에 있는 작은 점 같은 건 뭐예요?',
        a: '\' 는 **아포스트로피**라는 부호예요. do not을 줄여 쓸 때 빠진 글자 o 자리에 찍어요. 그래서 do not이 don\'t가 돼요.',
      },
    ],

    mistakes: [
      'Do you like ~?에 Yes, I like.라고 대답하는 실수 — Yes, I do. / No, I don\'t.로 대답해요.',
      'I no like snakes.처럼 no를 넣는 실수 — like 앞에는 don\'t를 넣어요: I don\'t like snakes.',
      '좋아하는 것을 like 앞에 쓰는 실수 — 우리말과 순서가 달라요. I like 다음에 좋아하는 것이 와요.',
    ],

    gens: [
      {
        id: 'like-talk',
        level: 2,
        title: '좋아하는 것 말하고 대답하기',
        make: function (R) {
          var i = R.int(0, THINGS.length - 1);
          var eng = THINGS[i][0];
          var kor = THINGS[i][1];
          var yes = R.bool();
          var obj = kor + R.josa(kor, '을/를');
          if (R.bool()) {
            // 묻는 말에 대답 고르기
            var correct = yes ? 'Yes, I do.' : 'No, I don\'t.';
            var reason = {
              'Yes, I do.': 'B는 ' + obj + ' 좋아하지 않아요. 좋아하지 않을 때는 No, I don\'t.예요.',
              'No, I don\'t.': 'B는 ' + obj + ' 좋아해요. 좋아할 때는 Yes, I do.예요.',
              'Yes, I like.': 'Yes, I like.라고 하지 않아요. 좋아할 때는 Yes, I do.예요.',
              'No, I do.': 'No 뒤에는 don\'t가 와요. 좋아하지 않을 때는 No, I don\'t.예요.',
            };
            var pick = R.choices(correct, R.shuffle(['Yes, I do.', 'No, I don\'t.', 'Yes, I like.', 'No, I do.']));
            return {
              type: 'choice', concept: 2,
              q: 'A: Do you like ' + eng + '?\nB: [[대답]]\n\nB는 ' + obj + ' ' + (yes ? '좋아해요' : '좋아하지 않아요') + '. 알맞은 대답은 무엇일까요?',
              choices: pick.choices,
              answer: pick.answer,
              why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
              explain: (yes ? '좋아하면 Yes와 do가 짝이에요.' : '좋아하지 않으면 No와 don\'t가 짝이에요.') + ' 답: **' + correct + '**',
            };
          }
          // 우리말 → 영어 문장 고르기
          var other = THINGS[(i + R.int(1, THINGS.length - 1)) % THINGS.length];
          var good = yes ? 'I like ' + eng + '.' : 'I don\'t like ' + eng + '.';
          var flip = yes ? 'I don\'t like ' + eng + '.' : 'I like ' + eng + '.';
          var ask = 'Do you like ' + eng + '?';
          var wrongThing = yes ? 'I like ' + other[0] + '.' : 'I don\'t like ' + other[0] + '.';
          var bad = yes ? 'I ' + eng + ' like.' : 'I no like ' + eng + '.';
          var why = {};
          why[flip] = yes ? 'don\'t가 들어가면 "좋아하지 않아요"가 돼요.' : 'don\'t가 없으면 "좋아해요"라는 뜻이 돼요.';
          why[ask] = '"너는 ~을 좋아하니?"라고 묻는 말이에요.';
          why[wrongThing] = '낱말을 확인해 보세요. ' + other[0] + ': ' + other[1];
          why[bad] = yes ? '순서가 틀렸어요. I like 다음에 좋아하는 것이 와요.' : 'no를 넣지 않아요. like 앞에는 don\'t를 써요.';
          var pick2 = R.choices(good, R.shuffle([flip, ask, wrongThing, bad]));
          return {
            type: 'choice', concept: yes ? 0 : 1,
            q: '"나는 ' + obj + ' ' + (yes ? '좋아해요' : '좋아하지 않아요') + '."를 영어로 바르게 말한 것은 무엇일까요?',
            choices: pick2.choices,
            answer: pick2.answer,
            why: pick2.choices.map(function (c) { return c === good ? '' : why[c]; }),
            explain: kor + ': ' + eng + '\n\n' + (yes ? 'I like 뒤에 좋아하는 것을 써요.' : 'like 앞에 don\'t를 넣어요.') + ' 답: **' + good + '**',
          };
        },
      },
    ],

    vocab: [
      { w: 'like', m: '좋아하다', ex: 'I **like** grapes.', exm: '나는 포도를 좋아해요.' },
      { w: 'apple', m: '사과', ex: 'I like **apples**.', exm: '나는 사과를 좋아해요.' },
      { w: 'grape', m: '포도', ex: 'Do you like **grapes**?', exm: '너는 포도를 좋아하니?' },
      { w: 'banana', m: '바나나', ex: 'I like **bananas**.', exm: '나는 바나나를 좋아해요.' },
      { w: 'carrot', m: '당근', ex: 'I don\'t like **carrots**.', exm: '나는 당근을 좋아하지 않아요.' },
      { w: 'milk', m: '우유', ex: 'I like **milk**.', exm: '나는 우유를 좋아해요.' },
      { w: 'cat', m: '고양이', ex: 'Do you like **cats**?', exm: '너는 고양이를 좋아하니?' },
      { w: 'dog', m: '개', ex: 'I like **dogs**.', exm: '나는 개를 좋아해요.' },
      { w: 'tiger', m: '호랑이', ex: 'I don\'t like **tigers**.', exm: '나는 호랑이를 좋아하지 않아요.' },
      { w: 'snake', m: '뱀', ex: 'I don\'t like **snakes**.', exm: '나는 뱀을 좋아하지 않아요.' },
      { w: 'rabbit', m: '토끼', ex: 'Do you like **rabbits**?', exm: '너는 토끼를 좋아하니?' },
    ],
  });
})();
