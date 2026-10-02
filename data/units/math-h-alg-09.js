/* 대수 · 사인법칙과 코사인법칙
 * 사인법칙과 외접원의 반지름, 코사인법칙(두 변과 끼인각·세 변), 변과 각 구하기,
 * 삼각형의 넓이 S=½ab sinC 와 여러 가지 넓이, 직접 잴 수 없는 거리·높이(측량)를 다룬다.
 * 각은 육십분법(°)으로 쓴다. 특수각의 삼각함수 값과 sin(180°-θ)=sinθ 는 앞 단원(삼각함수의 뜻과 성질)에서 배웠다. */
(function () {
  // 특수각: sin = c·√r / 2 (c, r), cos = 부호·√r / 2 (부호, r)
  var SIN = { 30: [1, 1], 45: [1, 2], 60: [1, 3], 90: [2, 1], 120: [1, 3], 135: [1, 2], 150: [1, 1] };
  var COS = { 30: [1, 3], 45: [1, 2], 60: [1, 1], 120: [-1, 1], 135: [-1, 2], 150: [-1, 3] };
  var SINTEX = { 30: '\\frac{1}{2}', 45: '\\frac{\\sqrt{2}}{2}', 60: '\\frac{\\sqrt{3}}{2}', 120: '\\frac{\\sqrt{3}}{2}', 135: '\\frac{\\sqrt{2}}{2}', 150: '\\frac{1}{2}' };

  // 계수(Frac) × √r 을 TeX 로 (r 은 1, 2, 3, 6 — 제곱인수가 없으므로 값이 같으면 글자도 같다)
  function radTex(f, r) {
    var neg = f.sign() < 0, a = f.abs(), n = a.num, d = a.den;
    var top = r === 1 ? String(n) : (n === 1 ? '' : String(n)) + '\\sqrt{' + r + '}';
    return (neg ? '-' : '') + (d === 1 ? top : '\\frac{' + top + '}{' + d + '}');
  }

  Tutor.registerUnit({
    id: 'math-h-alg-09',
    course: 'math-h-alg',
    title: '사인법칙과 코사인법칙',
    summary: '삼각형의 변과 각 사이의 관계인 사인법칙과 코사인법칙을 익혀, 삼각형의 넓이와 직접 잴 수 없는 거리·높이를 구합니다.',
    goals: [
      '사인법칙을 이해하고, 외접원의 반지름과 삼각형의 변·각을 구할 수 있다.',
      '코사인법칙을 이해하고, 두 변과 끼인각 또는 세 변으로 나머지 변과 각을 구할 수 있다.',
      '$S=\\frac{1}{2}ab\\sin C$를 이용하여 삼각형과 여러 가지 도형의 넓이를 구할 수 있다.',
      '사인법칙과 코사인법칙으로 직접 잴 수 없는 거리와 높이를 구할 수 있다.',
    ],
    standards: ['[12대수02-03]'],

    concepts: [
      {
        title: '사인법칙과 외접원의 반지름',
        body: '삼각형 ABC에서 세 각 $\\angle A$, $\\angle B$, $\\angle C$의 크기를 각각 $A$, $B$, $C$로, 그 대변의 길이를 각각 $a$, $b$, $c$로 나타냅니다.\n\n' +
          '**사인법칙** 삼각형 ABC의 외접원의 반지름의 길이를 $R$이라고 하면\n\n$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$\n\n' +
          '**왜 성립할까?** 꼭짓점 B를 지나는 외접원의 지름 $\\overline{BA\'}$을 긋습니다.\n\n' +
          '- $A$가 예각이면 $\\angle BA\'C$와 $\\angle BAC$는 같은 호 BC에 대한 원주각이므로 $\\angle BA\'C=A$입니다. 또 지름에 대한 원주각이므로 $\\angle BCA\'=90°$입니다. 직각삼각형 $BA\'C$에서 $\\sin A=\\frac{a}{2R}$, 곧 $\\frac{a}{\\sin A}=2R$입니다.\n' +
          '- $A$가 둔각이면 $\\angle BA\'C=180°-A$이고 $\\sin(180°-A)=\\sin A$이므로 같은 식이 나옵니다.\n' +
          '- $A=90°$이면 $a$가 지름이므로 $a=2R$, $\\sin A=1$입니다.\n\n' +
          '$B$, $C$에 대해서도 같은 방법으로 보일 수 있습니다.\n\n' +
          '예: $a=5$, $A=150°$이면 $2R=\\frac{5}{\\sin 150°}=\\frac{5}{\\frac{1}{2}}=10$이므로 $R=5$입니다.\n\n' +
          '> ⚠️ 사인법칙의 값은 반지름 $R$이 아니라 **지름 $2R$**입니다.',
        easy: '한 원 안에 삼각형이 꼭 맞게 들어 있다고 생각해 보십시오. 원이 크면 같은 각을 마주 보는 변도 길어집니다.\n\n' +
          '사인법칙은 "변의 길이 ÷ 그 맞은편 각의 사인"이 어느 변으로 계산해도 똑같이 원의 지름 $2R$이 된다는 뜻입니다. 그래서 변 하나와 그 대각만 알면 외접원의 크기가 정해집니다.',
        fig: {
          type: 'svg',
          alt: '원에 내접하는 삼각형 ABC와 원의 중심 O. B를 지나는 지름 BA′을 점선으로 긋고, A′과 C를 잇는 점선이 있다. 각 BA′C는 각 A와 크기가 같고, 각 BCA′은 직각이다',
          svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">' +
            '<circle cx="120" cy="110" r="80" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
            '<polygon points="86.2,37.5 54.5,155.9 189.3,150" fill="var(--fig-1)" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>' +
            '<g stroke="var(--fig-1)" stroke-width="1.8" stroke-dasharray="5 4" fill="none"><line x1="54.5" y1="155.9" x2="185.5" y2="64.1"/><line x1="185.5" y1="64.1" x2="189.3" y2="150"/></g>' +
            '<circle cx="120" cy="110" r="2.8" fill="currentColor"/>' +
            '<g fill="currentColor" font-family="sans-serif" font-size="15" text-anchor="middle"><text x="80" y="28">A</text><text x="42" y="170">B</text><text x="200" y="166">C</text><text x="200" y="60">A′</text><text x="118" y="128">O</text><text x="124" y="172">a</text><text x="150" y="80">2R</text></g></svg>',
        },
        check: {
          type: 'choice',
          q: '삼각형 ABC에서 $a=6$, $A=30°$일 때, 외접원의 반지름의 길이 $R$의 값은 무엇입니까?',
          choices: ['$6$', '$12$', '$3$'],
          answer: 0,
          why: ['', '$\\frac{a}{\\sin A}=12$는 지름 $2R$입니다. 반지름은 그 절반입니다.', '$a\\sin A=3$을 계산했습니다. 사인법칙은 $a$를 $\\sin A$로 나눕니다.'],
          explain: '$\\frac{a}{\\sin A}=\\frac{6}{\\frac{1}{2}}=12=2R$이므로 $R=6$입니다.',
        },
      },
      {
        title: '사인법칙으로 변과 각 구하기',
        body: '사인법칙은 **한 변과 그 대각**을 알 때 쓸 수 있습니다. 쓰임은 크게 세 가지입니다.\n\n' +
          '1. **두 각과 한 변**을 알 때: 나머지 각은 $A+B+C=180°$로 구하고, 나머지 변은 $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$로 구합니다.\n' +
          '2. **변을 사인으로, 사인을 변으로** 바꿀 때: $a=2R\\sin A$, $\\sin A=\\frac{a}{2R}$\n' +
          '3. **변의 비**: $a:b:c=\\sin A:\\sin B:\\sin C$\n\n' +
          '예: $A=45°$, $B=60°$, $a=4$이면 $b=\\frac{a\\sin B}{\\sin A}=\\frac{4\\times\\frac{\\sqrt{3}}{2}}{\\frac{\\sqrt{2}}{2}}=2\\sqrt{6}$입니다.\n\n' +
          '> ⚠️ 변의 비는 **각의 비가 아니라 사인의 비**입니다. $A:B:C=1:2:3$이면 $A=30°$, $B=60°$, $C=90°$이므로 $a:b:c=\\frac{1}{2}:\\frac{\\sqrt{3}}{2}:1=1:\\sqrt{3}:2$입니다.\n\n' +
          '> ⚠️ 두 변과 끼인각이 **아닌** 한 각을 알고 사인법칙으로 각을 구하면, $\\sin B=\\frac{1}{2}$에서 $B=30°$와 $B=150°$처럼 두 값이 나올 수 있습니다. 세 각의 합이 $180°$를 넘지 않는지 확인합니다.',
        easy: '사인법칙은 비례식입니다. $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$에서 네 개 중 세 개를 알면 나머지 하나가 나옵니다.\n\n' +
          '삼각형에서 **큰 각과 마주 보는 변이 깁니다.** 다만 변의 길이는 각의 크기에 정비례하지 않고 사인값에 비례합니다.',
        check: {
          type: 'choice',
          q: '삼각형 ABC에서 $A=30°$, $B=90°$, $C=60°$일 때, $a:b:c$는 무엇입니까?',
          choices: ['$1:2:\\sqrt{3}$', '$1:3:2$', '$1:\\sqrt{3}:2$'],
          answer: 0,
          why: ['', '각의 비 $30:90:60$을 그대로 썼습니다. 변의 비는 사인의 비입니다.', '가장 긴 변을 $c$로 놓았습니다. 가장 큰 각 $B=90°$의 대변 $b$가 가장 깁니다.'],
          explain: '$a:b:c=\\sin 30°:\\sin 90°:\\sin 60°=\\frac{1}{2}:1:\\frac{\\sqrt{3}}{2}=1:2:\\sqrt{3}$입니다.',
        },
      },
      {
        title: '코사인법칙 — 두 변과 끼인각',
        body: '**코사인법칙** 삼각형 ABC에서\n\n$a^2=b^2+c^2-2bc\\cos A$\n\n$b^2=c^2+a^2-2ca\\cos B$\n\n$c^2=a^2+b^2-2ab\\cos C$\n\n' +
          '**두 변과 그 끼인각**을 알면 나머지 한 변을 구할 수 있습니다.\n\n' +
          '**왜 성립할까?** 꼭짓점 A를 원점, B를 $(c, 0)$에 놓으면 C의 좌표는 $(b\\cos A, b\\sin A)$입니다. 두 점 사이의 거리 공식으로\n\n' +
          '$a^2=(b\\cos A-c)^2+(b\\sin A)^2=b^2(\\cos^2 A+\\sin^2 A)-2bc\\cos A+c^2=b^2+c^2-2bc\\cos A$\n\n' +
          '예: $b=4$, $c=5$, $A=60°$이면 $a^2=16+25-2\\times4\\times5\\times\\frac{1}{2}=21$이므로 $a=\\sqrt{21}$입니다.\n\n' +
          '> 💡 $A=90°$이면 $\\cos A=0$이므로 $a^2=b^2+c^2$, 곧 **피타고라스 정리**입니다. 코사인법칙은 피타고라스 정리를 모든 삼각형으로 넓힌 것입니다.',
        easy: '직각삼각형이라면 $a^2=b^2+c^2$입니다. 끼인각이 직각보다 작으면 마주 보는 변이 짧아지고, 직각보다 크면 길어집니다.\n\n' +
          '$-2bc\\cos A$는 그 "고쳐 주는 값"입니다. 예각이면 $\\cos A>0$이라 빼고, 둔각이면 $\\cos A<0$이라 오히려 더해집니다.',
        fig: {
          type: 'polygon', points: [[0, 0], [6, 0], [2, 3.2]], labels: ['A', 'B', 'C'],
          sides: ['c', 'a', 'b'], angles: [{ at: 0, label: 'A' }],
          alt: '삼각형 ABC. 변 AB는 c, 변 BC는 a, 변 CA는 b이고 꼭짓점 A의 각이 표시되어 있다',
        },
        check: {
          type: 'short', check: 'number',
          q: '삼각형 ABC에서 $b=3$, $c=8$, $A=60°$일 때, $a$의 값을 구하십시오.',
          answer: '7',
          wrong: [{ a: '49', why: '$a^2=49$까지 구했습니다. $a>0$이므로 제곱근을 구해야 합니다.' }],
          explain: '$a^2=3^2+8^2-2\\times3\\times8\\times\\frac{1}{2}=9+64-24=49$이고 $a>0$이므로 $a=7$입니다.',
        },
      },
      {
        title: '코사인법칙 — 세 변으로 각 구하기',
        body: '코사인법칙을 $\\cos$에 대해 풀면 **세 변의 길이로 각의 크기**를 구할 수 있습니다.\n\n' +
          '$\\cos A=\\frac{b^2+c^2-a^2}{2bc}$, $\\cos B=\\frac{c^2+a^2-b^2}{2ca}$, $\\cos C=\\frac{a^2+b^2-c^2}{2ab}$\n\n' +
          '예: $a=7$, $b=3$, $c=5$이면 $\\cos A=\\frac{9+25-49}{2\\times3\\times5}=-\\frac{1}{2}$이므로 $A=120°$입니다.\n\n' +
          '분모 $2bc$는 항상 양수이므로 $\\cos A$의 부호는 분자 $b^2+c^2-a^2$이 정합니다. 그래서 **가장 긴 변**을 $a$라 할 때\n\n' +
          '| 조건 | 가장 큰 각 $A$ | 삼각형 |\n|---|---|---|\n| $a^2<b^2+c^2$ | 예각 | 예각삼각형 |\n| $a^2=b^2+c^2$ | 직각 | 직각삼각형 |\n| $a^2>b^2+c^2$ | 둔각 | 둔각삼각형 |\n\n' +
          '> 💡 가장 큰 각은 가장 긴 변의 대각이므로, 가장 긴 변 하나만 확인하면 됩니다.',
        easy: '세 변의 길이를 정하면 삼각형 모양이 하나로 정해지므로 각도 모두 정해집니다. 그 각을 계산하는 식이 $\\cos A=\\frac{b^2+c^2-a^2}{2bc}$입니다.\n\n' +
          '분자에서 구하려는 각의 **대변만 빼는** 것을 기억하십시오. $\\cos A$를 구할 때는 $a^2$을 뺍니다.',
        check: {
          type: 'choice',
          q: '세 변의 길이가 $5$, $7$, $8$인 삼각형에서 길이가 $7$인 변의 대각의 크기는 무엇입니까?',
          choices: ['$60°$', '$120°$', '$30°$'],
          answer: 0,
          why: ['', '부호를 거꾸로 계산했습니다. $25+64-49=40>0$이므로 코사인값은 양수입니다.', '$\\cos\\theta=\\frac{1}{2}$인 각을 잘못 골랐습니다. $\\cos 30°=\\frac{\\sqrt{3}}{2}$입니다.'],
          explain: '구하는 각을 $\\theta$라 하면 $\\cos\\theta=\\frac{5^2+8^2-7^2}{2\\times5\\times8}=\\frac{40}{80}=\\frac{1}{2}$이므로 $\\theta=60°$입니다.',
        },
      },
      {
        title: '삼각형의 넓이',
        body: '삼각형 ABC의 넓이 $S$는 **두 변과 그 끼인각**으로 구합니다.\n\n$S=\\frac{1}{2}ab\\sin C=\\frac{1}{2}bc\\sin A=\\frac{1}{2}ca\\sin B$\n\n' +
          '**왜?** 밑변을 $a$로 잡으면 높이는 $h=b\\sin C$입니다($C$가 둔각이어도 $\\sin(180°-C)=\\sin C$). 그래서 $S=\\frac{1}{2}ah=\\frac{1}{2}ab\\sin C$입니다.\n\n' +
          '**여러 가지 넓이**\n\n' +
          '- **세 변**만 알 때: 코사인법칙으로 $\\cos C$ → $\\sin C=\\sqrt{1-\\cos^2 C}$ → $S=\\frac{1}{2}ab\\sin C$\n' +
          '- **외접원의 반지름**을 알 때: $\\sin C=\\frac{c}{2R}$를 넣으면 $S=\\frac{abc}{4R}$\n' +
          '- **평행사변형**: 이웃한 두 변 $a$, $b$와 끼인각 $\\theta$ → $S=ab\\sin\\theta$ (삼각형 두 개)\n' +
          '- **사각형**: 두 대각선의 길이 $p$, $q$와 대각선이 이루는 각 $\\theta$ → $S=\\frac{1}{2}pq\\sin\\theta$\n\n' +
          '예: $a=4$, $b=6$, $C=30°$이면 $S=\\frac{1}{2}\\times4\\times6\\times\\frac{1}{2}=6$입니다.',
        easy: '중학교에서 배운 삼각형의 넓이는 $\\frac{1}{2}\\times(\\text{밑변})\\times(\\text{높이})$입니다. 높이를 재기 어려울 때, 옆변 $b$를 기울여 세운 높이가 $b\\sin C$입니다.\n\n' +
          '그러니 $\\frac{1}{2}ab\\sin C$는 "밑변 × 높이 ÷ 2"를 각으로 바꿔 쓴 것뿐입니다. 끼인각이 $90°$이면 $\\sin 90°=1$이라 직각삼각형의 넓이 공식과 같아집니다.',
        fig: {
          type: 'polygon', points: [[0, 0], [6, 0], [2, 3.5]], labels: ['B', 'C', 'A'],
          sides: ['a', 'b', 'c'], angles: [{ at: 1, label: 'C' }],
          segments: [{ from: [2, 3.5], to: [2, 0], dashed: true, label: 'h', right: true }],
          alt: '삼각형 ABC에서 밑변 BC(길이 a), 변 CA(길이 b), 꼭짓점 A에서 BC에 내린 높이 h(점선)와 각 C',
        },
        check: {
          type: 'short', check: 'number',
          q: '두 변의 길이가 $6$, $8$이고 그 끼인각의 크기가 $30°$인 삼각형의 넓이를 구하십시오.',
          answer: '12',
          wrong: [
            { a: '24', why: '$\\frac{1}{2}$ 또는 $\\sin 30°=\\frac{1}{2}$ 가운데 하나를 빠뜨렸습니다. 둘 다 곱합니다.' },
            { a: '48', why: '두 변을 곱하기만 했습니다. $\\frac{1}{2}\\times6\\times8\\times\\sin 30°$입니다.' },
          ],
          explain: '$S=\\frac{1}{2}\\times6\\times8\\times\\sin 30°=24\\times\\frac{1}{2}=12$입니다.',
        },
      },
      {
        title: '직접 잴 수 없는 거리와 높이 — 측량',
        body: '강 건너편, 호수의 양쪽 끝, 높은 탑 꼭대기처럼 줄자를 댈 수 없는 곳도 **잴 수 있는 길이와 각**으로 삼각형을 만들면 계산할 수 있습니다.\n\n' +
          '| 잰 것 | 쓰는 법칙 |\n|---|---|\n| 두 변과 그 끼인각 | 코사인법칙 → 나머지 변 |\n| 한 변과 양 끝의 두 각 | 세 각의 합으로 나머지 각 → 사인법칙 |\n| 수평 거리와 올려본각 | 직각삼각형의 삼각비($\\tan$) → 높이 |\n\n' +
          '예: 호수의 양 끝 A, B 사이의 거리를 구하려고, 호수 밖의 지점 C에서 $\\overline{CA}=500$ m, $\\overline{CB}=800$ m, $\\angle ACB=60°$를 쟀습니다.\n\n' +
          '$\\overline{AB}^2=500^2+800^2-2\\times500\\times800\\times\\frac{1}{2}=490000$이므로 $\\overline{AB}=700$ m입니다.\n\n' +
          '> 💡 측량 문제는 먼저 그림을 그리고, **어떤 삼각형에서 무엇을 알고 무엇을 구하는지** 표시하면 쓸 법칙이 보입니다.',
        easy: '사람이 갈 수 있는 곳에 한 점을 잡고, 거기서 두 목표까지의 거리와 그 사이의 각을 잽니다. 그러면 "두 변과 끼인각"을 아는 삼각형이 생기므로 코사인법칙으로 남은 한 변을 계산할 수 있습니다.\n\n' +
          '거리를 재기 힘들면 기준선 하나의 길이와 양 끝에서 본 각을 잽니다. 그러면 "한 변과 두 각"을 아는 삼각형이 되어 사인법칙을 씁니다.',
        fig: {
          type: 'polygon', points: [[0, 0], [5, 0], [4, 6.93]], labels: ['C', 'A', 'B'],
          sides: ['500 m', '?', '800 m'], angles: [{ at: 0, label: '60°' }],
          alt: '삼각형 CAB. 변 CA는 500 m, 변 CB는 800 m, 각 C는 60°이고 변 AB의 길이는 물음표',
        },
        check: {
          type: 'choice',
          q: '두 지점 A, B 사이의 거리를 구하려고 지점 C에서 $\\overline{CA}$, $\\overline{CB}$의 길이와 $\\angle ACB$의 크기를 쟀습니다. 바로 쓸 수 있는 것은 무엇입니까?',
          choices: ['코사인법칙', '사인법칙', '피타고라스 정리'],
          answer: 0,
          why: ['', '사인법칙을 쓰려면 한 변과 그 대각을 알아야 합니다. 여기서는 $\\overline{AB}$의 대각만 압니다.', '$\\angle ACB$가 직각이라는 조건이 없습니다. 직각이 아니면 피타고라스 정리를 쓸 수 없습니다.'],
          explain: '두 변 $\\overline{CA}$, $\\overline{CB}$와 그 끼인각 $\\angle ACB$를 알므로 코사인법칙으로 $\\overline{AB}$를 구합니다.',
        },
      },
    ],

    examples: [
      {
        q: '삼각형 ABC에서 $A=60°$, $B=45°$, $b=4$일 때, $a$의 값과 외접원의 반지름의 길이 $R$을 구하십시오.',
        steps: [
          '한 변 $b$와 그 대각 $B$를 알므로 사인법칙을 씁니다. $\\frac{a}{\\sin 60°}=\\frac{4}{\\sin 45°}$',
          '$a=\\frac{4\\sin 60°}{\\sin 45°}=\\frac{4\\times\\frac{\\sqrt{3}}{2}}{\\frac{\\sqrt{2}}{2}}=\\frac{4\\sqrt{3}}{\\sqrt{2}}=2\\sqrt{6}$',
          '외접원: $2R=\\frac{b}{\\sin B}=\\frac{4}{\\frac{\\sqrt{2}}{2}}=\\frac{8}{\\sqrt{2}}=4\\sqrt{2}$이므로 $R=2\\sqrt{2}$입니다.',
        ],
        answer: '$a=2\\sqrt{6}$, $R=2\\sqrt{2}$',
      },
      {
        q: '세 변의 길이가 $13$, $14$, $15$인 삼각형의 넓이를 구하십시오.',
        steps: [
          '$a=13$, $b=14$, $c=15$로 놓고, 길이가 $14$인 변의 대각 $B$의 코사인값을 구합니다. $\\cos B=\\frac{c^2+a^2-b^2}{2ca}=\\frac{225+169-196}{2\\times15\\times13}=\\frac{198}{390}=\\frac{33}{65}$',
          '$0°<B<180°$에서 $\\sin B>0$이므로 $\\sin B=\\sqrt{1-\\left(\\frac{33}{65}\\right)^2}=\\sqrt{\\frac{3136}{4225}}=\\frac{56}{65}$입니다.',
          '$S=\\frac{1}{2}ca\\sin B=\\frac{1}{2}\\times15\\times13\\times\\frac{56}{65}=84$',
        ],
        answer: '$84$',
      },
      {
        q: '강 건너편의 지점 P까지의 거리를 구하려고 강가에 두 지점 A, B를 잡았더니 $\\overline{AB}=40$ m, $\\angle PAB=75°$, $\\angle PBA=60°$였습니다. $\\overline{AP}$의 길이를 구하십시오.',
        fig: {
          type: 'polygon', points: [[0, 0], [4, 0], [1.27, 4.73]], labels: ['A', 'B', 'P'],
          sides: ['40 m', null, '?'], angles: [{ at: 0, label: '75°' }, { at: 1, label: '60°' }],
          alt: '삼각형 ABP. 변 AB는 40 m, 각 A는 75°, 각 B는 60°이고 변 AP의 길이는 물음표',
        },
        steps: [
          '세 각의 합에서 $\\angle APB=180°-(75°+60°)=45°$입니다.',
          '$\\overline{AP}$의 대각은 $\\angle PBA=60°$, $\\overline{AB}$의 대각은 $\\angle APB=45°$이므로 사인법칙에서 $\\frac{\\overline{AP}}{\\sin 60°}=\\frac{40}{\\sin 45°}$',
          '$\\overline{AP}=\\frac{40\\times\\frac{\\sqrt{3}}{2}}{\\frac{\\sqrt{2}}{2}}=\\frac{40\\sqrt{3}}{\\sqrt{2}}=20\\sqrt{6}$ (m)',
        ],
        answer: '$20\\sqrt{6}$ m',
      },
    ],

    terms: [
      { term: '사인법칙', def: '삼각형 ABC의 외접원의 반지름의 길이를 $R$이라 할 때 $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$이 성립한다는 법칙입니다.' },
      { term: '코사인법칙', def: '삼각형 ABC에서 $a^2=b^2+c^2-2bc\\cos A$가 성립한다는 법칙입니다. 다른 두 변에 대해서도 같은 꼴입니다.' },
      { term: '외접원', def: '삼각형의 세 꼭짓점을 모두 지나는 원입니다. 중심은 세 변의 수직이등분선이 만나는 점(외심)입니다.' },
      { term: '대변', def: '삼각형에서 한 각과 마주 보는 변입니다. $\\angle A$의 대변은 $\\overline{BC}$이고, 그 길이를 $a$로 씁니다.' },
      { term: '끼인각', def: '두 변 사이에 끼어 있는 각입니다. 변 $b$와 $c$의 끼인각은 $\\angle A$입니다.' },
      { term: '삼각형의 넓이 공식', def: '두 변의 길이 $a$, $b$와 그 끼인각 $C$로 넓이를 구하는 식 $S=\\frac{1}{2}ab\\sin C$입니다.' },
      { term: '헤론의 공식', def: '세 변의 길이로 삼각형의 넓이를 구하는 식입니다. $s=\\frac{a+b+c}{2}$일 때 $S=\\sqrt{s(s-a)(s-b)(s-c)}$입니다.' },
      { term: '올려본각', def: '수평선과, 눈에서 위쪽의 물체를 잇는 선이 이루는 각입니다. 아래를 볼 때는 내려본각이라고 합니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', concept: 0,
        q: '삼각형 ABC에서 $b=6\\sqrt{3}$, $B=60°$일 때, 외접원의 반지름의 길이를 구하십시오.',
        answer: '6',
        wrong: [{ a: '12', why: '$\\frac{b}{\\sin B}=12$는 지름 $2R$입니다. 반지름은 그 절반입니다.' }],
        explain: '$2R=\\frac{b}{\\sin B}=\\frac{6\\sqrt{3}}{\\frac{\\sqrt{3}}{2}}=12$이므로 $R=6$입니다.',
      },
      {
        id: 'p2', level: 1, type: 'choice', concept: 1,
        q: '삼각형 ABC에서 $A=30°$, $B=45°$, $a=6$일 때, $b$의 값은 무엇입니까?',
        choices: ['$6\\sqrt{2}$', '$3\\sqrt{2}$', '$6\\sqrt{3}$', '$12$'],
        answer: 0,
        why: [
          '',
          '비를 거꾸로 세웠습니다. $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$이므로 $b=\\frac{a\\sin B}{\\sin A}$입니다.',
          '$\\sin 45°$의 값을 잘못 썼습니다. $\\sin 45°=\\frac{\\sqrt{2}}{2}$입니다.',
          '$\\frac{a}{\\sin A}=12$는 $2R$입니다. 여기에 $\\sin B$를 곱해야 $b$가 됩니다.',
        ],
        explain: '$b=\\frac{a\\sin B}{\\sin A}=\\frac{6\\times\\frac{\\sqrt{2}}{2}}{\\frac{1}{2}}=6\\sqrt{2}$입니다.',
      },
      {
        id: 'p3', level: 1, type: 'short', check: 'number', concept: 2,
        q: '삼각형 ABC에서 $b=3$, $c=5$, $A=120°$일 때, $a$의 값을 구하십시오.',
        answer: '7',
        wrong: [{ a: '49', why: '$a^2=49$까지 구했습니다. $a>0$이므로 제곱근을 구합니다.' }],
        hint: '$\\cos 120°=-\\frac{1}{2}$입니다.',
        explain: '$a^2=3^2+5^2-2\\times3\\times5\\times\\left(-\\frac{1}{2}\\right)=9+25+15=49$이고 $a>0$이므로 $a=7$입니다. $\\cos 120°$가 음수라서 빼는 항이 더해집니다.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 3,
        q: '세 변의 길이가 $4$, $5$, $6$인 삼각형은 둔각삼각형입니다.',
        answer: false,
        explain: '가장 긴 변 $6$을 보면 $6^2=36<4^2+5^2=41$이므로 가장 큰 각이 예각입니다. 그래서 **예각삼각형**입니다. (가장 큰 각의 코사인값은 $\\frac{16+25-36}{40}=\\frac{1}{8}>0$)',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', unit: '°', concept: 3,
        q: '삼각형 ABC에서 $a=13$, $b=7$, $c=8$일 때, $A$의 크기는 몇 도입니까?',
        answer: '120',
        wrong: [{ a: '60', why: '코사인값의 부호를 놓쳤습니다. $\\cos A=-\\frac{1}{2}$이므로 $A$는 둔각입니다.' }],
        explain: '$\\cos A=\\frac{b^2+c^2-a^2}{2bc}=\\frac{49+64-169}{2\\times7\\times8}=\\frac{-56}{112}=-\\frac{1}{2}$이므로 $A=120°$입니다.',
      },
      {
        id: 'p6', level: 1, type: 'choice', concept: 4,
        q: '삼각형 ABC에서 $b=4$, $c=6$, $A=135°$일 때, 삼각형 ABC의 넓이는 무엇입니까?',
        choices: ['$6\\sqrt{2}$', '$12\\sqrt{2}$', '$-6\\sqrt{2}$', '$6\\sqrt{3}$'],
        answer: 0,
        why: [
          '',
          '앞의 $\\frac{1}{2}$을 빠뜨렸습니다.',
          '사인 대신 코사인을 썼습니다. 넓이는 음수가 될 수 없고, 공식은 $\\frac{1}{2}bc\\sin A$입니다.',
          '$\\sin 135°$의 값을 잘못 썼습니다. $\\sin 135°=\\sin 45°=\\frac{\\sqrt{2}}{2}$입니다.',
        ],
        explain: '$S=\\frac{1}{2}\\times4\\times6\\times\\sin 135°=12\\times\\frac{\\sqrt{2}}{2}=6\\sqrt{2}$입니다.',
      },
      {
        id: 'p7', level: 2, type: 'short', check: 'number', concept: 4,
        q: '이웃한 두 변의 길이가 $5$, $8$이고 그 끼인각의 크기가 $30°$인 평행사변형의 넓이를 구하십시오.',
        answer: '20',
        wrong: [{ a: '10', why: '삼각형 하나의 넓이만 구했습니다. 평행사변형은 대각선으로 나눈 합동인 삼각형 두 개입니다.' }],
        hint: '대각선 하나를 그어 삼각형 두 개로 나누어 보십시오.',
        explain: '대각선으로 나누면 두 변 $5$, $8$과 끼인각 $30°$인 삼각형 두 개가 됩니다. $S=2\\times\\frac{1}{2}\\times5\\times8\\times\\sin 30°=40\\times\\frac{1}{2}=20$입니다.',
      },
      {
        id: 'p8', level: 2, type: 'choice', concept: 1,
        q: '삼각형 ABC에서 $A:B:C=1:1:4$일 때, $a:b:c$는 무엇입니까?',
        choices: ['$1:1:\\sqrt{3}$', '$1:1:4$', '$1:1:\\sqrt{2}$', '$\\sqrt{3}:\\sqrt{3}:1$'],
        answer: 0,
        why: [
          '',
          '각의 비를 그대로 썼습니다. 변의 비는 사인의 비입니다.',
          '직각이등변삼각형의 변의 비와 헷갈렸습니다. $C=120°$입니다.',
          '사인 대신 코사인의 크기를 썼습니다.',
        ],
        hint: '먼저 세 각의 크기를 구합니다.',
        explain: '$A=B=180°\\times\\frac{1}{6}=30°$, $C=120°$입니다. $a:b:c=\\sin 30°:\\sin 30°:\\sin 120°=\\frac{1}{2}:\\frac{1}{2}:\\frac{\\sqrt{3}}{2}=1:1:\\sqrt{3}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 4,
        q: '세 변의 길이가 $3$, $5$, $7$인 삼각형의 넓이는 무엇입니까?',
        choices: ['$\\frac{15\\sqrt{3}}{4}$', '$\\frac{15\\sqrt{3}}{2}$', '$\\frac{15}{4}$', '$-\\frac{15}{4}$'],
        answer: 0,
        why: [
          '',
          '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다.',
          '$\\sin 120°$를 $\\frac{1}{2}$로 잘못 썼습니다. $\\sin 120°=\\frac{\\sqrt{3}}{2}$입니다.',
          '코사인값 $-\\frac{1}{2}$을 사인 자리에 넣었습니다. 넓이는 음수가 될 수 없습니다.',
        ],
        hint: '가장 긴 변의 대각을 코사인법칙으로 먼저 구합니다.',
        explain: '길이가 $7$인 변의 대각을 $\\theta$라 하면 $\\cos\\theta=\\frac{9+25-49}{2\\times3\\times5}=-\\frac{1}{2}$이므로 $\\theta=120°$입니다. $S=\\frac{1}{2}\\times3\\times5\\times\\sin 120°=\\frac{15}{2}\\times\\frac{\\sqrt{3}}{2}=\\frac{15\\sqrt{3}}{4}$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: 'm', concept: 5,
        q: '연못의 양 끝 A, B 사이의 거리를 구하려고 연못 밖의 지점 C에서 쟀더니 $\\overline{CA}=30$ m, $\\overline{CB}=50$ m, $\\angle ACB=120°$였습니다. 두 지점 A, B 사이의 거리는 몇 m입니까?',
        fig: {
          type: 'polygon', points: [[0, 0], [3, 0], [-2.5, 4.33]], labels: ['C', 'A', 'B'],
          sides: ['30 m', '?', '50 m'], angles: [{ at: 0, label: '120°' }],
          alt: '삼각형 CAB. 변 CA는 30 m, 변 CB는 50 m, 각 C는 120°이고 변 AB의 길이는 물음표',
        },
        answer: '70',
        wrong: [{ a: '4900', why: '$\\overline{AB}^2$까지 구했습니다. 제곱근을 구합니다.' }],
        hint: '두 변과 그 끼인각을 알고 있습니다.',
        explain: '코사인법칙에서 $\\overline{AB}^2=30^2+50^2-2\\times30\\times50\\times\\cos 120°=900+2500+1500=4900$이므로 $\\overline{AB}=70$ m입니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 5,
        q: '평지에 서 있는 탑의 꼭대기 P를 지점 A에서 올려본각은 $30°$이고, 탑 쪽으로 $20$ m 걸어간 지점 B에서 올려본각은 $60°$입니다. A, B와 탑의 밑 Q는 한 직선 위에 있습니다. 탑의 높이 $\\overline{PQ}$는 얼마입니까?',
        fig: {
          type: 'polygon', points: [[0, 0], [2, 0], [3, 0], [3, 1.732]], labels: ['A', 'B', 'Q', 'P'],
          sides: ['20 m', null, null, null], angles: [{ at: 0, label: '30°' }, { at: 2, right: true }],
          segments: [{ from: [2, 0], to: [3, 1.732], dashed: true }],
          alt: '지면 위의 A, B, Q와 탑 꼭대기 P. AB는 20 m, A에서 P를 올려본각은 30°, Q에서 직각이고, B와 P를 잇는 점선이 있다',
        },
        choices: ['$10\\sqrt{3}$ m', '$20$ m', '$10$ m', '$20\\sqrt{3}$ m'],
        answer: 0,
        why: [
          '',
          '$\\overline{BP}=20$ m까지 구했습니다. 높이는 $\\overline{BP}\\sin 60°$입니다.',
          '$\\overline{BP}\\sin 30°$를 계산했습니다. 직각삼각형 PBQ에서 B의 각은 $60°$입니다.',
          '$\\overline{BP}\\tan 60°$를 계산했습니다. 빗변 $\\overline{BP}$에 곱하는 것은 사인입니다.',
        ],
        hint: '삼각형 ABP의 세 각을 먼저 구해 보십시오.',
        explain: '삼각형 ABP에서 $\\angle PAB=30°$, $\\angle ABP=180°-60°=120°$이므로 $\\angle APB=30°$입니다. 두 각이 같으므로 $\\overline{BP}=\\overline{AB}=20$ m입니다. 직각삼각형 PBQ에서 $\\overline{PQ}=20\\sin 60°=10\\sqrt{3}$ (m)입니다.',
      },
      {
        id: 'p12', level: 1, type: 'ox', concept: 0,
        q: '외접원의 반지름의 길이가 $R$인 삼각형에서 어떤 변의 길이도 $2R$보다 클 수 없습니다.',
        answer: true,
        explain: '사인법칙에서 $a=2R\\sin A$이고 $0<\\sin A\\le 1$이므로 $a\\le 2R$입니다. 변은 외접원의 현이므로 지름보다 길 수 없습니다. 같아지는 것은 $A=90°$일 때입니다.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', concept: 1,
        q: '외접원의 반지름의 길이가 $5$인 삼각형 ABC에서 $\\sin A+\\sin B+\\sin C=\\frac{3}{2}$일 때, 삼각형 ABC의 둘레의 길이를 구하십시오.',
        answer: '15',
        wrong: [{ a: '15/2', why: '$a=R\\sin A$로 계산했습니다. 사인법칙에서 $a=2R\\sin A$입니다.' }],
        hint: '각 변을 $2R\\sin A$ 꼴로 바꿉니다.',
        explain: '$a=2R\\sin A$, $b=2R\\sin B$, $c=2R\\sin C$이므로 $a+b+c=2R(\\sin A+\\sin B+\\sin C)=10\\times\\frac{3}{2}=15$입니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 1,
        q: '삼각형 ABC에서 다음 등식이 성립할 때, 삼각형 ABC는 어떤 삼각형입니까?\n\n$\\sin^2 A=\\sin^2 B+\\sin^2 C$',
        choices: ['$A=90°$인 직각삼각형', '$a=b$인 이등변삼각형', '정삼각형', '$B=90°$인 직각삼각형'],
        answer: 0,
        why: [
          '',
          '변의 길이 관계를 잘못 읽었습니다. 사인을 변으로 바꾸면 $a^2=b^2+c^2$입니다.',
          '정삼각형이면 $\\sin^2 A=\\frac{3}{4}$, $\\sin^2 B+\\sin^2 C=\\frac{3}{2}$이라 성립하지 않습니다.',
          '빗변을 잘못 골랐습니다. $a^2=b^2+c^2$에서 빗변은 $a$이므로 직각은 $A$입니다.',
        ],
        hint: '사인법칙으로 $\\sin A=\\frac{a}{2R}$처럼 바꾸어 보십시오.',
        explain: '$\\sin A=\\frac{a}{2R}$, $\\sin B=\\frac{b}{2R}$, $\\sin C=\\frac{c}{2R}$를 넣고 양변에 $4R^2$을 곱하면 $a^2=b^2+c^2$입니다. 코사인법칙에서 $\\cos A=\\frac{b^2+c^2-a^2}{2bc}=0$이므로 $A=90°$인 직각삼각형입니다.',
      },
      {
        id: 'a3', level: 3, type: 'choice', concept: 4,
        q: '삼각형 ABC에서 $\\overline{AB}=8$, $\\overline{AC}=5$, $A=60°$입니다. $\\angle A$의 이등분선이 변 BC와 만나는 점을 D라 할 때, $\\overline{AD}$의 길이는 무엇입니까?',
        choices: ['$\\frac{40\\sqrt{3}}{13}$', '$\\frac{80\\sqrt{3}}{13}$', '$\\frac{40}{13}$', '$\\frac{20\\sqrt{3}}{13}$'],
        answer: 0,
        why: [
          '',
          '삼각형 ABC의 넓이에서 $\\frac{1}{2}$을 빠뜨렸습니다.',
          '작은 삼각형의 끼인각을 $60°$로 썼습니다. 이등분했으므로 $30°$입니다.',
          '작은 두 삼각형의 넓이에서 $\\frac{1}{2}$을 빠뜨렸습니다.',
        ],
        hint: '(삼각형 ABD의 넓이) + (삼각형 ADC의 넓이) = (삼각형 ABC의 넓이)',
        explain: '$\\overline{AD}=x$라 하면 $\\frac{1}{2}\\times8\\times x\\times\\sin 30°+\\frac{1}{2}\\times5\\times x\\times\\sin 30°=\\frac{1}{2}\\times8\\times5\\times\\sin 60°$입니다. 좌변은 $2x+\\frac{5}{4}x=\\frac{13}{4}x$, 우변은 $10\\sqrt{3}$이므로 $x=\\frac{40\\sqrt{3}}{13}$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 3,
        q: '세 변의 길이가 $x$, $x+1$, $x+2$인 삼각형이 둔각삼각형이 되도록 하는 자연수 $x$의 값을 구하십시오.',
        answer: '2',
        wrong: [
          { a: '1', why: '$1$, $2$, $3$은 $1+2=3$이라 삼각형이 만들어지지 않습니다.' },
          { a: '3', why: '$3$, $4$, $5$는 $5^2=3^2+4^2$이므로 직각삼각형입니다.' },
        ],
        hint: '삼각형이 될 조건과 가장 큰 각이 둔각일 조건을 함께 씁니다.',
        explain: '삼각형이 되려면 $x+(x+1)>x+2$, 곧 $x>1$입니다. 가장 긴 변 $x+2$의 대각이 둔각이려면 $(x+2)^2>x^2+(x+1)^2$, 곧 $x^2-2x-3<0$, $(x+1)(x-3)<0$에서 $-1<x<3$입니다. 두 조건을 모두 만족하는 자연수는 $x=2$입니다. (확인: $4^2=16>2^2+3^2=13$)',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 5,
        q: '탑의 밑 Q와 같은 평지 위의 두 지점 A, B 사이의 거리는 $60$ m이고, $\\angle QAB=75°$, $\\angle QBA=60°$입니다. 지점 A에서 탑의 꼭대기 P를 올려본각이 $30°$일 때, 탑의 높이 $\\overline{PQ}$는 얼마입니까?',
        choices: ['$30\\sqrt{2}$ m', '$30\\sqrt{6}$ m', '$15\\sqrt{6}$ m', '$90\\sqrt{2}$ m'],
        answer: 0,
        why: [
          '',
          '$\\overline{AQ}$까지 구했습니다. 높이는 $\\overline{AQ}\\tan 30°$입니다.',
          '$\\overline{AQ}\\sin 30°$를 계산했습니다. 수평 거리 $\\overline{AQ}$에서 높이를 구할 때는 탄젠트를 씁니다.',
          '$\\tan 60°$를 곱했습니다. A에서 올려본각은 $30°$입니다.',
        ],
        hint: '먼저 평지 위의 삼각형 ABQ에서 사인법칙으로 $\\overline{AQ}$를 구합니다.',
        explain: '삼각형 ABQ에서 $\\angle AQB=180°-(75°+60°)=45°$입니다. 사인법칙에서 $\\overline{AQ}=\\frac{60\\sin 60°}{\\sin 45°}=\\frac{60\\times\\frac{\\sqrt{3}}{2}}{\\frac{\\sqrt{2}}{2}}=30\\sqrt{6}$ (m)입니다. 직각삼각형 PAQ에서 $\\overline{PQ}=\\overline{AQ}\\tan 30°=30\\sqrt{6}\\times\\frac{\\sqrt{3}}{3}=30\\sqrt{2}$ (m)입니다.',
      },
    ],

    deeper: [
      {
        title: '헤론의 공식 — 세 변만으로 넓이 구하기',
        body: '세 변의 길이 $a$, $b$, $c$만 알 때 각을 구하지 않고 넓이를 바로 구하는 식이 있습니다. 고대 그리스의 수학자 헤론의 이름이 붙은 공식입니다.\n\n$s=\\frac{a+b+c}{2}$일 때 $S=\\sqrt{s(s-a)(s-b)(s-c)}$\n\n' +
          '예: $13$, $14$, $15$이면 $s=21$이고 $S=\\sqrt{21\\times8\\times7\\times6}=\\sqrt{7056}=84$입니다. 예제에서 코사인법칙으로 구한 값과 같습니다.\n\n' +
          '이 공식은 $S=\\frac{1}{2}ab\\sin C$에 코사인법칙과 항등식 $\\sin^2 C+\\cos^2 C=1$을 함께 써서 정리하고 인수분해하면 얻어집니다. 이 단원에서 배운 두 법칙을 합친 결과입니다.',
      },
      {
        title: '두 변과 한 대각 — 삼각형이 둘일 수도 있다',
        body: '중학교에서 삼각형이 하나로 정해지는 조건(세 변, 두 변과 끼인각, 한 변과 양 끝 각)을 배웠습니다. 두 변과 **끼인각이 아닌** 각을 주면 삼각형이 하나로 정해지지 않을 수 있습니다.\n\n' +
          '예: $a=4$, $b=4\\sqrt{3}$, $A=30°$이면 사인법칙에서 $\\sin B=\\frac{b\\sin A}{a}=\\frac{\\sqrt{3}}{2}$이므로 $B=60°$ 또는 $B=120°$입니다. 두 경우 모두 $A+B<180°$이므로 조건에 맞는 삼각형이 두 개 있습니다.\n\n' +
          '그래서 사인법칙으로 각을 구할 때는 사인값이 같은 두 각($\\theta$와 $180°-\\theta$)을 모두 따져 보아야 합니다. 코사인법칙으로 각을 구하면 $0°$와 $180°$ 사이에 코사인값이 같은 각이 하나뿐이라 이런 일이 없습니다.',
      },
    ],

    faq: [
      {
        q: '사인법칙이랑 코사인법칙은 언제 뭘 써요?',
        a: '주어진 것을 보고 고릅니다. **한 변과 그 대각**이 짝으로 있으면(두 각과 한 변 등) 사인법칙을 씁니다. **두 변과 끼인각**이나 **세 변**을 알면 코사인법칙을 씁니다. 외접원의 반지름이 나오면 사인법칙을 먼저 떠올립니다.',
      },
      {
        q: '넓이 공식에는 왜 코사인이 아니라 사인이 들어가요?',
        a: '넓이는 밑변 × 높이 ÷ 2이고, 옆변 $b$를 비스듬히 세웠을 때의 높이가 $b\\sin C$이기 때문입니다. 끼인각이 $90°$일 때 넓이가 가장 크고($\\sin 90°=1$), 각이 $0°$나 $180°$에 가까워 납작해지면 넓이도 0에 가까워지는 것과 맞습니다.',
      },
      {
        q: '사인법칙에서 2R은 꼭 써야 해요?',
        a: '외접원이 나오지 않는 문제에서는 $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$만 써도 됩니다. 하지만 외접원의 반지름을 묻거나, 변과 사인을 서로 바꿀 때($a=2R\\sin A$) 꼭 필요합니다. 반지름 $R$과 지름 $2R$을 헷갈리는 실수가 가장 많습니다.',
      },
    ],

    mistakes: [
      '사인법칙의 값 $\\frac{a}{\\sin A}$를 반지름 $R$로 착각하는 실수 — 그 값은 지름 $2R$입니다.',
      '둔각의 코사인값을 양수로 넣는 실수 — $\\cos 120°=-\\frac{1}{2}$이므로 코사인법칙의 $-2bc\\cos A$가 오히려 더해집니다.',
      '변의 비를 각의 비와 같다고 보는 실수 — $a:b:c=\\sin A:\\sin B:\\sin C$입니다.',
    ],

    gens: [
      {
        id: 'cos-law-side',
        level: 1,
        title: '코사인법칙으로 나머지 변 구하기',
        make: function (R) {
          var b, c, wrong = [];
          if (R.random() < 0.6) {
            // 끼인각이 60° 또는 120° 이고 a 가 자연수가 되는 삼각형
            var ang = R.pick([60, 120]);
            var t = R.pick(ang === 60
              ? [[3, 8, 7], [5, 8, 7], [7, 15, 13], [8, 15, 13], [5, 21, 19], [16, 21, 19], [6, 16, 14], [10, 16, 14]]
              : [[3, 5, 7], [7, 8, 13], [5, 16, 19], [6, 10, 14], [9, 15, 21], [11, 24, 31]]);
            b = t[0]; c = t[1];
            if (R.bool()) { b = t[1]; c = t[0]; }
            var a = t[2], a2 = a * a;
            var cosTex = ang === 60 ? '\\frac{1}{2}' : '\\left(-\\frac{1}{2}\\right)';
            wrong.push({ a: String(a2), why: '$a^2=' + a2 + '$까지 구했습니다. $a>0$이므로 제곱근을 구합니다.' });
            var flip = ang === 60 ? b * b + c * c + b * c : b * b + c * c - b * c;
            var rf = Math.round(Math.sqrt(flip));
            if (rf * rf === flip && rf !== a) wrong.push({ a: String(rf), why: '$\\cos ' + ang + '°$의 부호를 거꾸로 넣었습니다. $\\cos ' + ang + '°=' + (ang === 60 ? '\\frac{1}{2}' : '-\\frac{1}{2}') + '$입니다.' });
            return {
              type: 'short', check: 'number', concept: 2,
              q: '삼각형 ABC에서 $b=' + b + '$, $c=' + c + '$, $A=' + ang + '°$일 때, $a$의 값을 구하십시오.',
              answer: String(a),
              wrong: wrong,
              hint: '두 변과 그 끼인각을 알 때는 코사인법칙을 씁니다.',
              explain: '$a^2=b^2+c^2-2bc\\cos A=' + b + '^2+' + c + '^2-2\\times' + b + '\\times' + c + '\\times' + cosTex + '=' + a2 + '$이고 $a>0$이므로 $a=' + a + '$입니다.',
            };
          }
          // cos A 가 분수로 주어지고 a² 을 묻는다
          var q = R.pick([3, 4, 5]);
          var p = R.pick(q === 3 ? [1, 2, -1, -2] : q === 4 ? [1, 3, -1, -3] : [1, 2, 3, 4, -1, -2, -3, -4]);
          c = q * R.int(1, 2);
          b = R.int(2, 9);
          if (b === c) b = c + 1;
          if (R.bool()) { var s = b; b = c; c = s; }
          var cosF = R.F(p, q);
          var cosT = R.fmt.frac(cosF);
          var base = b * b + c * c;
          var ans = R.F(base).sub(cosF.mul(2 * b * c));
          var flipF = R.F(base).add(cosF.mul(2 * b * c));
          var halfF = R.F(base).sub(cosF.mul(b * c));
          return {
            type: 'short', check: 'number', concept: 2,
            q: '삼각형 ABC에서 $b=' + b + '$, $c=' + c + '$, $\\cos A=' + cosT + '$일 때, $a^2$의 값을 구하십시오.',
            answer: ans.toString(),
            wrong: [
              { a: flipF.toString(), why: '$-2bc\\cos A$의 부호를 거꾸로 했습니다. 코사인법칙은 $a^2=b^2+c^2-2bc\\cos A$입니다.' },
              { a: halfF.toString(), why: '$2bc\\cos A$에서 2를 빠뜨렸습니다.' },
            ],
            hint: '$a^2=b^2+c^2-2bc\\cos A$',
            explain: '$a^2=' + b + '^2+' + c + '^2-2\\times' + b + '\\times' + c + '\\times' + (p < 0 ? '\\left(' + cosT + '\\right)' : cosT) + '=' + base + R.fmt.signed(ans.sub(base).valueOf()) + '=' + ans.toString() + '$입니다.',
          };
        },
      },
      {
        id: 'area-sin',
        level: 1,
        title: '두 변과 끼인각으로 삼각형의 넓이 구하기',
        make: function (R) {
          var ang = R.pick([30, 45, 60, 120, 135, 150]);
          var a = R.int(2, 12), b = R.int(2, 12);
          if (a === b) b = a === 12 ? 11 : a + 1;
          var ab = a * b, r = SIN[ang][1], cs = COS[ang];
          var correct = radTex(R.F(ab, 4), r);
          var cands = [
            [radTex(R.F(ab, 2), r), '앞의 $\\frac{1}{2}$을 빠뜨렸습니다.'],
            [radTex(R.F(cs[0] * ab, 4), cs[1]), '사인 대신 코사인을 썼습니다. 넓이 공식은 $\\frac{1}{2}ab\\sin C$입니다.'],
            [radTex(R.F(ab, 8), r), '$\\frac{1}{2}$을 한 번 더 곱했습니다.'],
          ];
          [1, 2, 3].forEach(function (rr) {
            if (rr !== r) cands.push([radTex(R.F(ab, 4), rr), '$\\sin ' + ang + '°$의 값을 잘못 썼습니다. $\\sin ' + ang + '°=' + SINTEX[ang] + '$입니다.']);
          });
          var reason = {};
          cands.forEach(function (x) { if (x[0] !== correct && !(x[0] in reason)) reason[x[0]] = x[1]; });
          var pick = R.choices('$' + correct + '$', Object.keys(reason).map(function (k) { return '$' + k + '$'; }));
          return {
            type: 'choice', concept: 4,
            q: '삼각형 ABC에서 $a=' + a + '$, $b=' + b + '$, $C=' + ang + '°$일 때, 삼각형 ABC의 넓이는 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (x) { var k = x.slice(1, -1); return k === correct ? '' : reason[k]; }),
            explain: '$S=\\frac{1}{2}ab\\sin C=\\frac{1}{2}\\times' + a + '\\times' + b + '\\times\\sin ' + ang + '°=\\frac{' + ab + '}{2}\\times' + SINTEX[ang] + '=' + correct + '$입니다.' +
              (ang > 90 ? ' ($\\sin ' + ang + '°=\\sin ' + (180 - ang) + '°$)' : ''),
          };
        },
      },
      {
        id: 'sine-law',
        level: 2,
        title: '사인법칙으로 외접원의 반지름·변 구하기',
        make: function (R) {
          if (R.bool()) {
            var ang = R.pick([30, 45, 60, 120, 135, 150]);
            var m = R.int(2, 9), r = SIN[ang][1];
            var aTex = radTex(R.F(m), r);
            return {
              type: 'short', check: 'number', concept: 0,
              q: '삼각형 ABC에서 $a=' + aTex + '$, $A=' + ang + '°$일 때, 외접원의 반지름의 길이 $R$의 값을 구하십시오.',
              answer: String(m),
              wrong: [{ a: String(2 * m), why: '$\\frac{a}{\\sin A}=' + 2 * m + '$' + R.josa(2 * m, '은/는') + ' 지름 $2R$입니다. 반지름은 그 절반입니다.' }],
              hint: '$\\frac{a}{\\sin A}=2R$',
              explain: '사인법칙에서 $2R=\\frac{a}{\\sin A}=\\frac{' + aTex + '}{' + SINTEX[ang] + '}=' + 2 * m + '$이므로 $R=' + m + '$입니다.',
            };
          }
          var pairs = [];
          [30, 45, 60, 120, 135].forEach(function (x) {
            [30, 45, 60, 120, 135].forEach(function (y) { if (x !== y && x + y < 180) pairs.push([x, y]); });
          });
          var pr = R.pick(pairs), A = pr[0], B = pr[1];
          var k = R.int(2, 8), rA = SIN[A][1], rB = SIN[B][1];
          var aT = radTex(R.F(k), rA);
          var correct = radTex(R.F(k), rB);
          var cands = [
            [radTex(R.F(k * rA, rB), rB), '비를 거꾸로 세웠습니다. $b=\\frac{a\\sin B}{\\sin A}$입니다.'],
            [radTex(R.F(k, 2), rA * rB), '$a\\sin B$만 계산하고 $\\sin A$로 나누지 않았습니다.'],
            [radTex(R.F(2 * k), 1), '$\\frac{a}{\\sin A}=2R$까지만 구했습니다. 여기에 $\\sin B$를 곱해야 $b$입니다.'],
          ];
          [1, 2, 3].forEach(function (rr) {
            if (rr !== rB) cands.push([radTex(R.F(k), rr), '$\\sin ' + B + '°$의 값을 잘못 썼습니다. $\\sin ' + B + '°=' + SINTEX[B] + '$입니다.']);
          });
          var reason = {};
          cands.forEach(function (x) { if (x[0] !== correct && !(x[0] in reason)) reason[x[0]] = x[1]; });
          var pick = R.choices('$' + correct + '$', Object.keys(reason).map(function (x) { return '$' + x + '$'; }));
          return {
            type: 'choice', concept: 1,
            q: '삼각형 ABC에서 $A=' + A + '°$, $B=' + B + '°$, $a=' + aT + '$일 때, $b$의 값은 무엇입니까?',
            choices: pick.choices,
            answer: pick.answer,
            why: pick.choices.map(function (x) { var t = x.slice(1, -1); return t === correct ? '' : reason[t]; }),
            hint: '한 변과 그 대각을 알면 사인법칙을 씁니다.',
            explain: '사인법칙 $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$에서 $b=\\frac{a\\sin B}{\\sin A}=\\frac{' + aT + '\\times' + SINTEX[B] + '}{' + SINTEX[A] + '}=' + correct + '$입니다.',
          };
        },
      },
      {
        id: 'three-sides-area',
        level: 3,
        title: '세 변의 길이로 삼각형의 넓이 구하기',
        make: function (R) {
          var t = R.pick([[4, 13, 15], [5, 5, 6], [5, 5, 8], [7, 15, 20], [9, 10, 17], [10, 13, 13], [10, 17, 21], [11, 13, 20],
            [13, 14, 15], [13, 20, 21], [12, 17, 25], [3, 25, 26], [13, 13, 24], [6, 25, 29], [16, 17, 17], [17, 17, 30]]);
          var s = R.pick([1, 1, 2]);
          var a = t[0] * s, b = t[1] * s, c = t[2] * s;
          var cosF = R.F(a * a + b * b - c * c, 2 * a * b);
          var p = cosF.num, q = cosF.den;
          var tt = Math.round(Math.sqrt(q * q - p * p));
          var sinF = R.F(tt, q);
          var S = R.F(a * b).mul(sinF).div(2);
          var wrong = [{ a: S.mul(2).toString(), why: '넓이 공식의 $\\frac{1}{2}$을 빠뜨렸습니다.' }];
          var cosS = R.F(a * b).mul(cosF.abs()).div(2);
          if (!cosS.eq(S)) wrong.push({ a: cosS.toString(), why: '$\\sin C$ 대신 $\\cos C$의 크기를 넣었습니다. 사인값을 먼저 구합니다: $\\sin C=\\sqrt{1-\\cos^2 C}$' });
          var cosT = R.fmt.frac(cosF), sinT = R.fmt.frac(sinF);
          return {
            type: 'short', check: 'number', concept: 4,
            q: '세 변의 길이가 $' + a + '$, $' + b + '$, $' + c + '$인 삼각형의 넓이를 구하십시오.',
            answer: S.toString(),
            wrong: wrong,
            hint: '코사인법칙으로 한 각의 코사인값을 구한 뒤 사인값으로 바꿉니다.',
            explain: '$a=' + a + '$, $b=' + b + '$, $c=' + c + '$' + R.josa(c, '으로/로') + ' 놓으면 $\\cos C=\\frac{a^2+b^2-c^2}{2ab}=\\frac{' + (a * a + b * b - c * c) + '}{' + 2 * a * b + '}=' + cosT + '$입니다.\n\n' +
              '$0°<C<180°$에서 $\\sin C>0$이므로 $\\sin C=\\sqrt{1-\\left(' + cosT + '\\right)^2}=' + sinT + '$입니다.\n\n' +
              '$S=\\frac{1}{2}ab\\sin C=\\frac{1}{2}\\times' + a + '\\times' + b + '\\times' + sinT + '=' + S.toString() + '$입니다.',
          };
        },
      },
    ],
  });
})();
