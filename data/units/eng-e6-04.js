/* 6학년 영어 · 방법과 순서 설명하기 */
Tutor.registerUnit({
  id: 'eng-e6-04',
  course: 'eng-e6',
  title: '방법과 순서 설명하기',
  summary: 'first, then, finally 같은 말로 순서를 나타내며 음식을 만드는 방법이나 일의 차례를 설명해요.',
  goals: [
    'first, second, then, next, finally로 일의 순서를 나타낼 수 있어요.',
    'Wash the apples.처럼 방법을 알려 주는 명령문을 말할 수 있어요.',
    'wash, cut, mix, put, pour, bake 같은 요리 동작 낱말을 알 수 있어요.',
    'How do you make it?으로 만드는 방법을 묻고, 설명을 읽고 순서대로 정리할 수 있어요.',
  ],
  standards: ['[6영02-05]', '[6영01-06]', '[6영01-07]'],

  concepts: [
    {
      title: '순서를 나타내는 말',
      body: '어떤 일을 차례대로 설명할 때는 문장 맨 앞에 **순서를 나타내는 말**을 써요.\n\n| 순서의 말 | 뜻 | 쓰는 자리 |\n|---|---|---|\n| **First,** | 먼저, 첫째로 | 맨 처음 |\n| **Second,** | 둘째로 | 두 번째 |\n| **Then,** | 그다음에 | 중간 |\n| **Next,** | 다음에 | 중간 |\n| **Finally,** | 마지막으로 | 맨 끝 |\n\n- **First,** wash the apples. **Then,** cut them. **Finally,** put them in a bowl.\n\n순서의 말 뒤에는 보통 쉼표(,)를 찍어요.\n\n> 💡 first, second는 1단원에서 배운 "첫째, 둘째"와 같은 낱말이에요. 여기서는 "먼저, 둘째로"라는 뜻으로 써요.',
      easy: '계단을 오르는 모습을 떠올려 보세요.\n\n- 첫 계단: **First**\n- 가운데 계단들: **Then**, **Next**\n- 맨 위 계단: **Finally**\n\n문장 앞에 붙은 이 말만 보아도 몇 번째로 할 일인지 알 수 있어요.',
      check: {
        type: 'choice',
        q: '"마지막으로"라는 뜻의 말은 무엇일까요?',
        choices: ['Finally', 'First', 'Then'],
        answer: 0,
        why: ['', 'First는 "먼저"예요. 맨 처음 할 일 앞에 써요.', 'Then은 "그다음에"예요. 중간에 할 일 앞에 써요.'],
        explain: '**Finally**는 "마지막으로"라는 뜻이에요. 맨 끝에 할 일 앞에 써요.',
      },
    },
    {
      title: '방법을 알려 주는 명령문',
      body: '만드는 방법을 알려 줄 때는 **동사(움직임을 나타내는 말)로 시작하는 문장**을 써요. 이런 문장을 **명령문**이라고 해요.\n\n- **Wash** the apples. — 사과를 씻으세요.\n- **Cut** them. — 그것들을 자르세요.\n- **Put** them in a bowl. — 그것들을 그릇에 담으세요.\n\n명령문에는 I, you 같은 주어가 없고, 동사 모양도 그대로 써요(washes, cutting처럼 바꾸지 않아요).\n\n**them**은 "그것들"이라는 뜻으로, 앞에서 말한 여러 개의 물건을 다시 가리켜요. Wash the apples. Cut **them**.에서 them은 the apples예요.',
      easy: '요리책은 늘 "해라!"라고 말해요. "씻어라, 잘라라, 담아라."\n\n영어도 똑같이 **할 일(동사)**부터 말해요. 맨 앞 낱말만 읽어도 무엇을 해야 하는지 알 수 있어요.\n\n**Wash** → 씻어라, **Cut** → 잘라라, **Put** → 담아라',
      check: {
        type: 'ox',
        q: 'Wash the apples. Cut them.에서 them은 the apples를 가리켜요.',
        answer: true,
        explain: 'them은 앞에서 말한 여러 개의 물건을 다시 가리켜요. 여기서는 사과들(the apples)이에요.',
      },
    },
    {
      title: '요리할 때 쓰는 동작 낱말',
      body: '음식을 만들 때 자주 쓰는 동사예요.\n\n| 동사 | 뜻 | 예 |\n|---|---|---|\n| **wash** | 씻다 | Wash the carrots. |\n| **cut** | 자르다 | Cut the bread. |\n| **mix** | 섞다 | Mix the eggs and sugar. |\n| **put** | 넣다, 놓다 | Put the fruit in a bowl. |\n| **pour** | (물·우유 같은 것을) 붓다 | Pour the milk into a cup. |\n| **bake** | (오븐에) 굽다 | Bake the cookies in the oven. |\n\n**put**과 **pour**를 헷갈리지 않도록 해요. 과일·치즈처럼 덩어리는 put(넣다, 놓다), 우유·물처럼 흐르는 것은 pour(붓다)를 써요.\n\n> ⚠️ 칼이나 오븐을 쓸 때는 꼭 어른과 함께해요.',
      easy: '부엌에서 몸으로 흉내 내 보세요.\n\n- 손을 비비며 씻기: **wash**\n- 칼질하듯 손을 내리기: **cut**\n- 숟가락으로 빙빙 돌리기: **mix**\n- 물건을 쏙 넣기: **put**\n- 컵을 기울여 졸졸 붓기: **pour**\n- 오븐 안에서 노릇노릇: **bake**',
      check: {
        type: 'choice',
        q: 'pour의 뜻으로 알맞은 것은 무엇일까요?',
        choices: ['(물·우유 같은 것을) 붓다', '자르다', '섞다'],
        answer: 0,
        why: ['', '자르다는 cut이에요.', '섞다는 mix예요.'],
        explain: '**pour**는 우유나 물처럼 흐르는 것을 "붓다"라는 뜻이에요. 예: Pour the milk into a cup.',
      },
    },
    {
      title: '만드는 방법 묻고 답하기',
      body: '만드는 방법이 궁금할 때는 **How do you make it?**이라고 물어요. "그것을 어떻게 만드니?"라는 뜻이에요. it 대신 음식 이름을 넣어도 돼요.\n\n- **How do you make fruit salad?** — 과일 샐러드는 어떻게 만드니?\n\n대답은 순서의 말과 명령문으로 해요.\n\n- A: How do you make fruit salad?\n- B: It\'s easy. **First,** wash the fruit. **Then,** cut it. **Finally,** mix it with yogurt.\n\n> 💡 It\'s easy.(쉬워.)처럼 짧게 한마디 한 뒤 설명을 시작하면 자연스러워요.',
      easy: '친구가 맛있는 간식을 가져왔어요. "이거 어떻게 만들었어?"라고 묻고 싶지요?\n\n그때 쓰는 말이 **How do you make it?**이에요. How(어떻게) + do you make(너는 만드니) + it(그것을)이에요.',
      check: {
        type: 'choice',
        q: 'How do you make it?의 뜻으로 알맞은 것은 무엇일까요?',
        choices: ['그것을 어떻게 만드니?', '그것은 얼마니?', '그것은 어디에 있니?'],
        answer: 0,
        why: ['', '값을 물을 때는 How much is it?이라고 해요.', '위치를 물을 때는 Where is it?이라고 해요.'],
        explain: 'How는 "어떻게", make는 "만들다"예요. How do you make it?은 **그것을 어떻게 만드니?**예요.',
      },
    },
    {
      title: '설명을 읽고 차례대로 놓기',
      body: '만드는 방법을 읽고 그림이나 문장을 차례대로 놓을 때는 이렇게 해요.\n\n1. **순서의 말**(First, Then, Next, Finally)에 동그라미를 쳐요.\n2. 순서의 말 바로 뒤의 **동사**를 찾아 무엇을 하는지 알아내요.\n3. 동사가 나타내는 장면을 찾아 순서대로 놓아요.\n\n예: How do you make a sandwich? **First,** put some ham on the bread. **Then,** put some cheese on the ham. **Finally,** put another piece of bread on top.\n\n→ 빵 위에 햄 → 햄 위에 치즈 → 맨 위에 빵 한 장\n\n> 💡 Then과 Next는 둘 다 "그다음에"라서 순서의 말만으로 앞뒤를 알 수 없을 때가 있어요. 그럴 때는 내용을 보고 무엇을 먼저 해야 하는지 생각해요.',
      easy: '레고 설명서를 떠올려 보세요. 1번 그림부터 차례대로 따라 하지요?\n\n영어 설명에서는 First, Then, Finally가 설명서의 번호 역할을 해요. 번호(순서의 말)를 먼저 찾고, 그 뒤의 할 일을 읽으면 돼요.',
      check: {
        type: 'choice',
        q: 'First, wash the carrots. Then, cut them. Finally, put them in the soup.\n\n두 번째로 할 일은 무엇일까요?',
        choices: ['당근을 잘라요.', '당근을 씻어요.', '당근을 수프에 넣어요.'],
        answer: 0,
        why: ['', '씻기는 First 뒤에 있으니 첫 번째로 할 일이에요.', '수프에 넣기는 Finally 뒤에 있으니 마지막에 할 일이에요.'],
        explain: 'Then(그다음에) 뒤에 cut them이 있어요. 그래서 두 번째로 할 일은 **당근을 잘라요.**예요.',
      },
    },
  ],

  examples: [
    {
      q: '과일 샐러드를 만드는 방법을 순서의 말을 넣어 영어로 설명해 보세요.\n\n① 사과를 씻어요. ② 사과를 잘라요. ③ 그릇에 담아요. ④ 요구르트를 부어요.',
      steps: [
        '첫 번째 일 앞에는 First를 써요. 씻다는 wash이므로 First, wash the apples.',
        '두 번째 일은 Then으로 이어요. 자르다는 cut이고, 앞의 사과들은 them으로 받아요: Then, cut them.',
        '세 번째 일은 Next로 이어요. 담다는 put이에요: Next, put them in a bowl.',
        '마지막 일 앞에는 Finally를 써요. 요구르트처럼 흐르는 것은 pour를 써요: Finally, pour some yogurt on them.',
      ],
      answer: 'First, wash the apples. Then, cut them. Next, put them in a bowl. Finally, pour some yogurt on them.',
    },
    {
      q: '다음 문장에서 동사와 them이 가리키는 것을 찾아보세요.\n\nWash the potatoes. Then, cut them.',
      steps: [
        '명령문은 동사로 시작해요. 첫 문장의 동사는 Wash(씻다)예요.',
        '둘째 문장에서는 Then 뒤의 cut이 동사예요. cut은 "자르다"라는 뜻이에요.',
        'them은 앞에서 말한 여러 개의 물건을 가리켜요. 앞에 나온 것은 감자들(the potatoes)이에요.',
      ],
      answer: '동사: Wash, cut / them = the potatoes(감자들)',
    },
  ],

  terms: [
    { term: '순서를 나타내는 말', def: '일의 차례를 알려 주는 말이에요. First(먼저), Second(둘째로), Then(그다음에), Next(다음에), Finally(마지막으로)가 있어요.' },
    { term: '명령문', def: '동사로 시작해서 "~하세요"라고 할 일을 알려 주는 문장이에요. 예: Mix the eggs and sugar.' },
    { term: '동사', def: '움직임이나 하는 일을 나타내는 말이에요. 예: wash(씻다), cut(자르다), mix(섞다)' },
    { term: 'them', def: '"그것들"이라는 뜻으로, 앞에서 말한 여러 개의 물건을 다시 가리켜요. 예: Wash the apples. Cut them.' },
    { term: 'recipe(요리법)', def: '음식을 만드는 재료와 방법을 순서대로 적은 글이에요. 순서의 말과 명령문이 많이 나와요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '"먼저, 첫째로"라는 뜻으로 맨 처음 할 일 앞에 쓰는 말은 무엇일까요?',
      choices: ['First', 'Finally', 'Then', 'Next'],
      answer: 0,
      why: ['', 'Finally는 "마지막으로"예요. 맨 끝에 할 일 앞에 써요.', 'Then은 "그다음에"예요. 중간에 할 일 앞에 써요.', 'Next는 "다음에"예요. 중간에 할 일 앞에 써요.'],
      explain: '맨 처음 할 일 앞에는 **First**를 써요. 예: First, wash the apples.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 2,
      q: 'mix의 뜻으로 알맞은 것은 무엇일까요?',
      choices: ['섞다', '씻다', '붓다', '굽다'],
      answer: 0,
      why: ['', '씻다는 wash예요.', '붓다는 pour예요.', '굽다는 bake예요.'],
      explain: '**mix**는 "섞다"예요. 예: Mix the eggs and sugar.(달걀과 설탕을 섞으세요.)',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 낱말을 쓰세요.\n\n[[빈칸]] the apples. (사과를 씻으세요.)',
      answer: ['wash'],
      wrong: [
        { a: 'watch', why: 'watch는 "보다"라는 뜻이에요. "씻다"는 w-a-s-h, wash예요.' },
        { a: 'cut', why: 'cut은 "자르다"예요. "씻다"는 wash예요.' },
        { a: 'washes', why: '명령문은 동사 모양을 그대로 써요. washes가 아니라 wash예요.' },
      ],
      explain: '"씻다"는 **wash**예요. 명령문이므로 동사로 시작해서 Wash the apples.라고 해요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '명령문 Cut the bread.는 "빵을 자르세요."라는 뜻이에요.',
      answer: true,
      explain: 'cut은 "자르다", the bread는 "빵"이에요. 동사로 시작하는 명령문이라 "빵을 자르세요."라는 뜻이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '쿠키 반죽을 오븐에 넣어 "굽다"라고 할 때 알맞은 낱말은 무엇일까요?',
      choices: ['bake', 'mix', 'pour', 'wash'],
      answer: 0,
      why: ['', 'mix는 "섞다"예요.', 'pour는 "붓다"예요.', 'wash는 "씻다"예요.'],
      explain: '오븐에 굽는 것은 **bake**예요. 예: Bake the cookies in the oven.',
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 3,
      q: '우리말 뜻에 맞게 낱말을 순서대로 놓으세요.\n\n"그것을 어떻게 만드니?"',
      choices: ['How', 'do', 'you', 'make', 'it?'],
      answer: [0, 1, 2, 3, 4],
      explain: '방법을 묻는 How로 시작하고 do you make it?을 이어요. **How do you make it?**',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '김밥을 만드는 방법을 물을 때 알맞은 말은 무엇일까요?',
      choices: ['How do you make gimbap?', 'How much is gimbap?', 'Where is gimbap?', 'Do you like gimbap?'],
      answer: 0,
      why: ['', '값을 묻는 말이에요.', '어디에 있는지 묻는 말이에요.', '좋아하는지 묻는 말이에요.'],
      explain: '만드는 방법은 **How do you make** + 음식 이름?으로 물어요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nFirst, wash the potatoes. [[빈칸]], cut them. Finally, put them in the pot.',
      choices: ['Then', 'First', 'Finally', 'Yesterday'],
      answer: 0,
      why: ['', 'First는 이미 맨 앞에 나왔어요. 가운데 할 일 앞에는 Then을 써요.', 'Finally는 맨 끝의 할 일 앞에 이미 나왔어요.', 'Yesterday는 "어제"라는 뜻으로, 순서를 나타내는 말이 아니에요.'],
      hint: '먼저 하는 일과 마지막에 하는 일 사이에 들어가는 말을 찾아보세요.',
      explain: '처음(First)과 마지막(Finally) 사이의 할 일 앞에는 **Then**(그다음에)을 써요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 낱말을 쓰세요.\n\n[[빈칸]] the milk into the cup. (우유를 컵에 부으세요.)',
      answer: ['pour'],
      hint: '우유처럼 흐르는 것을 컵에 옮기는 동작이에요.',
      wrong: [
        { a: 'put', why: 'put은 과일·치즈처럼 덩어리를 "넣다, 놓다"예요. 우유처럼 흐르는 것을 "붓다"는 pour예요.' },
        { a: 'mix', why: 'mix는 "섞다"예요. "붓다"는 pour예요.' },
      ],
      explain: '우유처럼 흐르는 것을 "붓다"는 **pour**예요. Pour the milk into the cup.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 4,
      q: '글을 읽고 장면을 차례대로 놓으세요.\n\nHow do you make fruit salad? It\'s easy. First, wash the apples and strawberries. Then, cut them. Next, put them in a bowl. Finally, pour some yogurt on them and mix.',
      choices: ['사과와 딸기를 씻는 장면', '과일을 자르는 장면', '과일을 그릇에 담는 장면', '요구르트를 붓고 섞는 장면'],
      answer: [0, 1, 2, 3],
      hint: 'First, Then, Next, Finally 뒤의 동사를 차례로 찾아보세요.',
      explain: 'First 뒤 wash(씻기) → Then 뒤 cut(자르기) → Next 뒤 put ~ in a bowl(그릇에 담기) → Finally 뒤 pour ~ and mix(붓고 섞기)의 순서예요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nHow do you make a sandwich? First, put some ham on the bread. Then, put some cheese on the ham. Next, put some lettuce on the cheese. Finally, put another piece of bread on top.\n\n(lettuce: 상추)\n\n햄 바로 위에 올리는 것은 무엇일까요?',
      choices: ['치즈', '상추', '빵', '햄'],
      answer: 0,
      why: ['', '상추는 치즈 위에 올려요(Next, put some lettuce on the cheese).', '빵은 마지막에 맨 위에 올려요.', '햄은 처음에 빵 위에 올린 것이에요.'],
      hint: 'on the ham(햄 위에)이 나오는 문장을 찾아보세요.',
      explain: 'Then, put some cheese on the ham.은 "그다음에 햄 위에 치즈를 올리세요."라는 뜻이에요. 그래서 햄 바로 위에는 **치즈**를 올려요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 1,
      q: '만드는 방법을 알려 주는 명령문으로 바른 것은 무엇일까요?',
      choices: ['Mix the eggs and milk.', 'Mixes the eggs and milk.', 'Mixing the eggs and milk.', 'The eggs and milk.'],
      answer: 0,
      why: ['', '명령문은 동사 모양을 그대로 써요. mixes처럼 s를 붙이지 않아요.', 'mixing처럼 ing를 붙이지 않아요. 동사 모양 그대로 Mix로 시작해요.', '동사가 없어서 무엇을 하라는지 알 수 없어요.'],
      hint: '명령문은 어떤 모양의 동사로 시작했는지 떠올려 보세요.',
      explain: '명령문은 동사 모양 그대로 시작해요. **Mix the eggs and milk.**(달걀과 우유를 섞으세요.)가 바른 문장이에요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'order', concept: 4,
      q: '쿠키 만드는 방법을 알맞은 순서대로 놓으세요.\n\n(flour: 밀가루, ball: 공 모양, tray: 오븐에 넣는 판)',
      choices: ['First, mix flour, sugar, and eggs.', 'Next, make small balls.', 'Then, put the balls on a tray.', 'Finally, bake them in the oven.'],
      answer: [0, 1, 2, 3],
      hint: 'Then과 Next는 둘 다 가운데에 와요. 판에 올리려면 먼저 무엇이 있어야 할지 생각해 보세요.',
      explain: 'First가 맨 앞, Finally가 맨 끝이에요. 가운데의 Next와 Then은 내용으로 정해요. 공 모양을 만들어야(make small balls) 그 공을 판에 올릴 수 있으니(put the balls on a tray) Next 문장이 먼저예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '글을 읽고 물음에 답하세요.\n\nHow do you make banana milk? First, cut a banana. Then, put it in a blender. Next, pour some milk into the blender. Finally, mix them.\n\n(blender: 믹서)\n\n글의 내용과 **맞지 않는** 것은 무엇일까요?',
      choices: ['바나나를 가장 먼저 잘라요.', '우유는 믹서에 부어요.', '바나나를 믹서에 넣기 전에 우유를 부어요.', '마지막에 섞어요.'],
      answer: 2,
      why: ['First, cut a banana.라고 했으니 맞는 내용이에요.', 'pour some milk into the blender라고 했으니 맞는 내용이에요.', '', 'Finally, mix them.이라고 했으니 맞는 내용이에요.'],
      hint: 'Then 문장과 Next 문장 중 무엇이 먼저 나오는지 보세요.',
      explain: '바나나를 믹서에 넣는 것(Then)이 우유를 붓는 것(Next)보다 먼저예요. 그래서 "바나나를 믹서에 넣기 전에 우유를 부어요."는 글과 맞지 않아요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 질문을 고르세요.\n\nA: [[빈칸]]\nB: It\'s easy. First, put some rice in a bowl. Then, mix it with a little salt. Finally, make small balls.',
      choices: ['How do you make rice balls?', 'Where is the rice?', 'When do you eat rice balls?', 'Do you like rice balls?'],
      answer: 0,
      why: ['', 'B가 밥이 어디 있는지 말하지 않았어요. 만드는 순서를 말하고 있어요.', 'B가 먹는 때를 말하지 않았어요. 만드는 순서를 말하고 있어요.', '좋아하는지 물으면 Yes나 No로 대답해요.'],
      hint: 'B의 대답이 무엇을 설명하고 있는지 먼저 보세요.',
      explain: 'B는 First, Then, Finally로 주먹밥(rice balls)을 만드는 순서를 설명하고 있어요. 그래서 A는 만드는 방법을 묻는 **How do you make rice balls?**라고 물었어요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 1,
      q: '다음 글에서 them이 가리키는 것을 영어로 쓰세요.\n\nWash the tomatoes. Then, cut them.',
      answer: ['tomatoes', 'the tomatoes'],
      hint: 'them은 "그것들"이에요. 앞 문장에서 여러 개인 물건을 찾아보세요.',
      wrong: [
        { a: 'tomato', why: 'them은 여러 개를 가리켜요. 글에 나온 대로 tomatoes로 써요.' },
        { a: 'wash', why: 'wash는 동사(씻다)예요. them은 물건을 가리켜요.' },
      ],
      explain: 'them은 앞에서 말한 여러 개의 물건을 다시 가리켜요. 앞 문장의 토마토들(the tomatoes)을 가리키므로 답은 **tomatoes**예요.',
    },
  ],

  deeper: [
    {
      title: '요리법(recipe)은 어떻게 생겼을까?',
      body: '영어 요리법은 보통 두 부분으로 되어 있어요.\n\n1. **Ingredients(재료)** — 필요한 재료를 목록으로 적어요. 예: 2 apples, 1 cup of yogurt\n2. **Directions(만드는 방법)** — 명령문으로 할 일을 순서대로 적어요. 번호(1, 2, 3)를 붙이거나 First, Then, Finally를 써요.\n\n요리법뿐 아니라 종이접기, 화분에 씨앗 심기, 게임 방법을 설명할 때도 같은 방법을 써요.\n\n- First, put some soil in the pot. Then, put the seeds in the soil. Finally, water them.\n\n순서의 말에는 After that(그 뒤에)처럼 이 단원에서 배운 것 말고도 여러 가지가 있어요.',
    },
  ],

  faq: [
    {
      q: 'Then이랑 Next는 뭐가 달라요?',
      a: '둘 다 "그다음에"라는 뜻이라 가운데 순서에 써요. 같은 말이 되풀이되지 않도록 Then과 Next를 번갈아 쓰는 경우가 많아요. 둘 중 무엇이 먼저인지는 내용을 보고 정해요.',
    },
    {
      q: '명령문에는 왜 주어가 없어요?',
      a: '명령문은 바로 앞에 있는 상대방(you)에게 말하는 문장이라 you를 빼고 말해요. 그래서 Wash the apples.처럼 동사로 바로 시작해요.',
    },
    {
      q: 'put이랑 pour는 어떻게 구별해요?',
      a: 'put은 과일, 치즈, 빵처럼 덩어리를 어딘가에 "넣거나 놓을" 때 써요. pour는 우유, 물, 주스처럼 흐르는 것을 컵 같은 데에 "부을" 때 써요.',
    },
  ],

  mistakes: [
    'Washes the apples.처럼 명령문의 동사에 s를 붙이는 실수 — 명령문은 Wash the apples.처럼 동사 모양 그대로 써요.',
    '우유를 붓는데 put을 쓰는 실수 — 흐르는 것을 붓는 것은 pour예요. Pour the milk into the cup.',
    'Finally를 처음 할 일 앞에 쓰는 실수 — Finally는 "마지막으로"라는 뜻이라 맨 끝에 할 일 앞에 써요.',
  ],

  gens: [
    {
      id: 'cooking-verb',
      level: 1,
      title: '요리 동작 낱말 고르기',
      make: function (R) {
        var MEAN = { Wash: '씻다', Cut: '자르다', Mix: '섞다', Put: '넣다, 놓다', Pour: '붓다', Bake: '굽다' };
        var ITEMS = [
          ['Wash', 'the apples', '사과를 씻으세요.'], ['Wash', 'the potatoes', '감자를 씻으세요.'], ['Wash', 'the carrots', '당근을 씻으세요.'], ['Wash', 'the strawberries', '딸기를 씻으세요.'],
          ['Cut', 'the bread', '빵을 자르세요.'], ['Cut', 'the carrots', '당근을 자르세요.'], ['Cut', 'the cheese', '치즈를 자르세요.'], ['Cut', 'the apples', '사과를 자르세요.'],
          ['Mix', 'the eggs and sugar', '달걀과 설탕을 섞으세요.'], ['Mix', 'the flour and milk', '밀가루와 우유를 섞으세요.'], ['Mix', 'the fruit and yogurt', '과일과 요구르트를 섞으세요.'],
          ['Put', 'the fruit in a bowl', '과일을 그릇에 담으세요.'], ['Put', 'the cheese on the bread', '치즈를 빵 위에 놓으세요.'], ['Put', 'the cookies on a tray', '쿠키를 판 위에 놓으세요.'],
          ['Pour', 'the milk into a cup', '우유를 컵에 부으세요.'], ['Pour', 'the water into the pot', '물을 냄비에 부으세요.'], ['Pour', 'the juice into a glass', '주스를 유리잔에 부으세요.'],
          ['Bake', 'the bread in the oven', '빵을 오븐에 구우세요.'], ['Bake', 'the cookies in the oven', '쿠키를 오븐에 구우세요.'], ['Bake', 'the cake in the oven', '케이크를 오븐에 구우세요.'],
        ];
        var it = R.pick(ITEMS);
        var v = it[0];
        // 헷갈리기 쉬운 짝(put↔pour, mix↔pour 등)을 먼저 오답으로
        var NEAR = { Wash: ['Cut'], Cut: ['Wash'], Mix: ['Pour'], Put: ['Pour'], Pour: ['Put'], Bake: ['Mix'] };
        var rest = R.shuffle(['Wash', 'Cut', 'Mix', 'Put', 'Pour', 'Bake'].filter(function (x) { return x !== v && NEAR[v].indexOf(x) < 0; }));
        var c = R.choices(v, NEAR[v].concat(rest));
        return {
          type: 'choice', concept: 2,
          q: '우리말 뜻에 맞게 빈칸에 알맞은 낱말을 고르세요.\n\n[[빈칸]] ' + it[1] + '.\n(' + it[2] + ')',
          choices: c.choices,
          answer: c.answer,
          why: c.choices.map(function (x) { return x === v ? '' : x + '는 "' + MEAN[x] + '"라는 뜻이에요.'; }).map(function (w, i) {
            if (!w) return w;
            var x = c.choices[i];
            return (x === 'Cut' || x === 'Put') ? w.replace(x + '는', x + '은') : w;
          }),
          explain: '"' + it[2] + '"에서 할 일은 "' + MEAN[v] + '"예요. 그래서 **' + v + ' ' + it[1] + '.**',
        };
      },
    },
    {
      id: 'sequence-order',
      level: 2,
      title: '순서의 말을 보고 차례대로 놓기',
      make: function (R) {
        var RECIPES = [
          ['wash the apples', 'cut them', 'put them in a bowl', 'pour some yogurt on them'],
          ['put some ham on the bread', 'put some cheese on the ham', 'put some lettuce on the cheese', 'put another piece of bread on top'],
          ['mix flour, sugar, and eggs', 'make small balls', 'put the balls on a tray', 'bake them in the oven'],
          ['cut a banana', 'put it in a blender', 'pour some milk into the blender', 'mix them'],
          ['wash the potatoes', 'cut them', 'put them in the pot', 'pour some water into the pot'],
          ['wash the strawberries', 'cut them', 'put them in a cup', 'pour some milk on them'],
        ];
        // 세 단계로 줄일 때 빼도 글이 이어지는 단계 번호 (샌드위치에서 치즈 단계를 빼면 on the cheese 가 어색해지는 것처럼)
        var DROPS = [[1, 2], [2], [2], [1], [1, 2], [1, 2]];
        var r = R.pick(RECIPES);
        var canDrop = DROPS[RECIPES.indexOf(r)];
        var variant = R.int(0, 4);
        var words, steps;
        if (variant === 0) { words = ['First', 'Second', 'Third', 'Finally']; steps = r; }
        else {
          var mid = variant <= 2 ? 'Then' : 'Next';
          var drop = variant % 2 === 1 ? canDrop[0] : canDrop[canDrop.length - 1];
          words = ['First', mid, 'Finally'];
          steps = r.filter(function (s, i) { return i !== drop; });
        }
        var items = steps.map(function (s, i) { return words[i] + ', ' + s + '.'; });
        return {
          type: 'order', concept: 0,
          q: '문장 앞의 순서를 나타내는 말을 보고 차례대로 놓으세요.',
          choices: items,
          answer: items.map(function (s, i) { return i; }),
          explain: '순서의 말을 차례로 찾으면 ' + words.join(' → ') + '예요. ' + (words.length === 4 ? 'First(먼저), Second(둘째로), Third(셋째로), Finally(마지막으로)' : 'First(먼저)가 맨 앞, ' + words[1] + '(그다음에)가 가운데, Finally(마지막으로)가 맨 끝') + '의 순서예요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'first', m: '먼저, 첫째로', ex: 'First, wash your hands.', exm: '먼저 손을 씻으세요.' },
    { w: 'then', m: '그다음에', ex: 'Then, cut the bread.', exm: '그다음에 빵을 자르세요.' },
    { w: 'next', m: '다음에', ex: 'Next, put the cheese on the bread.', exm: '다음에 빵 위에 치즈를 놓으세요.' },
    { w: 'finally', m: '마지막으로', ex: 'Finally, eat and enjoy!', exm: '마지막으로 맛있게 먹어요!' },
    { w: 'wash', m: '씻다', ex: 'Wash the strawberries.', exm: '딸기를 씻으세요.' },
    { w: 'cut', m: '자르다', ex: 'Cut the apple in half.', exm: '사과를 반으로 자르세요.' },
    { w: 'mix', m: '섞다', ex: 'Mix the eggs and sugar.', exm: '달걀과 설탕을 섞으세요.' },
    { w: 'put', m: '넣다, 놓다', ex: 'Put the fruit in a bowl.', exm: '과일을 그릇에 담으세요.' },
    { w: 'pour', m: '붓다', ex: 'Pour the milk into the cup.', exm: '우유를 컵에 부으세요.' },
    { w: 'bake', m: '(오븐에) 굽다', ex: 'We bake cookies every Saturday.', exm: '우리는 토요일마다 쿠키를 구워요.' },
    { w: 'make', m: '만들다', ex: 'How do you make it?', exm: '그것을 어떻게 만드니?' },
    { w: 'bowl', m: '그릇, 사발', ex: 'Put the rice in a bowl.', exm: '밥을 그릇에 담으세요.' },
    { w: 'oven', m: '오븐', ex: 'The bread is in the oven.', exm: '빵이 오븐 안에 있어요.' },
    { w: 'flour', m: '밀가루', ex: 'We need flour to make bread.', exm: '빵을 만들려면 밀가루가 필요해요.' },
    { w: 'sugar', m: '설탕', ex: 'Put a little sugar in the tea.', exm: '차에 설탕을 조금 넣으세요.' },
    { w: 'recipe', m: '요리법', ex: 'This recipe is easy.', exm: '이 요리법은 쉬워요.' },
  ],
});
