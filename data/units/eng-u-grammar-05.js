/* 대학 영어: 문법과 독해 · 조동사·가정법과 완곡 표현
 * 예문·지문은 모두 직접 쓴 글이다(가상의 연구·상황). 실제 논문·교재의 문장을 옮기지 않았다.
 * 영어 낱말 바로 뒤에는 조사를 붙이지 않는다(낱말 뒤에 '쪽·꼴·문장·표현' 같은 우리말을 둔다). */
(function () {
  // 짧은 연구 요약 (가상의 연구)
  var WALK = 'A small study followed 40 students who took a ten-minute walk before their morning classes. On average, these students reported feeling more alert than students who did not walk. The authors note that the study relied on self-reports and did not measure test scores. They conclude that short walks may help some students feel more awake in class.';
  // 문장 번호가 붙은 짧은 글 (가상의 연구)
  var WETLAND = '(1) Coastal wetlands store large amounts of carbon in their soil. (2) Our measurements suggest that the wetland in this study stored more carbon than nearby forests. (3) This difference might reflect the wet, low-oxygen soil, which slows down decay. (4) However, we measured only one wetland over two years, so the pattern may not hold elsewhere.';

  // 생성기용: 조동사 + have p.p. 의 뜻
  var PERFECT_MEANING = {
    'must have': '"틀림없이 ~했을 것이다"(강한 추론)',
    'might have': '"~했을지도 모른다"(약한 추측)',
    "can't have": '"~했을 리 없다"(불가능하다는 추론)',
    'should have': '"~했어야 했는데 (하지 않았다)"(후회·비판)',
    'had to': '"~해야 했다"(과거의 의무, 추측이 아님)',
  };

Tutor.registerUnit({
  id: 'eng-u-grammar-05',
  course: 'eng-u-grammar',
  title: '조동사·가정법과 완곡 표현',
  summary: '조동사와 가정법이 확신의 정도를 조절하는 방식을 익혀 학술 글의 조심스러운 주장을 읽어 냅니다.',
  goals: [
    'must, may, might, could 등이 나타내는 가능성의 정도를 구별할 수 있다.',
    'suggest, appear to, likely, arguably 같은 완곡 표현이 주장의 강도를 어떻게 바꾸는지 설명할 수 있다.',
    '조동사 + have p.p. 꼴과 가정법(도치 포함)으로 표현한 과거 추론과 가설을 정확히 해석할 수 있다.',
    '단정적 주장과 완곡한 주장을 구별하여 글쓴이가 실제로 주장하는 범위를 파악할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '가능성의 정도: must, may, might, could',
      body: '학술 글은 사실을 단정하기보다 **얼마나 확실한지**를 함께 밝힙니다. 그 첫 도구가 조동사입니다. 이때 조동사는 "~해야 한다(의무)"가 아니라 **"~일 것이다(추측)"**의 뜻으로 쓰입니다.\n\n' +
        '| 확신의 정도 | 조동사 | 예문과 뜻 |\n|---|---|---|\n' +
        '| 거의 확실하다 (긍정) | must | The error **must** come from the sensor. (틀림없이 센서에서 생긴 오류다) |\n' +
        '| 그럴 수 있다 | may | The error **may** come from the sensor. (센서에서 생긴 오류일 수 있다) |\n' +
        '| 그럴 수도 있다 (조금 더 조심스럽게) | might, could | The error **might** come from the sensor. (센서 때문일지도 모른다) |\n' +
        '| 거의 확실하다 (부정) | can\'t, cannot | The error **cannot** come from the sensor. (센서 때문일 리 없다) |\n\n' +
        'must 문장의 확신은 증거에서 끌어낸 **논리적 추론**에서 나옵니다. 반면 may·might·could 문장은 "그럴 가능성이 있다"는 것만 말하고 **다른 설명의 여지**를 남겨 둡니다. 두 조동사 may·might 사이의 차이는 크지 않으며, 대개 might 쪽을 조금 더 조심스러운 말로 씁니다.\n\n' +
        '> ⚠️ 추측의 must 표현을 부정할 때는 mustn\'t 꼴이 아니라 **can\'t(cannot)** 꼴을 씁니다. mustn\'t 표현은 "~하면 안 된다(금지)"라는 뜻입니다.\n\n' +
        '> 💡 같은 must 문장이라도 뜻이 둘입니다. You **must** submit the form today.(오늘 제출해야 한다 — 의무) / The form **must** be lost.(틀림없이 분실되었다 — 추측). 사람이 할 **행동**이면 의무, **상태·사실**에 대한 판단이면 추측인 경우가 많습니다.',
      easy: '하늘을 보고 비를 예상하는 장면을 떠올려 보십시오.\n\n' +
        '- 먹구름이 몰려오고 천둥까지 치면 "곧 비가 오겠다"고 거의 확신합니다. → must\n' +
        '- 구름이 조금 끼었으면 "비가 올 수도 있겠다" 정도로 말합니다. → may, might, could\n' +
        '- 구름 한 점 없이 맑으면 "비가 올 리 없다"고 말합니다. → can\'t\n\n' +
        '영어 조동사도 이렇게 **증거가 얼마나 강한지**에 따라 골라 씁니다. 글쓴이가 고른 조동사를 보면 그 사람이 얼마나 확신하는지 알 수 있습니다.',
      check: {
        type: 'choice',
        q: '세 문장 가운데 글쓴이의 확신이 **가장 강한** 문장은 무엇입니까?',
        choices: [
          'The leak must be in the upper pipe.',
          'The leak may be in the upper pipe.',
          'The leak might be in the upper pipe.',
        ],
        answer: 0,
        why: [
          '',
          'may 문장은 "그럴 수 있다"는 가능성만 말합니다. 다른 곳일 수 있다는 여지를 남깁니다.',
          'might 문장은 "그럴지도 모른다"는 조심스러운 추측으로, 세 문장 가운데 확신이 가장 약한 편입니다.',
        ],
        explain: '추측의 must 표현은 "틀림없이 ~이다"라는 강한 추론입니다. may·might 문장은 가능성만 열어 두므로 must 문장보다 확신이 약합니다.',
      },
    },
    {
      title: '확신을 조절하는 부사·형용사·동사',
      body: '조동사 말고도 부사·형용사·동사로 주장의 강도를 조절합니다. 확신을 낮추는 표현을 **완곡 표현(hedging)**, 높이는 표현을 **강조 표현(booster)**이라고 합니다.\n\n' +
        '| 품사 | 확신을 낮추는 말 (완곡) | 확신을 높이는 말 (강조) |\n|---|---|---|\n' +
        '| 부사 | possibly, probably, perhaps, arguably | clearly, certainly, undoubtedly |\n' +
        '| 형용사 | likely, possible | certain, clear, evident |\n' +
        '| 동사 | suggest, indicate, appear to, seem to, tend to | show, demonstrate, prove |\n\n' +
        '- The results **suggest** that sleep helps memory. (결과는 ~임을 **시사한다** — 그렇게 볼 만한 근거가 있다)\n' +
        '- The results **prove** that sleep helps memory. (결과는 ~임을 **증명한다** — 의심의 여지가 없다)\n' +
        '- The drug **appears to** reduce pain. (통증을 줄이는 **것으로 보인다** — 관찰한 범위 안에서)\n' +
        '- Prices **are likely to** rise. (오를 **가능성이 크다** — will rise 문장보다 조심스럽다)\n' +
        '- This is **arguably** the most important factor. (이견이 있을 수 있지만 **가장 중요한 요인이라고 할 만하다**)\n\n' +
        'arguably 표현은 글쓴이가 그 판단 쪽으로 기울어 있으면서도 **반론의 여지를 인정**할 때 씁니다. 완곡 표현은 여러 개가 겹치기도 합니다: The data **may suggest** … 문장은 suggest 하나만 쓴 문장보다 더 조심스럽습니다.',
      easy: '친구에게 식당을 추천하는 세 가지 말을 비교해 보십시오.\n\n' +
        '1. "거기 무조건 맛있어. 내가 보증해." — 강하게 단정합니다.\n' +
        '2. "거기 맛있는 것 같아." — 자기 경험 안에서 조심스럽게 말합니다.\n' +
        '3. "아마 네 입맛에도 맞을 거야." — 가능성이 크다고 봅니다.\n\n' +
        '영어의 prove·demonstrate 쪽은 1번, appear to·seem to·suggest 쪽은 2번, likely·probably 쪽은 3번에 가깝습니다. 낱말 하나가 바뀌면 같은 내용도 주장의 무게가 달라집니다.',
      check: {
        type: 'ox',
        q: '다음 두 문장 가운데 (A)가 더 조심스러운(완곡한) 주장이다.\n\n(A) The data prove that sleep improves memory.\n(B) The data suggest that sleep improves memory.',
        answer: false,
        explain: '(A)의 prove 표현은 "증명한다"로 확신이 가장 강한 동사입니다. (B)의 suggest 표현은 "시사한다"로 확신을 낮춘 완곡 표현이므로, 더 조심스러운 주장은 (B)입니다.',
      },
    },
    {
      title: '조동사 + have p.p. 꼴로 과거 추론하기',
      body: '**과거의 일**을 추측하거나 돌아볼 때는 "조동사 + have + 과거분사(p.p.)"를 씁니다. 조동사가 나타내는 확신의 정도는 앞 카드와 같고, have p.p. 부분이 그 일이 **과거**에 있었음을 알려 줍니다.\n\n' +
        '| 꼴 | 뜻 | 예 |\n|---|---|---|\n' +
        '| must have p.p. | 틀림없이 ~했을 것이다 | The river **must have flooded** here; the soil is full of mud layers. |\n' +
        '| may / might have p.p. | ~했을지도 모른다 | The samples **may have been contaminated** during transport. |\n' +
        '| could have p.p. | ~했을 수도 있다 | Other factors **could have affected** the result. |\n' +
        '| can\'t / couldn\'t have p.p. | ~했을 리 없다 | The letter **can\'t have been written** in 1800; it mentions a telephone. |\n' +
        '| should have p.p. | ~했어야 했는데 (하지 않았다) | The researchers **should have used** a larger sample. |\n\n' +
        '학술 글에서 must / may have p.p. 표현은 결과의 **원인을 추론**할 때, should have p.p. 표현은 앞선 연구의 **한계를 지적**할 때 자주 나옵니다.\n\n' +
        '> ⚠️ must have p.p. 꼴은 "과거에 ~해야 했다(의무)"가 아닙니다. 과거의 의무는 had to 표현으로 나타냅니다.\n\n' +
        '> 💡 could have p.p. 표현에는 "~했을 수도 있다(가능성)" 말고 "~할 수 있었는데 하지 않았다(아쉬움)"라는 뜻도 있습니다. 앞뒤 문맥으로 구별합니다.',
      easy: '탐정이 되어 보십시오. 친구가 젖은 우산을 들고 들어왔습니다. 여러분은 "밖에 비가 왔구나"라고 **추론**하지요. 이것이 It **must have rained**.입니다.\n\n' +
        '반대로 창밖 땅이 바싹 말라 있다면 "비가 왔을 리 없어" — It **can\'t have rained**.\n\n' +
        '그리고 우산이 없어서 흠뻑 젖었다면 "우산을 챙겼어야 했는데!" — I **should have taken** an umbrella. 이것은 추측이 아니라 **후회**입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 가장 알맞은 말은 무엇입니까?\n\nThe road was completely dry this morning, and there were no puddles anywhere. It ___ rained last night.',
        choices: ["can't have", 'must have', 'should have'],
        answer: 0,
        why: [
          '',
          '증거(마른 길, 물웅덩이 없음)와 반대 방향의 추론입니다. must have 표현은 "틀림없이 비가 왔다"는 뜻입니다.',
          'should have 표현은 "~했어야 했는데"라는 후회·비판입니다. 비가 왔는지 추론하는 문장에는 맞지 않습니다.',
        ],
        explain: '길이 말라 있고 물웅덩이도 없다는 증거로 보아 "어젯밤 비가 왔을 리 없다"고 추론하는 문장입니다. 그래서 can\'t have rained 꼴이 알맞습니다.',
      },
    },
    {
      title: '가정법으로 가설과 조건 제시하기',
      body: '학술 글은 아직 확인되지 않은 가설이나 실제와 다른 조건을 **가정법**으로 세워 봅니다. 동사의 시제를 한 단계 **과거 쪽으로 옮겨** "현실과 거리가 있는 가정"임을 나타냅니다.\n\n' +
        '| 꼴 | 가리키는 때 | 예 |\n|---|---|---|\n' +
        '| If + 과거형(be동사는 were), would + 동사원형 | 지금·일반 (사실과 다르거나 확인되지 않은 가정) | If this theory **were** correct, we **would see** the same pattern in every region. |\n' +
        '| If + had p.p., would have p.p. | 과거 (실제로 일어난 일과 반대) | If the team **had measured** the temperature, they **would have noticed** the error. |\n\n' +
        '격식 있는 글에서는 if 없이 **주어와 동사의 순서를 바꾸어**(도치) 같은 조건을 나타내기도 합니다.\n\n' +
        '| if 절이 있는 꼴 | 도치한 꼴 |\n|---|---|\n' +
        '| If this were the case, … | **Were this the case**, … |\n' +
        '| If the team had measured the temperature, … | **Had the team measured** the temperature, … |\n' +
        '| If further evidence should appear, … | **Should further evidence appear**, … |\n\n' +
        'Should 낱말로 시작하는 꼴은 "혹시라도 ~한다면"처럼 **일어날 가능성이 낮은 미래 조건**에 씁니다. 이 꼴의 주절에는 will·would·명령문이 모두 올 수 있습니다.\n\n' +
        '> 💡 가정법을 만나면 **실제 사실은 반대**라는 것을 함께 읽습니다. Had the sample been larger, … → 실제로는 표본이 크지 않았습니다.',
      easy: '"내가 새라면 바다를 건너 날아갈 텐데."라는 말을 하는 사람은 실제로 새가 아닙니다. 영어는 이런 "현실이 아닌 이야기"를 할 때 동사를 **한 칸 뒤(과거 쪽)로 물려서** 현실과 거리를 둡니다.\n\n' +
        '- 지금 이야기인데 과거형(were) → "지금 그렇지 않다"\n' +
        '- 지난 이야기인데 한 칸 더 뒤(had p.p.) → "그때 그렇지 않았다"\n\n' +
        '도치 꼴(Were this the case, …)은 if 자리를 동사가 대신 차지한 것뿐입니다. 쉼표 뒤에 문장이 이어지면 질문이 아니라 "만약 ~라면"으로 읽으십시오.',
      check: {
        type: 'short', check: 'text',
        q: 'if 없이 같은 뜻이 되도록 빈칸에 알맞은 **한 낱말**을 쓰십시오.\n\nIf this were the case, the theory would need revision.\n→ ___ this the case, the theory would need revision.',
        answer: ['Were'],
        wrong: [
          { a: 'Was', why: '도치 가정법에서는 주어가 단수여도 Were 꼴을 씁니다. Was this the case 꼴은 일반 의문문처럼 읽힙니다.' },
          { a: 'If', why: 'If 낱말을 그대로 두면 동사가 빠진 문장이 됩니다. If 낱말을 빼는 대신 동사 were 꼴을 주어 앞으로 옮깁니다.' },
        ],
        explain: 'If this were the case 절에서 if 낱말을 빼고 동사 were 꼴을 주어(this) 앞으로 옮기면 **Were this the case** 꼴이 됩니다. "만약 이것이 사실이라면, 그 이론은 수정이 필요할 것이다"라는 뜻입니다.',
      },
    },
    {
      title: '단정적 주장과 완곡한 주장 구별하기',
      body: '같은 연구 결과도 어떻게 쓰느냐에 따라 주장의 강도가 크게 달라집니다.\n\n' +
        '| 단정적 주장 | 완곡한 주장 |\n|---|---|\n' +
        '| Social media causes loneliness. | Heavy social media use **may contribute to** loneliness **in some teenagers**. |\n' +
        '| The new method is better. | The new method **appears to** be more accurate **under these conditions**. |\n\n' +
        '완곡한 주장에는 조동사·완곡 동사뿐 아니라 **범위를 좁히는 말**(in some cases, for some students, under these conditions, to some extent)도 함께 쓰입니다.\n\n' +
        '학술 글쓴이가 완곡하게 쓰는 까닭은 다음과 같습니다.\n\n' +
        '1. 증거가 보여 주는 **범위만큼만** 정확히 말하기 위해서\n' +
        '2. **다른 해석의 여지**를 인정하기 위해서\n' +
        '3. 예상되는 **반론**에 미리 대비하기 위해서\n\n' +
        '그러므로 완곡한 글은 약한 글이 아니라 **정확한 글**입니다. 읽을 때는 결론 문장의 확신 표지를 찾아, 글쓴이가 **실제로 주장한 것**과 독자가 부풀려 받아들이기 쉬운 것을 구별해야 합니다.\n\n' +
        '> ⚠️ 요약이나 선택지에서 may → will, suggest → prove, some → all 처럼 바뀌었다면 원문보다 **센 주장**으로 바뀐 것입니다.',
      easy: '반 대항 축구 시합을 앞두고 두 친구가 말합니다.\n\n' +
        '- 친구 A: "우리 반이 무조건 이겨."\n' +
        '- 친구 B: "지금까지 연습 경기 기록을 보면, 우리 반이 이길 가능성이 커."\n\n' +
        'B의 말이 더 자신 없어 보이지만 실제로는 **근거와 범위**를 정확히 밝힌 말입니다. 학술 글이 B처럼 쓰는 것도 같은 까닭입니다. 읽는 사람은 B의 말을 "무조건 이긴다"로 바꾸어 전하면 안 됩니다.',
      check: {
        type: 'choice',
        q: '다음 가운데 가장 **완곡한** 주장은 무엇입니까?',
        choices: [
          'Online classes clearly improve grades.',
          'Online classes improve grades.',
          'Online classes may help some students.',
        ],
        answer: 2,
        why: [
          'clearly 표현은 확신을 높이는 강조 표현입니다. 가장 단정적인 문장입니다.',
          '아무 확신 표지 없이 사실처럼 단정한 문장입니다.',
          '',
        ],
        explain: '가능성을 나타내는 may 표현과 범위를 좁히는 some students 표현이 함께 쓰여 가장 조심스러운 주장입니다. clearly 문장이 가장 강하고, 표지가 없는 문장은 그 중간에서 사실처럼 단정합니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 세 문장을 글쓴이의 확신이 **강한 것부터** 차례로 늘어놓고 근거를 말해 보십시오.\n\n(A) The new policy might reduce traffic.\n(B) The new policy will reduce traffic.\n(C) The new policy is likely to reduce traffic.',
      steps: [
        '확신 표지를 찾습니다. (A) might, (B) will, (C) is likely to.',
        '(B)의 will 표현은 앞날의 일을 거의 사실처럼 단정하는 예측입니다. 가장 강합니다.',
        '(C)의 is likely to 표현은 "~할 가능성이 크다"는 뜻으로, 단정은 피하지만 그쪽으로 기울어 있습니다.',
        '(A)의 might 표현은 "~할지도 모른다"는 뜻으로, 가능성만 열어 두는 가장 조심스러운 말입니다.',
      ],
      answer: '(B) → (C) → (A)',
    },
    {
      q: '다음 문장에서 **실제 사실**과 글쓴이의 **추측**을 구별해 보십시오.\n\nHad the survey included older adults, the results might have looked different.',
      steps: [
        '문장 첫머리의 Had the survey included 꼴은 if 없이 쓴 도치 가정법입니다. = If the survey had included older adults',
        'had p.p. 꼴의 가정법은 과거 사실과 반대입니다. 그러므로 실제로는 조사에 노인이 **포함되지 않았습니다**.',
        '주절의 might have looked 표현은 "달라 보였을지도 모른다"는 뜻으로, 확신이 낮은 추측입니다.',
        '글쓴이가 말하려는 것: 이 조사 결과를 노인에게까지 넓혀 적용하기는 어렵다는 **연구의 한계**입니다.',
      ],
      answer: '사실: 조사 대상에 노인이 없었다. 추측: 노인이 포함되었다면 결과가 달랐을 수도 있다(확신 낮음).',
    },
  ],

  terms: [
    { term: '완곡 표현 (hedging)', def: '주장의 확신 정도를 낮추어 조심스럽게 말하는 표현입니다. 예: may, might, suggest, appear to, likely, in some cases' },
    { term: '강조 표현 (booster)', def: '주장의 확신을 높이는 표현입니다. 예: clearly, certainly, demonstrate, prove' },
    { term: '추측의 조동사', def: '의무·허가가 아니라 가능성과 확신의 정도를 나타내는 조동사의 쓰임입니다. 예: The answer must be wrong.(틀림없이 틀렸다)' },
    { term: '조동사 + have p.p.', def: '과거의 일에 대한 추측이나 후회를 나타내는 꼴입니다. 예: must have rained(틀림없이 비가 왔다), should have checked(확인했어야 했다)' },
    { term: '가정법 과거', def: 'If + 과거형, would + 동사원형. 지금의 사실과 다르거나 확인되지 않은 일을 가정합니다. 예: If this were true, we would see …' },
    { term: '가정법 과거완료', def: 'If + had p.p., would have p.p. 과거에 실제로 일어난 일과 반대되는 일을 가정합니다.' },
    { term: '도치 가정법', def: 'if 없이 Were·Had·Should 낱말을 주어 앞으로 옮긴 격식 있는 조건 표현입니다. 예: Were this the case, …' },
    { term: '단정적 주장', def: '확신 표지 없이, 또는 강조 표현으로 사실처럼 단정하는 주장입니다. 예: X causes Y.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 가장 알맞은 말은 무엇입니까?\n\nThe lights in the lab are on, and someone\'s coat is on the chair. Someone ___ be working there now.',
      choices: ['must', "can't", 'had to', 'need not'],
      answer: 0,
      why: [
        '',
        '불이 켜져 있고 외투가 있다는 증거와 반대 방향의 추론입니다. can\'t 표현은 "~일 리 없다"라는 뜻입니다.',
        'had to 표현은 과거의 의무("~해야 했다")입니다. 지금 상황에 대한 추측이 아닙니다.',
        'need not 표현은 "~할 필요가 없다"는 뜻입니다. 추측을 나타내지 않습니다.',
      ],
      explain: '불이 켜져 있고 의자에 외투가 있다는 증거에서 "지금 누군가 틀림없이 일하고 있다"고 추론하는 문장입니다. 추측의 **must** 표현이 알맞습니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '추측의 must 문장(틀림없이 ~이다)과 반대되는 "~일 리 없다"는 뜻은 mustn\'t 꼴로 나타낸다.',
      answer: false,
      explain: 'mustn\'t 표현은 "~하면 안 된다(금지)"라는 뜻입니다. "~일 리 없다"는 **can\'t(cannot)** 꼴로 씁니다. 예: The result can\'t be a coincidence.(그 결과가 우연일 리 없다)',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '다음 문장에서 굵게 쓴 부분의 역할로 가장 알맞은 것은 무엇입니까?\n\nThe findings **appear to** support the theory.',
      choices: [
        '주장의 확신을 낮춘다.',
        '주장을 의심의 여지가 없을 만큼 강하게 만든다.',
        '결과가 처음으로 나타났다는 시간의 순서를 알린다.',
        '앞 문장과 반대되는 내용이 나온다는 것을 알린다.',
      ],
      answer: 0,
      why: [
        '',
        '강하게 만드는 것은 clearly, prove 같은 강조 표현입니다. appear to 표현은 반대로 확신을 낮춥니다.',
        'appear 낱말에 "나타나다"라는 뜻이 있지만, 여기서는 "~인 것으로 보인다"라는 완곡 표현입니다.',
        '반대 내용을 이끄는 말은 however, whereas 같은 연결어입니다.',
      ],
      explain: 'appear to 표현은 "~인 것으로 보인다"는 뜻으로, 관찰한 범위 안에서 조심스럽게 말하는 **완곡 표현**입니다. The findings support the theory. 문장보다 확신이 낮습니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 1,
      q: '다음 문장에서 확신을 **높이는** 동사를 찾아 쓰십시오(문장에 나온 꼴 그대로 한 낱말).\n\nThe new data demonstrate that the treatment works, while earlier studies only suggested a small effect.',
      answer: ['demonstrate', 'demonstrates'],
      wrong: [
        { a: 'suggested', why: 'suggest(시사하다) 동사는 확신을 낮추는 완곡 표현입니다. 앞선 연구는 "작은 효과를 시사했을 뿐"이라고 했습니다.' },
        { a: 'works', why: 'works 낱말은 "효과가 있다"는 내용 자체입니다. 주장의 강도를 조절하는 동사가 아닙니다.' },
      ],
      explain: '**demonstrate**(입증하다) 동사는 prove, show 동사와 함께 확신을 높이는 강조 표현입니다. 문장은 새 자료의 강한 결론과 앞선 연구의 약한 결론(only suggested)을 맞세웁니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 가장 알맞은 말은 무엇입니까?\n\nTraces of olive oil were found inside this ancient jar. It ___ used for storing oil.',
      choices: ["can't have been", 'should have been', 'must have been', 'had to be'],
      answer: 2,
      why: [
        '안쪽에서 올리브유 흔적이 나왔다는 증거와 반대 방향의 추론입니다.',
        'should have been 표현은 "~했어야 했는데"라는 후회·비판입니다. 과거 용도를 추론하는 문장에 맞지 않습니다.',
        '',
        'had to be 표현은 과거의 의무("~되어야 했다")입니다. 증거로 과거를 추론하는 뜻이 아닙니다.',
      ],
      explain: '항아리 안의 올리브유 흔적이라는 증거에서 "틀림없이 기름을 담는 데 쓰였을 것이다"라고 과거를 추론합니다. 그래서 **must have been** used 꼴입니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 3,
      q: '현재 사실과 반대되는 가정이 되도록 빈칸에 알맞은 **한 낱말**을 쓰십시오(격식 있는 학술 문체).\n\nIf the sample size ___ larger, the results would be more reliable.',
      answer: ['were'],
      wrong: [
        { a: 'was', why: '일상 회화에서는 was 꼴도 들리지만, 학술 글과 격식체의 가정법에서는 주어가 단수여도 were 꼴을 씁니다.' },
        { a: 'is', why: '현재형 is 꼴은 실제로 일어날 수 있는 조건을 말할 때 씁니다. 주절의 would 표현과 짝이 맞지 않습니다.' },
      ],
      explain: '주절이 would + 동사원형이므로 지금 사실과 반대되는 **가정법 과거**입니다. if 절의 be동사는 **were** 꼴을 씁니다. 실제로는 표본이 크지 않다는 뜻이 함께 담깁니다.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 4,
      q: '다음 문장의 글쓴이는 운동이 **모든** 사람의 스트레스를 줄인다고 주장한다.\n\nRegular exercise may reduce stress in some adults.',
      answer: false,
      explain: '가능성을 나타내는 may 표현과 in some adults(일부 성인)라는 범위 제한이 있으므로 "일부 성인의 스트레스를 줄일 수 있다"는 완곡한 주장입니다. "모든 사람"은 원문보다 넓힌 지나친 해석입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 3,
      q: '다음 문장에서 알 수 있는 **실제 사실**은 무엇입니까?\n\nHad the researchers checked the equipment, they would have found the error.',
      choices: [
        '연구자들은 장비를 점검하고 오류를 찾아냈다.',
        '연구자들은 장비를 점검하지 않았다.',
        '연구자들은 앞으로 장비를 점검할 계획이다.',
        '장비에는 처음부터 오류가 전혀 없었다.',
      ],
      answer: 1,
      why: [
        '가정법 과거완료는 과거 사실과 반대입니다. 실제로는 점검하지 않았고 오류도 찾지 못했습니다.',
        '',
        'Had + p.p. 꼴은 과거에 대한 가정입니다. 앞날의 계획을 말하지 않습니다.',
        '"점검했다면 오류를 찾았을 것"이라고 했으므로 오류는 실제로 있었습니다.',
      ],
      hint: 'Had the researchers checked … = If the researchers had checked … 입니다.',
      explain: 'Had the researchers checked 꼴은 If the researchers had checked 꼴을 도치한 **가정법 과거완료**입니다. 과거 사실과 반대이므로 실제로는 **장비를 점검하지 않았고**, 그래서 오류를 놓쳤습니다.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 3,
      q: 'if 없이 쓴 가정의 문장이 되도록 늘어놓으십시오.\n\n(만약 이것이 사실이라면, 그 이론은 수정이 필요할 것이다.)',
      choices: ['Were', 'this', 'the case,', 'the theory', 'would need', 'revision.'],
      answer: [0, 1, 2, 3, 4, 5],
      hint: 'If this were the case 절에서 if 낱말을 빼면 동사가 어디로 가는지 생각해 보십시오.',
      explain: 'If this were the case → **Were this the case**. 그 뒤에 주절 the theory would need revision 부분이 이어집니다: Were this the case, the theory would need revision.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '다음 글의 결론을 원문의 강도 그대로 옮긴 것은 무엇입니까?\n\n' + WALK,
      choices: [
        'Short walks raise every student\'s test scores.',
        'Short walks have no effect on how students feel.',
        'Short walks might make some students feel more alert.',
        'The study proves that walking is the best way to wake up.',
      ],
      answer: 2,
      why: [
        '연구는 시험 점수를 재지 않았고(did not measure test scores), "모든 학생"이라고 하지도 않았습니다.',
        '걸은 학생들이 더 또렷하다고 응답했다는 결과와 반대입니다.',
        '',
        'proves, the best 같은 센 말로 바꾼 지나친 해석입니다. 원문은 may help some students 표현으로 조심스럽게 말했습니다.',
      ],
      hint: '마지막 문장의 may, some students 표현을 그대로 살린 선택지를 찾으십시오.',
      explain: '결론 문장은 short walks **may** help **some** students feel more awake 입니다. 가능성(may → might)과 범위(some students)를 그대로 살린 선택지가 정확합니다. 연구가 자기 보고(self-reports)에만 기댔다는 한계도 완곡하게 쓴 까닭입니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 2,
      q: '"~했어야 했는데 (하지 않았다)"라는 뜻이 되도록 빈칸에 알맞은 **두 낱말**(조동사 + have)을 쓰십시오.\n\nThe survey ___ included a wider age range; as it stands, the results apply only to teenagers.',
      answer: ['should have', "should've"],
      wrong: [
        { a: 'must have', why: 'must have 표현은 "틀림없이 ~했다"는 추론입니다. 조사가 넓은 연령대를 포함했다는 뜻이 되어 뒤 문장과 맞지 않습니다.' },
        { a: 'could have', why: 'could have 표현도 아쉬움을 나타낼 수 있지만 "~할 수도 있었다"에 가깝습니다. 문제에서 요구한 "~했어야 했다"(비판)는 should have 꼴입니다.' },
      ],
      explain: '**should have** included 꼴은 "포함했어야 했는데 (그러지 않았다)"는 비판입니다. 뒤 문장 as it stands, the results apply only to teenagers(지금으로서는 결과가 십대에게만 적용된다)가 그 한계를 확인해 줍니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', fixed: true, concept: 0,
      q: '다음 글에서 결과의 **원인을 추측한** 문장은 무엇입니까?\n\n' + WETLAND,
      choices: ['(1)', '(2)', '(3)', '(4)'],
      answer: 2,
      why: [
        '(1)은 확신 표지 없이 일반적인 사실로 말한 배경 문장입니다.',
        '(2)는 suggest 표현으로 측정 결과 자체를 조심스럽게 보고한 문장입니다. 원인은 말하지 않습니다.',
        '',
        '(4)는 연구의 한계(습지 한 곳, 2년)를 밝히며 일반화를 조심하는 문장입니다.',
      ],
      hint: '"이 차이는 ~ 때문일지도 모른다"에 해당하는 문장을 찾으십시오.',
      explain: '(3) This difference **might reflect** the wet, low-oxygen soil … 문장은 측정에서 나타난 차이(습지가 숲보다 탄소를 더 많이 저장함)의 **원인**을 might 표현으로 조심스럽게 추측합니다. (2)는 결과 보고, (4)는 한계 진술입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '높은 산꼭대기의 바위에서 바다 생물의 화석이 발견되었습니다. 이 증거로 할 수 있는 추론을 가장 알맞게 나타낸 문장은 무엇입니까?',
      choices: [
        'This rock should have been under the sea long ago.',
        'This rock can\'t have been under the sea long ago.',
        'This rock had to be under the sea long ago.',
        'This rock must have been under the sea long ago.',
      ],
      answer: 3,
      why: [
        'should have been 표현은 "~했어야 했는데 그러지 않았다"는 후회·비판입니다. 증거로 과거를 추론하는 문장이 아닙니다.',
        '바다 생물 화석이라는 증거와 정반대의 추론입니다.',
        'had to be 표현은 과거의 의무를 나타냅니다. 추측의 뜻이 없습니다.',
        '',
      ],
      explain: '바다 생물의 화석은 그 바위가 생길 때 바다 밑이었다는 강한 증거입니다. 그래서 "오래전에 틀림없이 바다 밑에 있었을 것이다" — **must have been** 꼴이 알맞습니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 3,
      q: 'if 없이 같은 뜻이 되도록 빈칸에 알맞은 **한 낱말**을 쓰십시오.\n\nIf further tests should confirm this result, the method could be used in other laboratories.\n→ ___ further tests confirm this result, the method could be used in other laboratories.',
      answer: ['Should'],
      wrong: [
        { a: 'Were', why: 'Were 꼴은 be동사 were 낱말이 있는 조건(If this were …)을 도치할 때 씁니다. 이 문장의 if 절에는 should 낱말이 있습니다.' },
        { a: 'Had', why: 'Had 꼴은 If … had p.p.(과거 반대)를 도치할 때 씁니다. 이 문장은 앞날의 조건입니다.' },
      ],
      explain: 'If further tests should confirm … 절에서 if 낱말을 빼고 should 낱말을 주어 앞으로 옮기면 **Should further tests confirm** … 꼴이 됩니다. "혹시 추가 실험이 이 결과를 확인해 준다면"이라는 앞날의 조건입니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 원문의 주장 강도를 **바꾸지 않고** 줄여 쓴 문장은 무엇입니까?\n\nThe results suggest that early reading at home is likely to be one of several factors related to later vocabulary size.',
      choices: [
        'Early home reading is the main cause of a large vocabulary.',
        'Early home reading has nothing to do with vocabulary size.',
        'Early home reading is probably one factor linked to later vocabulary.',
        'Reading at home early in life guarantees a large vocabulary for every child.',
      ],
      answer: 2,
      why: [
        '원문은 "여러 요인 가운데 하나(one of several factors)"라고 했습니다. "주된 원인(the main cause)"은 지나친 단정입니다.',
        '원문은 관련이 있을 가능성이 크다고 했습니다. 정반대의 해석입니다.',
        '',
        'guarantees, every child 같은 센 말로 부풀렸습니다. 원문은 suggest, likely 표현으로 두 번 확신을 낮추었습니다.',
      ],
      hint: '원문에서 확신을 낮춘 suggest·likely, 범위를 좁힌 one of several factors 표현이 살아 있는지 확인하십시오.',
      explain: '원문은 suggest, is likely to 표현으로 확신을 낮추고 one of several factors, related to 표현으로 주장을 좁혔습니다. probably(가능성 큼), one factor(여러 요인 가운데 하나), linked to(관련됨) 세 표현이 이 강도를 그대로 지킵니다.',
    },
  ],

  deeper: [
    {
      title: '완곡 표현은 학술 공동체의 예절이자 정확성',
      body: '과학과 학문의 주장은 **새 증거가 나오면 바뀔 수 있다**는 전제 위에 서 있습니다. 그래서 연구자는 자기 자료가 보여 주는 범위를 넘어서 말하지 않으려고 suggest, may, appear to 같은 표현을 고릅니다. 이는 자신이 없어서가 아니라, 다른 연구자가 검증하고 반박할 여지를 남기는 **학문적 예절**입니다.\n\n' +
        '그렇다고 완곡 표현이 많을수록 좋은 것은 아닙니다. 모든 문장에 may, possibly, to some extent 표현을 겹겹이 붙이면(지나친 완곡, over-hedging) 글쓴이가 무엇을 주장하는지 알 수 없게 됩니다. 좋은 학술 글은 **증거가 강한 곳에서는 분명하게, 증거가 약한 곳에서는 조심스럽게** 씁니다.\n\n' +
        '전공 글을 읽을 때는 초록(abstract)과 결론의 확신 표지를 비교해 보십시오. 초록에서는 강하게 말하고 본문의 논의(discussion)에서는 한계를 밝히는 경우가 있어, 두 부분을 함께 읽어야 연구의 실제 주장을 정확히 알 수 있습니다.',
    },
    {
      title: '다음 단원과의 연결: 요약할 때도 강도를 지킨다',
      body: '이 과정의 뒤쪽 단원에서는 남의 글을 요약하고 바꿔 쓰는 법을 배웁니다. 그때 가장 흔한 실수가 원문의 may 표현을 빼먹거나 suggest 표현을 prove 표현으로 바꾸어 **원문보다 센 주장**을 만들어 내는 것입니다.\n\n' +
        '바꿔 쓴 문장이 원문의 내용뿐 아니라 **확신의 정도와 범위**까지 지켰는지 확인하는 습관은 이 단원에서 시작됩니다. 예: The data suggest a link. → It seems there may be a connection.(강도 유지) / The data show a link.(강도가 올라감)',
    },
  ],

  faq: [
    {
      q: '조동사 may·might 가운데 어느 쪽이 더 약한 추측인가요?',
      a: '두 표현 모두 "그럴 수 있다"는 가능성을 나타내고, 실제 쓰임에서 차이는 크지 않습니다. 다만 많은 글쓴이가 might 쪽을 조금 더 조심스러운(가능성이 낮다고 보는) 말로 씁니다. 시험이나 독해에서는 둘을 같은 "가능성" 단계로 보고, must·can\'t(거의 확실) 쪽과 구별하는 것이 더 중요합니다.',
    },
    {
      q: '완곡하게 쓰면 자신 없는 글처럼 보이지 않나요?',
      a: '학술 글에서는 반대입니다. 증거보다 크게 말하는 글이 오히려 신뢰를 잃습니다. 자료가 보여 주는 만큼만 정확히 말하는 것이 전문가다운 태도입니다. 다만 모든 문장을 흐리게 쓰면 주장이 보이지 않으니, 확실한 곳은 분명하게 쓰는 균형이 필요합니다.',
    },
    {
      q: '가정법인데 왜 지금 이야기를 과거형으로 써요?',
      a: '영어는 "현실과 거리가 있다"는 느낌을 시제를 한 단계 뒤로 물려서 나타냅니다. If this theory were correct 문장은 과거의 일이 아니라 "지금 그렇다고 가정해 보면(실제로는 확인되지 않았거나 사실이 아님)"이라는 뜻입니다. 과거의 일을 반대로 가정할 때는 한 단계 더 뒤로 가서 had p.p. 꼴을 씁니다.',
    },
  ],

  mistakes: [
    'must have p.p. 꼴을 "과거에 ~해야 했다(의무)"로 읽는 실수 — must have p.p. 꼴은 "틀림없이 ~했을 것이다"라는 추측입니다. 과거의 의무는 had to 표현으로 씁니다.',
    '추측의 must 문장을 부정하면서 mustn\'t 꼴을 쓰는 실수 — "~일 리 없다"는 can\'t(cannot) 꼴입니다. mustn\'t 표현은 금지입니다.',
    '도치 가정법 Were this the case, … 문장을 의문문으로 읽는 실수 — 쉼표 뒤에 주절이 이어지면 "만약 ~라면"이라는 조건입니다.',
  ],

  gens: [
    {
      id: 'certainty-level',
      level: 1,
      title: '문장의 확신 정도 판단하기',
      make: function (R) {
        var LV = {
          sure: '거의 확실하다고 추론한다',
          maybe: '그럴 가능성이 있다고 본다',
          cannot: '그럴 리 없다고 추론한다',
          fact: '추측 없이 사실로 단정한다',
        };
        var WHY = {
          sure: '추측의 must 표현은 "틀림없이 ~이다"라는 강한 추론입니다.',
          maybe: 'may·might·could 표현은 다른 가능성을 열어 둔 약한 추측입니다.',
          cannot: 'can\'t·cannot 표현은 "~일 리 없다"는 강한 부정 추론입니다.',
          fact: '조동사·완곡 표현 없이 현재형으로 말하면 사실로 단정하는 문장입니다.',
        };
        var items = [
          ['The missing file must be on the old computer.', 'sure', 'must'],
          ['She must be tired after such a long flight.', 'sure', 'must'],
          ['The answer must be in the second chapter.', 'sure', 'must'],
          ['The delay might be caused by the heavy rain.', 'maybe', 'might'],
          ['The new rule may reduce paper waste.', 'maybe', 'may'],
          ['The strange noise could come from the old fan.', 'maybe', 'could'],
          ['This pattern might change in colder regions.', 'maybe', 'might'],
          ['This result cannot be a simple coincidence.', 'cannot', 'cannot'],
          ["The thief can't be a stranger; the dog did not bark.", 'cannot', "can't"],
          ["That can't be the right house; the number is different.", 'cannot', "can't"],
          ['Plants need light to make their own food.', 'fact', ''],
          ['The Earth moves around the Sun.', 'fact', ''],
          ['Water freezes at 0 degrees Celsius at normal air pressure.', 'fact', ''],
        ];
        var it = R.pick(items);
        var key = it[1];
        var correct = LV[key];
        var wrongKeys = ['sure', 'maybe', 'cannot', 'fact'].filter(function (k) { return k !== key; });
        var pick = R.choices(correct, wrongKeys.map(function (k) { return LV[k]; }));
        var byText = {};
        Object.keys(LV).forEach(function (k) { byText[LV[k]] = k; });
        var mark = it[2] ? '이 문장의 확신 표지는 **' + it[2] + '**입니다. ' : '이 문장에는 조동사나 완곡 표현 같은 확신 표지가 없습니다. ';
        return {
          type: 'choice', concept: key === 'fact' ? 4 : 0,
          q: '다음 문장에서 글쓴이의 태도로 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            return '고른 보기는 다른 표지의 뜻입니다. ' + WHY[byText[c]] + ' 이 문장에 그 표지가 있는지 다시 보십시오.';
          }),
          explain: mark + WHY[key] + ' 그래서 글쓴이는 "' + correct + '"는 태도입니다.',
        };
      },
    },
    {
      id: 'modal-perfect',
      level: 2,
      title: '조동사 + have p.p. 고르기',
      make: function (R) {
        // [문장, 우리말 뜻, 정답]
        var items = [
          ['The ground is covered with puddles. It ___ rained during the night.', '틀림없이 밤사이에 비가 왔을 것이다', 'must have'],
          ['Minsu knows every detail of the plan. Someone ___ told him about it.', '틀림없이 누군가 그에게 말해 주었을 것이다', 'must have'],
          ['The window is broken and there is a ball on the floor. A ball ___ hit the window.', '틀림없이 공이 창문을 쳤을 것이다', 'must have'],
          ['The package has not arrived yet. It ___ gone to the wrong address.', '잘못된 주소로 갔을지도 모른다', 'might have'],
          ['The samples were kept in a warm truck. They ___ been damaged by the heat.', '열 때문에 손상되었을지도 모른다', 'might have'],
          ['Jia is not answering her phone. She ___ left it at home.', '집에 두고 왔을지도 모른다', 'might have'],
          ['The letter mentions a telephone. It ___ been written in 1800.', '1800년에 쓰였을 리 없다', "can't have"],
          ['Seojun was in another city all weekend. He ___ seen the show here on Saturday.', '토요일에 여기서 공연을 봤을 리 없다', "can't have"],
          ['The bridge was closed all day. The bus ___ crossed it this morning.', '오늘 아침 그 다리를 건넜을 리 없다', "can't have"],
          ['We are stuck in the rain without umbrellas. We ___ checked the weather.', '날씨를 확인했어야 했는데 (하지 않았다)', 'should have'],
          ['The results apply only to one school. The researchers ___ included more schools.', '더 많은 학교를 포함했어야 했는데 (하지 않았다)', 'should have'],
          ['Hayun missed the deadline by one day. She ___ started the report earlier.', '보고서를 더 일찍 시작했어야 했는데 (하지 않았다)', 'should have'],
        ];
        var it = R.pick(items);
        var correct = it[2];
        var others = ['must have', 'might have', "can't have", 'should have'].filter(function (w) { return w !== correct; });
        var pick = R.choices(correct, R.shuffle(others).concat(['had to']));
        return {
          type: 'choice', concept: 2,
          q: '우리말 뜻에 맞게 빈칸에 알맞은 말을 고르십시오.\n\n' + it[0] + '\n\n(뜻: ' + it[1] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            return '고른 ' + c + ' 꼴의 뜻은 ' + PERFECT_MEANING[c] + '입니다. 문제의 뜻은 "' + it[1] + '"입니다.';
          }),
          explain: '"' + it[1] + '"라는 뜻은 **' + correct + '** + 과거분사 꼴, 곧 ' + PERFECT_MEANING[correct] + '입니다.\n\n' + it[0].replace('___', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'hedge', m: '(주장을) 완곡하게 하다; 완곡 표현', ex: 'Researchers often hedge their claims with words like "may."', exm: '연구자들은 흔히 "may" 같은 낱말로 주장을 완곡하게 합니다.' },
    { w: 'tentative', m: '잠정적인, 조심스러운', ex: 'These are only tentative conclusions.', exm: '이것들은 잠정적인 결론일 뿐입니다.' },
    { w: 'likely', m: '~할 가능성이 큰', ex: 'The price is likely to rise next year.', exm: '그 가격은 내년에 오를 가능성이 큽니다.' },
    { w: 'arguably', m: '(이견이 있을 수 있지만) 거의 틀림없이, ~라고 할 만한', ex: 'This is arguably the most important finding of the study.', exm: '이것은 그 연구의 가장 중요한 발견이라고 할 만합니다.' },
    { w: 'suggest', m: '시사하다, 암시하다', ex: 'The data suggest a link between sleep and memory.', exm: '그 자료는 잠과 기억 사이의 관련성을 시사합니다.' },
    { w: 'indicate', m: '나타내다, 보여 주다', ex: 'The survey indicates that most users prefer the new design.', exm: '설문 조사는 대부분의 사용자가 새 디자인을 더 좋아한다는 것을 보여 줍니다.' },
    { w: 'appear to', m: '~인 것 같다, ~인 것으로 보인다', ex: 'The plants appear to grow faster in blue light.', exm: '그 식물들은 파란 빛에서 더 빨리 자라는 것으로 보입니다.' },
    { w: 'hypothesis', m: '가설', ex: 'We tested the hypothesis in three different schools.', exm: '우리는 세 학교에서 그 가설을 검증했습니다.' },
    { w: 'evidence', m: '증거', ex: 'There is little evidence for this claim.', exm: '이 주장을 뒷받침하는 증거는 거의 없습니다.' },
    { w: 'plausible', m: '그럴듯한, 타당해 보이는', ex: 'This is a plausible explanation, but we need more data.', exm: '이것은 그럴듯한 설명이지만 자료가 더 필요합니다.' },
    { w: 'conclusive', m: '결정적인, 확실한', ex: 'The results are interesting but not conclusive.', exm: '그 결과는 흥미롭지만 결정적이지는 않습니다.' },
    { w: 'speculate', m: '추측하다', ex: 'We can only speculate about the cause of the change.', exm: '우리는 그 변화의 원인을 추측할 수 있을 뿐입니다.' },
    { w: 'contaminate', m: '오염시키다', ex: 'The water samples may have been contaminated.', exm: '물 표본이 오염되었을지도 모릅니다.' },
    { w: 'revision', m: '수정, 개정', ex: 'The theory may need revision after these findings.', exm: '이 발견들 이후에 그 이론은 수정이 필요할지도 모릅니다.' },
    { w: 'alternative', m: '대안; 다른, 대안이 되는', ex: 'Is there an alternative explanation for the result?', exm: '그 결과에 대한 다른 설명이 있습니까?' },
  ],
});
})();
