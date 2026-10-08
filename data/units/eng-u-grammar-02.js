/* 대학 영어: 문법과 독해 · 시제·태와 학술 문체
 * 예문은 모두 직접 쓴 문장이다(가상의 연구·인물). */
(function () {
  // 시제 고르기 생성기: [빈칸 문장, 단서(해설용), {pres, past, perf}, 정답 종류, 개념 카드]
  var TENSE = [
    ['Light ___ faster than sound.', '언제나 참인 과학적 사실', { pres: 'travels', past: 'traveled', perf: 'has traveled' }, 'pres', 0],
    ['The earth ___ around the sun once a year.', '언제나 참인 과학적 사실', { pres: 'moves', past: 'moved', perf: 'has moved' }, 'pres', 0],
    ['Plants ___ sunlight to make their food.', '언제나 참인 과학적 사실', { pres: 'use', past: 'used', perf: 'have used' }, 'pres', 0],
    ['Metals ___ when they are heated.', '언제나 참인 과학적 사실(when절도 현재)', { pres: 'expand', past: 'expanded', perf: 'have expanded' }, 'pres', 0],
    ['A healthy diet ___ the risk of heart disease.', '일반적으로 받아들여지는 사실', { pres: 'reduces', past: 'reduced', perf: 'has reduced' }, 'pres', 0],
    ['The human heart ___ about 100,000 times a day.', '언제나 참인 사실', { pres: 'beats', past: 'beat', perf: 'has beaten' }, 'pres', 0],
    ['In 2019, a team of researchers ___ the sleep habits of 500 teenagers.', '특정 과거 시점 In 2019', { pres: 'studies', past: 'studied', perf: 'has studied' }, 'past', 2],
    ['In this study, we ___ data from 120 participants in March 2023.', '이번 연구에서 한 일 + 특정 시점 in March 2023', { pres: 'collect', past: 'collected', perf: 'have collected' }, 'past', 2],
    ['The participants ___ a questionnaire before the test began.', '연구 방법 보고 + 과거 시제 began', { pres: 'complete', past: 'completed', perf: 'have completed' }, 'past', 2],
    ['Last year, the average temperature in the city ___ by 1.2 degrees.', '특정 과거 시점 Last year', { pres: 'rises', past: 'rose', perf: 'has risen' }, 'past', 2],
    ['Two years ago, the school ___ a new reading program.', '특정 과거 시점 Two years ago', { pres: 'introduces', past: 'introduced', perf: 'has introduced' }, 'past', 2],
    ['At the end of the experiment, the scores of the second group ___ higher than those of the first group.', '실험 결과 보고 + At the end of the experiment', { pres: 'are', past: 'were', perf: 'have been' }, 'past', 2],
    ['In the first experiment, the samples ___ for ten minutes.', '연구 방법 보고(첫 실험에서 한 일)', { pres: 'are heated', past: 'were heated', perf: 'have been heated' }, 'past', 3],
    ['The interviews ___ in two languages last spring.', '특정 과거 시점 last spring', { pres: 'are conducted', past: 'were conducted', perf: 'have been conducted' }, 'past', 3],
    ['Over the past two decades, many studies ___ the link between diet and mood.', '지금까지 이어지는 기간 Over the past two decades', { pres: 'examine', past: 'examined', perf: 'have examined' }, 'perf', 1],
    ['Since the 1990s, researchers ___ more and more attention to online learning.', '지금까지 이어지는 기간 Since the 1990s', { pres: 'pay', past: 'paid', perf: 'have paid' }, 'perf', 1],
    ['So far, no study ___ a clear cause of the disease.', '지금까지의 결과 So far', { pres: 'identifies', past: 'identified', perf: 'has identified' }, 'perf', 1],
    ['Several researchers ___ this theory in recent years.', '지금까지 이어지는 기간 in recent years', { pres: 'challenge', past: 'challenged', perf: 'have challenged' }, 'perf', 1],
    ['Since its publication, the book ___ into more than twenty languages.', '지금까지 이어지는 기간 Since its publication', { pres: 'is translated', past: 'was translated', perf: 'has been translated' }, 'perf', 1],
    ['Up to now, little research ___ on this small island.', '지금까지의 상태 Up to now', { pres: 'is done', past: 'was done', perf: 'has been done' }, 'perf', 1],
    ['Since 2010, the number of electric cars ___ rapidly.', '지금까지 이어지는 기간 Since 2010', { pres: 'grows', past: 'grew', perf: 'has grown' }, 'perf', 1],
  ];
  var TENSE_WHY = {
    pres: { past: '과거 시제는 지난 일 하나를 보고할 때 씁니다. 언제나 참인 사실·이론은 현재 시제로 씁니다.',
            perf: '현재완료는 과거부터 지금까지 이어진 일에 씁니다. 언제나 참인 사실·이론은 현재 시제로 씁니다.' },
    past: { pres: '특정 과거 시점의 일이거나 이번 연구에서 이미 한 일입니다. 지난 일을 보고할 때는 과거 시제를 씁니다.',
            perf: '현재완료는 특정 과거 시점을 나타내는 말(in 2019, last year, ago 등)이나 이미 끝난 실험 보고와 함께 쓰지 않습니다.' },
    perf: { pres: '지금까지 쌓여 온 연구·변화를 말하는 문장입니다. since·so far·over the past 같은 말이 있으면 현재완료를 씁니다.',
            past: 'since·so far·over the past·up to now처럼 지금까지 이어지는 기간을 나타내는 말이 있으면 과거 시제가 아니라 현재완료를 씁니다.' },
  };
  var TENSE_NAME = { pres: '현재', past: '과거', perf: '현재완료' };

  // 비인칭 구문 바꿔 쓰기 생성기: [It 구문, 바꿔 쓸 틀, 정답, 자주 나오는 틀린 답, 종류]
  var IMPERS = [
    ['It is said that the castle is over 600 years old.', 'The castle is said ___ over 600 years old.', 'to be', 'to have been', 'same'],
    ['It is thought that the disease spreads through water.', 'The disease is thought ___ through water.', 'to spread', 'to have spread', 'same'],
    ['It is known that the drug causes sleepiness.', 'The drug is known ___ sleepiness.', 'to cause', 'to have caused', 'same'],
    ['It is said that the old man knows every street in town.', 'The old man is said ___ every street in town.', 'to know', 'to have known', 'same'],
    ['It is thought that the two languages share a common origin.', 'The two languages are thought ___ a common origin.', 'to share', 'to have shared', 'same'],
    ['It is known that the bird returns to the same nest every spring.', 'The bird is known ___ to the same nest every spring.', 'to return', 'to have returned', 'same'],
    ['It is claimed that the new law protects workers.', 'The new law is claimed ___ workers.', 'to protect', 'to have protected', 'same'],
    ['It is said that the river is the longest in the region.', 'The river is said ___ the longest in the region.', 'to be', 'to have been', 'same'],
    ['It is known that the plant grows only in cold areas.', 'The plant is known ___ only in cold areas.', 'to grow', 'to have grown', 'same'],
    ['It is expected that the new bridge will open next year.', 'The new bridge is expected ___ next year.', 'to open', 'to have opened', 'future'],
    ['It is reported that the storm destroyed more than 200 houses.', 'The storm is reported ___ more than 200 houses.', 'to have destroyed', 'to destroy', 'prior'],
    ['It is reported that the company lost money last year.', 'The company is reported ___ money last year.', 'to have lost', 'to lose', 'prior'],
    ['It is thought that the fire started in the kitchen.', 'The fire is thought ___ in the kitchen.', 'to have started', 'to start', 'prior'],
    ['It is estimated that the population of the town doubled in ten years.', 'The population of the town is estimated ___ in ten years.', 'to have doubled', 'to double', 'prior'],
    ['It is believed that the city was founded in the tenth century.', 'The city is believed ___ in the tenth century.', 'to have been founded', 'to be founded', 'passPrior'],
    ['It is believed that the painting was stolen in 1990.', 'The painting is believed ___ in 1990.', 'to have been stolen', 'to be stolen', 'passPrior'],
    ['It is believed that the temple was built by local farmers.', 'The temple is believed ___ by local farmers.', 'to have been built', 'to be built', 'passPrior'],
    ['It is thought that the vase was made over 300 years ago.', 'The vase is thought ___ over 300 years ago.', 'to have been made', 'to be made', 'passPrior'],
    ['It is believed that the students are studying for the exam now.', 'The students are believed ___ for the exam now.', 'to be studying', 'to have studied', 'prog'],
    ['It is reported that the patient is recovering well.', 'The patient is reported ___ well.', 'to be recovering', 'to have recovered', 'prog'],
    ['It is said that the bridge is used by 30,000 cars a day.', 'The bridge is said ___ by 30,000 cars a day.', 'to be used', 'to have been used', 'pass'],
  ];
  var IMPERS_WHY = {
    same: 'that절의 일이 주절(is said·is thought 등)과 같은 때(현재)입니다. 같은 때면 to + 동사원형을 씁니다.',
    future: 'that절의 will은 앞으로의 일입니다. 앞으로의 일은 to + 동사원형으로 나타냅니다(be expected to V).',
    prior: 'that절의 일(과거)이 주절(현재)보다 앞선 때입니다. 앞선 때는 완료부정사 to have p.p.로 나타냅니다.',
    passPrior: 'that절이 과거 수동태(was p.p.)로, 주절(현재)보다 앞선 때의 수동입니다. 그래서 to have been p.p.를 씁니다.',
    prog: 'that절이 지금 진행 중인 일(be -ing)입니다. 진행은 진행형 부정사(to be -ing 꼴)로 나타냅니다.',
    pass: 'that절이 현재 수동태(is p.p.)입니다. 같은 때의 수동은 to be p.p.로 나타냅니다.',
  };

  Tutor.registerUnit({
    id: 'eng-u-grammar-02',
    course: 'eng-u-grammar',
    title: '시제·태와 학술 문체',
    summary: '학술 글에서 현재·과거·현재완료가 맡는 역할과 수동태·비인칭 구문을 쓰는 까닭을 정리합니다.',
    goals: [
      '학술 글에서 현재·현재완료·과거 시제가 각각 무엇을 나타내는지 구별할 수 있다.',
      '연구의 배경·방법·결과·해석에 알맞은 시제를 고를 수 있다.',
      '수동태로 행위자보다 대상을 앞세우는 문장을 읽고 쓸 수 있다.',
      'It is argued that ~ 과 be thought to ~ 꼴의 비인칭 구문을 서로 바꿀 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '현재 시제: 일반적 사실과 이론 진술',
        body: '학술 글에서 현재 시제는 "지금 이 순간"보다 **언제나 참이라고 받아들여지는 내용**을 말합니다.\n\n' +
          '- 일반적 사실·법칙: Water **expands** when it freezes.\n' +
          '- 이론·정의: The theory **explains** why prices rise.\n' +
          '- 글 자체의 짜임: This paper **examines** three factors.\n' +
          '- 표·그림이 보여 주는 것: Table 1 **shows** the average scores.\n' +
          '- 다른 연구자의 주장 소개: The author **argues** that cities need more parks.\n\n' +
          '마지막 쓰임처럼 이미 발표된 글의 주장을 소개할 때도 현재 시제를 자주 씁니다. 글 속의 주장은 지금도 읽을 수 있고 논의에 쓰이기 때문입니다.\n\n' +
          '> 💡 그래서 현재 시제로 쓴 문장은 "필자가 이것을 지금도 유효한 사실·주장으로 본다"는 신호이기도 합니다.',
        easy: '현재 시제는 교과서에 적힌 문장처럼 "시간이 지나도 바뀌지 않는 말"이라고 생각하십시오. 해가 동쪽에서 뜨는 것은 어제도, 오늘도, 내일도 같으니 The sun rises in the east.라고 씁니다.',
        check: {
          type: 'ox',
          q: 'Water boils at 100°C at sea level.은 이미 실험해서 확인한 일이므로 과거 시제(boiled)로 써야 합니다.',
          answer: false,
          explain: '물이 해수면에서 100°C에 끓는 것은 언제나 참인 과학적 사실입니다. 일반적 사실은 현재 시제(boils)로 씁니다.',
        },
      },
      {
        title: '현재완료: 선행 연구 소개',
        body: '논문의 서론에서는 **지금까지 쌓인 연구**를 소개할 때 현재완료를 즐겨 씁니다.\n\n' +
          '- **Studies have shown** that regular exercise improves memory.\n' +
          '- Researchers **have long debated** the causes of the crisis.\n' +
          '- Little attention **has been paid** to rural schools.\n\n' +
          '현재완료는 과거의 여러 연구가 **지금의 지식 상태**로 이어진다는 느낌을 줍니다. since, so far, over the past ~, in recent years 같은 말과 잘 어울립니다.\n\n' +
          '반면 **한 연구를 특정 시점과 함께** 소개하면 과거 시제를 씁니다.\n\n' +
          '- In 2015, a large study **found** a link between noise and stress. (특정 시점 → 과거)\n' +
          '- Several studies **have found** a link between noise and stress. (지금까지 쌓인 결과 → 현재완료)\n\n' +
          '> ⚠️ 현재완료는 in 2015, last year, ago 같은 **특정 과거 시점을 나타내는 말과 함께 쓰지 않습니다.**',
        easy: '현재완료는 "지금까지의 성적표"입니다. 여러 해 동안 연구가 이어져서 지금 무엇을 알게 되었는지 정리할 때 씁니다.\n\n' +
          '반대로 "2015년에 그 연구가 무엇을 했다"처럼 날짜가 붙은 한 장면을 말할 때는 과거 시제입니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nOver the past ten years, many studies ___ the effects of social media on sleep.',
          choices: ['examine', 'have examined', 'are examined'],
          answer: 1,
          why: [
            '현재 시제는 언제나 참인 사실에 씁니다. Over the past ten years는 지금까지 이어지는 기간이라서 현재완료가 알맞습니다.',
            '',
            '수동태로 쓰면 "연구들이 조사를 받는다"는 뜻이 되어 맞지 않습니다. 연구가 영향을 조사한 것이므로 능동입니다.',
          ],
          explain: 'Over the past ten years(지난 10년 동안)는 과거부터 지금까지 이어지는 기간입니다. 지금까지 쌓인 연구를 소개하므로 현재완료 have examined를 씁니다.',
        },
      },
      {
        title: '과거 시제: 연구 방법과 결과 보고',
        body: '논문의 **방법**과 **결과** 부분에서는 과거 시제를 씁니다. 필자가 이번 연구에서 **이미 한 일**과 그때 **관찰한 것**이기 때문입니다.\n\n' +
          '- 방법: We **recruited** 120 participants. Each participant **completed** a short survey.\n' +
          '- 결과: The second group **scored** higher than the first group.\n\n' +
          '그러나 결과를 **해석하거나 일반화**할 때는 다시 현재 시제로 돌아옵니다.\n\n' +
          '- These results **suggest** that short breaks **help** students concentrate.\n\n' +
          '| 논문의 부분 | 주로 쓰는 시제 | 예 |\n|---|---|---|\n' +
          '| 서론의 배경 지식 | 현재 | Sleep plays a key role in learning. |\n' +
          '| 선행 연구 정리 | 현재완료 | Many studies have examined sleep. |\n' +
          '| 방법·결과 | 과거 | We measured sleep for two weeks. |\n' +
          '| 해석·결론 | 현재 | The findings indicate that ~. |',
        easy: '실험 노트를 쓴다고 생각해 보십시오. "어제 물을 80도로 데웠다, 색이 변했다"는 이미 끝난 일이라 과거입니다. "그러니 이 물질은 열에 약하다"는 결론은 지금도 맞는 말이라 현재입니다.',
        check: {
          type: 'choice',
          q: '논문의 방법 부분에 들어갈 문장으로 시제가 가장 알맞은 것은 무엇입니까?',
          choices: [
            'We interview 30 teachers in two cities.',
            'We interviewed 30 teachers in two cities.',
            'We have interviewed 30 teachers in two cities.',
          ],
          answer: 1,
          why: [
            '현재 시제는 언제나 참인 사실이나 해석에 씁니다. 방법 부분은 이미 한 일을 보고하므로 과거 시제입니다.',
            '',
            '현재완료는 지금까지 쌓인 상태를 말합니다. 이번 연구에서 끝낸 절차를 보고할 때는 과거 시제를 씁니다.',
          ],
          explain: '방법 부분은 연구자가 이미 한 일을 보고하므로 과거 시제(interviewed)를 씁니다.',
        },
      },
      {
        title: '수동태: 행위자보다 대상을 앞세우기',
        body: '수동태(**be + 과거분사**)는 행위를 **받는 대상**을 주어로 세웁니다. 학술 글에서 수동태가 많은 까닭은 다음과 같습니다.\n\n' +
          '1. **누가 했는지보다 무엇을 했는지가 중요할 때**: The samples **were heated** to 80 degrees. (누가 데웠는지는 중요하지 않음)\n' +
          '2. **행위자가 뻔하거나 알 수 없을 때**: The bridge **was built** in the 1930s.\n' +
          '3. **앞 문장에서 말한 대상을 이어 받을 때**: We collected 200 soil samples. **The samples were** then **sent** to a laboratory.\n\n' +
          '행위자를 꼭 밝혀야 할 때만 by ~를 붙입니다.\n\n' +
          '| 꼴 | 수동태 |\n|---|---|\n| 현재 | is/are + p.p. |\n| 과거 | was/were + p.p. |\n| 현재완료 | has/have been + p.p. |\n| 진행 | is/are being + p.p. |\n| 조동사 | can/should/must be + p.p. |\n\n' +
          '> ⚠️ 목적어를 갖지 않는 동사(**occur, happen, appear, exist, emerge**)는 수동태로 쓸 수 없습니다. The error **was occurred** ✕ → The error **occurred** ✓',
        easy: '사진을 찍을 때 누구를 화면 한가운데에 둘지 정하는 것과 같습니다. 능동태는 "하는 사람"을, 수동태는 "당한 것"을 가운데에 둡니다. 실험 보고서에서는 실험한 사람보다 시료·자료가 주인공이라 수동태가 많아집니다.',
        check: {
          type: 'ox',
          q: 'A serious problem was occurred during the test.는 어법에 맞는 문장입니다.',
          answer: false,
          explain: 'occur(일어나다)는 목적어를 갖지 않는 동사라서 수동태로 쓸 수 없습니다. 바른 문장은 A serious problem **occurred** during the test.입니다.',
        },
      },
      {
        title: '비인칭 구문: It is argued that ~, be thought to ~',
        body: '학술 글은 주장의 출처를 "나"나 특정인 대신 **일반적인 견해**로 내세우려고 비인칭 구문을 씁니다.\n\n' +
          '- **It is argued that** online classes reduce student interaction.\n' +
          '- **It is widely believed that** the policy failed.\n\n' +
          'It은 가주어이고, 진짜 주어는 that절입니다. 자주 쓰는 동사: argue, believe, think, know, say, report, estimate, expect, claim.\n\n' +
          'that절의 주어를 문장 앞으로 꺼내면 **주어 + be p.p. + to부정사** 꼴이 됩니다. 이때 두 일의 **시간 관계**에 따라 부정사 꼴이 달라집니다.\n\n' +
          '| that절의 때 | 바꾼 꼴 | 예 |\n|---|---|---|\n' +
          '| 주절과 같은 때 | to + 동사원형 | It is thought that the drug works. → The drug is thought **to work**. |\n' +
          '| 주절보다 앞선 때 | to have p.p. | It is thought that the fire started at night. → The fire is thought **to have started** at night. |\n' +
          '| 앞선 때의 수동 | to have been p.p. | It is believed that the city was founded in 900. → The city is believed **to have been founded** in 900. |\n' +
          '| 지금 진행 중 | to be -ing | It is reported that the patient is recovering. → The patient is reported **to be recovering**. |\n\n' +
          '> 💡 비인칭 구문은 주장에 거리를 두어 객관적인 어조를 만듭니다. 그러나 "누가" 그렇게 주장하는지가 숨겨지므로, 읽을 때는 근거가 따로 제시되는지 살펴보는 것이 좋습니다.',
        easy: '"사람들이 그렇게 말한다"를 영어 학술 글은 "그렇게 말해진다(It is said that ~)"라고 씁니다. 말한 사람을 지우고 내용만 남기는 방법입니다.\n\n' +
          '꺼낸 주어 뒤 부정사는 시계를 보고 고릅니다. 같은 시간이면 to + 동사원형, 더 옛날 일이면 to have p.p.입니다.',
        check: {
          type: 'choice',
          q: '두 문장의 뜻이 같도록 빈칸에 알맞은 것을 고르십시오.\n\nIt is believed that the bridge was built in the 1800s.\n= The bridge is believed ___ in the 1800s.',
          choices: ['to build', 'to be built', 'to have been built'],
          answer: 2,
          why: [
            '능동으로 바꾸면 "다리가 무엇을 짓는다"는 뜻이 됩니다. 다리는 지어진 대상이라 수동이어야 합니다.',
            '수동은 맞지만 시간 관계를 놓쳤습니다. 지어진 일(1800년대)은 믿는 일(현재)보다 앞선 때입니다.',
            '',
          ],
          explain: 'that절이 과거 수동태(was built)이고 주절(is believed)보다 앞선 때이므로 to have been built를 씁니다.',
        },
      },
    ],

    examples: [
      {
        q: '다음 연구 요약(초록)의 괄호 안 동사를 알맞은 시제로 고치십시오.\n\nThis study (examine) how music affects reading speed. We (test) 80 students in two groups. The results (show) that students in the quiet room read faster. These findings (suggest) that silence helps concentration.',
        steps: [
          'This study (examine) ~ : 이 글이 무엇을 다루는지 소개하는 문장이므로 현재 시제 examines입니다.',
          'We (test) 80 students ~ : 이번 연구에서 이미 한 일(방법)이므로 과거 시제 tested입니다.',
          'The results (show) ~ : 이번 연구에서 관찰한 결과 보고이므로 과거 시제 showed입니다. that절의 read도 과거(read)입니다. (초록에서는 The results show ~처럼 현재로 쓰는 글도 많습니다. 여기서는 결과 보고와 해석을 시제로 구별해 과거로 씁니다.)',
          'These findings (suggest) ~ : 결과를 해석하고 일반화하는 문장이므로 현재 시제 suggest입니다. helps도 현재입니다.',
        ],
        answer: 'examines — tested — showed — suggest',
      },
      {
        q: '같은 뜻이 되도록 바꿔 쓰십시오.\n\nIt is reported that the factory released toxic waste into the river.\n= The factory is reported ___ toxic waste into the river.',
        steps: [
          '주절 is reported는 현재, that절 released는 과거입니다.',
          '보도하는 때(현재)보다 내보낸 일(과거)이 앞서므로 완료부정사 to have p.p.를 씁니다.',
          'the factory가 폐기물을 내보낸 주체이므로 능동입니다: to have released',
        ],
        answer: 'The factory is reported **to have released** toxic waste into the river.',
      },
    ],

    terms: [
      { term: '현재완료', def: 'have/has + 과거분사. 과거의 일이 지금까지 이어지거나 지금에 영향을 줄 때 씁니다. 학술 글에서는 선행 연구 소개에 자주 씁니다.' },
      { term: '선행 연구', def: '내 연구보다 먼저 같은 주제를 다룬 연구입니다. 논문의 서론이나 문헌 검토 부분에서 정리합니다.' },
      { term: '수동태', def: 'be + 과거분사. 행위를 받는 대상을 주어로 세우는 문장입니다. 예: The samples were tested.' },
      { term: '행위자', def: '동작을 하는 사람이나 사물입니다. 수동태에서는 by ~로 나타내거나 생략합니다.' },
      { term: '자동사', def: '목적어 없이 쓰는 동사입니다. occur, happen, appear, exist처럼 수동태로 쓸 수 없는 동사가 많습니다.' },
      { term: '비인칭 구문', def: '주장한 사람을 밝히지 않고 It is said/believed/argued that ~처럼 일반적인 견해로 나타내는 구문입니다.' },
      { term: '완료부정사', def: 'to have + 과거분사. 주절보다 앞선 때의 일을 나타냅니다. 예: He is said to have lived here.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '책의 머리말에 들어갈 문장입니다. 빈칸에 알맞은 것은 무엇입니까?\n\nThis chapter ___ the history of public libraries in Asia.',
        choices: ['described', 'has described', 'describes', 'is described'],
        answer: 2,
        why: [
          '과거 시제는 이미 끝난 일을 보고할 때 씁니다. 글 자체의 내용을 소개할 때는 현재 시제를 씁니다.',
          '현재완료는 지금까지 이어진 일에 씁니다. 이 장이 다루는 내용을 소개하는 문장이므로 현재 시제입니다.',
          '',
          '수동태로 쓰면 "이 장이 묘사된다"는 뜻이 됩니다. 이 장이 역사를 다루는 것이므로 능동입니다.',
        ],
        explain: '글이나 장(chapter)이 무엇을 다루는지 소개할 때는 현재 시제를 씁니다. This chapter **describes** ~.',
      },
      {
        id: 'p2', level: 1, type: 'ox', concept: 1,
        q: 'In 2010, several studies have shown that the drug is safe.는 어법에 맞는 문장입니다.',
        answer: false,
        explain: '현재완료는 In 2010 같은 특정 과거 시점과 함께 쓰지 않습니다. In 2010, several studies **showed** ~ 로 쓰거나, 시점을 빼고 Several studies **have shown** ~ 으로 씁니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'text', concept: 2,
        q: '논문의 방법 부분입니다. 괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰십시오.\n\nWe ___ (measure) the height of each plant every morning for two weeks.',
        answer: ['measured'],
        wrong: [
          { a: 'measure', why: '현재 시제는 일반적 사실에 씁니다. 방법 부분은 이번 연구에서 이미 한 일을 보고하므로 과거 시제입니다.' },
          { a: 'have measured', why: '현재완료는 지금까지 쌓인 상태에 씁니다. 끝난 실험 절차를 보고할 때는 과거 시제를 씁니다.' },
        ],
        explain: '방법 부분은 연구자가 이미 한 일을 보고하므로 과거 시제 **measured**를 씁니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe data ___ using a computer program.',
        choices: ['analyzed', 'were analyzed', 'were analyzing', 'have analyzed'],
        answer: 1,
        why: [
          '능동으로 쓰면 자료가 무엇인가를 분석한 것이 됩니다. 자료는 분석을 받는 대상입니다.',
          '',
          '진행형 능동태라서 "자료가 분석하고 있었다"는 뜻이 됩니다.',
          '현재완료 능동태라서 자료가 분석의 주체가 됩니다. 자료는 분석된 대상입니다.',
        ],
        explain: '자료(data)는 분석을 받는 대상이므로 수동태 be + p.p.를 씁니다. The data **were analyzed** using a computer program. (data는 학술 글에서 흔히 복수로 받습니다.)',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'text', concept: 3,
        q: '같은 뜻의 수동태 문장이 되도록 빈칸에 알맞은 말을 쓰십시오.\n\nResearchers tested the new vaccine on 300 volunteers.\n= The new vaccine ___ on 300 volunteers.',
        answer: ['was tested'],
        wrong: [
          { a: 'tested', why: 'be동사가 빠졌습니다. 수동태는 be + 과거분사입니다.' },
          { a: 'is tested', why: '원래 문장이 과거(tested)이므로 be동사도 과거 was를 씁니다.' },
        ],
        explain: '원래 문장이 과거 시제이고 주어 vaccine이 단수이므로 **was tested**입니다. 행위자 researchers는 뻔한 정보라 by researchers를 생략했습니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '다음 문장에서 that절의 내용은 어떤 성격의 주장으로 제시되어 있습니까?\n\nIt is widely believed that the new policy reduced traffic.',
        choices: ['필자 개인의 강한 확신', '널리 퍼진 일반적 견해', '특정 연구자 한 사람의 주장', '필자가 부정하는 거짓 정보'],
        answer: 1,
        why: [
          'I believe처럼 필자가 직접 나서지 않았습니다. 비인칭 구문은 오히려 필자 개인을 숨깁니다.',
          '',
          '특정 연구자의 이름이 없습니다. It is believed that ~은 누가 믿는지 밝히지 않는 구문입니다.',
          '이 문장만으로는 필자가 부정하는지 알 수 없습니다. 견해를 소개할 뿐입니다.',
        ],
        explain: 'It is widely believed that ~은 "널리 믿어진다", 곧 많은 사람이 받아들이는 일반적 견해로 내용을 제시합니다. 누가 믿는지는 밝히지 않습니다.',
      },
      {
        id: 'p7', level: 1, type: 'ox', concept: 0,
        q: '학술 글에서 이미 발표된 글의 주장을 소개할 때(The author ___ that ~)는 과거 시제만 쓸 수 있습니다.',
        answer: false,
        explain: '발표된 글의 주장은 지금도 읽히고 논의되므로 현재 시제(The author **argues** that ~)로 소개하는 일이 많습니다. 과거 시제를 쓰는 것도 틀리지는 않지만, "과거만" 쓸 수 있다는 말은 틀립니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 2,
        q: '연구의 결과와 해석입니다. 빈칸 (A), (B)에 들어갈 짝으로 가장 알맞은 것은 무엇입니까?\n\nThe students in Group A (A) higher than those in Group B. This (B) that the new method is effective.',
        choices: ['scored — suggests', 'score — suggested', 'have scored — suggested', 'scoring — suggests'],
        answer: 0,
        why: [
          '',
          '(A)는 이번 연구에서 관찰한 결과라서 과거, (B)는 해석이라서 현재입니다. 둘을 거꾸로 썼습니다.',
          '(A)의 결과 보고에는 과거 시제가 알맞고, (B)의 해석에는 현재 시제가 알맞습니다.',
          '(B)는 맞습니다. 그러나 scoring은 분사·동명사라서 정동사가 아닙니다. (A) 자리에는 시제가 드러나는 동사(과거 scored)가 필요합니다.',
        ],
        hint: '결과 보고와 결과 해석은 시제가 다릅니다.',
        explain: '(A) 이번 연구에서 관찰한 결과 → 과거 scored. (B) 결과를 해석해 지금도 유효한 결론을 내리는 문장 → 현재 suggests.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'text', concept: 4,
        q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 쓰십시오.\n\nIt is thought that the ship sank in a storm.\n= The ship is thought ___ in a storm.',
        answer: ['to have sunk'],
        hint: '배가 가라앉은 때와 사람들이 생각하는 때 가운데 어느 쪽이 먼저인지 보십시오.',
        wrong: [
          { a: 'to sink', why: '가라앉은 일(과거)이 생각하는 때(현재)보다 앞섭니다. 앞선 때는 to have p.p.로 나타냅니다.' },
          { a: 'to have sank', why: 'sank는 과거형입니다. 완료부정사에는 과거분사 sunk를 씁니다(sink - sank - sunk).' },
        ],
        explain: 'that절의 sank(과거)가 주절 is thought(현재)보다 앞선 때이므로 완료부정사 **to have sunk**를 씁니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '어법상 **틀린** 문장은 무엇입니까?',
        choices: [
          'The meeting was held in May.',
          'A new pattern emerged from the data.',
          'Many changes were happened last year.',
          'The results have been published online.',
        ],
        answer: 2,
        why: [
          'hold(열다)는 목적어를 갖는 동사라서 수동태 was held가 맞습니다.',
          'emerge는 수동태로 쓰지 않는 동사이고, 이 문장은 능동 emerged로 바르게 썼습니다.',
          '',
          'publish는 목적어를 갖는 동사라서 현재완료 수동태 have been published가 맞습니다.',
        ],
        hint: '수동태로 쓸 수 없는 동사가 있습니다.',
        explain: 'happen(일어나다)은 목적어를 갖지 않는 동사라서 수동태로 쓸 수 없습니다. Many changes **happened** last year.가 바릅니다.',
      },
      {
        id: 'p11', level: 2, type: 'order', concept: 1,
        q: '낱말 덩어리를 바른 순서로 놓아 문장을 완성하십시오.\n\n(뜻: 학습에서 음악의 역할을 살펴본 연구는 거의 없다.)',
        choices: ['have examined', 'Few studies', 'of music in learning', 'the role'],
        answer: [1, 0, 3, 2],
        explain: 'Few studies / have examined / the role / of music in learning. — 지금까지의 연구 상황을 말하므로 현재완료를 썼습니다. few는 "거의 없는"이라는 부정의 뜻입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 3,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe new library ___ at the moment, so students have to use the old one.',
        choices: ['is building', 'has built', 'is being built', 'was built'],
        answer: 2,
        why: [
          '능동 진행형이라서 "도서관이 무엇인가를 짓고 있다"는 뜻이 됩니다.',
          '능동 현재완료라서 도서관이 짓는 주체가 됩니다. 도서관은 지어지는 대상입니다.',
          '',
          '이미 다 지어졌다면 새 도서관을 쓸 수 있습니다. at the moment(지금)와 어울리는 진행형이 필요합니다.',
        ],
        explain: '도서관은 지어지는 대상이고(수동), 지금 공사 중입니다(진행). 진행 수동태 is being + p.p.를 써서 **is being built**입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 4,
        q: '두 문장의 뜻이 같도록 빈칸에 알맞은 것을 고르십시오.\n\nIt was believed that the earth was flat.\n= The earth was believed ___ flat.',
        choices: ['to have been', 'to be', 'being', 'to being'],
        answer: 1,
        why: [
          '주절도 과거(was believed), that절도 과거(was)입니다. 두 일이 같은 때이므로 완료부정사를 쓰지 않습니다.',
          '',
          'believe A to be B 꼴의 수동이므로 to부정사가 필요합니다.',
          '여기의 to는 전치사가 아니라 부정사의 to입니다. 뒤에 동사원형이 옵니다.',
        ],
        hint: '주절의 동사도 과거라는 점에 주의하십시오. 시간 관계는 두 동사 사이에서 따집니다.',
        explain: '믿던 때(과거)와 지구가 평평하다고 여겨진 때(과거)가 같은 때입니다. 그래서 to + 동사원형인 **to be**를 씁니다. to have been이라면 "믿던 때보다 더 앞선 때에 평평했다"는 뜻이 됩니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'text', concept: 4,
        q: 'It 구문으로 바꿔 쓸 때 빈칸에 알맞은 말을 쓰십시오.\n\nThe old road is thought to have been used by traders in the twelfth century.\n= It is thought that the old road ___ by traders in the twelfth century.',
        answer: ['was used'],
        hint: 'to have been p.p.는 주절보다 앞선 때의 수동입니다. in the twelfth century도 단서입니다.',
        wrong: [
          { a: 'is used', why: 'to have been used는 주절(현재)보다 앞선 때입니다. 12세기의 일이므로 과거 수동태 was used입니다.' },
          { a: 'has been used', why: 'in the twelfth century 같은 특정 과거 시점은 현재완료와 함께 쓰지 않습니다.' },
        ],
        explain: '완료부정사 to have been used는 주절(is thought)보다 앞선 때의 수동입니다. 특정 과거 시점(in the twelfth century)이 있으므로 that절은 과거 수동태 **was used**입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 2,
        q: '다음 글의 (A)~(C)에 들어갈 시제의 짝으로 가장 알맞은 것은 무엇입니까?\n\nMany studies (A) that sleep affects memory. In our study, we (B) 60 students for two weeks. The results (C) that even one night of poor sleep reduces recall.',
        choices: [
          'have shown — observe — indicate',
          'showed — have observed — indicated',
          'have shown — observed — indicate',
          'show — observed — have indicated',
        ],
        answer: 2,
        why: [
          '(B)는 이번 연구에서 이미 한 일이므로 현재가 아니라 과거 시제를 씁니다.',
          '(A)는 특정 시점 없이 지금까지 쌓인 연구를 소개하므로 현재완료가 알맞고, (B)는 끝난 절차라서 과거입니다.',
          '',
          '(C)의 that절이 일반적인 결론(reduces, 현재)이므로 해석의 동사도 현재(indicate)가 어울립니다. 현재완료는 결과를 해석하는 문장에 맞지 않습니다.',
        ],
        hint: '선행 연구 소개, 방법 보고, 결과 해석의 시제를 차례로 떠올리십시오.',
        explain: '(A) 선행 연구 소개 → 현재완료 have shown. (B) 이번 연구에서 한 일 → 과거 observed. (C) 결과를 일반화하는 해석 → 현재 indicate(that절의 reduces도 현재).',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '다음 문장 바로 뒤에 이어질 문장으로 가장 알맞은 것은 무엇입니까?\n\nWe collected 150 water samples from the river.',
        choices: [
          'The samples tested for lead in a laboratory.',
          'Lead was then testing the samples in a laboratory.',
          'The samples were then tested for lead in a laboratory.',
          'The samples were then testing for lead in a laboratory.',
        ],
        answer: 2,
        why: [
          '능동태라서 "시료가 납을 검사했다"는 뜻이 됩니다. 시료는 검사를 받는 대상입니다.',
          '주어와 동작이 뒤바뀌었습니다. 납이 시료를 검사할 수는 없습니다.',
          '',
          'were testing은 능동 진행형입니다. 시료가 검사의 주체가 되어 뜻이 맞지 않습니다.',
        ],
        hint: '앞 문장의 마지막 정보(samples)를 주어로 이어 받으면 글이 자연스럽게 흐릅니다.',
        explain: '앞 문장에서 말한 samples를 주어로 이어 받고, 시료는 검사를 받는 대상이므로 수동태 were tested를 씁니다. 행위자(연구자)는 뻔하므로 생략했습니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'text', concept: 3,
        q: '괄호 안의 동사를 알맞은 꼴로 바꾸어 쓰십시오.\n\nSince 2015, the museum ___ (visit) by more than one million people.',
        answer: ['has been visited'],
        hint: '시간 표현(since)과 by 뒤의 행위자를 함께 보십시오.',
        wrong: [
          { a: 'was visited', why: 'Since 2015는 지금까지 이어지는 기간이므로 과거가 아니라 현재완료를 씁니다.' },
          { a: 'has visited', why: '박물관은 방문을 받는 대상입니다. 현재완료 수동태 has been p.p.로 써야 합니다.' },
        ],
        explain: 'Since 2015(지금까지 이어지는 기간) → 현재완료, 박물관은 방문을 받는 대상 → 수동. 둘을 합쳐 **has been visited**입니다.',
      },
    ],

    deeper: [
      {
        title: '수동태가 많을수록 좋은 학술 글일까?',
        body: '예전에는 학술 글, 특히 실험 보고서에서 "I", "we"를 피하고 수동태를 많이 쓰는 것이 객관적인 문체로 여겨졌습니다. 그러나 수동태가 지나치게 많으면 누가 무엇을 했는지 흐려지고 문장이 길어집니다.\n\n' +
          '그래서 요즘 여러 학술 글쓰기 안내서는 **능동태를 기본으로 하고, 대상을 앞세울 까닭이 있을 때 수동태를 고르라**고 권합니다. We measured the temperature.처럼 연구자를 주어로 쓰는 문장도 흔합니다.\n\n' +
          '분야마다 관습이 다르므로, 전공 분야의 논문 몇 편을 골라 방법 부분에서 능동과 수동이 어떻게 섞여 있는지 살펴보는 것이 가장 좋은 공부입니다.',
      },
      {
        title: '시제로 드러나는 필자의 태도',
        body: '선행 연구를 소개하는 동사의 시제는 필자의 태도를 은근히 드러내기도 합니다.\n\n' +
          '- The author **argues** that ~ : 그 주장을 지금도 살아 있는 논의로 다룹니다.\n' +
          '- The author **argued** that ~ : 과거의 한 연구로 거리를 두고 보고합니다.\n' +
          '- Studies **have shown** that ~ : 여러 연구가 쌓여 지금의 지식이 되었다고 봅니다.\n\n' +
          '모든 글이 이 구분을 엄격히 지키는 것은 아니지만, 비판적으로 읽을 때 필자가 어떤 연구를 "지금도 유효한 것"으로 보는지 가늠하는 단서가 됩니다. 확신의 정도를 조절하는 조동사·완곡 표현은 다음 단원에서 다룹니다.',
      },
    ],

    faq: [
      {
        q: '선행 연구를 쓸 때 과거랑 현재완료 중 뭘 써요?',
        a: '한 연구를 연도와 함께 콕 집어 소개하면 과거(In 2015, a study found ~), 여러 연구가 쌓여 지금 알게 된 것을 말하면 현재완료(Studies have found ~)가 기본입니다. 연구자의 주장 자체를 지금도 유효한 논의로 소개할 때는 현재(The author argues ~)도 씁니다.',
      },
      {
        q: '결과를 쓸 때는 과거인데 왜 결론은 현재로 써요?',
        a: '결과는 이번 연구에서 그때 관찰한 사실이라 과거입니다. 결론은 그 결과에서 끌어낸, 지금도 그리고 앞으로도 성립한다고 보는 일반적 주장이라 현재입니다. The scores increased.(결과) → This suggests that practice improves accuracy.(해석)',
      },
      {
        q: 'be thought to 다음에 to have p.p.는 언제 써요?',
        a: '생각하는 때보다 그 일이 먼저 일어났을 때입니다. It is thought that the fire started at night.에서 불이 난 일(과거)은 생각하는 때(현재)보다 앞서므로 The fire is thought to have started at night.가 됩니다. 같은 때의 일이면 to + 동사원형입니다.',
      },
    ],

    mistakes: [
      '특정 과거 시점과 현재완료를 함께 쓰는 실수 — In 2018, researchers **have found** ✕ → In 2018, researchers **found** ✓',
      '목적어를 갖지 않는 동사를 수동태로 쓰는 실수 — The accident **was happened** ✕ → The accident **happened** ✓ (occur, appear, exist도 같습니다)',
      '비인칭 구문을 바꿔 쓸 때 시간 관계를 놓치는 실수 — It is said that he lived here. → He is said **to live** here ✕ → **to have lived** ✓',
    ],

    gens: [
      {
        id: 'academic-tense',
        level: 1,
        title: '학술 글의 시제 고르기',
        make: function (R) {
          var it = R.pick(TENSE);
          var forms = it[2];
          var key = it[3];
          var correct = forms[key];
          var reason = {};
          var wrongs = [];
          ['pres', 'past', 'perf'].forEach(function (k) {
            if (k !== key) { reason[forms[k]] = TENSE_WHY[key][k]; wrongs.push(forms[k]); }
          });
          var pick = R.choices(correct, wrongs, 3);
          return {
            type: 'choice', concept: it[4],
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '단서: ' + it[1] + '. 그래서 ' + TENSE_NAME[key] + ' 시제를 씁니다.\n\n' + it[0].replace('___', '**' + correct + '**'),
          };
        },
      },
      {
        id: 'impersonal',
        level: 2,
        title: '비인칭 구문 바꿔 쓰기',
        make: function (R) {
          var it = R.pick(IMPERS);
          var why = IMPERS_WHY[it[4]];
          return {
            type: 'short', check: 'text', concept: 4,
            q: '두 문장의 뜻이 같도록 빈칸에 알맞은 말을 쓰십시오.\n\n' + it[0] + '\n= ' + it[1],
            answer: [it[2]],
            wrong: [{ a: it[3], why: why }],
            explain: why + '\n\n' + it[1].replace('___', '**' + it[2] + '**'),
          };
        },
      },
    ],

    vocab: [
      { w: 'previous', m: '이전의, 앞선', ex: 'Previous studies focused on adults only.', exm: '이전 연구들은 성인만 다루었습니다.' },
      { w: 'recruit', m: '(사람을) 모집하다', ex: 'We recruited forty volunteers for the test.', exm: '우리는 그 실험에 자원자 40명을 모집했습니다.' },
      { w: 'volunteer', m: '자원자; 자원하다', ex: 'Each volunteer received a small gift.', exm: '자원자마다 작은 선물을 받았습니다.' },
      { w: 'measure', m: '측정하다, 재다', ex: 'We measured the temperature every hour.', exm: '우리는 매시간 온도를 측정했습니다.' },
      { w: 'sample', m: '시료, 표본', ex: 'The water samples were kept in a cold room.', exm: '물 시료는 차가운 방에 보관되었습니다.' },
      { w: 'procedure', m: '절차', ex: 'The procedure took about thirty minutes.', exm: '그 절차는 약 30분이 걸렸습니다.' },
      { w: 'indicate', m: '나타내다, 보여 주다', ex: 'The results indicate that the plan works.', exm: '결과는 그 계획이 효과가 있음을 보여 줍니다.' },
      { w: 'estimate', m: '추정하다; 추정치', ex: 'It is estimated that the bridge is 200 years old.', exm: '그 다리는 200년 된 것으로 추정됩니다.' },
      { w: 'debate', m: '논쟁하다; 논쟁', ex: 'Experts have debated the issue for years.', exm: '전문가들은 그 문제를 여러 해 동안 논쟁해 왔습니다.' },
      { w: 'publication', m: '출판, 발표', ex: 'The book became popular soon after its publication.', exm: '그 책은 출판되자마자 인기를 얻었습니다.' },
      { w: 'occur', m: '일어나다, 발생하다', ex: 'The error occurred during the second test.', exm: '그 오류는 두 번째 실험 중에 일어났습니다.' },
      { w: 'laboratory', m: '실험실', ex: 'The samples were sent to a laboratory.', exm: '시료는 실험실로 보내졌습니다.' },
      { w: 'claim', m: '주장하다; 주장', ex: 'Some people claim that the method is unsafe.', exm: '어떤 사람들은 그 방법이 안전하지 않다고 주장합니다.' },
    ],
  });
})();
