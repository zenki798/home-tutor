/* 영어Ⅰ · 알맞은 제목 고르기
 * 지문은 모두 직접 쓴 글이다(가상의 상황·인물). */
(function () {
  // 잠과 기억 (직접 쓴 글)
  var SLEEP = 'Many students stay up late before an exam, believing that more study time always means better results. But sleep is not wasted time. While we sleep, the brain replays what we learned during the day and stores it more firmly. Students who sleep well after studying often remember more than those who study all night. A good night\'s rest, then, is part of studying, not a break from it.';
  // 지역 먹거리 (직접 쓴 글)
  var LOCAL = 'Buying food grown near your home has several benefits. Local food does not have to travel long distances, so less fuel is used to transport it. It also tends to be fresher because it reaches the market soon after harvest. In addition, the money you spend stays in your community and supports nearby farmers. Choosing local food is a small habit that helps the environment, your health, and your neighbors.';
  // 지루함 (직접 쓴 글)
  var BORED = 'Most of us try hard to avoid boredom. The moment we have nothing to do, we reach for our phones. However, some psychologists argue that boredom has real value. When the mind is not busy, it begins to wander, and this wandering often leads to fresh ideas. Many people say that their best ideas came to them while they were waiting for a bus or washing the dishes. Perhaps we should allow ourselves to be bored once in a while.';
  // 도시의 나무 (직접 쓴 글)
  var TREES = 'Trees in cities do much more than make streets look pretty. In summer, their shade keeps sidewalks and buildings cooler, which reduces the need for air conditioning. Their leaves catch dust from the air, and their roots help rainwater soak into the ground instead of flooding the streets. For these reasons, planting trees is one of the simplest ways to make a city a better place to live.';
  // 오래 앉아 있기 (직접 쓴 글)
  var SIT = 'Sitting for many hours a day is a common habit for office workers and students alike. Yet the human body is built to move. Even a short walk every hour can improve blood flow and help you concentrate when you return to your desk. You do not need a gym or special equipment. Simply standing up and moving around for a few minutes is enough to make a difference.';
  // 틀린 답과 배움 (직접 쓴 글)
  var ERR = 'Many students feel embarrassed when they give a wrong answer in class, so they prefer to stay silent. Yet a wrong guess is not always a waste. When we guess and then discover the correct answer, we tend to pay closer attention to it because it surprises us. That extra attention helps the correct answer stay in our memory. So the next time you are unsure, it may be better to make a guess than to say nothing at all.';
  // 손글씨 메모 (직접 쓴 글)
  var NOTES = 'Many students now take notes on laptops because typing is fast. But fast is not always better. When people type, they often copy the speaker\'s words exactly without thinking about them. When they write by hand, they cannot keep up with every word, so they must decide what is important and put it in their own words. This extra effort, some teachers believe, helps students understand the lesson more deeply.';
  // 실패한 발명 (직접 쓴 글)
  var FAIL = 'A small company once tried to make a glue that was supposed to be extremely strong. The result was disappointing: the glue was so weak that papers stuck with it could be pulled apart easily. Instead of throwing it away, one of the workers found a use for it. Because it could be removed without leaving a mark, it was perfect for small notes that needed to be moved around. What looked like a failure became a product used in offices around the world.';
  // 함께 먹는 식사 (직접 쓴 글)
  var MEAL = 'In many busy families, people eat at different times and often in front of different screens. Family meals, however, offer more than food. Sitting at the same table gives parents and children a regular chance to talk about their day. Children who share meals with their families often learn new words from these conversations and feel more connected at home. A shared dinner does not have to be fancy; what matters is being there together.';
  // 언어 배우기 (직접 쓴 글)
  // 길 찾기 앱과 종이 지도 (직접 쓴 글)
  var MAP = 'With a navigation app, we can reach almost any place without thinking about the way. We simply follow the arrow on the screen. The problem is that we rarely remember the route afterward. When we use a paper map, on the other hand, we have to notice street names and landmarks and picture where we are. This effort builds a map inside our heads. Navigation apps are useful, of course, but leaving them in our pockets now and then can keep our sense of direction sharp.';
  // 고쳐 쓰기 (직접 쓴 글)
  var REPAIR = 'When a chair breaks or a jacket tears, many people simply throw it away and buy a new one. Yet many broken things can be fixed with a little time and a few simple tools. A loose chair leg can be glued, and a small hole in a jacket can be sewn up in minutes. Repairing things saves money and keeps useful objects out of the trash. It can also be satisfying to use something that you have saved with your own hands.';
  var LANG = 'People often say that adults are too old to learn a new language. It is true that young children usually pick up pronunciation more naturally. Yet adults have their own strengths. They already know how one language works, so they can compare grammar rules and notice patterns. They can also plan their study and choose materials that suit their goals. Age changes the way we learn a language, but it does not close the door.';

Tutor.registerUnit({
  id: 'eng-h-e1-01',
  course: 'eng-h-e1',
  title: '알맞은 제목 고르기',
  summary: '글의 핵심 소재와 글쓴이의 관점을 함께 담은 제목을 찾고, 너무 넓거나 좁은 선택지를 걸러 냅니다.',
  goals: [
    '글의 주제와 제목의 차이를 설명하고, 짧고 함축적인 제목의 특징을 알 수 있다.',
    '핵심 소재와 글쓴이의 관점을 함께 담은 제목을 고를 수 있다.',
    '의문형·비유형 제목이 글의 내용과 맞는지 판단할 수 있다.',
    '너무 넓거나 좁은 선택지, 본문 표현을 바꿔 쓴 선택지를 가려낼 수 있다.',
  ],
  standards: ['[12영Ⅰ-01-02]'],

  concepts: [
    {
      title: '주제와 제목은 어떻게 다른가',
      body: '**주제(topic, main idea)**는 글이 결국 무엇을 말하는지를 정리한 것이고, **제목(title)**은 그 내용을 독자에게 보여 주는 **짧은 이름**입니다. 둘은 같은 내용을 가리키지만 모양이 다릅니다.\n\n| | 주제 | 제목 |\n|---|---|---|\n| 길이 | 구나 문장으로 비교적 자세히 | 몇 낱말로 짧게 |\n| 표현 | 직접적·설명적 | 함축적(의문문·비유·콜론 사용) |\n| 예 | the role of sleep in remembering what we study | Sleep: A Secret Partner in Learning |\n\n제목은 짧기 때문에 낱말 하나하나가 많은 뜻을 담습니다. 그래서 제목을 고를 때에는 겉모양이 달라 보여도 **주제와 같은 내용을 가리키는지**를 확인해야 합니다.\n\n> 💡 제목 문제는 먼저 글의 주제를 우리말 한 문장으로 정리해 두고, 선택지마다 "이 제목을 풀어 말하면 그 주제가 되는가?"를 묻는 방식으로 풉니다.',
      easy: '책 표지에 적힌 이름과 책 뒤표지의 줄거리 소개를 떠올려 보십시오. 줄거리 소개(주제)는 몇 문장으로 자세히 설명하지만, 표지의 이름(제목)은 몇 낱말뿐입니다.\n\n그래도 둘은 같은 책을 가리킵니다. 제목 문제는 "이 표지 이름이 이 줄거리의 책에 붙어 있어도 어색하지 않은가"를 고르는 문제라고 생각하면 됩니다.',
      check: {
        type: 'ox',
        q: '제목은 글의 주제를 반드시 완전한 영어 문장(주어와 동사가 있는 문장)으로 나타내야 한다.',
        answer: false,
        explain: '제목은 짧고 함축적인 표현입니다. 명사구(Sleep: A Secret Partner in Learning), 의문문, 비유 등 여러 모양이 가능하며, 완전한 문장일 필요는 없습니다.',
      },
    },
    {
      title: '핵심 소재 + 글쓴이의 관점 = 좋은 제목',
      body: '좋은 제목에는 두 가지가 함께 들어 있습니다.\n\n1. **핵심 소재**: 글이 무엇에 관한 것인가 (예: local food, sleep, city trees)\n2. **글쓴이의 관점**: 그 소재에 대해 무엇을 말하는가 (장점·단점·원인·해결책·오해 바로잡기 등)\n\n소재만 있는 제목(예: Local Food)은 글이 장점을 말하는지 문제점을 말하는지 알려 주지 못합니다. 반대로 관점만 있고 소재가 빠진 제목(예: A Small Habit That Helps)은 무엇에 관한 글인지 알 수 없습니다.\n\n| 소재 | 관점 | 제목 |\n|---|---|---|\n| local food | 환경·건강·이웃에 이롭다 | Eat Local: Good for You, Your Town, and the Planet |\n| boredom | 창의력에 도움이 된다 | Why Boredom Can Be Good for You |\n\n> 💡 관점은 글의 마지막 문장이나 however, but, yet 뒤에 자주 드러납니다. 글쓴이가 결론으로 말하는 쪽을 찾으십시오.',
      easy: '"라면"이라는 제목만 보고는 라면이 맛있다는 글인지, 건강에 나쁘다는 글인지 알 수 없습니다. "라면, 가끔은 괜찮아요"라고 써야 소재(라면)와 생각(가끔은 괜찮다)이 함께 보입니다.\n\n영어 제목도 같습니다. **무엇에 대해(소재)** + **어떻게 생각하는지(관점)**가 둘 다 보여야 좋은 제목입니다.',
      check: {
        type: 'choice',
        q: '글쓴이가 "도시의 나무는 그늘·먼지 제거·빗물 흡수로 도시를 살기 좋게 만든다"고 주장하는 글입니다. 핵심 소재와 관점을 **모두** 담은 제목은 무엇입니까?',
        choices: ['City Trees Make Better Cities', 'Trees in the City', 'A Better Place to Live'],
        answer: 0,
        why: ['', '소재(도시의 나무)만 있고, 글쓴이가 나무를 어떻게 보는지(도시를 더 낫게 만든다)가 빠졌습니다.', '관점(더 살기 좋은 곳)만 있고, 무엇 때문인지(나무)라는 소재가 빠졌습니다.'],
        explain: 'City Trees(소재)와 Make Better Cities(관점: 도시를 더 좋게 만든다)가 함께 들어 있는 제목이 가장 알맞습니다.',
      },
    },
    {
      title: '의문형 제목과 비유형 제목',
      body: '제목은 독자의 관심을 끌기 위해 **의문문**이나 **비유**를 자주 씁니다.\n\n### 의문형 제목\n글이 그 질문에 **답을 하는 글**이어야 합니다. 또 질문 속에 담긴 **답의 방향**이 글과 같은지 확인합니다.\n\n- Is Boredom Really a Waste of Time? → "정말 시간 낭비일까? 아니다"라는 방향을 암시합니다. 지루함의 가치를 말하는 글에 어울립니다.\n- Why Do We Forget Our Dreams? → 꿈을 잊는 **이유**를 설명하는 글이어야 합니다.\n\n### 비유형 제목\n소재를 다른 것에 빗대어 나타냅니다. 비유가 **무엇을 가리키는지** 풀어 보고, 그 뜻이 글의 요지와 맞는지 확인합니다.\n\n- Sleep: A Secret Partner in Learning → 잠이 (눈에 띄지 않게) 공부를 돕는 짝이다\n- Opening a Door in Your Mind → 생각이나 가능성이 새로 열린다\n\n> ⚠️ 비유형 제목은 낱말만 보면 글과 상관없어 보여서 오답으로 잘못 지우기 쉽습니다. 겉 낱말이 아니라 **비유가 가리키는 뜻**으로 판단합니다.',
      easy: '"비 오는 날, 우산이 되어 준 친구"라는 제목을 보면 실제 우산 이야기가 아니라 힘들 때 도와준 친구 이야기라는 것을 압니다. 이것이 비유형 제목입니다.\n\n"숙제, 꼭 많아야 할까?"라는 제목은 "꼭 많을 필요는 없다"는 쪽의 글에 어울립니다. 의문형 제목은 질문이 품고 있는 답의 방향까지 읽어야 합니다.',
      check: {
        type: 'choice',
        q: '글쓴이가 "지루할 때 떠오르는 생각이 새로운 아이디어로 이어지므로, 가끔은 지루해도 괜찮다"고 말하는 글입니다. 가장 알맞은 제목은 무엇입니까?',
        choices: ['Is Boredom Really a Waste of Time?', 'How Can We Avoid Boredom Completely?', 'Is Your Phone Making You Bored?'],
        answer: 0,
        why: ['', '지루함을 완전히 피하는 방법을 묻는 제목은 "가끔은 지루해도 괜찮다"는 글쓴이의 관점과 반대 방향입니다.', '휴대 전화가 지루함의 원인인지 묻는 제목입니다. 글은 지루함의 원인이 아니라 가치를 말합니다.'],
        explain: '"정말 시간 낭비일까?"라는 질문은 "아니다, 가치가 있다"는 답을 암시합니다. 지루함의 가치를 말하는 글의 관점과 방향이 같습니다.',
      },
    },
    {
      title: '너무 넓거나 좁은 선택지 걸러 내기',
      body: '오답 선택지는 대개 글과 **관련된 낱말**을 쓰면서 범위를 틀리게 잡습니다.\n\n- **너무 넓은 제목**: 글이 다루지 않는 범위까지 포함합니다. 도시의 나무에 관한 글에 The Beauty of Nature(자연의 아름다움)는 너무 넓습니다.\n- **너무 좁은 제목**: 글의 **한 예시·한 세부 내용**만 담습니다. 같은 글에 How Leaves Catch Dust(잎이 먼지를 잡는 방법)는 여러 이점 중 하나뿐이라 너무 좁습니다.\n- **관점이 어긋난 제목**: 소재는 맞지만 글쓴이의 생각과 반대이거나, 글에 없는 내용(위험, 역사, 방법 등)을 말합니다.\n\n정답은 글의 **처음부터 끝까지를 덮는** 제목입니다. 선택지를 하나씩 보며 "글의 모든 문단·예시가 이 제목 아래에 들어가는가?"를 확인합니다.\n\n> 💡 너무 좁은 선택지는 본문에 실제로 나온 낱말을 그대로 써서 매력적으로 보입니다. "글에 나온 말"과 "글 전체의 요지"는 다릅니다.',
      easy: '사진첩에 제주도 여행 사진만 있다면 "우리 가족의 모든 여행"은 너무 넓은 이름이고, "제주도에서 먹은 귤"은 사진 한 장에만 맞는 너무 좁은 이름입니다. "우리 가족 제주도 여행"이 딱 맞습니다.\n\n제목도 글 전체를 담는 크기의 그릇이어야 합니다.',
      check: {
        type: 'choice',
        q: '도시의 나무가 그늘을 만들고, 먼지를 잡고, 빗물을 흡수해 도시를 살기 좋게 한다는 글입니다. **너무 좁은** 제목은 무엇입니까?',
        choices: ['How Leaves Catch Dust', 'The Beauty of Nature', 'City Trees: Small Workers with Big Jobs'],
        answer: 0,
        why: ['', '글이 다루지 않는 자연 전체로 범위를 넓힌, 너무 넓은 제목입니다.', '이 제목은 나무(작은 일꾼)가 여러 큰일을 한다는 글 전체를 담은 알맞은 제목입니다.'],
        explain: '먼지를 잡는 것은 나무가 하는 여러 일 가운데 하나뿐입니다. 그래서 글의 일부만 담은 너무 좁은 제목은 How Leaves Catch Dust입니다.',
      },
    },
    {
      title: '본문 표현을 바꿔 쓴 선택지 알아보기',
      body: '정답 제목은 본문 낱말을 그대로 쓰기보다 **같은 뜻을 다른 말로 바꿔 쓴(paraphrase)** 경우가 많습니다.\n\n| 본문 | 바꿔 쓴 제목의 표현 |\n|---|---|\n| sleep … stores what we learned more firmly | Sleep Helps You Remember |\n| boredom … leads to fresh ideas | Boredom, the Seed of Creativity |\n| a short walk every hour … help you concentrate | Get Up and Move to Think Better |\n| what looked like a failure became a product | From Failure to Success |\n\n거꾸로, **본문 낱말을 많이 그대로 옮긴 선택지가 함정**인 경우가 자주 있습니다. 낱말은 본문과 같지만 관계를 뒤집거나(You Need a Gym to Stay Healthy), 세부 하나만 담는 식입니다.\n\n> 💡 선택지를 읽을 때 "본문에 이 낱말이 있었나?"가 아니라 "본문에 이 **뜻**이 있었나?"를 묻습니다.',
      easy: '"그 영화 진짜 재미있었어."를 "시간 가는 줄 몰랐던 영화"라고 바꿔 말해도 뜻은 같습니다. 낱말이 하나도 겹치지 않아도 같은 내용이지요.\n\n제목 선택지도 본문을 이렇게 바꿔 말한 경우가 많습니다. 겹치는 낱말 수가 아니라 뜻이 같은지를 보십시오.',
      check: {
        type: 'choice',
        q: '본문의 핵심 문장이 다음과 같습니다. 이 뜻을 바꿔 쓴 제목으로 가장 알맞은 것은 무엇입니까?\n\nWhat looked like a failure became a product used around the world.',
        choices: ['From Failure to Success', 'Why Products Fail Around the World', 'A Product That Looked Strong'],
        answer: 0,
        why: ['', '본문과 같은 낱말(product, around the world)과 비슷한 낱말(fail)을 썼지만, 실패작이 성공했다는 뜻이 아니라 제품이 실패하는 이유를 말하는 제목입니다.', '본문은 겉보기에 실패작이었다고 말하지, 튼튼해 보였다고 말하지 않습니다.'],
        explain: '"실패처럼 보이던 것이 전 세계에서 쓰이는 제품이 되었다"는 "실패에서 성공으로"라고 바꿔 쓸 수 있습니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글의 제목으로 가장 알맞은 것을 고르십시오.\n\n' + SLEEP + '\n\n① How Long Should Students Study?\n② Sleep: A Secret Partner in Learning\n③ The Science of Dreams\n④ Stay Up Late, Score Higher',
      steps: [
        '**핵심 소재**를 찾습니다. 글 전체에 되풀이되는 말은 sleep(잠)입니다.',
        '**글쓴이의 관점**을 찾습니다. 둘째 문장(But sleep is not wasted time.)과 마지막 문장(A good night\'s rest … is part of studying.)에서 "잠은 공부의 일부다"라는 생각이 드러납니다.',
        '주제를 한 문장으로 정리합니다: 잠은 배운 것을 기억에 굳혀 주므로 공부를 돕는다.',
        '선택지를 걸러 냅니다. ①은 공부 시간 이야기로 소재가 빗나갔고, ③의 꿈은 글에 나오지 않으며, ④는 밤을 새우라는 뜻이라 관점이 반대입니다.',
        '②는 잠을 "보이지 않게 공부를 돕는 짝"에 빗댄 비유형 제목으로, 소재(sleep)와 관점(공부를 돕는다)을 모두 담았습니다.',
      ],
      answer: '② Sleep: A Secret Partner in Learning',
    },
    {
      q: '다음 글의 제목 후보 네 개를 각각 판단해 보십시오.\n\n' + TREES + '\n\n(A) The Beauty of Nature\n(B) How Leaves Catch Dust\n(C) Trees Make Streets Pretty\n(D) Why Every City Needs More Trees',
      steps: [
        '주제: 도시의 나무는 그늘·먼지 잡기·빗물 흡수로 도시를 살기 좋게 만든다. 마지막 문장에서 "나무 심기가 도시를 더 좋게 만드는 간단한 방법"이라고 정리합니다.',
        '(A)는 자연 전체로 범위를 넓힌 **너무 넓은** 제목입니다.',
        '(B)는 여러 이점 가운데 하나(먼지)만 담은 **너무 좁은** 제목입니다.',
        '(C)는 본문 첫 문장의 낱말(streets, pretty)을 그대로 썼지만, 글은 "예쁘게 하는 것 **이상**의 일을 한다"고 말합니다. 본문 표현을 쓴 함정입니다.',
        '(D)는 도시에 나무가 더 필요한 **까닭**을 다루는 글이라는 뜻으로, 소재와 관점을 모두 담고 글 전체를 덮습니다.',
      ],
      answer: '(D) Why Every City Needs More Trees',
    },
  ],

  terms: [
    { term: '주제', def: '글이 결국 무엇을 말하는지를 정리한 것입니다. 구나 문장으로 비교적 자세하게 나타냅니다. 예: the role of sleep in learning' },
    { term: '제목', def: '글의 내용을 독자에게 보여 주는 짧은 이름입니다. 주제와 같은 내용을 짧고 함축적으로 나타냅니다.' },
    { term: '핵심 소재', def: '글이 무엇에 관한 것인지를 나타내는 중심 대상입니다. 글 전체에 되풀이되는 낱말이나 그 바꿔 쓴 말에서 찾습니다. 예: local food, boredom' },
    { term: '글쓴이의 관점', def: '핵심 소재에 대해 글쓴이가 말하는 생각입니다. 장점·단점·원인·해결책·오해 바로잡기 등이 있습니다.' },
    { term: '함축', def: '말 속에 뜻을 줄여 담는 것입니다. 제목은 짧아서 낱말 하나하나가 많은 뜻을 함축합니다.' },
    { term: '의문형 제목', def: '질문 꼴의 제목입니다. 글이 그 질문에 답해야 하고, 질문이 암시하는 답의 방향이 글쓴이의 관점과 같아야 합니다. 예: Is Boredom Really a Waste of Time?' },
    { term: '비유형 제목', def: '소재를 다른 대상에 빗대어 나타낸 제목입니다. 비유가 가리키는 뜻으로 판단합니다. 예: Boredom, the Seed of Creativity' },
    { term: '바꿔 쓰기(paraphrase)', def: '같은 뜻을 다른 낱말이나 구조로 다시 표현하는 것입니다. 정답 제목은 본문 표현을 바꿔 쓴 경우가 많습니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '다음 글의 제목으로 가장 알맞은 것은 무엇입니까?\n\n' + LOCAL,
      choices: [
        'Fresh Vegetables Reach the Market Soon After Harvest',
        'Local Food: A Small Choice with Big Benefits',
        'Why Food Prices Keep Rising',
        'The Hidden Problems of Local Farms',
      ],
      answer: 1,
      why: [
        '신선하다는 것은 글이 말하는 여러 이점(환경·신선함·이웃) 가운데 하나뿐입니다. 너무 좁은 제목입니다.',
        '',
        '음식 가격이 오르는 까닭은 글에 나오지 않습니다. 소재가 빗나갔습니다.',
        '글은 지역 먹거리의 이점을 말합니다. 문제점을 말하는 제목은 관점이 반대입니다.',
      ],
      explain: '핵심 소재는 local food, 글쓴이의 관점은 "작은 습관이지만 환경·건강·이웃에 두루 이롭다"입니다. 마지막 문장(a small habit that helps …)을 바꿔 쓴 제목은 **Local Food: A Small Choice with Big Benefits**입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 3,
      q: '다음 글의 제목 후보 가운데 **너무 넓은** 것은 무엇입니까?\n\n' + SIT,
      choices: [
        'Move a Little, Sit Less',
        'Better Blood Flow Through Hourly Walks',
        'Health and Lifestyle in the Modern World',
        'Why You Need a Gym',
      ],
      answer: 2,
      why: [
        '오래 앉지 말고 조금씩 움직이라는 글 전체를 담은 알맞은 제목입니다.',
        '혈액 순환은 움직임의 좋은 점 가운데 하나뿐입니다. 너무 넓은 것이 아니라 너무 좁은 제목입니다.',
        '',
        '글은 헬스장이 필요 없다고 말합니다. 너무 넓은 제목이 아니라 관점이 반대인 제목입니다.',
      ],
      explain: '글은 "오래 앉아 있는 습관과 잠깐씩 움직이기"만 다룹니다. **Health and Lifestyle in the Modern World**(현대 세계의 건강과 생활 방식)는 글이 다루지 않는 넓은 범위까지 포함한 제목입니다.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 4,
      q: '제목에 본문의 주제문에 나온 낱말이 하나도 들어 있지 않으면, 그 제목은 알맞은 제목이 될 수 없다.',
      answer: false,
      explain: '제목은 본문 표현을 **바꿔 쓴** 경우가 많습니다. 예를 들어 손으로 필기하면 더 깊이 이해한다는 글의 주제문(This extra effort … helps students understand the lesson more deeply.)과 제목 Your Pen: A Tool for Thinking, Not Copying 사이에는 겹치는 낱말이 하나도 없습니다. 그래도 이 제목은 "펜은 베끼는 도구가 아니라 생각하는 도구"라는 말로 같은 내용을 함축합니다. 겹치는 낱말이 아니라 뜻으로 판단합니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '다음 글의 제목으로 가장 알맞은 것은 무엇입니까?\n\n' + LANG,
      choices: [
        'Why Children Learn Pronunciation Better',
        'Grammar Rules of Many Languages',
        'Why Adults Should Give Up on Languages',
        'Too Old to Learn a Language?',
      ],
      answer: 3,
      why: [
        '아이들이 발음을 더 자연스럽게 익힌다는 것은 글쓴이가 인정하는 한 부분(양보)일 뿐입니다. 너무 좁은 제목입니다.',
        '여러 언어의 문법 규칙은 글이 다루는 내용이 아닙니다. 범위가 넓고 빗나간 제목입니다.',
        '글은 "나이가 들어도 길이 닫히지 않는다"고 말합니다. 관점이 반대입니다.',
        '',
      ],
      explain: '정답은 **Too Old to Learn a Language?**입니다. "언어를 배우기에 너무 늦었을까? 그렇지 않다"라는 방향을 암시하는 의문형 제목입니다. 글은 Yet 뒤에서 어른의 강점을 말하고, 마지막 문장(… but it does not close the door.)에서 "길이 닫히지 않는다"고 결론을 냅니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'text', concept: 2,
      q: '다음 제목은 지루함을 "씨앗"에 빗대어 "새로운 생각이 자라나는 출발점"이라는 뜻을 담았습니다.\n\nBoredom, the Seed of Creativity\n\n이처럼 소재를 다른 대상에 빗대어 나타낸 제목을 이 단원에서 무엇이라고 부릅니까? (우리말로 쓰십시오.)',
      answer: ['비유형', '비유형 제목', '비유 제목', '비유', '비유적 제목', '비유적인 제목'],
      wrong: [{ a: '의문형', why: '의문형 제목은 질문 꼴(물음표)의 제목입니다. 이 제목은 질문이 아니라 지루함을 씨앗에 빗댄 것입니다.' }],
      explain: '소재를 다른 대상에 빗대어 나타낸 제목은 **비유형 제목**입니다. 씨앗(seed)이라는 겉 낱말이 아니라, 비유가 가리키는 뜻("창의력이 싹트는 출발점")이 글의 요지와 맞는지로 판단합니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 1,
      q: '다음 글의 **핵심 소재**를 본문에서 찾아 영어 한 낱말로 쓰십시오.\n\n' + SLEEP,
      answer: ['sleep'],
      wrong: [
        { a: 'exam', why: '시험은 글의 도입에서 상황을 보여 주려고 꺼낸 말입니다. 글 전체에 되풀이되는 중심 대상을 찾아보십시오.' },
        { a: 'study', why: '공부는 잠이 돕는 대상입니다. 글이 무엇에 관해 말하는지, 곧 무엇이 공부를 돕는지 찾아보십시오.' },
        { a: 'brain', why: '뇌는 잠이 어떻게 기억을 돕는지 설명하는 세부 내용에 나옵니다. 중심 대상은 따로 있습니다.' },
      ],
      explain: '글은 처음부터 끝까지 **sleep**(잠)에 관해 말합니다. 마지막 문장의 A good night\'s rest도 잠을 바꿔 쓴 말입니다. 관점은 "잠은 공부의 일부"입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '다음 글의 마지막 문장을 가장 잘 바꿔 쓴 제목은 무엇입니까?\n\n' + MEAL,
      choices: [
        'Togetherness Matters More Than the Menu',
        'Fancy Dinners Bring Families Together',
        'Screens Matter at the Dinner Table',
        'Busy Families Eat at Different Times',
      ],
      answer: 0,
      why: [
        '',
        '본문 낱말(fancy)을 썼지만, 글은 식사가 화려할 필요가 없다(does not have to be fancy)고 말합니다. 뜻이 반대입니다.',
        '두 낱말(screens, matter)은 본문에 나오지만, 글은 화면이 아니라 함께 있는 것이 중요하다고 말합니다.',
        '도입부에 나온 현상(가족이 따로따로 먹는다)일 뿐, 글쓴이의 결론이 아닙니다.',
      ],
      explain: '마지막 문장(A shared dinner does not have to be fancy; what matters is being there together.)은 "메뉴(화려함)보다 함께 있는 것이 중요하다"는 뜻입니다. 이 뜻을 다른 낱말로 바꿔 쓴 제목은 **Togetherness Matters More Than the Menu**입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '다음 글의 제목으로 가장 알맞은 것은 무엇입니까?\n\n' + NOTES,
      hint: '비유형 선택지는 겉 낱말이 아니라 비유가 가리키는 뜻으로 판단하십시오.',
      choices: [
        'Laptops Make Students Smarter',
        'How to Type Faster in Class',
        'Your Pen: A Tool for Thinking, Not Copying',
        'The Long History of Handwriting',
      ],
      answer: 2,
      why: [
        '글은 빠르게 타자하는 것이 늘 더 나은 것은 아니라고 말합니다. 관점이 반대입니다.',
        '타자를 빨리 치는 방법은 글에 나오지 않습니다. 글은 오히려 빠른 것의 약점을 말합니다.',
        '',
        '손글씨의 역사는 글이 다루지 않는 내용입니다.',
      ],
      explain: '글쓴이는 손으로 쓰면 무엇이 중요한지 고르고 자기 말로 바꾸어야 해서 더 깊이 이해한다고 말합니다. 정답 **Your Pen: A Tool for Thinking, Not Copying**에서는 펜을 "베끼는 도구가 아니라 생각하는 도구"로 빗대어 이 관점을 담았습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '다음 글의 제목으로 가장 알맞은 것은 무엇입니까?\n\n' + FAIL,
      hint: '먼저 글이 결국 무엇을 말하는지 한 문장으로 정리해 보십시오.',
      choices: [
        'Glue That Leaves No Mark',
        'A Failure That Found Its Purpose',
        'Great Inventions in Human History',
        'Why Weak Products Should Be Thrown Away',
      ],
      answer: 1,
      why: [
        '자국을 남기지 않는다는 것은 쓰임새를 찾은 까닭(세부)일 뿐입니다. 너무 좁은 제목입니다.',
        '',
        '인류 역사의 위대한 발명 전체는 글이 다루지 않는 넓은 범위입니다.',
        '글에서는 버리지 않고 쓰임새를 찾았습니다. 관점이 반대입니다.',
      ],
      explain: '글의 요지는 마지막 문장 What looked like a failure became a product …, 곧 "실패작처럼 보이던 것이 쓰임새를 찾아 성공했다"입니다. 글 전체를 덮는 제목은 **A Failure That Found Its Purpose**입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '다음 글의 요지를 바꿔 쓴 제목으로 가장 알맞은 것은 무엇입니까?\n\n' + SIT,
      choices: [
        'Sitting Still Builds Concentration',
        'No Gym, No Health',
        'Office Workers and Students Alike',
        'Short Breaks, Sharper Minds',
      ],
      answer: 3,
      why: [
        '본문 낱말(sitting, concentrate)을 썼지만, 글은 오래 앉아 있지 말고 움직여야 집중이 잘된다고 말합니다. 뜻이 반대입니다.',
        '글은 헬스장이나 특별한 장비가 필요 없다고 말합니다. 뜻이 반대입니다.',
        '본문 첫 문장의 표현을 그대로 옮겼을 뿐, 글쓴이의 관점이 없습니다.',
        '',
      ],
      explain: '본문의 Even a short walk every hour … help you concentrate 부분을 바꿔 쓰면 "짧은 휴식(움직임)이 머리를 더 맑게 한다"가 됩니다. 그 뜻을 담은 제목은 **Short Breaks, Sharper Minds**입니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 1,
      q: '제목 고르기 문제를 푸는 순서대로 놓으십시오.',
      choices: [
        '글 전체에 되풀이되는 핵심 소재 찾기',
        '그 소재에 대한 글쓴이의 관점 찾기',
        '소재와 관점을 묶어 주제를 한 문장으로 정리하기',
        '선택지마다 범위(넓음·좁음)와 관점이 맞는지 따지기',
      ],
      answer: [0, 1, 2, 3],
      explain: '관점은 "소재에 대한" 생각이므로 소재를 먼저 찾습니다. 소재와 관점을 묶어 주제를 정리해 두어야, 선택지를 볼 때 "이 제목을 풀어 말하면 그 주제가 되는가?"를 물을 수 있습니다.',
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 1,
      q: '다음 글에 붙인 제목 후보(Wrong Answers in Class)는 핵심 소재는 담았지만 글쓴이의 관점이 드러나지 않는다.\n\n' + ERR,
      answer: true,
      explain: '글쓴이의 관점은 "말하지 않는 것보다 틀리더라도 짐작해 보는 것이 기억에 도움이 된다"입니다. 이 제목 후보는 틀린 답이라는 소재만 보여 줄 뿐, 그것이 좋은지 나쁜지 알려 주지 않습니다. 예를 들어 Why a Wrong Guess Can Help You Learn처럼 관점을 담아야 합니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '다음 글의 제목으로 가장 알맞은 것은 무엇입니까?\n\n' + MAP,
      hint: 'on the other hand 뒤와 마지막 문장에서 글쓴이의 관점을 찾으십시오.',
      choices: [
        'Technology Changes Our Lives',
        'How to Read Street Names on a Paper Map',
        'Leave the App in Your Pocket Now and Then',
        'Navigation Apps: The Best Way to Travel',
        'Why We Get Lost in Big Cities',
      ],
      answer: 2,
      why: [
        '기술이 삶을 바꾼다는 것은 글이 다루는 범위보다 훨씬 넓습니다.',
        '거리 이름을 살피는 것은 종이 지도를 쓸 때 하는 일의 한 예입니다. 너무 좁은 제목입니다.',
        '',
        '글은 앱이 쓸모 있다고 인정하면서도 가끔은 쓰지 말자고 말합니다. 앱이 최고라는 제목은 관점이 어긋납니다.',
        '대도시에서 길을 잃는 까닭은 글에 나오지 않습니다.',
      ],
      explain: '핵심 소재는 길 찾기 앱(과 종이 지도), 관점은 "앱만 따라가면 길을 기억하지 못하니 가끔은 앱을 넣어 두자"입니다. 정답 **Leave the App in Your Pocket Now and Then**에서는 마지막 문장의 표현(leaving them in our pockets now and then)을 살려 관점을 담았습니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '다음 글의 제목으로 **알맞지 않은** 것은 무엇입니까?\n\n' + LANG,
      hint: '의문형·비유형 제목은 그것이 암시하는 방향을 우리말로 풀어 보십시오.',
      choices: [
        'Too Old for a New Language? Think Again',
        'Why Adults Can Never Master a New Language',
        'Learning Languages as an Adult: Different, Not Impossible',
        'Age Is Not a Locked Door',
      ],
      answer: 1,
      why: [
        '"너무 늦었다고? 다시 생각해 보라"는 뜻으로, 글쓴이의 관점과 같은 방향입니다.',
        '',
        '마지막 문장(Age changes the way we learn …, but it does not close the door.)을 풀어 쓴 알맞은 제목입니다.',
        '나이를 "잠긴 문"에 빗대어 그렇지 않다고 말하는 비유형 제목으로, 글의 결론(it does not close the door)과 같습니다.',
      ],
      explain: '알맞지 않은 제목은 **Why Adults Can Never Master a New Language**입니다. 이 제목은 "어른은 왜 결코 새 언어를 익힐 수 없는가"라는 뜻으로, 어른이 언어를 익히지 못한다는 것을 사실로 전제합니다. 글쓴이는 Yet 뒤에서 어른의 강점을 말하며 그 생각을 반박하므로 관점이 정반대입니다. 의문형 제목은 질문 속에 깔린 전제까지 확인해야 합니다.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 1,
      q: '다음 글의 핵심 소재와 글쓴이의 관점을 담은 제목이 되도록 배열하십시오.\n\n' + BORED,
      choices: ['Boredom:', 'The Quiet Starting Point', 'of', 'New Ideas'],
      answer: [0, 1, 2, 3],
      explain: '**Boredom: The Quiet Starting Point of New Ideas**(지루함: 새로운 생각의 조용한 출발점). 콜론 앞에 핵심 소재(Boredom)를 두고, 뒤에서 관점(지루함이 새로운 생각으로 이어진다)을 비유로 풀어 줍니다. 콜론 제목은 이처럼 "소재: 관점" 짜임이 많습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 제목으로 가장 알맞은 것은 무엇입니까?\n\n' + REPAIR,
      hint: '본문 낱말을 많이 그대로 쓴 선택지일수록 뜻이 같은지 꼼꼼히 확인하십시오.',
      choices: [
        'Throw It Away and Buy a New One',
        'How to Sew Up a Hole in a Jacket',
        'Saving the Planet',
        'Give Your Old Things a Second Life',
      ],
      answer: 3,
      why: [
        '첫 문장의 표현을 그대로 옮겼지만, 그것은 글쓴이가 바꾸자고 말하는 습관입니다. 관점이 반대입니다.',
        '재킷의 구멍을 꿰매는 것은 고칠 수 있는 물건의 한 예입니다. 너무 좁은 제목입니다.',
        '지구 살리기는 글의 범위보다 넓고, 고쳐 쓰기라는 소재도 드러나지 않습니다.',
        '',
      ],
      explain: '글쓴이는 망가진 물건을 버리지 말고 고쳐 쓰면 돈을 아끼고 쓰레기를 줄이며 보람도 있다고 말합니다. 정답 **Give Your Old Things a Second Life**에서는 "고쳐 쓰기"를 "두 번째 삶을 준다"로 바꿔 썼습니다. 본문 낱말은 거의 없지만 뜻이 글 전체와 같습니다.',
    },
  ],

  deeper: [
    {
      title: '신문 기사 제목의 문법',
      body: '영어 신문 기사의 제목(headline)은 짧게 쓰려고 보통 문장과 다른 규칙을 씁니다. 제목 문제를 풀 때나 영어 기사를 읽을 때 알아 두면 도움이 됩니다.\n\n' +
        '- **관사·be동사를 자주 뺍니다**: City Plants 500 Trees (= The city plants 500 trees.)\n' +
        '- **지난 일도 현재형으로 씁니다**: Students Win Science Prize (= Students won a science prize.)\n' +
        '- **to부정사로 앞으로의 일을 나타냅니다**: School to Open New Library (= The school will open a new library.)\n' +
        '- **콜론으로 "소재: 관점"을 나눕니다**: Local Food: Good for You and Your Town\n\n' +
        '그래서 제목은 문법적으로 완전한 문장이 아니어도 됩니다. 제목을 고를 때에는 형식보다 **뜻이 글 전체와 맞는지**를 보십시오.',
    },
    {
      title: '제목을 직접 만들어 보기',
      body: '제목을 고르는 힘은 제목을 **직접 만들어 볼 때** 가장 잘 자랍니다. 짧은 영어 글을 읽은 뒤 다음 순서로 연습해 보십시오.\n\n' +
        '1. 주제를 우리말 한 문장으로 씁니다. (예: 길 찾기 앱만 쓰면 길을 기억하지 못하니 가끔은 지도를 보자.)\n' +
        '2. 소재와 관점을 영어 낱말로 뽑습니다. (navigation app / remember the way / now and then)\n' +
        '3. 세 가지 꼴로 바꿔 봅니다.\n' +
        '   - 명사구: The Cost of Following the Arrow\n' +
        '   - 의문형: Are Apps Making Us Forget the Way?\n' +
        '   - 명령문: Put Down the App Sometimes\n\n' +
        '만든 제목을 친구의 제목과 견주어 보고, 너무 넓거나 좁지 않은지 서로 확인하면 시험의 선택지를 보는 눈이 길러집니다.',
    },
  ],

  faq: [
    {
      q: '주제 문제랑 제목 문제는 푸는 법이 달라요?',
      a: '찾아야 할 내용은 같습니다. 둘 다 "글이 결국 무엇을 말하는가"를 먼저 정리합니다. 차이는 선택지의 모양입니다. 주제 선택지는 the importance of …처럼 설명적인 구인 반면, 제목 선택지는 의문문·비유·콜론을 쓴 짧고 함축적인 표현이라 뜻을 한 번 풀어 보아야 합니다.',
    },
    {
      q: '본문에 나온 낱말이 많은 선택지를 고르면 안 되나요?',
      a: '그것만으로는 정답의 근거가 되지 않습니다. 오답은 본문 낱말을 그대로 쓰면서 세부 하나만 담거나 뜻을 뒤집는 경우가 많습니다. 반대로 정답은 본문 표현을 바꿔 쓴 경우가 많습니다. 낱말이 아니라 뜻이 글 전체와 같은지 보십시오.',
    },
    {
      q: '의문형 제목은 어떻게 판단해요?',
      a: '두 가지를 확인합니다. 첫째, 글이 그 질문에 답하는 글인지 봅니다. 둘째, 질문이 암시하는 답의 방향과 전제가 글쓴이의 관점과 같은지 봅니다. 예를 들어 Too Old to Learn a Language?에는 "아니다"라는 답이 숨어 있지만, Why Can\'t Adults Learn Languages?에는 "어른은 배울 수 없다"는 전제가 깔려 있습니다.',
    },
  ],

  mistakes: [
    '본문 낱말이 많이 겹치는 선택지를 정답으로 고르는 실수 — 뜻이 같은지, 세부 하나만 담거나 뜻을 뒤집지 않았는지 확인합니다.',
    '비유형 제목을 겉 낱말만 보고 "글과 관계없다"고 지우는 실수 — 비유가 가리키는 뜻을 우리말로 풀어 본 뒤 판단합니다.',
    '글의 한 예시만 담은 제목을 고르는 실수 — 글의 모든 문단과 예시가 그 제목 아래에 들어가는지 확인합니다.',
  ],

  gens: [
    {
      id: 'title-kind',
      level: 2,
      title: '제목 선택지의 유형 판단하기',
      make: function (R) {
        var LABELS = ['알맞은 제목', '너무 넓은 제목', '너무 좁은 제목', '관점이 어긋난 제목'];
        var MSG = [
          '알맞은 제목은 소재와 관점이 모두 맞고 글 전체를 덮어야 합니다.',
          '너무 넓은 제목은 글이 다루지 않는 범위까지 포함합니다.',
          '너무 좁은 제목은 글의 한 예시나 세부만 담습니다.',
          '관점이 어긋난 제목은 소재는 맞지만 글쓴이의 생각과 반대이거나 글에 없는 내용을 말합니다.',
        ];
        // [글의 요지, 제목, 유형(0 알맞음 · 1 넓음 · 2 좁음 · 3 어긋남), 까닭]
        var items = [
          ['시험 전에 밤을 새우는 학생이 많지만, 잠은 배운 것을 기억에 굳혀 주므로 공부의 일부이다.','Sleep: A Secret Partner in Learning', 0, '잠(소재)이 보이지 않게 공부를 돕는다(관점)는 글 전체를 비유로 담았습니다.'],
          ['시험 전에 밤을 새우는 학생이 많지만, 잠은 배운 것을 기억에 굳혀 주므로 공부의 일부이다.','The Human Body and Its Needs', 1, '사람 몸에 필요한 것 전체로 범위가 넓어져 잠과 공부의 관계가 드러나지 않습니다.'],
          ['시험 전에 밤을 새우는 학생이 많지만, 잠은 배운 것을 기억에 굳혀 주므로 공부의 일부이다.','Why Students Stay Up Before Exams', 2, '시험 전에 밤을 새우는 모습은 글의 도입에 나온 상황일 뿐입니다.'],
          ['시험 전에 밤을 새우는 학생이 많지만, 잠은 배운 것을 기억에 굳혀 주므로 공부의 일부이다.','Sleep Less, Learn More', 3, '잠을 줄이라는 뜻이라 글쓴이의 생각과 반대입니다.'],
          ['지역에서 난 먹거리는 운송 연료가 덜 들고, 수확 뒤 빨리 시장에 와서 더 신선하며, 이웃 농부를 돕는다. 그래서 지역 먹거리를 사면 환경·건강·이웃에 두루 이롭다.','Why Buying Local Food Pays Off', 0, '지역 먹거리(소재)를 사는 것이 이득이 된다(관점)는 글 전체를 담았습니다.'],
          ['지역에서 난 먹거리는 운송 연료가 덜 들고, 수확 뒤 빨리 시장에 와서 더 신선하며, 이웃 농부를 돕는다. 그래서 지역 먹거리를 사면 환경·건강·이웃에 두루 이롭다.','Food Around the World', 1, '세계의 음식 전체로 범위가 넓어져 지역 먹거리의 이점이 드러나지 않습니다.'],
          ['지역에서 난 먹거리는 운송 연료가 덜 들고, 수확 뒤 빨리 시장에 와서 더 신선하며, 이웃 농부를 돕는다. 그래서 지역 먹거리를 사면 환경·건강·이웃에 두루 이롭다.','Fresher Food Through Faster Delivery', 2, '신선함은 여러 이점 가운데 하나뿐입니다.'],
          ['지역에서 난 먹거리는 운송 연료가 덜 들고, 수확 뒤 빨리 시장에 와서 더 신선하며, 이웃 농부를 돕는다. 그래서 지역 먹거리를 사면 환경·건강·이웃에 두루 이롭다.','The Hidden Costs of Local Food', 3, '지역 먹거리의 숨은 비용(단점)을 말하는 제목이라 글쓴이의 생각과 반대입니다.'],
          ['도시의 나무는 그늘·먼지 잡기·빗물 흡수로 도시를 살기 좋게 만든다.', 'City Trees: Small Workers with Big Jobs', 0, '도시의 나무(소재)가 여러 큰일을 한다(관점)는 글 전체를 비유로 담았습니다.'],
          ['도시의 나무는 그늘·먼지 잡기·빗물 흡수로 도시를 살기 좋게 만든다.', 'The Beauty of Nature', 1, '자연의 아름다움 전체로 범위가 넓어졌고, 도시의 나무가 하는 일도 드러나지 않습니다.'],
          ['도시의 나무는 그늘·먼지 잡기·빗물 흡수로 도시를 살기 좋게 만든다.', 'How Leaves Catch Dust', 2, '먼지를 잡는 일은 나무가 하는 여러 일 가운데 하나뿐입니다.'],
          ['도시의 나무는 그늘·먼지 잡기·빗물 흡수로 도시를 살기 좋게 만든다.', 'Why Trees Cause Problems in Cities', 3, '나무가 도시에 문제를 일으킨다는 뜻이라 글쓴이의 생각과 반대입니다.'],
          ['한 시간마다 잠깐씩 움직이면 혈액 순환과 집중력에 좋다. 헬스장이나 특별한 장비도 필요 없다.','Move a Little, Focus a Lot', 0, '조금 움직이면(소재) 집중이 잘된다(관점)는 글 전체를 담았습니다.'],
          ['한 시간마다 잠깐씩 움직이면 혈액 순환과 집중력에 좋다. 헬스장이나 특별한 장비도 필요 없다.','Modern Lifestyles and Health', 1, '현대인의 생활 방식과 건강 전체로 범위가 넓어졌습니다.'],
          ['한 시간마다 잠깐씩 움직이면 혈액 순환과 집중력에 좋다. 헬스장이나 특별한 장비도 필요 없다.','Better Blood Flow After a Walk', 2, '혈액 순환은 움직임의 좋은 점 가운데 하나뿐입니다.'],
          ['한 시간마다 잠깐씩 움직이면 혈액 순환과 집중력에 좋다. 헬스장이나 특별한 장비도 필요 없다.','Why You Need a Gym to Stay Healthy', 3, '글은 헬스장이 필요 없다고 말합니다. 생각이 반대입니다.'],
          ['많은 사람이 버스를 기다리거나 설거지를 하다가 좋은 생각을 떠올린다. 이처럼 가끔 지루한 시간은 새로운 생각을 낳으므로 가치가 있다.','Is Boredom Really a Waste of Time?', 0, '"정말 시간 낭비일까? 아니다"라는 방향을 암시해 글쓴이의 관점과 같습니다.'],
          ['많은 사람이 버스를 기다리거나 설거지를 하다가 좋은 생각을 떠올린다. 이처럼 가끔 지루한 시간은 새로운 생각을 낳으므로 가치가 있다.','Human Emotions', 1, '사람의 감정 전체로 범위가 넓어져 지루함의 가치가 드러나지 않습니다.'],
          ['많은 사람이 버스를 기다리거나 설거지를 하다가 좋은 생각을 떠올린다. 이처럼 가끔 지루한 시간은 새로운 생각을 낳으므로 가치가 있다.','Ideas That Came While Washing Dishes', 2, '설거지하다 떠오른 생각은 글에 나온 예 하나뿐입니다.'],
          ['많은 사람이 버스를 기다리거나 설거지를 하다가 좋은 생각을 떠올린다. 이처럼 가끔 지루한 시간은 새로운 생각을 낳으므로 가치가 있다.','How to Never Feel Bored Again', 3, '지루함을 아예 없애는 방법을 말하는 제목이라 글쓴이의 생각과 반대입니다.'],
          ['가족이 함께 식사하면 대화가 생겨 아이들이 새 낱말을 배우기도 하고, 서로 가깝게 느낀다. 식사가 화려할 필요는 없다.','More Than Food on the Table', 0, '함께하는 식사가 음식 이상의 것(대화·유대감)을 준다는 글 전체를 함축합니다.'],
          ['가족이 함께 식사하면 대화가 생겨 아이들이 새 낱말을 배우기도 하고, 서로 가깝게 느낀다. 식사가 화려할 필요는 없다.','Eating Habits Around the World', 1, '세계의 식습관 전체로 범위가 넓어졌습니다.'],
          ['가족이 함께 식사하면 대화가 생겨 아이들이 새 낱말을 배우기도 하고, 서로 가깝게 느낀다. 식사가 화려할 필요는 없다.','Learning New Words at Dinner', 2, '저녁 식사 중 새 낱말을 배우는 것은 여러 좋은 점 가운데 하나뿐입니다.'],
          ['가족이 함께 식사하면 대화가 생겨 아이들이 새 낱말을 배우기도 하고, 서로 가깝게 느낀다. 식사가 화려할 필요는 없다.','Why Family Meals Must Be Fancy', 3, '글은 식사가 화려할 필요가 없다고 말합니다. 생각이 반대입니다.'],
        ];
        var it = R.pick(items);
        var k = it[2];
        return {
          type: 'choice', fixed: true, concept: (k === 1 || k === 2) ? 3 : 1,
          q: '어떤 글의 내용을 정리하면 다음과 같습니다.\n\n> ' + it[0] + '\n\n이 글의 제목 후보로 다음 표현이 나왔습니다. 이 후보는 어떤 선택지입니까?\n\n**' + it[1] + '**',
          choices: LABELS.slice(),
          answer: k,
          why: LABELS.map(function (l, i) { return i === k ? '' : MSG[i] + ' 이 제목은 ' + LABELS[k] + '입니다. ' + it[3]; }),
          explain: '**' + LABELS[k] + '**입니다. ' + it[3],
        };
      },
    },
  ],

  vocab: [
    { w: 'title', m: '제목', ex: 'Choose a short title for your essay.', exm: '여러분의 글에 짧은 제목을 고르십시오.' },
    { w: 'main idea', m: '요지, 중심 생각', ex: 'The main idea often appears in the last sentence.', exm: '요지는 마지막 문장에 자주 나타납니다.' },
    { w: 'viewpoint', m: '관점, 견해', ex: 'The writer\'s viewpoint becomes clear after "however."', exm: '글쓴이의 관점은 however 뒤에서 분명해집니다.' },
    { w: 'paraphrase', m: '(다른 말로) 바꿔 말하다', ex: 'Try to paraphrase the sentence in your own words.', exm: '그 문장을 여러분 자신의 말로 바꿔 말해 보십시오.' },
    { w: 'benefit', m: '이점, 이익', ex: 'Regular exercise has many benefits.', exm: '규칙적인 운동에는 많은 이점이 있습니다.' },
    { w: 'transport', m: '운반하다, 수송하다', ex: 'Trucks transport vegetables to the market every morning.', exm: '트럭이 매일 아침 채소를 시장으로 실어 나릅니다.' },
    { w: 'harvest', m: '수확; 수확하다', ex: 'Farmers harvest rice in the fall.', exm: '농부들은 가을에 벼를 수확합니다.' },
    { w: 'avoid', m: '피하다', ex: 'Try to avoid eating late at night.', exm: '밤늦게 먹는 것을 피하도록 하십시오.' },
    { w: 'wander', m: '(생각이) 떠돌다; 거닐다', ex: 'My mind began to wander during the long speech.', exm: '긴 연설 동안 내 생각은 이리저리 떠돌기 시작했습니다.' },
    { w: 'concentrate', m: '집중하다', ex: 'It is hard to concentrate in a noisy room.', exm: '시끄러운 방에서는 집중하기 어렵습니다.' },
    { w: 'equipment', m: '장비, 기구', ex: 'You do not need special equipment to go jogging.', exm: '조깅을 하는 데 특별한 장비는 필요 없습니다.' },
    { w: 'embarrassed', m: '당황한, 창피한', ex: 'Minsu felt embarrassed when he called his teacher by the wrong name.', exm: '민수는 선생님 이름을 잘못 불렀을 때 당황했습니다.' },
    { w: 'disappointing', m: '실망스러운', ex: 'The ending of the story was disappointing.', exm: '그 이야기의 결말은 실망스러웠습니다.' },
    { w: 'connected', m: '연결된; 유대감을 느끼는', ex: 'Writing letters helps Jia feel connected to her grandparents.', exm: '편지를 쓰면 지아는 조부모님과 가깝게 이어져 있다고 느낍니다.' },
    { w: 'strength', m: '강점, 힘', ex: 'Patience is one of her greatest strengths.', exm: '인내심은 그녀의 가장 큰 강점 가운데 하나입니다.' },
    { w: 'landmark', m: '(길을 찾는 데 기준이 되는) 눈에 띄는 건물이나 장소', ex: 'The old clock tower is a famous landmark in our town.', exm: '그 오래된 시계탑은 우리 마을의 유명한 랜드마크입니다.' },
  ],
});
})();
