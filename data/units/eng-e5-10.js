/* 5학년 영어 · 장소와 위치 말하기
 * 마을 지도(MAP): 길 위쪽에 library · bank · bakery, 길 아래쪽에 hospital · post office · park.
 * 위아래로 마주 보는 곳끼리 across from 이다 (library↔hospital, bank↔post office, bakery↔park). */
(function () {
  function box(x, y, label) {
    return '<rect x="' + x + '" y="' + y + '" width="100" height="56" rx="4" fill="var(--fig-1)" fill-opacity="0.18" stroke="currentColor" stroke-width="2"/>' +
      '<text x="' + (x + 50) + '" y="' + (y + 33) + '" fill="currentColor" font-size="15" text-anchor="middle">' + label + '</text>';
  }
  var MAP_SVG = '<svg viewBox="0 0 360 220">' +
    box(15, 14, 'library') + box(130, 14, 'bank') + box(245, 14, 'bakery') +
    '<line x1="0" y1="90" x2="360" y2="90" stroke="currentColor" stroke-width="2"/>' +
    '<line x1="0" y1="130" x2="360" y2="130" stroke="currentColor" stroke-width="2"/>' +
    '<line x1="0" y1="110" x2="360" y2="110" stroke="currentColor" stroke-width="1.5" stroke-dasharray="12 10"/>' +
    box(15, 150, 'hospital') + box(130, 150, 'post office') + box(245, 150, 'park') +
    '</svg>';
  var MAP = {
    type: 'svg', svg: MAP_SVG,
    alt: '마을 지도. 길 위쪽에 왼쪽부터 library, bank, bakery 가 있고, 길 건너 아래쪽에 왼쪽부터 hospital, post office, park 가 있어요.',
  };

  // 생성기용 장소 (모두 the 를 붙여 쓴다)
  var PLACES = ['bank', 'park', 'library', 'bakery', 'hospital', 'post office', 'school', 'toy store'];

  Tutor.registerUnit({
    id: 'eng-e5-10',
    course: 'eng-e5',
    title: '장소와 위치 말하기',
    summary: 'Where is the bank?로 장소를 묻고 next to, across from 같은 말로 위치를 말하며, There is ~.로 무엇이 있는지 설명해요.',
    goals: [
      '마을의 여러 장소를 영어로 말할 수 있어요.',
      'next to, across from, between, in front of, behind 로 위치를 말할 수 있어요.',
      'Where is ~? 로 장소의 위치를 묻고 답할 수 있어요.',
      'There is ~. / There are ~. 로 무엇이 있는지 말하고, 지도나 그림을 설명하는 글을 읽을 수 있어요.',
    ],
    standards: ['[6영02-05]', '[6영01-04]', '[6영01-07]'],

    concepts: [
      {
        title: '마을의 장소 낱말',
        body: '우리 마을에 있는 장소를 영어로 알아봐요. 그곳에서 **무엇을 하는지**와 함께 기억하면 잘 잊히지 않아요.\n\n| 영어 | 뜻 | 하는 일 |\n|---|---|---|\n| **library** | 도서관 | 책을 읽거나 빌려요. |\n| **bank** | 은행 | 돈을 맡기거나 찾아요. |\n| **hospital** | 병원 | 아플 때 진료를 받아요. |\n| **park** | 공원 | 산책하고 뛰어놀아요. |\n| **post office** | 우체국 | 편지나 소포를 보내요. |\n| **bakery** | 빵집 | 빵과 케이크를 사요. |\n\n> 💡 post office 는 두 낱말이 모여 한 장소를 나타내요. post(우편) + office(사무실) = 우체국이에요.',
        easy: '마을을 한 바퀴 돈다고 생각해 보세요.\n\n- 책 냄새가 나는 곳 → **library**\n- 고소한 빵 냄새가 나는 곳 → **bakery**\n- 미끄럼틀과 나무가 있는 곳 → **park**\n- 편지를 부치는 곳 → **post office**\n- 돈을 맡기는 곳 → **bank**\n- 감기에 걸렸을 때 가는 곳 → **hospital**\n\n장소마다 떠오르는 장면을 하나씩 붙여 두면 낱말이 쉽게 떠올라요.',
        check: {
          type: 'choice',
          q: '편지를 보내러 가는 곳은 어디일까요?',
          choices: ['post office', 'bakery', 'library'],
          answer: 0,
          why: [
            '',
            'bakery 는 빵을 사는 빵집이에요.',
            'library 는 책을 읽고 빌리는 도서관이에요.',
          ],
          explain: '편지나 소포를 보내는 곳은 우체국, **post office** 예요.',
        },
      },
      {
        title: '위치를 나타내는 말',
        body: '어떤 장소가 어디에 있는지는 **기준이 되는 장소**와 **위치를 나타내는 말**로 설명해요. 지도를 보며 읽어 보세요.\n\n| 위치 말 | 뜻 | 지도 속 예 |\n|---|---|---|\n| **next to** | ~ 바로 옆에 | The library is **next to** the bank. |\n| **across from** | 길 건너 ~ 맞은편에 | The bank is **across from** the post office. |\n| **between A and B** | A와 B 사이에 | The bank is **between** the library **and** the bakery. |\n\n앞뒤를 말하는 말도 있어요.\n\n| 위치 말 | 뜻 | 예 |\n|---|---|---|\n| **in front of** | ~ 앞에 | There is a tree **in front of** the library. (도서관 앞에 나무가 있어요.) |\n| **behind** | ~ 뒤에 | There is a garden **behind** my house. (우리 집 뒤에 정원이 있어요.) |\n\n> ⚠️ between 뒤에는 장소 **두 곳**을 and 로 이어서 써요. between the bank 처럼 하나만 쓰면 안 돼요.',
        easy: '내 몸을 기준으로 생각해 보세요.\n\n- 짝꿍은 내 **옆**에 앉아요 → next to\n- 선생님은 교실 **맞은편** 칠판 앞에 서 계셔요 → across from\n- 두 친구 **사이**에 내가 서 있어요 → between\n- 내 **앞**사람 → in front of\n- 내 **뒤**사람 → behind\n\n장소를 말할 때도 똑같아요. 사람 대신 건물을 놓고 "무엇의 옆? 무엇의 사이?"를 생각하면 돼요.',
        fig: MAP,
        check: {
          type: 'choice',
          q: '지도를 보고 답하세요. bank(은행)는 어디에 있을까요?',
          fig: MAP,
          choices: ['between the library and the bakery', 'next to the park', 'across from the hospital'],
          answer: 0,
          why: [
            '',
            'park 는 길 건너 아래쪽 끝에 있어요. bank 바로 옆이 아니에요.',
            'bank 맞은편은 post office 예요. hospital 맞은편은 library 예요.',
          ],
          explain: 'bank 는 library 와 bakery **사이**에 있어요. 그래서 **between the library and the bakery** 예요.',
        },
      },
      {
        title: '위치 묻고 답하기: Where is the bank?',
        body: '장소가 어디에 있는지 물을 때는 **Where is ~?** 를 써요.\n\n- **Where is the bank?** 은행은 어디에 있어요?\n- **It\'s next to the park.** 공원 옆에 있어요.\n\n대답의 **It\'s** 는 **It is** 를 줄인 말이에요. 묻는 장소를 다시 말하지 않고 It 으로 받아요.\n\n- Where is the library? → **It\'s across from the hospital.**\n- Where is the bakery? → **It\'s between the bank and the school.**\n\n> 💡 Where 로 묻는 질문에는 Yes 나 No 로 답하지 않아요. 위치를 알려 줘요.',
        easy: '길을 지나가다 누가 "은행이 어디 있어요?" 하고 물으면, 우리는 "공원 옆에 있어요."라고 답하지요. 은행이라는 말을 다시 하지 않아도 알아들어요.\n\n영어도 같아요. **Where is the bank?** 하고 물으면 **It\'s** next to the park. 하고 답해요. It 이 "그것(은행)"이에요.\n\n질문: Where is + 장소?\n대답: It\'s + 위치 말 + 기준 장소.',
        check: {
          type: 'choice',
          q: 'A: Where is the hospital?\nB: [[blank]]\n\n빈칸에 들어갈 대답으로 알맞은 것은 무엇일까요?',
          choices: ["It's next to the school.", 'Yes, it is.', 'I am sick.'],
          answer: 0,
          why: [
            '',
            'Where 로 묻는 질문에는 Yes 나 No 로 답하지 않고 위치를 알려 줘요.',
            '아프다는 말이에요. 질문은 병원의 위치를 묻고 있어요.',
          ],
          explain: 'Where is ~? 에는 위치로 답해요. **It\'s next to the school.** (학교 옆에 있어요.)',
        },
      },
      {
        title: '무엇이 있는지 말하기: There is / There are',
        body: '어떤 곳에 무엇이 **있다**고 말할 때는 **There is** 나 **There are** 로 시작해요.\n\n- 하나일 때: **There is a bakery** near my house. 우리 집 근처에 빵집이 하나 있어요.\n- 둘 이상일 때: **There are two beds** in my room. 내 방에 침대가 두 개 있어요.\n\n| 몇 개? | 쓰는 말 | 예 |\n|---|---|---|\n| 하나 | There **is** a(an) ~ | There is **a** park. |\n| 둘 이상 | There **are** ~s | There are **three** parks. |\n\n둘 이상일 때는 낱말 끝에 s 를 붙여요(bed → beds, park → parks). bakery 처럼 y 로 끝나면 y 를 i 로 바꾸고 es 를 붙여 **bakeries** 가 돼요.\n\n> 💡 near 는 "~ 근처에"라는 뜻이에요. There is a bank **near** the school. (학교 근처에 은행이 있어요.)',
        easy: '물건을 하나씩 손가락으로 세어 보세요.\n\n- 손가락 하나만 펴면 → There **is** a desk.\n- 손가락 두 개 이상 펴면 → There **are** two desks.\n\n하나면 is 와 a, 여럿이면 are 와 낱말 끝의 s 가 짝이에요.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 말은 무엇일까요?\n\nThere [[blank]] two parks in my town.',
          choices: ['are', 'is', 'am'],
          answer: 0,
          why: [
            '',
            'parks 가 두 개(two)이므로 is 가 아니라 are 를 써요.',
            'am 은 I 와 함께 쓰는 말이에요.',
          ],
          explain: '공원이 두 개(two parks)이므로 **There are** 를 써요.',
        },
      },
      {
        title: '지도와 그림을 설명하는 글 읽기',
        body: '마을 지도나 방 그림을 설명하는 글은 보통 **There is ~** 로 무엇이 있는지 말하고, **위치 말**로 어디 있는지 알려 줘요.\n\nWelcome to my town. There is a big park in my town. The bakery is **across from** the park. The bank is **next to** the bakery. There are two schools near the park.\n\n이런 글을 읽을 때는 이렇게 해 보세요.\n\n1. 장소 낱말(park, bakery, bank …)에 표시해요.\n2. 위치 말(next to, across from, between …)을 찾아요.\n3. 위치 말 **뒤에 오는 장소**가 기준이에요. "bakery 는 park 의 맞은편"처럼 정리해요.\n4. 머릿속이나 종이에 간단한 지도를 그려 봐요.\n\n> 💡 위 글을 지도로 그리면 park 의 길 건너에 bakery 가 있고, bakery 바로 옆에 bank 가 있어요.',
        easy: '설명하는 글은 보물 지도의 쪽지와 같아요. "큰 나무 옆, 바위 맞은편"처럼 기준과 위치가 한 쌍으로 나오지요.\n\n영어 글도 "The bank is next to the bakery." 처럼 **찾을 곳 + 위치 말 + 기준 장소**가 한 쌍이에요. 한 문장씩 읽으며 종이에 네모를 하나씩 그려 넣으면 지도가 완성돼요.',
        check: {
          type: 'ox',
          q: 'The bank is next to the bakery. 라는 문장에서 기준이 되는 장소는 bakery 예요.',
          answer: true,
          explain: '위치 말(next to) 뒤에 오는 **bakery** 가 기준이에요. 은행이 빵집 옆에 있다는 뜻이에요.',
        },
      },
    ],

    examples: [
      {
        q: '지도를 보고 묻는 말에 답하세요.\n\nWhere is the post office?',
        fig: MAP,
        steps: [
          '지도에서 post office 를 찾아요. 길 아래쪽 가운데에 있어요.',
          '양옆을 보면 왼쪽에 hospital, 오른쪽에 park 가 있어요. 그래서 두 곳 **사이**에 있어요.',
          '길 건너 위쪽을 보면 맞은편에 bank 가 있어요.',
          '묻는 장소는 It 으로 받아 대답해요: **It\'s between the hospital and the park.** 또는 **It\'s across from the bank.**',
        ],
        answer: "It's between the hospital and the park. (It's across from the bank. 도 맞아요.)",
      },
      {
        q: '우리말에 맞게 영어로 말해 보세요.\n\n"내 방에는 창문이 하나 있어요. 그리고 의자가 두 개 있어요."',
        steps: [
          '창문은 **하나**예요. 하나일 때는 There is 와 a 를 써요: **There is a window in my room.**',
          '의자는 **두 개**예요. 둘 이상이면 There are 를 쓰고 낱말 끝에 s 를 붙여요: **There are two chairs.**',
        ],
        answer: 'There is a window in my room. There are two chairs.',
      },
    ],

    terms: [
      { term: '위치', def: '어떤 것이 있는 자리예요. 영어로는 next to(옆에), across from(맞은편에), between(사이에), in front of(앞에), behind(뒤에) 같은 말로 나타내요.' },
      { term: '기준이 되는 장소', def: '위치를 말할 때 바탕이 되는 곳이에요. The bank is next to the park. 에서는 위치 말 뒤에 오는 park 가 기준이에요.' },
      { term: "It's", def: 'It is 를 줄인 말이에요. Where is the bank? 의 대답 It\'s next to the park. 에서 It 은 묻는 장소(은행)를 가리켜요.' },
      { term: 'There is / There are', def: '"~이 있어요"라는 뜻이에요. 하나면 There is a park., 둘 이상이면 There are two parks. 처럼 써요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '책을 읽거나 빌리러 가는 곳은 어디일까요?',
        choices: ['library', 'bank', 'bakery', 'hospital'],
        answer: 0,
        why: [
          '',
          'bank 는 돈을 맡기는 은행이에요.',
          'bakery 는 빵을 사는 빵집이에요.',
          'hospital 은 아플 때 가는 병원이에요.',
        ],
        explain: '책을 읽고 빌리는 곳은 도서관, **library** 예요.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
        q: '우리말 뜻에 맞는 낱말을 쓰세요.\n\n빵집',
        answer: ['bakery'],
        wrong: [
          { a: 'bread', why: 'bread 는 "빵"이에요. 빵을 파는 가게는 bakery 예요.' },
          { a: 'bakerys', why: '하나일 때는 끝에 s 를 붙이지 않아요. bakery 예요.' },
        ],
        explain: '빵집은 **bakery** 예요. bake(굽다)와 관련 있는 낱말이에요.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '"길 건너 ~ 맞은편에"라는 뜻의 말은 무엇일까요?',
        choices: ['across from', 'next to', 'behind', 'in front of'],
        answer: 0,
        why: [
          '',
          'next to 는 "~ 바로 옆에"예요.',
          'behind 는 "~ 뒤에"예요.',
          'in front of 는 "~ 앞에"예요.',
        ],
        explain: '맞은편은 **across from** 이에요. The bank is across from the post office. (은행은 우체국 맞은편에 있어요.)',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 1,
        q: 'behind 는 "~ 앞에"라는 뜻이에요.',
        answer: false,
        explain: 'behind 는 "~ **뒤에**"예요. "~ 앞에"는 **in front of** 예요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 말은 무엇일까요?\n\nThere [[blank]] a hospital near my school.',
        choices: ['is', 'are', 'am', 'be'],
        answer: 0,
        why: [
          '',
          '병원이 하나(a hospital)이므로 are 가 아니라 is 를 써요.',
          'am 은 I 와 함께 쓰는 말이에요.',
          'There 다음에는 be 를 그대로 쓰지 않고 is 나 are 로 바꿔 써요.',
        ],
        explain: '병원이 하나(a hospital)이므로 **There is** 를 써요.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 0,
        q: '우리말 뜻에 맞는 말을 쓰세요.\n\n우체국',
        answer: ['post office'],
        wrong: [{ a: 'post', why: 'post 는 "우편"이에요. 우체국은 office(사무실)까지 붙여 post office 예요.' }],
        explain: '우체국은 **post office** 예요. post(우편) + office(사무실)예요.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 1,
        q: '지도를 보고 답하세요. library(도서관) 바로 옆에 있는 곳은 어디일까요?',
        fig: MAP,
        choices: ['bank', 'bakery', 'hospital', 'park'],
        answer: 0,
        why: [
          '',
          'bakery 는 bank 를 지나 한 칸 더 가야 있어요. 바로 옆이 아니에요.',
          'hospital 은 길 건너 맞은편(across from)에 있어요. 옆이 아니에요.',
          'park 는 길 건너 반대쪽 끝에 있어요.',
        ],
        explain: 'library 바로 옆(next to)에는 **bank** 가 있어요. hospital 은 길 건너 맞은편이에요.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 2,
        q: '지도를 보고, 대화의 빈칸에 알맞은 대답을 고르세요.\n\nA: Where is the park?\nB: [[blank]]',
        fig: MAP,
        choices: ["It's across from the bakery.", "It's next to the hospital.", "It's between the bank and the bakery.", 'Yes, it is.'],
        answer: 0,
        why: [
          '',
          'park 와 hospital 사이에는 post office 가 있어요. 바로 옆이 아니에요.',
          'bank 와 bakery 는 붙어 있어서 그 사이에 다른 곳이 없어요. park 는 길 건너 아래쪽에 있어요.',
          'Where 로 묻는 질문에는 Yes 나 No 로 답하지 않아요.',
        ],
        hint: 'park 를 찾은 다음, 바로 옆과 길 건너 맞은편을 차례로 살펴보세요.',
        explain: 'park 는 길 아래쪽 오른쪽 끝에 있고, 길 건너 맞은편에 bakery 가 있어요. 그래서 **It\'s across from the bakery.** 예요. (It\'s next to the post office. 라고 해도 맞아요.)',
      },
      {
        id: 'p9', level: 2, type: 'order', concept: 3,
        q: '낱말을 바르게 늘어놓아 "우리 집 근처에 빵집이 하나 있어요."를 만드세요.',
        choices: ['There', 'is', 'a bakery', 'near', 'my house.'],
        answer: [0, 1, 2, 3, 4],
        hint: 'There is 로 시작하고, 무엇이(a bakery) 다음에 어디에(near my house)를 써요.',
        explain: '**There is a bakery near my house.** — There is + 무엇 + 어디에의 차례예요.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'text', concept: 2,
        q: '대화를 읽고 빈칸에 알맞은 낱말을 한 낱말로 쓰세요.\n\nA: [[blank]] is the bank?\nB: It\'s next to the library.',
        answer: ['Where'],
        wrong: [
          { a: 'What', why: 'What 은 "무엇"을 물어요. 장소가 어디 있는지는 Where 로 물어요.' },
          { a: 'How', why: 'How 는 "어떻게"를 물어요. B 가 위치로 답했으니 Where 예요.' },
        ],
        hint: 'B 는 은행의 위치를 알려 줬어요.',
        explain: 'B 가 위치(next to the library)로 대답했으니, 위치를 묻는 **Where** 가 알맞아요. Where is the bank?',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '글을 읽고 물음에 답하세요.\n\nThis is my room. There is a bed next to the window. There are two chairs in front of the desk. My bag is behind the door.\n\n의자는 어디에 있을까요?',
        choices: ['책상 앞', '창문 옆', '문 뒤', '침대 뒤'],
        answer: 0,
        why: [
          '',
          '창문 옆(next to the window)에 있는 것은 침대(bed)예요.',
          '문 뒤(behind the door)에 있는 것은 가방(bag)이에요.',
          '글에 침대 뒤에 대한 말은 없어요.',
        ],
        hint: 'chairs 가 나오는 문장을 찾아 위치 말을 보세요.',
        explain: 'There are two chairs **in front of** the desk. — 의자 두 개는 **책상 앞**에 있어요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '지도를 보고, 지도와 **맞지 않는** 문장을 고르세요.',
        fig: MAP,
        choices: [
          'The hospital is next to the park.',
          'The library is across from the hospital.',
          'The post office is between the hospital and the park.',
          'The bakery is next to the bank.',
        ],
        answer: 0,
        why: [
          '',
          'library 와 hospital 은 길을 사이에 두고 마주 보고 있어요. 맞는 문장이에요.',
          'post office 는 hospital 과 park 사이에 있어요. 맞는 문장이에요.',
          'bakery 바로 옆에 bank 가 있어요. 맞는 문장이에요.',
        ],
        hint: '문장마다 두 장소를 지도에서 찾아 실제로 그 위치인지 확인해 보세요.',
        explain: 'hospital 과 park 사이에는 post office 가 있어서 둘은 바로 옆이 아니에요. 그래서 **The hospital is next to the park.** 가 지도와 맞지 않아요. 바르게 고치면 The hospital is next to the post office. 예요.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 4,
        q: '글을 읽고 물음에 답하세요.\n\nThere are three buildings in a row: a bank, a bakery, and a library. The bank is not next to the bakery.\n\nWhere is the library?',
        choices: [
          "It's between the bank and the bakery.",
          "It's next to the bank, but not next to the bakery.",
          "It's across from the bakery.",
          "It's behind the bank.",
        ],
        answer: 0,
        why: [
          '',
          '세 건물이 한 줄로 있으면 가운데 건물은 양쪽 모두와 이웃해요. library 는 가운데이니 bakery 옆에도 있어요.',
          '세 건물은 한 줄로(in a row) 나란히 있어요. 맞은편 이야기는 글에 없어요.',
          '세 건물은 나란히 있어요. 뒤에 있다는 말은 글에 없어요.',
        ],
        hint: '세 건물이 한 줄로 서 있는데 bank 와 bakery 가 서로 옆이 아니라면, 둘은 어디에 있어야 할까요?',
        explain: '세 건물이 한 줄로 서 있을 때 bank 와 bakery 가 서로 붙어 있지 않으려면 둘이 양쪽 끝에 있어야 해요. 그러면 library 는 가운데, 곧 **between the bank and the bakery** 예요.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'text', concept: 2,
        q: '지도를 보고, 설명하는 장소를 영어로 쓰세요.\n\nIt is across from the bank. It is between the hospital and the park. What is it?',
        fig: MAP,
        answer: ['post office', 'the post office', 'a post office'],
        wrong: [
          { a: 'bank', why: 'bank 는 기준이 되는 장소예요. bank 의 맞은편에 있는 곳을 찾아요.' },
          { a: 'library', why: 'library 는 길 위쪽에 있어요. hospital 과 park 사이에 있는 곳을 찾아요.' },
        ],
        hint: '두 가지 단서를 모두 만족하는 곳을 찾아요: bank 의 맞은편, hospital 과 park 의 사이.',
        explain: 'bank 맞은편이면서 hospital 과 park 사이에 있는 곳은 **post office**(우체국)예요.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '민수가 자기 방을 소개한 글이에요. 바르지 **않은** 문장은 무엇일까요?\n\n(가) This is my room.\n(나) There is a desk next to the bed.\n(다) There is three books on the desk.\n(라) There are two pictures on the wall.',
        choices: ['(가)', '(나)', '(다)', '(라)'],
        fixed: true,
        answer: 2,
        why: [
          '방을 소개하는 바른 문장이에요.',
          '책상이 하나(a desk)이니 There is 가 맞아요.',
          '',
          '그림이 두 개(two pictures)이니 There are 가 맞아요.',
        ],
        hint: '몇 개인지 나타내는 말(a, two, three)과 is·are 가 짝이 맞는지 보세요.',
        explain: '책이 세 권(three books)이므로 There is 가 아니라 **There are** 를 써야 해요. 바르게 고치면 **There are three books on the desk.** 예요.',
      },
    ],

    deeper: [
      {
        title: 'a bakery 와 the bakery 는 어떻게 달라요?',
        body: '처음 말하는 장소, 듣는 사람이 아직 모르는 장소에는 **a** 를 붙여요. 이미 말했거나 서로 알고 있는 장소에는 **the** 를 붙여요.\n\nThere is **a** bakery near my house. **The** bakery is next to the bank.\n\n첫 문장에서 빵집을 처음 소개했으니 a bakery, 두 번째 문장에서는 "방금 말한 그 빵집"이니 the bakery 예요. Where is the bank? 처럼 물을 때 the 를 쓰는 것도, 듣는 사람과 함께 아는 "그 은행"을 묻기 때문이에요.',
      },
      {
        title: '6학년에서는 길을 안내해요',
        body: '이번 단원에서는 장소가 **어디에 있는지** 말했어요. 6학년에서는 한 걸음 더 나아가 그곳까지 **어떻게 가는지** 길을 묻고 안내하는 말을 배워요.\n\n오늘 배운 next to, across from 같은 위치 말은 길 안내에서도 "도착하면 그곳은 ○○ 옆에 있어요"처럼 마지막 설명에 그대로 쓰여요. 지도를 보며 위치 말을 소리 내어 말해 보는 연습을 꾸준히 해 두세요.',
      },
    ],

    faq: [
      {
        q: 'next to 랑 near 는 뭐가 달라요?',
        a: '**next to** 는 "바로 옆에" 붙어 있다는 뜻이에요. **near** 는 "가까이에, 근처에"라는 뜻이라 바로 붙어 있지 않아도 쓸 수 있어요. 학교 바로 옆에 있는 가게는 next to the school, 학교에서 조금 걸어가면 나오는 가게는 near the school 이라고 해요.',
      },
      {
        q: 'There is 와 There are 는 언제 써요?',
        a: '있는 것이 **하나**면 There is, **둘 이상**이면 There are 를 써요. There is a bed. / There are two beds. 둘 이상일 때는 낱말 끝에 s 가 붙는 것도 함께 기억하세요.',
      },
      {
        q: "It's 는 무슨 뜻이에요?",
        a: '**It is** 를 줄여 쓴 말이에요. Where is the bank? 에 대답할 때 은행(the bank)을 다시 말하지 않고 It 으로 받아서 It\'s next to the park. 라고 해요. 말할 때는 줄여서 It\'s 라고 하는 경우가 많아요.',
      },
      {
        q: 'between 은 꼭 and 랑 같이 써요?',
        a: '네. between 은 "두 곳 사이"를 말하므로 장소 두 곳을 **and** 로 이어 써요. between the bank and the park 처럼요. between the bank 처럼 한 곳만 쓰면 무엇과의 사이인지 알 수 없어요.',
      },
    ],

    mistakes: [
      '둘 이상인데 There is 를 쓰는 실수 — There is two parks.(X) → There are two parks.(O)',
      'between 뒤에 장소를 하나만 쓰는 실수 — between the bank(X) → between the bank and the park(O)',
      'Where 로 물었는데 Yes 나 No 로 대답하는 실수 — Where is the bank? 에는 It\'s next to the park. 처럼 위치로 답해요.',
    ],

    gens: [
      {
        id: 'row-where',
        level: 2,
        title: '한 줄로 늘어선 장소의 위치 말하기',
        make: function (R) {
          var p = R.sample(PLACES, 4);
          var t = R.int(0, 3);
          var the = function (k) { return 'the ' + p[k]; };
          var correct, explain;
          if (t === 0 || t === 3) {
            var nb = t === 0 ? 1 : 2;
            correct = "It's next to " + the(nb) + '.';
            explain = '**' + the(t) + '** — 줄의 끝에 있어서 바로 옆에는 ' + the(nb) + ' 한 곳만 있어요. 그래서 답은 **' + correct + '**';
          } else {
            correct = "It's between " + the(t - 1) + ' and ' + the(t + 1) + '.';
            explain = '**' + the(t) + '** — 양옆에 ' + the(t - 1) + ', ' + the(t + 1) + ' 두 곳이 붙어 있어요. 두 곳 사이에 있으니 답은 **' + correct + '**';
          }
          var cands = [];
          var reason = {};
          function add(text, why) { if (!(text in reason)) { reason[text] = why; cands.push(text); } }
          for (var j = 0; j < 4; j++) {
            if (j !== t && Math.abs(j - t) > 1) {
              add("It's next to " + the(j) + '.', '두 곳 사이에 다른 곳이 끼어 있어서 ' + the(j) + ' 바로 옆(next to)이 아니에요.');
            }
          }
          for (var i = 0; i < 2; i++) {
            if (i !== t && i + 1 !== t && i + 2 !== t) {
              add("It's between " + the(i) + ' and ' + the(i + 2) + '.', '그 두 곳 사이에 있는 곳: ' + the(i + 1) + '. 묻는 곳이 아니에요.');
            }
          }
          for (var k = 0; k < 4; k++) {
            if (k !== t) {
              add("It's across from " + the(k) + '.', '네 곳은 길 한쪽에 나란히 있어요. 길 건너 맞은편(across from)이 아니에요.');
            }
          }
          var near = cands.filter(function (c) { return c.indexOf('across') < 0; });
          var far = cands.filter(function (c) { return c.indexOf('across') >= 0; });
          var pick = R.choices(correct, R.shuffle(near).concat(R.shuffle(far)));
          return {
            type: 'choice', concept: 2,
            q: '길 한쪽에 네 곳이 왼쪽부터 이 차례로 나란히 붙어 있어요.\n\n' + p.map(function (x) { return '[ ' + x + ' ]'; }).join(' ') + '\n\nWhere is ' + the(t) + '?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: explain,
          };
        },
      },
      {
        id: 'there-is-are',
        level: 1,
        title: 'There is 와 There are 고르기',
        make: function (R) {
          var item = R.pick([
            ['bed', 'beds', '침대', '개', 'in my room', '내 방에'],
            ['chair', 'chairs', '의자', '개', 'in my room', '내 방에'],
            ['desk', 'desks', '책상', '개', 'in my room', '내 방에'],
            ['window', 'windows', '창문', '개', 'in my room', '내 방에'],
            ['lamp', 'lamps', '전등', '개', 'in my room', '내 방에'],
            ['park', 'parks', '공원', '곳', 'in my town', '우리 마을에'],
            ['bakery', 'bakeries', '빵집', '곳', 'near my house', '우리 집 근처에'],
            ['library', 'libraries', '도서관', '곳', 'in my town', '우리 마을에'],
            ['hospital', 'hospitals', '병원', '곳', 'near my school', '우리 학교 근처에'],
            ['tree', 'trees', '나무', '그루', 'in the park', '공원에'],
            ['book', 'books', '책', '권', 'on the desk', '책상 위에'],
          ]);
          var n = R.int(1, 5);
          var en = ['', 'a', 'two', 'three', 'four', 'five'][n];
          var ko = ['', '한', '두', '세', '네', '다섯'][n];
          var noun = n === 1 ? item[0] : item[1];
          var ans = n === 1 ? 'is' : 'are';
          var choices = ['is', 'are', 'am'];
          var why = n === 1
            ? ['', item[0] + ' 하나(a ' + item[0] + ')만 있으니 are 가 아니라 is 를 써요.', 'am 은 I 와 함께 쓰는 말이에요.']
            : [item[1] + ' 처럼 둘 이상(' + en + ')이면 is 가 아니라 are 를 써요.', '', 'am 은 I 와 함께 쓰는 말이에요.'];
          return {
            type: 'choice', concept: 3, fixed: true,
            q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\n' + item[5] + ' ' + item[2] + R.josa(item[2], '이/가') + ' ' + ko + ' ' + item[3] + ' 있어요.\n\nThere [[blank]] ' + en + ' ' + noun + ' ' + item[4] + '.',
            choices: choices,
            answer: n === 1 ? 0 : 1,
            why: why,
            explain: (n === 1
              ? '하나(a ' + item[0] + ')일 때는 **There is** 를 써요.'
              : '둘 이상(' + en + ' ' + item[1] + ')일 때는 **There are** 를 써요. 낱말 끝도 ' + item[1] + ' 처럼 여럿을 나타내는 꼴이에요.') +
              ' → **There ' + ans + ' ' + en + ' ' + noun + ' ' + item[4] + '.**',
          };
        },
      },
    ],

    vocab: [
      { w: 'library', m: '도서관', ex: 'I borrow books from the library.', exm: '나는 도서관에서 책을 빌려요.' },
      { w: 'bank', m: '은행', ex: 'My mom goes to the bank on Friday.', exm: '우리 엄마는 금요일에 은행에 가세요.' },
      { w: 'hospital', m: '병원', ex: 'The hospital is next to the park.', exm: '병원은 공원 옆에 있어요.' },
      { w: 'park', m: '공원', ex: 'We ride bikes in the park.', exm: '우리는 공원에서 자전거를 타요.' },
      { w: 'post office', m: '우체국', ex: 'I send a letter at the post office.', exm: '나는 우체국에서 편지를 보내요.' },
      { w: 'bakery', m: '빵집', ex: 'The bakery smells sweet.', exm: '그 빵집에서는 달콤한 냄새가 나요.' },
      { w: 'town', m: '마을, 동네', ex: 'There is a big library in my town.', exm: '우리 동네에는 큰 도서관이 있어요.' },
      { w: 'next to', m: '~ 바로 옆에', ex: 'Jiho sits next to me.', exm: '지호는 내 옆에 앉아요.' },
      { w: 'across from', m: '(길 건너) ~ 맞은편에', ex: 'The bakery is across from the bank.', exm: '빵집은 은행 맞은편에 있어요.' },
      { w: 'between', m: '~ 사이에', ex: 'The bank is between the bakery and the library.', exm: '은행은 빵집과 도서관 사이에 있어요.' },
      { w: 'in front of', m: '~ 앞에', ex: 'There is a big tree in front of my school.', exm: '우리 학교 앞에 큰 나무가 있어요.' },
      { w: 'behind', m: '~ 뒤에', ex: 'The cat is hiding behind the sofa.', exm: '고양이가 소파 뒤에 숨어 있어요.' },
      { w: 'near', m: '~ 가까이에, 근처에', ex: 'There is a park near my house.', exm: '우리 집 근처에 공원이 있어요.' },
      { w: 'where', m: '어디에', ex: 'Where is the post office?', exm: '우체국은 어디에 있어요?' },
      { w: 'map', m: '지도', ex: 'Look at the map of our town.', exm: '우리 마을 지도를 보세요.' },
      { w: 'room', m: '방', ex: 'There are two windows in my room.', exm: '내 방에는 창문이 두 개 있어요.' },
    ],
  });
})();

