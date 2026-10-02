/* 중2 영어 · 정도 비교하기 (원급·비교급 강조) */
Tutor.registerUnit({
  id: 'eng-m2-10',
  course: 'eng-m2',
  title: '정도 비교하기 (원급·비교급 강조)',
  summary: 'as ~ as, 비교급 강조, \'the + 비교급\' 구문과 one·the other 같은 대명사를 익혀 정도를 비교하고 도표 내용을 요약해요.',
  goals: [
    'as + 원급 + as와 not as ~ as로 두 대상의 정도를 비교할 수 있어요.',
    'much, even, far, a lot으로 비교급을 강조하고, the + 비교급, the + 비교급으로 "~할수록 더 …하다"를 말할 수 있어요.',
    'one, that of, those of로 반복을 피하고, one·another·the other(s)로 나누어 가리킬 수 있어요.',
    '도표를 설명하는 글을 읽고 요약하며 자료의 출처를 밝힐 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: 'as + 원급 + as와 not as ~ as',
      body: '두 대상의 정도가 **같을 때**는 **as + 원급 + as**(~만큼 …한/…하게)를 써요. 원급은 -er, -est가 붙지 않은 형용사·부사의 원래 모양이에요.\n\n- Mina is **as tall as** her mother. (미나는 엄마만큼 키가 커요.)\n- He runs **as fast as** his brother. (그는 형만큼 빨리 달려요.)\n\n앞에 not을 붙인 **not as + 원급 + as**는 "~만큼 …하지 않은"이에요. 앞의 것이 정도가 **덜하다**는 뜻이라서 비교급 문장으로 바꿀 수 있어요.\n\n- My bag is **not as heavy as** yours. (내 가방은 네 가방만큼 무겁지 않아.)\n- = Your bag is **heavier than** mine. (네 가방이 내 가방보다 더 무거워.)\n\n> ⚠️ as와 as 사이에는 원급만 와요. as **taller** as(✗) → as **tall** as(○)\n\n> 💡 not as ~ as 대신 not so ~ as라고 쓰기도 해요.',
      easy: '시소를 떠올려 보세요.\n\n- **as ~ as**: 시소가 수평이에요. 두 쪽이 똑같아요. Mina is as tall as her mom. → 키가 같아요.\n- **not as ~ as**: 앞쪽이 가벼워서 올라가 있어요. My bag is not as heavy as yours. → 내 가방이 더 가벼워요.\n\n"같다"를 말할 때는 tall, heavy처럼 아무것도 붙지 않은 원래 모양을 써요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThis box is as [[빈칸]] as that one.',
        choices: ['heavy', 'heavier', 'heaviest'],
        answer: 0,
        why: ['', 'as와 as 사이에는 비교급이 아니라 원급을 써요.', 'as와 as 사이에는 최상급이 아니라 원급을 써요.'],
        explain: 'as + **원급** + as. "이 상자는 저 상자만큼 무거워요."',
      },
    },
    {
      title: '비교급 강조: much, even, far, a lot',
      body: '"훨씬 더 ~한"처럼 차이가 **크다**는 것을 강조할 때는 비교급 앞에 **much, even, far, a lot**을 써요.\n\n- This bag is **much heavier** than that one. (이 가방은 저 가방보다 훨씬 더 무거워요.)\n- Today is **even colder** than yesterday. (오늘은 어제보다 훨씬 더 추워요.)\n- Your idea is **far better** than mine. (네 생각이 내 생각보다 훨씬 더 좋아.)\n- A plane is **a lot faster** than a train. (비행기는 기차보다 훨씬 더 빨라요.)\n\n> ⚠️ **very는 비교급을 꾸미지 못해요.** very는 원급을 꾸며요.\n\n| 원급 | 비교급 |\n|---|---|\n| **very** tall (아주 큰) | **much** taller (훨씬 더 큰) |\n| very tall(○) / much tall(✗) | much taller(○) / very taller(✗) |\n\n긴 형용사의 비교급(more + 원급)도 같아요: much **more** interesting.',
      easy: '비교급(taller, heavier)은 이미 "둘을 견주는" 말이에요. 그 차이를 키우는 확대경이 much, even, far, a lot이에요.\n\nvery는 확대경이 아니라 "아주"라는 꾸밈말이라서 견주는 말(비교급)과는 짝이 안 맞아요.\n\n- 그냥 아주 크다: very tall\n- 견주어서 훨씬 더 크다: much taller',
      check: {
        type: 'ox',
        q: 'My room is very bigger than yours.는 바른 문장이에요.',
        answer: false,
        explain: 'very는 비교급을 꾸미지 못해요. 비교급 bigger를 강조할 때는 much, even, far, a lot을 써요: My room is **much bigger** than yours.',
      },
    },
    {
      title: 'the + 비교급, the + 비교급 (~할수록 더 …하다)',
      body: '**The + 비교급 + 주어 + 동사, the + 비교급 + 주어 + 동사**는 "~하면 할수록 더 …하다"라는 뜻이에요. 한쪽이 커지면 다른 쪽도 함께 변한다는 것을 나타내요.\n\n- **The more** you practice, **the better** you get. (더 많이 연습할수록 더 잘하게 돼요.)\n- **The higher** we climbed, **the colder** it became. (우리가 높이 올라갈수록 더 추워졌어요.)\n- **The sooner**, **the better**. (빠르면 빠를수록 좋아요.) — 짧게 줄여 쓰기도 해요.\n\n비교급과 the를 문장 **맨 앞**으로 꺼낸다는 점이 특징이에요. 보통 문장 You practice more.에서 more를 앞으로 꺼내 The more you practice가 된 거예요.\n\n> ⚠️ 비교급 자리에 원급이나 최상급을 쓰지 않아요. The more you read, the **much** you know.(✗) → the **more** you know.(○)',
      easy: '"먹으면 먹을수록 더 배불러." "자전거 페달을 세게 밟을수록 더 빨라져." 이렇게 한쪽이 변하면 다른 쪽도 따라 변하는 말이에요.\n\n영어로는 두 칸에 모두 **the + 비교급**을 맨 앞에 세워요.\n\n**The harder** you pedal, **the faster** you go.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe more you read, the [[빈칸]] you know.',
        choices: ['more', 'most', 'much'],
        answer: 0,
        why: ['', 'the + 비교급, the + 비교급 구문이에요. 최상급 most가 아니라 비교급 more를 써요.', 'much는 원급이에요. the 뒤에는 비교급 more를 써요.'],
        explain: 'The + 비교급, the + **비교급**. "더 많이 읽을수록 더 많이 알게 돼요."',
      },
    },
    {
      title: '반복을 피하는 one · that of · those of',
      body: '영어는 같은 명사를 되풀이하는 것을 싫어해서, 앞에 나온 명사를 대신하는 말을 써요.\n\n**one / ones**: 앞에 나온 것과 **같은 종류**의 셀 수 있는 명사 (정해지지 않은 것)\n- This cap is too small. Can I see a bigger **one**? (one = cap)\n- I like the red shoes more than the black **ones**. (ones = shoes)\n\n**that of / those of**: 비교하는 문장에서 앞의 명사를 다시 가리킬 때\n- The population of Seoul is larger than **that of** Busan. (that = the population)\n- The ears of a rabbit are longer than **those of** a cat. (those = the ears, 복수)\n\n왜 that of를 쓸까요? 비교는 **같은 종류끼리** 해야 해요. "서울의 인구"는 "부산의 인구"와 견주어야지, 부산이라는 도시 자체와 견주면 안 되지요. 그래서 than Busan이 아니라 than **that of** Busan이라고 해요.\n\n> 💡 앞의 명사가 단수이거나 셀 수 없으면 that, 복수이면 those예요.\n\n> ⚠️ one은 "같은 종류의 다른 하나"예요. 바로 그 물건 자체를 가리킬 때는 it을 써요. I lost my umbrella. I need to buy a new **one**. / I found my umbrella. **It** was under the bed.',
      easy: '같은 말을 두 번 하면 지루하지요. 그래서 영어는 "대신 말해 주는 말"을 써요.\n\n- one: "같은 종류로 하나" — 모자를 보다가 "더 큰 거(one) 있어요?"\n- that of: "~의 그것" — "서울의 인구는 부산의 그것(=인구)보다 많다"\n\nthat of에서 that은 앞에 나온 명사를 그대로 받는 "복사 버튼"이라고 생각하세요. 복수 명사를 받을 때는 those예요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe weather in July is hotter than [[빈칸]] in May.',
        choices: ['that', 'those', 'one'],
        answer: 0,
        why: ['', 'those는 복수 명사를 받아요. weather(날씨)는 셀 수 없는 명사라서 that으로 받아요.', 'one은 셀 수 있는 명사를 대신해요. 셀 수 없는 weather는 that으로 받아요.'],
        explain: '앞의 the weather(셀 수 없는 명사)를 다시 가리키므로 **that**이에요. "7월의 날씨는 5월의 날씨보다 더워요."',
      },
    },
    {
      title: '나누어 가리키는 one · another · the other(s)',
      body: '정해진 몇 개를 하나씩 나누어 말할 때 쓰는 대명사예요.\n\n| 전체 | 나누어 가리키기 |\n|---|---|\n| 둘 | **One** is red, and **the other** is blue. |\n| 셋 | **One** is red, **another** is blue, and **the other** is green. |\n| 여럿 (나머지 전부) | **One** is red, and **the others** are blue. |\n\n- **one**: 처음 하나\n- **another**: 또 다른 하나 (아직 남은 것이 더 있을 때)\n- **the other**: 마지막으로 남은 하나 (정해져 있으니 the)\n- **the others**: 남은 것 전부 (여럿이니 -s, 동사도 복수 are)\n\n- I have two caps. **One** is red, and **the other** is blue.\n- There are three cups. **One** is white, **another** is pink, and **the other** is green.\n- I have five pens. **One** is black, and **the others** are blue.\n\n> 💡 the가 붙으면 "남은 것이 정해져 있다"는 뜻이에요. 마지막 남은 하나 = the other, 남은 것 전부 = the others.',
      easy: '바구니에서 사탕을 하나씩 꺼낸다고 생각해 보세요.\n\n- 처음 꺼낸 하나: **one**\n- 또 하나 꺼냈는데 아직 남아 있으면: **another**\n- 마지막 남은 하나: **the other** ("이것밖에 없다"라서 the)\n- 남은 것을 한꺼번에 다: **the others**',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI have two caps. One is red, and [[빈칸]] is blue.',
        choices: ['the other', 'another', 'others'],
        answer: 0,
        why: ['', 'another는 "또 다른 하나"로, 아직 더 남은 것이 있을 때 써요. 둘 중 마지막 하나는 the other예요.', 'others는 정해지지 않은 여럿을 가리켜요. 뒤에 is가 있고, 둘 중 남은 하나는 the other예요.'],
        explain: '둘 중 하나는 one, 남은 하나는 **the other**예요. "나는 모자가 두 개 있어요. 하나는 빨간색이고 다른 하나는 파란색이에요."',
      },
    },
    {
      title: '도표를 설명하는 글 요약하고 출처 밝히기',
      body: '도표(그래프·표)를 설명하는 글에는 자주 쓰는 표현이 있어요.\n\n| 표현 | 뜻 |\n|---|---|\n| The graph shows ~. | 그래프는 ~을 보여 줘요. |\n| According to the survey, ~. | 그 조사에 따르면 ~. |\n| ~ is the most popular. | ~이 가장 인기 있어요. |\n| A is much more popular than B. | A가 B보다 훨씬 더 인기 있어요. |\n| A is not as popular as B. | A는 B만큼 인기 있지 않아요. |\n\n**요약하는 방법**: 가장 큰 것, 가장 작은 것, 눈에 띄는 차이를 이 단원의 비교 표현으로 한두 문장에 담아요.\n\n**출처 밝히기**: 남이 조사한 자료를 쓸 때는 어디서 나온 자료인지 꼭 밝혀요. 읽는 사람이 자료를 믿고 확인할 수 있고, 자료를 만든 사람의 노력을 존중하는 일이에요.\n\n- **According to** a survey by our student council, ~.\n- **Source:** our class survey (25 students)\n\n> ⚠️ 출처 없이 숫자만 쓰면 읽는 사람은 그 자료를 믿어도 되는지 알 수 없어요.',
      easy: '도표 글은 "누가 1등, 누가 꼴찌, 차이가 얼마나?"를 말로 옮긴 거예요.\n\n- 1등: ~ is the most popular.\n- 차이가 크면: much more popular than ~\n- 비슷하면: as popular as ~\n\n그리고 "이 숫자는 어디서 왔어요"를 밝히는 것이 출처예요. 친구에게 들은 말을 전할 때 "지아가 그러는데~" 하고 말하는 것과 같아요.',
      check: {
        type: 'choice',
        q: 'According to the survey의 뜻으로 알맞은 것을 고르세요.',
        choices: ['그 조사에 따르면', '그 조사와 반대로', '그 조사를 만들기 위해'],
        answer: 0,
        why: ['', 'according to는 "~에 따르면"이에요. 반대한다는 뜻이 아니에요.', 'according to는 목적(~하기 위해)이 아니라 "~에 따르면"이에요.'],
        explain: '**according to** ~는 "~에 따르면"이에요. 자료의 출처를 밝힐 때 자주 써요.',
      },
    },
  ],

  examples: [
    {
      q: '우리말에 맞게 영어로 나타내세요.\n\n지호의 휴대 전화는 내 것보다 훨씬 더 새것이에요.',
      steps: [
        '"더 새것이다"는 new의 비교급 newer예요.',
        '"훨씬"은 비교급 앞에 much(또는 even, far, a lot)를 써요. very는 쓰지 않아요.',
        '"내 것"은 mine으로 반복을 피해요.',
      ],
      answer: 'Jiho\'s phone is **much newer** than mine.',
    },
    {
      q: '빈칸에 알맞은 말을 쓰세요.\n\nI have three pencils. One is long, [[빈칸]] is short, and the other is broken.',
      steps: [
        '전체는 셋이에요. 처음 하나는 One이에요.',
        '빈칸 다음에도 하나(the other)가 남아 있어요. 그러니 빈칸은 "또 다른 하나"예요.',
        '"또 다른 하나"는 another예요.',
      ],
      answer: 'One is long, **another** is short, and the other is broken.',
    },
  ],

  terms: [
    { term: '원급', def: '-er, -est나 more, most가 붙지 않은 형용사·부사의 원래 모양이에요. 예: tall, fast, popular' },
    { term: '비교급', def: '둘을 견주어 "더 ~한"을 나타내는 모양이에요. 예: taller, faster, more popular' },
    { term: '비교급 강조', def: '비교급 앞에 much, even, far, a lot을 써서 "훨씬 더"를 나타내는 것이에요. very는 쓰지 않아요.' },
    { term: 'as ~ as', def: '"~만큼 …한"을 나타내는 원급 비교예요. 예: as tall as. not as ~ as는 "~만큼 …하지 않은"이에요.' },
    { term: 'the other', def: '정해진 것 가운데 마지막으로 남은 하나예요. 남은 것이 여럿이면 the others예요.' },
    { term: '출처', def: '자료가 나온 곳이에요. 글에 남의 자료를 쓸 때 According to ~, Source: ~로 밝혀요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nMinho is as [[빈칸]] as his father.',
      choices: ['tall', 'taller', 'tallest', 'more tall'],
      answer: 0,
      why: [
        '',
        'as와 as 사이에는 비교급이 아니라 원급을 써요.',
        'as와 as 사이에는 최상급이 아니라 원급을 써요.',
        'as와 as 사이에는 원급을 써요. tall의 비교급도 more tall이 아니라 taller예요.',
      ],
      explain: 'as + **원급** + as: as tall as. "민호는 아버지만큼 키가 커요."',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n내 가방은 네 가방만큼 무겁지 않아.\nMy bag is not as [[빈칸]] as yours.',
      answer: ['heavy'],
      wrong: [
        { a: 'heavier', why: 'as와 as 사이에는 원급을 써요. heavier는 비교급이에요.' },
        { a: 'heaviest', why: 'as와 as 사이에는 원급을 써요. heaviest는 최상급이에요.' },
      ],
      explain: 'not as + **원급** + as: not as heavy as. = Your bag is heavier than mine.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 수 **없는** 말을 고르세요.\n\nThis bike is [[빈칸]] faster than mine.',
      choices: ['very', 'much', 'even', 'far'],
      answer: 0,
      why: [
        '',
        'much는 비교급을 강조해요. much faster(훨씬 더 빠른)는 바른 말이에요.',
        'even은 비교급을 강조해요. even faster는 바른 말이에요.',
        'far는 비교급을 강조해요. far faster는 바른 말이에요.',
      ],
      explain: '비교급 faster 앞에는 much, even, far, a lot이 올 수 있어요. **very**는 비교급을 꾸미지 못해요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: 'The older he got, the wiser he became.은 "그는 나이가 들수록 더 현명해졌다."라는 뜻이에요.',
      answer: true,
      explain: 'the + 비교급(older), the + 비교급(wiser)은 "~할수록 더 …하다"예요. "그는 나이가 들수록 더 현명해졌어요."',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI have two brothers. One is a student, and [[빈칸]] is a teacher.',
      choices: ['the other', 'another', 'others', 'the others'],
      answer: 0,
      why: [
        '',
        'another는 아직 더 남은 것이 있을 때 써요. 둘 중 남은 하나는 the other예요.',
        'others는 정해지지 않은 여럿이에요. 둘 중 남은 하나는 the other예요.',
        'the others는 남은 것이 여럿일 때 써요. 남은 형은 한 명이에요.',
      ],
      explain: '둘 중 하나는 one, 남은 하나는 **the other**예요. "나는 형이 두 명 있어요. 한 명은 학생이고 다른 한 명은 선생님이에요."',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI lost my umbrella yesterday. I need to buy a new [[빈칸]].',
      choices: ['one', 'it', 'that', 'ones'],
      answer: 0,
      why: [
        '',
        'it은 잃어버린 바로 그 우산을 가리켜요. 새로 살 것은 같은 종류의 다른 우산이라 one이에요. 또 a new 뒤에 it은 올 수 없어요.',
        'that은 a new 뒤에 오지 않아요. 같은 종류의 하나는 one이에요.',
        'ones는 복수예요. a new 뒤에는 단수 one이 와요.',
      ],
      explain: '잃어버린 그 우산이 아니라 **같은 종류의 새 우산 하나**이므로 **one**이에요. "어제 우산을 잃어버렸어요. 새것을 하나 사야 해요."',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 1,
      q: '우리말에 맞게 빈칸에 알맞은 말을 쓰세요.\n\n오늘은 어제보다 훨씬 더 추워요.\nToday is [[빈칸]] colder than yesterday.',
      answer: ['much', 'even', 'far', 'still', 'a lot'],
      wrong: [
        { a: 'very', why: 'very는 비교급을 꾸미지 못해요. much, even, far, a lot을 써요.' },
        { a: 'more', why: 'colder가 이미 비교급이에요. more를 또 붙이지 않아요. "훨씬"은 much, even, far, a lot이에요.' },
      ],
      explain: '비교급 colder를 강조하는 **much**(또는 even, far, a lot, still)를 써요. very는 쓸 수 없어요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 2,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n더 많이 연습할수록 너는 더 잘하게 될 거야.',
      choices: ['The more', 'you practice,', 'the better', 'you will get.'],
      answer: [0, 1, 2, 3],
      hint: 'The + 비교급 + 주어 + 동사, the + 비교급 + 주어 + 동사 순서예요.',
      explain: '**The more** you practice, **the better** you will get. 두 칸 모두 the + 비교급이 맨 앞에 와요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThe population of Seoul is larger than [[빈칸]] of Busan.',
      choices: ['that', 'those', 'one', 'it'],
      answer: 0,
      why: [
        '',
        'those는 복수 명사를 받아요. the population은 단수라서 that이에요.',
        'one은 정해지지 않은 같은 종류의 하나예요. "부산의 인구"처럼 of와 함께 앞의 명사를 다시 가리킬 때는 that이에요.',
        'it은 앞의 바로 그것(서울의 인구)을 가리켜요. 부산의 인구는 다른 것이라 that of를 써요.',
      ],
      hint: '빈칸은 "부산의 무엇"과 서울의 인구를 비교하고 있나요?',
      explain: '서울의 인구를 부산의 **인구**와 비교하므로, the population을 다시 받는 **that**을 써요. "서울의 인구는 부산의 인구보다 많아요."',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThere are three cups on the table. One is white, [[빈칸]] is pink, and the other is green.',
      choices: ['another', 'the other', 'other', 'the others'],
      answer: 0,
      why: [
        '',
        'the other는 마지막 남은 하나예요. 문장 끝에 the other가 따로 있으니 가운데는 another예요.',
        'other는 혼자 주어로 쓰지 않아요. "또 다른 하나"는 another예요.',
        'the others는 남은 것 전부(여럿)예요. 뒤에 is가 있고, 아직 하나가 더 남았어요.',
      ],
      hint: '셋 중 첫째는 one, 마지막은 the other예요. 가운데는요?',
      explain: '셋을 나누어 말할 때는 one → **another** → the other예요. "탁자 위에 컵이 세 개 있어요. 하나는 흰색, 또 하나는 분홍색, 나머지 하나는 초록색이에요."',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 5,
      q: '그래프의 내용과 **일치하는** 문장을 고르세요.',
      fig: { type: 'bars', labels: ['Soccer', 'Basketball', 'Baseball', 'Badminton'], values: [40, 25, 20, 15], unit: '명', title: '좋아하는 운동 (학생 100명, 가상의 자료)' },
      choices: [
        'Soccer is much more popular than badminton.',
        'Baseball is as popular as basketball.',
        'Badminton is more popular than baseball.',
        'Basketball is the most popular sport.',
      ],
      answer: 0,
      why: [
        '',
        '야구는 20명, 농구는 25명이에요. 같지 않아요.',
        '배드민턴은 15명, 야구는 20명이에요. 배드민턴이 더 적어요.',
        '가장 인기 있는 운동은 40명이 고른 축구예요.',
      ],
      hint: '막대의 길이(학생 수)를 하나씩 비교해 보세요.',
      explain: '축구는 40명, 배드민턴은 15명으로 차이가 커요. 그래서 "축구는 배드민턴보다 **훨씬 더** 인기 있다"가 맞아요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 0,
      q: '다음 문장과 뜻이 같은 것을 고르세요.\n\nJiho is not as tall as Minsu.',
      choices: [
        'Minsu is taller than Jiho.',
        'Jiho is taller than Minsu.',
        'Jiho is as tall as Minsu.',
        'Minsu is not as tall as Jiho.',
      ],
      answer: 0,
      why: [
        '',
        '반대예요. 지호가 민수만큼 크지 않으니, 지호가 더 작아요.',
        'not as ~ as는 "~만큼 …하지 않은"이에요. 키가 같다는 뜻이 아니에요.',
        '반대예요. 민수가 지호보다 더 커요.',
      ],
      hint: 'not as ~ as는 앞의 사람이 정도가 덜하다는 뜻이에요.',
      explain: '"지호는 민수만큼 키가 크지 않다" = "민수가 지호보다 키가 더 크다". **Minsu is taller than Jiho.**',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '어법상 **어색한** 문장을 고르세요.',
      choices: [
        'This test was very easier than the last one.',
        'My dog is as small as a cat.',
        'Your idea is far better than mine.',
        'The more I learn, the more I want to know.',
      ],
      answer: 0,
      why: [
        '',
        'as + 원급(small) + as — 바른 문장이에요.',
        'far + 비교급(better) — 바른 문장이에요.',
        'the + 비교급, the + 비교급 — 바른 문장이에요.',
      ],
      hint: '비교급 앞에 올 수 있는 강조어를 떠올려 보세요.',
      explain: 'very는 비교급을 꾸미지 못해요. very easier → **much(even, far, a lot) easier**로 고쳐야 해요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
      q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n날이 어두워질수록 더 추워졌어요.\nThe darker it got, the [[빈칸]] it became.',
      answer: ['colder'],
      wrong: [
        { a: 'more cold', why: 'cold는 짧은 형용사라서 비교급이 colder예요. more cold라고 쓰지 않아요.' },
        { a: 'cold', why: 'the 뒤에는 비교급을 써요. cold의 비교급은 colder예요.' },
        { a: 'coldest', why: 'the + 비교급, the + 비교급 구문이에요. 최상급이 아니라 비교급 colder를 써요.' },
      ],
      hint: '앞부분 The darker처럼 뒷부분도 the + 비교급이에요.',
      explain: 'The + 비교급(darker) + 주어 + 동사, the + 비교급(**colder**) + 주어 + 동사.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '빈칸 (A), (B), (C)에 들어갈 말을 차례대로 고르세요.\n\nI have three pets. (A) [[빈칸]] is a dog, (B) [[빈칸]] is a cat, and (C) [[빈칸]] is a hamster.',
      choices: ['One – another – the other', 'One – the other – another', 'One – other – the others', 'One – another – the others'],
      answer: 0,
      why: [
        '',
        'the other는 마지막 남은 하나예요. 가운데에 쓰면 그 뒤에 남은 것이 없어야 하는데 (C)가 남아 있어요.',
        'other는 혼자 주어로 쓰지 않고, the others는 남은 것이 여럿일 때 써요.',
        '(C)는 마지막 남은 하나(햄스터 한 마리)예요. the others가 아니라 the other예요.',
      ],
      hint: '셋을 차례로 나누어 말하는 순서를 떠올려 보세요.',
      explain: '셋을 나누어 말할 때: **One**(처음 하나) → **another**(또 다른 하나) → **the other**(마지막 남은 하나).',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '그래프를 보고, 내용을 가장 잘 요약하고 출처도 밝힌 문장을 고르세요.',
      fig: { type: 'bars', labels: ['Walk', 'Bus', 'Bike', 'Car'], values: [45, 30, 15, 10], unit: '%', title: '우리 학교 학생들의 등교 방법 (학생회 설문, 가상의 자료)' },
      choices: [
        'According to our student council\'s survey, walking is the most common way to get to school, and it is far more common than going by car.',
        'According to our student council\'s survey, more students go to school by car than by bus.',
        'Going to school by bike is as common as going by bus.',
        'Walking to school is not as common as taking the bus.',
      ],
      answer: 0,
      why: [
        '',
        '출처는 밝혔지만 내용이 틀렸어요. 자동차는 10%, 버스는 30%예요.',
        '자전거는 15%, 버스는 30%로 같지 않아요. 출처도 밝히지 않았어요.',
        '걷기는 45%, 버스는 30%로 걷기가 더 많아요. 출처도 밝히지 않았어요.',
      ],
      hint: '두 가지를 확인해요: 그래프와 맞는가? According to로 출처를 밝혔는가?',
      explain: '걷기가 45%로 가장 많고, 자동차(10%)보다 훨씬 많아요. 이 내용을 비교급 강조(far more common)로 담고, **According to** our student council\'s survey로 출처도 밝힌 첫째 문장이 가장 알맞아요.',
    },
  ],

  deeper: [
    {
      title: '몇 배인지 말하기: twice as ~ as',
      body: 'as ~ as 앞에 횟수를 나타내는 말을 붙이면 **몇 배**인지 말할 수 있어요.\n\n- My room is **twice as big as** yours. (내 방은 네 방보다 두 배 커요.)\n- This bridge is **three times as long as** that one. (이 다리는 저 다리보다 세 배 길어요.)\n\ntwice는 "두 배", three times는 "세 배"예요. 도표를 설명하는 글에서 이 표현을 쓰면 차이를 정확하게 전할 수 있어요. 예를 들어 등교 방법 그래프에서 걷기가 30%, 자전거가 15%라면 Walking is **twice as common as** biking.이라고 할 수 있어요.\n\n이번 단원에서 배운 것을 모으면 정도를 아주 섬세하게 말할 수 있어요.\n\n| 표현 | 차이 |\n|---|---|\n| as popular as | 같아요 |\n| a little more popular than | 조금 더 |\n| much more popular than | 훨씬 더 |\n| twice as popular as | 두 배 |',
    },
  ],

  faq: [
    {
      q: 'very랑 much는 뭐가 달라요?',
      a: 'very는 원급을 꾸며서 "아주 ~한"(very tall), much는 비교급을 꾸며서 "훨씬 더 ~한"(much taller)이에요. very taller나 much tall은 틀린 말이에요. 비교급 앞에는 much, even, far, a lot을 쓴다고 기억하세요.',
    },
    {
      q: 'that of는 왜 써요? 그냥 than Busan 하면 안 돼요?',
      a: '비교는 같은 종류끼리 해야 해요. The population of Seoul is larger than Busan.이라고 하면 "서울의 인구"를 "부산이라는 도시"와 견주는 셈이라 논리가 어긋나요. that of Busan(부산의 인구)이라고 해야 인구끼리 비교하게 돼요.',
    },
    {
      q: 'another랑 the other는 어떻게 달라요?',
      a: 'another는 "또 다른 하나"로, 그 뒤에도 아직 남은 것이 있을 때 써요. the other는 "마지막 남은 하나"로, 더 남은 것이 없을 때 써요. 둘을 나누면 one과 the other, 셋을 나누면 one, another, the other예요.',
    },
    {
      q: '도표 글에서 출처는 왜 밝혀야 해요?',
      a: '출처를 밝히면 읽는 사람이 자료를 믿고 직접 확인할 수 있어요. 또 자료를 조사한 사람의 노력을 존중하는 일이기도 해요. According to ~나 Source: ~로 짧게 밝히면 돼요.',
    },
  ],

  mistakes: [
    'very로 비교급을 꾸미는 실수 — very taller(✗) → much(even, far, a lot) taller(○)',
    'as ~ as 사이에 비교급을 쓰는 실수 — as taller as(✗) → as tall as(○)',
    '둘 중 남은 하나에 another를 쓰는 실수 — One is red, and another is blue.(둘일 때 ✗) → the other is blue(○)',
  ],

  gens: [
    {
      id: 'as-as',
      level: 1,
      title: 'as + 원급 + as 고르기',
      make: function (R) {
        // [앞부분, 원급, 비교급, 최상급, 뒷부분, 우리말]
        var items = [
          ['Mina is', 'tall', 'taller', 'tallest', 'her mother', '미나는 엄마만큼 키가 커요'],
          ['He runs', 'fast', 'faster', 'fastest', 'his brother', '그는 형만큼 빨리 달려요'],
          ['This box is', 'heavy', 'heavier', 'heaviest', 'that one', '이 상자는 저 상자만큼 무거워요'],
          ['My dog is', 'small', 'smaller', 'smallest', 'a cat', '우리 개는 고양이만큼 작아요'],
          ['This book is', 'interesting', 'more interesting', 'most interesting', 'the movie', '이 책은 그 영화만큼 재미있어요'],
          ['Badminton is', 'popular', 'more popular', 'most popular', 'baseball in my class', '우리 반에서 배드민턴은 야구만큼 인기 있어요'],
          ['Today is', 'cold', 'colder', 'coldest', 'yesterday', '오늘은 어제만큼 추워요'],
          ['Jiho speaks English', 'well', 'better', 'best', 'his teacher', '지호는 선생님만큼 영어를 잘해요'],
          ['My room is', 'big', 'bigger', 'biggest', 'yours', '내 방은 네 방만큼 커요'],
          ['This problem is', 'difficult', 'more difficult', 'most difficult', 'the last one', '이 문제는 지난 문제만큼 어려워요'],
          ['Seojun gets up', 'early', 'earlier', 'earliest', 'his dad', '서준이는 아빠만큼 일찍 일어나요'],
          ['The river is', 'long', 'longer', 'longest', 'that road', '그 강은 저 길만큼 길어요'],
          ['My phone is not', 'new', 'newer', 'newest', 'yours', '내 휴대 전화는 네 것만큼 새것이 아니에요'],
          ['This bag is not', 'cheap', 'cheaper', 'cheapest', 'that one', '이 가방은 저 가방만큼 싸지 않아요'],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var reason = {};
        reason[it[2]] = 'as와 as 사이에는 비교급이 아니라 원급을 써요.';
        reason[it[3]] = 'as와 as 사이에는 최상급이 아니라 원급을 써요.';
        reason['very ' + it[1]] = 'as와 as 사이에는 원급만 써요. very를 넣지 않아요.';
        var pick = R.choices(correct, [it[2], it[3], 'very ' + it[1]], 4);
        return {
          type: 'choice', concept: 0,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[5] + '.\n' + it[0] + ' as [[빈칸]] as ' + it[4] + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: 'as + **원급** + as: ' + it[0] + ' as **' + it[1] + '** as ' + it[4] + '.',
        };
      },
    },
    {
      id: 'comparative-intensifier',
      level: 1,
      title: '비교급을 강조하는 말 고르기',
      make: function (R) {
        // [앞부분, 비교급, 뒷부분, 우리말]
        var items = [
          ['This bag is', 'heavier', 'than that one', '이 가방은 저 가방보다 훨씬 더 무거워요'],
          ['Today is', 'colder', 'than yesterday', '오늘은 어제보다 훨씬 더 추워요'],
          ['Your idea is', 'better', 'than mine', '네 생각이 내 생각보다 훨씬 더 좋아'],
          ['A plane is', 'faster', 'than a train', '비행기는 기차보다 훨씬 더 빨라요'],
          ['This movie is', 'more exciting', 'than the book', '이 영화는 그 책보다 훨씬 더 신나요'],
          ['Seoul is', 'bigger', 'than my hometown', '서울은 내 고향보다 훨씬 더 커요'],
          ['My brother is', 'taller', 'than me', '우리 형은 나보다 훨씬 더 키가 커요'],
          ['The new phone is', 'more expensive', 'than the old one', '새 휴대 전화는 예전 것보다 훨씬 더 비싸요'],
          ['This test was', 'easier', 'than the last one', '이번 시험은 지난번보다 훨씬 더 쉬웠어요'],
          ['Jia sings', 'better', 'than I do', '지아는 나보다 노래를 훨씬 더 잘해요'],
          ['The sun is', 'larger', 'than the moon', '태양은 달보다 훨씬 더 커요'],
          ['Walking is', 'healthier', 'than taking a taxi', '걷는 것이 택시를 타는 것보다 훨씬 더 건강에 좋아요'],
        ];
        var it = R.pick(items);
        var correct = R.pick(['much', 'even', 'far', 'a lot']);
        var reason = {
          very: 'very는 원급을 꾸며요. 비교급을 강조할 때는 much, even, far, a lot을 써요.',
          most: 'most는 최상급을 만드는 말이에요. 비교급을 강조하는 말이 아니에요.',
          so: 'so는 원급을 꾸며요(so tall). 비교급 앞에는 much, even, far, a lot을 써요.',
        };
        var pick = R.choices(correct, ['very', 'most', 'so'], 4);
        return {
          type: 'choice', concept: 1,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[3] + '.\n' + it[0] + ' [[빈칸]] ' + it[1] + ' ' + it[2] + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '"훨씬 더"는 비교급(' + it[1] + ') 앞에 much, even, far, a lot을 써요. 보기 가운데에서는 **' + correct + '**예요. very는 비교급을 꾸미지 못해요.',
        };
      },
    },
    {
      id: 'one-another-other',
      level: 2,
      title: 'one · another · the other(s)로 나누어 가리키기',
      make: function (R) {
        // [복수 명사, 우리말 명사]
        var things = [['caps', '모자'], ['bags', '가방'], ['pens', '펜'], ['cups', '컵'], ['balloons', '풍선'], ['umbrellas', '우산'], ['T-shirts', '티셔츠'], ['notebooks', '공책']];
        var colors = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'pink'];
        var th = R.pick(things);
        var c = R.sample(colors, 3);
        var kind = R.pick(['two', 'three-mid', 'three-last', 'many']);
        var q;
        var correct;
        var expl;
        var reason;
        if (kind === 'two') {
          q = 'I have two ' + th[0] + '. One is ' + c[0] + ', and [[빈칸]] is ' + c[1] + '.';
          correct = 'the other';
          expl = '둘 중 하나는 one, 남은 하나는 **the other**예요.';
          reason = {
            another: 'another는 "또 다른 하나"로, 아직 더 남은 것이 있을 때 써요. 둘 중 남은 하나는 the other예요.',
            'the others': 'the others는 남은 것이 여럿일 때 써요(뒤에 are). 둘 중 남은 것은 하나예요.',
            others: 'others는 정해지지 않은 여럿이에요. 둘 중 남은 하나는 the other예요.',
          };
        } else if (kind === 'three-mid') {
          q = 'I have three ' + th[0] + '. One is ' + c[0] + ', [[빈칸]] is ' + c[1] + ', and the other is ' + c[2] + '.';
          correct = 'another';
          expl = '셋을 나눌 때는 one → **another** → the other예요. 뒤에 마지막 하나(the other)가 남아 있으니 가운데는 another예요.';
          reason = {
            'the other': 'the other는 마지막 남은 하나예요. 문장 끝에 the other가 따로 있으니 가운데는 another예요.',
            'the others': 'the others는 남은 것 전부(여럿)예요. 뒤에 is가 있고, 아직 하나가 더 남아 있어요.',
            others: 'others는 여럿을 가리켜요. 뒤에 is가 있으니 하나를 가리키는 another예요.',
          };
        } else if (kind === 'three-last') {
          q = 'I have three ' + th[0] + '. One is ' + c[0] + ', another is ' + c[1] + ', and [[빈칸]] is ' + c[2] + '.';
          correct = 'the other';
          expl = '셋을 나눌 때는 one → another → **the other**예요. 마지막 남은 하나는 정해져 있으므로 the를 붙여요.';
          reason = {
            another: 'another는 아직 더 남은 것이 있을 때 써요. 셋 중 마지막 남은 하나는 the other예요.',
            'the others': 'the others는 남은 것이 여럿일 때 써요. 마지막 남은 것은 하나예요.',
            others: 'others는 정해지지 않은 여럿이에요. 마지막 남은 하나는 the other예요.',
          };
        } else {
          q = 'I have five ' + th[0] + '. One is ' + c[0] + ', and [[빈칸]] are ' + c[1] + '.';
          correct = 'the others';
          expl = '하나를 빼고 **남은 것 전부**(넷)는 the others예요. 여럿이라 동사도 are를 써요.';
          reason = {
            'the other': 'the other는 남은 것이 하나일 때 써요. 남은 것이 넷이고 뒤에 are가 있으니 the others예요.',
            another: 'another는 "또 다른 하나"예요. 남은 넷 전부는 the others예요.',
            others: 'others는 정해지지 않은 일부예요. 남은 것 전부는 the를 붙여 the others예요.',
          };
        }
        var wrongs = ['the other', 'another', 'the others', 'others'].filter(function (w) { return w !== correct; });
        var pick = R.choices(correct, wrongs, 4);
        return {
          type: 'choice', concept: 4,
          q: '빈칸에 알맞은 말을 고르세요. (' + th[1] + ')\n\n' + q,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === correct ? '' : reason[x]; }),
          explain: expl,
        };
      },
    },
  ],

  vocab: [
    { w: 'population', m: '인구', ex: 'The population of this city is growing.', exm: '이 도시의 인구는 늘고 있어요.' },
    { w: 'compare', m: '비교하다', ex: 'Let\'s compare the two graphs.', exm: '두 그래프를 비교해 봅시다.' },
    { w: 'survey', m: '(설문) 조사', ex: 'We did a survey about our favorite snacks.', exm: '우리는 좋아하는 간식에 대해 설문 조사를 했어요.' },
    { w: 'graph', m: '그래프', ex: 'The graph shows how students get to school.', exm: '그래프는 학생들이 어떻게 등교하는지 보여 줘요.' },
    { w: 'source', m: '출처, 원천', ex: 'Always write the source of your data.', exm: '자료의 출처를 항상 쓰세요.' },
    { w: 'percent', m: '퍼센트', ex: 'Forty percent of the students like soccer.', exm: '학생의 40퍼센트가 축구를 좋아해요.' },
    { w: 'popular', m: '인기 있는', ex: 'Soccer is much more popular than tennis in my class.', exm: '우리 반에서 축구는 테니스보다 훨씬 더 인기 있어요.' },
    { w: 'increase', m: '늘다, 증가하다', ex: 'The number of bike riders increased.', exm: '자전거 타는 사람의 수가 늘었어요.' },
    { w: 'decrease', m: '줄다, 감소하다', ex: 'The number of cars on the road decreased.', exm: '도로 위 자동차의 수가 줄었어요.' },
    { w: 'twice', m: '두 배; 두 번', ex: 'My room is twice as big as yours.', exm: '내 방은 네 방보다 두 배 커요.' },
    { w: 'data', m: '자료, 데이터', ex: 'We collected data from 100 students.', exm: '우리는 학생 100명에게서 자료를 모았어요.' },
    { w: 'according to', m: '~에 따르면', ex: 'According to the survey, walking is the most common way to school.', exm: '그 조사에 따르면 걷기가 가장 흔한 등교 방법이에요.' },
    { w: 'common', m: '흔한, 공통의', ex: 'Kim is a common family name in Korea.', exm: '김은 한국에서 흔한 성이에요.' },
  ],
});
