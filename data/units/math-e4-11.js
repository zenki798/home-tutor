/* 4학년 수학 · 꺾은선그래프
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 그림: line. 그래프의 자료는 모두 가상의 자료다.
 *  - 그림은 값이 한쪽에 몰려 있으면 저절로 물결선(≈)을 넣는다. 물결선을 배우기 전 카드(0~2)는 fromZero 로 0부터 그린다.
 *  - 생성기의 그래프: 값 = b + (0~4칸) × k, 0칸과 4칸이 꼭 들어가고 b ≥ 5k 이면
 *    그림의 세로 눈금이 b, b+k, …, b+4k (한 칸 k) 이고 아래에 물결선이 생긴다.
 * 온도 단위 °C 는 "도"로 읽으므로 뒤 조사는 는/예요. */
(function () {
  // 0~4칸 중에서 n개: 0칸과 4칸이 한 번씩 꼭 들어가게 (그래야 눈금 한 칸이 k 로 그려진다)
  function cellsWithEnds(R, n, sorted) {
    var cells = [];
    for (var i = 0; i < n; i++) cells.push(R.int(1, 3));
    if (sorted) {
      cells.sort(function (a, b) { return a - b; });
      cells[0] = 0;
      cells[n - 1] = 4;
      return cells;
    }
    var pos = R.sample(range(n), 2);
    cells[pos[0]] = 0;
    cells[pos[1]] = 4;
    return cells;
  }
  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

  var HOURS = ['9시', '10시', '11시', '12시', '1시', '2시', '3시'];
  var HALF = ['9시 30분', '10시 30분', '11시 30분', '12시 30분', '1시 30분', '2시 30분'];

  Tutor.registerUnit({
    id: 'math-e4-11',
    course: 'math-e4',
    title: '꺾은선그래프',
    summary: '시간에 따른 변화를 나타낸 꺾은선그래프를 읽고 그리며, 목적에 알맞은 그래프를 골라 나타내요.',
    goals: [
      '꺾은선그래프를 읽고 시간에 따라 어떻게 변했는지 말할 수 있어요.',
      '조사하지 않은 때의 값을 꺾은선그래프로 짐작할 수 있어요.',
      '물결선을 사용하여 자료를 꺾은선그래프로 나타낼 수 있어요.',
      '자료에 알맞은 그래프(막대그래프·꺾은선그래프)를 고를 수 있어요.',
    ],
    standards: ['[4수04-02]', '[4수04-03]'],

    concepts: [
      {
        title: '꺾은선그래프 알아보기',
        body: '조사한 수량을 점으로 찍고, 그 점들을 차례로 **선분**으로 이어서 나타낸 그래프를 **꺾은선그래프**라고 해요.\n\n- **가로 눈금**: 조사한 때(시각, 요일, 월 …)\n- **세로 눈금**: 조사한 양(기온, 키, 무게 …)\n- **점**: 그때의 양, **선분**: 양이 바뀐 모습\n\n그림은 어느 날 운동장의 기온을 1시간마다 재어 나타낸 꺾은선그래프예요. 9시의 기온은 8 °C, 1시의 기온은 17 °C예요.\n\n> 💡 꺾은선그래프는 **시간에 따라 변하는 양**을 나타내기 좋아요. 선을 따라가면 늘었는지 줄었는지 한눈에 보여요.',
        easy: '날마다 같은 시각에 키를 재서 벽에 점을 찍는다고 생각해 보세요. 점을 날짜 순서대로 자로 이으면 꺾어진 선이 생기지요?\n\n이 선이 꺾은선이에요. 선이 위로 가면 키가 자란 것이고, 옆으로 평평하면 그대로인 거예요.',
        fig: { type: 'line', title: '운동장의 기온', labels: ['9시', '10시', '11시', '12시', '1시', '2시'], values: [8, 10, 14, 16, 17, 15], unit: '°C', fromZero: true, alt: '9시부터 2시까지 1시간마다 잰 운동장의 기온 꺾은선그래프. 9시 8 °C, 10시 10 °C, 11시 14 °C, 12시 16 °C, 1시 17 °C, 2시 15 °C' },
        check: {
          type: 'choice',
          q: '하루 동안 운동장의 기온을 나타낸 꺾은선그래프에서 **가로 눈금**은 무엇을 나타낼까요?',
          choices: ['기온을 잰 시각', '운동장의 기온', '운동장의 넓이'],
          answer: 0,
          why: ['', '기온은 세로 눈금으로 나타내요. 가로 눈금은 조사한 때를 나타내요.', '그래프에는 운동장의 넓이가 나오지 않아요. 가로 눈금은 기온을 잰 시각이에요.'],
          explain: '꺾은선그래프의 가로 눈금은 조사한 때(시각), 세로 눈금은 조사한 양(기온)을 나타내요.',
        },
      },
      {
        title: '꺾은선그래프로 변화 읽기',
        body: '꺾은선그래프는 선분의 모양을 보면 양이 어떻게 바뀌었는지 알 수 있어요.\n\n| 선분의 모양 | 뜻 |\n|---|---|\n| 오른쪽 위로 올라감 | 양이 늘었어요 |\n| 오른쪽 아래로 내려감 | 양이 줄었어요 |\n| 평평함 | 바뀌지 않았어요 |\n\n선분이 **많이 기울어질수록** 변화가 커요. 그림에서 기온이 가장 많이 오른 때는 선분이 가장 많이 기울어진 10시와 11시 사이예요. 이때 $14-10=4$, 4 °C가 올랐어요.\n\n> ⚠️ 기온이 가장 높은 때(1시)와 기온이 가장 많이 오른 때(10시~11시)는 다른 질문이에요.',
        easy: '미끄럼틀을 떠올려 보세요. 경사가 가파를수록 높이가 빨리 바뀌지요?\n\n꺾은선도 같아요. 선분이 가파르게 올라가면 그동안 많이 늘어난 것이고, 완만하면 조금 늘어난 것이에요. 내려가는 선분은 줄어든 것이에요.',
        fig: { type: 'line', title: '운동장의 기온', labels: ['9시', '10시', '11시', '12시', '1시', '2시'], values: [8, 10, 14, 16, 17, 15], unit: '°C', fromZero: true, alt: '운동장의 기온 꺾은선그래프. 9시 8 °C, 10시 10 °C, 11시 14 °C, 12시 16 °C, 1시 17 °C, 2시 15 °C. 10시와 11시 사이의 선분이 가장 많이 기울어져 있다.' },
        check: {
          type: 'ox',
          q: '꺾은선그래프에서 선분이 오른쪽 아래로 내려가면 그동안 양이 줄어든 거예요.',
          answer: true,
          explain: '선분이 내려가면 양이 줄어든 것이고, 올라가면 늘어난 것이에요. 평평하면 바뀌지 않은 거예요.',
        },
      },
      {
        title: '조사하지 않은 때의 값 짐작하기',
        body: '꺾은선그래프를 보면 **조사하지 않은 때의 값도 짐작**할 수 있어요.\n\n그림에서 10시의 기온은 12 °C, 11시의 기온은 16 °C예요. 10시 30분에는 기온을 재지 않았지만, 10시와 11시의 점을 이은 선분의 **가운데쯤**을 보면 약 14 °C였을 것이라고 짐작할 수 있어요.\n\n> 💡 짐작한 값은 정확한 값이 아니라서 "약 14 °C"처럼 **약**을 붙여 말해요.\n\n선분이 계속 같은 모양으로 이어진다면 다음에 어떻게 될지도 짐작해 볼 수 있어요. 그래프에서 기온이 계속 올랐으니 12시 30분쯤에도 기온이 오르고 있었을 거예요.',
        easy: '10시에 12 °C였고 11시에 16 °C였다면, 그 사이에 기온이 조금씩 올라갔겠지요? 딱 중간인 10시 30분에는 12와 16의 중간쯤인 14 °C쯤이었을 거예요.\n\n그래프에서는 두 점을 이은 선분의 한가운데를 손가락으로 짚어 보고, 그 높이를 세로 눈금에서 읽으면 돼요.',
        fig: { type: 'line', title: '교실 밖의 기온', labels: ['9시', '10시', '11시', '12시', '1시'], values: [10, 12, 16, 18, 20], unit: '°C', fromZero: true, alt: '1시간마다 잰 교실 밖의 기온 꺾은선그래프. 9시 10 °C, 10시 12 °C, 11시 16 °C, 12시 18 °C, 1시 20 °C' },
        check: {
          type: 'short', check: 'number', unit: '°C',
          q: '오전 10시의 기온은 12 °C, 오전 11시의 기온은 18 °C였어요. 기온이 꾸준히 올랐다면 오전 10시 30분의 기온은 약 몇 °C였을까요?',
          answer: '15',
          wrong: [
            { a: '12', why: '10시의 기온을 그대로 썼어요. 10시 30분은 10시와 11시의 한가운데라서 12와 18의 중간쯤이에요.' },
            { a: '18', why: '11시의 기온을 그대로 썼어요. 10시 30분은 아직 11시가 되기 전이에요.' },
            { a: '6', why: '두 기온의 차이를 구했어요. 차이 6 °C의 절반인 3 °C만큼 12 °C에서 올라가요.' },
          ],
          explain: '1시간 동안 $18-12=6$, 6 °C가 올랐으니 30분 동안에는 그 절반인 3 °C쯤 올랐을 거예요. 그래서 10시 30분의 기온은 약 $12+3=15$, 15 °C예요.',
        },
      },
      {
        title: '물결선을 사용한 꺾은선그래프',
        body: '민수의 키는 130 cm에서 136 cm 사이에서 바뀌었어요. 이것을 0 cm부터 그리면 그래프의 아래쪽이 거의 비어 있고, 키가 바뀐 모습은 너무 작아서 잘 보이지 않아요.\n\n이럴 때는 **필요 없는 부분을 물결선(≈)으로 줄여서** 나타내요. 세로 눈금에서 0과 첫 눈금(130 cm) 사이를 물결선으로 생략하면, 세로 눈금 한 칸을 작게(2 cm) 할 수 있어서 **변화가 뚜렷하게** 보여요.\n\n> ⚠️ 물결선이 있는 그래프에서는 맨 아래 눈금이 0이 아니에요. 물결선 위의 첫 눈금이 얼마인지 먼저 확인해요.',
        easy: '사진을 찍을 때 보고 싶은 부분만 크게 확대하는 것과 비슷해요. 키가 130 cm보다 작았던 적은 없으니 0부터 130까지는 볼 필요가 없지요.\n\n그 부분을 물결 모양(≈)으로 "잘라 냈다"고 표시하고, 130부터 위쪽만 크게 보여 주는 거예요.',
        fig: { type: 'line', title: '민수의 키', labels: ['1월', '3월', '5월', '7월', '9월', '11월'], values: [130, 132, 132, 134, 134, 136], unit: 'cm', alt: '물결선을 사용한 민수의 키 꺾은선그래프. 세로 눈금은 0 위에 물결선이 있고 130부터 136까지 2씩 커진다. 1월 130 cm, 3월 132 cm, 5월 132 cm, 7월 134 cm, 9월 134 cm, 11월 136 cm' },
        check: {
          type: 'choice',
          q: '꺾은선그래프에 물결선을 사용하는 까닭으로 알맞은 것은 무엇일까요?',
          choices: ['필요 없는 부분을 줄여서 변화를 잘 보이게 하려고', '조사한 값을 더 크게 바꾸려고', '조사하지 않은 때의 값을 정확히 알려고'],
          answer: 0,
          why: ['', '물결선을 써도 값은 바뀌지 않아요. 그래프의 필요 없는 부분만 줄여요.', '조사하지 않은 때의 값은 물결선이 없어도 짐작만 할 수 있어요. 물결선은 필요 없는 부분을 줄이는 표시예요.'],
          explain: '물결선은 그래프에서 필요 없는 부분(0부터 첫 눈금까지)을 줄여 나타내는 표시예요. 그러면 세로 눈금 한 칸을 작게 할 수 있어서 변화가 잘 보여요.',
        },
      },
      {
        title: '꺾은선그래프로 나타내기',
        body: '표를 보고 꺾은선그래프로 나타내는 순서예요.\n\n| 날 | 월 | 화 | 수 | 목 | 금 |\n|---|---|---|---|---|---|\n| 강낭콩의 키(cm) | 10 | 11 | 13 | 14 | 14 |\n\n1. 가로 눈금과 세로 눈금에 무엇을 나타낼지 정해요. (가로: 요일, 세로: 키)\n2. 세로 눈금 한 칸의 크기를 정해요. 가장 큰 값(14 cm)까지 나타낼 수 있어야 해요.\n3. 필요 없는 부분이 있으면 물결선으로 줄여요. (예: 0과 10 cm 사이)\n4. 요일과 키가 만나는 자리에 점을 찍어요.\n5. 점들을 차례로 선분으로 이어요.\n6. 알맞은 제목을 붙여요.\n\n> 💡 물결선을 넣을 때 물결선 위의 첫 눈금은 **가장 작은 값과 같거나 그보다 조금 작은 수**로 정해요. 가장 작은 값보다 크면 그 점을 찍을 수 없어요.',
        easy: '모눈종이에 점을 찍는 놀이라고 생각해 보세요. "월요일" 줄을 따라 올라가다가 "10" 높이에서 멈추고 점을 콕! "화요일" 줄은 "11" 높이에서 콕!\n\n점을 다 찍으면 왼쪽부터 차례로 자를 대고 이어요. 마지막에 무엇을 나타낸 그래프인지 제목을 써요.',
        check: {
          type: 'choice',
          q: '강낭콩의 키를 조사했더니 가장 작은 값이 10 cm, 가장 큰 값이 14 cm였어요. 물결선을 사용하여 꺾은선그래프로 나타낼 때, 물결선 위의 첫 눈금으로 알맞은 것은 무엇일까요?',
          choices: ['10 cm', '0 cm', '14 cm'],
          answer: 0,
          why: ['', '0 cm부터 그리면 물결선을 쓸 필요가 없어요. 물결선은 0부터 필요 없는 부분을 줄이는 거예요.', '14 cm는 가장 큰 값이에요. 첫 눈금을 14 cm로 하면 10 cm, 11 cm 같은 점을 찍을 수 없어요.'],
          explain: '물결선 위의 첫 눈금은 가장 작은 값(10 cm)과 같거나 조금 작게 정해요. 그래서 10 cm가 알맞아요.',
        },
      },
      {
        title: '알맞은 그래프 고르기',
        body: '막대그래프와 꺾은선그래프는 쓰임이 달라요.\n\n| 그래프 | 이럴 때 좋아요 | 예 |\n|---|---|---|\n| 막대그래프 | 여러 항목의 **크기를 비교**할 때 | 좋아하는 과일별 학생 수, 반별 모은 캔의 수 |\n| 꺾은선그래프 | **시간에 따라 변하는 모습**을 볼 때 | 하루 동안의 기온, 달마다 잰 키 |\n\n"사과를 좋아하는 학생 수"와 "포도를 좋아하는 학생 수" 사이에는 중간값이 없으니 점을 선분으로 이을 까닭이 없어요. 그래서 막대그래프가 알맞아요.\n\n하루 동안의 기온은 9시와 10시 사이에도 계속 이어지며 바뀌니 꺾은선그래프가 알맞아요.',
        easy: '"누가 더 많아?"가 궁금하면 막대그래프, "어떻게 바뀌었어?"가 궁금하면 꺾은선그래프예요.\n\n키 재기 대회에서 친구들의 키를 비교할 때는 막대를 나란히 세우고, 내 키가 1년 동안 어떻게 자랐는지 볼 때는 꺾은선을 그려요.',
        check: {
          type: 'ox',
          q: '반별 안경을 쓴 학생 수를 비교할 때는 꺾은선그래프보다 막대그래프가 더 알맞아요.',
          answer: true,
          explain: '반별 학생 수는 시간에 따라 변하는 양이 아니라 여러 항목의 크기를 비교하는 자료예요. 그래서 막대그래프가 더 알맞아요.',
        },
      },
    ],

    examples: [
      {
        q: '꺾은선그래프는 강아지의 무게를 달마다 잰 것이에요. 무게가 가장 많이 늘어난 때는 언제와 언제 사이이고, 몇 kg 늘었을까요?',
        fig: { type: 'line', title: '강아지의 무게', labels: ['3월', '4월', '5월', '6월', '7월'], values: [6, 7, 9, 10, 10], unit: 'kg', showValues: false, alt: '물결선을 사용한 강아지의 무게 꺾은선그래프. 세로 눈금은 6부터 10까지 1씩 커진다. 3월 6 kg, 4월 7 kg, 5월 9 kg, 6월 10 kg, 7월 10 kg' },
        steps: [
          '세로 눈금은 6 kg부터 1 kg씩 커져요(0과 6 사이는 물결선으로 줄였어요).',
          '달마다 무게를 읽어요: 3월 6 kg, 4월 7 kg, 5월 9 kg, 6월 10 kg, 7월 10 kg',
          '이웃한 달끼리 늘어난 무게를 구해요: 3월~4월 1 kg, 4월~5월 2 kg, 5월~6월 1 kg, 6월~7월 0 kg',
          '가장 많이 늘어난 때는 선분이 가장 많이 기울어진 4월과 5월 사이로, 2 kg 늘었어요.',
        ],
        answer: '4월과 5월 사이, 2 kg',
      },
      {
        q: '표를 꺾은선그래프로 나타내려고 해요. 세로 눈금 한 칸을 2 °C로 하고 물결선 위의 첫 눈금을 12 °C로 정했어요. 18 °C는 첫 눈금에서 몇 칸 위에 점을 찍어야 할까요?\n\n| 시각 | 9시 | 10시 | 11시 | 12시 |\n|---|---|---|---|---|\n| 기온(°C) | 12 | 14 | 18 | 20 |',
        steps: [
          '첫 눈금 12 °C에서 18 °C까지 올라가야 해요. $18-12=6$, 6 °C만큼이에요.',
          '눈금 한 칸이 2 °C이므로 $6 \\div 2=3$, 3칸이에요.',
          '11시의 세로줄에서 첫 눈금보다 3칸 위에 점을 찍어요.',
        ],
        answer: '3칸',
      },
    ],

    terms: [
      { term: '꺾은선그래프', def: '조사한 수량을 점으로 찍고, 그 점들을 차례로 선분으로 이어서 나타낸 그래프예요. 시간에 따라 변하는 양을 나타내기 좋아요.' },
      { term: '물결선', def: '그래프에서 필요 없는 부분을 줄여서 나타낼 때 쓰는 물결 모양(≈)의 선이에요. 세로 눈금의 0과 첫 눈금 사이에 그려요.' },
      { term: '가로 눈금', def: '그래프의 가로에 있는 눈금이에요. 꺾은선그래프에서는 보통 조사한 때(시각, 요일, 월)를 나타내요.' },
      { term: '세로 눈금', def: '그래프의 세로에 있는 눈금이에요. 꺾은선그래프에서는 보통 조사한 양(기온, 키, 무게)을 나타내요.' },
      { term: '눈금 한 칸의 크기', def: '이웃한 두 눈금 사이가 나타내는 양이에요. 예: 눈금이 10, 12, 14 …이면 한 칸은 2예요.' },
      { term: '막대그래프', def: '조사한 수량을 막대의 길이로 나타낸 그래프예요. 여러 항목의 크기를 비교하기 좋아요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', unit: '°C', concept: 0,
        q: '어느 날 교실 밖의 기온을 나타낸 꺾은선그래프예요. 11시의 기온은 몇 °C일까요?',
        fig: { type: 'line', title: '교실 밖의 기온', labels: ['9시', '10시', '11시', '12시', '1시'], values: [12, 14, 18, 20, 16], unit: '°C', showValues: false, alt: '물결선을 사용한 교실 밖의 기온 꺾은선그래프. 세로 눈금은 12부터 20까지 2씩 커진다.' },
        answer: '18',
        wrong: [
          { a: '3', why: '첫 눈금에서 몇 칸 위인지만 셌어요. 첫 눈금이 12 °C이고 한 칸이 2 °C이므로 $12+3 \\times 2$를 계산해요.' },
          { a: '6', why: '물결선 위의 첫 눈금을 0으로 읽었어요. 물결선 위의 첫 눈금은 12 °C예요.' },
        ],
        explain: '세로 눈금은 12 °C부터 2 °C씩 커져요. 11시의 점은 18 °C 눈금에 있으므로 11시의 기온은 18 °C예요.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '꺾은선그래프를 보고, 기온이 가장 높았던 때를 고르세요.',
        fig: { type: 'line', title: '교실 밖의 기온', labels: ['9시', '10시', '11시', '12시', '1시'], values: [12, 14, 18, 20, 16], unit: '°C', showValues: false, alt: '물결선을 사용한 교실 밖의 기온 꺾은선그래프. 세로 눈금은 12부터 20까지 2씩 커진다.' },
        choices: ['12시', '1시', '9시', '11시'],
        answer: 0,
        why: ['', '1시에는 기온이 내려갔어요. 점이 가장 높은 곳을 찾아요.', '9시는 기온이 가장 낮았던 때예요.', '11시보다 12시의 점이 더 높아요.'],
        explain: '점이 가장 높은 곳은 12시로, 20 °C예요. 12시 다음에는 기온이 16 °C로 내려갔어요.',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 1,
        q: '꺾은선그래프에서 12시와 1시 사이에는 기온이 내려갔어요.',
        fig: { type: 'line', title: '교실 밖의 기온', labels: ['9시', '10시', '11시', '12시', '1시'], values: [12, 14, 18, 20, 16], unit: '°C', showValues: false, alt: '물결선을 사용한 교실 밖의 기온 꺾은선그래프. 세로 눈금은 12부터 20까지 2씩 커진다.' },
        answer: true,
        explain: '12시와 1시를 이은 선분이 오른쪽 아래로 내려가요. 기온이 20 °C에서 16 °C로 4 °C 내려갔어요.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 5,
        q: '꺾은선그래프로 나타내기에 가장 알맞은 것은 무엇일까요?',
        choices: ['한 달 동안 매주 잰 강낭콩의 키', '반별 학급 문고의 책 수', '좋아하는 운동별 학생 수', '모둠 친구별 줄넘기 횟수'],
        answer: 0,
        why: ['', '반별 책 수는 여러 반의 크기를 비교하는 자료라서 막대그래프가 알맞아요.', '운동별 학생 수는 항목끼리 비교하는 자료라서 막대그래프가 알맞아요.', '친구별 횟수는 친구끼리 비교하는 자료라서 막대그래프가 알맞아요.'],
        explain: '꺾은선그래프는 시간에 따라 변하는 양을 나타내기 좋아요. 매주 잰 강낭콩의 키는 시간에 따라 바뀌므로 꺾은선그래프가 알맞아요.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 3,
        q: '물결선이 있는 꺾은선그래프에서 물결선 바로 위의 첫 눈금은 언제나 0이에요.',
        answer: false,
        explain: '물결선은 0과 첫 눈금 사이의 필요 없는 부분을 줄인 표시예요. 그래서 물결선 위의 첫 눈금은 0이 아니라 130, 12처럼 다른 수예요. 첫 눈금이 얼마인지 꼭 확인해요.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '강낭콩을 심은 뒤 이틀마다 키를 재어 나타낸 꺾은선그래프예요. 3일째에는 키를 재지 않았어요. 3일째에 강낭콩의 키는 약 몇 cm였을까요?',
        fig: { type: 'line', title: '강낭콩의 키', labels: ['2일째', '4일째', '6일째', '8일째'], values: [4, 8, 10, 14], unit: 'cm', fromZero: true, alt: '이틀마다 잰 강낭콩의 키 꺾은선그래프. 2일째 4 cm, 4일째 8 cm, 6일째 10 cm, 8일째 14 cm' },
        answer: '6',
        hint: '2일째와 4일째의 점을 이은 선분의 가운데쯤을 보세요.',
        wrong: [
          { a: '4', why: '2일째의 키를 그대로 썼어요. 3일째는 2일째와 4일째의 한가운데라서 4와 8의 중간쯤이에요.' },
          { a: '8', why: '4일째의 키를 그대로 썼어요. 3일째는 아직 4일째가 되기 전이에요.' },
        ],
        explain: '2일째에 4 cm, 4일째에 8 cm예요. 3일째는 그 한가운데이므로 선분의 가운데쯤인 약 6 cm였을 거예요.',
      },
      {
        id: 'p7', level: 2, type: 'choice', concept: 1,
        q: '꺾은선그래프를 보고, 기온이 가장 많이 오른 때를 고르세요.',
        fig: { type: 'line', title: '운동장의 기온', labels: ['9시', '10시', '11시', '12시', '1시'], values: [10, 12, 18, 20, 21], unit: '°C', alt: '운동장의 기온 꺾은선그래프. 9시 10 °C, 10시 12 °C, 11시 18 °C, 12시 20 °C, 1시 21 °C' },
        choices: ['10시와 11시 사이', '12시와 1시 사이', '9시와 10시 사이', '11시와 12시 사이'],
        answer: 0,
        why: [
          '',
          '1시에 기온이 가장 높지만, 12시와 1시 사이에는 1 °C만 올랐어요. 선분이 가장 많이 기울어진 곳을 찾아요.',
          '9시와 10시 사이에는 2 °C 올랐어요. 더 많이 오른 때가 있어요.',
          '11시와 12시 사이에는 2 °C 올랐어요. 더 많이 오른 때가 있어요.',
        ],
        hint: '이웃한 두 시각의 기온 차이를 차례로 구해 보세요.',
        explain: '오른 기온은 9시~10시 2 °C, 10시~11시 6 °C, 11시~12시 2 °C, 12시~1시 1 °C예요. 가장 많이 오른 때는 선분이 가장 많이 기울어진 10시와 11시 사이예요.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', unit: 'kg', concept: 1,
        q: '강아지의 무게를 달마다 재어 나타낸 꺾은선그래프예요. 3월부터 7월까지 강아지의 무게는 몇 kg 늘었을까요?',
        fig: { type: 'line', title: '강아지의 무게', labels: ['3월', '4월', '5월', '6월', '7월'], values: [6, 7, 9, 10, 10], unit: 'kg', showValues: false, alt: '물결선을 사용한 강아지의 무게 꺾은선그래프. 세로 눈금은 6부터 10까지 1씩 커진다.' },
        answer: '4',
        hint: '3월의 무게와 7월의 무게를 먼저 읽어요.',
        wrong: [
          { a: '10', why: '7월의 무게를 썼어요. 늘어난 무게는 7월의 무게에서 3월의 무게를 빼서 구해요.' },
          { a: '16', why: '두 무게를 더했어요. 늘어난 무게는 빼서 구해요.' },
        ],
        explain: '세로 눈금은 6 kg부터 1 kg씩 커져요. 3월은 6 kg, 7월은 10 kg이므로 $10-6=4$, 4 kg 늘었어요.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: '칸', concept: 4,
        q: '키를 조사한 표를 꺾은선그래프로 나타내려고 해요. 세로 눈금 한 칸을 2 cm로 하고, 물결선 위의 첫 눈금을 120 cm로 정했어요. 128 cm는 첫 눈금에서 몇 칸 위에 점을 찍어야 할까요?',
        answer: '4',
        hint: '먼저 첫 눈금에서 몇 cm 올라가야 하는지 구해요.',
        wrong: [
          { a: '8', why: '올라가야 하는 길이 8 cm를 그대로 썼어요. 한 칸이 2 cm이므로 $8 \\div 2$를 계산해요.' },
          { a: '64', why: '첫 눈금을 0으로 생각했어요. 물결선 위의 첫 눈금은 120 cm예요.' },
        ],
        explain: '첫 눈금 120 cm에서 128 cm까지는 $128-120=8$, 8 cm예요. 한 칸이 2 cm이므로 $8 \\div 2=4$, 4칸 위에 점을 찍어요.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '지아의 키는 1년 동안 132 cm에서 136 cm로 자랐어요. 물결선을 사용하여 꺾은선그래프로 나타낼 때, 세로 눈금 한 칸의 크기로 가장 알맞은 것은 무엇일까요?',
        choices: ['1 cm', '10 cm', '50 cm', '100 cm'],
        answer: 0,
        why: [
          '',
          '한 칸이 10 cm이면 132 cm와 136 cm가 같은 칸 안에 들어가서 변화가 거의 보이지 않아요.',
          '한 칸이 50 cm이면 키가 자란 4 cm는 거의 보이지 않아요.',
          '한 칸이 100 cm이면 키가 자란 모습이 전혀 보이지 않아요.',
        ],
        explain: '키가 자란 것은 4 cm뿐이에요. 한 칸을 1 cm로 하면 132, 133, 134, 135, 136 cm를 모두 눈금으로 나타낼 수 있어서 변화가 뚜렷하게 보여요.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 5,
        q: '**막대그래프**로 나타내는 것이 더 알맞은 것은 무엇일까요?',
        choices: ['반별 모은 빈 병의 수', '하루 동안 1시간마다 잰 그림자의 길이', '1년 동안 달마다 잰 동생의 몸무게', '일주일 동안 매일 잰 수영장 물의 온도'],
        answer: 0,
        why: [
          '',
          '시간에 따라 바뀌는 그림자의 길이는 꺾은선그래프가 알맞아요.',
          '달마다 바뀌는 몸무게는 꺾은선그래프가 알맞아요.',
          '날마다 바뀌는 물의 온도는 꺾은선그래프가 알맞아요.',
        ],
        explain: '반별 모은 빈 병의 수는 여러 반의 크기를 비교하는 자료라서 막대그래프가 알맞아요. 나머지는 모두 시간에 따라 바뀌는 양이라서 꺾은선그래프가 알맞아요.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', unit: '°C', concept: 2,
        q: '물을 데우면서 2분마다 물의 온도를 재어 나타낸 꺾은선그래프예요. 5분일 때 물의 온도는 약 몇 °C였을까요?',
        fig: { type: 'line', title: '데우는 물의 온도', labels: ['0분', '2분', '4분', '6분', '8분'], values: [50, 60, 70, 90, 90], unit: '°C', alt: '물결선을 사용한 데우는 물의 온도 꺾은선그래프. 0분 50 °C, 2분 60 °C, 4분 70 °C, 6분 90 °C, 8분 90 °C' },
        answer: '80',
        hint: '5분은 4분과 6분의 한가운데예요.',
        wrong: [
          { a: '70', why: '4분의 온도를 그대로 썼어요. 5분은 4분과 6분의 한가운데라서 70과 90의 중간쯤이에요.' },
          { a: '90', why: '6분의 온도를 그대로 썼어요. 5분은 아직 6분이 되기 전이에요.' },
          { a: '75', why: '4분부터 5분까지 늘어난 만큼을 다시 계산해 보세요. 2분 동안 20 °C 올랐으니 1분 동안에는 10 °C쯤 올라요.' },
        ],
        explain: '4분에 70 °C, 6분에 90 °C예요. 5분은 그 한가운데이므로 약 $70+10=80$, 80 °C였을 거예요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '강낭콩을 심은 뒤 이틀마다 키를 재었더니 꺾은선그래프처럼 일정하게 자랐어요. 같은 빠르기로 계속 자란다면 10일째에 강낭콩의 키는 약 몇 cm일까요?',
        fig: { type: 'line', title: '강낭콩의 키', labels: ['2일째', '4일째', '6일째', '8일째'], values: [5, 8, 11, 14], unit: 'cm', fromZero: true, alt: '이틀마다 잰 강낭콩의 키 꺾은선그래프. 2일째 5 cm, 4일째 8 cm, 6일째 11 cm, 8일째 14 cm' },
        answer: '17',
        hint: '이틀마다 몇 cm씩 자랐는지 먼저 구해요.',
        wrong: [
          { a: '20', why: '3 cm를 두 번 더했어요. 8일째에서 10일째까지는 이틀이라서 한 번만 3 cm 자라요.' },
          { a: '14', why: '8일째의 키를 그대로 썼어요. 10일째는 8일째보다 이틀 뒤예요.' },
        ],
        explain: '키가 2일째 5 cm → 4일째 8 cm → 6일째 11 cm → 8일째 14 cm로, 이틀마다 3 cm씩 자랐어요. 같은 빠르기라면 10일째에는 $14+3=17$, 약 17 cm일 거예요.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '서준이가 키를 꺾은선그래프로 나타냈는데 세로 눈금에 수를 몇 개만 적었어요. 물결선 위의 첫 눈금은 120 cm이고, 첫 눈금에서 4칸 위의 눈금은 128 cm예요. 첫 눈금에서 7칸 위에 찍힌 점은 몇 cm를 나타낼까요?',
        answer: '134',
        hint: '먼저 세로 눈금 한 칸이 몇 cm인지 구해요.',
        wrong: [
          { a: '127', why: '눈금 한 칸을 1 cm로 생각했어요. 4칸이 8 cm이므로 한 칸은 2 cm예요.' },
          { a: '14', why: '첫 눈금에서 올라간 길이만 구했어요. 첫 눈금 120 cm에 더해요.' },
        ],
        explain: '4칸이 $128-120=8$, 8 cm이므로 한 칸은 $8 \\div 4=2$, 2 cm예요. 7칸은 $7 \\times 2=14$, 14 cm이므로 점은 $120+14=134$, 134 cm를 나타내요.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '꺾은선그래프에서 오전 9시의 기온은 14 °C예요. 그래프를 보니 9시부터 10시까지 2 °C 올랐고, 10시부터 11시까지 3 °C 올랐고, 11시부터 12시까지 1 °C 내려갔어요. 12시의 점은 어디에 찍혀 있을까요?',
        choices: ['18 °C', '20 °C', '17 °C', '19 °C'],
        answer: 0,
        why: [
          '',
          '내려간 1 °C까지 더했어요. 11시부터 12시까지는 기온이 내려갔으니 빼요.',
          '10시부터 11시까지 오른 기온을 빠뜨렸어요. 오르고 내린 것을 차례로 모두 따져요.',
          '11시의 기온에서 멈췄어요. 11시부터 12시까지 1 °C 내려간 것까지 따져요.',
        ],
        hint: '시각마다 기온을 차례로 구해 보세요.',
        explain: '9시 14 °C → 10시 $14+2=16$ °C → 11시 $16+3=19$ °C → 12시 $19-1=18$ °C예요. 그래서 12시의 점은 18 °C에 찍혀 있어요.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 2,
        q: '꺾은선그래프를 보고, 기온이 16 °C였을 것으로 짐작되는 때를 고르세요.',
        fig: { type: 'line', title: '교실 밖의 기온', labels: ['9시', '10시', '11시', '12시'], values: [12, 14, 18, 20], unit: '°C', alt: '물결선을 사용한 교실 밖의 기온 꺾은선그래프. 9시 12 °C, 10시 14 °C, 11시 18 °C, 12시 20 °C' },
        choices: ['10시 30분', '9시 30분', '11시 30분', '12시'],
        answer: 0,
        why: [
          '',
          '9시 30분은 12 °C와 14 °C 사이라서 약 13 °C예요.',
          '11시 30분은 18 °C와 20 °C 사이라서 약 19 °C예요.',
          '12시의 기온은 20 °C예요.',
        ],
        hint: '16 °C는 어느 두 시각의 기온 사이에 있을까요?',
        explain: '16 °C는 10시(14 °C)와 11시(18 °C)의 한가운데 값이에요. 그래서 두 시각의 한가운데인 10시 30분쯤 기온이 16 °C였을 것이라고 짐작할 수 있어요.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 2,
        q: '1시간마다 잰 기온을 나타낸 꺾은선그래프만 보고 알 수 **없는** 것은 무엇일까요?',
        choices: ['10시 30분의 정확한 기온', '기온을 잰 시각 가운데 기온이 가장 높았던 시각', '기온이 가장 많이 오른 때(몇 시와 몇 시 사이)', '기온이 처음으로 내려간 때(몇 시와 몇 시 사이)'],
        answer: 0,
        why: [
          '',
          '점이 가장 높은 곳을 보면 알 수 있어요.',
          '선분이 가장 많이 기울어진 곳을 보면 알 수 있어요.',
          '선분이 처음으로 오른쪽 아래로 내려가는 곳을 보면 알 수 있어요.',
        ],
        explain: '10시 30분에는 기온을 재지 않았으니 그래프로 **약** 몇 °C인지 짐작할 수는 있지만 정확한 기온은 알 수 없어요. 나머지는 점과 선분을 보면 알 수 있어요.',
      },
    ],

    deeper: [
      {
        title: '한 그래프에 꺾은선 두 개',
        body: '두 가지 변화를 비교하고 싶을 때는 한 그래프에 꺾은선을 두 개 그리기도 해요. 예를 들어 우리 동네와 바닷가 마을의 하루 기온을 색을 다르게 하여 함께 그리면, 어느 곳이 더 빨리 따뜻해지는지, 두 곳의 기온 차이가 가장 큰 때는 언제인지 한눈에 볼 수 있어요.\n\n두 선이 만나는 곳은 두 곳의 기온이 같아진 때예요. 일기 예보나 신문에서도 이런 그래프를 자주 볼 수 있어요.',
      },
      {
        title: '앞으로 배울 그래프',
        body: '그래프는 무엇을 보고 싶은지에 따라 골라 써요. 지금까지 그림그래프(3학년), 막대그래프, 꺾은선그래프를 배웠어요.\n\n6학년에서는 전체에 대한 각 부분의 비율을 나타내는 **띠그래프**와 **원그래프**를 배워요. 예를 들어 "우리 반 학생 중 몇 %가 봄을 좋아할까?" 같은 물음에 알맞은 그래프예요.',
      },
    ],

    faq: [
      {
        q: '꺾은선그래프랑 막대그래프는 뭐가 달라요?',
        a: '막대그래프는 여러 항목의 크기를 막대 길이로 **비교**하기 좋고, 꺾은선그래프는 시간에 따라 양이 어떻게 **변하는지** 보기 좋아요. 막대그래프는 막대의 길이를, 꺾은선그래프는 점의 높이와 선분의 기울어진 정도를 봐요.',
      },
      {
        q: '물결선은 꼭 그려야 해요?',
        a: '꼭 그려야 하는 것은 아니에요. 값이 모두 0에서 멀리 떨어진 곳(예: 130~136 cm)에 몰려 있을 때 물결선을 쓰면 세로 눈금 한 칸을 작게 할 수 있어서 변화가 잘 보여요. 값이 0 가까이부터 있으면 물결선 없이 0부터 그려요.',
      },
      {
        q: '선분 위에서 읽은 값은 정확한 값이에요?',
        a: '아니에요. 점은 실제로 조사한 값이지만, 점과 점 사이의 선분 위의 값은 조사하지 않은 때를 **짐작**한 값이에요. 그래서 "약 14 °C"처럼 "약"을 붙여 말해요.',
      },
      {
        q: '세로 눈금 한 칸의 크기는 어떻게 알아요?',
        a: '수가 적힌 이웃한 두 눈금을 보고 큰 수에서 작은 수를 빼요. 예를 들어 12, 14, 16 …이면 한 칸은 2예요. 물결선이 있으면 물결선 위의 첫 눈금부터 세어요.',
      },
    ],

    mistakes: [
      '물결선이 있는 그래프에서 첫 눈금을 0으로 읽는 실수 — 물결선 위의 첫 눈금에 적힌 수(예: 12 °C)부터 읽어요.',
      '기온이 가장 높은 때와 기온이 가장 많이 오른 때를 헷갈리는 실수 — 가장 높은 때는 점의 높이, 가장 많이 오른 때는 선분의 기울어진 정도를 봐요.',
      '조사하지 않은 때의 값을 정확한 값처럼 말하는 실수 — 선분으로 짐작한 값에는 "약"을 붙여요.',
    ],

    gens: [
      {
        id: 'read-line',
        level: 1,
        title: '꺾은선그래프에서 값 읽기',
        make: function (R) {
          var themes = [
            { title: '운동장의 기온', unit: '°C', thing: '기온', k: R.pick([1, 2]), base: [10, 16], labels: 'hours', sorted: false },
            { title: '교실의 온도', unit: '°C', thing: '온도', k: 1, base: [15, 20], labels: 'hours', sorted: false },
            { title: '강낭콩의 키', unit: 'cm', thing: '강낭콩의 키', k: R.pick([1, 2]), base: [10, 20], labels: ['월', '화', '수', '목', '금'], sorted: true },
            { title: '강아지의 무게', unit: 'kg', thing: '강아지의 무게', k: 1, base: [5, 9], labels: ['3월', '4월', '5월', '6월', '7월'], sorted: true },
          ];
          var t = R.pick(themes);
          var k = t.k;
          var b = k * R.int(Math.ceil(t.base[0] / k), Math.floor(t.base[1] / k)); // b ≥ 5k
          var labels;
          if (t.labels === 'hours') {
            var n0 = R.int(5, 6), s0 = R.int(0, HOURS.length - n0);
            labels = HOURS.slice(s0, s0 + n0);
          } else labels = t.labels;
          var n = labels.length;
          var cells = cellsWithEnds(R, n, t.sorted);
          var values = cells.map(function (c) { return b + c * k; });
          var fig = { type: 'line', title: t.title, labels: labels, values: values, unit: t.unit, showValues: false };
          var when = function (x) { return t.labels === 'hours' ? x : x === '월' || x === '화' || x === '수' || x === '목' || x === '금' ? x + '요일' : x; };
          // 가장 높은 때를 묻는 문제 (기온·온도만 — 0칸·4칸이 한 번씩이라 가장 높은 때와 낮은 때가 하나뿐)
          if (!t.sorted && R.bool(0.4)) {
            var hi = cells.indexOf(4), lo = cells.indexOf(0);
            var askHigh = R.bool();
            var ans = askHigh ? hi : lo;
            var other = askHigh ? lo : hi;
            var rest = R.sample(range(n).filter(function (j) { return j !== hi && j !== lo; }), 2);
            var opts = [ans, other].concat(rest);
            var pick = R.choices(labels[ans], opts.slice(1).map(function (j) { return labels[j]; }));
            var reason = {};
            reason[labels[other]] = askHigh ? '이때는 ' + t.thing + R.josa(t.thing, '이/가') + ' 가장 낮았어요. 점이 가장 높은 곳을 찾아요.' : '이때는 ' + t.thing + R.josa(t.thing, '이/가') + ' 가장 높았어요. 점이 가장 낮은 곳을 찾아요.';
            rest.forEach(function (j) { reason[labels[j]] = '이때는 ' + values[j] + ' °C예요. 점의 높이를 다시 비교해 보세요.'; });
            return {
              type: 'choice', concept: 1,
              q: '꺾은선그래프를 보고, ' + t.thing + R.josa(t.thing, '이/가') + ' 가장 ' + (askHigh ? '높았던' : '낮았던') + ' 때를 고르세요.',
              fig: fig,
              choices: pick.choices,
              answer: pick.answer,
              why: pick.choices.map(function (c) { return c === labels[ans] ? '' : reason[c] || ''; }),
              explain: '점이 가장 ' + (askHigh ? '높은' : '낮은') + ' 곳은 ' + labels[ans] + R.josa(labels[ans], '이에요/예요') + '. 이때 ' + t.thing + R.josa(t.thing, '은/는') + ' ' + values[ans] + ' °C예요.',
            };
          }
          var i = R.int(0, n - 1);
          var v = values[i];
          var wrong = [];
          // 첫 눈금 위의 점(0칸)이면 "칸 수만 센" 답이 0 이 되어 진단이 어색하므로 넣지 않는다
          if (cells[i] > 0) wrong.push({ a: String(cells[i]), why: '물결선 위의 첫 눈금에서 몇 칸 위인지만 셌어요. 첫 눈금 ' + b + ' ' + t.unit + '부터 한 칸에 ' + k + ' ' + t.unit + '씩 커져요.' });
          if (k !== 1 && cells[i] > 0) wrong.push({ a: String(cells[i] * k), why: '물결선 위의 첫 눈금을 0으로 읽었어요. 첫 눈금은 ' + b + ' ' + t.unit + R.josa(t.unit, '이에요/예요') + '.' });
          return {
            type: 'short', check: 'number', unit: t.unit, concept: 0,
            q: '꺾은선그래프를 보고 답하세요. ' + when(labels[i]) + '에 잰 ' + t.thing + R.josa(t.thing, '은/는') + ' 몇 ' + t.unit + '일까요?',
            fig: fig,
            answer: String(v),
            wrong: wrong,
            explain: '세로 눈금은 물결선 위의 첫 눈금 ' + b + ' ' + t.unit + '부터 ' + k + ' ' + t.unit + '씩 커져요. ' + when(labels[i]) + '의 점은 ' + (cells[i] === 0 ? '첫 눈금 위에 있으므로 ' : '첫 눈금에서 ' + cells[i] + '칸 위에 있으므로 $' + b + '+' + (k === 1 ? cells[i] : cells[i] + ' \\times ' + k) + '=' + v + '$, ') + v + ' ' + t.unit + R.josa(t.unit, '이에요/예요') + '.',
          };
        },
      },
      {
        id: 'change-line',
        level: 2,
        title: '꺾은선그래프에서 변화의 크기 읽기',
        make: function (R) {
          var themes = [
            { title: '운동장의 기온', unit: '°C', thing: '기온', k: R.pick([1, 2]), base: [10, 16], sorted: false, up: '올랐을까요', down: '내려갔을까요' },
            { title: '강낭콩의 키', unit: 'cm', thing: '강낭콩의 키', k: R.pick([1, 2]), base: [10, 20], sorted: true, up: '자랐을까요' },
            { title: '강아지의 무게', unit: 'kg', thing: '강아지의 무게', k: 1, base: [5, 9], sorted: true, up: '늘었을까요' },
          ];
          var t = R.pick(themes);
          var k = t.k;
          var b = k * R.int(Math.ceil(t.base[0] / k), Math.floor(t.base[1] / k));
          var labels, unitWord = ' ' + t.unit;
          if (t.sorted) labels = t.unit === 'cm' ? ['월', '화', '수', '목', '금'] : ['3월', '4월', '5월', '6월', '7월'];
          else { var s0 = R.int(0, 2); labels = HOURS.slice(s0, s0 + 5); }
          var name = function (x) { return /^[월화수목금]$/.test(x) ? x + '요일' : x; };
          var n = 5;

          // 기온: 가장 많이 오른 때 고르기 (가장 많이 오른 구간이 하나뿐이게)
          if (!t.sorted && R.bool(0.5)) {
            var cells = null, best = -1;
            for (var tries = 0; tries < 60 && best < 0; tries++) {
              var cs = cellsWithEnds(R, n, false), top = 0, cnt = 0, at = -1;
              for (var j = 0; j < n - 1; j++) {
                var dj = cs[j + 1] - cs[j];
                if (dj > top) { top = dj; cnt = 1; at = j; } else if (dj === top && top > 0) cnt++;
              }
              if (top > 0 && cnt === 1) { cells = cs; best = at; }
            }
            if (best < 0) { cells = [1, 0, 4, 3, 2]; best = 1; }
            var values = cells.map(function (c) { return b + c * k; });
            var span = function (j) { return labels[j] + R.josa(labels[j], '과/와') + ' ' + labels[j + 1] + ' 사이'; };
            var hiIdx = cells.indexOf(4);
            var reason = {};
            var wrongs = [];
            for (var w = 0; w < n - 1; w++) {
              if (w === best) continue;
              var d = (cells[w + 1] - cells[w]) * k;
              var txt = span(w);
              wrongs.push(txt);
              if (d < 0) reason[txt] = '이때는 기온이 ' + (-d) + ' °C 내려갔어요. 선분이 오른쪽 위로 가장 많이 기울어진 곳을 찾아요.';
              else if (d === 0) reason[txt] = '이때는 기온이 바뀌지 않았어요(선분이 평평해요).';
              else if (w + 1 === hiIdx) reason[txt] = '기온이 가장 높은 때가 들어 있지만, 이때는 ' + d + ' °C만 올랐어요. 가장 높은 때와 가장 많이 오른 때는 달라요.';
              else reason[txt] = '이때는 ' + d + ' °C 올랐어요. 더 많이 오른 때가 있어요.';
            }
            var correct = span(best);
            var pick = R.choices(correct, wrongs);
            var diffs = [];
            for (var m = 0; m < n - 1; m++) {
              var dm = (cells[m + 1] - cells[m]) * k;
              diffs.push(labels[m] + '~' + labels[m + 1] + ' ' + (dm > 0 ? dm + ' °C 오름' : dm < 0 ? (-dm) + ' °C 내림' : '그대로'));
            }
            return {
              type: 'choice', concept: 1,
              q: '꺾은선그래프를 보고, 기온이 가장 많이 오른 때를 고르세요.',
              fig: { type: 'line', title: t.title, labels: labels, values: values, unit: t.unit, showValues: false },
              choices: pick.choices,
              answer: pick.answer,
              why: pick.choices.map(function (c) { return c === correct ? '' : reason[c] || ''; }),
              hint: '이웃한 두 시각의 기온을 읽고 차이를 차례로 구해 보세요.',
              explain: '세로 눈금은 ' + b + ' °C부터 ' + k + ' °C씩 커져요. 기온을 차례로 읽으면 ' + values.map(function (v, q) { return labels[q] + ' ' + v + ' °C'; }).join(', ') + '예요.\n\n' + diffs.join(', ') + '이므로 가장 많이 오른 때는 선분이 가장 많이 기울어진 ' + correct + '예요.',
            };
          }

          // 두 때 사이의 변화량
          var cells2 = cellsWithEnds(R, n, t.sorted);
          var vals = cells2.map(function (c) { return b + c * k; });
          var pairs = [];
          for (var a = 0; a < n; a++) for (var c2 = a + 1; c2 < n; c2++) if (cells2[a] !== cells2[c2]) pairs.push([a, c2]);
          var pr = R.pick(pairs);
          var i1 = pr[0], i2 = pr[1];
          var dv = vals[i2] - vals[i1];
          var amt = Math.abs(dv);
          var verb = dv > 0 ? t.up : t.down;
          var wrong = [
            { a: String(vals[i2]), why: name(labels[i2]) + '의 값을 그대로 썼어요. 변한 양은 두 값의 차이로 구해요.' },
            { a: String(vals[i1] + vals[i2]), why: '두 값을 더했어요. 변한 양은 큰 값에서 작은 값을 빼서 구해요.' },
          ];
          if (k !== 1) wrong.push({ a: String(amt / k), why: '칸 수의 차이만 구했어요. 세로 눈금 한 칸은 ' + k + unitWord + '이므로' + ' 칸 수에 ' + k + R.josa(k, '을/를') + ' 곱해요.' });
          return {
            type: 'short', check: 'number', unit: t.unit, concept: 1,
            q: '꺾은선그래프를 보고 답하세요. ' + name(labels[i1]) + '부터 ' + name(labels[i2]) + '까지 ' + t.thing + R.josa(t.thing, '은/는') + ' 몇 ' + t.unit + ' ' + verb + '?',
            fig: { type: 'line', title: t.title, labels: labels, values: vals, unit: t.unit, showValues: false },
            hint: '두 때의 값을 각각 읽은 뒤 큰 값에서 작은 값을 빼요.',
            answer: String(amt),
            wrong: wrong,
            explain: '세로 눈금은 물결선 위의 첫 눈금 ' + b + unitWord + '부터 ' + k + unitWord + '씩 커져요. ' + name(labels[i1]) + R.josa(name(labels[i1]), '은/는') + ' ' + vals[i1] + unitWord + ', ' + name(labels[i2]) + R.josa(name(labels[i2]), '은/는') + ' ' + vals[i2] + unitWord + '이므로 $' + Math.max(vals[i1], vals[i2]) + '-' + Math.min(vals[i1], vals[i2]) + '=' + amt + '$, ' + amt + unitWord + ' ' + verb.replace('을까요', '어요') + '.',
          };
        },
      },
      {
        id: 'estimate-mid',
        level: 2,
        title: '조사하지 않은 때의 값 짐작하기',
        make: function (R) {
          var t = R.pick([
            { title: '운동장의 기온', unit: '°C', k: 2, base: [10, 16], sorted: false, kind: 'hour' },
            { title: '데우는 물의 온도', unit: '°C', k: 10, base: [50, 50], sorted: true, kind: 'min', labels: ['0분', '2분', '4분', '6분', '8분'], mids: ['1분', '3분', '5분', '7분'] },
            { title: '강낭콩의 키', unit: 'cm', k: 2, base: [10, 16], sorted: true, kind: 'day', labels: ['2일째', '4일째', '6일째', '8일째', '10일째'], mids: ['3일째', '5일째', '7일째', '9일째'] },
          ]);
          var k = t.k;
          var b = k * R.int(t.base[0] / k, t.base[1] / k);
          var labels, mids;
          if (t.kind === 'hour') {
            var s0 = R.int(0, 2);
            labels = HOURS.slice(s0, s0 + 5);
            mids = HALF.slice(s0, s0 + 4);
          } else { labels = t.labels; mids = t.mids; }
          var cells = cellsWithEnds(R, 5, t.sorted);
          var values = cells.map(function (c) { return b + c * k; });
          var cand = [];
          for (var j = 0; j < 4; j++) if (cells[j] !== cells[j + 1]) cand.push(j);
          var i = R.pick(cand);
          var v1 = values[i], v2 = values[i + 1];
          var mid = (v1 + v2) / 2;
          var u = ' ' + t.unit;
          var q = t.kind === 'hour' ? '꺾은선그래프를 보고 답하세요. ' + mids[i] + '에는 기온을 재지 않았어요. ' + mids[i] + '의 기온은 약 몇 °C였을까요?'
            : t.kind === 'min' ? '물을 데우면서 2분마다 온도를 재어 나타낸 꺾은선그래프예요. ' + mids[i] + '일 때 물의 온도는 약 몇 °C였을까요?'
              : '강낭콩을 심은 뒤 이틀마다 키를 재어 나타낸 꺾은선그래프예요. ' + mids[i] + '에 강낭콩의 키는 약 몇 cm였을까요?';
          return {
            type: 'short', check: 'number', unit: t.unit, concept: 2,
            q: q,
            fig: { type: 'line', title: t.title, labels: labels, values: values, unit: t.unit },
            hint: mids[i] + R.josa(mids[i], '은/는') + ' ' + labels[i] + R.josa(labels[i], '과/와') + ' ' + labels[i + 1] + '의 한가운데예요.',
            answer: String(mid),
            wrong: [
              { a: String(v1), why: labels[i] + '의 값을 그대로 썼어요. ' + mids[i] + R.josa(mids[i], '은/는') + ' ' + labels[i] + R.josa(labels[i], '과/와') + ' ' + labels[i + 1] + '의 한가운데라서 두 값의 중간쯤이에요.' },
              { a: String(v2), why: labels[i + 1] + '의 값을 그대로 썼어요. ' + mids[i] + R.josa(mids[i], '은/는') + ' 아직 ' + labels[i + 1] + R.josa(labels[i + 1], '이/가') + ' 되기 전이에요.' },
              { a: String(Math.abs(v2 - v1)), why: '두 값의 차이를 구했어요. 차이의 절반만큼 ' + labels[i] + '의 값에서 바뀌어요.' },
            ],
            explain: labels[i] + '에 ' + v1 + u + ', ' + labels[i + 1] + '에 ' + v2 + u + R.josa(t.unit, '이에요/예요') + '. ' + mids[i] + R.josa(mids[i], '은/는') + ' 그 한가운데이므로 두 점을 이은 선분의 가운데쯤을 읽으면 약 ' + mid + u + R.josa(t.unit, '이에요/예요') + '.\n\n($' + v1 + '$' + R.josa(v1, '과/와') + ' $' + v2 + '$의 차이 ' + Math.abs(v2 - v1) + '의 절반은 ' + Math.abs(v2 - v1) / 2 + '이므로 $' + v1 + (v2 > v1 ? '+' : '-') + Math.abs(v2 - v1) / 2 + '=' + mid + '$)',
          };
        },
      },
      {
        id: 'plot-cells',
        level: 2,
        title: '물결선을 넣은 세로 눈금에 점 찍기',
        make: function (R) {
          var t = R.pick([
            { what: '키', unit: 'cm', k: R.pick([1, 2]), base: [120, 140] },
            { what: '기온', unit: '°C', k: R.pick([1, 2]), base: [8, 16] },
            { what: '몸무게', unit: 'kg', k: 1, base: [20, 30] },
            { what: '물의 온도', unit: '°C', k: R.pick([5, 10]), base: [20, 50] },
          ]);
          var k = t.k;
          var B = k * R.int(Math.ceil(t.base[0] / k), Math.floor(t.base[1] / k));
          var c = R.int(2, 8);
          var v = B + c * k;
          var u = ' ' + t.unit;
          var head = t.what + R.josa(t.what, '을/를') + ' 조사한 표를 꺾은선그래프로 나타내려고 해요. 세로 눈금 한 칸을 ' + k + u + R.josa(t.unit, '으로/로') + ' 하고, 물결선 위의 첫 눈금을 ' + B + u + R.josa(t.unit, '으로/로') + ' 정했어요. ';
          if (R.bool()) {
            var wrong = [{ a: String(v - B), why: '올라가야 하는 양(' + (v - B) + u + ')을 그대로 썼어요. 한 칸이 ' + k + u + '이므로' + ' 나누어요.' }];
            if (v % k === 0 && v / k !== c) wrong.push({ a: String(v / k), why: '첫 눈금을 0으로 생각했어요. 물결선 위의 첫 눈금은 ' + B + u + R.josa(t.unit, '이에요/예요') + '.' });
            if (k === 1) wrong = wrong.filter(function (x) { return x.a !== String(c); });
            return {
              type: 'short', check: 'number', unit: '칸', concept: 4,
              q: head + v + u + R.josa(t.unit, '은/는') + ' 첫 눈금에서 몇 칸 위에 점을 찍어야 할까요?',
              hint: '먼저 첫 눈금에서 몇 ' + t.unit + ' 올라가야 하는지 구해요.',
              answer: String(c),
              wrong: wrong,
              explain: '첫 눈금 ' + B + u + '에서 ' + v + u + '까지는 $' + v + '-' + B + '=' + (v - B) + '$' + (k === 1 ? '이고 한 칸이 ' + k + u + '이므로' + ' ' + c + '칸이에요.' : ', 한 칸이 ' + k + u + '이므로' + ' $' + (v - B) + ' \\div ' + k + '=' + c + '$, ' + c + '칸이에요.') + ' 첫 눈금에서 ' + c + '칸 위에 점을 찍어요.',
            };
          }
          var wrong2 = [{ a: String(c * k), why: '첫 눈금을 0으로 생각했어요. 물결선 위의 첫 눈금 ' + B + u + '에 더해요.' }];
          if (k !== 1) wrong2.push({ a: String(B + c), why: '한 칸을 1' + u + R.josa(t.unit, '으로/로') + ' 생각했어요. 한 칸은 ' + k + u + R.josa(t.unit, '이에요/예요') + '.' });
          return {
            type: 'short', check: 'number', unit: t.unit, concept: 4,
            q: head + '첫 눈금에서 ' + c + '칸 위에 찍힌 점은 몇 ' + t.unit + R.josa(t.unit, '을/를') + ' 나타낼까요?',
            hint: c + '칸이 나타내는 양을 먼저 구해요.',
            answer: String(v),
            wrong: wrong2,
            explain: (k === 1 ? c + '칸은 ' + c + u + '이고' : c + '칸은 $' + c + ' \\times ' + k + '=' + (c * k) + '$, ' + (c * k) + u + '이고') + ', 첫 눈금이 ' + B + u + '이므로' + ' 점은 $' + B + '+' + (c * k) + '=' + v + '$, ' + v + u + R.josa(t.unit, '을/를') + ' 나타내요.',
          };
        },
      },
    ],
  });
})();
