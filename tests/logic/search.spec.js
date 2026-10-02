/* TutorSearch (js/search.js) 검사 — 브라우저 없이 require 해서 본다.
   실제 학생이 묻는 꼴의 질문이 맞는 항목을 1~3위 안에 찾는지, 엉뚱한 질문은 빈 결과인지,
   유의어·학년 가중·오타·짧은 대화(intent)·낱말 나누기·성능을 확인한다. */
const { test, expect } = require('@playwright/test');
const TS = require('../../js/search.js');

/* ---------- 가상 색인 (ARCHITECTURE §5 항목 형식). 내용은 시험용 요약이지만 사실은 맞게 쓴다 ---------- */
function E(id, kind, grade, title, keywords, text) {
  const unit = id.split('#')[0];
  return {
    id, kind, grade, title, keywords, text,
    subject: id.split('-')[0],
    course: unit.replace(/-\d\d$/, ''),
    unit,
    ref: { tab: kind === 'term' ? 'terms' : kind === 'faq' ? 'faq' : 'concepts', idx: 0 },
  };
}

const ENTRIES = [
  // ---- 수학 ----
  E('math-e2-02#c1', 'concept', 'e2', '받아올림이 있는 덧셈', ['덧셈', '받아올림', '세로셈'],
    '일의 자리 수끼리 더한 값이 10이거나 10보다 크면 십의 자리로 1을 올려 줍니다. 이것을 받아올림이라고 해요.'),
  E('math-e2-03#c1', 'concept', 'e2', '받아내림이 있는 뺄셈', ['뺄셈', '받아내림'],
    '일의 자리 수끼리 뺄 수 없으면 십의 자리에서 10을 받아내려 계산합니다.'),
  E('math-e2-05#c1', 'concept', 'e2', '곱셈구구', ['곱셈', '2단부터 9단'],
    '2단부터 9단까지의 곱을 외워 두면 곱셈을 빠르게 할 수 있어요. 예를 들어 3×4=12입니다.'),
  E('math-e3-01#c2', 'concept', 'e3', '나눗셈의 뜻', ['나눗셈', '똑같이 나누어 주기', '몫'],
    '어떤 수를 똑같이 묶어 덜어 내거나 똑같이 나누어 주는 것이 나눗셈이에요. 12÷3=4에서 4를 몫이라고 해요.'),
  E('math-e3-06#c1', 'concept', 'e3', '분수의 뜻', ['분수', '분모', '분자'],
    '전체를 똑같이 나눈 것 중의 부분을 분수로 나타냅니다. 3/4에서 4는 분모, 3은 분자예요.'),
  E('math-e4-04#c1', 'concept', 'e4', '분모가 같은 분수의 덧셈', ['분수', '덧셈', '같은 분모'],
    '분모가 같은 분수끼리 더할 때는 분모는 그대로 두고 분자끼리 더합니다. 예: 1/5+2/5=3/5'),
  E('math-e5-04#c1', 'concept', 'e5', '분모가 다른 분수의 덧셈', ['분수', '덧셈', '통분'],
    '분모가 다른 분수끼리 더할 때는 먼저 통분하여 분모를 같게 한 다음 분자끼리 더합니다. 예: 1/2+1/3=5/6'),
  E('math-e5-02#t1', 'term', 'e5', '약수', ['약수', '나누어떨어지는 수'],
    '어떤 수를 나누어떨어지게 하는 수. 12의 약수는 1, 2, 3, 4, 6, 12이다.'),
  E('math-e5-02#t2', 'term', 'e5', '최대공약수', ['최대공약수', '공약수'],
    '두 수의 공통인 약수 중에서 가장 큰 수. 12와 18의 최대공약수는 6이다.'),
  E('math-e5-02#t3', 'term', 'e5', '최소공배수', ['최소공배수', '공배수', '배수'],
    '두 수의 공통인 배수 중에서 가장 작은 수. 4와 6의 최소공배수는 12이다.'),
  E('math-e5-02#m1', 'mistake', 'e5', '약수를 셀 때 1과 자기 자신을 빠뜨리는 실수', ['약수', '실수'],
    '어떤 수의 약수에는 1과 그 수 자신도 들어갑니다.'),
  E('math-e5-03#c1', 'concept', 'e5', '약분하는 방법', ['약분', '공약수'],
    '분모와 분자를 공약수로 나누어 간단히 하는 것을 약분이라고 합니다. 최대공약수로 나누면 한 번에 끝나요.'),
  E('math-e5-03#c2', 'concept', 'e5', '통분', ['통분', '공통분모'],
    '분모가 다른 분수의 크기를 바꾸지 않고 분모를 같게 만드는 것을 통분이라고 합니다.'),
  E('math-e5-05#c1', 'concept', 'e5', '직사각형의 넓이', ['넓이', '직사각형', '가로', '세로'],
    '직사각형의 넓이는 (가로)×(세로)로 구합니다. 넓이의 단위로 cm²를 씁니다.'),
  E('math-e6-01#c1', 'concept', 'e6', '분수의 나눗셈', ['분수', '나눗셈'],
    '분수로 나눌 때는 나누는 분수의 분모와 분자를 바꾸어 곱해서 계산합니다. 예: 3/4÷1/2=3/4×2/1=3/2'),
  E('math-e6-01#f1', 'faq', 'e6', '분수의 나눗셈에서 왜 분모와 분자를 바꾸어 곱하나요?', ['분수', '나눗셈'],
    '나누는 수를 1로 만들려고 나누어지는 수와 나누는 수에 같은 수를 곱하기 때문이에요.'),
  E('math-e6-04#c1', 'concept', 'e6', '비와 비율', ['비', '비교하는 양', '기준량'],
    '두 수를 나눗셈으로 비교할 때 3:5처럼 나타낸 것을 비, 기준량에 대한 비교하는 양의 크기를 비율이라고 합니다.'),
  E('math-e6-04#c2', 'concept', 'e6', '백분율', ['백분율', '%'],
    '기준량을 100으로 할 때의 비율을 백분율이라고 하고 기호 %를 써서 나타냅니다.'),
  E('math-e6-05#c1', 'concept', 'e6', '원의 넓이', ['원', '넓이', '반지름'],
    '원의 넓이는 (반지름)×(반지름)×(원주율)로 구합니다. 원주율은 약 3.14입니다.'),
  E('math-e6-05#t1', 'term', 'e6', '원주율', ['원주율', '3.14'],
    '원의 지름에 대한 원주의 비율. 약 3.14이다.'),
  E('math-m1-01#c1', 'concept', 'm1', '소인수분해', ['소인수분해', '소인수', '거듭제곱'],
    '자연수를 소인수만의 곱으로 나타내는 것을 소인수분해라고 합니다. 12=2²×3'),
  E('math-m1-02#c1', 'concept', 'm1', '유리수의 나눗셈', ['유리수', '나눗셈', '역수', '부호'],
    '유리수의 나눗셈은 나누는 수의 역수를 곱하여 계산하고, 두 수의 부호가 같으면 +, 다르면 -를 붙입니다.'),
  E('math-m1-03', 'unit', 'm1', '일차방정식', ['방정식', '등식', '이항'],
    '문자를 사용한 식과 등식의 성질을 이용해 일차방정식을 풉니다.'),
  E('math-m1-03#c1', 'concept', 'm1', '일차방정식의 풀이', ['일차방정식', '이항', '등식의 성질'],
    '등식의 성질이나 이항을 이용하여 x=(수)의 꼴로 만들어 방정식의 해를 구합니다.'),
  E('math-m1-03#t1', 'term', 'm1', '방정식의 해', ['해', '근', '방정식'],
    '방정식을 참이 되게 하는 미지수의 값. 해를 근이라고도 한다.'),
  E('math-m2-03#c1', 'concept', 'm2', '일차부등식', ['부등식', '일차부등식', '부등호'],
    '부등식의 양변에 같은 음수를 곱하거나 양변을 같은 음수로 나누면 부등호의 방향이 바뀝니다.'),
  E('math-m2-04#c1', 'concept', 'm2', '일차함수와 그래프', ['일차함수', '기울기', 'y절편', '그래프'],
    'y=ax+b(a≠0) 꼴의 함수를 일차함수라고 하고, 그래프는 기울기가 a이고 y절편이 b인 직선입니다.'),
  E('math-m2-07#c1', 'concept', 'm2', '피타고라스 정리', ['피타고라스 정리', '직각삼각형', '빗변'],
    '직각삼각형에서 빗변의 길이의 제곱은 나머지 두 변의 길이의 제곱의 합과 같습니다. a²+b²=c²'),
  E('math-m3-02#c1', 'concept', 'm3', '이차방정식과 근의 공식', ['이차방정식', '근의 공식', '인수분해'],
    'ax²+bx+c=0(a≠0)의 해는 x=(-b±√(b²-4ac))/(2a)로 구할 수 있습니다.'),
  E('math-h2-01#c1', 'concept', 'h2', '미분계수와 도함수', ['미분계수', '도함수', '순간변화율'],
    '함수 f(x)의 x=a에서의 순간변화율을 미분계수라고 하고, 이를 x에 대한 함수로 나타낸 것이 도함수입니다.'),

  // ---- 국어 ----
  E('kor-e2-01#c1', 'concept', 'e2', '받침이 있는 글자 읽기', ['받침', '소리 내어 읽기'],
    '받침 뒤에 모음으로 시작하는 글자가 오면 받침이 뒤 글자의 첫소리로 넘어가 소리 납니다. 예: 음악 → [으막]'),
  E('kor-e3-02#c1', 'concept', 'e3', '높임 표현', ['높임 표현', '높임말', '웃어른'],
    "웃어른께 말할 때는 '-시-'를 넣거나 '진지', '댁'처럼 높이는 낱말을 씁니다."),
  E('kor-e4-02#f1', 'faq', 'e4', '띄어쓰기는 왜 해야 하나요?', ['띄어쓰기', '맞춤법'],
    '붙여 쓰면 뜻이 헷갈릴 수 있어요. "오늘밤나무사온다"는 "오늘 밤 나무 사 온다"로도, "오늘 밤나무 사 온다"로도 읽혀요.'),
  E('kor-e4-03#t1', 'term', 'e4', '비유하는 표현', ['비유', '직유', '은유'],
    "어떤 대상을 다른 대상에 빗대어 나타내는 표현. '~처럼', '~같이'를 쓰면 직유, 'A는 B이다'로 쓰면 은유이다."),
  E('kor-e5-01#c1', 'concept', 'e5', '글의 주제 찾기', ['주제', '중심 문장', '요약'],
    '글쓴이가 글에서 말하고자 하는 중심 생각을 주제라고 합니다. 문단마다 중심 문장을 찾아 이어 보면 주제를 알 수 있어요.'),
  E('kor-e6-02#t1', 'term', 'e6', '속담', ['속담', '교훈'],
    '옛날부터 전해 내려오는 짧은 말로, 삶의 지혜와 교훈이 담겨 있다. 예: 가는 말이 고와야 오는 말이 곱다.'),
  E('kor-e6-04#c1', 'concept', 'e6', '논설문의 짜임', ['논설문', '서론', '본론', '결론', '주장', '근거'],
    '논설문은 서론에서 문제 상황과 주장을, 본론에서 주장을 뒷받침하는 근거를, 결론에서 주장을 다시 강조합니다.'),
  E('kor-m1-02#t1', 'term', 'm1', '품사', ['품사', '명사', '동사', '형용사'],
    '낱말을 기능, 형태, 의미에 따라 나눈 갈래. 명사, 대명사, 수사, 조사, 동사, 형용사, 관형사, 부사, 감탄사의 아홉 가지가 있다.'),
  E('kor-m2-03#c1', 'concept', 'm2', '문장 성분', ['문장 성분', '주어', '서술어', '목적어'],
    '문장 안에서 낱말이 하는 역할에 따라 주어, 서술어, 목적어, 보어, 관형어, 부사어, 독립어로 나눕니다.'),
  E('kor-h1-02#c1', 'concept', 'h1', '고전 시가 감상: 시조', ['시조', '고전 시가', '초장', '중장', '종장'],
    '시조는 초장, 중장, 종장의 3장 6구, 45자 안팎으로 이루어진 우리 고유의 정형시입니다.'),

  // ---- 영어 ----
  E('eng-e3-02#c1', 'concept', 'e3', '알파벳 대문자와 소문자', ['알파벳', '대문자', '소문자'],
    '영어 알파벳은 26자이고, 문장의 첫 글자와 사람 이름의 첫 글자는 대문자로 씁니다.'),
  E('eng-e4-01#f1', 'faq', 'e4', 'a와 an은 언제 쓰나요?', ['관사', 'a', 'an'],
    '다음 낱말이 모음 소리로 시작하면 an, 자음 소리로 시작하면 a를 씁니다. 예: an apple, a book'),
  E('eng-e5-03#c1', 'concept', 'e5', 'be동사의 과거형', ['be동사', '과거형', 'was', 'were'],
    'am과 is의 과거형은 was, are의 과거형은 were입니다. 예: I was happy.'),
  E('eng-e6-02#c1', 'concept', 'e6', '일반동사의 과거형', ['일반동사', '과거형', '-ed', '불규칙 동사'],
    '대부분의 동사는 끝에 -ed를 붙여 과거형을 만들고, go→went처럼 불규칙하게 바뀌는 동사도 있습니다.'),
  E('eng-m1-02#t1', 'term', 'm1', '명사', ['명사', '셀 수 있는 명사'],
    '사람, 사물, 장소의 이름을 나타내는 말. 셀 수 있는 명사는 복수형을 만들 수 있다.'),
  E('eng-m1-03#t1', 'term', 'm1', '동사', ['동사', '동작', '상태'],
    '사람이나 사물의 동작이나 상태를 나타내는 말. 예: run, eat, be'),
  E('eng-m2-02#c1', 'concept', 'm2', '현재완료', ['현재완료', 'have p.p.', '경험', '계속', '완료', '결과'],
    'have(has)+과거분사 꼴로, 과거에 일어난 일이 현재까지 이어지거나 영향을 미칠 때 씁니다. 경험·계속·완료·결과의 뜻이 있어요.'),
  E('eng-m2-04#c1', 'concept', 'm2', 'to부정사의 쓰임', ['to부정사', '명사적 용법', '형용사적 용법', '부사적 용법'],
    'to+동사원형 꼴로 명사, 형용사, 부사처럼 쓰입니다. 예: I want to swim.'),
  E('eng-m2-05#c1', 'concept', 'm2', '비교급과 최상급', ['비교급', '최상급', '-er', '-est'],
    '두 대상을 비교할 때는 비교급(taller), 셋 이상 가운데 가장 ~할 때는 최상급(tallest)을 씁니다.'),
  E('eng-m3-01#c1', 'concept', 'm3', '수동태', ['수동태', 'be p.p.', '능동태'],
    '주어가 동작을 받을 때 be동사+과거분사로 나타냅니다. 예: The window was broken by Minsu.'),

  // ---- 사회 ----
  E('soc-e3-03#c1', 'concept', 'e3', '우리 고장의 모습', ['고장', '디지털 영상 지도', '장소'],
    '우리 고장의 여러 장소를 그림지도나 디지털 영상 지도로 살펴봅니다.'),
  E('soc-e4-03#c1', 'concept', 'e4', '지도의 약속', ['지도', '기호', '축척', '방위'],
    '지도에는 방위표, 기호와 범례, 축척, 등고선 같은 약속이 있어 땅의 모습을 알 수 있습니다.'),
  E('soc-e6-01#c1', 'concept', 'e6', '민주주의의 의미', ['민주주의', '국민 주권', '인권'],
    '국민이 나라의 주인이 되어 스스로 나라의 일을 결정하는 정치 제도입니다.'),
  E('soc-e6-01#f1', 'faq', 'e6', '선거는 왜 하나요?', ['선거', '투표', '대표'],
    '많은 사람이 한자리에 모여 모든 일을 결정하기 어려우므로 우리를 대신할 대표를 뽑으려고 선거를 합니다.'),
  E('soc-e6-02#t1', 'term', 'e6', '삼권 분립', ['삼권 분립', '국회', '정부', '법원'],
    '나라의 권력을 입법권(국회), 행정권(정부), 사법권(법원)으로 나누어 서로 견제하게 하는 제도.'),
  E('soc-m1-04#c1', 'concept', 'm1', '기후와 인간 생활', ['기후', '열대 기후', '건조 기후', '날씨'],
    '오랜 기간에 걸쳐 나타나는 평균적인 대기 상태를 기후라고 하며, 기후에 따라 의식주 생활이 달라집니다.'),
  E('soc-m2-05#c1', 'concept', 'm2', '수요와 공급', ['수요', '공급', '가격', '시장'],
    '가격이 오르면 수요량은 줄고 공급량은 늘어납니다. 수요와 공급이 만나는 곳에서 시장 가격이 정해집니다.'),
  E('soc-h1-02#c1', 'concept', 'h1', '저출생과 고령화', ['저출생', '고령화', '인구 문제'],
    '태어나는 아이가 줄고 노인 인구 비율이 높아지면서 일할 사람이 줄어드는 문제가 생깁니다.'),

  // ---- 역사 ----
  E('hist-e5-01#t1', 'term', 'e5', '고조선', ['고조선', '단군왕검', '8조법'],
    '우리 역사에서 처음 세워진 나라. 단군왕검이 세웠다고 전해진다.'),
  E('hist-e5-02#c1', 'concept', 'e5', '삼국의 성립과 발전', ['삼국 시대', '고구려', '백제', '신라'],
    '고구려, 백제, 신라가 서로 경쟁하며 발전한 시기를 삼국 시대라고 합니다.'),
  E('hist-e5-03#c1', 'concept', 'e5', '훈민정음 창제', ['훈민정음', '세종대왕'],
    '세종대왕은 백성이 쉽게 배우고 쓸 수 있도록 1443년 훈민정음을 만들고 1446년에 반포했습니다.'),
  E('hist-e5-04#c1', 'concept', 'e5', '임진왜란', ['임진왜란', '이순신', '의병'],
    '1592년 일본이 조선을 침략하여 일어난 전쟁입니다. 이순신이 이끈 수군과 곳곳에서 일어난 의병의 활약으로 나라를 지켰습니다.'),
  E('hist-e5-04#f1', 'faq', 'e5', '임진왜란이 일어난 까닭은 무엇인가요?', ['임진왜란', '원인', '도요토미 히데요시'],
    '일본을 통일한 도요토미 히데요시가 명나라를 치러 가는 길을 빌려 달라는 구실로 조선에 쳐들어왔기 때문이에요.'),
  E('hist-m3-02#c1', 'concept', 'm3', '3·1 운동', ['3·1 운동', '독립 선언서', '일제 강점기'],
    '1919년 3월 1일 독립 선언서를 발표하고 전국에서 만세 시위를 벌인 민족 운동입니다. 이를 계기로 대한민국 임시 정부가 세워졌습니다.'),
  E('hist-m3-04#c1', 'concept', 'm3', '6·25 전쟁', ['6·25 전쟁', '정전 협정'],
    '1950년 6월 25일 북한의 남침으로 시작되어 1953년 정전 협정으로 멈춘 전쟁입니다.'),
  E('hist-h1-03#c1', 'concept', 'h1', '산업 혁명', ['산업 혁명', '증기 기관', '공장제 기계 공업'],
    '18세기 후반 영국에서 증기 기관을 이용한 기계로 물건을 대량 생산하면서 사회와 경제가 크게 바뀌었습니다.'),

  // ---- 과학 ----
  E('sci-e3-02#c1', 'concept', 'e3', '동물의 한살이', ['한살이', '알', '애벌레', '번데기'],
    '배추흰나비는 알, 애벌레, 번데기, 어른벌레의 단계를 거쳐 자랍니다.'),
  E('sci-e3-04#c1', 'concept', 'e3', '자석의 성질', ['자석', 'N극', 'S극', '철'],
    '자석은 철로 된 물체를 끌어당기고, 같은 극끼리는 밀어 내며 다른 극끼리는 끌어당깁니다.'),
  E('sci-e4-02#c1', 'concept', 'e4', '식물의 한살이', ['한살이', '씨', '싹', '열매'],
    '씨가 싹 터서 자라 꽃이 피고 열매를 맺어 다시 씨를 만드는 과정을 식물의 한살이라고 합니다.'),
  E('sci-e4-04#c1', 'concept', 'e4', '물의 상태 변화', ['증발', '끓음', '응결', '상태 변화'],
    '물이 표면에서 수증기로 변하는 것을 증발, 공기 중의 수증기가 물로 변하는 것을 응결이라고 합니다.'),
  E('sci-e5-01#c1', 'concept', 'e5', '온도와 열의 이동', ['온도', '열', '전도'],
    '온도가 높은 물체에서 낮은 물체로 열이 이동합니다. 고체에서 열이 이동하는 것을 전도라고 해요.'),
  E('sci-e5-03#c1', 'concept', 'e5', '태양계의 행성', ['태양계', '행성', '태양'],
    '태양계에는 태양을 중심으로 수성, 금성, 지구, 화성, 목성, 토성, 천왕성, 해왕성 여덟 행성이 돌고 있습니다.'),
  E('sci-e6-02#t1', 'term', 'e6', '산성과 염기성', ['산성', '염기성', '지시약', '리트머스 종이'],
    '푸른색 리트머스 종이를 붉게 바꾸는 용액은 산성, 붉은색 리트머스 종이를 푸르게 바꾸는 용액은 염기성이다.'),
  E('sci-e6-03#c1', 'concept', 'e6', '광합성', ['광합성', '잎', '녹말', '빛'],
    '식물이 빛을 이용하여 물과 이산화 탄소로 양분(녹말)을 만드는 과정입니다. 주로 잎에서 일어나요.'),
  E('sci-m1-03#c1', 'concept', 'm1', '힘과 운동: 중력과 마찰력', ['힘', '중력', '마찰력', '탄성력'],
    '지구가 물체를 끌어당기는 힘을 중력, 물체의 운동을 방해하는 힘을 마찰력이라고 합니다.'),
  E('sci-m1-05#f1', 'faq', 'm1', '빛은 왜 굴절하나요?', ['빛', '굴절', '속력'],
    '빛이 지나가는 물질이 바뀌면 빛의 속력이 달라져서 두 물질의 경계면에서 꺾여 나아가기 때문이에요.'),
  E('sci-m2-04#t1', 'term', 'm2', '광합성', ['광합성', '엽록체', '포도당', '이산화 탄소'],
    '식물이 빛에너지를 이용해 이산화 탄소와 물로 포도당을 만들고 산소를 내놓는 과정. 엽록체에서 일어난다.'),
  E('sci-m2-06#c1', 'concept', 'm2', '전기 회로와 옴의 법칙', ['전류', '전압', '저항', '옴의 법칙'],
    '전류의 세기는 전압에 비례하고 저항에 반비례합니다(V=IR).'),
  E('sci-m3-03#c1', 'concept', 'm3', '세포 분열', ['세포 분열', '체세포 분열', '감수 분열', '염색체'],
    '생물이 자라는 것은 체세포 분열로 세포 수가 늘어나기 때문이며, 생식세포는 감수 분열로 만들어집니다.'),
  E('sci-h1-02#c1', 'concept', 'h1', '산화와 환원', ['산화', '환원', '화학 반응'],
    '물질이 산소를 얻으면 산화, 산소를 잃으면 환원이라고 하며 두 반응은 동시에 일어납니다.'),
];
const IDX = TS.build(ENTRIES);

