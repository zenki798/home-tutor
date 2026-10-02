/* 중3 영어 · 남의 말 전하기 (간접화법) */
Tutor.registerUnit({
  id: 'eng-m3-06',
  course: 'eng-m3',
  title: '남의 말 전하기 (간접화법)',
  summary: '다른 사람의 말을 전하는 간접화법과 if·whether 명사절을 익혀 들은 내용을 정확히 전하고 요약해요.',
  goals: [
    '직접화법을 간접화법으로 바꾸며 인칭과 시제를 알맞게 바꿀 수 있어요.',
    '의문사가 있는 질문과 없는 질문을 asked로 전할 수 있어요.',
    'if·whether가 이끄는 명사절("~인지 아닌지")을 쓰고 해석할 수 있어요.',
    '인터뷰 내용을 요약하며 누가 한 말인지 출처를 밝힐 수 있어요.',
  ],
  standards: ['[9영02-07]', '[9영02-09]', '[9영01-02]'],

  concepts: [
    {
      title: '직접화법과 간접화법',
      body: '남의 말을 전하는 방법은 두 가지예요.\n\n- **직접화법**: 그 사람이 한 말을 따옴표(“ ”) 안에 **그대로** 옮겨요.\n- **간접화법**: 따옴표 없이, 전하는 사람의 입장에서 **내 말로 바꾸어** 전해요.\n\n| 직접화법 | 간접화법 |\n|---|---|\n| He said, “I\'m tired.” | He said **(that) he was** tired. |\n| Jia said to me, “I like your hat.” | Jia **told me (that) she liked my** hat. |\n\n바꾸는 순서는 이래요.\n\n1. 쉼표와 따옴표를 없애고 **that**으로 이어요(that은 생략할 수 있어요).\n2. **said to + 듣는 사람**은 **told + 듣는 사람**으로 바꿔요.\n3. 따옴표 안의 인칭과 시제를 전하는 사람 입장에 맞게 바꿔요(다음 카드).\n\n> ⚠️ say 바로 뒤에는 듣는 사람을 쓰지 않아요. He said me that …(✗) → He **told me** that … (○)',
      easy: '직접화법은 **녹음기**, 간접화법은 **전달자**라고 생각해 보세요.\n\n- 녹음기는 들은 말을 그대로 틀어 줘요: He said, “I\'m tired.”\n- 전달자는 친구에게 자기 말로 다시 알려 줘요: "걔가 피곤하다고 했어." → He said that he was tired.\n\n전달자는 "나(I)"를 "그(he)"로, "피곤하다(am)"를 "피곤했다(was)"로 바꿔서 말해요. 지금 말하는 사람의 입장으로 옮기는 거예요.',
      check: {
        type: 'choice',
        q: '직접화법을 간접화법으로 바르게 바꾼 것을 고르세요.\n\nMinsu said, “I\'m hungry.”',
        choices: ['Minsu said that he was hungry.', 'Minsu said that I was hungry.', 'Minsu said me that he was hungry.'],
        answer: 0,
        why: [
          '',
          '따옴표 안의 I는 말한 민수 자신이에요. 전할 때는 he로 바꿔요.',
          'say 바로 뒤에는 듣는 사람(me)을 쓰지 않아요. 듣는 사람을 쓰려면 told me를 써요.',
        ],
        explain: '따옴표를 없애고 that으로 이은 뒤, I는 민수를 가리키니 **he**로, 현재 am은 said에 맞춰 **was**로 바꿔요. → Minsu said that he was hungry.',
      },
    },
    {
      title: '인칭과 시제 바꾸기 (시제 일치)',
      body: '간접화법에서는 **전하는 사람의 입장**에서 말을 다시 맞춰요.\n\n**① 인칭**: 따옴표 안의 I, you, my가 누구를 가리키는지 따져서 바꿔요.\n\n- Sua said to me, “**You** are kind.” → Sua told me that **I** was kind.\n\n**② 시제(시제 일치)**: 전달 동사(said, told)가 과거이면 따옴표 안의 시제를 **한 단계 과거로** 옮겨요.\n\n| 따옴표 안 | 간접화법 |\n|---|---|\n| 현재 (am, is, like) | 과거 (was, liked) |\n| 과거 (lost, saw) | 과거완료 (had lost, had seen) |\n| will, can | would, could |\n\n- He said to me, “I **will** call you.” → He told me that he **would** call me.\n- She said, “I **lost** my key.” → She said that she **had lost** her key.\n\n**③ 때·곳을 나타내는 말**: now → then, today → that day, tomorrow → the next day, yesterday → the day before, here → there\n\n> 💡 전달 동사가 현재(says)이면 시제를 바꾸지 않아요. He says, “I\'m busy.” → He says that he is busy.',
      easy: '시간 여행처럼 생각해 보세요. 친구가 어제 "나 지금 배고파(I am hungry)."라고 했어요. 오늘 내가 그 말을 전할 때 배고팠던 것은 이미 지난 일이지요. 그래서 "걔가 배고팠대(he **was** hungry)."처럼 한 칸 과거로 옮겨요.\n\n이미 과거였던 일(lost)은 말한 때보다 더 앞의 일이 되니까 **had lost**로 한 칸 더 뒤로 가요. 3학년 1학기에 배운 과거완료가 여기서 쓰여요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nJia said, “I can swim.”\n→ Jia said that she [[빈칸]] swim.',
        choices: ['could', 'can', 'will'],
        answer: 0,
        why: [
          '',
          '전달 동사 said가 과거이므로 can도 과거형 could로 바꿔요.',
          'will은 "~할 것이다"라는 뜻이라 can("~할 수 있다")과 뜻이 달라요. can은 could로 바꿔요.',
        ],
        explain: 'said가 과거이므로 can은 한 단계 과거인 **could**로 바꿔요. → Jia said that she could swim.',
      },
    },
    {
      title: '의문사가 있는 질문 전하기',
      body: '질문을 전할 때는 전달 동사로 **asked**를 쓰고, 의문사가 있는 질문은 **의문사 + 주어 + 동사** 순서로 바꿔요. 중2에서 배운 간접의문문과 같은 순서예요.\n\n| 직접화법 | 간접화법 |\n|---|---|\n| She said to me, “Where **do you live**?” | She asked me where **I lived**. |\n| He said to me, “What **are you** doing?” | He asked me what **I was** doing. |\n| Mom said to me, “When **will you** come home?” | Mom asked me when **I would** come home. |\n\n바꾸는 방법\n\n1. said (to) → **asked**\n2. 의문사 뒤를 **주어 + 동사** 순서로 바꿔요. do, does, did는 빼고 그 시제를 동사에 담아요(do you live → I lived).\n3. 인칭과 시제는 진술문과 똑같이 바꾸고, 물음표 대신 마침표를 찍어요.\n\n> ⚠️ She asked me where **did I live**.(✗) — 간접화법 안에서는 질문할 때의 순서를 쓰지 않아요.',
      easy: '질문을 전하면 그 문장은 더 이상 "질문"이 아니라 "질문이 있었다는 **소식**"이 돼요. 그래서 물음표도, 질문 순서도 사라져요.\n\n- “Where do you live?” (질문)\n- → 걔가 나한테 어디 사는지 물었어. (소식)\n- → She asked me **where I lived**.\n\n의문사(where)는 맨 앞에 그대로 두고, 그 뒤는 보통 문장처럼 "누가 + 어쩐다"로 써요.',
      check: {
        type: 'ox',
        q: 'He said to me, “What did you eat?”를 간접화법으로 바꾸면 He asked me what did I eat.이에요.',
        answer: false,
        explain: '간접화법 안에서는 의문사 뒤를 **주어 + 동사** 순서로 쓰고 did를 빼요. 먹은 일은 말한 때보다 앞의 일이므로 He asked me what **I had eaten**.이 바른 문장이에요.',
      },
    },
    {
      title: 'if·whether가 이끄는 명사절',
      body: '의문사가 **없는** 질문(Yes나 No로 답하는 질문)을 전할 때는 **if**나 **whether**("~인지 아닌지")로 이어요.\n\n- He said to me, “**Are you** hungry?” → He asked me **if(whether) I was** hungry.\n- She said to me, “**Do you** have a pen?” → She asked me **if(whether) I had** a pen.\n\nif·whether가 이끄는 절은 문장 안에서 **명사** 역할을 해요. 그래서 wonder, know, ask, be sure 같은 말 뒤에 목적어처럼 써요.\n\n- I wonder **if** it will snow tomorrow. (내일 눈이 올지 궁금해요.)\n- I don\'t know **whether** he likes cats **or not**. (그가 고양이를 좋아하는지 아닌지 몰라요.)\n\n| | 명사절의 if (~인지) | 조건의 if (만약 ~라면) |\n|---|---|---|\n| 예 | I wonder **if** it **will** rain. | **If** it **rains**, I\'ll stay home. |\n| 미래의 일 | will을 그대로 써요 | 현재형으로 써요 |\n\n> 💡 문장 맨 앞에서 주어로 쓸 때, 그리고 바로 뒤에 or not을 붙일 때는 **whether**만 써요. **Whether** he will come is not clear.',
      easy: 'if·whether 절은 **"궁금한 것을 담는 상자"**예요.\n\nI wonder [ **if** it will snow ].\n나는 궁금해요 [ 눈이 올**지** ].\n\n상자 안의 내용은 맞는지 아닌지 아직 모르는 일이에요. 그래서 우리말 "~인지 (아닌지)"로 옮기면 돼요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI don\'t know [[빈칸]] Minsu will come to the party.',
        choices: ['whether', 'what', 'who'],
        answer: 0,
        why: [
          '',
          'what 뒤에는 무엇이 빠진 문장이 와요. Minsu will come to the party는 빠진 것이 없는 문장이에요.',
          'who는 "누가, 누구"를 묻는 말이에요. 뒤 문장에 사람이 빠진 자리가 없어요.',
        ],
        explain: '민수가 파티에 올지 **안 올지** 모른다는 뜻이므로 "~인지 아닌지"의 **whether**(또는 if)를 써요.',
      },
    },
    {
      title: '인터뷰 요약하고 출처 밝히기',
      body: '인터뷰나 다른 사람의 말을 글에 옮길 때는 **누가 한 말인지(출처)**를 꼭 밝혀요. 남의 말을 출처 없이 쓰면 읽는 사람이 내 생각으로 오해하니까요.\n\n- **그대로 옮길 때(인용)**: 따옴표 + 말한 사람\n  “Reading every day changed my life,” **said** Ms. Han.\n- **요약해서 옮길 때**: 간접화법 + 말한 사람\n  Ms. Han **said that** reading every day **had changed** her life.\n- **출처를 앞에 밝힐 때**: **According to** Ms. Han, … (한 선생님에 따르면, …)\n\n| 전달 동사 | 뜻 |\n|---|---|\n| said, told | 말했다 |\n| asked | 물었다 |\n| explained | 설명했다 |\n| added | 덧붙였다 |\n| answered, replied | 대답했다 |\n\n> 💡 요약할 때는 인터뷰의 말을 모두 옮기지 않아요. 핵심 내용만 골라 간접화법으로 짧게 써요.',
      easy: '친구에게 "선생님이 내일 시험 없대."라고 전할 때 "선생님이"를 빼면 친구는 "누가 그래?"라고 묻겠지요.\n\n영어 글도 같아요. 들은 말을 옮길 때는 **누가**(Ms. Han) 말했는지 꼭 붙여요. 그대로 옮기면 따옴표, 내 말로 줄이면 said that을 써요.',
      check: {
        type: 'ox',
        q: 'According to Doyun, the library opens at nine.은 "도윤이에 따르면 도서관은 9시에 문을 열어요."라는 뜻으로, 이 정보의 출처는 도윤이에요.',
        answer: true,
        explain: '**According to** + 사람은 "~에 따르면"이라는 뜻으로 정보의 출처를 밝혀요. 이 정보는 도윤이에게서 나온 것이에요.',
      },
    },
  ],

  examples: [
    {
      q: '간접화법으로 바꿔 보세요.\n\nSeojun said to me, “I will help you tomorrow.”',
      steps: [
        '듣는 사람(me)이 있으니 said to me를 **told me**로 바꾸고, 따옴표 대신 that으로 이어요.',
        '인칭: 말한 사람 I는 서준이이니 **he**, 들은 사람 you는 나이니 **me**로 바꿔요.',
        '시제: told가 과거이므로 will을 **would**로 바꿔요.',
        '때: 말을 들은 다음 날 이후에 전한다면 tomorrow는 **the next day**로 바꿔요.',
      ],
      answer: 'Seojun told me (that) he would help me the next day.',
    },
    {
      q: '간접화법으로 바꿔 보세요.\n\nThe teacher said to us, “Did you finish the project?”',
      steps: [
        '질문이므로 said to us를 **asked us**로 바꿔요.',
        '의문사가 없는 Yes/No 질문이므로 **if** 또는 **whether**로 이어요.',
        '인칭: you(우리)를 **we**로 바꿔요.',
        '시제: did finish는 과거이므로 한 칸 더 앞의 **had finished**로 바꾸고, 주어 + 동사 순서로 써요.',
      ],
      answer: 'The teacher asked us if(whether) we had finished the project.',
    },
  ],

  terms: [
    { term: '직접화법', def: '남이 한 말을 따옴표 안에 그대로 옮겨 전하는 방법이에요. 예: He said, “I\'m tired.”' },
    { term: '간접화법', def: '남이 한 말을 따옴표 없이, 전하는 사람의 입장에 맞게 인칭과 시제를 바꾸어 전하는 방법이에요. 예: He said that he was tired.' },
    { term: '전달 동사', def: '말을 전할 때 쓰는 동사예요. said, told, asked, explained 같은 것이 있어요.' },
    { term: '시제 일치', def: '전달 동사가 과거일 때 전하는 말의 시제도 한 단계 과거로 맞추는 것이에요. 예: am → was, will → would, lost → had lost' },
    { term: '명사절', def: '문장 안에서 명사처럼 주어·목적어 역할을 하는 절이에요. 예: I wonder **if it will snow**.에서 if 이하가 wonder의 목적어예요.' },
    { term: '인용', def: '남의 말이나 글을 그대로 따와서 쓰는 것이에요. 따옴표로 묶고 누가 한 말인지 밝혀요.' },
    { term: '출처', def: '말이나 정보가 나온 곳이에요. According to ~(~에 따르면)로 밝힐 수 있어요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nHayun [[빈칸]] me that she was ready.',
      choices: ['told', 'said', 'asked', 'spoke'],
      answer: 0,
      why: [
        '',
        'said 바로 뒤에는 듣는 사람(me)을 쓰지 않아요. said to me 또는 told me로 써요.',
        'asked는 질문을 전할 때 써요. that she was ready는 질문이 아니라 전하는 말이에요.',
        'speak는 that절을 바로 이어서 "~라고 말하다"로 쓰지 않아요.',
      ],
      explain: '듣는 사람(me)을 바로 뒤에 쓰고 that절로 말을 전할 때는 **told**를 써요. "하윤이는 준비가 됐다고 나에게 말했어요."',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 1,
      q: '빈칸에 알맞은 한 낱말을 쓰세요.\n\nDoyun said, “I am busy.”\n→ Doyun said that he [[빈칸]] busy.',
      answer: ['was'],
      wrong: [
        { a: 'is', why: '시제를 바꾸지 않았어요. said가 과거이므로 am은 was로 바꿔요.' },
        { a: 'am', why: '인칭과 시제를 그대로 두었어요. 주어가 he이고 said가 과거이므로 was를 써요.' },
      ],
      explain: '주어 I는 he로, 현재 am은 said에 맞춰 한 단계 과거인 **was**로 바꿔요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: 'She said to me, “Where do you live?”를 간접화법으로 바르게 바꾼 것을 고르세요.',
      choices: [
        'She asked me where I lived.',
        'She asked me where did I live.',
        'She asked me where do I live.',
        'She told me where I lived?',
      ],
      answer: 0,
      why: [
        '',
        '질문할 때의 순서(did I live)를 그대로 썼어요. 의문사 뒤는 주어 + 동사(I lived)로 써요.',
        '질문 순서와 현재 시제를 그대로 썼어요. do를 빼고 I lived로 바꿔요.',
        '질문을 전할 때는 asked를 쓰고, 물음표 대신 마침표를 찍어요.',
      ],
      explain: '질문이므로 **asked**, 의문사 where 뒤는 **주어 + 동사**, 시제는 한 단계 과거로 바꿔요. → She asked me where I lived.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: 'I wonder if it will rain tomorrow.에서 if는 "만약 ~라면"이라는 뜻이에요.',
      answer: false,
      explain: 'wonder의 목적어로 쓰인 if절은 "~인지 (아닌지)"라는 뜻의 **명사절**이에요. "내일 비가 올지 궁금해요." 그래서 미래의 일인데도 will을 그대로 써요.',
    },
    {
      id: 'p5', level: 1, type: 'short', concept: 3,
      q: '빈칸에 알맞은 한 낱말을 쓰세요.\n\nHe said to me, “Are you ready?”\n→ He asked me [[빈칸]] I was ready.',
      answer: ['if', 'whether'],
      wrong: [
        { a: 'that', why: 'that은 확실한 내용을 전할 때 써요. Yes/No 질문을 전할 때는 "~인지"의 if나 whether를 써요.' },
        { a: 'what', why: 'what은 의문사예요. Are you ready?에는 의문사가 없으니 if나 whether로 이어요.' },
      ],
      explain: '의문사가 없는 Yes/No 질문을 전할 때는 **if** 또는 **whether**("~인지 아닌지")로 이어요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 1,
      q: '일주일 뒤에 이 말을 전한다고 할 때, 빈칸에 알맞은 말을 고르세요.\n\nJia said, “I\'m going to visit my aunt tomorrow.”\n→ Jia said that she was going to visit her aunt [[빈칸]].',
      choices: ['the next day', 'tomorrow', 'yesterday', 'the day before'],
      answer: 0,
      why: [
        '',
        '일주일 뒤에 전하면 지아가 말한 "내일"은 이미 지난날이에요. tomorrow는 the next day로 바꿔요.',
        '지아가 말한 날의 "내일"이니 앞날이 아니라 그다음 날이에요.',
        'the day before는 yesterday를 바꿀 때 써요. tomorrow는 the next day로 바꿔요.',
      ],
      explain: '말한 날을 기준으로 한 "내일"은 전할 때 **the next day**(그다음 날)로 바꿔요.',
    },
    {
      id: 'p7', level: 2, type: 'order', concept: 2,
      q: '우리말에 맞게 배열하세요.\n\n그는 나에게 저녁으로 무엇을 원하는지 물었어요.',
      choices: ['He asked me', 'what', 'I wanted', 'for dinner'],
      answer: [0, 1, 2, 3],
      hint: '의문사 뒤에는 주어 + 동사가 와요.',
      explain: '전달 동사(He asked me) → 의문사(what) → 주어 + 동사(I wanted) → 나머지(for dinner). → He asked me what I wanted for dinner.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 1,
      q: 'Sua said to me, “I like your drawing.”를 간접화법으로 바르게 바꾼 것을 고르세요.',
      choices: [
        'Sua told me that she liked my drawing.',
        'Sua told me that I liked her drawing.',
        'Sua told me that she likes your drawing.',
        'Sua said me that she liked my drawing.',
      ],
      answer: 0,
      why: [
        '',
        '인칭을 거꾸로 바꿨어요. 좋아한 사람은 수아(she)이고, 그림은 내 것(my)이에요.',
        '시제와 인칭을 바꾸지 않았어요. likes → liked, your → my로 바꿔요.',
        'said 바로 뒤에는 듣는 사람을 쓰지 않아요. told me로 써요.',
      ],
      hint: '말한 사람(I)과 들은 사람(your)이 각각 누구인지 먼저 따져 보세요.',
      explain: 'said to me → **told me**, I(수아) → **she**, your(나의) → **my**, like → **liked**. → Sua told me that she liked my drawing.',
    },
    {
      id: 'p9', level: 2, type: 'short', concept: 1,
      q: '빈칸에 알맞은 말을 쓰세요. (두 낱말)\n\nMinsu said, “I lost my umbrella.”\n→ Minsu said that he [[빈칸]] his umbrella.',
      answer: ['had lost'],
      wrong: [
        { a: 'has lost', why: 'said가 과거이므로 현재완료(has lost)가 아니라 과거완료(had lost)를 써요.' },
        { a: 'lost', why: '말할 때는 lost로 두기도 하지만, 시제 일치의 원칙으로는 말한 때보다 앞의 일이라 한 칸 더 앞의 had lost로 써요(문제도 두 낱말).' },
      ],
      hint: '우산을 잃어버린 일은 민수가 말한 때보다 먼저 일어났어요.',
      explain: '따옴표 안의 과거(lost)는 말한 때보다 더 앞의 일이므로 과거완료 **had lost**로 바꿔요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '인터뷰를 읽고, 내용을 바르게 요약한 문장을 고르세요.\n\nReporter: Why did you start the school garden?\nMs. Han: I wanted students to learn where food comes from.\nReporter: What is the hardest part?\nMs. Han: Watering the plants during summer vacation is hard.',
      choices: [
        'Ms. Han said that watering the plants during summer vacation was hard.',
        'Ms. Han said that she wanted to close the school garden.',
        'The reporter said that students learned where food came from.',
        'Ms. Han asked the reporter why he had started the garden.',
      ],
      answer: 0,
      why: [
        '',
        '인터뷰에 정원을 닫고 싶다는 말은 없어요. 요약은 실제로 한 말만 옮겨요.',
        '음식이 어디서 오는지 이야기한 사람은 기자가 아니라 한 선생님이에요. 출처를 확인하세요.',
        '질문한 사람은 기자이고, 한 선생님은 대답했어요. 묻고 답한 사람을 바꿨어요.',
      ],
      hint: '누가 어떤 말을 했는지 하나씩 짝지어 보세요.',
      explain: '한 선생님은 "여름 방학 동안 식물에 물을 주는 것이 어렵다"고 했어요. 간접화법으로 is → **was**로 바꾸어 전한 첫 번째 문장이 맞아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '다음 간접화법 문장의 원래 직접화법으로 알맞은 것을 고르세요.\n\nShe asked me when I would leave.',
      choices: [
        'She said to me, “When will you leave?”',
        'She said to me, “When would I leave?”',
        'She said to me, “When will I leave?”',
        'She said to me, “Will you leave?”',
      ],
      answer: 0,
      why: [
        '',
        '인칭과 시제를 되돌리지 않았어요. 들은 사람 I는 따옴표 안에서 you, would는 will이에요.',
        '인칭을 되돌리지 않았어요. 질문을 받은 사람은 나이니 따옴표 안에서는 you예요.',
        '의문사 when이 빠졌어요. 의문사가 없는 질문이었다면 if나 whether로 전했을 거예요.',
      ],
      hint: '간접화법으로 바꿀 때 한 일(인칭·시제·순서)을 거꾸로 되돌려 보세요.',
      explain: '거꾸로 되돌리면: 나(I) → 들은 사람 **you**, would → **will**, 주어 + 동사 순서 → 질문 순서(**will you leave**), 마침표 → 물음표. → She said to me, “When will you leave?”',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '지아가 월요일에 나에게 한 말을 그다음 주에 전하려고 해요. 바르게 전한 문장을 고르세요.\n\nJia said to me, “I can lend you my bike today.”',
      choices: [
        'Jia told me that she could lend me her bike that day.',
        'Jia told me that she can lend you her bike that day.',
        'Jia told me that I could lend her my bike that day.',
        'Jia told me that she could lend me her bike today.',
      ],
      answer: 0,
      why: [
        '',
        '시제와 인칭을 바꾸지 않았어요. can → could, you(나) → me로 바꿔요.',
        '빌려주는 사람과 빌리는 사람을 거꾸로 바꿨어요. 자전거를 빌려주는 사람은 지아(she)예요.',
        '그다음 주에 전하므로 지아가 말한 "오늘"은 이미 지난날이에요. today는 that day로 바꿔요.',
      ],
      hint: '인칭, 시제, 때를 나타내는 말 세 가지를 차례로 확인하세요.',
      explain: '인칭: I → **she**, you → **me**, my → **her** / 시제: can → **could** / 때: today → **that day**. → Jia told me that she could lend me her bike that day.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '빈칸에 if는 쓸 수 **없고** whether만 쓸 수 있는 문장을 고르세요.',
      choices: [
        '[[빈칸]] he will join us is still a secret.',
        'I wonder [[빈칸]] she remembers me.',
        'Ask him [[빈칸]] he needs any help.',
        'I\'m not sure [[빈칸]] the store is open.',
      ],
      answer: 0,
      why: [
        '',
        'wonder의 목적어 자리라서 if와 whether 둘 다 쓸 수 있어요.',
        'ask의 목적어 자리라서 if와 whether 둘 다 쓸 수 있어요.',
        'be sure 뒤에서 "~인지"를 나타낼 때 if와 whether 둘 다 쓸 수 있어요.',
      ],
      hint: '명사절이 문장의 어느 자리(주어/목적어)에 있는지 보세요.',
      explain: '첫 번째 문장에서 명사절은 동사 is의 **주어**예요. 문장 맨 앞의 주어 자리에는 whether만 써요. → Whether he will join us is still a secret. (그가 우리와 함께할지는 아직 비밀이에요.)',
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 3,
      q: '다음 말을 간접화법으로 전한 문장이 되도록 배열하세요.\n\nSeojun said to me, “Do you know where the station is?”',
      choices: ['Seojun asked me', 'if', 'I knew', 'where', 'the station was'],
      answer: [0, 1, 2, 3, 4],
      hint: '바깥 질문(Do you know …?)은 if로, 안쪽의 where 절은 원래대로 주어 + 동사로 두고 시제만 바꿔요.',
      explain: 'Do you know …?는 Yes/No 질문이므로 **asked me if**로 이어요. you know → **I knew**, 안쪽 간접의문문 where the station is → **where the station was**. → Seojun asked me if I knew where the station was.',
    },
  ],

  deeper: [
    {
      title: '시제를 바꾸지 않아도 되는 경우',
      body: '시제 일치는 "말한 때"와 "전하는 때"가 다르기 때문에 생겨요. 그래서 전하는 지금도 여전히 사실인 내용은 시제를 바꾸지 않기도 해요.\n\n- 변하지 않는 사실·과학 원리: The teacher said that water **boils** at 100°C.\n- 지금도 그대로인 사실: Minsu said that he **lives** in Busan. (지금도 부산에 산다면)\n\n문제를 풀거나 글을 쓸 때는 먼저 **원칙(한 단계 과거로)**을 익히고, 위와 같은 경우는 "전하는 지금도 참인가?"를 따져서 써요.',
    },
    {
      title: '명령·부탁을 전할 때',
      body: '명령이나 부탁도 전할 수 있어요. 이때는 중2에서 배운 **tell/ask + 목적어 + to부정사**를 써요.\n\n- Mom said to me, “Clean your room.” → Mom **told me to clean** my room.\n- He said to me, “Please open the window.” → He **asked me to open** the window.\n- She said to me, “Don\'t be late.” → She told me **not to be** late.\n\n명령은 told, 부탁은 asked를 쓰고, 하지 말라는 말은 to 앞에 not을 붙여요.',
    },
  ],

  faq: [
    {
      q: 'said랑 told는 뭐가 달라요?',
      a: '둘 다 "말했다"지만 told는 바로 뒤에 **듣는 사람**을 써야 해요(told me, told us). said는 듣는 사람 없이 쓰거나, 쓰려면 said to me처럼 to를 붙여요. He said me that …은 틀린 문장이에요.',
    },
    {
      q: '간접화법에서 that은 꼭 써야 해요?',
      a: '진술문을 전할 때 that은 생략할 수 있어요. He said (that) he was tired. 둘 다 맞아요. 하지만 질문을 전할 때는 that을 쓰지 않고 의문사나 if·whether를 써요.',
    },
    {
      q: 'if랑 whether는 언제나 바꿔 써도 돼요?',
      a: '목적어 자리(I wonder if/whether …, He asked me if/whether …)에서는 바꿔 써도 돼요. 하지만 문장 맨 앞 주어 자리와 or not을 바로 붙일 때(whether or not)는 whether만 써요.',
    },
    {
      q: '시제를 왜 과거로 바꿔야 해요? 그냥 그대로 쓰면 안 돼요?',
      a: '전하는 지금은 그 말을 한 때보다 뒤라서, 말한 사람에게 "지금"이던 일이 전하는 사람에게는 "그때"의 일이 되기 때문이에요. 그래서 am → was, will → would처럼 한 단계 과거로 맞춰요. 지금도 변함없는 사실이면 그대로 두기도 해요(심화 학습 참고).',
    },
  ],

  mistakes: [
    '질문을 전하면서 질문 순서를 그대로 쓰는 실수 — She asked me where did I live.(✗) → She asked me where I lived.',
    'say 바로 뒤에 듣는 사람을 쓰는 실수 — He said me that …(✗) → He told me that … / He said to me that …',
    '인칭을 바꾸지 않는 실수 — Jia said, “I\'m tired.” → Jia said that I was tired.(✗) → Jia said that she was tired.',
  ],

  gens: [
    {
      id: 'backshift-verb',
      level: 1,
      title: '간접화법의 시제 일치',
      make: function (R) {
        // [직접화법, 간접화법(빈칸), 정답, [오답, 이유] × 3, 바꾸는 법]
        var items = [
          ['Minsu said, “I am hungry.”', 'Minsu said that he [[빈칸]] hungry.', 'was',
            [['is', '시제를 바꾸지 않았어요. said가 과거이므로 am은 was로 바꿔요.'], ['am', '인칭과 시제를 모두 그대로 두었어요. 주어가 he이고 시제는 과거라 was예요.'], ['will be', '시제 일치는 미래가 아니라 한 단계 과거로 옮기는 거예요.']],
            'am → was'],
          ['Jia said, “I can play the piano.”', 'Jia said that she [[빈칸]] play the piano.', 'could',
            [['can', 'said가 과거이므로 can도 과거형 could로 바꿔요.'], ['will', 'will은 "~할 것이다"라는 뜻이라 can과 뜻이 달라요.'], ['must', 'must는 "~해야 한다"라는 뜻이라 can과 뜻이 달라요.']],
            'can → could'],
          ['Seojun said, “I will clean my room.”', 'Seojun said that he [[빈칸]] clean his room.', 'would',
            [['will', 'said가 과거이므로 will도 과거형 would로 바꿔요.'], ['could', 'could는 can의 과거형이에요. will은 would로 바꿔요.'], ['should', 'should는 "~해야 한다"라는 뜻이라 will과 뜻이 달라요.']],
            'will → would'],
          ['Hayun said, “I like spicy food.”', 'Hayun said that she [[빈칸]] spicy food.', 'liked',
            [['likes', '시제를 바꾸지 않았어요. said가 과거이므로 like는 liked로 바꿔요.'], ['like', '인칭과 시제를 그대로 두었어요. 주어 she에 과거형 liked를 써요.'], ['had liked', '현재는 과거로 한 단계만 옮겨요. had liked는 원래 과거였던 말을 전할 때 써요.']],
            'like → liked'],
          ['Doyun said, “I lost my wallet.”', 'Doyun said that he [[빈칸]] his wallet.', 'had lost',
            [['has lost', 'said가 과거이므로 현재완료가 아니라 과거완료(had lost)를 써요.'], ['loses', '현재형으로 바꾸면 시제가 거꾸로 가요. 과거는 과거완료로 옮겨요.'], ['would lose', 'would는 will을 바꿀 때 써요. 과거(lost)는 과거완료(had lost)로 옮겨요.']],
            'lost → had lost'],
          ['Sua said, “I am reading a novel.”', 'Sua said that she [[빈칸]] reading a novel.', 'was',
            [['is', '시제를 바꾸지 않았어요. said가 과거이므로 am은 was로 바꿔요.'], ['am', '인칭과 시제를 그대로 두었어요. 주어가 she이고 시제는 과거라 was예요.'], ['has', 'reading 앞에는 be동사가 와야 진행형이 돼요. am → was예요.']],
            'am → was'],
          ['My brother said, “I have a cold.”', 'My brother said that he [[빈칸]] a cold.', 'had',
            [['has', '시제를 바꾸지 않았어요. said가 과거이므로 have는 had로 바꿔요.'], ['have', '인칭과 시제를 그대로 두었어요. 주어 he에 과거형 had를 써요.'], ['had had', '현재 have는 과거 had로 한 단계만 옮겨요.']],
            'have → had'],
          ['The students said, “We are ready.”', 'The students said that they [[빈칸]] ready.', 'were',
            [['are', '시제를 바꾸지 않았어요. said가 과거이므로 are는 were로 바꿔요.'], ['was', '주어 they는 복수라서 was가 아니라 were를 써요.'], ['had', 'ready 앞에는 be동사가 와요. are → were예요.']],
            'are → were'],
          ['Grandma said, “I will bake cookies.”', 'Grandma said that she [[빈칸]] bake cookies.', 'would',
            [['will', 'said가 과거이므로 will도 과거형 would로 바꿔요.'], ['could', 'could는 can의 과거형이에요. will은 would로 바꿔요.'], ['did', 'did를 쓰면 "구웠다"는 지난 일이 되어 앞으로 할 일이라는 뜻이 사라져요.']],
            'will → would'],
          ['Jiho said, “I saw a rainbow.”', 'Jiho said that he [[빈칸]] a rainbow.', 'had seen',
            [['has seen', 'said가 과거이므로 현재완료가 아니라 과거완료(had seen)를 써요.'], ['sees', '현재형으로 바꾸면 시제가 거꾸로 가요. 과거는 과거완료로 옮겨요.'], ['would see', 'would는 will을 바꿀 때 써요. 과거(saw)는 과거완료(had seen)로 옮겨요.']],
            'saw → had seen'],
          ['Yuna said, “I can\'t ride a bike.”', 'Yuna said that she [[빈칸]] ride a bike.', 'couldn\'t',
            [['can\'t', 'said가 과거이므로 can\'t도 과거형 couldn\'t로 바꿔요.'], ['won\'t', 'won\'t는 "~하지 않을 것이다"라는 뜻이라 can\'t와 뜻이 달라요.'], ['didn\'t', 'didn\'t는 "~하지 않았다"라는 뜻이에요. "~할 수 없었다"는 couldn\'t예요.']],
            'can\'t → couldn\'t'],
        ];
        var it = R.pick(items);
        var reason = {};
        it[3].forEach(function (w) { reason[w[0]] = w[1]; });
        var pick = R.choices(it[2], it[3].map(function (w) { return w[0]; }), 4);
        return {
          type: 'choice', concept: 1,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0] + '\n→ ' + it[1],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === it[2] ? '' : reason[c]; }),
          explain: '전달 동사 said가 과거이므로 따옴표 안의 시제를 한 단계 과거로 옮겨요(' + it[4] + '). → ' + it[1].replace('[[빈칸]]', '**' + it[2] + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'interview', m: '인터뷰, 면접; 인터뷰하다', ex: 'The reporter interviewed a young farmer.', exm: '기자는 젊은 농부를 인터뷰했어요.' },
    { w: 'reporter', m: '기자', ex: 'The reporter asked him why he had started the project.', exm: '기자는 그에게 왜 그 일을 시작했는지 물었어요.' },
    { w: 'wonder', m: '궁금하다', ex: 'I wonder if it will snow this weekend.', exm: '이번 주말에 눈이 올지 궁금해요.' },
    { w: 'whether', m: '~인지 (아닌지)', ex: 'I\'m not sure whether she is at home.', exm: '그녀가 집에 있는지 잘 모르겠어요.' },
    { w: 'explain', m: '설명하다', ex: 'She explained that the bus had been late.', exm: '그녀는 버스가 늦게 왔다고 설명했어요.' },
    { w: 'reply', m: '대답하다; 대답', ex: 'He replied that he was fine.', exm: '그는 괜찮다고 대답했어요.' },
    { w: 'add', m: '덧붙이다, 더하다', ex: 'She added that the class would start soon.', exm: '그녀는 수업이 곧 시작할 거라고 덧붙였어요.' },
    { w: 'mention', m: '언급하다, 말하다', ex: 'He didn\'t mention the test.', exm: '그는 시험에 대해 말하지 않았어요.' },
    { w: 'according to', m: '~에 따르면', ex: 'According to the coach, we need more practice.', exm: '코치님에 따르면 우리는 연습이 더 필요해요.' },
    { w: 'quote', m: '인용하다; 인용한 말', ex: 'Quote the speaker\'s exact words.', exm: '말한 사람의 말을 정확히 그대로 인용하세요.' },
    { w: 'source', m: '출처, 근원', ex: 'Always write the source of your information.', exm: '정보의 출처를 항상 적으세요.' },
    { w: 'summary', m: '요약', ex: 'Write a short summary of the interview.', exm: '인터뷰를 짧게 요약해 쓰세요.' },
    { w: 'secret', m: '비밀', ex: 'Whether she will come is still a secret.', exm: '그녀가 올지는 아직 비밀이에요.' },
  ],
});
