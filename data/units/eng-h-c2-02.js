/* 공통영어2 · 완료 시제와 조동사 심화
 * 예문·지문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 짧은 글 (직접 쓴 글, 가상의 인물)
  var PARTY = "When Hayun opened the classroom door, everyone was smiling at her. Her friends had decorated the room with balloons, and someone had written 'Happy Birthday, Hayun!' on the board. All morning, she had felt a little sad because she had thought that everyone had forgotten her birthday.";
  var CAKE = "When Doyun came home, the cake on the table was half gone. His little sister had chocolate all over her face, so she must have eaten some of it. The dog had been in the yard all day with the door closed, so it can't have touched the cake. Doyun sighed. He should have put the cake in the fridge.";

  // 조동사 + have p.p. 생성기: 뜻
  var MODAL = {
    must: { form: 'must have', mean: '~했음에 틀림없다(강한 확신)' },
    may: { form: 'may have', mean: '~했을지도 모른다(약한 추측)' },
    cant: { form: "can't have", mean: '~했을 리가 없다(강한 부정 추측)' },
    should: { form: 'should have', mean: '~했어야 했는데 (실제로는 하지 않았다)' },
    shouldnt: { form: "shouldn't have", mean: '~하지 말았어야 했는데 (실제로는 했다)' },
  };

Tutor.registerUnit({
  id: 'eng-h-c2-02',
  course: 'eng-h-c2',
  title: '완료 시제와 조동사 심화',
  summary: '과거완료와 완료진행형으로 일의 앞뒤를 밝히고, 미래완료로 앞으로의 완료를 말하며, 조동사 + have p.p.로 과거를 추측하거나 후회합니다.',
  goals: [
    '과거완료(had p.p.)로 과거의 기준 시점보다 먼저 일어난 일을 나타낼 수 있다.',
    '현재완료진행형·과거완료진행형·미래완료를 기준 시점에 맞게 고를 수 있다.',
    'must·may·can\'t·should + have p.p.로 과거의 일을 추측하거나 후회하는 말을 할 수 있다.',
    'suggest·demand·recommend 뒤의 that절에 (should) 동사원형을 쓸 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '과거완료(had p.p.): 더 먼저 일어난 일',
      body: '**과거완료(had + p.p.)**는 과거의 어느 때를 **기준**으로, 그보다 **더 먼저** 일어난 일이나 그때까지 이어진 일을 나타냅니다. 그래서 문장 안이나 앞뒤 문맥에 기준이 되는 과거가 있어야 씁니다.\n\n' +
        '- When I got to the station, the train **had** already **left**. (내가 역에 도착했을 때 기차는 이미 떠나 있었다.) — 기차가 떠난 일이 먼저\n' +
        '- She lost the umbrella that her father **had bought** for her. — 우산을 산 일이 잃어버린 일보다 먼저\n' +
        '- I **had** never **seen** snow until I visited Gangwon-do. — 그때까지의 경험\n\n' +
        '| 두 일 | 쓰는 시제 |\n|---|---|\n| 기준이 되는 과거의 일 | 과거 (got, lost, visited) |\n| 그보다 먼저 일어난 일 | had + p.p. (had left, had bought) |\n\n' +
        '> 💡 before, after처럼 순서가 분명한 접속사가 있으면 먼저 일어난 일도 과거시제로 써도 됩니다. I left after he **arrived**. / I left after he **had arrived**. 둘 다 바릅니다.\n\n' +
        '> ⚠️ 지금과 이어진 일은 현재완료(have p.p.)로 씁니다. 기준이 되는 과거가 없는데 had p.p.만 쓰지 않습니다.',
      easy: '시간을 줄 하나로 그려 보십시오. 오른쪽 끝이 "지금"이고, 왼쪽으로 갈수록 옛날입니다.\n\n' +
        '과거의 한 지점(내가 역에 도착한 때)에 깃발을 꽂으면, 그 깃발보다 **더 왼쪽**(기차가 떠난 때)에 있는 일이 과거완료입니다. 현재완료가 "지금" 깃발을 기준으로 한 완료라면, 과거완료는 그 깃발을 과거로 옮겨 꽂은 것입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nWhen I arrived at the party, most of the guests [[빈칸]] home. (내가 도착했을 때 손님 대부분은 이미 집에 가고 없었다.)',
        choices: ['had gone', 'have gone', 'will have gone'],
        answer: 0,
        why: ['', '현재완료는 지금을 기준으로 합니다. 이 문장의 기준은 과거(arrived)이므로 had gone입니다.', '미래완료는 미래의 어느 때를 기준으로 합니다. 기준이 과거(arrived)이므로 맞지 않습니다.'],
        explain: '기준이 되는 일은 과거(I arrived)이고, 손님들이 집에 간 일은 그보다 먼저입니다. 그래서 과거완료 **had gone**을 씁니다.',
      },
    },
    {
      title: '완료진행형: have been -ing, had been -ing',
      body: '**완료진행형**은 어떤 동작이 기준 시점까지 **계속 이어져 오고 있음**을 강조합니다. for(~ 동안), since(~ 이래로), How long ~?과 자주 함께 씁니다.\n\n' +
        '| 형태 | 기준 시점 | 예 |\n|---|---|---|\n' +
        '| 현재완료진행형 **have(has) been -ing** | 지금 | It **has been raining** since this morning. (아침부터 지금까지 비가 오고 있다.) |\n' +
        '| 과거완료진행형 **had been -ing** | 과거의 어느 때 | She **had been waiting** for an hour when the bus finally came. (버스가 왔을 때 그녀는 한 시간째 기다리던 중이었다.) |\n\n' +
        '현재완료와 비교하면 차이가 보입니다.\n\n' +
        '- I **have read** the book. — 다 읽었다(완료).\n' +
        '- I **have been reading** the book. — 계속 읽어 오는 중이다(아직 다 읽지 않았을 수 있다).\n\n' +
        '> ⚠️ know, have(가지고 있다), like, own, believe 같은 **상태 동사**는 진행형으로 쓰지 않습니다. 계속을 말할 때는 완료형을 씁니다. I **have known** her for ten years. (O) / I have been knowing her for ten years. (X)',
      easy: '동영상을 떠올려 보십시오. have p.p.는 "다 끝난 장면"을 찍은 사진이고, have been -ing는 "아직 돌아가고 있는 동영상"입니다.\n\n' +
        '아침부터 내린 비가 지금도 내리고 있으면 동영상이 계속 돌아가는 중이니 It has been raining. 과거의 어느 장면(버스가 온 때)에서 동영상을 멈추고 "그때까지 한 시간째 기다리던 중"이라고 말하면 had been waiting입니다.',
      check: {
        type: 'ox',
        q: '다음 문장은 어법상 바릅니다.\n\nI have been knowing Jia since elementary school.',
        answer: false,
        explain: 'know는 상태 동사라서 진행형으로 쓰지 않습니다. 계속을 나타낼 때는 현재완료를 씁니다. I **have known** Jia since elementary school.',
      },
    },
    {
      title: '미래완료(will have p.p.)',
      body: '**미래완료(will have + p.p.)**는 **미래의 어느 때**를 기준으로, 그때까지 끝나 있을 일이나 그때까지 이어질 일을 나타냅니다. 기준 시점은 **by + 때**(~까지)나 **by the time + 주어 + 동사**(~할 때쯤이면)로 자주 나타냅니다.\n\n' +
        '- By 6 p.m., I **will have finished** my report. (오후 6시까지는 보고서를 끝냈을 것이다.) — 완료\n' +
        '- By the time you **arrive**, we **will have eaten** dinner. (네가 도착할 때쯤이면 우리는 저녁을 먹었을 것이다.) — 완료\n' +
        '- Next month, Minsu **will have lived** in Busan for three years. (다음 달이면 민수는 부산에서 3년째 살게 된다.) — 계속\n\n' +
        '> ⚠️ by the time, when, before처럼 **때를 나타내는 부사절**에서는 미래의 일도 **현재시제**로 씁니다. By the time you **arrive** (O) / By the time you will arrive (X). 미래완료는 주절에만 씁니다.',
      easy: '미래 달력에 날짜 하나를 동그라미 쳐 보십시오(예: 오후 6시). 미래완료는 "그 동그라미에 도착했을 때 뒤를 돌아보면, 이미 끝나 있을 일"입니다.\n\n' +
        '과거완료가 과거의 깃발보다 앞선 일이라면, 미래완료는 미래의 깃발보다 앞선 일입니다. 깃발의 자리만 다를 뿐 생각하는 방법은 같습니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nBy the time the guests [[빈칸]], we will have cleaned the whole house.',
        choices: ['arrive', 'will arrive', 'will have arrived'],
        answer: 0,
        why: ['', 'by the time이 이끄는 때의 부사절에서는 미래의 일도 현재시제로 씁니다.', '미래완료는 주절(we will have cleaned)에 씁니다. 때의 부사절은 현재시제입니다.'],
        explain: 'by the time 절은 때를 나타내는 부사절이므로 미래의 일도 현재시제 **arrive**로 씁니다. 주절에는 미래완료 will have cleaned를 씁니다.',
      },
    },
    {
      title: '과거에 대한 추측: must·may·can\'t + have p.p.',
      body: '지금 보이는 단서로 **과거의 일을 추측**할 때는 **조동사 + have + p.p.**를 씁니다. 추측하는 것은 지금이고, 추측하는 내용이 과거입니다.\n\n' +
        '| 형태 | 뜻 | 확신 |\n|---|---|---|\n' +
        '| **must have p.p.** | ~했음에 틀림없다 | 매우 강함 |\n' +
        '| **may(might) have p.p.** | ~했을지도 모른다 | 약함 |\n' +
        '| **can\'t(couldn\'t) have p.p.** | ~했을 리가 없다 | 매우 강한 부정 |\n\n' +
        '- Jia\'s eyes are red. She **must have cried**. (지아의 눈이 빨갛다. 울었음에 틀림없다.)\n' +
        '- I can\'t find my key. I **may have left** it at school. (학교에 두고 왔을지도 모른다.)\n' +
        '- Minsu **can\'t have broken** the vase. He was with me all afternoon. (민수가 꽃병을 깼을 리가 없다.)\n\n' +
        '> 💡 조동사 뒤에 동사원형만 쓰면 **지금**에 대한 추측입니다. She **must be** tired. (지금 피곤한 게 틀림없다.) / She **must have been** tired. (그때 피곤했던 게 틀림없다.)',
      easy: '탐정이 되었다고 생각해 보십시오. 바닥에 진흙 발자국이 있습니다(지금 보이는 단서). 탐정은 "누군가 밖에서 들어왔음에 **틀림없어**"(must have), "어쩌면 강아지였을지도 **몰라**"(may have), "하지만 할머니는 외출하셨으니 할머니일 **리는 없어**"(can\'t have)라고 말합니다.\n\n단서는 지금, 사건은 과거 — 그래서 조동사 뒤에 have p.p.가 붙습니다.',
      check: {
        type: 'choice',
        q: '우리말 뜻에 맞게 빈칸에 알맞은 것은 무엇입니까?\n\nSeojun was in Jeju all last week. He [[빈칸]] you in Seoul last Friday. (그가 지난 금요일에 서울에서 너를 봤을 리가 없다.)',
        choices: ["can't have seen", 'must have seen', 'should have seen'],
        answer: 0,
        why: ['', 'must have p.p.는 "~했음에 틀림없다"는 뜻입니다. 우리말 뜻은 "~했을 리가 없다"입니다.', 'should have p.p.는 "~했어야 했는데"라는 후회·아쉬움입니다. 추측이 아닙니다.'],
        explain: '"~했을 리가 없다"는 **can\'t have p.p.**입니다. 지난주 내내 제주에 있었다는 단서가 있으므로 서울에서 봤을 리가 없습니다.',
      },
    },
    {
      title: '과거에 대한 후회: should·shouldn\'t·could + have p.p.',
      body: '**should have p.p.**는 "~했어야 했는데"라는 뜻으로, **실제로는 하지 않은** 일을 후회하거나 아쉬워할 때 씁니다. 반대로 **shouldn\'t have p.p.**는 "~하지 말았어야 했는데"로, **실제로는 해 버린** 일을 후회합니다.\n\n' +
        '| 형태 | 뜻 | 실제로 일어난 일 |\n|---|---|---|\n' +
        '| **should have p.p.** | ~했어야 했는데 | 하지 않았다 |\n' +
        '| **shouldn\'t have p.p.** | ~하지 말았어야 했는데 | 했다 |\n' +
        '| **could have p.p.** | ~할 수 있었을 텐데 | 하지 않았다(못 했다) |\n\n' +
        '- I failed the test. I **should have studied** harder. (더 열심히 공부했어야 했는데.)\n' +
        '- I\'m too full. I **shouldn\'t have eaten** so much. (그렇게 많이 먹지 말았어야 했는데.)\n' +
        '- You **could have asked** me for help. (나한테 도와 달라고 할 수도 있었잖아.)\n\n' +
        '> ⚠️ must have p.p.(추측)와 should have p.p.(후회)를 헷갈리지 않습니다. 단서로 짐작하면 must, 아쉬워하면 should입니다.',
      easy: '시험이 끝나고 "아, 공부 좀 할걸!" 하는 마음이 바로 should have p.p.입니다. "할걸" 속에는 "안 했다"는 사실이 숨어 있습니다.\n\n' +
        '밤늦게 라면을 먹고 다음 날 얼굴이 부었을 때 "먹지 말걸!"은 shouldn\'t have p.p.입니다. "먹지 말걸" 속에는 "먹었다"는 사실이 숨어 있습니다.',
      check: {
        type: 'ox',
        q: '"I should have brought an umbrella."는 말하는 사람이 실제로 우산을 가져왔다는 뜻입니다.',
        answer: false,
        explain: 'should have p.p.는 "~했어야 했는데"라는 뜻으로, 실제로는 **하지 않은** 일을 아쉬워합니다. 말하는 사람은 우산을 가져오지 않았습니다.',
      },
    },
    {
      title: '요구·제안 동사 + that + (should) 동사원형',
      body: '**suggest(제안하다), recommend(권하다), demand(요구하다), insist(주장하다), require(요구하다), propose(제안하다), order(명령하다)** 뒤의 that절이 "**~해야 한다**"는 뜻(당위)을 나타내면, that절의 동사는 **(should) + 동사원형**으로 씁니다. should는 생략할 수 있고, 생략해도 동사는 **원형** 그대로입니다.\n\n' +
        '- The doctor **recommended** that he (should) **get** more rest. — gets(X), got(X)\n' +
        '- The teacher **suggested** that we (should) **start** early.\n' +
        '- The fans **demanded** that the concert (should) **be** held again.\n\n' +
        'that절의 주어가 3인칭 단수여도, 주절이 과거여도 동사원형을 씁니다. "그래야 한다"는 생각을 말할 뿐 실제로 일어난 일이 아니기 때문입니다.\n\n' +
        '> ⚠️ that절이 "~해야 한다"가 아니라 **사실**을 전할 때는 보통 시제를 씁니다.\n' +
        '> He **insisted** that he **had locked** the door. (그는 문을 잠갔다고 주장했다. — 사실 주장)\n' +
        '> Her smile **suggested** that she **was** happy. (suggest = 암시하다)',
      easy: '"선생님이 우리가 일찍 출발**해야 한다고** 제안하셨다."처럼 우리말에서도 제안·요구 뒤에는 "~해야 한다"는 말이 따라옵니다. 영어는 그 "해야 한다"를 should로 나타내고, should를 빼더라도 그 뒤의 동사원형은 그대로 남겨 둡니다.\n\n' +
        '그래서 주어가 he여도 "he should get" → "he get"이 됩니다. should가 보이지 않아도 숨어 있다고 생각하면 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nMy coach suggested that Minsu [[빈칸]] every morning.',
        choices: ['run', 'runs', 'ran'],
        answer: 0,
        why: ['', 'should가 생략된 자리이므로 3인칭 단수 주어여도 -s를 붙이지 않고 동사원형을 씁니다.', '주절이 과거(suggested)여도 that절의 당위를 나타내는 동사는 원형입니다.'],
        explain: 'suggest 뒤의 that절이 "~해야 한다"는 제안이므로 (should) + 동사원형: Minsu (should) **run**.',
      },
    },
  ],

  examples: [
    {
      q: '다음 두 일을 When으로 시작하는 한 문장으로 쓰되, 먼저 일어난 일을 과거완료로 나타내십시오.\n\nMinsu finished his homework. After that, his mother came home.',
      steps: [
        '두 일의 순서를 정합니다. 먼저: 민수가 숙제를 끝냈다. 나중(기준): 엄마가 집에 오셨다.',
        '기준이 되는 나중 일을 When 절의 과거시제로 씁니다: When his mother came home, …',
        '먼저 일어난 일을 과거완료(had + p.p.)로 씁니다: Minsu had finished his homework.',
        '"이미"를 덧붙이고 싶으면 had와 p.p. 사이에 already를 넣습니다.',
      ],
      answer: 'When his mother came home, Minsu had (already) finished his homework. (엄마가 집에 오셨을 때 민수는 이미 숙제를 끝냈다.)',
    },
    {
      q: '단서를 보고 괄호 안의 동사를 써서 추측하는 말을 완성하십시오.\n\nThe lights in Jia\'s room are off, and her bag is gone. She [[빈칸]] (leave) already.',
      steps: [
        '불이 꺼져 있고 가방이 없다는 것은 지금 보이는 단서입니다. 떠난 일은 과거입니다.',
        '단서가 분명하므로 강한 확신, "떠났음에 틀림없다"가 알맞습니다.',
        '과거에 대한 강한 추측은 must have + p.p.입니다. leave의 p.p.는 left입니다.',
      ],
      answer: 'She must have left already. (그녀는 이미 떠났음에 틀림없다.)',
    },
    {
      q: '다음 말을 recommended that으로 시작하는 문장으로 바꾸십시오.\n\nThe doctor said to me, "You should drink more water."',
      steps: [
        '의사의 말은 "~해야 한다"는 권유이므로 recommend 뒤의 that절은 (should) + 동사원형으로 씁니다.',
        '직접 말한 You는 전하는 문장에서 나(I)로 바뀝니다.',
        'should를 넣어도, 빼도 drink는 원형 그대로입니다. 주절이 과거여도 drank로 바꾸지 않습니다.',
      ],
      answer: 'The doctor recommended that I (should) drink more water.',
    },
  ],

  terms: [
    { term: '과거완료', def: 'had + p.p. 꼴로, 과거의 기준 시점보다 먼저 일어난 일이나 그때까지 이어진 일을 나타냅니다. 예: The train had left when I arrived.' },
    { term: '현재완료진행형', def: 'have(has) been -ing 꼴로, 과거에 시작한 동작이 지금까지 계속되고 있음을 강조합니다. 예: It has been raining since noon.' },
    { term: '과거완료진행형', def: 'had been -ing 꼴로, 과거의 어느 때까지 계속되던 동작을 나타냅니다. 예: She had been waiting for an hour when the bus came.' },
    { term: '미래완료', def: 'will have + p.p. 꼴로, 미래의 어느 때까지 끝나 있거나 이어질 일을 나타냅니다. 예: By 6 p.m., I will have finished.' },
    { term: '조동사 + have p.p.', def: '과거의 일에 대한 추측(must·may·can\'t have p.p.)이나 후회·아쉬움(should·shouldn\'t·could have p.p.)을 나타냅니다.' },
    { term: '상태 동사', def: 'know, have(가지다), like, own, believe처럼 동작이 아니라 상태를 나타내는 동사입니다. 보통 진행형으로 쓰지 않습니다.' },
    { term: '당위의 (should)', def: 'suggest·demand·recommend 같은 요구·제안 동사 뒤 that절에서 "~해야 한다"를 나타내는 should입니다. 생략해도 동사는 원형입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nI couldn\'t get into the house because I [[빈칸]] my key.',
      choices: ['had lost', 'have lost', 'will have lost', 'lose'],
      answer: 0,
      why: ['', '현재완료는 지금을 기준으로 합니다. 기준이 과거(couldn\'t get into)이므로 had lost입니다.', '미래완료는 미래를 기준으로 합니다. 이 문장은 과거의 일입니다.', '열쇠를 잃어버린 일은 들어가지 못한 일보다 먼저 일어난 과거의 일입니다. 현재시제는 맞지 않습니다.'],
      explain: '집에 들어가지 못한 것(과거)보다 열쇠를 잃어버린 것이 먼저이므로 과거완료 **had lost**를 씁니다. (나는 열쇠를 잃어버려서 집에 들어갈 수 없었다.)',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 1,
      q: '현재완료진행형이 되도록 빈칸에 알맞은 말을 쓰십시오. (rain을 활용, 세 낱말)\n\nIt started to rain three hours ago, and it is still raining.\n→ It [[빈칸]] for three hours.',
      answer: ['has been raining'],
      wrong: [
        { a: 'is raining', why: 'for three hours처럼 기간을 말할 때 현재진행형은 쓰지 않습니다. 지금까지 계속되어 온 동작은 has been raining입니다.' },
        { a: 'had been raining', why: '기준이 지금(is still raining)이므로 과거완료진행형이 아니라 현재완료진행형 has been raining입니다.' },
        { a: 'have been raining', why: '주어 It은 3인칭 단수이므로 have가 아니라 has를 씁니다.' },
      ],
      explain: '세 시간 전에 시작해 지금도 계속되므로 현재완료진행형 **has been raining**입니다. 주어 It이 3인칭 단수라서 has를 씁니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nBy next February, my sister [[빈칸]] from university.',
      choices: ['will have graduated', 'had graduated', 'has graduated', 'will graduating'],
      answer: 0,
      why: ['', '과거완료는 과거의 기준 시점에 씁니다. By next February는 미래입니다.', '현재완료는 지금을 기준으로 합니다. 미래의 기준 시점(By next February)까지의 완료는 미래완료입니다.', 'will 뒤에는 동사원형이 옵니다. will graduating은 틀린 형태입니다.'],
      explain: 'By next February(다음 2월까지)는 미래의 기준 시점이므로 미래완료 **will have graduated**를 씁니다. (다음 2월이면 언니는 대학을 졸업했을 것이다.)',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 가장 알맞은 것은 무엇입니까?\n\nThe street is full of puddles. It [[빈칸]] heavily last night.',
      choices: ['must have rained', "can't have rained", 'should have rained', 'must rain'],
      answer: 0,
      why: ['', '길에 물웅덩이가 가득하다는 단서와 반대되는 추측입니다.', 'should have p.p.는 "~했어야 했는데"라는 후회입니다. 단서로 짐작하는 문장에는 맞지 않습니다.', 'must + 동사원형은 지금에 대한 추측이나 의무입니다. last night(과거)의 일은 must have p.p.로 추측합니다.'],
      explain: '물웅덩이(지금 보이는 단서)로 어젯밤의 일을 강하게 추측하므로 **must have rained**입니다. (어젯밤에 비가 많이 왔음에 틀림없다.)',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 4,
      q: '"You should have told me the truth."는 상대가 사실을 말하지 않은 것을 아쉬워하는 말입니다.',
      answer: true,
      explain: 'should have p.p.는 "~했어야 했는데"라는 뜻으로, 실제로는 하지 않은 일을 아쉬워하거나 탓합니다. 상대는 사실을 말하지 않았습니다. (너는 나에게 사실을 말했어야 했어.)',
    },
    {
      id: 'p6', level: 1, type: 'short', concept: 5,
      q: '빈칸에 wear를 알맞은 꼴로 쓰십시오.\n\nThe teacher insisted that every student [[빈칸]] a name tag during the field trip.',
      answer: ['wear', 'should wear'],
      wrong: [
        { a: 'wears', why: '이 that절은 "~해야 한다"는 요구를 나타내므로 (should) + 동사원형입니다. 3인칭 단수 주어여도 -s를 붙이지 않습니다.' },
        { a: 'wore', why: '주절이 과거(insisted)여도 요구를 나타내는 that절의 동사는 원형 wear입니다.' },
      ],
      explain: '"모든 학생이 이름표를 달아야 한다"는 요구이므로 that절은 (should) + 동사원형: every student (should) **wear** a name tag.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nSujin [[빈칸]] for two hours when her friends finally showed up.',
      choices: ['had been waiting', 'has been waiting', 'will have been waiting', 'is waiting'],
      answer: 0,
      why: ['', '친구들이 나타난 때(showed up)는 과거입니다. 과거의 어느 때까지 이어진 동작은 had been waiting입니다.', '미래를 기준으로 한 형태입니다. 이 문장은 과거의 일입니다.', 'is waiting은 지금 진행 중인 일을 말하는 현재진행형입니다. 친구들이 나타난 때(showed up)는 과거이므로 had been waiting을 씁니다.'],
      explain: '친구들이 마침내 나타난 **과거의 때**까지 두 시간 동안 계속 기다리고 있었으므로 과거완료진행형 **had been waiting**입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: '대화의 빈칸에 알맞은 것은 무엇입니까?\n\nA: I can\'t find Minsu\'s phone number anywhere.\nB: You [[빈칸]] it when you changed phones. (네가 휴대전화를 바꿀 때 지웠을지도 몰라.)',
      choices: ['may have deleted', 'must delete', 'should have deleted', "can't have deleted"],
      answer: 0,
      hint: '우리말 뜻의 "~했을지도 몰라"에 맞는 추측 표현을 찾습니다.',
      why: ['', 'must + 동사원형은 지금의 일에 대한 추측·의무입니다. 휴대전화를 바꾼 것은 과거입니다.', 'should have p.p.는 "지웠어야 했는데"라는 뜻이 되어 상황과 맞지 않습니다.', 'can\'t have p.p.는 "지웠을 리가 없다"는 뜻으로 우리말과 반대입니다.'],
      explain: '"~했을지도 모른다"는 약한 추측이므로 **may have deleted**입니다.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 2,
      q: '"네가 돌아올 때쯤이면 나는 그 책을 다 읽었을 것이다."라는 뜻이 되도록 순서대로 놓으십시오.',
      choices: ['By the time', 'you come back,', 'I will have', 'finished reading', 'the book'],
      answer: [0, 1, 2, 3, 4],
      hint: '때의 부사절(By the time ~)을 앞에 두고, 주절에 미래완료를 씁니다.',
      explain: 'By the time you come back, I will have finished reading the book. — 때의 부사절은 현재시제(come back), 주절은 미래완료(will have finished)입니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', concept: 4,
      q: '우리말 뜻에 맞게 빈칸에 알맞은 말을 쓰십시오. (stay를 활용)\n\n나는 그렇게 늦게까지 깨어 있지 말았어야 했다.\nI [[빈칸]] up so late.',
      answer: ["shouldn't have stayed", 'should not have stayed'],
      hint: '"~하지 말았어야 했는데"는 실제로는 그렇게 한 일을 후회하는 말입니다.',
      wrong: [
        { a: 'should have stayed', why: '"깨어 있었어야 했는데"라는 반대 뜻이 됩니다. "~하지 말았어야 했는데"는 shouldn\'t have p.p.입니다.' },
        { a: "shouldn't stay", why: '과거의 일을 후회하므로 shouldn\'t 뒤에 have + p.p.(have stayed)를 씁니다.' },
        { a: "mustn't have stayed", why: 'must는 추측을 나타냅니다. 후회는 shouldn\'t have p.p.입니다.' },
      ],
      explain: '실제로는 늦게까지 깨어 있었던 일을 후회하므로 **shouldn\'t have stayed**(= should not have stayed)입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 0,
      q: '다음 글에서 하윤이 교실 문을 열기 **전에** 일어난 일이 **아닌** 것은 무엇입니까?\n\n' + PARTY,
      choices: [
        'Her friends decorated the room with balloons.',
        "Someone wrote 'Happy Birthday, Hayun!' on the board.",
        'Hayun thought that everyone had forgotten her birthday.',
        'Hayun saw everyone smiling at her.',
      ],
      answer: 3,
      hint: 'had + p.p.로 쓴 일은 기준 시점(문을 연 때)보다 먼저 일어난 일입니다.',
      why: [
        'had decorated는 과거완료입니다. 문을 열기 전에 이미 꾸며 둔 것입니다.',
        'had written은 과거완료입니다. 문을 열기 전에 이미 써 둔 것입니다.',
        'had thought는 과거완료입니다. 문을 열기 전 아침 내내 그렇게 생각하고 있었습니다.',
        '',
      ],
      explain: '기준 시점은 하윤이 문을 연 때(opened)입니다. had decorated, had written, had thought는 그보다 먼저 일어난 일이고, 모두가 웃고 있는 것을 본 일은 **문을 연 바로 그때**의 일입니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '어법상 **틀린** 문장은 무엇입니까?',
      choices: [
        'The doctor recommended that she take a short break.',
        'They demanded that the rule be changed.',
        'I suggested that we should meet at noon.',
        'The teacher demanded that he hands in the report by Friday.',
      ],
      answer: 3,
      hint: '요구·제안 동사 뒤의 that절에서 동사의 꼴을 살펴보십시오.',
      why: [
        'recommend 뒤 that절에 (should) 생략, 동사원형 take — 바른 문장입니다.',
        'demand 뒤 that절에 (should) 생략, 동사원형 be — 바른 문장입니다.',
        'suggest 뒤 that절에 should + 동사원형 meet — 바른 문장입니다.',
        '',
      ],
      explain: 'demand 뒤의 that절은 "~해야 한다"는 요구이므로 (should) + 동사원형을 씁니다. hands가 아니라 **hand**가 바릅니다. The teacher demanded that he (should) hand in the report by Friday.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '대화의 (A), (B)에 들어갈 말로 알맞게 짝지은 것은 무엇입니까?\n\nA: Jia didn\'t come to the meeting yesterday.\nB: She (A) about it. Nobody told her.\nA: Really? Then I (B) her myself.',
      choices: [
        "(A) can't have known — (B) should have called",
        '(A) must have known — (B) should have called',
        "(A) can't have known — (B) must have called",
        '(A) should have known — (B) may have called',
      ],
      answer: 0,
      hint: '(A)는 "아무도 말해 주지 않았다"는 단서로 하는 추측, (B)는 하지 않은 일에 대한 아쉬움입니다.',
      why: [
        '',
        '아무도 알려 주지 않았다는 단서와 "알았음에 틀림없다"는 맞지 않습니다.',
        '(B)에서 말하는 사람은 자기가 전화하지 않은 일을 아쉬워합니다. must have called(전화했음에 틀림없다)는 자기 행동을 추측하는 말이 되어 어색합니다.',
        '아무도 말해 주지 않았는데 "알았어야 했다"고 탓하는 것은 흐름에 맞지 않고, (B)도 아쉬움이 아니라 추측이 됩니다.',
      ],
      explain: '(A) 아무도 말해 주지 않았으니 "알았을 리가 없다" → **can\'t have known**. (B) 직접 전화하지 않은 것을 아쉬워하므로 "내가 직접 전화했어야 했는데" → **should have called**.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 5,
      q: '(A), (B)의 빈칸에 들어갈 말로 알맞게 짝지은 것은 무엇입니까?\n\n(A) The witness insisted that he [[빈칸]] the man before. (그는 전에 그 남자를 본 적이 있다고 주장했다.)\n(B) The coach insisted that every player [[빈칸]] on time. (코치는 모든 선수가 제시간에 와야 한다고 주장했다.)',
      choices: ['(A) had seen — (B) arrive', '(A) see — (B) arrive', '(A) had seen — (B) arrived', '(A) see — (B) arrives'],
      answer: 0,
      hint: 'insist 뒤의 that절이 "사실"을 주장하는지, "~해야 한다"를 주장하는지 구별하십시오.',
      why: [
        '',
        '(A)는 "본 적이 있다"는 사실을 주장하므로 보통 시제를 씁니다. 주장한 때(insisted)보다 먼저 본 것이므로 had seen입니다.',
        '(B)는 "와야 한다"는 당위이므로 (should) + 동사원형 arrive를 씁니다.',
        '(A)는 사실 주장이라 had seen, (B)는 당위라서 동사원형 arrive입니다. 둘 다 바뀌었습니다.',
      ],
      explain: '(A)는 과거의 **사실**을 주장하므로 시제를 맞춰 **had seen**(주장한 때보다 먼저 본 일). (B)는 "~해야 한다"는 **당위**이므로 (should) + 동사원형 **arrive**입니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', concept: 1,
      q: '다음 문장에서 틀린 곳을 고치면 have 바로 뒤에 한 낱말이 옵니다. 그 낱말을 쓰십시오.\n\nI have been knowing my best friend since we were five.',
      answer: ['known'],
      hint: 'know는 동작이 아니라 상태를 나타내는 동사입니다.',
      wrong: [
        { a: 'knew', why: 'have 뒤에는 과거형이 아니라 과거분사가 옵니다. know의 과거분사는 known입니다.' },
        { a: 'been', why: 'know는 상태 동사라서 진행형(been knowing)으로 쓰지 않습니다. been을 빼고 have known으로 씁니다.' },
      ],
      explain: 'know는 상태 동사이므로 진행형으로 쓰지 않고, 계속을 나타낼 때 현재완료를 씁니다. → I have **known** my best friend since we were five.',
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 2,
      q: '빈칸에 알맞은 세 낱말을 쓰십시오.\n\nMy parents got married in October 20 years ago.\n→ By this October, my parents [[빈칸]] married for 20 years.',
      answer: ['will have been'],
      hint: 'By this October는 미래의 기준 시점입니다. be married가 그때까지 이어지는 상태입니다.',
      wrong: [
        { a: 'have been', why: '기준 시점이 지금이 아니라 미래(By this October)입니다. 미래완료 will have been을 씁니다.' },
        { a: 'had been', why: '과거완료는 과거의 기준 시점에 씁니다. By this October는 미래입니다.' },
      ],
      explain: '미래의 기준 시점(By this October)까지 결혼한 상태가 20년 동안 이어지므로 미래완료 **will have been** married입니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 3,
      q: '다음 글의 내용과 일치하는 것은 무엇입니까?\n\n' + CAKE,
      choices: [
        "Doyun thinks his sister ate some of the cake.",
        'Doyun thinks the dog ate the cake.',
        'Doyun put the cake in the fridge.',
        "Doyun's sister was in the yard all day.",
      ],
      answer: 0,
      hint: 'must have p.p., can\'t have p.p., should have p.p.의 뜻을 하나씩 확인하십시오.',
      why: [
        '',
        'it can\'t have touched the cake — 개가 케이크를 건드렸을 리가 없다고 했습니다.',
        'He should have put the cake in the fridge — 냉장고에 넣었어야 했는데(넣지 않았다)라는 뜻입니다.',
        '하루 종일 마당에 있었던 것은 여동생이 아니라 개입니다.',
      ],
      explain: 'she **must have eaten** some of it은 "여동생이 조금 먹었음에 틀림없다"는 강한 추측이므로 1번이 일치합니다. 개는 먹었을 리가 없고(can\'t have touched), 케이크는 냉장고에 넣지 않았습니다(should have put).',
    },
  ],

  deeper: [
    {
      title: '영어의 시제는 왜 이렇게 많을까? — "때"와 "모습"',
      body: '영어 동사의 형태는 두 가지를 함께 나타냅니다. 하나는 **때**(과거·현재·미래)이고, 다른 하나는 그 일이 어떤 **모습**인지(그냥 일어남·진행 중·완료됨·완료까지 계속 진행)입니다. 둘을 곱하면 12가지가 나옵니다.\n\n' +
        '| 모습 / 때 | 과거 | 현재 | 미래 |\n|---|---|---|---|\n' +
        '| 단순 | studied | study | will study |\n' +
        '| 진행 | was studying | am studying | will be studying |\n' +
        '| 완료 | had studied | have studied | will have studied |\n' +
        '| 완료진행 | had been studying | have been studying | will have been studying |\n\n' +
        '이렇게 보면 과거완료와 미래완료는 새로운 규칙이 아니라 현재완료에서 **기준 시점만 옮긴 것**입니다. 우리말은 "~했었다", "~해 오고 있었다"처럼 말을 덧붙여 나타내지만, 영어는 동사 모양 하나로 기준 시점과 모습을 함께 담습니다.\n\n' +
        '다음 단원(가정법 심화)에서는 had p.p.가 "과거 사실과 반대되는 상상"에도 쓰이는 것을 배웁니다. If I **had studied** harder, I would have passed. — 같은 모양이 다른 일을 맡는 셈입니다.',
    },
  ],

  faq: [
    {
      q: '과거완료는 before나 after가 있어도 꼭 써야 해요?',
      a: '아닙니다. before, after처럼 순서를 분명히 알려 주는 접속사가 있으면 과거시제만 써도 됩니다. I had dinner after I finished my homework.도 바른 문장입니다.\n\n과거완료가 꼭 필요한 것은 순서를 알려 주는 말이 없을 때나, 먼저 일어난 일임을 분명히 하고 싶을 때입니다. When I arrived, the train **left**.(도착하자 기차가 떠났다)와 When I arrived, the train **had left**.(도착했을 때 이미 떠나 있었다)는 뜻이 다릅니다.',
    },
    {
      q: '현재완료진행형이랑 현재완료는 뭐가 달라요?',
      a: '현재완료진행형(have been -ing)은 동작이 **지금까지 계속되고 있다**는 것을 강조하고, 현재완료(have p.p.)는 **결과·완료·경험**을 말할 때가 많습니다.\n\nI have been painting the room.(방을 칠하는 중이다 — 아직 덜 끝났을 수 있다) / I have painted the room.(방을 다 칠했다). 다만 know, have(가지다) 같은 상태 동사는 진행형이 없으니 현재완료로 계속을 나타냅니다.',
    },
    {
      q: 'must have p.p.랑 should have p.p.는 둘 다 have p.p.인데 뭐가 달라요?',
      a: 'must have p.p.는 단서를 보고 "~했음에 틀림없다"고 **추측**하는 말이고, should have p.p.는 "~했어야 했는데"라고 **후회·아쉬움**을 나타내는 말입니다.\n\nHe must have studied hard.(그는 열심히 공부했음에 틀림없다 — 아마 했다) / He should have studied hard.(그는 열심히 공부했어야 했는데 — 하지 않았다). 실제로 일어난 일이 정반대가 될 수 있으니 주의합니다.',
    },
    {
      q: 'suggest 뒤에 왜 주어가 he인데도 동사원형이 와요?',
      a: 'that절의 동사 앞에 "~해야 한다"는 뜻의 should가 숨어 있기 때문입니다. He suggested that she **(should) go** home.에서 should를 생략해도 go는 원형 그대로 남습니다.\n\n다만 suggest가 "암시하다", insist가 "사실이라고 주장하다"라는 뜻일 때는 보통 시제를 씁니다. The data suggest that the plan **is** working.',
    },
  ],

  mistakes: [
    '기준이 되는 과거가 있는데 현재완료를 쓰는 실수 — When I arrived, the movie has started (×) → had started (○). 지금이 기준이면 have p.p., 과거가 기준이면 had p.p.입니다.',
    'must have p.p.(추측)와 should have p.p.(후회)를 바꿔 쓰는 실수 — "공부를 했어야 했는데"는 I should have studied (○), I must have studied (×)입니다.',
    '요구·제안 동사 뒤 that절에 -s나 과거형을 쓰는 실수 — She suggested that he goes (×) / went (×) → he (should) go (○).',
  ],

  gens: [
    {
      id: 'modal-perfect',
      level: 1,
      title: '조동사 + have p.p.로 추측·후회하기',
      make: function (R) {
        // [영어 문장(빈칸), 우리말 뜻, 정답 종류, 과거분사]
        var items = [
          ['The ground is wet. It [[빈칸]] last night.', '땅이 젖어 있다. 어젯밤에 비가 왔음에 틀림없다.', 'must', 'rained'],
          ["Jia's eyes are red. She [[빈칸]] while watching the movie.", '지아의 눈이 빨갛다. 영화를 보면서 울었음에 틀림없다.', 'must', 'cried'],
          ['Minsu looks very tired. He [[빈칸]] up all night.', '민수는 몹시 피곤해 보인다. 밤을 새웠음에 틀림없다.', 'must', 'stayed'],
          ['Everyone is cheering. Our team [[빈칸]] the game.', '모두 환호하고 있다. 우리 팀이 경기에서 이겼음에 틀림없다.', 'must', 'won'],
          ["I can't find my wallet. I [[빈칸]] it on the bus.", '지갑을 찾을 수 없다. 버스에 두고 내렸을지도 모른다.', 'may', 'left'],
          ["Seojun isn't answering. He [[빈칸]] asleep already.", '서준이가 전화를 받지 않는다. 벌써 잠들었을지도 모른다.', 'may', 'fallen'],
          ["The package hasn't arrived. They [[빈칸]] it to the wrong address.", '소포가 오지 않았다. 그들이 엉뚱한 주소로 보냈을지도 모른다.', 'may', 'sent'],
          ['Hayun was with me all day. She [[빈칸]] the window.', '하윤이는 하루 종일 나와 함께 있었다. 그녀가 창문을 깼을 리가 없다.', 'cant', 'broken'],
          ["Doyun can't swim. He [[빈칸]] across the river by himself.", '도윤이는 수영을 못 한다. 혼자서 강을 헤엄쳐 건넜을 리가 없다.', 'cant', 'swum'],
          ['The store was closed yesterday. You [[빈칸]] this shirt there yesterday.', '그 가게는 어제 문을 닫았다. 네가 어제 거기서 이 셔츠를 샀을 리가 없다.', 'cant', 'bought'],
          ['I missed the bus. I [[빈칸]] home earlier.', '버스를 놓쳤다. 집에서 더 일찍 나섰어야 했는데.', 'should', 'left'],
          ['My plant died. I [[빈칸]] it more often.', '화분의 식물이 죽었다. 물을 더 자주 줬어야 했는데.', 'should', 'watered'],
          ['We got lost. We [[빈칸]] a map with us.', '우리는 길을 잃었다. 지도를 가져왔어야 했는데.', 'should', 'brought'],
          ['My stomach hurts. I [[빈칸]] so much ice cream.', '배가 아프다. 아이스크림을 그렇게 많이 먹지 말았어야 했는데.', 'shouldnt', 'eaten'],
          ['Jia looks upset. I [[빈칸]] those words to her.', '지아가 속상해 보인다. 그녀에게 그런 말을 하지 말았어야 했는데.', 'shouldnt', 'said'],
          ["I couldn't sleep. I [[빈칸]] coffee so late in the evening.", '잠을 잘 수 없었다. 저녁에 그렇게 늦게 커피를 마시지 말았어야 했는데.', 'shouldnt', 'drunk'],
        ];
        var it = R.pick(items);
        var key = it[2], pp = it[3];
        var others = R.shuffle(['must', 'may', 'cant', 'should', 'shouldnt'].filter(function (k) { return k !== key; }));
        var correct = MODAL[key].form + ' ' + pp;
        var reason = {};
        var wrongs = others.map(function (k) {
          var t = MODAL[k].form + ' ' + pp;
          reason[t] = MODAL[k].form + ' p.p.는 "' + MODAL[k].mean + '"라는 뜻이라 우리말 뜻과 맞지 않습니다.';
          return t;
        });
        var pick = R.choices(correct, wrongs);
        var filled = it[0].replace('[[빈칸]]', '**' + correct + '**');
        return {
          type: 'choice', concept: (key === 'should' || key === 'shouldnt') ? 4 : 3,
          q: '우리말 뜻에 맞게 빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0] + '\n(' + it[1] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '"' + MODAL[key].mean + '"의 뜻은 ' + MODAL[key].form + ' + p.p.로 나타냅니다. → ' + filled,
        };
      },
    },
    {
      id: 'perfect-tense',
      level: 2,
      title: '기준 시점에 맞는 완료 시제 고르기',
      make: function (R) {
        // [문장, 정답, [오답, 이유]…, 개념 카드]
        var items = [
          ['When we reached the theater, the movie [[빈칸]] already.', 'had started', [
            ['has started', '기준 시점이 과거(reached)입니다. 그보다 먼저 일어난 일은 과거완료로 씁니다.'],
            ['will have started', '미래완료는 미래의 기준 시점에 씁니다. 이 문장은 과거의 일입니다.'],
            ['have started', '기준 시점이 과거이고, 주어 the movie는 단수입니다. had started가 맞습니다.'],
          ], 0],
          ['I recognized the man at once because I [[빈칸]] him before.', 'had met', [
            ['have met', '알아본 때(recognized)가 과거이므로 그보다 먼저 만난 일은 had met입니다.'],
            ['will have met', '미래완료는 미래의 기준 시점에 씁니다.'],
            ['have been meeting', '기준이 과거이고, 한 번 만난 경험을 말하므로 진행형이 아니라 had met입니다.'],
          ], 0],
          ['Before I moved to Seoul, I [[빈칸]] the subway.', 'had never taken', [
            ['have never taken', '서울로 이사한 때(moved)가 과거의 기준 시점이므로 그때까지의 경험은 had never taken입니다.'],
            ['will never have taken', '미래완료는 미래의 기준 시점에 씁니다.'],
            ['never take', '과거의 일이므로 현재시제는 맞지 않습니다.'],
          ], 0],
          ['Jia [[빈칸]] the piano since she was six, and she still practices every day.', 'has been playing', [
            ['had been playing', '지금도 연습한다(still practices)고 했으므로 기준은 지금입니다. 현재완료진행형을 씁니다.'],
            ['is playing', 'since와 함께 지금까지 이어진 동작을 말할 때 현재진행형은 쓰지 않습니다.'],
            ['will have played', '미래완료는 미래의 기준 시점에 씁니다. 이 문장의 기준은 지금입니다.'],
          ], 1],
          ['The ground was wet because it [[빈칸]] all night.', 'had been raining', [
            ['has been raining', '땅이 젖어 있던 때(was)가 과거이므로 그때까지 이어진 동작은 had been raining입니다.'],
            ['will have rained', '미래완료는 미래의 기준 시점에 씁니다.'],
            ['is raining', '과거의 일을 말하는 문장이므로 현재진행형은 맞지 않습니다.'],
          ], 1],
          ['She was exhausted because she [[빈칸]] for three hours.', 'had been studying', [
            ['has been studying', '지쳐 있던 때(was)가 과거이므로 그때까지 이어진 동작은 had been studying입니다.'],
            ['will have studied', '미래완료는 미래의 기준 시점에 씁니다.'],
            ['is studying', '과거의 일을 말하는 문장이므로 현재진행형은 맞지 않습니다.'],
          ], 1],
          ['How long [[빈칸]] for the bus? You look cold.', 'have you been waiting', [
            ['had you been waiting', '지금 추워 보인다(look)고 했으므로 기준은 지금입니다. have you been waiting입니다.'],
            ['will you have waited', '미래완료는 미래의 기준 시점에 씁니다.'],
            ['have you been waited', '진행형은 been 뒤에 -ing를 씁니다. waited가 아니라 waiting입니다.'],
          ], 1],
          ['By the end of this year, I [[빈칸]] three novels in English.', 'will have read', [
            ['had read', '과거완료는 과거의 기준 시점에 씁니다. By the end of this year는 미래입니다.'],
            ['have read', 'by + 미래 시점(이 해가 끝날 때까지)이 기준이므로 미래완료를 씁니다.'],
            ['will be read', 'be read는 수동태(읽히다)입니다. 내가 읽는 것이므로 will have read입니다.'],
          ], 2],
          ['By the time you get home, I [[빈칸]] dinner.', 'will have cooked', [
            ['had cooked', '네가 집에 올 때(미래)가 기준이므로 과거완료는 맞지 않습니다.'],
            ['have been cooking', 'by the time + 미래의 일이 기준이므로 주절에는 미래완료를 씁니다.'],
            ['cooked', '과거시제로는 미래의 기준 시점까지 끝나 있을 일을 나타낼 수 없습니다.'],
          ], 2],
          ['Next month, my grandparents [[빈칸]] in this town for 50 years.', 'will have lived', [
            ['had lived', 'Next month는 미래이므로 과거완료는 맞지 않습니다.'],
            ['have lived', 'Next month(다음 달)라는 미래의 기준 시점까지 이어질 일이므로 미래완료를 씁니다.'],
            ['are living', '현재진행형으로는 "다음 달이면 50년째"라는 뜻을 나타낼 수 없습니다.'],
          ], 2],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var reason = {};
        it[2].forEach(function (w) { reason[w[0]] = w[1]; });
        var pick = R.choices(correct, R.shuffle(it[2].map(function (w) { return w[0]; })));
        var basis = ['과거의 기준 시점보다 먼저 일어난 일이므로 과거완료(had p.p.)를 씁니다.', '기준 시점까지 계속 이어진 동작이므로 완료진행형을 씁니다. 기준이 지금이면 have(has) been -ing, 과거면 had been -ing입니다.', '미래의 기준 시점까지 끝나 있거나 이어질 일이므로 미래완료(will have p.p.)를 씁니다.'][it[3]];
        return {
          type: 'choice', concept: it[3],
          q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: basis + ' → ' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'already', m: '이미, 벌써', ex: 'The train had already left when I got to the station.', exm: '내가 역에 도착했을 때 기차는 이미 떠나 있었다.' },
    { w: 'by the time', m: '~할 때쯤이면, ~할 때까지는', ex: 'By the time you arrive, we will have finished dinner.', exm: '네가 도착할 때쯤이면 우리는 저녁을 다 먹었을 것이다.' },
    { w: 'regret', m: '후회하다', ex: 'I regret not studying harder for the exam.', exm: '나는 시험공부를 더 열심히 하지 않은 것을 후회한다.' },
    { w: 'apologize', m: '사과하다', ex: 'I should have apologized to her sooner.', exm: '나는 그녀에게 더 빨리 사과했어야 했다.' },
    { w: 'suggest', m: '제안하다; 암시하다', ex: 'Jia suggested that we take a short break.', exm: '지아는 우리가 잠깐 쉬어야 한다고 제안했다.' },
    { w: 'recommend', m: '권하다, 추천하다', ex: 'The doctor recommended that he get more sleep.', exm: '의사는 그가 잠을 더 자야 한다고 권했다.' },
    { w: 'demand', m: '요구하다', ex: 'The students demanded that the library stay open later.', exm: '학생들은 도서관이 더 늦게까지 열려 있어야 한다고 요구했다.' },
    { w: 'insist', m: '주장하다, 고집하다', ex: 'He insisted that he had locked the door.', exm: '그는 자기가 문을 잠갔다고 주장했다.' },
    { w: 'graduate', m: '졸업하다', ex: 'My cousin will have graduated by next spring.', exm: '내 사촌은 내년 봄이면 졸업했을 것이다.' },
    { w: 'exhausted', m: '몹시 지친', ex: 'I was exhausted because I had been running all morning.', exm: '나는 아침 내내 달려서 몹시 지쳐 있었다.' },
    { w: 'puddle', m: '물웅덩이', ex: 'There are puddles everywhere, so it must have rained.', exm: '곳곳에 물웅덩이가 있으니 비가 왔음에 틀림없다.' },
    { w: 'decorate', m: '장식하다, 꾸미다', ex: 'My friends had decorated the room with balloons.', exm: '친구들이 방을 풍선으로 꾸며 놓았다.' },
    { w: 'witness', m: '목격자; 목격하다', ex: 'The witness said that he had seen a blue car.', exm: '목격자는 파란 차를 봤다고 말했다.' },
    { w: 'field trip', m: '현장 체험 학습', ex: 'We have been planning the field trip for weeks.', exm: '우리는 몇 주째 현장 체험 학습을 계획해 오고 있다.' },
  ],
});
})();
