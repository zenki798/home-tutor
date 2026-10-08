/* 생활 영어 표현 · 대화 이어 가기
 * 예문·대화는 모두 직접 쓴 것이다(가상의 인물). 영어 낱말·문장 바로 뒤에는 받침에 따라 바뀌는 조사를 되도록 붙이지 않는다. */
(function () {
  // 상대의 말에 맞는 반응 고르기 생성기 --------------------------------------------
  // [상대가 한 말, 알맞은 반응, [[어색한 반응, 이유] × 3 이상]]
  var NEWS = [
    ['I finally got my driver\'s license!', 'Wow, good for you!', [
      ['Oh no, that\'s too bad.', '안타까운 소식에 하는 반응입니다. 상대는 좋은 소식을 전했습니다.'],
      ['Me neither.', '"나도 안 그래"라는 뜻으로, 부정문에 동의할 때 씁니다. 좋은 소식에 축하하는 말이 필요합니다.'],
      ['Could you say that again?', '못 알아들었을 때 하는 말입니다. 상대의 말을 알아들었다면 축하로 반응합니다.'],
    ]],
    ['I caught a bad cold this weekend.', 'Oh no, I\'m sorry to hear that.', [
      ['That sounds fun!', '즐거운 계획을 들었을 때의 반응입니다. 상대는 아팠다고 했습니다.'],
      ['Good for you!', '좋은 일을 축하할 때 씁니다. 감기에 걸렸다는 말에는 걱정하는 반응이 어울립니다.'],
      ['Congratulations!', '축하하는 말입니다. 안 좋은 소식에는 맞지 않습니다.'],
    ]],
    ['I\'m going to a jazz festival on Saturday.', 'Really? That sounds fun.', [
      ['I\'m sorry to hear that.', '안 좋은 소식에 위로하는 말입니다. 상대는 즐거운 계획을 말했습니다.'],
      ['Me neither.', '부정문에 동의할 때 쓰는 말입니다. 상대의 말은 부정문이 아닙니다.'],
      ['That\'s too bad. Maybe next time.', '아쉬운 일에 하는 반응입니다. 상대는 즐거운 계획을 말했습니다.'],
    ]],
    ['I don\'t like hot weather at all.', 'Me neither. I prefer cool weather.', [
      ['Me too. I prefer cool weather.', '상대의 말은 부정문(I don\'t like ~)입니다. 부정문에 "나도 그래"라고 할 때는 Me neither. 를 씁니다.'],
      ['Congratulations!', '축하할 일이 아닙니다. 상대는 더운 날씨를 싫어한다고 했습니다.'],
      ['Wow, good for you!', '좋은 일을 해냈을 때 하는 말입니다. 상대는 자기 취향을 말했을 뿐입니다.'],
    ]],
    ['I love trying new restaurants on weekends.', 'Me too! Do you have a favorite place?', [
      ['Me neither! Do you have a favorite place?', '상대의 말은 긍정문입니다. 긍정문에 "나도 그래"는 Me too. 입니다.'],
      ['I\'m sorry to hear that.', '안 좋은 소식에 하는 말입니다. 상대는 좋아하는 일을 말했습니다.'],
      ['Really? That\'s too bad.', '아쉬운 일에 하는 반응입니다. 상대는 좋아하는 일을 말했습니다.'],
    ]],
    ['I lost my wallet on the subway yesterday.', 'Oh no! That\'s terrible.', [
      ['That sounds great!', '좋은 소식에 하는 반응입니다. 지갑을 잃어버린 것은 안 좋은 일입니다.'],
      ['Good for you!', '축하하는 말입니다. 상대는 안 좋은 일을 겪었습니다.'],
      ['Me too. I love the subway.', '상대의 말을 끝까지 듣지 않고 subway 에만 반응했습니다.'],
    ]],
    ['I just started learning the guitar.', 'That\'s great! How\'s it going so far?', [
      ['That\'s too bad. How\'s it going so far?', '아쉬운 일에 하는 반응입니다. 새 취미를 시작한 것은 좋은 소식입니다.'],
      ['Me neither.', '부정문에 동의할 때 씁니다. 상대의 말은 긍정문입니다.'],
      ['I\'m sorry to hear that.', '안 좋은 소식에 위로하는 말입니다. 상대는 새 취미를 시작했다고 했습니다.'],
    ]],
  ];

  // 빈칸에 알맞은 말 고르기 생성기 --------------------------------------------------
  // [문장(빈칸 ___), 정답, [[오답, 이유] × 2 이상], 개념 카드 번호, 해설]
  var BLANKS = [
    ['I enjoy ___ in the mountains on Sundays.', 'hiking', [
      ['to hike', 'enjoy 뒤에는 to부정사가 아니라 -ing(동명사)가 옵니다.'],
      ['hike', 'enjoy 뒤에 동사원형을 바로 쓰지 않습니다. -ing 꼴로 씁니다.'],
    ], 2, 'enjoy 뒤에는 -ing 꼴이 옵니다: I enjoy hiking.(저는 등산을 즐깁니다.)'],
    ['I\'m really ___ in photography these days.', 'interested', [
      ['interesting', 'interesting 은 "흥미로운"이라는 뜻이라, 내가 흥미로운 사람이라는 말이 됩니다. 관심이 있는 사람은 interested 입니다.'],
      ['interest', 'be동사(I\'m) 뒤에는 형용사가 와야 합니다. "관심 있는"은 interested 입니다.'],
    ], 2, '사람이 관심을 느낄 때는 be interested in ~ 을 씁니다: I\'m interested in photography.'],
    ['I\'m ___ board games these days. I play them every Friday.', 'into', [
      ['in', 'be in board games 라고 하지 않습니다. "~에 빠져 있다"는 be into ~ 입니다.'],
      ['on', 'be on board games 라고 하지 않습니다. "~에 빠져 있다"는 be into ~ 입니다.'],
    ], 2, 'be into ~ 는 "~에 푹 빠져 있다·~을 아주 좋아한다"라는 편한 말입니다: I\'m into board games.'],
    ['A: I\'m going camping this weekend.\nB: That sounds ___!', 'great', [
      ['greatly', 'sound(~하게 들리다) 뒤에는 부사가 아니라 형용사가 옵니다.'],
      ['like great', 'sound like 뒤에는 명사가 옵니다(sounds like a plan). 형용사 great 앞에는 like 없이 sounds great 라고 씁니다.'],
    ], 3, 'sound + 형용사로 반응합니다: That sounds great! (좋겠네요!)'],
    ['A: I don\'t eat breakfast on weekdays.\nB: Me ___. I\'m always in a hurry.', 'neither', [
      ['too', '상대의 말은 부정문(I don\'t ~)입니다. 부정문에 "나도 그래"라고 할 때는 neither 를 씁니다.'],
      ['also', 'Me also 라고 하지 않습니다. 부정문에 동의할 때는 Me neither. 입니다.'],
    ], 3, '부정문에 동의할 때는 Me neither.(나도 안 그래), 긍정문에 동의할 때는 Me too.(나도 그래)입니다.'],
    ['A: How ___ your weekend?\nB: It was great. I visited my grandparents.', 'was', [
      ['were', '주어 your weekend 는 하나(단수)이므로 were 가 아니라 was 를 씁니다.'],
      ['are', '지난 주말을 묻고 있습니다(B 가 It was ~ 로 답함). 과거형 was 를 씁니다.'],
    ], 1, '지난 주말을 물을 때는 과거형으로 How was your weekend? 라고 합니다.'],
    ['Sorry, could you ___ that again? It\'s a little noisy here.', 'say', [
      ['tell', 'tell 은 "누구에게 말해 주다"라는 뜻이라 tell me 처럼 들을 사람이 필요합니다. 같은 말을 다시 해 달라고 할 때는 say that again 입니다.'],
      ['speak', 'speak 는 "언어를 말하다·이야기하다"라는 뜻이라 that 을 목적어로 받지 않습니다.'],
    ], 4, '같은 말을 다시 해 달라고 할 때는 Could you say that again? 이라고 합니다.'],
    ['It\'s really cold today, ___ it?', 'isn\'t', [
      ['is', '앞 문장이 긍정(It\'s)이면 꼬리는 부정으로 붙입니다: isn\'t it?'],
      ['doesn\'t', '앞 문장의 동사가 be동사(is)이므로 꼬리도 be동사의 부정 isn\'t 입니다.'],
    ], 0, '긍정문 뒤에는 부정 꼬리를 붙여 동의를 구합니다: It\'s really cold today, isn\'t it?'],
  ];

  Tutor.registerUnit({
    id: 'eng-a-talk-02',
    course: 'eng-a-talk',
    title: '대화 이어 가기',
    summary: '날씨·주말·취미 같은 가벼운 주제로 이야기를 이어 가고, 맞장구와 되묻기로 대화를 부드럽게 합니다.',
    goals: [
      '날씨와 주말을 소재로 가벼운 대화(스몰 토크)를 시작하고 이어 갈 수 있다.',
      '취미와 관심사를 묻고 enjoy -ing, be interested in 등으로 답할 수 있다.',
      '상대의 말에 상황에 맞는 맞장구와 반응을 할 수 있다.',
      '못 알아들은 말을 공손하게 되묻고, 대화를 자연스럽게 마무리할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '날씨로 말 걸기',
        body: '처음 보는 사람이나 아직 어색한 동료와 이야기를 시작할 때 가장 무난한 소재는 **날씨**입니다. 누구나 같은 날씨를 겪고 있으니 부담 없이 말을 걸 수 있습니다.\n\n| 날씨 | 표현 |\n|---|---|\n| 맑고 좋은 날 | It\'s a beautiful day. / Nice weather today. |\n| 아주 추운 날 | It\'s freezing today. |\n| 습한 날 | It\'s so humid. |\n| 비가 올 것 같은 날 | It looks like rain. |\n| 일기 예보 | I heard it\'s going to rain tomorrow. |\n\n문장 끝에 **꼬리 질문**(isn\'t it?)을 붙이면 "그렇지요?" 하고 동의를 구하는 말이 되어 대화가 쉽게 이어집니다. 앞 문장이 긍정이면 꼬리는 부정입니다.\n\nIt\'s really cold today, **isn\'t it?** → **It sure is.** / **Yes, it\'s freezing!**\n\n> 💡 날씨를 말할 때 주어는 It 입니다. "오늘 춥다"도 It\'s cold today. 처럼 It 을 세웁니다.',
        easy: '엘리베이터에서 이웃을 만났는데 할 말이 없을 때 "오늘 덥네요" 한마디면 어색함이 풀리지요. 영어도 같습니다.\n\nIt\'s so hot today, isn\'t it?(오늘 정말 덥네요, 그렇죠?)라고 말을 건네면 상대는 It sure is!(정말 그래요!)라고 받아 줍니다. 대화의 문을 여는 열쇠라고 생각하십시오.',
        check: {
          type: 'choice',
          q: '이웃이 "Nice weather today, isn\'t it?"이라고 말을 걸었습니다. 가장 알맞은 대답을 고르세요.',
          choices: ['Yes, it\'s really nice.', 'No, thank you.', 'I\'m sorry to hear that.'],
          answer: 0,
          why: ['', '권하는 것을 사양할 때 하는 말입니다. 상대는 날씨가 좋다며 동의를 구했습니다.', '안 좋은 소식에 위로하는 말입니다. 날씨가 좋다는 말에는 맞지 않습니다.'],
          explain: 'isn\'t it? 은 "그렇지요?" 하고 동의를 구하는 꼬리 질문입니다. **Yes, it\'s really nice.** 처럼 맞장구치면 됩니다.',
        },
      },
      {
        title: '주말 이야기 — 지난 주말과 다가올 주말',
        body: '월요일에는 지난 주말을, 금요일에는 다가올 주말을 묻는 것이 흔한 대화입니다. **언제의 주말인지에 따라 시제가 다릅니다.**\n\n| 묻는 말 | 대답 |\n|---|---|\n| How was your weekend? (지난 주말) | It was great. I went hiking. / It was relaxing. I just stayed home. |\n| Did you do anything special? | Not really. / Yes, I saw a movie with my family. |\n| Do you have any plans for the weekend? (다가올 주말) | I\'m going to visit my parents. / Nothing special. |\n| What are you doing this weekend? | I\'m meeting some friends on Saturday. |\n\n- 지난 주말 → 과거형: was, went, stayed, saw\n- 다가올 주말 → be going to + 동사원형, 또는 정해진 약속이면 be + -ing\n\n대답에 **한 가지 덧붙이면** 대화가 이어집니다. "It was great." 한 문장에서 멈추기보다 It was great. I went to the beach. 처럼 무엇을 했는지 말해 주면 상대가 다음 질문을 하기 쉬워집니다.',
        easy: '주말 이야기는 달력을 보며 하는 대화입니다. 손가락이 지난 칸(지난 주말)을 가리키면 과거형 — How **was** your weekend? / I **went** camping. 다음 칸(이번 주말)을 가리키면 앞으로의 일 — I\'m **going to** visit my parents.',
        check: {
          type: 'choice',
          q: '월요일 아침, 동료가 "How was your weekend?"라고 물었습니다. 가장 알맞은 대답을 고르세요.',
          choices: ['It was nice. I went camping.', 'I\'m going to go camping.', 'It is Monday today.'],
          answer: 0,
          why: ['', '앞으로의 계획을 말했습니다. 상대는 이미 지난 주말이 어땠는지 물었습니다.', '오늘이 무슨 요일인지 말했습니다. 상대는 주말이 어땠는지 물었습니다.'],
          explain: 'How was your weekend? 는 지난 주말을 묻는 말이므로 과거형으로 답합니다: **It was nice. I went camping.**',
        },
      },
      {
        title: '취미와 관심사 묻고 답하기',
        body: '취미를 물으면 그 사람이 좋아하는 것을 알 수 있어 대화가 깊어집니다.\n\n| 묻는 말 | 대답 |\n|---|---|\n| What do you do in your free time? | I like to cook. / I enjoy reading. |\n| Do you have any hobbies? | Yes, I play badminton. |\n| What are you into these days? | I\'m into hiking these days. |\n| Are you interested in music? | Yes, I\'m interested in jazz. |\n\n대답할 때 자주 틀리는 꼴이 있습니다.\n\n- **enjoy + -ing**: I enjoy cooking. (I enjoy to cook. ✗)\n- **like + to 동사 / -ing**: I like to cook. = I like cooking. (둘 다 됨)\n- **be interested in + 명사·-ing**: I\'m interested in photography.\n- **be into + 명사·-ing**: I\'m into board games. (편한 말: "~에 빠져 있다")\n\n> ⚠️ interested(관심이 있는)와 interesting(흥미로운)을 구별합니다. I\'m interesting. 은 "나는 흥미로운 사람이다"라는 뜻이 됩니다.\n\n상대가 취미를 말하면 **How often do you ~?**(얼마나 자주 해요?), **How did you get into it?**(어떻게 시작하게 됐어요?)처럼 한 번 더 물어 이야기를 넓힙니다.',
        easy: '취미 이야기는 "좋아하는 것 상자"를 열어 보이는 일입니다. 상자에 붙이는 이름표는 정해져 있습니다.\n\n- I enjoy **cooking**. (enjoy 다음에는 -ing 이름표)\n- I\'m interested **in** cooking. (관심이 있는 사람은 interested)\n- I\'m **into** cooking. (요즘 푹 빠져 있을 때)',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI enjoy ___ in my free time.',
          choices: ['baking', 'to bake', 'bake'],
          answer: 0,
          why: ['', 'enjoy 뒤에는 to부정사를 쓰지 않습니다. -ing 꼴로 씁니다.', 'enjoy 뒤에 동사원형을 바로 쓰지 않습니다. -ing 꼴로 씁니다.'],
          explain: 'enjoy 뒤에는 -ing(동명사)가 옵니다: **I enjoy baking in my free time.**(저는 시간이 날 때 빵 굽는 것을 즐깁니다.)',
        },
      },
      {
        title: '맞장구와 반응',
        body: '상대의 말에 반응해 주면 "잘 듣고 있어요"라는 신호가 됩니다. 반응은 **상대가 한 말이 어떤 소식인지**에 맞춰 고릅니다.\n\n| 상대의 말 | 반응 |\n|---|---|\n| 즐거운 계획 | Really? That sounds fun. / That sounds great! |\n| 좋은 소식·해낸 일 | Wow, good for you! / That\'s great! / Congratulations! |\n| 안 좋은 소식 | Oh no, I\'m sorry to hear that. / That\'s too bad. |\n| 힘든 일 | That sounds tough. |\n| 공감 | I know what you mean. |\n\n**That sounds + 형용사**는 "(들어 보니) ~하겠네요"라는 뜻입니다. sound 뒤에는 형용사가 옵니다(sounds great — sounds greatly ✗).\n\n같은 생각일 때는 이렇게 맞장구칩니다.\n\n- 긍정문에 동의: I love coffee. → **Me too.**(나도 그래요)\n- 부정문에 동의: I don\'t like spicy food. → **Me neither.**(나도 안 좋아해요)\n\n> 💡 반응 뒤에 질문을 하나 붙이면 대화가 더 이어집니다. That sounds fun. Who are you going with?',
        easy: '맞장구는 상대의 이야기에 맞춰 표정을 짓는 것과 같습니다. 기쁜 이야기에는 웃는 얼굴(Good for you!), 속상한 이야기에는 걱정하는 얼굴(I\'m sorry to hear that.), 재미있는 계획에는 반짝이는 눈(That sounds fun!)입니다.\n\n표정을 잘못 고르면 어색해지듯, 반응도 소식에 맞게 골라야 합니다.',
        check: {
          type: 'choice',
          q: '동료가 "I caught a bad cold this weekend."라고 말했습니다. 가장 알맞은 반응을 고르세요.',
          choices: ['That sounds fun!', 'Oh no, I\'m sorry to hear that.', 'Good for you!'],
          answer: 1,
          why: ['즐거운 계획을 들었을 때의 반응입니다. 상대는 감기에 걸렸다고 했습니다.', '', '좋은 일을 축하할 때 씁니다. 안 좋은 소식에는 걱정하는 말이 어울립니다.'],
          explain: '감기에 걸렸다는 안 좋은 소식에는 **Oh no, I\'m sorry to hear that.**(저런, 안됐네요)처럼 걱정하는 반응을 합니다.',
        },
      },
      {
        title: '못 알아들었을 때 되묻기',
        body: '외국어 대화에서 못 알아듣는 것은 당연한 일입니다. 모르는 채로 고개만 끄덕이기보다 **공손하게 되묻는 것**이 훨씬 낫습니다.\n\n| 상황 | 표현 |\n|---|---|\n| 짧게 되물을 때 | Sorry? / Pardon? |\n| 다시 말해 달라고 할 때 | Could you say that again? / Sorry, I didn\'t catch that. |\n| 너무 빠를 때 | Could you speak a little more slowly? |\n| 낱말 뜻을 모를 때 | What does "commute" mean? / What do you mean by "commute"? |\n| 들은 내용을 확인할 때 | Did you say Friday? / So you mean the meeting is canceled? |\n\nCould you ~? 는 "~해 주실 수 있을까요?"라는 공손한 부탁입니다. 이 꼴은 다음 단원(부탁·감사·사과하기)에서 더 자세히 익힙니다.\n\n> ⚠️ What? 한마디만 하면 퉁명스럽거나 놀란 것처럼 들릴 수 있습니다. Sorry? 나 Pardon? 이 부드럽습니다.',
        easy: '라디오 소리가 잘 안 들리면 볼륨을 다시 올려 달라고 하지요. 되묻기 표현은 "볼륨 버튼"입니다.\n\n- 다시 한 번: Could you say that again?\n- 천천히: Could you speak a little more slowly?\n- 이 낱말은 무슨 뜻?: What does "commute" mean?',
        check: {
          type: 'choice',
          q: '상대가 말을 너무 빨리 해서 알아듣기 어렵습니다. 가장 알맞은 말을 고르세요.',
          choices: ['Could you speak a little more slowly?', 'Could you please speak a little bit louder?', 'What do you do?'],
          answer: 0,
          why: ['', '소리를 크게 해 달라는 말입니다. 문제는 속도가 빠른 것입니다.', '직업을 묻는 말입니다. 되묻는 말이 아닙니다.'],
          explain: '속도가 빠를 때는 **Could you speak a little more slowly?**(조금만 천천히 말씀해 주시겠어요?)라고 부탁합니다.',
        },
      },
      {
        title: '대화 자연스럽게 마무리하기',
        body: '잘 이어 가던 대화도 언젠가는 끝내야 합니다. 갑자기 끊지 않고 **신호 → 정리 → 다음 약속** 순서로 마무리하면 부드럽습니다.\n\n1. **신호**: Anyway, … / Well, … (화제를 정리하겠다는 신호)\n2. **끝내는 이유나 배려**: I should get back to work. / I\'ll let you go. / I\'ll let you get back to work.\n3. **즐거웠다는 말**: It was great catching up. / It was nice chatting with you.\n4. **다음 약속**: Let\'s get together again soon. / Let\'s grab coffee sometime. / Talk to you later.\n\nI\'ll let you go. 는 "이만 놓아 드릴게요", 곧 **상대의 시간을 배려해 대화를 끝내는 말**입니다. 내쫓는 말이 아닙니다.\n\ncatch up 은 "밀린 이야기를 나누다"라는 뜻으로, 오랜만에 만난 사람과 대화를 마칠 때 It was great catching up. 이라고 합니다.',
        easy: '대화를 끝내는 것은 자동차를 세우는 것과 같습니다. 급브레이크(Bye!) 대신 깜빡이를 켜고(Anyway, …) 속도를 줄인 뒤(It was great catching up.) 부드럽게 멈춥니다(Talk to you later!).',
        check: {
          type: 'ox',
          q: '"I\'ll let you go."는 상대에게 "그만 가 보세요"라고 무례하게 말하는 표현입니다.',
          answer: false,
          explain: 'I\'ll let you go. 는 "(바쁘실 텐데) 이만 놓아 드릴게요"라는 뜻으로, **상대의 시간을 배려하며** 대화를 끝내는 부드러운 표현입니다.',
        },
      },
    ],

    examples: [
      {
        q: '월요일 아침 사무실에서 동료와 나누는 대화를 완성해 보세요.\n\nA: Good morning! (① 지난 주말이 어땠는지 묻기)\nB: It was great. I went to a pottery class.\nA: (② 맞장구치고 한 가지 더 묻기)',
        steps: [
          '①은 지난 주말을 묻는 말이므로 과거형 was 를 씁니다: How was your weekend?',
          'B 는 도자기 수업에 다녀왔다고 했습니다. 즐거운 일이므로 That sounds fun. / Really? That sounds interesting. 처럼 반응합니다.',
          '반응 뒤에 질문을 하나 붙이면 대화가 이어집니다. 취미의 횟수를 물을 수 있습니다: How often do you go?',
        ],
        answer: '① How was your weekend? ② Really? That sounds fun. How often do you go?',
      },
      {
        q: '상대가 이렇게 말했는데 commute 라는 낱말을 몰라 알아듣지 못했습니다. 어떻게 대화를 이어 가면 좋을까요?\n\nA: My commute takes almost an hour.',
        steps: [
          '모르는 낱말이 있으면 고개만 끄덕이지 말고 뜻을 물어봅니다: Sorry, what does "commute" mean?',
          '상대가 설명해 줍니다: It means the trip from my home to work.(집에서 회사까지 가는 길이라는 뜻이에요.)',
          '이제 알아들었으니 반응합니다. 한 시간이나 걸린다니 힘든 일입니다: Oh, that sounds tough.',
        ],
        answer: 'Sorry, what does "commute" mean? → (설명을 들은 뒤) Oh, that sounds tough.',
      },
    ],

    terms: [
      { term: '스몰 토크', def: '날씨·주말·취미처럼 가벼운 소재로 나누는 짧은 대화입니다. 처음 보는 사람이나 동료와의 어색함을 풀어 줍니다. 영어로 small talk 라고 합니다.' },
      { term: '꼬리 질문(부가 의문문)', def: '문장 끝에 붙여 "그렇지요?" 하고 동의를 구하는 짧은 질문입니다. 예: It\'s cold today, isn\'t it?' },
      { term: 'How was your weekend?', def: '"주말 어땠어요?" 지난 주말을 묻는 말이므로 과거형으로 답합니다. 예: It was great. I went hiking.' },
      { term: 'That sounds ~.', def: '"(들어 보니) ~하겠네요." 상대의 이야기에 반응하는 말로, 뒤에 형용사가 옵니다. 예: That sounds fun. / That sounds tough.' },
      { term: 'Me neither.', def: '"나도 안 그래요." 부정문에 동의할 때 씁니다. 긍정문에 동의할 때는 Me too.' },
      { term: 'Could you say that again?', def: '"다시 한 번 말씀해 주시겠어요?" 못 알아들었을 때 공손하게 되묻는 말입니다.' },
      { term: 'catch up', def: '오랜만에 만나 "밀린 이야기를 나누다"라는 뜻입니다. 예: It was great catching up.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '버스 정류장에서 옆 사람이 "It\'s really cold today, isn\'t it?"이라고 말했습니다. 가장 알맞은 대답을 고르세요.',
        choices: ['No, thank you.', 'It sure is. It\'s freezing!', 'Yes, it\'s very sunny and hot today.', 'I\'m into hiking.'],
        answer: 1,
        why: [
          '권하는 것을 사양할 때 하는 말입니다. 상대는 날씨에 대해 동의를 구했습니다.',
          '',
          '상대는 춥다고 했는데 덥다고 답해 내용이 맞지 않습니다.',
          '취미를 말했습니다. 날씨 이야기에 맞지 않습니다.',
        ],
        explain: 'isn\'t it? 으로 동의를 구했으니 **It sure is.**(정말 그래요)로 맞장구치고, It\'s freezing!(꽁꽁 얼 것 같아요)처럼 덧붙이면 자연스럽습니다.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 0,
        q: '"It looks like rain."은 "비가 올 것 같아요"라는 뜻입니다.',
        answer: true,
        explain: 'look like + 명사는 "~처럼 보이다, ~할 것 같다"라는 뜻입니다. 하늘이 흐릴 때 **It looks like rain.**(비가 올 것 같네요)이라고 말합니다.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '월요일에 동료가 "How was your weekend?"라고 물었습니다. 가장 알맞은 대답을 고르세요.',
        choices: ['I\'m going to visit my parents this weekend.', 'It was nice. I visited my parents.', 'It is Saturday.', 'Yes, I was.'],
        answer: 1,
        why: [
          '다가올 주말의 계획을 말했습니다. 상대는 지난 주말이 어땠는지 물었습니다.',
          '',
          '요일을 말했습니다. 상대는 주말이 어땠는지 물었습니다.',
          'How 로 시작하는 질문에는 Yes·No 로 답하지 않습니다.',
        ],
        explain: '지난 주말을 묻는 말이므로 과거형으로 답합니다: **It was nice. I visited my parents.**',
      },
      {
        id: 'p4', level: 1, type: 'short', check: 'text', concept: 1,
        q: '앞으로의 계획을 말하는 문장이 되도록 빈칸에 알맞은 낱말 하나를 쓰세요.\n\nA: Do you have any plans for the weekend?\nB: Yes, I\'m ___ to go camping with my family.',
        answer: ['going', 'planning', 'hoping'],
        hint: '앞으로 할 계획은 be ___ to + 동사원형으로 말합니다.',
        wrong: [
          { a: 'go', why: 'be동사(I\'m) 뒤에 go 를 바로 쓰지 않습니다. 계획은 be going to + 동사원형입니다.' },
          { a: 'went', why: 'went 는 과거형입니다. 다가올 주말의 계획이므로 be going to 를 씁니다.' },
        ],
        explain: '다가올 주말의 계획은 **be going to + 동사원형**으로 말합니다: I\'m going to go camping.(캠핑을 갈 거예요.) "~할 계획이다"라는 뜻으로 I\'m planning to go camping. 이라고 해도 됩니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWhat do you do in your free time? — I enjoy ___.',
        choices: ['to swim', 'swim', 'swimming', 'swam'],
        answer: 2,
        why: [
          'enjoy 뒤에는 to부정사를 쓰지 않습니다.',
          'enjoy 뒤에 동사원형을 바로 쓰지 않습니다.',
          '',
          'swam 은 과거형 동사입니다. enjoy 뒤에는 -ing 꼴이 옵니다.',
        ],
        explain: 'enjoy 뒤에는 -ing 꼴이 옵니다: **I enjoy swimming.**(저는 수영을 즐깁니다.)',
      },
      {
        id: 'p6', level: 1, type: 'ox', concept: 2,
        q: '"저는 사진에 관심이 있습니다."를 영어로 I\'m interesting in photography. 라고 쓴 것은 바른 문장입니다.',
        answer: false,
        explain: '관심을 느끼는 사람은 **interested** 입니다. 바르게 고치면 I\'m interested in photography. 입니다. interesting 은 "흥미로운"이라는 뜻이라 "나는 흥미로운 사람이다"처럼 됩니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 3,
        q: '친구가 "I passed my driving test!"라고 말했습니다. 가장 알맞은 반응을 고르세요.',
        choices: ['That\'s too bad.', 'Wow, good for you!', 'Me neither.', 'I\'m sorry to hear that.'],
        answer: 1,
        why: [
          '아쉬운 일에 하는 반응입니다. 시험에 붙은 것은 좋은 소식입니다.',
          '',
          '부정문에 동의할 때 쓰는 말입니다. 상대는 좋은 소식을 전했습니다.',
          '안 좋은 소식에 위로하는 말입니다. 상대는 시험에 붙었습니다.',
        ],
        explain: '좋은 소식에는 **Wow, good for you!**(잘됐네요!)처럼 축하합니다. Congratulations! 도 좋습니다.',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'text', concept: 3,
        q: '빈칸에 "~하게 들리다"라는 뜻의 동사를 알맞은 꼴로 쓰세요.\n\nA: I\'m going to a jazz festival on Saturday.\nB: Really? That ___ fun!',
        answer: ['sounds'],
        hint: '주어 That 은 하나(3인칭 단수)입니다.',
        wrong: [
          { a: 'sound', why: '주어 That 은 3인칭 단수이므로 현재형 동사에 -s 를 붙입니다: That sounds fun!' },
          { a: 'hears', why: 'hear 는 "(사람이) 듣다"입니다. "~하게 들리다"는 sound 입니다.' },
        ],
        explain: '**That sounds fun!**(재미있겠네요!) sound + 형용사는 "~하게 들리다"라는 뜻이고, 주어 That 이 3인칭 단수라서 sounds 입니다.',
      },
      {
        id: 'p9', level: 1, type: 'choice', concept: 4,
        q: '식당이 시끄러워 상대의 말을 알아듣지 못했습니다. 가장 알맞은 말을 고르세요.',
        choices: ['What? Again!', 'Sorry, could you say that again?', 'That sounds fun.', 'Me too.'],
        answer: 1,
        why: [
          '짧고 명령하는 말투라 퉁명스럽게 들립니다. Sorry 로 시작해 Could you ~? 로 부탁합니다.',
          '',
          '맞장구치는 말입니다. 알아듣지 못한 상태에서 하는 말이 아닙니다.',
          '동의하는 말입니다. 무슨 말인지 모르는 채로 동의하면 오해가 생길 수 있습니다.',
        ],
        explain: '못 알아들었을 때는 **Sorry, could you say that again?**(죄송한데 다시 말씀해 주시겠어요?)라고 공손하게 되묻습니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '다음 대화에서 B 가 밑줄 친 말을 한 까닭으로 가장 알맞은 것을 고르세요.\n\nA: Our meeting got pushed back.\nB: __Sorry, what do you mean by "pushed back"?__',
        choices: ['낱말의 뜻을 몰라 확인하려고', '회의 시간을 알려 주려고', '대화를 끝내려고', '상대의 말에 맞장구치려고'],
        answer: 0,
        why: [
          '',
          'B 는 시간을 알려 주지 않았습니다. 상대가 쓴 말의 뜻을 물었습니다.',
          '대화를 끝내는 말이 아닙니다. 끝낼 때는 Anyway, I should go. 처럼 말합니다.',
          '맞장구는 That sounds great. 같은 반응입니다. B 는 질문을 했습니다.',
        ],
        explain: 'What do you mean by ~? 는 "~가 무슨 뜻이에요?"라고 상대가 쓴 말의 뜻을 묻는 표현입니다. (pushed back = 뒤로 미뤄진)',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 5,
        q: '빈칸에 들어갈 가장 알맞은 말을 고르세요.\n\nA: Anyway, I\'ll let you get back to work.\nB: ___',
        choices: ['Sure. It was great catching up.', 'Really? That sounds fun.', 'Could you say that again?', 'Thanks! So, how was your weekend, by the way?'],
        answer: 0,
        why: [
          '',
          '즐거운 계획을 들었을 때의 반응입니다. A 는 대화를 마무리하고 있습니다.',
          'A 의 말은 알아듣기 어려운 말이 아닙니다. 마무리 인사로 답합니다.',
          '대화를 끝내려는 사람에게 새 질문을 던졌습니다.',
        ],
        explain: 'Anyway 로 신호를 주고 I\'ll let you get back to work.(이만 일하시게 놓아 드릴게요)로 대화를 정리하고 있습니다. **It was great catching up.**(이야기 나눠서 즐거웠어요)으로 마무리합니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '빈칸에 들어갈 가장 알맞은 말을 고르세요.\n\nA: I don\'t really like spicy food.\nB: ___ I always order the mild one.',
        choices: ['Me too.', 'Me neither.', 'Good for you.', 'That sounds fun.'],
        answer: 1,
        why: [
          'A 의 말은 부정문(I don\'t like ~)입니다. 부정문에 "나도 그래"라고 할 때는 Me too 가 아니라 Me neither 를 씁니다.',
          '',
          '축하하는 말입니다. A 는 자기 취향을 말했을 뿐입니다.',
          '즐거운 계획에 하는 반응입니다. 맞장구의 뜻과 맞지 않습니다.',
        ],
        explain: '부정문에 동의할 때는 **Me neither.**(저도 안 좋아해요)입니다. B 가 늘 순한 맛을 시킨다고 했으니 A 와 같은 생각입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '다음 대화를 읽고, 내용과 **일치하는** 것을 고르세요.\n\nA: How was your weekend, Jiho?\nB: It was a little tiring, actually. I helped my brother move to a new apartment.\nA: Oh, that sounds tough. Did you get any rest?\nB: Yes, on Sunday I just stayed home and watched movies.',
        choices: ['지호는 일요일에 집에서 쉬었다.', '지호는 주말에 새 아파트로 이사했다.', '지호의 주말은 내내 편안했다.', 'A 는 지호에게 영화를 추천했다.'],
        answer: 0,
        hint: 'move 의 주어가 누구인지, Sunday 에 무엇을 했는지 보십시오.',
        why: [
          '',
          '이사한 사람은 지호의 남자 형제(brother)입니다. 지호는 이사를 도왔습니다(helped my brother move).',
          '"a little tiring"이라고 했으니 조금 피곤한 주말이었습니다.',
          'A 는 쉬었는지 물었을 뿐, 영화를 추천하지 않았습니다.',
        ],
        explain: 'on Sunday I just stayed home and watched movies 이므로 일요일에는 집에서 영화를 보며 쉬었습니다. A 는 That sounds tough.(힘들었겠네요)로 반응한 뒤 질문을 덧붙여 대화를 이어 갔습니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 3,
        q: '동료가 "I finally finished my first marathon!"이라고 말했습니다. 반응으로 **어울리지 않는** 것을 고르세요.',
        choices: ['Wow, good for you!', 'That\'s amazing!', 'Oh no, that\'s too bad.', 'Congratulations!'],
        answer: 2,
        why: [
          '좋은 소식에 축하하는 알맞은 반응입니다.',
          '"대단하네요!"라는 알맞은 반응입니다.',
          '',
          '축하하는 알맞은 반응입니다.',
        ],
        explain: '첫 마라톤을 완주한 것은 좋은 소식입니다. Oh no, that\'s too bad. 는 안 좋은 소식에 하는 반응이라 어울리지 않습니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 2,
        q: '빈칸에 알맞은 전치사 하나를 써서 "요즘 정원 가꾸기에 푹 빠져 있어요"라는 뜻이 되게 하세요.\n\nA: What do you do in your free time?\nB: I\'m really ___ gardening these days. I grow tomatoes on my balcony.',
        answer: ['into'],
        hint: '"~에 푹 빠져 있다"를 be 동사와 전치사 하나로 말해 보십시오.',
        wrong: [
          { a: 'on', why: 'be on gardening 이라고 하지 않습니다. "~에 빠져 있다"는 be into ~ 입니다.' },
          { a: 'in', why: 'be in gardening 이라고 하지 않습니다. "~에 빠져 있다"는 be into ~ 입니다.' },
        ],
        explain: '**be into ~** 는 "~에 푹 빠져 있다"라는 편한 표현입니다: I\'m really into gardening these days.(요즘 정원 가꾸기에 푹 빠져 있어요.)',
      },
      {
        id: 'a4', level: 3, type: 'order', concept: 5,
        q: '두 동료가 대화를 마무리하고 있습니다. 자연스럽게 이어지도록 순서대로 놓으세요.',
        choices: [
          'Anyway, I should get back to my desk.',
          'Sure. It was great catching up with you.',
          'You too. Let\'s grab lunch sometime next week.',
          'Sounds good. See you later!',
        ],
        answer: [0, 1, 2, 3],
        hint: '신호(Anyway) → 즐거웠다는 말 → 같은 인사를 돌려주며 다음 약속 → 약속에 동의하며 작별 순서입니다.',
        explain: 'Anyway 로 마무리 신호를 주고 → It was great catching up with you. 로 정리하고 → You too. 로 인사를 돌려주며 점심 약속을 제안하고 → Sounds good. 으로 동의하며 헤어집니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 4,
        q: '상대가 "I\'m taking a day off on Friday."라고 말했는데, Friday 였는지 Monday 였는지 확실하지 않습니다. 가장 알맞은 말을 고르세요.',
        choices: ['Sorry, did you say Friday or Monday?', 'What do you mean by "day off"?', 'That sounds fun.', 'Could you tell me what you are going to do on Friday?'],
        answer: 0,
        why: [
          '',
          'day off(쉬는 날)의 뜻은 문제가 아닙니다. 헷갈리는 것은 요일입니다.',
          '들은 내용을 확인하지 않은 채 맞장구쳤습니다.',
          '요일이 Friday 라고 단정하고 다른 것을 물었습니다. 먼저 요일을 확인해야 합니다.',
        ],
        explain: '헷갈리는 부분만 짚어 확인하면 됩니다: **Sorry, did you say Friday or Monday?** Did you say ~? 는 들은 내용을 확인하는 표현입니다.',
      },
    ],

    deeper: [
      {
        title: '스몰 토크의 소재 고르기',
        body: '스몰 토크는 서로 부담 없이 웃으며 나눌 수 있는 이야기가 좋습니다.\n\n| 무난한 소재 | 조심할 소재 |\n|---|---|\n| 날씨, 주말, 취미, 음식, 여행, 동네 | 나이, 월급, 결혼·출산 계획, 몸무게, 종교, 정치 |\n\n영어권에서는 처음 만난 사람에게 나이나 결혼 여부를 묻는 것을 사생활 침해로 느끼는 경우가 많습니다. 우리말 대화에서는 나이를 먼저 확인하는 일이 흔하지만, 영어 대화에서는 상대가 먼저 말하지 않으면 묻지 않는 편이 안전합니다.\n\n잘 모르는 사람과는 날씨 → 주말 → 취미 순서로 가볍게 시작해 보십시오.',
      },
      {
        title: '대화를 이어 주는 열린 질문',
        body: 'Yes·No 로 답이 끝나는 질문(닫힌 질문)만 하면 대화가 금방 끊깁니다.\n\n- Did you have a good weekend? → Yes. (끝)\n- **What did you do** this weekend? → I went to a pottery class with my sister. (이야기가 생김)\n\nWhat·How·Where 로 시작하는 **열린 질문**은 상대가 길게 말할 기회를 줍니다. 상대가 대답하면 That sounds fun. 처럼 반응하고, How often do you go? 처럼 다시 열린 질문을 하면 대화가 자연스럽게 이어집니다.\n\n**반응 + 열린 질문**, 이 두 가지가 대화를 이어 가는 가장 간단한 공식입니다.',
      },
    ],

    faq: [
      {
        q: '"Me too"랑 "Me neither"는 어떻게 구별해요?',
        a: '상대의 말이 긍정이면 Me too., 부정이면 Me neither. 입니다. I like coffee. → Me too.(나도 좋아해요) / I don\'t like coffee. → Me neither.(나도 안 좋아해요). 우리말로는 둘 다 "저도요"라서 헷갈리기 쉬우니, 상대 문장에 not(don\'t, can\'t …)이 있는지 먼저 살펴보십시오. 편한 대화에서는 부정문에도 Me too. 라고 하는 사람이 있지만, 바른 꼴로 배우고 쓰는 것은 Me neither. 이고 이 단원의 문제도 그 기준을 따릅니다.',
      },
      {
        q: '"Pardon?"은 너무 격식 있는 말 아닌가요?',
        a: '조금 정중한 느낌이지만 일상에서도 무리 없이 씁니다. 더 편하게는 Sorry? 라고 끝을 올려 말해도 됩니다. 다만 What? 한마디만 하면 퉁명스럽게 들릴 수 있으니, 길게 말할 여유가 있다면 Sorry, could you say that again? 이 가장 무난합니다.',
      },
      {
        q: '영어로 대화할 때 할 말이 떨어지면 어떻게 해요?',
        a: '상대가 한 말에서 낱말 하나를 골라 다시 물어보십시오. 상대가 I went hiking. 이라고 했다면 Where did you go? / Do you go hiking often? 처럼 묻는 것입니다. 날씨·주말·취미처럼 미리 준비해 둔 소재로 넘어가는 것도 좋은 방법입니다.',
      },
    ],

    mistakes: [
      'enjoy 뒤에 to 를 쓰는 실수 — I enjoy to cook. (✗) → **I enjoy cooking.** (○)',
      '부정문에 Me too. 로 맞장구치는 실수 — I don\'t like spicy food. 에는 **Me neither.** 로 답합니다.',
      '관심이 있다고 말하면서 interesting 을 쓰는 실수 — I\'m interesting in jazz. (✗) → **I\'m interested in jazz.** (○)',
    ],

    gens: [
      {
        id: 'pick-reaction',
        level: 1,
        title: '상대의 말에 맞는 반응 고르기',
        make: function (R) {
          var it = R.pick(NEWS);
          var bad = R.sample(it[2], 3);
          var reason = {};
          bad.forEach(function (b) { reason[b[0]] = b[1]; });
          var pick = R.choices(it[1], bad.map(function (b) { return b[0]; }));
          return {
            type: 'choice', concept: 3,
            q: '상대가 이렇게 말했습니다. 가장 알맞은 반응을 고르세요.\n\n"' + it[0] + '"',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === it[1] ? '' : reason[c]; }),
            explain: '상대의 말: ' + it[0] + '\n\n알맞은 반응: **' + it[1] + '**\n\n반응은 상대가 전한 소식이 좋은 일인지, 안 좋은 일인지, 긍정문인지 부정문인지에 맞춰 고릅니다.',
          };
        },
      },
      {
        id: 'pick-word',
        level: 2,
        title: '대화 표현의 빈칸 채우기',
        make: function (R) {
          var it = R.pick(BLANKS);
          var reason = {};
          it[2].forEach(function (w) { reason[w[0]] = w[1]; });
          var pick = R.choices(it[1], it[2].map(function (w) { return w[0]; }), 3);
          return {
            type: 'choice', concept: it[3],
            q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === it[1] ? '' : reason[c]; }),
            explain: it[4] + '\n\n바른 문장: ' + it[0].replace('___', it[1]),
          };
        },
      },
    ],

    vocab: [
      { w: 'weather', m: '날씨', ex: 'The weather is perfect for a picnic.', exm: '소풍 가기에 딱 좋은 날씨입니다.' },
      { w: 'humid', m: '습한, 눅눅한', ex: 'It\'s hot and humid in August.', exm: '8월에는 덥고 습합니다.' },
      { w: 'freezing', m: '꽁꽁 얼 듯이 추운', ex: 'Wear a scarf. It\'s freezing outside.', exm: '목도리를 하세요. 밖이 몹시 춥습니다.' },
      { w: 'forecast', m: '(일기) 예보', ex: 'The forecast says it will snow tonight.', exm: '예보에서 오늘 밤 눈이 온다고 합니다.' },
      { w: 'relaxing', m: '편안한, 느긋한', ex: 'We had a relaxing weekend at home.', exm: '우리는 집에서 느긋한 주말을 보냈습니다.' },
      { w: 'plan', m: '계획', ex: 'Do you have any plans for the holiday?', exm: '휴일에 무슨 계획이 있으세요?' },
      { w: 'hobby', m: '취미', ex: 'My hobby is growing herbs on the balcony.', exm: '제 취미는 베란다에서 허브를 키우는 것입니다.' },
      { w: 'free time', m: '여가 시간, 짬', ex: 'What do you do in your free time?', exm: '시간이 날 때 무엇을 하세요?' },
      { w: 'interested', m: '관심이 있는', ex: 'She is interested in old movies.', exm: '그녀는 옛날 영화에 관심이 있습니다.' },
      { w: 'pottery', m: '도자기 공예', ex: 'I take a pottery class on Saturdays.', exm: '저는 토요일마다 도자기 수업을 듣습니다.' },
      { w: 'tough', m: '힘든, 고된', ex: 'It was a tough week at work.', exm: '회사에서 힘든 한 주였습니다.' },
      { w: 'pardon', m: '(되물을 때) 뭐라고 하셨죠?', ex: 'Pardon? I didn\'t hear you.', exm: '뭐라고 하셨어요? 잘 못 들었습니다.' },
      { w: 'commute', m: '통근, 출퇴근(길)', ex: 'My commute takes about forty minutes.', exm: '출퇴근하는 데 40분쯤 걸립니다.' },
      { w: 'catch up', m: '밀린 이야기를 나누다', ex: 'Let\'s meet for coffee and catch up.', exm: '커피 마시면서 그동안 밀린 이야기 해요.' },
    ],
  });
})();
