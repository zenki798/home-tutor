/* 공통영어1 · to부정사·동명사 심화
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). */
Tutor.registerUnit({
  id: 'eng-h-c1-03',
  course: 'eng-h-c1',
  title: 'to부정사·동명사 심화',
  summary: '완료·수동형 준동사와 동명사의 의미상 주어처럼, 중학교에서 배운 to부정사·동명사를 한 단계 넓혀 익힙니다.',
  goals: [
    '가주어·가목적어 it 구문과 to부정사의 의미상 주어(for·of + 목적격)를 바르게 쓸 수 있다.',
    '완료형·수동형 to부정사와 동명사가 나타내는 때와 능동·수동을 구별할 수 있다.',
    'promise·persuade 같은 동사 뒤에서 to부정사의 행위자가 누구인지 찾을 수 있다.',
    'remember·forget·try·regret 뒤의 to부정사와 동명사의 뜻 차이, 독립부정사·동명사 관용 표현을 이해할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '복습: 가주어·가목적어 it과 의미상 주어',
      body: 'to부정사구가 주어나 목적어로 길어지면, 그 자리에 **it**을 두고 진짜 주어·목적어(to부정사구)는 뒤로 보냅니다.\n\n- 가주어: **It** is important **to drink enough water**.\n- 가목적어: I found **it** difficult **to wake up early**. (5형식 동사 find, make, think, consider 뒤)\n\nto부정사의 동작을 **누가** 하는지(의미상 주어)는 to부정사 바로 앞에 씁니다.\n\n| 형태 | 언제 | 예 |\n|---|---|---|\n| **for + 목적격** | 대부분의 형용사 (important, easy, difficult, necessary, possible …) | It is easy **for me** to learn this song. |\n| **of + 목적격** | 사람의 **성격·태도**를 평가하는 형용사 (kind, nice, careless, wise, polite, rude, foolish, brave …) | It was kind **of you** to help me. |\n\n> 💡 구별법: 형용사가 사람 자체를 설명할 수 있으면 of입니다. "You were kind."는 자연스럽지만 "You were important to help."는 어색합니다.',
      easy: 'It은 "자리 맡아 두는 가방"이라고 생각하십시오. 진짜 주인공(to drink enough water)이 길어서 뒤에 서 있고, 앞자리에는 가방(It)만 놓아 둔 것입니다.\n\nfor와 of는 이렇게 고릅니다. "친절하다, 부주의하다, 현명하다"처럼 **그 사람이 어떤 사람인지**를 말하면 of, "중요하다, 어렵다, 쉽다"처럼 **그 일이 어떤 일인지**를 말하면 for입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nIt was careless [[blank]] him to leave his umbrella on the bus.',
        choices: ['of', 'for', 'to'],
        answer: 0,
        why: ['', 'careless(부주의한)는 사람의 성격·태도를 평가하는 형용사라서 for가 아니라 of를 씁니다.', '의미상 주어는 for나 of 뒤에 목적격으로 씁니다. to는 쓰지 않습니다.'],
        explain: 'careless는 "그 사람이 부주의했다"처럼 사람을 평가하는 형용사입니다. 그래서 의미상 주어는 **of him**입니다. (He was careless.가 자연스럽습니다.)',
      },
    },
    {
      title: '완료형·수동형 to부정사',
      body: 'to부정사도 **때**와 **능동·수동**을 나타낼 수 있습니다.\n\n| 형태 | 뜻 | 예 |\n|---|---|---|\n| to + 동사원형 | 본동사와 **같은 때**(또는 그 뒤) | He seems **to be** busy. = It seems that he **is** busy. |\n| **to have p.p.** (완료형) | 본동사보다 **앞선 때** | He seems **to have been** sick. = It seems that he **was**(**has been**) sick. |\n| **to be p.p.** (수동형) | 의미상 주어가 동작을 **당함** | I want **to be invited** to the party. |\n| to have been p.p. | 앞선 때 + 수동 | The bridge seems **to have been built** long ago. |\n\n완료형은 "지금 보기에, 전에 그랬던 것 같다"처럼 **두 때가 다를 때** 씁니다. seem, appear, be said, be believed 뒤에서 자주 봅니다.\n\n수동형은 의미상 주어와 동사의 관계를 따져 정합니다. The results are expected **to be announced** next week.에서 결과(results)는 발표"되는" 것이므로 수동형입니다.\n\n> ⚠️ 부정은 to 앞에 not을 둡니다: She seems **not to have** heard the news.',
      easy: '시간표를 두 줄 그린다고 생각해 보십시오. 위 줄은 "지금 그렇게 보인다(seems)", 아래 줄은 "실제로 그 일이 일어난 때"입니다.\n\n두 때가 같으면 to be, 아래 줄이 더 앞(과거)이면 to have been처럼 have를 넣어 "한 칸 더 과거"라는 표시를 합니다. 그리고 주인공이 직접 하지 않고 "당하는" 일이면 be + p.p.를 넣습니다.',
      check: {
        type: 'choice',
        q: '두 문장의 뜻이 같도록 빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nIt seems that she was nervous yesterday.\n= She seems [[blank]] nervous yesterday.',
        choices: ['to have been', 'to be', 'being'],
        answer: 0,
        why: ['', 'to be는 seems와 같은 때(지금)를 나타냅니다. 긴장한 것은 어제(was)라서 앞선 때입니다.', 'seem 뒤에는 동명사가 아니라 to부정사가 옵니다.'],
        explain: 'seems(현재)보다 was(어제)가 **앞선 때**이므로 완료형 to부정사 **to have been**을 씁니다.',
      },
    },
    {
      title: '동명사의 의미상 주어와 완료형·수동형 동명사',
      body: '동명사의 동작을 하는 사람이 문장의 주어와 다르면, 동명사 앞에 **소유격**이나 **목적격**으로 의미상 주어를 씁니다.\n\n- Do you mind **my(me)** opening the window? (창문을 여는 사람은 "나")\n- I am sure of **his(him)** passing the test. (합격하는 사람은 "그")\n\n격식을 갖춘 글에서는 소유격, 일상 회화에서는 목적격도 많이 씁니다. 의미상 주어가 문장의 주어와 같으면 쓰지 않습니다.\n\n동명사도 때와 수동을 나타냅니다.\n\n| 형태 | 뜻 | 예 |\n|---|---|---|\n| **having p.p.** | 본동사보다 앞선 때 | He is proud of **having won** the prize. (상을 탄 것은 과거) |\n| **being p.p.** | 동작을 당함 | She hates **being treated** like a child. (대우를 "받는" 것) |\n| having been p.p. | 앞선 때 + 수동 | I remember **having been told** about it. |\n\n> ⚠️ 부정은 동명사 바로 앞에 not: I am sorry for **not having called** you.',
      easy: '"엄마는 내가 늦게 오는 것을 싫어하셔."를 영어로 하면 싫어하는 사람(엄마)과 늦게 오는 사람(나)이 다릅니다. 그래서 동명사 앞에 "내가"를 붙여 Mom hates **my** coming home late.라고 씁니다.\n\nhaving p.p.는 "이미 ~한 것", being p.p.는 "~당하는 것"이라고 외워 두면 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nNobody likes [[blank]] at by others.',
        choices: ['being laughed', 'laughing', 'having laughed'],
        answer: 0,
        why: ['', 'laughing at by others는 "남에 의해 비웃는 것"이 되어 뜻이 맞지 않습니다. 비웃음을 "당하는" 것이므로 수동형입니다.', '완료형 능동입니다. 비웃음을 당하는 것이므로 수동형 being p.p.가 필요합니다.'],
        explain: '아무도 남에게 비웃음을 **당하는** 것을 좋아하지 않습니다. 동명사의 수동형 **being laughed** at을 씁니다. by others가 수동의 단서입니다.',
      },
    },
    {
      title: 'to부정사의 행위자 찾기',
      body: '동사 + 목적어 + to부정사 문장에서 to부정사의 동작을 **누가** 하는지는 동사에 따라 다릅니다.\n\n| 동사 | to부정사의 행위자 | 예 |\n|---|---|---|\n| tell, ask, persuade, advise, want, allow, encourage, order | **목적어** | Mom **persuaded me** to see a doctor. → 병원에 가는 사람은 me |\n| **promise** | **주어** | I **promised my mom** to come home early. → 일찍 오는 사람은 I |\n\npersuade(설득하다)는 상대가 그 일을 하도록 만드는 동사라서 목적어가 행동합니다. 반면 promise(약속하다)는 **내가 할 일**을 상대에게 약속하는 것이라서 주어가 행동합니다.\n\n> 💡 헷갈리면 that절로 바꿔 보십시오. I promised my mom **that I would** come home early. / Mom persuaded me **that I should** see a doctor.',
      easy: '"엄마가 나를 설득해서 병원에 가게 했다"에서 병원에 가는 사람은 나(목적어)입니다. "내가 엄마에게 일찍 오겠다고 약속했다"에서 일찍 오는 사람은 나(주어)입니다.\n\n약속(promise)은 언제나 **약속한 사람 자신**이 지키는 것이라고 기억하면 됩니다.',
      check: {
        type: 'ox',
        q: 'Jiho promised his sister to fix her bike.에서 자전거를 고치는 사람은 Jiho이다.',
        answer: true,
        explain: 'promise + 목적어 + to부정사에서는 **주어**가 to부정사의 동작을 합니다. 약속한 사람(Jiho)이 자전거를 고칩니다.',
      },
    },
    {
      title: 'to부정사냐 동명사냐에 따라 뜻이 달라지는 동사',
      body: '다음 동사들은 목적어가 to부정사인지 동명사인지에 따라 뜻이 달라집니다. 대체로 **to부정사는 앞으로 할 일**, **동명사는 이미 한 일**을 가리킵니다.\n\n| 동사 | + to부정사 | + 동명사 |\n|---|---|---|\n| remember | (앞으로) ~할 것을 기억하다 | (과거에) ~한 것을 기억하다 |\n| forget | (앞으로) ~할 것을 잊다 → 하지 않음 | (과거에) ~한 것을 잊다 |\n| regret | ~하게 되어 유감이다 (나쁜 소식을 전할 때) | (과거에) ~한 것을 후회하다 |\n| try | ~하려고 애쓰다 | 시험 삼아 ~해 보다 |\n\n- **Remember to lock** the door. (잠글 것을 잊지 마라)\n- I **remember locking** the door. (잠근 기억이 있다)\n- He **forgot to call** his grandmother. (전화해야 하는 것을 잊어 전화하지 않았다)\n- We **regret to tell** you that the concert has been canceled. (알려 드리게 되어 유감입니다)\n- I **tried to lift** the box, but it was too heavy. (들려고 애썼다)\n- **Try drinking** warm milk if you cannot sleep. (시험 삼아 마셔 보라)\n\n> 💡 stop -ing는 "~하던 것을 멈추다"이고, stop to ~는 "~하려고 (하던 일을) 멈추다"입니다. 이때 to부정사는 목적을 나타내는 부사적 용법입니다.',
      easy: 'to부정사의 to는 원래 "~쪽으로"라는 뜻이라서 **앞으로 가야 할 일**을 가리킨다고 생각하면 쉽습니다. 동명사(-ing)는 이미 해 본 일, 기억 속에 있는 일입니다.\n\n그래서 "내일 숙제 가져올 것 기억해!"는 remember **to bring**, "어릴 때 바다에 간 게 기억나."는 remember **going**입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nI clearly remember [[blank]] this song for the first time at my cousin\'s wedding.',
        choices: ['hearing', 'to hear', 'hear'],
        answer: 0,
        why: ['', 'remember to hear는 "앞으로 들을 것을 기억하다"라는 뜻입니다. 사촌 결혼식에서 처음 들은 것은 이미 지난 일입니다.', 'remember 뒤에 동사원형은 올 수 없습니다.'],
        explain: '사촌 결혼식에서 노래를 처음 들은 것은 **과거에 한 일**입니다. 그래서 remember + 동명사, **hearing**을 씁니다.',
      },
    },
    {
      title: '독립부정사와 동명사 관용 표현',
      body: '**독립부정사**는 문장 전체에 대한 말하는 사람의 태도를 나타내는 to부정사 표현입니다. 주로 문장 앞에 콤마와 함께 씁니다.\n\n| 표현 | 뜻 |\n|---|---|\n| to be honest (with you) | 솔직히 말하면 |\n| to make matters worse | 설상가상으로, 엎친 데 덮친 격으로 |\n| to begin with | 우선, 먼저 |\n| strange to say | 이상한 이야기지만 |\n| needless to say | 말할 필요도 없이 |\n| so to speak | 말하자면 |\n\n**동명사 관용 표현**은 통째로 익혀 둡니다.\n\n| 표현 | 뜻 |\n|---|---|\n| It is no use -ing | ~해도 소용없다 |\n| It goes without saying that ~ | ~은 말할 필요도 없다 |\n| cannot help -ing | ~하지 않을 수 없다 |\n| feel like -ing | ~하고 싶다 |\n| be busy -ing | ~하느라 바쁘다 |\n| look forward to -ing | ~을 고대하다 (to는 전치사) |\n\n예: **To make matters worse**, it started to rain. / **It is no use worrying** about the past.\n\n> ⚠️ look forward to 뒤의 to는 전치사라서 동사원형이 아니라 동명사가 옵니다: I look forward to **seeing** you.',
      easy: '이 표현들은 한 낱말처럼 통째로 쓰는 "말 덩어리"입니다. 우리말의 "솔직히 말해서", "엎친 데 덮친 격으로"를 쪼개어 문법으로 따지지 않는 것과 같습니다.\n\n표에 있는 표현을 소리 내어 읽고, 자기 이야기로 예문을 하나씩 만들어 보면 금방 익숙해집니다.',
      check: {
        type: 'choice',
        q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nI missed the bus this morning. [[blank]], I left my phone at home.',
        choices: ['To make matters worse', 'To be honest', 'So to speak'],
        answer: 0,
        why: ['', 'to be honest는 "솔직히 말하면"입니다. 나쁜 일이 겹치는 흐름과 맞지 않습니다.', 'so to speak는 "말하자면"입니다. 앞의 말을 다른 말로 바꿔 설명할 때 씁니다.'],
        explain: '버스를 놓친 데다 휴대 전화까지 두고 왔습니다. 나쁜 일이 겹칠 때 쓰는 **To make matters worse**(설상가상으로)가 알맞습니다.',
      },
    },
  ],

  examples: [
    {
      q: '두 문장의 뜻이 같도록 바꿔 쓰십시오.\n\nIt seems that the old bridge was built about 200 years ago.\n= The old bridge seems [[blank]] about 200 years ago.',
      steps: [
        '본동사 seems는 현재, that절의 was built는 과거입니다. 다리가 지어진 때가 **앞선 때**이므로 완료형 to부정사(to have p.p.)를 씁니다.',
        '다리는 사람들에 의해 지어"진" 것이므로 **수동**입니다. 수동형은 be + p.p.입니다.',
        '완료(have p.p.)와 수동(be p.p.)을 합치면 to have **been** built가 됩니다.',
      ],
      answer: 'The old bridge seems **to have been built** about 200 years ago.',
    },
    {
      q: '다음 두 문장에서 to부정사의 동작을 하는 사람을 각각 찾으십시오.\n\n(A) Jiwoo promised her coach to practice every morning.\n(B) The coach persuaded Jiwoo to practice every morning.',
      steps: [
        '(A)의 동사는 promise입니다. 약속은 약속한 사람이 지키므로 to practice의 행위자는 주어 **Jiwoo**입니다.',
        '(B)의 동사는 persuade입니다. 설득당한 사람이 그 일을 하므로 to practice의 행위자는 목적어 **Jiwoo**입니다.',
        '두 문장 모두 연습하는 사람은 Jiwoo이지만, (A)에서는 주어 자리, (B)에서는 목적어 자리에 있습니다.',
      ],
      answer: '(A) Jiwoo(주어) / (B) Jiwoo(목적어)',
    },
  ],

  terms: [
    { term: '가주어 it', def: '길어진 to부정사구 주어 대신 주어 자리에 두는 it입니다. 예: It is important to drink enough water.' },
    { term: '가목적어 it', def: 'find, make, think 같은 동사 뒤에서 길어진 to부정사구 목적어 대신 두는 it입니다. 예: I found it difficult to wake up early.' },
    { term: '의미상 주어', def: 'to부정사·동명사의 동작을 하는 사람입니다. to부정사는 for(of) + 목적격, 동명사는 소유격(목적격)으로 앞에 씁니다.' },
    { term: '완료형 to부정사', def: 'to have p.p. 형태로, 본동사보다 앞선 때의 일을 나타냅니다. 예: He seems to have been sick.' },
    { term: '수동형 동명사', def: 'being p.p. 형태로, 동작을 당하는 것을 나타냅니다. 예: She hates being treated like a child.' },
    { term: '독립부정사', def: '문장 전체에 대한 말하는 사람의 태도를 나타내는 to부정사 관용 표현입니다. 예: to be honest, to make matters worse, needless to say' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nIt was very nice [[blank]] you to carry my bags.',
      choices: ['of', 'for', 'with', 'to'],
      answer: 0,
      why: ['', 'nice(친절한)는 사람의 성격·태도를 평가하는 형용사라서 of를 씁니다.', 'to부정사의 의미상 주어는 for나 of로 나타냅니다.', 'to부정사의 의미상 주어는 for나 of로 나타냅니다.'],
      explain: '"You were nice."처럼 nice는 사람을 평가하는 말이므로 의미상 주어는 **of you**입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '두 문장의 뜻이 같도록 빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nIt seems that Mr. Han lived in Busan when he was young.\n= Mr. Han seems [[blank]] in Busan when he was young.',
      choices: ['to have lived', 'to live', 'living', 'to be lived'],
      answer: 0,
      why: ['', 'to live는 seems와 같은 때(지금)를 나타냅니다. 부산에 산 것은 어렸을 때, 곧 앞선 때입니다.', 'seem 뒤에는 to부정사가 옵니다.', '수동형입니다. 살았던 것은 그가 직접 한 일이라서 능동입니다.'],
      explain: 'seems(현재)보다 lived(어렸을 때)가 **앞선 때**이므로 완료형 to부정사 **to have lived**를 씁니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nThe test results are expected [[blank]] next Monday.',
      choices: ['to be announced', 'to announce', 'announcing', 'to have announced'],
      answer: 0,
      why: ['', '결과(results)가 직접 무엇을 발표하는 것이 아닙니다. 결과는 발표"되는" 것이므로 수동형이 필요합니다.', 'expect는 수동태로 쓸 때 뒤에 to부정사가 옵니다. 또 결과는 발표되는 대상입니다.', '능동 완료형입니다. 결과는 발표되는 대상이고, 다음 주 월요일은 앞선 때도 아닙니다.'],
      explain: '시험 결과는 다음 주 월요일에 발표**될** 것으로 예상됩니다. 의미상 주어(results)가 동작을 당하므로 수동형 to부정사 **to be announced**를 씁니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까? (상을 받은 것이 자랑스러워하는 때보다 **앞선 때**임을 분명히 나타내는 형태)\n\nSora is proud of [[blank]] first prize in the speech contest last year.',
      choices: ['having won', 'to have won', 'being won', 'having been won'],
      answer: 0,
      why: ['', '전치사 of 뒤에는 to부정사가 아니라 동명사가 옵니다.', '수동형입니다. 상은 소라가 직접 탄 것이므로 능동입니다. 또 앞선 때도 나타내지 못합니다.', '완료 수동형입니다. 소라가 상을 "받은" 주체이므로 능동이어야 합니다.'],
      explain: '전치사 of 뒤이므로 동명사를 쓰고, 상을 받은 것(작년)이 자랑스러워하는 것(지금)보다 앞선 때이므로 완료형 동명사 **having won**을 씁니다.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 3,
      q: 'Yuna promised me to clean the classroom.에서 교실을 청소하는 사람은 me(나)이다.',
      answer: false,
      explain: 'promise + 목적어 + to부정사에서는 **주어**가 to부정사의 동작을 합니다. 교실을 청소하는 사람은 약속한 Yuna입니다. 만약 동사가 asked였다면(Yuna asked me to clean ~) 청소하는 사람은 me가 됩니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nPlease don\'t forget [[blank]] off the lights when you leave the room.',
      choices: ['to turn', 'turning', 'turn', 'turned'],
      answer: 0,
      why: ['', 'forget + 동명사는 "(과거에) ~한 것을 잊다"입니다. 방을 나설 때 불을 끄는 것은 앞으로 할 일입니다.', 'forget 뒤에 동사원형은 올 수 없습니다.', 'forget 뒤에 과거형 동사는 올 수 없습니다.'],
      explain: '방을 나설 때 불을 끄는 것은 **앞으로 할 일**이므로 forget + to부정사, **to turn**을 씁니다. "불 끄는 것을 잊지 마세요."라는 뜻입니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 5,
      q: '빈칸에 알맞은 낱말 하나를 쓰십시오.\n\nTo be [[blank]], I didn\'t enjoy the movie very much.\n(솔직히 말하면, 나는 그 영화가 별로 재미있지 않았다.)',
      answer: ['honest', 'frank', 'truthful'],
      wrong: [{ a: 'honestly', why: 'honestly는 부사입니다. to be 뒤에는 보어로 형용사 honest를 씁니다. Honestly, I didn\'t ~ 처럼 혼자 쓸 때만 honestly입니다.' }],
      explain: '**To be honest**는 "솔직히 말하면"이라는 독립부정사입니다. 문장 앞에 콤마와 함께 씁니다. To be frank, To be truthful도 같은 뜻으로 씁니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 4,
      hint: '나쁜 소식을 전하는 공식적인 안내문입니다.',
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nWe regret [[blank]] you that your order will arrive two days late.',
      choices: ['to inform', 'informing', 'to have informed', 'inform'],
      answer: 0,
      why: ['', 'regret + 동명사는 "(이미) ~한 것을 후회하다"입니다. 아직 알리지 않은 소식을 지금 알리는 상황입니다.', '완료형은 앞선 때를 나타냅니다. 지금 소식을 전하는 상황과 맞지 않습니다.', 'regret 뒤에 동사원형은 올 수 없습니다.'],
      explain: '"주문하신 물건이 이틀 늦게 도착함을 알려 드리게 되어 유감입니다."라는 뜻입니다. 나쁜 소식을 전할 때 쓰는 regret + to부정사, **to inform**이 알맞습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      hint: 'persuade는 상대가 그 일을 하도록 만드는 동사입니다.',
      q: '다음 문장에서 동아리에 가입하는 사람은 누구입니까?\n\nMinsu persuaded his sister to join the robot club.',
      choices: ['민수의 여동생', '민수', '민수와 여동생 모두', '문장만으로는 알 수 없다'],
      answer: 0,
      why: ['', 'persuade + 목적어 + to부정사에서는 목적어가 행동합니다. 민수는 설득한 사람입니다.', '가입하는 사람은 한 명, 곧 목적어인 여동생입니다.', 'persuade 문장에서는 to부정사의 행위자가 목적어로 정해집니다.'],
      explain: 'persuade + 목적어 + to부정사에서는 **목적어**가 to부정사의 동작을 합니다. 민수가 여동생을 설득해서 여동생이 로봇 동아리에 가입하게 했다는 뜻입니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 0,
      hint: '5형식 동사 find 뒤에서 길어진 목적어 대신 쓰는 말입니다.',
      q: '빈칸에 알맞은 낱말 하나를 쓰십시오.\n\nMany students find [[blank]] hard to wake up early on Monday mornings.',
      answer: ['it'],
      wrong: [{ a: 'that', why: 'to부정사구 목적어를 대신하는 가목적어는 it입니다. that은 쓰지 않습니다.' }, { a: 'this', why: '가목적어 자리에는 it만 씁니다.' }],
      explain: '진짜 목적어 to wake up early on Monday mornings가 길어서 뒤로 보내고, 그 자리에 **가목적어 it**을 둡니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 5,
      hint: '이미 일어난 일을 걱정해도 바꿀 수 없다는 뜻입니다.',
      q: '빈칸에 들어갈 말로 알맞은 것은 무엇입니까?\n\nThe game is already over. It is no use [[blank]] about the last goal.',
      choices: ['complaining', 'to complain', 'complain', 'complained'],
      answer: 0,
      why: ['', 'It is no use 뒤에는 동명사를 쓰는 관용 표현입니다.', 'It is no use 뒤에 동사원형은 올 수 없습니다.', 'It is no use 뒤에 과거형 동사는 올 수 없습니다.'],
      explain: '**It is no use -ing**는 "~해도 소용없다"라는 동명사 관용 표현입니다. "경기는 이미 끝났다. 마지막 골에 대해 불평해도 소용없다."라는 뜻입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      hint: '창문을 여는 사람과 꺼리는 사람이 같은지 보십시오.',
      q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\nWould you mind my opening the window?',
      choices: ['제가 창문을 열어도 될까요?', '창문 좀 열어 주시겠어요?', '창문을 열어 둔 것을 기억하세요?', '창문이 열려 있어도 괜찮으세요?'],
      answer: 0,
      why: ['', '창문을 열어 달라는 부탁이라면 my 없이 Would you mind opening the window?라고 씁니다. 그때는 상대가 엽니다.', 'remember가 아니라 mind(꺼리다)가 쓰였고, 기억에 관한 문장이 아닙니다.', '창문이 열려 "있는" 상태를 묻는 문장이 아닙니다. 여는 동작(opening)의 행위자는 my(나)입니다.'],
      explain: '동명사 opening 앞의 **my**가 의미상 주어입니다. 창문을 여는 사람은 "나"이므로 "제가 창문을 여는 것을 꺼리시나요?", 곧 "제가 창문을 열어도 될까요?"라는 뜻입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      hint: '의미상 주어의 for·of, 완료형, 동명사의 의미상 주어를 하나씩 따져 보십시오.',
      q: '다음 중 어법상 **옳지 않은** 문장은 무엇입니까?',
      choices: ['It was foolish for him to believe such a story.', 'I am sorry for not having called you yesterday.', 'She seems to have been busy last week.', 'He insisted on my paying for the tickets.'],
      answer: 0,
      why: ['', '옳은 문장입니다. 부정어 not은 동명사 바로 앞에 두고, 어제 전화하지 않은 것은 앞선 때라서 완료형을 씁니다.', '옳은 문장입니다. 지난주가 seems(현재)보다 앞선 때라서 완료형 to부정사를 씁니다.', '옳은 문장입니다. 표를 사는 사람(my)이 문장의 주어(He)와 달라서 동명사 앞에 의미상 주어를 씁니다.'],
      explain: 'foolish(어리석은)는 사람의 태도를 평가하는 형용사이므로 의미상 주어는 for him이 아니라 **of him**이어야 합니다. 바른 문장: It was foolish **of him** to believe such a story.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 3,
      hint: '두 문장의 동사가 promise인지 tell인지 보십시오.',
      q: '두 문장에서 to부정사(to come home early)의 행위자를 바르게 짝지은 것은 무엇입니까?\n\n(A) Doyun promised his mother to come home early.\n(B) Doyun\'s mother told him to come home early.',
      choices: ['(A) Doyun — (B) Doyun', '(A) 어머니 — (B) 어머니', '(A) 어머니 — (B) Doyun', '(A) Doyun — (B) 어머니'],
      answer: 0,
      why: ['', '두 동사의 규칙을 거꾸로 적용했습니다. promise에서는 주어(Doyun)가, tell에서는 목적어(him = Doyun)가 행동합니다. 어머니는 어느 쪽에서도 일찍 오는 사람이 아닙니다.', '(A)의 promise는 목적어가 아니라 주어가 행동합니다. 약속한 Doyun이 일찍 옵니다. (B)는 맞습니다.', '(B)에서 told의 목적어 him이 Doyun입니다. tell은 목적어가 행동합니다.'],
      explain: '(A) promise는 **주어**가 행동하므로 Doyun이 일찍 옵니다. (B) tell은 **목적어**가 행동하므로 him, 곧 Doyun이 일찍 옵니다. 두 문장 모두 일찍 오는 사람은 Doyun입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      hint: '두 동사 뒤의 형태가 "한 일"인지 "할 일"인지 나누어 보십시오.',
      q: '다음 문장의 내용과 일치하는 것은 무엇입니까?\n\nI remember locking the front door, but I forgot to turn off the gas.',
      choices: ['문은 잠갔고, 가스는 끄지 않았다.', '문은 잠그지 않았고, 가스는 껐다.', '문도 잠갔고, 가스도 껐다.', '문도 잠그지 않았고, 가스도 끄지 않았다.'],
      answer: 0,
      why: ['', 'remember locking은 "잠근 기억이 있다", 곧 문은 잠갔습니다.', 'forgot to turn off는 "끌 것을 잊었다", 곧 가스는 끄지 않았습니다.', 'remember + 동명사는 이미 한 일이므로 문은 잠갔습니다.'],
      explain: '**remember locking**(동명사)은 "잠근 것을 기억한다", 곧 이미 잠갔습니다. **forgot to turn off**(to부정사)는 "끌 것을 잊었다", 곧 끄지 않았습니다.',
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 1,
      hint: '"~인 것 같다"의 seems 뒤에 앞선 때 + 수동의 to부정사를 놓으십시오.',
      q: '"그 오래된 성은 약 500년 전에 지어진 것 같다."라는 뜻이 되도록 순서대로 놓으십시오.',
      choices: ['The old castle', 'seems', 'to have been built', 'about 500 years ago'],
      answer: [0, 1, 2, 3],
      explain: 'The old castle(주어) + seems(동사) + **to have been built**(앞선 때 + 수동의 to부정사) + about 500 years ago. 성이 지어진 것은 지금보다 앞선 때이고, 성은 지어"진" 것이므로 완료 수동형 to부정사를 씁니다.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'text', concept: 5,
      hint: '"말할 필요도 없이"라는 뜻의 동명사 관용 표현입니다.',
      q: '빈칸에 알맞은 낱말 하나를 쓰십시오.\n\nIt goes without [[blank]] that health is more important than money.\n(건강이 돈보다 중요하다는 것은 말할 필요도 없다.)',
      answer: ['saying'],
      wrong: [{ a: 'say', why: 'without은 전치사라서 뒤에 동사원형이 아니라 동명사가 옵니다.' }, { a: 'to say', why: 'without은 전치사라서 뒤에 to부정사가 아니라 동명사가 옵니다. needless to say와 섞지 않도록 주의하십시오.' }],
      explain: '**It goes without saying that ~**은 "~은 말할 필요도 없다"라는 관용 표현입니다. 전치사 without 뒤이므로 동명사 saying을 씁니다. 같은 뜻을 독립부정사로 쓰면 Needless to say, health is more important than money.입니다.',
    },
  ],

  deeper: [
    {
      title: '왜 to부정사는 "앞으로", 동명사는 "이미"일까?',
      body: 'to부정사의 to는 원래 방향을 나타내는 전치사 to(~쪽으로)에서 왔다고 설명합니다. 그래서 want to, plan to, decide to, promise to처럼 **아직 일어나지 않은 일**을 향하는 동사와 잘 어울립니다.\n\n반면 동명사는 동작을 "하나의 일"로 묶어 명사처럼 다루기 때문에 enjoy, finish, avoid, admit처럼 **이미 하고 있거나 한 일**을 다루는 동사와 잘 어울립니다.\n\nremember·forget·regret의 뜻 차이도 이 경향으로 설명됩니다. 다만 이것은 이해를 돕는 경향일 뿐, 모든 동사에 들어맞는 규칙은 아닙니다(예: like는 둘 다 비슷한 뜻으로 씁니다). 동사마다 뒤에 오는 형태는 예문과 함께 익혀 두는 것이 가장 확실합니다.',
    },
    {
      title: '완료형 준동사와 앞으로 배울 완료 시제',
      body: 'to have p.p.와 having p.p.는 "본동사보다 한 칸 앞선 때"를 나타낸다는 점에서 완료 시제와 생각이 같습니다. 중학교에서 배운 현재완료(have p.p.)가 "과거의 일이 지금과 이어져 있음"을 나타냈다면, 완료형 준동사는 "본동사의 때보다 먼저 일어났음"을 나타냅니다.\n\n공통영어2에서는 완료 시제와 조동사를 더 깊이 배우며, must have p.p.(~했음이 틀림없다), should have p.p.(~했어야 했다)처럼 조동사 뒤의 have p.p.도 같은 "한 칸 앞선 때"의 원리로 이해하게 됩니다.',
    },
  ],

  faq: [
    {
      q: 'It is kind of you랑 It is important for you는 어떻게 구별해요?',
      a: '형용사가 사람의 성격·태도를 평가하는지 보십시오. "You are kind."(너는 친절하다)는 자연스럽지만 "You are important to study."는 어색합니다. kind, nice, careless, wise, polite, rude, foolish처럼 사람을 평가하는 말이면 of, important, easy, difficult, necessary처럼 그 일이 어떤지를 말하면 for입니다.',
    },
    {
      q: 'remember 뒤에 to랑 ing는 어떻게 기억해요?',
      a: 'to는 "앞으로 할 일", -ing는 "이미 한 일"이라고 기억하십시오. Remember to call me.(전화할 것을 기억해)는 앞으로의 일이고, I remember calling you.(너에게 전화한 기억이 나)는 이미 한 일입니다. forget, regret도 같은 방향으로 이해하면 됩니다.',
    },
    {
      q: '동명사의 의미상 주어는 my랑 me 중에 뭘 써야 해요?',
      a: '둘 다 씁니다. 격식을 갖춘 글에서는 소유격(my), 일상 대화에서는 목적격(me)을 많이 씁니다. Do you mind my(me) sitting here? 둘 다 맞습니다. 다만 문장 맨 앞 주어 자리의 동명사에서는 소유격을 씁니다: His coming late made the teacher angry.',
    },
    {
      q: 'look forward to 뒤에는 왜 동사원형이 안 와요?',
      a: '여기서 to는 to부정사의 to가 아니라 전치사(~을 향해)입니다. 전치사 뒤에는 명사나 동명사가 오므로 I look forward to seeing you.라고 씁니다. be used to -ing(~에 익숙하다), when it comes to -ing(~에 관해서라면)도 같은 경우입니다.',
    },
  ],

  mistakes: [
    '성격 형용사 뒤에 for를 쓰는 실수 — It was kind **of** you to help me. 사람을 평가하는 형용사는 of입니다.',
    '앞선 때를 나타내야 하는데 단순형을 쓰는 실수 — It seems that he was sick. = He seems **to have been** sick.',
    'promise 문장에서 목적어를 행위자로 보는 실수 — I promised her to come early. 일찍 오는 사람은 I(주어)입니다.',
  ],

  gens: [
    {
      id: 'for-or-of',
      level: 1,
      title: '의미상 주어 for와 of 고르기',
      make: function (R) {
        var ofList = [
          ['kind', 'to carry my heavy bags'], ['careless', 'to leave the phone on the bus'], ['wise', 'to save money for the trip'],
          ['polite', 'to thank the bus driver'], ['rude', 'to interrupt the speaker'], ['brave', 'to speak up for the new student'],
          ['generous', 'to share the snacks with everyone'], ['clever', 'to solve the puzzle so quickly'], ['thoughtful', 'to send a card to the sick classmate'],
        ];
        var forList = [
          ['important', 'to drink enough water'], ['difficult', 'to wake up early on weekends'], ['necessary', 'to wear a helmet on a bike'],
          ['easy', 'to learn this song'], ['impossible', 'to finish the report in an hour'], ['hard', 'to read the small letters'],
          ['dangerous', 'to cross the road here'],
        ];
        var useOf = R.bool();
        var item = useOf ? R.pick(ofList) : R.pick(forList);
        var pr = R.pick(['you', 'him', 'her', 'them']);
        var be = R.pick(['is', 'was']);
        var ans = useOf ? 'of' : 'for';
        var other = useOf ? 'for' : 'of';
        return {
          type: 'short', check: 'text', concept: 0,
          q: '빈칸에 알맞은 낱말(for 또는 of)을 쓰십시오.\n\nIt ' + be + ' ' + item[0] + ' [[blank]] ' + pr + ' ' + item[1] + '.',
          answer: [ans],
          wrong: [{
            a: other,
            why: useOf
              ? '형용사(' + item[0] + ')는 사람의 성격·태도를 평가하는 형용사입니다. 이런 형용사 뒤에서는 의미상 주어를 of로 나타냅니다.'
              : '형용사(' + item[0] + ')는 사람이 아니라 그 일이 어떤지를 말하는 형용사입니다. 이때 의미상 주어는 for로 나타냅니다.',
          }],
          explain: useOf
            ? '형용사(**' + item[0] + '**)는 "그 사람이 어떤 사람인가"를 평가합니다. 그래서 의미상 주어는 **of ' + pr + '**입니다.'
            : '형용사(**' + item[0] + '**)는 "그 일이 어떤가"를 말합니다. 그래서 의미상 주어는 **for ' + pr + '**입니다.',
        };
      },
    },
    {
      id: 'to-or-ing',
      level: 2,
      title: 'remember·forget·regret·try 뒤의 to부정사와 동명사',
      make: function (R) {
        var name = R.pick(['Minsu', 'Jia', 'Seojun', 'Hayun', 'Doyun', 'Sua', 'Jiho', 'Yuna']);
        var bank = [
          { s: name + ' forgot [[blank]] (feed) the cat this morning, so the cat was hungry all day.', a: 'to feed', w: 'feeding', ko: '먹이를 줄 것을 잊어서 주지 않았다', t: 1 },
          { s: name + ' still remembers [[blank]] (visit) this museum as a small child.', a: 'visiting', w: 'to visit', ko: '어릴 때 방문한 것을 기억한다', t: 0 },
          { s: name + ' tried [[blank]] (lift) the box, but it was too heavy.', a: 'to lift', w: 'lifting', ko: '들려고 애썼지만 무거워서 못 들었다', t: 1 },
          { s: 'Unable to sleep, ' + name + ' tried [[blank]] (drink) a glass of warm milk, and it worked.', a: 'drinking', w: 'to drink', ko: '시험 삼아 마셔 보았더니 효과가 있었다', t: 0 },
          { s: name + ' regrets [[blank]] (eat) so much pizza last night.', a: 'eating', w: 'to eat', ko: '어젯밤 많이 먹은 것을 후회한다', t: 0 },
          { s: 'We regret [[blank]] (tell) you that the concert has been canceled.', a: 'to tell', w: 'telling', ko: '(지금) 알려 드리게 되어 유감이라고 전한다', t: 1 },
          { s: 'Remember [[blank]] (bring) your swimsuit to the camp tomorrow, ' + name + '.', a: 'to bring', w: 'bringing', ko: '내일 가져올 것을 기억하라', t: 1 },
          { s: name + ' will never forget [[blank]] (see) the sunrise from the mountaintop last summer.', a: 'seeing', w: 'to see', ko: '지난여름 해돋이를 본 것을 잊지 못할 것이다', t: 0 },
          { s: 'Did ' + name + ' remember [[blank]] (send) the photos to everyone last night?', a: 'to send', w: 'sending', ko: '보내야 할 일을 잊지 않고 했는지 묻는다', t: 1 },
          { s: name + ' tried [[blank]] (stay) awake, but fell asleep during the movie.', a: 'to stay', w: 'staying', ko: '깨어 있으려고 애썼지만 잠들었다', t: 1 },
        ];
        var it = R.pick(bank);
        var why = it.t === 1
          ? '동명사는 "이미 한 일"이나 "시험 삼아 해 본 일"을 나타냅니다. 이 문장은 ' + it.ko + '는 뜻이라서 to부정사를 씁니다.'
          : 'to부정사는 "앞으로 할 일"이나 "애써 하려는 일"을 나타냅니다. 이 문장은 ' + it.ko + '는 뜻이라서 동명사를 씁니다.';
        return {
          type: 'short', check: 'text', concept: 4,
          q: '괄호 안의 동사를 알맞은 형태로 바꿔 빈칸에 쓰십시오.\n\n' + it.s,
          answer: [it.a],
          wrong: [{ a: it.w, why: why }],
          explain: '이 문장은 ' + it.ko + '는 뜻입니다. 그래서 **' + it.a + '**' + (it.t === 1 ? '(to부정사)' : '(동명사)') + '를 씁니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'persuade', m: '설득하다', ex: 'She persuaded her parents to let her join the trip.', exm: '그녀는 부모님을 설득해서 여행에 함께 가도록 허락받았다.' },
    { w: 'promise', m: '약속하다; 약속', ex: 'He promised to call me after school.', exm: '그는 방과 후에 나에게 전화하겠다고 약속했다.' },
    { w: 'regret', m: '후회하다; 유감으로 생각하다', ex: 'I regret saying such unkind words to my friend.', exm: '나는 친구에게 그런 불친절한 말을 한 것을 후회한다.' },
    { w: 'mind', m: '꺼리다, 신경 쓰다', ex: 'Would you mind waiting a few minutes?', exm: '몇 분만 기다려 주시겠어요?' },
    { w: 'insist', m: '고집하다, 주장하다', ex: 'My grandmother insisted on paying for lunch.', exm: '할머니께서 점심값을 내시겠다고 고집하셨다.' },
    { w: 'expect', m: '예상하다, 기대하다', ex: 'The new bridge is expected to be finished next year.', exm: '새 다리는 내년에 완공될 것으로 예상된다.' },
    { w: 'careless', m: '부주의한', ex: 'It was careless of me to forget my keys.', exm: '열쇠를 잊어버리다니 내가 부주의했다.' },
    { w: 'polite', m: '예의 바른', ex: 'It is polite to say thank you when someone helps you.', exm: '누군가 도와주면 고맙다고 말하는 것이 예의 바르다.' },
    { w: 'announce', m: '발표하다, 알리다', ex: 'The winners will be announced on Friday.', exm: '수상자는 금요일에 발표될 것이다.' },
    { w: 'inform', m: '알리다, 통지하다', ex: 'Please inform us if you change your address.', exm: '주소가 바뀌면 저희에게 알려 주십시오.' },
    { w: 'complain', m: '불평하다', ex: 'He always complains about the weather.', exm: '그는 늘 날씨에 대해 불평한다.' },
    { w: 'matter', m: '문제, 일; 중요하다', ex: 'To make matters worse, the bus was late.', exm: '설상가상으로 버스까지 늦었다.' },
  ],
});
