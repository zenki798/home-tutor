/* 5학년 영어 · 장래 희망 말하기 */
(function () {
  // 생성기용 직업: [낱말, 뜻, 하는 일(영어), 하는 일(우리말), 이유(영어), 이유(우리말), 묶음(참고용)]
  var JOBS = [
    ['doctor', '의사', 'helps sick people', '아픈 사람을 도와요', 'I want to help sick people.', '아픈 사람을 돕고 싶어요', 'care'],
    ['vet', '수의사', 'helps sick animals', '아픈 동물을 도와요', 'I love animals.', '동물을 아주 좋아해요', 'care'],
    ['scientist', '과학자', 'does experiments', '실험을 해요', 'I love science.', '과학을 아주 좋아해요', 'care'],
    ['firefighter', '소방관', 'puts out fires', '불을 꺼요', 'I want to save people from fires.', '불이 났을 때 사람들을 구하고 싶어요', 'care'],
    ['cook', '요리사', 'makes food', '음식을 만들어요', 'I love cooking.', '요리하는 것을 아주 좋아해요', 'food'],
    ['farmer', '농부', 'grows vegetables', '채소를 길러요', 'I like plants.', '식물을 좋아해요', 'food'],
    ['pilot', '비행기 조종사', 'flies airplanes', '비행기를 조종해요', 'I like airplanes.', '비행기를 좋아해요', 'sky'],
    ['teacher', '선생님', 'teaches students', '학생들을 가르쳐요', 'I like teaching my friends.', '친구들에게 가르쳐 주는 것을 좋아해요', 'school'],
    ['singer', '가수', 'sings songs', '노래를 불러요', 'I love singing.', '노래 부르는 것을 아주 좋아해요', 'music'],
  ];
  var NAMES = ['Jia', 'Minsu', 'Seojun', 'Hayun', 'Doyun', 'Sua'];
  // 이유 고르기 생성기: 꿈(열쇠)마다 오답으로 쓰지 않을 직업의 이유 — 그 꿈의 이유로도 말이 되는 것.
  // scientist·teacher 는 여러 이유가 다 어울릴 수 있어(식물 과학자, 과학 선생님) 꿈으로 내지 않는다.
  var NOT_WRONG = {
    doctor: ['vet', 'scientist', 'firefighter'],
    vet: ['doctor', 'scientist', 'farmer'],
    firefighter: ['doctor'],
    cook: ['farmer'],
    farmer: ['cook', 'vet', 'scientist'],
    pilot: ['scientist'],
    singer: [],
  };

  Tutor.registerUnit({
    id: 'eng-e5-11',
    course: 'eng-e5',
    title: '장래 희망 말하기',
    summary: 'What do you want to be?로 장래 희망을 묻고, 직업 낱말과 그 꿈을 가진 이유를 말해요.',
    goals: [
      '여러 가지 직업을 영어로 말하고, 그 직업이 하는 일을 설명할 수 있어요.',
      'What do you want to be? 로 장래 희망을 묻고 I want to be ~. 로 답할 수 있어요.',
      'because 를 써서 꿈을 가진 이유를 말할 수 있어요.',
      '꿈을 소개하는 글을 읽고 중심 내용을 찾을 수 있어요.',
    ],
    standards: ['[6영02-06]', '[6영01-05]', '[6영02-02]'],

    concepts: [
      {
        title: '직업을 나타내는 낱말',
        body: '사람들이 하는 일, 곧 **직업(job)**을 영어로 알아봐요.\n\n| 영어 | 뜻 | 하는 일 |\n|---|---|---|\n| **doctor** | 의사 | 아픈 사람을 치료해요. |\n| **vet** | 수의사 | 아픈 동물을 치료해요. |\n| **cook** | 요리사 | 음식을 만들어요. |\n| **pilot** | 비행기 조종사 | 비행기를 조종해요. |\n| **scientist** | 과학자 | 실험하고 연구해요. |\n| **firefighter** | 소방관 | 불을 끄고 사람을 구해요. |\n\n> 💡 firefighter 는 fire(불) + fight(싸우다) + er(~하는 사람)이 모인 낱말이에요. 불과 싸우는 사람, 곧 소방관이지요. teacher(가르치는 사람), singer(노래하는 사람), farmer(농사짓는 사람)도 끝에 같은 꼬리 er 가 붙어 있어요.',
        easy: '직업 낱말은 "그 사람이 무엇을 하는지"를 떠올리면 쉽게 외워져요.\n\n- 동물 병원의 선생님 → **vet**\n- 사람 병원의 선생님 → **doctor**\n- 주방에서 요리하는 사람 → **cook**\n- 하늘을 나는 비행기를 모는 사람 → **pilot**\n- 실험실에서 실험하는 사람 → **scientist**\n- 소방차를 타고 불을 끄는 사람 → **firefighter**',
        check: {
          type: 'choice',
          q: '아픈 동물을 치료하는 사람은 누구일까요?',
          choices: ['vet', 'cook', 'pilot'],
          answer: 0,
          why: [
            '',
            'cook 은 음식을 만드는 요리사예요.',
            'pilot 은 비행기를 조종하는 사람이에요.',
          ],
          explain: '아픈 동물을 치료하는 수의사는 **vet** 이에요.',
        },
      },
      {
        title: '장래 희망 묻고 답하기',
        body: '커서 무엇이 되고 싶은지 물을 때는 이렇게 말해요.\n\n- **What do you want to be?** 너는 커서 무엇이 되고 싶니?\n- **I want to be a vet.** 나는 수의사가 되고 싶어.\n\n**want to be** 는 "~이 되고 싶다"라는 뜻이에요. want(원하다) + to be(~이 되는 것)로 이루어져 있어요. 직업 낱말 앞에는 **a** 를 붙여요.\n\n| 질문 | 대답 |\n|---|---|\n| What do you want to be? | I want to be **a pilot**. |\n| What does she want to be? | She want**s** to be **a cook**. |\n\n> 💡 artist(화가)처럼 a, e, i, o, u 소리로 시작하는 낱말 앞에는 a 대신 **an** 을 붙여요: I want to be **an** artist.',
        easy: '친구에게 "너 꿈이 뭐야?" 하고 묻는 장면을 떠올려 보세요.\n\n- 묻기: What do you **want to be**? (무엇이 **되고 싶니**?)\n- 답하기: I **want to be** a cook. (나는 요리사가 **되고 싶어**.)\n\n질문과 대답에 똑같이 want to be 가 들어 있어요. 대답할 때는 What 자리에 "a + 직업"을 넣는다고 생각하면 돼요.',
        check: {
          type: 'choice',
          q: 'What do you want to be? 의 뜻으로 알맞은 것은 무엇일까요?',
          choices: ['너는 커서 무엇이 되고 싶니?', '너는 무엇을 좋아하니?', '너는 지금 무엇을 하고 있니?'],
          answer: 0,
          why: [
            '',
            '좋아하는 것은 What do you like? 로 물어요. want to be 는 "~이 되고 싶다"예요.',
            '지금 하는 일은 What are you doing? 으로 물어요.',
          ],
          explain: 'want to be 는 "~이 되고 싶다"라는 뜻이에요. 그래서 **너는 커서 무엇이 되고 싶니?** 예요.',
        },
      },
      {
        title: '직업이 하는 일 설명하기',
        body: '어떤 직업이 무슨 일을 하는지는 **직업 + 하는 일** 의 꼴로 설명해요.\n\n- A vet **helps** sick animals. 수의사는 아픈 동물을 도와요.\n- A cook **makes** food. 요리사는 음식을 만들어요.\n- A pilot **flies** airplanes. 조종사는 비행기를 조종해요.\n- A firefighter **puts** out fires. 소방관은 불을 꺼요.\n- A scientist **does** experiments. 과학자는 실험을 해요.\n\n하는 일을 나타내는 말(help, make …) 끝에 **s** 가 붙은 것을 보세요. a vet 처럼 **한 사람**이 하는 일을 말할 때는 이렇게 s(또는 es)를 붙여요. fly 는 y 를 i 로 바꾸어 **flies**, do 는 **does** 가 돼요.\n\n> 💡 I 나 you 가 주어일 때는 s 를 붙이지 않아요. I help my mom. / A vet helps sick animals.',
        easy: '"수의사는 무엇을 해요?" 하고 물으면 "아픈 동물을 도와요."라고 하지요. 영어로도 똑같이 **A vet + helps sick animals.** 하고 이어 붙이면 돼요.\n\n한 가지만 기억하세요. 한 사람(a vet, a cook, he, she)의 일을 말할 때는 하는 일 낱말 끝에 **s** 꼬리가 붙어요. help → help**s**, make → make**s**.',
        check: {
          type: 'ox',
          q: 'A cook makes food. 는 "요리사는 음식을 만들어요."라는 뜻이에요.',
          answer: true,
          explain: 'cook 은 요리사, makes food 는 음식을 만든다는 뜻이에요. 한 사람(a cook)의 일이라 make 에 s 가 붙었어요.',
        },
      },
      {
        title: '꿈과 그 이유 말하기: because',
        body: '왜 그 꿈을 가졌는지 이유를 말할 때는 **because**(왜냐하면, ~ 때문에)를 써요.\n\n- I want to be a pilot **because** I like airplanes. 나는 비행기를 좋아하기 때문에 조종사가 되고 싶어요.\n- I want to be a vet **because** I love animals. 나는 동물을 아주 좋아해서 수의사가 되고 싶어요.\n\n**because 뒤에는 이유가 되는 문장**이 와요. 꿈과 이유가 서로 잘 어울려야 해요.\n\n이유를 물을 때는 **Why**(왜)를 써요.\n\n- A: **Why** do you want to be a cook?\n- B: **Because** I love cooking.\n\n> 💡 Why 로 물으면 Because 로 시작해서 대답할 수 있어요.',
        easy: '꿈을 말하는 문장을 두 칸짜리 기차라고 생각해 보세요.\n\n- 앞 칸: 무엇이 되고 싶은지 → I want to be a pilot\n- 연결 고리: **because**\n- 뒤 칸: 왜 그런지 → I like airplanes\n\n연결 고리 because 로 두 칸을 이으면 "비행기를 좋아해서 조종사가 되고 싶어요."라는 긴 문장이 돼요.',
        check: {
          type: 'choice',
          q: '빈칸에 들어갈 이유로 가장 알맞은 것은 무엇일까요?\n\nI want to be a scientist because [[blank]].',
          choices: ['I love science', 'I like airplanes', 'I love singing'],
          answer: 0,
          why: [
            '',
            '비행기를 좋아하는 것은 조종사(pilot)가 되고 싶은 이유에 더 어울려요.',
            '노래를 좋아하는 것은 가수(singer)가 되고 싶은 이유에 더 어울려요.',
          ],
          explain: '과학자(scientist)가 되고 싶은 이유로는 **I love science**(과학을 아주 좋아해요)가 가장 잘 어울려요.',
        },
      },
      {
        title: '꿈을 소개하는 글에서 중심 내용 찾기',
        body: '글 전체가 말하려는 가장 중요한 내용을 **중심 내용**이라고 해요. 꿈을 소개하는 글은 보통 이렇게 쓰여요.\n\nHi, I am Hayun. **I want to be a vet.** I love animals. I have a dog and two cats. I want to help sick animals.\n\n- 중심 내용: 하윤이는 수의사가 되고 싶어요. (I want to be a vet.)\n- 뒷받침하는 내용: 동물을 좋아해요, 강아지와 고양이를 키워요, 아픈 동물을 돕고 싶어요.\n\n중심 내용을 찾는 방법이에요.\n\n1. **want to be** 가 들어간 문장을 찾아요. 꿈을 소개하는 글에서는 이 문장이 중심인 경우가 많아요.\n2. 나머지 문장들이 모두 그 내용을 도와주는지 확인해요.\n3. 한 문장에만 나오는 작은 내용(강아지를 키운다)은 중심 내용이 아니에요.',
        easy: '중심 내용은 우산의 손잡이와 같아요. 손잡이 하나에 우산살 여러 개가 붙어 있지요.\n\n하윤이의 글에서 손잡이는 "수의사가 되고 싶다"예요. "동물을 좋아한다", "강아지와 고양이가 있다", "아픈 동물을 돕고 싶다"는 손잡이를 받쳐 주는 우산살이에요.',
        check: {
          type: 'choice',
          q: '글의 중심 내용으로 알맞은 것은 무엇일까요?\n\nMy name is Doyun. I want to be a cook. I love cooking. I often make pancakes for my family.',
          choices: ['도윤이는 요리사가 되고 싶어요.', '도윤이는 가족이 있어요.', '도윤이는 팬케이크를 먹어요.'],
          answer: 0,
          why: [
            '',
            '가족 이야기는 팬케이크를 만들어 주는 대상으로만 나와요. 글 전체가 말하는 것은 꿈이에요.',
            '팬케이크는 도윤이가 요리를 좋아한다는 것을 보여 주는 작은 내용이에요. 또 먹는 것이 아니라 만드는(make) 거예요.',
          ],
          explain: 'I want to be a cook. 이 중심 문장이에요. 나머지 문장(요리를 좋아해요, 팬케이크를 만들어요)은 모두 이 꿈을 뒷받침해요.',
        },
      },
    ],

    examples: [
      {
        q: '대화를 완성해 보세요.\n\nA: What do you want to be?\nB: (나는 소방관이 되고 싶어.)\nA: Why?\nB: (사람들을 구하고 싶기 때문이야.)',
        steps: [
          '"~이 되고 싶어"는 I want to be 로 말하고, 직업 앞에 a 를 붙여요: **I want to be a firefighter.**',
          '이유를 물었으니 Because 로 시작해요.',
          '"사람들을 구하고 싶다"는 I want to save people 이에요: **Because I want to save people.**',
        ],
        answer: 'I want to be a firefighter. / Because I want to save people.',
      },
      {
        q: '글을 읽고 중심 내용을 찾아보세요.\n\nI am Sua. I want to be a pilot. I like airplanes. I want to fly to many countries. I want to see the world from the sky.',
        steps: [
          'want to be 가 들어간 문장을 찾아요: I want to be a pilot.',
          '나머지 문장을 확인해요: 비행기를 좋아해요, 여러 나라로 날아가고 싶어요, 하늘에서 세상을 보고 싶어요.',
          '나머지 문장이 모두 "조종사가 되고 싶다"는 꿈과 그 이유를 말해 주고 있어요.',
        ],
        answer: '수아는 비행기 조종사가 되고 싶어요.',
      },
    ],

    terms: [
      { term: '직업', def: '돈을 벌거나 다른 사람을 위해 꾸준히 하는 일이에요. 영어로 job 이에요. 예: doctor(의사), cook(요리사)' },
      { term: '장래 희망', def: '커서 되고 싶은 사람이나 하고 싶은 일이에요. 영어로는 What do you want to be? 로 묻고 I want to be ~. 로 답해요.' },
      { term: 'want to be', def: '"~이 되고 싶다"라는 뜻이에요. 예: I want to be a vet. (나는 수의사가 되고 싶어요.)' },
      { term: 'because', def: '"왜냐하면, ~ 때문에"라는 뜻으로, 뒤에 이유를 말해요. 예: I want to be a pilot because I like airplanes.' },
      { term: '중심 내용', def: '글 전체가 가장 말하고 싶은 내용이에요. 나머지 문장들은 중심 내용을 뒷받침해요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '비행기를 조종하는 사람은 누구일까요?',
        choices: ['pilot', 'doctor', 'cook', 'scientist'],
        answer: 0,
        why: [
          '',
          'doctor 는 아픈 사람을 치료하는 의사예요.',
          'cook 은 음식을 만드는 요리사예요.',
          'scientist 는 실험하고 연구하는 과학자예요.',
        ],
        explain: '비행기를 조종하는 사람은 **pilot** 이에요.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '우리말 뜻에 맞는 낱말을 쓰세요.\n\n요리사',
        answer: ['cook', 'chef'],
        wrong: [{ a: 'cooker', why: 'cooker 는 음식을 익히는 조리 기구(밥솥, 가스레인지 등)예요. 요리사는 cook 이에요.' }],
        explain: '요리사는 **cook** 이에요. (식당의 주방장을 뜻하는 chef 도 정답이에요.) cook 은 "요리하다"라는 뜻도 있어요.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 0,
        q: '"소방관"을 나타내는 낱말은 무엇일까요?',
        choices: ['firefighter', 'farmer', 'teacher', 'singer'],
        answer: 0,
        why: [
          '',
          'farmer 는 농사를 짓는 농부예요.',
          'teacher 는 가르치는 선생님이에요.',
          'singer 는 노래하는 가수예요.',
        ],
        explain: '소방관은 **firefighter** 예요. fire(불) + fight(싸우다) + er(~하는 사람)이에요.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 2,
        q: 'A firefighter flies airplanes. 는 맞는 설명이에요.',
        answer: false,
        explain: '비행기를 조종하는 사람은 pilot 이에요. 소방관은 불을 꺼요: **A firefighter puts out fires.**',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nI want to [[blank]] a scientist.',
        choices: ['be', 'is', 'am', 'are'],
        answer: 0,
        why: [
          '',
          'want to 다음에는 is 가 아니라 원래 모양 be 를 써요.',
          'I 와 함께 쓰는 am 이라도 want to 다음에는 be 를 써요.',
          'want to 다음에는 are 가 아니라 원래 모양 be 를 써요.',
        ],
        explain: '"~이 되고 싶다"는 **want to be** 예요. to 다음에는 is·am·are 가 아니라 원래 모양 be 를 써요.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 0,
        q: '우리말 뜻에 맞는 낱말을 쓰세요.\n\n수의사(동물을 치료하는 의사)',
        answer: ['vet', 'veterinarian'],
        wrong: [{ a: 'doctor', why: 'doctor 는 사람을 치료하는 의사예요. 동물을 치료하는 의사는 vet 이에요.' }],
        explain: '수의사는 **vet** 이에요. (긴 말로 veterinarian 이라고도 해요.)',
      },
      {
        id: 'p7', level: 2, type: 'order', concept: 1,
        q: '낱말을 바르게 늘어놓아 "나는 의사가 되고 싶어요."를 만드세요.',
        choices: ['I', 'want', 'to', 'be', 'a doctor.'],
        answer: [0, 1, 2, 3, 4],
        hint: 'I want to be 다음에 되고 싶은 직업을 써요.',
        explain: '**I want to be a doctor.** — 나는(I) 원해요(want) 되는 것을(to be) 의사(a doctor).',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 1,
        q: '대화의 빈칸에 들어갈 말로 알맞은 것은 무엇일까요?\n\nA: What do you want to be?\nB: [[blank]]',
        choices: ['I want to be a singer.', 'I like music.', 'Yes, I do.', 'I am a student.'],
        answer: 0,
        why: [
          '',
          '좋아하는 것을 말했어요. 질문은 커서 무엇이 되고 싶은지 묻고 있어요.',
          'What 으로 묻는 질문에는 Yes 나 No 로 답하지 않아요.',
          '지금 학생이라는 말이에요. 커서 되고 싶은 것을 말해야 해요.',
        ],
        hint: 'want to be 로 물었으니 want to be 로 답해 보세요.',
        explain: 'What do you want to be? 에는 **I want to be a singer.** 처럼 되고 싶은 직업으로 답해요.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 3,
        q: '빈칸에 들어갈 이유로 가장 알맞은 것은 무엇일까요?\n\nI want to be a vet because [[blank]].',
        choices: ['I love animals', 'I like airplanes', 'I love singing', 'I like plants'],
        answer: 0,
        why: [
          '',
          '비행기를 좋아하는 것은 조종사(pilot)가 되고 싶은 이유에 더 어울려요.',
          '노래를 좋아하는 것은 가수(singer)가 되고 싶은 이유에 더 어울려요.',
          '식물을 좋아하는 것은 농부(farmer)가 되고 싶은 이유에 더 어울려요.',
        ],
        hint: 'vet 이 하는 일을 떠올려 보세요.',
        explain: '수의사(vet)는 아픈 동물을 돕는 사람이에요. 그래서 이유로는 **I love animals**(동물을 아주 좋아해요)가 가장 잘 어울려요.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nA scientist [[blank]].',
        choices: ['does experiments', 'puts out fires', 'flies airplanes', 'helps sick animals'],
        answer: 0,
        why: [
          '',
          '불을 끄는 것은 소방관(firefighter)이 하는 일이에요.',
          '비행기를 조종하는 것은 조종사(pilot)가 하는 일이에요.',
          '아픈 동물을 돕는 것은 수의사(vet)가 하는 일이에요.',
        ],
        explain: '과학자(scientist)는 실험을 해요: **A scientist does experiments.** experiment 는 "실험"이에요.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 3,
        q: '대화를 읽고 빈칸에 알맞은 낱말을 한 낱말로 쓰세요.\n\nA: Why do you want to be a firefighter?\nB: [[blank]] I want to help people.',
        answer: ['Because'],
        wrong: [
          { a: 'Why', why: 'Why 는 이유를 물을 때 써요. 이유를 대답할 때는 Because 로 시작해요.' },
          { a: 'So', why: 'So 는 "그래서"예요. 이유를 말할 때는 Because(왜냐하면)를 써요.' },
        ],
        hint: 'Why(왜)로 물으면 무엇으로 시작해서 대답할까요?',
        explain: 'Why 로 이유를 물으면 **Because**(왜냐하면)로 시작해서 대답할 수 있어요. Because I want to help people.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '글을 읽고 중심 내용으로 가장 알맞은 것을 고르세요.\n\nMy name is Seojun. I want to be a scientist. I like science class very much. I often look at the stars at night. Someday I want to find a new star.',
        choices: [
          '서준이는 과학자가 되고 싶어요.',
          '서준이는 밤에 별을 봐요.',
          '서준이는 과학 시간을 좋아해요.',
          '서준이는 새 별을 찾았어요.',
        ],
        answer: 0,
        why: [
          '',
          '별을 보는 것은 과학자가 되고 싶다는 꿈을 뒷받침하는 작은 내용이에요.',
          '과학 시간을 좋아하는 것도 꿈을 뒷받침하는 내용이에요. 글 전체를 묶는 내용은 아니에요.',
          '새 별은 언젠가(Someday) 찾고 싶은 것이에요. 아직 찾지 않았어요.',
        ],
        hint: 'want to be 가 들어간 문장을 찾고, 나머지 문장이 그 문장을 도와주는지 보세요.',
        explain: 'I want to be a scientist. 가 중심 문장이에요. 과학 시간을 좋아하고, 밤에 별을 보고, 새 별을 찾고 싶다는 내용은 모두 **과학자가 되고 싶다**는 꿈을 뒷받침해요.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '글을 읽고, 수의사가 되고 싶은 사람을 고르세요.\n\nJia: I like plants. I grow tomatoes in my garden. I want to work on a farm.\n\nMinsu: I have two dogs. I feel sad when animals are sick. I want to help them.\n\nHayun: I love cooking. I make sandwiches for my family.\n\nDoyun: I want to help sick people at a hospital.',
        choices: ['Minsu', 'Jia', 'Hayun', 'Doyun'],
        answer: 0,
        why: [
          '',
          '지아는 식물을 기르고 농장에서 일하고 싶어 해요. 농부(farmer)에 어울려요.',
          '하윤이는 요리를 좋아해요. 요리사(cook)에 어울려요.',
          '도윤이는 병원에서 아픈 사람을 돕고 싶어 해요. 의사(doctor)에 어울려요.',
        ],
        hint: '수의사(vet)가 하는 일은 무엇인지 떠올리고, 그와 비슷한 말을 한 사람을 찾아보세요.',
        explain: '민수는 개를 키우고, 동물이 아프면 슬퍼하고, 아픈 동물을 돕고 싶어 해요(I want to help them.). 그래서 수의사(vet)가 되고 싶은 사람은 **Minsu** 예요.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 2,
        q: '설명을 읽고 어떤 직업인지 영어로 쓰세요.\n\nThis person wears a big helmet. This person rides in a red truck. This person puts out fires.',
        answer: ['firefighter', 'a firefighter', 'fireman'],
        wrong: [
          { a: 'pilot', why: 'pilot 은 비행기를 조종해요. 불을 끄는(puts out fires) 사람을 찾아요.' },
          { a: 'fire', why: 'fire 는 "불"이에요. 불을 끄는 사람은 끝에 fighter 를 붙여 firefighter 예요.' },
        ],
        hint: '마지막 문장 puts out fires 가 가장 큰 단서예요.',
        explain: '큰 헬멧을 쓰고, 빨간 차를 타고, 불을 끄는 사람은 소방관, **firefighter** 예요.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 2,
        q: '지아가 쓴 글이에요. 바르지 **않은** 문장은 무엇일까요?\n\n(가) I want to be a pilot.\n(나) A pilot fly airplanes.\n(다) I like airplanes.\n(라) I want to travel around the world.',
        choices: ['(가)', '(나)', '(다)', '(라)'],
        fixed: true,
        answer: 1,
        why: [
          '꿈을 바르게 말한 문장이에요.',
          '',
          'I 가 주어라서 like 에 s 를 붙이지 않아요. 바른 문장이에요.',
          'want to 다음에 travel 을 바르게 썼어요.',
        ],
        hint: '한 사람(a pilot)이 하는 일을 말할 때 하는 일 낱말의 모양을 살펴보세요.',
        explain: 'a pilot 은 한 사람이므로 fly 를 **flies** 로 써야 해요(y 를 i 로 바꾸고 es). 바르게 고치면 **A pilot flies airplanes.** 예요.',
      },
      {
        id: 'a5', level: 3, type: 'order', concept: 3,
        q: '낱말을 바르게 늘어놓아 "나는 노래 부르는 것을 아주 좋아해서 가수가 되고 싶어요."를 만드세요.',
        choices: ['I want to be', 'a singer', 'because', 'I love', 'singing.'],
        answer: [0, 1, 2, 3, 4],
        hint: '꿈을 먼저 말하고, because 뒤에 이유를 써요.',
        explain: '**I want to be a singer because I love singing.** — 꿈(I want to be a singer) + because + 이유(I love singing).',
      },
    ],

    deeper: [
      {
        title: '꿈은 바뀌어도 괜찮아요',
        body: '영어권 어른들은 아이들에게 자주 **What do you want to be when you grow up?**(커서 무엇이 되고 싶니?)이라고 물어요. when you grow up 은 "네가 자라면"이라는 뜻이에요.\n\n꿈은 자라면서 여러 번 바뀌기도 해요. 처음에는 pilot 이 되고 싶었다가 나중에 scientist 가 되고 싶어질 수도 있지요. 중요한 것은 **왜** 그 일을 하고 싶은지 생각해 보는 거예요. "비행기를 좋아해서", "사람을 돕고 싶어서"처럼 이유를 말해 보면 내가 무엇을 좋아하는 사람인지 알 수 있어요.\n\n세상에는 아직 이름이 없는 새로운 직업도 계속 생겨요. 내가 좋아하는 것을 꾸준히 해 보세요.',
      },
      {
        title: '-er, -ist 가 붙으면 사람이 돼요',
        body: '직업 낱말을 잘 보면 끝 모양이 비슷한 것이 많아요.\n\n- **-er**: teach → teach**er**(가르치는 사람), sing → sing**er**(노래하는 사람), farm → farm**er**(농사짓는 사람)\n- **-ist**: science → scient**ist**(과학자), art → art**ist**(화가), piano → pian**ist**(피아니스트)\n\n이렇게 낱말 끝에 er, ist 같은 꼬리를 붙이면 "그 일을 하는 사람"이라는 뜻이 되는 경우가 많아요. 새로운 낱말을 만나면 끝 모양을 보고 뜻을 짐작해 보세요.',
      },
    ],

    faq: [
      {
        q: 'I want to be a doctor 에서 a 는 왜 붙여요?',
        a: '세상의 많은 의사 가운데 "한 사람"이 되는 것이라서 직업 앞에 **a** 를 붙여요. artist 처럼 a, e, i, o, u 소리로 시작하는 낱말 앞에는 **an** 을 붙여요: I want to be an artist.',
      },
      {
        q: 'I want to be 랑 I want 는 뭐가 달라요?',
        a: '**I want** 뒤에는 갖고 싶은 물건이 와요: I want a new bike.(새 자전거를 갖고 싶어요.) **I want to be** 뒤에는 되고 싶은 사람이 와요: I want to be a pilot.(조종사가 되고 싶어요.) 장래 희망을 말할 때는 to be 를 빠뜨리지 마세요.',
      },
      {
        q: 'because 는 어디에 써요?',
        a: '이유를 말할 때 써요. 꿈 문장 뒤에 because 를 붙이고 이유를 쓰면 돼요: I want to be a cook because I love cooking. 친구가 Why? 하고 물으면 Because I love cooking. 처럼 because 로 시작해서 답할 수도 있어요.',
      },
      {
        q: 'A vet helps 에서 help 에 왜 s 가 붙어요?',
        a: 'a vet 처럼 **한 사람**(또는 he, she)이 하는 일을 말할 때는 하는 일 낱말 끝에 s 를 붙여요. I 나 you 가 주어일 때는 붙이지 않아요: I help my friends. / A vet helps sick animals.',
      },
    ],

    mistakes: [
      'to be 를 빠뜨리는 실수 — I want a doctor.(X, "의사가 필요해요"라는 다른 뜻이 돼요) → I want to be a doctor.(O)',
      '직업 앞에 a 를 빠뜨리는 실수 — I want to be pilot.(X) → I want to be a pilot.(O)',
      '한 사람이 하는 일에 s 를 빠뜨리는 실수 — A cook make food.(X) → A cook makes food.(O)',
    ],

    gens: [
      {
        id: 'job-match',
        level: 1,
        title: '직업과 하는 일 짝짓기',
        make: function (R) {
          var j = R.pick(JOBS);
          // 같은 묶음(의사·과학자·소방관, 요리사·농부)은 하는 일이 겹쳐 보일 수 있어 오답으로 쓰지 않는다.
          var others = R.shuffle(JOBS.filter(function (x) { return x !== j && x[6] !== j[6]; }));
          var reason = {};
          if (R.bool()) {
            // 하는 일 → 직업
            others.forEach(function (x) { reason[x[0]] = x[1] + '(' + x[0] + ')' + R.josa(x[1], '은/는') + ' ' + x[3] + '. 문장의 하는 일과 맞지 않아요.'; });
            var pick = R.choices(j[0], others.map(function (x) { return x[0]; }));
            return {
              type: 'choice', concept: 2,
              q: '빈칸에 들어갈 직업으로 알맞은 것은 무엇일까요?\n\nA [[blank]] ' + j[2] + '.',
              choices: pick.choices,
              answer: pick.answer,
              why: pick.choices.map(function (c) { return c === j[0] ? '' : reason[c]; }),
              explain: '**' + j[2] + '** 의 뜻: "' + j[3] + '". 이 일을 하는 사람은 ' + j[1] + '(' + j[0] + ')' + R.josa(j[1], '이에요/예요') + '. → **A ' + j[0] + ' ' + j[2] + '.**',
            };
          }
          // 직업 → 하는 일
          others.forEach(function (x) { reason[x[2]] = x[2] + ' 는 ' + x[1] + '(' + x[0] + ')' + R.josa(x[1], '이/가') + ' 하는 일이에요.'; });
          var pick2 = R.choices(j[2], others.map(function (x) { return x[2]; }));
          return {
            type: 'choice', concept: 2,
            q: '빈칸에 들어갈 말로 알맞은 것은 무엇일까요?\n\nA ' + j[0] + ' [[blank]].',
            choices: pick2.choices,
            answer: pick2.answer,
            why: pick2.choices.map(function (c) { return c === j[2] ? '' : reason[c]; }),
            explain: j[1] + '(' + j[0] + ')' + R.josa(j[1], '은/는') + ' ' + j[3] + '. → **A ' + j[0] + ' ' + j[2] + '.**',
          };
        },
      },
      {
        id: 'dream-because',
        level: 2,
        title: '꿈에 어울리는 이유 고르기',
        make: function (R) {
          var j = R.pick(JOBS.filter(function (x) { return x[0] in NOT_WRONG; }));
          var name = R.pick(NAMES);
          var others = R.shuffle(JOBS.filter(function (x) { return x !== j && NOT_WRONG[j[0]].indexOf(x[0]) < 0; }));
          var reason = {};
          others.forEach(function (x) { reason[x[4]] = '이 이유는 ' + x[1] + '(' + x[0] + ')' + R.josa(x[1], '이/가') + ' 되고 싶은 사람에게 더 어울려요.'; });
          var pick = R.choices(j[4], others.map(function (x) { return x[4]; }));
          return {
            type: 'choice', concept: 3,
            q: name + '의 꿈을 읽고, because 뒤에 들어갈 이유로 가장 알맞은 것을 고르세요.\n\n' + name + ': I want to be a ' + j[0] + ' because [[blank]]',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === j[4] ? '' : reason[c]; }),
            explain: j[1] + '(' + j[0] + ')' + R.josa(j[1], '은/는') + ' ' + j[3] + '. 그래서 이유로는 **' + j[4] + '**(' + j[5] + ')가 가장 잘 어울려요.',
          };
        },
      },
    ],

    vocab: [
      { w: 'job', m: '직업, 일', ex: 'What is your dad\'s job?', exm: '너희 아빠의 직업은 무엇이니?' },
      { w: 'doctor', m: '의사', ex: 'The doctor checks my throat.', exm: '의사 선생님이 내 목을 살펴보세요.' },
      { w: 'vet', m: '수의사', ex: 'The vet helps my sick puppy.', exm: '수의사가 아픈 우리 강아지를 도와줘요.' },
      { w: 'cook', m: '요리사; 요리하다', ex: 'The cook makes delicious soup.', exm: '그 요리사는 맛있는 수프를 만들어요.' },
      { w: 'pilot', m: '비행기 조종사', ex: 'The pilot flies a big airplane.', exm: '그 조종사는 큰 비행기를 조종해요.' },
      { w: 'scientist', m: '과학자', ex: 'The scientist studies the ocean.', exm: '그 과학자는 바다를 연구해요.' },
      { w: 'firefighter', m: '소방관', ex: 'Firefighters are very brave.', exm: '소방관들은 아주 용감해요.' },
      { w: 'teacher', m: '선생님, 교사', ex: 'My teacher reads us a story every day.', exm: '우리 선생님은 매일 우리에게 이야기를 읽어 주세요.' },
      { w: 'singer', m: '가수', ex: 'The singer sings a happy song.', exm: '그 가수는 즐거운 노래를 불러요.' },
      { w: 'farmer', m: '농부', ex: 'The farmer grows potatoes.', exm: '그 농부는 감자를 길러요.' },
      { w: 'want', m: '원하다, 바라다', ex: 'I want to be a vet.', exm: '나는 수의사가 되고 싶어요.' },
      { w: 'because', m: '왜냐하면, ~ 때문에', ex: 'I like summer because I can swim.', exm: '나는 수영을 할 수 있어서 여름이 좋아요.' },
      { w: 'dream', m: '꿈', ex: 'My dream is to be a singer.', exm: '내 꿈은 가수가 되는 거예요.' },
      { w: 'help', m: '돕다', ex: 'I help my grandma in the garden.', exm: '나는 정원에서 할머니를 도와드려요.' },
      { w: 'sick', m: '아픈', ex: 'My cat is sick today.', exm: '우리 고양이가 오늘 아파요.' },
      { w: 'airplane', m: '비행기', ex: 'The airplane is flying over the sea.', exm: '비행기가 바다 위를 날고 있어요.' },
      { w: 'experiment', m: '실험', ex: 'We do a fun experiment in science class.', exm: '우리는 과학 시간에 재미있는 실험을 해요.' },
      { w: 'future', m: '미래, 장래', ex: 'What do you want to do in the future?', exm: '너는 장래에 무엇을 하고 싶니?' },
    ],
  });
})();