const ids = (q, opts) => TS.query(IDX, q, opts).map((r) => r.entry.id);
/** q 로 찾은 결과의 n 위 안에 id 가 있어야 한다 */
function expectFound(q, id, opts, n = 3) {
  const got = ids(q, opts);
  expect(got.slice(0, n), `"${q}" → ${id} 가 ${n}위 안에 (받은 것: ${got.join(', ') || '없음'})`).toContain(id);
}

/* ---------- 실제 학생 질문 꼴: [질문, 찾아야 할 항목, 옵션] ---------- */
const STUDENT_QUESTIONS = [
  ['분수끼리 나누는 건 어떻게 해요?', 'math-e6-01#c1', { grade: 'e6' }],
  ['광합성이 뭐야', 'sci-e6-03#c1', { grade: 'e6' }],
  ['현재완료가 뭐예요', 'eng-m2-02#c1'],
  ['임진왜란은 왜 일어났어?', 'hist-e5-04#f1'],
  ['be동사 과거형 알려줘', 'eng-e5-03#c1'],
  ['약수가 뭐예요?', 'math-e5-02#t1'],
  ['최대공약수 구하는 법', 'math-e5-02#t2'],
  ['최소공배수 알려줘', 'math-e5-02#t3'],
  ['약분은 어떻게 해?', 'math-e5-03#c1'],
  ['통분은 어떻게 하나요', 'math-e5-03#c2'],
  ['직사각형 넓이는?', 'math-e5-05#c1'],
  ['구구단 외우는 법', 'math-e2-05#c1'],
  ['받아올림이 뭐야', 'math-e2-02#c1'],
  ['소인수분해 하는 방법', 'math-m1-01#c1'],
  ['일차방정식 어떻게 풀어요?', 'math-m1-03#c1'],
  ['부등식에서 음수를 곱하면 왜 방향이 바뀌어?', 'math-m2-03#c1'],
  ['일차함수 기울기가 뭐예요', 'math-m2-04#c1'],
  ['근의 공식 알려줘', 'math-m3-02#c1'],
  ['피타고라스 정리가 뭐야', 'math-m2-07#c1'],
  ['도함수가 뭔가요', 'math-h2-01#c1'],
  ['원주율이 뭐야', 'math-e6-05#t1'],
  ['백분율 구하는 방법', 'math-e6-04#c2'],
  ['비율이 뭐야', 'math-e6-04#c1'],
  ['분수 나눗셈 왜 바꿔서 곱해?', 'math-e6-01#f1'],
  ['높임말은 어떻게 써요?', 'kor-e3-02#c1'],
  ['은유랑 직유 차이가 뭐야', 'kor-e4-03#t1'],
  ['글의 주제를 어떻게 찾아요?', 'kor-e5-01#c1'],
  ['논설문은 어떻게 짜여 있어?', 'kor-e6-04#c1'],
  ['품사의 종류 알려주세요', 'kor-m1-02#t1'],
  ['시조가 뭐야', 'kor-h1-02#c1'],
  ['띄어쓰기 왜 해야 돼?', 'kor-e4-02#f1'],
  ['문장 성분이 뭐예요', 'kor-m2-03#c1'],
  ['명사가 뭐예요', 'eng-m1-02#t1', { subject: 'eng' }],
  ['to부정사 쓰임 알려줘', 'eng-m2-04#c1'],
  ['수동태는 어떻게 만들어요?', 'eng-m3-01#c1'],
  ['비교급이랑 최상급 차이', 'eng-m2-05#c1'],
  ['a랑 an 언제 써?', 'eng-e4-01#f1'],
  ['go의 과거형은?', 'eng-e6-02#c1'],
  ['대문자는 언제 써요', 'eng-e3-02#c1'],
  ['지도에 있는 약속이 뭐야', 'soc-e4-03#c1'],
  ['민주주의가 뭐예요', 'soc-e6-01#c1'],
  ['삼권분립이 뭐야', 'soc-e6-02#t1'],
  ['기후랑 날씨는 뭐가 달라?', 'soc-m1-04#c1'],
  ['수요와 공급 법칙', 'soc-m2-05#c1'],
  ['선거는 왜 해요?', 'soc-e6-01#f1'],
  ['한글은 누가 만들었어?', 'hist-e5-03#c1'],
  ['고조선은 누가 세웠어', 'hist-e5-01#t1'],
  ['3·1 운동이 뭐야', 'hist-m3-02#c1'],
  ['산업혁명이 뭐예요', 'hist-h1-03#c1'],
  ['삼국시대 나라들', 'hist-e5-02#c1'],
  ['식물의 한살이 알려줘', 'sci-e4-02#c1'],
  ['열은 어떻게 이동해?', 'sci-e5-01#c1'],
  ['자석은 왜 철을 끌어당겨?', 'sci-e3-04#c1'],
  ['증발이랑 응결 차이', 'sci-e4-04#c1'],
  ['마찰력이 뭐야', 'sci-m1-03#c1'],
  ['옴의 법칙 알려줘', 'sci-m2-06#c1'],
  ['산화 환원 반응이 뭐야', 'sci-h1-02#c1'],
  ['리트머스 종이 색이 변하는 이유', 'sci-e6-02#t1'],
  ['태양계 행성 순서', 'sci-e5-03#c1'],
  ['체세포 분열이랑 감수 분열', 'sci-m3-03#c1'],
  ['빛이 꺾이는 이유', 'sci-m1-05#f1'],
  ['배추흰나비 한살이', 'sci-e3-02#c1'],
];

