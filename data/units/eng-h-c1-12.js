/* 공통영어1 · 의견 나누고 존중하기
 * 대화·예문·지문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 토의 대화 (직접 쓴 글)
  var TRIP = 'Jiho: I think we should go to the history museum for our class trip. We can learn a lot, and everyone can join in.\nSua: I see your point, but in my view, the amusement park is better. It\'s a great chance for the whole class to have fun together.';
  var FUND = 'Minho: In my opinion, we should use the class fund to buy new books. Reading helps everyone in the class.\nYuna: I understand what you mean, but I\'d rather buy sports equipment. Exercise is good for our health, and we can all play together.';
  var LUNCH = 'In my opinion, our school should have a longer lunch break. ① First, students would have enough time to eat slowly. ② Eating too fast can cause stomachaches. ③ My favorite lunch menu is spaghetti with tomato sauce. ④ Second, students could rest and talk with friends after lunch. That\'s why I believe a longer lunch break is a good idea.';

Tutor.registerUnit({
  id: 'eng-h-c1-12',
  course: 'eng-h-c1',
  title: '의견 나누고 존중하기',
  summary: '근거를 들어 내 의견을 말하고, 다른 관점을 존중하며 정중하게 동의하거나 반대하는 법을 배웁니다.',
  goals: [
    'I think ~, In my view ~ 같은 표현으로 의견을 밝히고, 이유와 예를 들어 뒷받침할 수 있다.',
    'I agree. / I see your point, but ~ 같은 표현으로 동의하거나 정중하게 반대할 수 있다.',
    'I\'m afraid ~, It seems to me ~ 같은 표현으로 말을 부드럽게 할 수 있다.',
    '나와 다른 관점을 정리하고 서로의 공통점을 찾아 말할 수 있다.',
  ],
  standards: ['[10공영1-01-08]', '[10공영1-02-04]', '[10공영1-02-08]'],

  concepts: [
    {
      title: '의견을 밝히고 묻는 표현',
      body: '내 생각을 말할 때는 그것이 **사실이 아니라 의견**이라는 신호를 문장 앞에 붙입니다.\n\n| 의견 밝히기 | 뜻 |\n|---|---|\n| **I think (that)** ~ | 나는 ~라고 생각한다 |\n| **I believe (that)** ~ | 나는 ~라고 믿는다(확신이 더 강함) |\n| **In my view**, ~ / **In my opinion**, ~ | 내 견해로는 |\n| **From my point of view**, ~ | 내 관점에서 보면 |\n| **Personally**, ~ | 개인적으로는 |\n\n상대의 생각을 물을 때는 이렇게 말합니다.\n\n- **What do you think about** ~? (~에 대해 어떻게 생각하니?)\n- **How do you feel about** ~? (~에 대해 어떤 느낌이니?)\n- **What\'s your opinion on** ~? (~에 대한 네 의견은 뭐니?)\n\n**In my view**, students should have more time for sports. **What do you think about** that?\n\n> 💡 "학교 운동장은 넓다"는 확인할 수 있는 **사실**이고, "운동장을 더 넓혀야 한다"는 사람마다 다를 수 있는 **의견**입니다. 의견에는 I think 같은 표현을 붙여야 듣는 사람이 사실과 헷갈리지 않습니다.',
      easy: '의견 표현은 말 앞에 다는 **"내 생각" 스티커**입니다. "운동장을 넓혀야 해!"라고만 하면 모두가 동의한 사실처럼 들리지만, 앞에 **I think**(내 생각에는) 스티커를 붙이면 "이건 내 생각이야, 너는 어때?"라는 뜻이 됩니다.\n\n스티커 모양은 여러 가지입니다: I think, In my view, In my opinion, From my point of view. 모두 "내 생각에는"이라고 기억하면 됩니다.',
      check: {
        type: 'choice',
        q: '다음 중 **의견을 밝히는** 표현은 무엇입니까?',
        choices: ['In my view, ~', 'What do you think about ~?', 'I\'m sorry to hear that.'],
        answer: 0,
        why: ['', '상대의 의견을 **묻는** 표현입니다. 내 의견을 밝히는 말이 아닙니다.', '상대의 안 좋은 소식에 위로를 전하는 말입니다.'],
        explain: '**In my view**는 "내 견해로는"이라는 뜻으로, 내 의견을 밝힐 때 씁니다. What do you think about ~? 는 의견을 묻는 표현입니다.',
      },
    },
    {
      title: '이유와 예를 들어 의견 뒷받침하기',
      body: '의견만 말하면 "왜?"라는 물음이 남습니다. 설득력 있는 의견은 **의견 → 이유 → 예 → 의견 다시 말하기**의 흐름을 갖습니다.\n\n| 단계 | 하는 일 | 표현 |\n|---|---|---|\n| **의견** | 내 생각을 밝힌다 | I think ~ / In my opinion, ~ |\n| **이유** | 왜 그렇게 생각하는지 | **because** ~ / **The main reason is that** ~ / First, ~ Second, ~ |\n| **예** | 이유를 보여 주는 구체적인 사례 | **For example**, ~ / **For instance**, ~ |\n| **다시 말하기** | 의견을 한 번 더 정리 | **That\'s why** ~ / So I believe ~ |\n\n**In my opinion**, students should learn to cook at school. **The main reason is that** cooking is an important life skill. **For example**, students who can cook can make healthy meals for themselves. **That\'s why** I believe cooking classes are necessary.\n\n이유는 의견과 **직접 이어져야** 합니다. 요리 수업을 주장하면서 "나는 스파게티를 좋아한다"를 이유로 들면 개인의 취향일 뿐 근거가 되지 못합니다.',
      easy: '의견을 펴는 것은 **다리를 놓는 일**과 비슷합니다. 의견은 다리 위의 길이고, 이유와 예는 다리를 받치는 기둥입니다. 기둥이 없으면 다리가 무너지듯, 이유와 예가 없으면 의견은 쉽게 흔들립니다.\n\n"요리를 배워야 해(의견) → 살아가는 데 꼭 필요한 기술이니까(이유) → 예를 들어 혼자서도 건강한 밥을 차릴 수 있어(예) → 그래서 요리 수업이 필요해(다시 말하기)." 이 네 칸을 채우면 튼튼한 다리가 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nI think we should plant more trees at school. The main [[blank]] is that trees give us cool shade in summer.',
        choices: ['reason', 'example', 'question'],
        answer: 0,
        why: ['', '뒤 문장은 구체적인 사례가 아니라 나무를 더 심어야 하는 **까닭**입니다.', '뒤 문장은 질문이 아니라 의견의 까닭을 밝히는 말입니다.'],
        explain: '나무가 그늘을 만들어 준다는 것은 나무를 더 심어야 하는 **까닭**입니다. **The main reason is that** ~ (가장 큰 이유는 ~이다)로 이유를 밝힙니다.',
      },
    },
    {
      title: '동의하기와 정중하게 반대하기',
      body: '**동의할 때**\n\n| 표현 | 느낌 |\n|---|---|\n| **I agree (with you).** | 동의해. |\n| You\'re right. / That\'s a good point. | 네 말이 맞아. / 좋은 지적이야. |\n| **I couldn\'t agree more.** | 전적으로 동의해.(더 이상 동의할 수 없을 만큼) |\n\n**정중하게 반대할 때**는 먼저 상대의 말을 **인정**하고, 그다음 **but**으로 내 생각을 말합니다.\n\n| 표현 | 뜻 |\n|---|---|\n| **I see your point, but** ~ | 무슨 말인지 알겠지만 ~ |\n| **I understand what you mean, but** ~ | 네 뜻은 이해하지만 ~ |\n| I agree to some extent, but ~ | 어느 정도는 동의하지만 ~ |\n| I\'m not sure I agree. | 동의하는지 잘 모르겠어. |\n\nA: I think we should have more homework.\nB: **I see your point, but** too much homework can make students tired.\n\n> ⚠️ You\'re wrong. / That\'s a silly idea. 처럼 사람이나 생각을 깎아내리는 말은 대화를 막습니다. 반대하는 대상은 **사람이 아니라 의견**입니다.\n\n> ⚠️ agree는 동사이므로 be동사와 함께 쓰지 않습니다. I am agree. (X) → **I agree.** (O)',
      easy: '반대 의견을 말하는 것은 **공을 주고받는 것**과 같습니다. 친구가 던진 공(의견)을 먼저 받아 주고("I see your point" — 네 말 들었어), 그다음 내 공을 던지면("but ~") 놀이가 계속됩니다.\n\n공을 받지도 않고 쳐내 버리면("You\'re wrong!") 친구는 더 이상 공을 던지고 싶지 않겠지요. 받기 → 던지기 순서를 지키면 반대해도 사이가 나빠지지 않습니다.',
      check: {
        type: 'ox',
        q: 'I couldn\'t agree more. 는 상대의 의견에 반대한다는 뜻이다.',
        answer: false,
        explain: '"더 이상 동의할 수 없을 만큼 동의한다", 곧 **전적으로 동의한다**는 뜻입니다. not이 들어 있지만 반대가 아니라 아주 강한 동의입니다.',
      },
    },
    {
      title: '말을 부드럽게 하는 표현',
      body: '같은 내용이라도 단정하는 말보다 **한 걸음 물러선 말**이 더 정중하게 들립니다. 이런 표현을 쓰면 상대가 기분 상하지 않고 내 말을 들어 줄 가능성이 커집니다.\n\n| 표현 | 쓰임 | 예 |\n|---|---|---|\n| **I\'m afraid (that)** ~ | 유감스러운 말을 꺼낼 때(유감이지만) | **I\'m afraid** I can\'t agree with you. |\n| **It seems to me (that)** ~ | 내 판단이 틀릴 수도 있음을 보일 때(제가 보기에는) | **It seems to me that** the rule is a little strict. |\n| **I\'m not sure (that)** ~ | 확신이 없음을 보일 때 | **I\'m not sure** that\'s the best way. |\n| **might**, **could**, **maybe** | 단정을 피할 때 | The plan **might** be too expensive. |\n\n견주어 보십시오.\n\n- Your plan is wrong. (네 계획은 틀렸어.) → 단정적, 상대를 공격하는 느낌\n- **I\'m afraid** your plan **might** not work. (유감이지만 네 계획이 잘 안 될 수도 있을 것 같아.) → 같은 생각을 부드럽게\n\n> ⚠️ 여기서 I\'m afraid는 "무섭다"가 아닙니다. 상대가 듣기 싫어할 말을 꺼낼 때 붙이는 "유감이지만, 죄송하지만"의 뜻입니다.',
      easy: '말을 부드럽게 하는 표현은 **포장지**입니다. 같은 선물(내 생각)이라도 맨손으로 툭 던지는 것보다 포장해서 건네면 받는 사람의 기분이 다르지요.\n\n"네 계획은 틀렸어" 대신 "**I\'m afraid**(유감이지만) 네 계획이 잘 안 될 **수도**(might) 있을 것 같아"라고 하면, 하고 싶은 말은 그대로 전하면서 상대의 마음은 다치지 않게 할 수 있습니다.',
      check: {
        type: 'choice',
        q: 'I\'m afraid I can\'t come to the meeting. 에서 I\'m afraid의 쓰임으로 알맞은 것은 무엇입니까?',
        choices: ['유감스러운 말을 부드럽게 꺼낸다', '무서운 감정을 나타낸다', '상대의 의견에 강하게 동의한다'],
        answer: 0,
        why: ['', '글자 그대로 "무섭다"로 읽었습니다. 여기서는 "유감이지만"이라는 뜻으로, 회의에 못 간다는 말을 부드럽게 꺼냅니다.', '동의하는 표현이 아닙니다. 회의에 갈 수 없다는 유감스러운 소식을 전합니다.'],
        explain: '**I\'m afraid** ~ 는 상대가 듣기 싫어할 말 앞에 붙여 "유감이지만, 죄송하지만"의 뜻으로 말을 **부드럽게** 합니다. 회의에 갈 수 없다는 소식을 정중하게 전하는 문장입니다.',
      },
    },
    {
      title: '다른 관점 정리하고 공통점 찾기',
      body: '의견을 나누는 목적은 이기는 것이 아니라 **더 나은 결론**을 찾는 것입니다. 그러려면 먼저 상대의 생각을 정확히 이해하고, 서로 같은 점을 찾아야 합니다.\n\n**① 상대의 말을 정리해 확인하기**\n\n- **So what you\'re saying is (that)** ~ (그러니까 네 말은 ~라는 거구나)\n- **If I understand correctly**, you think ~ (내가 제대로 이해했다면, 너는 ~라고 생각하는구나)\n\n**② 공통점 찾기**\n\n- **We both agree that** ~ (우리 둘 다 ~라는 데는 동의해)\n- **Both of us want** ~ (우리 둘 다 ~을 원해)\n\n**③ 함께 할 방법 제안하기**\n\n- **How about** ~? / **Why don\'t we** ~? (~하는 게 어때?)\n\nA: I want a quiet classroom for studying. B: I want a fun classroom with music.\n→ **We both want** a classroom where everyone feels comfortable. **How about** playing quiet music during break time only?\n\n> 💡 상대의 말을 정리해 줄 때 잘못 이해한 부분이 있으면 상대가 바로잡아 줄 수 있습니다. 오해 때문에 생기는 다툼을 줄이는 좋은 습관입니다.',
      easy: '두 사람이 서로 다른 길로 가자고 할 때, 지도를 펴고 **두 길이 만나는 곳**을 찾는 것과 같습니다. 한 사람은 박물관, 한 사람은 놀이공원을 원해도 "둘 다 반 친구들이 **함께** 즐거웠으면 좋겠다"는 점은 같을 수 있지요.\n\n그 만나는 곳(공통점)에서 출발하면 "그럼 오전에는 박물관, 오후에는 공원에 가는 건 어때?" 같은 새 길이 보입니다.',
      check: {
        type: 'choice',
        q: 'So what you\'re saying is that we need more time. 의 쓰임으로 알맞은 것은 무엇입니까?',
        choices: ['상대의 말을 내 말로 정리해 확인한다', '상대의 의견에 강하게 반대한다', '새로운 주제를 꺼낸다'],
        answer: 0,
        why: ['', '반대하는 말이 아닙니다. 상대가 한 말을 "그러니까 ~라는 거지?" 하고 다시 정리합니다.', '새 주제가 아니라 상대가 방금 한 말을 정리해 확인하는 표현입니다.'],
        explain: '**So what you\'re saying is (that)** ~ 는 "그러니까 네 말은 ~라는 거구나"라는 뜻으로, 상대의 말을 **정리해 확인**할 때 씁니다. 상대를 잘 이해했다는 것을 보여 주어 존중하는 대화가 됩니다.',
      },
    },
  ],

  examples: [
    {
      q: '"학생들이 학교에서 요리를 배워야 한다"는 의견을 **의견 → 이유 → 예 → 다시 말하기** 순서로 말해 보십시오.',
      steps: [
        '**의견**: 의견 신호를 붙여 시작합니다. In my opinion, students should learn to cook at school.',
        '**이유**: 의견과 직접 이어지는 까닭을 밝힙니다. The main reason is that cooking is an important life skill.',
        '**예**: 이유를 눈에 보이게 하는 구체적인 사례를 듭니다. For example, students who can cook can make healthy meals for themselves.',
        '**다시 말하기**: 의견을 한 번 더 정리합니다. That\'s why I believe cooking classes are necessary.',
      ],
      answer: 'In my opinion, students should learn to cook at school. The main reason is that cooking is an important life skill. For example, students who can cook can make healthy meals for themselves. That\'s why I believe cooking classes are necessary.',
    },
    {
      q: '다음 대화에서 두 사람의 의견을 정리하고, 공통점을 찾아 제안하는 말을 만들어 보십시오.\n\n' + TRIP,
      steps: [
        '지호의 의견: 역사 박물관(learn a lot, everyone can join in). 수아의 의견: 놀이공원(have fun together).',
        '수아는 반대하기 전에 **I see your point, but** ~ 으로 지호의 말을 먼저 인정했습니다. 정중한 반대입니다.',
        '공통점: 두 사람 모두 **반 전체가 함께하는 것**(everyone can join in / the whole class)을 중요하게 생각합니다. → We both want a trip that the whole class can enjoy together.',
        '공통점에서 출발해 제안합니다. → How about visiting the museum in the morning and the park in the afternoon?',
      ],
      answer: 'We both want a trip that the whole class can enjoy together. How about visiting the museum in the morning and the park in the afternoon?',
    },
  ],

  terms: [
    { term: '의견', def: '어떤 일에 대한 사람의 생각으로, 사람마다 다를 수 있습니다. 확인할 수 있는 사실과 구별합니다. 표현: I think ~, In my view ~' },
    { term: '근거', def: '의견이 옳다고 믿는 까닭과 그것을 보여 주는 사례입니다. 표현: because ~, The main reason is that ~, For example, ~' },
    { term: '동의', def: '상대의 의견과 같은 생각이라고 밝히는 것입니다. 표현: I agree (with you). / You\'re right. / I couldn\'t agree more.' },
    { term: '정중한 반대', def: '상대의 말을 먼저 인정한 뒤 다른 생각을 밝히는 것입니다. 표현: I see your point, but ~ / I understand what you mean, but ~' },
    { term: '완곡 표현', def: '단정을 피하고 말을 부드럽게 하는 표현입니다. 예: I\'m afraid ~, It seems to me ~, I\'m not sure ~, might, maybe' },
    { term: '관점', def: '어떤 일을 바라보는 입장이나 시각입니다. 같은 일도 관점에 따라 다르게 보입니다. 표현: From my point of view, ~' },
    { term: '공통점 찾기', def: '서로 다른 의견 속에서 함께 원하는 것을 찾아 정리하는 것입니다. 표현: We both agree that ~ / Both of us want ~' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 중 의견을 밝히는 표현이 **아닌** 것은 무엇입니까?',
      choices: ['In my view, ~', 'I think ~', 'From my point of view, ~', 'I\'m sorry to hear that.'],
      answer: 3,
      why: ['"내 견해로는"이라는 뜻으로 의견을 밝히는 표현입니다.', '"나는 ~라고 생각한다"로 의견을 밝히는 가장 흔한 표현입니다.', '"내 관점에서 보면"이라는 뜻으로 의견을 밝히는 표현입니다.', ''],
      explain: 'I\'m sorry to hear that. 은 "그 말을 들으니 안타깝다"는 **위로**의 말입니다. 나머지는 모두 의견을 밝히는 표현입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오. ("내 견해로는, 교복은 쓸모가 있다.")\n\nIn my [[blank]], school uniforms are useful.',
      answer: ['view', 'opinion'],
      wrong: [{ a: 'think', why: 'think는 동사라서 my 뒤에 올 수 없습니다. In my 뒤에는 명사 view나 opinion이 옵니다.' }],
      explain: '**In my view** 또는 **In my opinion**은 "내 견해로는, 내 생각에는"이라는 뜻으로 의견을 밝힐 때 씁니다. my 뒤이므로 명사가 와야 합니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: 'I couldn\'t agree more. 의 뜻으로 알맞은 것은 무엇입니까?',
      choices: ['전적으로 동의한다.', '전혀 동의할 수 없다.', '조금만 동의한다.', '더 이상 말하고 싶지 않다.'],
      answer: 0,
      why: ['', 'not이 있어서 반대로 읽었습니다. "이보다 더 동의할 수는 없다", 곧 최고로 동의한다는 뜻입니다.', '"더 이상 동의할 수 없을 만큼" 동의하므로 조금이 아니라 완전히 동의하는 것입니다.', '대화를 끝내자는 말이 아니라 강한 동의의 표현입니다.'],
      explain: '**I couldn\'t agree more.** 는 "이보다 더 동의할 수는 없을 것이다", 곧 **전적으로 동의한다**는 뜻입니다.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: 'I see your point, but ~ 는 상대의 말을 인정하면서 정중하게 반대할 때 쓰는 표현이다.',
      answer: true,
      explain: '"무슨 말인지 알겠다"고 상대의 말을 먼저 **인정**하고, **but** 뒤에서 내 생각을 밝히는 정중한 반대 표현입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '다음 중 말을 **가장 부드럽게** 한 문장은 무엇입니까?',
      choices: ['It seems to me that the rule is a little strict.', 'The rule is too strict.', 'The rule is terrible.', 'Everyone knows the rule is wrong.'],
      answer: 0,
      why: ['', '틀린 말은 아니지만 단정적으로 말했습니다. It seems to me ~ 같은 표현을 붙이면 더 부드럽습니다.', 'terrible(끔찍한)은 강하게 깎아내리는 말입니다.', '"모두가 안다"고 단정해 다른 의견이 들어올 틈을 막았습니다.'],
      explain: '**It seems to me that** ~ (제가 보기에는 ~)은 내 판단이 틀릴 수도 있음을 보여 주고, **a little**(조금)도 말을 누그러뜨립니다. 같은 생각을 가장 부드럽게 전한 문장입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nI think students should walk to school more often. It is good for their health. [[blank]], walking for 20 minutes a day can make their legs and hearts stronger.',
      choices: ['For example', 'However', 'I\'m afraid', 'I disagree'],
      answer: 0,
      why: ['', '뒤 문장은 앞 내용과 반대가 아니라 앞의 이유(건강에 좋다)를 보여 주는 사례입니다.', 'I\'m afraid는 유감스러운 말을 꺼낼 때 씁니다. 뒤 문장은 이유를 뒷받침하는 사례입니다.', '자기 의견을 뒷받침하는 문장 앞에 반대하는 말이 올 수 없습니다.'],
      explain: '"건강에 좋다"(이유) 뒤에 "하루 20분 걷기가 다리와 심장을 튼튼하게 한다"는 **구체적인 사례**가 오므로 **For example**이 알맞습니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오. ("나는 네 말에 동의해.")\n\nI agree [[blank]] you.',
      answer: ['with'],
      wrong: [
        { a: 'to', why: 'agree to는 제안이나 계획에 "찬성하다"(agree to the plan)일 때 씁니다. 사람이나 의견에 동의할 때는 agree with입니다.' },
        { a: 'on', why: 'agree on은 "~에 대해 합의하다"(agree on a date)입니다. 사람에게 동의할 때는 agree with입니다.' },
      ],
      explain: '사람이나 그 사람의 의견에 동의할 때는 **agree with**를 씁니다. I agree **with** you.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 4,
      q: 'We both agree that ~ 는 서로 다른 의견 속에서 공통점을 찾아 말할 때 쓸 수 있다.',
      answer: true,
      explain: '**We both agree that** ~ 은 "우리 둘 다 ~라는 데는 동의한다"는 뜻으로, 의견이 다른 두 사람이 **같은 점**을 찾아 정리할 때 씁니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      q: '대화의 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nA: I think online classes are better than classroom classes.\nB: [[blank]] It\'s hard to ask teachers questions online.',
      choices: ['I see your point, but I\'m not sure about that.', 'I couldn\'t agree more.', 'Exactly. That\'s what I think.', 'You\'re right. Online classes are better.'],
      answer: 0,
      why: ['', '전적으로 동의하는 말입니다. 그런데 B의 뒷말은 온라인 수업의 단점이라 A의 의견에 반대합니다.', '동의하는 말입니다. B의 뒷말은 A의 의견과 반대되는 근거입니다.', '동의하며 같은 말을 되풀이했습니다. B의 뒷말과 앞뒤가 맞지 않습니다.'],
      hint: 'B가 빈칸 뒤에 한 말이 A의 의견을 돕는지, 반대하는지 먼저 보십시오.',
      explain: 'B는 빈칸 뒤에서 "온라인으로는 선생님께 질문하기 어렵다"는 **반대 근거**를 듭니다. 그래서 A의 말을 인정하면서 정중하게 반대하는 **I see your point, but I\'m not sure about that.** 이 알맞습니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '"네 계획은 잘 안 될 거야."라는 생각을 **뜻은 그대로 두고** 가장 정중하게 말한 것은 무엇입니까?',
      choices: ['I\'m afraid your plan might not work.', 'Your plan will never work.', 'I\'m afraid your plan will work well.', 'I couldn\'t agree more with your plan.'],
      answer: 0,
      why: ['', '뜻은 같지만 never(절대)로 단정해 더 강하게 들립니다.', 'I\'m afraid를 붙였지만 "잘될 것이다"로 뜻이 반대가 되었습니다.', '계획에 전적으로 동의한다는 말이라 뜻이 반대입니다.'],
      hint: '뜻(잘 안 될 것 같다)과 말투(부드럽게)를 둘 다 확인하십시오.',
      explain: '**I\'m afraid**(유감이지만)와 **might**(~일 수도 있다)를 써서 "잘 안 될 것 같다"는 뜻은 지키면서 말을 부드럽게 했습니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 1,
      q: '의견 → 이유 → 예 → 다시 말하기 순서가 되도록 문장을 놓으십시오.',
      choices: [
        'In my view, every classroom should have a recycling bin.',
        'The main reason is that it makes recycling easy for everyone.',
        'For example, students can throw away plastic bottles right after lunch.',
        'That\'s why I believe each class needs its own recycling bin.',
      ],
      answer: [0, 1, 2, 3],
      hint: '의견을 처음 밝히는 문장과 That\'s why로 정리하는 문장을 먼저 찾으십시오.',
      explain: '**In my view**(의견) → **The main reason is that**(이유) → **For example**(예) → **That\'s why**(다시 말하기)의 순서입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '대화를 읽고, 두 사람의 **공통점**을 찾아 말한 문장으로 가장 알맞은 것을 고르십시오.\n\n' + TRIP,
      choices: [
        'We both want a trip that the whole class can enjoy together.',
        'We both think the history museum is boring.',
        'We both want to go to the amusement park.',
        'I\'m afraid your idea is wrong.',
      ],
      answer: 0,
      why: ['', '두 사람 모두 박물관이 지루하다고 말하지 않았습니다. 지호는 박물관을 원합니다.', '놀이공원을 원하는 사람은 수아뿐입니다. 지호는 박물관을 원합니다.', '공통점을 찾는 말이 아니라 상대 의견을 틀렸다고 하는 말입니다.'],
      hint: '지호와 수아가 각자 이유로 든 말에서 겹치는 생각을 찾으십시오.',
      explain: '지호는 everyone can join in(모두 함께할 수 있다), 수아는 the whole class to have fun together(반 전체가 함께 즐긴다)를 이유로 들었습니다. 두 사람 모두 **반 전체가 함께하는 여행**을 원하므로 이것이 공통점입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '두 사람의 대화가 **어색한** 것은 무엇입니까?',
      choices: [
        'A: I think we should ban phones in class. / B: I couldn\'t agree more. Phones distract students.',
        'A: In my view, homework helps us learn. / B: I see your point, but too much homework can make us tired.',
        'A: What do you think about the new school rule? / B: It seems to me that it\'s a little too strict.',
        'A: I believe reading books is better than watching videos. / B: I agree with you. Videos are much better than books.',
      ],
      answer: 3,
      why: [
        '전적으로 동의한 뒤 같은 방향의 근거(휴대 전화가 방해가 된다)를 들어 자연스럽습니다.',
        'A의 말을 인정한 뒤 but으로 반대 근거를 들어 자연스러운 정중한 반대입니다.',
        '의견을 묻는 말에 It seems to me ~ 로 부드럽게 의견을 말해 자연스럽습니다.',
        '',
      ],
      hint: '동의·반대 표현과 그 뒤에 이어지는 근거가 같은 방향인지 확인하십시오.',
      explain: 'B는 I agree with you(동의한다)라고 해 놓고, 바로 "영상이 책보다 훨씬 낫다"는 **반대 내용**을 말했습니다. 동의 표현과 뒤의 근거가 어긋나므로 어색합니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 1,
      q: '다음 글에서 의견을 뒷받침하는 흐름과 관계**없는** 문장은 무엇입니까?\n\n' + LUNCH,
      choices: ['①', '②', '③', '④'],
      answer: 2,
      why: [
        '천천히 먹을 시간이 생긴다는 첫째 이유입니다.',
        '빨리 먹으면 배가 아플 수 있다는 것은 첫째 이유(천천히 먹을 시간)를 뒷받침합니다.',
        '',
        '쉬고 친구와 이야기할 수 있다는 둘째 이유입니다.',
      ],
      hint: '각 문장이 "점심시간을 늘려야 한다"는 의견의 이유나 예가 되는지 확인하십시오.',
      explain: '글쓴이의 의견은 "점심시간을 더 길게 해야 한다"입니다. ③ "내가 좋아하는 점심 메뉴는 토마토소스 스파게티다"는 개인의 취향일 뿐, 점심시간을 늘려야 하는 **이유가 되지 못합니다**.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '대화를 읽고, 두 사람의 의견을 바르게 정리한 것을 고르십시오.\n\n' + FUND,
      choices: [
        'Minho wants books and Yuna wants sports equipment, but both want something that helps the whole class.',
        'Both Minho and Yuna want to buy new books.',
        'Yuna completely agrees with Minho.',
        'Minho thinks exercise is more important than reading.',
      ],
      answer: 0,
      why: [
        '',
        '책을 사자는 사람은 민호뿐입니다. 유나는 운동 기구를 사자고 했습니다.',
        '유나는 I understand what you mean, but ~ 으로 정중하게 반대했습니다. 완전히 동의한 것이 아닙니다.',
        '운동이 건강에 좋다고 한 사람은 유나입니다.',
      ],
      hint: '각자의 의견과 이유를 먼저 한 줄씩 정리한 뒤 겹치는 점을 찾으십시오.',
      explain: '민호는 책(Reading helps everyone in the class), 유나는 운동 기구(we can all play together)를 원합니다. 원하는 물건은 다르지만 둘 다 **반 전체에 도움이 되는 것**을 원한다는 공통점이 있습니다. 유나의 I understand what you mean, but ~ 은 정중한 반대이지 동의가 아닙니다.',
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 2,
      q: '"네 말은 알겠지만, 그 계획이 잘될지는 잘 모르겠어."가 되도록 낱말 묶음을 놓으십시오.',
      choices: ['I see your point,', 'but', 'I\'m not sure', 'that the plan', 'will work.'],
      answer: [0, 1, 2, 3, 4],
      hint: '먼저 상대의 말을 인정하고, but 뒤에 내 생각을 부드럽게 말합니다.',
      explain: 'I see your point(인정) + but + I\'m not sure(부드럽게) + that the plan will work(내 생각)의 순서입니다. I see your point, but I\'m not sure that the plan will work.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 3,
      q: 'A의 의견에 **가장 정중하게 반대하면서** 다른 방법까지 제안한 B의 말은 무엇입니까?\n\nA: I think we should cancel sports day because it will be too hot.',
      choices: [
        'I understand your concern, but it seems to me that we could start earlier in the morning.',
        'That\'s a silly idea. Sports day is always fun.',
        'I couldn\'t agree more. Let\'s cancel it.',
        'You\'re wrong, and everyone knows it.',
      ],
      answer: 0,
      why: [
        '',
        'silly(어리석은)로 상대의 생각을 깎아내렸고, 다른 방법도 제안하지 않았습니다.',
        '반대가 아니라 전적으로 동의하는 말입니다.',
        '사람을 공격하는 말이고, 근거나 다른 방법이 없습니다.',
      ],
      hint: '상대의 걱정을 인정하는지, 말이 부드러운지, 다른 방법이 있는지 세 가지를 확인하십시오.',
      explain: 'I understand your concern(걱정은 이해한다)으로 상대를 **인정**하고, it seems to me that ~ 으로 말을 **부드럽게** 한 뒤, "아침 일찍 시작하자"는 **다른 방법**을 제안했습니다. 더위라는 상대의 걱정도 함께 해결하는 말입니다.',
    },
  ],

  deeper: [
    {
      title: '토론과 토의는 어떻게 다를까?',
      body: '**토론(debate)**은 찬성과 반대로 나뉘어 근거를 들어 상대를 설득하는 말하기입니다. 누구의 주장이 더 설득력 있는지 겨룹니다. **토의(discussion)**는 여러 사람이 생각을 모아 **함께 문제를 해결하는** 말하기입니다. 이기고 지는 것이 없습니다.\n\n이 단원에서 배운 표현은 두 가지 모두에 쓰입니다. 근거를 들어 의견을 말하는 법은 토론에서, 상대의 말을 정리하고 공통점을 찾는 법은 토의에서 특히 중요합니다. 공통영어2의 "함께 토의해 문제 해결하기"에서 이 표현들을 실제 문제 해결에 써 봅니다.',
    },
    {
      title: '영어의 정중함은 "단정하지 않기"에서 나온다',
      body: '우리말은 높임말(-습니다, -세요)로 정중함을 나타내는 경우가 많습니다. 영어에는 높임말 어미가 없는 대신, **단정을 피하는 말**로 정중함을 나타내는 경우가 많습니다.\n\n- Close the window. → **Could you** close the window? (부탁으로)\n- That\'s wrong. → **I\'m not sure** that\'s right. (확신을 낮춰서)\n- You should do it. → **Maybe** you **could** try it. (가능성으로)\n\n그래서 영어로 반대 의견을 말할 때 No로 바로 시작하면 생각보다 훨씬 딱딱하게 들릴 수 있습니다. 같은 내용이라도 I see your point, but ~ 이나 I\'m afraid ~ 를 붙이는 습관을 들이면, 영어를 쓰는 사람들과도 편하게 의견을 나눌 수 있습니다.',
    },
  ],

  faq: [
    {
      q: 'I couldn\'t agree more는 not이 있는데 왜 동의라는 뜻이에요?',
      a: '"(지금보다) 더 동의할 수는 없을 것이다"라는 말이라서, 지금 이미 **최고로 동의하고 있다**는 뜻이 됩니다. 비슷하게 I couldn\'t be happier.(이보다 더 행복할 수 없다)도 "아주 행복하다"는 뜻입니다.',
    },
    {
      q: 'I am agree라고 하면 안 돼요?',
      a: '안 됩니다. agree는 "동의하다"라는 **동사**이므로 be동사 없이 **I agree.** 라고 합니다. 우리말 "동의해"를 "나는 동의한 상태이다"로 옮기려다 생기는 실수입니다. 반대는 I disagree. 또는 I don\'t agree. 입니다.',
    },
    {
      q: '반대 의견을 말하면 무례한 거 아니에요?',
      a: '반대 의견을 말하는 것 자체는 무례하지 않습니다. 오히려 다른 생각을 나누어야 더 좋은 결론을 찾을 수 있습니다. 무례한 것은 **말하는 방식**입니다. 상대의 말을 먼저 인정하고(I see your point), 사람이 아니라 의견에 대해 말하고, 근거를 함께 들면 반대도 존중이 담긴 대화가 됩니다.',
    },
    {
      q: 'I think랑 In my view는 뭐가 달라요?',
      a: '둘 다 "내 생각에는"이라는 뜻이라 대부분 바꿔 써도 됩니다. I think는 대화에서 가장 흔하게 쓰고, In my view나 In my opinion은 조금 더 격식 있는 자리(발표, 글쓰기)에서 자주 씁니다. 한 글 안에서 같은 표현만 되풀이하지 않도록 섞어 쓰면 좋습니다.',
    },
  ],

  mistakes: [
    'I am agree with you. 처럼 agree 앞에 be동사를 쓰는 실수 — agree는 동사이므로 I agree with you. 라고 씁니다.',
    'I\'m afraid ~ 를 "무섭다"로 해석하는 실수 — 의견을 나눌 때의 I\'m afraid ~ 는 "유감이지만, 죄송하지만"이라는 뜻으로 말을 부드럽게 합니다.',
    '의견만 되풀이하고 이유와 예를 들지 않는 실수 — The main reason is that ~, For example, ~ 으로 의견과 직접 이어지는 근거를 덧붙입니다.',
  ],

  gens: [
    {
      id: 'expression-function',
      level: 1,
      title: '표현의 쓰임 구별하기',
      make: function (R) {
        var cats = {
          opinion: { name: '의견 밝히기', concept: 0 },
          ask: { name: '의견 묻기', concept: 0 },
          agree: { name: '동의하기', concept: 2 },
          disagree: { name: '정중하게 반대하기', concept: 2 },
        };
        var pool = [
          ['I think (that) ~', 'opinion', '"나는 ~라고 생각한다"로 내 의견을 밝힙니다.'],
          ['In my view, ~', 'opinion', '"내 견해로는"이라는 뜻으로 내 의견을 밝힙니다.'],
          ['In my opinion, ~', 'opinion', '"내 생각에는"이라는 뜻으로 내 의견을 밝힙니다.'],
          ['From my point of view, ~', 'opinion', '"내 관점에서 보면"이라는 뜻으로 내 의견을 밝힙니다.'],
          ['I believe (that) ~', 'opinion', '"나는 ~라고 믿는다"로 내 의견을 확신 있게 밝힙니다.'],
          ['Personally, I feel that ~', 'opinion', '"개인적으로는 ~라고 느낀다"로 내 의견을 밝힙니다.'],
          ['What do you think about ~?', 'ask', '"~에 대해 어떻게 생각하니?"로 상대의 의견을 묻습니다.'],
          ['How do you feel about ~?', 'ask', '"~에 대해 어떤 느낌이니?"로 상대의 의견을 묻습니다.'],
          ['What\'s your opinion on ~?', 'ask', '"~에 대한 네 의견은 뭐니?"로 상대의 의견을 묻습니다.'],
          ['Do you agree with me?', 'ask', '"내 말에 동의하니?"로 상대의 생각을 묻습니다.'],
          ['I agree with you.', 'agree', '"네 말에 동의해."라는 뜻입니다.'],
          ['I couldn\'t agree more.', 'agree', 'not이 있지만 "이보다 더 동의할 수 없다", 곧 전적으로 동의한다는 뜻입니다.'],
          ['That\'s a good point.', 'agree', '"좋은 지적이야."로 상대의 말에 동의합니다.'],
          ['You\'re right.', 'agree', '"네 말이 맞아."로 상대의 말에 동의합니다.'],
          ['I\'m with you on that.', 'agree', '"그 점에서는 나도 너와 같은 생각이야."로 동의합니다.'],
          ['Exactly.', 'agree', '"바로 그거야."로 강하게 동의합니다.'],
          ['I see your point, but ~', 'disagree', '상대의 말을 먼저 인정하고 but 뒤에서 다른 생각을 밝히는 정중한 반대입니다.'],
          ['I understand what you mean, but ~', 'disagree', '"네 뜻은 이해하지만"으로 인정한 뒤 반대 의견을 밝힙니다.'],
          ['I\'m not sure I agree.', 'disagree', '"동의하는지 잘 모르겠다"로 반대를 부드럽게 나타냅니다.'],
          ['I\'m afraid I disagree.', 'disagree', '"유감이지만 생각이 다르다"로 정중하게 반대합니다.'],
          ['I don\'t think that\'s a good idea, but I could be wrong.', 'disagree', '반대하면서도 "내가 틀릴 수도 있다"고 덧붙여 정중하게 말합니다.'],
        ];
        var item = R.pick(pool);
        var c = cats[item[1]];
        var correct = c.name;
        var others = ['opinion', 'ask', 'agree', 'disagree'].filter(function (k) { return k !== item[1]; });
        var pick = R.choices(correct, R.shuffle(others.map(function (k) { return cats[k].name; })));
        return {
          type: 'choice', concept: c.concept,
          q: '다음 표현의 쓰임으로 가장 알맞은 것은 무엇입니까?\n\n**' + item[0] + '**',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (ch) { return ch === correct ? '' : '"' + ch + '"에 쓰는 표현이 아닙니다. ' + item[2]; }),
          explain: item[2] + ' 그래서 쓰임은 **' + correct + '**입니다.',
        };
      },
    },
    {
      id: 'agree-or-disagree',
      level: 2,
      title: '뒷말에 맞게 동의·반대 표현 고르기',
      make: function (R) {
        var items = [
          ['I think our school should start later in the morning.', 'Many students are too sleepy in the first class.', 'Then we would finish school too late in the afternoon.'],
          ['In my view, students should have less homework.', 'We need more time to rest and read.', 'Homework helps us review what we learned.'],
          ['I believe every student should learn to swim.', 'It is an important skill for staying safe.', 'Some students don\'t have a pool near their home.'],
          ['I think we should have more school trips.', 'We can learn a lot outside the classroom.', 'Trips can cost a lot of money for families.'],
          ['In my opinion, the school library should open on weekends.', 'Many students want a quiet place to study on Saturdays.', 'The librarians also need time to rest.'],
          ['I think students should be allowed to use phones during lunch.', 'They can contact their parents if they need to.', 'They would spend less time talking with friends.'],
          ['In my view, our class should plant a vegetable garden.', 'We can learn where our food comes from.', 'Nobody can water the plants during vacation.'],
          ['I think learning a second foreign language is useful.', 'It helps us understand other cultures.', 'Students already have too many subjects to study.'],
        ];
        var agreeX = ['I agree with you.', 'I couldn\'t agree more.', 'That\'s a good point.', 'You\'re right.'];
        var disagreeX = ['I see your point, but I don\'t think so.', 'I understand what you mean, but I disagree.', 'I\'m afraid I can\'t agree.', 'I\'m not sure I agree with you.'];
        var askX = ['What do you think about it?', 'How do you feel about that?'];
        var it = R.pick(items);
        var agreeing = R.bool();
        var follow = agreeing ? it[1] : it[2];
        var correct = R.pick(agreeing ? agreeX : disagreeX);
        var opp = R.sample(agreeing ? disagreeX : agreeX, 2);
        var ask = R.pick(askX);
        var reason = {};
        opp.forEach(function (o) {
          reason[o] = agreeing
            ? '반대하는 말입니다. B의 뒷말은 A의 의견을 돕는 근거이므로 동의하는 말이 와야 합니다.'
            : '동의하는 말입니다. B의 뒷말은 A의 의견과 반대되는 근거이므로 정중하게 반대하는 말이 와야 합니다.';
        });
        reason[ask] = '상대의 의견을 묻는 말입니다. A는 이미 의견을 말했고, B가 이어서 자기 생각을 밝히므로 어울리지 않습니다.';
        var pick = R.choices(correct, R.shuffle(opp.concat([ask])));
        return {
          type: 'choice', concept: 2,
          q: '대화의 빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nA: ' + it[0] + '\nB: [[blank]] ' + follow,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: 'B는 빈칸 뒤에서 "' + follow + '"라고 말합니다. ' + (agreeing
            ? '이 말은 A의 의견을 **돕는 근거**이므로 동의하는 말이 와야 합니다. 답: **' + correct + '**'
            : '이 말은 A의 의견과 **반대되는 근거**이므로 정중하게 반대하는 말이 와야 합니다. 답: **' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'opinion', m: '의견, 생각', ex: 'In my opinion, the park needs more benches.', exm: '내 생각에는 그 공원에 벤치가 더 필요하다.' },
    { w: 'view', m: '견해, 관점; 경치', ex: 'In my view, the plan is too expensive.', exm: '내 견해로는 그 계획은 너무 비싸다.' },
    { w: 'point of view', m: '관점, 입장', ex: 'Try to see the problem from her point of view.', exm: '그 문제를 그녀의 관점에서 보려고 해 봐.' },
    { w: 'agree', m: '동의하다', ex: 'I agree with you about the new rule.', exm: '새 규칙에 대해 네 말에 동의해.' },
    { w: 'disagree', m: '동의하지 않다, 의견이 다르다', ex: 'We disagree about the best way to study.', exm: '우리는 가장 좋은 공부 방법에 대해 의견이 다르다.' },
    { w: 'reason', m: '이유, 까닭', ex: 'The main reason is that it saves time.', exm: '가장 큰 이유는 그것이 시간을 아껴 준다는 것이다.' },
    { w: 'support', m: '뒷받침하다, 지지하다', ex: 'Use examples to support your opinion.', exm: '예를 들어 네 의견을 뒷받침해라.' },
    { w: 'respect', m: '존중하다; 존중', ex: 'We should respect different opinions.', exm: '우리는 다른 의견을 존중해야 한다.' },
    { w: 'polite', m: '공손한, 예의 바른', ex: 'She gave a polite answer to the question.', exm: '그녀는 그 질문에 공손하게 대답했다.' },
    { w: 'concern', m: '걱정, 염려', ex: 'I understand your concern about the cost.', exm: '비용에 대한 네 걱정은 이해해.' },
    { w: 'personally', m: '개인적으로는', ex: 'Personally, I prefer reading at night.', exm: '개인적으로 나는 밤에 책 읽는 것을 더 좋아한다.' },
    { w: 'perspective', m: '관점, 시각', ex: 'Traveling gave me a new perspective on life.', exm: '여행은 나에게 삶에 대한 새로운 시각을 주었다.' },
    { w: 'common', m: '공통의; 흔한', ex: 'We have a common goal: a cleaner school.', exm: '우리에게는 더 깨끗한 학교라는 공통 목표가 있다.' },
    { w: 'suggest', m: '제안하다', ex: 'I suggest that we meet after lunch.', exm: '점심 먹고 만나기를 제안해.' },
    { w: 'compromise', m: '타협(하다), 절충(하다)', ex: 'After a long talk, they reached a compromise.', exm: '긴 대화 끝에 그들은 타협에 이르렀다.' },
    { w: 'convince', m: '설득하다, 확신시키다', ex: 'He convinced me to join the club.', exm: '그는 나를 설득해 동아리에 들게 했다.' },
  ],
});
})();
