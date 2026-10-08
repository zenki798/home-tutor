/* 다시 시작하는 영어 기초 문법 · 수동태 기초
 * 예문·지문은 모두 직접 쓴 문장이다(가상의 인물·장소). 영어 낱말 바로 뒤에는 받침에 따라 바뀌는 조사를 붙이지 않는다. */
(function () {
  var BE = { pres: ['is', 'are'], past: ['was', 'were'], fut: ['will be', 'will be'] };
  var TENSE_WHY = {
    pres: '늘 그렇거나 되풀이되는 일이라 현재형',
    past: '이미 지난 일이라 과거형',
    fut: '앞으로의 일이라 미래형',
  };

  // be + 과거분사 생성기: [문장(괄호 앞 빈칸), 원형, 과거분사, 복수?, 시제, 단서, 우리말]
  var BP = [
    ['English ___ (speak) in many countries.', 'speak', 'spoken', false, 'pres', 'in many countries', '영어는 많은 나라에서 쓰입니다.'],
    ['These cars ___ (make) in Ulsan these days.', 'make', 'made', true, 'pres', 'these days', '요즘 이 자동차들은 울산에서 만들어집니다.'],
    ['This bridge ___ (build) in 1998.', 'build', 'built', false, 'past', 'in 1998', '이 다리는 1998년에 지어졌습니다.'],
    ['The windows ___ (break) by the storm last night.', 'break', 'broken', true, 'past', 'last night', '어젯밤 폭풍에 창문들이 깨졌습니다.'],
    ['The meeting ___ (hold) next Monday.', 'hold', 'held', false, 'fut', 'next Monday', '회의는 다음 주 월요일에 열릴 것입니다.'],
    ['The results ___ (announce) next week.', 'announce', 'announced', true, 'fut', 'next week', '결과는 다음 주에 발표될 것입니다.'],
    ['The office ___ (clean) every evening.', 'clean', 'cleaned', false, 'pres', 'every evening', '사무실은 매일 저녁 청소됩니다.'],
    ['Many photos ___ (take) at the wedding yesterday.', 'take', 'taken', true, 'past', 'yesterday', '어제 결혼식에서 사진이 많이 찍혔습니다.'],
    ['The letter ___ (write) in 1950.', 'write', 'written', false, 'past', 'in 1950', '그 편지는 1950년에 쓰였습니다.'],
    ['Dinner ___ (serve) at seven every night.', 'serve', 'served', false, 'pres', 'every night', '저녁 식사는 매일 밤 일곱 시에 나옵니다.'],
    ['The new gym ___ (finish) next month.', 'finish', 'finished', false, 'fut', 'next month', '새 체육관은 다음 달에 완공될 것입니다.'],
    ['All the tickets ___ (sell) last week.', 'sell', 'sold', true, 'past', 'last week', '표는 지난주에 모두 팔렸습니다.'],
    ['Coffee ___ (grow) in many hot countries.', 'grow', 'grown', false, 'pres', 'in many hot countries', '커피는 더운 여러 나라에서 재배됩니다.'],
    ['The package ___ (deliver) tomorrow morning.', 'deliver', 'delivered', false, 'fut', 'tomorrow morning', '소포는 내일 아침에 배달될 것입니다.'],
    ['These shoes ___ (design) by a young designer last year.', 'design', 'designed', true, 'past', 'last year', '이 신발들은 작년에 젊은 디자이너가 디자인했습니다.'],
    ['Our lost dog ___ (find) by a neighbor yesterday.', 'find', 'found', false, 'past', 'yesterday', '잃어버린 우리 개는 어제 이웃이 찾아 주었습니다.'],
    ['The hotel rooms ___ (clean) every day.', 'clean', 'cleaned', true, 'pres', 'every day', '호텔 방들은 매일 청소됩니다.'],
    ['Your order ___ (send) tomorrow.', 'send', 'sent', false, 'fut', 'tomorrow', '주문하신 물건은 내일 발송될 것입니다.'],
    ['The front door ___ (paint) last week.', 'paint', 'painted', false, 'past', 'last week', '현관문은 지난주에 칠해졌습니다.'],
    ['Rice ___ (eat) in many Asian countries.', 'eat', 'eaten', false, 'pres', 'in many Asian countries', '쌀은 아시아의 많은 나라에서 먹습니다.'],
    ['The cookies ___ (bake) this morning.', 'bake', 'baked', true, 'past', 'this morning', '쿠키는 오늘 아침에 구워졌습니다.'],
    ['The town festival ___ (hold) every October.', 'hold', 'held', false, 'pres', 'every October', '마을 축제는 해마다 10월에 열립니다.'],
    ['The new rules ___ (explain) at tomorrow\'s meeting.', 'explain', 'explained', true, 'fut', 'tomorrow\'s meeting', '새 규칙은 내일 회의에서 설명될 것입니다.'],
  ];

  // 능동태 → 수동태 생성기
  // act 능동문, obj 수동문의 주어, pl 그 주어가 복수?, pp 과거분사, t 시제, ag 수동문의 by 뒤(목적격), agS 능동문 주어(문장 첫머리 꼴), agPl 행위자가 복수?, pron 대명사(주격 꼴), tail 꼬리, ko 우리말
  var AP = [
    { act: 'Minsu wrote this report.', obj: 'This report', pl: false, pp: 'written', t: 'past', ag: 'Minsu', agS: 'Minsu', agPl: false, tail: '', ko: '이 보고서는 민수가 썼습니다.' },
    { act: 'Jia painted these pictures.', obj: 'These pictures', pl: true, pp: 'painted', t: 'past', ag: 'Jia', agS: 'Jia', agPl: false, tail: '', ko: '이 그림들은 지아가 그렸습니다.' },
    { act: 'He cleans the office every day.', obj: 'The office', pl: false, pp: 'cleaned', t: 'pres', ag: 'him', agS: 'He', agPl: false, pron: 'he', tail: ' every day', ko: '사무실은 매일 그가 청소합니다.' },
    { act: 'They built this bridge in 1998.', obj: 'This bridge', pl: false, pp: 'built', t: 'past', ag: 'them', agS: 'They', agPl: true, pron: 'they', tail: ' in 1998', ko: '이 다리는 1998년에 그들이 지었습니다.' },
    { act: 'My mother makes these cookies.', obj: 'These cookies', pl: true, pp: 'made', t: 'pres', ag: 'my mother', agS: 'My mother', agPl: false, tail: '', ko: '이 쿠키들은 제 어머니가 만드십니다.' },
    { act: 'Many tourists visit this village.', obj: 'This village', pl: false, pp: 'visited', t: 'pres', ag: 'many tourists', agS: 'Many tourists', agPl: true, tail: '', ko: '이 마을은 많은 관광객이 찾습니다.' },
    { act: 'A famous chef will cook the dinner.', obj: 'The dinner', pl: false, pp: 'cooked', t: 'fut', ag: 'a famous chef', agS: 'A famous chef', agPl: false, tail: '', ko: '저녁 식사는 유명한 요리사가 요리할 것입니다.' },
    { act: 'She answered all the questions.', obj: 'All the questions', pl: true, pp: 'answered', t: 'past', ag: 'her', agS: 'She', agPl: false, pron: 'she', tail: '', ko: '모든 질문에 그녀가 답했습니다.' },
    { act: 'Seojun broke the window.', obj: 'The window', pl: false, pp: 'broken', t: 'past', ag: 'Seojun', agS: 'Seojun', agPl: false, tail: '', ko: '창문은 서준이 깼습니다.' },
    { act: 'The teacher will check our homework.', obj: 'Our homework', pl: false, pp: 'checked', t: 'fut', ag: 'the teacher', agS: 'The teacher', agPl: false, tail: '', ko: '우리 숙제는 선생님이 확인하실 것입니다.' },
    { act: 'Many people use this app.', obj: 'This app', pl: false, pp: 'used', t: 'pres', ag: 'many people', agS: 'Many people', agPl: true, tail: '', ko: '이 앱은 많은 사람이 씁니다.' },
    { act: 'Jia took these photos.', obj: 'These photos', pl: true, pp: 'taken', t: 'past', ag: 'Jia', agS: 'Jia', agPl: false, tail: '', ko: '이 사진들은 지아가 찍었습니다.' },
    { act: 'My father fixed the car.', obj: 'The car', pl: false, pp: 'fixed', t: 'past', ag: 'my father', agS: 'My father', agPl: false, tail: '', ko: '그 차는 제 아버지가 고치셨습니다.' },
    { act: 'We will send the invitations tomorrow.', obj: 'The invitations', pl: true, pp: 'sent', t: 'fut', ag: 'us', agS: 'We', agPl: true, pron: 'we', tail: ' tomorrow', ko: '초대장은 내일 우리가 보낼 것입니다.' },
    { act: 'Children love this cartoon.', obj: 'This cartoon', pl: false, pp: 'loved', t: 'pres', ag: 'children', agS: 'Children', agPl: true, tail: '', ko: '이 만화는 아이들이 아주 좋아합니다.' },
    { act: 'The company hired five new workers.', obj: 'Five new workers', pl: true, pp: 'hired', t: 'past', ag: 'the company', agS: 'The company', agPl: false, tail: '', ko: '새 직원 다섯 명이 그 회사에 뽑혔습니다.' },
    { act: 'He designed this house.', obj: 'This house', pl: false, pp: 'designed', t: 'past', ag: 'him', agS: 'He', agPl: false, pron: 'he', tail: '', ko: '이 집은 그가 설계했습니다.' },
    { act: 'Hayun will plan the trip.', obj: 'The trip', pl: false, pp: 'planned', t: 'fut', ag: 'Hayun', agS: 'Hayun', agPl: false, tail: '', ko: '여행 계획은 하윤이 세울 것입니다.' },
    { act: 'A neighbor found our dog.', obj: 'Our dog', pl: false, pp: 'found', t: 'past', ag: 'a neighbor', agS: 'A neighbor', agPl: false, tail: '', ko: '우리 개는 이웃이 찾아 주었습니다.' },
    { act: 'My sister wrote these letters.', obj: 'These letters', pl: true, pp: 'written', t: 'past', ag: 'my sister', agS: 'My sister', agPl: false, tail: '', ko: '이 편지들은 제 언니가 썼습니다.' },
    { act: 'They will open the new store next week.', obj: 'The new store', pl: false, pp: 'opened', t: 'fut', ag: 'them', agS: 'They', agPl: true, pron: 'they', tail: ' next week', ko: '새 가게는 다음 주에 그들이 열 것입니다.' },
  ];
  function be(t, pl) { return BE[t][pl ? 1 : 0]; }
  function lowFirst(s) { return s.charAt(0).toLowerCase() + s.slice(1); }

  // 수동 표현 전치사 생성기: [문장, [정답들], 표현, 흔한 틀린 답, 우리말, 틀린 답의 까닭(없으면 기본 문구)]
  var PE = [
    ['I am interested ___ Korean history.', ['in'], 'be interested in (~에 관심이 있다)', 'about', '저는 한국사에 관심이 있습니다.'],
    ['Are you interested ___ cooking?', ['in'], 'be interested in (~에 관심이 있다)', 'about', '요리에 관심이 있으세요?'],
    ['My son is interested ___ robots.', ['in'], 'be interested in (~에 관심이 있다)', 'at', '제 아들은 로봇에 관심이 있습니다.'],
    ['He is interested ___ jazz music.', ['in'], 'be interested in (~에 관심이 있다)', 'on', '그는 재즈 음악에 관심이 있습니다.'],
    ['The mountain is covered ___ snow.', ['with', 'in', 'by'], 'be covered with (~으로 덮여 있다 — covered in, covered by도 씁니다)', 'of', '산이 눈으로 덮여 있습니다.'],
    ['The old table was covered ___ dust.', ['with', 'in', 'by'], 'be covered with (~으로 덮여 있다 — covered in, covered by도 씁니다)', 'of', '낡은 식탁은 먼지로 덮여 있었습니다.'],
    ['The box is filled ___ old books.', ['with'], 'be filled with (~으로 가득 차 있다)', 'of', '상자에는 오래된 책이 가득 들어 있습니다.', 'filled 뒤에는 with를 씁니다. of는 full of(~으로 가득한)처럼 full과 짝을 이룹니다.'],
    ['The hall was filled ___ people.', ['with'], 'be filled with (~으로 가득 차 있다)', 'of', '강당은 사람들로 가득 찼습니다.', 'filled 뒤에는 with를 씁니다. of는 full of(~으로 가득한)처럼 full과 짝을 이룹니다.'],
    ['The streets were filled ___ cars.', ['with'], 'be filled with (~으로 가득 차 있다)', 'of', '거리는 차들로 가득했습니다.', 'filled 뒤에는 with를 씁니다. of는 full of(~으로 가득한)처럼 full과 짝을 이룹니다.'],
    ['I was surprised ___ the news.', ['at', 'by'], 'be surprised at (~에 놀라다 — surprised by도 씁니다)', 'with', '저는 그 소식에 놀랐습니다.'],
    ['Everyone was surprised ___ the result.', ['at', 'by'], 'be surprised at (~에 놀라다 — surprised by도 씁니다)', 'with', '모두가 그 결과에 놀랐습니다.'],
    ['This town is known ___ its beautiful beaches.', ['for'], 'be known for (~으로 유명하다)', 'as', '이 마을은 아름다운 해변으로 유명합니다.', 'be known as는 "~라는 이름·자격으로 알려져 있다"는 뜻입니다. 무엇 때문에 유명한지는 be known for로 말합니다.'],
    ['The restaurant is known ___ its fresh noodles.', ['for'], 'be known for (~으로 유명하다)', 'as', '그 식당은 신선한 국수로 유명합니다.', 'be known as는 "~라는 이름·자격으로 알려져 있다"는 뜻입니다. 무엇 때문에 유명한지는 be known for로 말합니다.'],
    ['I am worried ___ my exam.', ['about'], 'be worried about (~을 걱정하다)', 'of', '저는 시험이 걱정됩니다.'],
    ['She is worried ___ the weather.', ['about'], 'be worried about (~을 걱정하다)', 'on', '그녀는 날씨를 걱정합니다.'],
    ['My boss was pleased ___ my work.', ['with', 'by', 'about'], 'be pleased with (~에 기뻐하다, 만족하다 — pleased by, pleased about도 씁니다)', 'of', '팀장님은 제 일에 만족하셨습니다.'],
    ['Are you satisfied ___ the service?', ['with'], 'be satisfied with (~에 만족하다)', 'about', '서비스에 만족하십니까?'],
    ['I am tired ___ the same food every day.', ['of'], 'be tired of (~에 싫증이 나다)', 'about', '매일 같은 음식에 싫증이 났습니다.'],
    ['The children are excited ___ the trip.', ['about', 'for'], 'be excited about (~에 들떠 있다 — 미국 영어에서는 excited for도 씁니다)', 'with', '아이들은 여행에 들떠 있습니다.'],
    ['Our office is located ___ Daejeon.', ['in'], 'be located in (~에 있다, 위치하다)', 'on', '저희 사무실은 대전에 있습니다.'],
    ['We were excited ___ the new project.', ['about', 'for'], 'be excited about (~에 들떠 있다 — 미국 영어에서는 excited for도 씁니다)', 'with', '우리는 새 프로젝트에 들떠 있었습니다.'],
  ];

  Tutor.registerUnit({
    id: 'eng-a-basic-11',
    course: 'eng-a-basic',
    title: '수동태 기초',
    summary: 'be동사 + 과거분사로 \'~되다, ~받다\'를 말하고, 하는 사람보다 대상이 중요할 때 수동태를 쓰는 까닭을 익힙니다.',
    goals: [
      'be동사 + 과거분사로 수동태 문장을 만들고 "~되다, ~받다"로 해석할 수 있다.',
      '능동태 문장을 수동태로 바꾸고, 필요할 때 by + 행위자를 덧붙일 수 있다.',
      '과거(was·were + 과거분사)와 미래(will be + 과거분사)의 수동태를 쓸 수 있다.',
      'be born, be made of, be interested in 같은 수동 표현과 수동태의 부정문·의문문을 쓸 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '수동태의 형태와 뜻 — be동사 + 과거분사',
        body: '지금까지 배운 문장은 대부분 **하는 사람**이 주어였습니다. 이런 문장을 **능동태**라고 합니다.\n\n- Many people **speak** English. (많은 사람이 영어를 **쓴다**)\n\n같은 일을 **당하는 대상**을 주어로 세우면 **수동태**가 됩니다. 모양은 **be동사 + 과거분사**이고, 뜻은 "~되다, ~받다, ~해지다"입니다.\n\n- English **is spoken** in many countries. (영어는 많은 나라에서 **쓰인다**)\n\nbe동사는 주어의 수와 시제에 맞춥니다.\n\n| 주어 | 지금 | 예 |\n|---|---|---|\n| 하나 | is + 과거분사 | This room **is cleaned** every day. |\n| 여럿 | are + 과거분사 | These rooms **are cleaned** every day. |\n\n**언제 수동태를 쓸까요?**\n\n- 누가 했는지 모를 때: My bike **was stolen**. (자전거를 도둑맞았다 — 누가 훔쳤는지 모름)\n- 누가 했는지 중요하지 않거나 뻔할 때: Rice **is grown** in Asia. (아시아에서는 쌀이 재배된다)\n- 하는 사람보다 **대상**이 이야기의 중심일 때: This song **is loved** by many people.\n\n> ⚠️ 과거분사 대신 동사원형이나 과거형을 쓰지 않습니다. English is speak (✗) / English is spoke (✗) → English is **spoken** (○)',
        easy: '사진을 찍을 때 누구를 화면 한가운데 두느냐의 차이입니다.\n\n- 능동태: **엄마**를 가운데 두고 찍음 → Mom makes kimchi. (엄마가 김치를 만든다)\n- 수동태: **김치**를 가운데 두고 찍음 → Kimchi is made by Mom. (김치는 엄마가 만든다)\n\n주인공이 "하는 사람"에서 "당하는 것"으로 바뀌면, 동사는 be + 과거분사 옷으로 갈아입습니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nThis room ___ every morning.',
          choices: ['cleans', 'are cleaned', 'is cleaned'],
          answer: 2,
          why: [
            'cleans는 능동태라서 "이 방이 (무언가를) 청소한다"는 뜻이 됩니다. 방은 청소를 받는 대상입니다.',
            '주어 this room은 하나(단수)라서 are가 아니라 is를 씁니다.',
            '',
          ],
          explain: '방은 청소를 **받는** 대상이므로 수동태 be + 과거분사를 쓰고, 주어가 단수이므로 **is cleaned**입니다. "이 방은 매일 아침 청소됩니다."',
        },
      },
      {
        title: '능동태를 수동태로 바꾸기 — by + 행위자',
        body: '능동태 문장은 세 단계로 수동태로 바꿉니다.\n\n> Minsu **wrote** this report. (민수가 이 보고서를 썼다)\n\n1. 능동태의 **목적어**(this report)를 수동태의 **주어**로: This report …\n2. 동사를 **be + 과거분사**로, be는 원래 동사의 시제와 새 주어에 맞춰서: … **was written** …\n3. 능동태의 주어(Minsu)를 **by + 행위자**로 뒤에: … **by Minsu**.\n\n→ **This report was written by Minsu.** (이 보고서는 민수가 썼다)\n\n행위자가 대명사면 by 뒤에 **목적격**을 씁니다.\n\n| 능동태의 주어 | by 뒤 |\n|---|---|\n| I, we | by me, by us |\n| he, she | by him, by her |\n| they | by them |\n\n**by + 행위자는 자주 생략합니다.** 행위자가 사람들 일반(people, they, we)이거나, 모르거나, 중요하지 않을 때입니다.\n\n- They sell stamps here. → Stamps **are sold** here. (by them은 빼는 것이 자연스러움)\n\n> 💡 목적어가 없는 동사(arrive, sleep, happen 같은 동사)는 바꿀 대상이 없어서 수동태로 만들 수 없습니다. The accident was happened. (✗) → The accident happened. (○)',
        easy: '능동태 문장을 시소처럼 뒤집는다고 생각하세요.\n\n- 뒤쪽에 있던 목적어가 앞으로 올라오고\n- 앞에 있던 주어는 뒤로 내려가 by를 붙잡고\n- 가운데 동사는 be + 과거분사로 모양을 바꿉니다.\n\nJia took this photo. → This photo was taken by Jia.',
        check: {
          type: 'choice',
          q: '다음 문장을 수동태로 바르게 바꾼 것을 고르세요.\n\nShe made this cake.',
          choices: ['This cake made by her.', 'This cake was made by her.', 'This cake was made by she.'],
          answer: 1,
          why: [
            'be동사가 빠졌습니다. 수동태는 be + 과거분사입니다.',
            '',
            'by 뒤에는 목적격을 씁니다. she가 아니라 her입니다.',
          ],
          explain: '목적어 this cake를 주어로, made(과거)를 was made로, 주어 she를 by her로 바꿉니다: **This cake was made by her.**',
        },
      },
      {
        title: '과거와 미래의 수동태 — was built, will be held',
        body: '수동태의 시제는 **be동사**가 나타냅니다. 과거분사는 그대로 두고 be동사만 바꿉니다.\n\n| 시제 | 모양 | 예 |\n|---|---|---|\n| 현재 | am·is·are + 과거분사 | The museum **is visited** by many students. |\n| 과거 | was·were + 과거분사 | This bridge **was built** in 1975. / The windows **were broken**. |\n| 미래 | will be + 과거분사 | The meeting **will be held** next Monday. |\n\n- 과거: 주어가 하나면 was, 여럿이면 were\n- 미래: 주어와 상관없이 늘 **will be** (will 뒤는 동사원형 be)\n\n능동태와 함께 비교해 보면 이렇습니다.\n\n| 능동태 | 수동태 |\n|---|---|\n| They **built** the bridge in 1975. | The bridge **was built** in 1975. |\n| They **will hold** the meeting next Monday. | The meeting **will be held** next Monday. |\n\n> ⚠️ will be 뒤에도 과거분사를 씁니다. will be hold (✗) → will be **held** (○)',
        easy: '수동태 문장에서 시간을 알려 주는 일은 be동사 혼자 맡습니다.\n\n- 지금이면 is·are\n- 지난 일이면 was·were\n- 앞으로의 일이면 will be\n\n뒤의 과거분사(built, held …)는 시간이 바뀌어도 꼼짝하지 않습니다.',
        check: {
          type: 'short', check: 'text',
          q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰세요.\n\nThis museum ___ (build) in 1975.',
          answer: ['was built'],
          wrong: [
            { a: 'is built', why: 'in 1975(1975년)는 지난 일이라 is가 아니라 was를 씁니다.' },
            { a: 'built', why: 'be동사가 빠졌습니다. 박물관은 지어지는 대상이므로 was built로 씁니다.' },
            { a: 'was build', why: 'be동사 뒤에는 동사원형이 아니라 과거분사 built를 씁니다.' },
            { a: 'were built', why: '주어 this museum은 하나(단수)라서 were가 아니라 was를 씁니다.' },
          ],
          explain: '박물관은 지어진 대상이고(수동태), 1975년은 과거이며, 주어가 단수이므로 **was built**입니다. "이 박물관은 1975년에 지어졌습니다."',
        },
      },
      {
        title: '자주 쓰는 수동 표현 — be born, be made of, be interested in',
        body: '일상에서 굳어진 수동 표현이 있습니다. 덩어리로 익혀 둡니다.\n\n**be born (태어나다)** — 우리말은 "태어나다"이지만 영어는 수동태입니다.\n\n- I **was born** in 1985. / Where **were** you **born**? (과거의 일이라 was·were)\n\n**be made of / be made from (~으로 만들어지다)**\n\n- This table **is made of** wood. (재료가 겉으로 그대로 보일 때 — 나무 식탁)\n- Cheese **is made from** milk. (재료가 바뀌어 보이지 않을 때 — 우유 → 치즈)\n\n**by가 아닌 다른 전치사를 쓰는 표현**\n\n| 표현 | 뜻 | 예 |\n|---|---|---|\n| be interested in | ~에 관심이 있다 | I\'m **interested in** history. |\n| be covered with | ~으로 덮여 있다 | The car **is covered with** snow. |\n| be filled with | ~으로 가득 차 있다 | The box **is filled with** toys. |\n| be surprised at | ~에 놀라다 | We **were surprised at** the news. |\n| be known for | ~으로 유명하다 | This town **is known for** its tea. |\n| be worried about | ~을 걱정하다 | She **is worried about** her son. |\n| be satisfied with | ~에 만족하다 | Are you **satisfied with** the room? |\n| be pleased with | ~에 기뻐하다, 만족하다 | My boss **was pleased with** the report. |\n| be excited about | ~에 들떠 있다 | The kids **are excited about** the trip. |\n| be tired of | ~에 싫증이 나다 | I\'m **tired of** this song. |\n| be located in | ~에 있다, 위치하다 | Our office **is located in** Busan. |\n\n> 💡 covered in, surprised by처럼 다른 전치사를 쓰기도 하지만, 위의 꼴이 가장 기본입니다.',
        easy: '"태어나다"를 영어는 "(부모님에 의해) 낳아지다"라고 봅니다. 아기는 스스로 태어나는 것이 아니라 세상에 나오게 되는 것이니까요. 그래서 I am born이 아니라 이미 지난 일로 **I was born**이라고 합니다.\n\ninterested in, covered with 같은 표현은 낱말 짝꿍입니다. interested에는 in, covered에는 with가 늘 따라다닌다고 소리 내어 익혀 두세요.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말을 고르세요.\n\nI ___ in Daegu in 1988.',
          choices: ['born', 'am born', 'was born'],
          answer: 2,
          why: [
            'born만으로는 문장이 되지 않습니다. "태어나다"는 be born으로 씁니다.',
            '1988년에 태어난 것은 지난 일이라 am이 아니라 was를 씁니다.',
            '',
          ],
          explain: '"태어나다"는 수동 표현 be born이고, 1988년의 일이므로 **was born**입니다. "저는 1988년에 대구에서 태어났습니다."',
        },
      },
      {
        title: '수동태의 부정문과 의문문',
        body: '수동태는 be동사가 있는 문장이므로, be동사 문장처럼 부정문과 의문문을 만듭니다. do·does·did를 쓰지 않습니다.\n\n| 문장 | 만드는 법 | 예 |\n|---|---|---|\n| 부정문 | be동사 + not + 과거분사 | It **wasn\'t made** in Korea. / These seats **aren\'t reserved**. |\n| 의문문 | be동사 + 주어 + 과거분사 ~? | **Was** it **made** in Korea? — Yes, it was. / No, it wasn\'t. |\n| 의문사 의문문 | 의문사 + be동사 + 주어 + 과거분사 ~? | **When was** this house **built**? / **Where were** you **born**? |\n| 미래 | won\'t be + 과거분사 / Will + 주어 + be + 과거분사 ~? | The store **won\'t be opened** on Sunday. / **Will** the report **be finished** by Friday? |\n\n> ⚠️ It didn\'t made in Korea. (✗) / Did it made in Korea? (✗) — 수동태에는 did를 쓰지 않고 be동사를 움직입니다.',
        easy: '수동태 문장의 열쇠는 be동사입니다.\n\n- "아니다"라고 하려면 be동사 바로 뒤에 not을 붙이고\n- 물어보려면 be동사를 맨 앞으로 데려옵니다.\n\nThis bag was made in Italy. → This bag **wasn\'t** made in Italy. / **Was** this bag made in Italy?',
        check: {
          type: 'choice',
          q: '"이 다리는 언제 지어졌나요?"를 영어로 바르게 옮긴 것을 고르세요.',
          choices: ['When did this bridge built?', 'When was this bridge built?', 'When was built this bridge?'],
          answer: 1,
          why: [
            '수동태 의문문에는 did를 쓰지 않습니다. be동사를 주어 앞으로 옮깁니다.',
            '',
            '과거분사 built는 주어 뒤에 둡니다. 의문사 + be동사 + 주어 + 과거분사 순서입니다.',
          ],
          explain: '의문사 + be동사 + 주어 + 과거분사 순서: **When was this bridge built?**',
        },
      },
    ],

    examples: [
      {
        q: '다음 능동태 문장을 수동태로 바꾸어 보세요.\n\nMy grandfather planted these trees in 1990.',
        steps: [
          '목적어 these trees를 주어로 세웁니다: These trees …',
          '원래 동사 planted는 과거이고 새 주어 these trees는 여럿이므로 be동사는 were, 그 뒤에 과거분사 planted: … were planted …',
          '원래 주어 my grandfather는 by 뒤로 보냅니다: … by my grandfather',
          '때를 나타내는 in 1990은 그대로 문장 끝에 둡니다.',
        ],
        answer: 'These trees were planted by my grandfather in 1990. (이 나무들은 1990년에 할아버지께서 심으셨습니다.)',
      },
      {
        q: '다음 수동태 문장을 부정문과 의문문으로 바꾸어 보세요.\n\nThe tickets will be sold online.',
        steps: [
          '미래 수동태 will be + 과거분사 문장입니다.',
          '부정문은 will 뒤에 not을 붙입니다: The tickets will not(won\'t) be sold online.',
          '의문문은 will을 주어 앞으로 옮깁니다: Will the tickets be sold online?',
        ],
        answer: '부정문: The tickets won\'t be sold online. / 의문문: Will the tickets be sold online? — Yes, they will. / No, they won\'t.',
      },
    ],

    terms: [
      { term: '능동태', def: '하는 사람이 주어인 문장입니다. 예: Jia wrote the letter. (지아가 편지를 썼다)' },
      { term: '수동태', def: '당하는 대상이 주어이고 동사가 be + 과거분사인 문장입니다. 뜻은 "~되다, ~받다"입니다. 예: The letter was written by Jia.' },
      { term: '과거분사', def: '동사의 셋째 모양입니다. 수동태에서는 be동사 뒤에 씁니다. 예: write – wrote – written' },
      { term: '행위자', def: '그 일을 한 사람이나 것입니다. 수동태에서는 by + 행위자(목적격)로 나타내고, 중요하지 않으면 뺍니다.' },
      { term: '수동 표현', def: 'be born, be made of, be interested in처럼 수동태 모양으로 굳어진 표현입니다. by가 아닌 전치사를 쓰는 것이 많습니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '**수동태** 문장을 고르세요.',
        choices: ['Jia cleans the kitchen.', 'Jia is cleaning the kitchen.', 'The kitchen is cleaned by Jia.', 'Jia cleaned the kitchen.'],
        answer: 2,
        why: [
          '하는 사람(Jia)이 주어이고 동사가 cleans인 능동태입니다.',
          'be동사 + -ing는 "~하고 있다"는 진행형입니다. 수동태는 be동사 + 과거분사입니다.',
          '',
          '하는 사람(Jia)이 주어인 능동태의 과거형입니다.',
        ],
        explain: '당하는 대상(the kitchen)이 주어이고 동사가 be + 과거분사(is cleaned)인 문장이 수동태입니다. "부엌은 지아가 청소합니다."',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰세요.\n\nKorean ___ (speak) in Korea.',
        answer: ['is spoken'],
        hint: '한국어는 "말해지는" 대상입니다.',
        wrong: [
          { a: 'speaks', why: '능동태로 쓰면 "한국어가 (무언가를) 말한다"는 뜻이 됩니다. 한국어는 쓰이는 대상이므로 수동태입니다.' },
          { a: 'is speak', why: 'be동사 뒤에는 동사원형이 아니라 과거분사 spoken을 씁니다.' },
          { a: 'spoken', why: 'be동사가 빠졌습니다. 수동태는 be + 과거분사입니다.' },
          { a: 'are spoken', why: '주어 Korean(한국어)은 하나라서 is를 씁니다.' },
          { a: 'is spoke', why: 'spoke는 과거형입니다. 과거분사는 spoken입니다(speak – spoke – spoken).' },
        ],
        explain: '한국어는 쓰이는 대상이므로 수동태, 주어가 단수이고 지금의 사실이므로 **is spoken**입니다. "한국에서는 한국어를 씁니다."',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '빈칸에 알맞은 말을 고르세요.\n\nThis cake was made by ___.',
        choices: ['her', 'she', 'hers'],
        answer: 0,
        why: [
          '',
          'she는 주격입니다. 전치사 by 뒤에는 목적격을 씁니다.',
          'hers는 "그녀의 것"이라는 소유대명사입니다. 행위자를 나타낼 때는 목적격을 씁니다.',
        ],
        explain: '전치사 by 뒤에는 목적격을 쓰므로 **by her**입니다. "이 케이크는 그녀가 만들었습니다."',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: '다음 능동태 문장을 수동태로 바르게 바꾸었습니다.\n\nMany people visit this park.\n→ This park is visited by many people.',
        answer: true,
        explain: '목적어 this park를 주어로, visit(현재)를 is visited로, 주어 many people을 by many people로 옮겼습니다. 주어 this park가 단수라 is를 바르게 썼습니다.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nThis old church ___ in 1925.',
        choices: ['built', 'is built', 'was built', 'was build'],
        answer: 2,
        why: [
          '교회는 스스로 짓는 것이 아니라 지어지는 대상입니다. be동사가 필요합니다.',
          'in 1925는 지난 일이라 is가 아니라 was를 씁니다.',
          '',
          'be동사 뒤에는 동사원형이 아니라 과거분사 built를 씁니다.',
        ],
        explain: '지어진 대상 + 과거(in 1925) + 단수 주어 → **was built**. "이 오래된 교회는 1925년에 지어졌습니다."',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말을 고르세요.\n\nWhere ___ you born?',
        choices: ['are', 'did', 'were'],
        answer: 2,
        why: [
          '태어난 것은 지난 일이라 are가 아니라 과거형을 씁니다.',
          'be born은 수동 표현이라 의문문에 did를 쓰지 않고 be동사를 앞으로 옮깁니다.',
          '',
        ],
        explain: 'be born의 과거 의문문은 **Where were you born?** 입니다. "어디에서 태어나셨어요?"',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'text', concept: 3,
        q: '빈칸에 알맞은 전치사를 쓰세요.\n\nI am interested ___ Korean history.',
        answer: ['in'],
        wrong: [
          { a: 'about', why: '"~에 관심이 있다"는 be interested in입니다. about은 쓰지 않습니다.' },
          { a: 'by', why: '수동 표현이라도 interested 뒤에는 by가 아니라 in을 씁니다.' },
          { a: 'at', why: 'interested와 짝을 이루는 전치사는 in입니다.' },
        ],
        explain: '**be interested in**(~에 관심이 있다): I am interested in Korean history. "저는 한국사에 관심이 있습니다."',
      },
      {
        id: 'p8', level: 1, type: 'choice', concept: 4,
        q: '우리말을 영어로 바르게 옮긴 것을 고르세요.\n\n이 가방은 한국에서 만들어지지 않았습니다.',
        choices: ['This bag didn\'t made in Korea.', 'This bag wasn\'t made in Korea.', 'This bag wasn\'t make in Korea.', 'This bag not was made in Korea.'],
        answer: 1,
        why: [
          '수동태의 부정문에는 didn\'t를 쓰지 않습니다. be동사 뒤에 not을 붙입니다.',
          '',
          'be동사 뒤에는 과거분사 made를 씁니다.',
          'not은 be동사 뒤에 둡니다: was not(wasn\'t)',
        ],
        explain: '수동태 부정문은 **be동사 + not + 과거분사**: **This bag wasn\'t made in Korea.**',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 2,
        q: '빈칸에 알맞은 말을 고르세요.\n\nThe concert ___ in the park next Saturday.',
        choices: ['will hold', 'will be held', 'was held', 'will be hold'],
        answer: 1,
        hint: '콘서트는 여는 것인가요, 열리는 것인가요?',
        why: [
          '콘서트는 스스로 여는 것이 아니라 열리는 대상입니다. will hold는 능동태입니다.',
          '',
          'next Saturday(다음 주 토요일)는 앞으로의 일이라 was가 아니라 will be를 씁니다.',
          'will be 뒤에는 동사원형이 아니라 과거분사 held를 씁니다(hold – held – held).',
        ],
        explain: '앞으로 열릴 일이므로 미래 수동태 **will be held**입니다. "콘서트는 다음 주 토요일에 공원에서 열립니다."',
      },
      {
        id: 'p10', level: 2, type: 'order', concept: 1,
        q: '우리말에 맞게 배열하세요.\n\n이 사진들은 제 딸이 찍었습니다.',
        choices: ['These photos', 'were', 'taken', 'by', 'my daughter'],
        answer: [0, 1, 2, 3, 4],
        hint: '주어 + be동사 + 과거분사 + by + 행위자 순서입니다.',
        explain: '**These photos were taken by my daughter.** 주어가 여럿(these photos)이고 지난 일이라 were, take의 과거분사는 taken입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'text', concept: 4,
        q: '첫 문장을 보고 의문문을 완성했습니다. 빈칸에 알맞은 한 낱말을 쓰세요.\n\nThis house was built in 1970.\n→ When ___ this house built?',
        answer: ['was'],
        wrong: [
          { a: 'did', why: '수동태 의문문에는 did를 쓰지 않습니다. be동사 was를 주어 앞으로 옮깁니다.' },
          { a: 'is', why: '집이 지어진 것은 지난 일이라 was를 씁니다.' },
          { a: 'were', why: '주어 this house는 하나(단수)라서 was를 씁니다.' },
        ],
        explain: '의문사 + be동사 + 주어 + 과거분사: **When was this house built?** — It was built in 1970.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '두 빈칸에 들어갈 말을 차례대로 가장 알맞게 짝지은 것을 고르세요.\n\nThis desk is made ___ wood.\nTofu is made ___ soybeans.',
        choices: ['from — of', 'by — by', 'of — from', 'with — of'],
        answer: 2,
        hint: '재료가 겉으로 그대로 보이는지 생각해 보세요.',
        why: [
          '거꾸로 썼습니다. 나무 책상은 재료(나무)가 그대로 보이고, 두부는 콩이 모양을 바꾸어 만들어집니다.',
          '재료를 말할 때는 by를 쓰지 않습니다. by는 만든 사람(행위자) 앞에 씁니다.',
          '',
          '"~으로 만들어지다"는 be made of 또는 be made from입니다.',
        ],
        explain: '책상은 나무가 겉으로 그대로 보이니 **made of** wood, 두부는 콩이 바뀌어 보이지 않으니 **made from** soybeans가 기본입니다. (실제로는 made from wood처럼 섞어 쓰는 사람도 있습니다.)',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 2,
        q: '다음 문장을 수동태로 가장 자연스럽게 바꾼 것을 고르세요.\n\nThey will deliver the sofa tomorrow.',
        choices: ['The sofa will deliver tomorrow.', 'The sofa will be delivered tomorrow.', 'The sofa will be deliver tomorrow.', 'The sofa will be delivered by they tomorrow.'],
        answer: 1,
        hint: 'they가 누구인지 중요하지 않은 문장입니다.',
        why: [
          '소파는 배달되는 대상이라 be + 과거분사가 필요합니다. 이 문장은 "소파가 배달한다"는 뜻이 됩니다.',
          '',
          'will be 뒤에는 동사원형이 아니라 과거분사 delivered를 씁니다.',
          'by 뒤에는 목적격 them을 써야 합니다. 또 they(배달하는 사람들)는 중요하지 않아 보통 생략합니다.',
        ],
        explain: '미래 수동태 will be + 과거분사이고, 행위자 they는 누구인지 중요하지 않아 생략하는 것이 자연스럽습니다: **The sofa will be delivered tomorrow.**',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '수동태로 바꿀 수 **없는** 문장을 고르세요.',
        choices: ['My son broke the vase.', 'Everyone likes Minsu.', 'The baby slept well.', 'Jia sent the email.'],
        answer: 2,
        hint: '목적어가 있는지 살펴보세요.',
        why: [
          '목적어 the vase가 있어 The vase was broken by my son. 으로 바꿀 수 있습니다.',
          '목적어 Minsu가 있어 Minsu is liked by everyone. 으로 바꿀 수 있습니다.',
          '',
          '목적어 the email이 있어 The email was sent by Jia. 로 바꿀 수 있습니다.',
        ],
        explain: 'sleep(자다)은 목적어가 없는 동사라서 주어로 올릴 대상이 없습니다. 그래서 **The baby slept well.** 은 수동태로 바꿀 수 없습니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 4,
        q: '질문에 "아니요"로 짧게 답하려고 합니다. 빈칸에 알맞은 말을 쓰세요.\n\nA: Will the report be finished by Friday?\nB: No, it ___.',
        answer: ['won\'t', 'will not'],
        hint: '질문의 첫 낱말을 보세요.',
        wrong: [
          { a: 'isn\'t', why: '질문이 Will로 시작했으니 대답도 will로 합니다: No, it won\'t.' },
          { a: 'doesn\'t', why: '질문이 Will로 시작했으니 대답도 will로 합니다. 수동태에는 does를 쓰지 않습니다.' },
          { a: 'wasn\'t', why: '앞으로의 일을 물었으니 과거 wasn\'t가 아니라 won\'t로 답합니다.' },
        ],
        explain: 'Will ~ be + 과거분사 ~? 에는 **Yes, it will. / No, it won\'t.** 로 답합니다. "보고서가 금요일까지 끝날까요? — 아니요, 안 끝날 거예요."',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '다음 글을 읽고, 내용과 **맞지 않는** 것을 고르세요.\n\nHanji is traditional Korean paper. It is made from the bark of the dak tree (paper mulberry). Long ago, hanji was used for books and windows. Today, it is used for lamps and art. Many visitors are interested in making hanji.',
        choices: ['한지는 닥나무 껍질로 만든다.', '옛날에는 책과 창문에 쓰였다.', '오늘날에는 등과 예술품에도 쓰인다.', '오늘날에는 한지가 전혀 쓰이지 않는다.'],
        answer: 3,
        why: [
          'It is made from the bark of the dak tree — 닥나무 껍질로 만든다고 했습니다.',
          'Long ago, hanji was used for books and windows — 옛날에 책과 창문에 쓰였다고 했습니다.',
          'Today, it is used for lamps and art — 오늘날 등과 예술품에 쓰인다고 했습니다.',
          '',
        ],
        explain: 'Today, it is used for lamps and art(오늘날 한지는 등과 예술품에 쓰인다)라고 했으므로 "전혀 쓰이지 않는다"는 글과 맞지 않습니다. 글에 나온 수동태 is made from, was used, is used, are interested in을 다시 읽어 보세요.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 4,
        q: '대화의 빈칸에 알맞은 대답을 고르세요.\n\nA: When was this photo taken?\nB: ___',
        choices: ['It took in 2010.', 'It was taken in 2010.', 'It was took in 2010.', 'It is taken in 2010.'],
        answer: 1,
        why: [
          '사진은 찍히는 대상이라 수동태로 답합니다. It took은 "그것이 (무언가를) 가져갔다/걸렸다"는 뜻이 됩니다.',
          '',
          'took은 과거형입니다. be동사 뒤에는 과거분사 taken을 씁니다.',
          '2010년은 지난 일이라 is가 아니라 was를 씁니다.',
        ],
        explain: '질문과 같은 과거 수동태로 답합니다: **It was taken in 2010.** "이 사진은 언제 찍었어요? — 2010년에 찍었어요."',
      },
    ],

    deeper: [
      {
        title: '안내문과 뉴스에 수동태가 많은 까닭',
        body: '거리의 안내문이나 뉴스에는 수동태가 자주 나옵니다.\n\n- This road **is closed** for repairs. (이 도로는 보수 공사로 통제됩니다)\n- Breakfast **is served** from 7 to 9. (아침 식사는 7시부터 9시까지 제공됩니다)\n- The event **was canceled** because of the rain. (행사는 비 때문에 취소되었습니다)\n\n이런 글에서 중요한 것은 **도로·아침 식사·행사**이지, 누가 막았는지·누가 차리는지가 아닙니다. 그래서 대상을 주어로 세우고 by + 행위자는 빼는 일이 많습니다. 실제로 쓰이는 수동태 문장은 by가 없는 것이 더 많습니다.',
      },
      {
        title: '우리말 "~되다"와 영어 수동태는 딱 맞지 않는다',
        body: '우리말과 영어는 수동으로 말하는 곳이 조금 다릅니다.\n\n- 우리말 "태어나다"는 능동처럼 보이지만 영어는 **was born**(수동태)입니다.\n- 우리말 "그 문제는 해결되었다"는 영어로 The problem **was solved**.(수동태) 라고도 하지만, 사람을 주어로 We **solved** the problem. 이라고 하는 일도 많습니다.\n- 우리말 "사고가 일어났다"는 영어로 The accident **happened**. 입니다. happen은 목적어가 없는 동사라서 was happened라고 하지 않습니다.\n\n대화에서는 get + 과거분사로 수동을 나타내기도 합니다. They **got married** last year. (그들은 작년에 결혼했다) — 수동의 느낌을 더 생생하게 주는 말투입니다.',
      },
    ],

    faq: [
      {
        q: '수동태에서 by는 꼭 써야 해요?',
        a: '아닙니다. 오히려 빼는 경우가 더 많습니다. 행위자가 누구인지 모르거나(My wallet was stolen.), 뻔하거나(He was arrested. — 경찰이 체포했음이 뻔함), 사람들 일반일 때(English is spoken here.)는 by + 행위자를 쓰지 않습니다.\n\n누가 했는지가 새롭고 중요한 정보일 때만 This picture was painted **by my daughter**. 처럼 덧붙입니다.',
      },
      {
        q: 'be born은 왜 수동태예요?',
        a: '영어는 "태어나다"를 스스로 하는 동작이 아니라 "(부모에 의해) 낳아지는" 일로 봅니다. 그래서 be + 과거분사(born)를 씁니다.\n\n태어난 것은 이미 지난 일이므로 보통 과거형 I was born ~, Where were you born? 으로 씁니다. I am born이라고 하지 않습니다.',
      },
      {
        q: 'made of와 made from은 어떻게 달라요?',
        a: '기본 구별은 재료가 **겉으로 보이는지**입니다. 나무 책상, 금반지처럼 재료가 그대로 보이면 made of, 우유로 만든 치즈, 콩으로 만든 두부처럼 재료가 바뀌어 보이지 않으면 made from을 씁니다.\n\n실제 대화에서는 섞어 쓰는 사람도 있지만, 이 구별을 알아 두면 시험과 글쓰기에서 안전합니다.',
      },
    ],

    mistakes: [
      'be동사를 빠뜨리는 실수 — This house built in 1970. (✗) → This house was built in 1970. (○)',
      'be동사 뒤에 과거분사 대신 원형·과거형을 쓰는 실수 — The meeting will be hold. / It was took. (✗) → will be held / was taken (○)',
      '수동태의 부정·의문에 do·did를 쓰는 실수 — Did it made in Korea? (✗) → Was it made in Korea? (○)',
    ],

    gens: [
      {
        id: 'be-pp',
        level: 1,
        title: '알맞은 수동태 꼴 쓰기',
        make: function (R) {
          var it = R.pick(BP);
          var pl = it[3], t = it[4];
          var ans = be(t, pl) + ' ' + it[2];
          var answers = [ans];
          if (t === 'fut') answers.push((pl ? 'are' : 'is') + ' going to be ' + it[2]);
          var wrong = [{ a: it[2], why: 'be동사가 빠졌습니다. 주어는 ~되는(받는) 대상이므로 be + 과거분사로 씁니다.' }];
          if (t !== 'fut') wrong.push({ a: be(t, !pl) + ' ' + it[2], why: '주어가 ' + (pl ? '여럿(복수)' : '하나(단수)') + '라서 be동사는 ' + be(t, pl) + '입니다.' });
          var other = t === 'past' ? 'pres' : 'past';
          wrong.push({ a: be(other, pl) + ' ' + it[2], why: it[5] + ' — ' + TENSE_WHY[t] + '을 씁니다: ' + be(t, pl) + ' + 과거분사' });
          wrong.push({ a: be(t, pl) + ' ' + it[1], why: 'be동사 뒤에는 동사원형이 아니라 과거분사(' + it[2] + ')를 씁니다.' });
          return {
            type: 'short', check: 'text', concept: t === 'pres' ? 0 : 2,
            q: '우리말에 맞게 괄호 안의 동사를 알맞은 수동태 꼴로 바꾸어 쓰세요.\n\n' + it[6] + '\n→ ' + it[0],
            answer: answers,
            hint: '주어가 하나인지 여럿인지, 때가 지금·과거·미래 가운데 무엇인지 보세요.',
            wrong: wrong,
            explain: '주어는 ~되는 대상이라 수동태(be + 과거분사)이고, ' + it[5] + ' — ' + TENSE_WHY[t] + '입니다.\n\n바른 문장: ' + it[0].replace(/___ \([a-z]+\)/, ans) + '\n(' + it[6] + ')' + (t === 'fut' ? '\n\n미래는 ' + answers[1] + '처럼 be going to be + 과거분사로 써도 맞습니다.' : ''),
          };
        },
      },
      {
        id: 'active-to-passive',
        level: 2,
        title: '능동태를 수동태로 바꾸기',
        make: function (R) {
          var it = R.pick(AP);
          var b = be(it.t, it.pl);
          var right = it.obj + ' ' + b + ' ' + it.pp + ' by ' + it.ag + it.tail + '.';
          var wrongTense = it.t === 'pres' ? 'past' : 'pres';
          var choices = [
            right,
            it.obj + ' ' + it.pp + ' by ' + it.ag + it.tail + '.',
            it.obj + ' ' + be(wrongTense, it.pl) + ' ' + it.pp + ' by ' + it.ag + it.tail + '.',
            it.agS + ' ' + be(it.t, it.agPl) + ' ' + it.pp + ' by ' + lowFirst(it.obj) + it.tail + '.',
          ];
          var why = [
            '',
            'be동사가 빠졌습니다. 수동태는 be + 과거분사입니다.',
            '능동태의 시제를 그대로 따라야 합니다. 이 문장의 be동사는 ' + b + '입니다. ' + be(wrongTense, it.pl) + ' — 때가 달라집니다.',
            '주어와 행위자를 거꾸로 놓았습니다. 능동태의 목적어(' + lowFirst(it.obj) + ')가 수동태의 주어가 됩니다.',
          ];
          if (it.pron) {
            choices[3] = it.obj + ' ' + b + ' ' + it.pp + ' by ' + it.pron + it.tail + '.';
            why[3] = 'by 뒤에는 주격(' + it.pron + ')이 아니라 목적격(' + it.ag + ')을 씁니다.';
          }
          return {
            type: 'choice', concept: 1,
            q: '다음 문장을 수동태로 바르게 바꾼 것을 고르세요.\n\n' + it.act,
            choices: choices,
            answer: 0,
            hint: '목적어를 주어로, 동사를 be + 과거분사로, 주어를 by 뒤로 옮깁니다.',
            why: why,
            explain: '목적어(' + lowFirst(it.obj) + ')를 주어로 세우고, 시제와 새 주어에 맞춰 동사를 바꾼 뒤(' + b + ' + ' + it.pp + '), 원래 주어는 by 뒤로 옮깁니다(by ' + it.ag + ').\n\n' + right + '\n(' + it.ko + ')',
          };
        },
      },
      {
        id: 'passive-expressions',
        level: 1,
        title: '수동 표현의 전치사',
        make: function (R) {
          var it = R.pick(PE);
          return {
            type: 'short', check: 'text', concept: 3,
            q: '빈칸에 알맞은 전치사를 쓰세요.\n\n' + it[0],
            answer: it[1].slice(),
            hint: '과거분사와 짝을 이루는 전치사를 떠올려 보세요.',
            wrong: [{ a: it[3], why: it[5] || ('이 표현은 짝이 되는 전치사가 정해져 있습니다: ' + it[2] + '. 덩어리로 익혀 두세요.') }],
            explain: it[2] + '\n\n바른 문장: ' + it[0].replace('___', it[1][0]) + '\n(' + it[4] + ')',
          };
        },
      },
    ],

    vocab: [
      { w: 'build', m: '짓다, 세우다 (build – built – built)', ex: 'This school was built fifty years ago.', exm: '이 학교는 50년 전에 지어졌습니다.' },
      { w: 'hold', m: '(행사를) 열다, 개최하다 (hold – held – held)', ex: 'The festival is held every spring.', exm: '그 축제는 해마다 봄에 열립니다.' },
      { w: 'deliver', m: '배달하다', ex: 'Your order will be delivered tomorrow.', exm: '주문하신 물건은 내일 배달됩니다.' },
      { w: 'announce', m: '발표하다', ex: 'The winners will be announced on Friday.', exm: '수상자는 금요일에 발표됩니다.' },
      { w: 'invite', m: '초대하다', ex: 'We were invited to their wedding.', exm: '우리는 그들의 결혼식에 초대받았습니다.' },
      { w: 'design', m: '설계하다, 디자인하다', ex: 'This bag was designed by a young artist.', exm: '이 가방은 젊은 예술가가 디자인했습니다.' },
      { w: 'translate', m: '번역하다', ex: 'The book was translated into Korean.', exm: '그 책은 한국어로 번역되었습니다.' },
      { w: 'cancel', m: '취소하다', ex: 'The flight was canceled because of the snow.', exm: '눈 때문에 비행기가 결항되었습니다.' },
      { w: 'factory', m: '공장', ex: 'These phones are made in a factory in Gumi.', exm: '이 휴대전화는 구미의 한 공장에서 만들어집니다.' },
      { w: 'bridge', m: '다리', ex: 'A new bridge will be built next year.', exm: '내년에 새 다리가 지어질 것입니다.' },
      { w: 'leather', m: '가죽', ex: 'This wallet is made of leather.', exm: '이 지갑은 가죽으로 만들어졌습니다.' },
      { w: 'soybean', m: '콩, 대두', ex: 'Tofu is made from soybeans.', exm: '두부는 콩으로 만듭니다.' },
      { w: 'traditional', m: '전통의, 전통적인', ex: 'Hanbok is traditional Korean clothing.', exm: '한복은 한국의 전통 옷입니다.' },
    ],
  });
})();