test.describe('TutorSearch — 낱말 다듬기', () => {
  test('normalize: NFKC·소문자·문장부호', () => {
    expect(TS.normalize('  Hello,   World!! ')).toBe('hello world');
    expect(TS.normalize('ＡＢＣ１２３')).toBe('abc123');
    expect(TS.normalize('광합성이 뭐야???')).toBe('광합성이 뭐야');
    expect(TS.normalize(null)).toBe('');
    expect(TS.normalize(undefined)).toBe('');
  });

  test('tokenize: 조사·어미를 떼고 묻는 말은 버린다', () => {
    const cases = [
      ['광합성이 뭐야', ['광합성']],
      ['분수끼리 나누는 건 어떻게 해요?', ['분수', '나누']],
      ['현재완료란 무엇인가요?', ['현재완료']],
      ['임진왜란은 왜 일어났어?', ['임진왜란', '일어나']],
      ['약분하는 방법 좀 설명해줘', ['약분', '방법']],
      ['나라를', ['나라']],
      ['학생들은', ['학생']],
      ['구름을', ['구름']],
      ['연필로', ['연필']],
      ['온도가', ['온도']],
      ['빛이', ['빛']],
      ['민주주의의', ['민주주의']],
      ['겉넓이를', ['겉넓이']],
      ['Verbs', ['verb']],
      ['2차 방정식', ['이차방정식']],
      ['현재 완료', ['현재완료']],
      ['방정식의 해', ['방정식', '해']],
    ];
    for (const [q, want] of cases) expect(TS.tokenize(q), q).toEqual(want);
  });

  test('tokenize: 과잉 제거를 막는다 (낱말의 일부인 끝은 떼지 않는다)', () => {
    // 떼고 한 글자만 남는 말
    for (const w of ['나이', '넓이', '높이', '아이', '가을', '마을']) expect(TS.tokenize(w), w).toEqual([w]);
    // 조사처럼 보이는 끝이 낱말의 일부
    for (const w of ['민주주의', '임진왜란', '가속도', '회로', '온실효과', '종이', '실험결과']) {
      expect(TS.tokenize(w), w).toEqual([w]);
    }
    expect(TS.tokenize('기온이')).toEqual(['기온']);
  });

  test('tokenize: 군말·웃음·빈 입력', () => {
    expect(TS.tokenize('ㅋㅋㅋ')).toEqual([]);
    expect(TS.tokenize('어떻게 해')).toEqual([]);
    expect(TS.tokenize('뭐야 알려줘 궁금해요')).toEqual([]);
    expect(TS.tokenize('')).toEqual([]);
    expect(TS.tokenize(null)).toEqual([]);
    expect(TS.tokenize('be동사 과거형 알려줘')).toEqual(['be동사', '과거형']);
  });
});

