/* 영어Ⅰ · 명사절과 상관접속사
 * 예문은 모두 직접 쓴 문장이다(가상의 인물). */
(function () {
  // 수 일치 생성기: [문장(괄호 안 두 형태), 정답, 다른 형태, 까닭, 개념 카드]
  var AGREE = [
    ['Not only Minsu but also his sisters (is / are) good at drawing.', 'are', 'is', 'not only A but also B는 B(his sisters)에 동사를 맞춥니다. 복수이므로 are입니다.', 4],
    ['Not only the students but also the principal (was / were) at the meeting.', 'was', 'were', 'not only A but also B는 B(the principal)에 동사를 맞춥니다. 단수이므로 was입니다.', 4],
    ['Jia as well as her parents (enjoys / enjoy) hiking.', 'enjoys', 'enjoy', 'B as well as A는 앞에 있는 B(Jia)에 동사를 맞춥니다. 단수이므로 enjoys입니다.', 4],
    ['The children as well as their teacher (was / were) excited.', 'were', 'was', 'B as well as A는 앞에 있는 B(the children)에 동사를 맞춥니다. 복수이므로 were입니다.', 4],
    ['Either you or your brother (has / have) to feed the dog.', 'has', 'have', 'either A or B는 동사에 가까운 B(your brother)에 맞춥니다. 단수이므로 has입니다.', 4],
    ['Either my parents or I (am / are) going to the market.', 'am', 'are', 'either A or B는 동사에 가까운 B(I)에 맞춥니다. 주어 I에 맞는 be동사는 am입니다.', 4],
    ['Neither the manager nor the workers (knows / know) the answer.', 'know', 'knows', 'neither A nor B는 동사에 가까운 B(the workers)에 맞춥니다. 복수이므로 know입니다.', 4],
    ['Neither the students nor their teacher (was / were) late.', 'was', 'were', 'neither A nor B는 동사에 가까운 B(their teacher)에 맞춥니다. 단수이므로 was입니다.', 4],
    ['Both Seojun and Hayun (plays / play) the violin.', 'play', 'plays', 'both A and B는 두 사람(것)을 함께 가리키므로 늘 복수로 받습니다.', 4],
    ['Not the players but the coach (is / are) responsible for the decision.', 'is', 'are', 'not A but B는 B(the coach)에 동사를 맞춥니다. 단수이므로 is입니다.', 4],
    ['Not the coach but the players (wants / want) a day off.', 'want', 'wants', 'not A but B는 B(the players)에 동사를 맞춥니다. 복수이므로 want입니다.', 4],
    ['Most of the milk (has / have) gone bad.', 'has', 'have', 'most of 뒤의 명사(the milk)에 동사를 맞춥니다. milk는 셀 수 없는 명사라 단수 취급하므로 has입니다.', 5],
    ['Most of the students (has / have) finished the test.', 'have', 'has', 'most of 뒤의 명사(the students)에 동사를 맞춥니다. 복수이므로 have입니다.', 5],
    ['Half of the pizza (was / were) eaten in ten minutes.', 'was', 'were', 'half of도 뒤의 명사(the pizza)에 동사를 맞춥니다. 피자 한 판의 절반이므로 단수 was입니다.', 5],
    ['Some of the apples (is / are) rotten.', 'are', 'is', 'some of 뒤의 명사(the apples)에 동사를 맞춥니다. 복수이므로 are입니다.', 5],
    ['All of the information (was / were) useful.', 'was', 'were', 'all of 뒤의 명사(the information)에 동사를 맞춥니다. information은 셀 수 없는 명사라 단수 취급하므로 was입니다.', 5],
    ['Most of my friends (lives / live) near the school.', 'live', 'lives', 'most of 뒤의 명사(my friends)에 동사를 맞춥니다. 복수이므로 live입니다.', 5],
    ['The number of tourists (is / are) rising every year.', 'is', 'are', 'the number of는 "~의 수"라는 뜻이고 주어의 중심은 number(수)입니다. 단수이므로 is입니다.', 5],
    ['A number of tourists (is / are) waiting for the bus.', 'are', 'is', 'a number of는 "많은"이라는 뜻이고 주어의 중심은 tourists입니다. 복수이므로 are입니다.', 5],
    ['The number of students in my class (is / are) thirty.', 'is', 'are', 'the number of + 복수 명사는 "~의 수" 하나를 말하므로 단수 동사 is를 씁니다.', 5],
    ['A number of questions (was / were) asked after the talk.', 'were', 'was', 'a number of + 복수 명사는 "많은 ~"이므로 복수 동사 were를 씁니다.', 5],
    ['The police (is / are) checking every car on the road.', 'are', 'is', 'police는 늘 복수로 취급하는 명사입니다. 그래서 are를 씁니다.', 5],
    ['Whether we win or lose (does / do) not matter.', 'does', 'do', 'whether가 이끄는 명사절 주어는 절 하나를 한 덩어리로 보아 단수 취급합니다. win과 lose 두 동사가 있어도 does입니다.', 1],
    ['That he told the truth (was / were) clear to everyone.', 'was', 'were', 'that이 이끄는 명사절 주어는 단수 취급합니다. 그래서 was입니다.', 1],
  ];

  // 명사절·동격 생성기: [빈칸 문장, 정답, [[오답, 까닭], …], 개념 카드]
  var CLAUSE = [
    ['___ the school trip will be canceled has not been decided yet.', 'Whether', [
      ['If', 'if가 이끄는 절은 문장 맨 앞의 주어 자리에 쓰지 않습니다. 주어 자리에는 whether를 씁니다.'],
      ['What', 'what은 뒤에 주어나 목적어가 빠진 절이 옵니다. the school trip will be canceled는 빠진 것이 없는 완전한 절입니다.'],
      ['Which', 'which는 앞에 꾸밀 명사가 있거나 뒤에 빠진 것이 있어야 합니다. 여기는 "~인지"라는 뜻의 주어 자리입니다.'],
    ], 0],
    ["I don't know ___ he will come to the party or not.", 'whether', [
      ['that', '끝에 or not이 있으니 "~인지 아닌지"라는 뜻이 필요합니다. that은 "~라는 것"이라는 확정된 사실을 이끕니다.'],
      ['what', 'what 뒤에는 빠진 것이 있는 절이 옵니다. he will come to the party는 완전한 절입니다.'],
      ['which', 'which 뒤에도 빠진 것이 있어야 합니다. 여기는 "~인지 아닌지"를 묻는 자리입니다.'],
    ], 0],
    ["The problem is ___ we don't have enough time.", 'that', [
      ['what', 'what 뒤에는 빠진 것이 있는 절이 옵니다. we don\'t have enough time은 완전한 절입니다.'],
      ['which', 'which는 관계대명사로 앞 명사를 꾸미거나 의문사로 "어느 것"을 묻습니다. 보어 자리의 완전한 절은 that이 이끕니다.'],
      ['if', 'if는 주로 동사의 목적어 자리에 쓰고, 보어 자리에는 잘 쓰지 않습니다. 뜻도 "~라는 것"이 알맞습니다.'],
    ], 0],
    ['Many people believe ___ breakfast is the most important meal of the day.', 'that', [
      ['what', 'what 뒤에는 빠진 것이 있는 절이 옵니다. breakfast is the most important meal은 완전한 절입니다.'],
      ['which', 'which는 앞 명사를 꾸미는 관계대명사로 쓰거나 "어느 것"을 묻습니다. 믿는 내용을 이끄는 말은 that입니다.'],
      ['whether', 'believe는 사실이라고 여기는 내용(~라는 것)을 목적어로 받습니다. "~인지 아닌지"를 뜻하는 whether와 어울리지 않습니다.'],
    ], 0],
    ['Our picnic plan depends on ___ the weather is good.', 'whether', [
      ['if', '전치사(on) 뒤에는 if절을 쓰지 않습니다. 전치사 뒤에는 whether를 씁니다.'],
      ['that', '전치사 바로 뒤에는 that절을 쓰지 않습니다. 뜻도 "날씨가 좋은지 아닌지"가 알맞습니다.'],
      ['what', 'what 뒤에는 빠진 것이 있는 절이 옵니다. the weather is good은 완전한 절입니다.'],
    ], 0],
    ['Jia asked me ___ I could lend her my umbrella.', 'if', [
      ['that', 'ask는 묻는 동사라서 "~인지"를 뜻하는 if나 whether와 어울립니다. that은 확정된 사실을 이끕니다.'],
      ['what', 'what 뒤에는 빠진 것이 있는 절이 옵니다. I could lend her my umbrella는 완전한 절입니다.'],
      ['which', 'which 뒤에도 빠진 것이 있어야 합니다. 여기는 "빌려줄 수 있는지"를 묻는 자리입니다.'],
    ], 0],
    ["Seojun hasn't decided ___ to join the soccer club or the art club.", 'whether', [
      ['if', 'to부정사 바로 앞에는 if를 쓰지 않습니다. whether to + 동사원형(~할지 말지)으로 씁니다.'],
      ['that', 'that 뒤에는 주어와 동사를 갖춘 절이 옵니다. to부정사 앞에는 쓰지 않습니다.'],
      ['what', 'join 뒤에 목적어(the soccer club)가 이미 있어서 what이 들어갈 자리가 없습니다.'],
    ], 0],
    ['The fact ___ she won the prize made her parents proud.', 'that', [
      ['which', 'she won the prize는 빠진 것이 없는 완전한 절입니다. 관계대명사 which는 쓸 수 없고, the fact의 내용을 풀어 주는 동격의 that을 씁니다.'],
      ['what', 'what은 앞에 꾸밀 명사(the fact)가 있으면 쓰지 않습니다.'],
      ['whether', 'the fact(사실)의 내용은 확정된 것이므로 "~인지 아닌지"를 뜻하는 whether와 어울리지 않습니다.'],
    ], 2],
    ['The story ___ Minsu told us last night was very funny.', 'that', [
      ['what', 'what은 앞에 꾸밀 명사(the story)가 있으면 쓰지 않습니다.'],
      ['whether', 'told의 목적어가 빠진 불완전한 절이므로 관계대명사가 필요합니다. whether는 완전한 절을 이끕니다.'],
      ['if', 'if는 완전한 절을 이끄는 접속사입니다. told의 목적어가 빠진 자리에는 관계대명사를 씁니다.'],
    ], 2],
    ['There is a good chance ___ it will snow tomorrow.', 'that', [
      ['which', 'it will snow tomorrow는 완전한 절이라 관계대명사 which는 쓸 수 없습니다. a chance(가능성)의 내용을 풀어 주는 동격의 that을 씁니다.'],
      ['what', 'what은 앞에 꾸밀 명사(a good chance)가 있으면 쓰지 않습니다.'],
      ['whether', '"내일 눈이 올 가능성"이라는 확정된 내용을 풀어 주므로 동격의 that을 씁니다.'],
    ], 2],
    ["I can't tell ___ or not this answer is correct.", 'whether', [
      ['if', 'or not 바로 앞에는 if를 쓰지 않습니다. whether or not으로 씁니다.'],
      ['that', 'that 바로 뒤에 or not을 붙여 쓰지 않습니다. "~인지 아닌지"는 whether or not입니다.'],
      ['what', 'what은 뒤에 빠진 것이 있는 절이 와야 합니다. 여기는 "맞는지 아닌지"를 묻는 자리입니다.'],
    ], 0],
    ['We were surprised by the news ___ the museum would close.', 'that', [
      ['which', 'the museum would close는 완전한 절이라 관계대명사 which는 쓸 수 없습니다. the news의 내용을 풀어 주는 동격의 that을 씁니다.'],
      ['what', 'what은 앞에 꾸밀 명사(the news)가 있으면 쓰지 않습니다.'],
      ['if', 'if는 명사 뒤에서 그 명사의 내용을 풀어 주지 않습니다. 동격의 that을 씁니다.'],
    ], 2],
    ['The question is ___ we can trust him.', 'whether', [
      ['if', 'if는 주로 동사의 목적어 자리에만 씁니다. be동사 뒤의 보어 자리에는 whether를 씁니다.'],
      ['what', 'what 뒤에는 빠진 것이 있는 절이 옵니다. we can trust him은 완전한 절입니다.'],
      ['which', 'which 뒤에도 빠진 것이 있어야 합니다. question(질문)의 내용인 "~인지 아닌지"는 whether가 이끕니다.'],
    ], 0],
    ['His dream ___ becoming a pilot finally came true.', 'of', [
      ['that', '동격의 that 뒤에는 주어와 동사를 갖춘 절이 옵니다. becoming a pilot은 동명사구라서 of를 씁니다.'],
      ['which', 'which는 관계대명사로 뒤에 절이 와야 합니다. 동명사구(becoming a pilot) 앞에서 내용을 풀어 줄 때는 of를 씁니다.'],
      ['whether', 'whether 뒤에는 절이나 to부정사가 옵니다. 꿈의 내용을 동명사로 풀어 줄 때는 of를 씁니다.'],
    ], 2],
    ['Nobody believed the rumor ___ a famous singer had moved to our town.', 'that', [
      ['which', 'a famous singer had moved to our town은 완전한 절이라 관계대명사 which는 쓸 수 없습니다. 소문의 내용을 풀어 주는 동격의 that입니다.'],
      ['what', 'what은 앞에 꾸밀 명사(the rumor)가 있으면 쓰지 않습니다.'],
      ['whether', '믿지 않은 것은 "~라는 소문"이라는 정해진 내용입니다. "~인지 아닌지"가 아닙니다.'],
    ], 2],
    ['I wonder ___ she will like my present.', 'if', [
      ['that', 'wonder(궁금해하다)는 "~인지"를 목적어로 받습니다. that은 확정된 사실을 이끌어 뜻이 맞지 않습니다.'],
      ['what', 'what 뒤에는 빠진 것이 있는 절이 옵니다. she will like my present는 완전한 절입니다.'],
      ['which', 'which 뒤에도 빠진 것이 있어야 합니다. 여기는 "좋아할지"를 궁금해하는 자리입니다.'],
    ], 0],
    ["The idea ___ we should plant more trees got everyone's support.", 'that', [
      ['which', 'we should plant more trees는 완전한 절이라 관계대명사 which는 쓸 수 없습니다. 생각의 내용을 풀어 주는 동격의 that입니다.'],
      ['what', 'what은 앞에 꾸밀 명사(the idea)가 있으면 쓰지 않습니다.'],
      ['of', 'of 뒤에는 명사나 동명사가 옵니다. 주어와 동사를 갖춘 절 앞에는 that을 씁니다.'],
    ], 2],
    ['Minsu never gave up the hope ___ winning the race.', 'of', [
      ['that', '동격의 that 뒤에는 주어와 동사를 갖춘 절이 옵니다. winning the race는 동명사구라서 of를 씁니다.'],
      ['which', 'which 뒤에는 절이 와야 합니다. 동명사구 앞에서 희망의 내용을 풀어 줄 때는 of를 씁니다.'],
      ['whether', 'whether 뒤에는 절이나 to부정사가 옵니다. 동명사구 앞에는 of를 씁니다.'],
    ], 2],
    ['The book ___ I borrowed from Jia is about space.', 'that', [
      ['what', 'what은 앞에 꾸밀 명사(the book)가 있으면 쓰지 않습니다.'],
      ['whether', 'borrowed의 목적어가 빠진 불완전한 절이므로 관계대명사가 필요합니다. whether는 완전한 절을 이끕니다.'],
      ['if', 'if는 완전한 절을 이끄는 접속사입니다. 목적어가 빠진 자리에는 관계대명사를 씁니다.'],
    ], 2],
    ['The truth is ___ I forgot her birthday.', 'that', [
      ['what', 'what 뒤에는 빠진 것이 있는 절이 옵니다. I forgot her birthday는 완전한 절입니다.'],
      ['which', 'which는 관계대명사로 앞 명사를 꾸미거나 "어느 것"을 묻습니다. 보어 자리의 완전한 절은 that이 이끕니다.'],
      ['whether', '진실은 "생일을 잊었다는 것"이라는 확정된 내용입니다. "~인지 아닌지"가 아닙니다.'],
    ], 0],
    ['It is still unclear ___ the game will be held in the rain.', 'whether', [
      ['what', 'what 뒤에는 빠진 것이 있는 절이 옵니다. the game will be held in the rain은 완전한 절입니다.'],
      ['which', 'which 뒤에도 빠진 것이 있어야 합니다. unclear(분명하지 않은) 뒤에는 "~인지 아닌지"가 알맞습니다.'],
      ['of', 'of 뒤에는 명사나 동명사가 옵니다. 주어와 동사를 갖춘 절이 이어집니다.'],
    ], 1],
  ];
  // CLAUSE 와 같은 순서의 해설
  var CLAUSE_WHY = [
    '빈칸부터 canceled까지가 has not been decided의 주어입니다. "~인지"라는 뜻의 명사절이 문장 맨 앞 주어 자리에 오므로 whether를 씁니다.',
    'know의 목적어 자리에서 "그가 파티에 올지 안 올지"라는 뜻이 필요합니다. 끝의 or not과 어울리는 whether를 씁니다.',
    'be동사 뒤의 보어 자리에 "시간이 충분하지 않다는 것"이라는 확정된 내용이 오므로 that을 씁니다.',
    'believe의 목적어 자리에 "아침이 가장 중요한 식사라는 것"이라는 내용이 오므로 that을 씁니다.',
    '전치사 on 뒤에 "날씨가 좋은지"라는 명사절이 옵니다. 전치사 뒤에는 if가 아니라 whether를 씁니다.',
    'asked의 목적어 자리에서 "우산을 빌려줄 수 있는지"를 묻습니다. 동사의 목적어 자리이므로 if를 쓸 수 있습니다.',
    '바로 뒤에 to부정사가 오므로 whether to(~할지 말지)를 씁니다.',
    'she won the prize는 빠진 것이 없는 완전한 절이고 the fact의 내용을 풀어 줍니다. 그래서 동격의 that입니다.',
    'Minsu told us 뒤에 told의 목적어(무엇을?)가 빠져 있습니다. 앞의 the story를 꾸미는 관계대명사 that(또는 which)입니다.',
    'it will snow tomorrow는 완전한 절이고 a good chance(가능성)의 내용을 풀어 줍니다. 그래서 동격의 that입니다.',
    '빈칸 바로 뒤에 or not이 있습니다. "~인지 아닌지"는 whether or not으로 씁니다.',
    'the museum would close는 완전한 절이고 the news의 내용을 풀어 줍니다. 그래서 동격의 that입니다.',
    'be동사 뒤의 보어 자리에 "그를 믿을 수 있는지"라는 뜻이 오므로 whether를 씁니다.',
    'becoming a pilot은 동명사구입니다. 명사의 내용을 동명사구로 풀어 줄 때는 동격의 of를 씁니다.',
    'a famous singer had moved to our town은 완전한 절이고 the rumor의 내용을 풀어 줍니다. 그래서 동격의 that입니다.',
    'wonder의 목적어 자리에서 "그녀가 선물을 좋아할지"라는 뜻이 필요합니다. 동사의 목적어 자리이므로 if를 쓸 수 있습니다.',
    'we should plant more trees는 완전한 절이고 the idea의 내용을 풀어 줍니다. 그래서 동격의 that입니다.',
    'winning the race는 동명사구입니다. 명사(the hope)의 내용을 동명사구로 풀어 줄 때는 동격의 of를 씁니다.',
    'I borrowed from Jia 뒤에 borrowed의 목적어가 빠져 있습니다. 앞의 the book을 꾸미는 관계대명사 that(또는 which)입니다.',
    'be동사 뒤의 보어 자리에 "내가 그녀의 생일을 잊었다는 것"이라는 확정된 내용이 오므로 that을 씁니다.',
    'It은 가주어이고, 빈칸부터가 진주어입니다. unclear(분명하지 않은) 뒤에는 "~인지"라는 뜻의 whether가 어울립니다.',
  ];

Tutor.registerUnit({
  id: 'eng-h-e1-02',
  course: 'eng-h-e1',
  title: '명사절과 상관접속사',
  summary: 'that·whether가 이끄는 명사절과 동격의 that, 상관접속사와 수 일치를 한 번에 정리합니다.',
  goals: [
    'that·whether·if가 이끄는 명사절의 뜻과 쓰이는 자리를 구별할 수 있다.',
    '명사절 주어를 가주어 it으로 바꾸어 쓰고, 동격의 that과 관계대명사 that을 구별할 수 있다.',
    '상관접속사의 뜻을 알고 A와 B를 같은 형태로 나란히 쓸 수 있다.',
    '상관접속사, most of, the number of와 a number of, 집합명사가 주어일 때 동사의 수를 맞출 수 있다.',
  ],
  standards: [],

  concepts: [
    {
      title: 'that·whether·if가 이끄는 명사절',
      body: '**명사절**은 문장 안에서 명사처럼 주어·목적어·보어 자리에 들어가는 절(주어 + 동사)입니다.\n\n' +
        '| 접속사 | 뜻 | 예 |\n|---|---|---|\n' +
        '| that | ~라는 것 (확정된 내용) | I believe **that** honesty is important. |\n' +
        '| whether | ~인지 (아닌지) | **Whether** he will come is uncertain. |\n' +
        '| if | ~인지 (아닌지) | I wonder **if** it will rain. |\n\n' +
        'that·whether·if 뒤에는 빠진 것이 없는 **완전한 절**이 옵니다. 목적어 자리의 that은 자주 생략합니다(I think (that) you are right.).\n\n' +
        '**if는 주로 동사의 목적어 자리에만** 씁니다. 다음 자리에는 whether를 씁니다.\n\n' +
        '- 문장 맨 앞의 주어: **Whether** we win or lose does not matter.\n' +
        '- 전치사 뒤: It depends on **whether** we have enough money.\n' +
        '- be동사 뒤의 보어: The question is **whether** he is ready.\n' +
        '- 바로 뒤에 or not: I don\'t know **whether or not** she agrees.\n' +
        '- to부정사 앞: I can\'t decide **whether to** stay or leave.\n\n' +
        '> 💡 whether는 위의 모든 자리에 쓸 수 있습니다. 어느 쪽을 쓸지 헷갈리면 whether를 고르면 안전합니다.',
      easy: 'that은 "~라는 것", whether와 if는 "~인지"라고 외우면 됩니다. 확실한 내용이면 that, 아직 모르는 내용이면 whether·if입니다.\n\n' +
        'if는 몸집이 작아서 동사 바로 뒤(목적어 자리)에만 들어간다고 생각하십시오. 문장 맨 앞, 전치사 뒤, or not 앞, to 앞처럼 다른 자리는 모두 whether의 몫입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 if를 쓸 수 **없는** 문장은 무엇입니까?',
        choices: [
          'I asked her ___ she was hungry.',
          '___ we win or lose does not matter.',
          'Do you know ___ the store is open today?',
        ],
        answer: 1,
        why: [
          'asked의 목적어 자리입니다. 동사의 목적어 자리에는 if를 쓸 수 있습니다.',
          '',
          'know의 목적어 자리입니다. 동사의 목적어 자리에는 if를 쓸 수 있습니다.',
        ],
        explain: '문장 맨 앞의 주어 자리에는 if절을 쓰지 않습니다. **Whether** we win or lose does not matter.처럼 whether를 씁니다.',
      },
    },
    {
      title: '명사절 주어와 가주어 it',
      body: 'that절이나 whether절이 주어가 되면 주어가 길어져 문장의 균형이 무너집니다. 그래서 긴 명사절을 문장 뒤로 보내고, 비어 있는 주어 자리에 **가주어 it**을 둡니다. 뒤로 보낸 명사절이 **진주어**입니다.\n\n' +
        '- **That** he passed the test surprised everyone.\n  → **It** surprised everyone **that** he passed the test.\n' +
        '- **Whether** the plan will work is unclear.\n  → **It** is unclear **whether** the plan will work.\n\n' +
        '가주어 it에는 뜻이 없습니다. "그것"으로 옮기지 않고, 진주어를 주어로 넣어 해석합니다: "그 계획이 잘될지는 분명하지 않다."\n\n' +
        '명사절 주어는 절 하나를 한 덩어리로 보아 **단수**로 취급합니다(That he lied **was** clear.).\n\n' +
        '> 💡 It is clear/true/important/strange **that** ~, It is unclear/uncertain/doubtful **whether** ~ 꼴로 자주 쓰입니다. 앞의 형용사가 확실함을 나타내면 that, 불확실함을 나타내면 whether가 어울립니다.',
      easy: '긴 짐을 들고 버스에 타면 문 앞이 막히니 짐을 뒤쪽 짐칸에 넣고 자리표(it)만 남겨 두는 것과 같습니다.\n\n' +
        '짐(긴 명사절)은 문장 뒤에 있고, 앞자리에는 자리표 it만 있습니다. 그래서 해석할 때는 자리표가 아니라 짐을 꺼내 주어로 읽습니다.',
      check: {
        type: 'ox',
        q: '다음 문장에서 맨 앞의 It은 "그것"으로 해석해야 한다.\n\nIt is unclear whether the bus will come on time.',
        answer: false,
        explain: 'It은 뜻이 없는 가주어이고, 진주어는 whether the bus will come on time입니다. "버스가 제시간에 올지는 분명하지 않다"로 해석합니다.',
      },
    },
    {
      title: '동격의 that과 관계대명사 that',
      body: '명사 바로 뒤의 that은 두 가지로 쓰입니다. **that 뒤의 절이 완전한지**로 구별합니다.\n\n' +
        '| | 동격의 that (접속사) | 관계대명사 that |\n|---|---|---|\n' +
        '| 하는 일 | 앞 명사의 **내용**을 풀어 줌 | 앞 명사를 **꾸며 줌** |\n' +
        '| that 뒤 | 완전한 절 | 주어나 목적어가 빠진 불완전한 절 |\n' +
        '| 예 | the news **that** our team won | the news **that** he told me |\n' +
        '| which로 바꾸기 | 안 됨 | 됨 |\n\n' +
        'the news that our team won에서 our team won은 빠진 것이 없고, "우리 팀이 이겼다는 소식"처럼 소식의 내용입니다. the news that he told me에서는 told의 목적어가 빠져 있고, "그가 내게 말해 준 소식"처럼 소식을 꾸밉니다.\n\n' +
        '동격의 that을 자주 거느리는 명사: fact, news, idea, belief, hope, rumor, evidence, chance, possibility\n\n' +
        '**동격의 of**: 명사의 내용을 명사나 동명사로 풀어 줄 때는 of를 씁니다. the dream **of** becoming a pilot(조종사가 되는 꿈), the idea **of** living abroad(외국에서 산다는 생각)',
      easy: '동격의 that은 "=(같다)" 표시라고 생각하십시오. the news that our team won은 "소식 = 우리 팀이 이겼다"입니다. 오른쪽만 떼어 읽어도 완전한 문장이지요.\n\n' +
        '관계대명사 that 뒤를 떼어 읽으면 he told me처럼 "무엇을?"이 빠져 있습니다. 빠진 것이 있으면 관계대명사, 없으면 동격입니다.',
      check: {
        type: 'choice',
        q: '밑줄 친 that이 **동격의 that**인 문장은 무엇입니까?',
        choices: [
          'The news __that__ our team won spread quickly.',
          'The news __that__ Seojun brought surprised us.',
          'This is the book __that__ I borrowed yesterday.',
        ],
        answer: 0,
        why: [
          '',
          'brought의 목적어가 빠진 불완전한 절입니다. 앞 명사를 꾸미는 관계대명사 that입니다.',
          'borrowed의 목적어가 빠진 불완전한 절입니다. 앞 명사를 꾸미는 관계대명사 that입니다.',
        ],
        explain: 'our team won은 빠진 것이 없는 완전한 절이고, 소식의 내용(우리 팀이 이겼다)을 풀어 줍니다. 그래서 동격의 that입니다.',
      },
    },
    {
      title: '상관접속사와 병렬 구조',
      body: '**상관접속사**는 두 부분이 짝을 이루어 A와 B를 잇는 접속사입니다.\n\n' +
        '| 형태 | 뜻 |\n|---|---|\n' +
        '| both A and B | A와 B 둘 다 |\n' +
        '| either A or B | A와 B 중 하나 |\n' +
        '| neither A nor B | A도 B도 아닌 |\n' +
        '| not A but B | A가 아니라 B |\n' +
        '| not only A but also B | A뿐만 아니라 B도 |\n' +
        '| B as well as A | A뿐만 아니라 B도 |\n\n' +
        '**B as well as A**는 순서에 주의합니다. 강조하는 B가 **앞**에 옵니다. not only English but also Chinese = Chinese as well as English\n\n' +
        'A와 B는 문법적으로 **같은 형태**(명사-명사, 형용사-형용사, to부정사-to부정사, 동명사-동명사)여야 합니다. 이것을 **병렬 구조**라고 합니다.\n\n' +
        '- She is not only **smart** but also **kind**. (형용사-형용사)\n' +
        '- You can either **call** me or **send** a text. (동사원형-동사원형)\n' +
        '- ⚠️ She likes not only **swimming** but also **to ski**. → but also **skiing**',
      easy: '상관접속사는 짝꿍이 정해진 말입니다. either는 or와, neither는 nor와, both는 and와, not only는 but also와 함께 다닙니다.\n\n' +
        '짝꿍 뒤에 오는 A와 B는 "같은 옷"을 입어야 합니다. 한쪽이 -ing이면 다른 쪽도 -ing, 한쪽이 형용사면 다른 쪽도 형용사입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nHayun is not only kind ___ honest.',
        choices: ['but also', 'and also', 'or'],
        answer: 0,
        why: [
          '',
          'not only는 but also와 짝을 이룹니다. and also로 바꿔 쓰지 않습니다.',
          'or는 either와 짝을 이룹니다. not only의 짝은 but also입니다.',
        ],
        explain: 'not only A but also B(A뿐만 아니라 B도)입니다. kind와 honest는 둘 다 형용사라 병렬 구조도 맞습니다.',
      },
    },
    {
      title: '상관접속사가 주어일 때의 수 일치',
      body: '상관접속사로 이은 주어는 **어느 쪽에 동사를 맞추는지**가 정해져 있습니다.\n\n' +
        '| 주어 | 동사를 맞추는 쪽 | 예 |\n|---|---|---|\n' +
        '| both A and B | 늘 복수 | Both Minsu and Jia **are** here. |\n' +
        '| not A but B | B | Not the players but the coach **is** responsible. |\n' +
        '| not only A but also B | B | Not only you but also **he is** invited. |\n' +
        '| B as well as A | B (앞쪽) | **He** as well as you **is** invited. |\n' +
        '| either A or B | B (동사에 가까운 쪽) | Either you or **he has** to go. |\n' +
        '| neither A nor B | B (동사에 가까운 쪽) | Neither he nor **I am** ready. |\n\n' +
        '강조하는 쪽에 맞춘다고 이해하면 쉽습니다. not A but B, not only A but also B는 B를 강조하고, B as well as A는 앞에 둔 B를 강조합니다. either·neither는 동사와 가까운 B에 맞춥니다.\n\n' +
        '> ⚠️ B as well as A에서는 **뒤의 A가 아니라 앞의 B**에 맞춥니다. Jia as well as her parents **enjoys** hiking.',
      easy: '동사는 "주인공"에게 맞춥니다. not only A but also B, B as well as A에서 주인공은 B입니다(B가 "~도"로 강조되니까요). either A or B, neither A nor B에서는 동사 바로 옆에 앉은 B가 주인공입니다.\n\n' +
        'both A and B만 예외입니다. 둘 다 주인공이라 늘 복수입니다.',
      check: {
        type: 'short', check: 'text',
        q: '괄호 안에서 어법에 맞는 것을 골라 쓰십시오.\n\nNot only my brother but also my parents (like / likes) camping.',
        answer: ['like'],
        wrong: [{ a: 'likes', why: 'my brother에 맞추었습니다. not only A but also B는 B(my parents)에 동사를 맞춥니다. 복수이므로 like입니다.' }],
        explain: 'not only A but also B는 B에 동사를 맞춥니다. B인 my parents가 복수이므로 **like**입니다.',
      },
    },
    {
      title: '그 밖의 수 일치: most of, the number of, 집합명사',
      body: '**부분을 나타내는 말 + of + 명사**: most of, some of, half of, all of, the rest of 뒤에서는 **of 뒤의 명사**에 동사를 맞춥니다.\n\n' +
        '- Most of the **water is** clean. (셀 수 없는 명사 → 단수)\n' +
        '- Most of the **students are** here. (복수 명사 → 복수)\n\n' +
        '**the number of와 a number of**\n\n' +
        '| 형태 | 뜻 | 동사 |\n|---|---|---|\n' +
        '| the number of + 복수 명사 | ~의 수 | 단수 (주어는 number) |\n' +
        '| a number of + 복수 명사 | 많은 ~ (= many) | 복수 |\n\n' +
        '- **The number of** cars **is** increasing. (차의 수가 늘고 있다)\n' +
        '- **A number of** cars **are** parked outside. (많은 차가 밖에 주차되어 있다)\n\n' +
        '**집합명사**(family, team, class, audience): 집단을 하나의 덩어리로 보면 단수로 받습니다(My family **is** large.). 구성원 한 사람 한 사람에 초점을 두면 복수로 받기도 하며, 이런 쓰임은 영국 영어에서 더 흔합니다(My family **are** all early risers.).\n\n' +
        '> ⚠️ police(경찰), people(사람들), cattle(소 떼) 같은 명사는 늘 복수로 받습니다. The police **are** looking for the thief.',
      easy: 'the number of에서 the number는 "숫자 하나"입니다. 숫자는 하나니까 단수입니다. a number of는 "여러 개의"라는 뜻이라, 뒤에 오는 여러 개가 주인공이 되어 복수입니다.\n\n' +
        'most of 뒤에서는 of 뒤를 보십시오. 물 대부분은 여전히 "물"(단수), 학생 대부분은 여전히 "학생들"(복수)입니다.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 것은 무엇입니까?\n\nThe number of visitors to the museum ___ increasing.',
        choices: ['is', 'are'],
        answer: 0,
        why: [
          '',
          'visitors에 맞추었습니다. the number of의 주어는 number(수)이므로 단수 is입니다.',
        ],
        explain: 'the number of + 복수 명사는 "~의 수"이고 주어의 중심은 number입니다. 그래서 단수 동사 **is**를 씁니다. "박물관 방문객 수가 늘고 있다"는 뜻입니다.',
      },
    },
  ],

  examples: [
    {
      q: '다음 문장에서 어법상 틀린 곳을 찾아 바르게 고치십시오.\n\nNot only the students but also their teacher were surprised by the news that the school would close.',
      steps: [
        '주어를 찾습니다: Not only the students but also their teacher(상관접속사로 이은 주어).',
        'not only A but also B는 B에 동사를 맞춥니다. B는 their teacher로 단수입니다.',
        '그래서 복수 동사 were를 단수 동사 was로 고칩니다.',
        'the news 뒤의 that을 확인합니다. the school would close는 완전한 절이고 소식의 내용이므로 동격의 that으로 바르게 쓰였습니다.',
      ],
      answer: 'were → was',
    },
    {
      q: '가주어 it을 써서 다시 쓰십시오.\n\nWhether the new library will open next month is still uncertain.',
      steps: [
        '주어인 명사절을 찾습니다: Whether the new library will open next month(새 도서관이 다음 달에 문을 열지).',
        '긴 명사절 주어를 문장 뒤로 보냅니다.',
        '빈 주어 자리에 가주어 It을 넣습니다: It is still uncertain …',
        '뒤에 진주어를 그대로 붙입니다. whether는 그대로 둡니다.',
      ],
      answer: 'It is still uncertain whether the new library will open next month.',
    },
  ],

  terms: [
    { term: '명사절', def: '문장 안에서 명사처럼 주어·목적어·보어 자리에 쓰이는 절입니다. that, whether, if 등이 이끕니다.' },
    { term: '가주어 it', def: '길어진 명사절 주어를 문장 뒤로 보내고 그 자리에 대신 놓는 it입니다. 뜻이 없어 "그것"으로 해석하지 않습니다.' },
    { term: '진주어', def: '가주어 it을 쓴 문장에서 뒤로 보낸 실제 주어(명사절, to부정사 등)입니다.' },
    { term: '동격', def: '앞 명사의 내용을 뒤에서 풀어 주는 관계입니다. 예: the fact that he was right(그가 옳았다는 사실), the dream of becoming a pilot' },
    { term: '상관접속사', def: '두 부분이 짝을 이루어 A와 B를 잇는 접속사입니다. 예: both A and B, either A or B, not only A but also B' },
    { term: '병렬 구조', def: '접속사로 이은 A와 B를 같은 문법 형태로 나란히 쓰는 것입니다. 예: not only swimming but also skiing' },
    { term: '수 일치', def: '주어가 단수이면 단수 동사, 복수이면 복수 동사를 쓰는 것입니다.' },
    { term: '집합명사', def: '여러 구성원이 모인 집단을 나타내는 명사입니다. 예: family, team, class. 집단 전체로 보면 단수로 받습니다.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nI wonder ___ Jia will join the book club.',
      choices: ['that', 'if', 'what', 'which'],
      answer: 1,
      why: [
        'wonder(궁금해하다)는 아직 모르는 "~인지"를 목적어로 받습니다. that은 확정된 사실을 이끌어 뜻이 맞지 않습니다.',
        '',
        'what 뒤에는 빠진 것이 있는 절이 옵니다. Jia will join the book club은 완전한 절입니다.',
        'which 뒤에도 빠진 것이 있어야 합니다. 여기는 "가입할지"를 궁금해하는 자리입니다.',
      ],
      explain: 'wonder의 목적어 자리에서 "지아가 독서 동아리에 들어올지"라는 뜻이 필요하므로 **if**(= whether)를 씁니다. 동사의 목적어 자리라서 if를 쓸 수 있습니다.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\n___ he will accept the offer is still unknown.',
      choices: ['If', 'Because', 'What', 'Whether'],
      answer: 3,
      why: [
        '문장 맨 앞의 주어 자리에는 if절을 쓰지 않습니다.',
        'because절은 부사절이라 문장의 주어가 될 수 없습니다. 이 문장에는 is의 주어가 필요합니다.',
        'what 뒤에는 빠진 것이 있는 절이 옵니다. he will accept the offer는 목적어까지 갖춘 완전한 절입니다.',
        '',
      ],
      explain: '빈칸부터 offer까지가 is의 주어입니다. "그가 제안을 받아들일지"라는 뜻의 주어 자리이므로 **Whether**를 씁니다. if는 주어 자리에 쓰지 않습니다.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: '다음 두 문장은 같은 뜻이며, (B)는 가주어 it을 쓴 문장이다.\n\n(A) That the earth goes around the sun is a well-known fact.\n(B) It is a well-known fact that the earth goes around the sun.',
      answer: true,
      explain: '(A)의 주어인 that절을 문장 뒤로 보내고 빈 주어 자리에 가주어 It을 둔 문장이 (B)입니다. 둘 다 "지구가 태양 주위를 돈다는 것은 잘 알려진 사실이다"라는 뜻입니다.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '밑줄 친 that의 쓰임이 나머지 셋과 **다른** 것은 무엇입니까?',
      choices: [
        'I heard the rumor __that__ a famous singer is coming to our town.',
        'There is no evidence __that__ he broke the window.',
        'She told us about an idea __that__ came to her in the shower.',
        'We were surprised at the fact __that__ he was only ten.',
      ],
      answer: 2,
      why: [
        'a famous singer is coming to our town은 완전한 절이고 소문의 내용입니다. 동격의 that입니다.',
        'he broke the window는 완전한 절이고 증거의 내용입니다. 동격의 that입니다.',
        '',
        'he was only ten은 완전한 절이고 사실의 내용입니다. 동격의 that입니다.',
      ],
      explain: 'came to her in the shower에는 came의 **주어가 빠져** 있습니다. 앞의 an idea를 꾸미는 **관계대명사 that**(which로 바꿀 수 있음)입니다. 나머지 셋은 뒤에 완전한 절이 오는 동격의 that입니다.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'text', concept: 3,
      q: '빈칸에 알맞은 한 낱말을 쓰십시오.\n\nNeither my sister ___ I could find the key.',
      answer: ['nor'],
      wrong: [
        { a: 'or', why: 'or는 either와 짝을 이룹니다. neither의 짝은 nor입니다.' },
        { a: 'and', why: 'and는 both와 짝을 이룹니다. neither의 짝은 nor입니다.' },
      ],
      explain: 'neither A nor B(A도 B도 아닌)입니다. "언니(누나)도 나도 열쇠를 찾지 못했다"는 뜻입니다.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'text', concept: 4,
      q: '괄호 안에서 어법에 맞는 것을 골라 쓰십시오.\n\nEither you or Minsu (has / have) to clean the room.',
      answer: ['has'],
      wrong: [{ a: 'have', why: '앞의 you에 맞추었습니다. either A or B는 동사에 가까운 B(Minsu)에 맞춥니다. 단수이므로 has입니다.' }],
      explain: 'either A or B는 동사에 가까운 B에 수를 맞춥니다. B인 Minsu가 단수이므로 **has**입니다.',
    },
    {
      id: 'p7', level: 1, type: 'choice', concept: 5,
      q: '빈칸에 알맞은 것은 무엇입니까?\n\nMost of the money ___ spent on books.',
      choices: ['was', 'were', 'have been', 'being'],
      answer: 0,
      why: [
        '',
        'money는 셀 수 없는 명사라 단수로 취급합니다. most of 뒤의 명사에 맞추므로 복수 동사는 쓸 수 없습니다.',
        'have는 복수 주어에 씁니다. money는 단수 취급이므로 has been이어야 합니다.',
        'being만으로는 문장의 동사가 될 수 없습니다.',
      ],
      explain: 'most of 뒤의 명사에 동사를 맞춥니다. money는 셀 수 없는 명사라 단수이므로 **was**입니다. "그 돈의 대부분은 책에 쓰였다."',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 5,
      q: '다음 문장은 어법상 바르다.\n\nThe number of students who walk to school have increased.',
      answer: false,
      explain: 'the number of(~의 수)의 주어 중심은 number이므로 단수입니다. have를 **has**로 고쳐 The number of students who walk to school has increased.라고 써야 합니다.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '어법상 **바른** 문장은 무엇입니까?',
      hint: '상관접속사로 이은 A와 B가 같은 형태인지 확인하십시오.',
      choices: [
        'She likes not only swimming but also to ski.',
        'You can either call me or sending a text.',
        'Doyun is both smart and kind.',
        'Seojun not only sings but also dancing.',
      ],
      answer: 2,
      why: [
        'swimming(동명사)과 to ski(to부정사)의 형태가 다릅니다. but also skiing으로 써야 합니다.',
        'call(동사원형)과 sending(-ing)의 형태가 다릅니다. or send a text로 써야 합니다.',
        '',
        'sings(동사)와 dancing(-ing)의 형태가 다릅니다. but also dances로 써야 합니다.',
      ],
      explain: '**Doyun is both smart and kind.**에서 smart와 kind는 둘 다 형용사라 병렬 구조가 맞습니다. 나머지는 A와 B의 형태가 달라 틀렸습니다.',
    },
    {
      id: 'p10', level: 2, type: 'order', concept: 4,
      q: '우리말 뜻에 맞게 배열하십시오.\n\n지아뿐만 아니라 그녀의 친구들도 그 영화를 즐긴다.',
      hint: 'B as well as A에서 강조하는 B를 앞에 둡니다.',
      choices: ['Her friends', 'as well as', 'Jia', 'enjoy', 'the movie'],
      answer: [0, 1, 2, 3, 4],
      explain: '**Her friends as well as Jia enjoy the movie.** "A뿐만 아니라 B도"를 B as well as A로 쓸 때는 B(그녀의 친구들)가 앞에 옵니다. 동사도 앞의 B에 맞추어 복수 enjoy를 씁니다.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'text', concept: 1,
      q: '두 문장의 뜻이 같도록 빈칸에 알맞은 한 낱말을 쓰십시오.\n\nThat Hayun passed the test surprised everyone.\n= It surprised everyone ___ Hayun passed the test.',
      answer: ['that'],
      wrong: [
        { a: 'what', why: 'what 뒤에는 빠진 것이 있는 절이 옵니다. Hayun passed the test는 완전한 절입니다.' },
        { a: 'whether', why: '원래 문장은 "~라는 것"(that)이라는 확정된 사실입니다. 진주어로 보내도 that을 그대로 씁니다.' },
      ],
      hint: '원래 문장의 주어(명사절)를 문장 뒤로 보내 보십시오.',
      explain: '주어인 that절을 문장 뒤로 보내고 앞에 가주어 It을 둡니다. 진주어를 이끄는 접속사 **that**은 그대로 씁니다. "하윤이가 시험에 합격했다는 것이 모두를 놀라게 했다."',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '어법상 **틀린** 문장은 무엇입니까?',
      choices: [
        'A number of people are waiting outside.',
        'The police are looking for the lost child.',
        'Most of the cookies were gone.',
        'The number of cars on the road are growing.',
      ],
      answer: 3,
      why: [
        'a number of(많은) + 복수 명사는 복수 동사를 씁니다. are가 맞습니다.',
        'police는 늘 복수로 받습니다. are가 맞습니다.',
        'most of 뒤의 the cookies가 복수이므로 were가 맞습니다.',
        '',
      ],
      explain: 'the number of(~의 수)의 주어 중심은 number이므로 단수입니다. are를 **is**로 고쳐야 합니다: The number of cars on the road is growing.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      q: '어법상 **바른** 문장은 무엇입니까?',
      hint: '문장마다 동사를 맞추어야 할 쪽(A인지 B인지, 늘 복수인지)을 먼저 정하십시오.',
      choices: [
        'Not only the coach but also the players was tired.',
        'Neither the teacher nor the students knows the answer.',
        'The singer as well as the dancers were on the stage.',
        'Either the twins or their father picks them up after school.',
      ],
      answer: 3,
      why: [
        'not only A but also B는 B(the players)에 맞추므로 were여야 합니다.',
        'neither A nor B는 동사에 가까운 B(the students)에 맞추므로 know여야 합니다.',
        'B as well as A는 앞의 B(the singer)에 맞추므로 was여야 합니다. 뒤의 the dancers에 맞추면 안 됩니다.',
        '',
      ],
      explain: 'either A or B는 동사에 가까운 B에 맞춥니다. B인 their father가 단수이므로 **picks**가 맞습니다. 나머지는 were(1), know(2), was(3)로 고쳐야 합니다.',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 2,
      q: '(A)와 (B)에 들어갈 말로 바르게 짝지은 것은 무엇입니까?\n\n- The rumor (A) the school will build a pool turned out to be true.\n- The rumor (B) Minsu spread last week was not true.',
      hint: '빈칸 뒤의 절에 빠진 것이 있는지 확인하십시오.',
      choices: [
        '(A) that, (B) which',
        '(A) which, (B) that',
        '(A) which, (B) what',
        '(A) what, (B) which',
      ],
      answer: 0,
      why: [
        '',
        '(A) 뒤의 the school will build a pool은 완전한 절입니다. 관계대명사 which는 쓸 수 없고 동격의 that을 써야 합니다.',
        '(A)에는 동격의 that이 와야 하고, (B)에는 앞에 명사(the rumor)가 있으므로 what을 쓸 수 없습니다.',
        'what은 앞에 꾸밀 명사가 있으면 쓰지 않습니다. (A) 앞에도 the rumor가 있습니다.',
      ],
      explain: '(A) the school will build a pool은 빠진 것이 없고 소문의 내용이므로 **동격의 that**입니다. (B) Minsu spread 뒤에는 spread의 목적어가 빠져 있으므로 the rumor를 꾸미는 **관계대명사 which**(또는 that)입니다.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'text', concept: 0,
      q: '다음 문장에서 어법상 틀린 낱말 하나를 찾아, 바르게 고친 낱말을 쓰십시오.\n\nIf the rumor is true or not is not important.',
      hint: '이 문장의 동사(is not important)의 주어가 어디서부터 어디까지인지 보십시오.',
      answer: ['whether'],
      wrong: [
        { a: 'that', why: 'that은 "~라는 것"이라는 확정된 내용입니다. 뒤에 or not이 있으니 "~인지 아닌지"를 뜻하는 말이 필요합니다.' },
        { a: 'are', why: '명사절 주어(… or not)는 단수로 취급하므로 is가 맞습니다. 고쳐야 할 것은 문장 맨 앞의 접속사입니다.' },
      ],
      explain: 'If the rumor is true or not이 문장의 주어인 명사절입니다. 문장 맨 앞의 주어 자리에는 if를 쓰지 않으므로 **Whether**로 고칩니다: Whether the rumor is true or not is not important.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '(A), (B), (C)에서 어법에 맞는 것끼리 짝지은 것은 무엇입니까?\n\nA number of students in our class (A) [has / have] joined the reading club. The number of books they read each month (B) [is / are] growing. Most of the books (C) [is / are] borrowed from the school library.',
      choices: [
        'has – is – are',
        'have – is – are',
        'have – are – is',
        'have – are – are',
        'has – are – is',
      ],
      answer: 1,
      why: [
        '(A) a number of + 복수 명사는 "많은 ~"이라는 뜻이라 복수 동사 have를 씁니다.',
        '',
        '(B) the number of의 주어 중심은 number라서 단수 is, (C) most of 뒤의 the books가 복수라서 are입니다.',
        '(B) the number of(~의 수)는 단수로 받습니다. is여야 합니다.',
        '(A)는 복수 have, (B)는 단수 is, (C)는 복수 are입니다. 세 곳을 모두 다시 확인해 보십시오.',
      ],
      explain: '(A) a number of students(많은 학생들) → 복수 **have**. (B) the number of books(책의 수) → 단수 **is**. (C) most of the books → of 뒤 복수 명사에 맞춰 **are**.',
    },
    {
      id: 'a5', level: 3, type: 'order', concept: 3,
      q: '우리말 뜻에 맞게 배열하십시오.\n\n운동은 몸을 더 튼튼하게 해 줄 뿐만 아니라 잠을 더 잘 자도록 도와준다.',
      hint: '"A뿐만 아니라 B도"에서 A와 B를 같은 형태(동사)로 맞추십시오.',
      choices: ['Exercise', 'not only', 'makes your body stronger', 'but also', 'helps you sleep better'],
      answer: [0, 1, 2, 3, 4],
      explain: '**Exercise not only makes your body stronger but also helps you sleep better.** not only A but also B에서 A(makes …)와 B(helps …)가 둘 다 주어 Exercise에 맞춘 동사 형태라 병렬 구조가 맞습니다.',
    },
  ],

  deeper: [
    {
      title: '영어는 왜 무거운 주어를 싫어할까',
      body: '영어 문장은 대체로 **짧은 주어 + 동사**로 빨리 시작하고, 길고 무거운 정보는 뒤에 두는 것을 좋아합니다. 이런 경향을 흔히 **문미 비중(end weight)**이라고 부릅니다.\n\n' +
        'That the new library near our school will stay open until late at night during the exam period is good news.처럼 주어가 길면 독자는 동사를 만날 때까지 많은 정보를 머릿속에 들고 있어야 합니다. 가주어 it을 쓰면 It is good news … 하고 핵심을 먼저 말한 뒤 긴 내용을 풀어놓을 수 있습니다.\n\n' +
        '같은 까닭으로 영어에는 가목적어 it(I found **it** hard **to** wake up early.)도 있고, 긴 수식어를 명사 뒤에 두는 습관도 있습니다. 긴 문장을 읽을 때 "무거운 부분이 뒤로 갔구나"라고 생각하면 구조가 잘 보입니다.',
    },
    {
      title: '수 일치는 문법인가, 뜻인가',
      body: '대부분의 수 일치는 형태(주어가 단수인가 복수인가)로 정해지지만, 몇몇은 **뜻**이 결정합니다.\n\n' +
        '- Ten years **is** a long time. — 10년을 하나의 기간으로 봅니다.\n' +
        '- Five thousand won **is** enough for lunch. — 금액 하나로 봅니다.\n' +
        '- My family **is** large. / My family **are** all early risers. — 집단 전체인지 구성원 각각인지에 따라 다릅니다(뒤의 꼴은 영국 영어에서 더 흔합니다).\n\n' +
        '그래서 수 일치 문제를 풀 때는 "형태상 주어가 무엇인가"와 함께 "글쓴이가 그것을 하나로 보는가, 여럿으로 보는가"를 생각해 보십시오. 다만 상관접속사, the number of, a number of처럼 규칙이 분명한 것은 규칙대로 씁니다.',
    },
  ],

  faq: [
    {
      q: 'if랑 whether는 뜻이 같은데 왜 쓸 수 있는 자리가 달라요?',
      a: 'if는 원래 "만약 ~라면"이라는 조건의 뜻으로 더 많이 쓰입니다. 그래서 문장 맨 앞이나 전치사 뒤에 if절이 오면 조건절과 헷갈리기 쉽습니다. 이런 혼동을 피하려고 명사절의 if는 주로 동사의 목적어 자리에만 쓰고, 나머지 자리는 whether가 맡는다고 이해하면 됩니다.',
    },
    {
      q: '동격의 that이랑 관계대명사 that은 어떻게 빨리 구별해요?',
      a: 'that 뒤의 절만 떼어서 읽어 보십시오. 주어와 목적어를 다 갖춘 완전한 문장이면 동격의 that이고, "누가?"나 "무엇을?"이 빠져 있으면 관계대명사입니다. that 자리에 which를 넣어 말이 되는지 보는 것도 방법입니다. which가 들어가면 관계대명사입니다.',
    },
    {
      q: 'B as well as A는 왜 앞에 있는 B에 동사를 맞춰요?',
      a: 'B as well as A는 "A뿐만 아니라 B도"라는 뜻으로, 글쓴이가 강조하는 것은 B입니다. as well as A 부분은 덧붙인 정보에 가깝습니다. 그래서 문장의 진짜 주어인 B에 동사를 맞춥니다. not only A but also B에서 B에 맞추는 것과 같은 원리입니다.',
    },
    {
      q: 'the number of랑 a number of가 자꾸 헷갈려요.',
      a: 'the number는 "그 수(숫자)"라는 하나의 값이라 단수입니다. a number of는 many와 같은 "많은"이라는 뜻이라, 뒤의 복수 명사가 진짜 주어가 되어 복수입니다. "The number(숫자) is …, A number of 사람들 are …"라고 함께 외워 두십시오.',
    },
  ],

  mistakes: [
    'B as well as A에서 뒤의 A에 동사를 맞추는 실수 — 앞의 B가 주인공입니다. The teacher as well as the students was there.',
    '문장 맨 앞이나 전치사 뒤에 if절을 쓰는 실수 — 이 자리에는 whether를 씁니다. Whether he comes or not doesn\'t matter.',
    '상관접속사의 A와 B를 다른 형태로 쓰는 실수 — not only swimming but also skiing처럼 같은 형태로 맞춥니다.',
  ],

  gens: [
    {
      id: 'agreement',
      level: 1,
      title: '주어와 동사의 수 일치',
      make: function (R) {
        var it = R.pick(AGREE);
        return {
          type: 'short', check: 'text', concept: it[4],
          q: '괄호 안에서 어법에 맞는 것을 골라 쓰십시오.\n\n' + it[0],
          answer: [it[1]],
          wrong: [{ a: it[2], why: it[3] }],
          explain: it[3],
        };
      },
    },
    {
      id: 'clause-word',
      level: 2,
      title: '명사절·동격의 접속사 고르기',
      make: function (R) {
        var it = R.pick(CLAUSE);
        var correct = it[1];
        var reason = {};
        var wrongs = it[2].map(function (w) { reason[w[0]] = w[1]; return w[0]; });
        var pick = R.choices(correct, wrongs);
        return {
          type: 'choice', concept: it[3],
          q: '빈칸에 알맞은 것은 무엇입니까?\n\n' + it[0],
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: it[0].replace('___', '**' + correct + '**') + '\n\n' + CLAUSE_WHY[CLAUSE.indexOf(it)],
        };
      },
    },
  ],

  vocab: [
    { w: 'whether', m: '~인지 (아닌지)', ex: 'I am not sure whether the bus has left.', exm: '버스가 떠났는지 잘 모르겠습니다.' },
    { w: 'wonder', m: '궁금해하다', ex: 'I wonder if it will snow tonight.', exm: '오늘 밤에 눈이 올지 궁금합니다.' },
    { w: 'uncertain', m: '불확실한', ex: 'It is uncertain whether the game will be played.', exm: '경기가 열릴지는 불확실합니다.' },
    { w: 'depend on', m: '~에 달려 있다', ex: 'Our plan depends on the weather.', exm: '우리 계획은 날씨에 달려 있습니다.' },
    { w: 'rumor', m: '소문', ex: 'The rumor that the school will close is not true.', exm: '학교가 문을 닫는다는 소문은 사실이 아닙니다.' },
    { w: 'evidence', m: '증거', ex: 'There is no evidence that he took the money.', exm: '그가 돈을 가져갔다는 증거는 없습니다.' },
    { w: 'belief', m: '믿음, 신념', ex: 'She has a strong belief that hard work pays off.', exm: '그녀는 노력이 보답받는다는 굳은 믿음을 가지고 있습니다.' },
    { w: 'possibility', m: '가능성', ex: 'There is a possibility that the flight will be delayed.', exm: '비행기가 늦어질 가능성이 있습니다.' },
    { w: 'accept', m: '받아들이다', ex: 'He decided to accept the job offer.', exm: '그는 일자리 제안을 받아들이기로 했습니다.' },
    { w: 'principal', m: '교장', ex: 'The principal gave a short speech at the ceremony.', exm: '교장 선생님이 식에서 짧은 연설을 하셨습니다.' },
    { w: 'audience', m: '청중, 관객', ex: 'The audience clapped loudly after the play.', exm: '연극이 끝나자 관객이 크게 손뼉을 쳤습니다.' },
    { w: 'increase', m: '늘다, 증가하다', ex: 'The number of electric cars is increasing.', exm: '전기차의 수가 늘고 있습니다.' },
    { w: 'responsible', m: '책임이 있는', ex: 'Each student is responsible for cleaning the desk.', exm: '학생마다 책상을 청소할 책임이 있습니다.' },
    { w: 'turn out', m: '(결국) ~으로 드러나다', ex: 'The story turned out to be false.', exm: '그 이야기는 거짓으로 드러났습니다.' },
    { w: 'as well as', m: '~뿐만 아니라 …도', ex: 'Doyun plays the guitar as well as the piano.', exm: '도윤이는 피아노뿐만 아니라 기타도 칩니다.' },
  ],
});
})();
