/* 영어Ⅰ · 사건 전하기와 카드뉴스
 * 기사·대화·도표 수치는 모두 직접 만든 가상의 자료다(가상의 인물·장소). */
(function () {
  // 직접 쓴 가상의 기사 (여러 문제에서 함께 쓴다 — 문제마다 글 전체를 다시 싣는다)
  var ARTICLE = '**Students Clean Up River Park**\n\n' +
    'About forty high school students cleaned up River Park last Saturday morning. They volunteered to protect the birds and fish that live along the river.\n\n' +
    'The students started at 9 a.m. and worked for three hours. Using gloves and large bags, they picked up about 200 kilograms of trash. Most of it was plastic bottles and snack wrappers.\n\n' +
    '"I was surprised by how much plastic we found," said Minji, one of the volunteers. The park manager thanked the students and said that he would put more trash cans near the river.';
  var TRASH_FIG = { type: 'bars', labels: ['Plastic bottles', 'Snack wrappers', 'Cans', 'Other'], values: [90, 60, 30, 20], unit: 'kg', title: 'Trash Collected at River Park (가상의 자료)' };

Tutor.registerUnit({
  id: 'eng-h-e1-09',
  course: 'eng-h-e1',
  title: '사건 전하기와 카드뉴스',
  summary: '기사 속 사건을 육하원칙으로 정리하고, 남의 말과 사진·도표의 정보를 전하며 카드뉴스로 알립니다.',
  goals: [
    '기사를 읽고 육하원칙(누가·언제·어디서·무엇을·어떻게·왜)으로 사건을 정리할 수 있다.',
    '기사의 짜임(헤드라인–첫 문단–본문)을 알고 각 부분의 역할을 설명할 수 있다.',
    '간접화법으로 남의 말·질문·요청을 전하며 시제와 시간·장소 표현을 알맞게 바꿀 수 있다.',
    '경험한 일과 사진·도표의 정보를 사실 중심으로 설명하고, 핵심 정보를 카드뉴스·포스터로 전달할 수 있다.',
  ],
  standards: ['[12영Ⅰ-01-01]', '[12영Ⅰ-01-07]', '[12영Ⅰ-02-01]', '[12영Ⅰ-02-02]', '[12영Ⅰ-02-07]'],

  concepts: [
    {
      title: '육하원칙으로 사건 정리하기',
      body: '사건을 전하는 글은 읽는 사람이 궁금해할 여섯 가지 물음에 답합니다. 이것을 **육하원칙**이라 하고, 영어로는 **5W1H**라고 부릅니다.\n\n| 물음 | 영어 | 기사에서 찾는 단서 |\n|---|---|---|\n| 누가 | **Who** | 주어(사람·단체) |\n| 언제 | **When** | last Saturday, on May 3, at 9 a.m. |\n| 어디서 | **Where** | at/in + 장소 |\n| 무엇을 | **What** | 동사와 목적어(무슨 일이 있었나) |\n| 어떻게 | **How** | by -ing, with ~, using ~ (방법·과정) |\n| 왜 | **Why** | to + 동사원형, because ~, so that ~ |\n\n예: **About forty students**(Who) **picked up trash**(What) **at River Park**(Where) **last Saturday**(When) **with gloves and bags**(How) **to protect the birds**(Why).\n\n여섯 칸을 표로 채워 보면 기사의 핵심이 한눈에 보이고, 글에 **빠진 정보**도 바로 드러납니다.\n\n> 💡 Why는 to부정사(~하기 위해)나 because절로, How는 by -ing(~함으로써)나 with(~을 가지고)로 자주 나타납니다.',
      easy: '친구가 "어제 무슨 일 있었어?"라고 물으면 우리는 저절로 "**누가**, **언제**, **어디서**, **무엇을** 했는데, **어떻게** 했고, **왜** 그랬냐면…" 하고 답합니다. 기사도 똑같습니다.\n\n여섯 칸짜리 빈 표를 하나 그려 두고, 기사를 읽으면서 칸을 하나씩 채운다고 생각하십시오. 칸이 다 차면 사건을 다 이해한 것이고, 빈칸이 남으면 그 정보가 기사에 없는 것입니다.',
      check: {
        type: 'choice',
        q: '다음 문장에서 **Why(왜)**에 해당하는 부분은 무엇입니까?\n\nThe library opened a reading café on Monday to help students enjoy books together.',
        choices: ['to help students enjoy books together', 'on Monday', 'The library'],
        answer: 0,
        why: ['', 'on Monday는 때를 나타내므로 When(언제)입니다.', 'The library는 일을 한 주체이므로 Who(누가)입니다.'],
        explain: 'to + 동사원형(to help ~)은 "~하기 위해"라는 **목적**, 곧 Why를 나타냅니다. on Monday는 When, The library는 Who입니다.',
      },
    },
    {
      title: '기사의 짜임: 헤드라인–첫 문단–본문',
      body: '신문·인터넷 기사는 대개 **중요한 것을 먼저** 쓰는 짜임(역피라미드)입니다.\n\n| 부분 | 영어 | 하는 일 |\n|---|---|---|\n| 헤드라인 | **headline** | 기사 전체를 몇 낱말로 압축한 제목 |\n| 첫 문단 | **lead** (lede) | 육하원칙의 핵심을 한두 문장으로 먼저 요약 |\n| 본문 | **body** | 자세한 과정, 수치, 관계자의 말(인용), 배경 |\n\n**헤드라인의 문법 습관**\n\n- 이미 일어난 일도 **현재 시제**로 씁니다: Students **Clean Up** River Park (= 학생들이 공원을 청소했다)\n- 앞으로 일어날 일은 **to + 동사원형**: City **to Open** New Library (= 새 도서관을 열 예정이다)\n- a, the 같은 관사와 be동사는 흔히 뺍니다: Bridge **Closed** After Storm (= The bridge was closed ~)\n\n그래서 바쁜 독자는 헤드라인과 첫 문단만 읽어도 사건의 큰 줄기를 알 수 있고, 본문은 궁금한 사람이 더 읽는 부분입니다.',
      easy: '기사는 **택배 상자에 붙은 송장**과 비슷합니다. 상자를 열지 않아도 송장(헤드라인)만 보면 무엇이 들었는지 짐작하고, 내용물 목록(첫 문단)을 보면 핵심을 알고, 상자를 열어야(본문) 자세한 것을 확인합니다.\n\n헤드라인은 칸이 좁아서 낱말을 아낍니다. 그래서 "청소했다"도 짧은 현재형(Clean Up)으로, "열 예정이다"도 to Open처럼 짧게 씁니다.',
      check: {
        type: 'ox',
        q: '헤드라인 Students Win Science Contest는 학생들이 앞으로 대회에서 우승할 것이라는 뜻이다.',
        answer: false,
        explain: '헤드라인은 이미 일어난 일도 **현재 시제**로 씁니다. Win은 "우승했다"는 뜻입니다. 앞으로의 일이라면 Students **to Compete** in ~ 처럼 to + 동사원형을 씁니다.',
      },
    },
    {
      title: '간접화법 ① 평서문 전하기와 시간·장소 표현',
      body: '남의 말을 그대로 따옴표로 옮기는 것은 **직접화법**, 내 말로 바꾸어 전하는 것은 **간접화법**입니다.\n\nMinho said, "I **am** busy **today**." → Minho said (that) **he was** busy **that day**.\n\n전하는 방법은 세 단계입니다.\n\n1. **전달 동사**: say → said (that) ~, say to + 사람 → **told** + 사람 (that) ~\n2. **대명사**를 전하는 사람 입장으로: I → he/she, my → his/her, you → me 등\n3. **시제를 한 칸 뒤로**(전달 동사가 과거일 때): am/is → was, will → would, can → could, 과거 → 과거완료(had p.p.)\n\n**시간·장소 표현도 바꿉니다.** 말을 전하는 때와 곳이 처음 말한 때와 곳과 다르기 때문입니다.\n\n| 직접화법 | 간접화법 |\n|---|---|\n| today | that day |\n| tomorrow | **the next day** (the following day) |\n| yesterday | **the day before** (the previous day) |\n| now | then |\n| next week | the following week |\n| ~ ago | ~ before |\n| here / this | there / that |\n\n> ⚠️ 말한 내용이 지금도 여전히 사실이거나, 같은 날 바로 전하는 경우에는 시제나 시간 표현을 그대로 두기도 합니다. 시험·글쓰기에서는 위의 기본 규칙대로 바꾸는 것이 안전합니다.',
      easy: '월요일에 친구가 "**내일** 갈게."라고 했다고 합시다. 수요일에 다른 사람에게 이 말을 전하면서 "그 애가 **내일** 온대."라고 하면 목요일로 오해합니다. 그래서 "그 애가 **그다음 날** 오겠다고 했어."라고 바꿉니다.\n\n영어도 같습니다. tomorrow는 the next day로, yesterday는 the day before로 바꿉니다. 시간도 한 걸음 뒤로 물러나니 will은 would, am은 was처럼 동사도 한 칸 과거로 옮긴다고 기억하십시오.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르십시오.\n\nSora said, "I will call you tomorrow."\n→ Sora said that she would call me [[blank]].',
        choices: ['the next day', 'tomorrow', 'the day before'],
        answer: 0,
        why: ['', '말을 전하는 때는 처음 말한 날과 다르므로 tomorrow를 그대로 두면 날짜가 달라집니다.', 'the day before는 yesterday를 바꾼 말입니다. tomorrow는 the next day로 바꿉니다.'],
        explain: '간접화법에서 tomorrow는 **the next day**(또는 the following day)로 바꿉니다. will도 would로 한 칸 뒤로 갔습니다.',
      },
    },
    {
      title: '간접화법 ② 질문과 요청 전하기',
      body: '**질문**을 전할 때는 asked를 쓰고, 뒤에 오는 말은 **평서문 어순(주어 + 동사)**으로 바꿉니다. 물음표도 없앱니다.\n\n**의문사가 없는 질문**(Yes/No 질문) → **asked (사람) if/whether + 주어 + 동사**\n\n"**Are you** ready?" → She asked me **if I was** ready.\n"**Did you** see the accident?" → The reporter asked **whether I had seen** the accident.\n\n**의문사가 있는 질문** → **asked (사람) + 의문사 + 주어 + 동사**\n\n"Where **do you live**?" → He asked me where **I lived**.\n"What time **is it**?" → She asked what time **it was**.\n\n**요청·명령**을 전할 때는 **asked/told + 사람 + to + 동사원형**을 씁니다. 부정은 **not to**입니다.\n\n"Please **wait** here." → The guide asked us **to wait** there.\n"**Don\'t run** in the hall." → The teacher told us **not to run** in the hall.\n\n> ⚠️ 의문문의 do/does/did는 간접화법에서 사라집니다. asked where did I live(X) → asked where I lived(O)',
      easy: '질문을 전할 때는 **물음표를 떼고 보통 문장으로 펴 준다**고 생각하십시오.\n\n- "너 준비됐니?" → "그녀가 내가 준비됐는**지** 물었다" — 우리말에서 "~지"를 붙이듯, 영어는 **if**를 붙입니다.\n- "어디 사니?" → "그가 내가 **어디** 사는지 물었다" — 의문사가 있으면 그 의문사가 if 대신 연결해 줍니다.\n\n부탁·명령은 더 간단합니다. "~해 주세요"는 asked me **to** ~, "~하지 마"는 told me **not to** ~ 입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르십시오.\n\nMy brother asked me, "Is the store open?"\n→ My brother asked me [[blank]].',
        choices: ['if the store was open', 'that the store was open', 'was the store open'],
        answer: 0,
        why: ['', 'that은 평서문을 전할 때 씁니다. Yes/No 질문은 if나 whether로 전합니다.', '간접화법에서는 의문문 어순(동사 + 주어)을 평서문 어순(주어 + 동사)으로 바꿉니다.'],
        explain: '의문사가 없는 질문은 **if/whether + 주어 + 동사**로 전합니다. is는 시제를 한 칸 뒤로 옮겨 was가 되므로 **if the store was open**입니다.',
      },
    },
    {
      title: '사실 중심으로 설명하기: 경험한 일과 사진·도표',
      body: '사건이나 경험을 전하는 글은 **사실(fact)**을 중심으로 씁니다. 사실은 확인할 수 있는 것이고, **의견(opinion)**은 사람마다 다를 수 있는 생각입니다.\n\n| 사실 | 의견 |\n|---|---|\n| The event **started at 9 a.m.** | It was **the best** event ever. |\n| We collected **200 kilograms** of trash. | Everyone **should** join next time. |\n\n**사실 중심으로 쓰는 요령**\n\n- 이미 일어난 일은 **과거 시제**로 씁니다.\n- 때·곳·수치를 **구체적으로** 밝힙니다(three hours, about forty students).\n- 일어난 **순서**대로 잇습니다: First, ~ / Then, ~ / After that, ~ / Finally, ~\n- 감정이나 평가는 남의 말을 **인용**해서 전합니다: "It was fun," said one student.\n\n**사진·도표의 정보 설명하기**\n\n- 사진: **The photo shows** ~ / In the photo, students **are picking up** trash. (사진 속 동작은 현재진행형)\n- 기사 사진의 설명 글(**caption**)은 보통 현재 시제로 짧게 씁니다: Volunteers **pick up** trash along the river.\n- 도표: **According to the graph**, ~ / Plastic bottles **made up** 45 percent of the trash. 도표에 **없는** 원인이나 평가를 사실처럼 덧붙이지 않습니다.',
      easy: '사실과 의견을 가르는 가장 쉬운 방법은 **"자로 잴 수 있나?"**를 묻는 것입니다. "200 kg을 모았다"는 저울로 잴 수 있으니 사실입니다. "가장 멋진 행사였다"는 잴 수 없으니 의견입니다.\n\n사진과 도표도 마찬가지입니다. 사진에 **보이는 것**, 도표에 **적힌 숫자**만 말하면 사실입니다. "사람들이 플라스틱을 너무 많이 써서"처럼 사진에 없는 이유를 붙이면 그것은 내 짐작입니다.',
      check: {
        type: 'choice',
        q: '다음 가운데 **사실(fact)**을 전하는 문장은 무엇입니까?',
        choices: ['The volunteers worked for three hours.', 'It was a wonderful experience for everyone.', 'More people should join this activity.'],
        answer: 0,
        why: ['', 'wonderful은 사람마다 다르게 느끼는 평가이므로 의견입니다.', 'should는 글쓴이의 주장을 나타내므로 의견입니다.'],
        explain: '"세 시간 동안 일했다"는 시간을 재어 확인할 수 있는 **사실**입니다. wonderful(평가)과 should(주장)가 들어간 문장은 의견입니다.',
      },
    },
    {
      title: '카드뉴스·포스터로 핵심 전하기',
      body: '**카드뉴스**는 한 장씩 넘겨 보는 짧은 그림 기사이고, **포스터**는 한 장에 행사나 소식을 알리는 게시물입니다. 둘 다 **짧은 시간에 핵심만** 전해야 합니다.\n\n**카드뉴스 짜는 법**\n\n| 카드 | 하는 일 | 예 |\n|---|---|---|\n| 1. 표지 | 눈길을 끄는 제목·질문·숫자 | 200 kg of Trash in 3 Hours! |\n| 2. 핵심 사실 | 육하원칙의 핵심 사실 | Who: 40 students / Where: River Park |\n| 3. 자료 | 사진·도표로 보여 주는 자세한 정보 | Plastic bottles: 90 kg |\n| 4. 마무리 | 행동 제안·다음 소식·출처 | Join us next month! |\n\n**쓰는 요령**\n\n- **한 장에 메시지 하나**만 담습니다.\n- 긴 문장 대신 **짧은 문장이나 명사구**를 씁니다: Date: May 20 / Free for all students\n- 숫자·핵심어는 크게, 꾸미는 말은 줄입니다.\n- 포스터는 **What · When · Where · How to join**이 빠지지 않았는지 확인합니다. 연락처가 필요하면 학교 대표 주소처럼 공개해도 되는 것만 씁니다(연습에서는 hong@example.com 같은 가상의 주소).\n- 다른 사람의 사진이나 도표를 쓸 때는 **출처**를 밝힙니다.',
      easy: '카드뉴스는 **엘리베이터 안에서 읽는 글**이라고 생각하십시오. 몇 초 안에 내려야 하니 긴 문단은 읽지 않습니다. 그래서 한 장에 한 가지, 굵은 숫자 하나, 짧은 한 줄이면 충분합니다.\n\n포스터를 다 만들었다면 친구에게 보여 주고 "그래서 **무엇을, 언제, 어디서, 어떻게** 하면 돼?"라고 물어보십시오. 친구가 바로 답하지 못하면 빠진 정보가 있는 것입니다.',
      check: {
        type: 'ox',
        q: '카드뉴스는 한 장에 여러 메시지를 긴 문단으로 자세히 담을수록 효과적이다.',
        answer: false,
        explain: '카드뉴스는 짧은 시간에 넘겨 보는 매체입니다. **한 장에 메시지 하나**, 짧은 문장이나 명사구로 핵심만 담아야 효과적입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 기사를 읽고 육하원칙으로 정리해 보십시오.\n\n' + ARTICLE,
      steps: [
        '**Who**: About forty high school students (첫 문장의 주어)',
        '**What**: cleaned up River Park — 구체적으로 trash(쓰레기)를 주웠습니다.',
        '**Where / When**: River Park / last Saturday morning, 9 a.m.부터 세 시간',
        '**How**: Using gloves and large bags (장갑과 큰 봉투를 써서)',
        '**Why**: to protect the birds and fish that live along the river (to부정사가 목적을 나타냅니다)',
        '헤드라인은 현재 시제(Clean Up)로 지난 일을 압축했고, 첫 문단이 핵심을 요약했으며, 본문은 수치(200 kilograms)와 인용("I was surprised ~")으로 자세히 설명합니다.',
      ],
      answer: 'Who: about forty high school students / What: cleaned up the park (picked up trash) / Where: River Park / When: last Saturday morning / How: using gloves and large bags / Why: to protect the birds and fish',
    },
    {
      q: '다음 말을 간접화법으로 바꾸어 보십시오.\n\nThe coach said to us, "Don\'t be late tomorrow."',
      steps: [
        '명령문(Don\'t ~)이므로 전달 동사는 told, 뒤는 **not to + 동사원형**으로 씁니다.',
        'Don\'t be late → not to be late',
        '말을 전하는 때가 다르므로 tomorrow → **the next day**',
        '합치면 The coach told us not to be late the next day.',
      ],
      answer: 'The coach told us not to be late the next day.',
    },
  ],

  terms: [
    { term: '육하원칙 (5W1H)', def: '사건을 전할 때 담아야 할 여섯 가지: 누가(Who), 언제(When), 어디서(Where), 무엇을(What), 어떻게(How), 왜(Why).' },
    { term: '헤드라인 (headline)', def: '기사의 제목입니다. 지난 일도 현재 시제로, 앞으로의 일은 to + 동사원형으로 짧게 씁니다. 예: Students Clean Up River Park' },
    { term: '리드 (lead)', def: '기사의 첫 문단입니다. 사건의 핵심(육하원칙)을 한두 문장으로 먼저 요약합니다.' },
    { term: '역피라미드 구조', def: '가장 중요한 정보를 맨 앞에, 덜 중요한 정보를 뒤에 놓는 기사 짜임입니다.' },
    { term: '직접화법', def: '남의 말을 따옴표 안에 그대로 옮기는 방법입니다. 예: She said, "I am tired."' },
    { term: '간접화법', def: '남의 말을 전하는 사람의 입장에서 바꾸어 전하는 방법입니다. 대명사·시제·시간과 장소 표현을 바꿉니다. 예: She said that she was tired.' },
    { term: '사실과 의견', def: '사실(fact)은 확인할 수 있는 내용, 의견(opinion)은 사람마다 다를 수 있는 생각·평가입니다.' },
    { term: '캡션 (caption)', def: '사진 아래에 붙여 사진의 내용을 짧게 설명하는 글입니다. 보통 현재 시제로 씁니다.' },
    { term: '카드뉴스', def: '한 장에 메시지 하나씩, 짧은 글과 그림으로 넘겨 보며 읽게 만든 기사 형식입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'ox', concept: 0,
      q: '육하원칙에서 How(어떻게)는 사건이 일어난 이유를 말하는 부분이다.',
      answer: false,
      explain: 'How는 **방법·과정**(by -ing, with ~, using ~)을 말합니다. 이유나 목적을 말하는 것은 **Why**(to + 동사원형, because ~)입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '다음 문장에서 **How(어떻게)**에 해당하는 부분은 무엇입니까?\n\nTwo firefighters rescued a cat from a tall tree near the station yesterday by using a long ladder.',
      choices: ['Two firefighters', 'from a tall tree near the station', 'by using a long ladder', 'yesterday'],
      answer: 2,
      why: ['일을 한 사람이므로 Who(누가)입니다.', '고양이가 있던 곳이므로 Where(어디서)에 가깝습니다.', '', '때를 나타내므로 When(언제)입니다.'],
      explain: 'by -ing(~함으로써)는 **방법**을 나타냅니다. 소방관들은 긴 사다리를 써서 고양이를 구했으므로 **by using a long ladder**가 How입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '기사에서 제목 바로 아래에 와서, 사건의 핵심 사실을 한두 문장으로 **먼저** 요약하는 부분은 무엇입니까?',
      choices: ['headline', 'lead', 'body', 'caption'],
      answer: 1,
      why: ['headline은 기사 맨 위의 제목입니다. 몇 낱말로 압축할 뿐 문장으로 요약하지는 않습니다.', '', 'body(본문)는 자세한 과정·수치·인용을 담는 뒷부분입니다.', 'caption은 사진에 붙는 짧은 설명입니다.'],
      explain: '기사의 첫 문단을 **lead**라고 합니다. 육하원칙의 핵심을 먼저 요약하므로, 바쁜 독자는 헤드라인과 리드만 읽어도 사건을 압니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '헤드라인 **City to Open New Library**의 뜻으로 가장 알맞은 것은 무엇입니까?',
      choices: ['시가 새 도서관을 열었다.', '시가 새 도서관을 열 예정이다.', '시가 새 도서관을 늘 연다.', '시가 새 도서관 열기를 거부했다.'],
      answer: 1,
      why: ['이미 연 일이라면 헤드라인은 현재 시제 City Opens ~ 로 씁니다.', '', '헤드라인의 to + 동사원형은 반복되는 습관이 아니라 앞으로의 계획을 나타냅니다.', '거부했다는 뜻의 낱말(refuse, reject)이 없습니다.'],
      explain: '헤드라인에서 **to + 동사원형**은 앞으로 일어날 일(~할 예정이다)을 나타냅니다. City to Open ~ = The city is going to open ~.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'text', concept: 2,
      q: '간접화법의 기본 규칙에 따라 빈칸에 알맞은 한 낱말을 쓰십시오.\n\nJiho said, "I am hungry."\n→ Jiho said that he [[blank]] hungry.',
      answer: ['was'],
      wrong: [{ a: 'am', why: '전달 동사가 과거(said)이므로 am을 한 칸 뒤의 시제 was로 바꿉니다. 주어도 he이므로 am은 쓸 수 없습니다.' }, { a: 'is', why: '주어 he에는 맞지만, 기본 규칙에서는 전달 동사 said가 과거이므로 시제를 한 칸 뒤로 옮겨 was를 씁니다.' }],
      explain: '간접화법에서 I → he, am → **was**로 바꿉니다. Jiho said that he **was** hungry.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르십시오.\n\nYuna said, "I lost my umbrella yesterday."\n→ Yuna said that she had lost her umbrella [[blank]].',
      choices: ['yesterday', 'the next day', 'the day before', 'the following week'],
      answer: 2,
      why: ['전하는 때가 다르므로 yesterday를 그대로 두면 날짜가 어긋납니다.', 'the next day는 tomorrow를 바꾼 말입니다.', '', 'the following week는 next week를 바꾼 말입니다.'],
      explain: '간접화법에서 yesterday는 **the day before**(또는 the previous day)로 바꿉니다. 과거(lost)도 과거완료(had lost)로 한 칸 뒤로 옮겼습니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 3,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오.\n\nMy mom asked me, "Are you hungry?"\n→ My mom asked me [[blank]] I was hungry.',
      answer: ['if', 'whether'],
      wrong: [{ a: 'that', why: 'that은 평서문을 전할 때 씁니다. Yes/No 질문은 if나 whether로 전합니다.' }, { a: 'are', why: '간접화법에서는 의문문 어순을 쓰지 않습니다. 빈칸에는 연결하는 말 if(whether)가 들어갑니다.' }],
      explain: '의문사가 없는 질문은 **if** 또는 **whether**로 이어 전합니다. My mom asked me if(whether) I was hungry.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르십시오.\n\nThe teacher said to me, "Please close the window."\n→ The teacher asked me [[blank]] the window.',
      choices: ['close', 'to close', 'closing', 'that I closed'],
      answer: 1,
      why: ['asked + 사람 뒤에는 동사원형만 쓰지 않고 to를 붙입니다.', '', '요청을 전할 때는 동명사가 아니라 to부정사를 씁니다.', '요청·명령은 that절이 아니라 asked + 사람 + to + 동사원형으로 전합니다.'],
      explain: '요청을 전할 때는 **asked + 사람 + to + 동사원형**입니다. The teacher asked me **to close** the window.',
    },
    {
      id: 'p9', level: 1, type: 'ox', concept: 4,
      q: 'The festival was the most exciting event of the year. 는 사실(fact)을 전하는 문장이다.',
      answer: false,
      explain: 'the most exciting(가장 신나는)은 사람마다 다르게 느끼는 **평가**이므로 의견입니다. 사실로 바꾸려면 The festival lasted two days. 처럼 확인할 수 있는 내용을 씁니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '다음 막대그래프는 공원 청소에서 모은 쓰레기(모두 200 kg)를 종류별로 나타낸 것입니다. 그래프의 내용과 일치하지 **않는** 것은 무엇입니까?',
      fig: TRASH_FIG,
      choices: [
        'Plastic bottles made up 45 percent of the trash.',
        'Snack wrappers weighed twice as much as cans.',
        'Cans were the most common type of trash.',
        'The students collected 20 kilograms of other trash.',
      ],
      answer: 2,
      why: ['플라스틱병 90 kg은 200 kg의 45%이므로 일치합니다.', '과자 봉지 60 kg은 캔 30 kg의 두 배이므로 일치합니다.', '', '기타 쓰레기는 20 kg이므로 일치합니다.'],
      hint: '문장마다 그래프에서 해당 값을 찾아 확인하십시오.',
      explain: '가장 많은 것은 **플라스틱병(90 kg)**이고 캔은 30 kg으로 셋째입니다. 그래서 Cans were the most common type of trash. 가 그래프와 맞지 않습니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 5,
      q: '공원 청소 활동을 알리는 카드뉴스 네 장을 알맞은 순서로 놓으십시오.',
      choices: [
        '200 kg of Trash in Just 3 Hours!',
        'Who: 40 students / Where: River Park / When: Saturday, 9 a.m.',
        'Plastic bottles made up almost half of the trash.',
        'Join our next clean-up day! Sign up at the student office.',
      ],
      answer: [0, 1, 2, 3],
      hint: '눈길을 끄는 표지 → 핵심 사실 → 자세한 자료 → 행동 제안의 순서입니다.',
      explain: '**표지**(숫자로 눈길 끌기) → **핵심 사실**(육하원칙) → **자료**(도표의 정보) → **마무리**(다음 활동에 참여하자는 제안)의 순서입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '다음은 학교 행사를 알리는 포스터의 내용입니다. 꼭 들어가야 할 정보 가운데 **빠진 것**은 무엇입니까?\n\n**Book Swap Day**\nBring a book you have read and take home a new one!\nDate: Friday, June 7, 3:30 p.m.\nAll students are welcome.',
      choices: ['What (무슨 행사인지)', 'When (언제인지)', 'Where (어디서인지)', 'Who (누가 올 수 있는지)'],
      answer: 2,
      why: ['Book Swap Day와 그 설명으로 무슨 행사인지 나와 있습니다.', 'Date 줄에 날짜와 시각이 나와 있습니다.', '', 'All students are welcome. 으로 누가 참여할 수 있는지 나와 있습니다.'],
      hint: 'What · When · Where · Who를 하나씩 찾아 표시해 보십시오.',
      explain: '행사 이름과 방법(What), 날짜와 시각(When), 대상(Who)은 있지만 **장소(Where)**가 없습니다. Place: School Library 처럼 장소를 넣어야 합니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 기사로 답할 수 **없는** 물음은 무엇입니까?\n\n' + ARTICLE,
      choices: [
        'Why did the students clean up the park?',
        'How long did the students work at River Park last Saturday?',
        'How many trash cans will the manager put near the river?',
        'What was most of the trash?',
      ],
      answer: 2,
      why: [
        'to protect the birds and fish ~ 에서 이유를 알 수 있습니다.',
        'worked for three hours에서 알 수 있습니다.',
        '',
        'Most of it was plastic bottles and snack wrappers. 에서 알 수 있습니다.',
      ],
      hint: '물음마다 답이 되는 문장을 기사에서 찾아 밑줄을 그어 보십시오.',
      explain: '관리인은 쓰레기통을 **더(more)** 놓겠다고 했을 뿐, **몇 개**인지는 기사에 없습니다. 기사에 없는 정보는 짐작으로 채우지 않습니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '다음 기사에서 The park manager ~ said that he would put more trash cans near the river. 는 관리인의 말을 간접화법으로 전한 것입니다. 관리인이 실제로 한 말로 가장 알맞은 것은 무엇입니까?\n\n' + ARTICLE,
      choices: [
        '"He will put more trash cans near the river."',
        '"I will put more trash cans near the river."',
        '"I had put more trash cans near the river."',
        '"I put more trash cans near the river."',
      ],
      answer: 1,
      why: [
        '관리인이 자기 자신을 말한 것이므로 직접화법의 주어는 he가 아니라 I입니다.',
        '',
        'had put은 과거완료로, 이미 놓았다는 뜻이 됩니다. would는 will을 한 칸 뒤로 옮긴 것입니다.',
        'put을 과거로 읽으면 이미 놓았다는 뜻이 됩니다. would는 앞으로의 일(will)을 전한 것입니다.',
      ],
      hint: '간접화법에서 바뀐 것(he, would)을 거꾸로 되돌려 보십시오.',
      explain: '간접화법은 직접화법의 I를 he로, will을 would로 바꾼 것입니다. 거꾸로 되돌리면 관리인의 말은 **"I will put more trash cans near the river."**입니다.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 3,
      q: '"그녀는 내게 박물관이 다음 날 몇 시에 문을 여는지 물었다."가 되도록 낱말 묶음을 놓으십시오.',
      choices: ['She asked me', 'what time', 'the museum', 'would open', 'the next day'],
      answer: [0, 1, 2, 3, 4],
      hint: '의문사 뒤는 주어 + 동사의 순서입니다.',
      explain: '질문을 전할 때는 asked + 사람 + **의문사(what time) + 주어(the museum) + 동사(would open)**의 평서문 어순입니다. 직접화법 "What time will the museum open tomorrow?"에서 will → would, tomorrow → the next day로 바꾸었습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 막대그래프를 설명한 기사 문장 가운데 **사실에 맞게, 사실만** 전한 것은 무엇입니까?',
      fig: TRASH_FIG,
      choices: [
        'Because people are careless, plastic bottles made up most of the trash we found.',
        'The students found 90 kilograms of plastic bottles, the largest amount.',
        'Cans made up half of the trash, which was shocking.',
        'Snack wrappers were the most common type of trash.',
      ],
      answer: 1,
      why: [
        '"사람들이 부주의하다"는 그래프에 없는 원인을 덧붙인 의견입니다. 또 플라스틱병은 45%로 절반을 넘지 않습니다.',
        '',
        '캔은 30 kg으로 15%입니다. 또 shocking은 글쓴이의 평가입니다.',
        '가장 많은 것은 과자 봉지(60 kg)가 아니라 플라스틱병(90 kg)입니다.',
      ],
      hint: '숫자가 그래프와 맞는지, 그래프에 없는 원인·평가를 덧붙였는지 두 가지를 확인하십시오.',
      explain: '플라스틱병 90 kg은 그래프에서 가장 큰 값이므로 **The students found 90 kilograms of plastic bottles, the largest amount.**가 사실만 정확히 전한 문장입니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 5,
      q: '청소 활동 카드뉴스의 **마무리 카드**에 넣을 글로 가장 알맞은 것은 무엇입니까?',
      choices: [
        'Our next clean-up: July 6. Join us!',
        'On Saturday morning, about forty high school students gathered at River Park, and they picked up a lot of trash for three hours because they wanted to protect animals.',
        'Students Clean Up River Park',
        'Plastic bottles: 90 kg',
      ],
      answer: 0,
      why: [
        '',
        '내용은 맞지만 한 장에 긴 문장을 넣어 카드뉴스에 어울리지 않습니다. 이런 내용은 핵심 카드에 짧게 나누어 넣습니다.',
        '헤드라인처럼 주제를 알리는 말이라 표지 카드에 어울립니다.',
        '도표의 정보이므로 자료 카드에 어울립니다.',
      ],
      hint: '마무리 카드는 읽은 사람이 "그다음에 무엇을 할지" 알려 줍니다.',
      explain: '마무리 카드에는 다음 행사 날짜와 참여를 권하는 말처럼 **행동 제안**을 짧게 담습니다. 긴 문장은 카드뉴스에 맞지 않고, 제목과 수치는 앞쪽 카드에 어울립니다.',
    },
  ],

  deeper: [
    {
      title: '왜 기사는 중요한 것을 먼저 쓸까',
      body: '기사의 역피라미드 구조는 **독자**와 **편집자** 모두에게 쓸모가 있습니다.\n\n- 독자는 시간이 없을 때 헤드라인과 첫 문단만 읽고도 무슨 일이 있었는지 압니다.\n- 지면이나 화면이 모자라면 편집자는 기사의 **끝부분부터** 잘라 내면 됩니다. 중요한 내용은 앞에 있으니 잘라도 핵심이 남습니다.\n\n반대로 이야기·수필은 시간 순서나 긴장감을 살려 결말을 뒤에 두기도 합니다. 글의 목적이 "빨리 알리기"인지 "흥미롭게 들려주기"인지에 따라 짜임이 달라지는 것입니다. 영어Ⅱ에서는 여러 가지 글의 구조를 더 넓게 다룹니다.',
    },
    {
      title: '남의 말을 전할 때의 책임',
      body: '기사에서 따옴표 안의 말(직접 인용)은 **그 사람이 한 말 그대로**여야 합니다. 낱말 하나만 바꿔도 뜻이 달라질 수 있기 때문입니다. 정확히 기억나지 않으면 간접화법으로 **뜻만** 전하고, 누가 한 말인지(said Minji, according to the manager) 꼭 밝힙니다.\n\n카드뉴스나 포스터를 만들 때도 마찬가지입니다. 다른 사람이 찍은 사진, 다른 기관이 만든 도표를 쓸 때는 출처를 적고, 쓸 수 있는 자료인지(이용 허락) 확인합니다. 개인의 얼굴이 크게 나온 사진이나 연락처는 본인의 동의 없이 올리지 않습니다.',
    },
  ],

  faq: [
    {
      q: '간접화법에서 시제를 꼭 바꿔야 해요?',
      a: '전달 동사가 과거(said, asked)이면 기본은 한 칸 뒤로 바꿉니다(am → was, will → would). 다만 말한 내용이 지금도 변함없는 사실이면(The teacher said that the earth goes around the sun.) 현재 시제를 그대로 두기도 합니다. 시험이나 글쓰기에서는 기본 규칙대로 바꾸는 것이 안전합니다.',
    },
    {
      q: 'say랑 tell은 뭐가 달라요?',
      a: 'tell은 뒤에 **듣는 사람**이 바로 옵니다: She **told me** that ~. say는 듣는 사람을 바로 쓰지 않고, 쓰려면 to를 붙입니다: She **said (to me)** that ~. 그래서 She said me that ~ 은 틀린 문장입니다.',
    },
    {
      q: '헤드라인은 왜 지난 일인데 현재형으로 써요?',
      a: '헤드라인은 짧고 생생해야 하므로 낱말 수가 적은 현재형을 씁니다. 독자는 "방금 일어난 소식"으로 읽습니다. 본문에서는 보통 과거 시제로 자세히 씁니다. 앞으로의 일은 to + 동사원형(City to Open ~)으로 나타냅니다.',
    },
    {
      q: 'if랑 whether는 아무거나 써도 돼요?',
      a: '질문을 전하는 asked 뒤에서는 둘 다 씁니다. 다만 whether는 바로 뒤에 or not을 붙일 수 있고(asked whether or not I was coming), 조금 더 격식 있는 느낌입니다. 문장 맨 앞 주어 자리에는 whether를 씁니다.',
    },
  ],

  mistakes: [
    'She asked me where did I live. 처럼 의문문 어순을 그대로 두는 실수 — 간접화법에서는 의문사 + 주어 + 동사: She asked me where I lived.',
    '간접화법으로 바꾸면서 tomorrow, yesterday를 그대로 두는 실수 — the next day, the day before로 바꿉니다.',
    '사진·도표에 없는 원인이나 평가를 사실처럼 덧붙이는 실수 — 보이는 것과 적힌 수치만 사실로 전하고, 생각은 의견임을 밝힙니다.',
  ],

  gens: [
    {
      id: 'five-w-one-h',
      level: 1,
      title: '기사 첫 문장에서 육하원칙 찾기',
      make: function (R) {
        // 가상의 기사 첫 문장: [Who, What, Where, When, How, Why] 순서로 이어 붙인다
        var leads = [
          ['About forty students', 'collected trash', 'at River Park', 'last Saturday morning', 'with gloves and large bags', 'to protect the birds living there'],
          ['The school library', 'opened a reading café', 'on the first floor', 'on Monday', 'by turning an old storeroom into a bright room', 'to help students enjoy books together'],
          ['Two firefighters', 'rescued a cat', 'from a tall tree near the station', 'yesterday afternoon', 'by using a long ladder', 'because the cat could not climb down'],
          ['A group of students', 'planted 100 trees', 'along the school road', 'last spring', 'with help from their parents', 'to give shade in summer'],
          ['The town', 'held a free concert', 'in the central square', 'on Sunday evening', 'by inviting student bands', 'to thank its volunteers'],
          ['Local farmers', 'opened a weekend market', 'in the old train station', 'in early May', 'by setting up thirty small stands', 'so that people could buy fresh food'],
        ];
        var names = [
          { en: 'Who', ko: '누가' }, { en: 'What', ko: '무엇을' }, { en: 'Where', ko: '어디서' },
          { en: 'When', ko: '언제' }, { en: 'How', ko: '어떻게' }, { en: 'Why', ko: '왜' },
        ];
        var lead = R.pick(leads);
        var t = R.int(0, 5);
        var others = R.sample([0, 1, 2, 3, 4, 5].filter(function (i) { return i !== t; }), 3);
        var idx = R.shuffle([t].concat(others));
        var sentence = lead.join(' ') + '.';
        var tip = {
          0: '일을 한 주체(문장의 주어)를 찾으십시오.',
          1: '무슨 일을 했는지 동사와 목적어를 찾으십시오.',
          2: 'at, in, on, from, along 같은 말 뒤의 장소를 찾으십시오.',
          3: '때를 나타내는 말(yesterday, last ~, on + 요일)을 찾으십시오.',
          4: 'by -ing, with ~ 처럼 방법을 나타내는 말을 찾으십시오.',
          5: 'to + 동사원형, because ~, so that ~ 처럼 목적·이유를 나타내는 말을 찾으십시오.',
        };
        return {
          type: 'choice', concept: 0,
          q: '다음 기사 첫 문장에서 육하원칙의 **' + names[t].en + '(' + names[t].ko + ')**에 해당하는 부분은 무엇입니까?\n\n' + sentence,
          choices: idx.map(function (i) { return lead[i]; }),
          answer: idx.indexOf(t),
          why: idx.map(function (i) { return i === t ? '' : '이 부분은 ' + names[i].en + '(' + names[i].ko + ')에 해당합니다. ' + tip[t]; }),
          explain: '**' + lead[t] + '**' + '(' + names[t].ko + ') — ' + tip[t] + '\n\n정리: Who ' + lead[0] + ' / What ' + lead[1] + ' / Where ' + lead[2] + ' / When ' + lead[3] + ' / How ' + lead[4] + ' / Why ' + lead[5],
        };
      },
    },
    {
      id: 'time-shift',
      level: 1,
      title: '간접화법의 시간·장소 표현 바꾸기',
      make: function (R) {
        // key: 직접화법 표현, to: 간접화법 표현
        var map = {
          tomorrow: 'the next day', yesterday: 'the day before', today: 'that day', now: 'then',
          'next week': 'the following week', 'last week': 'the week before', tonight: 'that night', here: 'there',
        };
        var bank = [
          { s: 'Minho', p: 'he', d: 'I will finish the report tomorrow.', i: 'he would finish the report', k: 'tomorrow' },
          { s: 'Sora', p: 'she', d: 'I will visit my aunt tomorrow.', i: 'she would visit her aunt', k: 'tomorrow' },
          { s: 'Jiwoo', p: 'she', d: 'I saw a rainbow yesterday.', i: 'she had seen a rainbow', k: 'yesterday' },
          { s: 'Doyun', p: 'he', d: 'I lost my bus card yesterday.', i: 'he had lost his bus card', k: 'yesterday' },
          { s: 'Hayun', p: 'she', d: 'I am very busy today.', i: 'she was very busy', k: 'today' },
          { s: 'Seojun', p: 'he', d: 'I have a piano lesson today.', i: 'he had a piano lesson', k: 'today' },
          { s: 'Suah', p: 'she', d: 'I am reading a novel now.', i: 'she was reading a novel', k: 'now' },
          { s: 'Junho', p: 'he', d: 'I can help you now.', i: 'he could help me', k: 'now' },
          { s: 'Yuna', p: 'she', d: 'I will move to a new city next week.', i: 'she would move to a new city', k: 'next week' },
          { s: 'Minjae', p: 'he', d: 'I started a new club last week.', i: 'he had started a new club', k: 'last week' },
          { s: 'Eunji', p: 'she', d: 'I will watch the meteor shower tonight.', i: 'she would watch the meteor shower', k: 'tonight' },
          { s: 'Taeho', p: 'he', d: 'I left my umbrella here.', i: 'he had left his umbrella', k: 'here' },
        ];
        var item = R.pick(bank);
        var correct = map[item.k];
        var reason = {};
        reason[item.k] = '말을 전하는 때와 곳이 처음과 다르므로 ' + item.k + ' 표현을 그대로 두지 않고 바꿉니다.';
        Object.keys(map).forEach(function (k) {
          if (k !== item.k) reason[map[k]] = map[k] + ' 표현은 ' + k + ' 표현을 바꾼 말입니다.';
        });
        var wrongs = R.shuffle(Object.keys(map).filter(function (k) { return k !== item.k; }).map(function (k) { return map[k]; }));
        var pick = R.choices(correct, [item.k].concat(wrongs.slice(0, 4)));
        var dq = item.d.replace(item.k, '__' + item.k + '__');
        return {
          type: 'choice', concept: 2,
          q: '직접화법을 간접화법으로 바꿀 때 빈칸에 알맞은 말을 고르십시오.\n\n' + item.s + ' said, "' + dq + '"\n→ ' + item.s + ' said that ' + item.i + ' [[blank]].',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: '간접화법에서 **' + item.k + '** 표현은 **' + correct + '** 표현으로 바꿉니다. 대명사(I → ' + item.p + ')와 시제도 한 칸 뒤로 옮겨 ' + item.s + ' said that ' + item.i + ' ' + correct + '. 가 됩니다.',
        };
      },
    },
    {
      id: 'reported-question',
      level: 2,
      title: '질문을 간접화법으로 전하기',
      make: function (R) {
        var bank = [
          { d: 'Where do you live?', c: 'where I lived', w: [['where did I live', 'did를 남겼습니다. 간접화법에서는 do/does/did를 빼고 주어 + 동사로 씁니다.'], ['where do I live', '의문문 어순과 현재 시제를 그대로 두었습니다. where + 주어 + 동사(과거)로 씁니다.'], ['if I lived where', '의문사가 있는 질문은 if 없이 의문사로 바로 잇습니다.']] },
          { d: 'What time is it?', c: 'what time it was', w: [['what time was it', '의문문 어순(동사 + 주어)을 그대로 두었습니다. 평서문 어순(주어 + 동사)으로 바꿉니다.'], ['what time it is', '전달 동사가 과거(asked)이므로 is를 was로 바꿉니다.'], ['that what time it was', '의문사 앞에 that을 붙이지 않습니다.']] },
          { d: 'Are you ready?', c: 'if I was ready', w: [['was I ready', '의문문 어순을 그대로 두었습니다. Yes/No 질문은 if + 주어 + 동사로 전합니다.'], ['that I was ready', 'that은 평서문을 전할 때 씁니다. 질문은 if나 whether로 전합니다.'], ['if I am ready', '전달 동사가 과거이므로 am을 was로 바꿉니다.']] },
          { d: 'Can you swim?', c: 'whether I could swim', w: [['whether could I swim', '의문문 어순을 그대로 두었습니다. whether + 주어 + 동사로 씁니다.'], ['that I could swim', 'that은 평서문을 전할 때 씁니다. 질문은 if나 whether로 전합니다.'], ['that whether I could swim', '질문을 전할 때 whether 앞에 that을 붙이지 않습니다.']] },
          { d: 'Why are you late?', c: 'why I was late', w: [['why was I late', '의문문 어순을 그대로 두었습니다. why + 주어 + 동사로 씁니다.'], ['if I was late why', '의문사가 있는 질문은 if 없이 의문사로 바로 잇습니다.'], ['why I am late', '전달 동사가 과거이므로 am을 was로 바꿉니다.']] },
          { d: 'Do you like spicy food?', c: 'if I liked spicy food', w: [['did I like spicy food', '의문문 어순을 그대로 두었습니다. if + 주어 + 동사로 씁니다.'], ['if did I like spicy food', 'did를 남겼습니다. 간접화법에서는 do/does/did를 빼고 동사를 과거형으로 씁니다.'], ['that I liked spicy food', 'that은 평서문을 전할 때 씁니다. 질문은 if나 whether로 전합니다.']] },
          { d: 'How did you find the answer?', c: 'how I had found the answer', w: [['how did I find the answer', 'did를 남겼습니다. 간접화법에서는 did를 빼고 과거완료(had found)로 씁니다.'], ['if I had found the answer how', '의문사가 있는 질문은 if 없이 의문사로 바로 잇습니다.'], ['how had I found the answer', '의문문 어순(동사 + 주어)을 그대로 두었습니다. how + 주어 + 동사로 씁니다.']] },
          { d: 'Where is the bus stop?', c: 'where the bus stop was', w: [['where was the bus stop', '의문문 어순을 그대로 두었습니다. where + 주어(the bus stop) + 동사(was)로 씁니다.'], ['where is the bus stop', '의문문 어순과 현재 시제를 그대로 두었습니다.'], ['that where the bus stop was', '의문사 앞에 that을 붙이지 않습니다.']] },
        ];
        var asker = R.pick([
          { en: 'The reporter', ko: '기자' }, { en: 'My teacher', ko: '선생님' }, { en: 'The guide', ko: '안내원' }, { en: 'A new classmate', ko: '새 친구' },
        ]);
        var item = R.pick(bank);
        var reason = {};
        item.w.forEach(function (x) { reason[x[0]] = x[1]; });
        var pick = R.choices(item.c, item.w.map(function (x) { return x[0]; }));
        var hasWh = !/^(if|whether)/.test(item.c);
        return {
          type: 'choice', concept: 3,
          q: '빈칸에 알맞은 말을 고르십시오.\n\n' + asker.en + ' asked me, "' + item.d + '"\n→ ' + asker.en + ' asked me [[blank]].',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === item.c ? '' : reason[c]; }),
          hint: hasWh ? '의문사 뒤의 어순을 생각해 보십시오.' : '의문사가 없는 질문은 무엇으로 이어 전하는지 생각해 보십시오.',
          explain: (hasWh ? '의문사가 있는 질문은 **의문사 + 주어 + 동사**' : 'Yes/No 질문은 **if/whether + 주어 + 동사**') + '의 평서문 어순으로 전하고, you → I, 시제는 한 칸 뒤로 옮깁니다. 그래서 ' + asker.en + ' asked me **' + item.c + '**. 입니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'headline', m: '(기사의) 제목, 헤드라인', ex: 'The headline was short but clear.', exm: '그 기사 제목은 짧지만 분명했다.' },
    { w: 'article', m: '기사', ex: 'I read an article about a new bridge.', exm: '나는 새 다리에 관한 기사를 읽었다.' },
    { w: 'reporter', m: '기자', ex: 'A reporter asked the students some questions.', exm: '한 기자가 학생들에게 몇 가지를 물었다.' },
    { w: 'event', m: '사건, 행사', ex: 'The event took place in the school gym.', exm: '그 행사는 학교 체육관에서 열렸다.' },
    { w: 'volunteer', m: '자원봉사자; 자원하다', ex: 'Ten volunteers helped at the library.', exm: '자원봉사자 열 명이 도서관에서 도왔다.' },
    { w: 'witness', m: '목격자; 목격하다', ex: 'A witness said the bus stopped suddenly.', exm: '한 목격자는 버스가 갑자기 멈췄다고 말했다.' },
    { w: 'quote', m: '인용하다; 인용한 말', ex: 'The article quoted one of the students.', exm: '그 기사는 학생 한 명의 말을 인용했다.' },
    { w: 'caption', m: '(사진 아래의) 설명 글', ex: 'The caption explains who is in the photo.', exm: '설명 글은 사진 속 인물이 누구인지 알려 준다.' },
    { w: 'according to', m: '~에 따르면', ex: 'According to the graph, most students walk to school.', exm: '그래프에 따르면 대부분의 학생이 걸어서 등교한다.' },
    { w: 'collect', m: '모으다', ex: 'We collected old books for the library.', exm: '우리는 도서관에 줄 헌 책을 모았다.' },
    { w: 'protect', m: '보호하다', ex: 'Trees protect the soil from heavy rain.', exm: '나무는 폭우로부터 흙을 보호한다.' },
    { w: 'announce', m: '발표하다, 알리다', ex: 'The school announced the date of the festival.', exm: '학교는 축제 날짜를 발표했다.' },
    { w: 'summary', m: '요약', ex: 'The first paragraph gives a summary of the news.', exm: '첫 문단은 소식을 요약해 준다.' },
    { w: 'fact', m: '사실', ex: 'It is a fact that the event started at 9 a.m.', exm: '행사가 오전 9시에 시작했다는 것은 사실이다.' },
    { w: 'opinion', m: '의견', ex: 'In my opinion, the poster needs a bigger title.', exm: '내 의견으로는 포스터의 제목이 더 커야 한다.' },
    { w: 'poster', m: '포스터, 게시물', ex: 'We put up a poster about the book fair.', exm: '우리는 도서 박람회를 알리는 포스터를 붙였다.' },
  ],
});
})();
