/* 영어Ⅱ · 과학·기술 글 읽기
 * 지문·예문은 모두 직접 쓴 글이다. 실험·연구는 가상의 것이며 수치도 가상의 자료다. */
(function () {
  // 글 A: 음악과 콩 (가상의 학생 실험)
  var PLANT = 'A group of students wanted to know whether music helps plants grow. Their hypothesis was that plants exposed to music would grow taller than plants kept in silence. They planted twenty bean seeds in identical pots, using the same soil and giving each pot the same amount of water and light. Ten pots were placed in a room where soft music played for three hours a day, and the other ten were kept in a quiet room. After four weeks, the students measured the height of each plant. The plants in the music room were 12 centimeters tall on average, while those in the quiet room were 11.5 centimeters tall. The students concluded that the difference was too small to support their hypothesis.';
  // 글 B: 잠과 기억 (가상의 연구)
  var SLEEP = 'Researchers wanted to find out whether sleep affects memory. They asked 40 volunteers to learn a list of 30 words in the evening. Half of the volunteers then slept for eight hours, while the other half stayed awake all night. The next morning, everyone tried to recall the words. On average, the group that slept remembered 21 words, whereas the group that stayed awake remembered only 14. The researchers concluded that sleep may help the brain store new memories.';
  // 글 C: 센서 (정의·예시, 직접 쓴 글)
  var SENSOR = 'A sensor is a device that detects changes in its surroundings and turns them into signals. For instance, many smartphones use a light sensor to make the screen brighter in sunlight and dimmer in the dark. Many other everyday devices, such as automatic doors and smart watches, also depend on sensors.';

Tutor.registerUnit({
  id: 'eng-h-e2-03',
  course: 'eng-h-e2',
  title: '과학·기술 글 읽기',
  summary: '실험과 연구를 다룬 글에서 가설·방법·결과를 찾아 읽고, 어려운 정보를 쉬운 말로 풀어 설명합니다.',
  goals: [
    'hypothesis, experiment, variable, evidence 같은 과학 글의 핵심 어휘를 문맥 속에서 이해할 수 있다.',
    '연구 글을 가설-방법-결과-결론의 흐름으로 정리할 수 있다.',
    'refer to, such as, for instance 같은 정의·예시 신호어로 개념과 예를 구별할 수 있다.',
    '수치·단위·비교 표현을 정확하게 읽고, 어려운 내용을 쉬운 말로 바르게 풀어 설명할 수 있다.',
  ],
  standards: ['[12영Ⅱ-01-01]', '[12영Ⅱ-02-01]'],

  concepts: [
    {
      title: '과학 글의 핵심 어휘',
      body: '실험과 연구를 다룬 글에는 몇 가지 낱말이 되풀이해 나옵니다. 이 낱말들의 뜻을 정확히 알면 처음 보는 연구 글도 뼈대가 보입니다.\n\n' +
        '| 낱말 | 뜻 | 글에서 하는 일 |\n|---|---|---|\n' +
        '| **hypothesis** | 가설: 시험해 볼 수 있는 예측이나 설명 | 연구가 확인하려는 것 |\n' +
        '| **experiment** | 실험 | 가설을 시험하는 방법 |\n' +
        '| **variable** | 변인: 실험에서 바뀔 수 있는 요소 | 무엇을 바꾸고 무엇을 재는가 |\n' +
        '| **evidence** | 증거, 근거 | 가설을 뒷받침하거나 반박하는 자료 |\n' +
        '| **data** | 자료, 측정값 | 실험에서 얻은 수치 |\n' +
        '| **conclusion** | 결론 | 결과에서 끌어낸 판단 |\n\n' +
        '변인은 셋으로 나누어 봅니다.\n\n' +
        '- **바꾸는 변인**(독립 변인): 연구자가 일부러 다르게 하는 것. 예: 음악을 틀었는가\n' +
        '- **재는 변인**(종속 변인): 그 결과로 달라지는지 재는 것. 예: 식물의 키\n' +
        '- **같게 하는 변인**(통제 변인): 공정한 비교를 위해 모든 무리에서 똑같이 하는 것. 예: 흙, 물, 빛\n\n' +
        '> 💡 아무 처치도 하지 않고 비교의 기준이 되는 무리를 **대조군(control group)**이라고 합니다. 글 A에서는 조용한 방의 식물이 대조군입니다.',
      easy: '요리 대회에서 "소금을 더 넣으면 국이 더 맛있어질까?"를 알아보고 싶다고 해 봅시다.\n\n' +
        '"더 맛있어질 것이다"라는 짐작이 **가설**, 냄비 두 개에 같은 재료·같은 물을 넣고 소금만 다르게 하는 것이 **실험**입니다. 소금의 양이 **바꾸는 변인**, 맛 점수가 **재는 변인**, 재료와 물이 **같게 하는 변인**입니다. 소금 말고 다른 것까지 바꾸면 무엇 때문에 맛이 달라졌는지 알 수 없게 됩니다.',
      check: {
        type: 'choice',
        q: '다음 뜻풀이에 알맞은 낱말은 무엇입니까?\n\na possible explanation or prediction that can be tested',
        choices: ['hypothesis', 'evidence', 'conclusion'],
        answer: 0,
        why: ['', 'evidence는 가설을 뒷받침하거나 반박하는 자료입니다. 시험해 볼 예측 자체가 아닙니다.', 'conclusion은 실험 결과를 보고 마지막에 내리는 판단입니다. 시험하기 전의 예측이 아닙니다.'],
        explain: '시험해 볼 수 있는(can be tested) 예측이나 설명은 **hypothesis**(가설)입니다. 연구는 가설에서 출발해 실험으로 그것을 확인합니다.',
      },
    },
    {
      title: '연구 글의 흐름: 가설-방법-결과-결론',
      body: '연구를 소개하는 글은 대개 다음 네 단계로 흘러갑니다. 단계마다 자주 쓰는 표현을 알면 어디까지가 방법이고 어디부터가 결과인지 바로 보입니다.\n\n' +
        '| 단계 | 하는 일 | 자주 쓰는 표현 |\n|---|---|---|\n' +
        '| 가설(질문) | 무엇을 알아보려 했나 | wanted to know whether ~ / predicted that ~ / Their hypothesis was that ~ |\n' +
        '| 방법 | 어떻게 실험했나 | divided ~ into two groups / asked volunteers to ~ / measured ~ |\n' +
        '| 결과 | 무엇이 나왔나 | The results showed that ~ / found that ~ / On average, ~ |\n' +
        '| 결론 | 결과가 무엇을 뜻하나 | concluded that ~ / This suggests that ~ / may, might |\n\n' +
        '**결과**와 **결론**을 구별하는 것이 중요합니다. 결과는 실험에서 실제로 나온 사실(21개를 기억했다)이고, 결론은 그 사실에서 끌어낸 해석(잠이 기억을 돕는 것 같다)입니다.\n\n' +
        '> ⚠️ 과학 글의 결론에는 may, might, suggest 같은 **신중한 표현**이 자주 붙습니다. 이 말을 빼고 "잠이 반드시 기억력을 높인다"처럼 단정하면 글보다 지나치게 나간 해석이 됩니다.',
      easy: '탐정 이야기를 떠올려 보십시오. 탐정은 "범인은 집사일 것이다"라고 짐작하고(가설), 발자국을 조사하고(방법), 집사의 신발과 크기가 같다는 것을 알아낸 뒤(결과), "집사가 범인일 가능성이 크다"고 말합니다(결론).\n\n' +
        '연구 글도 이 순서로 읽으면 됩니다. 발자국 크기가 같다는 것은 **사실**(결과)이고, 집사가 범인이라는 것은 그 사실로 내린 **판단**(결론)입니다.',
      check: {
        type: 'choice',
        q: '글 B에서 **결과**에 해당하는 문장은 무엇입니까?\n\n' + SLEEP,
        choices: [
          'On average, the group that slept remembered 21 words, whereas the group that stayed awake remembered only 14.',
          'The researchers concluded that sleep may help the brain store new memories.',
          'Half of the volunteers then slept for eight hours, while the other half stayed awake all night.',
        ],
        answer: 0,
        why: ['', 'concluded that ~ 은 결과에서 끌어낸 판단, 곧 결론입니다.', '실험을 어떻게 했는지 설명하는 방법 단계입니다. 아직 결과가 나오지 않았습니다.'],
        explain: '실험에서 실제로 얻은 수치(21개, 14개)를 알려 주는 **On average, ~** 문장이 결과입니다. concluded that ~ 은 결론, 무리를 나눈 문장은 방법입니다.',
      },
    },
    {
      title: '정의와 예시 신호어',
      body: '과학·기술 글은 낯선 용어를 **정의**하고, 곧바로 **예**를 들어 뜻을 실감 나게 만드는 일이 많습니다. 신호어를 보면 지금 읽는 부분이 정의인지 예인지 알 수 있습니다.\n\n' +
        '| 하는 일 | 신호어 | 예 |\n|---|---|---|\n' +
        '| 정의 | A **refers to** B / A **is** a device that ~ / A **is called** B / **known as** ~ | A sensor **is** a device that detects changes. |\n' +
        '| 바꿔 말하기 | **that is,** ~ / **in other words,** ~ | Plants make their own food; **in other words**, they produce energy from light. |\n' +
        '| 예시 (문장) | **For instance,** ~ / **For example,** ~ | **For instance**, a smartphone uses a light sensor. |\n' +
        '| 예시 (명사 나열) | **such as** + 명사 / **including** + 명사 / **like** + 명사 | devices **such as** automatic doors and smart watches |\n\n' +
        '어법상의 차이도 알아 둡니다. **For instance, For example**은 문장 앞에 쉼표와 함께 오고, **such as, including**은 바로 뒤에 명사(구)가 옵니다.\n\n' +
        '> 💡 정의를 묻는 문제의 답은 정의 신호어 쪽에, "~의 예로 알맞은 것"을 묻는 문제의 답은 예시 신호어 뒤에 있습니다. 예를 정의로 착각하지 않도록 주의합니다.',
      easy: '사전을 떠올려 보십시오. 낱말 옆에 뜻풀이가 먼저 나오고, 그 아래 "예: ~"가 붙어 있지요.\n\n' +
        '영어 과학 글도 사전처럼 생겼습니다. refers to, is a device that ~ 는 "뜻풀이", For instance, such as ~ 는 "예:"입니다. 이 두 칸을 나누어 읽으면 낯선 낱말도 무섭지 않습니다.',
      check: {
        type: 'choice',
        q: '글 C에서 such as 뒤에 나오는 automatic doors and smart watches는 무엇입니까?\n\n' + SENSOR,
        choices: ['센서를 쓰는 기기의 예', '센서의 정의', '센서가 만드는 신호의 종류'],
        answer: 0,
        why: ['', '센서의 정의는 첫 문장(A sensor is a device that ~)에 있습니다.', '신호의 종류는 글에 나오지 않습니다. such as 뒤에는 앞 명사(devices)의 예가 옵니다.'],
        explain: '**such as** + 명사는 앞에 나온 명사의 **예**를 나열합니다. 여기서는 센서를 쓰는 일상 기기(everyday devices)의 예로 자동문과 스마트워치를 들었습니다.',
      },
    },
    {
      title: '수치·단위·비교 정보 정확히 읽기',
      body: '과학 글의 문제는 수치를 **얼마나 정확하게** 읽었는지 묻는 경우가 많습니다. 다음 표현을 구별해 두십시오.\n\n' +
        '| 표현 | 뜻 | 예 |\n|---|---|---|\n' +
        '| A is **twice as** tall **as** B | A는 B의 2배 | 12 cm는 6 cm의 2배 |\n' +
        '| **three times as** many **as** | 3배 | 30 is three times as many as 10. |\n' +
        '| increase **by** 20 | 20**만큼** 늘다 (차이) | 50 → 70 |\n' +
        '| increase **to** 20 | 20**이 되도록** 늘다 (도착점) | 10 → 20 |\n' +
        '| **half** / **a quarter** of ~ | ~의 절반 / 4분의 1 | half of 40 = 20 |\n' +
        '| **more than** / **at least** | ~보다 많이 / 적어도 | more than 10 = 10은 들지 않음 |\n' +
        '| **per** | ~당 | 60 kilometers per hour = 시속 60 km |\n\n' +
        '비교 문장은 **무엇이 무엇보다** 큰지 방향을 꼭 확인합니다. "The sleep group remembered 7 more words than the awake group."에서 더 많이 기억한 쪽은 잠을 잔 무리입니다.\n\n' +
        '> ⚠️ **배수**와 **차이**를 섞지 마십시오. 21과 14의 차이는 7이고, 21은 14의 1.5배(one and a half times)입니다. "7배"나 "2배"가 아닙니다.\n\n' +
        '> 💡 단위도 함께 확인합니다. centimeters와 meters, minutes와 hours를 바꿔 읽으면 수가 맞아도 답이 틀립니다.',
      easy: '키 재기를 떠올려 보십시오. 동생이 100 cm, 형이 150 cm라면 "형이 50 cm 더 크다"(차이)와 "형이 1.5배 크다"(배수)는 둘 다 맞는 말이지만 서로 다른 계산입니다.\n\n' +
        '또 "키가 10 cm **만큼** 자랐다(by)"와 "키가 110 cm**가 되었다**(to)"도 다릅니다. by는 "얼마나 움직였나", to는 "어디에 도착했나"라고 기억하면 쉽습니다.',
      check: {
        type: 'ox',
        q: '"The temperature rose by 5 degrees."는 온도가 5도가 되었다는 뜻이다.',
        answer: false,
        explain: '**by**는 변화의 크기(차이)를 나타냅니다. "5도만큼 올랐다"는 뜻입니다. 5도가 되었다고 하려면 "rose **to** 5 degrees"라고 씁니다.',
      },
    },
    {
      title: '어려운 내용을 쉬운 말로 풀어 설명하기',
      body: '어려운 과학 정보를 다른 사람에게 전하려면 **쉬운 말로 풀어 쓰기(paraphrasing)**가 필요합니다. 좋은 풀어 쓰기는 쉬워지되 **뜻은 그대로**여야 합니다.\n\n' +
        '풀어 쓰는 방법:\n\n' +
        '1. **전문 용어를 일상어로**: bacterial infections → illnesses caused by bacteria\n' +
        '2. **긴 문장을 짧게 나누기**: 한 문장에 하나의 생각만\n' +
        '3. **익숙한 예나 비유 더하기**: A sensor works like your skin, which feels heat and cold.\n\n' +
        '지켜야 할 것:\n\n' +
        '- **수치·방향을 바꾸지 않습니다**: 30 percent less를 "30 percent of"로 바꾸면 전혀 다른 뜻이 됩니다.\n' +
        '- **신중한 표현을 지우지 않습니다**: may help를 "always helps"로 바꾸면 글보다 강한 주장이 됩니다.\n' +
        '- **글에 없는 내용을 더하지 않습니다**: 원래 글에 없는 충고나 판단을 끼워 넣지 않습니다.\n\n' +
        '예: "Antibiotics are effective against bacterial infections but have no effect on viral infections such as the common cold."\n' +
        '→ "Antibiotics can fight illnesses caused by bacteria, but they do not work on illnesses caused by viruses, like a cold."',
      easy: '할머니께 스마트폰의 "자동 밝기" 기능을 설명한다고 해 봅시다. "주변 광량을 감지하는 센서가 디스플레이 휘도를 조절합니다"라고 하면 어렵겠지요.\n\n' +
        '"휴대 전화가 주변이 밝은지 어두운지 느껴서, 밝은 데서는 화면을 환하게, 어두운 데서는 어둡게 바꿔 줘요"라고 하면 쉽습니다. 낱말은 쉬워졌지만 **하는 일은 똑같이** 전해졌습니다. 이것이 좋은 풀어 쓰기입니다.',
      check: {
        type: 'choice',
        q: '다음 문장을 쉬운 말로 **뜻이 바뀌지 않게** 풀어 쓴 것은 무엇입니까?\n\nThe results suggest that regular exercise may improve sleep quality.',
        choices: [
          'The study suggests that exercising often might help people sleep better.',
          'The study proves that exercise always makes everyone sleep better.',
          'The study suggests that good sleep makes people exercise more often.',
        ],
        answer: 0,
        why: ['', 'suggest, may 같은 신중한 표현을 지우고 always, everyone으로 단정했습니다. 원래 글보다 강한 주장입니다.', '원인과 결과의 방향을 거꾸로 바꿨습니다. 원래 글은 운동이 잠에 도움이 된다고 했습니다.'],
        explain: 'regular exercise → exercising often, improve sleep quality → sleep better로 쉬운 말로 바꾸면서 **suggest, may**(might)의 신중함과 운동 → 잠의 방향을 그대로 지켰습니다.',
      },
    },
  ],

  examples: [
    {
      q: '글 A(가상의 학생 실험)를 가설-방법-결과-결론으로 정리하고 변인을 찾아보십시오.\n\n' + PLANT,
      steps: [
        '가설: **Their hypothesis was that** plants exposed to music would grow taller. — 음악을 들은 식물이 더 크게 자랄 것이다.',
        '방법: 같은 화분·같은 흙·같은 양의 물과 빛(같게 하는 변인)으로 콩 20개를 심고, 10개는 음악이 나오는 방, 10개는 조용한 방에 두었습니다(바꾸는 변인: 음악). 4주 뒤 키를 쟀습니다(재는 변인: 키).',
        '결과: 음악 방의 식물은 평균 12 cm, 조용한 방의 식물은 평균 11.5 cm였습니다. 차이는 0.5 cm입니다.',
        '결론: **concluded that the difference was too small to support their hypothesis** — 차이가 너무 작아서 가설을 뒷받침하지 못한다.',
        '주의: 결과에서 음악 방 식물이 조금 더 컸다고 해서 "음악이 식물을 자라게 한다"고 결론 내리지 않았다는 점이 중요합니다.',
      ],
      answer: '가설(음악 → 더 큰 키) / 방법(음악만 다르게, 4주 뒤 키 측정) / 결과(12 cm 대 11.5 cm) / 결론(차이가 작아 가설을 뒷받침하지 못함)',
    },
    {
      q: '글 B(가상의 연구)의 결과를 수치로 정확히 비교해 보십시오.\n\n' + SLEEP,
      steps: [
        '잠을 잔 무리: 평균 21개, 깨어 있던 무리: 평균 14개. 외운 낱말은 모두 30개였습니다.',
        '차이: 21 − 14 = 7 → The sleep group remembered **7 more words** than the awake group.',
        '배수: 21 ÷ 14 = 1.5 → The sleep group remembered **one and a half times as many words as** the awake group.',
        '비율: 21 ÷ 30 = 0.7 → 잠을 잔 무리는 낱말의 70퍼센트를 기억했습니다.',
      ],
      answer: '차이는 7개, 배수는 1.5배, 잠을 잔 무리가 기억한 비율은 70퍼센트입니다.',
    },
  ],

  terms: [
    { term: '가설 (hypothesis)', def: '실험으로 시험해 볼 수 있는 예측이나 설명입니다. 예: 음악을 들은 식물이 더 크게 자랄 것이다.' },
    { term: '실험 (experiment)', def: '가설이 맞는지 알아보려고 조건을 정해 시험하는 일입니다.' },
    { term: '변인 (variable)', def: '실험에서 바뀔 수 있는 요소입니다. 바꾸는 변인, 재는 변인, 같게 하는 변인으로 나눕니다.' },
    { term: '대조군 (control group)', def: '아무 처치도 하지 않아 비교의 기준이 되는 무리입니다. 예: 음악을 틀지 않은 방의 식물' },
    { term: '증거 (evidence)', def: '가설이나 주장이 맞는지 판단하게 해 주는 자료입니다.' },
    { term: '결과와 결론', def: '결과(result)는 실험에서 실제로 나온 사실이고, 결론(conclusion)은 그 사실에서 끌어낸 판단입니다.' },
    { term: '배수와 차이', def: '배수는 몇 배인지(21은 14의 1.5배), 차이는 얼마나 더 많은지(21은 14보다 7 많다)를 나타냅니다.' },
    { term: '풀어 쓰기 (paraphrasing)', def: '뜻은 그대로 두고 더 쉬운 말이나 다른 말로 바꾸어 쓰는 것입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '다음 뜻풀이에 알맞은 낱말은 무엇입니까?\n\nfacts or information that show whether a belief or idea is true',
      choices: ['evidence', 'hypothesis', 'variable', 'device'],
      answer: 0,
      why: [
        '',
        'hypothesis는 시험해 볼 예측입니다. 그것이 맞는지 보여 주는 자료가 아닙니다.',
        'variable은 실험에서 바뀔 수 있는 요소입니다.',
        'device는 기기, 장치입니다.',
      ],
      explain: '생각이 맞는지 보여 주는 사실이나 정보는 **evidence**(증거)입니다.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오. (e로 시작합니다.)\n\nTo test their hypothesis, the students designed an [[빈칸]] with two groups of plants.',
      answer: ['experiment'],
      wrong: [
        { a: 'evidence', why: 'evidence는 실험에서 얻는 자료입니다. 가설을 시험하려고 "설계하는" 것은 실험입니다.' },
        { a: 'example', why: 'example은 예시입니다. 두 무리로 나누어 가설을 시험하는 것은 experiment입니다.' },
      ],
      explain: '가설을 시험하려고 조건을 정해 하는 일은 **experiment**(실험)입니다. 앞에 an이 있는 것도 모음으로 시작하는 낱말이라는 단서입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 0,
      q: '글 A(가상의 학생 실험)에서 학생들이 결과를 보려고 **잰** 것, 곧 재는 변인(종속 변인)은 무엇입니까?\n\n' + PLANT,
      choices: ['the height of the plants', 'whether music was played', 'the amount of water', 'the type of soil'],
      answer: 0,
      why: [
        '',
        '음악을 틀었는지는 학생들이 일부러 다르게 한 "바꾸는 변인"입니다.',
        '물의 양은 모든 화분에 똑같이 준 "같게 하는 변인"입니다.',
        '흙은 모든 화분에 같은 것을 쓴 "같게 하는 변인"입니다.',
      ],
      explain: '**the students measured the height of each plant** — 학생들이 잰 것은 식물의 키입니다. 음악은 바꾸는 변인, 흙·물·빛은 같게 하는 변인입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '글 A(가상의 학생 실험)에서 학생들의 **가설**은 무엇이었습니까?\n\n' + PLANT,
      choices: [
        '음악을 들은 식물이 조용한 곳의 식물보다 더 크게 자랄 것이다.',
        '음악은 식물의 성장에 아무런 영향을 주지 않을 것이다.',
        '물을 더 많이 준 식물이 더 크게 자랄 것이다.',
        '조용한 방에서 기른 식물이 음악을 들은 식물보다 키가 더 클 것이다.',
      ],
      answer: 0,
      why: [
        '',
        '가설과 반대되는 예측입니다. 학생들은 음악을 들은 식물이 더 크게 자랄 것이라고 예측했습니다(would grow taller).',
        '물의 양은 모든 화분에 똑같이 주었습니다. 가설과 상관없습니다.',
        '가설의 방향을 거꾸로 읽었습니다.',
      ],
      explain: '**Their hypothesis was that plants exposed to music would grow taller than plants kept in silence.** 가설은 실험 전에 세운, 시험해 볼 예측입니다.',
    },
    {
      id: 'p5', level: 1, type: 'order', concept: 1,
      q: '연구 글의 흐름(가설 → 방법 → 결과 → 결론)에 맞게 배열하십시오. (가상의 연구)',
      choices: [
        'Researchers predicted that students would remember more from paper books than from screens.',
        'They had 60 students read the same story, half on paper and half on a tablet.',
        'The results showed that the paper group answered slightly more questions correctly.',
        'They concluded that the reading format may affect how much we remember.',
      ],
      answer: [0, 1, 2, 3],
      hint: 'predicted, had ~ read, results showed, concluded 같은 표현이 단계를 알려 줍니다.',
      explain: '가설(**predicted that** ~) → 방법(60명에게 같은 이야기를 종이와 태블릿으로 나누어 읽게 함) → 결과(**The results showed that** ~) → 결론(**They concluded that** ~ may ~) 순서입니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '글 C에서 센서를 쓰는 일상 기기의 **예**로 나온 것은 무엇입니까?\n\n' + SENSOR,
      choices: ['automatic doors', 'signals', 'sunlight', 'surroundings'],
      answer: 0,
      why: [
        '',
        'signals는 센서가 변화를 바꾸어 만든 것(신호)입니다. 기기의 예가 아닙니다.',
        'sunlight는 빛 센서가 알아차리는 주변 환경의 한 예입니다. 센서를 쓰는 기기가 아닙니다.',
        'surroundings는 센서가 변화를 감지하는 주변입니다.',
      ],
      explain: '**such as automatic doors and smart watches** — such as 뒤에 센서를 쓰는 일상 기기의 예가 나옵니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 영어 낱말 한 개를 쓰십시오.\n\nSome animals, [[빈칸]] as bats and dolphins, use sound to find their way.',
      answer: ['such'],
      wrong: [
        { a: 'like', why: 'like는 혼자서 "~와 같은"이라는 뜻이라 뒤에 as를 붙이지 않습니다. 빈칸 뒤에 as가 있으므로 such를 씁니다.' },
        { a: 'for', why: 'for instance, for example은 있어도 for as라는 표현은 없습니다. such as로 씁니다.' },
      ],
      explain: '**such as** + 명사는 앞 명사(Some animals)의 예를 나열합니다: 박쥐와 돌고래처럼 소리로 길을 찾는 동물들.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 3,
      q: '글 B(가상의 연구)에서 잠을 잔 무리는 깨어 있던 무리보다 평균 몇 개의 낱말을 더 기억했습니까?\n\n' + SLEEP,
      choices: ['7개', '14개', '21개', '30개'],
      answer: 0,
      why: [
        '',
        '14개는 깨어 있던 무리가 기억한 낱말 수입니다.',
        '21개는 잠을 잔 무리가 기억한 낱말 수입니다. "몇 개 더"는 두 수의 차이입니다.',
        '30개는 외운 낱말 전체의 수입니다.',
      ],
      explain: '잠을 잔 무리는 21개, 깨어 있던 무리는 14개를 기억했습니다. 차이는 21 − 14 = 7, 곧 7개를 더 기억했습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '글 B(가상의 연구)의 결과를 바르게 설명한 문장은 무엇입니까?\n\n' + SLEEP,
      choices: [
        'The sleep group remembered one and a half times as many words as the awake group.',
        'The sleep group remembered twice as many words as the group that stayed awake all night.',
        'The awake group remembered seven more words than the sleep group.',
        'The sleep group remembered all of the words on the list.',
      ],
      answer: 0,
      why: [
        '',
        '21은 14의 2배(28)가 아닙니다. 21 ÷ 14 = 1.5입니다.',
        '차이(7개)는 맞지만 방향이 거꾸로입니다. 더 많이 기억한 쪽은 잠을 잔 무리입니다.',
        '낱말은 30개였고 잠을 잔 무리는 평균 21개를 기억했습니다.',
      ],
      hint: '두 수를 나누어 배수를, 빼서 차이를 구한 뒤 방향까지 확인하십시오.',
      explain: '21 ÷ 14 = 1.5이므로 잠을 잔 무리는 깨어 있던 무리의 **one and a half times as many words**를 기억했습니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '다음 문장을 쉬운 말로 **뜻이 바뀌지 않게** 풀어 쓴 것은 무엇입니까?\n\nAntibiotics are effective against bacterial infections but have no effect on viral infections such as the common cold.',
      choices: [
        'Antibiotics can fight illnesses caused by bacteria, but they do not work on illnesses caused by viruses, like a cold.',
        'Antibiotics work well on every kind of infection, including colds.',
        'Antibiotics are good for colds, but they do not work against bacteria.',
        'You should take antibiotics as soon as you catch a cold so that the virus cannot spread to other people in your family.',
      ],
      answer: 0,
      why: [
        '',
        '원래 문장은 바이러스 감염에는 효과가 없다고 했습니다. every kind는 뜻을 바꾼 것입니다.',
        '세균과 바이러스의 자리를 뒤바꿨습니다.',
        '원래 문장에 없는 충고를 더했고, 뜻도 정반대입니다. 감기는 바이러스 감염이라 항생제가 듣지 않습니다.',
      ],
      hint: '세균(bacteria)과 바이러스(virus)에 대해 각각 무엇이라고 했는지 나누어 확인하십시오.',
      explain: 'bacterial infections → illnesses caused by bacteria, viral infections → illnesses caused by viruses로 쉬운 말로 바꾸면서 "세균에는 효과가 있고 바이러스(감기)에는 없다"는 뜻을 그대로 지킨 첫 번째가 알맞습니다.',
    },
    {
      id: 'p11', level: 2, type: 'ox', concept: 3,
      q: '"The score rose by 20 points."와 "The score rose to 20 points."는 같은 뜻이다.',
      answer: false,
      explain: '**by**는 변화의 크기입니다: "20점만큼 올랐다"(예: 60점 → 80점). **to**는 도착점입니다: "20점이 되었다"(예: 10점 → 20점). 전치사 하나로 뜻이 크게 달라집니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 1,
      q: '글 A(가상의 학생 실험)에서 학생들이 내린 **결론**으로 알맞은 것은 무엇입니까?\n\n' + PLANT,
      choices: [
        '두 무리의 차이가 너무 작아서 가설을 뒷받침하지 못한다.',
        '음악이 식물의 성장을 크게 돕는다는 것이 증명되었다.',
        '조용한 방에서 기른 식물이 더 크게 자랐다.',
        '물을 더 많이 준 식물이 더 크게 자랐으므로 물이 가장 중요하다.',
      ],
      answer: 0,
      why: [
        '',
        '학생들은 차이(0.5 cm)가 너무 작다고 했습니다. "증명되었다"는 글과 반대입니다.',
        '조용한 방의 식물은 11.5 cm로 음악 방의 식물(12 cm)보다 조금 작았습니다.',
        '모든 화분에 같은 양의 물을 주었습니다. 물의 양은 같게 하는 변인입니다.',
      ],
      hint: '결론은 concluded that ~ 뒤에 있습니다.',
      explain: '**The students concluded that the difference was too small to support their hypothesis.** 결과(12 cm 대 11.5 cm)에서 차이가 0.5 cm뿐이라 가설을 뒷받침하기 어렵다고 판단했습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 실험에서 서준이 "식물 영양제 때문에 더 크게 자랐다"고 확신할 수 **없는** 까닭으로 가장 알맞은 것은 무엇입니까?\n\nSeojun wanted to test whether a new plant food helps tomato plants grow. He gave plant food to five tomato plants by a sunny window and gave nothing to five tomato plants in a dark corner. After a month, the plants with plant food were much taller.',
      choices: [
        'Two things were different between the groups: plant food and sunlight.',
        'He used too many tomato plants in the experiment.',
        'Tomato plants cannot be used to test plant food.',
        'He should have counted the tomatoes instead of measuring height, because counting fruit is the only correct way to measure growth.',
      ],
      answer: 0,
      why: [
        '',
        '무리마다 5그루는 적은 편입니다. 수가 너무 많은 것은 문제가 아닙니다.',
        '토마토로도 영양제 실험을 할 수 있습니다. 근거 없는 말입니다.',
        '키를 재는 것도 성장을 재는 알맞은 방법입니다. "유일한" 방법은 지나친 말입니다.',
      ],
      hint: '두 무리 사이에 다른 것이 몇 가지인지 세어 보십시오.',
      explain: '영양제를 준 식물은 해가 잘 드는 창가에, 주지 않은 식물은 어두운 구석에 두었습니다. 영양제와 햇빛, **두 변인이 함께 달라져서** 키 차이가 무엇 때문인지 알 수 없습니다. 햇빛을 같게 하는 변인으로 두어야 공정한 실험이 됩니다.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '%', concept: 3,
      q: '글 B(가상의 연구)에서 잠을 잔 무리는 외운 낱말 가운데 평균 몇 퍼센트를 기억했습니까? 수만 쓰십시오.\n\n' + SLEEP,
      answer: '70',
      wrong: [
        { a: '21', why: '21은 기억한 낱말의 수입니다. 전체 30개 가운데 몇 퍼센트인지 구해야 합니다: 21 ÷ 30 = 0.7' },
        { a: '7', why: '7은 두 무리가 기억한 낱말 수의 차이입니다. 잠을 잔 무리가 전체 30개 가운데 몇 퍼센트를 기억했는지 구하십시오.' },
      ],
      hint: '외운 낱말은 모두 30개였습니다.',
      explain: '외운 낱말은 30개(a list of 30 words), 잠을 잔 무리가 기억한 낱말은 평균 21개입니다. 21 ÷ 30 = 0.7, 곧 70퍼센트입니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '다음 문장을 쉬운 말로 **정확하게** 풀어 쓴 것은 무엇입니까?\n\nThe new device reduced energy consumption by 30 percent compared with older models.',
      choices: [
        'The new device uses 30 percent less energy than older ones.',
        'The new device uses only 30 percent of the energy that older ones use.',
        'Older devices use 30 percent less energy than the new one.',
        'The new device saves energy, so it is the best device that anyone can buy today.',
      ],
      answer: 0,
      why: [
        '',
        '"30퍼센트만 쓴다"는 70퍼센트를 줄였다는 뜻이 됩니다. reduce by 30 percent는 30퍼센트만큼 줄였다는 뜻입니다.',
        '비교의 방향을 거꾸로 바꿨습니다. 에너지를 덜 쓰는 쪽은 새 기기입니다.',
        '원래 문장에 없는 판단(가장 좋은 기기)을 더했고 30퍼센트라는 정보도 빠졌습니다.',
      ],
      hint: 'reduce by의 by가 무엇을 뜻하는지, 비교의 방향이 어느 쪽인지 확인하십시오.',
      explain: '**reduced ~ by 30 percent**는 "30퍼센트만큼 줄였다"입니다. energy consumption(에너지 소비)을 uses ~ energy로 쉽게 바꾸고, 수치와 비교의 방향을 그대로 지킨 첫 번째가 정확한 풀어 쓰기입니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 1,
      q: '글 B(가상의 연구)의 결과에서 끌어낼 수 있는 결론으로 **지나치게 나간** 것은 무엇입니까?\n\n' + SLEEP,
      choices: [
        'Anyone who sleeps more than eight hours every night will have a perfect memory.',
        'Sleep may help the brain store new memories.',
        'In this study, the volunteers who slept recalled more words on average.',
        'Staying up all night after studying might not be a good idea.',
      ],
      answer: 0,
      why: [
        '',
        '연구자들이 내린 결론 그대로이며 may로 신중하게 말했습니다.',
        '연구 결과를 그대로 옮긴 문장입니다.',
        'might로 신중하게 말했고, 밤을 새운 무리가 덜 기억했다는 결과와 맞습니다.',
      ],
      hint: 'anyone, perfect처럼 연구보다 넓고 강하게 말한 보기를 찾으십시오.',
      explain: '이 연구는 40명이 30개 낱말을 외운 실험 하나입니다. "8시간 넘게 자는 사람은 **누구나 완벽한** 기억력을 갖게 된다"는 연구가 보여 준 것보다 훨씬 넓고 강한 주장입니다. 과학 글의 결론은 may, might, suggest처럼 증거만큼만 말합니다.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 2,
      q: '다음 글의 정의에 따를 때, biomimicry의 예가 **아닌** 것은 무엇입니까?\n\nBiomimicry refers to solving human problems by copying designs found in nature. For instance, the idea for hook-and-loop fasteners came from tiny seed heads that stuck to clothing and animal fur. Engineers have also borrowed ideas from birds, such as the shape of a kingfisher\'s beak, to make a high-speed train quieter.',
      choices: [
        'painting a picture of a forest on a classroom wall',
        'designing a swimsuit by copying the texture of shark skin',
        'shaping the front of a train like a bird\'s beak',
        'making a fastener based on seed heads that stick to fur',
      ],
      answer: 0,
      why: [
        '',
        '상어 피부의 결을 본떠 수영복을 만드는 것은 자연의 설계를 베껴 사람의 문제(물의 저항)를 푸는 것이므로 biomimicry입니다.',
        '글에 나온 예(물총새의 부리 모양을 본뜬 고속 열차)와 같습니다.',
        '글에 나온 예(털에 달라붙는 씨앗을 본뜬 찍찍이)와 같습니다.',
      ],
      hint: 'refers to 뒤의 정의(자연의 설계를 베껴 사람의 문제를 푼다)에 하나씩 대어 보십시오.',
      explain: '정의: **refers to solving human problems by copying designs found in nature.** 숲 그림을 벽에 그리는 것은 자연의 모습을 그린 것일 뿐, 자연의 설계를 베껴 어떤 문제를 푸는 것이 아닙니다.',
    },
  ],

  deeper: [
    {
      title: '함께 늘어난다고 원인은 아니다: 상관과 인과',
      body: '여름이 되면 아이스크림 판매량도 늘고 물놀이 사고도 늘어납니다. 그렇다고 "아이스크림이 물놀이 사고를 일으킨다"고 할 수는 없습니다. 둘 다 **더운 날씨**라는 다른 원인 때문에 함께 늘어난 것이기 때문입니다.\n\n' +
        '두 가지가 함께 변하는 것을 **상관(correlation)**, 하나가 다른 하나를 일으키는 것을 **인과(causation)**라고 합니다. 과학 글에서 "A와 B 사이에 관련이 있다(is linked to, is associated with)"는 표현은 상관을, "A가 B를 일으킨다(causes, leads to)"는 표현은 인과를 말합니다.\n\n' +
        '인과를 확인하려면 글 A처럼 **한 가지 변인만 바꾸고 나머지는 같게 한** 실험이 필요합니다. 그래서 연구 글을 읽을 때는 "이 연구가 정말 원인을 보여 준 것일까, 함께 변한 것만 보여 준 것일까?"를 묻는 습관이 중요합니다.',
    },
    {
      title: '과학자는 왜 "아마도"라고 말할까',
      body: '과학 글에는 may, might, suggest, appear to, is likely to 같은 표현이 유난히 많습니다. 이것을 **신중한 표현(hedging)**이라고 합니다.\n\n' +
        '과학자가 이런 말을 쓰는 것은 자신이 없어서가 아니라 **증거가 보여 준 만큼만 말하려는** 태도 때문입니다. 실험 하나는 정해진 사람들·정해진 조건에서 얻은 결과라서, 다른 조건에서도 똑같을지는 더 많은 연구가 필요합니다.\n\n' +
        '그래서 과학 글을 요약하거나 풀어 쓸 때도 이 표현을 지워서는 안 됩니다. "잠이 기억을 도울 수 있다(may help)"를 "잠이 기억을 반드시 높인다"로 바꾸면 글쓴이가 하지 않은 주장을 만들어 내는 것입니다.',
    },
  ],

  faq: [
    {
      q: 'variable이 정확히 뭐예요? 그냥 "변하는 것"인가요?',
      a: '실험에서 값이 달라질 수 있는 요소를 모두 variable(변인)이라고 합니다. 그 가운데 연구자가 일부러 바꾸는 것(독립 변인), 그 결과로 달라지는지 재는 것(종속 변인), 공정하게 비교하려고 똑같이 두는 것(통제 변인)을 나누어 보면 실험의 짜임이 보입니다.',
    },
    {
      q: 'such as랑 for example은 뜻이 같은데 어떻게 달라요?',
      a: '뜻은 비슷하지만 쓰는 자리가 다릅니다. such as는 바로 뒤에 명사를 나열하고(devices such as doors and watches), for example은 문장 앞에 쉼표와 함께 와서 새 문장을 이끕니다(For example, a smartphone uses a sensor.). 빈칸 뒤가 명사인지 문장인지 먼저 보십시오.',
    },
    {
      q: '"three times more than"이랑 "three times as many as"는 같은 뜻인가요?',
      a: '일상 영어에서는 보통 같은 뜻(3배)으로 쓰입니다. 다만 "three times more"를 "원래보다 3배만큼 더(곧 4배)"로 읽는 사람도 있어서, 과학 글에서는 헷갈리지 않게 "three times as many as"를 더 많이 씁니다. 수치가 함께 나오면 직접 나누어 확인하는 것이 가장 안전합니다.',
    },
  ],

  mistakes: [
    '결과(실제로 나온 수치)와 결론(그 수치에서 끌어낸 판단)을 섞는 실수 — The results showed ~ 는 결과, concluded that ~ 은 결론입니다.',
    '배수와 차이를 섞거나 비교의 방향을 거꾸로 읽는 실수 — 나누면 배수, 빼면 차이이며, 무엇이 무엇보다 큰지 꼭 확인합니다.',
    '쉬운 말로 풀어 쓰면서 수치·방향·신중한 표현(may)을 바꾸는 실수 — 낱말은 쉬워져도 뜻은 그대로여야 합니다.',
  ],

  gens: [
    {
      id: 'compare-results',
      level: 2,
      title: '실험 결과의 배수와 차이 바르게 읽기',
      make: function (R) {
        var items = [
          { A: 'The plants with fertilizer', a: 'the plants with fertilizer', B: 'The plants with only water', b: 'the plants with only water',
            setup: function (x, y) { return 'In a four-week experiment, the plants with fertilizer grew ' + x + ' centimeters on average, while the plants with only water grew ' + y + ' centimeters.'; },
            verb: 'grew', times: 'as much as', more: function (d) { return d + ' centimeters more'; }, less: function (d) { return d + ' centimeters less'; } },
          { A: 'The new battery', a: 'the new battery', B: 'The old battery', b: 'the old battery',
            setup: function (x, y) { return 'In a test, the new battery lasted ' + x + ' hours, while the old battery lasted ' + y + ' hours.'; },
            verb: 'lasted', times: 'as long as', more: function (d) { return d + ' hours longer'; }, less: function (d) { return d + ' hours shorter'; } },
          { A: 'The students who slept eight hours', a: 'the students who slept eight hours', B: 'The students who slept four hours', b: 'the students who slept four hours',
            setup: function (x, y) { return 'In a memory test, the students who slept eight hours recalled ' + x + ' words on average, while the students who slept four hours recalled ' + y + ' words.'; },
            verb: 'recalled', times: 'as many words as', more: function (d) { return d + ' more words'; }, less: function (d) { return d + ' fewer words'; } },
          { A: 'The robot with the new program', a: 'the robot with the new program', B: 'The robot with the old program', b: 'the robot with the old program',
            setup: function (x, y) { return 'In a sorting test, the robot with the new program sorted ' + x + ' boxes per minute, while the robot with the old program sorted ' + y + ' boxes per minute.'; },
            verb: 'sorted', times: 'as many boxes as', more: function (d) { return d + ' more boxes per minute'; }, less: function (d) { return d + ' fewer boxes per minute'; } },
        ];
        var it = R.pick(items);
        var m = R.pick([2, 3, 4]);
        var y = R.int(3, 9);
        var x = y * m;
        var d = x - y;
        function tw(n) { return n === 2 ? 'twice' : n + ' times'; }
        function times(S, o, n) { return S + ' ' + it.verb + ' ' + tw(n) + ' ' + it.times + ' ' + o + '.'; }
        function more(S, o, k) { return S + ' ' + it.verb + ' ' + it.more(k) + ' than ' + o + '.'; }
        function less(S, o, k) { return S + ' ' + it.verb + ' ' + it.less(k) + ' than ' + o + '.'; }
        var askTimes = R.bool();
        var correct, cands;
        if (askTimes) {
          correct = times(it.A, it.b, m);
          cands = [
            [times(it.B, it.a, m), '비교의 방향을 거꾸로 했습니다. 더 큰 값은 ' + x + '입니다.'],
            [times(it.A, it.b, d), '차이(' + x + ' − ' + y + ' = ' + d + ')를 배수로 착각했습니다. 배수는 나누어 구합니다.'],
            [more(it.A, it.b, m), '배수(' + m + '배)를 차이로 착각했습니다. 실제 차이는 ' + d + '입니다.'],
            [less(it.A, it.b, d), '차이는 맞지만 방향이 거꾸로입니다. 더 큰 값은 ' + x + '입니다.'],
          ];
        } else {
          correct = more(it.A, it.b, d);
          cands = [
            [less(it.A, it.b, d), '차이는 맞지만 방향이 거꾸로입니다. 더 큰 값은 ' + x + '입니다.'],
            [more(it.B, it.a, d), '두 대상의 자리를 뒤바꿨습니다. 더 큰 값은 ' + x + '입니다.'],
            [more(it.A, it.b, x + y), '두 수를 더했습니다. "얼마나 더"는 빼서 구합니다.'],
            [times(it.B, it.a, m), '비교의 방향을 거꾸로 했습니다. 작은 쪽이 큰 쪽의 몇 배일 수는 없습니다.'],
          ];
        }
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        var how = '두 값: ' + x + ', ' + y + ' → 나누면 ' + x + ' ÷ ' + y + ' = ' + m + ' (배수), 빼면 ' + x + ' − ' + y + ' = ' + d + ' (차이)';
        return {
          type: 'choice', concept: 3,
          q: '다음 (가상의) 실험 결과를 바르게 설명한 문장은 무엇입니까?\n\n' + it.setup(x, y),
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: how + '. 그래서 바른 문장은 **' + correct + '**',
        };
      },
    },
  ],

  vocab: [
    { w: 'hypothesis', m: '가설', ex: 'Her hypothesis was that warm water freezes faster.', exm: '그녀의 가설은 따뜻한 물이 더 빨리 언다는 것이었습니다.' },
    { w: 'experiment', m: '실험; 실험하다', ex: 'We did an experiment with two kinds of soil.', exm: '우리는 두 종류의 흙으로 실험을 했습니다.' },
    { w: 'variable', m: '변인, 변수', ex: 'Keep every variable the same except the amount of light.', exm: '빛의 양만 빼고 모든 변인을 똑같이 두십시오.' },
    { w: 'evidence', m: '증거, 근거', ex: 'The scientists found new evidence of water on the planet.', exm: '과학자들은 그 행성에 물이 있다는 새로운 증거를 찾았습니다.' },
    { w: 'data', m: '자료, 데이터', ex: 'The team collected data for three months.', exm: '그 팀은 석 달 동안 자료를 모았습니다.' },
    { w: 'measure', m: '재다, 측정하다', ex: 'We measured the length of each leaf.', exm: '우리는 잎마다 길이를 쟀습니다.' },
    { w: 'average', m: '평균; 평균의', ex: 'The average height of the plants was 12 centimeters.', exm: '식물들의 평균 키는 12센티미터였습니다.' },
    { w: 'volunteer', m: '자원자, 지원자', ex: 'Twenty volunteers took part in the study.', exm: '자원자 스무 명이 그 연구에 참여했습니다.' },
    { w: 'result', m: '결과', ex: 'The results surprised the researchers.', exm: '그 결과는 연구자들을 놀라게 했습니다.' },
    { w: 'conclude', m: '결론을 내리다', ex: 'They concluded that the new method worked better.', exm: '그들은 새 방법이 더 잘 통한다고 결론을 내렸습니다.' },
    { w: 'device', m: '기기, 장치', ex: 'This small device can measure your heart rate.', exm: '이 작은 기기는 심장 박동 수를 잴 수 있습니다.' },
    { w: 'detect', m: '감지하다, 알아내다', ex: 'The alarm detects smoke in the kitchen.', exm: '그 경보기는 부엌의 연기를 감지합니다.' },
    { w: 'effective', m: '효과적인', ex: 'Washing your hands is an effective way to stop germs from spreading.', exm: '손 씻기는 세균이 퍼지는 것을 막는 효과적인 방법입니다.' },
    { w: 'reduce', m: '줄이다', ex: 'The new lights reduced our electricity bill by 20 percent.', exm: '새 전등 덕분에 전기 요금이 20퍼센트 줄었습니다.' },
    { w: 'percent', m: '퍼센트, 백분율', ex: 'About 70 percent of the Earth\'s surface is covered by water.', exm: '지구 표면의 약 70퍼센트가 물로 덮여 있습니다.' },
  ],
});
})();
