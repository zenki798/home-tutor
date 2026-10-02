/* 6학년 영어 · 환경 지키기 포스터 만들기 */
Tutor.registerUnit({
  id: 'eng-e6-10',
  course: 'eng-e6',
  title: '환경 지키기 포스터 만들기',
  summary: 'Let\'s ~.와 We should ~.로 환경을 지키자고 말하고, 그림과 짧은 문장으로 포스터를 꾸며요.',
  goals: [
    'save, recycle, trash 같은 환경 낱말의 뜻을 알고 쓸 수 있어요.',
    'Let\'s ~. / How about ~ing?로 함께 하자고 제안할 수 있어요.',
    'We should ~.와 Don\'t ~.로 해야 할 일과 하지 말아야 할 일을 말할 수 있어요.',
    '포스터의 짜임을 알고, 포스터를 읽고 중심 내용을 찾을 수 있어요.',
  ],
  standards: ['[6영02-09]', '[6영01-08]', '[6영01-05]', '[6영02-10]'],

  concepts: [
    {
      title: '환경 낱말',
      body: '환경을 지키는 이야기를 하려면 먼저 낱말을 알아야 해요.\n\n| 낱말 | 뜻 | 예 |\n|---|---|---|\n| **save** | 아끼다, 지키다 | save water (물을 아끼다) |\n| **recycle** | 재활용하다 | recycle cans (캔을 재활용하다) |\n| **trash** | 쓰레기 | pick up trash (쓰레기를 줍다) |\n| **plastic** | 플라스틱 | plastic bags (비닐봉지) |\n| **energy** | 에너지 | save energy (에너지를 아끼다) |\n| **water** | 물 | save water (물을 아끼다) |\n| **waste** | 낭비하다 | waste paper (종이를 낭비하다) |\n\n**save**와 **waste**는 뜻이 반대예요. save는 아껴 쓰는 것이고, waste는 함부로 써서 버리는 것이에요.\n\n> 💡 save는 "구하다"라는 뜻도 있어요. Save the Earth!는 "지구를 지키자!"예요.',
      easy: '집에서 하는 일로 낱말을 떠올려 보세요.\n\n- 양치할 때 물을 잠가요 → **save water**\n- 빈 병을 분리배출해요 → **recycle**\n- 길에 떨어진 쓰레기를 주워요 → **pick up trash**\n- 안 쓰는 전등을 꺼요 → **save energy**\n\n반대로 종이를 한 면만 쓰고 버리면 → **waste paper**(종이를 낭비해요)',
      check: {
        type: 'choice',
        q: 'recycle의 뜻으로 알맞은 것을 고르세요.',
        choices: ['재활용하다', '낭비하다', '버리다'],
        answer: 0,
        why: [
          '',
          '"낭비하다"는 waste예요.',
          '"버리다"는 throw away예요. recycle은 다시 쓸 수 있게 하는 거예요.',
        ],
        explain: 'recycle은 다 쓴 물건을 모아 다시 쓸 수 있게 하는 "재활용하다"예요. 예: We should recycle cans.',
      },
    },
    {
      title: '함께 하자고 제안하기: Let\'s ~ / How about ~ing?',
      body: '친구에게 **함께 하자**고 할 때는 두 가지 말을 써요.\n\n- **Let\'s + 움직임 낱말 원래 모양.** → **Let\'s save water.** (물을 아끼자.)\n- **How about + 움직임 낱말-ing?** → **How about walking to school?** (학교에 걸어가는 게 어때?)\n\nLet\'s 뒤에는 save, recycle처럼 **원래 모양**이 와요. How about 뒤에는 walking, riding처럼 **-ing**를 붙여요.\n\n제안을 받으면 이렇게 답해요.\n\n- 좋을 때: **Sounds good!** / **Good idea!** / **OK.**\n- 안 될 때: **Sorry, I can\'t.**',
      easy: '"우리 같이 ~하자!"는 **Let\'s**, "~하는 게 어때?"는 **How about**이에요.\n\n- Let\'s **walk** to school. (걸어가자.)\n- How about **walking** to school? (걸어가는 게 어때?)\n\n뜻은 거의 같아요. 다른 점은 모양 하나: How about 뒤에서는 낱말 끝에 **-ing** 꼬리가 붙어요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nHow about [[빈칸]] to school?',
        choices: ['walking', 'walk', 'walks'],
        answer: 0,
        why: [
          '',
          'walk는 Let\'s 뒤에 오는 모양이에요. How about 뒤에는 -ing를 붙여요.',
          'walks는 "그가 걷는다"처럼 쓰는 모양이에요. How about 뒤에는 walking을 써요.',
        ],
        explain: 'How about 뒤에는 움직임 낱말에 -ing를 붙여요: "How about walking to school?(학교에 걸어가는 게 어때?)"',
      },
    },
    {
      title: '해야 할 일 말하기: We should ~',
      body: '"우리는 ~해야 해요."라고 **해야 할 일**을 말할 때는 **We should + 움직임 낱말 원래 모양.** 을 써요.\n\n- **We should save energy.** (우리는 에너지를 아껴야 해요.)\n- **We should recycle plastic bottles.** (우리는 플라스틱 병을 재활용해야 해요.)\n- **We should turn off the lights.** (우리는 전등을 꺼야 해요.)\n\nshould 뒤에는 saves, saving 같은 모양이 아니라 **save처럼 원래 모양**이 와요.\n\n> 💡 Let\'s는 "같이 하자"는 제안이고, We should는 "해야 한다"는 생각을 조금 더 힘주어 말하는 거예요.',
      easy: 'should는 "~해야 해"라는 마음을 담는 낱말이에요. 뒤에 오는 낱말은 꾸미지 말고 사전에 나온 모양 그대로 써요.\n\n- We should **save** water. (O)\n- We should **saves** water. (X)\n- We should **saving** water. (X)',
      check: {
        type: 'ox',
        q: '"We should saves energy."는 바른 문장이에요.',
        answer: false,
        explain: 'should 뒤에는 움직임 낱말의 원래 모양이 와요. 바른 문장은 "We should save energy."예요.',
      },
    },
    {
      title: '하지 말자고 말하기: Don\'t ~',
      body: '**하지 말아야 할 일**은 **Don\'t + 움직임 낱말 원래 모양.** 으로 말해요. Don\'t는 Do not을 줄인 말이에요.\n\n- **Don\'t waste paper.** (종이를 낭비하지 마세요.)\n- **Don\'t throw trash on the street.** (길에 쓰레기를 버리지 마세요.)\n- **Don\'t use too many plastic bags.** (비닐봉지를 너무 많이 쓰지 마세요.)\n\n4학년 때 배운 "Don\'t run.(뛰지 마.)"과 같은 틀이에요. 포스터에서는 Let\'s, We should와 함께 Don\'t 문장을 섞어 쓰면 해야 할 일과 하지 말아야 할 일이 한눈에 보여요.',
      easy: '"하지 마!"는 문장 맨 앞에 **Don\'t**를 붙이면 돼요.\n\n- waste paper (종이를 낭비하다) → **Don\'t** waste paper. (종이를 낭비하지 마세요.)\n- throw trash (쓰레기를 버리다) → **Don\'t** throw trash. (쓰레기를 버리지 마세요.)\n\n누가 하는지 말하지 않고 바로 시작하는 게 특징이에요.',
      check: {
        type: 'choice',
        q: '"종이를 낭비하지 마세요."를 영어로 바르게 쓴 것을 고르세요.',
        choices: ['Don\'t waste paper.', 'Let\'s waste paper.', 'We should waste paper.'],
        answer: 0,
        why: [
          '',
          'Let\'s는 "~하자"라는 뜻이에요. 종이를 낭비하자는 말이 돼요.',
          'We should는 "~해야 해요"예요. 종이를 낭비해야 한다는 말이 돼요.',
        ],
        explain: '하지 말라고 할 때는 Don\'t를 맨 앞에 써요: "Don\'t waste paper."',
      },
    },
    {
      title: '포스터의 짜임과 꾸미기',
      body: '환경 포스터는 보통 세 부분으로 되어 있어요.\n\n| 부분 | 하는 일 | 예 |\n|---|---|---|\n| **제목** | 하고 싶은 말을 짧고 크게 | Save the Earth! |\n| **그림** | 내용을 한눈에 보여 줌 | 물을 잠그는 손, 분리배출 통 |\n| **짧은 문장** | 무엇을 할지 알려 줌 | Let\'s ~. / We should ~. / Don\'t ~. |\n\n**꾸미는 방법**\n- 제목은 가장 크게, 느낌표(!)로 힘 있게 써요.\n- 문장은 **짧게, 3~4개**만 써요. 길면 지나가는 사람이 읽지 않아요.\n- 문장과 그림이 같은 내용을 말하게 해요.\n- 문장의 첫 글자는 대문자로, 끝에는 마침표나 느낌표를 찍어요.',
      easy: '포스터는 길을 지나가는 사람이 **3초 안에** 알아볼 수 있어야 해요.\n\n그래서 제목은 커다랗게 한 줄(Save Water!), 그림은 큼직하게 하나, 문장은 짧게 몇 개만 써요. 긴 글을 빽빽하게 쓰면 아무도 끝까지 읽지 않아요.',
      check: {
        type: 'ox',
        q: '포스터의 문장은 길고 자세할수록 좋아요.',
        answer: false,
        explain: '포스터는 한눈에 읽혀야 해서 문장을 짧게, 3~4개 정도만 써요. 자세한 설명은 그림이 도와줘요.',
      },
    },
    {
      title: '포스터 읽고 중심 내용 찾기',
      body: '다른 사람의 포스터를 읽을 때는 **중심 내용**, 곧 포스터가 가장 하고 싶은 말을 찾아요.\n\n> **SAVE WATER!**\n> - Turn off the water when you brush your teeth.\n> - Take short showers.\n> - Don\'t play with water.\n\n중심 내용을 찾는 방법\n1. **제목**을 봐요. 제목에 중심 내용이 담겨 있을 때가 많아요. → Save water\n2. **여러 번 나오는 낱말**을 찾아요. → water, showers\n3. 문장들이 **모두 무엇에 대한 것인지** 생각해요. → 모두 물을 아끼는 방법\n\n그래서 이 포스터의 중심 내용은 "물을 아끼자"예요.',
      easy: '포스터의 문장들을 하나의 바구니에 담는다고 생각해 보세요. 바구니에 붙일 이름표가 중심 내용이에요.\n\n"양치할 때 물 잠그기", "샤워 짧게 하기", "물장난 하지 않기"를 담은 바구니의 이름표는? → **물 아끼기(Save Water)**',
      check: {
        type: 'choice',
        q: '포스터를 읽고 중심 내용을 고르세요.\n\n> **LET\'S RECYCLE!**\n> - Put cans in the can box.\n> - Put paper in the paper box.\n> - We should recycle plastic bottles.',
        choices: ['재활용을 하자.', '종이를 아껴 쓰자.', '캔 음료를 마시자.'],
        answer: 0,
        why: [
          '',
          '종이는 문장 하나에만 나와요. 캔, 종이, 플라스틱 병을 모두 담는 말을 찾아요.',
          '캔을 마시자는 말은 없어요. 캔을 분리해서 넣자는 말이에요.',
        ],
        explain: '제목이 LET\'S RECYCLE!이고, 캔·종이·플라스틱 병을 나누어 모으자는 문장이 이어져요. 중심 내용은 "재활용을 하자."예요.',
      },
    },
  ],

  examples: [
    {
      q: '다음 상황에 맞게 친구에게 제안하는 말을 두 가지로 만들어 보세요.\n\n상황: 학교에 자동차 대신 걸어가면 에너지를 아낄 수 있어요.',
      steps: [
        '"같이 ~하자"는 Let\'s + 원래 모양이에요. "걸어가다"는 walk to school이에요.',
        '첫째 문장: **Let\'s walk to school.**',
        '"~하는 게 어때?"는 How about + -ing예요. walk에 -ing를 붙이면 walking이에요.',
        '둘째 문장: **How about walking to school?**',
      ],
      answer: 'Let\'s walk to school. / How about walking to school?',
    },
    {
      q: '"에너지를 아끼자"는 포스터에 들어갈 문장을 Let\'s, We should, Don\'t로 하나씩 만들어 보세요.',
      steps: [
        '제목으로 쓸 중심 생각: Save Energy!',
        'Let\'s 문장: 함께 하자고 제안해요. → **Let\'s turn off the lights.**',
        'We should 문장: 해야 할 일을 말해요. → **We should use the stairs.** (계단을 이용해야 해요.)',
        'Don\'t 문장: 하지 말아야 할 일을 말해요. 포스터 문장은 짧을수록 좋아요. → **Don\'t waste energy.**',
      ],
      answer: 'SAVE ENERGY! — Let\'s turn off the lights. / We should use the stairs. / Don\'t waste energy.',
    },
  ],

  terms: [
    { term: 'Let\'s ~.', def: '"(함께) ~하자."라고 제안하는 말이에요. 뒤에는 움직임 낱말의 원래 모양이 와요. 예: Let\'s save water.' },
    { term: 'How about ~ing?', def: '"~하는 게 어때?"라고 제안하는 말이에요. 뒤에 오는 움직임 낱말에 -ing를 붙여요. 예: How about walking to school?' },
    { term: 'We should ~.', def: '"우리는 ~해야 해요."라고 해야 할 일을 말해요. 예: We should save energy.' },
    { term: 'Don\'t ~.', def: '"~하지 마세요."라고 하지 말아야 할 일을 말해요. Do not을 줄인 말이에요. 예: Don\'t waste paper.' },
    { term: '포스터', def: '제목·그림·짧은 문장으로 하고 싶은 말을 한눈에 알리는 큰 알림 종이예요.' },
    { term: '중심 내용', def: '글이나 포스터가 가장 하고 싶은 말이에요. 제목과 여러 번 나오는 낱말에서 찾을 수 있어요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nWe should [[빈칸]] plastic bottles. (재활용하다)',
      choices: ['recycle', 'waste', 'throw', 'turn off'],
      answer: 0,
      why: [
        '',
        'waste는 "낭비하다"예요. 재활용과 반대되는 말이에요.',
        'throw는 "던지다, 버리다"예요. 재활용은 recycle이에요.',
        'turn off는 전등이나 물을 "끄다, 잠그다"예요.',
      ],
      explain: '"재활용하다"는 recycle이에요. "We should recycle plastic bottles.(우리는 플라스틱 병을 재활용해야 해요.)"',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: '"쓰레기"라는 뜻의 영어 낱말을 쓰세요. (t로 시작해요.)\n\nDon\'t throw [[빈칸]] on the street.',
      answer: ['trash', 'garbage', 'rubbish'],
      wrong: [
        { a: 'tresh', why: '가운데 모음을 확인해 보세요. t-r-a-s-h예요.' },
        { a: 'trush', why: '가운데 모음을 확인해 보세요. t-r-a-s-h예요.' },
      ],
      explain: '"쓰레기"는 trash예요. "Don\'t throw trash on the street.(길에 쓰레기를 버리지 마세요.)" garbage, rubbish도 같은 뜻이에요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nLet\'s [[빈칸]] water.',
      choices: ['save', 'saving', 'saves', 'to save'],
      answer: 0,
      why: [
        '',
        'saving처럼 -ing를 붙이는 것은 How about 뒤예요. Let\'s 뒤에는 원래 모양을 써요.',
        'Let\'s 뒤에는 -s를 붙이지 않고 원래 모양을 써요.',
        'Let\'s 뒤에는 to 없이 원래 모양만 써요.',
      ],
      explain: 'Let\'s 뒤에는 움직임 낱말의 원래 모양이 와요: "Let\'s save water.(물을 아끼자.)"',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: '"How about walk to school?"은 바른 문장이에요.',
      answer: false,
      explain: 'How about 뒤에는 -ing를 붙여요. 바른 문장은 "How about walking to school?"이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '"우리는 에너지를 아껴야 해요."를 영어로 바르게 쓴 것을 고르세요.',
      choices: ['We should save energy.', 'We should saving energy.', 'We should to save energy.', 'We should waste energy.'],
      answer: 0,
      why: [
        '',
        'should 뒤에는 -ing를 붙이지 않고 원래 모양을 써요.',
        'should 뒤에는 to 없이 원래 모양을 바로 써요.',
        'waste는 "낭비하다"예요. 에너지를 낭비해야 한다는 말이 돼요.',
      ],
      explain: '"~해야 해요"는 should + 원래 모양이에요. "아끼다"는 save이니 "We should save energy."예요.',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 3,
      q: '빈칸에 알맞은 말을 쓰세요. (줄임말로 써도 되고 두 낱말로 써도 돼요.)\n\n[[빈칸]] throw trash on the street. (길에 쓰레기를 버리지 마세요.)',
      answer: ['Don\'t', 'Do not'],
      wrong: [
        { a: 'Dont', why: '작은 따옴표(\')를 빠뜨렸어요. Do not을 줄일 때는 o 자리에 따옴표를 찍어 Don\'t로 써요.' },
        { a: 'Not', why: '영어에서는 Not만 써서 "하지 마"라고 하지 않아요. Don\'t(Do not)를 써요.' },
        { a: 'Doesn\'t', why: 'Doesn\'t는 "그는 ~하지 않아요"처럼 쓰는 말이에요. 하지 말라고 할 때는 Don\'t예요.' },
        { a: 'Let\'s', why: 'Let\'s는 "~하자"예요. 쓰레기를 버리자는 말이 돼요.' },
      ],
      explain: '하지 말라고 할 때는 문장 맨 앞에 Don\'t(Do not)를 써요: "Don\'t throw trash on the street."',
    },
    {
      id: 'p7', level: 1, type: 'order', concept: 2,
      q: '낱말을 바르게 늘어놓아 문장을 만드세요.\n\n"우리는 전등을 꺼야 해요."',
      choices: ['We', 'should', 'turn off', 'the lights'],
      answer: [0, 1, 2, 3],
      explain: '"We should turn off the lights." 누가(We) → 해야 한다(should) → 무엇을 하는지(turn off) → 무엇을(the lights) 순서예요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 4,
      q: '다음 포스터의 제목으로 가장 알맞은 것을 고르세요.\n\n> [[제목]]\n> - Use both sides of the paper.\n> - Don\'t waste paper.\n> - Recycle old notebooks.',
      choices: ['Save Paper!', 'Save Water!', 'Let\'s Play Outside!', 'Turn Off the TV!'],
      answer: 0,
      why: [
        '',
        '물 이야기는 없어요. 세 문장 모두 종이에 대한 말이에요.',
        '밖에서 놀자는 말은 없어요. 제목은 문장 전체를 담아야 해요.',
        'TV 이야기는 없어요. paper, notebooks가 반복되는 것을 보세요.',
      ],
      hint: '세 문장에 공통으로 나오는 물건은 무엇일까요?',
      explain: '종이 양면 쓰기, 종이 낭비하지 않기, 헌 공책 재활용하기 — 모두 종이를 아끼는 방법이에요. 그래서 제목은 "Save Paper!"가 알맞아요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 5,
      q: '포스터를 읽고 중심 내용을 고르세요.\n\n> **NO MORE PLASTIC!**\n> - Bring your own cup.\n> - Use a cloth bag at the store.\n> - Don\'t use plastic straws.',
      choices: ['플라스틱을 덜 쓰자.', '가게에서 물건을 많이 사자.', '컵을 깨끗이 씻자.', '빨대로 음료를 마시자.'],
      answer: 0,
      why: [
        '',
        '물건을 많이 사자는 말은 없어요. 가게에서 천 가방을 쓰자는 말이에요.',
        '컵을 씻자는 말은 없어요. 자기 컵을 가져오자(bring)는 말이에요.',
        '오히려 플라스틱 빨대를 쓰지 말자(Don\'t use)고 했어요.',
      ],
      hint: '제목 NO MORE PLASTIC!과 세 문장이 함께 말하는 것을 찾아요.',
      explain: '제목이 "더 이상 플라스틱은 그만!"이고, 내 컵 가져오기·천 가방 쓰기·플라스틱 빨대 안 쓰기가 이어져요. 중심 내용은 "플라스틱을 덜 쓰자."예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 대답을 고르세요.\n\nA: How about riding a bike to the park?\nB: [[빈칸]] It\'s good for the Earth.',
      choices: ['Sounds good.', 'No, I don\'t.', 'Yes, it is.', 'I\'m sorry to hear that.'],
      answer: 0,
      why: [
        '',
        '"No, I don\'t."는 Do you ~?에 답하는 말이에요. 제안에는 Sounds good. / Sorry, I can\'t.로 답해요.',
        '"Yes, it is."는 Is it ~?에 답하는 말이에요.',
        '"I\'m sorry to hear that."은 안 좋은 소식을 들었을 때 하는 말이에요.',
      ],
      explain: 'How about ~?은 제안하는 말이에요. B가 "지구에 좋아."라고 덧붙였으니 찬성하는 "Sounds good.(좋아.)"이 알맞아요.',
    },
    {
      id: 'p11', level: 2, type: 'short', concept: 2,
      q: '빈칸에 "끄다"라는 뜻의 말(두 낱말)을 쓰세요.\n\nWe should [[빈칸]] the lights.',
      answer: ['turn off'],
      wrong: [
        { a: 'turn on', why: 'turn on은 "켜다"예요. 에너지를 아끼려면 전등을 꺼야(turn off) 해요.' },
        { a: 'turn', why: 'turn만 쓰면 "돌리다"예요. "끄다"는 turn off처럼 off까지 써요.' },
      ],
      hint: '"켜다"는 turn on이에요. 그 반대는?',
      explain: '"끄다"는 turn off예요. "We should turn off the lights.(우리는 전등을 꺼야 해요.)"',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 5,
      q: '포스터를 읽고 물음에 답하세요.\n\n> **OUR EARTH, OUR HOME!**\n> Let\'s walk or ride a bike to school.\n> We should turn off the computer after we use it.\n> Don\'t throw trash in the river.\n> Let\'s plant trees in spring.\n\n이 포스터의 내용과 맞지 **않는** 것은 무엇일까요?',
      choices: ['학교에 걷거나 자전거를 타고 가자고 해요.', '컴퓨터를 다 쓰면 꺼야 한다고 해요.', '강에 쓰레기를 버리지 말자고 해요.', '가을에 나무를 심자고 해요.'],
      answer: 3,
      why: [
        '"Let\'s walk or ride a bike to school."과 맞는 내용이에요.',
        '"We should turn off the computer after we use it."과 맞는 내용이에요.',
        '"Don\'t throw trash in the river."와 맞는 내용이에요.',
        '',
      ],
      hint: '계절을 나타내는 낱말을 잘 보세요.',
      explain: '"Let\'s plant trees in spring."이라고 했으니 나무는 봄(spring)에 심자고 했어요. 가을은 fall이에요.',
    },
    {
      id: 'a2', level: 3, type: 'order', concept: 1,
      q: '대화가 자연스럽게 이어지도록 순서대로 놓으세요.',
      choices: [
        'Let\'s save the Earth.',
        'Good idea! What can we do?',
        'How about walking to school?',
        'Sounds great. And we should recycle bottles, too.',
      ],
      answer: [0, 1, 2, 3],
      hint: '먼저 큰 목표를 말하고, 무엇을 할지 묻고, 방법을 제안해요.',
      explain: '지구를 지키자(Let\'s ~) → 좋아, 뭘 할 수 있을까? → 걸어가는 게 어때?(How about ~ing?) → 좋아, 병도 재활용해야 해(We should ~) 순서예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '포스터에 쓴 문장 가운데 **바르지 않은** 것을 고르세요.',
      choices: ['Let\'s save water.', 'We should recycle plastic.', 'Don\'t wastes paper.', 'How about using a cup?'],
      answer: 2,
      why: [
        'Let\'s + 원래 모양(save)이라 바른 문장이에요.',
        'should + 원래 모양(recycle)이라 바른 문장이에요.',
        '',
        'How about + -ing(using)라 바른 문장이에요.',
      ],
      hint: 'Let\'s, should, Don\'t 뒤에 오는 모양을 하나씩 확인해 보세요.',
      explain: 'Don\'t 뒤에는 원래 모양이 와야 해요. wastes가 아니라 waste로 고쳐 "Don\'t waste paper."라고 써야 해요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '제목이 **SAVE ENERGY!**인 포스터에 넣을 문장으로 어울리지 **않는** 것을 고르세요.',
      choices: ['Turn off the lights.', 'Use the stairs.', 'Don\'t throw trash on the street.', 'Don\'t leave the TV on.'],
      answer: 2,
      why: [
        '전등을 끄면 전기 에너지를 아낄 수 있어요. 어울리는 문장이에요.',
        '엘리베이터 대신 계단을 쓰면 전기를 아낄 수 있어요. 어울리는 문장이에요.',
        '',
        '텔레비전을 켜 두지 않으면 전기를 아낄 수 있어요. 어울리는 문장이에요.',
      ],
      hint: '문장마다 "에너지를 아끼는 방법인가?"를 따져 보세요.',
      explain: '쓰레기를 버리지 말자는 것은 좋은 말이지만 에너지 아끼기와는 관계가 없어요. 포스터의 문장은 모두 제목(중심 내용)과 같은 이야기를 해야 해요.',
    },
  ],

  deeper: [
    {
      title: '환경을 지키는 세 가지 R',
      body: '환경을 지키는 방법을 영어로 **3R**이라고 부르기도 해요.\n\n| 낱말 | 뜻 | 예 |\n|---|---|---|\n| **Reduce** | 줄이기 | 비닐봉지를 덜 써요. |\n| **Reuse** | 다시 쓰기 | 빈 병을 연필꽂이로 써요. |\n| **Recycle** | 재활용하기 | 캔과 종이를 나누어 버려요. |\n\n순서에도 뜻이 있어요. 가장 좋은 것은 처음부터 쓰레기를 덜 만드는 것(Reduce)이고, 그다음이 다시 쓰기(Reuse), 마지막이 재활용(Recycle)이에요. 포스터를 만들 때 "Let\'s reduce, reuse, and recycle!"이라고 쓰면 세 가지를 한꺼번에 말할 수 있어요.',
    },
  ],

  faq: [
    {
      q: 'Let\'s랑 We should는 뭐가 달라요?',
      a: 'Let\'s는 "같이 ~하자"라고 부드럽게 제안하는 말이에요. We should는 "우리는 ~해야 해"라고 해야 할 일을 조금 더 힘주어 말해요. 둘 다 뒤에는 움직임 낱말의 원래 모양이 와요.',
    },
    {
      q: 'How about 뒤에는 왜 -ing를 붙여요?',
      a: 'How about은 "~은 어때?"라는 뜻이라 뒤에 "무엇"에 해당하는 말이 와야 해요. walk(걷다)에 -ing를 붙인 walking은 "걷는 것"이라는 뜻이 돼서 How about 뒤에 올 수 있어요. 그래서 How about walking ~?이라고 해요.',
    },
    {
      q: 'Don\'t는 무슨 말을 줄인 거예요?',
      a: 'Do not을 줄인 말이에요. o 자리에 작은 따옴표(\')를 찍어 Don\'t라고 써요. "Do not waste paper."와 "Don\'t waste paper."는 뜻이 같아요. 포스터에서는 짧은 Don\'t를 더 많이 써요.',
    },
  ],

  mistakes: [
    'How about 뒤에 원래 모양을 쓰는 실수 — "How about walk ~?"가 아니라 "How about walking ~?"이에요.',
    'should나 Don\'t 뒤에 -s, -ing를 붙이는 실수 — "We should save ~.", "Don\'t waste ~."처럼 원래 모양을 써요.',
    'save(아끼다)와 waste(낭비하다)를 헷갈리는 실수 — 둘은 뜻이 반대예요.',
  ],

  vocab: [
    { w: 'save', m: '아끼다, 지키다', ex: 'Let\'s save water.', exm: '물을 아끼자.' },
    { w: 'recycle', m: '재활용하다', ex: 'We should recycle cans.', exm: '우리는 캔을 재활용해야 해요.' },
    { w: 'trash', m: '쓰레기', ex: 'Please pick up the trash.', exm: '쓰레기를 주워 주세요.' },
    { w: 'plastic', m: '플라스틱', ex: 'This bottle is made of plastic.', exm: '이 병은 플라스틱으로 만들어졌어요.' },
    { w: 'energy', m: '에너지', ex: 'We should save energy.', exm: '우리는 에너지를 아껴야 해요.' },
    { w: 'water', m: '물', ex: 'Turn off the water when you brush your teeth.', exm: '이를 닦을 때는 물을 잠가요.' },
    { w: 'waste', m: '낭비하다', ex: 'Don\'t waste paper.', exm: '종이를 낭비하지 마세요.' },
    { w: 'paper', m: '종이', ex: 'Use both sides of the paper.', exm: '종이의 양면을 사용하세요.' },
    { w: 'turn off', m: '끄다, 잠그다', ex: 'Turn off the TV, please.', exm: 'TV를 꺼 주세요.' },
    { w: 'throw', m: '던지다, 버리다', ex: 'Don\'t throw trash on the street.', exm: '길에 쓰레기를 버리지 마세요.' },
    { w: 'street', m: '거리, 길', ex: 'The street is very clean.', exm: '거리가 아주 깨끗해요.' },
    { w: 'earth', m: '지구', ex: 'Let\'s save the Earth.', exm: '지구를 지키자.' },
    { w: 'environment', m: '환경', ex: 'Trees are good for the environment.', exm: '나무는 환경에 좋아요.' },
    { w: 'bottle', m: '병', ex: 'Put the bottle in the recycling box.', exm: '병을 재활용 상자에 넣으세요.' },
    { w: 'poster', m: '포스터', ex: 'We made a poster about water.', exm: '우리는 물에 대한 포스터를 만들었어요.' },
  ],
});
