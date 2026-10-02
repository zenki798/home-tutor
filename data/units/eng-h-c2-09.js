/* 공통영어2 · 도치와 강조
 * 예문·지문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 짧은 글 (직접 쓴 글, 가상의 학교 행사)
  var FAIR = 'Last winter, our school held its first science fair. Never had so many students worked so hard on their projects. Only on the final day did the judges announce the winners. It was Doyun\'s team that won first prize with a small robot that sorts trash. What surprised everyone was the robot\'s speed.';

  // so·neither 대답 생성기용: 동사 종류별 형태
  var AUX = {
    do:   function (s) { return (s === 'she' || s === 'he') ? 'does' : 'do'; },
    did:  function () { return 'did'; },
    be:   function (s) { return s === 'I' ? 'am' : (s === 'she' || s === 'he') ? 'is' : 'are'; },
    was:  function (s) { return (s === 'we' || s === 'they') ? 'were' : 'was'; },
    have: function (s) { return (s === 'she' || s === 'he') ? 'has' : 'have'; },
    can:  function () { return 'can'; },
    will: function () { return 'will'; },
  };
  var KIND = { do: '일반동사 현재', did: '일반동사 과거', be: 'be동사 현재', was: 'be동사 과거', have: '현재완료(have)', can: '조동사 can', will: '조동사 will' };

Tutor.registerUnit({
  id: 'eng-h-c2-09',
  course: 'eng-h-c2',
  title: '도치와 강조',
  summary: '부정어나 장소 표현이 앞으로 나와 어순이 바뀐 문장과 It is ~ that으로 강조한 문장을 정확히 읽습니다.',
  goals: [
    '부정어·Only·Not until이 앞에 나온 도치 문장의 어순을 알고 뜻을 정확히 해석할 수 있다.',
    '장소·방향 부사구 도치와 so·neither·nor 도치를 상황에 맞게 쓸 수 있다.',
    'It is ~ that 강조 구문을 가주어 구문과 구별할 수 있다.',
    'What ~ is 강조와 동사를 강조하는 do·does·did를 바르게 쓸 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '부정어 도치: Never have I ~, Little did he know ~',
      body: 'never, little, seldom, rarely, hardly 같은 **부정어(부정의 뜻을 가진 부사)**를 강조하려고 문장 맨 앞에 두면, 그 뒤의 어순이 **의문문처럼** 바뀝니다. 곧 **(조)동사 + 주어 + 본동사** 순서가 됩니다.\n\n' +
        '| 보통 어순 | 도치 문장 |\n|---|---|\n' +
        '| I have **never** seen such a crowd. | **Never have I** seen such a crowd. |\n' +
        '| She **seldom** eats out. | **Seldom does she** eat out. |\n' +
        "| He didn't know the truth at all. | **Little did he know** the truth. |\n\n" +
        '- 조동사(have, can, will …)나 be동사가 있으면 **그것을 주어 앞으로** 옮깁니다.\n' +
        '- 일반동사만 있으면 **do·does·did를 주어 앞에** 쓰고, 본동사는 **원형**으로 씁니다. (Seldom does she **eat** — eats로 쓰지 않음)\n' +
        '- Not only가 앞에 와도 같습니다: **Not only did she win** the race, but she also broke the record.\n\n' +
        '> 💡 Hardly(Scarcely) **had I** sat down **when** the phone rang. / No sooner **had I** sat down **than** the phone rang. — 둘 다 "내가 앉자마자 전화가 울렸다"는 뜻입니다.\n\n' +
        "> ⚠️ 부정어에 이미 부정의 뜻이 있으므로 not을 또 쓰지 않습니다. Never haven't I seen … (×)",
      easy: '의문문을 만들 때 "You can swim." → "**Can you** swim?"처럼 조동사를 주어 앞으로 옮기지요. 부정어 도치는 바로 그 모양을 빌려 씁니다.\n\n' +
        '"I have never seen it."에서 never를 맨 앞으로 꺼내면, 남은 부분을 의문문처럼 바꾸면 됩니다: **Never** + **have I** seen it? 에서 물음표만 마침표로 바꾸면 "Never have I seen it."입니다.\n\n' +
        '일반동사 문장은 의문문에서 Do you like …?처럼 do를 쓰듯, 도치에서도 do·does·did를 씁니다.',
      check: {
        type: 'choice',
        q: '다음 문장을 Never로 시작하도록 바르게 바꾼 것은 무엇입니까?\n\nI have never tasted such sweet grapes.',
        choices: ['Never have I tasted such sweet grapes.', 'Never I have tasted such sweet grapes.', 'Never did I have tasted such sweet grapes.'],
        answer: 0,
        why: ['', '부정어가 앞에 오면 조동사 have를 주어 앞으로 옮겨야 합니다.', '조동사 have가 이미 있으므로 did를 따로 쓰지 않습니다. have를 주어 앞으로 옮깁니다.'],
        explain: '조동사 have가 있으므로 have를 주어 I 앞으로 옮깁니다. Never **have I** tasted such sweet grapes. (이렇게 단 포도는 먹어 본 적이 없다.)',
      },
    },
    {
      title: 'Only, Not until이 이끄는 도치',
      body: '**Only + 부사(구·절)**가 문장 앞에 오면 **주절**의 어순이 바뀝니다. Only는 "오직 ~에야 비로소"라는 제한의 뜻이 있어 부정어처럼 강조 효과를 냅니다.\n\n' +
        '- I realized the truth **only then**. → **Only then did I realize** the truth.\n' +
        '- **Only after the game ended did we leave** the stadium.\n\n' +
        '**Not until ~**도 같습니다. "~하고 나서야 비로소 …했다"는 뜻입니다.\n\n' +
        "- I didn't understand the rule **until** I read the guide.\n" +
        '- → **Not until I read the guide did I understand** the rule.\n\n' +
        '> ⚠️ 어순이 바뀌는 곳은 **주절**입니다. Only after the game ended에서 부사절(the game ended)은 그대로 두고, 뒤의 주절 we left를 did we leave로 바꿉니다.\n\n' +
        "> 💡 Not until 문장은 강조 구문으로도 바꿀 수 있습니다: It was not until I read the guide that I understood the rule.",
      easy: '"Only"는 "딱 그때가 되어서야"라는 뜻입니다. 그만큼 늦었다는 느낌을 강하게 주려고 문장 앞으로 꺼낸 것이지요.\n\n' +
        '문장을 둘로 나눠 보면 쉽습니다. [Only after the game ended] + [did we leave the stadium]. 앞 덩어리는 "언제"를 말하는 부분이라 그대로 두고, 뒤 덩어리(진짜 하고 싶은 말)만 의문문 모양으로 바꿉니다.',
      check: {
        type: 'ox',
        q: '다음 문장에서 어순이 바뀐(도치된) 부분은 the movie ended입니다.\n\nOnly after the movie ended did we leave the theater.',
        answer: false,
        explain: 'Only after the movie ended는 "영화가 끝난 뒤에야"라는 부사절이라 어순이 그대로입니다. 도치된 곳은 주절 **did we leave**(원래 we left)입니다.',
      },
    },
    {
      title: '장소·방향 부사구 도치: Here comes ~, On the hill stood ~',
      body: '장소나 방향을 나타내는 부사(구)를 문장 앞에 두면 **동사 + 주어** 순서가 됩니다. 이때는 do·does·did를 쓰지 않고 **동사 자체가 주어 앞으로** 옵니다. 주로 stand, sit, lie, come, go, live 같은 **자동사**와 함께 쓰입니다.\n\n' +
        '- An old castle stood **on the hill**. → **On the hill stood an old castle.**\n' +
        '- **Here comes** the bus. / **There goes** the bell.\n' +
        '- **Down came** the rain.\n\n' +
        '동사의 수는 뒤에 오는 **주어**에 맞춥니다.\n\n' +
        '- **Under the tree sit two cats.** (주어 two cats → sit)\n' +
        '- **Under the tree sits a cat.** (주어 a cat → sits)\n\n' +
        '> ⚠️ 주어가 **대명사**이면 도치하지 않습니다. Here comes the bus. (○) / Here it comes. (○) / Here comes it. (×)',
      easy: '영화 카메라를 떠올려 보십시오. 먼저 언덕을 비추고(On the hill), 그다음 무엇이 서 있는지(stood) 보여 준 뒤, 마지막에 주인공(an old castle)을 크게 보여 줍니다. 장소 도치는 이렇게 **새로운 주인공을 문장 끝에 등장시키는** 방법입니다.\n\n' +
        '그래서 이미 아는 대상(it, she 같은 대명사)은 끝에 "등장"시킬 필요가 없어 도치하지 않습니다.',
      check: {
        type: 'choice',
        q: '주어가 대명사일 때 바른 문장은 무엇입니까?',
        choices: ['Here it comes.', 'Here comes it.', 'Here does it come.'],
        answer: 0,
        why: ['', '주어가 대명사(it)이면 도치하지 않습니다. Here it comes.로 씁니다.', '장소·방향 부사구 도치에서는 do·does·did를 쓰지 않습니다. 게다가 대명사 주어는 도치하지 않습니다.'],
        explain: '대명사 주어는 도치하지 않으므로 **Here it comes.**가 바릅니다. 주어가 명사라면 Here comes the bus.처럼 도치합니다.',
      },
    },
    {
      title: 'so·neither·nor 도치: So do I. Neither did she.',
      body: '상대의 말에 "~도 그래"라고 답할 때는 **So + (조)동사 + 주어**, "~도 안 그래"라고 답할 때는 **Neither(Nor) + (조)동사 + 주어**로 말합니다. 동사는 **앞 문장의 동사 종류와 시제**를 그대로 따릅니다.\n\n' +
        '| 앞 문장 | 대답 |\n|---|---|\n' +
        '| I **am** hungry. | So **am** I. |\n' +
        '| I **like** jazz. | So **do** I. / So **does** my brother. |\n' +
        '| I **went** to the concert. | So **did** we. |\n' +
        "| I **haven't** finished yet. | Neither **have** I. |\n" +
        "| I **can't** swim. | Neither **can** she. |\n\n" +
        '- 일반동사 → do·does·did, be동사 → be동사, 조동사 → 같은 조동사\n' +
        '- 동사의 수는 뒤에 오는 **주어**에 맞춥니다. (So **does** she, So **are** they)\n' +
        "- **nor**는 두 문장을 이을 때도 씁니다: He didn't call, **nor did he** send a message.\n\n" +
        "> ⚠️ Neither·Nor에 이미 부정의 뜻이 있으므로 not을 붙이지 않습니다. Neither **can** I. (○) / Neither can't I. (×)",
      easy: '이 대답은 상대 문장의 "도우미 동사"를 그대로 빌려 오는 놀이라고 생각하면 쉽습니다.\n\n' +
        '1. 상대 문장에서 도우미 동사를 찾습니다. am이면 am, can이면 can, 일반동사 likes면 숨어 있는 does, went면 숨어 있는 did.\n' +
        '2. 긍정이면 So, 부정이면 Neither를 앞에 둡니다.\n' +
        '3. 그 뒤에 도우미 동사, 마지막에 "나도"의 주인공(I, she …)을 씁니다.',
      check: {
        type: 'short',
        q: "빈칸에 들어갈 한 낱말을 쓰십시오.\n\nA: I didn't sleep well last night.\nB: [[빈칸]] did I. (나도 잘 못 잤어.)",
        answer: ['Neither', 'Nor'],
        wrong: [{ a: 'So', why: 'A의 말이 부정문(didn\'t)이므로 "나도 안 그래"는 So가 아니라 Neither(Nor)로 말합니다.' }],
        explain: "A가 부정문(didn't sleep)으로 말했으므로 **Neither did I.**(또는 Nor did I.)로 답합니다.",
      },
    },
    {
      title: 'It is ~ that 강조 구문 (가주어 구문과 구별하기)',
      body: '**It is(was) + 강조할 말 + that ~**은 문장의 한 부분을 골라 "바로 그것이 ~이다"라고 강조합니다. 주어·목적어·부사(구)를 강조할 수 있고, 동사는 이 구문으로 강조하지 않습니다.\n\n' +
        'Minsu found the key in the garden yesterday.\n\n' +
        '- **It was Minsu that(who)** found the key in the garden yesterday. — 주어 강조\n' +
        '- **It was the key that(which)** Minsu found in the garden yesterday. — 목적어 강조\n' +
        '- **It was in the garden that** Minsu found the key yesterday. — 장소 강조\n' +
        '- **It was yesterday that** Minsu found the key in the garden. — 때 강조\n\n' +
        '**가주어 It ~ that**과 구별하려면 **It is(was)와 that을 지워 봅니다.**\n\n' +
        '| 문장 | It is·that을 지우면 | 판단 |\n|---|---|---|\n' +
        '| It was **Minsu** that found the key. | Minsu found the key. (완전한 문장) | 강조 구문 |\n' +
        '| It is **important** that we save water. | important we save water (문장이 안 됨) | 가주어 구문 |\n\n' +
        '> 💡 가주어 구문에서는 It is 뒤에 주로 **형용사**(important, clear, true, necessary)가 오고, that절이 진짜 주어입니다. "~하는 것은 중요하다"로 해석합니다.',
      easy: '강조 구문은 문장에 **형광펜**을 칠하는 틀입니다. 강조하고 싶은 부분을 "It was"와 "that" 사이에 끼워 넣고, 나머지는 that 뒤에 그대로 둡니다.\n\n' +
        '형광펜 틀(It was, that)을 걷어 내면 원래 문장이 그대로 남아야 합니다. 걷어 냈는데 문장이 망가지면, 그것은 형광펜이 아니라 다른 구문(가주어)입니다.',
      check: {
        type: 'ox',
        q: '다음 문장은 It is ~ that **강조 구문**입니다.\n\nIt is clear that he is honest.',
        answer: false,
        explain: 'It is와 that을 지우면 "clear he is honest"가 되어 문장이 되지 않습니다. 이 문장은 that절(he is honest)이 진짜 주어인 **가주어 구문**입니다. "그가 정직하다는 것은 분명하다."',
      },
    },
    {
      title: 'What we need is ~ 강조와 동사 강조 do·does·did',
      body: '**What + 주어 + 동사 + is ~**는 하고 싶은 말을 문장 끝으로 보내 "~하는 것은 바로 …이다"라고 강조합니다.\n\n' +
        '- We need **more time**. → **What we need is** more time.\n' +
        '- I want **a long rest**. → **What I want is** a long rest.\n\n' +
        '**동사를 강조**할 때는 동사 앞에 **do·does·did**를 쓰고 본동사는 **원형**으로 씁니다. "정말(분명히) ~한다"는 뜻입니다.\n\n' +
        '- I **did lock** the door. (나는 정말 문을 잠갔다.)\n' +
        '- She **does like** your idea. (그녀는 정말 네 생각을 좋아한다.)\n' +
        '- **Do** be careful. (꼭 조심하세요.) — 명령문 강조\n\n' +
        '| 시제·주어 | 강조 형태 |\n|---|---|\n' +
        '| 현재, 3인칭 단수 주어 | does + 동사원형 |\n' +
        '| 현재, 그 밖의 주어 | do + 동사원형 |\n' +
        '| 과거 | did + 동사원형 |\n\n' +
        '> ⚠️ She does likes (×), I did locked (×) — 시제와 수는 do가 나타내므로 뒤의 동사는 원형입니다.',
      easy: '친구가 "너 문 안 잠갔지?"라고 의심할 때 "아니야, 나 **진짜로** 잠갔어!"라고 힘주어 말하지요. 영어에서는 그 "진짜로"를 did 한 낱말로 나타냅니다: I **did** lock the door.\n\n' +
        'What we need is ~도 비슷합니다. "우리에게 필요한 건… (잠깐 멈추고) 바로 시간이야!"처럼 듣는 사람이 끝을 기다리게 만들어 마지막 말을 돋보이게 합니다.',
      check: {
        type: 'choice',
        q: '동사를 바르게 강조한 문장은 무엇입니까?',
        choices: ['He did finish the report.', 'He did finished the report.', 'He does finished the report.'],
        answer: 0,
        why: ['', 'did 뒤의 동사는 원형이어야 합니다. finished가 아니라 finish입니다.', '과거의 일을 강조하려면 does가 아니라 did를 쓰고, 뒤의 동사는 원형으로 씁니다.'],
        explain: '과거의 일을 강조하므로 **did + 동사원형**: He **did finish** the report. (그는 정말 보고서를 끝냈다.)',
      },
    },
  ],

  examples: [
    {
      q: "Not until로 시작하는 문장으로 바꾸십시오.\n\nI didn't notice the mistake until my teacher pointed it out.",
      steps: [
        "until이 이끄는 부분(until my teacher pointed it out)을 Not until과 함께 문장 맨 앞으로 보냅니다: Not until my teacher pointed it out …",
        "Not에 이미 부정의 뜻이 있으므로 주절의 didn't에서 not을 뺍니다: I noticed the mistake.",
        '주절을 의문문 어순으로 바꿉니다. 일반동사 과거이므로 did를 주어 앞에 두고 동사는 원형으로: did I notice the mistake.',
        '두 부분을 합칩니다. 부사절(my teacher pointed it out)의 어순은 그대로 둡니다.',
      ],
      answer: 'Not until my teacher pointed it out did I notice the mistake. (선생님이 지적해 주시고 나서야 나는 실수를 알아차렸다.)',
    },
    {
      q: '밑줄 친 부분을 강조하는 It ~ that 문장으로 바꾸십시오.\n\nJia planted __the apple tree__ ten years ago.',
      steps: [
        '과거의 일이므로 It is가 아니라 It was를 씁니다.',
        '강조할 말 the apple tree를 It was와 that 사이에 넣습니다: It was the apple tree that …',
        'that 뒤에 나머지 부분을 원래 순서대로 씁니다: Jia planted ten years ago.',
        '확인: It was와 that을 지우면 "the apple tree Jia planted ten years ago"로 원래 문장의 낱말이 모두 남습니다.',
      ],
      answer: 'It was the apple tree that(which) Jia planted ten years ago. (지아가 10년 전에 심은 것은 바로 그 사과나무였다.)',
    },
    {
      q: "B가 '나도 못 타.'라고 답하려고 합니다. 알맞은 대답을 쓰십시오.\n\nA: I can't ride a bike.",
      steps: [
        "A의 문장은 부정문(can't)이므로 Neither(또는 Nor)로 시작합니다.",
        '앞 문장의 조동사 can을 그대로 빌려 옵니다. Neither에 부정의 뜻이 있으므로 can\'t가 아니라 can입니다.',
        '마지막에 주어 I를 씁니다.',
      ],
      answer: 'Neither can I. (= Nor can I.)',
    },
  ],

  terms: [
    { term: '도치', def: '강조나 문장의 흐름을 위해 주어와 동사의 순서를 바꾸는 것입니다. 예: Never have I seen such a crowd.' },
    { term: '부정어', def: 'never, little, seldom, rarely, hardly처럼 부정의 뜻을 가진 낱말입니다. 문장 앞에 오면 뒤의 어순이 의문문처럼 바뀝니다.' },
    { term: '주절', def: '문장에서 중심이 되는 절입니다. Only after the game ended did we leave.에서는 did we leave가 들어 있는 부분이 주절입니다.' },
    { term: '강조 구문 (It is ~ that)', def: 'It is(was)와 that 사이에 강조할 말을 넣어 "바로 그것이 ~이다"라고 강조하는 구문입니다. It is·that을 지우면 완전한 문장이 남습니다.' },
    { term: '가주어 구문', def: '긴 that절 주어 대신 It을 주어 자리에 두는 구문입니다. 예: It is important that we save water. It은 해석하지 않습니다.' },
    { term: '동사 강조 do', def: '동사 앞에 do·does·did를 써서 "정말 ~한다"고 강조하는 것입니다. 뒤의 동사는 원형입니다. 예: I did lock the door.' },
    { term: 'What 강조 구문', def: 'What + 주어 + 동사 + is ~의 꼴로 말하고 싶은 내용을 문장 끝에 두어 강조합니다. 예: What we need is more time.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nSeldom [[빈칸]] to bed before midnight.',
      choices: ['does he go', 'he goes', 'does he goes', 'he does go'],
      answer: 0,
      why: ['', '부정어 seldom이 앞에 왔으므로 어순을 의문문처럼 바꿔야 합니다.', 'does가 수와 시제를 나타내므로 뒤의 동사는 원형 go입니다.', 'does를 썼지만 주어 앞으로 옮기지 않았습니다. does he go의 순서입니다.'],
      explain: 'Seldom(좀처럼 ~ 않는)이 앞에 왔으므로 도치합니다. 일반동사 현재, 주어 he → **does he go**. (그는 좀처럼 자정 전에 자지 않는다.)',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nLittle [[빈칸]] that the surprise party was for her.',
      choices: ['did she know', 'she knew', 'did she knew', 'knew she'],
      answer: 0,
      why: ['', '부정어 Little이 앞에 왔으므로 도치해야 합니다.', 'did 뒤의 동사는 원형이어야 합니다. knew가 아니라 know입니다.', '일반동사는 그 자체를 주어 앞으로 옮기지 않고 did를 주어 앞에 씁니다.'],
      explain: 'Little did she know ~는 "~을 전혀 몰랐다"는 뜻입니다. 일반동사 과거이므로 **did she know**. (그녀는 그 깜짝 파티가 자신을 위한 것인 줄 전혀 몰랐다.)',
    },
    {
      id: 'p3', level: 1, type: 'short', concept: 3,
      q: "빈칸에 들어갈 한 낱말을 쓰십시오.\n\nA: I'm tired of studying.\nB: So [[빈칸]] I.",
      answer: ['am'],
      wrong: [
        { a: 'do', why: "A의 문장 I'm은 I am, 곧 be동사입니다. be동사 문장에는 be동사로 답합니다." },
        { a: 'is', why: '뒤의 주어가 I이므로 is가 아니라 am입니다.' },
      ],
      explain: "I'm = I am이므로 be동사로 답합니다. 주어 I에 맞춰 **So am I.**",
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '다음 문장은 어법상 바릅니다.\n\nAt the top of the hill stand a small church.',
      answer: false,
      explain: '장소 부사구 도치에서 동사는 뒤의 주어에 맞춥니다. 주어 a small church가 단수이므로 **stands**가 맞습니다. At the top of the hill stands a small church.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 4,
      q: 'It ~ that **강조 구문**인 것은 무엇입니까?',
      choices: ['It was in the library that I met Jia.', 'It is true that Jia likes music.', 'It is necessary that we leave early.', 'It seems that Jia is busy.'],
      answer: 0,
      why: ['', 'It is와 that을 지우면 "true Jia likes music"이 되어 문장이 되지 않습니다. 가주어 구문입니다.', 'It is와 that을 지우면 문장이 되지 않습니다. necessary 뒤의 that절이 진짜 주어인 가주어 구문입니다.', 'It seems that ~은 "~인 것 같다"는 표현입니다. It과 that을 지우면 "seems Jia is busy"가 되어 문장이 되지 않습니다.'],
      explain: 'It was와 that을 지우면 "in the library I met Jia"로 완전한 문장이 남습니다. 장소 in the library를 강조한 문장입니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 5,
      q: '동사를 강조하는 문장이 되도록 빈칸에 한 낱말을 쓰십시오.\n\nYou think I forgot, but I [[빈칸]] send you a card last week.',
      answer: ['did'],
      wrong: [
        { a: 'do', why: 'last week는 과거입니다. 과거의 동작을 강조할 때는 did를 씁니다.' },
        { a: 'does', why: '과거의 일이고 주어도 I이므로 does가 아니라 did입니다.' },
      ],
      explain: 'last week(과거)의 일을 "정말 보냈다"고 강조하므로 **did** + 동사원형 send. (너는 내가 잊었다고 생각하지만, 나는 지난주에 정말 카드를 보냈어.)',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nOnly when the lights went out [[빈칸]] how late it was.',
      choices: ['did we realize', 'we realized', 'did we realized', 'realized we'],
      answer: 0,
      why: ['', 'Only가 이끄는 부사절이 앞에 왔으므로 주절을 도치해야 합니다.', 'did 뒤의 동사는 원형 realize여야 합니다.', '일반동사는 그 자체를 주어 앞으로 옮기지 않고 did를 씁니다.'],
      explain: 'Only when ~이 앞에 오면 주절이 도치됩니다. 일반동사 과거이므로 **did we realize**. (불이 꺼지고 나서야 우리는 얼마나 늦었는지 깨달았다.)',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 0,
      q: '"내가 앉자마자 종이 울렸다."라는 뜻이 되도록 순서대로 놓으십시오.',
      choices: ['Hardly', 'had I', 'sat down', 'when', 'the bell rang'],
      answer: [0, 1, 2, 3, 4],
      hint: 'Hardly가 맨 앞에 오면 그 뒤를 의문문 어순(조동사 + 주어)으로 씁니다.',
      explain: 'Hardly had I sat down when the bell rang. — Hardly ~ when …은 "~하자마자 …했다"는 뜻이고, Hardly 뒤는 had I(조동사 + 주어)로 도치됩니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: "대화의 빈칸에 알맞은 것은 무엇입니까?\n\nA: I have never been to Jeju Island.\nB: [[빈칸]] Maybe we can go there together someday.",
      choices: ['Neither have I.', 'So have I.', 'Neither did I.', "Neither haven't I."],
      answer: 0,
      hint: 'A의 문장이 긍정인지 부정인지, 어떤 동사를 썼는지 먼저 봅니다.',
      why: ['', 'never가 있으므로 A의 말은 부정의 뜻입니다. "나도 안 가 봤어"는 Neither로 답합니다.', 'A는 현재완료(have been)로 말했으므로 did가 아니라 have로 받습니다.', 'Neither에 이미 부정의 뜻이 있으므로 haven\'t를 쓰지 않습니다.'],
      explain: 'never가 있는 부정의 뜻, 현재완료 have → **Neither have I.** (나도 가 본 적 없어. 언젠가 같이 가 보자.)',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: '다음 문장과 뜻이 같으면서 a clear plan을 강조한 문장은 무엇입니까?\n\nWe need a clear plan.',
      choices: ['What we need is a clear plan.', 'What we need it is a clear plan.', 'That we need is a clear plan.', 'What do we need is a clear plan.'],
      answer: 0,
      hint: 'What + 주어 + 동사가 하나의 주어 덩어리가 됩니다.',
      why: ['', 'What이 need의 목적어 역할을 하므로 it을 또 쓰지 않습니다.', '"~하는 것"이라는 뜻으로 문장의 주어가 되려면 That이 아니라 What을 씁니다.', 'What we need는 의문문이 아니라 명사 덩어리이므로 do를 쓰지 않고 평서문 어순으로 씁니다.'],
      explain: '**What we need**(우리가 필요한 것)가 주어, is 뒤에 강조할 말 a clear plan을 둡니다. (우리에게 필요한 것은 바로 분명한 계획이다.)',
    },
    {
      id: 'p11', level: 2, type: 'short', concept: 4,
      q: '밑줄 친 부분을 강조하도록 빈칸에 알맞은 한 낱말을 쓰십시오.\n\nSeojun broke __the window__.\n→ It was the window [[빈칸]] Seojun broke.',
      answer: ['that', 'which'],
      wrong: [{ a: 'what', why: 'It was ~ that 강조 구문에서는 what을 쓰지 않습니다. 사물을 강조할 때는 that 또는 which를 씁니다.' }],
      explain: '강조 구문 It was ~ **that**. 강조하는 말이 사물(the window)이므로 which도 쓸 수 있습니다. (서준이가 깬 것은 바로 그 창문이었다.)',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 2,
      q: '"부엌에서 갓 구운 빵 냄새가 풍겨 왔다."라는 뜻이 되도록, From the kitchen으로 시작하는 도치 문장으로 놓으십시오.',
      choices: ['From the kitchen', 'came', 'the smell', 'of fresh bread'],
      answer: [0, 1, 2, 3],
      hint: '장소 부사구가 앞에 오면 동사가 주어 앞으로 옵니다.',
      explain: 'From the kitchen came the smell of fresh bread. — 장소 부사구(From the kitchen) 뒤에 동사(came), 그 뒤에 주어(the smell of fresh bread)가 옵니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: "다음 문장을 Not until로 시작하도록 바르게 바꾼 것은 무엇입니까?\n\nMinsu didn't start the project until the deadline was close.",
      choices: [
        'Not until the deadline was close did Minsu start the project.',
        'Not until was the deadline close did Minsu start the project.',
        'Not until the deadline was close Minsu started the project.',
        "Not until the deadline was close didn't Minsu start the project.",
      ],
      answer: 0,
      hint: '어순이 바뀌는 것은 until 절이 아니라 주절입니다. not은 한 번만 씁니다.',
      why: [
        '',
        'until 뒤의 부사절(the deadline was close)은 도치하지 않습니다. 도치하는 곳은 주절입니다.',
        'Not until이 앞에 오면 주절을 도치해야 합니다: did Minsu start.',
        "Not에 이미 부정의 뜻이 있으므로 주절에서 not을 빼야 합니다: didn't가 아니라 did.",
      ],
      explain: 'Not until + 부사절(어순 그대로) + 도치된 주절(did + 주어 + 동사원형). **Not until the deadline was close did Minsu start the project.** (마감이 가까워지고 나서야 민수는 프로젝트를 시작했다.)',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: 'It ~ that의 쓰임이 나머지 셋과 **다른** 것은 무엇입니까?',
      choices: [
        'It was at the station that I lost my umbrella.',
        'It was Hayun who solved the puzzle first.',
        'It is surprising that the store closed so early.',
        'It was last Sunday that we visited the museum.',
      ],
      answer: 2,
      hint: '각 문장에서 It is(was)와 that(who)을 지워 보십시오.',
      why: [
        'It was와 that을 지우면 "at the station I lost my umbrella"로 문장이 남습니다. 장소를 강조한 강조 구문입니다.',
        'It was와 who를 지우면 "Hayun solved the puzzle first"로 문장이 남습니다. 주어를 강조한 강조 구문입니다.',
        '',
        'It was와 that을 지우면 "last Sunday we visited the museum"으로 문장이 남습니다. 때를 강조한 강조 구문입니다.',
      ],
      explain: '나머지 셋은 It was·that(who)을 지우면 완전한 문장이 남는 **강조 구문**입니다. It is surprising that ~은 지우면 "surprising the store closed so early"가 되어 문장이 되지 않으므로, that절이 진짜 주어인 **가주어 구문**입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '어법상 **틀린** 문장은 무엇입니까?',
      choices: [
        'Rarely do we see snow in this town.',
        'Here they come.',
        'Under the bridge lives an old fisherman.',
        'Only after he left I found his note.',
      ],
      answer: 3,
      hint: '앞에 나온 말이 무엇인지, 주어가 대명사인지 살펴보십시오.',
      why: [
        'Rarely(부정어)가 앞에 왔고 do we see로 바르게 도치했습니다.',
        '주어가 대명사(they)이므로 도치하지 않은 Here they come.이 바릅니다.',
        '장소 부사구 도치이고, 주어 an old fisherman이 단수이므로 lives가 맞습니다.',
        '',
      ],
      explain: 'Only after ~가 앞에 오면 주절을 도치해야 합니다. **Only after he left did I find his note.**가 바릅니다. (그가 떠나고 나서야 나는 그의 쪽지를 발견했다.)',
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 3,
      q: '빈칸에 들어갈 한 낱말을 쓰십시오.\n\nJia has never been late for class. Neither [[빈칸]] her twin brother.',
      answer: ['has'],
      hint: '앞 문장의 동사 종류와 시제를 보고, 빈칸 뒤의 주어에 수를 맞춥니다.',
      wrong: [
        { a: 'have', why: '뒤의 주어 her twin brother가 3인칭 단수이므로 have가 아니라 has입니다.' },
        { a: 'did', why: '앞 문장은 현재완료(has been)이므로 did가 아니라 has로 받습니다.' },
        { a: 'is', why: '앞 문장의 동사는 has been(현재완료)입니다. 조동사 has를 그대로 빌려 옵니다.' },
      ],
      explain: '앞 문장은 현재완료(has never been)이고, 뒤의 주어 her twin brother는 3인칭 단수입니다. → **Neither has her twin brother.** (그녀의 쌍둥이 남동생도 수업에 늦은 적이 없다.)',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 1,
      q: '다음 글의 내용과 일치하는 것은 무엇입니까?\n\n' + FAIR,
      choices: [
        'The winners were announced on the final day.',
        'The judges announced the winners on the first day.',
        "Doyun's team won second prize.",
        'The robot was slow but accurate.',
      ],
      answer: 0,
      hint: 'Only on the final day did ~와 It was ~ that을 정확히 해석해 보십시오.',
      why: [
        '',
        'Only on the final day did the judges announce ~는 "마지막 날이 되어서야 발표했다"는 뜻입니다. 첫날이 아닙니다.',
        "It was Doyun's team that won first prize — 1등을 한 것이 바로 도윤이네 팀이라고 강조한 문장입니다.",
        "What surprised everyone was the robot's speed — 모두를 놀라게 한 것은 로봇의 속도였습니다. 느리지 않았습니다.",
      ],
      explain: 'Only on the final day **did the judges announce** the winners는 "마지막 날이 되어서야 심사위원들이 수상자를 발표했다"는 뜻이므로 1번이 일치합니다. 글의 둘째 문장 Never had so many students worked ~도 부정어 도치(이렇게 많은 학생이 열심히 한 적은 없었다)입니다.',
    },
  ],

  deeper: [
    {
      title: '영어는 왜 굳이 어순을 바꿀까? — 문장 끝의 초점',
      body: '영어 문장은 대체로 **이미 아는 정보를 앞에, 새로운 정보를 뒤에** 두는 흐름을 좋아합니다. 그래서 새 정보는 문장 끝에서 가장 크게 들립니다(문장 끝 초점).\n\n' +
        '- On the hill stood **an old castle**. — 언덕은 이미 장면에 있고, 새로 등장하는 성을 끝에 둡니다.\n' +
        '- What we need is **more time**. — 듣는 사람이 끝을 기다리게 한 뒤 핵심을 말합니다.\n' +
        '- It was **Minsu** that found the key. — 강조할 말을 It was 바로 뒤의 눈에 띄는 자리에 둡니다.\n\n' +
        '부정어 도치(Never have I ~)는 이와 조금 달리, 부정어를 맨 앞에 내세워 **감정과 놀라움을 강하게** 나타냅니다. 그래서 연설·소설·신문 기사처럼 격식 있는 글에서 자주 보입니다. 다음 과정(영어Ⅰ)에서는 생략·삽입·부정 구문과 함께 이런 문장을 더 긴 글 속에서 읽게 됩니다.',
    },
  ],

  faq: [
    {
      q: 'Never have I ~ 같은 도치 문장은 말할 때도 써요?',
      a: '부정어 도치(Never have I ~, Little did he know ~)는 주로 글·연설·이야기처럼 격식 있거나 극적인 표현에서 씁니다. 일상 대화에서는 "I\'ve never seen ~"처럼 보통 어순을 더 많이 씁니다.\n\n반면 Here comes the bus., So do I., Neither can I.는 일상 대화에서 아주 자주 씁니다.',
    },
    {
      q: 'Me too랑 So do I는 뭐가 달라요?',
      a: '뜻은 거의 같고, Me too가 더 가벼운 말투입니다. 부정문에 답할 때는 Me too가 아니라 **Me neither**(가벼운 말투) 또는 **Neither do I**를 씁니다.\n\nSo do I·Neither do I는 앞 문장의 동사와 시제를 맞춰야 하므로(So am I, So did I …) 문법 시험에 자주 나옵니다.',
    },
    {
      q: 'It is ~ that 강조에서 that 대신 who나 which를 써도 돼요?',
      a: '네. 강조하는 말이 사람이면 who, 사물이면 which를 쓸 수 있습니다. 예: It was Minsu who found the key. 때·장소를 강조할 때는 that이 가장 무난합니다. 어느 경우든 that을 쓰면 틀리지 않습니다.',
    },
    {
      q: 'Here comes the bus는 되는데 왜 Here comes it은 안 돼요?',
      a: '장소·방향 도치는 새로 등장하는 대상을 문장 끝에서 돋보이게 하려는 것입니다. 대명사(it, she, they)는 이미 아는 대상이라 끝에 둘 이유가 없어서 도치하지 않습니다. 그래서 Here it comes., There she goes.로 씁니다.',
    },
  ],

  mistakes: [
    "부정어를 앞에 두고 어순을 바꾸지 않는 실수 — Never I have seen (×) → Never have I seen (○). 일반동사면 do·does·did를 주어 앞에: Seldom does she eat out.",
    "do·does·did 뒤에 원형이 아닌 동사를 쓰는 실수 — Little did he knew (×), She does likes (×) → Little did he know, She does like.",
    "Neither 대답에 not을 또 붙이는 실수 — Neither don't I (×) → Neither do I (○). 앞 문장의 동사 종류도 맞춥니다: I'm hungry. → So am I (So do I ×).",
  ],

  gens: [
    {
      id: 'so-neither-reply',
      level: 1,
      title: 'So·Neither로 "~도 그래" 답하기',
      make: function (R) {
        var lines = [
          ['I love spicy food.', 'do', false],
          ['I play the guitar on weekends.', 'do', false],
          ['I went to the science fair yesterday.', 'did', false],
          ['I watched the final match last night.', 'did', false],
          ['I am nervous about the exam.', 'be', false],
          ['I am interested in history.', 'be', false],
          ['I was late for school this morning.', 'was', false],
          ['I have read this novel twice.', 'have', false],
          ['I can speak a little Spanish.', 'can', false],
          ['I will join the reading club.', 'will', false],
          ["I don't eat breakfast.", 'do', true],
          ["I didn't finish my homework.", 'did', true],
          ["I'm not good at drawing.", 'be', true],
          ["I haven't seen the new movie yet.", 'have', true],
          ["I can't swim very well.", 'can', true],
          ["I wasn't at home last night.", 'was', true],
          ["I won't go to the party.", 'will', true],
        ];
        var who = R.pick([['I', '나도'], ['she', '그녀도'], ['he', '그도'], ['we', '우리도'], ['they', '그들도']]);
        var L = R.pick(lines);
        var kind = L[1], neg = L[2], s = who[0];
        var word = neg ? 'Neither' : 'So';
        var opp = neg ? 'So' : 'Neither';
        var aux = AUX[kind](s);
        // 틀린 조동사: 수가 안 맞는 것, 동사 종류가 다른 것
        var agreeWrong = {
          do: aux === 'do' ? 'does' : 'do', did: 'does', be: aux === 'is' ? 'are' : 'is',
          was: aux === 'was' ? 'were' : 'was', have: aux === 'has' ? 'have' : 'has', can: 'does', will: 'does',
        }[kind];
        var typeWrong = {
          do: AUX.be(s), did: AUX.was(s), be: AUX.do(s), was: 'did', have: AUX.do(s), can: AUX.be(s), will: AUX.be(s),
        }[kind];
        function say(w, a) { return w + ' ' + a + ' ' + s + '.'; }
        var correct = say(word, aux);
        var reasonAgree = (kind === 'did' || kind === 'can' || kind === 'will')
          ? 'A가 쓴 동사(' + KIND[kind] + ')를 그대로 빌려 와야 합니다.'
          : '조동사의 수를 뒤의 주어 ' + s + '에 맞춰야 합니다.';
        var cands = [
          [say(opp, aux), neg ? 'A의 말은 부정문입니다. "~도 안 그래"는 So가 아니라 Neither로 말합니다.' : 'A의 말은 긍정문입니다. "~도 그래"는 Neither가 아니라 So로 말합니다.'],
          [say(word, agreeWrong), reasonAgree],
          [say(word, typeWrong), 'A가 쓴 동사는 ' + KIND[kind] + '입니다. 같은 종류의 (조)동사로 받아야 합니다.'],
          [say(opp, typeWrong), '긍정·부정과 동사 종류를 모두 다시 확인해 보십시오.'],
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 3,
          q: 'B가 "' + who[1] + ' ' + (neg ? '안 그래' : '그래') + '."라는 뜻으로 답하려고 합니다. 알맞은 것은 무엇입니까?\n\nA: ' + L[0] + '\nB: [[빈칸]]',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: 'A의 말이 ' + (neg ? '부정문이므로 Neither' : '긍정문이므로 So') + '로 시작합니다. A가 쓴 동사는 ' + KIND[kind] + '이므로 ' + aux + '를 쓰고, 마지막에 주어 ' + s + '를 둡니다. → **' + correct + '**',
        };
      },
    },
    {
      id: 'negative-inversion',
      level: 2,
      title: '부정어·Only·Not until 도치 문장 고르기',
      make: function (R) {
        var subj = R.pick([['I', 1], ['we', 0], ['they', 0], ['she', 3], ['he', 3], ['Minsu', 3], ['Jia', 3]]);
        var S = subj[0], third = subj[1] === 3;
        var has = third ? 'has' : 'have';
        var does = third ? 'does' : 'do';
        var t = R.int(0, 4);
        var base, correct, cands, startWord;
        if (t === 0) {
          startWord = 'Never';
          base = S + ' ' + has + ' never seen such a beautiful sunset.';
          correct = 'Never ' + has + ' ' + S + ' seen such a beautiful sunset.';
          cands = [
            ['Never ' + S + ' ' + has + ' seen such a beautiful sunset.', '부정어가 앞에 오면 조동사 ' + has + '를 주어 앞으로 옮겨야 합니다.'],
            ['Never ' + has + ' ' + S + ' saw such a beautiful sunset.', '현재완료이므로 과거분사 seen을 그대로 써야 합니다.'],
            ['Never did ' + S + ' ' + has + ' seen such a beautiful sunset.', '조동사 ' + has + '가 있으므로 did를 따로 쓰지 않습니다.'],
            ['Never ' + has + "n't " + S + ' seen such a beautiful sunset.', 'Never에 이미 부정의 뜻이 있으므로 not을 또 쓰지 않습니다.'],
          ];
        } else if (t === 1) {
          startWord = 'Rarely';
          var eats = third ? 'eats' : 'eat';
          base = S + ' rarely ' + eats + ' fast food.';
          correct = 'Rarely ' + does + ' ' + S + ' eat fast food.';
          cands = [
            ['Rarely ' + S + ' ' + eats + ' fast food.', '부정어 Rarely가 앞에 오면 ' + does + '를 주어 앞에 두어 도치합니다.'],
            ['Rarely ' + does + ' ' + S + ' eats fast food.', 'do·does 뒤의 동사는 원형 eat입니다.'],
            ['Rarely ' + S + ' ' + does + ' eat fast food.', does + '를 주어 앞으로 옮겨야 합니다.'],
            ['Rarely ' + eats + ' ' + S + ' fast food.', '일반동사는 그 자체를 주어 앞으로 옮기지 않고 do·does·did를 씁니다.'],
          ];
        } else if (t === 2) {
          startWord = 'Little';
          base = S + " didn't know that the test had been canceled.";
          correct = 'Little did ' + S + ' know that the test had been canceled.';
          cands = [
            ['Little ' + S + ' knew that the test had been canceled.', '부정어 Little이 앞에 오면 did를 주어 앞에 두어 도치합니다.'],
            ['Little did ' + S + ' knew that the test had been canceled.', 'did 뒤의 동사는 원형 know입니다.'],
            ['Little knew ' + S + ' that the test had been canceled.', '일반동사는 그 자체를 주어 앞으로 옮기지 않고 did를 씁니다.'],
            ["Little didn't " + S + ' know that the test had been canceled.', 'Little에 이미 부정의 뜻이 있으므로 not을 쓰지 않습니다.'],
          ];
        } else if (t === 3) {
          startWord = 'Only after the class';
          base = S + ' understood the problem only after the class.';
          correct = 'Only after the class did ' + S + ' understand the problem.';
          cands = [
            ['Only after the class ' + S + ' understood the problem.', 'Only가 이끄는 말이 앞에 오면 주절을 도치해야 합니다.'],
            ['Only after the class did ' + S + ' understood the problem.', 'did 뒤의 동사는 원형 understand입니다.'],
            ['Only after the class understood ' + S + ' the problem.', '일반동사는 그 자체를 주어 앞으로 옮기지 않고 did를 씁니다.'],
            ['Only after did the class ' + S + ' understand the problem.', 'did는 the class 앞이 아니라 주절의 주어 ' + S + ' 앞에 둡니다.'],
          ];
        } else {
          startWord = 'Not until midnight';
          base = S + " didn't go to bed until midnight.";
          correct = 'Not until midnight did ' + S + ' go to bed.';
          cands = [
            ['Not until midnight ' + S + ' went to bed.', 'Not until이 앞에 오면 주절을 도치해야 합니다.'],
            ["Not until midnight didn't " + S + ' go to bed.', 'Not에 이미 부정의 뜻이 있으므로 주절에서 not을 뺍니다.'],
            ['Not until midnight did ' + S + ' went to bed.', 'did 뒤의 동사는 원형 go입니다.'],
            ['Not until midnight went ' + S + ' to bed.', '일반동사는 그 자체를 주어 앞으로 옮기지 않고 did를 씁니다.'],
          ];
        }
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: t >= 3 ? 1 : 0,
          q: '다음 문장을 ' + startWord + '(으)로 시작하도록 바르게 바꾼 것은 무엇입니까?\n\n' + base,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: (t >= 3 ? '앞에 나온 말 뒤의 주절을 의문문 어순으로 바꿉니다. ' : '부정어가 앞에 오면 뒤를 의문문 어순으로 바꿉니다. ') +
            (t === 0 ? '조동사 ' + has + '가 있으므로 그것을 주어 앞으로 옮깁니다.' : t === 1 ? '일반동사 현재이므로 ' + does + '를 주어 앞에 두고 동사는 원형으로 씁니다.' : '일반동사 과거이므로 did를 주어 앞에 두고 동사는 원형으로 씁니다.') +
            ' → **' + correct + '**',
        };
      },
    },
  ],

  vocab: [
    { w: 'seldom', m: '좀처럼 ~하지 않는', ex: 'Seldom does it snow in this city.', exm: '이 도시에는 좀처럼 눈이 오지 않는다.' },
    { w: 'rarely', m: '드물게, 좀처럼 ~하지 않는', ex: 'My grandfather rarely watches TV.', exm: '할아버지는 좀처럼 텔레비전을 보지 않으신다.' },
    { w: 'hardly', m: '거의 ~하지 않는', ex: 'I could hardly hear the speaker in the noisy hall.', exm: '시끄러운 강당에서 나는 연사의 말을 거의 들을 수 없었다.' },
    { w: 'scarcely', m: '거의 ~않는, 겨우', ex: 'Scarcely had we left home when it began to rain.', exm: '우리가 집을 나서자마자 비가 내리기 시작했다.' },
    { w: 'realize', m: '깨닫다, 알아차리다', ex: 'Only then did I realize my mistake.', exm: '그제야 나는 내 실수를 깨달았다.' },
    { w: 'notice', m: '알아차리다', ex: 'Did you notice the new sign at the gate?', exm: '정문에 있는 새 안내판을 알아차렸니?' },
    { w: 'announce', m: '발표하다, 알리다', ex: 'The principal will announce the results tomorrow.', exm: '교장 선생님께서 내일 결과를 발표하실 것이다.' },
    { w: 'deadline', m: '마감 기한', ex: 'The deadline for the essay is next Friday.', exm: '에세이 마감은 다음 주 금요일이다.' },
    { w: 'emphasize', m: '강조하다', ex: 'The coach emphasized the importance of teamwork.', exm: '코치는 팀워크의 중요성을 강조했다.' },
    { w: 'emphasis', m: '강조', ex: 'Put the emphasis on the most important word.', exm: '가장 중요한 낱말에 강조를 두어라.' },
    { w: 'castle', m: '성', ex: 'On the hill stood an old castle.', exm: '언덕 위에 오래된 성이 서 있었다.' },
    { w: 'crowd', m: '군중, 사람들의 무리', ex: 'A huge crowd gathered in the square.', exm: '광장에 엄청난 군중이 모였다.' },
    { w: 'surprise party', m: '깜짝 파티', ex: 'We planned a surprise party for our teacher.', exm: '우리는 선생님을 위해 깜짝 파티를 계획했다.' },
    { w: 'honest', m: '정직한', ex: 'It is clear that he is honest.', exm: '그가 정직하다는 것은 분명하다.' },
  ],
});
})();
