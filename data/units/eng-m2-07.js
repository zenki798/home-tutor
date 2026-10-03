/* 중2 영어 · 조건과 결과 말하기 (if·so ~ that) */
Tutor.registerUnit({
  id: 'eng-m2-07',
  course: 'eng-m2',
  title: '조건과 결과 말하기 (if·so ~ that)',
  summary: '조건의 if, 결과의 so ~ that, 양보의 although를 익혀 조건과 결과를 논리적으로 말해요.',
  goals: [
    '조건의 if 문장에서 if절에 현재시제를 써서 앞으로의 일을 말할 수 있어요.',
    '명령문, and ~ / 명령문, or ~의 뜻을 구별하고 if 문장으로 바꿀 수 있어요.',
    'so + 형용사/부사 + that ~으로 원인과 결과를 한 문장에 담을 수 있어요.',
    'although/though로 기대와 반대되는 내용을 잇고, 원인과 결과를 설명하는 글을 요약할 수 있어요.',
  ],
  standards: ['[9영02-05]', '[9영01-04]', '[9영02-07]'],

  concepts: [
    {
      title: '조건의 if와 if절의 현재시제',
      body: '**if**는 "만약 ~하면"이라는 **조건**을 나타내는 접속사예요. 조건을 말하는 부분을 **if절(조건절)**, 그 조건이 이루어졌을 때의 결과를 말하는 부분을 **주절**이라고 해요.\n\n- **If it rains** tomorrow, we **will stay** home. (내일 비가 오면 우리는 집에 있을 거예요.)\n- **If you hurry**, you **will catch** the bus. (서두르면 너는 버스를 탈 수 있을 거야.)\n\n내일의 일인데도 if절에는 will rain이 아니라 **rains(현재시제)**를 써요. if절은 "그렇다고 치면"이라는 조건만 세우고, 앞으로 일어날 결과는 주절의 **will**이 나타내기 때문이에요.\n\n주어가 3인칭 단수(he, she, it, Minsu …)이면 현재시제 동사에 -s/-es를 붙이는 것도 잊지 마세요: If **she calls** me, I will tell her.\n\n> 💡 if절이 앞에 오면 if절 끝에 쉼표(,)를 찍고, 뒤에 오면 쉼표 없이 써요. We will stay home **if it rains** tomorrow.\n\n> ⚠️ If it **will rain** tomorrow(✗) → If it **rains** tomorrow(○)',
      easy: 'if 문장은 "약속 카드" 두 칸이라고 생각해 보세요.\n\n- 왼쪽 칸(조건): **숙제를 다 하면** — If you finish your homework\n- 오른쪽 칸(결과): **게임을 할 거야** — you will play games\n\n미래 표시(will)는 오른쪽 결과 칸에만 한 번 붙여요. 왼쪽 조건 칸은 지금 이야기하듯 현재형(finish)으로 써요. 두 칸 모두에 will을 붙이면 미래 표시가 두 번 겹치는 셈이에요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nIf it [[빈칸]] tomorrow, we will stay home.',
        choices: ['rains', 'will rain', 'rained'],
        answer: 0,
        why: ['', '조건을 나타내는 if절에는 앞으로의 일이라도 will을 쓰지 않고 현재시제를 써요.', 'rained는 과거형이에요. 내일의 조건이므로 현재시제 rains를 써요.'],
        explain: '조건의 if절에는 미래의 일이라도 **현재시제**를 써요. 주어 it이 3인칭 단수이므로 **rains**예요. 미래(will)는 주절 we will stay home에만 써요.',
      },
    },
    {
      title: '명령문, and ~ / 명령문, or ~',
      body: '명령문 뒤에 **and**나 **or**를 이으면 조건과 결과를 짧게 말할 수 있어요.\n\n| 꼴 | 뜻 | 예 |\n|---|---|---|\n| 명령문, **and** ~ | ~해라, **그러면** …할 것이다 | Study hard, **and** you will pass the test. |\n| 명령문, **or** ~ | ~해라, **그렇지 않으면** …할 것이다 | Hurry up, **or** you will miss the bus. |\n\nif 문장으로 바꾸면 차이가 잘 보여요.\n\n- Study hard, and you will pass the test. = **If you study** hard, you will pass the test.\n- Hurry up, or you will miss the bus. = **If you don\'t hurry** up, you will miss the bus.\n\nand는 명령을 **따랐을 때**의 결과를, or는 명령을 **따르지 않았을 때**의 결과를 이어요. 그래서 or를 if로 바꿀 때는 **don\'t**가 들어가요.\n\n> 💡 뒤의 결과가 좋은 일이면 대개 and, 피하고 싶은 일이면 대개 or예요.',
      easy: '엄마가 하시는 말을 떠올려 보세요.\n\n- "일찍 자라, **그러면** 내일 개운할 거야." → 시키는 대로 하면 생기는 일 → **and**\n- "일찍 자라, **안 그러면** 내일 피곤할 거야." → 시키는 대로 안 하면 생기는 일 → **or**\n\n"그러면"은 and, "안 그러면"은 or라고 짝지어 기억하면 쉬워요.',
      check: {
        type: 'ox',
        q: 'Wear a coat, or you will catch a cold.는 "코트를 입어라, 그러면 감기에 걸릴 것이다."라는 뜻이에요.',
        answer: false,
        explain: '명령문, or ~는 "~해라, **그렇지 않으면** …할 것이다"예요. 바른 뜻은 "코트를 입어라, 그렇지 않으면 감기에 걸릴 것이다."이고, If you don\'t wear a coat, you will catch a cold.와 같아요.',
      },
    },
    {
      title: 'so + 형용사/부사 + that ~ (너무 ~해서 …하다)',
      body: '**so + 형용사/부사 + that + 주어 + 동사**는 "너무(매우) ~해서 …하다"라는 뜻이에요. so 뒤에는 **정도(원인)**, that 뒤에는 그 때문에 생긴 **결과**가 와요.\n\n- The box was **so heavy that** I couldn\'t lift it. (상자가 너무 무거워서 나는 그것을 들 수 없었어요.) — 형용사 heavy\n- He ran **so fast that** he won the race. (그는 아주 빨리 달려서 경주에서 이겼어요.) — 부사 fast\n\n같은 내용을 두 문장으로 쓰면 이렇게 돼요: The box was very heavy. **So** I couldn\'t lift it.\n\nthat 뒤에는 주어와 동사가 다 있는 문장이 와요. 앞 문장이 과거이면 that 뒤의 동사도 보통 과거(couldn\'t, won)로 맞춰요.\n\n> ⚠️ that과 짝이 되는 말은 so예요. The box was **very** heavy that ~(✗) → **so** heavy that ~(○)',
      easy: 'so ~ that 문장은 "원인 → 결과" 화살표예요.\n\n- 원인(얼마나?): 상자가 **너무 무거웠다** → so heavy\n- 결과(그래서?): **들 수 없었다** → that I couldn\'t lift it\n\nso는 "얼마나 그랬는지"를 크게 키우는 확대경이고, that은 "그래서 이렇게 됐어"라고 결과를 꺼내는 문이라고 생각해 보세요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe soup was [[빈칸]] hot that I couldn\'t eat it.',
        choices: ['so', 'very', 'much'],
        answer: 0,
        why: ['', 'very도 "매우"라는 뜻이지만 that과 짝을 이루지 않아요. "너무 ~해서 …하다"는 so ~ that이에요.', 'much는 형용사 hot을 그대로 꾸미지 못하고, that과 짝을 이루지도 않아요.'],
        explain: '"너무 ~해서 …하다"는 **so** + 형용사 + that ~이에요. "수프가 너무 뜨거워서 나는 그것을 먹을 수 없었어요."',
      },
    },
    {
      title: '양보의 although/though (~이지만)',
      body: '**although**와 **though**는 "~이지만, ~인데도"라는 뜻의 접속사예요. 앞의 내용으로 보아 기대되는 것과 **반대되는 결과**가 뒤에 올 때 써요. 이런 관계를 **양보**라고 해요.\n\n- **Although** it was raining, we played soccer. (비가 오고 있었지만 우리는 축구를 했어요.)\n- **Though** she was tired, she finished her homework. (그녀는 피곤했지만 숙제를 끝냈어요.)\n\nalthough와 though는 뜻이 같아요(though가 조금 더 말할 때 많이 쓰여요). 둘 다 뒤에 **주어 + 동사**가 와요.\n\nbecause(~ 때문에)와 비교해 보세요.\n\n| 문장 | 관계 |\n|---|---|\n| **Because** it was raining, we stayed home. | 원인 → 자연스러운 결과 |\n| **Although** it was raining, we went out. | 기대와 반대되는 결과 |\n\n> ⚠️ although와 but을 한 문장에 함께 쓰지 않아요. Although it was cold, **but** we swam.(✗) → Although it was cold, we swam.(○) 또는 It was cold, but we swam.(○)',
      easy: '"비가 왔다" 다음에 오는 말을 떠올려 보세요. 보통은 "그래서 집에 있었다"가 나오지요. 그런데 "그래도 밖에서 놀았다"가 나오면 깜짝 놀랄 일이에요.\n\n- 예상대로 이어질 때: because(~ 때문에)\n- 예상을 뒤집을 때: although(~이지만)\n\nalthough는 "예상 뒤집기" 신호라고 기억하세요.',
      check: {
        type: 'choice',
        q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n그는 아팠지만 학교에 갔어요.\n[[빈칸]] he was sick, he went to school.',
        choices: ['Although', 'Because', 'If'],
        answer: 0,
        why: ['', 'Because는 "~ 때문에"예요. 아픈데도 학교에 간 것은 예상과 반대되는 일이에요.', 'If는 "만약 ~하면"이라는 조건이에요. 우리말은 "~이지만"이에요.'],
        explain: '"~이지만"은 **Although**(또는 Though)예요. 아프면 보통 학교에 가지 않을 텐데, 그 예상과 반대로 학교에 갔어요.',
      },
    },
    {
      title: '원인과 결과를 설명하는 글 읽고 요약하기',
      body: '원인과 결과를 설명하는 글은 "무엇 때문에(원인) → 어떻게 되었나(결과)"로 짜여 있어요. 글을 읽을 때 아래 **신호어**에 표시하면 흐름이 잘 보여요.\n\n| 신호어 | 뜻 |\n|---|---|\n| because, because of | ~ 때문에 (뒤에 원인) |\n| so, so ~ that | 그래서, 너무 ~해서 (뒤에 결과) |\n| as a result | 그 결과 (뒤에 결과) |\n| if ~ | ~하면 (조건과 결과) |\n\n**요약하는 순서**\n1. 글에서 원인과 결과를 하나씩 찾아요.\n2. 자세한 예(시각, 숫자, 이름)는 빼요.\n3. "Because 원인, 결과." 또는 "원인, so 결과." 한 문장으로 묶어요.\n\n예: It snowed a lot. The roads were so slippery that the buses were late. → 요약: **Because it snowed a lot, the buses were late.**\n\n> ⚠️ 요약할 때 원인과 결과를 거꾸로 쓰지 않도록 주의해요. "버스가 늦어서 눈이 왔다"가 되면 안 돼요.',
      easy: '도미노를 떠올려 보세요. 첫째 도미노(원인)가 넘어지면 다음 도미노(결과)가 넘어져요.\n\n글을 읽을 때 "왜?"에 답하는 문장에 ①, "그래서 어떻게 됐어?"에 답하는 문장에 ②를 붙여 보세요. 요약은 ①과 ②를 because나 so로 이어 한 문장으로 만드는 거예요.',
      check: {
        type: 'choice',
        q: '글을 읽고, 버스가 늦은 **원인**으로 알맞은 것을 고르세요.\n\nIt snowed a lot last night. The roads were so slippery that the buses were late. Many students were late for school.',
        choices: ['길이 미끄러웠다.', '많은 학생이 지각했다.', '학생들이 늦잠을 잤다.'],
        answer: 0,
        why: ['', '학생들의 지각은 버스가 늦어서 생긴 결과예요. 원인이 아니에요.', '글에 늦잠 이야기는 없어요. 글에 있는 내용에서 찾아요.'],
        explain: 'The roads were **so slippery that** the buses were late. — so ~ that 앞이 원인(길이 너무 미끄러웠다), 뒤가 결과(버스가 늦었다)예요. 길이 미끄러운 것은 눈이 많이 와서였어요.\n\n(어젯밤 눈이 많이 왔어요. 길이 너무 미끄러워서 버스가 늦었어요. 많은 학생이 학교에 늦었어요.)',
      },
    },
  ],

  examples: [
    {
      q: '두 문장을 so ~ that을 써서 한 문장으로 바꾸세요.\n\nThe movie was very funny. We laughed a lot.',
      steps: [
        '원인(얼마나?)과 결과(그래서?)를 나눠요: 원인 = 영화가 매우 재미있었다, 결과 = 우리는 많이 웃었다.',
        '원인 문장의 very를 so로 바꿔요: The movie was so funny',
        'that 뒤에 결과 문장을 그대로 붙여요: that we laughed a lot.',
      ],
      answer: 'The movie was **so funny that** we laughed a lot. (영화가 너무 재미있어서 우리는 많이 웃었어요.)',
    },
    {
      q: '같은 뜻이 되도록 if 문장으로 바꾸세요.\n\nLeave now, or you will be late.',
      steps: [
        '명령문, or ~는 "~해라, 그렇지 않으면 …할 것이다"예요.',
        '"그렇지 않으면" = "지금 떠나지 않으면"이므로 if절은 If you don\'t leave now가 돼요.',
        'if절은 현재시제 그대로, 결과는 will을 그대로 써요.',
      ],
      answer: '**If you don\'t leave** now, you will be late. (지금 떠나지 않으면 너는 늦을 거야.)',
    },
  ],

  terms: [
    { term: '조건절(if절)', def: '"만약 ~하면"이라는 조건을 나타내는 부분이에요. 앞으로의 일이라도 현재시제를 써요. 예: If it rains tomorrow, …' },
    { term: '주절', def: '조건절이나 although절 같은 부분 없이도 홀로 설 수 있는 중심 문장이에요. If it rains, **we will stay home.**에서 굵은 부분이에요.' },
    { term: '명령문', def: '주어(you) 없이 동사원형으로 시작해서 "~해라"를 나타내는 문장이에요. 예: Hurry up. / Study hard.' },
    { term: 'so ~ that', def: '"너무(매우) ~해서 …하다"를 나타내는 구문이에요. so 뒤에 형용사나 부사, that 뒤에 결과 문장이 와요. 예: It was so cold that we stayed home.' },
    { term: '양보', def: '앞의 내용과 반대되는 일이 뒤에 오는 관계예요. "~이지만, ~인데도"로, although와 though로 나타내요.' },
    { term: '원인과 결과', def: '어떤 일이 일어난 까닭이 원인(cause), 그 때문에 생긴 일이 결과(result)예요. because, so, as a result 같은 신호어가 둘을 이어 줘요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nIf you [[빈칸]] this button, the door will open.',
      choices: ['press', 'will press', 'pressed', 'to press'],
      answer: 0,
      why: ['', '조건의 if절에는 앞으로의 일이라도 will을 쓰지 않아요. 현재시제를 써요.', 'pressed는 과거형이에요. 앞으로의 조건이라도 if절에는 현재시제를 써요.', 'if절에는 주어 뒤에 동사가 와야 해요. to부정사는 동사 자리에 쓸 수 없어요.'],
      explain: '조건의 if절에는 현재시제를 써요. 주어가 you이므로 **press**예요. "이 버튼을 누르면 문이 열릴 거예요."',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '괄호 안의 낱말을 알맞은 꼴로 바꾸어 빈칸에 쓰세요.\n\nIf Minsu [[빈칸]] to the party, we will be happy. (come)',
      answer: ['comes'],
      wrong: [
        { a: 'will come', why: '조건의 if절에는 앞으로의 일이라도 will을 쓰지 않아요. 현재시제를 써요.' },
        { a: 'come', why: '주어 Minsu는 3인칭 단수예요. 현재시제 동사에 -s를 붙여요.' },
        { a: 'came', why: 'came은 과거형이에요. 앞으로의 조건이라도 if절에는 현재시제를 써요.' },
      ],
      explain: 'if절에는 현재시제를 쓰고, 주어 Minsu가 3인칭 단수이므로 **comes**예요. "민수가 파티에 오면 우리는 기쁠 거예요."',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n서둘러라, 그렇지 않으면 버스를 놓칠 거야.\nHurry up, [[빈칸]] you will miss the bus.',
      choices: ['or', 'and', 'but', 'so'],
      answer: 0,
      why: ['', 'and는 "그러면"이에요. 버스를 놓치는 것은 서두르지 않았을 때의 결과이므로 or를 써요.', 'but은 "하지만"이에요. 명령문 뒤에 결과를 이을 때는 and나 or를 써요.', 'so는 "그래서"예요. 명령문 뒤에 결과를 이을 때는 and나 or를 써요.'],
      explain: '"~해라, 그렇지 않으면 …할 것이다"는 명령문, **or** ~예요. = If you don\'t hurry up, you will miss the bus.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'Practice every day, and you will get better.는 "매일 연습해라, 그러면 더 잘하게 될 것이다."라는 뜻이에요.',
      answer: true,
      explain: '명령문, **and** ~는 "~해라, 그러면 …할 것이다"예요. = If you practice every day, you will get better.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nThe bag was so heavy [[빈칸]] I couldn\'t carry it.',
      choices: ['that', 'what', 'if', 'but'],
      answer: 0,
      why: ['', 'what은 so와 짝을 이루지 않아요. "너무 ~해서 …하다"는 so ~ that이에요.', 'if는 "만약 ~하면"이에요. 가방이 무거워서 생긴 결과를 이어야 해요.', 'but은 "하지만"이에요. 무거워서 들 수 없었다는 것은 반대가 아니라 결과예요.'],
      explain: 'so + 형용사(heavy) 뒤에 **that** + 결과 문장이 와요. "가방이 너무 무거워서 나는 그것을 들 수 없었어요."',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 2,
      q: '우리말에 맞게 빈칸에 알맞은 한 낱말을 쓰세요.\n\n그는 아주 빨리 달려서 아무도 그를 따라잡을 수 없었어요.\nHe ran [[빈칸]] fast that nobody could catch him.',
      answer: ['so'],
      wrong: [
        { a: 'very', why: 'very는 that과 짝을 이루지 않아요. "아주 ~해서 …하다"는 so ~ that이에요.' },
        { a: 'too', why: 'that과 짝을 이루어 결과를 이끄는 말은 so예요.' },
      ],
      explain: 'so + 부사(fast) + that ~ 구문이에요. 빈칸에는 **so**가 들어가요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n비가 오고 있었지만 우리는 밖에서 놀았어요.\n[[빈칸]] it was raining, we played outside.',
      choices: ['Although', 'Because', 'If', 'So'],
      answer: 0,
      why: ['', 'Because는 "~ 때문에"예요. 비가 오는데 밖에서 논 것은 예상과 반대되는 일이에요.', 'If는 "만약 ~하면"이라는 조건이에요. 우리말은 "~이지만"이에요.', 'So는 "그래서"라는 뜻으로 결과 앞에 와요. 문장 맨 앞에서 "~이지만"을 나타내지 못해요.'],
      explain: '"~이지만"은 **Although**(또는 Though)예요. 비가 오면 보통 집 안에 있을 텐데, 예상과 반대로 밖에서 놀았어요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 2,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n너무 추워서 우리는 집에 머물렀어요.',
      choices: ['It was', 'so cold', 'that', 'we stayed', 'at home.'],
      answer: [0, 1, 2, 3, 4],
      hint: '"얼마나 추웠나"를 먼저 쓰고, that 뒤에 결과를 써요.',
      explain: 'It was + **so cold**(원인: 너무 추웠다) + **that** + we stayed at home(결과). "너무 추워서 우리는 집에 머물렀어요."',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      q: '다음 문장과 뜻이 같은 것을 고르세요.\n\nTurn off the light, or you will waste energy.',
      choices: [
        "If you don't turn off the light, you will waste energy.",
        'If you turn off the light, you will waste energy.',
        'Although you turn off the light, you will waste energy.',
        'Turn off the light, and you will waste energy.',
      ],
      answer: 0,
      why: [
        '',
        'or는 "그렇지 않으면"이에요. 불을 끄면 에너지를 낭비한다는 뜻이 되어 반대예요.',
        'although는 "~이지만"이에요. or ~는 조건(~하지 않으면)으로 바꿔야 해요.',
        'and는 "그러면"이에요. 불을 끄면 에너지를 낭비한다는 이상한 뜻이 돼요.',
      ],
      hint: 'or는 "그렇지 않으면", 곧 "~하지 않으면"이에요.',
      explain: '명령문, or ~ = If you **don\'t** ~, …예요. "불을 꺼라, 그렇지 않으면 에너지를 낭비할 거야." = "불을 끄지 않으면 에너지를 낭비할 거야."',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 0,
      q: '대화의 빈칸에 알맞은 be동사 한 낱말을 쓰세요.\n\nA: What will you do tomorrow?\nB: If it [[빈칸]] sunny, I will go hiking with my dad.',
      answer: ['is'],
      wrong: [
        { a: 'will be', why: '조건의 if절에는 앞으로의 일이라도 will을 쓰지 않아요. 현재시제 is를 써요.' },
        { a: 'was', why: 'was는 과거형이에요. 내일의 조건이라도 if절에는 현재시제를 써요.' },
        { a: 'be', why: '주어 it 뒤에는 be가 아니라 현재형 is를 써요.' },
      ],
      hint: 'if절의 시제를 떠올려 보세요. 주어는 it이에요.',
      explain: '내일의 일이지만 조건의 if절이므로 현재시제를 써요. 주어 it에 맞는 be동사 현재형은 **is**예요. "날씨가 맑으면 아빠와 하이킹을 갈 거예요."',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '글을 읽고, 학교가 깨끗해진 **원인**으로 알맞은 것을 고르세요.\n\nThis year, our school started "No Plastic Day." Every Friday, students bring their own cups and lunch boxes. Because of this, the trash cans are not full on Fridays anymore. As a result, the school is cleaner, and everyone is happy about it.',
      choices: [
        'Students bring their own cups and lunch boxes.',
        'The school bought new trash cans.',
        'Students do not eat lunch on Fridays.',
        'Teachers clean the school every Friday.',
      ],
      answer: 0,
      why: [
        '',
        '새 쓰레기통을 샀다는 내용은 글에 없어요.',
        '학생들은 점심을 먹어요. 자기 도시락통을 가져온다고 했어요.',
        '선생님이 청소한다는 내용은 글에 없어요.',
      ],
      hint: 'Because of this의 this가 가리키는 문장을 찾아보세요.',
      explain: 'Because of **this**(원인) → 쓰레기통이 가득 차지 않아요 → **As a result** 학교가 더 깨끗해졌어요. this는 바로 앞 문장 "학생들이 자기 컵과 도시락통을 가져온다"를 가리켜요.\n\n(올해 우리 학교는 "플라스틱 없는 날"을 시작했어요. 금요일마다 학생들은 자기 컵과 도시락통을 가져와요. 이 때문에 금요일에는 쓰레기통이 더 이상 가득 차지 않아요. 그 결과 학교가 더 깨끗해졌고, 모두가 그것을 기뻐해요.)',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 3,
      q: '두 문장을 한 문장으로 바르게 이은 것을 고르세요.\n\nI was very tired. I finished my homework.',
      choices: [
        'Although I was very tired, I finished my homework.',
        'Because I was very tired, I finished my homework.',
        'Although I was very tired, but I finished my homework.',
        'If I was very tired, I finished my homework.',
      ],
      answer: 0,
      why: [
        '',
        '피곤해서 숙제를 끝냈다는 것은 어색해요. 피곤한데도 끝낸 것이므로 기대와 반대예요.',
        'although와 but을 한 문장에 함께 쓰지 않아요. but을 빼야 해요.',
        'if는 조건이에요. 이미 일어난 두 일이 서로 반대되는 관계예요.',
      ],
      hint: '피곤하면 보통 어떻게 할까요? 두 문장의 관계를 생각해 보세요.',
      explain: '피곤하면 보통 쉬는데, 반대로 숙제를 끝냈어요. 그래서 양보의 **Although**로 이어요. although를 쓰면 but은 쓰지 않아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '어법상 **어색한** 문장을 고르세요.',
      choices: [
        'If it will snow tomorrow, we will make a snowman.',
        'If you are hungry, I will make you a sandwich.',
        "We will be late if we don't hurry.",
        'If she calls me, I will tell her the news.',
      ],
      answer: 0,
      why: [
        '',
        'if절에 현재시제 are, 주절에 will make — 바른 문장이에요.',
        'if절이 뒤에 오면 쉼표 없이 써요. if절에 현재시제(don\'t hurry) — 바른 문장이에요.',
        '3인칭 단수 주어 she에 현재시제 calls — 바른 문장이에요.',
      ],
      hint: '조건의 if절에 쓰는 시제를 하나씩 확인해 보세요.',
      explain: '조건의 if절에는 미래의 일이라도 will을 쓰지 않아요. If it **will snow** → If it **snows** tomorrow, we will make a snowman.으로 고쳐야 해요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 1,
      q: '두 문장이 같은 뜻이 되도록 빈칸에 알맞은 한 낱말을 쓰세요.\n\nIf you don\'t wear a helmet, you may get hurt.\n= Wear a helmet, [[빈칸]] you may get hurt.',
      answer: ['or'],
      wrong: [
        { a: 'and', why: 'and는 "그러면"이에요. 헬멧을 쓰면 다친다는 이상한 뜻이 돼요. "~하지 않으면"은 or로 나타내요.' },
        { a: 'but', why: '명령문 뒤에 결과를 이을 때는 and나 or를 써요. "그렇지 않으면"은 or예요.' },
      ],
      hint: 'if절에 don\'t가 있어요. "~하지 않으면"을 명령문 뒤에서 무엇으로 나타낼까요?',
      explain: 'If you don\'t ~ = 명령문, **or** ~예요. "헬멧을 써라, 그렇지 않으면 다칠 수도 있어."',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '빈칸 (A), (B)에 들어갈 말을 차례대로 고르세요.\n\n(A) [[빈칸]] the test was difficult, Jiho got a good score. He studied (B) [[빈칸]] hard that he could answer every question.',
      choices: ['Although – so', 'Because – so', 'Although – very', 'If – such'],
      answer: 0,
      why: [
        '',
        '시험이 어려워서 좋은 점수를 받았다는 것은 어색해요. (A)는 "~이지만"의 Although예요.',
        '(B) 뒤에 that이 있으므로 very가 아니라 so를 써요.',
        'If는 조건이에요. 또 부사 hard 앞에서 that과 짝을 이루는 말은 so예요.',
      ],
      hint: '(A)는 두 일의 관계(예상대로? 예상과 반대?), (B)는 뒤의 that을 보세요.',
      explain: '(A) 시험이 어려웠는데도 좋은 점수를 받았으므로 양보의 **Although**. (B) "아주 열심히 공부해서 모든 문제에 답할 수 있었다" — so + 부사 + that 구문이므로 **so**.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '글의 내용을 가장 잘 요약한 문장을 고르세요.\n\nDoyun\'s town had a big problem. There were too many cars on the roads, and the air was dirty. So the town made bike roads and gave free bikes to students. Now a lot of people ride bikes to school and work. The air is cleaner than before.',
      choices: [
        'Because the town made bike roads, more people ride bikes and the air is cleaner.',
        'Because the air was clean, the town made bike roads.',
        'Although the town made bike roads, nobody rides bikes.',
        'If people buy new cars, the air will be cleaner.',
      ],
      answer: 0,
      why: [
        '',
        '원인과 결과가 거꾸로예요. 공기가 더러워서 자전거 길을 만들었고, 그 결과 공기가 깨끗해졌어요.',
        '글과 반대예요. 많은 사람이 자전거를 타고 학교와 직장에 가요.',
        '새 차를 산다는 내용은 글에 없어요. 오히려 차가 너무 많은 것이 문제였어요.',
      ],
      hint: '문제(원인) → 마을이 한 일 → 결과를 차례로 찾아보세요.',
      explain: '차가 많고 공기가 더러웠어요(문제) → 마을이 자전거 길을 만들고 학생들에게 자전거를 주었어요(한 일) → 자전거 타는 사람이 늘고 공기가 깨끗해졌어요(결과). 이 흐름을 because로 묶은 것이 첫째 문장이에요.\n\n(도윤이네 마을에는 큰 문제가 있었어요. 도로에 차가 너무 많았고 공기가 더러웠어요. 그래서 마을은 자전거 길을 만들고 학생들에게 무료 자전거를 주었어요. 이제 많은 사람이 자전거를 타고 학교와 직장에 가요. 공기가 전보다 깨끗해요.)',
    },
  ],

  deeper: [
    {
      title: '시간의 when도 현재시제로 미래를 말해요',
      body: '조건의 if절처럼, 시간을 나타내는 **when**(~할 때), **before**(~하기 전에), **after**(~한 뒤에)가 이끄는 부분에서도 앞으로의 일을 **현재시제**로 써요.\n\n- **When** Mom **comes** home, we will have dinner. (엄마가 집에 오시면 우리는 저녁을 먹을 거예요.)\n- I will call you **after** I **finish** my homework. (숙제를 끝낸 뒤에 전화할게.)\n\n"그때가 되면"이라는 기준만 세우고, 미래는 주절의 will이 맡는 것이 if절과 똑같아요.\n\n중3에서는 **If I were a bird, I could fly.**처럼 지금 사실과 반대되는 일을 상상하는 **가정법 과거**를 배워요. 이번 단원의 if는 실제로 일어날 수 있는 조건을 말하는 if라는 점을 기억해 두면, 두 if를 헷갈리지 않아요.',
    },
  ],

  faq: [
    {
      q: '내일 일인데 왜 if 뒤에 will을 안 써요?',
      a: '조건의 if절은 "그렇다고 치면"이라는 조건만 세우는 자리라서 현재시제를 써요. 앞으로 일어날 결과는 주절의 will이 나타내요. If it rains tomorrow, we will stay home.처럼 미래 표시는 주절에 한 번만 붙인다고 기억하세요.',
    },
    {
      q: '명령문 뒤에 and가 오는지 or가 오는지 어떻게 알아요?',
      a: '뒤의 결과가 명령을 따랐을 때의 일이면 and(그러면), 따르지 않았을 때의 일이면 or(그렇지 않으면)예요. 헷갈리면 if 문장으로 바꿔 보세요. If you ~로 말이 되면 and, If you don\'t ~로 말이 되면 or예요.',
    },
    {
      q: 'although랑 but은 뭐가 달라요?',
      a: '뜻은 비슷하지만 붙는 자리가 달라요. although는 "~이지만" 쪽 문장 앞에 붙고(Although it was cold, we swam.), but은 반대되는 뒤 문장 앞에 붙어요(It was cold, but we swam.). 한 문장에 둘을 함께 쓰지 않아요.',
    },
    {
      q: 'so ~ that이랑 그냥 so는 뭐가 달라요?',
      a: '그냥 so는 "그래서"라는 뜻으로 두 문장을 이어요(It was very cold, so we stayed home.). so ~ that은 so가 형용사·부사 바로 앞에 와서 정도를 키우고, that 뒤에 결과가 와요(It was so cold that we stayed home.). 뜻은 비슷하지만 so ~ that이 "너무 ~해서"라는 정도를 더 강하게 드러내요.',
    },
  ],

  mistakes: [
    '조건의 if절에 will을 쓰는 실수 — If it will rain tomorrow(✗) → If it rains tomorrow(○)',
    'although와 but을 함께 쓰는 실수 — Although it was cold, but we swam(✗) → Although it was cold, we swam(○)',
    'so 대신 very를 that과 짝짓는 실수 — It was very cold that ~(✗) → It was so cold that ~(○)',
  ],

  gens: [
    {
      id: 'if-present',
      level: 1,
      title: '조건의 if절에 알맞은 동사 꼴 고르기',
      make: function (R) {
        // [주어, 3인칭 단수인가, 동사원형, -s형, 과거형, 뒷말, 주절, 우리말]
        var items = [
          ['it', true, 'rain', 'rains', 'rained', 'tomorrow', 'we will stay home', '내일 비가 오면 우리는 집에 있을 거예요'],
          ['you', false, 'hurry', 'hurries', 'hurried', '', 'you will catch the bus', '서두르면 너는 버스를 탈 수 있을 거야'],
          ['she', true, 'call', 'calls', 'called', 'me tonight', 'I will tell her the news', '그녀가 오늘 밤 나에게 전화하면 나는 그 소식을 말해 줄 거예요'],
          ['we', false, 'leave', 'leaves', 'left', 'now', 'we will arrive on time', '우리가 지금 떠나면 제시간에 도착할 거예요'],
          ['Minsu', true, 'win', 'wins', 'won', 'the race', 'his friends will be happy', '민수가 경주에서 이기면 친구들이 기뻐할 거예요'],
          ['they', false, 'practice', 'practices', 'practiced', 'every day', 'they will win the game', '그들이 매일 연습하면 경기에서 이길 거예요'],
          ['Jia', true, 'finish', 'finishes', 'finished', 'her homework early', 'she will watch a movie', '지아가 숙제를 일찍 끝내면 영화를 볼 거예요'],
          ['I', false, 'get', 'gets', 'got', 'up early', 'I will go jogging', '내가 일찍 일어나면 조깅하러 갈 거예요'],
          ['the bus', true, 'come', 'comes', 'came', 'late', 'we will take a taxi', '버스가 늦게 오면 우리는 택시를 탈 거예요'],
          ['my mom', true, 'cook', 'cooks', 'cooked', 'pasta', 'I will help her', '엄마가 파스타를 요리하시면 나는 도와드릴 거예요'],
          ['you', false, 'study', 'studies', 'studied', 'hard', 'you will pass the test', '열심히 공부하면 너는 시험에 합격할 거야'],
          ['it', true, 'snow', 'snows', 'snowed', 'a lot', 'the school will close', '눈이 많이 오면 학교가 문을 닫을 거예요'],
          ['he', true, 'miss', 'misses', 'missed', 'the train', 'he will be late', '그가 기차를 놓치면 늦을 거예요'],
          ['the students', false, 'clean', 'cleans', 'cleaned', 'the classroom', 'the teacher will be pleased', '학생들이 교실을 청소하면 선생님이 기뻐하실 거예요'],
          ['Seojun', true, 'do', 'does', 'did', 'his best', 'he will get a good score', '서준이가 최선을 다하면 좋은 점수를 받을 거예요'],
          ['we', false, 'take', 'takes', 'took', 'the subway', 'we will save time', '우리가 지하철을 타면 시간을 아낄 거예요'],
        ];
        var it = R.pick(items);
        var correct = it[1] ? it[3] : it[2];
        var other = it[1] ? it[2] : it[3];
        var reason = {};
        reason['will ' + it[2]] = '조건의 if절에는 앞으로의 일이라도 will을 쓰지 않아요. 현재시제를 써요.';
        reason[it[4]] = '과거형이에요. 앞으로의 조건이라도 if절에는 현재시제를 써요.';
        reason[other] = it[1]
          ? '주어(' + it[0] + ')가 3인칭 단수예요. 현재시제 동사에 -s/-es를 붙여요.'
          : '주어(' + it[0] + ')가 3인칭 단수가 아니에요. 현재시제는 동사원형 모양 그대로 써요.';
        var pick = R.choices(correct, ['will ' + it[2], it[4], other], 4);
        var ifPart = 'if ' + it[0] + ' [[빈칸]]' + (it[5] ? ' ' + it[5] : '');
        var q;
        if (R.bool()) {
          q = 'I' + ifPart.slice(1) + ', ' + it[6] + '.';
        } else {
          q = it[6].charAt(0).toUpperCase() + it[6].slice(1) + ' ' + ifPart + '.';
        }
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + q,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '조건의 if절에는 앞으로 일어날 일이라도 **현재시제**를 써요. 주어(' + it[0] + ')에 맞춘 현재형은 **' + correct + '**. 뜻: ' + it[7] + '.',
        };
      },
    },
    {
      id: 'imperative-and-or',
      level: 2,
      title: '명령문, and ~ / 명령문, or ~ 고르기',
      make: function (R) {
        // [명령문, 결과, 정답 접속사, 우리말]
        var items = [
          ['Take this medicine', 'you will feel better', 'and', '이 약을 먹어라, 그러면 나아질 거야.'],
          ['Study hard', 'you will pass the exam', 'and', '열심히 공부해라, 그러면 시험에 합격할 거야.'],
          ['Turn left at the corner', 'you will see the library', 'and', '모퉁이에서 왼쪽으로 돌아라, 그러면 도서관이 보일 거야.'],
          ['Practice every day', 'you will get better', 'and', '매일 연습해라, 그러면 실력이 늘 거야.'],
          ['Go to bed early', 'you will feel fresh tomorrow', 'and', '일찍 자라, 그러면 내일 개운할 거야.'],
          ['Read this book', 'you will learn a lot', 'and', '이 책을 읽어라, 그러면 많이 배울 거야.'],
          ['Smile at people', 'they will smile back', 'and', '사람들에게 웃어 줘라, 그러면 그들도 웃어 줄 거야.'],
          ['Hurry up', 'you will miss the bus', 'or', '서둘러라, 그렇지 않으면 버스를 놓칠 거야.'],
          ['Wear a coat', 'you will catch a cold', 'or', '코트를 입어라, 그렇지 않으면 감기에 걸릴 거야.'],
          ['Wear a helmet', 'you may get hurt', 'or', '헬멧을 써라, 그렇지 않으면 다칠 수도 있어.'],
          ['Leave now', 'you will be late', 'or', '지금 떠나라, 그렇지 않으면 늦을 거야.'],
          ['Save your file', 'you will lose your work', 'or', '파일을 저장해라, 그렇지 않으면 작업한 것을 잃을 거야.'],
          ['Drink enough water', 'you will feel thirsty', 'or', '물을 충분히 마셔라, 그렇지 않으면 목이 마를 거야.'],
          ['Close the window', 'the rain will come in', 'or', '창문을 닫아라, 그렇지 않으면 비가 들이칠 거야.'],
        ];
        var it = R.pick(items);
        var correct = it[2];
        var reason = {
          and: 'and는 "그러면"이에요. 명령을 따르지 않았을 때의 결과가 뒤에 오므로 or(그렇지 않으면)를 써요.',
          or: 'or는 "그렇지 않으면"이에요. 명령을 따랐을 때의 결과가 뒤에 오므로 and(그러면)를 써요.',
          but: 'but은 "하지만"이에요. 명령문 뒤에 결과를 이을 때는 and나 or를 써요.',
          so: 'so는 "그래서"예요. 명령문 뒤에 결과를 이을 때는 and나 or를 써요.',
        };
        var wrongs = ['and', 'or', 'but', 'so'].filter(function (w) { return w !== correct; });
        var pick = R.choices(correct, wrongs, 4);
        var low = it[0].charAt(0).toLowerCase() + it[0].slice(1);
        var same = correct === 'and'
          ? 'If you ' + low + ', ' + it[1] + '.'
          : 'If you don\'t ' + low + ', ' + it[1] + '.';
        return {
          type: 'choice', concept: 1,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[3] + '\n' + it[0] + ', [[빈칸]] ' + it[1] + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: (correct === 'and'
            ? '명령문, **and** ~는 "~해라, 그러면 …할 것이다"예요.'
            : '명령문, **or** ~는 "~해라, 그렇지 않으면 …할 것이다"예요.') + ' if 문장으로 바꾸면: ' + same,
        };
      },
    },
    {
      id: 'although-because',
      level: 2,
      title: 'although와 because 구별하기',
      make: function (R) {
        // [앞 문장, 뒤 문장, 정답 접속사, 우리말]
        var items = [
          ['it was raining', 'we played soccer outside', 'Although', '비가 오고 있었지만 우리는 밖에서 축구를 했어요.'],
          ['she was tired', 'she finished her homework', 'Although', '그녀는 피곤했지만 숙제를 끝냈어요.'],
          ['the test was difficult', 'Jiho got a good score', 'Although', '시험이 어려웠지만 지호는 좋은 점수를 받았어요.'],
          ['the movie was long', 'it was not boring', 'Although', '영화는 길었지만 지루하지 않았어요.'],
          ['he is young', 'he can cook very well', 'Although', '그는 어리지만 요리를 아주 잘할 수 있어요.'],
          ['the bag was heavy', 'Mina carried it alone', 'Although', '가방이 무거웠지만 미나는 혼자 그것을 들고 갔어요.'],
          ['it was cold', 'the children swam in the sea', 'Although', '추웠지만 아이들은 바다에서 수영했어요.'],
          ['it was raining', 'we stayed at home', 'Because', '비가 오고 있었기 때문에 우리는 집에 있었어요.'],
          ['she was tired', 'she went to bed early', 'Because', '그녀는 피곤했기 때문에 일찍 잤어요.'],
          ['the test was difficult', 'many students got low scores', 'Because', '시험이 어려웠기 때문에 많은 학생이 낮은 점수를 받았어요.'],
          ['the bag was heavy', 'Mina asked for help', 'Because', '가방이 무거웠기 때문에 미나는 도움을 청했어요.'],
          ['it was cold', 'the children wore warm coats', 'Because', '추웠기 때문에 아이들은 따뜻한 코트를 입었어요.'],
          ['the shop was crowded', 'we went to another shop', 'Because', '가게가 붐볐기 때문에 우리는 다른 가게로 갔어요.'],
          ['he missed the bus', 'he was late for school', 'Because', '그는 버스를 놓쳤기 때문에 학교에 늦었어요.'],
        ];
        var it = R.pick(items);
        var correct = it[2];
        var reason = {
          Although: 'Although는 "~이지만"이에요. 우리말은 "~ 때문에"이므로 원인을 나타내는 Because를 써요.',
          Because: 'Because는 "~ 때문에"예요. 우리말은 "~이지만"이므로 기대와 반대되는 내용을 잇는 Although를 써요.',
          If: 'If는 "만약 ~하면"이라는 조건이에요. 우리말에는 조건이 없어요.',
        };
        var wrongs = ['Although', 'Because', 'If'].filter(function (w) { return w !== correct; });
        var pick = R.choices(correct, wrongs, 3);
        return {
          type: 'choice', concept: 3,
          q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + it[3] + '\n[[빈칸]] ' + it[0] + ', ' + it[1] + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: correct === 'Although'
            ? '"~이지만"은 양보의 **Although**예요. 앞의 일로 보아 기대되는 것과 반대되는 일이 뒤에 왔어요.'
            : '"~ 때문에"는 원인을 나타내는 **Because**예요. 앞의 일(원인) 때문에 뒤의 일(결과)이 자연스럽게 일어났어요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'hurry', m: '서두르다', ex: 'Hurry up, or we will be late.', exm: '서둘러, 그렇지 않으면 우리는 늦을 거야.' },
    { w: 'miss', m: '놓치다', ex: 'I missed the bus this morning.', exm: '나는 오늘 아침에 버스를 놓쳤어요.' },
    { w: 'lift', m: '들어 올리다', ex: 'The box was so heavy that I couldn\'t lift it.', exm: '상자가 너무 무거워서 나는 그것을 들어 올릴 수 없었어요.' },
    { w: 'cause', m: '원인; ~을 일으키다', ex: 'Too much rain can cause floods.', exm: '너무 많은 비는 홍수를 일으킬 수 있어요.' },
    { w: 'result', m: '결과', ex: 'As a result, the air became cleaner.', exm: '그 결과 공기가 더 깨끗해졌어요.' },
    { w: 'effect', m: '효과, 영향', ex: 'Exercise has a good effect on your health.', exm: '운동은 건강에 좋은 영향을 줘요.' },
    { w: 'waste', m: '낭비하다', ex: 'Don\'t waste water.', exm: '물을 낭비하지 마세요.' },
    { w: 'protect', m: '보호하다, 지키다', ex: 'A helmet protects your head.', exm: '헬멧은 머리를 보호해 줘요.' },
    { w: 'crowded', m: '붐비는', ex: 'The park was crowded on Sunday.', exm: '일요일에 공원이 붐볐어요.' },
    { w: 'slippery', m: '미끄러운', ex: 'The road is slippery after the snow.', exm: '눈이 온 뒤에는 길이 미끄러워요.' },
    { w: 'score', m: '점수', ex: 'She got a good score on the test.', exm: '그녀는 시험에서 좋은 점수를 받았어요.' },
    { w: 'tired', m: '피곤한', ex: 'Although I was tired, I helped my mom.', exm: '나는 피곤했지만 엄마를 도와드렸어요.' },
    { w: 'forecast', m: '예보', ex: 'The weather forecast says it will rain.', exm: '일기 예보에서 비가 올 거라고 해요.' },
    { w: 'pollution', m: '오염', ex: 'Cars cause air pollution.', exm: '자동차는 대기 오염을 일으켜요.' },
  ],
});
