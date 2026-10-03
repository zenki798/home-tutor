/* 중1 영어 · 비교하여 말하기 (비교급·최상급) */
Tutor.registerUnit({
  id: 'eng-m1-07',
  course: 'eng-m1',
  title: '비교하여 말하기 (비교급·최상급)',
  summary: '비교급과 최상급을 만드는 규칙을 익혀 여러 대상을 비교하고, 표나 그래프의 내용을 설명해요.',
  goals: [
    '형용사·부사의 비교급과 최상급을 규칙에 맞게 만들 수 있어요.',
    '비교급 + than으로 두 대상을, the + 최상급으로 셋 이상 가운데 가장 ~한 것을 말할 수 있어요.',
    '더 좋아하는 것을 묻고 답할 수 있어요.',
    '표나 그래프를 읽고 비교하는 문장으로 설명할 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '비교급·최상급 만들기',
      body: '형용사나 부사의 원래 모양을 **원급**, "더 ~한"을 **비교급**, "가장 ~한"을 **최상급**이라고 해요. 만드는 규칙은 낱말 모양에 따라 달라요.\n\n| 낱말 모양 | 규칙 | 예 |\n|---|---|---|\n| 대부분의 짧은 낱말 | -er / -est | tall - taller - tallest |\n| -e로 끝남 | -r / -st | large - larger - largest |\n| 자음 + y로 끝남 | y를 i로 바꾸고 -er / -est | easy - easier - easiest |\n| 짧은 모음 하나 + 자음 하나로 끝남 | 자음을 한 번 더 쓰고 -er / -est | big - bigger - biggest |\n| 대부분의 2음절 이상 낱말 | more / most + 원급 | beautiful - more beautiful - most beautiful |\n\n몇몇 낱말은 규칙을 따르지 않는 **불규칙 변화**예요. 꼭 외워 두세요.\n\n| 원급 | 비교급 | 최상급 |\n|---|---|---|\n| good / well | better | best |\n| bad | worse | worst |\n| many / much | more | most |\n| little | less | least |\n\n> ⚠️ 2음절이어도 자음 + y로 끝나는 낱말(happy, busy, heavy, easy)은 more가 아니라 -ier / -iest예요.',
      easy: '"키가 큰" 세 친구를 떠올려 보세요. 민수는 **tall**(크다), 지아는 민수보다 **taller**(더 크다), 서준이는 셋 중에서 **tallest**(가장 크다)예요.\n\n짧은 낱말은 꼬리 -er, -est를 붙이고, 긴 낱말(beautiful, expensive)은 꼬리를 붙이면 너무 길어지니 앞에 more, most를 붙여요. 좋은 것(good)은 꼬리 대신 아예 새 낱말 better, best로 바뀌어요.',
      check: {
        type: 'choice',
        q: 'big의 비교급으로 알맞은 것을 고르세요.',
        choices: ['bigger', 'biger', 'more big'],
        answer: 0,
        why: ['', 'big은 짧은 모음 하나(i) + 자음 하나(g)로 끝나서 g를 한 번 더 써요.', 'big은 1음절의 짧은 낱말이라 more를 쓰지 않고 -er을 붙여요.'],
        explain: 'big은 짧은 모음 i 하나와 자음 g 하나로 끝나므로 자음을 한 번 더 쓰고 -er을 붙여요: big → **bigger** → biggest',
      },
    },
    {
      title: '비교급 + than: 두 대상 비교하기',
      body: '두 대상을 비교할 때는 **A + 동사 + 비교급 + than + B** 꼴로 써요. "A는 B보다 더 ~해요"라는 뜻이에요.\n\n- My brother is **taller than** me. (우리 형은 나보다 키가 더 커요.)\n- This bag is **more expensive than** that one. (이 가방은 저것보다 더 비싸요.)\n- A cheetah runs **faster than** a lion. (치타는 사자보다 더 빨리 달려요.)\n\nthan 뒤에는 비교하는 **상대**가 와요. that one의 one은 앞에 나온 bag을 다시 말하지 않으려고 쓴 말이에요.\n\n> ⚠️ more와 -er을 함께 쓰지 않아요. more taller(✗), more expensiver(✗)\n\n> 💡 비교급 앞에 the를 붙이지 않아요. the taller than(✗)',
      easy: '시소를 떠올려 보세요. 시소 양쪽에 A와 B가 앉아 있고, 가운데 받침이 **than**이에요.\n\n"A가 더 무거워요"라고 할 때 A is **heavier than** B.라고 하지요. than은 "~보다"이고, 그 앞의 낱말은 꼭 "더 ~한" 모양(비교급)이어야 해요.',
      check: {
        type: 'ox',
        q: 'Minsu is more tall than Jia.는 바른 문장이에요.',
        answer: false,
        explain: 'tall은 짧은 낱말이라 -er을 붙여 taller로 써요. 바른 문장은 Minsu is **taller** than Jia.(민수는 지아보다 키가 더 커요.)예요.',
      },
    },
    {
      title: 'the + 최상급 + in / of: 가장 ~한',
      body: '셋 이상 가운데 "가장 ~한"을 말할 때는 **the + 최상급**을 써요. 범위는 in이나 of로 나타내요.\n\n| 범위 | 쓰는 말 | 예문 |\n|---|---|---|\n| 장소·무리(하나의 집단) | **in** + 단수 명사 | Junho is **the tallest** boy **in** my class. |\n| 여럿 가운데 | **of** + 복수 명사·수 | This is **the biggest** box **of** the three. |\n\n- Winter is **the coldest** season **of** the year. (한 해의 여러 계절 가운데)\n- She is **the best** singer **in** our school.\n\n> 💡 in 뒤에는 "my class, the world, Korea"처럼 한 덩어리 장소나 집단이, of 뒤에는 "the three, all the students"처럼 여럿이 와요. of the year, of the week도 "한 해(한 주)를 이루는 여러 계절·날 가운데"라는 뜻이라 of를 써요.',
      easy: '달리기 경주의 시상대를 생각해 보세요. 1등은 딱 한 명이라서 정해진 하나를 가리키는 **the**를 붙여요: the fastest.\n\n그리고 "어디에서 1등이야?"를 말해 줘요. 우리 반이라는 한 곳에서라면 **in** my class, 다섯 명 가운데라면 **of** the five예요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nHe is the tallest [[빈칸]] the four boys.',
        choices: ['of', 'in', 'than'],
        answer: 0,
        why: ['', 'in 뒤에는 my class처럼 한 덩어리 장소나 집단이 와요. the four boys는 여럿이에요.', 'than은 비교급과 함께 써요. 최상급의 범위는 in이나 of로 나타내요.'],
        explain: 'the four boys(네 명의 소년들)처럼 여럿 가운데를 말할 때는 **of**를 써요. He is the tallest of the four boys.(그는 네 소년 가운데 키가 가장 커요.)',
      },
    },
    {
      title: '더 좋아하는 것 묻고 답하기',
      body: '두 가지 가운데 무엇을 더 좋아하는지 물을 때 이렇게 말해요.\n\n| 묻기 | 답하기 |\n|---|---|\n| **Which do you prefer, A or B?** | **I prefer A to B.** (나는 B보다 A가 더 좋아요.) |\n| **Which do you like better, A or B?** | **I like A better (than B).** |\n\n- A: Which do you prefer, summer or winter?\n- B: I **prefer** summer **to** winter. I love swimming.\n\nprefer는 "~을 더 좋아하다"라는 뜻이라 낱말 자체에 "더"가 들어 있어요. 그래서 비교급이나 than을 쓰지 않고, 비교 상대 앞에 **to**를 써요. 이 to는 전치사라서 뒤에 명사나 동명사가 와요: I prefer swimming **to** running.\n\n셋 이상에서 가장 좋아하는 것은 **Which do you like best?** / **I like A best.**로 말해요.',
      easy: 'prefer를 "더 좋아"라는 한 덩어리로 기억하세요. 그러면 "더"를 또 쓸 필요가 없겠지요.\n\nI prefer **apples to bananas**.는 "나는 사과를 바나나보다 더 좋아해요"예요. "~보다"를 than이 아니라 to로 말하는 것만 기억하면 돼요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI prefer tea [[빈칸]] coffee.',
        choices: ['to', 'than', 'for'],
        answer: 0,
        why: ['', 'than은 비교급과 짝이에요. prefer A to B처럼 prefer는 to와 짝이에요.', 'prefer A for B라는 표현은 없어요. 비교 상대 앞에는 to를 써요.'],
        explain: 'prefer A to B는 "B보다 A를 더 좋아하다"예요. I prefer tea **to** coffee.(나는 커피보다 차를 더 좋아해요.)',
      },
    },
    {
      title: '표·그래프를 읽고 비교하여 설명하기',
      body: '표나 그래프를 설명할 때 비교급과 최상급이 아주 쓸모 있어요. 먼저 **무엇을 나타낸 자료인지(제목·단위)** 확인하고, 수를 비교해 문장을 만들어요.\n\n가상의 자료: 우리 반 학생들이 좋아하는 운동(명)\n\n| Soccer | Baseball | Basketball |\n|---|---|---|\n| 12 | 8 | 5 |\n\n- Soccer is **the most popular** sport in our class. (가장 많은 수)\n- Baseball is **more popular than** basketball. (8 > 5)\n- Basketball is **the least popular** of the three. (가장 적은 수)\n\n> 💡 "가장 인기 있는"은 the most popular, "가장 덜 인기 있는"은 the least popular예요. 큰 수와 작은 수를 헷갈리지 않게 수를 먼저 짚어 보세요.',
      easy: '그래프 막대는 "키 재기"와 같아요. 막대가 가장 긴 것이 the most, 가장 짧은 것이 the least예요.\n\n두 막대만 견주면 비교급 + than을 써요. 긴 막대 is more popular than 짧은 막대.',
      fig: { type: 'bars', labels: ['Soccer', 'Baseball', 'Basketball'], values: [12, 8, 5], unit: '명', title: '우리 반이 좋아하는 운동 (가상의 자료)' },
      check: {
        type: 'ox',
        q: '그래프에서 Soccer 12명, Baseball 8명, Basketball 5명이에요. "Baseball is more popular than soccer."는 그래프와 맞는 문장이에요.',
        answer: false,
        explain: 'Baseball(8명)은 Soccer(12명)보다 적어요. 맞는 문장은 Soccer is more popular than baseball. 또는 Baseball is more popular than basketball.이에요.',
      },
    },
  ],

  examples: [
    {
      q: '표를 보고 빈칸에 알맞은 말을 쓰세요.\n\n| | Minsu | Jia | Seojun |\n|---|---|---|---|\n| 키 | 150 cm | 158 cm | 162 cm |\n\n1. Jia is [[빈칸]] than Minsu.\n2. Seojun is [[빈칸]] of the three.',
      steps: [
        '1번은 지아(158 cm)와 민수(150 cm) 두 사람을 than으로 비교해요. 지아가 더 크므로 비교급 **taller**.',
        '2번은 세 사람 가운데 가장 큰 사람을 말해요. 서준(162 cm)이 가장 크고, 최상급 앞에는 the를 써서 **the tallest**.',
        'of the three(셋 가운데)는 최상급의 범위를 나타내요.',
      ],
      answer: '1. taller  2. the tallest',
    },
    {
      q: '괄호 안의 낱말을 알맞게 바꾸어 문장을 완성하세요.\n\nThis is [[빈칸]] pizza in our town. (good)',
      steps: [
        'in our town(우리 동네에서)이라는 범위가 있고, 그 안에서 "가장 ~한" 것을 말하므로 최상급을 써요.',
        'good은 불규칙 변화예요: good - better - best.',
        '최상급 앞에 the를 써서 **the best**예요.',
        '해석: 이것이 우리 동네에서 가장 맛있는 피자예요.',
      ],
      answer: 'the best',
    },
  ],

  terms: [
    { term: '원급', def: '형용사·부사의 원래 모양이에요. 예: tall, big, beautiful' },
    { term: '비교급', def: '두 대상을 견주어 "더 ~한, 더 ~하게"를 나타내는 모양이에요. 예: taller, more beautiful' },
    { term: '최상급', def: '셋 이상 가운데 "가장 ~한, 가장 ~하게"를 나타내는 모양이에요. 앞에 the를 써요. 예: the tallest, the most beautiful' },
    { term: '불규칙 변화', def: '-er/-est나 more/most 규칙을 따르지 않고 다른 낱말로 바뀌는 것이에요. 예: good - better - best, bad - worse - worst' },
    { term: 'than', def: '비교급 뒤에서 "~보다"라는 뜻으로 비교하는 상대를 이끄는 말이에요. 예: taller than me' },
    { term: 'prefer A to B', def: '"B보다 A를 더 좋아하다"라는 표현이에요. than이 아니라 to를 써요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: 'easy의 비교급으로 알맞은 것을 고르세요.',
      choices: ['easier', 'easyer', 'more easy', 'more easier'],
      answer: 0,
      why: ['', '자음 + y로 끝나는 낱말은 y를 i로 바꾸고 -er을 붙여요.', 'easy는 2음절이지만 자음 + y로 끝나서 more를 쓰지 않아요.', 'more와 -er을 함께 쓰지 않아요.'],
      explain: 'easy는 자음(s) + y로 끝나므로 y를 i로 바꾸고 -er을 붙여요: easy → **easier** → easiest',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: 'good의 최상급을 쓰세요. (the는 쓰지 않아도 돼요.)',
      answer: ['best', 'the best'],
      wrong: [
        { a: 'goodest', why: 'good은 불규칙 변화예요: good - better - best.' },
        { a: 'better', why: 'better는 비교급이에요. 최상급은 best예요.' },
        { a: 'most good', why: 'good은 more/most를 쓰지 않는 불규칙 변화예요: good - better - best.' },
      ],
      explain: 'good은 불규칙 변화해요: good - better - **best**',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThis bag is [[빈칸]] than that one.',
      choices: ['more expensive', 'expensiver', 'most expensive', 'expensive'],
      answer: 0,
      why: ['', 'expensive는 3음절의 긴 낱말이라 -er이 아니라 more를 써요.', '최상급이에요. than으로 두 대상을 비교할 때는 비교급을 써요.', '원급이에요. than 앞에는 비교급을 써요.'],
      explain: 'than으로 두 가방을 비교하므로 비교급을 써요. expensive는 긴 낱말이라 **more expensive**예요. (이 가방은 저것보다 더 비싸요.)',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'My dog is bigger than your dog.는 바른 문장이에요.',
      answer: true,
      explain: 'big의 비교급은 g를 한 번 더 쓴 bigger이고, 비교 상대 앞에 than을 썼어요. "내 개는 네 개보다 더 커요."라는 바른 문장이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nWinter is [[빈칸]] season of the year.',
      choices: ['the coldest', 'colder', 'the colder', 'coldest than'],
      answer: 0,
      why: ['', '비교급이에요. 한 해의 여러 계절 가운데 "가장" 추운 것이므로 최상급을 써요.', '"가장 ~한"은 the + 최상급이에요. colder는 비교급이에요.', '최상급은 than과 함께 쓰지 않아요. 앞에 the를 써요.'],
      explain: 'of the year(한 해 가운데)라는 범위에서 가장 추운 계절을 말하므로 **the coldest**를 써요. (겨울은 한 해 가운데 가장 추운 계절이에요.)',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 한 낱말을 쓰세요.\n\nJunho is the fastest runner [[빈칸]] our school.',
      answer: ['in', 'at'],
      wrong: [{ a: 'of', why: 'our school은 한 덩어리 장소(집단)예요. 장소·집단 앞에는 in을 써요.' }, { a: 'than', why: 'than은 비교급과 함께 써요. 최상급의 범위는 in이나 of로 나타내요.' }],
      explain: 'our school(우리 학교)은 하나의 장소·집단이므로 **in**을 써요. (준호는 우리 학교에서 가장 빠른 달리기 선수예요.) 학교처럼 장소를 나타낼 때는 at our school이라고도 해요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Which do you prefer, cats or dogs?\nB: I prefer cats [[빈칸]] dogs.',
      choices: ['to', 'than', 'of', 'in'],
      answer: 0,
      why: ['', 'than은 비교급과 짝이에요. prefer는 to와 짝이에요.', 'of는 최상급의 범위를 나타낼 때 써요.', 'in은 최상급의 범위(장소·집단)를 나타낼 때 써요.'],
      explain: 'prefer A to B(B보다 A를 더 좋아하다). I prefer cats **to** dogs.(나는 개보다 고양이를 더 좋아해요.)',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 0,
      q: '원급 - 비교급 - 최상급이 **잘못** 짝지어진 것을 고르세요.',
      choices: ['hot - hoter - hotest', 'happy - happier - happiest', 'bad - worse - worst', 'large - larger - largest'],
      answer: 0,
      why: ['', 'happy는 자음 + y로 끝나서 y를 i로 바꾸어요. 바르게 짝지어졌어요.', 'bad는 불규칙 변화 bad - worse - worst예요. 바르게 짝지어졌어요.', 'large는 -e로 끝나서 -r, -st만 붙여요. 바르게 짝지어졌어요.'],
      hint: '짧은 모음 하나 + 자음 하나로 끝나는 낱말을 찾아보세요.',
      explain: 'hot은 짧은 모음 o 하나와 자음 t 하나로 끝나서 t를 한 번 더 써요: hot - **hotter** - **hottest**',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 1,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n이 문제는 저 문제보다 더 어려워요.',
      choices: ['This question', 'is', 'more difficult', 'than', 'that one.'],
      answer: [0, 1, 2, 3, 4],
      explain: 'This question(주어) + is + more difficult(비교급) + than + that one(비교 상대). difficult는 긴 낱말이라 more를 써요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '그래프를 보고, 내용과 **맞지 않는** 문장을 고르세요.',
      fig: { type: 'bars', labels: ['Monday', 'Tuesday', 'Wednesday'], values: [30, 45, 20], unit: '분', title: '하윤이가 책을 읽은 시간 (가상의 자료)' },
      choices: ['Hayun read the longest on Monday.', 'Hayun read longer on Tuesday than on Wednesday.', 'Hayun read the shortest on Wednesday.', 'Hayun read longer on Monday than on Wednesday.'],
      answer: 0,
      why: ['', '화요일 45분이 수요일 20분보다 길어요. 그래프와 맞는 문장이에요.', '수요일 20분이 가장 짧아요. 그래프와 맞는 문장이에요.', '월요일 30분이 수요일 20분보다 길어요. 그래프와 맞는 문장이에요.'],
      hint: '요일마다 읽은 시간을 먼저 숫자로 적어 보세요.',
      explain: '월요일 30분, 화요일 45분, 수요일 20분이에요. 가장 오래 읽은 날은 **화요일**이므로 "Hayun read the longest on Monday."는 그래프와 맞지 않아요. 바르게 고치면 Hayun read the longest on Tuesday.예요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 1,
      q: '괄호 안의 낱말을 알맞게 바꾸어 빈칸에 쓰세요.\n\nThe weather today is [[빈칸]] than yesterday. (bad)',
      answer: ['worse'],
      wrong: [
        { a: 'bader', why: 'bad는 불규칙 변화예요: bad - worse - worst.' },
        { a: 'worst', why: 'worst는 최상급이에요. than으로 비교할 때는 비교급 worse를 써요.' },
        { a: 'more bad', why: 'bad는 more를 쓰지 않는 불규칙 변화예요: bad - worse - worst.' },
      ],
      explain: 'than으로 오늘과 어제를 비교하므로 비교급이 필요해요. bad의 비교급은 불규칙 변화한 **worse**예요. (오늘 날씨는 어제보다 더 나빠요.)',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: [[빈칸]]\nB: I like the blue one better. Blue is my favorite color.',
      choices: ['Which do you like better, the blue one or the red one?', 'Which color do you like best of all?', 'Do you have a blue bag?', 'What color is your bag?'],
      answer: 0,
      why: ['', 'like best는 셋 이상 가운데 가장 좋아하는 것을 물을 때 써요. B는 like better(두 가지 가운데 더)로 답했어요.', 'Yes나 No로 답해야 하는 질문이에요.', '가방 색을 묻는 질문이라 "더 좋아한다"는 답과 맞지 않아요.'],
      hint: 'B의 대답에 better가 있어요. 두 가지 가운데 고르는 질문을 찾아보세요.',
      explain: 'B가 "파란 것이 더 좋아요"라고 두 가지 가운데 하나를 골랐으므로, 질문은 **Which do you like better, A or B?** 꼴이 알맞아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      q: '표를 보고, 빈칸 (A)와 (B)에 들어갈 말이 바르게 짝지어진 것을 고르세요.\n\n가상의 자료: 세 가게의 사과 한 개 값\n\n| Store | Fresh Mart | Green Shop | Daily Fruit |\n|---|---|---|---|\n| Price | 900원 | 1,200원 | 700원 |\n\nApples at Green Shop are (A) than apples at Fresh Mart. Daily Fruit sells (B) apples of the three stores.',
      choices: ['(A) more expensive (B) the cheapest', '(A) cheaper (B) the cheapest', '(A) more expensive (B) the most expensive', '(A) expensiver (B) the cheapest'],
      answer: 0,
      why: ['', 'Green Shop(1,200원)이 Fresh Mart(900원)보다 비싸요. cheaper가 아니에요.', 'Daily Fruit(700원)는 가장 싸요. 가장 비싼 곳은 Green Shop이에요.', 'expensive는 긴 낱말이라 more expensive로 써요.'],
      hint: '먼저 세 가게의 값을 크기대로 놓아 보세요.',
      explain: 'Green Shop 1,200원 > Fresh Mart 900원이므로 (A)는 **more expensive**. 세 가게 가운데 Daily Fruit의 700원이 가장 싸므로 (B)는 **the cheapest**예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 쓰세요.\n\nSeojun is taller than Minsu. Minsu is taller than Jia.\n= Seojun is [[빈칸]] of the three.',
      answer: ['the tallest'],
      wrong: [
        { a: 'tallest', why: '최상급 앞에는 the를 써요.' },
        { a: 'taller', why: '세 사람 가운데 "가장" 큰 사람이므로 비교급이 아니라 최상급을 써요.' },
        { a: 'the taller', why: 'taller는 비교급이에요. 셋 가운데 가장 큰 것은 최상급 tallest예요.' },
      ],
      hint: '세 사람의 키 순서를 먼저 정해 보세요.',
      explain: '서준 > 민수 > 지아 순서이므로 서준이 셋 가운데 가장 커요. Seojun is **the tallest** of the three.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '어법상 바른 문장을 고르세요.',
      choices: ['My room is cleaner than my brother\'s room.', 'This movie is more funnier than that one.', 'She is the most smart student in my class.', 'Today is the hotest day of this week.'],
      answer: 0,
      why: ['', 'more와 -er을 함께 썼어요. funnier만 써요.', 'smart는 짧은 낱말이라 the smartest로 써요.', 'hot은 t를 한 번 더 써서 the hottest예요.'],
      explain: 'clean의 비교급 cleaner와 than을 바르게 썼어요. 나머지는 more funnier → **funnier**, the most smart → **the smartest**, the hotest → **the hottest**로 고쳐야 해요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 글을 읽고, 글의 내용과 맞는 문장을 고르세요.\n\nOur class voted to choose our field trip place. The zoo got 9 votes. The science museum got 14 votes. The art museum got 6 votes. So we are going to the science museum!',
      choices: ['The science museum was the most popular place.', 'The zoo was more popular than the science museum.', 'The art museum was more popular than the zoo.', 'The zoo was the least popular place.'],
      answer: 0,
      why: ['', '동물원 9표는 과학관 14표보다 적어요.', '미술관 6표는 동물원 9표보다 적어요.', '가장 적은 표를 받은 곳은 미술관(6표)이에요.'],
      hint: '세 장소의 표 수를 크기 순서로 적어 보세요.',
      explain: '과학관 14표 > 동물원 9표 > 미술관 6표예요. 가장 인기 있는 곳은 과학관이므로 **The science museum was the most popular place.**가 맞아요. 가장 덜 인기 있는 곳은 미술관(the least popular)이에요.',
    },
  ],

  deeper: [
    {
      title: '비교급을 쓴 재미있는 표현',
      body: '비교급과 최상급은 일상 표현에도 자주 숨어 있어요.\n\n- **The more, the better.** (많을수록 좋아요.)\n- **Better late than never.** (늦더라도 안 하는 것보다 낫다.)\n- **one of the + 최상급 + 복수 명사**: Busan is **one of the biggest cities** in Korea. (부산은 우리나라에서 가장 큰 도시 가운데 하나예요.) — "가운데 하나"라서 city가 아니라 cities를 써요.\n\n중학교 2학년에서는 as tall as(~만큼 키가 큰) 같은 원급 비교와, much taller(훨씬 더 큰)처럼 비교급을 강조하는 방법을 배워요.',
    },
  ],

  faq: [
    {
      q: '2음절 낱말은 -er이에요, more예요?',
      a: '대부분의 2음절 이상 낱말은 more/most를 써요(famous, careful, popular). 하지만 자음 + y로 끝나는 2음절 낱말은 -ier/-iest예요(happy → happier, busy → busier, easy → easier). 헷갈리면 사전에서 확인하는 습관을 들이세요.',
    },
    {
      q: '최상급 앞에는 왜 꼭 the를 써요?',
      a: '"가장 ~한 것"은 그 범위 안에서 딱 하나로 정해지기 때문이에요. 정해진 하나를 가리킬 때 the를 쓰지요. 그래서 the tallest, the most popular처럼 써요.',
    },
    {
      q: 'prefer A to B에서 to 대신 than을 쓰면 안 돼요?',
      a: 'prefer는 "더 좋아하다"라는 뜻이 이미 들어 있는 동사라서 비교급과 짝인 than을 쓰지 않아요. prefer A **to** B로 외워 두세요. like를 쓰면 I like A **better than** B.처럼 than을 써요.',
    },
  ],

  mistakes: [
    'more와 -er을 함께 쓰는 실수 — more taller(✗) → **taller**, more easier(✗) → **easier**',
    '자음을 겹쳐 써야 하는 낱말을 놓치는 실수 — biger, hotest(✗) → **bigger**, **hottest**',
    'prefer A than B로 쓰는 실수 — I prefer summer than winter.(✗) → I prefer summer **to** winter.',
  ],

  gens: [
    {
      id: 'comp-sup-form',
      level: 1,
      title: '비교급·최상급 모양 고르기',
      make: function (R) {
        // [원급, 비교급, 최상급, 비교급 오답, 최상급 오답, 규칙]
        var words = [
          ['tall', 'taller', 'tallest', ['more tall', 'tallier', 'more taller'], ['most tall', 'talliest', 'most tallest'], '짧은 낱말이라 -er, -est를 붙여요.'],
          ['long', 'longer', 'longest', ['more long', 'longger', 'more longer'], ['most long', 'longgest', 'most longest'], '짧은 낱말이라 -er, -est를 붙여요.'],
          ['fast', 'faster', 'fastest', ['more fast', 'fastter', 'more faster'], ['most fast', 'fasttest', 'most fastest'], '짧은 낱말이라 -er, -est를 붙여요.'],
          ['large', 'larger', 'largest', ['largeer', 'more large', 'more larger'], ['largeest', 'most large', 'most largest'], '-e로 끝나서 -r, -st만 붙여요.'],
          ['nice', 'nicer', 'nicest', ['niceer', 'more nice', 'more nicer'], ['niceest', 'most nice', 'most nicest'], '-e로 끝나서 -r, -st만 붙여요.'],
          ['big', 'bigger', 'biggest', ['biger', 'more big', 'more bigger'], ['bigest', 'most big', 'most biggest'], '짧은 모음 하나 + 자음 하나로 끝나서 자음을 한 번 더 써요.'],
          ['hot', 'hotter', 'hottest', ['hoter', 'more hot', 'more hotter'], ['hotest', 'most hot', 'most hottest'], '짧은 모음 하나 + 자음 하나로 끝나서 자음을 한 번 더 써요.'],
          ['thin', 'thinner', 'thinnest', ['thiner', 'more thin', 'more thinner'], ['thinest', 'most thin', 'most thinnest'], '짧은 모음 하나 + 자음 하나로 끝나서 자음을 한 번 더 써요.'],
          ['easy', 'easier', 'easiest', ['easyer', 'more easy', 'more easier'], ['easyest', 'most easy', 'most easiest'], '자음 + y로 끝나서 y를 i로 바꾸고 -er, -est를 붙여요.'],
          ['happy', 'happier', 'happiest', ['happyer', 'more happy', 'more happier'], ['happyest', 'most happy', 'most happiest'], '자음 + y로 끝나서 y를 i로 바꾸고 -er, -est를 붙여요.'],
          ['heavy', 'heavier', 'heaviest', ['heavyer', 'more heavy', 'more heavier'], ['heavyest', 'most heavy', 'most heaviest'], '자음 + y로 끝나서 y를 i로 바꾸고 -er, -est를 붙여요.'],
          ['busy', 'busier', 'busiest', ['busyer', 'more busy', 'more busier'], ['busyest', 'most busy', 'most busiest'], '자음 + y로 끝나서 y를 i로 바꾸고 -er, -est를 붙여요.'],
          ['beautiful', 'more beautiful', 'most beautiful', ['beautifuler', 'beautifuller', 'more beautifuler'], ['beautifulest', 'beautifullest', 'most beautifulest'], '긴 낱말이라 앞에 more, most를 써요.'],
          ['expensive', 'more expensive', 'most expensive', ['expensiver', 'expensiveer', 'more expensiver'], ['expensivest', 'expensiveest', 'most expensivest'], '긴 낱말이라 앞에 more, most를 써요.'],
          ['interesting', 'more interesting', 'most interesting', ['interestinger', 'interestingger', 'more interestinger'], ['interestingest', 'interestinggest', 'most interestingest'], '긴 낱말이라 앞에 more, most를 써요.'],
          ['popular', 'more popular', 'most popular', ['popularer', 'popularier', 'more popularer'], ['popularest', 'populariest', 'most popularest'], '긴 낱말이라 앞에 more, most를 써요.'],
          ['difficult', 'more difficult', 'most difficult', ['difficulter', 'difficultier', 'more difficulter'], ['difficultest', 'difficultiest', 'most difficultest'], '긴 낱말이라 앞에 more, most를 써요.'],
          ['good', 'better', 'best', ['gooder', 'more good', 'more better'], ['goodest', 'most good', 'most best'], '불규칙 변화예요: good - better - best'],
          ['bad', 'worse', 'worst', ['bader', 'badder', 'more bad'], ['badest', 'baddest', 'most bad'], '불규칙 변화예요: bad - worse - worst'],
          ['many', 'more', 'most', ['manier', 'manyer', 'more many'], ['maniest', 'manyest', 'most many'], '불규칙 변화예요: many - more - most'],
        ];
        var w = R.pick(words);
        var sup = R.bool();
        var correct = sup ? w[2] : w[1];
        var other = sup ? w[1] : w[2];
        var wrongs = (sup ? w[4] : w[3]).concat([other]);
        var pick = R.choices(correct, wrongs, 4);
        var kind = sup ? '최상급' : '비교급';
        return {
          type: 'choice', concept: 0,
          q: '**' + w[0] + '**의 ' + kind + '으로 알맞은 것을 고르세요.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            if (c === other) return (sup ? '비교급' : '최상급') + '이에요. 묻는 것은 ' + kind + '이에요.';
            return '규칙대로 쓰면 ' + w[0] + ' → ' + correct + '. ' + w[5];
          }),
          explain: w[0] + ' - ' + w[1] + ' - ' + w[2] + '. ' + w[5],
        };
      },
    },
    {
      id: 'comp-sup-sentence',
      level: 2,
      title: '문장에 알맞은 비교급·최상급 고르기',
      make: function (R) {
        // [원급, 비교급, 최상급, 비교급 오답, 최상급 오답, than 문장, the 문장]
        var items = [
          ['tall', 'taller', 'tallest', 'more tall', 'most tall', 'My brother is [[빈칸]] than me.', 'Junho is the [[빈칸]] boy in my class.'],
          ['big', 'bigger', 'biggest', 'biger', 'bigest', 'An elephant is [[빈칸]] than a horse.', 'This is the [[빈칸]] room in our house.'],
          ['hot', 'hotter', 'hottest', 'hoter', 'hotest', 'Today is [[빈칸]] than yesterday.', 'Yesterday was the [[빈칸]] day of this week.'],
          ['easy', 'easier', 'easiest', 'easyer', 'easyest', 'This test was [[빈칸]] than the last one.', 'This is the [[빈칸]] question of all.'],
          ['heavy', 'heavier', 'heaviest', 'heavyer', 'heavyest', 'My bag is [[빈칸]] than yours.', 'This is the [[빈칸]] box of the three.'],
          ['fast', 'faster', 'fastest', 'more fast', 'most fast', 'A cheetah is [[빈칸]] than a lion.', 'Seojun is the [[빈칸]] runner in our school.'],
          ['large', 'larger', 'largest', 'more large', 'most large', 'This park is [[빈칸]] than that one.', 'This is the [[빈칸]] park in our town.'],
          ['expensive', 'more expensive', 'most expensive', 'expensiver', 'expensivest', 'This watch is [[빈칸]] than that one.', 'This is the [[빈칸]] watch in the shop.'],
          ['interesting', 'more interesting', 'most interesting', 'interestinger', 'interestingest', 'This book is [[빈칸]] than the movie.', 'For me, science is the [[빈칸]] subject of all.'],
          ['popular', 'more popular', 'most popular', 'popularer', 'popularest', 'Soccer is [[빈칸]] than baseball in my class.', 'Pizza is the [[빈칸]] food in our school.'],
          ['difficult', 'more difficult', 'most difficult', 'difficulter', 'difficultest', 'The second question was [[빈칸]] than the first one.', 'This is the [[빈칸]] puzzle of all.'],
          ['good', 'better', 'best', 'gooder', 'goodest', 'Your idea is [[빈칸]] than mine.', 'This is the [[빈칸]] song of the year.'],
          ['bad', 'worse', 'worst', 'bader', 'badest', 'The traffic today is [[빈칸]] than yesterday.', 'Monday was the [[빈칸]] day of this week.'],
          ['beautiful', 'more beautiful', 'most beautiful', 'beautifuler', 'beautifulest', 'This garden is [[빈칸]] than that one.', 'Spring is the [[빈칸]] season of the year to me.'],
        ];
        var it = R.pick(items);
        var useSup = R.bool();
        var correct = useSup ? it[2] : it[1];
        var other = useSup ? it[1] : it[2];
        var bad = useSup ? it[4] : it[3];
        var pick = R.choices(correct, [other, it[0], bad], 4);
        var reasons = {};
        reasons[other] = useSup ? '비교급이에요. the와 in/of가 있어 "가장 ~한"을 말하므로 최상급을 써요.' : '최상급이에요. than으로 두 대상을 비교할 때는 비교급을 써요.';
        reasons[it[0]] = '원급(바꾸지 않은 모양)이에요. ' + (useSup ? 'the + 최상급' : '비교급 + than') + '이 필요해요.';
        reasons[bad] = '규칙대로 쓰면 ' + it[0] + ' → ' + (useSup ? it[2] : it[1]) + '. 만드는 규칙을 다시 확인해 보세요.';
        var sentence = useSup ? it[6] : it[5];
        return {
          type: 'choice', concept: useSup ? 2 : 1,
          q: '괄호 안의 낱말을 알맞은 형태로 바꾸어 빈칸에 넣으려고 해요. 알맞은 것을 고르세요.\n\n' + sentence + ' (' + it[0] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reasons[c]; }),
          explain: (useSup ? '빈칸 앞에 the가 있고 범위(in/of)가 있어 "가장 ~한"을 말하므로 최상급을 써요: **' + it[2] + '**' : 'than으로 두 대상을 비교하므로 비교급을 써요: **' + it[1] + '**') + '. (' + it[0] + ' - ' + it[1] + ' - ' + it[2] + ')',
        };
      },
    },
  ],

  vocab: [
    { w: 'compare', m: '비교하다', ex: 'Let\'s compare the two pictures.', exm: '두 그림을 비교해 봐요.' },
    { w: 'prefer', m: '~을 더 좋아하다', ex: 'I prefer rice to bread.', exm: '나는 빵보다 밥을 더 좋아해요.' },
    { w: 'expensive', m: '비싼', ex: 'This jacket is too expensive.', exm: '이 재킷은 너무 비싸요.' },
    { w: 'cheap', m: '(값이) 싼', ex: 'These pencils are cheap.', exm: '이 연필들은 값이 싸요.' },
    { w: 'popular', m: '인기 있는', ex: 'Soccer is popular in our school.', exm: '축구는 우리 학교에서 인기가 있어요.' },
    { w: 'heavy', m: '무거운', ex: 'The box is very heavy.', exm: '그 상자는 아주 무거워요.' },
    { w: 'light', m: '가벼운', ex: 'This bag is light and small.', exm: '이 가방은 가볍고 작아요.' },
    { w: 'difficult', m: '어려운', ex: 'The last question was difficult.', exm: '마지막 문제가 어려웠어요.' },
    { w: 'season', m: '계절', ex: 'Fall is my favorite season.', exm: '가을은 내가 가장 좋아하는 계절이에요.' },
    { w: 'vote', m: '투표하다; 표', ex: 'Which place did you vote for?', exm: '너는 어느 장소에 투표했니?' },
    { w: 'graph', m: '그래프', ex: 'The graph shows our favorite fruits.', exm: '그래프는 우리가 좋아하는 과일을 보여 줘요.' },
    { w: 'price', m: '가격', ex: 'What is the price of this cap?', exm: '이 모자의 가격은 얼마예요?' },
    { w: 'than', m: '~보다', ex: 'My sister is older than me.', exm: '우리 언니는 나보다 나이가 많아요.' },
    { w: 'least', m: '가장 적은, 가장 덜', ex: 'Math is the least difficult subject for me.', exm: '나에게 수학은 가장 덜 어려운 과목이에요.' },
  ],
});
