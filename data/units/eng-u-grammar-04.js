/* 대학 영어: 문법과 독해 · 명사화와 학술 어휘
 * 예문은 모두 직접 쓴 문장이다(가상의 연구·인물). */
(function () {
  // 명사형 쓰기 생성기: [원래 낱말, 품사, 뜻, [허용 정답], 자주 나오는 틀린 답(없으면 null), 그 까닭, 명사의 뜻]
  var NOMIN = [
    ['analyze', '동사', '분석하다', ['analysis'], 'analyzation', 'analyze에 -ation을 붙인 꼴은 쓰지 않습니다. -sis로 끝나는 analysis입니다.', '분석'],
    ['decide', '동사', '결정하다', ['decision'], 'decition', '철자를 확인하십시오. decide의 명사는 -sion으로 끝납니다.', '결정'],
    ['fail', '동사', '실패하다', ['failure'], null, '', '실패'],
    ['grow', '동사', '자라다, 늘다', ['growth'], null, '', '성장, 증가'],
    ['significant', '형용사', '중요한, 유의미한', ['significance'], null, '', '중요성, 유의성'],
    ['able', '형용사', '~할 수 있는', ['ability'], null, '', '능력'],
    ['explain', '동사', '설명하다', ['explanation'], 'explaination', '자주 틀리는 철자입니다. 명사에서는 explain의 i가 빠져 explanation이 됩니다.', '설명'],
    ['maintain', '동사', '유지하다', ['maintenance'], 'maintainance', '자주 틀리는 철자입니다. 명사는 main-te-nance입니다.', '유지, 관리'],
    ['occur', '동사', '일어나다', ['occurrence'], 'occurence', '자주 틀리는 철자입니다. 명사에서는 r을 두 번 써서 occurrence입니다.', '발생'],
    ['describe', '동사', '묘사하다, 설명하다', ['description'], 'describtion', '철자를 확인하십시오. 명사에서는 b가 p로 바뀌어 description입니다.', '묘사, 설명'],
    ['approve', '동사', '승인하다', ['approval'], null, '', '승인'],
    ['reduce', '동사', '줄이다', ['reduction'], null, '', '감소, 축소'],
    ['improve', '동사', '개선하다', ['improvement'], null, '', '개선, 향상'],
    ['develop', '동사', '발전시키다, 개발하다', ['development'], 'developement', '자주 틀리는 철자입니다. develop 뒤에 e 없이 바로 -ment를 붙입니다.', '발전, 개발'],
    ['accurate', '형용사', '정확한', ['accuracy'], null, '', '정확성'],
    ['likely', '형용사', '~할 것 같은', ['likelihood'], null, '', '가능성'],
    ['behave', '동사', '행동하다', ['behavior', 'behaviour'], null, '', '행동'],
    ['assume', '동사', '가정하다', ['assumption'], 'assumtion', '철자를 확인하십시오. 명사에서는 p가 들어가 assumption입니다.', '가정'],
    ['compare', '동사', '비교하다', ['comparison'], 'comparation', 'compare의 명사는 -ation이 아니라 -ison으로 끝나는 comparison입니다.', '비교'],
    ['argue', '동사', '주장하다, 논쟁하다', ['argument'], 'arguement', '자주 틀리는 철자입니다. argue의 끝 e를 빼고 -ment를 붙여 argument입니다.', '주장, 논거'],
    ['consistent', '형용사', '일관된', ['consistency'], null, '', '일관성'],
    ['complex', '형용사', '복잡한', ['complexity'], null, '', '복잡성'],
    ['conclude', '동사', '결론을 내리다', ['conclusion'], null, '', '결론'],
    ['define', '동사', '정의하다', ['definition'], null, '', '정의'],
    ['available', '형용사', '이용할 수 있는', ['availability'], null, '', '이용 가능성'],
  ];

  // 학술 낱말 짝 생성기: [빈칸 문장, 정답, [[오답, 까닭], …], 짝(해설용)]
  var COLLO = [
    ['The team plans to ___ research on sleep and memory.', 'conduct', [['make', 'research는 make와 어울리지 않습니다.'], ['play', 'play는 a role과 어울립니다(play a role in).'], ['raise', 'raise는 a question·an issue와 어울립니다.']], 'conduct research(연구를 수행하다)'],
    ['Based on the data, we can ___ a conclusion.', 'draw', [['do', 'do a conclusion이라는 짝은 쓰지 않습니다.'], ['put', 'put a conclusion이라는 짝은 쓰지 않습니다.'], ['take', 'take는 ~ into account·a role 등과 어울리고, a conclusion과는 어울리지 않습니다.']], 'draw a conclusion(결론을 끌어내다)'],
    ['This study aims to ___ the hypothesis that music improves memory.', 'test', [['solve', 'solve는 문제(problem)를 푸는 것입니다. 가설은 검증(test)합니다.'], ['do', 'do the hypothesis라는 짝은 쓰지 않습니다.'], ['take', 'take the hypothesis라는 짝은 쓰지 않습니다.']], 'test a hypothesis(가설을 검증하다)'],
    ["Parents ___ an important role in children's language learning.", 'play', [['do', 'do a role이라는 짝은 쓰지 않습니다.'], ['make', 'make a role이라는 짝은 쓰지 않습니다.'], ['give', 'give a role은 "역할을 맡기다"라는 다른 뜻입니다.']], 'play a role in(~에서 역할을 하다)'],
    ['Researchers ___ data from 300 schools.', 'collected', [['did', 'did data라는 짝은 쓰지 않습니다.'], ['made', '자료를 모은다는 뜻으로 make data라는 짝은 쓰지 않습니다.'], ['raised', 'raise는 돈(funds)이나 질문과 어울립니다.']], 'collect data(자료를 수집하다)'],
    ['The new findings ___ evidence that the drug is effective.', 'provide', [['make', 'make evidence라는 짝은 쓰지 않습니다.'], ['do', 'do evidence라는 짝은 쓰지 않습니다.'], ['take', 'take evidence는 "증거를 가져가다"라는 뜻이 되어 맞지 않습니다.']], 'provide evidence(증거를 제시하다)'],
    ['The government must ___ the problem of air pollution.', 'address', [['do', 'do the problem이라는 짝은 쓰지 않습니다.'], ['make', 'make the problem은 "문제를 만들다"라는 뜻이 되어 맞지 않습니다.'], ['speak', 'speak는 목적어로 언어(speak English)를 받습니다. 문제를 다룬다는 뜻이 아닙니다.']], 'address a problem(문제를 다루다)'],
    ['Before we start, we need to ___ a few assumptions.', 'make', [['do', 'do an assumption이라는 짝은 쓰지 않습니다.'], ['take', 'take an assumption이라는 짝은 쓰지 않습니다.'], ['put', 'put an assumption이라는 짝은 쓰지 않습니다.']], 'make an assumption(가정을 세우다)'],
    ['The results ___ a question about the safety of the method.', 'raise', [['rise', 'rise(오르다)는 목적어를 갖지 않는 동사입니다. 목적어를 갖는 raise와 헷갈렸습니다.'], ['lift', 'lift는 물건을 들어 올리는 것입니다. 질문과는 어울리지 않습니다.'], ['do', 'do a question이라는 짝은 쓰지 않습니다.']], 'raise a question(의문을 제기하다)'],
    ['Climate change ___ a serious threat to coastal cities.', 'poses', [['puts', 'put a threat이라는 짝은 쓰지 않습니다.'], ['does', 'do a threat이라는 짝은 쓰지 않습니다.'], ['makes', 'make a threat은 "(누구를) 협박하다"라는 다른 뜻입니다.']], 'pose a threat(위협이 되다)'],
    ['We must ___ into account the age of the participants.', 'take', [['make', 'make ~ into account라는 짝은 쓰지 않습니다.'], ['put', 'put ~ into account라는 짝은 쓰지 않습니다.'], ['bring', 'bring ~ into account라는 짝은 쓰지 않습니다.']], 'take ~ into account(~을 고려하다)'],
    ['The teacher ___ great emphasis on careful reading.', 'places', [['does', 'do emphasis라는 짝은 쓰지 않습니다.'], ['makes', 'make emphasis라는 짝은 쓰지 않습니다.'], ['takes', 'take emphasis라는 짝은 쓰지 않습니다.']], 'place emphasis on(~을 강조하다)'],
    ['More studies are needed to ___ light on this issue.', 'shed', [['put', 'put light on이라는 짝은 쓰지 않습니다.'], ['make', 'make light of는 "~을 가볍게 여기다"라는 다른 표현입니다.'], ['give', 'give light on이라는 짝은 쓰지 않습니다.']], 'shed light on(~을 밝히다, 해명하다)'],
    ['The survey ___ of twenty questions.', 'consists', [['contains', 'contain은 of 없이 목적어를 바로 받습니다(contains twenty questions).'], ['includes', 'include는 of 없이 목적어를 바로 받습니다.'], ['composes', '"~로 이루어지다"는 is composed of로 씁니다. composes of는 쓰지 않습니다.']], 'consist of(~로 이루어지다)'],
    ['The study ___ on the eating habits of college students.', 'focuses', [['aims', 'aim은 at이나 to부정사와 어울립니다(aim at, aim to).'], ['looks', 'look on은 "구경하다"라는 다른 뜻입니다.'], ['points', 'point on이라는 짝은 쓰지 않습니다(point to·point out).']], 'focus on(~에 초점을 맞추다)'],
    ['The two studies ___ different conclusions.', 'reached', [['arrived', 'arrive는 at이 있어야 합니다(arrived at different conclusions).'], ['came', 'come은 to가 있어야 합니다(came to different conclusions).'], ['went', 'go는 결론과 어울리지 않습니다.']], 'reach a conclusion(결론에 이르다)'],
    ['Several factors ___ to the success of the project.', 'contributed', [['caused', 'cause는 to 없이 목적어를 바로 받습니다.'], ['made', 'made to the success라는 짝은 쓰지 않습니다.'], ['resulted', 'result는 in이나 from과 어울립니다(result in, result from).']], 'contribute to(~에 기여하다)'],
    ['The new results ___ the earlier findings.', 'confirm', [['agree', 'agree는 with가 있어야 합니다(agree with the earlier findings).'], ['accord', 'accord는 with와 함께 씁니다. 목적어를 바로 받지 않습니다.'], ['reply', 'reply는 to가 있어야 하고, 뜻도 "대답하다"라서 맞지 않습니다.']], 'confirm the findings(결과를 확인해 주다)'],
    ['It is important to ___ attention to small details.', 'pay', [['make', 'make attention이라는 짝은 쓰지 않습니다.'], ['do', 'do attention이라는 짝은 쓰지 않습니다.'], ['take', 'take attention이라는 짝은 쓰지 않습니다.']], 'pay attention to(~에 주의를 기울이다)'],
    ['The scientist ___ an experiment to check her idea.', 'carried out', [['took out', 'take out은 "꺼내다"라는 뜻입니다.'], ['put out', 'put out은 "(불을) 끄다"라는 뜻입니다.'], ['gave out', 'give out은 "나누어 주다"라는 뜻입니다.']], 'carry out an experiment(실험을 하다)'],
    ['The author ___ a strong argument against the plan.', 'makes', [['does', 'do an argument라는 짝은 쓰지 않습니다.'], ['takes', 'take an argument라는 짝은 쓰지 않습니다.'], ['says', 'say는 an argument를 목적어로 받는 짝으로 쓰지 않습니다.']], 'make an argument(주장을 펴다)'],
  ];

  Tutor.registerUnit({
    id: 'eng-u-grammar-04',
    course: 'eng-u-grammar',
    title: '명사화와 학술 어휘',
    summary: '동사를 명사로 바꿔 쓰는 학술 문체를 이해하고, 자주 쓰이는 학술 어휘와 낱말 짝을 익힙니다.',
    goals: [
      '동사·형용사를 명사로 바꾸는 접미사를 알고 명사형을 쓸 수 있다.',
      '명사화된 문장을 동사 중심 문장으로 풀어 읽을 수 있다.',
      '접두사·접미사로 낯선 학술 어휘의 뜻과 품사를 짐작할 수 있다.',
      '자주 쓰는 학술 어휘의 쓰임과 낱말 짝(conduct research, draw a conclusion)을 바르게 쓸 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '동사·형용사의 명사화',
        body: '**명사화**는 동사나 형용사로 말할 내용을 명사로 바꾸어 쓰는 것입니다. 학술 글은 명사화를 아주 많이 씁니다.\n\n' +
          '- 동사 중심: The city **grew rapidly**, so housing **became expensive**.\n' +
          '- 명사화: The **rapid growth** of the city **made** housing expensive.\n\n' +
          '명사화하면 ① 정보를 한 덩어리로 압축하고, ② 그 덩어리를 문장의 주어로 세워 다음 내용으로 이어 가고, ③ 행위자를 드러내지 않아 객관적인 어조를 만들 수 있습니다.\n\n' +
          '| 바뀌는 꼴 | 예 |\n|---|---|\n' +
          '| 동사 + -tion / -sion | reduce → reduction, decide → decision |\n' +
          '| 동사 + -ment | improve → improvement, develop → development |\n' +
          '| 동사 + -al / -ure | approve → approval, fail → failure |\n' +
          '| 동사 + -ance / -ence | perform → performance, occur → occurrence |\n' +
          '| 모양이 크게 바뀜 | analyze → analysis, grow → growth, behave → behavior |\n' +
          '| 형용사 + -ity / -cy | able → ability, accurate → accuracy |\n' +
          '| 형용사 + -ance / -ence | significant → significance, different → difference |\n' +
          '| 형용사 + -ness / -hood | aware → awareness, likely → likelihood |\n\n' +
          '> ⚠️ 동사를 명사로 바꾸면 그 동사를 꾸미던 **부사는 형용사로** 바뀝니다. grew **rapidly** → **rapid** growth',
        easy: '명사화는 움직이는 장면(동사)을 사진 한 장(명사)으로 찍어 두는 것과 같습니다. "도시가 빠르게 자랐다"는 움직임을 "도시의 빠른 성장"이라는 사진으로 찍으면, 그 사진을 다른 문장의 주인공으로 쓸 수 있습니다.',
        check: {
          type: 'choice',
          q: 'reduce(줄이다)의 명사형으로 알맞은 것은 무엇입니까?',
          choices: ['reducement', 'reduction', 'reducity'],
          answer: 1,
          why: [
            '-ment는 improve·develop 같은 동사에 붙습니다. reduce의 명사형은 -tion으로 끝납니다.',
            '',
            '-ity는 주로 형용사에 붙어 명사를 만듭니다(able → ability). reduce는 동사입니다.',
          ],
          explain: 'reduce의 명사형은 reduction(감소, 축소)입니다. 예: a reduction in costs(비용 절감)',
        },
      },
      {
        title: '명사화된 문장을 동사 중심으로 풀어 읽기',
        body: '명사화된 문장은 짧지만 뜻이 빽빽합니다. 읽을 때는 거꾸로 **동사 중심 문장으로 풀어** 보면 뜻이 또렷해집니다.\n\n' +
          '1. 명사화된 명사를 **동사**로 되돌립니다. (rejection → reject)\n' +
          '2. 소유격이나 by ~는 그 동사의 **주어**, of ~는 대개 **목적어**(자동사면 주어)입니다.\n' +
          '3. 명사 앞 **형용사는 부사**로 바꿉니다. (rapid → rapidly)\n' +
          '4. 문장의 동사(led to, resulted in, caused)는 **원인과 결과**를 잇는 말(because, so)로 바꿉니다.\n\n' +
          '**The government\'s rejection of the proposal** surprised many experts.\n' +
          '→ The government **rejected** the proposal, and this surprised many experts.\n\n' +
          '**The failure of the company to adapt** led to its collapse.\n' +
          '→ **Because** the company **failed** to adapt, it **collapsed**.',
        easy: '명사화된 문장은 압축 파일과 같습니다. 압축을 풀면 "누가 + 무엇을 했다"라는 원래 문장이 나옵니다. 명사(rejection)를 보면 "누가 무엇을 거절했지?"라고 묻고, 소유격(the government\'s)과 of 뒤(the proposal)에서 답을 찾으십시오.',
        check: {
          type: 'choice',
          q: '다음 문장을 동사 중심으로 바르게 풀어 쓴 것은 무엇입니까?\n\nThe rapid increase in prices caused concern.',
          choices: [
            'Prices increased rapidly, and this caused concern.',
            'Concern increased prices rapidly.',
            'People rapidly increased prices because of concern.',
          ],
          answer: 0,
          why: [
            '',
            '원인과 결과가 뒤바뀌었습니다. 가격 상승이 걱정을 일으켰습니다.',
            '가격을 올린 행위자(people)는 원래 문장에 없습니다. 또 걱정이 원인이 아니라 결과입니다.',
          ],
          explain: 'increase in prices → prices increased, rapid → rapidly, caused → 원인과 결과. "가격이 빠르게 올랐고, 이것이 걱정을 불러일으켰다."',
        },
      },
      {
        title: '접두사·접미사로 학술 어휘 넓히기',
        body: '학술 어휘는 대부분 **접두사 + 어근 + 접미사**로 짜여 있습니다. 조각의 뜻을 알면 처음 보는 낱말도 짐작할 수 있습니다.\n\n' +
          '| 접두사 | 뜻 | 예 |\n|---|---|---|\n' +
          '| un-, in-, dis-, non- | 아님, 반대 | unclear, inaccurate, disagree, nonverbal |\n' +
          '| mis- | 잘못 | misinterpret, misunderstand |\n' +
          '| re- | 다시 | reconsider, reevaluate |\n' +
          '| pre- / post- | 전 / 후 | pretest, postwar |\n' +
          '| inter- | 사이, 서로 | interaction, international |\n' +
          '| over- / under- | 지나치게 / 덜 | overestimate, underestimate |\n' +
          '| co- | 함께 | cooperate, coauthor |\n\n' +
          'in-은 뒤 글자에 따라 모양이 바뀝니다: **im**-possible(p·b·m 앞), **il**-logical(l 앞), **ir**-relevant(r 앞).\n\n' +
          '접미사는 **품사**를 알려 줍니다.\n\n' +
          '| 접미사 | 품사 | 예 |\n|---|---|---|\n' +
          '| -tion, -ment, -ity, -ness, -ance | 명사 | evaluation, equality |\n' +
          '| -ize, -ify | 동사 | minimize, clarify |\n' +
          '| -al, -ive, -ous, -able | 형용사 | critical, effective, various, reliable |\n' +
          '| -ly | 부사 | relatively, significantly |\n\n' +
          '> ⚠️ 접미사는 대체로 맞는 단서일 뿐입니다. -al은 approval(승인)처럼 명사를, -ly는 likely(~할 것 같은)처럼 형용사를 만들기도 합니다.',
        easy: '낱말을 레고 블록처럼 생각해 보십시오. under(덜) + estimate(평가하다) = underestimate(과소평가하다). 블록 하나하나의 뜻을 알면, 처음 보는 조합도 뜻을 짐작할 수 있습니다. 끝 블록(접미사)은 그 낱말이 명사인지 동사인지 알려 주는 이름표입니다.',
        check: {
          type: 'choice',
          q: 'relevant(관련 있는)의 반대말로 알맞은 것은 무엇입니까?',
          choices: ['unrelevant', 'irrelevant', 'inrelevant'],
          answer: 1,
          why: [
            'relevant의 반대말에는 un-을 쓰지 않습니다. r로 시작하는 낱말 앞에서 in- 대신 ir- 꼴을 씁니다.',
            '',
            'r 앞에서는 in- 대신 ir- 꼴을 씁니다. inrelevant라는 낱말은 없습니다.',
          ],
          explain: 'r로 시작하는 낱말 앞에서 in- 대신 ir- 꼴을 쓰므로 irrelevant(관련 없는)입니다. 같은 예: irregular, irresponsible',
        },
      },
      {
        title: '자주 쓰는 학술 어휘',
        body: '학술 글에 거듭 나오는 낱말은 뜻뿐 아니라 **쓰임**까지 정확히 알아야 합니다.\n\n' +
          '| 낱말 | 쓰임 |\n|---|---|\n' +
          '| data | 원래 datum의 복수형입니다. 학술 글에서는 The data **show** ~처럼 복수로 받는 일이 많고, 단수 취급도 널리 쓰입니다. |\n' +
          '| hypothesis | 가설. 복수형은 **hypotheses**입니다. 가설은 test(검증)합니다. |\n' +
          '| phenomenon / criterion | 현상 / 기준. 복수형은 **phenomena / criteria**입니다. |\n' +
          '| analysis | 분석. 복수형은 **analyses**입니다. |\n' +
          '| approach | 명사(접근법): **an approach to** + 명사·동명사. 동사(다가가다, 다루다): approach **the problem**(to 없이) |\n' +
          '| significant | 중요한, 상당한. 통계에서는 "우연으로 생겼다고 보기 어려운(유의미한)"이라는 뜻입니다. |\n' +
          '| evidence, research | 보통 셀 수 없는 명사입니다. an evidence ✕ → a piece of evidence, a study |\n\n' +
          '> 💡 statistically significant(통계적으로 유의미한)는 "차이가 크다"는 뜻이 아닙니다. 차이가 작아도 우연이라고 보기 어려우면 유의미할 수 있습니다.',
        easy: '라틴어·그리스어에서 온 낱말은 복수형이 독특합니다. -is로 끝나면 -es(hypothesis → hypotheses, analysis → analyses), -on으로 끝나면 -a(phenomenon → phenomena, criterion → criteria)로 기억해 두십시오.',
        check: {
          type: 'ox',
          q: 'hypothesis(가설)의 복수형은 hypothesises입니다.',
          answer: false,
          explain: '-is로 끝나는 hypothesis의 복수형은 -es로 바꾼 hypotheses입니다. analysis → analyses, crisis → crises도 같은 규칙입니다.',
        },
      },
      {
        title: '학술 낱말 짝(연어)',
        body: '영어에는 함께 쓰는 낱말이 정해져 있는 경우가 많습니다. 이것을 **낱말 짝(연어, collocation)**이라고 합니다. 뜻이 통해도 짝이 틀리면 어색한 영어가 됩니다.\n\n' +
          '| 낱말 짝 | 뜻 |\n|---|---|\n' +
          '| conduct / carry out research, a study, an experiment | 연구·실험을 하다 |\n' +
          '| draw / reach a conclusion | 결론을 끌어내다 / 결론에 이르다 |\n' +
          '| test a hypothesis | 가설을 검증하다 |\n' +
          '| collect / gather data | 자료를 모으다 |\n' +
          '| provide evidence | 증거를 제시하다 |\n' +
          '| raise a question | 의문을 제기하다 |\n' +
          '| pose a threat | 위협이 되다 |\n' +
          '| play a role in | ~에서 역할을 하다 |\n' +
          '| have an effect / impact on | ~에 영향을 미치다 |\n' +
          '| take ~ into account | ~을 고려하다 |\n' +
          '| address an issue | 문제를 다루다 |\n\n' +
          '> ⚠️ 우리말 "연구를 하다"를 그대로 옮겨 make research라고 쓰지 않습니다. conduct research, do research가 맞습니다.',
        easy: '낱말 짝은 단짝 친구와 같습니다. conclusion은 늘 draw나 reach와 다니고, research는 conduct나 do와 다닙니다. 새 명사를 외울 때 그 명사의 단짝 동사도 함께 외우면 글을 쓸 때 바로 꺼내 쓸 수 있습니다.',
        check: {
          type: 'choice',
          q: '빈칸에 알맞은 것은 무엇입니까?\n\nFrom these results, we cannot ___ a clear conclusion.',
          choices: ['do', 'draw', 'put'],
          answer: 1,
          why: [
            'do a conclusion이라는 짝은 쓰지 않습니다.',
            '',
            'put a conclusion이라는 짝은 쓰지 않습니다.',
          ],
          explain: 'conclusion의 단짝 동사는 draw(또는 reach)입니다. draw a conclusion: 결론을 끌어내다.',
        },
      },
    ],

    examples: [
      {
        q: '다음 문장을 명사화하여 다시 쓰십시오. (주어를 discovery로 시작)\n\nScientists discovered the virus in 1990, and this changed medicine.',
        steps: [
          '동사 discovered를 명사 discovery로 바꿉니다.',
          '목적어였던 the virus는 of the virus로, 행위자 scientists는 by scientists로 붙입니다.',
          '"and this changed medicine"의 changed를 그대로 문장의 동사로 씁니다.',
          '결과: The discovery of the virus by scientists in 1990 changed medicine. 행위자가 뻔하면 by scientists를 빼도 됩니다.',
        ],
        answer: 'The discovery of the virus (by scientists) in 1990 changed medicine.',
      },
      {
        q: '다음 명사화된 문장을 동사 중심 문장으로 풀어 쓰십시오.\n\nOur analysis of the interviews revealed a strong preference for flexible working hours among employees.',
        steps: [
          'analysis → analyze: 소유격 Our가 주어, of the interviews가 목적어입니다. → We analyzed the interviews.',
          'preference → prefer: among employees가 주어(누가 선호하는가), for flexible working hours가 목적어입니다. 형용사 strong은 부사 strongly로 바꿉니다.',
          'revealed는 "~을 알게 되었다(found that)"로 풀어 잇습니다.',
        ],
        answer: 'We analyzed the interviews and found that employees strongly preferred flexible working hours.',
      },
    ],

    terms: [
      { term: '명사화', def: '동사나 형용사로 나타낼 내용을 명사로 바꾸어 쓰는 것입니다. 예: analyze → analysis, significant → significance' },
      { term: '접두사', def: '낱말 앞에 붙어 뜻을 더하는 조각입니다. 예: un-(아님), re-(다시), mis-(잘못)' },
      { term: '접미사', def: '낱말 끝에 붙어 뜻이나 품사를 바꾸는 조각입니다. 예: -tion(명사), -ize(동사), -ive(형용사)' },
      { term: '낱말 짝(연어)', def: '함께 쓰는 것이 자연스럽게 굳어진 낱말의 짝입니다. collocation이라고도 합니다. 예: draw a conclusion' },
      { term: '불가산 명사', def: '하나, 둘로 셀 수 없어 a를 붙이거나 -s를 붙이지 않는 명사입니다. 예: evidence, information, research' },
      { term: '통계적 유의성', def: '관찰한 차이가 우연히 생겼다고 보기 어렵다는 뜻입니다. 차이의 크기와는 다릅니다. 영어로 statistical significance라고 합니다.' },
      { term: '어근', def: '낱말에서 핵심 뜻을 지닌 부분입니다. 접두사·접미사가 그 앞뒤에 붙습니다. 예: estimate(어근) → underestimate' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'text', concept: 0,
        q: '괄호 안의 동사를 명사형으로 바꾸어 쓰십시오.\n\nThe ___ (analyze) of the data took three weeks.',
        answer: ['analysis'],
        wrong: [
          { a: 'analyzation', why: 'analyze에 -ation을 붙인 꼴은 쓰지 않습니다. 명사형은 analysis입니다.' },
          { a: 'analyzing', why: '동명사도 명사처럼 쓰이지만, 관사 The와 of the data가 붙는 자리에는 명사 analysis가 알맞습니다.' },
        ],
        explain: 'analyze(분석하다)의 명사형은 **analysis**(분석)입니다. 복수형은 analyses입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 0,
        q: 'fail(실패하다)의 명사형으로 알맞은 것은 무엇입니까?',
        choices: ['failness', 'failment', 'failure', 'failance'],
        answer: 2,
        why: [
          '-ness는 주로 형용사에 붙습니다(aware → awareness). fail은 동사입니다.',
          'failment라는 낱말은 없습니다. fail의 명사형은 -ure로 끝납니다.',
          '',
          'failance라는 낱말은 없습니다. fail의 명사형은 -ure로 끝납니다.',
        ],
        explain: 'fail의 명사형은 **failure**(실패)입니다. 예: the failure of the plan(계획의 실패)',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 1,
        q: '다음 문장의 뜻으로 알맞은 것은 무엇입니까?\n\nThe rejection of the proposal by the committee surprised everyone.',
        choices: [
          'The proposal rejected the committee, and everyone was surprised.',
          'Everyone rejected the proposal because the committee surprised them.',
          'The committee rejected the proposal, which surprised everyone.',
          'The committee proposed a plan, and everyone rejected it.',
        ],
        answer: 2,
        why: [
          '주어와 목적어가 뒤바뀌었습니다. by the committee가 거절한 쪽(주어)이고, of the proposal이 거절당한 쪽(목적어)입니다.',
          '거절한 것은 everyone이 아니라 committee입니다. 또 놀란 것은 결과입니다.',
          '',
          '제안을 한 쪽이 위원회라는 말은 없습니다. 위원회는 제안을 거절했습니다.',
        ],
        explain: 'rejection → rejected, by the committee → 주어, of the proposal → 목적어. "위원회가 그 제안을 거절했고, 그 일이 모두를 놀라게 했다."',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '"잘못 해석하다"라는 뜻의 낱말은 무엇입니까?',
        choices: ['reinterpret', 'misinterpret', 'disinterpret', 'preinterpret'],
        answer: 1,
        why: [
          're-는 "다시"라는 뜻입니다. 그래서 reinterpret의 뜻은 "다시 해석하다"입니다.',
          '',
          'interpret 앞에는 dis-를 붙이지 않습니다. "잘못"은 mis-입니다.',
          'pre-는 "미리, 전에"라는 뜻이고, preinterpret 같은 낱말은 쓰지 않습니다.',
        ],
        explain: 'mis-(잘못) + interpret(해석하다) = **misinterpret**(잘못 해석하다). 같은 예: misunderstand, mislead',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 3,
        q: 'evidence는 보통 셀 수 없는 명사로 쓰므로, "증거 하나"는 an evidence가 아니라 a piece of evidence라고 씁니다.',
        answer: true,
        explain: 'evidence는 보통 불가산 명사입니다. a piece of evidence(증거 하나), much evidence(많은 증거)처럼 씁니다. information, advice도 같습니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'text', concept: 3,
        q: '괄호 안의 낱말을 복수형으로 바꾸어 쓰십시오.\n\nThe researchers tested three different ___ (hypothesis).',
        answer: ['hypotheses'],
        wrong: [{ a: 'hypothesises', why: '-is로 끝나는 명사는 -is를 -es로 바꾸어 복수를 만듭니다. hypothesises는 동사 hypothesise의 3인칭 단수 꼴입니다.' }],
        explain: 'hypothesis의 복수형은 **hypotheses**입니다. analysis → analyses, crisis → crises도 같습니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 4,
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe researchers ___ an experiment to test the new drug.',
        choices: ['drew', 'raised', 'conducted', 'posed'],
        answer: 2,
        why: [
          'draw는 a conclusion과 어울립니다(draw a conclusion).',
          'raise는 a question과 어울립니다(raise a question).',
          '',
          'pose는 a threat·a problem과 어울립니다(pose a threat).',
        ],
        explain: 'experiment의 단짝 동사는 conduct(또는 carry out)입니다. conduct an experiment: 실험을 하다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 1,
        q: '다음 문장을 동사 중심으로 바르게 풀어 쓴 것은 무엇입니까?\n\nThe failure of the company to adapt to new technology led to its collapse.',
        choices: [
          'Because the company failed to adapt to new technology, it collapsed.',
          'Because the company collapsed, it failed to adapt to new technology.',
          'New technology failed, so the company collapsed.',
          'The company adapted to new technology, but it still collapsed.',
        ],
        answer: 0,
        why: [
          '',
          '원인과 결과가 뒤바뀌었습니다. led to 앞이 원인, 뒤가 결과입니다.',
          '실패한 것은 기술이 아니라 회사입니다. of the company가 fail의 주어입니다.',
          'failure(실패)를 놓쳤습니다. 회사는 적응하지 못했습니다.',
        ],
        hint: 'A led to B는 "A 때문에 B가 일어났다"입니다.',
        explain: 'failure of the company to adapt → the company failed to adapt(원인), led to → 결과로 이어짐, its collapse → it collapsed(결과). "회사가 새 기술에 적응하지 못해서 무너졌다."',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'text', concept: 0,
        q: '두 문장의 뜻이 같도록 빈칸에 increased의 명사형을 쓰십시오.\n\nPrices increased sharply, which worried consumers.\n= The sharp ___ in prices worried consumers.',
        answer: ['increase'],
        hint: 'increase는 동사와 명사의 모양이 같습니다.',
        wrong: [
          { a: 'increasing', why: '관사 The와 형용사 sharp 뒤에는 명사 increase를 씁니다.' },
          { a: 'increasement', why: 'increasement라는 낱말은 없습니다. increase는 동사와 명사의 모양이 같습니다.' },
        ],
        explain: '동사 increase는 그대로 명사로도 씁니다. 부사 sharply는 형용사 sharp로 바뀌어 **The sharp increase in prices**가 됩니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 2,
        q: '품사가 나머지 셋과 **다른** 것은 무엇입니까?',
        choices: ['clarity', 'stability', 'clarify', 'equality'],
        answer: 2,
        why: [
          '-ity로 끝나는 명사입니다(명확성).',
          '-ity로 끝나는 명사입니다(안정성).',
          '',
          '-ity로 끝나는 명사입니다(평등).',
        ],
        explain: 'clarify는 -ify로 끝나는 **동사**(명확히 하다)입니다. 나머지는 모두 -ity로 끝나는 명사입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 3,
        q: '다음 문장의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nThe difference between the two groups was statistically significant.',
        choices: [
          '두 집단의 차이가 매우 컸다.',
          '두 집단의 차이는 우연히 생겼다고 보기 어려웠다.',
          '두 집단의 차이는 중요하지 않았다.',
          '두 집단 사이에 차이가 없었다.',
        ],
        answer: 1,
        why: [
          '통계적으로 유의미하다는 말은 차이의 크기가 아니라, 그 차이가 우연만으로 생겼다고 보기 어렵다는 뜻입니다.',
          '',
          'significant를 반대로 읽었습니다. 유의미한 차이가 있었다는 말입니다.',
          '유의미한 차이가 있었다는 말이므로 차이가 없었다는 것과 반대입니다.',
        ],
        explain: 'statistically significant는 "우연으로 생겼다고 보기 어려운"이라는 뜻입니다. 차이가 작아도 유의미할 수 있으므로 "매우 컸다"와는 다릅니다.',
      },
      {
        id: 'p12', level: 2, type: 'order', concept: 4,
        q: '낱말 덩어리를 바른 순서로 놓아 문장을 완성하십시오.\n\n(뜻: 이 결과로부터 우리는 분명한 결론을 끌어낼 수 있다.)',
        choices: ['draw', 'From these results,', 'a clear conclusion', 'we can'],
        answer: [1, 3, 0, 2],
        explain: 'From these results, / we can / draw / a clear conclusion. — draw a conclusion(결론을 끌어내다)이라는 낱말 짝을 썼습니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '다음 문장의 뜻으로 가장 알맞은 것은 무엇입니까?\n\nThe government\'s introduction of a new tax on sugary drinks resulted in a significant reduction in their consumption.',
        choices: [
          'People drank fewer sugary drinks, so the government introduced a new tax.',
          'After the government introduced a new tax on sugary drinks, people drank much less of them.',
          'The government introduced new sugary drinks, and people reduced their taxes.',
          'The new tax was introduced because people consumed too many sugary drinks.',
        ],
        answer: 1,
        why: [
          '원인과 결과가 뒤바뀌었습니다. resulted in 앞(세금 도입)이 원인, 뒤(소비 감소)가 결과입니다.',
          '',
          'introduction의 목적어는 a new tax입니다. 정부가 음료를 내놓은 것이 아닙니다.',
          '세금을 도입한 이유는 원래 문장에 없습니다. 원래 문장은 도입한 뒤의 결과를 말합니다.',
        ],
        hint: '명사화된 명사(introduction, reduction, consumption)를 하나씩 동사로 되돌려 보십시오.',
        explain: 'The government\'s introduction of a new tax → the government introduced a new tax(원인), resulted in → 그 결과, a significant reduction in their consumption → people drank much less of them(결과).',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'text', concept: 0,
        q: '괄호 안의 동사를 명사형으로 바꾸어 쓰십시오.\n\nRegular ___ (maintain) of the machines prevents accidents.',
        answer: ['maintenance'],
        hint: '철자에 주의하십시오. 동사의 ai가 그대로 남지 않습니다.',
        wrong: [{ a: 'maintainance', why: '자주 틀리는 철자입니다. 명사는 main-te-nance로, maintain의 ai가 e로 바뀝니다.' }],
        explain: 'maintain(유지하다)의 명사형은 **maintenance**(유지, 정비)입니다. 동사의 -tain이 명사에서는 -tenance로 바뀝니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 3,
        q: 'approach의 쓰임이 바른 문장은 무엇입니까?',
        choices: [
          'We approached to the problem carefully.',
          'This book offers a new approach to teaching grammar.',
          'They tried an approach for solve the problem.',
          'Her approach of the data was very simple.',
        ],
        answer: 1,
        why: [
          '동사 approach는 to 없이 목적어를 바로 받습니다(approached the problem).',
          '',
          '명사 approach는 to와 짝을 이루고, 전치사 뒤에는 동사원형을 쓸 수 없습니다(an approach to solving ~).',
          '명사 approach는 of가 아니라 to와 짝을 이룹니다(her approach to the data).',
        ],
        hint: '명사 approach와 동사 approach의 쓰임을 나누어 생각하십시오.',
        explain: '명사 approach는 an approach to + 명사·동명사(~에 대한 접근법)로 씁니다. 여기의 to는 전치사라서 뒤에 동명사 teaching이 왔습니다. 동사로 쓸 때는 approach the problem처럼 to를 쓰지 않습니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 4,
        q: '낱말 짝이 **어색한** 것은 무엇입니까?',
        choices: ['pose a threat', 'raise a question', 'make research', 'draw a conclusion'],
        answer: 2,
        why: [
          '위협이 되다(pose a threat) — 자연스러운 낱말 짝입니다.',
          '의문을 제기하다(raise a question) — 자연스러운 낱말 짝입니다.',
          '',
          '결론을 끌어내다(draw a conclusion) — 자연스러운 낱말 짝입니다.',
        ],
        explain: 'research는 make와 짝을 이루지 않습니다. **conduct research**, carry out research, do research로 씁니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 0,
        q: '다음 문장을 명사화하여 바르게 바꿔 쓴 것은 무엇입니까?\n\nBecause the population aged quickly, health costs rose.',
        choices: [
          'The quickly aging of the population led to a rise in health costs.',
          'The rapid aging of the population led to a rise in health costs.',
          'The population rapid aging led to health costs rose.',
          'The rapid aging of the population led to rise health costs.',
        ],
        answer: 1,
        why: [
          '명사 앞에는 부사(quickly)가 아니라 형용사(rapid, quick)를 씁니다.',
          '',
          'led to 뒤에는 명사(구)가 와야 합니다. health costs rose는 절입니다. 또 the population은 of the population으로 붙여야 합니다.',
          'rise를 동사로 썼습니다. led to 뒤에는 명사구 a rise in health costs가 필요합니다.',
        ],
        hint: '부사는 형용사로, 동사는 명사로, because는 led to로 바뀝니다.',
        explain: 'aged quickly → rapid aging(부사 → 형용사, 동사 → 명사), the population → of the population, because ~ → led to, costs rose → a rise in health costs. "인구의 빠른 고령화가 의료비 상승으로 이어졌다."',
      },
    ],

    deeper: [
      {
        title: '명사화는 언제나 좋은가?',
        body: '명사화는 정보를 압축해 학술 글을 짧고 객관적으로 만들지만, 지나치면 읽기 어렵고 책임이 흐려집니다.\n\n' +
          '- An investigation of the cause of the failure of the system was carried out. (명사가 겹쳐 무거움)\n' +
          '- We investigated why the system failed. (누가 무엇을 했는지 또렷함)\n\n' +
          '그래서 학술 글쓰기 안내서는 흔히 "필요한 곳에만 명사화하라"고 권합니다. 앞 문장의 내용을 받아 다음 문장의 주어로 이어 갈 때(This **increase** ~), 여러 동작을 한 개념으로 묶어 부를 때 명사화가 특히 쓸모 있습니다.\n\n' +
          '읽을 때는 명사화된 문장을 만나면 이 단원에서 배운 대로 "누가 무엇을 했는가"를 되살려 읽으십시오. 다음 단원에서는 확신의 정도를 조절하는 조동사와 완곡 표현을 다룹니다.',
      },
      {
        title: '학술 어휘를 늘리는 방법',
        body: '학술 글에 자주 나오는 낱말은 전공을 가리지 않고 겹치는 것이 많습니다(analyze, approach, significant, evidence, factor …). 이런 낱말을 모은 목록을 학술 어휘 목록이라고 하며, 여러 대학의 영어 교육에서 쓰입니다.\n\n' +
          '효과적으로 익히려면 낱말 하나를 외울 때 다음 네 가지를 함께 기록하십시오.\n\n' +
          '1. 품사별 모양(analyze – analysis – analytical – analytically)\n2. 낱말 짝(conduct an analysis)\n3. 짝을 이루는 전치사(an analysis of)\n4. 직접 만든 예문 하나',
      },
    ],

    faq: [
      {
        q: '명사화된 문장은 왜 이렇게 읽기 어려워요?',
        a: '동사 중심 문장에서는 "누가 무엇을 했다"가 바로 보이지만, 명사화된 문장은 그 정보가 명사 안에 숨어 있기 때문입니다. 명사(rejection)를 동사(reject)로 되돌리고, 소유격·by ~에서 주어를, of ~에서 목적어를 찾아 풀어 읽으면 훨씬 쉬워집니다.',
      },
      {
        q: 'data는 단수예요, 복수예요?',
        a: '원래는 datum의 복수형이라서 학술 글에서는 The data show ~처럼 복수로 받는 일이 많습니다. 다만 요즘에는 정보 덩어리라는 뜻으로 The data shows ~처럼 단수로 받는 것도 널리 쓰입니다. 한 글 안에서는 한 가지로 일관되게 쓰는 것이 중요합니다.',
      },
      {
        q: '낱말 짝(연어)은 어떻게 외워요?',
        a: '명사를 외울 때 단짝 동사와 전치사를 묶어서 외우십시오. conclusion만 외우지 말고 draw a conclusion, reach a conclusion을 한 덩어리로 익히는 식입니다. 영영사전의 예문에서 그 명사 앞에 어떤 동사가 자주 오는지 살펴보는 것도 좋은 방법입니다.',
      },
    ],

    mistakes: [
      '명사화하면서 부사를 그대로 두는 실수 — the **quickly** growth ✕ → the **quick**(rapid) growth ✓ (명사 앞에는 형용사)',
      '불가산 학술 명사에 a나 -s를 붙이는 실수 — **an evidence**, **researches** ✕ → **a piece of evidence**, **studies** ✓',
      '우리말을 그대로 옮긴 어색한 낱말 짝 — **make** research, **do** a conclusion ✕ → **conduct** research, **draw** a conclusion ✓',
    ],

    gens: [
      {
        id: 'nominalize',
        level: 1,
        title: '동사·형용사의 명사형 쓰기',
        make: function (R) {
          var it = R.pick(NOMIN);
          var wrong = it[4] ? [{ a: it[4], why: it[5] }] : [];
          return {
            type: 'short', check: 'text', concept: 0,
            q: '다음 ' + it[1] + '의 명사형을 쓰십시오. (학술 글에서 흔히 쓰는 꼴)\n\n' + it[0] + ' (' + it[2] + ')',
            answer: it[3],
            wrong: wrong,
            explain: it[0] + '(' + it[2] + ') → **' + it[3].join(' / ') + '**(' + it[6] + ')',
          };
        },
      },
      {
        id: 'collocation',
        level: 2,
        title: '학술 낱말 짝 고르기',
        make: function (R) {
          var it = R.pick(COLLO);
          var correct = it[1];
          var reason = {};
          var wrongs = it[2].map(function (w) { reason[w[0]] = w[1]; return w[0]; });
          var pick = R.choices(correct, wrongs, 4);
          return {
            type: 'choice', concept: 4,
            q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
            explain: '낱말 짝: ' + it[3] + '\n\n' + it[0].replace('___', '**' + correct + '**'),
          };
        },
      },
    ],

    vocab: [
      { w: 'hypothesis', m: '가설', ex: 'The experiment did not support our hypothesis.', exm: '그 실험은 우리의 가설을 뒷받침하지 않았습니다.' },
      { w: 'approach', m: '접근법; 다가가다', ex: 'We need a new approach to this problem.', exm: '우리는 이 문제에 대한 새로운 접근법이 필요합니다.' },
      { w: 'significant', m: '중요한, 상당한, (통계적으로) 유의미한', ex: 'There was a significant change in the results.', exm: '결과에 상당한 변화가 있었습니다.' },
      { w: 'data', m: '자료, 데이터', ex: 'The data were collected over two years.', exm: '자료는 2년에 걸쳐 수집되었습니다.' },
      { w: 'phenomenon', m: '현상', ex: 'Rainbows are a common natural phenomenon.', exm: '무지개는 흔한 자연 현상입니다.' },
      { w: 'criterion', m: '기준', ex: 'Cost was the main criterion for the choice.', exm: '비용이 선택의 주된 기준이었습니다.' },
      { w: 'assumption', m: '가정, 추정', ex: 'The plan is based on a wrong assumption.', exm: '그 계획은 잘못된 가정에 바탕을 두고 있습니다.' },
      { w: 'conduct', m: '(연구·조사를) 하다, 수행하다', ex: 'They conducted a survey of local shops.', exm: '그들은 지역 상점을 대상으로 조사를 했습니다.' },
      { w: 'analysis', m: '분석', ex: 'A careful analysis showed a different pattern.', exm: '꼼꼼히 분석해 보니 다른 경향이 드러났습니다.' },
      { w: 'consistent', m: '일관된, 한결같은', ex: 'The results were consistent with earlier studies.', exm: '그 결과는 이전 연구들과 일치했습니다.' },
      { w: 'emphasis', m: '강조', ex: 'The course places emphasis on speaking.', exm: '그 강좌는 말하기를 강조합니다.' },
      { w: 'interpret', m: '해석하다', ex: 'It is hard to interpret these numbers.', exm: '이 수치들을 해석하기는 어렵습니다.' },
      { w: 'contribute', m: '기여하다, ~의 한 원인이 되다', ex: 'Many people contributed to the project.', exm: '많은 사람이 그 프로젝트에 기여했습니다.' },
      { w: 'reduction', m: '감소, 축소', ex: 'The new rule led to a reduction in noise.', exm: '새 규칙 덕분에 소음이 줄었습니다.' },
    ],
  });
})();
