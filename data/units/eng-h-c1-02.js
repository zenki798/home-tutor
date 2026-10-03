/* 공통영어1 · 주제와 요지 파악하기
 * 지문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 역접 뒤에 요지가 오는 글 (직접 쓴 글)
  var SLEEP = "Many students believe that staying up late to study will help them get better grades. However, sleep plays a key role in learning. While we sleep, the brain sorts and stores what we learned during the day. Students who get enough rest usually remember new information better than those who do not. So if you want to do well on a test, a good night's sleep may help you more than an extra hour of studying.";
  // 주제문이 처음에 오는 글
  var WALK = 'Walking is one of the easiest ways to stay healthy. You do not need any special equipment or an expensive gym. A pair of comfortable shoes is enough. A short walk after dinner can help your body digest food. Walking with a friend can also lift your mood and reduce stress.';
  // 주제문이 끝에 오는 글
  var PLASTIC = 'In some cafes, customers who bring their own cups get a small discount. Many supermarkets no longer hand out free plastic bags. Some schools have replaced plastic straws with paper ones. These small changes show that people are finding everyday ways to use less plastic.';
  // 주제문이 중간에 오는 글
  var GUITAR = 'When Junho started learning the guitar, his fingers hurt and his chords sounded terrible. He almost gave up after the first week. But mistakes are a natural part of learning any new skill. Each wrong note told him which finger to move and how hard to press. After a few months, he could play his favorite songs without stopping.';
  // 통념 → However → 요지
  var LIBRARY = "People often think of libraries as quiet places where you only borrow books. However, today's libraries are much more than that. Many of them offer free classes in cooking and computer skills. Some have rooms where teenagers can practice music or make videos. In this way, libraries have become community centers where people of all ages can learn and meet.";
  // 처음과 끝에 요지가 되풀이되는 글
  var LISTEN = 'Good listening is just as important as good speaking. When you really listen, the other person feels respected. You also understand the problem better, so you can give more useful advice. Many arguments start simply because one person was not listening. In short, if you want to communicate well, start by opening your ears.';
  // 양보 → 역접 → 요지
  var HANDWRITE = 'It is true that typing is faster than writing by hand. Laptops also make it easy to edit and share notes. Yet students who take notes by hand often understand lectures more deeply. Because they cannot write every word, they have to choose the key points and put them in their own words. This extra thinking helps them learn.';
  // 바꿔 쓴 말이 많은 글
  var TREES = 'City trees do more than make streets look pretty. On hot summer days, they give shade and keep sidewalks cooler. Their leaves catch dust from the air. These green neighbors also give birds a place to live in the middle of a busy town. Planting more of them is a simple way to make cities better places to live.';

Tutor.registerUnit({
  id: 'eng-h-c1-02',
  course: 'eng-h-c1',
  title: '주제와 요지 파악하기',
  summary: '주제문과 반복되는 핵심어를 찾아 글쓴이가 가장 하고 싶은 말을 한 문장으로 정리하는 법을 배웁니다.',
  goals: [
    '글의 주제(무엇에 관한 글인가)와 요지(글쓴이가 하고 싶은 말)를 구별할 수 있다.',
    '글의 처음·중간·끝에서 주제문을 찾을 수 있다.',
    '일반적 진술과 구체적 예시를 구별하고, 역접 연결어 뒤의 핵심을 찾을 수 있다.',
    '반복되는 핵심어와 그것을 바꿔 쓴 말을 모아 글의 주제를 잡을 수 있다.',
  ],
  standards: ['[10공영1-01-02]'],

  concepts: [
    {
      title: '주제와 요지는 어떻게 다른가',
      body: '**주제(topic)**는 "이 글은 **무엇에 관한** 글인가"에 대한 답입니다. 보통 짧은 **명사구**로 나타냅니다.\n\n**요지(main idea)**는 "그래서 글쓴이가 그것에 대해 **무엇을 말하고 싶은가**"에 대한 답입니다. 주제에 글쓴이의 생각이 더해진 **완전한 문장**입니다.\n\n| 구분 | 묻는 것 | 형태 | 예 |\n|---|---|---|---|\n| 주제 | 무엇에 관한 글인가? | 명사구 | the role of sleep in learning |\n| 요지 | 글쓴이가 하고 싶은 말은? | 문장 | Enough sleep helps students learn better. |\n\n같은 주제(sleep)로도 "잠은 학습에 도움이 된다", "잠을 줄이면 건강을 해친다"처럼 요지는 여러 가지가 될 수 있습니다. 그래서 요지를 찾으려면 글쓴이가 주제에 대해 **어느 쪽으로** 말하는지까지 읽어야 합니다.\n\n> 💡 제목(title)은 주제를 짧고 눈에 띄게 표현한 것이라 주제에 가깝습니다.',
      easy: '친구가 "어제 축구 이야기 좀 할게."라고 하면 그것이 **주제**입니다. 이야기를 다 듣고 나서 "그러니까 너는 결국 우리 팀이 수비를 더 연습해야 한다는 거지?"라고 정리한 것이 **요지**입니다.\n\n주제는 이야기의 "재료", 요지는 그 재료로 글쓴이가 "결국 하고 싶은 말"입니다. 주제는 짧은 말 덩어리, 요지는 한 문장이라고 기억하면 쉽습니다.',
      check: {
        type: 'choice',
        q: '다음 중 글의 **요지**를 나타낸 것으로 알맞은 것은 무엇입니까?',
        choices: ['Walking every day is an easy way to stay healthy.', 'the benefits of walking', 'walking and health'],
        answer: 0,
        why: ['', '명사구입니다. "무엇에 관한 글인가"를 나타내는 주제에 해당합니다.', '명사구입니다. 무엇에 관한 글인지만 말할 뿐, 글쓴이의 생각이 들어 있지 않습니다.'],
        explain: '요지는 글쓴이의 생각이 담긴 **문장**입니다. "Walking every day is an easy way to stay healthy."는 걷기에 대해 글쓴이가 하고 싶은 말을 문장으로 나타냈습니다. 나머지 두 개는 명사구로, 주제에 해당합니다.',
      },
    },
    {
      title: '주제문의 자리: 처음·중간·끝',
      body: '**주제문(topic sentence)**은 글의 요지를 직접 드러내는 문장입니다. 영어 글에서는 주제문이 **처음**에 오는 경우가 가장 많지만, 항상 그런 것은 아닙니다.\n\n| 자리 | 짜임 | 읽는 법 |\n|---|---|---|\n| 처음 | 주제문 → 예시·설명 | 첫 문장이 뒤 문장들을 모두 아우르는지 확인 |\n| 끝 | 예시·사례 → 주제문 | 사례들을 모아 정리하는 마지막 문장을 찾기 (So, In short, These ~ show that …) |\n| 중간 | 도입(이야기·통념) → 주제문 → 예시 | But·However 같은 전환 뒤를 주목 |\n| 처음과 끝 | 주제문 → 예시 → 주제문 다시 | 끝 문장이 처음 문장을 다른 말로 되풀이 |\n\n예를 들어 가게·마트·학교의 구체적 사례를 차례로 든 뒤 마지막에 "These small changes show that people are finding everyday ways to use less plastic."이라고 정리한다면, 주제문은 **끝**에 있습니다.\n\n> ⚠️ 첫 문장이 늘 주제문이라고 단정하지 마십시오. 첫 문장이 일화(이야기)나 사람들의 통념이면, 주제문은 그 뒤에 나옵니다.',
      easy: '주제문은 글의 "우산"이라고 생각해 보십시오. 우산 아래에 다른 문장(예시·설명)들이 모두 들어갑니다.\n\n우산을 먼저 펴고 예시를 넣을 수도 있고(처음), 예시를 다 늘어놓은 뒤 마지막에 우산을 씌울 수도 있습니다(끝). 어디에 있든, 다른 문장들을 **모두 덮을 수 있는 문장**이 주제문입니다.',
      check: {
        type: 'ox',
        q: '영어 글에서 주제문은 언제나 첫 문장이다.',
        answer: false,
        explain: '주제문은 처음에 오는 경우가 많지만, 사례를 먼저 들고 **끝**에서 정리하거나, 이야기·통념으로 시작한 뒤 **중간**에 오기도 합니다. 다른 문장들을 모두 아우르는 문장을 찾아야 합니다.',
      },
    },
    {
      title: '일반적 진술과 구체적 예시 구별하기',
      body: '글의 문장은 크게 두 종류입니다.\n\n- **일반적 진술(general statement)**: 넓은 범위를 한꺼번에 말하는 문장. 주제문은 대개 일반적 진술입니다.\n- **구체적 예시·세부 사항(specific detail)**: 특정한 사람·장소·숫자·사례를 들어 일반적 진술을 뒷받침하는 문장.\n\n| 일반적 진술 | 구체적 예시 |\n|---|---|\n| Walking is an easy way to stay healthy. | A short walk after dinner can help your body digest food. |\n| Libraries offer many services. | Some have rooms where teenagers can make videos. |\n\n구체적 예시에는 **For example, For instance, such as, Some ~, Others ~** 같은 표지나 **이름·숫자·특정 장소**가 자주 붙어 있습니다.\n\n> 💡 어떤 문장이 다른 문장들의 "예"가 될 수 있으면 그것은 예시이고, 다른 문장들을 "예"로 거느릴 수 있으면 그것이 일반적 진술입니다.',
      easy: '"과일은 몸에 좋다."와 "사과에는 식이섬유가 많다."를 비교해 보십시오. 사과는 과일의 한 예일 뿐입니다. "과일은 몸에 좋다."가 더 넓은 말, 곧 **일반적 진술**입니다.\n\n글에서도 "어떤 사람은~", "예를 들어~", 숫자·이름이 나오면 대개 예시입니다. 예시들을 모두 품는 넓은 문장을 찾으면 그것이 주제문 후보가 됩니다.',
      check: {
        type: 'choice',
        q: '다음 중 나머지를 아우르는 **일반적 진술**은 무엇입니까?',
        choices: ['Exercise is good for both the body and the mind.', 'Swimming makes your heart stronger.', 'Jogging in the morning can reduce stress.'],
        answer: 0,
        why: ['', '수영(swimming)이라는 한 가지 운동의 예입니다. 운동 전체를 말하는 문장의 뒷받침이 됩니다.', '아침 조깅(jogging)이라는 한 가지 운동의 예입니다.'],
        explain: 'Swimming과 Jogging은 모두 exercise의 한 예입니다. 그래서 운동 전체가 몸과 마음에 좋다는 **Exercise is good for both the body and the mind.**가 일반적 진술입니다.',
      },
    },
    {
      title: '역접 연결어 뒤의 핵심 찾기',
      body: '글쓴이는 자기 생각을 강조하려고 먼저 **다른 사람들의 생각(통념)**이나 **인정하는 내용**을 꺼낸 뒤, 역접 연결어로 방향을 바꾸는 경우가 많습니다.\n\n- 통념 → 반박: Many people think ~. **However**, ~\n- 양보 → 주장: It is true that ~. **But / Yet** ~\n- 겉보기 → 실제: It may seem that ~. **In fact**, ~\n\n이때 글쓴이가 정말 하고 싶은 말은 **역접 연결어 뒤**에 있습니다. 앞의 내용은 글쓴이가 반대하거나 일부만 인정하는 생각이므로, 그것을 요지로 고르면 정반대의 답이 됩니다.\n\n예: Many students believe that staying up late to study will help them. **However, sleep plays a key role in learning.** → 요지는 "잠이 학습에 중요하다"입니다.\n\n> ⚠️ 역접 연결어가 보이면 무조건 그 문장이 주제문이라는 뜻은 아닙니다. 뒤의 문장들이 그 내용을 뒷받침하는지 꼭 확인하십시오.',
      easy: '"이 식당 비싸다고들 하잖아. **그런데** 양이 많아서 오히려 이득이야."라는 말에서 말하는 사람이 정말 하고 싶은 말은 "그런데" 뒤입니다.\n\n영어의 However, But, Yet도 "그런데, 하지만"과 같은 신호입니다. 이 신호가 보이면 "여기서부터 진짜 하고 싶은 말이 나오겠구나." 하고 속도를 늦춰 읽으십시오.',
      check: {
        type: 'choice',
        q: '다음 글에서 글쓴이가 하고 싶은 말은 무엇입니까?\n\nMany people think that video games are a waste of time. However, some games can actually improve problem-solving skills.',
        choices: ['어떤 게임은 문제 해결 능력을 높일 수 있다.', '비디오 게임은 시간 낭비이다.', '사람들은 게임을 많이 한다.'],
        answer: 0,
        why: ['', 'However 앞에 나온 사람들의 생각(통념)입니다. 글쓴이는 이것에 반대합니다.', '글에 나오지 않는 내용입니다. 글쓴이가 강조하는 것은 However 뒤의 문장입니다.'],
        explain: '"Many people think ~"는 통념이고, **However** 뒤의 "some games can actually improve problem-solving skills"가 글쓴이의 생각입니다.',
      },
    },
    {
      title: '반복되는 핵심어와 바꿔 쓴 말로 주제 잡기',
      body: '글쓴이는 중요한 말을 **여러 번** 씁니다. 다만 영어 글은 같은 낱말을 그대로 되풀이하기보다 **바꿔 쓴 말(paraphrase)**, 대명사, 비슷한 말로 이어 가는 경우가 많습니다.\n\n예: sleep → rest → a good night\'s sleep / city trees → they → these green neighbors\n\n이렇게 같은 대상을 가리키는 말들을 하나로 묶어 보면 글이 무엇에 관한 것인지(주제)가 드러납니다.\n\n주제를 고를 때는 **범위**도 확인합니다.\n\n| 잘못된 주제 | 이유 |\n|---|---|\n| 너무 넓음 | the brain (글은 잠과 학습만 다룸) |\n| 너무 좁음 | how the brain stores information at night (한 문장의 세부 사항) |\n| 알맞음 | the importance of sleep for learning |\n\n> 💡 핵심어 + 글쓴이의 관점(좋다/나쁘다/필요하다)을 이으면 요지 문장이 됩니다.',
      easy: '친구가 이야기하는 동안 "강아지", "우리 집 멍멍이", "걔"라는 말이 계속 나온다면, 친구는 강아지 이야기를 하고 있는 것입니다. 부르는 이름이 달라도 가리키는 것은 하나입니다.\n\n글에서도 같은 것을 가리키는 말에 동그라미를 쳐 보십시오. 동그라미가 가장 많은 것이 주제입니다. 주제는 글 전체를 덮되, 글보다 크지는 않게 고릅니다.',
      check: {
        type: 'choice',
        q: '다음 글에서 these green neighbors가 가리키는 것은 무엇입니까?\n\n' + TREES,
        choices: ['city trees', 'birds', 'sidewalks'],
        answer: 0,
        why: ['', 'birds는 these green neighbors가 사는 곳을 얻는 대상입니다. green(초록)과도 맞지 않습니다.', 'sidewalks는 나무 그늘 덕분에 시원해지는 곳입니다. 이웃처럼 살아 있는 대상이 아닙니다.'],
        explain: '글은 City trees로 시작해 they, Their leaves, **these green neighbors**, them으로 같은 대상을 계속 가리킵니다. 모두 **city trees**를 바꿔 쓴 말입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글의 주제문을 찾고, 요지를 한 문장으로 정리하십시오.\n\n' + LIBRARY,
      steps: [
        '첫 문장 "People often think ~"는 사람들의 통념(도서관은 책만 빌리는 조용한 곳)입니다. 글쓴이의 생각이 아닙니다.',
        '둘째 문장이 **However**로 방향을 바꿉니다: "today\'s libraries are much more than that." 이것이 주제문 후보입니다.',
        '뒤 문장들(무료 요리·컴퓨터 수업, 음악·영상 방)은 "책 빌리기 이상"의 구체적 예시로 주제문을 뒷받침합니다.',
        '마지막 문장은 libraries have become community centers라고 다시 정리합니다. 반복되는 핵심어는 libraries입니다.',
      ],
      answer: '주제문: However, today\'s libraries are much more than that.\n\n요지: 오늘날의 도서관은 책을 빌리는 곳을 넘어 모든 세대가 배우고 만나는 지역 공동체의 중심이 되었다.',
    },
    {
      q: '다음 글의 주제로 알맞은 것을 고르는 과정을 보이십시오.\n\n' + HANDWRITE,
      steps: [
        '"It is true that ~"는 양보(인정)입니다. 타자가 빠르고 편집이 쉽다는 것은 글쓴이가 일단 인정하는 내용입니다.',
        '**Yet** 뒤에서 방향이 바뀝니다: 손으로 필기하는 학생이 강의를 더 깊이 이해한다.',
        '이어지는 문장은 그 이유(모든 말을 받아 적을 수 없어 핵심을 골라 자기 말로 바꾼다)입니다.',
        '그래서 주제는 "손 필기가 학습에 주는 이점"이고, "타자의 장점"은 앞의 양보 부분일 뿐입니다.',
      ],
      answer: '주제: the learning benefits of taking notes by hand',
    },
  ],

  terms: [
    { term: '주제 (topic)', def: '글이 무엇에 관한 것인지를 나타내는 말입니다. 보통 명사구로 씁니다. 예: the role of sleep in learning' },
    { term: '요지 (main idea)', def: '글쓴이가 주제에 대해 가장 하고 싶은 말입니다. 완전한 문장으로 씁니다. 예: Enough sleep helps students learn better.' },
    { term: '주제문 (topic sentence)', def: '글의 요지를 직접 드러내는 문장입니다. 글의 처음·중간·끝 어디에나 올 수 있습니다.' },
    { term: '일반적 진술', def: '넓은 범위를 한꺼번에 말하는 문장입니다. 구체적 예시들을 아우르며, 주제문은 대개 일반적 진술입니다.' },
    { term: '구체적 예시', def: '특정한 사람·사례·숫자를 들어 일반적 진술을 뒷받침하는 문장입니다. For example, such as 같은 표지가 자주 붙습니다.' },
    { term: '역접 연결어', def: 'However, But, Yet처럼 앞 내용과 반대되는 방향으로 글을 바꾸는 말입니다. 뒤에 글쓴이의 핵심 주장이 오는 경우가 많습니다.' },
    { term: '바꿔 쓰기 (paraphrase)', def: '같은 뜻을 다른 낱말·표현으로 나타내는 것입니다. 예: sleep → rest → a good night\'s sleep' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 중 글의 **주제**를 나타낸 것으로 알맞은 것은 무엇입니까?',
      choices: ['the importance of listening in communication', 'Good listening makes people feel respected.', 'You should open your ears to communicate well.', 'Many arguments start because people do not listen.'],
      answer: 0,
      why: ['', '글쓴이의 생각이 담긴 문장입니다. 주제가 아니라 요지나 세부 내용에 가깝습니다.', '글쓴이가 하고 싶은 말을 담은 문장, 곧 요지입니다. 주제는 "무엇에 관한 글인가"를 나타내는 명사구입니다.', '구체적 사실을 말하는 문장입니다. 주제는 명사구로 나타냅니다.'],
      explain: '주제는 "무엇에 관한 글인가"를 나타내는 **명사구**입니다. the importance of listening in communication(의사소통에서 듣기의 중요성)만 명사구이고, 나머지는 모두 글쓴이의 생각이나 세부 내용을 담은 문장입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', fixed: true, concept: 1,
      q: '다음 글에서 주제문은 몇 번째 문장입니까?\n\n' + WALK,
      choices: ['첫째 문장', '둘째 문장', '셋째 문장', '다섯째 문장'],
      answer: 0,
      why: ['', '특별한 장비가 필요 없다는 것은 "쉽다"는 점을 보여 주는 구체적 설명입니다.', '편한 신발 한 켤레면 된다는 세부 내용입니다.', '기분을 좋게 하고 스트레스를 줄인다는 것은 건강해지는 한 가지 예입니다.'],
      explain: '첫 문장 **Walking is one of the easiest ways to stay healthy.**가 글 전체를 아우릅니다. 뒤 문장들은 "쉽다"(장비가 필요 없음, 신발이면 충분)와 "건강"(소화, 기분, 스트레스)을 구체적으로 뒷받침합니다. 주제문이 처음에 오는 짜임입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', fixed: true, concept: 1,
      q: '다음 글에서 주제문의 자리로 알맞은 것은 무엇입니까?\n\n' + PLASTIC,
      choices: ['글의 처음', '글의 중간', '글의 끝', '주제문이 없다'],
      answer: 2,
      why: ['첫 문장은 카페의 할인이라는 한 가지 사례입니다. 마트·학교 사례를 아우르지 못합니다.', '둘째·셋째 문장은 마트와 학교의 사례입니다.', '', '마지막 문장 These small changes show that ~이 사례들을 모아 요지를 직접 말합니다.'],
      explain: '카페·마트·학교의 구체적 사례를 먼저 든 뒤, 마지막 문장 **These small changes show that people are finding everyday ways to use less plastic.**이 그것을 모아 정리합니다. 주제문이 **끝**에 오는 짜임입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '다음 문장들 가운데 나머지 셋을 뒷받침으로 거느리는 **일반적 진술**은 무엇입니까?',
      choices: ['Our town offers many activities for teenagers.', 'The community center has a free dance class on Saturdays.', 'The public library runs a book club every month.', 'A new skate park opened next to the river.'],
      answer: 0,
      why: ['', '토요일 무료 댄스 수업이라는 하나의 구체적 예시입니다.', '매달 열리는 독서 모임이라는 하나의 구체적 예시입니다.', '강가의 새 스케이트장이라는 하나의 구체적 예시입니다.'],
      explain: '댄스 수업, 독서 모임, 스케이트장은 모두 "십 대를 위한 활동"의 예입니다. 그것들을 한꺼번에 말하는 **Our town offers many activities for teenagers.**가 일반적 진술입니다.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 3,
      q: '다음 글의 첫 문장은 글쓴이의 요지를 나타낸다.\n\n' + SLEEP,
      answer: false,
      explain: '첫 문장 "Many students believe that staying up late to study will help them ~"은 학생들의 **통념**입니다. 바로 뒤에 **However**가 나와 "sleep plays a key role in learning"으로 방향을 바꿉니다. 글쓴이의 요지는 However 뒤에 있습니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 4,
      q: '다음 글에서 sleep을 바꿔 쓴 낱말 하나를 찾아 쓰십시오. (r로 시작하는 낱말)\n\n' + SLEEP,
      answer: ['rest'],
      wrong: [{ a: 'remember', why: 'remember는 "기억하다"라는 동사로, 잠을 가리키는 말이 아닙니다. "enough ___"에서 잠을 가리키는 낱말을 찾아보십시오.' }],
      explain: '"Students who get enough **rest**"의 rest(휴식)가 앞의 sleep을 바꿔 쓴 말입니다. 마지막의 a good night\'s sleep도 같은 대상을 가리킵니다. 이렇게 같은 대상을 가리키는 말을 묶으면 주제(잠과 학습)가 보입니다.',
    },
    {
      id: 'p7', level: 2, type: 'choice', concept: 0,
      hint: '반복되는 핵심어(sleep, rest)와 However 뒤의 내용을 함께 보십시오.',
      q: '다음 글의 주제로 가장 알맞은 것은 무엇입니까?\n\n' + SLEEP,
      choices: ['the role of sleep in learning', 'how the human brain works', 'tips for studying late at night', 'reasons why students get bad grades'],
      answer: 0,
      why: ['', '너무 넓은 주제입니다. 글은 뇌 전체가 아니라 잠이 학습에 하는 역할만 다룹니다.', '밤늦게 공부하는 것은 글쓴이가 반박하는 통념입니다. 공부 요령을 알려 주는 글이 아닙니다.', '성적이 나쁜 이유를 분석하는 글이 아닙니다. 글쓴이는 잠이 학습을 돕는다는 점을 말합니다.'],
      explain: 'sleep → rest → a good night\'s sleep이 되풀이되고, However 뒤에 "sleep plays a key role in learning"이 나옵니다. 그래서 주제는 **the role of sleep in learning**(학습에서 잠의 역할)입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      hint: '첫 문장이 누구의 생각인지, However 뒤에 무엇이 오는지 보십시오.',
      q: '다음 글의 요지로 가장 알맞은 것은 무엇입니까?\n\n' + LIBRARY,
      choices: ['오늘날 도서관은 배우고 만나는 지역 공동체의 중심이 되었다.', '도서관은 책을 빌리는 조용한 곳이어야 한다.', '십 대는 도서관에서 음악을 연습해야 한다.', '도서관의 요리 수업은 무료이다.'],
      answer: 0,
      why: ['', 'However 앞의 통념입니다. 글쓴이는 도서관이 그 이상이라고 말합니다.', '음악 연습실은 한 가지 예시일 뿐이고, "~해야 한다"는 주장도 글에 없습니다.', '맞는 내용이지만 하나의 구체적 예시입니다. 요지는 예시들을 아우르는 말입니다.'],
      explain: '첫 문장은 통념이고, **However, today\'s libraries are much more than that.** 뒤로 수업·연습실 같은 예시가 이어집니다. 마지막 문장이 "도서관은 모든 세대가 배우고 만나는 공동체의 중심이 되었다"로 정리합니다. 이것이 요지입니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      hint: '이야기(일화)와 그것에서 끌어낸 교훈을 구별하십시오.',
      q: '다음 글의 주제문으로 가장 알맞은 것은 무엇입니까?\n\n' + GUITAR,
      choices: ['But mistakes are a natural part of learning any new skill.', 'When Junho started learning the guitar, his fingers hurt and his chords sounded terrible.', 'He almost gave up after the first week.', 'After a few months, he could play his favorite songs without stopping.'],
      answer: 0,
      why: ['', '준호 이야기의 시작(일화)입니다. 이 경험에서 끌어낸 일반적인 생각이 주제문입니다.', '일화 속 한 장면입니다.', '이야기의 결과입니다. 결과를 통해 뒷받침하려는 생각이 따로 있습니다.'],
      explain: '준호의 기타 이야기는 구체적 일화이고, 중간의 **But mistakes are a natural part of learning any new skill.**은 "어떤 기술이든" 배울 때 실수는 자연스럽다는 일반적 진술입니다. 뒤 문장들(틀린 음이 가르쳐 준 것, 몇 달 뒤의 결과)이 이를 뒷받침합니다. 주제문이 **중간**에 오는 짜임입니다.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 1,
      hint: '먼저 모든 문장을 아우르는 문장을 찾고, 연결어(First, In addition, In short)를 따라가십시오.',
      q: '주제문이 처음에 오도록 문장을 순서대로 놓으십시오.',
      choices: [
        'Volunteering can benefit the volunteers themselves.',
        'First, it gives them a chance to learn new skills.',
        'In addition, helping others often makes people feel happier.',
        'In short, when you help others, you also help yourself.',
      ],
      answer: [0, 1, 2, 3],
      explain: '주제문(봉사는 봉사하는 사람 자신에게도 이롭다) → First(첫째 이점: 새 기술) → In addition(둘째 이점: 더 행복해짐) → In short(정리) 순서입니다. 마지막 문장은 첫 문장을 다른 말로 되풀이하며 맺습니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      hint: '같은 대상을 가리키는 말(they, these green neighbors, them)을 묶어 보십시오.',
      q: '다음 글의 주제로 가장 알맞은 것은 무엇입니까?\n\n' + TREES,
      choices: ['the benefits of trees in cities', 'birds that live in busy towns', 'how to keep sidewalks clean', 'plants in general'],
      answer: 0,
      why: ['', '너무 좁습니다. 새는 나무가 주는 이점 가운데 한 가지 예입니다.', '먼지를 잡는다는 말은 있지만 인도 청소 방법을 다룬 글이 아닙니다.', '너무 넓습니다. 글은 식물 전체가 아니라 도시의 나무만 다룹니다.'],
      explain: 'City trees → they → Their leaves → these green neighbors → them으로 같은 대상을 계속 가리키며, 그늘·먼지·새의 집이라는 이점을 듭니다. 그래서 주제는 **the benefits of trees in cities**입니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'text', concept: 0,
      hint: '글에서 가장 많이 되풀이되는 활동이 무엇인지 보십시오.',
      q: '다음 글의 요지를 정리한 문장입니다. 빈칸에 알맞은 낱말 하나를 글에서 찾아 쓰십시오.\n\n' + WALK + '\n\n→ **[[blank]]** is a simple and easy way to stay healthy.',
      answer: ['walking'],
      wrong: [{ a: 'walk', why: 'walk는 "걷다"라는 동사(또는 "산책" 한 번)입니다. 문장의 주어 자리에는 동명사 Walking이 와야 하고, 글에서도 Walking으로 씁니다.' }, { a: 'exercise', why: '글에 나오지 않는 말이고, 범위도 넓습니다. 글이 말하는 활동은 걷기 하나입니다.' }],
      explain: '글은 처음부터 끝까지 **Walking**(걷기)이 건강을 지키는 쉬운 방법이라고 말합니다. 그래서 요지는 "Walking is a simple and easy way to stay healthy."입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      hint: '처음 문장과 마지막 문장을 나란히 놓고 비교해 보십시오.',
      q: '다음 글에 대한 설명으로 가장 알맞은 것은 무엇입니까?\n\n' + LISTEN,
      choices: ['첫 문장의 요지를 마지막 문장에서 다른 말로 되풀이한다.', '주제문 없이 사례만 나열한다.', '통념을 소개한 뒤 However로 반박한다.', '둘째 문장이 주제문이고 나머지는 예시이다.'],
      answer: 0,
      why: ['', '첫 문장 "Good listening is just as important as good speaking."이 요지를 직접 말하는 주제문입니다.', '글에 However가 없고, 첫 문장은 통념이 아니라 글쓴이의 생각입니다.', '둘째 문장(상대가 존중받는다고 느낌)은 듣기가 중요한 이유 가운데 하나입니다.'],
      explain: '첫 문장 "Good listening is just as important as good speaking."과 마지막 문장 "In short, if you want to communicate well, start by opening your ears."는 같은 요지(잘 듣는 것이 의사소통에 중요하다)를 다른 말로 나타냅니다. 처음과 끝에 주제문이 오는 짜임이고, 가운데는 이유들입니다. listening → really listen → not listening → opening your ears로 핵심어가 바뀌어 되풀이됩니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      hint: '앞부분은 글쓴이가 인정하는 내용입니다. 방향이 바뀌는 곳을 찾으십시오.',
      q: '다음 글의 요지로 가장 알맞은 것은 무엇입니까?\n\n' + HANDWRITE,
      choices: ['손으로 필기하면 핵심을 골라 생각하게 되어 학습에 도움이 된다.', '노트북으로 필기하면 수정하고 나누기 쉽다.', '타자는 손으로 쓰는 것보다 빠르다.', '강의 내용은 한 낱말도 빠짐없이 받아 적어야 한다.'],
      answer: 0,
      why: ['', '"It is true that ~"에 이어 also로 덧붙인 양보 부분(둘째 문장)입니다. 글쓴이가 인정은 하지만 강조하려는 내용은 아닙니다.', '양보 부분의 첫 문장입니다. Yet 뒤에서 글의 방향이 바뀝니다.', '글은 오히려 모든 말을 적을 수 없어서 핵심을 고르게 되는 것이 좋다고 말합니다.'],
      explain: '"It is true that ~"와 "also ~"는 타자의 장점을 인정하는 **양보**입니다. **Yet** 뒤에 "students who take notes by hand often understand lectures more deeply"가 나오고, 이유(핵심을 골라 자기 말로 바꿈 → 추가로 생각함)가 이어집니다. 요지는 손 필기가 학습에 도움이 된다는 것입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      hint: '제목은 주제를 담되, 너무 넓거나 좁지 않아야 합니다.',
      q: '다음 글의 제목으로 가장 알맞은 것은 무엇입니까?\n\n' + PLASTIC,
      choices: ['Small Steps Toward Less Plastic', 'Why Cafes Give Discounts', 'The History of Plastic', 'Paper Straws in Schools'],
      answer: 0,
      why: ['', '카페 할인은 사례 하나일 뿐입니다. 글은 할인의 이유를 설명하지 않습니다.', '글에 플라스틱의 역사는 나오지 않습니다. 범위도 너무 넓습니다.', '학교의 종이 빨대는 세 사례 가운데 하나입니다. 너무 좁습니다.'],
      explain: '마지막 주제문 "These small changes show that people are finding everyday ways to use less plastic."의 핵심어 small changes와 use less plastic을 담은 **Small Steps Toward Less Plastic**(플라스틱을 줄이는 작은 걸음)이 알맞습니다. small changes를 small steps로 바꿔 썼습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      hint: '나머지 문장들의 "예"가 될 수 없는 문장, 곧 가장 넓은 문장을 찾으십시오.',
      q: '다음 문장들을 한 문단으로 만들 때, 주제문으로 가장 알맞은 것은 무엇입니까?\n\n(A) Some students learn better by drawing pictures and charts.\n(B) Others remember more when they explain ideas out loud.\n(C) People do not all learn in the same way.\n(D) Still others need to move around or touch things to understand them.',
      choices: ['(C)', '(A)', '(B)', '(D)'],
      answer: 0,
      why: ['', 'Some students ~는 여러 학습 방식 가운데 하나를 든 구체적 예시입니다.', 'Others ~는 Some 다음에 이어지는 둘째 예시입니다.', 'Still others ~는 셋째 예시입니다.'],
      explain: '(A) Some ~, (B) Others ~, (D) Still others ~는 "사람마다 배우는 방식이 다르다"는 것을 보여 주는 세 가지 예시입니다. 그것들을 아우르는 **(C) People do not all learn in the same way.**가 일반적 진술, 곧 주제문입니다. 문단은 (C) → (A) → (B) → (D) 순서가 자연스럽습니다.',
    },
  ],

  deeper: [
    {
      title: '요지를 한 문장으로 쓰는 공식',
      body: '요지를 정리할 때는 **주제(핵심어) + 글쓴이의 관점**을 한 문장으로 이으면 됩니다.\n\n1. 반복되는 핵심어와 바꿔 쓴 말을 묶어 주제를 정합니다. (sleep, rest, a good night\'s sleep → sleep)\n2. 글쓴이가 그 주제를 어떻게 보는지 찾습니다. 역접 연결어 뒤, 맺음 문장(So, In short, Therefore)이 좋은 단서입니다. (plays a key role in learning)\n3. 둘을 이어 한 문장으로 씁니다: **Getting enough sleep helps students learn better.**\n\n이렇게 만든 요지 문장이 글의 모든 문장을 덮는지 마지막으로 확인합니다. 어떤 예시 한 문장만 덮는다면 너무 좁고, 글에 없는 내용까지 덮는다면 너무 넓습니다.',
    },
    {
      title: '영어 글의 주제문 위치',
      body: '영어의 설명문·논설문은 보통 주제문을 **먼저** 말하고 근거를 뒤에 두는 방식(두괄식)을 기본으로 가르칩니다. 읽는 사람이 무엇에 관한 글인지 먼저 알면 뒤의 내용을 빠르게 이해할 수 있기 때문입니다.\n\n그래도 실제 글은 다양합니다. 이야기로 관심을 끈 뒤 주제를 꺼내는 글, 통념을 먼저 소개하고 뒤집는 글, 사례를 쌓은 뒤 결론을 내리는 글도 많습니다. 그래서 "첫 문장 = 주제문"이라는 공식에 기대기보다 **모든 문장을 아우르는 문장이 무엇인가**를 기준으로 판단하는 습관이 중요합니다. 공통영어2에서는 글의 전개 방식(비교·대조, 원인·결과 등)을 더 자세히 배웁니다.',
    },
  ],

  faq: [
    {
      q: '주제랑 요지는 결국 같은 거 아니에요?',
      a: '비슷하지만 다릅니다. 주제는 "무엇에 관한 글인가"(예: 잠과 학습)이고, 요지는 그 주제에 대해 글쓴이가 "무엇을 말하는가"(예: 충분한 잠이 학습에 도움이 된다)입니다. 주제는 명사구, 요지는 문장이라고 기억하면 구별하기 쉽습니다.',
    },
    {
      q: '첫 문장이 주제문인지 어떻게 알아요?',
      a: '첫 문장이 뒤의 모든 문장을 "예"로 거느릴 수 있는지 확인하십시오. 첫 문장이 특정 인물의 이야기이거나 "Many people think ~" 같은 통념이라면 주제문은 그 뒤에 있을 가능성이 큽니다. However, But, So, In short 같은 신호가 나오는 곳을 특히 주의해 읽으십시오.',
    },
    {
      q: '선택지에 글에 나온 내용이 다 맞는 말인데 왜 요지가 아니에요?',
      a: '요지 문제의 오답은 글과 **틀린** 내용보다, 글에 **나오기는 하지만 일부분**인 내용(구체적 예시 하나, 역접 앞의 통념)인 경우가 많습니다. "이 선택지가 글 전체를 덮는가?"를 기준으로 고르십시오.',
    },
  ],

  mistakes: [
    'However 앞의 통념(Many people think ~)을 요지로 고르는 실수 — 글쓴이의 생각은 역접 연결어 뒤에 옵니다.',
    '글에 나온 구체적 예시 하나를 주제로 고르는 실수 — 주제는 모든 문장을 아우르는 범위여야 합니다.',
    '첫 문장을 무조건 주제문으로 보는 실수 — 일화나 사례로 시작하는 글은 중간이나 끝에 주제문이 있습니다.',
  ],

  gens: [
    {
      id: 'general-vs-specific',
      level: 1,
      title: '일반적 진술 고르기',
      make: function (R) {
        var sets = [
          { g: 'Recycling helps protect the environment.', s: ['Recycled paper saves many trees.', 'Glass bottles can be melted and used again.', 'Recycling cans means less mining for metal.', 'Old clothes can be made into bags and blankets.'] },
          { g: 'Smartphones have changed how people shop.', s: ['Many people now compare prices on an app before buying.', 'Some shoppers pay for groceries with their phones.', 'Online stores send messages about sales to customers.', 'People can read reviews of a product in seconds.'] },
          { g: 'Pets can make people\'s lives better.', s: ['Walking a dog gets its owner outside every day.', 'Playing with a cat can calm a person down.', 'Caring for a fish teaches children responsibility.', 'Many people feel less lonely when they live with a pet.'] },
          { g: 'Learning a foreign language has many advantages.', s: ['Speaking Spanish makes travel in Mexico easier.', 'Knowing English helps people read more websites.', 'Some companies pay more to workers who speak Chinese.', 'Learning Japanese lets you enjoy stories in their original language.'] },
          { g: 'Our school is trying to save energy.', s: ['Lights in empty classrooms are turned off.', 'The heaters are set to a lower temperature.', 'Students close the windows when the air conditioner is on.', 'New solar panels were put on the gym roof.'] },
          { g: 'Teamwork is important in sports.', s: ['A soccer player passes the ball to a teammate who is open.', 'Basketball players call out to warn each other.', 'In volleyball, one player sets the ball so another can hit it.', 'Relay runners must hand over the baton smoothly.'] },
          { g: 'Traveling by train has several benefits.', s: ['Passengers can read or sleep during the trip.', 'Trains rarely get stuck in traffic jams.', 'Many stations are in the center of the city.', 'A train usually produces less pollution per person than a car.'] },
        ];
        var set = R.pick(sets);

        var pick = R.choices(set.g, R.shuffle(set.s), 4);
        var why = pick.choices.map(function (c) {
          return c === set.g ? '' : '한 가지 사례만 말하는 구체적 예시입니다. 다른 문장들을 아우르지 못합니다.';
        });
        return {
          type: 'choice', concept: 2,
          q: '다음 문장들 가운데 나머지를 아우르는 **일반적 진술**은 무엇입니까?',
          choices: pick.choices,
          answer: pick.answer,
          why: why,
          explain: '넓은 범위를 한꺼번에 말하는 일반적 진술은 **' + set.g + '**입니다. 나머지 문장들은 모두 이 문장의 구체적인 예입니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'role', m: '역할', ex: 'Sleep plays an important role in learning.', exm: '잠은 학습에서 중요한 역할을 한다.' },
    { w: 'enough', m: '충분한; 충분히', ex: 'Make sure you get enough rest before the exam.', exm: '시험 전에 반드시 충분히 쉬어라.' },
    { w: 'equipment', m: '장비', ex: 'You do not need special equipment to go running.', exm: '달리기를 하는 데 특별한 장비는 필요 없다.' },
    { w: 'reduce', m: '줄이다', ex: 'We can reduce waste by using our own cups.', exm: '우리는 개인 컵을 써서 쓰레기를 줄일 수 있다.' },
    { w: 'replace', m: '대신하다, 바꾸다', ex: 'The school replaced the old desks with new ones.', exm: '학교는 낡은 책상을 새것으로 바꾸었다.' },
    { w: 'natural', m: '자연스러운; 자연의', ex: 'It is natural to feel nervous before a speech.', exm: '연설 전에 긴장하는 것은 자연스럽다.' },
    { w: 'skill', m: '기술, 능력', ex: 'Cooking is a useful skill for everyone.', exm: '요리는 모두에게 쓸모 있는 기술이다.' },
    { w: 'community', m: '지역 사회, 공동체', ex: 'The park is a gathering place for the whole community.', exm: '그 공원은 지역 사회 전체가 모이는 곳이다.' },
    { w: 'respect', m: '존중하다; 존중', ex: 'Good listeners make others feel respected.', exm: '잘 듣는 사람은 다른 사람이 존중받는다고 느끼게 한다.' },
    { w: 'argument', m: '말다툼; 주장, 논거', ex: 'The two brothers had an argument about the TV.', exm: '두 형제는 텔레비전 때문에 말다툼을 했다.' },
    { w: 'benefit', m: '이점, 혜택', ex: 'One benefit of walking is that it costs nothing.', exm: '걷기의 한 가지 이점은 돈이 들지 않는다는 것이다.' },
    { w: 'improve', m: '나아지게 하다, 향상시키다', ex: 'Reading every day can improve your vocabulary.', exm: '매일 책을 읽으면 어휘력을 높일 수 있다.' },
  ],
});
})();
