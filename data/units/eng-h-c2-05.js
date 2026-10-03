/* 공통영어2 · 수동태 심화
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). */
Tutor.registerUnit({
  id: 'eng-h-c2-05',
  course: 'eng-h-c2',
  title: '수동태 심화',
  summary: '4·5형식 문장과 진행형·완료형·조동사가 있는 문장의 수동태, 구동사의 수동태, It is said that 구문과 be said to 구문을 익히고, 수동태로 쓰지 않는 동사를 구별합니다.',
  goals: [
    '4형식·5형식 문장을 수동태로 바꾸고, 사역·지각동사의 수동태에서 to부정사를 쓸 수 있다.',
    '진행형·완료형·조동사가 있는 문장의 수동태(be being p.p., have been p.p., 조동사 be p.p.)를 쓸 수 있다.',
    '구동사의 수동태와 It is said that ~ / be said to ~ 구문을 바르게 쓸 수 있다.',
    'happen, appear, resemble, have처럼 수동태로 쓰지 않는 동사를 구별할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '4형식 문장의 수동태',
      body: '4형식 문장(주어 + 동사 + 간접목적어 + 직접목적어)은 목적어가 둘이므로 **수동태도 두 가지**로 만들 수 있습니다.\n\nMs. Han gave **us** **a map**. (한 선생님이 우리에게 지도를 주셨다.)\n\n| 주어로 삼는 목적어 | 수동태 문장 |\n|---|---|\n| 간접목적어 us | **We were given** a map by Ms. Han. |\n| 직접목적어 a map | **A map was given to us** by Ms. Han. |\n\n직접목적어를 주어로 삼으면 남은 간접목적어 앞에 **전치사**를 씁니다. 어떤 전치사를 쓸지는 동사가 정합니다.\n\n| 전치사 | 동사 |\n|---|---|\n| to | give, send, show, teach, tell, lend, offer |\n| for | make, buy, cook, get, find |\n| of | ask |\n\n> ⚠️ make, buy, cook, get 같은 동사는 보통 **직접목적어만** 주어로 삼습니다. A cake was made **for** me. (O) / I was made a cake. (쓰지 않음)',
      easy: '선물을 주고받는 장면을 두 가지 방향에서 사진 찍는다고 생각해 보십시오. 받은 사람을 주인공으로 찍으면 "우리는 지도를 받았다(We were given a map)", 선물을 주인공으로 찍으면 "지도가 우리에게 주어졌다(A map was given to us)"입니다.\n\n선물이 주인공일 때는 "누구에게" 갔는지 길을 알려 주는 전치사(to, for)가 필요합니다. give처럼 상대에게 **건네는** 동사는 to, make처럼 상대를 **위해 만들어 주는** 동사는 for라고 기억하면 쉽습니다.',
      check: {
        type: 'choice',
        q: '다음 문장을 수동태로 바르게 바꾼 것을 고르십시오.\n\nMy aunt bought me a new bag.',
        choices: ['A new bag was bought for me by my aunt.', 'A new bag was bought to me by my aunt.', 'A new bag bought for me by my aunt.'],
        answer: 0,
        why: ['', 'buy는 "~을 위해 사 주다"라는 뜻이라 간접목적어 앞에 to가 아니라 for를 씁니다.', 'be동사가 빠졌습니다. 수동태는 be + p.p. 꼴이므로 was bought입니다.'],
        explain: 'buy는 직접목적어 a new bag을 주어로 삼고, 간접목적어 me 앞에 **for**를 씁니다. 그래서 A new bag **was bought for me** by my aunt.입니다.',
      },
    },
    {
      title: '5형식 문장의 수동태와 사역·지각동사',
      body: '5형식 문장(주어 + 동사 + 목적어 + 목적격 보어)은 **목적어를 주어로** 삼고, 목적격 보어는 수동태 동사 뒤에 그대로 둡니다.\n\n- The children call the dog **Max**. → The dog **is called Max**.\n- The news made everyone **happy**. → Everyone **was made happy** by the news.\n- The teacher asked us **to be quiet**. → We **were asked to be quiet**.\n\n**사역동사 make, 지각동사 see·hear**는 능동태에서 목적격 보어로 동사원형을 쓰지만, 수동태에서는 **to부정사**로 바꿉니다.\n\n| 능동태 | 수동태 |\n|---|---|\n| They **made** him **wait** outside. | He **was made to wait** outside. |\n| I **saw** her **leave** the room. | She **was seen to leave** the room. |\n| We **heard** him **sing** a song. | He **was heard to sing** a song. |\n\n지각동사의 목적격 보어가 현재분사이면 수동태에서도 그대로 씁니다. I saw her **crossing** the street. → She was seen **crossing** the street.\n\n> ⚠️ 사역동사 let과 have는 이런 수동태를 거의 쓰지 않습니다. let의 뜻은 **be allowed to**로 나타냅니다. My parents let me go. → I **was allowed to go**.',
      easy: '능동태에서 사역·지각동사 뒤의 동사원형은 "to가 숨어 있는" 모양이라고 생각해 보십시오. They made him wait.에서는 made와 him이 가운데에 끼어 있어서 to가 숨어 있지만, 수동태로 바꾸면 He was made 바로 뒤에 동사가 붙게 되어 숨어 있던 **to가 다시 나타납니다.**\n\nHe was made **to** wait. / She was seen **to** leave. — 수동태 make·see·hear 뒤에는 to가 돌아온다고 기억하면 됩니다.',
      check: {
        type: 'ox',
        q: 'They made me clean the room.을 수동태로 바꾸면 I was made clean the room.이 됩니다.',
        answer: false,
        explain: '사역동사 make의 수동태에서는 동사원형이 **to부정사**로 바뀝니다. 바른 문장은 I was made **to clean** the room.입니다.',
      },
    },
    {
      title: '진행형·완료형·조동사가 있는 수동태',
      body: '수동태의 기본은 **be + p.p.**입니다. 진행형·완료형·조동사가 붙으면 이 **be의 모양만** 바뀌고 p.p.는 그대로입니다.\n\n| 형태 | 수동태 | 능동태 → 수동태 |\n|---|---|---|\n| 진행형 | **be being p.p.** | They are repairing the road. → The road **is being repaired**. |\n| 완료형 | **have been p.p.** | Someone has stolen my bike. → My bike **has been stolen**. |\n| 조동사 | **조동사 + be p.p.** | We must finish the work by noon. → The work **must be finished** by noon. |\n\n과거·미래도 같은 원리입니다. was being p.p.(과거진행), had been p.p.(과거완료), will be p.p.(미래).\n\n행위자를 모르거나 중요하지 않을 때는 by ~를 생략합니다. 위의 by them, by someone, by us가 그런 예입니다.\n\n> ⚠️ is been, has being, must is 같은 모양은 쓰지 않습니다. 진행은 being, 완료는 been, 조동사 뒤는 원형 be입니다.',
      easy: '두 가지 규칙을 차례로 적용한다고 생각하면 쉽습니다.\n\n1. 진행형은 **be + -ing**, 완료형은 **have + p.p.**, 조동사 뒤에는 **원형**입니다.\n2. 수동태의 be를 그 자리에 넣으면 be가 각각 **being**(-ing 모양), **been**(p.p. 모양), **be**(원형)로 바뀝니다.\n\n그래서 is **being** repaired, has **been** repaired, must **be** repaired가 됩니다. 마지막 p.p.(repaired)는 언제나 그대로입니다.',
      check: {
        type: 'short', check: 'text',
        q: '빈칸에 알맞은 두 낱말을 쓰십시오.\n\nThe road [[빈칸]] repaired right now, so we have to take another way.',
        answer: ['is being'],
        wrong: [
          { a: 'is been', why: 'been은 완료형(have been p.p.)에 쓰는 모양입니다. right now(지금)는 진행형이므로 is being repaired입니다.' },
          { a: 'is repairing', why: '빈칸 뒤에 repaired가 이미 있습니다. 빈칸에는 진행형 수동태를 만드는 is being만 씁니다.' },
        ],
        explain: 'right now가 있으므로 진행형 수동태 **be being p.p.**를 씁니다. The road **is being** repaired right now.',
      },
    },
    {
      title: '구동사의 수동태',
      body: '동사가 전치사·부사와 한 덩어리로 뜻을 이루는 **구동사**는 수동태에서도 **한 덩어리로** 움직입니다. 전치사·부사를 빠뜨리지 않고 p.p. 바로 뒤에 둡니다.\n\n| 능동태 | 수동태 |\n|---|---|\n| My grandmother **took care of** the baby. | The baby **was taken care of** by my grandmother. |\n| Many people **laughed at** his idea at first. | His idea **was laughed at** by many people at first. |\n| A nurse **looks after** the patients. | The patients **are looked after** by a nurse. |\n| They **put off** the meeting. | The meeting **was put off**. |\n\n그래서 수동태 문장에서 전치사 두 개가 나란히 오기도 합니다(laughed **at by**, taken care **of by**). 틀린 것이 아닙니다.\n\n> ⚠️ The baby was taken care by my grandmother. (X) — of를 빠뜨리면 "돌보다"라는 뜻이 깨집니다.',
      easy: 'take care of는 "돌보다"라는 **한 낱말**처럼 생각하십시오. 낱말 하나를 수동태로 바꿀 때 글자 일부를 떼어 버리지 않듯이, 구동사도 통째로 옮깁니다.\n\ntake care of → **be taken care of**, laugh at → **be laughed at**, look after → **be looked after**. 끝에 붙은 of, at, after가 그대로 따라온다는 것만 기억하면 됩니다.',
      check: {
        type: 'choice',
        q: 'Jia looked after the kitten.을 수동태로 바르게 바꾼 것을 고르십시오.',
        choices: ['The kitten was looked after by Jia.', 'The kitten was looked by Jia.', 'The kitten was looked after Jia.'],
        answer: 0,
        why: ['', 'after를 빠뜨렸습니다. look after(돌보다)는 한 덩어리이므로 수동태에서도 after가 따라옵니다.', '행위자 앞의 by가 빠졌습니다. 구동사의 after 뒤에 by Jia를 씁니다.'],
        explain: 'look after는 구동사이므로 통째로 수동태가 됩니다. The kitten **was looked after by** Jia.',
      },
    },
    {
      title: 'It is said that ~ 구문과 be said to ~ 구문',
      body: 'People say that ~(사람들이 ~라고 말한다)처럼 that절을 목적어로 가진 문장은 수동태를 두 가지로 만듭니다. 이렇게 쓰는 동사로 say, believe, think, know, report, expect 등이 있습니다.\n\nPeople **say** that the lake **is** very deep.\n\n1. **It is said that** the lake is very deep. — 가주어 It을 쓰고 that절은 그대로 둡니다.\n2. The lake **is said to be** very deep. — that절의 주어를 문장의 주어로 삼고, that절의 동사는 **to부정사**로 바꿉니다.\n\n**때가 다를 때**: that절의 일이 주절(say, believe)보다 **앞선** 일이면 **완료부정사 to have p.p.**를 씁니다.\n\nPeople **believe** that the tower **was built** 300 years ago.\n→ It is believed that the tower was built 300 years ago.\n→ The tower **is believed to have been built** 300 years ago.\n\n| that절의 때 | to부정사 |\n|---|---|\n| 주절과 같은 때 | to + 동사원형 (to be, to live) |\n| 주절보다 앞선 때 | to have + p.p. (to have been, to have lived) |\n\n> 💡 주절이 과거여도 원리는 같습니다. People said that he was rich. → He **was said to be** rich. (말한 때와 부자였던 때가 같음)',
      easy: '"그 호수는 아주 깊다고들 해."를 영어로 말하는 방법이 두 가지라고 생각하십시오.\n\n- 소문 전체를 뒤로 미루기: **It is said that** + 소문 그대로\n- 소문의 주인공을 앞으로 꺼내기: **The lake is said to** + 소문 내용\n\n주인공을 앞으로 꺼내면 소문 속 동사는 to부정사가 됩니다. 소문이 **옛날 일**이면 "to have p.p."로 시간이 앞섰다는 표시를 붙입니다.',
      check: {
        type: 'choice',
        q: '다음 문장과 뜻이 같은 것을 고르십시오.\n\nIt is said that Minsu is a great cook.',
        choices: ['Minsu is said to be a great cook.', 'Minsu is said being a great cook.', 'Minsu is said to have been a great cook.'],
        answer: 0,
        why: ['', 'be said 뒤에는 동명사가 아니라 to부정사를 씁니다.', 'to have been은 that절의 일이 더 앞선 때일 때 씁니다. 원래 문장은 지금(is) 요리를 잘한다는 뜻입니다.'],
        explain: 'that절의 주어 Minsu를 문장 주어로 삼고, 때가 같으므로(is said / is) **to be**를 씁니다. Minsu is said to be a great cook.',
      },
    },
    {
      title: '수동태로 쓰지 않는 동사',
      body: '모든 동사가 수동태가 되는 것은 아닙니다.\n\n**1. 목적어가 없는 동사(자동사)** — 수동태는 목적어를 주어로 삼아 만드는데, 목적어가 없으니 수동태도 없습니다. happen, occur, appear, disappear, arrive, exist 등이 있습니다.\n\n- An accident **happened** last night. (O) / An accident was happened last night. (X)\n- A rainbow **appeared** after the rain. (O) / A rainbow was appeared after the rain. (X)\n\n**2. 상태를 나타내는 일부 타동사** — 목적어가 있어도 수동태로 쓰지 않습니다. resemble(닮다), 소유의 뜻인 have(가지고 있다), lack(부족하다), "맞다"는 뜻의 fit, suit(어울리다) 등이 있습니다.\n\n- Jia **resembles** her mother. (O) / Her mother is resembled by Jia. (X)\n- Minsu **has** a bike. (O) / A bike is had by Minsu. (X)\n\n> 💡 우리말로 "사고가 **일어났다**", "무지개가 **나타났다**"처럼 말할 때 "~되다"에 끌려 be p.p.를 붙이지 않도록 조심합니다.',
      easy: '수동태는 "누가 무엇을 했다"에서 **"무엇"(목적어)을 앞으로 꺼내는** 문장입니다. happen(일어나다), appear(나타나다)는 "무엇을"이 없는 동사라서 꺼낼 것이 없습니다.\n\nresemble(닮다)이나 have(가지고 있다)는 "무엇을"이 있기는 하지만 누가 어떤 행동을 **하는** 것이 아니라 그냥 그런 **상태**입니다. "엄마가 지아에게 닮아졌다"가 이상한 것처럼 영어에서도 수동태로 쓰지 않습니다.',
      check: {
        type: 'ox',
        q: '다음 문장은 어법상 바릅니다.\n\nA funny thing was happened in the park last Saturday.',
        answer: false,
        explain: 'happen은 목적어가 없는 자동사라서 수동태로 쓰지 않습니다. 바른 문장은 A funny thing **happened** in the park last Saturday.입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장을 두 가지 수동태로 바꾸십시오.\n\nMr. Kim showed us some old photos.',
      steps: [
        '4형식 문장입니다. 간접목적어 us와 직접목적어 some old photos가 있습니다.',
        '간접목적어를 주어로: us → We. 동사는 과거이고 주어가 복수이므로 were shown, 직접목적어는 그대로 둡니다: We were shown some old photos by Mr. Kim.',
        '직접목적어를 주어로: Some old photos were shown. 남은 간접목적어 앞에는 show가 정하는 전치사 to를 씁니다: … to us by Mr. Kim.',
      ],
      answer: 'We were shown some old photos by Mr. Kim. / Some old photos were shown to us by Mr. Kim.',
    },
    {
      q: '다음 문장을 수동태로 바꾸십시오.\n\nWe saw the boy enter the building.',
      steps: [
        '5형식 문장이고 see는 지각동사입니다. 목적어 the boy를 주어로 삼습니다.',
        '과거이고 주어가 단수이므로 was seen입니다.',
        '능동태의 목적격 보어 동사원형 enter는 수동태에서 to부정사 to enter로 바꿉니다.',
        '행위자 by us는 중요하지 않으므로 생략할 수 있습니다.',
      ],
      answer: 'The boy was seen to enter the building (by us).',
    },
    {
      q: '다음 문장을 두 가지 수동태로 바꾸십시오.\n\nPeople believe that the castle was built in the 15th century.',
      steps: [
        '가주어 It을 쓰고 that절을 그대로 둡니다: It is believed that the castle was built in the 15th century.',
        'that절의 주어 the castle을 문장 주어로 삼으면 The castle is believed …',
        '믿는 것(believe)은 지금이고 지어진 것(was built)은 과거라서 때가 앞섭니다. 완료부정사를 씁니다. 지어진 것이므로 수동형: to have been built.',
      ],
      answer: 'It is believed that the castle was built in the 15th century. / The castle is believed to have been built in the 15th century.',
    },
  ],

  terms: [
    { term: '4형식 문장', def: '주어 + 동사 + 간접목적어(~에게) + 직접목적어(~을)로 된 문장입니다. 목적어가 둘이라 수동태도 두 가지가 가능합니다. 예: She gave me a book.' },
    { term: '5형식 문장', def: '주어 + 동사 + 목적어 + 목적격 보어로 된 문장입니다. 수동태에서는 목적어가 주어가 되고 보어는 동사 뒤에 남습니다. 예: They call him Max. → He is called Max.' },
    { term: '사역동사·지각동사의 수동태', def: 'make, see, hear 뒤의 동사원형 보어는 수동태에서 to부정사가 됩니다. 예: He was made to wait.' },
    { term: '진행형 수동태', def: 'be being p.p. 꼴로 "~되고 있는 중"을 나타냅니다. 예: The road is being repaired.' },
    { term: '완료형 수동태', def: 'have(has, had) been p.p. 꼴입니다. 예: My bike has been stolen.' },
    { term: '구동사', def: '동사 + 전치사·부사가 한 덩어리로 뜻을 이루는 말입니다. 수동태에서도 통째로 움직입니다. 예: take care of → be taken care of' },
    { term: '완료부정사', def: 'to have p.p. 꼴로, 주절의 때보다 앞선 일을 나타냅니다. 예: He is said to have been rich.' },
    { term: '자동사', def: '목적어가 필요 없는 동사입니다. 수동태가 없습니다. 예: happen, appear, disappear, arrive' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 문장을 직접목적어가 주어가 되도록 수동태로 바르게 바꾼 것은 무엇입니까?\n\nMs. Park teaches us English.',
      choices: [
        'English is taught to us by Ms. Park.',
        'English is taught for us by Ms. Park.',
        'English taught to us by Ms. Park.',
        'English is teached to us by Ms. Park.',
      ],
      answer: 0,
      why: ['', 'teach는 간접목적어 앞에 for가 아니라 to를 씁니다.', 'be동사가 빠졌습니다. 수동태는 be + p.p.입니다.', 'teach의 과거분사는 teached가 아니라 taught입니다.'],
      explain: '직접목적어 English를 주어로 삼고, teach는 간접목적어 앞에 **to**를 씁니다: English **is taught to us** by Ms. Park.',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 1,
      q: '수동태 문장이 되도록 빈칸에 알맞은 말을 쓰십시오.\n\nThe coach made the players run ten laps.\n→ The players were made [[빈칸]] ten laps.',
      answer: ['to run'],
      wrong: [
        { a: 'run', why: '사역동사 make의 수동태에서는 동사원형이 to부정사로 바뀝니다. to run입니다.' },
        { a: 'running', why: 'be made 뒤에는 to부정사를 씁니다. running이 아니라 to run입니다.' },
      ],
      explain: '사역동사 make의 수동태: be made **to + 동사원형**. The players were made **to run** ten laps. (선수들은 운동장을 열 바퀴 돌아야 했다.)',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe new library [[빈칸]] right now. It will open next year.',
      choices: ['is being built', 'is building', 'is been built', 'has being built'],
      answer: 0,
      why: ['', '도서관은 짓는 주체가 아니라 지어지는 대상이므로 수동태 is being built를 씁니다.', 'been은 완료형에 씁니다. 진행형 수동태는 be being p.p.입니다.', '완료형 수동태는 has been p.p.이고, being은 진행형에 씁니다. 모양이 섞였습니다.'],
      explain: 'right now(지금 ~되는 중)이므로 진행형 수동태 **is being built**입니다. (새 도서관이 지금 지어지는 중이다.)',
    },
    {
      id: 'p4', level: 1, type: 'short', concept: 2,
      q: '빈칸에 sell을 현재완료 수동태로 알맞게 쓰십시오.\n\nSorry, all the tickets [[빈칸]] already.',
      answer: ['have been sold'],
      wrong: [
        { a: 'has been sold', why: '주어 all the tickets가 복수이므로 has가 아니라 have를 씁니다.' },
        { a: 'have sold', why: '표는 파는 주체가 아니라 팔리는 대상입니다. have been sold로 씁니다.' },
        { a: 'have been selled', why: 'sell의 과거분사는 sold입니다.' },
      ],
      explain: '주어 tickets는 팔린 대상(수동)이고, 이미 다 팔린 상태(완료)이므로 **have been sold**입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nThis form must [[빈칸]] in black ink.',
      choices: ['be filled out', 'is filled out', 'been filled out', 'fill out'],
      answer: 0,
      why: ['', '조동사 뒤에는 동사원형이 오므로 is가 아니라 be입니다.', '조동사 뒤에는 원형 be를 씁니다. been은 완료형에 씁니다.', '서류는 작성하는 주체가 아니라 작성되는 대상이므로 수동태 be filled out입니다.'],
      explain: '조동사가 있는 수동태는 **조동사 + be + p.p.**입니다. This form must **be filled out** in black ink. (이 서류는 검은 잉크로 작성해야 한다.)',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 3,
      q: '다음 문장은 어법상 바릅니다.\n\nThe baby was taken care by her grandmother.',
      answer: false,
      explain: 'take care of(돌보다)는 구동사이므로 수동태에서도 of가 따라옵니다. The baby was taken care **of** by her grandmother.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '우리말 뜻에 맞게 빈칸에 알맞은 것은 무엇입니까?\n\nMr. Lee is said [[빈칸]] five languages. (이 선생님은 다섯 개 언어를 한다고들 한다.)',
      choices: ['to speak', 'speaking', 'that he speaks', 'to have spoken'],
      answer: 0,
      why: ['', 'be said 뒤에는 동명사가 아니라 to부정사를 씁니다.', '주어가 Mr. Lee이면 be said 뒤에 that절을 쓰지 않습니다. that절은 It is said that ~ 구문에 씁니다.', 'to have spoken은 말하는 때보다 앞선 과거의 일입니다. 우리말 뜻은 지금 다섯 개 언어를 한다는 것입니다.'],
      explain: '말하는 때(is said)와 언어를 하는 때가 같으므로 **to + 동사원형**: Mr. Lee is said **to speak** five languages. = It is said that Mr. Lee speaks five languages.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 5,
      q: '어법상 **틀린** 문장은 무엇입니까?',
      choices: [
        'A strange thing happened at school yesterday.',
        'The building was designed by a young architect.',
        'My sister resembles my father.',
        'The thief was disappeared into the crowd.',
      ],
      answer: 3,
      why: ['happen은 자동사이므로 능동태 happened가 바릅니다.', '건물은 설계되는 대상이므로 수동태 was designed가 바릅니다.', 'resemble은 수동태로 쓰지 않으므로 능동태 resembles가 바릅니다.', ''],
      explain: 'disappear는 목적어가 없는 자동사라서 수동태로 쓰지 않습니다. The thief **disappeared** into the crowd.가 바릅니다.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 1,
      q: '"그 남자가 은행에 들어가는 것이 목격되었다."라는 뜻이 되도록 순서대로 놓으십시오.',
      choices: ['The man', 'was seen', 'to enter', 'the bank'],
      answer: [0, 1, 2, 3],
      hint: '지각동사 see의 수동태 뒤에는 to부정사가 옵니다.',
      explain: 'The man was seen to enter the bank. — 능동태 Someone saw the man enter the bank.의 수동태로, 동사원형 enter가 to enter로 바뀝니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 4,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 쓰십시오.\n\nPeople say that the old bridge is dangerous.\n→ The old bridge [[빈칸]] dangerous.',
      answer: ['is said to be'],
      hint: 'that절의 주어를 문장 주어로 삼으면 that절의 동사는 to부정사로 바뀝니다.',
      wrong: [
        { a: 'is said that', why: '주어가 The old bridge이면 that절을 쓰지 않고 to부정사로 잇습니다: is said to be.' },
        { a: 'is said being', why: 'be said 뒤에는 동명사가 아니라 to부정사를 씁니다.' },
        { a: 'is said to have been', why: '말하는 때(say)와 위험한 때(is)가 같으므로 완료부정사가 아니라 to be입니다.' },
      ],
      explain: 'that절의 주어 the old bridge를 문장 주어로, that절의 동사 is는 때가 같으므로 to be로: The old bridge **is said to be** dangerous.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 것은 무엇입니까?\n\nPeople believe that the painting was stolen 50 years ago.\n→ The painting is believed [[빈칸]] 50 years ago.',
      choices: ['to have been stolen', 'to be stolen', 'to have stolen', 'being stolen'],
      answer: 0,
      hint: '믿는 때와 도난당한 때를 비교하고, 그림이 훔치는 주체인지 도둑맞은 대상인지 생각해 보십시오.',
      why: ['', '도난당한 것(was stolen)은 믿는 때(believe)보다 앞선 과거이므로 완료부정사를 씁니다.', '그림은 훔친 주체가 아니라 도둑맞은 대상이므로 수동형 to have been stolen입니다.', 'be believed 뒤에는 to부정사를 씁니다.'],
      explain: '도난(과거)이 믿는 때(현재)보다 앞서므로 완료부정사, 그림은 도둑맞은 대상이므로 수동형: **to have been stolen**.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '다음 안내문의 내용과 일치하는 것은 무엇입니까?\n\nNotice: The school gym is being repainted this week, so P.E. classes will be held in the auditorium. The new basketball hoops have already been installed. Students must not enter the gym until Friday.',
      choices: [
        'The gym is being repainted this week.',
        'The new basketball hoops will be installed next week.',
        'P.E. classes will be held in the gym this week.',
        'Students can enter the gym on Wednesday.',
      ],
      answer: 0,
      hint: 'is being p.p., have been p.p., will be p.p.가 각각 어떤 때를 나타내는지 확인하십시오.',
      why: ['', 'have already been installed — 이미 설치되었습니다(현재완료 수동태).', '체육 수업은 강당(the auditorium)에서 열립니다.', '금요일까지는(until Friday) 체육관에 들어갈 수 없습니다.'],
      explain: 'is being repainted는 진행형 수동태로 "이번 주에 다시 칠해지는 중"이라는 뜻이므로 1번이 일치합니다. 농구 골대는 이미 설치되었고(have already been installed), 수업은 강당에서 열립니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '어법상 **틀린** 문장은 무엇입니까?',
      choices: [
        'A letter was sent to me by my pen pal.',
        'I was given a second chance.',
        'A warm sweater was made to me by my grandmother.',
        'We were shown the way by a police officer.',
      ],
      answer: 2,
      hint: '직접목적어가 주어일 때 간접목적어 앞의 전치사는 동사가 정합니다.',
      why: ['send는 간접목적어 앞에 to를 씁니다. 바른 문장입니다.', '간접목적어 I를 주어로 삼은 give의 수동태입니다. 바른 문장입니다.', '', '간접목적어 We를 주어로 삼은 show의 수동태입니다. 바른 문장입니다.'],
      explain: 'make는 "~을 위해 만들어 주다"라서 간접목적어 앞에 **for**를 씁니다. A warm sweater was made **for** me by my grandmother.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '다음 문장을 수동태로 바꿀 때 뜻이 같은 것은 무엇입니까?\n\nMy parents let me use their car.',
      choices: [
        'I was allowed to use their car by my parents.',
        'I was let use their car by my parents.',
        'I was made to use their car by my parents.',
        'Their car was let me use by my parents.',
      ],
      answer: 0,
      hint: '사역동사 let은 수동태를 거의 쓰지 않습니다. 같은 뜻의 다른 표현을 떠올려 보십시오.',
      why: [
        '',
        'let은 이런 수동태를 쓰지 않습니다. "허락받다"는 be allowed to로 나타냅니다.',
        'be made to는 "억지로 ~하게 되다"라는 뜻이라 "허락하다"는 원래 뜻과 다릅니다.',
        '어순과 형태 모두 틀린 문장입니다.',
      ],
      explain: 'let(~하게 허락하다)의 뜻은 수동태에서 **be allowed to**로 나타냅니다: I was allowed to use their car by my parents.',
    },
    {
      id: 'a3', level: 3, type: 'short', concept: 4,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 쓰십시오.\n\nIt is said that the composer wrote this song in one night.\n→ The composer is said [[빈칸]] this song in one night.',
      answer: ['to have written'],
      hint: '말하는 때(is said)와 곡을 쓴 때(wrote)가 같은지 비교하십시오.',
      wrong: [
        { a: 'to write', why: '곡을 쓴 때(과거)가 말하는 때(현재)보다 앞서므로 완료부정사 to have + p.p.를 씁니다.' },
        { a: 'to have wrote', why: 'have 뒤에는 과거분사 written을 씁니다.' },
        { a: 'to be written', why: '작곡가는 곡을 쓴 주체이므로 수동형이 아니라 to have written입니다.' },
      ],
      explain: '곡을 쓴 것(wrote, 과거)이 말하는 때(is said, 현재)보다 앞서므로 완료부정사 **to have written**을 씁니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '다음 능동태 문장 가운데 수동태로 바꿀 수 **없는** 것은 무엇입니까?',
      choices: [
        'My brother has a new laptop.',
        'Jia broke the vase by mistake.',
        'They put off the meeting.',
        'People speak English in many countries.',
      ],
      answer: 0,
      hint: '목적어가 있어도 수동태로 쓰지 않는 동사가 있습니다.',
      why: [
        '',
        'The vase was broken by Jia by mistake.로 바꿀 수 있습니다.',
        '구동사 put off는 The meeting was put off.로 바꿀 수 있습니다.',
        'English is spoken in many countries.로 바꿀 수 있습니다.',
      ],
      explain: '"가지고 있다"는 뜻의 have는 상태를 나타내는 동사라 목적어가 있어도 수동태로 쓰지 않습니다. A new laptop is had by my brother. (×)',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 내용과 일치하는 것은 무엇입니까?\n\nThe old stone bridge in our village is said to have been built about 400 years ago. According to a local story, it was built by a young man who wanted to visit his friend across the river. Today, the bridge is being repaired because some of its stones have been damaged by heavy rain. It is expected that the work will be finished by next spring.',
      choices: [
        'People say that the bridge was built about 400 years ago.',
        'The repair work has already been finished.',
        'The bridge was damaged by an earthquake.',
        'The young man is said to live in the village now.',
      ],
      answer: 0,
      hint: 'is said to have been built, is being repaired, have been damaged의 때를 하나씩 확인하십시오.',
      why: [
        '',
        'is being repaired(수리되는 중)이고, 공사는 내년 봄까지 끝날 것으로 예상됩니다. 아직 끝나지 않았습니다.',
        '돌이 손상된 원인은 폭우(heavy rain)입니다.',
        '그 젊은이는 다리를 지었다고 전해지는 옛이야기 속 인물입니다. 지금 마을에 산다는 말은 없습니다.',
      ],
      explain: 'is said to have been built about 400 years ago = It is said that the bridge was built about 400 years ago. 사람들은 다리가 약 400년 전에 지어졌다고 말하므로 1번이 일치합니다.',
    },
  ],

  deeper: [
    {
      title: '수동태는 언제 쓸까? — 행위자보다 대상이 중요할 때',
      body: '수동태는 능동태를 바꾼 "연습용 문장"이 아니라, 쓸 이유가 있을 때 고르는 표현입니다.\n\n' +
        '- **행위자를 모르거나 중요하지 않을 때**: My bike **has been stolen**. (누가 훔쳤는지 모른다)\n' +
        '- **대상에 관심이 있을 때**: The bridge **is being repaired**. (누가 고치는지보다 다리가 중요하다)\n' +
        '- **객관적으로 전하고 싶을 때**: It **is said that** ~, The results **are expected** to ~ — 뉴스와 보고서에서 "누가 말했는지"를 앞세우지 않고 사실처럼 전할 때 씁니다.\n' +
        '- **과학 글**: The water **was heated** to 100°C. — 실험한 사람보다 과정이 중요합니다.\n\n' +
        '일상 대화에서는 be 대신 **get**을 쓴 수동태도 자주 들립니다. He **got hurt** during the game. / My phone **got broken**. get 수동태는 갑자기 일어난 변화나 좋지 않은 일에 잘 어울립니다.\n\n' +
        '> 💡 It is said that ~은 편리하지만, 글에서 근거를 밝혀야 할 때 "누가" 말했는지를 숨기는 표현이 될 수도 있습니다. 매체 자료를 읽을 때는 "누가 그렇게 말하는가?"를 함께 따져 보십시오(이 과정의 「매체 자료 비판적으로 읽기」 단원).',
    },
  ],

  faq: [
    {
      q: '수동태에서 by ~는 언제 빼요?',
      a: '행위자가 누구인지 모르거나(by someone), 일반 사람들이거나(by people, by them), 말하지 않아도 뻔할 때는 by ~를 빼는 것이 자연스럽습니다. English is spoken in Canada.에 by people을 붙이지 않는 것과 같습니다. 행위자가 새로운 정보이거나 중요할 때만 by ~를 씁니다.',
    },
    {
      q: 'be interested in, be covered with처럼 by 말고 다른 전치사가 오는 건 왜예요?',
      a: '이런 표현은 "누가 했다"는 동작보다 **상태**를 나타내서, 굳어진 전치사와 함께 씁니다. be interested in(~에 관심이 있다), be covered with(~으로 덮여 있다), be known to(~에게 알려져 있다), be made of(~으로 만들어지다) 등은 한 덩어리로 익혀 두십시오.',
    },
    {
      q: 'It is said that ~이랑 They say that ~은 뜻이 같아요?',
      a: '뜻은 거의 같습니다. They say that ~(사람들이 ~라고 한다)은 말할 때 자주 쓰고, It is said that ~이나 be said to ~는 글, 특히 뉴스·설명문에서 더 자주 씁니다. 수동태 쪽이 말하는 사람을 드러내지 않아 더 객관적으로 들립니다.',
    },
    {
      q: 'resemble은 목적어가 있는데 왜 수동태가 안 돼요?',
      a: '수동태는 "누가 무엇에 어떤 행동을 했다"는 문장에서 그 행동을 **당한 쪽**을 주어로 삼는 것입니다. resemble(닮다)은 누가 무엇을 하는 행동이 아니라 서로 닮은 **상태**라서, 당하는 쪽이 따로 없습니다. have(가지고 있다), fit(맞다), suit(어울리다), lack(부족하다)도 같은 이유로 수동태로 쓰지 않습니다.',
    },
  ],

  mistakes: [
    '진행형·완료형 수동태에서 being과 been을 바꿔 쓰는 실수 — The road is been repaired (×) → is being repaired (○). 진행은 being, 완료는 been입니다.',
    '사역·지각동사의 수동태에서 to를 빠뜨리는 실수 — He was made clean (×) → He was made to clean (○). She was seen leave (×) → She was seen to leave (○).',
    '자동사(happen, appear, disappear)를 수동태로 쓰는 실수 — The accident was happened (×) → The accident happened (○).',
  ],

  gens: [
    {
      id: 'passive-tense',
      level: 1,
      title: '시제에 맞는 수동태 형태 고르기',
      make: function (R) {
        // [목적어, 복수인가, 동사원형, 과거형, 과거분사]
        var objs = [
          ['the bridge', false, 'repair', 'repaired', 'repaired'],
          ['the windows', true, 'clean', 'cleaned', 'cleaned'],
          ['the report', false, 'check', 'checked', 'checked'],
          ['the classrooms', true, 'paint', 'painted', 'painted'],
          ['the letters', true, 'deliver', 'delivered', 'delivered'],
          ['the road', false, 'fix', 'fixed', 'fixed'],
          ['the dishes', true, 'wash', 'washed', 'washed'],
          ['the plants', true, 'water', 'watered', 'watered'],
          ['the cookies', true, 'bake', 'baked', 'baked'],
          ['the website', false, 'update', 'updated', 'updated'],
        ];
        var o = R.pick(objs);
        var pl = o[1], base = o[2], past = o[3], pp = o[4];
        var be = pl ? 'are' : 'is', beX = pl ? 'is' : 'are';
        var was = pl ? 'were' : 'was', wasX = pl ? 'was' : 'were';
        var has = pl ? 'have' : 'has', hasX = pl ? 'has' : 'have';
        var ing = base === 'bake' ? 'baking' : base === 'update' ? 'updating' : base + 'ing';
        var t = R.pick(['present', 'past', 'presProg', 'pastProg', 'perfect', 'modal']);
        var modal = R.pick(['must', 'will', 'should', 'can']);
        var active, tail, correct, cands, kind;
        var numWhy = '수동태 문장의 주어(' + o[0] + ')가 ' + (pl ? '복수' : '단수') + '이므로 ' + (pl ? '복수' : '단수') + ' 동사를 씁니다.';
        if (t === 'present') {
          kind = '현재시제'; active = 'They ' + base + ' ' + o[0] + ' regularly.'; tail = ' regularly.';
          correct = be + ' ' + pp;
          cands = [[beX + ' ' + pp, numWhy], [be + ' ' + base, '수동태는 be + p.p.입니다. 동사원형이 아니라 과거분사(' + pp + ')를 씁니다.'], [be + ' ' + ing, '진행형 능동태 꼴입니다. 수동태 문장의 주어(' + o[0] + ')는 동작을 받는 대상이므로 be + p.p.입니다.'], [was + ' ' + pp, '능동태가 현재시제이므로 be동사도 현재형입니다.']];
        } else if (t === 'past') {
          kind = '과거시제'; active = 'They ' + past + ' ' + o[0] + ' last week.'; tail = ' last week.';
          correct = was + ' ' + pp;
          cands = [[wasX + ' ' + pp, numWhy], [was + ' ' + base, '수동태는 be + p.p.입니다. 동사원형이 아니라 과거분사(' + pp + ')를 씁니다.'], [was + ' ' + ing, '진행형 능동태 꼴입니다. 수동태 문장의 주어(' + o[0] + ')는 동작을 받는 대상이므로 be + p.p.입니다.'], [be + ' ' + pp, '능동태가 과거시제(last week)이므로 be동사도 과거형입니다.']];
        } else if (t === 'presProg') {
          kind = '현재진행형'; active = 'They are ' + ing + ' ' + o[0] + ' now.'; tail = ' now.';
          correct = be + ' being ' + pp;
          cands = [[be + ' been ' + pp, 'been은 완료형에 씁니다. 진행형 수동태는 be being p.p.입니다.'], [beX + ' being ' + pp, numWhy], [be + ' ' + ing, '능동태 꼴입니다. 수동태 문장의 주어(' + o[0] + ')는 동작을 받는 대상이므로 be being p.p.입니다.'], [has + ' been ' + pp, '완료형 수동태입니다. 능동태가 진행형(are ' + ing + ')이므로 be being p.p.입니다.']];
        } else if (t === 'pastProg') {
          kind = '과거진행형'; active = 'They were ' + ing + ' ' + o[0] + ' at that time.'; tail = ' at that time.';
          correct = was + ' being ' + pp;
          cands = [[was + ' been ' + pp, 'been은 완료형에 씁니다. 진행형 수동태는 be being p.p.입니다.'], [wasX + ' being ' + pp, numWhy], [was + ' ' + ing, '능동태 꼴입니다. 수동태 문장의 주어(' + o[0] + ')는 동작을 받는 대상이므로 be being p.p.입니다.'], [be + ' being ' + pp, '능동태가 과거진행형(were ' + ing + ')이므로 be동사도 과거형입니다.']];
        } else if (t === 'perfect') {
          kind = '현재완료'; active = 'They have ' + pp + ' ' + o[0] + '.'; tail = '.';
          correct = has + ' been ' + pp;
          cands = [[has + ' being ' + pp, 'being은 진행형에 씁니다. 완료형 수동태는 have(has) been p.p.입니다.'], [hasX + ' been ' + pp, numWhy], [has + ' ' + pp, '현재완료 능동태 꼴입니다. 수동태 문장의 주어(' + o[0] + ')는 동작을 받는 대상이므로 been을 넣어야 합니다.'], [be + ' being ' + pp, '진행형 수동태입니다. 능동태가 현재완료(have ' + pp + ')이므로 have(has) been p.p.입니다.']];
        } else {
          kind = '조동사 ' + modal; active = 'They ' + modal + ' ' + base + ' ' + o[0] + ' soon.'; tail = ' soon.';
          correct = modal + ' be ' + pp;
          cands = [[modal + ' been ' + pp, '조동사 뒤에는 원형 be를 씁니다. been은 완료형에 씁니다.'], [modal + ' ' + be + ' ' + pp, '조동사 뒤에는 동사원형이 오므로 원형 be를 씁니다.'], [modal + ' ' + pp, 'be가 빠졌습니다. 조동사가 있는 수동태는 조동사 + be + p.p.입니다.'], [modal + ' be ' + base, 'be 뒤에는 동사원형이 아니라 과거분사(' + pp + ')를 씁니다.']];
        }
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, R.shuffle(cands.map(function (c) { return c[0]; })));
        var subj = o[0].charAt(0).toUpperCase() + o[0].slice(1);
        return {
          type: 'choice', concept: 2,
          q: '다음 문장을 수동태로 바꿀 때 빈칸에 알맞은 것은 무엇입니까?\n\n' + active + '\n→ ' + subj + ' [[빈칸]]' + tail,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '능동태의 형태는 ' + kind + ', 수동태 문장의 주어(' + o[0] + ')는 ' + (pl ? '복수' : '단수') + '입니다. be의 모양만 그 형태와 수에 맞추고 p.p.는 그대로 둡니다. → ' + subj + ' **' + correct + '**' + tail + ' (행위자 by them은 생략)',
        };
      },
    },
    {
      id: 'be-said-to',
      level: 2,
      title: 'It is said that ~ → be said to ~ 바꾸기',
      make: function (R) {
        // [that절 주어, 동사원형, -ing, p.p., 현재 동사, 현재 뒷부분, 과거 동사, 과거 뒷부분]
        var items = [
          ['Mr. Choi', 'be', 'being', 'been', 'is', 'a great cook', 'was', 'a great cook when he was young'],
          ['this tea', 'help', 'helping', 'helped', 'helps', 'people sleep better', 'helped', 'travelers stay warm in winter long ago'],
          ['the village', 'have', 'having', 'had', 'has', 'the cleanest air in the country', 'had', 'a big market a hundred years ago'],
          ['the singer', 'live', 'living', 'lived', 'lives', 'in a small house by the sea', 'lived', 'in this town as a child'],
          ['the tower', 'be', 'being', 'been', 'is', 'the tallest building in the city', 'was', 'a lighthouse about 200 years ago'],
          ['the island', 'be', 'being', 'been', 'is', 'home to many rare birds', 'was', 'part of the mainland long ago'],
          ["Jia's grandmother", 'speak', 'speaking', 'spoken', 'speaks', 'three languages', 'spoke', 'French when she lived in Paris'],
        ];
        var it = R.pick(items);
        var v = R.pick([['say', 'said', '말하는'], ['believe', 'believed', '믿는'], ['think', 'thought', '생각하는']]);
        var isPast = R.bool();
        var S = it[0], base = it[1], ing = it[2], pp = it[3];
        var Sc = S.charAt(0).toUpperCase() + S.slice(1);
        var rest = isPast ? it[7] : it[5];
        var verb = isPast ? it[6] : it[4];
        var simple = 'to ' + base, perfect = 'to have ' + pp;
        var correct = isPast ? perfect : simple;
        var reason = {};
        reason[isPast ? simple : perfect] = isPast
          ? 'that절의 일(' + verb + ', 과거)이 ' + v[2] + ' 때(현재)보다 앞서므로 to + 동사원형이 아니라 완료부정사 to have p.p.를 씁니다.'
          : 'that절의 때(' + verb + ', 현재)가 ' + v[2] + ' 때와 같으므로 완료부정사가 아니라 to + 동사원형을 씁니다.';
        reason[ing] = 'be ' + v[1] + ' 뒤에는 동명사가 아니라 to부정사를 씁니다.';
        reason[base] = 'be ' + v[1] + ' 뒤에는 to가 있는 to부정사를 씁니다.';
        var wrongs = R.shuffle([isPast ? simple : perfect, ing, base]);
        var pick = R.choices(correct, wrongs);
        return {
          type: 'choice', concept: 4,
          q: '두 문장의 뜻이 같도록 빈칸에 알맞은 것은 무엇입니까?\n\nPeople ' + v[0] + ' that ' + S + ' ' + verb + ' ' + rest + '.\n→ ' + Sc + ' is ' + v[1] + ' [[빈칸]] ' + rest + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: 'that절의 주어(' + S + ')를 문장의 주어로 올리면 that절의 동사는 to부정사가 됩니다. ' +
            (isPast ? 'that절의 일(' + verb + ')은 과거로, ' + v[2] + ' 때(현재)보다 앞서므로 완료부정사 to have p.p.를 씁니다.' : 'that절의 때(' + verb + ')가 ' + v[2] + ' 때와 같으므로 to + 동사원형을 씁니다.') +
            ' → ' + Sc + ' is ' + v[1] + ' **' + correct + '** ' + rest + '.',
        };
      },
    },
  ],

  vocab: [
    { w: 'repair', m: '수리하다', ex: 'The old bridge is being repaired.', exm: '그 오래된 다리는 수리되는 중이다.' },
    { w: 'install', m: '설치하다', ex: 'New lights have been installed in the hall.', exm: '강당에 새 조명이 설치되었다.' },
    { w: 'put off', m: '미루다, 연기하다', ex: 'The meeting was put off until next week.', exm: '회의는 다음 주로 미뤄졌다.' },
    { w: 'look after', m: '돌보다', ex: 'The patients are looked after by kind nurses.', exm: '환자들은 친절한 간호사들의 돌봄을 받는다.' },
    { w: 'laugh at', m: '비웃다, ~을 보고 웃다', ex: 'His idea was laughed at by many people at first.', exm: '그의 생각은 처음에 많은 사람에게 비웃음을 샀다.' },
    { w: 'resemble', m: '닮다', ex: 'Jia resembles her mother.', exm: '지아는 어머니를 닮았다.' },
    { w: 'disappear', m: '사라지다', ex: 'The cat disappeared under the car.', exm: '고양이가 차 밑으로 사라졌다.' },
    { w: 'occur', m: '일어나다, 발생하다', ex: 'The accident occurred late at night.', exm: '그 사고는 밤늦게 일어났다.' },
    { w: 'believe', m: '믿다', ex: 'The castle is believed to be 500 years old.', exm: '그 성은 500년 되었다고 여겨진다.' },
    { w: 'expect', m: '예상하다, 기대하다', ex: 'The work is expected to be finished by spring.', exm: '그 공사는 봄까지 끝날 것으로 예상된다.' },
    { w: 'architect', m: '건축가', ex: 'The museum was designed by a young architect.', exm: '그 박물관은 젊은 건축가가 설계했다.' },
    { w: 'auditorium', m: '강당', ex: 'P.E. classes will be held in the auditorium.', exm: '체육 수업은 강당에서 열릴 것이다.' },
    { w: 'allow', m: '허락하다', ex: 'We were not allowed to use our phones during the test.', exm: '우리는 시험 중에 휴대전화를 쓰는 것이 허락되지 않았다.' },
    { w: 'damage', m: '손상을 입히다; 손상', ex: 'Some stones were damaged by heavy rain.', exm: '돌 몇 개가 폭우로 손상되었다.' },
  ],
});
