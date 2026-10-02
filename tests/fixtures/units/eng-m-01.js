/* 테스트용 · 중학교 영어 · 현재완료 (vocab 으로 낱말 문제가 자동으로 만들어지는지 확인) — 예문은 새로 쓴 것 */
Tutor.registerUnit({
  id: 'eng-m-01',
  course: 'eng-m',
  title: '현재완료',
  summary: '과거의 일이 지금까지 이어질 때 쓰는 have + 과거분사를 배워요.',
  goals: ['현재완료의 형태(have/has + 과거분사)를 안다.', '현재완료와 과거 시제를 구별해 쓸 수 있다.'],
  standards: [],
  concepts: [
    {
      title: '현재완료의 모양',
      body: '현재완료는 **have(has) + 과거분사** 로 써요.\n\n- I **have finished** my homework.\n- She **has lived** here for three years.\n\n주어가 3인칭 단수(he, she, it)이면 has 를 써요.',
      check: {
        type: 'choice', q: 'She [[빈칸]] finished her homework.\n\n빈칸에 알맞은 말은?',
        choices: ['has', 'have', 'is'], answer: 0,
        why: ['', '주어 She 는 3인칭 단수라서 has 를 써요.', '현재완료는 be동사가 아니라 have(has)를 써요.'],
        explain: '3인칭 단수 주어에는 **has** + 과거분사예요.',
      },
    },
    {
      title: '현재완료의 뜻',
      body: '과거에 일어난 일이 **지금까지 이어지거나 지금에 영향을 줄 때** 써요.\n\n| 쓰임 | 예문 |\n|---|---|\n| 계속 | We **have known** each other since 2020. |\n| 경험 | I **have visited** the island twice. |\n| 완료 | He **has just eaten** lunch. |',
      easy: '어제 먹은 일만 말하면 "I ate lunch." 예요. "그래서 지금 배가 불러요" 처럼 지금과 이어서 말하고 싶으면 "I **have eaten** lunch." 라고 해요.',
    },
    {
      title: '과거와 현재완료',
      body: '분명한 과거 시점(yesterday, last week, in 2019)과는 현재완료를 쓰지 않아요.\n\n- I **saw** the movie yesterday. (O)\n- I **have seen** the movie yesterday. (X)',
    },
  ],
  examples: [
    {
      q: '다음 문장을 현재완료로 바꿔 보세요: She reads the book.',
      steps: ['주어 She 는 3인칭 단수라서 has 를 써요.', 'read 의 과거분사는 read 예요.'],
      answer: 'She **has read** the book.',
    },
  ],
  terms: [
    { term: '현재완료', def: 'have(has) + 과거분사. 과거의 일이 지금과 이어질 때 써요.' },
    { term: '과거분사', def: '동사의 한 형태. 규칙 동사는 -ed 를 붙여요. 예: finish → finished' },
    { term: '경험 용법', def: '"~해 본 적이 있다" 는 뜻. ever, never, twice 와 자주 써요.' },
  ],
  vocab: [
    { w: 'already', m: '이미', ex: 'I have already finished my homework.', exm: '나는 이미 숙제를 끝냈어요.' },
    { w: 'ever', m: '한 번이라도', ex: 'Have you ever seen a rainbow?', exm: '무지개를 한 번이라도 본 적이 있나요?' },
    { w: 'never', m: '한 번도 ~않다', ex: 'I have never been to the island.', exm: '나는 그 섬에 한 번도 가 본 적이 없어요.' },
    { w: 'since', m: '~이후로', ex: 'We have lived here since 2020.', exm: '우리는 2020년부터 여기에 살았어요.' },
    { w: 'twice', m: '두 번', ex: 'She has visited the museum twice.', exm: '그녀는 박물관에 두 번 가 봤어요.' },
    { w: 'finish', m: '끝내다', ex: 'Did you finish the book?', exm: '그 책을 다 읽었니?' },
    { w: 'travel', m: '여행하다', ex: 'They love to travel by train.', exm: '그들은 기차로 여행하는 것을 좋아해요.' },
    { w: 'library', m: '도서관', ex: 'I read books in the library.', exm: '나는 도서관에서 책을 읽어요.' },
    { w: 'island', m: '섬', ex: 'The island is very quiet.', exm: '그 섬은 아주 조용해요.' },
  ],
  practice: [
    {
      id: 'q1', level: 1, type: 'choice',
      q: 'I [[빈칸]] my homework already.\n\n빈칸에 알맞은 말은?',
      choices: ['have finished', 'has finished', 'finishing', 'to finish'],
      answer: 0,
      explain: '주어가 I 이므로 have + 과거분사(finished)를 써요.',
    },
    {
      id: 'q2', level: 1, type: 'choice',
      q: 'She [[빈칸]] in this town since 2019.\n\n빈칸에 알맞은 말은?',
      choices: ['has lived', 'have lived', 'lives', 'living'],
      answer: 0,
      explain: 'since 2019 는 "2019년부터 지금까지" 이므로 현재완료, 주어 She 는 has 를 써요.',
    },
    {
      id: 'q3', level: 1, type: 'short', check: 'text',
      q: '빈칸에 알맞은 낱말을 쓰세요. (한 번이라도)\n\nHave you [[빈칸]] seen a rainbow?',
      answer: ['ever'],
      explain: '"한 번이라도 ~해 본 적이 있니?" 는 Have you **ever** + 과거분사? 로 물어요.',
    },
    {
      id: 'q4', level: 1, type: 'ox',
      q: '"I have seen the movie yesterday." 는 바른 문장이다.',
      answer: false,
      explain: 'yesterday 처럼 분명한 과거 시점에는 과거 시제를 써요: I **saw** the movie yesterday.',
    },
    {
      id: 'q5', level: 2, type: 'order',
      q: '낱말을 바른 순서로 놓아 "나는 그를 한 번도 만난 적이 없어요." 를 영어로 만드세요.',
      choices: ['I', 'have', 'never', 'met him'],
      answer: [0, 1, 2, 3],
      explain: '주어(I) + have + never + 과거분사(met) 순서예요: I have never met him.',
    },
    {
      id: 'q6', level: 2, type: 'short', check: 'text',
      q: 'go 의 과거분사를 쓰세요.',
      answer: ['gone'],
      explain: 'go - went - **gone** 이에요.',
    },
  ],
  advanced: [
    {
      id: 'a1', level: 3, type: 'choice',
      q: '다음 중 바른 문장은?',
      choices: ['I have lost my key last night.', 'I lost my key last night.', 'I have lose my key.', 'I has lost my key.'],
      answer: 1,
      explain: 'last night 은 분명한 과거 시점이라 과거 시제(lost)를 써요. have 뒤에는 과거분사, 주어 I 에는 have 를 써요.',
    },
  ],
  deeper: [
    { title: '현재완료와 함께 자주 쓰는 말', body: '- 완료: already, just, yet\n- 경험: ever, never, before, once, twice\n- 계속: for(기간), since(시작 시점)' },
  ],
  faq: [
    { q: '현재완료랑 과거는 뭐가 달라요?', a: '과거는 그때 있었던 일만 말해요. 현재완료는 그 일이 지금과 이어져 있다는 느낌을 더해요. 그래서 yesterday 같은 분명한 과거 시점과는 현재완료를 쓰지 않아요.' },
    { q: 'have 와 has 는 언제 써요?', a: '주어가 he, she, it 이나 단수 명사이면 has, 나머지(I, you, we, they, 복수)는 have 예요.' },
  ],
  mistakes: ['yesterday 같은 과거 시점과 현재완료를 함께 쓰는 실수 — 시점이 분명하면 과거 시제를 써요.'],
});
