/* 3학년 영어 · 날씨 묻고 답하기 */
(function () {
  /* 날씨 그림 (80×80 칸 하나). 선은 currentColor 라서 밝은/어두운 화면에서 모두 보인다. 그림에 영어 낱말(정답)은 쓰지 않는다. */
  var LINE = ' fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  function cloud(dy) {
    return '<path d="M16 ' + (58 + dy) + ' H62 A11 11 0 0 0 62 ' + (36 + dy) + ' A15 15 0 0 0 33 ' + (31 + dy) +
      ' A13 13 0 0 0 16 ' + (58 + dy) + ' Z"' + LINE + '/>';
  }
  var ICON = {
    sunny: '<circle cx="40" cy="40" r="13" fill="var(--fig-2)" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M59 40 H67 M21 40 H13 M40 59 V67 M40 21 V13 M53.4 53.4 L59.1 59.1 M26.6 53.4 L20.9 59.1 M26.6 26.6 L20.9 20.9 M53.4 26.6 L59.1 20.9"' + LINE + '/>',
    cloudy: cloud(0),
    rainy: cloud(-8) + '<path d="M28 58 L24 70 M40 58 L36 70 M52 58 L48 70" fill="none" stroke="var(--fig-1)" stroke-width="3" stroke-linecap="round"/>',
    snowy: cloud(-8) + '<g fill="currentColor"><circle cx="26" cy="60" r="2.8"/><circle cx="40" cy="60" r="2.8"/><circle cx="54" cy="60" r="2.8"/>' +
      '<circle cx="33" cy="70" r="2.8"/><circle cx="47" cy="70" r="2.8"/></g>',
    windy: '<path d="M8 30 H52 A8 8 0 1 0 44 22 M8 44 H64 A8 8 0 1 1 56 52 M8 58 H44"' + LINE + '/>',
  };
  var ALT = { sunny: '해가 쨍쨍 빛나는 그림', cloudy: '구름이 낀 그림', rainy: '구름에서 빗방울이 떨어지는 그림', snowy: '구름에서 눈송이가 떨어지는 그림', windy: '바람이 휙휙 부는 선 그림' };
  function cell(kind, x, y) { return '<g transform="translate(' + x + ' ' + y + ')">' + ICON[kind] + '</g>'; }
  function one(kind) {
    return { type: 'svg', alt: ALT[kind], svg: '<svg viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">' + cell(kind, 60, 5) + '</svg>' };
  }
  // list: [[지역 이름, 날씨], …] 3개 — 가상의 일기 예보
  function forecast(list) {
    var body = '';
    list.forEach(function (p, i) {
      body += cell(p[1], 10 + i * 100, 0) +
        '<text x="' + (50 + i * 100) + '" y="106" text-anchor="middle" font-size="16" fill="currentColor">' + p[0] + '</text>';
    });
    return {
      type: 'svg',
      alt: '가상의 일기 예보: ' + list.map(function (p) { return p[0] + ' — ' + ALT[p[1]]; }).join(', '),
      svg: '<svg viewBox="0 0 300 115" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>',
    };
  }

  Tutor.registerUnit({
    id: 'eng-e3-12',
    course: 'eng-e3',
    title: '날씨 묻고 답하기',
    summary: "How's the weather?로 날씨를 묻고 It's cloudy.처럼 답하며, 날씨에 맞게 챙길 것을 말해요.",
    goals: [
      "How's the weather?로 날씨를 묻고 It's sunny.처럼 대답할 수 있어요.",
      '날씨 낱말 sunny, cloudy, rainy, snowy, windy, hot, cold를 듣고 읽을 수 있어요.',
      "It's raining now. / It's snowing a lot.으로 지금 비나 눈이 내린다고 말할 수 있어요.",
      '날씨에 맞게 Take your umbrella. / Wear your coat.라고 말하고, 그림 일기 예보를 보고 날씨를 알아맞힐 수 있어요.',
    ],
    standards: ['[4영01-06]', '[4영02-08]', '[4영02-06]', '[4영01-08]'],

    concepts: [
      {
        title: "How's the weather? — 날씨 묻고 답하기",
        body: "날씨를 물을 때는 **How's the weather?**라고 말해요. \"날씨가 어때?\"라는 뜻이에요. **weather**는 \"날씨\"예요.\n\n대답할 때는 **It's** 뒤에 날씨 낱말을 붙여요.\n\n- A: **How's the weather?** (날씨가 어때?)\n- B: **It's cloudy.** (흐려.)\n\n**How's**는 **How is**를, **It's**는 **It is**를 줄인 말이에요.\n\n> 💡 날씨를 말할 때 쓰는 It은 \"그것\"이라고 옮기지 않아요. It's sunny.는 그냥 \"맑아요.\"예요.",
        easy: "창밖을 내다보는 친구에게 \"밖에 날씨 어때?\" 하고 묻는 장면을 떠올려 보세요. 그 말이 **How's the weather?**예요.\n\n친구는 하늘을 보고 **It's** + 날씨 낱말로 대답해요.\n\n- 해가 쨍쨍하면 → It's sunny.\n- 구름이 잔뜩 끼었으면 → It's cloudy.",
        check: {
          type: 'ox',
          q: "'How's the weather?'는 '날씨가 어때?'라는 뜻이에요.",
          answer: true,
          explain: "weather는 \"날씨\"예요. How's the weather?는 날씨가 어떤지 묻는 말이에요.",
        },
      },
      {
        title: '날씨 낱말',
        body: "날씨를 나타내는 낱말이에요.\n\n| 영어 | 뜻 | 만든 방법 |\n|---|---|---|\n| **sunny** | 맑은, 해가 쨍쨍한 | sun(해) + n + y |\n| **cloudy** | 흐린, 구름 낀 | cloud(구름) + y |\n| **rainy** | 비가 오는 | rain(비) + y |\n| **snowy** | 눈이 오는 | snow(눈) + y |\n| **windy** | 바람이 부는 | wind(바람) + y |\n| **hot** | 더운 | |\n| **cold** | 추운 | |\n\n해·구름·비·눈·바람을 나타내는 낱말 끝에 **y**를 붙이면 날씨 낱말이 돼요. sun은 n을 하나 더 써서 **sunny**예요.\n\n**hot**(더운)과 **cold**(추운)는 서로 반대말이에요.",
        easy: '날씨 낱말은 "하늘에 있는 것 + y"라고 생각하세요.\n\n- 하늘에 **cloud**(구름)가 있으면 → cloud**y**\n- 하늘에서 **rain**(비)이 오면 → rain**y**\n- 하늘에서 **snow**(눈)가 오면 → snow**y**\n\n꼬리 y가 붙으면 "~가 있는 날씨"라는 뜻이 돼요.',
        fig: {
          type: 'svg',
          alt: '날씨 그림 다섯 개: 해, 구름, 비, 눈, 바람. 그림 아래에 sunny, cloudy, rainy, snowy, windy라고 쓰여 있다',
          svg: '<svg viewBox="0 0 440 112" xmlns="http://www.w3.org/2000/svg">' +
            cell('sunny', 4, 0) + cell('cloudy', 92, 0) + cell('rainy', 180, 0) + cell('snowy', 268, 0) + cell('windy', 356, 0) +
            '<g font-size="16" fill="currentColor" text-anchor="middle">' +
            '<text x="44" y="104">sunny</text><text x="132" y="104">cloudy</text><text x="220" y="104">rainy</text>' +
            '<text x="308" y="104">snowy</text><text x="396" y="104">windy</text></g></svg>',
        },
        check: {
          type: 'choice',
          q: "'rainy'의 뜻은 무엇일까요?",
          choices: ['비가 오는', '눈이 오는', '바람이 부는'],
          answer: 0,
          why: ['', '눈이 오는 날씨는 snowy예요.', '바람이 부는 날씨는 windy예요.'],
          explain: 'rain(비)에 y를 붙인 **rainy**는 "비가 오는"이라는 뜻이에요.',
        },
      },
      {
        title: '지금 비나 눈이 내릴 때',
        body: "바로 **지금** 비나 눈이 내리고 있다고 말할 때는 이렇게 말해요.\n\n- **It's raining now.** 지금 비가 내리고 있어요.\n- **It's snowing a lot.** 눈이 많이 내리고 있어요.\n\n**raining**은 \"비가 내리고 있는\", **snowing**은 \"눈이 내리고 있는\"이라는 뜻이에요. **now**는 \"지금\", **a lot**은 \"많이\"예요.\n\n| 날씨를 말할 때 | 지금 내리고 있다고 말할 때 |\n|---|---|\n| It's rainy. (비가 오는 날씨예요.) | It's raining. (비가 내리고 있어요.) |\n| It's snowy. (눈이 오는 날씨예요.) | It's snowing. (눈이 내리고 있어요.) |\n\n> 💡 It's raining now.는 한 덩어리로 기억해요. \"-ing\"를 붙이는 방법은 4학년에서 자세히 배워요.",
        easy: '창밖에 빗방울이 **지금** 똑똑 떨어지고 있어요. 이때 "비 온다!" 하고 외치는 말이 **It\'s raining!**이에요.\n\n눈송이가 펑펑 쏟아지고 있으면 **It\'s snowing a lot!**이라고 해요. a lot은 "많이"예요.',
        check: {
          type: 'choice',
          q: "'눈이 많이 내리고 있어요.'를 영어로 바르게 나타낸 것은 무엇일까요?",
          choices: ["It's snowing a lot.", "It's raining a lot.", "It's sunny."],
          answer: 0,
          why: ['', 'raining은 비가 내리고 있다는 말이에요. 눈은 snow예요.', 'sunny는 해가 쨍쨍한 맑은 날씨예요.'],
          explain: "눈(snow)이 내리고 있으니 **It's snowing a lot.**이에요. a lot은 \"많이\"예요.",
        },
      },
      {
        title: '날씨에 맞게 말하기',
        body: "날씨에 맞게 챙길 것을 알려 주는 말이에요.\n\n- 비가 올 때: **Take your umbrella.** (우산을 챙기렴.)\n- 추울 때: **Wear your coat.** (외투를 입으렴.)\n\n**take**는 \"가지고 가다, 챙기다\", **wear**는 \"입다\"예요. **umbrella**는 우산, **coat**는 외투예요.\n\n- A: How's the weather?\n- B: It's raining now.\n- A: **Take your umbrella.**\n\n> ⚠️ 우산은 입는 것이 아니라 챙기는 것이라서 Wear your umbrella.라고 하지 않아요.",
        easy: "현관에서 집을 나서기 전에 엄마가 하늘을 보고 말해요.\n\n- \"비 오네. 우산 챙겨!\" → **Take your umbrella.**\n- \"춥다. 외투 입어!\" → **Wear your coat.**\n\n손에 들고 가는 것은 **take**, 몸에 입는 것은 **wear**라고 기억하세요.",
        check: {
          type: 'choice',
          q: '비가 와요. 친구에게 우산을 챙기라고 할 때 알맞은 말은 무엇일까요?',
          choices: ['Take your umbrella.', 'Wear your umbrella.', "It's sunny."],
          answer: 0,
          why: ['', '우산은 입는 것(wear)이 아니라 챙기는 것(take)이에요.', 'sunny는 맑은 날씨예요. 비가 오는 날과 맞지 않아요.'],
          explain: '우산을 챙기라고 할 때는 **Take your umbrella.**라고 해요.',
        },
      },
      {
        title: '그림 일기 예보 읽기',
        body: "일기 예보에서는 날씨를 그림으로 보여 줘요. 그림을 보고 알맞은 날씨 낱말을 떠올려요.\n\n| 그림 | 날씨 |\n|---|---|\n| 해 | It's sunny. |\n| 구름 | It's cloudy. |\n| 구름 + 빗방울 | It's rainy. |\n| 구름 + 눈송이 | It's snowy. |\n| 휘날리는 선 | It's windy. |\n\n아래는 가상의 일기 예보예요. 서울은 해, 대전은 구름, 부산은 바람 그림이에요. 그래서 서울은 It's sunny., 대전은 It's cloudy., 부산은 It's windy.라고 말해요.",
        easy: '일기 예보 그림은 하늘에 무엇이 있는지 그린 거예요. 그림 속 하늘을 보고 "하늘에 있는 것 + y"를 떠올리면 돼요.\n\n구름 그림 → cloud + y → **cloudy**',
        fig: forecast([['서울', 'sunny'], ['대전', 'cloudy'], ['부산', 'windy']]),
        check: {
          type: 'choice',
          q: '가상의 일기 예보예요. **대구**의 날씨로 알맞은 것은 무엇일까요?',
          fig: forecast([['인천', 'sunny'], ['대구', 'snowy'], ['광주', 'cloudy']]),
          choices: ["It's snowy.", "It's sunny.", "It's cloudy."],
          answer: 0,
          why: ['', '해 그림은 인천이에요. 대구는 구름에서 눈송이가 떨어지는 그림이에요.', '구름만 있는 그림은 광주예요. 대구는 구름 아래에 눈송이가 있어요.'],
          explain: "대구에는 구름에서 눈송이가 떨어지는 그림이 있어요. 눈이 오는 날씨는 **It's snowy.**예요.",
        },
      },
    ],

    examples: [
      {
        q: "그림을 보고 대화의 빈칸에 알맞은 대답을 써 보세요.\n\nA: How's the weather?\nB: [[........]]",
        fig: one('cloudy'),
        steps: [
          "How's the weather?는 \"날씨가 어때?\"라고 묻는 말이에요.",
          '그림에는 구름이 끼어 있어요. 구름은 cloud예요.',
          'cloud에 y를 붙이면 "흐린, 구름 낀"이라는 뜻의 cloudy가 돼요.',
          "날씨를 대답할 때는 It's 뒤에 날씨 낱말을 붙여요.",
        ],
        answer: "It's cloudy.",
      },
      {
        q: '밖에 지금 비가 내리고 있어요. 엄마가 집을 나서는 지아에게 할 말을 두 문장으로 말해 보세요.',
        steps: [
          "지금 비가 내리고 있다는 말은 It's raining now.예요.",
          '비가 오면 우산을 챙겨야 해요. 우산은 umbrella, 챙기다는 take예요.',
          '그래서 Take your umbrella.라고 말해요.',
        ],
        answer: "It's raining now. Take your umbrella.",
      },
    ],

    terms: [
      { term: "How's the weather?", def: '"날씨가 어때?"라고 묻는 말이에요. How\'s는 How is를 줄인 말이에요.' },
      { term: 'weather', def: '"날씨"라는 뜻의 낱말이에요.' },
      { term: "It's + 날씨 낱말", def: "날씨를 대답하는 말이에요. 예: It's sunny.(맑아요.), It's cold.(추워요.)" },
      { term: '날씨 낱말 만들기(+y)', def: '해·구름·비·눈·바람 낱말 끝에 y를 붙이면 날씨 낱말이 돼요. 예: cloud → cloudy, rain → rainy, sun → sunny' },
      { term: "It's raining.", def: "지금 비가 내리고 있다는 말이에요. 눈이 내리고 있으면 It's snowing.이라고 해요." },
      { term: '일기 예보', def: '앞으로의 날씨를 미리 알려 주는 것이에요. 해, 구름, 비, 눈 같은 그림으로 날씨를 보여 줘요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 1,
        q: "'snowy'의 뜻은 무엇일까요?",
        choices: ['눈이 오는', '비가 오는', '바람이 부는', '맑은'],
        answer: 0,
        why: ['', '비가 오는 날씨는 rainy예요.', '바람이 부는 날씨는 windy예요.', '맑은 날씨는 sunny예요.'],
        explain: 'snow(눈)에 y를 붙인 **snowy**는 "눈이 오는"이라는 뜻이에요.',
      },
      {
        id: 'p2', level: 1, type: 'short', concept: 1,
        q: "'바람이 부는'이라는 뜻의 날씨 낱말을 영어로 써 보세요. w로 시작해요.",
        answer: ['windy'],
        wrong: [{ a: 'wind', why: 'wind는 "바람"이에요. 날씨를 말할 때는 끝에 y를 붙여 windy라고 해요.' }],
        explain: 'wind(바람)에 y를 붙인 **windy**가 "바람이 부는"이라는 뜻이에요.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 0,
        q: "그림을 보고 물음에 알맞은 대답을 고르세요.\n\nHow's the weather?",
        fig: one('sunny'),
        choices: ["It's sunny.", "It's rainy.", "It's snowy.", "It's windy."],
        answer: 0,
        why: ['', '빗방울 그림이 아니에요. 해가 쨍쨍해요.', '눈송이 그림이 아니에요. 해가 쨍쨍해요.', '바람 그림이 아니에요. 해가 쨍쨍해요.'],
        explain: "해가 쨍쨍하니 맑은 날씨예요. **It's sunny.**라고 대답해요.",
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 0,
        q: "'How's the weather?'라는 물음에 'Yes, it is.'라고 대답해요.",
        answer: false,
        explain: "How's the weather?는 날씨가 **어떤지** 묻는 말이라 Yes나 No로 대답하지 않아요. It's sunny.처럼 날씨를 말해요.",
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 1,
        q: "'hot'의 반대말은 무엇일까요?",
        choices: ['cold', 'cloudy', 'windy', 'sunny'],
        answer: 0,
        why: ['', 'cloudy는 "흐린"이에요. 더위와 추위를 나타내는 말이 아니에요.', 'windy는 "바람이 부는"이에요.', 'sunny는 "맑은"이에요.'],
        explain: 'hot(더운)의 반대말은 **cold**(추운)예요.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: "'우산을 챙기렴.'을 영어로 바르게 나타낸 것은 무엇일까요?",
        choices: ['Take your umbrella.', 'Wear your umbrella.', 'Wear your coat.', "It's raining."],
        answer: 0,
        why: ['', 'wear는 "입다"예요. 우산은 챙기는 것이라 take를 써요.', 'Wear your coat.는 "외투를 입으렴."이에요.', "It's raining.은 \"비가 내리고 있어요.\"예요."],
        explain: 'take는 "챙기다", umbrella는 "우산"이에요. **Take your umbrella.**',
      },
      {
        id: 'p7', level: 1, type: 'short', concept: 4,
        q: "그림을 보고 빈칸에 알맞은 날씨 낱말을 써 보세요.\n\nIt's [[........]].",
        fig: one('rainy'),
        answer: ['rainy', 'raining'],
        wrong: [{ a: 'rain', why: 'rain은 "비"예요. 날씨를 말할 때는 끝에 y를 붙여 rainy라고 해요.' }],
        explain: "구름에서 빗방울이 떨어지니 비가 오는 날씨예요. **It's rainy.**라고 해요. 지금 비가 내리고 있다는 뜻으로 It's raining.이라고 해도 맞아요.",
      },
      {
        id: 'p8', level: 2, type: 'order', concept: 2,
        q: "낱말을 바르게 늘어놓아 '지금 비가 내리고 있어요.'라는 문장을 만드세요.",
        choices: ["It's", 'raining', 'now'],
        answer: [0, 1, 2],
        hint: "It's로 시작해요. now(지금)는 맨 뒤에 와요.",
        explain: "**It's raining now.** It's raining(비가 내리고 있어요) 뒤에 now(지금)를 붙여요.",
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 4,
        q: '가상의 일기 예보예요. **광주**의 날씨로 알맞은 것은 무엇일까요?',
        fig: forecast([['인천', 'windy'], ['광주', 'rainy'], ['대구', 'sunny']]),
        choices: ["It's rainy.", "It's windy.", "It's sunny.", "It's snowy."],
        answer: 0,
        why: ['', '바람 그림은 인천이에요.', '해 그림은 대구예요.', '광주의 그림은 눈송이가 아니라 빗방울이에요.'],
        hint: '광주 위에 있는 그림을 찾아보세요.',
        explain: "광주에는 구름에서 빗방울이 떨어지는 그림이 있어요. 비가 오는 날씨이니 **It's rainy.**예요.",
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: "대화의 빈칸에 알맞은 말을 고르세요.\n\nA: How's the weather?\nB: It's cold. It's snowing a lot.\nA: [[........]]",
        choices: ['Wear your coat.', "It's hot.", 'Yes, I can.', 'Wear your umbrella.'],
        answer: 0,
        why: ['', '추운 날씨라고 했어요. hot은 "더운"이에요.', 'Can으로 묻지 않았어요. 날씨에 맞게 할 말을 골라요.', '우산은 입는 것이 아니에요. 챙길 때는 take를 써요.'],
        hint: '춥고 눈이 많이 와요. 무엇을 하라고 하면 좋을까요?',
        explain: '춥고 눈이 많이 내리니 외투를 입으라고 **Wear your coat.**라고 말해요.',
      },
      {
        id: 'p11', level: 2, type: 'short', concept: 1,
        q: "cloud(구름)를 날씨 낱말로 바꾸어 빈칸에 써 보세요.\n\nIt's [[........]]. (흐려요.)",
        answer: ['cloudy'],
        wrong: [{ a: 'cloud', why: 'cloud는 "구름"이에요. 날씨를 말할 때는 끝에 y를 붙여요.' }],
        hint: '날씨 낱말은 끝에 무엇을 붙였는지 떠올려 보세요.',
        explain: 'cloud에 y를 붙인 **cloudy**가 "흐린, 구름 낀"이라는 뜻이에요.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 0,
        q: '대화가 **자연스럽지 않은** 것을 고르세요.',
        choices: [
          "A: How's the weather? B: Yes, I do.",
          "A: How's the weather? B: It's windy.",
          "A: How's the weather? B: It's snowing a lot.",
          "A: It's cold. Wear your coat. B: OK.",
        ],
        answer: 0,
        why: ['', '날씨를 묻고 바람이 분다고 바르게 대답했어요.', '날씨를 묻고 눈이 많이 내린다고 바르게 대답했어요.', '춥다며 외투를 입으라고 하자 알겠다고 했어요.'],
        explain: "How's the weather?는 날씨를 묻는 말이에요. Yes, I do.는 Do로 물을 때의 대답이라 맞지 않아요.",
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 3,
        q: '가상의 일기 예보예요. 이날 **우산을 챙겨야 하는** 곳은 어디일까요?',
        fig: forecast([['서울', 'snowy'], ['대전', 'sunny'], ['부산', 'rainy']]),
        choices: ['부산', '서울', '대전'],
        answer: 0,
        why: ['', '서울은 눈송이 그림이에요. 눈이 오는 날은 Wear your coat.처럼 따뜻하게 입어요.', '대전은 해 그림이라 맑아요.'],
        hint: '빗방울이 떨어지는 그림을 찾아보세요.',
        explain: "부산에는 빗방울 그림이 있어 비가 와요(It's rainy.). 그래서 부산에서는 **Take your umbrella.**라고 말해요.",
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: "하윤이의 말을 읽고 물음에 답하세요.\n\nHayun: How's the weather? It's sunny. It's hot.\n\n하윤이가 사는 곳의 날씨는 어떨까요?",
        choices: ['맑고 더워요.', '맑고 추워요.', '흐리고 더워요.', '눈이 오고 추워요.'],
        answer: 0,
        why: ['', 'hot은 "더운"이에요. "추운"은 cold예요.', 'sunny는 "맑은"이에요. "흐린"은 cloudy예요.', 'sunny는 맑은 날씨, hot은 더운 날씨예요.'],
        hint: 'sunny와 hot의 뜻을 하나씩 떠올려 보세요.',
        explain: "It's sunny.는 \"맑아요.\", It's hot.은 \"더워요.\"예요. 그래서 맑고 더운 날씨예요.",
      },
      {
        id: 'a3', level: 3, type: 'short', concept: 3,
        q: "엄마의 말을 읽고 빈칸에 알맞은 낱말을 써 보세요.\n\nMom: It's cold. It's snowing a lot. Wear your [[........]].",
        answer: ['coat', 'jacket'],
        wrong: [{ a: 'umbrella', why: 'umbrella(우산)는 입는 것이 아니에요. wear(입다) 뒤에는 입는 것이 와요.' }],
        hint: 'wear는 "입다"예요. 추울 때 입는 것을 떠올려 보세요.',
        explain: '춥고 눈이 많이 와요. wear(입다) 뒤에는 입는 것이 오니 **coat**(외투)를 써서 Wear your coat.라고 해요.',
      },
      {
        id: 'a4', level: 3, type: 'ox', concept: 3,
        q: "지금 비가 내리고 있을 때 'It's raining now. Wear your umbrella.'라고 말해요.",
        answer: false,
        hint: '우산은 입는 것일까요, 챙기는 것일까요?',
        explain: "It's raining now.는 맞지만, 우산은 입는 것이 아니라 챙기는 것이에요. **It's raining now. Take your umbrella.**라고 말해요.",
      },
    ],

    deeper: [
      {
        title: '하늘에 있는 것 + y',
        body: "날씨 낱말은 대부분 하늘에 있는 것의 이름에 **y**를 붙여 만들어요.\n\n| 이름 | 날씨 낱말 |\n|---|---|\n| sun (해) | sunny (맑은) |\n| cloud (구름) | cloudy (흐린) |\n| rain (비) | rainy (비가 오는) |\n| snow (눈) | snowy (눈이 오는) |\n| wind (바람) | windy (바람이 부는) |\n\nsun만 n을 하나 더 써서 sunny가 돼요. 이 규칙을 알면 처음 보는 날씨 낱말도 뜻을 짐작할 수 있어요. 예를 들어 **fog**는 \"안개\"인데, **foggy**는 \"안개가 낀\"이라는 뜻이에요.",
      },
    ],

    faq: [
      {
        q: 'rainy랑 raining은 뭐가 달라요?',
        a: "**It's rainy.**는 \"비가 오는 날씨예요.\"처럼 날씨가 어떤지 말해요. **It's raining.**은 \"지금 비가 내리고 있어요.\"처럼 바로 지금 내리는 모습을 말해요. 둘 다 비 오는 날 쓸 수 있는 말이에요.",
      },
      {
        q: 'sunny는 왜 n이 두 개예요?',
        a: 'sun(해)처럼 짧은 낱말에 y를 붙일 때는 마지막 글자를 한 번 더 써서 **sunny**가 돼요. 다른 날씨 낱말(cloudy, rainy, snowy, windy)은 y만 붙여요.',
      },
      {
        q: "It's sunny.에서 It은 무슨 뜻이에요?",
        a: '날씨를 말할 때 쓰는 It은 특별한 뜻이 없어요. 영어 문장에는 "무엇이"에 해당하는 말이 있어야 해서 It을 넣는 거예요. It\'s sunny.는 "그것은 맑다"가 아니라 그냥 "맑아요."예요.',
      },
    ],

    mistakes: [
      "It's cloud.처럼 y를 빠뜨리는 실수 — 날씨를 말할 때는 **It's cloudy.**처럼 y를 붙여요.",
      'Wear your umbrella.라고 하는 실수 — 우산은 챙기는 것이라 **Take your umbrella.**예요. 입는 것(coat)에 wear를 써요.',
      "How's the weather?에 Yes나 No로 대답하는 실수 — **It's sunny.**처럼 날씨를 말해요.",
    ],

    gens: [
      {
        id: 'weather-picture',
        level: 1,
        title: '날씨 그림을 보고 대답하기',
        make: function (R) {
          var kinds = [
            ['sunny', '해가 쨍쨍해요', 'sun'], ['cloudy', '구름이 끼었어요', 'cloud'], ['rainy', '비가 와요', 'rain'],
            ['snowy', '눈이 와요', 'snow'], ['windy', '바람이 불어요', 'wind'],
          ];
          var names = ['민수', '지아', '서준', '하윤', '도윤', '수아'];
          var k = R.pick(kinds);
          var name = R.pick(names);
          var correct = "It's " + k[0] + '.';
          var reason = {};
          var wrongs = kinds.filter(function (x) { return x[0] !== k[0]; }).map(function (x) {
            var s = "It's " + x[0] + '.';
            reason[s] = '그림과 맞지 않아요. 그림을 보면 ' + k[1] + '.';
            return s;
          });
          var noY = "It's " + k[2] + '.';
          reason[noY] = '날씨를 말할 때는 낱말 끝에 y를 붙여요.';
          var pick = R.choices(correct, R.sample(wrongs, 3).concat([noY]));
          return {
            type: 'choice', concept: 4,
            q: name + R.josa(name, '이/가') + " 창밖을 보고 있어요. 그림을 보고 물음에 알맞은 대답을 고르세요.\n\nHow's the weather?",
            fig: one(k[0]),
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '그림을 보면 ' + k[1] + '. 그래서 **' + correct + '**라고 대답해요.',
          };
        },
      },
      {
        id: 'weather-tell',
        level: 2,
        title: '날씨에 맞게 챙길 것 말하기',
        make: function (R) {
          var names = ['민수', '지아', '서준', '하윤', '도윤', '수아'];
          var name = R.pick(names);
          var rain = [["It's raining now.", '지금 비가 내리고 있어요'], ["It's rainy.", '비가 오는 날씨예요'], ["It's raining a lot.", '비가 많이 내리고 있어요']];
          var cold = [["It's cold.", '추워요'], ["It's snowing a lot.", '눈이 많이 내리고 있어요'], ["It's snowy and cold.", '눈이 오고 추워요'], ["It's windy and cold.", '바람이 불고 추워요']];
          var isRain = R.bool();
          var w = R.pick(isRain ? rain : cold);
          var head = '엄마가 집을 나서는 ' + name + '에게 말해요. 빈칸에 알맞은 낱말을 써 보세요.\n\nMom: ' + w[0];
          if (isRain) {
            return {
              type: 'short', concept: 3,
              q: head + ' Take your [[........]].',
              answer: ['umbrella'],
              wrong: [{ a: 'coat', why: '비가 와요. take(챙기다) 뒤에는 비를 막아 주는 우산(umbrella)이 와요.' }],
              hint: '비를 막으려면 무엇을 챙겨야 할까요?',
              explain: '엄마의 첫 말은 "' + w[1] + '."라는 뜻이에요. 그래서 우산을 챙기라고 **Take your umbrella.**라고 말해요.',
            };
          }
          return {
            type: 'short', concept: 3,
            q: head + ' Wear your [[........]].',
            answer: ['coat', 'jacket'],
            wrong: [{ a: 'umbrella', why: 'wear는 "입다"예요. 우산은 입는 것이 아니에요. 추울 때 입는 외투를 써요.' }],
            hint: 'wear는 "입다"예요. 추울 때 입는 것을 떠올려 보세요.',
            explain: '엄마의 첫 말은 "' + w[1] + '."라는 뜻이에요. 그래서 외투를 입으라고 **Wear your coat.**라고 말해요.',
          };
        },
      },
    ],

    vocab: [
      { w: 'weather', m: '날씨', ex: "How's the **weather**?", exm: '날씨가 어때?' },
      { w: 'sunny', m: '맑은, 해가 쨍쨍한', ex: "It's **sunny** today.", exm: '오늘은 맑아요.' },
      { w: 'cloudy', m: '흐린, 구름 낀', ex: "It's **cloudy**.", exm: '흐려요.' },
      { w: 'rainy', m: '비가 오는', ex: "It's **rainy**. Take your umbrella.", exm: '비가 와요. 우산을 챙기렴.' },
      { w: 'snowy', m: '눈이 오는', ex: "It's **snowy** and cold.", exm: '눈이 오고 추워요.' },
      { w: 'windy', m: '바람이 부는', ex: "It's **windy**.", exm: '바람이 불어요.' },
      { w: 'hot', m: '더운', ex: "It's **hot** and sunny.", exm: '덥고 맑아요.' },
      { w: 'cold', m: '추운', ex: "It's **cold**. Wear your coat.", exm: '추워요. 외투를 입으렴.' },
      { w: 'umbrella', m: '우산', ex: 'Take your **umbrella**.', exm: '우산을 챙기렴.' },
      { w: 'coat', m: '외투, 코트', ex: 'Wear your **coat**.', exm: '외투를 입으렴.' },
      { w: 'rain', m: '비; 비가 오다', ex: "It's **raining** now.", exm: '지금 비가 내리고 있어요.' },
      { w: 'snow', m: '눈; 눈이 오다', ex: "It's **snowing** a lot.", exm: '눈이 많이 내리고 있어요.' },
    ],
  });
})();
