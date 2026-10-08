/* 다시 시작하는 영어 기초 문법 · 문장의 5형식
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). 생성기에서 바뀌는 영어 낱말 뒤에는 조사를 붙이지 않는다. */
(function () {
  // 형식 판별 생성기: [문장, 형식(1~5), 근거]
  var FORMS = [
    ['He runs every morning.', 1, '동사 runs 뒤에는 때를 나타내는 수식어(every morning)만 있습니다.'],
    ['The baby sleeps in the afternoon.', 1, '동사 sleeps 뒤에는 때를 나타내는 수식어(in the afternoon)만 있습니다.'],
    ['My father works at a bank.', 1, '동사 works 뒤에는 장소를 나타내는 수식어(at a bank)만 있습니다.'],
    ['The sun rises in the east.', 1, '동사 rises 뒤에는 방향을 나타내는 수식어(in the east)만 있습니다.'],
    ['The bus arrives at nine.', 1, '동사 arrives 뒤에는 때를 나타내는 수식어(at nine)만 있습니다.'],
    ['Birds sing in the morning.', 1, '동사 sing 뒤에는 때를 나타내는 수식어(in the morning)만 있습니다.'],
    ['She looks happy.', 2, '보어 happy(행복한) — 주어 She의 상태를 설명합니다(She = happy).'],
    ['My brother became a doctor.', 2, '보어 a doctor — 주어와 같은 사람입니다(My brother = a doctor).'],
    ['This soup tastes salty.', 2, '보어 salty(짠) — 수프의 맛을 설명합니다(soup = salty).'],
    ['The music sounds good.', 2, '보어 good(좋은) — 음악이 어떻게 들리는지 설명합니다.'],
    ['Jia is a teacher.', 2, '보어 a teacher — 주어와 같은 사람입니다(Jia = a teacher).'],
    ['It gets cold in November.', 2, '보어 cold(추운) — 날씨의 상태를 설명합니다. 뒤의 in November — 때를 더하는 수식어입니다.'],
    ['I like coffee.', 3, '목적어 coffee — 좋아하는 대상입니다(I ≠ coffee).'],
    ['Minsu reads the newspaper.', 3, '목적어 the newspaper — 읽는 대상입니다.'],
    ['She meets a doctor every month.', 3, '목적어 a doctor — 만나는 대상입니다(She ≠ a doctor).'],
    ['We need a bigger table.', 3, '목적어 a bigger table — 필요한 대상입니다.'],
    ['He cleans his room every Saturday.', 3, '목적어 his room — 청소하는 대상입니다.'],
    ['My sister plays the piano.', 3, '목적어 the piano — 연주하는 대상입니다.'],
    ['He gave me a book.', 4, '간접목적어 me(나에게) + 직접목적어 a book(책을) — "누구에게 무엇을"이 이어집니다.'],
    ['My mother makes us breakfast.', 4, '간접목적어 us(우리에게) + 직접목적어 breakfast(아침을) — us ≠ breakfast 입니다.'],
    ['Mr. Park teaches us English.', 4, '간접목적어 us(우리에게) + 직접목적어 English(영어를)입니다.'],
    ['She shows the guests the garden.', 4, '간접목적어 the guests(손님들에게) + 직접목적어 the garden(정원을)입니다.'],
    ['I sometimes lend my brother my car.', 4, '간접목적어 my brother(남동생에게) + 직접목적어 my car(내 차를)입니다.'],
    ['Jia sends her parents flowers.', 4, '간접목적어 her parents(부모님께) + 직접목적어 flowers(꽃을)입니다.'],
    ['The news made me happy.', 5, '목적어 me + 목적격 보어 happy — 그 소식 때문에 내가 행복해졌다는 뜻입니다(me = happy).'],
    ['We call our dog Bori.', 5, '목적어 our dog + 목적격 보어 Bori — 우리 개 = 보리 입니다.'],
    ['This coat keeps me warm.', 5, '목적어 me + 목적격 보어 warm(따뜻한) — 코트 덕분에 내가 따뜻한 상태라는 뜻입니다.'],
    ['I find the movie boring.', 5, '목적어 the movie + 목적격 보어 boring(지루한) — 영화가 지루하다고 여긴다는 뜻입니다.'],
    ['Her smile makes everyone happy.', 5, '목적어 everyone + 목적격 보어 happy — 모두가 행복해진다는 뜻입니다.'],
    ['People call him a genius.', 5, '목적어 him + 목적격 보어 a genius — him = a genius 입니다.'],
  ];
  var FORM_NAMES = ['1형식', '2형식', '3형식', '4형식', '5형식'];
  var FORM_DESC = [
    '1형식은 주어 + 동사이고, 동사 뒤에는 수식어만 옵니다.',
    '2형식은 주어 + 동사 + 보어이고, 보어가 주어를 설명합니다(주어 = 보어).',
    '3형식은 주어 + 동사 + 목적어이고, 동사 뒤에 "~을·~를"에 해당하는 대상이 하나 옵니다.',
    '4형식은 주어 + 동사 + 간접목적어(~에게) + 직접목적어(~을)입니다.',
    '5형식은 주어 + 동사 + 목적어 + 목적격 보어이고, 목적격 보어가 목적어를 설명합니다(목적어 = 목적격 보어).',
  ];

  // 4형식 → 3형식 생성기: [주어, 동사, 간접목적어, 직접목적어, 전치사, 4형식 뜻]
  var GIVE = [
    ['My mother', 'gives', 'me', 'some advice', 'to', '어머니는 제게 조언을 해 주십니다.'],
    ['Jia', 'sends', 'her friend', 'a card', 'to', '지아는 친구에게 카드를 보냅니다.'],
    ['The guide', 'shows', 'the tourists', 'the old palace', 'to', '안내원은 관광객들에게 옛 궁궐을 보여 줍니다.'],
    ['Mr. Park', 'teaches', 'us', 'English', 'to', '박 선생님은 우리에게 영어를 가르칩니다.'],
    ['I', 'lend', 'my brother', 'my car', 'to', '저는 남동생에게 제 차를 빌려줍니다.'],
    ['Minsu', 'tells', 'his kids', 'a story', 'to', '민수는 아이들에게 이야기를 들려줍니다.'],
    ['The waiter', 'hands', 'us', 'the menu', 'to', '종업원이 우리에게 메뉴판을 건네줍니다.'],
    ['She', 'writes', 'her grandmother', 'a letter', 'to', '그녀는 할머니께 편지를 씁니다.'],
    ['He', 'passes', 'me', 'the salt', 'to', '그는 제게 소금을 건네줍니다.'],
    ['The company', 'pays', 'its workers', 'a bonus', 'to', '그 회사는 직원들에게 상여금을 줍니다.'],
    ['Seojun', 'sells', 'his neighbor', 'his old bike', 'to', '서준이는 이웃에게 자기의 낡은 자전거를 팝니다.'],
    ['My father', 'buys', 'me', 'a new phone', 'for', '아버지는 제게 새 휴대 전화를 사 주십니다.'],
    ['Jia', 'makes', 'her son', 'a sandwich', 'for', '지아는 아들에게 샌드위치를 만들어 줍니다.'],
    ['He', 'cooks', 'his family', 'dinner', 'for', '그는 가족에게 저녁을 요리해 줍니다.'],
    ['She', 'gets', 'me', 'a glass of water', 'for', '그녀는 제게 물 한 잔을 가져다줍니다.'],
    ['I', 'find', 'my friend', 'a good apartment', 'for', '저는 친구에게 좋은 아파트를 찾아 줍니다.'],
    ['Grandma', 'knits', 'the baby', 'a hat', 'for', '할머니는 아기에게 모자를 떠 주십니다.'],
    ['The chef', 'bakes', 'the children', 'cookies', 'for', '요리사는 아이들에게 쿠키를 구워 줍니다.'],
    ['Minsu', 'builds', 'his dog', 'a small house', 'for', '민수는 개에게 작은 집을 지어 줍니다.'],
    ['They', 'order', 'us', 'a pizza', 'for', '그들은 우리에게 피자를 주문해 줍니다.'],
  ];
  var PREP_WHY = {
    to: 'to — give·send·show·teach·lend·tell처럼 물건이나 말이 상대에게 "건너가는" 동사와 씁니다.',
    for: 'for — buy·make·cook·get·find처럼 상대를 "위해" 무언가를 마련해 주는 동사와 씁니다.',
    of: 'of — ask(묻다) 같은 아주 적은 동사에만 씁니다.',
  };

  Tutor.registerUnit({
    id: 'eng-a-basic-03',
    course: 'eng-a-basic',
    title: '문장의 5형식',
    summary: '동사 뒤에 무엇이 오느냐에 따라 나뉘는 다섯 가지 문장 형식을 쉬운 예문과 함께 알아봅니다.',
    goals: [
      '동사 뒤에 오는 성분을 보고 문장의 형식을 구별할 수 있다.',
      '2형식의 보어와 3형식의 목적어를 구별할 수 있다.',
      '4형식 문장을 전치사 to·for를 써서 3형식으로 바꿀 수 있다.',
      '4형식과 5형식의 차이를 목적어와 뒤의 말의 관계로 설명할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '1형식 — 주어 + 동사',
        body: '**1형식**은 주어와 동사만으로 뜻이 완성되는 문장입니다.\n\n- He **runs**. (그는 달립니다.)\n- The baby **sleeps**. (아기가 잡니다.)\n\n뒤에 때·장소·방법을 나타내는 **수식어**가 붙어도 1형식입니다. 수식어는 문장 성분의 뼈대에 들어가지 않기 때문입니다.\n\n- My father works (at a bank). → 뼈대: My father works.\n- The sun rises (in the east). → 뼈대: The sun rises.\n\n1형식에 자주 쓰는 동사: go, come, run, walk, sleep, arrive, live, work, happen, rise\n\n> 💡 판단 방법: 동사 뒤의 전치사 묶음과 때·장소 말을 괄호로 묶었을 때 **아무것도 남지 않으면** 1형식입니다.',
        easy: '1형식은 "누가 + 한다"로 끝나는 가장 짧은 문장입니다. "아기가 잔다", "버스가 도착한다" 같은 문장입니다.\n\n"오후에", "아홉 시에" 같은 말은 문장을 꾸미는 장식일 뿐이라 빼도 문장이 됩니다. 장식을 떼어 내고 "누가 + 한다"만 남으면 1형식입니다.',
        check: {
          type: 'choice',
          q: '1형식 문장을 고르세요.',
          choices: ['The train arrives at noon.', 'The train is fast.', 'I take the train.'],
          answer: 0,
          why: ['', '동사 뒤의 fast(빠른) — 주어를 설명하는 보어입니다. 2형식입니다.', '동사 뒤의 the train(기차를)이 목적어입니다. 3형식입니다.'],
          explain: 'The train arrives (at noon). 괄호 안은 때를 나타내는 수식어이므로 뼈대는 "주어 + 동사"뿐입니다. 1형식입니다.',
        },
      },
      {
        title: '2형식 — 주어 + 동사 + 보어',
        body: '**2형식**은 동사 뒤에 주어를 설명하는 **보어**가 오는 문장입니다. 보어는 주어와 같은 대상이거나 주어의 상태입니다. 그래서 **주어 = 보어** 관계가 됩니다.\n\n- Jia is **a teacher**. (Jia = a teacher)\n- My brother became **a doctor**. (My brother = a doctor)\n- She looks **happy**. (She = happy)\n\n2형식에 자주 쓰는 동사\n\n| 갈래 | 동사 | 예 |\n|---|---|---|\n| 이다·되다 | be, become, get, turn | It gets **cold**. |\n| 감각 | look, sound, taste, smell, feel | This soup tastes **salty**. |\n| 그렇게 보이다 | seem | He seems **tired**. |\n\n> ⚠️ 감각동사 뒤에는 **형용사**를 씁니다. 우리말로 "행복하게 보인다"라고 해서 부사(happily)를 쓰면 틀립니다. She looks happily. (✗) → She looks happy. (○)',
        easy: '2형식의 동사는 "등호(=)" 역할을 합니다. 왼쪽(주어)과 오른쪽(보어)이 같은 것이거나, 오른쪽이 왼쪽의 상태를 알려 줍니다.\n\nThis soup = salty → "이 수프는 짠맛이 난다"\n\n오른쪽 칸에는 주어의 "상태"를 나타내는 말(형용사)이나 "누구인지"를 나타내는 말(명사)이 옵니다.',
        check: {
          type: 'ox',
          q: '다음 문장은 바른 문장입니다.\n\nShe looks happily.',
          answer: false,
          explain: 'look(~해 보이다) — 감각동사이므로 뒤에 주어의 상태를 나타내는 형용사가 보어로 옵니다. 바르게 고치면 **She looks happy.** 입니다.',
        },
      },
      {
        title: '3형식 — 주어 + 동사 + 목적어',
        body: '**3형식**은 동사 뒤에 동작을 받는 대상, 곧 **목적어**("~을·~를")가 하나 오는 문장입니다. 영어 문장에서 가장 많이 쓰는 꼴입니다.\n\n- I like **coffee**. (나는 커피를 좋아합니다.)\n- Minsu reads **the newspaper**. (민수는 신문을 읽습니다.)\n\n2형식과 3형식은 동사 뒤에 명사가 하나 온다는 점이 같아서 헷갈리기 쉽습니다. 주어와의 관계로 구별합니다.\n\n| 문장 | 관계 | 형식 |\n|---|---|---|\n| He became a doctor. | He = a doctor (그가 의사가 되었다) | 2형식 (보어) |\n| He met a doctor. | He ≠ a doctor (그가 의사를 만났다) | 3형식 (목적어) |\n\n> 💡 우리말로 옮겨 "~을·~를"이 자연스러우면 목적어, "~이다·~가 되다"이면 보어인 경우가 많습니다.',
        easy: '3형식은 "누가 + 한다 + 무엇을"입니다. 공을 던지면(동사) 공을 받는 사람이 있습니다. 그 "받는 쪽"이 목적어입니다.\n\n2형식의 보어는 주어 자신을 다시 가리키지만, 3형식의 목적어는 주어와 다른 대상입니다. "의사가 되다"는 내가 곧 의사(보어), "의사를 만나다"는 나와 다른 사람(목적어)입니다.',
        check: {
          type: 'choice', fixed: true,
          q: '다음 문장은 몇 형식일까요?\n\nMinsu meets a doctor every month.',
          choices: ['2형식', '3형식', '4형식'],
          answer: 1,
          why: ['2형식이라면 동사 뒤의 말이 주어와 같아야 합니다. 민수와 의사는 다른 사람입니다.', '', '4형식이라면 "누구에게 + 무엇을" 두 개의 목적어가 와야 합니다. 이 문장에는 하나뿐입니다.'],
          explain: 'a doctor(의사를) — 민수가 만나는 대상이므로 목적어입니다(Minsu ≠ a doctor). every month는 수식어입니다. 그래서 3형식입니다.',
        },
      },
      {
        title: '4형식 — 주어 + 동사 + 간접목적어 + 직접목적어',
        body: '**4형식**은 "누구에게 무엇을 해 주다"라는 문장입니다. 동사 뒤에 목적어가 두 개 옵니다.\n\n- **간접목적어**: ~에게 (주로 사람)\n- **직접목적어**: ~을·~를 (주로 물건)\n\nHe gave **me** **a book**. (그는 나에게 책을 주었습니다.)\n→ me = 간접목적어, a book = 직접목적어\n\n이런 동사를 **수여동사**라고 합니다: give, send, show, teach, tell, lend, bring, buy, make, cook\n\n4형식은 직접목적어를 앞으로 보내고 **전치사 + 간접목적어**를 뒤에 붙여 3형식으로 바꿀 수 있습니다.\n\n| 전치사 | 동사 | 예 |\n|---|---|---|\n| to (상대에게 건너감) | give, send, show, teach, tell, lend, bring | He gave a book **to me**. |\n| for (상대를 위해 마련함) | buy, make, cook, get, find | She made a cake **for me**. |\n\n> ⚠️ 순서에 주의합니다. 4형식은 "사람 + 물건", 3형식으로 바꾸면 "물건 + 전치사 + 사람"입니다.',
        easy: '4형식은 택배 상자에 붙은 송장과 같습니다. "받는 사람(~에게)"과 "보내는 물건(~을)"이 차례로 적혀 있습니다.\n\nJia sends **her friend** **a card**. → 받는 사람: 친구 / 물건: 카드\n\n물건을 먼저 말하고 싶으면 받는 사람 앞에 to(건네줌) 또는 for(위해서 마련함) — 둘 중 하나를 붙여 뒤로 보냅니다. Jia sends a card **to her friend**.',
        check: {
          type: 'choice',
          q: '다음 문장에서 **간접목적어**(~에게)를 고르세요.\n\nHe gave me a book.',
          choices: ['He', 'me', 'a book'],
          answer: 1,
          why: ['He — "누가"에 해당하는 주어입니다.', '', 'a book — "무엇을"에 해당하는 직접목적어입니다.'],
          explain: '"그는 나에게 책을 주었습니다." — me(나에게)가 간접목적어, a book(책을)이 직접목적어입니다.',
        },
      },
      {
        title: '5형식 — 주어 + 동사 + 목적어 + 목적격 보어',
        body: '**5형식**은 목적어 뒤에 그 목적어를 설명하는 **목적격 보어**가 오는 문장입니다. 그래서 **목적어 = 목적격 보어** 관계가 됩니다.\n\n- The news made **me** **happy**. (그 소식이 나를 행복하게 했습니다. → me = happy)\n- We call **our dog** **Bori**. (우리는 개를 보리라고 부릅니다. → our dog = Bori)\n- This coat keeps **me** **warm**. (이 코트는 나를 따뜻하게 해 줍니다. → me = warm)\n\n5형식에 자주 쓰는 동사: make(~을 …하게 만들다), keep(~을 …한 상태로 두다), find(~이 …하다고 여기다), call(~을 …라고 부르다), name(~을 …라고 이름 짓다)\n\n4형식과 5형식은 동사 뒤에 말이 두 개 온다는 점이 같습니다. 두 말의 관계로 구별합니다.\n\n| 문장 | 관계 | 형식 |\n|---|---|---|\n| She made me a cake. | me ≠ a cake (나에게 케이크를) | 4형식 |\n| The news made me happy. | me = happy (내가 행복한 상태) | 5형식 |',
        easy: '5형식은 "목적어를 어떤 상태로 만든다·부른다"는 문장입니다. 목적어 뒤의 말이 목적어에게 붙는 "이름표"라고 생각하면 됩니다.\n\nThe news made me happy. → "나"에게 "행복함"이라는 이름표가 붙음\n\n4형식의 두 번째 말은 받는 "물건"이고, 5형식의 두 번째 말은 목적어의 "상태·이름"입니다.',
        check: {
          type: 'choice',
          q: '다음 문장에서 밑줄 친 말의 역할을 고르세요.\n\nThe news made me __happy__.',
          choices: ['목적어', '목적격 보어', '간접목적어'],
          answer: 1,
          why: ['목적어는 me입니다. 밑줄 친 말은 그 목적어의 상태를 설명합니다.', '', '간접목적어는 "~에게"에 해당하는 말입니다. "나에게 행복을 주었다"가 아니라 "나를 행복하게 했다"는 뜻입니다.'],
          explain: 'happy(행복한) — 목적어 me의 상태를 설명합니다(me = happy). 목적어를 설명하는 말은 목적격 보어입니다.',
        },
      },
      {
        title: '형식 구별하기 — 동사 뒤를 보라',
        body: '형식은 **동사 뒤에 무엇이 오는지**로 정해집니다. 수식어를 괄호로 묶은 뒤 이 순서로 판단합니다.\n\n1. 동사 뒤에 남은 것이 없다 → **1형식**\n2. 하나가 남았다\n   - 주어 = 그 말 → **2형식** (보어)\n   - 주어 ≠ 그 말 → **3형식** (목적어)\n3. 둘이 남았다\n   - 첫째 ≠ 둘째 (누구에게 + 무엇을) → **4형식**\n   - 첫째 = 둘째 (목적어 + 그 상태·이름) → **5형식**\n\n같은 동사도 뒤에 오는 말에 따라 형식이 달라집니다.\n\n| 문장 | 형식 |\n|---|---|\n| The bus gets there at noon. (버스가 정오에 그곳에 도착합니다.) | 1형식 |\n| It gets dark early. (일찍 어두워집니다.) | 2형식 |\n| I get a lot of emails. (나는 이메일을 많이 받습니다.) | 3형식 |\n| She gets me a coffee. (그녀가 내게 커피를 가져다줍니다.) | 4형식 |',
        easy: '형식 고르기는 동사 뒤에 있는 "짐"을 세는 일입니다.\n\n- 짐이 없으면 1형식\n- 짐이 하나: 주어 자신에 대한 설명이면 2형식, 다른 대상이면 3형식\n- 짐이 둘: "사람에게 + 물건을"이면 4형식, "목적어 + 그 상태"면 5형식\n\n때·장소 말(수식어)은 짐으로 세지 않습니다.',
        check: {
          type: 'choice', fixed: true,
          q: '다음 문장은 몇 형식일까요?\n\nIt gets dark early in winter.',
          choices: ['1형식', '2형식', '3형식'],
          answer: 1,
          why: ['동사 뒤의 dark(어두운) — 수식어가 아니라 주어의 상태를 설명하는 꼭 필요한 말입니다.', '', 'dark(어두운) — 동작을 받는 대상이 아니라 주어의 상태입니다.'],
          explain: 'early in winter(겨울에 일찍) — 수식어입니다. 남은 dark(어두운) — 주어의 상태를 설명하는 보어이므로 2형식입니다. "겨울에는 일찍 어두워집니다."',
        },
      },
    ],

    examples: [
      {
        q: '다음 문장의 형식을 말하고, 3형식 문장으로 바꾸어 보세요.\n\nMy sister sends me a photo every day.',
        steps: [
          '수식어를 괄호로 묶습니다: My sister sends me a photo (every day).',
          '동사 sends 뒤에 me(나에게)와 a photo(사진을) 두 말이 남습니다. me ≠ a photo 이고 "누구에게 + 무엇을"이므로 4형식입니다.',
          'send는 물건이 상대에게 건너가는 동사이므로 전치사 to를 씁니다.',
          '직접목적어를 앞으로, "to + 간접목적어"를 뒤로: My sister sends a photo to me every day.',
        ],
        answer: '4형식 → My sister sends a photo to me every day.',
      },
      {
        q: '두 문장의 형식을 비교해 보세요.\n\n(가) This tea smells good.\n(나) I smell the tea.',
        steps: [
          '(가) 동사 smells 뒤의 good(좋은) — 차의 상태(냄새가 좋다)를 설명합니다. tea = good 이므로 보어, 2형식입니다.',
          '(나) 동사 smell 뒤의 the tea — 냄새를 맡는 대상입니다. I ≠ the tea 이므로 목적어, 3형식입니다.',
          '같은 동사 smell도 "냄새가 나다"면 2형식, "냄새를 맡다"면 3형식입니다.',
        ],
        answer: '(가) 2형식 · (나) 3형식',
      },
    ],

    terms: [
      { term: '문장의 형식', def: '동사 뒤에 어떤 성분이 오느냐에 따라 영어 문장을 다섯 가지로 나눈 것입니다. 1형식부터 5형식까지 있습니다.' },
      { term: '보어', def: '주어가 무엇인지·어떤지 설명하는 말입니다(주어 = 보어). 예: She is **a nurse**. / She looks **tired**.' },
      { term: '목적어', def: '동사의 동작을 받는 대상으로 "~을·~를"에 해당합니다. 예: I like **coffee**.' },
      { term: '간접목적어', def: '4형식에서 "~에게"에 해당하는 목적어입니다. 주로 사람이 옵니다. 예: He gave **me** a book.' },
      { term: '직접목적어', def: '4형식에서 "~을·~를"에 해당하는 목적어입니다. 주로 물건이 옵니다. 예: He gave me **a book**.' },
      { term: '목적격 보어', def: '5형식에서 목적어의 상태나 이름을 설명하는 말입니다(목적어 = 목적격 보어). 예: The news made me **happy**.' },
      { term: '감각동사', def: 'look, sound, taste, smell, feel처럼 감각으로 느낀 상태를 말하는 동사입니다. 뒤에 형용사 보어가 옵니다. 예: It smells **good**.' },
      { term: '수여동사', def: '"~에게 ~을 주다·해 주다"라는 뜻으로 4형식을 만드는 동사입니다. 예: give, send, show, teach, buy, make' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '**1형식** 문장을 고르세요.',
        choices: ['The baby sleeps.', 'She is a nurse.', 'I like tea.', 'He gives me a pen.'],
        answer: 0,
        why: [
          '',
          '동사 뒤의 a nurse — 주어와 같은 사람인 보어입니다. 2형식입니다.',
          '동사 뒤의 tea — 좋아하는 대상인 목적어입니다. 3형식입니다.',
          '동사 뒤에 "나에게 + 펜을" 두 목적어가 옵니다. 4형식입니다.',
        ],
        explain: 'The baby sleeps.(아기가 잡니다)는 주어와 동사만으로 뜻이 완성되는 1형식 문장입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 말을 고르세요.\n\nYour plan sounds ___.',
        choices: ['great', 'greatly', 'greatness'],
        answer: 0,
        why: [
          '',
          '부사입니다. 감각동사 sound 뒤에는 주어의 상태를 나타내는 형용사가 옵니다.',
          '"위대함"이라는 명사입니다. "계획 = 위대함"이 아니라 계획이 어떻게 들리는지(좋은) 말해야 합니다.',
        ],
        explain: 'sound(~하게 들리다)는 감각동사이므로 형용사 보어가 옵니다. Your plan sounds great.(계획이 좋은 것 같네요.)',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 2,
        q: '다음 문장에서 밑줄 친 부분은 목적어이고, 이 문장은 3형식입니다.\n\nI like __coffee__.',
        answer: true,
        explain: 'coffee(커피를) — 좋아하는 대상, 곧 목적어입니다(I ≠ coffee). "주어 + 동사 + 목적어"이므로 3형식입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 3,
        q: '다음 문장에서 **간접목적어**(~에게)를 고르세요.\n\nMy aunt sends me a birthday card.',
        choices: ['My aunt', 'sends', 'me', 'a birthday card'],
        answer: 2,
        why: [
          '"누가"에 해당하는 주어입니다.',
          '"보낸다"라는 동사입니다.',
          '',
          '"무엇을"에 해당하는 직접목적어입니다.',
        ],
        explain: '"이모는 내게 생일 카드를 보냅니다." — me(나에게)가 간접목적어, a birthday card(생일 카드를) — 직접목적어입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 4,
        q: '다음 문장에서 **목적격 보어**를 고르세요.\n\nThis coat keeps me warm.',
        choices: ['This coat', 'keeps', 'me', 'warm'],
        answer: 3,
        why: [
          '"무엇이"에 해당하는 주어입니다.',
          '"~한 상태로 두다"라는 동사입니다.',
          '목적어입니다. 목적격 보어는 이 목적어의 상태를 설명하는 말입니다.',
          '',
        ],
        explain: '"이 코트는 나를 따뜻하게 해 줍니다." — warm(따뜻한)이 목적어 me의 상태를 설명합니다(me = warm). 그래서 목적격 보어입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 1,
        q: '괄호 안에서 알맞은 말을 골라 쓰세요.\n\nThis cake tastes (sweet / sweetly).',
        answer: ['sweet'],
        wrong: [
          { a: 'sweetly', why: '부사입니다. 감각동사 taste 뒤에는 맛(상태)을 나타내는 형용사가 보어로 옵니다.' },
        ],
        explain: 'taste(~한 맛이 나다)는 감각동사입니다. 케이크의 맛(상태)을 설명하는 말은 형용사 sweet(단)입니다. "이 케이크는 단맛이 납니다."',
      },
      {
        id: 'p7', level: 1, type: 'choice', fixed: true, concept: 5,
        q: '다음 문장은 몇 형식일까요?\n\nMy brother became a doctor.',
        choices: ['1형식', '2형식', '3형식', '4형식', '5형식'],
        answer: 1,
        why: [
          '동사 뒤의 a doctor — 빼면 뜻이 완성되지 않는 꼭 필요한 말입니다.',
          '',
          'a doctor — 동작을 받는 대상이 아니라 주어와 같은 사람입니다(My brother = a doctor).',
          '4형식은 동사 뒤에 "누구에게 + 무엇을" 두 말이 옵니다. 이 문장에는 하나뿐입니다.',
          '5형식은 동사 뒤에 "목적어 + 목적격 보어" 두 말이 옵니다. 이 문장에는 하나뿐입니다.',
        ],
        explain: '"남동생은 의사가 되었습니다." — a doctor가 주어와 같은 사람(My brother = a doctor)이므로 보어, 2형식입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 3,
        q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 고르세요.\n\nHe shows me his photos.\n= He shows his photos ___ me.',
        choices: ['to', 'for', 'of'],
        answer: 0,
        hint: '보여 주면 사진이 상대에게 "건너가는" 걸까요, 상대를 "위해" 마련하는 걸까요?',
        why: [
          '',
          'for — buy·make·cook처럼 상대를 위해 무언가를 마련해 주는 동사와 씁니다.',
          'of — ask(묻다) 같은 아주 적은 동사에만 씁니다.',
        ],
        explain: 'show(보여 주다)는 give·send·teach처럼 상대에게 건네는 동사이므로 to를 씁니다. He shows his photos to me.(그는 내게 자기 사진들을 보여 줍니다.)',
      },
      {
        id: 'p9', level: 2, type: 'order', concept: 3,
        q: '우리말에 맞게 배열하세요.\n\n지아는 아들에게 샌드위치를 만들어 줍니다.',
        choices: ['Jia', 'makes', 'her son', 'a sandwich'],
        answer: [0, 1, 2, 3],
        hint: '4형식은 "주어 + 동사 + ~에게 + ~을" 순서입니다.',
        explain: '주어(Jia) + 동사(makes) + 간접목적어(her son) + 직접목적어(a sandwich): **Jia makes her son a sandwich.** (3형식으로 쓰면 Jia makes a sandwich for her son.)',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 4,
        q: '두 문장의 형식을 차례대로 바르게 말한 것을 고르세요.\n\n(가) My mom makes me a cake every year.\n(나) This song makes me sad.',
        choices: ['(가) 4형식 · (나) 5형식', '(가) 5형식 · (나) 4형식', '(가) 3형식 · (나) 2형식', '(가) 4형식 · (나) 4형식'],
        answer: 0,
        hint: '동사 뒤의 두 말이 같은 대상인지 보세요.',
        why: [
          '',
          '반대로 말했습니다. (가)는 "나에게 케이크를"(me ≠ a cake), (나)는 "나를 슬프게"(me = sad)입니다.',
          '두 문장 모두 동사 뒤에 말이 두 개 있습니다. 2형식·3형식은 하나뿐입니다.',
          '(나)의 sad(슬픈) — 물건이 아니라 me의 상태입니다(me = sad).',
        ],
        explain: '(가) "엄마는 해마다 나에게 케이크를 만들어 줍니다" — me ≠ a cake 이므로 4형식. (나) "이 노래는 나를 슬프게 합니다" — me = sad 이므로 5형식입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 2,
        q: '밑줄 친 부분이 **보어**인 문장을 고르세요.',
        choices: ['Her son is __a lawyer__.', 'Jia meets __a lawyer__ today.', 'We need __a lawyer__.', 'They call __a lawyer__.'],
        answer: 0,
        why: [
          '',
          '만나는 대상이므로 목적어입니다(Jia ≠ a lawyer).',
          '필요한 대상이므로 목적어입니다(We ≠ a lawyer).',
          '전화하는 대상이므로 목적어입니다(They ≠ a lawyer).',
        ],
        explain: 'Her son is a lawyer.(그녀의 아들은 변호사입니다)에서는 아들 = 변호사이므로 보어입니다. 나머지 문장에서는 같은 a lawyer가 동작을 받는 대상, 곧 목적어입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'text', concept: 4,
        q: '우리말에 맞게 빈칸에 알맞은 동사를 쓰세요.\n\n우리는 우리 개를 "보리"라고 부릅니다.\n→ We ___ our dog Bori.',
        answer: ['call'],
        wrong: [
          { a: 'calls', why: '주어 We — 3인칭 단수가 아니므로 동사는 원형 그대로 씁니다.' },
        ],
        explain: '"~을 …라고 부르다"는 call + 목적어 + 목적격 보어(5형식)입니다. We call our dog Bori. — our dog = Bori 입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 5,
        q: '**2형식** 문장을 고르세요.',
        choices: ['It gets dark early in winter.', 'I get a lot of emails.', 'He gets me a coffee every morning.', 'The bus gets there at noon.'],
        answer: 0,
        hint: '동사는 모두 get입니다. 동사 뒤에 남는 말과 주어의 관계를 보세요.',
        why: [
          '',
          'a lot of emails(많은 이메일을) — 받는 대상인 목적어입니다. 3형식입니다.',
          '"나에게 + 커피를" 두 목적어가 옵니다. 4형식입니다.',
          'there(그곳에)와 at noon(정오에) — 둘 다 수식어입니다. "버스가 도착한다"는 1형식입니다.',
        ],
        explain: 'It gets dark (early) (in winter). — dark(어두운): 주어의 상태를 설명하는 보어이므로 2형식입니다. get은 뒤에 오는 말에 따라 1~4형식으로 모두 쓰입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '다음 문장의 뜻으로 알맞은 것을 고르세요.\n\nI find this book easy.',
        choices: ['나는 이 책이 쉽다고 생각합니다.', '나는 이 책을 쉽게 찾습니다.', '나는 쉬운 책을 찾아냅니다.'],
        answer: 0,
        hint: 'easy가 꾸미는 것은 "찾는 동작"일까요, "책"일까요?',
        why: [
          '',
          '"쉽게 찾다"라면 부사 easily를 써서 I find this book easily.(3형식)라고 합니다.',
          '"쉬운 책"이라면 easy가 book 앞에 와야 합니다(an easy book).',
        ],
        explain: 'find + 목적어(this book) + 목적격 보어(easy)의 5형식입니다. this book = easy, 곧 "이 책이 쉽다고 여긴다"는 뜻입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 3,
        q: '두 문장의 뜻이 같도록 빈칸에 알맞은 전치사를 쓰세요.\n\nMy father buys me a new phone.\n= My father buys a new phone ___ me.',
        answer: ['for'],
        hint: '사 주는 것은 상대를 "위해" 마련하는 일입니다.',
        wrong: [
          { a: 'to', why: 'to — give·send처럼 물건이 상대에게 건너가는 동사와 씁니다. buy(사 주다)는 상대를 위해 마련하는 동사입니다.' },
        ],
        explain: 'buy·make·cook·get처럼 상대를 위해 무언가를 마련해 주는 동사는 3형식으로 바꿀 때 for를 씁니다. "아버지는 제게 새 휴대 전화를 사 주십니다."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 1,
        q: '**옳지 않은** 문장을 고르세요.',
        choices: ['You look tired.', 'This milk smells badly.', 'The room feels warm.', 'The story sounds strange.'],
        answer: 1,
        why: [
          'look 뒤에 형용사 tired(피곤한) — 바르게 썼습니다.',
          '',
          'feel 뒤에 형용사 warm(따뜻한)을 바르게 썼습니다.',
          'sound 뒤에 형용사 strange(이상한) — 바르게 썼습니다.',
        ],
        explain: 'smell(~한 냄새가 나다) — 감각동사이므로 우유의 상태를 나타내는 형용사가 와야 합니다. **This milk smells bad.**(이 우유는 상한 냄새가 납니다.)로 고칩니다.',
      },
      {
        id: 'a5', level: 3, type: 'order', concept: 4,
        q: '우리말에 맞게 배열하세요.\n\n사람들은 그를 천재라고 부릅니다.',
        choices: ['People', 'call', 'him', 'a genius'],
        answer: [0, 1, 2, 3],
        hint: '"~을 …라고 부르다"는 call + 목적어 + 목적격 보어입니다.',
        explain: '주어(People) + 동사(call) + 목적어(him) + 목적격 보어(a genius): **People call him a genius.** — him = a genius 이므로 5형식입니다.',
      },
    ],

    deeper: [
      {
        title: '5형식으로 다 설명되지 않는 문장도 있다',
        body: '5형식 분류는 문장의 뼈대를 빨리 잡는 데 아주 쓸모 있는 도구입니다. 하지만 영어의 모든 문장이 다섯 칸에 깔끔하게 들어가지는 않습니다.\n\n예를 들어 I put the book on the table.(나는 책을 탁자 위에 놓았습니다)에서 on the table은 장소를 나타내지만 빼면 "책을 놓았다"가 어색해집니다. 이런 말은 수식어처럼 생겼어도 동사가 꼭 필요로 하는 말입니다.\n\n그래서 형식은 "정답을 맞히는 규칙"이라기보다 **동사 뒤에 무엇이 필요한지 살펴보는 습관**으로 익히는 것이 좋습니다. 새 동사를 배울 때 "뒤에 무엇이 오는가"를 함께 기억하면 문장을 훨씬 정확하게 만들 수 있습니다.',
      },
      {
        title: 'to와 for — 뜻으로 고르기',
        body: '4형식을 3형식으로 바꿀 때 전치사는 동사의 뜻으로 고를 수 있습니다.\n\n- **to**: 물건이나 말이 상대에게 "건너가는" 일 — give, send, show, teach, tell, lend, bring, pay, sell\n- **for**: 상대를 "위해" 무언가를 마련해 주는 일 — buy, make, cook, get, find, bake, build\n\n그래서 to는 "~에게", for는 "~을 위해"로 옮기면 자연스럽습니다.\n\n- I send a letter **to** my friend. (친구에게 편지를 보냅니다.)\n- I cook dinner **for** my family. (가족을 위해 저녁을 요리합니다.)',
      },
    ],

    faq: [
      {
        q: '5형식을 꼭 외워야 하나요?',
        a: '형식 이름을 외우는 것보다 "동사 뒤에 무엇이 오는가"를 보는 눈이 중요합니다. 형식은 그 눈을 기르는 연습 도구입니다.\n\n문장을 읽다 막히면 수식어를 괄호로 묶고 동사 뒤에 남은 것을 세어 보세요. 그러면 문장의 뼈대와 뜻이 훨씬 빨리 보입니다.',
      },
      {
        q: 'look happy는 왜 happily가 아니에요?',
        a: '우리말로는 "행복하게 보인다"라고 해서 부사를 쓰고 싶어지지만, 영어의 look은 "~해 보이다"라는 2형식 동사입니다. 뒤의 말은 동작을 꾸미는 것이 아니라 주어의 상태를 설명하는 보어입니다.\n\n그래서 She = happy 처럼 주어의 상태를 나타내는 형용사를 씁니다. taste, smell, sound, feel도 같습니다.',
      },
      {
        q: '4형식이랑 5형식은 어떻게 구별해요?',
        a: '동사 뒤 두 말의 관계를 보세요. 둘이 서로 다른 것(사람 ≠ 물건)이고 "누구에게 무엇을"로 옮겨지면 4형식, 둘이 같은 대상(목적어 = 그 상태·이름)이면 5형식입니다.\n\nShe made me a cake.(나에게 케이크를 → 4형식) / The news made me happy.(내가 행복한 상태 → 5형식)',
      },
    ],

    mistakes: [
      '감각동사 뒤에 부사를 쓰는 실수 — She looks happily. (✗) → She looks happy. (○)',
      '4형식을 3형식으로 바꿀 때 순서나 전치사를 빠뜨리는 실수 — He gave a book me. (✗) → He gave a book to me. (○)',
      '4형식과 5형식을 혼동하는 실수 — 동사 뒤의 두 말이 같은 대상(me = happy)이면 5형식, 다른 대상(me ≠ a cake)이면 4형식입니다.',
    ],

    gens: [
      {
        id: 'which-form',
        level: 2,
        title: '문장의 형식 판별하기',
        make: function (R) {
          var item = R.pick(FORMS);
          var k = item[1] - 1;
          return {
            type: 'choice', fixed: true, concept: 5,
            q: '다음 문장은 몇 형식일까요?\n\n' + item[0],
            choices: FORM_NAMES.slice(),
            answer: k,
            hint: '때·장소를 나타내는 수식어를 괄호로 묶고, 동사 뒤에 남은 말을 세어 보세요.',
            why: FORM_NAMES.map(function (n, i) { return i === k ? '' : FORM_DESC[i] + ' 이 문장의 꼴과 다릅니다.'; }),
            explain: item[2] + '\n\n그래서 ' + FORM_NAMES[k] + '입니다. ' + FORM_DESC[k],
          };
        },
      },
      {
        id: 'four-to-three',
        level: 2,
        title: '4형식을 3형식으로 — to와 for',
        make: function (R) {
          var g = R.pick(GIVE);
          var opts = ['to', 'for', 'of'];
          var four = g[0] + ' ' + g[1] + ' ' + g[2] + ' ' + g[3] + '.';
          var three = g[0] + ' ' + g[1] + ' ' + g[3] + ' ___ ' + g[2] + '.';
          var full = g[0] + ' ' + g[1] + ' ' + g[3] + ' ' + g[4] + ' ' + g[2] + '.';
          return {
            type: 'choice', concept: 3,
            q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 고르세요.\n\n' + four + '\n= ' + three,
            choices: opts,
            answer: opts.indexOf(g[4]),
            hint: '물건이 상대에게 "건너가는" 일인지, 상대를 "위해" 마련해 주는 일인지 생각해 보세요.',
            why: opts.map(function (o) { return o === g[4] ? '' : PREP_WHY[o]; }),
            explain: '"' + g[5] + '"\n\n' + PREP_WHY[g[4]] + '\n\n바른 문장: ' + full,
          };
        },
      },
    ],

    vocab: [
      { w: 'become', m: '~이 되다', ex: 'My sister wants to become a nurse.', exm: '제 여동생은 간호사가 되고 싶어 합니다.' },
      { w: 'taste', m: '~한 맛이 나다', ex: 'This soup tastes salty.', exm: '이 수프는 짠맛이 납니다.' },
      { w: 'smell', m: '~한 냄새가 나다; 냄새를 맡다', ex: 'The bread smells good.', exm: '빵 냄새가 좋습니다.' },
      { w: 'sound', m: '~하게 들리다', ex: 'Your idea sounds interesting.', exm: '당신의 생각은 흥미롭게 들립니다.' },
      { w: 'lend', m: '빌려주다', ex: 'Can you lend me your pen?', exm: '펜 좀 빌려줄 수 있어요?' },
      { w: 'send', m: '보내다', ex: 'I send my parents a message every day.', exm: '저는 매일 부모님께 메시지를 보냅니다.' },
      { w: 'show', m: '보여 주다', ex: 'Please show me your ticket.', exm: '표를 보여 주세요.' },
      { w: 'keep', m: '(어떤 상태로) 유지하다', ex: 'Exercise keeps you healthy.', exm: '운동은 여러분을 건강하게 지켜 줍니다.' },
      { w: 'call', m: '(~라고) 부르다; 전화하다', ex: 'We call him Junho.', exm: '우리는 그를 준호라고 부릅니다.' },
      { w: 'salty', m: '짠', ex: 'The kimchi is a little salty.', exm: '김치가 조금 짭니다.' },
      { w: 'neighbor', m: '이웃', ex: 'My neighbor has a big dog.', exm: '제 이웃은 큰 개를 키웁니다.' },
      { w: 'guest', m: '손님', ex: 'The guests arrive at six.', exm: '손님들은 여섯 시에 도착합니다.' },
      { w: 'genius', m: '천재', ex: 'People call her a genius.', exm: '사람들은 그녀를 천재라고 부릅니다.' },
      { w: 'boring', m: '지루한', ex: 'I find the lecture boring.', exm: '저는 그 강의가 지루하다고 생각합니다.' },
    ],
  });
})();
