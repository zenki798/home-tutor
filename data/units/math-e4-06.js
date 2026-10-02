/* 4학년 수학 · 규칙 찾기 */
Tutor.registerUnit({
  id: 'math-e4-06',
  course: 'math-e4',
  title: '규칙 찾기',
  summary: '수와 도형, 계산식의 배열에서 규칙을 찾아 수나 식으로 나타내고, 등호(=)로 크기가 같은 두 양을 식으로 나타내요.',
  goals: [
    '수의 배열과 수 배열표에서 규칙을 찾아 빈칸의 수를 구할 수 있어요.',
    '도형의 배열에서 규칙을 찾아 다음에 올 모양의 개수를 수나 식으로 나타낼 수 있어요.',
    '계산식의 배열에서 규칙을 찾아 다음 계산식과 그 결과를 추측할 수 있어요.',
    '등호(=)를 써서 크기가 같은 두 양을 식으로 나타낼 수 있어요.',
  ],
  standards: ['[4수02-01]', '[4수02-02]', '[4수02-03]'],

  concepts: [
    {
      title: '수의 배열에서 규칙 찾기',
      body: '수가 늘어선 모양을 **수의 배열**이라고 해요. 이웃한 두 수를 비교하면 규칙을 찾을 수 있어요.\n\n- 3250, 3350, 3450, 3550 → **100씩 커지는** 규칙\n- 2, 6, 18, 54 → **3씩 곱하는** 규칙\n\n수를 표로 늘어놓은 **수 배열표**에서는 가로(→), 세로(↓), 대각선(↘) 방향을 각각 살펴봐요.\n\n| 1001 | 1101 | 1201 | 1301 |\n|---|---|---|---|\n| 2001 | 2101 | 2201 | 2301 |\n| 3001 | 3101 | 3201 | 3301 |\n\n이 표에서 오른쪽으로 갈수록 100씩, 아래로 갈수록 1000씩, ↘ 방향으로는 1100씩 커져요.\n\n> 💡 규칙을 찾으면 앞의 몇 개만이 아니라 **모든 이웃한 수**에 맞는지 확인해요.',
      easy: '계단을 오른다고 생각해 보세요. 한 계단 오를 때마다 높이가 똑같이 올라가면 "같은 수씩 커지는" 규칙이에요.\n\n이웃한 두 수의 차이를 하나씩 적어 보세요. 차이가 모두 같으면 그 수만큼씩 커지거나 작아지는 거예요. 차이가 점점 커지면 곱하는 규칙인지 확인해 봐요(2배, 3배 …).',
      check: {
        type: 'choice',
        q: '규칙에 따라 빈칸에 알맞은 수를 고르세요.\n\n5, 10, 20, 40, [[?]]',
        choices: ['80', '45', '60'],
        answer: 0,
        why: ['', '5씩 커지는 규칙이 아니에요. 5에서 10, 10에서 20으로 커지는 양이 달라요.', '20씩 커지는 규칙이 아니에요. 이웃한 수를 나누어 보면 2배씩 커져요.'],
        explain: '5, 10, 20, 40은 앞의 수에 2를 곱한 수예요. 그래서 $40 \\times 2=80$이에요.',
      },
    },
    {
      title: '도형의 배열에서 규칙 찾기',
      body: '도형이 놓인 모양에서도 규칙을 찾을 수 있어요. 그림에서 사각형의 수를 세어 보면 1개, 3개, 5개, 7개예요.\n\n- 위쪽에 1개, 오른쪽에 1개, 모두 **2개씩 늘어나는** 규칙이에요.\n- 식으로 나타내면 첫째 $1$, 둘째 $1+2$, 셋째 $1+2+2$, 넷째 $1+2+2+2$예요.\n\n그래서 다음 다섯째에는 $7+2=9$(개)가 놓여요.\n\n> 💡 도형의 배열은 "몇 개씩 늘어나는지"와 "어느 쪽으로 늘어나는지"를 함께 살펴봐요.',
      easy: '블록을 쌓는 친구를 떠올려 보세요. 단계마다 위에 하나, 오른쪽에 하나를 더 붙여요.\n\n그러면 한 단계마다 블록이 2개씩 늘어나요. 1개 → 3개 → 5개 → 7개 → 9개 …',
      fig: { type: 'svg', alt: '사각형이 첫째 1개, 둘째 3개, 셋째 5개, 넷째 7개로 ㄴ자 모양으로 늘어나는 그림', svg: '<svg viewBox="0 0 266 104" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><text x="18" y="98" font-size="13" text-anchor="middle" fill="currentColor">첫째</text><rect x="50" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="50" y="48" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="66" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><text x="66" y="98" font-size="13" text-anchor="middle" fill="currentColor">둘째</text><rect x="106" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="106" y="48" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="122" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="106" y="32" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="138" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><text x="130" y="98" font-size="13" text-anchor="middle" fill="currentColor">셋째</text><rect x="178" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="178" y="48" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="194" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="178" y="32" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="210" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="178" y="16" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="226" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><text x="210" y="98" font-size="13" text-anchor="middle" fill="currentColor">넷째</text></svg>' },
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '바둑돌을 첫째 2개, 둘째 5개, 셋째 8개, 넷째 11개로 놓았어요. 같은 규칙으로 다섯째에는 바둑돌을 몇 개 놓을까요?',
        answer: '14',
        wrong: [{ a: '13', why: '2개씩 늘어난다고 생각했어요. 2, 5, 8, 11은 3개씩 늘어나요.' }],
        explain: '바둑돌이 3개씩 늘어나는 규칙이에요. 다섯째에는 $11+3=14$(개)를 놓아요.',
      },
    },
    {
      title: '계산식의 배열에서 규칙 찾기',
      body: '계산식을 차례로 늘어놓으면 계산하지 않고도 결과를 짐작할 수 있어요.\n\n| 순서 | 덧셈식 |\n|---|---|\n| 첫째 | $105+201=306$ |\n| 둘째 | $115+211=326$ |\n| 셋째 | $125+221=346$ |\n| 넷째 | $135+231=366$ |\n\n더하는 두 수가 각각 10씩 커지면 합은 20씩 커져요. 그래서 다섯째 식은 $145+241=386$이에요.\n\n곱셈식에서도 신기한 규칙이 있어요.\n\n$1 \\times 1=1$, $11 \\times 11=121$, $111 \\times 111=12321$, $1111 \\times 1111=1234321$\n\n1의 개수가 하나씩 늘어나면 결과는 가운데 수가 하나씩 커지며 양쪽이 똑같은 모양이 돼요.',
      easy: '계산식 배열은 "무엇이 바뀌고 무엇이 그대로인지"를 찾는 놀이예요.\n\n식을 위아래로 맞춰 놓고, 같은 자리의 수가 어떻게 변하는지 손가락으로 짚어 보세요. 바뀌는 수가 일정하게 바뀌면 결과도 일정하게 바뀌어요.',
      check: {
        type: 'choice',
        q: '규칙에 따라 다음에 올 계산식으로 알맞은 것을 고르세요.\n\n$1 \\times 1=1$\n$11 \\times 11=121$\n$111 \\times 111=12321$\n$1111 \\times 1111=1234321$',
        choices: ['$11111 \\times 11111=123454321$', '$11111 \\times 11111=1234554321$', '$11111 \\times 11111=12345321$'],
        answer: 0,
        why: ['', '가운데 5가 한 번만 나와요. 결과는 1부터 가운데 수까지 커졌다가 다시 1까지 작아져요.', '4가 한 번 빠졌어요. 1, 2, 3, 4, 5, 4, 3, 2, 1 순서예요.'],
        explain: '1이 5개인 수끼리 곱하면 결과는 1부터 5까지 커졌다가 다시 1까지 작아져요. $11111 \\times 11111=123454321$이에요.',
      },
    },
    {
      title: '등호(=)로 크기가 같은 두 양 나타내기',
      body: '**등호(=)**는 "계산한 답은" 이라는 뜻이 아니라 **양쪽의 크기가 같다**는 뜻이에요.\n\n- $5+3=4+4$ → 양쪽이 모두 8이므로 **옳은 식**이에요.\n- $3 \\times 4=6 \\times 2$ → 양쪽이 모두 12이므로 옳은 식이에요.\n- $9+1=5+4$ → 10과 9로 크기가 다르므로 **옳지 않은 식**이에요.\n\n한쪽 수가 커진 만큼 다른 쪽 수가 작아지면 크기가 같아요. $15+8=16+7$에서 15가 16으로 1 커지고 8이 7로 1 작아졌어요.\n\n> ⚠️ $5+3=8+2=10$처럼 쓰면 안 돼요. $5+3$과 $8+2$는 크기가 달라요.',
      easy: '등호는 **양팔 저울**이에요. 왼쪽 접시와 오른쪽 접시의 무게가 같을 때만 저울이 수평이 되지요.\n\n$5+3=4+4$는 왼쪽에 5와 3, 오른쪽에 4와 4를 올린 저울이에요. 양쪽 모두 8이라 수평이에요.',
      check: {
        type: 'ox',
        q: '$18+5=20+3$은 옳은 식이에요.',
        answer: true,
        explain: '왼쪽은 $18+5=23$, 오른쪽은 $20+3=23$으로 크기가 같아요. 18이 20으로 2 커지고 5가 3으로 2 작아졌어요.',
      },
    },
    {
      title: '생활 속 규칙 찾기',
      body: '우리 주변에도 규칙이 많아요. **달력**을 보세요.\n\n| 일 | 월 | 화 | 수 | 목 | 금 | 토 |\n|---|---|---|---|---|---|---|\n| | | 1 | 2 | 3 | 4 | 5 |\n| 6 | 7 | 8 | 9 | 10 | 11 | 12 |\n| 13 | 14 | 15 | 16 | 17 | 18 | 19 |\n\n- 오른쪽으로 갈수록 **1씩** 커져요.\n- 아래로 갈수록 **7씩** 커져요(일주일은 7일).\n- ↘ 방향으로는 8씩, ↙ 방향으로는 6씩 커져요.\n\n그래서 2일이 수요일이면 9일, 16일, 23일, 30일도 수요일이에요. 버스가 15분마다 출발하는 시간표, 공연장 좌석 번호에서도 규칙을 찾을 수 있어요.',
      easy: '이번 주 수요일과 다음 주 수요일 사이에는 며칠이 있을까요? 수, 목, 금, 토, 일, 월, 화 — 7일이 지나야 다시 수요일이 돼요.\n\n그래서 달력에서 바로 아래 칸의 날짜는 늘 7 큰 수예요.',
      check: {
        type: 'short', check: 'number', unit: '일',
        q: '어느 달의 3일이 화요일이에요. 같은 달에서 그다음 주 화요일은 며칠일까요?',
        answer: '10',
        wrong: [{ a: '4', why: '바로 다음 날을 구했어요. 같은 요일은 7일마다 돌아와요.' }],
        explain: '같은 요일은 7일마다 돌아와요. $3+7=10$이므로 10일이에요.',
      },
    },
  ],

  examples: [
    {
      q: '수 배열표의 규칙을 찾아 ★에 알맞은 수를 구하세요.\n\n| 2105 | 2205 | 2305 | 2405 |\n|---|---|---|---|\n| 3105 | 3205 | 3305 | 3405 |\n| 4105 | 4205 | ★ | 4405 |',
      steps: [
        '가로(→)로 보면 2105, 2205, 2305, …로 100씩 커져요.',
        '세로(↓)로 보면 2105, 3105, 4105로 1000씩 커져요.',
        '★은 4205의 오른쪽 칸이므로 $4205+100=4305$예요.',
        '세로로 확인하면 3305의 아래 칸이므로 $3305+1000=4305$로 같아요.',
      ],
      answer: '4305',
    },
    {
      q: '계산식의 규칙을 찾아 다섯째 계산식을 쓰세요.\n\n$100+500=600$\n$200+500=700$\n$300+500=800$\n$400+500=900$',
      steps: [
        '더해지는 수가 100씩 커지고 더하는 수 500은 그대로예요.',
        '그래서 합도 100씩 커져요: 600, 700, 800, 900',
        '다섯째에는 더해지는 수가 500, 합은 1000이에요.',
      ],
      answer: '$500+500=1000$',
    },
    {
      q: '빈칸에 알맞은 수를 구하세요.\n\n$27+15=30+[[?]]$',
      steps: [
        '등호는 양쪽의 크기가 같다는 뜻이에요.',
        '27이 30으로 3 커졌으니, 15는 3 작아져야 해요.',
        '$15-3=12$예요. 확인: $27+15=42$, $30+12=42$',
      ],
      answer: '12',
    },
  ],

  terms: [
    { term: '규칙', def: '수나 모양이 일정하게 바뀌거나 되풀이되는 방법이에요. 예: 2, 4, 6, 8은 2씩 커지는 규칙이에요.' },
    { term: '수의 배열', def: '수를 차례로 늘어놓은 것이에요. 이웃한 수를 비교하면 규칙을 찾을 수 있어요.' },
    { term: '수 배열표', def: '수를 가로와 세로로 늘어놓은 표예요. 가로, 세로, 대각선 방향의 규칙을 찾을 수 있어요.' },
    { term: '계산식의 배열', def: '계산식을 차례로 늘어놓은 것이에요. 바뀌는 수의 규칙을 보고 다음 식과 결과를 짐작할 수 있어요.' },
    { term: '등호(=)', def: '양쪽의 크기가 같다는 것을 나타내는 기호예요. 예: $5+3=4+4$' },
    { term: '옳은 식', def: '등호 양쪽의 크기가 같은 식이에요. 양쪽의 크기가 다르면 옳지 않은 식이에요.' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
      q: '규칙에 따라 빈칸에 알맞은 수를 구하세요.\n\n3250, 3350, 3450, [[?]], 3650',
      answer: '3550',
      wrong: [{ a: '3460', why: '10씩 커진다고 생각했어요. 백의 자리 수가 1씩 커지므로 100씩 커지는 규칙이에요.' }],
      explain: '백의 자리 수가 1씩 커지므로 100씩 커지는 규칙이에요. $3450+100=3550$이에요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '수 배열표에서 ↓ 방향(아래쪽)으로 갈수록 수가 어떻게 변할까요?\n\n| 5010 | 5020 | 5030 |\n|---|---|---|\n| 6010 | 6020 | 6030 |\n| 7010 | 7020 | 7030 |',
      choices: ['1000씩 커져요.', '10씩 커져요.', '100씩 커져요.', '1010씩 커져요.'],
      answer: 0,
      why: ['', '10씩 커지는 것은 → 방향(오른쪽)이에요.', '바뀌는 자리를 다시 보세요. 5010에서 6010은 천의 자리 수가 바뀌어요.', '1010씩 커지는 것은 ↘ 방향이에요.'],
      explain: '5010, 6010, 7010처럼 천의 자리 수가 1씩 커지므로 아래쪽으로 1000씩 커져요.',
    },
    {
      id: 'p3', level: 1, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '그림과 같은 규칙으로 사각형을 놓을 때, 여섯째에는 사각형을 몇 개 놓을까요?',
      fig: { type: 'svg', alt: '사각형이 첫째 1개, 둘째 3개, 셋째 5개, 넷째 7개로 ㄴ자 모양으로 늘어나는 그림', svg: '<svg viewBox="0 0 266 104" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><text x="18" y="98" font-size="13" text-anchor="middle" fill="currentColor">첫째</text><rect x="50" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="50" y="48" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="66" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><text x="66" y="98" font-size="13" text-anchor="middle" fill="currentColor">둘째</text><rect x="106" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="106" y="48" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="122" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="106" y="32" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="138" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><text x="130" y="98" font-size="13" text-anchor="middle" fill="currentColor">셋째</text><rect x="178" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="178" y="48" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="194" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="178" y="32" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="210" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="178" y="16" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><rect x="226" y="64" width="16" height="16" fill="var(--fig-1)" fill-opacity="0.5" stroke="currentColor"/><text x="210" y="98" font-size="13" text-anchor="middle" fill="currentColor">넷째</text></svg>' },
      answer: '11',
      wrong: [{ a: '9', why: '다섯째의 개수를 구했어요. 여섯째는 그보다 2개 더 많아요.' }],
      explain: '사각형이 1개, 3개, 5개, 7개로 2개씩 늘어나요. 다섯째는 $7+2=9$(개), 여섯째는 $9+2=11$(개)예요.',
    },
    {
      id: 'p4', level: 1, type: 'ox', concept: 3,
      q: '$4+5=9+1$은 옳은 식이에요.',
      answer: false,
      explain: '왼쪽은 $4+5=9$, 오른쪽은 $9+1=10$으로 크기가 달라요. 그래서 옳지 않은 식이에요. 바르게 쓰면 $4+5=9$ 또는 $4+5=8+1$처럼 써요.',
    },
    {
      id: 'p5', level: 1, type: 'short', check: 'number', concept: 3,
      q: '빈칸에 알맞은 수를 구하세요.\n\n$14+6=10+[[?]]$',
      answer: '10',
      wrong: [{ a: '20', why: '$14+6$의 계산 결과를 썼어요. 등호는 "답은"이 아니라 양쪽의 크기가 같다는 뜻이에요. $10+[[?]]$도 20이 되어야 해요.' }],
      explain: '왼쪽은 $14+6=20$이에요. $10+[[?]]=20$이 되려면 빈칸은 10이에요.',
    },
    {
      id: 'p6', level: 1, type: 'short', check: 'number', unit: '일', concept: 4,
      q: '달력에서 어떤 날짜의 바로 아래 칸에 있는 날짜는 18일이에요. 어떤 날짜는 며칠일까요?',
      answer: '11',
      wrong: [{ a: '25', why: '아래 칸을 구했어요. 18일은 아래 칸이므로 위 칸은 7 작은 수예요.' }],
      explain: '달력에서 아래로 한 칸 가면 7씩 커져요. 그래서 위 칸의 날짜는 $18-7=11$(일)이에요.',
    },
    {
      id: 'p7', level: 2, type: 'short', check: 'number', concept: 2,
      q: '계산식의 규칙을 찾아 빈칸에 알맞은 수를 구하세요.\n\n$9 \\times 12=108$\n$9 \\times 123=1107$\n$9 \\times 1234=11106$\n$9 \\times 12345=111105$\n$9 \\times 123456=[[?]]$',
      hint: '결과에서 1의 개수와 일의 자리 수가 어떻게 바뀌는지 보세요.',
      answer: '1111104',
      wrong: [{ a: '111104', why: '1의 개수를 하나 덜 썼어요. 결과의 1은 하나씩 늘어나요: 1개, 2개, 3개, 4개 다음은 5개예요.' }],
      explain: '결과의 앞쪽 1이 하나씩 늘어나고 일의 자리 수는 8, 7, 6, 5로 1씩 작아져요. 그래서 1이 5개, 일의 자리는 4인 $1111104$예요.',
    },
    {
      id: 'p8', level: 2, type: 'choice', concept: 2,
      q: '계산식의 규칙에 따라 다섯째에 올 계산식을 고르세요.\n\n$121 \\div 11=11$\n$242 \\div 22=11$\n$363 \\div 33=11$\n$484 \\div 44=11$',
      choices: ['$605 \\div 55=11$', '$505 \\div 55=11$', '$585 \\div 55=11$', '$606 \\div 55=11$'],
      answer: 0,
      hint: '나누어지는 수가 얼마씩 커지는지 보세요.',
      why: [
        '',
        '나누어지는 수는 121씩 커져요. $484+121$을 다시 계산해 보세요.',
        '나누어지는 수가 101씩 커진다고 생각했어요. 121, 242, 363, 484는 121씩 커져요.',
        '606은 $11 \\times 55$가 아니에요. 몫이 11이 되려면 나누어지는 수는 $55 \\times 11$이에요.',
      ],
      explain: '나누는 수는 11씩, 나누어지는 수는 121씩 커지고 몫은 11로 같아요. 다섯째는 $484+121=605$, $44+11=55$이므로 $605 \\div 55=11$이에요.',
    },
    {
      id: 'p9', level: 2, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '면봉으로 정사각형을 옆으로 이어 붙여요. 정사각형 1개를 만들 때 면봉 4개, 2개를 만들 때 7개, 3개를 만들 때 10개가 필요해요. 정사각형 6개를 이어 붙이려면 면봉이 몇 개 필요할까요?',
      hint: '정사각형을 하나 더 붙일 때마다 면봉이 몇 개 더 필요한지 보세요.',
      answer: '19',
      wrong: [{ a: '24', why: '정사각형마다 면봉 4개씩 따로 셌어요. 이어 붙이면 붙은 변을 함께 써서 3개씩만 더 필요해요.' }],
      explain: '정사각형을 하나 더 붙일 때마다 면봉이 3개씩 늘어나요. 4, 7, 10, 13, 16, 19이므로 정사각형 6개에는 19개가 필요해요.',
    },
    {
      id: 'p10', level: 2, type: 'choice', concept: 3,
      q: '**옳은** 식을 고르세요.',
      choices: ['$25+17=27+15$', '$30-8=32-6$', '$6 \\times 4=3 \\times 12$', '$40 \\div 8=20 \\div 2$'],
      answer: 0,
      hint: '등호 양쪽을 각각 계산해 크기를 비교해 보세요.',
      why: [
        '',
        '왼쪽은 22, 오른쪽은 26이에요. 빼어지는 수가 2 커지면 빼는 수도 2 커져야 같아요.',
        '왼쪽은 24, 오른쪽은 36이에요. 6을 반으로 줄였으면 4는 2배로 늘려야 해요.',
        '왼쪽은 5, 오른쪽은 10이에요. 크기가 달라요.',
      ],
      explain: '$25+17=42$, $27+15=42$로 양쪽 크기가 같아요. 25가 2 커진 만큼 17이 2 작아졌기 때문이에요.',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', concept: 0,
      q: '규칙에 따라 빈칸에 알맞은 수를 구하세요.\n\n1, 3, 9, 27, [[?]], 243',
      hint: '이웃한 두 수 사이에 어떤 수를 곱했는지 보세요.',
      answer: '81',
      wrong: [{ a: '45', why: '차이(2, 6, 18)가 늘어나는 것만 보고 18을 더했어요. 이웃한 수는 3배씩 커져요.' }],
      explain: '앞의 수에 3을 곱하는 규칙이에요. $27 \\times 3=81$, 그리고 $81 \\times 3=243$으로 맞아요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', concept: 3,
      q: '빈칸에 알맞은 수를 구하세요.\n\n$48-[[?]]=50-27$',
      hint: '빼어지는 수가 48에서 50으로 바뀌었어요. 차가 같으려면 빼는 수는 어떻게 되어야 할까요?',
      answer: '25',
      wrong: [
        { a: '29', why: '덧셈처럼 생각해 반대로 바꿨어요. 뺄셈에서는 빼어지는 수가 2 작아지면 빼는 수도 2 작아져야 차가 같아요.' },
        { a: '23', why: '$50-27$의 결과를 썼어요. 빈칸은 48에서 빼는 수예요.' },
      ],
      explain: '오른쪽은 $50-27=23$이에요. $48-[[?]]=23$이 되려면 빈칸은 $48-23=25$예요. 빼어지는 수가 2 작아진 만큼 빼는 수도 2 작아졌어요.',
    },
    {
      id: 'a2', level: 3, type: 'short', check: 'number', unit: '개', concept: 1,
      q: '점을 삼각형 모양으로 놓아요. 첫째 1개, 둘째 3개, 셋째 6개, 넷째 10개예요. 같은 규칙으로 여섯째에는 점을 몇 개 놓을까요?',
      hint: '늘어나는 개수를 적어 보세요: 2개, 3개, 4개, …',
      answer: '21',
      wrong: [
        { a: '15', why: '다섯째의 개수를 구했어요. 여섯째에는 6개가 더 늘어나요.' },
        { a: '18', why: '4개씩 늘어난다고 생각했어요. 늘어나는 개수가 2, 3, 4, …로 하나씩 커져요.' },
      ],
      explain: '늘어나는 점의 수가 2, 3, 4로 하나씩 커져요. 다섯째는 $10+5=15$(개), 여섯째는 $15+6=21$(개)예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', concept: 2,
      q: '계산식의 규칙을 찾아 마지막 식의 결과를 구하세요.\n\n$1+3=4$\n$1+3+5=9$\n$1+3+5+7=16$\n$1+3+5+7+9=25$\n$\\vdots$\n$1+3+5+ \\cdots +19=[[?]]$',
      hint: '더하는 수의 개수와 결과를 비교해 보세요. 4는 $2 \\times 2$, 9는 $3 \\times 3$이에요.',
      answer: '100',
      wrong: [{ a: '81', why: '더하는 수의 개수를 9개로 셌어요. 1, 3, 5, …, 19는 10개예요.' }],
      explain: '더하는 홀수가 2개면 $2 \\times 2$, 3개면 $3 \\times 3$, 4개면 $4 \\times 4$예요. 1부터 19까지의 홀수는 1, 3, 5, 7, 9, 11, 13, 15, 17, 19로 10개이므로 결과는 $10 \\times 10=100$이에요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 4,
      q: '첫 버스가 오전 6시 10분에 출발하고, 그 뒤로 25분마다 한 대씩 출발해요. 다섯째 버스가 출발하는 시각은 언제일까요?',
      choices: ['오전 7시 50분', '오전 8시 15분', '오전 7시 25분', '오전 8시 5분'],
      answer: 0,
      hint: '첫째부터 차례로 25분씩 더해 보세요.',
      why: [
        '',
        '여섯째 버스의 시각이에요. 첫째 버스부터 세어 보세요.',
        '넷째 버스의 시각이에요. 한 번 더 25분을 더해요.',
        '60분이 1시간인 것을 다시 확인해 보세요. 7시 25분에서 25분 뒤는 7시 50분이에요.',
      ],
      explain: '6시 10분 → 6시 35분 → 7시 → 7시 25분 → 7시 50분이에요. 다섯째 버스는 오전 7시 50분에 출발해요.',
    },
  ],

  deeper: [
    {
      title: '등호는 양팔 저울',
      body: '많은 학생이 등호(=)를 "계산하면 나오는 답"이라고 생각해요. 그래서 $14+6=[[?]]+5$에 20을 쓰기도 해요.\n\n하지만 등호는 **양쪽이 같다**는 약속이에요. 저울 양쪽에 같은 무게를 더하거나 빼도 수평은 그대로이지요. 이 생각은 중학교에서 배우는 **방정식**의 바탕이 돼요.\n\n한쪽 수를 키운 만큼 다른 수를 줄이면 덧셈 결과가 같다는 것도 기억해 두면 계산이 빨라져요. $98+37=100+35=135$',
    },
    {
      title: '5학년의 대응 관계로',
      body: '이번 단원에서는 "다음에 몇 개가 올까?"를 하나씩 이어 가며 찾았어요.\n\n5학년 **대응 관계**에서는 "순서와 개수 사이"의 관계를 찾아요. 예를 들어 면봉 정사각형에서 정사각형의 수와 면봉의 수가 어떻게 짝지어지는지 표로 정리하면, 100번째처럼 먼 순서도 빨리 구할 수 있어요.',
    },
  ],

  faq: [
    {
      q: '규칙이 여러 가지로 보이면 어떻게 해요?',
      a: '주어진 모든 수(또는 모양)에 맞는 규칙인지 확인해요. 앞의 두 수에만 맞는 규칙은 진짜 규칙이 아니에요.\n\n예를 들어 2, 4, 8, 16은 "2씩 커진다"가 아니라 "2배씩 커진다"예요. 4에서 8로는 4가 커졌으니까요.',
    },
    {
      q: '$5+3=8+2=10$이라고 쓰면 왜 틀려요?',
      a: '등호는 양쪽이 같다는 뜻이라서 $5+3$과 $8+2$가 같다는 말이 돼요. 그런데 $5+3=8$, $8+2=10$으로 크기가 달라요.\n\n계산을 이어서 쓰고 싶으면 $5+3=8$, $8+2=10$처럼 두 식으로 나누어 써요.',
    },
    {
      q: '계산식의 배열은 꼭 계산해 봐야 해요?',
      a: '규칙을 찾으면 계산하지 않고도 결과를 짐작할 수 있어요. 하지만 짐작한 답이 맞는지 한두 개는 직접 계산해 확인하는 습관이 좋아요.',
    },
  ],

  mistakes: [
    '등호를 "답은"으로 생각해 $14+6=[[?]]+5$의 빈칸에 20을 쓰는 실수 — 양쪽 크기가 같도록 15를 써야 해요.',
    '앞의 두 수만 보고 규칙을 정하는 실수 — 모든 이웃한 수에 그 규칙이 맞는지 확인해요.',
    '수 배열표에서 가로와 세로의 규칙을 바꾸어 쓰는 실수 — 방향마다 어느 자리의 수가 바뀌는지 따로 살펴요.',
  ],

  gens: [
    {
      id: 'next-term',
      level: 1,
      title: '같은 수씩 커지거나 작아지는 수의 배열',
      make: function (R) {
        var d = R.pick([2, 3, 4, 5, 10, 20, 50, 100, 200, 500, 1000]);
        var up = R.bool(0.6);
        var start;
        if (d >= 100) start = R.int(11, 89) * 100 + R.int(0, 9) * 10 + R.int(0, 9);
        else if (d >= 10) start = R.int(10, 90) * 10 + R.int(0, 9);
        else start = R.int(10, 80);
        if (!up) start += 5 * d;
        var seq = [];
        for (var i = 0; i < 5; i++) seq.push(up ? start + i * d : start - i * d);
        var k = R.int(1, 4);
        var ans = seq[k];
        var shown = seq.map(function (v, j) { return j === k ? '[[?]]' : String(v); });
        var prev = seq[k - 1];
        var wrong = [];
        var other = up ? prev - d : prev + d; // 커지는지 작아지는지 거꾸로 본 답
        if (other !== ans && other > 0) wrong.push({ a: String(other), why: up ? '수가 작아진다고 생각했어요. 이웃한 수를 비교하면 ' + d + '씩 커져요.' : '수가 커진다고 생각했어요. 이웃한 수를 비교하면 ' + d + '씩 작아져요.' });
        if (d >= 10) {
          var small = up ? prev + d / 10 : prev - d / 10;
          if (small !== ans && small > 0 && small !== other) wrong.push({ a: String(small), why: '바뀌는 자리를 잘못 봤어요. ' + d + '씩 ' + (up ? '커지는' : '작아지는') + ' 규칙이에요.' });
        }
        return {
          type: 'short', check: 'number', concept: 0,
          q: '규칙에 따라 빈칸에 알맞은 수를 구하세요.\n\n' + shown.join(', '),
          answer: String(ans),
          wrong: wrong,
          explain: '이웃한 수를 비교하면 ' + d + '씩 ' + (up ? '커지는' : '작아지는') + ' 규칙이에요. ' + (k === 0 ? '' : '$' + prev + (up ? '+' : '-') + d + '=' + ans + '$이므로 ') + '빈칸의 수는 ' + ans + R.josa(ans, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'equal-sign',
      level: 1,
      title: '등호 양쪽의 크기가 같게 빈칸 채우기',
      make: function (R) {
        var kind = R.pick(['add', 'add', 'sub', 'mul']);
        var q, ans, lhsVal, explain, wrong = [];
        if (kind === 'add') {
          var a = R.int(12, 89), b = R.int(3, 39);
          var c = a + R.pick([-3, -2, -1, 1, 2, 3, 5, 10]);
          if (c <= 0) c = a + 2;
          ans = a + b - c;
          if (ans <= 0) { c = a + 1; ans = b - 1; }
          lhsVal = a + b;
          q = '$' + a + '+' + b + '=' + c + '+[[?]]$';
          explain = '왼쪽은 $' + a + '+' + b + '=' + lhsVal + '$' + R.josa(lhsVal, '이에요/예요') + '. $' + c + '+[[?]]=' + lhsVal + '$' + R.josa(lhsVal, '이/가') + ' 되려면 빈칸은 $' + lhsVal + '-' + c + '=' + ans + '$' + R.josa(ans, '이에요/예요') + '.';
          wrong.push({ a: String(lhsVal), why: '$' + a + '+' + b + '$의 계산 결과를 썼어요. 등호는 양쪽의 크기가 같다는 뜻이에요. 오른쪽 $' + c + '+[[?]]$도 ' + lhsVal + R.josa(lhsVal, '이/가') + ' 되어야 해요.' });
          var flip = b + (c - a); // 바꾼 방향을 거꾸로 생각한 답
          if (flip !== ans && flip > 0 && flip !== lhsVal) wrong.push({ a: String(flip), why: '한쪽 수가 커진 만큼 다른 쪽 수는 작아져야 해요(덧셈). 반대로 바꿨어요.' });
        } else if (kind === 'sub') {
          var a2 = R.int(30, 99), b2 = R.int(5, 25);
          var c2 = a2 + R.pick([-3, -2, -1, 1, 2, 3, 10]);
          ans = c2 - (a2 - b2);
          lhsVal = a2 - b2;
          q = '$' + a2 + '-' + b2 + '=' + c2 + '-[[?]]$';
          explain = '왼쪽은 $' + a2 + '-' + b2 + '=' + lhsVal + '$' + R.josa(lhsVal, '이에요/예요') + '. $' + c2 + '-[[?]]=' + lhsVal + '$' + R.josa(lhsVal, '이/가') + ' 되려면 빈칸은 $' + c2 + '-' + lhsVal + '=' + ans + '$' + R.josa(ans, '이에요/예요') + '.';
          if (lhsVal !== ans) wrong.push({ a: String(lhsVal), why: '$' + a2 + '-' + b2 + '$의 계산 결과를 썼어요. 오른쪽 $' + c2 + '-[[?]]$도 ' + lhsVal + R.josa(lhsVal, '이/가') + ' 되어야 해요.' });
          var flip2 = b2 - (c2 - a2);
          if (flip2 !== ans && flip2 > 0 && flip2 !== lhsVal) wrong.push({ a: String(flip2), why: '뺄셈에서는 빼어지는 수가 커진 만큼 빼는 수도 커져야 차가 같아요. 반대로 바꿨어요.' });
        } else {
          var pairs = [[2, 12, 4, 6], [3, 8, 6, 4], [4, 6, 8, 3], [2, 9, 6, 3], [5, 6, 10, 3], [3, 10, 6, 5], [4, 10, 8, 5], [2, 14, 4, 7], [6, 4, 3, 8], [5, 8, 10, 4], [3, 12, 9, 4], [4, 9, 6, 6], [2, 15, 6, 5], [8, 5, 4, 10], [7, 6, 14, 3]];
          var p = R.pick(pairs);
          ans = p[3];
          lhsVal = p[0] * p[1];
          q = '$' + p[0] + ' \\times ' + p[1] + '=' + p[2] + ' \\times [[?]]$';
          explain = '왼쪽은 $' + p[0] + ' \\times ' + p[1] + '=' + lhsVal + '$' + R.josa(lhsVal, '이에요/예요') + '. $' + p[2] + ' \\times [[?]]=' + lhsVal + '$' + R.josa(lhsVal, '이/가') + ' 되려면 빈칸은 $' + lhsVal + ' \\div ' + p[2] + '=' + ans + '$' + R.josa(ans, '이에요/예요') + '.';
          wrong.push({ a: String(lhsVal), why: '$' + p[0] + ' \\times ' + p[1] + '$의 계산 결과를 썼어요. 오른쪽 $' + p[2] + ' \\times [[?]]$도 ' + lhsVal + R.josa(lhsVal, '이/가') + ' 되어야 해요.' });
        }
        return {
          type: 'short', check: 'number', concept: 3,
          q: '등호(=)의 양쪽 크기가 같도록 빈칸에 알맞은 수를 구하세요.\n\n' + q,
          answer: String(ans),
          wrong: wrong,
          explain: explain,
        };
      },
    },
    {
      id: 'mul-pattern',
      level: 2,
      title: '곱하는 규칙의 수의 배열',
      make: function (R) {
        var r = R.pick([2, 3, 4, 5]);
        var a = r === 2 ? R.int(1, 12) : r === 3 ? R.int(1, 6) : R.int(1, 3);
        var seq = [a, a * r, a * r * r, a * r * r * r];
        var next = seq[3] * r;
        var addWrong = seq[3] + (seq[3] - seq[2]);
        var wrong = [];
        if (addWrong !== next) wrong.push({ a: String(addWrong), why: '마지막 두 수의 차(' + (seq[3] - seq[2]) + ')만큼 더했어요. 이웃한 수의 차가 계속 달라지므로 같은 수씩 커지는 규칙이 아니에요. 몇 배인지 보세요.' });
        return {
          type: 'short', check: 'number', concept: 0,
          q: '규칙에 따라 빈칸에 알맞은 수를 구하세요.\n\n' + seq.join(', ') + ', [[?]]',
          hint: '이웃한 두 수 사이에 어떤 수를 곱했는지 보세요.',
          answer: String(next),
          wrong: wrong,
          explain: '앞의 수에 ' + r + R.josa(r, '을/를') + ' 곱하는 규칙이에요(' + seq.map(function (v, i) { return i === 0 ? String(v) : '×' + r + ' → ' + v; }).join(' ') + '). 그래서 $' + seq[3] + ' \\times ' + r + '=' + next + '$' + R.josa(next, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'calc-array',
      level: 2,
      title: '계산식의 배열에서 결과 추측하기',
      make: function (R) {
        var op = R.pick(['+', '-']);
        // 위에서 아래로 갈 때 앞의 수는 p씩, 뒤의 수는 q씩 커진다. 뺄셈은 p ≠ q 인 것만(차가 바뀌게)
        var pq = op === '+'
          ? R.pick([[1, 1], [10, 10], [100, 100], [1, 10], [10, 1], [10, 100], [100, 10], [100, 1], [1, 100]])
          : R.pick([[10, 1], [100, 10], [100, 1], [1, 10], [10, 100], [1, 100]]);
        var p = pq[0], q = pq[1];
        var y0 = R.int(1, 3) * 100 + R.int(0, 4) * 10 + R.int(0, 4);
        var x0 = op === '+'
          ? R.int(1, 4) * 100 + R.int(0, 4) * 10 + R.int(0, 4)
          : y0 + R.int(15, 45) * 10 + 6 * Math.max(0, q - p); // 여섯째 식까지 차가 0보다 크게
        var n = R.pick([5, 6]);
        var lines = [];
        for (var i = 0; i < 4; i++) {
          var x = x0 + i * p, y = y0 + i * q;
          lines.push('$' + x + op + y + '=' + (op === '+' ? x + y : x - y) + '$');
        }
        var X = x0 + (n - 1) * p, Y = y0 + (n - 1) * q, Rz = op === '+' ? X + Y : X - Y;
        var step = op === '+' ? p + q : p - q;
        var r4 = op === '+' ? x0 + 3 * p + y0 + 3 * q : x0 + 3 * p - y0 - 3 * q;
        var nth = n === 5 ? '다섯째' : '여섯째';
        var desc = op === '+'
          ? '더해지는 수는 ' + p + '씩, 더하는 수는 ' + q + '씩 커지므로 합은 ' + step + '씩 커져요.'
          : '빼어지는 수는 ' + p + '씩, 빼는 수는 ' + q + '씩 커지므로 차는 ' + (step > 0 ? step + '씩 커져요.' : (-step) + '씩 작아져요.');
        var wrong = [];
        if (n === 6) wrong.push({ a: String(r4 + step), why: '다섯째 식의 결과를 구했어요. 여섯째 식까지 한 번 더 이어 가요.' });
        if (op === '-') {
          var flipped = r4 - (n - 4) * step;
          if (flipped !== Rz && flipped > 0) wrong.push({ a: String(flipped), why: '차가 바뀌는 방향을 거꾸로 생각했어요. ' + desc });
        }
        return {
          type: 'short', check: 'number', concept: 2,
          q: '계산식의 규칙을 찾아 ' + nth + ' 계산식의 결과를 구하세요.\n\n' + lines.join('\n') + '\n$\\vdots$',
          hint: '위아래 식에서 바뀌는 수가 얼마씩 바뀌는지 보세요.',
          answer: String(Rz),
          wrong: wrong,
          explain: desc + ' ' + nth + ' 식은 $' + X + op + Y + '=' + Rz + '$' + R.josa(Rz, '이에요/예요') + '.',
        };
      },
    },
    {
      id: 'growing-diff',
      level: 3,
      title: '늘어나는 수가 커지는 도형의 배열',
      make: function (R) {
        var first = R.int(1, 4);
        var d0 = R.int(1, 4);
        var thing = R.pick([['바둑돌', '개'], ['구슬', '개'], ['성냥개비', '개'], ['블록', '개']]);
        var seq = [first];
        for (var i = 1; i < 8; i++) seq.push(seq[i - 1] + d0 + (i - 1));
        var n = R.int(6, 7);
        var ans = seq[n - 1];
        var diffs = [];
        for (var k = 1; k < n; k++) diffs.push(seq[k] - seq[k - 1]);
        var ord = ['첫째', '둘째', '셋째', '넷째', '다섯째', '여섯째', '일곱째'];
        var sameStep = seq[3] + (n - 4) * (seq[3] - seq[2]);
        var wrong = [];
        if (sameStep !== ans) wrong.push({ a: String(sameStep), why: '늘어나는 개수가 ' + (seq[3] - seq[2]) + '개로 그대로라고 생각했어요. 늘어나는 개수가 하나씩 커져요.' });
        return {
          type: 'short', check: 'number', unit: thing[1], concept: 1,
          q: thing[0] + R.josa(thing[0], '을/를') + ' 규칙에 따라 놓았어요. 첫째 ' + seq[0] + '개, 둘째 ' + seq[1] + '개, 셋째 ' + seq[2] + '개, 넷째 ' + seq[3] + '개예요. 같은 규칙으로 ' + ord[n - 1] + '에는 ' + thing[0] + R.josa(thing[0], '을/를') + ' 몇 개 놓을까요?',
          hint: '늘어나는 개수를 차례로 적어 보세요.',
          answer: String(ans),
          wrong: wrong,
          explain: '늘어나는 개수가 ' + diffs.slice(0, 3).join(', ') + R.josa(diffs[2], '으로/로') + ' 하나씩 커져요. 그래서 ' + seq.slice(0, n).join(', ') + '이므로 ' + ord[n - 1] + '에는 ' + ans + '개를 놓아요.',
        };
      },
    },
  ],
});
