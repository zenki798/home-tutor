/* 대학 영어: 문법과 독해 · 긴 문장의 뼈대 찾기
 * 예문은 모두 직접 쓴 문장이다(가상의 연구·인물). */
(function () {
  // 주절의 동사 고르기 생성기: [문장, 주절의 동사, 뼈대, [[오답, 종류, (따로 쓴 까닭)], …], 개념 카드]
  var MAINV = [
    ['The survey conducted last spring shows that residents living near the river want more green space.', 'shows', 'The survey shows that ~.', [['conducted', 'part'], ['living', 'part'], ['want', 'sub']], 1],
    ['Students who sleep fewer than six hours tend to forget what they learned in class.', 'tend', 'Students tend to forget ~.', [['sleep', 'rel'], ['to forget', 'inf'], ['learned', 'sub']], 1],
    ['The book that the professor recommended explains how writing systems developed over time.', 'explains', 'The book explains how ~.', [['recommended', 'rel'], ['developed', 'sub']], 1],
    ['Reducing food waste requires changes in how stores display their products.', 'requires', 'Reducing food waste requires changes.', [['Reducing', 'ger'], ['display', 'sub']], 2],
    ['To understand the data fully, the team compared the results with figures published in earlier studies.', 'compared', 'The team compared the results with figures.', [['To understand', 'inf'], ['published', 'part']], 0],
    ['Many of the problems mentioned in the report that the committee released remain unsolved.', 'remain', 'Many of the problems remain unsolved.', [['mentioned', 'part'], ['released', 'rel']], 1],
    ['What the researchers found surprised even the most experienced doctors.', 'surprised', 'What the researchers found surprised doctors.', [['found', 'sub'], ['experienced', 'part']], 2],
    ['The idea that children learn best through play has influenced many teachers working in early education.', 'has influenced', 'The idea has influenced many teachers.', [['learn', 'sub'], ['working', 'part']], 1],
    ['Whether the policy will succeed depends on how citizens respond to it.', 'depends', 'Whether ~ depends on how ~.', [['will succeed', 'sub'], ['respond', 'sub']], 2],
    ['The water samples taken from the lake were sent to a laboratory for testing.', 'were sent', 'The water samples were sent to a laboratory.', [['taken', 'part'], ['testing', 'ger']], 1],
    ['Scientists studying the ocean warn that rising temperatures are damaging coral reefs.', 'warn', 'Scientists warn that ~.', [['studying', 'part'], ['rising', 'part'], ['are damaging', 'sub']], 1],
    ['The company, which was founded in 1998, employs about five hundred people working in three countries.', 'employs', 'The company employs about five hundred people.', [['was founded', 'rel'], ['working', 'part']], 1],
    ['Learning a second language at an early age helps children develop flexible thinking.', 'helps', 'Learning a second language helps children develop ~.', [['Learning', 'ger'], ['develop', 'oc', 'help + 목적어 + 동사원형 꼴에서 develop은 목적어 children 뒤의 목적격 보어입니다. 주절의 동사는 helps입니다.']], 3],
    ['The questions raised during the discussion showed that the topic needed more research.', 'showed', 'The questions showed that ~.', [['raised', 'part'], ['needed', 'sub']], 1],
    ['It is difficult to measure the happiness that people feel in daily life.', 'is', 'It is difficult to measure ~.', [['to measure', 'inf'], ['feel', 'rel']], 2],
    ['The evidence presented in the article does not support the claim that the drug is safe.', 'does not support', 'The evidence does not support the claim.', [['presented', 'part'], ['is', 'sub']], 1],
    ['Most of the students interviewed for the study said that they preferred online classes.', 'said', 'Most of the students said that ~.', [['interviewed', 'part'], ['preferred', 'sub']], 1],
    ['A new method developed by engineers allows farmers to use less water.', 'allows', 'A new method allows farmers to use less water.', [['developed', 'part'], ['to use', 'inf']], 3],
    ['The main reason why many species are disappearing is that their habitats are being destroyed.', 'is', 'The main reason is that ~.', [['are disappearing', 'rel'], ['are being destroyed', 'sub']], 1],
    ['Teachers who use games in class often find that their students pay more attention.', 'find', 'Teachers find that ~.', [['use', 'rel'], ['pay', 'sub']], 1],
    ['The report published by the ministry last week suggests that the number of tourists will increase.', 'suggests', 'The report suggests that ~.', [['published', 'part'], ['will increase', 'sub']], 1],
    ['Having finished the experiment, the students wrote a report describing their results.', 'wrote', 'The students wrote a report.', [['Having finished', 'part'], ['describing', 'part']], 0],
    ['The decision to close the library early angered many students preparing for exams.', 'angered', 'The decision angered many students.', [['to close', 'inf'], ['preparing', 'part']], 1],
  ];
  var MAINV_WHY = {
    rel: '관계절 안의 동사입니다. 관계사(who·which·that·why 등)가 이끄는 절은 앞 명사를 꾸미는 수식어라서 문장의 뼈대가 아닙니다.',
    sub: '접속사나 의문사(that·whether·how·what 등)가 이끄는 절 안의 동사입니다. 그 절 전체가 주어·목적어 같은 한 성분일 뿐, 주절의 동사는 따로 있습니다.',
    part: '분사(-ing·-ed)로 명사를 꾸미거나 문장에 덧붙는 말입니다. 분사 혼자서는 시제를 가진 동사(정동사)가 되지 못합니다.',
    inf: 'to부정사는 시제가 없는 준동사입니다. 주어·목적어·수식어 노릇을 할 뿐 주절의 동사가 될 수 없습니다.',
    ger: '동명사(-ing)는 명사처럼 주어·목적어 자리에 쓰이는 준동사입니다. 주절의 동사가 아닙니다.',
  };

  // 수 일치 생성기: [괄호 안 두 형태가 있는 문장, 정답, 오답, 중심이 되는 주어, 개념 카드]
  var AGREE = [
    ['The quality of the samples collected from the rivers (was / were) poor.', 'was', 'were', 'quality', 1],
    ['The results of the experiment conducted last year (was / were) published in March.', 'were', 'was', 'results', 1],
    ['One of the reasons for the delays (is / are) a lack of funding.', 'is', 'are', 'One', 1],
    ['The students in the advanced class (has / have) finished their projects.', 'have', 'has', 'students', 1],
    ['The list of books required for the course (is / are) on the website.', 'is', 'are', 'list', 1],
    ['Each of the participants (was / were) given a short questionnaire.', 'was', 'were', 'Each', 1],
    ['The effects of noise on sleep (has / have) been studied for decades.', 'have', 'has', 'effects', 1],
    ['Access to clean water and basic health services (remains / remain) limited in some areas.', 'remains', 'remain', 'Access', 1],
    ['The number of students taking online courses (has / have) doubled.', 'has', 'have', 'number', 1],
    ['The way people use their phones (is / are) changing quickly.', 'is', 'are', 'way', 1],
    ['The scientists who designed the experiment (was / were) surprised by the results.', 'were', 'was', 'scientists', 1],
    ['The building, together with its two gardens, (is / are) open to visitors.', 'is', 'are', 'building', 1],
    ['Every student in the two classes (needs / need) a laptop.', 'needs', 'need', 'student', 1],
    ['The decline in the populations of wild bees (worries / worry) many farmers.', 'worries', 'worry', 'decline', 1],
    ['Students who live far from the campus (spends / spend) more time on buses.', 'spend', 'spends', 'Students', 1],
    ['The main topic of the lectures (is / are) climate change.', 'is', 'are', 'topic', 1],
    ['Growing vegetables in small city gardens (is / are) becoming popular.', 'is', 'are', 'Growing vegetables (동명사 주어)', 2],
    ['That the plan failed so quickly (was / were) a surprise to everyone.', 'was', 'were', 'That the plan failed so quickly (that절 주어)', 2],
    ['To learn three languages at the same time (requires / require) a lot of effort.', 'requires', 'require', 'To learn three languages (to부정사 주어)', 2],
    ['Whether these methods work in other countries (is / are) still unclear.', 'is', 'are', 'Whether these methods work (whether절 주어)', 2],
    ['Reading the instructions before the experiment (prevents / prevent) many mistakes.', 'prevents', 'prevent', 'Reading the instructions (동명사 주어)', 2],
    ['The opinions of the expert on these two issues (differs / differ) from mine.', 'differ', 'differs', 'opinions', 1],
  ];

  Tutor.registerUnit({
    id: 'eng-u-grammar-01',
    course: 'eng-u-grammar',
    title: '긴 문장의 뼈대 찾기',
    summary: '수식어를 걷어 내고 주어와 동사를 찾아, 학술 글의 길고 복잡한 문장을 구조대로 끊어 읽습니다.',
    goals: [
      '긴 문장에서 주절의 주어와 동사(정동사)를 찾을 수 있다.',
      '전치사구·분사구·관계절을 수식어로 묶어 문장의 뼈대만 남길 수 있다.',
      '명사절·to부정사·동명사가 주어인 문장의 구조와 수 일치를 판단할 수 있다.',
      '동사가 요구하는 뒤 구조(문장 형식)를 알고 의미 단위로 끊어 읽을 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '주절의 주어와 동사 찾기',
        body: '아무리 긴 문장도 뼈대는 **주어 + 동사**(+ 동사가 요구하는 말)입니다. 학술 글이 어려운 까닭은 낱말이 어려워서보다 이 뼈대가 수식어에 묻혀 보이지 않기 때문입니다.\n\n' +
          '주절의 동사는 **정동사**(시제와 수가 드러나는 동사)입니다. 다음은 정동사가 아닙니다.\n\n' +
          '- to부정사: to explain, to reduce\n- 동명사·현재분사: explaining, reducing\n- 혼자 쓰인 과거분사: the data **collected** in 2020\n\n' +
          '또 접속사·관계사(that, which, who, whether, because …) 뒤에 오는 동사는 종속절의 동사입니다. 그래서 **정동사의 수 = 접속사·관계사의 수 + 1** 이 대체로 맞고, 남는 하나가 주절의 동사입니다.\n\n' +
          'The results **collected** from the survey **suggest** that young adults **read** less than before.\n\n' +
          '정동사는 suggest와 read 둘이고 접속사 that이 하나입니다. that 뒤의 read는 종속절의 동사이므로, 주절의 동사는 **suggest**입니다(collected는 results를 꾸미는 분사).\n\n' +
          '> 💡 주어를 찾을 때는 동사 바로 앞의 명사가 아니라, 문장 맨 앞 명사 덩어리의 **중심 명사**를 봅니다. 위 문장의 주어는 survey가 아니라 results입니다.',
        easy: '긴 문장을 나무에 견주어 보십시오. 줄기(주어 + 동사)에 가지(수식어)가 잔뜩 붙어 있습니다. 가지를 하나씩 쳐 내면 줄기만 남습니다.\n\n' +
          '동사 후보가 여럿이면 "이 낱말 앞에 that·who·which 같은 연결어가 있나?", "to나 -ing 꼴은 아닌가?"를 물어 하나씩 지웁니다. 끝까지 남는 동사가 줄기입니다.',
        check: {
          type: 'choice',
          q: '다음 문장에서 주절의 동사는 무엇입니까?\n\nThe students who attended the lecture on energy policy were asked to write a short report.',
          choices: ['attended', 'were asked', 'to write'],
          answer: 1,
          why: [
            'attended는 관계대명사 who가 이끄는 관계절 안의 동사입니다. 관계절은 students를 꾸미는 수식어입니다.',
            '',
            'to write는 to부정사라서 시제가 없습니다. 주절의 동사가 될 수 없습니다.',
          ],
          explain: '관계절 who attended the lecture on energy policy를 걷어 내면 The students **were asked** to write a short report만 남습니다. 주절의 동사는 were asked(수동태)입니다.',
        },
      },
      {
        title: '수식어 괄호 치기',
        body: '뼈대를 찾는 가장 확실한 방법은 **수식어에 괄호를 치는 것**입니다. 명사 뒤에 붙는 수식어는 대개 다음 세 가지입니다.\n\n' +
          '| 수식어 | 시작 표시 | 예 |\n|---|---|---|\n' +
          '| 전치사구 | of, in, on, for, with, by … | the effect (**of** noise) (**on** sleep) |\n' +
          '| 분사구 | -ing, -ed(과거분사) | students (**living** abroad), data (**collected** in 2020) |\n' +
          '| 관계절 | who, which, that, whose, where … | the method (**that** we used) |\n\n' +
          'The effects (of social media) (on young people) (that researchers have studied) **remain** unclear.\n\n' +
          '괄호를 치면 The effects **remain** unclear만 남습니다. 그래서 동사는 복수 주어 effects에 맞춘 remain입니다.\n\n' +
          '> ⚠️ 동사의 수는 괄호 안 명사가 아니라 **괄호 밖의 중심 명사**에 맞춥니다. The list (of required books) **is** on the website. — books가 아니라 list에 맞춰 is입니다.',
        easy: '휴대폰 사진에서 배경을 흐리게 하는 기능을 떠올려 보십시오. 수식어를 괄호로 묶는 것은 배경을 흐리게 하는 일입니다. 그러면 주인공(주어)과 그 행동(동사)만 또렷하게 남습니다.\n\n' +
          '괄호를 여는 신호는 전치사(of, in …), 명사 바로 뒤의 -ing·-ed, 그리고 who·which·that입니다. 신호가 보이면 일단 괄호를 열고, 다음 동사가 나오기 직전에 닫습니다.',
        check: {
          type: 'ox',
          q: 'The list of required books is on the website.에서 동사 is는 books에 수를 맞춘 것입니다.',
          answer: false,
          explain: 'of required books는 전치사구 수식어입니다. 괄호를 치면 The list is on the website가 남고, 동사 is는 단수 명사 list에 맞춘 것입니다.',
        },
      },
      {
        title: '명사절·to부정사·동명사가 주어인 문장',
        body: '학술 글에서는 주어 자리에 낱말 하나가 아니라 **덩어리**가 오는 일이 많습니다.\n\n' +
          '| 주어 덩어리 | 예 |\n|---|---|\n' +
          '| 동명사구 | **Reducing plastic waste** requires cooperation. |\n' +
          '| to부정사구 | **To predict the weather accurately** is difficult. |\n' +
          '| that절 | **That the plan failed** was surprising. |\n' +
          '| whether절 | **Whether the method works** remains unclear. |\n' +
          '| what절 | **What the data show** is a steady decline. |\n\n' +
          '이런 주어 덩어리는 **단수**로 취급합니다(덩어리 하나가 주어). 그리고 주어 덩어리 안에도 동사가 있으므로, 그 덩어리가 끝나는 곳을 찾으면 바로 뒤에 주절의 동사가 나옵니다.\n\n' +
          '주어가 너무 길면 뒤로 보내고 그 자리에 **가주어 it**을 둡니다. It is difficult **to predict the weather accurately**. / It was surprising **that the plan failed**. 이때 진짜 주어는 뒤의 to부정사구·that절입니다.',
        easy: '문장 맨 앞에 -ing, To, That, Whether, What이 보이면 "주어가 길어지겠구나" 하고 마음의 준비를 하십시오. 그 덩어리 전체가 한 사람의 이름표라고 생각하면 됩니다. 이름표가 아무리 길어도 사람은 한 명이니 동사는 단수입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nComparing the two teaching methods ___ more time than we expected.',
          choices: ['require', 'requires', 'requiring'],
          answer: 1,
          why: [
            'methods 바로 뒤라서 복수로 맞춘 것 같습니다. 주어는 동명사구 Comparing the two teaching methods 전체이고 단수로 취급합니다.',
            '',
            'requiring은 분사·동명사라서 정동사가 아닙니다. 이 문장에는 주절의 동사가 필요합니다.',
          ],
          explain: '주어는 동명사구 Comparing the two teaching methods입니다. 동명사 주어는 단수로 취급하므로 requires를 씁니다.',
        },
      },
      {
        title: '동사 뒤 구조: 문장 형식과 동사의 쓰임',
        body: '주어와 동사를 찾았으면 **동사가 뒤에 무엇을 요구하는지** 봅니다. 동사를 알면 문장 끝까지의 구조가 미리 보입니다.\n\n' +
          '| 형식 | 구조 | 예 |\n|---|---|---|\n' +
          '| 1형식 | 주어 + 동사 | A new problem **emerged**. |\n' +
          '| 2형식 | 주어 + 동사 + 보어 | The results **remain** unclear. |\n' +
          '| 3형식 | 주어 + 동사 + 목적어 | The team **analyzed** the data. |\n' +
          '| 4형식 | 주어 + 동사 + 간접목적어 + 직접목적어 | The program **offers** students free lessons. |\n' +
          '| 5형식 | 주어 + 동사 + 목적어 + 목적격 보어 | The committee **considered** the plan unrealistic. |\n\n' +
          '학술 글에서 자주 보는 동사의 쓰임 유형도 함께 익혀 둡니다.\n\n' +
          '- **allow / enable / require / encourage** + 목적어 + to부정사: The grant **enabled** us **to hire** two assistants.\n' +
          '- **make / let / help** + 목적어 + 동사원형: The new tool **helps** students **organize** their notes.\n' +
          '- **regard / see A as B**(A를 B로 여기다): Many scholars **regard** the book **as** a classic.\n' +
          '- **attribute A to B**(A를 B 탓·덕으로 돌리다), **provide A with B**(A에게 B를 주다)\n\n' +
          '> 💡 5형식에서 목적어와 목적격 보어 사이에는 "목적어가 보어이다/보어하다"라는 관계가 숨어 있습니다. considered the plan unrealistic → the plan is unrealistic.',
        easy: '동사는 뒤에 올 손님을 미리 예약해 둔 식당 같습니다. give는 "누구에게 + 무엇을" 두 자리를, consider는 "무엇을 + 어떻다고" 두 자리를, emerge는 손님 없이 혼자 섭니다.\n\n' +
          '동사를 보는 순간 "이 동사는 뒤에 몇 자리를 원하지?"를 떠올리면, 긴 문장에서도 어디까지가 목적어이고 어디부터가 수식어인지 가려낼 수 있습니다.',
        check: {
          type: 'choice',
          q: 'The committee considered the proposal unrealistic.은 몇 형식 문장입니까?',
          choices: ['3형식', '4형식', '5형식'],
          answer: 2,
          why: [
            'unrealistic을 빠뜨리고 보았습니다. unrealistic은 목적어 the proposal이 어떤지를 설명하는 목적격 보어입니다.',
            '4형식은 "누구에게 + 무엇을"처럼 목적어가 둘입니다. unrealistic은 형용사라서 목적어가 될 수 없습니다.',
            '',
          ],
          explain: 'the proposal(목적어) + unrealistic(목적격 보어)이고, 둘 사이에 "the proposal is unrealistic"이라는 관계가 있습니다. 그래서 5형식입니다.',
        },
      },
      {
        title: '의미 단위로 끊어 읽기',
        body: '뼈대와 수식어를 가려낼 수 있게 되면, 문장을 **의미 단위(덩어리)**로 끊어 앞에서부터 차례로 이해합니다. 우리말 어순으로 뒤에서부터 거꾸로 옮기지 않는 것이 핵심입니다.\n\n' +
          '끊는 자리는 대체로 다음과 같습니다.\n\n' +
          '- 긴 주어가 끝나고 동사가 시작되는 곳\n- 접속사·관계사 앞(that, which, who, because …)\n- 전치사구·to부정사·분사구가 시작되는 곳\n- 콤마\n\n' +
          'Researchers / who study sleep / have found / that students / who sleep less than six hours / tend to remember less / of what they study.\n\n' +
          '→ 연구자들은 / 수면을 연구하는 / 발견했다 / 학생들이 / 여섯 시간보다 적게 자는 / 덜 기억하는 경향이 있다는 것을 / 공부한 것 중에서.\n\n' +
          '> ⚠️ 한 덩어리 안을 끊지 않습니다. 전치사와 그 목적어(in / the lab ✕), 관사와 명사(the / results ✕), 조동사와 본동사(can / be ✕)는 한 단위입니다.',
        easy: '긴 문장은 기차와 같습니다. 객차(의미 단위) 사이의 연결 고리에서만 끊을 수 있고, 객차 한가운데를 자르면 안 됩니다. 연결 고리는 that·who 같은 연결어, 전치사, to, 콤마가 있는 곳입니다.\n\n' +
          '끊은 덩어리마다 짧게 뜻을 붙이며 앞에서부터 읽으면, 문장을 끝까지 읽은 뒤 다시 처음으로 돌아가는 일이 줄어듭니다.',
        check: {
          type: 'ox',
          q: '끊어 읽기를 할 때 전치사와 그 뒤의 명사 사이(in / the laboratory)를 끊는 것이 좋습니다.',
          answer: false,
          explain: '전치사와 그 목적어는 한 의미 단위입니다. 끊는다면 전치사 앞에서 끊습니다: The samples were tested / in the laboratory.',
        },
      },
    ],

    examples: [
      {
        q: '다음 문장의 뼈대(주어와 주절의 동사)를 찾고 의미 단위로 끊어 읽으십시오.\n\nThe number of students who choose to study abroad after graduating from high school has increased steadily.',
        steps: [
          '정동사 후보를 모읍니다: choose, has increased. graduating은 전치사 after 뒤의 동명사라 정동사가 아닙니다.',
          'choose 앞에 관계대명사 who가 있으므로 choose는 관계절의 동사입니다. 남는 has increased가 주절의 동사입니다.',
          '수식어에 괄호를 칩니다: The number (of students) (who choose to study abroad after graduating from high school) has increased steadily.',
          '주어의 중심 명사는 number이므로 단수 동사 has를 썼습니다.',
          '끊어 읽기: The number of students / who choose to study abroad / after graduating from high school / has increased steadily. → 학생의 수는 / 유학을 선택하는 / 고등학교를 졸업한 뒤 / 꾸준히 늘었다.',
        ],
        answer: '주어 The number, 동사 has increased — 뼈대: The number has increased steadily.',
      },
      {
        q: '다음 문장의 동사 뒤 구조를 정리하십시오.\n\nThe new library app allows users to reserve study rooms in advance.',
        steps: [
          '주어는 The new library app, 주절의 동사는 allows입니다.',
          'allow는 "목적어 + to부정사"를 요구하는 동사입니다(allow O to V: O가 ~하게 해 주다).',
          '목적어는 users, 목적격 보어는 to reserve study rooms입니다. in advance는 수식어입니다.',
          '5형식 문장이고, 앞에서부터 읽으면 "새 도서관 앱은 / 이용자가 ~하게 해 준다 / 스터디룸을 예약하는 것을 / 미리"입니다.',
        ],
        answer: '주어 + allows + 목적어(users) + 목적격 보어(to reserve study rooms) — 5형식',
      },
    ],

    terms: [
      { term: '정동사', def: '시제와 수가 드러나는 동사입니다. 주절과 종속절마다 하나씩 있습니다. 예: shows, has increased, were asked' },
      { term: '준동사', def: 'to부정사·동명사·분사처럼 동사에서 나왔지만 시제를 갖지 않아 정동사가 되지 못하는 말입니다.' },
      { term: '수식어', def: '명사나 문장에 정보를 덧붙이지만 뼈대에는 들지 않는 말입니다. 전치사구·분사구·관계절·부사 등이 있습니다.' },
      { term: '중심 명사', def: '긴 명사 덩어리에서 핵심이 되는 명사입니다. 동사의 수는 이 명사에 맞춥니다. 예: the list of books에서 list' },
      { term: '가주어 it', def: '긴 주어(to부정사구·that절)를 뒤로 보내고 주어 자리에 대신 놓는 it입니다. 예: It is important to rest.' },
      { term: '목적격 보어', def: '5형식에서 목적어가 어떤 상태인지, 무엇을 하는지 설명하는 말입니다. 예: They found the task difficult.에서 difficult' },
      { term: '끊어 읽기', def: '문장을 의미 단위로 나누어 앞에서부터 차례로 이해하는 읽기 방법입니다. 직독직해라고도 합니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '다음 문장에서 주절의 동사는 무엇입니까?\n\nThe new policy, introduced after years of debate, aims to reduce traffic in the city center.',
        choices: ['introduced', 'aims', 'to reduce', 'reduce'],
        answer: 1,
        why: [
          'introduced는 콤마 사이에 끼어든 분사구의 과거분사입니다. policy에 정보를 덧붙일 뿐입니다.',
          '',
          'to reduce는 to부정사로 aims의 목적어 노릇을 합니다. 시제가 없어 주절의 동사가 아닙니다.',
          'reduce는 to부정사 to reduce의 일부입니다. 혼자 떨어진 정동사가 아닙니다.',
        ],
        explain: '콤마 사이의 분사구(introduced after years of debate)를 걷어 내면 The new policy **aims** to reduce traffic만 남습니다. 주절의 동사는 aims입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '다음 문장에서 주절의 동사를 찾아 그대로 쓰십시오.\n\nThe book that my professor recommended to the class explains the history of writing.',
        answer: ['explains'],
        wrong: [{ a: 'recommended', why: 'recommended는 관계대명사 that이 이끄는 관계절의 동사입니다. 관계절은 book을 꾸미는 수식어입니다.' }],
        explain: '관계절 that my professor recommended to the class를 괄호로 묶으면 The book **explains** the history of writing이 남습니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
        q: '괄호 안에서 어법에 맞는 것을 골라 쓰십시오.\n\nThe quality of the photos taken by the old cameras (was / were) surprisingly good.',
        answer: ['was'],
        wrong: [{ a: 'were', why: '동사 바로 앞의 cameras나 photos에 맞추었습니다. of the photos와 taken by the old cameras는 수식어이고, 중심 명사는 단수 quality입니다.' }],
        explain: 'The quality (of the photos) (taken by the old cameras) **was** surprisingly good. 중심 명사 quality가 단수이므로 was입니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: 'Students living near the campus often walk to class.에서 living near the campus는 students를 꾸미는 분사구입니다.',
        answer: true,
        explain: 'living near the campus는 "캠퍼스 근처에 사는"이라는 뜻으로 Students를 뒤에서 꾸미는 현재분사구입니다. 뼈대는 Students often walk to class입니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '다음 문장의 주어는 무엇입니까?\n\nWhat surprised the researchers most was the speed of the change.',
        choices: ['the researchers', 'the speed of the change', 'What surprised the researchers most', 'the change'],
        answer: 2,
        why: [
          'the researchers는 what절 안에서 surprised의 목적어입니다.',
          'the speed of the change는 was 뒤의 보어입니다.',
          '',
          'the change는 전치사 of의 목적어로, 보어 안에 들어 있는 명사입니다.',
        ],
        explain: '명사절 주어는 What surprised the researchers most(연구자들을 가장 놀라게 한 것)이고, 주절의 동사는 was입니다. what절 주어는 단수로 받아 was를 썼습니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: 'The professor gave the students a clear example.은 몇 형식 문장입니까?',
        choices: ['2형식', '3형식', '4형식', '5형식'],
        fixed: true,
        answer: 2,
        why: [
          '2형식은 동사 뒤에 주어를 설명하는 보어가 옵니다. the students는 주어(The professor)를 설명하지 않습니다.',
          '목적어를 하나만 보았습니다. the students(~에게)와 a clear example(~을) 두 개가 있습니다.',
          '',
          '5형식이라면 a clear example이 the students의 상태를 설명해야 합니다. 그러나 "학생들 = 예시"라는 관계는 없습니다.',
        ],
        explain: 'gave + the students(간접목적어, ~에게) + a clear example(직접목적어, ~을)이므로 4형식입니다. 3형식으로 바꾸면 The professor gave a clear example to the students.입니다.',
      },
      {
        id: 'p7', level: 1, type: 'ox', concept: 4,
        q: 'Many experts believe / that the plan will fail. 처럼 접속사 that 앞에서 끊어 읽는 것은 알맞습니다.',
        answer: true,
        explain: '접속사 that은 새 절(목적어 절)을 시작하는 신호이므로 그 앞이 자연스러운 끊는 자리입니다. "많은 전문가들은 믿는다 / 그 계획이 실패할 것이라고"로 읽습니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOne of the main reasons for the delays in the construction projects ___ the lack of funding.',
        choices: ['are', 'were', 'is', 'being'],
        answer: 2,
        why: [
          'reasons·delays·projects 같은 복수 명사에 맞추었습니다. 중심 명사는 One이므로 단수입니다.',
          '복수 동사이고, 시제도 문맥과 맞지 않습니다. 주어의 중심은 단수 One입니다.',
          '',
          'being은 정동사가 아닙니다. 이 문장에는 주절의 동사가 필요합니다.',
        ],
        hint: '"one of + 복수 명사"에서 주어의 중심이 무엇인지 생각해 보십시오.',
        explain: 'One (of the main reasons) (for the delays) (in the construction projects) **is** the lack of funding. 중심 명사는 One이므로 단수 동사 is입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'text', concept: 3,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 빈칸에 쓰십시오.\n\nThe scholarship enabled her ___ (study) abroad for a year.',
        answer: ['to study'],
        hint: 'enable이 목적어 뒤에 어떤 꼴을 요구하는지 떠올려 보십시오.',
        wrong: [
          { a: 'study', why: '동사원형은 make·let·help 뒤에 씁니다. enable은 "목적어 + to부정사"를 요구합니다.' },
          { a: 'studying', why: 'enable 뒤에는 -ing 꼴이 아니라 to부정사를 씁니다(enable O to V).' },
        ],
        explain: 'enable은 "목적어 + to부정사"(O가 ~할 수 있게 하다) 꼴로 씁니다. The scholarship enabled her **to study** abroad.',
      },
      {
        id: 'p10', level: 2, type: 'order', concept: 4,
        q: '의미 단위를 바른 순서로 놓아 문장을 완성하십시오.\n\n(뜻: 그 연구에 참여한 학생들은 잠을 더 잘 잤다고 보고했다.)',
        choices: ['The students', 'who joined the study', 'reported', 'sleeping better'],
        answer: [0, 1, 2, 3],
        explain: 'The students / who joined the study / reported / sleeping better. — 주어 The students 바로 뒤에 관계절이 붙어 꾸미고, 주절의 동사 reported가 동명사구 sleeping better를 목적어로 받습니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 2,
        q: '다음 문장에서 진짜 주어는 무엇입니까?\n\nIt is essential to check the sources of the information before citing them.',
        choices: ['It', 'the sources of the information', 'to check the sources of the information', 'before citing them'],
        answer: 2,
        why: [
          'It은 가주어입니다. 자리만 채울 뿐 뜻이 없습니다.',
          'the sources of the information은 to check의 목적어입니다.',
          '',
          'before citing them은 "인용하기 전에"라는 때를 나타내는 수식어입니다.',
        ],
        explain: 'It은 가주어이고, 진짜 주어는 to check the sources of the information(정보의 출처를 확인하는 것)입니다. before citing them은 시간 수식어입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 0, fixed: true,
        q: '다음 문장에 있는 정동사(시제가 드러나는 동사)는 모두 몇 개입니까?\n\nThe data suggest that people who exercise regularly sleep better.',
        choices: ['2개', '3개', '4개', '5개'],
        answer: 1,
        why: [
          '종속절의 동사 하나를 빠뜨렸습니다. suggest(주절), exercise(관계절), sleep(that절) 세 개를 모두 세어 보십시오.',
          '',
          '정동사가 아닌 말을 셌습니다. regularly·better는 부사입니다.',
          '정동사가 아닌 말을 여러 개 셌습니다. 시제가 드러나는 동사만 셉니다.',
        ],
        explain: '정동사는 suggest(주절), exercise(관계절 who ~), sleep(that절)의 3개입니다. 접속사·관계사가 that, who 두 개이므로 "정동사 수 = 2 + 1 = 3"과 맞습니다. 주절의 동사는 suggest입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '다음 문장에서 used의 역할로 알맞은 것은 무엇입니까?\n\nThe method used in the experiment produced reliable results.',
        choices: ['주절의 동사(과거 시제)', 'method를 꾸미는 과거분사', '관계절의 동사', '수동태 문장의 동사'],
        answer: 1,
        why: [
          'used를 과거 시제 동사로 읽으면 produced와 동사가 둘이 되는데, 둘을 잇는 접속사가 없습니다. 주절의 동사는 produced입니다.',
          '',
          'used 앞에 관계대명사가 없습니다. 관계대명사 + be동사(that was)가 줄어든 것으로 볼 수는 있지만, 지금 남은 used는 분사입니다.',
          '수동태가 되려면 be동사 + 과거분사여야 합니다. used 앞에 be동사가 없습니다.',
        ],
        hint: '정동사가 두 개라면 그 둘을 잇는 접속사나 관계사가 있어야 합니다.',
        explain: 'used in the experiment는 "실험에서 사용된"이라는 뜻으로 method를 뒤에서 꾸미는 과거분사구입니다. 뼈대는 The method **produced** reliable results입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 0,
        q: '다음 문장에서 주절의 동사는 무엇입니까?\n\nThe students the professor interviewed described the course as demanding.',
        choices: ['interviewed', 'described', 'demanding', 'the professor'],
        answer: 1,
        why: [
          'interviewed 앞에 목적격 관계대명사(whom·that)가 생략되어 있습니다. the professor interviewed는 students를 꾸미는 관계절입니다.',
          '',
          'demanding은 describe A as B 꼴에서 B에 해당하는 형용사(힘든)입니다.',
          'the professor는 관계절 안의 주어입니다. 동사가 아닙니다.',
        ],
        hint: '명사 두 개(The students the professor)가 연달아 나오면 목적격 관계대명사가 생략되었는지 의심해 보십시오.',
        explain: 'The students (whom) the professor interviewed가 주어 덩어리이고, 주절의 동사는 **described**입니다. describe A as B(A를 B라고 묘사하다): "교수가 면담한 학생들은 그 강의가 힘들다고 말했다."',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 0,
        q: '다음 문장에 있는 정동사(시제가 드러나는 동사)는 모두 몇 개입니까? 수로 쓰십시오.\n\nScientists who study the ocean warn that rising temperatures are damaging the coral reefs that protect many coastlines.',
        answer: '4',
        hint: '접속사·관계사(who, that, that)의 수를 먼저 세어 보십시오.',
        wrong: [
          { a: '5', why: 'rising을 정동사로 셌습니다. rising은 temperatures를 꾸미는 분사입니다.' },
          { a: '3', why: '종속절의 동사 하나를 빠뜨렸습니다. study, warn, are damaging, protect를 모두 세어 보십시오.' },
        ],
        explain: '정동사는 study(관계절), warn(주절), are damaging(that절), protect(관계절)로 4개입니다. 접속사·관계사가 who, that, that 세 개이므로 3 + 1 = 4와 맞습니다. rising은 분사입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 0,
        q: '다음 중 **완전한 문장이 아닌** 것은 무엇입니까?',
        choices: [
          'The researchers who conducted the survey in five countries.',
          'The researchers conducted the survey in five countries.',
          'The survey that the researchers conducted covered five countries.',
          'Conducting the survey in five countries took two years.',
        ],
        answer: 0,
        why: [
          '',
          'The researchers(주어) + conducted(주절의 동사)가 갖추어진 완전한 문장입니다.',
          'The survey(주어) + covered(주절의 동사)가 있습니다. that the researchers conducted는 관계절입니다.',
          '동명사구 주어(Conducting ~ countries)와 주절의 동사(took)를 모두 갖춘 문장입니다.',
        ],
        hint: '관계절을 괄호로 묶은 뒤 주절의 동사가 남는지 보십시오.',
        explain: '첫째 문장에서 who conducted the survey in five countries를 괄호로 묶으면 The researchers만 남고 주절의 동사가 없습니다. 주어 덩어리만 있는 불완전한 문장입니다.',
      },
      {
        id: 'a5', level: 3, type: 'order', concept: 2,
        q: '의미 단위를 바른 순서로 놓아 문장을 완성하십시오.\n\n(뜻: 가장 중요한 것은 그 결과가 반복될 수 있는지이다.)',
        choices: ['is', 'What matters most', 'can be repeated', 'whether the results'],
        answer: [1, 0, 3, 2],
        hint: '주어가 명사절이고, 보어도 명사절입니다.',
        explain: 'What matters most / is / whether the results / can be repeated. — what절이 주어, is가 주절의 동사, whether절이 보어입니다. what절 주어는 단수로 받아 is를 씁니다.',
      },
    ],

    deeper: [
      {
        title: '전공 원서에서 뼈대 찾기를 연습하는 법',
        body: '전공 교재의 한 문단을 골라 문장마다 다음 세 가지만 표시해 보십시오.\n\n' +
          '1. 주절의 주어 중심 명사에 밑줄\n2. 주절의 동사에 동그라미\n3. 수식어(전치사구·분사구·관계절)에 괄호\n\n' +
          '처음에는 한 문장에 1~2분이 걸리지만, 몇 주만 지나면 눈으로만 괄호를 칠 수 있게 됩니다. 이때부터는 낯선 전문 용어가 있어도 문장의 구조가 먼저 보이므로, 사전을 찾아야 할 낱말과 넘어가도 되는 낱말이 구별됩니다.\n\n' +
          '이 과정의 다음 단원들(명사구 확장, 명사화, 담화 표지)은 모두 이 "뼈대 찾기" 위에 쌓입니다.',
      },
      {
        title: '정원길 문장(garden-path sentence)',
        body: '언어학에서는 처음에 잘못된 구조로 읽히도록 만들어진 문장을 **정원길 문장**이라고 부릅니다. 대표적인 유형이 "명사 + 과거형처럼 보이는 과거분사"입니다.\n\n' +
          'The students taught by the new instructor improved quickly.\n\n' +
          'taught를 처음에 주절의 동사로 읽으면 by the new instructor 뒤에서 막힙니다. 사실 taught by the new instructor는 students를 꾸미는 과거분사구이고, 주절의 동사는 improved입니다.\n\n' +
          '이런 문장을 만났을 때 "동사가 둘인데 접속사가 없다"는 점을 알아차리면 곧바로 바로잡을 수 있습니다.',
      },
    ],

    faq: [
      {
        q: '동사처럼 생긴 낱말이 여러 개 있으면 어느 게 진짜 동사예요?',
        a: '먼저 to부정사, -ing, 혼자 쓰인 과거분사(be·have 없이)를 지웁니다. 남은 동사 가운데 that·which·who·whether 같은 연결어 뒤에 있는 것은 종속절의 동사이니 지웁니다. 마지막에 남는 하나가 주절의 동사입니다. 정동사 수가 "연결어 수 + 1"과 맞는지 확인하면 더 확실합니다.',
      },
      {
        q: '끊어 읽기는 어디서 끊는 게 정답인가요?',
        a: '정해진 하나의 정답은 없습니다. 다만 의미 단위의 경계(긴 주어 뒤, 접속사·관계사 앞, 전치사구·to부정사 앞, 콤마)에서 끊고, 덩어리 안(전치사와 명사, 관사와 명사, 조동사와 본동사)은 끊지 않는다는 원칙은 지켜야 합니다. 익숙해지면 더 큰 단위로 끊어 읽게 됩니다.',
      },
      {
        q: '5형식을 꼭 외워야 하나요?',
        a: '형식 번호 자체보다 "이 동사는 뒤에 무엇을 요구하는가"를 아는 것이 중요합니다. 형식은 그 요구를 분류하는 틀일 뿐입니다. 특히 allow·enable + 목적어 + to부정사, make·let·help + 목적어 + 동사원형, regard A as B 같은 쓰임은 학술 글에서 아주 자주 나오므로 낱말과 함께 익혀 두는 것이 좋습니다.',
      },
    ],

    mistakes: [
      '동사를 바로 앞 명사에 맞추는 실수 — The list of books **are** ✕ → 수식어 of books를 괄호로 묶으면 중심 명사는 list, 그래서 **is**입니다.',
      '명사 뒤의 과거분사를 과거 시제 동사로 읽는 실수 — The method used in the study ~에서 used는 분사입니다. 정동사가 둘인데 접속사가 없으면 하나는 분사라고 의심하십시오.',
      '동명사·to부정사·명사절 주어 뒤에 복수 동사를 쓰는 실수 — Reading many books **help** ✕ → 주어 덩어리는 단수, **helps**입니다.',
    ],

    gens: [
      {
        id: 'main-verb',
        level: 1,
        title: '주절의 동사 고르기',
        make: function (R) {
          var it = R.pick(MAINV);
          var correct = it[1];
          var reason = {};
          var wrongs = it[3].map(function (w) { reason[w[0]] = w[2] || MAINV_WHY[w[1]]; return w[0]; });
          var pick = R.choices(correct, wrongs, wrongs.length + 1);
          return {
            type: 'choice', concept: it[4],
            q: '다음 문장에서 주절의 동사는 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '수식어와 종속절을 걷어 내면 뼈대만 남습니다.\n\n' + it[2] + '\n\n주절의 동사는 **' + correct + '**입니다.',
          };
        },
      },
      {
        id: 'agreement',
        level: 2,
        title: '긴 주어와 동사의 수 일치',
        make: function (R) {
          var it = R.pick(AGREE);
          var head = it[3];
          var why = it[4] === 2
            ? '주어는 ' + head + '입니다. 이런 주어 덩어리는 하나로 보아 단수로 취급하므로 동사는 ' + it[1] + '입니다.'
            : '수식어를 괄호로 묶으면 주어의 중심 명사는 ' + head + '입니다. 그래서 동사는 ' + it[1] + '입니다.';
          return {
            type: 'short', check: 'text', concept: it[4],
            q: '괄호 안에서 어법에 맞는 것을 골라 쓰십시오.\n\n' + it[0],
            answer: [it[1]],
            wrong: [{ a: it[2], why: '동사 가까이에 있는 명사나 수식어 안의 명사에 맞추었습니다. ' + why }],
            explain: why,
          };
        },
      },
    ],

    vocab: [
      { w: 'survey', m: '설문 조사', ex: 'The survey showed that most students walk to school.', exm: '설문 조사에서 대부분의 학생이 걸어서 등교한다는 것이 드러났습니다.' },
      { w: 'participant', m: '참여자, 참가자', ex: 'Each participant answered twenty questions.', exm: '참여자마다 스무 개의 질문에 답했습니다.' },
      { w: 'findings', m: '(연구) 결과, 발견', ex: 'The findings of the study were published last month.', exm: '그 연구 결과는 지난달에 발표되었습니다.' },
      { w: 'policy', m: '정책', ex: 'The city introduced a new policy on recycling.', exm: '시는 재활용에 관한 새 정책을 도입했습니다.' },
      { w: 'reliable', m: '믿을 만한, 신뢰할 수 있는', ex: 'We need more reliable data before we decide.', exm: '결정하기 전에 더 믿을 만한 자료가 필요합니다.' },
      { w: 'decline', m: '감소; 줄어들다', ex: 'There has been a decline in the number of bees.', exm: '벌의 수가 줄어들었습니다.' },
      { w: 'emerge', m: '나타나다, 드러나다', ex: 'A clear pattern emerged from the results.', exm: '결과에서 뚜렷한 경향이 드러났습니다.' },
      { w: 'regard', m: '(~으로) 여기다', ex: 'Many people regard the bridge as a symbol of the city.', exm: '많은 사람이 그 다리를 도시의 상징으로 여깁니다.' },
      { w: 'enable', m: '~할 수 있게 하다', ex: 'The new software enables us to work faster.', exm: '새 소프트웨어 덕분에 우리는 더 빨리 일할 수 있습니다.' },
      { w: 'habitat', m: '서식지', ex: 'The forest is an important habitat for many birds.', exm: '그 숲은 많은 새에게 중요한 서식지입니다.' },
      { w: 'demanding', m: '힘든, 많은 노력이 드는', ex: 'The course is demanding but useful.', exm: '그 강의는 힘들지만 유용합니다.' },
      { w: 'questionnaire', m: '설문지', ex: 'Please fill out the questionnaire after the class.', exm: '수업이 끝난 뒤 설문지를 작성해 주십시오.' },
      { w: 'steadily', m: '꾸준히', ex: 'The price of rice has risen steadily.', exm: '쌀값이 꾸준히 올랐습니다.' },
    ],
  });
})();
