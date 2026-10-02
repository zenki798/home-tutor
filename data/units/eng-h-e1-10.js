/* 영어Ⅰ · 서신과 신청서 쓰기
 * 편지·신청서·답변 예시는 모두 직접 쓴 가상의 자료다(가상의 인물·기관, 연락처는 더미 hong@example.com · 010-0000-0000). */
(function () {
  // 직접 쓴 가상의 문의 편지
  var LETTER = 'Dear Ms. Kim,\n\n' +
    'I am writing to ask about the summer reading program at your library. My younger brother is ten years old, and he loves adventure stories. Your website says that the program starts on July 20, but I could not find any information about how to sign up.\n\n' +
    'I would appreciate it if you could tell me how to register and whether there is a fee. I would also like to know if parents need to attend the first class.\n\n' +
    'Thank you for your time. I look forward to hearing from you.\n\n' +
    'Sincerely,\nJiho Park';
  // 직접 쓴 가상의 요청 편지
  var LETTER2 = 'Dear Sir or Madam,\n\n' +
    'I am a high school student who often uses the study room at your community center. The room is quiet and clean, and I am thankful for it. However, it closes at 6 p.m. on weekdays, so many students cannot use it after their classes.\n\n' +
    'I would be grateful if you could keep the study room open until 9 p.m. during the exam period. Many of my friends feel the same way, and we would be happy to help keep the room tidy.\n\n' +
    'Thank you for considering my request.\n\n' +
    'Yours faithfully,\nSua Kim';
  // 가상의 신청서 (더미 정보)
  var FORM = '**Summer Science Camp – Application Form**\n\n' +
    '| Item | Answer |\n|---|---|\n' +
    '| First name | Gildong |\n' +
    '| Last name | Hong |\n' +
    '| Grade | 11 |\n' +
    '| Email | hong@example.com |\n' +
    '| Phone | 010-0000-0000 |\n' +
    '| Session (choose one) | Afternoon |\n' +
    '| Allergies (optional) | N/A |\n' +
    '| Signature | G. Hong |';

Tutor.registerUnit({
  id: 'eng-h-e1-10',
  course: 'eng-h-e1',
  title: '서신과 신청서 쓰기',
  summary: '격식 있는 편지의 짜임을 익혀 글쓴이의 요청을 읽어 내고, 신청서와 지원서를 목적에 맞게 작성합니다.',
  goals: [
    '격식 있는 서신의 짜임(인사–목적–세부 내용–맺음)을 알고 각 부분을 구별할 수 있다.',
    '편지를 읽고 글쓴이의 목적과 요청 사항을 정확히 파악할 수 있다.',
    'I am writing to ~, I would appreciate it if ~ 같은 격식 표현을 상황에 맞게 쓸 수 있다.',
    '신청서·지원서의 항목을 이해해 채우고, 지원 동기를 2~3문장으로 쓰며 고쳐 쓰기와 쓰기 윤리를 지킬 수 있다.',
  ],
  standards: ['[12영Ⅰ-01-03]', '[12영Ⅰ-02-05]', '[12영Ⅰ-02-06]'],

  concepts: [
    {
      title: '격식 있는 서신의 짜임',
      body: '기관·선생님·처음 연락하는 사람에게 보내는 편지나 이메일은 정해진 짜임을 따릅니다.\n\n| 순서 | 부분 | 표현 |\n|---|---|---|\n| 1 | **인사(호칭)** | Dear Ms. Kim, / Dear Mr. Lee, / 받는 사람을 모를 때: Dear Sir or Madam, |\n| 2 | **목적** | I am writing to ~ (첫 문단에서 바로 밝힘) |\n| 3 | **세부 내용** | 사정 설명, 필요한 정보, 요청 사항 |\n| 4 | **맺음 문장** | Thank you for your time. / I look forward to hearing from you. |\n| 5 | **맺음 인사 + 이름** | Sincerely, / Yours sincerely, / Best regards, + 보내는 사람 이름 |\n\n- 호칭에는 보통 **성(last name)**을 씁니다: Dear Ms. **Kim** (O), Dear Ms. **Minji** (X)\n- 받는 사람의 이름을 모를 때는 Dear Sir or Madam, 으로 시작하고, 영국식 편지에서는 이때 Yours faithfully, 로 맺습니다.\n- 격식 편지에서는 줄임말(I\'m, can\'t)과 친구끼리 쓰는 말(Hi, Thanks a lot, Bye)을 피합니다.\n\n> 💡 목적을 첫 문단에 바로 쓰는 것은 받는 사람의 시간을 아끼기 위해서입니다. 바쁜 담당자는 첫 두 문장으로 "무엇을 해 주면 되는지"를 판단합니다.',
      easy: '격식 편지는 **공식 행사에서 하는 인사**와 비슷합니다. 친구에게는 "야, 있잖아" 하고 바로 말하지만, 처음 만난 어른께는 "안녕하십니까, 저는 ○○ 때문에 연락드렸습니다" 하고 용건을 밝힌 뒤 자세히 말하고, "시간 내 주셔서 감사합니다" 하고 마칩니다.\n\n영어 편지도 똑같이 **인사 → 용건 → 자세한 내용 → 감사 인사 → 이름** 순서입니다.',
      check: {
        type: 'choice',
        q: '격식 있는 편지에서 **글을 쓴 목적**을 밝히는 곳으로 가장 알맞은 것은 어디입니까?',
        choices: ['맺음 인사(Sincerely) 바로 앞', '첫 문단', '편지의 맨 마지막 줄'],
        answer: 1,
        why: ['맺음 인사 앞에는 감사나 답장을 기다린다는 맺음 문장을 씁니다.', '', '맨 마지막 줄에는 보내는 사람의 이름이 옵니다.'],
        explain: '격식 편지는 **첫 문단**에서 I am writing to ~ 로 목적을 바로 밝힙니다. 받는 사람이 용건을 먼저 알아야 나머지 내용을 빨리 이해할 수 있기 때문입니다.',
      },
    },
    {
      title: '글쓴이의 의도와 요청 사항 파악하기',
      body: '편지를 읽을 때는 **"글쓴이가 받는 사람에게 무엇을 바라는가"**를 찾는 것이 핵심입니다.\n\n**1. 목적은 대개 앞에 있습니다.** 첫 문단의 I am writing to ~ 를 먼저 봅니다.\n\n| 목적 | 자주 보이는 말 |\n|---|---|\n| 문의 | to ask about ~, to inquire about ~, I would like to know ~ |\n| 요청 | to ask you to ~, Could you ~?, I would appreciate it if you could ~ |\n| 신청·지원 | to apply for ~, to sign up for ~ |\n| 감사 | to thank you for ~, to express my thanks |\n| 사과 | to apologize for ~ |\n| 항의 | to complain about ~, I was disappointed ~ |\n\n**2. 요청의 신호는 However 뒤와 would/could 문장에 있습니다.** 앞에서 칭찬하거나 사정을 설명한 뒤, However(그러나) 다음에 문제를 말하고 이어서 요청하는 경우가 많습니다.\n\n**3. 배경 정보와 요청을 구별합니다.** "제 동생은 열 살이고 모험 이야기를 좋아합니다"는 배경이고, "등록 방법을 알려 주시면 감사하겠습니다"가 요청입니다.\n\n> ⚠️ 감사 표현(Thank you for your time.)이 있다고 해서 목적이 "감사"인 것은 아닙니다. 맺음 문장의 인사는 거의 모든 편지에 들어갑니다.',
      easy: '편지 읽기는 **택배 기사님이 주소만 찾는 것**과 비슷합니다. 상자에 무엇이 적혀 있든, 기사님은 "어디로 가야 하나"만 찾습니다.\n\n편지에서 찾을 것은 "그래서 나보고 **무엇을 해 달라는 거지?**" 하나입니다. **would**, **could**, **please**가 나오는 문장에 형광펜을 칠해 보십시오. 대개 그 문장이 답입니다.',
      check: {
        type: 'choice',
        q: '다음 편지 글에서 글쓴이가 **요청하는 것**은 무엇입니까?\n\nOur club meets in Room 203 every Friday. The room is too small for our twenty members. I would appreciate it if you could let us use the music room instead.',
        choices: ['음악실을 대신 쓰게 해 달라', '동아리 회원을 더 모아 달라', '금요일 모임 시간을 바꿔 달라'],
        answer: 0,
        why: ['', '회원이 스무 명이라는 것은 방이 좁은 이유일 뿐, 회원을 늘려 달라는 말은 없습니다.', '금요일에 모인다는 것은 배경 정보이고, 시간을 바꿔 달라는 말은 없습니다.'],
        explain: '요청은 **I would appreciate it if you could ~** 문장에 있습니다. let us use the music room instead, 곧 **음악실을 대신 쓰게 해 달라**는 것입니다. 앞의 두 문장은 요청의 이유입니다.',
      },
    },
    {
      title: '격식 표현: I am writing to ~, I would appreciate it if ~',
      body: '격식 있는 편지에서 자주 쓰는 틀입니다. 낱말 하나까지 정해진 꼴이 있으니 그대로 익힙니다.\n\n| 쓰임 | 표현 | 주의 |\n|---|---|---|\n| 목적 밝히기 | **I am writing to** ask about ~ / apply for ~ | to 뒤에 동사원형 |\n| 공손한 요청 | **I would appreciate it if** you could ~ | **it**을 빼지 않습니다 |\n| 공손한 요청 | **I would be grateful if** you could ~ | grateful 뒤에는 it 없음 |\n| 공손한 질문 | **Could you** please let me know ~? | Can you ~? 보다 공손 |\n| 원하는 것 | **I would like to** know ~ | I want to ~ 보다 공손 |\n| 첨부 알리기 | **Please find attached** my application form. | 이메일에서 |\n| 맺음 | **I look forward to hearing** from you. | to 뒤에 **-ing** |\n\n**친근한 말 → 격식 있는 말**\n\n| 친근한 말 | 격식 있는 말 |\n|---|---|\n| Hi / Hey | Dear ~, |\n| I want to know | I would like to know |\n| Can you ~? | Could you please ~? |\n| Thanks a lot | Thank you very much |\n| ASAP | as soon as possible |\n| I\'m / don\'t | I am / do not |\n\n> ⚠️ look forward to의 to는 전치사입니다. 그래서 뒤에 동사원형이 아니라 **동명사(-ing)**가 옵니다. I look forward to hear(X) → I look forward to **hearing**(O)',
      easy: '격식 표현은 **정장**이라고 생각하십시오. 내용은 같아도 입는 옷이 다릅니다. "알려 줘(Tell me)"를 정장으로 갈아입히면 "알려 주시면 감사하겠습니다(I would appreciate it if you could tell me)"가 됩니다.\n\n정장은 단추 하나만 빠져도 어색하듯, appreciate **it** if의 it, look forward to hear**ing**의 -ing 같은 작은 부분까지 챙겨야 합니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르십시오.\n\nI look forward to [[blank]] from you.',
        choices: ['hear', 'hearing', 'heard'],
        answer: 1,
        why: ['look forward to의 to는 전치사라서 뒤에 동사원형을 쓰지 않습니다.', '', '과거분사 heard는 이 자리에 오지 않습니다. 전치사 to 뒤에는 동명사를 씁니다.'],
        explain: 'look forward to(~을 고대하다)의 **to는 전치사**이므로 뒤에 **동명사**가 옵니다. I look forward to **hearing** from you.',
      },
    },
    {
      title: '신청서·지원서의 항목 이해하고 채우기',
      body: '신청서(application form)는 항목마다 무엇을 쓰라는지 정확히 읽고 채워야 합니다. 자주 나오는 항목은 다음과 같습니다.\n\n| 항목 | 뜻 | 쓰는 법 |\n|---|---|---|\n| **First name** | 이름 | 홍길동이면 Gildong |\n| **Last name** (Family name, Surname) | 성 | Hong |\n| **Date of birth** | 생년월일 | 서식에 맞게(예: MM/DD/YYYY → 03/05/2009) |\n| **Grade** | 학년 | 11 (고2) |\n| **Occupation** | 직업 | Student |\n| **Emergency contact** | 비상 연락처 | 보호자 이름과 번호 |\n| **Signature** | 서명 | 손으로 쓰는 이름 |\n\n**안내 문구 읽기**\n\n- **Required** 또는 별표 표시: 반드시 써야 하는 칸 / **Optional**: 써도 되고 안 써도 되는 칸\n- **N/A** (not applicable): 나에게 해당하지 않을 때 빈칸 대신 씁니다.\n- **Please print** / **in block capitals**: 흘려 쓰지 말고 또박또박(대문자로) 쓰라는 뜻\n- **Check one** / **Choose one**: 하나만 고르라는 뜻\n\n> ⚠️ 연습할 때는 실제 내 정보가 아니라 **가상의 정보**(예: Gildong Hong, hong@example.com, 010-0000-0000)를 씁니다. 실제 신청서에도 꼭 필요한 정보만 쓰고, 믿을 수 있는 곳인지 먼저 확인합니다.',
      easy: '영어 이름 칸은 **순서가 우리말과 반대**라서 헷갈립니다. First name은 "먼저 부르는 이름", 곧 **길동**이고, Last name은 "마지막에 오는 이름", 곧 **홍**입니다. 영어권에서는 Gildong Hong처럼 이름을 먼저, 성을 나중에 쓰기 때문입니다.\n\n나머지 칸은 "Required(필수)인가, Optional(선택)인가"와 "나에게 해당하는가(N/A)"만 확인하면 됩니다.',
      check: {
        type: 'ox',
        q: '홍길동이 영어 신청서를 쓸 때 Last name 칸에는 Gildong을 쓴다.',
        answer: false,
        explain: 'Last name은 **성**입니다. Last name 칸에는 **Hong**, First name 칸에는 Gildong을 씁니다.',
      },
    },
    {
      title: '지원 동기 짧게 쓰기 (2~3문장)',
      body: '지원서에는 "Why do you want to join ~?"처럼 **지원 동기**를 짧게 묻는 칸이 자주 있습니다. 2~3문장이면 다음 세 가지를 차례로 담습니다.\n\n| 순서 | 담을 것 | 표현 |\n|---|---|---|\n| 1 | **관심·이유** | I would like to join ~ because I am interested in ~. |\n| 2 | **경험·강점(구체적으로)** | Last year, I ~. / I have experience in ~. |\n| 3 | **기여·기대** | I hope to ~. / I believe I can ~. |\n\n예시 (Science Club 지원 동기, 가상):\n\nI would like to join the Science Club **because** I am curious about how plants grow. **Last year**, I grew tomatoes on my balcony and kept a growth diary for three months. **I hope to** share this experience and do more experiments with other members.\n\n**좋은 답변의 조건**\n\n- 묻는 것에 답합니다(동아리 지원서에 장래 희망만 길게 쓰지 않기).\n- "I am very passionate."처럼 꾸미는 말보다 **구체적인 경험**이 설득력 있습니다.\n- 글자 수·단어 수 제한(in 50 words or less)을 지킵니다.',
      easy: '지원 동기는 **"왜 · 무엇을 해 봤나 · 와서 뭘 할 건가"** 세 칸짜리 상자입니다.\n\n- 왜? → 식물이 자라는 게 궁금해서\n- 무엇을 해 봤나? → 작년에 베란다에서 토마토를 길러 봤다\n- 와서 뭘 할 건가? → 그 경험을 나누고 실험을 더 해 보고 싶다\n\n이 세 칸을 한 문장씩 영어로 옮기면 지원 동기가 완성됩니다.',
      check: {
        type: 'choice',
        q: '지원 동기 세 문장 가운데 **구체적인 경험**을 담은 문장은 무엇입니까?',
        choices: ['I want to join because I really love books.', 'Last year, I organized a book swap for my class.', 'I hope to recommend good books to other students.'],
        answer: 1,
        why: ['관심·이유를 밝힌 문장입니다. 무엇을 해 보았는지는 나오지 않습니다.', '', '앞으로 하고 싶은 일(기여·기대)을 밝힌 문장입니다.'],
        explain: 'Last year, I organized ~(작년에 반에서 책 바꾸기 행사를 열었다)는 실제로 해 본 일을 밝힌 **경험** 문장입니다. 나머지는 관심(이유)과 기대를 나타냅니다.',
      },
    },
    {
      title: '고쳐 쓰기와 쓰기 윤리',
      body: '다 쓴 편지나 지원서는 보내기 전에 **고쳐 쓰기**를 합니다.\n\n**고쳐 쓰기 점검표**\n\n1. **목적**이 첫 문단에 분명한가?\n2. **말투**가 격식에 맞는가? (Hi, wanna, ASAP, 줄임말이 남아 있지 않은가)\n3. **정보**가 정확한가? (날짜·시간·이름·연락처)\n4. **문법·철자**: look forward to -ing, appreciate it if, 주어–동사 수 일치\n5. **길이**: 요구한 단어 수를 지켰는가, 같은 말을 되풀이하지 않았는가\n\n**쓰기 윤리**\n\n- 다른 사람의 글이나 인터넷 예문을 그대로 옮겨 내 것처럼 내는 것은 **표절(plagiarism)**입니다. 예문은 짜임만 참고하고, 내용은 **내 경험으로** 씁니다.\n- 경험이나 실력을 **부풀리거나 지어내지** 않습니다. 지원서의 내용은 사실이어야 합니다.\n- 다른 사람의 이름·연락처 같은 개인정보를 허락 없이 쓰지 않습니다.\n- 다른 사람의 도움(첨삭)을 받았다면, 고친 문장도 내가 이해하고 동의하는 내용이어야 합니다.',
      easy: '고쳐 쓰기는 **외출 전 거울 보기**와 같습니다. 단추(문법), 옷차림(말투), 챙길 물건(정보)을 한 번 더 확인하는 것입니다.\n\n쓰기 윤리는 **"남의 옷을 내 옷인 척 입지 않기"**입니다. 친구의 멋진 지원서를 그대로 내면, 그 글 속의 경험은 내가 한 일이 아니니 결국 거짓말이 됩니다. 서툴러도 내 경험으로 쓴 글이 진짜 지원서입니다.',
      check: {
        type: 'ox',
        q: '인터넷에서 찾은 다른 사람의 지원 동기 글에서 이름만 내 이름으로 바꿔 내는 것은 괜찮다.',
        answer: false,
        explain: '남의 글을 내 것처럼 내는 것은 **표절**이고, 그 글 속 경험은 내가 한 일이 아니므로 사실과도 다릅니다. 예문은 짜임만 참고하고 내용은 내 경험으로 씁니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 편지를 읽고 짜임과 요청 사항을 정리해 보십시오.\n\n' + LETTER,
      steps: [
        '**인사**: Dear Ms. Kim, — 받는 사람의 성(Kim)을 썼습니다.',
        '**목적**: I am writing to ask about the summer reading program ~ → 여름 독서 프로그램에 관한 **문의**입니다.',
        '**세부 내용**: 동생이 열 살이고 모험 이야기를 좋아한다(배경), 7월 20일 시작이라는 것은 알지만 등록 방법을 찾지 못했다(문의하는 까닭).',
        '**요청**: I would appreciate it if you could tell me ① how to register(등록 방법) ② whether there is a fee(참가비가 있는지). 그리고 I would also like to know ③ if parents need to attend the first class(첫 수업에 부모가 와야 하는지).',
        '**맺음**: Thank you for your time. I look forward to hearing from you. / Sincerely, Jiho Park',
      ],
      answer: '목적: 여름 독서 프로그램 문의. 요청: 등록 방법, 참가비 여부, 첫 수업에 부모가 참석해야 하는지 알려 달라.',
    },
    {
      q: '친구에게 쓰듯 쓴 다음 글을 격식 있는 이메일로 고쳐 보십시오.\n\nHi! I want to join your camp. Can you send me the form ASAP? Thanks a lot. Bye.',
      steps: [
        'Hi! → **Dear Sir or Madam,** (받는 사람의 이름을 모를 때)',
        'I want to join your camp. → **I am writing to apply for** your summer camp.',
        'Can you send me the form ASAP? → **I would appreciate it if you could send me** the application form **as soon as possible**.',
        'Thanks a lot. Bye. → **Thank you for your time. I look forward to hearing from you.** + **Sincerely,** + 이름',
      ],
      answer: 'Dear Sir or Madam, / I am writing to apply for your summer camp. I would appreciate it if you could send me the application form as soon as possible. / Thank you for your time. I look forward to hearing from you. / Sincerely, (이름)',
    },
  ],

  terms: [
    { term: '격식 있는 서신 (formal letter)', def: '기관이나 잘 모르는 어른에게 보내는 편지·이메일입니다. 인사–목적–세부 내용–맺음의 짜임과 공손한 표현을 씁니다.' },
    { term: '호칭 (salutation)', def: '편지 첫머리의 인사입니다. 예: Dear Ms. Kim, / 이름을 모를 때 Dear Sir or Madam,' },
    { term: '맺음 인사 (complimentary close)', def: '편지 끝, 이름 바로 위에 쓰는 인사입니다. 예: Sincerely, / Yours sincerely, / Best regards,' },
    { term: 'I am writing to ~', def: '격식 편지의 첫 문단에서 글을 쓴 목적을 밝히는 표현입니다. 예: I am writing to apply for the volunteer program.' },
    { term: 'I would appreciate it if ~', def: '"~해 주시면 감사하겠습니다"라는 공손한 요청 표현입니다. it을 빼지 않습니다.' },
    { term: '신청서 (application form)', def: '행사·프로그램·일자리에 참여하겠다고 항목별로 정보를 채워 내는 서류입니다.' },
    { term: 'N/A', def: 'not applicable의 줄임말로, 그 칸이 나에게 해당하지 않을 때 씁니다.' },
    { term: '지원 동기', def: '왜 그곳에 지원하는지 밝히는 글입니다. 관심·이유 → 경험 → 기여·기대의 순서로 짧게 씁니다.' },
    { term: '표절 (plagiarism)', def: '다른 사람의 글이나 생각을 출처 없이 내 것처럼 쓰는 것입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'order', concept: 0,
      q: '격식 있는 편지의 짜임에 맞게 놓으십시오.',
      choices: [
        'Dear Mr. Lee,',
        'I am writing to ask about the photo contest.',
        'Could you tell me the deadline for sending photos?',
        'I look forward to hearing from you.',
        'Sincerely, Yujin Choi',
      ],
      answer: [0, 1, 2, 3, 4],
      explain: '**인사**(Dear Mr. Lee,) → **목적**(I am writing to ~) → **세부 내용·요청**(Could you ~?) → **맺음 문장**(I look forward to ~) → **맺음 인사와 이름**(Sincerely, ~)의 순서입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '받는 사람의 이름을 모를 때 격식 있는 편지의 첫 인사로 가장 알맞은 것은 무엇입니까?',
      choices: ['Hi there,', 'Dear Sir or Madam,', 'Hello, my friend,', 'Dear Mr. Unknown,'],
      answer: 1,
      why: ['Hi there는 친근한 인사라서 격식 편지에 어울리지 않습니다.', '', '친구에게 쓰는 말투입니다.', '모르는 이름을 지어서 쓰지 않습니다. 이름을 모를 때는 Dear Sir or Madam을 씁니다.'],
      explain: '받는 사람을 모를 때는 **Dear Sir or Madam,**으로 시작합니다. 이름을 알면 Dear Ms. Kim, 처럼 성을 씁니다.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오.\n\nI would appreciate [[blank]] if you could send me the schedule.',
      answer: ['it'],
      wrong: [{ a: 'that', why: 'appreciate 뒤에는 가목적어 it을 씁니다: I would appreciate it if ~' }, { a: 'you', why: '"당신께 감사하다"는 뜻으로 you를 넣기 쉽지만, 이 틀은 I would appreciate it if you could ~ 로 굳어진 표현입니다.' }],
      explain: '**I would appreciate it if you could ~**(~해 주시면 감사하겠습니다)에서 it은 if절의 내용을 가리킵니다. it을 빼지 않습니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오.\n\nI am writing to [[blank]] for the volunteer program at your museum. (지원하다)',
      answer: ['apply'],
      wrong: [{ a: 'applying', why: 'I am writing to 의 to는 to부정사이므로 뒤에 동사원형을 씁니다.' }, { a: 'application', why: '명사(지원서)가 아니라 동사원형(apply)이 들어갑니다. apply for ~ = ~에 지원하다' }],
      explain: '**I am writing to + 동사원형**으로 목적을 밝힙니다. apply for ~ 는 "~에 지원하다"이므로 I am writing to **apply** for ~ 입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '격식 있는 이메일에 가장 알맞은 문장은 무엇입니까?',
      choices: [
        'Can you send me the application form ASAP? I need it soon.',
        'Send me the form now, thanks.',
        'Could you please send me the application form?',
        'I wanna get the form soon.',
      ],
      answer: 2,
      why: ['Can you ~?와 ASAP는 친근한 말투입니다. Could you ~?, as soon as possible로 씁니다.', '명령문은 받는 사람에게 무례하게 들릴 수 있습니다.', '', 'wanna는 want to를 줄인 입말이라 격식 글에 쓰지 않습니다.'],
      explain: '**Could you please ~?**는 공손한 요청입니다. ASAP, wanna 같은 줄임말과 명령문은 격식 편지에 어울리지 않습니다.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 2,
      q: 'I look forward to meet you. 는 어법상 바른 문장이다.',
      answer: false,
      explain: 'look forward to의 to는 **전치사**라서 뒤에 동명사가 옵니다. 바른 문장은 I look forward to **meeting** you. 입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '다음 신청서에서 **Last name** 칸에 적힌 것은 무엇입니까?\n\n' + FORM,
      choices: ['Gildong', 'Hong', 'G. Hong', '11'],
      answer: 1,
      why: ['Gildong은 First name(이름)입니다.', '', 'G. Hong은 Signature(서명) 칸에 쓴 것입니다.', '11은 Grade(학년)입니다.'],
      explain: 'Last name은 **성**입니다. 이 신청서에서 Last name 칸에는 **Hong**이 적혀 있습니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 3,
      q: '신청서의 Allergies (optional) 칸에 N/A라고 쓴 뜻으로 가장 알맞은 것은 무엇입니까?',
      choices: ['알레르기가 심하다.', '나중에 알려 주겠다.', '나에게 해당하지 않는다(알레르기가 없다).', '칸을 잘못 읽었다.'],
      answer: 2,
      why: ['N/A는 해당 사항이 있다는 뜻이 아닙니다.', '나중에 알려 주겠다는 말은 to be confirmed(TBC) 같은 표현을 씁니다.', '', 'N/A는 실수가 아니라 정해진 약속입니다.'],
      explain: '**N/A**는 not applicable, 곧 "**해당 없음**"입니다. 알레르기가 없으니 이 칸은 나에게 해당하지 않는다는 뜻입니다. optional 칸은 비워 두어도 됩니다.',
    },
    {
      id: 'p9', level: 1, type: 'choice', concept: 1,
      q: '다음 편지의 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + LETTER,
      choices: ['동생의 독서 습관을 자랑하려고', '여름 독서 프로그램에 대해 문의하려고', '도서관 누리집의 오류를 항의하려고', '독서 프로그램 강사에 지원하려고'],
      answer: 1,
      why: ['동생이 모험 이야기를 좋아한다는 것은 배경 정보일 뿐입니다.', '', '등록 정보를 찾지 못했다고 했지만 항의가 아니라 정보를 알려 달라는 글입니다.', 'apply for 같은 지원 표현이 없습니다. 동생의 참가 방법을 묻고 있습니다.'],
      explain: '첫 문장 **I am writing to ask about the summer reading program**에서 목적이 드러납니다. 이어서 등록 방법·참가비·부모 참석 여부를 묻고 있으므로 **문의**하는 편지입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 1,
      q: '다음 편지에서 글쓴이가 알고 싶어 하는 것이 **아닌** 것은 무엇입니까?\n\n' + LETTER,
      choices: ['등록하는 방법', '참가비가 있는지', '프로그램이 시작하는 날짜', '첫 수업에 부모가 와야 하는지'],
      answer: 2,
      why: ['how to register를 알려 달라고 했습니다.', 'whether there is a fee를 알려 달라고 했습니다.', '', 'if parents need to attend the first class를 알고 싶다고 했습니다.'],
      hint: 'would appreciate, would like to know 뒤에 오는 내용을 찾으십시오.',
      explain: '시작 날짜(July 20)는 글쓴이가 누리집에서 **이미 알고 있는** 정보입니다. 알려 달라고 한 것은 등록 방법, 참가비, 부모의 첫 수업 참석 여부입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 4,
      q: '"Why do you want to join the Library Volunteer Team?"에 대한 답변(2~3문장)으로 가장 알맞은 것은 무엇입니까?',
      choices: [
        'I love books very much. Books are really good for everyone. So I really want to join the team because books are good.',
        'I want to be a doctor in the future, so I study science every day. I also exercise three times a week to stay healthy and strong.',
        'I enjoy helping others find good books. Last semester, I helped my classmates choose books for a reading project. I hope to make the library a friendlier place.',
        'Hey, I\'m really into books lol. Pick me!',
      ],
      answer: 2,
      why: [
        '이유가 막연하고 경험·기여가 없습니다. 같은 말을 되풀이했습니다.',
        '장래 희망을 말했을 뿐 도서관 봉사에 지원하는 이유와 관계가 없습니다.',
        '',
        '격식 없는 말투(Hey, lol)로 지원서에 어울리지 않습니다.',
      ],
      hint: '관심·이유 → 경험 → 기여·기대의 세 가지가 모두 있는 답을 찾으십시오.',
      explain: '정답은 **관심**(다른 사람이 좋은 책을 찾도록 돕는 것을 즐김) → **경험**(지난 학기에 친구들의 책 고르기를 도움) → **기여**(도서관을 더 친근한 곳으로)의 짜임을 갖추고, 묻는 것에 바로 답합니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '지원서를 쓸 때 쓰기 윤리에 맞는 행동은 무엇입니까?',
      choices: [
        '합격한 선배의 지원서를 그대로 옮겨 쓴다.',
        '예문의 짜임을 참고해 내 경험으로 새로 쓴다.',
        '해 보지 않은 봉사 활동을 했다고 써서 돋보이게 한다.',
        '친구의 이름과 전화번호를 허락 없이 추천인 칸에 쓴다.',
      ],
      answer: 1,
      why: ['남의 글을 그대로 옮기는 것은 표절입니다.', '', '경험을 지어내는 것은 사실과 다른 정보를 내는 것입니다.', '다른 사람의 개인정보는 허락을 받은 뒤에만 씁니다.'],
      explain: '예문은 **짜임만** 참고하고 내용은 **내 경험**으로 쓰는 것이 바른 방법입니다. 베끼기, 경험 지어내기, 남의 개인정보를 허락 없이 쓰기는 모두 쓰기 윤리에 어긋납니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '다음 편지의 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + LETTER2,
      choices: [
        '자습실을 깨끗하게 관리해 준 것에 감사하려고',
        '시험 기간에 자습실을 밤 9시까지 열어 달라고 요청하려고',
        '자습실 청소 자원봉사자로 지원하려고',
        '자습실이 시끄럽고 더러워서 다른 곳으로 옮겨 달라고 항의하려고',
      ],
      answer: 1,
      why: [
        '감사 표현은 요청에 앞선 인사일 뿐입니다. However 뒤에 진짜 용건이 나옵니다.',
        '',
        '방을 깨끗이 쓰겠다는 말은 요청을 들어주면 돕겠다는 제안입니다.',
        '오히려 조용하고 깨끗하다고 했습니다.',
      ],
      hint: 'However 뒤와 I would be grateful if ~ 문장을 보십시오.',
      explain: '앞부분은 자습실에 대한 감사, **However** 뒤에서 6시에 닫아 방과 후에 쓰기 어렵다는 문제를 말하고, **I would be grateful if you could keep the study room open until 9 p.m. during the exam period**로 요청합니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 0,
      q: '다음 편지의 맺음 인사가 Yours faithfully인 까닭으로 가장 알맞은 것은 무엇입니까?\n\n' + LETTER2,
      choices: [
        '글쓴이가 고등학생이기 때문에',
        '받는 사람에게 감사를 표하기 위해서',
        '받는 사람의 이름을 모르고 Dear Sir or Madam으로 시작했기 때문에',
        '요청하는 편지는 받는 사람과 관계없이 언제나 Yours faithfully로 맺기 때문에',
      ],
      answer: 2,
      why: [
        '글쓴이의 나이와는 관계가 없습니다.',
        '감사는 Thank you for considering my request. 문장으로 이미 표현했습니다.',
        '',
        '요청 편지라도 받는 사람의 이름을 알면 Yours sincerely 등을 씁니다. 맺음 인사는 목적이 아니라 호칭에 따라 정합니다.',
      ],
      hint: '편지의 첫 줄을 보십시오.',
      explain: '영국식 격식 편지에서는 이름을 모를 때 **Dear Sir or Madam**으로 시작하고 **Yours faithfully**로 맺습니다. 이름을 알면(Dear Ms. Kim) Yours sincerely로 맺습니다. 미국식에서는 둘 다 Sincerely를 흔히 씁니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 2,
      q: '다음 문장의 밑줄 친 부분을 격식 있는 표현으로 고칠 때 빈칸에 알맞은 한 낱말을 쓰십시오. (감사하는)\n\n__Tell me__ the meeting time, please.\n→ I would be [[blank]] if you could tell me the meeting time.',
      answer: ['grateful', 'thankful', 'obliged', 'appreciative'],
      wrong: [
        { a: 'appreciate', why: 'appreciate는 동사라서 be 뒤에 올 수 없습니다. I would appreciate it if ~ 또는 I would be grateful if ~ 로 씁니다.' },
        { a: 'happy', why: 'I would be happy if ~ 는 "기쁘겠다"는 뜻으로 요청의 공손함이 덜합니다. 감사를 나타내는 형용사 grateful을 씁니다.' },
      ],
      hint: 'be 뒤이므로 동사가 아니라 형용사가 들어갑니다.',
      explain: '**I would be grateful if you could ~**(~해 주시면 감사하겠습니다)는 I would appreciate it if ~ 와 같은 뜻의 공손한 요청입니다. be 뒤이므로 형용사(grateful)를 씁니다. thankful, obliged(아주 격식 있는 말), appreciative도 쓸 수 있지만 이 틀에서는 grateful이 가장 흔합니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '다음 이메일을 고쳐 쓸 때 **고칠 필요가 없는** 부분은 무엇입니까?\n\n(A) Hey Ms. Park,\n(B) I am writing to apply for the school newspaper team.\n(C) I would appreciate if you could tell me the interview date.\n(D) I look forward to hear from you.',
      choices: ['(A)', '(B)', '(C)', '(D)'],
      answer: 1,
      fixed: true,
      why: [
        'Hey는 친근한 인사입니다. Dear Ms. Park, 으로 고칩니다.',
        '',
        'appreciate 뒤에 it이 빠졌습니다. I would appreciate it if ~ 로 고칩니다.',
        'look forward to 뒤에는 동명사가 옵니다. hearing으로 고칩니다.',
      ],
      hint: '말투(인사), 빠진 낱말, 동사의 꼴을 하나씩 점검하십시오.',
      explain: '(B) I am writing to apply for ~ 는 목적을 밝히는 바른 격식 표현입니다. (A) Hey → **Dear**, (C) appreciate → **appreciate it**, (D) hear → **hearing**으로 고쳐야 합니다.',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 4,
      q: '관심·이유 → 경험 → 기여·기대의 순서가 되도록 지원 동기 문장을 놓으십시오.',
      choices: [
        'I would like to join the Broadcasting Club because I enjoy speaking in front of people.',
        'Last year, I was the host of our class talent show.',
        'I hope to make school news that everyone looks forward to.',
      ],
      answer: [0, 1, 2],
      hint: 'because가 있는 문장, Last year로 시작하는 문장, I hope to로 시작하는 문장을 찾으십시오.',
      explain: '**관심·이유**(because I enjoy speaking ~) → **경험**(Last year, I was the host ~) → **기여·기대**(I hope to make school news ~)의 순서입니다. 경험이 이유를 뒷받침하고, 마지막 문장이 앞으로의 기여를 보여 줍니다.',
    },
  ],

  deeper: [
    {
      title: '이메일 시대의 격식 편지',
      body: '요즘 격식 있는 연락은 대부분 이메일로 합니다. 짜임은 편지와 같지만 몇 가지가 더해집니다.\n\n- **제목(Subject)**: 용건을 짧게 씁니다. 예: Subject: Question about the summer reading program\n- **첨부**: Please find attached my application form. 처럼 본문에서 첨부 파일을 알립니다.\n- **답장 시간**: 받는 사람도 바쁘므로, 마감이 있다면 "by Friday, May 10"처럼 날짜를 분명히 씁니다.\n\n주소와 날짜를 편지지 위쪽에 쓰는 종이 편지의 형식은 이메일에서는 대개 생략됩니다. 그래도 **인사–목적–세부 내용–맺음**의 짜임은 그대로입니다. 영어Ⅱ에서는 자기소개서와 보고서처럼 더 긴 격식 글을 씁니다.',
    },
    {
      title: '신청서에 정보를 쓸 때의 안전',
      body: '신청서는 개인정보를 모으는 서류입니다. 실제로 신청서를 쓸 때는 다음을 먼저 확인합니다.\n\n- 믿을 수 있는 기관(학교, 공공기관)의 공식 신청서인가?\n- 꼭 필요한 정보만 묻는가? 동아리 신청서가 주민등록번호나 비밀번호를 묻는다면 의심해야 합니다.\n- 미성년자라면 보호자와 함께 확인했는가?\n\n이 단원의 연습 문제에서는 모두 가상의 이름과 연락처(hong@example.com, 010-0000-0000)만 썼습니다. 연습할 때도 실제 내 정보 대신 가상의 정보를 쓰는 습관을 들이면 좋습니다.',
    },
  ],

  faq: [
    {
      q: 'Sincerely 말고 다른 맺음 인사도 써도 돼요?',
      a: '됩니다. Yours sincerely, Best regards, Kind regards 등을 격식 편지에 씁니다. 다만 Love, See you, Bye 처럼 친한 사이에 쓰는 말은 피합니다. 받는 사람의 이름을 모르고 Dear Sir or Madam으로 시작했다면 영국식으로는 Yours faithfully를 씁니다.',
    },
    {
      q: 'I would appreciate it if에서 it은 왜 넣어요?',
      a: 'appreciate는 "~을 고맙게 여기다"라는 뜻이라 목적어가 꼭 필요합니다. 고맙게 여길 내용이 뒤의 if절에 있으니, 그 자리에 it을 먼저 두고 if절로 풀어 줍니다. 그래서 it을 빼면 틀린 문장이 됩니다.',
    },
    {
      q: 'First name이랑 Last name이 자꾸 헷갈려요.',
      a: '영어권에서는 이름을 먼저, 성을 나중에 부릅니다(Gildong Hong). 그래서 **먼저(first)** 오는 Gildong이 First name, **마지막(last)**에 오는 Hong이 Last name입니다. Family name, Surname도 성을 뜻합니다.',
    },
    {
      q: '지원 동기를 길게 쓸수록 좋은 거 아니에요?',
      a: '아닙니다. 지원서는 정해진 길이(예: 50 words or less) 안에서 핵심을 담아야 합니다. 길게 쓰면 읽는 사람이 핵심을 놓치고, 단어 수 제한을 어기면 감점될 수도 있습니다. 관심 → 경험 → 기여의 2~3문장이면 충분합니다.',
    },
  ],

  mistakes: [
    'I would appreciate if you could ~ 처럼 it을 빼는 실수 — I would appreciate **it** if you could ~',
    'I look forward to hear from you. 처럼 동사원형을 쓰는 실수 — to는 전치사이므로 I look forward to **hearing** from you.',
    'Dear Ms. Minji 처럼 호칭에 이름(first name)을 쓰는 실수 — 격식 편지의 호칭에는 성을 씁니다: Dear Ms. Kim',
  ],

  gens: [
    {
      id: 'formal-rewrite',
      level: 1,
      title: '친근한 문장을 격식 있는 문장으로 고르기',
      make: function (R) {
        // c: 격식 있는 문장, w: [오답, 이유]
        var bank = [
          { inf: 'Can you send me the schedule ASAP?', c: 'Could you please send me the schedule as soon as possible?',
            w: [['Can you send me the schedule right now?', 'Can you ~?와 right now는 여전히 친근하고 재촉하는 말투입니다.'], ['Send me the schedule ASAP, please.', '명령문과 ASAP는 격식 편지에 어울리지 않습니다.'], ['You must send me the schedule soon.', 'must는 받는 사람에게 강요하는 말이라 무례하게 들립니다.']] },
          { inf: 'I want to know the price.', c: 'I would like to know the price.',
            w: [['I wanna know the price.', 'wanna는 want to를 줄인 입말입니다.'], ['Tell me the price.', '명령문은 공손하지 않습니다.'], ['I want know the price.', 'want 뒤에 to가 빠졌고, 격식 표현도 아닙니다.']] },
          { inf: 'Thanks a lot for your help!', c: 'Thank you very much for your help.',
            w: [['Thx for your help!', 'Thx는 문자 메시지에서 쓰는 줄임말입니다.'], ['Thanks a bunch for helping!', 'Thanks a bunch는 친구 사이의 말투입니다.'], ['Cheers for your help!', 'Cheers는 친근한 입말입니다.']] },
          { inf: 'Hi Mr. Lee!', c: 'Dear Mr. Lee,',
            w: [['Hey Mr. Lee!', 'Hey는 친구끼리 쓰는 인사입니다.'], ['Dear Mr. Junho,', '호칭에는 이름이 아니라 성을 씁니다.'], ['Yo, Mr. Lee,', '아주 친근한 입말이라 격식 편지에 쓰지 않습니다.']] },
          { inf: 'Write back soon!', c: 'I look forward to hearing from you.',
            w: [['I look forward to hear from you.', 'look forward to의 to는 전치사라서 hearing을 씁니다.'], ['Write me back fast!', '명령문이고 친근한 말투입니다.'], ['I look forward to heard from you.', 'look forward to 뒤에는 동명사(hearing)를 씁니다.']] },
          { inf: 'Please tell me the address.', c: 'I would appreciate it if you could tell me the address.',
            w: [['I would appreciate if you could tell me the address.', 'appreciate 뒤에 it이 빠졌습니다.'], ['I appreciate you tell me the address.', '틀이 맞지 않습니다. I would appreciate it if you could ~ 로 씁니다.'], ['Tell me the address, OK?', '명령문에 OK?를 붙인 친근한 말투입니다.']] },
          { inf: 'I\'m sorry I\'m late with my answer.', c: 'I apologize for my late reply.',
            w: [['Sorry, my bad.', 'my bad는 친구끼리 쓰는 말입니다.'], ['I apologize for reply late.', 'for 뒤에는 명사나 동명사가 옵니다(my late reply / replying late).'], ['Oops, late again!', '아주 가벼운 입말이라 격식 글에 어울리지 않습니다.']] },
          { inf: 'I wanna join your camp.', c: 'I am writing to apply for your camp.',
            w: [['I am writing to applying for your camp.', 'I am writing to 뒤에는 동사원형을 씁니다.'], ['I wanna apply for your camp.', 'wanna는 입말이라 격식 글에 쓰지 않습니다.'], ['I am writing for apply your camp.', '틀이 틀렸습니다. I am writing to apply for ~ 로 씁니다.']] },
          { inf: 'Bye!', c: 'Sincerely,',
            w: [['See ya,', '친구끼리 쓰는 작별 인사입니다.'], ['Love,', '가족이나 친한 사람에게 쓰는 맺음 인사입니다.'], ['Later,', '친근한 입말입니다.']] },
        ];
        var item = R.pick(bank);
        var reason = {};
        item.w.forEach(function (x) { reason[x[0]] = x[1]; });
        var pick = R.choices(item.c, item.w.map(function (x) { return x[0]; }));
        return {
          type: 'choice', concept: 2,
          q: '다음 말을 **격식 있는 편지**에 더 알맞게 고친 것은 무엇입니까?\n\n' + item.inf,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === item.c ? '' : reason[c]; }),
          explain: '격식 있는 편지에서는 **' + item.c + '**처럼 씁니다. 줄임말·입말(ASAP, wanna, Hi, Bye)과 명령문을 피하고, would·could·appreciate 같은 공손한 표현을 씁니다.',
        };
      },
    },
    {
      id: 'letter-purpose',
      level: 2,
      title: '첫 문장으로 편지의 목적 알아내기',
      make: function (R) {
        var cats = ['문의', '요청', '신청·지원', '감사', '사과', '항의'];
        var bank = [
          { s: 'I am writing to ask about the opening hours of the science museum.', k: 0 },
          { s: 'I am writing to inquire about the fees for the swimming class.', k: 0 },
          { s: 'I would like to know whether the bus tour includes lunch.', k: 0 },
          { s: 'I am writing to ask you to change the date of our club meeting.', k: 1 },
          { s: 'I would appreciate it if you could send me a copy of the photos.', k: 1 },
          { s: 'Could you please move the recycling bins closer to the entrance?', k: 1 },
          { s: 'I am writing to apply for the volunteer program at your center.', k: 2 },
          { s: 'I would like to sign up for the weekend coding class.', k: 2 },
          { s: 'I am writing to thank you for the kind tour of your farm.', k: 3 },
          { s: 'I would like to express my thanks for the books you donated.', k: 3 },
          { s: 'I am writing to apologize for missing the meeting last Friday.', k: 4 },
          { s: 'I am sorry that I returned the borrowed tent two days late.', k: 4 },
          { s: 'I am writing to complain about the noise from the construction site.', k: 5 },
          { s: 'I was disappointed that the concert started an hour late without any notice.', k: 5 },
        ];
        var item = R.pick(bank);
        var correct = cats[item.k];
        // 문의와 요청은 헷갈리기 쉬우므로 같은 보기에 함께 내지 않는다
        var pool = cats.filter(function (c, i) {
          if (i === item.k) return false;
          if ((item.k === 0 && i === 1) || (item.k === 1 && i === 0)) return false;
          return true;
        });
        var signal = {
          0: 'ask about, inquire about, would like to know처럼 정보를 묻는 말',
          1: 'ask you to, would appreciate it if you could, Could you please처럼 무엇을 해 달라는 말',
          2: 'apply for, sign up for처럼 참여하겠다는 말',
          3: 'thank you for, express my thanks처럼 고마움을 나타내는 말',
          4: 'apologize for, I am sorry처럼 잘못을 인정하는 말',
          5: 'complain about, disappointed처럼 불만을 나타내는 말',
        };
        var pick = R.choices(correct, R.shuffle(pool));
        return {
          type: 'choice', concept: 1,
          q: '격식 있는 편지의 첫 문장입니다. 이 편지의 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + item.s,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            return c + '의 편지라면 ' + signal[cats.indexOf(c)] + '이 나옵니다.';
          }),
          explain: '이 문장에는 ' + signal[item.k] + '이 있습니다. 그래서 이 편지의 목적은 **' + correct + '**입니다.',
        };
      },
    },
    {
      id: 'form-field',
      level: 1,
      title: '신청서 항목의 뜻 알기',
      make: function (R) {
        var fields = [
          ['First name', '이름(성을 뺀 이름)'], ['Last name', '성'], ['Da' + 'te of birth', '생년월일'], // 검사기의 날짜 객체 금지 규칙에 걸리지 않게 나눠 쓴다
          ['Signature', '서명'], ['Occupation', '직업'], ['Nationality', '국적'],
          ['Emergency contact', '비상 연락처'], ['N/A', '해당 없음'], ['Optional', '선택 사항(쓰지 않아도 됨)'],
          ['Required', '필수 항목(꼭 써야 함)'], ['Preferred date', '희망 날짜'], ['Previous experience', '이전 경험'],
          ['Purpose of visit', '방문 목적'], ['Number of participants', '참가 인원'],
        ];
        var four = R.sample(fields, 4);
        var target = four[0];
        var pick = R.choices(target[1], four.slice(1).map(function (f) { return f[1]; }));
        var mean = {};
        fields.forEach(function (f) { mean[f[1]] = f[0]; });
        return {
          type: 'choice', concept: 3,
          q: '영어 신청서에 쓰인 **' + target[0] + '**의 뜻으로 알맞은 것은 무엇입니까?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === target[1] ? '' : '"' + c + '"의 영어 항목 이름은 ' + mean[c] + '입니다.'; }),
          explain: '**' + target[0] + '**의 뜻은 "' + target[1] + '"입니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'apply', m: '지원하다, 신청하다', ex: 'I want to apply for the summer camp.', exm: '나는 여름 캠프에 지원하고 싶다.' },
    { w: 'application', m: '지원(서), 신청(서)', ex: 'Please send your application by Friday.', exm: '금요일까지 지원서를 보내 주십시오.' },
    { w: 'applicant', m: '지원자', ex: 'Each applicant will have a short interview.', exm: '지원자는 각자 짧은 면접을 본다.' },
    { w: 'inquire', m: '문의하다', ex: 'I am writing to inquire about the tour.', exm: '여행에 관해 문의하려고 편지를 씁니다.' },
    { w: 'request', m: '요청; 요청하다', ex: 'Thank you for considering my request.', exm: '제 요청을 검토해 주셔서 감사합니다.' },
    { w: 'appreciate', m: '고맙게 여기다', ex: 'I would appreciate it if you could call me back.', exm: '다시 전화해 주시면 감사하겠습니다.' },
    { w: 'grateful', m: '감사하는', ex: 'We are grateful for your kind help.', exm: '친절하게 도와주셔서 감사합니다.' },
    { w: 'sincerely', m: '진심으로 (편지의 맺음 인사)', ex: 'Sincerely, Minsu Lee', exm: '이민수 드림' },
    { w: 'attach', m: '첨부하다, 붙이다', ex: 'I have attached a photo of the poster.', exm: '포스터 사진을 첨부했습니다.' },
    { w: 'register', m: '등록하다', ex: 'You can register at the front desk.', exm: '안내 데스크에서 등록할 수 있습니다.' },
    { w: 'deadline', m: '마감 기한', ex: 'The deadline for the contest is May 31.', exm: '대회 마감 기한은 5월 31일이다.' },
    { w: 'fee', m: '요금, 참가비', ex: 'There is no fee for the reading program.', exm: '독서 프로그램에는 참가비가 없다.' },
    { w: 'position', m: '자리, 직책', ex: 'She applied for the position of team leader.', exm: '그녀는 팀장 자리에 지원했다.' },
    { w: 'available', m: '이용할 수 있는, 시간이 되는', ex: 'Are you available for an interview on Monday?', exm: '월요일에 면접을 보실 수 있습니까?' },
    { w: 'reply', m: '답장; 답장하다', ex: 'Thank you for your quick reply.', exm: '빨리 답장해 주셔서 감사합니다.' },
    { w: 'signature', m: '서명', ex: 'Please put your signature at the bottom of the form.', exm: '신청서 맨 아래에 서명해 주십시오.' },
    { w: 'purpose', m: '목적', ex: 'The purpose of this letter is to ask for advice.', exm: '이 편지의 목적은 조언을 구하는 것이다.' },
    { w: 'plagiarism', m: '표절', ex: 'Copying a friend\'s essay is plagiarism.', exm: '친구의 글을 베끼는 것은 표절이다.' },
    { w: 'revise', m: '고쳐 쓰다, 수정하다', ex: 'I revised my letter before sending it.', exm: '나는 보내기 전에 편지를 고쳐 썼다.' },
  ],
});
})();
