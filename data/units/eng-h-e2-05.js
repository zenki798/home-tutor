/* 영어Ⅱ · 밑줄 친 표현의 함축 의미
 * 지문은 모두 직접 쓴 글이다(가상의 인물·상황). 이름이 알려진 사람의 말이나 책의 문장을 옮기지 않았다. */
(function () {
  // 글 A: 장비보다 안목 (사진)
  var LENS = 'Many people believe that a better camera will make them better photographers. So they save money for an expensive new lens, only to find that their pictures look much the same as before. Meanwhile, some skilled photographers take moving pictures with nothing more than an old phone. They know where the light falls, when to wait, and what to leave out of the frame. In photography, __the eye matters more than the lens__.';
  // 글 B: 빈 시간과 생각 (화면)
  var SCREEN = 'Our days are packed with alarms, messages, and short videos. The moment we have a free minute, we reach for a screen and fill it. Yet many good ideas seem to arrive only when the mind is allowed to wander, such as during a slow walk or a long bus ride. By filling every empty moment, we may be __locking the door on our most welcome visitors__.';
  // 글 C: 연결되지 않은 지식 (공부)
  var BRICKS = 'Some students study by memorizing one fact after another for the next test. They can list dates and formulas, but they cannot explain how one idea leads to another. When a new topic builds on an old one, they have to start from zero again. Such students are __collecting bricks without ever building a wall__. Real learning begins when facts are connected into a structure that can hold new knowledge.';
  // 글 D: 실패의 쓸모 (실험실)
  var LAB = 'In a laboratory, an experiment that fails is not simply wasted time. It shows researchers which paths lead nowhere, so the next attempt can begin from a better place. Many useful discoveries came only after hundreds of unsuccessful tries. For a careful scientist, every crossed-out line in a notebook is __a road sign pointing away from a dead end__.';
  // 글 E: 대조 구조 (리더)
  var LEADER = 'Many people picture a leader as the loudest voice in the room, the one who gives orders and makes every decision. However, the best team captain I have ever worked with spoke the least in our meetings. She asked questions, listened carefully, and made sure that even the quietest member was heard. When trouble came, we already trusted one another and knew where we were going. She was not the engine that pulled the train; she was __the rails that kept it on track__.';

Tutor.registerUnit({
  id: 'eng-h-e2-05',
  course: 'eng-h-e2',
  title: '밑줄 친 표현의 함축 의미',
  summary: '비유적으로 쓰인 밑줄 친 표현이 글 전체 주제와 어떻게 이어지는지 파악해 숨은 뜻을 찾습니다.',
  goals: [
    '밑줄 친 표현이 비유인지 글자 그대로인지 판단할 수 있다.',
    '글의 주제와 대조 구조 속에서 밑줄 친 표현이 어느 쪽을 가리키는지 연결할 수 있다.',
    '밑줄 앞뒤 문장에서 단서를 찾아 구체적인 표현을 일반적인 뜻으로 바꿀 수 있다.',
    '본문보다 지나치게 넓히거나 세게 말한 해석을 걸러 낼 수 있다.',
  ],
  standards: ['[12영Ⅱ-01-05]'],

  concepts: [
    {
      title: '비유인가, 글자 그대로인가',
      body: '밑줄 친 표현을 만나면 먼저 **글자 그대로(literal)** 읽어 봅니다. 글자 그대로의 뜻이 글의 내용과 **어긋나면** 그 표현은 **비유(figurative)**로 쓰인 것입니다.\n\n' +
        '| 문장 | 글자 그대로 맞는가? | 판단 |\n|---|---|---|\n' +
        '| The children __broke the ice__ on the pond to see the fish. | 연못의 얼음을 실제로 깼다 | 글자 그대로 |\n' +
        '| Minsu __broke the ice__ at the party with a funny story. | 파티에 얼음이 없다 | 비유 (어색한 분위기를 깼다) |\n\n' +
        '같은 표현이라도 **문맥**에 따라 글자 그대로일 수도, 비유일 수도 있습니다. 함축 의미 문제의 밑줄은 대부분 비유이지만, 판단의 근거는 언제나 "이 글에서 글자 그대로 말이 되는가?"입니다.\n\n' +
        '비유에는 이미 굳어진 **관용 표현**(break the ice)도 있고, 글쓴이가 그 글을 위해 **새로 만든 비유**도 있습니다. 새로 만든 비유는 사전에 뜻이 없으므로 **글의 내용으로만** 풀 수 있습니다.\n\n' +
        '> 💡 사진에 관한 글의 밑줄(the eye matters more than the lens) 속 eye(눈)는 실제 시력이 아니라 **무엇을 보고 고르는 능력**입니다. 글 어디에도 시력 이야기가 없기 때문입니다.',
      easy: '친구가 "오늘 시험 때문에 머리가 터질 것 같아."라고 하면, 정말 머리가 터진다고 걱정하는 사람은 없습니다. 상황을 보면 "너무 힘들다"는 뜻이라는 것을 바로 알지요.\n\n' +
        '영어 밑줄도 똑같습니다. 글자 그대로 읽었을 때 "이 글에서 그게 말이 돼?"라는 생각이 들면 비유입니다. 그때부터는 "그럼 이 글에서는 무슨 뜻일까?"를 찾으면 됩니다.',
      check: {
        type: 'ox',
        q: '다음 문장에서 밑줄 친 부분은 글자 그대로의 뜻으로 쓰였다.\n\nAfter the long debate, the two teams finally __built a bridge__ between their ideas.',
        answer: false,
        explain: '두 팀이 실제로 다리를 지은 것이 아니라, 서로 다른 생각을 **이어 줄 접점을 찾았다**는 비유입니다. 토론이라는 문맥에서 글자 그대로의 다리는 말이 되지 않습니다.',
      },
    },
    {
      title: '글의 주제·대조 구조와 연결하기',
      body: '밑줄 친 표현은 홀로 떨어져 있지 않습니다. 대부분 **글의 주제를 비유로 다시 말한 것**이거나, 글의 **대조 구조(A가 아니라 B)** 가운데 한쪽을 가리킵니다.\n\n' +
        '먼저 글 전체가 무엇을 말하는지 한 문장으로 정리합니다. 그다음 글에서 맞서는 두 쪽을 찾습니다.\n\n' +
        '| 글 | 버리는 쪽 (A) | 글쓴이가 고르는 쪽 (B) |\n|---|---|---|\n' +
        '| 리더 글 | the loudest voice, gives orders → **the engine** | listened, made sure everyone was heard → **the rails** |\n' +
        '| 사진 글 | a better camera, an expensive lens → **the lens** | where the light falls, when to wait → **the eye** |\n\n' +
        'not A but B, A; however B, instead, rather than, while 같은 표현이 대조를 알려 주는 신호입니다. 밑줄 친 표현이 **어느 쪽에 서 있는지**만 정확히 잡아도 정반대 뜻의 선택지를 지울 수 있습니다.\n\n' +
        '> ⚠️ 대조 구조에서는 두 쪽의 비유가 함께 나오는 일이 많습니다(예: engine / rails). 밑줄이 어느 쪽에 그어졌는지 다시 확인하십시오.',
      easy: '"그는 불꽃이 아니라 숯이었다."라는 말을 들으면, 앞뒤 이야기를 몰라도 불꽃과 숯을 **비교**하고 있다는 것은 알 수 있습니다. 불꽃은 확 타오르다 꺼지고, 숯은 오래 은근히 탑니다.\n\n' +
        '글에서 "보통 사람들은 ~라고 생각한다. 그러나 ~"처럼 두 쪽이 맞서면, 밑줄은 거의 언제나 글쓴이가 편드는 쪽에 있습니다. 어느 편인지부터 정하십시오.',
      check: {
        type: 'choice',
        q: '리더에 관한 글입니다. 밑줄 친 부분(the rails that kept it on track)이 가리키는 리더는 어떤 사람입니까?\n\n' + LEADER,
        choices: [
          '잘 듣고 팀이 방향을 잃지 않게 지켜 준 사람',
          '앞에서 큰 소리로 명령을 내리며 팀 전체를 힘차게 끌고 간 사람',
          '회의에서 말을 아끼느라 팀의 일에 별로 관심을 두지 않았던 사람',
        ],
        answer: 0,
        why: ['', '명령하며 끌고 가는 리더는 글쓴이가 맞세운 the engine 쪽입니다. 밑줄은 반대쪽에 있습니다.', '말을 적게 한 것은 관심이 없어서가 아니라 질문하고 듣기 위해서였습니다. 글의 단서와 반대입니다.'],
        explain: '글은 "명령하는 엔진 같은 리더"와 "듣고 방향을 지켜 주는 리더"를 맞세웁니다. 밑줄 친 **the rails**(선로)는 기차를 끌지는 않지만 길에서 벗어나지 않게 해 주므로, 조용히 팀의 방향을 지켜 준 주장을 가리킵니다.',
      },
    },
    {
      title: '밑줄 앞뒤 문장에서 단서 찾기',
      body: '비유의 뜻은 거의 언제나 **밑줄 바로 앞이나 뒤**에서 풀립니다. 글쓴이는 비유를 쓰기 전에 그 내용을 평범한 말로 먼저 설명하거나, 비유 뒤에 다시 풀어 줍니다.\n\n' +
        '| 단서의 자리 | 신호 표현 | 예 |\n|---|---|---|\n' +
        '| 앞 문장이 풀이 | So, Such ~, This is why | Such students are __collecting bricks__ … → Such students = 앞에서 말한 "사실을 하나씩 외우기만 하는 학생" |\n' +
        '| 뒤 문장이 풀이 | In other words, That is, This means | … __a road sign__. In other words, failure tells us where not to go. |\n' +
        '| 비유 안의 낱말이 앞의 낱말과 짝 | 같은 대상을 다른 말로 | bricks ↔ one fact after another, a dead end ↔ paths lead nowhere |\n\n' +
        '특히 **비유 속 낱말 하나하나를 본문의 평범한 낱말과 짝지어** 보십시오. 밑줄 collecting bricks without ever building a wall(벽은 쌓지 않고 벽돌만 모은다) 속 bricks(벽돌)는 앞 문장의 **facts**(사실), wall(벽)은 뒤 문장의 **a structure that can hold new knowledge**(새 지식을 담을 수 있는 구조)와 짝을 이룹니다. 짝이 맞으면 해석은 저절로 나옵니다.\n\n' +
        '> 💡 지시어(Such, This, These, That)가 밑줄 문장에 있으면, 그것이 가리키는 앞 내용이 바로 풀이의 열쇠입니다.',
      easy: '수수께끼를 낼 때도 힌트를 주지요. "나는 다리가 넷인데 걷지 못해요. 사람들은 내 위에 앉아요."에서 "의자"를 맞히는 것처럼요.\n\n' +
        '밑줄 친 비유가 수수께끼라면, 바로 앞뒤 문장이 힌트입니다. 비유 속 낱말(bricks, wall)이 본문의 어떤 평범한 낱말(facts, structure)과 같은 것을 가리키는지 짝을 지어 보십시오.',
      check: {
        type: 'choice',
        q: '공부에 관한 글입니다. 밑줄 친 표현의 **bricks**(벽돌)와 짝을 이루는 본문의 낱말은 무엇입니까?\n\n' + BRICKS,
        choices: ['facts', 'a structure', 'a new topic'],
        answer: 0,
        why: ['', 'a structure(구조)는 벽돌로 쌓아야 할 벽(wall)과 짝입니다. 벽돌 자체가 아닙니다.', 'a new topic(새 단원)은 앞으로 배울 내용으로, 학생이 모으는 벽돌과는 다른 것입니다.'],
        explain: '학생들이 하나씩 외우는 **facts**(사실)가 벽돌(bricks)이고, 그것들을 이어 만든 **a structure that can hold new knowledge**(새 지식을 담을 구조)가 벽(wall)입니다. 그래서 밑줄은 "지식을 서로 잇지 않고 모으기만 한다"는 뜻입니다.',
      },
    },
    {
      title: '구체적인 표현을 일반적인 뜻으로 바꾸기',
      body: '함축 의미의 정답 선택지는 비유 속 **구체적인 그림**(벽돌, 선로, 렌즈)을 걷어 내고 **일반적인 뜻**으로 바꾼 문장입니다.\n\n' +
        '| 밑줄 (구체적인 그림) | 일반적인 뜻 |\n|---|---|\n' +
        '| the eye matters more than the lens | the ability to notice and choose is more important than the equipment |\n' +
        '| locking the door on our most welcome visitors | shutting out good ideas by never letting the mind rest |\n' +
        '| a road sign pointing away from a dead end | a failure that shows which way not to go |\n\n' +
        '그래서 선택지를 고를 때는 다음을 확인합니다.\n\n' +
        '1. 비유 속 낱말을 **그대로 되풀이한** 선택지는 오히려 의심합니다. (Photographers should buy a better lens. — 렌즈(lens)를 글자 그대로 읽은 함정)\n' +
        '2. 정답은 본문의 낱말과 **다른 낱말(바꿔 쓴 말)**로 같은 뜻을 말하는 경우가 많습니다. (facts → pieces of information, connect → link)\n' +
        '3. 선택지를 밑줄 자리에 **바꿔 넣어** 읽어 보고 글의 흐름이 자연스러운지 봅니다.\n\n' +
        '> 💡 풀이 순서 정리: ① 비유인지 확인 → ② 글의 주제·대조 구조 파악 → ③ 밑줄 앞뒤 단서 찾기 → ④ 일반적인 뜻으로 바꾼 선택지 고르기 → ⑤ 지나친 해석인지 마지막 점검',
      easy: '"우리 반 체육대회 날은 축제였다."를 다른 말로 하면 "그날 모두가 아주 즐겁고 신났다"입니다. "축제"라는 그림을 걷어 내고 그 그림이 주는 느낌만 남긴 것이지요.\n\n' +
        '정답 선택지도 그렇게 생겼습니다. 벽돌·선로·렌즈 같은 그림 낱말은 사라지고, "연결되지 않은 지식", "방향을 지켜 주는 역할"처럼 일반적인 말이 남습니다.',
      check: {
        type: 'choice',
        q: '공부에 관한 글에서 밑줄 친 부분(collecting bricks without ever building a wall)의 뜻으로 가장 알맞은 것은 무엇입니까?\n\n' + BRICKS,
        choices: [
          'collecting facts without connecting them',
          'learning how to build walls and houses with bricks',
          'refusing to study for any of the tests at school',
        ],
        answer: 0,
        why: ['', '벽돌(bricks)과 벽(wall)을 글자 그대로 읽었습니다. 이 글은 공부에 관한 글이라 건축 이야기가 아닙니다.', '글의 학생들은 시험공부를 열심히 합니다. 문제는 공부를 안 하는 것이 아니라 외운 것을 잇지 않는 것입니다.'],
        explain: '벽돌(facts)을 모으기만 하고 벽(연결된 구조)을 쌓지 않는다는 그림을 일반적인 말로 바꾸면 "사실을 모으기만 하고 서로 이어 진짜 이해로 만들지 않는다"입니다. 정답 선택지는 그림 낱말을 일반적인 말로 바꿔 썼습니다: bricks → facts, building a wall → connecting them.',
      },
    },
    {
      title: '지나치게 확대한 해석 피하기',
      body: '함축 의미 문제에서 가장 그럴듯한 오답은 **방향은 맞는데 너무 멀리 간** 선택지입니다. 본문이 말한 것보다 **범위를 넓히거나 강도를 세게** 만든 것이지요.\n\n' +
        '| 본문의 뜻 | 지나친 해석 (오답) | 무엇이 지나친가 |\n|---|---|---|\n' +
        '| 장비보다 안목이 더 중요하다 | Expensive cameras ruin good photos. | "덜 중요하다"를 "해롭다"로 바꿨다 |\n' +
        '| 빈 시간을 다 채우면 좋은 생각을 놓칠 수 있다 | We should never use screens. | "모든 순간을 채우지 말자"를 "절대 쓰지 말자"로 넓혔다 |\n' +
        '| 실패도 쓸모 있는 정보다 | Failing is better than succeeding. | "실패도 쓸모 있다"를 "실패가 더 낫다"로 부풀렸다 |\n\n' +
        '다음 낱말이 보이면 본문과 다시 맞춰 봅니다: **always, never, all, only, completely, must, the best**. 본문에 그만큼 센 말이 없다면 지나친 해석일 가능성이 큽니다.\n\n' +
        '또 **본문에 없는 내용**을 덧붙인 선택지(돈을 아껴야 한다, 과학자가 되어야 한다)도 지웁니다. 그럴듯한 교훈이라도 이 글이 말하지 않았다면 오답입니다.\n\n' +
        '> ⚠️ 본문의 may(~일지도 모른다), some(일부), many(많은)는 조심스러운 말입니다. 선택지가 이를 always(언제나), all(모두)처럼 바꾸었다면 거의 언제나 오답입니다.',
      easy: '친구가 "나 요즘 운동을 좀 덜 하는 것 같아."라고 했는데, 다른 친구에게 "걔가 운동을 완전히 그만뒀대!"라고 전하면 말을 부풀린 것이지요.\n\n' +
        '선택지도 그렇게 부풀려져 있을 때가 많습니다. 본문의 "조금", "~할 수도 있다"가 선택지에서 "절대", "모두"로 바뀌지 않았는지 살펴보십시오.',
      check: {
        type: 'ox',
        q: '사진에 관한 글의 밑줄 친 부분을 "비싼 카메라는 좋은 사진을 찍는 데 아무 쓸모가 없다"로 풀이하는 것은 알맞다.\n\n' + LENS,
        answer: false,
        explain: '글은 장비보다 **안목이 더 중요하다**고 했을 뿐, 장비가 **아무 쓸모가 없다**고 하지 않았습니다. "더 중요하다"를 "쓸모없다"로 세게 바꾼 지나친 해석입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 글에서 밑줄 친 부분이 의미하는 바를 정리해 보십시오.\n\n' + LENS,
      steps: [
        '비유인가? 글은 사진 기술에 관한 것인데 시력 이야기는 없습니다. 그러니 eye(눈)와 lens(렌즈)는 비유입니다.',
        '대조 구조: 앞쪽은 a better camera, an expensive new lens(장비), 뒤쪽은 where the light falls, when to wait, what to leave out(보는 능력)입니다. 글쓴이는 뒤쪽을 고릅니다.',
        '짝 맞추기: the lens ↔ 장비(camera, lens), the eye ↔ 빛·때·뺄 것을 아는 능력.',
        '일반적인 뜻으로 바꾸기: "사진에서는 장비보다 무엇을 보고 고르는 능력이 더 중요하다."',
        '지나친 해석 점검: "비싼 장비는 해롭다", "카메라를 사지 말라"는 본문에 없는 센 말이므로 버립니다.',
      ],
      answer: 'Knowing how to see and choose a scene is more important than having expensive equipment. (장비보다 안목이 중요하다)',
    },
    {
      q: '다음 글에서 밑줄 친 부분이 의미하는 바를 정리해 보십시오.\n\n' + SCREEN,
      steps: [
        '비유인가? 실제 문을 잠그거나 손님이 오는 이야기가 아니므로 비유입니다.',
        '주제: 빈 시간을 화면으로 다 채우는 습관과, 마음이 쉬며 떠돌 때 떠오르는 좋은 생각을 맞세웁니다.',
        '단서: 바로 앞 문장의 many good ideas seem to arrive(좋은 생각이 도착한다) — 생각을 "찾아오는 손님"으로 그렸습니다. 그래서 our most welcome visitors = good ideas.',
        'locking the door = 빈 순간을 모두 채워 그런 생각이 들어올 틈을 막는 것(By filling every empty moment).',
        '정리하고 점검: "쉴 틈 없이 화면으로 시간을 채우면 좋은 생각이 떠오를 기회를 막을 수 있다." 본문은 may be(~일지도 모른다)라고 조심스럽게 말하므로, "화면은 절대 쓰면 안 된다"는 지나친 해석입니다.',
      ],
      answer: 'By never letting the mind rest, we may shut out good ideas. (빈 시간을 다 채우면 좋은 생각이 떠오를 기회를 놓친다)',
    },
  ],

  terms: [
    { term: '함축 의미 (implied meaning)', def: '글자에 직접 쓰여 있지 않지만 문맥 속에서 담긴 숨은 뜻입니다. 예: the eye matters more than the lens → 장비보다 안목이 중요하다' },
    { term: '글자 그대로의 뜻 (literal meaning)', def: '낱말이 사전에 나온 기본 뜻 그대로 쓰인 것입니다. 예: The children broke the ice on the pond.' },
    { term: '비유 (figurative expression)', def: '어떤 것을 다른 것에 빗대어 나타낸 표현입니다. 글자 그대로 읽으면 문맥과 어긋납니다. 예: break the ice(어색함을 깨다)' },
    { term: '관용 표현 (idiom)', def: '여러 낱말이 굳어져 하나의 새 뜻을 갖는 표현입니다. 예: break the ice, a piece of cake' },
    { term: '대조 구조', def: '두 대상이나 생각을 맞세워 차이를 드러내는 글의 짜임입니다. not A but B, however, rather than, instead 같은 신호가 있습니다.' },
    { term: '일반화한 뜻', def: '비유 속 구체적인 그림(벽돌, 렌즈)을 걷어 내고 넓은 말로 다시 쓴 뜻입니다. 함축 의미의 정답 선택지가 이런 꼴입니다.' },
    { term: '지나친 해석', def: '본문이 말한 것보다 범위를 넓히거나(all, always) 강도를 세게(never, completely) 바꾼 해석입니다. 함축 의미 문제의 대표적인 오답입니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'ox', concept: 0,
      q: '다음 문장에서 밑줄 친 부분은 비유적으로 쓰였다.\n\nThe new rules were __a wall__ between the students and the teachers.',
      answer: true,
      explain: '실제 벽을 세운 것이 아니라 규칙 때문에 학생과 교사 사이에 **거리감과 단절**이 생겼다는 비유입니다. 규칙은 벽이 될 수 없으므로 글자 그대로는 말이 되지 않습니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '밑줄 친 부분이 **글자 그대로의 뜻**으로 쓰인 문장은 무엇입니까?',
      choices: [
        'The children __broke the ice__ on the frozen pond.',
        'Minsu __broke the ice__ at the party by telling a funny story.',
        'Her warm smile __broke the ice__ between the two shy teams.',
        'A simple question about the weather __broke the ice__ in the silent meeting room.',
      ],
      answer: 0,
      why: [
        '',
        '파티에는 깰 얼음이 없습니다. 재미있는 이야기로 어색한 분위기를 깼다는 비유입니다.',
        '미소로 얼음을 깰 수는 없습니다. 두 팀 사이의 서먹함을 풀었다는 비유입니다.',
        '회의실에 얼음이 있는 것이 아니라, 날씨 질문으로 침묵과 어색함을 깼다는 비유입니다.',
      ],
      explain: '얼어붙은 연못(the frozen pond)에는 실제 얼음이 있으므로 첫 문장의 밑줄 친 부분은 **글자 그대로** "얼음을 깼다"입니다. 나머지는 모두 "어색한 분위기를 풀었다"는 관용 표현입니다. 같은 표현도 문맥이 뜻을 정합니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 3,
      q: '밑줄 친 부분(the eye matters more than the lens)이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\n' + LENS,
      choices: [
        'Knowing how to see a scene matters more than good equipment.',
        'Taking care of your eyes is more important than buying a camera.',
        'Old phones always take better pictures than expensive cameras.',
        'A photographer should look through the lens before pressing the button.',
      ],
      answer: 0,
      why: [
        '',
        '눈(eye)을 실제 시력으로 읽었습니다. 글에는 눈 건강 이야기가 없습니다.',
        '본문은 일부 사진가가 낡은 휴대전화로도 좋은 사진을 찍는다고 했을 뿐, 늘(always) 더 낫다고 하지 않았습니다. 지나친 해석입니다.',
        '렌즈(lens)를 글자 그대로 읽은 함정입니다. 렌즈를 들여다보라는 사용법 이야기가 아닙니다.',
      ],
      explain: '빛이 어디에 떨어지는지, 언제 기다릴지, 무엇을 뺄지 **아는 능력(the eye)**이 비싼 **장비(the lens)**보다 중요하다는 뜻입니다.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'text', concept: 2,
      q: '공부에 관한 글입니다. 밑줄 친 표현에서 **bricks**(벽돌)가 가리키는 것을 본문 첫 문장에서 찾아 영어 한 낱말로 쓰십시오.\n\n' + BRICKS,
      answer: ['facts', 'fact'],
      wrong: [
        { a: 'formulas', why: 'formulas(공식)는 둘째 문장에 나오는 예 가운데 하나입니다. 첫 문장에서 학생들이 하나씩 외우는 것을 통틀어 가리키는 낱말을 찾으십시오.' },
        { a: 'wall', why: '벽(wall)은 벽돌을 이어 쌓은 결과, 곧 연결된 이해를 뜻합니다. 벽돌 하나하나와는 다릅니다.' },
      ],
      explain: '첫 문장 memorizing **one fact after another**(사실을 하나씩 외운다)에서, 하나씩 따로 모으는 벽돌은 **facts**(사실)입니다. 마지막 문장의 Real learning begins when **facts** are connected …도 같은 짝을 확인해 줍니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '리더에 관한 글에서 **the engine that pulled the train**(기차를 끈 엔진)이 가리키는 것은 무엇입니까?\n\n' + LEADER,
      choices: [
        'a leader who gives orders and decides alone',
        'a quiet member who is rarely heard in meetings',
        'a captain who listens carefully to every member',
        'a team that trusts one another in times of trouble',
      ],
      answer: 0,
      why: [
        '',
        '가장 조용한 팀원은 주장이 목소리를 들어 준 사람입니다. 엔진과는 관계가 없습니다.',
        '잘 듣는 주장은 엔진이 아니라 the rails(선로) 쪽입니다. 대조의 반대편을 골랐습니다.',
        '서로 믿는 팀은 rails 같은 주장 덕분에 생긴 결과입니다. 엔진이 가리키는 대상이 아닙니다.',
      ],
      explain: '글 첫 문장의 **the loudest voice**, **gives orders and makes every decision**(명령을 내리고 모든 결정을 하는 사람)이 기차를 앞에서 끄는 **엔진**입니다. 글쓴이는 이 흔한 리더 모습을 However 뒤의 주장과 맞세웠습니다.',
    },
    {
      id: 'p6', level: 1, type: 'ox', concept: 4,
      q: '빈 시간에 관한 글의 밑줄 친 표현을 다음과 같이 풀이하는 것은 알맞다.\n\n→ We should throw away our phones and never watch videos.\n\n' + SCREEN,
      answer: false,
      explain: '본문은 "모든 빈 순간을 채우면 좋은 생각을 놓칠 **수도 있다**(may be)"고 조심스럽게 말했습니다. 휴대전화를 버리고 **절대(never)** 보지 말라는 것은 본문보다 훨씬 센 **지나친 해석**입니다.',
    },
    {
      id: 'p7', level: 2, type: 'choice', concept: 3,
      q: '밑줄 친 부분(locking the door on our most welcome visitors)이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\n' + SCREEN,
      choices: [
        'losing chances for new ideas by filling every free moment',
        'refusing to let friends come to our house when we are busy',
        'forgetting to lock the door while watching short videos on a screen',
        'spending too much money on new phones and video apps',
      ],
      answer: 0,
      why: [
        '',
        '손님(visitors)을 실제 친구로 읽었습니다. 앞 문장에서 "도착하는" 것은 좋은 생각(good ideas)입니다.',
        '문 잠그기(lock the door)를 글자 그대로 읽었고, 오히려 "잠그는 것을 잊는다"로 뜻을 뒤집었습니다.',
        '돈 이야기는 본문에 없습니다. 본문에 없는 내용을 덧붙였습니다.',
      ],
      hint: '앞 문장에서 무엇이 "도착한다(arrive)"고 했는지 찾아보십시오.',
      explain: '앞 문장의 many good ideas seem to **arrive**(좋은 생각이 도착하는 것 같다)에서 생각을 찾아오는 손님으로 그렸으므로, 손님은 곧 좋은 생각입니다(**visitors = good ideas**). By **filling every empty moment**(빈 순간을 모두 채워서)가 "문을 잠그는" 행동입니다. 그래서 "빈 시간을 모두 채워 새로운 생각이 떠오를 기회를 잃는다"는 뜻입니다.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 4,
      q: '사진에 관한 글의 밑줄 친 부분에 대한 해석으로, **지나치게 확대한** 것은 무엇입니까?\n\n' + LENS,
      choices: [
        'Buying expensive equipment ruins a photographer\'s talent.',
        'Skill in seeing matters more than the tools you use.',
        'A good photographer knows how to use light and when to wait.',
        'A new lens alone does not make your pictures much better.',
      ],
      answer: 0,
      why: [
        '',
        '본문의 핵심을 일반적인 말로 바르게 바꾼 해석입니다.',
        '본문의 They know where the light falls, when to wait …와 맞는 내용입니다.',
        '본문의 only to find that their pictures look much the same as before(사진이 전과 거의 같아 보였다)와 맞는 내용입니다.',
      ],
      hint: '본문에 없는 센 말(ruins, never, always)이 들어 있는 선택지를 찾으십시오.',
      explain: '본문은 장비가 **덜 중요하다**고 했지, 비싼 장비가 재능을 **망친다(ruins)**고 하지 않았습니다. "덜 중요하다"를 "해롭다"로 바꾼 **지나친 해석**입니다. 나머지 셋은 본문이 실제로 말한 내용입니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '밑줄 친 부분(a road sign pointing away from a dead end)이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\n' + LAB,
      choices: [
        'a failure that shows which way not to go next',
        'a signal that the experiment should be stopped forever',
        'a careful note that helps scientists drive safely',
        'proof that failing is always better than succeeding',
      ],
      answer: 0,
      why: [
        '',
        '본문은 실패 뒤에 the next attempt(다음 시도)가 더 나은 곳에서 시작된다고 했습니다. 영원히 멈추라는 뜻과 반대입니다.',
        '도로 표지판(road sign)을 글자 그대로 읽었습니다. 운전 이야기가 아닙니다.',
        '실패가 쓸모 있다는 것을 "언제나 성공보다 낫다"로 넓힌 지나친 해석입니다.',
      ],
      hint: '본문 둘째 문장에서 a dead end(막다른 길)와 뜻이 같은 말을 찾아보십시오.',
      explain: '둘째 문장 It shows researchers **which paths lead nowhere**(어떤 길이 어디로도 이어지지 않는지)가 단서입니다. 실패한 실험(공책에 지운 줄)은 "이 길은 막혀 있다"고 알려 주어 **다음에 가지 않을 방향**을 보여 줍니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 2,
      q: '실험실에 관한 글입니다. 밑줄 친 부분 속 a dead end(막다른 길)와 뜻이 통하는 표현을 본문 **둘째 문장**에서 찾아 **두 낱말**로 쓰십시오.\n\n' + LAB,
      answer: ['lead nowhere', 'leads nowhere'],
      wrong: [
        { a: 'better place', why: 'a better place(더 나은 곳)는 다음 시도가 시작되는 "더 나은 곳"입니다. 막다른 길과 반대쪽 뜻입니다.' },
        { a: 'wasted time', why: 'wasted time(낭비한 시간)은 첫 문장에 나오며, 글쓴이가 실패는 그것이 "아니라"고 부정한 말입니다.' },
      ],
      explain: '둘째 문장 It shows researchers which paths **lead nowhere**(어디로도 이어지지 않는다)가 a dead end(막다른 길)를 평범한 말로 미리 풀어 둔 단서입니다. 비유 속 낱말을 본문의 평범한 낱말과 짝지으면 뜻이 풀립니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 1,
      q: '공부에 관한 글에서 글쓴이가 **bricks**(벽돌)와 대조시킨 것은 무엇입니까?\n\n' + BRICKS,
      choices: [
        'a structure that can hold new knowledge',
        'dates and formulas that students can list',
        'the next test that students study for',
        'a new topic that builds on an old one',
      ],
      answer: 0,
      why: [
        '',
        '날짜와 공식(dates and formulas)은 벽돌, 곧 따로 외운 사실의 예입니다. 같은 쪽입니다.',
        '시험은 학생들이 사실을 외우는 목적일 뿐, 벽돌과 맞서는 개념이 아닙니다.',
        '새 단원은 옛 내용 위에 쌓이는 것으로, 대조 구조의 한쪽이 아닙니다.',
      ],
      explain: '글은 **따로 떨어진 사실(bricks)**과 사실들이 이어진 **구조(a structure that can hold new knowledge = a wall)**를 맞세웁니다. 글쓴이가 고르는 쪽은 구조이고, 밑줄은 벽은 쌓지 않고 벽돌만 모으는 학생을 비판합니다.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 3,
      q: '이 단원에서 배운 함축 의미 풀이 순서대로 놓으십시오.',
      choices: [
        '밑줄 친 표현이 비유인지 확인한다',
        '글의 주제와 대조 구조를 파악한다',
        '밑줄 앞뒤 문장에서 단서를 찾는다',
        '구체적인 그림을 일반적인 뜻으로 바꾼 선택지를 고른다',
        '고른 선택지가 지나친 해석은 아닌지 점검한다',
      ],
      answer: [0, 1, 2, 3, 4],
      explain: '① 비유인지 확인 → ② 글 전체의 주제·대조 구조 → ③ 밑줄 앞뒤 단서 → ④ 일반적인 뜻으로 바꾼 선택지 고르기 → ⑤ 지나친 해석 점검. 큰 그림(주제)을 먼저 잡고 밑줄 주변으로 좁혀 가야, 밑줄 한 문장만 보고 엉뚱한 뜻을 고르는 실수를 막을 수 있습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 3,
      q: '다음 글에서 밑줄 친 부분이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\nMany learners think they know a word once they can match it with its meaning on a list. But a word becomes truly yours only after you have met it in many different sentences, heard how people use it, and tried it in your own speech and writing. Until then, __a word from a list is a stranger you nodded to once__.',
      choices: [
        'Memorizing a word from a list is not truly knowing it.',
        'You should not talk to strangers when you study new words.',
        'Every word on a vocabulary list is useless for learners.',
        'A list is the fastest way to make a new word your own.',
      ],
      answer: 0,
      why: [
        '',
        '낯선 사람(stranger)을 글자 그대로 읽었습니다. 글은 낯선 사람이 아니라 낱말 공부에 관한 것입니다.',
        '본문은 목록만으로는 부족하다고 했지, 목록이 쓸모없다고 하지 않았습니다. 지나친 해석입니다.',
        '본문과 반대입니다. 글쓴이는 목록만으로는 낱말이 "내 것"이 되지 않는다고 말합니다.',
      ],
      hint: '"한 번 고개만 끄덕인 낯선 사람"은 나와 어떤 사이인지 떠올려 보십시오. 그 사람을 "안다"고 할 수 있습니까?',
      explain: '대조 구조: 목록에서 뜻만 짝지은 낱말 ↔ 여러 문장에서 만나고 직접 써 본 낱말(truly yours). 한 번 인사만 나눈 낯선 사람을 "안다"고 할 수 없듯이, **목록으로만 외운 낱말은 아직 제대로 아는 낱말이 아니다**라는 뜻입니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '리더에 관한 글의 밑줄 친 부분(the rails that kept it on track)에 대한 풀이로 가장 알맞은 것은 무엇입니까?\n\n' + LEADER,
      choices: [
        'She quietly guided the team so that it did not lose its direction.',
        'She believed that leaders should never give any orders to the team.',
        'She let the team decide everything because she did not care.',
        'She was the strongest person and pushed the team forward by herself.',
      ],
      answer: 0,
      why: [
        '',
        '글쓴이는 그녀가 말을 적게 했다고 했을 뿐, 리더가 "절대(never)" 지시하면 안 된다는 믿음을 말하지 않았습니다. 지나친 해석입니다.',
        '그녀는 질문하고 귀 기울이며 모두의 목소리를 챙겼습니다. 무관심(did not care)은 본문과 반대입니다.',
        '혼자 앞에서 밀고 나가는 것은 the engine 쪽의 모습입니다. 대조의 반대편입니다.',
      ],
      hint: '선로(rails)는 기차를 끌지 않지만 기차에 무엇을 해 줍니까? 그리고 선택지에 본문보다 센 말이 있는지 보십시오.',
      explain: '선로는 힘을 내지는 않지만 기차가 길에서 벗어나지 않게 합니다. 주장은 질문하고 듣고 모두의 말을 챙겨, 어려움이 닥쳤을 때 팀이 이미 서로 믿고 **갈 곳을 알게(knew where we were going)** 했습니다. 그래서 "조용히 팀이 방향을 잃지 않게 이끌었다"가 알맞습니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 1,
      q: '다음 글에서 밑줄 친 부분이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\nFor many years, schools tried to give students a detailed list of correct answers for every situation they might face. But the world now changes faster than any such list can be rewritten. Jobs appear and disappear, and tools we use today may be gone in ten years. What young people need is not a printed map of roads that may soon be closed, but __a compass that works on any road__.',
      choices: [
        'the ability to find their own way in new situations',
        'a device that shows which direction is north',
        'a fixed list of answers that never needs to change',
        'a plan to travel to as many places as they possibly can',
      ],
      answer: 0,
      why: [
        '',
        '나침반(compass)을 글자 그대로 읽었습니다. 글은 교육과 변화하는 세상에 관한 것입니다.',
        '정해진 답의 목록은 글쓴이가 맞세운 map 쪽입니다. 정반대를 골랐습니다.',
        '길(road)을 글자 그대로 여행으로 읽었습니다. 여행 이야기는 본문에 없습니다.',
      ],
      hint: '글에서 map(지도)과 compass(나침반)가 각각 무엇과 짝을 이루는지 먼저 정하십시오.',
      explain: '대조 구조: **a printed map**(곧 닫힐지도 모르는 길의 지도) = 상황마다 정해 준 정답 목록 ↔ **a compass that works on any road** = 어떤 상황에서도 스스로 방향을 찾는 판단력. 세상이 빨리 바뀌므로 정답 목록보다 **스스로 판단해 길을 찾는 능력**이 필요하다는 뜻입니다.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 2,
      q: '다음 글에서 밑줄 친 부분의 뜻을 푸는 데 **가장 직접적인 단서**가 되는 문장은 무엇입니까?\n\n(A) Some towns try to attract visitors by building huge new attractions. (B) These projects cost a lot, and they often look the same as attractions in other towns. (C) A town like that is __wearing someone else\'s face__. (D) The towns that people remember best are usually the ones that kept their old markets, narrow streets, and local festivals.',
      choices: ['(A)', '(B)', '(D)'],
      fixed: true,
      answer: 1,
      why: [
        '(A)는 화제(큰 관광 시설로 손님 끌기)를 꺼낼 뿐, "남의 얼굴"이 무엇인지 직접 말하지 않습니다.',
        '',
        '(D)는 글쓴이가 고르는 쪽(자기만의 모습을 지킨 마을)을 보여 주어 대조를 완성하지만, "남의 얼굴"이 무엇인지 직접 풀어 주는 문장은 아닙니다.',
      ],
      hint: '"someone else\'s face(남의 얼굴)"와 같은 대상을 평범한 말로 가리킨 문장을 찾으십시오.',
      explain: '(B)의 they often **look the same as attractions in other towns**(다른 마을의 시설과 똑같아 보인다)가 **someone else\'s face**(남의 얼굴)와 짝을 이룹니다. 밑줄은 "다른 마을을 따라 하면 자기만의 개성을 잃는다"는 뜻이고, (D)는 그와 맞서는 쪽을 보여 줍니다.',
    },
    {
      id: 'a5', level: 3, type: 'ox', concept: 0,
      q: '다음 글의 밑줄 친 부분은 글자 그대로의 뜻으로 쓰였다.\n\nThe hikers had walked for six hours when the storm began. With the bridge washed away, the trail now stopped at the edge of the river, and the only path behind them was covered by fallen rocks. They had __reached a dead end__, so they set up their tent and waited for the rescue team.',
      answer: true,
      explain: '다리가 떠내려가 길이 강가에서 끊겼고, 뒤의 길은 돌로 막혔습니다. 등산객들은 **실제로 더 갈 길이 없는 곳**에 이르렀으므로 밑줄 친 부분(reached a dead end)은 글자 그대로의 뜻입니다. 실험실 글에서는 비유였지만, 같은 표현도 문맥에 따라 판단이 달라집니다.',
    },
  ],

  deeper: [
    {
      title: '관용 표현과 새로 만든 비유',
      body: 'break the ice, a piece of cake 같은 **관용 표현**은 사전에 뜻이 실려 있어 외워 두면 바로 풀 수 있습니다. 그러나 함축 의미 문제에 나오는 밑줄은 대부분 글쓴이가 그 글을 위해 **새로 만든 비유**입니다. "벽돌만 모으고 벽은 쌓지 않는다", "선로 같은 리더"는 어느 사전에도 없습니다.\n\n' +
        '그래서 이 유형은 낱말 실력보다 **글 전체를 읽는 힘**을 봅니다. 글쓴이가 무엇을 주장하는지, 무엇과 무엇을 맞세우는지, 비유 속 낱말이 본문의 어떤 낱말과 짝인지를 차례로 따지면, 처음 보는 비유도 풀 수 있습니다.\n\n' +
        '거꾸로 생각해 보면, 좋은 글쓴이는 추상적인 주장을 **눈에 그려지는 그림**으로 바꾸어 독자의 기억에 남깁니다. 이 단원에서 익힌 "그림 ↔ 일반적인 뜻" 바꾸기는 앞으로 영어 글을 쓸 때 내 주장을 인상적으로 표현하는 데에도 쓸 수 있습니다.',
    },
    {
      title: '같은 그림, 다른 뜻',
      body: '비유는 문화와 문맥에 따라 다른 뜻을 가질 수 있습니다. 예를 들어 "길(road)"은 한 글에서는 **인생**을, 다른 글에서는 **해결 방법**을, 또 다른 글에서는 **배움의 과정**을 뜻할 수 있습니다.\n\n' +
        '- The road to the final was long. → 결승까지 가는 **과정**\n' +
        '- There is more than one road to a solution. → 해결에 이르는 **방법**\n\n' +
        '그래서 "길(road)은 늘 인생을 뜻한다"처럼 비유의 뜻을 하나로 외우는 것은 위험합니다. 비유의 뜻은 낱말이 아니라 **그 글**이 정합니다. 함축 의미를 풀 때 언제나 본문의 단서로 돌아가야 하는 까닭입니다.',
    },
  ],

  faq: [
    {
      q: '밑줄 친 표현이 관용어인데 뜻을 모르면 어떻게 해요?',
      a: '함축 의미 문제의 밑줄은 대부분 사전에 없는 새 비유라서, 뜻을 미리 알고 있어야 풀리는 문제가 아닙니다. 앞뒤 문장에서 같은 대상을 평범한 말로 가리킨 곳을 찾고, 글의 주제와 대조 구조 속에서 그 표현이 어느 쪽에 있는지 정하면 풀 수 있습니다. 관용어라도 이 방법은 똑같이 통합니다.',
    },
    {
      q: '선택지 두 개가 다 맞는 것 같아요. 어떻게 골라요?',
      a: '대개 하나는 본문과 정확히 같은 범위이고, 다른 하나는 조금 더 넓거나 세게 말한 것입니다. always, never, all, only, completely 같은 낱말이 있는지, 본문에 없는 내용(돈, 직업, 건강 등)이 덧붙지 않았는지 보십시오. 두 선택지를 밑줄 자리에 차례로 넣어 읽어 보는 것도 좋은 방법입니다.',
    },
    {
      q: '본문에 나온 낱말이 많이 들어 있는 선택지가 정답 아닌가요?',
      a: '오히려 반대일 때가 많습니다. 비유 속 낱말(lens, bricks, door)을 그대로 쓴 선택지는 그 낱말을 글자 그대로 읽게 만드는 함정인 경우가 흔합니다. 정답은 같은 뜻을 다른 낱말로 바꿔 말한(일반화한) 문장인 경우가 많습니다.',
    },
  ],

  mistakes: [
    '비유를 글자 그대로 읽는 실수 — the eye matters more than the lens(렌즈보다 눈이 중요하다)를 "눈 건강이 중요하다"로 읽는 것처럼. 글의 화제(사진 기술)에 시력 이야기가 없다는 것부터 확인하십시오.',
    '대조 구조에서 반대쪽을 고르는 실수 — 엔진(engine)과 선로(rails)처럼 두 비유가 함께 나오면, 밑줄이 그어진 쪽이 어느 것인지 다시 확인하십시오.',
    '방향은 맞지만 너무 멀리 간 선택지를 고르는 실수 — "덜 중요하다"를 "해롭다", "~할 수도 있다"를 "절대 ~하면 안 된다"로 바꾼 선택지는 지나친 해석입니다.',
  ],

  gens: [
    {
      id: 'literal-or-figurative',
      level: 1,
      title: '밑줄 친 표현: 비유인가, 글자 그대로인가',
      make: function (R) {
        // [문장, 비유이면 true, 해설]
        var items = [
          ['The children __broke the ice__ on the pond to see the fish.', false, '연못에 실제 얼음이 있으므로 글자 그대로 "얼음을 깼다"입니다.'],
          ['Minsu __broke the ice__ at the party by telling a joke.', true, '파티에는 깰 얼음이 없습니다. 농담으로 어색한 분위기를 깼다는 비유입니다.'],
          ['After the earthquake, there was __a deep crack__ in the wall of the school.', false, '지진 뒤 학교 벽에 실제로 금이 갔다는 뜻입니다.'],
          ['The argument left __a deep crack__ in their friendship.', true, '우정에 실제 금이 갈 수는 없습니다. 다툼으로 관계가 틀어졌다는 비유입니다.'],
          ['Jia has __a heart of gold__; she always helps her neighbors.', true, '금으로 된 심장이 아니라 매우 착하고 너그러운 마음씨를 뜻하는 비유입니다.'],
          ['The museum shows a crown made of __pure gold__.', false, '박물관에 실제 금으로 만든 왕관이 있다는 뜻입니다.'],
          ['When the test results came out, Doyun was __on cloud nine__.', true, '실제로 구름 위에 있는 것이 아니라 몹시 기뻤다는 관용 표현입니다.'],
          ['The plane flew __above the clouds__ for most of the trip.', false, '비행기는 실제로 구름 위를 날 수 있으므로 글자 그대로입니다.'],
          ['Her words were __a light in the darkness__ during that hard year.', true, '말이 실제 빛이 될 수는 없습니다. 힘든 때에 희망과 위로가 되었다는 비유입니다.'],
          ['During the blackout, the candle was __the only light in the darkness__.', false, '정전 때 촛불이 실제로 어둠 속 유일한 빛이었다는 뜻입니다.'],
          ['The new manager wanted to __plant the seeds__ of change in the company.', true, '회사에 씨앗을 심는 것이 아니라 변화의 시작을 마련한다는 비유입니다.'],
          ['In spring, the farmers __plant the seeds__ in the field.', false, '농부가 실제로 밭에 씨앗을 심는다는 뜻입니다.'],
          ['Reading that book __opened a door__ to a new world of science for Sua.', true, '책이 문을 연 것이 아니라 새로운 관심과 기회를 열어 주었다는 비유입니다.'],
          ['The wind was so strong that it __opened the door__ of the classroom.', false, '센 바람이 실제로 교실 문을 열었다는 뜻입니다.'],
          ['Many students feel that the exam season is __a long, dark tunnel__.', true, '시험 기간이 실제 터널이 아니라 끝이 안 보이게 힘든 시기라는 비유입니다.'],
          ['The train passed through __a long, dark tunnel__ under the mountain.', false, '기차가 실제로 산 아래 터널을 지났다는 뜻입니다.'],
          ['With the deadline tomorrow, the team was __racing against the clock__.', true, '시계와 경주하는 것이 아니라 시간에 쫓기며 서둘렀다는 비유입니다.'],
          ['The runner __checked the clock__ on the wall before the race.', false, '선수가 실제로 벽시계를 보았다는 뜻입니다.'],
          ['The teacher\'s advice was __a key that unlocked__ the difficult problem.', true, '조언이 열쇠가 아니라 어려운 문제를 푸는 실마리가 되었다는 비유입니다.'],
          ['Hayun found __a key that unlocked__ the old wooden box.', false, '하윤이 실제로 상자를 여는 열쇠를 찾았다는 뜻입니다.'],
          ['For the lonely new student, the library became __a warm harbor__.', true, '도서관은 항구가 아닙니다. 외로운 학생에게 마음 편히 머무는 피난처가 되었다는 비유입니다.'],
          ['The fishing boats returned to __the harbor__ before the storm.', false, '배가 실제 항구로 돌아왔다는 뜻입니다.'],
        ];
        var it = R.pick(items);
        return {
          type: 'ox', concept: 0,
          q: '다음 문장에서 밑줄 친 부분은 **비유적으로** 쓰였다.\n\n' + it[0],
          answer: it[1],
          explain: (it[1] ? '맞습니다(비유). ' : '아닙니다(글자 그대로). ') + it[2] + ' 글자 그대로 읽어서 문맥과 어긋나는지가 판단의 기준입니다.',
        };
      },
    },
    {
      id: 'general-meaning',
      level: 2,
      title: '비유를 일반적인 뜻으로 바꾸기',
      make: function (R) {
        // [글, 밑줄 표현, 정답, [글자 그대로 읽은 오답, 지나친 해석 오답, 반대 뜻 오답], 해설]
        var items = [
          ['A good coach does not carry the players to the finish line. Instead, she gives them the skills and confidence to run on their own. In the end, she is __a ladder, not an elevator__.',
            'a ladder, not an elevator',
            'someone who helps others rise by their own effort',
            ['a person who repairs ladders and elevators', 'someone who refuses to help anyone at all', 'someone who lifts others up without any effort from them'],
            '엘리베이터는 가만히 있어도 올려 주지만, 사다리는 스스로 올라야 합니다. 선수가 스스로 달릴 힘을 길러 주는 코치를 그린 비유입니다.'],
          ['Some people answer every message the second it arrives. They feel busy all day, but at night they find that their important work has not moved forward. They have been __rowing hard in circles__.',
            'rowing hard in circles',
            'working busily without making real progress',
            ['enjoying a long boat trip around a quiet lake', 'never doing any work at all', 'finishing important work quickly and well'],
            '힘껏 노를 젓지만 제자리를 돈다는 그림은 "바쁘게 일하지만 실제로는 나아가지 못한다"는 뜻입니다. 단서: important work has not moved forward.'],
          ['When Minsu joined the team, he did not know anyone. He listened more than he talked and helped others without being asked. Within a month, he had become __the glue of the team__.',
            'the glue of the team',
            'the person who holds the members together',
            ['the person who buys supplies for the team', 'the only person the team needs to win', 'the person who causes fights in the team'],
            '풀(glue)은 따로 떨어진 것을 붙여 줍니다. 듣고 돕는 민수가 팀원들을 하나로 묶어 주는 사람이 되었다는 뜻입니다.'],
          ['Our town spent years planning a new sports center but never decided where to build it. Every meeting ended with another report and no action. The project became __a ship that never left the harbor__.',
            'a ship that never left the harbor',
            'a plan that never moved beyond talk',
            ['a boat that was kept in the town\'s port', 'a plan that will surely fail in every town', 'a project that was finished ahead of schedule'],
            '항구를 떠나지 못한 배 = 계획만 하고 실행되지 못한 사업입니다. 단서: Every meeting ended with … no action.'],
          ['Many people think a strong argument needs loud words and many examples. But one clear piece of evidence often persuades better than ten weak ones. In debate, __a sharp knife beats a heavy hammer__.',
            'a sharp knife beats a heavy hammer',
            'one clear point beats many weak ones',
            ['knives are more useful tools than hammers', 'examples should never be used in a debate', 'the louder speaker always wins the debate'],
            '날카로운 칼(정확한 근거 하나)과 무거운 망치(시끄러운 말·약한 예 여러 개)를 맞세운 비유입니다. 단서: one clear piece of evidence often persuades better than ten weak ones.'],
          ['Jiwoo practiced the violin for only ten minutes a day, but she never skipped a day. After two years, she could play pieces that once seemed impossible. Her progress was __a river cutting through stone__.',
            'a river cutting through stone',
            'small efforts that add up to great change over time',
            ['water slowly damaging the rocks near a river', 'proof that ten minutes a day is the only way to learn', 'a sudden success that came without practice'],
            '강물은 한 번에 돌을 깎지 못하지만 오래 흐르면 바위를 가릅니다. 매일 조금씩 한 연습이 쌓여 큰 발전이 되었다는 뜻입니다.'],
          ['Some apps promise to teach you a language in a week. They give you a few phrases that work at a hotel desk, but not much more. That kind of learning is __a paper umbrella in a storm__.',
            'a paper umbrella in a storm',
            'a quick solution that fails when it is really needed',
            ['an umbrella that is made out of thin paper', 'a learning method that is useless in every situation', 'a strong tool that can handle any problem'],
            '종이 우산은 맑을 때는 그럴듯하지만 폭풍 속에서는 쓸모가 없습니다. 쉬운 상황(hotel desk)에서만 통하고 정말 필요할 때 버티지 못하는 배움이라는 뜻입니다.'],
          ['Before the festival, every class wanted the biggest stage and the loudest music. Our class chose a small corner and simply invited visitors to sit and talk. In the noisy festival, our corner was __a quiet island__.',
            'a quiet island',
            'a calm spot apart from the noise',
            ['a small piece of land in the middle of the sea', 'a place where nobody was allowed to talk', 'the loudest and busiest stage at the festival'],
            '시끄러운 축제(바다) 속에서 조용히 앉아 이야기하는 구석(섬)이라는 대조입니다. 섬은 주변과 떨어져 있는 차분한 곳을 그립니다.'],
          ['Some leaders change their opinion whenever the crowd changes its mood. People cheer them for a while, but nobody knows what they really stand for. Such leaders are __weather vanes, not compasses__.',
            'weather vanes, not compasses',
            'people who follow the crowd, not principles',
            ['tools that measure wind and find directions', 'leaders who are always wrong about every issue', 'leaders who keep the same view whatever happens'],
            '풍향계는 바람이 바뀔 때마다 방향을 바꾸고, 나침반은 늘 같은 쪽을 가리킵니다. 사람들의 기분에 따라 의견을 바꾸는 리더를 그린 비유입니다.'],
          ['Hana used to read only the first lines of news articles and share them right away. Later she learned that the full stories often said something quite different. Reading only the headline is __judging a meal by its menu__.',
            'judging a meal by its menu',
            'judging without knowing the whole story',
            ['choosing food at a restaurant by reading the menu', 'never trusting any news article again', 'reading every detail before forming an opinion'],
            '메뉴판만 보고 음식 맛을 판단하는 것 = 전체 내용을 모른 채 겉만 보고 판단하는 것입니다. 단서: the full stories often said something quite different.'],
        ];
        var types = ['비유 속 낱말을 글자 그대로 읽었습니다. 글의 화제와 맞지 않습니다.', '방향은 비슷하지만 본문보다 범위를 넓히거나 세게 말한 지나친 해석입니다.', '본문이 말하는 쪽과 정반대 뜻입니다. 대조 구조에서 반대편을 골랐습니다.'];
        var it = R.pick(items);
        var correct = it[2];
        var reason = {};
        it[3].forEach(function (w, i) { reason[w] = types[i]; });
        var pick = R.choices(correct, it[3]);
        return {
          type: 'choice', concept: 3,
          q: '다음 글에서 밑줄 친 부분이 의미하는 바로 가장 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c]; }),
          explain: it[4] + '\n\n정답: ' + correct,
        };
      },
    },
  ],

  vocab: [
    { w: 'literal', m: '글자 그대로의', ex: 'The literal meaning of "break the ice" is to crack frozen water.', exm: '"얼음을 깨다(break the ice)"의 글자 그대로의 뜻은 언 물을 깨는 것입니다.' },
    { w: 'figurative', m: '비유적인', ex: 'In this story, the word "storm" is used in a figurative sense.', exm: '이 이야기에서 "폭풍"이라는 낱말은 비유적인 뜻으로 쓰였습니다.' },
    { w: 'imply', m: '넌지시 나타내다, 함축하다', ex: 'Her short answer implied that she was upset.', exm: '그녀의 짧은 대답은 그녀가 속상하다는 것을 넌지시 보여 주었습니다.' },
    { w: 'metaphor', m: '은유', ex: 'The writer uses a ship as a metaphor for the whole team.', exm: '글쓴이는 배를 팀 전체에 대한 은유로 씁니다.' },
    { w: 'interpret', m: '해석하다', ex: 'Readers may interpret the ending in different ways.', exm: '독자들은 결말을 서로 다르게 해석할 수 있습니다.' },
    { w: 'context', m: '문맥, 맥락', ex: 'You can often guess a new word from its context.', exm: '새 낱말의 뜻은 문맥으로 짐작할 수 있는 경우가 많습니다.' },
    { w: 'contrast', m: '대조; 대조하다', ex: 'The writer contrasts loud leaders with quiet ones.', exm: '글쓴이는 목소리 큰 리더와 조용한 리더를 대조합니다.' },
    { w: 'clue', m: '단서, 실마리', ex: 'The next sentence gives a clue to the meaning.', exm: '다음 문장이 뜻에 대한 단서를 줍니다.' },
    { w: 'equipment', m: '장비', ex: 'Good equipment helps, but skill matters more.', exm: '좋은 장비는 도움이 되지만 기술이 더 중요합니다.' },
    { w: 'wander', m: '(생각이) 떠돌다, 거닐다', ex: 'My mind began to wander during the long ride.', exm: '오래 차를 타는 동안 내 생각이 이리저리 떠돌기 시작했습니다.' },
    { w: 'dead end', m: '막다른 길; 더 나아갈 수 없는 상태', ex: 'The plan turned out to be a dead end.', exm: '그 계획은 더 나아갈 수 없는 것으로 드러났습니다.' },
    { w: 'abstract', m: '추상적인', ex: 'Freedom is an abstract idea, so writers often explain it with pictures.', exm: '자유는 추상적인 개념이라 글쓴이들은 흔히 그림 같은 표현으로 설명합니다.' },
    { w: 'concrete', m: '구체적인', ex: 'Please give me a concrete example.', exm: '구체적인 예를 하나 들어 주십시오.' },
    { w: 'overgeneralize', m: '지나치게 일반화하다', ex: 'Do not overgeneralize from one bad experience.', exm: '한 번의 나쁜 경험으로 지나치게 일반화하지 마십시오.' },
    { w: 'on track', m: '제대로 진행 중인, 궤도에 오른', ex: 'The project is back on track after a slow start.', exm: '그 사업은 더디게 시작했지만 다시 제대로 진행되고 있습니다.' },
  ],
});
})();
