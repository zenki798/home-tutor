/* 6학년 영어 · 초대와 감사의 이메일 쓰기 */
Tutor.registerUnit({
  id: 'eng-e6-11',
  course: 'eng-e6',
  title: '초대와 감사의 이메일 쓰기',
  summary: '예시 이메일을 참고해 친구를 초대하거나 고마움을 전하는 이메일을 쓰고, 문장 부호와 철자를 점검해요.',
  goals: [
    'Can you come to my party?로 초대하고 Sure. / Sorry, I can\'t.로 답할 수 있어요.',
    '초대 이메일의 짜임(받는 사람·인사·무슨 일·날짜·시각·장소·끝인사·보내는 사람)을 알 수 있어요.',
    '소식과 계획, 고마운 마음을 이메일로 전할 수 있어요.',
    '이메일을 바꿔 쓰고 대문자·문장 부호·철자를 점검할 수 있어요.',
  ],
  standards: ['[6영02-08]', '[6영02-03]', '[6영02-09]'],

  concepts: [
    {
      title: '초대하고 답하기',
      body: '친구를 초대할 때는 **Can you come to my ~?** 라고 물어요. "내 ~에 올 수 있니?"라는 뜻이에요.\n\n- A: **Can you come to my birthday party?** (내 생일 파티에 올 수 있니?)\n- B: **Sure.** / **Of course.** (물론이지.)\n- B: **Sorry, I can\'t.** I have a piano lesson. (미안하지만 못 가. 피아노 수업이 있어.)\n\n갈 수 있으면 Sure., 갈 수 없으면 Sorry, I can\'t.로 답해요. 못 갈 때는 **이유를 한 문장 덧붙이면** 더 예의 바른 대답이 돼요.\n\n> 💡 Can으로 물었으니 "Yes, I can." / "No, I can\'t."로 답해도 맞아요.',
      easy: '초대받았을 때 대답은 신호등처럼 생각해요.\n\n- 초록불(갈 수 있어요): **Sure.** / **Of course.**\n- 빨간불(못 가요): **Sorry, I can\'t.** + 이유\n\n친구가 서운하지 않게 빨간불일 때는 꼭 이유를 말해 줘요. 예: Sorry, I can\'t. I have to visit my grandma.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nA: Can you come to my party?\nB: [[빈칸]] I have a piano lesson.',
        choices: ['Sorry, I can\'t.', 'Sure.', 'Of course.'],
        answer: 0,
        why: [
          '',
          '피아노 수업이 있다는 것은 못 가는 이유예요. "Sure."는 갈 수 있다는 대답이에요.',
          '"Of course."는 "물론이지(갈게)."라는 뜻이라 뒤의 이유와 어울리지 않아요.',
        ],
        explain: 'B가 "피아노 수업이 있어."라고 이유를 말하니 못 가는 거예요. 그래서 "Sorry, I can\'t."가 알맞아요.',
      },
    },
    {
      title: '초대 이메일의 짜임',
      body: '초대 이메일에는 친구가 꼭 알아야 할 것이 들어가요.\n\n> To: Mina\n> From: Jiho\n> Subject: My Birthday Party\n>\n> Dear Mina,\n> Hi! How are you? I\'m going to have a birthday party.\n> Can you come to my party?\n> It\'s on Saturday, May 10.\n> It\'s at 2 p.m.\n> It\'s at my house.\n> See you soon.\n> Your friend, Jiho\n\n| 부분 | 예 |\n|---|---|\n| 받는 사람 | To: Mina, Dear Mina, |\n| 인사 | Hi! How are you? |\n| 무슨 일 | I\'m going to have a birthday party. |\n| 날짜 | on Saturday, May 10 |\n| 시각 | at 2 p.m. |\n| 장소 | at my house |\n| 끝인사 | See you soon. |\n| 보내는 사람 | Your friend, Jiho |\n\n> 💡 Subject는 이메일의 **제목**이에요. 무엇에 대한 이메일인지 짧게 써요.',
      easy: '초대장은 친구가 "언제, 어디로, 무슨 일로 가면 돼?"라고 다시 묻지 않게 쓰는 거예요.\n\n그래서 꼭 세 가지를 넣어요.\n- **언제**: 날짜(on May 10)와 시각(at 2 p.m.)\n- **어디서**: 장소(at my house)\n- **무슨 일**: 파티(a birthday party)\n\n그리고 편지처럼 처음엔 인사(Dear Mina,), 끝엔 끝인사와 내 이름(Your friend, Jiho)을 써요.',
      check: {
        type: 'choice',
        q: '초대 이메일에서 "It\'s at 2 p.m."이 알려 주는 것은 무엇일까요?',
        choices: ['시각', '날짜', '장소'],
        answer: 0,
        why: [
          '',
          '날짜는 May 10처럼 달과 날로 써요. 2 p.m.은 오후 2시예요.',
          '장소는 at my house처럼 곳을 말해요. 2 p.m.은 시각이에요.',
        ],
        explain: 'p.m.은 오후라는 뜻이에요. 2 p.m.은 오후 2시, 곧 파티가 시작하는 시각이에요.',
      },
    },
    {
      title: '소식과 계획 전하기',
      body: '이메일에는 초대만이 아니라 내 **소식**과 **계획**도 쓸 수 있어요.\n\n**지난 소식**은 지난 일 모양으로 써요.\n- **I joined a soccer club.** (나는 축구 동아리에 들어갔어.)\n- **I visited my uncle in Busan.** (나는 부산에 있는 삼촌 댁에 다녀왔어.)\n\n**앞으로의 계획**은 **I\'m going to + 원래 모양**으로 써요.\n- **I\'m going to play in a soccer game next week.** (나는 다음 주에 축구 경기에 나갈 거야.)\n- **I\'m going to learn swimming this summer.** (나는 이번 여름에 수영을 배울 거야.)\n\n> 💡 joined, visited처럼 -ed가 붙으면 지난 일이에요. I\'m going to 뒤에는 play, learn처럼 원래 모양이 와요.',
      easy: '시간 줄을 떠올려 보세요.\n\n어제·지난주 ← **오늘** → 내일·다음 주\n\n- 왼쪽(지나간 일): **I joined** a club. (들어갔어.)\n- 오른쪽(앞으로 할 일): **I\'m going to join** a club. (들어갈 거야.)\n\n같은 join이라도 언제 일어난 일인지에 따라 모양이 달라져요.',
      check: {
        type: 'choice',
        q: '"나는 다음 주에 축구 경기에 나갈 거야."를 영어로 바르게 쓴 것을 고르세요.',
        choices: ['I\'m going to play in a soccer game next week.', 'I played in a soccer game next week.', 'I\'m going to played in a soccer game next week.'],
        answer: 0,
        why: [
          '',
          'played는 지난 일 모양이에요. 다음 주는 앞으로의 일이라 I\'m going to를 써요.',
          'I\'m going to 뒤에는 played가 아니라 원래 모양 play를 써요.',
        ],
        explain: '앞으로의 계획은 I\'m going to + 원래 모양(play)으로 써요: "I\'m going to play in a soccer game next week."',
      },
    },
    {
      title: '고마움 전하기',
      body: '고마운 마음을 전할 때는 **Thank you for ~.** 를 써요. for 뒤에 **무엇이 고마운지** 써요.\n\n- **Thank you for the gift.** (선물 고마워.)\n- **Thank you for the nice card.** (멋진 카드 고마워.)\n- **Thank you for helping me.** (나를 도와줘서 고마워.)\n\n고마운 것이 물건이면 for 뒤에 그대로(the gift), **한 일**이면 -ing를 붙여(helping) 써요.\n\n감사 이메일에는 고마운 것과 함께 **내 느낌**을 한 문장 더 쓰면 좋아요. 예: I really like the book.\n\n고맙다는 말을 들으면 **You\'re welcome.(천만에.)**이라고 답해요.',
      easy: '"Thank you for [[빈칸]]." 빈칸에 고마운 것을 넣는 놀이예요.\n\n- 선물이 고마우면 → for **the gift**\n- 초대해 준 게 고마우면 → for **inviting me**\n- 도와준 게 고마우면 → for **helping me**\n\n물건은 그대로, 한 일은 끝에 -ing를 붙여요.',
      check: {
        type: 'ox',
        q: '"Thank you for the gift."는 선물에 대해 고마움을 전하는 말이에요.',
        answer: true,
        explain: 'Thank you for 뒤에 고마운 것(the gift)을 써요. "선물 고마워."라는 뜻이에요.',
      },
    },
    {
      title: '바꿔 쓰고 점검하기: 대문자·문장 부호·철자',
      body: '예시 이메일에서 **이름·날짜·장소만 바꾸면** 나만의 이메일이 돼요. 다 쓴 뒤에는 꼭 세 가지를 점검해요.\n\n**1. 대문자**\n- 문장의 첫 글자: **M**y party is on Saturday.\n- 나를 뜻하는 **I**는 언제나 대문자\n- 사람 이름(**M**ina), 요일(**S**aturday), 달(**M**ay)\n\n**2. 문장 부호**\n- 보통 문장 끝: 마침표 **.**\n- 묻는 문장 끝: 물음표 **?** → Can you come to my party?\n- 기쁜 느낌: 느낌표 **!** → Thank you so much!\n- 인사 뒤: 쉼표 **,** → Dear Mina,\n- 줄임말: 작은 따옴표 **\'** → I\'m, can\'t\n\n**3. 철자**: 자주 틀리는 낱말을 다시 봐요. 예: friend(frend X), birthday, Saturday',
      easy: '이메일을 다 쓰면 "점검 안경"을 쓰고 세 번 읽어요.\n\n1. 첫 번째 읽기: 대문자 안경 — 문장 첫 글자, I, 이름, 요일·달이 대문자인가?\n2. 두 번째 읽기: 부호 안경 — 묻는 말 끝에 ?, 보통 문장 끝에 .이 있나?\n3. 세 번째 읽기: 철자 안경 — friend, birthday를 바르게 썼나?',
      check: {
        type: 'choice',
        q: '대문자를 바르게 쓴 문장을 고르세요.',
        choices: ['My party is on Saturday.', 'my party is on Saturday.', 'My party is on saturday.'],
        answer: 0,
        why: [
          '',
          '문장의 첫 글자는 대문자로 써요: My',
          '요일 이름은 대문자로 시작해요: Saturday',
        ],
        explain: '문장 첫 글자(My)와 요일 이름(Saturday)은 대문자로 써요. 그래서 "My party is on Saturday."가 바른 문장이에요.',
      },
    },
  ],

  examples: [
    {
      q: '지호의 초대 이메일을 바꿔 써서 하윤이가 서준이를 **6월 7일 토요일 오후 3시에 공원**에서 하는 피크닉에 초대하는 이메일을 만들어 보세요.',
      steps: [
        '받는 사람과 인사를 바꿔요: **Dear Seojun,**',
        '무슨 일을 바꿔요: **I\'m going to have a picnic. Can you come to my picnic?**',
        '날짜·시각·장소를 바꿔요: **It\'s on Saturday, June 7. It\'s at 3 p.m. It\'s at the park.**',
        '끝인사와 보내는 사람을 써요: **See you soon. Your friend, Hayun**',
        '점검해요: 이름(Seojun, Hayun)·요일(Saturday)·달(June)이 대문자인지, 묻는 문장 끝에 물음표가 있는지 확인해요.',
      ],
      answer: 'Dear Seojun, / I\'m going to have a picnic. Can you come to my picnic? / It\'s on Saturday, June 7. It\'s at 3 p.m. It\'s at the park. / See you soon. Your friend, Hayun',
    },
    {
      q: '틀린 곳 세 군데를 찾아 고쳐 보세요.\n\ndear Mina,\nThank you for the gift. i really like it',
      steps: [
        '대문자: 인사의 첫 글자 dear → **Dear**',
        '대문자: 나를 뜻하는 i → **I**',
        '문장 부호: 마지막 문장 끝에 마침표가 없어요 → like it**.**',
      ],
      answer: 'Dear Mina, / Thank you for the gift. I really like it.',
    },
  ],

  terms: [
    { term: 'Can you come to ~?', def: '"~에 올 수 있니?"라고 초대하는 말이에요. Sure. / Sorry, I can\'t.로 답해요.' },
    { term: '이메일의 짜임', def: '받는 사람 → 인사 → 무슨 일 → 날짜·시각·장소 → 끝인사 → 보내는 사람 순서로 써요.' },
    { term: 'Subject', def: '이메일의 제목이에요. 무엇에 대한 이메일인지 짧게 써요. 예: My Birthday Party' },
    { term: 'I\'m going to ~.', def: '"나는 ~할 거야."라고 앞으로의 계획을 말해요. 뒤에는 원래 모양이 와요. 예: I\'m going to join a club.' },
    { term: 'Thank you for ~.', def: '"~해 줘서(~을 줘서) 고마워."라는 말이에요. 예: Thank you for the gift. / Thank you for helping me.' },
    { term: '문장 부호', def: '문장에 찍는 부호예요. 마침표(.), 물음표(?), 느낌표(!), 쉼표(,), 작은 따옴표(\') 등이 있어요.' },
    { term: '대문자', def: 'A, B, C처럼 큰 글자예요. 문장의 첫 글자, I, 이름, 요일, 달 이름을 대문자로 시작해요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말을 고르세요.\n\nA: Can you come to my birthday party on Sunday?\nB: [[빈칸]] What time is the party?',
      choices: ['Sure.', 'Sorry, I can\'t.', 'Thank you for the gift.', 'You\'re welcome.'],
      answer: 0,
      why: [
        '',
        '못 간다고 해 놓고 파티가 몇 시인지 묻는 것은 어색해요.',
        '아직 선물을 받지 않았어요. 초대에 대한 대답을 골라요.',
        '"You\'re welcome."은 고맙다는 말에 답하는 말이에요.',
      ],
      explain: 'B가 파티 시각을 묻는 것을 보면 갈 생각이에요. 그래서 "Sure.(물론이지.)"가 알맞아요.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '"Sorry, I can\'t."는 초대를 받아들이는 대답이에요.',
      answer: false,
      explain: '"Sorry, I can\'t."는 "미안하지만 못 가."라는 뜻으로 초대를 거절하는 대답이에요. 받아들일 때는 "Sure." 또는 "Of course."라고 해요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '이메일을 읽고 물음에 답하세요.\n\n> Dear Junho,\n> I\'m going to have a pizza party. Can you come?\n> It\'s on Friday, July 4.\n> It\'s at 5 p.m.\n> It\'s at the community center.\n> See you there!\n> Your friend, Sua\n\n파티는 어디에서 열릴까요?',
      choices: ['주민 센터', '수아네 집', '피자 가게', '학교'],
      answer: 0,
      why: [
        '',
        '수아네 집이라는 말은 없어요. It\'s at ~.에서 장소를 찾아요.',
        '피자 파티이지만 피자 가게에서 하는 것은 아니에요.',
        '학교(school)라는 낱말은 없어요.',
      ],
      hint: '장소는 "It\'s at ~." 문장에서 찾아요. 시각을 말하는 문장과 구별하세요.',
      explain: '"It\'s at the community center."라고 했으니 파티 장소는 주민 센터예요. 날짜는 7월 4일 금요일, 시각은 오후 5시예요.',
    },
    {
      id: 'p4', level: 1, type: 'short', concept: 3,
      q: '빈칸에 알맞은 낱말 하나를 쓰세요.\n\nThank you [[빈칸]] the gift.',
      answer: ['for'],
      wrong: [
        { a: 'to', why: '고마운 것 앞에는 to가 아니라 for를 써요: Thank you for ~.' },
        { a: 'of', why: '고마운 것 앞에는 for를 써요: Thank you for the gift.' },
      ],
      explain: '고마움을 전할 때는 Thank you for 뒤에 고마운 것을 써요: "Thank you for the gift.(선물 고마워.)"',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '"나는 축구 동아리에 들어갔어."를 영어로 바르게 쓴 것을 고르세요.',
      choices: ['I joined a soccer club.', 'I\'m going to join a soccer club.', 'I join a soccer club.', 'Let\'s join a soccer club.'],
      answer: 0,
      why: [
        '',
        'I\'m going to는 앞으로 할 일이에요. "들어갔어"는 이미 지난 일이에요.',
        'join은 지금이나 늘 하는 일을 말할 때의 모양이에요. 지난 일은 joined예요.',
        'Let\'s는 "같이 ~하자"라는 제안이에요.',
      ],
      explain: '"들어갔어"는 지난 일이라 join에 -ed를 붙인 joined를 써요: "I joined a soccer club."',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 4,
      q: '대문자를 **모두** 바르게 쓴 문장을 고르세요.',
      choices: ['I met Mina on Monday.', 'i met Mina on Monday.', 'I met mina on Monday.', 'I met Mina on monday.'],
      answer: 0,
      why: [
        '',
        '나를 뜻하는 I는 언제나 대문자로 써요.',
        '사람 이름(Mina)은 대문자로 시작해요.',
        '요일 이름(Monday)은 대문자로 시작해요.',
      ],
      explain: 'I, 사람 이름 Mina, 요일 Monday는 모두 대문자로 시작해요. 그래서 "I met Mina on Monday."가 바른 문장이에요.',
    },
    {
      id: 'p7', level: 1, type: 'short', concept: 4,
      q: '철자가 틀린 낱말 하나를 찾아 바르게 고쳐 쓰세요.\n\nYou are my best frend.',
      answer: ['friend'],
      wrong: [
        { a: 'freind', why: 'i와 e의 순서를 확인해 보세요. f-r-i-e-n-d예요.' },
        { a: 'frend', why: '틀린 낱말을 그대로 썼어요. 가운데에 i가 빠졌어요: f-r-i-e-n-d' },
      ],
      explain: '"친구"는 friend예요. r 다음에 i, e 순서로 써요: f-r-i-e-n-d',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 1,
      q: '초대 이메일의 짜임에 맞게 순서대로 놓으세요.',
      choices: ['Dear Mina,', 'Can you come to my birthday party?', 'It\'s on May 10 at 2 p.m.', 'See you soon.', 'Your friend, Jiho'],
      answer: [0, 1, 2, 3, 4],
      hint: '받는 사람 → 무슨 일 → 날짜·시각 → 끝인사 → 보내는 사람',
      explain: '받는 사람에게 인사(Dear Mina,) → 무슨 일(생일 파티 초대) → 날짜와 시각 → 끝인사(See you soon.) → 보내는 사람(Your friend, Jiho) 순서예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nI\'m going to [[빈칸]] my grandparents this weekend.',
      choices: ['visit', 'visited', 'visiting', 'visits'],
      answer: 0,
      why: [
        '',
        'visited는 지난 일 모양이에요. I\'m going to 뒤에는 원래 모양을 써요.',
        'I\'m going to 뒤에는 -ing를 붙이지 않아요.',
        'I\'m going to 뒤에는 -s를 붙이지 않아요.',
      ],
      hint: 'I\'m going to 뒤에 오는 낱말의 모양을 떠올려 보세요.',
      explain: 'I\'m going to 뒤에는 원래 모양이 와요: "I\'m going to visit my grandparents this weekend.(이번 주말에 조부모님 댁에 갈 거야.)"',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 1,
      q: '파티 초대 이메일에 꼭 들어가야 할 내용이 **아닌** 것을 고르세요.',
      choices: ['파티 날짜', '파티 시각', '파티 장소', '내가 어제 먹은 저녁 메뉴'],
      answer: 3,
      why: [
        '날짜가 없으면 친구가 언제 와야 할지 몰라요. 꼭 필요한 내용이에요.',
        '시각이 없으면 친구가 몇 시에 와야 할지 몰라요. 꼭 필요한 내용이에요.',
        '장소가 없으면 친구가 어디로 가야 할지 몰라요. 꼭 필요한 내용이에요.',
        '',
      ],
      explain: '초대 이메일에는 친구가 찾아올 수 있게 날짜·시각·장소가 꼭 있어야 해요. 어제 먹은 저녁 메뉴는 초대와 관계가 없어요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '문장 부호를 바르게 쓴 것을 고르세요.',
      choices: ['Can you come to my party?', 'Can you come to my party.', 'Can you come to my party,', 'Can you come, to my party?'],
      answer: 0,
      why: [
        '',
        '묻는 문장이에요. 끝에 마침표가 아니라 물음표를 찍어요.',
        '문장 끝에는 쉼표를 찍지 않아요. 묻는 문장이니 물음표를 찍어요.',
        'come과 to 사이에는 쉼표가 필요 없어요.',
      ],
      explain: 'Can you ~?는 묻는 문장이라 끝에 물음표(?)를 찍어요. 문장 가운데에 쓸데없는 쉼표도 넣지 않아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '이메일을 읽고 물음에 답하세요.\n\n> Dear Grandma,\n> Thank you for the warm scarf. I wear it every day. It\'s my favorite color!\n> I joined the school band last week. I\'m going to play the drum at the school festival. Can you come?\n> Love,\n> Seoyeon\n\n이메일의 내용과 맞지 **않는** 것을 고르세요.',
      choices: ['할머니께 따뜻한 목도리를 받았어요.', '목도리를 매일 해요.', '지난주에 학교 밴드에 들어갔어요.', '학교 축제에서 피아노를 칠 거예요.'],
      answer: 3,
      why: [
        '"Thank you for the warm scarf."와 맞는 내용이에요.',
        '"I wear it every day."와 맞는 내용이에요.',
        '"I joined the school band last week."와 맞는 내용이에요.',
        '',
      ],
      hint: 'I\'m going to play ~.에서 무엇을 연주할지 확인해 보세요.',
      explain: '"I\'m going to play the drum at the school festival."이라고 했으니 서연이는 피아노가 아니라 북(드럼)을 칠 거예요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '이메일에서 대문자나 문장 부호가 **바르지 않은** 줄을 고르세요.\n\n> Dear Jiho,\n> thank you for inviting me.\n> I can come to your party.\n> See you on Saturday.',
      choices: ['Dear Jiho,', 'thank you for inviting me.', 'I can come to your party.', 'See you on Saturday.'],
      answer: 1,
      why: [
        '인사 뒤에 쉼표를 찍고 이름을 대문자로 썼어요. 바른 줄이에요.',
        '',
        'I를 대문자로 쓰고 끝에 마침표를 찍었어요. 바른 줄이에요.',
        '요일 Saturday를 대문자로 쓰고 마침표를 찍었어요. 바른 줄이에요.',
      ],
      hint: '각 줄의 첫 글자를 살펴보세요.',
      explain: '인사(Dear Jiho,) 다음 줄부터 새 문장이 시작돼요. 문장의 첫 글자는 대문자이므로 thank를 Thank로 고쳐야 해요.',
    },
    {
      id: 'a3', level: 3, type: 'short', concept: 3,
      q: 'help를 알맞은 모양으로 바꾸어 빈칸에 쓰세요.\n\nThank you for [[빈칸]] me with my homework.',
      answer: ['helping'],
      wrong: [
        { a: 'help', why: '고마운 것이 "한 일"이면 for 뒤에 -ing를 붙여요: helping' },
        { a: 'helped', why: 'for 뒤에는 지난 일 모양을 쓰지 않고 -ing를 붙여요: helping' },
        { a: 'helpping', why: 'help는 p를 두 번 쓰지 않고 그대로 -ing만 붙여요: helping' },
      ],
      hint: 'Thank you for 뒤에 물건이 아니라 "한 일"이 올 때는 어떤 모양일까요?',
      explain: '숙제를 도와준 "한 일"이 고마운 것이라 for 뒤에 help + -ing를 써요: "Thank you for helping me with my homework."',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 0,
      q: '미나가 지호의 초대에 답장을 썼어요. 빈칸에 알맞은 문장을 고르세요.\n\n> Dear Jiho,\n> Thank you for inviting me. [[빈칸]] I have a swimming lesson on Saturday. I\'m sorry.\n> Have a great party!\n> Your friend, Mina',
      choices: ['But I can\'t come to your party.', 'I\'m going to come to your party.', 'Sure, see you on Saturday.', 'Thank you for helping me.'],
      answer: 0,
      why: [
        '',
        '뒤에 수영 수업이 있다며 미안하다고 했어요. 파티에 갈 수 없는 거예요.',
        '토요일에 수영 수업이 있어서 갈 수 없어요. "Sure."는 간다는 대답이에요.',
        '지호가 미나를 도와준 이야기는 없어요. 초대에 대한 대답을 골라요.',
      ],
      hint: '빈칸 뒤 문장 "I have a swimming lesson on Saturday. I\'m sorry."에서 미나의 대답을 짐작해 보세요.',
      explain: '미나는 토요일에 수영 수업이 있어서 미안하다고 했어요. 그래서 "But I can\'t come to your party.(하지만 네 파티에 갈 수 없어.)"가 알맞아요. 못 갈 때는 이유를 함께 쓰면 예의 바른 답장이 돼요.',
    },
  ],

  deeper: [
    {
      title: '편지와 이메일, 무엇이 다를까요?',
      body: '편지와 이메일은 짜임이 비슷해요. 둘 다 받는 사람에게 인사하고(Dear ~,), 하고 싶은 말을 쓰고, 끝인사와 내 이름으로 마무리해요.\n\n다른 점도 있어요.\n\n| | 편지 | 이메일 |\n|---|---|---|\n| 보내는 방법 | 우체통, 직접 전하기 | 인터넷 |\n| 걸리는 시간 | 며칠 | 바로 |\n| 제목 칸 | 없음 | Subject(제목)가 있음 |\n\n끝인사는 받는 사람에 따라 골라 써요. 친구에게는 **Your friend,**, 가족에게는 **Love,**, 선생님께는 **Thank you,**처럼 써요.\n\n> ⚠️ 이메일에 집 주소나 전화번호 같은 개인 정보를 함부로 쓰지 않아요. 모르는 사람이 보낸 이메일의 링크는 누르지 말고 어른에게 알려요.',
    },
  ],

  faq: [
    {
      q: 'Dear는 "사랑하는"이라는 뜻 아니에요? 선생님께 써도 돼요?',
      a: '이메일이나 편지 첫머리의 Dear는 "~에게, ~께"라는 인사말이에요. 그래서 친구, 가족, 선생님 누구에게나 써요. 예: Dear Ms. Kim,',
    },
    {
      q: '초대를 거절할 때 Sorry, I can\'t.만 쓰면 안 돼요?',
      a: '틀린 말은 아니지만 이유를 덧붙이면 훨씬 예의 바르게 들려요. 예: Sorry, I can\'t. I have to visit my grandma. 마지막에 "Have a great party!"처럼 좋은 말을 더하면 친구도 기분이 좋아요.',
    },
    {
      q: 'Thank you for 뒤에 어떤 때는 the gift, 어떤 때는 helping을 써요. 왜 달라요?',
      a: '고마운 것이 물건이면 the gift, the card처럼 그대로 쓰고, 상대가 해 준 일이면 help → helping, invite → inviting처럼 -ing를 붙여요. for 뒤에는 "무엇"에 해당하는 말이 오기 때문이에요.',
    },
  ],

  mistakes: [
    '묻는 문장 끝에 마침표를 찍는 실수 — "Can you come to my party?"처럼 물음표를 찍어요.',
    '나를 뜻하는 i, 요일(saturday), 이름(mina)을 소문자로 쓰는 실수 — I, Saturday, Mina처럼 대문자로 써요.',
    '"Thank you to the gift."처럼 for 대신 다른 낱말을 쓰는 실수 — 고마운 것 앞에는 for를 써요.',
  ],

  vocab: [
    { w: 'invite', m: '초대하다', ex: 'I want to invite you to my party.', exm: '나는 너를 내 파티에 초대하고 싶어.' },
    { w: 'party', m: '파티', ex: 'The party is at my house.', exm: '파티는 우리 집에서 해요.' },
    { w: 'come', m: '오다', ex: 'Can you come to my party?', exm: '내 파티에 올 수 있니?' },
    { w: 'sure', m: '물론, 그럼', ex: 'Sure. I\'d love to come.', exm: '물론이지. 꼭 갈게.' },
    { w: 'sorry', m: '미안한', ex: 'Sorry, I can\'t. I have a piano lesson.', exm: '미안하지만 못 가. 피아노 수업이 있어.' },
    { w: 'join', m: '가입하다, 함께하다', ex: 'I joined a soccer club.', exm: '나는 축구 동아리에 들어갔어요.' },
    { w: 'club', m: '동아리', ex: 'Our art club meets on Fridays.', exm: '우리 미술 동아리는 금요일마다 모여요.' },
    { w: 'gift', m: '선물', ex: 'Thank you for the gift.', exm: '선물 고마워요.' },
    { w: 'email', m: '이메일', ex: 'I sent an email to my friend.', exm: '나는 친구에게 이메일을 보냈어요.' },
    { w: 'date', m: '날짜', ex: 'What is the date of the party?', exm: '파티 날짜가 언제예요?' },
    { w: 'place', m: '장소', ex: 'The place is the park.', exm: '장소는 공원이에요.' },
    { w: 'Saturday', m: '토요일', ex: 'See you on Saturday.', exm: '토요일에 만나요.' },
    { w: 'soon', m: '곧', ex: 'See you soon.', exm: '곧 만나요.' },
    { w: 'friend', m: '친구', ex: 'Mina is my best friend.', exm: '미나는 내 가장 친한 친구예요.' },
    { w: 'welcome', m: '환영받는 (You\'re welcome. 천만에요.)', ex: 'You\'re welcome.', exm: '천만에요.' },
  ],
});
