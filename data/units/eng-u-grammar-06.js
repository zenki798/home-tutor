/* 대학 영어: 문법과 독해 · 비교·도치·생략·병렬 구문
 * 예문·지문은 모두 직접 쓴 글이다(가상의 도시·연구·수치). 실제 통계·논문의 문장을 옮기지 않았다.
 * 영어 낱말 바로 뒤에는 조사를 붙이지 않는다(낱말 뒤에 '쪽·꼴·문장·표현' 같은 우리말을 둔다). */
(function () {
  // 비교·도치가 섞인 짧은 글 (가상의 자료)
  var VALLEY = 'Last year, rainfall in the valley was nearly twice as heavy as that on the surrounding hills. Only in the valley did the rivers flood, and the damage there was far greater than in any previous year.';

Tutor.registerUnit({
  id: 'eng-u-grammar-06',
  course: 'eng-u-grammar',
  title: '비교·도치·생략·병렬 구문',
  summary: '비교·도치·생략·병렬이 섞인 학술 문장에서 무엇이 무엇과 이어지는지 정확히 파악합니다.',
  goals: [
    'than that of ~, than those in ~ 같은 표현에서 비교 대상을 정확히 찾을 수 있다.',
    'the + 비교급 구문과 배수 비교를 해석하고 수치와 맞게 바꿔 말할 수 있다.',
    'Only when ~, Not only ~, than does ~ 같은 도치 문장에서 주어와 동사를 찾을 수 있다.',
    '생략된 말을 되살리고, 긴 나열에서 서로 병렬로 이어진 요소를 찾을 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '비교 대상 확인하기: that of, those in',
      body: '비교는 **같은 종류끼리** 해야 합니다. 그래서 학술 글은 비교되는 명사를 되풀이하지 않고 대명사 **that**(단수·셀 수 없는 명사)이나 **those**(복수 명사)로 받습니다.\n\n' +
        '- The population of the capital is larger than **that of** the coastal city. (that = the population)\n' +
        '- Prices in this city are higher than **those in** other cities. (those = prices)\n' +
        '- The results of the first test were similar to **those of** the second. (those = the results)\n\n' +
        '| 틀린 비교 | 무엇이 문제인가 | 바른 비교 |\n|---|---|---|\n' +
        '| The population of the capital is larger than the coastal city. | 인구를 도시와 비교했다 | … larger than **that of** the coastal city. |\n' +
        '| Prices in this city are higher than that in other cities. | 복수 명사 prices 대신 that 꼴을 썼다 | … higher than **those in** other cities. |\n\n' +
        '읽을 때는 than·as 뒤의 that, those 표현을 만나면 **앞 절에서 같은 종류의 명사**를 찾아 그 자리에 넣어 봅니다. 수(단수·복수)가 맞는 명사가 답입니다.\n\n' +
        '> 💡 that of 꼴이 보이면 "~의 그것", those in 꼴이 보이면 "~에 있는 그것들"로 읽고, "그것"이 무엇인지 앞에서 찾으십시오.',
      easy: '과일 가게에서 "이 사과는 저 가게보다 비싸요."라고 하면 조금 이상합니다. 사과의 값과 가게를 견줄 수는 없으니까요. 정확히는 "이 사과는 **저 가게의 사과보다** 비싸요."입니다.\n\n' +
        '영어에서 "저 가게의 사과" 부분을 짧게 줄인 말이 those at that store, "저 가게의 값"이면 that at that store 표현입니다. 짝이 되는 말이 하나면 that, 여럿이면 those 꼴을 씁니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇입니까?\n\nThe climate of this island is milder than ___ of the mainland.',
        choices: ['those', 'that', 'it'],
        answer: 1,
        why: [
          '받는 명사 the climate 쪽이 단수입니다. those 꼴은 복수 명사를 받습니다.',
          '',
          'it 낱말은 앞의 바로 그 기후(이 섬의 기후)를 가리키게 되어, 이 섬의 기후를 이 섬의 기후와 비교하는 꼴이 됩니다. 같은 종류의 다른 것을 받을 때는 that 꼴을 씁니다.',
        ],
        explain: '비교 대상은 "이 섬의 기후"와 "본토의 기후"입니다. 단수 명사 the climate 부분을 되풀이하지 않고 **that** 꼴로 받아 than that of the mainland(본토의 기후보다)라고 씁니다.',
      },
    },
    {
      title: 'the + 비교급, the + 비교급과 배수 비교',
      body: '**the + 비교급 …, the + 비교급 …** 구문은 "~할수록 더 ~하다"라는 뜻으로, 두 양이 **함께 변하는 관계**를 나타냅니다.\n\n' +
        '- **The more** data we collect, **the more accurate** our model becomes. (자료를 많이 모을수록 모형이 더 정확해진다)\n' +
        '- **The higher** the temperature (is), **the faster** the reaction proceeds. (온도가 높을수록 반응이 빨리 진행된다)\n\n' +
        '두 번째 예처럼 be동사가 자주 생략되고, The sooner, the better.(빠를수록 좋다)처럼 동사가 모두 빠지기도 합니다.\n\n' +
        '**배수 비교**는 "몇 배"를 나타냅니다.\n\n' +
        '| 꼴 | 예 | 뜻 |\n|---|---|---|\n' +
        '| 배수 + as + 원급 + as | Factory A uses **three times as much** water **as** Factory B. | A 공장이 B 공장의 세 배를 쓴다 |\n' +
        '| twice / half + as + 원급 + as | Our sample was **half as large as** theirs. | 우리 표본은 그들의 절반 크기였다 |\n' +
        '| 배수 + 비교급 + than | Factory A uses **three times more** water **than** Factory B. | 흔히 세 배로 읽는다 |\n\n' +
        '두 배는 보통 two times 꼴보다 **twice** 낱말로, 절반은 **half** 낱말로 씁니다. 셀 수 있는 명사는 as many … as, 셀 수 없는 명사는 as much … as 꼴입니다.',
      easy: '줄넘기를 생각해 보십시오. "많이 연습할수록 더 오래 뛸 수 있다." — 연습이 늘면 기록도 함께 늘지요. 이렇게 **함께 움직이는 두 가지**를 한 문장에 담는 것이 The more you practice, the longer you can jump. 꼴입니다.\n\n' +
        '배수 비교는 저울에 올려 보는 일입니다. 민수의 구슬이 30개, 지아의 구슬이 10개라면 민수는 지아의 **세 배**를 가졌습니다: Minsu has three times as many marbles as Jia.',
      check: {
        type: 'short', check: 'number',
        q: 'A 공장은 하루에 물을 600 L, B 공장은 200 L 씁니다. 빈칸에 알맞은 수를 **숫자로** 쓰십시오(예: 7).\n\nFactory A uses ___ times as much water as Factory B.',
        answer: '3',
        wrong: [{ a: '400', why: '두 공장이 쓰는 물의 차이를 구했습니다. 배수 비교는 A 공장이 B 공장의 몇 배인지 나눗셈으로 구합니다: 600 ÷ 200 = 3' }],
        explain: '600 ÷ 200 = 3이므로 A 공장은 B 공장의 **세 배**를 씁니다: three times as much water as Factory B.',
      },
    },
    {
      title: '도치된 문장 읽기: Only when ~, Not only ~, than does ~',
      body: '강조하거나 부정의 뜻을 담은 말이 문장 맨 앞에 오면 **조동사(do·does·did·have·can 등)나 be동사가 주어 앞으로** 나옵니다. 이것이 **도치**입니다. 의문문처럼 보이지만 평서문입니다.\n\n' +
        '| 앞에 온 말 | 도치된 문장 | 보통 순서로 되돌리면 |\n|---|---|---|\n' +
        '| Only when ~ | Only when the samples were heated **did the color** change. | The color changed only when the samples were heated. |\n' +
        '| Only after ~ | Only after the second test **did the team** notice the error. | The team noticed the error only after the second test. |\n' +
        '| Not only ~ | Not only **does the method** save time, but it also reduces errors. | The method not only saves time but also reduces errors. |\n' +
        '| Rarely, Never, Little ~ | Rarely **have such results** been reported. | Such results have rarely been reported. |\n\n' +
        '비교의 than·as 뒤에서도 격식 있는 글은 도치를 씁니다.\n\n' +
        '- The new model uses less energy than **does the old one**. (= than the old one does)\n' +
        '- Women in the study slept longer than **did men**. (= than men did)\n\n' +
        'than 뒤 도치는 주어가 명사일 때 쓰고, 대명사 주어(it, they)일 때는 보통 쓰지 않습니다.\n\n' +
        '> 💡 도치 문장을 읽는 순서: ① 앞으로 나온 말(Only when 절 등)을 괄호로 묶는다 → ② 조동사 바로 뒤의 명사구가 **주어** → ③ 그 뒤의 동사원형·과거분사가 **본동사**.',
      easy: '"딱 한 번, 그날만은 비가 그쳤다."처럼 우리말도 강조하고 싶은 말을 앞으로 꺼냅니다. 영어는 그렇게 앞으로 꺼낼 때 **조동사가 주어 앞으로 따라 나오는** 습관이 있습니다.\n\n' +
        '그러니 Only after the second test did the team notice the error. 문장을 만나면 당황하지 말고, did 낱말을 뒤로 돌려보내십시오. "The team **did** notice → noticed" — 팀이 알아차린 것입니다.',
      check: {
        type: 'choice',
        q: '다음 문장의 **주어**는 무엇입니까?\n\nOnly after the second test did the researchers notice the error.',
        choices: ['the second test', 'the researchers', 'the error'],
        answer: 1,
        why: [
          'the second test 부분은 Only after 뒤의 시간 표현입니다. 앞으로 나온 말이지 주어가 아닙니다.',
          '',
          'the error 부분은 notice 동사의 목적어입니다. 무엇을 알아차렸는지를 말합니다.',
        ],
        explain: 'Only after the second test 부분이 앞으로 나와 조동사 did 낱말이 주어 앞으로 왔습니다. did 바로 뒤의 **the researchers** 부분이 주어이고 notice 동사가 본동사입니다. = The researchers noticed the error only after the second test.',
      },
    },
    {
      title: '생략된 말 되살려 읽기',
      body: '영어는 앞에 나온 말을 되풀이하지 않으려고 자주 **생략**합니다. 학술 문장이 짧아 보여도 뜻이 빠진 것은 아니므로, 읽을 때 빠진 말을 되살려야 정확합니다.\n\n' +
        '| 생략이 잦은 자리 | 예 | 되살리면 |\n|---|---|---|\n' +
        '| 조동사 뒤 | Some participants finished the task, but others **did not**. | did not (finish the task) |\n' +
        '| 비교의 than·as 뒤 | Group A scored higher than Group B. | than Group B (scored) |\n' +
        '| 같은 동사가 반복되는 두 번째 절 | The first group used paper maps, and **the second, digital ones**. | the second (group used) digital ones |\n' +
        '| 부사절의 주어 + be | **When heated**, the metal expands. | When (it is) heated |\n' +
        '| to 부정사의 동사 | You may leave early if you **want to**. | want to (leave early) |\n\n' +
        '되살릴 말은 **바로 앞 절에서 같은 꼴**로 찾습니다. 이때 조동사 뒤에는 동사원형, 시간·범위를 나타내는 말(in ten minutes, in 2020 등)까지 함께 되살려야 뜻이 정확해집니다.\n\n' +
        '> ⚠️ 두 번째 절의 쉼표(the second, digital ones)는 동사가 빠진 자리를 알려 주는 신호일 때가 많습니다.',
      easy: '친구가 "나는 짜장면 먹을래. 너는?" 하고 물었을 때 "나도."라고만 해도 "나도 짜장면 먹을래"라는 뜻이 전해집니다. 앞에서 말한 것을 되풀이하지 않은 것이지요.\n\n' +
        '영어도 똑같습니다. but others did not. 같은 짧은 끝을 만나면 "무엇을 안 했다는 거지?" 하고 바로 앞 문장으로 돌아가 빈칸을 채워 읽으면 됩니다.',
      check: {
        type: 'ox',
        q: '다음 문장에서 do not 뒤에 생략된 말은 "prefer online classes"이다.\n\nSome students prefer online classes, while others do not.',
        answer: true,
        explain: 'do not 낱말은 조동사이므로 그 뒤에는 앞 절의 동사구가 생략되어 있습니다. 바로 앞 절에서 같은 꼴을 찾으면 others do not (prefer online classes) — "다른 학생들은 온라인 수업을 더 좋아하지 않는다"입니다.',
      },
    },
    {
      title: '긴 나열에서 병렬 구조 찾기',
      body: 'and, or, but 같은 등위접속사와 both A and B, not only A but also B, either A or B, A rather than B 같은 짝 표현은 **같은 문법 꼴끼리** 잇습니다. 이것이 **병렬 구조**입니다.\n\n' +
        '- The program aims **to reduce** costs, **improve** safety, and **train** new workers. (to 하나에 동사원형 셋)\n' +
        '- The team collected samples **from rivers, lakes, and the ocean floor**. (from 하나에 명사 셋)\n' +
        '- The policy affects **not only** students **but also** their parents. (명사구 ↔ 명사구)\n\n' +
        '긴 문장에서 병렬을 찾는 방법은 다음과 같습니다.\n\n' +
        '1. 접속사(특히 마지막 and, or) **바로 뒤의 꼴**을 확인합니다. (동사원형? -ing? 명사? 전치사구?)\n' +
        '2. 앞쪽으로 거슬러 올라가며 **같은 꼴**을 찾습니다. 그것들이 하나의 나열입니다.\n' +
        '3. 나열 앞에 한 번만 쓰인 말(to, from, 조동사 등)은 **모든 요소에 함께** 걸립니다.\n\n' +
        '> ⚠️ 꼴이 섞이면 병렬이 깨집니다: to read, write, and **speaking**(✗) → to read, write, and **speak**(✓)',
      easy: '줄을 서는 사람들을 생각해 보십시오. 같은 줄에 선 사람들은 모두 **같은 표**를 들고 있어야 합니다. "읽기 표", "쓰기 표" 줄에 "말하는 중" 표를 든 사람이 끼어 있으면 어색하지요.\n\n' +
        'and 뒤에 무엇이 서 있는지 보고, 같은 표(같은 꼴)를 든 친구들을 앞에서 찾으면 그 줄이 하나의 나열입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말은 무엇입니까?\n\nThe study examined how students plan, ___, and review their essays.',
        choices: ['drafting', 'to draft', 'draft'],
        answer: 2,
        why: [
          'plan, review 동사와 꼴이 다릅니다. -ing 꼴을 넣으면 병렬이 깨집니다.',
          'to 부정사는 plan, review 동사와 꼴이 다릅니다. how students 뒤에는 동사가 와야 합니다.',
          '',
        ],
        explain: 'how students 뒤에 동사 셋이 병렬로 이어집니다: **plan**, **draft**, and **review**. 마지막 and 뒤의 review 꼴(동사원형)을 보고 같은 꼴을 고릅니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장의 뼈대를 찾고 해석해 보십시오.\n\nOnly when the data from all three regions were combined did the researchers see that rainfall in the north was twice as variable as that in the south.',
      steps: [
        'Only when … combined 부분을 괄호로 묶습니다. "세 지역의 자료를 모두 합쳤을 때에야 비로소"라는 조건입니다.',
        '그 뒤에 조동사 did 낱말이 주어 앞에 나왔으므로 도치입니다. did 바로 뒤의 the researchers 부분이 주어, see 동사가 본동사입니다.',
        'see 동사의 목적어는 that 절입니다: rainfall in the north was twice as variable as that in the south.',
        '비교 대상 찾기: as 뒤의 that 낱말은 단수 명사 rainfall 부분을 받습니다. = the rainfall in the south',
        '해석: 세 지역의 자료를 모두 합치고 나서야 연구자들은 북부의 강수량이 남부의 강수량보다 변동이 두 배 크다는 것을 알게 되었다.',
      ],
      answer: '주어 the researchers, 동사 did … see. 북부 강수량의 변동 폭이 남부 강수량의 두 배라는 것을, 자료를 모두 합친 뒤에야 알았다.',
    },
    {
      q: '다음 문장에서 병렬로 이어진 요소와 생략된 말을 찾아 보십시오.\n\nStudents who slept eight hours remembered more words, made fewer errors, and finished the test faster than those who did not.',
      steps: [
        '주어는 Students who slept eight hours(여덟 시간 잔 학생들)입니다.',
        '마지막 and 바로 뒤의 finished 꼴은 과거형 동사입니다. 앞에서 같은 꼴을 찾으면 remembered, made 동사가 있습니다. 동사 셋이 병렬입니다.',
        'than 뒤의 those 낱말은 복수 명사 students 부분을 받습니다.',
        'did not 뒤에는 앞의 동사구가 생략되었습니다: those who did not (sleep eight hours).',
        '해석: 여덟 시간 잔 학생들은 그렇지 않은 학생들보다 낱말을 더 많이 기억했고, 실수를 덜 했으며, 시험을 더 빨리 마쳤다.',
      ],
      answer: '병렬: remembered / made / finished. 생략: those who did not (sleep eight hours)',
    },
  ],

  terms: [
    { term: '비교 대상', def: '비교 문장에서 서로 견주는 두 대상입니다. 같은 종류여야 합니다. 예: the population of A ↔ that of B' },
    { term: '비교의 that / those', def: '비교 문장에서 앞의 명사를 되풀이하지 않으려고 쓰는 대명사입니다. 단수·셀 수 없는 명사는 that, 복수 명사는 those 꼴로 받습니다.' },
    { term: 'the + 비교급, the + 비교급', def: '"~할수록 더 ~하다"라는 뜻으로 함께 변하는 두 양을 나타내는 구문입니다. 예: The more you read, the more you learn.' },
    { term: '배수 비교', def: '"몇 배"를 나타내는 비교입니다. 배수 + as + 원급 + as 꼴이 기본입니다. 예: three times as large as' },
    { term: '도치', def: '강조·부정의 말이 문장 앞에 올 때 조동사나 be동사가 주어 앞으로 나오는 어순입니다. 예: Only then did we understand.' },
    { term: '생략', def: '앞에 나온 말을 되풀이하지 않으려고 빼는 것입니다. 읽을 때는 바로 앞 절에서 같은 꼴로 되살립니다. 예: others did not (finish).' },
    { term: '병렬 구조', def: '접속사로 이어진 요소들이 같은 문법 꼴을 갖추는 구조입니다. 예: to reduce costs, improve safety, and train workers' },
    { term: '상관접속사', def: '짝을 이루어 쓰는 접속사입니다. both A and B, either A or B, neither A nor B, not only A but also B' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 말은 무엇입니까?\n\nThe salaries in large companies are higher than ___ in small companies.',
      choices: ['that', 'those', 'it', 'them'],
      answer: 1,
      why: [
        '받는 명사 the salaries 쪽이 복수입니다. that 꼴은 단수·셀 수 없는 명사를 받습니다.',
        '',
        'it 낱말은 단수이고, 같은 종류의 다른 것이 아니라 바로 그 대상을 가리킵니다.',
        'them 낱말은 목적격 대명사로, 뒤에 in small companies 같은 수식어를 붙여 비교 대상을 받는 데 쓰지 않습니다.',
      ],
      explain: '비교 대상은 "큰 회사의 급여"와 "작은 회사의 급여"입니다. 복수 명사 the salaries 부분을 **those** 꼴로 받아 than those in small companies 꼴로 씁니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '다음 문장은 비교 대상이 논리적으로 바르게 짝지어져 있다.\n\nThe population of the capital is larger than the coastal city.',
      answer: false,
      explain: '"수도의 인구"를 "해안 도시" 자체와 비교하고 있습니다. 인구는 인구끼리 비교해야 하므로 … larger than **that of** the coastal city 꼴로 고쳐야 합니다.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 confident 낱말의 알맞은 꼴을 쓰십시오.\n\nThe more you practice, the ___ you become.',
      answer: ['more confident'],
      wrong: [
        { a: 'most confident', why: 'the + 비교급, the + 비교급 구문이므로 최상급이 아니라 비교급을 씁니다.' },
        { a: 'confidenter', why: 'confident 낱말처럼 긴 형용사의 비교급은 -er 꼴이 아니라 more 낱말을 앞에 붙입니다.' },
        { a: 'confident', why: '앞의 The more 부분과 짝을 이루려면 뒤에도 비교급이 와야 합니다.' },
      ],
      explain: '"연습할수록 더 자신감이 생긴다" — the + 비교급, the + 비교급 구문이므로 **more confident** 꼴입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '하루에 A 공장은 물을 600 L, B 공장은 200 L 씁니다. 이 사실을 바르게 나타낸 문장은 무엇입니까?',
      choices: [
        'Factory B uses three times as much water as Factory A.',
        'Factory A uses three times as many water as Factory B.',
        'Factory A uses three times as much water as Factory B.',
        'Factory A uses as three times much water as Factory B.',
      ],
      answer: 2,
      why: [
        '두 공장을 거꾸로 놓았습니다. 세 배를 쓰는 쪽은 A 공장입니다.',
        'water 낱말은 셀 수 없는 명사이므로 many 꼴이 아니라 much 꼴을 씁니다.',
        '',
        '배수(three times)는 as 앞에 옵니다: three times as much … as',
      ],
      explain: '600 ÷ 200 = 3이므로 A 공장이 B 공장의 세 배를 씁니다. 배수 + as + much(셀 수 없는 명사) + as 꼴: **three times as much water as** Factory B.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '다음 문장의 **주어**는 무엇입니까?\n\nNot only does the new method save time, but it also reduces errors.',
      choices: ['Not only', 'the new method', 'time', 'errors'],
      answer: 1,
      why: [
        'Not only 부분은 문장 앞으로 나와 도치를 일으킨 말입니다. 주어가 아닙니다.',
        '',
        'time 낱말은 save 동사의 목적어입니다.',
        'errors 낱말은 뒤 절 reduces 동사의 목적어입니다.',
      ],
      explain: 'Not only 부분이 앞에 나와 조동사 does 낱말이 주어 앞으로 왔습니다. does 바로 뒤의 **the new method** 부분이 주어, save 동사가 본동사입니다. = The new method not only saves time but also reduces errors.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 2,
      q: '다음 문장은 물음표가 빠진 의문문이다.\n\nOnly when the samples were heated did the color change.',
      answer: false,
      explain: 'Only when 절이 앞에 나와 조동사 did 낱말이 주어(the color) 앞으로 온 **도치된 평서문**입니다. 보통 순서로 되돌리면 The color changed only when the samples were heated.(시료를 가열했을 때에만 색이 변했다)입니다.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'text', concept: 3,
      q: '다음 문장에서 did not 뒤에 생략된 말을 **모두** 되살려 쓰십시오.\n\nSome participants finished the task in ten minutes, but others did not.',
      answer: ['finish the task in ten minutes', 'finish the task in 10 minutes', 'finish it in ten minutes', 'finish it in 10 minutes'],
      wrong: [
        { a: 'finished the task in ten minutes', why: 'did not 뒤에는 동사원형이 옵니다. finished 꼴이 아니라 finish 꼴로 되살립니다.' },
        { a: 'finish the task', why: 'in ten minutes 부분까지 되살려야 뜻이 정확합니다. 다른 참가자들은 과제를 "십 분 안에" 마치지 못한 것이지, 끝내 못 마쳤는지는 알 수 없습니다.' },
      ],
      explain: '조동사 did not 뒤에는 앞 절의 동사구 전체가 생략되었습니다: others did not (**finish the task in ten minutes**). 시간 표현까지 되살려야 "다른 참가자들은 십 분 안에 마치지 못했다"라는 정확한 뜻이 됩니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 4,
      q: '빈칸에 가장 알맞은 말은 무엇입니까?\n\nThe new library will offer quiet rooms for reading, computers for research, and ___.',
      choices: [
        'to meet friends in a café',
        'a café for meeting friends',
        'friends can meet in a café',
        'meeting friends at a café is possible',
      ],
      answer: 1,
      why: [
        'to 부정사는 앞의 요소들(명사 + for + 명사)과 꼴이 다릅니다.',
        '',
        '주어와 동사를 갖춘 절이라 앞의 명사구들과 병렬이 되지 않습니다.',
        '문장 전체를 끼워 넣어 offer 동사의 목적어 자리와 맞지 않습니다.',
      ],
      hint: '앞의 두 요소 quiet rooms for reading, computers for research 부분의 꼴을 살펴보십시오.',
      explain: 'offer 동사의 목적어 셋이 병렬입니다: quiet rooms **for** reading / computers **for** research / **a café for** meeting friends. 모두 "명사 + for + 명사(동명사)" 꼴입니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '병렬 구조가 **바르지 않은** 문장은 무엇입니까?',
      choices: [
        'Participants were asked to read the text and answer five questions.',
        'The data were collected both in spring and in autumn.',
        'The course teaches students to read critically, write clearly, and speaking confidently.',
        'She would rather analyze the data herself than ask someone else.',
      ],
      answer: 2,
      why: [
        'to 하나에 read, answer 동사원형 둘이 바르게 이어졌습니다.',
        'both in spring and in autumn — 전치사구끼리 바르게 이어졌습니다.',
        '',
        'would rather A than B 짝에서 analyze, ask 동사원형끼리 바르게 이어졌습니다.',
      ],
      explain: 'to read, write 다음에 speaking 꼴이 와서 병렬이 깨졌습니다. to 하나에 걸리는 동사원형 셋이 되도록 … and **speak** confidently 꼴로 고쳐야 합니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '다음 문장에서 those who did not 부분이 가리키는 사람은 누구입니까?\n\nIn the experiment, children who played outside every day slept better than those who did not.',
      choices: [
        '밖에서 놀았지만 잠을 잘 자지 못한 아이들',
        '실험에 참여하지 않은 아이들',
        '날마다 밖에서 놀지는 않은 아이들',
        '날마다 밖에서 논 어른들',
      ],
      answer: 2,
      why: [
        'did not 뒤에는 slept better 부분이 아니라 앞의 관계절 동사구(play outside every day)가 생략되었습니다.',
        'those 낱말은 실험 속 아이들 가운데 한 무리를 받습니다. 실험 밖의 아이들이 아닙니다.',
        '',
        'those 낱말은 복수 명사 children 부분을 받습니다. 어른이 아닙니다.',
      ],
      hint: 'those 낱말이 받는 명사와 did not 뒤에 생략된 말을 차례로 찾으십시오.',
      explain: 'those = children, did not 뒤 = (play outside every day). 그래서 those who did not 부분은 "**날마다 밖에서 놀지는 않은 아이들**"입니다. 날마다 밖에서 논 아이들이 그렇지 않은 아이들보다 잠을 더 잘 잤다는 비교입니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 2,
      q: '우리말 뜻에 맞게 도치 문장으로 늘어놓으십시오.\n\n(모든 자료를 확인한 뒤에야 그 팀은 결과를 발표했다.)',
      choices: ['Only after', 'checking all the data', 'did', 'the team', 'publish', 'its results.'],
      answer: [0, 1, 2, 3, 4, 5],
      hint: 'Only after 부분이 문장 앞에 나오면 조동사가 주어 앞으로 갑니다.',
      explain: 'Only after checking all the data(모든 자료를 확인한 뒤에야) 부분이 앞으로 나와 조동사 did 낱말이 주어 the team 앞으로 갑니다. 본동사는 동사원형 publish 꼴입니다: Only after checking all the data did the team publish its results.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 1,
      q: '다음 글의 내용과 맞는 것은 무엇입니까?\n\n' + VALLEY,
      choices: [
        'The hills received twice as much rain as the valley.',
        'The hills received about half as much rain as the valley.',
        'Rivers flooded both in the valley and on the hills.',
        'The valley had less rain, but its rivers still flooded.',
      ],
      answer: 1,
      why: [
        '배수 비교를 거꾸로 읽었습니다. 두 배 많은 쪽은 골짜기(the valley)입니다.',
        '',
        'Only in the valley did the rivers flood — 강이 넘친 곳은 골짜기뿐입니다.',
        '골짜기의 비가 언덕의 두 배 가까이 되었으므로 더 적지 않습니다.',
      ],
      hint: 'that on the surrounding hills 부분의 that 낱말이 무엇을 받는지, Only in the valley 뒤의 도치가 무엇을 강조하는지 보십시오.',
      explain: 'rainfall in the valley was nearly **twice as heavy as that** (= the rainfall) on the hills — 골짜기의 비가 언덕의 두 배 가까이 되었으니, 거꾸로 말하면 언덕은 골짜기의 **절반쯤**입니다. 또 Only in the valley **did the rivers flood** 도치는 강이 넘친 곳이 골짜기뿐임을 강조합니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '다음 글에서 so are their repair costs 부분의 뜻으로 알맞은 것은 무엇입니까?\n\nIn our city, the energy used by electric buses in winter is much higher than that used in summer, and so are their repair costs.',
      choices: [
        '버스의 수리비는 에너지 사용량과 똑같은 금액이다.',
        '버스의 수리비도 여름보다 겨울에 더 많다.',
        '버스의 수리비는 여름에 더 많이 든다.',
        '수리비가 많아서 겨울에 에너지를 더 쓴다.',
      ],
      answer: 1,
      why: [
        'so are 꼴은 "~도 그렇다"는 뜻이지 금액이 같다는 비교가 아닙니다.',
        '',
        'so are 꼴은 앞 절의 내용(겨울에 더 많다)을 그대로 받습니다. 여름이 아닙니다.',
        '본문은 두 가지가 모두 겨울에 많다고만 했을 뿐, 원인과 결과를 말하지 않았습니다.',
      ],
      hint: 'so + be동사 + 주어 꼴은 "주어도 그렇다"는 뜻입니다. "그렇다"가 앞 절의 어떤 내용인지 되살려 보십시오.',
      explain: 'so are their repair costs = their repair costs **are** (much higher in winter than in summer), **too**. so 낱말이 앞으로 나와 be동사가 주어 앞으로 간 도치이며, 생략된 말은 앞 절의 서술부입니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 4,
      q: '빈칸에 build 낱말의 알맞은 꼴을 쓰십시오.\n\nThe committee recommended that the city expand bus routes, lower fares for students, and ___ more bicycle lanes.',
      answer: ['build'],
      wrong: [
        { a: 'builds', why: 'that 절의 동사 expand, lower 꼴을 보십시오. recommend that 뒤의 동사는 동사원형이며, 병렬로 이어진 셋째 동사도 같은 꼴입니다.' },
        { a: 'building', why: '-ing 꼴은 앞의 동사원형 expand, lower 꼴과 병렬이 되지 않습니다.' },
        { a: 'to build', why: 'to 부정사는 앞의 동사원형 expand, lower 꼴과 병렬이 되지 않습니다.' },
      ],
      explain: 'that 절의 주어 the city 뒤에 동사 셋이 병렬로 이어집니다: **expand** … , **lower** … , and **build** … . recommend that 뒤에서는 동사원형을 쓰므로 주어가 단수여도 expand 꼴이고, 병렬인 셋째 동사도 **build** 꼴입니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '다음 문장의 뒤 절이 나타내는 내용으로 알맞은 것은 무엇입니까?\n\nIn the first survey, 40 percent of the residents supported the plan; in the second, only 25 percent.',
      choices: [
        '두 번째 조사에서는 주민의 25퍼센트가 그 계획에 반대했다.',
        '두 번째 조사에서 지지한 주민 수는 첫 번째 조사 때의 25퍼센트였다.',
        '두 번째 조사에서는 주민의 25퍼센트만 그 계획을 지지했다.',
        '두 번째 조사에서 지지율이 25퍼센트포인트 떨어졌다.',
      ],
      answer: 2,
      why: [
        '생략된 동사는 supported 쪽입니다. 반대(opposed)라는 말은 어디에도 없습니다.',
        '25 percent 부분은 앞 절과 같은 꼴(of the residents)로 되살립니다. 첫 번째 조사 결과의 25퍼센트가 아닙니다.',
        '',
        '40퍼센트에서 25퍼센트로 15퍼센트포인트 떨어졌습니다. 25는 떨어진 폭이 아니라 두 번째 지지율입니다.',
      ],
      hint: '쉼표 뒤 in the second, only 25 percent 부분에 앞 절의 말을 같은 꼴로 채워 보십시오.',
      explain: '뒤 절을 되살리면 in the second (survey), only 25 percent (of the residents supported the plan)입니다. 그래서 두 번째 조사에서는 **주민의 25퍼센트만** 그 계획을 지지했습니다.',
    },
  ],

  deeper: [
    {
      title: '학술 영어는 왜 도치와 생략을 즐겨 쓸까',
      body: '영어 문장은 대체로 **이미 아는 정보를 앞에, 새롭고 중요한 정보를 뒤에** 두려는 경향이 있습니다. 도치는 이 흐름을 조절하는 도구입니다. Only after checking all the data did the team publish its results. 문장은 "자료를 모두 확인한 뒤에야"라는 조건을 앞에 내세워 강조하고, 독자의 눈길을 그 조건에 묶어 둡니다.\n\n' +
        '생략은 반대로 **반복을 줄여** 정보 밀도를 높입니다. 학술 글은 같은 실험 조건이나 대상을 여러 번 말해야 하므로, 생략과 that·those 대명사가 없으면 문장이 몹시 길어집니다.\n\n' +
        '그래서 학술 글 독자에게는 "빠진 것을 되살리는 능력"이 곧 독해력입니다. 전공 논문의 결과 부분에서 Group A … than Group B, and Group C … than both 같은 문장을 만나면, 생략된 동사와 비교 대상을 손으로 적어 보는 습관을 들이십시오.',
    },
    {
      title: '모호한 병렬과 비교 피하기',
      body: '병렬과 비교는 잘못 쓰면 두 가지로 읽힙니다.\n\n' +
        '- the effects of noise on sleep and memory — 소음이 "잠과 기억"에 미치는 영향인지, "소음이 잠에 미치는 영향"과 "기억" 두 가지인지 문맥으로 정해야 합니다. 꼼꼼한 글쓴이는 on sleep and on memory 꼴로 전치사를 되풀이해 모호함을 없앱니다.\n' +
        '- Teachers support the new schedule more than students. — "학생들이 지지하는 것보다 더"인지 "학생들을 지지하는 것보다 더"인지 갈립니다. more than students do 꼴로 쓰면 분명해집니다.\n\n' +
        '읽는 사람은 문맥으로 더 그럴듯한 쪽을 고르고, 쓰는 사람은 전치사·조동사를 한 번 더 써서 독자가 고민하지 않게 해야 합니다. 이 과정의 뒤쪽 단원에서 요약·바꿔 쓰기를 할 때도 이 원칙이 그대로 쓰입니다.',
    },
  ],

  faq: [
    {
      q: '비교 문장에 나오는 that of ~, those of ~ 표현은 왜 쓰나요?',
      a: '비교는 같은 종류끼리 해야 하기 때문입니다. "A의 인구"와 "B"를 견주면 논리가 어긋나므로 "B의 인구"라고 해야 하는데, 명사를 되풀이하는 대신 that(단수), those(복수) 대명사로 받습니다. 읽을 때는 that·those 낱말 자리에 앞의 명사를 넣어 보면 뜻이 분명해집니다.',
    },
    {
      q: '도치된 평서문과 의문문은 어떻게 구별해요?',
      a: '도치된 평서문은 문장 앞에 Only when ~, Not only, Rarely, Never 같은 말이 먼저 나오고, 문장이 물음표가 아닌 마침표로 끝납니다. 또 그 앞부분이 "~해서야 비로소", "~할 뿐 아니라"처럼 강조의 뜻을 더합니다. 조동사 뒤의 명사구가 주어라는 점은 의문문과 같습니다.',
    },
    {
      q: '배수 비교의 두 꼴, three times larger than 표현과 three times as large as 표현은 같은 뜻인가요?',
      a: '실제 글에서는 대부분 "세 배"라는 같은 뜻으로 씁니다. 다만 larger than 꼴은 "세 배만큼 더 크다(곧 네 배)"로 읽힐 여지가 있다는 지적이 있어서, 수치가 중요한 학술 글에서는 as … as 꼴이나 실제 수치를 함께 쓰는 것이 안전합니다.',
    },
  ],

  mistakes: [
    '비교 대상을 어긋나게 짝짓는 실수 — The population of A is larger than B.(✗) → … larger than that of B.(✓)',
    '도치 문장에서 앞으로 나온 말을 주어로 읽는 실수 — Only after the second test did the team notice … 문장의 주어는 the team 부분입니다.',
    '병렬에서 꼴을 섞는 실수 — to read, write, and speaking(✗) → to read, write, and speak(✓)',
  ],

  gens: [
    {
      id: 'that-those',
      level: 1,
      title: '비교 대상을 받는 that / those',
      make: function (R) {
        // [문장, 정답, 받는 명사, 단수/복수 설명]
        var items = [
          ['The climate of the south is warmer than ___ of the north.', 'that', 'the climate', '단수'],
          ['The price of rice this year is lower than ___ of last year.', 'that', 'the price', '단수'],
          ['The rainfall in July was heavier than ___ in June.', 'that', 'the rainfall', '셀 수 없는 명사'],
          ['The quality of the new paper is better than ___ of the old one.', 'that', 'the quality', '셀 수 없는 명사'],
          ['The weight of the new laptop is half ___ of the old model.', 'that', 'the weight', '단수'],
          ['The speed of light is much greater than ___ of sound.', 'that', 'the speed', '단수'],
          ['The test scores of the first group were higher than ___ of the second group.', 'those', 'the test scores', '복수'],
          ['Prices in the city are higher than ___ in the countryside.', 'those', 'prices', '복수'],
          ['The results of this study are similar to ___ of earlier studies.', 'those', 'the results', '복수'],
          ['The rooms on the top floor are brighter than ___ on the ground floor.', 'those', 'the rooms', '복수'],
          ['The leaves of this plant are larger than ___ of most other plants.', 'those', 'the leaves', '복수'],
          ['The houses in this village are older than ___ in the next town.', 'those', 'the houses', '복수'],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var other = correct === 'that' ? 'those' : 'that';
        var pick = R.choices(correct, [other, 'it', 'them']);
        var WHY = {
          that: 'that 낱말은 단수·셀 수 없는 명사를 받습니다. 받는 명사 ' + it[2] + ' 부분은 ' + it[3] + '입니다.',
          those: 'those 낱말은 복수 명사를 받습니다. 받는 명사 ' + it[2] + ' 부분은 ' + it[3] + '입니다.',
          it: 'it 낱말은 같은 종류의 다른 것이 아니라 바로 그 대상을 가리킵니다. 비교할 때는 that·those 꼴로 받습니다.',
          them: 'them 낱말은 목적격 대명사로, 뒤에 of·in 수식어를 붙여 비교 대상을 받는 데 쓰지 않습니다.',
        };
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 말은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : WHY[c]; }),
          explain: '비교 대상은 앞 절의 **' + it[2] + '** 부분입니다(' + it[3] + '). 그래서 **' + correct + '** 꼴로 받습니다.\n\n' + it[0].replace('___', '**' + correct + '**'),
        };
      },
    },
    {
      id: 'times-as',
      level: 2,
      title: '배수 비교의 수 구하기',
      make: function (R) {
        // [우리말 문장 틀({a}·{b} 자리), 영어 앞부분, 영어 뒷부분, much/many, 앞 대상, 뒤 대상]
        var things = [
          ['A 공장은 하루에 물을 {a} L, B 공장은 {b} L 씁니다.', 'Factory A uses', 'water as Factory B', 'much', 'A 공장', 'B 공장'],
          ['하루에 A 마을은 전기를 {a} kWh, B 마을은 {b} kWh 씁니다.', 'Village A uses', 'electricity as Village B', 'much', 'A 마을', 'B 마을'],
          ['한 해에 A 농장은 쌀을 {a} t, B 농장은 {b} t 거둡니다.', 'Farm A produces', 'rice as Farm B', 'much', 'A 농장', 'B 농장'],
          ['A 도서관에는 책이 {a}권, B 도서관에는 {b}권 있습니다.', 'Library A has', 'books as Library B', 'many', 'A 도서관', 'B 도서관'],
          ['A 공원에는 나무가 {a}그루, B 공원에는 {b}그루 있습니다.', 'Park A has', 'trees as Park B', 'many', 'A 공원', 'B 공원'],
        ];
        var t = R.pick(things);
        var k = R.int(3, 6); // 두 배는 twice 낱말로 쓰므로 ___ times 빈칸에는 3배 이상만
        var b = R.int(2, 9) * 50;
        var a = k * b;
        var words = { 3: 'three times', 4: 'four times', 5: 'five times', 6: 'six times' };
        return {
          // 빈칸이 영어 문장 안이라 three 처럼 낱말로 쓰기 쉽다 — number 채점은 낱말을 읽지 못하므로 숫자로 쓰라고 밝힌다
          type: 'short', check: 'number', concept: 1,
          q: t[0].replace('{a}', R.fmt.num(a)).replace('{b}', R.fmt.num(b)) + ' 빈칸에 알맞은 수를 **숫자로** 쓰십시오(예: 7).\n\n' + t[1] + ' ___ times as ' + t[3] + ' ' + t[2] + '.',
          answer: String(k),
          wrong: [{ a: String(a - b), why: '두 양의 차이를 구했습니다. 배수 비교는 한쪽이 다른 쪽의 몇 배인지 나눗셈으로 구합니다.' }],
          explain: R.fmt.num(a) + ' ÷ ' + R.fmt.num(b) + ' = ' + k + ', 곧 ' + t[4] + ' 쪽이 ' + t[5] + ' 쪽의 ' + k + '배입니다. 영어로는 ' + words[k] + ' as ' + t[3] + ' … as 꼴입니다(셀 수 ' + (t[3] === 'much' ? '없는' : '있는') + ' 명사라서 ' + t[3] + ' 낱말을 씁니다).\n\n' + t[1] + ' **' + words[k] + '** as ' + t[3] + ' ' + t[2] + '.',
        };
      },
    },
    {
      id: 'parallel-form',
      level: 2,
      title: '병렬 구조에 맞는 꼴 고르기',
      make: function (R) {
        // [문장, 정답, 오답 셋, 병렬의 꼴]
        var items = [
          ['The program aims to reduce costs, improve safety, and ___ new workers.', 'train', ['training', 'to training', 'trains'], 'to 하나에 걸리는 동사원형'],
          ['The volunteers spent the day cleaning the beach, sorting the trash, and ___ the results.', 'recording', ['record', 'to record', 'recorded'], 'spent the day 뒤의 -ing 꼴'],
          ['Good notes are short, clear, and ___.', 'accurate', ['accurately', 'accuracy', 'with accuracy'], 'be동사 뒤의 형용사'],
          ['The researchers measured the temperature, counted the insects, and ___ the soil.', 'tested', ['testing', 'to test', 'tests'], '과거형 동사'],
          ['Students can submit the form by email, by mail, or ___.', 'in person', ['personally visiting', 'to visit the office', 'they visit the office'], '방법을 나타내는 전치사구'],
          ['The guide explains how to plan a trip, ___ a budget, and choose a hotel.', 'set', ['setting', 'to setting', 'sets'], 'how to 뒤의 동사원형'],
          ['The new app is not only cheap but also ___.', 'reliable', ['reliably', 'reliability', 'it is reliable'], 'not only A but also B 짝의 형용사'],
          ['The study looked at both the causes of stress and ___.', 'its effects on sleep', ['how does it affect sleep', 'affecting sleep badly', 'it affects sleep'], 'both A and B 짝의 명사구'],
          ['Many students would rather study in a group than ___ alone.', 'work', ['working', 'to work', 'works'], 'would rather A than B 짝의 동사원형'],
          ['The museum offers guided tours, hands-on workshops, and ___.', 'evening lectures', ['to give lectures', 'lecturing at night', 'they give lectures'], 'offers 뒤의 명사구'],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var pick = R.choices(correct, it[2]);
        return {
          type: 'choice', concept: 4,
          q: '병렬 구조에 맞게 빈칸에 알맞은 말을 고르십시오.\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : '이 꼴은 나열의 다른 요소들(' + it[3] + ')과 꼴이 달라 병렬이 깨집니다.'; }),
          explain: '나열된 요소들은 모두 ' + it[3] + ' 꼴입니다. 그래서 빈칸에도 같은 꼴인 **' + correct + '** 부분이 와야 합니다.\n\n' + it[0].replace('___', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'compare', m: '비교하다', ex: 'We compared the results of the two groups.', exm: '우리는 두 모둠의 결과를 비교했습니다.' },
    { w: 'ratio', m: '비율, 비', ex: 'The ratio of students to teachers is 20 to 1.', exm: '학생 대 교사의 비율은 20 대 1입니다.' },
    { w: 'proportion', m: '비율, 부분', ex: 'A large proportion of the residents walk to work.', exm: '주민의 많은 비율이 걸어서 출근합니다.' },
    { w: 'twice', m: '두 배로; 두 번', ex: 'This bag is twice as heavy as that one.', exm: '이 가방은 저 가방보다 두 배 무겁습니다.' },
    { w: 'respectively', m: '각각', ex: 'The two groups scored 70 and 85, respectively.', exm: '두 모둠은 각각 70점과 85점을 받았습니다.' },
    { w: 'rainfall', m: '강수량, 비', ex: 'Rainfall was lower than usual this spring.', exm: '이번 봄에는 강수량이 평소보다 적었습니다.' },
    { w: 'resident', m: '주민, 거주자', ex: 'Most residents supported the new park.', exm: '대부분의 주민이 새 공원을 지지했습니다.' },
    { w: 'decline', m: '감소; 줄어들다', ex: 'The number of visitors began to decline in winter.', exm: '방문객 수는 겨울에 줄어들기 시작했습니다.' },
    { w: 'considerable', m: '상당한, 꽤 많은', ex: 'The project took a considerable amount of time.', exm: '그 사업은 상당한 시간이 걸렸습니다.' },
    { w: 'parallel', m: '평행한; 병렬의', ex: 'The two roads run parallel to each other.', exm: '두 길은 서로 평행하게 뻗어 있습니다.' },
    { w: 'omit', m: '빠뜨리다, 생략하다', ex: 'You can omit the second verb in this sentence.', exm: '이 문장에서는 두 번째 동사를 생략할 수 있습니다.' },
    { w: 'emphasize', m: '강조하다', ex: 'The writer emphasizes the role of teachers.', exm: '글쓴이는 교사의 역할을 강조합니다.' },
    { w: 'variable', m: '변하기 쉬운; 변수', ex: 'The weather here is highly variable in spring.', exm: '이곳 날씨는 봄에 매우 변하기 쉽습니다.' },
    { w: 'previous', m: '이전의, 앞의', ex: 'This result is different from the previous one.', exm: '이 결과는 이전 결과와 다릅니다.' },
  ],
});
})();