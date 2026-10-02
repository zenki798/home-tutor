/* 영어Ⅰ · 생략·삽입·부정 구문
 * 예문·지문은 모두 직접 쓴 글이다(가상의 인물·장소). */
(function () {
  // 짧은 글 (직접 쓴 글, 가상의 학교 도서관)
  var LIB = 'Many people believe that a bigger library is always a better library. However, not all large libraries are useful to students. Some have thousands of books, but only a few of them are up to date. Our school library, a small room on the second floor, has fewer than three thousand books. Still, the librarian, Ms. Yoon, chooses every new book carefully, and students rarely leave without finding what they need.';

  // 부분 부정·전체 부정 생성기용 (영어 문장, 우리말 뜻 네 가지: 부분 부정·전체 부정·전체 긍정·일부만)
  var NEG_ITEMS = [
    { partial: 'Not all the students passed the test.', whole: 'None of the students passed the test.',
      kr: ['모든 학생이 시험에 합격한 것은 아니다.', '어떤 학생도 시험에 합격하지 못했다.', '모든 학생이 시험에 합격했다.', '시험에 합격한 학생은 딱 한 명이다.'] },
    { partial: 'Not all the cookies were eaten.', whole: 'None of the cookies were eaten.',
      kr: ['쿠키가 모두 먹힌 것은 아니다.', '쿠키는 하나도 먹히지 않았다.', '쿠키가 모두 먹혔다.', '쿠키는 딱 하나만 남았다.'] },
    { partial: 'Not every bird can fly.', whole: 'No bird can fly.',
      kr: ['모든 새가 날 수 있는 것은 아니다.', '어떤 새도 날 수 없다.', '모든 새는 날 수 있다.', '날 수 있는 새는 딱 한 종류뿐이다.'] },
    { partial: 'Not all of my friends like horror movies.', whole: 'None of my friends like horror movies.',
      kr: ['내 친구들이 모두 공포 영화를 좋아하는 것은 아니다.', '내 친구 중 아무도 공포 영화를 좋아하지 않는다.', '내 친구들은 모두 공포 영화를 좋아한다.', '내 친구 중 한 명만 공포 영화를 좋아한다.'] },
    { partial: 'Not all the windows were open.', whole: 'None of the windows were open.',
      kr: ['창문이 모두 열려 있었던 것은 아니다.', '창문은 하나도 열려 있지 않았다.', '창문이 모두 열려 있었다.', '창문은 딱 하나만 열려 있었다.'] },
    { partial: 'Not every question on the test was difficult.', whole: 'No question on the test was difficult.',
      kr: ['시험 문제가 모두 어려웠던 것은 아니다.', '시험 문제 중 어려운 것은 하나도 없었다.', '시험 문제는 모두 어려웠다.', '어려운 시험 문제는 딱 하나였다.'] },
    { partial: 'Expensive shoes are not always comfortable.', whole: 'Expensive shoes are never comfortable.',
      kr: ['비싼 신발이 항상 편한 것은 아니다.', '비싼 신발은 결코 편하지 않다.', '비싼 신발은 언제나 편하다.', '비싼 신발은 처음 신을 때만 편하다.'] },
    { partial: 'My brother does not always walk to school.', whole: 'My brother never walks to school.',
      kr: ['내 동생이 항상 걸어서 등교하는 것은 아니다.', '내 동생은 절대 걸어서 등교하지 않는다.', '내 동생은 항상 걸어서 등교한다.', '내 동생은 비 오는 날에만 걸어서 등교한다.'] },
    { partial: 'The weather report is not always right.', whole: 'The weather report is never right.',
      kr: ['일기 예보가 항상 맞는 것은 아니다.', '일기 예보는 한 번도 맞은 적이 없다.', '일기 예보는 언제나 맞는다.', '일기 예보는 여름에만 맞는다.'] },
    { partial: 'A long book is not necessarily a good book.', whole: 'A long book is never a good book.',
      kr: ['긴 책이 반드시 좋은 책인 것은 아니다.', '긴 책은 결코 좋은 책이 아니다.', '긴 책은 언제나 좋은 책이다.', '좋은 책은 모두 짧다.'] },
  ];

  // 부사절 '주어 + be동사' 생략 생성기용: [접속사, 생략 뒤에 남은 말, 주절 주어, 주절 나머지, 시제(0 현재·1 과거), 우리말]
  var ELL_ITEMS = [
    ['While', 'waiting for the bus', 'Jia', 'read a short novel.', 1, '지아는 버스를 기다리는 동안 짧은 소설을 읽었다.'],
    ['When', 'asked about the plan', 'Minsu', 'just smiled.', 1, '민수는 그 계획에 대해 질문을 받았을 때 그냥 웃었다.'],
    ['Though', 'very tired', 'Seojun', 'finished his report.', 1, '서준이는 무척 피곤했지만 보고서를 끝냈다.'],
    ['When', 'young', 'my grandfather', 'lived in a fishing village.', 1, '할아버지는 젊었을 때 어촌에 사셨다.'],
    ['While', 'walking home', 'Hayun', 'found a lost puppy.', 1, '하윤이는 집에 걸어가다가 길 잃은 강아지를 발견했다.'],
    ['If', 'invited', 'we', 'will gladly join the party.', 0, '우리가 초대받는다면 기꺼이 파티에 갈 것이다.'],
    ['Although', 'nervous', 'Doyun', 'gave a clear speech.', 1, '도윤이는 긴장했지만 분명하게 연설했다.'],
    ['While', 'cooking dinner', 'my father', 'listens to the radio.', 0, '아버지는 저녁을 요리하시는 동안 라디오를 들으신다.'],
    ['When', 'in trouble', 'Sua', 'always asks her sister for help.', 0, '수아는 곤란할 때 언제나 언니에게 도움을 청한다.'],
    ['Though', 'small', 'the robots', 'can lift heavy boxes.', 0, '그 로봇들은 작지만 무거운 상자를 들 수 있다.'],
    ['While', 'staying in Busan', 'they', 'visited the fish market.', 1, '그들은 부산에 머무는 동안 수산 시장에 갔다.'],
    ['If', 'given more time', 'I', 'can solve this puzzle.', 0, '시간이 더 주어진다면 나는 이 퍼즐을 풀 수 있다.'],
  ];
  // 주절 주어 → 부사절에 되살릴 주어 대명사와 be동사(현재·과거)
  var PRON = {
    'Jia': ['she', 'is', 'was'], 'Hayun': ['she', 'is', 'was'], 'Sua': ['she', 'is', 'was'],
    'Minsu': ['he', 'is', 'was'], 'Seojun': ['he', 'is', 'was'], 'Doyun': ['he', 'is', 'was'],
    'my grandfather': ['he', 'is', 'was'], 'my father': ['he', 'is', 'was'],
    'we': ['we', 'are', 'were'], 'they': ['they', 'are', 'were'], 'the robots': ['they', 'are', 'were'], 'I': ['I', 'am', 'was'],
  };

Tutor.registerUnit({
  id: 'eng-h-e1-05',
  course: 'eng-h-e1',
  title: '생략·삽입·부정 구문',
  summary: '생략되거나 끼어든 말을 찾아 문장을 바르게 읽고, 부분 부정과 이중 부정의 뜻을 정확히 구별합니다.',
  goals: [
    '반복되어 생략된 말과 대부정사 to 뒤에 생략된 말을 되살려 해석할 수 있다.',
    '부사절에서 생략된 "주어 + be동사"를 찾아 문장을 정확히 읽을 수 있다.',
    '삽입절·삽입구와 콤마로 덧붙인 동격 표현을 가려내어 문장의 뼈대를 찾을 수 있다.',
    '부분 부정·전체 부정·이중 부정과 부정 관용 표현의 뜻을 구별할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '반복되는 말의 생략과 대부정사 to',
      body: '영어는 **앞에 이미 나온 말을 되풀이하지 않으려고** 뒤에서 생략하는 일이 많습니다. 생략된 자리는 앞부분을 보고 되살려 읽습니다.\n\n' +
        '| 문장 | 생략된 말 |\n|---|---|\n' +
        '| My sister likes cats, and I dogs. | I (like) dogs |\n' +
        "| I can swim, but my brother can't. | can't (swim) |\n" +
        '| Some students came by bus, and others on foot. | others (came) on foot |\n\n' +
        '**대부정사 to**: to부정사의 동사 부분이 앞에 나온 말과 같으면 동사 이하를 지우고 **to만 남깁니다.**\n\n' +
        '- You can leave early if you want **to**. → want to (leave early)\n' +
        "- I wanted to call you, but I forgot **to**. → forgot to (call you)\n" +
        "- A: Will you join us? B: I'd love **to**. → I'd love to (join you)\n\n" +
        "> ⚠️ 대부정사에서는 to까지 지우지 않습니다. I'd love. (×) / I'd love to. (○)",
      easy: '친구가 "나 떡볶이 좋아해."라고 하면 "나는 김밥."이라고만 해도 "나는 김밥을 좋아해."로 알아듣지요. 영어도 같은 말을 두 번 하지 않으려고 뒤쪽을 줄입니다.\n\n' +
        '대부정사 to는 줄임표 같은 것입니다. "I\'d love to."의 to는 "아까 네가 말한 그 일을 하는 것"을 대신하는 표시라서, to 뒤가 비어 있으면 **바로 앞 문장에서 동사를 빌려 와** 채워 읽으면 됩니다.',
      check: {
        type: 'ox',
        q: '다음 문장 끝의 to 뒤에는 call you가 생략되어 있습니다.\n\nI wanted to call you, but I forgot to.',
        answer: true,
        explain: '앞에 나온 to call you와 같은 말이 되풀이되므로 to만 남긴 **대부정사**입니다. I forgot to (call you). — "전화하려고 했는데 깜빡했어."',
      },
    },
    {
      title: '부사절의 "주어 + be동사" 생략',
      body: 'when, while, if, though, although, unless 같은 접속사가 이끄는 부사절에서 **부사절의 주어가 주절의 주어와 같고, 동사가 be동사**이면 "주어 + be동사"를 함께 생략할 수 있습니다.\n\n' +
        '| 줄인 문장 | 되살린 문장 |\n|---|---|\n' +
        '| **When young**, my father played soccer every day. | When **he was** young, … |\n' +
        '| **While waiting** for the bus, I read a book. | While **I was** waiting … |\n' +
        '| **When asked** about it, she smiled. | When **she was** asked … |\n' +
        '| **Though tired**, he kept working. | Though **he was** tired, … |\n\n' +
        'If necessary(필요하다면), If possible(가능하다면)은 **it is**가 생략된 관용 표현입니다. If (it is) necessary, I will call you again.\n\n' +
        '> ⚠️ 두 절의 주어가 다르면 생략하지 않습니다. While I was cooking, the phone rang.을 While cooking, the phone rang.으로 줄이면 "전화기가 요리를 하는 동안"이라는 엉뚱한 뜻이 됩니다.',
      easy: '접속사 뒤에 주어도 동사도 없이 young, waiting, asked 같은 말만 보이면, 그 사이에 **"주절 주인공 + be동사"가 숨어 있다**고 생각하십시오.\n\n' +
        '숨은 주인공은 쉼표 뒤 주절의 주어입니다. "While waiting for the bus, I read a book."에서 버스를 기다린 사람은 쉼표 뒤의 I이므로 While **I was** waiting으로 되살립니다.',
      check: {
        type: 'ox',
        q: '다음 문장에서 While 바로 뒤에는 she was가 생략되어 있습니다.\n\nWhile reading the book, she fell asleep.',
        answer: true,
        explain: '주절의 주어가 she이고 과거의 일이므로 While **she was** reading the book이 줄어든 것입니다. "책을 읽다가 그녀는 잠이 들었다."',
      },
    },
    {
      title: '삽입절과 삽입구: 문장 속의 괄호',
      body: '문장 중간에 말하는 사람의 생각이나 덧붙이는 말이 **끼어드는** 경우가 있습니다. 이것을 **삽입**이라고 하며, 대개 콤마(,)나 대시(—)로 둘러싸여 있습니다.\n\n' +
        '- 삽입절: **I think**, I believe, I suppose, it seems, I am sure\n' +
        '- 삽입구: **as far as I know**(내가 아는 한), to be honest(솔직히 말해), in fact(사실), if any(만약 있다 해도), if ever(설령 한다 해도)\n\n' +
        '읽을 때는 삽입된 부분을 **괄호로 묶어 잠시 빼고** 문장의 뼈대(주어 + 동사)를 먼저 찾습니다.\n\n' +
        '- The plan, **as far as I know**, has not been changed. → 뼈대: The plan has not been changed.\n' +
        '- He seldom, **if ever**, eats out. → 그는 외식을 (한다 해도) 좀처럼 하지 않는다.\n\n' +
        '**관계대명사 뒤의 삽입절**은 어법 문제에 자주 나옵니다.\n\n' +
        '- She is the student **who I think** will win the prize.\n\n' +
        'I think를 빼면 who will win the prize가 되므로 관계대명사는 **주격 who**입니다. I think 바로 앞이라고 해서 목적격 whom을 쓰지 않습니다.',
      easy: '삽입된 말은 수업 중에 선생님이 잠깐 덧붙이는 혼잣말과 같습니다. "이 계획은 — 내가 아는 한 — 바뀌지 않았어." 가운데 혼잣말을 빼도 하고 싶은 말은 그대로 남지요.\n\n' +
        '그래서 콤마 두 개 사이의 말을 손가락으로 가리고 읽어 보십시오. 남은 부분이 완전한 문장이면 가린 부분이 삽입입니다.',
      check: {
        type: 'choice',
        q: '다음 문장에서 **삽입된** 부분은 무엇입니까?\n\nThe museum, as far as I know, is closed on Mondays.',
        choices: ['as far as I know', 'The museum', 'is closed on Mondays'],
        answer: 0,
        why: ['', '이 부분은 문장의 주어입니다. 빼면 무엇이 닫혀 있는지 알 수 없습니다.', '이 부분은 문장의 동사와 보어입니다. 빼면 문장이 완성되지 않습니다.'],
        explain: '콤마 사이의 as far as I know(내가 아는 한)를 빼도 The museum is closed on Mondays.로 완전한 문장이 남습니다. 그러므로 이 부분이 삽입구입니다.',
      },
    },
    {
      title: '콤마로 덧붙인 동격 표현',
      body: '명사 바로 뒤에 콤마를 찍고 **그 명사를 다른 말로 다시 설명하는 명사(구)**를 덧붙이는 것을 **동격**이라고 합니다. 두 말은 **같은 대상**을 가리킵니다.\n\n' +
        '- **Mr. Park, the owner of the bakery,** gave us free bread. → 박 씨 = 빵집 주인\n' +
        '- I met **Jia, my best friend,** at the station. → 지아 = 가장 친한 친구\n\n' +
        '동격은 삽입처럼 빼도 문장이 성립하므로 **동사의 수는 앞의 핵심 명사에 맞춥니다.**\n\n' +
        '- My uncle, a doctor and a runner, **lives** in Daegu. (주어는 My uncle 한 사람 → lives)\n\n' +
        '설명문에서는 **or**가 동격을 이끌어 "즉, 다시 말해"라는 뜻으로 어려운 낱말을 풀이하기도 합니다. 처음 보는 낱말의 뜻을 짐작하는 좋은 단서입니다.\n\n' +
        '- Plants make food through **photosynthesis, or** the process of using sunlight to turn water and carbon dioxide into sugar.\n\n' +
        '> 💡 이때의 or는 "또는"이 아니라 "곧, 즉"입니다. 앞뒤가 서로 다른 두 가지가 아니라 같은 것입니다.',
      easy: '이름표 옆에 붙인 작은 설명 쪽지라고 생각하십시오. "민수, 우리 반 반장,"이라고 하면 민수와 반장은 두 사람이 아니라 한 사람이지요.\n\n' +
        '쪽지(동격)는 떼어 내도 문장이 그대로 남습니다. 그러니 동사가 단수인지 복수인지는 쪽지가 아니라 **이름표(앞 명사)**를 보고 정합니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nMs. Han, the leader of the two hiking clubs, [[빈칸]] the trail every week.',
        choices: ['checks', 'check', 'checking'],
        answer: 0,
        why: ['', 'clubs를 보고 복수로 맞췄습니다. 주어는 동격 앞의 Ms. Han 한 사람이므로 단수 동사를 씁니다.', '문장에 동사가 없게 됩니다. 주어 Ms. Han 뒤에는 동사가 와야 합니다.'],
        explain: 'the leader of the two hiking clubs는 Ms. Han을 다시 설명하는 동격입니다. 주어는 Ms. Han(단수)이므로 **checks**입니다. "두 등산 동아리의 대표인 한 선생님은 매주 산길을 점검한다."',
      },
    },
    {
      title: '부분 부정과 전체 부정',
      body: '**all, every, always, both, necessarily, completely**처럼 "전부·언제나"를 뜻하는 말에 not을 붙이면 "모두(항상) ~인 것은 아니다"라는 **부분 부정**이 됩니다. 일부는 그렇고 일부는 그렇지 않다는 뜻입니다.\n\n' +
        '| 부분 부정 | 뜻 |\n|---|---|\n' +
        '| **Not all** the students passed. | 모든 학생이 합격한 것은 아니다. (일부는 합격) |\n' +
        '| **Not every** bird can fly. | 모든 새가 날 수 있는 것은 아니다. |\n' +
        '| The rich are **not always** happy. | 부자가 항상 행복한 것은 아니다. |\n' +
        "| I **don't** know **both** of them. | 그 둘을 다 아는 것은 아니다. (한 명만 안다) |\n" +
        '| A long book is **not necessarily** good. | 긴 책이 반드시 좋은 것은 아니다. |\n\n' +
        '**none, no, never, neither, not ~ any**는 "하나도(한 번도) ~ 않다"라는 **전체 부정**입니다.\n\n' +
        '| 전체 부정 | 뜻 |\n|---|---|\n' +
        '| **None** of the students passed. | 어떤 학생도 합격하지 못했다. |\n' +
        '| **No** bird can fly. | 어떤 새도 날 수 없다. |\n' +
        "| I know **neither** of them. | 그 둘 중 아무도 모른다. |\n" +
        "| I **don't** have **any** money. | 돈이 하나도 없다. |\n\n" +
        '> ⚠️ Not all ~을 "모두 ~하지 않았다"로 옮기면 전체 부정으로 오해하기 쉽습니다. 반드시 "모두 ~인 것은 아니다"로 옮깁니다.',
      easy: '바구니에 사과 10개가 있습니다.\n\n' +
        '- Not all the apples are red. → 빨간 사과도 있고, 아닌 사과도 **섞여** 있습니다.\n' +
        '- None of the apples are red. → 빨간 사과는 **하나도** 없습니다.\n\n' +
        '"전부"를 뜻하는 말(all, every, always)에 not이 붙으면 "전부는 아니다(섞여 있다)", 처음부터 "하나도 없다"를 뜻하는 말(none, never)은 "하나도 아니다"라고 기억하십시오.',
      check: {
        type: 'choice',
        q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\nNot every student likes math.',
        choices: ['모든 학생이 수학을 좋아하는 것은 아니다.', '어떤 학생도 수학을 좋아하지 않는다.', '모든 학생이 수학을 좋아한다.'],
        answer: 0,
        why: ['', '이것은 전체 부정(No student likes math.)의 뜻입니다. not every는 "모두 ~인 것은 아니다"라는 부분 부정입니다.', 'not이 있으므로 긍정문의 뜻이 아닙니다. not every는 일부만 그렇다는 뜻입니다.'],
        explain: 'not + every는 **부분 부정**입니다. 수학을 좋아하는 학생도 있고 좋아하지 않는 학생도 있다는 뜻입니다.',
      },
    },
    {
      title: '이중 부정과 부정 관용 표현',
      body: '부정의 말이 두 번 나오면 **강한 긍정**이 됩니다. 이것을 **이중 부정**이라고 합니다.\n\n' +
        '- There is **no** one **who doesn\'t** love this song. → 이 노래를 사랑하지 않는 사람은 없다. (= 모두 사랑한다)\n' +
        '- It is **not unusual** to see deer here. → 여기서 사슴을 보는 것은 드문 일이 아니다. (= 꽤 흔하다)\n\n' +
        '자주 나오는 **부정 관용 표현**은 통째로 익혀 둡니다.\n\n' +
        '| 표현 | 뜻 | 예 |\n|---|---|---|\n' +
        '| never A without B(-ing) | A하면 반드시 B한다 | They **never** meet **without arguing**. (만나기만 하면 다툰다) |\n' +
        '| cannot ~ too … | 아무리 …해도 지나치지 않다 | You **cannot be too careful** with fire. |\n' +
        '| cannot help -ing | ~하지 않을 수 없다 | I **could not help laughing**. (웃지 않을 수 없었다) |\n' +
        '| no longer | 더 이상 ~ 않다 | He **no longer** lives here. |\n' +
        '| nothing but | 오직 ~뿐 (= only) | She ate **nothing but** fruit. |\n' +
        '| anything but | 결코 ~이 아닌 | The test was **anything but** easy. (결코 쉽지 않았다) |\n\n' +
        '> ⚠️ nothing but과 anything but은 모양이 비슷하지만 뜻이 거의 반대입니다. nothing but = 오직, anything but = 결코 아닌.',
      easy: '"안 먹은 적이 없다"는 결국 "늘 먹었다"는 뜻이지요. 부정 두 개가 만나면 서로 지워져 **강한 긍정**이 됩니다.\n\n' +
        'never A without B도 같은 원리입니다. "B 하지 않고서는 결코 A 하지 않는다" → "A 할 때마다 꼭 B 한다". cannot ~ too는 "너무 ~할 수가 없다", 곧 아무리 ~해도 넘치지 않는다는 뜻입니다.',
      check: {
        type: 'choice',
        q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\nYou cannot be too careful when you cross the road.',
        choices: ['길을 건널 때는 아무리 조심해도 지나치지 않다.', '길을 건널 때 너무 조심하면 오히려 더 위험해질 수 있다.', '길을 건널 때 조심할 수가 없다.'],
        answer: 0,
        why: ['', 'cannot ~ too를 "너무 ~하면 안 된다"로 옮겼습니다. 이 표현은 "아무리 ~해도 지나치지 않다"는 강조입니다.', 'cannot을 "할 수 없다"로만 읽었습니다. cannot ~ too는 통째로 익혀야 하는 관용 표현입니다.'],
        explain: 'cannot ~ too …는 "아무리 …해도 지나치지 않다"입니다. 그러니 길을 건널 때는 **최대한 조심하라**는 뜻입니다.',
      },
    },
  ],

  examples: [
    {
      q: '생략·삽입·동격을 찾아 문장의 뼈대를 세우고 해석하십시오.\n\nHanbit Park, the largest park in our city, is, as far as I know, free to visit, though not always open at night.',
      steps: [
        '콤마 사이의 the largest park in our city는 앞의 공원 이름을 다시 설명하는 **동격**입니다. 괄호로 묶습니다.',
        '콤마 사이의 as far as I know(내가 아는 한)는 **삽입구**입니다. 괄호로 묶습니다.',
        '남은 뼈대: Hanbit Park is free to visit. (한빛 공원은 무료로 방문할 수 있다.)',
        'though not always open at night에는 주절 주어를 가리키는 대명사와 be동사가 생략되어 있습니다: though **it is** not always open at night.',
        'not always는 **부분 부정**입니다. "밤에 항상 열려 있는 것은 아니다" — 밤에 닫을 때도 있다는 뜻입니다.',
      ],
      answer: '우리 도시에서 가장 큰 공원인 한빛 공원은, 내가 아는 한, 무료로 방문할 수 있지만 밤에 항상 열려 있는 것은 아니다.',
    },
    {
      q: '두 문장의 뜻을 비교하십시오.\n\n(1) Not all the answers are in the textbook.\n(2) None of the answers are in the textbook.',
      steps: [
        '(1)은 all에 not이 붙은 **부분 부정**입니다. 교과서에 있는 답도 있고 없는 답도 있습니다.',
        '(2)는 none을 쓴 **전체 부정**입니다. 교과서에는 답이 하나도 없습니다.',
        '그러므로 (1)이라면 교과서를 먼저 찾아볼 만하지만, (2)라면 교과서 밖에서 답을 찾아야 합니다.',
      ],
      answer: '(1) 답이 모두 교과서에 있는 것은 아니다. (2) 답은 하나도 교과서에 없다.',
    },
  ],

  terms: [
    { term: '생략', def: '앞에 이미 나온 말이나 쉽게 알 수 있는 말을 되풀이하지 않고 빼는 것입니다. 예: I can swim, but my brother can\'t (swim).' },
    { term: '대부정사', def: 'to부정사의 동사 부분이 앞에 나온 말과 같을 때 동사 이하를 지우고 남긴 to입니다. 예: I\'d love to (join you).' },
    { term: '삽입', def: '문장 중간에 덧붙인 절이나 구입니다. 콤마·대시로 둘러싸인 경우가 많고, 빼도 문장의 뼈대가 남습니다. 예: as far as I know, I think' },
    { term: '동격', def: '명사 바로 뒤에서 그 명사를 다른 말로 다시 설명하는 명사(구)입니다. 두 말은 같은 대상을 가리킵니다. 예: Jia, my best friend' },
    { term: '부분 부정', def: '"모두(항상) ~인 것은 아니다"라는 뜻으로, 일부만 부정하는 표현입니다. 예: not all, not every, not always, not necessarily' },
    { term: '전체 부정', def: '"하나도(한 번도) ~ 않다"라는 뜻으로, 전부를 부정하는 표현입니다. 예: none, no, never, neither' },
    { term: '이중 부정', def: '부정의 말이 두 번 나와 강한 긍정의 뜻이 되는 것입니다. 예: It is not unusual. (꽤 흔하다)' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nMinho wanted to join the drama club, but his parents didn\'t allow him [[빈칸]].',
      choices: ['to', 'it', 'that', 'so'],
      answer: 0,
      why: ['', 'allow는 "allow + 사람 + to부정사"로 씁니다. 앞에 나온 to join the drama club을 대신하려면 to만 남깁니다.', 'allow him that처럼은 쓰지 않습니다. to join the drama club에서 to만 남긴 대부정사가 알맞습니다.', 'allow him so처럼은 쓰지 않습니다. 앞의 to부정사를 대신하는 말은 to입니다.'],
      explain: 'allow him to join the drama club에서 앞에 나온 join the drama club을 지우고 **to**만 남긴 대부정사입니다. "민호는 연극부에 들어가고 싶었지만 부모님이 허락하지 않으셨다."',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '다음 문장에서 can 뒤에는 help you가 생략되어 있습니다.\n\nI\'ll help you if I can.',
      answer: true,
      explain: '앞에 나온 help you를 되풀이하지 않으려고 생략했습니다. if I can (help you) — "할 수 있으면 도와줄게."',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '밑줄 친 부분에 생략된 말을 바르게 되살린 것은 무엇입니까?\n\n__If necessary__, I will call you again tomorrow.',
      choices: ['If it is necessary', 'If I am necessary', 'If you are necessary', 'If necessary is'],
      answer: 0,
      why: ['', '"내가 필요하다면"이 아니라 "(그것이) 필요하다면"이라는 뜻입니다. If necessary는 it is가 생략된 관용 표현입니다.', '"네가 필요하다면"이 아니라 "(그것이) 필요하다면"이라는 뜻입니다.', 'necessary는 형용사라서 주어 자리에 올 수 없습니다. 생략된 것은 it is입니다.'],
      explain: 'If necessary는 If **it is** necessary(필요하다면)가 줄어든 관용 표현입니다. If possible(가능하다면)도 같습니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', concept: 1,
      q: '다음 문장의 Though 뒤에 생략된 두 낱말을 쓰십시오.\n\nThough tired, Seojun finished his homework.',
      answer: ['he was'],
      hint: '주절의 주어와 시제를 보십시오.',
      wrong: [
        { a: 'he is', why: '주절의 finished가 과거이므로 be동사도 과거 was를 씁니다.' },
        { a: 'it was', why: '피곤했던 것은 서준이입니다. 부사절의 주어는 주절의 주어 Seojun을 가리키는 he입니다.' },
        { a: 'seojun was', why: '이름을 되풀이하기보다 대명사로 씁니다. 생략된 것은 he was입니다.' },
      ],
      explain: '주절의 주어가 Seojun이고 과거의 일이므로 Though **he was** tired입니다. "서준이는 피곤했지만 숙제를 끝냈다."',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nHayun is the girl who [[빈칸]] will win the speech contest.',
      choices: ['I think', 'I think she', 'do I think', 'that I think'],
      answer: 0,
      why: ['', '관계대명사 who가 이미 will win의 주어입니다. she를 또 쓰면 주어가 둘이 됩니다.', '삽입절은 평서문 어순(I think)으로 씁니다. 의문문 어순이 아닙니다.', 'who 뒤에 that을 겹쳐 쓰지 않습니다. 삽입절은 I think만 씁니다.'],
      explain: 'I think를 괄호로 빼면 Hayun is the girl who will win the speech contest.가 됩니다. **I think**는 삽입절입니다. "하윤이는 내 생각에 웅변대회에서 우승할 아이다."',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '다음 문장의 내용으로 옳은 것은 무엇입니까?\n\nMr. Park, the owner of the bakery, gave us some free bread.',
      choices: ['박 씨가 바로 빵집 주인이다.', '빵집 주인이 박 씨에게 빵을 주었다.', '박 씨와 빵집 주인이 함께 빵을 주었다.', '박 씨는 빵집 주인에게서 빵을 샀다.'],
      answer: 0,
      why: ['', '빵을 받은 사람은 us(우리)입니다. 박 씨와 빵집 주인은 같은 사람입니다.', '콤마 사이의 말은 박 씨를 설명하는 동격입니다. 두 사람이 아니라 한 사람입니다.', '빵은 공짜(free)로 받았고, 박 씨가 바로 빵집 주인입니다.'],
      explain: 'the owner of the bakery는 앞의 Mr. Park 한 사람을 다시 설명하는 **동격**입니다. "빵집 주인인 박 씨가 우리에게 빵을 공짜로 주었다."',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\nNot all of my classmates like soccer.',
      choices: ['반 친구 중 아무도 축구를 좋아하지 않는다.', '반 친구들이 모두 축구를 좋아하는 것은 아니다.', '반 친구들은 모두 축구를 좋아한다.', '반 친구 중 한 명만 축구를 좋아한다.'],
      answer: 1,
      why: ['전체 부정(None of my classmates like soccer.)의 뜻입니다. not all은 부분 부정입니다.', '', 'not이 있으므로 긍정의 뜻이 아닙니다.', '몇 명이 좋아하는지는 알 수 없습니다. 모두가 좋아하는 것은 아니라는 것만 압니다.'],
      explain: 'not all은 **부분 부정**입니다. 축구를 좋아하는 친구도 있고, 그렇지 않은 친구도 있다는 뜻입니다.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 4,
      q: '다음 문장은 쿠키가 조금 남았다는 뜻입니다.\n\nNone of the cookies were left.',
      answer: false,
      explain: 'none은 **전체 부정**입니다. "쿠키는 하나도 남지 않았다."는 뜻입니다. 조금 남았다면 Only a few of the cookies were left. 처럼 씁니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 5,
      q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\nJiho never goes to the bookstore without buying a comic book.',
      choices: ['지호는 서점에 갈 때마다 만화책을 산다.', '지호는 서점에서 만화책을 사지 않는다.', '지호는 만화책을 사러 서점에 가지 않는다.', '지호는 서점에 가서 만화책을 사는 날도 있고 사지 않는 날도 있다.'],
      answer: 0,
      hint: 'never A without B는 부정이 두 번 들어간 표현입니다.',
      why: ['', 'never만 보고 부정으로 읽었습니다. never A without B는 "A하면 반드시 B한다"는 긍정의 뜻입니다.', 'without까지 함께 읽어야 합니다. 부정이 두 번이라 강한 긍정이 됩니다.', '이것은 부분 부정(not always)의 뜻입니다. never A without B는 "갈 때마다 꼭" 산다는 뜻이므로 사지 않는 날은 없습니다.'],
      explain: 'never A without B(-ing)는 "B하지 않고는 결코 A하지 않는다", 곧 **A할 때마다 반드시 B한다**입니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 4,
      q: '우리말과 뜻이 같도록 빈칸에 알맞은 한 낱말을 쓰십시오.\n\n모든 학생이 그 답을 아는 것은 아니다.\n→ [[빈칸]] every student knows the answer.',
      answer: ['Not'],
      hint: '"모두 ~인 것은 아니다"는 부분 부정입니다.',
      wrong: [
        { a: 'No', why: 'No every처럼은 쓰지 않습니다. 부분 부정은 not + every입니다.' },
        { a: 'Never', why: 'never는 "결코 ~ 않다"라는 전체 부정의 느낌입니다. 부분 부정은 Not every입니다.' },
      ],
      explain: '부분 부정 **Not every** student knows the answer. — 답을 아는 학생도 있고 모르는 학생도 있습니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 2,
      q: '"내가 아는 한, 그 도서관은 일요일에 문을 닫는다."라는 뜻이 되도록 As far as I know로 시작하여 순서대로 놓으십시오.',
      choices: ['As far as I know,', 'the library', 'is closed', 'on Sundays.'],
      answer: [0, 1, 2, 3],
      hint: '삽입구 뒤에 주어, 동사, 때를 나타내는 말 순서로 씁니다.',
      explain: 'As far as I know, the library is closed on Sundays. — 삽입구 as far as I know는 문장 앞·가운데·끝에 모두 올 수 있지만, 이 문제에서는 맨 앞에 둡니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 1,
      q: '어법상 **틀린** 문장은 무엇입니까?',
      choices: ['While waiting for the bus, I read a novel.', 'When asked about the plan, she smiled.', 'If possible, please send it by Friday.', 'While cooking dinner, the phone rang.'],
      answer: 3,
      hint: '접속사 뒤에 생략된 주어가 쉼표 뒤 주절의 주어와 같은지 보십시오.',
      why: ['While (I was) waiting — 버스를 기다린 사람이 주절 주어 I와 같으므로 바릅니다.', 'When (she was) asked — 질문을 받은 사람이 주절 주어 she와 같으므로 바릅니다.', 'If possible은 If (it is) possible의 관용 표현이므로 바릅니다.', ''],
      explain: '저녁을 요리한 것은 전화기가 아닙니다. 두 절의 주어가 다르므로 생략할 수 없고, **While I was cooking dinner, the phone rang.**처럼 써야 합니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 2,
      q: '어법상 바른 문장은 무엇입니까?',
      choices: [
        'This is the singer whom I think sings best in our school.',
        'This is the singer who I think she sings best in our school.',
        'This is the singer who I think sings best in our school.',
        'This is the singer which I think sings best in our school.',
      ],
      answer: 2,
      hint: 'I think를 괄호로 묶어 빼고, 관계대명사가 관계사절 안에서 어떤 역할을 하는지 보십시오.',
      why: [
        'I think를 빼면 whom sings best가 됩니다. 관계대명사가 sings의 주어이므로 목적격 whom이 아니라 주격 who를 씁니다.',
        '관계대명사 who가 이미 sings의 주어입니다. she를 또 쓰면 주어가 둘이 됩니다.',
        '',
        '선행사 the singer는 사람이므로 which가 아니라 who를 씁니다.',
      ],
      explain: 'I think는 삽입절입니다. 빼고 나면 the singer **who** sings best in our school이 되므로 주격 who가 알맞습니다. "이 사람이 내 생각에 우리 학교에서 노래를 가장 잘하는 가수다."',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 5,
      q: '뜻이 나머지 셋과 **다른** 문장은 무엇입니까?',
      choices: [
        'Whenever I hear this song, I think of my grandmother.',
        'I never hear this song without thinking of my grandmother.',
        'I hear this song, but I never think of my grandmother.',
        'Every time I hear this song, I think of my grandmother.',
      ],
      answer: 2,
      hint: 'never A without B를 "A할 때마다 반드시 B한다"로 바꿔 읽어 보십시오.',
      why: [
        'whenever는 "~할 때마다"입니다. 노래를 들을 때마다 할머니를 떠올린다는 뜻으로 나머지와 같습니다.',
        'never A without B는 "A할 때마다 반드시 B한다"는 이중 부정입니다. 나머지와 뜻이 같습니다.',
        '',
        'every time은 "~할 때마다"입니다. 나머지와 뜻이 같습니다.',
      ],
      explain: '세 문장은 모두 "이 노래를 들을 때마다 할머니가 생각난다"는 뜻입니다. 남은 문장만 "이 노래를 들어도 할머니는 전혀 생각나지 않는다"는 뜻입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '다음 글의 내용과 일치하는 것은 무엇입니까?\n\n' + LIB,
      choices: [
        '큰 도서관은 학생들에게 전혀 쓸모가 없다.',
        '큰 도서관이 모두 학생들에게 쓸모 있는 것은 아니다.',
        '이 학교 도서관은 2층의 넓은 방에 있다.',
        '사서는 새 책을 고르는 데 별로 신경 쓰지 않는다.',
      ],
      answer: 1,
      hint: 'not all large libraries를 부분 부정으로 정확히 옮겨 보십시오. 콤마로 덧붙인 동격도 놓치지 마십시오.',
      why: [
        'not all은 부분 부정입니다. "모두 쓸모 있는 것은 아니다"이지 "전혀 쓸모없다"가 아닙니다.',
        '',
        '동격 a small room on the second floor에서 도서관은 2층의 작은 방이라고 했습니다.',
        '사서인 윤 선생님은 새 책을 하나하나 신중하게(carefully) 고른다고 했습니다.',
      ],
      explain: 'However, not all large libraries are useful to students.는 **부분 부정**으로 "큰 도서관이 모두 학생에게 쓸모 있는 것은 아니다"라는 뜻입니다. 학교 도서관은 a small room on the second floor(동격)라고 했고, 사서는 chooses every new book carefully라고 했습니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '다음 글의 마지막 문장에서 students rarely leave without finding what they need의 뜻으로 알맞은 것은 무엇입니까?\n\n' + LIB,
      choices: [
        '학생들은 필요한 것을 찾지 못하고 나가는 일이 거의 없다.',
        '학생들은 필요한 것을 거의 찾지 못한 채 나간다.',
        '학생들은 도서관을 거의 떠나지 않는다.',
        '학생들은 필요한 것을 찾으면 바로 떠난다.',
      ],
      answer: 0,
      hint: 'rarely(거의 ~ 않다)와 without(~ 없이)이 함께 나온 이중 부정입니다.',
      why: [
        '',
        'rarely와 without 두 부정이 함께 있어 긍정의 뜻이 됩니다. 필요한 것을 거의 언제나 찾는다는 뜻입니다.',
        'rarely가 꾸미는 것은 leave without finding 전체입니다. 도서관을 떠나지 않는다는 뜻이 아닙니다.',
        '찾자마자 떠난다는 내용은 글에 없습니다. 거의 언제나 필요한 것을 찾는다는 뜻입니다.',
      ],
      explain: 'rarely A without B는 never A without B처럼 이중 부정입니다. "필요한 것을 찾지 못하고 나가는 일은 드물다", 곧 **학생들이 거의 언제나 필요한 것을 찾는다**는 뜻입니다. 작은 도서관이지만 쓸모 있다는 글의 요지와도 이어집니다.',
    },
    {
      id: 'a5', level: 3, type: 'short', concept: 0,
      q: '다음 문장에서 others 뒤에 생략된 두 낱말을 쓰십시오.\n\nSome of the students went home by bus, and others on foot.',
      answer: ['went home'],
      hint: '앞 절에서 되풀이되는 부분을 찾습니다. by bus와 on foot이 서로 짝을 이룹니다.',
      wrong: [
        { a: 'went', why: 'others went on foot만으로는 어디로 갔는지가 빠집니다. 생략된 것은 went home 두 낱말입니다.' },
        { a: 'go home', why: '앞 절의 동사가 과거 went이므로 생략된 말도 과거입니다.' },
        { a: 'students went', why: 'others가 이미 "다른 학생들"이라는 주어입니다. 생략된 것은 동사와 장소 went home입니다.' },
      ],
      explain: '앞 절 Some of the students **went home** by bus와 짝을 이루도록 others (**went home**) on foot에서 되풀이되는 말을 생략했습니다. "학생 중 일부는 버스로, 나머지는 걸어서 집에 갔다."',
    },
  ],

  deeper: [
    {
      title: '생략과 부정은 독해 문제에서 어떻게 쓰일까',
      body: '긴 글에서는 같은 말을 되풀이하지 않으려고 생략과 대명사를 많이 씁니다. 그래서 문장이 짧아 보여도 **빠진 말을 되살려 읽지 못하면** 엉뚱하게 해석하기 쉽습니다.\n\n' +
        '부분 부정은 특히 **내용 일치·요지 문제의 함정**으로 자주 쓰입니다. 본문에 not all, not always가 있는데 선택지가 "전혀 ~ 아니다", "결코 ~ 않는다"처럼 극단적으로 바뀌어 있으면 거의 틀린 선택지입니다. 글쓴이는 대개 "언제나 그런 것은 아니다"라고 조심스럽게 말하는데, 선택지가 그것을 "절대 아니다"로 부풀리기 때문입니다.\n\n' +
        '삽입과 동격은 글쓴이가 **덧붙이는 설명**입니다. as far as I know(내가 아는 한), to be honest(솔직히)처럼 글쓴이의 태도를 드러내기도 하고, or로 이어진 동격처럼 어려운 낱말을 풀이해 주기도 합니다. 다음 단원(요약문 완성하기)에서 본문의 표현이 다른 말로 바뀐 것을 찾을 때 이 풀이가 좋은 단서가 됩니다.',
    },
  ],

  faq: [
    {
      q: '부사절에서 주어랑 be동사를 아무 때나 빼도 돼요?',
      a: '아닙니다. 두 가지가 맞아야 합니다. 첫째, 부사절의 주어가 **주절의 주어와 같아야** 합니다. 둘째, 빠지는 동사가 **be동사**여야 합니다.\n\n그래서 While I was cooking, the phone rang.은 주어가 달라서 줄일 수 없습니다. 다만 If necessary, If possible처럼 it is가 빠진 관용 표현은 따로 익혀 둡니다.',
    },
    {
      q: '"모두 ~인 것은 아니다"와 "하나도 ~ 않다"는 영어로 어떻게 구별해요?',
      a: '"전부"를 뜻하는 말(all, every, always, both, necessarily)에 not이 붙으면 **부분 부정**, 곧 "모두 ~인 것은 아니다"입니다.\n\n처음부터 "하나도 없다"를 뜻하는 말(none, no, never, neither)을 쓰거나 not ~ any를 쓰면 **전체 부정**, 곧 "하나도 ~ 않다"입니다.',
    },
    {
      q: '관계대명사 뒤에 I think가 끼어들면 주격과 목적격 중 무엇을 써요?',
      a: 'I think, I believe 같은 삽입절을 괄호로 빼고 판단합니다. 빼고 나서 관계대명사 바로 뒤에 동사가 오면 **주격**(who)입니다.\n\n예: the boy who (I believe) is honest → who is honest이므로 주격 who. 바로 앞의 I think를 보고 목적격 whom으로 고르는 실수가 많습니다.',
    },
    {
      q: 'nothing but, anything but — 비슷하게 생겼는데 뜻이 왜 반대예요?',
      a: 'but은 여기서 "~ 말고는(except)"라는 뜻입니다. nothing but fruit은 "과일 말고는 아무것도 아닌" → **오직 과일**. anything but easy는 "쉬운 것 말고는 무엇이든" → **결코 쉽지 않은**.\n\n이렇게 but을 "~ 말고는"으로 바꿔 읽으면 두 표현을 헷갈리지 않습니다.',
    },
  ],

  mistakes: [
    'not all, not always를 "모두 ~하지 않는다"로 옮겨 전체 부정으로 읽는 실수 — "모두(항상) ~인 것은 아니다"로 옮깁니다. 일부는 그렇다는 뜻이 남아 있습니다.',
    '주어가 다른데 부사절을 줄이는 실수 — While cooking dinner, the phone rang. (×) → While I was cooking dinner, the phone rang. (○)',
    '관계대명사 뒤 삽입절 때문에 whom을 고르는 실수 — the man whom I think is honest (×) → the man who I think is honest (○)',
  ],

  gens: [
    {
      id: 'partial-whole-negation',
      level: 1,
      title: '부분 부정과 전체 부정 해석하기',
      make: function (R) {
        var it = R.pick(NEG_ITEMS);
        var partial = R.bool();
        var sentence = partial ? it.partial : it.whole;
        var correct = partial ? it.kr[0] : it.kr[1];
        var reason = {};
        reason[it.kr[0]] = '이것은 부분 부정의 뜻입니다. none·no·never는 "하나도(한 번도) ~ 않다"라는 전체 부정입니다.';
        reason[it.kr[1]] = '이것은 전체 부정의 뜻입니다. not all·not every·not always·not necessarily는 "모두(항상) ~인 것은 아니다"라는 부분 부정입니다.';
        reason[it.kr[2]] = '문장에 부정의 말이 있으므로 긍정의 뜻이 될 수 없습니다.';
        reason[it.kr[3]] = '"딱 하나"나 특별한 조건은 문장에 나오지 않습니다. 부정이 미치는 범위만 따져 보십시오.';
        var wrongs = [partial ? it.kr[1] : it.kr[0], it.kr[2], it.kr[3]];
        var pick = R.choices(correct, wrongs);
        return {
          type: 'choice', concept: 4,
          q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\n' + sentence,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: partial
            ? '"전부·항상"을 뜻하는 말에 not이 붙은 **부분 부정**입니다. 그렇지 않은 경우도 섞여 있다는 뜻입니다. → ' + correct
            : '"하나도(한 번도) ~ 않다"를 뜻하는 **전체 부정**입니다. 예외가 없다는 뜻입니다. → ' + correct,
        };
      },
    },
    {
      id: 'restore-subject-be',
      level: 2,
      title: '부사절에서 생략된 "주어 + be동사" 되살리기',
      make: function (R) {
        var it = R.pick(ELL_ITEMS);
        var conj = it[0], rest = it[1], subj = it[2], main = it[3], past = it[4], kr = it[5];
        var p = PRON[subj];
        var correct = p[0] + ' ' + (past ? p[2] : p[1]);
        var tenseWrong = p[0] + ' ' + (past ? p[1] : p[2]);
        var OTHER = { she: ['he', 'is', 'was'], he: ['she', 'is', 'was'], we: ['they', 'are', 'were'], they: ['we', 'are', 'were'], I: ['you', 'are', 'were'] };
        var o = OTHER[p[0]];
        var personWrong = o[0] + ' ' + (past ? o[2] : o[1]);
        var itWrong = 'it ' + (past ? 'was' : 'is');
        var reason = {};
        reason[tenseWrong] = past
          ? '주절이 과거의 일이므로 생략된 be동사도 과거형으로 되살립니다.'
          : '주절이 과거의 일이 아니므로(현재·미래) 생략된 be동사는 현재형으로 되살립니다.';
        reason[personWrong] = '생략된 주어는 쉼표 뒤 주절의 주어와 같은 대상입니다. 주절의 주어: ' + subj;
        reason[itWrong] = '부사절의 주어를 it으로 되살리면 주절의 주어와 달라집니다. 생략된 주어는 주절의 주어와 같은 대상입니다.';
        var pick = R.choices(correct, [tenseWrong, personWrong, itWrong]);
        return {
          type: 'choice', concept: 1,
          q: '다음 문장에서 ' + conj + ' 바로 뒤에 생략된 두 낱말로 알맞은 것은 무엇입니까?\n\n' + conj + ' ' + rest + ', ' + subj + ' ' + main,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '생략된 주어는 주절의 주어와 같은 대상이고(' + subj + ' → ' + p[0] + '), be동사는 주절의 때에 맞춰 ' + (past ? '과거형' : '현재형') + '입니다. → ' + conj + ' **' + correct + '** ' + rest + '. "' + kr + '"',
        };
      },
    },
  ],

  vocab: [
    { w: 'necessary', m: '필요한', ex: 'If necessary, I will bring an extra umbrella.', exm: '필요하다면 우산을 하나 더 가져갈게.' },
    { w: 'possible', m: '가능한', ex: 'Please reply as soon as possible.', exm: '가능한 한 빨리 답장해 주세요.' },
    { w: 'allow', m: '허락하다', ex: 'My parents allow me to stay up late on Fridays.', exm: '부모님은 금요일에는 내가 늦게까지 깨어 있도록 허락하신다.' },
    { w: 'argue', m: '말다툼하다, 주장하다', ex: 'The twins never meet without arguing.', exm: '그 쌍둥이는 만나기만 하면 말다툼을 한다.' },
    { w: 'careful', m: '조심하는, 신중한', ex: 'You cannot be too careful in the kitchen.', exm: '부엌에서는 아무리 조심해도 지나치지 않다.' },
    { w: 'owner', m: '주인, 소유자', ex: 'The owner of the shop is very kind.', exm: '그 가게 주인은 무척 친절하다.' },
    { w: 'librarian', m: '(도서관의) 사서', ex: 'The librarian helped me find a book about stars.', exm: '사서 선생님이 별에 관한 책을 찾도록 도와주셨다.' },
    { w: 'up to date', m: '최신의', ex: 'This map is not up to date.', exm: '이 지도는 최신이 아니다.' },
    { w: 'necessarily', m: '반드시, 꼭', ex: 'An expensive phone is not necessarily a good phone.', exm: '비싼 휴대 전화가 반드시 좋은 휴대 전화인 것은 아니다.' },
    { w: 'completely', m: '완전히', ex: 'I do not completely agree with you.', exm: '나는 네 말에 완전히 동의하는 것은 아니다.' },
    { w: 'unusual', m: '흔치 않은, 특이한', ex: 'It is not unusual to see cats on this street.', exm: '이 거리에서 고양이를 보는 것은 드문 일이 아니다.' },
    { w: 'contest', m: '대회, 경연', ex: 'Hayun won first prize in the speech contest.', exm: '하윤이는 웅변대회에서 1등을 했다.' },
    { w: 'trail', m: '산길, 오솔길', ex: 'We walked along a narrow trail in the forest.', exm: '우리는 숲속의 좁은 오솔길을 따라 걸었다.' },
    { w: 'process', m: '과정', ex: 'Learning a language is a slow process.', exm: '언어를 배우는 것은 느린 과정이다.' },
    { w: 'whenever', m: '~할 때마다', ex: 'Whenever it rains, my dog hides under the bed.', exm: '비가 올 때마다 우리 개는 침대 밑에 숨는다.' },
  ],
});
})();

