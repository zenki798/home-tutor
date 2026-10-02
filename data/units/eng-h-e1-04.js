/* 영어Ⅰ · 순서 배열과 문장 삽입
 * 지문·예문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 순서 배열 지문 (직접 쓴 글) — 정답: (B)-(A)-(C)
  var GARDEN = 'Jia\'s class decided to grow vegetables in a small garden behind the school.\n\n' +
    '(A) The students then divided the work. Some watered the plants every morning, while others pulled out weeds.\n\n' +
    '(B) First, they needed to choose what to plant. After a long discussion, they picked lettuce and tomatoes because both grow well in spring.\n\n' +
    '(C) Thanks to this teamwork, the garden was full of fresh vegetables by early summer, and the class shared them at lunch.';
  // 정답: (A)-(C)-(B)
  var NOTEBOOK = 'One afternoon, Minsu found a small notebook on a bench in the park.\n\n' +
    '(A) Inside the notebook, he saw a name and a phone number written on the first page.\n\n' +
    '(B) The owner, an elderly woman, was very grateful. She said the notebook was full of recipes from her mother.\n\n' +
    '(C) He called the number, and about twenty minutes later, a woman came running toward the bench.';
  // 정답: (C)-(A)-(B)
  var BEES = 'Honeybees share information with each other in an interesting way.\n\n' +
    '(A) This movement is called the waggle dance. The angle of the dance shows the direction of the food, and its length shows how far away the food is.\n\n' +
    '(B) By following it closely, the other bees learn where to fly to find the food.\n\n' +
    '(C) When a bee finds a good source of food, it returns to the hive and moves in a special pattern.';
  // 정답: (C)-(B)-(A)
  var MULTI = 'Many people think that working on several tasks at once saves time.\n\n' +
    '(A) As a result, finishing one task before starting another is often the faster choice.\n\n' +
    '(B) For example, if you write a report while checking messages, each switch between the two makes your brain refocus.\n\n' +
    '(C) However, studies suggest that switching between tasks can actually slow us down and lead to more mistakes.';
  // 정답: (A)-(B)-(C)
  var PAPER = 'Recycling paper is one simple way to protect forests.\n\n' +
    '(A) Used paper can be broken down into tiny fibers and made into new paper.\n\n' +
    '(B) Because these recycled fibers can replace wood, fewer trees need to be cut down.\n\n' +
    '(C) Saving trees in this way is not the only benefit, however. Recycling paper also uses less water and energy than making paper from fresh wood.';
  // 정답: (A)-(C)-(B) (심화)
  var NEWSTUDENT = 'When a new student joined Hayun\'s class in the middle of the year, he seemed very lonely.\n\n' +
    '(A) Hayun noticed this and invited him to sit with her friends at lunch. At first, he answered their questions with only a word or two.\n\n' +
    '(B) By the end of the month, he was laughing with everyone, and he even helped Hayun with her math homework.\n\n' +
    '(C) Little by little, however, he began to talk more, especially when the conversation turned to soccer, his favorite sport.';

  // 문장 삽입 지문 (직접 쓴 글)
  var BIKE_S = 'However, the trip was not as easy as they had expected.';
  var BIKE = 'Seojun and his father planned a bike trip along the river. ( ① ) They checked the weather forecast the day before. ( ② ) They also packed water, snacks, and a small repair kit. ( ③ ) Halfway through the ride, a strong wind began to blow against them, and Seojun\'s legs grew tired. ( ④ ) They stopped often to rest and finally reached the end of the path just before sunset. ( ⑤ )';
  var MICRO_S = 'These tiny pieces are called microplastics.';
  var MICRO = '( ① ) Plastic does not simply disappear when it is thrown away. ( ② ) Instead, sunlight and waves slowly break it into smaller and smaller pieces. ( ③ ) This process can take many years, and in the end, some pieces become smaller than a grain of sand. ( ④ ) Scientists have found them in seawater, in beach sand, and even inside fish. ( ⑤ ) Because of this, many people are trying to use less plastic in their daily lives.';
  var LAMP_S = 'The lamp was so bright that it could be seen from far out at sea.';
  var LAMP = 'Long ago, ships often crashed into rocks near the coast at night. ( ① ) To solve this problem, people built a tall tower with a powerful lamp at the top. ( ② ) Sailors who saw its light knew that they were close to land and steered away from the rocks. ( ③ ) Today, such towers are called lighthouses. ( ④ ) Many of them now work automatically, without anyone living inside. ( ⑤ )';
  var MUSIC_S = 'This, however, is only half of the story.';
  var MUSIC = 'Many people believe that great musicians are simply born with talent. ( ① ) Indeed, some children seem to pick up instruments almost without trying. ( ② ) They can play a song after hearing it only once or twice. ( ③ ) Studies of skilled musicians show that most of them practiced for many hours over many years. ( ④ ) In other words, steady effort matters at least as much as natural ability. ( ⑤ )';
  var FROG_S = 'She named the frog after the town where it was found.';
  var FROG = 'A group of students went on a field trip to a quiet mountain town. ( ① ) While walking along a stream, one of them spotted a small frog with bright blue spots. ( ② ) No one in the group had ever seen such a frog, so they took photos and sent them to a scientist. ( ③ ) After studying the photos and visiting the stream, she confirmed that it was a new species. ( ④ ) Today, students from the town visit the stream to learn about the frog and its home. ( ⑤ )';

  var NUMS = ['①', '②', '③', '④', '⑤'];

  // 세 문장 순서 생성기: [[문장 세 개(바른 순서)], 단서 설명, 개념 카드]
  var STORIES = [
    [['Jia found a wallet on the subway.', 'The wallet had a student ID card inside, so she could see whose it was.', 'She took it to the station office so that the owner could get it back.'],
      'a wallet → The wallet(같은 지갑을 다시 말함) → it·the owner(지갑과 그 주인)', 3],
    [['A strange sound came from the kitchen late at night.', 'Minsu went to check where the sound was coming from.', 'It turned out to be the refrigerator making a loud noise.'],
      'A strange sound → the sound → It(그 소리)', 3],
    [['Doyun planted a small seed in a pot.', 'A week later, a tiny green leaf appeared from the seed.', 'Now the leaf has grown into a healthy young plant.'],
      'a small seed → the seed, a tiny green leaf → the leaf, 시간 표현 A week later → Now', 3],
    [['Our town opened a new library near the park.', 'The library has a large reading room with big windows.', 'Because of this bright room, many students study there after school.'],
      'a new library → The library, a large reading room → this bright room', 3],
    [['Hayun bought a used bike from her neighbor.', 'The bike had a flat tire, so she took it to a repair shop.', 'After the repair, it ran as smoothly as a new one.'],
      'a used bike → The bike, a repair shop → After the repair', 3],
    [["Seojun's class adopted a rabbit as a class pet.", 'The students took turns feeding it every day.', 'Thanks to their care, it grew healthy and friendly.'],
      'a rabbit → it(토끼), The students → their care(학생들의 보살핌)', 1],
    [['A heavy storm hit the village one night.', 'The storm knocked down several old trees along the road.', 'The next morning, the villagers worked together to clear them away.'],
      'A heavy storm → The storm, several old trees → them, 시간 표현 one night → The next morning', 3],
    [['Minsu wrote a short story for a school contest.', 'The story was about a boy who could talk to birds.', 'The judges liked it so much that it won first prize.'],
      'a short story → The story → it, a school contest → The judges(대회 심사 위원)', 3],
    [["Jia's grandmother gave her an old recipe book.", 'Inside the book were handwritten notes about family dishes.', 'Using these notes, Jia cooked a meal for the whole family.'],
      'an old recipe book → the book, handwritten notes → these notes', 1],
    [['A new student joined our soccer team in spring.', 'The student was shy at first and rarely spoke.', 'However, she soon became one of the most cheerful players on the team.'],
      'A new student → The student → she, 대조 However(수줍던 처음과 반대)', 2],
    [['Doyun saw an old man trying to carry a heavy box.', 'He ran over and offered to help the man.', 'Together, they carried the box up the stairs.'],
      'an old man → the man, a heavy box → the box, He와 the man → they(두 사람)', 1],
    [['Hayun started keeping a diary in English.', 'At first, writing even a few sentences was hard for her.', 'After a few months, however, she could fill a whole page easily.'],
      '시간 표현 At first → After a few months, 대조 however(어렵던 처음과 반대)', 2],
  ];

Tutor.registerUnit({
  id: 'eng-h-e1-04',
  course: 'eng-h-e1',
  title: '순서 배열과 문장 삽입',
  summary: '지시어·연결어·관사 같은 단서로 글의 순서를 정하고, 주어진 문장이 들어갈 자리를 찾습니다.',
  goals: [
    '주어진 글 바로 다음에 올 내용을 찾을 수 있다.',
    '지시어·대명사와 연결어를 단서로 문단의 순서를 정할 수 있다.',
    '부정관사(a)에서 정관사(the)로 이어지는 흐름을 순서의 단서로 쓸 수 있다.',
    '흐름이 끊기는 곳을 찾아 주어진 문장이 들어갈 자리를 정할 수 있다.',
  ],
  standards: ['[12영Ⅰ-01-04]', '[12영Ⅰ-01-06]'],

  concepts: [
    {
      title: '주어진 글 다음에 올 내용 찾기',
      body: '순서 배열 문제는 주어진 글 하나와 (A)·(B)·(C) 세 문단으로 이루어집니다. 가장 먼저 할 일은 **주어진 글 바로 다음에 올 문단**을 찾는 것입니다.\n\n' +
        '1. 주어진 글, 특히 **마지막 문장**이 무엇을 예고하는지 봅니다. 문제를 꺼냈다면 해결책이, 계획을 말했다면 첫 단계가, 통념을 말했다면 반박이 이어지기 쉽습니다.\n' +
        '2. (A)·(B)·(C) 각 문단의 **첫 문장**을 봅니다. 첫 문장의 지시어·대명사·연결어·the가 받는 대상이 주어진 글에 있어야 그 문단이 바로 다음에 올 수 있습니다.\n' +
        '3. 첫 문장이 주어진 글에 없는 대상(this movement, the owner …)을 가리키면, 그 문단은 맨 앞에 올 수 없습니다.\n\n' +
        '예: 주어진 글이 "반 학생들이 텃밭을 가꾸기로 했다"이면, First, they needed to choose what to plant.(먼저 무엇을 심을지 정해야 했다)로 시작하는 문단이 바로 다음에 옵니다.\n\n' +
        '> 💡 맨 앞에 올 문단 하나만 정해도 선택지가 많이 줄어듭니다. 나머지 둘은 서로의 연결 고리로 정합니다.',
      easy: '이어달리기를 떠올려 보십시오. 주어진 글이 첫 주자이고, 바통(단서)을 받을 수 있는 다음 주자를 찾아야 합니다.\n\n' +
        '(A)·(B)·(C)의 첫 문장이 "앞 사람이 준 바통"을 손에 쥐고 있는지 보십시오. 아직 나오지도 않은 것을 가리키는 문단은 바통을 받을 수 없으니 첫 주자 바로 뒤에 설 수 없습니다.',
      check: {
        type: 'choice',
        q: '주어진 글 다음에 바로 올 문장으로 가장 알맞은 것은 무엇입니까?\n\n주어진 글: Doyun wanted to bake a cake for his mother\'s birthday.',
        choices: [
          'First, he looked up an easy recipe and made a list of what to buy.',
          'The cake looked a little strange, but his mother loved it.',
          'This made the frosting melt and slide off the sides.',
        ],
        answer: 0,
        why: [
          '',
          'The cake는 이미 만든 케이크를 가리킵니다. 케이크를 만드는 과정보다 앞에 올 수 없습니다.',
          'This가 가리킬 내용(무엇이 크림을 녹게 했는지)이 주어진 글에 없습니다.',
        ],
        explain: '주어진 글은 "케이크를 굽고 싶었다"는 계획입니다. 계획 다음에는 **First**(먼저)로 시작하는 첫 단계가 자연스럽게 이어집니다.',
      },
    },
    {
      title: '지시어·대명사로 순서 정하기',
      body: '**지시어**(this, that, these, those, such)와 **대명사**(he, she, it, they, them, its)는 반드시 **앞에 나온 대상**을 가리킵니다. 그래서 가리키는 대상이 있는 문장이 지시어·대명사가 있는 문장보다 앞에 와야 합니다.\n\n' +
        '| 단서 | 확인할 것 |\n|---|---|\n' +
        '| this / these + 명사 | 바로 앞에서 말한 그 명사나 내용 (this movement → 앞에서 말한 움직임) |\n' +
        '| such + 명사 | 앞에서 설명한 종류의 것 (such towers → 앞에서 말한 그런 탑) |\n' +
        '| he / she / they / it | 수(단수·복수)와 성별이 맞는 앞의 대상 |\n\n' +
        '예: (C) When a bee finds … food, it … moves in a special pattern. → (A) **This movement** is called the waggle dance. → (B) By following **it** closely, the other bees learn …\n\n' +
        '(A)의 This movement는 (C)의 moves in a special pattern을 받고, (B)의 it은 (A)의 the waggle dance를 받습니다. 그래서 (C)-(A)-(B)입니다.',
      easy: '지시어와 대명사는 "앞을 가리키는 손가락"입니다. 손가락이 가리키는 곳에 아무것도 없으면 이상하지요.\n\n' +
        'This movement라는 말이 보이면 "어떤 움직임?" 하고 물어보십시오. 그 움직임을 처음 설명한 문장이 바로 앞에 있어야 합니다.',
      check: {
        type: 'choice',
        q: '두 문장의 자연스러운 순서로 알맞은 것은 무엇입니까?\n\n(가) These problems made the town decide to build a wider bridge.\n(나) The old bridge was too narrow, and there were traffic jams every morning.',
        choices: ['(나) → (가)', '(가) → (나)', '어느 순서든 자연스럽다'],
        answer: 0,
        why: [
          '',
          '(가)의 These problems가 가리킬 문제들이 아직 나오지 않았습니다. 문제를 먼저 말해야 합니다.',
          'These problems는 앞에 나온 문제들을 가리키므로 순서가 정해져 있습니다.',
        ],
        explain: '(가)의 **These problems**(이 문제들)는 (나)의 "다리가 좁다, 아침마다 길이 막힌다"를 가리킵니다. 가리키는 대상이 먼저 나와야 하므로 (나) → (가)입니다.',
      },
    },
    {
      title: '연결어로 순서 정하기',
      body: '문단 첫머리의 **연결어**는 앞 문단이 어떤 내용이어야 하는지 알려 줍니다.\n\n' +
        '| 연결어 | 앞에 와야 할 내용 |\n|---|---|\n' +
        '| However, But | 지금 문단과 **반대**되는 내용 |\n' +
        '| For example, For instance | 예가 필요한 **일반적인 주장** |\n' +
        '| As a result, Therefore, So | 지금 문단의 **원인** |\n' +
        '| In addition, Also, Moreover | 같은 방향의 **다른 내용** 하나 |\n' +
        '| First → Then / Next → Finally | 시간·단계의 순서 |\n\n' +
        '예: 주어진 글 "여러 일을 한꺼번에 하면 시간이 절약된다고 많은 사람이 생각한다" 다음에는 반박인 **(C) However**, studies suggest … 가 옵니다. 그 주장의 예가 **(B) For example** …, 결과를 정리하는 **(A) As a result** …가 차례로 이어져 (C)-(B)-(A)입니다.\n\n' +
        '> ⚠️ 연결어는 앞뒤 문단의 **관계**를 알려 줄 뿐, 그것만으로 순서가 다 정해지지는 않습니다. 지시어·관사 단서와 함께 확인합니다.',
      easy: '연결어는 문단 앞에 붙은 "이름표"입니다. However라는 이름표는 "내 앞에는 반대 이야기가 있어요", For example 이름표는 "내 앞에는 설명이 필요한 주장이 있어요"라는 뜻입니다.\n\n' +
        '이름표를 읽고 그 이름표에 맞는 앞 문단을 찾아 붙이면 됩니다.',
      check: {
        type: 'choice',
        q: 'For example로 시작하는 문단 바로 앞에 오기에 가장 알맞은 내용은 무엇입니까?',
        choices: ['예가 필요한 일반적인 주장', '그 문단과 반대되는 내용', '이야기의 마지막 결과'],
        answer: 0,
        why: [
          '',
          '반대 내용 뒤에는 However, But 같은 대조 연결어가 옵니다.',
          '결과를 말한 뒤에 다시 예를 드는 것은 흐름이 어색합니다. 예는 주장을 뒷받침합니다.',
        ],
        explain: 'For example 뒤의 문장은 앞의 **일반적인 주장**을 구체적인 예로 뒷받침합니다. 그래서 그 앞에는 예가 필요한 주장이 와야 합니다.',
      },
    },
    {
      title: '부정관사 a에서 정관사 the로',
      body: '영어에서는 어떤 것을 **처음 소개할 때 a(an)**, 이미 소개한 그것을 **다시 말할 때 the**를 씁니다. 그래서 같은 명사가 a와 the로 나오면 **a가 있는 문장이 먼저**입니다.\n\n' +
        '- Minsu found **a small notebook** on a bench. → **The notebook** was full of recipes.\n' +
        '- … with **a powerful lamp** at the top. → **The lamp** was so bright …\n\n' +
        'the 뒤의 명사가 처음 나온 것과 낱말이 달라도 같은 대상을 바꿔 부를 수 있습니다. a woman came running → **The owner**(그 주인)처럼 앞에서 소개한 사람을 the로 다시 가리키기도 합니다.\n\n' +
        '> ⚠️ the sun, the sky처럼 세상에 하나뿐인 것이나, 말하는 사람과 듣는 사람이 이미 아는 것에는 처음부터 the를 씁니다. 그래서 the 하나만 보고 판단하지 말고, **같은 대상이 a로 소개된 곳이 있는지** 찾습니다.',
      easy: '새 친구를 소개할 때는 "어떤 친구가 있는데…"라고 말하고, 그다음부터는 "그 친구가…"라고 말하지요. a는 "어떤", the는 "그"입니다.\n\n' +
        '"그 공책"이라는 말이 "어떤 공책"보다 먼저 나오면 듣는 사람은 "무슨 공책?" 하고 묻게 됩니다. 그래서 a가 먼저, the가 나중입니다.',
      check: {
        type: 'ox',
        q: '다음 두 문장은 (나) → (가) 순서로 놓아야 자연스럽다.\n\n(가) The bike had a flat tire.\n(나) Hayun bought a used bike from her neighbor.',
        answer: true,
        explain: '(나)에서 a used bike(중고 자전거 한 대)로 처음 소개하고, (가)에서 **The bike**(그 자전거)로 다시 말합니다. a가 있는 문장이 먼저입니다.',
      },
    },
    {
      title: '흐름이 끊기는 곳에 문장 넣기',
      body: '문장 삽입 문제는 글 속 ①~⑤ 가운데 주어진 문장이 들어갈 곳을 찾는 문제입니다. 원래 글에서 그 문장을 빼냈기 때문에, 들어갈 자리에는 **흐름이 끊기는 흔적**이 남아 있습니다.\n\n' +
        '**1단계: 주어진 문장의 단서를 읽습니다.**\n' +
        '- 지시어·대명사·the: 앞에 무엇이 있어야 하는가? (These tiny pieces → 앞에 아주 작은 조각 이야기)\n' +
        '- 연결어: 앞에 어떤 내용이 있어야 하는가? (However → 앞에 반대 내용)\n\n' +
        '**2단계: 글에서 흐름이 끊기는 곳을 찾습니다.**\n' +
        '- 갑자기 가리킬 대상이 없는 지시어·대명사가 나온다.\n' +
        '- 앞뒤 내용이 갑자기 반대로 바뀌는데 연결어가 없다.\n' +
        '- 앞뒤 사이에 설명 한 단계가 빠진 듯하다.\n\n' +
        '**3단계: 넣어 읽습니다.** 주어진 문장을 넣었을 때 **앞 문장과도, 뒤 문장과도** 이어지는지 확인합니다.\n\n' +
        '> 💡 주어진 문장이 들어갈 자리 바로 **뒤** 문장도 주어진 문장에 기대고 있는 경우가 많습니다. 예를 들어 주어진 문장이 microplastics라는 이름을 알려 주면, 바로 뒤 문장이 them으로 그것을 받습니다.',
      easy: '책장에서 책 한 권을 빼면 그 자리에 틈이 생깁니다. 문장 삽입은 그 틈을 찾는 일입니다.\n\n' +
        '틈 바로 앞뒤에서는 이야기가 "덜컹" 하고 걸립니다. 갑자기 반대 이야기가 나오거나, "그것"이 무엇인지 알 수 없는 곳이 바로 틈입니다.',
      check: {
        type: 'choice',
        q: '주어진 문장이 However로 시작합니다. 이 문장이 들어갈 자리의 앞 문장으로 가장 알맞은 것은 무엇입니까?',
        choices: ['주어진 문장과 반대 방향의 내용을 담은 문장', '주어진 문장과 같은 내용을 되풀이하는 문장', '주어진 문장의 예를 드는 문장'],
        answer: 0,
        why: [
          '',
          'However 앞에는 반대 내용이 와야 합니다. 같은 내용을 되풀이하는 문장 뒤에 However가 오면 어색합니다.',
          '예를 드는 문장은 주장 뒤에 옵니다. However 앞에 있어야 할 것은 반대 내용입니다.',
        ],
        explain: 'However(그러나)는 앞 내용과 반대되는 말을 이끕니다. 그래서 주어진 문장이 들어갈 자리의 앞에는 **반대 방향의 내용**이 있어야 합니다.',
      },
    },
  ],

  examples: [
    {
      q: '주어진 글 다음에 이어질 글의 순서로 가장 알맞은 것을 고르십시오.\n\n' + GARDEN,
      steps: [
        '주어진 글: 반 학생들이 학교 뒤 작은 텃밭에서 채소를 기르기로 했다(계획).',
        '(B)는 First(먼저)로 시작하여 무엇을 심을지 정하는 첫 단계를 말합니다. 계획 바로 다음에 올 수 있습니다.',
        '(A)는 then(그다음에)으로 일을 나누는 다음 단계를 말합니다. 무엇을 심을지 정한 (B) 뒤에 옵니다.',
        '(C)의 this teamwork(이 협동)는 (A)에서 일을 나누어 물을 주고 잡초를 뽑은 것을 가리킵니다. 그래서 (A) 뒤에 옵니다.',
        '순서: (B) → (A) → (C). 이어 읽으면 계획 → 첫 단계 → 다음 단계 → 결과로 자연스럽습니다.',
      ],
      answer: '(B) - (A) - (C)',
    },
    {
      q: '글의 흐름으로 보아 주어진 문장이 들어가기에 가장 알맞은 곳을 고르십시오.\n\n주어진 문장: ' + LAMP_S + '\n\n' + LAMP,
      steps: [
        '주어진 문장의 단서: **The lamp**(그 등)이므로 앞에 a … lamp로 등이 처음 소개되어 있어야 합니다.',
        '등이 처음 나오는 곳은 둘째 문장의 a powerful lamp at the top입니다. 그래서 ② 이후가 후보입니다.',
        '②에 넣으면: 탑 꼭대기에 강한 등을 달았다 → 그 등은 바다 멀리서도 보일 만큼 밝았다 → 그 빛(its light)을 본 선원들은 육지가 가까운 것을 알았다. 원인과 결과가 자연스럽게 이어집니다.',
        '③ 이후에 넣으면 선원들이 이미 빛을 보고 바위를 피한 다음에 등이 밝았다는 설명이 나와 순서가 거꾸로 됩니다.',
      ],
      answer: '②',
    },
  ],

  terms: [
    { term: '순서 배열', def: '주어진 글 다음에 (A)·(B)·(C) 문단을 알맞은 순서로 놓는 독해 유형입니다. 지시어·연결어·관사가 주요 단서입니다.' },
    { term: '문장 삽입', def: '글의 ①~⑤ 가운데 주어진 문장이 들어갈 자리를 찾는 독해 유형입니다. 흐름이 끊기는 곳이 답의 자리입니다.' },
    { term: '지시어', def: '앞에 나온 대상이나 내용을 가리키는 말입니다. 예: this, that, these, those, such' },
    { term: '대명사', def: '앞에 나온 명사를 대신하는 말입니다. 예: he, she, it, they, them, its' },
    { term: '연결어', def: '앞뒤 문장·문단의 관계를 알려 주는 말입니다. 예: However(대조), For example(예시), As a result(결과), In addition(첨가)' },
    { term: '부정관사', def: 'a, an. 어떤 것을 처음 소개할 때 씁니다. 예: a small notebook(작은 공책 한 권)' },
    { term: '정관사', def: 'the. 이미 소개했거나 서로 알고 있는 것을 가리킬 때 씁니다. 예: the notebook(그 공책)' },
    { term: '논리적 단절', def: '글의 흐름이 갑자기 끊기는 곳입니다. 가리킬 대상이 없는 지시어, 연결어 없는 갑작스러운 전환 등으로 드러납니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', fixed: true, concept: 3,
      q: '주어진 글 다음에 이어질 글의 순서로 가장 알맞은 것은 무엇입니까?\n\n' + NOTEBOOK,
      choices: ['(A)-(C)-(B)', '(B)-(A)-(C)', '(B)-(C)-(A)', '(C)-(A)-(B)', '(C)-(B)-(A)'],
      answer: 0,
      why: [
        '',
        '(B)의 The owner(그 주인)와 the notebook이 가리킬 사람이 아직 나오지 않았습니다. 주인은 (C)에서 달려온 여자입니다.',
        '(B)가 맨 앞에 올 수 없습니다. The owner가 누구인지 알 수 없습니다.',
        '(C)의 the number(그 번호)는 (A)의 a phone number를 받습니다. (A)보다 앞에 올 수 없습니다.',
        '(C)의 the number가 가리킬 전화번호가 아직 나오지 않았습니다.',
      ],
      explain: '주어진 글의 a small notebook → (A) **the notebook** 안에서 a phone number를 발견 → (C) **the number**로 전화하자 a woman이 달려옴 → (B) **The owner**(그 여자)가 고마워함. a로 처음 소개한 것을 the로 다시 받는 흐름을 따라가면 (A)-(C)-(B)입니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 3,
      q: 'the가 붙은 명사가 있는 문장은 언제나, 같은 명사에 a가 붙은 문장보다 뒤에 와야 한다.',
      answer: false,
      explain: 'the sun, the sky처럼 세상에 하나뿐인 것이나 서로 이미 아는 것에는 처음부터 the를 씁니다. a → the 단서는 **같은 대상이 a로 소개된 문장이 있을 때** 그 문장을 앞에 두라는 뜻입니다. the 하나만 보고 판단하지 않습니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', fixed: true, concept: 1,
      q: '주어진 글 다음에 이어질 글의 순서로 가장 알맞은 것은 무엇입니까?\n\n' + BEES,
      choices: ['(A)-(C)-(B)', '(B)-(A)-(C)', '(B)-(C)-(A)', '(C)-(A)-(B)', '(C)-(B)-(A)'],
      answer: 3,
      why: [
        '(A)의 This movement(이 움직임)가 가리킬 움직임이 아직 나오지 않았습니다.',
        '(B)의 it이 가리킬 대상(춤)이 아직 나오지 않았습니다.',
        '(B)가 맨 앞에 올 수 없습니다. 무엇을 따라간다는 것인지 알 수 없습니다.',
        '',
        '(B)의 it은 the waggle dance를 받습니다. 춤의 이름을 알려 주는 (A)가 (B)보다 앞에 와야 합니다.',
      ],
      explain: '(C) 벌이 특별한 모양으로 **움직인다** → (A) **This movement**는 the waggle dance라고 불린다 → (B) **it**(그 춤)을 가까이 따라가며 다른 벌들이 먹이가 있는 곳을 안다. 지시어·대명사가 가리키는 대상을 따라가면 (C)-(A)-(B)입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', fixed: true, concept: 2,
      q: '주어진 글 다음에 이어질 글의 순서로 가장 알맞은 것은 무엇입니까?\n\n' + MULTI,
      choices: ['(A)-(C)-(B)', '(B)-(A)-(C)', '(B)-(C)-(A)', '(C)-(A)-(B)', '(C)-(B)-(A)'],
      answer: 4,
      why: [
        'As a result(그 결과)가 맨 앞에 오면 무엇의 결과인지 알 수 없습니다. 주어진 글은 통념일 뿐입니다.',
        'For example 문장은 예가 필요한 주장 뒤에 옵니다. 주어진 글(시간이 절약된다는 통념)의 예로 보면 (B)의 내용(뇌가 다시 집중해야 한다)과 맞지 않습니다.',
        '(B)가 맨 앞에 올 수 없습니다. (B)의 예는 (C)의 주장(전환이 느리게 만든다)을 뒷받침합니다.',
        '(A)의 결론(하나씩 끝내는 편이 빠르다)은 (B)의 예까지 본 뒤에 나와야 자연스럽습니다.',
        '',
      ],
      explain: '주어진 글은 통념(한꺼번에 하면 시간이 절약된다)입니다. (C) **However**로 반박 → (B) **For example**로 그 반박의 예 → (A) **As a result**로 결론. 연결어가 알려 주는 관계를 따라가면 (C)-(B)-(A)입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', fixed: true, concept: 4,
      q: '글의 흐름으로 보아 주어진 문장이 들어가기에 가장 알맞은 곳은 어디입니까?\n\n주어진 문장: ' + BIKE_S + '\n\n' + BIKE,
      choices: NUMS.slice(),
      answer: 2,
      why: [
        '아직 여행 준비도 시작하지 않았습니다. 무엇이 쉽지 않았다는 것인지 이어지지 않습니다.',
        '날씨를 확인한 다음 짐을 챙기는 준비 과정이 이어지는 중입니다. 사이에 끼우면 준비의 흐름이 끊깁니다.',
        '',
        '이미 바람과 다리의 피로라는 어려움이 나온 뒤입니다. However로 반대 방향을 알릴 자리가 아닙니다.',
        '여행이 끝난 뒤에 "쉽지 않았다"를 However로 붙이면 앞 문장(마침내 도착했다)과 관계가 어색합니다.',
      ],
      explain: '①~② 뒤는 꼼꼼한 준비 과정이고, ③ 뒤부터 바람과 피로 같은 어려움이 나옵니다. 그 사이에서 내용이 반대로 바뀌므로 **However**로 시작하는 주어진 문장은 ③에 들어갑니다. 넣어 읽으면 "준비를 잘했다 → 그러나 생각만큼 쉽지 않았다 → 맞바람이 불었다"로 이어집니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 3,
      q: '다음 글의 (B)에서 The owner가 가리키는 사람을 (C)에서 찾아 영어로 쓰십시오.\n\n' + NOTEBOOK,
      answer: ['a woman', 'woman', 'the woman'],
      wrong: [
        { a: 'Minsu', why: '민수는 공책을 주운 사람입니다. 주인은 전화를 받고 벤치로 달려온 사람입니다.' },
        { a: 'an elderly woman', why: '(B)에 나온 말을 그대로 옮겼습니다. 문제는 (C)에서 찾으라고 했습니다. (C)에서 처음 소개된 사람을 찾아보십시오.' },
      ],
      explain: '(C)에서 **a woman**이 벤치로 달려왔고, (B)에서 그 사람을 **The owner**(그 주인)라고 다시 부릅니다. a로 소개한 사람을 the로 다시 가리키는 흐름입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 2,
      q: '다음 문장 바로 앞에 오기에 가장 알맞은 문장은 무엇입니까?\n\nIn addition, it helps you sleep better at night.',
      choices: [
        'However, many people find it hard to exercise every day.',
        'Regular exercise makes your heart stronger.',
        'For example, you can walk to school instead of taking the bus.',
        'As a result, you may feel very tired in the evening.',
      ],
      answer: 1,
      why: [
        'In addition은 같은 방향의 내용을 하나 더 덧붙입니다. 운동하기 어렵다는 부정적인 말 뒤에 좋은 점을 "덧붙이면" 어색합니다.',
        '',
        '걸어서 등교하는 예 뒤에 In addition, it …이 오면 it이 무엇인지 분명하지 않습니다.',
        '저녁에 피곤하다는 말 뒤에 "게다가 잠을 잘 자게 돕는다"를 덧붙이면 흐름이 어색합니다.',
      ],
      explain: 'In addition(게다가)은 앞과 **같은 방향**의 내용을 덧붙이고, it은 앞의 단수 대상을 가리킵니다. "규칙적인 운동은 심장을 튼튼하게 한다 → 게다가 그것(운동)은 밤에 잠을 잘 자게 돕는다"가 자연스럽습니다.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 0,
      q: '순서 배열 문제에서, 첫 문장이 주어진 글에 나오지 않은 대상을 This movement처럼 가리키는 문단은 주어진 글 바로 다음에 올 수 없다.',
      answer: true,
      explain: '지시어는 앞에 나온 대상을 가리킵니다. 주어진 글에 그 대상이 없다면, 그 대상을 먼저 소개하는 다른 문단이 사이에 있어야 합니다. 그래서 그 문단은 맨 앞에 올 수 없습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', fixed: true, concept: 4,
      q: '글의 흐름으로 보아 주어진 문장이 들어가기에 가장 알맞은 곳은 어디입니까?\n\n주어진 문장: ' + MICRO_S + '\n\n' + MICRO,
      hint: 'These tiny pieces가 가리킬 대상이 어디에 처음 나오는지, 또 넣은 자리 바로 뒤 문장이 주어진 문장과 이어지는지 보십시오.',
      choices: NUMS.slice(),
      answer: 3,
      why: [
        '글의 맨 앞에서는 These tiny pieces가 가리킬 대상이 없습니다.',
        '아직 플라스틱이 조각으로 부서진다는 이야기가 나오지 않았습니다.',
        '이 자리에 넣으면 바로 뒤 This process(이 과정)가 "작은 조각에 이름을 붙이는 일"을 가리키게 되어 어색합니다. This process는 부서지는 과정을 받아야 합니다.',
        '',
        '이 자리에 넣으면 뒤 문장 Because of this가 "이름이 microplastics라는 것"을 가리키게 되어 어색합니다.',
      ],
      explain: '③ 뒤 문장에서 "모래알보다 작은 조각"이 나오므로, 그 뒤 ④에서 **These tiny pieces**(이 아주 작은 조각들)에 microplastics라는 이름을 붙이는 것이 자연스럽습니다. 넣은 뒤 다음 문장의 them(그것들을 바닷물·모래·물고기 속에서 발견했다)도 microplastics를 받아 흐름이 이어집니다.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 3,
      q: '자연스러운 글이 되도록 문장을 순서대로 놓으십시오.',
      hint: 'a로 처음 소개한 것이 무엇인지 찾고, 그것을 the나 it으로 다시 받는 문장을 이어 붙이십시오.',
      choices: [
        'Doyun adopted a puppy from an animal shelter.',
        'The puppy was afraid of people at first and hid under the bed.',
        'To help it feel safe, Doyun sat near the bed every day and spoke softly.',
        'After a few weeks, it finally came out and began to follow him around the house.',
      ],
      answer: [0, 1, 2, 3],
      explain: 'a puppy(강아지 한 마리)로 처음 소개 → **The puppy**가 처음에 사람을 무서워해 숨음 → 그것(it)이 안심하도록 도윤이가 곁에 있어 줌 → **After a few weeks** 마침내 나와서 따라다님. a → the, 대명사, 시간 표현(at first → After a few weeks)이 순서를 알려 줍니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', fixed: true, concept: 1,
      q: '주어진 글 다음에 이어질 글의 순서로 가장 알맞은 것은 무엇입니까?\n\n' + PAPER,
      hint: '(B)의 these recycled fibers와 (C)의 Saving trees in this way가 각각 무엇을 받는지 찾으십시오.',
      choices: ['(A)-(B)-(C)', '(A)-(C)-(B)', '(B)-(A)-(C)', '(C)-(A)-(B)', '(C)-(B)-(A)'],
      answer: 0,
      why: [
        '',
        '(C)의 Saving trees in this way(이런 방식으로 나무를 아끼는 것)는 재활용 섬유가 나무를 대신한다는 (B)를 받으므로 (B) 다음에 와야 합니다.',
        '(B)의 these recycled fibers(이 재활용 섬유)가 가리킬 섬유가 아직 나오지 않았습니다. 섬유 이야기는 (A)에 처음 나옵니다.',
        '(C)의 in this way(이런 방식으로)가 가리킬 방식, 곧 재활용 섬유가 나무를 대신하는 과정이 아직 나오지 않았습니다. 숲을 어떻게 지키는지 설명하기도 전에 "그것만이 이점은 아니다"라고 넘어가 버립니다.',
        '(B)의 these recycled fibers가 (A)보다 앞에 올 수 없습니다.',
      ],
      explain: '(A) 헌 종이를 작은 **섬유(fibers)**로 풀어 새 종이를 만든다 → (B) **these recycled fibers**가 나무를 대신해 베는 나무가 줄어든다 → (C) **in this way**(이런 방식으로) 나무를 아끼는 것만이 이점은 아니고(however) 물과 에너지도 덜 든다. 지시어와 연결어를 따라가면 (A)-(B)-(C)입니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'text', concept: 1,
      q: '다음 글의 (B)에서 it이 가리키는 것을 본문에서 찾아 영어 세 낱말로 쓰십시오.\n\n' + BEES,
      hint: '(B) 앞에 올 문단에서 다른 벌들이 "따라갈" 수 있는 것을 찾으십시오.',
      answer: ['the waggle dance'],
      wrong: [
        { a: 'the food', why: '먹이는 다른 벌들이 찾아가는 곳이지, 가까이 따라가며 보는 대상이 아닙니다.' },
        { a: 'a special pattern', why: '(C)에서 벌이 움직이는 모양을 말한 표현입니다. 순서상 (B) 바로 앞에는 (A)가 오고, (A)에서 이 움직임을 the waggle dance라는 이름으로 다시 부릅니다. 다른 벌들이 따라가는 it은 그 춤입니다.' },
      ],
      explain: '순서는 (C)-(A)-(B)이고, (B) 바로 앞 (A)에서 This movement is called **the waggle dance**라고 했습니다. 다른 벌들이 가까이 따라가는 it은 그 춤, 곧 **the waggle dance**입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', fixed: true, concept: 4,
      q: '글의 흐름으로 보아 주어진 문장이 들어가기에 가장 알맞은 곳은 어디입니까?\n\n주어진 문장: ' + MUSIC_S + '\n\n' + MUSIC,
      hint: 'This가 가리킬 내용과, however로 방향이 바뀌는 곳을 함께 찾으십시오. Indeed는 앞 내용을 강조하며 이어 줍니다.',
      choices: NUMS.slice(),
      answer: 2,
      why: [
        '여기에 넣으면 바로 뒤 Indeed(실제로)가 "이야기의 절반일 뿐"을 강조하게 되어, 재능을 보여 주는 예와 어긋납니다.',
        '여기에 넣으면 뒤 문장의 They가 가리킬 대상(아이들)과 멀어지고, 재능의 예가 반박 뒤에 다시 나와 흐름이 어색합니다.',
        '',
        '연습에 관한 연구가 이미 나온 뒤입니다. 반박을 여는 문장은 연구 이야기 앞에 와야 합니다.',
        '글이 결론(꾸준한 노력이 재능만큼 중요하다)으로 끝난 뒤라 This가 가리킬 대상이 어색합니다.',
      ],
      explain: '①~③ 앞은 "음악가는 재능을 타고난다"는 통념과 그것을 뒷받침하는 예(Indeed …, They can …)입니다. ③ 뒤부터는 연습 시간에 관한 연구로 방향이 바뀝니다. 그 경계인 ③에 **This, however, is only half of the story.**(그러나 이것은 이야기의 절반일 뿐이다)가 들어가 통념(This)을 받고 반박을 엽니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 0,
      q: '주어진 글 다음에 이어질 글의 순서로 가장 알맞은 것은 무엇입니까?\n\n' + NEWSTUDENT,
      hint: '(A)의 this, (C)의 however, (B)의 By the end of the month가 각각 무엇과 이어지는지 보십시오.',
      choices: ['(A)-(C)-(B)', '(B)-(A)-(C)', '(B)-(C)-(A)', '(C)-(A)-(B)', '(C)-(B)-(A)'],
      answer: 0,
      why: [
        '',
        '(B)가 맨 앞에 오면 외로워 보이던 학생이 갑자기 모두와 웃고 있게 되어 변화 과정이 빠집니다.',
        '(B)의 결과(한 달 뒤 모두와 웃음)가 변화의 시작인 (C)보다 앞에 올 수 없습니다.',
        '(C)의 however는 "처음에는 한두 마디만 대답했다"는 (A)의 내용과 반대 방향을 이어야 합니다. (A)보다 앞에 오면 무엇과 반대인지 알 수 없습니다.',
        '(C)가 맨 앞에 올 수 없고, (B)의 결과가 (A)의 시작보다 앞설 수도 없습니다.',
      ],
      explain: '주어진 글(새 학생이 외로워 보였다) → (A) 하윤이가 **this**(그가 외로워 보이는 것)를 알아채고 점심에 초대, 처음에는 짧게만 대답 → (C) **however**, 조금씩 말이 많아짐 → (B) **By the end of the month**, 모두와 웃게 됨. 지시어·대조 연결어·시간 표현이 함께 (A)-(C)-(B)를 가리킵니다.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 2,
      q: '자연스러운 글이 되도록 문장을 순서대로 놓으십시오.',
      hint: '대명사 He, 연결어 instead, the album 같은 단서를 이어 보십시오.',
      choices: [
        'Seojun wanted to give his grandmother something special for her seventieth birthday.',
        'He did not have much money, so he decided to make a gift instead of buying one.',
        'After thinking for a while, he chose to make a photo album of their family trips.',
        'It took him two weeks to collect the pictures and write a short message under each one.',
        'When his grandmother opened the album, she smiled and said it was the best present she had ever received.',
      ],
      answer: [0, 1, 2, 3, 4],
      explain: '선물을 주고 싶었다(Seojun 소개) → **He** 돈이 넉넉하지 않아 사는 **대신(instead)** 만들기로 함 → 무엇을 만들지 생각한 끝에 **a photo album**을 고름 → **It took him two weeks**(앨범을 만드는 데 두 주) → **the album**을 열어 본 할머니의 반응. 대명사·연결어·a → the가 모두 같은 순서를 가리킵니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', fixed: true, concept: 3,
      q: '글의 흐름으로 보아 주어진 문장이 들어가기에 가장 알맞은 곳은 어디입니까?\n\n주어진 문장: ' + FROG_S + '\n\n' + FROG,
      hint: 'She와 the frog가 각각 무엇을 받는지, 이름을 붙이는 일이 어느 단계 뒤에 가능한지 생각하십시오.',
      choices: NUMS.slice(),
      answer: 3,
      why: [
        '아직 개구리도, 과학자(She)도 나오지 않았습니다.',
        '개구리는 나왔지만 She가 가리킬 과학자가 아직 나오지 않았습니다.',
        '과학자에게 사진을 보낸 직후입니다. 새로운 종인지 확인하기도 전에 이름을 붙이는 것은 순서가 맞지 않습니다.',
        '',
        '오늘날 학생들이 개울을 찾는다는 마지막 이야기 뒤에 이름을 붙인 일이 나오면 시간 순서가 거꾸로 됩니다.',
      ],
      explain: '주어진 문장의 **She**는 a scientist, **the frog**는 a small frog를 받습니다. 과학자가 새로운 종임을 확인한(③ 뒤 문장) 다음에야 이름을 붙일 수 있으므로 ④가 알맞습니다. 넣어 읽으면 "새로운 종임을 확인함 → 그 개구리에게 발견된 마을의 이름을 붙임 → 오늘날 그 마을 학생들이 개울을 찾아옴"으로 이어집니다.',
    },
  ],

  deeper: [
    {
      title: '마지막 문단부터 찾는 방법',
      body: '순서 배열에서 맨 앞에 올 문단이 잘 안 보일 때는 **맨 뒤에 올 문단**부터 찾아보십시오. 다음 표현이 있는 문단은 결론이나 결과라서 뒤쪽에 오기 쉽습니다.\n\n' +
        '- 결과·결론: As a result, Therefore, In the end, Finally, Thanks to this …\n' +
        '- 시간이 많이 지난 뒤: By the end of the month, Years later, Today …\n' +
        '- 앞의 여러 내용을 묶는 말: this teamwork, these changes, all of this …\n\n' +
        '맨 앞과 맨 뒤가 정해지면 가운데는 저절로 정해집니다. 마지막에는 꼭 처음부터 이어 읽어 연결 고리가 모두 맞는지 확인합니다.',
    },
    {
      title: '글쓴이는 왜 단서를 남길까',
      body: '지시어, 연결어, a와 the는 시험을 위해 넣은 장치가 아닙니다. 글쓴이가 독자를 **길 잃지 않게 안내하려고** 쓰는 말입니다. this는 "방금 말한 그것"을, However는 "이제 방향이 바뀝니다"를, the는 "아까 소개한 그것"을 알려 줍니다.\n\n' +
        '그래서 이 단서들을 따라 읽는 힘은 시험 밖에서도 그대로 쓰입니다. 긴 영어 글을 읽을 때 대명사가 무엇을 가리키는지, 연결어가 어떤 관계를 알리는지 놓치지 않으면 글이 훨씬 잘 이해됩니다. 영어로 글을 쓸 때도 이런 말을 알맞게 넣으면 읽기 쉬운 글이 됩니다.',
    },
  ],

  faq: [
    {
      q: '순서 배열을 풀 때 내용만 보고 정하면 안 되나요?',
      a: '내용으로 대강의 흐름을 잡는 것은 좋지만, 내용만으로는 두 순서가 다 그럴듯해 보일 때가 많습니다. 그때 지시어(this, these), 대명사(it, they), 연결어(However, For example), a와 the 같은 형식 단서가 순서를 확실하게 정해 줍니다. 내용과 형식 단서를 함께 쓰십시오.',
    },
    {
      q: '문장 삽입에서 두 자리가 모두 맞는 것 같으면 어떻게 해요?',
      a: '주어진 문장을 넣은 자리의 **바로 뒤 문장**까지 이어 읽어 보십시오. 앞 문장과는 잘 이어져도, 넣은 뒤 다음 문장의 지시어나 연결어가 엉뚱한 것을 가리키게 되는 자리가 있습니다. 앞뒤 모두와 맞는 자리가 하나뿐인 경우가 대부분입니다.',
    },
    {
      q: 'the가 보이면 무조건 뒤에 놓으면 되나요?',
      a: '아닙니다. the sun, the world처럼 하나뿐인 것이나 the bed처럼 상황상 서로 아는 것에는 처음부터 the를 씁니다. 같은 대상이 a로 소개된 문장이 따로 있을 때만 "a가 먼저, the가 나중"이라는 단서가 됩니다.',
    },
  ],

  mistakes: [
    '내용만 보고 순서를 정하고 지시어·연결어를 확인하지 않는 실수 — this, these, However, For example 같은 단서가 무엇을 받는지 꼭 확인합니다.',
    '문장 삽입에서 앞 문장과만 맞춰 보고 뒤 문장은 확인하지 않는 실수 — 넣은 자리의 앞뒤를 모두 이어 읽습니다.',
    'the만 보면 무조건 뒤로 보내는 실수 — 같은 대상을 a로 소개한 문장이 있을 때만 a → the 단서로 씁니다.',
  ],

  gens: [
    {
      id: 'three-sentence-order',
      level: 2,
      title: '단서를 따라 세 문장 순서 정하기',
      make: function (R) {
        var it = R.pick(STORIES);
        var lines = it[0];
        var perm = R.shuffle([0, 1, 2]);
        var choices = perm.map(function (k) { return lines[k]; });
        var answer = [0, 1, 2].map(function (k) { return perm.indexOf(k); });
        return {
          type: 'order', concept: it[2],
          q: '자연스러운 글이 되도록 세 문장을 순서대로 놓으십시오.',
          choices: choices,
          answer: answer,
          explain: '단서: ' + it[1] + '\n\n' + lines.join(' '),
        };
      },
    },
  ],

  vocab: [
    { w: 'divide', m: '나누다', ex: 'The teacher divided the class into four groups.', exm: '선생님은 반을 네 모둠으로 나누었습니다.' },
    { w: 'weed', m: '잡초', ex: 'We pulled out the weeds in the garden.', exm: '우리는 텃밭의 잡초를 뽑았습니다.' },
    { w: 'discussion', m: '토론, 논의', ex: 'After a long discussion, we chose a name for our club.', exm: '긴 논의 끝에 우리는 동아리 이름을 정했습니다.' },
    { w: 'grateful', m: '고마워하는', ex: 'I am grateful for your kind help.', exm: '친절하게 도와주셔서 고맙습니다.' },
    { w: 'source', m: '근원, 원천; (자료의) 출처', ex: 'Fruit is a good source of vitamins.', exm: '과일은 비타민의 좋은 공급원입니다.' },
    { w: 'hive', m: '벌집', ex: 'Thousands of bees live in a single hive.', exm: '벌집 하나에 수천 마리의 벌이 삽니다.' },
    { w: 'direction', m: '방향', ex: 'In which direction is the station?', exm: '역은 어느 방향에 있습니까?' },
    { w: 'switch', m: '바꾸다, 전환하다; 전환', ex: 'Switching between apps all day can make you tired.', exm: '하루 종일 앱을 이리저리 바꾸면 피곤해질 수 있습니다.' },
    { w: 'coast', m: '해안', ex: 'We drove along the coast and watched the sunset.', exm: '우리는 해안을 따라 차를 타고 가며 해 지는 것을 보았습니다.' },
    { w: 'steer', m: '(배·차를) 조종하다, 방향을 틀다', ex: 'The driver steered the car away from the hole in the road.', exm: '운전자는 길의 구멍을 피해 차의 방향을 틀었습니다.' },
    { w: 'automatically', m: '자동으로', ex: 'The doors open automatically when you come near.', exm: '가까이 가면 문이 자동으로 열립니다.' },
    { w: 'disappear', m: '사라지다', ex: 'The snow disappeared as soon as the sun came out.', exm: '해가 나오자마자 눈이 사라졌습니다.' },
    { w: 'spot', m: '발견하다, 알아채다; 점, 반점', ex: 'Jia spotted her friend in the crowd.', exm: '지아는 사람들 속에서 친구를 알아보았습니다.' },
    { w: 'species', m: '(생물의) 종', ex: 'Scientists discover new species of insects every year.', exm: '과학자들은 해마다 새로운 곤충 종을 발견합니다.' },
    { w: 'confirm', m: '확인하다, 사실임을 밝히다', ex: 'Please confirm the time of the meeting.', exm: '회의 시간을 확인해 주십시오.' },
    { w: 'adopt', m: '입양하다; (방법을) 받아들이다', ex: 'Our family adopted a cat from the shelter.', exm: '우리 가족은 보호소에서 고양이를 입양했습니다.' },
  ],
});
})();
