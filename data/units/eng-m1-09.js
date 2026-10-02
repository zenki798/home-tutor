/* 중1 영어 · 느낌과 생각 말하기 (감각동사·that절) */
Tutor.registerUnit({
  id: 'eng-m1-09',
  course: 'eng-m1',
  title: '느낌과 생각 말하기 (감각동사·that절)',
  summary: 'look, sound 같은 감각동사와 I think that ~ 문장으로 느낌과 생각을 나타내고 인물의 감정을 추론해요.',
  goals: [
    '감각동사 뒤에 형용사를 써서 느낌을 말할 수 있어요.',
    '감각동사 + like + 명사로 "~처럼 보이다/들리다"를 말할 수 있어요.',
    'I think (that) ~, I hope (that) ~로 생각과 바람을 말할 수 있어요.',
    '이야기 속 인물의 기분을 단서로 추론하고 감정을 묘사하는 문장을 고를 수 있어요.',
  ],
  standards: [],

  concepts: [
    {
      title: '감각동사 + 형용사',
      body: '보고, 듣고, 냄새 맡고, 맛보고, 만져서 느낀 것을 말하는 동사를 **감각동사**라고 해요. 감각동사 뒤에는 **형용사**가 와서 주어가 어떤지를 나타내요.\n\n| 감각동사 | 뜻 | 예문 |\n|---|---|---|\n| look | ~해 보이다 | You **look happy** today. |\n| sound | ~하게 들리다 | That **sounds great**. |\n| smell | ~한 냄새가 나다 | The bread **smells sweet**. |\n| taste | ~한 맛이 나다 | This lemon **tastes sour**. |\n| feel | ~한 느낌이 들다 | The blanket **feels soft**. |\n\n우리말로는 "행복하게 보여요", "부드럽게 느껴져요"처럼 "~하게"라고 해석해서 부사(happily, softly)를 쓰고 싶어지지만, 영어에서는 **형용사**를 써요. 형용사가 동사가 아니라 **주어의 상태**를 설명하기 때문이에요.\n\n> ⚠️ You look happily.(✗) → You look **happy**. / It tastes well.(✗) → It tastes **good**.',
      easy: '감각동사를 "="(같다) 기호처럼 생각해 보세요.\n\nYou **look** happy. → 너 = 행복한 (모습으로 보여)\nThe soup **smells** good. → 수프 = 좋은 (냄새로 느껴져)\n\nbe동사 뒤에 happy를 쓰듯이(You are happy.), 감각동사 뒤에도 happy 같은 형용사를 그대로 써요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThis cake tastes [[빈칸]].',
        choices: ['sweet', 'sweetly', 'like sweet'],
        answer: 0,
        why: ['', '감각동사 뒤에는 부사가 아니라 형용사를 써요.', 'like 뒤에는 명사가 와요. sweet는 형용사라서 like 없이 써요.'],
        explain: '감각동사 taste 뒤에는 형용사를 써요. This cake tastes **sweet**.(이 케이크는 달콤한 맛이 나요.)',
      },
    },
    {
      title: '감각동사 + like + 명사',
      body: '감각동사 뒤에 **명사**를 쓰고 싶을 때는 **like**를 넣어요. 이때 like는 "좋아하다"가 아니라 **"~처럼, ~ 같은"**이라는 뜻이에요.\n\n| 형용사 | like + 명사 |\n|---|---|\n| It looks **soft**. (부드러워 보여요) | It looks **like a cloud**. (구름처럼 보여요) |\n| That sounds **great**. (좋게 들려요) | That sounds **like a great idea**. (좋은 생각 같아요) |\n| It smells **sweet**. (달콤한 냄새가 나요) | It smells **like roses**. (장미 같은 냄새가 나요) |\n\n뒤에 오는 말이 **형용사면 like 없이**, **명사면 like와 함께** 써요. 이것만 따져 보면 돼요.\n\n- You look like your dad. (너는 아빠를 닮았어. — 아빠처럼 보여)',
      easy: 'like를 "~처럼"이라는 다리라고 생각해 보세요.\n\n- 형용사는 혼자서도 건널 수 있어요: looks **happy**\n- 명사는 다리(like)가 있어야 건너요: looks **like a rabbit**(토끼처럼 보여요)\n\n"무엇처럼?"이라고 물어서 답이 물건·사람 이름이면 like를 넣어요.',
      check: {
        type: 'ox',
        q: 'That cloud looks a rabbit.은 바른 문장이에요.',
        answer: false,
        explain: 'a rabbit은 명사이므로 감각동사 뒤에 like를 넣어야 해요. 바른 문장은 That cloud looks **like** a rabbit.(저 구름은 토끼처럼 보여요.)이에요.',
      },
    },
    {
      title: 'I think (that) ~: 생각과 의견 말하기',
      body: '"나는 ~라고 생각해요"처럼 생각이나 의견을 말할 때 **I think (that) + 주어 + 동사**를 써요. 이때 that은 뒤의 문장을 이끄는 **접속사**로, "~라는 것"이라는 뜻이에요. 그리고 **흔히 생략해요.**\n\n| 동사 | 예문 | 뜻 |\n|---|---|---|\n| think | I think **(that)** this book is interesting. | 이 책이 재미있다고 생각해요. |\n| hope | I hope **(that)** you feel better soon. | 네가 곧 나아지길 바라. |\n| know | I know **(that)** you are busy. | 네가 바쁜 걸 알아. |\n| believe | I believe **(that)** we can win. | 우리가 이길 수 있다고 믿어요. |\n\nthat을 빼도 뜻이 같아요: I think this book is interesting.\n\n> 💡 "~가 아니라고 생각해요"는 보통 think를 부정해요: **I don\'t think** it is true.(그게 사실이 아니라고 생각해.)\n\n> ⚠️ 이 that은 "저것"이라는 뜻의 that과 달라요. 뒤에 주어 + 동사가 오면 접속사예요.',
      easy: 'I think 뒤에 "생각 말풍선"이 하나 붙어 있다고 생각해 보세요. 말풍선 안에는 완전한 문장(주어 + 동사)이 들어가요.\n\nI think [ **she is kind** ].\n\nthat은 말풍선의 입구일 뿐이라서 있어도 되고 없어도 돼요.',
      check: {
        type: 'ox',
        q: 'I think that Minsu is kind.에서 that을 빼고 I think Minsu is kind.라고 써도 뜻이 같아요.',
        answer: true,
        explain: 'think 뒤에서 문장을 이끄는 접속사 that은 생략할 수 있어요. 두 문장 모두 "나는 민수가 친절하다고 생각해요."라는 뜻이에요.',
      },
    },
    {
      title: '인물의 기분과 감정 묘사하기',
      body: '인물의 기분을 묘사할 때는 감정 형용사를 감각동사·be동사와 함께 써요.\n\n| 감정 | 형용사 | 예문 |\n|---|---|---|\n| 신난 | excited | Jia looked **excited** before the trip. |\n| 긴장한 | nervous | My voice sounded **nervous**. |\n| 걱정하는 | worried | He felt **worried** about the test. |\n| 자랑스러운 | proud | I am **proud** of my sister. |\n| 지루한 | bored | The students looked **bored**. |\n| 속상한 | upset | She was **upset** about the broken cup. |\n\n좋은 묘사는 "슬펐다"라고만 쓰기보다 **보이고 들리는 모습**을 함께 써요.\n\n- 그냥: He was sad.\n- 더 생생하게: He **looked sad**. His eyes were red, and he didn\'t say a word.\n\n> 💡 감정을 느끼는 사람에게는 -ed 형용사(bored, excited)를 써요. I am bored.(나는 지루해요) / The movie is boring.(그 영화는 지루해요)',
      easy: '친구의 기분은 어떻게 알 수 있나요? 얼굴을 보고(look), 목소리를 듣고(sound) 알지요.\n\n- 얼굴이 웃고 있으면 → She looks **happy**.\n- 목소리가 떨리면 → He sounds **nervous**.\n\n글로 기분을 쓸 때도 이렇게 보이는 것, 들리는 것을 함께 써 주면 읽는 사람이 기분을 더 잘 느껴요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI have a big test tomorrow. I feel [[빈칸]].',
        choices: ['nervous', 'nervously', 'like nervous'],
        answer: 0,
        why: ['', '감각동사 feel 뒤에는 부사가 아니라 형용사를 써요.', 'nervous는 형용사라서 like 없이 써요.'],
        explain: '감각동사 feel 뒤에 감정 형용사 **nervous**(긴장한)를 써요. "내일 큰 시험이 있어서 긴장돼요."',
      },
    },
    {
      title: '이야기 속 인물의 감정 추론하기',
      body: '이야기에서는 인물의 감정을 "happy", "sad"처럼 직접 말해 주지 않을 때가 많아요. 그럴 때는 **단서**를 모아 감정을 **추론**해요.\n\n| 단서 | 예 | 짐작되는 감정 |\n|---|---|---|\n| 행동 | She jumped up and down. | 신남, 기쁨 |\n| 표정·몸 | His hands were shaking. | 긴장, 두려움 |\n| 말 | "I can\'t believe it! I won!" | 놀람, 기쁨 |\n| 상황 | Her best friend moved away. | 슬픔, 외로움 |\n\n하나의 단서보다 **여러 단서가 가리키는 감정**을 고르세요. 그리고 이야기가 진행되면서 감정이 **바뀌는** 경우도 많아요(걱정 → 안심).',
      easy: '탐정이 되었다고 생각해 보세요. 탐정은 범인이 "내가 했어요"라고 말하지 않아도 발자국, 지문으로 알아내지요.\n\n인물의 기분도 마찬가지예요. "미소를 지었다", "문을 쾅 닫았다", "눈물이 났다" 같은 단서로 기분을 알아내요.',
      check: {
        type: 'choice',
        q: '다음 글에서 Minsu의 기분으로 가장 알맞은 것을 고르세요.\n\nMinsu opened the box. There was a new soccer ball inside! He smiled and shouted, "Thank you, Dad!"',
        choices: ['happy', 'bored', 'scared'],
        answer: 0,
        why: ['', '새 공을 받고 웃으며 소리쳤으니 지루한 기분이 아니에요.', '무서워할 만한 단서가 없어요. 웃고 고맙다고 외쳤어요.'],
        explain: '새 축구공을 받고(상황), 웃으며(행동), "고마워요, 아빠!"라고 외쳤어요(말). 모든 단서가 **happy**(기쁜)를 가리켜요.',
      },
    },
  ],

  examples: [
    {
      q: '빈칸에 알맞은 말을 고르고 해석하세요.\n\nYour plan sounds [[빈칸]] a lot of fun. (like / 없음)',
      steps: [
        '빈칸 뒤 a lot of fun은 명사예요.',
        '감각동사 뒤에 명사가 오면 like를 넣어요.',
        'Your plan sounds **like** a lot of fun.',
        '해석: 네 계획은 아주 재미있을 것 같아. (아주 재미있는 일처럼 들려.)',
      ],
      answer: 'like',
    },
    {
      q: '두 문장을 that을 써서 한 문장으로 만드세요.\n\nI think so. Jia will win the race.',
      steps: [
        '내가 생각하는 내용은 "지아가 경주에서 이길 것이다"예요.',
        'I think 뒤에 접속사 that을 쓰고 그 내용을 이어요.',
        'I think **that** Jia will win the race.',
        'that은 생략할 수 있어요: I think Jia will win the race.',
      ],
      answer: 'I think (that) Jia will win the race.',
    },
  ],

  terms: [
    { term: '감각동사', def: 'look, sound, smell, taste, feel처럼 감각으로 느낀 것을 나타내는 동사예요. 뒤에 형용사가 와요.' },
    { term: '형용사', def: '사람이나 사물의 모양·성질·상태를 나타내는 말이에요. 예: happy, soft, sweet' },
    { term: '부사', def: '동사·형용사·문장을 꾸며 "어떻게"를 나타내는 말이에요. 많은 부사가 -ly로 끝나요. 예: happily, slowly' },
    { term: '접속사 that', def: 'I think, I hope 뒤에서 "주어 + 동사"가 있는 문장을 이끄는 that이에요. "~라는 것"이라는 뜻이고 흔히 생략해요.' },
    { term: '추론', def: '글에 직접 쓰여 있지 않은 것을 단서를 모아 짐작하는 것이에요. 예: 행동과 말로 인물의 감정을 알아내기' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nYou look [[빈칸]] today. Did something good happen?',
      choices: ['happy', 'happily', 'happiness', 'like happy'],
      answer: 0,
      why: ['', '감각동사 look 뒤에는 부사가 아니라 형용사를 써요.', 'happiness는 명사예요. 명사를 쓰려면 like가 필요하고, 여기서는 형용사 happy가 자연스러워요.', 'like 뒤에는 명사가 와요. happy는 형용사라서 like 없이 써요.'],
      explain: '감각동사 look 뒤에 형용사를 써요. You look **happy** today.(너 오늘 행복해 보여.)',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: 'This soup smells well.은 바른 문장이에요.',
      answer: false,
      explain: 'well은 "잘"이라는 부사예요. 감각동사 smell 뒤에는 형용사 **good**을 써요. 바른 문장: This soup smells **good**.(이 수프는 좋은 냄새가 나요.)',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThat rock looks [[빈칸]] a turtle.',
      choices: ['like', 'as', 'to', 'for'],
      answer: 0,
      why: ['', '"~처럼 보이다"는 look like로 써요.', 'look to라는 표현은 이 뜻으로 쓰지 않아요. 명사 앞에는 like를 써요.', 'look for는 "~을 찾다"라는 뜻이에요.'],
      explain: '빈칸 뒤 a turtle은 명사이므로 감각동사 뒤에 **like**를 써요. That rock looks like a turtle.(저 바위는 거북처럼 보여요.)',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 0,
      q: '괄호 안의 낱말을 알맞은 형태로 바꾸어 빈칸에 쓰세요.\n\nThe music sounds [[빈칸]]. (beautifully)',
      answer: ['beautiful'],
      wrong: [{ a: 'beautifully', why: 'beautifully는 부사예요. 감각동사 sound 뒤에는 형용사 beautiful을 써요.' }],
      explain: '감각동사 sound 뒤에는 형용사를 써야 하므로 부사 beautifully를 형용사 **beautiful**로 바꿔요. The music sounds beautiful.(그 음악은 아름답게 들려요.)',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI hope [[빈칸]] you have a great time at the camp.',
      choices: ['that', 'what', 'because', 'to'],
      answer: 0,
      why: ['', 'what은 "무엇"이라는 뜻이라 바람을 말하는 문장을 이을 수 없어요.', '빈칸 뒤는 이유가 아니라 내가 바라는 내용이에요.', 'to 뒤에는 동사원형이 와요. 빈칸 뒤는 주어(you)와 동사(have)가 있는 문장이에요.'],
      explain: 'hope 뒤에 주어 + 동사가 있는 문장이 오므로 접속사 **that**으로 이어요. (that은 생략할 수도 있어요.) "네가 캠프에서 좋은 시간을 보내길 바라."',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 0,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n이 담요는 부드러운 느낌이 들어요.\nThis blanket [[빈칸]] soft.',
      choices: ['feels', 'tastes', 'sounds', 'smells'],
      answer: 0,
      why: ['', 'taste는 맛을 말할 때 써요.', 'sound는 소리를 들었을 때 써요.', 'smell은 냄새를 맡았을 때 써요.'],
      explain: '만져서 느낀 것은 **feel**로 말해요. This blanket feels soft.',
    },
    {
      id: 'p7', level: 1, type: 'order', concept: 2,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n나는 그 영화가 재미있다고 생각해요.',
      choices: ['I think', 'that', 'the movie', 'is fun.'],
      answer: [0, 1, 2, 3],
      explain: 'I think + that + the movie is fun(그 영화가 재미있다). that 뒤에 주어(the movie) + 동사(is)가 와요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 1,
      q: '어법상 **틀린** 문장을 고르세요.',
      choices: ['It sounds an exciting plan.', 'You look like a movie star.', 'The pie smells delicious.', 'Her hands felt cold.'],
      answer: 0,
      why: ['', '명사(a movie star) 앞에 like를 넣었어요. 바른 문장이에요.', '감각동사 smell 뒤에 형용사 delicious를 썼어요. 바른 문장이에요.', '감각동사 feel 뒤에 형용사 cold를 썼어요. 바른 문장이에요.'],
      hint: '감각동사 뒤에 명사가 오는 문장을 찾아보세요.',
      explain: 'an exciting plan은 명사이므로 like가 필요해요. It sounds **like** an exciting plan.(신나는 계획 같아.)이 바른 문장이에요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '다음 글을 읽고, Hayun의 기분으로 가장 알맞은 것을 고르세요.\n\nIt was Hayun\'s first day at a new school. She didn\'t know anyone in her class. At lunch, she sat alone and ate quietly. She looked out the window and missed her old friends.',
      choices: ['lonely', 'excited', 'proud', 'angry'],
      answer: 0,
      why: ['', '신날 만한 단서가 없어요. 혼자 앉아 옛 친구들을 그리워했어요.', '자랑스러울 만한 일이 글에 없어요.', '화를 낸 행동이나 말은 없어요. 조용히 혼자 먹었어요.'],
      hint: '아는 사람이 없고, 혼자 앉고, 옛 친구들을 그리워한 단서를 모아 보세요.',
      explain: '새 학교에서 아는 사람이 없고(상황), 혼자 조용히 점심을 먹고(행동), 옛 친구들을 그리워했어요(missed). 단서들이 모두 **lonely**(외로운)를 가리켜요.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 2,
      q: '대화를 읽고 빈칸에 알맞은 한 낱말을 쓰세요.\n\nA: Is it going to rain tomorrow?\nB: I don\'t [[빈칸]] so. The sky is clear.',
      answer: ['think'],
      wrong: [{ a: 'hope', why: 'I don\'t hope so.는 잘 쓰지 않는 말이에요. 의견을 말할 때는 I don\'t think so.(그렇지 않을 것 같아.)라고 해요.' }],
      hint: '"그렇지 않을 것 같아"라는 의견을 나타내는 말이에요.',
      explain: '**I don\'t think so.**는 "그렇지 않다고 생각해, 아닐 것 같아"라는 뜻이에요. 하늘이 맑으니 비가 오지 않을 거라는 의견이에요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '인물의 감정을 **더 생생하게** 묘사한 문장을 고르세요. (긴장한 서준이)',
      choices: ['Seojun\'s hands were shaking, and his voice sounded nervous.', 'Seojun was nervous.', 'Seojun went to the stage.', 'Seojun is a student.'],
      answer: 0,
      why: ['', '감정은 나타냈지만 보이고 들리는 모습이 없어서 덜 생생해요.', '행동만 있고 감정을 알 수 있는 단서가 없어요.', '감정과 상관없는 사실이에요.'],
      explain: '떨리는 손(보이는 모습)과 긴장한 목소리(들리는 모습, sounded nervous)를 함께 써서 서준이의 긴장을 생생하게 보여 줘요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '밑줄 친 that의 쓰임이 나머지 셋과 **다른** 것을 고르세요.',
      choices: ['__That__ bag is mine.', 'I know __that__ you are tired.', 'I hope __that__ she likes the gift.', 'We believe __that__ he is honest.'],
      answer: 0,
      why: ['', 'know 뒤에서 문장(you are tired)을 이끄는 접속사예요.', 'hope 뒤에서 문장(she likes the gift)을 이끄는 접속사예요.', 'believe 뒤에서 문장(he is honest)을 이끄는 접속사예요.'],
      hint: 'that 뒤에 주어 + 동사가 오는지 살펴보세요.',
      explain: 'That bag is mine.의 That은 "저"라는 뜻으로 bag을 꾸며요. 나머지 셋의 that은 뒤에 주어 + 동사가 오는 문장을 이끄는 **접속사**이고, 생략할 수 있어요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', fixed: true, concept: 0,
      q: '다음 중 어법상 바른 문장은 모두 몇 개일까요?\n\n- The flowers smell lovely.\n- He looks like tired.\n- This milk tastes strangely.\n- That sounds like a good idea.\n- I felt sleepy after lunch.',
      choices: ['1개', '2개', '3개', '4개'],
      answer: 2,
      why: ['바른 문장을 더 찾아보세요. lovely는 -ly로 끝나지만 형용사예요.', 'lovely는 -ly로 끝나지만 "사랑스러운"이라는 형용사예요. 이 문장도 바른 문장이에요.', '', '틀린 문장을 바르다고 보았어요. like 뒤의 낱말과 -ly 낱말을 다시 확인해 보세요.'],
      hint: 'lovely는 -ly로 끝나지만 형용사예요(사랑스러운).',
      explain: '바른 문장은 The flowers smell lovely.(lovely는 형용사), That sounds like a good idea.(like + 명사), I felt sleepy after lunch.(feel + 형용사) 세 개예요.\n\n- He looks like tired. → tired는 형용사이므로 like 없이 He looks **tired**.\n- This milk tastes strangely. → 부사가 아니라 형용사 **strange**',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '다음 글에서 Jia의 기분 변화로 가장 알맞은 것을 고르세요.\n\nJia couldn\'t find her cat, Coco, all morning. She looked under the bed and behind the sofa. Her eyes filled with tears. Then she heard a small "meow" from the closet. Coco was sleeping on a sweater! Jia hugged her and laughed.',
      choices: ['worried → relieved', 'happy → bored', 'angry → sad', 'excited → worried'],
      answer: 0,
      why: ['', '처음에는 고양이를 찾지 못해 눈물이 났으니 happy가 아니에요.', '화를 낸 단서는 없고, 마지막에는 웃었어요.', '처음부터 신난 것이 아니라 걱정했고, 마지막에 웃었어요.'],
      hint: '이야기 처음(눈물)과 끝(껴안고 웃음)의 단서를 각각 찾아보세요.',
      explain: '처음에는 고양이를 찾지 못해 눈물이 날 만큼 **걱정했고**(worried), 옷장에서 찾아낸 뒤 껴안고 웃었으니 **안심했어요**(relieved).',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 1,
      q: '우리말에 맞게 빈칸에 알맞은 두 낱말을 쓰세요.\n\n네 목소리는 꼭 가수 같아.\nYour voice [[빈칸]] a singer.',
      answer: ['sounds like'],
      wrong: [
        { a: 'looks like', why: '목소리는 귀로 듣는 것이므로 look이 아니라 sound를 써요.' },
        { a: 'sound like', why: '주어 Your voice는 3인칭 단수예요. 현재형 동사에 -s를 붙여요.' },
        { a: 'sounds', why: 'a singer는 명사이므로 감각동사 뒤에 like를 넣어요.' },
      ],
      hint: '목소리는 어떤 감각으로 느끼나요? 그리고 a singer는 형용사인가요, 명사인가요?',
      explain: '목소리는 듣는 것이므로 sound, 주어가 3인칭 단수이므로 sounds, 뒤에 명사 a singer가 오므로 like를 넣어요. Your voice **sounds like** a singer.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '대화의 흐름으로 보아 빈칸에 가장 알맞은 말을 고르세요.\n\nA: Doyun hurt his leg in the soccer game.\nB: Oh, no! [[빈칸]]\nA: Me, too. Let\'s visit him tomorrow.',
      choices: ['I hope he gets well soon.', 'I think he is a good player.', 'I know he likes soccer.', 'I hope he plays the next game today.'],
      answer: 0,
      why: ['', '다리를 다친 친구 이야기에 이어지기 어려워요. A의 "Me, too."와도 맞지 않아요.', '다친 친구를 걱정하는 흐름과 맞지 않아요.', '다리를 다쳤는데 오늘 경기를 하길 바라는 것은 흐름에 맞지 않아요.'],
      hint: '친구가 다쳤을 때 할 수 있는 말, 그리고 A가 "Me, too."라고 답한 것을 생각해 보세요.',
      explain: '다친 친구가 빨리 낫기를 바라는 **I hope (that) he gets well soon.**이 알맞아요. A도 "Me, too.(나도 그래.)"라고 하고 병문안을 가자고 하지요.',
    },
  ],

  deeper: [
    {
      title: '-ed 형용사와 -ing 형용사',
      body: '감정을 나타내는 형용사는 두 가지 모양이 있어서 헷갈리기 쉬워요.\n\n| -ed (감정을 느끼는 쪽) | -ing (감정을 일으키는 쪽) |\n|---|---|\n| I am **bored**. 나는 지루해요. | The class is **boring**. 그 수업은 지루해요. |\n| She was **excited**. 그녀는 신났어요. | The game was **exciting**. 그 경기는 신났어요. |\n| He looked **surprised**. 그는 놀란 것 같았어요. | The news was **surprising**. 그 소식은 놀라웠어요. |\n\n사람이 그 감정을 **느끼면** -ed, 어떤 것이 그 감정을 **느끼게 만들면** -ing예요. 그래서 "I am boring."이라고 하면 "나는 (남을) 지루하게 만드는 사람이에요"라는 뜻이 돼요!\n\n중학교 2학년에서는 hear, see 같은 지각동사로 "누가 ~하는 것을 보다/듣다"를 말하는 방법을 배워요.',
    },
  ],

  faq: [
    {
      q: '"행복하게 보여"인데 왜 happily가 아니라 happy예요?',
      a: '우리말로 "~하게"라고 해석될 뿐, 영어에서 happy가 설명하는 것은 "보는 동작"이 아니라 **주어**예요. You look happy.는 "너 = 행복한 상태"라는 뜻이지요. 그래서 be동사처럼 형용사를 써요.',
    },
    {
      q: 'I think that에서 that은 언제 빼도 돼요?',
      a: 'think, hope, know, believe 뒤에서 문장을 이끄는 that은 말할 때나 편한 글에서 거의 언제나 뺄 수 있어요. 뜻은 똑같아요. 다만 that 뒤에 주어 + 동사가 있는 완전한 문장이 와야 해요.',
    },
    {
      q: '"그거 좋은 생각 같아"는 That sounds good이에요, That sounds like good이에요?',
      a: 'good은 형용사이므로 **That sounds good.**이에요. 명사를 쓰고 싶으면 That sounds like **a good idea**.처럼 like + 명사로 써요.',
    },
  ],

  mistakes: [
    '감각동사 뒤에 부사를 쓰는 실수 — You look sadly.(✗) → You look **sad**. / It tastes well.(✗) → It tastes **good**.',
    '감각동사 뒤 명사 앞에 like를 빠뜨리는 실수 — It looks a cloud.(✗) → It looks **like** a cloud.',
    '형용사 앞에 like를 넣는 실수 — She looks like happy.(✗) → She looks **happy**.',
  ],

  gens: [
    {
      id: 'sense-verb-complement',
      level: 1,
      title: '감각동사 뒤에 알맞은 말 고르기 (형용사·like + 명사)',
      make: function (R) {
        // 형용사 문장: [주어, 감각동사, 형용사, 부사, 뜻]
        var adjs = [
          ['This soup', 'smells', 'delicious', 'deliciously', '이 수프는 맛있는 냄새가 나요.'],
          ['Your idea', 'sounds', 'great', 'greatly', '네 생각은 좋게 들려요.'],
          ['The blanket', 'feels', 'soft', 'softly', '그 담요는 부드러운 느낌이 들어요.'],
          ['Minsu', 'looks', 'tired', 'tiredly', '민수는 피곤해 보여요.'],
          ['This lemon', 'tastes', 'sour', 'sourly', '이 레몬은 신맛이 나요.'],
          ['The music', 'sounds', 'beautiful', 'beautifully', '그 음악은 아름답게 들려요.'],
          ['Jia', 'looks', 'happy', 'happily', '지아는 행복해 보여요.'],
          ['The bread', 'smells', 'sweet', 'sweetly', '그 빵은 달콤한 냄새가 나요.'],
          ['The water', 'feels', 'cold', 'coldly', '물이 차갑게 느껴져요.'],
          ['This medicine', 'tastes', 'bitter', 'bitterly', '이 약은 쓴맛이 나요.'],
          ['Your voice', 'sounds', 'sad', 'sadly', '네 목소리가 슬프게 들려요.'],
          ['The baby', 'looks', 'sleepy', 'sleepily', '아기가 졸려 보여요.'],
          ['This cake', 'tastes', 'good', 'well', '이 케이크는 맛이 좋아요.'],
        ];
        // like 문장: [주어, 감각동사, 명사, 뜻]
        var nouns = [
          ['That cloud', 'looks', 'a rabbit', '저 구름은 토끼처럼 보여요.'],
          ['This candy', 'tastes', 'strawberries', '이 사탕은 딸기 맛이 나요.'],
          ['Your plan', 'sounds', 'a great idea', '네 계획은 좋은 생각 같아요.'],
          ['This room', 'smells', 'flowers', '이 방은 꽃 냄새가 나요.'],
          ['The stone', 'feels', 'ice', '그 돌은 얼음처럼 차갑게 느껴져요.'],
          ['Your sister', 'looks', 'your mom', '네 여동생은 엄마를 닮았어요.'],
          ['That noise', 'sounds', 'thunder', '저 소리는 천둥처럼 들려요.'],
        ];
        var useLike = R.int(1, 3) === 1;
        var correct, wrongs, reasons = {}, q, meaning;
        if (!useLike) {
          var a = R.pick(adjs);
          correct = a[2];
          wrongs = [a[3], 'like ' + a[2]];
          reasons[a[3]] = a[3] + '는 부사예요. 감각동사 뒤에는 형용사를 써요.';
          reasons['like ' + a[2]] = 'like 뒤에는 명사가 와요. 형용사 ' + a[2] + ' 앞에는 like를 쓰지 않아요.';
          if (a[2] === 'good') reasons.well = 'well은 "잘"이라는 부사예요. 감각동사 뒤에는 형용사 good을 써요.';
          q = a[0] + ' ' + a[1] + ' [[빈칸]].';
          meaning = a[4];
        } else {
          var n = R.pick(nouns);
          correct = 'like ' + n[2];
          wrongs = [n[2], 'alike ' + n[2]];
          reasons[n[2]] = '빈칸에 들어갈 말이 명사예요. 감각동사 뒤에 명사를 쓸 때는 like를 넣어요.';
          reasons['alike ' + n[2]] = 'alike는 명사 앞에 쓰지 않아요. "~처럼"은 like로 나타내요.';
          q = n[0] + ' ' + n[1] + ' [[빈칸]].';
          meaning = n[3];
        }
        var pick = R.choices(correct, wrongs, 3);
        return {
          type: 'choice', concept: useLike ? 1 : 0,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + q,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reasons[c]; }),
          explain: (useLike ? '감각동사 뒤에 명사가 오므로 like를 넣어요: **' : '감각동사 뒤에는 형용사를 써요: **') + correct + '**\n\n해석: ' + meaning,
        };
      },
    },
  ],

  vocab: [
    { w: 'look', m: '~해 보이다', ex: 'You look great in that shirt.', exm: '너 그 셔츠 입으니 멋져 보여.' },
    { w: 'sound', m: '~하게 들리다', ex: 'Your plan sounds interesting.', exm: '네 계획은 재미있게 들려.' },
    { w: 'smell', m: '~한 냄새가 나다', ex: 'The flowers smell sweet.', exm: '꽃에서 달콤한 냄새가 나요.' },
    { w: 'taste', m: '~한 맛이 나다', ex: 'This kimchi tastes a little spicy.', exm: '이 김치는 조금 매운맛이 나요.' },
    { w: 'feel', m: '~한 느낌이 들다', ex: 'I feel tired after the long walk.', exm: '오래 걸었더니 피곤해요.' },
    { w: 'nervous', m: '긴장한, 불안한', ex: 'I was nervous before my speech.', exm: '나는 발표 전에 긴장했어요.' },
    { w: 'excited', m: '신난, 들뜬', ex: 'The kids were excited about the trip.', exm: '아이들은 여행 때문에 들떠 있었어요.' },
    { w: 'worried', m: '걱정하는', ex: 'He looks worried about something.', exm: '그는 뭔가를 걱정하는 것 같아요.' },
    { w: 'proud', m: '자랑스러운', ex: 'I\'m proud of my little brother.', exm: '나는 남동생이 자랑스러워요.' },
    { w: 'lonely', m: '외로운', ex: 'She felt lonely in the new town.', exm: '그녀는 새 동네에서 외로움을 느꼈어요.' },
    { w: 'upset', m: '속상한, 화가 난', ex: 'Minsu was upset about the lost game.', exm: '민수는 경기에 져서 속상했어요.' },
    { w: 'relieved', m: '안심한', ex: 'I was relieved to find my wallet.', exm: '지갑을 찾아서 안심했어요.' },
    { w: 'believe', m: '믿다', ex: 'I believe that you can do it.', exm: '나는 네가 할 수 있다고 믿어.' },
    { w: 'delicious', m: '아주 맛있는', ex: 'The pizza smells delicious.', exm: '피자에서 아주 맛있는 냄새가 나요.' },
  ],
});