test.describe('TutorSearch — 질문 찾기', () => {
  test(`학생 질문 ${STUDENT_QUESTIONS.length}개가 맞는 항목을 1~3위 안에 찾는다`, () => {
    expect(STUDENT_QUESTIONS.length).toBeGreaterThanOrEqual(35);
    for (const [q, id, opts] of STUDENT_QUESTIONS) expectFound(q, id, opts);
  });

  test('곱셈구구의 "7단"은 수와 함께 찾는다 (한 자리 수는 버려도 N단은 남긴다)', () => {
    const idx = TS.build([
      E('math-e2-07#c2', 'concept', 'e2', '2단, 5단 곱셈구구', ['2단', '5단'], '2단은 2씩, 5단은 5씩 커져요.'),
      E('math-e2-07#c3', 'concept', 'e2', '3단, 6단 곱셈구구', ['3단', '6단'], '3단은 3씩, 6단은 6씩 커져요.'),
      E('math-e2-07#c5', 'concept', 'e2', '7단, 9단 곱셈구구', ['7단', '9단'], '7단은 7씩, 9단은 9씩 커져요.'),
      E('math-e2-08#c1', 'concept', 'e2', '문제 해결 1단계', ['단계'], '1단계에서는 문제를 꼼꼼히 읽어요.'),
    ]);
    const top = (q) => ((TS.query(idx, q, { grade: 'e2' })[0] || {}).entry || {}).id;
    expect(top('구구단 7단')).toBe('math-e2-07#c5');
    expect(top('9단 외우는 법')).toBe('math-e2-07#c5');
    expect(top('6단이 헷갈려요')).toBe('math-e2-07#c3');
    expect(TS.tokenize('7단이')).toEqual(['7단']);
    expect(TS.tokenize('1단계')).not.toContain('1단');   // 단계는 다른 말
  });

  test('"시계 보는 법"처럼 물어도 시각 읽기를 찾는다 (시계 ↔ 시각)', () => {
    const idx = TS.build([
      E('math-e1-08#c3', 'concept', 'e1', '몇 시 읽기', ['시각', '짧은바늘', '긴바늘'],
        '짧은바늘이 가리키는 수가 몇 시예요. 긴바늘이 12를 가리키면 정각이에요.'),
      E('math-e1-08#c1', 'concept', 'e1', '여러 가지 모양 찾기', ['모양'], '네모, 세모, 동그라미 모양을 찾아요.'),
      E('math-e1-03#c1', 'concept', 'e1', '덧셈하기', ['덧셈'], '두 수를 모아서 더해요.'),
    ]);
    const r = TS.query(idx, '시계 보는 법', { grade: 'e1' });
    expect(r.length).toBeGreaterThan(0);
    expect(r[0].entry.id).toBe('math-e1-08#c3');
  });

  test('엉뚱한 질문은 빈 결과 (억지로 아무거나 내지 않는다)', () => {
    const offTopic = ['오늘 점심 뭐 먹지', 'ㅋㅋㅋ', 'ㅎㅎㅎㅎ 심심해', '배고파', '게임 하고 싶다', 'asdfgh qwerty',
      '아이돌 노래 추천해줘', '축구 좋아해?', '너 몇 살이야', '', '   ', '?!?!'];
    for (const q of offTopic) expect(TS.query(IDX, q), `"${q}"`).toEqual([]);
  });

  test('유의어: 색인에 없는 말로 물어도 같은 뜻의 항목을 찾는다', () => {
    expectFound('원의 면적', 'math-e6-05#c1');
    expectFound('퍼센트 구하는 법', 'math-e6-04#c2');
    expectFound('나누기가 뭐야', 'math-e3-01#c2');
    expectFound('빼기 어떻게 해', 'math-e2-03#c1');
    expectFound('곱하기 외우기', 'math-e2-05#c1');
    expectFound('분수 더하기', 'math-e5-04#c1', { grade: 'e5' });
    expectFound('존댓말 쓰는 법', 'kor-e3-02#c1');
    expectFound('verb 뜻이 뭐야', 'eng-m1-03#t1');
    expectFound('한국전쟁이 뭐야', 'hist-m3-04#c1');
    expectFound('임진전쟁', 'hist-e5-04#c1');
    expectFound('저출산 문제', 'soc-h1-02#c1');
    const photo = ids('photosynthesis').slice(0, 2);
    expect(photo.some((id) => id === 'sci-e6-03#c1' || id === 'sci-m2-04#t1'), photo.join()).toBe(true);
    const past = ids('past tense').slice(0, 3);
    expect(past.some((id) => id === 'eng-e5-03#c1' || id === 'eng-e6-02#c1'), past.join()).toBe(true);
    // 사전은 50쌍이 넘고 서로 이어진다
    expect(TS.synonymsOf('나눗셈')).toContain('나누기');
    expect(TS.synonymsOf('면적')).toContain('넓이');
    expect(TS.synonymsOf('광합성')).toContain('photosynthesis');
  });

  test('학년 가중: 같은 학년이 앞, 학교급이 다르면 멀수록 뒤', () => {
    expect(ids('광합성이 뭐야', { grade: 'e6' })[0]).toBe('sci-e6-03#c1');
    expect(ids('광합성이 뭐야', { grade: 'm2' })[0]).toBe('sci-m2-04#t1');
    expect(ids('광합성이 뭐야', { grade: 'h1' })[0]).toBe('sci-m2-04#t1');   // 고1 에게는 중2 쪽이 더 가깝다
    expect(ids('분수 덧셈', { grade: 'e4' })[0]).toBe('math-e4-04#c1');
    expect(ids('분수 덧셈', { grade: 'e5' })[0]).toBe('math-e5-04#c1');
    const scoreOf = (grade) => TS.query(IDX, '광합성', { grade, limit: 10 }).find((r) => r.entry.id === 'sci-e6-03#c1').score;
    const same = scoreOf('e6');
    expect(scoreOf('e5') / same).toBeGreaterThan(0.85);    // 같은 학교급 안에서는 약하게 깎는다
    expect(scoreOf('h2') / same).toBeLessThan(0.75);       // 고2 에게 초6 내용은 많이 뒤로
    expect(scoreOf('a') / same).toBeGreaterThan(0.8);      // 성인은 어느 학년 내용이든 본다
  });

  test('같은 단원·과정·과목 가산', () => {
    expect(ids('넓이', { unit: 'math-e6-05' })[0]).toBe('math-e6-05#c1');
    expect(ids('넓이', { unit: 'math-e5-05' })[0]).toBe('math-e5-05#c1');
    expect(ids('넓이', { course: 'math-e5' })[0]).toBe('math-e5-05#c1');
    expect(ids('명사', { subject: 'kor' })[0]).toBe('kor-m1-02#t1');
    expect(ids('명사', { subject: 'eng' })[0]).toBe('eng-m1-02#t1');
  });

  test('오타 한 글자를 견딘다', () => {
    const photo = ids('광합셩이 뭐야').slice(0, 3);
    expect(photo.some((id) => id === 'sci-e6-03#c1' || id === 'sci-m2-04#t1'), photo.join()).toBe(true);
    expectFound('임진왜랸', 'hist-e5-04#c1');
    expectFound('피타고라쓰 정리', 'math-m2-07#c1');
    expectFound('소인수분헤', 'math-m1-01#c1');
    expectFound('수동테가 뭐야', 'eng-m3-01#c1');
    const typoEn = ids('photosyntesis').slice(0, 3);
    expect(typoEn.some((id) => id === 'sci-e6-03#c1' || id === 'sci-m2-04#t1'), typoEn.join()).toBe(true);
  });

  test('띄어쓰기·붙여 쓰기 차이를 흡수한다', () => {
    expectFound('삼권 분립', 'soc-e6-02#t1');
    expectFound('산업 혁명', 'hist-h1-03#c1');
    expectFound('분수나눗셈', 'math-e6-01#c1', { grade: 'e6' });
    expectFound('원의넓이', 'math-e6-05#c1');
  });

  test('why: 어떤 낱말이 걸렸는지 알려 준다', () => {
    const r1 = TS.query(IDX, '분수끼리 나누는 건 어떻게 해요?', { grade: 'e6' })[0];
    expect(r1.why).toContain('나눗셈');
    expect(r1.why).toContain('분수');
    expect(TS.query(IDX, '원의 면적')[0].why).toContain('넓이');
    const typo = TS.query(IDX, '광합셩')[0];
    expect(typo.why).toContain('광합성');
  });

  test('결과 꼴: entry·score·why, 점수 내림차순, limit, 1위와 차이 큰 것은 뺀다', () => {
    const res = TS.query(IDX, '분수', { limit: 3 });
    expect(res.length).toBeGreaterThan(0);
    expect(res.length).toBeLessThanOrEqual(3);
    for (let i = 0; i < res.length; i++) {
      expect(typeof res[i].entry.id).toBe('string');
      expect(res[i].score).toBeGreaterThan(0);
      expect(Array.isArray(res[i].why)).toBe(true);
      if (i > 0) expect(res[i].score).toBeLessThanOrEqual(res[i - 1].score);
      expect(res[i].score).toBeGreaterThanOrEqual(res[0].score * 0.4);
    }
    expect(TS.query(IDX, '분수').length).toBeLessThanOrEqual(5);   // 기본 limit 5
  });

  test('예외 입력에도 던지지 않는다', () => {
    expect(TS.query(TS.build([]), '광합성')).toEqual([]);
    expect(TS.query(null, '광합성')).toEqual([]);
    expect(TS.query(IDX, null)).toEqual([]);
    expect(TS.query(IDX, undefined, undefined)).toEqual([]);
    const odd = TS.build([{ id: 'x', kind: 'term', title: '광합성' }, null, { id: 'y', title: '', keywords: '광합성' }]);
    expect(TS.query(odd, '광합성').length).toBeGreaterThan(0);
    expect(TS.build(null).N).toBe(0);
  });
});

