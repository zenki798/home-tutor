/* 5학년 영어 · 음식 주문하고 물건 사기 */
Tutor.registerUnit({
  id: 'eng-e5-04',
  course: 'eng-e5',
  title: '음식 주문하고 물건 사기',
  summary: 'What would you like?로 음식을 주문하고, How much are these?로 값을 물으며 가게에서 물건을 사요.',
  goals: [
    "What would you like?에 I'd like ~.로 음식을 주문할 수 있어요.",
    '음식을 권하는 말에 Yes, please.나 No, thanks.로 답할 수 있어요.',
    "How much is it?과 How much are these?로 값을 묻고 thousand를 써서 값을 말할 수 있어요.",
    '메뉴판과 가격표를 읽고 필요한 정보를 찾을 수 있어요.',
  ],
  standards: ['[6영02-07]', '[6영01-04]', '[6영01-08]'],

  concepts: [
    {
      title: "음식 주문하기: What would you like? / I'd like ~.",
      body: "식당에서 점원은 **What would you like?** 하고 물어요. '무엇을 드시겠어요?'라는 뜻이에요. 주문할 때는 **I'd like ~.** 로 답해요. '~ 주세요, ~으로 할게요'라는 뜻이에요.\n\nA: What would you like?\nB: **I'd like** a cheese sandwich.\n\nI'd는 I would를 줄인 말이에요. I'd like ~는 I want ~보다 **공손한** 말이라서 주문할 때 많이 써요. 끝에 please를 붙이면 더 공손해요. → I'd like a hot dog, please.\n\n> ⚠️ I like pizza.는 '나는 피자를 좋아해요'라는 뜻이에요. 주문할 때는 I'd like를 써요.",
      easy: "식당 놀이를 한다고 생각해 보세요. 점원은 'What would you like?' 하고 묻고, 손님은 'I'd like' 뒤에 먹고 싶은 음식을 붙여요.\n\n- 치즈 샌드위치 → I'd like a cheese sandwich.\n- 핫도그 → I'd like a hot dog.\n\n'I'd like'를 '~ 주세요'라고 생각하면 쉬워요.",
      check: {
        type: 'choice',
        q: '**What would you like?** 에 알맞은 대답은 무엇일까요?',
        choices: ["I'd like a cheese sandwich.", 'I like cheese.', "It's 5,000 won."],
        answer: 0,
        why: ['', "'나는 치즈를 좋아해요'라는 뜻이에요. 주문할 때는 I'd like를 써요.", '값을 말하는 말이에요. 무엇을 주문할지 물었어요.'],
        explain: "What would you like?는 무엇을 주문할지 묻는 말이에요. I'd like 뒤에 음식 이름을 붙여 답해요.",
      },
    },
    {
      title: '음식 권하고 답하기: Yes, please. / No, thanks.',
      body: "음식을 권할 때는 **Do you want some ~?** 하고 물어요. '~ 좀 먹을래요?, ~ 좀 마실래요?'라는 뜻이에요.\n\n| 받을 때 | 사양할 때 |\n|---|---|\n| **Yes, please.** (네, 주세요.) | **No, thanks.** (아니요, 괜찮아요.) |\n\nA: Do you want some juice?\nB: Yes, please. / No, thanks. I'm full.\n\nNo, thanks.는 '고맙지만 괜찮아요'라는 뜻이라 거절해도 예의 바른 말이에요. thanks의 s를 빠뜨리지 않도록 해요.",
      easy: "친구 집에 놀러 갔는데 친구가 '주스 줄까?' 하고 물어요. 먹고 싶으면 '응, 줘!', 배가 부르면 '아니, 괜찮아'라고 하지요.\n\n영어로는 두 마디면 충분해요.\n\n- 응, 줘! → Yes, please.\n- 아니, 괜찮아. → No, thanks.",
      check: {
        type: 'ox',
        q: "**Do you want some milk?** 에 '아니요, 괜찮아요'라고 답할 때는 No, thanks.라고 해요.",
        answer: true,
        explain: "No, thanks.는 '고맙지만 괜찮아요'라는 뜻이에요. 받고 싶을 때는 Yes, please.라고 해요.",
      },
    },
    {
      title: "가게에서 쓰는 말: Can I help you? / I'm looking for ~.",
      body: "가게에 들어가면 점원이 **Can I help you?** 하고 물어요. '도와드릴까요?, 무엇을 찾으세요?'라는 뜻이에요. 찾는 물건이 있으면 **I'm looking for ~.** 로 답해요. '~을 찾고 있어요'라는 뜻이에요.\n\nA: Can I help you?\nB: Yes, please. I'm looking for a cap.\nA: How about this one?\nB: I like it.\n\n**How about this one?** 은 '이건 어때요?'라는 뜻으로, 점원이 물건을 보여 줄 때 써요.\n\n> 💡 그냥 구경할 때는 No, thanks. I'm just looking. 하고 말하면 돼요. '괜찮아요, 그냥 구경 중이에요'라는 뜻이에요.",
      easy: "가게 놀이에서 점원은 '뭘 찾으세요?' 하고, 손님은 '모자를 찾고 있어요' 하고 말하지요.\n\n- 점원: Can I help you?\n- 손님: I'm looking for a cap.\n\nlook for는 '찾다'라는 뜻이에요. 찾는 물건 이름만 바꿔 넣으면 돼요.",
      check: {
        type: 'choice',
        q: '가게에서 **점원**이 손님에게 하는 말은 무엇일까요?',
        choices: ['Can I help you?', "I'm looking for a cap.", 'How much is it?'],
        answer: 0,
        why: ['', '손님이 찾는 물건을 말할 때 하는 말이에요.', '손님이 값을 물을 때 하는 말이에요.'],
        explain: "Can I help you?는 점원이 '도와드릴까요?' 하고 묻는 말이에요.",
      },
    },
    {
      title: '값 묻고 답하기: 하나일 때와 여러 개일 때',
      body: "물건값을 물을 때는 물건이 **하나인지 여러 개인지**에 따라 말이 달라져요.\n\n| 하나일 때 | 여러 개일 때 |\n|---|---|\n| How much **is it**? | How much **are these**? |\n| How much **is this cap**? | How much **are these socks**? |\n| **It's** 9,000 won. | **They're** 15,000 won. |\n\n3단원에서 배운 것처럼 this와 these, is와 are, It's와 They're가 짝을 이뤄요.\n\n> 💡 우리나라 돈의 단위 won은 여러 개여도 s를 붙이지 않아요. 15,000 wons (틀림) → 15,000 won (맞음)",
      easy: "가게에서 모자 하나를 들고 물을 때와, 양말 여러 켤레를 들고 물을 때를 떠올려 보세요.\n\n- 하나 → How much is it? → It's ○○ won.\n- 여러 개 → How much are these? → They're ○○ won.\n\n물을 때 is를 썼으면 It's, are를 썼으면 They're로 답해요.",
      check: {
        type: 'choice',
        q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: How much are these gloves?\nB: [[They're 8,000 won.]]",
        choices: ["They're 8,000 won.", "It's 8,000 won.", "They're 8,000 wons."],
        answer: 0,
        why: ['', "are these로 물었으니 여러 개예요. It's가 아니라 They're로 답해요.", 'won에는 s를 붙이지 않아요.'],
        explain: "장갑은 여러 개(are these)이므로 They're로 답하고, won에는 s를 붙이지 않아요.",
      },
    },
    {
      title: '큰 수 읽기: thousand',
      body: "물건값을 말하려면 큰 수를 영어로 읽어야 해요. 1,000은 **one thousand** 예요.\n\n| 수 | 영어 |\n|---|---|\n| 1,000 | one thousand |\n| 9,000 | nine thousand |\n| 15,000 | fifteen thousand |\n| 20,000 | twenty thousand |\n| 35,000 | thirty-five thousand |\n| 50,000 | fifty thousand |\n\n쉼표(,) 앞의 수를 먼저 읽고 thousand를 붙여요. 15,000 → 15 + thousand → fifteen thousand\n\n> ⚠️ thousand에는 s를 붙이지 않아요. nine thousands (틀림) → nine thousand (맞음)\n\n> ⚠️ 15를 뜻하는 fifteen과 50을 뜻하는 fifty는 소리가 비슷해요. fifteen은 뒤의 -teen을, fifty는 앞의 fif-를 세게 읽어요.",
      easy: "영어는 '천'을 한 덩어리로 세요. 쉼표가 바로 '천'의 자리를 알려 주는 표시예요.\n\n- 9,000 → 쉼표 앞 9(nine) + 천(thousand) → nine thousand\n- 50,000 → 쉼표 앞 50(fifty) + 천(thousand) → fifty thousand\n\n쉼표 앞의 수만 영어로 읽고 thousand를 붙이면 끝이에요.",
      check: {
        type: 'choice',
        q: '**fifteen thousand** 를 수로 바르게 나타낸 것은 무엇일까요?',
        choices: ['15,000', '50,000', '1,500'],
        answer: 0,
        why: ['', 'fifty thousand와 헷갈렸어요. fifteen은 15예요.', 'thousand는 1,000이에요. 15 뒤에 thousand가 붙으면 15,000이에요.'],
        explain: 'fifteen은 15, thousand는 1,000이에요. 그래서 fifteen thousand는 15,000이에요.',
      },
    },
    {
      title: '메뉴판과 가격표 읽기',
      body: "메뉴판이나 가격표를 읽을 때는 **필요한 정보만 골라** 찾아요.\n\n**MENU**\nCheese sandwich ... 5,000 won\nChicken salad ... 6,000 won\nOrange juice ... 3,000 won\nMilk ... 2,000 won\n\n- 치즈 샌드위치는 얼마일까? → Cheese sandwich 줄을 찾으면 5,000원\n- 치즈 샌드위치와 우유를 함께 사면? → 5,000원 + 2,000원 = 7,000원\n\n> 💡 먼저 음식 이름을 찾고, 같은 줄 끝의 값을 읽어요. 두 가지를 사면 값을 더해요.",
      easy: "보물찾기와 같아요. 먼저 찾을 이름(음식 이름)을 정하고, 손가락으로 그 줄을 따라가 끝에 있는 값을 읽어요.\n\n두 가지를 사면 두 값을 더하면 돼요.",
      check: {
        type: 'short', check: 'number', unit: '원',
        q: '메뉴판을 보고 답하세요.\n\n**MENU**\nGimbap ... 3,000 won\nRamyeon ... 4,000 won\nWater ... 1,000 won\n\nRamyeon은 얼마일까요?',
        answer: '4000',
        wrong: [{ a: '3000', why: 'Gimbap 줄의 값을 읽었어요. Ramyeon 줄을 찾아 끝의 값을 읽어요.' }],
        explain: 'Ramyeon 줄 끝에 4,000 won이라고 적혀 있으니 4,000원이에요.',
      },
    },
  ],

  examples: [
    {
      q: "식당 대화를 완성해 보세요. 손님은 치킨 샐러드를 주문하려고 해요.\n\nA: What would you like?\nB: [[I'd like a chicken salad.]]",
      steps: [
        'What would you like?는 무엇을 주문할지 묻는 말이에요.',
        "주문할 때는 I'd like 뒤에 음식 이름을 붙여요.",
        '샐러드 하나이므로 a chicken salad라고 해요.',
      ],
      answer: "I'd like a chicken salad.",
    },
    {
      q: "가격표를 보고 대화를 완성해 보세요.\n\n**socks ... 4,000 won**\n\nA: How much are these socks?\nB: [[They're four thousand won.]]",
      steps: [
        "socks는 여러 개라서 are these로 물었어요. 그래서 They're로 답해요.",
        '4,000은 쉼표 앞의 four 뒤에 thousand를 붙여 four thousand로 읽어요.',
        '값 뒤에 won을 붙여요. thousand와 won에는 s를 붙이지 않아요.',
      ],
      answer: "They're four thousand won.",
    },
  ],

  terms: [
    { term: "I'd like", def: "I would like를 줄인 말로 '~ 주세요, ~으로 할게요'라는 공손한 주문의 말이에요. 예: I'd like a cheese sandwich." },
    { term: 'thousand', def: "'천(1,000)'이라는 뜻이에요. 9,000은 nine thousand, 50,000은 fifty thousand예요. thousand에는 s를 붙이지 않아요." },
    { term: '메뉴판', def: '식당에서 파는 음식과 값을 적어 둔 판이에요. 영어로 menu라고 해요.' },
    { term: '가격표', def: '물건값을 적어 둔 표예요. 영어로 price tag라고 해요.' },
    { term: '점원', def: "가게나 식당에서 손님을 돕는 사람이에요. Can I help you?, What would you like?는 점원이 자주 하는 말이에요." },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: What would you like?\nB: [[I'd like a cheese sandwich.]]",
      choices: ["I'd like a cheese sandwich.", 'I like cheese.', "I'm looking for a cap.", "It's 5,000 won."],
      answer: 0,
      why: ['', "'나는 치즈를 좋아해요'라는 뜻이에요. 주문할 때는 I'd like를 써요.", '가게에서 찾는 물건을 말하는 말이에요. 식당에서 주문을 받는 중이에요.', '값을 말하는 말이에요. 무엇을 주문할지 물었어요.'],
      explain: "What would you like?에는 I'd like 뒤에 음식 이름을 붙여 답해요.",
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Do you want some milk?\nB: [[No, thanks.]] I'm full.",
      choices: ['No, thanks.', 'Yes, please.', "Sorry, you can't.", 'Here you are.'],
      answer: 0,
      why: ['', "'네, 주세요'라는 뜻이에요. 뒤에서 배가 부르다(I'm full)고 했으니 사양해야 어울려요.", '허락을 구하는 말에 거절할 때 쓰는 말이에요. 권하는 음식을 사양할 때는 No, thanks.라고 해요.', '물건을 건넬 때 하는 말이에요.'],
      hint: "빈칸 뒤의 I'm full.을 먼저 읽어 보세요. '배불러요'라는 뜻이에요.",
      explain: "I'm full.은 배가 부르다는 뜻이니 사양하는 말 No, thanks.가 알맞아요.",
    },
    {
      id: 'p3', level: 1, type: 'short', concept: 4,
      q: '15,000을 영어로 읽을 때 빈칸에 알맞은 낱말을 쓰세요.\n\n15,000 won → [[fifteen]] thousand won',
      answer: ['fifteen'],
      wrong: [{ a: 'fifty', why: 'fifty는 50이에요. 15는 fifteen이에요.' }],
      explain: '쉼표 앞의 수 15를 영어로 읽으면 fifteen이에요. 그 뒤에 thousand를 붙여 fifteen thousand won이에요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: '여러 개의 값을 물을 때는 How much are these?라고 해요.',
      answer: true,
      explain: "여러 개일 때는 How much are these?라고 묻고 They're ○○ won.으로 답해요. 하나일 때는 How much is it?이에요.",
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: "**I'm looking for a cap.** 의 뜻으로 알맞은 것은 무엇일까요?",
      choices: ['모자를 찾고 있어요.', '모자를 보고 있어요.', '모자를 좋아해요.', '모자는 얼마예요?'],
      answer: 0,
      why: ['', "look만 보면 '보다'지만, look for는 '찾다'라는 뜻이에요.", "좋아한다는 말은 I like a cap.처럼 like를 써요.", '값을 물을 때는 How much is it?이라고 해요.'],
      explain: "look for는 '찾다'라는 뜻이에요. I'm looking for a cap.은 '모자를 찾고 있어요'예요.",
    },
    {
      id: 'p6', level: 1, type: 'order', concept: 0,
      q: "'치즈 샌드위치 주세요.'라는 뜻이 되도록 순서대로 놓으세요.",
      choices: ['like', 'please.', "I'd", 'a cheese sandwich,'],
      answer: [2, 0, 3, 1],
      explain: "I'd like 뒤에 주문할 음식을 붙이고, 끝에 please를 붙여 공손하게 말해요. → I'd like a cheese sandwich, please.",
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', unit: '원', concept: 4,
      q: '**fifty thousand won** 은 얼마일까요? 숫자로 쓰세요.',
      answer: '50000',
      wrong: [
        { a: '15000', why: '15,000은 fifteen thousand예요. fifty는 50이에요.' },
        { a: '5000', why: '5,000은 five thousand예요. fifty는 50이에요.' },
      ],
      explain: 'fifty는 50, thousand는 1,000이에요. 그래서 fifty thousand won은 50,000원이에요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: '가격표를 보고 대화의 빈칸에 알맞은 말을 고르세요.\n\n**gloves ... 4,000 won**\n\nA: How much are these gloves?\nB: [[They\'re four thousand won.]]',
      choices: ["They're four thousand won.", "It's four thousand won.", "They're four thousands won.", "They're forty thousand won."],
      answer: 0,
      why: [
        '',
        "are these로 물었으니 여러 개예요. It's가 아니라 They're로 답해요.",
        'thousand에는 s를 붙이지 않아요.',
        'forty thousand는 40,000이에요. 4,000은 four thousand예요.',
      ],
      hint: '하나인지 여러 개인지, 그리고 4,000을 어떻게 읽는지 확인하세요.',
      explain: "장갑은 여러 개라서 They're로 답하고, 4,000은 four thousand로 읽어요. → They're four thousand won.",
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '원', concept: 5,
      q: '메뉴판을 보고 답하세요.\n\n**MENU**\nCheese sandwich ... 5,000 won\nChicken salad ... 6,000 won\nOrange juice ... 3,000 won\nMilk ... 2,000 won\n\n지아가 이렇게 주문했어요.\n"I\'d like a cheese sandwich and an orange juice."\n\n지아가 낼 돈은 모두 얼마일까요?',
      answer: '8000',
      wrong: [
        { a: '5000', why: '치즈 샌드위치 값만 셌어요. 오렌지 주스 값도 더해요.' },
        { a: '3000', why: '오렌지 주스 값만 셌어요. 치즈 샌드위치 값도 더해요.' },
      ],
      hint: '주문한 음식 두 가지를 메뉴판에서 찾아 값을 더해요.',
      explain: '치즈 샌드위치(Cheese sandwich) 5,000원과 오렌지 주스(Orange juice) 3,000원을 더하면 5,000 + 3,000 = 8,000원이에요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 5,
      q: "가격표를 보고 대화의 빈칸에 알맞은 말을 고르세요.\n\n**PRICE TAGS**\ncap ... 12,000 won\nT-shirt ... 15,000 won\nsneakers ... 50,000 won\nsocks ... 3,000 won\n\nA: How much is the T-shirt?\nB: It's [[fifteen thousand won]].",
      choices: ['fifteen thousand won', 'fifty thousand won', 'twelve thousand won', 'fifteen hundred won'],
      answer: 0,
      why: [
        '',
        '50,000원은 운동화(sneakers)의 값이에요. 티셔츠는 15,000원이에요.',
        '12,000원은 모자(cap)의 값이에요. T-shirt 줄을 다시 보세요.',
        'hundred는 100이라서 fifteen hundred는 1,500이에요. 15,000은 fifteen thousand예요.',
      ],
      hint: 'T-shirt 줄을 찾아 값을 읽고, 그 수를 영어로 바꾸세요.',
      explain: 'T-shirt는 15,000원이에요. 쉼표 앞의 15(fifteen) 뒤에 thousand를 붙여 fifteen thousand won이라고 해요.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: "대화의 빈칸에 알맞은 말은 무엇일까요?\n\nA: Can I help you?\nB: Yes, please. [[I'm looking for a bag.]]\nA: How about this one? It's 10,000 won.",
      choices: ["I'm looking for a bag.", 'No, thanks.', "It's 10,000 won.", 'Do you want some juice?'],
      answer: 0,
      why: [
        '',
        'Yes, please.로 도움을 받겠다고 해 놓고 No, thanks.라고 하면 어색해요.',
        '값은 점원이 알려 주는 말이에요. 손님은 찾는 물건을 말해야 해요.',
        '음식을 권하는 말이에요. 가게에서 찾는 물건을 말해야 해요.',
      ],
      hint: "점원이 How about this one?으로 무언가를 보여 준다는 것에 주목하세요. '이건 어때요?'라는 뜻이에요.",
      explain: "점원이 How about this one?으로 물건을 보여 주었으니, 그 앞에서 손님은 찾는 물건을 말했어야 해요. → I'm looking for a bag.",
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 1,
      q: "Do you want some juice?에 사양할 때는 **No, thank.** 라고 답해요.",
      answer: false,
      explain: 'thanks의 s를 빠뜨렸어요. 사양할 때는 No, thanks.라고 해요. (No, thank you.라고 해도 돼요.)',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '원', concept: 5,
      q: '메뉴판을 보고 답하세요.\n\n**MENU**\nCheese sandwich ... 5,000 won\nChicken salad ... 6,000 won\nOrange juice ... 3,000 won\nMilk ... 2,000 won\n\n지호가 10,000원을 내고 이렇게 주문했어요.\n"I\'d like a chicken salad and an orange juice."\n\n지호가 돌려받을 돈은 얼마일까요?',
      answer: '1000',
      wrong: [
        { a: '9000', why: '주문한 음식의 값을 구했어요. 낸 돈 10,000원에서 그 값을 빼야 해요.' },
        { a: '4000', why: '치킨 샐러드 값만 뺐어요. 오렌지 주스 값도 빼야 해요.' },
      ],
      hint: '먼저 주문한 두 가지의 값을 더하고, 낸 돈에서 빼요.',
      explain: '치킨 샐러드 6,000원 + 오렌지 주스 3,000원 = 9,000원이에요. 10,000원을 냈으니 10,000 − 9,000 = 1,000원을 돌려받아요.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '가격표의 물건 가운데 **가장 비싼** 것은 무엇일까요?\n\ncap: fifteen thousand won\nbag: fifty thousand won\nT-shirt: nineteen thousand won\nshoes: forty-five thousand won',
      choices: ['bag', 'shoes', 'T-shirt', 'cap'],
      answer: 0,
      why: [
        '',
        'forty-five thousand는 45,000이에요. 50,000보다 작아요.',
        'nineteen thousand는 19,000이에요.',
        'fifteen thousand는 15,000이에요. fifty와 헷갈리지 않게 조심해요.',
      ],
      hint: '먼저 값을 모두 수로 바꿔 보세요.',
      explain: '모자 15,000원, 가방 50,000원, 티셔츠 19,000원, 신발 45,000원이에요. 가장 비싼 것은 가방(bag)이에요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: '**어색한** 대화를 고르세요.',
      choices: [
        "A: How much are these gloves? / B: It's 8,000 won.",
        "A: How much is this cap? / B: It's 12,000 won.",
        "A: What would you like? / B: I'd like a hot dog, please.",
        'A: Do you want some water? / B: Yes, please.',
      ],
      answer: 0,
      why: ['', '자연스러운 대화예요. 모자 하나를 It\'s로 답했어요.', "자연스러운 대화예요. I'd like로 주문했어요.", '자연스러운 대화예요. 권하는 물을 받겠다고 했어요.'],
      hint: '물을 때 is와 are 가운데 무엇을 썼는지 보세요.',
      explain: "are these로 여러 개의 값을 물었으니 They're 8,000 won.으로 답해야 해요.",
    },
    {
      id: 'a4', level: 3, type: 'order', concept: 2,
      q: '가게에서 나눈 대화예요. 자연스러운 순서대로 놓으세요.',
      choices: ["It's 9,000 won.", 'How about this blue one?', 'Can I help you?', 'I like it. How much is it?', "Yes, please. I'm looking for a cap."],
      answer: [2, 4, 1, 3, 0],
      hint: '점원이 먼저 말을 걸어요.',
      explain: '점원이 Can I help you?로 말을 걸고 → 손님이 찾는 물건(모자)을 말하고 → 점원이 파란 모자를 권하고 → 손님이 마음에 든다며 값을 묻고 → 점원이 값을 알려 줘요.',
    },
  ],

  deeper: [
    {
      title: '영어는 천 단위, 우리말은 만 단위',
      body: "우리말은 일, 십, 백, 천 다음에 **만**이 있어요. 그런데 영어에는 '만'을 뜻하는 낱말이 따로 없어요. 영어는 천을 뜻하는 thousand를 한 덩어리로 세요.\n\n| 수 | 우리말 | 영어 |\n|---|---|---|\n| 10,000 | 만 | ten thousand |\n| 50,000 | 오만 | fifty thousand |\n| 100,000 | 십만 | one hundred thousand |\n| 1,000,000 | 백만 | one million |\n\n수에 쉼표를 세 자리마다 찍는 것도 영어의 읽는 법과 맞아요. 오른쪽부터 세어 첫 번째 쉼표 앞은 thousand, 두 번째 쉼표 앞은 million이에요. 그래서 큰 수를 영어로 읽을 때는 쉼표를 보고 끊어 읽으면 쉬워요.",
    },
  ],

  faq: [
    {
      q: "I'd like랑 I like는 뭐가 달라요?",
      a: "I like ~는 '나는 ~을 좋아해요'라는 뜻이에요. I'd like ~는 I would like ~를 줄인 말로 '~ 주세요, ~을 하고 싶어요'라는 공손한 말이에요. 식당에서 주문할 때는 I'd like를 써요.",
    },
    {
      q: 'won에는 왜 s를 안 붙여요?',
      a: '우리나라 돈의 단위 won은 영어에서도 하나든 여러 개든 모양이 같아요. 그래서 15,000 won처럼 써요. 미국 돈 dollar는 two dollars처럼 s를 붙이니 헷갈리지 않게 따로 기억해요.',
    },
    {
      q: 'fifteen이랑 fifty가 자꾸 헷갈려요.',
      a: 'fifteen은 15, fifty는 50이에요. 끝이 -teen이면 13~19, -ty면 20, 30, 40처럼 몇십이에요. 말할 때는 fifteen은 뒤를, fifty는 앞을 세게 읽어요.',
    },
  ],

  mistakes: [
    "주문할 때 I like a sandwich.라고 하는 실수 → I'd like a sandwich. (I like는 '좋아해요'라는 뜻이에요.)",
    'thousand에 s를 붙이는 실수: nine thousands won → nine thousand won',
    '15를 뜻하는 fifteen과 50을 뜻하는 fifty를 헷갈리는 실수 — 15,000은 fifteen thousand, 50,000은 fifty thousand예요.',
  ],

  gens: [
    {
      id: 'read-price',
      level: 1,
      title: '값을 영어로 읽기 (thousand)',
      make: function (R) {
        var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        function w(n) {
          if (n < 10) return ones[n];
          if (n < 20) return teens[n - 10];
          var t = Math.floor(n / 10);
          var o = n % 10;
          return tens[t] + (o ? '-' + ones[o] : '');
        }
        var MIX = 'fifteen처럼 -teen으로 끝나는 수(13~19)와 fifty처럼 -ty로 끝나는 수(20, 30, 40 …)를 헷갈렸어요.';
        // 절반은 1~20과 몇십(쉬운 수), 절반은 21~99
        var k = R.bool(0.5) ? R.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 70, 80, 90]) : R.int(21, 99);
        var correct = w(k) + ' thousand won';
        var cands = [];
        if (k >= 13 && k <= 19) cands.push([tens[k - 10] + ' thousand won', MIX]);
        if (k >= 30 && k % 10 === 0) cands.push([teens[k / 10] + ' thousand won', MIX]);
        var t = Math.floor(k / 10);
        var o = k % 10;
        if (t >= 2 && o >= 2 && o !== t) cands.push([w(o * 10 + t) + ' thousand won', '십의 자리 수와 일의 자리 수를 바꿔 읽었어요.']);
        cands.push([w(k) + ' thousands won', 'thousand에는 s를 붙이지 않아요.']);
        cands.push([w(k) + ' hundred won', 'hundred는 100이에요. 쉼표 앞의 수에는 1,000을 뜻하는 thousand를 붙여요.']);
        cands.push([w(k < 99 ? k + 1 : k - 1) + ' thousand won', '수를 하나 잘못 읽었어요. 쉼표 앞의 수를 다시 확인해요.']);
        var reason = {};
        cands.forEach(function (c) { if (!(c[0] in reason)) reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 4,
          q: '**' + R.fmt.num(k * 1000) + ' won** 을 영어로 바르게 읽은 것은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '쉼표 앞의 수 ' + k + R.josa(k, '을/를') + ' 영어로 읽으면 ' + w(k) + ', 그 뒤에 thousand를 붙여요. → ' + correct + ' (thousand와 won에는 s를 붙이지 않아요.)',
        };
      },
    },
    {
      id: 'words-to-number',
      level: 2,
      title: '영어로 읽은 값을 수로 쓰기',
      make: function (R) {
        var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        function w(n) {
          if (n < 10) return ones[n];
          if (n < 20) return teens[n - 10];
          var t = Math.floor(n / 10);
          var o = n % 10;
          return tens[t] + (o ? '-' + ones[o] : '');
        }
        var MIX = 'fifteen처럼 -teen으로 끝나는 수(13~19)와 fifty처럼 -ty로 끝나는 수(20, 30, 40 …)를 헷갈렸어요.';
        var k = R.int(1, 99);
        var wrong = [];
        if (k >= 13 && k <= 19) wrong.push({ a: String((k - 10) * 10000), why: MIX });
        if (k >= 30 && k % 10 === 0) wrong.push({ a: String((k / 10 + 10) * 1000), why: MIX });
        wrong.push({ a: String(k * 100), why: '100을 뜻하는 hundred로 계산했어요. thousand는 1,000이에요.' });
        return {
          type: 'short', check: 'number', unit: '원', concept: 4,
          q: '**' + w(k) + ' thousand won** 은 얼마일까요? 숫자로 쓰세요.',
          answer: String(k * 1000),
          wrong: wrong,
          explain: w(k) + ' → ' + k + ', thousand → 1,000이니까 ' + k + ' × 1,000 = ' + R.fmt.num(k * 1000) + '원이에요.',
        };
      },
    },
    {
      id: 'menu-total',
      level: 2,
      title: '메뉴판을 읽고 두 가지 값 더하기',
      make: function (R) {
        var items = [
          ['Cheese sandwich', '치즈 샌드위치', 5000], ['Chicken salad', '치킨 샐러드', 6000], ['Hot dog', '핫도그', 3000],
          ['Gimbap', '김밥', 4000], ['Fried rice', '볶음밥', 7000], ['Spaghetti', '스파게티', 8000],
          ['Orange juice', '오렌지 주스', 3000], ['Milk', '우유', 2000], ['Water', '물', 1000],
          ['Ice cream', '아이스크림', 2000], ['Lemonade', '레모네이드', 3000],
        ];
        var menu = R.sample(items, 5);
        var two = R.sample(menu, 2);
        var a = two[0];
        var b = two[1];
        var name = R.pick(['민수', '지아', '서준', '하윤', '도윤', '수아']);
        var total = a[2] + b[2];
        var wrong = [{ a: String(a[2]), why: a[1] + '의 값만 셌어요. ' + b[1] + '의 값도 더해요.' }];
        if (b[2] !== a[2]) wrong.push({ a: String(b[2]), why: b[1] + '의 값만 셌어요. ' + a[1] + '의 값도 더해요.' });
        var lines = menu.map(function (m) { return m[0] + ' ... ' + R.fmt.num(m[2]) + ' won'; }).join('\n');
        return {
          type: 'short', check: 'number', unit: '원', concept: 5,
          q: '메뉴판을 보고 답하세요.\n\n**MENU**\n' + lines + '\n\n' + name + R.josa(name, '은/는') + ' ' + a[1] + R.josa(a[1], '과/와') + ' ' + b[1] + R.josa(b[1], '을/를') + ' 주문했어요. 모두 얼마일까요?',
          answer: String(total),
          wrong: wrong,
          explain: a[0] + ' 줄에서 ' + R.fmt.num(a[2]) + '원, ' + b[0] + ' 줄에서 ' + R.fmt.num(b[2]) + '원을 찾아요. ' + R.fmt.num(a[2]) + ' + ' + R.fmt.num(b[2]) + ' = ' + R.fmt.num(total) + '원이에요.',
        };
      },
    },
  ],

  vocab: [
    { w: 'menu', m: '메뉴, 메뉴판', ex: 'Can I see the menu, please?', exm: '메뉴판을 볼 수 있을까요?' },
    { w: 'order', m: '주문하다', ex: 'Are you ready to order?', exm: '주문하시겠어요?' },
    { w: 'sandwich', m: '샌드위치', ex: "I'd like a cheese sandwich.", exm: '치즈 샌드위치 주세요.' },
    { w: 'salad', m: '샐러드', ex: 'This chicken salad is fresh.', exm: '이 치킨 샐러드는 신선해요.' },
    { w: 'juice', m: '주스', ex: 'Do you want some juice?', exm: '주스 좀 마실래요?' },
    { w: 'want', m: '원하다', ex: 'Do you want some water?', exm: '물 좀 마실래요?' },
    { w: 'full', m: '배부른', ex: "No, thanks. I'm full.", exm: '아니요, 괜찮아요. 배불러요.' },
    { w: 'look for', m: '~을 찾다', ex: "I'm looking for a cap.", exm: '나는 모자를 찾고 있어요.' },
    { w: 'how much', m: '(값이) 얼마', ex: 'How much is this cap?', exm: '이 모자는 얼마예요?' },
    { w: 'price', m: '값, 가격', ex: 'The price is 9,000 won.', exm: '값은 9,000원이에요.' },
    { w: 'thousand', m: '천(1,000)', ex: "It's nine thousand won.", exm: '9,000원이에요.' },
    { w: 'fifteen', m: '15, 열다섯', ex: "They're fifteen thousand won.", exm: '15,000원이에요.' },
    { w: 'fifty', m: '50, 쉰', ex: 'These sneakers are fifty thousand won.', exm: '이 운동화는 50,000원이에요.' },
    { w: 'expensive', m: '비싼', ex: 'This bag is too expensive.', exm: '이 가방은 너무 비싸요.' },
    { w: 'cheap', m: '싼', ex: 'These socks are cheap.', exm: '이 양말은 싸요.' },
  ],
});
