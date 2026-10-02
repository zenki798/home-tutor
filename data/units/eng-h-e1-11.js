/* 영어Ⅰ · 문화 차이 이해와 협력
 * 대화·글은 모두 직접 쓴 가상의 자료다(가상의 인물). 나라별 생활 문화는 널리 알려진 사실만, "often·many" 같은 말로 일반화를 피해 썼다. */
(function () {
  // 직접 쓴 가상의 대화 (교환 학생과 한국 학생)
  var TALK = 'Emma: On my first day, three classmates asked me how old I was. I felt a little uncomfortable.\n' +
    'Jiwoo: I can see why you feel that way. In Korea, people often ask about age because it helps them decide how to talk to each other. They didn\'t mean to be rude.\n' +
    'Emma: Oh, I didn\'t know that. Where I come from, people don\'t usually ask that question when they first meet someone.\n' +
    'Jiwoo: That\'s interesting. Of course, not all Koreans ask about age right away. It depends on the person.\n' +
    'Emma: Thanks for explaining. It makes more sense to me now.';
  // 직접 쓴 가상의 모둠 대화
  var GROUP = 'Minsu: Our project is a presentation about festivals around the world. Who wants to look for information?\n' +
    'Hayun: I\'ll take care of that. I like doing research.\n' +
    'Minsu: Great. Seojun, why don\'t you make the slides? You\'re good at design.\n' +
    'Seojun: Sure. But could you explain what kind of slides you want?\n' +
    'Minsu: Simple ones with big pictures. I\'ll write the script and keep track of time.\n' +
    'Sua: Then I\'ll be the presenter. I\'d like to add that we should practice together on Friday.\n' +
    'Hayun: Good idea. Let me know if anyone needs a hand.';

Tutor.registerUnit({
  id: 'eng-h-e1-11',
  course: 'eng-h-e1',
  title: '문화 차이 이해와 협력',
  summary: '나라마다 다른 생활 문화를 비교하며 공감하는 태도를 기르고, 모둠 과업에서 협력하는 표현을 익힙니다.',
  goals: [
    'while, whereas, unlike, similarly 같은 표현으로 문화의 차이점과 공통점을 비교할 수 있다.',
    'some, many, not all 같은 말로 고정관념과 지나친 일반화를 피해 말할 수 있다.',
    'I can see why you feel ~ 같은 표현으로 상대의 감정에 공감할 수 있다.',
    '모둠 과업에서 역할을 나누고 도움을 주고받으며, 적극적으로 질문하고 의견을 보탤 수 있다.',
  ],
  standards: ['[12영Ⅰ-01-08]', '[12영Ⅰ-02-03]', '[12영Ⅰ-02-08]'],

  concepts: [
    {
      title: '문화 차이를 비교하는 표현',
      body: '두 문화를 견줄 때는 **차이**를 말하는지 **공통점**을 말하는지에 따라 연결하는 말이 다릅니다.\n\n| 쓰임 | 표현 | 뒤에 오는 것 |\n|---|---|---|\n| 차이 | **while**, **whereas** (~인 반면) | 주어 + 동사 (절) |\n| 차이 | **unlike** (~와 달리) | 명사 |\n| 차이 | **On the other hand,** (반면에) | 새 문장 |\n| 공통 | **like** (~처럼) | 명사 |\n| 공통 | **Similarly,** / **Likewise,** (마찬가지로) | 새 문장 |\n\n- In Korea, people usually eat rice with a spoon, **while** in Japan, people often hold the rice bowl and use chopsticks.\n- **Unlike** Korea, the United Kingdom drives on the left side of the road.\n- In Korea, Children\'s Day is on May 5. **Similarly**, Japan celebrates Children\'s Day on May 5.\n\n"~하는 것이 예의다 / 무례하게 여겨진다"는 **It is considered polite (rude) to ~**, "~하는 것이 흔하다"는 **It is common to ~**로 말합니다.\n\n> 💡 unlike, like는 전치사라서 뒤에 명사가 옵니다. 주어와 동사를 이어 말하려면 while이나 whereas를 씁니다.',
      easy: '두 나라를 **저울 양쪽에 올려놓는다**고 생각하십시오. 양쪽이 다르면 "이쪽은 이런 **반면**(while) 저쪽은 저렇다", 같으면 "이쪽도 그렇고 **마찬가지로**(similarly) 저쪽도 그렇다"고 말합니다.\n\n크리스마스로 연습해 보십시오. 한국은 겨울, 호주는 여름입니다. → In Korea, Christmas comes in winter, **while** in Australia, it comes in summer.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르십시오.\n\nIn Korea, the school year starts in March, [[blank]] in the United States, it usually starts in August or September.',
        choices: ['while', 'similarly', 'like'],
        answer: 0,
        why: ['', 'similarly는 공통점을 말할 때 씁니다. 두 나라의 새 학년 시작 달은 다릅니다.', 'like는 전치사라서 뒤에 주어 + 동사를 이을 수 없고, 뜻도 "~처럼"이라 맞지 않습니다.'],
        explain: '두 나라의 새 학년 시작 달이 **다르므로** 차이를 나타내는 **while**(~인 반면)을 씁니다. 뒤에 주어 + 동사(it usually starts)가 오는 것도 while이 접속사이기 때문입니다.',
      },
    },
    {
      title: '고정관념과 지나친 일반화 피하기',
      body: '**고정관념(stereotype)**은 어떤 집단의 사람들이 모두 같을 것이라고 굳게 믿는 생각이고, **지나친 일반화(overgeneralization)**는 몇몇 경우를 보고 "모두, 언제나"라고 말하는 것입니다. 같은 나라 사람도 한 사람 한 사람 다르기 때문에 이런 말은 사실과 다르고, 듣는 사람에게 상처를 줄 수 있습니다.\n\n| 지나친 일반화 | 더 정확한 말 |\n|---|---|\n| **All** teenagers love online games. | **Some** (**Many**) teenagers love online games. |\n| Koreans **always** eat spicy food. | **Many** Koreans **often** eat spicy food. |\n| People in cities are **never** friendly. | It **depends on** the person. |\n\n**정도를 조절하는 말**: some, many, most(확실할 때만), often, usually, tend to(~하는 경향이 있다), in many cases\n\n**부분 부정**: not all, not every, not always는 "**모두 ~인 것은 아니다**"라는 뜻입니다.\n\n- **Not all** students like sports. = 모든 학생이 운동을 좋아하는 것은 아니다. (좋아하는 학생도, 아닌 학생도 있다)\n- **Not every** country celebrates New Year\'s Day on January 1.\n\n> ⚠️ Not all students like sports. 는 "모든 학생이 운동을 싫어한다"가 아닙니다. 그 뜻은 **No** students like sports. 입니다.',
      easy: '한 반에 서른 명이 있으면 서른 가지 성격이 있습니다. 우리 반을 처음 본 사람이 한두 명만 보고 "이 반 학생들은 **다** 시끄러워"라고 하면 억울하겠지요? 다른 나라 사람들도 마찬가지입니다.\n\n그래서 말에 **브레이크**를 다는 습관이 필요합니다. all 대신 some, many, always 대신 often, usually. 이 작은 낱말 하나가 말을 정확하고 공손하게 만듭니다.',
      check: {
        type: 'ox',
        q: 'Not all students like sports. 는 "모든 학생이 운동을 싫어한다"는 뜻이다.',
        answer: false,
        explain: 'not all은 **부분 부정**으로 "모든 학생이 운동을 좋아하는 **것은 아니다**"라는 뜻입니다. 좋아하는 학생도 있고 아닌 학생도 있다는 말입니다. "아무도 좋아하지 않는다"는 No students like sports. 입니다.',
      },
    },
    {
      title: '공감하며 감정 표현하기',
      body: '**공감(empathy)**은 상대의 처지에서 그 감정을 이해하는 것입니다. 문화 차이로 놀라거나 속상한 친구에게는 먼저 감정을 알아주는 말을 합니다.\n\n| 쓰임 | 표현 |\n|---|---|\n| 감정 알아주기 | **I can see why you feel** nervous. / **I understand how you feel.** |\n| 짐작해 주기 | That **must be** hard (frustrating, confusing). |\n| 내 경우에 비추기 | **I would feel the same way.** |\n| 괜찮다고 해 주기 | **It\'s natural to feel** that way. |\n| 도움 제안 | **Is there anything I can do** to help? |\n\n**문법 확인**\n\n- 기분을 말하는 feel 뒤에는 **형용사**가 옵니다: feel **lonely**, feel **nervous** (부사를 쓴 feel nervously ×)\n- why you feel ~ 는 문장 속에 들어간 의문문이라 **주어 + 동사** 어순입니다: I can see why **you feel** ~ (why do you feel ×)\n- 감정을 나타내는 형용사: lonely(외로운), nervous(긴장한), confused(혼란스러운), disappointed(실망한), homesick(향수병을 앓는), relieved(안심한)\n\n> 💡 공감한 다음에 설명이나 조언을 덧붙이면 더 잘 받아들여집니다. "그럴 수 있겠다 → 사실은 이런 까닭이 있어"의 순서입니다.',
      easy: '친구가 넘어져서 무릎이 까졌을 때 "그 정도는 안 아파"라고 하면 더 속상합니다. "아프겠다"가 먼저입니다.\n\n영어로는 **I can see why you feel ~.**(네가 왜 ~한 기분인지 알겠어)가 바로 그 "아프겠다"입니다. ~ 자리에 친구의 기분(upset, nervous, lonely)을 넣기만 하면 됩니다.',
      check: {
        type: 'choice',
        q: '친구가 "I miss my family so much."라고 말했습니다. 가장 공감하는 대답은 무엇입니까?',
        choices: ['I can see why you feel homesick.', 'You should stop thinking about it.', 'Everyone misses their family, so it is not a big deal.'],
        answer: 0,
        why: ['', '감정을 알아주기 전에 그만하라고 하면 친구는 무시당한 느낌을 받습니다.', '모두 그렇다며 감정을 가볍게 여기는 말이라 공감이 아닙니다.'],
        explain: '**I can see why you feel homesick.**(네가 왜 집이 그리운지 알겠어)라는 말은 친구의 감정을 먼저 알아주는 공감 표현입니다.',
      },
    },
    {
      title: '모둠 과업에서 역할 나누고 도움 주고받기',
      body: '모둠 과업은 처음에 **역할**을 분명히 나누면 훨씬 잘 됩니다.\n\n| 역할 | 영어 | 하는 일 |\n|---|---|---|\n| 모둠장 | **leader** | 계획을 세우고 의견을 모은다 |\n| 기록자 | **note-taker** | 회의 내용을 적는다 |\n| 시간 관리자 | **timekeeper** | 시간을 확인하고 알려 준다 |\n| 자료 조사자 | **researcher** | 정보를 찾는다 |\n| 발표자 | **presenter** | 결과를 발표한다 |\n\n**역할 나누기 표현**\n\n- Who wants to ~? / **Why don\'t you** make the slides? (~하는 게 어때?)\n- **I\'ll take care of** the research. / **I can** be the note-taker.\n- **How about** dividing the work into three parts? (How about + -ing)\n\n**도움 주고받기 표현**\n\n- 도움 청하기: **Could you give me a hand with** this? / **Can you help me** find some pictures?\n- 도움 주기: **Do you need any help?** / **Let me help you** with that. (Let me + 동사원형)\n- 고마움: **Thanks for your help.** / **I really appreciate it.**\n\n> 💡 Why don\'t you ~? 는 이유를 묻는 말이 아니라 "~하는 게 어때?"라는 **제안**입니다.',
      easy: '모둠 과업은 **축구 팀**과 같습니다. 모두가 공만 쫓아가면 골문이 비고, 모두 골키퍼만 하려 하면 골을 못 넣습니다. 처음에 "너는 수비, 나는 공격" 하고 자리를 정해야 경기가 됩니다.\n\n그리고 경기 중에 동료가 힘들어 보이면 "도와줄까?(Do you need any help?)", 내가 힘들면 "좀 도와줄래?(Could you give me a hand?)"라고 말하는 것이 좋은 팀입니다.',
      check: {
        type: 'choice',
        q: '모둠 회의에서 **회의 내용을 적는** 역할을 영어로 무엇이라고 합니까?',
        choices: ['timekeeper', 'presenter', 'note-taker'],
        answer: 2,
        why: ['timekeeper는 시간을 확인하고 알려 주는 사람입니다.', 'presenter는 결과를 발표하는 사람입니다.', ''],
        explain: '회의 내용을 적는(take notes) 사람은 **note-taker**입니다.',
      },
    },
    {
      title: '적극적으로 질문하고 의견 보태기',
      body: '좋은 모둠원은 **잘 듣고, 모르면 묻고, 생각을 보탭니다.**\n\n**질문하기**\n\n| 쓰임 | 표현 |\n|---|---|\n| 뜻을 분명히 하기 | **What do you mean by** "eco-friendly"? / **Could you explain that a bit more?** |\n| 내가 바르게 이해했는지 확인 | **So you mean** we should start earlier? |\n| 의견 묻기 | **What do you think about** this idea? / **Do you have any other ideas?** |\n\n**의견 보태기**\n\n| 쓰임 | 표현 |\n|---|---|\n| 덧붙이기 | **I\'d like to add that** ~ / **In addition,** ~ |\n| 남의 생각 위에 쌓기 | **Building on** Minsu\'s idea, ~ / **I agree, and also** ~ |\n| 인정하기 | **That\'s a good point.** |\n| 공손하게 다른 의견 | **I see your point, but** ~ / **How about** ~ **instead?** |\n\n- 남이 말할 때 끊지 않고 끝까지 듣습니다.\n- 반대 의견은 사람이 아니라 **생각**에 대해 말합니다(You are wrong. 보다 I see your point, but ~).\n- 조용한 모둠원에게 What do you think, Sua? 처럼 의견을 물어 모두 참여하게 합니다.',
      easy: '모둠 토의는 **블록 쌓기**입니다. 친구가 블록 하나를 놓으면(의견), 그 위에 내 블록을 얹어(Building on your idea, ~) 탑을 키웁니다. 친구의 블록이 무엇인지 잘 안 보이면 "그거 무슨 모양이야?(What do you mean by ~?)" 하고 묻습니다.\n\n친구 블록을 치워 버리는 대신 "이 자리보다 저 자리는 어때?(How about ~ instead?)"라고 말하면 탑이 무너지지 않습니다.',
      check: {
        type: 'choice',
        q: '친구가 한 말의 **뜻을 분명히 알고 싶을 때** 쓰는 말은 무엇입니까?',
        choices: ['That\'s a good point.', 'What do you mean by that?', 'I\'d like to add something.'],
        answer: 1,
        why: ['That\'s a good point. 는 상대의 의견을 인정하는 말입니다.', '', '내 의견을 덧붙이겠다는 말입니다.'],
        explain: '**What do you mean by ~?**(~이 무슨 뜻이니?)는 상대의 말을 분명히 이해하려고 묻는 표현입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 대화를 읽고, 문화 차이를 이해하고 공감하는 표현을 찾아보십시오.\n\n' + TALK,
      steps: [
        '**Emma의 감정**: I felt a little uncomfortable. — 처음 만난 친구들이 나이를 물어 불편했습니다.',
        '**공감**: Jiwoo는 먼저 **I can see why you feel that way.**로 감정을 알아줍니다.',
        '**문화 설명**: In Korea, people **often** ask about age because ~ — 한국에서는 나이에 따라 말하는 방식을 정하는 경우가 많다는 까닭을 설명합니다.',
        '**비교**: Emma가 자기가 살던 곳에서는 처음 만났을 때 보통(usually) 묻지 않는다고 말합니다.',
        '**일반화 피하기**: **not all** Koreans ask about age right away. **It depends on the person.** — 모든 한국인이 그런 것은 아니라고 덧붙입니다.',
        '**결과**: It makes more sense to me now. — Emma가 차이를 이해하게 되었습니다.',
      ],
      answer: '공감: I can see why you feel that way. / 비교·설명: In Korea, people often ~ / 일반화 피하기: not all Koreans ~, It depends on the person.',
    },
    {
      q: '다음 모둠 대화에서 네 사람이 맡은 역할을 정리해 보십시오.\n\n' + GROUP,
      steps: [
        '**Hayun**: I\'ll take care of that. → 정보를 찾는 **자료 조사자(researcher)**',
        '**Seojun**: Minsu의 제안(why don\'t you make the slides?)을 받아 **슬라이드 만들기**를 맡고, could you explain ~ 으로 질문합니다.',
        '**Minsu**: 역할을 나누고, I\'ll write the script and keep track of time. → **모둠장(leader)**이자 원고 쓰기·**시간 관리(timekeeper)**',
        '**Sua**: I\'ll be the presenter. → **발표자(presenter)**. I\'d like to add that ~ 으로 금요일에 함께 연습하자는 의견을 보탭니다.',
        '마지막에 Hayun이 Let me know if anyone needs a hand. 로 도움을 주겠다고 합니다.',
      ],
      answer: 'Hayun – 자료 조사, Seojun – 슬라이드, Minsu – 모둠장(원고·시간 관리), Sua – 발표',
    },
  ],

  terms: [
    { term: '문화 차이', def: '나라나 집단마다 생활 방식, 예절, 가치관이 다른 것입니다. 옳고 그름이 아니라 "다름"으로 이해합니다.' },
    { term: 'while / whereas', def: '"~인 반면"이라는 뜻으로 두 가지의 차이를 견주는 접속사입니다. 뒤에 주어 + 동사가 옵니다.' },
    { term: 'unlike / like', def: '"~와 달리 / ~처럼"이라는 뜻의 전치사입니다. 뒤에 명사가 옵니다. 예: Unlike Korea, ~' },
    { term: '고정관념 (stereotype)', def: '어떤 집단의 사람들이 모두 같은 특징을 가졌다고 굳게 믿는 생각입니다.' },
    { term: '지나친 일반화', def: '몇몇 경우만 보고 "모두, 언제나"라고 단정하는 것입니다. some, many, not all 같은 말로 피합니다.' },
    { term: '부분 부정', def: 'not all, not every, not always처럼 "모두(언제나) ~인 것은 아니다"라는 뜻을 나타내는 말입니다.' },
    { term: '공감 (empathy)', def: '상대의 처지에서 그 감정을 이해하는 것입니다. 예: I can see why you feel nervous.' },
    { term: '모둠 역할', def: '모둠 과업에서 나누어 맡는 일입니다. 예: leader, note-taker, timekeeper, researcher, presenter' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르십시오.\n\nIn Korea, Christmas comes in winter, [[blank]] in Australia, it comes in summer.',
      choices: ['because', 'whereas', 'so', 'similarly'],
      answer: 1,
      why: ['한국이 겨울인 것이 호주가 여름인 까닭은 아닙니다. 두 사실을 견주는 말이 필요합니다.', '', 'so는 결과를 잇는 말입니다. 두 나라의 차이를 견주는 말이 필요합니다.', 'similarly는 공통점을 말할 때 씁니다. 겨울과 여름은 서로 다릅니다.'],
      explain: '한국은 겨울, 호주는 여름으로 **다르므로** 차이를 견주는 **whereas**(~인 반면)를 씁니다. while을 써도 같은 뜻입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오. (~와 달리)\n\n[[blank]] Korea, the United Kingdom drives on the left side of the road.',
      answer: ['Unlike'],
      wrong: [
        { a: 'Like', why: 'like는 "~처럼"으로 공통점을 말합니다. 한국은 오른쪽으로 다니므로 "~와 달리"인 unlike를 씁니다.' },
        { a: 'While', why: 'while은 접속사라서 뒤에 주어 + 동사가 와야 합니다. 명사(Korea) 앞에는 전치사 unlike를 씁니다.' },
      ],
      explain: '한국은 오른쪽, 영국은 왼쪽으로 다니므로 차이를 나타내는 전치사 **Unlike**(~와 달리)를 씁니다. 뒤에 명사(Korea)가 온 것도 단서입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 0,
      q: '두 문장의 관계에 맞게 빈칸에 알맞은 말을 고르십시오.\n\nIn Korea, Children\'s Day is on May 5. [[blank]], Japan celebrates Children\'s Day on May 5.',
      choices: ['However', 'Similarly', 'Unlike', 'Whereas'],
      answer: 1,
      why: ['However는 앞 문장과 반대되는 내용을 이을 때 씁니다. 두 나라의 어린이날은 같은 날입니다.', '', 'Unlike는 전치사라서 바로 뒤에 명사가 와야 하고, 뜻도 차이를 나타냅니다.', 'whereas는 한 문장 안에서 차이를 견주는 접속사입니다. 쉼표와 함께 새 문장을 시작하는 말로 쓰지 않습니다.'],
      explain: '두 나라 모두 5월 5일이 어린이날이므로 **공통점**을 잇는 **Similarly**(마찬가지로)를 씁니다.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'Not every student enjoys science. 는 과학을 좋아하는 학생도 있고 그렇지 않은 학생도 있다는 뜻이다.',
      answer: true,
      explain: 'not every는 **부분 부정**으로 "모든 학생이 과학을 좋아하는 것은 아니다"라는 뜻입니다. 좋아하는 학생도, 그렇지 않은 학생도 있다는 말이므로 맞습니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '지나친 일반화를 **피한** 문장은 무엇입니까?',
      choices: [
        'All people in big cities are busy every single day.',
        'People in big cities never have free time.',
        'Many people in big cities have busy schedules.',
        'Everyone in a big city is always in a hurry.',
      ],
      answer: 2,
      why: ['all은 예외 없이 모두라는 말이라 지나친 일반화입니다.', 'never는 예외가 전혀 없다는 말이라 지나친 일반화입니다.', '', 'everyone과 always가 함께 쓰여 지나친 일반화가 되었습니다.'],
      explain: '**Many**(많은)는 "모두"가 아니라 "많은 사람"이라고 정도를 조절한 말입니다. all, never, everyone, always는 예외를 인정하지 않아 지나친 일반화가 됩니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 1,
      q: '"모든 십대가 같은 음악을 좋아하는 것은 아니다."가 되도록 빈칸에 알맞은 한 낱말을 쓰십시오.\n\n[[blank]] all teenagers like the same music.',
      answer: ['Not'],
      wrong: [
        { a: 'No', why: 'No all ~ 이라는 말은 쓰지 않습니다. 부분 부정은 Not all ~ 입니다.' },
        { a: 'Some', why: 'Some all ~ 은 틀린 말입니다. all 앞에 not을 붙여 부분 부정을 만듭니다.' },
      ],
      explain: '**Not all** ~ 은 "모두 ~인 것은 아니다"라는 부분 부정입니다. Not all teenagers like the same music.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 2,
      q: '친구가 "I\'m nervous about the speech contest tomorrow."라고 말했습니다. 가장 공감하는 대답은 무엇입니까?',
      choices: [
        'Why are you nervous? Everyone gives speeches, so it is really not a big deal at all.',
        'I can see why you feel nervous. You practiced a lot, though.',
        'That\'s your problem, not mine.',
        'Contests are boring. Let\'s talk about something else.',
      ],
      answer: 1,
      why: ['감정을 별일 아니라고 여기는 말이라 친구는 이해받지 못한 느낌을 받습니다.', '', '친구의 감정에 무관심한 말입니다.', '친구가 걱정하는 일을 무시하고 화제를 돌렸습니다.'],
      explain: '**I can see why you feel nervous.**로 먼저 감정을 알아주고, 연습을 많이 했다며 힘을 주는 대답이 공감하는 말입니다.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오. (느끼다)\n\nI can see why you [[blank]] upset.',
      answer: ['feel', 'felt'],
      wrong: [
        { a: 'feeling', why: 'why 뒤에는 주어 + 동사가 옵니다. you 뒤에 동사 feel을 씁니다.' },
        { a: 'do', why: 'why 뒤는 의문문 어순이 아니라 주어 + 동사입니다. do를 넣지 않고 you feel로 씁니다.' },
      ],
      explain: '**I can see why you feel upset.**(네가 왜 속상한지 알겠어) — 문장 속에 들어간 의문문이므로 why + 주어(you) + 동사(feel) 순서입니다. 지난 일이면 felt도 씁니다.',
    },
    {
      id: 'p9', level: 1, type: 'choice', concept: 3,
      q: '모둠원이 "I\'m having trouble finding pictures for our poster."라고 말했습니다. 도움을 주는 말로 가장 알맞은 것은 무엇입니까?',
      choices: [
        'That\'s your job, not mine.',
        'Let me help you look for some.',
        'Why didn\'t you find them yesterday?',
        'I don\'t like pictures very much, so I will not look.',
      ],
      answer: 1,
      why: ['도움을 거절하는 말이라 협력하는 태도가 아닙니다.', '', '어려움을 탓하는 말이라 도움이 되지 않습니다.', '자기 취향만 말하며 돕지 않겠다는 말입니다.'],
      explain: '**Let me help you ~**(~하는 것을 도와줄게)는 도움을 주겠다는 표현입니다. Let me 뒤에는 동사원형(help)이 옵니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '다음 모둠 대화를 읽고, **Seojun**이 맡은 일을 고르십시오.\n\n' + GROUP,
      choices: ['정보 찾기', '슬라이드 만들기', '발표하기', '원고 쓰기'],
      answer: 1,
      why: ['정보 찾기는 Hayun이 I\'ll take care of that. 으로 맡았습니다.', '', '발표는 Sua가 I\'ll be the presenter. 로 맡았습니다.', '원고는 Minsu가 I\'ll write the script. 로 맡았습니다.'],
      hint: 'Minsu가 Seojun에게 why don\'t you ~? 로 무엇을 제안했는지 찾으십시오.',
      explain: 'Minsu가 **why don\'t you make the slides?**라고 제안했고, Seojun이 **Sure.**라고 받아들였습니다. 그래서 Seojun은 슬라이드를 만듭니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '다음 모둠 대화에서 Seojun이 말한 could you explain what kind of slides you want? 의 역할로 가장 알맞은 것은 무엇입니까?\n\n' + GROUP,
      choices: ['제안을 거절하기', '잘 모르는 것을 분명히 묻기', '다른 모둠원을 칭찬하기', '회의를 끝내자고 하기'],
      answer: 1,
      why: ['Sure.라고 맡겠다고 한 뒤에 물은 것이므로 거절이 아닙니다.', '', '칭찬하는 말(Great job 등)이 아닙니다.', '회의를 끝내자는 뜻의 말이 아닙니다.'],
      explain: 'Seojun은 슬라이드 만들기를 맡은 뒤 **Could you explain ~?**으로 어떤 슬라이드를 원하는지 **분명히 물었습니다.** 적극적으로 질문하는 모둠원의 모습입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '친구의 의견에 동의하면서 **내 생각을 덧붙이는** 말로 가장 알맞은 것은 무엇입니까?',
      choices: [
        'You are wrong. My idea is better.',
        'I agree, and I\'d like to add that we need more photos.',
        'Can you say that again? I could not hear you because of the noise.',
        'Let\'s stop talking.',
      ],
      answer: 1,
      why: ['동의가 아니라 상대를 무시하는 말입니다. 다른 의견은 I see your point, but ~ 처럼 공손하게 말합니다.', '', '다시 말해 달라는 질문일 뿐, 생각을 덧붙이지 않았습니다.', '토의를 멈추자는 말입니다.'],
      explain: '**I agree, and I\'d like to add that ~**은 친구 의견에 동의하고 그 위에 내 생각을 보태는 표현입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 대화의 내용과 일치하는 것은 무엇입니까?\n\n' + TALK,
      choices: [
        'Emma was happy when her classmates asked her age.',
        'Jiwoo said that the classmates wanted to be rude to Emma on purpose that day.',
        'Jiwoo explained that age can affect how Koreans talk to each other.',
        'Jiwoo said that every Korean asks about age right away.',
      ],
      answer: 2,
      why: [
        'Emma는 I felt a little uncomfortable. 이라고 했습니다.',
        'Jiwoo는 They didn\'t mean to be rude. 라며 무례하게 굴려던 것이 아니라고 했습니다.',
        '',
        'Jiwoo는 not all Koreans ask about age right away 라고 했습니다.',
      ],
      hint: '선택지마다 대화에서 근거 문장을 찾아 견주어 보십시오.',
      explain: 'Jiwoo는 **it helps them decide how to talk to each other**라며 나이가 말하는 방식을 정하는 데 도움이 된다고 설명했습니다. 나머지는 대화의 내용과 반대입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '다음은 문화 비교 발표문의 일부입니다. 고정관념이나 지나친 일반화가 드러난 문장은 무엇입니까?\n\n(A) In many Korean schools, students clean their classrooms themselves.\n(B) In some other countries, school staff usually do the cleaning.\n(C) Students in those countries are all lazy.\n(D) Both ways can teach students to respect shared spaces.',
      choices: ['(A)', '(B)', '(C)', '(D)'],
      answer: 2,
      fixed: true,
      why: [
        'many로 정도를 조절했고 사실을 전하는 문장입니다.',
        'some, usually로 범위와 정도를 조절했습니다.',
        '',
        '두 방식을 모두 존중하는 문장입니다.',
      ],
      hint: 'all, always, never처럼 예외를 인정하지 않는 말과, 사람을 낮추는 평가를 찾으십시오.',
      explain: '(C)는 청소를 직원이 한다는 **방식의 차이**를 근거로 그 나라 학생들이 **모두 게으르다(all lazy)**고 단정한 고정관념입니다. 문화 차이는 우열이 아니라 다름으로 설명해야 합니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오. (w로 시작하는 접속사, ~인 반면)\n\nKorean students often clean their own classrooms, [[blank]] in some countries, school staff do the cleaning.',
      answer: ['while', 'whereas'],
      wrong: [
        { a: 'unlike', why: 'unlike는 전치사라서 뒤에 주어 + 동사(school staff do)를 이을 수 없습니다.' },
        { a: 'when', why: 'when은 "~할 때"라는 뜻이라 두 사실의 차이를 견주는 뜻이 되지 않습니다.' },
      ],
      hint: '뒤에 주어 + 동사가 오고, 두 나라의 차이를 견주는 말입니다.',
      explain: '두 사실의 **차이**를 견주고 뒤에 주어 + 동사가 오므로 접속사 **while** 또는 **whereas**를 씁니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '다음 대화에서 Emma의 마음의 변화로 가장 알맞은 것은 무엇입니까?\n\n' + TALK,
      choices: [
        'uncomfortable → understanding',
        'excited → disappointed',
        'angry → afraid',
        'bored → excited',
      ],
      answer: 0,
      why: [
        '',
        '처음에 신났던 것이 아니라 불편했습니다(uncomfortable).',
        '화가 났다는 말은 없고, 끝에서도 두려워하지 않습니다.',
        '처음에 지루했다는 말이 없고, 끝은 이해하게 된 마음입니다.',
      ],
      hint: '첫 대사의 감정 낱말과 마지막 대사 It makes more sense to me now. 를 보십시오.',
      explain: 'Emma는 처음에 **uncomfortable**(불편한)했지만, Jiwoo의 공감과 설명을 듣고 It makes more sense to me now. 라며 **이해하게** 되었습니다.',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 4,
      q: '모둠 토의가 자연스럽게 이어지도록 문장을 놓으십시오.',
      choices: [
        'What do you think we should do for the school festival?',
        'How about a booth that shows food from different cultures?',
        'What do you mean by "food from different cultures"?',
        'I mean simple snacks from several countries, with short explanations.',
        'That\'s a good point. Building on that, we could add a quiz about each snack.',
      ],
      answer: [0, 1, 2, 3, 4],
      hint: '의견 묻기 → 제안 → 뜻 묻기 → 설명 → 의견 보태기의 흐름입니다.',
      explain: '**의견 묻기**(What do you think ~?) → **제안**(How about ~?) → **뜻을 분명히 묻기**(What do you mean by ~?) → **설명**(I mean ~) → **인정하고 보태기**(That\'s a good point. Building on that, ~)의 순서입니다.',
    },
  ],

  deeper: [
    {
      title: '문화 차이를 볼 때의 두 가지 눈',
      body: '다른 문화를 처음 만나면 "왜 저렇게 하지?" 하고 놀라기 쉽습니다. 이때 도움이 되는 생각이 두 가지 있습니다.\n\n- **다름은 틀림이 아니다**: 신발을 벗는 집과 신는 집, 숟가락으로 밥을 먹는 나라와 젓가락으로 먹는 나라는 각자의 기후·역사·생활 방식 속에서 자리 잡은 습관입니다. 어느 쪽이 더 낫다고 줄 세우지 않습니다.\n- **한 사람은 한 나라의 대표가 아니다**: 한 사람에게서 본 모습을 그 나라 전체의 특징으로 여기면 고정관념이 생깁니다. 같은 나라 안에서도 지역·세대·가정마다 생활이 다릅니다.\n\n그래서 다른 문화에 대해 말할 때는 "In Korea, people often ~"처럼 **정도를 조절하고**, 궁금한 것은 단정하기 전에 **물어보는** 태도가 중요합니다.',
    },
    {
      title: '좋은 모둠은 무엇이 다를까',
      body: '모둠 과업이 잘 되는 모둠에는 공통점이 있습니다.\n\n1. **역할이 분명합니다.** 누가 무엇을 언제까지 하는지 처음에 정하고 적어 둡니다.\n2. **모두가 말합니다.** 목소리 큰 한두 사람만 말하지 않도록 What do you think? 로 조용한 모둠원에게도 묻습니다.\n3. **질문을 두려워하지 않습니다.** "이해 못 했다"고 말하는 것은 부끄러운 일이 아니라 실수를 막는 일입니다.\n4. **생각을 비판하되 사람을 비판하지 않습니다.** I see your point, but ~ 처럼 의견에 대해 말합니다.\n\n영어Ⅱ의 "협력하며 토론하기"에서는 근거를 들어 찬반 의견을 나누는 방법을 더 배웁니다.',
    },
  ],

  faq: [
    {
      q: 'while이랑 whereas는 뜻이 같아요?',
      a: '차이를 견줄 때는 거의 같은 뜻(~인 반면)입니다. whereas가 조금 더 격식 있는 느낌입니다. 다만 while은 "~하는 동안"이라는 시간의 뜻도 있으므로, 문맥을 보고 어느 뜻인지 판단합니다.',
    },
    {
      q: 'Not all이랑 All ~ not은 같은 뜻이에요?',
      a: '시험에서는 Not all ~ 을 부분 부정(모두 ~인 것은 아니다)으로 익혀 두십시오. All students are not ~ 은 문맥에 따라 "모두 ~가 아니다"로도 읽힐 수 있어 뜻이 모호합니다. 부분 부정을 분명히 말하려면 Not all students are ~ 처럼 not을 all 앞에 둡니다.',
    },
    {
      q: '공감할 때 무조건 상대 말이 맞다고 해야 해요?',
      a: '아닙니다. 공감은 상대의 **감정**을 이해한다는 뜻이지, 생각에 모두 동의한다는 뜻이 아닙니다. I can see why you feel upset, but I think there may be another reason. 처럼 감정을 먼저 알아준 뒤 내 생각을 말할 수 있습니다.',
    },
    {
      q: 'Why don\'t you ~?는 왜 안 하냐고 따지는 말 아니에요?',
      a: '대부분 "~하는 게 어때?"라는 **제안**입니다. Why don\'t you make the slides? 는 슬라이드를 만들어 보라는 권유입니다. 나를 넣은 Why don\'t we ~? 는 "우리 ~하자"는 뜻입니다.',
    },
  ],

  mistakes: [
    'Unlike Koreans eat with spoons, ~ 처럼 unlike 뒤에 주어 + 동사를 쓰는 실수 — 절을 이을 때는 while/whereas, unlike 뒤에는 명사를 씁니다.',
    'Not all students like sports. 를 "모든 학생이 운동을 싫어한다"로 읽는 실수 — 부분 부정으로 "모두 좋아하는 것은 아니다"입니다.',
    'I can see why do you feel sad. 처럼 의문문 어순을 쓰는 실수 — 문장 속 의문문은 why you feel ~ 처럼 주어 + 동사 순서입니다.',
  ],

  gens: [
    {
      id: 'compare-words',
      level: 1,
      title: '차이·공통점을 견주는 말 고르기',
      make: function (R) {
        // k: 정답 종류 — while(차이, 절), unlike(차이, 명사), similarly(공통, 새 문장), like(공통, 명사)
        var bank = [
          { k: 'while', s: 'In Korea, people usually eat rice with a spoon, [[blank]] in Japan, people often hold the rice bowl and use chopsticks.' },
          { k: 'while', s: 'In Korea, the school year starts in March, [[blank]] in the United States, it usually starts in August or September.' },
          { k: 'while', s: 'In Korea, Christmas comes in winter, [[blank]] in Australia, it comes in summer.' },
          { k: 'while', s: 'In Korea, people usually write the family name first, [[blank]] in English-speaking countries, it usually comes last.' },
          { k: 'while', s: 'In the United Kingdom, cars drive on the left side of the road, [[blank]] in Korea, they drive on the right.' },
          { k: 'unlike', s: '[[blank]] Korea, the United Kingdom drives on the left side of the road.' },
          { k: 'unlike', s: '[[blank]] Korea, Australia has Christmas in summer.' },
          { k: 'unlike', s: '[[blank]] Korea, the United States usually starts the school year in August or September.' },
          { k: 'similarly', s: 'In Korea, Children\'s Day is on May 5. [[blank]], Japan celebrates Children\'s Day on May 5.' },
          { k: 'similarly', s: 'Many people in Korea celebrate the Lunar New Year. [[blank]], many people in China celebrate it.' },
          { k: 'similarly', s: 'Many Korean families take off their shoes at home. [[blank]], many Japanese families take off their shoes at home.' },
          { k: 'like', s: '[[blank]] Korea, Japan celebrates Children\'s Day on May 5.' },
          { k: 'like', s: '[[blank]] Korea, China celebrates the Lunar New Year.' },
          { k: 'like', s: '[[blank]] many Korean families, many Japanese families take off their shoes at home.' },
        ];
        var item = R.pick(bank);
        // 칸이 문장 맨 앞(글 처음이나 마침표 뒤)이면 보기를 모두 대문자로, 아니면 모두 소문자로 — 대소문자가 단서가 되지 않게
        var at = item.s.indexOf('[[blank]]');
        var start = at === 0 || item.s.slice(at - 2, at) === '. ';
        var cap = function (w) { return start ? w.charAt(0).toUpperCase() + w.slice(1) : w; };
        var correct = cap(item.k);
        var reasonOf = {
          while: 'while은 한 문장 안에서 주어 + 동사를 이어 차이를 견주는 접속사입니다.',
          unlike: 'unlike는 "~와 달리"라는 뜻의 전치사로, 뒤에 명사가 오고 차이를 나타냅니다.',
          similarly: 'similarly는 앞 문장과 같은 점을 새 문장으로 이을 때 씁니다.',
          like: 'like는 "~처럼"이라는 뜻의 전치사로, 뒤에 명사가 오고 공통점을 나타냅니다.',
          because: 'because는 까닭을 잇는 말입니다. 두 사실은 원인과 결과가 아닙니다.',
        };
        var reason = {};
        Object.keys(reasonOf).forEach(function (k) { reason[cap(k)] = reasonOf[k]; });
        var pool = ['while', 'unlike', 'similarly', 'like', 'because'].filter(function (w) { return w !== item.k; }).map(cap);
        var pick = R.choices(correct, R.shuffle(pool));
        var kind = { while: '두 사실이 다르고 뒤에 주어 + 동사가 오므로', unlike: '두 사실이 다르고 뒤에 명사(나라 이름)가 오므로', similarly: '두 문장이 같은 점을 말하고 새 문장을 시작하므로', like: '두 사실이 같고 뒤에 명사가 오므로' };
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말을 고르십시오.\n\n' + item.s,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] + ' 이 문장에는 ' + correct + ' 표현이 맞습니다.'; }),
          explain: kind[item.k] + ' **' + correct + '**' + ' 표현을 씁니다. ' + reason[correct],
        };
      },
    },
    {
      id: 'avoid-overgeneralizing',
      level: 2,
      title: '지나친 일반화를 피한 문장 고르기',
      make: function (R) {
        var groups = ['teenagers', 'people in big cities', 'older people', 'students in our school', 'people in Korea', 'exchange students'];
        var acts = ['enjoy spicy food', 'get up early', 'like winter sports', 'use public transportation', 'play online games', 'listen to music on the bus'];
        var g = R.pick(groups);
        var a = R.pick(acts);
        var G = g.charAt(0).toUpperCase() + g.slice(1);
        var good = R.pick(['Some ', 'Many ', 'Not all ']) + g + ' ' + a + '.';
        var bads = [
          ['All ' + g + ' ' + a + '.', 'all은 예외를 인정하지 않는 말이라 지나친 일반화입니다.'],
          [G + ' always ' + a + '.', 'always는 예외 없이 언제나라는 말이라 지나친 일반화입니다.'],
          [G + ' never ' + a + '.', 'never는 한 사람도, 한 번도 없다는 말이라 지나친 일반화입니다.'],
          [G + ' all ' + a + '.', '주어 뒤의 all도 예외 없이 모두라는 말이라 지나친 일반화입니다.'],
        ];
        var reason = {};
        bads.forEach(function (b) { reason[b[0]] = b[1]; });
        var pick = R.choices(good, R.shuffle(bads.map(function (b) { return b[0]; })));
        var how = /^Not all/.test(good) ? 'Not all(모두 ~인 것은 아니다)로 예외를 인정했습니다' : (/^Some/.test(good) ? 'Some(몇몇)으로 범위를 좁혔습니다' : 'Many(많은)로 "모두"가 아님을 밝혔습니다');
        return {
          type: 'choice', concept: 1,
          q: '지나친 일반화를 **피한** 문장은 무엇입니까?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === good ? '' : reason[c]; }),
          explain: '**' + good + '** — ' + how + '. all, always, never처럼 예외를 인정하지 않는 말은 고정관념을 만들기 쉽습니다.',
        };
      },
    },
    {
      id: 'empathy-feel',
      level: 1,
      title: '상황에 맞는 감정 낱말로 공감하기',
      make: function (R) {
        var bank = [
          { say: 'My best friend moved to another city.', feel: 'lonely', ko: '외로운', v: -1 },
          { say: 'I have a big exam tomorrow morning.', feel: 'nervous', ko: '긴장한', v: -1 },
          { say: 'Our team lost the final game by one point.', feel: 'disappointed', ko: '실망한', v: -1 },
          { say: 'I can\'t understand the rules of this new game at all.', feel: 'confused', ko: '혼란스러운', v: -1 },
          { say: 'I miss my family and my hometown so much.', feel: 'homesick', ko: '향수병을 앓는(집이 그리운)', v: -1 },
          { say: 'My little brother is sick, and he won\'t eat anything.', feel: 'worried', ko: '걱정하는', v: -1 },
          { say: 'I finally finished the project that took three months!', feel: 'proud', ko: '자랑스러운', v: 1 },
          { say: 'I found the wallet I lost yesterday!', feel: 'relieved', ko: '안심한', v: 1 },
          { say: 'We are going on a field trip to the science museum tomorrow!', feel: 'excited', ko: '신이 난', v: 1 },
        ];
        var item = R.pick(bank);
        // 오답은 반대쪽 감정(기쁨 ↔ 걱정)에서 고른다 — 같은 쪽 감정은 둘 다 맞을 수 있어 쓰지 않는다
        var opp = bank.filter(function (b) { return b.v !== item.v; });
        var w = R.sample(opp, 3);
        var reason = {};
        w.forEach(function (b) { reason['I can see why you feel ' + b.feel + '.'] = b.feel + '(' + b.ko + ') 감정은 친구의 상황과 맞지 않습니다.'; });
        var correct = 'I can see why you feel ' + item.feel + '.';
        var pick = R.choices(correct, w.map(function (b) { return 'I can see why you feel ' + b.feel + '.'; }));
        return {
          type: 'choice', concept: 2,
          q: '친구가 이렇게 말했습니다. 친구의 감정에 알맞게 공감하는 말을 고르십시오.\n\n"' + item.say + '"',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '친구의 상황으로 보아 **' + item.feel + '**(' + item.ko + ') 감정이 알맞습니다. **I can see why you feel ' + item.feel + '.**로 감정을 먼저 알아줍니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'culture', m: '문화', ex: 'Food is an important part of every culture.', exm: '음식은 모든 문화의 중요한 부분이다.' },
    { w: 'custom', m: '관습, 풍습', ex: 'Bowing to elders is a common custom in Korea.', exm: '웃어른께 절하는 것은 한국의 흔한 풍습이다.' },
    { w: 'tradition', m: '전통', ex: 'Making songpyeon on Chuseok is a family tradition.', exm: '추석에 송편을 빚는 것은 집안의 전통이다.' },
    { w: 'compare', m: '비교하다', ex: 'We compared school lunches in three countries.', exm: '우리는 세 나라의 학교 급식을 비교했다.' },
    { w: 'difference', m: '차이', ex: 'Can you see the difference between the two pictures?', exm: '두 그림의 차이가 보이니?' },
    { w: 'similar', m: '비슷한', ex: 'The two festivals are similar in many ways.', exm: '두 축제는 여러모로 비슷하다.' },
    { w: 'stereotype', m: '고정관념', ex: 'Stereotypes can hurt people\'s feelings.', exm: '고정관념은 사람들의 마음을 다치게 할 수 있다.' },
    { w: 'generalize', m: '일반화하다', ex: 'It is not fair to generalize from one person.', exm: '한 사람을 보고 일반화하는 것은 공정하지 않다.' },
    { w: 'respect', m: '존중하다; 존중', ex: 'We should respect other ways of life.', exm: '우리는 다른 생활 방식을 존중해야 한다.' },
    { w: 'polite', m: '예의 바른, 공손한', ex: 'It is polite to say thank you.', exm: '고맙다고 말하는 것은 예의 바른 일이다.' },
    { w: 'rude', m: '무례한', ex: 'Some gestures can seem rude in other cultures.', exm: '어떤 손짓은 다른 문화에서 무례해 보일 수 있다.' },
    { w: 'uncomfortable', m: '불편한', ex: 'I felt uncomfortable in the noisy room.', exm: '나는 시끄러운 방에서 불편했다.' },
    { w: 'empathy', m: '공감', ex: 'Good friends show empathy when you are sad.', exm: '좋은 친구는 네가 슬플 때 공감해 준다.' },
    { w: 'homesick', m: '향수병을 앓는, 집이 그리운', ex: 'The exchange student felt homesick at first.', exm: '그 교환 학생은 처음에 집을 그리워했다.' },
    { w: 'role', m: '역할', ex: 'Each member has a different role in the group.', exm: '모둠원마다 맡은 역할이 다르다.' },
    { w: 'cooperate', m: '협력하다', ex: 'We cooperated to finish the poster on time.', exm: '우리는 포스터를 제때 끝내려고 협력했다.' },
    { w: 'contribute', m: '기여하다, 보태다', ex: 'Everyone contributed an idea to the plan.', exm: '모두가 계획에 생각을 하나씩 보탰다.' },
    { w: 'explain', m: '설명하다', ex: 'Could you explain the rules again?', exm: '규칙을 다시 설명해 줄 수 있니?' },
    { w: 'suggestion', m: '제안', ex: 'Thank you for your helpful suggestion.', exm: '도움이 되는 제안을 해 줘서 고마워.' },
  ],
});
})();
