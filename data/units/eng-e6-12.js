/* 6학년 영어 · 이야기와 시 즐기기 (시와 이야기는 모두 새로 쓴 글) */
Tutor.registerUnit({
  id: 'eng-e6-12',
  course: 'eng-e6',
  title: '이야기와 시 즐기기',
  summary: '짧은 시를 리듬에 맞춰 읽고, 이야기의 중심 내용과 교훈을 찾으며 뒷이야기를 상상해 봐요.',
  goals: [
    '시에서 반복되는 말과 끝소리가 같은 낱말을 찾아 리듬을 느낄 수 있어요.',
    '중요한 낱말을 세게 읽으며 시를 리듬에 맞춰 소리 내어 읽을 수 있어요.',
    '이야기의 중심 내용과 교훈, 인물의 마음을 찾을 수 있어요.',
    '이야기의 흐름에 맞게 뒷이야기를 상상할 수 있어요.',
  ],
  standards: ['[6영01-09]', '[6영01-02]', '[6영01-05]', '[6영01-07]'],

  concepts: [
    {
      title: '시에서 반복되는 말과 리듬',
      body: '짧은 영어 시를 읽어 봐요.\n\n> **Rain**\n> Rain, rain, on my window,\n> Tap, tap, tap.\n> Rain, rain, on my umbrella,\n> Tap, tap, tap.\n> Rain, rain, on my yellow boots,\n> Splash, splash, splash!\n\n이 시에는 **같은 말이 되풀이**돼요. "Rain, rain"이 1줄·3줄·5줄 처음에 나오고, "Tap, tap, tap."이 두 번 나와요. 같은 말이 반복되면 노래처럼 일정한 박자, 곧 **리듬**이 생겨요.\n\n시의 리듬을 만드는 또 한 가지는 **끝소리가 같은 낱말**이에요. 예를 들어 tree와 me, fly와 sky는 끝소리가 같아요. 줄 끝에 이런 낱말을 두면 읽을 때 소리가 맞아떨어져서 재미있어요.\n\n> 💡 Tap, tap, tap(톡톡톡)이나 Splash(첨벙) 같은 소리 흉내 말도 시를 생생하게 만들어요.',
      easy: '노래 가사를 떠올려 보세요. 같은 부분이 자꾸 나와서 금방 따라 부를 수 있지요?\n\n시도 똑같아요. "Rain, rain"을 손뼉 두 번, "Tap, tap, tap"을 손뼉 세 번에 맞춰 읽어 보세요. 되풀이되는 말 덕분에 몸이 저절로 박자를 타요. 그게 리듬이에요.',
      check: {
        type: 'choice',
        q: '시 "Rain"에서 1줄과 3줄 처음에 되풀이되는 말은 무엇일까요?\n\n> Rain, rain, on my window,\n> Tap, tap, tap.\n> Rain, rain, on my umbrella,\n> Tap, tap, tap.',
        choices: ['Rain, rain', 'on my window', 'umbrella'],
        answer: 0,
        why: [
          '',
          '"on my window"는 한 번만 나와요. 다음 줄은 on my umbrella로 바뀌어요.',
          '"umbrella"는 한 번만 나와요. 여러 번 나오는 말을 찾아요.',
        ],
        explain: '"Rain, rain"이 줄 처음에 되풀이되고, "Tap, tap, tap."도 되풀이돼요. 반복되는 말이 시의 리듬을 만들어요.',
      },
    },
    {
      title: '강세와 리듬에 맞춰 소리 내어 읽기',
      body: '영어 문장을 읽을 때는 모든 낱말을 똑같이 읽지 않아요. **중요한 낱말은 세게(강하게)**, 작은 낱말은 **약하고 빠르게** 읽어요.\n\n| 세게 읽는 낱말 | 약하게 읽는 낱말 |\n|---|---|\n| 이름 낱말: rain, window, boots | a, an, the |\n| 움직임 낱말: tap, fly, sing | on, in, at, to |\n| 꾸미는 말: yellow, soft, big | my, your, and |\n\n예를 들어 아래 줄에서 굵은 낱말을 세게 읽어 봐요.\n\n**Rain**, **rain**, on my **window**,\n\n"on my"는 짧고 가볍게 지나가요. 세게 읽는 낱말에 손뼉을 치면 리듬이 살아나요.\n\n> 💡 window처럼 긴 낱말은 낱말 안에서도 세게 읽는 부분이 있어요. window는 **앞쪽**(win)을 세게 읽어요.',
      easy: '징검다리를 건넌다고 생각해 보세요. 큰 돌(중요한 낱말)에는 쿵 하고 힘주어 밟고, 작은 돌(a, the, on, my)은 살짝 밟고 지나가요.\n\n**Tap**, **tap**, **tap**. — 쿵, 쿵, 쿵!\nRain on the **window** — 살짝, 살짝, 쿵!',
      check: {
        type: 'ox',
        q: '시를 읽을 때 the, on, my 같은 작은 낱말을 가장 세게 읽어요.',
        answer: false,
        explain: 'the, on, my 같은 작은 낱말은 약하고 빠르게 읽어요. rain, window, yellow처럼 뜻을 담은 중요한 낱말을 세게 읽어요.',
      },
    },
    {
      title: '이야기의 중심 내용과 교훈',
      body: '짧은 이야기를 읽어 봐요.\n\n> **Mia and the Sunflower**\n> Mia plants a sunflower seed in a pot. She waters it every day. After a week, nothing is there. Her brother says, "It\'s not going to grow." But Mia doesn\'t give up. She waters it every day. One morning, Mia sees a little green leaf! In summer, a tall sunflower smiles at her.\n\n**중심 내용**은 이야기 전체를 한 문장으로 줄인 거예요. **누가, 무엇을 해서, 어떻게 되었는지**를 찾아요.\n→ 미아가 포기하지 않고 씨앗을 돌봐서 해바라기를 키웠어요.\n\n**교훈**은 이야기가 우리에게 알려 주는 깨달음이에요. 인물이 어떻게 해서 좋은 결과(또는 나쁜 결과)를 얻었는지 생각해 봐요.\n→ **Don\'t give up.** (포기하지 말고 꾸준히 하면 이룰 수 있어요.)',
      easy: '친구에게 이야기를 "딱 한 문장"으로 말해 준다고 생각해 보세요. "미아라는 아이가 매일 물을 줘서 결국 해바라기를 피웠어." — 이게 중심 내용이에요.\n\n그리고 "그래서 나도 이렇게 해야겠다."라고 느낀 것이 교훈이에요. "나도 쉽게 포기하지 말아야겠다."처럼요.',
      check: {
        type: 'choice',
        q: '"Mia and the Sunflower" 이야기의 교훈으로 알맞은 것을 고르세요.',
        choices: ['포기하지 말고 꾸준히 하자.', '다른 사람의 말을 잘 따르자.', '해바라기는 여름에 핀다.'],
        answer: 0,
        why: [
          '',
          '미아는 "안 자랄 거야."라는 말을 듣고도 포기하지 않았어요. 이야기가 말하려는 것은 그 반대예요.',
          '이야기에 나오는 사실이지만 교훈은 아니에요. 교훈은 인물의 행동에서 얻는 깨달음이에요.',
        ],
        explain: '미아는 아무것도 나지 않아도 매일 물을 주었고, 마침내 해바라기를 피웠어요. 그래서 교훈은 "포기하지 말고 꾸준히 하자."예요.',
      },
    },
    {
      title: '인물의 마음과 행동 이해하기',
      body: '이야기 속 인물의 마음은 **말과 행동**에 드러나요. 마음을 나타내는 낱말을 알아 둬요.\n\n| 낱말 | 뜻 | 이런 행동을 해요 |\n|---|---|---|\n| **happy** | 기쁜 | smiles, laughs (웃어요) |\n| **sad** | 슬픈 | cries (울어요) |\n| **worried** | 걱정하는 | Her hands are shaking. (손이 떨려요) |\n| **surprised** | 놀란 | "Wow! Look!" (와! 봐!) |\n| **proud** | 자랑스러운 | "I did it!" (내가 해냈어!) |\n| **angry** | 화난 | shouts, stamps (소리치고 발을 굴러요) |\n\n예: One morning, Mia sees a little green leaf! She jumps and shouts, "Look! A leaf!"\n→ 미아는 깜짝 놀라고 기뻐요(**surprised**, **happy**).\n\n인물의 마음은 이야기가 흘러가며 **바뀌기도** 해요. 처음엔 걱정하다가 끝에서 기뻐지는 것처럼요.',
      easy: '친구 얼굴을 보지 않아도 "엉엉 울었어."라고 하면 슬픈 걸 알 수 있지요?\n\n이야기도 똑같아요. 인물이 **무엇을 했는지**(cries, smiles, jumps)와 **무슨 말을 했는지**("I did it!")를 보면 마음을 알 수 있어요.',
      check: {
        type: 'choice',
        q: '인물의 마음으로 알맞은 것을 고르세요.\n\nTom lost his favorite cap. He cries.',
        choices: ['sad', 'happy', 'proud'],
        answer: 0,
        why: [
          '',
          '가장 좋아하는 모자를 잃어버리고 울고 있어요. 기쁜 마음이 아니에요.',
          'proud(자랑스러운)는 무언가를 해냈을 때의 마음이에요.',
        ],
        explain: '가장 좋아하는 모자를 잃어버렸고(lost), 울어요(cries). 그래서 Tom은 슬퍼요(sad).',
      },
    },
    {
      title: '이야기의 뒷부분 상상하기',
      body: '이야기가 끝난 뒤에 무슨 일이 일어날지 상상해 봐요. 아무렇게나 지어내는 것이 아니라 **두 가지를 지키며** 상상해요.\n\n1. **이야기의 흐름**: 앞에서 일어난 일과 이어져야 해요.\n2. **인물의 성격**: 인물이 지금까지 해 온 행동과 어울려야 해요.\n\n예: "Mia and the Sunflower"는 해바라기가 피는 것으로 끝나요. 가을이 되어 해바라기에 씨앗이 많이 생겼다면, 그다음은?\n\n- Mia plants the seeds again. (미아는 씨앗을 다시 심어요.) → 꾸준히 식물을 돌보는 미아와 어울려요.\n- Mia gives some seeds to her brother. (미아는 brother(오빠나 남동생)에게 씨앗을 나누어 줘요.) → 흐름과 어울려요.\n- Mia throws the sunflower away. (미아는 해바라기를 버려요.) → 정성껏 키운 미아와 **어울리지 않아요.**',
      easy: '드라마 다음 회를 상상하는 것과 같아요. 착한 주인공이 갑자기 아무 까닭 없이 나쁜 일을 하면 "에이, 말이 안 돼!" 하지요?\n\n뒷이야기도 앞 이야기와 **이어지고**, 인물이 **할 법한** 일이어야 해요.',
      check: {
        type: 'ox',
        q: '뒷이야기를 상상할 때는 앞의 이야기와 상관없이 마음대로 지어내도 돼요.',
        answer: false,
        explain: '뒷이야기는 앞에서 일어난 일과 이어지고, 인물의 성격과 어울려야 해요. 그래야 읽는 사람이 고개를 끄덕일 수 있어요.',
      },
    },
  ],

  examples: [
    {
      q: '시를 읽고 반복되는 말, 끝소리가 같은 낱말, 세게 읽을 낱말을 찾아보세요.\n\n> White snow, soft snow,\n> Falling on the tree.\n> White snow, soft snow,\n> Falling down on me.',
      steps: [
        '반복되는 말: 1줄과 3줄의 **White snow, soft snow**가 똑같아요. Falling도 두 번 나와요.',
        '끝소리가 같은 낱말: 2줄 끝의 **tree**와 4줄 끝의 **me**는 끝소리가 같아요.',
        '세게 읽을 낱말: 꾸미는 말(white, soft)과 이름 낱말(snow, tree), 움직임 낱말(falling)을 세게 읽어요.',
        'on, the 같은 작은 낱말은 약하고 빠르게 읽어요: **Falling** on the **tree**.',
      ],
      answer: '반복: White snow, soft snow / 끝소리: tree–me / 세게: white, soft, snow, falling, tree',
    },
    {
      q: '이야기를 읽고 중심 내용과 교훈을 찾아보세요.\n\n> Jun is walking in the park. He sees a small puppy under a bench. It is wet and shaking. Jun puts his jacket on the puppy. Then he looks for the owner. A girl runs to him. "Coco! That\'s my puppy!" She hugs the puppy. "Thank you so much!" Jun smiles.',
      steps: [
        '누가: Jun(준)',
        '무엇을 했나: 젖어서 떨고 있는 강아지에게 겉옷을 덮어 주고, 주인을 찾아 주었어요.',
        '어떻게 되었나: 주인 소녀가 강아지를 다시 만나 고마워했고, 준도 웃었어요.',
        '중심 내용: 준이 길 잃은 강아지를 돌보고 주인을 찾아 주었어요.',
        '교훈: 어려움에 빠진 누군가를 도우면 모두가 행복해져요.',
      ],
      answer: '중심 내용: 준이 길 잃은 강아지의 주인을 찾아 주었어요. / 교훈: 어려움에 빠진 누군가를 돕자.',
    },
  ],

  terms: [
    { term: '시', def: '생각이나 느낌을 짧은 줄로 나누어 리듬 있게 쓴 글이에요. 영어로 poem이라고 해요.' },
    { term: '리듬', def: '말을 읽을 때 느껴지는 일정한 박자예요. 반복되는 말과 끝소리가 같은 낱말이 리듬을 만들어요.' },
    { term: '반복', def: '같은 말을 되풀이하는 것이에요. 예: Rain, rain / Tap, tap, tap' },
    { term: '강세', def: '낱말이나 문장에서 세게 읽는 부분이에요. 중요한 낱말을 세게, a·the·on 같은 작은 낱말은 약하게 읽어요.' },
    { term: '중심 내용', def: '이야기 전체를 한 문장으로 줄인 것이에요. 누가, 무엇을 해서, 어떻게 되었는지를 담아요.' },
    { term: '교훈', def: '이야기가 읽는 사람에게 알려 주는 깨달음이나 가르침이에요. 예: Don\'t give up.' },
    { term: '인물', def: '이야기에 나와서 말하고 행동하는 사람이나 동물이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '시를 읽고 두 번 되풀이되는 말을 고르세요.\n\n> White snow, soft snow,\n> Falling on the tree.\n> White snow, soft snow,\n> Falling down on me.\n> Cold nose, red cheeks,\n> Come and play with me!',
      choices: ['White snow, soft snow', 'Cold nose, red cheeks', 'Come and play', 'on the tree'],
      answer: 0,
      why: [
        '',
        '"Cold nose, red cheeks"는 한 번만 나와요.',
        '"Come and play"는 마지막 줄에 한 번만 나와요.',
        '"on the tree"는 둘째 줄에 한 번만 나와요.',
      ],
      explain: '1줄과 3줄에 "White snow, soft snow"가 똑같이 나와요. 이렇게 되풀이되는 말이 시의 리듬을 만들어요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '시에서 tree와 끝소리가 같은 낱말을 고르세요.\n\n> White snow, soft snow,\n> Falling on the tree.\n> White snow, soft snow,\n> Falling down on me.',
      choices: ['me', 'snow', 'soft', 'down'],
      answer: 0,
      why: [
        '',
        'snow는 소리 내어 읽어 보면 끝소리가 tree와 달라요.',
        'soft는 끝이 t 소리로 끝나서 tree와 달라요.',
        'down은 끝이 n 소리로 끝나서 tree와 달라요.',
      ],
      hint: '줄 끝에 있는 낱말끼리 소리를 비교해 보세요.',
      explain: 'tree와 me는 소리 내어 읽으면 끝소리가 같아요. 그래서 2줄과 4줄 끝이 맞아떨어지며 리듬이 생겨요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 줄을 읽을 때 약하고 빠르게 읽는 낱말을 고르세요.\n\nI like the sun.',
      choices: ['the', 'like', 'sun'],
      answer: 0,
      why: [
        '',
        'like는 움직임(마음)을 나타내는 중요한 낱말이라 세게 읽어요.',
        'sun은 이름 낱말이라 세게 읽어요.',
      ],
      explain: 'the는 뜻보다 문장을 이어 주는 작은 낱말이라 약하고 빠르게 읽어요. like와 sun을 세게 읽어요: I **like** the **sun**.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '"Tap, tap, tap."을 읽을 때 세 번의 tap을 모두 또박또박 세게 읽으면 리듬이 살아나요.',
      answer: true,
      explain: 'tap은 소리를 흉내 내는 중요한 낱말이에요. 손뼉 세 번에 맞춰 세게 읽으면 빗방울 소리의 리듬이 살아나요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '인물의 마음으로 알맞은 것을 고르세요.\n\nIt\'s Ben\'s birthday. His friends give him a big cake. Ben laughs and says, "Thank you!"',
      choices: ['happy', 'sad', 'angry', 'worried'],
      answer: 0,
      why: [
        '',
        '울거나 속상해하는 행동이 없어요. Ben은 웃고(laughs) 있어요.',
        '소리치거나 발을 구르지 않아요. Ben은 고맙다고 말해요.',
        '걱정하는 모습이 없어요. 생일 케이크를 받고 웃어요.',
      ],
      explain: '생일에 친구들이 큰 케이크를 주었고, Ben은 웃으며(laughs) 고맙다고 해요. 그래서 Ben은 기뻐요(happy).',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 3,
      q: '빈칸에 "자랑스러운"이라는 뜻의 영어 낱말을 쓰세요.\n\nMina wins the race. She says, "I did it!" Mina feels [[빈칸]].',
      answer: ['proud'],
      wrong: [
        { a: 'sad', why: '경주에서 이기고 "I did it!(내가 해냈어!)"이라고 했어요. 슬픈 마음이 아니에요.' },
        { a: 'prowd', why: '철자를 확인해 보세요. p-r-o-u-d예요.' },
      ],
      explain: '경주에서 이기고 "내가 해냈어!"라고 말하는 미나는 자랑스러워요. "자랑스러운"은 proud예요.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 2,
      q: '이야기에서 **교훈**이란 무엇일까요?',
      choices: ['이야기가 알려 주는 깨달음이나 가르침', '이야기에 나오는 사람이나 동물', '이야기가 일어나는 장소', '이야기의 제목'],
      answer: 0,
      why: [
        '',
        '이야기에 나오는 사람이나 동물은 "인물"이에요.',
        '이야기가 일어나는 곳은 "배경"이에요.',
        '제목은 이야기의 이름이에요. 교훈은 이야기를 읽고 얻는 깨달음이에요.',
      ],
      explain: '교훈은 이야기를 읽은 사람이 "나도 이렇게 해야겠다."라고 깨닫는 가르침이에요. 예: Don\'t give up.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '이야기를 읽고 중심 내용을 고르세요.\n\n> Jun is walking in the park. He sees a small puppy under a bench. It is wet and shaking. Jun puts his jacket on the puppy. Then he looks for the owner. A girl runs to him. "Coco! That\'s my puppy!" She hugs the puppy. "Thank you so much!" Jun smiles.',
      choices: ['준이 길 잃은 강아지를 돌보고 주인을 찾아 주었어요.', '준이 공원에서 새 겉옷을 샀어요.', '준이 강아지를 집에 데려가 키웠어요.', '소녀가 공원 의자 밑에서 겉옷을 찾았어요.'],
      answer: 0,
      why: [
        '',
        '겉옷을 산 것이 아니라 강아지에게 덮어 주었어요(puts his jacket on the puppy).',
        '준은 강아지를 데려가지 않고 주인(소녀)을 찾아 주었어요.',
        '의자 밑에 있던 것은 겉옷이 아니라 강아지예요.',
      ],
      hint: '누가, 무엇을 해서, 어떻게 되었는지 차례로 찾아보세요.',
      explain: '준은 젖어서 떨고 있는 강아지에게 겉옷을 덮어 주고 주인을 찾아 주었어요. 이것이 이야기 전체를 한 문장으로 줄인 중심 내용이에요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '이야기를 읽고 준이 어떤 사람인지 고르세요.\n\n> Jun is walking in the park. He sees a small puppy under a bench. It is wet and shaking. Jun puts his jacket on the puppy. Then he looks for the owner.',
      choices: ['kind', 'lazy', 'angry', 'scared'],
      answer: 0,
      why: [
        '',
        'lazy(게으른) 사람이라면 그냥 지나쳤을 거예요. 준은 강아지를 돌보고 주인까지 찾았어요.',
        '준이 화를 내는 말이나 행동은 없어요.',
        '준이 무서워하는 모습은 없어요. 오히려 강아지를 돌봐 주었어요.',
      ],
      hint: '준이 한 행동 두 가지를 찾아보세요.',
      explain: '떨고 있는 강아지에게 자기 겉옷을 덮어 주고 주인을 찾아 준 행동을 보면 준은 친절해요(kind).',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '이야기의 뒷부분으로 가장 알맞은 것을 고르세요.\n\n> Jun finds a lost puppy in the park. He puts his jacket on it and looks for the owner. A girl runs to him and hugs the puppy. "Thank you so much!"',
      choices: ['The girl and Jun become good friends.', 'Jun takes the puppy and runs away.', 'The girl is angry at Jun.', 'Jun throws his jacket in the trash.'],
      answer: 0,
      why: [
        '',
        '준은 주인을 찾아 주려고 애썼어요. 강아지를 데리고 도망가는 것은 준의 성격과 어울리지 않아요.',
        '소녀는 고맙다며 강아지를 안았어요. 갑자기 화를 낼 까닭이 없어요.',
        '앞 이야기와 이어지지 않는 내용이에요.',
      ],
      hint: '앞 이야기와 이어지고, 인물이 할 법한 일을 골라요.',
      explain: '소녀가 고마워했고 준은 친절한 사람이니, 두 사람이 친구가 된다는 뒷이야기가 흐름과 인물의 성격에 잘 어울려요.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 2,
      q: '"Mia and the Sunflower" 이야기에서 일어난 일을 순서대로 놓으세요.',
      choices: ['Mia plants a seed.', 'Nothing is there after a week.', 'Mia sees a little green leaf.', 'A tall sunflower smiles at her.'],
      answer: [0, 1, 2, 3],
      hint: '씨앗을 심고 → 기다리고 → 싹이 나고 → 꽃이 피는 차례를 떠올려 보세요.',
      explain: '씨앗을 심어요 → 일주일이 지나도 아무것도 없어요 → 작은 초록 잎을 봐요 → 키 큰 해바라기가 미아에게 웃어요. 식물이 자라는 차례와 같아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '이야기를 읽고 교훈으로 가장 알맞은 것을 고르세요.\n\n> Leo the rabbit and Max the turtle want to cross a river. Leo can jump, but the river is too wide. Max can swim, but he doesn\'t know the way. "I have an idea!" says Leo. Leo sits on Max\'s back. Max swims, and Leo tells him the way. They cross the river together.',
      choices: ['서로 도우면 혼자서 못 하는 일도 할 수 있어요.', '빠른 것이 느린 것보다 좋아요.', '강에서는 수영을 하면 안 돼요.', '토끼는 거북보다 똑똑해요.'],
      answer: 0,
      why: [
        '',
        '이야기에 누가 더 빠른지 겨루는 내용은 없어요. 둘이 힘을 합쳤어요.',
        '거북은 수영을 해서 강을 건넜어요. 수영하지 말라는 내용이 아니에요.',
        '누가 더 똑똑한지가 아니라, 둘이 잘하는 것을 합친 이야기예요.',
      ],
      hint: '레오와 맥스가 각각 잘하는 것과 못하는 것을 찾아보세요.',
      explain: '레오는 강을 뛰어넘지 못하고, 맥스는 길을 몰랐어요. 맥스는 헤엄치고 레오는 길을 알려 주며 함께 건넜어요. 교훈은 "서로 도우면 혼자서 못 하는 일도 할 수 있다."예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '다음 문장을 리듬에 맞춰 읽을 때, 세게 읽는 낱말끼리 바르게 묶은 것을 고르세요.\n\nLook at the big red ball.',
      choices: ['Look, big, red, ball', 'at, the', 'the, ball', 'Look, at, the'],
      answer: 0,
      why: [
        '',
        'at, the는 작은 낱말이라 약하게 읽어요.',
        'ball은 세게 읽지만 the는 약하게 읽어요.',
        'Look은 세게 읽지만 at, the는 약하게 읽어요.',
      ],
      hint: '움직임 낱말, 꾸미는 말, 이름 낱말을 찾아보세요.',
      explain: 'Look(움직임), big·red(꾸미는 말), ball(이름 낱말)을 세게 읽고, at·the는 약하고 빠르게 읽어요: **Look** at the **big** **red** **ball**.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '이야기를 읽고 다나의 마음이 어떻게 바뀌었는지 고르세요.\n\n> Today is the school singing contest. Dana\'s hands are shaking. "What if I forget the song?" she thinks. Then she sings her song. Everyone claps. Dana smiles.',
      choices: ['걱정됨 → 기쁨', '기쁨 → 걱정됨', '화남 → 슬픔', '놀람 → 화남'],
      answer: 0,
      why: [
        '',
        '순서가 거꾸로예요. 노래하기 전에 손이 떨렸고, 끝에서 웃었어요.',
        '화를 내거나 우는 모습은 없어요.',
        '처음에는 놀란 것이 아니라 노래를 잊을까 봐 걱정했어요.',
      ],
      hint: '처음의 행동(hands are shaking)과 마지막 행동(smiles)을 비교해 보세요.',
      explain: '처음에는 손이 떨리고 노래를 잊을까 봐 걱정했어요(worried). 노래를 마치고 모두가 손뼉을 치자 웃었어요(happy). 그래서 마음은 "걱정됨 → 기쁨"으로 바뀌었어요.',
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 0,
      q: '시를 읽고, 윗줄 끝의 fly와 끝소리가 같으면서 뜻도 어울리는 낱말을 빈칸에 쓰세요.\n\n> Little bird, little bird,\n> Sing in the tree.\n> Little bird, little bird,\n> Sing a song for me.\n> Little bird, little bird,\n> Fly, fly, fly!\n> Little bird, little bird,\n> Up in the [[빈칸]]!',
      answer: ['sky'],
      wrong: [
        { a: 'tree', why: 'tree는 fly와 끝소리가 달라요. tree는 me와 짝이에요. 새가 날아오르는 곳을 생각해 보세요.' },
        { a: 'air', why: '뜻은 어울리지만 fly와 끝소리가 같지 않아요. fly와 소리가 맞는 낱말을 찾아요.' },
      ],
      hint: '새가 날아서(fly) 올라가는 곳은 어디일까요? 끝소리가 fly와 같아요.',
      explain: '새가 날아오르는 곳은 하늘(sky)이에요. fly와 sky는 끝소리가 같아서 시의 리듬이 맞아떨어져요. 앞부분의 tree와 me도 같은 짝이에요.',
    },
  ],

  deeper: [
    {
      title: '200년 넘게 불린 영어 동요의 비밀',
      body: '영국의 시인 제인 테일러(Jane Taylor)가 1806년에 발표한 시 "The Star"는 지금도 전 세계 어린이가 노래로 불러요. 첫 두 줄은 이래요.\n\n> Twinkle, twinkle, little star,\n> How I wonder what you are!\n\n오늘 배운 비밀이 다 들어 있어요.\n- **반복**: Twinkle, twinkle\n- **끝소리가 같은 낱말**: star와 are\n- **강세**: **Twin**kle, **twin**kle, **lit**tle **star** — 세게, 약하게가 번갈아 나와요.\n\n이런 리듬 덕분에 한 번만 들어도 쉽게 외울 수 있어서 오랫동안 사랑받는 거예요.',
    },
    {
      title: '이야기 속 교훈 찾기 연습',
      body: '옛날부터 전해 오는 이솝 우화는 짧은 동물 이야기마다 교훈이 담겨 있어요. 예를 들어 여름 내내 열심히 먹이를 모은 개미와 노래만 부른 베짱이 이야기는 "미리 준비하자."라는 교훈을 줘요.\n\n교훈을 찾을 때는 이렇게 물어보세요.\n1. 인물은 무엇을 했나요?\n2. 그 결과 어떻게 되었나요?\n3. 그래서 나는 무엇을 배울 수 있나요?\n\n중학교에서는 더 긴 이야기를 읽고, 인물의 마음이 왜 바뀌었는지 까닭까지 찾아봐요.',
    },
  ],

  faq: [
    {
      q: '시에서 끝소리가 같은 낱말은 철자도 같아야 해요?',
      a: '아니에요. 철자가 아니라 **소리**가 같으면 돼요. star와 are, tree와 me는 철자는 다르지만 끝소리가 같아요. 소리 내어 읽어 보면 쉽게 찾을 수 있어요.',
    },
    {
      q: '세게 읽는 낱말은 어떻게 알아요?',
      a: '뜻을 많이 담은 낱말을 세게 읽는다고 생각하면 돼요. 이름 낱말(ball), 움직임 낱말(look), 꾸미는 말(big)은 세게, a·the·on·to 같은 작은 낱말은 약하게 읽어요. 작은 낱말을 빼고 읽어도 뜻이 대강 통하지요? 그래서 약하게 읽는 거예요.',
    },
    {
      q: '중심 내용이랑 교훈은 뭐가 달라요?',
      a: '중심 내용은 "이야기에 무슨 일이 있었나"를 한 문장으로 줄인 거예요(미아가 포기하지 않고 해바라기를 키웠다). 교훈은 그 이야기에서 "내가 배울 점"이에요(포기하지 말자). 중심 내용은 이야기 속 일, 교훈은 나에게 주는 깨달음이에요.',
    },
  ],

  mistakes: [
    'a, the, on 같은 작은 낱말까지 모두 세게 읽는 실수 — 중요한 낱말만 세게, 작은 낱말은 약하고 빠르게 읽어야 리듬이 살아요.',
    '이야기에 나온 사실 하나(해바라기는 여름에 핀다)를 교훈으로 고르는 실수 — 교훈은 인물의 행동에서 얻는 깨달음이에요.',
    '앞 이야기와 이어지지 않는 뒷이야기를 고르는 실수 — 흐름과 인물의 성격에 맞는지 확인해요.',
  ],

  vocab: [
    { w: 'poem', m: '시', ex: 'I wrote a short poem about snow.', exm: '나는 눈에 대한 짧은 시를 썼어요.' },
    { w: 'story', m: '이야기', ex: 'This story is about a brave girl.', exm: '이 이야기는 용감한 소녀에 대한 거예요.' },
    { w: 'rhythm', m: '리듬, 박자', ex: 'Clap your hands to the rhythm.', exm: '리듬에 맞춰 손뼉을 치세요.' },
    { w: 'repeat', m: '반복하다, 되풀이하다', ex: 'Please repeat after me.', exm: '저를 따라 말해 보세요.' },
    { w: 'seed', m: '씨앗', ex: 'Mia plants a seed in a pot.', exm: '미아는 화분에 씨앗을 심어요.' },
    { w: 'grow', m: '자라다', ex: 'Plants need water to grow.', exm: '식물은 자라려면 물이 필요해요.' },
    { w: 'leaf', m: '잎', ex: 'I see a little green leaf.', exm: '작은 초록 잎이 보여요.' },
    { w: 'give up', m: '포기하다', ex: 'Don\'t give up!', exm: '포기하지 마!' },
    { w: 'lesson', m: '교훈, 수업', ex: 'What is the lesson of this story?', exm: '이 이야기의 교훈은 무엇일까요?' },
    { w: 'feel', m: '느끼다', ex: 'How do you feel today?', exm: '오늘 기분이 어때요?' },
    { w: 'worried', m: '걱정하는', ex: 'Dana is worried about the contest.', exm: '다나는 대회를 걱정해요.' },
    { w: 'proud', m: '자랑스러운', ex: 'I am proud of you.', exm: '나는 네가 자랑스러워.' },
    { w: 'surprised', m: '놀란', ex: 'He was surprised at the gift.', exm: '그는 선물을 보고 놀랐어요.' },
    { w: 'kind', m: '친절한', ex: 'Jun is kind to animals.', exm: '준은 동물에게 친절해요.' },
    { w: 'end', m: '끝, 결말', ex: 'I like the end of the story.', exm: '나는 이 이야기의 결말이 좋아요.' },
  ],
});
