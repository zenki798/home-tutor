/* 대학 영어: 문법과 독해 · 학술 글의 짜임과 담화 표지
 * 초록·문단·예문은 모두 직접 쓴 글이다(가상의 연구·도시). 실제 논문·교재의 문장을 옮기지 않았다.
 * 영어 낱말 바로 뒤에는 조사를 붙이지 않는다(낱말 뒤에 '쪽·꼴·문장·표현' 같은 우리말을 둔다). */
(function () {
  // 가상의 연구 초록
  var ABSTRACT = 'This study examined whether short breaks during lectures help university students remember new material. A total of 120 first-year students attended either a lecture with two five-minute breaks or the same lecture without breaks. One week later, all students took a test on the lecture content. Students in the break group scored higher on average than did those in the no-break group. These results suggest that brief breaks may support memory, although further research with other subjects is needed.';
  // 담화 표지·지시 표현이 있는 문단
  var BIKE = 'Many cities have added bicycle lanes to reduce traffic. However, simply painting lines on a road does not always change how people travel. In one city, for example, the number of cyclists hardly rose after new lanes were added. The reason was that the lanes were not connected to one another. Thus, planners now focus on building connected networks rather than separate lanes. Such networks, namely lanes that link homes, schools, and workplaces, make cycling a realistic choice.';
  // 주제문이 끝에 오는 문단
  var SLEEP = '(1) Research suggests that during sleep, the brain strengthens memories of what we learned during the day. (2) Students who sleep well also tend to pay more attention in class. (3) In addition, rested students are less likely to make careless errors on tests. (4) In short, getting enough sleep is one of the simplest ways to improve learning.';
  // 관계없는 문장이 섞인 문단
  var TREES = '(1) Trees offer cities several important benefits. (2) They provide shade that lowers street temperatures in summer. (3) Their roots help soak up rainwater and reduce flooding. (4) Some kinds of trees can live for hundreds of years in deep forests. (5) They also give birds and insects places to live in the middle of busy streets.';
  // 지시 표현 추적용 글
  var QUIZ = 'Instead of giving one big exam at the end of the term, some instructors give short weekly quizzes. This approach spreads learning over the whole term. Students in such courses often report feeling less stress before exams.';

Tutor.registerUnit({
  id: 'eng-u-grammar-07',
  course: 'eng-u-grammar',
  title: '학술 글의 짜임과 담화 표지',
  summary: '학술 글과 연구 논문의 구성을 익히고, 담화 표지와 지시 표현으로 논리의 흐름을 따라갑니다.',
  goals: [
    '학술 글(서론·본론·결론, 초록)과 연구 논문(서론-방법-결과-논의)의 구성 요소를 구별할 수 있다.',
    'thus, whereas, moreover, namely, nonetheless 등 담화 표지가 나타내는 논리 관계를 파악할 수 있다.',
    'this approach, such findings 같은 지시 표현이 가리키는 앞 내용을 찾을 수 있다.',
    '문단의 주제문과 뒷받침 문장을 구별하고 관계없는 문장을 찾아낼 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '학술 글의 구성: 서론·본론·결론과 초록',
      body: '학술 글(보고서, 소논문, 전공 과제 글)은 대개 **서론 → 본론 → 결론**의 틀을 따릅니다. 각 부분에는 정해진 역할이 있습니다.\n\n' +
        '| 부분 | 하는 일 | 자주 보이는 표현 |\n|---|---|---|\n' +
        '| 서론 | 배경을 소개하고 문제를 좁힌 뒤 **논지(thesis statement)**를 밝힌다 | In recent years, … / This essay argues that … |\n' +
        '| 본론 | 문단마다 하나의 뒷받침 생각을 근거와 함께 펼친다 | First, … / Another reason is … / For example, … |\n' +
        '| 결론 | 논지를 다시 정리하고 의의·한계·제안을 덧붙인다 | In conclusion, … / These findings imply … |\n\n' +
        '**논지**는 글 전체가 증명하려는 한 문장의 핵심 주장으로, 보통 **서론의 끝부분**에 놓입니다. 본론의 각 문단은 그 논지를 받치는 기둥입니다.\n\n' +
        '**초록(abstract)**은 연구 논문 맨 앞의 짧은 요약 문단입니다. 대개 **목적 → 방법 → 결과 → 결론** 순서로 한두 문장씩 담아, 독자가 본문을 읽을지 판단하게 해 줍니다.\n\n' +
        '> 💡 글을 처음 읽을 때는 서론의 마지막 문장과 결론의 첫 문장을 먼저 비교해 보십시오. 두 문장이 같은 주장을 다른 말로 하고 있다면 그것이 논지입니다.',
      easy: '학술 글은 **샌드위치**와 닮았습니다. 위쪽 빵(서론)은 "무엇에 대한 이야기인지"를 알리고, 가운데 속재료(본론)가 실제 내용과 근거를 담고, 아래쪽 빵(결론)이 전체를 다시 감싸 마무리합니다.\n\n' +
        '초록은 샌드위치 가게 메뉴판의 짧은 설명 같은 것입니다. "무엇을, 어떻게 만들었고, 맛은 어떤지"를 몇 줄로 알려 주어, 주문할지(본문을 읽을지) 정하게 해 줍니다.',
      check: {
        type: 'choice',
        q: '학술 글에서 글 전체의 핵심 주장(논지)이 보통 놓이는 자리는 어디입니까?',
        choices: ['본론 첫 문단의 예시 부분', '서론의 끝부분', '참고 문헌 목록'],
        answer: 1,
        why: [
          '본론의 예시는 논지를 받치는 근거입니다. 핵심 주장 자체가 아닙니다.',
          '',
          '참고 문헌 목록은 인용한 자료의 출처를 모은 곳입니다.',
        ],
        explain: '서론은 배경에서 시작해 문제를 좁힌 뒤, 끝부분에서 **논지**를 밝힙니다. 본론의 문단들은 그 논지를 하나씩 받칩니다.',
      },
    },
    {
      title: '연구 논문의 구성: 서론-방법-결과-논의',
      body: '실험·조사 연구를 담은 논문은 흔히 **서론(Introduction) - 방법(Methods) - 결과(Results) - 논의(Discussion)**의 네 부분으로 짜입니다. 머리글자를 따서 **IMRaD** 구조라고 부릅니다.\n\n' +
        '| 부분 | 답하는 질문 | 대표 문장 |\n|---|---|---|\n' +
        '| 서론 | 왜 이 연구를 했나? (배경, 앞선 연구, 아직 모르는 것, 연구 질문) | Little is known about … / This study aims to … |\n' +
        '| 방법 | 어떻게 했나? (참여자, 재료, 절차, 분석) | Participants were randomly assigned to … |\n' +
        '| 결과 | 무엇을 찾았나? (수치, 표·그래프) | As shown in Table 2, … / No significant difference was found. |\n' +
        '| 논의 | 그것은 무슨 뜻인가? (해석, 앞선 연구와 비교, 한계, 후속 연구) | These findings suggest … / One limitation of this study is … |\n\n' +
        '부분마다 문법에도 특징이 있습니다. 방법 부분은 이미 한 일을 적으므로 **과거 시제·수동태**(were collected, were assigned)가 많고, 결과 부분은 수치를 보고하며 해석을 아낍니다. 논의 부분에서는 앞 단원에서 배운 **완곡 표현**(suggest, may)이 많아집니다.\n\n' +
        '> 💡 한 문장만 보고도 어느 부분인지 맞힐 수 있으면 긴 논문에서 필요한 곳을 빨리 찾을 수 있습니다.',
      easy: '요리 방송을 떠올려 보십시오.\n\n' +
        '1. "오늘은 왜 이 요리를 할까요?" — 서론\n' +
        '2. "재료는 이것이고, 이렇게 썰고 이렇게 볶습니다." — 방법\n' +
        '3. "자, 완성된 모습입니다. 색이 이렇게 나왔네요." — 결과\n' +
        '4. "맛이 좋은 이유는 이것이고, 다음엔 불을 조금 줄여 보세요." — 논의\n\n' +
        '연구 논문도 이 순서로 "왜 → 어떻게 → 무엇이 → 무슨 뜻"을 차례로 들려줍니다.',
      check: {
        type: 'choice',
        q: '다음 문장은 연구 논문의 어느 부분에 들어갈 가능성이 가장 큽니까?\n\nParticipants were randomly assigned to two groups.',
        choices: ['서론', '결과', '방법'],
        answer: 2,
        why: [
          '서론은 연구의 배경과 목적을 밝힙니다. 참여자를 어떻게 나누었는지는 연구 절차입니다.',
          '결과 부분은 측정한 수치와 차이를 보고합니다. 모둠을 나눈 것은 결과가 아니라 절차입니다.',
          '',
        ],
        explain: '참여자를 무작위로 두 모둠에 나누었다는 것은 연구를 **어떻게** 했는지, 곧 **방법** 부분의 내용입니다. 과거 시제 수동태(were assigned)도 방법 부분의 특징입니다.',
      },
    },
    {
      title: '담화 표지: thus, whereas, moreover, namely, nonetheless',
      body: '**담화 표지**는 문장과 문장, 절과 절 사이의 **논리 관계**를 알려 주는 말입니다. 표지 하나만 정확히 읽어도 다음 내용을 예측할 수 있습니다.\n\n' +
        '| 관계 | 대표 표지 | 예 |\n|---|---|---|\n' +
        '| 결과·결론 | thus, therefore, as a result, hence | The roads were icy. **Thus**, the race was delayed. |\n' +
        '| 대조 | whereas, while, however, in contrast | Group A improved, **whereas** Group B did not. |\n' +
        '| 첨가 | moreover, furthermore, in addition | The tool is cheap. **Moreover**, it is easy to use. |\n' +
        '| 구체화·바꿔 말하기 | namely, that is, in other words | two factors, **namely** cost and time |\n' +
        '| 양보 (예상과 반대) | nonetheless, nevertheless, even so | The task was hard. **Nonetheless**, most finished it. |\n' +
        '| 예시 | for example, for instance | Some birds, **for example** penguins, cannot fly. |\n\n' +
        '쓰는 자리도 구별합니다.\n\n' +
        '- **whereas** 낱말은 접속사입니다. 한 문장 안에서 두 절을 잇습니다: A, whereas B.\n' +
        '- **thus, moreover, nonetheless, however** 표현은 부사입니다. 보통 새 문장 앞에 쉼표와 함께 오거나, 세미콜론(;) 뒤에 옵니다.\n' +
        '- **namely** 낱말은 바로 앞에 말한 것을 **구체적으로 밝힐** 때 씁니다.\n\n' +
        '> ⚠️ nonetheless 표현은 "그러므로"가 아니라 "그럼에도 불구하고"입니다. 앞 내용에서 **예상되는 것과 반대**되는 내용을 이끕니다.',
      easy: '담화 표지는 도로의 **표지판**과 같습니다.\n\n' +
        '- thus → "이 길을 따라가면 도착합니다"(결과)\n' +
        '- whereas → "맞은편 길은 다릅니다"(대조)\n' +
        '- moreover → "이 길로 조금 더 가세요"(첨가)\n' +
        '- namely → "여기가 바로 그곳입니다"(구체화)\n' +
        '- nonetheless → "길이 험해도 계속 가세요"(예상과 반대)\n\n' +
        '표지판만 잘 봐도 길을 잃지 않듯이, 담화 표지만 잘 봐도 글의 흐름을 놓치지 않습니다.',
      check: {
        type: 'choice',
        q: '빈칸에 가장 알맞은 말은 무엇입니까?\n\nThe first method is fast, ___ the second is more accurate.',
        choices: ['whereas', 'thus', 'moreover'],
        answer: 0,
        why: [
          '',
          'thus 표현은 결과를 이끕니다. "빠르다 그러므로 더 정확하다"는 논리가 맞지 않습니다.',
          'moreover 표현은 같은 방향의 내용을 덧붙입니다. 두 방법의 서로 다른 장점을 맞세우는 문장에는 맞지 않습니다.',
        ],
        explain: '첫째 방법(빠름)과 둘째 방법(더 정확함)의 다른 점을 맞세우므로 대조의 접속사 **whereas** 낱말이 알맞습니다. whereas 낱말은 접속사라서 쉼표 뒤에서 두 절을 이을 수 있습니다.',
      },
    },
    {
      title: '지시 표현으로 앞 내용 추적하기',
      body: '학술 글은 앞에서 말한 내용을 **this / these / such + 요약 명사**로 다시 받으며 이어 갑니다.\n\n' +
        '- Some instructors give short weekly quizzes. **This approach** spreads learning over the term. (this approach = 매주 짧은 퀴즈를 내는 것)\n' +
        '- Three studies found similar results. **Such findings** suggest that … (such findings = 세 연구가 찾은 비슷한 결과)\n' +
        '- Researchers compared paper maps and phone maps. **The former** … , **the latter** … (the former = 종이 지도, the latter = 휴대전화 지도)\n\n' +
        '이런 지시 표현은 낱말 하나가 아니라 **앞 문장이나 문단 전체의 내용**을 가리키는 경우가 많습니다. 함께 쓰인 명사(approach, problem, findings, trend, view)가 그 내용의 **종류**를 알려 줍니다.\n\n' +
        '| 요약 명사 | 앞 내용의 종류 |\n|---|---|\n' +
        '| this approach / method / strategy | 어떤 방법이나 방식 |\n' +
        '| this problem / issue | 앞에서 말한 문제 상황 |\n' +
        '| such findings / these results | 연구에서 나온 결과 |\n' +
        '| this view / claim | 누군가의 주장이나 견해 |\n\n' +
        '> 💡 지시 표현을 만나면 그 자리에 앞 내용을 우리말로 바꿔 넣어 읽어 보십시오. 문장이 자연스럽게 이어지면 바르게 찾은 것입니다.',
      easy: '친구와 이야기할 때 "아까 그거 있잖아, 그 방법 좋더라."라고 하면 "그 방법"이 무엇인지 둘 다 압니다. 바로 앞에서 이야기했으니까요.\n\n' +
        '영어 글의 this approach, such findings 표현도 "아까 말한 그 방법", "앞에서 본 그런 결과"라는 뜻입니다. 길을 걷다 뒤를 돌아보듯, 한 문장 뒤로 돌아가 "그것"을 찾으면 됩니다.',
      check: {
        type: 'choice',
        q: '다음 글에서 This approach 표현이 가리키는 것은 무엇입니까?\n\nSome teachers ask students to explain a new idea to a classmate before the test. This approach helps students find gaps in their own understanding.',
        choices: ['교사가 새 개념을 설명하는 것', '시험 전에 새 개념을 친구에게 설명하게 하는 것', '시험을 치르는 것'],
        answer: 1,
        why: [
          '앞 문장에서 설명하는 사람은 교사가 아니라 학생입니다.',
          '',
          '시험(the test)은 시간을 나타내는 말일 뿐, 교사들이 쓰는 방식이 아닙니다.',
        ],
        explain: 'This approach(이 방식) 표현은 앞 문장 전체, 곧 **학생에게 시험 전에 새 개념을 친구에게 설명하게 하는 것**을 받습니다. approach 낱말이 "방법·방식"이라는 종류를 알려 줍니다.',
      },
    },
    {
      title: '문단의 주제문과 뒷받침 구조',
      body: '학술 글의 문단은 하나의 중심 생각을 다룹니다. 그 중심 생각을 담은 문장이 **주제문(topic sentence)**이고, 나머지 문장은 그것을 **이유·예·자료·설명**으로 받치는 **뒷받침 문장**입니다.\n\n' +
        '| 문단의 부분 | 하는 일 | 신호 |\n|---|---|---|\n' +
        '| 주제문 | 화제 + 그것에 대한 글쓴이의 생각 | 일반적이고 넓은 진술 |\n' +
        '| 뒷받침 문장 | 주제문을 구체화한다 | First, In addition, For example, This is because |\n' +
        '| 맺음 문장(있을 때) | 문단을 정리하거나 다음 문단으로 넘긴다 | In short, Therefore, Thus |\n\n' +
        '주제문은 **대개 문단의 첫 문장**이지만, In short 같은 표지와 함께 **끝에 오는** 경우도 있습니다. 주제문을 찾을 때는 위치보다 "나머지 문장이 모두 이 문장을 받치는가?"를 기준으로 삼습니다.\n\n' +
        '같은 기준으로 **관계없는 문장**도 찾을 수 있습니다. 화제의 낱말은 같아도 주제문의 **생각**을 받치지 않는 문장이 끼어 있으면 그 문장이 흐름을 끊는 문장입니다.\n\n' +
        '> ⚠️ 너무 넓은 문장(Libraries have existed for thousands of years.)이나 너무 좁은 문장(세부 사실 하나)은 주제문이 될 수 없습니다.',
      easy: '문단은 **우산**과 같습니다. 주제문은 우산의 천이고, 뒷받침 문장들은 그 천을 떠받치는 우산살입니다.\n\n' +
        '우산살은 모두 같은 천을 받쳐야 합니다. 엉뚱한 쪽을 향한 살(관계없는 문장)이 있으면 우산이 망가지지요. 문단을 읽을 때 "모든 살이 받치고 있는 천은 무엇인가?"를 찾으면 그것이 주제문입니다.',
      check: {
        type: 'ox',
        q: '문단의 주제문은 언제나 문단의 첫 문장이다.',
        answer: false,
        explain: '주제문은 대개 첫 문장이지만, 예를 늘어놓은 뒤 In short 같은 표지와 함께 **끝에 오기도** 합니다. 주제문은 위치가 아니라 "나머지 문장들이 모두 받치는 중심 생각인가"로 판단합니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 초록을 목적·방법·결과·결론으로 나누어 보십시오.\n\n' + ABSTRACT,
      steps: [
        '목적: This study examined whether short breaks … help students remember new material. — 무엇을 알아보려 했는지 밝힙니다.',
        '방법: A total of 120 first-year students attended … / One week later, all students took a test … — 누구를, 어떻게 비교하고 측정했는지 말합니다.',
        '결과: Students in the break group scored higher on average than did those in the no-break group. — 찾아낸 차이를 보고합니다.',
        '결론: These results suggest that brief breaks may support memory, although further research … is needed. — suggest, may 표현으로 조심스럽게 해석하고 한계(다른 과목 연구 필요)를 덧붙입니다.',
      ],
      answer: '목적 1문장 → 방법 2문장 → 결과 1문장 → 결론 1문장',
    },
    {
      q: '다음 문단에서 담화 표지와 지시 표현을 따라 논리의 흐름을 정리해 보십시오.\n\n' + BIKE,
      steps: [
        '첫 문장: 많은 도시가 교통량을 줄이려고 자전거 도로를 만들었다(배경).',
        'However: 대조 — 선만 칠한다고 이동 방식이 늘 바뀌지는 않는다(문제 제기, 이 문단의 핵심 주장).',
        'for example: 예시 — 어느 도시에서는 새 도로를 만든 뒤에도 자전거 이용자가 거의 늘지 않았다.',
        'The reason was that … : 그 까닭 — 도로들이 서로 이어져 있지 않았다.',
        'Thus: 결과 — 그래서 계획자들은 이제 따로 떨어진 도로가 아니라 이어진 연결망을 만드는 데 힘쓴다.',
        'Such networks, namely … : 지시 표현 Such networks 부분이 앞 문장의 connected networks 부분을 받고, namely 뒤에서 그것을 "집·학교·일터를 잇는 도로"로 구체화한다.',
      ],
      answer: '배경 → 대조(문제) → 예시 → 까닭 → 결과(해결 방향) → 구체화',
    },
  ],

  terms: [
    { term: '논지 (thesis statement)', def: '글 전체가 증명하려는 핵심 주장을 담은 문장입니다. 보통 서론의 끝부분에 놓입니다.' },
    { term: '초록 (abstract)', def: '연구 논문 맨 앞의 짧은 요약 문단입니다. 대개 목적·방법·결과·결론을 차례로 담습니다.' },
    { term: 'IMRaD 구조', def: '연구 논문의 서론(Introduction)·방법(Methods)·결과(Results)·논의(Discussion) 네 부분 구성입니다.' },
    { term: '담화 표지', def: '문장이나 절 사이의 논리 관계(결과, 대조, 첨가, 구체화, 양보, 예시)를 알려 주는 말입니다. 예: thus, whereas, moreover' },
    { term: '지시 표현', def: '앞에서 말한 내용을 this, these, such, the former, the latter 같은 말로 다시 받는 표현입니다. 예: this approach, such findings' },
    { term: '요약 명사', def: '지시어와 함께 쓰여 앞 내용의 종류를 알려 주는 명사입니다. 예: approach(방식), problem(문제), findings(결과)' },
    { term: '주제문 (topic sentence)', def: '문단의 중심 생각을 담은 문장입니다. 대개 첫 문장이지만 끝에 오기도 합니다.' },
    { term: '뒷받침 문장', def: '주제문을 이유·예·자료·설명으로 구체화하는 문장입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 1,
      q: '다음 문장은 연구 논문의 어느 부분에 들어갈 가능성이 가장 큽니까?\n\nLittle is known about how classroom noise affects young children\'s reading.',
      choices: ['서론', '방법', '결과', '논의'],
      answer: 0,
      why: [
        '',
        '방법 부분은 참여자·절차·분석 방법을 적습니다. "아직 알려진 것이 적다"는 말은 연구를 하는 까닭입니다.',
        '결과 부분은 이 연구에서 찾은 수치와 차이를 보고합니다.',
        '논의 부분은 이 연구의 결과를 해석합니다. 연구 전의 지식 공백을 밝히는 것은 서론의 일입니다.',
      ],
      explain: 'Little is known about … (~에 대해서는 알려진 것이 적다)는 **아직 연구되지 않은 공백**을 밝혀 연구의 필요성을 보여 주는 전형적인 **서론** 문장입니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 1,
      q: '다음 문장은 연구 논문의 어느 부분에 들어갈 가능성이 가장 큽니까?\n\nOne limitation of this study is that all participants came from a single city.',
      choices: ['서론', '방법', '결과', '논의'],
      answer: 3,
      why: [
        '서론은 연구를 시작하는 까닭을 밝힙니다. 이 연구의 한계는 연구를 마친 뒤에 말합니다.',
        '참여자에 대한 내용이지만, 모집 절차를 적은 것이 아니라 그 때문에 생긴 약점을 평가하는 문장입니다.',
        '결과 부분은 찾은 수치를 보고합니다. 연구 설계의 약점은 결과가 아닙니다.',
        '',
      ],
      explain: '**One limitation of this study is …** 문장은 연구의 한계를 스스로 밝히는 **논의** 부분의 대표 문장입니다. 참여자가 한 도시 출신이라 결과를 일반화하기 어렵다는 뜻입니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 가장 알맞은 말은 무엇입니까?\n\nThe new tool saves time. ___, it reduces errors.',
      choices: ['Nonetheless', 'Moreover', 'Whereas', 'Namely'],
      answer: 1,
      why: [
        'Nonetheless 표현은 앞 내용에서 예상되는 것과 반대되는 내용을 이끕니다. "시간을 아낀다"와 "오류를 줄인다"는 같은 방향의 장점입니다.',
        '',
        'Whereas 낱말은 접속사라서 쉼표만 찍고 새 문장 앞에 홀로 쓰지 않으며, 뜻도 대조입니다.',
        'Namely 표현은 앞에 말한 것을 구체적으로 밝힐 때 씁니다. 여기서는 새로운 장점을 덧붙입니다.',
      ],
      explain: '시간 절약에 오류 감소라는 장점을 **덧붙이므로** 첨가의 표지 **Moreover**(게다가)가 알맞습니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 2,
      q: '"즉, 다시 말해"처럼 앞의 말을 구체적으로 밝히는 **한 낱말**을 빈칸에 쓰십시오.\n\nTwo factors, ___ cost and time, made the project difficult.',
      answer: ['namely'],
      wrong: [
        { a: 'moreover', why: 'moreover 표현은 새 내용을 덧붙입니다. 여기서는 앞의 two factors 부분이 무엇인지 밝혀야 합니다.' },
        { a: 'thus', why: 'thus 표현은 결과를 이끕니다. cost and time 부분은 결과가 아니라 two factors 부분의 구체적인 내용입니다.' },
      ],
      explain: '**namely**(즉, 다시 말해)는 바로 앞의 two factors(두 가지 요인)가 무엇인지, 곧 cost and time(비용과 시간)을 구체적으로 밝힙니다.',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '다음 두 번째 문장의 Nonetheless 표현은 앞 문장에서 당연히 따라 나오는 결과를 이끈다.\n\nThe test was much harder than expected. Nonetheless, most students passed it.',
      answer: false,
      explain: 'Nonetheless 표현은 "그럼에도 불구하고"입니다. 시험이 예상보다 훨씬 어려웠다면 많이 떨어질 것으로 예상되는데, **그럼에도** 대부분이 통과했다는 **예상과 반대**되는 내용을 이끕니다. 당연한 결과를 이끄는 표지는 thus, as a result 쪽입니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 3,
      q: '다음 글에서 This approach 표현이 가리키는 내용을 본문에서 찾아 **영어 네 낱말**로 쓰십시오.\n\n' + QUIZ,
      answer: ['give short weekly quizzes', 'giving short weekly quizzes'],
      wrong: [
        { a: 'one big exam', why: 'one big exam(학기 말 큰 시험 한 번)은 이 방식이 "대신하는" 것입니다. Instead of 뒤의 내용과 반대쪽을 찾으십시오.' },
        { a: 'short weekly quizzes', why: '퀴즈 자체가 아니라 "퀴즈를 내는 것"이 방식(approach)입니다. 동사까지 넣어 네 낱말로 쓰십시오.' },
      ],
      explain: 'This approach(이 방식) 표현은 앞 문장의 핵심 행동 some instructors **give short weekly quizzes**(매주 짧은 퀴즈를 낸다)를 받습니다. 뒤 문장의 such courses 부분도 "그런 방식으로 운영하는 수업"을 가리킵니다.',
    },
    {
      id: 'p7', level: 2, type: 'choice', fixed: true, concept: 4,
      q: '다음 문단의 주제문은 무엇입니까?\n\n' + SLEEP,
      choices: ['(1)', '(2)', '(3)', '(4)'],
      answer: 3,
      why: [
        '(1)은 잠이 학습을 돕는 까닭 하나(기억 강화)를 말하는 뒷받침 문장입니다.',
        '(2)는 잘 자는 학생의 수업 집중이라는 또 하나의 근거입니다.',
        '(3)은 In addition 표지로 근거를 하나 더 덧붙인 뒷받침 문장입니다.',
        '',
      ],
      hint: '나머지 세 문장이 모두 받치고 있는 넓은 생각을 찾으십시오. In short 표지도 단서입니다.',
      explain: '(1)~(3)은 기억 강화, 수업 집중, 실수 감소라는 구체적인 근거입니다. (4) **In short, getting enough sleep is one of the simplest ways to improve learning.** 문장이 그 근거들을 묶는 중심 생각, 곧 주제문입니다. 주제문이 문단 끝에 온 경우입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', fixed: true, concept: 4,
      q: '다음 문단에서 전체 흐름과 **관계없는** 문장은 무엇입니까?\n\n' + TREES,
      choices: ['(2)', '(3)', '(4)', '(5)'],
      answer: 2,
      why: [
        '(2)는 그늘로 거리 온도를 낮춘다는, 도시에 주는 이로움입니다.',
        '(3)은 빗물을 흡수해 홍수를 줄인다는, 도시에 주는 이로움입니다.',
        '',
        '(5)는 바쁜 거리 한가운데 새와 곤충의 보금자리가 된다는, 도시에 주는 이로움입니다.',
      ],
      hint: '주제문 (1)의 생각은 "나무가 도시에 주는 이로움"입니다. 그것을 받치지 않는 문장을 찾으십시오.',
      explain: '주제문 (1)은 "나무가 **도시에** 주는 이로움"을 말합니다. (4)는 나무라는 화제는 같지만 **깊은 숲에서 오래 산다**는 내용이라 도시의 이로움을 받치지 않습니다.',
    },
    {
      id: 'p9', level: 2, type: 'order', concept: 1,
      q: '다음 문장들을 연구 논문의 서론 → 방법 → 결과 → 논의 순서로 늘어놓으십시오.',
      choices: [
        'Few studies have examined how often teenagers read printed books.',
        'We surveyed 300 students at five high schools.',
        'Only 18 percent reported reading a printed book every week.',
        'This low rate may reflect the growing use of phones for reading.',
      ],
      answer: [0, 1, 2, 3],
      hint: '"아직 연구가 적다" → "누구를 조사했다" → "몇 퍼센트였다" → "그 까닭은 ~일지도 모른다"의 흐름입니다.',
      explain: '서론: Few studies have examined …(연구 공백) → 방법: We surveyed 300 students …(대상과 절차) → 결과: Only 18 percent reported …(수치) → 논의: This low rate may reflect …(완곡한 해석). 논의 문장의 This low rate 표현은 결과의 18 percent 부분을 받는 지시 표현입니다.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 2,
      q: '빈칸에 가장 알맞은 말은 무엇입니까?\n\nThe old bridge was unsafe, and repairing it would have cost more than building a new one. ___, the city decided to replace it.',
      choices: ['Nonetheless', 'Namely', 'Thus', 'In contrast'],
      answer: 2,
      why: [
        '다리가 위험하고 수리비가 더 든다면 새로 짓는 것은 예상대로의 결정입니다. 반대 내용을 이끄는 Nonetheless 표현은 맞지 않습니다.',
        'Namely 표현은 앞의 말을 구체적으로 밝힙니다. 여기서는 앞 내용에 따른 결정을 말합니다.',
        '',
        'In contrast 표현은 두 대상을 맞세웁니다. 앞뒤 문장은 원인과 결과입니다.',
      ],
      explain: '앞 문장(위험하고, 수리비가 새로 짓는 것보다 비쌈)이 원인이고 뒤 문장(교체하기로 함)이 그 결과이므로 결과의 표지 **Thus**(그래서)가 알맞습니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 3,
      q: '다음 글의 내용과 맞는 것은 무엇입니까?\n\nResearchers compared paper maps and phone maps. The former helped people remember the route better, while the latter helped them arrive faster.',
      choices: [
        '휴대전화 지도는 길을 더 잘 기억하게 했다.',
        '종이 지도로 더 빨리 도착했다.',
        '종이 지도는 길을 더 잘 기억하게 했다.',
        '두 지도의 효과는 같았다.',
      ],
      answer: 2,
      why: [
        'the latter(후자) 쪽이 휴대전화 지도이고, 그 효과는 더 빨리 도착한 것입니다.',
        'the former(전자) 쪽인 종이 지도의 효과는 길을 더 잘 기억한 것입니다. 빨리 도착한 쪽은 휴대전화 지도입니다.',
        '',
        'while 낱말이 두 지도의 서로 다른 효과를 맞세웁니다.',
      ],
      explain: '앞 문장에서 먼저 나온 paper maps 쪽이 **the former**(전자), 나중에 나온 phone maps 쪽이 **the latter**(후자)입니다. 그래서 종이 지도는 길을 더 잘 기억하게 했고, 휴대전화 지도는 더 빨리 도착하게 했습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 초록만 읽고서는 알 수 **없는** 것은 무엇입니까?\n\n' + ABSTRACT,
      choices: [
        '연구에 참여한 학생 수',
        '시험을 치른 시점',
        '강의가 어떤 과목이었는지',
        '쉬는 시간의 길이와 횟수',
      ],
      answer: 2,
      why: [
        'A total of 120 first-year students — 참여자 수가 나와 있습니다.',
        'One week later — 강의 한 주 뒤에 시험을 쳤습니다.',
        '',
        'two five-minute breaks — 5분씩 두 번 쉬었습니다.',
      ],
      hint: '초록은 목적·방법·결과·결론을 짧게 담기 때문에 빠진 정보가 있습니다. 결론 문장의 although 뒤도 단서입니다.',
      explain: '초록에는 참여자 수(120명), 시험 시점(일주일 뒤), 쉬는 시간(5분씩 두 번)이 나오지만 **강의 과목**은 없습니다. 오히려 결론의 further research with other subjects(다른 과목으로 하는 후속 연구) 표현이 과목 문제를 한계로 남겨 둡니다. 초록에 없는 세부 사항은 본문의 방법 부분에서 찾아야 합니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', fixed: true, concept: 2,
      q: '(A), (B)에 들어갈 말로 가장 알맞게 짝지은 것은 무엇입니까?\n\nThe survey had a high response rate. (A) ___, its sample came from only one region. (B) ___, the results may not apply to the whole country.',
      choices: [
        '(A) Moreover … (B) Thus',
        '(A) Nonetheless … (B) Whereas',
        '(A) Nonetheless … (B) Thus',
        '(A) Namely … (B) Nonetheless',
      ],
      answer: 2,
      why: [
        '응답률이 높다는 장점 뒤에 "한 지역 표본"이라는 약점이 오므로 첨가(Moreover)가 아니라 반대 방향의 표지가 필요합니다.',
        '(B)의 Whereas 낱말은 접속사라 쉼표만 찍고 새 문장 앞에 홀로 쓰지 않습니다. 뜻도 결과가 필요한 자리와 맞지 않습니다.',
        '',
        '(A)의 Namely 표현은 앞의 말을 구체화합니다. 응답률과 표본 지역은 서로 다른 내용입니다.',
      ],
      hint: '(A) 앞은 장점, 뒤는 약점입니다. (B) 앞의 약점에서 무엇이 따라 나오는지 보십시오.',
      explain: '(A) 응답률이 높았다(장점)는 내용에서 예상되는 것과 달리 표본이 한 지역뿐이었다(약점) → **Nonetheless**(그럼에도). (B) 표본이 한 지역뿐이었으므로 결과를 전국에 적용하기 어렵다(결과) → **Thus**(그래서).',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 3,
      q: '다음 문단의 마지막 문장에서 Such networks 표현이 가리키는 것을 본문에서 찾아 **영어 두 낱말**로 쓰십시오.\n\n' + BIKE,
      answer: ['connected networks'],
      wrong: [
        { a: 'separate lanes', why: 'separate lanes(따로 떨어진 도로)는 계획자들이 rather than 표현으로 피하는 쪽입니다. Such networks 표현은 그 반대쪽을 받습니다.' },
        { a: 'bicycle lanes', why: 'bicycle lanes 부분은 첫 문장에서 말한 일반적인 자전거 도로입니다. 바로 앞 문장에서 networks 낱말과 함께 나온 말을 찾으십시오.' },
      ],
      explain: 'Such networks(그런 연결망) 표현은 바로 앞 문장 planners now focus on building **connected networks** rather than separate lanes 부분의 connected networks(이어진 연결망)를 받습니다. 그리고 namely 뒤에서 그것을 lanes that link homes, schools, and workplaces(집·학교·일터를 잇는 도로)로 구체화합니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '다음 뒷받침 문장들 앞에 놓을 **주제문**으로 가장 알맞은 것은 무엇입니까?\n\nThey lend laptops to students who do not have one at home. Many also run free classes on using the internet safely. Some even help job seekers write their resumes.',
      choices: [
        'Libraries have existed in many forms for thousands of years.',
        'Many students do not have laptops at home.',
        'Public libraries today offer much more than books.',
        'Everyone should visit a library at least once a week.',
      ],
      answer: 2,
      why: [
        '도서관의 긴 역사는 뒷받침 문장들의 내용(오늘날의 여러 서비스)과 관계가 없습니다. 지나치게 넓고 방향이 다릅니다.',
        '뒷받침 문장 하나에 나오는 세부 사실일 뿐입니다. 주제문으로는 지나치게 좁습니다.',
        '',
        '글쓴이의 권유일 뿐, 세 문장이 받치는 내용(도서관이 하는 일)과 맞지 않습니다.',
      ],
      hint: '세 문장이 공통으로 말하는 것은 "도서관이 책을 빌려주는 일 말고도 하는 여러 일"입니다.',
      explain: '노트북 대여, 인터넷 안전 수업, 이력서 작성 지원은 모두 **책 말고 도서관이 제공하는 서비스**입니다. 이 셋을 모두 받치는 문장은 **Public libraries today offer much more than books.**입니다. 뒷받침 문장의 They, Many, Some 낱말도 public libraries 부분을 받습니다.',
    },
  ],

  deeper: [
    {
      title: '논문은 처음부터 끝까지 읽지 않는다',
      body: '서론-방법-결과-논의 구조는 20세기를 지나며 과학 학술지에서 널리 표준이 되었습니다. 구조가 정해져 있으니 독자는 **필요한 부분부터** 골라 읽을 수 있습니다.\n\n' +
        '많은 연구자가 다음 순서로 논문을 훑습니다. ① 제목과 초록으로 관련이 있는지 판단 → ② 논의(또는 결론)의 첫 문단으로 핵심 해석 확인 → ③ 그림과 표로 실제 결과 확인 → ④ 정말 필요할 때 방법 부분을 꼼꼼히 읽기.\n\n' +
        '다음 단원 "학술 독해 전략"에서는 이런 훑어 읽기와 찾아 읽기를 더 자세히 연습합니다. 이 단원의 구조 지식이 그 바탕이 됩니다.',
    },
    {
      title: '담화 표지 없이도 이어지는 글: 응집성',
      body: '글이 잘 이어진다고 느끼게 하는 장치를 **응집성(cohesion)**이라고 합니다. 담화 표지는 그 가운데 하나일 뿐입니다.\n\n' +
        '- **지시 표현**: this approach, such findings, the former\n' +
        '- **낱말 반복과 바꿔 말하기**: networks → such networks, 18 percent → this low rate\n' +
        '- **구정보 → 신정보 흐름**: 앞 문장 끝의 새 정보를 다음 문장 첫머리에서 받아 이어 가기\n\n' +
        '숙련된 학술 글쓴이는 표지를 모든 문장에 붙이지 않습니다. 표지가 지나치게 많으면(Moreover, … Furthermore, … In addition, …) 오히려 글이 기계적으로 읽힙니다. 독자는 표지가 없을 때에도 지시 표현과 낱말의 이어짐을 따라 논리를 복원할 수 있어야 합니다.',
    },
  ],

  faq: [
    {
      q: 'however·whereas 두 표현은 뜻이 비슷한데 왜 쓰는 자리가 달라요?',
      a: '품사가 다르기 때문입니다. whereas 낱말은 접속사라서 한 문장 안에서 두 절을 잇습니다(A, whereas B). however 낱말은 부사라서 두 절을 직접 이을 수 없고, 새 문장 앞(A. However, B.)이나 세미콜론 뒤(A; however, B.)에 씁니다. 뜻도 조금 다릅니다. whereas 쪽은 두 대상을 나란히 놓고 맞세우는 데, however 쪽은 앞 내용과 다른 방향으로 흐름을 트는 데 자주 씁니다.',
    },
    {
      q: '초록만 읽어도 논문을 읽은 셈인가요?',
      a: '아닙니다. 초록은 논문을 읽을지 정하는 데 쓰는 요약입니다. 연구 방법의 세부, 결과의 정확한 수치, 글쓴이가 밝힌 한계는 본문에서만 확인할 수 있습니다. 과제나 발표에 인용할 때는 적어도 결과와 논의 부분을 직접 읽어야 합니다.',
    },
    {
      q: '주제문이 아예 없는 문단도 있나요?',
      a: '있습니다. 이야기체 글이나 일부 학술 글에서는 중심 생각을 직접 쓰지 않고 뒷받침 문장들로만 드러내기도 합니다. 그럴 때는 문장들이 공통으로 말하는 것을 독자가 한 문장으로 요약해 보면 됩니다. 그 문장이 "숨은 주제문"입니다.',
    },
  ],

  mistakes: [
    'Nonetheless 표현을 "그러므로"로 읽는 실수 — "그럼에도 불구하고"입니다. 앞 내용에서 예상되는 것과 반대되는 내용이 이어집니다.',
    'this approach, such findings 같은 지시 표현을 바로 앞 낱말 하나로만 보는 실수 — 앞 문장 전체의 내용을 받는 경우가 많습니다. 요약 명사(approach, findings)가 그 종류를 알려 줍니다.',
    '주제문은 늘 첫 문장이라고 단정하는 실수 — In short 같은 표지와 함께 끝에 오기도 합니다. 나머지 문장이 모두 받치는 문장을 찾으십시오.',
  ],

  gens: [
    {
      id: 'marker-choice',
      level: 2,
      title: '알맞은 담화 표지 고르기',
      make: function (R) {
        var MEAN = {
          Thus: '결과("그래서")', 'As a result': '결과("그 결과")', Moreover: '첨가("게다가")', Nonetheless: '양보("그럼에도 불구하고")',
          'In contrast': '대조("그와 달리")', 'For example': '예시("예를 들어")', Namely: '구체화("즉")',
          whereas: '대조("~인 반면")', namely: '구체화("즉")', thus: '결과("그래서")', moreover: '첨가("게다가")',
          nonetheless: '양보("그럼에도 불구하고")', 'for example': '예시("예를 들어")',
        };
        // [글, 정답, 오답 셋]
        var items = [
          ['The new bus line opened in March. ___, traffic in the city center fell by ten percent.', 'As a result', ['Nonetheless', 'For example', 'In contrast']],
          ['Solar panels are expensive to install. ___, many families buy them because they save money over time.', 'Nonetheless', ['Thus', 'Moreover', 'Namely']],
          ['The library extended its opening hours. ___, it added a quiet study room on the second floor.', 'Moreover', ['Nonetheless', 'In contrast', 'For example']],
          ['The north side of the hill gets little sunlight, ___ the south side is warm and dry.', 'whereas', ['thus', 'moreover', 'namely']],
          ['The survey asked about only one thing, ___ how often people walk to work.', 'namely', ['whereas', 'nonetheless', 'moreover']],
          ['Some plants grow well in deep shade. ___, many ferns live on the dark forest floor.', 'For example', ['Nonetheless', 'Thus', 'In contrast']],
          ['The first experiment failed completely. ___, the team learned which method did not work.', 'Nonetheless', ['Moreover', 'Namely', 'For example']],
          ['Prices rose sharply during the year. ___, many shoppers began to buy less.', 'As a result', ['Nonetheless', 'For example', 'Namely']],
          ['City A has many parks, ___ City B has very few.', 'whereas', ['moreover', 'thus', 'namely']],
          ['Walking to school is good exercise. ___, it saves money on bus fares.', 'Moreover', ['Nonetheless', 'In contrast', 'Namely']],
          ['The test was much harder than expected. ___, most students passed it.', 'Nonetheless', ['Thus', 'Moreover', 'For example']],
          ['Our team made three changes, ___ new tools, shorter meetings, and clearer goals.', 'namely', ['whereas', 'nonetheless', 'moreover']],
          ['The roads were covered with ice. ___, the morning race was delayed.', 'Thus', ['Nonetheless', 'Namely', 'For example']],
          ['Older students preferred printed books, ___ younger students chose e-books.', 'whereas', ['thus', 'namely', 'moreover']],
        ];
        var it = R.pick(items);
        var correct = it[1];
        var pick = R.choices(correct, it[2]);
        return {
          type: 'choice', concept: 2,
          q: '빈칸에 가장 알맞은 담화 표지는 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            return c + ' 표현은 ' + MEAN[c] + '의 표지입니다. 앞뒤 내용의 관계와 맞지 않습니다.';
          }),
          explain: '앞뒤 내용의 관계는 ' + MEAN[correct] + '입니다. 그래서 **' + correct + '** 표현이 알맞습니다.\n\n' + it[0].replace('___', '**' + correct + '**'),
        };
      },
    },
    {
      id: 'imrad-section',
      level: 1,
      title: '논문 문장의 자리 찾기',
      make: function (R) {
        var SEC = { I: '서론', M: '방법', R: '결과', D: '논의' };
        var ROLE = {
          I: '서론은 배경·앞선 연구·연구 공백·연구 목적을 밝힙니다.',
          M: '방법은 참여자·재료·절차·분석을 과거 시제로 적습니다.',
          R: '결과는 측정한 수치와 차이를 해석 없이 보고합니다.',
          D: '논의는 결과를 해석하고 앞선 연구와 비교하며 한계와 후속 연구를 말합니다.',
        };
        var items = [
          ['Little research has looked at how noise affects reading in young children.', 'I'],
          ['The aim of this study was to find out whether music helps students focus.', 'I'],
          ['Previous studies have produced mixed results on this question.', 'I'],
          ['Participants were randomly assigned to one of two groups.', 'M'],
          ['Each student completed a 20-minute reading task in a quiet room.', 'M'],
          ['We collected water samples from five rivers in May.', 'M'],
          ['The average score of Group A was 78, compared with 71 for Group B.', 'R'],
          ['As shown in Table 2, sleep time fell during the exam period.', 'R'],
          ['Nearly half of the participants reported using their phones before bed.', 'R'],
          ['These findings suggest that short breaks may support memory.', 'D'],
          ['One limitation of this study is its small sample size.', 'D'],
          ['Future research should include students from other countries.', 'D'],
          ['Our results are consistent with those of earlier studies.', 'D'],
        ];
        var it = R.pick(items);
        var key = it[1];
        var correct = SEC[key];
        var others = ['I', 'M', 'R', 'D'].filter(function (k) { return k !== key; });
        var pick = R.choices(correct, others.map(function (k) { return SEC[k]; }));
        var byName = { '서론': 'I', '방법': 'M', '결과': 'R', '논의': 'D' };
        return {
          type: 'choice', concept: 1,
          q: '다음 문장은 연구 논문의 어느 부분에 들어갈 가능성이 가장 큽니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) {
            if (c === correct) return '';
            return ROLE[byName[c]] + ' 이 문장이 하는 일과 다릅니다.';
          }),
          explain: ROLE[key] + ' 이 문장은 그 일을 하므로 **' + correct + '** 부분에 들어갑니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'abstract', m: '초록(논문 요약); 추상적인', ex: 'Read the abstract first to see if the paper is useful.', exm: '논문이 쓸모 있는지 보려면 초록부터 읽으십시오.' },
    { w: 'thesis', m: '논지, 학위 논문', ex: 'The thesis of the essay appears at the end of the first paragraph.', exm: '그 글의 논지는 첫 문단 끝에 나옵니다.' },
    { w: 'method', m: '방법', ex: 'The method section explains how the data were collected.', exm: '방법 부분은 자료를 어떻게 모았는지 설명합니다.' },
    { w: 'participant', m: '참여자', ex: 'Each participant answered twenty questions.', exm: '각 참여자는 스무 개의 질문에 답했습니다.' },
    { w: 'findings', m: '(연구) 결과, 발견', ex: 'The findings were similar to those of earlier studies.', exm: '그 결과는 앞선 연구들의 결과와 비슷했습니다.' },
    { w: 'limitation', m: '한계', ex: 'The authors discuss two limitations of their study.', exm: '저자들은 자기 연구의 두 가지 한계를 논의합니다.' },
    { w: 'thus', m: '그래서, 따라서', ex: 'The road was closed; thus, we took the train.', exm: '길이 막혀서 우리는 기차를 탔습니다.' },
    { w: 'whereas', m: '~인 반면', ex: 'Some students study at night, whereas others study early in the morning.', exm: '어떤 학생은 밤에 공부하는 반면, 다른 학생은 이른 아침에 공부합니다.' },
    { w: 'moreover', m: '게다가, 더욱이', ex: 'The plan is cheap. Moreover, it is easy to carry out.', exm: '그 계획은 비용이 적게 듭니다. 게다가 실행하기도 쉽습니다.' },
    { w: 'namely', m: '즉, 다시 말해', ex: 'We need one thing, namely more time.', exm: '우리에게는 한 가지, 즉 더 많은 시간이 필요합니다.' },
    { w: 'nonetheless', m: '그럼에도 불구하고', ex: 'It was raining. Nonetheless, the game went on.', exm: '비가 오고 있었습니다. 그럼에도 경기는 계속되었습니다.' },
    { w: 'approach', m: '접근법, 방식; 다가가다', ex: 'This approach works well with large classes.', exm: '이 방식은 큰 학급에서 잘 통합니다.' },
    { w: 'paragraph', m: '문단', ex: 'Each paragraph should focus on one main idea.', exm: '각 문단은 하나의 중심 생각에 집중해야 합니다.' },
    { w: 'conclude', m: '결론을 내리다, 끝맺다', ex: 'The authors conclude that more research is needed.', exm: '저자들은 더 많은 연구가 필요하다고 결론짓습니다.' },
  ],
});
})();