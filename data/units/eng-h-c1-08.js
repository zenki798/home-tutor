/* 공통영어1 · 논리적 관계와 연결어
 * 지문·예문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 두 빈칸 지문 (직접 쓴 글)
  var PLASTIC = 'Many people think that recycling alone can solve the plastic problem. (A) [[blank]], only a small part of plastic waste is actually recycled. Most of it ends up in landfills or the ocean. (B) [[blank]], reducing the amount of plastic we use is even more important than recycling.';
  var SLEEP = 'Teenagers need about eight to ten hours of sleep a night. (A) [[blank]], many students sleep less than seven hours because of homework and phones. Lack of sleep can cause serious problems. (B) [[blank]], it can make it hard to focus in class and weaken the body\'s defense against colds.';
  var WARM = 'Last winter was unusually warm in our area.';

Tutor.registerUnit({
  id: 'eng-h-c1-08',
  course: 'eng-h-c1',
  title: '논리적 관계와 연결어',
  summary: '원인과 결과, 대조, 예시, 조건처럼 문장과 문장 사이의 논리적 관계를 연결어로 파악합니다.',
  goals: [
    '원인·결과, 대조·양보, 예시·다시 말하기, 첨가·강조를 나타내는 연결어의 뜻과 쓰임을 구별할 수 있다.',
    'unless, as long as, provided that, in case 같은 조건 접속사의 뜻을 알고 문장을 해석할 수 있다.',
    '앞뒤 문장의 논리적 관계를 파악해 빈칸에 알맞은 연결어를 고를 수 있다.',
  ],
  standards: ['[10공영1-01-04]'],

  concepts: [
    {
      title: '원인과 결과: because of, as a result, therefore',
      body: '앞 문장이 **원인**이고 뒤 문장이 그 **결과**일 때 쓰는 연결어입니다.\n\n| 연결어 | 뜻 | 뒤에 오는 말 |\n|---|---|---|\n| **because** | ~ 때문에 | 주어 + 동사 (접속사) |\n| **because of** / **due to** | ~ 때문에 | 명사(구) (전치사) |\n| **As a result**, | 그 결과 | 문장 |\n| **Therefore**, | 그러므로, 따라서 | 문장 |\n\nThe game was canceled **because** it rained heavily. (주어 + 동사)\nThe game was canceled **because of** the heavy rain. (명사구)\nIt rained heavily. **As a result**, the game was canceled.\n\n> 💡 because는 원인 **앞**에, as a result·therefore는 결과 **앞**에 붙습니다. 연결어가 붙은 쪽이 원인인지 결과인지 먼저 확인합니다.\n\n> ⚠️ because 뒤에 명사만 오면 틀립니다. because the heavy rain (✗) → because of the heavy rain (○)',
      easy: '도미노를 떠올려 보십시오. 첫 도미노(원인)가 넘어지면 다음 도미노(결과)가 넘어집니다.\n\n- **because (of)** 는 첫 도미노에 붙이는 이름표: "이것 때문에"\n- **As a result / Therefore** 는 두 번째 도미노에 붙이는 이름표: "그래서 이렇게 됐다"\n\n빈칸 뒤 문장이 앞 문장 때문에 생긴 일이면 Therefore나 As a result입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nThe flight was delayed [[blank]] the thick fog.',
        choices: ['because of', 'because', 'therefore'],
        answer: 0,
        why: ['', 'because는 접속사라서 뒤에 주어 + 동사가 와야 합니다. the thick fog는 명사구입니다.', 'therefore는 결과 문장 앞에 쓰는 말입니다. 짙은 안개는 원인입니다.'],
        explain: '빈칸 뒤 the thick fog는 **명사구**이고 지연의 원인이므로 전치사 **because of**를 씁니다.',
      },
    },
    {
      title: '대조와 양보: however, on the other hand, nevertheless',
      body: '앞 문장과 **반대되거나 예상과 다른** 내용이 이어질 때 쓰는 연결어입니다.\n\n| 연결어 | 뜻 | 쓰임 |\n|---|---|---|\n| **However**, | 그러나 | 앞 내용과 반대되는 말을 이을 때 (가장 넓게 쓰임) |\n| **On the other hand**, | 반면에, 다른 한편으로 | **두 대상·두 측면**을 맞대어 비교할 때 |\n| **Nevertheless**, | 그럼에도 불구하고 | 앞 내용으로 보아 **예상과 다른 결과**가 나올 때 |\n| **although** / **even though** | 비록 ~이지만 | 접속사 (뒤에 주어 + 동사) |\n\nMy brother loves sports. **On the other hand**, I prefer reading books. (두 사람 비교)\nThe test was very difficult. **Nevertheless**, Jia got a perfect score. (어려웠는데도 만점)\n**Although** the test was very difficult, Jia got a perfect score.\n\n> 💡 Nevertheless 자리에는 대개 However도 들어갈 수 있습니다. 그러나 On the other hand는 "비교할 두 쪽"이 있어야 자연스럽습니다.',
      easy: '대조 연결어는 길의 **유턴 표지판**입니다. 앞 문장이 "오른쪽"으로 가다가 연결어 뒤에서 "왼쪽"으로 방향을 틀면 However 계열이 들어갑니다.\n\n- 형과 나처럼 **두 사람을 저울에 올려 비교** → On the other hand\n- "비가 왔다. 그런데도 소풍을 갔다"처럼 **예상을 뒤집음** → Nevertheless',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nSeojun practiced very hard for the race. [[blank]], he finished last.',
        choices: ['Nevertheless', 'Therefore', 'For example'],
        answer: 0,
        why: ['', '열심히 연습한 결과로 꼴찌를 한 것이 아닙니다. 예상과 반대되는 결과입니다.', '꼴찌를 한 것은 열심히 연습한 것의 예가 아닙니다.'],
        explain: '열심히 연습했으니 좋은 결과를 예상했지만 꼴찌를 했습니다. 예상과 다른 결과이므로 **Nevertheless**(그럼에도 불구하고)가 알맞습니다.',
      },
    },
    {
      title: '예시와 다시 말하기: for example, in other words',
      body: '앞 문장의 내용을 **구체적인 예**로 보여 주거나, **다른 말로 쉽게 바꾸어** 말할 때 쓰는 연결어입니다.\n\n| 연결어 | 뜻 | 뒤 문장의 내용 |\n|---|---|---|\n| **For example**, / **For instance**, | 예를 들어 | 앞의 일반적인 말에 해당하는 **구체적인 사례** |\n| **In other words**, / **That is**, | 다시 말해, 즉 | 앞의 말을 **같은 뜻의 다른 표현**으로 |\n\nMany fruits are rich in vitamin C. **For example**, oranges and kiwis contain a lot of it.\nThe museum is free for everyone. **In other words**, you don\'t have to pay to enter.\n\n둘을 구별하는 방법: 뒤 문장이 앞 문장보다 **좁고 구체적**이면(과일 → 오렌지·키위) For example, 앞 문장과 **같은 넓이의 같은 뜻**이면(무료 → 돈을 안 내도 됨) In other words입니다.',
      easy: '"동물을 좋아해요"라고 말한 친구에게 "예를 들면?" 하고 물으면 "강아지랑 고양이요"라고 답하지요. 이것이 **For example**입니다.\n\n"그러니까 무슨 말이야?" 하고 물으면 같은 말을 쉽게 바꿔 말합니다. 이것이 **In other words**입니다. 예시는 "골라 보여 주기", 다시 말하기는 "바꿔 말하기"입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nThere are many ways to save water at home. [[blank]], you can turn off the tap while brushing your teeth.',
        choices: ['For example', 'In other words', 'However'],
        answer: 0,
        why: ['', '뒤 문장은 앞 문장을 같은 뜻으로 바꾼 말이 아니라, 물을 아끼는 여러 방법 가운데 하나를 든 것입니다.', '두 문장은 반대되는 내용이 아닙니다.'],
        explain: '"물을 아끼는 많은 방법" 가운데 하나(양치할 때 수도꼭지 잠그기)를 **구체적인 예**로 들었으므로 **For example**입니다.',
      },
    },
    {
      title: '첨가와 강조: moreover, in addition, in fact',
      body: '앞 문장과 **같은 방향의 내용을 더하거나**, 더 강하게 **강조**할 때 쓰는 연결어입니다.\n\n| 연결어 | 뜻 | 쓰임 |\n|---|---|---|\n| **Moreover**, / **Furthermore**, | 게다가, 더욱이 | 같은 방향의 근거·정보를 하나 더 |\n| **In addition**, / **Besides**, | 덧붙여, 그 밖에 | 같은 방향의 정보를 하나 더 |\n| **In fact**, | 사실은, 실제로 | 앞 말을 **더 강하게** 뒷받침하거나, 앞의 생각을 **바로잡을 때** |\n\nThis bike is very light. **Moreover**, it is cheaper than the others. (장점 + 장점)\nWalking is good for your heart. **In addition**, it helps reduce stress.\nKoalas sleep a lot. **In fact**, they can sleep more than 18 hours a day. (더 강한 사실로 뒷받침)\n\n> 💡 In fact는 "그렇게 생각하겠지만 사실은"처럼 **앞 내용을 바로잡는** 데도 씁니다. People think the desert is always hot. **In fact**, it can be very cold at night.',
      easy: '첨가 연결어는 **장바구니에 하나 더 담기**입니다. 앞 문장에서 장점 하나를 담았는데 뒤에 장점이 하나 더 나오면 Moreover, In addition입니다.\n\n**In fact**는 "놀라지 마세요, 진짜로는 이 정도예요"라고 숫자나 사실로 앞 말에 힘을 실어 줄 때 씁니다.',
      check: {
        type: 'ox',
        q: '"This restaurant is clean. Moreover, the food is delicious."에서 Moreover는 앞 내용과 반대되는 내용을 이끈다.',
        answer: false,
        explain: '깨끗하다(장점)와 음식이 맛있다(장점)는 같은 방향입니다. **Moreover**는 반대가 아니라 같은 방향의 내용을 **더할** 때 씁니다. 반대 내용이면 However를 씁니다.',
      },
    },
    {
      title: '조건을 나타내는 접속사: unless, as long as, provided that, in case',
      body: '이 말들은 문장과 문장을 잇는 **접속사**라서 뒤에 **주어 + 동사**가 옵니다.\n\n| 접속사 | 뜻 | 바꿔 쓰기 |\n|---|---|---|\n| **unless** | ~하지 않으면 | = if ~ not |\n| **as long as** | ~하기만 하면, ~하는 한 | = only if |\n| **provided (that)** | ~라는 조건으로, ~한다면 | = only if (격식 있는 말) |\n| **in case** | ~할 경우에 대비해서 | 혹시 일어날 일을 미리 준비할 때 |\n\nYou will miss the bus **unless** you hurry. (= if you don\'t hurry)\nYou can borrow my bike **as long as** you return it by six.\nTake an umbrella **in case** it rains. (비가 올 때를 대비해 우산을 가져가라)\n\n> ⚠️ unless에는 이미 not의 뜻이 들어 있으므로 뒤에 not을 또 쓰지 않습니다. unless it doesn\'t rain (✗)\n\n> 💡 조건을 나타내는 절에서는 미래의 일도 **현재 시제**로 씁니다. unless it **rains** tomorrow (○) / unless it will rain (✗)',
      easy: '조건 접속사는 **문 앞의 안내문**과 같습니다.\n\n- **unless**: "표가 없으면 들어올 수 없습니다" — 부정의 조건\n- **as long as / provided that**: "조용히 하기만 하면 들어와도 됩니다" — 지키기만 하면 되는 조건\n- **in case**: "비가 올지 모르니 우산을 챙기세요" — 혹시 모를 일에 대한 대비',
      check: {
        type: 'choice',
        q: '다음 문장과 뜻이 같은 것은 무엇입니까?\n\nUnless you hurry, you will be late.',
        choices: ['If you don\'t hurry, you will be late.', 'If you hurry, you will be late.', 'Because you hurry, you will be late.'],
        answer: 0,
        why: ['', 'unless는 if ~ not의 뜻입니다. not을 빠뜨리면 "서두르면 늦을 것이다"가 되어 뜻이 반대가 됩니다.', 'unless는 이유가 아니라 조건(~하지 않으면)을 나타냅니다.'],
        explain: '**unless = if ~ not**이므로 "서두르지 않으면 늦을 것이다", If you don\'t hurry, you will be late. 와 같습니다.',
      },
    },
    {
      title: '빈칸에 알맞은 연결어 고르기',
      body: '연결어 빈칸 문제는 연결어의 뜻을 외우는 것보다 **앞뒤 문장의 관계**를 먼저 파악하는 것이 핵심입니다.\n\n1. 빈칸 **앞 문장**과 **뒤 문장**을 각각 한 줄로 줄입니다.\n2. 두 문장의 관계를 정합니다.\n\n| 관계 | 질문 | 연결어 |\n|---|---|---|\n| 원인 → 결과 | 뒤가 앞 때문에 생긴 일인가? | Therefore, As a result |\n| 반대·예상과 다름 | 방향이 바뀌는가? | However, Nevertheless, On the other hand |\n| 일반 → 구체 | 뒤가 앞의 사례인가? | For example |\n| 같은 뜻 바꿔 말하기 | 뒤가 앞을 쉽게 바꾼 말인가? | In other words |\n| 같은 방향 더하기 | 뒤가 앞과 같은 쪽의 정보를 더하는가? | Moreover, In addition |\n\n3. 고른 연결어를 넣고 처음부터 읽어 **말이 되는지** 확인합니다.\n\n> 💡 빈칸이 두 개인 문제는 확실한 빈칸 하나를 먼저 정해 보기를 줄인 뒤 나머지를 봅니다.\n\n> ⚠️ However, Therefore 같은 연결어는 **접속사가 아니라 부사**입니다. 두 문장을 하나로 잇지 못하므로 앞에 마침표(또는 세미콜론)를 찍고 새 문장을 시작합니다. It was cold**. However,** we went out.',
      easy: '연결어 빈칸은 **교통 표지판 고르기**입니다. 앞 문장에서 뒤 문장으로 가는 길이 어떤 모양인지 보십시오.\n\n- 곧게 이어지고 결과에 도착한다 → Therefore\n- 유턴한다 → However\n- 큰길에서 골목 하나로 들어간다 → For example\n- 같은 길에 차선이 하나 더 생긴다 → Moreover\n\n길 모양을 먼저 정하고 표지판을 고르면 실수가 줄어듭니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nHayun forgot to set her alarm. [[blank]], she was late for school.',
        choices: ['As a result', 'However', 'In other words'],
        answer: 0,
        why: ['', '알람을 맞추지 않은 것과 지각한 것은 반대 방향이 아니라 원인과 결과입니다.', '지각한 것은 알람을 맞추지 않았다는 말을 바꿔 말한 것이 아니라, 그 결과입니다.'],
        explain: '알람을 맞추지 않았다(원인) → 지각했다(결과)이므로 **As a result**(그 결과)가 알맞습니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글의 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것을 고르십시오.\n\n' + PLASTIC,
      steps: [
        '(A) 앞: 많은 사람이 재활용만으로 플라스틱 문제를 해결할 수 있다고 생각한다. (A) 뒤: 실제로 재활용되는 것은 일부뿐이다. → 사람들의 생각과 **반대되는** 사실이므로 **However**.',
        '(B) 앞: 대부분의 플라스틱은 매립지나 바다로 간다. (B) 뒤: 그러니 사용량을 줄이는 것이 재활용보다 더 중요하다. → 앞 내용에서 끌어낸 **결론**이므로 **Therefore**.',
        '넣어서 다시 읽어 봅니다: ~ can solve the plastic problem. However, only a small part ~. Therefore, reducing ~ is even more important. 말이 자연스럽게 이어집니다.',
      ],
      answer: '(A) However – (B) Therefore',
    },
    {
      q: '다음 문장을 unless를 써서 같은 뜻으로 바꾸어 보십시오.\n\nIf you don\'t water the plant, it will die.',
      steps: [
        'unless는 **if ~ not**과 같은 뜻입니다.',
        'If you don\'t water ~ 에서 If와 don\'t를 함께 unless로 바꿉니다. not은 다시 쓰지 않습니다.',
        '동사는 현재 시제 그대로 둡니다(조건을 나타내는 절): Unless you water the plant, it will die.',
      ],
      answer: 'Unless you water the plant, it will die.',
    },
  ],

  terms: [
    { term: '연결어', def: '문장과 문장 사이의 논리적 관계(원인·결과, 대조, 예시 등)를 보여 주는 말입니다. 예: However, Therefore, For example' },
    { term: '원인과 결과', def: '어떤 일이 일어난 까닭(원인)과 그 때문에 생긴 일(결과)의 관계입니다. 연결어: because (of), As a result, Therefore' },
    { term: '대조', def: '두 대상이나 내용의 다른 점을 맞대어 보이는 관계입니다. 연결어: However, On the other hand' },
    { term: '양보', def: '앞 내용으로 보아 예상되는 것과 다른 결과가 이어지는 관계입니다. 연결어: Nevertheless, although, even though' },
    { term: '예시', def: '앞의 일반적인 말에 해당하는 구체적인 사례를 드는 관계입니다. 연결어: For example, For instance' },
    { term: '다시 말하기', def: '앞의 말을 같은 뜻의 다른 표현으로 바꾸어 말하는 관계입니다. 연결어: In other words, That is' },
    { term: '첨가', def: '앞 내용과 같은 방향의 정보를 더하는 관계입니다. 연결어: Moreover, In addition, Besides' },
    { term: '조건 접속사', def: '조건을 나타내며 두 절을 잇는 접속사입니다. 예: unless(~하지 않으면), as long as(~하기만 하면), in case(~할 경우에 대비해)' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nIt snowed heavily all night. [[blank]], all the schools in the city were closed the next day.',
      choices: ['As a result', 'However', 'For example', 'In other words'],
      answer: 0,
      why: ['', '눈이 많이 온 것과 휴교는 반대 내용이 아니라 원인과 결과입니다.', '휴교는 눈이 온 것의 예가 아니라 눈 때문에 생긴 결과입니다.', '휴교는 앞 문장을 바꿔 말한 것이 아닙니다.'],
      explain: '밤새 눈이 많이 왔다(원인) → 다음 날 휴교했다(결과)이므로 **As a result**(그 결과)가 알맞습니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오.\n\nThe soccer game was canceled because [[blank]] the heavy rain.',
      answer: ['of'],
      wrong: [{ a: 'for', why: 'because 뒤에 명사구가 올 때는 because of로 씁니다. because for 는 쓰지 않습니다.' }, { a: 'to', why: '"~ 때문에"는 because of 또는 due to입니다. because to 는 쓰지 않습니다.' }],
      explain: 'the heavy rain은 명사구이므로 전치사 **because of**를 씁니다. 빈칸에는 **of**가 들어갑니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nMinsu enjoys outdoor sports like hiking and soccer. [[blank]], his twin sister prefers to stay home and paint.',
      choices: ['On the other hand', 'Therefore', 'For example', 'As a result'],
      answer: 0,
      why: ['', '쌍둥이 여동생의 취미는 민수의 취미 때문에 생긴 결과가 아닙니다.', '여동생의 취미는 민수의 취미의 예가 아닙니다.', '두 사람의 취미는 원인과 결과의 관계가 아닙니다.'],
      explain: '민수(야외 운동)와 쌍둥이 여동생(집에서 그림)을 **맞대어 비교**하므로 **On the other hand**(반면에)가 알맞습니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nSome animals change their color to stay safe. [[blank]], a chameleon can turn green or brown to match its surroundings.',
      choices: ['For example', 'However', 'Nevertheless', 'Therefore'],
      answer: 0,
      why: ['', '카멜레온 이야기는 앞 내용과 반대가 아니라 같은 내용의 사례입니다.', '예상과 다른 결과가 이어지는 문장이 아닙니다.', '카멜레온의 색 바꾸기는 앞 문장의 결과가 아니라 사례입니다.'],
      explain: '"색을 바꾸는 동물들"의 구체적인 사례로 카멜레온을 들었으므로 **For example**입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nThe concert hall allows no food or drinks inside. [[blank]], you have to finish your snacks before you enter.',
      choices: ['In other words', 'On the other hand', 'For example', 'Nevertheless'],
      answer: 0,
      why: ['', '두 문장은 맞대어 비교하는 두 대상이 아니라 같은 규칙입니다.', '간식을 다 먹고 들어가야 한다는 것은 규칙의 여러 사례 가운데 하나가 아니라, 규칙 자체를 쉽게 풀어 쓴 말입니다.', '예상과 다른 결과가 아닙니다.'],
      explain: '"안에 음식을 가지고 들어갈 수 없다"를 "간식은 들어가기 전에 다 먹어야 한다"로 **바꿔 말했으므로** **In other words**(다시 말해)입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nRiding a bike to school is good for your health. [[blank]], it saves money on bus fares.',
      choices: ['In addition', 'However', 'In other words', 'For example'],
      answer: 0,
      why: ['', '건강에 좋다(장점)와 돈을 아낀다(장점)는 반대가 아닙니다.', '돈을 아낀다는 것은 건강에 좋다는 말을 바꾼 것이 아닙니다. 다른 장점입니다.', '버스비를 아끼는 것은 건강에 좋은 것의 예가 아닙니다.'],
      explain: '자전거 통학의 장점(건강) 뒤에 또 다른 장점(돈 절약)을 **더했으므로** **In addition**(덧붙여)입니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 4,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 한 낱말을 쓰십시오.\n\nIf you don\'t leave now, you will miss the train.\n= [[blank]] you leave now, you will miss the train.',
      answer: ['unless'],
      wrong: [{ a: 'if', why: 'If you leave now, you will miss the train. 은 "지금 떠나면 기차를 놓친다"로 뜻이 반대가 됩니다. if ~ not을 한 낱말로 쓰면 unless입니다.' }, { a: 'until', why: 'until은 "~할 때까지"라는 뜻입니다. "~하지 않으면"은 unless입니다.' }],
      explain: '**unless = if ~ not**입니다. Unless you leave now, you will miss the train. (지금 떠나지 않으면 기차를 놓칠 것이다)',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 4,
      q: 'Unless it doesn\'t rain tomorrow, we will go hiking. 은 "내일 비가 오지 않으면 하이킹을 갈 것이다"라는 뜻의 바른 문장이다.',
      answer: false,
      explain: 'unless에는 이미 not의 뜻이 들어 있으므로 doesn\'t를 또 쓰면 안 됩니다. 바른 문장은 **Unless it rains** tomorrow, we will go hiking. 입니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      hint: '우산을 가져가는 것은 비가 올지도 모르는 일에 대한 준비입니다.',
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nThe sky is clear now, but take an umbrella [[blank]] it rains later.',
      choices: ['in case', 'unless', 'because of', 'as long as'],
      answer: 0,
      why: ['', '"비가 오지 않으면 우산을 가져가라"가 되어 말이 맞지 않습니다.', 'because of 뒤에는 명사(구)가 옵니다. it rains는 주어 + 동사입니다.', '"비가 오기만 하면 우산을 가져가라"는 지금 챙기라는 말과 어울리지 않습니다.'],
      explain: '혹시 나중에 비가 올 **경우에 대비해서** 우산을 가져가라는 뜻이므로 **in case**입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nYou can use my laptop [[blank]] you return it by Friday.',
      choices: ['as long as', 'unless', 'in case', 'because of'],
      answer: 0,
      why: ['', '"금요일까지 돌려주지 않으면 써도 된다"가 되어 말이 맞지 않습니다.', '돌려주는 것은 대비할 일이 아니라 지켜야 할 조건입니다.', 'because of 뒤에는 명사(구)가 옵니다.'],
      explain: '"금요일까지 돌려주기**만 하면** 써도 된다"는 조건이므로 **as long as**입니다. provided that을 써도 같은 뜻입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 1,
      hint: '앞 문장으로 예상되는 결과와 뒤 문장이 같은지 다른지 보십시오.',
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nThe hiking trail was steep and slippery after the rain. [[blank]], the children reached the top without any trouble.',
      choices: ['Nevertheless', 'Therefore', 'In other words', 'Moreover'],
      answer: 0,
      why: ['', '길이 가파르고 미끄러웠던 것 때문에 쉽게 오른 것이 아닙니다. 예상과 반대입니다.', '쉽게 정상에 오른 것은 길이 험했다는 말을 바꾼 것이 아닙니다.', '험한 길과 쉽게 오른 것은 같은 방향의 내용이 아닙니다.'],
      explain: '길이 가파르고 미끄러웠으니 오르기 힘들 것이라 예상되지만, 아이들은 문제없이 정상에 올랐습니다. **예상과 다른 결과**이므로 **Nevertheless**입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      hint: '확실한 빈칸 하나를 먼저 정하고 보기를 줄이십시오.',
      q: '다음 글의 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + SLEEP,
      choices: ['(A) However – (B) For example', '(A) Therefore – (B) For example', '(A) However – (B) Nevertheless', '(A) Moreover – (B) In other words'],
      answer: 0,
      why: ['', '(A) 잠이 8~10시간 필요한데 7시간도 못 잔다는 것은 결과가 아니라 반대되는 현실입니다.', '(B) 집중하기 어렵고 감기에 약해지는 것은 "심각한 문제"의 사례입니다. 예상과 다른 결과가 아닙니다.', '(A) 필요한 수면과 실제 수면은 같은 방향의 내용이 아닙니다.'],
      explain: '(A) 필요한 수면 시간(8~10시간)과 **반대되는** 현실(7시간 미만) → **However**. (B) "심각한 문제"의 **구체적인 사례**(집중이 어려움, 감기에 약해짐) → **For example**.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 5,
      hint: '(A) 앞뒤가 같은 방향인지 반대 방향인지, (B) 뒤가 결론인지 보십시오.',
      q: '다음 글의 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + PLASTIC,
      choices: ['(A) However – (B) Therefore', '(A) For example – (B) Therefore', '(A) However – (B) For example', '(A) Moreover – (B) Nevertheless'],
      answer: 0,
      why: ['', '(A) 일부만 재활용된다는 사실은 사람들의 생각을 뒷받침하는 예가 아니라 반대되는 사실입니다.', '(B) 사용량을 줄이는 것이 더 중요하다는 말은 앞 내용의 사례가 아니라 결론입니다.', '(A) 사람들의 생각과 실제 사실은 같은 방향이 아닙니다.'],
      explain: '(A) "재활용만으로 해결된다"는 생각과 **반대되는** 사실(일부만 재활용됨) → **However**. (B) 대부분이 매립지·바다로 간다는 사실에서 끌어낸 **결론**(사용을 줄이는 것이 더 중요) → **Therefore**.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 수 **없는** 것은 무엇입니까?\n\nThe city library was closed for repairs last week. [[blank]], many students studied at the community center instead.',
      choices: ['In other words', 'Therefore', 'As a result', 'For this reason'],
      answer: 0,
      why: ['', 'Therefore는 결과 앞에 쓰므로 들어갈 수 있습니다.', 'As a result는 결과 앞에 쓰므로 들어갈 수 있습니다.', 'For this reason(이런 이유로)도 결과 앞에 쓰므로 들어갈 수 있습니다.'],
      explain: '도서관이 문을 닫았다(원인) → 학생들이 주민 센터에서 공부했다(결과)이므로 Therefore, As a result, For this reason은 모두 들어갈 수 있습니다. 뒤 문장은 앞 문장을 바꿔 말한 것이 아니므로 **In other words**(다시 말해)는 들어갈 수 없습니다.',
    },
    {
      id: 'a3', level: 3, type: 'order', concept: 5,
      q: '연결어를 단서로 하여 글의 흐름에 맞게 문장을 놓으십시오.',
      choices: [
        WARM,
        'As a result, there was very little snow in the mountains.',
        'Because of this, the ski resort had to close early.',
        'In fact, it was open for only three weeks.',
      ],
      answer: [0, 1, 2, 3],
      hint: '각 문장의 연결어가 무엇을 가리키는지(원인·결과·강조) 생각하십시오.',
      explain: '따뜻한 겨울(원인) → **As a result**, 산에 눈이 거의 없었다(결과) → **Because of this**(눈이 적은 것 때문에), 스키장이 일찍 문을 닫았다 → **In fact**, 겨우 3주만 열었다(일찍 닫았다는 말을 구체적인 사실로 강조).',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 문장과 뜻이 같은 것은 무엇입니까?\n\nYou cannot enter the museum unless you have a ticket.',
      choices: [
        'If you don\'t have a ticket, you cannot enter the museum.',
        'If you have a ticket, you cannot enter the museum.',
        'You can enter the museum in case you don\'t have a ticket.',
        'As long as you don\'t have a ticket, you can enter the museum.',
      ],
      answer: 0,
      why: ['', 'not을 빠뜨려 "표가 있으면 들어갈 수 없다"는 반대 뜻이 되었습니다.', 'in case는 "~할 경우에 대비해서"입니다. 표가 없을 때를 대비해 들어갈 수 있다는 말은 뜻이 통하지 않습니다.', '"표가 없기만 하면 들어갈 수 있다"로 원래 문장과 정반대입니다.'],
      explain: '**unless = if ~ not**이므로 "표가 없으면 박물관에 들어갈 수 없다", If you don\'t have a ticket, you cannot enter the museum. 과 같습니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 5,
      hint: '각 문장에서 연결어 앞뒤의 관계를 하나씩 따져 보십시오.',
      q: '연결어가 문맥에 **알맞지 않게** 쓰인 것은 무엇입니까?',
      choices: [
        'Jiho is very shy. Therefore, he loves to speak in front of large crowds.',
        'This phone is cheap. Moreover, its battery lasts for two days.',
        'The road was icy. As a result, many cars moved slowly.',
        'Some birds cannot fly. For example, penguins use their wings to swim.',
      ],
      answer: 0,
      why: ['', '값이 싸다(장점)에 배터리가 오래간다(장점)를 더했으므로 Moreover가 알맞습니다.', '길이 얼었다(원인) → 차들이 천천히 움직였다(결과)이므로 As a result가 알맞습니다.', '날지 못하는 새의 사례로 펭귄을 들었으므로 For example이 알맞습니다.'],
      explain: '수줍음이 많다는 것과 많은 사람 앞에서 말하기를 좋아한다는 것은 원인과 결과가 아니라 **예상과 반대**입니다. Therefore 대신 **However**나 **Nevertheless**를 써야 합니다.',
    },
  ],

  deeper: [
    {
      title: '연결어는 글쓴이의 생각을 알려 주는 신호등',
      body: '글을 빨리 읽어야 할 때 연결어는 아주 좋은 신호입니다. **However**, **Nevertheless** 뒤에는 글쓴이가 진짜 하고 싶은 말(주장·반전)이 오는 경우가 많고, **Therefore**, **As a result** 뒤에는 결론이 옵니다. 반면 **For example** 뒤는 앞 내용을 뒷받침하는 사례이므로, 시간이 없으면 가볍게 읽어도 흐름을 놓치지 않습니다.\n\n주제를 찾는 문제에서 "많은 사람들은 ~라고 생각한다. However, ~" 꼴의 글은 However 뒤가 주제인 경우가 많습니다. 이 단원에서 익힌 연결어는 다음 과정에서 배우는 "글의 흐름과 연결 고리", "주장과 근거 파악하기"의 바탕이 됩니다.',
    },
    {
      title: '접속사와 접속부사는 문장 부호가 다르다',
      body: 'because, although, unless 같은 **접속사**는 두 절을 한 문장으로 묶습니다. Although it was cold, we went out.\n\n반면 however, therefore, moreover 같은 **접속부사**는 뜻으로만 두 문장을 이어 줄 뿐 문법적으로 묶지는 못합니다. 그래서 It was cold, however we went out. 처럼 쉼표만으로 두 문장을 붙이면 영어 글쓰기에서는 틀린 문장으로 봅니다. 마침표로 나누거나(It was cold. However, we went out.) 세미콜론을 씁니다(It was cold; however, we went out.).\n\n뜻이 비슷한 although와 however, because와 therefore가 문장 안에서 서로 다른 자리에 오는 까닭이 여기에 있습니다.',
    },
  ],

  faq: [
    {
      q: 'However랑 On the other hand는 아무 데나 바꿔 써도 돼요?',
      a: '항상 그렇지는 않습니다. However는 앞 내용과 반대되는 말이면 넓게 쓰지만, On the other hand는 **두 대상이나 두 측면을 맞대어 비교**할 때 자연스럽습니다. "형은 운동을 좋아한다. On the other hand, 나는 책을 좋아한다."처럼 비교할 두 쪽이 있어야 합니다. "열심히 공부했다. 그런데 떨어졌다."처럼 예상이 뒤집히는 경우에는 However나 Nevertheless가 더 알맞습니다.',
    },
    {
      q: 'because랑 because of는 어떻게 구별해요?',
      a: '뒤에 오는 말을 보면 됩니다. **주어 + 동사**가 오면 because(접속사), **명사(구)**가 오면 because of(전치사)입니다. because it rained / because of the rain. 시험에서는 빈칸 뒤에 동사가 있는지부터 확인하십시오.',
    },
    {
      q: 'unless 뒤에 not을 쓰면 왜 틀려요?',
      a: 'unless 자체가 "if ~ not(~하지 않으면)"이라는 뜻이라서, 뒤에 not을 또 쓰면 부정이 두 번 들어가 뜻이 꼬입니다. Unless you hurry = If you don\'t hurry 입니다. Unless you don\'t hurry 는 쓰지 않습니다.',
    },
    {
      q: 'in case는 if랑 같은 뜻 아니에요?',
      a: '다릅니다. Take an umbrella **if** it rains 는 "비가 오면 (그때) 우산을 가져가라"이고, Take an umbrella **in case** it rains 는 "비가 올 경우에 **대비해서** (지금) 우산을 가져가라"입니다. in case는 혹시 일어날지 모르는 일을 미리 준비하는 뜻입니다.',
    },
  ],

  mistakes: [
    '연결어의 뜻만 보고 고르는 실수 — 먼저 빈칸 앞뒤 문장을 한 줄로 줄여 관계(원인·결과, 반대, 사례, 같은 뜻, 더하기)를 정한 뒤 연결어를 고릅니다.',
    'because 뒤에 명사만 쓰거나(because the rain), unless 뒤에 not을 또 쓰는(unless it doesn\'t rain) 실수 — because of + 명사, unless + 긍정문으로 씁니다.',
    'For example과 In other words를 헷갈리는 실수 — 뒤 문장이 앞보다 좁은 구체적인 사례이면 For example, 같은 내용을 바꿔 말하면 In other words입니다.',
  ],

  gens: [
    {
      id: 'choose-connector',
      level: 2,
      title: '앞뒤 문장의 관계를 보고 연결어 고르기',
      make: function (R) {
        var cats = {
          result: { name: '원인 → 결과', words: ['Therefore', 'As a result'], wrongWhy: '뒤 문장은 앞 문장 때문에 생긴 결과가 아닙니다.' },
          contrast: { name: '반대(대조)', words: ['However'], wrongWhy: '두 문장은 서로 반대되는 내용이 아닙니다.' },
          example: { name: '일반 → 구체적인 사례', words: ['For example', 'For instance'], wrongWhy: '뒤 문장은 앞 문장의 구체적인 사례가 아닙니다.' },
          addition: { name: '같은 방향의 정보 더하기', words: ['Moreover', 'In addition'], wrongWhy: '뒤 문장은 앞 문장과 같은 방향의 정보를 더하는 내용이 아닙니다.' },
        };
        var items = [
          { c: 'result', a: 'Jiwoo practiced the piano every day for a year.', b: 'she won first prize at the school contest.', why: '1년 동안 매일 연습한 것(원인) 덕분에 대회에서 1등을 했습니다(결과).' },
          { c: 'result', a: 'The road was covered with ice.', b: 'many cars moved very slowly.', why: '길이 얼었기(원인) 때문에 차들이 천천히 움직였습니다(결과).' },
          { c: 'result', a: 'Hayun forgot to set her alarm.', b: 'she was late for school.', why: '알람을 맞추지 않아서(원인) 지각했습니다(결과).' },
          { c: 'result', a: 'The bakery ran out of flour in the morning.', b: 'it could not make any more bread that day.', why: '아침에 밀가루가 다 떨어졌기(원인) 때문에 그날은 빵을 더 만들 수 없었습니다(결과).' },
          { c: 'contrast', a: 'Many people think that cats hate water.', b: 'some cats actually enjoy swimming.', why: '고양이는 물을 싫어한다는 생각과 반대로, 수영을 즐기는 고양이도 있습니다.' },
          { c: 'contrast', a: 'The food at the new restaurant was delicious.', b: 'the service was very slow.', why: '음식은 맛있었다(좋은 점)와 서비스가 느렸다(나쁜 점)가 반대됩니다.' },
          { c: 'contrast', a: 'Seojun lives far from school.', b: 'he is never late.', why: '학교에서 멀리 사니 늦을 것 같지만, 반대로 한 번도 늦지 않습니다.' },
          { c: 'contrast', a: 'The old phone had a small screen.', b: 'the new model has a much bigger one.', why: '옛 휴대 전화(작은 화면)와 새 모델(큰 화면)을 반대로 맞대었습니다.' },
          { c: 'example', a: 'There are many ways to save energy at home.', b: 'you can turn off the lights when you leave a room.', why: '"집에서 에너지를 아끼는 많은 방법" 가운데 하나를 구체적으로 들었습니다.' },
          { c: 'example', a: 'Some animals sleep through the winter.', b: 'bears can sleep for several months without eating.', why: '"겨울잠을 자는 동물"의 구체적인 사례로 곰을 들었습니다.' },
          { c: 'example', a: 'Our town has many places for families to enjoy.', b: 'there is a large park with a lake near the station.', why: '"가족이 즐길 만한 곳"의 구체적인 사례로 호수 공원을 들었습니다.' },
          { c: 'example', a: 'Many words in English come from other languages.', b: 'the word "piano" comes from Italian.', why: '"다른 언어에서 온 영어 낱말"의 구체적인 사례로 piano를 들었습니다.' },
          { c: 'addition', a: 'Walking is good for your heart.', b: 'it helps you reduce stress.', why: '심장에 좋다(장점)에 스트레스를 줄여 준다(장점)를 더했습니다.' },
          { c: 'addition', a: 'The museum has a great collection of old maps.', b: 'it offers free tours every weekend.', why: '좋은 지도 소장품(장점)에 주말 무료 안내(장점)를 더했습니다.' },
          { c: 'addition', a: 'Reading builds your vocabulary.', b: 'it helps you understand other people\'s feelings.', why: '어휘력을 키워 준다(장점)에 남의 감정을 이해하게 돕는다(장점)를 더했습니다.' },
          { c: 'addition', a: 'The new bus line is fast.', b: 'it has free Wi-Fi on every bus.', why: '빠르다(장점)에 모든 버스에 무료 와이파이가 있다(장점)를 더했습니다.' },
        ];
        var gloss = { 'Therefore': '그러므로', 'As a result': '그 결과', 'However': '그러나', 'For example': '예를 들어', 'For instance': '예를 들어', 'Moreover': '게다가', 'In addition': '덧붙여' };
        var it = R.pick(items);
        var correct = R.pick(cats[it.c].words);
        var others = ['result', 'contrast', 'example', 'addition'].filter(function (k) { return k !== it.c; });
        var reason = {};
        var wrongs = others.map(function (k) {
          var w = R.pick(cats[k].words);
          reason[w] = w + '(' + gloss[w] + ')' + R.josa(gloss[w], '은/는') + ' ' + cats[k].name + '에 씁니다. ' + cats[k].wrongWhy;
          return w;
        });
        var pick = R.choices(correct, wrongs);
        return {
          type: 'choice', concept: 5,
          q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + it.a + ' [[blank]], ' + it.b,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: it.why + ' 두 문장의 관계는 **' + cats[it.c].name + '**이므로 알맞은 연결어는 **' + correct + '**(' + gloss[correct] + ')입니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'therefore', m: '그러므로, 따라서', ex: 'He was sick. Therefore, he stayed in bed.', exm: '그는 아팠다. 그래서 침대에 누워 있었다.' },
    { w: 'as a result', m: '그 결과', ex: 'She trained hard. As a result, she broke her own record.', exm: '그녀는 열심히 훈련했다. 그 결과 자신의 기록을 깼다.' },
    { w: 'because of', m: '~ 때문에', ex: 'The road was closed because of the snow.', exm: '눈 때문에 도로가 막혔다.' },
    { w: 'however', m: '그러나', ex: 'The plan sounds good. However, it costs too much.', exm: '계획은 좋게 들린다. 그러나 비용이 너무 많이 든다.' },
    { w: 'on the other hand', m: '반면에, 다른 한편으로', ex: 'City life is exciting. On the other hand, it can be stressful.', exm: '도시 생활은 신난다. 반면에 스트레스가 많을 수 있다.' },
    { w: 'nevertheless', m: '그럼에도 불구하고', ex: 'It was raining. Nevertheless, the game went on.', exm: '비가 오고 있었다. 그럼에도 불구하고 경기는 계속되었다.' },
    { w: 'for example', m: '예를 들어', ex: 'Some fruits, for example apples and pears, grow well here.', exm: '사과와 배 같은 몇몇 과일은 이곳에서 잘 자란다.' },
    { w: 'in other words', m: '다시 말해, 즉', ex: 'The shop is closed on weekends. In other words, it opens only on weekdays.', exm: '그 가게는 주말에 닫는다. 다시 말해 평일에만 연다.' },
    { w: 'moreover', m: '게다가, 더욱이', ex: 'The room is large. Moreover, it has a nice view.', exm: '그 방은 넓다. 게다가 경치도 좋다.' },
    { w: 'in addition', m: '덧붙여, 게다가', ex: 'In addition to math, she teaches science.', exm: '그녀는 수학 말고도 과학을 가르친다.' },
    { w: 'in fact', m: '사실은, 실제로', ex: 'It looks easy. In fact, it is very difficult.', exm: '쉬워 보인다. 사실은 매우 어렵다.' },
    { w: 'unless', m: '~하지 않으면', ex: 'You will fail unless you study harder.', exm: '더 열심히 공부하지 않으면 떨어질 것이다.' },
    { w: 'as long as', m: '~하기만 하면, ~하는 한', ex: 'You can stay as long as you keep quiet.', exm: '조용히 하기만 하면 있어도 된다.' },
    { w: 'provided that', m: '~라는 조건으로, ~한다면', ex: 'I will go, provided that you come with me.', exm: '네가 같이 간다면 나도 가겠다.' },
    { w: 'in case', m: '~할 경우에 대비해서', ex: 'Bring some water in case you get thirsty.', exm: '목이 마를 경우에 대비해 물을 가져오세요.' },
    { w: 'logical', m: '논리적인', ex: 'Her answer was clear and logical.', exm: '그녀의 대답은 분명하고 논리적이었다.' },
  ],
});
})();
