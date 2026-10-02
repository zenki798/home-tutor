/* 영어Ⅰ · 어법 판단 전략
 * 예문·지문은 모두 직접 쓴 글이다(가상의 인물·학교). */
(function () {
  // 짧은 글 (직접 쓴 글): 일기 쓰기
  var DIARY = 'Many people believe that **(A) keeping** a diary is only for children. However, writing a few lines every evening **(B) help** adults look back on their day. Those who **(C) write** regularly often find **(D) themselves** calmer and **(E) more focused**.';

  // 수 일치 생성기용: [주어 전체, 핵심 주어, 단수 1·복수 2, 나머지, 우리말, 현재 시제로만 낼지(true: 과거로 바꾸면 시제가 어긋나는 문장)]
  var AGREE = [
    ['The key to the science rooms', 'The key', 1, "on the teacher's desk.", '과학실 열쇠는 선생님 책상 위에 있다'],
    ['The books on the top shelf', 'The books', 2, 'too heavy for me.', '맨 위 칸의 책들은 내게 너무 무겁다'],
    ['One of the girls in my class', 'One', 1, 'from Jeju Island.', '우리 반 여학생 중 한 명은 제주도 출신이다'],
    ['The students in the art club', 'The students', 2, 'busy with the festival.', '미술 동아리 학생들은 축제 준비로 바쁘다'],
    ['The color of the leaves', 'The color', 1, 'bright red in autumn.', '그 잎들의 색은 가을에 새빨갛다', true],
    ['Each of the players', 'Each', 1, 'ready for the final match.', '선수들은 각자 결승전 준비가 되어 있다'],
    ['The pictures that Jia took', 'The pictures', 2, 'on the classroom wall.', '지아가 찍은 사진들은 교실 벽에 걸려 있다'],
    ['The boy who sells newspapers at the corner', 'The boy', 1, 'my neighbor.', '모퉁이에서 신문을 파는 소년은 내 이웃이다', true],
    ['Reading comic books', 'Reading', 1, 'my favorite hobby.', '만화책 읽기는 내가 가장 좋아하는 취미다'],
    ['The number of visitors to the museum', 'The number', 1, 'larger on weekends.', '그 박물관의 방문객 수는 주말에 더 많다', true],
    ['The flowers in the blue vase', 'The flowers', 2, 'from my grandmother.', '파란 꽃병에 꽂힌 꽃들은 할머니께서 주신 것이다'],
    ['The cost of the concert tickets', 'The cost', 1, 'higher than last year.', '음악회 표 가격은 작년보다 높다', true],
    ['The people living next door', 'The people', 2, 'very kind to us.', '옆집에 사는 사람들은 우리에게 무척 친절하다'],
    ['Whether we win or lose', 'Whether we win or lose(명사절)', 1, 'not important to me.', '우리가 이기느냐 지느냐는 내게 중요하지 않다', true],
    ['The windows of the old house', 'The windows', 2, 'open all day.', '그 오래된 집의 창문들은 하루 종일 열려 있다'],
    ['A box of old letters', 'A box', 1, 'under my bed.', '오래된 편지 한 상자가 내 침대 밑에 있다'],
    ['Students who want to join the trip', 'Students', 2, 'in the library.', '여행에 함께 가려는 학생들은 도서관에 있다', true],
    ['The main goal of these lessons', 'The main goal', 1, 'to build confidence.', '이 수업들의 주된 목표는 자신감을 기르는 것이다'],
  ];

  // 분사 고르기 생성기용: [문장(빈칸), 동사원형, 정답, 현재분사, 과거분사, 판단 근거]
  var PART = [
    ['I found a [[빈칸]] window in the classroom.', 'break', 'broken', 'breaking', 'broken', '창문은 "깨진" 것(당한 것)이므로 과거분사'],
    ['The boy [[빈칸]] on the bench is my cousin.', 'sit', 'sitting', 'sitting', 'sat', '소년이 직접 "앉아 있는" 것이므로 현재분사'],
    ['This is a novel [[빈칸]] by a young writer.', 'write', 'written', 'writing', 'written', '소설은 "쓰인" 것이므로 과거분사'],
    ['Do you know the girl [[빈칸]] the guitar?', 'play', 'playing', 'playing', 'played', '소녀가 직접 기타를 "치는" 것이므로 현재분사'],
    ['The final game was really [[빈칸]].', 'excite', 'exciting', 'exciting', 'excited', '경기가 감정을 "일으키는" 쪽이므로 현재분사'],
    ['The fans were [[빈칸]] by the result.', 'disappoint', 'disappointed', 'disappointing', 'disappointed', '팬들이 실망을 "느끼는" 쪽이므로 과거분사'],
    ['The lecture was so [[빈칸]] that some students fell asleep.', 'bore', 'boring', 'boring', 'bored', '강의가 지루함을 "주는" 쪽이므로 현재분사'],
    ['I felt [[빈칸]] after the long walk.', 'tire', 'tired', 'tiring', 'tired', '내가 피곤함을 "느끼는" 쪽이므로 과거분사'],
    ['Look at the stars [[빈칸]] in the night sky.', 'shine', 'shining', 'shining', 'shone', '별이 직접 "빛나는" 것이므로 현재분사'],
    ['The cookies [[빈칸]] by my sister were delicious.', 'bake', 'baked', 'baking', 'baked', '쿠키는 "구워진" 것이므로 과거분사'],
    ['There is a man [[빈칸]] for you outside.', 'wait', 'waiting', 'waiting', 'waited', '남자가 직접 "기다리는" 것이므로 현재분사'],
    ['The car [[빈칸]] in front of the gate is my uncle\'s.', 'park', 'parked', 'parking', 'parked', '차는 "주차된" 것이므로 과거분사'],
    ['She showed me a photo [[빈칸]] in Jeju.', 'take', 'taken', 'taking', 'taken', '사진은 "찍힌" 것이므로 과거분사'],
    ['It was an [[빈칸]] story about a brave dog.', 'amaze', 'amazing', 'amazing', 'amazed', '이야기가 놀라움을 "주는" 쪽이므로 현재분사'],
    ['The news was [[빈칸]] to everyone.', 'surprise', 'surprising', 'surprising', 'surprised', '소식이 놀라움을 "주는" 쪽이므로 현재분사'],
    ['Students [[빈칸]] in science can join the club.', 'interest', 'interested', 'interesting', 'interested', '학생들이 흥미를 "느끼는" 쪽이므로 과거분사'],
    ['The woman [[빈칸]] a red hat is our new coach.', 'wear', 'wearing', 'wearing', 'wore', '여자가 직접 모자를 "쓰고 있는" 것이므로 현재분사'],
    ['English is a language [[빈칸]] in many countries.', 'speak', 'spoken', 'speaking', 'spoken', '언어는 "말해지는" 것이므로 과거분사'],
    ['I heard my name [[빈칸]] from behind.', 'call', 'called', 'calling', 'called', '내 이름은 "불리는" 것이므로 과거분사'],
    ['Please keep the door [[빈칸]] at night.', 'lock', 'locked', 'locking', 'locked', '문은 "잠긴" 상태여야 하므로 과거분사'],
    ['The dog [[빈칸]] at the mail carrier is ours.', 'bark', 'barking', 'barking', 'barked', '개가 직접 "짖는" 것이므로 현재분사'],
    ['We cleaned up the [[빈칸]] glass carefully.', 'break', 'broken', 'breaking', 'broken', '유리는 "깨진" 것이므로 과거분사'],
  ];

Tutor.registerUnit({
  id: 'eng-h-e1-07',
  course: 'eng-h-e1',
  title: '어법 판단 전략',
  summary: '수 일치, 동사와 준동사, 능동과 수동, 관계사, 병렬처럼 자주 묻는 어법을 문장 구조로 판단합니다.',
  goals: [
    '긴 주어와 수식어를 건너뛰고 핵심 주어를 찾아 동사의 수를 맞출 수 있다.',
    '문장 안에서 동사 자리와 준동사 자리를 구별하고, 능동·수동과 분사를 바르게 고를 수 있다.',
    '뒤 문장이 완전한지 따져 관계대명사 what·that·which를 구별할 수 있다.',
    '대명사·재귀대명사의 일치, 병렬 구조, 형용사·부사 자리를 판단할 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: '주어와 동사의 수 일치: 수식어를 건너뛰기',
      body: '어법 문제에서 가장 자주 나오는 것은 **주어와 동사의 수 일치**입니다. 주어가 길어지면 동사 바로 앞의 명사에 수를 맞추는 실수를 하기 쉽습니다. 그래서 주어를 꾸미는 말을 **괄호로 묶어 건너뛰고** 핵심 주어만 봅니다.\n\n' +
        '| 문장 | 핵심 주어 | 동사 |\n|---|---|---|\n' +
        '| The key (to the science rooms) **is** on the desk. | The key (단수) | is |\n' +
        '| The books (on the top shelf) **are** heavy. | The books (복수) | are |\n' +
        '| One (of my friends) **lives** in Canada. | One (단수) | lives |\n' +
        '| The students (who live near the school) **walk** to school. | The students (복수) | walk |\n\n' +
        '괄호로 묶을 것: 전치사구(of ~, in ~, on ~), 분사구(living ~, made ~), 관계사절(who ~, that ~), 동격.\n\n' +
        '자주 묻는 것도 함께 익혀 둡니다.\n\n' +
        '- 동명사·to부정사·명사절 주어는 **단수**: Reading books **is** fun.\n' +
        '- each, every, one of ~ 는 **단수**: Each of the players **has** a number.\n' +
        '- **The number of** + 복수 명사 → 단수 동사 (~의 수) / **A number of** + 복수 명사 → 복수 동사 (많은 ~)\n' +
        '- 주격 관계대명사 뒤의 동사는 **선행사**에 맞춤: the boys who **are** …',
      easy: '긴 주어는 기차와 같습니다. 맨 앞의 기관차(핵심 주어)가 기차 전체를 끌고 가지요. 뒤에 매단 객차(of ~, in ~, who ~)가 아무리 많아도 방향을 정하는 것은 기관차입니다.\n\n' +
        '그래서 동사를 고를 때는 객차를 떼어 내고 기관차만 남겨 봅니다. "The key to the science rooms"에서 객차 to the science rooms를 떼면 The key만 남으니 is입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe books on the top shelf [[빈칸]] very old.',
        choices: ['are', 'is', 'being'],
        answer: 0,
        why: ['', '바로 앞의 shelf에 수를 맞췄습니다. 핵심 주어는 The books(복수)입니다.', '문장에 동사가 없게 됩니다. 주어 뒤에는 동사가 와야 합니다.'],
        explain: 'on the top shelf는 주어를 꾸미는 전치사구입니다. 건너뛰면 핵심 주어는 **The books**(복수)이므로 **are**입니다.',
      },
    },
    {
      title: '동사 자리와 준동사 자리 구별하기',
      body: '한 절(주어 + 동사)에는 **동사가 하나**만 있습니다. 동사가 둘 이상이면 접속사나 관계사가 그 사이를 이어 줘야 합니다. 이것을 셈으로 기억하면 편합니다.\n\n' +
        '**동사의 수 = 접속사·관계사의 수 + 1**\n\n' +
        '그래서 이미 동사가 있는 문장에 동사가 또 필요해 보이면, 그 자리는 **준동사(to부정사·동명사·분사)** 자리입니다.\n\n' +
        '| 문장 | 판단 |\n|---|---|\n' +
        '| The girl **standing** by the window is my cousin. | 동사는 is 하나. standing은 girl을 꾸미는 분사 |\n' +
        '| The girl **stands** by the window. | 다른 동사가 없으므로 stands가 동사 |\n' +
        '| **Learning** a language takes time. | 동사는 takes. 주어 자리는 동명사 |\n' +
        '| The girl **who stands** by the window is my cousin. | 관계사 who가 있어 동사 둘(stands, is) 가능 |\n\n' +
        '> 💡 어법 문제에서 밑줄 친 동사가 나오면 **그 절의 동사가 이미 있는지**부터 셉니다. 동사가 이미 있으면 준동사로, 없으면 동사로 고칩니다.',
      easy: '한 문장은 운전대가 하나인 자동차라고 생각하십시오. 운전대(동사)가 둘이면 차가 움직일 수 없지요. 운전대를 하나 더 달려면 연결 장치(접속사·관계사)가 있어야 합니다.\n\n' +
        '그래서 "The girl stands by the window is my cousin."처럼 연결 장치 없이 운전대가 둘(stands, is)이면 틀린 문장입니다. 하나를 standing으로 바꿔 꾸밈말로 만들면 됩니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe girl [[빈칸]] by the window is my cousin.',
        choices: ['standing', 'stands', 'stood'],
        answer: 0,
        why: ['', '이미 동사 is가 있고 접속사·관계사가 없으므로 동사를 또 쓸 수 없습니다.', '이미 동사 is가 있으므로 과거 동사 stood를 또 쓸 수 없습니다. 꾸미는 말인 분사가 필요합니다.'],
        explain: '이 문장의 동사는 is 하나입니다. 빈칸은 The girl을 꾸미는 준동사 자리이고, 소녀가 직접 서 있으므로 현재분사 **standing**입니다.',
      },
    },
    {
      title: '능동과 수동, 현재분사와 과거분사',
      body: '동사와 분사를 고를 때는 **주어(또는 꾸밈을 받는 명사)가 그 동작을 하는지, 당하는지**를 따집니다.\n\n' +
        '| 관계 | 동사 | 분사 |\n|---|---|---|\n' +
        '| 스스로 함 (능동) | Jia **wrote** the letter. | the girl **writing** a letter (편지를 쓰는 소녀) |\n' +
        '| 당함 (수동) | The letter **was written** by Jia. | a letter **written** in English (영어로 쓰인 편지) |\n\n' +
        '**감정을 나타내는 분사**는 특히 자주 나옵니다.\n\n' +
        '- 감정을 **일으키는** 쪽 → **-ing**: The movie was **boring**. (영화가 지루함을 줌)\n' +
        '- 감정을 **느끼는** 쪽 → **-ed(과거분사)**: I was **bored**. (내가 지루함을 느낌)\n\n' +
        '| 일으키는 쪽 (-ing) | 느끼는 쪽 (-ed) |\n|---|---|\n' +
        '| exciting (신나게 하는) | excited (신이 난) |\n' +
        '| surprising (놀라게 하는) | surprised (놀란) |\n' +
        '| interesting (흥미로운) | interested (흥미를 느끼는) |\n\n' +
        '> ⚠️ 목적어 뒤에 오는 분사도 같습니다. Keep the door **locked**. (문이 잠긴 상태) / I heard my name **called**. (이름이 불리는 것)',
      easy: '"그 일을 누가 했지?"라고 물어보십시오.\n\n' +
        '- 꾸밈받는 말이 **직접 했다** → -ing (짖는 개 a barking dog: 개가 짖음)\n' +
        '- 꾸밈받는 말이 **당했다** → 과거분사 (깨진 창문 a broken window: 창문이 깨뜨려짐)\n\n' +
        '감정도 같습니다. 영화가 나를 지루하게 "만들었으니" 영화는 boring, 나는 지루함을 "당했으니" bored입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nI was [[빈칸]] by the news.',
        choices: ['surprised', 'surprising', 'surprise'],
        answer: 0,
        why: ['', '-ing는 감정을 일으키는 쪽에 씁니다. 나는 놀람을 느낀 쪽입니다.', 'was 뒤에 동사원형을 쓸 수 없습니다. 분사가 필요합니다.'],
        explain: '나는 소식 때문에 놀람을 **느낀** 쪽이므로 과거분사 **surprised**입니다. 소식은 놀라움을 주는 쪽이라 The news was surprising.이 됩니다.',
      },
    },
    {
      title: '관계대명사 what·that·which 구별: 뒤 문장이 완전한가',
      body: '관계사 문제는 **앞에 선행사가 있는지**와 **뒤 문장이 완전한지** 두 가지로 판단합니다.\n\n' +
        '| | 앞에 선행사 | 뒤 문장 | 예 |\n|---|---|---|---|\n' +
        '| **what** | 없음 (선행사를 품고 있음) | 불완전 | **What** I need is time. |\n' +
        '| 관계대명사 **that·which** | 있음 | 불완전 | the bag **that** I lost |\n' +
        '| 접속사 **that** | 없음 | 완전 | I know **that** she is kind. |\n\n' +
        '- **불완전**: 주어나 목적어 같은 성분이 빠져 있음. (I need ___ / I lost ___)\n' +
        '- **완전**: 주어·동사·목적어 등이 모두 갖춰짐. (she is kind)\n\n' +
        'what은 "~하는 것"(= the thing which)이라는 뜻으로 선행사를 이미 품고 있으므로 **앞에 명사가 또 오지 않습니다.** the thing what (×)\n\n' +
        '> ⚠️ 관계대명사 that은 **콤마 뒤**와 **전치사 뒤**에 쓰지 않습니다. My bike, **which** is red, … (○) / , that is red (×) · the house **in which** I live (○) / in that (×)',
      easy: '빈칸 앞뒤를 확인하는 두 가지 질문만 기억하십시오.\n\n' +
        '1. **앞에 꾸밀 명사가 있나?** 없으면 what 또는 접속사 that, 있으면 관계대명사 that·which.\n' +
        '2. **뒤 문장에 빈 자리가 있나?** 빈 자리가 있으면 what이나 관계대명사, 빈 자리가 없으면 접속사 that.\n\n' +
        '예: "___ I want is a long rest." 앞에 명사 없음 + want의 목적어가 빈 자리 → What.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\n[[빈칸]] surprised me most was his calm voice.',
        choices: ['What', 'That', 'Which'],
        answer: 0,
        why: ['', 'That으로 시작하면 "That surprised me most"가 하나의 문장이 되어 뒤의 was와 이어지지 않습니다. 빈칸 뒤에 주어가 빠져 있고 앞에 선행사가 없으므로 What입니다.', 'Which는 앞에 선행사가 있어야 합니다. 여기에는 꾸밀 명사가 없습니다.'],
        explain: '앞에 선행사가 없고, 뒤 문장 ___ surprised me most는 주어가 빠진 불완전한 문장입니다. 그래서 **What**(~한 것)이 알맞습니다. "나를 가장 놀라게 한 것은 그의 차분한 목소리였다."',
      },
    },
    {
      title: '대명사·재귀대명사의 일치와 병렬 구조',
      body: '**대명사**는 가리키는 명사와 수가 맞아야 합니다. 가리키는 명사도 앞에서처럼 수식어를 건너뛰고 찾습니다.\n\n' +
        '- The trees in the park lost **their** leaves. (trees → their)\n' +
        '- The city changed **its** name. (city → its)\n\n' +
        '**재귀대명사(-self, -selves)**는 목적어가 **주어 자신**일 때 씁니다.\n\n' +
        '- Jia looked at **herself** in the mirror. (지아가 지아 자신을 봄)\n' +
        '- Jia looked at **her** in the mirror. (지아가 다른 여자를 봄)\n\n' +
        '**병렬 구조**: and, but, or, both A and B, not only A but also B, A rather than B로 이어진 말은 **같은 꼴**이어야 합니다.\n\n' +
        '- I like reading, writing, and **painting**. (동명사끼리) — and to paint (×)\n' +
        '- She was tired but **happy**. (형용사끼리) — but happily (×)\n' +
        '- He wants to stay home rather than **go** out. (원형끼리)\n\n' +
        '> 💡 병렬 문제는 접속사 **앞쪽**에서 짝이 되는 말을 찾아, 같은 꼴인지 맞대어 봅니다.',
      easy: '병렬은 줄 맞춰 선 사람들과 같습니다. "달리기, 수영, 자전거 타기"처럼 셋이 같은 옷(같은 꼴)을 입어야 한 줄로 보이지요. 하나만 "자전거를 타기 위해"처럼 다른 옷을 입으면 줄이 흐트러집니다.\n\n' +
        '재귀대명사는 거울입니다. 주어가 자기 자신에게 무언가를 하면 거울 속 자신(-self)을 씁니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nOn weekends, Minsu enjoys hiking, swimming, and [[빈칸]].',
        choices: ['riding his bike', 'to ride his bike', 'rides his bike'],
        answer: 0,
        why: ['', 'and 앞의 hiking, swimming이 동명사이므로 짝도 동명사여야 합니다. enjoy는 to부정사를 목적어로 쓰지 않습니다.', 'rides는 동사입니다. enjoys의 목적어로 동명사끼리 나란히 놓여야 합니다.'],
        explain: 'enjoys의 목적어 hiking, swimming과 같은 꼴이 되도록 동명사 **riding his bike**를 씁니다.',
      },
    },
    {
      title: '형용사 자리와 부사 자리',
      body: '형용사와 부사를 고르는 문제는 **그 낱말이 무엇을 꾸미거나 설명하는지**로 판단합니다.\n\n' +
        '| 자리 | 쓰는 말 | 예 |\n|---|---|---|\n' +
        '| 명사를 꾸밈 | 형용사 | a **quiet** room |\n' +
        '| 주어를 설명하는 보어 (be, become, seem, look, sound, smell, taste, feel, remain + ___) | 형용사 | The plan sounds **perfect**. |\n' +
        '| 목적어를 설명하는 보어 (keep, make, find + 목적어 + ___) | 형용사 | Keep the room **clean**. |\n' +
        '| 동사·형용사·부사·문장 전체를 꾸밈 | 부사 | She answered **correctly**. / **very** tall |\n\n' +
        '> ⚠️ look, sound, smell, taste, feel 뒤에 "~하게"라는 우리말 때문에 부사를 쓰기 쉽습니다. The soup tastes **good**. (○) / tastes well (×)\n\n' +
        '모양이 비슷한데 뜻이 다른 부사도 조심합니다.\n\n' +
        '| 낱말 | 뜻 | 낱말 | 뜻 |\n|---|---|---|---|\n' +
        '| hard | 열심히, 단단한 | hardly | 거의 ~ 않다 |\n' +
        '| late | 늦게, 늦은 | lately | 최근에 |\n' +
        '| high | 높이, 높은 | highly | 매우, 대단히 |',
      easy: '"그 말을 빼고 문장을 다시 보자"가 요령입니다.\n\n' +
        '- The plan sounds ___. 에서 빈칸을 빼면 "The plan sounds."로 말이 끊기지요. 꼭 필요한 보어 자리 → 형용사.\n' +
        '- She answered ___. 에서 빈칸을 빼도 "She answered."로 문장이 됩니다. 덧붙여 꾸미는 자리 → 부사.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nYour plan sounds [[빈칸]] to me.',
        choices: ['perfect', 'perfectly', 'perfection'],
        answer: 0,
        why: ['', 'sound는 뒤에 주어를 설명하는 형용사 보어를 씁니다. 부사는 보어가 될 수 없습니다.', 'perfection(완벽함)은 명사라 "계획이 완벽함처럼 들린다"는 어색한 문장이 됩니다. 계획의 상태를 나타내는 형용사가 필요합니다.'],
        explain: 'sound(~하게 들리다) 뒤에는 주어의 상태를 설명하는 **형용사** 보어가 옵니다. Your plan sounds **perfect** to me. (네 계획은 내게 완벽하게 들린다.)',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장에서 어법상 틀린 곳을 찾아 고치십시오.\n\nThe pictures hanging on the wall of the library was painted by students.',
      steps: [
        '동사를 셉니다. 접속사·관계사가 없으므로 동사는 하나뿐이어야 합니다. hanging은 pictures를 꾸미는 분사, was painted가 동사입니다.',
        '주어를 꾸미는 말을 괄호로 묶습니다: The pictures (hanging on the wall of the library) was painted …',
        '핵심 주어는 The pictures(복수)입니다. 바로 앞의 library(단수)에 수를 맞추면 안 됩니다.',
        '능동·수동 확인: 그림은 학생들에 의해 "그려진" 것이므로 수동태 be painted가 맞습니다.',
        '그러므로 was를 복수형 were로 고칩니다.',
      ],
      answer: 'was → were. The pictures hanging on the wall of the library were painted by students. (도서관 벽에 걸린 그림들은 학생들이 그렸다.)',
    },
    {
      q: '빈칸에 what과 that 중 알맞은 것을 고르십시오.\n\n(1) I can\'t remember [[빈칸]] she told me.\n(2) I can\'t believe [[빈칸]] she won the race.',
      steps: [
        '(1) 앞에 선행사가 없습니다. 뒤 문장 she told me ___는 무엇을 말했는지(직접목적어)가 빠진 불완전한 문장입니다. → **what**',
        '(2) 앞에 선행사가 없습니다. 뒤 문장 she won the race는 주어·동사·목적어가 모두 갖춰진 완전한 문장입니다. → 접속사 **that**',
      ],
      answer: '(1) what — 그녀가 내게 말한 것을 기억할 수 없다. (2) that — 그녀가 경주에서 이겼다는 것을 믿을 수 없다.',
    },
  ],

  terms: [
    { term: '수 일치', def: '동사의 꼴(단수·복수)을 주어의 수에 맞추는 것입니다. 주어를 꾸미는 말은 건너뛰고 핵심 주어를 봅니다.' },
    { term: '준동사', def: 'to부정사·동명사·분사처럼 동사에서 나왔지만 문장의 동사 역할은 하지 못하는 말입니다. 명사·형용사·부사처럼 쓰입니다.' },
    { term: '현재분사', def: '동사원형 + -ing 꼴로 "~하는(능동·진행)"의 뜻입니다. 감정 분사에서는 감정을 일으키는 쪽에 씁니다. 예: a barking dog, a boring movie' },
    { term: '과거분사', def: '"~된, ~당한(수동·완료)"의 뜻입니다. 감정 분사에서는 감정을 느끼는 쪽에 씁니다. 예: a broken window, I was bored.' },
    { term: '완전한 문장', def: '주어·동사와, 동사에 필요한 목적어·보어가 모두 갖춰진 문장입니다. 접속사 that 뒤에는 완전한 문장이, what과 관계대명사 뒤에는 불완전한 문장이 옵니다.' },
    { term: '재귀대명사', def: 'myself, herself, themselves처럼 -self(-selves)로 끝나는 대명사입니다. 목적어가 주어 자신일 때 씁니다.' },
    { term: '병렬 구조', def: 'and, but, or 등으로 이어진 말들이 같은 품사·같은 꼴로 나란히 놓이는 구조입니다. 예: reading, writing, and painting' },
    { term: '보어', def: '주어나 목적어가 어떤 상태인지 설명하는 말입니다. 보어 자리에는 부사가 아니라 형용사(또는 명사)가 옵니다. 예: She looks happy.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe number of students who walk to school [[빈칸]] increasing.',
      choices: ['is', 'are', 'being'],
      answer: 0,
      why: ['', 'students에 수를 맞췄습니다. "The number of ~"는 "~의 수"라서 핵심 주어 number에 맞춰 단수입니다.', '문장에 동사가 없게 됩니다. 주어 뒤에는 동사가 필요합니다.'],
      explain: 'The number of + 복수 명사는 "~의 수"이고 핵심 주어는 **number**(단수)이므로 **is**입니다. "걸어서 등교하는 학생 수가 늘고 있다." (A number of students는 "많은 학생"이라서 복수 동사를 씁니다.)',
    },
    {
      id: 'p2', level: 1, type: 'short', concept: 0,
      q: '괄호 안의 동사를 알맞은 꼴로 바꿔 쓰십시오. (현재 시제)\n\nOne of my friends [[빈칸]] in Canada. (live)',
      answer: ['lives'],
      wrong: [{ a: 'live', why: 'friends에 수를 맞췄습니다. 핵심 주어는 One(한 명)이므로 단수 동사 lives입니다.' }],
      explain: 'of my friends를 건너뛰면 핵심 주어는 **One**(단수)입니다. 현재 시제이므로 **lives**. "내 친구 중 한 명은 캐나다에 산다."',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\n[[빈칸]] a foreign language takes a lot of time.',
      choices: ['Learn', 'Learning', 'Learned', 'Learns'],
      answer: 1,
      why: ['동사원형으로 시작하면 명령문이 되어 뒤의 동사 takes와 이어지지 않습니다.', '', '이미 동사 takes가 있으므로 동사 과거형을 또 쓸 수 없습니다.', '이미 동사 takes가 있으므로 동사 현재형을 또 쓸 수 없습니다.'],
      explain: '이 문장의 동사는 takes입니다. 빈칸은 주어 자리이므로 준동사인 동명사 **Learning**이 알맞습니다. "외국어를 배우는 것은 시간이 많이 걸린다."',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe movie was so [[빈칸]] that I watched it twice.',
      choices: ['excited', 'exciting', 'excite'],
      answer: 1,
      why: ['과거분사는 감정을 느끼는 쪽에 씁니다. 영화는 신나는 감정을 일으키는 쪽입니다.', '', 'was so 뒤에 동사원형을 쓸 수 없습니다.'],
      explain: '영화가 신나는 감정을 **일으키는** 쪽이므로 현재분사 **exciting**입니다. "영화가 너무 신나서 나는 두 번 봤다."',
    },
    {
      id: 'p5', level: 1, type: 'ox', concept: 2,
      q: '다음 문장은 어법상 바릅니다.\n\nThe letter writing in English was hard to read.',
      answer: false,
      explain: '편지는 영어로 "쓰인" 것(수동)이므로 과거분사 **written**이 맞습니다. The letter written in English was hard to read. (영어로 쓰인 편지는 읽기 어려웠다.)',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nMy bike, [[빈칸]] my uncle gave me, is still in good shape.',
      choices: ['which', 'that', 'what', 'it'],
      answer: 0,
      why: ['', '관계대명사 that은 콤마 뒤에 쓰지 않습니다.', 'what은 선행사를 품고 있어 앞에 명사(My bike)가 오면 쓸 수 없습니다.', 'it은 접속하는 말이 아니라서 두 절을 이을 수 없습니다.'],
      explain: '선행사 My bike가 있고 뒤 문장 my uncle gave me ___는 목적어가 빠진 불완전한 문장입니다. 콤마 뒤이므로 that은 쓸 수 없고 **which**를 씁니다. "삼촌이 주신 내 자전거는 아직 상태가 좋다."',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 4,
      q: '"지아는 새 반 친구들에게 자기소개를 했다."라는 뜻이 되도록 빈칸에 알맞은 것은 무엇입니까?\n\nJia introduced [[빈칸]] to her new classmates.',
      choices: ['her', 'herself', 'hers', 'she'],
      answer: 1,
      why: ['her를 쓰면 지아가 다른 여자를 소개했다는 뜻이 됩니다.', '', 'hers는 "그녀의 것"이라는 뜻입니다.', 'she는 주격이라 목적어 자리에 올 수 없습니다.'],
      explain: '지아가 소개한 대상이 **지아 자신**이므로 재귀대명사 **herself**를 씁니다.',
    },
    {
      id: 'p8', level: 1, type: 'choice', concept: 5,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nSua answered all the questions [[빈칸]].',
      choices: ['correct', 'correctly', 'correction', 'corrected'],
      answer: 1,
      why: ['answered라는 동작을 꾸미는 자리이므로 형용사가 아니라 부사가 필요합니다.', '', 'correction(수정)은 명사라 동작을 꾸밀 수 없습니다.', 'corrected를 쓰면 "고쳐진 질문"이라는 엉뚱한 뜻이 됩니다. 대답한 방식을 나타내는 부사가 필요합니다.'],
      explain: '빈칸을 빼도 "Sua answered all the questions."로 문장이 완성됩니다. 동작 answered를 꾸미는 **부사** correctly(바르게)가 알맞습니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '어법상 **틀린** 문장은 무엇입니까?',
      choices: [
        'This is the house that my grandfather built.',
        'Tell me that you need for the trip.',
        'The bag which I lost was found yesterday.',
        'I believe that honesty is important.',
      ],
      answer: 1,
      hint: '각 문장에서 that·which·what 뒤의 문장이 완전한지, 앞에 선행사가 있는지 보십시오.',
      why: ['선행사 the house가 있고 뒤 문장 my grandfather built ___는 목적어가 빠져 있으므로 관계대명사 that이 바릅니다.', '', '선행사 The bag이 있고 뒤 문장 I lost ___는 목적어가 빠져 있으므로 which가 바릅니다.', '선행사가 없고 뒤 문장 honesty is important가 완전하므로 접속사 that이 바릅니다.'],
      explain: 'Tell me ___ you need for the trip.에서는 앞에 선행사가 없고, 뒤 문장 you need ___는 목적어가 빠진 불완전한 문장입니다. 그러므로 that이 아니라 **what**을 써야 합니다. "여행에 필요한 것을 말해 줘."',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nWalking to school is cheaper, healthier, and [[빈칸]] for the environment.',
      choices: ['better', 'best', 'well', 'more good'],
      answer: 0,
      hint: 'and 앞에 나란히 놓인 말들이 어떤 꼴인지 보십시오.',
      why: ['', '앞의 cheaper, healthier가 비교급이므로 최상급이 아니라 비교급이어야 합니다.', 'well은 부사(또는 "건강한")입니다. 앞의 비교급 형용사들과 같은 꼴이 아닙니다.', 'good의 비교급은 more good이 아니라 better입니다.'],
      explain: 'cheaper, healthier와 나란히 놓이므로 good의 비교급 **better**를 씁니다. "걸어서 등교하는 것은 더 싸고, 더 건강하고, 환경에도 더 좋다."',
    },
    {
      id: 'p11', level: 2, type: 'short', concept: 0,
      q: '빈칸에 be동사를 알맞은 꼴로 쓰십시오.\n\nThe students in the classroom next to the library [[빈칸]] very noisy yesterday.',
      answer: ['were'],
      hint: '주어를 꾸미는 전치사구를 괄호로 묶고, 시제를 알려 주는 말을 찾으십시오.',
      wrong: [
        { a: 'was', why: '바로 앞의 library(또는 classroom)에 수를 맞췄습니다. 핵심 주어는 The students(복수)입니다.' },
        { a: 'are', why: 'yesterday가 있으므로 과거 시제입니다.' },
      ],
      explain: 'in the classroom next to the library를 건너뛰면 핵심 주어는 **The students**(복수), yesterday가 있으므로 과거 → **were**.',
    },
    {
      id: 'p12', level: 2, type: 'order', concept: 1,
      q: '"운동장에서 축구를 하고 있는 소년은 내 동생이다."라는 뜻이 되도록 순서대로 놓으십시오.',
      choices: ['The boy', 'playing soccer on the playground', 'is', 'my brother.'],
      answer: [0, 1, 2, 3],
      hint: '문장의 동사는 is 하나입니다. playing은 앞의 명사를 꾸밉니다.',
      explain: 'The boy playing soccer on the playground is my brother. — 동사는 is 하나이고, playing soccer on the playground는 The boy를 뒤에서 꾸미는 분사구입니다.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 0,
      q: '다음 글의 (A)~(E) 중 어법상 **틀린** 것은 무엇입니까?\n\n' + DIARY,
      choices: ['(A) keeping', '(B) help', '(C) write', '(D) themselves', '(E) more focused'],
      answer: 1,
      hint: '두 번째 문장의 진짜 주어가 무엇인지 찾으십시오.',
      why: [
        'that절의 주어 자리이므로 동명사 keeping이 바릅니다. 동사는 is입니다.',
        '',
        'Those who write에서 who의 선행사 Those가 복수이므로 write가 바릅니다.',
        'find의 목적어가 주어 Those who write 자신이므로 재귀대명사 themselves가 바릅니다.',
        'calmer and more focused는 비교급 형용사끼리 나란히 놓인 병렬 구조로 바릅니다.',
      ],
      explain: '두 번째 문장의 주어는 동명사구 writing a few lines every evening입니다. 동명사 주어는 **단수**이므로 help를 **helps**로 고쳐야 합니다. (lines나 evening에 수를 맞추면 안 됩니다.)',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 3,
      q: '(A), (B), (C)의 각 네모 안에서 어법에 맞는 말로 가장 알맞은 것은 무엇입니까?\n\nIn our school, the number of students who read paper books (A) [is / are] smaller than it was five years ago. Still, (B) [what / that] many readers say is that paper books are easier to focus on. Some students were (C) [surprising / surprised] to find that they remembered more from paper.',
      choices: ['is – what – surprised', 'are – what – surprised', 'is – that – surprised', 'is – what – surprising', 'are – that – surprising'],
      answer: 0,
      hint: '(A) 핵심 주어, (B) 앞의 선행사와 뒤 문장, (C) 감정을 느끼는 쪽인지 보십시오.',
      why: [
        '',
        '(A) the number of ~는 "~의 수"로 핵심 주어 number가 단수입니다.',
        '(B) 앞에 선행사가 없고 뒤 문장 many readers say ___는 목적어가 빠진 불완전한 문장이므로 what입니다.',
        '(C) 학생들은 놀람을 느낀 쪽이므로 과거분사 surprised입니다.',
        '세 곳이 모두 틀렸습니다. 핵심 주어, 뒤 문장의 완전성, 감정 분사를 다시 확인하십시오.',
      ],
      explain: '(A) 핵심 주어 the number(단수) → **is**. (B) 선행사 없음 + 뒤 문장 불완전 → **what** (what many readers say = 많은 독자가 말하는 것). (C) 학생들이 놀람을 느낌 → **surprised**.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 4,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe trees along the river lost [[빈칸]] leaves early this year.',
      choices: ['its', 'their', "it's", 'theirs'],
      answer: 1,
      hint: '대명사가 가리키는 명사를 찾을 때도 수식어를 건너뜁니다.',
      why: ['바로 앞의 river에 맞췄습니다. 잎을 잃은 것은 The trees(복수)입니다.', '', "it's는 it is(또는 it has)를 줄인 말입니다. 소유를 나타내지 않습니다.", 'theirs는 "그들의 것"이라 뒤에 명사 leaves를 둘 수 없습니다.'],
      explain: 'along the river를 건너뛰면 잎을 잃은 것은 **The trees**(복수)입니다. 그래서 **their** leaves. "강을 따라 늘어선 나무들이 올해는 잎을 일찍 잃었다."',
    },
    {
      id: 'a4', level: 3, type: 'short', concept: 2,
      q: '괄호 안의 낱말을 알맞은 꼴로 바꿔 쓰십시오.\n\nPlease keep the windows [[빈칸]] while the air conditioner is on. (close)',
      answer: ['closed'],
      hint: 'keep + 목적어 + 보어에서 창문이 스스로 닫는지, 닫힌 상태인지 생각하십시오.',
      wrong: [
        { a: 'closing', why: '창문이 스스로 무언가를 닫는 것이 아닙니다. 창문은 닫힌 상태이므로 과거분사입니다.' },
        { a: 'close', why: 'close를 그대로 쓰면 "가까운"이라는 형용사로 읽혀 뜻이 맞지 않습니다. 닫힌 상태는 closed입니다.' },
      ],
      explain: 'keep + 목적어(the windows) + 보어. 창문은 "닫힌" 상태(수동)이므로 과거분사 **closed**. "에어컨이 켜져 있는 동안 창문을 닫아 두세요."',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nNeither the teacher nor the students [[빈칸]] the answer to the riddle.',
      choices: ['knows', 'know', 'knowing', 'to know'],
      answer: 1,
      hint: 'neither A nor B가 주어일 때 동사는 어느 쪽에 맞추는지 떠올려 보십시오.',
      why: ['the teacher에 맞췄습니다. neither A nor B는 동사를 B(가까운 쪽)에 맞춥니다.', '', '문장에 동사가 없게 됩니다.', '문장에 동사가 없게 됩니다. to부정사는 동사 자리에 올 수 없습니다.'],
      explain: 'neither A nor B(A도 B도 아닌)가 주어이면 동사는 **B**에 맞춥니다. B가 the students(복수)이므로 **know**. "선생님도 학생들도 그 수수께끼의 답을 모른다."',
    },
  ],

  deeper: [
    {
      title: '어법 문제는 "구조"를 보는 문제',
      body: '어법 문제를 낱말 하나하나의 뜻으로 풀려고 하면 어렵습니다. 대부분의 어법 문제는 **문장의 뼈대(구조)**를 보면 풀립니다. 다음 순서를 습관으로 만들어 보십시오.\n\n' +
        '1. **동사를 센다** — 접속사·관계사 수 + 1개인가? 많으면 준동사로, 모자라면 동사로.\n' +
        '2. **핵심 주어를 찾는다** — 수식어를 괄호로 묶고 수 일치·대명사 일치를 본다.\n' +
        '3. **관계를 따진다** — 주어(꾸밈받는 말)가 하는가, 당하는가? 감정을 주는가, 느끼는가?\n' +
        '4. **빈 자리를 확인한다** — what·that·which 뒤 문장이 완전한가?\n' +
        '5. **짝을 맞춘다** — and·but·or 앞뒤가 같은 꼴인가? 보어 자리인가, 꾸미는 자리인가?\n\n' +
        '이 다섯 단계는 독해에도 그대로 쓰입니다. 긴 문장을 읽다가 길을 잃으면 동사부터 세고 핵심 주어를 찾으면 문장이 다시 보입니다.',
    },
  ],

  faq: [
    {
      q: '주어가 길면 동사를 어떻게 빨리 찾아요?',
      a: '주어를 꾸미는 말(전치사구, 분사구, 관계사절)을 괄호로 묶어 보십시오. 괄호를 치고 나면 맨 앞의 명사와 그 뒤의 동사만 남습니다. 동사 바로 앞의 명사는 대개 수식어 속의 명사라서 함정입니다.',
    },
    {
      q: '감정을 나타내는 -ing와 -ed는 언제 무엇을 써요?',
      a: '감정을 **일으키는** 쪽이면 -ing, 감정을 **느끼는** 쪽이면 -ed입니다. 책이 흥미로우면 The book is interesting., 내가 흥미를 느끼면 I am interested in the book.\n\n사람이라고 늘 -ed는 아닙니다. 사람이 남을 지루하게 만들면 He is boring.(그는 지루한 사람이다)이 됩니다.',
    },
    {
      q: '관계대명사 that과 접속사 that은 어떻게 구별해요?',
      a: '뒤 문장을 보십시오. 주어나 목적어가 빠져 **불완전**하면 관계대명사, 모두 갖춰져 **완전**하면 접속사입니다. 관계대명사 that 앞에는 꾸밈받는 명사(선행사)가 있습니다.\n\n예: the book that I bought (bought의 목적어가 빠짐 → 관계대명사) / I know that he bought a book. (완전 → 접속사)',
    },
    {
      q: '"냄새가 좋게 난다"는 smells nicely 아닌가요?',
      a: '아닙니다. smell, taste, look, sound, feel 뒤에는 주어의 상태를 설명하는 **형용사**가 옵니다. The bread smells nice.(빵 냄새가 좋다)가 맞습니다. 우리말로 "~하게"라고 옮겨지더라도 영어에서는 형용사 보어 자리입니다.',
    },
  ],

  mistakes: [
    '동사 바로 앞의 명사에 수를 맞추는 실수 — The key to the rooms are (×) → The key to the rooms is (○). 수식어를 괄호로 묶고 핵심 주어를 봅니다.',
    '감정 분사를 거꾸로 쓰는 실수 — I was boring. (나는 지루한 사람이었다) / I was bored. (나는 지루했다). 감정을 느끼면 -ed입니다.',
    '선행사가 있는데 what을 쓰거나, 콤마 뒤에 관계대명사 that을 쓰는 실수 — the thing what (×), My bike, that … (×) → the thing that / My bike, which …',
  ],

  gens: [
    {
      id: 'subject-verb-agreement',
      level: 1,
      title: '긴 주어의 수 일치',
      make: function (R) {
        var it = R.pick(AGREE);
        var past = it[5] ? false : R.bool();
        var sg = past ? 'was' : 'is', pl = past ? 'were' : 'are';
        var correct = it[2] === 1 ? sg : pl;
        var wrongNum = it[2] === 1 ? pl : sg;
        var numKr = it[2] === 1 ? '단수' : '복수';
        var reason = {};
        reason[wrongNum] = '수식어 속의 명사에 수를 맞췄습니다. 핵심 주어는 ' + it[1] + ' — ' + numKr + '입니다.';
        reason.being = '문장에 동사가 없게 됩니다. 주어 뒤에는 동사가 와야 합니다.';
        var pick = R.choices(correct, [wrongNum, 'being'], 3);
        return {
          type: 'choice', concept: 0,
          q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0] + ' [[빈칸]] ' + it[3],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: '주어를 꾸미는 말을 괄호로 묶으면 핵심 주어는 **' + it[1] + '**(' + numKr + ')입니다. ' + (past ? '과거' : '현재') + ' 시제로 쓰면 → **' + correct + '**' + (past ? '' : '. "' + it[4] + '."'),
        };
      },
    },
    {
      id: 'participle-choice',
      level: 2,
      title: '현재분사와 과거분사 고르기',
      make: function (R) {
        var it = R.pick(PART);
        var correct = it[2];
        var other = it[3] === correct ? it[4] : it[3];
        var verbS = it[1] + 's';
        var reason = {};
        reason[other] = '꾸밈받는 말(또는 주어)과 동작의 관계를 다시 보십시오. ' + it[5] + '입니다.';
        reason[verbS] = '이 자리는 동사 자리가 아니라 명사를 꾸미거나 상태를 설명하는 분사 자리입니다.';
        var pick = R.choices(correct, [other, verbS], 3);
        return {
          type: 'choice', concept: 2,
          q: '빈칸에 들어갈 동사(' + it[1] + ')의 알맞은 꼴은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: it[5] + ' → **' + correct + '**',
        };
      },
    },
  ],

  vocab: [
    { w: 'diary', m: '일기', ex: 'I write in my diary before bed.', exm: '나는 자기 전에 일기를 쓴다.' },
    { w: 'regularly', m: '규칙적으로', ex: 'She exercises regularly to stay healthy.', exm: '그녀는 건강을 유지하려고 규칙적으로 운동한다.' },
    { w: 'focused', m: '집중한', ex: 'Stay focused during the test.', exm: '시험 보는 동안 집중하십시오.' },
    { w: 'calm', m: '침착한, 차분한', ex: 'His calm voice made everyone feel safe.', exm: '그의 차분한 목소리 덕분에 모두가 안심했다.' },
    { w: 'honesty', m: '정직', ex: 'Honesty is the most important rule in our club.', exm: '정직은 우리 동아리의 가장 중요한 규칙이다.' },
    { w: 'riddle', m: '수수께끼', ex: 'Nobody could solve the riddle.', exm: '아무도 그 수수께끼를 풀지 못했다.' },
    { w: 'environment', m: '환경', ex: 'Riding a bike is good for the environment.', exm: '자전거를 타는 것은 환경에 좋다.' },
    { w: 'confidence', m: '자신감', ex: 'Practice gave Doyun more confidence.', exm: '연습 덕분에 도윤이는 자신감이 더 생겼다.' },
    { w: 'introduce', m: '소개하다', ex: 'Let me introduce myself.', exm: '제 소개를 하겠습니다.' },
    { w: 'disappointed', m: '실망한', ex: 'We were disappointed with the score.', exm: '우리는 그 점수에 실망했다.' },
    { w: 'lecture', m: '강의, 강연', ex: 'The lecture on space was very interesting.', exm: '우주에 관한 강연은 무척 흥미로웠다.' },
    { w: 'shelf', m: '선반, 책장 칸', ex: 'Put the dictionary back on the shelf.', exm: '사전을 다시 책장에 꽂아 두어라.' },
    { w: 'noisy', m: '시끄러운', ex: 'The cafeteria is always noisy at lunchtime.', exm: '구내식당은 점심시간에 늘 시끄럽다.' },
    { w: 'correctly', m: '바르게, 정확하게', ex: 'Make sure you spell the words correctly.', exm: '낱말의 철자를 꼭 정확하게 쓰십시오.' },
    { w: 'increase', m: '늘다, 증가하다', ex: 'The number of visitors increases every spring.', exm: '방문객 수는 봄마다 늘어난다.' },
  ],
});
})();
