/* 5학년 수학 · 다각형의 둘레와 넓이 */
Tutor.registerUnit({
  id: 'math-e5-06',
  course: 'math-e5',
  title: '다각형의 둘레와 넓이',
  summary: '다각형의 둘레를 구하고, 넓이 단위를 알아 직사각형, 평행사변형, 삼각형 등의 넓이를 구해요.',
  goals: [
    '정다각형과 여러 가지 사각형의 둘레를 구할 수 있어요.',
    '넓이 단위 1 cm², 1 m², 1 km²를 알고 그 관계를 말할 수 있어요.',
    '직사각형, 평행사변형, 삼각형, 마름모, 사다리꼴의 넓이를 구할 수 있어요.',
  ],
  standards: ['[6수03-11]', '[6수03-12]', '[6수03-13]', '[6수03-14]'],

  concepts: [
    {
      title: '정다각형과 사각형의 둘레',
      body: '**둘레**는 도형의 가장자리를 한 바퀴 돈 길이예요. 모든 변의 길이를 더하면 돼요.\n\n- **정다각형**은 변의 길이가 모두 같으므로 (둘레) = (한 변의 길이) × (변의 수)\n- **직사각형**은 가로와 세로가 2개씩 있으므로 (둘레) = ((가로) + (세로)) × 2\n- **평행사변형**은 마주 보는 두 변의 길이가 같으므로 (둘레) = ((한 변) + (다른 한 변)) × 2\n- **마름모**는 네 변의 길이가 모두 같으므로 (둘레) = (한 변의 길이) × 4\n\n예를 들어 가로 7 cm, 세로 4 cm인 직사각형의 둘레는 $(7+4)\\times2=22$, 곧 22 cm예요.',
      easy: '도형의 가장자리를 따라 개미가 한 바퀴 걷는다고 생각해 보세요. 개미가 걸은 거리가 바로 둘레예요.\n\n직사각형을 걸으면 가로 → 세로 → 가로 → 세로 순서로 걸어요. 가로를 두 번, 세로를 두 번 걸으니 (가로 + 세로)를 두 번 더한 것과 같아요.',
      fig: { type: 'polygon', points: [[0, 0], [7, 0], [7, 4], [0, 4]], sides: ['7 cm', '4 cm', null, null], alt: '가로 7 cm, 세로 4 cm인 직사각형' },
      check: {
        type: 'choice',
        q: '가로 7 cm, 세로 4 cm인 직사각형의 둘레는 몇 cm일까요?',
        choices: ['22 cm', '11 cm', '28 cm'],
        answer: 0,
        why: [
          '',
          '가로와 세로를 한 번씩만 더했어요. 직사각형에는 가로와 세로가 2개씩 있어요.',
          '가로와 세로를 곱했어요. 그것은 넓이예요. 둘레는 변의 길이를 모두 더해요.',
        ],
        explain: '(둘레) = ((가로) + (세로)) × 2 이므로 $(7+4)\\times2=22$, 곧 22 cm예요.',
      },
    },
    {
      title: '넓이의 단위',
      body: '**넓이**는 평면에서 도형이 차지하는 크기예요. 넓이를 잴 때는 크기가 정해진 정사각형이 몇 개 들어가는지 세어요.\n\n| 단위 | 뜻 | 읽기 |\n|---|---|---|\n| 1 cm² | 한 변이 1 cm인 정사각형의 넓이 | 1 제곱센티미터 |\n| 1 m² | 한 변이 1 m인 정사각형의 넓이 | 1 제곱미터 |\n| 1 km² | 한 변이 1 km인 정사각형의 넓이 | 1 제곱킬로미터 |\n\n1 m = 100 cm이므로 한 변이 1 m인 정사각형에는 1 cm²짜리가 가로로 100개, 세로로 100줄 들어가요. 그래서 **1 m² = 10000 cm²**예요.\n\n같은 방법으로 1 km = 1000 m이므로 **1 km² = 1000000 m²**예요.\n\n> ⚠️ 1 m = 100 cm이지만 1 m²는 100 cm²가 아니라 10000 cm²예요.',
      easy: '바닥에 한 변이 1 cm인 아주 작은 타일을 깐다고 생각해 보세요. 타일 한 장의 넓이가 1 cm²예요.\n\n한 변이 1 m인 큰 정사각형 바닥에는 작은 타일이 한 줄에 100장씩, 100줄 들어가요. 그래서 모두 $100\\times100=10000$장, 곧 10000 cm²예요.',
      check: {
        type: 'ox',
        q: '1 m²는 100 cm²와 같아요.',
        answer: false,
        explain: '한 변이 1 m(=100 cm)인 정사각형에는 1 cm²가 $100\\times100=10000$개 들어가요. 그래서 1 m² = 10000 cm²예요.',
      },
    },
    {
      title: '직사각형과 정사각형의 넓이',
      body: '가로 4 cm, 세로 3 cm인 직사각형에는 1 cm²짜리 정사각형이 한 줄에 4개씩 3줄, 모두 $4\\times3=12$개 들어가요. 그래서 넓이는 12 cm²예요.\n\n(직사각형의 넓이) = (가로) × (세로)\n\n정사각형은 가로와 세로가 같으므로\n\n(정사각형의 넓이) = (한 변의 길이) × (한 변의 길이)\n\n> 💡 둘레는 길이라서 단위가 cm, 넓이는 cm²예요. 답을 쓸 때 단위를 꼭 확인해요.',
      easy: '초콜릿 판을 떠올려 보세요. 한 줄에 4칸씩 3줄이면 칸은 모두 $4\\times3=12$칸이에요.\n\n한 칸이 1 cm²라면 초콜릿 판의 넓이는 12 cm²예요. 줄 수 × 한 줄의 칸 수가 바로 세로 × 가로예요.',
      fig: { type: 'polygon', points: [[0, 0], [4, 0], [4, 3], [0, 3]], sides: ['4 cm', '3 cm', null, null], segments: [{ from: [1, 0], to: [1, 3], dashed: true }, { from: [2, 0], to: [2, 3], dashed: true }, { from: [3, 0], to: [3, 3], dashed: true }, { from: [0, 1], to: [4, 1], dashed: true }, { from: [0, 2], to: [4, 2], dashed: true }], alt: '가로 4 cm, 세로 3 cm인 직사각형을 1 cm 간격의 점선으로 나눈 그림' },
      check: {
        type: 'short', check: 'number', unit: 'cm²',
        q: '한 변이 6 cm인 정사각형의 넓이는 몇 cm²일까요?',
        answer: '36',
        wrong: [
          { a: '24', why: '둘레를 구했어요($6\\times4$). 넓이는 한 변과 한 변을 곱해요.' },
          { a: '12', why: '한 변을 두 번 더했어요. 넓이는 더하지 않고 곱해요: $6\\times6$' },
        ],
        explain: '(정사각형의 넓이) = (한 변) × (한 변) = $6\\times6=36$, 곧 36 cm²예요.',
      },
    },
    {
      title: '평행사변형의 넓이',
      body: '평행사변형에서 한 변을 **밑변**이라 하면, 밑변과 마주 보는 변 사이의 거리(밑변에 수직인 선분의 길이)를 **높이**라고 해요.\n\n평행사변형의 한쪽을 높이를 따라 잘라 반대쪽에 붙이면 직사각형이 돼요. 이 직사각형의 가로는 밑변, 세로는 높이와 같아요.\n\n(평행사변형의 넓이) = (밑변) × (높이)\n\n> ⚠️ 비스듬한 옆 변의 길이는 높이가 아니에요. 높이는 밑변과 **수직**으로 잰 길이예요.\n\n> 💡 밑변과 높이가 같으면 모양이 달라도 평행사변형의 넓이는 같아요.',
      easy: '종이로 만든 평행사변형에서 왼쪽의 삼각형 부분을 가위로 잘라 오른쪽 끝에 붙여 보세요. 반듯한 직사각형이 돼요.\n\n잘라 붙이기만 했으니 넓이는 그대로예요. 직사각형의 넓이는 가로 × 세로이므로, 평행사변형의 넓이는 밑변 × 높이예요.',
      fig: { type: 'polygon', points: [[0, 0], [8, 0], [11, 4], [3, 4]], sides: ['8 cm', '5 cm', null, null], segments: [{ from: [3, 4], to: [3, 0], dashed: true, right: true, label: '4 cm' }], alt: '밑변 8 cm, 옆 변 5 cm인 평행사변형에 높이 4 cm를 점선으로 나타낸 그림' },
      check: {
        type: 'choice',
        q: '밑변이 8 cm, 높이가 4 cm, 옆 변이 5 cm인 평행사변형의 넓이는 얼마일까요?',
        choices: ['32 cm²', '40 cm²', '26 cm²'],
        answer: 0,
        why: [
          '',
          '밑변과 옆 변을 곱했어요. 높이는 밑변과 수직으로 잰 길이예요.',
          '둘레를 구했어요: $(8+5)\\times2=26$. 넓이는 밑변과 높이를 곱해요.',
        ],
        explain: '(평행사변형의 넓이) = (밑변) × (높이) = $8\\times4=32$, 곧 32 cm²예요.',
      },
    },
    {
      title: '삼각형의 넓이',
      body: '삼각형에서 한 변을 **밑변**이라 하면, 마주 보는 꼭짓점에서 밑변에 수직으로 그은 선분의 길이가 **높이**예요.\n\n똑같은 삼각형 2개를 돌려 붙이면 평행사변형이 돼요. 이 평행사변형의 밑변과 높이는 삼각형의 밑변, 높이와 같아요. 삼각형은 그 절반이므로\n\n(삼각형의 넓이) = (밑변) × (높이) ÷ 2\n\n예: 밑변 6 cm, 높이 4 cm인 삼각형의 넓이는 $6\\times4\\div2=12$, 곧 12 cm²예요.\n\n> 💡 둔각삼각형은 높이가 삼각형 밖에 그려질 수 있어요. 그래도 넓이 구하는 방법은 같아요.',
      easy: '직사각형 모양 종이를 대각선으로 반 접어 자르면 똑같은 삼각형 2개가 생겨요. 그러니 직각삼각형 하나는 직사각형의 반이에요.\n\n다른 삼각형도 똑같은 삼각형 하나를 더 붙이면 평행사변형이 되니, 언제나 "밑변 × 높이"의 반이에요.',
      fig: { type: 'polygon', points: [[0, 0], [6, 0], [2, 4]], sides: ['6 cm', null, null], segments: [{ from: [2, 4], to: [2, 0], dashed: true, right: true, label: '4 cm' }], alt: '밑변 6 cm인 삼각형에 높이 4 cm를 점선으로 나타낸 그림' },
      check: {
        type: 'ox',
        q: '밑변이 10 cm, 높이가 6 cm인 삼각형의 넓이는 60 cm²예요.',
        answer: false,
        explain: '삼각형의 넓이는 밑변 × 높이를 2로 나눠야 해요. $10\\times6\\div2=30$이므로 30 cm²예요. 60 cm²는 2로 나누지 않은 값이에요.',
      },
    },
    {
      title: '마름모와 사다리꼴의 넓이',
      body: '**마름모**: 두 대각선을 그으면 마름모를 둘러싼 직사각형의 절반이 마름모예요. 직사각형의 가로와 세로는 두 대각선의 길이와 같아요.\n\n(마름모의 넓이) = (한 대각선) × (다른 대각선) ÷ 2\n\n**사다리꼴**: 평행한 두 변을 **윗변**, **아랫변**이라 하고, 두 변 사이의 거리를 **높이**라고 해요. 똑같은 사다리꼴 2개를 뒤집어 붙이면 밑변이 (윗변 + 아랫변)인 평행사변형이 돼요.\n\n(사다리꼴의 넓이) = ((윗변) + (아랫변)) × (높이) ÷ 2\n\n예: 윗변 4 cm, 아랫변 8 cm, 높이 5 cm인 사다리꼴의 넓이는 $(4+8)\\times5\\div2=30$, 곧 30 cm²예요.',
      easy: '마름모를 담은 직사각형 상자를 그려 보세요. 마름모 바깥에 작은 삼각형 4개가 남는데, 이것을 모으면 마름모와 크기가 똑같아요. 그래서 마름모는 상자의 반이에요.\n\n사다리꼴은 똑같은 것 하나를 거꾸로 뒤집어 옆에 붙이면 평행사변형이 돼요. 평행사변형 넓이의 반이 사다리꼴이에요.',
      fig: { type: 'polygon', points: [[0, 0], [8, 0], [6, 5], [2, 5]], sides: ['8 cm', null, '4 cm', null], segments: [{ from: [2, 5], to: [2, 0], dashed: true, right: true, label: '5 cm' }], alt: '윗변 4 cm, 아랫변 8 cm, 높이 5 cm인 사다리꼴' },
      check: {
        type: 'choice',
        q: '윗변이 4 cm, 아랫변이 8 cm, 높이가 5 cm인 사다리꼴의 넓이는 얼마일까요?',
        choices: ['30 cm²', '60 cm²', '17 cm²'],
        answer: 0,
        why: [
          '',
          '2로 나누는 것을 빠뜨렸어요. 사다리꼴 2개를 붙인 평행사변형의 반이에요.',
          '세 길이를 모두 더했어요: $4+8+5$. 넓이는 (윗변 + 아랫변) × 높이 ÷ 2예요.',
        ],
        explain: '((윗변) + (아랫변)) × (높이) ÷ 2 = $(4+8)\\times5\\div2=30$, 곧 30 cm²예요.',
      },
    },
  ],

  examples: [
    {
      q: '밑변이 9 cm이고 높이가 6 cm인 삼각형의 넓이는 몇 cm²일까요?',
      fig: { type: 'polygon', points: [[0, 0], [9, 0], [6, 6]], sides: ['9 cm', null, null], segments: [{ from: [6, 6], to: [6, 0], dashed: true, right: true, label: '6 cm' }], alt: '밑변 9 cm, 높이 6 cm인 삼각형' },
      steps: [
        '삼각형의 넓이는 (밑변) × (높이) ÷ 2로 구해요.',
        '밑변 9 cm와 높이 6 cm를 곱하면 $9\\times6=54$예요.',
        '2로 나누면 $54\\div2=27$이에요.',
      ],
      answer: '27 cm²',
    },
    {
      q: '그림과 같은 도형의 넓이는 몇 cm²일까요? (모든 모서리는 직각이에요.)',
      fig: { type: 'polygon', points: [[0, 0], [8, 0], [8, 3], [3, 3], [3, 7], [0, 7]], sides: ['8 cm', '3 cm', null, null, '3 cm', '7 cm'], segments: [{ from: [0, 3], to: [3, 3], dashed: true }], alt: '가로 8 cm, 세로 3 cm인 직사각형 위 왼쪽에 폭 3 cm인 직사각형이 세워진 ㄴ자 모양 도형. 전체 높이는 7 cm' },
      steps: [
        '점선을 따라 두 직사각형으로 나누어요.',
        '아래 직사각형: 가로 8 cm, 세로 3 cm → $8\\times3=24$ (cm²)',
        '위 직사각형: 가로 3 cm, 세로는 전체 높이에서 아래 세로를 뺀 $7-3=4$ (cm) → $3\\times4=12$ (cm²)',
        '두 넓이를 더하면 $24+12=36$ (cm²)예요.',
      ],
      answer: '36 cm²',
    },
    {
      q: '두 대각선의 길이가 12 cm, 7 cm인 마름모의 넓이는 몇 cm²일까요?',
      steps: [
        '마름모의 넓이는 (한 대각선) × (다른 대각선) ÷ 2예요.',
        '$12\\times7=84$, $84\\div2=42$',
      ],
      answer: '42 cm²',
    },
  ],

  terms: [
    { term: '둘레', def: '도형의 가장자리를 한 바퀴 돈 길이예요. 모든 변의 길이를 더해서 구해요.' },
    { term: '정다각형', def: '변의 길이가 모두 같고 각의 크기도 모두 같은 다각형이에요. 예: 정삼각형, 정사각형, 정오각형' },
    { term: '넓이', def: '평면에서 도형이 차지하는 크기예요. 1 cm², 1 m², 1 km² 같은 단위로 나타내요.' },
    { term: '제곱센티미터', def: '한 변이 1 cm인 정사각형의 넓이를 1 cm²라 쓰고 1 제곱센티미터라고 읽어요.' },
    { term: '제곱미터', def: '한 변이 1 m인 정사각형의 넓이를 1 m²라 쓰고 1 제곱미터라고 읽어요. 1 m² = 10000 cm²' },
    { term: '제곱킬로미터', def: '한 변이 1 km인 정사각형의 넓이를 1 km²라 쓰고 1 제곱킬로미터라고 읽어요. 1 km² = 1000000 m²' },
    { term: '밑변', def: '평행사변형이나 삼각형에서 넓이를 구할 때 기준으로 삼는 변이에요.' },
    { term: '높이', def: '밑변과 마주 보는 변(또는 꼭짓점) 사이의 거리예요. 밑변에 수직으로 잰 길이예요.' },
    { term: '윗변과 아랫변', def: '사다리꼴에서 서로 평행한 두 변이에요. 둘 중 위쪽을 윗변, 아래쪽을 아랫변이라고 해요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 0,
      q: '한 변의 길이가 5 cm인 정육각형의 둘레는 몇 cm일까요?',
      fig: { type: 'polygon', points: [[5, 0], [2.5, 4.33], [-2.5, 4.33], [-5, 0], [-2.5, -4.33], [2.5, -4.33]], sides: ['5 cm', null, null, null, null, null], alt: '한 변이 5 cm인 정육각형' },
      answer: '30',
      wrong: [{ a: '25', why: '변의 수를 5개로 셌어요. 육각형은 변이 6개예요.' }],
      explain: '정육각형은 변이 6개이고 길이가 모두 같아요. $5\\times6=30$이므로 둘레는 30 cm예요.',
    },
    {
      id: 'p2', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 0,
      q: '이웃한 두 변의 길이가 9 cm, 6 cm인 평행사변형의 둘레는 몇 cm일까요?',
      fig: { type: 'polygon', points: [[0, 0], [9, 0], [12.6, 4.8], [3.6, 4.8]], sides: ['9 cm', '6 cm', null, null], alt: '이웃한 두 변이 9 cm, 6 cm인 평행사변형' },
      answer: '30',
      wrong: [
        { a: '15', why: '두 변을 한 번씩만 더했어요. 평행사변형은 마주 보는 변의 길이가 같아서 같은 길이의 변이 2개씩 있어요.' },
        { a: '54', why: '두 변의 길이를 곱했어요. 둘레는 변의 길이를 모두 더해요.' },
      ],
      explain: '평행사변형은 마주 보는 두 변의 길이가 같아요. $(9+6)\\times2=30$이므로 둘레는 30 cm예요.',
    },
    {
      id: 'p3', level: 1, type: 'choice', concept: 1,
      q: '어떤 도시 전체의 넓이를 나타내기에 가장 알맞은 단위는 무엇일까요?',
      choices: ['km²', 'm²', 'cm²', 'km'],
      answer: 0,
      why: [
        '',
        'm²는 교실이나 운동장처럼 비교적 작은 넓이에 알맞아요. 도시는 훨씬 넓어요.',
        'cm²는 공책이나 손수건처럼 작은 넓이에 써요.',
        'km는 길이의 단위예요. 넓이에는 km²처럼 제곱이 붙은 단위를 써요.',
      ],
      explain: '도시처럼 아주 넓은 곳은 한 변이 1 km인 정사각형이 몇 개 들어가는지로 나타내는 km²가 알맞아요.',
    },
    {
      id: 'p4', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 2,
      q: '가로가 9 cm, 세로가 7 cm인 직사각형의 넓이는 몇 cm²일까요?',
      answer: '63',
      wrong: [
        { a: '32', why: '둘레를 구했어요: $(9+7)\\times2$. 넓이는 가로와 세로를 곱해요.' },
        { a: '16', why: '가로와 세로를 더했어요. 넓이는 곱해서 구해요.' },
      ],
      explain: '(직사각형의 넓이) = (가로) × (세로) = $9\\times7=63$, 곧 63 cm²예요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 3,
      q: '그림과 같은 평행사변형의 넓이는 몇 cm²일까요?',
      fig: { type: 'polygon', points: [[0, 0], [10, 0], [16, 8], [6, 8]], sides: ['10 cm', '10 cm', null, null], segments: [{ from: [6, 8], to: [6, 0], dashed: true, right: true, label: '8 cm' }], alt: '밑변 10 cm, 옆 변 10 cm인 평행사변형에 높이 8 cm를 점선으로 나타낸 그림' },
      answer: '80',
      wrong: [{ a: '100', why: '밑변과 옆 변을 곱했어요. 높이는 밑변과 수직인 점선의 길이예요.' }],
      explain: '(평행사변형의 넓이) = (밑변) × (높이) = $10\\times8=80$, 곧 80 cm²예요. 비스듬한 옆 변은 높이가 아니에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 4,
      q: '밑변이 12 cm, 높이가 5 cm인 삼각형의 넓이는 몇 cm²일까요?',
      fig: { type: 'polygon', points: [[0, 0], [12, 0], [8, 5]], sides: ['12 cm', null, null], segments: [{ from: [8, 5], to: [8, 0], dashed: true, right: true, label: '5 cm' }], alt: '밑변 12 cm, 높이 5 cm인 삼각형' },
      answer: '30',
      wrong: [{ a: '60', why: '2로 나누는 것을 빠뜨렸어요. 삼각형은 밑변과 높이가 같은 평행사변형의 반이에요.' }],
      explain: '(삼각형의 넓이) = (밑변) × (높이) ÷ 2 = $12\\times5\\div2=30$, 곧 30 cm²예요.',
    },
    {
      id: 'p7', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 5,
      q: '두 대각선의 길이가 10 cm, 8 cm인 마름모의 넓이는 몇 cm²일까요?',
      fig: { type: 'polygon', points: [[0, 4], [5, 0], [10, 4], [5, 8]], segments: [{ from: [0, 4], to: [10, 4], dashed: true, label: '10 cm' }, { from: [5, 0], to: [5, 8], dashed: true, label: '8 cm' }], alt: '두 대각선이 10 cm, 8 cm인 마름모' },
      answer: '40',
      wrong: [{ a: '80', why: '2로 나누는 것을 빠뜨렸어요. 마름모는 두 대각선을 가로·세로로 하는 직사각형의 반이에요.' }],
      explain: '(마름모의 넓이) = (한 대각선) × (다른 대각선) ÷ 2 = $10\\times8\\div2=40$, 곧 40 cm²예요.',
    },
    {
      id: 'p8', level: 1, type: 'ox', concept: 3,
      q: '밑변의 길이와 높이가 각각 같은 두 평행사변형은 모양이 달라도 넓이가 같아요.',
      answer: true,
      explain: '평행사변형의 넓이는 (밑변) × (높이)로만 정해져요. 밑변과 높이가 같으면 기울어진 정도가 달라도 넓이가 같아요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 1,
      q: '4 m²는 몇 cm²일까요?',
      answer: '40000',
      hint: '1 m²가 몇 cm²인지 먼저 떠올려 보세요.',
      wrong: [{ a: '400', why: '1 m²를 100 cm²로 생각했어요. 1 m² = $100\\times100$ = 10000 cm²예요.' }],
      explain: '1 m² = 10000 cm²이므로 4 m² = $4\\times10000=40000$ (cm²)예요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 1,
      q: '1 km²와 1 m²의 관계로 옳은 것은 무엇일까요?',
      choices: ['1 km² = 1000000 m²', '1 km² = 1000 m²', '1 km² = 10000 m²', '1 km² = 100 m²'],
      answer: 0,
      why: [
        '',
        '길이의 관계(1 km = 1000 m)를 그대로 썼어요. 넓이는 가로와 세로가 모두 1000배라서 $1000\\times1000$배예요.',
        '1 m²와 1 cm²의 관계(10000배)와 헷갈렸어요.',
        '1 km는 100 m가 아니라 1000 m예요.',
      ],
      hint: '한 변이 1 km(= 1000 m)인 정사각형을 떠올려 보세요.',
      explain: '한 변이 1000 m인 정사각형의 넓이는 $1000\\times1000=1000000$ (m²)예요. 그래서 1 km² = 1000000 m²예요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 5,
      q: '윗변이 6 cm, 아랫변이 10 cm, 높이가 7 cm인 사다리꼴의 넓이는 몇 cm²일까요?',
      fig: { type: 'polygon', points: [[0, 0], [10, 0], [8, 7], [2, 7]], sides: ['10 cm', null, '6 cm', null], segments: [{ from: [2, 7], to: [2, 0], dashed: true, right: true, label: '7 cm' }], alt: '윗변 6 cm, 아랫변 10 cm, 높이 7 cm인 사다리꼴' },
      answer: '56',
      hint: '윗변과 아랫변을 먼저 더해 보세요.',
      wrong: [
        { a: '112', why: '2로 나누는 것을 빠뜨렸어요.' },
        { a: '70', why: '아랫변만 높이와 곱했어요. 윗변과 아랫변을 더한 뒤 높이를 곱하고 2로 나눠요.' },
      ],
      explain: '((윗변) + (아랫변)) × (높이) ÷ 2 = $(6+10)\\times7\\div2=56$, 곧 56 cm²예요.',
    },
    {
      id: 'p12', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 2,
      q: '둘레가 36 cm인 정사각형의 넓이는 몇 cm²일까요?',
      answer: '81',
      hint: '먼저 한 변의 길이를 구해요.',
      wrong: [
        { a: '9', why: '한 변의 길이까지만 구했어요. 넓이는 한 변 × 한 변이에요.' },
        { a: '324', why: '둘레와 한 변을 곱했어요. 넓이는 한 변 × 한 변이에요.' },
      ],
      explain: '정사각형은 네 변의 길이가 같으므로 한 변은 $36\\div4=9$ (cm)예요. 넓이는 $9\\times9=81$, 곧 81 cm²예요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: 'm²', concept: 2,
      q: '가로 15 m, 세로 10 m인 직사각형 모양의 땅에 폭이 2 m인 길을 가로와 세로로 하나씩 십자 모양으로 냈어요. 길을 뺀 나머지 땅의 넓이는 몇 m²일까요?',
      fig: { type: 'polygon', points: [[0, 0], [15, 0], [15, 10], [0, 10]], sides: ['15 m', '10 m', null, null], segments: [{ from: [6, 0], to: [6, 10] }, { from: [8, 0], to: [8, 10] }, { from: [0, 4], to: [15, 4] }, { from: [0, 6], to: [15, 6] }], alt: '가로 15 m, 세로 10 m인 직사각형 땅에 폭 2 m인 길이 가로와 세로로 하나씩 지나가는 그림' },
      answer: '104',
      hint: '길을 한쪽으로 밀어 붙여도 남은 땅의 넓이는 그대로예요.',
      wrong: [{ a: '100', why: '두 길이 겹치는 가운데 부분(2 m × 2 m)을 두 번 뺐어요.' }],
      explain: '길을 땅의 가장자리로 밀어 붙였다고 생각하면 남은 땅은 가로 $15-2=13$ (m), 세로 $10-2=8$ (m)인 직사각형이에요. 넓이는 $13\\times8=104$ (m²)예요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
      q: '넓이가 54 cm²이고 밑변이 12 cm인 삼각형의 높이는 몇 cm일까요?',
      answer: '9',
      hint: '(밑변) × (높이) ÷ 2 = 54 예요. 거꾸로 생각해 보세요.',
      wrong: [{ a: '4.5', why: '2로 나눈 것을 되돌리지 않았어요. (밑변) × (높이)는 $54\\times2=108$이에요.' }],
      explain: '(밑변) × (높이) ÷ 2 = 54이므로 (밑변) × (높이) = $54\\times2=108$이에요. 밑변이 12 cm이므로 높이는 $108\\div12=9$ (cm)예요.',
    },
    {
      id: 'a3', level: 3, type: 'choice', concept: 5,
      q: '넓이가 가장 넓은 도형은 무엇일까요?',
      choices: [
        '두 대각선이 10 cm, 10 cm인 마름모',
        '밑변 8 cm, 높이 6 cm인 평행사변형',
        '밑변 10 cm, 높이 9 cm인 삼각형',
        '윗변 5 cm, 아랫변 9 cm, 높이 6 cm인 사다리꼴',
      ],
      answer: 0,
      why: [
        '',
        '평행사변형은 $8\\times6=48$ (cm²)이고, 마름모는 $10\\times10\\div2=50$ (cm²)로 더 넓어요.',
        '삼각형은 2로 나눠야 해요. $10\\times9\\div2=45$ (cm²)예요.',
        '사다리꼴은 $(5+9)\\times6\\div2=42$ (cm²)예요.',
      ],
      hint: '네 도형의 넓이를 모두 구해 비교해 보세요.',
      explain: '마름모 $10\\times10\\div2=50$, 평행사변형 $8\\times6=48$, 삼각형 $10\\times9\\div2=45$, 사다리꼴 $(5+9)\\times6\\div2=42$ (cm²)예요. 가장 넓은 것은 마름모예요.',
    },
    {
      id: 'a4', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 5,
      q: '넓이가 60 cm²인 사다리꼴이 있어요. 윗변이 7 cm, 높이가 8 cm라면 아랫변은 몇 cm일까요?',
      answer: '8',
      hint: '(윗변 + 아랫변) × 8 ÷ 2 = 60 이에요. 거꾸로 계산해 보세요.',
      wrong: [{ a: '15', why: '윗변과 아랫변의 합까지만 구했어요. 합에서 윗변 7 cm를 빼요.' }],
      explain: '(윗변 + 아랫변) × 8 ÷ 2 = 60이므로 (윗변 + 아랫변) × 8 = 120, (윗변 + 아랫변) = $120\\div8=15$예요. 아랫변은 $15-7=8$ (cm)예요.',
    },
    {
      id: 'a5', level: 3, type: 'short', check: 'number', unit: 'cm²', concept: 2,
      q: '둘레가 30 cm인 직사각형이 있어요. 가로가 세로보다 3 cm 더 길다면, 이 직사각형의 넓이는 몇 cm²일까요?',
      answer: '54',
      hint: '둘레의 반은 가로와 세로의 합이에요.',
      wrong: [{ a: '15', why: '가로와 세로의 합까지만 구했어요. 가로와 세로를 각각 구해서 곱해요.' }],
      explain: '가로와 세로의 합은 $30\\div2=15$ (cm)예요. 합 15에서 차 3을 빼고 2로 나누면 세로는 $(15-3)\\div2=6$ (cm), 가로는 $6+3=9$ (cm)예요. 넓이는 $9\\times6=54$ (cm²)예요.',
    },
  ],

  deeper: [
    {
      title: '땅 넓이에 쓰는 단위 아르와 헥타르',
      body: '논이나 밭, 공원처럼 넓은 땅을 잴 때는 **아르(a)**와 **헥타르(ha)**라는 단위를 쓰기도 해요.\n\n- 1 a: 한 변이 10 m인 정사각형의 넓이 = $10\\times10$ = 100 m²\n- 1 ha: 한 변이 100 m인 정사각형의 넓이 = $100\\times100$ = 10000 m²\n\n1 km²는 한 변이 1000 m이니 1 ha짜리 정사각형이 가로로 10개, 세로로 10줄, 모두 100개 들어가요. 곧 1 km² = 100 ha예요.',
    },
    {
      title: '둘레가 같으면 넓이도 같을까?',
      body: '둘레가 20 cm인 직사각형을 여러 개 만들어 보아요. 가로와 세로의 합은 언제나 10 cm예요.\n\n| 가로 | 세로 | 넓이 |\n|---|---|---|\n| 9 cm | 1 cm | 9 cm² |\n| 7 cm | 3 cm | 21 cm² |\n| 6 cm | 4 cm | 24 cm² |\n| 5 cm | 5 cm | 25 cm² |\n\n둘레가 같아도 넓이는 다를 수 있어요. 가로와 세로의 길이가 비슷할수록 넓이가 넓어지고, 정사각형일 때 가장 넓어요.\n\n6학년에서는 원의 둘레와 넓이도 배워요.',
    },
  ],

  faq: [
    {
      q: '높이는 왜 비스듬한 변의 길이가 아니에요?',
      a: '높이는 밑변과 마주 보는 변 사이의 "거리"예요. 거리는 가장 짧게, 곧 수직으로 재야 해요.\n\n비스듬한 변은 수직인 선보다 길어서, 그 길이를 곱하면 넓이가 실제보다 커져요. 그림에서 직각 표시가 있는 점선을 찾아보세요.',
    },
    {
      q: '1 m는 100 cm인데 1 m²는 왜 10000 cm²예요?',
      a: '1 m²는 한 변이 1 m인 정사각형이에요. 그 안에 1 cm²짜리 정사각형이 가로로 100개, 세로로 100줄 들어가요.\n\n가로와 세로가 모두 100배가 되니 넓이는 $100\\times100=10000$배가 돼요.',
    },
    {
      q: '삼각형 넓이는 왜 2로 나눠요?',
      a: '똑같은 삼각형 2개를 붙이면 밑변과 높이가 같은 평행사변형이 돼요. 평행사변형의 넓이는 밑변 × 높이이니, 삼각형 하나는 그 반이에요.\n\n그래서 (밑변) × (높이)를 구한 뒤 2로 나눠요.',
    },
  ],

  mistakes: [
    '평행사변형이나 삼각형의 넓이를 구할 때 비스듬한 옆 변을 높이로 쓰는 실수 — 높이는 밑변과 수직인 길이예요.',
    '삼각형·마름모·사다리꼴의 넓이에서 2로 나누는 것을 잊는 실수 — 모두 평행사변형이나 직사각형의 반이에요.',
    '1 m² = 100 cm²라고 생각하는 실수 — 가로와 세로가 모두 100배이므로 1 m² = 10000 cm²예요.',
  ],

  gens: [
    {
      id: 'perimeter',
      level: 1,
      title: '정다각형과 사각형의 둘레',
      make: function (R) {
        function reg(n, r) {
          var pts = [], start = n % 2 ? 90 : -90 + 180 / n;
          for (var i = 0; i < n; i++) {
            var t = (start - 360 * i / n) * Math.PI / 180;
            pts.push([Math.round(r * Math.cos(t) * 100) / 100, Math.round(r * Math.sin(t) * 100) / 100]);
          }
          return pts;
        }
        var kind = R.int(0, 3);
        if (kind === 0) {
          var names = { 3: '정삼각형', 5: '정오각형', 6: '정육각형', 8: '정팔각형' };
          var n = R.pick([3, 5, 6, 8]), s = R.int(3, 15), name = names[n];
          var sides = []; for (var i = 0; i < n; i++) sides.push(i === 0 ? s + ' cm' : null);
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 0,
            q: '한 변의 길이가 ' + s + ' cm인 ' + name + '의 둘레는 몇 cm일까요?',
            fig: { type: 'polygon', points: reg(n, 5), sides: sides, alt: '한 변이 ' + s + ' cm인 ' + name },
            answer: String(s * n),
            wrong: [
              { a: String(s * (n - 1)), why: '변 하나를 빠뜨리고 더했어요. ' + name + '은 변이 ' + n + '개예요.' },
              { a: String(s * s), why: '한 변의 길이끼리 곱했어요. 둘레는 변의 길이를 모두 더해요.' },
            ].filter(function (w) { return Number(w.a) !== s * n; }),
            explain: name + R.josa(name, '은/는') + ' 변이 ' + n + '개이고 길이가 모두 같아요. $' + s + '\\times' + n + '=' + (s * n) + '$이므로 둘레는 ' + (s * n) + ' cm예요.',
          };
        }
        if (kind === 3) {
          var m = R.int(3, 15);
          var wr = [{ a: String(m * 2), why: '변을 2개만 더했어요. 마름모는 변이 4개이고 길이가 모두 같아요.' }];
          if (m !== 4) wr.push({ a: String(m * m), why: '한 변의 길이끼리 곱했어요. 둘레는 변의 길이를 모두 더해요.' });
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 0,
            q: '한 변의 길이가 ' + m + ' cm인 마름모의 둘레는 몇 cm일까요?',
            fig: { type: 'polygon', points: [[0, 3], [4, 0], [8, 3], [4, 6]], sides: [m + ' cm', null, null, null], alt: '한 변이 ' + m + ' cm인 마름모' },
            answer: String(4 * m),
            wrong: wr,
            explain: '마름모는 네 변의 길이가 모두 같아요. $' + m + '\\times4=' + (4 * m) + '$이므로 둘레는 ' + (4 * m) + ' cm예요.',
          };
        }
        var a = R.int(5, 20), b = R.int(2, a - 1), P = (a + b) * 2;
        var isRect = kind === 1, shape = isRect ? '직사각형' : '평행사변형';
        var fig = isRect
          ? { type: 'polygon', points: [[0, 0], [a, 0], [a, b], [0, b]], sides: [a + ' cm', b + ' cm', null, null], alt: '가로 ' + a + ' cm, 세로 ' + b + ' cm인 직사각형' }
          : { type: 'polygon', points: [[0, 0], [a, 0], [a + b * 6 / 10, b * 8 / 10], [b * 6 / 10, b * 8 / 10]], sides: [a + ' cm', b + ' cm', null, null], alt: '이웃한 두 변이 ' + a + ' cm, ' + b + ' cm인 평행사변형' };
        var wrongs = [{ a: String(a + b), why: '두 변을 한 번씩만 더했어요. ' + shape + '에는 같은 길이의 변이 2개씩 있어요.' }];
        if (a * b !== P) wrongs.push({ a: String(a * b), why: '두 변의 길이를 곱했어요. 그것은 둘레가 아니에요. 변의 길이를 모두 더해요.' });
        return {
          type: 'short', check: 'number', unit: 'cm', concept: 0,
          q: isRect
            ? '가로가 ' + a + ' cm, 세로가 ' + b + ' cm인 직사각형의 둘레는 몇 cm일까요?'
            : '이웃한 두 변의 길이가 ' + a + ' cm, ' + b + ' cm인 평행사변형의 둘레는 몇 cm일까요?',
          fig: fig,
          answer: String(P),
          wrong: wrongs,
          explain: (isRect ? '직사각형은 가로와 세로가 2개씩 있어요.' : '평행사변형은 마주 보는 두 변의 길이가 같아요.') +
            ' $(' + a + '+' + b + ')\\times2=' + P + '$이므로 둘레는 ' + P + ' cm예요.',
        };
      },
    },
    {
      id: 'area-basic',
      level: 1,
      title: '직사각형·정사각형·평행사변형·삼각형의 넓이',
      make: function (R) {
        var kind = R.int(0, 3);
        if (kind === 0) {
          var a = R.int(4, 20), b = R.int(2, a - 1), A = a * b;
          var wr = [{ a: String(a + b), why: '가로와 세로를 더했어요. 넓이는 가로와 세로를 곱해요.' }];
          if ((a + b) * 2 !== A) wr.push({ a: String((a + b) * 2), why: '둘레를 구했어요. 넓이는 가로와 세로를 곱해요.' });
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 2,
            q: '가로가 ' + a + ' cm, 세로가 ' + b + ' cm인 직사각형의 넓이는 몇 cm²일까요?',
            fig: { type: 'polygon', points: [[0, 0], [a, 0], [a, b], [0, b]], sides: [a + ' cm', b + ' cm', null, null], alt: '가로 ' + a + ' cm, 세로 ' + b + ' cm인 직사각형' },
            answer: String(A),
            wrong: wr,
            explain: '(직사각형의 넓이) = (가로) × (세로) = $' + a + '\\times' + b + '=' + A + '$, 곧 ' + A + ' cm²예요.',
          };
        }
        if (kind === 1) {
          var s = R.int(3, 15), S = s * s;
          var ws = [{ a: String(s * 2), why: '한 변을 두 번 더했어요. 넓이는 한 변과 한 변을 곱해요.' }];
          if (s !== 4) ws.push({ a: String(s * 4), why: '둘레를 구했어요. 넓이는 한 변과 한 변을 곱해요.' });
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 2,
            q: '한 변이 ' + s + ' cm인 정사각형의 넓이는 몇 cm²일까요?',
            fig: { type: 'polygon', points: [[0, 0], [5, 0], [5, 5], [0, 5]], sides: [s + ' cm', null, null, null], alt: '한 변이 ' + s + ' cm인 정사각형' },
            answer: String(S),
            wrong: ws,
            explain: '(정사각형의 넓이) = (한 변) × (한 변) = $' + s + '\\times' + s + '=' + S + '$, 곧 ' + S + ' cm²예요.',
          };
        }
        if (kind === 2) {
          // 옆 변·높이·밀린 거리가 모두 자연수가 되게 (직각삼각형 3·4·5 꼴)
          var tri = R.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [9, 12, 15], [12, 9, 15]]);
          var off = tri[0], h = tri[1], side = tri[2], base = R.int(side + 1, side + 10), P = base * h;
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 3,
            q: '그림과 같은 평행사변형의 넓이는 몇 cm²일까요?',
            fig: { type: 'polygon', points: [[0, 0], [base, 0], [base + off, h], [off, h]], sides: [base + ' cm', side + ' cm', null, null], segments: [{ from: [off, h], to: [off, 0], dashed: true, right: true, label: h + ' cm' }], alt: '밑변 ' + base + ' cm, 옆 변 ' + side + ' cm인 평행사변형에 높이 ' + h + ' cm를 점선으로 나타낸 그림' },
            answer: String(P),
            wrong: [
              { a: String(base * side), why: '밑변과 비스듬한 옆 변을 곱했어요. 높이는 밑변과 수직인 점선의 길이예요.' },
              { a: String((base + side) * 2), why: '둘레를 구했어요. 넓이는 밑변과 높이를 곱해요.' },
            ].filter(function (w) { return Number(w.a) !== P; }),
            explain: '(평행사변형의 넓이) = (밑변) × (높이) = $' + base + '\\times' + h + '=' + P + '$, 곧 ' + P + ' cm²예요. 옆 변 ' + side + ' cm는 높이가 아니에요.',
          };
        }
        var bb = R.int(4, 20), hh = R.int(3, 16);
        if ((bb * hh) % 2 === 1) hh += 1; // 넓이가 자연수가 되게
        var x = R.int(1, bb - 1), T = bb * hh / 2;
        return {
          type: 'short', check: 'number', unit: 'cm²', concept: 4,
          q: '밑변이 ' + bb + ' cm, 높이가 ' + hh + ' cm인 삼각형의 넓이는 몇 cm²일까요?',
          fig: { type: 'polygon', points: [[0, 0], [bb, 0], [x, hh]], sides: [bb + ' cm', null, null], segments: [{ from: [x, hh], to: [x, 0], dashed: true, right: true, label: hh + ' cm' }], alt: '밑변 ' + bb + ' cm, 높이 ' + hh + ' cm인 삼각형' },
          answer: String(T),
          wrong: [{ a: String(bb * hh), why: '2로 나누는 것을 빠뜨렸어요. 삼각형은 밑변과 높이가 같은 평행사변형의 반이에요.' }],
          explain: '(삼각형의 넓이) = (밑변) × (높이) ÷ 2 = $' + bb + '\\times' + hh + '\\div2=' + T + '$, 곧 ' + T + ' cm²예요.',
        };
      },
    },
    {
      id: 'area-rhombus-trapezoid',
      level: 2,
      title: '마름모와 사다리꼴의 넓이',
      make: function (R) {
        if (R.bool()) {
          var d1 = 2 * R.int(2, 10), d2 = R.int(3, 18); // 한 대각선을 짝수로: 넓이가 자연수
          if (d1 === d2) d2 += 1;
          var M = d1 * d2 / 2;
          var wr = [{ a: String(d1 * d2), why: '2로 나누는 것을 빠뜨렸어요. 마름모는 두 대각선을 가로·세로로 하는 직사각형의 반이에요.' }];
          if (d1 + d2 !== M) wr.push({ a: String(d1 + d2), why: '두 대각선을 더했어요. 두 대각선을 곱한 뒤 2로 나눠요.' });
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 5,
            q: '두 대각선의 길이가 ' + d1 + ' cm, ' + d2 + ' cm인 마름모의 넓이는 몇 cm²일까요?',
            fig: { type: 'polygon', points: [[0, d2 / 2], [d1 / 2, 0], [d1, d2 / 2], [d1 / 2, d2]], segments: [{ from: [0, d2 / 2], to: [d1, d2 / 2], dashed: true, label: d1 + ' cm' }, { from: [d1 / 2, 0], to: [d1 / 2, d2], dashed: true, label: d2 + ' cm' }], alt: '두 대각선이 ' + d1 + ' cm, ' + d2 + ' cm인 마름모' },
            answer: String(M),
            wrong: wr,
            explain: '(마름모의 넓이) = (한 대각선) × (다른 대각선) ÷ 2 = $' + d1 + '\\times' + d2 + '\\div2=' + M + '$, 곧 ' + M + ' cm²예요.',
          };
        }
        var top = R.int(2, 12), bot = R.int(top + 2, top + 10), h = R.int(3, 12);
        if (((top + bot) * h) % 2 === 1) h += 1;
        var off = R.int(1, bot - top - 1), Z = (top + bot) * h / 2;
        var wz = [{ a: String((top + bot) * h), why: '2로 나누는 것을 빠뜨렸어요. 사다리꼴 2개를 붙인 평행사변형의 반이에요.' }];
        if (bot * h !== Z) wz.push({ a: String(bot * h), why: '아랫변만 높이와 곱했어요. 윗변과 아랫변을 더한 뒤 높이를 곱하고 2로 나눠요.' });
        return {
          type: 'short', check: 'number', unit: 'cm²', concept: 5,
          q: '윗변이 ' + top + ' cm, 아랫변이 ' + bot + ' cm, 높이가 ' + h + ' cm인 사다리꼴의 넓이는 몇 cm²일까요?',
          fig: { type: 'polygon', points: [[0, 0], [bot, 0], [off + top, h], [off, h]], sides: [bot + ' cm', null, top + ' cm', null], segments: [{ from: [off, h], to: [off, 0], dashed: true, right: true, label: h + ' cm' }], alt: '윗변 ' + top + ' cm, 아랫변 ' + bot + ' cm, 높이 ' + h + ' cm인 사다리꼴' },
          answer: String(Z),
          hint: '윗변과 아랫변을 먼저 더해 보세요.',
          wrong: wz,
          explain: '((윗변) + (아랫변)) × (높이) ÷ 2 = $(' + top + '+' + bot + ')\\times' + h + '\\div2=' + Z + '$, 곧 ' + Z + ' cm²예요.',
        };
      },
    },
    {
      id: 'find-length',
      level: 3,
      title: '넓이로 높이·밑변 구하기',
      make: function (R) {
        var kind = R.int(0, 2);
        if (kind === 0) {
          var b = R.int(4, 16), h = R.int(3, 14);
          if ((b * h) % 2 === 1) h += 1;
          var A = b * h / 2;
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 4,
            q: '넓이가 ' + A + ' cm²이고 밑변이 ' + b + ' cm인 삼각형의 높이는 몇 cm일까요?',
            answer: String(h),
            hint: '(밑변) × (높이) ÷ 2 = (넓이)예요. 거꾸로 생각해 보세요.',
            wrong: [{ a: R.fmt.dec(A / b, 3), why: '2로 나눈 것을 되돌리지 않았어요. 먼저 넓이에 2를 곱해 (밑변) × (높이)를 구해요.' }],
            explain: '(밑변) × (높이) = $' + A + '\\times2=' + (A * 2) + '$' + R.josa(A * 2, '이에요/예요') + '. 밑변이 ' + b + ' cm이므로 높이는 $' + (A * 2) + '\\div' + b + '=' + h + '$ (cm)예요.',
          };
        }
        if (kind === 1) {
          var pb = R.int(4, 16), ph = R.int(3, 14), PA = pb * ph;
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 3,
            q: '넓이가 ' + PA + ' cm²이고 높이가 ' + ph + ' cm인 평행사변형의 밑변은 몇 cm일까요?',
            answer: String(pb),
            hint: '(밑변) × (높이) = (넓이)예요. 거꾸로 생각해 보세요.',
            wrong: [{ a: String(pb * 2), why: '삼각형처럼 넓이에 2를 곱했어요. 평행사변형의 넓이는 (밑변) × (높이)라서 2를 곱하지 않아요.' }],
            explain: '(밑변) × ' + ph + ' = ' + PA + '이므로 밑변은 $' + PA + '\\div' + ph + '=' + pb + '$ (cm)예요.',
          };
        }
        var top = R.int(2, 12), bot = R.int(top + 1, top + 12), th = R.int(2, 12);
        if (((top + bot) * th) % 2 === 1) th += 1;
        var Z = (top + bot) * th / 2;
        return {
          type: 'short', check: 'number', unit: 'cm', concept: 5,
          q: '넓이가 ' + Z + ' cm²인 사다리꼴이 있어요. 윗변이 ' + top + ' cm, 높이가 ' + th + ' cm라면 아랫변은 몇 cm일까요?',
          answer: String(bot),
          hint: '(윗변 + 아랫변) × (높이) ÷ 2 = (넓이)예요. 거꾸로 계산해 보세요.',
          wrong: [{ a: String(top + bot), why: '윗변과 아랫변의 합까지만 구했어요. 합에서 윗변을 빼요.' }],
          explain: '(윗변 + 아랫변) × ' + th + ' = $' + Z + '\\times2=' + (Z * 2) + '$' + R.josa(Z * 2, '이에요/예요') + '. ' +
            '그러면 (윗변 + 아랫변) = $' + (Z * 2) + '\\div' + th + '=' + (top + bot) + '$' + R.josa(top + bot, '이에요/예요') + '. 아랫변은 $' + (top + bot) + '-' + top + '=' + bot + '$ (cm)예요.',
        };
      },
    },
  ],
});
