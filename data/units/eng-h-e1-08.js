/* 영어Ⅰ · 문맥 속 어휘 판단
 * 예문·지문은 모두 직접 쓴 글이다(가상의 인물·장소). */
(function () {
  // 아침 식사 (직접 쓴 글) — (E)가 흐름에 맞지 않는 낱말
  var BREAKFAST = 'Some students skip breakfast because they would rather sleep a little longer. However, skipping breakfast can **(A) weaken** your concentration in the morning. Without enough energy, many students find it **(B) hard** to focus during first period. A simple meal, such as toast and fruit, can **(C) reduce** this problem. Eating breakfast regularly may also help you **(D) avoid** eating too much at lunch. In short, breakfast is a **(E) minor** part of a healthy school day.';
  // 오래된 시장 (직접 쓴 글) — (C)가 흐름에 맞지 않는 낱말
  var MARKET = 'When a large shopping mall opened in our town, the owners of the small shops in the old market worried that they would lose customers. At first, their fears seemed **(A) reasonable**, as fewer people visited the market. Over time, however, some shop owners found ways to **(B) attract** customers back. They offered services that the mall could not, such as repairing shoes or giving cooking tips. These personal services **(C) weakened** the shops\' relationship with local residents. As a result, the old market became **(D) busier** than before, and people began to **(E) value** small shops in a new way.';

  // 헷갈리는 낱말 생성기용: [문장(빈칸), 정답, [[오답, 이유] × 2], 우리말]
  var CONFUSE = [
    ['Lack of sleep can [[빈칸]] your mood.', 'affect', [['effect', 'effect는 주로 명사(효과, 영향)입니다. can 뒤의 동사 자리에는 affect를 씁니다.'], ['affects', 'can 같은 조동사 뒤에는 동사원형을 씁니다.']], '잠이 부족하면 기분에 영향을 줄 수 있다.'],
    ['The new law had a big [[빈칸]] on traffic.', 'effect', [['affect', 'affect는 주로 동사입니다. a big 뒤의 명사 자리에는 effect를 씁니다.'], ['effective', 'effective(효과적인)는 형용사라 a big 뒤의 명사 자리에 올 수 없습니다.']], '새 법은 교통에 큰 영향을 미쳤다.'],
    ['Bad weather can [[빈칸]] the price of vegetables.', 'affect', [['effect', 'effect는 주로 명사입니다. 목적어 the price를 받는 동사 자리이므로 affect를 씁니다.'], ['affection', 'affection은 "애정"이라는 명사입니다.']], '나쁜 날씨는 채소 가격에 영향을 줄 수 있다.'],
    ['One [[빈칸]] of regular exercise is better sleep.', 'effect', [['affect', 'affect는 주로 동사입니다. One 뒤의 명사 자리에는 effect를 씁니다.'], ['affection', 'affection은 "애정"이라는 뜻이라 문맥에 맞지 않습니다.']], '규칙적인 운동의 효과 하나는 더 나은 잠이다.'],
    ['The sun [[빈칸]] in the east.', 'rises', [['raises', 'raise는 목적어가 필요한 동사(~을 올리다)입니다. 해는 스스로 떠오르므로 rise를 씁니다.'], ['arises', 'arise는 "(문제·기회가) 생기다"라는 뜻입니다.']], '해는 동쪽에서 뜬다.'],
    ['Please [[빈칸]] your hand if you have a question.', 'raise', [['rise', 'rise는 목적어를 받지 않는 동사(오르다)입니다. your hand라는 목적어가 있으므로 raise를 씁니다.'], ['arise', 'arise는 "생기다"라는 뜻이고 목적어를 받지 않습니다.']], '질문이 있으면 손을 드세요.'],
    ['Vegetable prices [[빈칸]] sharply last month.', 'rose', [['raised', 'raise는 목적어가 필요합니다. 가격이 스스로 올랐으므로 rise의 과거 rose를 씁니다.'], ['risen', 'risen은 과거분사라 혼자 동사 자리에 올 수 없습니다. 과거 시제는 rose입니다.']], '지난달 채소 가격이 크게 올랐다.'],
    ['Our class [[빈칸]] money for the school library last year.', 'raised', [['rose', 'rise는 목적어를 받지 않습니다. money라는 목적어가 있으므로 raise의 과거 raised를 씁니다.'], ['risen', 'risen은 rise의 과거분사이고, rise는 목적어를 받지 않습니다.']], '우리 반은 작년에 학교 도서관을 위해 돈을 모았다.'],
    ['The river has [[빈칸]] after the heavy rain.', 'risen', [['raised', 'raise는 목적어가 필요합니다. 강물이 스스로 불어났으므로 rise의 과거분사 risen을 씁니다.'], ['rose', 'has 뒤에는 과거분사가 와야 합니다. rose는 과거형입니다.']], '큰비가 온 뒤 강물이 불어났다.'],
    ['I was tired, so I [[빈칸]] down on the sofa.', 'lay', [['laid', 'laid는 lay(~을 놓다, 눕히다)의 과거입니다. 내가 스스로 누웠으므로 lie의 과거 lay를 씁니다.'], ['lied', 'lied는 "거짓말했다"라는 뜻입니다.']], '나는 피곤해서 소파에 누웠다.'],
    ['She [[빈칸]] the baby gently on the bed.', 'laid', [['lay', 'lay를 lie(눕다)의 과거로 보면 목적어를 받을 수 없고, lay(눕히다)의 현재로 보면 주어 She에 맞춰 lays여야 합니다. 아기를 눕힌 과거의 일이므로 laid를 씁니다.'], ['lied', 'lied는 "거짓말했다"라는 뜻입니다.']], '그녀는 아기를 침대에 살며시 눕혔다.'],
    ["Don't [[빈칸]] on the wet grass.", 'lie', [['lay', 'lay는 "~을 놓다, 눕히다"로 목적어가 필요합니다. 스스로 눕는 것은 lie입니다.'], ['laid', "don't 뒤에는 동사원형이 와야 하고, 스스로 눕는 것은 lie입니다."]], '젖은 풀밭에 눕지 마라.'],
    ['Please [[빈칸]] the books on the table.', 'lay', [['lie', 'lie(눕다, 놓여 있다)는 목적어를 받지 않습니다. 책을 놓는 것은 lay입니다.'], ['laid', 'Please 뒤의 명령문에는 동사원형을 씁니다.']], '책들을 탁자 위에 놓아 주세요.'],
    ['He [[빈칸]] to his parents about the broken vase.', 'lied', [['lay', 'lay는 lie(눕다)의 과거입니다. 부모님께 "거짓말했다"는 뜻이므로 lied를 씁니다.'], ['laid', 'laid는 "~을 놓았다"라는 뜻입니다.']], '그는 깨진 꽃병에 대해 부모님께 거짓말을 했다.'],
    ['My cat is [[빈칸]] in the sun.', 'lying', [['laying', 'laying은 lay(~을 놓다)의 -ing입니다. 고양이가 스스로 누워 있으므로 lie의 -ing인 lying을 씁니다.'], ['laid', 'is 뒤에 laid를 쓰면 "놓여진"이라는 수동의 뜻이 됩니다. 고양이는 스스로 누워 있습니다.']], '우리 고양이는 햇볕을 받으며 누워 있다.'],
    ['The hen [[빈칸]] an egg every morning.', 'lays', [['lies', 'lie는 목적어를 받지 않습니다. 알을 낳는 것은 lay입니다.'], ['lie', '주어 The hen이 3인칭 단수이고, 알을 낳는 것은 lay입니다.']], '그 암탉은 매일 아침 알을 하나 낳는다.'],
  ];

  // 접사 생성기용: [낱말, 쪼개 보기, 정답 뜻, 오답 뜻 3개]
  var AFFIX = [
    ['careless', 'care(주의) + -less(없는)', '부주의한', ['주의 깊은', '걱정이 많은', '돌볼 수 있는']],
    ['helpful', 'help(도움) + -ful(가득한)', '도움이 되는', ['도움이 안 되는', '도움을 받은', '도울 수 없는']],
    ['harmless', 'harm(해) + -less(없는)', '해가 없는', ['해로운', '해를 입은', '해를 끼칠 수 있는']],
    ['unbelievable', 'un-(아닌) + believe(믿다) + -able(할 수 있는)', '믿을 수 없는', ['믿을 만한', '믿음이 강한', '믿고 싶은']],
    ['dishonest', 'dis-(아닌) + honest(정직한)', '정직하지 않은', ['정직한', '매우 정직한', '정직해 보이는']],
    ['reusable', 're-(다시) + use(쓰다) + -able(할 수 있는)', '다시 쓸 수 있는', ['쓸 수 없는', '쓸모없는', '한 번만 쓰는']],
    ['misunderstand', 'mis-(잘못) + understand(이해하다)', '오해하다', ['이해하다', '다시 이해하다', '이해시키다']],
    ['rewrite', 're-(다시) + write(쓰다)', '다시 쓰다', ['잘못 쓰다', '미리 쓰다', '쓰지 않다']],
    ['preview', 'pre-(미리) + view(보다)', '미리 보다', ['다시 보다', '잘못 보다', '보지 않다']],
    ['disagree', 'dis-(반대) + agree(동의하다)', '동의하지 않다', ['동의하다', '다시 동의하다', '미리 동의하다']],
    ['homeless', 'home(집) + -less(없는)', '집이 없는', ['집이 많은', '집에 있는', '집을 좋아하는']],
    ['endless', 'end(끝) + -less(없는)', '끝없는', ['곧 끝나는', '끝이 분명한', '이미 끝난']],
    ['breakable', 'break(깨지다) + -able(할 수 있는)', '깨지기 쉬운', ['깨지지 않는', '이미 깨진', '깨뜨리는']],
    ['unbreakable', 'un-(아닌) + break + -able(할 수 있는)', '깨지지 않는', ['깨지기 쉬운', '이미 깨진', '조심해서 다뤄야 하는']],
    ['powerless', 'power(힘) + -less(없는)', '힘없는', ['힘센', '힘을 주는', '힘을 기르는']],
    ['impossible', 'im-(아닌) + possible(가능한)', '불가능한', ['가능한', '매우 쉬운', '아직 해 보지 않은']],
    ['invisible', 'in-(아닌) + visible(보이는)', '보이지 않는', ['잘 보이는', '보기 좋은', '눈에 띄는']],
    ['unfriendly', 'un-(아닌) + friendly(친절한)', '불친절한', ['친절한', '친구가 많은', '친해지기 쉬운']],
    ['useless', 'use(쓸모) + -less(없는)', '쓸모없는', ['쓸모 있는', '다시 쓸 수 있는', '많이 쓴']],
    ['misplace', 'mis-(잘못) + place(두다)', '잘못 두다(둔 곳을 잊다)', ['제자리에 두다', '다시 두다', '미리 두다']],
  ];

Tutor.registerUnit({
  id: 'eng-h-e1-08',
  course: 'eng-h-e1',
  title: '문맥 속 어휘 판단',
  summary: '글의 흐름에 맞지 않는 낱말을 찾고, 다의어와 모양이 비슷한 낱말의 뜻을 문맥으로 구별합니다.',
  goals: [
    '반의어로 바꿔 넣은 낱말을 찾아 글의 흐름에 맞게 고칠 수 있다.',
    '연결어와 앞뒤 문장의 관계로 낱말이 문맥에 알맞은지 판단할 수 있다.',
    '접두사·접미사로 처음 보는 낱말의 뜻을 짐작할 수 있다.',
    '다의어의 문맥별 뜻과 모양이 비슷한 낱말(affect/effect, rise/raise, lie/lay)을 구별할 수 있다.',
  ],
  standards: ['[12영Ⅰ-01-07]'],

  concepts: [
    {
      title: '반의어로 바꿔 넣은 낱말 찾기',
      body: '"문맥상 낱말의 쓰임이 적절하지 않은 것"을 고르는 문제는 대개 **원래 낱말을 반의어로 바꿔 넣어** 만듭니다. 그래서 의심 가는 낱말을 **반의어로 바꿔 읽어 보면** 답이 분명해집니다.\n\n' +
        '| 자주 바뀌는 짝 | 뜻 |\n|---|---|\n' +
        '| increase ↔ decrease (reduce) | 늘다 ↔ 줄다 |\n' +
        '| accept ↔ reject | 받아들이다 ↔ 거절하다 |\n' +
        '| include ↔ exclude | 포함하다 ↔ 빼다 |\n' +
        '| strengthen ↔ weaken | 강하게 하다 ↔ 약하게 하다 |\n' +
        '| common ↔ rare | 흔한 ↔ 드문 |\n' +
        '| simple ↔ complex | 단순한 ↔ 복잡한 |\n' +
        '| major ↔ minor | 주요한 ↔ 사소한 |\n\n' +
        '예: Because the road was icy, the driver **increased** his speed to stay safe.\n\n' +
        '- 길이 얼었는데 안전하려고 속도를 **높였다**? 흐름이 어색합니다.\n' +
        '- 반의어 decreased(낮췄다)로 바꾸면 자연스럽습니다. → 답은 increased\n\n' +
        '> 💡 바꿔 읽었을 때 흐름이 **더 나아지면** 그 낱말이 답입니다. 바꿔도 어색하거나 오히려 나빠지면 원래 낱말이 맞습니다.',
      easy: '틀린 그림 찾기와 같습니다. 출제자는 그림에서 한 곳만 살짝 **반대로** 바꿔 놓았습니다. 웃는 얼굴을 우는 얼굴로, 위를 아래로.\n\n' +
        '그러니 낱말마다 "이걸 반대로 바꾸면 더 말이 되나?"라고 물어보십시오. 반대로 바꿨더니 글이 매끄러워지는 곳이 출제자가 바꿔 놓은 곳입니다.',
      check: {
        type: 'choice',
        q: '다음 문장에서 흐름에 맞지 않는 낱말 increased를 바르게 고친 것은 무엇입니까?\n\nBecause the road was icy, the driver **increased** his speed to stay safe.',
        choices: ['decreased', 'kept', 'doubled'],
        answer: 0,
        why: ['', '속도를 그대로 유지하면 얼어붙은 길에서 안전해지는 까닭이 드러나지 않습니다. 반의어로 바꿔 봅니다.', 'doubled(두 배로 늘렸다)는 increased와 같은 방향이라 여전히 어색합니다.'],
        explain: '길이 얼어 있으니 안전하려면 속도를 **줄여야** 합니다. increased의 반의어 **decreased**로 고치면 흐름이 자연스럽습니다.',
      },
    },
    {
      title: '글의 흐름으로 낱말이 알맞은지 판단하기',
      body: '낱말 하나가 알맞은지는 그 문장 하나만 보고는 알 수 없는 경우가 많습니다. **글 전체의 주제와 앞뒤 문장의 관계**를 함께 봐야 합니다.\n\n' +
        '1. **주제와 글쓴이의 관점**을 먼저 잡습니다. (아침밥이 중요하다는 글인가, 중요하지 않다는 글인가?)\n' +
        '2. **연결어**가 방향을 알려 줍니다.\n\n' +
        '| 연결어 | 앞뒤 관계 |\n|---|---|\n' +
        '| however, but, yet, on the other hand | 반대 방향 |\n' +
        '| therefore, so, as a result, thus | 원인 → 결과 (같은 방향) |\n' +
        '| also, in addition, moreover | 더하기 (같은 방향) |\n' +
        '| for example, such as | 앞 내용의 예 |\n' +
        '| in short, in conclusion | 요약 (주제와 같은 방향) |\n\n' +
        '3. 각 낱말이 그 방향과 맞는지 확인합니다. 예를 들어 **In short** 뒤에서 아침밥을 "사소한(minor)" 부분이라고 하면, 아침밥이 중요하다는 앞의 내용과 어긋납니다.\n\n' +
        '> ⚠️ 낱말이 문장 안에서만 보면 자연스러워도, 글 전체의 흐름과 어긋나면 답이 됩니다.',
      easy: '이어달리기에서 바통을 받은 사람이 갑자기 반대 방향으로 달리면 안 되겠지요. 글의 문장들도 바통을 이어 받으며 한 방향으로 달립니다.\n\n' +
        '연결어는 "여기서 방향을 바꿔요(however)", "같은 방향으로 계속(therefore, also)"이라는 표지판입니다. 표지판과 다르게 달리는 낱말이 있으면 그것이 이상한 낱말입니다.',
      check: {
        type: 'ox',
        q: 'Therefore 뒤에는 대개 앞 문장과 반대되는 내용이 온다.',
        answer: false,
        explain: 'Therefore(그러므로)는 앞 문장이 원인, 뒤 문장이 결과인 **같은 방향**의 연결어입니다. 반대 방향을 알리는 연결어는 however, but, yet 등입니다.',
      },
    },
    {
      title: '접두사·접미사로 낱말 뜻 짐작하기',
      body: '처음 보는 낱말도 **조각(접두사 + 어근 + 접미사)**으로 나누면 뜻을 짐작할 수 있습니다.\n\n' +
        '| 접두사 | 뜻 | 예 |\n|---|---|---|\n' +
        '| un-, in-(im-, il-, ir-) | 아닌, 반대 | unhappy, impossible, illegal, irregular |\n' +
        '| dis- | 아닌, 반대 | dishonest, disagree, disappear |\n' +
        '| mis- | 잘못 | misunderstand, misplace |\n' +
        '| re- | 다시 | rewrite, reuse |\n' +
        '| pre- | 미리 | preview, prepay |\n\n' +
        '| 접미사 | 뜻 | 예 |\n|---|---|---|\n' +
        '| -able, -ible | ~할 수 있는 | readable, washable, visible |\n' +
        '| -less | ~이 없는 | careless, homeless, endless |\n' +
        '| -ful | ~이 가득한 | careful, helpful, powerful |\n' +
        '| -ness, -ment | 명사를 만듦 | kindness, movement |\n\n' +
        '조각을 합치면 뜻이 나옵니다: un + break + able → "깨질 수 없는", 곧 **깨지지 않는**(unbreakable).\n\n' +
        '> ⚠️ 접사는 뜻을 **짐작**하는 도구일 뿐 예외가 있습니다. priceless는 "값이 없는"이 아니라 "값을 매길 수 없을 만큼 **귀중한**"이고, invaluable도 "가치 없는"이 아니라 "매우 귀중한"입니다. 짐작한 뜻을 문맥에 넣어 꼭 확인합니다.',
      easy: '낱말을 레고 블록처럼 생각하십시오. un(아닌) 블록, care(조심) 블록, less(없는) 블록, ful(가득한) 블록을 조립하는 겁니다.\n\n' +
        '- care + ful = 조심이 가득한 → 조심하는(careful)\n' +
        '- care + less = 조심이 없는 → 부주의한(careless)\n\n' +
        '블록 뜻만 알면 처음 보는 낱말도 대부분 맞힐 수 있습니다.',
      check: {
        type: 'choice',
        q: 'reusable의 뜻으로 알맞은 것은 무엇입니까?',
        choices: ['다시 쓸 수 있는', '쓸 수 없는', '쓸모없는'],
        answer: 0,
        why: ['', 're-는 "아닌"이 아니라 "다시"라는 뜻입니다.', '"쓸모없는"은 useless입니다. re-(다시) + use + -able(할 수 있는)로 나눠 보십시오.'],
        explain: 're-(다시) + use(쓰다) + -able(~할 수 있는) → **다시 쓸 수 있는**. 예: a reusable bag (다시 쓸 수 있는 장바구니)',
      },
    },
    {
      title: '다의어의 문맥별 뜻: run, address, issue',
      body: '**다의어**는 뜻이 여러 개인 낱말입니다. 처음 배운 뜻만 떠올리면 문장이 이상하게 해석되므로, **함께 쓰인 말(주어·목적어)**을 보고 뜻을 고릅니다.\n\n' +
        '| 낱말 | 문맥 | 뜻 |\n|---|---|---|\n' +
        '| run | He **runs** every morning. | 달리다 |\n' +
        '| run | My aunt **runs** a small bakery. | 운영하다 |\n' +
        '| run | Tears **ran** down her cheeks. | (액체가) 흐르다 |\n' +
        '| run | This machine **runs** on solar power. | (기계가) 작동하다 |\n' +
        '| address | Write your **address** here. | 주소 |\n' +
        '| address | The mayor gave an **address** to the citizens. | 연설 |\n' +
        '| address | We must **address** this problem now. | (문제를) 다루다, 처리하다 |\n' +
        '| issue | Climate change is a global **issue**. | 문제, 쟁점 |\n' +
        '| issue | I bought the March **issue** of the magazine. | (잡지의) 호 |\n' +
        '| issue | The school will **issue** new ID cards. | 발급하다, 내주다 |\n\n' +
        '> 💡 품사부터 확인하면 뜻이 좁혀집니다. address가 a·the 뒤에 있으면 명사(주소·연설), 목적어를 받으면 동사(다루다)입니다.',
      easy: '우리말 "쓰다"를 떠올려 보십시오. "편지를 쓰다", "모자를 쓰다", "약이 쓰다", "돈을 쓰다"는 모두 뜻이 다르지요. 우리는 함께 쓰인 말(편지, 모자, 약, 돈)을 보고 자연스럽게 뜻을 고릅니다.\n\n' +
        '영어도 같습니다. run 다음에 a bakery가 오면 "빵집을 달리다"가 아니라 "빵집을 운영하다"입니다.',
      check: {
        type: 'choice',
        q: '밑줄 친 address의 뜻으로 알맞은 것은 무엇입니까?\n\nThe city should __address__ the parking problem quickly.',
        choices: ['(문제를) 다루다, 처리하다', '주소를 쓰다', '연설하다'],
        answer: 0,
        why: ['', '목적어가 the parking problem(주차 문제)이므로 "주소를 쓰다"는 뜻이 맞지 않습니다.', '문제를 "연설한다"는 뜻은 어색합니다. 문제를 해결하려고 다룬다는 뜻입니다.'],
        explain: 'address 뒤에 목적어 the parking problem이 있으므로 동사이고, 문제를 **다루다, 처리하다**라는 뜻입니다. "시는 주차 문제를 빨리 해결해야 한다."',
      },
    },
    {
      title: '모양이 비슷해 헷갈리는 낱말: affect/effect, rise/raise, lie/lay',
      body: '**affect / effect**\n\n' +
        '- **affect** (주로 동사) 영향을 주다: Stress can **affect** your sleep.\n' +
        '- **effect** (주로 명사) 효과, 영향: Stress has an **effect** on your sleep.\n\n' +
        '**rise / raise** — 목적어가 있는지 봅니다.\n\n' +
        '| 낱말 | 목적어 | 뜻 | 변화 |\n|---|---|---|---|\n' +
        '| rise | 없음 | 오르다, 뜨다 | rise – rose – risen |\n' +
        '| raise | 있음 | ~을 올리다, 기르다, (돈을) 모으다 | raise – raised – raised |\n\n' +
        '- The sun **rises**. / Prices **rose**. — 스스로 오름\n' +
        '- **Raise** your hand. / They **raised** money. — 무엇을 올림\n\n' +
        '**lie / lay** — 가장 헷갈리는 짝입니다.\n\n' +
        '| 낱말 | 목적어 | 뜻 | 변화 |\n|---|---|---|---|\n' +
        '| lie | 없음 | 눕다, 놓여 있다 | lie – **lay** – lain (-ing: lying) |\n' +
        '| lay | 있음 | ~을 놓다, 눕히다, (알을) 낳다 | lay – laid – laid (-ing: laying) |\n' +
        '| lie | 없음 | 거짓말하다 | lie – lied – lied (-ing: lying) |\n\n' +
        '> ⚠️ **lay**는 "lie(눕다)의 과거"이기도 하고 "lay(놓다)의 현재"이기도 합니다. 목적어가 없으면 "누웠다", 목적어가 있으면 "놓다"입니다. I **lay** on the bed. (누웠다) / I **lay** the book on the bed. (놓는다)',
      easy: '목적어 확인이 열쇠입니다. "무엇을?"이라고 물어서 답이 있으면 raise·lay, 답이 없으면 rise·lie입니다.\n\n' +
        '- 해가 뜬다 → 무엇을? (없음) → rise\n' +
        '- 손을 든다 → 무엇을? 손을 → raise\n' +
        '- 소파에 눕는다 → 무엇을? (없음) → lie\n' +
        '- 책을 놓는다 → 무엇을? 책을 → lay\n\n' +
        'affect와 effect는 "a는 action(동작, 동사), e는 end result(결과, 명사)"처럼 첫 글자로 기억하는 사람이 많습니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nPlease [[빈칸]] your hand if you know the answer.',
        choices: ['raise', 'rise', 'arise'],
        answer: 0,
        why: ['', 'rise는 목적어를 받지 않습니다(스스로 오르다). your hand라는 목적어가 있으므로 raise입니다.', 'arise는 "(문제가) 생기다"라는 뜻이고 목적어를 받지 않습니다.'],
        explain: '목적어 your hand가 있으므로 "~을 올리다"라는 뜻의 **raise**를 씁니다. "답을 알면 손을 드세요."',
      },
    },
  ],

  examples: [
    {
      q: '다음 글의 (A)~(E) 중 문맥상 낱말의 쓰임이 적절하지 **않은** 것을 찾아 고치십시오.\n\n' + BREAKFAST,
      steps: [
        '주제부터 잡습니다. 아침을 거르면 집중력이 떨어지니 아침을 먹는 것이 좋다는 글입니다.',
        '(A) weaken: 아침을 거르면 집중력을 약하게 한다 — 흐름에 맞습니다.',
        '(B) hard: 에너지가 없으면 집중하기 어렵다 — 맞습니다. (C) reduce: 간단한 식사가 이 문제를 줄인다 — 맞습니다. (D) avoid: 점심에 과식하는 것을 피하게 돕는다 — 맞습니다.',
        '(E) minor: In short(요약하면) 뒤에서 아침밥을 "사소한" 부분이라고 하면 글 전체의 주제와 반대입니다.',
        '반의어로 바꿔 읽어 봅니다: breakfast is an important(major) part of a healthy school day. — 흐름이 자연스러워집니다.',
      ],
      answer: '(E) minor → important (또는 major, key). 아침밥은 건강한 학교생활의 중요한 부분이다.',
    },
    {
      q: '밑줄 친 run의 뜻을 각각 쓰십시오.\n\n(1) My uncle __runs__ a small restaurant.\n(2) The bus __runs__ every ten minutes.',
      steps: [
        '(1) run 뒤에 목적어 a small restaurant(작은 식당)가 있습니다. 식당을 "달린다"는 말이 안 되므로 **운영하다**입니다.',
        '(2) 주어가 The bus이고 every ten minutes(10분마다)가 있습니다. 버스가 정해진 길을 **운행하다(다니다)**라는 뜻입니다.',
        '확인: 다의어는 주어와 목적어를 함께 보고 우리말로 넣어 읽었을 때 자연스러운 뜻을 고릅니다.',
      ],
      answer: '(1) 운영하다 — 삼촌은 작은 식당을 운영한다. (2) 운행하다 — 그 버스는 10분마다 다닌다.',
    },
  ],

  terms: [
    { term: '반의어', def: '뜻이 서로 반대인 낱말입니다. 어휘 판단 문제는 원래 낱말을 반의어로 바꿔 넣어 만드는 경우가 많습니다. 예: increase – decrease' },
    { term: '연결어', def: '문장과 문장의 관계를 알려 주는 말입니다. however는 반대, therefore는 결과, also는 더하기를 나타냅니다.' },
    { term: '접두사', def: '낱말 앞에 붙어 뜻을 더하는 조각입니다. 예: un-(아닌), re-(다시), mis-(잘못), pre-(미리)' },
    { term: '접미사', def: '낱말 뒤에 붙어 뜻이나 품사를 바꾸는 조각입니다. 예: -able(~할 수 있는), -less(~이 없는), -ful(~이 가득한)' },
    { term: '어근', def: '낱말에서 중심 뜻을 가진 부분입니다. 예: unbreakable의 break' },
    { term: '다의어', def: '뜻이 여러 개인 낱말입니다. 함께 쓰인 말을 보고 문맥에 맞는 뜻을 고릅니다. 예: run(달리다, 운영하다, 흐르다)' },
    { term: '자동사·타동사', def: '목적어 없이 쓰는 동사가 자동사(rise, lie), 목적어가 필요한 동사가 타동사(raise, lay)입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: 'accept(받아들이다)의 반의어는 무엇입니까?',
      choices: ['receive', 'reject', 'except', 'expect'],
      answer: 1,
      why: ['receive(받다)는 accept와 뜻이 비슷한 쪽입니다.', '', 'except(~을 제외하고)는 모양이 비슷할 뿐 반의어가 아닙니다.', 'expect(기대하다)는 모양이 비슷할 뿐 반의어가 아닙니다.'],
      explain: 'accept(받아들이다) ↔ **reject**(거절하다). except, expect는 모양이 비슷해 헷갈리기 쉬운 낱말입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 2,
      q: 'predictable(예측할 수 있는)에 접두사를 붙여 "예측할 수 없는"이라는 뜻의 낱말을 쓰십시오.',
      answer: ['unpredictable'],
      wrong: [
        { a: 'inpredictable', why: 'predictable에는 in-이 아니라 un-을 붙입니다.' },
        { a: 'dispredictable', why: 'predictable에는 dis-가 아니라 un-을 붙입니다.' },
        { a: 'predictless', why: '"~할 수 없는"은 -less가 아니라 un- + -able의 꼴로 나타냅니다.' },
      ],
      explain: 'un-(아닌) + predictable(예측할 수 있는) → **unpredictable**(예측할 수 없는). 예: The weather in spring is unpredictable.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: 'careless의 뜻으로 알맞은 것은 무엇입니까?',
      choices: ['주의 깊은', '부주의한', '걱정이 많은', '돌봐 주는'],
      answer: 1,
      why: ['"주의 깊은"은 careful입니다. -less는 "~이 없는"이라는 뜻입니다.', '', '-less는 "없는"이라는 뜻입니다. 걱정이 많다는 뜻이 아닙니다.', 'care의 "돌보다"라는 뜻을 떠올렸지만, -less가 붙어 "주의가 없는"이 됩니다.'],
      explain: 'care(주의) + -less(~이 없는) → **부주의한**. 반대말은 careful(주의 깊은)입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 3,
      q: '밑줄 친 runs의 뜻으로 알맞은 것은 무엇입니까?\n\nMy aunt __runs__ a small bakery near the station.',
      choices: ['달리다', '흐르다', '운영하다', '작동하다'],
      answer: 2,
      why: ['빵집을 "달린다"는 뜻은 말이 되지 않습니다. 목적어 a small bakery를 보십시오.', '"흐르다"는 물·눈물 같은 액체가 주어일 때의 뜻입니다.', '', '"작동하다"는 기계가 주어일 때의 뜻입니다.'],
      explain: 'run 뒤에 목적어 a small bakery(작은 빵집)가 있으므로 **운영하다**입니다. "이모는 역 근처에서 작은 빵집을 운영한다."',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe new school rule will [[빈칸]] all students.',
      choices: ['effect', 'affect', 'effective', 'affection'],
      answer: 1,
      why: ['effect는 주로 명사(효과)입니다. will 뒤의 동사 자리에는 affect를 씁니다.', '', 'effective(효과적인)는 형용사라 will 뒤에 올 수 없습니다.', 'affection은 "애정"이라는 명사입니다.'],
      explain: 'will 뒤는 동사원형 자리이고, 목적어 all students가 있습니다. "~에 영향을 주다"라는 동사 **affect**가 알맞습니다.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 4,
      q: '다음 문장은 "그는 점심을 먹고 소파에 누웠다."라는 뜻으로 바르게 쓴 문장이다.\n\nHe laid on the sofa after lunch.',
      answer: false,
      explain: '"눕다"는 목적어가 없는 lie이고, 그 과거는 **lay**입니다. He **lay** on the sofa after lunch.가 맞습니다. laid는 lay(~을 놓다, 눕히다)의 과거라 목적어가 필요합니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '밑줄 친 issue의 뜻으로 알맞은 것은 무엇입니까?\n\nThe library just got the latest __issue__ of the science magazine.',
      choices: ['문제, 쟁점', '(잡지의) 호', '발급하다', '출구'],
      answer: 1,
      why: ['"과학 잡지의 최신 쟁점"은 어색합니다. of the science magazine을 보십시오.', '', 'the latest 뒤에 있으므로 동사가 아니라 명사입니다.', 'issue에는 "출구"라는 뜻으로 쓰이는 일이 거의 없고, 문맥에도 맞지 않습니다.'],
      explain: 'the latest issue of the magazine은 "잡지의 최신 **호**"입니다. "도서관에 과학 잡지 최신 호가 막 들어왔다."',
    },
    {
      id: 'p8', level: 1, type: 'short', concept: 4,
      q: '빈칸에 rise 또는 raise를 알맞은 꼴로 쓰십시오.\n\nVegetable prices [[빈칸]] sharply last month.',
      answer: ['rose'],
      hint: '목적어가 있는지, 시제가 무엇인지 보십시오.',
      wrong: [
        { a: 'raised', why: '가격이 스스로 올랐고 목적어가 없으므로 raise가 아니라 rise를 씁니다.' },
        { a: 'risen', why: 'risen은 과거분사라 혼자 동사 자리에 쓰지 않습니다. last month이므로 과거형 rose입니다.' },
        { a: 'rised', why: 'rise는 불규칙 동사입니다. rise – rose – risen.' },
      ],
      explain: '목적어가 없으므로 rise, last month이므로 과거 → **rose**. "지난달 채소 가격이 크게 올랐다."',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 1,
      q: '다음 글의 (A)~(E) 중 문맥상 낱말의 쓰임이 적절하지 **않은** 것은 무엇입니까?\n\n' + BREAKFAST,
      choices: ['(A) weaken', '(B) hard', '(C) reduce', '(D) avoid', '(E) minor'],
      answer: 4,
      hint: '마지막 문장의 In short는 글 전체를 요약합니다.',
      why: ['아침을 거르면 집중력이 약해진다는 내용으로 흐름에 맞습니다.', '에너지가 없으면 집중하기 어렵다는 내용으로 맞습니다.', '간단한 식사가 집중력 문제를 줄인다는 내용으로 맞습니다.', '점심에 과식하는 것을 피하게 돕는다는 내용으로 맞습니다.', ''],
      explain: '글 전체는 아침밥이 중요하다는 내용인데, 요약하는 마지막 문장에서 아침밥을 **minor**(사소한) 부분이라고 하면 흐름과 반대입니다. **important**(또는 major)로 고쳐야 합니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말로 흐름에 가장 알맞은 것은 무엇입니까?\n\nThe test was much harder than we had expected. Therefore, most students felt [[빈칸]] when they left the room.',
      choices: ['confident', 'relaxed', 'worried', 'proud'],
      answer: 2,
      hint: 'Therefore는 앞 문장의 결과를 이끕니다.',
      why: ['시험이 예상보다 훨씬 어려웠다면 자신감을 느끼는 것은 결과로 자연스럽지 않습니다.', '어려운 시험의 결과로 편안함을 느끼는 것은 흐름에 맞지 않습니다.', '', '어려운 시험 뒤에 자랑스러움을 느끼는 것은 Therefore로 이어지는 결과로 어색합니다.'],
      explain: 'Therefore(그러므로)는 원인 → 결과입니다. 시험이 예상보다 훨씬 어려웠으니 학생들은 **worried**(걱정되는)를 느꼈다는 흐름이 자연스럽습니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '밑줄 친 priceless의 뜻으로 알맞은 것은 무엇입니까?\n\nThis old family photo is __priceless__ to me.',
      choices: ['값이 싼', '값을 매길 수 없을 만큼 귀중한', '가격표가 없는', '너무 낡아서 아무도 사려고 하지 않는'],
      answer: 1,
      why: ['-less를 "없는"으로만 읽어 "값이 없는(싼)"으로 옮겼습니다. priceless는 예외적으로 "매우 귀중한"이라는 뜻입니다.', '', '문맥상 가족사진의 가격표 이야기가 아닙니다. 나에게 소중하다는 뜻입니다.', '사진이 낡았다는 내용은 없습니다. to me(나에게)와 함께 소중함을 나타냅니다.'],
      explain: 'priceless는 "값을 매길 수 없을 만큼 **귀중한**"입니다. 접사로 짐작한 뜻은 반드시 문맥으로 확인해야 하는 예입니다. "이 오래된 가족사진은 나에게 무엇과도 바꿀 수 없을 만큼 소중하다."',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nShe [[빈칸]] the sleeping baby gently on the bed.',
      choices: ['lay', 'laid', 'lied', 'lain'],
      answer: 1,
      hint: '"무엇을?"에 대한 답(목적어)이 있는지 보십시오.',
      why: ['lay를 lie(눕다)의 과거로 쓰면 목적어를 받을 수 없고, lay(눕히다)의 현재로 보면 주어 She에 맞춰 lays여야 합니다. 아기를 "눕혔으므로" lay(눕히다)의 과거가 필요합니다.', '', 'lied는 "거짓말했다"라는 뜻입니다.', 'lain은 lie(눕다)의 과거분사라 혼자 동사 자리에 올 수 없고, 목적어도 받지 않습니다.'],
      explain: '목적어 the sleeping baby가 있으므로 lay(~을 눕히다)를 쓰고, 과거이므로 **laid**. "그녀는 잠든 아기를 침대에 살며시 눕혔다."',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 글의 (A)~(E) 중 문맥상 낱말의 쓰임이 적절하지 **않은** 것은 무엇입니까?\n\n' + MARKET,
      choices: ['(A) reasonable', '(B) attract', '(C) weakened', '(D) busier', '(E) value'],
      answer: 2,
      hint: '(C) 앞뒤 문장의 관계를 보십시오. As a result는 결과를 이끕니다.',
      why: ['처음에 시장을 찾는 사람이 줄었으니 걱정이 타당해 보였다는 흐름으로 맞습니다.', 'however 뒤에서 상황이 나아지는 내용이므로 손님을 다시 끌어들였다는 뜻으로 맞습니다.', '', '개인적인 서비스 덕분에 시장이 더 붐비게 되었다는 결과로 맞습니다.', '사람들이 작은 가게를 새롭게 소중히 여기게 되었다는 흐름으로 맞습니다.'],
      explain: '대형 매장이 할 수 없는 개인적인 서비스를 제공했고, As a result 시장이 전보다 붐볐다고 했습니다. 그러므로 그 서비스는 가게와 주민의 관계를 약하게 한 것이 아니라 **strengthened**(강하게 했다)여야 합니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '밑줄 친 running과 같은 뜻으로 쓰인 것은 무엇입니까?\n\nRain was __running__ down the window.',
      choices: [
        'He runs along the river every morning.',
        'She runs a clothing store downtown.',
        'Tears ran down her cheeks.',
        'The machine runs on solar power.',
      ],
      answer: 2,
      hint: '주어가 빗물(액체)일 때 run의 뜻을 생각해 보십시오.',
      why: ['"달리다"의 뜻입니다. 빗물이 창문을 "달린다"가 아닙니다.', '"운영하다"의 뜻입니다.', '', '"(기계가) 작동하다"의 뜻입니다.'],
      explain: '빗물이 창문을 따라 **흘러내리다**라는 뜻입니다. 같은 뜻은 눈물이 뺨을 따라 흘러내렸다(Tears ran down her cheeks)입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '밑줄 친 address와 같은 뜻으로 쓰인 것은 무엇입니까?\n\nThe new plan does not __address__ the real cause of the problem.',
      choices: [
        'Please write your address on the envelope.',
        'The principal gave a short address at the ceremony.',
        'We need to address the noise problem in the library.',
        'Do you know her new email address?',
      ],
      answer: 2,
      hint: '문제의 address는 목적어를 받는 동사입니다.',
      why: ['명사 "주소"입니다.', '명사 "연설"입니다.', '', '명사 "(이메일) 주소"입니다.'],
      explain: '문제의 address는 목적어 the real cause를 받는 동사로 "(문제를) **다루다, 해결하려고 손대다**"입니다. 같은 뜻은 도서관 소음 문제를 다루어야 한다는 문장입니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 2,
      q: '다음 뜻이 되도록 접사를 이용해 한 낱말을 쓰십시오.\n\nThis bottle can be used again. → This is a [[빈칸]] bottle.',
      answer: ['reusable', 're-usable'],
      hint: '"다시"를 뜻하는 접두사와 "~할 수 있는"을 뜻하는 접미사를 use에 붙입니다.',
      wrong: [
        { a: 'useless', why: 'useless는 "쓸모없는"이라는 뜻입니다. 다시 쓸 수 있다는 뜻은 re- + use + -able입니다.' },
        { a: 'unusable', why: 'unusable은 "쓸 수 없는"이라는 뜻입니다. "다시"는 re-입니다.' },
        { a: 'usable', why: '"쓸 수 있는"까지만 나타냅니다. "다시"를 뜻하는 re-를 붙여야 합니다.' },
      ],
      explain: 're-(다시) + use(쓰다) + -able(~할 수 있는) → **reusable**(다시 쓸 수 있는). "이것은 다시 쓸 수 있는 병이다."',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '(A), (B), (C)의 각 네모 안에서 문맥에 맞는 낱말로 가장 알맞은 것은 무엇입니까?\n\nNot getting enough sleep can (A) [affect / effect] your mood. One common (B) [affect / effect] is that you get annoyed easily. To sleep better, try not to (C) [lie / lay] in bed with your phone late at night.',
      choices: ['affect – effect – lie', 'effect – affect – lie', 'affect – effect – lay', 'affect – affect – lie', 'effect – effect – lay'],
      answer: 0,
      hint: '(A)·(B)는 동사 자리인지 명사 자리인지, (C)는 목적어가 있는지 보십시오.',
      why: [
        '',
        '(A)는 can 뒤의 동사 자리라 affect, (B)는 One common 뒤의 명사 자리라 effect입니다. 둘이 바뀌었습니다.',
        '(C) 침대에 "눕다"는 목적어가 없으므로 lie입니다. lay는 "~을 놓다"입니다.',
        '(B)는 One common 뒤의 명사 자리이므로 effect입니다.',
        '(A)는 동사 자리라 affect, (C)는 목적어가 없으므로 lie입니다.',
      ],
      explain: '(A) can 뒤 동사 자리 → **affect**(영향을 주다). (B) One common 뒤 명사 자리 → **effect**(영향, 결과). (C) 침대에 눕다, 목적어 없음 → **lie**. "잠이 부족하면 기분에 영향을 줄 수 있다. 흔한 결과 하나는 쉽게 짜증이 나는 것이다. 잠을 더 잘 자려면 밤늦게 휴대 전화를 들고 침대에 누워 있지 않도록 해 보라."',
    },
  ],

  deeper: [
    {
      title: '사전을 찾기 전에 문맥으로 짐작하는 힘',
      body: '긴 영어 글을 읽다 보면 모르는 낱말을 만나지 않을 수 없습니다. 그때마다 사전을 찾으면 글의 흐름이 끊기지요. 능숙한 독자는 먼저 **문맥과 낱말 조각으로 뜻을 짐작**하고, 짐작이 글 전체와 맞는지 확인하며 읽어 나갑니다.\n\n' +
        '1. **조각으로 나누기** — un-predict-able처럼 접두사·어근·접미사를 찾습니다.\n' +
        '2. **품사 확인하기** — a·the 뒤면 명사, 목적어를 받으면 동사.\n' +
        '3. **방향 확인하기** — 앞뒤 연결어(however, therefore)로 좋은 뜻인지 나쁜 뜻인지 가늠합니다.\n' +
        '4. **풀이 찾기** — 앞 단원에서 배운 동격(콤마·or 뒤의 설명)이나 such as 뒤의 예가 뜻을 알려 주기도 합니다.\n\n' +
        '이렇게 짐작한 뒤 글을 다 읽고 나서 사전으로 확인하면, 낱말이 문맥과 함께 기억에 오래 남습니다.',
    },
  ],

  faq: [
    {
      q: '어휘 문제에서 모든 낱말을 반대로 바꿔 봐야 해요?',
      a: '시간이 넉넉하면 그렇게 해도 좋지만, 먼저 **글의 주제와 관점**을 잡고 그와 어긋나 보이는 낱말부터 바꿔 보는 것이 효율적입니다. 연결어(however, therefore, in short) 바로 뒤의 낱말이 답인 경우가 많습니다.',
    },
    {
      q: 'effect도 동사로 쓸 수 있다던데요?',
      a: '맞습니다. effect가 동사로 "(변화 등을) 일으키다, 이루다"라는 뜻으로 쓰이기도 하지만 드뭅니다. 고등학교 수준의 글에서는 **affect = 동사(영향을 주다), effect = 명사(효과, 영향)**로 구별하면 거의 틀리지 않습니다.',
    },
    {
      q: 'lie랑 lay는 어떻게 하면 안 헷갈려요?',
      a: '"무엇을?"이라고 물어보십시오. 답(목적어)이 있으면 lay(~을 놓다, 눕히다), 없으면 lie(눕다)입니다.\n\n가장 헷갈리는 것은 lay가 lie의 과거라는 점입니다. 문장에 lay가 나왔는데 목적어가 없고 과거의 일이면 "누웠다"로 읽으십시오.',
    },
  ],

  mistakes: [
    '문장 하나만 보고 판단하는 실수 — 낱말이 그 문장 안에서는 자연스러워도 글 전체의 주제와 반대면 답이 됩니다. 연결어와 주제를 함께 봅니다.',
    '접사만 보고 뜻을 단정하는 실수 — priceless(매우 귀중한), invaluable(매우 귀중한)처럼 예외가 있습니다. 짐작한 뜻을 문맥에 넣어 확인합니다.',
    '목적어를 확인하지 않고 rise/raise, lie/lay를 고르는 실수 — 목적어가 있으면 raise·lay, 없으면 rise·lie입니다.',
  ],

  gens: [
    {
      id: 'confusing-words',
      level: 2,
      title: 'affect/effect, rise/raise, lie/lay 구별하기',
      make: function (R) {
        var it = R.pick(CONFUSE);
        var correct = it[1];
        var reason = {};
        it[2].forEach(function (w) { reason[w[0]] = w[1]; });
        var pick = R.choices(correct, it[2].map(function (w) { return w[0]; }), 3);
        return {
          type: 'choice', concept: 4,
          q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '정답: **' + correct + '**. 동사 자리인지 명사 자리인지, 목적어가 있는지, 시제가 무엇인지 확인합니다. "' + it[3] + '"',
        };
      },
    },
    {
      id: 'affix-meaning',
      level: 1,
      title: '접두사·접미사로 낱말 뜻 짐작하기',
      make: function (R) {
        var it = R.pick(AFFIX);
        var correct = it[2];
        var pick = R.choices(correct, it[3]);
        return {
          type: 'choice', concept: 2,
          q: '낱말을 조각으로 나누어 생각할 때, 다음 낱말의 뜻으로 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : '조각의 뜻을 다시 맞춰 보십시오: ' + it[1]; }),
          explain: it[1] + ' → **' + correct + '**',
        };
      },
    },
  ],

  vocab: [
    { w: 'concentration', m: '집중(력)', ex: 'Loud music can break your concentration.', exm: '시끄러운 음악은 집중을 깨뜨릴 수 있다.' },
    { w: 'reject', m: '거절하다', ex: 'The club rejected my idea at first.', exm: '동아리는 처음에 내 아이디어를 거절했다.' },
    { w: 'decrease', m: '줄다, 줄이다', ex: 'The number of cars on this road decreased last year.', exm: '작년에 이 도로의 차량 수가 줄었다.' },
    { w: 'reasonable', m: '타당한, 합리적인', ex: 'Your answer sounds reasonable.', exm: '네 대답은 타당하게 들린다.' },
    { w: 'attract', m: '끌어들이다', ex: 'The colorful flowers attract many bees.', exm: '화려한 꽃들은 많은 벌을 끌어들인다.' },
    { w: 'resident', m: '주민', ex: 'The residents cleaned the park together.', exm: '주민들은 함께 공원을 청소했다.' },
    { w: 'value', m: '소중히 여기다; 가치', ex: 'I value my friends more than anything.', exm: '나는 무엇보다 친구들을 소중히 여긴다.' },
    { w: 'minor', m: '사소한, 작은', ex: 'It was only a minor mistake.', exm: '그것은 사소한 실수일 뿐이었다.' },
    { w: 'affect', m: '영향을 주다', ex: 'The heavy rain affected the soccer game.', exm: '폭우가 축구 경기에 영향을 주었다.' },
    { w: 'effect', m: '효과, 영향', ex: 'The new rule had a good effect on the class.', exm: '새 규칙은 학급에 좋은 효과를 냈다.' },
    { w: 'raise', m: '올리다, (돈을) 모으다', ex: 'We raised money for the animal shelter.', exm: '우리는 동물 보호소를 위해 돈을 모았다.' },
    { w: 'lie', m: '눕다, 놓여 있다', ex: 'The map lies on the table.', exm: '지도가 탁자 위에 놓여 있다.' },
    { w: 'lay', m: '놓다, 눕히다', ex: 'Lay the papers on my desk, please.', exm: '서류를 내 책상 위에 놓아 주세요.' },
    { w: 'issue', m: '문제, 쟁점; (잡지의) 호; 발급하다', ex: 'Water pollution is a serious issue.', exm: '수질 오염은 심각한 문제이다.' },
    { w: 'address', m: '주소; 연설; (문제를) 다루다', ex: 'The class meeting addressed the cleaning schedule.', exm: '학급 회의에서 청소 당번 문제를 다루었다.' },
    { w: 'priceless', m: '값을 매길 수 없을 만큼 귀중한', ex: 'Her advice was priceless to me.', exm: '그녀의 조언은 내게 더없이 귀중했다.' },
  ],
});
})();
