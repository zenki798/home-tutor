/*
 * 가정교사 — TutorSearch (js/search.js)
 * 학생이 한국어로 묻는 말("분수끼리 나누는 건 어떻게 해요?")에서 사이트 안의 개념·용어·질문을 찾는다.
 * AI 없이: 낱말 맞추기(BM25) + 두 글자 조각 + 유의어 + 오타 한 글자 허용 + 학년·과정 가산.
 * 계약: docs/ARCHITECTURE.md §5. DOM 을 쓰지 않는 순수 함수 모듈이다(node 테스트에서 require 로 쓴다).
 */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorSearch = mod;
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  /* ===== 조정값 — tests/logic/search.spec.js 로 맞춘 값. 바꾸면 그 테스트를 다시 돌린다 ===== */
  var CFG = {
    k1: 1.2,
    field: [[3, 0.5], [2.5, 0.3], [1, 0.75]],   // 제목·키워드·본문: [가중, 길이 보정 b]
    syn: 0.85, rel: 0.5, fuzzy: 0.7, part: 0.9, // 질문 낱말 대신 걸린 말(유의어·가까운 말·오타·쪼갠 말)의 무게
    textOnly: 0.6,        // 본문에만 걸린 낱말은 제목·키워드에 걸린 것보다 약한 근거
    unknown: 0.5,         // 색인에 없는 질문 낱말의 무게(가장 드문 낱말 idf 에 곱함) — 엉뚱한 질문을 거른다
    light: 0.25,          // '방법·차이·외우는' 같은 두루 쓰는 말은 덮은 정도를 따질 때 가볍게
    gramW: 1.2,           // 두 글자 조각 유사도를 점수에 더하는 비율
    gramStrength: 0.75,   // 두 글자 조각만으로 인정하는 정도(띄어쓰기·조사·오타 흡수)
    kind: { term: 1.12, concept: 1.1, faq: 1.08, unit: 0.92, mistake: 0.85 },
    titleAll: 1.2,        // 제목 낱말이 모두 질문에 걸리면
    why: 1.1,             // '왜' 질문에는 까닭·이유가 적힌 항목을 조금 앞으로
    minStrength: 0.45,    // 가장 나은 결과도 이보다 약하면 빈 결과(억지로 내지 않는다)
    keepStrength: 0.3,    // 결과에 남길 최소 근거
    cutRatio: 0.4,        // 1위 점수의 이 비율 밑은 버린다(1·2위 차이가 크면 하나만 낸다)
    sameGrade: 1.2, sameUnit: 1.4, sameCourse: 1.25, otherSubject: 0.6
  };

  function setOf(str) {
    var s = new Set(), a = str.split(/\s+/);
    for (var i = 0; i < a.length; i++) if (a[i]) s.add(a[i]);
    return s;
  }

  /* ===== 버리는 말: 묻는 말·군말·대명사 (조사를 뗀 뒤에도 한 번 더 본다) ===== */
  var STOP = setOf(
    '뭐 뭐야 뭐예요 뭐에요 뭔가요 뭐지 뭐죠 뭐임 뭔데 뭔지 뭘 뭐가 뭐니 뭔가 머야 모야 뭐여 뭐라고 ' +
    '무엇 무엇인가요 무엇이야 무엇입니까 무엇이에요 무엇인지 무엇을 무엇이 무엇인가 무슨 ' +
    '어떻게 어떻게요 어떡해 어떤 어떠한 어떨까 어때 어때요 어떻 어케 어째서 왜 왜요 언제 어디 어디서 누구 누가 얼마 얼마나 몇 ' +
    '알려줘 알려줘요 알려주세요 알려줄래 알려줄래요 알려 줘 줘요 주세요 줄래 줄래요 가르쳐 가르쳐줘 가르쳐주세요 가르쳐줄래 ' +
    '설명 설명해 설명해줘 설명해주세요 설명해줄래 궁금 궁금해 궁금해요 궁금합니다 궁금한 궁금한데 궁금함 ' +
    '좀 그 이 저 그거 이거 저거 그것 이것 저것 것 거 건 걸 게 데 때 ' +
    '해 해요 해줘 해주세요 했어 했어요 하나요 하는 하면 할까 할까요 합니까 하죠 한다 하다 하지 해야 하 되 ' +
    '돼 돼요 되요 되나요 되는 되는지 됩니까 됐어 되지 있어 있어요 있나요 있는 있을까 있지 없어 없나요 없는 없어요 ' +
    '건가요 건가 건지 건데 거야 거예요 거에요 걸까 거죠 겁니까 구하 구하는 구하면 구해 구해요 구하기 구할 ' +
    '써 써요 쓰나요 쓰는 쓰면 쓸까 하나 할 ' +
    '네 예 응 음 어 아 앗 헐 오 우와 와 랑 은 는 가 을 를 의 에 도 만 과 로 요 ' +
    '정말 진짜 너무 그냥 근데 그런데 그리고 그래서 그러면 그럼 혹시 제발 다시 한번 쉽게 자세히 간단히 간단하게 좀더 더 많이 ' +
    '선생님 선생 쌤 샘 제가 저는 나는 내가 우리 너 너는 니가 제 저희 ' +
    '학년 학기 단원 과목 교과서 공부 질문 뜻 년'
  );
  // 영어는 묻는 말만 버린다(a·an·the·to·in 은 영어 문법 질문의 주제일 수 있어 남긴다)
  var EN_STOP = setOf('what whats how why please pls plz tell explain mean meaning hey');

  /* ===== 조사·어미: 긴 것부터 뗀다 =====
     '/1' 앞 글자에 받침 있어야, '/0' 받침 없어야, '/2' 받침 없거나 ㄹ, '/3' ㄹ 아닌 받침,
     '/h' 하다·되다 꼬리(떼고 두 글자 이상 남아야 한다: '곱하기'를 '곱'으로 만들지 않게) */
  var ENDING_SRC =
    '이었어요/1 였어요/0 이에요/1 예요/0 에요 인가요 인가 인지요 인지 일까요 일까 입니까 입니다 ' +
    '이라는/1 라는/0 이라고/1 라고/0 이라면/1 라면/0 이란/1 란/0 이야/1 야/0 이다 이죠/1 죠 이고/1 이며/1 ' +
    '하는지/h 하는데/h 하는/h 하면/h 하려면/h 해요/h 해서/h 하나요/h 하니/h 하지/h 할까요/h 할까/h ' +
    '했어요/h 했어/h 했다/h 하였다/h 하여/h 합니까/h 합니다/h 한다/h 하게/h 하기/h ' +
    '되는/h 되면/h 되나요/h 돼요/h 됐어/h 된다/h 되어/h 된/h 됩니다/h ' +
    '는지 는데 나요 까요 어요 아요 어서 아서 면서 으면/3 면/2 려면 으려면/3 니까 하거나/h 거나 ' +
    '에서부터 으로부터/3 로부터/2 에게서 한테서 에서는 에서도 에서의 에서만 으로는/3 로는/2 으로서/3 로서/2 ' +
    '으로써/3 로써/2 으로의/3 로의/2 으로도/3 로도/2 에게는 에게도 에는 에도 에만 에의 ' +
    '과는/1 와는/0 과의/1 와의/0 과도/1 와도/0 이나/1 이든/1 이랑/1 이라/1 이면/1 ' +
    '까지 부터 보다 처럼 마다 끼리 께서 한테 에게 에서 만큼 밖에 조차 마저 ' +
    '으로/3 로/2 은/1 는/0 이/1 가/0 을/1 를/0 과/1 와/0 의 에 도 만 요';

  // 끝 글자별로 묶어 둔다(낱말마다 몇 개만 견주게 — 2만 항목 색인을 빨리 만들려고)
  var END_BY_LAST = (function () {
    var map = {}, a = ENDING_SRC.split(/\s+/);
    for (var i = 0; i < a.length; i++) {
      if (!a[i]) continue;
      var p = a[i].split('/'), flag = p[1] || '';
      var e = { s: p[0], c: /^[0-3]$/.test(flag) ? Number(flag) : -1, h: flag === 'h' };
      var last = e.s.charAt(e.s.length - 1);
      (map[last] = map[last] || []).push(e);
    }
    Object.keys(map).forEach(function (k) { map[k].sort(function (x, y) { return y.s.length - x.s.length; }); });
    return map;
  })();

  // 조사처럼 보여도 낱말의 일부인 끝(넓이·온도·회로·결과·임진왜란 …): 이 꼴로 끝나면 떼지 않는다
  var PROTECT = setOf(
    '넓이 높이 길이 깊이 들이 놀이 먹이 풀이 종이 쟁이 잡이 돋이 원숭이 고양이 어린이 거북이 ' +
    '온도 속도 밀도 각도 농도 습도 고도 위도 경도 제도 반도 적도 빈도 강도 정도 지도 태도 용도 척도 ' +
    '한도 진도 명도 채도 조도 염도 순도 감도 포도 인도 시도 ' +
    '회로 경로 도로 통로 항로 수로 진로 미로 선로 ' +
    '결과 성과 통과 경과 학과 교과 사과 백과 효과 초과 ' +
    '살이 왜란 호란 수요 동요 민요 가요 필요 중요 주요 개요 표면 수면 구면 간만 비만'
  );

  // 조사를 떼면 한 글자만 남아도 되는 말(빛이→빛, 힘을→힘). 여기 없는 한 글자는 떼지 않는다(나이→나 금지)
  var ONE = setOf(
    '빛 힘 열 물 땅 산 강 섬 숲 흙 돌 불 풀 꽃 잎 씨 별 달 해 비 눈 원 각 변 점 선 면 식 합 곱 몫 값 근 항 층 표 ' +
    '길 몸 뼈 피 뇌 폐 위 간 장 혀 귀 코 입 손 발 털 알 새 소 말 글 시 책 법 돈 땀 숨 잠 밤 낮 봄 ' +
    '겉 속 앞 뒤 옆 칸 줄 짝 쌍 양 질 배 분 초 일 수 구 차 개 벌 꿀 쌀 밥 옷 집 공 핵 판 축 극 상 옴 뜻'
  );

  // '왜' 질문에 답이 될 만한 항목을 알아보는 말
  var WHY_SET = setOf('까닭 이유 원인 때문 배경');

  // 두루 쓰는 말: 찾기에는 쓰되, 질문을 얼마나 덮었는지 따질 때는 가볍게 본다
  // (색인에 없는 '외우는'·'만들었어' 때문에 '구구단 외우는 법' 같은 질문이 빈 결과가 되지 않게)
  var LIGHT = setOf(
    '방법 법 차이 차이점 종류 순서 쓰임 예시 예 예제 문제 원리 특징 성질 공식 의미 정의 개념 이유 원인 까닭 ' +
    '과정 역할 구조 비교 정리 관계 외우 외워 외울 외우기 푸는 풀어 풀면 풀까 찾아 찾는 찾기 찾으면 ' +
    '만들어 만드는 만들기 만들면 만든 만드 알아 아는 알기 알면 배우 배워 배우는 배울 읽어 읽는 읽기 보는 보면 볼 ' +
    '달라 다른 다르 같은 같아 비슷 구별 구분 일어나 일어난 생기 생겨 생기는 변하 변해 변하는 ' +
    '바뀌 바뀌어 바뀌는 바꿔 바꾸 바꾸는 세워 세운 짜여 이루어 나타내 뜻하 말하 부르 불러 써야'
  );
  // 색인에 없을 때 동사 꼴로 보는 끝 글자('끌어당겨'·'이동해')
  var VERBISH_RE = /(어|아|여|겨|워|와|져|쳐|해|려|켜|혀|봐)$/;

  /* ===== 유의어 사전 — 한 줄에 한 묶음, '|' 로 나눈다. 띄어 쓴 말도 된다(붙여서 찾는다).
     묶음을 늘리려면 줄을 하나 더하면 된다. 같은 말 = SYNONYMS(무게 0.85), 가까운 말 = RELATED(0.5) ===== */
  var SYNONYMS = [
    // 수학
    '덧셈|더하기|더하|더해|더한|더할|addition|plus',
    '뺄셈|빼기|빼는|빼면|뺀|빼요|subtraction|minus',
    '곱셈|곱하기|곱하|곱해|곱한|곱할|곱|multiplication|times',
    '나눗셈|나누기|나누|나눠|나눈|나눌|나눔|division',
    '넓이|면적|area', '둘레|perimeter', '부피|체적|volume', '들이|용량|capacity', '길이|length',
    '백분율|퍼센트|퍼센티지|percent|프로', '분수|fraction', '약수|divisor', '배수|multiple',
    '최대공약수|최대 공약수|gcd', '최소공배수|최소 공배수|lcm', '기약분수|약분', '통분|공통분모',
    '원주율|파이|pi|π', '제곱근|루트|sqrt', '거듭제곱|power', '소인수분해|소인수 분해|prime factorization',
    '풀이|해|solution', '방정식|equation', '부등식|inequality', '함수|function', '그래프|graph',
    '일차방정식|일차 방정식', '연립방정식|연립 방정식|연립일차방정식', '이차방정식|이차 방정식|quadratic equation',
    '일차함수|일차 함수|linear function', '이차함수|이차 함수|quadratic function',
    '근의 공식|근의공식|quadratic formula', '기울기|slope', '좌표|coordinate', '비율|ratio',
    '각도|angle', '직각|right angle', '삼각형|세모|triangle', '사각형|네모|quadrilateral', '원|동그라미|circle',
    '피타고라스 정리|피타고라스의 정리|피타고라스|pythagoras', '합동|congruence', '닮음|similarity',
    '대칭|symmetry', '확률|probability', '평균|average|mean', '정수|integer', '자연수|natural number',
    '음수|negative number', '양수|positive number', '집합|set', '수열|sequence',
    '미분|미분법|differentiation', '적분|적분법|integral|integration', '무게|weight', '구구단|곱셈구구', '시계|시각',
    // 영어 문법
    '동사|움직씨|verb', '명사|이름씨|noun', '형용사|그림씨|adjective', '부사|어찌씨|adverb', '대명사|pronoun',
    '전치사|preposition', '접속사|conjunction', '관사|article', '조동사|modal|auxiliary verb',
    '과거형|과거시제|과거 시제|past tense', '현재형|현재시제|현재 시제|present tense', '미래형|미래시제|미래 시제|future tense',
    '현재완료|현재 완료|현재완료형|현재완료시제|present perfect', '과거완료|과거 완료|past perfect',
    '진행형|진행 시제|progressive|continuous', '수동태|passive|passive voice', '능동태|active voice',
    '비교급|comparative', '최상급|superlative', 'to부정사|to 부정사|부정사|infinitive', '동명사|gerund',
    '분사|participle', '관계대명사|관계 대명사|relative pronoun', '복수형|복수|plural', '단수형|단수|singular',
    'be동사|be 동사|be verb', '일반동사|일반 동사', '삼인칭 단수|3인칭 단수|3단현', '의문문|의문형', '부정문|부정형',
    // 국어
    '높임 표현|높임법|높임말|존댓말|경어|존대', '비유|비유법|비유 표현', '직유|직유법|simile', '은유|은유법|metaphor',
    '의인법|의인화|personification', '주제|중심 생각|중심생각|요지', '문단|단락|paragraph', '맞춤법|철자|spelling',
    '띄어쓰기|띄어 쓰기', '속담|proverb', '관용 표현|관용어|관용구|idiom', '자음|닿소리|consonant', '모음|홀소리|vowel',
    '받침|종성', '문장 성분|문장성분', '서술어|술어|predicate', '소설|novel', '수필|에세이|essay',
    '논설문|주장하는 글', '설명문|설명하는 글',
    // 사회
    '민주주의|democracy', '삼권 분립|삼권분립|권력 분립|권력분립', '국회|입법부', '법원|사법부', '헌법|constitution',
    '수요|demand', '공급|supply', '시장|market', '물가 상승|인플레이션|인플레|inflation', '환율|exchange rate',
    '세금|조세|tax', '저출산|저출생', '고령화|노령화', '도시화|urbanization', '세계화|globalization', '인권|human rights',
    '지도|map', '기후|climate', '날씨|weather', '인구|population',
    // 역사
    '임진왜란|임진전쟁', '6·25 전쟁|6·25전쟁|한국 전쟁|한국전쟁|육이오', '일제 강점기|일제강점기|일제 시대|식민지 시기',
    '훈민정음|한글', '세종대왕|세종', '이순신|충무공', '고조선|단군 조선', '삼국 시대|삼국시대',
    '통일 신라|통일신라', '3·1 운동|삼일 운동|삼일운동', '대한민국 임시 정부|임시 정부|임시정부',
    '동학 농민 운동|동학농민운동|갑오 농민 전쟁', '산업 혁명|산업혁명|industrial revolution',
    '르네상스|문예 부흥|renaissance', '세계 대전|세계대전|world war',
    // 과학
    '광합성|photosynthesis', '증발|evaporation', '응결|액화|condensation', '융해|melting', '응고|freezing',
    '승화|sublimation', '원소|element', '원자|atom', '분자|molecule', '이온|ion', '전류|electric current',
    '전압|voltage', '저항|resistance', '자석|magnet', '중력|gravity', '마찰력|마찰|friction', '가속도|acceleration',
    '에너지|energy', '열|heat', '온도|temperature', '세포|cell', '유전자|gene|dna|디엔에이', '생태계|ecosystem',
    '먹이 사슬|먹이사슬|food chain', '먹이 그물|먹이그물|food web', '산성|acidic', '염기성|알칼리성|염기|알칼리',
    '중화 반응|중화반응|중화', '화학 반응|화학반응|화학 변화|화학변화|chemical reaction', '물리 변화|물리변화',
    '태양계|solar system', '행성|planet', '위성|satellite', '지진|earthquake', '화산|volcano',
    '판 구조론|판구조론|plate tectonics', '진화|evolution', '소화|digestion', '혈액|피|blood', '심장|heart',
    '굴절|refraction', '반사|reflection', '소리|음파|sound', '파동|wave', '밀도|density', '질량|mass',
    '세균|박테리아|bacteria', '바이러스|virus'
  ];
  var RELATED = [
    '해|근', '덧셈|합', '뺄셈|차', '나눗셈|몫|나머지', '무게|질량', '시각|시간', '기후|날씨', '선거|투표',
    '미분|도함수|미분계수|순간변화율', '적분|정적분|부정적분', '속력|속도', '중력|만유인력', '산|산성',
    '기화|증발', '호흡|세포 호흡', '유전|유전자', '임진왜란|정유재란|왜란', '병자호란|정묘호란|호란',
    '대기|공기', '요약|줄거리|간추리기', '시|운문|시조', '정부|행정부', '민주주의|민주 정치',
    '구석기|뗀석기', '신석기|간석기', '방정식|등식', '평행|평행선', '수직|수선', '대칭|선대칭|점대칭', '비율|비'
  ];

  /* ===== 글 다듬기 ===== */
  // 남길 글자: 숫자·로마자·그리스 문자·한글(낱자 포함)·한자. 나머지(문장부호·기호)는 공백으로
  // (가운뎃점 'ㆍ' U+318D 와 NFKC 뒤의 U+119E 는 남길 글자에서 뺀다 — 낱말 사이 점은 띄어쓰기로)
  var DROP_RE = /[^0-9a-z\u00c0-\u024f\u0370-\u03ff\u1100-\u119d\u119f-\u11ff\u3130-\u318c\u318e\u318f가-힣\u4e00-\u9fff ]+/g;
  var DOT = '\u00b7\u318d\u119e\u30fb\u2219\u2022';
  var DIGIT_DOT_RE = new RegExp('(\\d) ?[' + DOT + '] ?(\\d)', 'g');
  var HAS_DOT = new RegExp('[' + DOT + ']');
  var NEEDS_NFKC = /[^\u0000-\u007f가-힣]/;   // 이런 글자가 있을 때만 NFKC (한글·ASCII 만이면 건너뛰어 색인을 빨리)

  var UPPER_RE = /[A-Z]/;
  var APOS_TEST = /['\u2018\u2019`]/;
  var APOS_G = /['\u2018\u2019`]/g;
  // 정규화하되 공백 정리는 하지 않은 글. 한글·ASCII 만이면 NFKC·소문자 바꾸기를 건너뛴다(색인을 빨리)
  function clean(s) {
    if (s === null || s === undefined) return '';
    s = String(s);
    var wide = NEEDS_NFKC.test(s);
    if (wide && typeof s.normalize === 'function') s = s.normalize('NFKC');
    if (wide || UPPER_RE.test(s)) s = s.toLowerCase();
    if (APOS_TEST.test(s)) s = s.replace(APOS_G, '');                // don't → dont
    if (HAS_DOT.test(s)) s = s.replace(DIGIT_DOT_RE, '$1$2');        // 6·25 → 625, 3·1 → 31 (어떻게 써도 같은 열쇠)
    return s.replace(DROP_RE, ' ');
  }
  // clean 에서 문장부호 지우기만 뺀 것 (색인의 긴 본문용: 남길 글자인지는 keep 으로 훑으며 본다)
  var PLAIN_RE = /[^ -&(-@[-_a-~가-힣]|차/;   // 이 밖의 글자가 없으면 prep 할 일이 없다(한글·소문자·숫자·문장부호만)
  function prep(s) {
    if (s === null || s === undefined) return '';
    s = String(s);
    if (!PLAIN_RE.test(s)) return s;
    var wide = NEEDS_NFKC.test(s);
    if (wide && typeof s.normalize === 'function') s = s.normalize('NFKC');
    if (wide || UPPER_RE.test(s)) s = s.toLowerCase();
    if (APOS_TEST.test(s)) s = s.replace(APOS_G, '');
    if (HAS_DOT.test(s)) s = s.replace(DIGIT_DOT_RE, '$1$2');
    if (s.indexOf('차') >= 0) s = canon(s);
    return s;
  }
  // DROP_RE 가 남기는 글자인가 (한글 음절·ASCII 를 먼저 본다)
  function keep(ch) {
    if (ch >= 0xac00) return ch <= 0xd7a3;
    if (ch < 128) return (ch >= 97 && ch <= 122) || (ch >= 48 && ch <= 57);
    return (ch >= 0xc0 && ch <= 0x24f) || (ch >= 0x370 && ch <= 0x3ff) || (ch >= 0x1100 && ch <= 0x11ff && ch !== 0x119e) ||
      (ch >= 0x3130 && ch <= 0x318f && ch !== 0x318d) || (ch >= 0x4e00 && ch <= 0x9fff);
  }
  function normalize(s) {
    return clean(s).replace(/ +/g, ' ').trim();
  }

  // 수학 낱말의 숫자 차수를 한글로: '2차 방정식' → '이차방정식'
  var KO_NUM = { 1: '일', 2: '이', 3: '삼', 4: '사' };
  var DEGREE_RE = /(^|[^0-9])([1-4])[^0-9a-z가-힣]?차[^0-9a-z가-힣]?(함수|방정식|부등식|식|곡선)/g;   // 사이에 공백·문장부호 하나까지
  function canon(n) {
    return n.replace(DEGREE_RE, function (m, pre, d, w) { return pre + KO_NUM[d] + '차' + w; });
  }

  function ctype(c) {   // c: 글자 코드 → 1 한글 음절, 2 숫자, 3 로마자, 4 낱자(ㅋㅋ), 5 그 밖(그리스 문자·한자)
    if (c >= 0xac00 && c <= 0xd7a3) return 1;
    if (c >= 48 && c <= 57) return 2;
    if ((c >= 97 && c <= 122) || (c >= 0xc0 && c <= 0x24f)) return 3;
    if ((c >= 0x1100 && c <= 0x11ff) || (c >= 0x3130 && c <= 0x318f)) return 4;
    return 5;
  }
  function jong(ch) {   // 받침 번호 (0 없음, 8 ㄹ, 20 ㅆ). 한글 음절이 아니면 -1
    var c = ch.charCodeAt(0) - 0xac00;
    return c >= 0 && c <= 11171 ? c % 28 : -1;
  }

  /* ===== 조사·어미 떼기 ===== */
  function condOk(base, cond) {
    if (cond < 0) return true;
    var j = jong(base.charAt(base.length - 1));
    if (j < 0) return false;
    if (cond === 1) return j > 0;
    if (cond === 0) return j === 0;
    if (cond === 2) return j === 0 || j === 8;
    return j > 0 && j !== 8;
  }
  function isProtected(w) {
    var n = w.length;
    if (n >= 2 && PROTECT.has(w.slice(-2))) return true;
    if (n >= 3 && PROTECT.has(w.slice(-3))) return true;
    return n >= 4 && w.slice(-2) === '주의';   // 민주주의·자본주의 (세 글자 '군주의'는 뗀다)
  }
  function stripEnding(w) {
    var n = w.length, list = END_BY_LAST[w.charAt(n - 1)];
    if (!list) return w;
    for (var i = 0; i < list.length; i++) {
      var e = list[i], L = e.s.length;
      if (L >= n || w.slice(n - L) !== e.s) continue;
      var base = w.slice(0, n - L);
      // 떼고 한 글자만 남으면 떼지 않는다(나이→나 금지). 빛·힘 같은 한 글자 명사만 예외
      if (base.length < 2 && (e.h || !ONE.has(base))) continue;
      if (!condOk(base, e.c)) continue;
      return isProtected(w) ? w : base;
    }
    return w;
  }
  // 과거 꼬리: ㅆ 받침 뒤 꼬리를 떼고 ㅆ 도 뺀다('일어났어' → '일어나')
  var PAST_TAILS = ['습니다', '어요', '나요', '는데', '는지', '을까', '어', '다', '니', '지', '죠'];
  function stripPast(w) {
    var n = w.length;
    for (var i = 0; i < PAST_TAILS.length; i++) {
      var t = PAST_TAILS[i], L = t.length;
      if (n < L + 2 || w.slice(n - L) !== t) continue;
      var prev = w.charAt(n - L - 1);
      if (jong(prev) !== 20) continue;
      var base = w.slice(0, n - L - 1) + String.fromCharCode(prev.charCodeAt(0) - 20);
      return base.length >= 2 ? base : w;
    }
    return w;
  }
  // 합쇼체 'ㅂ니다': 받침 ㅂ 을 뺀다('바뀝니다' → '바뀌', '나타냅니다' → '나타내')
  function stripFormal(w) {
    var n = w.length;
    if (n < 4) return w;
    var tail = w.slice(n - 2);
    if (tail !== '니다' && tail !== '니까') return w;
    var prev = w.charAt(n - 3);
    if (jong(prev) !== 17) return w;
    return w.slice(0, n - 3) + String.fromCharCode(prev.charCodeAt(0) - 17);
  }
  function stemKo(w) {
    if (w.length < 2) return w;
    var r = stripEnding(w);
    if (r === w) r = stripPast(w);
    if (r === w) r = stripFormal(w);
    var m = r.length, last = r.charAt(m - 1);
    if (m >= 3 && (last === '하' || last === '되')) r = r.slice(0, m - 1);      // 약분하 → 약분
    if (r.length >= 3 && r.charAt(r.length - 1) === '들') r = r.slice(0, -1);   // 학생들 → 학생
    return r;
  }
  function stemEn(w) {
    var n = w.length;
    if (n >= 5 && w.slice(-3) === 'ies') return w.slice(0, -3) + 'y';
    if (n >= 5 && w.charAt(n - 1) === 's' && !/(ss|us|is|ys)$/.test(w)) return w.slice(0, -1);
    return w;
  }

  /* ===== 낱말 나누기 ===== */
  // 글자 종류가 바뀌는 곳에서 나눈다: 'be동사' → be + 동사, 'to부정사' → to + 부정사
  function splitScript(w) {
    var out = [], start = 0, prev = ctype(w.charCodeAt(0));
    for (var i = 1; i < w.length; i++) {
      var t = ctype(w.charCodeAt(i));
      if (t !== prev) { out.push(w.slice(start, i)); start = i; prev = t; }
    }
    out.push(w.slice(start));
    return out;
  }
  function stemPart(p, keepStop) {
    var t = ctype(p.charCodeAt(0)), s;
    if (t === 1) {
      s = stemKo(p);
      if (s !== p && ONE.has(s) && (s === '해' || !STOP.has(s))) return s;   // '해가'·'수의' 처럼 조사가 붙은 한 글자는 명사다
      return keepStop || !STOP.has(s) ? s : '';
    }
    if (t === 3) { s = stemEn(p); return keepStop || !EN_STOP.has(s) ? s : ''; }
    if (t === 2) return p.length >= 2 ? p : '';   // 한 자리 숫자는 버린다('3학년'의 3)
    if (t === 4) return '';                       // ㅋㅋ·ㅠㅠ 같은 낱자
    return p;
  }
  var CACHE = new Map();   // 낱말 → 토큰 (색인 2만 항목을 빨리 만들려고 같은 낱말은 한 번만 다룬다)
  // 곱셈구구의 'N단'(7단이·9단을)은 수와 붙여 한 낱말로 둔다 — 한 자리 수를 버리면 '단'만 남아 어느 단인지 모른다.
  // 뒤에 조사만 붙은 꼴만 ('1단계'·'2단원' 은 다른 말)
  var DAN_RE = /^(\d{1,2})단(?:이|은|는|을|를|의|도|만|부터|까지|과|와|에|에서|으로|로|처럼|보다|이랑|랑|하고|이에요|이야)?$/;
  function wordTokens(w, keepStop) {
    var key = keepStop ? '\u0001' + w : w, hit = CACHE.get(key);
    if (hit) return hit;
    var out = [];
    var dan = DAN_RE.exec(w);
    if (dan) out.push(dan[1] + '단');
    else if (keepStop || !STOP.has(w)) {
      var parts = splitScript(w);
      for (var i = 0; i < parts.length; i++) {
        var t = stemPart(parts[i], keepStop);
        if (t) out.push(t);
      }
    }
    if (CACHE.size > 80000) CACHE.clear();
    CACHE.set(key, out);
    return out;
  }
  function words(s) {   // 낱말 배열 (빈 칸 '' 이 섞일 수 있다 — 부르는 쪽에서 건너뛴다)
    var c = clean(s);
    if (c.indexOf('차') >= 0) c = canon(c);
    return c.split(' ');
  }
  function nextWord(ws, i) {
    for (var j = i + 1; j < ws.length; j++) if (ws[j]) return ws[j];
    return '';
  }
  function baseTokens(s) {
    var ws = words(s), out = [], prev = '';
    for (var i = 0; i < ws.length; i++) {
      var w = ws[i];
      if (!w) continue;
      if (w === '해') {   // '방정식의 해'의 해(답)는 남기고 '어떻게 해'의 해는 버린다
        if (prev.charAt(prev.length - 1) === '의') out.push('해');
        prev = w;
        continue;
      }
      prev = w;
      if (w === '수' && /^(있|없)/.test(nextWord(ws, i))) continue;   // '할 수 있어'의 수
      var ts = wordTokens(w, false);
      for (var j = 0; j < ts.length; j++) out.push(ts[j]);
    }
    return out;
  }
  // 사전에 있는 여러 낱말 말을 붙인다('현재 완료' → 현재완료). keepParts: 색인 쪽은 쪼갠 낱말도 남긴다
  function joinCompounds(toks, keepParts) {
    var n = toks.length, i;
    for (i = 0; i < n - 1; i++) if (JOIN_HEAD.has(toks[i])) break;
    if (i >= n - 1) return toks;   // 붙일 말의 첫 낱말이 없으면 그대로 (색인을 빨리)
    var out = [];
    for (i = 0; i < n; i++) {
      if (!JOIN_HEAD.has(toks[i])) { out.push(toks[i]); continue; }
      if (i + 2 < toks.length) {
        var j3 = toks[i] + toks[i + 1] + toks[i + 2];
        if (JOIN.has(j3)) {
          if (keepParts) out.push(toks[i], toks[i + 1], toks[i + 2]);
          out.push(j3); i += 2; continue;
        }
      }
      if (i + 1 < toks.length) {
        var j2 = toks[i] + toks[i + 1];
        if (JOIN.has(j2)) {
          if (keepParts) out.push(toks[i], toks[i + 1]);
          out.push(j2); i += 1; continue;
        }
      }
      out.push(toks[i]);
    }
    return out;
  }
  function tokenize(s) { return joinCompounds(baseTokens(s), false); }

  /* ===== 사전 준비 ===== */
  var SYN = new Map();    // 열쇠 → [[다른 열쇠, 무게], …]
  var JOIN = new Set();   // 붙여서 찾을 여러 낱말 열쇠
  var JOIN_HEAD = new Set();   // 그 열쇠의 첫 낱말
  var SHOW = new Map();   // 붙인 열쇠 → 화면에 보일 말 ('근공식' → '근의 공식')
  function dictKey(phrase) {
    var ws = words(phrase), toks = [];
    for (var i = 0; i < ws.length; i++) {
      if (!ws[i]) continue;
      var ts = wordTokens(ws[i], true);
      for (var j = 0; j < ts.length; j++) toks.push(ts[j]);
    }
    return { key: toks.join(''), n: toks.length, head: toks[0] };
  }
  function addGroup(line, weight) {
    var items = line.split('|'), keys = [], i, j;
    for (i = 0; i < items.length; i++) {
      var k = dictKey(items[i]);
      if (!k.key) continue;
      if (k.n > 1) { JOIN.add(k.key); JOIN_HEAD.add(k.head); }
      if (k.key !== items[i] && !SHOW.has(k.key)) SHOW.set(k.key, items[i].trim());
      if (keys.indexOf(k.key) < 0) keys.push(k.key);
    }
    for (i = 0; i < keys.length; i++) {
      var list = SYN.get(keys[i]);
      if (!list) SYN.set(keys[i], list = []);
      for (j = 0; j < keys.length; j++) {
        if (i === j) continue;
        var found = null;
        for (var x = 0; x < list.length; x++) if (list[x][0] === keys[j]) found = list[x];
        if (!found) list.push([keys[j], weight]);
        else if (found[1] < weight) found[1] = weight;
      }
    }
  }
  SYNONYMS.forEach(function (g) { addGroup(g, CFG.syn); });
  RELATED.forEach(function (g) { addGroup(g, CFG.rel); });
  // 사전에 붙인 꼴 그대로도 적힌 말('현재완료')은 그 꼴로 보인다
  SYNONYMS.concat(RELATED).forEach(function (g) {
    g.split('|').forEach(function (w) { if (SHOW.has(w)) SHOW.delete(w); });
  });

  /* ===== 오타 한 글자: 한 글자 지운 꼴로 후보를 찾는다 ===== */
  function fuzzyOk(t) {
    var c = ctype(t.charCodeAt(0));
    return (c === 1 && t.length >= 3) || (c === 3 && t.length >= 4);
  }
  function addDeletes(del, t) {
    for (var i = 0; i < t.length; i++) {
      var d = t.slice(0, i) + t.slice(i + 1), a = del.get(d);
      if (!a) del.set(d, [t]);
      else if (a[a.length - 1] !== t) a.push(t);
    }
  }
  // q 를 한 글자 빼먹었거나·더 썼거나·바꿔 쓴 말을 찾는다. 짧은 말은 첫 글자가 같아야 한다(헛짚기 줄이기)
  function fuzzyFind(q, del, has) {
    var out = [], n = q.length, i, j;
    function add(t) {
      if (t === q || out.indexOf(t) >= 0 || Math.abs(t.length - n) > 1) return;
      if (n <= 3 && t.charAt(0) !== q.charAt(0)) return;
      out.push(t);
    }
    var a = del.get(q);
    if (a) for (i = 0; i < a.length; i++) add(a[i]);
    for (i = 0; i < n; i++) {
      var d = q.slice(0, i) + q.slice(i + 1);
      if (d.length >= 2 && has(d)) add(d);
      var b = del.get(d);
      if (b) for (j = 0; j < b.length; j++) add(b[j]);
      if (out.length > 8) break;
    }
    return out;
  }
  var DICT_DEL = new Map();   // 사전 낱말의 지운 꼴 ('photosyntesis' 같은 오타도 사전으로 고친다)
  SYN.forEach(function (v, k) { if (fuzzyOk(k)) addDeletes(DICT_DEL, k); });

  /* ===== 색인 만들기 ===== */
  var GRADE_ORD = { e1: 1, e2: 2, e3: 3, e4: 4, e5: 5, e6: 6, m1: 7, m2: 8, m3: 9, h1: 10, h2: 11, h3: 12, u: 13, a: 14 };
  function gradeInfo(g) {
    if (Array.isArray(g)) {
      var a = [];
      for (var i = 0; i < g.length; i++) { var x = gradeInfo(g[i]); if (x) a.push(x); }
      return a.length ? a : null;
    }
    if (typeof g !== 'string' || !GRADE_ORD[g]) return null;
    return { id: g, o: GRADE_ORD[g], st: g.charAt(0) };
  }
  function addGrams(set, s) {
    if (s.length === 1) { set.add(s); return; }
    for (var i = 0; i + 1 < s.length; i++) set.add(s.slice(i, i + 2));
  }
  function uniq(a) {
    var out = [], seen = new Set();
    for (var i = 0; i < a.length; i++) if (!seen.has(a[i])) { seen.add(a[i]); out.push(a[i]); }
    return out;
  }

  var GRADE_CACHE = new Map();
  function gradeOf(g) {   // 항목마다 같은 학년 객체를 다시 만들지 않는다
    if (typeof g !== 'string') return gradeInfo(g);
    if (!GRADE_CACHE.has(g)) GRADE_CACHE.set(g, gradeInfo(g));
    return GRADE_CACHE.get(g);
  }
  function growI32(a, need) {   // need 번째 칸까지 쓸 수 있게 두 배씩 늘린다
    if (need < a.length) return a;
    var b = new Int32Array(Math.max(need + 1, a.length * 2));
    b.set(a);
    return b;
  }

  /* 색인: 한 번 훑으며 바로 역색인을 만든다(2만 항목 1.5초 안).
     - 글은 낱말을 잘라 내지 않고 글자를 훑으며 해시표로 낱말을 알아본다(같은 낱말은 한 번만 토큰으로)
     - 토큰은 이 색인 안의 정수 번호로 센다. 낱말 수는 한 정수에 담는다: 제목 + 키워드×64 + 본문×4096
     - 게시 목록은 큰 정수 배열에 사슬로 이어 두었다가 끝에 한 번에 편다(배열이 자라며 생기는 GC 를 줄인다)
     - BM25F 길이 보정은 항목별 계수(nrm)로 두고 찾을 때 곱한다 */
  function build(entries) {
    var list = Array.isArray(entries) ? entries : [];
    var N = list.length, docs = new Array(N), lens = new Float64Array(N * 3), tot = [0, 0, 0], i, j, k;
    var tokId = new Map(), tokStr = [], headF = [], whyF = [], topF = [], cnt = new Int32Array(1 << 14), touched = [];
    var pHead = new Int32Array(1 << 14), pTail = new Int32Array(1 << 14), pDf = new Int32Array(1 << 14);
    var pcap = 1 << 18, pDoc = new Int32Array(pcap), pCnt = new Int32Array(pcap), pNext = new Int32Array(pcap), pn = 0;
    var gramId = new Map(), gHead = [], gTail = [], gDf = [], gStamp = [];
    var gcap = 1 << 16, gDoc = new Int32Array(gcap), gNext = new Int32Array(gcap), gn = 0;

    function idOf(t) {
      var id = tokId.get(t);
      if (id === undefined) {
        id = tokStr.length;
        tokId.set(t, id); tokStr.push(t);
        headF.push(JOIN_HEAD.has(t) ? 1 : 0); whyF.push(WHY_SET.has(t) ? 1 : 0); topF.push(0);
        if (id >= cnt.length) {
          cnt = growI32(cnt, id); pHead = growI32(pHead, id); pTail = growI32(pTail, id); pDf = growI32(pDf, id);
        }
        pHead[id] = -1;
      }
      return id;
    }
    function addPost(id, doc, c) {
      if (pn >= pcap) { pcap *= 2; pDoc = growI32(pDoc, pcap - 1); pCnt = growI32(pCnt, pcap - 1); pNext = growI32(pNext, pcap - 1); }
      pDoc[pn] = doc; pCnt[pn] = c; pNext[pn] = -1;
      if (pHead[id] < 0) pHead[id] = pn; else pNext[pTail[id]] = pn;
      pTail[id] = pn; pDf[id]++; pn++;
    }
    // 두 글자 조각: 글자 코드 둘을 한 수 열쇠로(문자열을 잘라 내지 않게). 같은 항목 안 중복은 stamp 로 거른다
    function addGram(key, stamp) {
      var gid = gramId.get(key);
      if (gid === undefined) { gid = gHead.length; gramId.set(key, gid); gHead.push(-1); gTail.push(-1); gDf.push(0); gStamp.push(0); }
      if (gStamp[gid] === stamp) return 0;
      gStamp[gid] = stamp;
      if (gn >= gcap) { gcap *= 2; gDoc = growI32(gDoc, gcap - 1); gNext = growI32(gNext, gcap - 1); }
      gDoc[gn] = stamp - 1; gNext[gn] = -1;
      if (gHead[gid] < 0) gHead[gid] = gn; else gNext[gTail[gid]] = gn;
      gTail[gid] = gn; gDf[gid]++; gn++;
      return 1;
    }
    function gramsOf(ids, stamp) {   // 토큰들을 붙인 글의 두 글자 조각 (글을 실제로 붙이지는 않는다)
      var added = 0, prev = -1, total = 0;
      for (var a = 0; a < ids.length; a++) {
        var t = tokStr[ids[a]];
        for (var b = 0; b < t.length; b++) {
          var ch = t.charCodeAt(b);
          if (prev >= 0) added += addGram(prev * 65536 + ch, stamp);
          prev = ch; total++;
        }
      }
      if (total === 1) added += addGram(prev * 65536, stamp);
      return added;
    }
    function joinIds(ids) {   // joinCompounds(…, true) 와 같다: 쪼갠 낱말 + 붙인 말
      var n = ids.length, a;
      for (a = 0; a < n - 1; a++) if (headF[ids[a]]) break;
      if (a >= n - 1) return ids;
      var strs = new Array(n);
      for (a = 0; a < n; a++) strs[a] = tokStr[ids[a]];
      var joined = joinCompounds(strs, true), out = new Array(joined.length);
      for (a = 0; a < joined.length; a++) out[a] = idOf(joined[a]);
      return out;
    }
    function count(ids, inc) {
      for (var a = 0; a < ids.length; a++) {
        if (cnt[ids[a]] === 0) touched.push(ids[a]);
        cnt[ids[a]] += inc;
      }
    }

    // 낱말 해시표: 32비트 해시 두 개와 길이로 알아본다
    var hcap = 1 << 15, hslot = new Int32Array(hcap), hn = 0;
    var hA = new Int32Array(1 << 14), hB = new Int32Array(1 << 14), hL = new Int32Array(1 << 14), hids = [];
    function rehash() {
      hcap *= 2;
      hslot = new Int32Array(hcap);
      for (var a = 0; a < hn; a++) {
        var p = hA[a] & (hcap - 1);
        while (hslot[p] !== 0) p = (p + 1) & (hcap - 1);
        hslot[p] = a + 1;
      }
    }
    function wordAt(c, a, b, h1, h2) {   // c 의 [a, b) 낱말 → 토큰 번호들
      var L = b - a, p = h1 & (hcap - 1), slot;
      while ((slot = hslot[p]) !== 0) {
        if (hA[slot - 1] === h1 && hB[slot - 1] === h2 && hL[slot - 1] === L) return hids[slot - 1];
        p = (p + 1) & (hcap - 1);
      }
      var ts = wordTokens(c.slice(a, b), false), ids = new Array(ts.length);
      for (var m = 0; m < ts.length; m++) ids[m] = idOf(ts[m]);
      hA = growI32(hA, hn); hB = growI32(hB, hn); hL = growI32(hL, hn);
      hA[hn] = h1; hB[hn] = h2; hL[hn] = L; hids.push(ids);
      hn++;
      hslot[p] = hn;
      if (hn * 2 > hcap) rehash();
      return ids;
    }
    // 본문: 토큰을 세며, 앞 토큰과 이어 사전 말이 되면('현재 완료') 그것도 센다
    var p1 = -1, p2 = -1, flen = 0, collect = null;
    function emit(id, inc) {
      if (collect) { collect.push(id); return; }   // 제목·키워드는 모으기만 (붙이기·세기는 따로)
      if (cnt[id] === 0) touched.push(id);
      cnt[id] += inc; flen++;
      var jw = null;
      if (p2 >= 0 && headF[p2]) { jw = tokStr[p2] + tokStr[p1] + tokStr[id]; if (!JOIN.has(jw)) jw = null; }
      if (jw === null && p1 >= 0 && headF[p1]) { jw = tokStr[p1] + tokStr[id]; if (!JOIN.has(jw)) jw = null; }
      if (jw !== null) {
        var jid = idOf(jw);
        if (cnt[jid] === 0) touched.push(jid);
        cnt[jid] += inc; flen++;
      }
      p2 = p1; p1 = id;
    }
    // baseTokens 와 같은 규칙으로 글을 훑는다(문장부호는 지우지 않고 낱말 경계로 본다)
    function scan(s, inc) {
      var c = prep(s), n = c.length, a = 0, prevLast = 0;
      p1 = -1; p2 = -1; flen = 0;
      while (a < n) {
        while (a < n && !keep(c.charCodeAt(a))) a++;
        if (a >= n) break;
        var b = a, h1 = 0, h2 = -2128831035, ch;
        while (b < n && keep(ch = c.charCodeAt(b))) {
          h1 = (Math.imul(h1, 31) + ch) | 0;
          h2 = Math.imul(h2 ^ ch, 16777619);
          b++;
        }
        h1 ^= h1 >>> 16; h1 = Math.imul(h1, 0x45d9f3b); h1 ^= h1 >>> 16;
        var first = c.charCodeAt(a), skip = false;
        if (b - a === 1 && first === 0xd574) {   // 해: '방정식의 해'만 남긴다
          if (prevLast === 0xc758) emit(idOf('해'), inc);
          skip = true;
        } else if (b - a === 1 && first === 0xc218) {   // 수: '할 수 있어'의 수는 버린다
          var q = b;
          while (q < n && !keep(c.charCodeAt(q))) q++;
          var nc = q < n ? c.charCodeAt(q) : 0;
          skip = nc === 0xc788 || nc === 0xc5c6;
        }
        if (!skip) {
          var ids = wordAt(c, a, b, h1, h2);
          for (var m = 0; m < ids.length; m++) emit(ids[m], inc);
        }
        prevLast = c.charCodeAt(b - 1);
        a = b;
      }
      return flen;
    }
    function baseIds(s, buf) {   // buf 를 다시 쓴다(항목마다 새 배열을 만들지 않게)
      buf.length = 0;
      collect = buf;
      scan(s, 0);
      collect = null;
      return buf;
    }
    var tbuf = [], kbuf = [];

    for (i = 0; i < N; i++) {
      var e = list[i] || {}, stamp = i + 1, nk = 0, why = false;
      touched.length = 0;
      var tb = baseIds(e.title, tbuf), ti = joinIds(tb);
      count(ti, 1);
      var ngT = gramsOf(tb, stamp);
      var kws = Array.isArray(e.keywords) ? e.keywords : (e.keywords ? [e.keywords] : []);
      for (j = 0; j < kws.length; j++) {
        var kb = baseIds(kws[j], kbuf);
        if (!kb.length) continue;
        gramsOf(kb, stamp);
        var kj = joinIds(kb);
        count(kj, 64);
        nk += kj.length;
      }
      var nx = scan(e.text, 4096);
      lens[i * 3] = ti.length; lens[i * 3 + 1] = nk; lens[i * 3 + 2] = nx;
      tot[0] += ti.length; tot[1] += nk; tot[2] += nx;
      for (j = 0; j < touched.length; j++) {
        var id = touched[j], cc = cnt[id];
        cnt[id] = 0;
        addPost(id, i, cc);
        if ((cc & 4095) !== 0) topF[id] = 1;   // 제목·키워드에 있다
        if (whyF[id]) why = true;
      }
      var tbs = [];   // 제목 토큰(글자): why·제목 덮음 판단용
      for (j = 0; j < tb.length; j++) if (tbs.indexOf(tokStr[tb[j]]) < 0) tbs.push(tokStr[tb[j]]);
      docs[i] = { e: e, tb: tbs, ngT: ngT, why: why, g: gradeOf(e.grade) };
    }

    // BM25F 길이 보정 계수: 가중 / (1 - b + b × 길이 / 평균 길이)
    var nrm = new Float32Array(N * 3), FW = CFG.field;
    for (var f = 0; f < 3; f++) {
      var avg = N && tot[f] ? tot[f] / N : 1;
      for (i = 0; i < N; i++) nrm[i * 3 + f] = FW[f][0] / (1 - FW[f][1] + FW[f][1] * lens[i * 3 + f] / avg);
    }
    // 사슬을 낱말마다 [항목, 낱말 수, …] 정수 배열로 편다
    var vocab = new Map(), fuzzySet = new Set(), del = new Map(), gramPost = new Map();
    for (k = 0; k < tokStr.length; k++) {
      var df = pDf[k];
      if (!df) continue;
      var x = new Int32Array(df * 2), q = pHead[k], m = 0;
      while (q >= 0) { x[m++] = pDoc[q]; x[m++] = pCnt[q]; q = pNext[q]; }
      vocab.set(tokStr[k], { x: x, idf: Math.log(1 + (N - df + 0.5) / (df + 0.5)) });
      if (topF[k]) {   // 오타 후보는 제목·키워드 낱말만
        fuzzySet.add(tokStr[k]);
        if (fuzzyOk(tokStr[k])) addDeletes(del, tokStr[k]);
      }
    }
    gramId.forEach(function (gid, key) {
      var arr = new Int32Array(gDf[gid]), q2 = gHead[gid], m2 = 0;
      while (q2 >= 0) { arr[m2++] = gDoc[q2]; q2 = gNext[q2]; }
      var lo = key % 65536, hi = (key - lo) / 65536;
      gramPost.set(lo ? String.fromCharCode(hi, lo) : String.fromCharCode(hi), arr);
    });
    return { N: N, docs: docs, vocab: vocab, gramPost: gramPost, del: del, fuzzySet: fuzzySet, nrm: nrm,
      idfMax: Math.log(1 + (N - 0.5) / 1.5) };
  }

  /* ===== 찾기 ===== */
  function hasForm(index, t) {
    if (index.vocab.has(t)) return true;
    var s = SYN.get(t);
    if (s) for (var i = 0; i < s.length; i++) if (index.vocab.has(s[i][0])) return true;
    return false;
  }
  function addForm(out, tok, w) {
    for (var i = 0; i < out.length; i++) {
      if (out[i][0] === tok) { if (out[i][1] < w) out[i][1] = w; return; }
    }
    out.push([tok, w]);
  }
  // 질문 낱말 t 로 색인에서 찾을 꼴: [[색인 낱말, 무게], …] (그대로 + 유의어)
  function formsOf(index, t, mul) {
    var out = [], s = SYN.get(t);
    if (index.vocab.has(t)) out.push([t, mul]);
    if (s) for (var i = 0; i < s.length; i++) if (index.vocab.has(s[i][0])) addForm(out, s[i][0], s[i][1] * mul);
    return out;
  }
  function fuzzyForms(index, t) {
    var out = [], i, j, fs;
    if (!fuzzyOk(t)) return out;
    var c = fuzzyFind(t, index.del, function (x) { return index.fuzzySet.has(x); });
    if (!c.length) c = fuzzyFind(t, DICT_DEL, function (x) { return SYN.has(x); });   // 사전 낱말의 오타
    for (i = 0; i < c.length; i++) {
      fs = formsOf(index, c[i], CFG.fuzzy);
      for (j = 0; j < fs.length; j++) addForm(out, fs[j][0], fs[j][1]);
    }
    return out;
  }
  // 색인에 없는 동사 꼴은 끝 글자를 떼어 다시 본다: '이동해' → 이동, '바뀌어' → 바뀌
  var VERB_TAIL = setOf('해 어 아 여 요 서 고 며 게 지 니 나 래');
  function verbStemForms(index, t) {
    if (t.length < 3 || ctype(t.charCodeAt(0)) !== 1 || !VERB_TAIL.has(t.charAt(t.length - 1))) return [];
    var s = t.slice(0, -1);
    return STOP.has(s) ? [] : formsOf(index, s, CFG.part);
  }
  // 붙여 쓴 말 쪼개기: '분수나눗셈' → 분수 + 나눗셈, '광합성뭐야' → 광합성
  function splitCompound(index, t) {
    if (t.length < 3 || ctype(t.charCodeAt(0)) !== 1) return null;
    for (var i = t.length - 2; i >= 1; i--) {
      var a = stemKo(t.slice(0, i)), rest = t.slice(i), b = stemKo(rest);
      if ((a.length < 2 && !ONE.has(a)) || !hasForm(index, a)) continue;
      if (STOP.has(rest) || STOP.has(b)) return [a];
      if ((b.length >= 2 || ONE.has(b)) && hasForm(index, b)) return [a, b];
    }
    return null;
  }
  function gradeFactor(user, gi) {
    if (!user || !gi) return 1;
    var u = gradeInfo(user);
    if (!u || Array.isArray(u)) return 1;
    if (!Array.isArray(gi)) return gradeFactor1(u, gi);
    var best = 0;
    for (var i = 0; i < gi.length; i++) best = Math.max(best, gradeFactor1(u, gi[i]));
    return best;
  }
  function gradeFactor1(u, g) {
    if (u.id === g.id) return CFG.sameGrade;
    if (u.id === 'a') return 1;   // 성인은 어느 학년 내용이든 깎지 않는다
    var d = Math.abs(u.o - g.o);
    if (u.st === g.st) return Math.max(0.95, 1.12 - 0.03 * d);   // 같은 학교급 안에서는 약하게
    return Math.max(0.55, 1 - 0.08 * d);                          // 학교급이 다르면 멀수록 낮게
  }
  function ctxFactor(o, e) {
    var f = 1;
    if (o.unit && e.unit === o.unit) f *= CFG.sameUnit;
    else if (o.course && e.course === o.course) f *= CFG.sameCourse;
    if (o.subject && e.subject && e.subject !== o.subject) f *= CFG.otherSubject;
    return f;
  }
  // 제목 낱말이 모두 질문에 걸렸나 (m: [꼴, 기여, 꼴, 기여 …])
  function titleAll(tb, m) {
    if (!tb.length || !m.length) return false;
    for (var i = 0; i < tb.length; i++) {
      var ok = false;
      for (var j = 0; j < m.length && !ok; j += 2) {
        var f = m[j];
        ok = f === tb[i] || (f.length > tb[i].length && f.indexOf(tb[i]) >= 0);
      }
      if (!ok) return false;
    }
    return true;
  }
  function whyOf(r, qg) {
    var m = r.m, pairs = [], out = [], i;
    for (i = 0; i < m.length; i += 2) pairs.push([m[i], m[i + 1]]);
    pairs.sort(function (a, b) { return b[1] - a[1]; });
    for (i = 0; i < pairs.length && out.length < 3; i++) {
      var w = SHOW.get(pairs[i][0]) || pairs[i][0];   // 붙인 열쇠는 사전에 적힌 꼴로('근공식' → '근의 공식')
      if (out.indexOf(w) < 0) out.push(w);
    }
    if (!out.length) {   // 두 글자 조각으로만 걸렸으면 제목에서 겹친 낱말을 보인다
      var tb = r.doc.tb;
      for (i = 0; i < tb.length && out.length < 3; i++) {
        var g = new Set(), hit = false;
        addGrams(g, tb[i]);
        g.forEach(function (x) { if (qg.has(x)) hit = true; });
        if (hit) out.push(tb[i]);
      }
    }
    return out;
  }

  function query(index, q, opts) {
    opts = opts || {};
    if (!index || !index.N || !index.vocab) return [];
    var limit = opts.limit > 0 ? Math.floor(opts.limit) : 5;
    var toks = uniq(tokenize(q));
    if (!toks.length) return [];
    var V = index.vocab, N = index.N, nrm = index.nrm, Q = [], i, k, f;

    // 1) 질문 낱말마다 찾을 꼴: 그대로·유의어 → 없으면 붙여 쓴 말 쪼개기 → 동사 꼬리 떼기 → 오타 고치기
    for (i = 0; i < toks.length; i++) {
      var t = toks[i], forms = formsOf(index, t, 1);
      if (!forms.length) {
        var parts = splitCompound(index, t);
        if (parts) {
          for (k = 0; k < parts.length; k++) Q.push({ forms: formsOf(index, parts[k], CFG.part), light: LIGHT.has(parts[k]) });
          continue;
        }
        forms = verbStemForms(index, t);
        if (!forms.length) forms = fuzzyForms(index, t);
      }
      var light = LIGHT.has(t) || (!forms.length && ctype(t.charCodeAt(0)) === 1 && VERBISH_RE.test(t));
      Q.push({ forms: forms, light: light });
    }
    // 낱말 무게 = idf. 색인에 없는 낱말도 무게를 줘서, 아는 낱말이 조금만 걸린 엉뚱한 질문을 거른다
    var qwSum = 0;
    for (i = 0; i < Q.length; i++) {
      var qw = 0, fs = Q[i].forms;
      for (k = 0; k < fs.length; k++) qw = Math.max(qw, V.get(fs[k][0]).idf);
      if (!fs.length) qw = CFG.unknown * index.idfMax;
      if (Q[i].light) qw = Math.min(qw, CFG.light * index.idfMax);
      Q[i].qw = qw;
      qwSum += qw;
    }

    // 2) BM25F 점수와 덮은 정도(coverage)를 모은다
    var bm = new Float64Array(N), cov = new Float64Array(N), seen = new Uint8Array(N);
    var cands = [], matched = new Map(), best = new Map(), qi = null;
    function flush(b, di) {
      bm[di] += b[0];
      cov[di] += qi.qw * b[1];
      if (!seen[di]) { seen[di] = 1; cands.push(di); }
      var m = matched.get(di);
      if (!m) matched.set(di, m = []);
      m.push(b[2], b[0]);
    }
    for (i = 0; i < Q.length; i++) {
      qi = Q[i];
      if (!qi.forms.length) continue;
      best.clear();
      for (f = 0; f < qi.forms.length; f++) {
        var form = qi.forms[f][0], fw = qi.forms[f][1], p = V.get(form);
        for (k = 0; k < p.x.length; k += 2) {
          var di = p.x[k], c = p.x[k + 1], b3 = di * 3;
          var x = (c & 63) * nrm[b3] + ((c >> 6) & 63) * nrm[b3 + 1] + (c >>> 12) * nrm[b3 + 2];
          var s = fw * p.idf * x * (CFG.k1 + 1) / (x + CFG.k1);
          var mm = fw * ((c & 4095) !== 0 ? 1 : CFG.textOnly);   // 본문에만 있으면 약한 근거
          var b = best.get(di);
          if (!b) best.set(di, [s, mm, form]);
          else {
            if (s > b[0]) { b[0] = s; b[2] = form; }
            if (mm > b[1]) b[1] = mm;
          }
        }
      }
      best.forEach(flush);
    }

    // 3) 두 글자 조각: 띄어쓰기·조사·붙여 쓰기 차이를 흡수한다(제목·키워드만 본다)
    var qg = new Set(), gh = null;
    addGrams(qg, toks.join(''));
    var ng = qg.size;
    if (ng) {
      gh = new Uint16Array(N);
      qg.forEach(function (g) {
        var a = index.gramPost.get(g);
        if (a) for (var y = 0; y < a.length; y++) gh[a[y]]++;
      });
      var need = Math.max(1, Math.ceil(ng * 0.5));
      for (i = 0; i < N; i++) if (!seen[i] && gh[i] >= need) { seen[i] = 1; cands.push(i); }
    }

    // 4) 최종 점수: 관련도 × 종류 × 학년 × 과정·단원
    var avgQw = qwSum / Q.length;
    var askWhy = /(^| )(왜|왜요|이유|까닭|원인)( |$)/.test(normalize(q));
    var res = [], maxStr = 0;
    for (k = 0; k < cands.length; k++) {
      var d0 = cands[k], doc = index.docs[d0], e = doc.e;
      var covN = qwSum > 0 ? cov[d0] / qwSum : 0;
      var gs = gh ? Math.min(1, 2 * gh[d0] / (ng + doc.ngT)) : 0;
      var strength = Math.max(covN, CFG.gramStrength * gs);
      if (strength < CFG.keepStrength) continue;
      var sc = bm[d0] + CFG.gramW * gs * avgQw;
      sc *= CFG.kind[e.kind] || 1;
      sc *= gradeFactor(opts.grade, doc.g);
      sc *= ctxFactor(opts, e);
      var m = matched.get(d0) || [];
      if (titleAll(doc.tb, m)) sc *= CFG.titleAll;
      if (askWhy && doc.why) sc *= CFG.why;
      res.push({ entry: e, score: sc, strength: strength, m: m, doc: doc });
      if (strength > maxStr) maxStr = strength;
    }
    // 가장 나은 것도 근거가 약하면 아무것도 내지 않는다(아는 척하지 않기)
    if (!res.length || maxStr < CFG.minStrength) return [];
    res.sort(function (a, b) { return (b.score - a.score) || (b.strength - a.strength); });
    var top = res[0].score, out = [];
    for (k = 0; k < res.length && out.length < limit; k++) {
      var r = res[k];
      if (r.score < top * CFG.cutRatio) break;
      out.push({ entry: r.entry, score: Math.round(r.score * 1000) / 1000, why: whyOf(r, qg) });
    }
    return out;
  }

  /* ===== 짧은 대화(인사·감사·도움·작별) — 문장 전체가 이 꼴일 때만 ===== */
  var INTENT_SRC = {
    greeting: '안녕|안녕하세요|안녕하십니까|안뇽|안녕 하세요|하이|하이요|헬로|헬로우|hi|hello|hey|hi there|' +
      '반가워|반가워요|반갑습니다|좋은 아침|좋은 아침이에요|굿모닝|good morning|ㅎㅇ|처음 왔어요|여보세요',
    thanks: '고마워|고마워요|고맙습니다|고맙다|감사|감사해|감사해요|감사합니다|감사드려요|감사드립니다|땡큐|땡스|쌩큐|' +
      'thank you|thanks|thank u|thx|thank you so much|thanks a lot|ㄱㅅ|ㄳ|덕분이야|덕분이에요|' +
      '도움이 됐어|도움이 됐어요|알겠어 고마워|이해했어 고마워|고마워 이해했어',
    help: '뭐 할 수 있어|뭘 할 수 있어|뭐 할 수 있어요|뭘 할 수 있어요|뭐 할 수 있니|뭘 할 수 있니|무엇을 할 수 있나요|' +
      '무엇을 할 수 있어요|뭐 해 줄 수 있어|뭘 도와줄 수 있어|어떻게 써|어떻게 써요|어떻게 쓰는 거야|어떻게 쓰나요|' +
      '어떻게 쓰는 거예요|어떻게 사용해|어떻게 사용해요|어떻게 사용하나요|어떻게 사용하는 거야|사용법|사용 방법|' +
      '사용법 알려줘|사용법 알려주세요|쓰는 법|이용 방법|도움말|도움|도와줘|도와주세요|help|뭐 물어봐도 돼|' +
      '뭘 물어볼 수 있어|뭐 물어볼 수 있어|무엇을 물어볼 수 있나요|뭘 물어봐야 해|넌 누구야|너는 누구야|누구세요|' +
      '너는 뭐야|뭐 하는 곳이야|여기는 뭐 하는 곳이야',
    bye: '안녕히 계세요|안녕히 가세요|안녕히 계십시오|잘가|잘 가|잘가요|잘 가요|잘 있어|잘있어|또 봐|또봐|다음에 봐|' +
      '다음에 또 올게|이따 봐|바이|빠이|바이바이|bye|bye bye|goodbye|good bye|see you|수고하세요|수고하셨습니다|' +
      'ㅂㅂ|ㅂㅇ|그만할래|그만 할게|이제 갈게'
  };
  var INTENT = new Map();   // 붙인 꼴 → 의도
  Object.keys(INTENT_SRC).forEach(function (k) {
    INTENT_SRC[k].split('|').forEach(function (p) { INTENT.set(normalize(p).replace(/ /g, ''), k); });
  });
  var FILLER = setOf('선생님 쌤 샘 님 선생 정말 진짜 너무 넘 완전 많이 다들 여러분 저기 저기요 음 어 아 오 와 teacher so very');
  var LAUGH_RE = /[\u110f\u1112\u116e\u1172\u314b\u314e\u315c\u3160]+$/;   // 끝의 ㅋㅋ·ㅎㅎ·ㅠㅠ·ㅜㅜ

  function intent(q) {
    var n = normalize(q);
    if (!n || n.length > 30) return null;
    var ws = n.split(' ');
    if (ws.length > 6) return null;
    var hit = INTENT.get(ws.join(''));
    if (hit) return hit;
    var kept = [];
    for (var i = 0; i < ws.length; i++) {
      var w = ws[i].replace(LAUGH_RE, '');
      if (w && !FILLER.has(w)) kept.push(w);
    }
    return kept.length ? (INTENT.get(kept.join('')) || null) : null;
  }

  // 확장·시험용: 사전에서 그 낱말과 같은 말·가까운 말
  function synonymsOf(word) {
    var s = SYN.get(dictKey(word).key);
    return s ? s.map(function (x) { return x[0]; }) : [];
  }

  return {
    normalize: normalize,
    tokenize: tokenize,
    build: build,
    query: query,
    intent: intent,
    synonymsOf: synonymsOf
  };
});
