/* 6학년 영어 · 학년과 생일 말하기 */
Tutor.registerUnit({
  id: 'eng-e6-01',
  course: 'eng-e6',
  title: '학년과 생일 말하기',
  summary: 'What grade are you in?으로 학년을, When is your birthday?로 생일을 묻고 first, second 같은 순서의 말로 답해요.',
  goals: [
    '몇 학년인지 묻고 답할 수 있어요.',
    'first, second, third처럼 순서를 나타내는 말을 읽고 쓸 수 있어요.',
    '달 이름과 날짜를 읽고, 생일이나 행사 날짜를 묻고 답할 수 있어요.',
    '생일을 축하하고 선물을 주고받는 말을 할 수 있어요.',
  ],
  standards: ['[6영02-07]', '[6영01-04]', '[6영02-03]'],

  concepts: [
    {
      title: '몇 학년인지 묻고 답하기',
      body: '몇 학년인지 물을 때는 **What grade are you in?**이라고 해요. **grade**는 "학년"이라는 뜻이에요.\n\n대답은 **I\'m in the sixth grade.**(나는 6학년이야.)처럼 해요. 학년을 말할 때는 one, two 같은 수가 아니라 **sixth(여섯째)**처럼 **순서를 나타내는 말**을 써요. "여섯 번째 학년에 있다"라고 말하는 셈이에요.\n\n| 학년 | 영어로 |\n|---|---|\n| 1학년 | I\'m in the **first** grade. |\n| 3학년 | I\'m in the **third** grade. |\n| 5학년 | I\'m in the **fifth** grade. |\n| 6학년 | I\'m in the **sixth** grade. |\n\n> 💡 질문 끝의 in은 대답의 "I\'m **in** the sixth grade"의 in이에요. 질문에서는 맨 뒤로 갔을 뿐이에요.',
      easy: '학교 건물을 계단처럼 생각해 보세요. 1학년은 첫째 칸, 2학년은 둘째 칸, 6학년은 여섯째 칸에 있어요.\n\n그래서 영어로도 "나는 여섯째 칸(학년) **안에** 있어."라고 말해요. **I\'m in the sixth grade.** 여섯째는 six가 아니라 **sixth**예요.',
      check: {
        type: 'choice',
        q: 'What grade are you in?에 4학년 학생이 바르게 대답한 것은 무엇일까요?',
        choices: ["I'm in the fourth grade.", "I'm in the four grade.", "I'm four grade."],
        answer: 0,
        why: ['', '학년은 순서를 나타내는 말로 말해요. four가 아니라 fourth예요.', 'in the가 빠졌고, four가 아니라 순서를 나타내는 fourth를 써야 해요. I\'m in the fourth grade.처럼 말해요.'],
        explain: '학년은 "넷째"처럼 순서를 나타내는 말로 말해요. 4학년은 I\'m in the **fourth** grade.예요.',
      },
    },
    {
      title: '순서를 나타내는 말 (first, second, third …)',
      body: '"첫째, 둘째, 셋째"처럼 **순서를 나타내는 말**을 **서수**라고 해요. 대부분은 수 낱말 끝에 **-th**를 붙여요. (four → fourth, six → sixth, ten → tenth)\n\n하지만 모양이 특별한 것이 있어요.\n\n| 수 | 순서의 말 | 줄여 쓰기 |\n|---|---|---|\n| one | **first** | 1st |\n| two | **second** | 2nd |\n| three | **third** | 3rd |\n| five | **fifth** (ve → f) | 5th |\n| eight | **eighth** (h 하나만 더) | 8th |\n| nine | **ninth** (e 가 빠져요) | 9th |\n| twelve | **twelfth** (ve → f) | 12th |\n| twenty | **twentieth** (y → ie) | 20th |\n\n21 이상은 끝 수만 바꿔요: twenty-**first**(21st), twenty-**second**(22nd), twenty-**third**(23rd), thirty-**first**(31st).\n\n> ⚠️ 11·12·13은 eleventh(11th), twelfth(12th), thirteenth(13th)예요. 끝이 1, 2, 3이라도 st, nd, rd를 쓰지 않아요.',
      easy: '줄 서기를 떠올려 보세요. 맨 앞 친구는 **first**, 그다음은 **second**, 세 번째는 **third**예요. 이 세 개만 따로 외우면 나머지는 거의 다 "수 + th"예요.\n\n줄여 쓸 때는 낱말의 마지막 두 글자를 숫자 뒤에 붙인다고 생각하면 쉬워요. fir**st** → 1**st**, seco**nd** → 2**nd**, thi**rd** → 3**rd**, four**th** → 4**th**.',
      check: {
        type: 'choice',
        q: '"넷째"를 뜻하는 낱말로 알맞은 것은 무엇일까요?',
        choices: ['fourth', 'forth', 'fourst'],
        answer: 0,
        why: ['', 'forth는 "앞으로"라는 뜻의 다른 낱말이에요. four에 th를 붙여 fourth로 써요.', 'st는 first(1st)처럼 끝이 1일 때 붙여요. four는 th를 붙여요.'],
        explain: 'four 끝에 th를 붙여 **fourth**예요. 줄여 쓰면 4th예요.',
      },
    },
    {
      title: '달 이름 (January ~ December)',
      body: '영어의 달 이름은 열두 개가 모두 달라서 하나씩 익혀야 해요. 달 이름은 사람 이름처럼 **첫 글자를 늘 대문자**로 써요.\n\n| 달 | 영어 | 달 | 영어 |\n|---|---|---|---|\n| 1월 | **January** | 7월 | **July** |\n| 2월 | **February** | 8월 | **August** |\n| 3월 | **March** | 9월 | **September** |\n| 4월 | **April** | 10월 | **October** |\n| 5월 | **May** | 11월 | **November** |\n| 6월 | **June** | 12월 | **December** |\n\n> 💡 9월부터 12월까지는 모두 **-ber**로 끝나요. Septem**ber**, Octo**ber**, Novem**ber**, Decem**ber**.',
      easy: '달 이름을 세 개씩 네 묶음으로 나눠 외워 보세요.\n\n- 1~3월: January, February, March\n- 4~6월: April, May, June\n- 7~9월: July, August, September\n- 10~12월: October, November, December\n\nJune(6월)과 July(7월)는 둘 다 J로 시작하고 글자 수도 같아서 헷갈리기 쉬워요. Ju**n**e의 n, Ju**l**y의 l을 눈여겨보세요. 6월이 June, 7월이 July예요.',
      check: {
        type: 'choice',
        q: '12월을 뜻하는 낱말은 무엇일까요?',
        choices: ['December', 'November', 'October'],
        answer: 0,
        why: ['', 'November는 11월이에요.', 'October는 10월이에요.'],
        explain: '12월은 **December**예요. 10월 October, 11월 November, 12월 December 순서로 이어져요.',
      },
    },
    {
      title: '날짜 읽기와 생일 묻기',
      body: '날짜는 **달 이름 + 순서를 나타내는 말**로 말해요. 쓸 때는 May 5th처럼 숫자로 줄여 쓰고, 읽을 때는 **May fifth**라고 읽어요.\n\n- July 10th → July **tenth**\n- March 2nd → March **second**\n- October 31st → October **thirty-first**\n\n생일을 물을 때는 **When is your birthday?**(네 생일은 언제니?)라고 해요. 대답은 **It\'s July 10th.**(7월 10일이야.)처럼 해요.\n\n행사 날짜도 같은 방법으로 물어요.\n\n- A: When is Children\'s Day? B: It\'s May 5th.\n- A: When is Christmas? B: It\'s December 25th.',
      easy: '달력의 칸을 생각해 보세요. "5일"은 그 달의 **다섯째 날**이에요. 그래서 영어는 날짜를 "다섯째"라는 말로 읽어요.\n\nMay 5th = "5월의 다섯째 날" = **May fifth**. five라고 읽지 않고 fifth라고 읽는 이유예요.',
      check: {
        type: 'ox',
        q: 'July 10th는 July tenth라고 읽어요.',
        answer: true,
        explain: '날짜는 순서를 나타내는 말로 읽어요. 10th는 **tenth**이므로 July tenth라고 읽어요.',
      },
    },
    {
      title: '생일 축하하고 선물 주고받기',
      body: '친구의 생일에는 **Happy birthday!**(생일 축하해!)라고 말해요.\n\n선물을 건넬 때는 **This is for you.**(이거 너 주려고 준비했어.)라고 하고, 받는 사람은 **Thank you.**(고마워.)라고 답해요. 고맙다는 말에는 **You\'re welcome.**(천만에.)으로 답할 수 있어요.\n\n- A: Happy birthday, Jia! This is for you.\n- B: Wow, thank you!\n- A: You\'re welcome.\n\n> 💡 선물이 마음에 들면 I like it.(마음에 들어.)이라고 덧붙여도 좋아요.',
      easy: '생일 파티에서 오가는 말을 순서대로 떠올려 보세요.\n\n1. 들어가며 축하: **Happy birthday!**\n2. 선물 건네기: **This is for you.**\n3. 선물 받고 감사: **Thank you.**\n4. 감사에 대답: **You\'re welcome.**',
      check: {
        type: 'choice',
        q: '친구에게 생일 선물을 받았을 때 할 말로 알맞은 것은 무엇일까요?',
        choices: ['Thank you.', 'This is for you.', "You're welcome."],
        answer: 0,
        why: ['', 'This is for you.는 선물을 건네는 사람이 하는 말이에요.', 'You\'re welcome.은 "고마워"라는 말에 대답할 때 써요.'],
        explain: '선물을 받으면 **Thank you.**라고 고마움을 말해요.',
      },
    },
  ],

  examples: [
    {
      q: 'Children\'s Day is May 5th.\n\n이 문장의 May 5th를 소리 내어 읽으면 어떻게 읽을까요?',
      steps: [
        '날짜는 "달 이름 + 순서를 나타내는 말"로 읽어요.',
        '달 이름은 May(5월) 그대로 읽어요.',
        '5th는 다섯째라는 뜻이에요. five에서 ve가 f로 바뀌어 fifth가 돼요.',
        '그래서 May fifth라고 읽어요.',
      ],
      answer: 'May fifth',
    },
    {
      q: '우리말에 맞게 영어로 말해 보세요.\n\n"나는 5학년이야. 내 생일은 3월 2일이야."',
      steps: [
        '학년은 I\'m in the [[빈칸]] grade.의 꼴로 말해요. 5학년은 "다섯째"이므로 fifth를 넣어요: I\'m in the fifth grade.',
        '3월은 March예요. 첫 글자는 대문자로 써요.',
        '2일은 "둘째 날"이므로 second, 줄여 쓰면 2nd예요.',
        '생일은 My birthday is [[빈칸]].로 말해요: My birthday is March 2nd.',
      ],
      answer: "I'm in the fifth grade. My birthday is March 2nd.",
    },
  ],

  terms: [
    { term: '서수(순서를 나타내는 말)', def: 'first(첫째), second(둘째), third(셋째)처럼 순서를 나타내는 수 낱말이에요. 학년과 날짜를 말할 때 써요.' },
    { term: '기수(개수를 나타내는 말)', def: 'one, two, three처럼 개수를 나타내는 수 낱말이에요. 나이를 말할 때 써요. 예: I\'m twelve years old.' },
    { term: '서수 줄여 쓰기', def: '숫자 뒤에 서수의 마지막 두 글자를 붙여요. 1st, 2nd, 3rd, 4th, 21st처럼 써요.' },
    { term: 'grade', def: '"학년"이라는 뜻이에요. What grade are you in?은 "몇 학년이니?"라는 질문이에요.' },
    { term: '달 이름', def: 'January(1월)부터 December(12월)까지 열두 개가 있어요. 첫 글자는 늘 대문자로 써요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 질문에 알맞은 대답을 고르세요.\n\nWhat grade are you in?',
      choices: ["I'm in the sixth grade.", "I'm twelve years old.", "It's July 10th.", "I'm fine, thank you."],
      answer: 0,
      why: ['', '나이를 말했어요. 질문은 몇 학년인지 묻고 있어요.', '날짜를 말했어요. 날짜는 When is your birthday?에 대한 대답이에요.', '기분을 말했어요. How are you?에 대한 대답이에요.'],
      explain: 'What grade are you in?은 "몇 학년이니?"라는 뜻이에요. 그래서 I\'m in the sixth grade.(나는 6학년이야.)가 알맞아요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: '"셋째"를 뜻하는 영어 낱말을 철자로 쓰세요. (숫자 말고 낱말로)',
      answer: ['third'],
      wrong: [
        { a: 'threeth', why: 'three에 th를 붙인 것 같아요. 셋째는 모양이 특별한 낱말 third예요.' },
        { a: '3rd', why: '숫자로 줄여 쓴 꼴이에요. 낱말 철자로 써 보세요: third' },
      ],
      explain: '셋째는 **third**예요. first, second, third 세 개는 모양이 특별해서 따로 외워요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '"열두째"를 나타내는 낱말의 철자가 바른 것은 무엇일까요?',
      choices: ['twelfth', 'twelveth', 'twelvth', 'twelth'],
      answer: 0,
      why: ['', 'twelve에 th를 그대로 붙였어요. ve가 f로 바뀌어요.', 've를 f로 바꾸지 않았어요. twel**f**th처럼 f가 들어가요.', 'f가 빠졌어요. twel**f**th예요.'],
      explain: 'twelve는 ve가 f로 바뀌고 th가 붙어 **twelfth**가 돼요. five → fifth와 같은 규칙이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '8월을 뜻하는 낱말은 무엇일까요?',
      choices: ['August', 'October', 'April', 'June'],
      answer: 0,
      why: ['', 'October는 10월이에요.', 'April은 4월이에요.', 'June은 6월이에요.'],
      explain: '8월은 **August**예요. 7월 July 다음에 August가 와요.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 3,
      q: 'May 5th는 May five라고 읽어요.',
      answer: false,
      explain: '날짜는 순서를 나타내는 말로 읽어요. 5th는 fifth이므로 **May fifth**라고 읽어요.',
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 3,
      q: '우리말 뜻에 맞게 낱말을 순서대로 놓으세요.\n\n"네 생일은 언제니?"',
      choices: ['When', 'is', 'your', 'birthday?'],
      answer: [0, 1, 2, 3],
      explain: '언제인지 묻는 When으로 시작하고, is your birthday를 이어요. **When is your birthday?**',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '친구에게 생일 선물을 건네면서 할 말로 알맞은 것은 무엇일까요?',
      choices: ['This is for you.', "You're welcome.", 'Nice to meet you.', 'What grade are you in?'],
      answer: 0,
      why: ['', 'You\'re welcome.은 "고마워"라는 말에 답할 때 써요.', '처음 만난 사람에게 하는 인사예요.', '몇 학년인지 묻는 말이에요.'],
      explain: '선물을 건넬 때는 **This is for you.**(이거 너 주려고 준비했어.)라고 말해요.',
    },
    {
      id: 'p8', level: 2, type: 'short', check: 'text', concept: 3,
      q: '대화를 읽고 빈칸에 알맞은 달 이름을 영어로 쓰세요.\n\nA: When is your birthday?\nB: It\'s [[빈칸]] 3rd. (내 생일은 9월 3일이야.)',
      answer: ['September'],
      hint: '9월부터 12월까지는 모두 -ber로 끝나요.',
      wrong: [
        { a: 'October', why: 'October는 10월이에요. 9월은 September예요.' },
        { a: 'November', why: 'November는 11월이에요. 9월은 September예요.' },
      ],
      explain: '9월은 **September**예요. B는 It\'s September 3rd.(9월 3일이야.)라고 말한 거예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '글을 읽고 물음에 답하세요.\n\nHi, I\'m Jia. I\'m in the fifth grade. My birthday is November 22nd. I like cake very much!\n\n지아의 생일은 언제일까요?',
      choices: ['11월 22일', '11월 2일', '12월 22일', '10월 22일'],
      answer: 0,
      why: ['', '22nd는 twenty-second, 곧 22일이에요.', 'December가 12월이에요. 글에는 November(11월)가 나와요.', 'October가 10월이에요. 글에는 November(11월)가 나와요.'],
      hint: 'November가 몇 월인지, 22nd가 며칠인지 차례로 찾아보세요.',
      explain: 'My birthday is November 22nd.에서 November는 11월, 22nd는 22일이에요. 그래서 지아의 생일은 11월 22일이에요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 1,
      q: 'twenty-first를 숫자로 줄여 쓴 것은 무엇일까요?',
      choices: ['21st', '21th', '20st', '21nd'],
      answer: 0,
      why: ['', '끝이 first이므로 th가 아니라 st를 붙여요.', 'twenty-first는 21이에요. 20은 twentieth(20th)예요.', 'nd는 second(2nd)처럼 끝이 2일 때 붙여요.'],
      explain: 'twenty-first는 21이고, 끝의 first에 맞춰 st를 붙여 **21st**로 써요.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 0,
      q: '우리말 뜻에 맞게 낱말을 순서대로 놓으세요.\n\n"나는 6학년이야."',
      choices: ["I'm", 'in', 'the', 'sixth', 'grade.'],
      answer: [0, 1, 2, 3, 4],
      explain: 'I\'m in the + 순서의 말 + grade의 꼴이에요. **I\'m in the sixth grade.**',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: Happy birthday, Minsu! This is for you.\nB: [[빈칸]]',
      choices: ['Wow! Thank you so much.', "You're welcome.", "That's okay.", "I'm in the sixth grade."],
      answer: 0,
      why: ['', 'You\'re welcome.은 고맙다는 말에 대답할 때 써요. 선물을 받은 민수가 먼저 고마움을 말해야 해요.', 'That\'s okay.는 주로 사과를 받아 줄 때 "괜찮아."라고 하는 말이에요. 선물을 받았으면 고마움을 말해요.', '학년을 묻지 않았어요. 선물을 받았으니 고마움을 말해요.'],
      hint: '선물을 받은 사람이 할 말을 찾아보세요.',
      explain: 'A가 생일을 축하하며 선물을 주었으니, 민수는 **Wow! Thank you so much.**(와, 정말 고마워.)라고 답하는 것이 알맞아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '오늘은 4월 30일(April 30th)이에요. 4월은 30일까지 있어요. 내일 날짜를 영어로 바르게 쓴 것은 무엇일까요?',
      choices: ['May 1st', 'April 31st', 'May 31st', 'April 1st'],
      answer: 0,
      why: ['', '4월은 30일까지 있어서 4월 31일은 없어요. 다음 날은 5월이 시작돼요.', '날짜를 31로 바꾸었어요. 4월 30일 다음 날은 5월 1일이에요.', '달을 그대로 두고 1일로 돌아갔어요. 달도 다음 달로 바뀌어요.'],
      hint: '4월의 마지막 날 다음 날은 어느 달이 시작될까요?',
      explain: '4월은 30일까지 있으므로 4월 30일 다음 날은 5월 1일이에요. 5월은 May, 1일은 first(1st)이므로 **May 1st**예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 1,
      q: '11th를 영어 낱말로 쓰세요. (숫자 말고 낱말로)',
      answer: ['eleventh'],
      hint: '끝이 1이지만 11은 eleven이라는 한 낱말이에요.',
      wrong: [
        { a: 'eleven-first', why: '21(twenty-first)처럼 생각했어요. 11은 eleven이라는 한 낱말이라 th만 붙여요.' },
        { a: 'elevenfirst', why: '21(twenty-first)처럼 생각했어요. 11은 eleven이라는 한 낱말이라 th만 붙여요.' },
        { a: 'eleven', why: '개수를 나타내는 말이에요. 순서를 나타내려면 th를 붙여요.' },
      ],
      explain: '11은 eleven이라는 한 낱말이므로 끝에 th만 붙여 **eleventh**예요. 그래서 줄여 쓸 때도 11st가 아니라 11th로 써요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '어린이날은 5월 5일(May 5th)이에요. 민수의 생일은 어린이날 바로 다음 날이에요.\n\n민수가 When is your birthday?에 바르게 대답한 것은 무엇일까요?',
      choices: ["It's May sixth.", "It's May six.", "It's May fourth.", "It's June fifth."],
      answer: 0,
      why: ['', '날짜는 순서를 나타내는 말로 말해요. six가 아니라 sixth예요.', '바로 다음 날이므로 5일보다 하루 뒤인 6일이에요.', '달을 바꾸었어요. 다음 날은 같은 5월이에요.'],
      hint: '5월 5일의 다음 날을 먼저 구하고, 그 날짜를 순서의 말로 읽어 보세요.',
      explain: '5월 5일 다음 날은 5월 6일이에요. 6일은 sixth이므로 **It\'s May sixth.**(줄여 쓰면 May 6th)가 알맞아요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '글을 읽고 물음에 답하세요.\n\nHello, I\'m Seojun. I\'m in the sixth grade. My sister Hayun is in the third grade. Her birthday is March 2nd. My birthday is December 24th.\n\n글의 내용과 **맞지 않는** 것은 무엇일까요?',
      choices: ['서준이는 6학년이에요.', '하윤이는 3학년이에요.', '하윤이의 생일은 3월 2일이에요.', '서준이의 생일은 11월 24일이에요.'],
      answer: 3,
      why: ['I\'m in the sixth grade.라고 했으니 맞는 내용이에요.', 'Hayun is in the third grade.라고 했으니 맞는 내용이에요.', 'Her birthday is March 2nd.라고 했으니 맞는 내용이에요.', ''],
      hint: '달 이름 December가 몇 월인지 확인해 보세요.',
      explain: '서준이는 My birthday is December 24th.라고 했어요. December는 12월이므로 서준이의 생일은 12월 24일이에요. 11월은 November예요.',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 4,
      q: '생일 대화가 자연스럽게 이어지도록 순서대로 놓으세요. (민수가 먼저 생일 축하 인사를 하고, 두 사람이 한 번씩 번갈아 말해요.)',
      choices: ['Minsu: Happy birthday, Jia!', 'Jia: Thank you, Minsu.', 'Minsu: This is for you.', 'Jia: Wow, a cap! I like it.'],
      answer: [0, 1, 2, 3],
      hint: '민수와 지아가 번갈아 말해요. 선물을 보고 놀라는 말은 선물을 건넨 뒤에 나와요.',
      explain: '먼저 민수가 생일을 축하하고(Happy birthday), 지아가 고마워해요(Thank you). 민수가 선물을 건네면(This is for you), 지아가 선물을 보고 마음에 든다고 말해요(Wow, a cap! I like it.).',
    },
  ],

  deeper: [
    {
      title: 'September는 왜 9월일까?',
      body: 'September의 septem은 옛 로마의 말(라틴어)로 **7**이라는 뜻이에요. 그런데 왜 9월일까요?\n\n아주 오래전 로마 달력은 한 해를 3월(March)부터 세었어요. 그래서 September가 일곱째 달이었지요. 나중에 1월과 2월이 한 해의 앞쪽으로 오면서 두 달씩 밀려 9월이 되었어요.\n\nOctober(octo = 8), November(novem = 9), December(decem = 10)도 같은 까닭으로 이름과 실제 달이 두 달씩 차이가 나요.',
    },
    {
      title: '날짜를 읽는 두 가지 방법',
      body: 'May 5th를 미국에서는 보통 **May fifth**라고 읽어요. 영국에서는 **the fifth of May**처럼 날짜를 먼저 말하기도 해요.\n\n어느 쪽이든 날짜는 **순서를 나타내는 말(fifth)**로 읽는다는 점은 같아요. 중학교에 가면 더 다양한 날짜 표현을 만나게 돼요.',
    },
  ],

  faq: [
    {
      q: '날짜를 말할 때 왜 five가 아니라 fifth라고 해요?',
      a: '날짜는 "그 달의 몇째 날"이라는 뜻이라서 순서를 나타내는 말로 말해요. 그래서 5월 5일은 May fifth예요. 나이처럼 개수를 말할 때는 five를 써요.',
    },
    {
      q: '쓸 때 May 5라고만 써도 돼요?',
      a: '네, 숫자만 써서 May 5라고 쓰는 경우도 많아요. 하지만 소리 내어 읽을 때는 May fifth처럼 순서를 나타내는 말로 읽어요. 이 단원에서는 May 5th처럼 st, nd, rd, th를 붙여 써요.',
    },
    {
      q: '"I\'m in sixth grade."처럼 the를 빼도 돼요?',
      a: '미국에서는 the 없이 말하는 사람도 많아요. 하지만 학교에서는 I\'m in the sixth grade.처럼 the를 넣어 배우니, 문제를 풀 때는 the를 넣어 쓰세요.',
    },
    {
      q: 'What grade are you in?에서 in은 왜 맨 끝에 있어요?',
      a: '대답 I\'m in the sixth grade.의 in이 질문에서는 맨 뒤로 간 거예요. "몇 학년 안에 있니?"를 영어 순서대로 말하면 in이 끝에 남아요.',
    },
  ],

  mistakes: [
    'I\'m in the six grade.처럼 학년을 개수를 나타내는 말로 말하는 실수 — 학년과 날짜는 sixth처럼 순서를 나타내는 말로 말해요.',
    'fiveth, twelveth, nineth처럼 철자를 쓰는 실수 — fifth, twelfth, ninth처럼 모양이 바뀌어요.',
    'may, july처럼 달 이름을 소문자로 쓰는 실수 — 달 이름은 May, July처럼 첫 글자를 대문자로 써요.',
  ],

  gens: [
    {
      id: 'read-date',
      level: 1,
      title: '날짜를 순서의 말로 읽기',
      make: function (R) {
        var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        var ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
        function card(n) { if (n < 20) return ONES[n]; var t = n < 30 ? 'twenty' : 'thirty'; return n % 10 ? t + '-' + ONES[n % 10] : t; }
        function ord(n) { if (n < 20) return ORD[n]; var t = n < 30 ? 'twenty' : 'thirty'; return n % 10 ? t + '-' + ORD[n % 10] : t.slice(0, -1) + 'ieth'; }
        function abbr(n) { var k = n % 100; if (k >= 11 && k <= 13) return n + 'th'; var o = n % 10; return n + (o === 1 ? 'st' : o === 2 ? 'nd' : o === 3 ? 'rd' : 'th'); }
        var m = R.int(0, 11);
        var d = R.int(1, DAYS[m]);
        var month = MONTHS[m];
        var next = (m + 1) % 12;
        var prev = (m + 11) % 12;
        var correct = month + ' ' + ord(d);
        var nearDay = d < DAYS[m] ? d + 1 : d - 1;
        var cands = [
          [month + ' ' + card(d), '개수를 나타내는 말로 읽었어요. 날짜는 ' + ord(d) + '처럼 순서를 나타내는 말로 읽어요.'],
          [MONTHS[next] + ' ' + ord(d), '달 이름을 잘못 골랐어요. 그 낱말은 ' + (next + 1) + '월이에요. ' + (m + 1) + '월은 ' + month + (m === 3 || m === 5 ? '이에요.' : '예요.')],
          [month + ' ' + ord(nearDay), '날짜의 수를 잘못 읽었어요. ' + abbr(d) + '의 숫자를 다시 확인해 보세요.'],
          [MONTHS[next] + ' ' + card(d), '달 이름도 틀리고, 날짜도 개수를 나타내는 말로 읽었어요.'],
          [MONTHS[prev] + ' ' + ord(d), '달 이름을 잘못 골랐어요. 그 낱말은 ' + (prev + 1) + '월이에요. ' + (m + 1) + '월은 ' + month + (m === 3 || m === 5 ? '이에요.' : '예요.')],
        ];
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 3,
          q: '다음 날짜를 소리 내어 읽은 것으로 알맞은 것을 고르세요.\n\n' + month + ' ' + abbr(d) + ' (' + (m + 1) + '월 ' + d + '일)',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '날짜는 "달 이름 + 순서를 나타내는 말"로 읽어요. ' + (m + 1) + '월은 ' + month + ', ' + d + '일은 ' + abbr(d) + ' → ' + ord(d) + '. 그래서 답은 **' + correct + '**.',
        };
      },
    },
    {
      id: 'ordinal-abbr',
      level: 2,
      title: '순서의 말을 숫자로 줄여 쓰기',
      make: function (R) {
        var ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
        function ord(n) { if (n < 20) return ORD[n]; var t = n < 30 ? 'twenty' : 'thirty'; return n % 10 ? t + '-' + ORD[n % 10] : t.slice(0, -1) + 'ieth'; }
        var n = R.int(1, 31);
        var k = n % 100;
        var o = n % 10;
        var suf = (k >= 11 && k <= 13) ? 'th' : (o === 1 ? 'st' : o === 2 ? 'nd' : o === 3 ? 'rd' : 'th');
        var word = ord(n);
        var correct = n + suf;
        var MEAN = { st: 'st는 first처럼 st로 끝나는 낱말에 붙여요.', nd: 'nd는 second처럼 nd로 끝나는 낱말에 붙여요.', rd: 'rd는 third처럼 rd로 끝나는 낱말에 붙여요.', th: 'th는 fourth, tenth처럼 th로 끝나는 낱말에 붙여요.' };
        var wrongs = ['st', 'nd', 'rd', 'th'].filter(function (s) { return s !== suf; }).map(function (s) { return n + s; });
        var pick = R.choices(correct, wrongs);
        var tip = (k >= 11 && k <= 13) ? ' 11·12·13은 eleventh, twelfth, thirteenth이므로 끝이 1, 2, 3이라도 th를 붙여요.' : '';
        return {
          type: 'choice', concept: 1,
          q: '다음 낱말을 숫자로 줄여 쓴 것으로 알맞은 것을 고르세요.\n\n' + word,
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            var s = c.slice(String(n).length);
            return MEAN[s] + ' 이 낱말의 마지막 두 글자는 ' + suf + '예요.';
          }),
          explain: '줄여 쓸 때는 숫자 뒤에 낱말의 마지막 두 글자를 붙여요. ' + word + ' → **' + correct + '**.' + tip,
        };
      },
    },
  ],

  vocab: [
    { w: 'grade', m: '학년', ex: "I'm in the sixth grade.", exm: '나는 6학년이에요.' },
    { w: 'birthday', m: '생일', ex: 'When is your birthday?', exm: '네 생일은 언제니?' },
    { w: 'month', m: '달, 월', ex: 'There are twelve months in a year.', exm: '1년에는 열두 달이 있어요.' },
    { w: 'first', m: '첫째(의)', ex: 'My brother is in the first grade.', exm: '내 남동생은 1학년이에요.' },
    { w: 'second', m: '둘째(의)', ex: 'My birthday is March 2nd. (March second)', exm: '내 생일은 3월 2일이에요.' },
    { w: 'third', m: '셋째(의)', ex: 'She is in the third grade.', exm: '그 아이는 3학년이에요.' },
    { w: 'fifth', m: '다섯째(의)', ex: "Children's Day is May 5th. (May fifth)", exm: '어린이날은 5월 5일이에요.' },
    { w: 'ninth', m: '아홉째(의)', ex: 'Today is October 9th. (October ninth)', exm: '오늘은 10월 9일이에요.' },
    { w: 'twelfth', m: '열두째(의)', ex: 'His birthday is June 12th. (June twelfth)', exm: '그의 생일은 6월 12일이에요.' },
    { w: 'twentieth', m: '스무째(의)', ex: 'The party is on April 20th. (April twentieth)', exm: '파티는 4월 20일에 있어요.' },
    { w: 'January', m: '1월', ex: 'January is the first month of the year.', exm: '1월은 한 해의 첫째 달이에요.' },
    { w: 'March', m: '3월', ex: 'School starts in March.', exm: '학교는 3월에 시작해요.' },
    { w: 'July', m: '7월', ex: 'My birthday is in July.', exm: '내 생일은 7월에 있어요.' },
    { w: 'September', m: '9월', ex: 'It is cool in September.', exm: '9월에는 날씨가 선선해요.' },
    { w: 'December', m: '12월', ex: 'Christmas is in December.', exm: '크리스마스는 12월에 있어요.' },
    { w: 'present', m: '선물', ex: 'This present is for you.', exm: '이 선물은 너를 위한 거야.' },
    { w: 'party', m: '파티', ex: 'Come to my birthday party!', exm: '내 생일 파티에 와!' },
  ],
});
