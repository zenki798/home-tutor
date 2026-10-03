/* 공통영어1 · 관계사 심화
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). */
Tutor.registerUnit({
  id: 'eng-h-c1-06',
  course: 'eng-h-c1',
  title: '관계사 심화',
  summary: '계속적 용법, 전치사와 함께 쓰는 관계대명사, 관계부사와 복합관계사로 길어진 문장을 정확히 읽습니다.',
  goals: [
    '관계대명사의 계속적 용법을 이해하고, 앞 문장 전체를 받는 which를 해석할 수 있다.',
    '전치사 + 관계대명사(in which, with whom)를 바르게 쓰고 관계부사와 바꿔 쓸 수 있다.',
    '관계부사 where·when·why·how를 선행사에 맞게 쓸 수 있다.',
    '복합관계대명사·복합관계부사의 뜻을 구별하고 양보의 뜻으로 해석할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '관계대명사의 계속적 용법',
      body: '관계대명사 앞에 **콤마(,)**를 찍으면 **계속적 용법**이 됩니다. 선행사를 좁혀 정하는 것이 아니라, 이미 정해진 선행사에 **정보를 덧붙입니다**. 해석은 앞에서부터 "그리고 그 사람은 ~", "그런데 그것은 ~"처럼 이어서 합니다.\n\n| 용법 | 문장 | 뜻 |\n|---|---|---|\n| 제한적 | She has two sons **who** are doctors. | 의사인 아들이 둘 있다 (다른 아들이 더 있을 수 있음) |\n| 계속적 | She has two sons**, who** are doctors. | 아들이 둘 있는데, 그들은 의사이다 (아들은 둘뿐) |\n\n계속적 용법의 관계대명사는 **접속사 + 대명사**로 바꿀 수 있습니다: ~, who = and he / but she …\n\n**which**는 계속적 용법에서 앞 문장 **전체(또는 일부)**를 받을 수 있습니다.\n- He passed the test**, which** surprised everyone. (그가 시험에 합격했는데, **그것이** 모두를 놀라게 했다)\n\n> ⚠️ 계속적 용법에는 **that**과 **what**을 쓰지 않습니다. I met Jisu, **that** told me the news. (×) → I met Jisu, **who** told me the news. (○)',
      easy: '콤마는 "잠깐, 덧붙여 말하면…"이라는 신호입니다.\n\n"나에게는 의사인 오빠가 있어."는 오빠가 여럿일 때 그중 의사인 오빠를 골라 말하는 것입니다. "나에게는 오빠가 있는데, 의사야."는 오빠 이야기를 먼저 하고 정보를 덧붙인 것입니다. 앞의 것이 제한적 용법, 뒤의 것이 콤마를 찍는 계속적 용법입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nI have an uncle, [[blank]] works as a firefighter in Daegu.',
        choices: ['who', 'that', 'what'],
        answer: 0,
        why: ['', '콤마 뒤 계속적 용법에는 that을 쓰지 않습니다.', 'what은 선행사를 품은 관계대명사라서 선행사(an uncle) 뒤에 쓸 수 없고, 계속적 용법에도 쓰지 않습니다.'],
        explain: '선행사가 사람(an uncle)이고 콤마가 있는 계속적 용법이므로 **who**를 씁니다. "삼촌이 한 분 계신데, 그분은 대구에서 소방관으로 일하신다."라는 뜻입니다.',
      },
    },
    {
      title: '전치사 + 관계대명사',
      body: '관계대명사가 관계절 안에서 **전치사의 목적어**일 때, 전치사를 관계대명사 앞으로 옮길 수 있습니다.\n\n- This is the house. + My father was born **in** the house.\n- → This is the house **in which** my father was born.\n- → This is the house **which** my father was born **in**.\n- → This is the house my father was born **in**. (목적격 관계대명사 생략)\n\n| 선행사 | 전치사 + 관계대명사 |\n|---|---|\n| 사람 | with **whom**, to **whom**, for **whom** |\n| 사물 | in **which**, on **which**, about **which** |\n\n> ⚠️ 전치사 바로 뒤에는 **that**과 **who**를 쓰지 않습니다. the friend with **whom** I traveled (○) / with who (×) / with that (×)\n\n> ⚠️ 전치사가 관계대명사 앞에 있으면 관계대명사를 **생략할 수 없습니다**. the house in my father was born (×)\n\n어떤 전치사를 쓸지는 관계절의 동사·명사와의 짝으로 정합니다: talk **to** someone → the person **to whom** I talked, depend **on** something → the friend **on whom** I depend.',
      easy: '두 문장을 하나로 합칠 때 겹치는 낱말(the house)을 관계대명사로 바꾸는데, 그 낱말 앞에 붙어 있던 전치사(in)를 "같이 데리고" 앞으로 나오는 것입니다.\n\nin the house → in which. 전치사와 관계대명사가 한 덩어리로 움직인다고 생각하면 쉽습니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nThe classmate with [[blank]] I did the science project is moving to Gwangju.',
        choices: ['whom', 'who', 'that'],
        answer: 0,
        why: ['', '전치사(with) 바로 뒤에는 who를 쓰지 않습니다. 목적격 whom을 씁니다.', '전치사 바로 뒤에는 that을 쓰지 않습니다.'],
        explain: 'I did the science project **with the classmate**에서 the classmate가 전치사 with의 목적어입니다. 전치사를 앞으로 옮기면 **with whom**이 됩니다.',
      },
    },
    {
      title: '관계부사와 바꿔 쓰기',
      body: '**관계부사**는 "접속사 + 부사" 역할을 하며, 선행사의 종류에 따라 고릅니다. 관계부사는 **전치사 + which**로 바꿔 쓸 수 있습니다.\n\n| 선행사 | 관계부사 | = 전치사 + which | 예 |\n|---|---|---|---|\n| 장소 (the place, the town) | **where** | in / at / on which | the town **where** I grew up |\n| 시간 (the day, the year) | **when** | on / in / at which | the day **when** we first met |\n| 이유 (the reason) | **why** | for which | the reason **why** he left |\n| 방법 (the way) | **how** | in which | **how** she solved it |\n\n> ⚠️ **the way**와 **how**는 함께 쓰지 않습니다. the way she solved it (○) / how she solved it (○) / the way how she solved it (×)\n\n**관계부사와 관계대명사 구별**: 관계부사 뒤에는 빠진 것이 없는 **완전한 문장**, 관계대명사 which 뒤에는 주어나 목적어가 빠진 **불완전한 문장**이 옵니다.\n- This is the museum **where** I saw the dinosaur bones. (I saw the bones — 완전)\n- This is the museum **which** I visited last week. (I visited ___ — 목적어가 빠짐)\n\n선행사가 the place, the time, the reason처럼 뻔하면 선행사를 생략하기도 합니다: That is **why** I was late.',
      easy: '관계부사는 "~하는 곳(where), ~하는 때(when), ~하는 이유(why), ~하는 방법(how)"입니다. 선행사가 장소면 where, 시간이면 when을 고르면 됩니다.\n\n헷갈리면 빈칸 뒤 문장만 따로 읽어 보십시오. "I saw the bones."처럼 그 자체로 완전하면 관계부사, "I visited."처럼 무엇을 방문했는지 빠져 있으면 관계대명사 which입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nI still remember the summer [[blank]] our family traveled to Jeju Island.',
        choices: ['when', 'where', 'which'],
        answer: 0,
        why: ['', '선행사 the summer는 장소가 아니라 시간입니다.', '빈칸 뒤 "our family traveled to Jeju Island"는 빠진 것이 없는 완전한 문장이라서 관계대명사 which가 올 수 없습니다.'],
        explain: '선행사 the summer가 **시간**이고 뒤 문장이 완전하므로 관계부사 **when**을 씁니다. in which로 바꿔 쓸 수도 있습니다.',
      },
    },
    {
      title: '복합관계대명사 whoever·whatever·whichever',
      body: '**복합관계대명사**는 "관계대명사 + -ever" 형태로, 선행사를 품고 있습니다. 쓰임이 두 가지입니다.\n\n| 형태 | 명사절 (~하는 누구든, 무엇이든) | 양보 부사절 (누가/무엇을 ~하더라도) |\n|---|---|---|\n| **whoever** | = anyone who | = no matter who |\n| **whatever** | = anything that | = no matter what |\n| **whichever** | = any one that | = no matter which |\n\n- **Whoever** finishes first will get a prize. (먼저 끝내는 **사람은 누구든** 상을 받는다 → 명사절, 주어)\n- You can choose **whatever** you like. (좋아하는 **것은 무엇이든** → 명사절, 목적어)\n- **Whatever** happens, I will be on your side. (무슨 일이 **일어나더라도** → 양보)\n- Take **whichever** you want. (원하는 **것은 어느 것이든** → 명사절)\n\n> 💡 문장에서 주어·목적어 자리에 있으면 명사절, 콤마와 함께 문장 앞에 따로 떨어져 있으면 대개 양보 부사절입니다.',
      easy: '-ever는 "~이든 상관없이"라는 뜻을 더합니다. who(누구) + ever = "누구든", what(무엇) + ever = "무엇이든"입니다.\n\n"먼저 오는 사람은 누구든 선물을 받아요."처럼 쓰면 사람을 가리키는 whoever, "원하는 건 뭐든 골라."처럼 쓰면 물건을 가리키는 whatever입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\n[[blank]] wants to join the drama club can sign up in Room 203.',
        choices: ['Whoever', 'Whatever', 'However'],
        answer: 0,
        why: ['', 'whatever는 "~하는 것은 무엇이든"이라는 뜻으로 사물을 가리킵니다. 동아리에 가입하고 싶은 것은 사람입니다.', 'however는 "아무리 ~해도"라는 뜻의 복합관계부사라서 주어 자리에 올 수 없습니다.'],
        explain: '동아리에 가입하고 싶은 **사람은 누구든**이라는 뜻으로 문장의 주어 역할을 하므로 **Whoever**(= Anyone who)를 씁니다.',
      },
    },
    {
      title: '복합관계부사 whenever·wherever·however와 양보',
      body: '**복합관계부사**는 "관계부사 + -ever" 형태입니다. 시간·장소의 뜻과 **양보**(~하더라도)의 뜻이 있습니다.\n\n| 형태 | 시간·장소 | 양보 |\n|---|---|---|\n| **whenever** | ~할 때마다, ~할 때는 언제든 (= every time, at any time) | 언제 ~하더라도 (= no matter when) |\n| **wherever** | ~하는 곳은 어디든 (= at any place) | 어디에서 ~하더라도 (= no matter where) |\n| **however** | — | 아무리 ~하더라도 (= no matter how) |\n\n- **Whenever** I hear this song, I think of my grandmother. (이 노래를 **들을 때마다**)\n- My dog follows me **wherever** I go. (내가 **가는 곳은 어디든**)\n- **However** hard I try, I cannot solve this puzzle. (**아무리** 열심히 **해도**)\n\n**however**는 양보로 쓸 때 **however + 형용사·부사 + 주어 + 동사** 어순을 지킵니다.\n- However **tired you are**, you should brush your teeth. (○)\n- However you are tired, ~ (×)\n\n> ⚠️ 문장 앞의 "However, ~"(콤마, 그러나)는 앞 문장과 반대 내용을 잇는 **접속부사**입니다. 뒤에 형용사·부사가 바로 붙는 복합관계부사 however와 구별하십시오.',
      easy: '"아무리 피곤해도 양치는 해야 해."에서 "아무리 ~해도"가 however입니다. 영어에서는 "얼마나 피곤한지(how tired)"에 ever를 붙여 However tired you are라고 씁니다.\n\n그래서 however 바로 뒤에는 "얼마나"에 해당하는 형용사나 부사(tired, hard, fast)가 붙어 다닙니다.',
      check: {
        type: 'ox',
        q: '"However hard he practiced, he could not win the race."는 "그는 아무리 열심히 연습해도 경주에서 이길 수 없었다."라는 뜻이다.',
        answer: true,
        explain: '**However + 부사(hard) + 주어 + 동사**는 "아무리 ~해도"라는 양보의 뜻입니다(= No matter how hard he practiced). 해석이 바릅니다.',
      },
    },
  ],

  examples: [
    {
      q: '두 문장을 관계사를 써서 세 가지 방법으로 한 문장으로 만드십시오.\n\nThis is the town. My grandmother grew up in the town.',
      steps: [
        '겹치는 말은 the town입니다. 둘째 문장에서 the town은 전치사 in의 목적어입니다.',
        '전치사를 데리고 앞으로 옮기면: This is the town **in which** my grandmother grew up.',
        '전치사를 뒤에 남기면: This is the town **which**(that) my grandmother grew up **in**. (which·that은 생략할 수도 있습니다)',
        'the town은 장소이고 in which는 관계부사 where로 바꿀 수 있습니다: This is the town **where** my grandmother grew up.',
      ],
      answer: 'This is the town in which / where my grandmother grew up. (또는 which my grandmother grew up in)',
    },
    {
      q: '다음 문장을 해석하십시오.\n\nJunho forgot his best friend\'s birthday, which made his friend upset. However busy you are, you should not forget such days.',
      steps: [
        '첫 문장의 ", which"는 계속적 용법이며, 앞 문장 전체(준호가 친한 친구의 생일을 잊은 것)를 받습니다.',
        '→ "준호는 가장 친한 친구의 생일을 잊었는데, 그 일이 친구를 속상하게 했다."',
        '둘째 문장의 However 뒤에 형용사 busy가 바로 붙었으므로 접속부사가 아니라 "아무리 ~해도"의 복합관계부사입니다.',
        '→ "아무리 바쁘더라도 그런 날을 잊어서는 안 된다."',
      ],
      answer: '준호는 가장 친한 친구의 생일을 잊었는데, 그 일이 친구를 속상하게 했다. 아무리 바쁘더라도 그런 날을 잊어서는 안 된다.',
    },
  ],

  terms: [
    { term: '계속적 용법', def: '관계대명사 앞에 콤마를 찍어 선행사에 정보를 덧붙이는 쓰임입니다. that은 쓸 수 없습니다. 예: I met Jisu, who told me the news.' },
    { term: '제한적 용법', def: '콤마 없이 관계절이 선행사의 범위를 좁혀 정하는 쓰임입니다. 예: the boy who is wearing a cap' },
    { term: '전치사 + 관계대명사', def: '관계절 속 전치사를 관계대명사 앞으로 옮긴 꼴입니다. 사람은 whom, 사물은 which를 씁니다. 예: the house in which I live' },
    { term: '관계부사', def: '선행사가 장소·시간·이유·방법일 때 쓰는 where, when, why, how입니다. 전치사 + which로 바꿔 쓸 수 있고, 뒤에 완전한 문장이 옵니다.' },
    { term: '복합관계대명사', def: 'whoever, whatever, whichever처럼 선행사를 품은 관계대명사입니다. "~하는 누구든/무엇이든" 또는 "누가/무엇을 ~하더라도"라는 뜻입니다.' },
    { term: '복합관계부사', def: 'whenever, wherever, however입니다. "~할 때마다, ~하는 곳은 어디든", 또는 양보의 "언제/어디서/아무리 ~하더라도"라는 뜻입니다.' },
    { term: '양보', def: '"~하더라도, ~일지라도"처럼 앞의 조건과 상관없이 뒤의 일이 일어남을 나타내는 뜻입니다. no matter + 의문사로 바꿔 쓸 수 있습니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nWe visited Gyeongju, [[blank]] is famous for its old temples and tombs.',
      choices: ['which', 'that', 'where', 'what'],
      answer: 0,
      why: ['', '콤마 뒤 계속적 용법에는 that을 쓰지 않습니다.', '빈칸 뒤 "is famous for ~"에는 주어가 빠져 있습니다. 주어 역할을 할 관계대명사가 필요하고, 관계부사 where는 주어가 될 수 없습니다.', 'what은 선행사를 품은 관계대명사라서 선행사(Gyeongju) 뒤에 쓸 수 없습니다.'],
      explain: '선행사 Gyeongju는 사물(장소 이름)이고, 빈칸 뒤에 주어가 빠져 있으며 콤마가 있습니다. 그래서 계속적 용법의 주격 관계대명사 **which**를 씁니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: 'Seojun said nothing at the meeting, which made the others worried.에서 which는 앞 문장 전체(서준이 회의에서 아무 말도 하지 않은 것)를 가리킨다.',
      answer: true,
      explain: '계속적 용법의 which는 앞 문장 **전체**를 받을 수 있습니다. 다른 사람들을 걱정하게 한 것은 "회의"가 아니라 "서준이 회의에서 아무 말도 하지 않은 것"입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nThis is the hospital in [[blank]] I was born.',
      choices: ['which', 'that', 'where', 'who'],
      answer: 0,
      why: ['', '전치사(in) 바로 뒤에는 that을 쓰지 않습니다.', 'where는 이미 "in which"의 뜻을 품고 있어 앞에 in을 또 쓰지 않습니다. in 없이 the hospital where I was born이라고 씁니다.', 'who는 사람을 받는 관계대명사입니다. 선행사 the hospital은 사물이고, 전치사 뒤에는 who를 쓰지 않습니다.'],
      explain: 'I was born **in the hospital**에서 the hospital이 전치사 in의 목적어입니다. 사물이므로 **in which**가 됩니다. (= the hospital where I was born)',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nDo you know the reason [[blank]] Mina was absent today?',
      choices: ['why', 'where', 'when', 'how'],
      answer: 0,
      why: ['', 'where는 장소를 나타내는 선행사 뒤에 씁니다. the reason은 이유입니다.', 'when은 시간을 나타내는 선행사 뒤에 씁니다.', 'how는 방법을 나타내며, 선행사 없이 씁니다. the reason은 이유입니다.'],
      explain: '선행사가 **이유**(the reason)이므로 관계부사 **why**를 씁니다. for which로 바꿔 쓸 수 있습니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nYou can order [[blank]] you want from the menu. It\'s my treat!',
      choices: ['whatever', 'whoever', 'wherever', 'however'],
      answer: 0,
      why: ['', 'whoever는 사람을 가리킵니다. 메뉴에서 주문하는 것은 음식(사물)입니다.', 'wherever는 "~하는 곳은 어디든"이라는 부사절을 만듭니다. order의 목적어가 필요합니다.', 'however는 "아무리 ~해도"라는 뜻이고, 뒤에 형용사·부사가 와야 합니다.'],
      explain: 'order의 **목적어** 자리에 "원하는 **것은 무엇이든**"이 필요하므로 **whatever**(= anything that)를 씁니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 4,
      q: '빈칸에 알맞은 낱말 하나를 쓰십시오.\n\n[[blank]] difficult the test is, I will do my best.\n(시험이 아무리 어렵더라도 나는 최선을 다할 것이다.)',
      answer: ['however', 'no matter how'],
      wrong: [{ a: 'whatever', why: 'whatever는 "무엇이 ~하더라도"입니다. "아무리 어렵더라도"처럼 정도를 말할 때는 however + 형용사를 씁니다.' }, { a: 'how', why: 'how만 쓰면 "얼마나 어려운지"라는 뜻이 됩니다. 양보의 뜻을 나타내려면 -ever를 붙여 however로 씁니다.' }],
      explain: '**However + 형용사(difficult) + 주어 + 동사**는 "아무리 ~하더라도"라는 양보의 뜻입니다. No matter how difficult the test is로도 쓸 수 있습니다.',
    },
    {
      id: 'p7', level: 2, type: 'choice', concept: 0,
      hint: '콤마가 있으면 선행사가 이미 정해진 것이고, 정보를 덧붙일 뿐입니다.',
      q: '다음 문장에 대한 설명으로 알맞은 것은 무엇입니까?\n\nMrs. Kang has three daughters, who are all teachers.',
      choices: ['강 씨 부인의 딸은 세 명뿐이다.', '강 씨 부인에게는 교사가 아닌 딸이 더 있을 수 있다.', '세 딸 가운데 한 명만 교사이다.', '강 씨 부인 자신이 교사이다.'],
      answer: 0,
      why: ['', '콤마가 없는 제한적 용법(three daughters who are all teachers)일 때 그렇게 해석할 여지가 있습니다. 계속적 용법은 "딸이 셋 있는데"라고 덧붙여 말합니다.', 'all teachers라고 했으므로 세 딸 모두 교사입니다.', 'who가 가리키는 것은 three daughters입니다. 부인이 교사라는 말은 없습니다.'],
      explain: '계속적 용법은 "딸이 셋 **있는데**, 그들은 모두 교사이다"라는 뜻입니다. 딸은 세 명뿐이고, 그 세 명에 대한 정보(모두 교사)를 덧붙인 것입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 1,
      hint: '관계절 속 동사 depend가 어떤 전치사와 짝을 이루는지 생각해 보십시오.',
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nMy older sister is the person on [[blank]] I depend the most.',
      choices: ['whom', 'who', 'that', 'which'],
      answer: 0,
      why: ['', '전치사(on) 바로 뒤에는 주격 who를 쓰지 않고 목적격 whom을 씁니다.', '전치사 바로 뒤에는 that을 쓰지 않습니다.', 'which는 사물을 받습니다. 선행사 the person은 사람입니다.'],
      explain: 'I depend **on the person**(그 사람에게 의지한다)에서 the person이 전치사 on의 목적어입니다. 사람이므로 **on whom**이 됩니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      hint: '관계부사 why를 "전치사 + which"로 바꿀 때 어떤 전치사가 이유를 나타내는지 생각해 보십시오.',
      q: '두 문장의 뜻이 같도록 빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nThat is the reason why the game was canceled.\n= That is the reason [[blank]] the game was canceled.',
      choices: ['for which', 'in which', 'on which', 'of which'],
      answer: 0,
      why: ['', 'in which는 장소(where)나 방법(the way)을 나타낼 때 씁니다.', 'on which는 날짜(on the day)나 표면 위의 장소를 나타낼 때 씁니다.', 'of which는 이유를 나타내는 관계부사 why를 대신하지 않습니다.'],
      explain: '이유를 나타내는 전치사는 for(~ 때문에)입니다. 그래서 관계부사 why는 **for which**로 바꿔 씁니다.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 1,
      hint: '"전치사 + 관계대명사"는 한 덩어리로 선행사 바로 뒤에 옵니다.',
      q: '"이곳은 할머니께서 자라신 마을이다."라는 뜻이 되도록 순서대로 놓으십시오.',
      choices: ['This is', 'the village', 'in which', 'my grandmother', 'grew up'],
      answer: [0, 1, 2, 3, 4],
      explain: 'This is + the village(선행사) + **in which**(전치사 + 관계대명사) + my grandmother grew up. My grandmother grew up **in the village**에서 in the village가 in which로 바뀌어 앞으로 나왔습니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      hint: 'Whatever가 콤마와 함께 문장 앞에 따로 떨어져 있습니다.',
      q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\nWhatever you decide, I will support you.',
      choices: ['네가 무엇을 결정하더라도 나는 너를 지지할 것이다.', '네가 결정한 것은 무엇이든 나에게 알려 줘.', '네가 언제 결정하더라도 나는 기다릴 것이다.', '네가 결정하지 않으면 나는 너를 지지하지 않을 것이다.'],
      answer: 0,
      why: ['', '알려 달라는 내용은 문장에 없습니다. I will support you(지지할 것이다)가 주절입니다.', '"언제"는 whenever의 뜻입니다. whatever는 "무엇을"입니다.', '조건(if not)의 뜻이 아니라 양보의 뜻입니다. 결정과 상관없이 지지하겠다는 말입니다.'],
      explain: '문장 앞에 콤마와 함께 놓인 **Whatever**는 양보 부사절을 이끕니다(= No matter what you decide). "네가 무엇을 결정하**더라도**"라는 뜻입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      hint: 'the way와 how를 함께 쓸 수 있는지 떠올려 보십시오.',
      q: '다음 중 어법상 **옳지 않은** 문장은 무엇입니까?',
      choices: ['This is the way how she solved the problem.', 'This is how she solved the problem.', 'This is the way she solved the problem.', 'This is the way in which she solved the problem.'],
      answer: 0,
      why: ['', '옳은 문장입니다. 선행사 the way 없이 how만 썼습니다.', '옳은 문장입니다. how 없이 the way만 썼습니다.', '옳은 문장입니다. the way in which는 how와 같은 뜻으로 쓸 수 있습니다.'],
      explain: '**the way와 how는 함께 쓰지 않습니다.** the way 또는 how 가운데 하나만 쓰거나, the way in which로 씁니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      hint: '계속적 용법, 전치사 뒤의 관계대명사, 관계부사 뒤의 문장을 하나씩 점검하십시오.',
      q: '다음 중 어법상 **옳지 않은** 문장은 무엇입니까?',
      choices: ['I ran into Jisu, that told me about the festival.', 'The man to whom I spoke was very kind.', 'She finally passed the driving test, which made her parents happy.', 'Summer is the season when many people go to the beach.'],
      answer: 0,
      why: ['', '옳은 문장입니다. 전치사 to 뒤에 사람을 받는 목적격 whom을 썼습니다.', '옳은 문장입니다. 계속적 용법의 which가 앞 문장 전체를 받습니다.', '옳은 문장입니다. 시간을 나타내는 선행사 the season 뒤에 관계부사 when과 완전한 문장이 왔습니다.'],
      explain: '계속적 용법(콤마 뒤)에는 that을 쓰지 않습니다. 선행사가 사람이므로 **I ran into Jisu, who told me about the festival.**이 바른 문장입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      hint: '관계사 뒤의 문장이 완전한지, 무엇이 빠졌는지 따져 보십시오.',
      q: '두 문장을 한 문장으로 바르게 합친 것이 **아닌** 것은 무엇입니까?\n\nI visited the museum. Many old maps are kept in the museum.',
      choices: [
        'I visited the museum which many old maps are kept.',
        'I visited the museum where many old maps are kept.',
        'I visited the museum in which many old maps are kept.',
        'I visited the museum which many old maps are kept in.',
      ],
      answer: 0,
      why: [
        '',
        '옳습니다. the museum은 장소이고 뒤 문장(many old maps are kept)이 완전하므로 관계부사 where를 씁니다.',
        '옳습니다. in the museum의 in을 관계대명사 앞으로 옮긴 꼴입니다.',
        '옳습니다. 전치사 in을 관계절 끝에 남겨 둔 꼴입니다.',
      ],
      explain: '"many old maps are kept"는 주어와 동사가 다 있는 완전한 문장이라서, 앞에 관계대명사 which만 쓰면 in이 빠지게 됩니다. which를 쓰려면 in which로 쓰거나 끝에 in을 남겨야 하고, 아니면 관계부사 **where**를 씁니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 4,
      hint: '"~하는 곳은 어디든"이라는 뜻의 복합관계부사입니다.',
      q: '빈칸에 알맞은 낱말 하나를 쓰십시오.\n\nThis little speaker is so light that you can take it [[blank]] you go.\n(이 작은 스피커는 아주 가벼워서 네가 가는 곳은 어디든 가지고 갈 수 있다.)',
      answer: ['wherever', 'anywhere', 'everywhere'],
      wrong: [{ a: 'where', why: 'where만 쓰면 "네가 가는 곳"이라는 특정한 장소가 됩니다. "가는 곳은 어디든"이라는 뜻은 -ever를 붙인 wherever입니다.' }, { a: 'whenever', why: 'whenever는 "~할 때마다, 언제든"이라는 시간의 뜻입니다. 이 문장은 장소("어디든")를 말합니다.' }],
      explain: '**wherever** you go는 "네가 가는 곳은 어디든"(= to any place you go)이라는 뜻의 복합관계부사입니다. anywhere(everywhere) you go라고 써도 같은 뜻이 됩니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 0,
      hint: '모두를 놀라게 한 것이 사람인지, 사물인지, 일어난 일인지 생각해 보십시오.',
      q: '다음 문장에서 모두를 놀라게 한 것은 무엇입니까?\n\nMinho, who rarely studied, got the highest score on the test, which surprised everyone.',
      choices: ['민호가 시험에서 가장 높은 점수를 받은 것', '민호', '시험', '가장 높은 점수'],
      answer: 0,
      why: ['', '민호는 첫 번째 관계절 who rarely studied의 선행사입니다. 두 번째 which가 사람을 받는다면 which가 아니라 who를 썼을 것입니다.', '시험 자체가 모두를 놀라게 한 것이 아닙니다. 거의 공부하지 않던 민호가 최고 점수를 받은 "일"이 놀라운 것입니다.', '점수만 따로 떼어 놀라운 것이 아니라, 거의 공부하지 않던 민호가 그 점수를 받았다는 일 전체가 놀라운 것입니다.'],
      explain: '첫 번째 ", who rarely studied"는 Minho에 대한 덧붙임입니다. 두 번째 ", which surprised everyone"은 앞 내용 **전체**, 곧 "(거의 공부하지 않던) 민호가 시험에서 가장 높은 점수를 받은 것"을 받습니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 3,
      hint: '빈칸 (A)는 "~하는 사람은 누구든", (B)는 "아무리 ~해도"입니다.',
      q: '빈칸 (A), (B)에 들어갈 말로 바르게 짝지은 것은 무엇입니까?\n\n(A) ___ breaks the window will have to pay for it.\n(B) ___ fast you run, you can\'t catch the last bus now.',
      choices: ['(A) Whoever — (B) However', '(A) Whatever — (B) However', '(A) Whoever — (B) Whatever', '(A) Whichever — (B) Wherever'],
      answer: 0,
      why: ['', '창문을 깨는 것은 사람입니다. whatever는 사물을 가리킵니다.', '(B)는 fast(부사) 앞에서 "아무리 빨리 ~해도"라는 뜻이므로 However입니다.', '(A)는 사람이므로 Whoever, (B)는 "아무리 ~해도"이므로 However입니다.'],
      explain: '(A) 창문을 깨는 **사람은 누구든** 물어내야 합니다 → **Whoever**(= Anyone who). (B) **아무리** 빨리 달려도 → **However** fast you run(= No matter how fast you run).',
    },
  ],

  deeper: [
    {
      title: '글에서 콤마 하나가 바꾸는 뜻',
      body: '계속적 용법과 제한적 용법은 콤마 하나로 갈리지만, 뜻 차이는 꽤 큽니다.\n\n- The students **who** finished the test early went home. — 일찍 끝낸 학생들만 집에 갔다.\n- The students**, who** finished the test early, went home. — 학생들이 (모두) 시험을 일찍 끝냈고, 집에 갔다.\n\n말할 때는 콤마 대신 잠깐 쉬는 것으로 계속적 용법을 나타냅니다. 신문 기사나 설명문에서 사람·장소 이름 뒤에 ", who ~", ", which ~"로 정보를 덧붙이는 경우가 매우 많으니, 콤마를 보면 "앞말에 대한 덧붙임"이라고 읽어 두면 긴 문장도 쉽게 따라갈 수 있습니다.',
    },
    {
      title: '복합관계사와 no matter + 의문사',
      body: '양보의 뜻을 나타내는 복합관계사는 **no matter + 의문사**로 바꿔 쓸 수 있습니다.\n\n| 복합관계사 | = no matter + 의문사 |\n|---|---|\n| whoever | no matter who |\n| whatever | no matter what |\n| whichever | no matter which |\n| whenever | no matter when |\n| wherever | no matter where |\n| however | no matter how |\n\n다만 명사절로 쓰인 복합관계대명사(Whoever comes first will win.)는 no matter who로 바꿀 수 없습니다. 이때는 "~하는 사람은 누구든(anyone who)"이라는 뜻이기 때문입니다. 문장 안에서 주어·목적어 역할을 하는지, 따로 떨어진 부사절인지를 보고 판단하십시오.',
    },
  ],

  faq: [
    {
      q: '계속적 용법에는 왜 that을 못 써요?',
      a: 'that은 원래 선행사를 좁혀 정해 주는(제한적) 관계절에 어울리는 말이라, 콤마 뒤에서 정보를 덧붙이는 계속적 용법에는 쓰지 않는 것이 규칙입니다. 콤마 뒤에서는 사람이면 who(whom), 사물이나 앞 문장 전체면 which를 쓰십시오.',
    },
    {
      q: 'where랑 which는 어떻게 구별해요? 선행사가 둘 다 장소인데요.',
      a: '선행사만 보지 말고 빈칸 뒤 문장을 보십시오. "I grew up"처럼 빠진 것이 없으면 관계부사 where, "I visited ___"처럼 목적어나 주어가 빠져 있으면 관계대명사 which입니다. the town where I grew up / the town which I visited 둘 다 맞습니다.',
    },
    {
      q: '문장 앞의 However는 다 "그러나"예요?',
      a: '아닙니다. "However, ~"처럼 콤마가 바로 붙으면 "그러나"라는 접속부사이고, "However hard ~"처럼 뒤에 형용사·부사가 바로 붙으면 "아무리 ~해도"라는 복합관계부사입니다.',
    },
  ],

  mistakes: [
    '계속적 용법에 that을 쓰는 실수 — I met Jisu, **who** told me the news. (that ×)',
    '전치사 뒤에 who나 that을 쓰는 실수 — the friend **with whom** I traveled. 사람은 whom, 사물은 which를 씁니다.',
    'the way how를 함께 쓰는 실수 — the way 또는 how 가운데 하나만 씁니다.',
  ],

  gens: [
    {
      id: 'choose-relative',
      level: 2,
      title: '알맞은 관계사 고르기',
      make: function (R) {
        var name = R.pick(['Minsu', 'Jia', 'Seojun', 'Hayun', 'Doyun', 'Sua']);
        var W = {
          that: 'that은 콤마 뒤(계속적 용법)나 전치사 바로 뒤에 쓰지 않습니다.',
          what: 'what은 선행사를 품은 관계대명사라서 선행사 뒤에 쓰지 않습니다.',
          which_full: '빈칸 뒤 문장이 빠진 것 없이 완전합니다. 관계대명사 which가 아니라 관계부사가 필요합니다.',
          where_gap: '빈칸 뒤 문장에 주어나 목적어가 빠져 있습니다. 관계부사가 아니라 관계대명사가 필요합니다.',
          who_prep: '전치사 바로 뒤에는 who를 쓰지 않고 목적격 whom을 씁니다.',
          who_thing: 'who는 사람을 받습니다. 선행사가 사물입니다.',
          which_person: 'which는 사물을 받습니다. 선행사가 사람입니다.',
          when_place: 'when은 시간을 나타내는 선행사 뒤에 씁니다.',
          where_time: 'where는 장소를 나타내는 선행사 뒤에 씁니다.',
          ever_person: '빈칸에는 사람을 가리키는 말("~하는 사람은 누구든")이 필요합니다.',
          ever_thing: '빈칸에는 사물을 가리키는 말("~하는 것은 무엇이든")이 필요합니다.',
          ever_time: '빈칸에는 "~할 때마다"라는 시간의 뜻이 필요합니다.',
          ever_place: '빈칸에는 "~하는 곳은 어디든"이라는 장소의 뜻이 필요합니다.',
          ever_how: '빈칸 바로 뒤에 형용사·부사가 있어 "아무리 ~해도"라는 뜻의 however가 필요합니다.',
        };
        var bank = [
          { c: 0, s: 'I called ' + name + ', [[blank]] lives next door.', a: 'who', o: [['that', W.that], ['which', W.which_person], ['what', W.what], ['where', W.where_gap]], ex: '선행사가 사람(' + name + ')이고 콤마 뒤 계속적 용법이며 주어가 빠져 있으므로 who를 씁니다.' },
          { c: 0, s: name + ' lent me a novel, [[blank]] I finished in one night.', a: 'which', o: [['that', W.that], ['who', W.who_thing], ['what', W.what], ['where', W.where_gap]], ex: '선행사가 사물(a novel)이고 콤마 뒤 계속적 용법이며 finished의 목적어가 빠져 있으므로 which를 씁니다.' },
          { c: 0, s: name + ' won first prize, [[blank]] made the whole class proud.', a: 'which', o: [['that', W.that], ['who', 'who는 사람을 받습니다. 여기서는 사람이 아니라 앞 문장 전체(1등을 한 일)를 받아야 합니다.'], ['what', W.what], ['when', W.where_gap]], ex: '콤마 뒤 which가 앞 문장 전체(1등을 한 일)를 받습니다. 사람이 아니라 일어난 일을 받으므로 who가 아니라 which입니다.' },
          { c: 1, s: 'The teacher with [[blank]] ' + name + ' talked is from Jeonju.', a: 'whom', o: [['who', W.who_prep], ['that', W.that], ['which', W.which_person], ['what', W.what]], ex: name + ' talked with the teacher에서 the teacher가 전치사 with의 목적어이고 사람이므로 with whom을 씁니다.' },
          { c: 1, s: 'The box in [[blank]] ' + name + ' keeps old letters is under the bed.', a: 'which', o: [['that', W.that], ['who', W.who_thing], ['where', 'where는 이미 "in which"의 뜻을 품고 있어 앞에 in을 또 쓰지 않습니다.'], ['what', W.what]], ex: 'keeps old letters in the box에서 the box가 전치사 in의 목적어이고 사물이므로 in which를 씁니다.' },
          { c: 2, s: 'This is the park [[blank]] ' + name + ' learned to ride a bike.', a: 'where', o: [['which', W.which_full], ['when', W.when_place], ['who', W.who_thing], ['what', W.what]], ex: '선행사 the park가 장소이고 뒤 문장이 완전하므로 관계부사 where를 씁니다(= in which).' },
          { c: 2, s: name + ' still remembers the day [[blank]] the family moved to Busan.', a: 'when', o: [['where', W.where_time], ['which', W.which_full], ['who', W.who_thing], ['what', W.what]], ex: '선행사 the day가 시간이고 뒤 문장이 완전하므로 관계부사 when을 씁니다(= on which).' },
          { c: 2, s: 'Nobody knows the reason [[blank]] ' + name + ' left the party early.', a: 'why', o: [['where', 'where는 장소를 나타내는 선행사 뒤에 씁니다. the reason은 이유입니다.'], ['which', W.which_full], ['when', 'when은 시간을 나타내는 선행사 뒤에 씁니다. the reason은 이유입니다.'], ['what', W.what]], ex: '선행사 the reason이 이유이고 뒤 문장이 완전하므로 관계부사 why를 씁니다(= for which).' },
          { c: 3, s: '[[blank]] finishes the quiz first will get a free notebook.', a: 'Whoever', o: [['Whatever', W.ever_person], ['Whenever', W.ever_person], ['However', W.ever_person], ['Wherever', W.ever_person]], ex: '퀴즈를 먼저 끝내는 "사람은 누구든"이므로 Whoever(= Anyone who)를 씁니다.' },
          { c: 3, s: name + ' always listens to [[blank]] the coach says.', a: 'whatever', o: [['whoever', W.ever_thing], ['however', W.ever_thing], ['whenever', W.ever_thing], ['which', '빈칸 앞에 선행사가 없습니다. 선행사를 품은 말이 필요합니다.']], ex: '코치가 말하는 "것은 무엇이든"이므로 whatever(= anything that)를 씁니다.' },
          { c: 4, s: '[[blank]] I hear this song, I think of summer camp.', a: 'Whenever', o: [['Whichever', W.ever_time], ['Whoever', W.ever_time], ['Whatever', W.ever_time], ['What', W.ever_time]], ex: '이 노래를 "들을 때마다"이므로 Whenever(= Every time)를 씁니다.' },
          { c: 4, s: 'My puppy follows me [[blank]] I go.', a: 'wherever', o: [['which', W.ever_place], ['whoever', W.ever_place], ['whatever', W.ever_place], ['whichever', W.ever_place]], ex: '가는 "곳은 어디든"이므로 wherever를 씁니다.' },
          { c: 4, s: '[[blank]] hard ' + name + ' tries, the puzzle seems impossible to solve.', a: 'However', o: [['Whatever', W.ever_how], ['Whenever', W.ever_how], ['Wherever', W.ever_how], ['Whoever', W.ever_how]], ex: 'hard(부사) 앞에서 "아무리 열심히 해도"라는 양보의 뜻이므로 However를 씁니다(= No matter how).' },
        ];
        var it = R.pick(bank);
        var reason = {};
        it.o.forEach(function (x) { reason[x[0]] = x[1]; });
        var pick = R.choices(it.a, R.shuffle(it.o.map(function (x) { return x[0]; })), 4);
        return {
          type: 'choice', concept: it.c,
          q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\n' + it.s,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === it.a ? '' : reason[c] || ''; }),
          explain: it.ex + '\n\n' + it.s.replace('[[blank]]', '**' + it.a + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'famous', m: '유명한', ex: 'This town is famous for its fresh seafood.', exm: '이 마을은 신선한 해산물로 유명하다.' },
    { w: 'temple', m: '절, 사원', ex: 'We visited an old temple on the mountain.', exm: '우리는 산에 있는 오래된 절을 방문했다.' },
    { w: 'depend', m: '의지하다, ~에 달려 있다', ex: 'You can always depend on me.', exm: '너는 언제든 나에게 의지해도 돼.' },
    { w: 'absent', m: '결석한', ex: 'Three students were absent because of a cold.', exm: '세 명의 학생이 감기 때문에 결석했다.' },
    { w: 'support', m: '지지하다, 응원하다', ex: 'My parents support my dream of becoming a chef.', exm: '부모님은 요리사가 되겠다는 내 꿈을 응원해 주신다.' },
    { w: 'cancel', m: '취소하다', ex: 'The picnic was canceled because of the rain.', exm: '비 때문에 소풍이 취소되었다.' },
    { w: 'treat', m: '대접, 한턱; 대하다', ex: 'Lunch is my treat today.', exm: '오늘 점심은 내가 살게.' },
    { w: 'rarely', m: '좀처럼 ~하지 않는', ex: 'My grandfather rarely watches TV.', exm: '할아버지는 텔레비전을 좀처럼 보지 않으신다.' },
    { w: 'surprise', m: '놀라게 하다; 놀라움', ex: 'The news surprised everyone in the room.', exm: '그 소식은 방에 있던 모두를 놀라게 했다.' },
    { w: 'grow up', m: '자라다, 성장하다', ex: 'I grew up in a small village by the sea.', exm: '나는 바닷가 작은 마을에서 자랐다.' },
    { w: 'keep', m: '보관하다, 간직하다', ex: 'She keeps her old letters in a wooden box.', exm: '그녀는 옛 편지를 나무 상자에 보관한다.' },
    { w: 'sign up', m: '등록하다, 신청하다', ex: 'Did you sign up for the English camp?', exm: '영어 캠프에 신청했니?' },
  ],
});
