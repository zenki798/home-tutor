/* 중2 수학 · 피타고라스 정리
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy)
 * 제곱근은 중3 에서 배우므로, 모든 길이 답은 자연수(또는 분수)가 되게 만든다("제곱해서 ○가 되는 양수"로 찾는다). */
(function () {
  // ---------- 그림 도우미 ----------
  // 직각삼각형: C(직각) 가 왼쪽 아래, B 오른쪽, A 위. 글: [CB, BA, AC]
  function rt(h, v, sides, alt, names) {
    return {
      type: 'polygon', points: [[0, 0], [h, 0], [0, v]], labels: names || ['C', 'B', 'A'],
      sides: sides, angles: [{ at: 0, right: true }], alt: alt,
    };
  }
  function r1(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function txt(x, y, s, size) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 14) + '" text-anchor="middle" dominant-baseline="central" fill="currentColor">' + s + '</text>';
  }
  function poly(pts, fill) {
    return '<polygon points="' + pts.map(function (p) { return r1(p[0]) + ',' + r1(p[1]); }).join(' ') + '" fill="' + (fill || 'none') + '"' + (fill ? ' fill-opacity="0.2"' : '') +
      ' stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>';
  }
  // 한 변이 a+b 인 정사각형 두 개: 왼쪽은 직각삼각형 4개 + 가운데 c², 오른쪽은 직각삼각형 4개 + a², b²
  var REARRANGE = (function () {
    var a = 60, b = 100, S = a + b, o = 210, s = '';
    s += poly([[0, 0], [S, 0], [S, S], [0, S]]);
    s += poly([[a, 0], [S, a], [S - a, S], [0, S - a]], 'var(--fig-1, #2563eb)');
    s += txt(S / 2, S / 2, 'c²', 16) + txt(a / 2, -10, 'a') + txt(a + b / 2, -10, 'b') + txt(-10, b / 2, 'b') + txt(-10, b + a / 2, 'a');
    s += txt(a + b / 2 - 8, a / 2 + 12, 'c', 13);
    s += poly([[o, 0], [o + S, 0], [o + S, S], [o, S]]);
    s += poly([[o, 0], [o + a, 0], [o + a, a], [o, a]], 'var(--fig-2, #f59e0b)');
    s += poly([[o + a, a], [o + S, a], [o + S, S], [o + a, S]], 'var(--fig-2, #f59e0b)');
    s += '<line x1="' + (o + a) + '" y1="0" x2="' + (o + S) + '" y2="' + a + '" stroke="currentColor" stroke-width="1.8"/>';
    s += '<line x1="' + o + '" y1="' + S + '" x2="' + (o + a) + '" y2="' + a + '" stroke="currentColor" stroke-width="1.8"/>';
    s += txt(o + a / 2, a / 2, 'a²', 15) + txt(o + a + b / 2, a + b / 2, 'b²', 16) + txt(o + a / 2, -10, 'a') + txt(o + a + b / 2, -10, 'b');
    return {
      type: 'svg',
      alt: '한 변이 a+b 인 정사각형 두 개. 왼쪽은 직각삼각형 4개와 가운데 넓이 c² 인 정사각형, 오른쪽은 같은 직각삼각형 4개와 넓이 a², b² 인 정사각형 두 개',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-22 -24 ' + (o + S + 30) + ' ' + (S + 32) + '">' + s + '</svg>',
    };
  })();

  function wrongs(ans, list) {
    var sa = String(ans).split('/'), av = sa.length === 2 ? Number(sa[0]) / Number(sa[1]) : Number(ans);
    var seen = [av], out = [];
    list.forEach(function (w) {
      var sv = String(w[0]).split('/'), v = sv.length === 2 ? Number(sv[0]) / Number(sv[1]) : Number(w[0]);
      if (!isFinite(v) || v <= 0 || seen.some(function (s) { return Math.abs(s - v) < 1e-9; })) return;
      seen.push(v);
      out.push({ a: String(w[0]), why: w[1] });
    });
    return out;
  }
  // 빗변 c 인 피타고라스 수 (a < b < c)
  var TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]];
  function scaled(R, maxC) {
    for (;;) {
      var t = R.pick(TRIPLES), k = R.int(1, 5);
      if (t[2] * k <= maxC && !(k > 1 && t[2] > 25)) return [t[0] * k, t[1] * k, t[2] * k];
    }
  }
  function isRight(x, y, z) { var s = [x, y, z].sort(function (p, q) { return p - q; }); return s[0] * s[0] + s[1] * s[1] === s[2] * s[2]; }
  function isTri(x, y, z) { var s = [x, y, z].sort(function (p, q) { return p - q; }); return s[0] + s[1] > s[2]; }

  Tutor.registerUnit({
    id: 'math-m2-11',
    course: 'math-m2',
    title: '피타고라스 정리',
    summary: '직각삼각형의 세 변 사이의 관계인 피타고라스 정리를 이해하고, 직각삼각형인지 판별하는 데 써요.',
    goals: [
      '피타고라스 정리를 알고 넓이를 이용해 그 까닭을 설명할 수 있어요.',
      '피타고라스 정리를 이용해 직각삼각형의 변의 길이를 구할 수 있어요.',
      '피타고라스 정리의 역을 이용해 직각삼각형인지 판별할 수 있어요.',
      '평면도형에서 직각삼각형을 찾아 피타고라스 정리를 활용할 수 있어요.',
    ],
    standards: ['[9수03-15]'],

    concepts: [
      {
        title: '피타고라스 정리',
        body: '직각삼각형에서 직각의 대변을 **빗변**이라고 해요. 빗변은 세 변 가운데 가장 길어요.\n\n' +
          '직각삼각형에서 직각을 낀 두 변의 길이를 $a$, $b$, 빗변의 길이를 $c$라고 하면 다음이 성립해요. 이것을 **피타고라스 정리**라고 해요.\n\n' +
          '$a^2+b^2=c^2$\n\n' +
          '곧 (직각을 낀 두 변의 길이를 각각 제곱하여 더한 값) $=$ (빗변의 길이의 제곱)이에요.\n\n' +
          '예: 직각을 낀 두 변이 3, 4이면 $3^2+4^2=9+16=25=5^2$이므로 빗변의 길이는 5예요.\n\n' +
          '> ⚠️ 이 관계는 **직각삼각형에서만** 성립해요. 그리고 $c$는 반드시 빗변(가장 긴 변)이어야 해요.',
        easy: '직각삼각형의 세 변 위에 각각 정사각형 타일을 붙여 본다고 생각해 보세요. 짧은 두 변 위의 타일 넓이를 합하면, 가장 긴 변(빗변) 위의 타일 넓이와 딱 같아요.\n\n' +
          '세 변이 3, 4, 5인 삼각형이면 타일 넓이는 9, 16, 25예요. $9+16=25$이지요. 이것이 피타고라스 정리예요.',
        fig: rt(4, 3, ['a', 'c', 'b'], '각 C 가 직각인 직각삼각형 ABC. 직각을 낀 두 변 a, b 와 빗변 c'),
        check: {
          type: 'short', check: 'number',
          q: '직각삼각형에서 직각을 낀 두 변의 길이가 6, 8일 때, 빗변의 길이는 얼마일까요?',
          answer: '10',
          wrong: [
            { a: '14', why: '두 변의 길이를 그냥 더했어요. 각각 제곱해서 더한 값이 빗변의 제곱이에요.' },
            { a: '100', why: '빗변의 길이의 **제곱**까지 구했어요. 제곱해서 100이 되는 양수를 찾아요.' },
          ],
          explain: '$6^2+8^2=36+64=100$이고 $10^2=100$이므로 빗변의 길이는 10이에요.',
        },
      },
      {
        title: '넓이로 피타고라스 정리 설명하기',
        body: '한 변의 길이가 $a+b$인 정사각형을 두 가지 방법으로 나누어 봐요. 직각을 낀 두 변이 $a$, $b$이고 빗변이 $c$인 직각삼각형 4개를 써요.\n\n' +
          '- **왼쪽**: 네 귀퉁이에 직각삼각형 4개를 놓으면, 가운데에 한 변이 $c$인 정사각형이 생겨요. 넓이는 $c^2$이에요.\n' +
          '- **오른쪽**: 같은 직각삼각형 4개를 두 개씩 붙여 직사각형 두 개로 놓으면, 남은 곳에 한 변이 $a$인 정사각형과 한 변이 $b$인 정사각형이 생겨요. 넓이의 합은 $a^2+b^2$이에요.\n\n' +
          '큰 정사각형의 넓이는 같고, 직각삼각형 4개의 넓이도 같아요. 그러니 남은 부분의 넓이도 같아야 해요.\n\n' +
          '$c^2=a^2+b^2$\n\n' +
          '> 💡 이처럼 피타고라스 정리는 "직각삼각형의 세 변 위에 그린 정사각형에서, 빗변 위 정사각형의 넓이는 나머지 두 정사각형의 넓이의 합과 같다"는 뜻이기도 해요.',
        easy: '종이로 똑같은 직각삼각형 4장을 오려, 큰 정사각형 틀 안에 놓아 보세요.\n\n' +
          '놓는 방법을 바꾸어도 삼각형 4장이 덮는 넓이는 그대로예요. 그러니 **덮이지 않고 남은 빈 곳의 넓이**도 그대로예요. 한 번은 빈 곳이 큰 정사각형 하나($c^2$), 한 번은 작은 정사각형 두 개($a^2+b^2$)일 뿐이에요.',
        fig: REARRANGE,
        check: {
          type: 'short', check: 'number',
          q: '직각삼각형의 세 변 위에 각각 정사각형을 그렸어요. 직각을 낀 두 변 위의 정사각형의 넓이가 각각 9, 16일 때, 빗변 위의 정사각형의 넓이는 얼마일까요?',
          answer: '25',
          wrong: [
            { a: '5', why: '빗변의 길이를 구했어요. 문제는 빗변 위 정사각형의 **넓이**예요.' },
            { a: '7', why: '두 정사각형의 넓이의 차를 구했어요. 빗변 위 정사각형의 넓이는 두 넓이의 **합**이에요.' },
          ],
          explain: '빗변 위 정사각형의 넓이는 나머지 두 정사각형의 넓이의 합이에요. $9+16=25$예요.',
        },
      },
      {
        title: '변의 길이 구하기',
        body: '직각삼각형에서 두 변의 길이를 알면 나머지 한 변의 길이를 구할 수 있어요.\n\n' +
          '- **빗변을 구할 때**: $c^2=a^2+b^2$ (더해요)\n' +
          '- **직각을 낀 변을 구할 때**: $b^2=c^2-a^2$ (빼요)\n\n' +
          '예: 빗변이 13, 한 변이 5이면 $b^2=13^2-5^2=169-25=144$이고 $12^2=144$이므로 $b=12$예요.\n\n' +
          '제곱해서 어떤 수가 되는 양수는 아래 표에서 찾을 수 있어요. (중학교 3학년에서는 이런 수를 **제곱근**으로 나타내는 방법을 배워요.)\n\n' +
          '| 수 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |\n|---|---|---|---|---|---|---|---|---|---|---|\n| 제곱 | 121 | 144 | 169 | 196 | 225 | 256 | 289 | 324 | 361 | 400 |\n\n' +
          '> 💡 자주 나오는 세 변의 길이: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25)와 그 배수 (6, 8, 10), (9, 12, 15) …',
        easy: '피타고라스 정리는 "작은 두 타일을 합치면 큰 타일"이라는 말이에요.\n\n' +
          '그래서 큰 타일(빗변)을 모를 때는 **더하고**, 작은 타일 하나를 모를 때는 큰 타일에서 다른 작은 타일을 **빼요**. 그다음 "몇을 두 번 곱하면 그 넓이가 되는지"만 찾으면 돼요.',
        fig: rt(12, 5, ['?', '13', '5'], '각 C 가 직각인 직각삼각형. 빗변 13, 한 변 5, 나머지 한 변은 모름'),
        check: {
          type: 'short', check: 'number',
          q: '직각삼각형에서 빗변의 길이가 17이고 다른 한 변의 길이가 8일 때, 나머지 한 변의 길이는 얼마일까요?',
          answer: '15',
          wrong: [
            { a: '9', why: '길이끼리 뺐어요. 제곱한 값끼리 빼야 해요: $17^2-8^2$' },
            { a: '225', why: '나머지 변의 **제곱**까지 구했어요. 제곱해서 225가 되는 양수를 찾아요.' },
          ],
          explain: '$17^2-8^2=289-64=225$이고 $15^2=225$이므로 나머지 한 변의 길이는 15예요.',
        },
      },
      {
        title: '피타고라스 정리의 역 — 직각삼각형 판별',
        body: '피타고라스 정리를 거꾸로 해도 성립해요.\n\n' +
          '세 변의 길이가 $a$, $b$, $c$인 삼각형에서 $a^2+b^2=c^2$이면, 이 삼각형은 **빗변의 길이가 $c$인 직각삼각형**이에요. ($c$의 대각이 직각이에요.)\n\n' +
          '**판별하는 방법**: 가장 긴 변을 $c$로 놓고, 나머지 두 변의 제곱의 합과 비교해요.\n\n' +
          '| 세 변 | 계산 | 결과 |\n|---|---|---|\n| 5, 12, 13 | $25+144=169=13^2$ | 직각삼각형 |\n| 4, 5, 6 | $16+25=41$, $6^2=36$ | 직각삼각형이 아니에요 |\n\n' +
          '**왜 그럴까요?** 직각을 낀 두 변이 $a$, $b$인 직각삼각형을 하나 새로 그리면, 피타고라스 정리에 따라 그 빗변의 제곱은 $a^2+b^2=c^2$이라서 빗변이 $c$예요. 두 삼각형은 세 변의 길이가 같아 합동(SSS 합동)이므로 처음 삼각형도 직각삼각형이에요.\n\n' +
          '> ⚠️ 가장 긴 변이 아닌 변을 $c$에 넣고 비교하면 안 돼요.',
        easy: '옛날 사람들은 매듭 12개를 같은 간격으로 묶은 밧줄로 직각을 만들었다고 해요. 밧줄을 3칸, 4칸, 5칸으로 나누어 삼각형을 만들면 3칸과 4칸 사이가 직각이 되거든요. $3^2+4^2=5^2$이니까요.\n\n' +
          '이처럼 세 변이 "작은 두 변의 제곱의 합 = 큰 변의 제곱"을 만족하면, 자를 대 보지 않아도 직각이 생긴다는 것이 피타고라스 정리의 역이에요.',
        check: {
          type: 'choice',
          q: '세 변의 길이가 다음과 같은 삼각형 중 직각삼각형인 것은 무엇일까요?',
          choices: ['6, 8, 10', '4, 5, 6', '2, 3, 4'],
          answer: 0,
          why: [
            '',
            '$4^2+5^2=41$이고 $6^2=36$이라서 같지 않아요.',
            '$2^2+3^2=13$이고 $4^2=16$이라서 같지 않아요.',
          ],
          explain: '가장 긴 변 10에 대하여 $6^2+8^2=36+64=100=10^2$이므로 직각삼각형이에요.',
        },
      },
      {
        title: '평면도형에서 피타고라스 정리 활용하기',
        body: '도형 속에서 **직각삼각형을 찾거나 만들면** 피타고라스 정리를 쓸 수 있어요.\n\n' +
          '| 도형 | 직각삼각형 찾기 |\n|---|---|\n| 직사각형 | 가로, 세로, 대각선 |\n| 이등변삼각형 | 꼭짓점에서 밑변에 수선을 그으면 밑변이 이등분돼요: 밑변의 절반, 높이, 빗변(같은 두 변) |\n| 마름모 | 두 대각선은 서로를 수직이등분해요: 두 대각선의 절반, 한 변 |\n\n' +
          '예: 가로 8, 세로 6인 직사각형의 대각선의 길이를 $d$라고 하면 $d^2=8^2+6^2=100$이므로 $d=10$이에요.\n\n' +
          '예: 두 변의 길이가 10이고 밑변이 12인 이등변삼각형의 높이를 $h$라고 하면 $h^2=10^2-6^2=64$이므로 $h=8$, 넓이는 $\\frac{1}{2}\\times12\\times8=48$이에요.\n\n' +
          '> 💡 그림에 직각삼각형이 바로 보이지 않으면 수선을 긋거나 대각선을 그어 만들어요.',
        easy: '집 안 물건에서도 직각삼각형을 찾을 수 있어요. 직사각형 모양 텔레비전 화면에 대각선을 그으면 가로, 세로, 대각선이 직각삼각형을 만들지요.\n\n' +
          '그래서 가로와 세로를 알면 대각선 길이를 잴 필요 없이 계산으로 알 수 있어요.',
        fig: { type: 'polygon', points: [[0, 0], [8, 0], [8, 6], [0, 6]], labels: ['A', 'B', 'C', 'D'], sides: ['8', '6', null, null], segments: [{ from: [0, 0], to: [8, 6], dashed: true, label: 'd' }], angles: [{ at: 1, right: true }], alt: '가로 8, 세로 6 인 직사각형 ABCD 와 대각선 AC (길이 d)' },
        check: {
          type: 'short', check: 'number',
          q: '가로가 12, 세로가 5인 직사각형의 대각선의 길이는 얼마일까요?',
          answer: '13',
          wrong: [
            { a: '17', why: '가로와 세로를 그냥 더했어요. 각각 제곱하여 더해요.' },
            { a: '169', why: '대각선 길이의 **제곱**까지 구했어요. 제곱해서 169가 되는 양수를 찾아요.' },
          ],
          explain: '가로, 세로, 대각선은 직각삼각형을 이뤄요. $12^2+5^2=144+25=169=13^2$이므로 대각선의 길이는 13이에요.',
        },
      },
    ],

    examples: [
      {
        q: '직각삼각형에서 직각을 낀 두 변의 길이가 5 cm, 12 cm일 때, 빗변의 길이를 구하세요.',
        fig: rt(12, 5, ['12 cm', '?', '5 cm'], '직각을 낀 두 변이 5 cm, 12 cm 인 직각삼각형'),
        steps: [
          '빗변의 길이를 $c$ cm라고 하면 피타고라스 정리에서 $c^2=5^2+12^2$이에요.',
          '$5^2+12^2=25+144=169$예요.',
          '제곱해서 169가 되는 양수를 찾아요. $13^2=169$이므로 $c=13$이에요.',
        ],
        answer: '13 cm',
      },
      {
        q: '세 변의 길이가 8, 15, 17인 삼각형은 직각삼각형인지 판별하세요.',
        steps: [
          '가장 긴 변은 17이에요. 나머지 두 변의 제곱의 합과 비교해요.',
          '$8^2+15^2=64+225=289$이고, $17^2$도 289예요.',
          '$8^2+15^2=17^2$이므로 이 삼각형은 빗변의 길이가 17인 직각삼각형이에요. 직각은 길이가 17인 변의 대각이에요.',
        ],
        answer: '직각삼각형이에요.',
      },
      {
        q: '두 변의 길이가 13 cm이고 밑변의 길이가 10 cm인 이등변삼각형의 넓이를 구하세요.',
        fig: { type: 'polygon', points: [[0, 0], [5, 0], [10, 0], [5, 12]], labels: ['B', 'H', 'C', 'A'], sides: ['5 cm', '5 cm', '13 cm', '13 cm'], segments: [{ from: [5, 12], to: [5, 0], dashed: true, right: true, label: 'h' }], alt: '두 변이 13 cm, 밑변이 10 cm 인 이등변삼각형 ABC 와 꼭짓점 A 에서 밑변에 내린 수선 AH' },
        steps: [
          '꼭짓점 A에서 밑변 BC에 수선 AH를 그어요. 이등변삼각형에서 이 수선은 밑변을 이등분하므로 $\\overline{BH}=5$ cm예요.',
          '직각삼각형 ABH에서 $h^2=13^2-5^2=169-25=144$이고 $12^2=144$이므로 높이 $h=12$ cm예요.',
          '넓이는 $\\frac{1}{2}\\times10\\times12=60$ (cm²)예요.',
        ],
        answer: '60 cm²',
      },
    ],

    terms: [
      { term: '빗변', def: '직각삼각형에서 직각의 대변이에요. 세 변 가운데 가장 길어요.' },
      { term: '피타고라스 정리', def: '직각삼각형에서 직각을 낀 두 변의 길이를 $a$, $b$, 빗변의 길이를 $c$라고 하면 $a^2+b^2=c^2$이 성립한다는 정리예요.' },
      { term: '피타고라스 정리의 역', def: '세 변의 길이가 $a$, $b$, $c$인 삼각형에서 $a^2+b^2=c^2$이면 빗변의 길이가 $c$인 직각삼각형이라는 성질이에요.' },
      { term: '제곱', def: '같은 수를 두 번 곱한 것이에요. 예: $5^2=5\\times5=25$' },
      { term: '수선', def: '한 점에서 직선에 수직으로 그은 선분이에요. 수선과 직선이 만나는 점을 수선의 발이라고 해요.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 0,
        q: '그림의 직각삼각형에서 빗변의 길이 $x$는 몇 cm일까요?',
        fig: rt(12, 9, ['12 cm', 'x', '9 cm'], '직각을 낀 두 변이 9 cm, 12 cm 이고 빗변이 x 인 직각삼각형'),
        answer: '15',
        wrong: [
          { a: '21', why: '두 변의 길이를 그냥 더했어요. 각각 제곱하여 더한 값이 빗변의 제곱이에요.' },
          { a: '225', why: '$x^2$까지 구했어요. 제곱해서 225가 되는 양수를 찾아요.' },
        ],
        explain: '$x^2=9^2+12^2=81+144=225$이고 $15^2=225$이므로 $x=15$ cm예요.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '빗변의 길이가 17 cm, 다른 한 변의 길이가 15 cm인 직각삼각형에서 나머지 한 변의 길이는 몇 cm일까요?',
        answer: '8',
        wrong: [
          { a: '2', why: '길이끼리 뺐어요. 제곱한 값끼리 빼요: $17^2-15^2$' },
          { a: '64', why: '나머지 변의 제곱까지 구했어요. 제곱해서 64가 되는 양수를 찾아요.' },
        ],
        explain: '$17^2-15^2=289-225=64$이고 $8^2=64$이므로 나머지 한 변은 8 cm예요.',
      },
      {
        id: 'p3', level: 1, type: 'choice', concept: 0,
        q: '그림과 같이 $\\angle C=90°$인 직각삼각형 ABC에서 빗변은 무엇일까요?',
        fig: rt(4, 3, [null, null, null], '각 C 가 직각인 직각삼각형 ABC'),
        choices: ['$\\overline{AB}$', '$\\overline{BC}$', '$\\overline{CA}$'],
        answer: 0,
        why: ['', '$\\overline{BC}$는 직각을 낀 변이에요. 빗변은 직각의 대변이에요.', '$\\overline{CA}$는 직각을 낀 변이에요. 빗변은 직각 C와 마주 보는 변이에요.'],
        explain: '빗변은 직각의 대변이에요. $\\angle C$와 마주 보는 변은 $\\overline{AB}$예요.',
      },
      {
        id: 'p4', level: 1, type: 'ox', concept: 3,
        q: '세 변의 길이가 7, 24, 25인 삼각형은 직각삼각형이에요.',
        answer: true,
        explain: '가장 긴 변 25에 대하여 $7^2+24^2=49+576=625=25^2$이므로 직각삼각형이에요.',
      },
      {
        id: 'p5', level: 1, type: 'choice', concept: 3,
        q: '세 변의 길이가 다음과 같은 삼각형 중 직각삼각형이 **아닌** 것은 무엇일까요?',
        choices: ['4, 6, 8', '3, 4, 5', '5, 12, 13', '9, 12, 15'],
        answer: 0,
        why: [
          '',
          '$3^2+4^2=25=5^2$이라서 직각삼각형이에요.',
          '$5^2+12^2=169=13^2$이라서 직각삼각형이에요.',
          '$9^2+12^2=225=15^2$이라서 직각삼각형이에요. (3, 4, 5의 3배예요.)',
        ],
        explain: '$4^2+6^2=16+36=52$이고 $8^2=64$이므로 같지 않아요. 그래서 세 변이 4, 6, 8인 삼각형은 직각삼각형이 아니에요. 4, 6, 8은 3, 4, 5의 배수가 아니라 2, 3, 4의 2배예요.',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', unit: 'cm²', concept: 1,
        q: '직각삼각형의 세 변 위에 각각 정사각형을 그렸어요. 직각을 낀 두 변 위의 정사각형의 넓이가 각각 36 cm², 64 cm²일 때, 빗변 위의 정사각형의 넓이는 몇 cm²일까요?',
        answer: '100',
        wrong: [
          { a: '10', why: '빗변의 길이를 구했어요. 문제는 정사각형의 넓이예요.' },
          { a: '28', why: '두 넓이의 차를 구했어요. 빗변 위 정사각형의 넓이는 두 넓이의 합이에요.' },
        ],
        explain: '빗변 위 정사각형의 넓이는 나머지 두 정사각형의 넓이의 합이에요. $36+64=100$ (cm²)예요.',
      },
      {
        id: 'p7', level: 1, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '가로가 15 cm, 세로가 8 cm인 직사각형의 대각선의 길이는 몇 cm일까요?',
        answer: '17',
        wrong: [
          { a: '23', why: '가로와 세로를 그냥 더했어요. 각각 제곱하여 더해요.' },
          { a: '289', why: '대각선 길이의 제곱까지 구했어요. 제곱해서 289가 되는 양수를 찾아요.' },
        ],
        explain: '가로, 세로, 대각선은 직각삼각형을 이뤄요. $15^2+8^2=225+64=289=17^2$이므로 대각선의 길이는 17 cm예요.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', unit: 'cm²', concept: 4,
        q: '두 변의 길이가 10 cm이고 밑변의 길이가 12 cm인 이등변삼각형의 넓이는 몇 cm²일까요?',
        answer: '48',
        hint: '꼭짓점에서 밑변에 수선을 그으면 밑변이 이등분돼요.',
        wrong: [
          { a: '60', why: '같은 두 변의 길이 10 cm를 높이로 썼어요. 높이는 꼭짓점에서 밑변에 내린 수선의 길이예요.' },
          { a: '96', why: '밑변×높이에서 $\\frac{1}{2}$을 곱하지 않았어요.' },
        ],
        explain: '꼭짓점에서 밑변에 수선을 그으면 밑변이 6 cm씩 나뉘어요. 높이를 $h$라고 하면 $h^2=10^2-6^2=64$이므로 $h=8$ cm예요.\n\n넓이는 $\\frac{1}{2}\\times12\\times8=48$ (cm²)예요.',
      },
      {
        id: 'p9', level: 2, type: 'short', check: 'number', unit: 'm', concept: 4,
        q: '길이가 5 m인 사다리를 벽에 기대어 세웠어요. 사다리의 아래 끝은 벽에서 3 m 떨어져 있어요. 사다리의 위 끝은 바닥에서 몇 m 높이에 있을까요? (벽은 바닥에 수직이에요.)',
        fig: rt(3, 4, ['3 m', '5 m', '?'], '벽과 바닥, 사다리가 이루는 직각삼각형. 사다리 5 m, 벽에서 사다리 끝까지 3 m'),
        answer: '4',
        wrong: [
          { a: '2', why: '길이끼리 뺐어요. 제곱한 값끼리 빼요: $5^2-3^2$' },
          { a: '16', why: '높이의 제곱까지 구했어요. 제곱해서 16이 되는 양수를 찾아요.' },
        ],
        explain: '벽, 바닥, 사다리는 사다리가 빗변인 직각삼각형을 이뤄요. 높이를 $h$ m라고 하면 $h^2=5^2-3^2=16$이므로 $h=4$예요.',
      },
      {
        id: 'p10', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '그림에서 $\\angle C=90°$이고 점 D는 변 BC 위에 있어요. $\\overline{AB}=17$ cm, $\\overline{AC}=8$ cm, $\\overline{DB}=9$ cm일 때, $\\overline{AD}$의 길이는 몇 cm일까요?',
        fig: { type: 'polygon', points: [[0, 8], [0, 0], [6, 0], [15, 0]], labels: ['A', 'C', 'D', 'B'], sides: ['8', null, '9', '17'], angles: [{ at: 1, right: true }], segments: [{ from: [0, 8], to: [6, 0] }], alt: '각 C 가 직각인 삼각형 ABC 와 변 BC 위의 점 D. AB=17, AC=8, DB=9' },
        answer: '10',
        hint: '먼저 삼각형 ABC에서 $\\overline{BC}$를 구해요.',
        wrong: [
          { a: '15', why: '$\\overline{BC}$까지 구했어요. $\\overline{CD}=\\overline{BC}-\\overline{DB}$를 구한 뒤 삼각형 ADC에서 한 번 더 써요.' },
          { a: '100', why: '$\\overline{AD}^2$까지 구했어요. 제곱해서 100이 되는 양수를 찾아요.' },
        ],
        explain: '삼각형 ABC에서 $\\overline{BC}^2=17^2-8^2=289-64=225$이므로 $\\overline{BC}=15$ cm예요. 그래서 $\\overline{CD}=15-9=6$ cm예요.\n\n삼각형 ADC에서 $\\overline{AD}^2=8^2+6^2=64+36=100$이므로 $\\overline{AD}=10$ cm예요.',
      },
      {
        id: 'p11', level: 2, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '두 대각선의 길이가 16 cm, 12 cm인 마름모의 둘레의 길이는 몇 cm일까요?',
        answer: '40',
        hint: '마름모의 두 대각선은 서로를 수직이등분해요.',
        wrong: [
          { a: '10', why: '한 변의 길이까지만 구했어요. 마름모는 네 변의 길이가 같으니 4배 해요.' },
          { a: '80', why: '대각선을 이등분하지 않고 $16^2+12^2=400$으로 계산해 한 변을 20 cm로 구했어요. 직각삼각형의 두 변은 대각선의 **절반**인 8 cm, 6 cm예요.' },
        ],
        explain: '마름모의 두 대각선은 서로를 수직이등분하므로, 대각선의 절반 8 cm, 6 cm와 한 변이 직각삼각형을 이뤄요. 한 변을 $x$ cm라고 하면 $x^2=8^2+6^2=100$이므로 $x=10$이에요.\n\n둘레는 $4\\times10=40$ (cm)예요.',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '$\\angle A=90°$인 직각삼각형 ABC에서 $\\overline{AB}=6$ cm, $\\overline{AC}=8$ cm예요. 꼭짓점 A에서 빗변 BC에 내린 수선의 발을 H라고 할 때, $\\overline{AH}$의 길이는 몇 cm일까요? (분수나 소수로 답해요.)',
        fig: { type: 'polygon', points: [[0, 0], [3.6, 0], [10, 0], [3.6, 4.8]], labels: ['B', 'H', 'C', 'A'], sides: [null, null, '8', '6'], angles: [{ at: 3, right: true }], segments: [{ from: [3.6, 4.8], to: [3.6, 0], dashed: true, right: true }], alt: '각 A 가 직각인 삼각형 ABC 와 A 에서 빗변 BC 에 내린 수선 AH. AB=6, AC=8' },
        answer: '24/5',
        hint: '삼각형 ABC의 넓이를 두 가지 방법으로 나타내 보세요.',
        wrong: [
          { a: '5', why: '빗변의 절반을 구했어요. 넓이를 두 가지로 나타내어 구해요.' },
          { a: '48/5', why: '넓이를 구할 때 $\\frac{1}{2}$을 한쪽에만 곱했어요. $\\frac{1}{2}\\times6\\times8=\\frac{1}{2}\\times10\\times\\overline{AH}$예요.' },
          { a: '12/5', why: '넓이를 구할 때 $\\frac{1}{2}$을 한쪽에만 곱했어요. 양쪽 모두 (밑변)$\\times$(높이)$\\times\\frac{1}{2}$로 나타내요.' },
        ],
        explain: '빗변은 $\\overline{BC}^2=6^2+8^2=100$에서 $\\overline{BC}=10$ cm예요.\n\n삼각형 ABC의 넓이를 두 가지로 나타내면 $\\frac{1}{2}\\times6\\times8=\\frac{1}{2}\\times10\\times\\overline{AH}$, 곧 $48=10\\times\\overline{AH}$예요. 그래서 $\\overline{AH}=\\frac{24}{5}=4.8$ (cm)예요.',
      },
      {
        id: 'a2', level: 3, type: 'short', check: 'number', concept: 3,
        q: '세 변의 길이가 5, 12, $x$인 삼각형이 직각삼각형일 때, 자연수 $x$의 값은 얼마일까요?',
        answer: '13',
        hint: '$x$가 가장 긴 변일 때와 12가 가장 긴 변일 때를 모두 생각해 보세요.',
        wrong: [
          { a: '17', why: '두 변을 그냥 더했어요. 제곱하여 더해요: $5^2+12^2$' },
          { a: '7', why: '두 변의 길이를 뺐어요. 12가 빗변이라면 $x^2=12^2-5^2=119$인데, 제곱해서 119가 되는 자연수는 없어요.' },
        ],
        explain: '**$x$가 빗변일 때**: $x^2=5^2+12^2=169=13^2$이므로 $x=13$이에요.\n\n**12가 빗변일 때**: $x^2=12^2-5^2=119$인데, $10^2=100$, $11^2=121$이라서 제곱해서 119가 되는 자연수는 없어요.\n\n그래서 자연수 $x$는 13이에요.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 4,
        q: '$\\overline{AB}=8$ cm, $\\overline{AD}=10$ cm인 직사각형 ABCD를 선분 AF를 접는 선으로 하여 접었더니, 꼭짓점 D가 변 BC 위의 점 E에 닿았어요. $\\overline{EC}$의 길이는 몇 cm일까요?',
        fig: { type: 'polygon', points: [[0, 8], [0, 0], [6, 0], [10, 0], [10, 3], [10, 8]], labels: ['A', 'B', 'E', 'C', 'F', 'D'], sides: ['8', null, null, null, null, '10'], angles: [{ at: 1, right: true }], segments: [{ from: [0, 8], to: [6, 0], dashed: true }, { from: [0, 8], to: [10, 3] }, { from: [6, 0], to: [10, 3], dashed: true }], alt: '직사각형 ABCD 를 AF 로 접어 D 가 변 BC 위의 점 E 에 닿은 그림. AB=8, AD=10' },
        answer: '4',
        hint: '접기 전과 후에 $\\overline{AD}$와 $\\overline{AE}$의 길이는 같아요.',
        wrong: [
          { a: '6', why: '$\\overline{BE}$를 구했어요. $\\overline{EC}=\\overline{BC}-\\overline{BE}$예요.' },
          { a: '2', why: '$\\overline{AE}$와 $\\overline{AB}$의 차를 썼어요. 직각삼각형 ABE에서 피타고라스 정리로 $\\overline{BE}$를 먼저 구해요.' },
        ],
        explain: '접은 부분은 겹치므로 $\\overline{AE}=\\overline{AD}=10$ cm예요. 직각삼각형 ABE에서 $\\overline{BE}^2=10^2-8^2=36$이므로 $\\overline{BE}=6$ cm예요.\n\n$\\overline{BC}=\\overline{AD}=10$ cm이므로 $\\overline{EC}=10-6=4$ (cm)예요.',
      },
      {
        id: 'a4', level: 3, type: 'choice', concept: 1,
        q: '직각삼각형의 세 변을 각각 지름으로 하는 반원을 삼각형 바깥쪽에 그렸어요. 직각을 낀 두 변 위의 반원의 넓이가 각각 $18\\pi$ cm², $32\\pi$ cm²일 때, 빗변 위의 반원의 넓이는 얼마일까요?',
        choices: ['$50\\pi$ cm²', '$14\\pi$ cm²', '$100\\pi$ cm²', '$25\\pi$ cm²'],
        answer: 0,
        why: [
          '',
          '두 넓이의 차를 구했어요. 빗변 위의 도형 넓이는 두 넓이의 합이에요.',
          '반원이 아니라 원의 넓이를 구했어요. 반원이므로 원 넓이의 절반이에요.',
          '합을 반으로 나누었어요. 빗변 위의 반원 넓이는 두 반원 넓이의 합 그대로예요.',
        ],
        hint: '반원의 넓이는 지름의 제곱에 비례해요.',
        explain: '지름이 $d$인 반원의 넓이는 $\\frac{1}{2}\\times\\pi\\times\\left(\\frac{d}{2}\\right)^2=\\frac{\\pi}{8}d^2$이라서 $d^2$에 비례해요. 피타고라스 정리에서 (빗변)$^2$ = (두 변의 제곱의 합)이므로 빗변 위의 반원 넓이도 두 반원 넓이의 합이에요.\n\n$18\\pi+32\\pi=50\\pi$ (cm²)예요. (실제로 두 반원의 지름은 12 cm, 16 cm, 빗변은 20 cm이고 $\\frac{\\pi}{8}\\times400=50\\pi$예요.)',
      },
      {
        id: 'a5', level: 3, type: 'short', check: 'number', unit: 'cm', concept: 2,
        q: '그림에서 $\\angle B=90°$, $\\angle ACD=90°$이고 $\\overline{AB}=3$ cm, $\\overline{BC}=4$ cm, $\\overline{CD}=12$ cm예요. $\\overline{AD}$의 길이는 몇 cm일까요?',
        fig: { type: 'polygon', points: [[0, 3], [0, 0], [4, 0], [11.2, 9.6]], labels: ['A', 'B', 'C', 'D'], sides: ['3', '4', '12', '?'], angles: [{ at: 1, right: true }], segments: [{ from: [0, 3], to: [4, 0], dashed: true }], alt: '각 B 가 직각인 삼각형 ABC 와, 각 ACD 가 직각인 삼각형 ACD 를 이어 붙인 사각형 ABCD. AB=3, BC=4, CD=12' },
        answer: '13',
        hint: '대각선 AC가 두 직각삼각형의 공통인 변이에요.',
        wrong: [
          { a: '5', why: '$\\overline{AC}$까지 구했어요. 삼각형 ACD에서 한 번 더 써요.' },
          { a: '19', why: '변의 길이를 그냥 더했어요. 직각삼각형마다 피타고라스 정리를 써요.' },
        ],
        explain: '삼각형 ABC에서 $\\overline{AC}^2=3^2+4^2=25$이므로 $\\overline{AC}=5$ cm예요.\n\n삼각형 ACD에서 $\\overline{AD}^2=5^2+12^2=25+144=169$이므로 $\\overline{AD}=13$ cm예요.',
      },
    ],

    deeper: [
      {
        title: '피타고라스와 오래된 직각의 비밀',
        body: '이 정리에는 고대 그리스의 수학자 피타고라스의 이름이 붙어 있지만, 그보다 훨씬 전부터 여러 문명이 세 변이 3, 4, 5인 삼각형처럼 직각을 만드는 수를 알고 있었다고 전해져요. 옛 중국의 수학책에도 같은 관계가 나와요.\n\n' +
          '피타고라스 정리를 넓이로 설명하는 방법은 수백 가지가 알려져 있어요. 오늘 본 "같은 정사각형을 두 가지로 나누기" 말고도, 그리스의 유클리드는 세 정사각형을 넓이가 같은 삼각형으로 바꾸어 가며 증명했어요.',
      },
      {
        title: '다음 학년과의 연결 — 제곱근과 삼각비',
        body: '직각을 낀 두 변이 1, 1인 직각삼각형의 빗변을 $c$라고 하면 $1^2+1^2=2$이므로, $c$는 제곱해서 2가 되는 수예요. 그런데 제곱해서 2가 되는 수는 자연수도, 분수도 아니에요. 중학교 3학년에서는 이런 수를 **제곱근**($\\sqrt{2}$)으로 나타내는 방법을 배워서, 어떤 직각삼각형이든 변의 길이를 구할 수 있게 돼요.\n\n' +
          '또 3학년의 **삼각비**에서는 직각삼각형의 변의 비와 각의 크기 사이의 관계를 배우는데, 피타고라스 정리가 계속 쓰여요. 고등학교에서는 좌표평면 위 두 점 사이의 거리를 구할 때에도 이 정리를 써요.',
      },
    ],

    faq: [
      {
        q: '빗변은 어떻게 찾아요?',
        a: '직각과 마주 보는 변이 빗변이에요. 빗변은 항상 세 변 중 가장 길어요. 그림에 직각 표시가 있으면 그 표시가 없는 쪽, 곧 직각의 반대편 변을 찾으면 돼요.',
      },
      {
        q: '피타고라스 정리는 아무 삼각형에서나 써도 돼요?',
        a: '아니요, **직각삼각형에서만** 성립해요. 직각이 없는 삼각형에서는 $a^2+b^2$과 $c^2$이 달라요. 직각삼각형이 아니면 수선을 그어 직각삼각형을 만든 뒤 써요.',
      },
      {
        q: '제곱해서 119가 되는 수는 어떻게 구해요?',
        a: '$10^2=100$, $11^2=121$이라서 제곱해서 119가 되는 자연수는 없어요. 이런 수는 중학교 3학년에서 배우는 제곱근으로 나타내요. 이 단원의 문제는 답이 자연수(또는 분수)가 되도록 만들어져 있어요.',
      },
      {
        q: '직각삼각형인지 판별할 때 왜 가장 긴 변을 c로 해요?',
        a: '직각삼각형이라면 빗변이 가장 긴 변이기 때문이에요. 다른 변을 $c$에 넣으면 $a^2+b^2$이 언제나 $c^2$보다 커서 비교가 되지 않아요.',
      },
    ],

    mistakes: [
      '변의 길이를 그대로 더하는 실수 — $6+8=14$가 아니라 $6^2+8^2=100$, 그래서 빗변은 10이에요.',
      '$c^2$까지만 구하고 답으로 쓰는 실수 — $c^2=169$이면 $c$는 제곱해서 169가 되는 양수 13이에요.',
      '직각을 낀 변을 구할 때도 더하는 실수 — 빗변을 아는 경우에는 $b^2=c^2-a^2$처럼 빼요.',
    ],

    gens: [
      {
        id: 'side-length',
        level: 1,
        title: '직각삼각형의 변의 길이 구하기',
        make: function (R) {
          var t = scaled(R, 40), a = t[0], b = t[1], c = t[2];
          if (R.bool()) { var tmp = a; a = b; b = tmp; }   // a: 세로, b: 가로
          if (R.bool()) {
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 0,
              q: '직각삼각형에서 직각을 낀 두 변의 길이가 ' + a + ' cm, ' + b + ' cm일 때, 빗변의 길이는 몇 cm일까요?',
              fig: rt(b, a, [b + ' cm', '?', a + ' cm'], '직각을 낀 두 변이 ' + a + ' cm, ' + b + ' cm 인 직각삼각형'),
              answer: String(c),
              wrong: wrongs(c, [
                [a + b, '두 변의 길이를 그냥 더했어요. 각각 제곱하여 더한 값이 빗변의 제곱이에요.'],
                [c * c, '빗변의 길이의 제곱까지 구했어요. 제곱해서 ' + c * c + R.josa(c * c, '이/가') + ' 되는 양수를 찾아요.'],
              ]),
              explain: '빗변의 길이를 $c$ cm라고 하면 $c^2=' + a + '^2+' + b + '^2=' + a * a + '+' + b * b + '=' + c * c + '$' + R.josa(c * c, '이에요/예요') + '.\n\n' +
                '$' + c + '^2=' + c * c + '$이므로 빗변의 길이는 ' + c + ' cm예요.',
            };
          }
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 2,
            q: '직각삼각형에서 빗변의 길이가 ' + c + ' cm이고 다른 한 변의 길이가 ' + a + ' cm일 때, 나머지 한 변의 길이는 몇 cm일까요?',
            fig: rt(b, a, ['?', c + ' cm', a + ' cm'], '빗변이 ' + c + ' cm, 한 변이 ' + a + ' cm 인 직각삼각형'),
            answer: String(b),
            wrong: wrongs(b, [
              [c - a, '길이끼리 뺐어요. 제곱한 값끼리 빼요: $' + c + '^2-' + a + '^2$'],
              [b * b, '나머지 변의 제곱까지 구했어요. 제곱해서 ' + b * b + R.josa(b * b, '이/가') + ' 되는 양수를 찾아요.'],
            ]),
            explain: '나머지 한 변을 $b$ cm라고 하면 $b^2=' + c + '^2-' + a + '^2=' + c * c + '-' + a * a + '=' + b * b + '$' + R.josa(b * b, '이에요/예요') + '.\n\n' +
              '$' + b + '^2=' + b * b + '$이므로 나머지 한 변의 길이는 ' + b + ' cm예요.',
          };
        },
      },
      {
        id: 'is-right',
        level: 2,
        title: '직각삼각형 판별하기',
        make: function (R) {
          function fmt(s) { return s.slice().sort(function (p, q) { return p - q; }).join(', '); }
          function reason(s) {
            var x = s.slice().sort(function (p, q) { return p - q; });
            var sum = x[0] * x[0] + x[1] * x[1], big = x[2] * x[2];
            return isRight(x[0], x[1], x[2])
              ? '$' + x[0] + '^2+' + x[1] + '^2=' + sum + '=' + x[2] + '^2$이라서 직각삼각형이에요.'
              : '$' + x[0] + '^2+' + x[1] + '^2=' + sum + '$이고 $' + x[2] + '^2=' + big + '$' + (R.josa(big, '이에요/예요') === '이에요' ? '이라서' : '라서') + ' 같지 않아요.';
          }
          var base = scaled(R, 30);
          var pert = [[0, 0, 1], [0, 1, 0], [1, 0, 0], [0, 0, -1], [-1, 0, 0], [0, -1, 0], [1, 1, 0], [0, 1, 1]];
          var near = [];
          pert.forEach(function (d) {
            var s = [base[0] + d[0], base[1] + d[1], base[2] + d[2]];
            if (s[0] > 0 && isTri(s[0], s[1], s[2]) && !isRight(s[0], s[1], s[2])) near.push(s);
          });
          if (R.bool()) {
            var correct = fmt(base);
            var pick = R.choices(correct, near.map(fmt));
            var sets = {}; near.forEach(function (s) { sets[fmt(s)] = s; });
            return {
              type: 'choice', concept: 3,
              q: '세 변의 길이가 다음과 같은 삼각형 중 **직각삼각형**인 것은 무엇일까요?',
              choices: pick.choices,
              answer: pick.answer,
              why: pick.choices.map(function (ch) { return ch === correct ? '' : reason(sets[ch]); }),
              explain: '가장 긴 변의 제곱과 나머지 두 변의 제곱의 합을 비교해요. ' + reason(base),
            };
          }
          // 직각삼각형이 아닌 것 고르기: 직각삼각형 3개 + 아닌 것 1개
          var rights = [], used = {};
          used[fmt(base)] = true;
          rights.push(base);
          var tries = 0;
          while (rights.length < 6 && tries < 60) {
            tries++;
            var t = scaled(R, 30), key = fmt(t);
            if (!used[key]) { used[key] = true; rights.push(t); }
          }
          var odd = R.pick(near), oddKey = fmt(odd);
          var pick2 = R.choices(oddKey, rights.map(fmt));
          var all = {}; rights.forEach(function (s) { all[fmt(s)] = s; });
          return {
            type: 'choice', concept: 3,
            q: '세 변의 길이가 다음과 같은 삼각형 중 직각삼각형이 **아닌** 것은 무엇일까요?',
            choices: pick2.choices,
            answer: pick2.answer,
            why: pick2.choices.map(function (ch) { return ch === oddKey ? '' : reason(all[ch]); }),
            explain: '가장 긴 변의 제곱과 나머지 두 변의 제곱의 합을 비교해요. 세 변이 ' + oddKey + '인 삼각형은 ' + reason(odd) + ' 그래서 직각삼각형이 아니에요.',
          };
        },
      },
      {
        id: 'figures',
        level: 2,
        title: '평면도형에서 피타고라스 정리 활용하기',
        make: function (R) {
          var kind = R.int(0, 4);
          if (kind === 4) {
            var L = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
            var foot = L[0], h = L[1], lad = L[2];
            if (R.bool()) { foot = L[1]; h = L[0]; }
            return {
              type: 'short', check: 'number', unit: 'm', concept: 4,
              q: '길이가 ' + lad + ' m인 사다리를 벽에 기대어 세웠어요. 사다리의 아래 끝은 벽에서 ' + foot + ' m 떨어져 있어요. 사다리의 위 끝은 바닥에서 몇 m 높이에 있을까요? (벽은 바닥에 수직이에요.)',
              answer: String(h),
              wrong: wrongs(h, [[lad - foot, '길이끼리 뺐어요. 제곱한 값끼리 빼요.'], [h * h, '높이의 제곱까지 구했어요. 제곱해서 ' + h * h + R.josa(h * h, '이/가') + ' 되는 양수를 찾아요.']]),
              explain: '벽, 바닥, 사다리는 사다리가 빗변인 직각삼각형을 이뤄요. 높이를 $h$ m라고 하면 $h^2=' + lad + '^2-' + foot + '^2=' + (lad * lad - foot * foot) + '$이므로 $h=' + h + '$' + R.josa(h, '이에요/예요') + '.',
            };
          }
          var t = scaled(R, 40), a = t[0], b = t[1], c = t[2];
          if (R.bool()) { var tmp = a; a = b; b = tmp; }
          if (kind === 0) {
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 4,
              q: '가로가 ' + b + ' cm, 세로가 ' + a + ' cm인 직사각형의 대각선의 길이는 몇 cm일까요?',
              answer: String(c),
              wrong: wrongs(c, [[a + b, '가로와 세로를 그냥 더했어요. 각각 제곱하여 더해요.'], [c * c, '대각선 길이의 제곱까지 구했어요. 제곱해서 ' + c * c + R.josa(c * c, '이/가') + ' 되는 양수를 찾아요.']]),
              explain: '가로, 세로, 대각선은 직각삼각형을 이뤄요. 대각선을 $d$ cm라고 하면 $d^2=' + b + '^2+' + a + '^2=' + c * c + '$이고 $' + c + '^2=' + c * c + '$이므로 대각선의 길이는 ' + c + ' cm예요.',
            };
          }
          if (kind === 1) {
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 4,
              q: '대각선의 길이가 ' + c + ' cm이고 가로가 ' + b + ' cm인 직사각형의 세로의 길이는 몇 cm일까요?',
              answer: String(a),
              wrong: wrongs(a, [[c - b, '길이끼리 뺐어요. 제곱한 값끼리 빼요.'], [a * a, '세로의 제곱까지 구했어요. 제곱해서 ' + a * a + R.josa(a * a, '이/가') + ' 되는 양수를 찾아요.']]),
              explain: '세로를 $x$ cm라고 하면 $x^2=' + c + '^2-' + b + '^2=' + c * c + '-' + b * b + '=' + a * a + '$이므로 $x=' + a + '$' + R.josa(a, '이에요/예요') + '.',
            };
          }
          if (kind === 2) {
            var area = a * b;
            return {
              type: 'short', check: 'number', unit: 'cm²', concept: 4,
              q: '두 변의 길이가 ' + c + ' cm이고 밑변의 길이가 ' + (2 * a) + ' cm인 이등변삼각형의 넓이는 몇 cm²일까요?',
              answer: String(area),
              hint: '꼭짓점에서 밑변에 수선을 그으면 밑변이 이등분돼요.',
              wrong: wrongs(area, [
                [a * c, '같은 두 변의 길이를 높이로 썼어요. 높이는 꼭짓점에서 밑변에 내린 수선의 길이예요.'],
                [2 * a * b, '밑변×높이에서 $\\frac{1}{2}$을 곱하지 않았어요.'],
                [b, '높이까지만 구했어요. 넓이는 $\\frac{1}{2}\\times$(밑변)$\\times$(높이)예요.'],
              ]),
              explain: '꼭짓점에서 밑변에 수선을 그으면 밑변이 ' + a + ' cm씩 나뉘어요. 높이를 $h$ cm라고 하면 $h^2=' + c + '^2-' + a + '^2=' + b * b + '$이므로 $h=' + b + '$' + R.josa(b, '이에요/예요') + '.\n\n' +
                '넓이는 $\\frac{1}{2}\\times' + (2 * a) + '\\times' + b + '=' + area + '$ (cm²)예요.',
            };
          }
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 4,
            q: '두 대각선의 길이가 ' + (2 * a) + ' cm, ' + (2 * b) + ' cm인 마름모의 한 변의 길이는 몇 cm일까요?',
            answer: String(c),
            hint: '마름모의 두 대각선은 서로를 수직이등분해요.',
            wrong: wrongs(c, [
              [2 * c, '대각선을 이등분하지 않고 계산했어요. 직각삼각형의 두 변은 대각선의 절반이에요.'],
              [a + b, '대각선의 절반끼리 그냥 더했어요. 제곱하여 더해요.'],
            ]),
            explain: '마름모의 두 대각선은 서로를 수직이등분하므로, 대각선의 절반 ' + a + ' cm, ' + b + ' cm와 한 변이 직각삼각형을 이뤄요.\n\n' +
              '한 변을 $x$ cm라고 하면 $x^2=' + a + '^2+' + b + '^2=' + c * c + '$이므로 $x=' + c + '$' + R.josa(c, '이에요/예요') + '.',
          };
        },
      },
      {
        id: 'two-step',
        level: 3,
        title: '직각삼각형 두 개를 이어서 길이 구하기',
        make: function (R) {
          // [AB, BC, AC, CD, AD] : ∠B=90°, ∠ACD=90°
          var ch = R.pick([[3, 4, 5, 12, 13], [4, 3, 5, 12, 13], [6, 8, 10, 24, 26], [8, 6, 10, 24, 26], [9, 12, 15, 20, 25], [12, 9, 15, 20, 25],
            [9, 12, 15, 8, 17], [12, 9, 15, 36, 39], [12, 16, 20, 15, 25], [16, 12, 20, 21, 29], [18, 24, 30, 16, 34], [24, 32, 40, 9, 41]]);
          var AB = ch[0], BC = ch[1], AC = ch[2], CD = ch[3], AD = ch[4];
          // 그림: B(0,0), A(0,AB), C(BC,0), D = C + CD·(AC 에 수직인 단위 벡터)
          var ux = AB / AC, uy = BC / AC;
          var D = [Math.round((BC + CD * ux) * 100) / 100, Math.round((CD * uy) * 100) / 100];
          var askAD = R.bool();
          var fig = {
            type: 'polygon', points: [[0, AB], [0, 0], [BC, 0], D], labels: ['A', 'B', 'C', 'D'],
            sides: [String(AB), String(BC), askAD ? String(CD) : '?', askAD ? '?' : String(AD)], angles: [{ at: 1, right: true }],
            segments: [{ from: [0, AB], to: [BC, 0], dashed: true }],
            alt: '각 B 가 직각인 삼각형 ABC 와 각 ACD 가 직각인 삼각형 ACD 를 붙인 사각형 ABCD',
          };
          var head = '그림에서 $\\angle B=90°$, $\\angle ACD=90°$이고 $\\overline{AB}=' + AB + '$ cm, $\\overline{BC}=' + BC + '$ cm, ';
          var first = '삼각형 ABC에서 $\\overline{AC}^2=' + AB + '^2+' + BC + '^2=' + AC * AC + '$이므로 $\\overline{AC}=' + AC + '$ cm예요.\n\n';
          if (askAD) {
            return {
              type: 'short', check: 'number', unit: 'cm', concept: 2, fig: fig,
              q: head + '$\\overline{CD}=' + CD + '$ cm예요. $\\overline{AD}$의 길이는 몇 cm일까요?',
              answer: String(AD),
              wrong: wrongs(AD, [
                [AC, '$\\overline{AC}$까지 구했어요. 삼각형 ACD에서 한 번 더 써요.'],
                [AB + BC + CD, '변의 길이를 그냥 더했어요. 직각삼각형마다 피타고라스 정리를 써요.'],
                [AD * AD, '$\\overline{AD}^2$까지 구했어요. 제곱해서 ' + AD * AD + R.josa(AD * AD, '이/가') + ' 되는 양수를 찾아요.'],
              ]),
              explain: first + '삼각형 ACD에서 $\\overline{AD}^2=' + AC + '^2+' + CD + '^2=' + AD * AD + '$이므로 $\\overline{AD}=' + AD + '$ cm예요.',
            };
          }
          return {
            type: 'short', check: 'number', unit: 'cm', concept: 2, fig: fig,
            q: head + '$\\overline{AD}=' + AD + '$ cm예요. $\\overline{CD}$의 길이는 몇 cm일까요?',
            answer: String(CD),
            wrong: wrongs(CD, [
              [AD - AC, '길이끼리 뺐어요. 제곱한 값끼리 빼요: $\\overline{AD}^2-\\overline{AC}^2$'],
              [CD * CD, '$\\overline{CD}^2$까지 구했어요. 제곱해서 ' + CD * CD + R.josa(CD * CD, '이/가') + ' 되는 양수를 찾아요.'],
              [AC, '$\\overline{AC}$를 구했어요. 삼각형 ACD에서 $\\overline{CD}$를 한 번 더 구해요.'],
            ]),
            explain: first + '삼각형 ACD에서 $\\overline{AD}$가 빗변이므로 $\\overline{CD}^2=' + AD + '^2-' + AC + '^2=' + CD * CD + '$, 곧 $\\overline{CD}=' + CD + '$ cm예요.',
          };
        },
      },
    ],
  });
})();