test.describe('TutorSearch — 짧은 대화(intent)', () => {
  test('인사·감사·도움·작별을 알아본다', () => {
    const cases = {
      greeting: ['안녕', '안녕하세요', '하이', 'hi', 'Hello!', '선생님 안녕하세요~', '안녕하세요ㅎㅎ'],
      thanks: ['고마워', '감사합니다', '땡큐', 'Thank you!', '정말 고마워요', '고마워 선생님'],
      help: ['뭐 할 수 있어?', '어떻게 써?', '사용법', '도움말'],
      bye: ['잘가', '안녕히 계세요', 'bye', 'Bye~', '잘 가요'],
    };
    for (const [want, list] of Object.entries(cases)) {
      for (const q of list) expect(TS.intent(q), q).toBe(want);
    }
  });

  test('질문 속 인사말에는 속지 않는다', () => {
    for (const q of ['안녕하세요 광합성이 뭐예요?', '분수 나눗셈 어떻게 써?', '고마워 근데 약수는 뭐야',
      '광합성', '안녕이라는 말의 뜻', '', null, '어떻게 써야 하는지 수동태 알려줘']) {
      expect(TS.intent(q), String(q)).toBeNull();
    }
  });
});

/* ---------- 성능: 2만 항목 색인 1.5초, 질문 30ms 안 ---------- */
function makeBigIndex(n, seed0) {
  let seed = seed0;
  const rnd = () => {   // mulberry32 — 늘 같은 가상 자료
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const syl = '가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허고노도로모보소오조초코토포호구누두루무부수우주추쿠투푸후기니디리미비시이지치키티피히'.split('');
  const nouns = [];
  while (nouns.length < 3000) {
    const len = 2 + Math.floor(rnd() * 3);
    let w = '';
    for (let i = 0; i < len; i++) w += pick(syl);
    nouns.push(w);
  }
  const real = ['광합성', '분수', '나눗셈', '방정식', '함수', '민주주의', '임진왜란', '현재완료', '세포', '전류', '넓이', '기후'];
  const josa = ['', '은', '는', '이', '가', '을', '를', '의', '에서', '으로', '와', '과', '도'];
  const verbs = ['합니다', '입니다', '나타냅니다', '구합니다', '만듭니다', '살펴봅니다', '알아봅니다'];
  const kinds = ['concept', 'term', 'faq', 'unit', 'mistake'];
  const grades = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'm1', 'm2', 'm3', 'h1', 'h2', 'h3', 'u', 'a'];
  const out = [];
  for (let i = 0; i < n; i++) {
    const word = () => (rnd() < 0.06 ? pick(real) : pick(nouns));
    const title = [word(), word(), rnd() < 0.5 ? word() : ''].filter(Boolean).join('의 ');
    let text = '';
    while (text.length < 220) text += word() + pick(josa) + ' ' + (rnd() < 0.2 ? pick(verbs) + '. ' : '');
    const subject = pick(['kor', 'math', 'eng', 'soc', 'hist', 'sci']);
    const grade = pick(grades);
    out.push({ id: `${subject}-${grade}-${i}#c1`, kind: pick(kinds), subject, course: `${subject}-${grade}`,
      unit: `${subject}-${grade}-${i % 97}`, grade, title, text: text.slice(0, 300), keywords: [word(), word(), word()],
      ref: { tab: 'concepts', idx: 0 } });
  }
  return out;
}

