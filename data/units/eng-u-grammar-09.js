/* 대학 영어: 문법과 독해 · 요약·바꿔 쓰기와 인용
 * 예문·지문·인용문은 모두 직접 쓴 글이다. 인용 예의 저자(Kim, Lee, Park, Han …)와 연도는 모두 가상의 출처다.
 * 영어 낱말 바로 뒤에는 조사를 붙이지 않는다(낱말 뒤에 '낱말·꼴·문장·표현' 같은 우리말을 둔다). */
(function () {
  // 요약 연습용 짧은 글 (직접 쓴 글)
  var TREES = 'Urban trees do more than make streets look pleasant. In summer, their shade can lower the temperature of nearby sidewalks by several degrees, which reduces the need for air conditioning. Their leaves also trap dust from cars and factories. In addition, several surveys have found that people who live near tree-lined streets report less stress. For these reasons, cities should treat trees as part of their basic infrastructure, just like roads and water pipes.';

Tutor.registerUnit({
  id: 'eng-u-grammar-09',
  course: 'eng-u-grammar',
  title: '요약·바꿔 쓰기와 인용',
  summary: '원문의 뜻을 살려 내 말로 바꿔 쓰고 요약하며, 인용과 출처 표시로 표절을 피하는 법을 익힙니다.',
  goals: [
    '동의어·품사 전환·능동과 수동 전환으로 원문의 뜻을 살려 바꿔 쓸 수 있다.',
    '핵심 찾기 → 묶기 → 다시 쓰기의 단계로 학술 글을 짧게 요약할 수 있다.',
    '직접 인용과 간접 인용을 구별하고 argue, claim, suggest, note 같은 보고 동사를 뉘앙스에 맞게 고를 수 있다.',
    '바꿔 쓰거나 요약한 내용에도 출처를 밝혀 표절을 피할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '바꿔 쓰기의 원칙과 동의어',
      body: '**바꿔 쓰기(paraphrase)**는 원문의 **뜻은 그대로** 두고 **낱말과 문장 구조를 내 것으로** 바꾸는 일입니다. 길이는 원문과 비슷합니다(훨씬 짧게 줄이는 것은 요약입니다).\n\n' +
        '가장 먼저 쓰는 도구는 **동의어**입니다.\n\n' +
        '| 원문의 낱말 | 바꿔 쓸 수 있는 말 |\n|---|---|\n' +
        '| increase | rise, grow |\n' +
        '| show | indicate, reveal |\n' +
        '| about (수치 앞) | approximately, roughly |\n' +
        '| many | a large number of, numerous |\n' +
        '| because of | due to, as a result of |\n\n' +
        '바꿔 쓸 때 지킬 점은 다음과 같습니다.\n\n' +
        '- 동의어도 뜻과 쓰임이 완전히 같지는 않습니다. 예를 들어 significant 낱말은 통계 글에서 "통계적으로 유의한"이라는 특별한 뜻이 있어서, important 대신 함부로 쓰면 뜻이 달라질 수 있습니다.\n' +
        '- **전문 용어·고유명사·수치**는 바꾸지 않습니다(photosynthesis, 2.5 percent 등).\n' +
        '- 주장의 **강도**(may, always, some)를 그대로 지킵니다.\n\n' +
        '> ⚠️ 낱말 몇 개만 동의어로 바꾸고 문장 구조를 그대로 두는 것은 바꿔 쓰기가 아니라 **짜깁기(patchwriting)**이며, 출처를 밝혀도 표절로 볼 수 있습니다. 다음 카드의 구조 바꾸기를 함께 써야 합니다.',
      easy: '바꿔 쓰기는 **사람은 그대로 두고 옷만 갈아입히는 일**과 같습니다. 사람(뜻)이 바뀌면 안 되고, 옷(낱말과 문장 모양)은 확실히 달라져야 합니다.\n\n' +
        '셔츠 단추 몇 개만 바꿔 단 것을 "새 옷"이라고 하지 않듯이, 낱말 한두 개만 바꾼 문장은 여전히 남의 문장입니다. 반대로 옷을 갈아입히다가 사람이 바뀌어 버리면(뜻이 달라지면) 그것도 잘못된 바꿔 쓰기입니다.',
      check: {
        type: 'choice',
        q: '다음 원문을 가장 알맞게 바꿔 쓴 문장은 무엇입니까?\n\n원문: The new policy reduced traffic accidents in the city center.',
        choices: [
          'The new policy reduced traffic crashes in the city center.',
          'Thanks to the new policy, the city center had fewer traffic accidents.',
          'The new policy reduced the overall amount of car traffic in the city center.',
        ],
        answer: 1,
        why: [
          '낱말 하나(accidents → crashes)만 바꾸고 문장 구조를 그대로 두었습니다. 짜깁기입니다.',
          '',
          '뜻이 달라졌습니다. 원문은 교통사고가 줄었다는 것이지 교통량이 줄었다는 것이 아닙니다.',
        ],
        explain: '바꿔 쓰기는 뜻은 같고 표현은 달라야 합니다. Thanks to the new policy, the city center had fewer traffic accidents. 문장은 "정책 덕분에 사고가 줄었다"는 원문의 뜻(원인과 결과)을 지키면서 주어와 구조를 바꾸었습니다.',
      },
    },
    {
      title: '구조 바꾸기: 품사 전환과 능동·수동 전환',
      body: '좋은 바꿔 쓰기는 낱말만이 아니라 **문장의 뼈대**를 바꿉니다. 자주 쓰는 방법은 세 가지입니다.\n\n' +
        '**1. 품사 전환** — 동사·형용사를 명사로(또는 거꾸로) 바꿉니다. 4단원에서 배운 명사화가 바로 이 도구입니다.\n\n' +
        '| 원문 | 바꿔 쓴 문장 |\n|---|---|\n' +
        '| The number of tourists **increased** sharply. | There was a sharp **increase** in the number of tourists. |\n' +
        '| The team **decided** to delay the test. | The team made a **decision** to delay the test. |\n' +
        '| Clean water is not always **available**. | The **availability** of clean water is limited. |\n\n' +
        '**2. 능동 ↔ 수동 전환** — 행위자 대신 대상에 초점을 맞추거나, 그 반대로 합니다(2단원).\n\n' +
        '- The committee **approved** the plan. → The plan **was approved** by the committee.\n' +
        '- 행위자가 중요하지 않으면 by 이하를 생략할 수 있습니다: The samples were stored at room temperature.\n\n' +
        '**3. 절 ↔ 구 전환** — Because prices rose, … → **Because of the rise in prices**, …\n\n' +
        '> ⚠️ 구조를 바꿔도 **시제·수치·주장의 강도**는 그대로여야 합니다. 수동태로 바꿀 때 시제(was / is / has been)와 수 일치(was / were)를 확인하십시오.',
      easy: '같은 집을 앞에서 찍은 사진과 옆에서 찍은 사진을 떠올려 보십시오. 집(뜻)은 같지만 사진(문장)은 전혀 달라 보입니다.\n\n' +
        '"관광객이 크게 **늘었다**"를 "관광객 수에 큰 **증가**가 있었다"로, "위원회가 계획을 **승인했다**"를 "계획이 위원회에 의해 **승인되었다**"로 바꾸는 것은 카메라 위치를 옮기는 일입니다. 찍히는 집은 바뀌지 않습니다.',
      check: {
        type: 'short', check: 'text',
        q: 'expand 낱말의 명사형으로 빈칸을 채워 바꿔 쓰십시오.\n\n원문: The company expanded rapidly last year.\n바꿔 쓴 문장: There was a rapid ___ of the company last year.',
        answer: ['expansion'],
        wrong: [
          { a: 'expand', why: 'expand 꼴은 동사입니다. a rapid ___ 자리(관사 + 형용사 뒤)에는 명사가 와야 합니다.' },
          { a: 'expanding', why: '-ing 꼴은 a rapid 뒤의 명사 자리에 어울리지 않습니다. expand 동사의 명사형은 expansion 꼴입니다.' },
        ],
        explain: '동사 expand(확장하다)의 명사형은 **expansion**(확장)입니다. 동사 expanded 꼴을 명사로 바꾸고, 부사 rapidly 꼴은 형용사 rapid 꼴로 바꾸어 There was a rapid expansion of the company last year. 문장이 됩니다.',
      },
    },
    {
      title: '요약문 쓰는 단계: 핵심 찾기 → 묶기 → 다시 쓰기',
      body: '**요약(summary)**은 원문의 **중심 생각만** 골라 원문보다 훨씬 짧게 내 말로 쓰는 것입니다. 한 문단이면 대개 한두 문장으로 줄입니다.\n\n' +
        '1. **핵심 찾기** — 주제문, 글쓴이의 주장(결론), 주요 근거에 표시합니다. 예시·세부 수치·되풀이·곁가지 이야기는 뺍니다.\n' +
        '2. **묶기** — 비슷한 내용을 하나로 묶어 **더 넓은 말(상위어)**로 부릅니다. 예: buses, subways, and trains → public transportation\n' +
        '3. **다시 쓰기** — 원문을 덮고 내 말로 씁니다. 그다음 원문과 대조해 ① 뜻이 같은지 ② 빠진 핵심이 없는지 ③ 내 의견이 섞이지 않았는지 확인하고, 출처를 밝힙니다.\n\n' +
        '| 남기는 것 | 빼는 것 |\n|---|---|\n' +
        '| 글쓴이의 주장, 주요 근거, 결론 | 예시, 세부 수치, 되풀이, 인용된 일화 |\n\n' +
        '> ⚠️ 요약에는 **내 의견·평가를 넣지 않습니다.** "The author rightly argues …"의 rightly 같은 말도 내 평가입니다. 평가는 요약과 따로 씁니다(10단원 비판적으로 읽기).',
      easy: '영화를 보고 온 친구에게 "어땠어? 30초로 말해 줘."라고 했을 때를 생각해 보십시오. 장면 하나하나를 말하지 않고 "누가, 무엇 때문에, 어떻게 되었다"는 **뼈대**만 말합니다.\n\n' +
        '장보기 목록에 사과, 배, 포도가 있으면 "과일"이라고 한 번에 부르는 것이 **묶기**입니다. 요약은 뼈대를 찾고, 비슷한 것을 묶어, 내 말로 짧게 말하는 일입니다.',
      check: {
        type: 'ox',
        q: '요약문에는 원문의 예시와 세부 수치를 되도록 많이 남겨야 한다.',
        answer: false,
        explain: '요약은 **중심 생각만** 남기는 글입니다. 예시와 세부 수치는 빼고, 글쓴이의 주장과 주요 근거를 상위어로 묶어 짧게 씁니다.',
      },
    },
    {
      title: '직접 인용과 간접 인용',
      body: '**직접 인용(direct quotation)**은 원문을 **한 글자도 바꾸지 않고** 따옴표 안에 옮기는 것입니다. 학술 글에서는 쪽수까지 밝힙니다.\n\n' +
        '- Kim (2019) states, "Short breaks can restore attention during long tasks" (p. 24).\n\n' +
        '직접 인용은 표현 자체가 중요할 때(정의, 독특한 표현, 반박하려는 문장)에만 아껴 씁니다.\n\n' +
        '**간접 인용(indirect quotation)**은 따옴표 없이 that 절 등으로 **내 문장 속에 넣어** 전하는 것입니다.\n\n' +
        '- Kim (2019) states that short breaks can restore attention during long tasks.\n\n' +
        '간접 인용으로 바꿀 때 달라지는 것은 다음과 같습니다.\n\n' +
        '| 무엇이 | 직접 인용 | 간접 인용 |\n|---|---|---|\n' +
        '| 대명사 | The authors wrote, "**We** found no difference." | The authors wrote that **they** had found no difference. |\n' +
        '| 시간 표현 | "… **next year**." | … **the following year**. |\n' +
        '| 시제 (보고 동사가 과거일 때) | "We **will** repeat the test." | … that they **would** repeat the test. |\n\n' +
        '보고 동사를 현재형으로 쓰면(Kim states that ~) 시제를 바꾸지 않습니다. 과거형으로 쓰면(Kim stated that ~) 원칙적으로 시제를 한 단계 과거로 옮기지만, 지금도 참인 일반적 사실은 현재형을 그대로 두기도 합니다.\n\n' +
        '> 💡 직접 인용에서 중간을 뺄 때는 줄임표(…), 내가 말을 보탤 때는 대괄호 [ ]를 써서 원문과 구별합니다.',
      easy: '집에 온 동생에게 엄마 말을 전하는 두 방법을 떠올려 보십시오.\n\n' +
        '- "엄마가 **\'저녁 7시까지 와.\'**라고 하셨어." — 엄마 말을 그대로 옮겼습니다. 직접 인용입니다.\n' +
        '- "엄마가 저녁 7시까지 **오라고** 하셨어." — 내 말 속에 녹여 전했습니다. 간접 인용입니다.\n\n' +
        '간접 인용에서 "와"가 "오라고"로 바뀌듯이, 영어도 we 낱말이 they 꼴로, will 꼴이 would 꼴로 바뀝니다. 말하는 사람이 바뀌었기 때문입니다.',
      check: {
        type: 'choice',
        q: '다음 직접 인용을 간접 인용으로 바르게 바꾼 것은 무엇입니까?\n\nThe researchers wrote, "We collected the samples in spring."',
        choices: [
          'The researchers wrote that "we collected the samples in spring."',
          'The researchers wrote that they had collected the samples in spring.',
          'The researchers wrote that we had collected the samples in the spring.',
        ],
        answer: 1,
        why: [
          '간접 인용인데 따옴표와 we 낱말을 그대로 두었습니다. 직접 인용과 간접 인용이 섞였습니다.',
          '',
          '대명사를 바꾸지 않았습니다. 원문의 we 낱말은 연구자들이므로 간접 인용에서는 they 꼴이 됩니다.',
        ],
        explain: '따옴표를 없애고 that 절로 바꾸면서, 연구자들 자신을 가리키는 we 낱말을 **they** 꼴로 바꿉니다. 보고 동사 wrote 꼴이 과거이므로 collected 꼴을 **had collected** 꼴로 옮기는 것이 원칙입니다(순서가 분명하면 collected 꼴을 그대로 두기도 합니다).',
      },
    },
    {
      title: '보고 동사의 뉘앙스: argue, claim, suggest, note',
      body: '남의 생각을 전할 때 고르는 **보고 동사(reporting verb)**에는 **그 출처를 내가 어떻게 보는지**가 담깁니다. 같은 내용도 어떤 동사로 전하느냐에 따라 독자가 받는 인상이 달라집니다.\n\n' +
        '| 보고 동사 | 뜻 | 뉘앙스 | 예 |\n|---|---|---|---|\n' +
        '| argue | 근거를 들어 주장하다 | 논쟁이 있는 문제에서 이유를 들어 한쪽 입장을 펼친다. 대체로 중립 | Han (2020) **argues** that school should start later. |\n' +
        '| claim | (사실이라고) 주장하다 | 근거가 충분한지 의심의 여지를 남긴다. 글쓴이가 **거리를 둘 때** 자주 쓴다 | The advertisement **claims** that the drink improves memory. |\n' +
        '| suggest | 시사하다, 조심스럽게 제안하다 | 확정이 아니라 **가능성**을 가리킨다. 약한 주장 | The survey **suggests** that readers may prefer audiobooks. |\n' +
        '| note | 언급하다, 지적하다 | 사실이나 관찰을 **덧붙여 말할 때**. 중립 | Lee (2021) **notes** that the sample was small. |\n\n' +
        '이 밖에 show, demonstrate 동사는 "보여 주다, 입증하다"라는 뜻으로, 글쓴이가 그 내용을 **사실로 받아들인다**는 신호입니다.\n\n' +
        '> 💡 확신의 세기: suggest(가능성) < argue(근거 있는 입장) < show·demonstrate(사실로 인정). claim 동사는 세기보다 **거리 두기**의 신호로 읽으십시오.\n\n' +
        '> ⚠️ 결과·자료(results, data, findings)가 주어일 때는 claim, argue 동사보다 suggest, show, indicate 동사가 자연스럽습니다. 결과는 스스로 무엇을 주장하지 않고 무엇을 가리킬 뿐이기 때문입니다: The results **suggest** that … (광고·웹사이트처럼 누군가의 말을 담은 글은 claim 동사의 주어가 될 수 있습니다.)',
      easy: '친구가 한 말을 다른 친구에게 전한다고 해 봅시다.\n\n' +
        '- "민수가 이유를 대면서 그렇게 **주장하더라**." → argue\n' +
        '- "민수가 그렇다고 **우기던데**, 난 잘 모르겠어." → claim\n' +
        '- "민수가 혹시 그럴 수도 있다고 **하더라**." → suggest\n' +
        '- "민수가 참고로 그 얘기도 **하더라**." → note\n\n' +
        '같은 말을 전해도 고르는 동사에 따라 듣는 사람은 내가 그 말을 믿는지, 얼마나 확실한지 알아챕니다.',
      check: {
        type: 'choice',
        q: '빈칸에 가장 알맞은 보고 동사는 무엇입니까?\n\nThe results ___ that the new reading program may help slower readers.',
        choices: ['demonstrate', 'claim', 'suggest'],
        answer: 2,
        why: [
          'demonstrate 동사는 "입증한다"는 뜻으로 너무 강합니다. 뒤의 may 표현(~일 수도 있다)과 어울리지 않습니다.',
          '결과(results)는 무엇을 "주장"하는 주체가 아니라 무엇을 가리킬 뿐이어서 claim 동사가 어색합니다. 또 claim 동사는 의심하며 거리를 두는 느낌을 주는데, 이 문장에는 그런 태도가 없습니다.',
          '',
        ],
        explain: '결과가 어떤 **가능성**을 조심스럽게 가리킬 때는 **suggest** 동사를 씁니다. 뒤 절의 may 표현과도 확신의 정도가 잘 맞습니다.',
      },
    },
    {
      title: '표절을 피하는 출처 표시',
      body: '**표절(plagiarism)**은 남의 생각·문장·자료를 출처 없이 내 것처럼 쓰는 것입니다. 직접 인용뿐 아니라 **바꿔 쓰거나 요약한 내용에도 출처를 밝혀야** 합니다. 표현은 내 것이어도 생각은 남의 것이기 때문입니다.\n\n' +
        '| 출처를 밝혀야 하는 것 | 출처가 필요 없는 것 |\n|---|---|\n' +
        '| 직접 인용, 바꿔 쓰기, 요약 | 널리 알려진 상식 (예: 물은 해수면 높이에서 섭씨 100도에 끓는다) |\n' +
        '| 남의 자료·수치·표·그림 | 내 생각, 내가 직접 한 실험·조사 결과 |\n' +
        '| 남이 처음 내놓은 독특한 생각 | |\n\n' +
        '**본문 속 출처 표시(in-text citation)**는 양식마다 다르지만, 사회과학에서 널리 쓰는 APA 양식은 저자와 연도를 씁니다.\n\n' +
        '- 서술형: **Kim (2019)** argues that …\n' +
        '- 괄호형: … can restore attention **(Kim, 2019)**.\n' +
        '- 직접 인용은 쪽수까지: **(Kim, 2019, p. 24)**\n\n' +
        '그리고 글 끝의 **참고문헌 목록(references)**에 출처의 전체 정보를 적습니다. 전공·학술지마다 요구하는 양식(APA, MLA, Chicago 등)이 다르므로 먼저 확인합니다.\n\n' +
        '> ⚠️ 출처를 밝혀도 원문 문장을 따옴표 없이 그대로 옮기면 표절입니다. 그대로 쓸 거면 따옴표(직접 인용), 아니면 진짜 내 말로(바꿔 쓰기) — 둘 중 하나입니다.',
      easy: '친구에게 맛있는 찌개 끓이는 법을 알려 줄 때 "이건 할머니께 배운 방법이야."라고 덧붙이면, 그 요리법을 처음 생각해 낸 사람이 누구인지 분명해집니다. 내가 순서를 내 말로 바꿔 설명했더라도 요리법 자체는 할머니의 것이니까요.\n\n' +
        '출처 표시도 같습니다. 문장을 내 말로 바꿨어도 **생각의 주인**은 그대로이므로 이름(저자)과 때(연도)를 밝힙니다.',
      check: {
        type: 'ox',
        q: '원문을 내 말로 완전히 바꿔 썼다면 출처를 밝히지 않아도 된다.',
        answer: false,
        explain: '바꿔 쓰기는 표현만 내 것이고 **생각은 원저자의 것**입니다. 그래서 바꿔 쓰기와 요약에도 반드시 출처를 밝힙니다. 출처가 필요 없는 것은 널리 알려진 상식과 내 생각·내 조사 결과뿐입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 원문을 바꿔 쓰고 출처를 밝혀 보십시오. (원문의 출처: Han, 2022 — 가상의 자료)\n\n원문: Many cities have built bike lanes because they want to reduce air pollution.',
      steps: [
        '뜻 확인하기: "공기 오염을 줄이려고 많은 도시가 자전거 도로를 만들었다." 원인(오염을 줄이려는 목적)과 결과(자전거 도로)가 핵심입니다.',
        '동의어 바꾸기: many → a large number of, built → constructed, reduce → cut. many 표현의 "많다"는 강도를 지키려고 a number of(몇몇) 대신 a large number of 표현을 씁니다. air pollution 표현은 굳어진 용어이므로 그대로 둡니다.',
        '구조 바꾸기: because 절(이유)을 문장 앞의 to 부정사(목적)로 바꿉니다: To cut air pollution, …',
        '출처 밝히기: 바꿔 쓴 내용도 원저자의 생각이므로 문장 끝에 (Han, 2022) 표시를 붙입니다.',
      ],
      answer: 'To cut air pollution, a large number of cities have constructed bike lanes (Han, 2022).',
    },
    {
      q: '다음 글을 한 문장으로 요약해 보십시오.\n\n' + TREES,
      steps: [
        '핵심 찾기: 글쓴이의 주장은 마지막 문장입니다 — cities should treat trees as part of their basic infrastructure. 근거는 그늘(기온을 낮춤), 먼지를 붙잡음, 스트레스 감소 세 가지입니다.',
        '빼기: several degrees 같은 세부 수치, air conditioning 이야기, just like roads and water pipes 같은 비유는 뺍니다.',
        '묶기: 세 근거를 "거리를 시원하게 하고(cool), 공기를 깨끗하게 하고(clean), 스트레스를 줄인다(reduce stress)"로 짧게 묶습니다.',
        '다시 쓰기: 원문을 덮고 주장 + 근거의 순서로 한 문장에 담고, 내 의견(예: 좋은 생각이다)은 넣지 않습니다.',
      ],
      answer: 'The author argues that because urban trees cool streets, clean the air, and reduce stress, cities should regard them as essential infrastructure.',
    },
  ],

  terms: [
    { term: '바꿔 쓰기 (paraphrase)', def: '원문의 뜻은 그대로 두고 낱말과 문장 구조를 내 것으로 바꾸어 쓰는 것입니다. 길이는 원문과 비슷하며 출처를 밝힙니다.' },
    { term: '요약 (summary)', def: '원문의 중심 생각(주장과 주요 근거)만 골라 훨씬 짧게 내 말로 쓰는 것입니다. 예시·세부 수치·내 의견은 넣지 않습니다.' },
    { term: '짜깁기 (patchwriting)', def: '원문의 문장 구조를 그대로 두고 낱말 몇 개만 바꾼 글입니다. 출처를 밝혀도 표절로 볼 수 있습니다.' },
    { term: '직접 인용', def: '원문을 바꾸지 않고 따옴표 안에 그대로 옮기는 것입니다. 학술 글에서는 쪽수까지 밝힙니다. 예: (Kim, 2019, p. 24)' },
    { term: '간접 인용', def: '따옴표 없이 that 절 등으로 남의 말을 내 문장에 넣어 전하는 것입니다. 대명사·시간 표현·시제가 바뀔 수 있습니다.' },
    { term: '보고 동사 (reporting verb)', def: '남의 말이나 생각을 전할 때 쓰는 동사입니다. 예: argue, claim, suggest, note, state, show. 고르는 동사에 따라 출처를 보는 내 태도가 드러납니다.' },
    { term: '표절 (plagiarism)', def: '남의 생각·문장·자료를 출처 없이 내 것처럼 쓰는 것입니다. 바꿔 쓰거나 요약한 내용도 출처를 밝히지 않으면 표절입니다.' },
    { term: '본문 속 출처 표시 (in-text citation)', def: '글 본문에서 인용한 곳 바로 옆에 저자·연도(필요하면 쪽수)를 밝히는 것입니다. 예: Kim (2019) argues … / … (Kim, 2019).' },
    { term: '상식 (common knowledge)', def: '많은 사람이 이미 알고 쉽게 확인할 수 있는 사실입니다. 보통 출처를 달지 않습니다. 예: 서울은 대한민국의 수도이다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '굵게 표시한 낱말과 바꿔 써도 뜻이 거의 같은 것은 무엇입니까?\n\nThe number of visitors **rose** last year.',
      choices: ['increased', 'raised', 'fell', 'stayed the same'],
      answer: 0,
      why: [
        '',
        'raise 동사는 "~을 올리다"라는 뜻으로 목적어가 필요합니다. 스스로 오르는 것은 rise, increase 동사입니다.',
        'fall 동사는 "떨어지다"로 반대 뜻입니다.',
        'stay the same 표현은 "그대로이다"라는 뜻으로 변화가 없음을 말합니다.',
      ],
      explain: 'rise 동사는 "오르다, 늘다"입니다. 목적어 없이 스스로 늘어나는 뜻으로 바꿔 쓸 수 있는 말은 **increased** 꼴입니다: The number of visitors increased last year.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 1,
      q: 'decide 낱말의 명사형으로 빈칸을 채우십시오.\n\n원문: The committee decided the matter on Monday.\n바꿔 쓴 문장: The committee made a final ___ on Monday.',
      answer: ['decision'],
      wrong: [
        { a: 'decide', why: 'decide 꼴은 동사입니다. a final 뒤 명사 자리에는 명사형을 씁니다.' },
        { a: 'decisions', why: '앞에 관사 a 낱말이 있으므로 단수 명사가 와야 합니다.' },
      ],
      explain: 'decide(결정하다)의 명사형은 **decision**(결정)입니다. make a decision 꼴은 "결정을 내리다"라는 뜻으로 자주 쓰는 짝 표현입니다.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'text', concept: 1,
      q: '수동태로 바꿔 쓰십시오. 빈칸에 들어갈 두 낱말을 쓰십시오.\n\n원문: The city council approved the new budget.\n바꿔 쓴 문장: The new budget ___ by the city council.',
      answer: ['was approved'],
      wrong: [
        { a: 'approved', why: 'be동사가 빠졌습니다. 수동태는 be + 과거분사 꼴입니다.' },
        { a: 'is approved', why: '원문은 과거(approved)입니다. 바꿔 써도 시제는 그대로 과거여야 합니다.' },
        { a: 'were approved', why: '주어 the new budget 쪽이 단수이므로 was 꼴을 씁니다.' },
        { a: 'has been approved', why: '원문의 과거 시제를 현재완료로 바꾸었습니다. 바꿔 쓰기에서는 시제를 그대로 지킵니다.' },
      ],
      explain: '능동태의 목적어 the new budget 부분이 주어가 되고, 동사는 be + 과거분사가 됩니다. 원문이 과거이고 주어가 단수이므로 **was approved** 꼴입니다.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 2,
      q: '요약할 때는 글쓴이의 주장과 주요 근거는 남기고, 예시와 되풀이되는 내용은 뺀다.',
      answer: true,
      explain: '요약의 첫 단계(핵심 찾기)에서 주장·주요 근거·결론을 고르고 예시·세부 수치·되풀이는 뺍니다. 남긴 근거는 상위어로 묶어 짧게 다시 씁니다.',
    },
    {
      id: 'p5', level: 1, type: 'order', concept: 2,
      q: '요약문을 쓰는 순서대로 늘어놓으십시오.',
      choices: ['주장과 주요 근거에 표시하기', '비슷한 근거를 상위어로 묶기', '원문을 덮고 내 말로 쓰기', '원문과 대조하고 출처 밝히기'],
      answer: [0, 1, 2, 3],
      explain: '요약은 **핵심 찾기 → 묶기 → 다시 쓰기**의 순서로 씁니다. 다 쓴 뒤에는 원문과 대조해 뜻이 같은지, 빠진 핵심이나 섞인 내 의견이 없는지 확인하고 출처를 밝힙니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '다음 가운데 **직접 인용**은 무엇입니까?',
      choices: [
        'Lee (2020) notes that online classes save travel time.',
        'Lee (2020) writes, "Online classes save students a great deal of travel time" (p. 8).',
        'According to Lee (2020), online classes can save students a considerable amount of time spent on travel.',
        'Online classes save travel time, which many students appreciate.',
      ],
      answer: 1,
      why: [
        '따옴표 없이 that 절로 전했으므로 간접 인용입니다.',
        '',
        '출처는 밝혔지만 따옴표가 없는 바꿔 쓰기(간접 인용)입니다.',
        '출처도 따옴표도 없습니다. 남의 생각이라면 출처를 밝혀야 합니다.',
      ],
      explain: '원문을 그대로 **따옴표 안에** 옮기고 쪽수(p. 8)까지 밝힌 Lee (2020) writes, "…" (p. 8). 문장이 직접 인용입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '글쓴이가 그 말을 **그대로 믿지 않는다**는 느낌을 주려면 빈칸에 어느 동사가 가장 알맞습니까?\n\nThe advertisement ___ that the drink improves concentration within minutes.',
      choices: ['shows', 'notes', 'claims', 'suggests'],
      answer: 2,
      why: [
        'shows 동사는 글쓴이가 그 내용을 사실로 받아들인다는 신호입니다.',
        'notes 동사는 사실을 덧붙여 말할 때 쓰는 중립적인 동사입니다.',
        '',
        'suggests 동사는 가능성을 조심스럽게 가리킬 뿐, 의심하는 느낌은 없습니다.',
      ],
      explain: '**claims** 동사는 "(사실이라고) 주장한다"는 뜻으로, 근거가 충분한지 의심의 여지를 남깁니다. 광고의 과장된 말에 거리를 두기에 알맞습니다.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 5,
      q: '"물은 해수면 높이에서 섭씨 100도에 끓는다."처럼 널리 알려진 상식에는 출처를 달지 않아도 된다.',
      answer: true,
      explain: '많은 사람이 이미 알고 쉽게 확인할 수 있는 **상식**에는 출처를 달지 않습니다. 하지만 특정 연구의 수치나 남이 처음 내놓은 생각은 상식이 아니므로 출처를 밝힙니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      q: '다음 글의 요약으로 가장 알맞은 것은 무엇입니까?\n\n' + TREES,
      choices: [
        'Trees can lower sidewalk temperatures by several degrees in summer.',
        'The author argues that cities should treat trees as basic infrastructure because they cool streets, clean the air, and reduce stress.',
        'Urban trees are pleasant, but cities should spend money on roads and water pipes first.',
        'The author argues that planting trees is the most effective way to end air pollution, so cities should stop using air conditioning altogether.',
      ],
      answer: 1,
      why: [
        '세부 근거 하나만 옮겼습니다. 글쓴이의 주장과 다른 근거가 빠졌습니다.',
        '',
        '글쓴이의 주장을 뒤집었습니다. 도로·수도관은 나무를 그만큼 중요하게 보자는 비유로 나왔습니다.',
        '원문에 없는 과장(가장 효과적, 에어컨을 아예 끊자)을 넣었습니다. 요약은 원문의 뜻을 바꾸면 안 됩니다.',
      ],
      hint: '마지막 문장의 주장과, 그 앞의 근거 세 가지를 모두 담은 문장을 찾으십시오.',
      explain: '핵심은 마지막 문장의 주장(나무를 기반 시설로 대하자)과 근거 셋(그늘로 시원하게, 먼지를 붙잡아 공기를 깨끗하게, 스트레스 감소)입니다. 이 둘을 모두 담고 세부 수치를 뺀 문장이 알맞은 요약입니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 3,
      q: '간접 인용으로 바꿀 때 빈칸에 알맞은 조동사를 쓰십시오.\n\n직접 인용: The authors wrote, "We will repeat the test next year."\n간접 인용: The authors wrote that they ___ repeat the test the following year.',
      answer: ['would'],
      wrong: [
        { a: 'will', why: '보고 동사 wrote 꼴이 과거이고 next year 표현도 the following year 꼴로 옮겼습니다. 시제를 한 단계 과거로 옮겨 would 꼴을 씁니다.' },
        { a: 'shall', why: 'shall 꼴은 will 꼴과 같은 현재 시제입니다. 과거 보고 동사 뒤에서는 would 꼴로 옮깁니다.' },
      ],
      hint: '보고 동사 wrote 꼴의 시제를 보십시오.',
      explain: '보고 동사가 과거(wrote)이므로 간접 인용의 시제를 한 단계 과거로 옮깁니다. will → **would**, we → they, next year → the following year가 함께 바뀝니다.',
    },
    {
      id: 'p11', level: 2, type: 'order', concept: 4,
      q: '다음 뜻에 맞게 간접 인용 문장으로 늘어놓으십시오.\n\n(출처 Park, 2021의 주장: 학교 수업 시간을 줄이면 학생들의 집중력이 좋아질 수 있다.)',
      choices: ['Park (2021)', 'argues that', 'shorter school days', 'may improve', 'students\' concentration.'],
      answer: [0, 1, 2, 3, 4],
      hint: '서술형 출처 표시는 저자 (연도) + 보고 동사 + that 절의 순서입니다.',
      explain: '서술형 출처 표시는 **저자 (연도) + 보고 동사 + that 절** 순서입니다: Park (2021) argues that shorter school days may improve students\' concentration. 원문의 조심스러운 강도(~할 수 있다)를 may 꼴로 지켰습니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '다음 원문(출처: Cho, 2018, p. 5 — 가상의 자료)을 활용한 학생 글 가운데 **표절**에 해당하는 것은 무엇입니까?\n\n원문: Teenagers who sleep less than seven hours tend to have more difficulty concentrating in class.',
      choices: [
        'Cho (2018) found that getting fewer than seven hours of sleep often makes it harder for teenagers to focus in class.',
        'Teenagers who sleep less than seven hours tend to have more difficulty concentrating in class.',
        'According to Cho (2018), "teenagers who sleep less than seven hours tend to have more difficulty concentrating in class" (p. 5).',
        'Concentrating in class tends to be harder for teens who get under seven hours of sleep (Cho, 2018).',
      ],
      answer: 1,
      why: [
        '문장 구조를 바꿔(동명사 주어 + makes it harder) 내 말로 쓰고 출처(Cho, 2018)를 밝혔으므로 표절이 아닙니다.',
        '',
        '원문을 따옴표 안에 옮기고 쪽수까지 밝힌 바른 직접 인용입니다.',
        '주어를 바꾸는 등 구조까지 바꿔 내 말로 쓰고 괄호형 출처 표시를 붙였으므로 표절이 아닙니다.',
      ],
      explain: '원문 문장을 **따옴표도 출처도 없이** 그대로 옮긴 글이 표절입니다. 그대로 쓰려면 따옴표와 출처·쪽수를 붙이고(직접 인용), 아니면 내 말로 바꾸고 출처를 밝혀야 합니다(바꿔 쓰기).',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 원문을 가장 알맞게 바꿔 쓴 것은 무엇입니까?\n\n원문: The findings suggest that reducing screen time before bed may improve sleep quality in teenagers.',
      choices: [
        'The findings prove that teenagers will sleep better if they stop using screens before bed.',
        'According to the findings, teenagers might sleep better if they spend less time on screens before bed.',
        'The findings suggest that reducing screen time before bed may improve sleep quality among teenagers.',
        'The findings suggest that teenagers who sleep well tend to spend less time in front of screens in the evening before going to bed.',
      ],
      answer: 1,
      why: [
        '주장의 강도를 바꾸었습니다. 원문은 suggest·may 표현으로 조심스럽게 말했는데 prove·will 표현은 확정입니다.',
        '',
        'in → among 한 곳만 바꾼 짜깁기입니다. 구조가 원문과 같습니다.',
        '원인과 결과를 뒤집었습니다. 원문은 화면 시간을 줄이는 것이 잠을 좋게 할 수 있다는 것입니다.',
      ],
      hint: '뜻(원인 → 결과의 방향)과 강도(suggest, may)를 지키면서 구조를 바꾼 문장을 찾으십시오.',
      explain: 'According to the findings 부분이 suggest 동사를, might 꼴이 may 꼴의 조심스러운 강도를 대신하고, "화면 시간을 줄이면 → 잠이 좋아질 수 있다"는 방향도 지켰습니다. 구조도 원문과 다르므로 알맞은 바꿔 쓰기입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '글쓴이의 태도에 가장 알맞은 보고 동사는 무엇입니까?\n\nKang (2020) ___ that a four-day work week raises productivity. However, her data came from only two small companies, so this conclusion should be treated with caution.',
      choices: ['demonstrates', 'claims', 'shows', 'establishes'],
      answer: 1,
      why: [
        'demonstrates 동사는 "입증한다"는 뜻으로 글쓴이가 그 내용을 사실로 받아들인다는 신호입니다. 뒤 문장의 의심과 어긋납니다.',
        '',
        'shows 동사도 글쓴이가 그 내용을 사실로 인정할 때 씁니다. 뒤 문장에서 결론을 조심하라고 했으므로 맞지 않습니다.',
        'establishes 동사는 "확립한다, 증명한다"로 매우 강합니다. 표본이 작다고 비판하는 글쓴이의 태도와 반대입니다.',
      ],
      hint: '두 번째 문장에서 글쓴이는 Kang 연구의 결론을 어떻게 평가합니까?',
      explain: '두 번째 문장에서 글쓴이는 자료가 작은 회사 두 곳뿐이라며 결론을 조심하라고 합니다. 그 주장에 **거리를 두는** 보고 동사 **claims** 꼴이 알맞습니다. 나머지는 모두 글쓴이가 내용을 사실로 인정할 때 쓰는 동사입니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 1,
      q: '이유를 나타내는 절을 구로 바꿔 쓰려 합니다. 원문의 동사 rose 꼴(rise 동사의 과거형)을 명사로 바꾸어 빈칸에 한 낱말을 쓰십시오.\n\n원문: Because prices rose sharply, many families reduced their spending.\n바꿔 쓴 문장: Because of the sharp ___ in prices, many families reduced their spending.',
      answer: ['rise'],
      wrong: [
        { a: 'rising', why: 'the sharp ___ in prices 자리에는 rise 동사의 명사형 rise 꼴을 씁니다. -ing 꼴은 이 자리에서 어색합니다.' },
        { a: 'raise', why: 'raise 꼴은 "~을 올리다"라는 다른 동사(명사로는 임금 인상)입니다. 값이 스스로 오르는 것은 rise 꼴입니다.' },
        { a: 'rose', why: 'rose 꼴은 rise 동사의 과거형입니다. 명사 자리에는 rise 꼴을 씁니다.' },
        { a: 'increase', why: '뜻은 통하지만 문제는 원문의 rose 꼴을 명사로 바꾸라고 했습니다. rise 동사의 명사형은 모양이 같은 rise 꼴입니다.' },
      ],
      hint: 'rise 동사는 명사로 쓸 때도 모양이 같습니다.',
      explain: 'Because + 절(prices rose sharply)을 Because of + 명사구로 바꾸면 동사 rose 꼴은 명사 **rise** 꼴(상승)이 되고, 부사 sharply 꼴은 형용사 sharp 꼴이 됩니다: Because of the sharp rise in prices, …',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '다음 원문(Yoon, 2017, p. 42 — 가상의 자료)을 줄여서 직접 인용한 것 가운데 **바른** 것은 무엇입니까?\n\n원문: Students who read for pleasure, even for only twenty minutes a day, build larger vocabularies than those who do not.',
      choices: [
        'Yoon (2017) writes, "Students who read for fun build larger vocabularies than those who do not" (p. 42).',
        'Yoon (2017) writes, "Students who read for pleasure … build larger vocabularies than those who do not" (p. 42).',
        'Yoon (2017) writes, "Students who read … only twenty minutes a day … build larger vocabularies than those who do not" (p. 42).',
        'Yoon (2017) writes, "Students who read for pleasure, even for only twenty minutes a day, build larger vocabularies".',
      ],
      answer: 1,
      why: [
        '따옴표 안의 낱말(pleasure → fun)을 바꾸었습니다. 직접 인용은 원문을 한 글자도 바꾸지 않습니다.',
        '',
        '줄임표로 for pleasure, even for 부분을 빼서 "하루에 20분만 읽는 학생"이라는 다른 뜻이 되었습니다. 원문은 즐거움을 위한 독서를 말하고, 20분은 "단 20분이라도"라는 강조였습니다. 줄여도 원문의 뜻은 지켜야 합니다.',
        '직접 인용에 필요한 쪽수가 빠졌고, 비교 대상(than those who do not)도 잘라 내 뜻이 불완전합니다.',
      ],
      hint: '줄임표(…)는 뜻을 바꾸지 않는 곳에만 쓰고, 직접 인용에는 쪽수를 밝힙니다.',
      explain: '뜻에 꼭 필요하지 않은 삽입구 even for only twenty minutes a day 부분만 줄임표(…)로 빼고, 나머지 낱말은 그대로 두고, 쪽수(p. 42)를 밝힌 인용이 바릅니다.',
    },
  ],

  deeper: [
    {
      title: '인용은 얼마나 쓸까 — 분야마다 다른 습관',
      body: '같은 학술 글이라도 분야에 따라 인용 습관이 다릅니다.\n\n' +
        '- **인문학**(문학·철학 등)은 원문의 표현 자체를 분석하므로 직접 인용이 많습니다. 낱말 하나의 선택이 논의의 대상이기 때문입니다. MLA 양식이 널리 쓰입니다.\n' +
        '- **사회과학**(심리학·교육학 등)은 연구 결과를 바꿔 쓰거나 요약하고 저자·연도를 다는 경우가 대부분입니다. APA 양식이 널리 쓰입니다.\n' +
        '- **공학**에서는 본문에 [1], [2]처럼 번호를 달고 글 끝에 번호순으로 출처를 적는 양식(예: IEEE)을 많이 씁니다.\n\n' +
        '보고 동사의 시제도 양식마다 다릅니다. MLA 양식은 현재형(Kim argues)을 주로 쓰고, APA 양식은 앞선 연구를 소개할 때 과거형이나 현재완료(Kim found, Kim has found)를 권합니다. 과제나 투고 규정이 요구하는 양식을 먼저 확인하는 것이 가장 확실합니다.',
    },
    {
      title: '요약과 바꿔 쓰기는 이해했다는 증거',
      body: '원문을 보면서 낱말만 바꾸면 이해하지 못한 글도 바꿔 쓸 수 있습니다. 그래서 **원문을 덮고** 쓰는 단계가 중요합니다. 덮고 나서 쓸 수 없다면 아직 그 글을 내 것으로 만들지 못한 것입니다.\n\n' +
        '전공 공부에서도 이 방법은 그대로 쓰입니다. 논문 한 편을 읽은 뒤 "이 연구는 무엇을 묻고, 어떻게 조사했고, 무엇을 알아냈으며, 어떤 한계가 있나"를 각각 한 문장으로 요약해 보십시오. 네 문장이 막힘없이 나오면 그 논문을 이해한 것이고, 막히는 곳이 다시 읽을 곳입니다.\n\n' +
        '다음 단원(비판적으로 읽기)에서는 이렇게 정확히 요약한 내용을 바탕으로 주장과 근거를 따져 봅니다. 정확한 요약이 정당한 비판의 출발점입니다.',
    },
  ],

  faq: [
    {
      q: '낱말을 몇 개 이상 바꾸면 표절이 아닌가요?',
      a: '그런 개수 기준은 없습니다. 문장 구조를 그대로 두고 낱말만 바꾸면 몇 개를 바꿔도 짜깁기입니다. 원문을 덮고 내 문장 구조로 다시 쓰고, 어떻게 바꿨든 출처는 반드시 밝히십시오.',
    },
    {
      q: '직접 인용이랑 바꿔 쓰기 중에 뭘 더 많이 써야 해요?',
      a: '대부분의 분야에서는 바꿔 쓰기와 요약이 중심입니다. 직접 인용은 정의, 독특한 표현, 반박하려는 문장처럼 원문의 표현 자체가 중요할 때만 씁니다. 직접 인용이 너무 많으면 내 이해와 내 논지가 잘 드러나지 않습니다.',
    },
    {
      q: 'claim, argue 둘 다 "주장하다"인데 뭐가 달라요?',
      a: 'argue 동사는 근거를 들어 한쪽 입장을 펼친다는 뜻으로 대체로 중립적입니다. claim 동사는 "사실이라고 주장한다"는 뜻으로, 그 근거가 충분한지 의심의 여지를 남깁니다. 그래서 글쓴이가 그 말에 거리를 둘 때 claim 동사를 자주 씁니다.',
    },
    {
      q: '보고 동사는 현재형으로 써요, 과거형으로 써요?',
      a: '양식과 분야에 따라 다릅니다. MLA 양식(인문학)은 Kim argues 같은 현재형을 주로 쓰고, APA 양식(사회과학)은 Kim found, Kim has found 같은 과거형·현재완료를 권합니다. 한 글 안에서는 한 가지 습관을 일관되게 지키십시오.',
    },
  ],

  mistakes: [
    '낱말 몇 개만 동의어로 바꾸고 문장 구조를 그대로 두는 짜깁기 — 원문을 덮고 구조까지 바꿔 다시 쓰십시오.',
    '바꿔 쓰면서 주장의 강도를 바꾸는 실수 — may improve 꼴(좋게 할 수 있다)을 improves 꼴(좋게 한다)로 바꾸면 뜻이 달라집니다.',
    '바꿔 쓰거나 요약한 내용에 출처를 빠뜨리는 실수 — 표현이 내 것이어도 생각의 주인은 원저자입니다.',
  ],

  gens: [
    {
      id: 'noun-form',
      level: 1,
      title: '품사 전환: 명사형으로 바꿔 쓰기',
      make: function (R) {
        // [빈칸 문장, 바꿀 낱말, 정답(명사형), 바꿀 낱말의 품사]
        var items = [
          ['The ___ of the data took three weeks.', 'analyze', 'analysis', '동사'],
          ['The committee\'s final ___ surprised everyone.', 'decide', 'decision', '동사'],
          ['Her ___ of the problem was clear and short.', 'explain', 'explanation', '동사'],
          ['The rapid ___ of the city caused traffic problems.', 'grow', 'growth', '동사'],
          ['The ___ of the experiment was caused by a broken machine.', 'fail', 'failure', '동사'],
          ['The ___ of the new bridge took two years.', 'construct', 'construction', '동사'],
          ['The new rule led to a large ___ in waste.', 'reduce', 'reduction', '동사'],
          ['A careful ___ of the two methods showed clear differences.', 'compare', 'comparison', '동사'],
          ['The ___ of new members will take place in May.', 'select', 'selection', '동사'],
          ['The main ___ of the report is that the plan worked.', 'conclude', 'conclusion', '동사'],
          ['The ___ of clean water is essential for public health.', 'available', 'availability', '형용사'],
          ['The ___ of this finding is still debated.', 'significant', 'significance', '형용사'],
          ['There is little ___ that the new policy reduced crime.', 'evident', 'evidence', '형용사'],
          ['The ___ of the results depends on the sample size.', 'accurate', 'accuracy', '형용사'],
          ['The ___ of the museum attracted many visitors.', 'popular', 'popularity', '형용사'],
          ['Many residents expressed their ___ with the new park.', 'satisfy', 'satisfaction', '동사'],
          ['The ___ of the old factory took six months.', 'remove', 'removal', '동사'],
          ['The ___ of the new rules confused many drivers.', 'introduce', 'introduction', '동사'],
          ['We thank you for your ___ in the survey.', 'participate', 'participation', '동사'],
          ['The ___ of the two groups was almost the same.', 'perform', 'performance', '동사'],
          ['The ___ of the bridge is checked every year.', 'safe', 'safety', '형용사'],
          ['The ___ of the problem surprised the researchers.', 'complex', 'complexity', '형용사'],
        ];
        var it = R.pick(items);
        return {
          type: 'short', check: 'text', concept: 1,
          q: it[1] + ' 낱말을 명사형으로 바꾸어 빈칸에 한 낱말을 쓰십시오.\n\n' + it[0],
          answer: [it[2]],
          wrong: [{ a: it[1], why: it[1] + ' 꼴은 ' + it[3] + '입니다. 관사·형용사·소유격 뒤 명사 자리에는 명사형을 씁니다.' }],
          explain: it[3] + ' ' + it[1] + ' 꼴의 명사형은 **' + it[2] + '** 꼴입니다. 바꿔 쓰기에서 동사·형용사를 명사로 바꾸면(명사화) 문장의 뼈대가 달라집니다.\n\n' + it[0].replace('___', '**' + it[2] + '**'),
        };
      },
    },
    {
      id: 'passive-rewrite',
      level: 2,
      title: '능동태를 수동태로 바꿔 쓰기',
      make: function (R) {
        // [능동 주어, 과거형 동사, 목적어, 목적어가 복수인가, 과거분사]
        var items = [
          ['The committee', 'approved', 'the new budget', false, 'approved'],
          ['Researchers', 'interviewed', 'two hundred students', true, 'interviewed'],
          ['The city', 'built', 'three new libraries', true, 'built'],
          ['A local company', 'designed', 'the bridge', false, 'designed'],
          ['The students', 'wrote', 'the final report', false, 'written'],
          ['Volunteers', 'planted', 'the trees', true, 'planted'],
          ['The scientists', 'measured', 'the water temperature', false, 'measured'],
          ['The editor', 'chose', 'the photos', true, 'chosen'],
          ['The teacher', 'gave', 'the instructions', true, 'given'],
          ['The engineers', 'tested', 'the new software', false, 'tested'],
          ['The team', 'collected', 'the samples', true, 'collected'],
          ['The manager', 'sent', 'the emails', true, 'sent'],
        ];
        var it = R.pick(items);
        function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
        var agent = it[0].charAt(0).toLowerCase() + it[0].slice(1);
        var subj = cap(it[2]);
        var be = it[3] ? 'were' : 'was';
        var beWrong = it[3] ? 'was' : 'were';
        var bePres = it[3] ? 'are' : 'is';
        var correct = subj + ' ' + be + ' ' + it[4] + ' by ' + agent + '.';
        var cands = [
          [subj + ' ' + beWrong + ' ' + it[4] + ' by ' + agent + '.', '수 일치가 틀렸습니다. 새 주어 ' + it[2] + ' 부분이 ' + (it[3] ? '복수라서 were' : '단수라서 was') + ' 꼴을 씁니다.'],
          [subj + ' ' + bePres + ' ' + it[4] + ' by ' + agent + '.', '시제가 바뀌었습니다. 원문이 과거이므로 수동태도 과거(was / were)여야 합니다.'],
          [subj + ' ' + it[4] + ' by ' + agent + '.', 'be동사가 빠졌습니다. 수동태는 be + 과거분사 꼴입니다.'],
        ];
        if (it[1] !== it[4]) cands.push([subj + ' ' + be + ' ' + it[1] + ' by ' + agent + '.', it[1] + ' 꼴은 과거형입니다. 수동태에는 과거분사 ' + it[4] + ' 꼴을 씁니다.']);
        var reason = {};
        cands.forEach(function (c) { reason[c[0]] = c[1]; });
        var pick = R.choices(correct, cands.map(function (c) { return c[0]; }));
        return {
          type: 'choice', concept: 1,
          q: '다음 문장을 수동태로 바르게 바꿔 쓴 것은 무엇입니까?\n\n' + it[0] + ' ' + it[1] + ' ' + it[2] + '.',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '능동태의 목적어 ' + it[2] + ' 부분이 주어가 되고, 동사는 be + 과거분사가 됩니다. 원문이 과거이고 새 주어가 ' + (it[3] ? '복수' : '단수') + '이므로 **' + be + ' ' + it[4] + '** 꼴이며, 행위자는 by 뒤로 갑니다.\n\n' + correct,
        };
      },
    },
    {
      id: 'reporting-verb',
      level: 2,
      title: '보고 동사의 뉘앙스 고르기',
      make: function (R) {
        // [글쓴이의 태도(우리말), 빈칸 문장, 정답]
        var items = [
          ['글쓴이는 출처가 근거를 들어 한쪽 입장을 펼친다고 소개합니다.', 'Han (2020) ___ that schools should start later in the morning.', 'argues'],
          ['글쓴이는 출처의 글이 이유를 들어 한쪽 입장을 편다고 소개합니다.', 'Seo (2019) ___ that public libraries should open on Sundays.', 'argues'],
          ['글쓴이는 출처의 논문이 논쟁이 있는 문제에서 근거를 들어 입장을 밝힌다고 소개합니다.', 'Ryu (2022) ___ that homework should be shorter for younger students.', 'argues'],
          ['글쓴이는 그 말을 믿기 어렵다고 생각하며 거리를 둡니다.', 'The website ___ that its diet plan works for everyone.', 'claims'],
          ['글쓴이는 그 주장의 근거가 부족하다고 보고 거리를 둡니다.', 'The company ___ that its new phone never breaks.', 'claims'],
          ['글쓴이는 광고의 말을 의심하며 거리를 두고 전합니다.', 'The advertisement ___ that the drink doubles your energy.', 'claims'],
          ['결과가 어떤 가능성을 조심스럽게 가리킵니다(확정은 아닙니다).', 'The survey ___ that younger readers may prefer audiobooks.', 'suggests'],
          ['자료가 확정은 아니지만 한 가지 가능성을 가리킵니다.', 'This pattern ___ that the river may flood more often in the future.', 'suggests'],
          ['연구 결과가 조심스럽게 한 가지 해석을 시사합니다.', 'The study ___ that short walks might improve mood.', 'suggests'],
          ['글쓴이는 본론과 별개로 사실 하나를 덧붙여 언급합니다.', 'Lee (2021) also ___ that the survey was conducted only in cities.', 'notes'],
          ['글쓴이는 출처가 지적한 관찰 하나를 중립적으로 전합니다.', 'Moon (2018) ___ that most participants were college students.', 'notes'],
          ['글쓴이는 출처가 한계를 짚은 부분을 덧붙여 언급합니다.', 'Baek (2020) ___ that the data covered only one year.', 'notes'],
        ];
        var it = R.pick(items);
        var correct = it[2];
        var pick = R.choices(correct, ['argues', 'claims', 'suggests', 'notes'].filter(function (v) { return v !== correct; }));
        var WHY = {
          argues: 'argues 동사는 근거를 들어 한쪽 입장을 펼칠 때 씁니다. 글쓴이의 태도와 맞지 않습니다.',
          claims: 'claims 동사는 근거가 충분한지 의심하며 거리를 둘 때 자주 씁니다. 이 상황에는 그런 의심이 없습니다.',
          suggests: 'suggests 동사는 가능성을 조심스럽게 가리키거나 조심스럽게 제안할 때 씁니다. 이 상황이 말하는 태도와 맞지 않습니다.',
          notes: 'notes 동사는 사실을 덧붙여 중립적으로 언급할 때 씁니다. 이 상황과 맞지 않습니다.',
        };
        var MEAN = {
          argues: '근거를 들어 한쪽 입장을 펼친다',
          claims: '사실이라고 주장한다(글쓴이는 의심하며 거리를 둔다)',
          suggests: '가능성을 조심스럽게 가리킨다',
          notes: '사실을 덧붙여 중립적으로 언급한다',
        };
        return {
          type: 'choice', concept: 4,
          q: '상황에 가장 알맞은 보고 동사를 고르십시오.\n\n상황: ' + it[0] + '\n\n' + it[1],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : WHY[c]; }),
          explain: '**' + correct + '** 동사는 "' + MEAN[correct] + '"는 뜻이라 이 상황에 알맞습니다.\n\n' + it[1].replace('___', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'paraphrase', m: '바꿔 쓰다; 바꿔 쓴 글', ex: 'Try to paraphrase the sentence in your own words.', exm: '그 문장을 여러분의 말로 바꿔 써 보십시오.' },
    { w: 'summarize', m: '요약하다', ex: 'Please summarize the article in two sentences.', exm: '그 기사를 두 문장으로 요약해 주십시오.' },
    { w: 'quotation', m: '인용, 인용문', ex: 'Put the quotation inside quotation marks.', exm: '인용문은 따옴표 안에 넣으십시오.' },
    { w: 'cite', m: '(출처를) 인용하다, 밝히다', ex: 'You must cite every source you use.', exm: '여러분이 쓰는 모든 출처를 밝혀야 합니다.' },
    { w: 'source', m: '출처, 자료', ex: 'This website is not a reliable source.', exm: '이 웹사이트는 믿을 만한 출처가 아닙니다.' },
    { w: 'plagiarism', m: '표절', ex: 'Copying a sentence without credit is plagiarism.', exm: '출처를 밝히지 않고 문장을 베끼는 것은 표절입니다.' },
    { w: 'argue', m: '(근거를 들어) 주장하다', ex: 'The author argues that cities need more trees.', exm: '저자는 도시에 나무가 더 필요하다고 주장합니다.' },
    { w: 'claim', m: '(사실이라고) 주장하다; 주장', ex: 'The company claims that its product is the best.', exm: '그 회사는 자기 제품이 최고라고 주장합니다.' },
    { w: 'suggest', m: '시사하다; 제안하다', ex: 'The data suggest that the plan may work.', exm: '그 자료는 계획이 효과가 있을 수도 있음을 시사합니다.' },
    { w: 'note', m: '언급하다, 주목하다', ex: 'The writer notes that the sample was small.', exm: '글쓴이는 표본이 작았다는 점을 언급합니다.' },
    { w: 'original', m: '원래의; 원문', ex: 'Compare your summary with the original.', exm: '여러분의 요약을 원문과 비교해 보십시오.' },
    { w: 'acknowledge', m: '(사실·도움을) 인정하다, 밝히다', ex: 'Always acknowledge the ideas of other writers.', exm: '다른 저자의 생각은 늘 그 출처를 밝히십시오.' },
    { w: 'reference', m: '참고문헌, 참조', ex: 'Add the book to your list of references.', exm: '그 책을 참고문헌 목록에 넣으십시오.' },
    { w: 'concise', m: '간결한', ex: 'A good summary is concise and clear.', exm: '좋은 요약은 간결하고 분명합니다.' },
    { w: 'distort', m: '(뜻·사실을) 왜곡하다', ex: 'Do not distort the meaning of the original text.', exm: '원문의 뜻을 왜곡하지 마십시오.' },
  ],
});
})();
