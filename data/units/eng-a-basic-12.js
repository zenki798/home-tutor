/* 다시 시작하는 영어 기초 문법 · 문장 이어 늘리기
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 인물). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  // and·but·or·so 생성기: [우리말, 영어 문장, 정답]
  var CJ = [
    ['피곤해서 일찍 잤습니다.', 'I was tired, ___ I went to bed early.', 'so'],
    ['비가 와서 우리는 집에 있었습니다.', 'It was raining, ___ we stayed home.', 'so'],
    ['버스를 놓쳐서 택시를 탔습니다.', 'I missed the bus, ___ I took a taxi.', 'so'],
    ['가게가 문을 닫아서 우유를 사지 못했습니다.', 'The store was closed, ___ I couldn\'t buy any milk.', 'so'],
    ['배가 고파서 국수를 끓였습니다.', 'I was hungry, ___ I cooked some noodles.', 'so'],
    ['전화했지만 지아는 받지 않았습니다.', 'I called Jia, ___ she didn\'t answer.', 'but'],
    ['그 셔츠는 예뻤지만 너무 비쌌습니다.', 'The shirt was pretty, ___ it was too expensive.', 'but'],
    ['열심히 공부했지만 시험에 떨어졌습니다.', 'I studied hard, ___ I failed the test.', 'but'],
    ['그 식당은 작지만 음식이 아주 맛있습니다.', 'The restaurant is small, ___ the food is very good.', 'but'],
    ['저는 수영을 할 줄 알지만 잘하지는 못합니다.', 'I can swim, ___ not very well.', 'but'],
    ['저는 저녁을 먹고 설거지를 했습니다.', 'I ate dinner ___ washed the dishes.', 'and'],
    ['민수는 기타를 치고 노래도 합니다.', 'Minsu plays the guitar ___ sings.', 'and'],
    ['우리는 시장에 가서 과일을 샀습니다.', 'We went to the market ___ bought some fruit.', 'and'],
    ['그녀는 친절하고 똑똑합니다.', 'She is kind ___ smart.', 'and'],
    ['빵과 우유를 샀습니다.', 'I bought bread ___ milk.', 'and'],
    ['차 드실래요, 커피 드실래요?', 'Would you like tea ___ coffee?', 'or'],
    ['버스로 갈까요, 지하철로 갈까요?', 'Should we take the bus ___ the subway?', 'or'],
    ['오늘이나 내일 전화할게요.', 'I will call you today ___ tomorrow.', 'or'],
    ['현금으로 내시겠어요, 카드로 내시겠어요?', 'Will you pay in cash ___ by card?', 'or'],
    ['서두르세요, 그렇지 않으면 기차를 놓칠 거예요.', 'Hurry up, ___ you will miss the train.', 'or'],
  ];
  var CJ_WHY = {
    and: 'and — "그리고, ~하고"처럼 비슷한 내용을 덧붙일 때 씁니다.',
    but: 'but — "그러나, ~지만"처럼 앞과 반대되는 내용을 이을 때 씁니다.',
    or: 'or — "또는, 아니면"처럼 고를 것을 이을 때 씁니다. 명령문 뒤에서는 "그렇지 않으면"이라는 뜻입니다.',
    so: 'so — "그래서"처럼 앞 내용의 결과를 이을 때 씁니다.',
  };

  // because·when·if 생성기: [우리말, 영어 문장, 정답]
  var BW = [
    ['감기에 걸려서 회사에 가지 않았습니다.', 'I stayed home from work ___ I had a cold.', 'because'],
    ['그녀는 시험에 합격해서 행복합니다.', 'She is happy ___ she passed the test.', 'because'],
    ['길이 많이 막혀서 늦었습니다.', 'I was late ___ the traffic was heavy.', 'because'],
    ['너무 비싸서 우리는 그 차를 사지 않았습니다.', 'We didn\'t buy the car ___ it was too expensive.', 'because'],
    ['그는 배가 고파서 점심을 일찍 먹었습니다.', 'He had lunch early ___ he was hungry.', 'because'],
    ['건강에 좋아서 저는 매일 걷습니다.', 'I walk every day ___ it is good for my health.', 'because'],
    ['커피가 싸서 저는 이 카페를 좋아합니다.', 'I like this cafe ___ the coffee is cheap.', 'because'],
    ['어렸을 때 저는 부산에 살았습니다.', 'I lived in Busan ___ I was a child.', 'when'],
    ['제가 집에 왔을 때 아이들은 자고 있었습니다.', 'The kids were sleeping ___ I came home.', 'when'],
    ['그녀는 젊었을 때 간호사였습니다.', 'She was a nurse ___ she was young.', 'when'],
    ['전화가 울렸을 때 저는 샤워 중이었습니다.', 'I was taking a shower ___ the phone rang.', 'when'],
    ['그 소식을 들었을 때 저는 정말 기뻤습니다.', 'I was really happy ___ I heard the news.', 'when'],
    ['대학생이었을 때 저는 카페에서 일했습니다.', 'I worked at a cafe ___ I was in college.', 'when'],
    ['제가 전화했을 때 그는 회의 중이었습니다.', 'He was in a meeting ___ I called him.', 'when'],
    // if 문항의 우리말에는 '만약·혹시'를 넣는다(그냥 "-면"이면 꼭 일어날 일의 when 으로도 읽혀 정답이 둘이 될 수 있다)
    ['만약 내일 비가 오면 우리는 집에 있을 거예요.', 'We will stay home ___ it rains tomorrow.', 'if'],
    ['혹시 우산이 필요하면 빌려 드릴 수 있어요.', 'I can lend you an umbrella ___ you need one.', 'if'],
    ['만약 서두르면 기차를 탈 수 있어요.', 'You can catch the train ___ you hurry.', 'if'],
    ['혹시 배가 고프면 냉장고에 샌드위치가 있어요.', 'There is a sandwich in the fridge ___ you are hungry.', 'if'],
    ['혹시 길을 잃으면 제게 전화하세요.', 'Please call me ___ you get lost.', 'if'],
    ['만약 너무 비싸면 사지 마세요.', 'Don\'t buy it ___ it is too expensive.', 'if'],
  ];
  var BW_WHY = {
    because: 'because — "~ 때문에, ~해서"처럼 이유를 덧붙일 때 씁니다.',
    when: 'when — "~할 때, ~했을 때"처럼 때를 덧붙일 때 씁니다.',
    'if': 'if — "만약 ~하면"처럼 아직 정해지지 않은 조건을 덧붙일 때 씁니다.',
  };

  // to부정사·동명사 생성기: [문장, 원형, 'to'|'ing', -ing 꼴, 앞 동사, 우리말]
  var TG = [
    ['I want ___ (learn) Spanish.', 'learn', 'to', 'learning', 'want', '저는 스페인어를 배우고 싶습니다.'],
    ['We need ___ (leave) now.', 'leave', 'to', 'leaving', 'need', '우리는 지금 떠나야 합니다.'],
    ['She hopes ___ (visit) Jeju this summer.', 'visit', 'to', 'visiting', 'hope', '그녀는 올여름에 제주도에 가기를 바랍니다.'],
    ['They plan ___ (open) a bakery.', 'open', 'to', 'opening', 'plan', '그들은 빵집을 열 계획입니다.'],
    ['He decided ___ (move) to Daejeon.', 'move', 'to', 'moving', 'decide', '그는 대전으로 이사하기로 했습니다.'],
    ['I would like ___ (ask) a question.', 'ask', 'to', 'asking', 'would like', '질문을 하나 드리고 싶습니다.'],
    ['Would you like ___ (join) us for lunch?', 'join', 'to', 'joining', 'would like', '저희와 점심 같이 하시겠어요?'],
    ['I need ___ (call) my mother tonight.', 'call', 'to', 'calling', 'need', '저는 오늘 밤 어머니께 전화를 드려야 합니다.'],
    ['We decided ___ (meet) at six.', 'meet', 'to', 'meeting', 'decide', '우리는 여섯 시에 만나기로 했습니다.'],
    ['I hope ___ (see) you again soon.', 'see', 'to', 'seeing', 'hope', '곧 다시 뵙기를 바랍니다.'],
    ['I enjoy ___ (cook) for my family.', 'cook', 'ing', 'cooking', 'enjoy', '저는 가족을 위해 요리하는 것을 즐깁니다.'],
    ['Have you finished ___ (read) the report?', 'read', 'ing', 'reading', 'finish', '보고서를 다 읽으셨나요?'],
    ['Do you mind ___ (wait) a few minutes?', 'wait', 'ing', 'waiting', 'mind', '몇 분만 기다려 주시겠어요?'],
    ['He kept ___ (talk) during the movie.', 'talk', 'ing', 'talking', 'keep', '그는 영화를 보는 내내 계속 이야기했습니다.'],
    ['My father gave up ___ (drink) coffee.', 'drink', 'ing', 'drinking', 'give up', '제 아버지는 커피를 끊으셨습니다.'],
    ['You should avoid ___ (eat) late at night.', 'eat', 'ing', 'eating', 'avoid', '밤늦게 먹는 것은 피하는 게 좋습니다.'],
    ['She finished ___ (write) the email.', 'write', 'ing', 'writing', 'finish', '그녀는 이메일을 다 썼습니다.'],
    ['We enjoyed ___ (walk) along the beach.', 'walk', 'ing', 'walking', 'enjoy', '우리는 해변을 따라 걷는 것을 즐겼습니다.'],
    ['I finished ___ (clean) the kitchen.', 'clean', 'ing', 'cleaning', 'finish', '저는 부엌 청소를 끝냈습니다.'],
    ['Would you mind ___ (open) the window?', 'open', 'ing', 'opening', 'mind', '창문 좀 열어 주시겠어요?'],
  ];

  Tutor.registerUnit({
    id: 'eng-a-basic-12',
    course: 'eng-a-basic',
    title: '문장 이어 늘리기',
    summary: '접속사와 to부정사, 동명사를 활용해 짧은 문장을 이어 길고 자연스러운 문장으로 말합니다.',
    goals: [
      'and·but·or·so로 두 문장을 뜻에 맞게 이을 수 있다.',
      'because·when·if로 이유·때·조건을 덧붙일 수 있다.',
      'I think (that) ~ 꼴로 생각과 의견을 말할 수 있다.',
      '동사에 따라 to부정사와 동명사(-ing)를 골라 쓰고, "~하기 위해"를 to부정사로 말할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: 'and, but, or, so로 문장 잇기',
        body: '짧은 문장 두 개를 이으면 말이 자연스러워집니다. 가장 기본이 되는 연결어는 네 개입니다.\n\n| 말 | 뜻 | 예 |\n|---|---|---|\n| **and** | 그리고, ~하고 (덧붙임) | I ate dinner **and** watched TV. |\n| **but** | 그러나, ~지만 (반대) | The bag is nice, **but** it is too heavy. |\n| **or** | 또는, 아니면 (선택) | Do you want tea **or** coffee? |\n| **so** | 그래서 (결과) | It was cold, **so** I wore a coat. |\n\n- 낱말끼리도 잇습니다: bread **and** milk, tea **or** coffee\n- 문장끼리 이을 때는 but, so 앞에 쉼표를 찍는 일이 많습니다.\n- 명령문 뒤의 or는 "그렇지 않으면"입니다: Hurry up, **or** you\'ll be late. (서두르세요, 안 그러면 늦어요.)\n\n> 💡 so 뒤에는 **결과**가 옵니다. "원인, so 결과" 순서입니다. I was tired, so I slept early. (피곤했다 → 그래서 일찍 잤다)',
        easy: '연결어는 두 문장 사이에 놓는 다리입니다. 다리 이름만 잘 고르면 됩니다.\n\n- 같은 쪽으로 이어지면 → and\n- 반대쪽으로 꺾이면 → but\n- 둘 중 하나를 고르면 → or\n- "그래서"로 결과가 나오면 → so\n\n우리말 "~고, ~지만, ~거나, ~해서"를 떠올리면 쉽게 고를 수 있습니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nIt was raining, ___ we stayed home.',
          choices: ['but', 'so', 'or'],
          answer: 1,
          why: [
            'but — 반대되는 내용을 잇습니다. 비가 와서 집에 있었다는 것은 반대가 아니라 결과입니다.',
            '',
            'or — 고를 것을 잇습니다. 이 문장에는 고를 것이 없습니다.',
          ],
          explain: '비가 왔다(원인) → 그래서 집에 있었다(결과)이므로 **so**를 씁니다. "비가 와서 우리는 집에 있었습니다."',
        },
      },
      {
        title: 'because, when, if로 이유·때·조건 덧붙이기',
        body: '한 문장에 **이유·때·조건**을 덧붙일 때는 아래 말을 씁니다. 이 말이 이끄는 부분은 문장 앞에도, 뒤에도 올 수 있습니다.\n\n| 말 | 뜻 | 예 |\n|---|---|---|\n| **because** | ~ 때문에, ~해서 (이유) | I was late **because** the bus didn\'t come. |\n| **when** | ~할 때 (때) | **When** I was young, I lived in Mokpo. |\n| **if** | 만약 ~하면 (조건) | **If** you are busy, I can call later. |\n\n- 문장 앞에 오면 그 부분 끝에 쉼표: **When** I got home, my son was asleep.\n- 문장 뒤에 오면 보통 쉼표 없이: My son was asleep **when** I got home.\n\n앞으로의 일에서 **when**은 꼭 일어날 일의 때, **if**는 일어날지 모르는 조건에 씁니다.\n\n- **When** I get home, I\'ll call you. (집에 꼭 갈 것이고, 그때 전화한다)\n- **If** I have time, I\'ll call you. (시간이 날지 모르지만, 나면 전화한다)\n\n**because와 so는 방향이 반대입니다.**\n\n- I stayed home **because** I was sick. (because 뒤 = 이유)\n- I was sick, **so** I stayed home. (so 뒤 = 결과)\n\n> ⚠️ if·when 뒤에서는 앞으로의 일도 **현재형**으로 씁니다. If it **rains** tomorrow, I will stay home. (If it will rain ✗)',
        easy: 'because·when·if는 큰 문장에 붙이는 **설명 꼬리표**입니다.\n\n- 왜? → because 꼬리표: …because I was sick.\n- 언제? → when 꼬리표: …when I was a child.\n- 어떤 경우에? → if 꼬리표: …if it rains.\n\n꼬리표를 문장 맨 앞에 달면 쉼표로 경계를 표시해 줍니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI will call you ___ I arrive at the station.',
          choices: ['because', 'when', 'but'],
          answer: 1,
          why: [
            'because — 이유를 덧붙입니다. 역에 도착하는 것은 전화하는 이유가 아니라 전화할 때입니다.',
            '',
            'but — 반대되는 내용을 잇습니다. 두 내용은 반대가 아닙니다.',
          ],
          explain: '"역에 도착할 때 전화할게요"이므로 때를 나타내는 **when**을 씁니다. when 뒤에서는 앞으로의 일도 현재형(arrive)으로 씁니다.',
        },
      },
      {
        title: 'that으로 생각 말하기 — I think that ~',
        body: '"~라고 생각해요", "~라는 것을 알아요"처럼 생각이나 아는 내용을 말할 때는 **that + 문장**을 동사 뒤에 붙입니다.\n\n| 꼴 | 뜻 | 예 |\n|---|---|---|\n| I think (that) ~ | ~라고 생각한다 | I think (that) this plan is good. |\n| I know (that) ~ | ~라는 것을 안다 | I know (that) you are busy. |\n| I hope (that) ~ | ~하기를 바란다 | I hope (that) you feel better soon. |\n| I believe (that) ~ | ~라고 믿는다 | I believe (that) he is honest. |\n| I\'m sure (that) ~ | ~라고 확신한다 | I\'m sure (that) she will come. |\n\n- 이 **that은 흔히 생략**합니다. 말할 때는 I think this plan is good. 처럼 that 없이 쓰는 일이 더 많습니다.\n- that 뒤에는 **주어 + 동사**가 있는 온전한 문장이 옵니다.\n\n> 💡 "~가 아니라고 생각한다"는 영어로 보통 앞의 think를 부정합니다. I **don\'t think** it\'s true. (그게 사실이 아닌 것 같아요) — I think it isn\'t true. 보다 부드럽고 흔한 말입니다.',
        easy: 'that은 "~라는 것"을 담는 **상자**입니다. 상자 안에는 완성된 문장이 하나 들어갑니다.\n\nI think + [상자: the movie is fun] → I think that the movie is fun.\n\n상자 뚜껑(that)은 열어 둔 채로 빼도 됩니다. I think the movie is fun.',
        check: {
          type: 'ox',
          q: '다음 두 문장은 뜻이 같고 둘 다 바른 문장입니다.\n\nI think that Minsu is right.\nI think Minsu is right.',
          answer: true,
          explain: 'think 뒤에서 생각의 내용을 이끄는 **that은 생략할 수 있습니다.** 두 문장 모두 "민수가 옳다고 생각해요"라는 뜻입니다.',
        },
      },
      {
        title: 'to부정사 기초 — want to ~, ~하기 위해',
        body: '**to + 동사원형**을 **to부정사**라고 합니다. 동사 뒤에 다른 동작을 붙이거나, 목적을 말할 때 씁니다.\n\n**① 동사 + to부정사 (~하기를, ~하는 것을)**\n\n| 동사 | 예 |\n|---|---|\n| want to (~하고 싶다) | I **want to learn** Chinese. |\n| need to (~해야 한다) | We **need to talk**. |\n| hope to (~하기를 바라다) | I **hope to see** you soon. |\n| plan to (~할 계획이다) | They **plan to move** next year. |\n| decide to (~하기로 하다) | She **decided to quit** her job. |\n| would like to (~하고 싶다, 정중하게) | I**\'d like to book** a room. |\n\n**② ~하기 위해 (목적)**\n\n- I went to the bank **to open** an account. (계좌를 만들기 위해 은행에 갔다)\n- She studies hard **to pass** the exam. (시험에 합격하기 위해 열심히 공부한다)\n\n"왜 갔어요?"라고 물으면 To open an account. 처럼 to부정사만으로 답하기도 합니다.\n\n> ⚠️ to 뒤에는 늘 **동사원형**: want to goes (✗), want to going (✗) → want to **go** (○)',
        easy: 'to는 **앞으로 향하는 화살표**라고 생각하면 쉽습니다.\n\n- want **to** go → 가는 쪽으로 마음이 향한다 (가고 싶다)\n- plan **to** move → 이사하는 쪽으로 계획이 향한다\n- went to the bank **to** open an account → 계좌를 여는 쪽으로 발걸음이 향했다 (그러려고 갔다)\n\n아직 하지 않은, 앞으로 할 일을 가리키는 동사들이 to를 좋아합니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI went to the bakery ___ some bread.',
          choices: ['buy', 'buying', 'to buy'],
          answer: 2,
          why: [
            '한 문장에 동사 went가 이미 있습니다. 목적(~하기 위해)을 덧붙일 때는 to + 동사원형을 씁니다.',
            '"~하기 위해"라는 목적은 -ing가 아니라 to부정사로 나타냅니다.',
            '',
          ],
          explain: '"빵을 사기 위해" 빵집에 갔으므로 목적을 나타내는 **to buy**를 씁니다. "저는 빵을 사러 빵집에 갔습니다."',
        },
      },
      {
        title: '동명사 기초 — enjoy -ing, 주어가 되는 -ing',
        body: '동사원형에 **-ing**를 붙여 "~하는 것"이라는 명사처럼 쓰는 것을 **동명사**라고 합니다.\n\n**① 주어 자리의 -ing**\n\n- **Walking** is good for your health. (걷는 것은 건강에 좋다)\n- **Learning** a language takes time. (언어를 배우는 것은 시간이 걸린다)\n\n동명사 주어는 하나로 보아 동사에 **is, takes**처럼 단수형을 씁니다.\n\n**② -ing만 뒤에 오는 동사**\n\n| 동사 | 예 |\n|---|---|\n| enjoy (즐기다) | I **enjoy cooking**. |\n| finish (끝내다) | Did you **finish writing** the email? |\n| mind (꺼리다) | Do you **mind waiting**? (기다려 주시겠어요?) |\n| keep (계속하다) | He **kept talking**. |\n| give up (그만두다) | She **gave up eating** sweets. |\n| avoid (피하다) | **Avoid using** your phone while driving. |\n\n**to부정사와 비교**\n\n| to부정사만 | -ing만 | 둘 다 |\n|---|---|---|\n| want, need, hope, plan, decide | enjoy, finish, mind, keep, give up, avoid | like, love, start, begin |\n\n- I **like swimming**. = I **like to swim**. / It **started raining**. = It **started to rain**.\n\n> 💡 -ing 철자: 대부분 + ing(read → reading), e로 끝나면 e를 빼고(make → making), "짧은 모음 + 자음"이면 자음을 한 번 더(swim → swimming)',
        easy: 'to부정사는 "앞으로 할 일", -ing는 "이미 하고 있거나 겪어 본 일"에 가깝다고 느끼면 기억하기 쉽습니다.\n\n- enjoy → 이미 하면서 즐기는 것 → enjoy **cooking**\n- finish → 하던 것을 끝내는 것 → finish **writing**\n- want → 아직 안 한 일을 바라는 것 → want **to cook**\n\n늘 맞는 규칙은 아니니 자주 쓰는 동사는 짝으로 소리 내어 익혀 둡니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI enjoy ___ in the park on Sundays.',
          choices: ['walking', 'to walk', 'walk'],
          answer: 0,
          why: [
            '',
            'enjoy 뒤에는 to부정사가 아니라 -ing(동명사)를 씁니다.',
            '한 문장에 동사 enjoy가 이미 있습니다. enjoy 뒤에는 -ing 꼴을 씁니다.',
          ],
          explain: 'enjoy는 뒤에 -ing만 오는 동사입니다: **I enjoy walking in the park on Sundays.** "저는 일요일마다 공원에서 걷는 것을 즐깁니다."',
        },
      },
    ],

    examples: [
      {
        q: '두 문장을 알맞은 말로 이어 한 문장으로 만들어 보세요.\n\nI missed the last bus. I took a taxi home.',
        steps: [
          '두 문장의 관계를 봅니다. 막차를 놓친 것이 원인, 택시를 탄 것이 결과입니다.',
          '결과 앞에는 so를 씁니다: I missed the last bus, so I took a taxi home.',
          '이유 앞에 because를 써서 순서를 바꿀 수도 있습니다: I took a taxi home because I missed the last bus.',
        ],
        answer: 'I missed the last bus, so I took a taxi home. / I took a taxi home because I missed the last bus. (막차를 놓쳐서 택시를 타고 집에 갔습니다.)',
      },
      {
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 보세요.\n\nI want ___ (start) a new hobby. I enjoy ___ (draw), so I will take a drawing class ___ (improve) my skills.',
        steps: [
          'want 뒤에는 to부정사가 옵니다: want to start',
          'enjoy 뒤에는 -ing가 옵니다: enjoy drawing',
          '마지막 빈칸은 "실력을 늘리기 위해"라는 목적이므로 to부정사: to improve',
        ],
        answer: 'I want to start a new hobby. I enjoy drawing, so I will take a drawing class to improve my skills. (새 취미를 시작하고 싶습니다. 그림 그리기를 좋아해서 실력을 늘리려고 그림 수업을 들을 생각입니다.)',
      },
    ],

    terms: [
      { term: '접속사', def: '낱말과 낱말, 문장과 문장을 이어 주는 말입니다. 예: and, but, or, so, because, when, if' },
      { term: '이유·때·조건', def: 'because(~ 때문에), when(~할 때), if(만약 ~하면)가 덧붙이는 내용입니다. 이 부분은 문장 앞이나 뒤에 올 수 있습니다.' },
      { term: 'that절', def: 'that + 주어 + 동사로 "~라는 것"을 나타내는 부분입니다. I think, I know, I hope 뒤에 자주 오고 that은 생략할 수 있습니다.' },
      { term: 'to부정사', def: 'to + 동사원형입니다. want to go(가고 싶다)처럼 동사 뒤에 오거나, to buy(사기 위해)처럼 목적을 나타냅니다.' },
      { term: '동명사', def: '동사원형 + -ing로 "~하는 것"을 나타냅니다. 주어가 되거나(Walking is fun.) enjoy, finish 같은 동사 뒤에 옵니다.' },
      { term: '목적', def: '"~하기 위해, ~하려고"라는 뜻입니다. 영어에서는 to부정사로 나타냅니다. 예: I went out to buy milk.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n저는 개를 좋아하지만 고양이는 좋아하지 않습니다.\n→ I like dogs, ___ I don\'t like cats.',
        choices: ['and', 'or', 'so', 'but'],
        answer: 3,
        why: [
          'and — 비슷한 내용을 덧붙입니다. 우리말 "~지만"은 반대되는 내용을 잇는 말입니다.',
          'or — "또는"이라는 선택입니다.',
          'so — "그래서"라는 결과입니다. 개를 좋아하는 것이 고양이를 싫어하는 까닭은 아닙니다.',
          '',
        ],
        explain: '"~지만"처럼 반대되는 내용을 이을 때는 **but**을 씁니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '다음 문장은 "피곤해서 일찍 잤습니다."라는 뜻입니다.\n\nI went to bed early, so I was tired.',
        answer: false,
        explain: 'so 뒤에는 **결과**가 옵니다. 이 문장은 "일찍 잤다, 그래서 피곤했다"가 되어 뜻이 뒤바뀌었습니다. "피곤해서 일찍 잤다"는 **I was tired, so I went to bed early.** 입니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 말을 고르세요.\n\nIf it ___ tomorrow, we will cancel the picnic.',
        choices: ['will rain', 'rains', 'rained'],
        answer: 1,
        why: [
          'if 뒤에서는 앞으로의 일도 현재형으로 씁니다. will rain을 쓰지 않습니다.',
          '',
          'rained는 과거형입니다. 내일의 일이므로 현재형 rains를 씁니다.',
        ],
        explain: 'if가 이끄는 조건 부분에서는 앞으로의 일도 **현재형**으로 씁니다: **If it rains tomorrow, we will cancel the picnic.** "내일 비가 오면 소풍을 취소할 거예요."',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'text', concept: 1,
        q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n너무 추워서 밖에 나가지 않았습니다.\n→ I didn\'t go out ___ it was too cold.',
        answer: ['because', 'as', 'since'],
        hint: '빈칸 뒤가 나가지 않은 이유입니다.',
        wrong: [
          { a: 'so', why: 'so 뒤에는 결과가 옵니다. 빈칸 뒤(너무 추웠다)는 이유이므로 because를 씁니다.' },
          { a: 'when', why: 'when — "~할 때"라는 때입니다. 우리말 "추워서"는 이유입니다.' },
          { a: 'but', why: 'but — 반대되는 내용을 잇습니다. 추워서 나가지 않은 것은 반대가 아닙니다.' },
        ],
        explain: '이유를 덧붙일 때는 **because**를 씁니다: I didn\'t go out because it was too cold. (as, since도 이유를 나타낼 수 있습니다.)',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nI think ___ he is a good doctor.',
        choices: ['what', 'that', 'because'],
        answer: 1,
        why: [
          'what — "무엇"이라는 뜻이라 생각의 내용을 이끌지 않습니다.',
          '',
          'because — 이유를 덧붙이는 말입니다. "그가 좋은 의사라고 생각한다"는 생각의 내용입니다.',
        ],
        explain: '생각의 내용은 **that + 주어 + 동사**로 붙입니다: I think that he is a good doctor. (that은 빼도 됩니다.)',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nShe wants ___ a nurse.',
        choices: ['be', 'being', 'to be'],
        answer: 2,
        why: [
          'want 뒤에 동사원형을 바로 쓰지 않습니다. want to + 동사원형입니다.',
          'want 뒤에는 -ing가 아니라 to부정사를 씁니다.',
          '',
        ],
        explain: 'want 뒤에는 to부정사가 옵니다: **She wants to be a nurse.** "그녀는 간호사가 되고 싶어 합니다."',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'text', concept: 4,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰세요.\n\nI enjoy ___ (watch) movies at home.',
        answer: ['watching'],
        wrong: [
          { a: 'to watch', why: 'enjoy 뒤에는 to부정사가 아니라 -ing를 씁니다.' },
          { a: 'watch', why: '한 문장에 동사 enjoy가 이미 있습니다. enjoy 뒤에는 -ing 꼴을 씁니다.' },
          { a: 'watchs', why: 'enjoy 뒤에는 -ing 꼴을 씁니다(watching).' },
        ],
        explain: 'enjoy + -ing: **I enjoy watching movies at home.** "저는 집에서 영화 보는 것을 즐깁니다."',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 말을 고르세요.\n\n___ every day is good for your health.',
        choices: ['Walk', 'Walks', 'Walking'],
        answer: 2,
        why: [
          '동사원형 Walk로 시작하면 "걸어라"라는 명령문처럼 됩니다. 주어 자리에는 "걷는 것"이라는 동명사를 씁니다.',
          'Walks는 3인칭 단수 동사 꼴이라 주어가 될 수 없습니다.',
          '',
        ],
        explain: '주어 자리에서 "걷는 것"은 동명사 **Walking**입니다. 동명사 주어는 단수로 보아 is를 씁니다. "매일 걷는 것은 건강에 좋습니다."',
      },
      {
        id: 'p9', level: 2, type: 'order', concept: 3,
        q: '우리말에 맞게 배열하세요.\n\n저는 계좌를 만들려고 은행에 갔습니다.',
        choices: ['I', 'went', 'to the bank', 'to open', 'an account'],
        answer: [0, 1, 2, 3, 4],
        hint: '"은행에 갔다"를 먼저 쓰고, 목적(~하려고)을 뒤에 붙입니다.',
        explain: '**I went to the bank to open an account.** 앞의 to는 장소(은행으로), 뒤의 to open은 목적(만들려고)입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 2,
        q: '**바른** 문장을 고르세요.',
        choices: ['I hope that feel better soon.', 'I know that is she busy.', 'I believe that he are honest.', 'I hope that you feel better soon.'],
        answer: 3,
        why: [
          'that 뒤에 주어가 빠졌습니다. that 뒤에는 주어 + 동사가 있는 문장이 옵니다.',
          'that 뒤는 의문문 순서가 아니라 주어 + 동사 순서입니다: that she is busy',
          '주어 he에 맞는 be동사는 is입니다: that he is honest',
          '',
        ],
        explain: 'that 뒤에는 **주어 + 동사**가 있는 온전한 문장이 옵니다: I hope that you feel better soon. "빨리 낫기를 바랍니다."',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 1,
        q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n학생이었을 때 저는 대구에 살았습니다.\n→ ___ I was a student, I lived in Daegu.',
        answer: ['When'],
        wrong: [
          { a: 'If', why: 'if — "만약 ~하면"이라는 조건입니다. 학생이었던 것은 지난 사실이고, 우리말은 "~였을 때"입니다.' },
          { a: 'Because', why: 'because — 이유입니다. 우리말 "학생이었을 때"는 때를 나타냅니다.' },
          { a: 'So', why: 'so — 결과를 이끄는 말이라 문장 맨 앞의 이 자리에 쓰지 않습니다. 때는 when으로 나타냅니다.' },
        ],
        explain: '때를 나타내는 **When**을 씁니다. When 부분이 문장 앞에 와서 쉼표로 나누었습니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 4,
        q: '두 빈칸에 들어갈 말을 차례대로 바르게 짝지은 것을 고르세요.\n\nI want ___ a new hobby. I really enjoy ___ new things.',
        choices: ['finding — to learn', 'to find — to learn', 'to find — learning', 'finding — learning'],
        answer: 2,
        why: [
          '거꾸로 썼습니다. want 뒤에는 to부정사, enjoy 뒤에는 -ing를 씁니다.',
          'enjoy 뒤에는 to부정사가 아니라 -ing를 씁니다.',
          '',
          'want 뒤에는 -ing가 아니라 to부정사를 씁니다.',
        ],
        explain: 'want + to부정사(to find), enjoy + -ing(learning): **I want to find a new hobby. I really enjoy learning new things.**',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '**옳지 않은** 문장을 고르세요.',
        choices: ['I decided to take a cooking class.', 'She finished to write the report.', 'Would you mind closing the door?', 'We hope to see you again.'],
        answer: 1,
        why: [
          'decide 뒤에 to부정사를 바르게 썼습니다.',
          '',
          'mind 뒤에 -ing를 바르게 썼습니다.',
          'hope 뒤에 to부정사를 바르게 썼습니다.',
        ],
        explain: 'finish는 뒤에 -ing만 오는 동사입니다. **She finished writing the report.** 로 고칩니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'text', concept: 3,
        q: '두 문장을 to부정사로 이어 한 문장으로 만들었습니다. 빈칸에 알맞은 말을 쓰세요.\n\nI saved money. I wanted to buy a car.\n→ I saved money ___ a car.',
        answer: ['to buy', 'in order to buy'],
        hint: '"차를 사기 위해" 돈을 모았습니다.',
        wrong: [
          { a: 'buy', why: '한 문장에 동사 saved가 이미 있습니다. 목적은 to + 동사원형으로 붙입니다.' },
          { a: 'buying', why: '"~하기 위해"라는 목적은 -ing가 아니라 to부정사로 나타냅니다.' },
          { a: 'for buy', why: 'for 뒤에 동사원형을 쓰지 않습니다. 목적은 to buy로 나타냅니다.' },
        ],
        explain: '목적(~하기 위해)은 to부정사: **I saved money to buy a car.** "차를 사려고 돈을 모았습니다." (in order to buy라고 하면 목적이 더 분명해집니다.)',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 1,
        q: '두 빈칸에 들어갈 말을 차례대로 바르게 짝지은 것을 고르세요.\n\nI ___ you if I ___ any news.',
        choices: ['tell — will hear', 'will tell — hear', 'will tell — will hear', 'told — will hear'],
        answer: 1,
        hint: 'if가 이끄는 부분과 나머지 부분을 나누어 보세요.',
        why: [
          '거꾸로 썼습니다. 앞으로 알려 줄 것이므로 앞은 will tell, if 뒤는 현재형 hear입니다.',
          '',
          'if 뒤에서는 앞으로의 일도 현재형으로 씁니다. will hear가 아니라 hear입니다.',
          '알려 주는 것은 앞으로의 일이라 told(과거)가 아니고, if 뒤는 현재형 hear입니다.',
        ],
        explain: '앞으로 할 일(알려 줄게요)은 **will tell**, if가 이끄는 조건 부분은 앞으로의 일이라도 현재형 **hear**: I will tell you if I hear any news. "소식을 들으면 알려 드릴게요."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 0,
        q: '다음 글을 읽고, 내용과 **맞지 않는** 것을 고르세요.\n\nMinsu works at a bank. He wanted to change his daily life, so he started running last year. At first, running was hard because he was not fit. But now he enjoys running every morning. He thinks that running makes him happy. If the weather is bad, he runs at the gym.',
        choices: ['민수는 은행에서 일한다.', '처음에는 체력이 좋지 않아 달리기가 힘들었다.', '민수는 날씨가 나쁘면 달리기를 쉰다.', '민수는 달리기가 자신을 행복하게 한다고 생각한다.'],
        answer: 2,
        why: [
          'Minsu works at a bank — 은행에서 일한다고 했습니다.',
          'running was hard because he was not fit — 체력이 좋지 않아서(because) 힘들었다고 했습니다.',
          '',
          'He thinks that running makes him happy — 달리기가 자신을 행복하게 한다고 생각한다고 했습니다.',
        ],
        explain: 'If the weather is bad, he runs at the gym. — 날씨가 나쁘면 쉬는 것이 아니라 **체육관에서 달립니다.** 글에 나온 so, because, but, that, if와 enjoy running을 다시 살펴보세요.',
      },
      {
        id: 'a5', level: 3, type: 'order', concept: 1,
        q: '우리말에 맞게 배열하세요.\n\n비가 많이 와서 우리는 집에 있었습니다.',
        choices: ['Because', 'it rained a lot,', 'we', 'stayed', 'at home'],
        answer: [0, 1, 2, 3, 4],
        hint: '대문자와 쉼표를 단서로 삼으세요. 이유 부분이 문장 앞에 옵니다.',
        explain: '**Because it rained a lot, we stayed at home.** because 부분이 문장 앞에 와서 쉼표로 나눕니다. We stayed at home because it rained a lot. 으로 써도 같은 뜻입니다.',
      },
    ],

    deeper: [
      {
        title: '쉼표와 문장 조각 — 글로 쓸 때 주의할 점',
        body: '말할 때는 Because I was tired. 처럼 because 부분만 말해도 대화가 통합니다.\n\n- A: Why did you leave early? B: **Because I was tired.**\n\n그러나 글에서는 because 부분만으로는 온전한 문장이 되지 않습니다. 이것을 **문장 조각**이라고 합니다. 글에서는 앞이나 뒤에 중심 문장을 붙입니다.\n\n- Because I was tired. (✗ 글에서) → **I left early** because I was tired. (○)\n\n또 문장 두 개를 쉼표만으로 붙이지 않습니다. 사이에 and, but, so 같은 연결어를 넣거나 마침표로 나눕니다.\n\n- It was late, I went home. (✗) → It was late, **so** I went home. (○)',
      },
      {
        title: '한 걸음 더 — 뜻이 달라지는 to와 -ing',
        body: '몇몇 동사는 뒤에 to부정사와 -ing가 모두 오지만 뜻이 달라집니다.\n\n| 꼴 | 뜻 | 예 |\n|---|---|---|\n| stop -ing | ~하던 것을 멈추다 | He **stopped smoking**. (담배를 끊었다) |\n| stop to ~ | ~하려고 멈추다 | He **stopped to smoke**. (담배를 피우려고 멈췄다) |\n| remember -ing | (과거에) ~한 것을 기억하다 | I **remember meeting** her. (그녀를 만난 것을 기억한다) |\n| remember to ~ | (앞으로) ~할 것을 기억하다 | **Remember to call** me. (잊지 말고 전화해) |\n\n여기서도 to는 "앞으로 할 일", -ing는 "이미 한 일·하던 일"이라는 느낌이 살아 있습니다. 이 단원에서 익힌 기초가 이런 표현을 이해하는 바탕이 됩니다.',
      },
    ],

    faq: [
      {
        q: 'because랑 so는 어떻게 달라요?',
        a: '방향이 반대입니다. because 뒤에는 **이유**가, so 뒤에는 **결과**가 옵니다.\n\n- I stayed home **because** I was sick. (아파서 — because 뒤가 이유)\n- I was sick, **so** I stayed home. (그래서 집에 있었다 — so 뒤가 결과)\n\n한 문장에 because와 so를 함께 쓰지 않습니다. Because I was sick, so I stayed home. (✗)',
      },
      {
        q: 'I think that에서 that은 꼭 써야 해요?',
        a: '아닙니다. think, know, hope 같은 동사 뒤의 that은 흔히 생략합니다. 말할 때는 I think it\'s a good idea. 처럼 that 없이 더 많이 씁니다. 격식 있는 글이나 문장이 길어 뜻이 헷갈릴 때는 that을 써 주면 읽기 쉽습니다.',
      },
      {
        q: 'to부정사랑 동명사는 언제 뭘 써요?',
        a: '앞에 오는 동사가 정합니다. want, need, hope, plan, decide 뒤에는 to부정사, enjoy, finish, mind, keep, give up, avoid 뒤에는 동명사(-ing)를 씁니다. like, love, start, begin은 둘 다 됩니다.\n\n"~하기 위해"라는 목적은 늘 to부정사이고, 문장의 주어 자리에는 보통 동명사(Walking is fun.)를 씁니다.',
      },
    ],

    mistakes: [
      'because와 so를 한 문장에 함께 쓰는 실수 — Because it was cold, so I stayed home. (✗) → Because it was cold, I stayed home. / It was cold, so I stayed home. (○)',
      'if·when 뒤에 will을 쓰는 실수 — If it will rain tomorrow, … (✗) → If it rains tomorrow, … (○)',
      '동사에 맞지 않는 꼴을 쓰는 실수 — I enjoy to cook. / I want going. (✗) → I enjoy cooking. / I want to go. (○)',
    ],

    gens: [
      {
        id: 'and-but-or-so',
        level: 1,
        title: 'and, but, or, so 고르기',
        make: function (R) {
          var it = R.pick(CJ);
          var opts = ['and', 'but', 'or', 'so'];
          return {
            type: 'choice', concept: 0,
            q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n→ ' + it[1],
            choices: opts,
            answer: opts.indexOf(it[2]),
            hint: '두 내용이 덧붙임·반대·선택·결과 가운데 어느 관계인지 보세요.',
            why: opts.map(function (o) { return o === it[2] ? '' : CJ_WHY[o] + ' 이 문장의 두 내용은 그런 관계가 아닙니다.'; }),
            explain: CJ_WHY[it[2]] + '\n\n바른 문장: ' + it[1].replace('___', it[2]),
          };
        },
      },
      {
        id: 'because-when-if',
        level: 2,
        title: 'because, when, if 고르기',
        make: function (R) {
          var it = R.pick(BW);
          var opts = ['because', 'when', 'if'];
          return {
            type: 'choice', concept: 1,
            q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n→ ' + it[1],
            choices: opts,
            answer: opts.indexOf(it[2]),
            hint: '빈칸 뒤의 내용이 이유인지, 때인지, 조건인지 보세요.',
            why: opts.map(function (o) {
              if (o === it[2]) return '';
              if (o === 'when' && it[2] === 'if') return 'when — 앞으로 꼭 일어날 일의 "때"에 씁니다. 우리말 "만약·혹시 ~하면"은 일어날지 모르는 조건이라 if를 씁니다.';
              return BW_WHY[o] + ' 빈칸 뒤의 내용은 그런 뜻이 아닙니다.';
            }),
            explain: BW_WHY[it[2]] + '\n\n바른 문장: ' + it[1].replace('___', it[2]),
          };
        },
      },
      {
        id: 'to-or-ing',
        level: 2,
        title: 'to부정사와 동명사 고르기',
        make: function (R) {
          var it = R.pick(TG);
          var toForm = 'to ' + it[1];
          var ans = it[2] === 'to' ? toForm : it[3];
          var rule = it[2] === 'to'
            ? it[4] + ' — 뒤에 to부정사(to + 동사원형)가 오는 동사입니다.'
            : it[4] + ' — 뒤에 동명사(-ing)가 오는 동사입니다.';
          var wrong = [{ a: it[1], why: '한 문장에 앞의 동사가 이미 있어 동사원형을 바로 붙이지 않습니다. ' + rule }];
          if (it[2] === 'to') wrong.push({ a: it[3], why: it[4] + ' — 뒤에 -ing가 아니라 to부정사가 옵니다.' });
          else wrong.push({ a: toForm, why: it[4] + ' — 뒤에 to부정사가 아니라 -ing가 옵니다.' });
          return {
            type: 'short', check: 'text', concept: it[2] === 'to' ? 3 : 4,
            q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰세요.\n\n' + it[0],
            answer: [ans],
            hint: '빈칸 앞의 동사가 to부정사와 -ing 가운데 무엇을 좋아하는지 떠올려 보세요.',
            wrong: wrong,
            explain: rule + '\n\n바른 문장: ' + it[0].replace(/___ \([a-z]+\)/, ans) + '\n(' + it[5] + ')',
          };
        },
      },
    ],

    vocab: [
      { w: 'decide', m: '결정하다, ~하기로 하다', ex: 'We decided to eat out tonight.', exm: '우리는 오늘 밤 외식하기로 했습니다.' },
      { w: 'enjoy', m: '즐기다', ex: 'My parents enjoy hiking on weekends.', exm: '부모님은 주말에 등산을 즐기십니다.' },
      { w: 'mind', m: '꺼리다, 싫어하다', ex: 'Do you mind sitting by the door?', exm: '문 옆에 앉으셔도 괜찮으세요?' },
      { w: 'avoid', m: '피하다', ex: 'I try to avoid eating too much salt.', exm: '저는 소금을 너무 많이 먹지 않으려고 합니다.' },
      { w: 'practice', m: '연습하다', ex: 'She practices playing the piano every evening.', exm: '그녀는 매일 저녁 피아노 연습을 합니다.' },
      { w: 'plan', m: '계획하다', ex: 'We plan to visit Gangneung in May.', exm: '우리는 5월에 강릉에 갈 계획입니다.' },
      { w: 'hope', m: '바라다', ex: 'I hope that you have a great weekend.', exm: '즐거운 주말 보내시기를 바랍니다.' },
      { w: 'because', m: '~ 때문에, ~해서', ex: 'I took the subway because the roads were busy.', exm: '길이 막혀서 지하철을 탔습니다.' },
      { w: 'traffic', m: '교통(량)', ex: 'The traffic is heavy in the morning.', exm: '아침에는 차가 많이 막힙니다.' },
      { w: 'account', m: '계좌', ex: 'I opened a bank account to save money.', exm: '저축하려고 은행 계좌를 만들었습니다.' },
      { w: 'hobby', m: '취미', ex: 'Drawing is my new hobby.', exm: '그림 그리기는 제 새 취미입니다.' },
      { w: 'health', m: '건강', ex: 'Walking every day is good for your health.', exm: '매일 걷는 것은 건강에 좋습니다.' },
      { w: 'improve', m: '나아지게 하다, 늘리다', ex: 'I read English news to improve my reading.', exm: '저는 읽기 실력을 늘리려고 영어 뉴스를 읽습니다.' },
    ],
  });
})();
