/* 공통영어1 · 심정·분위기와 글의 목적
 * 지문·편지는 모두 직접 쓴 글이다(가상의 인물·기관). */
(function () {
  // 심정 변화 이야기 (직접 쓴 글)
  var DOG = "Seoyeon ran up and down the street, calling her dog's name. Her hands were shaking, and she kept looking at her phone. It was getting dark, and there was still no sign of Coco. Then she heard a familiar bark behind the bakery. Coco ran toward her, wagging his tail. Seoyeon hugged him tightly and let out a long breath.";
  // 실망·좌절 이야기 (직접 쓴 글)
  var BOARD = "Minho checked the list on the board again and again, but his name was not there. He had practiced the violin every day for three months. He clenched his fists and kicked a small stone. \"All that work for nothing,\" he muttered.";
  // 기쁨 이야기 (직접 쓴 글)
  var LETTER_OPEN = "Jia tore open the envelope with trembling fingers. She read the first line, then read it once more. \"I got in!\" she shouted. She jumped up and down and ran to hug her mother, laughing and crying at the same time.";
  // 분위기 글 (직접 쓴 글)
  var FESTIVAL = "Colorful lanterns hung over every street. Drums were beating, and the smell of grilled corn filled the air. Children ran around with balloons, and people sang and danced in the square until late at night.";
  var GAME = "The score was tied, and only ten seconds were left. The whole gym went silent. Junho stood at the free-throw line and wiped the sweat from his forehead. Every eye in the building was fixed on him.";
  var RAIN = "Gray clouds had covered the sky for three days. The empty playground was wet, and an old swing creaked in the cold wind. Most of the windows on the street were dark, and no one walked by.";
  var LAKE = "The lake was calm and clear. A few birds sang softly in the trees, and a gentle breeze moved the tall grass. An old man sat on a bench, slowly reading a book.";
  // 목적 글 (직접 쓴 글, 가상의 상점·기관)
  var REFUND = "Dear Customer Service Manager,\n\nI bought a desk lamp from your online store on March 3. When it arrived, the base was cracked and the switch did not work. I called your service center twice, but no one answered. I am writing to ask for a full refund. Please let me know how I should send the lamp back.\n\nSincerely,\nJiwoo Han";
  var THANKS = "Dear Mr. Park,\n\nLast Friday, I left my backpack on the number 15 bus. It had my laptop and all my notes for my final exams. You kept it safe and even called the school to find me. I would like to express my sincere thanks for your kindness. Because of you, I was able to prepare for my exams without worry.\n\nBest regards,\nDoyun Lee";
  var NOTICE = "Dear students,\n\nThe school library will be closed from May 8 to May 12 for repairs. During this period, you can return books at the main office on the first floor. No late fees will be charged for books that are due while the library is closed. The library will open again on May 13 with new desks and better lights.";
  var CLUB = "Are you looking for a meaningful way to spend your Saturday mornings? Join the Green Hands Club! Every week, our members plant trees, clean up the riverside, and grow vegetables in the community garden. No experience is needed. Sign up at the student council room by this Friday and become part of a greener school!";
  var LIGHTS = "Dear Park Manager,\n\nI live near Riverside Park and walk there almost every evening. Recently, many of the lights along the walking path have stopped working. The path is so dark now that some people have tripped over tree roots. I would like to ask you to repair the lights as soon as possible. I am sure many other walkers would appreciate it, too.\n\nSincerely,\nHayun Choi";
  var SEAT = "Dear Mr. Kang,\n\nThank you for organizing last month's science camp. My daughter, Sua, enjoyed every program, especially the night sky observation. However, I am writing to ask whether the camp schedule for next year could be shared earlier. Many parents, including me, need time to plan family events. I would really appreciate it if you could post the dates by March.\n\nBest wishes,\nJimin Seo";

Tutor.registerUnit({
  id: 'eng-h-c1-05',
  course: 'eng-h-c1',
  title: '심정·분위기와 글의 목적',
  summary: '인물의 말과 행동에서 감정을 읽어 내고, 글의 분위기와 글쓴이가 글을 쓴 목적을 추론합니다.',
  goals: [
    '심정을 나타내는 형용사의 뜻을 알고, 인물의 말과 행동에서 심정과 심정의 변화를 추론할 수 있다.',
    '배경·날씨·소리 같은 단서로 글의 분위기를 파악할 수 있다.',
    '요청·감사·항의·안내·홍보 가운데 글의 목적을 파악할 수 있다.',
    'I am writing to ~, I would like to ask ~ 처럼 목적이 드러나는 표현을 찾을 수 있다.',
  ],
  standards: ['[10공영1-01-03]'],

  concepts: [
    {
      title: '심정을 나타내는 형용사',
      body: '인물의 **심정(feeling)**은 형용사로 나타냅니다. 비슷해 보이는 낱말도 감정의 원인과 세기가 다르므로 뜻을 정확히 구별해야 합니다.\n\n| 형용사 | 뜻 | 이런 상황에서 |\n|---|---|---|\n| **relieved** | 안도한 | 걱정하던 일이 무사히 끝났을 때 |\n| **anxious** | 불안한, 걱정하는 | 결과를 모르는 일을 기다릴 때 |\n| **frustrated** | 좌절한, 답답한 | 노력해도 일이 뜻대로 되지 않을 때 |\n| **delighted** | 매우 기뻐하는 | 바라던 좋은 일이 생겼을 때 |\n| **disappointed** | 실망한 | 기대한 일이 이루어지지 않았을 때 |\n| **grateful** | 고마워하는 | 남의 도움을 받았을 때 |\n| **indifferent** | 무관심한 | 일에 아무 관심이 없을 때 |\n\n시험 문제는 한 인물의 **심정 변화**를 묻는 경우가 많습니다. 예를 들어 잃어버린 강아지를 찾아다니다 다시 만났다면 anxious → relieved 입니다.\n\n> 💡 -ed 형용사(frustrated, excited)는 "사람이 그렇게 느끼는" 것이고, -ing 형용사(frustrating, exciting)는 "그런 느낌을 주는" 것입니다. 인물의 심정을 고르는 문제는 대부분 -ed 쪽입니다.',
      easy: '감정 형용사를 "날씨"처럼 생각해 보십시오. anxious는 먹구름이 낀 하늘(무슨 일이 생길지 몰라 마음이 무겁다), relieved는 비가 그치고 해가 나온 하늘(휴, 다행이다), frustrated는 우산이 자꾸 뒤집히는 바람 부는 날(애써도 안 된다), delighted는 맑게 갠 소풍날(신난다)입니다.\n\n심정 변화 문제는 "처음 날씨 → 나중 날씨"를 고르는 것과 같습니다.',
      check: {
        type: 'choice',
        q: '수술을 받은 할머니가 무사하다는 말을 들은 사람의 심정으로 가장 알맞은 것은 무엇입니까?',
        choices: ['relieved', 'frustrated', 'indifferent'],
        answer: 0,
        why: ['', 'frustrated는 노력해도 일이 풀리지 않아 답답할 때의 심정입니다. 걱정이 풀린 상황과 맞지 않습니다.', 'indifferent는 관심이 없다는 뜻입니다. 할머니를 걱정하던 사람의 심정이 아닙니다.'],
        explain: '걱정하던 일이 무사히 끝났을 때의 심정은 **relieved**(안도한)입니다.',
      },
    },
    {
      title: '말과 행동에서 감정 단서 찾기',
      body: '글쓴이는 인물의 감정을 "He was nervous."처럼 직접 말하지 않고, **몸의 반응·행동·말**로 보여 주는 경우가 많습니다. 이 단서를 모아 감정을 추론합니다.\n\n| 단서 | 짐작되는 감정 |\n|---|---|\n| hands were shaking, heart was pounding, kept looking at the clock | anxious, nervous |\n| let out a long breath, finally smiled, the tension left his body | relieved |\n| clenched his fists, kicked a stone, "Not again!" | frustrated, angry |\n| sighed, looked down, walked away slowly | disappointed |\n| jumped up and down, shouted for joy, could not stop smiling | delighted, excited |\n\n**심정 변화**를 물으면 글을 앞부분과 뒷부분으로 나누어 각각 단서를 찾습니다. 변화는 보통 Then, Suddenly, At that moment, However 같은 말 뒤에서 일어납니다.\n\n> ⚠️ 낱말 하나만 보고 판단하지 않습니다. trembling fingers는 불안할 때도, 너무 기대될 때도 나옵니다. 앞뒤 상황과 함께 판단합니다.',
      easy: '영화에서 배우가 "나 무서워."라고 말하지 않아도, 손을 떨고 뒤를 자꾸 돌아보면 무서워한다는 것을 압니다. 글도 같습니다.\n\n밑줄을 그어 가며 인물의 **몸·행동·말**을 모아 보십시오. 그 단서들이 가리키는 감정이 정답입니다.',
      check: {
        type: 'choice',
        q: '다음 문장에 드러난 인물의 심정으로 가장 알맞은 것은 무엇입니까?\n\nShe kept looking at the clock, and her heart was pounding as she waited for her name to be called.',
        choices: ['anxious', 'delighted', 'indifferent'],
        answer: 0,
        why: ['', 'delighted는 이미 좋은 일이 생겨 기쁜 심정입니다. 아직 이름이 불리기를 기다리는 중입니다.', '시계를 자꾸 보고 가슴이 두근거리는 것은 관심이 아주 많다는 표시입니다.'],
        explain: '시계를 자꾸 보고(kept looking at the clock) 가슴이 두근거리는(heart was pounding) 것은 결과를 기다리며 불안한 마음, **anxious**의 단서입니다.',
      },
    },
    {
      title: '글의 분위기를 나타내는 낱말',
      body: '**분위기(mood)**는 글 전체에서 독자가 느끼는 느낌입니다. 인물 한 사람의 감정이 아니라 **장면 전체**의 느낌이라는 점이 심정과 다릅니다.\n\n| 낱말 | 뜻 | 단서가 되는 표현 |\n|---|---|---|\n| **tense** | 긴장된 | 남은 몇 초, 모두가 숨죽임, 조용해진 경기장 |\n| **peaceful** | 평화로운 | 잔잔한 호수, 부드러운 바람, 새소리 |\n| **festive** | 축제 분위기의 | 등불·풍선, 북소리, 노래와 춤 |\n| **gloomy** | 우울한, 음침한 | 잿빛 구름, 텅 빈 거리, 차가운 바람 |\n\n분위기는 **배경(장소·시간·날씨)**, **소리**, **색깔**, **사람들의 움직임**에서 드러납니다. 형용사 하나보다 여러 단서가 같은 쪽을 가리키는지 확인합니다.\n\n> 💡 tense는 문법 용어 "시제"라는 뜻도 있지만, 분위기를 묻는 문제에서는 "긴장된"이라는 형용사입니다.',
      easy: '같은 놀이터라도 아이들이 웃으며 뛰어노는 낮과, 비 내리는 밤에 그네만 삐걱거리는 모습은 느낌이 전혀 다릅니다. 이 "느낌"이 분위기입니다.\n\n글을 읽고 머릿속에 장면을 그려 본 뒤, "이 장면에 배경 음악을 깐다면 어떤 음악일까?"라고 물어보십시오. 신나는 음악이면 festive, 조용하고 편안한 음악이면 peaceful입니다.',
      check: {
        type: 'choice',
        q: '다음 글의 분위기로 가장 알맞은 것은 무엇입니까?\n\n' + LAKE,
        choices: ['peaceful', 'tense', 'festive'],
        answer: 0,
        why: ['', '긴장할 만한 상황(시간에 쫓김, 위험, 숨죽임)이 글에 없습니다.', '축제 분위기에는 음악·사람들의 웃음·장식 같은 단서가 있어야 합니다. 이 글은 조용합니다.'],
        explain: '잔잔한 호수(calm and clear), 부드러운 새소리(sang softly), 산들바람(gentle breeze), 천천히 책을 읽는 노인은 모두 **peaceful**(평화로운) 분위기의 단서입니다.',
      },
    },
    {
      title: '글의 목적 파악하기',
      body: '**글의 목적**은 글쓴이가 이 글을 **왜** 썼는지, 곧 읽는 사람이 무엇을 하거나 알기를 바라는지입니다. 편지·이메일·안내문에서 자주 묻습니다.\n\n| 목적 | 글쓴이가 바라는 것 | 자주 나오는 말 |\n|---|---|---|\n| **요청** | 상대가 어떤 일을 해 주기를 | I would like to ask you to ~, Could you ~? |\n| **감사** | 고마운 마음을 전하기 | I would like to thank you for ~ |\n| **항의** | 불만을 알리고 바로잡기를 | I am writing to complain about ~ |\n| **안내** | 정보(일정·변경 사항)를 알리기 | Please note that ~, will be closed |\n| **홍보** | 행사·단체에 참여하거나 이용하기를 | Join us!, Don\'t miss ~, Sign up ~ |\n\n편지는 보통 **배경 설명 → 목적 → 마무리** 순서입니다. 첫 부분은 상황을 설명할 뿐이고, 진짜 목적은 **중간 이후**에 나오는 경우가 많습니다. 특히 **However, But** 뒤에 목적이 오면 그 앞의 감사나 칭찬은 목적이 아닙니다.\n\n> ⚠️ 불만을 늘어놓은 뒤 환불이나 수리를 부탁하는 글은 "항의하면서 요청하는" 글입니다. 선택지에서는 글쓴이가 **최종적으로 바라는 행동**(환불을 요청하려고)을 찾습니다.',
      easy: '친구가 "요즘 날씨 좋다. 시험은 잘 봤어? 그런데 말이야, 내 공책 좀 빌려줄래?"라고 말했다면, 이 친구가 말을 건 진짜 이유는 날씨 이야기가 아니라 공책입니다.\n\n편지도 마찬가지입니다. 인사와 사정 이야기를 지나서 "그래서 당신에게 무엇을 바라는가"가 나오는 문장을 찾으십시오.',
      check: {
        type: 'ox',
        q: '편지에서 글의 목적은 대부분 첫 문장에 나오므로 첫 문장만 읽으면 목적을 알 수 있다.',
        answer: false,
        explain: '편지는 보통 배경 설명으로 시작하고, 목적은 **중간 이후**(특히 However, But 뒤나 I am writing to ~)에 나오는 경우가 많습니다. 끝까지 읽고 글쓴이가 바라는 것을 찾아야 합니다.',
      },
    },
    {
      title: '목적이 드러나는 표현',
      body: '글의 목적은 특정 표현에서 분명하게 드러납니다. 이 표현이 있는 문장이 곧 **목적 문장**입니다.\n\n| 표현 | 뜻 | 목적 |\n|---|---|---|\n| **I am writing to** ask / inform / complain ~ | ~하려고 이 글을 씁니다 | 뒤에 오는 동사가 목적 |\n| **I would like to ask** (you to) ~ | ~을 부탁드리고 싶습니다 | 요청 |\n| **I would appreciate it if you could** ~ | ~해 주시면 감사하겠습니다 | 요청 |\n| **I would like to express my thanks** for ~ | ~에 감사를 전하고 싶습니다 | 감사 |\n| **I am not satisfied with** ~ | ~에 만족하지 않습니다 | 항의 |\n| **We are pleased to announce** ~ | ~을 알려 드리게 되어 기쁩니다 | 안내 |\n| **Don\'t miss** ~ / **Sign up** ~ | 놓치지 마세요 / 신청하세요 | 홍보 |\n\nI am writing to 뒤의 동사를 보면 목적이 바로 보입니다. I am writing to **ask** → 요청, I am writing to **complain** → 항의, I am writing to **inform** you that ~ → 안내.\n\n> 💡 I would appreciate it if you could ~ 는 "감사하다"라는 낱말이 있지만 목적은 **감사가 아니라 요청**입니다. 아직 일어나지 않은 일을 해 달라고 부탁하는 말이기 때문입니다.',
      easy: '"I am writing to ~"는 편지 속의 화살표 표지판입니다. 이 표지판이 보이면 바로 뒤의 동사를 보십시오. ask(부탁), complain(불만), inform(알림), thank(감사) 중 무엇이 있느냐가 곧 글의 목적입니다.',
      check: {
        type: 'choice',
        q: '다음 문장이 드러내는 글의 목적은 무엇입니까?\n\nI would appreciate it if you could send me the class schedule by Friday.',
        choices: ['요청', '감사', '항의'],
        answer: 0,
        why: ['', 'appreciate(감사하다)라는 낱말이 있지만, 아직 받지 않은 시간표를 보내 달라고 부탁하는 문장입니다.', '불만을 나타내는 표현이 없습니다. 정중하게 부탁하고 있습니다.'],
        explain: 'I would appreciate it if you could ~ 는 "~해 주시면 감사하겠습니다", 곧 정중한 **요청** 표현입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글에 드러난 Seoyeon의 심정 변화로 가장 알맞은 것은 무엇입니까?\n\n' + DOG,
      steps: [
        '글을 둘로 나눕니다. 변화는 **Then** 뒤에서 일어납니다. 앞부분은 강아지를 찾아다니는 장면, 뒷부분은 강아지를 다시 만나는 장면입니다.',
        '앞부분의 단서: 이름을 부르며 거리를 뛰어다님, 손이 떨림(hands were shaking), 휴대 전화를 자꾸 봄, 날이 어두워짐(getting dark) → 불안한 마음, **anxious**.',
        '뒷부분의 단서: 익숙한 짖는 소리, 꼭 끌어안음(hugged him tightly), 긴 숨을 내쉼(let out a long breath) → 걱정이 풀린 마음, **relieved**.',
        '두 부분을 이으면 anxious → relieved 입니다.',
      ],
      answer: 'anxious → relieved',
    },
    {
      q: '다음 글의 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + SEAT,
      steps: [
        '첫 문장 Thank you for organizing ~ 는 감사 인사이지만, 바로 뒤에 **However**가 나옵니다. 목적은 However 뒤에 있을 가능성이 큽니다.',
        'However 뒤의 문장: I am writing to **ask** whether the camp schedule for next year could be shared earlier. → I am writing to ask 는 요청을 드러냅니다.',
        '마지막 문장 I would really appreciate it if you could post the dates by March. 도 요청 표현입니다.',
        '그래서 이 글의 목적은 "내년 캠프 일정을 미리 알려 달라고 요청하려고"입니다. 앞의 감사는 요청을 꺼내기 위한 인사입니다.',
      ],
      answer: '내년 캠프 일정을 일찍 공지해 달라고 요청하려고',
    },
  ],

  terms: [
    { term: '심정 (feeling)', def: '글 속 인물이 어떤 순간에 느끼는 감정입니다. 예: anxious(불안한), relieved(안도한)' },
    { term: '심정 변화', def: '글의 앞부분과 뒷부분에서 인물의 감정이 바뀌는 것입니다. 예: anxious → relieved' },
    { term: '분위기 (mood)', def: '글의 장면 전체에서 독자가 느끼는 느낌입니다. 예: tense(긴장된), festive(축제 분위기의)' },
    { term: '감정 단서', def: '감정을 직접 말하지 않고 몸의 반응·행동·말로 보여 주는 표현입니다. 예: her hands were shaking → 불안' },
    { term: '글의 목적', def: '글쓴이가 글을 쓴 이유, 곧 읽는 사람이 무엇을 하거나 알기를 바라는지입니다. 요청·감사·항의·안내·홍보 등이 있습니다.' },
    { term: '목적 문장', def: '글의 목적이 직접 드러나는 문장입니다. I am writing to ~, I would like to ask ~ 같은 표현이 들어 있는 경우가 많습니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\nI tried to solve the puzzle for two hours, but I still could not finish it. I felt really [[blank]].',
      choices: ['frustrated', 'relieved', 'delighted', 'grateful'],
      answer: 0,
      why: ['', 'relieved는 걱정하던 일이 잘 끝났을 때의 심정입니다. 퍼즐은 아직 풀리지 않았습니다.', 'delighted는 좋은 일이 생겨 매우 기쁜 심정입니다. 두 시간 애써도 풀지 못한 상황과 반대입니다.', 'grateful은 누군가의 도움에 고마워하는 심정입니다. 도와준 사람이 없습니다.'],
      explain: '두 시간 동안 애썼는데도(tried for two hours) 끝내지 못한(still could not finish) 상황이므로 **frustrated**(좌절한, 답답한)가 알맞습니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 낱말을 쓰십시오.\n\nThe doctor said my grandfather\'s surgery went well. I was so [[blank]] to hear that.\n\n(r로 시작하는 낱말, 뜻: 안도한)',
      answer: ['relieved'],
      wrong: [{ a: 'relaxed', why: 'relaxed는 "긴장이 풀려 편안한"이라는 뜻입니다. 걱정하던 일이 잘되어 "안도한" 심정은 relieved입니다.' }, { a: 'relieve', why: 'relieve는 동사(덜어 주다)입니다. 느끼는 심정을 나타내려면 형용사 relieved를 씁니다.' }],
      explain: '걱정하던 수술이 잘 끝났다는 말을 들은 심정은 **relieved**(안도한)입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 글에 드러난 Minho의 심정으로 가장 알맞은 것은 무엇입니까?\n\n' + BOARD,
      choices: ['frustrated', 'relieved', 'indifferent', 'grateful'],
      answer: 0,
      why: ['', '명단에 이름이 없는 것은 걱정이 풀린 상황이 아닙니다.', '주먹을 쥐고 돌을 찬 것은 결과에 크게 마음을 쓰고 있다는 단서입니다.', '고마워할 만한 도움을 받은 내용이 없습니다.'],
      explain: '석 달 동안 매일 연습했는데(practiced every day for three months) 명단에 이름이 없고, 주먹을 쥐고(clenched his fists) 돌을 차며 "그 노력이 다 헛수고"라고 중얼거립니다. 애쓴 일이 뜻대로 되지 않은 **frustrated**의 단서입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '다음 글에 드러난 Jia의 심정으로 가장 알맞은 것은 무엇입니까?\n\n' + LETTER_OPEN,
      choices: ['delighted', 'disappointed', 'frustrated', 'indifferent'],
      answer: 0,
      why: ['', '"I got in!"(합격했다)은 기대가 이루어졌다는 말입니다. 실망과 반대입니다.', '일이 뜻대로 된 상황이므로 좌절한 심정이 아닙니다.', '봉투를 떨리는 손으로 뜯은 것은 결과에 관심이 많다는 단서입니다.'],
      explain: '"I got in!"이라고 외치고, 펄쩍펄쩍 뛰며(jumped up and down) 어머니를 안는 모습은 매우 기쁜 심정, **delighted**입니다. 처음의 떨리는 손(trembling fingers)은 기대와 긴장의 단서이고, 결과를 본 뒤에는 기쁨으로 바뀝니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '다음 글의 분위기로 가장 알맞은 것은 무엇입니까?\n\n' + FESTIVAL,
      choices: ['festive', 'gloomy', 'tense', 'peaceful'],
      answer: 0,
      why: ['', 'gloomy(우울한)는 잿빛 하늘, 텅 빈 거리 같은 단서와 어울립니다. 이 글은 밝고 시끌벅적합니다.', '긴장할 만한 위기나 시간 압박이 없습니다.', 'peaceful은 조용하고 잔잔한 장면입니다. 북소리와 노래, 춤이 가득한 이 글은 활기찹니다.'],
      explain: '색색의 등불(colorful lanterns), 북소리(drums were beating), 풍선을 든 아이들, 밤늦도록 노래하고 춤추는 사람들은 모두 **festive**(축제 분위기의) 단서입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '다음 글의 분위기로 가장 알맞은 것은 무엇입니까?\n\n' + GAME,
      choices: ['tense', 'festive', 'peaceful', 'gloomy'],
      answer: 0,
      why: ['', '아직 승부가 나지 않았으므로 축하하는 장면이 아닙니다.', '조용한 것은 맞지만 편안해서가 아니라 모두가 숨죽이고 있기 때문입니다.', 'gloomy는 슬프고 음울한 장면입니다. 이 글은 결과를 앞둔 긴장감이 핵심입니다.'],
      explain: '동점에 10초 남음(only ten seconds were left), 체육관 전체가 조용해짐(went silent), 땀을 닦음, 모든 눈이 한 사람에게 쏠림 — 모두 **tense**(긴장된) 분위기의 단서입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 3,
      q: '다음 글의 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + NOTICE,
      choices: ['도서관 휴관 기간과 이용 방법을 안내하려고', '도서관 수리를 도울 자원봉사자를 모집하려고', '연체료 제도에 대해 항의하려고', '새 책상을 기증해 준 사람에게 감사하려고'],
      answer: 0,
      why: ['', '자원봉사를 부탁하는 말(We need volunteers 등)이 없습니다.', '연체료는 "휴관 중에는 물리지 않는다"는 안내일 뿐 불만이 아닙니다.', '새 책상이 생긴다는 소식만 있고, 감사를 전하는 말은 없습니다.'],
      explain: '휴관 기간(May 8 to May 12), 그동안 반납하는 곳(main office), 연체료 면제, 다시 여는 날(May 13)을 알려 주는 **안내**문입니다.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 4,
      q: 'I am writing to complain about ~ 으로 시작하는 목적 문장이 있는 글의 목적은 감사이다.',
      answer: false,
      explain: 'complain은 "불평하다, 항의하다"라는 뜻입니다. I am writing to complain about ~ 은 **항의**의 목적을 드러냅니다. 감사는 I would like to thank you for ~ 처럼 씁니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      hint: '편지를 쓴 사람이 상대에게 최종적으로 무엇을 해 달라고 하는지 찾아보십시오.',
      q: '다음 글의 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + REFUND,
      choices: ['구입한 제품의 환불을 요청하려고', '제품 사용 방법을 문의하려고', '서비스 센터 직원에게 감사하려고', '새로 나온 스탠드를 홍보하려고'],
      answer: 0,
      why: ['', '사용법이 아니라 제품이 깨지고 고장 난 것이 문제입니다.', '서비스 센터는 전화를 받지 않았다고 불만을 말하고 있습니다.', '홍보는 상점이 손님에게 쓰는 글입니다. 이 글은 손님이 상점에 쓴 글입니다.'],
      explain: '받침대가 깨지고 스위치가 고장 났다는 불만을 말한 뒤, **I am writing to ask for a full refund.**(전액 환불을 요청하려고 씁니다)라고 목적을 밝힙니다. 불만을 바탕으로 한 **환불 요청**이 목적입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      hint: '목적이 드러나는 표현(I would like to ~)이 있는 문장을 찾아보십시오.',
      q: '다음 글의 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + LIGHTS,
      choices: ['산책로의 고장 난 전등을 고쳐 달라고 요청하려고', '공원 산책 모임에 참여하도록 권하려고', '나무뿌리에 걸려 다친 일에 대해 보상을 요구하려고', '공원 관리인의 노고에 감사하려고'],
      answer: 0,
      why: ['', '산책 모임을 소개하거나 참여를 권하는 말이 없습니다.', '사람들이 넘어졌다는 것은 전등이 필요한 이유일 뿐, 보상을 요구하지 않습니다.', 'appreciate가 나오지만 "전등을 고쳐 주면 다른 사람들도 고마워할 것"이라는 뜻입니다.'],
      explain: '**I would like to ask you to repair the lights as soon as possible.** 이 목적 문장입니다. 전등이 고장 나서 길이 어둡다는 사정을 말한 뒤 수리를 **요청**합니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 3,
      q: '편지의 일반적인 순서(인사 → 배경 → 목적 → 마무리)에 맞게 문장을 놓으십시오.',
      choices: [
        'Dear Ms. Yoon,',
        'I am a member of the school photography club.',
        'I am writing to ask if our club could use the art room on Friday afternoons.',
        'I look forward to hearing from you.',
      ],
      answer: [0, 1, 2, 3],
      hint: 'I am writing to ~ 가 있는 문장이 목적 문장입니다.',
      explain: '받는 사람 부르기(Dear Ms. Yoon) → 자기소개와 배경(사진 동아리 회원) → 목적(미술실 사용을 부탁) → 마무리 인사(답장을 기다리겠습니다) 순서입니다.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'text', concept: 2,
      q: '다음 글의 분위기를 나타내는 낱말을 쓰십시오.\n\n' + RAIN + '\n\n분위기: [[blank]] (g로 시작하는 낱말, 뜻: 우울한, 음침한)',
      answer: ['gloomy'],
      wrong: [{ a: 'gloom', why: 'gloom은 명사(어둠, 우울)입니다. 분위기를 나타내는 형용사는 gloomy입니다.' }, { a: 'glad', why: 'glad는 "기쁜"이라는 뜻으로 이 장면과 반대입니다.' }],
      explain: '사흘째 잿빛 구름(gray clouds), 텅 빈 젖은 놀이터, 찬바람에 삐걱거리는 그네, 아무도 지나가지 않는 거리 — 모두 **gloomy**(우울한, 음침한) 분위기의 단서입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      hint: '앞부분의 감사 인사 뒤에 어떤 연결어가 나오는지 보십시오.',
      q: '다음 글의 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + SEAT,
      choices: ['내년 캠프 일정을 일찍 알려 달라고 요청하려고', '과학 캠프를 열어 준 것에 감사하려고', '과학 캠프 프로그램에 대해 항의하려고', '가족 행사 일정을 안내하려고'],
      answer: 0,
      why: ['', '첫 문장은 감사 인사이지만 However 뒤에 진짜 목적(일정 공지 요청)이 나옵니다.', '프로그램은 딸이 모두 즐겼다고 칭찬했습니다. 항의가 아니라 일정 공지 시기에 대한 정중한 부탁입니다.', '가족 행사는 글쓴이가 일정을 미리 알아야 하는 이유일 뿐입니다.'],
      explain: '감사 인사 뒤 **However, I am writing to ask whether ~** 에서 목적이 드러납니다. 마지막 문장 I would really appreciate it if you could post the dates by March 도 요청입니다. 그래서 목적은 **일정 공지 요청**입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 1,
      q: '다음 글에 드러난 Seoyeon의 심정 변화로 가장 알맞은 것은 무엇입니까?\n\n' + DOG,
      choices: ['anxious → relieved', 'relieved → anxious', 'delighted → frustrated', 'indifferent → delighted'],
      answer: 0,
      why: ['', '순서가 거꾸로입니다. 강아지를 찾아다닐 때가 먼저, 다시 만날 때가 나중입니다.', '강아지를 다시 만났으므로 마지막 심정이 좌절일 수 없습니다.', '이름을 부르며 뛰어다니고 손이 떨린 것은 무관심이 아니라 큰 걱정입니다.'],
      explain: 'Then 앞: 이름을 부르며 뛰어다님, 손이 떨림(hands were shaking), 날이 어두워짐 → **anxious**. Then 뒤: 강아지를 꼭 안고 긴 숨을 내쉼(let out a long breath) → **relieved**.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '다음 글에서 글의 목적이 가장 잘 드러난 문장은 무엇입니까?\n\n' + THANKS,
      choices: [
        'I would like to express my sincere thanks for your kindness.',
        'Last Friday, I left my backpack on the number 15 bus.',
        'It had my laptop and all my notes for my final exams.',
        'Because of you, I was able to prepare for my exams without worry.',
      ],
      answer: 0,
      why: ['', '버스에 가방을 두고 내린 일은 편지를 쓰게 된 배경입니다.', '가방이 얼마나 중요했는지 설명하는 배경입니다.', '감사하는 이유를 덧붙인 문장입니다. 목적이 직접 드러난 문장은 I would like to express ~ 입니다.'],
      explain: '**I would like to express my sincere thanks for ~** 는 감사의 목적을 직접 드러내는 표현입니다. 나머지는 배경(무슨 일이 있었나)과 감사하는 이유입니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '다음 글을 쓴 목적으로 가장 알맞은 것은 무엇입니까?\n\n' + CLUB,
      choices: ['동아리 가입을 권하려고(홍보)', '동아리 활동 결과를 보고하려고(안내)', '강가 청소에 대한 불만을 전하려고(항의)', '동아리 회원들에게 감사하려고(감사)'],
      answer: 0,
      why: ['', '활동을 소개하지만, 지난 결과를 알리는 것이 아니라 새 회원을 모으는 글입니다.', '청소는 동아리가 하는 활동으로 소개될 뿐 불만이 아닙니다.', '회원들에게 고마움을 전하는 말이 없습니다.'],
      explain: '질문으로 관심을 끌고(Are you looking for ~?), **Join the Green Hands Club!**, **Sign up ~ by this Friday** 로 참여를 권합니다. 동아리 **홍보**가 목적입니다.',
    },
    {
      id: 'a5', level: 3, type: 'ox', concept: 2,
      q: '분위기 문제에서 "글 속 인물 한 명의 감정"과 "글 전체 장면의 분위기"는 언제나 같은 낱말로 답한다.',
      answer: false,
      explain: '심정은 **인물 한 사람**의 감정이고, 분위기는 **장면 전체**의 느낌입니다. 예를 들어 축제 장면(festive) 속에서 길을 잃은 아이의 심정은 anxious일 수 있습니다. 묻는 것이 심정인지 분위기인지 먼저 확인합니다.',
    },
  ],

  deeper: [
    {
      title: '보여 주기(show)와 말하기(tell)',
      body: '영어 글쓰기 수업에서 자주 듣는 말이 "Show, don\'t tell."입니다. "She was nervous."라고 **말하는(tell)** 대신 "Her hands were shaking, and she kept looking at the clock."처럼 **보여 주라(show)**는 뜻입니다.\n\n보여 주는 글은 독자가 장면을 직접 보는 것처럼 느끼게 하고, 독자 스스로 감정을 알아차리게 합니다. 그래서 심정·분위기 문제의 지문에는 감정 형용사가 직접 나오지 않는 경우가 많습니다.\n\n여러분이 경험을 쓸 때도 "I was happy." 한 문장 대신 그때의 행동과 몸의 반응을 써 보십시오. 이 단원의 단서 표가 그대로 글쓰기 재료가 됩니다.',
    },
    {
      title: '같은 정보, 다른 목적',
      body: '"도서관이 5월 8일부터 닫는다"는 같은 정보라도, 학교가 쓰면 **안내**, 학생이 "시험 기간이니 닫지 말아 달라"고 쓰면 **요청**, 이미 피해를 본 학생이 쓰면 **항의**가 됩니다.\n\n그래서 글의 목적을 고를 때는 **누가 누구에게** 쓰는 글인지(Dear ~ 와 끝의 이름)를 함께 보면 도움이 됩니다. 상점이 손님에게 쓰면 홍보·안내, 손님이 상점에 쓰면 문의·항의·요청인 경우가 많습니다.',
    },
  ],

  faq: [
    {
      q: '심정이랑 분위기는 뭐가 달라요?',
      a: '심정(feeling)은 **인물 한 사람**이 느끼는 감정이고, 분위기(mood)는 **장면 전체**에서 독자가 받는 느낌입니다. 문제에서 "~의 심정"이라고 하면 그 인물의 말과 행동을, "글의 분위기"라고 하면 배경·날씨·소리·사람들의 모습을 봅니다.',
    },
    {
      q: '편지 앞에 감사 인사가 있는데 왜 목적이 감사가 아니에요?',
      a: '편지는 예의상 감사나 인사로 시작하는 경우가 많습니다. 하지만 However, But 뒤에 I am writing to ask ~ 같은 문장이 나오면 그것이 진짜 목적입니다. 글쓴이가 **최종적으로 상대에게 바라는 것**을 찾으십시오.',
    },
    {
      q: 'frustrated랑 disappointed는 어떻게 구별해요?',
      a: 'disappointed는 **기대한 결과가 오지 않아 실망한** 마음이고, frustrated는 **애써도 일이 뜻대로 되지 않아 답답하고 짜증 나는** 마음입니다. 오래 노력한 과정, 주먹을 쥐거나 물건을 차는 행동이 있으면 frustrated에 가깝고, 한숨을 쉬고 고개를 숙이는 모습이면 disappointed에 가깝습니다. 두 낱말이 함께 선택지에 나오면 이런 단서를 꼼꼼히 비교하십시오.',
    },
  ],

  mistakes: [
    '글에 나온 감정 낱말 하나만 보고 답을 고르는 실수 — 글 전체의 단서와 상황을 함께 보고, 심정 변화는 앞뒤를 나누어 판단합니다.',
    '편지의 첫 문장(감사·인사)을 목적으로 고르는 실수 — However, But 뒤나 I am writing to ~ 문장에서 진짜 목적을 찾습니다.',
    'I would appreciate it if you could ~ 를 감사 표현으로 오해하는 실수 — 아직 일어나지 않은 일을 부탁하는 **요청** 표현입니다.',
  ],

  vocab: [
    { w: 'relieved', m: '안도한', ex: 'I was relieved to find my wallet in my bag.', exm: '가방에서 지갑을 찾아서 안도했다.' },
    { w: 'anxious', m: '불안한, 걱정하는', ex: 'She felt anxious before the interview.', exm: '그녀는 면접 전에 불안했다.' },
    { w: 'frustrated', m: '좌절한, 답답한', ex: 'He got frustrated when the computer stopped again.', exm: '컴퓨터가 또 멈추자 그는 답답해졌다.' },
    { w: 'delighted', m: '매우 기뻐하는', ex: 'We were delighted with the good news.', exm: '우리는 좋은 소식에 매우 기뻤다.' },
    { w: 'disappointed', m: '실망한', ex: 'The fans were disappointed when the game was canceled.', exm: '경기가 취소되자 팬들은 실망했다.' },
    { w: 'grateful', m: '고마워하는', ex: 'I am grateful for your help.', exm: '도와주셔서 고맙습니다.' },
    { w: 'indifferent', m: '무관심한', ex: 'He seemed indifferent to the result.', exm: '그는 결과에 무관심해 보였다.' },
    { w: 'tense', m: '긴장된', ex: 'The room was tense before the results were announced.', exm: '결과가 발표되기 전 방 안은 긴장되어 있었다.' },
    { w: 'peaceful', m: '평화로운', ex: 'It was a peaceful morning by the lake.', exm: '호숫가의 평화로운 아침이었다.' },
    { w: 'festive', m: '축제 분위기의', ex: 'The streets looked festive with colorful lights.', exm: '거리는 색색의 불빛으로 축제 분위기였다.' },
    { w: 'gloomy', m: '우울한, 음침한', ex: 'The sky was gloomy all day.', exm: '하늘이 하루 종일 잔뜩 흐렸다.' },
    { w: 'complain', m: '불평하다, 항의하다', ex: 'I am writing to complain about the noise.', exm: '소음에 대해 항의하려고 이 글을 씁니다.' },
    { w: 'refund', m: '환불', ex: 'Can I get a refund for this shirt?', exm: '이 셔츠를 환불받을 수 있나요?' },
    { w: 'appreciate', m: '고마워하다, 감사하다', ex: 'I would appreciate it if you could call me back.', exm: '다시 전화해 주시면 감사하겠습니다.' },
    { w: 'announce', m: '알리다, 발표하다', ex: 'We are pleased to announce our new class.', exm: '새 강좌를 알려 드리게 되어 기쁩니다.' },
  ],
});
})();
