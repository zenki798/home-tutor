/* 영어Ⅰ · 빈칸 추론 기초
 * 지문·예문은 모두 직접 쓴 글이다(가상의 인물). */
(function () {
  // 가르치며 배우기 (주제문 빈칸, 직접 쓴 글)
  var TEACH = '___ is one of the best ways to learn something deeply. When you explain a new idea to a friend, you have to organize what you know in a clear order. If your friend asks a question you cannot answer, you discover a gap in your understanding. In this way, the person who explains often learns more than the person who listens.';
  // 겨울잠 (재진술, 직접 쓴 글)
  var BEARS = 'Some animals survive the cold winter by ___. Bears, for example, eat a lot in the fall and then sleep for months in their dens. Their hearts beat more slowly, and their bodies use very little energy. In other words, they save their strength until spring arrives.';
  // 흙 (대조, 직접 쓴 글)
  var SOIL = 'Many people think that plants need only water and sunlight to grow well. However, ___ is just as important. Without enough nutrients in it, a plant grows slowly and its leaves turn yellow, no matter how much water and light it gets.';
  // 개와 고양이 (unlike, 직접 쓴 글)
  var CATS = 'Unlike dogs, cats are often ___. A dog usually follows its owner from room to room and waits by the door. A cat, on the other hand, is happy to spend hours alone and comes to people only when it wants to.';
  // 화를 다스리기 (instead, 직접 쓴 글)
  var ANGRY = 'When Jia gets angry, she does not shout at others. Instead, she ___. She takes a walk around the park or writes down her feelings in a notebook. By the time she comes back, she can talk about the problem calmly.';
  // 비닐봉지 (낱말 빈칸, 직접 쓴 글)
  var BAGS = 'Plastic bags are cheap and convenient, but they cause serious problems. They take a very long time to break down, and many end up in the ocean, where sea animals mistake them for food. For this reason, some cities ___ the use of plastic bags.';
  // 아침밥 (확인하기, 직접 쓴 글)
  var BREAKFAST = 'Breakfast gives the body energy after a long night without food. Students who eat breakfast often find it easier to focus during morning classes. This does not mean that a big meal is necessary; a piece of fruit or a glass of milk can ___.';
  // 시련과 강함 (끝의 주제문 빈칸, 직접 쓴 글)
  var STRONG = 'A tree that grows in a windy place develops strong roots to hold itself up. A muscle that is used every day becomes stronger. Even our minds grow sharper when we work on difficult problems. In each case, ___ is what makes something strong.';
  // 잘 듣기 (재진술 That is, 직접 쓴 글)
  var LISTEN = 'Good listeners do more than stay quiet while others talk. They look at the speaker, nod, and ask questions about what they have heard. That is, good listening is an ___ process, not a passive one.';
  // 습관과 에너지 (본문에서 찾기, 직접 쓴 글)
  var HABIT = 'Thinking carefully about every small choice takes a lot of mental energy. That is why our brains depend on habits. Once an action becomes a habit, we can do it without deciding each step. You do not have to think about how to brush your teeth or tie your shoes. In this way, habits save our ___ for more important decisions.';
  // 피아노 연습 (심화, 직접 쓴 글)
  var PIANO = 'When learning a difficult song on the piano, many beginners play it at full speed again and again, hoping it will eventually sound right. Experienced teachers suggest the opposite. They advise students to play the hardest parts slowly, paying attention to every note. Once the fingers learn the correct movements, the speed can be raised little by little. In music, as in many other skills, ___.';
  // 실수를 대하는 태도 (심화, 직접 쓴 글)
  var MISTAKE = 'Some people see mistakes as signs of failure, so they try to (A) them at all costs. Others, however, treat mistakes as (B). For them, each mistake shows exactly what to practice next.';
  // 백과사전 (심화, 직접 쓴 글)
  var ENCY = 'Unlike a printed encyclopedia, an online encyclopedia can be updated at any moment. When something new is discovered, the information can be changed within minutes rather than ___. This speed is useful, but it also means that readers should check whether the information comes from a reliable source.';
  // 발표 (심화, 직접 쓴 글)
  var SPEECH = 'Some people think that ___ is the key to a good presentation, so they try to memorize every word of their script. However, a presentation that is learned word for word often sounds stiff and unnatural. Skilled speakers prepare their main points carefully but leave room to speak freely. Their talks feel natural because they are not tied to a script.';

  // 대조·재진술 생성기: [문장, 정답, [[오답, 까닭], …], 개념 카드(1 재진술 · 2 대조)]
  var CUES = [
    ['The test looked easy at first. However, it turned out to be quite ___.', 'difficult', [
      ['simple', 'However 뒤에는 앞(쉬워 보였다)과 반대되는 내용이 와야 합니다. simple 역시 easy와 같은 방향입니다.'],
      ['short', '길이는 "쉬워 보였다"와 반대되는 말이 아닙니다. 쉬움의 반대를 찾아야 합니다.'],
      ['colorful', '앞 문장과 관계없는 말입니다. However는 앞 내용과 반대되는 말을 예고합니다.'],
    ], 2],
    ['Minsu is usually very talkative. Today, however, he was unusually ___.', 'quiet', [
      ['noisy', '평소 말이 많다는 앞 내용과 같은 방향입니다. however와 unusually는 평소와 반대를 예고합니다.'],
      ['cheerful', '쾌활함은 말이 많은 것과 반대가 아닙니다. 평소와 다른 모습, 곧 말이 많지 않은 모습이 필요합니다.'],
      ['hungry', '앞 문장(말이 많다)과 대조를 이루지 않는 말입니다.'],
    ], 2],
    ['Unlike her older sister, who loves sports, Hayun prefers ___ activities like reading and drawing.', 'quiet', [
      ['outdoor', 'Unlike는 언니와 반대되는 모습을 예고합니다. 야외 활동은 운동을 좋아하는 언니 쪽에 가깝고, 뒤의 예(독서·그리기)와도 맞지 않습니다.'],
      ['competitive', '경쟁하는 활동은 운동에 가깝습니다. 뒤의 예(독서·그리기)를 보면 조용한 활동입니다.'],
      ['dangerous', '뒤의 예인 독서와 그리기는 위험한 활동이 아닙니다.'],
    ], 2],
    ['Instead of taking the elevator, Doyun ___ to the fifth floor.', 'climbed the stairs', [
      ['rode the elevator', 'Instead of(~하는 대신에)는 엘리베이터와 다른 방법을 예고합니다. 같은 방법을 다시 말하면 안 됩니다.'],
      ['pressed the button', '버튼을 누르는 것은 엘리베이터를 타는 방법입니다. 엘리베이터 대신 쓴 방법을 찾아야 합니다.'],
      ['sent a message', '5층까지 가는 방법이 아닙니다. 빈칸 뒤 to the fifth floor와 이어지지 않습니다.'],
    ], 2],
    ['The museum is open every day except Monday. In other words, it is ___ on Mondays.', 'closed', [
      ['open', 'In other words는 앞 내용을 다시 말합니다. 월요일을 빼고 연다는 것은 월요일에는 닫는다는 뜻입니다.'],
      ['crowded', '붐비는지는 앞 문장에 나오지 않습니다. 재진술은 앞 내용을 다른 말로 옮긴 것이어야 합니다.'],
      ['free', '입장료 이야기는 앞 문장에 없습니다.'],
    ], 1],
    ['Seojun never gives up, even when a problem seems impossible. In other words, he is very ___.', 'determined', [
      ['lazy', '절대 포기하지 않는다는 앞 내용과 반대입니다. In other words 뒤에는 같은 뜻이 와야 합니다.'],
      ['careless', '부주의함은 "포기하지 않는다"를 다시 말한 것이 아닙니다.'],
      ['shy', '수줍음은 앞 문장에 나오지 않는 내용입니다.'],
    ], 1],
    ['This medicine must be kept away from heat. That is, you should store it in a ___ place.', 'cool', [
      ['warm', 'That is는 앞 내용을 다시 말합니다. 열을 피하라고 했으니 따뜻한 곳은 반대입니다.'],
      ['sunny', '햇빛이 드는 곳은 뜨거워질 수 있습니다. 열을 피하라는 앞 내용과 맞지 않습니다.'],
      ['noisy', '소음은 열과 관계가 없습니다. 앞 내용을 다시 말한 것이 아닙니다.'],
    ], 1],
    ['Many people think tomatoes are vegetables. However, scientists classify them as ___.', 'fruits', [
      ['vegetables', 'However 뒤에는 많은 사람의 생각과 반대되는 내용이 와야 합니다. 같은 말을 되풀이하면 대조가 되지 않습니다.'],
      ['flowers', '토마토는 꽃이 아닙니다. 꽃이 진 뒤 씨를 품고 자라는 부분이라 열매(fruit)로 분류합니다.'],
      ['roots', '토마토는 땅속의 뿌리가 아닙니다. 줄기에 열리는 열매입니다.'],
    ], 2],
    ['At first, the new rule seemed unfair to many students. Later, however, most of them found it quite ___.', 'reasonable', [
      ['unfair', '처음 생각(불공평하다)과 같은 말입니다. however는 생각이 바뀌었음을 알립니다.'],
      ['unjust', '불공평하다는 처음 생각과 같은 방향입니다. however 뒤에는 반대 방향이 와야 합니다.'],
      ['confusing', '헷갈린다는 말은 "불공평하다"와 반대가 아닙니다.'],
    ], 2],
    ['Unlike most birds, penguins cannot ___.', 'fly', [
      ['swim', '펭귄은 헤엄을 아주 잘 칩니다. 다른 새들과 달리 펭귄이 못 하는 것을 찾아야 합니다.'],
      ['lay eggs', '펭귄도 다른 새처럼 알을 낳습니다. Unlike는 다른 새와 다른 점을 예고합니다.'],
      ['eat fish', '펭귄은 물고기를 먹습니다. 펭귄이 할 수 없는 일을 찾아야 합니다.'],
    ], 2],
    ['Bats are active at night. During the day, on the other hand, they ___.', 'rest in dark places', [
      ['hunt for insects', 'on the other hand는 밤과 반대인 낮의 모습을 예고합니다. 벌레 사냥은 밤에 활발할 때의 모습입니다.'],
      ['fly around actively', '낮에는 밤과 반대의 모습이어야 합니다. 활발히 날아다니는 것은 밤의 모습과 같습니다.'],
      ['wake up', '깨어나는 것은 활동을 시작하는 모습입니다. 밤에 활동하는 박쥐가 낮에 하는 일과 반대입니다.'],
    ], 2],
    ['Rather than buying a new bike, Doyun decided to ___ his old one.', 'repair', [
      ['throw away', '새 자전거를 사지 않기로 했는데 헌 자전거까지 버리면 탈 자전거가 없습니다. rather than은 "새로 사는 것" 대신 고른 방법을 예고합니다.'],
      ['lose', '잃어버리는 것은 일부러 고르는 방법이 아닙니다.'],
      ['hide', '숨기는 것은 새 자전거를 사는 일을 대신하는 방법이 아닙니다.'],
    ], 2],
    ['Some students study best in a quiet library. Others, however, focus better in a ___ café.', 'lively', [
      ['quiet', 'however는 앞 학생들과 다른 모습을 예고합니다. 조용한 곳은 앞 내용과 같습니다.'],
      ['silent', '조용한 곳은 도서관을 좋아하는 학생들과 같은 쪽입니다. 반대를 찾아야 합니다.'],
      ['closed', '문 닫은 카페에서는 공부를 할 수 없습니다.'],
    ], 2],
    ['Water boils at 100°C at sea level. On a high mountain, by contrast, it boils at a ___ temperature.', 'lower', [
      ['higher', '높은 산에서는 공기의 압력이 낮아 물이 더 낮은 온도에서 끓습니다.'],
      ['the same', 'by contrast는 앞과 다른 점을 예고합니다. 같은 온도라면 대조가 되지 않습니다.'],
      ['perfect', '온도를 "완벽한"으로 꾸미면 앞 문장과 대조를 이루지 않습니다.'],
    ], 2],
    ['Jia was nervous before the speech. Once she started talking, though, she felt ___.', 'calm', [
      ['nervous', 'though는 앞(긴장했다)과 다른 내용을 예고합니다. 같은 말을 되풀이하면 대조가 되지 않습니다.'],
      ['worried', '걱정은 긴장과 같은 방향입니다. 반대되는 마음을 찾아야 합니다.'],
      ['scared', '겁먹은 마음은 긴장과 같은 방향입니다.'],
    ], 2],
    ['Seojun spends money carefully. In other words, he is ___ with money.', 'careful', [
      ['wasteful', '돈을 낭비하는 것은 신중하게 쓴다는 앞 내용과 반대입니다.'],
      ['generous', '남에게 잘 베푸는 것은 "신중하게 쓴다"를 다시 말한 것이 아닙니다.'],
      ['rich', '부자인지는 앞 문장에 나오지 않습니다. 쓰는 방식을 다시 말해야 합니다.'],
    ], 1],
    ['The first part of the movie was slow. The ending, however, was full of ___.', 'excitement', [
      ['boredom', '지루함은 느리다는 앞 내용과 같은 방향입니다. however 뒤에는 반대가 와야 합니다.'],
      ['silence', '조용함은 느린 앞부분과 대조를 이루지 않습니다.'],
      ['sleepiness', '졸림은 느린 영화에 어울리는 말이라 대조가 되지 않습니다.'],
    ], 2],
    ['Some people think that paper books are old-fashioned. However, many readers still find them ___.', 'enjoyable', [
      ['outdated', '구식이라는 앞 생각과 같은 말입니다. However 뒤에는 반대 생각이 와야 합니다.'],
      ['useless', '쓸모없다는 말은 앞 생각과 같은 부정적인 방향입니다.'],
      ['expensive', '비싸다는 말은 "구식이다"라는 생각을 반박하지 않습니다. 여전히 좋아한다는 긍정의 말이 필요합니다.'],
    ], 2],
    ['This bag looks small. In fact, it can hold ___ things.', 'a surprising number of', [
      ['very few', 'In fact는 겉모습(작아 보인다)과 다른 사실을 예고합니다. 조금밖에 안 들어간다면 겉모습과 같습니다.'],
      ['only a few', '몇 개만 들어간다면 작아 보이는 겉모습과 같은 방향입니다.'],
      ['hardly any', '거의 안 들어간다면 작아 보이는 겉모습과 같은 방향입니다. In fact 뒤에는 겉모습과 다른 사실이 와야 합니다.'],
    ], 2],
    ['The village is far from any city. That is, it is located in a ___ area.', 'remote', [
      ['crowded', '붐비는 곳은 도시에서 멀리 떨어진 마을을 다시 말한 것이 아닙니다.'],
      ['central', '중심에 있다는 것은 "멀리 떨어져 있다"와 반대입니다.'],
      ['busy', '번화하다는 말은 외딴 마을과 맞지 않습니다.'],
    ], 1],
    ['Hayun is not good at drawing. Instead, she is talented at ___.', 'singing', [
      ['drawing', '그리기를 잘하지 못한다고 했으므로 모순입니다. Instead는 다른 분야를 예고합니다.'],
      ['sketching', '스케치도 그리기의 하나라 앞 내용과 모순됩니다.'],
      ['drawing pictures', '그림 그리기는 drawing과 같은 활동이라 앞 내용과 모순됩니다.'],
    ], 2],
    ['Unlike his brother, who wakes up early, Minsu often ___.', 'sleeps late', [
      ['gets up early', 'Unlike는 형과 반대되는 모습을 예고합니다. 일찍 일어나는 것은 형과 같습니다.'],
      ['wakes up at dawn', '새벽에 일어나는 것은 형과 같은 모습입니다.'],
      ['rises before sunrise', '해 뜨기 전에 일어나는 것은 형과 같은 모습입니다.'],
    ], 2],
  ];
  // CUES 와 같은 순서의 해설 (단서 + 문장 뜻)
  var CUES_WHY = [
    'However(그러나)가 쉬워 보였다는 앞 내용을 뒤집습니다. "그 시험은 처음에는 쉬워 보였다. 그러나 꽤 어려운 것으로 드러났다."',
    'however와 unusually(평소와 달리)가 평소 모습과 반대를 예고합니다. "민수는 평소에 말이 아주 많다. 그러나 오늘은 평소와 달리 조용했다."',
    'Unlike(~와 달리)가 운동을 좋아하는 언니와 반대되는 모습을 예고하고, 뒤의 예(독서·그리기)가 그 뜻을 보여 줍니다. "운동을 좋아하는 언니와 달리, 하윤이는 독서나 그리기 같은 조용한 활동을 더 좋아한다."',
    'Instead of(~하는 대신에)가 엘리베이터와 다른 방법을 예고합니다. "엘리베이터를 타는 대신, 도윤이는 5층까지 계단으로 올라갔다."',
    'In other words(다시 말하면)가 앞 내용을 다시 말합니다. "그 박물관은 월요일을 빼고 매일 연다. 다시 말하면, 월요일에는 문을 닫는다."',
    'In other words(다시 말하면)가 앞 내용을 다시 말합니다. "서준이는 문제가 불가능해 보여도 절대 포기하지 않는다. 다시 말하면, 의지가 매우 굳다."',
    'That is(곧, 다시 말하면)가 앞 내용을 다시 말합니다. "이 약은 열을 피해 보관해야 한다. 곧, 서늘한 곳에 두어야 한다."',
    'However가 많은 사람의 생각(채소)과 반대되는 내용을 예고합니다. "많은 사람이 토마토를 채소라고 생각한다. 그러나 과학자들은 토마토를 열매(과일)로 분류한다."',
    'however가 처음 생각(불공평하다)이 바뀌었음을 알립니다. "처음에 새 규칙은 많은 학생에게 불공평해 보였다. 그러나 나중에는 대부분이 꽤 합리적이라고 여겼다."',
    'Unlike most birds(대부분의 새와 달리)가 다른 새와 다른 점을 예고합니다. "대부분의 새와 달리, 펭귄은 날지 못한다."',
    'on the other hand(반면에)가 밤과 반대인 낮의 모습을 예고합니다. "박쥐는 밤에 활동한다. 반면에 낮에는 어두운 곳에서 쉰다."',
    'Rather than(~하는 대신)이 새 자전거를 사는 것과 다른 방법을 예고합니다. "새 자전거를 사는 대신, 도윤이는 헌 자전거를 고치기로 했다."',
    'however가 앞 학생들과 다른 모습을 예고합니다. "어떤 학생들은 조용한 도서관에서 가장 잘 공부한다. 그러나 다른 학생들은 활기찬 카페에서 더 잘 집중한다."',
    'by contrast(그에 반해)가 해수면과 다른 점을 예고합니다. "물은 해수면에서 100°C에 끓는다. 그에 반해 높은 산에서는 더 낮은 온도에서 끓는다." 높은 산은 공기의 압력이 낮기 때문입니다.',
    'though(그런데)가 앞의 긴장과 다른 마음을 예고합니다. "지아는 발표 전에 긴장했다. 그런데 말을 시작하자 차분해졌다."',
    'In other words(다시 말하면)가 앞 내용을 다시 말합니다. "서준이는 돈을 신중하게 쓴다. 다시 말하면, 돈에 관해 신중하다."',
    'however가 느린 앞부분과 반대되는 결말을 예고합니다. "그 영화의 앞부분은 느렸다. 그러나 결말은 흥미진진했다."',
    'However가 "종이책은 구식이다"라는 생각과 반대를 예고합니다. "어떤 사람들은 종이책이 구식이라고 생각한다. 그러나 많은 독자는 여전히 종이책을 즐겁게 읽는다."',
    'In fact(실제로는)가 작아 보이는 겉모습과 다른 사실을 예고합니다. "이 가방은 작아 보인다. 실제로는 놀랄 만큼 많은 물건이 들어간다."',
    'That is(곧, 다시 말하면)가 앞 내용을 다시 말합니다. "그 마을은 어느 도시에서도 멀리 떨어져 있다. 곧, 외딴 지역에 있다."',
    'Instead(대신에)가 그리기와 다른 분야를 예고합니다. "하윤이는 그림을 잘 그리지 못한다. 대신 노래에 재능이 있다."',
    'Unlike(~와 달리)가 일찍 일어나는 형과 반대되는 모습을 예고합니다. "일찍 일어나는 형과 달리, 민수는 자주 늦잠을 잔다."',
  ];

Tutor.registerUnit({
  id: 'eng-h-e1-03',
  course: 'eng-h-e1',
  title: '빈칸 추론 기초',
  summary: '빈칸 문장이 글에서 맡은 역할을 파악하고, 앞뒤 단서를 찾아 알맞은 낱말이나 어구를 고릅니다.',
  goals: [
    '빈칸 문장이 주제문인지 세부 문장인지 파악할 수 있다.',
    '빈칸 내용을 다시 말하는 재진술 단서를 찾을 수 있다.',
    '대조 단서(however, instead, unlike)를 보고 반대 내용을 추론할 수 있다.',
    '고른 답을 빈칸에 넣어 다시 읽고 흐름에 맞는지 확인할 수 있다.',
  ],
  standards: ['[12영Ⅰ-01-04]', '[12영Ⅰ-01-05]'],

  concepts: [
    {
      title: '빈칸 문장의 역할부터 파악하기',
      body: '빈칸 문제는 무턱대고 선택지를 넣어 보기 전에 **빈칸 문장이 글에서 어떤 역할을 하는지**부터 봅니다.\n\n' +
        '| 빈칸 문장 | 자리·특징 | 채우는 방법 |\n|---|---|---|\n' +
        '| 주제문 | 주로 글의 처음이나 끝. 일반적이고 넓은 말 | 글 전체(모든 예시·근거)를 묶는 요지로 채운다 |\n' +
        '| 세부 문장 | 글의 중간. 예시·근거·구체적 설명 | 바로 앞뒤 문장과 이어지게 채운다 |\n\n' +
        '빈칸이 **주제문**에 있으면 나머지 문장들이 모두 단서입니다. 예시들이 공통으로 말하는 것을 찾아 빈칸에 넣습니다. 빈칸이 **세부 문장**에 있으면 가까운 문장, 특히 연결어(for example, so, however) 앞뒤가 단서입니다.\n\n' +
        '> 💡 첫 문장이 빈칸이고 뒤에 For example, When you …처럼 구체적인 이야기가 이어지면, 빈칸은 그 이야기들을 하나로 묶는 주제문일 가능성이 큽니다.',
      easy: '빈칸 문장이 "우산"인지 "빗방울 하나"인지 먼저 보십시오.\n\n' +
        '우산(주제문)이라면 그 아래의 빗방울(예시) 모두를 덮을 만큼 커야 합니다. 빗방울 하나(세부 문장)라면 바로 옆의 빗방울과 잘 이어지기만 하면 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸이 글의 첫 문장에 있고, 뒤의 문장들이 모두 구체적인 예시입니다. 빈칸에는 무엇이 들어갈 가능성이 가장 큽니까?',
        choices: ['예시들을 하나로 묶는 글의 요지', '바로 뒤 예시 하나의 내용', '글에 나오지 않는 새로운 정보'],
        answer: 0,
        why: [
          '',
          '예시 하나만 담으면 나머지 예시들을 설명하지 못합니다. 첫 문장의 빈칸은 대개 주제문입니다.',
          '빈칸은 글 속 단서로 채웁니다. 글에 없는 정보는 근거가 없습니다.',
        ],
        explain: '처음에 오는 일반적인 문장 뒤에 예시들이 이어지면, 그 첫 문장은 **주제문**입니다. 예시들의 공통점, 곧 글의 요지가 빈칸에 들어갑니다.',
      },
    },
    {
      title: '재진술 단서 찾기',
      body: '글쓴이는 중요한 내용을 **한 번 더 다른 말로** 말하는 경우가 많습니다. 이것을 **재진술**이라고 합니다. 빈칸 내용이 글의 다른 곳에서 다시 나온다면, 그 부분이 가장 확실한 단서입니다.\n\n' +
        '재진술을 알리는 신호:\n\n' +
        '- 연결어: In other words, That is, This means, In short\n' +
        '- 같은 대상을 바꿔 부르는 말: bears → these animals, sleep → rest\n' +
        '- 구체적인 예: 빈칸 뒤 for example의 예가 빈칸의 뜻을 보여 줍니다.\n\n' +
        '예: Some animals survive the cold winter by ___. … In other words, they **save their strength** until spring arrives.\n\n' +
        '마지막 문장이 빈칸 내용을 다시 말해 줍니다. 그래서 빈칸에는 "힘(에너지)을 아끼는 것"과 같은 뜻의 말, 예를 들어 saving energy가 들어갑니다.',
      easy: '친구가 "나 어제 진짜 피곤했어. 다시 말하면, 집에 오자마자 잠들었어."라고 했다면 두 문장은 같은 이야기입니다.\n\n' +
        '영어 글도 같습니다. In other words나 That is 뒤를 읽으면 앞의 빈칸이 무슨 뜻인지 알 수 있습니다. 빈칸의 "쌍둥이 문장"을 찾으십시오.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe town is very quiet at night. In other words, it is ___ after dark.',
        choices: ['peaceful', 'noisy', 'crowded'],
        answer: 0,
        why: [
          '',
          'In other words 뒤에는 앞 내용(밤에 조용하다)과 같은 뜻이 와야 합니다. noisy는 반대입니다.',
          '붐빈다는 말은 조용하다는 앞 내용과 맞지 않습니다.',
        ],
        explain: 'In other words(다시 말하면)는 재진술 신호입니다. "밤에 매우 조용하다"를 다시 말하면 "어두워진 뒤에 평화롭다(peaceful)"입니다.',
      },
    },
    {
      title: '대조 단서로 반대 내용 추론하기',
      body: '**대조 연결어**가 보이면 그 앞과 뒤는 반대 방향입니다. 한쪽을 알면 다른 쪽을 거꾸로 추론할 수 있습니다.\n\n' +
        '| 연결어 | 뜻 | 쓰임 |\n|---|---|---|\n' +
        '| however, but, yet | 그러나 | 앞 문장과 반대 내용 |\n' +
        '| instead (of) | 대신에 | 앞에서 부정한 것 대신 다른 것 |\n' +
        '| unlike | ~와 달리 | 비교 대상과 반대되는 특징 |\n' +
        '| on the other hand, by contrast | 반면에 | 두 대상을 맞세움 |\n' +
        '| rather than | ~보다는, ~ 대신 | 고르지 않은 쪽을 밝힘 |\n\n' +
        '자주 나오는 짜임은 **통념 → 반박**입니다. Many people think … However, ___. 에서 빈칸에는 통념과 반대인 글쓴이의 생각이 들어가고, 이것이 곧 글의 요지가 되는 경우가 많습니다.\n\n' +
        '예: **Unlike** dogs, cats are often ___. A dog follows its owner … A cat, **on the other hand**, is happy to spend hours alone. → 개와 반대되는 특징이므로 independent(독립적인)',
      easy: '대조 연결어는 "방향 전환" 표지판입니다. however를 만나면 차가 반대쪽으로 돈다고 생각하십시오.\n\n' +
        '"많은 사람이 A라고 생각한다. 그러나 ___." 이라면 빈칸은 A의 반대입니다. 표지판 앞을 읽고 방향만 뒤집으면 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nMany people think sharks are a great danger to swimmers. However, most kinds of sharks are actually ___ to people.',
        choices: ['harmless', 'dangerous', 'scary'],
        answer: 0,
        why: [
          '',
          'However 뒤에는 통념(위험하다)과 반대가 와야 합니다. dangerous는 같은 방향입니다.',
          '무섭다는 말도 통념과 같은 방향입니다. 반대를 찾아야 합니다.',
        ],
        explain: '"많은 사람이 상어가 위험하다고 생각한다. **그러나** 대부분의 상어는 사실 사람에게 ___"이므로 위험과 반대인 **harmless**(해가 없는)입니다.',
      },
    },
    {
      title: '낱말·짧은 어구 빈칸 풀기',
      body: '빈칸에 낱말 하나나 짧은 어구가 들어갈 때는 두 가지를 확인합니다.\n\n' +
        '1. **빈칸 자리의 문법**: 빈칸 앞뒤를 보고 어떤 품사가 들어갈지 정합니다. an ___ process라면 모음으로 소리가 시작하는 형용사, can ___라면 동사원형입니다.\n' +
        '2. **방향(긍정·부정)**: 앞뒤 내용이 좋은 쪽인지 나쁜 쪽인지, 늘어나는 쪽인지 줄어드는 쪽인지 봅니다.\n\n' +
        '예: Plastic bags … cause serious problems. … For this reason, some cities ___ the use of plastic bags.\n\n' +
        '문제점을 말한 뒤 For this reason(이런 까닭으로)이 왔으므로, 빈칸은 비닐봉지 사용을 **줄이는** 쪽의 동사입니다. limit(제한하다)가 맞고, encourage(장려하다)는 방향이 반대입니다.\n\n' +
        '> 💡 선택지를 보기 전에 빈칸에 들어갈 말을 우리말로 먼저 떠올려 보십시오("줄이다", "막다"). 그다음 같은 뜻의 선택지를 고르면 매력적인 오답에 덜 흔들립니다.',
      easy: '빈칸을 "+인지 -인지" 표시로 먼저 채워 보십시오. 앞에서 나쁜 점을 실컷 말하고 "그래서 몇몇 도시는 ___"이라면, 빈칸은 "줄인다·막는다" 쪽(-)입니다.\n\n' +
        '방향만 맞혀도 선택지의 절반은 지울 수 있습니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nRegular exercise makes your heart stronger and ___ your mood.',
        choices: ['improves', 'ruins', 'hides'],
        answer: 0,
        why: [
          '',
          'and는 앞(심장을 튼튼하게 한다)과 같은 방향을 잇습니다. 망친다는 부정적인 말은 방향이 반대입니다.',
          '감춘다는 말은 운동의 좋은 점을 이어 말하는 흐름과 맞지 않습니다.',
        ],
        explain: 'and로 이어진 두 부분은 같은 방향(좋은 점)입니다. 심장을 튼튼하게 하고 기분도 **좋게 한다(improves)**가 알맞습니다.',
      },
    },
    {
      title: '고른 답을 넣어 다시 읽고 확인하기',
      body: '답을 골랐으면 반드시 **빈칸에 넣어 앞뒤 문장과 함께 다시 읽습니다.** 다음을 확인합니다.\n\n' +
        '- 빈칸 바로 앞뒤 문장과 자연스럽게 이어지는가?\n' +
        '- 글의 다른 부분과 **모순**되지 않는가?\n' +
        '- 주제문 빈칸이라면 글의 모든 예시를 설명하는가?\n' +
        '- 글에 없는 정보를 덧붙이거나, always·never·only 같은 **지나치게 강한 말**로 글보다 더 나가지 않았는가?\n\n' +
        '예: … This does not mean that a big meal is necessary; a piece of fruit or a glass of milk can ___.\n\n' +
        'be enough를 넣으면 "많이 먹을 필요는 없다, 과일 한 조각이나 우유 한 잔으로도 충분하다"로 앞뒤가 매끄럽습니다. replace all meals(모든 끼니를 대신한다)는 글보다 지나치게 나간 말입니다.',
      easy: '퍼즐 조각을 고른 다음에는 실제로 끼워 봐야 합니다. 모양이 비슷해 보여도 끼워 보면 옆 조각과 그림이 이어지지 않을 때가 있지요.\n\n' +
        '빈칸에 답을 넣고 앞 문장부터 소리 내어 읽어 보십시오. 어색하거나 앞뒤가 부딪치면 다시 고릅니다.',
      check: {
        type: 'ox',
        q: '고른 답을 빈칸에 넣어 읽었을 때 빈칸 문장 하나만 자연스러우면, 글의 다른 부분과 모순되더라도 정답으로 보아도 된다.',
        answer: false,
        explain: '빈칸 문장만 자연스러워서는 부족합니다. 앞뒤 문장, 글 전체와도 모순 없이 이어져야 정답입니다. 모순이 생기면 다른 선택지를 다시 살펴봅니다.',
      },
    },
  ],

  examples: [
    {
      q: '빈칸에 들어갈 말로 가장 알맞은 것을 고르십시오.\n\n' + SOIL + '\n\n① more sunlight ② a bigger pot ③ healthy soil ④ cold weather',
      steps: [
        '빈칸 문장의 역할: 둘째 문장이고 However로 시작하므로, 첫 문장의 통념을 뒤집는 글쓴이의 생각(이 글의 요지)입니다.',
        '대조 단서: 통념은 "식물에는 물과 햇빛만 있으면 된다"입니다. However 뒤에는 물과 햇빛 **말고도** 중요한 것이 와야 합니다.',
        '재진술 단서: 마지막 문장의 Without enough nutrients in it(그 안에 양분이 충분하지 않으면)에서 it이 빈칸의 대상을 가리킵니다. 양분을 담고 있는 것은 흙입니다.',
        '선택지 판단: ①은 통념(햇빛)을 되풀이하고, ②·④는 글에 근거가 없습니다.',
        '확인: However, healthy soil is just as important. → 양분이 없으면 잘 자라지 못한다는 마지막 문장과 매끄럽게 이어집니다.',
      ],
      answer: '③ healthy soil',
    },
    {
      q: '빈칸에 들어갈 말을 추론하십시오.\n\n' + LISTEN,
      steps: [
        '빈칸 문장은 That is(곧, 다시 말하면)로 시작하므로 앞 내용을 다시 말하는 **재진술** 문장입니다.',
        '앞 내용: 잘 듣는 사람은 그냥 조용히 있지 않고, 쳐다보고, 고개를 끄덕이고, 질문을 합니다. 곧 **적극적으로 참여**합니다.',
        '대조 단서: 빈칸 바로 뒤 not a passive one(수동적인 것이 아니라)에서 빈칸은 passive(수동적인)의 반대입니다.',
        '문법 확인: an ___ process이므로 모음 소리로 시작하는 형용사가 자연스럽습니다.',
        '넣어 읽기: good listening is an active process, not a passive one. → 앞뒤가 모두 맞습니다.',
      ],
      answer: 'active (적극적인, 능동적인)',
    },
  ],

  terms: [
    { term: '빈칸 추론', def: '글 속의 단서를 근거로 빈칸에 들어갈 낱말·어구·문장을 찾는 독해 유형입니다.' },
    { term: '주제문', def: '글의 요지를 담은 문장입니다. 주로 글의 처음이나 끝에 오며, 나머지 문장들이 이를 뒷받침합니다.' },
    { term: '세부 문장', def: '주제문을 뒷받침하는 예시·근거·구체적 설명을 담은 문장입니다.' },
    { term: '재진술', def: '앞에서 한 말을 다른 낱말이나 표현으로 다시 말하는 것입니다. 신호: In other words, That is, This means' },
    { term: '대조 연결어', def: '앞뒤 내용이 반대임을 알리는 말입니다. 예: however, but, yet, instead, unlike, on the other hand, rather than' },
    { term: '통념', def: '많은 사람이 일반적으로 믿는 생각입니다. 글쓴이가 However 뒤에서 통념을 반박하며 요지를 밝히는 짜임이 자주 쓰입니다.' },
    { term: '단서', def: '빈칸의 답을 정하는 근거가 되는 글 속 표현입니다. 연결어, 재진술, 지시어, 예시 등이 있습니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + TEACH,
      choices: ['Listening quietly', 'Teaching others', 'Taking notes', 'Reading alone'],
      answer: 1,
      why: [
        '글의 마지막 문장은 듣는 사람보다 설명하는 사람이 더 많이 배운다고 말합니다. 조용히 듣는 것은 반대쪽입니다.',
        '',
        '필기는 글에 나오지 않습니다. 뒤 문장들은 모두 친구에게 설명하는 상황입니다.',
        '혼자 읽는 것은 친구에게 설명하는 뒤 문장들과 맞지 않습니다.',
      ],
      explain: '빈칸은 첫 문장, 곧 **주제문**입니다. 뒤의 문장들은 친구에게 설명하기(explain), 질문받기, 설명하는 사람이 더 많이 배움을 말하므로, 이를 묶는 요지는 **Teaching others**(다른 사람을 가르치는 것)입니다.',
    },
    {
      id: 'p2', level: 1, type: 'ox', concept: 0,
      q: '빈칸이 글의 맨 마지막 문장에 있고 In each case(각각의 경우에)로 시작한다면, 빈칸에는 앞에 나온 여러 예의 공통점이 들어갈 가능성이 크다.',
      answer: true,
      explain: 'In each case는 앞에 나온 여러 예를 한데 묶는 말입니다. 그래서 마지막 문장의 빈칸은 예들의 공통점, 곧 글의 요지를 담은 **주제문**일 가능성이 큽니다.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + BEARS,
      choices: ['moving to warmer places', 'hunting more often', 'saving energy', 'growing thicker fur'],
      answer: 2,
      why: [
        '곰은 따뜻한 곳으로 옮겨 가지 않고 굴에서 잠을 잡니다. 글에 근거가 없습니다.',
        '사냥을 더 자주 하면 힘을 더 많이 씁니다. 몸이 에너지를 거의 쓰지 않는다는 내용과 반대입니다.',
        '',
        '털 이야기는 글에 나오지 않습니다.',
      ],
      explain: '마지막 문장 In other words, they save their strength …가 빈칸을 **다시 말한** 재진술입니다. 심장이 천천히 뛰고 에너지를 거의 쓰지 않는다는 예도 같은 뜻이므로 **saving energy**가 알맞습니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + SOIL,
      choices: ['healthy soil', 'more sunlight', 'a bigger pot', 'cold weather'],
      answer: 0,
      why: [
        '',
        'However 뒤에는 통념(물과 햇빛만 있으면 된다)과 다른 것이 와야 합니다. 햇빛은 통념에 이미 들어 있습니다.',
        '화분 크기는 글에 나오지 않습니다. 마지막 문장의 nutrients(양분)와 이어지지 않습니다.',
        '추운 날씨는 식물이 잘 자라는 데 필요한 것이 아니고, 글에 근거도 없습니다.',
      ],
      explain: 'However는 통념(물과 햇빛만 필요하다)을 뒤집습니다. 마지막 문장에서 "그 안에 양분이 충분하지 않으면 잘 자라지 못한다"고 하므로, 양분을 품은 **healthy soil**(건강한 흙)이 알맞습니다.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + CATS,
      choices: ['loyal', 'noisy', 'hungry', 'independent'],
      answer: 3,
      why: [
        '주인을 졸졸 따르는 충성스러운 모습은 개의 특징입니다. Unlike dogs는 개와 반대되는 특징을 예고합니다.',
        '시끄러운지는 글에 나오지 않습니다.',
        '배고픔은 글의 내용과 관계가 없습니다.',
        '',
      ],
      explain: 'Unlike dogs(개와 달리)와 on the other hand가 대조 단서입니다. 개는 주인을 따라다니지만 고양이는 혼자서도 잘 지내고 원할 때만 다가온다고 하므로 **independent**(독립적인)가 알맞습니다.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + BAGS,
      choices: ['encourage', 'limit', 'celebrate', 'increase'],
      answer: 1,
      why: [
        '문제점을 말한 뒤 For this reason이 왔으므로 사용을 줄이는 쪽이어야 합니다. 장려하다는 방향이 반대입니다.',
        '',
        '축하하다는 문제를 일으키는 물건에 대한 대책이 될 수 없습니다.',
        '사용을 늘리는 것은 문제점과 반대 방향입니다.',
      ],
      explain: '비닐봉지의 문제점(잘 분해되지 않고, 바다 동물이 먹이로 착각함)을 말한 뒤 For this reason(이런 까닭으로)이 이어집니다. 그래서 사용을 **제한하다(limit)**가 알맞습니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 1,
      q: '앞 내용을 **다른 말로 다시 말할 때** 쓰는 연결어는 무엇입니까?',
      choices: ['However', 'Instead', 'In other words', 'Unlike'],
      answer: 2,
      why: [
        '앞 내용과 반대되는 말을 이끄는 대조 연결어입니다.',
        '앞에서 부정한 것 대신 다른 것을 말하는 연결어입니다.',
        '',
        '비교 대상과 다른 특징을 말할 때 쓰는 말입니다.',
      ],
      explain: '**In other words**(다시 말하면)는 재진술 신호입니다. 이 뒤의 내용은 앞 내용과 같은 뜻이므로, 빈칸이 앞에 있으면 이 뒤가 단서가 됩니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 4,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + BREAKFAST,
      choices: ['replace all meals', 'make you hungry', 'be enough', 'never help'],
      answer: 2,
      why: [
        '모든 끼니를 대신한다는 것은 글보다 지나치게 나간 말입니다. 글은 아침 식사에 대해서만 말합니다.',
        '아침을 먹으면 에너지를 얻는다는 앞 내용과 반대입니다.',
        '',
        '아침 식사가 도움이 된다는 글의 흐름과 반대입니다.',
      ],
      explain: '앞에서 "많이 먹을 필요는 없다"고 했으므로, 과일 한 조각이나 우유 한 잔으로도 **충분할 수 있다(be enough)**가 자연스럽습니다. 넣어 읽어 보면 앞뒤가 매끄럽게 이어집니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + ANGRY,
      hint: 'Instead 앞에서 부정한 행동과, 빈칸 뒤 문장의 구체적인 행동을 함께 보십시오.',
      choices: ['shouts even louder', 'calms herself down first', 'blames her friends', 'forgets the problem forever'],
      answer: 1,
      why: [
        'Instead 앞에서 소리 지르지 않는다고 했으므로 모순입니다.',
        '',
        '친구를 탓하는 것은 뒤의 행동(산책, 감정 적기)과 맞지 않습니다.',
        '돌아와서 그 문제를 차분히 이야기한다고 했으므로 영원히 잊는 것이 아닙니다.',
      ],
      explain: 'Instead(대신에)는 앞에서 부정한 행동(소리 지르기) 대신 하는 행동을 예고합니다. 뒤 문장의 산책하기, 감정 적기는 모두 마음을 가라앉히는 예이고, 마지막 문장의 calmly도 이를 뒷받침하므로 **calms herself down first**입니다.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 1,
      q: '빈칸에 들어갈 낱말을 **본문에서 찾아** 한 낱말로 쓰십시오.\n\n' + HABIT,
      hint: '첫 문장에서 신중하게 생각하는 데 무엇이 많이 든다고 했는지 보십시오.',
      answer: ['energy'],
      wrong: [
        { a: 'time', why: 'time은 본문에 나오지 않는 낱말입니다. 첫 문장에서 신중하게 생각하면 많이 든다고 한 것을 찾아보십시오.' },
        { a: 'brains', why: '뇌는 습관에 기대는 주체입니다. 습관이 아껴 주는 것은 첫 문장에서 많이 든다고 한 것입니다.' },
      ],
      explain: '첫 문장 Thinking carefully … takes a lot of mental **energy**가 단서입니다. 습관 덕분에 단계마다 생각할 필요가 없으므로, 습관은 그 **energy**를 더 중요한 결정을 위해 아껴 줍니다. 첫 문장과 마지막 문장이 같은 내용을 말하는 재진술 구조입니다.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + STRONG,
      hint: 'In each case가 무엇을 묶는지 생각해 보십시오.',
      choices: ['staying comfortable', 'avoiding effort', 'growing quickly', 'facing challenges'],
      answer: 3,
      why: [
        '바람, 매일의 사용, 어려운 문제는 모두 편안함과 반대입니다.',
        '세 예 모두 힘든 일을 피하지 않고 겪어서 강해진 경우입니다. 방향이 반대입니다.',
        '빨리 자란다는 내용은 글에 없습니다. 예들의 공통점은 속도가 아니라 어려움입니다.',
        '',
      ],
      explain: '바람 부는 곳의 나무, 매일 쓰는 근육, 어려운 문제를 푸는 마음 — 세 예의 공통점은 **어려움을 겪는 것**입니다. 마지막 문장은 이를 묶는 주제문이므로 **facing challenges**(도전에 맞서는 것)가 알맞습니다.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 4,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + LISTEN,
      hint: '빈칸 바로 뒤의 not a passive one을 함께 읽어 보십시오.',
      choices: ['silent', 'active', 'easy', 'lonely'],
      answer: 1,
      why: [
        '첫 문장에서 좋은 청자는 조용히 있는 것 이상을 한다고 했습니다. 넣어 읽으면 앞 내용과 부딪칩니다.',
        '',
        '쉽다는 말은 앞의 내용(쳐다보고, 끄덕이고, 질문하기)을 다시 말한 것이 아니고, not a passive one과도 맞서지 않습니다.',
        '외롭다는 말은 상대와 주고받는 앞 내용과 맞지 않습니다.',
      ],
      explain: 'That is는 재진술 신호이고, not a passive one(수동적인 것이 아니라)은 대조 단서입니다. 쳐다보고, 끄덕이고, 질문하는 모습을 다시 말하면 **active**(적극적인)입니다. 넣어 읽으면 an active process, not a passive one으로 앞뒤가 맞습니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + PIANO,
      hint: '마지막 문장의 빈칸은 글 전체를 일반화한 주제문입니다. Experienced teachers suggest the opposite.의 opposite이 무엇의 반대인지 보십시오.',
      choices: [
        'speed matters more than accuracy',
        'only talented people can master difficult songs',
        'going slowly at first is often the fastest way to improve',
        'beginners should avoid difficult songs',
        'teachers make practice more enjoyable',
      ],
      answer: 2,
      why: [
        '선생님들은 처음부터 빠르게 치는 초보자들과 반대로 하라고 조언합니다. 속도를 앞세우는 것은 초보자들의 방식입니다.',
        '재능 이야기는 글에 나오지 않습니다. 근거 없이 지나치게 나간 말입니다.',
        '',
        '글은 어려운 곡을 피하라는 것이 아니라 어려운 부분을 천천히 연습하라고 말합니다.',
        '연습이 즐거워지는지는 글에 나오지 않습니다.',
      ],
      explain: '초보자는 빠르게 반복하지만, 선생님들은 그 반대(the opposite), 곧 **천천히** 정확하게 익힌 뒤 조금씩 속도를 올리라고 합니다. 마지막 문장은 이를 음악과 다른 기술에까지 넓힌 주제문이므로 **going slowly at first is often the fastest way to improve**가 알맞습니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '(A), (B)에 들어갈 말로 가장 알맞은 것끼리 짝지은 것은 무엇입니까?\n\n' + MISTAKE,
      hint: 'however 앞뒤의 두 무리는 실수를 반대로 봅니다. 마지막 문장이 (B)의 뜻을 풀어 줍니다.',
      choices: [
        '(A) repeat – (B) lessons',
        '(A) avoid – (B) disasters',
        '(A) avoid – (B) lessons',
        '(A) welcome – (B) warnings',
        '(A) repeat – (B) disasters',
      ],
      answer: 2,
      why: [
        '실수를 실패의 신호로 보는 사람들은 실수를 되풀이하려 하지 않고 피하려 합니다.',
        '(B)의 사람들은 however로 앞 사람들과 반대로 실수를 봅니다. 재앙으로 보는 것은 앞 사람들과 같은 방향입니다.',
        '',
        '실패의 신호로 보면서 실수를 반길 수는 없습니다. (A)가 흐름에 맞지 않습니다.',
        '(A), (B) 모두 흐름과 반대입니다.',
      ],
      explain: '(A) 실수를 실패의 신호로 보는 사람들은 무슨 수를 써서라도 실수를 **피하려(avoid)** 합니다. (B) however 뒤의 사람들은 반대로 실수를 **배움(lessons)**으로 여기며, 마지막 문장(각 실수가 다음에 연습할 것을 보여 준다)이 이를 다시 말해 줍니다.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 2,
      q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + ENCY,
      hint: 'Unlike a printed encyclopedia와 rather than이 무엇과 무엇을 맞세우는지 보십시오.',
      choices: [
        'within a few seconds',
        'being read by many people',
        'waiting years for a new edition',
        'becoming more reliable',
      ],
      answer: 2,
      why: [
        'rather than 앞(몇 분 안에)과 같은 방향입니다. 빠른 온라인과 대조되는 느린 쪽이 필요합니다.',
        '많은 사람이 읽는지는 정보를 고치는 속도와 관계가 없습니다.',
        '',
        '더 믿을 만해진다는 말은 속도를 대조하는 흐름과 맞지 않고, 뒤 문장(출처를 확인해야 한다)과도 어긋납니다.',
      ],
      explain: '첫 문장의 Unlike a printed encyclopedia가 인쇄본과 온라인을 맞세웁니다. 온라인은 몇 분 안에 고칠 수 있다(within minutes)고 했으므로, rather than 뒤에는 인쇄본의 느린 방식인 **waiting years for a new edition**(새 판이 나오기까지 몇 년을 기다리는 것)이 옵니다.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'text', concept: 3,
      q: '빈칸에 들어갈 말을 본문의 동사에서 찾아 **알맞은 형태로 바꾸어** 한 낱말로 쓰십시오.\n\n' + SPEECH,
      hint: '빈칸은 that절의 주어 자리입니다. 동사를 주어 자리에 쓰려면 어떤 형태여야 하는지 생각하십시오.',
      answer: ['memorizing', 'memorization'],
      wrong: [
        { a: 'memorize', why: '뜻은 맞지만 빈칸은 that절의 주어 자리라 동사원형을 쓸 수 없습니다. 동명사 꼴로 바꾸어 쓰십시오.' },
        { a: 'preparing', why: '숙련된 연사들도 준비는 합니다. However 앞의 통념, 곧 대본을 통째로 외우려는 생각을 찾아야 합니다.' },
      ],
      explain: '빈칸 뒤 so they try to **memorize** every word가 통념의 내용입니다. However 뒤에서 통째로 외운 발표는 딱딱하다고 반박하므로, 빈칸은 "외우는 것"입니다. that절의 주어 자리이므로 동명사 **memorizing**(또는 명사 memorization)으로 씁니다.',
    },
  ],

  deeper: [
    {
      title: '빈칸 문제는 왜 어렵게 느껴질까',
      body: '빈칸 문제가 어렵게 느껴지는 까닭은 대부분 **빈칸 문장만 뚫어지게 보기** 때문입니다. 빈칸 문장 자체에는 답이 없습니다. 답은 빈칸 밖, 곧 글의 다른 문장들에 흩어져 있습니다.\n\n' +
        '그래서 빈칸 문제는 사실 **"이 글은 무엇을 말하는가"를 묻는 주제 찾기 문제**와 같은 경우가 많습니다. 특히 빈칸이 주제문에 있을 때 그렇습니다. 글 전체를 읽고 요지를 우리말로 정리한 다음, 그 요지를 빈칸 자리에 맞게 다시 말한 선택지를 고르면 됩니다.\n\n' +
        '영어Ⅱ에서는 빈칸이 더 긴 구나 절로 나오고, 단서도 글 곳곳에 더 넓게 흩어집니다. 지금 단서를 찾는 습관(재진술·대조·연결어)을 들여 두면 그때 큰 힘이 됩니다.',
    },
    {
      title: '매력적인 오답의 세 가지 얼굴',
      body: '빈칸 문제의 오답은 대개 다음 셋 중 하나입니다. 고른 답을 확인할 때 이 셋에 해당하지 않는지 보십시오.\n\n' +
        '1. **반대 방향**: 글의 낱말을 그대로 쓰면서 뜻을 뒤집습니다. 대조 연결어 앞쪽(통념)의 내용을 담은 선택지가 대표적입니다.\n' +
        '2. **지나친 일반화**: always, never, only, all 같은 말로 글보다 더 나갑니다. 글이 "어떤 경우에"라고 말하면 답도 그 정도여야 합니다.\n' +
        '3. **그럴듯하지만 근거 없음**: 상식으로는 맞는 말이지만 글에 근거가 없습니다. 빈칸 추론은 상식이 아니라 **글 속 단서**로 풉니다.',
    },
  ],

  faq: [
    {
      q: '빈칸 문제를 풀 때 선택지부터 읽어도 되나요?',
      a: '선택지를 먼저 읽으면 그럴듯한 오답에 생각이 끌려가기 쉽습니다. 글을 먼저 읽고 빈칸에 들어갈 말을 우리말로 대강 떠올린 다음 선택지를 보는 편이 안전합니다. 떠올린 말과 같은 뜻의 선택지를 고르고, 마지막에 넣어 읽어 확인하십시오.',
    },
    {
      q: '단서가 하나도 안 보이면 어떻게 해요?',
      a: '먼저 빈칸 문장이 주제문인지 세부 문장인지 보십시오. 주제문이라면 글의 나머지 전부가 단서입니다. 세부 문장이라면 바로 앞뒤의 연결어(However, For example, So, In other words)를 찾고, 빈칸과 같은 대상을 다시 말하는 표현(대명사, 바꿔 쓴 낱말)을 찾아보십시오.',
    },
    {
      q: 'However가 나오면 무조건 반대말을 고르면 되나요?',
      a: 'However 앞과 뒤가 반대 방향인 것은 맞지만, 무엇과 무엇이 반대인지 정확히 봐야 합니다. 앞 문장 전체가 아니라 통념의 핵심(예: 물과 햇빛만 필요하다)과 반대여야 합니다. 그리고 고른 답이 글의 다른 문장과도 맞는지 넣어 읽어 확인해야 합니다.',
    },
  ],

  mistakes: [
    '빈칸 문장만 보고 상식으로 답을 고르는 실수 — 답의 근거는 빈칸 밖의 다른 문장들에 있습니다.',
    'However 앞쪽, 곧 통념의 내용을 담은 선택지를 고르는 실수 — 대조 연결어 뒤의 빈칸은 통념과 반대 방향입니다.',
    '답을 고르고 넣어 읽어 보지 않는 실수 — 앞뒤 문장과 모순되거나 always·never처럼 글보다 지나친 말이 아닌지 확인합니다.',
  ],

  gens: [
    {
      id: 'contrast-restate',
      level: 1,
      title: '대조·재진술 단서로 빈칸 채우기',
      make: function (R) {
        var it = R.pick(CUES);
        var correct = it[1];
        var reason = {};
        var wrongs = it[2].map(function (w) { reason[w[0]] = w[1]; return w[0]; });
        var pick = R.choices(correct, wrongs);
        var cue = it[3] === 1 ? '재진술 단서(앞 내용을 다시 말함)' : '대조 단서(앞 내용과 반대 방향)';
        return {
          type: 'choice', concept: it[3],
          q: '빈칸에 들어갈 말로 가장 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: it[0].replace('___', '**' + correct + '**') + '\n\n' + CUES_WHY[CUES.indexOf(it)] + '\n\n' + cue + '를 찾고, 정답을 넣어 다시 읽어 확인합니다.',
        };
      },
    },
  ],

  vocab: [
    { w: 'survive', m: '살아남다, 견디다', ex: 'Camels can survive for days without water.', exm: '낙타는 물 없이 며칠을 견딜 수 있습니다.' },
    { w: 'nutrient', m: '영양소, 양분', ex: 'Vegetables are full of important nutrients.', exm: '채소에는 중요한 영양소가 가득합니다.' },
    { w: 'independent', m: '독립적인, 남에게 기대지 않는', ex: 'My older sister became independent after she got a job.', exm: '언니는 일자리를 얻은 뒤 독립했습니다.' },
    { w: 'convenient', m: '편리한', ex: 'Online shopping is convenient, but it is easy to spend too much.', exm: '온라인 쇼핑은 편리하지만 돈을 너무 많이 쓰기 쉽습니다.' },
    { w: 'limit', m: '제한하다; 한계', ex: 'Our school limits the use of phones during class.', exm: '우리 학교는 수업 중 휴대 전화 사용을 제한합니다.' },
    { w: 'mistake A for B', m: 'A를 B로 착각하다', ex: 'I mistook the salt for sugar.', exm: '나는 소금을 설탕으로 착각했습니다.' },
    { w: 'focus', m: '집중하다; 초점', ex: 'Turn off the TV so you can focus on your homework.', exm: '숙제에 집중할 수 있게 텔레비전을 끄십시오.' },
    { w: 'challenge', m: '도전, 어려운 과제', ex: 'Learning a new instrument is a fun challenge.', exm: '새 악기를 배우는 것은 즐거운 도전입니다.' },
    { w: 'passive', m: '수동적인', ex: 'Watching TV is a passive activity.', exm: '텔레비전 보기는 수동적인 활동입니다.' },
    { w: 'active', m: '적극적인, 활동적인', ex: 'Hayun takes an active part in class discussions.', exm: '하윤이는 수업 토론에 적극적으로 참여합니다.' },
    { w: 'eventually', m: '결국, 마침내', ex: 'After many tries, Doyun eventually solved the puzzle.', exm: '여러 번 시도한 끝에 도윤이는 마침내 퍼즐을 풀었습니다.' },
    { w: 'reliable', m: '믿을 만한', ex: 'Always use reliable sources for your report.', exm: '보고서에는 늘 믿을 만한 자료를 쓰십시오.' },
    { w: 'edition', m: '(책의) 판', ex: 'The new edition of the dictionary has many more words.', exm: '그 사전의 새 판에는 훨씬 많은 낱말이 실려 있습니다.' },
    { w: 'memorize', m: '외우다, 암기하다', ex: 'Seojun memorized the poem for the contest.', exm: '서준이는 대회를 위해 그 시를 외웠습니다.' },
    { w: 'unnatural', m: '부자연스러운', ex: 'His smile in the photo looks a little unnatural.', exm: '사진 속 그의 미소는 조금 부자연스러워 보입니다.' },
  ],
});
})();
