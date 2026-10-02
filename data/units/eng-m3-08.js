/* 중3 영어 · 글의 흐름 잇기 (상관접속사·접속부사) */
Tutor.registerUnit({
  id: 'eng-m3-08',
  course: 'eng-m3',
  title: '글의 흐름 잇기 (상관접속사·접속부사)',
  summary: '상관접속사와 however, therefore 같은 연결어를 익혀 문장을 논리적으로 잇고 글의 요지를 파악해요.',
  goals: [
    'both A and B, either A or B, neither A nor B로 두 가지를 묶어 말하고 동사의 수를 맞출 수 있어요.',
    'not only A but (also) B를 쓰고, 동사를 B에 맞출 수 있어요.',
    'however, therefore, on the other hand와 since, while로 문장 사이의 관계를 나타낼 수 있어요.',
    '연결어를 단서로 글의 흐름과 요지를 찾을 수 있어요.',
  ],
  standards: ['[9영01-03]', '[9영01-04]', '[9영02-10]'],

  concepts: [
    {
      title: '짝을 이루는 접속사: both, either, neither',
      body: '두 낱말이 **짝을 이루어** 두 가지를 묶는 접속사를 **상관접속사**라고 해요.\n\n| 형태 | 뜻 | 예 |\n|---|---|---|\n| **both** A **and** B | A와 B 둘 다 | **Both** Minsu **and** Jia are tall. |\n| **either** A **or** B | A나 B 둘 중 하나 | You can have **either** milk **or** juice. |\n| **neither** A **nor** B | A도 B도 아닌 | **Neither** Minsu **nor** Jia is late. |\n\n짝은 정해져 있어요. both는 and와, either는 or와, neither는 nor와만 짝을 이뤄요.\n\n**주어로 쓸 때 동사의 수**\n- both A and B는 "둘 다"이므로 언제나 **복수** 동사: Both my sister and I **are** busy.\n- either A or B, neither A nor B는 동사를 **B(가까운 쪽)**에 맞춰요: Either you or Seojun **is** going to help.\n\n> ⚠️ neither에는 이미 "아니다"라는 뜻이 들어 있어요. Neither Jia nor I **don\'t** like it.(✗) → Neither Jia nor I **like** it.(○)',
      easy: '상관접속사는 **짝꿍 낱말**이에요. 짝꿍이 정해져 있어서 바꿔 끼우면 안 돼요.\n\n- both ↔ and: "둘 다 O" → 사람이 둘이니 are\n- either ↔ or: "둘 중 하나 O"\n- neither ↔ nor: "둘 다 X"\n\neither와 neither는 **동사 바로 앞의 사람(B)**만 보면 돼요. Either you or **he** → **is**, Neither Jia nor **her friends** → **are**.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nNeither Hayun [[빈칸]] Doyun was at home.',
        choices: ['nor', 'or', 'and'],
        answer: 0,
        why: [
          '',
          'or는 either와 짝을 이뤄요. neither의 짝은 nor예요.',
          'and는 both와 짝을 이뤄요. neither의 짝은 nor예요.',
        ],
        explain: 'neither는 **nor**와 짝을 이뤄 "A도 B도 아닌"이라는 뜻이 돼요. "하윤이도 도윤이도 집에 없었어요."',
      },
    },
    {
      title: 'not only A but (also) B',
      body: '**not only A but (also) B**는 "A뿐만 아니라 B도"라는 뜻이에요. 말하는 사람이 더 강조하고 싶은 것은 **B**예요.\n\n- Jia is **not only** smart **but also** kind. (지아는 똑똑할 뿐만 아니라 친절하기도 해요.)\n- He can **not only** sing **but** dance. (also는 생략할 수 있어요.)\n\n같은 뜻을 **B as well as A**로도 쓸 수 있어요. 순서가 바뀌는 것에 주의해요.\n- not only the students but also **the teacher** = **the teacher** as well as the students\n\n**동사의 수는 B에 맞춰요.**\n- Not only my parents but also **my sister** **likes** jazz.\n- **My sister** as well as my parents **likes** jazz.\n\n> 💡 A와 B는 같은 꼴(형용사-형용사, 동사-동사, 명사-명사)로 맞춰 써요. 이것을 **병렬**이라고 해요. 앞의 both·either·neither도 마찬가지예요.',
      easy: 'not only A but also B는 **"A는 당연하고, 무려 B까지!"**라는 느낌이에요. 중심은 B예요.\n\n그래서 동사도 주인공인 B를 따라가요.\n- Not only the boys but also **Sua** **was** there. (주인공 Sua → was)\n\nB as well as A는 주인공 B를 **맨 앞**에 세운 말이에요. 동사는 여전히 B를 따라가요: **Sua** as well as the boys **was** there.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nNot only my brothers but also my sister [[빈칸]] baseball.',
        choices: ['likes', 'like', 'liking'],
        answer: 0,
        why: [
          '',
          'A(my brothers)에 동사를 맞췄어요. not only A but also B는 B(my sister)에 맞춰요.',
          '문장에 동사가 없어져요. 주어 뒤에는 동사가 와야 해요.',
        ],
        explain: 'not only A but also B는 동사를 **B**에 맞춰요. B인 my sister는 3인칭 단수이므로 **likes**예요.',
      },
    },
    {
      title: '접속부사: however, therefore, on the other hand',
      body: '**접속부사**는 앞 문장과 뒤 문장이 **어떤 관계인지** 알려 주는 연결어예요. 보통 뒤 문장의 맨 앞에 쓰고 쉼표를 찍어요.\n\n| 연결어 | 관계 | 예 |\n|---|---|---|\n| **however** | 반대·예상과 다름 (그러나) | It was cold. **However**, we went swimming. |\n| **therefore** | 결과·결론 (그러므로) | It was cold. **Therefore**, we stayed inside. |\n| **on the other hand** | 두 쪽을 견줌 (반면에) | Buses are cheap. **On the other hand**, taxis are fast. |\n| for example | 예 들기 (예를 들면) | I like fruit. **For example**, I eat apples every day. |\n| in addition | 덧붙이기 (게다가) | The park is big. **In addition**, it is very clean. |\n\n**however와 on the other hand의 차이**: however는 "앞 내용과 달리, 예상 밖으로"에 쓰고, on the other hand는 **두 가지(두 사람·두 물건·좋은 점과 나쁜 점)를 나란히 놓고 견줄 때** 써요.\n\n> ⚠️ 접속부사는 접속사가 아니라서 쉼표만으로 두 문장을 이을 수 없어요. It was cold, however we went out.(✗) → It was cold. However, we went out.(○)\n\n> 💡 접속부사는 문장 가운데에 쉼표로 끼워 넣기도 해요. Dogs love to play. Cats, **on the other hand**, like to rest.',
      easy: '접속부사는 **글의 신호등**이에요. 다음에 무슨 내용이 올지 미리 알려 줘요.\n\n- **however** → "어? 방향이 바뀐다!" (앞과 반대)\n- **therefore** → "그래서 결과는…" (앞이 원인)\n- **on the other hand** → "다른 쪽을 보면…" (두 가지를 저울에 올림)\n\n앞 문장을 읽고, 뒤 문장이 **반대인지, 결과인지, 다른 쪽인지**만 따져 보면 알맞은 신호등을 고를 수 있어요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nMinsu didn\'t sleep last night. [[빈칸]], he was very tired in class.',
        choices: ['Therefore', 'However', 'For example'],
        answer: 0,
        why: [
          '',
          'however는 앞과 반대되는 내용이 올 때 써요. 잠을 못 자서 피곤한 것은 반대가 아니라 자연스러운 결과예요.',
          'for example은 앞 말의 예를 들 때 써요. 피곤했다는 것은 잠을 못 잔 것의 예가 아니에요.',
        ],
        explain: '앞 문장(잠을 못 잤다)이 원인이고 뒤 문장(수업 시간에 피곤했다)이 결과이므로 **Therefore**(그러므로)를 써요.',
      },
    },
    {
      title: '이유의 since, 대조의 while',
      body: '접속사 **since**와 **while**은 뜻이 두 가지라서 문장을 보고 알맞은 뜻을 골라야 해요.\n\n**since**\n- **~ 때문에(이유)**: **Since** it was raining, we stayed home. (비가 오고 있었기 때문에 우리는 집에 있었어요.)\n- ~ 이후로(때): I have lived here **since** I was five. (완료 시제와 함께 자주 써요.)\n\n**while**\n- **~인 반면에(대조)**: **While** Jia likes summer, her brother likes winter. (지아는 여름을 좋아하는 반면에 오빠는 겨울을 좋아해요.)\n- ~하는 동안(때): I listened to music **while** I was cooking.\n\n뜻을 고르는 요령은 이래요.\n- since 뒤에 앞 문장의 **까닭**이 오면 "때문에", 완료 시제와 **시작 시점**이 오면 "이후로".\n- while로 이은 두 내용이 **서로 반대(대조)**이면 "반면에", 두 일이 **같은 시간**에 일어나면 "동안".\n\n> 💡 since·while은 접속사라서 쉼표만으로 두 절을 이을 수 있어요. 접속부사 however와 다른 점이에요.',
      easy: 'since와 while은 **얼굴이 두 개**인 낱말이에요.\n\n- since: "**왜냐면**"의 얼굴 / "**그때부터**"의 얼굴\n- while: "**그런데 다른 쪽은**"의 얼굴 / "**그러는 동안**"의 얼굴\n\nWhile **I** like cats, **my brother** likes dogs. — 두 사람이 서로 반대예요. 그러니 "반면에"의 얼굴이에요.',
      check: {
        type: 'choice',
        q: '밑줄 친 while의 뜻으로 알맞은 것을 고르세요.\n\n__While__ Seojun is very quiet, his twin sister is very talkative.',
        choices: ['~인 반면에', '~하는 동안', '~ 때문에'],
        answer: 0,
        why: [
          '',
          '두 사람이 같은 시간에 하는 일을 말하는 것이 아니에요. 조용한 성격과 말이 많은 성격을 견주고 있어요.',
          '"~ 때문에"는 since의 뜻이에요. 서준이가 조용해서 누나가 말이 많은 것이 아니에요.',
        ],
        explain: '조용한 서준이와 말이 많은 쌍둥이 누나를 서로 **대조**하고 있으므로 while은 **"~인 반면에"**예요.',
      },
    },
    {
      title: '연결어로 글의 흐름과 요지 찾기',
      body: '연결어는 글을 읽을 때 **길잡이**가 돼요. 특히 글의 **요지(글쓴이가 가장 하고 싶은 말)**는 연결어 뒤에 나오는 경우가 많아요.\n\n- **However** 뒤: 흔한 생각을 먼저 말하고, However 뒤에서 **글쓴이의 진짜 생각**을 말하는 글이 많아요.\n- **Therefore** 뒤: 앞의 근거를 모아 **결론**을 내려요. 요지일 때가 많아요.\n- **On the other hand** 앞뒤: 두 가지를 견주는 글이에요. 한쪽만 고른 문장은 요지가 되기 어려워요.\n\n예)\nMany people think breakfast is not important. **However**, breakfast gives your brain energy for the morning. Students who eat breakfast can focus better in class. **Therefore**, you should not skip breakfast.\n\n→ 첫 문장은 "많은 사람의 생각", However 뒤부터가 글쓴이의 생각, Therefore 뒤가 결론이에요. 요지는 **"아침을 거르지 말아야 한다"**예요.',
      easy: '글을 읽다가 **However**가 보이면 "여기서부터 진짜 하고 싶은 말이 나오겠구나!", **Therefore**가 보이면 "이제 정리하는구나!" 하고 생각하세요.\n\n연결어에 동그라미를 치고, 그 뒤 문장을 한 번 더 읽으면 요지가 잘 보여요.',
      check: {
        type: 'ox',
        q: '"Many people think A. However, B."로 시작하는 글에서는 보통 A가 아니라 B가 글쓴이의 생각에 가까워요.',
        answer: true,
        explain: '흔한 생각(A)을 먼저 말한 뒤 **However**로 방향을 바꾸어 글쓴이의 생각(B)을 내세우는 글이 많아요. 그래서 However 뒤를 주의 깊게 읽어요.',
      },
    },
  ],

  examples: [
    {
      q: '두 문장을 neither A nor B를 써서 한 문장으로 바꿔 보세요.\n\nMinsu doesn\'t like carrots. His brother doesn\'t like carrots, either.',
      steps: [
        '"민수도 형도 당근을 좋아하지 않는다"이므로 **neither Minsu nor his brother**로 주어를 묶어요.',
        'neither에 이미 "아니다"가 들어 있으니 doesn\'t를 빼요.',
        '동사는 B인 his brother(3인칭 단수)에 맞춰 **likes**로 써요.',
      ],
      answer: 'Neither Minsu nor his brother likes carrots.',
    },
    {
      q: '빈칸 (A), (B)에 알맞은 연결어를 골라 글을 완성해 보세요.\n\nOur town has a small library. (A) [[빈칸]], it has many interesting books. (B) [[빈칸]], a lot of students visit it after school.\n\n보기: However / Therefore',
      steps: [
        '(A) 앞은 "작은 도서관", 뒤는 "재미있는 책이 많다" — 작다는 말에서 예상하는 것과 달라요. 그래서 **However**.',
        '(B) 앞은 "책이 많다"(원인), 뒤는 "많은 학생이 찾아온다"(결과) — 그래서 **Therefore**.',
        '두 연결어를 따라가면 요지는 "작지만 좋은 도서관이라 학생들이 많이 찾는다"예요.',
      ],
      answer: '(A) However (B) Therefore',
    },
  ],

  terms: [
    { term: '상관접속사', def: '두 낱말이 짝을 이루어 쓰이는 접속사예요. 예: both A and B, either A or B, neither A nor B, not only A but also B' },
    { term: '접속부사', def: '앞 문장과 뒤 문장의 관계를 알려 주는 부사예요. 접속사가 아니라서 마침표로 끊고 새 문장 앞에 써요. 예: however, therefore, on the other hand' },
    { term: '수 일치', def: '주어가 단수인지 복수인지에 맞추어 동사의 꼴을 고르는 것이에요. 예: Either you or he **is** … / Both you and he **are** …' },
    { term: '병렬', def: '접속사로 이은 A와 B를 같은 꼴(명사-명사, 형용사-형용사, 동사-동사)로 맞추어 쓰는 것이에요. 예: not only **smart** but also **kind**' },
    { term: '대조', def: '두 가지를 나란히 놓고 서로 다른 점을 드러내는 것이에요. while(~인 반면에), on the other hand(반면에)로 나타내요.' },
    { term: '요지', def: '글쓴이가 글에서 가장 하고 싶은 말이에요. However나 Therefore 뒤에 나오는 경우가 많아요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nBoth Seojun [[빈칸]] Doyun are on the soccer team.',
      choices: ['and', 'or', 'nor', 'but'],
      answer: 0,
      why: [
        '',
        'or는 either와 짝을 이뤄요. both의 짝은 and예요.',
        'nor는 neither와 짝을 이뤄요. both의 짝은 and예요.',
        'but은 not only와 짝을 이뤄요. both의 짝은 and예요.',
      ],
      explain: 'both는 **and**와 짝을 이뤄 "A와 B 둘 다"라는 뜻이 돼요. 둘이므로 동사도 복수 are예요. "서준이와 도윤이는 둘 다 축구팀이에요."',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: '빈칸에 알맞은 한 낱말을 쓰세요.\n\nNeither Jia [[빈칸]] Sua was late for school.\n(지아도 수아도 학교에 늦지 않았어요.)',
      answer: ['nor'],
      wrong: [
        { a: 'or', why: 'or는 either와 짝이에요. neither와 짝을 이루는 말은 nor예요.' },
        { a: 'and', why: 'and는 both와 짝이에요. "A도 B도 아닌"은 neither A nor B예요.' },
      ],
      explain: '"A도 B도 아닌"은 **neither A nor B**예요. 빈칸에는 **nor**를 써요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 말을 고르세요.\n\nNot only Minsu but also his sisters [[빈칸]] swimming.',
      choices: ['like', 'likes', 'is like', 'liking'],
      answer: 0,
      why: [
        '',
        'A인 Minsu에 동사를 맞췄어요. not only A but also B는 B(his sisters, 복수)에 맞춰요.',
        'like가 동사로 쓰였으니 be동사를 함께 쓰지 않아요.',
        '-ing 꼴만으로는 동사가 될 수 없어요. 주어 뒤에 동사를 써요.',
      ],
      explain: 'not only A but also B는 동사를 **B**에 맞춰요. B인 his sisters는 복수이므로 **like**예요. "민수뿐만 아니라 누나들도 수영을 좋아해요."',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 1,
      q: 'not only A but also B에서 also는 생략하고 not only A but B로 써도 돼요.',
      answer: true,
      explain: 'also는 생략할 수 있어요. He can **not only** sing **but** dance. 처럼 써도 "노래뿐만 아니라 춤도"라는 뜻이에요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI was very tired. [[빈칸]], I finished all my homework.',
      choices: ['However', 'Therefore', 'For example', 'In addition'],
      answer: 0,
      why: [
        '',
        'therefore는 앞이 원인이고 뒤가 그 결과일 때 써요. 피곤한데 숙제를 다 한 것은 예상과 다른 일이에요.',
        'for example은 앞 말의 예를 들 때 써요. 숙제를 끝낸 것은 피곤함의 예가 아니에요.',
        'in addition은 같은 방향의 내용을 덧붙일 때 써요. 피곤함과 숙제를 다 한 것은 방향이 반대예요.',
      ],
      explain: '피곤했다면 숙제를 못 했을 것 같은데 다 끝냈어요. 예상과 반대되는 내용이 이어지므로 **However**(그러나)를 써요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '밑줄 친 since의 뜻으로 알맞은 것을 고르세요.\n\n__Since__ it was Sunday, the bank was closed.',
      choices: ['~ 때문에', '~ 이후로', '~인 반면에', '~하는 동안'],
      answer: 0,
      why: [
        '',
        '"~ 이후로"는 완료 시제와 함께 시작 시점을 말할 때예요. 여기서는 은행이 문을 닫은 까닭(일요일)을 말해요.',
        '"~인 반면에"는 while의 뜻이에요. 두 내용이 서로 반대인 것이 아니에요.',
        '"~하는 동안"은 while의 뜻이에요.',
      ],
      explain: '일요일이었다는 것은 은행이 문을 닫은 **까닭**이에요. 그래서 since는 **"~ 때문에"**예요. "일요일이었기 때문에 은행은 문을 닫았어요."',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\n[[빈칸]] my brother loves vegetables, I don\'t like them at all.\n(오빠는 채소를 아주 좋아하는 반면에 나는 채소를 전혀 좋아하지 않아요.)',
      choices: ['While', 'Since', 'Therefore', 'Both'],
      answer: 0,
      why: [
        '',
        'since는 "~ 때문에"예요. 오빠가 채소를 좋아해서 내가 싫어하는 것이 아니에요.',
        'therefore는 접속부사라서 쉼표만으로 두 절을 이을 수 없고, 뜻도 "그러므로"예요.',
        'both는 and와 짝을 이뤄 "둘 다"를 나타내요. 문장 앞에서 두 절을 이을 수 없어요.',
      ],
      explain: '두 사람의 취향을 서로 **대조**하므로 "~인 반면에"의 **While**을 써요.',
    },
    {
      id: 'p8', level: 2, type: 'short', concept: 2,
      q: '빈칸에 알맞은 **접속부사** 한 낱말을 쓰세요.\n\nThe movie was almost three hours long. [[빈칸]], it was never boring.\n(그 영화는 거의 세 시간이었어요. 그러나 전혀 지루하지 않았어요.)',
      answer: ['However', 'Nevertheless', 'Nonetheless', 'Still'],
      wrong: [
        { a: 'Therefore', why: 'therefore는 "그러므로"예요. 길어서 지루하지 않았다는 것은 원인과 결과가 아니라 예상과 다른 내용이에요.' },
        { a: 'But', why: 'but은 접속사라서 마침표 뒤에 쉼표를 찍어 쓰지 않아요. 마침표 뒤에서 쉼표와 함께 쓰는 "그러나"는 접속부사 however예요.' },
      ],
      hint: '마침표 뒤, 쉼표 앞에 오는 "그러나"는 접속부사예요.',
      explain: '긴 영화라면 지루할 것 같은데 그렇지 않았어요. 예상과 다른 내용이므로 접속부사 **However**를 써요. (같은 뜻의 Nevertheless, Nonetheless, Still도 정답이에요.)',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 1,
      q: '우리말에 맞게 배열하세요.\n\n지아는 노래를 할 수 있을 뿐만 아니라 춤도 잘 출 수 있어요.',
      choices: ['Jia can', 'not only', 'sing', 'but also', 'dance well'],
      answer: [0, 1, 2, 3, 4],
      hint: 'not only 뒤와 but also 뒤에 같은 꼴(동사원형)이 와요.',
      explain: 'can 뒤에 not only A(sing) but also B(dance well)를 이어요. A와 B는 둘 다 동사원형이에요(병렬). → Jia can not only sing but also dance well.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 0,
      q: '어법상 **틀린** 문장을 고르세요.',
      choices: [
        'Neither Doyun nor I don\'t like horror movies.',
        'Both Jia and Sua are my classmates.',
        'Either Minsu or his parents are going to come.',
        'Not only you but also she is invited.',
      ],
      answer: 0,
      why: [
        '',
        'both A and B는 언제나 복수 동사예요. are가 맞아요.',
        'either A or B는 B(his parents, 복수)에 맞추니 are가 맞아요.',
        'not only A but also B는 B(she)에 맞추니 is가 맞아요.',
      ],
      hint: 'neither에 이미 들어 있는 뜻을 생각해 보세요.',
      explain: 'neither에는 이미 "아니다"라는 뜻이 있어요. don\'t를 또 쓰면 부정이 겹쳐요. → Neither Doyun nor I **like** horror movies. (동사는 B인 I에 맞춰 like)',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '다음 글의 요지로 알맞은 것을 고르세요.\n\nSome people think that games are a waste of time. However, some games can help us learn. For example, word games can teach us new words, and puzzle games can make us think carefully. Therefore, we should choose good games and enjoy them wisely.',
      choices: [
        '좋은 게임을 골라 현명하게 즐기면 배움에 도움이 된다.',
        '게임은 시간 낭비이므로 하지 말아야 한다.',
        '낱말 게임이 퍼즐 게임보다 더 재미있다.',
        '게임을 하면 언제나 성적이 오른다.',
      ],
      answer: 0,
      why: [
        '',
        '첫 문장은 "어떤 사람들의 생각"이에요. However 뒤에서 글쓴이는 그 생각과 반대로 말해요.',
        '두 게임은 For example 뒤의 예일 뿐 서로 견주지 않았어요.',
        '"언제나 성적이 오른다"는 글에 없는 지나친 말이에요.',
      ],
      hint: 'However와 Therefore 뒤의 문장에 표시해 보세요.',
      explain: 'However 뒤에서 "어떤 게임은 배움에 도움이 된다"는 글쓴이의 생각이 나오고, For example 뒤는 그 예, **Therefore** 뒤가 결론이에요. 요지는 "좋은 게임을 골라 현명하게 즐기자"예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '다음 문장과 뜻이 같고 어법상 바른 문장을 고르세요.\n\nNot only Minsu but also his friends were at the park.',
      choices: [
        'His friends as well as Minsu were at the park.',
        'Minsu as well as his friends were at the park.',
        'His friends as well as Minsu was at the park.',
        'Both Minsu nor his friends were at the park.',
      ],
      answer: 0,
      why: [
        '',
        'B as well as A에서는 강조하는 B를 앞에 써요. 순서를 바꾸지 않아서 Minsu가 B 자리에 왔고, 그러면 동사도 was가 되어야 해요.',
        '동사는 앞의 B(His friends, 복수)에 맞추어 were로 써요.',
        'both의 짝은 nor가 아니라 and예요.',
      ],
      hint: 'not only A but also B = B as well as A 이고, 동사는 B에 맞춰요.',
      explain: 'not only A(Minsu) but also B(his friends)는 **B as well as A**, 곧 His friends as well as Minsu로 바꿔요. 동사는 B인 his friends(복수)에 맞춰 **were**예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '(A), (B)에 들어갈 말로 알맞게 짝 지은 것을 고르세요.\n\nPlastic bags are light and cheap. (A) [[빈칸]], they take hundreds of years to break down. They also hurt sea animals. (B) [[빈칸]], we should carry our own shopping bags.',
      choices: [
        '(A) However — (B) Therefore',
        '(A) Therefore — (B) However',
        '(A) For example — (B) However',
        '(A) However — (B) For example',
      ],
      answer: 0,
      why: [
        '',
        '(A) 뒤는 비닐봉지의 좋은 점에서 나쁜 점으로 방향이 바뀌어요. 원인과 결과가 아니에요.',
        '(A) 뒤는 가볍고 싸다는 말의 예가 아니에요. (B) 뒤는 앞 내용을 모은 결론이에요.',
        '(B) 뒤의 "장바구니를 들고 다니자"는 앞 내용의 예가 아니라 결론이에요.',
      ],
      hint: '(A) 앞뒤는 좋은 점과 나쁜 점, (B) 앞뒤는 근거와 결론이에요.',
      explain: '(A) 가볍고 싸다 → 그러나 잘 썩지 않는다: 방향이 바뀌므로 **However**. (B) 바다 동물에게 해롭다 → 그러므로 장바구니를 쓰자: 결론이므로 **Therefore**. 요지는 (B) 뒤의 "장바구니를 들고 다니자"예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', concept: 0,
      q: '두 문장이 같은 뜻이 되도록 빈칸에 알맞은 한 낱말을 쓰세요.\n\nMinsu doesn\'t eat fish. Jia doesn\'t eat fish, either.\n→ Neither Minsu nor Jia [[빈칸]] fish.',
      answer: ['eats'],
      wrong: [
        { a: 'eat', why: '두 사람이라 복수로 생각했어요. neither A nor B는 동사를 B(Jia, 3인칭 단수)에 맞춰 eats로 써요.' },
        { a: 'doesn\'t', why: 'neither에 이미 "아니다"가 있어요. 부정어를 또 쓰지 않아요.' },
      ],
      hint: '동사는 nor 뒤의 사람에 맞춰요. 그리고 neither에 이미 들어 있는 뜻을 떠올려 보세요.',
      explain: 'neither에 부정의 뜻이 있으니 doesn\'t는 쓰지 않고, 동사는 B인 Jia(3인칭 단수, 현재)에 맞춰 **eats**로 써요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: 'while이 **"~인 반면에"**의 뜻으로 쓰인 문장을 고르세요.',
      choices: [
        'While some people like summer, others prefer winter.',
        'While I was cooking, the phone rang.',
        'Please wait here while I get the tickets.',
        'Be quiet while the baby is sleeping.',
      ],
      answer: 0,
      why: [
        '',
        '요리하는 동안 전화가 울렸어요. 두 일이 같은 시간에 일어난 "~하는 동안"이에요.',
        '내가 표를 사는 동안 기다리라는 말이에요. "~하는 동안"이에요.',
        '아기가 자는 동안 조용히 하라는 말이에요. "~하는 동안"이에요.',
      ],
      hint: '두 내용이 같은 시간의 일인지, 서로 반대인지 보세요.',
      explain: '여름을 좋아하는 사람들과 겨울을 더 좋아하는 사람들을 **대조**하므로 while은 "~인 반면에"예요. 나머지는 모두 같은 시간에 일어나는 일을 이은 "~하는 동안"이에요.',
    },
  ],

  deeper: [
    {
      title: '연결어를 바꿔 쓰기',
      body: '같은 관계를 나타내는 연결어는 여러 가지예요. 글을 쓸 때 같은 말만 되풀이하지 않도록 바꿔 써 보세요.\n\n| 관계 | 접속부사 (마침표 뒤) | 접속사 (한 문장 안) |\n|---|---|---|\n| 반대 | However, … / On the other hand, … | but, while |\n| 결과 | Therefore, … / As a result, … | so |\n| 이유 | — | because, since |\n\n- It was cold. **However**, we went out. = It was cold, **but** we went out.\n- It was cold. **Therefore**, we stayed inside. = It was cold, **so** we stayed inside.\n- **Since** it was cold, we stayed inside.\n\n접속사는 한 문장 안에서 두 절을 이어 주고, 접속부사는 두 문장 사이의 관계만 알려 줘요. 그래서 접속부사 앞에는 마침표(또는 세미콜론 ;)가 필요해요. 고등학교에서는 연결어로 글의 짜임을 분석하는 것을 더 깊이 배워요.',
    },
  ],

  faq: [
    {
      q: 'however랑 but은 뭐가 달라요?',
      a: '뜻은 둘 다 "그러나"예요. 하지만 but은 **접속사**라서 한 문장 안에서 두 절을 이어요(It was cold, but we went out.). however는 **접속부사**라서 보통 마침표 뒤 새 문장 앞에 쓰고 쉼표를 찍어요(It was cold. However, we went out.).',
    },
    {
      q: 'either A or B에서 동사는 왜 B에 맞춰요?',
      a: '둘 중 **하나만** 주어가 되니 둘을 합쳐 복수로 볼 수 없어요. 그래서 동사와 더 가까운 B에 맞추는 것이 규칙이에요. neither A nor B, not only A but also B도 B에 맞춰요. both A and B만 "둘 다"이므로 언제나 복수예요.',
    },
    {
      q: 'however랑 on the other hand는 바꿔 써도 돼요?',
      a: '두 가지를 견주는 글에서는 바꿔 쓸 수 있을 때도 있어요. 하지만 on the other hand는 **두 쪽을 나란히 견줄 때**(버스는 싸다 / 택시는 빠르다) 쓰고, however는 **예상과 다른 내용**(피곤했다 / 그래도 숙제를 다 했다)에도 써요. 예상과 다른 내용에는 on the other hand가 어색해요.',
    },
    {
      q: 'since가 "때문에"인지 "이후로"인지 어떻게 알아요?',
      a: '뒤 내용이 **까닭**이면 "때문에", **시작한 때**(since 2020, since I was five)이고 앞 문장이 현재완료처럼 "계속 이어 온 일"이면 "이후로"예요. Since it was late, we took a taxi.는 까닭이니 "늦었기 때문에"예요.',
    },
  ],

  mistakes: [
    'neither A nor B에 부정어를 또 쓰는 실수 — Neither Jia nor I don\'t like it.(✗) → Neither Jia nor I like it.',
    'not only A but also B의 동사를 A에 맞추는 실수 — Not only the boys but also Sua were there.(✗) → … Sua was there.',
    '접속부사를 쉼표만으로 잇는 실수 — It rained, however we played.(✗) → It rained. However, we played.',
  ],

  gens: [
    {
      id: 'correlative-agree',
      level: 1,
      title: '상관접속사와 동사의 수 일치',
      make: function (R) {
        // [문장(빈칸), 정답, [[오답, 이유] × 3], 해설]
        var items = [
          ['Both Minsu and Jia [[빈칸]] good at math.', 'are',
            [['is', 'both A and B는 "둘 다"이므로 언제나 복수 동사를 써요.'], ['am', 'am은 주어가 I일 때만 써요. 주어는 Minsu와 Jia 둘이에요.'], ['be', '주어 뒤에는 동사원형 be가 아니라 수에 맞는 꼴을 써요.']],
            'both A and B는 언제나 복수 → are'],
          ['Either you or Seojun [[빈칸]] going to clean the room.', 'is',
            [['are', 'A(you)에 동사를 맞췄어요. either A or B는 B(Seojun)에 맞춰요.'], ['am', 'am은 주어가 I일 때만 써요. B는 Seojun이에요.'], ['be', '주어 뒤에는 동사원형 be가 아니라 수에 맞는 꼴을 써요.']],
            'either A or B는 B(Seojun, 3인칭 단수)에 맞춤 → is'],
          ['Neither my parents nor my brother [[빈칸]] coffee.', 'drinks',
            [['drink', 'A(my parents)에 동사를 맞췄어요. neither A nor B는 B(my brother)에 맞춰요.'], ['doesn\'t drink', 'neither에 이미 "아니다"가 있어요. 부정어를 또 쓰지 않아요.'], ['drinking', '-ing 꼴만으로는 동사가 될 수 없어요.']],
            'neither A nor B는 B(my brother, 3인칭 단수)에 맞춤 → drinks'],
          ['Neither Hayun nor her friends [[빈칸]] here yet.', 'are',
            [['is', 'A(Hayun)에 동사를 맞췄어요. neither A nor B는 B(her friends)에 맞춰요.'], ['aren\'t', 'neither에 이미 "아니다"가 있어요. 부정어를 또 쓰지 않아요.'], ['be', '주어 뒤에는 동사원형 be가 아니라 수에 맞는 꼴을 써요.']],
            'neither A nor B는 B(her friends, 복수)에 맞춤 → are'],
          ['Not only the students but also the teacher [[빈칸]] excited about the trip yesterday.', 'was',
            [['were', 'A(the students)에 동사를 맞췄어요. not only A but also B는 B(the teacher)에 맞춰요.'], ['be', '주어 뒤에는 동사원형 be가 아니라 수와 시제에 맞는 꼴을 써요.'], ['being', '-ing 꼴만으로는 동사가 될 수 없어요.']],
            'not only A but also B는 B(the teacher, 단수)에 맞추고, yesterday이므로 과거 → was'],
          ['Not only my sister but also I [[빈칸]] interested in science.', 'am',
            [['is', 'A(my sister)에 동사를 맞췄어요. not only A but also B는 B(I)에 맞춰요.'], ['are', '둘을 합쳐 복수로 생각했어요. not only A but also B는 B(I)에 맞춰요.'], ['be', '주어 뒤에는 동사원형 be가 아니라 수에 맞는 꼴을 써요.']],
            'not only A but also B는 B(I)에 맞춤 → am'],
          ['Either Doyun or his sisters [[빈칸]] going to call you.', 'are',
            [['is', 'A(Doyun)에 동사를 맞췄어요. either A or B는 B(his sisters)에 맞춰요.'], ['am', 'am은 주어가 I일 때만 써요. B는 his sisters예요.'], ['be', '주어 뒤에는 동사원형 be가 아니라 수에 맞는 꼴을 써요.']],
            'either A or B는 B(his sisters, 복수)에 맞춤 → are'],
          ['Both my dog and my cat [[빈칸]] to sleep on the sofa.', 'like',
            [['likes', 'both A and B는 "둘 다"이므로 언제나 복수 동사를 써요.'], ['liking', '-ing 꼴만으로는 동사가 될 수 없어요.'], ['is like', 'like가 동사이므로 be동사를 함께 쓰지 않아요.']],
            'both A and B는 언제나 복수 → like'],
          ['The teacher as well as the students [[빈칸]] ready for the test.', 'is',
            [['are', 'the students에 동사를 맞췄어요. B as well as A는 앞의 B(The teacher)에 맞춰요.'], ['am', 'am은 주어가 I일 때만 써요.'], ['be', '주어 뒤에는 동사원형 be가 아니라 수에 맞는 꼴을 써요.']],
            'B as well as A는 앞의 B(The teacher, 단수)에 맞춤 → is'],
          ['Not only Sua but also her parents [[빈칸]] to the concert every year.', 'go',
            [['goes', 'A(Sua)에 동사를 맞췄어요. not only A but also B는 B(her parents)에 맞춰요.'], ['going', '-ing 꼴만으로는 동사가 될 수 없어요.'], ['gone', '과거분사만으로는 동사가 될 수 없어요. every year는 현재의 습관이에요.']],
            'not only A but also B는 B(her parents, 복수)에 맞춤 → go'],
        ];
        var it = R.pick(items);
        var reason = {};
        it[2].forEach(function (w) { reason[w[0]] = w[1]; });
        var pick = R.choices(it[1], it[2].map(function (w) { return w[0]; }), 4);
        return {
          type: 'choice', concept: /as well as|not only/i.test(it[0]) ? 1 : 0,
          q: '빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === it[1] ? '' : reason[c]; }),
          explain: it[3] + '\n\n' + it[0].replace('[[빈칸]]', '**' + it[1] + '**'),
        };
      },
    },
    {
      id: 'linker-choice',
      level: 2,
      title: '문장의 관계에 맞는 연결어 고르기',
      make: function (R) {
        // 관계: 'res' 결과, 'con' 반대·예상과 다름, 'cmp' 두 쪽 견주기
        // 정답 말고 같은 관계의 말이 보기에 섞이지 않게 관계마다 오답 후보를 따로 둔다
        var items = [
          ['It rained heavily all morning. [[빈칸]], the soccer game was canceled.', 'res'],
          ['The bridge is very old and weak. [[빈칸]], big trucks are not allowed on it.', 'res'],
          ['Our team practiced hard every day. [[빈칸]], we won the final game.', 'res'],
          ['Hayun forgot her umbrella. [[빈칸]], she got wet on the way home.', 'res'],
          ['Jia studied hard for the test. [[빈칸]], she didn\'t get a good score.', 'con'],
          ['Many people think sharks are dangerous. [[빈칸]], most sharks do not attack people.', 'con'],
          ['The bag was expensive. [[빈칸]], Doyun bought it because he really needed it.', 'con'],
          ['The old computer is slow. [[빈칸]], it still works well for writing.', 'con'],
          ['Living in a big city is convenient. [[빈칸]], it can be noisy and crowded.', 'cmp'],
          ['Summer days are long and hot. [[빈칸]], winter days are short and cold.', 'cmp'],
          ['Taking the bus is cheap but slow. [[빈칸]], taking a taxi is fast but expensive.', 'cmp'],
          ['Paper books are heavy to carry. [[빈칸]], e-books are very light.', 'cmp'],
        ];
        var ANS = { res: 'Therefore', con: 'However', cmp: 'On the other hand' };
        var REL = { res: '앞 문장이 원인, 뒤 문장이 그 결과', con: '뒤 문장이 앞 문장에서 예상한 것과 반대', cmp: '두 가지(또는 좋은 점과 나쁜 점)를 나란히 놓고 견줌' };
        var WRONG = {
          res: ['However', 'On the other hand', 'For example'],
          con: ['Therefore', 'For example', 'In addition'],
          cmp: ['Therefore', 'For example', 'In addition'],
        };
        var WHY = {
          'Therefore': 'therefore는 앞이 원인, 뒤가 그 결과일 때 써요. 두 문장의 관계를 다시 보세요.',
          'However': 'however는 앞 내용과 반대되거나 예상과 다른 내용이 올 때 써요. 여기서는 앞 내용의 자연스러운 결과가 이어져요.',
          'On the other hand': 'on the other hand는 두 가지를 견주어 다른 쪽을 말할 때 써요. 여기서는 앞 내용의 결과가 이어져요.',
          'For example': 'for example은 앞 말의 예를 들 때 써요. 뒤 문장은 앞 문장의 예가 아니에요.',
          'In addition': 'in addition은 같은 방향의 내용을 덧붙일 때 써요. 뒤 문장은 앞 문장과 방향이 달라요.',
        };
        var it = R.pick(items);
        var rel = it[1];
        var correct = ANS[rel];
        var pick = R.choices(correct, WRONG[rel], 4);
        return {
          type: 'choice', concept: 2,
          q: '두 문장의 관계를 생각하여 빈칸에 알맞은 말을 고르세요.\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : WHY[c]; }),
          explain: '두 문장의 관계: ' + REL[rel] + '. 알맞은 연결어: **' + correct + '**\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'however', m: '그러나, 하지만', ex: 'It was raining. However, we went hiking.', exm: '비가 오고 있었어요. 하지만 우리는 등산을 갔어요.' },
    { w: 'therefore', m: '그러므로, 따라서', ex: 'He was sick. Therefore, he stayed home.', exm: '그는 아팠어요. 그래서 집에 있었어요.' },
    { w: 'on the other hand', m: '반면에, 다른 한편으로는', ex: 'Trains are fast. On the other hand, they can be crowded.', exm: '기차는 빨라요. 반면에 붐빌 수 있어요.' },
    { w: 'neither', m: '(neither A nor B) A도 B도 아닌', ex: 'Neither Jia nor Sua knows the answer.', exm: '지아도 수아도 답을 몰라요.' },
    { w: 'either', m: '(either A or B) A나 B 둘 중 하나', ex: 'You can choose either the red one or the blue one.', exm: '빨간 것이나 파란 것 중 하나를 고를 수 있어요.' },
    { w: 'while', m: '~인 반면에; ~하는 동안', ex: 'While I like rice, my brother likes bread.', exm: '나는 밥을 좋아하는 반면에 남동생은 빵을 좋아해요.' },
    { w: 'since', m: '~ 때문에; ~ 이후로', ex: 'Since it was late, we took a taxi.', exm: '늦었기 때문에 우리는 택시를 탔어요.' },
    { w: 'as well as', m: '~뿐만 아니라 …도', ex: 'She speaks Chinese as well as English.', exm: '그녀는 영어뿐만 아니라 중국어도 해요.' },
    { w: 'in addition', m: '게다가, 덧붙여', ex: 'The hotel is clean. In addition, it is near the beach.', exm: '그 호텔은 깨끗해요. 게다가 해변 가까이에 있어요.' },
    { w: 'contrast', m: '대조, 차이', ex: 'There is a big contrast between the two cities.', exm: '두 도시는 크게 대조돼요.' },
    { w: 'result', m: '결과', ex: 'As a result, the game was canceled.', exm: '그 결과 경기가 취소되었어요.' },
    { w: 'main idea', m: '요지, 중심 생각', ex: 'Find the main idea of the passage.', exm: '글의 요지를 찾으세요.' },
    { w: 'cancel', m: '취소하다', ex: 'They canceled the trip because of the storm.', exm: '그들은 폭풍 때문에 여행을 취소했어요.' },
    { w: 'convenient', m: '편리한', ex: 'The subway is convenient for students.', exm: '지하철은 학생들에게 편리해요.' },
    { w: 'crowded', m: '붐비는, 복잡한', ex: 'The market is always crowded on weekends.', exm: '그 시장은 주말마다 늘 붐벼요.' },
  ],
});
