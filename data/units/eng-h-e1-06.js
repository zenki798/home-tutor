/* 영어Ⅰ · 요약문 완성하기
 * 지문과 요약문은 모두 직접 쓴 글이다(가상의 상황). 연구 결과를 꾸며 인용하지 않고 일반적인 경향으로만 쓴다. */
(function () {
  // 칭찬의 말 (직접 쓴 글)
  var PRAISE = 'When children are praised for being smart, they may start to avoid difficult tasks. They worry that a failure will show that they are not smart after all. On the other hand, children who are praised for their hard work tend to choose harder problems, because for them a mistake is simply a sign that more work is needed. The words we choose when we praise, therefore, can shape how children face challenges.';
  var PRAISE_SUM = 'Praising children for their (A) rather than their intelligence can make them more willing to take on (B) tasks.';
  // 배고플 때 장보기 (직접 쓴 글)
  var SHOP = 'Have you ever gone grocery shopping on an empty stomach? People who shop before eating tend to buy more food than they planned, and much of it is snacks. Hunger can make high-calorie foods look more attractive, so shoppers may fill their carts without thinking. Eating a light meal before going to the store is a simple way to stick to your shopping list.';
  var SHOP_SUM = 'When people shop while they are (A), they are more likely to make (B) purchases.';
  // 걸으며 하는 회의 (직접 쓴 글)
  var WALK = 'In some companies, workers hold meetings while walking outside instead of sitting in a meeting room. People who try these walking meetings often say that they feel more relaxed and that ideas come to them more easily. Moving the body seems to loosen the mind, and talking side by side, rather than face to face, can make a conversation feel less tense.';
  var WALK_SUM = 'Holding meetings while (A) can help people feel more (B) and think more freely.';
  // 배경 소리와 공부 (직접 쓴 글)
  var NOISE = 'Many people think that a completely silent room is the best place to study. However, for some kinds of work, a little background sound can actually help. A moderate level of sound, like the quiet hum of a cafe, seems to let the mind wander more freely, which is useful for creative tasks such as writing stories or designing posters. For tasks that need careful attention to details, such as checking math problems, silence may still be the better choice.';
  var NOISE_SUM = 'A moderate level of background sound may (A) creative work, but (B) is still better for tasks that require close attention.';
  // 잊어버림의 쓸모 (직접 쓴 글)
  var FORGET = 'We usually think of forgetting as a failure of memory. But forgetting has an important job. If the brain kept every detail of every day, it would be hard to find the information we really need. By letting go of unimportant details, such as what we ate for lunch three weeks ago, the brain makes room for what matters. In this sense, forgetting is not the enemy of memory but its partner.';
  var FORGET_SUM = 'Forgetting is not simply a (A) of memory; it actually helps the brain by (B) details that are not important.';
  // 모둠의 크기 (직접 쓴 글)
  var TEAM = 'When a team grows larger, each member often works less hard. In a small group, everyone\'s contribution is easy to see, so people feel responsible for the result. In a large group, however, individuals may feel that their effort will not be noticed, and they begin to rely on others to do the work. Keeping teams small, or making each person\'s role clear, can prevent this problem.';
  var TEAM_SUM = 'As a group gets (A), its members tend to put in less effort, but this can be prevented by making each person\'s role (B).';
  // 실수를 숨기지 않는 일터 (직접 쓴 글)
  var WORK = 'Workplaces that punish workers for every error can end up with more errors, not fewer. Afraid of blame, workers hide their mistakes instead of reporting them, so the same problems happen again. In contrast, workplaces that treat reported errors as chances to learn discover weak points in their systems early and fix them. Openness about mistakes, rather than fear of them, is what makes a workplace safer.';
  var WORK_SUM = 'Workplaces become safer when mistakes are (A) openly rather than (B) out of fear.';
  // 딱딱해진 빵 (직접 쓴 글)
  var BREAD = 'Many people throw away bread that has become a little hard. However, stale bread can be turned into many tasty dishes, such as French toast, bread pudding, or crunchy croutons for salad. Using old bread this way saves money and reduces food waste.';

  // 상위어 생성기용: [상위어, 우리말, 하위어 4개]
  var HYPER = [
    ['fruit', '과일', ['apples', 'bananas', 'grapes', 'peaches']],
    ['vegetables', '채소', ['carrots', 'onions', 'cabbages', 'potatoes']],
    ['public transportation', '대중교통', ['buses', 'subways', 'trains', 'trams']],
    ['musical instruments', '악기', ['pianos', 'violins', 'drums', 'flutes']],
    ['furniture', '가구', ['chairs', 'desks', 'beds', 'sofas']],
    ['clothing', '옷', ['shirts', 'jeans', 'jackets', 'sweaters']],
    ['sports', '운동 경기', ['soccer', 'tennis', 'basketball', 'baseball']],
    ['languages', '언어', ['Korean', 'English', 'Spanish', 'French']],
    ['planets', '행성', ['Mars', 'Venus', 'Jupiter', 'Saturn']],
    ['insects', '곤충', ['ants', 'bees', 'butterflies', 'mosquitoes']],
    ['occupations', '직업', ['doctors', 'teachers', 'firefighters', 'farmers']],
    ['electronic devices', '전자 기기', ['smartphones', 'laptops', 'tablets', 'televisions']],
    ['emotions', '감정', ['joy', 'anger', 'fear', 'sadness']],
    ['metals', '금속', ['iron', 'copper', 'gold', 'silver']],
    ['birds', '새', ['eagles', 'sparrows', 'owls', 'penguins']],
  ];

  // "부정 + 낱말" → 한 낱말 바꿔 쓰기 생성기용: [본문 표현, 정답, 정답 뜻, [[오답, 오답 뜻] × 3]]
  var NEGPARA = [
    ['not permanent', 'temporary', '일시적인', [['permanent', '영구적인'], ['regular', '규칙적인'], ['important', '중요한']]],
    ['not common', 'rare', '드문', [['common', '흔한'], ['cheap', '값싼'], ['simple', '간단한']]],
    ['not expensive', 'cheap', '값싼', [['expensive', '비싼'], ['rare', '드문'], ['heavy', '무거운']]],
    ['not safe', 'dangerous', '위험한', [['safe', '안전한'], ['careful', '조심하는'], ['strange', '이상한']]],
    ['did not succeed', 'failed', '실패했다', [['succeeded', '성공했다'], ['tried', '시도했다'], ['finished', '끝마쳤다']]],
    ['not similar', 'different', '다른', [['similar', '비슷한'], ['equal', '같은, 동등한'], ['difficult', '어려운']]],
    ['not enough', 'insufficient', '불충분한', [['sufficient', '충분한'], ['efficient', '효율적인'], ['excessive', '지나친']]],
    ['not visible', 'invisible', '보이지 않는', [['visible', '보이는'], ['colorful', '색이 다채로운'], ['clear', '분명한']]],
    ['did not accept', 'rejected', '거절했다', [['accepted', '받아들였다'], ['expected', '기대했다'], ['received', '받았다']]],
    ['not present', 'absent', '결석한, 없는', [['present', '참석한, 있는'], ['late', '늦은'], ['busy', '바쁜']]],
    ['not easy', 'difficult', '어려운', [['easy', '쉬운'], ['different', '다른'], ['simple', '간단한']]],
    ['did not remember', 'forgot', '잊었다', [['remembered', '기억했다'], ['reminded', '상기시켰다'], ['repeated', '반복했다']]],
    ['not complete', 'incomplete', '불완전한', [['complete', '완전한'], ['complex', '복잡한'], ['compact', '작고 촘촘한']]],
    ['did not agree', 'disagreed', '의견이 달랐다', [['agreed', '동의했다'], ['discovered', '발견했다'], ['discussed', '의논했다']]],
    ['not honest', 'dishonest', '정직하지 않은', [['honest', '정직한'], ['modest', '겸손한'], ['nervous', '긴장한']]],
    ['not possible', 'impossible', '불가능한', [['possible', '가능한'], ['impolite', '무례한'], ['important', '중요한']]],
  ];

Tutor.registerUnit({
  id: 'eng-h-e1-06',
  course: 'eng-h-e1',
  title: '요약문 완성하기',
  summary: '요약문을 먼저 읽고 빈칸을 예측한 뒤, 본문 핵심어가 다른 말로 바뀐 표현을 찾아 (A)와 (B)를 채웁니다.',
  goals: [
    '요약문을 먼저 읽고 빈칸에 들어갈 말의 품사와 방향을 예측할 수 있다.',
    '본문의 핵심어가 동의어·반의어·상위어로 바뀐 표현을 찾아 연결할 수 있다.',
    '(A)·(B)의 단서가 있는 부분을 찾고, 선택지의 두 낱말을 모두 확인하여 고를 수 있다.',
    '짧은 글의 요지를 한 문장으로 요약할 수 있다.',
  ],
  standards: ['[12영Ⅰ-01-02]', '[12영Ⅰ-02-04]'],

  concepts: [
    {
      title: '요약문을 먼저 읽고 빈칸 예측하기',
      body: '요약문 완성 문제는 본문 아래의 **요약문 한 문장**에 빈칸 (A)·(B)가 있고, 두 낱말의 짝을 고르는 문제입니다. 요약문은 글의 요지를 한 문장으로 줄인 것이므로, **요약문을 먼저 읽으면** 글이 무엇에 관한 것인지, 무엇을 찾아야 하는지 미리 알 수 있습니다.\n\n' +
        '요약문을 먼저 읽을 때 세 가지를 예측합니다.\n\n' +
        '1. **소재**: 요약문의 주어·핵심 명사가 글의 소재입니다.\n' +
        '2. **품사**: 빈칸 앞뒤의 문법으로 들어갈 말의 품사를 정합니다. (a/the 뒤 → 명사, feel·become 뒤 → 형용사, can 뒤 → 동사원형)\n' +
        '3. **방향**: 빈칸이 "늘다/줄다", "좋다/나쁘다", "돕다/방해하다" 중 어느 쪽인지 앞뒤 낱말로 짐작합니다.\n\n' +
        '예: Holding meetings while (A) can help people feel more (B) and think more freely.\n\n' +
        '- 소재: 회의를 여는 방식 / (A): while 뒤의 -ing 동작 / (B): feel more 뒤의 형용사, think more freely(자유롭게 생각하다)와 같은 좋은 방향\n\n' +
        '> 💡 예측한 내용을 머릿속에 두고 본문을 읽으면, 단서가 나오는 문장에서 눈이 저절로 멈춥니다.',
      easy: '보물찾기를 할 때 "무엇을 찾는지" 먼저 알고 찾으면 훨씬 빠르지요. 요약문은 보물 지도와 같습니다.\n\n' +
        '본문부터 읽으면 모든 문장을 다 기억하려고 애쓰게 됩니다. 요약문을 먼저 읽으면 "회의 방식에 관한 글이고, (B)에는 좋은 기분을 나타내는 형용사가 오겠구나" 하고 찾을 것을 정한 뒤 읽을 수 있습니다.',
      check: {
        type: 'choice',
        q: '요약문의 빈칸 (B)에 들어갈 말의 품사로 알맞은 것은 무엇입니까?\n\nHolding meetings while walking can help people feel more (B).',
        choices: ['형용사', '명사', '부사'],
        answer: 0,
        why: ['', 'feel more 뒤에는 "어떤 기분인지"를 나타내는 보어가 옵니다. 명사가 아니라 형용사입니다.', 'feel은 뒤에 부사가 아니라 형용사 보어를 씁니다. feel happy처럼 씁니다.'],
        explain: 'feel 뒤에는 기분·상태를 나타내는 **형용사** 보어가 옵니다(feel relaxed, feel comfortable). more는 그 형용사를 비교급으로 만드는 말입니다.',
      },
    },
    {
      title: '본문 핵심어와 바꿔 쓴 표현 연결하기',
      body: '요약문은 본문의 낱말을 **그대로 쓰지 않고 다른 말로 바꿔(paraphrase)** 쓰는 것이 원칙입니다. 그래서 본문에 나온 낱말이 선택지에 그대로 있으면 오히려 의심해 봐야 합니다. 바꿔 쓰는 방법은 크게 세 가지입니다.\n\n' +
        '| 바꾸는 방법 | 본문 표현 | 요약문 표현 |\n|---|---|---|\n' +
        '| **동의어** | on an empty stomach | hungry |\n' +
        '| **동의어** | relaxed, less tense | comfortable |\n' +
        '| **반의어 + 부정** | not permanent | temporary |\n' +
        '| **반의어 + 부정** | did not accept | rejected |\n' +
        '| **상위어** | apples, bananas, grapes | fruit |\n' +
        '| **상위어** | buses, subways, trains | public transportation |\n\n' +
        '- **동의어**: 뜻이 같거나 비슷한 다른 낱말\n' +
        '- **반의어 + 부정**: "not + 낱말"을 그 낱말의 반의어 하나로 (not easy → difficult)\n' +
        '- **상위어**: 여러 예를 한데 묶는 더 넓은 말 (예시 → 일반화)\n\n' +
        '> ⚠️ 상위어는 예들을 **모두 덮되 너무 넓지 않아야** 합니다. apples, bananas, grapes를 food로 묶으면 지나치게 넓고, apples로 쓰면 하나만 가리킵니다.',
      easy: '친구에게 "사과, 바나나, 포도를 샀어"라고 할 수도 있지만 "과일을 샀어"라고 짧게 말할 수도 있지요. 요약문은 이렇게 **짧게 묶어 말하기**를 좋아합니다.\n\n' +
        '또 "쉽지 않았다"는 "어려웠다", "배가 고팠다"는 "빈속이었다"처럼 같은 뜻을 다른 말로 바꿉니다. 그러니 본문과 요약문 사이에서 **뜻이 같은 짝**을 찾는 연습이 필요합니다.',
      check: {
        type: 'choice',
        q: '본문의 buses, subways, and trains를 요약문에서 한 표현으로 바꿔 쓸 때 가장 알맞은 것은 무엇입니까?',
        choices: ['public transportation', 'means of communication', 'passengers'],
        answer: 0,
        why: ['', 'means of communication(통신 수단)은 전화·편지처럼 소식을 전하는 수단을 묶는 말입니다. 탈것을 묶는 말이 아닙니다.', 'passengers(승객)는 탈것이 아니라 탈것에 타는 사람입니다.'],
        explain: '버스·지하철·기차를 한데 묶는 상위어는 **public transportation(대중교통)**입니다.',
      },
    },
    {
      title: '(A)·(B)의 단서가 있는 부분 찾기',
      body: '요약문의 (A)와 (B)는 대개 **본문의 서로 다른 부분**에서 단서를 얻습니다. 요약문의 구조를 본문의 구조와 맞대어 보면 단서의 자리를 찾기 쉽습니다.\n\n' +
        '- **주제문·결론**: However, But, In short, Therefore 뒤나 글의 마지막 문장에 요지가 모입니다.\n' +
        '- **반복되는 핵심어**: 여러 번 다른 말로 되풀이되는 내용이 빈칸의 답일 가능성이 큽니다.\n' +
        '- **대조**: 요약문에 rather than, instead of, while, but이 있으면 본문에서도 대조되는 두 부분을 찾습니다.\n' +
        '- **원인과 결과**: 요약문에 by -ing(~함으로써), can help, lead to가 있으면 본문의 방법·결과 부분을 찾습니다.\n\n' +
        '예: Workplaces become safer when mistakes are (A) openly rather than (B) out of fear.\n\n' +
        '- rather than이 대조를 알려 줍니다. 본문의 In contrast 앞뒤를 맞대어 봅니다.\n' +
        '- (A) ← treat reported errors as chances / Openness about mistakes (실수를 털어놓음)\n' +
        '- (B) ← Afraid of blame, workers hide their mistakes (두려워서 숨김)',
      easy: '요약문은 본문을 줄여 그린 **작은 지도**입니다. 지도에서 "강 건너 왼쪽"이라고 하면 실제 땅에서도 강 건너 왼쪽을 찾아가지요.\n\n' +
        '요약문에 "~가 아니라(rather than)"라는 말이 있으면 본문에서도 "반대로(In contrast)"로 나뉘는 두 부분을 찾으면 됩니다. (A)는 한쪽, (B)는 다른 쪽에 있을 때가 많습니다.',
      check: {
        type: 'ox',
        q: '요약문의 (A)와 (B)의 단서는 언제나 본문의 같은 한 문장 안에 들어 있다.',
        answer: false,
        explain: '(A)와 (B)는 대개 본문의 **서로 다른 부분**(예: 대조되는 두 부분, 원인과 결과)에서 단서를 얻습니다. 한 문장에 둘 다 있는 경우도 있지만 "언제나"는 아닙니다.',
      },
    },
    {
      title: '선택지의 두 낱말이 모두 맞는지 확인하기',
      body: '요약문 문제의 선택지는 "(A) – (B)" 짝입니다. 오답 선택지는 대개 **한쪽은 맞고 한쪽은 틀리게** 만들어 놓습니다. 그래서 한 빈칸만 보고 고르면 함정에 빠집니다.\n\n' +
        '**소거법**으로 풀면 정확하고 빠릅니다.\n\n' +
        '1. 더 확실한 빈칸부터 정합니다. (예: (A)는 hungry가 확실하다)\n' +
        '2. 그 낱말이 **없는** 선택지를 모두 지웁니다.\n' +
        '3. 남은 선택지에서 다른 빈칸을 본문 단서로 확인합니다.\n' +
        '4. 마지막으로 고른 두 낱말을 요약문에 넣어 **한 문장으로 소리 내어 읽어** 봅니다. 본문 요지와 맞는지, 문법이 자연스러운지 봅니다.\n\n' +
        '| 선택지 | (A) | (B) | 판단 |\n|---|---|---|---|\n' +
        '| hungry – unplanned | ○ | ○ | 정답 |\n' +
        '| hungry – careful | ○ | × | 한쪽만 맞음 |\n' +
        '| full – unplanned | × | ○ | 한쪽만 맞음 |\n\n' +
        '> ⚠️ 본문에 그대로 나온 낱말(예: snacks, hunger)이 선택지에 있으면 눈에 익어서 고르기 쉽지만, 요약문 문장에 넣었을 때 뜻이 맞는지 꼭 확인합니다.',
      easy: '자물쇠의 비밀번호가 두 자리라고 해 봅시다. 첫 자리만 맞아서는 열리지 않지요. 요약문 선택지도 **두 자리가 모두 맞아야** 열립니다.\n\n' +
        '그러니 확실한 자리 하나를 먼저 맞추고, 그 숫자가 없는 번호는 시도하지 않는 것이 소거법입니다.',
      check: {
        type: 'ox',
        q: '한 빈칸에 알맞은 낱말이 들어 있는 선택지가 하나뿐이라면, 다른 빈칸은 확인하지 않고 그 선택지를 골라도 언제나 안전하다.',
        answer: false,
        explain: '남은 선택지가 하나라도 **다른 빈칸까지 넣어 읽어 확인**해야 합니다. 첫 빈칸을 잘못 판단했을 수도 있기 때문입니다. 두 낱말이 모두 본문과 맞을 때만 정답입니다.',
      },
    },
    {
      title: '직접 한 문장으로 요약해 보기',
      body: '요약문을 잘 고르려면 **스스로 요약하는 연습**이 가장 좋습니다. 한 문장 요약은 다음 틀로 만듭니다.\n\n' +
        '**[소재] + [글쓴이가 말하는 핵심(어떻다)] + (필요하면 이유·조건)**\n\n' +
        '- 예시·숫자·사람 이름 같은 **세부 내용은 뺍니다.**\n' +
        '- 여러 예는 **상위어**로 묶습니다. (French toast, bread pudding, croutons → tasty dishes)\n' +
        '- 본문 낱말을 그대로 옮기기보다 **다른 말로** 바꿔 봅니다.\n\n' +
        '예: 딱딱해진 빵에 관한 글\n\n' +
        '- 소재: stale bread(딱딱해진 빵)\n' +
        '- 핵심: 버리지 말고 맛있는 요리로 다시 쓸 수 있다\n' +
        '- 이유: 돈을 아끼고 음식 쓰레기를 줄인다\n' +
        '- 한 문장: **Stale bread can be reused in tasty ways that save money and reduce waste.**\n\n' +
        '> 💡 좋은 요약문은 너무 좁지도(예시 하나만), 너무 넓지도(글에 없는 내용까지) 않습니다. 앞 단원 "알맞은 제목 고르기"의 기준과 같습니다.',
      easy: '친구가 "그 글 무슨 내용이야?"라고 물을 때 한 문장으로 답한다고 생각해 보십시오. "딱딱한 빵도 버리지 말고 요리에 쓰면 돈도 아끼고 쓰레기도 줄어."처럼요.\n\n' +
        '이때 "프렌치토스트를 만들 수 있대"처럼 예 하나만 말하면 너무 좁고, "음식은 소중해"라고만 하면 너무 넓습니다.',
      check: {
        type: 'choice',
        q: '다음 글을 한 문장으로 가장 잘 요약한 것은 무엇입니까?\n\n' + BREAD,
        choices: [
          'French toast is a popular breakfast made with bread.',
          'Stale bread can be reused in tasty ways that save money and reduce waste.',
          'People should stop buying bread from stores and bake their own bread at home instead.',
        ],
        answer: 1,
        why: ['글에 나온 예시 하나(French toast)만 담았습니다. 너무 좁은 요약입니다.', '', '빵을 사지 말라는 내용은 글에 없습니다. 글은 딱딱해진 빵을 다시 쓰자고 말합니다.'],
        explain: '소재(stale bread) + 핵심(맛있는 요리로 다시 쓸 수 있다) + 이유(돈을 아끼고 쓰레기를 줄인다)를 모두 담은 문장이 가장 좋은 요약입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글을 읽고 요약문의 빈칸 (A), (B)에 들어갈 말을 고르십시오.\n\n' + PRAISE + '\n\n요약문: ' + PRAISE_SUM + '\n\n(A) – (B) 후보: effort – challenging / talent – challenging / effort – easy',
      steps: [
        '요약문을 먼저 읽습니다. 소재는 "아이를 칭찬하는 방법"이고, (A)는 intelligence(지능)와 대조되는 명사, (B)는 tasks를 꾸미는 형용사입니다.',
        '(A)의 단서: 본문은 being smart(똑똑함)를 칭찬받은 아이와 hard work(노력)를 칭찬받은 아이를 대조합니다. rather than their intelligence와 짝을 이루는 말은 hard work를 바꿔 쓴 **effort**입니다.',
        '(B)의 단서: 노력을 칭찬받은 아이들은 choose harder problems(더 어려운 문제를 고른다)고 했습니다. harder problems를 바꿔 쓴 말은 **challenging**(도전적인, 어려운)입니다.',
        '선택지 확인: talent(재능)는 똑똑함과 같은 쪽이라 (A)로 맞지 않고, easy는 harder와 반대라 (B)로 맞지 않습니다.',
        '넣어 읽기: 아이의 지능보다 노력을 칭찬하면, 아이가 어려운 일에 더 기꺼이 도전하게 된다. — 본문 요지와 맞습니다.',
      ],
      answer: '(A) effort – (B) challenging',
    },
    {
      q: '다음 글을 한 문장으로 요약해 보십시오.\n\n' + TEAM,
      steps: [
        '소재: 모둠(팀)의 크기와 구성원의 노력',
        '핵심: 모둠이 커지면 각자가 덜 열심히 하게 된다. 큰 모둠에서는 자기 노력이 눈에 띄지 않는다고 느끼기 때문이다.',
        '해결: 모둠을 작게 하거나 각자의 역할을 분명히 하면 막을 수 있다.',
        '세부 내용(작은 모둠에서는 기여가 잘 보인다 등)은 빼고 하나로 묶습니다.',
      ],
      answer: 'In large groups, people may work less hard unless each person\'s role is made clear. (큰 모둠에서는 각자의 역할을 분명히 하지 않으면 사람들이 덜 열심히 일할 수 있다.)',
    },
  ],

  terms: [
    { term: '요약문', def: '글의 요지를 한 문장으로 줄인 글입니다. 본문의 낱말을 그대로 쓰기보다 다른 말로 바꿔 씁니다.' },
    { term: '바꿔 쓰기 (paraphrase)', def: '같은 뜻을 다른 낱말이나 구조로 나타내는 것입니다. 예: on an empty stomach → hungry' },
    { term: '동의어', def: '뜻이 같거나 매우 비슷한 낱말입니다. 예: relaxed – comfortable, hide – conceal' },
    { term: '반의어', def: '뜻이 서로 반대인 낱말입니다. "not + 낱말"을 반의어 하나로 바꿔 쓸 수 있습니다. 예: not easy → difficult' },
    { term: '상위어', def: '여러 낱말을 한데 묶는 더 넓은 뜻의 낱말입니다. 예: apples, bananas, grapes → fruit' },
    { term: '소거법', def: '확실히 틀린 선택지부터 지워 나가며 답을 좁히는 방법입니다. 요약문 문제에서는 확실한 빈칸 하나로 먼저 선택지를 줄입니다.' },
    { term: '요지', def: '글쓴이가 글 전체에서 말하고자 하는 핵심 내용입니다. 주로 주제문과 결론에 드러납니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '본문의 carrots, onions, and cabbages를 요약문에서 한 낱말로 바꿔 쓸 때 가장 알맞은 것은 무엇입니까?',
      choices: ['fruits', 'vegetables', 'grains', 'flowers'],
      answer: 1,
      why: ['당근·양파·양배추는 과일이 아닙니다.', '', 'grains(곡물)는 쌀·밀·옥수수 같은 것을 묶는 말입니다.', '당근·양파·양배추는 꽃이 아니라 먹는 채소입니다.'],
      explain: '당근·양파·양배추를 한데 묶는 **상위어**는 **vegetables(채소)**입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 1,
      q: '본문의 not permanent와 뜻이 같은 한 낱말을 쓰십시오. (t로 시작하며 "일시적인"이라는 뜻입니다.)',
      answer: ['temporary'],
      wrong: [{ a: 'permanent', why: 'not을 빼고 읽었습니다. permanent(영구적인)의 반대말을 써야 합니다.' }],
      explain: 'not permanent(영구적이지 않은) = **temporary(일시적인)**. "not + 낱말"을 반의어 하나로 바꿔 쓴 것입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '본문의 on an empty stomach와 뜻이 가장 가까운 것은 무엇입니까?',
      choices: ['hungry', 'full', 'sick', 'thirsty'],
      answer: 0,
      why: ['', 'full(배부른)은 빈속과 반대입니다.', 'sick(아픈)은 배가 비었다는 뜻과 다릅니다.', 'thirsty(목마른)는 마실 것이 필요한 상태입니다. 빈속은 먹을 것이 필요한 상태입니다.'],
      explain: 'on an empty stomach는 "빈속에, 아무것도 먹지 않고"라는 뜻이므로 **hungry(배고픈)**와 뜻이 같습니다.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 0,
      q: '요약문을 본문보다 먼저 읽으면, 본문에서 어떤 정보를 찾아야 하는지 미리 알 수 있다.',
      answer: true,
      explain: '요약문에는 글의 소재와 빈칸의 품사·방향이 드러나 있습니다. 먼저 읽고 예측하면 단서가 나오는 문장을 빨리 찾을 수 있습니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 0,
      q: '요약문의 빈칸 (A)에 들어갈 말의 품사로 알맞은 것은 무엇입니까?\n\nHunger can make shoppers (A) more food than they need.',
      choices: ['명사', '형용사', '동사원형', '부사'],
      answer: 2,
      why: ['빈칸 뒤에 목적어 more food가 있으므로 빈칸은 동작을 나타내는 말입니다.', '형용사 뒤에 more food가 바로 올 수 없습니다. 목적어를 받는 동사가 필요합니다.', '', '부사는 목적어 more food를 받을 수 없습니다.'],
      explain: 'make + 목적어(shoppers) + **동사원형**은 "~가 …하게 만들다"입니다. 뒤에 목적어 more food가 있으므로 buy 같은 동사원형이 들어갑니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '다음 글을 읽고 요약문의 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것을 고르십시오.\n\n' + SHOP + '\n\n요약문: ' + SHOP_SUM,
      choices: ['hungry – careful', 'full – unplanned', 'hungry – unplanned', 'tired – healthy'],
      answer: 2,
      why: ['(A)는 맞지만 (B)가 틀렸습니다. 계획보다 많이, 생각 없이(without thinking) 산다고 했으므로 careful(신중한)과 반대입니다.', '(B)는 맞지만 (A)가 틀렸습니다. 본문은 빈속(on an empty stomach)에 장을 보는 경우를 말합니다.', '', '피곤함이나 건강한 물건은 본문에 나오지 않습니다. 오히려 high-calorie foods(열량이 높은 음식)를 산다고 했습니다.'],
      explain: '(A) on an empty stomach, before eating → **hungry**. (B) buy more food than they planned, without thinking → **unplanned**(계획에 없던). "배가 고플 때 장을 보면 계획에 없던 물건을 살 가능성이 크다."',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 1,
      q: '다음 글을 읽고 요약문의 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것을 고르십시오.\n\n' + WALK + '\n\n요약문: ' + WALK_SUM,
      choices: ['sitting – comfortable', 'walking – comfortable', 'walking – nervous', 'eating – tired'],
      answer: 1,
      why: ['(B)는 맞지만 (A)가 틀렸습니다. 본문은 앉아 있는 대신(instead of sitting) 걸으며 하는 회의를 말합니다.', '', '(A)는 맞지만 (B)가 틀렸습니다. 본문은 more relaxed, less tense라고 했으므로 nervous(긴장한)와 반대입니다.', '식사나 피곤함은 본문에 나오지 않습니다.'],
      explain: '(A) while walking outside → **walking**. (B) more relaxed, less tense를 바꿔 쓴 말 → **comfortable**(편안한). "걸으면서 회의를 하면 사람들이 더 편안하게 느끼고 더 자유롭게 생각할 수 있다."',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '다음 글을 읽고 요약문의 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것을 고르십시오.\n\n' + NOISE + '\n\n요약문: ' + NOISE_SUM,
      choices: ['disturb – silence', 'benefit – music', 'benefit – silence', 'disturb – noise'],
      answer: 2,
      hint: '요약문의 but이 본문의 어느 대조와 맞는지 찾아보십시오.',
      why: ['(B)는 맞지만 (A)가 틀렸습니다. 적당한 소리는 창의적인 일에 도움이 된다(can actually help, useful)고 했습니다.', '(A)는 맞지만 (B)가 틀렸습니다. 꼼꼼함이 필요한 일에는 음악이 아니라 조용함이 낫다고 했습니다.', '', '두 빈칸이 모두 본문과 반대입니다.'],
      explain: '(A) a little background sound can actually help, useful for creative tasks → **benefit**(이롭게 하다). (B) For tasks that need careful attention, silence may still be the better choice → **silence**. 요약문의 but은 본문에서 창의적인 일과 꼼꼼함이 필요한 일을 나누어 말한 대조와 맞습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '다음 글을 읽고 요약문의 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것을 고르십시오.\n\n' + FORGET + '\n\n요약문: ' + FORGET_SUM,
      choices: ['strength – removing', 'weakness – removing', 'weakness – storing', 'strength – storing'],
      answer: 1,
      hint: '요약문의 not simply가 본문의 어떤 생각을 고쳐 말하는지 보십시오.',
      why: ['(B)는 맞지만 (A)가 틀렸습니다. 우리가 보통 잊어버림을 "기억의 실패"로 여긴다고 했으므로 strength(강점)가 아니라 그 반대입니다.', '', '(A)는 맞지만 (B)가 틀렸습니다. 뇌는 중요하지 않은 세부 내용을 놓아 버린다(letting go of)고 했습니다. 저장이 아니라 없애는 쪽입니다.', '두 빈칸이 모두 본문과 맞지 않습니다.'],
      explain: '(A) a failure of memory를 바꿔 쓴 말 → **weakness**(약점). (B) letting go of unimportant details → **removing**(없애는). "잊어버림은 그저 기억의 약점이 아니라, 중요하지 않은 세부 내용을 없앰으로써 뇌를 돕는다."',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '다음 글을 한 문장으로 가장 잘 요약한 것은 무엇입니까?\n\n' + TEAM,
      choices: [
        'In small groups, everyone\'s contribution is easy to see.',
        'Large groups always produce better results than small groups.',
        'In large groups, people may work less hard unless their roles are clear.',
        'People work harder when they are paid more money for their work.',
      ],
      answer: 2,
      why: ['본문의 세부 내용 하나만 옮겼습니다. 너무 좁은 요약입니다.', '본문과 반대입니다. 큰 모둠에서는 각자가 덜 열심히 할 수 있다고 했습니다.', '', '돈(보수)에 관한 내용은 본문에 없습니다.'],
      explain: '소재(모둠의 크기) + 핵심(큰 모둠에서는 덜 열심히 한다) + 해결(역할을 분명히 한다)을 모두 담은 문장이 가장 좋은 요약입니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', concept: 2,
      q: '다음 글을 읽고 요약문의 빈칸에 들어갈 한 낱말을 쓰십시오.\n\n' + TEAM + '\n\n요약문: As a group gets larger, each member tends to put in [[빈칸]] effort.',
      answer: ['less'],
      hint: '글의 첫 문장에 단서가 있습니다.',
      wrong: [
        { a: 'more', why: '본문은 팀이 커지면 각자가 works less hard(덜 열심히 일한다)고 했습니다. 반대 방향입니다.' },
        { a: 'little', why: 'put in little effort는 "거의 노력하지 않는다"로 지나칩니다. 본문은 덜 열심히(less hard) 한다고 비교해 말합니다.' },
      ],
      explain: '첫 문장 each member often works less hard를 바꿔 쓰면 each member tends to put in **less** effort(덜 노력한다)입니다.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 4,
      q: '"잊어버림은 뇌가 정말 중요한 것에 집중하도록 돕는다."라는 뜻의 한 문장 요약이 되도록 순서대로 놓으십시오.',
      choices: ['Forgetting', 'helps the brain', 'focus on', 'what really matters'],
      answer: [0, 1, 2, 3],
      hint: '주어 + 동사(helps) + 목적어 + 동사원형 순서입니다.',
      explain: 'Forgetting helps the brain focus on what really matters. — help + 목적어 + 동사원형(focus). what really matters는 "정말 중요한 것"이라는 명사절입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '다음 글을 읽고 요약문의 빈칸 (A), (B)에 들어갈 말로 가장 알맞은 것을 고르십시오.\n\n' + WORK + '\n\n요약문: ' + WORK_SUM,
      choices: ['punished – concealed', 'shared – reported', 'shared – concealed', 'ignored – revealed', 'repeated – hidden'],
      answer: 2,
      hint: 'rather than이 본문의 어느 대조와 맞는지 보고, 두 빈칸이 서로 반대 방향인지 확인하십시오.',
      why: [
        '(B)는 맞지만 (A)가 틀렸습니다. 실수를 벌주는 일터는 오히려 실수가 늘어날 수 있다고 했습니다.',
        '(A)는 맞지만 (B)가 틀렸습니다. rather than 앞뒤는 반대여야 하는데 shared와 reported는 같은 방향입니다.',
        '',
        '두 빈칸이 모두 본문과 반대입니다. 실수를 무시하면 안전해진다는 내용은 없습니다.',
        '(B)의 hidden은 맞지만 (A)가 틀렸습니다. 실수를 되풀이하면 안전해진다는 뜻이 됩니다.',
      ],
      explain: '(A) reporting, treat reported errors as chances to learn, Openness about mistakes → **shared**(털어놓은). (B) Afraid of blame, workers hide their mistakes → **concealed**(숨긴). 요약문의 out of fear(두려워서)는 Afraid of blame을 바꿔 쓴 말입니다. "실수를 두려워서 숨기기보다 터놓고 나눌 때 일터가 더 안전해진다."',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '다음 문장과 뜻이 같은 것은 무엇입니까?\n\nThe new rule did not make the hallways any less crowded.',
      choices: [
        'The hallways remained crowded.',
        'The hallways became less crowded.',
        'The hallways became completely empty.',
        'The new rule moved the crowd to a bigger hallway in the school.',
      ],
      answer: 0,
      hint: 'not ~ any less는 "조금도 덜 ~하게 되지 않았다"입니다.',
      why: ['', 'not을 빼고 읽었습니다. 복도가 덜 붐비게 되지 않았다는 뜻입니다.', '부정을 지나치게 읽었습니다. 복도는 여전히 붐볐습니다.', '새 규칙이 사람들을 다른 곳으로 옮겼다는 내용은 없습니다.'],
      explain: 'did not make the hallways any less crowded는 "복도를 조금도 덜 붐비게 만들지 못했다", 곧 **복도는 여전히 붐볐다(remained crowded)**는 뜻입니다. 부정이 들어간 문장을 긍정 문장으로 바꿔 쓴 예입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '다음 글의 요약문에서 빈칸 (B)의 단서가 되는 본문 표현은 무엇입니까?\n\n' + TEAM + '\n\n요약문: ' + TEAM_SUM,
      choices: [
        'everyone\'s contribution is easy to see',
        'making each person\'s role clear',
        'rely on others to do the work',
        'When a team grows larger',
      ],
      answer: 1,
      hint: '요약문 (B) 앞의 by making each person\'s role과 겹치는 본문 표현을 찾으십시오.',
      why: ['작은 모둠의 특징을 설명한 부분입니다. 문제를 막는 방법(by making ~)과는 다릅니다.', '', '큰 모둠에서 생기는 문제를 설명한 부분입니다. 문제를 막는 방법이 아닙니다.', '(A)의 단서(larger)가 있는 부분입니다.'],
      explain: '요약문은 "이 문제는 각자의 역할을 (B)하게 함으로써 막을 수 있다"입니다. 본문 마지막 문장 making each person\'s role **clear** can prevent this problem이 단서이므로 (B)는 clear입니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 3,
      q: '다음 글을 읽고 요약문의 빈칸에 들어갈 한 낱말을 본문에서 찾아 쓰십시오.\n\n' + NOISE + '\n\n요약문: For tasks that require close attention to details, [[빈칸]] is still the better choice.',
      answer: ['silence'],
      hint: '요약문의 close attention to details와 겹치는 본문 문장을 찾으십시오.',
      wrong: [
        { a: 'sound', why: '소리는 창의적인 일에 도움이 된다고 했습니다. 꼼꼼함이 필요한 일에는 반대가 낫습니다.' },
        { a: 'noise', why: '꼼꼼함이 필요한 일에는 소리가 아니라 조용함이 낫다고 했습니다.' },
        { a: 'silent', why: 'is 앞의 주어 자리이므로 형용사 silent가 아니라 명사 silence를 씁니다.' },
      ],
      explain: '본문 마지막 문장 For tasks that need careful attention to details, … **silence** may still be the better choice가 단서입니다. 주어 자리이므로 명사 silence를 씁니다.',
    },
  ],

  deeper: [
    {
      title: '요약하는 힘은 왜 중요할까',
      body: '요약은 시험 문제를 푸는 기술이기 전에 **글을 정확히 이해했는지 확인하는 방법**입니다. 글을 한 문장으로 줄이려면 무엇이 핵심이고 무엇이 예시인지 가려야 하고, 본문의 낱말을 다른 말로 바꿔 써야 합니다. 그래서 한 문장 요약을 해 보면 "읽었다"와 "이해했다"의 차이가 드러납니다.\n\n' +
        '대학의 강의 노트나 보고서, 회사의 회의 기록에서도 긴 내용을 짧게 줄이는 힘이 꼭 필요합니다. 영어 글을 읽고 나면 습관처럼 다음 세 가지를 스스로 물어보십시오.\n\n' +
        '1. 이 글은 무엇에 관한 글인가? (소재)\n' +
        '2. 글쓴이는 그것에 대해 무엇을 말하는가? (핵심)\n' +
        '3. 왜 그렇게 말하는가, 또는 어떻게 하라고 하는가? (이유·해결)\n\n' +
        '다음 과정(영어Ⅱ)에서는 여러 문단으로 된 긴 글을 재구성하여 요약하는 활동으로 이어집니다.',
    },
  ],

  faq: [
    {
      q: '요약문 선택지에 본문 낱말이 그대로 나오면 정답이 아닌가요?',
      a: '꼭 그렇지는 않습니다. 다만 요약문은 대개 다른 말로 바꿔 쓰므로, 본문 낱말이 그대로 있는 선택지는 **눈에 익어서 고르게 만드는 함정**인 경우가 많습니다.\n\n본문 낱말이 그대로 있더라도 요약문 문장에 넣어 읽었을 때 뜻이 맞으면 정답일 수 있습니다. 결국 기준은 "요약문에 넣었을 때 본문 요지와 맞는가"입니다.',
    },
    {
      q: '(A)를 먼저 풀어야 해요, (B)를 먼저 풀어야 해요?',
      a: '정해진 순서는 없습니다. **더 확실한 빈칸부터** 정하는 것이 좋습니다. 확실한 빈칸 하나로 선택지를 줄인 뒤 남은 빈칸을 확인하면 실수가 줄어듭니다.',
    },
    {
      q: '상위어가 뭐예요? 그냥 비슷한 말 아닌가요?',
      a: '상위어는 여러 낱말을 **한데 묶는 더 넓은 말**입니다. 사과·바나나·포도의 상위어는 과일입니다. 비슷한 말(동의어)은 뜻의 넓이가 같지만, 상위어는 아래 낱말들을 모두 품는 더 큰 그릇입니다.\n\n요약문은 본문에 나온 여러 예를 상위어 하나로 묶어 짧게 말하는 일이 많습니다.',
    },
  ],

  mistakes: [
    '한 빈칸만 확인하고 고르는 실수 — 오답은 대개 한쪽만 맞게 만들어져 있습니다. 두 낱말을 모두 요약문에 넣어 읽어 봅니다.',
    '본문의 부정 표현을 놓치는 실수 — not permanent는 temporary, did not accept는 rejected처럼 반대말 하나로 바뀌어 나옵니다.',
    '예시 하나만 담은 선택지를 고르는 실수 — 요약문은 글 전체의 요지를 담아야 합니다. 예시들은 상위어로 묶여 나옵니다.',
  ],

  gens: [
    {
      id: 'hypernym',
      level: 1,
      title: '여러 예를 묶는 상위어 고르기',
      make: function (R) {
        var idx = R.int(0, HYPER.length - 1);
        var it = HYPER[idx];
        var ex = R.sample(it[2], 3);
        var others = [];
        HYPER.forEach(function (h, i) { if (i !== idx) others.push(h); });
        var picks = R.sample(others, 4);
        var reason = {};
        picks.forEach(function (h) { reason[h[0]] = '이 말의 뜻은 "' + h[1] + '"입니다. ' + h[2].slice(0, 2).join(', ') + ' 같은 것을 묶는 말이라 본문의 예들을 묶지 못합니다.'; });
        var pick = R.choices(it[0], picks.map(function (h) { return h[0]; }));
        return {
          type: 'choice', concept: 1,
          q: '본문의 다음 표현을 요약문에서 한 말로 묶어 쓰려고 합니다. 가장 알맞은 상위어는 무엇입니까?\n\n' + ex[0] + ', ' + ex[1] + ', and ' + ex[2],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === it[0] ? '' : reason[c] || ''; }),
          explain: ex.join(', ') + ' → 모두 "' + it[1] + '"에 속합니다. 상위어: **' + it[0] + '**',
        };
      },
    },
    {
      id: 'negation-paraphrase',
      level: 2,
      title: '"부정 + 낱말"을 반의어 하나로 바꿔 쓰기',
      make: function (R) {
        var it = R.pick(NEGPARA);
        var reason = {};
        it[3].forEach(function (w, i) {
          reason[w[0]] = i === 0
            ? '부정(not)을 빼고 읽었습니다. ' + w[0] + '(' + w[1] + ') — 뜻이 정반대가 됩니다.'
            : w[0] + '(' + w[1] + ') — 본문 표현과 뜻이 다릅니다.';
        });
        var pick = R.choices(it[1], it[3].map(function (w) { return w[0]; }));
        return {
          type: 'choice', concept: 1,
          q: '본문의 표현을 요약문에서 한 낱말로 바꿔 쓰려고 합니다. 뜻이 같은 것은 무엇입니까?\n\n본문: ' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === it[1] ? '' : reason[c] || ''; }),
          explain: it[0] + ' = **' + it[1] + '**(' + it[2] + '). "부정 + 낱말"을 그 낱말의 반의어 하나로 바꿔 쓴 것입니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'summary', m: '요약', ex: 'Write a one-sentence summary of the story.', exm: '그 이야기를 한 문장으로 요약해 쓰십시오.' },
    { w: 'effort', m: '노력', ex: 'Her effort finally paid off.', exm: '그녀의 노력이 마침내 결실을 맺었다.' },
    { w: 'challenging', m: '도전적인, 어려운', ex: 'Climbing that mountain was challenging but fun.', exm: '그 산에 오르는 것은 힘들었지만 재미있었다.' },
    { w: 'intelligence', m: '지능', ex: 'Intelligence is not the only key to success.', exm: '지능이 성공의 유일한 열쇠는 아니다.' },
    { w: 'purchase', m: '구매(품); 구입하다', ex: 'Keep the receipt for every purchase.', exm: '구매할 때마다 영수증을 보관하십시오.' },
    { w: 'attractive', m: '매력적인, 끌리는', ex: 'The bright colors make the poster attractive.', exm: '밝은 색 덕분에 그 포스터가 눈길을 끈다.' },
    { w: 'relaxed', m: '편안한, 느긋한', ex: 'I feel relaxed when I listen to the rain.', exm: '나는 빗소리를 들을 때 마음이 편안하다.' },
    { w: 'tense', m: '긴장한, 팽팽한', ex: 'The room became tense before the results were announced.', exm: '결과가 발표되기 전에 방 안의 분위기가 팽팽해졌다.' },
    { w: 'moderate', m: '적당한, 보통의', ex: 'Moderate exercise is good for your health.', exm: '적당한 운동은 건강에 좋다.' },
    { w: 'creative', m: '창의적인', ex: 'Seojun came up with a creative idea for the festival.', exm: '서준이는 축제를 위한 창의적인 아이디어를 떠올렸다.' },
    { w: 'contribution', m: '기여, 공헌', ex: 'Every member made a contribution to the project.', exm: '모든 구성원이 그 프로젝트에 기여했다.' },
    { w: 'responsible', m: '책임이 있는', ex: 'Who is responsible for feeding the fish?', exm: '물고기 먹이 주는 일은 누가 맡고 있니?' },
    { w: 'conceal', m: '숨기다', ex: 'He tried to conceal his surprise.', exm: '그는 놀란 마음을 숨기려고 애썼다.' },
    { w: 'temporary', m: '일시적인', ex: 'This is only a temporary classroom.', exm: '이곳은 임시 교실일 뿐이다.' },
    { w: 'stale', m: '(음식이) 신선하지 않은, 딱딱해진', ex: 'Stale bread is great for making French toast.', exm: '딱딱해진 빵은 프렌치토스트를 만들기에 좋다.' },
    { w: 'waste', m: '쓰레기, 낭비; 낭비하다', ex: 'Let\'s reduce food waste at school.', exm: '학교에서 음식물 쓰레기를 줄입시다.' },
  ],
});
})();
