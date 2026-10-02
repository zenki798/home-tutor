/* 영어Ⅱ · 인문·사회 글의 관점
 * 지문·예문은 모두 직접 쓴 글이다(가상의 인물·가상의 마을). */
(function () {
  // 글 A: 청소년과 스마트폰 (여러 관점 + 글쓴이의 관점, 직접 쓴 글)
  var PHONE = 'Some parents argue that teenagers should not have smartphones until they are sixteen. They claim that phones distract students from studying and reduce face-to-face conversation. Others point out that phones help teenagers stay in touch with their families and find useful information quickly. In my view, the real question is not whether teenagers have phones but how they use them. Teaching young people to set their own limits will do more good than simply taking their phones away.';
  // 글 B: 공감은 기를 수 있다 (정의 + 인용된 관점에 동의하는 글쓴이, 직접 쓴 글)
  var EMPATHY = 'Empathy refers to the ability to understand and share the feelings of another person. Some people think that empathy is something you either have or do not have. However, many psychologists suggest that it can be developed through practice, such as listening carefully and imagining a situation from another person\'s point of view. I find this idea encouraging, because it means that anyone can learn to be more understanding.';
  // 글 C: 사회 규범과 편견 (직접 쓴 글)
  var NORMS = 'Every society has norms, unwritten rules about how people should behave. In some places, people take off their shoes before entering a home; in others, they keep them on. A visitor who judges these customs only by the norms of his or her own culture may see them as strange or even wrong. This kind of bias makes it hard to learn from others. When we meet an unfamiliar custom, we should first ask why it makes sense to the people who follow it.';
  // 글 D: 여러 나라의 영어 (직접 쓴 글)
  var ENGLISHES = 'English does not belong to a single country. It is used as a main or official language in many places, such as the United Kingdom, Australia, India, Singapore, and Nigeria, and each place has developed its own words and ways of speaking. For example, what most Americans call an "apartment" is usually called a "flat" in Britain. Some people still believe that only one kind of English is "correct." However, these varieties are all valid forms of the language, each with its own patterns. Good communicators listen for meaning instead of judging accents.';

Tutor.registerUnit({
  id: 'eng-h-e2-02',
  course: 'eng-h-e2',
  title: '인문·사회 글의 관점',
  summary: '심리·철학·사회 주제의 글에서 글쓴이의 관점과 인용된 다른 관점을 구별하고 요지를 정리합니다.',
  goals: [
    'perspective, bias, norm, empathy 같은 인문·사회 개념어의 뜻을 문맥 속에서 이해할 수 있다.',
    'Some argue ~, According to ~ 같은 인용 표현과 In my view ~ 같은 글쓴이의 표현을 구별할 수 있다.',
    '서로 다른 입장을 표로 정리하여 비교하고, 다른 문화와 관점을 존중하며 읽을 수 있다.',
    '글의 요지를 한 문장으로 정리할 수 있다.',
  ],
  standards: ['[12영Ⅱ-01-02]', '[12영Ⅱ-01-08]'],

  concepts: [
    {
      title: '인문·사회 글의 개념어',
      body: '심리·철학·사회를 다룬 글에는 눈에 보이지 않는 생각이나 태도를 가리키는 **개념어**가 자주 나옵니다. 뜻을 정확히 알아야 글쓴이가 무엇을 비판하고 무엇을 권하는지 잡을 수 있습니다.\n\n' +
        '| 낱말 | 뜻 | 예문 |\n|---|---|---|\n' +
        '| **perspective** | 관점, 보는 시각 | Try to see the problem from a different **perspective**. |\n' +
        '| **bias** | 편견, 한쪽으로 치우친 생각 | Our **bias** can make us ignore facts we do not like. |\n' +
        '| **norm** | 규범, 사회가 당연하게 여기는 행동 규칙 | Waiting in line is a social **norm** in many places. |\n' +
        '| **empathy** | 공감, 남의 감정을 이해하고 함께 느끼는 능력 | **Empathy** helps us understand why a friend is upset. |\n' +
        '| **stereotype** | 고정관념, 한 집단을 하나의 모습으로 단정하는 생각 | "All teenagers are lazy" is a **stereotype**. |\n\n' +
        '헷갈리기 쉬운 짝도 구별해 둡니다. 공감(**empathy**)은 상대의 처지에 서서 그 감정을 함께 느끼는 것이고, 동정(**sympathy**)은 상대를 안타깝게 여기는 마음에 가깝습니다.\n\n' +
        '> 💡 개념어는 글 안에서 다시 풀어 쓰이는 일이 많습니다. Every society has norms, **unwritten rules about how people should behave**처럼 쉼표 뒤 동격 표현이 뜻을 알려 줍니다.',
      easy: '안경을 떠올려 보십시오. 파란 안경을 쓰면 세상이 파랗게 보이고, 노란 안경을 쓰면 노랗게 보입니다.\n\n' +
        '관점(**perspective**)은 내가 쓰고 있는 안경, 편견(**bias**)은 한쪽 색이 너무 진해서 다른 색을 못 보게 만드는 안경입니다. 공감(**empathy**)은 잠깐 친구의 안경을 빌려 써 보는 것이고, 규범(**norm**)은 "이 동네 사람들은 다 이 안경을 쓴다"는 약속 같은 것입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nWhen Jia saw her friend cry after losing the game, she felt sad too and understood exactly how her friend felt. Jia showed [[빈칸]].',
        choices: ['empathy', 'bias', 'norm'],
        answer: 0,
        why: ['', 'bias는 한쪽으로 치우친 생각(편견)입니다. 친구의 감정을 함께 느낀 것과 거리가 멉니다.', 'norm은 사회가 당연하게 여기는 행동 규칙입니다. 한 사람이 느낀 감정을 가리키지 않습니다.'],
        explain: '친구의 감정을 이해하고 함께 슬퍼했으므로 **empathy**(공감)입니다. 남의 감정을 이해하고 함께 느끼는 능력을 뜻합니다.',
      },
    },
    {
      title: '글쓴이의 관점과 인용된 관점 구별하기',
      body: '인문·사회 글은 여러 사람의 생각을 소개한 뒤 글쓴이의 생각을 밝히는 경우가 많습니다. 이때 **누구의 생각인지**를 놓치면 글쓴이가 반대하는 의견을 요지로 고르게 됩니다.\n\n' +
        '| 누구의 생각인가 | 신호 표현 |\n|---|---|\n' +
        '| **인용된 관점** (다른 사람) | Some (people) argue that ~ / Others point out ~ / According to ~ / Critics claim ~ / Many experts suggest ~ / It is often said that ~ |\n' +
        '| **글쓴이의 관점** | In my view, ~ / I believe ~ / I would argue ~ / It seems to me ~ / What this overlooks is ~ / The real question is ~ |\n\n' +
        '인용된 관점을 소개한 뒤 글쓴이는 세 가지 태도 가운데 하나를 보입니다.\n\n' +
        '1. **동의**: I find this idea convincing. / This makes sense because ~\n' +
        '2. **반대**: However, this view ignores ~ / But this is not the whole story.\n' +
        '3. **절충**: Both sides have a point, but ~ / The real question is not A but B.\n\n' +
        '> ⚠️ According to ~, Some argue ~ 로 시작하는 문장이 **늘 글쓴이의 반대 의견인 것은 아닙니다**. 글쓴이가 전문가의 말을 근거로 빌려 와 동의하기도 합니다. 인용 바로 뒤의 태도 표현을 확인하십시오.',
      easy: '토론 사회자를 떠올려 보십시오. 사회자는 "A 측은 이렇게 말합니다", "B 측은 이렇게 말합니다"라고 양쪽 의견을 전한 뒤, 마지막에 "제 생각에는…" 하고 자기 의견을 덧붙입니다.\n\n' +
        '글도 같습니다. Some argue, Others point out은 사회자가 "A 측, B 측"의 말을 **전하는** 부분이고, In my view는 사회자가 **자기 말을 하는** 부분입니다. 글쓴이의 관점을 묻는다면 "제 생각에는" 뒤를 보면 됩니다.',
      check: {
        type: 'choice',
        q: '글 A에서 **글쓴이 자신의** 관점이 드러난 문장은 무엇입니까?\n\n' + PHONE,
        choices: [
          'In my view, the real question is not whether teenagers have phones but how they use them.',
          'They claim that phones distract students from studying and reduce face-to-face conversation.',
          'Others point out that phones help teenagers stay in touch with their families and find useful information quickly.',
        ],
        answer: 0,
        why: ['', 'They claim ~ 의 They는 앞 문장의 Some parents입니다. 일부 부모의 주장을 전한 것입니다.', 'Others point out ~ 는 다른 사람들의 의견을 소개하는 표현입니다.'],
        explain: '**In my view**가 글쓴이 자신의 관점을 밝히는 신호입니다. Some parents argue, They claim, Others point out은 모두 다른 사람의 관점을 전하는 표현입니다.',
      },
    },
    {
      title: '서로 다른 입장을 정리하고 비교하기',
      body: '하나의 쟁점에 여러 입장이 나오는 글은 **표로 정리**하면 한눈에 비교할 수 있습니다. 칸은 대개 **누가 / 무엇을 주장하는가 / 근거는 무엇인가**로 나눕니다.\n\n' +
        '| 입장을 나란히 놓는 표현 | 뜻 |\n|---|---|\n' +
        '| On the one hand, ~ On the other hand, ~ | 한편으로는 ~, 다른 한편으로는 ~ |\n' +
        '| While some ~, others ~ | 어떤 사람들은 ~하는 반면, 다른 사람들은 ~ |\n' +
        '| Supporters of A say ~, but opponents argue ~ | 찬성하는 쪽은 ~, 반대하는 쪽은 ~ |\n' +
        '| Both sides agree that ~ | 양쪽 모두 ~에는 동의한다 (공통점) |\n\n' +
        '정리할 때 지킬 점:\n\n' +
        '- 입장마다 **근거를 짝지어** 적습니다. 근거를 다른 입장 칸에 옮겨 적는 실수가 흔합니다.\n' +
        '- 양쪽이 **함께 인정하는 점**(Both sides agree ~)이 있으면 따로 적어 둡니다. 절충안의 실마리가 됩니다.\n' +
        '- 글쓴이가 어느 쪽인지 **드러나지 않는 글**도 있습니다. 그럴 때는 "글쓴이의 입장" 칸을 억지로 채우지 않습니다.',
      easy: '학급 회의에서 "체육대회 날 반 티셔츠를 맞출까?"를 두고 의견이 갈렸다고 해 봅시다. 칠판에 두 칸을 그려 **찬성**: "단합이 잘 된다", **반대**: "돈이 든다"라고 적으면 무엇을 따져야 할지 금방 보이지요.\n\n' +
        '영어 글도 같은 방법으로 읽습니다. Supporters say ~ 는 찬성 칸에, opponents argue ~ 는 반대 칸에 옮겨 적으면 됩니다.',
      check: {
        type: 'ox',
        q: '"While some students prefer studying alone, others learn better in groups."는 두 입장을 나란히 소개하는 문장이다.',
        answer: true,
        explain: '**While some ~, others ~**는 "어떤 사람들은 ~하는 반면, 다른 사람들은 ~"이라는 뜻으로 서로 다른 입장을 나란히 놓습니다. 혼자 공부하기를 좋아하는 학생들과 함께 배우는 것이 나은 학생들, 두 입장입니다.',
      },
    },
    {
      title: '다양한 영어와 문화마다 다른 소통 방식',
      body: '영어는 한 나라만의 말이 아닙니다. 영국·미국은 물론 오스트레일리아, 인도, 싱가포르, 나이지리아 등 여러 곳에서 주된 언어나 공식 언어로 쓰이며, 곳마다 낱말·발음·표현이 조금씩 다릅니다.\n\n' +
        '| 미국에서 흔히 | 영국에서 흔히 | 뜻 |\n|---|---|---|\n' +
        '| apartment | flat | 아파트, 공동 주택의 한 집 |\n' +
        '| elevator | lift | 승강기 |\n' +
        '| vacation | holiday | 휴가 |\n' +
        '| color, center | colour, centre | 철자 차이 |\n\n' +
        '이런 차이는 **맞고 틀림이 아니라 서로 다른 변이형(variety)**입니다. 한 가지 영어만 "올바르다"고 여기는 것도 일종의 **bias**입니다.\n\n' +
        '소통 방식도 문화마다 다릅니다. 어떤 곳에서는 생각을 **직접적으로** 말하는 것을 정직하다고 여기고, 어떤 곳에서는 거절이나 반대를 **간접적으로**(예: "That might be a little difficult.") 표현하는 것을 예의 바르다고 여깁니다. 눈을 맞추는 정도, 침묵의 의미, 대화 사이의 거리도 다를 수 있습니다.\n\n' +
        '> 💡 다른 문화의 글을 읽을 때는 **내 문화의 규범으로 먼저 판단하지 말고**, 그 행동이 그 사람들에게 왜 자연스러운지를 먼저 물어보십시오. 같은 문화 안에서도 사람마다 다르다는 점도 기억해 둡니다.',
      easy: '우리말도 지역마다 다르지요. 같은 것을 두고 부르는 말이 다르거나, 말끝이 다르게 들리기도 합니다. 그렇다고 어느 한 지역 말이 "틀린" 말은 아닙니다.\n\n' +
        '영어도 같습니다. 영국 친구가 flat이라고 하고 미국 친구가 apartment라고 해도 둘 다 맞는 영어입니다. 말하는 방식이 나와 다를 때는 "이상하다"가 아니라 "이 사람은 이렇게 표현하는구나" 하고 뜻에 귀를 기울이면 됩니다.',
      check: {
        type: 'choice',
        q: '영국 영어에서 흔히 lift라고 부르는 것을 미국 영어에서는 흔히 무엇이라고 합니까?',
        choices: ['elevator', 'apartment', 'vacation'],
        answer: 0,
        why: ['', 'apartment에 해당하는 영국 영어는 flat입니다.', 'vacation에 해당하는 영국 영어는 holiday입니다.'],
        explain: '승강기를 영국 영어에서는 흔히 **lift**, 미국 영어에서는 **elevator**라고 합니다. 둘 다 바른 영어이고, 쓰는 곳이 다를 뿐입니다.',
      },
    },
    {
      title: '글의 요지를 한 문장으로 쓰기',
      body: '요지는 **"이 글은 무엇에 대해(화제), 글쓴이가 어떤 생각을 하는가(관점)"**를 한 문장에 담은 것입니다. 여러 관점이 나오는 글이라면 요지는 **글쓴이의 관점**이어야 합니다.\n\n' +
        '한 문장 요지를 만드는 순서:\n\n' +
        '1. **화제**를 찾습니다: 글이 무엇에 대한 것인가? (예: 청소년의 스마트폰 사용)\n' +
        '2. **글쓴이의 관점**을 찾습니다: In my view, I believe, The real question is ~ 뒤\n' +
        '3. 둘을 이어 **자기 말로** 한 문장으로 씁니다: 화제 + should / is / matters more than ~\n\n' +
        '좋은 요지 문장은 다음을 피합니다.\n\n' +
        '- **인용된 관점**을 요지로 쓰기 (Some parents argue ~ 를 그대로 옮김)\n' +
        '- **세부 사항**만 쓰기 (예시 하나, 정의 한 줄)\n' +
        '- **지나친 일반화** (always, never, everyone 처럼 글보다 넓게 말하기)\n\n' +
        '> 💡 요지 틀: "Rather than A, we should B." / "A is not about B but about C." / "Although some say A, B is more important."',
      easy: '친구가 "그 글 무슨 내용이야?"라고 물으면 문장 하나로 대답해야 한다고 해 봅시다. "스마트폰을 뺏는 것보다 스스로 조절하는 법을 가르치는 게 낫다는 글이야."\n\n' +
        '이렇게 "무엇에 대해(스마트폰) + 글쓴이는 어떻게 생각한다(조절하는 법을 가르치자)"를 한 번에 말하면 그것이 요지입니다. 다른 사람들의 의견은 빼고 글쓴이의 생각만 남깁니다.',
      check: {
        type: 'choice',
        q: '글 A의 요지를 가장 잘 나타낸 한 문장은 무엇입니까?\n\n' + PHONE,
        choices: [
          'Rather than taking phones away, we should teach teenagers to control their own phone use.',
          'Teenagers should not have smartphones until they are sixteen years old.',
          'Phones help teenagers stay in touch with their families.',
        ],
        answer: 0,
        why: ['', '일부 부모의 주장(Some parents argue ~)입니다. 글쓴이는 이 생각에 동의하지 않습니다.', '다른 사람들이 든 근거 하나일 뿐, 글쓴이의 관점이 빠졌습니다.'],
        explain: '화제(청소년의 스마트폰)와 글쓴이의 관점(**In my view**, 휴대 전화를 빼앗기보다 스스로 한계를 정하는 법을 가르치자)을 함께 담은 첫 번째가 요지입니다.',
      },
    },
  ],

  examples: [
    {
      q: '글 A에 나온 관점들을 정리하고, 글쓴이의 관점을 찾아보십시오.\n\n' + PHONE,
      steps: [
        '인용 표현을 찾습니다: **Some parents argue**, **They claim**(= 그 부모들), **Others point out**. 모두 다른 사람의 관점입니다.',
        '관점 1(일부 부모): 16세 전에는 스마트폰을 주지 말자. 근거: 공부에 방해되고 얼굴을 보며 나누는 대화가 줄어든다.',
        '관점 2(다른 사람들): 스마트폰은 쓸모가 있다. 근거: 가족과 연락하고 정보를 빨리 찾을 수 있다.',
        '글쓴이의 표현을 찾습니다: **In my view, the real question is not A but B.** — 두 관점 모두와 다른 절충의 관점입니다.',
        '글쓴이의 관점: 가질지 말지가 아니라 어떻게 쓰느냐가 문제이며, 스스로 한계를 정하도록 가르치는 것이 낫다.',
      ],
      answer: '요지: The key issue is not whether teenagers have phones but how they use them, so we should teach them to set their own limits.',
    },
    {
      q: '글 C에서 개념어 norm과 bias의 뜻을 문맥으로 확인하고, 글쓴이가 권하는 태도를 찾아보십시오.\n\n' + NORMS,
      steps: [
        '첫 문장의 동격 표현이 뜻을 알려 줍니다: norms = **unwritten rules about how people should behave**(사람들이 어떻게 행동해야 하는지에 대한 쓰이지 않은 규칙).',
        '신발을 벗는 곳과 신고 들어가는 곳의 예가 규범이 문화마다 다르다는 것을 보여 줍니다.',
        '**This kind of bias**에서 This kind는 바로 앞 문장(자기 문화의 규범으로만 판단하는 것)을 가리킵니다. 그래서 bias는 "자기 기준으로 치우쳐 판단하는 편견"입니다.',
        '마지막 문장의 **we should ~**가 글쓴이가 권하는 태도입니다: 낯선 관습을 만나면 먼저 그것이 그 사람들에게 왜 자연스러운지 물어보자.',
      ],
      answer: '글쓴이는 자기 문화의 규범으로만 판단하는 편견을 버리고, 낯선 관습을 그 문화의 관점에서 먼저 이해하자고 권합니다.',
    },
  ],

  terms: [
    { term: '관점 (perspective)', def: '어떤 대상이나 문제를 바라보는 시각입니다. 같은 일도 관점에 따라 다르게 보입니다.' },
    { term: '편견 (bias)', def: '근거 없이 한쪽으로 치우친 생각이나 판단입니다. 예: 한 가지 영어만 올바르다고 여기는 것' },
    { term: '규범 (norm)', def: '한 사회가 당연하게 여기는, 쓰이지 않은 행동 규칙입니다. 예: 줄 서서 기다리기' },
    { term: '공감 (empathy)', def: '다른 사람의 처지에서 그 감정을 이해하고 함께 느끼는 능력입니다. 동정(sympathy)과 구별합니다.' },
    { term: '고정관념 (stereotype)', def: '한 집단의 사람들을 모두 같은 모습일 것이라고 단정하는 생각입니다.' },
    { term: '인용된 관점', def: '글쓴이가 아닌 다른 사람의 생각을 글쓴이가 소개한 것입니다. 신호: Some argue, According to, Critics claim' },
    { term: '절충', def: '서로 다른 입장의 좋은 점을 살려 가운데에서 해결책을 찾는 것입니다. 신호: Both sides have a point, but ~' },
    { term: '변이형 (variety)', def: '한 언어가 지역이나 집단에 따라 조금씩 다르게 쓰이는 형태입니다. 영국 영어, 인도 영어, 싱가포르 영어 등이 모두 영어의 변이형입니다.' },
    { term: '요지', def: '글쓴이가 글 전체에서 말하고자 하는 핵심 생각입니다. 여러 관점이 나오는 글에서는 글쓴이 자신의 관점입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 뜻풀이에 알맞은 낱말은 무엇입니까?\n\nan unfair preference for or against someone or something, often without a good reason',
      choices: ['bias', 'empathy', 'norm', 'perspective'],
      answer: 0,
      why: [
        '',
        'empathy는 남의 감정을 이해하고 함께 느끼는 능력입니다. 불공정한 치우침과 반대에 가깝습니다.',
        'norm은 사회가 당연하게 여기는 행동 규칙입니다.',
        'perspective는 보는 시각, 관점입니다. 관점 자체가 불공정하다는 뜻은 없습니다.',
      ],
      explain: '**unfair preference**(불공정한 치우침), **without a good reason**(타당한 이유 없이)이 핵심입니다. 이런 치우친 생각이 **bias**(편견)입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (e로 시작합니다.)\n\nA good doctor shows [[빈칸]] by trying to understand how worried the patient feels.',
      answer: ['empathy'],
      wrong: [
        { a: 'sympathy', why: 'sympathy는 상대를 안타깝게 여기는 마음(동정)입니다. 상대가 느끼는 감정을 이해하려 애쓰는 것은 empathy이고, 첫 글자도 e입니다.' },
        { a: 'emotion', why: 'emotion은 감정 그 자체입니다. 남의 감정을 이해하는 능력을 가리키는 말이 필요합니다.' },
      ],
      explain: '환자가 얼마나 걱정하는지 이해하려 애쓰는 것은 상대의 처지에서 감정을 이해하는 **empathy**(공감)입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '글 A에서 "phones distract students from studying"은 누구의 생각입니까?\n\n' + PHONE,
      choices: ['일부 부모들', '글쓴이', '휴대 전화를 쓰는 청소년들', '정보를 찾는 전문가들'],
      answer: 0,
      why: [
        '',
        '글쓴이의 관점은 In my view 뒤에 나옵니다. 이 문장은 They claim ~ 으로 남의 주장을 전한 것입니다.',
        '청소년들이 직접 한 말은 글에 나오지 않습니다.',
        '전문가는 글에 나오지 않습니다.',
      ],
      explain: '**They claim that phones distract students ~**의 They는 앞 문장의 **Some parents**를 가리킵니다. 그래서 이것은 일부 부모들의 생각을 인용한 것입니다.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'According to ~ 로 시작하는 문장은 언제나 글쓴이가 반대하는 의견이다.',
      answer: false,
      explain: '글쓴이는 다른 사람의 말을 반박하려고 인용하기도 하지만, **자기 주장의 근거로 빌려 와 동의**하기도 합니다. 인용 뒤에 I find this convincing(동의)인지, However, this ignores ~(반대)인지 확인해야 합니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '글 B에서 글쓴이는 "공감은 연습으로 기를 수 있다"는 생각에 대해 어떤 태도를 보입니까?\n\n' + EMPATHY,
      choices: ['그 생각에 동의하며 반긴다.', '그 생각을 근거가 없다며 반박한다.', '그 생각과 반대되는 생각을 함께 받아들여 절충한다.', '어떤 태도도 드러내지 않는다.'],
      answer: 0,
      why: [
        '',
        '글쓴이는 반박하지 않았습니다. 반박했다면 However, this view ignores ~ 같은 표현이 나왔을 것입니다.',
        '공감을 타고난다는 생각은 글쓴이가 받아들이지 않았습니다. However 뒤에 그와 다른 생각을 소개했습니다.',
        '마지막 문장 I find this idea encouraging에서 태도가 분명히 드러납니다.',
      ],
      explain: '**I find this idea encouraging, because it means that anyone can learn to be more understanding.** — 글쓴이는 심리학자들의 생각에 동의하고 반깁니다. 인용된 관점에 글쓴이가 동의하는 경우입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '두 입장을 나란히 소개하는 표현으로 **알맞지 않은** 것은 무엇입니까?',
      choices: [
        'As a result, ~',
        'On the one hand, ~ On the other hand, ~',
        'While some people ~, others ~',
        'Supporters say ~, but opponents argue ~',
      ],
      answer: 0,
      why: [
        '',
        '"한편으로는 ~, 다른 한편으로는 ~"이라는 뜻으로 두 입장을 나란히 놓는 표현입니다.',
        '"어떤 사람들은 ~하는 반면, 다른 사람들은 ~"이라는 뜻으로 두 입장을 대비합니다.',
        '찬성하는 쪽과 반대하는 쪽의 입장을 나란히 소개합니다.',
      ],
      explain: '**As a result**는 앞 내용의 결과를 이끄는 표현입니다. 두 입장을 나란히 놓는 표현이 아닙니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '글 D에 따르면, 미국에서 흔히 apartment라고 부르는 것을 영국에서는 흔히 무엇이라고 합니까?\n\n' + ENGLISHES,
      choices: ['flat', 'lift', 'holiday', 'accent'],
      answer: 0,
      why: [
        '',
        'lift는 승강기(elevator)를 가리키는 영국 영어입니다. 글에는 나오지 않습니다.',
        'holiday는 휴가(vacation)를 가리키는 영국 영어입니다. 글에는 나오지 않습니다.',
        'accent는 말투(억양)라는 뜻입니다. 집을 가리키는 말이 아닙니다.',
      ],
      explain: '**what most Americans call an "apartment" is usually called a "flat" in Britain.** 같은 것을 다르게 부를 뿐, 어느 쪽도 틀린 영어가 아닙니다.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 3,
      q: '어떤 문화에서는 "That might be a little difficult."라는 말이 정중한 거절의 뜻으로 쓰일 수 있다.',
      answer: true,
      explain: '생각을 **간접적으로** 표현하는 것을 예의로 여기는 문화에서는 "조금 어려울 것 같다"는 말이 사실상 "안 된다"는 뜻일 수 있습니다. 그래서 다른 문화의 사람과 이야기할 때는 뜻이 애매하면 정중하게 다시 확인하는 것이 좋습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '글 B의 요지를 가장 잘 나타낸 한 문장은 무엇입니까?\n\n' + EMPATHY,
      choices: [
        'Empathy is not fixed at birth; it can grow through practice.',
        'Empathy refers to the ability to understand and share the feelings of another person.',
        'Some people are born with empathy, and others can never learn it.',
        'Listening carefully is the only way to become a kind person.',
      ],
      answer: 0,
      why: [
        '',
        '첫 문장의 정의일 뿐입니다. 글쓴이가 공감에 대해 무엇을 말하려는지(기를 수 있다)가 빠졌습니다.',
        '글쓴이가 받아들이지 않은 관점(Some people think ~)입니다.',
        '"유일한 방법"은 지나친 일반화입니다. 글은 주의 깊게 듣기를 여러 방법 가운데 하나(such as ~)로 들었습니다.',
      ],
      hint: '화제(공감) + 글쓴이가 동의한 관점을 한 문장에 담은 것을 찾으십시오.',
      explain: '화제는 empathy이고, 글쓴이는 However 뒤의 관점(연습으로 기를 수 있다)에 동의합니다. 이 둘을 담은 첫 번째가 요지입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 0,
      q: '다음 글에서 밑줄 친 This kind of bias가 가리키는 것으로 가장 알맞은 것은 무엇입니까?\n\nEvery society has norms, unwritten rules about how people should behave. In some places, people take off their shoes before entering a home; in others, they keep them on. A visitor who judges these customs only by the norms of his or her own culture may see them as strange or even wrong. __This kind of bias__ makes it hard to learn from others.',
      choices: [
        '다른 문화의 관습을 자기 문화의 규범으로만 판단하는 것',
        '집에 들어갈 때 신발을 벗는 관습',
        '모든 사회에 쓰이지 않은 규칙이 있다는 것',
        '다른 문화의 관습을 무조건 따라야 한다고 생각하는 것',
      ],
      answer: 0,
      why: [
        '',
        '신발을 벗는 것은 규범의 예일 뿐, 편견이 아닙니다.',
        '첫 문장의 사실 설명입니다. 치우친 판단이 아닙니다.',
        '글에 나오지 않는 생각입니다. 글이 문제 삼은 것은 남의 관습을 따르지 않는 것이 아니라, 자기 문화의 규범으로만 판단하는 것입니다.',
      ],
      hint: 'This kind는 대개 바로 앞 문장의 내용을 가리킵니다.',
      explain: '**This kind of bias**는 바로 앞 문장, 곧 방문자가 낯선 관습을 **자기 문화의 규범으로만** 판단해 이상하거나 틀렸다고 보는 것을 가리킵니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (n으로 시작합니다.)\n\nIn many countries, giving up your seat to an older person on the bus is a social [[빈칸]]. No law requires it, but most people expect it.',
      answer: ['norm'],
      wrong: [
        { a: 'norms', why: '앞에 a social이 있으므로 단수 norm으로 씁니다.' },
        { a: 'rule', why: '뜻은 비슷하지만 첫 글자가 n인 낱말을 찾아야 합니다. 법이 아니어도 사람들이 당연하게 여기는 규칙은 norm입니다.' },
      ],
      explain: '법(law)으로 정해지지 않았지만 대부분의 사람이 당연하게 기대하는 행동 규칙이 **norm**(규범)입니다. 앞에 a social이 있으므로 단수형입니다.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 2,
      q: '쟁점 소개 → 한 입장 → 다른 입장 → 글쓴이의 관점 순서가 되도록 배열하십시오.',
      choices: [
        'Should every student be required to wear a school uniform?',
        'Supporters say that uniforms reduce pressure to wear expensive clothes.',
        'On the other hand, opponents argue that uniforms limit self-expression.',
        'In my opinion, a simple dress code could satisfy both sides.',
      ],
      answer: [0, 1, 2, 3],
      hint: '질문으로 쟁점을 소개하고, 글쓴이의 관점은 마지막에 둡니다.',
      explain: '쟁점(교복을 꼭 입어야 하는가?) → 찬성 측(**Supporters say**: 비싼 옷에 대한 부담이 줄어든다) → 반대 측(**On the other hand, opponents argue**: 자기표현을 막는다) → 글쓴이의 절충 관점(**In my opinion**, 간단한 복장 규정이면 양쪽을 모두 만족시킬 수 있다).',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '다음 글에서 글쓴이의 관점으로 가장 알맞은 것은 무엇입니까?\n\nSome educators argue that students should be protected from failure because it hurts their confidence. Others insist that failure is always good for students. Both sides make a fair point, but each goes too far. Failure helps us learn only when someone helps us understand what went wrong. Without that support, it can simply discourage us.',
      choices: [
        '실패는 무엇이 잘못되었는지 이해하도록 도움을 받을 때 배움이 된다.',
        '학생은 자신감을 지키기 위해 실패로부터 보호받아야 한다.',
        '실패는 어떤 경우에도 학생에게 좋은 경험이다.',
        '실패는 언제나 학생을 낙담하게 하므로 될 수 있는 한 피하게 해야 한다.',
      ],
      answer: 0,
      why: [
        '',
        '첫 번째 인용된 관점(Some educators argue ~)입니다. 글쓴이는 이 관점이 지나치다고 했습니다.',
        '두 번째 인용된 관점(Others insist ~)입니다. 글쓴이는 이 관점도 지나치다고 했습니다.',
        '글쓴이는 도움이 없을 때만 낙담할 수 있다고 했습니다. "언제나"는 글보다 넓게 말한 것입니다.',
      ],
      hint: 'Both sides make a fair point, but ~ 뒤에서 글쓴이가 두 관점을 어떻게 정리하는지 보십시오.',
      explain: '두 관점(보호해야 한다 / 언제나 좋다)을 소개한 뒤 **Both sides make a fair point, but each goes too far.**로 절충합니다. 글쓴이의 관점은 그 뒤 문장: 실패는 무엇이 잘못되었는지 이해하도록 도움을 받을 때만 배움이 된다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '글 D의 요지를 가장 잘 나타낸 한 문장은 무엇입니까?\n\n' + ENGLISHES,
      choices: [
        'English has many valid varieties, so we should listen for meaning rather than judge accents.',
        'British English is the only correct form of English, so learners should copy it.',
        'Americans and the British often use different words for the same things, such as "apartment" and "flat."',
        'English is spoken in many countries because it is the easiest language to learn.',
      ],
      answer: 0,
      why: [
        '',
        '글쓴이가 비판한 관점(only one kind of English is "correct")과 같은 생각입니다.',
        '요지를 뒷받침하는 예시(For example ~)일 뿐입니다.',
        '영어가 가장 배우기 쉽다는 말은 글에 없습니다.',
      ],
      hint: 'However 뒤의 글쓴이의 판단과 마지막 문장의 권고를 함께 담은 것을 찾으십시오.',
      explain: '화제(여러 나라의 영어) + 글쓴이의 관점(**these varieties are all valid**, 말투를 판단하기보다 뜻에 귀 기울이자)을 담은 첫 번째가 요지입니다. 셋째 보기는 예시라서 요지가 될 수 없습니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', fixed: true, concept: 2,
      q: '다음 글을 표로 정리했습니다. 글의 내용과 **맞지 않는** 줄은 무엇입니까?\n\nThe town council is debating how to use an empty lot downtown. Store owners want a parking lot, because they believe more customers will come if parking is easy. Many parents, on the other hand, want a small park where children can play safely. Some environmental groups support the park as well, pointing out that trees would make the area cooler in summer.\n\n| 줄 | 주차장 | 공원 |\n|---|---|---|\n| (가) 지지하는 사람 | 가게 주인들 | 부모들, 환경 단체 |\n| (나) 근거 | 아이들이 안전하게 놀 수 있다 | 손님이 더 많이 올 것이다 |\n| (다) 덧붙은 근거 | 없음 | 나무가 여름에 동네를 시원하게 한다 |\n| (라) 글쓴이의 입장 | 드러나지 않음 | 드러나지 않음 |',
      choices: ['(가)', '(나)', '(다)', '(라)'],
      answer: 1,
      why: [
        '가게 주인들은 주차장을, 부모들과 환경 단체는 공원을 원하므로 맞습니다.',
        '',
        '환경 단체가 덧붙인 근거(trees would make the area cooler in summer)이므로 맞습니다.',
        '글쓴이는 양쪽 입장을 전하기만 하고 자기 입장을 밝히지 않았으므로 맞습니다.',
      ],
      hint: '입장마다 근거를 짝지어 다시 맞춰 보십시오.',
      explain: '주차장의 근거는 "손님이 더 많이 올 것이다"(more customers will come), 공원의 근거는 "아이들이 안전하게 놀 수 있다"(children can play safely)입니다. (나)는 두 근거를 뒤바꿔 적었습니다. 이 글처럼 글쓴이의 입장이 드러나지 않는 글도 있습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '다음 글이 주는 교훈으로 가장 알맞은 것은 무엇입니까?\n\nAt a meeting, Jia asked her teammate Leo whether he could finish the report by Friday. Leo said, "Hmm, that could be a bit tight." Jia thought he had agreed, so she was surprised when the report was not ready. Later, she learned that in Leo\'s way of speaking, "a bit tight" was a polite way of saying "no."',
      choices: [
        '말하는 방식은 사람과 문화에 따라 다르므로, 뜻이 애매하면 정중하게 확인하는 것이 좋다.',
        '간접적으로 말하는 사람은 거짓말을 하는 것이므로 믿지 않는 것이 좋다.',
        '보고서는 누가 맡든 반드시 금요일까지 끝내야 한다.',
        '생각을 직접적으로 말하는 방식만이 올바른 소통 방식이다.',
      ],
      answer: 0,
      why: [
        '',
        'Leo는 거짓말을 한 것이 아니라 정중하게 거절한 것입니다. 소통 방식이 다른 것을 나쁘게 판단하는 편견입니다.',
        '마감일은 이야기의 배경일 뿐, 글이 주는 교훈이 아닙니다.',
        '한 가지 소통 방식만 옳다고 보는 것은 편견입니다. 글은 서로 다른 방식이 있음을 보여 줍니다.',
      ],
      hint: '지아가 무엇을 오해했고, 그 오해가 왜 생겼는지 생각해 보십시오.',
      explain: 'Leo의 "a bit tight"는 그의 말하는 방식에서 **정중한 거절**이었는데, 지아는 이것을 동의로 받아들였습니다. 소통 방식은 사람과 문화마다 다르므로 어느 쪽이 옳다고 판단하기보다, 애매할 때 "Do you mean you can\'t finish it by Friday?"처럼 정중하게 확인하는 것이 좋습니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nTwo people described the same accident very differently. One was standing on the corner, and the other was sitting inside a bus. Neither was lying; they simply saw the event from different [[빈칸]].',
      choices: ['perspectives', 'norms', 'biases', 'stereotypes'],
      answer: 0,
      why: [
        '',
        'norms는 사회의 행동 규칙입니다. 서 있던 자리와 상관이 없습니다.',
        '두 사람이 거짓말을 하지 않았고 치우친 생각 때문이 아니라 서 있던 자리가 달랐을 뿐입니다. 편견(bias)을 고르면 글의 뜻과 어긋납니다.',
        'stereotypes는 한 집단에 대한 고정관념입니다. 사고를 본 위치와 상관이 없습니다.',
      ],
      hint: '두 사람의 차이를 만든 것은 "어디에서 보았는가"입니다.',
      explain: '한 사람은 길모퉁이에서, 다른 사람은 버스 안에서 보았습니다. 같은 일을 서로 다른 **perspectives**(관점, 보는 자리)에서 본 것입니다. Neither was lying이 편견이나 거짓이 아님을 분명히 해 줍니다.',
    },
  ],

  deeper: [
    {
      title: '인용 동사에 숨은 글쓴이의 태도',
      body: '글쓴이가 다른 사람의 말을 전할 때 고르는 동사에는 이미 태도가 묻어 있습니다.\n\n' +
        '| 동사 | 글쓴이의 느낌 |\n|---|---|\n' +
        '| show, prove, demonstrate | 사실로 받아들임 (동의 쪽) |\n' +
        '| point out, note, explain | 대체로 중립이거나 타당하다고 봄 |\n' +
        '| argue, suggest | 중립. 하나의 주장으로 소개 |\n' +
        '| claim, insist | 거리를 둠. 뒤에서 반박할 가능성이 큼 |\n\n' +
        '예를 들어 "Some people **claim** that ~"은 "~라고 주장하지만 (나는 글쎄)"라는 뉘앙스를 풍기는 경우가 많고, "Studies **show** that ~"은 글쓴이가 그 내용을 근거로 삼는 경우가 많습니다. 다만 이것은 경향일 뿐이므로, 최종 판단은 뒤에 이어지는 태도 표현으로 합니다.',
    },
    {
      title: '모국어가 아닌 언어로서의 영어',
      body: '여러 추정에 따르면 오늘날 영어를 쓰는 사람 가운데에는 영어를 **모국어가 아닌 언어로** 쓰는 사람이 모국어로 쓰는 사람보다 많습니다. 서로 모국어가 다른 사람들이 소통하려고 함께 쓰는 언어를 **공통어(lingua franca)**라고 합니다.\n\n' +
        '공통어로 영어를 쓸 때 중요한 것은 원어민처럼 들리는 것보다 **서로 알아듣는 것**입니다. 그래서 국제적인 자리에서는 지나치게 어려운 관용어나 빠른 말을 피하고, 상대의 말투가 낯설어도 뜻을 먼저 헤아리는 태도가 존중받습니다.\n\n' +
        '여러분이 쓰는 영어도 세계의 다양한 영어 가운데 하나입니다. 말투를 부끄러워하기보다 뜻을 정확하게 전하는 데 힘을 쏟으십시오.',
    },
  ],

  faq: [
    {
      q: '글쓴이 관점이랑 인용된 관점이 같으면 어떻게 구별해요?',
      a: '글쓴이가 인용된 관점에 동의하는 경우입니다. 이때는 둘을 구별할 필요 없이 그 관점이 곧 글쓴이의 관점이 됩니다. 다만 I find this convincing, This makes sense 같은 동의 표현이 실제로 있는지 확인해야 합니다. 동의 표현 없이 인용만 했다면 뒤에 반박이 이어지는지 끝까지 읽어 보십시오.',
    },
    {
      q: '영국 영어랑 미국 영어 중에 어느 걸 배워야 하나요?',
      a: '어느 쪽도 "더 올바른" 영어는 아니므로 하나를 골라 꾸준히 익히면 됩니다. 중요한 것은 한 글 안에서 철자(color/colour)를 섞지 않는 것과, 다른 변이형을 들었을 때 알아듣는 것입니다. 여러 나라 사람의 영어를 자주 들어 보면 이해의 폭이 넓어집니다.',
    },
    {
      q: '요지를 쓸 때 글에 나온 문장을 그대로 옮겨도 되나요?',
      a: '글쓴이의 관점이 한 문장에 잘 담겨 있다면 그 문장을 바탕으로 써도 됩니다. 하지만 그 문장이 예시나 정의만 담고 있다면 화제와 관점을 모아 자기 말로 다시 써야 합니다. 요지 문장은 "무엇에 대해 + 글쓴이는 어떻게 생각한다"가 모두 드러나야 합니다.',
    },
  ],

  mistakes: [
    'Some people argue ~ 처럼 인용된 관점을 글쓴이의 관점으로 착각하는 실수 — In my view, I believe 같은 글쓴이의 표현을 찾아 확인합니다.',
    '인용이 나오면 무조건 글쓴이가 반대한다고 단정하는 실수 — 동의(I find this convincing)인지 반대(However, this ignores ~)인지 뒤의 태도 표현으로 판단합니다.',
    '다른 문화의 말투나 관습을 내 문화의 규범으로만 판단하는 실수 — 그 사람들에게 왜 자연스러운지를 먼저 생각합니다.',
  ],

  gens: [
    {
      id: 'whose-view',
      level: 1,
      title: '누구의 관점인지 구별하기',
      make: function (R) {
        var WRITER = '글쓴이 자신의 관점';
        var OTHER = '글쓴이가 소개한 다른 사람의 관점';
        var FACT = '관점이 아닌 사실 정보';
        var items = [
          { s: 'Critics argue that homework should be banned in elementary schools.', a: OTHER, c: 1,
            why: '**Critics argue that ~**은 비판하는 사람들의 주장을 전하는 인용 표현입니다.' },
          { s: 'In my view, homework should be short and meaningful.', a: WRITER, c: 1,
            why: '**In my view**는 글쓴이가 자기 생각을 밝히는 신호입니다.' },
          { s: 'The survey was answered by 300 students in two schools.', a: FACT, c: 1,
            why: '설문에 답한 학생 수를 알려 주는 사실 정보입니다. 누군가의 생각이나 판단이 담겨 있지 않습니다.' },
          { s: 'According to some psychologists, people trust faces that look familiar.', a: OTHER, c: 1,
            why: '**According to some psychologists**는 심리학자들의 생각을 전하는 인용 표현입니다.' },
          { s: 'I believe that we should listen to young people more carefully.', a: WRITER, c: 1,
            why: '**I believe**는 글쓴이 자신의 생각을 밝히는 표현입니다.' },
          { s: 'Others point out that online classes save travel time.', a: OTHER, c: 2,
            why: '**Others point out ~**은 다른 사람들의 의견을 소개하는 표현입니다.' },
          { s: 'The real question, it seems to me, is how we use our free time.', a: WRITER, c: 1,
            why: '**it seems to me**(내가 보기에)와 **The real question is ~**는 글쓴이가 자기 관점을 밝히는 표현입니다.' },
          { s: 'Supporters of the plan say that it will reduce traffic.', a: OTHER, c: 2,
            why: '**Supporters of the plan say ~**는 계획을 지지하는 사람들의 입장을 전하는 표현입니다.' },
          { s: 'The new library opened in March and has about 20,000 books.', a: FACT, c: 2,
            why: '도서관이 문을 연 때와 책의 수를 알려 주는 사실 정보입니다.' },
          { s: 'It is often said that money cannot buy happiness.', a: OTHER, c: 1,
            why: '**It is often said that ~**(흔히 ~라고들 한다)은 널리 퍼진 생각을 전하는 표현입니다. 글쓴이 자신의 판단은 아직 드러나지 않았습니다.' },
          { s: 'What this view overlooks, I would argue, is the role of good teachers.', a: WRITER, c: 1,
            why: '**I would argue**와 **What this view overlooks is ~**는 글쓴이가 앞의 관점을 비판하며 자기 생각을 밝히는 표현입니다.' },
          { s: 'Many experts suggest that adults need seven to nine hours of sleep.', a: OTHER, c: 1,
            why: '**Many experts suggest ~**는 전문가들의 의견을 빌려 전하는 표현입니다.' },
        ];
        var it = R.pick(items);
        var all = [WRITER, OTHER, FACT];
        var wrongs = all.filter(function (x) { return x !== it.a; });
        var pick = R.choices(it.a, wrongs, 3);
        var reason = {};
        reason[WRITER] = '글쓴이 자신의 관점이라면 In my view, I believe 같은 표현이 있어야 합니다.';
        reason[OTHER] = '다른 사람의 관점이라면 Some argue, According to 같은 인용 표현이 있어야 합니다.';
        reason[FACT] = '이 문장에는 누군가의 생각·주장이 담겨 있습니다. 확인할 수 있는 사실만 전하는 문장이 아닙니다.';
        return {
          type: 'choice', concept: it.c,
          q: '다음 문장이 담고 있는 것은 무엇입니까?\n\n' + it.s,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === it.a ? '' : reason[x]; }),
          explain: it.why,
        };
      },
    },
  ],

  vocab: [
    { w: 'perspective', m: '관점, 시각', ex: 'Traveling gave me a new perspective on my own country.', exm: '여행은 내 나라를 보는 새로운 시각을 주었습니다.' },
    { w: 'bias', m: '편견, 치우침', ex: 'A fair judge must not show any bias.', exm: '공정한 판사는 어떤 편견도 보여서는 안 됩니다.' },
    { w: 'norm', m: '규범, 기준', ex: 'Shaking hands is a common norm when people meet.', exm: '악수는 사람들이 만날 때 흔한 규범입니다.' },
    { w: 'empathy', m: '공감', ex: 'Reading stories can help children develop empathy.', exm: '이야기를 읽는 것은 아이들이 공감 능력을 기르는 데 도움이 될 수 있습니다.' },
    { w: 'stereotype', m: '고정관념', ex: 'The movie breaks the stereotype that scientists are boring.', exm: '그 영화는 과학자가 따분하다는 고정관념을 깹니다.' },
    { w: 'argue', m: '주장하다; 다투다', ex: 'Some people argue that tests are not the best way to measure learning.', exm: '어떤 사람들은 시험이 배움을 재는 가장 좋은 방법이 아니라고 주장합니다.' },
    { w: 'claim', m: '(사실이라고) 주장하다; 주장', ex: 'He claims that he saw a strange light in the sky.', exm: '그는 하늘에서 이상한 빛을 보았다고 주장합니다.' },
    { w: 'point out', m: '지적하다', ex: 'My friend pointed out a mistake in my essay.', exm: '친구가 내 글의 실수 하나를 지적해 주었습니다.' },
    { w: 'critic', m: '비판하는 사람, 비평가', ex: 'Critics say the new rule is unfair to small shops.', exm: '비판하는 사람들은 새 규칙이 작은 가게에 불공정하다고 말합니다.' },
    { w: 'opponent', m: '반대자, 상대', ex: 'Opponents of the plan held a meeting.', exm: '그 계획에 반대하는 사람들이 모임을 열었습니다.' },
    { w: 'custom', m: '관습, 풍습', ex: 'Bowing is a custom in many Asian countries.', exm: '고개나 허리를 숙여 인사하는 것은 여러 아시아 나라의 관습입니다.' },
    { w: 'variety', m: '변이형; 다양성', ex: 'Singapore English is one variety of English.', exm: '싱가포르 영어는 영어의 한 변이형입니다.' },
    { w: 'accent', m: '말투, 억양', ex: 'She speaks English with a slight accent.', exm: '그녀는 약간의 억양이 있는 영어를 씁니다.' },
    { w: 'valid', m: '타당한, 유효한', ex: 'You made a valid point in the discussion.', exm: '토론에서 타당한 지적을 하셨습니다.' },
    { w: 'indirect', m: '간접적인', ex: 'Her answer was polite but indirect.', exm: '그녀의 대답은 정중했지만 간접적이었습니다.' },
    { w: 'respect', m: '존중하다; 존중', ex: 'We should respect opinions that differ from ours.', exm: '우리는 우리와 다른 의견을 존중해야 합니다.' },
  ],
});
})();