test.describe('TutorSearch — 성능', () => {
  test('항목 2만 개: build 1.5초 이내, query 30ms 이내', () => {
    // 사용자 PC 에서 다른 일과 함께 돈다: 서로 다른 가상 자료 두 벌로 재어 빠른 쪽으로 판정한다(잠깐의 부하 흔들림을 거른다)
    const runs = [];
    let big = null;
    let index = null;
    for (const seed of [20261001, 777]) {
      big = makeBigIndex(20000, seed);
      const t0 = Date.now();
      index = TS.build(big);
      runs.push(Date.now() - t0);
      expect(index.N).toBe(20000);
    }
    const buildMs = Math.min(...runs);
    expect(buildMs, `build ${runs.join(' / ')}ms`).toBeLessThan(1500);

    const qs = ['광합성이 뭐야', '분수끼리 나누는 건 어떻게 해요?', '임진왜란은 왜 일어났어?', '현재완료가 뭐예요',
      '방정식 푸는 법 알려줘', '오늘 점심 뭐 먹지', '광합셩', '민주주의의 의미', '세포 분열 전류 기후 넓이', big[123].title];
    TS.query(index, qs[0]);   // 처음 한 번은 몸풀기
    const times = [];
    for (const q of qs) {
      const runs = [];
      for (let k = 0; k < 3; k++) {
        const s = process.hrtime.bigint();
        TS.query(index, q, { grade: 'm2' });
        runs.push(Number(process.hrtime.bigint() - s) / 1e6);
      }
      runs.sort((a, b) => a - b);
      times.push(runs[1]);   // 세 번 중 가운데 값 (잠깐의 GC 흔들림은 빼고)
      expect(runs[1], `"${q}" ${runs.map((x) => x.toFixed(1)).join('/')}ms`).toBeLessThan(30);
    }
    expect(TS.query(index, big[123].title).map((r) => r.entry.id)).toContain(big[123].id);
    console.log(`[search 성능] build ${runs.join(' / ')}ms, query 가운데 값 ${times.map((x) => x.toFixed(1)).join(', ')}ms`);
  });
});
