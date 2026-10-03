/* 중2 영어 · 경험 말하기 (현재완료) */
(function () {
  // 직접 쓴 짧은 글
  var DOYUN = 'My name is Doyun. I have lived in Incheon since 2018. I have visited many cities in Korea, but I have never been to Jeju Island. Last month, my aunt moved to Jeju. She has invited my family to her new house. We are going to visit her next week. I have already packed my bag!';

Tutor.registerUnit({
  id: 'eng-m2-02',
  course: 'eng-m2',
  title: '경험 말하기 (현재완료)',
  summary: 'have/has + 과거분사로 경험·계속·완료를 나타내는 현재완료를 익히고 과거시제와 구별해 써요.',
  goals: [
    'have/has + 과거분사로 현재완료 문장을 만들고, 동사의 과거분사를 쓸 수 있어요.',
    'ever, never, for, since, already, yet, just를 써서 경험·계속·완료를 말할 수 있어요.',
    'has gone to와 has been to의 뜻 차이를 알 수 있어요.',
    '과거 시점을 나타내는 말이 있으면 과거시제를 써서 현재완료와 구별할 수 있어요.',
  ],
  standards: ['[9영02-04]', '[9영01-02]', '[9영01-03]'],

  concepts: [
    {
      title: '현재완료의 형태: have/has + 과거분사',
      body: '**현재완료**는 **have/has + 과거분사**로 써요. 과거에 일어난 일이 **지금까지 이어지거나 지금과 관련이 있을 때** 써요.\n\n| | 형태 | 예문 |\n|---|---|---|\n| 긍정문 | have/has + 과거분사 | I **have finished** my homework. |\n| 부정문 | have/has + not + 과거분사 | She **hasn\'t seen** the movie. |\n| 의문문 | Have/Has + 주어 + 과거분사 ~? | **Have** you **eaten** lunch? — Yes, I have. / No, I haven\'t. |\n\n주어가 3인칭 단수(he, she, it, Minsu)면 **has**, 나머지는 **have**예요. 줄여 쓰면 I\'ve, you\'ve, we\'ve, they\'ve, he\'s, she\'s, it\'s예요.\n\n**과거분사 만들기**\n- 규칙 동사: 과거형과 같아요(-ed). play – played – **played**, study – studied – **studied**, stop – stopped – **stopped**\n- 불규칙 동사: 따로 외워요.\n\n| 원형 | 과거형 | 과거분사 |\n|---|---|---|\n| go | went | **gone** |\n| eat | ate | **eaten** |\n| see | saw | **seen** |\n| do | did | **done** |\n| write | wrote | **written** |\n| take | took | **taken** |\n| be | was/were | **been** |\n| make | made | **made** |\n| buy | bought | **bought** |\n| come | came | **come** |\n| read | read | **read** |\n\n> ⚠️ 과거형과 과거분사가 다른 동사를 조심하세요. I have went(✗) → I have **gone**',
      easy: '현재완료는 "과거에서 지금까지 이어진 다리"라고 생각해 보세요. have(가지고 있다) + 과거분사(이미 한 일)는 "이미 한 일을 지금 가지고 있다"는 느낌이에요.\n\n- I have finished my homework. → 숙제를 끝낸 상태를 **지금** 가지고 있어요(그래서 지금 놀 수 있어요).\n\n과거분사는 동사의 "세 번째 모양"이에요. go – went – **gone**처럼 원형, 과거형, 과거분사를 세 개씩 묶어 소리 내어 외우면 잘 기억나요.',
      check: {
        type: 'choice',
        q: 'eat의 과거분사는 무엇일까요?',
        choices: ['eaten', 'ate', 'eated'],
        answer: 0,
        why: ['', 'ate는 과거형이에요. 현재완료에는 세 번째 모양인 과거분사를 써요.', 'eat은 불규칙 동사라서 -ed를 붙이지 않아요.'],
        explain: 'eat – ate – **eaten**이에요. 현재완료로 쓰면 I have eaten lunch.(나는 점심을 먹었어요.)',
      },
    },
    {
      title: '경험: ~해 본 적이 있다',
      body: '현재완료로 **지금까지 해 본 경험**을 말할 수 있어요. "~해 본 적이 있다/없다"라는 뜻이에요.\n\n| 말 | 뜻 | 예문 |\n|---|---|---|\n| ever | (질문에서) 한 번이라도 | **Have** you **ever been** to Jeju Island? |\n| never | 한 번도 ~않다 | I **have never seen** snow. |\n| before | 전에 | I **have met** her **before**. |\n| once, twice, three times | 한 번, 두 번, 세 번 | She **has climbed** Mt. Halla **twice**. |\n\n- A: **Have you ever** tried Mexican food? (멕시코 음식을 먹어 본 적이 있니?)\n- B: Yes, I **have**. / No, I **haven\'t**. (I have never tried it.)\n\n**have been to** + 장소는 "~에 가 본 적이 있다"라는 뜻이에요. I **have been to** Busan three times.\n\n**the + 최상급 + 명사 + I\'ve ever + 과거분사**는 "지금까지 ~한 것 중에서 가장 …한"이라는 뜻이에요.\n- This is **the best movie I\'ve ever seen**. (이것은 내가 지금까지 본 영화 중 가장 좋은 영화예요.)\n\n> 💡 ever는 주로 의문문에서 have와 과거분사 사이에 써요(Have you **ever** seen …?). never도 같은 자리에 써요(I have **never** seen …). never 자체가 "한 번도 ~않다"는 부정이라 not을 또 쓰지 않아요. I haven\'t never seen(✗)',
      easy: '경험은 "내 인생 앨범"을 넘겨 보는 거예요. 태어나서 지금까지 앨범에 그 사진이 있으면 Yes, I have, 없으면 No, I haven\'t예요.\n\n- Have you ever ridden a horse? → 내 앨범에 말 탄 사진이 있니?\n- I have never ridden a horse. → 한 장도 없어요.\n\n언제 찍었는지(날짜)는 중요하지 않아요. "있다/없다"만 말하는 거예요.',
      check: {
        type: 'ox',
        q: 'I have never seen snow.는 "나는 눈을 본 적이 한 번도 없어요."라는 뜻이에요.',
        answer: true,
        explain: 'have never + 과거분사는 "한 번도 ~해 본 적이 없다"는 경험을 나타내요. see – saw – **seen**이에요.',
      },
    },
    {
      title: '계속: (지금까지) 계속 ~해 왔다',
      body: '과거에 시작한 일이나 상태가 **지금까지 계속될 때**도 현재완료를 써요. "~해 왔다, ~하고 있다"라는 뜻이에요.\n\n- I **have lived** in Daegu **for** ten years. (나는 대구에서 10년 동안 살아 왔어요. — 지금도 살아요)\n- She **has known** Minsu **since** 2020. (그녀는 2020년부터 민수를 알고 지냈어요.)\n\n| 말 | 뒤에 오는 것 | 예 |\n|---|---|---|\n| **for** | 기간(얼마 동안) | for three years, for two hours, for a long time |\n| **since** | 시작한 때(언제부터) | since 2020, since last Monday, since I was ten |\n\n얼마나 오래 했는지 물을 때는 **How long have you + 과거분사 ~?** 를 써요.\n- A: **How long have you studied** English? B: **For** six years. / **Since** I was eight.\n\n> 💡 우리말로는 "10년 동안 살고 있다"처럼 현재형으로 말하지만, 영어로는 I live here for ten years.(✗)가 아니라 I **have lived** here for ten years.예요.',
      easy: '"for"는 길이를 재는 **자**, "since"는 출발선에 꽂은 **깃발**이라고 생각해 보세요.\n\n- for three years → 자로 재어 보니 3년 길이 (기간)\n- since 2020 → 2020년에 깃발을 꽂고 거기서부터 지금까지 (시작점)\n\n숫자만 보고 고르지 말고, "얼마 동안?"이면 for, "언제부터?"면 since예요.',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nI have lived in Daegu [[빈칸]] 2019.',
        choices: ['since', 'for', 'ago'],
        answer: 0,
        why: ['', 'for 뒤에는 기간(three years처럼 "얼마 동안")이 와요. 2019는 시작한 때예요.', 'ago는 "~전에"라는 과거시제의 말이고, 2019 같은 연도 뒤에는 쓰지 않아요.'],
        explain: '2019는 "언제부터"인 시작한 때라서 **since**를 써요. "나는 2019년부터 대구에 살고 있어요."',
      },
    },
    {
      title: '완료와 결과: 막 ~했다, ~해 버렸다',
      body: '**완료**: 과거에 시작한 일을 **지금 막 끝냈거나 벌써 끝냈을 때** 써요. just, already, yet과 자주 함께 써요.\n\n| 말 | 뜻 | 자리 | 예문 |\n|---|---|---|---|\n| **just** | 막, 방금 | have와 과거분사 사이 | The train **has just left**. |\n| **already** | 벌써, 이미 | have와 과거분사 사이 | I **have already eaten** lunch. |\n| **yet** | (부정문) 아직 / (의문문) 벌써, 이제 | 문장 끝 | I **haven\'t finished** it **yet**. / Have you finished it **yet**? |\n\n**결과**: 과거의 일 때문에 생긴 결과가 **지금도 남아 있을 때** 써요.\n- I **have lost** my umbrella. (우산을 잃어버렸어요. → 그래서 지금 우산이 없어요.)\n- He **has gone to** Busan. (그는 부산에 갔어요. → 그래서 지금 여기 없어요.)\n\n> ⚠️ **has gone to**(가 버리고 지금 여기 없다, 결과)와 **has been to**(가 본 적이 있다, 경험)를 구별해요.\n> He has been to Busan. → 그는 부산에 가 본 적이 있어요(지금은 여기 있을 수 있어요).',
      easy: '완료는 "체크 표시"예요. 할 일 목록에 ✔가 붙어 있는지 말하는 거지요.\n\n- I have already done it. → 벌써 ✔\n- I haven\'t done it yet. → 아직 ✔ 없음\n\n결과는 "지금 눈앞의 모습"을 보고 말해요. 우산꽂이가 비어 있으면 I have lost my umbrella. 친구 자리가 비어 있으면 He has gone to Busan.(부산에 가 버려서 없어요)',
      check: {
        type: 'choice',
        q: '빈칸에 알맞은 말을 고르세요.\n\nShe hasn\'t finished her homework [[빈칸]].',
        choices: ['yet', 'already', 'just'],
        answer: 0,
        why: ['', 'already는 "벌써"라는 뜻으로 주로 긍정문에서 have와 과거분사 사이에 써요.', 'just는 "막, 방금"이라는 뜻으로 have와 과거분사 사이에 써요. 부정문 끝에는 오지 않아요.'],
        explain: '부정문 끝에서 "아직"이라는 뜻을 나타내는 말은 **yet**이에요. "그녀는 아직 숙제를 끝내지 못했어요."',
      },
    },
    {
      title: '현재완료와 과거시제 구별하기',
      body: '**과거시제**는 과거의 한 때에 일어나고 **끝난 일**만 말해요. **현재완료**는 그 일이 **지금과 이어져 있음**을 말해요.\n\n| | 과거시제 | 현재완료 |\n|---|---|---|\n| 예문 | I **lost** my key **yesterday**. | I **have lost** my key. |\n| 뜻 | 어제 열쇠를 잃어버렸어요.(지금 찾았는지는 몰라요) | 열쇠를 잃어버렸어요.(그래서 지금 없어요) |\n\n**분명한 과거 시점**을 나타내는 말이 있으면 현재완료가 아니라 **과거시제**를 써요.\n- **yesterday, ~ ago, last ~, in 2020, when I was young, just now**\n- 의문사 **When**으로 묻는 질문도 과거시제: **When did** you **visit** Gyeongju?\n\n- I **have visited** Gyeongju. (경주에 가 본 적이 있어요.) ✔\n- I **visited** Gyeongju **last year**. (작년에 경주에 갔어요.) ✔\n- I have visited Gyeongju last year. ✘\n\n> 💡 대화에서는 현재완료로 경험을 말한 뒤, 언제 했는지는 과거시제로 이어 말해요. A: Have you ever been to Gyeongju? B: Yes, I have. I **went** there **last year**.',
      easy: '현재완료는 "지금"을 보는 시제라서, "어제", "지난주"처럼 과거의 날짜 도장이 찍힌 말과는 함께 못 써요.\n\n- 날짜 도장(yesterday, last week, ago, in 2020)이 있다 → **과거시제**\n- 날짜 없이 "해 봤다/해 왔다/막 했다" → **현재완료**\n\n문장에서 날짜 도장부터 찾아보세요.',
      check: {
        type: 'ox',
        q: 'I have seen him two days ago.는 바른 문장이에요.',
        answer: false,
        explain: 'two days ago(이틀 전)는 분명한 과거 시점이라 현재완료와 함께 쓰지 않아요. 바른 문장은 I **saw** him two days ago.예요.',
      },
    },
  ],

  examples: [
    {
      q: '두 문장을 현재완료를 써서 한 문장으로 바꿔 보세요.\n\nI started to live in Suwon in 2021. I still live there.',
      steps: [
        '2021년에 시작해서 지금도 살고 있으니 "계속"을 나타내는 현재완료를 써요.',
        '주어가 I이므로 have + 과거분사: live – lived – **lived** → have lived',
        '2021은 시작한 때이므로 **since**를 써요.',
      ],
      answer: 'I **have lived** in Suwon **since** 2021.',
    },
    {
      q: '대화의 빈칸에 알맞은 말을 넣어 보세요.\n\nA: [[빈칸]] you ever been to Gyeongju?\nB: Yes, I have. I [[빈칸]] (go) there last year.',
      steps: [
        'ever와 been이 있으니 경험을 묻는 현재완료 의문문이에요. 주어가 you이므로 **Have**를 문장 앞에 써요.',
        'B의 둘째 문장에는 last year라는 분명한 과거 시점이 있어요. 그래서 과거시제를 써요: go – **went**',
      ],
      answer: 'A: **Have** you ever been to Gyeongju? B: Yes, I have. I **went** there last year.',
    },
  ],

  terms: [
    { term: '현재완료', def: 'have/has + 과거분사 꼴이에요. 과거의 일이 지금까지 이어지거나 지금과 관련 있을 때 써요. 예: I have lived here for five years.' },
    { term: '과거분사', def: '동사의 세 번째 모양이에요. 규칙 동사는 과거형과 같고(played), 불규칙 동사는 따로 외워요(go – went – gone).' },
    { term: '경험', def: '현재완료의 쓰임 중 하나로 "~해 본 적이 있다"는 뜻이에요. ever, never, before, once, twice와 자주 써요.' },
    { term: '계속', def: '현재완료의 쓰임 중 하나로 "지금까지 계속 ~해 왔다"는 뜻이에요. for + 기간, since + 시작한 때와 자주 써요.' },
    { term: '완료', def: '현재완료의 쓰임 중 하나로 "막/벌써 ~했다"는 뜻이에요. just, already, yet과 자주 써요.' },
    { term: '결과', def: '현재완료의 쓰임 중 하나로 과거 일의 결과가 지금 남아 있음을 나타내요. 예: I have lost my key.(그래서 지금 없다)' },
    { term: 'for와 since', def: 'for 뒤에는 기간(for two hours), since 뒤에는 시작한 때(since 2020)가 와요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\nMinsu [[빈칸]] his room.\n(민수는 자기 방을 청소했어요. 그래서 지금 방이 깨끗해요.)',
      choices: ['has cleaned', 'have cleaned', 'has clean', 'is cleaned'],
      answer: 0,
      why: ['', '주어 Minsu는 3인칭 단수라서 have가 아니라 has를 써요.', 'has 뒤에는 동사원형이 아니라 과거분사(cleaned)가 와요.', 'is cleaned는 "청소되다"라는 다른 뜻이에요. 현재완료는 have/has + 과거분사예요.'],
      explain: '현재완료는 **have/has + 과거분사**예요. 주어 Minsu가 3인칭 단수이므로 has, clean의 과거분사는 cleaned예요. Minsu **has cleaned** his room.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'text', concept: 0,
      q: '빈칸에 write의 과거분사를 쓰세요.\n\nShe has [[빈칸]] a letter to her grandma.\n(그녀는 할머니께 편지를 썼어요.)',
      answer: ['written'],
      wrong: [
        { a: 'wrote', why: 'wrote는 과거형이에요. 현재완료에는 세 번째 모양인 과거분사 written을 써요.' },
        { a: 'writed', why: 'write는 불규칙 동사라서 -ed를 붙이지 않아요. write – wrote – written이에요.' },
        { a: 'writen', why: '철자를 확인해 보세요. t를 두 번 써서 written이에요.' },
      ],
      explain: 'write – wrote – **written**이에요. She has written a letter to her grandma.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 1,
      q: '"Have you ever been to Gangneung?"에 "아니요"라고 답할 때는 No, I didn\'t.라고 해요.',
      answer: false,
      explain: 'Have로 물었으니 have로 답해요. **No, I haven\'t.**(아니, 가 본 적 없어.) 긍정이면 Yes, I have.예요. didn\'t는 Did로 물었을 때 쓰는 대답이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 2,
      q: '빈칸에 알맞은 말을 고르세요.\n\nWe have known each other [[빈칸]] five years.\n(우리는 5년 동안 서로 알고 지냈어요.)',
      choices: ['for', 'since', 'ago', 'from'],
      answer: 0,
      why: ['', 'since 뒤에는 시작한 때(since 2020)가 와요. five years는 기간이에요.', 'ago는 five years ago(5년 전)처럼 기간 뒤에 붙는 말이고, 과거시제와 함께 써요.', 'from은 from Monday to Friday처럼 시작과 끝을 함께 말할 때 써요. 기간 앞에는 for를 써요.'],
      explain: 'five years(5년)는 "얼마 동안"인 기간이라서 **for**를 써요. We have known each other for five years.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'text', concept: 2,
      q: '빈칸에 알맞은 한 낱말을 쓰세요.\n\nIt has rained [[빈칸]] last Sunday.\n(지난 일요일부터 계속 비가 와요.)',
      answer: ['since'],
      wrong: [
        { a: 'for', why: 'for 뒤에는 기간(for three days)이 와요. last Sunday는 비가 오기 시작한 때예요.' },
        { a: 'from', why: '현재완료에서 "~부터 (지금까지)"는 since로 써요.' },
      ],
      explain: 'last Sunday(지난 일요일)는 "언제부터"인 시작한 때라서 **since**를 써요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 3,
      q: '우리말에 맞게 빈칸에 알맞은 말을 고르세요.\n\nA: Have you cleaned your room yet?\nB: Yes, I have [[빈칸]] cleaned it.\n(응, 방금 청소했어.)',
      choices: ['just', 'yet', 'ever', 'ago'],
      answer: 0,
      why: ['', 'yet은 부정문·의문문의 끝에 써요. 긍정문에서 "방금"을 나타내지 않아요.', 'ever는 "한 번이라도"라는 뜻으로 주로 경험을 묻는 의문문에 써요.', 'ago는 "~전에"라는 뜻으로 two days ago처럼 과거시제와 함께 써요.'],
      explain: '"막, 방금"은 **just**예요. have와 과거분사 사이에 써요. I have **just** cleaned it.',
    },
    {
      id: 'p7', level: 1, type: 'ox', concept: 4,
      q: 'We have watched that movie last night.은 바른 문장이에요.',
      answer: false,
      explain: 'last night(어젯밤)은 분명한 과거 시점이라 현재완료와 함께 쓰지 않아요. 바른 문장은 We **watched** that movie last night.이에요.',
    },
    {
      id: 'p8', level: 2, type: 'order', concept: 1,
      q: '우리말에 맞게 순서대로 놓으세요.\n\n이것은 내가 지금까지 읽은 책 중에서 가장 재미있는 책이에요.',
      choices: ['This is', 'the most interesting book', 'I\'ve ever', 'read.'],
      answer: [0, 1, 2, 3],
      hint: '"가장 재미있는 책"을 먼저 말하고, 그 뒤에 "내가 지금까지 읽은"을 붙여요.',
      explain: 'This is(이것은 ~이에요) + the most interesting book(가장 재미있는 책) + I\'ve ever read(내가 지금까지 읽은). **the + 최상급 + 명사 + I\'ve ever + 과거분사**의 순서예요. read – read – read라서 과거분사도 read예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 3,
      q: '빈칸에 알맞은 말을 고르세요.\n\nA: Where is Junho? I can\'t find him.\nB: He [[빈칸]] to the library. He isn\'t here now.',
      choices: ['has gone', 'has been', 'have gone', 'go'],
      answer: 0,
      why: ['', 'has been to는 "가 본 적이 있다"는 경험이에요. 지금 여기 없다는 뜻이 아니에요.', '주어 He는 3인칭 단수라서 has를 써요.', 'go는 현재형이라 주어 He 뒤라면 goes가 되어야 하고, 가 버려서 지금 없다는 결과를 나타내지 못해요.'],
      hint: '준호가 지금 여기에 없다는 점에 주목하세요.',
      explain: '**has gone to**는 "~에 가 버려서 지금 여기 없다"는 결과를 나타내요. He has gone to the library.',
    },
    {
      id: 'p10', level: 2, type: 'short', check: 'text', concept: 4,
      q: '괄호 안의 동사를 알맞은 꼴로 바꿔 빈칸에 쓰세요.\n\nI [[빈칸]] my wallet two days ago. (lose)',
      answer: ['lost'],
      wrong: [
        { a: 'have lost', why: 'two days ago(이틀 전)는 분명한 과거 시점이라 현재완료를 쓰지 않아요. 과거형 lost를 써요.' },
        { a: 'lose', why: '이틀 전에 일어난 일이라 과거형으로 써요. lose – lost – lost예요.' },
        { a: 'losed', why: 'lose는 불규칙 동사예요. 과거형은 lost예요.' },
      ],
      hint: '문장 끝의 시간 표현을 보세요.',
      explain: 'ago가 있으면 과거시제를 써요. lose의 과거형은 **lost**예요. I lost my wallet two days ago.',
    },
    {
      id: 'p11', level: 2, type: 'choice', concept: 2,
      q: '다음 글을 읽고 물음에 답하세요.\n\n' + DOYUN + '\n\n도윤이는 언제부터 인천에 살고 있나요?',
      choices: ['2018년부터', '지난달부터', '태어날 때부터', '다음 주부터'],
      answer: 0,
      why: ['', '지난달(last month)은 이모가 제주로 이사한 때예요.', '글에 태어날 때부터라는 말은 없어요. since 뒤를 보세요.', '다음 주(next week)는 이모 댁을 방문할 때예요.'],
      hint: 'since가 들어 있는 문장을 찾아보세요.',
      explain: 'I have lived in Incheon **since 2018**.(나는 2018년부터 인천에 살고 있어요.) since 뒤에 시작한 때가 나와요.',
    },
    {
      id: 'p12', level: 2, type: 'ox', concept: 1,
      q: '다음 글을 읽고 맞으면 O, 틀리면 X를 고르세요.\n\n' + DOYUN + '\n\n도윤이는 제주도에 가 본 적이 있어요.',
      answer: false,
      explain: 'I **have never been to** Jeju Island.(나는 제주도에 한 번도 가 본 적이 없어요.)라고 했어요. 다음 주에 처음 가게 될 거예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'choice', concept: 4,
      q: '어법상 **어색한** 문장을 고르세요.',
      choices: ['When have you finished your homework?', 'Have you ever eaten Thai food?', 'I have known her since we were children.', 'She has just arrived at the station.'],
      answer: 0,
      why: ['', 'ever로 경험을 묻는 바른 현재완료 의문문이에요.', 'since + 시작한 때(we were children)로 계속을 나타내는 바른 문장이에요.', 'just로 "막 도착했다"는 완료를 나타내는 바른 문장이에요.'],
      hint: '분명한 때를 묻는 의문사가 있는지 보세요.',
      explain: 'When(언제)은 분명한 과거 시점을 묻는 말이라 현재완료와 함께 쓰지 않아요. **When did you finish** your homework?로 고쳐야 해요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'text', concept: 2,
      q: '두 문장을 한 문장으로 바꿀 때 빈칸에 알맞은 두 낱말을 쓰세요.\n\nJia started to learn the piano three years ago. She still learns it.\n= Jia [[빈칸]] the piano for three years.',
      answer: ['has learned', 'has learnt'],
      wrong: [
        { a: 'have learned', why: '주어 Jia는 3인칭 단수라서 has를 써요.' },
        { a: 'learned', why: '과거형은 지금도 배우고 있다는 뜻을 담지 못해요. 지금까지 계속된 일은 has + 과거분사로 써요.' },
        { a: 'has learn', why: 'has 뒤에는 과거분사(learned)를 써요.' },
      ],
      hint: '3년 전에 시작해서 지금도 하고 있어요. 어떤 시제가 알맞을까요?',
      explain: '3년 전부터 지금까지 계속 배우고 있으니 현재완료(계속)를 써요. 주어가 Jia(3인칭 단수)이므로 **has learned**예요. Jia has learned the piano for three years.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 3,
      q: 'Sua has gone to London.의 뜻으로 알맞은 것을 고르세요.',
      choices: ['수아는 런던에 가서 지금 여기에 없다.', '수아는 런던에 가 본 적이 있다.', '수아는 런던에서 막 돌아왔다.', '수아는 앞으로 런던에 갈 것이다.'],
      answer: 0,
      why: ['', '"가 본 적이 있다"는 has been to London이에요.', '"막 돌아왔다"는 has just come back from London처럼 써요.', '앞으로의 계획은 will이나 be going to로 나타내요.'],
      explain: '**has gone to**는 "~에 가 버렸다(그래서 지금 여기 없다)"는 결과를 나타내요. has been to와 헷갈리지 않게 해요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 3,
      q: '다음 글의 내용과 **일치하는** 것을 고르세요.\n\n' + DOYUN,
      choices: ['도윤이는 이미 가방을 쌌다.', '도윤이의 이모는 2018년에 제주로 이사했다.', '도윤이 가족은 지난주에 이모 댁을 방문했다.', '도윤이는 한국의 다른 도시에 가 본 적이 없다.'],
      answer: 0,
      why: ['', '이모가 제주로 이사한 때는 last month(지난달)예요. 2018년은 도윤이가 인천에 살기 시작한 때예요.', 'We are going to visit her next week.라고 했어요. 방문은 다음 주에 할 일이에요.', 'I have visited many cities in Korea.라고 했어요. 한국의 여러 도시에 가 봤어요.'],
      hint: '보기마다 때를 나타내는 말(2018, last month, next week)을 글에서 찾아 맞춰 보세요.',
      explain: 'I **have already packed** my bag!(나는 벌써 가방을 쌌어요!)과 일치해요. already는 "벌써"라는 완료의 뜻이에요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 2,
      q: '대화의 빈칸에 알맞은 말을 고르세요.\n\nA: How long have you lived in this town?\nB: [[빈칸]]',
      choices: ['Since I was five.', 'Two years ago.', 'Yes, I have.', 'In this town.'],
      answer: 0,
      why: ['', 'Two years ago는 "언제" 했는지에 대한 답이에요. How long(얼마나 오래)에는 기간이나 시작한 때로 답해요.', 'Yes/No로 답하는 것은 Have you ~?처럼 의문사가 없는 질문이에요.', 'In this town은 장소예요. 질문은 얼마나 오래 살았는지를 물어요.'],
      hint: 'How long은 "얼마나 오래"라는 뜻이에요.',
      explain: 'How long have you ~?에는 for + 기간이나 since + 시작한 때로 답해요. **Since I was five.**(다섯 살 때부터요.)',
    },
  ],

  deeper: [
    {
      title: '중3에서 이어서 배우는 완료 시제',
      body: '현재완료는 "지금"을 기준으로 과거와 지금을 이어요. 중3에서는 기준을 바꾸거나 동작을 강조하는 완료 시제를 배워요.\n\n- **과거완료**(had + 과거분사): 과거의 어느 때보다 **더 앞서** 일어난 일. When I arrived, the movie **had** already **started**.(내가 도착했을 때 영화는 이미 시작했어요.)\n- **현재완료 진행형**(have been + -ing): 지금까지 **계속 하고 있는** 동작을 강조. I **have been waiting** for an hour.(한 시간째 기다리고 있어요.)\n\n둘 다 지금 배운 "have + 과거분사"를 바탕으로 만들어져요. 과거분사를 확실히 외워 두면 다음 학년 내용이 쉬워져요.',
    },
  ],

  faq: [
    {
      q: '현재완료랑 과거시제는 뭐가 달라요? 둘 다 "~했다"잖아요.',
      a: '우리말로는 둘 다 "~했다"지만, 과거시제는 과거에 **끝난 일**만 말하고 현재완료는 그 일이 **지금과 이어져 있음**을 말해요.\n\nI lost my key yesterday.는 어제 잃어버린 사실만 말하고, I have lost my key.는 "그래서 지금 열쇠가 없다"는 뜻까지 담아요. 그래서 yesterday, ago, last ~처럼 과거의 때를 콕 집는 말이 있으면 과거시제를 써요.',
    },
    {
      q: 'for랑 since가 자꾸 헷갈려요.',
      a: '"얼마 동안?"이면 for, "언제부터?"면 since예요. for 뒤에는 three years, two hours처럼 길이가 오고, since 뒤에는 2020, last Monday, I was ten처럼 시작한 때가 와요.',
    },
    {
      q: 'has gone to와 has been to는 어떻게 달라요?',
      a: 'has gone to는 "가 버려서 지금 여기 없다"(결과), has been to는 "가 본 적이 있다"(경험)예요. He has gone to Busan.이면 그는 부산에 가서 지금 여기 없고, He has been to Busan.이면 지금은 돌아와 있을 수 있어요.',
    },
    {
      q: '과거분사는 다 외워야 해요?',
      a: '규칙 동사는 과거형과 같아서(-ed) 따로 외울 필요가 없어요. 불규칙 동사만 원형–과거형–과거분사를 세 개씩 묶어 외우면 돼요. go–went–gone, eat–ate–eaten처럼 소리 내어 읽으면 잘 기억나요.',
    },
  ],

  mistakes: [
    '과거 시점을 나타내는 말과 현재완료를 함께 쓰는 실수 — I have seen him yesterday.(✗) → I **saw** him yesterday.',
    '과거분사 자리에 과거형을 쓰는 실수 — I have went(✗) → I have **gone**',
    'for와 since를 바꿔 쓰는 실수 — since three years(✗) → **for** three years / **since** 2020',
  ],

  gens: [
    {
      id: 'past-participle',
      level: 1,
      title: '과거분사 고르기',
      make: function (R) {
        // [원형, 과거형, 과거분사, 잘못 만든 꼴, 문장, 우리말]
        var bank = [
          ['go', 'went', 'gone', 'goed', 'He has [[빈칸]] to Busan, so he isn\'t here now.', '그는 부산에 가서 지금 여기 없어요.'],
          ['eat', 'ate', 'eaten', 'eated', 'I have already [[빈칸]] breakfast.', '나는 벌써 아침을 먹었어요.'],
          ['see', 'saw', 'seen', 'seeing', 'Have you ever [[빈칸]] a rainbow?', '무지개를 본 적이 있니?'],
          ['do', 'did', 'done', 'doed', 'Minsu has just [[빈칸]] his homework.', '민수는 방금 숙제를 끝냈어요.'],
          ['write', 'wrote', 'written', 'writed', 'She has [[빈칸]] three stories so far.', '그녀는 지금까지 이야기를 세 편 썼어요.'],
          ['take', 'took', 'taken', 'taked', 'We have [[빈칸]] many pictures today.', '우리는 오늘 사진을 많이 찍었어요.'],
          ['give', 'gave', 'given', 'gived', 'Dad has [[빈칸]] me a new bag.', '아빠가 나에게 새 가방을 주셨어요.'],
          ['break', 'broke', 'broken', 'breaked', 'Someone has [[빈칸]] the window.', '누군가 창문을 깼어요.'],
          ['speak', 'spoke', 'spoken', 'speaked', 'I have never [[빈칸]] to a foreigner in English.', '나는 외국인과 영어로 이야기해 본 적이 없어요.'],
          ['fly', 'flew', 'flown', 'flied', 'Have you ever [[빈칸]] a kite?', '연을 날려 본 적이 있니?'],
          ['swim', 'swam', 'swum', 'swimmed', 'I have never [[빈칸]] in the sea.', '나는 바다에서 수영해 본 적이 없어요.'],
          ['sing', 'sang', 'sung', 'singing', 'We have [[빈칸]] this song many times.', '우리는 이 노래를 여러 번 불렀어요.'],
          ['ride', 'rode', 'ridden', 'rided', 'Have you ever [[빈칸]] a horse?', '말을 타 본 적이 있니?'],
          ['forget', 'forgot', 'forgotten', 'forgetted', 'I have [[빈칸]] his phone number.', '나는 그의 전화번호를 잊어버렸어요.'],
          ['begin', 'began', 'begun', 'beginned', 'The movie has already [[빈칸]].', '영화가 벌써 시작했어요.'],
          ['wear', 'wore', 'worn', 'weared', 'I have never [[빈칸]] a hanbok.', '나는 한복을 입어 본 적이 없어요.'],
          ['know', 'knew', 'known', 'knowed', 'I have [[빈칸]] Jia since 2020.', '나는 2020년부터 지아를 알고 지냈어요.'],
          ['grow', 'grew', 'grown', 'growed', 'The tree has [[빈칸]] a lot this year.', '그 나무는 올해 많이 자랐어요.'],
          ['draw', 'drew', 'drawn', 'drawed', 'He has [[빈칸]] a picture of his dog.', '그는 자기 개를 그렸어요.'],
          ['drink', 'drank', 'drunk', 'drinked', 'Have you ever [[빈칸]] goat milk?', '염소젖을 마셔 본 적이 있니?'],
          ['choose', 'chose', 'chosen', 'choosed', 'Have you [[빈칸]] a book to read yet?', '읽을 책을 벌써 골랐니?'],
          ['fall', 'fell', 'fallen', 'falled', 'A lot of snow has [[빈칸]] since last night.', '어젯밤부터 눈이 많이 내렸어요.'],
        ];
        var it = R.pick(bank);
        var base = it[0], past = it[1], pp = it[2], bad = it[3];
        var reason = {};
        reason[past] = '과거형(' + past + ')을 골랐어요. have/has 뒤에는 세 번째 모양인 과거분사를 써요.';
        reason[base] = '동사원형(' + base + ')을 골랐어요. have/has 뒤에는 과거분사를 써요.';
        reason[bad] = /ing$/.test(bad)
          ? '-ing 꼴(' + bad + ')을 골랐어요. 현재완료는 have/has + 과거분사예요.'
          : '불규칙 동사라서 -ed를 붙이지 않아요. ' + base + ' – ' + past + ' – ' + pp;
        var pick = R.choices(pp, [past, base, bad]);
        return {
          type: 'choice', concept: 0,
          q: '괄호 안의 동사를 알맞은 꼴로 바꾼 것을 고르세요.\n\n' + it[4] + ' (' + base + ')\n(' + it[5] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === pp ? '' : reason[c] || ''; }),
          explain: '현재완료는 have/has + 과거분사예요. ' + base + ' – ' + past + ' – **' + pp + '**\n\n' + it[4].replace('[[빈칸]]', '**' + pp + '**'),
        };
      },
    },
    {
      id: 'perfect-or-past',
      level: 2,
      title: '현재완료와 과거시제 고르기',
      make: function (R) {
        // [문장, 우리말, 주어에 맞는 have/has, 원형, 과거형, 과거분사, 현재완료인가, 단서]
        var bank = [
          ['I [[빈칸]] in Seoul since 2019.', '나는 2019년부터 지금까지 서울에 살고 있어요.', 'have', 'live', 'lived', 'lived', true, 'since 2019'],
          ['She [[빈칸]] the piano since she was seven.', '그녀는 일곱 살 때부터 지금까지 피아노를 쳐 왔어요.', 'has', 'play', 'played', 'played', true, 'since she was seven'],
          ['They [[빈칸]] each other for ten years.', '그들은 10년 동안 서로 알고 지내 왔어요. (지금도 알아요)', 'have', 'know', 'knew', 'known', true, 'for ten years(지금도 이어짐)'],
          ['I [[빈칸]] this movie three times so far.', '나는 지금까지 이 영화를 세 번 봤어요.', 'have', 'see', 'saw', 'seen', true, 'so far(지금까지)'],
          ['My brother [[빈칸]] English since last year.', '내 남동생은 작년부터 지금까지 영어를 공부해 왔어요.', 'has', 'study', 'studied', 'studied', true, 'since last year'],
          ['Doyun [[빈칸]] in the school band for two years.', '도윤이는 2년 동안 학교 밴드에서 연주해 왔어요. (지금도 해요)', 'has', 'play', 'played', 'played', true, 'for two years(지금도 이어짐)'],
          ['The children [[빈칸]] in the pool since ten o\'clock.', '아이들은 10시부터 지금까지 수영장에 머물고 있어요.', 'have', 'stay', 'stayed', 'stayed', true, 'since ten o\'clock'],
          ['It [[빈칸]] a lot since this morning.', '오늘 아침부터 지금까지 눈이 많이 내리고 있어요.', 'has', 'snow', 'snowed', 'snowed', true, 'since this morning'],
          ['My uncle [[빈칸]] at this company for six months.', '우리 삼촌은 6개월 동안 이 회사에서 일해 왔어요. (지금도 일해요)', 'has', 'work', 'worked', 'worked', true, 'for six months(지금도 이어짐)'],
          ['We [[빈칸]] many photos since we arrived here.', '우리는 여기 도착한 뒤로 지금까지 사진을 많이 찍었어요.', 'have', 'take', 'took', 'taken', true, 'since we arrived here'],
          ['She [[빈칸]] a horse three times in her life.', '그녀는 지금까지 살면서 말을 세 번 타 봤어요.', 'has', 'ride', 'rode', 'ridden', true, 'three times in her life(경험)'],
          ['Minsu [[빈칸]] his bike yesterday.', '민수는 어제 자전거를 탔어요.', 'has', 'ride', 'rode', 'ridden', false, 'yesterday'],
          ['We [[빈칸]] to the museum last Saturday.', '우리는 지난 토요일에 박물관에 갔어요.', 'have', 'go', 'went', 'gone', false, 'last Saturday'],
          ['Jia [[빈칸]] a letter to her friend two days ago.', '지아는 이틀 전에 친구에게 편지를 썼어요.', 'has', 'write', 'wrote', 'written', false, 'two days ago'],
          ['He [[빈칸]] his wallet last night.', '그는 어젯밤에 지갑을 잃어버렸어요.', 'has', 'lose', 'lost', 'lost', false, 'last night'],
          ['Sua [[빈칸]] lunch an hour ago.', '수아는 한 시간 전에 점심을 먹었어요.', 'has', 'eat', 'ate', 'eaten', false, 'an hour ago'],
          ['We [[빈칸]] a snowman last winter.', '우리는 지난겨울에 눈사람을 만들었어요.', 'have', 'make', 'made', 'made', false, 'last winter'],
          ['I [[빈칸]] Jeju Island when I was ten.', '나는 열 살 때 제주도를 방문했어요.', 'have', 'visit', 'visited', 'visited', false, 'when I was ten'],
          ['Hayun [[빈칸]] a nice hat in 2023.', '하윤이는 2023년에 멋진 모자를 샀어요.', 'has', 'buy', 'bought', 'bought', false, 'in 2023'],
          ['I [[빈칸]] a strange sound just now.', '나는 방금 전에 이상한 소리를 들었어요.', 'have', 'hear', 'heard', 'heard', false, 'just now'],
          ['Junho [[빈칸]] the window last week.', '준호는 지난주에 창문을 깼어요.', 'has', 'break', 'broke', 'broken', false, 'last week'],
          ['My dad [[빈칸]] this car five years ago.', '우리 아빠는 5년 전에 이 차를 사셨어요.', 'has', 'buy', 'bought', 'bought', false, 'five years ago'],
        ];
        var it = R.pick(bank);
        var aux = it[2], other = aux === 'have' ? 'has' : 'have';
        var base = it[3], past = it[4], pp = it[5], perfect = it[6], clue = it[7];
        var correct = perfect ? aux + ' ' + pp : past;
        var subj = it[0].split(' [[')[0];
        var reason = {};
        function add(c, why) { if (c !== correct && !(c in reason)) reason[c] = why; }
        if (perfect) {
          add(past, '과거형은 이미 끝난 일만 말해요. 지금까지 이어지는 일은 현재완료(have/has + 과거분사)로 써요.');
          add(other + ' ' + pp, '주어와 맞지 않아요. 주어 ' + subj + ' 뒤에는 ' + aux + ' + 과거분사를 써요.');
          add(aux + ' ' + past, '현재완료에는 과거형이 아니라 과거분사를 써요. ' + base + ' – ' + past + ' – ' + pp);
          add(base, '동사원형(현재형)은 지금 하는 일만 말해요. 과거부터 이어 온 일은 현재완료로 써요.');
          add(aux + ' ' + base, 'have/has 뒤에는 동사원형이 아니라 과거분사를 써요.');
        } else {
          add(aux + ' ' + pp, '분명한 과거 시점을 나타내는 말이 있으면 현재완료를 쓰지 않아요.');
          add(other + ' ' + pp, '과거 시점을 나타내는 말이 있으니 과거시제를 써요. 게다가 have/has도 주어와 맞지 않아요.');
          add(base, '과거에 일어난 일이라 과거형(' + past + ')으로 써요.');
          add(aux + ' ' + base, '과거 시점을 나타내는 말이 있으니 과거형을 써요. have/has 뒤에 동사원형이 오는 꼴도 없어요.');
        }
        var pick = R.choices(correct, Object.keys(reason));
        return {
          type: 'choice', concept: perfect ? (/^(since|for) /.test(clue) ? 2 : 1) : 4,
          q: '우리말에 맞게 빈칸에 알맞은 것을 고르세요.\n\n' + it[0] + '\n(' + it[1] + ')',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
          explain: (perfect
            ? '단서: **' + clue + '** — 지금까지 이어지는 일이라 현재완료(have/has + 과거분사)를 써요. 주어 ' + subj + ' 뒤에는 ' + aux + ', 과거분사는 ' + base + ' – ' + past + ' – **' + pp + '**'
            : '단서: **' + clue + '** — 분명한 과거 시점이 있으니 과거시제를 써요. 과거형: ' + base + ' – **' + past + '**') +
            '\n\n' + it[0].replace('[[빈칸]]', '**' + correct + '**'),
        };
      },
    },
  ],

  vocab: [
    { w: 'experience', m: '경험', ex: 'Riding a horse was a great experience.', exm: '말을 탄 것은 멋진 경험이었어요.' },
    { w: 'abroad', m: '해외에, 해외로', ex: 'Have you ever been abroad?', exm: '해외에 가 본 적이 있나요?' },
    { w: 'already', m: '벌써, 이미', ex: 'I have already finished my lunch.', exm: '나는 벌써 점심을 다 먹었어요.' },
    { w: 'yet', m: '(부정문) 아직, (의문문) 벌써', ex: 'The bus hasn\'t come yet.', exm: '버스가 아직 오지 않았어요.' },
    { w: 'invite', m: '초대하다', ex: 'She has invited me to her birthday party.', exm: '그녀가 나를 생일 파티에 초대했어요.' },
    { w: 'pack', m: '(짐을) 싸다', ex: 'Have you packed your bag yet?', exm: '벌써 가방을 쌌니?' },
    { w: 'move', m: '이사하다', ex: 'My aunt moved to Jeju last month.', exm: '우리 이모는 지난달에 제주로 이사했어요.' },
    { w: 'lose', m: '잃어버리다', ex: 'I have lost my umbrella.', exm: '나는 우산을 잃어버렸어요.' },
    { w: 'try', m: '해 보다, 먹어 보다', ex: 'Have you ever tried Mexican food?', exm: '멕시코 음식을 먹어 본 적이 있나요?' },
    { w: 'island', m: '섬', ex: 'I have never been to that island.', exm: '나는 그 섬에 가 본 적이 없어요.' },
    { w: 'whale', m: '고래', ex: 'Have you ever seen a whale?', exm: '고래를 본 적이 있나요?' },
    { w: 'wallet', m: '지갑', ex: 'He lost his wallet yesterday.', exm: '그는 어제 지갑을 잃어버렸어요.' },
    { w: 'climb', m: '오르다', ex: 'She has climbed Mt. Halla twice.', exm: '그녀는 한라산에 두 번 올랐어요.' },
    { w: 'twice', m: '두 번', ex: 'I have been to Busan twice.', exm: '나는 부산에 두 번 가 봤어요.' },
  ],
});
})();
