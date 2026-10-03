/* 공통영어2 · 이야기 읽고 감상 나누기
 * 이야기·지문은 모두 직접 쓴 글이다(가상의 인물·장소). */
(function () {
  // 이야기 A: 말하기 대회 (직접 쓴 글)
  var SPEECH = 'Sua had practiced her speech for the school contest every night for two weeks. On the day of the contest, she stood backstage, holding her note cards tightly. Her hands were cold, and her heart was pounding. When her name was called, she walked toward the stage, but she tripped on the steps, and her cards flew everywhere. Some students laughed. Sua\'s face turned red, and she wanted to run away. Then she saw her little brother in the third row. He gave her a big thumbs-up. Sua took a deep breath, left the cards on the floor, and began to speak from her heart. When she finished, the hall burst into applause. She did not win first prize, but she was smiling as she walked off the stage.';
  // 이야기 B: 이웃집 개 (직접 쓴 글)
  var BORI = 'Every morning, Mr. Han\'s old dog, Bori, barked at Doyun on his way to school. Doyun hated walking past the house. One rainy afternoon, he saw Bori standing alone outside the open gate, shivering. Mr. Han was nowhere to be seen. Doyun could have walked away, but he took off his raincoat, put it over the dog, and waited with him under the roof of the bus stop. An hour later, Mr. Han came running down the street. "I\'ve been looking everywhere for him!" he cried, hugging Bori. "Thank you so much, young man." The next morning, Bori did not bark at Doyun. He wagged his tail instead.';
  // 이야기 C: 전학 (직접 쓴 글)
  var NEW = 'Hayun moved to a new school in the middle of the year. For the first week, she ate lunch alone and counted the minutes until the bell rang. On Friday, a girl from her class sat down next to her. "I was new here last year, too," the girl said with a smile. "Do you want to join our book club?" Hayun\'s eyes lit up. That evening, she talked about her new friend at dinner for an hour.';
  // 감상문 (직접 쓴 글)
  var RESPONSE = 'When I read about Sua, I was moved by her courage. Her story reminded me of my piano recital last year. In the middle of the piece, I forgot the notes, stopped playing, and ran off the stage. If I had been as brave as Sua, I would have kept playing. Next time, I will try to play from my heart, just like her.';

  // 생성기용 낱말 뜻
  var KO = {
    nervous: '긴장한, 초조한', relieved: '안도한', embarrassed: '당황한, 창피한', disappointed: '실망한', lonely: '외로운',
    proud: '자랑스러운', frightened: '겁먹은', jealous: '질투하는', grateful: '고마워하는', excited: '신이 난, 들뜬',
    annoyed: '짜증 난', regretful: '후회하는', bored: '지루한', moved: '감동한', ashamed: '부끄러운',
    kind: '친절한', selfish: '이기적인', lazy: '게으른', rude: '무례한', honest: '정직한', greedy: '욕심 많은',
    careless: '부주의한', cowardly: '겁이 많은', patient: '참을성 있는', impatient: '참을성 없는', curious: '호기심 많은',
    brave: '용감한', generous: '너그러운, 잘 베푸는', polite: '예의 바른', humble: '겸손한', arrogant: '거만한',
    stubborn: '고집 센', flexible: '융통성 있는', careful: '조심성 있는',
  };

Tutor.registerUnit({
  id: 'eng-h-c2-04',
  course: 'eng-h-c2',
  title: '이야기 읽고 감상 나누기',
  summary: '이야기의 인물·사건·배경을 정리하며 인물의 심경 변화를 따라가고, 내 감상을 영어로 표현합니다.',
  goals: [
    '이야기의 인물·사건·배경·갈등을 찾아 정리할 수 있다.',
    '사건의 흐름에 따라 인물의 심경이 어떻게 바뀌는지(A → B) 파악할 수 있다.',
    '인물의 말과 행동을 근거로 성격을 추론할 수 있다.',
    'I was moved by ~, It reminded me of ~, If I were ~ 같은 표현으로 감상과 공감을 나눌 수 있다.',
  ],
  standards: ['[10공영2-01-03]', '[10공영2-02-04]'],

  concepts: [
    {
      title: '이야기의 요소: 인물·사건·배경·갈등',
      body: '이야기는 네 가지 요소로 짜여 있습니다. 이야기를 읽을 때 이 네 가지를 먼저 정리하면 내용이 한눈에 들어옵니다.\n\n' +
        '| 요소 | 무엇인가 | 찾는 질문 |\n|---|---|---|\n' +
        '| **인물(character)** | 이야기에 나오는 사람(또는 동물) | Who? 주인공은 누구인가? |\n' +
        '| **배경(setting)** | 일이 일어나는 때와 곳 | When? Where? |\n' +
        '| **사건(plot)** | 일어나는 일들의 흐름 | What happened? 처음 → 문제 → 절정 → 결말 |\n' +
        '| **갈등(conflict)** | 인물이 맞닥뜨린 문제나 대립 | What is the problem? |\n\n' +
        '갈등에는 두 종류가 있습니다.\n\n' +
        '- **내적 갈등**: 인물의 **마음속** 갈등. 예: 도망치고 싶지만 끝까지 해내고 싶은 마음\n' +
        '- **외적 갈등**: 인물과 **다른 인물·사회·자연** 사이의 갈등. 예: 친구와의 다툼, 폭풍과의 싸움\n\n' +
        '> 💡 갈등이 풀리는 방향을 보면 이야기가 말하려는 것(주제)이 보입니다. 수아의 이야기에서 두려움을 이겨 내는 과정은 "진심으로 하는 것의 힘"을 보여 줍니다.',
      easy: '이야기를 영화 한 편이라고 생각해 보십시오. 출연 배우(인물), 촬영 장소와 시간(배경), 줄거리(사건), 그리고 영화를 흥미진진하게 만드는 "문제"(갈등)가 있지요.\n\n' +
        '갈등이 없는 영화는 지루합니다. 주인공이 무엇 때문에 힘들어하는지 찾으면 이야기의 중심을 찾은 것입니다.',
      check: {
        type: 'choice',
        q: '다음 문장이 알려 주는 이야기의 요소는 무엇입니까?\n\nIt was a cold winter night in a small village by the mountains.',
        choices: ['배경(setting)', '인물(character)', '갈등(conflict)'],
        answer: 0,
        why: ['', '이 문장에는 사람이 나오지 않습니다. 때(winter night)와 곳(a small village)만 알려 줍니다.', '인물이 맞닥뜨린 문제가 나오지 않습니다. 때와 곳을 알려 주는 문장입니다.'],
        explain: 'a cold winter night(때)와 a small village by the mountains(곳)를 알려 주므로 **배경**입니다.',
      },
    },
    {
      title: '사건 흐름에 따른 심경 변화 (A → B)',
      body: '이야기 속 인물의 **심경(feelings)**은 사건이 진행되면서 바뀝니다. 심경 변화 문제는 **처음 심경 A**와 **나중 심경 B**를 각각 찾아 잇는 것입니다.\n\n' +
        '1. **처음 부분**에서 인물의 상태를 보여 주는 단서를 찾습니다(몸의 반응, 행동, 생각).\n' +
        '2. **전환점**을 찾습니다. but, then, suddenly, however, finally 같은 말 뒤에서 분위기가 바뀌는 경우가 많습니다.\n' +
        '3. **끝부분**의 단서로 나중 심경을 정합니다.\n\n' +
        '| 단서(영어 표현) | 심경 |\n|---|---|\n' +
        '| hands were shaking, heart was pounding | nervous (긴장한) |\n' +
        '| face turned red, wanted to hide | embarrassed (당황한, 창피한) |\n' +
        '| let out a sigh of relief, a weight was lifted | relieved (안도한) |\n' +
        '| sighed, stared out the window, his heart sank | disappointed (실망한) |\n' +
        '| eyes lit up, jumped for joy | delighted (기쁜) |\n' +
        '| tears filled her eyes (기쁨의 장면에서) | moved (감동한) |\n\n' +
        '예: 말하기 대회 이야기(이 단원의 예제)의 수아 — 손이 차갑고 심장이 두근거림(nervous) → 넘어지고 얼굴이 빨개짐(embarrassed) → 진심으로 말하고 웃으며 내려옴(satisfied, 만족한)',
      easy: '인물의 마음은 날씨처럼 바뀝니다. 처음엔 흐렸다가(긴장), 비가 쏟아지고(당황), 마지막에 해가 납니다(만족).\n\n' +
        '심경 문제는 "처음 날씨"와 "마지막 날씨"를 묻는 것입니다. 중간에 비가 왔다고 마지막 날씨를 비로 고르면 안 됩니다. 이야기의 **맨 끝**에서 인물이 어떤 표정인지 꼭 확인하십시오.',
      check: {
        type: 'choice',
        q: '다음 글에서 Jun의 심경 변화로 알맞은 것은 무엇입니까?\n\nJun waited by the phone all day for the test results. His hands would not stop shaking. At last, the phone rang. "You passed!" Jun jumped up and shouted with joy.',
        choices: ['nervous → delighted', 'delighted → nervous', 'bored → angry'],
        answer: 0,
        why: ['', '순서가 거꾸로입니다. 처음에 손이 떨렸고(nervous), 합격 소식 뒤에 기뻐했습니다(delighted).', '하루 종일 결과를 기다리며 손이 떨린 것은 지루함이 아니라 긴장입니다. 마지막에 화를 내지도 않았습니다.'],
        explain: '처음: hands would not stop shaking → **nervous**(긴장한). 전환점: "You passed!" 끝: jumped up and shouted with joy → **delighted**(기쁜).',
      },
    },
    {
      title: '인물의 말과 행동으로 성격 추론하기',
      body: '작가는 인물의 성격을 "그는 친절했다"라고 **직접 말하기**보다, 인물의 **말과 행동**으로 **보여 주는** 경우가 많습니다. 독자는 그 말과 행동을 근거로 성격을 추론합니다.\n\n' +
        '| 말·행동 | 추론할 수 있는 성격 |\n|---|---|\n' +
        '| She practiced every night for two weeks. | hardworking (성실한) |\n' +
        '| He took off his raincoat and put it over the shivering dog. | kind, caring (친절한, 남을 돌보는) |\n' +
        '| She returned the wallet she found to its owner. | honest (정직한) |\n' +
        '| He ate all the snacks without sharing any. | selfish (이기적인) |\n' +
        '| She said, "I was just lucky. Everyone did a great job." | humble (겸손한) |\n\n' +
        '성격을 고를 때는 **글에 근거가 있는 것**만 고릅니다. 그럴듯해 보여도 글에 그런 말이나 행동이 없으면 답이 아닙니다.\n\n' +
        '> ⚠️ 심경(지금 느끼는 감정: nervous, relieved)과 성격(늘 지닌 특성: honest, brave)을 헷갈리지 않습니다. "성격"을 묻는데 감정 낱말을 고르면 틀립니다.',
      easy: '새로 전학 온 친구의 성격을 어떻게 알게 되나요? 그 친구가 "나는 착해"라고 말해서가 아니라, 넘어진 친구를 일으켜 주는 **모습을 보고** 알게 되지요.\n\n' +
        '이야기도 같습니다. 인물이 무엇을 **했는지**, 무엇을 **말했는지**에 밑줄을 치고 "이런 행동을 하는 사람은 어떤 사람일까?"라고 물어보십시오.',
      check: {
        type: 'choice',
        q: '다음 행동에서 알 수 있는 Minsu의 성격으로 알맞은 것은 무엇입니까?\n\nMinsu found a wallet full of money on the street and took it straight to the police station.',
        choices: ['honest', 'greedy', 'nervous'],
        answer: 0,
        why: ['', 'greedy(욕심 많은) 사람이라면 돈을 가졌을 것입니다. 민수는 지갑을 경찰서에 가져다주었습니다.', 'nervous(긴장한)는 성격이 아니라 그때의 감정이고, 글에 그런 단서도 없습니다.'],
        explain: '돈이 가득한 지갑을 곧장 경찰서에 가져다준 행동에서 **honest**(정직한) 성격을 추론할 수 있습니다.',
      },
    },
    {
      title: '감상을 나타내는 표현',
      body: '이야기를 읽고 느낀 점을 나눌 때는 **줄거리를 다시 말하는 것**이 아니라 **나의 반응**을 말합니다. 다음 표현이 감상을 나타내는 데 자주 쓰입니다.\n\n' +
        '| 표현 | 뜻 | 예 |\n|---|---|---|\n' +
        '| I was **moved by** ~ | ~에 감동받았다 | I was moved by Sua\'s courage. |\n' +
        '| I was **impressed by** ~ | ~이 인상 깊었다 | I was impressed by how calm she stayed. |\n' +
        '| It **reminded me of** ~ | ~이 떠올랐다(생각나게 했다) | It reminded me of my first day at school. |\n' +
        '| I could **relate to** ~ | ~에 공감할 수 있었다 | I could relate to Doyun\'s fear of the dog. |\n' +
        '| What **struck me most** was ~ | 가장 인상 깊었던 것은 ~이었다 | What struck me most was the ending. |\n' +
        '| This story **taught me that** ~ | 이 이야기는 ~을 알려 주었다 | This story taught me that kindness can change people. |\n\n' +
        '> ⚠️ 감정을 느끼는 사람이 주어이면 **과거분사**(moved, impressed, touched), 감정을 일으키는 것이 주어이면 **현재분사**(moving, impressive, touching)를 씁니다. I was **moved**. / The story was **moving**.',
      easy: '친구가 영화를 보고 나와서 "주인공이 이사 가고, 친구를 만나고, 끝났어"라고만 말하면 줄거리입니다. "마지막 장면에서 눈물이 났어. 내가 전학 왔을 때가 생각나더라"라고 말하면 감상입니다.\n\n' +
        '영어 감상문에서도 I, me, my가 들어가 **내 마음과 내 경험**이 드러나는 문장이 감상입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe ending of the story [[빈칸]] me of my grandfather.',
        choices: ['reminded', 'remembered', 'moved'],
        answer: 0,
        why: ['', 'remember는 "기억하다"로, remember A of B 꼴로 쓰지 않습니다. "A에게 B를 떠올리게 하다"는 remind A of B입니다.', 'moved는 "감동시켰다"는 뜻이라 뒤에 of my grandfather가 오지 않습니다.'],
        explain: '**remind A of B**: A에게 B를 떠올리게 하다. The ending of the story **reminded** me of my grandfather. (이야기의 결말이 나에게 할아버지를 떠올리게 했다.)',
      },
    },
    {
      title: '공감하기와 다른 선택 상상하기 (If I were ~)',
      body: '감상을 깊게 하는 방법은 **인물의 입장이 되어 보는 것**입니다. 공감을 나타내거나, 내가 그 인물이라면 어떻게 했을지 상상해 봅니다.\n\n' +
        '**공감 표현**\n' +
        '- I **understand why** Doyun hated walking past the house.\n' +
        '- I **can imagine how** embarrassed Sua must have felt.\n\n' +
        '**다른 선택 상상하기 (가정법)**\n' +
        '- **If I were** Sua, I **would** feel nervous too. — 지금 그 인물의 입장이라면 (가정법 과거)\n' +
        '- **If I had been** Doyun, I **would have called** Mr. Han right away. — 그때 그 자리에 있었다면 (가정법 과거완료)\n\n' +
        '| 상상하는 때 | 형태 |\n|---|---|\n| 지금, 일반적인 입장 | If I were ~, I would + 동사원형 |\n| 이야기 속 과거의 그 순간 | If I had been ~, I would have + p.p. |\n\n' +
        '> 💡 다른 선택을 상상한 뒤에는 **이유**를 덧붙이면 감상이 깊어집니다. If I had been Doyun, I would have called Mr. Han right away **because he must have been worried.**',
      easy: '"내가 쟤였으면 어땠을까?" 하고 상상하는 것은 이야기를 내 것으로 만드는 가장 쉬운 방법입니다.\n\n' +
        '영어에서는 앞 단원에서 배운 가정법으로 이 상상을 말합니다. 나는 실제로 수아가 아니니까 사실과 반대 — 그래서 If I **were** Sua처럼 가정법을 씁니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nIf I [[빈칸]] in Sua\'s shoes, I would feel very nervous too.',
        choices: ['were', 'am', 'will be'],
        answer: 0,
        why: ['', '나는 실제로 수아가 아니므로 사실과 반대인 가정법 과거를 씁니다. 주절도 would feel입니다.', '가정법의 if절에는 will을 쓰지 않습니다.'],
        explain: '주절이 would feel이고 사실과 반대인 상상이므로 가정법 과거 **were**를 씁니다. (내가 수아의 입장이라면 나도 아주 긴장할 것이다.)',
      },
    },
  ],

  examples: [
    {
      q: '다음 이야기의 요소(인물·배경·갈등)와 주인공의 심경 변화를 정리하십시오.\n\n' + SPEECH,
      steps: [
        '인물: 주인공 Sua, 응원해 주는 남동생(her little brother), 웃은 학생들(some students).',
        '배경: 학교 말하기 대회 날, 무대가 있는 강당(backstage, the stage, the hall).',
        '갈등: 계단에서 넘어져 원고 카드가 흩어지고 몇몇 학생이 웃자, 도망치고 싶은 마음과 끝까지 말하고 싶은 마음이 수아의 마음속에서 부딪칩니다(내적 갈등).',
        '심경의 처음: hands were cold, heart was pounding → nervous.',
        '전환점: Then she saw her little brother … thumbs-up. 끝: she was smiling → satisfied(만족한).',
      ],
      answer: '인물: Sua와 남동생 / 배경: 학교 말하기 대회 날의 강당 / 갈등: 넘어진 뒤 도망치고 싶은 두려움과 끝까지 말하고 싶은 마음(내적 갈등) / 심경: nervous → (embarrassed) → satisfied',
    },
    {
      q: '다음 이야기를 읽고 감상을 세 문장으로 써 보십시오.\n\n' + BORI,
      steps: [
        '감동받은 점을 말합니다: I was moved by ~ (무엇에?) — 비를 맞는 개를 도와준 도윤의 친절.',
        '나의 경험과 잇습니다: It reminded me of ~ — 비슷한 경험을 떠올립니다.',
        '배운 점이나 다른 선택을 덧붙입니다: This story taught me that ~ / If I had been Doyun, I would have ~.',
      ],
      answer: 'I was moved by Doyun\'s kindness to Bori, even though the dog always barked at him. It reminded me of the time I helped a lost child find her mother. This story taught me that a small act of kindness can change a relationship.',
    },
  ],

  terms: [
    { term: '인물(character)', def: '이야기에 등장하여 사건을 이끌어 가는 사람(또는 동물)입니다. 중심이 되는 인물을 주인공이라고 합니다.' },
    { term: '배경(setting)', def: '이야기 속 일이 일어나는 때와 곳입니다. 예: a cold winter night in a small village' },
    { term: '사건(plot)', def: '이야기 속에서 일어나는 일들의 흐름입니다. 보통 처음 → 문제 → 절정 → 결말로 진행됩니다.' },
    { term: '갈등(conflict)', def: '인물이 맞닥뜨린 문제나 대립입니다. 마음속의 내적 갈등과, 다른 인물·사회·자연과의 외적 갈등이 있습니다.' },
    { term: '심경', def: '인물이 그때그때 느끼는 마음 상태입니다. 예: nervous, relieved, disappointed' },
    { term: '성격', def: '인물이 늘 지니고 있는 특성입니다. 말과 행동으로 추론합니다. 예: honest, brave, selfish' },
    { term: '감상', def: '작품을 읽고 느끼거나 생각한 나의 반응입니다. 줄거리 요약과 달리 나의 감정·경험·생각이 들어갑니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 이야기의 배경으로 가장 알맞은 것은 무엇입니까?\n\n' + SPEECH,
      choices: ['학교 말하기 대회가 열린 날의 강당', '수아의 집 거실', '비 오는 날의 버스 정류장', '음악 학원의 연습실'],
      answer: 0,
      why: ['', '수아가 매일 밤 연습한 곳은 나오지 않습니다. 이야기의 사건은 대회 날 무대에서 일어납니다.', '버스 정류장은 이 이야기에 나오지 않습니다.', '연습실은 나오지 않습니다. backstage, stage, hall이 나옵니다.'],
      explain: 'On the day of the contest, backstage, the stage, the hall에서 배경이 **학교 말하기 대회 날의 강당**임을 알 수 있습니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '다음 이야기에서 Sua의 심경 변화로 가장 알맞은 것은 무엇입니까?\n\n' + SPEECH,
      choices: ['nervous → satisfied', 'satisfied → nervous', 'excited → disappointed', 'bored → angry'],
      answer: 0,
      hint: '처음 부분의 몸의 반응과 마지막 문장의 표정을 찾아보십시오.',
      why: ['', '순서가 거꾸로입니다. 처음에 긴장했고 마지막에 웃으며 내려왔습니다.', '1등은 못 했지만 마지막에 웃고(smiling) 있었습니다. 실망한 모습이 아닙니다.', '지루하거나 화가 난 단서는 없습니다. 손이 차갑고 심장이 두근거린 것은 긴장입니다.'],
      explain: '처음: hands were cold, heart was pounding → **nervous**. 끝: did not win first prize, but she was smiling → **satisfied**(만족한).',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '다음 문장에서 알 수 있는 Sua의 성격으로 가장 알맞은 것은 무엇입니까?\n\nSua had practiced her speech for the school contest every night for two weeks.',
      choices: ['hardworking', 'lazy', 'selfish', 'careless'],
      answer: 0,
      why: ['', 'lazy(게으른)는 매일 밤 2주 동안 연습한 행동과 반대입니다.', 'selfish(이기적인)를 보여 주는 행동은 이 문장에 없습니다.', 'careless(부주의한)는 꾸준히 준비한 모습과 맞지 않습니다.'],
      explain: '2주 동안 매일 밤 연습한 행동에서 **hardworking**(성실한, 열심히 하는)을 추론할 수 있습니다.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 0,
      q: '"Sua wanted to run away, but she also wanted to finish her speech."는 인물의 마음속 갈등, 곧 **내적 갈등**을 보여 줍니다.',
      answer: true,
      explain: '도망치고 싶은 마음과 끝까지 말하고 싶은 마음이 한 사람의 **마음속**에서 부딪치므로 내적 갈등입니다. 다른 인물이나 자연과의 대립이면 외적 갈등입니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', concept: 3,
      q: '우리말 뜻에 맞게 빈칸에 알맞은 한 낱말을 쓰십시오.\n\nThe story [[빈칸]] me of my first day at middle school. (이 이야기는 나에게 중학교 첫날을 떠올리게 했다.)',
      answer: ['reminded'],
      wrong: [
        { a: 'remembered', why: 'remember는 "기억하다"로, remember A of B 꼴로 쓰지 않습니다. "A에게 B를 떠올리게 하다"는 remind A of B입니다.' },
        { a: 'reminds', why: '우리말 뜻이 "떠올리게 했다"(과거)이므로 reminded로 씁니다.' },
        { a: 'remind', why: '주어 The story가 3인칭 단수이고 뜻이 과거이므로 reminded로 씁니다.' },
      ],
      explain: '**remind A of B**(A에게 B를 떠올리게 하다)의 과거형 **reminded**를 씁니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nI was deeply [[빈칸]] by Sua\'s courage.',
      choices: ['moved', 'moving', 'move', 'moves'],
      answer: 0,
      why: ['', '감동을 느끼는 사람(I)이 주어이므로 과거분사 moved를 씁니다. moving은 감동을 주는 것을 꾸밉니다.', 'was 뒤에는 동사원형이 올 수 없습니다.', 'was 뒤에 3인칭 단수 현재형은 올 수 없습니다.'],
      explain: '감정을 느끼는 사람이 주어이므로 **be moved by ~**(~에 감동받다)를 씁니다. (나는 수아의 용기에 깊이 감동받았다.)',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nIf I [[빈칸]] in Doyun\'s place, I would help the dog too.',
      choices: ['were', 'am', 'be', 'will be'],
      answer: 0,
      why: ['', '나는 실제로 도윤이 아니므로 사실과 반대인 가정법 과거를 씁니다. 주절도 would help입니다.', 'if절에 주어 I가 있으므로 동사원형 be는 쓸 수 없습니다. 가정법 과거는 were입니다.', '가정법 if절에는 will을 쓰지 않습니다.'],
      explain: '사실과 반대인 상상이고 주절이 would help이므로 가정법 과거 **were**를 씁니다. (내가 도윤의 입장이라면 나도 그 개를 도울 것이다.)',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 2,
      q: '다음 이야기에서 Doyun의 행동으로 알 수 있는 성격으로 가장 알맞은 것은 무엇입니까?\n\n' + BORI,
      choices: ['caring', 'selfish', 'careless', 'rude'],
      answer: 0,
      hint: 'Doyun could have walked away, but … 뒤에서 도윤이 한 행동을 보십시오.',
      why: ['', '자기 비옷을 벗어 개에게 덮어 준 행동은 이기적인 것과 반대입니다.', '한 시간 동안 개 곁을 지킨 것은 부주의함이 아니라 책임감 있는 행동입니다.', '무례한 말이나 행동은 나오지 않습니다.'],
      explain: '자기를 늘 짖던 개인데도 비옷을 덮어 주고 주인이 올 때까지 함께 기다린 행동에서 **caring**(남을 돌보는, 다정한) 성격을 추론할 수 있습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      q: '다음 이야기에서 Mr. Han의 심경 변화로 가장 알맞은 것은 무엇입니까?\n\n' + BORI,
      choices: ['worried → relieved', 'relieved → worried', 'bored → excited', 'angry → jealous'],
      answer: 0,
      hint: 'Mr. Han이 한 말과 행동(came running, I\'ve been looking everywhere, hugging)에 주목하십시오.',
      why: ['', '순서가 거꾸로입니다. 개를 찾아 헤매다가(worried) 찾고 나서 안도했습니다(relieved).', '지루하거나 들뜬 단서는 없습니다. 개를 잃어버려 애타게 찾고 있었습니다.', '화나 질투를 보여 주는 단서는 없습니다. 오히려 도윤에게 고마워했습니다.'],
      explain: '"I\'ve been looking everywhere for him!"과 뛰어온 모습에서 개를 찾아 헤매던 **worried**(걱정하는), 개를 껴안고 고마워하는 모습에서 **relieved**(안도한) 심경을 알 수 있습니다.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 0,
      q: '다음 이야기의 사건을 일어난 순서대로 놓으십시오.\n\n' + BORI,
      choices: [
        'Bori barked at Doyun every morning.',
        'Doyun found Bori shivering outside the gate.',
        'Doyun covered Bori with his raincoat.',
        'Mr. Han came running down the street.',
        'Bori wagged his tail at Doyun.',
      ],
      answer: [0, 1, 2, 3, 4],
      hint: 'Every morning → One rainy afternoon → An hour later → The next morning처럼 때를 알려 주는 말을 따라가십시오.',
      explain: '평소(Every morning) 짖음 → 비 오는 오후 떨고 있는 보리를 발견 → 비옷을 덮어 줌 → 한 시간 뒤 한 씨 아저씨가 뛰어옴 → 다음 날 아침 보리가 꼬리를 흔듦.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '다음 이야기의 마지막 문장 He wagged his tail instead.가 보여 주는 것으로 가장 알맞은 것은 무엇입니까?\n\n' + BORI,
      choices: [
        'Bori now sees Doyun as a friend.',
        'Bori is still afraid of Doyun.',
        'Doyun is angry at Bori.',
        'Mr. Han is worried about Doyun.',
      ],
      answer: 0,
      hint: '짖던 개가 꼬리를 흔든다는 것은 어떤 마음의 변화일까요?',
      why: ['', '꼬리를 흔드는 것은 두려움이 아니라 반가움을 나타냅니다.', '도윤이 화가 났다는 단서는 없습니다. 이 문장의 주어는 보리입니다.', '한 씨 아저씨는 마지막 문장에 나오지 않습니다.'],
      explain: '늘 짖던 보리가 짖지 않고 **꼬리를 흔든** 것은 도윤을 이제 반가운 친구로 여긴다는 뜻입니다. 작가는 "친해졌다"고 말하지 않고 행동으로 보여 줍니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', concept: 4,
      q: '빈칸에 call을 알맞은 꼴로 쓰십시오. (would를 써서)\n\nIf I had been Doyun that afternoon, I [[빈칸]] Mr. Han right away.',
      answer: ['would have called', "would've called"],
      hint: 'if절이 had been(과거 사실 반대)입니다. 주절도 과거의 결과로 씁니다.',
      wrong: [
        { a: 'would call', why: 'if절이 had been(그날 오후, 과거)이므로 주절은 would have + p.p.입니다.' },
        { a: 'will call', why: '가정법 주절에는 will이 아니라 would를 쓰고, 과거의 일이므로 would have called입니다.' },
        { a: 'would have call', why: 'have 뒤에는 과거분사 called를 씁니다.' },
      ],
      explain: '이야기 속 **과거의 그 순간**을 상상하므로 가정법 과거완료: If I had been Doyun, I **would have called** Mr. Han right away.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '다음 글에서 Hayun의 심경 변화로 가장 알맞은 것은 무엇입니까?\n\n' + NEW,
      choices: ['lonely → delighted', 'delighted → lonely', 'proud → ashamed', 'angry → calm'],
      answer: 0,
      hint: '심경을 직접 말하는 낱말이 없습니다. 행동(ate alone, counted the minutes, eyes lit up)으로 추론하십시오.',
      why: ['', '순서가 거꾸로입니다. 처음에 혼자 점심을 먹었고, 나중에 새 친구 이야기를 한 시간 동안 했습니다.', '자랑스럽거나 부끄러워할 일은 나오지 않습니다.', '화가 났다는 단서는 없습니다. 혼자 지내며 시간이 가기만 기다린 것은 외로움입니다.'],
      explain: '혼자 점심을 먹고 종이 울릴 때까지 시간을 센 것 → **lonely**(외로운). 동아리에 초대받고 눈이 반짝이고, 저녁에 새 친구 이야기를 한 시간 동안 함 → **delighted**(기쁜).',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '다음 글에서 하윤에게 말을 건 여학생(the girl)의 성격으로 가장 알맞은 것은 무엇입니까?\n\n' + NEW,
      choices: ['friendly', 'jealous', 'stubborn', 'greedy'],
      answer: 0,
      hint: '그 여학생이 한 행동과 말을 찾아보십시오.',
      why: ['', '질투를 보여 주는 말이나 행동은 없습니다.', '고집을 부리는 장면은 나오지 않습니다.', '욕심을 부리는 장면은 나오지 않습니다.'],
      explain: '처음 보는 전학생 옆에 먼저 앉아 웃으며 말을 걸고(sat down next to her, with a smile), 자기도 작년에 전학 왔다며 동아리에 초대한 행동에서 **friendly**(다정한, 친근한) 성격을 추론할 수 있습니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '다음 글을 읽고 쓴 문장 가운데 줄거리 요약이 아니라 **감상**에 해당하는 것은 무엇입니까?\n\n' + NEW,
      choices: [
        'I could relate to Hayun because I also felt lonely at my new school.',
        'Hayun moved to a new school in the middle of the year.',
        'A girl invited Hayun to join a book club.',
        'Hayun talked about her new friend at dinner.',
      ],
      answer: 0,
      hint: '나의 감정·경험이 들어간 문장을 찾으십시오.',
      why: ['', '이야기의 사건을 그대로 옮긴 요약입니다.', '이야기의 사건을 그대로 옮긴 요약입니다.', '이야기의 사건을 그대로 옮긴 요약입니다.'],
      explain: 'I could relate to ~(~에 공감할 수 있었다)와 나의 경험(I also felt lonely at my new school)이 들어 있으므로 **감상**입니다. 나머지는 줄거리를 옮긴 문장입니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 0,
      q: '다음 중 **외적 갈등**(인물과 다른 인물·사회·자연 사이의 갈등)에 해당하는 것은 무엇입니까?',
      choices: [
        'Two friends argue over who broke the window.',
        'A boy cannot decide whether to tell the truth.',
        'A girl is afraid of failing but wants to try.',
        'A man wonders if he made the right choice.',
      ],
      answer: 0,
      hint: '갈등이 한 사람의 마음속에 있는지, 두 대상 사이에 있는지 보십시오.',
      why: ['', '진실을 말할지 망설이는 것은 한 사람의 마음속 갈등(내적 갈등)입니다.', '실패가 두렵지만 해 보고 싶은 마음은 내적 갈등입니다.', '자신의 선택이 옳았는지 고민하는 것은 내적 갈등입니다.'],
      explain: '두 친구가 누가 창문을 깼는지를 두고 **서로** 다투는 것은 인물과 인물 사이의 **외적 갈등**입니다. 나머지는 모두 한 인물의 마음속 갈등입니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '다음은 말하기 대회에서 넘어졌던 수아의 이야기를 읽고 쓴 감상문입니다. 글쓴이에 대한 설명으로 알맞은 것은 무엇입니까?\n\n' + RESPONSE,
      choices: [
        'The writer stopped playing at a piano recital last year.',
        'The writer kept playing at the recital like Sua.',
        'The writer did not like Sua\'s story.',
        'The writer won first prize at the recital.',
      ],
      answer: 0,
      hint: 'If I had been as brave as Sua, I would have kept playing.이 실제로는 어떤 일이었는지 뒤집어 보십시오.',
      why: [
        '',
        'If I had been as brave as Sua, I would have kept playing은 가정법 과거완료입니다. 실제로는 연주를 계속하지 못했습니다.',
        'I was moved by her courage — 수아의 이야기에 감동받았다고 했습니다.',
        '연주 도중 음을 잊어 연주를 멈추고 무대에서 뛰어 내려왔다고 했을 뿐, 상을 받았다는 말은 없습니다.',
      ],
      explain: 'I forgot the notes, stopped playing, and ran off the stage에서 글쓴이가 작년 연주회에서 **연주를 멈췄음**을 알 수 있습니다. 가정법 문장(If I had been as brave as Sua, I would have kept playing)도 실제로는 용기를 내지 못하고 멈췄다는 뜻입니다.',
    },
  ],

  deeper: [
    {
      title: '보여 주기와 말하기 (Show, don\'t tell)',
      body: '이야기를 쓰는 사람들 사이에는 "**말하지 말고 보여 줘라(Show, don\'t tell)**"라는 오래된 조언이 있습니다.\n\n' +
        '| 말하기 (Tell) | 보여 주기 (Show) |\n|---|---|\n' +
        '| Sua was nervous. | Her hands were cold, and her heart was pounding. |\n' +
        '| Doyun was kind. | He took off his raincoat and put it over the shivering dog. |\n' +
        '| Bori liked Doyun now. | He wagged his tail instead. |\n\n' +
        '보여 주기 문장은 독자가 **스스로** 인물의 마음과 성격을 알아내게 합니다. 그래서 더 생생하고 오래 기억에 남습니다. 거꾸로 말하면, 독자가 심경·성격 문제를 풀 수 있는 것은 작가가 이렇게 단서를 심어 두었기 때문입니다.\n\n' +
        '내가 감상문이나 짧은 이야기를 쓸 때도 이 방법을 써 보십시오. "나는 슬펐다" 대신 "나는 창밖만 바라보며 저녁을 거의 먹지 않았다"라고 쓰면 읽는 사람이 그 마음을 함께 느낍니다.',
    },
  ],

  faq: [
    {
      q: '심경 변화 문제는 어떻게 풀어요?',
      a: '이야기를 처음·가운데·끝으로 나누고, **처음**과 **끝**에서 인물의 몸의 반응·행동·말을 찾습니다. 그 단서를 감정 낱말로 바꾸면 A와 B가 됩니다.\n\n중간에 잠깐 나온 감정(예: 넘어져서 창피함)을 끝 감정으로 고르지 않도록, 마지막 한두 문장을 꼭 확인하십시오.',
    },
    {
      q: '감정이나 성격을 나타내는 영어 낱말을 잘 모르겠어요.',
      a: '자주 나오는 낱말을 짝으로 묶어 익히면 쉽습니다. nervous ↔ relieved, excited ↔ disappointed, lonely ↔ delighted, proud ↔ ashamed(감정), honest ↔ dishonest, generous ↔ selfish, brave ↔ cowardly, humble ↔ arrogant(성격). 이 단원 끝의 낱말 목록과 생성기 문제로 연습해 보십시오.',
    },
    {
      q: '감상문은 줄거리 요약이랑 뭐가 달라요?',
      a: '요약은 이야기에서 **무슨 일이 있었는지**를 짧게 옮기는 것이고, 감상은 그 이야기를 읽고 **내가 무엇을 느끼고 생각했는지**를 말하는 것입니다. 감상 문장에는 I was moved by ~, It reminded me of ~, If I were ~처럼 나의 감정·경험·상상이 들어갑니다.',
    },
  ],

  mistakes: [
    '심경 변화에서 중간 감정을 마지막 감정으로 고르는 실수 — 수아는 넘어졌을 때 창피했지만(embarrassed), 끝에는 웃으며 내려왔습니다(satisfied).',
    '성격을 묻는데 감정 낱말(nervous, relieved)을 고르거나, 글에 근거가 없는 성격을 고르는 실수 — 성격은 인물의 말과 행동에서 근거를 찾습니다.',
    'I was moving by the story (×)처럼 감정 표현의 분사를 잘못 쓰는 실수 — 감정을 느끼는 사람이 주어이면 moved(과거분사): I was moved by the story (○).',
  ],

  gens: [
    {
      id: 'feeling-from-clue',
      level: 1,
      title: '단서로 인물의 심경 알아내기',
      make: function (R) {
        // [상황, 정답, 오답 3개, 단서(우리말)]
        var items = [
          ["Jun's hands were shaking, and his heart was pounding as he waited for his turn to speak.", 'nervous', ['bored', 'proud', 'relieved'], '손이 떨리고 심장이 두근거림'],
          ['When Mina heard that her lost cat had come home safely, she let out a long breath and smiled.', 'relieved', ['frightened', 'jealous', 'bored'], '잃어버린 고양이가 무사히 돌아와 긴 숨을 내쉬고 웃음'],
          ['Seojun\'s face turned red when he realized he had been wearing his shirt inside out all day.', 'embarrassed', ['grateful', 'relieved', 'proud'], '셔츠를 하루 종일 뒤집어 입은 것을 알고 얼굴이 빨개짐'],
          ['Hana had looked forward to the picnic for weeks, but it was canceled because of the rain. She sighed and stared out the window.', 'disappointed', ['relieved', 'proud', 'grateful'], '몇 주 동안 기다린 소풍이 취소되어 한숨 쉬며 창밖을 봄'],
          ['After moving to a new city, Doyun ate lunch alone every day and had no one to talk to.', 'lonely', ['proud', 'excited', 'grateful'], '새 도시에서 매일 혼자 점심을 먹고 이야기할 사람이 없음'],
          ['Sua finally finished the 10-kilometer race, and her parents cheered as she crossed the finish line. She raised her arms high.', 'proud', ['lonely', 'ashamed', 'frightened'], '10킬로미터 경주를 끝까지 달리고 두 팔을 높이 듦'],
          ['Minsu heard strange footsteps behind him on the dark street and started to run.', 'frightened', ['proud', 'grateful', 'bored'], '어두운 길에서 이상한 발소리를 듣고 뛰기 시작함'],
          ["When her friend got the role she had wanted, Yuna couldn't stop thinking, \"Why her and not me?\"", 'jealous', ['grateful', 'relieved', 'proud'], '원하던 역할을 친구가 맡자 "왜 내가 아니라 쟤야?"라고 계속 생각함'],
          ['A stranger returned the wallet that Jiwoo had dropped on the bus. Jiwoo bowed and said "thank you" again and again.', 'grateful', ['jealous', 'annoyed', 'lonely'], '잃어버린 지갑을 돌려받고 거듭 고개 숙여 감사 인사를 함'],
          ["Tomorrow is the first day of the trip to Jeju. Hayun packed her bag three times and couldn't fall asleep, smiling to herself.", 'excited', ['bored', 'lonely', 'disappointed'], '여행 전날 가방을 세 번이나 싸고 혼자 웃으며 잠을 못 이룸'],
          ["The music next door was so loud that Taeho couldn't concentrate. He kept covering his ears and frowning.", 'annoyed', ['grateful', 'proud', 'relieved'], '옆집 음악이 시끄러워 귀를 막고 얼굴을 찌푸림'],
          ['Junho thought, "If only I had told the truth, my friend would still trust me."', 'regretful', ['proud', 'excited', 'relieved'], '"진실을 말했더라면 친구가 여전히 나를 믿을 텐데"라고 생각함'],
          ['Nothing happened during the long meeting. Eunji kept looking at the clock and yawning.', 'bored', ['frightened', 'proud', 'grateful'], '긴 회의 동안 계속 시계를 보며 하품을 함'],
          ['Dahye opened the box and found a handwritten letter from her best friend. Tears of joy filled her eyes.', 'moved', ['annoyed', 'bored', 'jealous'], '가장 친한 친구의 손편지를 읽고 기쁨의 눈물을 흘림'],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var pick = R.choices(correct, R.shuffle(it[2].slice()));
        return {
          type: 'choice', concept: 1,
          q: '다음 글에 드러난 인물의 심경으로 가장 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : '이 글에는 "' + c + '"(' + KO[c] + ') 감정을 보여 주는 단서가 없습니다. 글의 단서: ' + it[3]; }),
          explain: '단서: ' + it[3] + ' → **' + correct + '**(' + KO[correct] + ')',
        };
      },
    },
    {
      id: 'trait-from-action',
      level: 2,
      title: '말과 행동으로 인물의 성격 추론하기',
      make: function (R) {
        // [말·행동, 정답, 오답 3개, 근거(우리말)]
        var items = [
          ['Even though she was tired, Sua helped her neighbor carry heavy boxes up the stairs.', 'kind', ['selfish', 'lazy', 'rude'], '피곤한데도 이웃의 무거운 상자를 계단 위로 날라 줌'],
          ['Minsu found a wallet with a lot of money and took it straight to the police station.', 'honest', ['greedy', 'careless', 'cowardly'], '돈이 많이 든 지갑을 곧장 경찰서에 가져다줌'],
          ['Doyun practiced the same piano piece every day for three months until he got it right.', 'patient', ['lazy', 'careless', 'impatient'], '같은 곡을 석 달 동안 매일, 제대로 칠 때까지 연습함'],
          ['Hayun always asks "Why?" and loves taking things apart to see how they work.', 'curious', ['selfish', 'rude', 'cowardly'], '늘 "왜?"라고 묻고 물건이 어떻게 움직이는지 분해해 봄'],
          ['While everyone else stayed silent, Seojun stood up and told the older students to stop teasing a new classmate.', 'brave', ['cowardly', 'lazy', 'selfish'], '다른 사람들이 모두 가만히 있을 때 혼자 나서서 새 친구를 놀리는 선배들에게 그만하라고 말함'],
          ['Jia ate all the snacks by herself and did not share any with her little brother.', 'selfish', ['generous', 'kind', 'polite'], '과자를 혼자 다 먹고 동생에게 하나도 나눠 주지 않음'],
          ['Taeho left his bag on the bus again. It was the third time this month.', 'careless', ['careful', 'brave', 'generous'], '이번 달에만 세 번째로 버스에 가방을 두고 내림'],
          ['Yuna gave half of her lunch to a classmate who had forgotten his.', 'generous', ['selfish', 'rude', 'greedy'], '도시락을 잊은 반 친구에게 자기 점심의 절반을 나눠 줌'],
          ['Junho shouted at the waiter and never said "please" or "thank you."', 'rude', ['polite', 'kind', 'humble'], '종업원에게 소리치고 부탁이나 감사의 말을 전혀 하지 않음'],
          ['Even after winning the contest, Eunji said, "I was just lucky. Everyone did a great job."', 'humble', ['arrogant', 'rude', 'selfish'], '대회에서 이기고도 "운이 좋았을 뿐, 모두 잘했다"고 말함'],
          ["Mina refused to change her plan, even when everyone showed her that it wouldn't work.", 'stubborn', ['flexible', 'generous', 'cowardly'], '모두가 안 될 거라고 보여 줘도 계획을 바꾸기를 거부함'],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var pick = R.choices(correct, R.shuffle(it[2].slice()));
        return {
          type: 'choice', concept: 2,
          q: '다음 글에서 알 수 있는 인물의 성격으로 가장 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : '이 글에는 "' + c + '"(' + KO[c] + ') 성격을 뒷받침하는 말이나 행동이 없습니다. 글의 근거: ' + it[3]; }),
          explain: '근거가 되는 행동: ' + it[3] + ' → **' + correct + '**(' + KO[correct] + ')',
        };
      },
    },
  ],

  vocab: [
    { w: 'character', m: '등장인물; 성격', ex: 'Sua is the main character of the story.', exm: '수아는 그 이야기의 주인공이다.' },
    { w: 'setting', m: '배경(때와 장소)', ex: 'The setting of the story is a small village in winter.', exm: '그 이야기의 배경은 겨울의 작은 마을이다.' },
    { w: 'plot', m: '줄거리, 구성', ex: 'The plot became exciting when the cards flew everywhere.', exm: '카드가 사방으로 날아가면서 줄거리가 흥미진진해졌다.' },
    { w: 'conflict', m: '갈등', ex: 'The main conflict is between the boy and his fear.', exm: '중심 갈등은 소년과 그의 두려움 사이에 있다.' },
    { w: 'nervous', m: '긴장한, 초조한', ex: 'I always feel nervous before a test.', exm: '나는 시험 전에 늘 긴장한다.' },
    { w: 'relieved', m: '안도한', ex: 'Mr. Han was relieved to find his dog.', exm: '한 씨 아저씨는 개를 찾고 안도했다.' },
    { w: 'embarrassed', m: '당황한, 창피한', ex: 'She was embarrassed when she tripped on the stairs.', exm: '그녀는 계단에서 넘어졌을 때 창피했다.' },
    { w: 'disappointed', m: '실망한', ex: 'We were disappointed that the picnic was canceled.', exm: '우리는 소풍이 취소되어 실망했다.' },
    { w: 'grateful', m: '고마워하는', ex: 'I am grateful for your help.', exm: '도와줘서 고마워.' },
    { w: 'delighted', m: '아주 기쁜', ex: 'Hayun was delighted to make a new friend.', exm: '하윤은 새 친구를 사귀어 무척 기뻤다.' },
    { w: 'courage', m: '용기', ex: 'It takes courage to speak in front of many people.', exm: '많은 사람 앞에서 말하려면 용기가 필요하다.' },
    { w: 'applause', m: '박수(갈채)', ex: 'The hall burst into applause.', exm: '강당에 박수갈채가 터졌다.' },
    { w: 'shiver', m: '(추위·두려움으로) 떨다', ex: 'The wet dog was shivering in the rain.', exm: '젖은 개가 빗속에서 떨고 있었다.' },
    { w: 'remind', m: '떠올리게 하다', ex: 'This song reminds me of my childhood.', exm: '이 노래는 내 어린 시절을 떠올리게 한다.' },
    { w: 'relate to', m: '~에 공감하다', ex: 'I could relate to the main character.', exm: '나는 주인공에게 공감할 수 있었다.' },
    { w: 'impressed', m: '감명받은, 인상 깊게 여기는', ex: 'I was impressed by her calm voice.', exm: '나는 그녀의 차분한 목소리가 인상 깊었다.' },
  ],
});
})();
