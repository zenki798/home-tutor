/* 다시 배우는 기초 수학 · 도형의 넓이와 부피
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 원주율은 모두 3.14로 계산한다(문제 글에 밝힌다). 소수 계산은 정수(100배·1000배)로 한 뒤 R.fmt.dec 로 적는다.
 * 그림: 다각형은 polygon, 직육면체는 cuboid, 원기둥은 아래 도우미가 직접 그린 svg */
(function () {
  function T(x, y, s, anchor) {
    return '<text x="' + x + '" y="' + y + '" font-size="14" text-anchor="' + (anchor || 'middle') + '" fill="currentColor">' + s + '</text>';
  }
  var LINE = 'stroke="currentColor" stroke-width="2"';
  var DASH = 'stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" fill="none"';

  // 원기둥 겨냥도. lab: { r, d, h } (반지름·지름·높이 글, 없으면 그리지 않는다)
  function cyl(lab, alt) {
    lab = lab || {};
    var s = '<svg viewBox="0 0 260 230">' +
      '<path d="M40 40 L40 190 A60 16 0 0 0 160 190 L160 40 A60 16 0 0 1 40 40 Z" fill="var(--fig-1)" fill-opacity="0.2"/>' +
      '<ellipse cx="100" cy="40" rx="60" ry="16" fill="var(--fig-2)" fill-opacity="0.35" ' + LINE + '/>' +
      '<path d="M40 190 A60 16 0 0 1 160 190" ' + DASH + '/>' +
      '<path d="M40 190 A60 16 0 0 0 160 190" fill="none" ' + LINE + '/>' +
      '<line x1="40" y1="40" x2="40" y2="190" ' + LINE + '/><line x1="160" y1="40" x2="160" y2="190" ' + LINE + '/>';
    if (lab.r) s += '<circle cx="100" cy="40" r="2.5" fill="currentColor"/><line x1="100" y1="40" x2="160" y2="40" ' + LINE + '/>' + T(130, 18, lab.r);
    if (lab.d) s += '<circle cx="100" cy="40" r="2.5" fill="currentColor"/><line x1="40" y1="40" x2="160" y2="40" ' + LINE + '/>' + T(100, 18, lab.d);
    if (lab.h) s += '<line x1="182" y1="40" x2="182" y2="190" stroke="currentColor" stroke-width="1.5"/><line x1="176" y1="40" x2="188" y2="40" stroke="currentColor" stroke-width="1.5"/><line x1="176" y1="190" x2="188" y2="190" stroke="currentColor" stroke-width="1.5"/>' + T(192, 120, lab.h, 'start');
    return { type: 'svg', svg: s + '</svg>', alt: alt };
  }
  // 직각삼각형: 밑의 변 a(가로), 왼쪽 변 b(세로), 빗변 c — 글이 null 이면 쓰지 않는다
  function rightTri(a, b, la, lb, lc, alt) {
    return { type: 'polygon', points: [[0, 0], [a, 0], [0, b]], sides: [la, lc, lb], angles: [{ at: 0, right: true }], alt: alt };
  }
  function box(w, d, h, unit, alt) {
    return { type: 'cuboid', w: w, h: h, d: d, labels: { w: w + ' ' + unit, h: h + ' ' + unit, d: d + ' ' + unit },
      alt: alt || ('가로 ' + w + ' ' + unit + ', 세로 ' + d + ' ' + unit + ', 높이 ' + h + ' ' + unit + '인 직육면체') };
  }

  Tutor.registerUnit({
    id: 'math-a-basic-10',
    course: 'math-a-basic',
    title: '도형의 넓이와 부피',
    summary: '삼각형·사각형·원의 넓이와 직육면체·원기둥의 부피를 구하고, 넓이와 부피의 단위를 바꿉니다.',
    goals: [
      '직사각형·평행사변형·삼각형·사다리꼴의 넓이를 구하는 방법을 설명하고 넓이를 구할 수 있습니다.',
      '원주율의 뜻을 알고 원의 둘레와 넓이를 구할 수 있습니다.',
      '직육면체와 원기둥의 부피를 구하고, cm²와 m², cm³와 L 사이의 단위를 바꿀 수 있습니다.',
      '피타고라스 정리로 직각삼각형의 모르는 변의 길이를 구하고 계산기로 어림할 수 있습니다.',
    ],
    standards: [],

    concepts: [
      {
        title: '사각형과 삼각형의 넓이',
        body: '넓이는 한 변이 1 cm인 정사각형(1 cm²)이 몇 개 들어가는지로 잽니다. 모든 공식은 **직사각형**에서 출발합니다.\n\n| 도형 | 넓이 | 이유 |\n|---|---|---|\n| 직사각형 | (가로)×(세로) | 1 cm² 정사각형이 가로줄·세로줄로 놓입니다 |\n| 평행사변형 | (밑변)×(높이) | 한쪽 삼각형을 잘라 반대쪽에 붙이면 직사각형이 됩니다 |\n| 삼각형 | (밑변)×(높이)÷2 | 똑같은 삼각형 두 개를 붙이면 평행사변형이 됩니다 |\n| 사다리꼴 | (윗변+아랫변)×(높이)÷2 | 똑같은 사다리꼴 두 개를 거꾸로 붙이면 밑변이 (윗변+아랫변)인 평행사변형이 됩니다 |\n\n여기서 **높이**는 밑변과 **수직**으로 잰 거리입니다. 기울어진 옆 변의 길이가 아닙니다.\n\n예: 그림의 사다리꼴은 윗변 6 cm, 아랫변 10 cm, 높이 4 cm이므로 넓이는 $(6+10)\\times4\\div2=32$ (cm²)입니다.\n\n> ⚠️ 삼각형과 사다리꼴은 마지막에 **÷2**를 합니다. 이것을 빠뜨리는 실수가 가장 흔합니다.',
        easy: '종이 평행사변형을 떠올려 보세요. 한쪽 끝의 삼각형 부분을 가위로 잘라 반대쪽에 붙이면 반듯한 직사각형이 됩니다. 이때 직사각형의 세로는 기울어진 변이 아니라 **똑바로 선 높이**입니다. 그래서 (밑변)×(높이)입니다.\n\n삼각형은 "똑같은 삼각형 두 장을 붙이면 평행사변형"이므로 평행사변형 넓이의 절반입니다.',
        fig: { type: 'polygon', points: [[0, 0], [10, 0], [8, 4], [2, 4]], sides: ['10 cm', null, '6 cm', null], segments: [{ from: [2, 4], to: [2, 0], dashed: true, right: true, label: '4 cm' }], alt: '윗변 6 cm, 아랫변 10 cm, 높이 4 cm인 사다리꼴' },
        check: {
          type: 'short', check: 'number', unit: 'cm²',
          q: '밑변이 8 cm, 높이가 5 cm, 기울어진 옆 변이 6 cm인 평행사변형의 넓이는 몇 cm²입니까?',
          answer: '40',
          wrong: [{ a: '48', why: '기울어진 옆 변 6 cm를 곱했습니다. 평행사변형의 넓이는 (밑변)×(높이)입니다.' }, { a: '20', why: '2로 나누었습니다. 2로 나누는 것은 삼각형과 사다리꼴입니다.' }],
          explain: '(밑변)×(높이) $=8\\times5=40$이므로 40 cm²입니다. 옆 변 6 cm는 넓이 계산에 쓰지 않습니다.',
        },
      },
      {
        title: '원주율과 원의 둘레·넓이',
        body: '원의 크기와 상관없이 **(원의 둘레) ÷ (지름)** 은 늘 같은 값, 약 3.14159…입니다. 이 값을 **원주율**이라 하고 기호 $\\pi$(파이)로 씁니다. 계산에서는 보통 **3.14**로 어림합니다. 원의 둘레를 **원주**라고도 합니다.\n\n(원의 둘레) = (지름)×(원주율) = (반지름)×2×(원주율) $=2\\pi r$\n\n(원의 넓이) = (반지름)×(반지름)×(원주율) $=\\pi r^{2}$\n\n넓이 공식의 이유: 원을 피자처럼 아주 잘게 잘라 엇갈리게 늘어놓으면 직사각형에 가까워집니다. 가로는 둘레의 절반($\\pi r$), 세로는 반지름($r$)이므로 넓이는 $\\pi r\\times r=\\pi r^{2}$입니다.\n\n예: 반지름 5 cm인 원의 둘레는 $5\\times2\\times3.14=31.4$ (cm), 넓이는 $5\\times5\\times3.14=78.5$ (cm²)입니다.\n\n> ⚠️ 문제에 **지름**이 주어졌으면 넓이를 구하기 전에 반으로 나누어 반지름을 구합니다.',
        easy: '둥근 컵 둘레에 실을 한 바퀴 감은 뒤 그 실을 펴서 컵 지름과 비교해 보면, 실은 지름의 3배보다 조금 깁니다. 이 "3배와 조금"이 3.14, 곧 원주율입니다. 큰 접시로 해도 작은 동전으로 해도 같습니다.\n\n그래서 둘레는 "지름 × 3.14"입니다. 넓이는 반지름을 한 변으로 하는 정사각형 넓이의 약 3.14배입니다.',
        fig: { type: 'circle', r: '5 cm', showCenter: true, showRadius: true, alt: '반지름이 5 cm인 원' },
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '반지름이 5 cm인 원의 둘레는 몇 cm입니까? (원주율은 3.14로 계산합니다.)',
          answer: '31.4',
          wrong: [{ a: '15.7', why: '반지름에 원주율을 곱했습니다. 둘레는 지름(반지름의 2배)에 원주율을 곱합니다.' }, { a: '78.5', why: '넓이를 구했습니다. 둘레는 (반지름)×2×(원주율)입니다.' }],
          explain: '지름은 $5\\times2=10$ cm이므로 둘레는 $10\\times3.14=31.4$ (cm)입니다.',
        },
      },
      {
        title: '직육면체와 원기둥의 부피',
        body: '부피는 한 모서리가 1 cm인 정육면체(**1 cm³**, 세제곱센티미터)가 몇 개 들어가는지로 잽니다.\n\n직육면체는 바닥에 1 cm³ 쌓기나무를 (가로)×(세로)개 깔고, 그것을 (높이)층 쌓은 것입니다.\n\n(직육면체의 부피) = (가로)×(세로)×(높이) = (밑넓이)×(높이)\n\n원기둥도 같은 생각입니다. 밑면인 원을 높이만큼 쌓아 올린 것이므로\n\n(원기둥의 부피) = (밑넓이)×(높이) = (반지름)×(반지름)×(원주율)×(높이)\n\n예: 반지름 3 cm, 높이 10 cm인 원기둥의 부피는 $3\\times3\\times3.14\\times10=282.6$ (cm³)입니다.\n\n> 💡 기둥 모양(밑면과 윗면이 같고 옆면이 곧게 선 입체)의 부피는 모두 (밑넓이)×(높이)입니다.',
        easy: '동전을 쌓아 기둥을 만든다고 생각해 보세요. 동전 한 개의 넓이(밑넓이)에 쌓은 높이를 곱하면 기둥 전체의 부피가 됩니다.\n\n상자도 같습니다. 바닥 한 층에 놓이는 쌓기나무 수에 층 수를 곱합니다. 원기둥은 바닥이 원일 뿐, 계산 방법은 같습니다.',
        fig: cyl({ r: '3 cm', h: '10 cm' }, '반지름 3 cm, 높이 10 cm인 원기둥'),
        check: {
          type: 'ox',
          q: '원기둥의 부피는 (밑넓이)×(높이)로 구합니다.',
          answer: true,
          explain: '원기둥은 밑면인 원을 높이만큼 쌓아 올린 입체이므로 부피는 (밑넓이)×(높이), 곧 (반지름)×(반지름)×(원주율)×(높이)입니다.',
        },
      },
      {
        title: '넓이·부피·들이의 단위 바꾸기',
        body: '길이 단위 1 m = 100 cm에서 넓이와 부피의 관계가 나옵니다.\n\n| 종류 | 관계 | 이유 |\n|---|---|---|\n| 넓이 | 1 m² = 10,000 cm² | 한 변 100 cm인 정사각형: $100\\times100$ |\n| 부피 | 1 m³ = 1,000,000 cm³ | 한 모서리 100 cm인 정육면체: $100\\times100\\times100$ |\n| 들이 | 1 L = 1,000 mL = 1,000 cm³ | 한 모서리 10 cm인 정육면체: $10\\times10\\times10$ |\n| 들이 | 1 mL = 1 cm³, 1 m³ = 1,000 L | 1,000,000 cm³ ÷ 1,000 |\n\ncm²는 ㎠, m²는 ㎡, cm³는 ㎤처럼 한 글자로 쓰기도 합니다.\n\n예: 3.5 m² $=3.5\\times10000=35000$ cm², 2,400 cm³ $=2400\\div1000=2.4$ L\n\n> ⚠️ 길이가 100배이면 넓이는 $100\\times100$배, 부피는 $100\\times100\\times100$배입니다. 넓이를 바꿀 때 100만 곱하는 실수가 많습니다.',
        easy: '가로세로 1 m인 정사각형 바닥에 가로세로 1 cm인 작은 타일을 깐다고 해 봅시다. 한 줄에 100개, 그런 줄이 100줄이니 타일은 $100\\times100=10000$개가 필요합니다. 그래서 1 m²는 10,000 cm²입니다.\n\n우유 1 L는 가로·세로·높이가 10 cm인 상자 하나를 가득 채우는 양($10\\times10\\times10=1000$ cm³)입니다.',
        check: {
          type: 'short', check: 'number', unit: 'cm²',
          q: '2 m²는 몇 cm²입니까?',
          answer: '20000',
          wrong: [{ a: '200', why: '길이처럼 100만 곱했습니다. 넓이는 가로와 세로가 모두 100배가 되므로 10,000배입니다.' }],
          explain: '1 m² = $100\\times100=10000$ cm²이므로 2 m² $=2\\times10000=20000$ cm²입니다.',
        },
      },
      {
        title: '피타고라스 정리',
        body: '직각삼각형에서 직각의 맞은편에 있는 가장 긴 변을 **빗변**이라고 합니다. 직각을 낀 두 변의 길이를 $a$, $b$, 빗변의 길이를 $c$라 하면\n\n$a^{2}+b^{2}=c^{2}$\n\n이 성립합니다. 이것을 **피타고라스 정리**라고 합니다. 예를 들어 직각을 낀 두 변이 3 cm, 4 cm이면 $3^{2}+4^{2}=9+16=25=5^{2}$이므로 빗변은 5 cm입니다.\n\n제곱해서 25가 되는 양수 5를 25의 **제곱근**이라 하고 $\\sqrt{25}=5$로 씁니다. 그래서 빗변은 $c=\\sqrt{a^{2}+b^{2}}$입니다. 제곱근이 딱 떨어지지 않으면 **계산기의 √ 버튼**으로 어림합니다. 예: 두 변이 5 cm, 7 cm이면 $c=\\sqrt{25+49}=\\sqrt{74}\\approx8.6$ (cm)입니다.\n\n빗변이 아닌 변을 구할 때는 빼기를 씁니다: $b=\\sqrt{c^{2}-a^{2}}$.\n\n> 💡 거꾸로, 세 변이 $a^{2}+b^{2}=c^{2}$을 만족하면 그 삼각형은 직각삼각형입니다. 3 m, 4 m, 5 m를 재어 직각을 확인하는 방법이 여기서 나옵니다.',
        easy: '직각삼각형의 세 변 위에 각각 정사각형을 그려 보세요. 짧은 두 변 위의 정사각형 넓이를 더하면 빗변 위의 정사각형 넓이와 똑같습니다. 3 cm, 4 cm 변 위의 정사각형은 9 cm²와 16 cm², 더하면 25 cm²이고, 빗변 5 cm 위의 정사각형도 25 cm²입니다.\n\n그래서 "두 변을 각각 제곱해 더한 뒤, 그 수가 어떤 수의 제곱인지 찾으면" 빗변입니다.',
        fig: rightTri(4, 3, '4 cm', '3 cm', '5 cm', '직각을 낀 두 변이 4 cm, 3 cm이고 빗변이 5 cm인 직각삼각형'),
        check: {
          type: 'short', check: 'number', unit: 'cm',
          q: '직각을 낀 두 변의 길이가 5 cm, 12 cm인 직각삼각형의 빗변은 몇 cm입니까?',
          answer: '13',
          wrong: [{ a: '17', why: '두 변의 길이를 그냥 더했습니다. 각각 제곱해 더한 뒤 제곱근을 구합니다.' }, { a: '169', why: '제곱의 합까지 구했습니다. 마지막에 제곱해서 169가 되는 수를 찾습니다.' }],
          explain: '$5^{2}+12^{2}=25+144=169=13^{2}$이므로 빗변은 13 cm입니다.',
        },
      },
    ],

    examples: [
      {
        q: '반지름이 5 cm, 높이가 20 cm인 원기둥 모양의 통에 물을 가득 채우면 물은 몇 L입니까? (원주율은 3.14로 계산합니다.)',
        fig: cyl({ r: '5 cm', h: '20 cm' }, '반지름 5 cm, 높이 20 cm인 원기둥'),
        steps: [
          '밑넓이를 구합니다. $5\\times5\\times3.14=78.5$ (cm²)',
          '부피는 (밑넓이)×(높이)이므로 $78.5\\times20=1570$ (cm³)입니다.',
          '1 L = 1,000 cm³이므로 $1570\\div1000=1.57$ (L)입니다.',
        ],
        answer: '1.57 L',
      },
      {
        q: '가로 4 m, 세로 7 m인 직사각형 마당의 대각선 길이는 약 몇 m입니까? 계산기로 어림해 반올림하여 소수 첫째 자리까지 구하세요.',
        steps: [
          '대각선은 가로와 세로를 직각을 낀 두 변으로 하는 직각삼각형의 빗변입니다.',
          '피타고라스 정리로 $4^{2}+7^{2}=16+49=65$이므로 대각선은 $\\sqrt{65}$ m입니다.',
          '계산기로 √65를 누르면 8.0622…이므로, 소수 둘째 자리에서 반올림하면 약 8.1 m입니다.',
        ],
        answer: '약 8.1 m',
      },
    ],

    terms: [
      { term: '밑변', def: '넓이를 구할 때 기준으로 삼는 변입니다. 삼각형과 평행사변형은 어느 변이든 밑변이 될 수 있고, 높이는 그 밑변에 수직으로 잽니다.' },
      { term: '높이', def: '밑변(또는 밑면)과 수직으로 잰 거리입니다. 기울어진 옆 변의 길이와는 다릅니다.' },
      { term: '원주율', def: '원의 둘레를 지름으로 나눈 값으로, 원의 크기와 상관없이 약 3.14159…입니다. 기호는 $\\pi$이고 계산에서는 보통 3.14를 씁니다.' },
      { term: '원주', def: '원의 둘레입니다. (지름)×(원주율)로 구합니다.' },
      { term: '밑넓이', def: '기둥 모양 입체에서 밑면 하나의 넓이입니다. 직육면체와 원기둥의 부피는 (밑넓이)×(높이)입니다.' },
      { term: '부피', def: '입체가 차지하는 공간의 크기입니다. 1 cm³는 한 모서리가 1 cm인 정육면체의 부피입니다.' },
      { term: '들이', def: '그릇 안에 담을 수 있는 양입니다. 1 L = 1,000 mL = 1,000 cm³입니다.' },
      { term: '빗변', def: '직각삼각형에서 직각의 맞은편에 있는 변입니다. 세 변 가운데 가장 깁니다.' },
      { term: '제곱근', def: '제곱해서 어떤 수가 되는 수입니다. 제곱해서 25가 되는 양수는 5이고, $\\sqrt{25}=5$로 씁니다.' },
      { term: '피타고라스 정리', def: '직각삼각형에서 직각을 낀 두 변의 길이 $a$, $b$와 빗변의 길이 $c$ 사이에 $a^{2}+b^{2}=c^{2}$이 성립한다는 정리입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 0,
        q: '그림과 같이 밑변이 10 cm, 높이가 6 cm인 삼각형의 넓이는 몇 cm²입니까?',
        fig: { type: 'polygon', points: [[0, 0], [10, 0], [3, 6]], sides: ['10 cm', null, null], segments: [{ from: [3, 6], to: [3, 0], dashed: true, right: true, label: '6 cm' }], alt: '밑변 10 cm, 높이 6 cm인 삼각형' },
        answer: '30',
        wrong: [{ a: '60', why: '2로 나누는 것을 빠뜨렸습니다. 삼각형은 같은 삼각형 두 개로 만든 평행사변형의 절반입니다.' }],
        explain: '(밑변)×(높이)÷2 $=10\\times6\\div2=30$이므로 30 cm²입니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 0,
        q: '그림의 평행사변형의 넓이는 몇 cm²입니까?',
        fig: { type: 'polygon', points: [[0, 0], [9, 0], [12, 4], [3, 4]], sides: ['9 cm', '5 cm', null, null], segments: [{ from: [3, 4], to: [3, 0], dashed: true, right: true, label: '4 cm' }], alt: '밑변 9 cm, 기울어진 옆 변 5 cm, 높이 4 cm인 평행사변형' },
        answer: '36',
        wrong: [{ a: '45', why: '기울어진 옆 변 5 cm를 곱했습니다. 밑변에 수직인 높이 4 cm를 곱합니다.' }, { a: '18', why: '2로 나누었습니다. 평행사변형은 2로 나누지 않습니다.' }],
        explain: '(밑변)×(높이) $=9\\times4=36$이므로 36 cm²입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 0,
        q: '윗변이 4 cm, 아랫변이 10 cm, 높이가 6 cm인 사다리꼴의 넓이는 몇 cm²입니까?',
        fig: { type: 'polygon', points: [[0, 0], [10, 0], [7, 6], [3, 6]], sides: ['10 cm', null, '4 cm', null], segments: [{ from: [5, 6], to: [5, 0], dashed: true, right: true, label: '6 cm' }], alt: '윗변 4 cm, 아랫변 10 cm, 높이 6 cm인 사다리꼴' },
        answer: '42',
        wrong: [{ a: '84', why: '2로 나누는 것을 빠뜨렸습니다. (윗변+아랫변)×(높이)÷2입니다.' }, { a: '240', why: '세 길이를 모두 곱했습니다. 윗변과 아랫변은 먼저 더합니다.' }],
        explain: '$(4+10)\\times6\\div2=14\\times6\\div2=42$이므로 42 cm²입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 1,
        q: '지름이 10 cm인 원의 둘레는 몇 cm입니까? (원주율은 3.14로 계산합니다.)',
        choices: ['31.4 cm', '62.8 cm', '78.5 cm', '15.7 cm'],
        answer: 0,
        why: ['', '지름을 한 번 더 2배 했습니다. 지름에 바로 원주율을 곱합니다.', '넓이를 구했습니다($5\\times5\\times3.14$). 둘레는 (지름)×(원주율)입니다.', '반지름 5 cm에 원주율을 곱했습니다. 둘레는 지름에 원주율을 곱합니다.'],
        explain: '(원의 둘레) = (지름)×(원주율) $=10\\times3.14=31.4$ (cm)입니다.',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 1,
        q: '반지름이 6 cm인 원의 넓이는 몇 cm²입니까? (원주율은 3.14로 계산합니다.)',
        answer: '113.04',
        wrong: [
          { a: '37.68', why: '둘레를 구했습니다. 넓이는 (반지름)×(반지름)×(원주율)입니다.' },
          { a: '452.16', why: '반지름 대신 지름 12 cm를 두 번 곱했습니다.' },
          { a: '18.84', why: '반지름에 원주율을 한 번만 곱했습니다. 반지름을 두 번 곱합니다.' },
        ],
        explain: '$6\\times6\\times3.14=36\\times3.14=113.04$이므로 113.04 cm²입니다.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', unit: 'cm³', concept: 2,
        q: '그림과 같은 직육면체의 부피는 몇 cm³입니까?',
        fig: box(5, 4, 3, 'cm'),
        answer: '60',
        wrong: [{ a: '12', why: '세 길이를 더했습니다. 부피는 (가로)×(세로)×(높이)입니다.' }, { a: '94', why: '겉넓이를 구했습니다. 부피는 세 길이를 곱합니다.' }],
        explain: '$5\\times4\\times3=60$이므로 60 cm³입니다.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', unit: 'm²', concept: 3,
        q: '4,200 cm²는 몇 m²입니까?',
        answer: '0.42',
        wrong: [{ a: '42', why: '길이처럼 100으로 나누었습니다. 1 m² = 10,000 cm²이므로 10,000으로 나눕니다.' }],
        explain: '1 m² = 10,000 cm²이므로 $4200\\div10000=0.42$ (m²)입니다.',
      },
      {
        id: 'p8', level: 1, type: 'ox', concept: 3,
        q: '1 m²는 100 cm²입니다.',
        answer: false,
        explain: '1 m²는 한 변이 100 cm인 정사각형의 넓이이므로 $100\\times100=10000$ cm²입니다. 100배가 되는 것은 길이(1 m = 100 cm)입니다.',
      },
      {
        id: 'p9', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '그림과 같은 직각삼각형에서 빗변의 길이는 몇 cm입니까?',
        fig: rightTri(12, 9, '12 cm', '9 cm', '?', '직각을 낀 두 변이 12 cm, 9 cm인 직각삼각형, 빗변은 물음표'),
        answer: '15',
        wrong: [{ a: '21', why: '두 변의 길이를 그냥 더했습니다. 각각 제곱해 더한 뒤 제곱근을 구합니다.' }, { a: '225', why: '제곱의 합에서 멈췄습니다. 제곱해서 225가 되는 수를 찾습니다.' }],
        explain: '$9^{2}+12^{2}=81+144=225=15^{2}$이므로 빗변은 15 cm입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: 'cm³', concept: 2,
        q: '반지름이 5 cm, 높이가 10 cm인 원기둥의 부피는 몇 cm³입니까? (원주율은 3.14로 계산합니다.)',
        fig: cyl({ r: '5 cm', h: '10 cm' }, '반지름 5 cm, 높이 10 cm인 원기둥'),
        answer: '785',
        hint: '먼저 밑면인 원의 넓이를 구합니다.',
        wrong: [
          { a: '314', why: '밑면의 둘레에 높이를 곱했습니다(옆면의 넓이). 부피는 밑면의 넓이에 높이를 곱합니다.' },
          { a: '3140', why: '반지름 대신 지름 10 cm로 밑넓이를 구했습니다.' },
        ],
        explain: '밑넓이는 $5\\times5\\times3.14=78.5$ (cm²)이고, 부피는 $78.5\\times10=785$ (cm³)입니다.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', unit: 'L', concept: 3,
        q: '안쪽의 가로가 40 cm, 세로가 30 cm, 높이가 25 cm인 직육면체 모양의 수조에 물을 가득 채우면 물은 몇 L입니까?',
        fig: box(40, 30, 25, 'cm', '안쪽의 가로 40 cm, 세로 30 cm, 높이 25 cm인 직육면체 수조'),
        answer: '30',
        hint: '부피를 cm³로 구한 뒤 1 L = 1,000 cm³를 이용합니다.',
        wrong: [
          { a: '30000', why: '부피를 cm³로 구한 데서 멈췄습니다. 1,000 cm³가 1 L이므로 1,000으로 나눕니다.' },
          { a: '300', why: '100으로 나누었습니다. 1 L는 1,000 cm³입니다.' },
        ],
        explain: '부피는 $40\\times30\\times25=30000$ (cm³)입니다. 1 L = 1,000 cm³이므로 $30000\\div1000=30$ (L)입니다.',
      },
      {
        id: 'p12', level: 2, type: 'choice', concept: 4,
        q: '길이가 5 m인 사다리를 벽에 기대어 세웠습니다. 사다리의 아래 끝은 벽에서 1.5 m 떨어져 있고, 벽과 바닥은 직각입니다. 사다리의 위 끝은 바닥에서 약 몇 m 높이에 있습니까? (계산기를 써도 됩니다.)',
        fig: rightTri(1.5, 4.77, '1.5 m', '?', '5 m', '벽에 기댄 사다리가 만드는 직각삼각형: 바닥 쪽 변 1.5 m, 빗변(사다리) 5 m, 벽 쪽 높이는 모름'),
        choices: ['약 4.8 m', '약 5.2 m', '3.5 m', '6.5 m'],
        answer: 0,
        why: ['', '제곱을 빼야 할 곳에서 더했습니다. 사다리(5 m)가 빗변이므로 $\\sqrt{5^{2}-1.5^{2}}$입니다.', '길이를 그냥 뺐습니다. 제곱해서 뺀 뒤 제곱근을 구합니다.', '길이를 그냥 더했습니다. 높이는 빗변인 사다리보다 짧아야 합니다.'],
        hint: '사다리가 빗변입니다. 구하는 높이는 빗변이 아닌 변입니다.',
        explain: '사다리가 빗변이므로 높이는 $\\sqrt{5^{2}-1.5^{2}}=\\sqrt{25-2.25}=\\sqrt{22.75}\\approx4.77$이고, 약 4.8 m입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 0,
        q: '넓이가 54 cm²이고 밑변이 12 cm인 삼각형의 높이는 몇 cm입니까?',
        answer: '9',
        hint: '(밑변)×(높이)÷2 = 54에서 거꾸로 생각합니다.',
        wrong: [{ a: '4.5', why: '넓이를 밑변으로 바로 나누었습니다. 삼각형은 ÷2를 했으므로 먼저 넓이를 2배 해야 합니다.' }],
        explain: '$12\\times(\\text{높이})\\div2=54$이므로 $12\\times(\\text{높이})=108$, 높이는 $108\\div12=9$ (cm)입니다.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 0,
        q: '넓이가 45 cm²인 사다리꼴의 윗변이 4 cm, 아랫변이 11 cm입니다. 이 사다리꼴의 높이는 몇 cm입니까?',
        answer: '6',
        hint: '(윗변+아랫변)×(높이)÷2 = 45에서 거꾸로 생각합니다.',
        wrong: [{ a: '3', why: '넓이를 (윗변+아랫변)으로 바로 나누었습니다. ÷2를 되돌리려면 먼저 넓이를 2배 합니다.' }],
        explain: '$(4+11)\\times(\\text{높이})\\div2=45$이므로 $15\\times(\\text{높이})=90$, 높이는 $90\\div15=6$ (cm)입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', unit: '배', concept: 1,
        q: '원의 반지름을 2배로 늘리면 넓이는 몇 배가 됩니까?',
        answer: '4',
        hint: '반지름이 3 cm인 원과 6 cm인 원의 넓이를 직접 비교해 보세요.',
        wrong: [{ a: '2', why: '넓이에는 반지름이 두 번 곱해집니다. 반지름이 2배이면 넓이는 $2\\times2=4$배입니다.' }],
        explain: '넓이는 (반지름)×(반지름)×(원주율)이므로 반지름이 2배가 되면 넓이는 $2\\times2=4$배입니다. 예: 반지름 3 cm이면 $9\\times3.14$, 6 cm이면 $36\\times3.14$로 4배입니다. 둘레는 2배가 됩니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', unit: 'm²', concept: 1,
        q: '가로 10 m, 세로 6 m인 직사각형 정원 안에 지름이 4 m인 원 모양의 연못을 만들었습니다. 연못을 뺀 정원의 넓이는 몇 m²입니까? (원주율은 3.14로 계산합니다.)',
        answer: '47.44',
        hint: '연못의 반지름은 지름의 절반입니다.',
        wrong: [{ a: '9.76', why: '지름 4 m를 반지름처럼 써서 연못 넓이를 50.24 m²로 구했습니다. 반지름은 2 m입니다.' }],
        explain: '정원은 $10\\times6=60$ (m²), 연못은 반지름 2 m이므로 $2\\times2\\times3.14=12.56$ (m²)입니다. $60-12.56=47.44$ (m²)입니다.',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '안쪽의 가로가 12 cm, 세로가 4 cm, 높이가 3 cm인 직육면체 상자가 있습니다. 상자 안에 비스듬히 넣을 수 있는 가장 긴 막대의 길이는 몇 cm입니까? (막대의 굵기는 생각하지 않습니다.)',
        fig: box(12, 4, 3, 'cm', '안쪽의 가로 12 cm, 세로 4 cm, 높이 3 cm인 직육면체 상자'),
        answer: '13',
        hint: '먼저 바닥의 대각선을 구하고, 그 대각선과 높이로 다시 직각삼각형을 만듭니다.',
        wrong: [{ a: '19', why: '세 길이를 그냥 더했습니다. 피타고라스 정리를 두 번 씁니다.' }],
        explain: '바닥의 대각선을 $d$라 하면 $d^{2}=12^{2}+4^{2}=160$입니다. 가장 긴 막대는 바닥의 대각선과 높이를 직각을 낀 두 변으로 하는 직각삼각형의 빗변이므로 $160+3^{2}=169=13^{2}$, 13 cm입니다.',
      },
      {
        id: 'a6', level: 3, type: 'short', check: 'number', unit: 'L', concept: 3,
        q: '반지름이 10 cm, 높이가 30 cm인 원기둥 모양의 물통에 물을 가득 채우면 물은 몇 L입니까? (원주율은 3.14로 계산합니다.)',
        answer: '9.42',
        hint: '부피를 cm³로 구한 뒤 L로 바꿉니다.',
        wrong: [
          { a: '9420', why: '부피를 cm³로 구한 데서 멈췄습니다. 1 L = 1,000 cm³입니다.' },
          { a: '94.2', why: '100으로 나누었습니다. 1 L는 1,000 cm³입니다.' },
        ],
        explain: '부피는 $10\\times10\\times3.14\\times30=9420$ (cm³)이고, $9420\\div1000=9.42$ (L)입니다.',
      },
    ],

    deeper: [
      {
        title: '원주율은 어떻게 알아냈을까',
        body: '고대 그리스의 아르키메데스(기원전 3세기)는 원의 안쪽과 바깥쪽에 정96각형을 그려 그 둘레를 계산했습니다. 원의 둘레는 두 정다각형의 둘레 사이에 있으므로, 원주율이 $3\\frac{10}{71}$보다 크고 $3\\frac{1}{7}$보다 작다는 것을 보였습니다. 소수로 쓰면 3.1408…과 3.1428… 사이입니다.\n\n원주율은 소수점 아래 숫자가 끝없이, 되풀이되는 마디도 없이 이어지는 수입니다. 그래서 정확한 값을 소수로 다 쓸 수는 없고, 일상 계산에서는 3.14, 더 정밀한 계산에서는 3.14159처럼 필요한 만큼만 씁니다. 계산기의 $\\pi$ 버튼을 쓰면 계산기가 기억하는 자릿수까지 계산됩니다.',
      },
      {
        title: '피타고라스 정리를 넓이로 확인하기',
        body: '한 변이 $(a+b)$인 큰 정사각형 안에, 직각을 낀 두 변이 $a$, $b$이고 빗변이 $c$인 직각삼각형 4개를 네 귀퉁이에 돌려 놓으면, 가운데에 한 변이 $c$인 정사각형이 남습니다.\n\n큰 정사각형의 넓이는 (삼각형 4개) + (가운데 정사각형)이므로\n\n$(a+b)^{2}=4\\times\\frac{ab}{2}+c^{2}$\n\n왼쪽을 분배법칙으로 풀면 $a^{2}+2ab+b^{2}$이고 오른쪽은 $2ab+c^{2}$입니다. 양쪽의 $2ab$를 빼면 $a^{2}+b^{2}=c^{2}$이 남습니다.\n\n이 정리는 거꾸로도 쓰입니다. 바닥에 선을 그을 때 한 점에서 한쪽으로 3 m, 다른 쪽으로 4 m를 재고 두 끝 사이가 정확히 5 m가 되게 하면, 두 선이 직각을 이룹니다.',
      },
    ],

    faq: [
      {
        q: '원주율을 3.14로 계산하면 틀린 답 아닌가요?',
        a: '원주율의 정확한 값은 3.14159…처럼 끝없이 이어지므로 어떤 계산이든 어림값을 씁니다. 3.14로 계산한 결과는 "어림한 값"이고, 일상생활에는 충분히 정확합니다. 문제에서 "원주율은 3.14로 계산합니다"라고 하면 그 약속대로 계산하면 됩니다.',
      },
      {
        q: '넓이 단위를 바꿀 때 왜 100이 아니라 10,000을 곱하나요?',
        a: '넓이는 가로와 세로 두 방향의 길이를 곱한 것이기 때문입니다. 1 m를 100 cm로 바꾸면 가로도 100배, 세로도 100배가 되어 넓이는 $100\\times100=10000$배가 됩니다. 부피는 세 방향이라 $100\\times100\\times100$배입니다.',
      },
      {
        q: '높이와 옆 변은 어떻게 다른가요?',
        a: '높이는 밑변에서 **수직으로** 잰 거리이고, 옆 변은 도형의 테두리를 이루는 변입니다. 직사각형에서는 둘이 같지만, 평행사변형이나 삼각형처럼 옆 변이 기울어진 도형에서는 높이가 옆 변보다 짧습니다. 넓이 공식에는 늘 높이를 씁니다.',
      },
      {
        q: '피타고라스 정리는 아무 삼각형에나 쓸 수 있나요?',
        a: '아닙니다. **직각삼각형**에서만 성립합니다. 또 $c$는 반드시 빗변(직각의 맞은편, 가장 긴 변)이어야 합니다. 빗변을 알고 다른 변을 구할 때는 $c^{2}$에서 아는 변의 제곱을 뺍니다.',
      },
    ],

    mistakes: [
      '삼각형·사다리꼴의 넓이에서 ÷2를 빠뜨리거나, 높이 대신 기울어진 옆 변을 곱하는 실수 — 높이는 밑변에 수직으로 잰 길이입니다.',
      '지름이 주어졌는데 반지름처럼 넣어 원의 넓이를 구하는 실수 — 넓이는 (반지름)×(반지름)×(원주율)이므로 지름을 반으로 나눈 뒤 계산합니다.',
      '넓이·부피 단위를 바꿀 때 길이처럼 100만 곱하는 실수 — 1 m² = 10,000 cm², 1 m³ = 1,000,000 cm³, 1 L = 1,000 cm³입니다.',
    ],

    gens: [
      {
        id: 'area-polygon',
        level: 1,
        title: '사각형과 삼각형의 넓이',
        make: function (R) {
          var kind = R.int(0, 3), area, q, fig, ex, wrong = [];
          function addWrong(fr, why) {
            if (fr.eq(area)) return;
            for (var i = 0; i < wrong.length; i++) if (R.F(0).add(wrong[i].a).eq(fr)) return;
            wrong.push({ a: R.fmt.dec(fr), why: why });
          }
          if (kind === 0) {
            var w = R.int(3, 15), h;
            do { h = R.int(2, 12); } while (h === w);
            area = R.F(w * h);
            q = '가로가 ' + w + ' cm, 세로가 ' + h + ' cm인 직사각형의 넓이는 몇 cm²입니까?';
            fig = { type: 'polygon', points: [[0, 0], [w, 0], [w, h], [0, h]], sides: [w + ' cm', h + ' cm', null, null], angles: [{ at: 0, right: true }], alt: '가로 ' + w + ' cm, 세로 ' + h + ' cm인 직사각형' };
            ex = '(가로)×(세로) $=' + w + '\\times' + h + '=' + (w * h) + '$이므로 ' + (w * h) + ' cm²입니다.';
            addWrong(R.F(2 * (w + h)), '둘레를 구했습니다. 넓이는 (가로)×(세로)입니다.');
            addWrong(R.F(w * h, 2), '2로 나누었습니다. 2로 나누는 것은 삼각형과 사다리꼴입니다.');
          } else if (kind === 1) {
            var t = R.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [9, 12, 15], [12, 5, 13], [8, 15, 17]]);
            var s = t[0], ph = t[1], l = t[2];
            var b = R.int(Math.max(6, s + 1), s + 10);
            area = R.F(b * ph);
            q = '그림의 평행사변형의 넓이는 몇 cm²입니까? 점선은 높이를 나타냅니다.';
            fig = { type: 'polygon', points: [[0, 0], [b, 0], [b + s, ph], [s, ph]], sides: [b + ' cm', l + ' cm', null, null], segments: [{ from: [s, ph], to: [s, 0], dashed: true, right: true, label: ph + ' cm' }], alt: '밑변 ' + b + ' cm, 기울어진 옆 변 ' + l + ' cm, 높이 ' + ph + ' cm인 평행사변형' };
            ex = '(밑변)×(높이) $=' + b + '\\times' + ph + '=' + (b * ph) + '$이므로 ' + (b * ph) + ' cm²입니다. 기울어진 옆 변 ' + l + ' cm는 쓰지 않습니다.';
            addWrong(R.F(b * l), '기울어진 옆 변 ' + l + ' cm를 곱했습니다. 밑변에 수직인 높이를 곱합니다.');
            addWrong(R.F(b * ph, 2), '2로 나누었습니다. 평행사변형은 2로 나누지 않습니다.');
          } else if (kind === 2) {
            var tb = R.int(4, 16), th = R.int(3, 12), p = R.int(1, tb - 1);
            area = R.F(tb * th, 2);
            q = '밑변이 ' + tb + ' cm, 높이가 ' + th + ' cm인 삼각형의 넓이는 몇 cm²입니까?';
            fig = { type: 'polygon', points: [[0, 0], [tb, 0], [p, th]], sides: [tb + ' cm', null, null], segments: [{ from: [p, th], to: [p, 0], dashed: true, right: true, label: th + ' cm' }], alt: '밑변 ' + tb + ' cm, 높이 ' + th + ' cm인 삼각형' };
            ex = '(밑변)×(높이)÷2 $=' + tb + '\\times' + th + '\\div2=' + R.fmt.dec(area) + '$이므로 ' + R.fmt.dec(area) + ' cm²입니다.';
            addWrong(R.F(tb * th), '2로 나누는 것을 빠뜨렸습니다. 삼각형은 같은 삼각형 두 개로 만든 평행사변형의 절반입니다.');
          } else {
            var top = R.int(2, 9), bot = R.int(top + 2, top + 10), zh = R.int(2, 10), off = R.int(0, bot - top);
            area = R.F((top + bot) * zh, 2);
            q = '윗변이 ' + top + ' cm, 아랫변이 ' + bot + ' cm, 높이가 ' + zh + ' cm인 사다리꼴의 넓이는 몇 cm²입니까?';
            var xm = off + top / 2;
            fig = { type: 'polygon', points: [[0, 0], [bot, 0], [off + top, zh], [off, zh]], sides: [bot + ' cm', null, top + ' cm', null], segments: [{ from: [xm, zh], to: [xm, 0], dashed: true, right: true, label: zh + ' cm' }], alt: '윗변 ' + top + ' cm, 아랫변 ' + bot + ' cm, 높이 ' + zh + ' cm인 사다리꼴' };
            ex = '(윗변+아랫변)×(높이)÷2 $=(' + top + '+' + bot + ')\\times' + zh + '\\div2=' + (top + bot) + '\\times' + zh + '\\div2=' + R.fmt.dec(area) + '$이므로 ' + R.fmt.dec(area) + ' cm²입니다.';
            addWrong(R.F((top + bot) * zh), '2로 나누는 것을 빠뜨렸습니다. 사다리꼴 두 개를 붙인 평행사변형의 절반입니다.');
            addWrong(R.F(top * bot * zh), '세 길이를 모두 곱했습니다. 윗변과 아랫변은 먼저 더합니다.');
          }
          return {
            type: 'short', check: 'number', unit: 'cm²', concept: 0,
            q: q, fig: fig,
            answer: R.fmt.dec(area),
            wrong: wrong,
            explain: ex,
          };
        },
      },
      {
        id: 'circle',
        level: 1,
        title: '원의 둘레와 넓이 (원주율 3.14)',
        make: function (R) {
          var r = R.int(2, 15), d = 2 * r;
          var byD = R.bool(), askC = R.bool();
          var C = 2 * r * 314, A = r * r * 314;            // 100배 한 값
          var val = askC ? C : A;
          var dec = function (n) { return R.fmt.dec(R.F(n, 100)); };
          var wrong = [];
          function addWrong(n, why) {
            if (n === val) return;
            for (var i = 0; i < wrong.length; i++) if (wrong[i].n === n) return;
            wrong.push({ n: n, a: dec(n), why: why });
          }
          var given = byD ? '지름이 ' + d + ' cm인' : '반지름이 ' + r + ' cm인';
          var ex;
          if (askC) {
            addWrong(r * 314, '반지름에 원주율을 곱했습니다. 둘레는 지름(반지름의 2배)에 원주율을 곱합니다.');
            if (byD) addWrong(2 * d * 314, '지름을 한 번 더 2배 했습니다. 지름에 바로 원주율을 곱합니다.');
            addWrong(A, '넓이를 구했습니다. 둘레는 (지름)×(원주율)입니다.');
            ex = (byD ? '' : '지름은 $' + r + '\\times2=' + d + '$ cm입니다. ') + '(원의 둘레) = (지름)×(원주율) $=' + d + '\\times3.14=' + dec(C) + '$ (cm)입니다.';
          } else {
            addWrong(C, '둘레를 구했습니다. 넓이는 (반지름)×(반지름)×(원주율)입니다.');
            if (byD) addWrong(d * d * 314, '지름 ' + d + ' cm를 반지름처럼 두 번 곱했습니다. 반지름은 $' + d + '\\div2=' + r + '$ cm입니다.');
            addWrong(r * 314, '반지름에 원주율을 한 번만 곱했습니다. 반지름을 두 번 곱합니다.');
            ex = (byD ? '반지름은 $' + d + '\\div2=' + r + '$ cm입니다. ' : '') + '(원의 넓이) = (반지름)×(반지름)×(원주율) $=' + r + '\\times' + r + '\\times3.14=' + dec(A) + '$ (cm²)입니다.';
          }
          return {
            type: 'short', check: 'number', unit: askC ? 'cm' : 'cm²', concept: 1,
            q: given + ' 원의 ' + (askC ? '둘레는 몇 cm' : '넓이는 몇 cm²') + '입니까? (원주율은 3.14로 계산합니다.)',
            fig: byD
              ? { type: 'circle', d: d + ' cm', showCenter: true, showDiameter: true, alt: '지름이 ' + d + ' cm인 원' }
              : { type: 'circle', r: r + ' cm', showCenter: true, showRadius: true, alt: '반지름이 ' + r + ' cm인 원' },
            answer: dec(val),
            wrong: wrong.map(function (w) { return { a: w.a, why: w.why }; }),
            explain: ex,
          };
        },
      },
      {
        id: 'volume',
        level: 2,
        title: '직육면체·원기둥의 부피와 들이',
        make: function (R) {
          var kind = R.int(0, 2);
          var wrong = [];
          function addWrong(fr, ans, why) {
            if (fr.eq(ans)) return;
            for (var i = 0; i < wrong.length; i++) if (R.F(0).add(wrong[i].a).eq(fr)) return;
            wrong.push({ a: R.fmt.dec(fr), why: why });
          }
          if (kind === 0) {
            var w = R.int(2, 15), d = R.int(2, 12), h = R.int(2, 12);
            var v = R.F(w * d * h);
            addWrong(R.F(w + d + h), v, '세 길이를 더했습니다. 부피는 (가로)×(세로)×(높이)입니다.');
            addWrong(R.F(2 * (w * d + d * h + w * h)), v, '겉넓이를 구했습니다. 부피는 세 길이를 곱합니다.');
            addWrong(R.F(w * d), v, '밑넓이에서 멈췄습니다. 밑넓이에 높이를 곱합니다.');
            return {
              type: 'short', check: 'number', unit: 'cm³', concept: 2,
              q: '그림과 같은 직육면체의 부피는 몇 cm³입니까?',
              fig: box(w, d, h, 'cm'),
              answer: String(w * d * h),
              wrong: wrong,
              explain: '(가로)×(세로)×(높이) $=' + w + '\\times' + d + '\\times' + h + '=' + (w * d * h) + '$이므로 ' + (w * d * h) + ' cm³입니다.',
            };
          }
          if (kind === 1) {
            var r = R.int(2, 10), ch = R.int(3, 20), byD = R.bool();
            var cv = R.F(r * r * 314 * ch, 100);
            var base = R.F(r * r * 314, 100);
            addWrong(R.F(2 * r * 314 * ch, 100), cv, '밑면의 둘레에 높이를 곱했습니다(옆면의 넓이). 부피는 밑면의 넓이에 높이를 곱합니다.');
            if (byD) addWrong(R.F(4 * r * r * 314 * ch, 100), cv, '지름 ' + (2 * r) + ' cm를 반지름처럼 써서 밑넓이를 구했습니다.');
            addWrong(base, cv, '밑넓이에서 멈췄습니다. 밑넓이에 높이를 곱합니다.');
            return {
              type: 'short', check: 'number', unit: 'cm³', concept: 2,
              q: (byD ? '밑면의 지름이 ' + (2 * r) : '밑면의 반지름이 ' + r) + ' cm, 높이가 ' + ch + ' cm인 원기둥의 부피는 몇 cm³입니까? (원주율은 3.14로 계산합니다.)',
              fig: cyl(byD ? { d: (2 * r) + ' cm', h: ch + ' cm' } : { r: r + ' cm', h: ch + ' cm' }, (byD ? '밑면의 지름 ' + (2 * r) : '밑면의 반지름 ' + r) + ' cm, 높이 ' + ch + ' cm인 원기둥'),
              answer: R.fmt.dec(cv),
              wrong: wrong,
              explain: (byD ? '반지름은 $' + (2 * r) + '\\div2=' + r + '$ cm입니다. ' : '') + '밑넓이는 $' + r + '\\times' + r + '\\times3.14=' + R.fmt.dec(base) + '$ (cm²)이고, 부피는 $' + R.fmt.dec(base) + '\\times' + ch + '=' + R.fmt.dec(cv) + '$ (cm³)입니다.',
            };
          }
          var sizes = [10, 15, 20, 25, 30, 40, 50, 60];
          var tw = R.pick(sizes), td = R.pick(sizes), th = R.pick(sizes);
          var tv = tw * td * th, L = R.F(tv, 1000);
          addWrong(R.F(tv), L, '부피를 cm³로 구한 데서 멈췄습니다. 1 L = 1,000 cm³이므로 1,000으로 나눕니다.');
          addWrong(R.F(tv, 100), L, '100으로 나누었습니다. 1 L는 1,000 cm³입니다.');
          return {
            type: 'short', check: 'number', unit: 'L', concept: 3,
            q: '안쪽의 가로가 ' + tw + ' cm, 세로가 ' + td + ' cm, 높이가 ' + th + ' cm인 직육면체 모양의 수조에 물을 가득 채우면 물은 몇 L입니까?',
            fig: box(tw, td, th, 'cm', '안쪽의 가로 ' + tw + ' cm, 세로 ' + td + ' cm, 높이 ' + th + ' cm인 직육면체 수조'),
            answer: R.fmt.dec(L),
            hint: '부피를 cm³로 구한 뒤 1 L = 1,000 cm³를 이용합니다.',
            wrong: wrong,
            explain: '부피는 $' + tw + '\\times' + td + '\\times' + th + '=' + tv + '$ (cm³)입니다. 1 L = 1,000 cm³이므로 $' + tv + '\\div1000=' + R.fmt.dec(L) + '$ (L)입니다.',
          };
        },
      },
      {
        id: 'pythagoras',
        level: 2,
        title: '피타고라스 정리로 변의 길이 구하기',
        make: function (R) {
          var kind = R.int(0, 2);
          if (kind < 2) {
            var t = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29]]);
            var k = R.int(1, t[2] <= 13 ? 3 : 1);
            var a = t[0] * k, b = t[1] * k, c = t[2] * k;
            if (R.bool()) { var tmp = a; a = b; b = tmp; }
            if (kind === 0) {
              return {
                type: 'short', check: 'number', unit: 'cm', concept: 4,
                q: '직각을 낀 두 변의 길이가 ' + a + ' cm, ' + b + ' cm인 직각삼각형의 빗변은 몇 cm입니까?',
                fig: rightTri(a, b, a + ' cm', b + ' cm', '?', '직각을 낀 두 변이 ' + a + ' cm, ' + b + ' cm인 직각삼각형, 빗변은 물음표'),
                answer: String(c),
                wrong: [
                  { a: String(a + b), why: '두 변의 길이를 그냥 더했습니다. 각각 제곱해 더한 뒤 제곱근을 구합니다.' },
                  { a: String(a * a + b * b), why: '제곱의 합에서 멈췄습니다. 제곱해서 ' + (a * a + b * b) + R.josa(a * a + b * b, '이/가') + ' 되는 수를 찾습니다.' },
                ],
                explain: '$' + a + '^{2}+' + b + '^{2}=' + (a * a) + '+' + (b * b) + '=' + (c * c) + '=' + c + '^{2}$이므로 빗변은 ' + c + ' cm입니다.',
              };
            }
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 4,
              q: '빗변의 길이가 ' + c + ' cm이고 다른 한 변의 길이가 ' + a + ' cm인 직각삼각형이 있습니다. 나머지 한 변의 길이는 몇 cm입니까?',
              fig: rightTri(a, b, a + ' cm', '?', c + ' cm', '빗변 ' + c + ' cm, 한 변 ' + a + ' cm인 직각삼각형, 나머지 변은 물음표'),
              answer: String(b),
              hint: '빗변의 제곱에서 아는 변의 제곱을 뺍니다.',
              wrong: [
                { a: String(c - a), why: '길이를 그냥 뺐습니다. 제곱해서 뺀 뒤 제곱근을 구합니다.' },
                { a: String(c * c - a * a), why: '제곱의 차에서 멈췄습니다. 제곱해서 ' + (c * c - a * a) + R.josa(c * c - a * a, '이/가') + ' 되는 수를 찾습니다.' },
              ],
              explain: '$' + c + '^{2}-' + a + '^{2}=' + (c * c) + '-' + (a * a) + '=' + (b * b) + '=' + b + '^{2}$이므로 나머지 변은 ' + b + ' cm입니다.',
            };
          }
          // 계산기로 어림: 반올림하여 소수 첫째 자리
          var p, q, s, n10;
          do {
            p = R.int(2, 12); q = R.int(2, 12);
            s = p * p + q * q;
            n10 = Math.round(Math.sqrt(s) * 10);
          } while (Math.round(Math.sqrt(s)) * Math.round(Math.sqrt(s)) === s || n10 % 10 === 0);
          var ans = R.F(n10, 10);
          var cut = R.F(Math.floor(Math.sqrt(s) * 10), 10);
          var wrong = [
            { a: String(p + q), why: '두 변의 길이를 그냥 더했습니다. 각각 제곱해 더한 뒤 제곱근을 구합니다.' },
            { a: String(s), why: '제곱의 합에서 멈췄습니다. 계산기로 √' + s + R.josa(s, '을/를') + ' 구합니다.' },
          ];
          if (!cut.eq(ans)) wrong.push({ a: R.fmt.dec(cut), why: '소수 둘째 자리를 반올림하지 않고 버렸습니다.' });
          var two = R.F(Math.round(Math.sqrt(s) * 100), 100);
          if (!two.eq(ans) && !two.eq(cut)) wrong.push({ a: R.fmt.dec(two), why: '소수 둘째 자리까지 썼습니다. 문제는 소수 첫째 자리까지 쓰라고 했으므로 소수 둘째 자리에서 반올림한 ' + R.fmt.dec(ans) + ' cm가 답입니다.' });
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 4,
            q: '직각을 낀 두 변의 길이가 ' + p + ' cm, ' + q + ' cm인 직각삼각형의 빗변의 길이를 계산기로 구해, 반올림하여 소수 첫째 자리까지 쓰세요.',
            fig: rightTri(p, q, p + ' cm', q + ' cm', '?', '직각을 낀 두 변이 ' + p + ' cm, ' + q + ' cm인 직각삼각형, 빗변은 물음표'),
            answer: R.fmt.dec(ans),
            wrong: wrong,
            explain: '$' + p + '^{2}+' + q + '^{2}=' + (p * p) + '+' + (q * q) + '=' + s + '$이므로 빗변은 $\\sqrt{' + s + '}$ cm입니다. 계산기로 구하면 ' + R.fmt.dec(Math.floor(Math.sqrt(s) * 1000) / 1000, 3) + '…이므로 반올림하여 약 ' + R.fmt.dec(ans) + ' cm입니다.',
          };
        },
      },
    ],
  });
})();
