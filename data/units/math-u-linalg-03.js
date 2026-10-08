/* 선형대수학 · 행렬식
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 범위: 2×2·3×3 행렬식과 여인수 전개, 행 연산과 행렬식, det(AB), 가역성 판정, 수반행렬·크래머 공식, 넓이·부피.
 * 고윳값·벡터공간은 뒤 단원이므로 쓰지 않는다. */
(function () {
  function BM(rows) {
    return '\\begin{bmatrix} ' + rows.map(function (r) { return r.join(' & '); }).join(' \\\\ ') + ' \\end{bmatrix}';
  }
  function VM(rows) {
    return '\\begin{vmatrix} ' + rows.map(function (r) { return r.join(' & '); }).join(' \\\\ ') + ' \\end{vmatrix}';
  }
  function det2(m) { return m[0][0] * m[1][1] - m[0][1] * m[1][0]; }
  function minor(A, i, j) {
    var out = [];
    for (var r = 0; r < A.length; r++) {
      if (r === i) continue;
      var row = [];
      for (var c = 0; c < A.length; c++) if (c !== j) row.push(A[r][c]);
      out.push(row);
    }
    return out;
  }
  function det3(A) {
    return A[0][0] * det2(minor(A, 0, 0)) - A[0][1] * det2(minor(A, 0, 1)) + A[0][2] * det2(minor(A, 0, 2));
  }
  function wrongList(ans, list) {
    var seen = [String(ans)], out = [];
    list.forEach(function (w) {
      var k = String(w[0]);
      if (seen.indexOf(k) >= 0) return;
      seen.push(k);
      out.push({ a: k, why: w[1] });
    });
    return out;
  }

  Tutor.registerUnit({
    id: 'math-u-linalg-03',
    course: 'math-u-linalg',
    title: '행렬식',
    summary: '여인수 전개로 행렬식을 계산하고, 행렬식의 성질과 역행렬, 넓이·부피와의 관계를 알아봅니다.',
    goals: [
      '$2\\times2$, $3\\times3$ 행렬식을 계산하고 여인수 전개를 할 수 있다.',
      '행 연산이 행렬식에 주는 영향을 이용해 행렬식을 효율적으로 구할 수 있다.',
      '$\\det(AB)=\\det A\\det B$와 "가역 ⇔ $\\det A\\ne0$"을 이용할 수 있다.',
      '수반행렬·크래머 공식을 쓰고, 행렬식으로 평행사변형의 넓이와 평행육면체의 부피를 구할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '행렬식의 뜻과 2×2 행렬식',
        body: '정사각행렬 $A$에는 **행렬식**이라는 수 하나가 정해집니다. 기호는 $\\det A$ 또는 $|A|$입니다. $2\\times2$ 행렬에서는\n\n' +
          '$\\det' + BM([['a', 'b'], ['c', 'd']]) + '=' + VM([['a', 'b'], ['c', 'd']]) + '=ad-bc$\n\n' +
          '입니다. 예: $' + VM([[3, 1], [4, 2]]) + '=3\\cdot2-1\\cdot4=2$\n\n' +
          '앞 단원에서 $2\\times2$ 행렬은 $ad-bc\\ne0$일 때만 역행렬이 있었습니다. 행렬식은 이처럼 **역행렬이 있는지 알려 주는 수**이고, 뒤에서 보듯 넓이·부피가 몇 배로 바뀌는지도 알려 줍니다. $1\\times1$ 행렬 $[\\,a\\,]$의 행렬식은 $a$이고, 더 큰 행렬의 행렬식은 다음 카드의 여인수 전개로 구합니다.\n\n' +
          '> ⚠️ $|A|$는 절댓값이 아니라 행렬식 기호입니다. 행렬식은 음수일 수 있습니다.',
        easy: '$2\\times2$ 행렬식은 "X자 곱셈"입니다. 왼쪽 위에서 오른쪽 아래로 내려가는 대각선($a$와 $d$)을 곱하고, 오른쪽 위에서 왼쪽 아래로 내려가는 대각선($b$와 $c$)을 곱해서 **앞의 것에서 뒤의 것을 뺍니다.**\n\n' +
          '예: $' + VM([[3, 1], [4, 2]]) + '$ → $3\\times2=6$에서 $1\\times4=4$를 빼서 2입니다.',
        check: {
          type: 'short', check: 'number',
          q: '행렬식의 값을 구하세요.\n\n$' + VM([[2, 5], [1, 3]]) + '$',
          answer: '1',
          wrong: [
            { a: '11', why: '두 대각선의 곱을 더했습니다. $ad-bc$이므로 빼야 합니다.' },
            { a: '-1', why: '순서를 바꾸어 $bc-ad$를 계산했습니다. 왼쪽 위–오른쪽 아래 대각선의 곱에서 다른 대각선의 곱을 뺍니다.' },
          ],
          explain: '$ad-bc=2\\cdot3-5\\cdot1=6-5=1$입니다.',
        },
      },
      {
        title: '여인수 전개',
        body: '$n\\times n$ 행렬 $A$에서 $i$행과 $j$열을 지운 행렬의 행렬식을 **소행렬식** $M_{ij}$, 여기에 부호를 붙인 $C_{ij}=(-1)^{i+j}M_{ij}$를 **여인수**라고 합니다. 행렬식은 어느 한 행(또는 한 열)을 골라\n\n' +
          '$\\det A=a_{i1}C_{i1}+a_{i2}C_{i2}+\\cdots+a_{in}C_{in}$\n\n' +
          '으로 구합니다. 이것을 **여인수 전개**라고 하며, 어느 행이나 열을 골라도 값이 같습니다. 부호 $(-1)^{i+j}$은 바둑판 모양입니다: $' + BM([['+', '-', '+'], ['-', '+', '-'], ['+', '-', '+']]) + '$\n\n' +
          '예: 1행을 따라 전개하면\n\n$' + VM([[2, 1, 0], [1, 3, 1], [0, 1, 2]]) + '=2' + VM([[3, 1], [1, 2]]) + '-1' + VM([[1, 1], [0, 2]]) + '+0' + VM([[1, 3], [0, 1]]) + '=2\\cdot5-1\\cdot2+0=8$\n\n' +
          '> 💡 0이 많은 행이나 열을 골라 전개하면 계산이 크게 줄어듭니다. 0인 성분의 항은 계산할 필요가 없습니다.',
        easy: '여인수 전개는 큰 행렬식을 작은 행렬식 여러 개로 쪼개는 방법입니다. 1행의 성분을 하나씩 손가락으로 짚고, 그 성분이 있는 행과 열을 손으로 가리면 $2\\times2$ 행렬식이 남습니다. 짚은 성분과 남은 행렬식을 곱합니다.\n\n' +
          '이렇게 얻은 세 값을 $+, -, +$ 부호를 번갈아 붙여 더하면 됩니다. 부호를 잊는 것이 가장 흔한 실수입니다.',
        check: {
          type: 'short', check: 'number',
          q: '$A=' + BM([[1, 2, 3], [4, 5, 6], [7, 8, 10]]) + '$의 여인수 $C_{12}$를 구하세요.',
          answer: '2',
          wrong: [{ a: '-2', why: '소행렬식 $M_{12}=-2$에서 멈췄습니다. $C_{12}=(-1)^{1+2}M_{12}$이므로 부호를 바꿉니다.' }],
          explain: '1행과 2열을 지우면 $' + VM([[4, 6], [7, 10]]) + '=40-42=-2$가 $M_{12}$입니다. $C_{12}=(-1)^{1+2}M_{12}=-(-2)=2$입니다.',
        },
      },
      {
        title: '행 연산과 행렬식, 삼각행렬',
        body: '기본 행 연산을 하면 행렬식은 다음과 같이 바뀝니다.\n\n' +
          '| 행 연산 | 행렬식 |\n|---|---|\n| 두 행을 바꾼다 | 부호가 바뀐다 |\n| 한 행에 $k$를 곱한다 | $k$배가 된다 |\n| 한 행에 다른 행의 상수배를 더한다 | 변하지 않는다 |\n\n' +
          '**삼각행렬**(주대각선 아래가 모두 0이거나, 위가 모두 0인 정사각행렬)의 행렬식은 **주대각성분의 곱**입니다. 첫 열을 따라 전개하면 대각성분이 하나씩 곱해지기 때문입니다.\n\n' +
          '그래서 큰 행렬은 행 연산으로 위삼각행렬을 만든 뒤 대각성분을 곱하고, 행을 바꾼 횟수만큼 부호를 고쳐 줍니다. 예: $' + VM([[1, 2, 3], [2, 5, 7], [-1, 1, 4]]) + '$에서 $R_2-2R_1$, $R_3+R_1$, $R_3-3R_2$를 하면 대각성분이 $1, 1, 4$인 위삼각행렬이 되므로 행렬식은 4입니다.\n\n' +
          '그 밖의 성질: $\\det(A^{T})=\\det A$이므로 행에 대한 성질은 열에도 그대로 성립합니다. 두 행이 같거나 한 행이 다른 행의 상수배이면 행렬식은 0입니다. $n\\times n$ 행렬에서는 $\\det(kA)=k^n\\det A$입니다($n$개의 행에 모두 $k$가 곱해지므로).',
        easy: '$2\\times2$ 행렬식의 절댓값은 두 행 벡터가 만드는 평행사변형의 넓이입니다(카드 6). 그렇게 보면 행 연산의 효과가 그림으로 이해됩니다.\n\n' +
          '- 한 변을 $k$배로 늘이면 넓이도 $k$배\n- 한 변을 다른 변 방향으로 밀면(상수배 더하기) 밑변과 높이가 그대로라 넓이도 그대로\n- 두 변의 순서를 바꾸면 크기는 같고 방향(부호)만 반대',
        check: {
          type: 'ox',
          q: '$3\\times3$ 행렬 $A$에 대해 $\\det(2A)=2\\det A$입니다.',
          answer: false,
          explain: '$2A$는 세 행에 모두 2가 곱해진 행렬이므로 행렬식은 $2\\cdot2\\cdot2=8$배가 됩니다. $\\det(2A)=2^3\\det A=8\\det A$입니다.',
        },
      },
      {
        title: '곱의 행렬식과 가역성 판정',
        body: '같은 크기의 정사각행렬 $A$, $B$에 대해\n\n$\\det(AB)=\\det A\\cdot\\det B$\n\n' +
          '가 성립합니다. 곱의 행렬식은 행렬식의 곱입니다. 그러나 **합에 대해서는 성립하지 않습니다**: 일반적으로 $\\det(A+B)\\ne\\det A+\\det B$입니다(예: $A=B=I_2$이면 $\\det(2I)=4$, $\\det I+\\det I=2$).\n\n' +
          '**가역성 판정**: $A$가 가역 $\\iff$ $\\det A\\ne0$\n\n' +
          '행 연산은 행렬식을 0이 아닌 수만큼 곱할 뿐이므로, $A$와 그 기약 행사다리꼴 $R$은 행렬식이 둘 다 0이거나 둘 다 0이 아닙니다. $R=I$이면 $\\det R=1$이고, $R\\ne I$이면 $R$에 영행이 있어 $\\det R=0$입니다. 이 조건이 가역행렬 정리의 목록에 더해집니다.\n\n' +
          '$A$가 가역이면 $AA^{-1}=I$의 양변의 행렬식을 구해 $\\det A\\cdot\\det(A^{-1})=1$, 곧 $\\det(A^{-1})=\\dfrac{1}{\\det A}$입니다.',
        easy: '행렬을 "넓이를 몇 배로 늘리는 기계"라고 생각해 보세요. $\\det A=3$이면 넓이를 3배로, $\\det B=2$이면 2배로 늘립니다. 두 기계를 차례로 거치면 $3\\times2=6$배이므로 $\\det(AB)=6$입니다.\n\n' +
          '$\\det A=0$인 기계는 도형을 납작하게 눌러 넓이를 0으로 만듭니다. 납작해진 도형은 원래 모양으로 되돌릴 방법이 없으니 역행렬이 없습니다.',
        check: {
          type: 'choice',
          q: '같은 크기의 정사각행렬 $A$, $B$에 대해 $\\det A=3$, $\\det B=-2$일 때 $\\det(AB)$의 값은 무엇입니까?',
          choices: ['$1$', '$-\\frac{3}{2}$', '$-6$'],
          answer: 2,
          why: [
            '행렬식을 더했습니다. 곱의 행렬식은 행렬식의 곱입니다.',
            '행렬식을 나누었습니다. $\\det(AB)=\\det A\\cdot\\det B$입니다.',
            '',
          ],
          explain: '$\\det(AB)=\\det A\\cdot\\det B=3\\cdot(-2)=-6$입니다.',
        },
      },
      {
        title: '수반행렬과 크래머 공식',
        body: '여인수 $C_{ij}$를 $(i, j)$ 자리에 모은 행렬을 **전치**한 것을 $A$의 **수반행렬** $\\operatorname{adj}(A)$라고 합니다. 곧 $(\\operatorname{adj}(A))_{ij}=C_{ji}$입니다. 그러면\n\n' +
          '$A\\,\\operatorname{adj}(A)=(\\det A)I$\n\n' +
          '가 성립합니다. 대각성분은 여인수 전개 그 자체이고, 나머지 성분은 같은 행이 두 번 들어간 행렬의 여인수 전개라서 0입니다. 따라서 $\\det A\\ne0$이면\n\n$A^{-1}=\\dfrac{1}{\\det A}\\operatorname{adj}(A)$\n\n' +
          '입니다. $2\\times2$ 역행렬 공식은 이것의 특별한 경우입니다.\n\n' +
          '**크래머 공식**: $A$가 가역이면 $A\\mathbf{x}=\\mathbf{b}$의 해는\n\n$x_i=\\dfrac{\\det A_i}{\\det A}\\quad(i=1, 2, \\ldots, n)$\n\n' +
          '입니다. 여기서 $A_i$는 $A$의 $i$열을 $\\mathbf{b}$로 바꾼 행렬입니다.\n\n' +
          '> 💡 수반행렬과 크래머 공식은 해와 역행렬을 **식으로** 보여 주어 이론에 쓸모가 많습니다. 하지만 큰 행렬을 실제로 계산할 때는 소거법이 훨씬 빠릅니다.',
        easy: '크래머 공식은 "열 바꿔치기" 요리법입니다. 구하고 싶은 미지수가 $x$이면 $x$의 계수가 있는 열을 상수항 열로 갈아 끼운 행렬식을 구하고, 원래 행렬식으로 나눕니다.\n\n' +
          '$y$를 구하고 싶으면 $y$ 열을 갈아 끼웁니다. 분모는 늘 같은 $\\det A$입니다.',
        check: {
          type: 'short', check: 'number',
          q: '크래머 공식으로 $x$의 값을 구하세요.\n\n$\\begin{cases} x+y=3 \\\\ x-y=1 \\end{cases}$',
          answer: '2',
          wrong: [
            { a: '-2', why: '분모 $\\det A=-2$의 부호를 놓쳤습니다. $x=\\dfrac{-4}{-2}=2$입니다.' },
            { a: '1', why: '$y$의 값입니다. $x$를 구하려면 첫째 열을 상수항으로 바꿉니다.' },
          ],
          explain: '$\\det A=' + VM([[1, 1], [1, -1]]) + '=-1-1=-2$, $\\det A_1=' + VM([[3, 1], [1, -1]]) + '=-3-1=-4$이므로 $x=\\dfrac{-4}{-2}=2$입니다.',
        },
      },
      {
        title: '행렬식과 넓이·부피',
        body: 'ℝ²의 두 벡터 $\\mathbf{u}=(a, b)$, $\\mathbf{v}=(c, d)$가 만드는 평행사변형의 넓이는\n\n$\\left|\\det' + BM([['a', 'c'], ['b', 'd']]) + '\\right|=|ad-bc|$\n\n' +
          '입니다. 마찬가지로 ℝ³의 세 벡터가 만드는 평행육면체의 부피는 세 벡터를 열(또는 행)로 하는 $3\\times3$ 행렬식의 **절댓값**입니다.\n\n' +
          '까닭은 행렬식의 성질과 넓이의 성질이 똑같기 때문입니다. 한 변을 $k$배 하면 넓이도 $k$배, 한 변을 다른 변 방향으로 밀어도 넓이는 그대로, 단위정사각형의 넓이는 $1=\\det I$입니다.\n\n' +
          '예: $\\mathbf{u}=(3, 1)$, $\\mathbf{v}=(1, 2)$이면 넓이는 $|3\\cdot2-1\\cdot1|=5$입니다(그림).\n\n' +
          '행렬식의 **부호**는 방향을 알려 줍니다. $\\mathbf{u}$에서 $\\mathbf{v}$로 시곗바늘 반대 방향으로 돌면 양수, 시곗바늘 방향이면 음수입니다. 또 행렬 $A$로 평면의 도형을 옮기면 넓이는 $|\\det A|$배가 됩니다.',
        easy: '평행사변형의 넓이는 밑변 × 높이입니다. 행렬식은 이 계산을 좌표만으로 한 번에 해 주는 공식입니다.\n\n' +
          '그림에서 $(3, 1)$과 $(1, 2)$로 만든 평행사변형을 직사각형 $4\\times3=12$에서 바깥 삼각형과 사각형 조각을 빼서 구해 봐도 5가 나옵니다. 행렬식 $3\\cdot2-1\\cdot1=5$와 같습니다.',
        fig: {
          type: 'coord', xmin: -1, xmax: 5, ymin: -1, ymax: 4,
          segments: [
            { from: [0, 0], to: [3, 1] }, { from: [3, 1], to: [4, 3] },
            { from: [4, 3], to: [1, 2] }, { from: [1, 2], to: [0, 0] },
          ],
          points: [{ x: 3, y: 1, label: 'u' }, { x: 1, y: 2, label: 'v' }],
          alt: '원점에서 출발한 두 벡터 (3, 1)과 (1, 2)가 만드는 평행사변형',
        },
        check: {
          type: 'short', check: 'number',
          q: '두 벡터 $\\mathbf{u}=(2, -1)$, $\\mathbf{v}=(1, 3)$이 만드는 평행사변형의 넓이를 구하세요.',
          answer: '7',
          wrong: [{ a: '5', why: '$ad+bc$처럼 계산했습니다. $|ad-bc|=|2\\cdot3-(-1)\\cdot1|=|6+1|=7$입니다.' }],
          explain: '$\\left|' + VM([[2, 1], [-1, 3]]) + '\\right|=|2\\cdot3-1\\cdot(-1)|=|6+1|=7$입니다.',
        },
      },
    ],

    examples: [
      {
        q: '행렬식을 구하세요.\n\n$' + VM([[2, 0, 1], [3, -1, 4], [1, 0, 5]]) + '$',
        steps: [
          '0이 가장 많은 열을 찾습니다. 둘째 열은 $(0, -1, 0)$으로 0이 두 개입니다.',
          '둘째 열을 따라 전개하면 $(2, 2)$ 성분 $-1$의 항만 남습니다. 부호는 $(-1)^{2+2}=+1$입니다.',
          '2행과 2열을 지운 소행렬식은 $' + VM([[2, 1], [1, 5]]) + '=10-1=9$입니다.',
          '따라서 행렬식은 $(-1)\\cdot(+1)\\cdot9=-9$입니다.',
        ],
        answer: '$-9$',
      },
      {
        q: '행 연산으로 행렬식을 구하세요.\n\n$' + VM([[1, 2, 3], [2, 5, 7], [-1, 1, 4]]) + '$',
        steps: [
          '$R_2-2R_1 \\to R_2$, $R_3+R_1 \\to R_3$ (상수배 더하기는 행렬식을 바꾸지 않습니다) → $' + VM([[1, 2, 3], [0, 1, 1], [0, 3, 7]]) + '$',
          '$R_3-3R_2 \\to R_3$ → $' + VM([[1, 2, 3], [0, 1, 1], [0, 0, 4]]) + '$',
          '위삼각행렬이므로 행렬식은 대각성분의 곱 $1\\cdot1\\cdot4=4$입니다.',
          '검산(1행 전개): $1(20-7)-2(8+7)+3(2+5)=13-30+21=4$',
        ],
        answer: '$4$',
      },
      {
        q: '크래머 공식으로 푸세요.\n\n$\\begin{cases} 2x+y=5 \\\\ x-3y=-1 \\end{cases}$',
        steps: [
          '$\\det A=' + VM([[2, 1], [1, -3]]) + '=-6-1=-7$이므로 해가 하나뿐이고 크래머 공식을 쓸 수 있습니다.',
          '$x$ 열을 상수항으로 바꾸면 $\\det A_1=' + VM([[5, 1], [-1, -3]]) + '=-15+1=-14$, $x=\\dfrac{-14}{-7}=2$입니다.',
          '$y$ 열을 상수항으로 바꾸면 $\\det A_2=' + VM([[2, 5], [1, -1]]) + '=-2-5=-7$, $y=\\dfrac{-7}{-7}=1$입니다.',
          '검산: $2\\cdot2+1=5$, $2-3\\cdot1=-1$',
        ],
        answer: '$x=2,\\ y=1$',
      },
    ],

    terms: [
      { term: '행렬식', def: '정사각행렬에 정해지는 수 하나입니다. $\\det A$ 또는 $|A|$로 씁니다. $2\\times2$ 행렬에서는 $ad-bc$이고, 0이 아니면 역행렬이 있습니다.' },
      { term: '소행렬식', def: '정사각행렬에서 $i$행과 $j$열을 지운 행렬의 행렬식입니다. $M_{ij}$로 씁니다.' },
      { term: '여인수', def: '소행렬식에 부호를 붙인 값 $C_{ij}=(-1)^{i+j}M_{ij}$입니다.' },
      { term: '여인수 전개', def: '한 행(또는 열)의 성분과 그 여인수를 곱해 모두 더하여 행렬식을 구하는 방법입니다. 어느 행이나 열로 해도 값이 같습니다.' },
      { term: '삼각행렬', def: '주대각선 아래가 모두 0(위삼각)이거나 위가 모두 0(아래삼각)인 정사각행렬입니다. 행렬식은 주대각성분의 곱입니다.' },
      { term: '수반행렬', def: '여인수 $C_{ij}$를 모은 행렬의 전치행렬입니다. $A\\,\\operatorname{adj}(A)=(\\det A)I$가 성립합니다.' },
      { term: '크래머 공식', def: '가역행렬 $A$에 대한 $A\\mathbf{x}=\\mathbf{b}$의 해를 $x_i=\\dfrac{\\det A_i}{\\det A}$로 나타내는 공식입니다. $A_i$는 $i$열을 $\\mathbf{b}$로 바꾼 행렬입니다.' },
      { term: '평행육면체', def: '세 쌍의 마주 보는 면이 각각 평행한 입체입니다. ℝ³의 세 벡터가 만드는 평행육면체의 부피는 세 벡터로 만든 행렬식의 절댓값입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '행렬식의 값을 구하세요.\n\n$' + VM([[4, -2], [3, 5]]) + '$',
        answer: '26',
        wrong: [
          { a: '14', why: '$bc=(-2)\\cdot3=-6$을 빼야 하는데 6을 뺐습니다. $20-(-6)=26$입니다.' },
          { a: '-26', why: '$bc-ad$를 계산했습니다. $ad-bc$입니다.' },
        ],
        explain: '$ad-bc=4\\cdot5-(-2)\\cdot3=20+6=26$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 1,
        q: '$A=' + BM([[2, 1, 3], [0, 4, -1], [5, 2, 1]]) + '$의 여인수 $C_{23}$을 구하세요.',
        answer: '1',
        wrong: [{ a: '-1', why: '소행렬식 $M_{23}=-1$에서 멈췄습니다. $(-1)^{2+3}=-1$을 곱해야 합니다.' }],
        explain: '2행과 3열을 지우면 $M_{23}=' + VM([[2, 1], [5, 2]]) + '=4-5=-1$입니다. $C_{23}=(-1)^{2+3}M_{23}=-(-1)=1$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 2,
        q: '행렬식의 값을 구하세요.\n\n$' + VM([[3, 0, 0], [5, 2, 0], [1, 4, -1]]) + '$',
        answer: '-6',
        wrong: [{ a: '4', why: '대각성분을 더했습니다. 삼각행렬의 행렬식은 대각성분의 **곱**입니다.' }],
        explain: '주대각선 위가 모두 0인 아래삼각행렬이므로 행렬식은 대각성분의 곱 $3\\cdot2\\cdot(-1)=-6$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 2,
        q: '$3\\times3$ 행렬 $A$의 행렬식이 5입니다. $A$의 두 행을 바꾼 뒤, 한 행에 3을 곱해 만든 행렬 $B$의 행렬식은 무엇입니까?',
        choices: ['$15$', '$-15$', '$-5$', '$-135$'],
        answer: 1,
        why: [
          '두 행을 바꾸면 행렬식의 부호가 바뀝니다.',
          '',
          '한 행에 3을 곱하면 행렬식도 3배가 됩니다.',
          '한 행에만 3을 곱했으므로 $3^3$배가 아니라 3배입니다. $3^3$배는 모든 행에 3을 곱한 $3A$일 때입니다.',
        ],
        explain: '행 교환으로 $-5$, 한 행에 3을 곱해 $3\\cdot(-5)=-15$입니다.',
      },
      {
        id: 'p5', level: 1, type: 'ox', concept: 2,
        q: '행렬의 한 행에 다른 행의 상수배를 더해도 행렬식은 변하지 않습니다.',
        answer: true,
        explain: '치환 연산은 행렬식을 바꾸지 않습니다. 그래서 소거법으로 삼각행렬을 만들어 행렬식을 구할 수 있습니다. 바뀌는 것은 행 교환(부호)과 한 행의 $k$배($k$배)입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 3,
        q: '역행렬이 **없는** 행렬은 무엇입니까?',
        choices: [
          '$' + BM([[2, 4], [3, 5]]) + '$',
          '$' + BM([[2, 4], [3, 6]]) + '$',
          '$' + BM([[1, 0], [0, -1]]) + '$',
          '$' + BM([[0, 1], [1, 0]]) + '$',
        ],
        answer: 1,
        why: [
          '행렬식이 $10-12=-2\\ne0$이므로 역행렬이 있습니다.',
          '',
          '행렬식이 $-1\\ne0$이므로 역행렬이 있습니다. 음수여도 0만 아니면 됩니다.',
          '행렬식이 $0-1=-1\\ne0$이므로 역행렬이 있습니다. 대각성분이 0이어도 괜찮습니다.',
        ],
        explain: '$' + VM([[2, 4], [3, 6]]) + '=12-12=0$이므로 역행렬이 없습니다. 둘째 행 $(3, 6)$이 첫째 행 $(2, 4)$의 $\\frac{3}{2}$배라서 행렬식이 0이 됩니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', concept: 4,
        q: '크래머 공식으로 $y$의 값을 구하세요.\n\n$\\begin{cases} x+2y=7 \\\\ 3x-y=7 \\end{cases}$',
        answer: '2',
        wrong: [
          { a: '3', why: '$x$의 값입니다. $y$를 구하려면 둘째 열을 상수항으로 바꿉니다.' },
          { a: '-2', why: '분모나 분자의 부호를 놓쳤습니다. $\\det A=-7$, $\\det A_2=-14$입니다.' },
        ],
        explain: '$\\det A=' + VM([[1, 2], [3, -1]]) + '=-1-6=-7$, $\\det A_2=' + VM([[1, 7], [3, 7]]) + '=7-21=-14$이므로 $y=\\dfrac{-14}{-7}=2$입니다. (이때 $x=3$)',
      },
      {
        id: 'p8', level: 1, type: 'short', check: 'number', concept: 5,
        q: '그림처럼 두 벡터 $\\mathbf{u}=(3, 1)$, $\\mathbf{v}=(1, 4)$가 만드는 평행사변형의 넓이를 구하세요.',
        fig: {
          type: 'coord', xmin: -1, xmax: 5, ymin: -1, ymax: 6,
          segments: [
            { from: [0, 0], to: [3, 1] }, { from: [3, 1], to: [4, 5] },
            { from: [4, 5], to: [1, 4] }, { from: [1, 4], to: [0, 0] },
          ],
          points: [{ x: 3, y: 1, label: 'u' }, { x: 1, y: 4, label: 'v' }],
          alt: '원점에서 출발한 두 벡터 (3, 1)과 (1, 4)가 만드는 평행사변형',
        },
        answer: '11',
        wrong: [{ a: '13', why: '두 대각선의 곱을 더했습니다. 넓이는 $|ad-bc|$입니다.' }],
        explain: '$\\left|' + VM([[3, 1], [1, 4]]) + '\\right|=|12-1|=11$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', concept: 3,
        q: '$3\\times3$ 행렬 $A$의 행렬식이 3일 때, $\\det(2A^{-1})$의 값을 구하세요.',
        answer: '8/3',
        hint: '$\\det(kB)=k^3\\det B$와 $\\det(A^{-1})=\\frac{1}{\\det A}$을 함께 써 보세요.',
        wrong: [
          { a: '2/3', why: '$\\det(2B)$를 $2\\det B$로 계산했습니다. $3\\times3$ 행렬이므로 $2^3=8$배입니다.' },
          { a: '24', why: '역행렬의 행렬식은 $\\det A$가 아니라 그 역수 $\\frac{1}{3}$입니다.' },
          { a: '6', why: '역행렬의 행렬식을 3으로, 상수배를 2배로 계산했습니다. $\\det(2A^{-1})=2^3\\cdot\\frac{1}{3}$입니다.' },
        ],
        explain: '$\\det(2A^{-1})=2^3\\det(A^{-1})=8\\cdot\\dfrac{1}{3}=\\dfrac{8}{3}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', concept: 4,
        q: '$A=' + BM([[1, 2, 0], [0, 1, 3], [1, 0, 1]]) + '$의 수반행렬 $\\operatorname{adj}(A)$의 $(1, 2)$ 성분을 구하세요.',
        answer: '-2',
        hint: '수반행렬은 여인수 행렬의 **전치**입니다. $(\\operatorname{adj}(A))_{12}=C_{21}$입니다.',
        wrong: [{ a: '3', why: '$C_{12}$를 구했습니다. 수반행렬은 여인수 행렬을 전치한 것이라 $(1, 2)$ 성분은 $C_{21}$입니다.' }],
        explain: '$(\\operatorname{adj}(A))_{12}=C_{21}=(-1)^{2+1}' + VM([[2, 0], [0, 1]]) + '=-(2-0)=-2$입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', concept: 5,
        q: '세 벡터 $\\mathbf{u}=(1, 0, 2)$, $\\mathbf{v}=(0, 3, 1)$, $\\mathbf{w}=(2, 1, 0)$이 만드는 평행육면체의 부피를 구하세요.',
        answer: '13',
        wrong: [{ a: '-13', why: '행렬식은 $-13$이지만 부피는 그 **절댓값**입니다.' }],
        explain: '세 벡터를 행으로 하는 행렬식을 1행으로 전개하면 $' + VM([[1, 0, 2], [0, 3, 1], [2, 1, 0]]) + '=1(0-1)-0+2(0-6)=-13$입니다. 부피는 절댓값 13입니다.',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 3,
        q: '행렬 $' + BM([[1, 2, 0], [2, 'k', 1], [0, 1, 1]]) + '$의 역행렬이 존재하지 않도록 하는 $k$의 값을 구하세요.',
        answer: '5',
        hint: '역행렬이 없을 조건은 행렬식이 0인 것입니다.',
        wrong: [{ a: '-5', why: '행렬식 $k-5=0$에서 부호를 잘못 옮겼습니다.' }],
        explain: '1행으로 전개하면 $1\\cdot(k-1)-2\\cdot(2-0)+0=k-5$입니다. 역행렬이 없으려면 행렬식이 0이어야 하므로 $k=5$입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$3\\times3$ 행렬 $A$의 행렬식이 2일 때, $\\det(\\operatorname{adj}(A))$의 값을 구하세요.',
        answer: '4',
        hint: '$A\\,\\operatorname{adj}(A)=(\\det A)I$의 양변의 행렬식을 비교해 보세요.',
        wrong: [
          { a: '2', why: '수반행렬의 행렬식이 $\\det A$와 같다고 보았습니다. $(\\det A)I$의 행렬식은 $(\\det A)^3$입니다.' },
          { a: '8', why: '$\\det((\\det A)I)=2^3=8$에서 멈췄습니다. 이 값은 $\\det A\\cdot\\det(\\operatorname{adj}(A))$이므로 $\\det A=2$로 나눕니다.' },
        ],
        explain: '$A\\,\\operatorname{adj}(A)=(\\det A)I=2I$의 양변의 행렬식을 구하면 $\\det A\\cdot\\det(\\operatorname{adj}(A))=2^3=8$입니다. $\\det A=2$이므로 $\\det(\\operatorname{adj}(A))=4$입니다. (일반적으로 $n\\times n$이면 $(\\det A)^{n-1}$)',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 2,
        q: '행렬식의 값을 구하세요.\n\n$' + VM([[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3], [1, 2, 3, 4]]) + '$',
        answer: '1',
        hint: '아래 행에서 바로 윗행을 빼 보세요.',
        wrong: [{ a: '24', why: '대각성분 $1\\cdot2\\cdot3\\cdot4$를 곱했습니다. 삼각행렬이 아니므로 먼저 행 연산으로 삼각행렬을 만들어야 합니다.' }],
        explain: '$R_4-R_3$, $R_3-R_2$, $R_2-R_1$을 차례로 하면(치환 연산은 행렬식을 바꾸지 않습니다) $' + VM([[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]]) + '$이 됩니다. 위삼각행렬이므로 행렬식은 $1\\cdot1\\cdot1\\cdot1=1$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 5,
        q: '좌표평면의 세 점 $(1, 1)$, $(4, 2)$, $(2, 5)$를 꼭짓점으로 하는 삼각형의 넓이를 구하세요.',
        answer: '11/2',
        hint: '한 꼭짓점에서 나머지 두 꼭짓점으로 가는 벡터를 만들어 보세요. 삼각형은 평행사변형의 절반입니다.',
        wrong: [{ a: '11', why: '평행사변형의 넓이를 구했습니다. 삼각형은 그 절반입니다.' }],
        explain: '$(1, 1)$에서 나머지 두 점으로 가는 벡터는 $(3, 1)$, $(1, 4)$입니다. 두 벡터가 만드는 평행사변형의 넓이는 $|3\\cdot4-1\\cdot1|=11$이고, 삼각형은 그 절반이므로 $\\dfrac{11}{2}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 3,
        q: '$3\\times3$ 행렬 $A$가 $A^{T}=-A$를 만족합니다. $\\det A$에 대해 옳은 것은 무엇입니까?',
        choices: ['항상 0이다', '항상 1이다', '항상 $-1$이다', '$A$에 따라 다르므로 정할 수 없다'],
        answer: 0,
        why: [
          '',
          '$A=O$도 조건을 만족하는데 그때 행렬식은 0입니다.',
          '$\\det(-A)=(-1)^3\\det A$를 이용하면 $\\det A=-\\det A$가 됩니다. $-1$은 이 식을 만족하지 않습니다.',
          '$\\det(A^{T})=\\det A$와 $\\det(-A)=(-1)^3\\det A$를 함께 쓰면 값이 하나로 정해집니다.',
        ],
        hint: '$\\det(A^{T})$와 $\\det(-A)$를 각각 $\\det A$로 나타내 보세요.',
        explain: '$\\det A=\\det(A^{T})=\\det(-A)=(-1)^3\\det A=-\\det A$이므로 $2\\det A=0$, 곧 $\\det A=0$입니다. $A^{T}=-A$를 만족하는 행렬이면 크기 $n$이 홀수일 때 언제나 같은 결론이 나옵니다($(-1)^n=-1$이므로).',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', concept: 4,
        q: '크래머 공식으로 $z$의 값을 구하세요.\n\n$\\begin{cases} x+2y-z=2 \\\\ 2x-y+z=3 \\\\ x+y+2z=9 \\end{cases}$',
        answer: '3',
        hint: '$\\det A$와, 셋째 열을 상수항으로 바꾼 $\\det A_3$을 구합니다.',
        wrong: [
          { a: '-3', why: '분자나 분모 가운데 하나의 부호를 놓쳤습니다. $\\det A=-12$, $\\det A_3=-36$으로 둘 다 음수입니다.' },
          { a: '2', why: '$y$의 값입니다. $z$를 구하려면 셋째 열을 상수항으로 바꿉니다.' },
        ],
        explain: '$\\det A=' + VM([[1, 2, -1], [2, -1, 1], [1, 1, 2]]) + '=1(-2-1)-2(4-1)+(-1)(2+1)=-12$\n\n' +
          '$\\det A_3=' + VM([[1, 2, 2], [2, -1, 3], [1, 1, 9]]) + '=1(-9-3)-2(18-3)+2(2+1)=-36$\n\n' +
          '$z=\\dfrac{-36}{-12}=3$입니다. (해는 $x=1, y=2, z=3$)',
      },
    ],

    deeper: [
      {
        title: '행렬식의 본래 정의와 계산량',
        body: '행렬식은 원래 "각 행과 각 열에서 성분을 하나씩 골라 곱한 것"을 모두 부호를 붙여 더한 값으로 정의됩니다. $n\\times n$ 행렬이면 이런 곱이 $n!$개 있습니다. 여인수 전개도 결국 이 $n!$개를 다 더하는 방법이라 $10\\times10$이면 300만 개가 넘는 곱을 다뤄야 합니다.\n\n' +
          '반면 행 연산으로 삼각행렬을 만드는 방법은 계산량이 대략 $n^3$에 비례합니다. 그래서 컴퓨터는 행렬식을 거의 언제나 소거법으로 구합니다. 여인수 전개는 작은 행렬, 0이 많은 행렬, 그리고 성질을 증명할 때 쓰는 도구입니다.',
      },
      {
        title: '넓이의 배율과 미적분',
        body: '행렬 $A$로 평면을 바꾸면 모든 도형의 넓이가 $|\\det A|$배가 됩니다. 이 사실은 다변수 미적분에서 **변수 바꾸기**의 핵심입니다. 곡선 좌표(예: 극좌표)로 이중적분을 바꿀 때, 아주 작은 조각에서는 변환이 거의 일차 변환처럼 보이므로 그 조각의 넓이 배율을 행렬식으로 구합니다. 이것이 야코비 행렬식이며, 극좌표에서 $dA=r\\,dr\\,d\\theta$의 $r$이 바로 그 값입니다.',
      },
    ],

    faq: [
      {
        q: '행렬식이 음수면 넓이도 음수인가요?',
        a: '아닙니다. 넓이와 부피는 행렬식의 **절댓값**입니다. 행렬식의 부호는 방향을 알려 줍니다. 두 벡터의 순서를 바꾸면 행렬식의 부호는 바뀌지만 평행사변형은 그대로이니 넓이도 같습니다.',
      },
      {
        q: '여인수 전개는 아무 행이나 열로 해도 정말 같은가요?',
        a: '네, 같습니다. 행렬식은 행렬에 하나로 정해지는 수이고, 어느 행이나 열로 전개해도 같은 값이 나온다는 것이 증명되어 있습니다. 그래서 0이 가장 많은 줄을 고르는 것이 요령입니다. 다만 각 항의 부호 $(-1)^{i+j}$은 고른 줄에 맞게 바둑판 무늬로 붙여야 합니다.',
      },
      {
        q: '$\\det(A+B)=\\det A+\\det B$인가요?',
        a: '일반적으로 아닙니다. 행렬식은 곱에 대해서만 $\\det(AB)=\\det A\\det B$가 성립합니다. 예를 들어 $A=B=I_2$이면 $\\det(A+B)=\\det(2I_2)=4$인데 $\\det A+\\det B=2$입니다.',
      },
    ],

    mistakes: [
      '$\\det(kA)=k\\det A$로 계산하는 실수 — $n\\times n$ 행렬이면 행 $n$개에 모두 $k$가 곱해지므로 $k^n\\det A$입니다.',
      '여인수 전개에서 부호 $(-1)^{i+j}$을 빠뜨리는 실수 — 1행으로 전개하면 $+, -, +$ 순서입니다.',
      '수반행렬의 $(i, j)$ 성분을 $C_{ij}$로 쓰는 실수 — 여인수 행렬을 전치해야 하므로 $C_{ji}$입니다.',
    ],

    gens: [
      {
        id: 'det2',
        level: 1,
        title: '2×2 행렬식 계산',
        make: function (R) {
          var a = R.nonzero(-6, 6), b = R.nonzero(-6, 6), c = R.nonzero(-6, 6), d = R.nonzero(-6, 6);
          var ans = a * d - b * c;
          var p = R.fmt.paren;
          return {
            type: 'short', check: 'number', concept: 0,
            q: '행렬식의 값을 구하세요.\n\n$' + VM([[a, b], [c, d]]) + '$',
            answer: String(ans),
            wrong: wrongList(ans, [
              [a * d + b * c, '두 대각선의 곱을 더했습니다. $ad-bc$이므로 빼야 합니다.'],
              [b * c - a * d, '순서를 바꾸어 $bc-ad$를 계산했습니다.'],
            ]),
            explain: '$ad-bc=' + p(a) + '\\cdot' + p(d) + '-' + p(b) + '\\cdot' + p(c) + '=' + (a * d) + '-' + p(b * c) + '=' + ans + '$입니다.',
          };
        },
      },
      {
        id: 'det3-cofactor',
        level: 2,
        title: '여인수 전개로 3×3 행렬식 구하기',
        make: function (R) {
          var A, zeros;
          do {
            A = [];
            for (var i = 0; i < 3; i++) { A.push([]); for (var j = 0; j < 3; j++) A[i].push(R.int(-3, 4)); }
            zeros = 0;
            A.forEach(function (r) { r.forEach(function (x) { if (x === 0) zeros++; }); });
          } while (zeros < 1 || zeros > 4);
          // 0 이 가장 많은 줄(행 또는 열)을 고른다
          var best = { kind: 'row', idx: 0, z: -1 };
          for (var t = 0; t < 3; t++) {
            var zr = A[t].filter(function (x) { return x === 0; }).length;
            var zc = [A[0][t], A[1][t], A[2][t]].filter(function (x) { return x === 0; }).length;
            if (zr > best.z) best = { kind: 'row', idx: t, z: zr };
            if (zc > best.z) best = { kind: 'col', idx: t, z: zc };
          }
          var ans = det3(A);
          var parts = [], nums = [], noSign = 0;
          for (var k = 0; k < 3; k++) {
            var ii = best.kind === 'row' ? best.idx : k, jj = best.kind === 'row' ? k : best.idx;
            var e = A[ii][jj];
            var m = det2(minor(A, ii, jj));
            var s = (ii + jj) % 2 === 0 ? 1 : -1;
            noSign += e * m;
            if (e === 0) continue;
            parts.push((s > 0 ? '+' : '-') + R.fmt.paren(e) + VM(minor(A, ii, jj)));
            nums.push((s > 0 ? '+' : '-') + R.fmt.paren(e) + '\\cdot' + R.fmt.paren(m));
          }
          var line = (best.kind === 'row' ? (best.idx + 1) + '행' : (best.idx + 1) + '열');
          var expr = parts.join('').replace(/^\+/, '');
          var expr2 = nums.join('').replace(/^\+/, '');
          return {
            type: 'short', check: 'number', concept: 1,
            q: '여인수 전개로 행렬식의 값을 구하세요.\n\n$' + VM(A) + '$',
            answer: String(ans),
            hint: '0이 가장 많은 행이나 열을 골라 전개하면 계산이 줄어듭니다.',
            wrong: wrongList(ans, [
              [noSign, '여인수의 부호 $(-1)^{i+j}$을 빠뜨렸습니다. 바둑판 무늬 $+, -, +$를 붙여야 합니다.'],
              [-ans, '부호를 거꾸로 붙였습니다. $(1, 1)$ 자리가 $+$인 바둑판 무늬입니다.'],
            ]),
            explain: expr
              ? '0이 가장 많은 ' + line + '을 따라 전개합니다(부호는 바둑판 무늬).\n\n$' + VM(A) + '=' + expr + '$\n\n$=' + expr2 + '=' + ans + '$'
              : line + '의 성분이 모두 0입니다. 이 줄을 따라 전개하면 모든 항이 0이므로 행렬식은 0입니다.',
          };
        },
      },
      {
        id: 'det-props',
        level: 2,
        title: '행렬식의 성질 이용하기',
        make: function (R) {
          var n = R.pick([2, 3]);
          var d = R.nonzero(-5, 5);
          var k = R.pick([2, 3, -2, -1]);
          var form = R.pick(['kA', 'inv', 'kAT', 'sq', 'kinv', 'adj']);
          var kn = Math.pow(k, n);
          var kTex = k === -1 ? '-' : String(k);
          var tex, ans, wl, ex;
          if (form === 'kA') {
            tex = kTex + 'A'; ans = R.F(kn * d, 1);
            wl = [[R.F(k * d, 1), '$\\det(kA)=k\\det A$로 계산했습니다. $' + n + '$개의 행에 모두 $' + k + '$' + R.josa(k, '이/가') + ' 곱해지므로 $' + R.fmt.paren(k) + '^{' + n + '}$배입니다.']];
            ex = '$\\det(' + tex + ')=' + R.fmt.paren(k) + '^{' + n + '}\\det A=' + kn + '\\cdot' + R.fmt.paren(d) + '=' + ans.toTex() + '$';
          } else if (form === 'inv') {
            tex = 'A^{-1}'; ans = R.F(1, d);
            wl = [[R.F(d, 1), '역행렬의 행렬식은 원래 행렬식의 **역수**입니다.'], [R.F(-1, d), '부호를 바꿀 이유가 없습니다. $\\det(A^{-1})=\\frac{1}{\\det A}$입니다.']];
            ex = '$\\det A\\cdot\\det(A^{-1})=\\det I=1$이므로 $\\det(A^{-1})=' + ans.toTex() + '$';
          } else if (form === 'kAT') {
            tex = kTex + 'A^{T}'; ans = R.F(kn * d, 1);
            wl = [[R.F(k * d, 1), '상수배는 $' + n + '$개의 행에 모두 곱해지므로 $' + R.fmt.paren(k) + '^{' + n + '}$배입니다.']];
            ex = '$\\det(A^{T})=\\det A$이므로 $\\det(' + tex + ')=' + R.fmt.paren(k) + '^{' + n + '}\\det A=' + kn + '\\cdot' + R.fmt.paren(d) + '=' + ans.toTex() + '$';
          } else if (form === 'sq') {
            tex = 'A^{3}'; ans = R.F(d * d * d, 1);
            wl = [[R.F(3 * d, 1), '$\\det(A^3)$은 $\\det A$를 세 번 곱한 값입니다. 3배가 아닙니다.']];
            ex = '$\\det(A^3)=\\det(A)\\det(A)\\det(A)=' + R.fmt.paren(d) + '^{3}=' + ans.toTex() + '$';
          } else if (form === 'kinv') {
            tex = kTex + 'A^{-1}'; ans = R.F(kn, d);
            wl = [[R.F(k, d), '상수배는 $' + n + '$개의 행에 모두 곱해지므로 $' + R.fmt.paren(k) + '^{' + n + '}$배입니다.'], [R.F(kn * d, 1), '역행렬의 행렬식은 $\\det A$의 역수입니다.']];
            ex = '$\\det(' + tex + ')=' + R.fmt.paren(k) + '^{' + n + '}\\det(A^{-1})=' + kn + '\\cdot' + (d < 0 ? '\\left(-\\dfrac{1}{' + (-d) + '}\\right)' : '\\dfrac{1}{' + d + '}') + '=' + ans.toTex() + '$';
          } else {
            tex = '\\operatorname{adj}(A)'; ans = R.F(Math.pow(d, n - 1), 1);
            wl = [[R.F(d, 1), '수반행렬의 행렬식이 $\\det A$와 같다고 보았습니다. $A\\,\\operatorname{adj}(A)=(\\det A)I$의 행렬식을 비교해 보세요.'], [R.F(Math.pow(d, n), 1), '$\\det((\\det A)I)=(\\det A)^{' + n + '}$에서 멈췄습니다. 이 값을 $\\det A$로 나눕니다.']];
            ex = '$A\\,\\operatorname{adj}(A)=(\\det A)I$의 양변의 행렬식을 구하면 $\\det A\\cdot\\det(\\operatorname{adj}(A))=' + R.fmt.paren(d) + '^{' + n + '}$이므로 $\\det(\\operatorname{adj}(A))=' + (n - 1 === 1 ? '' : R.fmt.paren(d) + '^{' + (n - 1) + '}=') + ans.toTex() + '$';
          }
          var ansStr = ans.toString();
          return {
            type: 'short', check: 'number', concept: form === 'adj' ? 4 : (form === 'kA' || form === 'kAT' ? 2 : 3),
            q: '$' + n + '\\times' + n + '$ 행렬 $A$의 행렬식이 $' + d + '$일 때, $\\det(' + tex + ')$의 값을 구하세요.',
            answer: ansStr,
            wrong: wrongList(ansStr, wl.map(function (w) { return [w[0].toString(), w[1]]; })),
            explain: ex + '입니다.',
          };
        },
      },
      {
        id: 'triangle-area',
        level: 3,
        title: '행렬식으로 삼각형의 넓이 구하기',
        make: function (R) {
          var P, Q, S, D;
          do {
            P = [R.int(-4, 4), R.int(-3, 4)]; Q = [R.int(-4, 4), R.int(-3, 4)]; S = [R.int(-4, 4), R.int(-3, 4)];
            D = (Q[0] - P[0]) * (S[1] - P[1]) - (Q[1] - P[1]) * (S[0] - P[0]);
          } while (D === 0 || Math.abs(D) < 3);
          var u = [Q[0] - P[0], Q[1] - P[1]], v = [S[0] - P[0], S[1] - P[1]];
          var area = R.F(Math.abs(D), 2);
          var pt = function (X) { return '(' + X[0] + ', ' + X[1] + ')'; };
          return {
            type: 'short', check: 'number', concept: 5,
            q: '좌표평면의 세 점 $\\mathrm{A}' + pt(P) + '$, $\\mathrm{B}' + pt(Q) + '$, $\\mathrm{C}' + pt(S) + '$' + R.josa(S[1], '을/를') + ' 꼭짓점으로 하는 삼각형의 넓이를 구하세요.',
            fig: {
              type: 'coord', xmin: -5, xmax: 5, ymin: -4, ymax: 5,
              segments: [{ from: P, to: Q }, { from: Q, to: S }, { from: S, to: P }],
              points: [{ x: P[0], y: P[1], label: 'A' }, { x: Q[0], y: Q[1], label: 'B' }, { x: S[0], y: S[1], label: 'C' }],
              alt: '세 점 A, B, C를 이은 삼각형',
            },
            answer: area.toString(),
            hint: '$\\overrightarrow{\\mathrm{AB}}$, $\\overrightarrow{\\mathrm{AC}}$가 만드는 평행사변형의 절반입니다.',
            wrong: wrongList(area.toString(), [
              [String(Math.abs(D)), '평행사변형의 넓이를 구했습니다. 삼각형은 그 절반입니다.'],
              [R.F(D, 2).toString(), '행렬식의 절댓값을 취하지 않았습니다. 넓이는 음수가 될 수 없습니다.'],
            ]),
            explain: '$\\overrightarrow{\\mathrm{AB}}=' + pt(u) + '$, $\\overrightarrow{\\mathrm{AC}}=' + pt(v) + '$입니다. 두 벡터로 만든 행렬식은 $' + VM([[u[0], v[0]], [u[1], v[1]]]) + '=' + R.fmt.paren(u[0]) + '\\cdot' + R.fmt.paren(v[1]) + '-' + R.fmt.paren(v[0]) + '\\cdot' + R.fmt.paren(u[1]) + '=' + D + '$이므로 평행사변형의 넓이는 $' + Math.abs(D) + '$, 삼각형의 넓이는 그 절반인 $' + area.toTex() + '$입니다.',
          };
        },
      },
    ],
  });
})();
