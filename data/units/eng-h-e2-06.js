/* 영어Ⅱ · 긴 이야기 읽고 감상 쓰기
 * 이야기·감상문은 모두 직접 쓴 글이다(가상의 인물·장소). */
(function () {
  // 이야기 1: 시계방 (문단 순서가 섞여 있다. 바른 순서: A → D → B → C)
  var PA = '(A) Taemin passed the small clock shop on the corner every day on his way to school, but he had never gone inside. Then one rainy afternoon, the old watch that his late grandfather had given him stopped working. He carried it to the shop. Mr. Baek, the white-haired owner, opened the back of the watch and frowned. "This needs a part that nobody makes anymore," (a) __he__ said. Seeing Taemin\'s face fall, the old man paused. "I can\'t promise anything," he added, "but if you come after school, you can help me try to make the part by hand."';
  var PB = '(B) Finally, after many failures, the new part was ready. Mr. Baek placed it inside the watch with steady hands and passed the watch to Taemin. "You put the last screw in," (b) __he__ said. When the second hand began to move again, Taemin felt as if his grandfather were sitting beside him. He thanked Mr. Baek again and again and asked how much he owed. The old man shook his head. "You\'ve already paid me," he said. "Three weeks of hard work is enough."';
  var PC = '(C) A month later, a sign appeared in the shop window: "Closed for a few days." Taemin learned from a neighbor that Mr. Baek was in the hospital, and he went to visit him with a bag of oranges. Lying in bed, the old man looked smaller than before, but (c) __he__ smiled when he saw the boy. "Who will take care of the clocks while I\'m stuck here?" he joked. Taemin took out a notebook full of drawings of gears and tools. "I\'ve been practicing," he said. "When you come back, will you teach me more?" Mr. Baek closed his eyes and nodded slowly, still smiling.';
  var PD = '(D) For the next three weeks, Taemin came to the shop every day. At first, (d) __he__ was only allowed to sweep the floor and sort tiny screws, and he secretly wondered if the old man just wanted free help. But soon Mr. Baek began to explain each tool, and Taemin found himself watching the tiny gears for hours. One evening, Taemin dropped a spring that they had spent two days making, and it rolled somewhere under the workbench. He waited for the old man to shout. Instead, Mr. Baek laughed and said that (e) __he__ had lost dozens of springs when he was a boy. Then he handed Taemin a magnifying glass. "Let\'s find it together."';
  var CLOCK = PA + '\n\n' + PB + '\n\n' + PC + '\n\n' + PD;

  // 이야기 2: 옥상 텃밭 (문단 순서가 섞여 있다. 바른 순서: A → C → D → B)
  var GARDEN = '(A) When Grandma Yoon moved into the apartment next door, Sena thought she was a little strange. Every morning, the old woman carried buckets of soil up to the rooftop, a place that nobody else ever used.\n\n' +
    '(B) By the end of summer, the rooftop was full of tomatoes, peppers, and sunflowers. Neighbors who had never spoken to each other began meeting there in the evenings, sharing vegetables and stories. Sena brought her younger sister, Dami. The little girl had never seen a tomato plant before, so Grandma Yoon showed (b) __her__ how to tell when a tomato was ready to pick.\n\n' +
    '(C) One Saturday, Sena\'s curiosity finally won. She followed Grandma Yoon up the stairs and found rows of small pots lined up against the wall. "Want to help?" (a) __she__ asked, handing Sena a little shovel. Sena hesitated for a moment, then nodded.\n\n' +
    '(D) For weeks, Sena watered the pots every afternoon after school. At first, nothing seemed to happen, and she began to wonder if the seeds had died. Then one morning, tiny green leaves appeared, and Grandma Yoon clapped her hands like a child.';

  // 감상문 (직접 쓴 글)
  var RESPONSE = 'In the story, a young student and an old watchmaker spend three weeks making a part for a broken watch. The scene that moved me most was when Mr. Baek said, "You\'ve already paid me." It showed that he valued the boy\'s effort more than money. This story reminded me of my grandmother, who taught me to cook her kimchi stew step by step. Like Mr. Baek, she never simply did things for me; she let me try and fail. The story also made me think that some traditional skills could disappear if no young people learn them. After reading it, I want to spend more time learning from the older people around me.';

Tutor.registerUnit({
  id: 'eng-h-e2-06',
  course: 'eng-h-e2',
  title: '긴 이야기 읽고 감상 쓰기',
  summary: '긴 이야기에서 사건 순서와 인물을 정리하고, 내 경험과 지식에 이어 감상을 씁니다.',
  goals: [
    '여러 문단으로 나뉜 이야기를 시간 표현·지시어·인과 관계를 단서로 바른 순서로 배열할 수 있다.',
    '밑줄 친 he·she(그·그녀)가 가리키는 인물을 문맥으로 구별할 수 있다.',
    '인물의 말과 행동에서 심정 변화·의도·인물 사이의 관계를 파악하고, 세부 내용의 일치 여부를 판단할 수 있다.',
    '이야기를 내 경험·다른 글·세상일과 연결해 근거가 있는 감상을 영어로 쓸 수 있다.',
  ],
  standards: ['[12영Ⅱ-01-01]', '[12영Ⅱ-01-03]', '[12영Ⅱ-02-02]'],

  concepts: [
    {
      title: '여러 문단 이야기의 사건 순서 정하기',
      body: '긴 이야기 문제에서는 첫 문단 (A) 뒤에 나머지 문단의 순서가 섞여 나옵니다. 순서는 느낌이 아니라 **문단 첫머리와 끝의 단서**로 정합니다.\n\n' +
        '| 단서 | 예 | 알려 주는 것 |\n|---|---|---|\n' +
        '| **시간 표현** | For the next three weeks, Finally, A month later, The next morning | 앞 문단과의 시간 간격 |\n' +
        '| **정관사·지시어** | **the** new part, **that** spring, **this** idea | 앞에서 이미 나온 것 → 그것이 처음 나온 문단 뒤에 온다 |\n' +
        '| **원인과 결과** | 초대(come after school) → 매일 옴(came every day) | 원인 문단이 먼저 |\n' +
        '| **인물이 아는 것** | 이름을 소개하는 문단 → 이름을 그냥 부르는 문단 | 처음 만남이 먼저 |\n\n' +
        '시계방 이야기에서 (A)는 "방과 후에 와서 함께 부품을 만들어 보자"는 초대로 끝납니다. 그 초대에 바로 이어지는 문단의 첫 문장: **For the next three weeks, Taemin came to the shop every day.** 그다음 Finally(드디어)로 시작하는 문단은 부품을 만드는 과정 **뒤에**, A month later(한 달 뒤)로 시작하는 문단은 그보다 더 뒤에 옵니다.\n\n' +
        '> 💡 문단을 하나 정할 때마다 "앞 문단의 끝과 이 문단의 첫 문장이 자연스럽게 이어지는가?"를 소리 내어 확인하십시오.',
      easy: '네 컷 만화가 섞여 있다고 생각해 보십시오. "시계가 고장 남 → 매일 가게에 옴 → 부품 완성 → 한 달 뒤 병문안". 컷마다 "그다음 날", "드디어", "한 달 뒤" 같은 말이 붙어 있으면 순서를 맞추기 쉽지요.\n\n' +
        '영어 이야기에서도 문단 첫머리의 Finally, A month later 같은 말과, 앞에서 나온 것을 다시 가리키는 the 가 그런 꼬리표 역할을 합니다.',
      check: {
        type: 'choice',
        q: '어떤 문단의 첫 문장이 다음과 같습니다.\n\nFinally, after many failures, the new part was ready.\n\n이 문단 바로 앞에 올 문단의 내용으로 가장 알맞은 것은 무엇입니까?',
        choices: [
          '부품을 만들려고 여러 번 애쓰는 과정',
          '부품이 완성된 지 한 달 뒤의 일',
          '시계가 고장 나기 전, 가게 앞을 지나다니기만 하던 날들',
        ],
        answer: 0,
        why: ['', 'A month later처럼 완성 뒤의 일은 이 문단보다 뒤에 와야 합니다.', '고장 전의 일상은 이야기의 맨 처음이라, 부품 완성 바로 앞에 오기에는 너무 이릅니다. 그 사이에 부품을 만드는 과정이 있어야 합니다.'],
        explain: '**Finally**(드디어)와 **after many failures**(여러 번 실패한 끝에)는 바로 앞에 "부품을 만들려고 애쓰는 과정"이 있었다는 신호입니다. **the** new part의 the도 그 부품이 앞에서 이미 나왔다는 것을 보여 줍니다.',
      },
    },
    {
      title: '밑줄 친 he·she(그·그녀)가 가리키는 인물 구별하기',
      body: '등장인물 둘이 같은 성별이면 he·she(그·그녀)가 누구인지 헷갈리기 쉽습니다. 이때는 **가장 가까운 이름**이 아니라 **문장의 뜻**으로 판단합니다.\n\n' +
        '1. **말한 사람 확인**: "…," he said.의 he(그)는 그 따옴표 안의 말을 한 사람입니다. 말의 내용(This needs a part …)을 누가 할 만한지 보십시오.\n' +
        '2. **행동할 수 있는 사람 확인**: was only allowed to sweep the floor(바닥 쓸기만 허락받았다)는 가게 주인이 아니라 일을 배우러 온 사람에게 맞습니다.\n' +
        '3. **이름을 넣어 다시 읽기**: 밑줄 자리에 두 인물의 이름을 하나씩 넣어 읽어 보고, 이야기와 맞는 쪽을 고릅니다.\n' +
        '4. **간접 화법 주의**: Mr. Baek laughed and said that **he** had lost dozens of springs when he was a boy.의 he(그)는 that절 안의 말을 한 사람, 곧 백 씨(Mr. Baek)입니다.\n\n' +
        '| 밑줄 | 이름을 넣어 보면 | 가리키는 인물 |\n|---|---|---|\n' +
        '| "This needs a part …," (a) __he__ said. | 시계를 열어 본 백 씨가 한 말 | Mr. Baek |\n' +
        '| At first, (d) __he__ was only allowed to sweep … | 일을 배우러 온 Taemin | Taemin |\n\n' +
        '> ⚠️ "가리키는 대상이 나머지 넷과 다른 것" 문제는 다섯 개를 모두 확인한 뒤 고르십시오. 처음 세 개만 보고 정하면 틀리기 쉽습니다.',
      easy: '"민수가 아빠에게 전화했다. 그는 회의 중이라 받지 못했다." 여기서 "그"는 바로 앞의 아빠일 수도, 민수일 수도 있지만, "회의 중"이라는 말을 보면 아빠라는 것을 알 수 있지요.\n\n' +
        'he·she도 똑같습니다. 가장 가까운 이름에 무조건 붙이지 말고, 그 문장에서 하는 일이나 하는 말이 **누구에게 어울리는지** 따져 보십시오.',
      check: {
        type: 'choice',
        q: '밑줄 친 she(그녀)가 가리키는 인물은 누구입니까?\n\nMina called her grandmother every Sunday evening. One week, __she__ did not answer the phone, so Mina took the bus to her house to check on her.',
        choices: ['Mina\'s grandmother', 'Mina', 'Mina\'s friend who rode the bus'],
        answer: 0,
        why: ['', '미나는 전화를 건 사람입니다. 전화를 받지 않은 사람은 걸려 온 전화를 받아야 할 사람입니다.', '버스를 탄 친구는 글에 나오지 않습니다. 버스를 탄 사람은 Mina 자신입니다.'],
        explain: '전화를 **건** 사람은 미나이고, 전화를 **받지 않은** 사람은 할머니입니다. 그래서 미나가 확인하러 할머니 댁에 갔다는 뒤의 내용과도 맞습니다.',
      },
    },
    {
      title: '인물의 심정·의도와 관계 파악하기',
      body: '이야기는 인물의 마음을 직접 말하기보다 **표정·행동·말**로 보여 줍니다. 단서를 모아 심정과 의도를 추론합니다.\n\n' +
        '| 단서 (본문) | 추론 |\n|---|---|\n' +
        '| Seeing Taemin\'s face fall | 태민은 **실망했다(disappointed)** |\n' +
        '| he secretly wondered if the old man just wanted free help | 처음에는 **의심했다(doubtful, suspicious)** |\n' +
        '| He waited for the old man to shout. → Mr. Baek laughed | **긴장(nervous)** → **안도(relieved)** |\n' +
        '| "You\'ve already paid me." | 백 씨의 **의도**: 돈보다 소년의 노력을 귀하게 여긴다 |\n\n' +
        '**심정 변화**는 이야기 앞부분과 뒷부분의 단서를 짝지어 "A → B" 꼴로 정리합니다. **의도**는 "왜 그렇게 말하거나 행동했을까?"를 묻고, 그 결과로 무엇이 달라졌는지 봅니다.\n\n' +
        '**인물 사이의 관계**도 변합니다. 시계방 이야기에서 두 사람은 **손님과 가게 주인**으로 만나, **스승과 제자**처럼 되고, 마지막에는 태민이 병문안을 가서 "더 가르쳐 주세요"라고 할 만큼 가까워집니다.\n\n' +
        '> 💡 심정 낱말은 비슷한 것끼리 구별해 두십시오: relieved(걱정이 풀려 안도한) / satisfied(만족한), doubtful(의심하는) / curious(궁금한), determined(굳게 결심한) / hopeless(희망이 없는).',
      easy: '친구가 시험지를 받자마자 가방에 넣고 말없이 창밖만 본다면, "나 실망했어"라고 말하지 않아도 기분을 알 수 있지요.\n\n' +
        '이야기 속 인물도 같습니다. 얼굴빛이 어두워졌다(face fell), 소리치기를 기다렸다(waited for him to shout), 웃었다(laughed) 같은 행동을 모으면 마음이 보입니다.',
      check: {
        type: 'choice',
        q: '다음 부분에서 태민의 심정 변화로 가장 알맞은 것은 무엇입니까?\n\nTaemin dropped a spring that they had spent two days making. He waited for the old man to shout. Instead, Mr. Baek laughed and said that he had lost dozens of springs when he was a boy.',
        choices: ['nervous → relieved', 'excited → disappointed', 'relieved → angry'],
        answer: 0,
        why: ['', '처음에 신이 났다는 단서도, 나중에 실망했다는 단서도 없습니다.', '처음부터 안도한 것이 아니라 혼날까 봐 긴장했습니다. 또 웃는 백 씨를 보고 화가 날 까닭이 없습니다.'],
        explain: '스프링을 잃어버리고 **혼날까 봐 기다린(waited for the old man to shout)** 것은 긴장(nervous), 백 씨가 **웃으며 자기도 많이 잃어버렸다고 말해 준** 뒤에는 안도(relieved)입니다.',
      },
    },
    {
      title: '세부 내용 일치 확인하기',
      body: '"글의 내용과 일치하지 않는 것" 문제는 선택지 하나하나를 **본문의 해당 문장과 1:1로** 맞춰 봅니다. 기억에 기대면 틀리기 쉽습니다.\n\n' +
        '1. 선택지는 대개 **본문 순서대로** 나옵니다. 앞 선택지는 앞 문단에서, 뒤 선택지는 뒤 문단에서 찾습니다.\n' +
        '2. 선택지는 본문을 **바꿔 쓴(paraphrase)** 문장입니다. 낱말이 달라도 뜻이 같으면 일치입니다. (came to the shop every day ≈ 매일 가게에 갔다)\n' +
        '3. 틀린 선택지는 보통 **한 곳만** 바꿉니다. 누가(Taemin ↔ Mr. Baek), 몇(three weeks ↔ three days), 어떻게(by hand ↔ bought), 부정(had never ↔ had often)을 확인하십시오.\n\n' +
        '| 선택지 | 본문 | 판단 |\n|---|---|---|\n' +
        '| 태민은 전에 그 가게에 자주 들어가 보았다. | he had **never** gone inside | 불일치 (부정을 바꿈) |\n' +
        '| 백 씨는 없는 부품을 다른 가게에서 사 왔다. | try to make the part **by hand** | 불일치 (방법을 바꿈) |\n' +
        '| 태민은 오렌지를 들고 병문안을 갔다. | visit him with a bag of oranges | 일치 |\n\n' +
        '> ⚠️ "본문에 나오지 않는 내용"도 불일치입니다. 그럴듯해 보여도 근거 문장이 없으면 고르지 마십시오.',
      easy: '"틀린 그림 찾기"를 떠올려 보십시오. 두 그림이 거의 같은데 한 군데만 다릅니다. 선택지도 본문을 거의 그대로 옮기고 **한 군데만** 바꿔 놓은 경우가 많습니다.\n\n' +
        '그래서 선택지를 읽으면 본문에서 그 자리를 찾아가, 사람·수·방법·부정어를 하나씩 비교하면 됩니다.',
      check: {
        type: 'ox',
        q: '시계방 이야기의 내용과 일치한다.\n\n→ Taemin had often gone into the clock shop before his watch stopped.\n\n' + PA,
        answer: false,
        explain: '본문은 Taemin passed the shop every day …, but he **had never gone inside**(한 번도 들어가 본 적이 없다)라고 했습니다. 선택지는 never(한 번도 ~않다)를 often(자주)으로 바꾼 불일치입니다.',
      },
    },
    {
      title: '경험·다른 글·세상일과 연결해 감상 쓰기',
      body: '좋은 감상문은 "재미있었다"로 끝나지 않고, 이야기를 **나와 세상에 연결**합니다. 연결에는 세 가지 길이 있습니다.\n\n' +
        '| 연결 | 무엇과 잇나 | 표현 예 |\n|---|---|---|\n' +
        '| **나와 연결** (text-to-self) | 내 경험·감정 | This story **reminded me of** the time I … / I **could relate to** Taemin because … |\n' +
        '| **다른 글과 연결** (text-to-text) | 읽은 책·영화·다른 이야기 | **Like** the boy in another story I read, … / This is **similar to** … |\n' +
        '| **세상과 연결** (text-to-world) | 사회 현상·뉴스·세상일 | This **made me think about** … in our society. / **In the real world**, … |\n\n' +
        '감상문은 보통 이렇게 짭니다.\n\n' +
        '1. **짧은 줄거리**: 누가 무엇을 했는지 한두 문장 (전체를 다시 쓰지 않는다)\n' +
        '2. **인상 깊은 장면과 까닭**: The scene that moved me most was … It showed that …\n' +
        '3. **연결**: 나·다른 글·세상 가운데 하나 이상\n' +
        '4. **배운 점·다짐**: After reading it, I want to … / I learned that …\n\n' +
        '공통영어2에서 배운 가정법도 쓸모가 있습니다: **If I were** Taemin, I **would** … (인물의 처지에서 생각해 보기)\n\n' +
        '> 💡 "감동적이었다(It was touching.)"만 쓰지 말고 **어느 장면이, 왜** 감동적이었는지 본문의 근거를 붙이십시오.',
      easy: '친구에게 영화 이야기를 할 때 "재밌었어"보다 "주인공이 포기하려다 동생 응원을 보고 다시 일어나는 장면에서 울컥했어. 나도 작년에 대회에서 그랬거든."이라고 하면 훨씬 생생하지요.\n\n' +
        '감상문도 같습니다. **어느 장면**이 **왜** 좋았는지, 그리고 그게 **내 경험이나 다른 이야기, 세상일**과 어떻게 이어지는지를 쓰면 됩니다.',
      check: {
        type: 'choice',
        q: '감상문의 다음 문장은 어떤 연결에 해당합니까?\n\nThis story reminded me of the summer my grandfather taught me how to fix my bike.',
        choices: ['나와 연결 (text-to-self)', '다른 글과 연결 (text-to-text)', '세상과 연결 (text-to-world)'],
        answer: 0,
        why: ['', '다른 책이나 영화가 아니라 글쓴이 자신의 경험입니다.', '사회 현상이나 뉴스가 아니라 글쓴이 자신의 경험입니다.'],
        explain: '할아버지가 자전거 고치는 법을 가르쳐 준 **글쓴이 자신의 경험**에 이야기를 이었으므로 **나와 연결**(text-to-self)입니다. 이런 연결에는 reminded me of 같은 표현이 자주 쓰입니다.',
      },
    },
  ],

  examples: [
    {
      q: '시계방 이야기의 문단 (B), (C), (D)를 (A) 뒤에 이어질 순서대로 정리해 보십시오.\n\n' + CLOCK,
      steps: [
        '(A)의 끝: 백 씨가 "방과 후에 와서 부품을 손으로 만들어 보자"고 초대합니다.',
        '(D)의 첫 문장(For the next three weeks, Taemin came to the shop every day.)은 그 초대에 대한 결과입니다. → (A) 다음은 (D).',
        '(B)의 첫 문장(Finally, after many failures, **the** new part was ready.)은 (D)에서 부품을 만들며 실패한(스프링을 잃어버린) 과정 뒤에 옵니다. (B)의 Three weeks of hard work도 (D)의 첫머리 For the next three weeks 부분과 맞습니다. → (D) 다음은 (B).',
        '(C)의 A month later(한 달 뒤)는 시계를 고친 뒤 한 달이 지난 때입니다. → 마지막은 (C).',
        '확인: 고장 → 3주 동안 함께 만듦 → 완성과 감사 → 한 달 뒤 병문안. 시간 순서와 인과가 모두 자연스럽습니다.',
      ],
      answer: '(A) → (D) → (B) → (C)',
    },
    {
      q: '시계방 이야기에 대한 감상문을 네 부분으로 짜 보십시오.\n\n' + RESPONSE,
      steps: [
        '짧은 줄거리: In the story, a young student and an old watchmaker spend three weeks making a part for a broken watch. — 한 문장으로 줄였습니다.',
        '인상 깊은 장면과 까닭: The scene that moved me most was when Mr. Baek said, "You\'ve already paid me." It showed that he valued the boy\'s effort more than money.',
        '나와 연결: This story reminded me of my grandmother, who taught me to cook her kimchi stew step by step. Like Mr. Baek, she … let me try and fail.',
        '세상과 연결: some traditional skills could disappear if no young people learn them.',
        '다짐: After reading it, I want to spend more time learning from the older people around me.',
      ],
      answer: '줄거리 → 인상 깊은 장면과 까닭 → 연결(나·세상) → 다짐',
    },
  ],

  terms: [
    { term: '사건 순서 (sequence of events)', def: '이야기 속 일이 일어난 차례입니다. 시간 표현(Finally, A month later)과 원인·결과로 정합니다.' },
    { term: '지칭 추론', def: '밑줄 친 대명사(he, she, they 등)가 이야기 속 누구를 가리키는지 문맥으로 알아내는 것입니다.' },
    { term: '심정 변화', def: '사건이 흐르며 인물의 마음이 바뀌는 것입니다. 예: nervous(긴장한) → relieved(안도한)' },
    { term: '의도', def: '인물이 어떤 말이나 행동을 한 목적입니다. 예: "You\'ve already paid me." → 돈보다 노력을 귀하게 여긴다는 뜻을 전하려 함' },
    { term: '세부 내용 일치', def: '선택지가 본문의 내용과 맞는지 본문 문장과 하나씩 맞춰 확인하는 것입니다. 누가·몇·어떻게·부정어를 봅니다.' },
    { term: '감상문 (response)', def: '글을 읽고 인상 깊은 부분과 그 까닭, 나와 세상에 이어 생각한 것을 쓴 글입니다.' },
    { term: '나와 연결 (text-to-self)', def: '이야기를 내 경험·감정과 잇는 것입니다. 예: This story reminded me of …' },
    { term: '다른 글과 연결 (text-to-text)', def: '이야기를 다른 책·영화·이야기와 견주어 잇는 것입니다. 예: Like the boy in another story …' },
    { term: '세상과 연결 (text-to-world)', def: '이야기를 사회 현상·세상일과 잇는 것입니다. 예: This made me think about … in our society.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '시계방 이야기의 (A)에서 밑줄 친 (a)가 가리키는 인물은 누구입니까?\n\n' + PA,
      choices: ['Mr. Baek', 'Taemin', 'Taemin\'s late grandfather', 'a customer waiting outside the shop'],
      answer: 0,
      why: [
        '',
        '태민은 시계를 맡긴 사람입니다. 시계 뒤를 열어 보고 "더는 만들지 않는 부품이 필요하다"고 말할 수 있는 사람은 시계를 고치는 사람입니다.',
        '할아버지는 이미 돌아가셨고(late), 시계를 준 사람일 뿐 이 장면에서 말하지 않습니다.',
        '가게 밖에서 기다리는 손님은 이야기에 나오지 않습니다.',
      ],
      explain: '바로 앞 문장에서 **Mr. Baek** … opened the back of the watch and frowned.라고 했고, 더는 만들지 않는 부품이 필요하다는 말(This needs a part that nobody makes anymore)은 시계를 살펴본 사람이 할 말입니다. 그래서 (a)는 **백 씨(Mr. Baek)**입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '시계방 이야기의 (D)에서 밑줄 친 (d)가 가리키는 인물은 누구입니까?\n\n' + PD,
      choices: ['Taemin', 'Mr. Baek', 'Mr. Baek\'s neighbor'],
      answer: 0,
      why: [
        '',
        '백 씨는 가게 주인이라 바닥 쓸기만 "허락받을" 사람이 아닙니다. 오히려 일을 허락해 주는 쪽입니다.',
        '이웃은 (C)에서 백 씨의 입원 소식을 전해 줄 뿐, 가게에서 일하지 않습니다.',
      ],
      explain: 'was only allowed to sweep the floor and sort tiny screws(바닥 쓸기와 나사 고르기만 허락받았다)는 일을 배우러 온 사람의 처지입니다. 뒤의 he secretly wondered if the old man just wanted free help도 태민의 생각이므로 (d)는 **태민(Taemin)**입니다.',
    },
    {
      id: 'p3', level: 2, type: 'choice', concept: 1,
      q: '시계방 이야기에서 밑줄 친 (a)~(e) 가운데 가리키는 대상이 **나머지 넷과 다른** 것은 무엇입니까?\n\n' + CLOCK,
      choices: ['(a)', '(b)', '(c)', '(d)', '(e)'],
      fixed: true,
      answer: 3,
      why: [
        '(a)는 시계를 열어 보고 부품이 없다고 말한 백 씨입니다.',
        '(b)는 "마지막 나사는 네가 끼워라"라고 말하며 시계를 건넨 백 씨입니다.',
        '(c)는 병원 침대에 누워 소년을 보고 웃은 백 씨입니다.',
        '',
        '(e)는 that절의 말을 한 사람, 곧 어릴 때 스프링을 많이 잃어버렸다고 말한 백 씨입니다.',
      ],
      hint: '다섯 개 모두 이름을 넣어 읽어 본 뒤 고르십시오. 간접 화법(said that he …)의 he(그)는 말한 사람입니다.',
      explain: '(a) 부품이 없다고 말한 사람, (b) 마지막 나사를 끼우라고 한 사람, (c) 병상에서 웃은 사람, (e) 어릴 때 스프링을 잃어버렸다고 말한 사람은 모두 **백 씨(Mr. Baek)**입니다. (d)만 바닥 쓸기를 허락받은 **태민(Taemin)**입니다.',
    },
    {
      id: 'p4', level: 2, type: 'choice', concept: 0,
      q: '시계방 이야기에서 (A) 다음에 이어질 내용의 순서로 가장 알맞은 것은 무엇입니까?\n\n' + CLOCK,
      choices: ['(B) - (D) - (C)', '(C) - (B) - (D)', '(C) - (D) - (B)', '(D) - (B) - (C)', '(D) - (C) - (B)'],
      fixed: true,
      answer: 3,
      why: [
        '(B)의 첫 문장(Finally, … the new part was ready)은 부품을 만드는 과정 없이 (A) 바로 뒤에 올 수 없습니다. 그 과정이 (D)입니다.',
        '(C)의 A month later(한 달 뒤)는 시계를 고친 뒤의 일이라 (A) 바로 뒤에 올 수 없습니다.',
        '(C)의 병문안은 시계가 고쳐진 (B)보다 뒤입니다.',
        '',
        '(C)의 A month later(한 달 뒤)는 부품이 완성된 (B)보다 뒤에 와야 합니다.',
      ],
      hint: '(A)의 마지막 말(방과 후에 와서 함께 만들자)에 바로 이어지는 문단을 먼저 찾으십시오.',
      explain: '(A) 초대 → (D) For the next three weeks, 매일 가게에 와서 함께 만듦 → (B) Finally, 부품 완성과 "Three weeks of hard work is enough." → (C) A month later, 병문안. 그래서 **(D) - (B) - (C)**입니다.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 3,
      q: '시계방 이야기의 내용과 일치한다.\n\n→ Mr. Baek bought the missing part from another clock shop.\n\n' + PA,
      answer: false,
      explain: '백 씨는 이 부품을 a part that **nobody makes anymore**(이제 아무도 만들지 않는 부품)라고 하며 you can help me try to **make the part by hand**(그 부품을 손으로 만들어 보자)라고 했습니다. 다른 가게에서 사 올 수 있는 부품이 아니라 손으로 만들어야 하는 부품이므로 불일치입니다. 방법(by hand ↔ bought)을 바꾼 선택지입니다.',
    },
    {
      id: 'p6', level: 2, type: 'choice', concept: 3,
      q: '시계방 이야기의 내용과 **일치하지 않는** 것은 무엇입니까?\n\n' + CLOCK,
      choices: [
        '태민의 시계는 돌아가신 할아버지가 준 것이었다.',
        '태민은 3주 동안 매일 가게에 왔다.',
        '태민은 이틀 걸려 만든 스프링을 작업대 밑으로 떨어뜨렸다.',
        '백 씨는 수리 값으로 돈을 받았다.',
        '태민은 톱니바퀴와 도구 그림이 가득한 공책을 보여 주었다.',
      ],
      answer: 3,
      why: [
        '(A)의 the old watch that his late grandfather had given him 부분과 일치합니다.',
        '(D)의 For the next three weeks, Taemin came to the shop every day. 문장과 일치합니다.',
        '(D)의 dropped a spring that they had spent two days making, and it rolled … under the workbench 부분과 일치합니다.',
        '',
        '(C)의 a notebook full of drawings of gears and tools 부분과 일치합니다.',
      ],
      hint: '선택지마다 본문의 해당 문장을 찾아 사람·수·방법을 비교하십시오.',
      explain: '(B)에서 백 씨는 고개를 저으며 "You\'ve already paid me. Three weeks of hard work is enough."라고 했습니다. **돈을 받지 않고** 3주 동안의 수고로 충분하다고 한 것이므로, 수리 값으로 **돈을 받았다**는 것은 불일치입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 2,
      q: '시계방 이야기의 (D) 앞부분에서 태민이 처음에 느낀 심정으로 가장 알맞은 것은 무엇입니까?\n\nAt first, he was only allowed to sweep the floor and sort tiny screws, and he secretly wondered if the old man just wanted free help.',
      choices: ['doubtful', 'confident', 'grateful', 'jealous'],
      answer: 0,
      why: [
        '',
        '자신감을 보이는 단서가 없습니다. 바닥 쓸기와 나사 고르기만 하며 속으로 의심했습니다.',
        '고마움은 나중에 시계가 고쳐진 (B)에서 드러나는 심정입니다. 이 부분에서는 오히려 의심합니다.',
        '누구를 부러워하거나 시샘하는 단서가 없습니다.',
      ],
      explain: '**secretly wondered if the old man just wanted free help**(노인이 그냥 공짜 일손을 원하는 것은 아닌지 속으로 의심했다)가 단서입니다. 그래서 **doubtful**(의심하는)입니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 2,
      q: '시계방 이야기의 (B)에서 백 씨가 "You\'ve already paid me."라고 말한 의도로 가장 알맞은 것은 무엇입니까?\n\n' + PB,
      choices: [
        '태민의 노력을 값으로 여겨 돈을 받지 않으려고',
        '태민이 몰래 돈을 놓고 갔다는 것을 알리려고',
        '수리비가 이미 너무 비싸 더는 받을 수 없다는 뜻을 전하려고',
        '태민에게 앞으로도 가게에서 무료로 일하라고 시키려고',
      ],
      answer: 0,
      why: [
        '',
        '태민이 돈을 놓고 갔다는 내용은 없습니다. 오히려 얼마를 내야 하는지 묻고 있습니다.',
        '수리비를 받은 적이 없으므로 "이미 비싸다"는 말이 될 수 없습니다.',
        '앞으로 일하라는 말은 없습니다. 뒤의 말(Three weeks of hard work is enough.)은 이미 한 일로 충분하다는 뜻입니다.',
      ],
      hint: '바로 뒤에 이어지는 백 씨의 말을 함께 읽으십시오.',
      explain: '바로 뒤의 **Three weeks of hard work is enough.**(3주 동안 열심히 일한 것으로 충분하다)가 의도를 풀어 줍니다. 백 씨는 소년이 함께 애쓴 시간을 **수리비로 여기고** 돈을 받지 않으려 한 것입니다.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 0,
      q: '시계방 이야기의 사건을 일어난 순서대로 놓으십시오.\n\n' + CLOCK,
      choices: [
        'Taemin\'s watch stopped working.',
        'Taemin lost a spring under the workbench.',
        'Taemin put the last screw into the watch.',
        'Mr. Baek was taken to the hospital.',
        'Taemin showed his notebook of drawings.',
      ],
      answer: [0, 1, 2, 3, 4],
      explain: '시계 고장 (A) → 3주 동안 일하다 스프링을 잃어버림 (D) → 부품 완성, 마지막 나사를 끼움 (B) → 한 달 뒤 가게가 닫히고 백 씨가 입원 (C) → 병문안에서 공책을 보여 줌 (C). 문단이 (A)(B)(C)(D) 순서로 적혀 있어도 실제 일어난 순서는 A → D → B → C입니다.',
    },
    {
      id: 'p10', level: 1, type: 'short', check: 'text', concept: 4,
      q: '감상문의 한 문장입니다. 빈칸에 알맞은 영어 낱말 한 개를 쓰십시오.\n\nThis story reminded me [[빈칸]] my grandmother, who taught me how to cook.\n\n(이 이야기는 나에게 할머니를 떠올리게 했다.)',
      answer: ['of'],
      wrong: [
        { a: 'to', why: '"떠올리게 하다"는 remind 사람 of ~ 꼴로 씁니다. 전치사 자리: to ✗ → of ✓ (remind me of ~)' },
        { a: 'about', why: 'remind 사람 about ~은 "~을 잊지 않게 일러 주다"라는 뜻에 가깝습니다. "~을 떠올리게 하다"는 remind 사람 of ~입니다.' },
      ],
      explain: '**remind A of B** 꼴은 "A에게 B를 떠올리게 하다"라는 뜻입니다. 이 문장(This story reminded me **of** my grandmother.)은 이야기를 내 경험에 잇는(text-to-self) 감상문의 대표 표현입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '감상문의 문장 가운데 **세상과 연결(text-to-world)**한 것은 무엇입니까?',
      choices: [
        'It made me worry that some old skills may vanish from our society.',
        'This story reminded me of the summer my uncle taught me how to fish at the lake.',
        'Mr. Baek is like the kind teacher in a novel I read last year.',
        'I could relate to Taemin because I also lost my grandfather.',
      ],
      answer: 0,
      why: [
        '',
        '삼촌과의 여름은 글쓴이 자신의 경험이므로 나와 연결(text-to-self)입니다.',
        '작년에 읽은 소설 속 인물과 견주었으므로 다른 글과 연결(text-to-text)입니다.',
        '할아버지를 잃은 글쓴이 자신의 경험이므로 나와 연결(text-to-self)입니다.',
      ],
      explain: '오래된 기술이 우리 사회에서 사라질 수 있다는 걱정은 **사회 전체의 문제**, 곧 세상일에 이야기를 이은 것입니다. made me worry that …, made me think about … in our society 같은 표현이 세상과 연결할 때 자주 쓰입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '시계방 이야기에서 태민과 백 씨의 관계 변화로 가장 알맞은 것은 무엇입니까?\n\n' + CLOCK,
      choices: [
        'customer and shop owner → teacher and student',
        'teacher and student → strangers who never meet again',
        'old friends → rivals who compete with each other',
        'grandfather and grandson → customer and shop owner',
      ],
      answer: 0,
      why: [
        '',
        '마지막 문단에서 태민은 병문안을 가서 더 가르쳐 달라고 합니다. 관계가 끊긴 것이 아니라 더 가까워졌습니다.',
        '두 사람은 처음에 모르는 사이였고, 서로 겨루는 장면이 없습니다.',
        '백 씨는 태민의 할아버지가 아닙니다. 할아버지는 이미 돌아가셨고(late), 순서도 거꾸로입니다.',
      ],
      hint: '처음 만난 장면과 마지막 장면에서 두 사람이 서로를 어떻게 대하는지 비교하십시오.',
      explain: '처음에는 시계를 맡기러 온 **손님과 가게 주인**이었지만, 3주 동안 도구 쓰는 법을 배우고 마지막에 "When you come back, will you teach me more?"라고 할 만큼 **스승과 제자** 같은 사이가 되었습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '옥상 텃밭 이야기입니다. (A) 다음에 이어질 내용의 순서로 가장 알맞은 것은 무엇입니까?\n\n' + GARDEN,
      choices: ['(B) - (C) - (D)', '(C) - (B) - (D)', '(C) - (D) - (B)', '(D) - (B) - (C)', '(D) - (C) - (B)'],
      fixed: true,
      answer: 2,
      why: [
        '(B)에서는 이미 옥상이 채소로 가득하고 세나가 동생까지 데려옵니다. 세나가 처음 옥상에 따라 올라가는 (C)보다 앞설 수 없습니다.',
        '(D)에서 겨우 첫 싹이 나는데, (B)에서는 이미 옥상이 채소로 가득합니다. (B)가 (D)보다 앞설 수 없습니다.',
        '',
        '(D)의 the pots(그 화분들)는 (C)에서 처음 본 화분들을 가리키고, 세나가 물을 주려면 먼저 돕기로 해야 합니다. (D)가 (C)보다 앞설 수 없습니다.',
        '(D)에서 세나는 이미 화분에 물을 주고 있습니다. 처음 따라 올라가 돕기로 하는 (C)가 먼저입니다.',
      ],
      hint: '세나가 처음 따라 올라간 때, 첫 싹이 난 때, 옥상이 채소로 가득해진 때를 차례로 놓아 보십시오.',
      explain: '(A) 세나는 흙을 나르는 할머니를 이상하게 여김 → (C) **One Saturday**, 호기심을 못 이겨 처음 따라 올라가 화분들을 보고 돕기로 함 → (D) **For weeks**, 날마다 **the pots**(그 화분들)에 물을 주다 첫 싹이 남 → (B) **By the end of summer**, 옥상이 채소로 가득해지고 이웃이 모임. 시간 표현과 정관사, 그리고 변화의 크기(화분 → 싹 → 텃밭)가 순서를 알려 줍니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '옥상 텃밭 이야기에서 밑줄 친 (a), (b)가 가리키는 인물을 바르게 짝지은 것은 무엇입니까?\n\n' + GARDEN,
      choices: [
        '(a) Grandma Yoon — (b) Dami',
        '(a) Sena — (b) Dami',
        '(a) Grandma Yoon — (b) Sena',
        '(a) Sena — (b) Grandma Yoon',
      ],
      answer: 0,
      why: [
        '',
        '(a)는 세나에게 삽을 건네며 "도와줄래?"라고 묻는 사람이라 세나 자신일 수 없습니다.',
        '(b) 바로 앞 문장의 The little girl(그 어린 소녀), 곧 토마토 모종을 처음 본 사람은 동생 다미입니다. 할머니가 토마토 따는 때를 알려 준 대상도 다미입니다.',
        '(a)는 세나에게 묻는 사람이고, (b)의 her(그녀)는 할머니가 무엇을 보여 준 대상이라 할머니 자신일 수 없습니다.',
      ],
      hint: '(a)는 누가 누구에게 삽을 건넸는지, (b)는 바로 앞 문장의 The little girl(그 어린 소녀)이 누구인지 보십시오.',
      explain: '(a) "Want to help?" she asked, **handing Sena** a little shovel. — 세나에게 삽을 건네는 사람은 **윤 할머니(Grandma Yoon)**입니다. (b) Sena brought her younger sister, **Dami**. **The little girl** had never seen a tomato plant before, so Grandma Yoon showed **her** … — 토마토 모종을 처음 본 어린 소녀, 곧 **다미(Dami)**에게 토마토가 익은 때를 알아보는 법을 보여 준 것입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '시계방 이야기의 감상문입니다. 빈칸에 들어갈 문장으로 가장 알맞은 것은 무엇입니까?\n\nThe scene that moved me most was when Taemin showed Mr. Baek his notebook in the hospital. [[빈칸]] I think the old man\'s skill will live on through the boy.',
      choices: [
        'It showed that he wanted to keep learning and give the old man hope.',
        'Taemin visited Mr. Baek in the hospital a month later.',
        'I think oranges are the best fruit to bring when visiting someone in the hospital.',
        'Mr. Baek never taught Taemin anything about clocks.',
      ],
      answer: 0,
      why: [
        '',
        '줄거리를 다시 말했을 뿐, 그 장면이 왜 인상 깊었는지(까닭)를 말하지 않습니다.',
        '이야기와 상관없는 개인 취향입니다. 장면의 의미와 이어지지 않습니다.',
        '본문과 어긋납니다. 백 씨는 (D)에서 도구마다 설명해 주었습니다.',
      ],
      hint: '"인상 깊은 장면" 다음에는 그 장면이 **왜** 인상 깊었는지 보여 주는 문장이 와야 합니다.',
      explain: '감상문은 "인상 깊은 장면 → 그 까닭(It showed that …) → 생각"으로 이어집니다. 공책을 보여 준 장면이 **계속 배우고 싶다는 마음과 노인에게 희망을 주려는 마음**을 보여 주었기에, 뒤의 "노인의 기술이 소년을 통해 이어질 것"이라는 생각이 자연스럽게 따라옵니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '시계방 이야기의 (C)에서 태민이 공책을 꺼내 보이며 "When you come back, will you teach me more?"라고 말한 까닭으로 가장 알맞은 것은 무엇입니까?\n\n' + PC,
      choices: [
        '배움을 이어 가겠다는 뜻으로 노인에게 힘을 주려고',
        '병원비를 갚기 위해 가게를 대신 맡겠다고 약속하려고',
        '자기가 이미 노인보다 시계를 더 잘 고친다는 것을 자랑하려고',
        '노인이 가게를 닫았으니 다른 선생님을 소개해 달라고 부탁하려고',
      ],
      answer: 0,
      why: [
        '',
        '병원비나 가게를 맡겠다는 약속은 본문에 없습니다. 본문에 없는 내용을 덧붙였습니다.',
        '연습해 왔다는 말(I\'ve been practicing)과 더 가르쳐 달라는 말(teach me more)은 아직 더 배워야 한다는 뜻입니다. 자랑과는 거리가 멉니다.',
        '돌아오시면(When you come back)이라는 말은 노인이 돌아올 것을 믿는 말입니다. 다른 선생님을 찾는 것과 반대입니다.',
      ],
      hint: '노인의 농담("Who will take care of the clocks …?")과 마지막 반응(nodded slowly, still smiling)을 함께 보십시오.',
      explain: '노인이 "내가 여기 있는 동안 시계는 누가 돌보나?"라고 농담하자, 태민은 그동안 연습한 공책을 보이며 **돌아오면 더 가르쳐 달라**고 합니다. 배움을 이어 가겠다는 뜻이자, 노인이 **돌아올 이유**를 건넨 말입니다. 노인이 웃으며 고개를 끄덕인 것도 그 마음이 전해졌음을 보여 줍니다.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'text', concept: 3,
      q: '시계방 이야기에서, 백 씨가 시계 수리 값으로 "충분하다"고 한 것은 무엇이었습니까? 본문 (B)에서 찾아 **영어 다섯 낱말**로 쓰십시오.\n\n' + PB,
      answer: ['three weeks of hard work', '3 weeks of hard work'],
      wrong: [
        { a: 'a bag of oranges', why: '오렌지는 (C)에서 병문안 때 가져간 것입니다. 시계 수리 값과는 관계가 없습니다.' },
        { a: 'you have already paid me', why: '이 말은 이미 값을 치렀다는 뜻일 뿐, 무엇으로 치렀는지는 바로 뒤 문장에 나옵니다.' },
      ],
      explain: '(B)의 마지막 문장 "**Three weeks of hard work** is enough."에서 백 씨는 소년이 3주 동안 열심히 일한 것을 수리 값으로 여겼습니다.',
    },
  ],

  deeper: [
    {
      title: '긴 이야기를 읽는 습관: 인물 표 만들기',
      body: '긴 이야기를 읽을 때 머릿속으로만 따라가면 인물과 사건이 쉽게 뒤섞입니다. 읽으면서 아래처럼 **간단한 표**를 만들어 보십시오.\n\n' +
        '| 문단 | 때 | 누가 | 무엇을 | 마음 |\n|---|---|---|---|---|\n' +
        '| (A) | 비 오는 오후 | Taemin, Mr. Baek | 시계를 맡김, 함께 만들자는 제안 | 실망 → 희망 |\n' +
        '| (D) | 그 뒤 3주 | Taemin, Mr. Baek | 일을 배움, 스프링을 잃어버림 | 의심 → 몰입, 긴장 → 안도 |\n' +
        '| (B) | 드디어 | Taemin, Mr. Baek | 부품 완성, 돈을 받지 않음 | 감동·고마움 |\n' +
        '| (C) | 한 달 뒤 | Taemin, Mr. Baek | 병문안, 공책을 보여 줌 | 걱정 → 다짐 |\n\n' +
        '이 표 하나로 순서·지칭·심정·일치 문제를 모두 풀 수 있습니다. 표의 "마음" 칸은 그대로 감상문의 재료가 되기도 합니다.',
    },
    {
      title: '감상문을 더 깊게: 인물의 선택을 평가하기',
      body: '감상문은 "좋았다"에서 한 걸음 더 나아가 **인물의 선택을 평가**할 수 있습니다.\n\n' +
        '- Mr. Baek **could have simply said** that the part was impossible to find. Instead, he chose to teach the boy. (그냥 못 구한다고 말할 수도 있었지만, 가르치는 쪽을 택했다)\n' +
        '- **If I had been** in Taemin\'s place, I **might have given up** after losing the spring. (내가 태민이었다면 스프링을 잃어버린 뒤 포기했을지도 모른다)\n\n' +
        '이처럼 "인물이 할 수 있었던 다른 선택"과 견주면, 그 인물이 실제로 한 선택의 의미가 더 또렷해집니다. could have p.p.(~할 수도 있었다), If I had been …, I might have p.p.(가정법 과거완료)는 공통영어2에서 배운 표현이니 감상문에 활용해 보십시오.',
    },
  ],

  faq: [
    {
      q: '문단 순서 문제에서 단서가 잘 안 보이면 어떻게 해요?',
      a: '먼저 문단마다 첫 문장의 시간 표현(Finally, A month later, The next day)과 정관사·지시어(the new part, that spring)에 표시해 보십시오. 그래도 헷갈리면 문단마다 "인물이 지금 무엇을 알고 있는가, 무엇을 가지고 있는가"를 적어 보면 앞뒤가 정해집니다. 마지막에는 정한 순서대로 처음부터 이어 읽어 어색한 곳이 없는지 확인합니다.',
    },
    {
      q: '대명사 he(그)는 바로 앞에 나온 이름을 가리키는 거 아니에요?',
      a: '그런 경우가 많지만 늘 그렇지는 않습니다. "Mr. Baek laughed and said that he had lost …"의 he(그)는 말한 사람인 백 씨이고, "Seeing Taemin\'s face fall, the old man paused."처럼 한 문장 안에 두 인물이 섞이기도 합니다. 밑줄 자리에 두 이름을 하나씩 넣어 읽어 보고, 그 행동이나 말이 누구에게 맞는지로 판단하십시오.',
    },
    {
      q: '감상문에 줄거리를 얼마나 써야 해요?',
      a: '한두 문장이면 충분합니다. 감상문을 읽는 사람은 이야기를 이미 알고 있다고 생각하고, 줄거리보다 인상 깊은 장면, 그 까닭, 나·다른 글·세상과의 연결, 배운 점에 더 많은 분량을 쓰십시오.',
    },
  ],

  mistakes: [
    '밑줄 친 he·she(그·그녀)를 가장 가까운 이름에 무조건 붙이는 실수 — 그 문장에서 하는 말이나 행동이 누구에게 맞는지로 판단하십시오.',
    '문단 순서를 내용의 느낌으로만 정하는 실수 — Finally, A month later 같은 시간 표현과 the new part 같은 정관사가 확실한 단서입니다.',
    '감상문을 줄거리 요약으로 채우는 실수 — 인상 깊은 장면과 그 까닭, 그리고 나·다른 글·세상과의 연결이 감상문의 중심입니다.',
  ],

  gens: [
    {
      id: 'pronoun-reference',
      level: 2,
      title: '밑줄 친 he·she(그·그녀)가 가리키는 인물',
      make: function (R) {
        // [글, 정답 인물, 오답 인물 2, 근거(우리말)]
        var items = [
          ['Jiho asked his father to help with the science project. __He__ was too busy that night, so Jiho asked his older brother instead.', 'Jiho\'s father', ['Jiho', 'Jiho\'s older brother'], '도움을 부탁받았지만 바빠서 못 도운 사람이라, 지호가 대신 형에게 부탁하게 됨'],
          ['Yuna lent her umbrella to her classmate Somi. The next day, __she__ came to school with a cold because she had walked home in the rain.', 'Yuna', ['Somi', 'Yuna\'s teacher'], '우산을 빌려주었기 때문에 비를 맞고 걸어가 감기에 걸린 사람'],
          ['Minjun had a job interview at nine. At the bus stop, Mr. Choi told him that the bus had already left. __He__ looked at his watch and sighed, knowing he would be late for the interview.', 'Minjun', ['Mr. Choi', 'the bus driver'], '아홉 시에 면접이 있는데 버스를 놓쳐 늦게 될 처지인 사람'],
          ['When Grandma visited, Hayun cooked dinner for the first time. __She__ tasted the soup, smiled, and asked for a second bowl.', 'Grandma', ['Hayun', 'Hayun\'s mother'], '처음 요리한 하윤의 국을 맛보고 한 그릇 더 달라고 한 사람'],
          ['Coach Lee watched Seojun miss the goal again. Instead of shouting, __he__ walked over and showed Seojun how to place his foot.', 'Coach Lee', ['Seojun', 'the goalkeeper'], '다가가서 발 놓는 법을 보여 준 사람(가르치는 쪽)'],
          ['Sujin wrote a letter to her pen pal in Canada. Two weeks later, __she__ received a reply with a photo of a snowy lake.', 'Sujin', ['Sujin\'s pen pal', 'Sujin\'s sister'], '편지를 보낸 뒤 답장을 받은 사람'],
          ['The old fisherman taught Dohyun how to tie a strong knot. Years later, when __he__ became a sailor himself, he still used that knot every day.', 'Dohyun', ['the old fisherman', 'Dohyun\'s captain'], '배운 뒤 몇 년 지나 선원이 된 사람(배운 쪽)'],
          ['Eunji thought her friend Nara was angry with her. But when they finally talked, __she__ explained that she had only been tired from studying late.', 'Nara', ['Eunji', 'Eunji\'s mother'], '화난 것이 아니라 늦게까지 공부해 피곤했을 뿐이라고 설명한 사람(오해를 받은 쪽)'],
          ['Taeho\'s uncle runs a small bakery. Every Saturday, __he__ gets up at five to help his uncle knead the dough and earns some pocket money.', 'Taeho', ['Taeho\'s uncle', 'a customer'], '삼촌 가게 일을 도와 용돈을 버는 사람(가게 주인이 아님)'],
          ['The librarian noticed that Minji had borrowed the same book three times. __She__ smiled and recommended another book by the same writer.', 'the librarian', ['Minji', 'the writer'], '같은 책을 세 번 빌린 것을 알아채고 다른 책을 추천한 사람'],
          ['Junho\'s grandfather could not read well, so every night Junho read the newspaper aloud to him. Slowly, __he__ began to follow the words with his finger.', 'Junho\'s grandfather', ['Junho', 'Junho\'s teacher'], '글을 잘 읽지 못해 손가락으로 글자를 따라가기 시작한 사람'],
          ['Hana beat her best friend Bora in the final race. When Bora cried, __she__ put her medal around Bora\'s neck for a moment and hugged her.', 'Hana', ['Bora', 'the race judge'], '경주에서 이겨 메달을 가진 사람이 우는 친구에게 메달을 걸어 줌'],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var pick = R.choices(correct, it[2].slice(), 3);
        return {
          type: 'choice', concept: 1,
          q: '다음 글에서 밑줄 친 대명사가 가리키는 인물은 누구입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : '그 문장의 말과 행동이 이 인물에게 맞지 않습니다. 근거: ' + it[3]; }),
          explain: '밑줄 자리에 인물의 이름을 하나씩 넣어 읽어 보십시오. 근거: ' + it[3] + '\n\n정답: ' + correct,
        };
      },
    },
    {
      id: 'connection-type',
      level: 1,
      title: '감상문 문장: 어떤 연결인가',
      make: function (R) {
        var TYPES = ['나와 연결 (text-to-self)', '다른 글과 연결 (text-to-text)', '세상과 연결 (text-to-world)'];
        var WHY = [
          '글쓴이 자신의 경험·감정을 말하는 문장이 아닙니다.',
          '다른 책·영화·이야기와 견주는 문장이 아닙니다.',
          '사회 현상이나 세상일과 잇는 문장이 아닙니다.',
        ];
        // [문장, 연결 번호, 근거(우리말)]
        var items = [
          ['This story reminded me of my first day at a new school.', 0, '새 학교 첫날이라는 글쓴이 자신의 경험'],
          ['I could relate to the boy because I also find it hard to ask for help.', 0, '도움을 청하기 어려운 글쓴이 자신의 성격'],
          ['When I read the ending, I remembered how nervous I was at my piano recital.', 0, '피아노 발표회에서 긴장했던 글쓴이의 기억'],
          ['Like the girl in this story, I once got lost in a big city.', 0, '큰 도시에서 길을 잃은 글쓴이의 경험'],
          ['The old watchmaker is similar to the wise teacher in a movie I watched last month.', 1, '지난달에 본 영화 속 인물과 견줌'],
          ['This story has the same message as the fable about the ant and the grasshopper.', 1, '개미와 베짱이 우화와 견줌'],
          ['Unlike the hero of the novel we read in class, Taemin does not give up easily.', 1, '수업에서 읽은 소설의 주인공과 견줌'],
          ['The ending made me think of another short story where a stranger becomes a friend.', 1, '낯선 사람이 친구가 되는 다른 단편 이야기와 견줌'],
          ['This story made me think about how many elderly people live alone in our society.', 2, '우리 사회에서 혼자 사는 노인이라는 사회 현상'],
          ['In the real world, many small family shops are closing because of large stores.', 2, '작은 가게들이 문을 닫는 세상일'],
          ['The story shows a problem that many cities face: neighbors no longer know each other.', 2, '이웃끼리 모르고 지내는 도시의 문제'],
          ['After reading it, I thought about how few young people in our country are learning traditional crafts.', 2, '전통 공예를 배우는 젊은이가 적은 우리 사회의 현실'],
          ['I felt the same way when my best friend moved to another city.', 0, '친한 친구가 이사 갔을 때 글쓴이가 느낀 감정'],
          ['The rooftop garden reminds me of a picture book I loved as a child, about a secret garden.', 1, '어릴 때 좋아한 그림책과 견줌'],
          ['These days, more and more communities are building shared gardens, just like the one in the story.', 2, '공동 텃밭을 만드는 공동체가 늘어나는 세상일'],
        ];
        var it = R.pick(items);
        var correct = TYPES[it[1]];
        var pick = R.choices(correct, TYPES.filter(function (t) { return t !== correct; }), 3);
        return {
          type: 'choice', concept: 4,
          q: '감상문의 다음 문장은 어떤 연결에 해당합니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : WHY[TYPES.indexOf(c)] + ' 이 문장의 근거: ' + it[2]; }),
          explain: '근거: ' + it[2] + ' → ' + correct,
        };
      },
    },
  ],

  vocab: [
    { w: 'sequence', m: '순서, 차례', ex: 'Put the paragraphs in the right sequence.', exm: '문단들을 바른 순서로 놓으십시오.' },
    { w: 'paragraph', m: '문단', ex: 'The second paragraph begins with "Finally."', exm: '둘째 문단의 첫 낱말은 "Finally"입니다.' },
    { w: 'refer to', m: '가리키다, 언급하다', ex: 'Who does "she" refer to in this sentence?', exm: '이 문장에서 she(그녀)는 누구를 가리킵니까?' },
    { w: 'apprentice', m: '견습생, 도제', ex: 'He worked as an apprentice to a carpenter.', exm: '그는 목수 밑에서 견습생으로 일했습니다.' },
    { w: 'workbench', m: '작업대', ex: 'The tools are on the workbench.', exm: '연장들은 작업대 위에 있습니다.' },
    { w: 'magnifying glass', m: '돋보기', ex: 'She looked at the tiny insect through a magnifying glass.', exm: '그녀는 돋보기로 작은 곤충을 들여다보았습니다.' },
    { w: 'doubtful', m: '의심하는, 확신하지 못하는', ex: 'I was doubtful about the plan at first.', exm: '나는 처음에 그 계획을 의심했습니다.' },
    { w: 'relieved', m: '안도한', ex: 'She was relieved to hear that her dog was safe.', exm: '그녀는 개가 무사하다는 말을 듣고 안도했습니다.' },
    { w: 'determined', m: '굳게 결심한', ex: 'He was determined to finish the race.', exm: '그는 경주를 끝까지 마치겠다고 굳게 결심했습니다.' },
    { w: 'hesitate', m: '망설이다', ex: 'Don\'t hesitate to ask questions.', exm: '질문하기를 망설이지 마십시오.' },
    { w: 'curiosity', m: '호기심', ex: 'Her curiosity led her to the rooftop.', exm: '그녀는 호기심에 이끌려 옥상으로 갔습니다.' },
    { w: 'intention', m: '의도', ex: 'His intention was to help, not to judge.', exm: '그의 의도는 판단하는 것이 아니라 돕는 것이었습니다.' },
    { w: 'relationship', m: '관계', ex: 'Their relationship grew closer over the summer.', exm: '여름 동안 그들의 관계는 더 가까워졌습니다.' },
    { w: 'remind', m: '떠올리게 하다', ex: 'The smell of bread reminds me of my grandmother.', exm: '빵 냄새는 나에게 할머니를 떠올리게 합니다.' },
    { w: 'relate to', m: '~에 공감하다', ex: 'Many readers can relate to the main character.', exm: '많은 독자가 주인공에게 공감할 수 있습니다.' },
    { w: 'response', m: '반응; 감상(문)', ex: 'Write a short response to the story.', exm: '그 이야기에 대한 짧은 감상문을 쓰십시오.' },
  ],
});
})();
