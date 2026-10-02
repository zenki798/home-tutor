/* 공통영어2 · 가정법 심화
 * 예문·지문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 짧은 글 (직접 쓴 글, 가상의 인물)
  var MOVE = "Last spring, Seojun's family had a chance to move to a small town by the sea, but they decided to stay in the city. Now Seojun sometimes imagines a different life. \"If we had moved there, I would be able to swim in the sea every summer,\" he says. \"But I would never have met my best friend, Doyun.\" Seojun smiles. Without Doyun, his school life would be much less fun.";

Tutor.registerUnit({
  id: 'eng-h-c2-03',
  course: 'eng-h-c2',
  title: '가정법 심화',
  summary: '가정법 과거완료·혼합 가정법·I wish·as if 등으로 사실과 다르거나 일어나기 어려운 상황을 표현합니다.',
  goals: [
    '가정법 과거와 가정법 과거완료를 구별하고, 현재·과거 사실과 반대되는 상황을 표현할 수 있다.',
    '혼합 가정법으로 과거의 일이 지금에 미치는 결과를 가정할 수 있다.',
    'I wish·as if·Without(But for) 가정법과 if를 생략한 도치 가정법을 바르게 쓰고 해석할 수 있다.',
    'If + should, If + were to로 일어날 가능성이 낮은 일을 가정할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '가정법 과거와 가정법 과거완료',
      body: '**가정법**은 사실과 반대되거나 일어나기 어려운 일을 상상할 때 씁니다. 사실보다 **시제를 한 단계 과거로** 당겨 쓰는 것이 핵심입니다.\n\n' +
        '| 종류 | 형태 | 뜻 |\n|---|---|---|\n' +
        '| **가정법 과거** | If + 주어 + **과거형**(be는 were), 주어 + would(could, might) + **동사원형** | **현재** 사실과 반대: ~라면 …할 텐데 |\n' +
        '| **가정법 과거완료** | If + 주어 + **had p.p.**, 주어 + would(could, might) + **have p.p.** | **과거** 사실과 반대: ~였다면 …했을 텐데 |\n\n' +
        '- If I **had** a car, I **could drive** you home. = As I don\'t have a car, I can\'t drive you home. (지금 차가 없다)\n' +
        '- If I **had had** a car, I **could have driven** you home. = As I didn\'t have a car, I couldn\'t drive you home. (그때 차가 없었다)\n\n' +
        '> 💡 가정법 과거에서 be동사는 주어와 상관없이 **were**를 쓰는 것이 원칙입니다. If I **were** you, I would take the offer. 일상 대화에서는 was도 들리지만, 글과 시험에서는 were를 씁니다.\n\n' +
        '> ⚠️ 이름은 "과거"지만 가정법 과거는 **현재**의 일입니다. 이름이 아니라 **뜻하는 때**를 기억하십시오.',
      easy: '가정법은 "현실에서 한 걸음 물러나 상상하는 말"입니다. 영어는 그 한 걸음을 **시제를 한 칸 뒤로** 미루는 것으로 나타냅니다.\n\n' +
        '- 지금 사실(have)을 상상으로 바꾸면 한 칸 뒤 → had\n' +
        '- 과거 사실(had)을 상상으로 바꾸면 한 칸 더 뒤 → had had\n\n' +
        '우리말에서도 "돈이 있으면 산다"보다 "돈이 있었으면 샀을 텐데"가 더 멀고 아쉽게 들리는 것과 비슷합니다.',
      check: {
        type: 'choice',
        q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\nIf I had known your address, I would have sent you a card.',
        choices: ['네 주소를 몰라서 카드를 보내지 못했다.', '네 주소를 몰라서 카드를 보낼 수 없다.', '네 주소를 알아서 카드를 보냈다.'],
        answer: 0,
        why: ['', '현재 사실과 반대인 가정법 과거(If I knew ~, I would send ~)의 뜻입니다. had known은 과거의 일입니다.', '가정법은 사실과 반대를 말합니다. 실제로는 주소를 몰랐고 카드도 보내지 않았습니다.'],
        explain: 'If + had p.p., would have p.p.는 **가정법 과거완료**로, 과거 사실과 반대입니다. 실제로는 주소를 **몰라서** 카드를 **보내지 못했습니다**.',
      },
    },
    {
      title: '혼합 가정법: 과거의 일이 지금에 미치는 결과',
      body: '과거에 일어난(또는 일어나지 않은) 일 때문에 **지금** 어떤 결과가 있을 때는, if절과 주절의 때가 서로 다릅니다. 이것을 **혼합 가정법**이라고 합니다.\n\n' +
        '**If + 주어 + had p.p.(과거 사실 반대), 주어 + would(could) + 동사원형(현재 사실 반대) + now(today)**\n\n' +
        '- If I **had taken** your advice then, I **would be** happier **now**. (그때 네 충고를 따랐다면 지금 더 행복할 텐데.)\n' +
        '  = As I didn\'t take your advice then, I am not happier now.\n' +
        '- If she **hadn\'t missed** the flight, she **would be** in Jeju **now**.\n\n' +
        '| 부분 | 때 | 형태 |\n|---|---|---|\n| if절 | 과거 | had p.p. |\n| 주절 | 현재 | would + 동사원형 |\n\n' +
        '> 💡 주절의 **now, today, still** 같은 말이 혼합 가정법의 단서입니다. 그래서 주절에 would have p.p.가 아니라 would + 동사원형을 씁니다.',
      easy: '혼합 가정법은 "그때 그랬더라면 → 지금 이럴 텐데"라는 **두 장면**을 이어 붙인 말입니다.\n\n' +
        '어제 일찍 잤더라면(어제 장면 → had p.p.) 지금 졸리지 않을 텐데(지금 장면 → would + 동사원형). 장면마다 맞는 가정법을 따로 쓴다고 생각하면 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nIf I had slept enough last night, I [[빈칸]] so tired now.',
        choices: ["wouldn't be", "wouldn't have been", "won't be"],
        answer: 0,
        why: ['', 'now가 있으므로 주절은 현재 사실과 반대입니다. would have p.p.는 과거의 결과에 씁니다.', '가정법 주절에는 will이 아니라 would를 씁니다.'],
        explain: 'if절은 과거(last night → had slept), 주절은 현재(now)이므로 혼합 가정법 **wouldn\'t be**를 씁니다. (어젯밤 충분히 잤다면 지금 이렇게 피곤하지 않을 텐데.)',
      },
    },
    {
      title: 'I wish와 as if 가정법',
      body: '**I wish** 뒤에 가정법을 쓰면 이루기 어려운 소망이나 아쉬움을, **as if(as though)** 뒤에 쓰면 "마치 ~인 것처럼"이라는 사실과 반대되는 비유를 나타냅니다.\n\n' +
        '| 형태 | 뜻 | 예 |\n|---|---|---|\n' +
        '| I wish + **과거형** | 지금 ~라면 좋을 텐데 | I wish I **were** taller. (실제로는 키가 크지 않다) |\n' +
        '| I wish + **had p.p.** | 그때 ~했더라면 좋았을 텐데 | I wish I **had studied** harder. (실제로는 열심히 하지 않았다) |\n' +
        '| as if + **과거형** | 마치 ~인 것처럼 (주절과 **같은 때**) | He talks **as if** he **were** a doctor. (실제로는 의사가 아니다) |\n' +
        '| as if + **had p.p.** | 마치 ~였던 것처럼 (주절보다 **앞선 때**) | She looks **as if** she **had seen** a ghost. (마치 유령을 본 것처럼) |\n\n' +
        '주절이 과거여도 기준은 같습니다. He **talked** as if he **were** a doctor.(말하던 그때 의사인 것처럼) / He **talked** as if he **had been** to Paris.(말하던 때보다 앞서 파리에 가 본 것처럼)\n\n' +
        '> 💡 as if 뒤의 내용이 사실일 수도 있을 때는 보통 시제를 씁니다. It looks **as if** it **is** going to rain. (정말 비가 올 것 같다)',
      easy: 'I wish는 "소원 빌기"입니다. 소원은 현실과 다르기 때문에 빌지요. 그래서 시제를 한 칸 뒤로 미룹니다: 지금 소원이면 과거형, 지나간 일에 대한 소원(후회)이면 had p.p.\n\n' +
        'as if는 "연기하기"입니다. 의사가 아닌 사람이 의사처럼 말하는 것은 연기이니, 이것도 현실과 다르다는 표시로 시제를 한 칸 미룹니다.',
      check: {
        type: 'ox',
        q: '"I wish I had a bigger room."은 말하는 사람이 지금 큰 방을 가지고 있다는 뜻입니다.',
        answer: false,
        explain: 'I wish + 과거형은 **지금** 이루기 어려운 소망입니다. 실제로는 큰 방이 **없어서** "더 큰 방이 있으면 좋을 텐데"라고 말하는 것입니다.',
      },
    },
    {
      title: 'Without·But for·If it were not for: ~이 없다면/없었다면',
      body: '"~이 없다면", "~이 없었다면"은 if절 대신 짧은 말로 나타낼 수 있습니다. 주절의 형태를 보고 현재인지 과거인지 판단합니다.\n\n' +
        '| 때 | 표현 | 주절 |\n|---|---|---|\n' +
        '| 현재 (~이 없다면) | **Without** ~ = **But for** ~ = **If it were not for** ~ | would + 동사원형 |\n' +
        '| 과거 (~이 없었다면) | **Without** ~ = **But for** ~ = **If it had not been for** ~ | would have + p.p. |\n\n' +
        '- **Without** water, nothing **could live** on Earth. = **If it were not for** water, nothing could live on Earth.\n' +
        '- **But for** your help, I **would have failed**. = **If it had not been for** your help, I would have failed.\n\n' +
        'Without과 But for는 현재·과거 어느 쪽에도 쓰므로, 때는 **주절의 동사**로 알아봅니다.\n\n' +
        '> 💡 if를 생략한 꼴도 자주 씁니다: **Were it not for** ~ (= If it were not for ~), **Had it not been for** ~ (= If it had not been for ~)',
      easy: '물이 없는 세상, 친구의 도움이 없었던 날을 상상해 보는 말입니다. "If it were not for"는 길어서, 짧게 **Without** 한 낱말로 바꿔 말하는 일이 많습니다.\n\n' +
        'Without만 보고는 지금 이야기인지 옛날 이야기인지 모릅니다. 뒤에 would + 동사원형이 오면 지금, would have p.p.가 오면 과거입니다.',
      check: {
        type: 'choice',
        q: '다음 문장과 뜻이 같은 것은 무엇입니까?\n\nWithout your advice, I would have made a big mistake.',
        choices: [
          'If it had not been for your advice, I would have made a big mistake.',
          'If it were not for your advice, I would have made a big mistake.',
          'With your advice, I would have made a big mistake.',
        ],
        answer: 0,
        why: ['', '주절이 would have p.p.(과거)이므로 if절도 과거 사실 반대인 If it had not been for를 씁니다.', 'With는 "~이 있다면"이라는 반대 뜻입니다.'],
        explain: '주절이 **would have made**(과거 사실 반대)이므로 Without은 **If it had not been for**와 같습니다. (네 충고가 없었다면 나는 큰 실수를 했을 것이다.)',
      },
    },
    {
      title: 'if를 생략한 가정법: Were I ~, Had I ~, Should you ~',
      body: '가정법의 if절에서 **if를 생략**하면 **(조)동사가 주어 앞으로** 나옵니다. 주로 were, had, should가 있는 if절에서 일어나며, 격식 있는 글에서 자주 보입니다.\n\n' +
        '| if가 있는 문장 | if를 생략한 문장 |\n|---|---|\n' +
        '| **If I were** you, I would accept it. | **Were I** you, I would accept it. |\n' +
        '| **If I had known** the truth, I would have told you. | **Had I known** the truth, I would have told you. |\n' +
        '| **If you should need** help, call me. | **Should you need** help, call me. |\n' +
        '| **If it had not been for** the map, we would have gotten lost. | **Had it not been for** the map, we would have gotten lost. |\n\n' +
        '> ⚠️ if를 생략하지 않았는데 어순을 바꾸거나(If had I known ×), if를 생략했는데 어순을 그대로 두면(I had known the truth, I would ~ ×) 틀립니다. if와 도치는 **둘 중 하나만** 씁니다.\n\n' +
        '> 💡 Had I known ~은 의문문처럼 보이지만 물음표가 없고 뒤에 쉼표와 주절이 따라옵니다. 그 모양을 보면 "if가 숨은 가정법"임을 알 수 있습니다.',
      easy: 'if는 "지금부터 상상이야!"라는 표지판입니다. 표지판을 떼어 내는 대신, 동사를 맨 앞으로 끌어내어 "이건 보통 문장이 아니야"라고 알려 주는 것이 도치입니다.\n\n' +
        'Had I known … 을 읽으면 머릿속에서 If I had known … 으로 되돌려 보십시오. 그러면 뜻이 바로 보입니다.',
      check: {
        type: 'choice',
        q: 'If I had left home earlier, I would have caught the bus.에서 if를 생략해 바르게 바꾼 것은 무엇입니까?',
        choices: [
          'Had I left home earlier, I would have caught the bus.',
          'I had left home earlier, I would have caught the bus.',
          'If had I left home earlier, I would have caught the bus.',
        ],
        answer: 0,
        why: ['', 'if를 생략하면 had를 주어 앞으로 옮겨야 합니다. 어순을 그대로 두면 가정의 뜻이 사라집니다.', 'if를 남겨 둔 채 도치하지 않습니다. if를 생략할 때만 had가 주어 앞으로 나옵니다.'],
        explain: 'if를 생략하고 had를 주어 앞으로: **Had I left** home earlier, I would have caught the bus. (집에서 더 일찍 나섰다면 버스를 탔을 텐데.)',
      },
    },
    {
      title: '가능성이 낮은 일 가정하기: If + should, If + were to',
      body: '앞으로 일어날 가능성이 낮은 일을 가정할 때는 **should**나 **were to**를 if절에 씁니다.\n\n' +
        '| 형태 | 뜻 | 주절 |\n|---|---|---|\n' +
        '| If + 주어 + **should** + 동사원형 | **혹시라도** ~한다면 (일어날 수는 있지만 가능성이 낮음) | will·would, 명령문 모두 가능 |\n' +
        '| If + 주어 + **were to** + 동사원형 | **만약** ~한다면 (거의 일어나지 않거나 순전한 상상) | would(could, might) + 동사원형 |\n\n' +
        '- If it **should rain** tomorrow, the festival **will be** held indoors. (혹시라도 내일 비가 오면 축제는 실내에서 열린다.)\n' +
        '- If you **should have** any questions, please **ask** me. (혹시라도 질문이 있으면 물어보십시오.)\n' +
        '- If the sun **were to rise** in the west, I **would** never **change** my mind. (해가 서쪽에서 뜬다 해도 내 마음은 바뀌지 않을 것이다.)\n' +
        '- If you **were to win** the lottery, what **would** you **do**?\n\n' +
        '> 💡 should는 "혹시라도"라는 조심스러운 가능성이라 안내문·공지에 자주 나옵니다. were to는 "말도 안 되지만 만약"이라는 상상에 어울립니다.',
      easy: '일기 예보에서 비 올 확률이 10%라면 "**혹시** 비가 오면 실내에서 해요"(should)라고 말합니다. 그럴 수도 있으니 대비하는 말이지요.\n\n' +
        '반면 "해가 서쪽에서 뜬다면"은 확률 0%에 가까운 상상입니다. 이럴 때 were to를 씁니다. 그래서 were to 뒤의 주절은 늘 would 같은 상상의 말이 됩니다.',
      check: {
        type: 'choice',
        q: '안내문의 빈칸에 알맞은 것은 무엇입니까?\n\nIf you [[빈칸]] find a lost item in the library, please take it to the front desk.',
        choices: ['should', 'had', 'would'],
        answer: 0,
        why: ['', 'had 뒤에는 p.p.가 와야 하고, had found로 쓰면 과거 사실 반대가 되어 안내문과 맞지 않습니다.', 'if절에는 보통 would를 쓰지 않습니다. "혹시라도 ~하면"은 should를 씁니다.'],
        explain: '"혹시라도 분실물을 발견하면"처럼 가능성이 낮은 일을 가정하고 주절이 명령문이므로 **should**를 씁니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장을 가정법으로 바꾸십시오.\n\nAs I didn\'t wear a coat, I caught a cold.',
      steps: [
        '사실은 과거의 일입니다(didn\'t wear, caught). 과거 사실과 반대이므로 가정법 과거완료를 씁니다.',
        '부정은 긍정으로, 긍정은 부정으로 바꿉니다: 코트를 입지 않았다 → 입었다면, 감기에 걸렸다 → 걸리지 않았을 텐데.',
        'if절: If I had worn a coat / 주절: I wouldn\'t have caught a cold.',
      ],
      answer: "If I had worn a coat, I wouldn't have caught a cold. (코트를 입었더라면 감기에 걸리지 않았을 텐데.)",
    },
    {
      q: '다음 문장을 혼합 가정법으로 바꾸십시오.\n\nI didn\'t learn to swim as a child, so I can\'t swim now.',
      steps: [
        '앞부분은 과거(as a child), 뒷부분은 현재(now)입니다. 때가 섞였으므로 혼합 가정법입니다.',
        '과거 사실 반대 if절: If I had learned to swim as a child',
        '현재 사실 반대 주절: I could swim now',
      ],
      answer: 'If I had learned to swim as a child, I could swim now. (어렸을 때 수영을 배웠다면 지금 수영을 할 수 있을 텐데.)',
    },
    {
      q: 'if를 생략한 문장으로 바꾸십시오.\n\nIf it were not for the internet, our lives would be very different.',
      steps: [
        'if절의 동사 were를 주어 it 앞으로 옮기고 if를 지웁니다.',
        'If it were not for → Were it not for',
        '주절은 그대로 둡니다.',
      ],
      answer: 'Were it not for the internet, our lives would be very different. (인터넷이 없다면 우리의 삶은 매우 다를 것이다.)',
    },
  ],

  terms: [
    { term: '가정법 과거', def: 'If + 주어 + 과거형, 주어 + would + 동사원형 꼴로 현재 사실과 반대되는 일을 상상합니다. 예: If I were you, I would wait.' },
    { term: '가정법 과거완료', def: 'If + 주어 + had p.p., 주어 + would have p.p. 꼴로 과거 사실과 반대되는 일을 상상합니다. 예: If I had known, I would have helped.' },
    { term: '혼합 가정법', def: 'if절은 과거 사실 반대(had p.p.), 주절은 현재 사실 반대(would + 동사원형)인 가정법입니다. 주절에 now가 자주 옵니다.' },
    { term: 'I wish 가정법', def: 'I wish + 과거형(지금에 대한 소망), I wish + had p.p.(과거에 대한 아쉬움)으로 이루기 어려운 바람을 나타냅니다.' },
    { term: 'as if 가정법', def: '"마치 ~인 것처럼"이라는 뜻으로, 주절과 같은 때면 과거형, 주절보다 앞선 때면 had p.p.를 씁니다.' },
    { term: 'Without / But for', def: '"~이 없다면(없었다면)"이라는 뜻으로 if절을 대신합니다. 때는 주절의 동사로 판단합니다.' },
    { term: '가정법 도치', def: 'if를 생략하고 were·had·should를 주어 앞으로 옮긴 가정법입니다. 예: Had I known, I would have come.' },
    { term: 'If + were to', def: '거의 일어나지 않을 일이나 순전한 상상을 가정합니다. 주절에는 would 같은 조동사를 씁니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nIf I [[빈칸]] you, I would apologize to her first.',
      choices: ['were', 'am', 'had been', 'will be'],
      answer: 0,
      why: ['', '주절이 would + 동사원형이므로 현재 사실과 반대인 가정법 과거입니다. be동사는 were를 씁니다.', '주절이 would apologize(가정법 과거)이므로 if절은 과거형 were입니다. had been은 과거 사실 반대에 씁니다.', 'if절에는 will을 쓰지 않습니다. 가정법 과거의 be동사는 were입니다.'],
      explain: '"내가 너라면"은 현재 사실과 반대이므로 가정법 과거, be동사는 **were**를 씁니다. (내가 너라면 그녀에게 먼저 사과할 텐데.)',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: '빈칸에 leave를 알맞은 꼴로 쓰십시오.\n\nIf we [[빈칸]] ten minutes earlier, we would have caught the bus.',
      answer: ['had left'],
      wrong: [
        { a: 'left', why: '주절이 would have caught(과거 사실 반대)이므로 if절도 가정법 과거완료 had left를 씁니다.' },
        { a: 'have left', why: '가정법 과거완료의 if절은 had + p.p.입니다.' },
        { a: 'had leaved', why: 'leave의 과거분사는 left입니다.' },
      ],
      explain: '주절 would have caught는 과거 사실과 반대이므로 if절도 **had left**(가정법 과거완료). (우리가 10분 일찍 출발했다면 버스를 탔을 텐데.)',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nIf I had eaten breakfast this morning, I [[빈칸]] so hungry now.',
      choices: ["wouldn't be", "wouldn't have been", "won't be", "am not"],
      answer: 0,
      why: ['', 'now가 있으므로 주절은 현재 사실과 반대입니다. would + 동사원형을 씁니다.', '가정법 주절에는 will이 아니라 would를 씁니다.', '가정법이므로 주절에 would 같은 조동사를 씁니다. 실제로는 배가 고픈 상황입니다.'],
      explain: 'if절은 과거(this morning → had eaten), 주절은 현재(now)인 **혼합 가정법**이므로 **wouldn\'t be**입니다. (오늘 아침을 먹었다면 지금 이렇게 배고프지 않을 텐데.)',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '"I wish I had studied harder for the test."는 말하는 사람이 시험공부를 열심히 하지 않은 것을 아쉬워하는 말입니다.',
      answer: true,
      explain: 'I wish + had p.p.는 과거에 대한 아쉬움입니다. 실제로는 열심히 공부하지 **않았기** 때문에 "더 열심히 했더라면 좋았을 텐데"라고 말하는 것입니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nHe talks as if he [[빈칸]] everything about cars. (사실 그는 차에 대해 잘 모른다.)',
      choices: ['knew', 'had known', 'will know', 'knowing'],
      answer: 0,
      why: ['', 'had known은 주절보다 앞선 때의 일에 씁니다. 말하는 지금 다 아는 척하는 것이므로 과거형 knew입니다.', 'as if 가정법에는 will을 쓰지 않습니다.', 'as if 뒤에는 주어 + 동사가 와야 합니다. knowing은 동사 자리에 올 수 없습니다.'],
      explain: '말하는 때(talks, 현재)와 같은 때의 사실과 반대이므로 as if + 과거형 **knew**입니다. (그는 마치 차에 대해 모든 것을 아는 것처럼 말한다.)',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 3,
      q: '우리말 뜻에 맞게 빈칸에 알맞은 말을 쓰십시오.\n\n[[빈칸]] your help, I would have failed the test. (너의 도움이 없었다면 나는 시험에 떨어졌을 것이다.)',
      answer: ['Without', 'But for'],
      wrong: [
        { a: 'With', why: 'With는 "~이 있다면"이라는 반대 뜻입니다. "~이 없었다면"은 Without(But for)입니다.' },
        { a: 'If', why: 'If 뒤에는 주어와 동사가 와야 합니다. 명사(your help)만 쓰려면 Without이나 But for를 씁니다.' },
      ],
      explain: '"~이 없었다면"은 **Without**(= But for = If it had not been for)으로 나타냅니다. 주절이 would have failed이므로 과거의 일입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nHad I known about the test, I [[빈칸]] harder.',
      choices: ['would have studied', 'would study', 'will study', 'had studied'],
      answer: 0,
      why: ['', 'Had I known은 If I had known(과거 사실 반대)이므로 주절도 과거의 결과 would have p.p.입니다.', '가정법 주절에는 will이 아니라 would를 씁니다.', '주절에는 would 같은 조동사가 있어야 합니다. had studied만으로는 가정법 주절이 되지 않습니다.'],
      explain: 'Had I known = If I had known(가정법 과거완료)이므로 주절은 **would have studied**입니다. (시험에 대해 알았더라면 더 열심히 공부했을 텐데.)',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 5,
      q: '빈칸에 가장 알맞은 것은 무엇입니까?\n\nIf you [[빈칸]] need any help with the project, please let me know.',
      choices: ['should', 'were to', 'had', 'would'],
      answer: 0,
      why: ['', 'If + were to는 거의 일어나지 않을 상상이라 주절에 would 같은 조동사가 옵니다. 명령문(please let me know)과는 어울리지 않습니다.', 'had need로는 문장이 되지 않습니다. "혹시라도 ~하면"은 should입니다.', 'if절에는 보통 would를 쓰지 않습니다.'],
      explain: '"혹시라도 도움이 필요하면 알려 달라"는 가능성이 낮은 미래의 일이고 주절이 명령문이므로 **should**를 씁니다.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 4,
      q: '"내가 너의 처지라면, 나는 그 제안을 받아들일 텐데."라는 뜻이 되도록 if를 생략한 문장으로 놓으십시오.',
      choices: ['Were I', 'in your shoes,', 'I would', 'accept', 'the offer'],
      answer: [0, 1, 2, 3, 4],
      hint: 'If I were in your shoes에서 if를 생략하면 were가 주어 앞으로 나옵니다.',
      explain: 'Were I in your shoes, I would accept the offer. — If I were in your shoes에서 if를 생략하고 were를 주어 앞으로 옮긴 가정법 과거입니다. (in one\'s shoes: ~의 입장이 되어)',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 1,
      q: '다음 문장과 뜻이 같은 것은 무엇입니까?\n\nI didn\'t take the medicine last night, so I feel sick now.',
      choices: [
        "If I had taken the medicine last night, I wouldn't feel sick now.",
        "If I took the medicine last night, I wouldn't feel sick now.",
        "If I had taken the medicine last night, I wouldn't have felt sick now.",
        "If I take the medicine, I won't feel sick now.",
      ],
      answer: 0,
      hint: '앞부분과 뒷부분의 때가 각각 언제인지 보십시오.',
      why: [
        '',
        '어젯밤(과거)의 사실과 반대이므로 if절은 had taken이어야 합니다.',
        '주절은 now(현재)의 결과이므로 would have felt가 아니라 would feel입니다.',
        '직설법 조건문이라 사실과 반대되는 뜻이 아닙니다. 게다가 과거의 일을 말하지 못합니다.',
      ],
      explain: '어젯밤 약을 먹지 않은 것은 **과거**, 지금 아픈 것은 **현재**입니다. → If I **had taken** the medicine last night, I **wouldn\'t feel** sick now. (혼합 가정법)',
    },
    {
      id: 'p11', level: 2, type: 'short', concept: 3,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 쓰십시오.\n\nWithout music, my life would be boring.\n= If it [[빈칸]] for music, my life would be boring.',
      answer: ['were not', "weren't"],
      hint: '주절 would be를 보면 지금의 일인지 과거의 일인지 알 수 있습니다.',
      wrong: [
        { a: 'had not been', why: '주절이 would be(현재 사실 반대)이므로 If it were not for를 씁니다. If it had not been for는 과거의 일에 씁니다.' },
        { a: 'is not', why: '가정법이므로 be동사를 과거형 were로 씁니다.' },
      ],
      explain: '주절이 **would be**이므로 현재 사실 반대입니다. Without = **If it were not for**. (음악이 없다면 내 삶은 지루할 것이다.)',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nAt the reunion, Minsu looked at me as if he [[빈칸]] me before. (사실 우리는 초등학교 때 같은 반이었다.)',
      choices: ['had never seen', 'never sees', 'has never seen', 'will never see'],
      answer: 0,
      hint: '"본 적이 없는 것처럼"의 때가 주절(looked)과 같은지, 그보다 앞서는지 생각해 보십시오.',
      why: ['', '주절이 과거(looked)이고 그보다 앞선 때의 일이므로 현재형은 맞지 않습니다.', '주절이 과거(looked)이므로 현재완료는 쓸 수 없습니다. 그보다 앞선 때의 가정은 had p.p.입니다.', 'as if 가정법에는 will을 쓰지 않습니다.'],
      explain: '쳐다본 때(looked)보다 **앞선 때**에 "본 적이 없었던 것처럼"이므로 as if + **had never seen**입니다. (동창회에서 민수는 마치 전에 나를 본 적이 없는 것처럼 나를 쳐다봤다.)',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '어법상 **바른** 문장은 무엇입니까?',
      choices: [
        'If I had saved more money last year, I could buy that laptop now.',
        'If I have more time, I would learn Chinese.',
        'If she had called me, I would answer the phone yesterday.',
        'I wish I can play the guitar like you.',
      ],
      answer: 0,
      hint: 'if절과 주절의 때를 하나씩 확인하십시오.',
      why: [
        '',
        '주절이 would learn(가정법 과거)이면 if절은 과거형 had로 써야 합니다.',
        'yesterday(과거)의 결과이므로 주절은 would have answered여야 합니다.',
        'I wish 뒤에는 가정법을 씁니다. can이 아니라 could입니다.',
      ],
      explain: '작년(과거)에 돈을 더 모았다면(had saved) 지금(now) 살 수 있을 텐데(could buy) — **혼합 가정법**으로 바른 문장입니다.',
    },
    {
      id: 'a2', level: 3, type: 'short', concept: 4,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 한 낱말을 쓰십시오.\n\nIf it had not been for the map, we would have gotten lost.\n= [[빈칸]] it not been for the map, we would have gotten lost.',
      answer: ['Had'],
      hint: 'if를 생략하면 if절의 조동사가 주어 앞으로 나옵니다.',
      wrong: [
        { a: 'Were', why: 'Were it not for는 현재 사실 반대(If it were not for)입니다. 뒤에 been이 있고 주절이 would have gotten이므로 Had입니다.' },
        { a: 'If', why: 'If를 쓰면 it had not been for의 어순이어야 합니다. 빈칸 뒤가 it not been이므로 if를 생략한 도치, Had입니다.' },
      ],
      explain: 'If it had not been for에서 if를 생략하고 had를 주어 it 앞으로 옮기면 **Had** it not been for입니다. (지도가 없었다면 우리는 길을 잃었을 것이다.)',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '다음 문장과 뜻이 같은 것은 무엇입니까?\n\nI\'m sorry that I didn\'t tell you the news earlier.',
      choices: [
        'I wish I had told you the news earlier.',
        'I wish I told you the news earlier.',
        "I wish I hadn't told you the news earlier.",
        'I wish I would tell you the news earlier.',
      ],
      answer: 0,
      hint: '아쉬워하는 일이 언제의 일인지, 실제로 했는지 안 했는지 보십시오.',
      why: [
        '',
        '말하지 않은 것은 과거의 일이므로 I wish + had p.p.를 씁니다.',
        '"말하지 않았더라면 좋았을 텐데"라는 반대 뜻입니다. 실제로는 말하지 않은 것을 아쉬워합니다.',
        'I wish + would는 앞으로 상대가 어떻게 해 주기를 바라는 말입니다. 과거의 일에 대한 아쉬움이 아닙니다.',
      ],
      explain: '과거에 **하지 않은** 일을 아쉬워하므로 I wish + **had told**입니다. (그 소식을 더 일찍 말해 줬더라면 좋았을 텐데.)',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '다음 문장의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nIf I were to be born again, I would become a scientist.',
      choices: [
        '(그럴 일은 없겠지만) 내가 다시 태어난다면 과학자가 될 텐데.',
        '내가 다시 태어났더라면 과학자가 되었을 텐데.',
        '나는 다시 태어나서 과학자가 될 것이다.',
        '나는 다시 태어나야만 과학자가 될 수 있다.',
      ],
      answer: 0,
      hint: 'were to는 일어날 가능성이 거의 없는 미래의 일을 상상할 때 씁니다.',
      why: [
        '',
        '과거 사실 반대(가정법 과거완료)의 뜻입니다. were to는 앞으로의 일에 대한 상상입니다.',
        '사실을 예정으로 말하는 직설법의 뜻입니다. were to는 일어나기 어려운 일을 상상합니다.',
        '조건(~해야만)의 뜻은 문장에 없습니다.',
      ],
      explain: 'If + were to는 거의 일어나지 않을 일을 상상하는 말입니다. 주절 would become과 함께 "만약 다시 태어난다면 과학자가 될 텐데"라는 뜻입니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 1,
      q: '다음 글의 내용과 일치하는 것은 무엇입니까?\n\n' + MOVE,
      choices: [
        "Seojun's family did not move to the town by the sea.",
        'Seojun swims in the sea every summer.',
        'Seojun has never met Doyun.',
        'Seojun thinks his school life is not much fun.',
      ],
      answer: 0,
      hint: '가정법 문장마다 실제 사실은 무엇인지 뒤집어 보십시오.',
      why: [
        '',
        'If we had moved there, I would be able to swim … — 이사하지 않았으므로 지금 바다에서 수영하지 못합니다(혼합 가정법).',
        'I would never have met Doyun은 이사했다면 만나지 못했을 것이라는 상상입니다. 실제로는 만나서 가장 친한 친구가 되었습니다.',
        'Without Doyun, his school life would be much less fun — 도윤이 덕분에 학교생활이 즐겁다는 뜻입니다.',
      ],
      explain: 'they decided to stay in the city에서 서준이네는 이사하지 않았음을 알 수 있습니다. 나머지 문장들은 모두 가정법이므로, 실제로는 바다에서 수영하지 못하고, 도윤을 만났고, 학교생활이 즐겁습니다.',
    },
  ],

  deeper: [
    {
      title: '가정법은 왜 "과거"를 쓸까? — 거리를 나타내는 과거',
      body: '영어의 과거형은 **시간의 거리**(지금에서 멀리 떨어진 때)만 나타내는 것이 아니라 **현실과의 거리**도 나타냅니다. If I **had** wings ~에서 had는 "옛날에"가 아니라 "현실에서 떨어진 상상 속에서"라는 표시입니다.\n\n' +
        '같은 원리가 공손한 말에도 숨어 있습니다. Can you help me?보다 **Could** you help me?, Will you ~?보다 **Would** you ~?가 더 공손하게 들리는 것은, 과거형이 상대와의 **마음의 거리**를 두어 부담을 덜어 주기 때문입니다.\n\n' +
        '| 과거형의 거리 | 예 |\n|---|---|\n| 시간의 거리 | I **was** busy yesterday. |\n| 현실과의 거리 | If I **were** a bird, I would fly. |\n| 마음의 거리(공손) | **Could** you open the window? |\n\n' +
        '이렇게 보면 가정법 과거완료(had had)도 자연스럽습니다. 이미 과거인 일을 현실에서 한 번 더 떨어뜨리니 과거가 두 겹이 되는 것입니다.',
    },
  ],

  faq: [
    {
      q: 'If I was you라고 하면 틀려요?',
      a: '일상 대화에서는 If I was you라고 말하는 사람도 많습니다. 하지만 글이나 시험, 격식 있는 자리에서는 주어와 상관없이 **were**를 쓰는 것이 원칙입니다. 특히 If I were you(내가 너라면)는 굳어진 표현이라 were로 익혀 두는 것이 좋습니다.',
    },
    {
      q: '가정법 과거인데 왜 지금 이야기예요?',
      a: '가정법의 "과거"는 때가 아니라 **형태**의 이름입니다. 현실과 거리를 두려고 동사를 한 칸 과거로 당겨 쓸 뿐, 뜻하는 때는 현재입니다. 그래서 If I had money, I would buy it.은 "지금 돈이 있다면"이라는 뜻입니다. 과거의 일을 상상하려면 한 칸 더 당겨 had p.p.를 씁니다.',
    },
    {
      q: '혼합 가정법은 어떻게 알아봐요?',
      a: 'if절과 주절의 때를 따로 봅니다. if절에 yesterday, last year, as a child 같은 과거의 말과 had p.p.가 있고, 주절에 now, today 같은 지금의 말이 있으면 혼합 가정법입니다. 이때 주절은 would have p.p.가 아니라 **would + 동사원형**입니다.',
    },
    {
      q: 'If it should rain이랑 If it were to rain은 뭐가 달라요?',
      a: 'should는 "혹시라도"로, 일어날 수는 있지만 가능성이 낮은 일에 씁니다. 주절에 will이나 명령문도 올 수 있어 안내문에 자주 나옵니다. were to는 거의 일어나지 않을 일이나 순전한 상상에 쓰고, 주절에는 would 같은 가정법 조동사가 옵니다.',
    },
  ],

  mistakes: [
    '과거 사실과 반대인데 가정법 과거를 쓰는 실수 — If I knew yesterday, I would come (×) → If I had known yesterday, I would have come (○).',
    '가정법 주절에 will·can을 쓰는 실수 — If I were rich, I will travel (×) → I would travel (○). I wish I can (×) → I wish I could (○).',
    'if를 생략했는데 어순을 그대로 두거나, if를 남긴 채 도치하는 실수 — If had I known (×), I had known, I would ~ (×) → Had I known (○).',
  ],

  gens: [
    {
      id: 'conditional-transform',
      level: 2,
      title: '사실을 가정법 과거·과거완료로 바꾸기',
      make: function (R) {
        // fact, when, A(if 가정법 과거), B(if 가정법 과거완료), C(주절 would+원형), D(주절 would have p.p.), Ai(직설법 if), Ci(직설법 주절)
        var items = [
          ["I don't have a car, so I can't drive you home.", 'now', 'If I had a car', 'If I had had a car', 'I could drive you home', 'I could have driven you home', 'If I have a car', 'I can drive you home'],
          ["Minsu is sick, so he can't join the game.", 'now', 'If Minsu were not sick', 'If Minsu had not been sick', 'he could join the game', 'he could have joined the game', 'If Minsu is not sick', 'he can join the game'],
          ["I don't know the answer, so I can't tell you.", 'now', 'If I knew the answer', 'If I had known the answer', 'I could tell you', 'I could have told you', 'If I know the answer', 'I can tell you'],
          ["It is raining, so we won't go hiking.", 'now', 'If it were not raining', 'If it had not been raining', 'we would go hiking', 'we would have gone hiking', 'If it is not raining', 'we will go hiking'],
          ["Jia lives far away, so I don't see her often.", 'now', "If Jia didn't live far away", "If Jia hadn't lived far away", 'I would see her often', 'I would have seen her often', "If Jia doesn't live far away", 'I will see her often'],
          ["I didn't know her number, so I didn't call her.", 'past', 'If I knew her number', 'If I had known her number', 'I would call her', 'I would have called her', 'If I know her number', 'I will call her'],
          ["We didn't leave early, so we missed the train.", 'past', 'If we left early', 'If we had left early', "we wouldn't miss the train", "we wouldn't have missed the train", 'If we leave early', "we won't miss the train"],
          ["Seojun didn't study hard, so he failed the test.", 'past', 'If Seojun studied hard', 'If Seojun had studied hard', "he wouldn't fail the test", "he wouldn't have failed the test", 'If Seojun studies hard', "he won't fail the test"],
          ['It rained heavily, so the game was canceled.', 'past', "If it didn't rain heavily", "If it hadn't rained heavily", "the game wouldn't be canceled", "the game wouldn't have been canceled", "If it doesn't rain heavily", "the game won't be canceled"],
          ['Hayun forgot her umbrella, so she got wet.', 'past', "If Hayun didn't forget her umbrella", "If Hayun hadn't forgotten her umbrella", "she wouldn't get wet", "she wouldn't have gotten wet", "If Hayun doesn't forget her umbrella", "she won't get wet"],
        ];
        var it = R.pick(items);
        var now = it[1] === 'now';
        function s(a, b) { return a + ', ' + b + '.'; }
        var correct, cands;
        if (now) {
          correct = s(it[2], it[4]);
          cands = [
            [s(it[3], it[5]), '이 형태는 과거 사실과 반대(가정법 과거완료)입니다. 주어진 문장은 지금의 사실이므로 가정법 과거를 씁니다.'],
            [s(it[2], it[7]), '가정법 과거의 주절에는 will·can이 아니라 would·could를 씁니다.'],
            [s(it[6], it[7]), '현재시제 if절은 실제로 일어날 수 있는 조건을 말할 뿐, 사실과 반대되는 뜻이 아닙니다.'],
          ];
        } else {
          correct = s(it[3], it[5]);
          cands = [
            [s(it[2], it[4]), '이 형태는 현재 사실과 반대(가정법 과거)입니다. 주어진 문장은 과거의 사실이므로 가정법 과거완료를 씁니다.'],
            [s(it[3], it[7]), '가정법 과거완료의 주절에는 will·can이 아니라 would(could) have p.p.를 씁니다.'],
            [s(it[6], it[7]), '현재시제 if절은 실제로 일어날 수 있는 조건을 말할 뿐, 과거 사실과 반대되는 뜻이 아닙니다.'],
          ];
        }
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, R.shuffle(cands.map(function (c) { return c[0]; })));
        return {
          type: 'choice', concept: 0,
          q: '다음 문장과 뜻이 같도록 가정법으로 바르게 바꾼 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: (now
            ? '주어진 문장은 **지금**의 사실입니다. 현재 사실과 반대는 가정법 과거(If + 과거형, would·could + 동사원형)로 쓰고, 긍정·부정을 뒤집습니다.'
            : '주어진 문장은 **과거**의 사실입니다. 과거 사실과 반대는 가정법 과거완료(If + had p.p., would·could have p.p.)로 쓰고, 긍정·부정을 뒤집습니다.') +
            ' → ' + correct,
        };
      },
    },
    {
      id: 'wish-form',
      level: 1,
      title: 'I wish 가정법의 동사 꼴 고르기',
      make: function (R) {
        // [문장, 우리말 뜻, 때, 정답, 반대 때의 꼴, 현재형, will 꼴]
        var items = [
          ['I wish I [[빈칸]] taller.', '내 키가 더 크면 좋을 텐데.', 'now', 'were', 'had been', 'am', 'will be'],
          ['I wish I [[빈칸]] how to swim.', '수영할 줄 알면 좋을 텐데.', 'now', 'knew', 'had known', 'know', 'will know'],
          ['I wish I [[빈칸]] a pet dog.', '반려견이 있으면 좋을 텐데.', 'now', 'had', 'had had', 'have', 'will have'],
          ["I wish it [[빈칸]] so cold today.", '오늘 이렇게 춥지 않으면 좋을 텐데.', 'now', "weren't", "hadn't been", "isn't", "won't be"],
          ['I wish I [[빈칸]] more free time these days.', '요즘 자유 시간이 더 있으면 좋을 텐데.', 'now', 'had', 'had had', 'have', 'will have'],
          ['I wish my house [[빈칸]] closer to school.', '우리 집이 학교에 더 가까우면 좋을 텐데.', 'now', 'were', 'had been', 'is', 'will be'],
          ['I wish I [[빈칸]] to the concert last night.', '어젯밤 콘서트에 갔더라면 좋았을 텐데.', 'past', 'had gone', 'went', 'go', 'will go'],
          ['I wish I [[빈칸]] that mistake yesterday.', '어제 그 실수를 하지 않았더라면 좋았을 텐데.', 'past', "hadn't made", "didn't make", "don't make", "won't make"],
          ['I wish I [[빈칸]] harder in middle school.', '중학교 때 더 열심히 공부했더라면 좋았을 텐데.', 'past', 'had studied', 'studied', 'study', 'will study'],
          ['I wish you [[빈칸]] me the truth earlier.', '네가 진실을 더 일찍 말해 줬더라면 좋았을 텐데.', 'past', 'had told', 'told', 'tell', 'will tell'],
          ['I wish I [[빈칸]] my camera on the trip.', '여행에 카메라를 가져갔더라면 좋았을 텐데.', 'past', 'had taken', 'took', 'take', 'will take'],
        ];
        var it = R.pick(items);
        var now = it[2] === 'now';
        var correct = it[3];
        var reason = {};
        reason[it[4]] = now
          ? '"' + it[4] + '" 꼴은 과거에 대한 아쉬움(I wish + had p.p.)에 씁니다. 지금에 대한 소망은 과거형을 씁니다.'
          : '"' + it[4] + '" 꼴은 지금에 대한 소망에 씁니다. 과거의 일에 대한 아쉬움은 I wish + had p.p.입니다.';
        reason[it[5]] = 'I wish 뒤에는 현실과 다른 소망을 나타내려고 시제를 한 칸 과거로 당겨 씁니다. 현재형은 쓰지 않습니다.';
        reason[it[6]] = 'I wish 가정법에는 will을 쓰지 않습니다.';
        var pick = R.choices(correct, R.shuffle([it[4], it[5], it[6]]));
        return {
          type: 'choice', concept: 2,
          q: '우리말 뜻에 맞게 빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0] + '\n(' + it[1] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: (now ? '**지금** 이루기 어려운 소망이므로 I wish + 과거형(be동사는 were)을 씁니다.' : '**과거**에 대한 아쉬움이므로 I wish + had p.p.를 씁니다.') +
            ' → ' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'imagine', m: '상상하다', ex: 'Imagine what you would do if you were invisible.', exm: '네가 투명 인간이라면 무엇을 할지 상상해 봐.' },
    { w: 'wish', m: '바라다, 소망하다; 소원', ex: 'I wish I had more time to read.', exm: '책 읽을 시간이 더 있으면 좋을 텐데.' },
    { w: 'offer', m: '제안; 제공하다', ex: 'If I were you, I would accept the offer.', exm: '내가 너라면 그 제안을 받아들일 텐데.' },
    { w: 'accept', m: '받아들이다', ex: 'Had I known the truth, I would not have accepted the gift.', exm: '진실을 알았더라면 나는 그 선물을 받지 않았을 것이다.' },
    { w: 'advice', m: '충고, 조언', ex: 'Without your advice, I would have made a big mistake.', exm: '네 충고가 없었다면 나는 큰 실수를 했을 것이다.' },
    { w: 'chance', m: '기회; 가능성', ex: 'If I had a chance to travel, I would visit Iceland.', exm: '여행할 기회가 있다면 나는 아이슬란드에 갈 텐데.' },
    { w: 'otherwise', m: '그렇지 않으면', ex: 'I took a taxi; otherwise, I would have been late.', exm: '나는 택시를 탔다. 그렇지 않았으면 늦었을 것이다.' },
    { w: 'pretend', m: '~인 척하다', ex: 'He pretended that he knew the answer.', exm: '그는 답을 아는 척했다.' },
    { w: 'invisible', m: '보이지 않는', ex: 'If I were invisible, I would sneak into the kitchen.', exm: '내가 투명 인간이라면 몰래 부엌에 들어갈 텐데.' },
    { w: 'lost item', m: '분실물', ex: 'Should you find a lost item, take it to the front desk.', exm: '혹시라도 분실물을 발견하면 안내 데스크로 가져가십시오.' },
    { w: 'reunion', m: '동창회, 재회', ex: 'We met our old teacher at the class reunion.', exm: '우리는 동창회에서 옛 선생님을 만났다.' },
    { w: 'medicine', m: '약', ex: 'If I had taken the medicine, I would feel better now.', exm: '약을 먹었더라면 지금 몸이 더 나을 텐데.' },
    { w: 'regret', m: '후회; 후회하다', ex: 'I have no regrets about my choice.', exm: '나는 내 선택에 아무 후회가 없다.' },
  ],
});
})();
