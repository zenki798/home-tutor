# 가정교사 — 설계 계약서 (ARCHITECTURE)

이 문서는 모듈끼리, 그리고 화면과 학습 내용 데이터가 서로 지키는 **계약**이다.
여러 사람(에이전트)이 동시에 다른 파일을 만들므로, 여기 적힌 이름·형식을 바꾸려면 이 문서부터 고친다.

## 0. 원칙

- **서버·AI·외부 요청 없음.** 정적 파일만. GitHub Pages 로 배포하고 `index.html` 더블클릭(file://)으로도 동작한다.
- **ES 모듈 금지.** 모든 JS 는 일반 `<script>` 로 싣고 전역 객체로 잇는다. 브라우저 밖(node 테스트)에서도 쓰도록
  엔진 모듈은 아래 UMD 꼴로 끝낸다. (`js/app.js` 는 화면 전용이라 예외)

```js
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorMath = mod;          // 모듈마다 이름이 다르다
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';
  /* ... */
  return { /* 공개 API */ };
});
```

- 엔진 모듈(mathlib, mathtext, figures, search, solver)은 **DOM 을 쓰지 않는 순수 함수**다. 문자열을 받아 문자열을 낸다.
  node 에서 `require('../../js/mathlib.js')` 로 바로 테스트한다.
- 모듈 간 의존: `mathtext`·`figures`·`search` 는 독립. `solver` 는 `TutorMath` 를 쓴다
  (브라우저: 전역 `TutorMath`, node: `require('./mathlib.js')`). 화면(`app.js`)이 모두를 쓴다.
- 문법은 ES2018 까지 (구형 태블릿 사파리 고려). 선택적 체이닝 `?.`·`??` 는 쓰지 않는다.
- 사용자에게 보이는 문구는 모두 한국어. 코드 주석도 한국어로 짧게.

`index.html` 이 싣는 순서 (모두 `defer` 없는 일반 스크립트, body 끝):

```
js/mathlib.js → js/mathtext.js → js/figures.js → js/search.js → js/solver.js → js/storage.js → js/impact.js → js/review.js → js/summary.js → js/speech.js → js/core.js → data/catalog.js → js/app.js
```

단원 내용(`data/units/<id>.js`)과 검색 색인(`data/index/<과목>-<학교급>.js`)은 필요할 때 `Tutor.loadScript` 로 싣는다.
화면은 색인을 `Tutor.loadIndex('<과목>-<학교급>')`(과정의 학교급, 없으면 학생의 학교급)으로 싣고, 실패하면 `Tutor.loadIndex('<과목>')` 으로 한 번 더 찾는다.
내 학교급 색인에서 답을 못 찾으면 가까운 학교급 색인에서 한 번 더 찾는다(초→중, 중→고·초, 고→대학·중, 대학→고·성인, 성인→고·중). 그 과목·학교급에 내용 있는 과정이 있을 때만 싣고, 답 앞에 "이건 중학교에서 배우는 내용이에요"처럼 어느 학교급 내용인지 밝힌다.

`index.html` 머리의 CSP(`<meta http-equiv="Content-Security-Policy">`)가 자기 파일(`'self' file:`)만 허용한다 — 인라인 스크립트·`onclick=` 같은
인라인 이벤트를 쓰지 않는다(이벤트는 코드로 단다). 스타일 속성(`style="width:…"`)은 `'unsafe-inline'` 으로 허용한다.

---

## 1. `js/core.js` — `window.Tutor`

```
Tutor.registerCatalog(catalog)        data/catalog.js 가 부른다
Tutor.catalog                         등록된 카탈로그 (없으면 null)
Tutor.registerUnit(unit)              data/units/<id>.js 가 부른다. Tutor.units[unit.id] = unit
Tutor.registerIndex(subject, entries) data/index/<subject>.js 가 부른다
Tutor.units                           { [unitId]: unit }   불러온 단원
Tutor.indexes                         { [subject]: entries[] }
Tutor.loadScript(src) → Promise       <script> 주입. 성공 resolve, 실패·15초 초과 reject. 같은 src 는 한 번만
Tutor.loadUnit(unitId) → Promise<unit>      이미 있으면 바로. 없으면 data/units/<unitId>.js
Tutor.loadIndex(subject) → Promise<entries> data/index/<subject>.js
Tutor.level(id) / Tutor.subject(id) / Tutor.course(id)   카탈로그에서 찾기 (없으면 null)
Tutor.unitMeta(unitId) → { course, unit(stub), index }   카탈로그의 단원 요약
Tutor.coursesFor(gradeId, subjectId?) → course[]          그 학년이 보는 과정
Tutor.store.get(key, fallback) / set(key, value) / remove(key) / keys(prefix?)
            ready() → Promise / flush() → Promise / removePrefix(prefix)
                                      브라우저: js/storage.js 가 먼저 실렸으면 TutorStorage.createStore() (IndexedDB → localStorage → 메모리, §9).
                                      화면은 ready() 뒤에 처음 그린다.
                                      그 밖(node 시험 등): localStorage JSON, 키 앞에 'tutor.'. ready() 는 바로 끝난다.
                                      막혀 있으면 메모리에만 두고 조용히 계속한다 (예외를 밖으로 던지지 않는다)
```

## 2. `js/mathlib.js` — `TutorMath`

### 2.1 분수 `Frac` (정확한 유리수)

```
TutorMath.F(n, d = 1) → Frac           n, d: 정수(number). d=0 이면 throw
TutorMath.Frac.from(x) → Frac           x: 정수·유한소수(number) | 문자열('3/4','-1 2/3','0.25','2','1,000') | Frac
f.num, f.den                            항상 기약, den > 0
f.add(g) f.sub(g) f.mul(g) f.div(g)     g 는 Frac|number|string (from 으로 변환)
f.neg() f.inv() f.abs() f.pow(k)        k: 정수
f.cmp(g) → -1|0|1   f.eq(g) → bool   f.sign()   f.isInt()   f.isZero()
f.valueOf() → number                    f.toString() → '3/4' | '-2'
f.toTex({ mixed }) → '\frac{3}{4}' | '-\frac{3}{4}' | '2' | (mixed) '1\frac{1}{2}'
f.toMixed() → { sign, whole, num, den }
f.toDecimal(maxDigits = 12) → '0.75' | null (무한소수면 null)
```

정수 범위는 `Number.MAX_SAFE_INTEGER` 안에서만 쓴다(넘으면 throw). 문제 생성기는 작은 수만 쓴다.

### 2.2 정수 도구

```
gcd(a, b)  lcm(a, b)  isPrime(n)  primeFactors(n) → [[p, e], ...]  divisors(n) → [1, ..., n]
```

### 2.3 난수와 문제 생성 도구 `R`

```
TutorMath.rng(seed) → () => [0,1)              mulberry32. 같은 seed → 같은 수열
TutorMath.toolkit(seed) → R
  R.seed
  R.random()                  [0,1)
  R.int(a, b)                 a 이상 b 이하 정수
  R.nonzero(a, b)             0 이 아닌 정수
  R.pick(arr)  R.shuffle(arr) (사본)  R.sample(arr, n) (서로 다른 n개)  R.bool(p = 0.5)  R.sign()
  R.F(n, d)                   = TutorMath.F
  R.distinct(n, make, tries = 200)        make() 로 서로 다른 값 n 개 (String 기준). 못 만들면 throw
  R.choices(correct, wrongs, n = 4)       → { choices, answer }  정답 1 + 서로 다른 오답 (n-1)개를 섞는다.
                                          문자열 기준 중복·정답과 같은 오답 제거. 오답이 모자라면 throw
  R.fmt.num(n)                1234567 → '1,234,567' (정수만 콤마; 소수는 그대로)
  R.fmt.dec(x, digits)        부동소수 오차 없이 소수 표기 ('0.1+0.2' 같은 오차 제거)
  R.fmt.frac(f, { mixed })    Frac → TeX
  R.fmt.signed(n)             3 → '+3', -3 → '-3' (TeX 에서 그대로 쓸 수 있게)
  R.fmt.paren(n)              음수면 '(-3)', 아니면 '3'  (대입 식을 쓸 때)
  R.fmt.poly(coeffs, v = 'x') 내림차순 계수 → TeX.  [2,-3,1] → '2x^{2}-3x+1', [1,0,-4] → 'x^{2}-4', [0,0,0] → '0'
                              계수는 number 또는 Frac. 1·-1 계수는 생략, 0 항은 생략
  R.fmt.term(c, v, first)     한 항 → TeX (poly 가 쓴다)
  R.josa(x, pair)             조사 고르기. x: 수(읽는 소리의 끝) | 한글 낱말(마지막 글자 받침) | 영어 낱말·단위(대표 읽기)
                              pair: '은/는' '이/가' '을/를' '과/와' '으로/로' '이에요/예요' '이라고/라고' '이다/다' (앞=받침 있을 때)
                              '으로/로' 는 ㄹ 받침이면 '로'. 예: R.josa(9, '은/는') → '는', R.josa(6, '이/가') → '이', R.josa(7, '으로/로') → '로'
TutorMath.josa(x, pair)       R.josa 와 같다 (화면 문구에도 쓴다)
```

### 2.4 식 계산

```
TutorMath.parseExpr(str) → AST         지원: 정수·소수·분수 a/b, 변수(한 글자 a~z, 단 e·i 도 변수로 본다),
                                       + - * / ^ × ÷ · ( ) [ ] { }, 암묵적 곱(2x, 3(x+1), (x+1)(x-1), xy),
                                       ² ³, √ 또는 sqrt(…), π 또는 pi, 단항 마이너스. 못 읽으면 throw
TutorMath.evalExpr(astOrStr, vars = {}) → number
TutorMath.exprEqual(a, b, { vars }) → bool   두 식이 같은 식인지: 변수에 무작위 값 8번 대입해 비교(상대오차 1e-9)
TutorMath.exactValue(str) → Frac|null        변수 없이 + - × ÷ 거듭제곱(정수 지수)·괄호만 있으면 정확한 분수로
```

### 2.5 채점

```
TutorMath.normText(s) → string     비교용: NFKC, 앞뒤·중간 공백 제거, 소문자, 끝의 마침표·물음표 제거,
                                   '−'·'–'→'-', '×'→'*', '÷'→'/', '²'→'^2', '³'→'^3', 따옴표 통일
TutorMath.parseNumberAnswer(s) → Frac|null
                                   '3/4' '-0.25' '1 2/3' '1과 2/3' '4분의 3'(=3/4) '1,000' '+5' '½' 을 읽는다
                                   과학 표기도: '1.2×10^-3' '1.2×10⁻³' '3*10^8' '1.0\times10^{3}' '1.2e-3' '10^4' (지수 ±15 까지 — 정확한 분수로).
                                   수 바로 뒤의 위첨자는 거듭제곱으로 읽는다('10³' = 1000 — 예전에는 103).
                                   우리말 큰 수도: '15만' '1억 2천만' '2만 5천' '1.5만' '3천' '천만'(만·억·조 묶음 안에서 천·백·십). '만' 하나·'만3' 은 읽지 않는다 (2026-10-09)
TutorMath.checkAnswer(problem, input) → { correct: bool, empty: bool }
   problem.type === 'choice'  input: 고른 보기의 원래 번호(number)  → input === problem.answer
   problem.type === 'ox'      input: true|false                    → input === problem.answer
   problem.type === 'order'   input: 원래 번호 배열                 → 배열이 problem.answer 와 같음
   problem.type === 'short'   input: 문자열. problem.check 로 채점 (없으면 'text')
       'text'   normText(input) 이 정답(들) 중 하나의 normText 와 같다
       'number' 단위(problem.unit)·공백을 떼고 parseNumberAnswer 로 읽어 정답(들) 중 하나와 값이 같다
                단위는 글자 사이 공백과 상관없이 끝에서 뗀다('80만원' = '80만 원'). 여러 낱말 단위는 앞 낱말만 써도 된다('7번째'·'80만'·'16π' —
                뒤 낱말만은 아니다: '80원' ≠ 80만 원). 도 ↔ ° ↔ °C·℃·°F, %p ↔ 퍼센트포인트·포인트(%p 를 % 로 쓰면 틀림).
                문제 글에 ± 가 있으면 앞에 붙여 쓴 ± 는 뗀다. 답을 문장처럼 써도 수만 본다: 앞 '답은·정답:·답'·'약·대략', 끝 '쯤·정도'·'입니다·이에요·예요·요'
                ('답은 80만 원입니다' = 80) (2026-10-09)
                단위가 '× 10⁸ m/s' 처럼 10의 거듭제곱으로 시작하면 그 부분만 써도('3×10^8') 떼고, 배수까지 쓴 값('300000000')도 정답 값 × 10⁸ 과 견준다
       'expr'   exprEqual(input, 정답)  (정답이 여러 개면 하나라도)
       'set'    input 을 ',' '또는' 'or' '와' '과' 공백으로 나눠 수의 모음으로 읽고, 정답 모음과 (순서 무관) 같다
                문제에 unit 이 있으면 원소마다 수 바로 뒤에 붙여 쓴 단위를 뗀다('3 N, 11 N' → 3, 11 · '38.9%, 45.1%') — 단위 뒤에 글자·숫자가 이어지면 다른 단위라 그대로('3 nm')
   빈 입력은 { correct: false, empty: true }
TutorMath.readable(problem, input) → bool   그 채점 방식(number·set·expr)으로 읽을 수 있는 답인가 — 값은 따지지 않는다.
                                   글 답·보기 문제·빈 답·판단할 수 없을 때는 true. 화면이 채점 전에 '다시 써 주세요' 안내에 쓴다(2026-10-09)
TutorMath.answerText(problem) → string     화면에 보일 정답 문구 (choice 면 보기 내용, ox 면 'O'/'X', short 면 첫 정답)
```

---

## 3. `js/mathtext.js` — `TutorText`

학습 내용의 모든 글(`body`, `q`, `explain`, 보기, 풀이 단계 …)은 **"서식 글"** 이다: 마크다운 일부 + `$TeX$` 수식.

```
TutorText.render(src) → HTML        블록 서식까지 (문단·목록·표·상자)
TutorText.inline(src) → HTML        한 줄 서식만 (보기·버튼 안 글자) — 블록 문법은 글자 그대로
TutorText.tex(texSrc) → HTML        수식 하나
TutorText.plain(src) → string       검색·aria-label 용 평문. \frac{3}{4} → 3/4, x^{2} → x², \sqrt{2} → √2
TutorText.check(src) → string[]     문제점 목록 (닫히지 않은 $, 모르는 명령, 중괄호 짝, 표 칸 수 불일치, 깨진 글자 U+FFFD …). 정상이면 []
```

**안전:** 입력의 모든 글자를 HTML 이스케이프한다. 입력에 HTML 태그를 쓰면 글자 그대로 보인다(태그로 해석하지 않는다).

### 3.1 블록 문법

| 쓰는 법 | 결과 |
|---|---|
| 빈 줄 | 문단 나눔. 문단 안의 줄바꿈은 `<br>` |
| `- 항목` / `* 항목` | 점 목록 |
| `1. 항목` | 번호 목록 |
| `> 글` | 강조 상자 (팁·주의). `> 💡`, `> ⚠️` 처럼 이모지로 시작해도 된다 |
| `### 제목` | 소제목 (h4 로 낸다) |
| `\| 가 \| 나 \|` 줄들 | 표. 둘째 줄이 `\|---\|---\|` 면 첫 줄이 머리행 |

### 3.2 한 줄 문법

`**굵게**`, `__밑줄__`(국어: 밑줄 친 부분), `$수식$`, `\$`(달러 글자), `[[빈칸]]` → 빈칸 상자(괄호 대신, 내용은 보이지 않고 칸 길이만), `[[?]]` → 물음표 칸.

### 3.3 TeX 부분집합 (`$...$` 안)

- 글자: 숫자, 영문자(변수는 기울임), 한글(그대로), `+ - = < > ( ) [ ] , . : ; ! ' |`
- 위·아래 첨자: `x^2`, `x^{10}`, `a_1`, `a_{n+1}`, `x_1^2`
- 분수: `\frac{a}{b}`, `\dfrac{a}{b}` (같게 처리), 대분수는 `2\frac{1}{3}`
- 근호: `\sqrt{2}`, `\sqrt[3]{8}`
- 연산·관계: `\times \div \pm \mp \cdot \le \ge \leq \geq \ne \neq \approx \equiv \sim \simeq \cong \propto \lt \gt`
- 그리스 문자: `\alpha \beta \gamma \delta \theta \lambda \mu \pi \sigma \phi \omega \Delta \Sigma \Omega`
- 기호: `\infty \angle \triangle \square \% \cdots \ldots \therefore \because \perp \parallel \prime`
- 도(°): `90^\circ` 또는 `\degree` 또는 글자 `°` — 맨 `\circ` 는 합성함수 기호(∘)로 그린다
- 집합·논리: `\in \notin \subset \subseteq \supset \cup \cap \emptyset \varnothing \forall \exists \neg \land \lor`
  `\{ \}`, `\setminus`
- 화살표: `\to \rightarrow \leftarrow \Rightarrow \Leftarrow \Leftrightarrow \leftrightarrow \iff \implies`
- 함수 이름(곧은 글씨): `\sin \cos \tan \log \ln \lim \max \min \exp \det`
- 큰 연산자: `\sum_{k=1}^{n}`, `\int_{a}^{b}`, `\lim_{x \to 0}` (아래·위에 붙임), `\prod`
- 꾸밈: `\overline{AB}`(선분), `\overrightarrow{AB}`, `\vec{a}`, `\hat{p}`, `\bar{x}`, `\widehat{AB}`(호)
- 글자: `\text{원}`, `\mathrm{cm}`, `\mathbf{v}` — `\mathrm{…}` 안에 첨자·명령이 있으면(`\mathrm{m/s^2}`·`\mathrm{kg\cdot m/s^2}`·`\mathrm{CO_2}`·`\mathrm{k\Omega}`) 그 안을 수식으로 읽고 글자만 곧게 그린다(2026-10-09 — 예전에는 "m/s^2" 로 글자째 보였다). 첨자·명령이 없으면 예전처럼 글자 그대로. `\mathrm{A'B}` 처럼 수식 안의 `'` 는 프라임(A′B — 기하의 점), `\text{…}` 안의 `'` 는 작은따옴표 그대로
- 순열·조합: `{}_{n}\mathrm{P}_{r}`, `{}_{n}\mathrm{C}_{r}`, `\binom{n}{r}`
- 괄호 크기: `\left( \right)`, `\left[ \right]`, `\left\{ \right\}`, `\left| \right|`, `\left. \right.` (크기만 맞춤)
- 공백: `\,` `\;` `\quad` `\ `
- 환경: `\begin{cases} … \\ … \end{cases}` (연립방정식·구간별 함수),
  `\begin{pmatrix} a & b \\ c & d \end{pmatrix}`, `bmatrix`, `vmatrix`(행렬식)

이 밖의 명령은 `check` 가 오류로 알린다. 학습 내용 검사가 모든 서식 글을 `check` 한다.

---

## 4. `js/figures.js` — `TutorFig`

```
TutorFig.render(spec) → '<svg …>'    viewBox 있음, role="img", aria-label(spec.alt 또는 자동 설명), 선·글자는 currentColor
TutorFig.check(spec) → string[]      형식 오류 목록. 정상이면 []
TutorFig.textWidth(글자, 크기) → px   글자 폭 어림 — 시험·점검 도구가 이름표 겹침을 엔진과 같은 어림으로 잴 때
```

학습 내용의 `fig` 칸에 아래 중 하나를 넣는다. 모든 그림은 `alt`(그림 설명, 선택)를 받는다.

| type | 칸 | 그림 |
|---|---|---|
| `clock` | `h`(0~23), `m`(0~59), `showNumbers`(기본 true) | 아날로그 시계 |
| `numberline` | `min`, `max`, `step`(눈금), `labelEvery`(기본 1칸마다), `points: [{x, label?, open?}]`, `ranges: [{from, to, fromOpen?, toOpen?}]`(부등식 범위, from/to 에 `-Infinity`/`Infinity` 허용) , `arrows: [{from, to, label?}]`(덧셈 뛰어 세기) | 수직선 |
| `fraction` | `shape`: `'bar'`\|`'circle'`, `n`(색칠 수), `d`(전체 칸 수), `whole`(여러 개일 때 묶음 수, 기본 1) | 분수 모형 |
| `coord` | `xmin xmax ymin ymax`(기본 -5~5), `grid`(기본 true), `points: [{x, y, label?}]`, `fns: [{expr: '2x+1', from?, to?, label?}]`, `segments: [{from:[x,y], to:[x,y], dashed?}]` | 좌표평면·그래프 |
| `polygon` | `points: [[x,y],…]`(임의 단위, 자동 맞춤), `labels`(꼭짓점 이름), `sides`(변 옆 글: 문자열 또는 null), `angles: [{at: i, label, right?}]`, `segments: [{from, to, dashed?, label?, right?}]`(높이·대각선 같은 보조선 — 이름은 변·다른 보조선·직각 표시·먼저 놓은 이름과 가장 덜 겹치는 자리로: 가운데부터 양 끝 쪽, 오른쪽(위) 먼저, 2026-10-09), `fill?` | 다각형 |
| `circle` | `r`(글: 반지름 표시), `showCenter`, `showRadius`, `showDiameter`, `label` | 원 |
| `angle` | `deg`(0~360), `label?`, `showArc`(기본 true) | 각 |
| `bars` | `labels`, `values`, `unit?`, `title?`, `horizontal?` | 막대그래프 |
| `line` | `labels`, `values`, `unit?`, `title?` | 꺾은선그래프 |
| `pie` | `labels`, `values`, `title?` | 원그래프 |
| `blocks` | `hundreds`, `tens`, `ones` | 수 모형(백·십·일 모형) |
| `cuboid` | `w`, `h`, `d`, `labels: {w, h, d}` | 직육면체 겨냥도 |
| `svg` | `svg`: `<svg viewBox=…>…</svg>` 문자열 | 직접 그린 그림 (아래 제한) |

`svg` 직접 그림 제한: `<svg` 로 시작, `viewBox` 필수, `<script>`·`on…=` 속성·`href`/`xlink:href` 외부 주소·`<foreignObject>`·`<image>` 금지,
크기 20KB 이하. 색은 `currentColor` 또는 `var(--fig-1)`~`var(--fig-4)` (밝은/어두운 화면에서 자동).

---

## 5. `js/search.js` — `TutorSearch` (질문 답변의 "찾기")

```
TutorSearch.normalize(s) → string          NFKC·소문자·문장부호 제거
TutorSearch.tokenize(s) → string[]         낱말로 나누고 조사·어미를 뗀다 (은/는/이/가/을/를/의/에/에서/로/으로/와/과/도/만/이란/란/
                                           이에요/예요/인가요/인지/하는/하면/해요/뭐야/뭐예요 …), 묻는 말(무엇, 어떻게, 왜, 알려줘 …)은 버린다
TutorSearch.build(entries) → index         entries: 아래 색인 항목 배열
TutorSearch.query(index, q, opts) → [{ entry, score, why }]
     opts: { grade, course, unit, subject, limit = 5 }
     점수: 낱말 일치(제목·용어·키워드 가중) + 두 글자 조각(바이그램) 유사도 + 같은 학년/과정/단원 가산
     유의어: 더하기↔덧셈, 빼기↔뺄셈, 곱하기↔곱셈, 나누기↔나눗셈, 넓이↔면적, 동사↔verb … (search.js 안의 작은 사전)
TutorSearch.intent(q) → 'greeting' | 'thanks' | 'help' | 'bye' | null   인사·감사 같은 짧은 대화
```

색인 항목(entries) — `scripts/build-index.js` 가 단원 파일들에서 만든다:

```
{ id: 'math-m2-03#c2', kind: 'concept'|'term'|'faq'|'unit'|'mistake',
  subject: 'math', course: 'math-m2', unit: 'math-m2-03', grade: 'm2',
  title: '부등식의 성질', text: '평문 요약 (최대 300자)', keywords: ['부등식', …],
  ref: { tab: 'concepts', idx: 1 } }
```

## 6. `js/solver.js` — `TutorSolver` (질문 답변의 "풀기")

```
TutorSolver.solve(text, { grade }) → null | { kind, title, steps: [서식 글…], answer: 서식 글 }
TutorSolver.detect(text) → kind | null       풀 수 있는 꼴인지만 판단
```

풀 수 없거나 확신이 없으면 **null** 을 낸다(엉뚱한 답보다 "모르겠어요"가 낫다).
풀이 단계는 학년에 맞는 말로: 초등(grade e*)에게는 '이항' 대신 '양쪽에서 같은 수를 빼요' 같은 말.

| kind | 예 |
|---|---|
| `arith` | `3/4 ÷ 2/5`, `1과 1/2 + 2/3`, `2.5×4-1`, `(3+4)×2`, `2^10`, `√16`, `-3-(-5)` — 계산 순서(괄호→곱셈·나눗셈→덧셈·뺄셈), 통분·약분을 단계로 |
| `linear` | `2x+3=7`, `3(x-1)=2x+5`, `x/2+1=4` |
| `quad` | `x^2-5x+6=0`, `2x²=8`, `x^2+2x-1=0`(근의 공식) |
| `system` | `x+y=5, x-y=1` / `2x+3y=12 그리고 x-y=1` (가감법) |
| `ineq` | `2x+1>5`, `-3x≤9` (음수로 나누면 방향 바뀜을 설명) |
| `gcd` / `lcm` | `12와 18의 최대공약수`, `4, 6, 10의 최소공배수` |
| `factor` | `360을 소인수분해` |
| `simplify` | `12/18 약분`, `24/36을 기약분수로` |
| `percent` | `200의 15%`, `30은 120의 몇 %`, `0.35를 백분율로` |
| `unit` | `3.5km는 몇 m`, `2시간 15분은 몇 분`, `1.2L는 몇 mL`, `3kg 200g은 몇 g` |
| `expand` | `(x+2)(x-3) 전개`, `(2x-1)^2` |
| `deriv` | `x^3-2x+1 미분` (다항함수) |
| `integ` | `3x^2+2x 적분`, `0부터 2까지 x^2 적분` (다항함수) |

---

## 7. 데이터 형식

### 7.1 카탈로그 `data/catalog.js`

```js
Tutor.registerCatalog({
  version: 1,
  curriculum: '2022 개정 교육과정',
  levels: [
    { id: 'elem', name: '초등학교', short: '초등', grades: [{ id: 'e1', name: '1학년' }, … { id: 'e6', name: '6학년' }] },
    { id: 'mid',  name: '중학교',   short: '중등', grades: [{ id: 'm1', name: '1학년' }, …] },
    { id: 'high', name: '고등학교', short: '고등', grades: [{ id: 'h1', name: '1학년' }, { id: 'h2', name: '2학년' }, { id: 'h3', name: '3학년' }] },
    { id: 'univ', name: '대학교',   short: '대학', grades: [{ id: 'u', name: '교양·기초' }] },
    { id: 'adult',name: '성인',     short: '성인', grades: [{ id: 'a', name: '성인' }] },
  ],
  subjects: [
    { id: 'kor',  name: '국어', teacher: '국어 선생님', icon: '📖' },
    { id: 'math', name: '수학', teacher: '수학 선생님', icon: '📐' },
    { id: 'eng',  name: '영어', teacher: '영어 선생님', icon: '🔤' },
    { id: 'soc',  name: '사회', teacher: '사회 선생님', icon: '🌏' },
    { id: 'hist', name: '역사', teacher: '역사 선생님', icon: '🏛️' },
    { id: 'sci',  name: '과학', teacher: '과학 선생님', icon: '🔬' },
    { id: 'life', name: '통합교과', teacher: '통합교과 선생님', icon: '🌱' },
  ],
  courses: [
    { id: 'math-m2', subject: 'math', level: 'mid', grades: ['m2'], title: '중학교 수학 2',
      note: '2022 개정 교육과정 · 중학교 1~3학년군', 
      units: [ { id: 'math-m2-01', title: '유리수와 순환소수', summary: '…', sem: 1 }, … ] },
    …
  ],
});
```

- 과정 id: `<과목>-<학년 또는 이름>` (예: `math-e3`, `kor-h-lit`, `math-u-linalg`). 단원 id: `<과정id>-<두 자리 번호>`.
- 단원 순서 = 배우는 순서. `sem`(1·2 학기)은 초·중에서 아는 경우만.

### 7.2 단원 `data/units/<unitId>.js`

```js
Tutor.registerUnit({
  id: 'math-m2-03',            // 파일 이름·카탈로그의 단원 id 와 같다
  course: 'math-m2',
  title: '일차부등식',
  summary: '…',                // 한두 문장
  goals: ['…', '…'],           // 학습 목표 2~4개 ("~할 수 있다")
  standards: ['[9수02-07]'],   // 2022 개정 성취기준 코드. 확실할 때만, 모르면 []
  concepts: [ { title, body, easy?, fig?, check? } ], // 개념 카드 3~6장. check = 이해 확인 문제 1개 (§7.4)
  examples: [ { q, fig?, steps: ['…'], answer } ],    // 예제 1~3개 (풀이 단계)
  terms:    [ { term, def } ],                        // 핵심 용어 3~10개
  practice: [ 문제… ],                                // 기본·실력 (level 1·2) 8~12개
  advanced: [ 문제… ],                                // 심화 (level 3) 3~6개
  deeper:   [ { title, body } ],                      // 심화 학습 읽을거리 1~2개
  faq:      [ { q, a } ],                             // 학생이 물을 법한 질문 2~4개
  mistakes: ['…'],                                    // 자주 하는 실수 1~3개
  gens:     [ { id, level, title, make: function (R) { … return 문제 } } ],   // 문제 생성기 (수학 필수, 그 밖은 선택)
  vocab:    [ { w, m, ex?, exm? } ],                  // 영어 단원: 낱말·뜻·예문·예문 뜻 (8~20개)
});
```

### 7.3 문제

```js
{
  id: 'p1',                 // 단원 안에서 고유 (practice·advanced 를 통틀어). 생성기 문제는 자동
  level: 1,                 // 1 기본, 2 실력, 3 심화
  type: 'choice',           // 'choice' | 'short' | 'ox' | 'order'
  q: '문제 (서식 글)',
  fig: { … },               // 선택: 그림
  choices: ['…', '…', '…', '…'],   // choice: 3~5개.  order: 줄 세울 항목들 (보여 줄 때 섞는다)
  answer: 2,                // choice: 정답 보기 번호(0부터) | ox: true/false | order: 올바른 순서의 번호 배열 | short: '정답' 또는 ['정답','다른 허용 답']
  fixed: false,             // choice: true 면 보기를 섞지 않는다 ('모두 고르기'·크기 순 보기 등)
  check: 'number',          // short 채점: 'text'(기본) | 'number' | 'expr' | 'set'
  unit: 'cm',               // short: 답 칸 옆에 보일 단위 (채점 때 학생이 단위를 써도 된다)
  hint: '…',                // 선택: 힌트
  explain: '…',             // 필수: 해설 (정답만이 아니라 왜 그런지)
  concept: 1,               // 선택(권장): 이 문제가 연습하는 개념 카드 번호(0부터) — 틀리면 그 카드로 "추가 설명"
  why: ['', '분모끼리도 더했어요.', …],   // choice 선택(권장): 보기마다 "이 보기를 고르면 왜 틀렸는지" (정답 칸은 '')
  wrong: [ { a: '3/10', why: '분모끼리도 더했어요. 분모는 그대로 두어요.' } ],
                            // short 선택(권장): 자주 나오는 틀린 답과 진단. a 는 정답 칸과 같은 꼴(문자열·배열), 채점 방식(check)으로 비교
}
```

생성기 `make(R)` 는 `id`·`level` 없이 위 문제 객체를 돌려준다. 같은 `R.seed` 면 같은 문제여야 한다(`Math.random` 금지).
생성기 문제도 `why`·`wrong`·`concept` 를 넣을 수 있다(오답 보기를 실수 유형에서 만들므로 이유를 붙이기 쉽다).

### 7.4 가정교사 흐름에 쓰는 칸

화면은 **개념 설명 → 이해 확인 → 문제 풀이 → 오답 분석 → 추가 설명** 순서로 가르친다.

| 단계 | 쓰는 칸 | 화면 동작 |
|---|---|---|
| 개념 설명 | `concepts[].body`, `easy`, `fig` | 학생 수준이 '기초'면 `easy` 를 먼저 보여 준다 |
| 이해 확인 | `concepts[].check` (문제 객체, `level` 없음, choice·ox·short) | 카드를 읽고 바로 푼다. 틀리면 `why`/`explain` + `easy` 로 다시 설명하고 한 번 더 |
| 문제 풀이 | `practice`, `advanced`, `gens` | 학생 수준·연속 정답/오답에 따라 난이도를 올리고 내린다 |
| 오답 분석 | `why`(choice), `wrong`(short), `explain` | "왜 틀렸을까"를 학생이 고른 보기·쓴 답에 맞춰 보여 준다 |
| 추가 설명 | `concept` → 그 카드의 `easy`·`body`·`fig` | "이 개념을 다시 볼까요?" + 비슷한 문제(같은 생성기 새 seed, 또는 같은 `concept` 의 다른 문제) |

`check` 는 모든 개념 카드에 넣는 것이 원칙(검사기: 없으면 경고). `check.answer` 의 형식은 §7.3 과 같다.

---

## 8. 화면 (`index.html`, `css/app.css`, `js/app.js`)

주소 뒤 `#` 로 화면을 나눈다(file:// 에서도 뒤로 가기가 된다).

| 주소 | 화면 |
|---|---|
| `#/` | 처음: 학생(프로필) 고르기 → 없으면 학교급·학년 고르기 |
| `#/setup` | 학교급 → 학년 고르기 |
| `#/home` | 그 학년의 과목들 (선생님 카드) |
| `#/course/<courseId>` | 과정: 선생님 인사 + 단원 목록(진도) + [이어서 공부] [예상문제] [질문하기] |
| `#/unit/<unitId>/<tab>` | 단원: 탭 `learn`(개념) · `examples`(예제) · `practice`(문제) · `advanced`(심화) · `ask`(질문) |
| `#/quiz/<unitId 또는 courseId>` | 예상문제 풀이 (한 문제씩, 바로 채점·해설, 끝나면 점수) |
| `#/ask/<subject>` | 과목 선생님에게 질문 (대화창) |
| `#/notes` | 오답노트 (위에 오늘 복습할 문제 수·다음 복습 날, 문제마다 다음 복습 날) |
| `#/review` | 오늘의 복습 — 다음 복습 날이 된 오답을 한 번에 10문제까지 (§10) |
| `#/stats` | 학습 기록 (아래에 "보호자용 학습 요약" 링크) |
| `#/summary` | 보호자용 학습 요약 — 지금 학생의 최근 7일·30일, 인쇄·글로 복사 (§12) |
| `#/settings` | 글자 크기·화면 테마·학생 관리·기록 지우기 |

`<html data-state="loading|ready|error">` — 첫 화면이 다 그려지면 `ready`. 테스트가 이것을 기다린다.
화면 상태를 테스트가 읽을 수 있게 `window.TutorApp`(현재 주소·프로필 등)을 둔다.

### 저장 (`Tutor.store`, 이 기기에만 — 키 전체 목록과 백업·PIN 은 §9)

화면 동작 요약: 문제를 채점할 때마다 `p.<id>.attempts`·`p.<id>.stats` 를 남기고(개념 카드의 이해 확인은 `level: 0`, `pid: 'check-<카드 번호>'`),
오답노트 항목에 그때 보여 준 진단 글(`cause`, 글자만)과 `concept` 을 둔다. 질문 대화는 `p.<id>.chat` 에 과목마다 최근 30개를 **글자만** 저장한다
(`{ 과목: [{ who: 'me'|'t', text, t, u?(단원 질문 탭이면 단원 id) }] }` — 서식(HTML)은 저장하지 않고, 다시 열면 글자로 보여 준다).
설정 → "학습 기록 옮기기"(백업)·"PIN 잠금"·"이 기기에서 모든 기록 지우기". 카탈로그의 `soon: true` 단원은 "준비 중"으로 보이고 열리지 않는다.
PIN 이 걸린 학생은 이번에 PIN 을 맞혀야(메모리에만 기억, 다른 학생으로 바꾸거나 다시 열면 또 묻는다) 그 학생의 화면·기록을 보여 준다.

```
tutor.profiles   [{ id, name, avatar, level, grade, pace, created }]
                 name 은 별명(선택), avatar 는 동물 이모지, pace 는 공부 수준 'easy'(기초 다지기)|'normal'(보통)|'hard'(도전). 기기 밖으로 나가지 않는다
tutor.current    프로필 id
tutor.p.<id>.progress   { [unitId]: { seen: [개념 번호…], solved, correct, best, last } }
tutor.p.<id>.notes      [{ key, unit, problem(사본), given, at, wrongCount, rightStreak }]   오답노트
tutor.p.<id>.recent     최근 연 단원 id 목록
tutor.settings   { fontScale, theme }
```

---

## 9. 학습 데이터 저장 계층 (`js/storage.js` — `TutorStorage`) · 학생 정보 보호

**원칙 (사용자 지시 2026-10-02):** V1 은 서버 계정·클라우드 DB 없이 **학생의 학습 정보를 쓰는 기기에만** 저장한다.
학생의 개인정보·학습정보는 **절대 다른 사람이 볼 수 없어야 한다.** 실제 학생 데이터는 GitHub 저장소에 들어가지 않는다.

### 9.1 계층

```
화면(app.js) · 가정교사 엔진  ──  Tutor.store (동기: get / set / remove / keys)   ← 예전과 같은 API
                                      │ 메모리 캐시 + 모아서 쓰기(40ms)
                                      ▼
                          TutorStorage.createStore({ providers })
                                      │ Provider 약속(비동기): open · loadAll · write(changes, 원자적) · clearAll
                ┌─────────────────────┼──────────────────────┐
         IndexedDBProvider     LocalStorageProvider     MemoryProvider      (+ 앞으로: 클라우드 동기화 Provider)
         (기본, DB home-tutor)   (IndexedDB 가 막히면)    (둘 다 막히면 — 이번 화면에서만)
```

- `Tutor.store.ready()` 로 처음 한 번 전부 메모리에 올린다. **화면은 ready 뒤에 그린다.**
- 예전 localStorage `tutor.*` 값은 처음 IndexedDB 를 쓸 때 옮기고 지운다.
- 글자 크기·테마(`settings`)만 localStorage 에 사본을 둬서 화면을 그리기 전에 동기로 적용한다. **학습 기록은 사본을 두지 않는다.**
- 여러 탭: `BroadcastChannel('home-tutor-store')` 로 다른 탭에 바뀐 키를 알린다.
- **클라우드 동기화를 붙일 때**: 화면·엔진은 그대로 두고, 같은 약속을 지키는 Provider(예: 로컬 Provider 를 감싸 원격과 맞추는 SyncProvider)를 `providers` 에 넣는다.
  인증은 그 서비스의 공식 OAuth 로만 하고, 키·토큰을 프론트엔드에 두지 않는다(AGENTS.md 규칙 6).

### 9.2 키 (학생 프로필별로 완전히 분리)

| 키 | 내용 |
|---|---|
| `profiles` | `[{ id, name(별명·선택), avatar, level, grade, pace, created, gradeAt?, gradeAsk?, lock? }]` — `lock` 은 PIN 해시(§9.4), `gradeAt`·`gradeAsk` 는 새 학년 안내(§14) |
| `current` | 지금 학생 id |
| `settings` | `{ fontScale, theme, installHint }` (기기 공통) |
| `p.<id>.progress` | 단원별 진도 `{ [unitId]: { seen[], checked[], cards, solved, correct, best, last } }` |
| `p.<id>.notes` | 오답노트 `[{ key, unit, problem(사본), given, cause(오답 원인), concept, at, wrongCount, rightStreak, due(다음 복습 날 'YYYY-MM-DD', §10) }]` |
| `p.<id>.attempts` | 최근 풀이 기록(최대 2000개) `[{ t, unit, pid|gen, level, ok, cause?, c? }]` — `c` 는 그 문제가 묶인 개념 카드 번호(문제의 `concept`, 이해 확인은 그 카드, 2026-10-08부터) |
| `p.<id>.stats` | 학습 통계(날짜별 푼 수·맞힌 수, 과목별 합계) |
| `p.<id>.recent` · `p.<id>.days` | 최근 단원, 공부한 날 |
| `p.<id>.chat` | 최근 질문 대화(과목별 최대 30개) — 학습 연속성에 필요한 만큼만 |
| `p.<id>.prefs` | 그 학생의 학습 선택 — `tts`('on'\|'off', 없으면 자동: 초등 1~3학년만 켬)·`ttsRate`('normal', 없으면 천천히) (§13) |
| `p.<id>.quiz` | 풀다 만 예상문제 하나 `{ v, key(주소), at, title, i, total, retry, items[{ p(사본), unit, src, gen, key, extra }], answers[{ correct, given }], ad(맞춤 난이도 상태) }` — 다 풀면 지움, 일주일 뒤 버림, 백업에 넣지 않음 (§15) |
| `p.<id>.reports` | 틀린 곳 알림 `[{ t, unit, kind('problem'\|'concept'\|'example'), ref, reason, memo(200자), q(150자), v }]` — 최근 200개, 새것이 앞 (§11) |
| `sys.*` | 저장 계층 자체(되돌리기 지점) — 백업·내보내기에 넣지 않는다 |

- 학생을 지우면 `removePrefix('p.<id>.')` 로 그 학생 키만 모두 지운다.
- 설정의 '이 학생 기록 지우기'는 학습 기록만 지운다 — 그 학생의 선택(`prefs`, 읽어 주기)과 아직 전하지 않은 틀린 곳 알림(`reports`)은 남긴다(2026-10-08).
- 저장하지 않는 것: 실명·생년월일·학교·연락처·위치 같은 신원 정보(받지도 않는다), 학습과 상관없는 입력.

### 9.3 백업 (다른 기기로 옮기기 — 서버 없이)

- **내보내기**: 학생(전부 또는 고른 학생)의 기록을 **암호(6자 이상)로 잠근** 파일로 내려받는다.
  PBKDF2-SHA256(600,000회) → AES-GCM-256. 파일이 남의 손에 들어가도 별명·기록을 읽을 수 없고, 고친 파일은 풀리지 않는다.
  암호 없는 내보내기는 없다.
- **가져오기**: ① 겉봉 검사(형식·판·잠금 정보) → ② 암호로 풀기(틀린 암호·손상 파일 거절) → ③ 내용 검사(학생·기록 하나하나 모양·크기,
  알 수 없는 항목 버림, `__proto__` 같은 위험한 키 제거) → ④ 요약을 보여 주고 학생이 고른 방식으로 복원.
  - **더하기(기본)**: 지금 기록은 그대로, 백업의 학생을 새 학생으로 더한다.
  - **바꾸기**: 바꾸기 전에 되돌리기 지점(`sys.restorePoint`)을 저장하고, 한 번의 원자적 쓰기로 바꾼다. **[되돌리기]** 로 원래대로.
  - 저장소 쓰기가 실패하면 메모리도 바뀌지 않는다 — **잘못된 파일이나 실패로 기존 데이터가 손상되지 않는다.**
- 백업 파일 이름 `가정교사-백업-YYYY-MM-DD.json` 은 `.gitignore` 에 있고, 비밀정보 검사가 저장소에 백업 파일이 들어오는 것을 막는다.

### 9.4 같은 기기를 여러 학생이 쓸 때

- 학생마다 **PIN(숫자 4~8자리, 선택)** 을 걸 수 있다. PIN 은 저장하지 않고 소금 친 PBKDF2 해시만 `profiles[].lock` 에 둔다.
  PIN 이 걸린 학생으로 바꾸거나 그 학생의 기록·오답노트·대화·백업을 보려면 PIN 이 필요하다.
- PIN 은 "옆 사람이 함부로 보지 못하게" 하는 잠금이다. 기기 자체의 잠금(화면 잠금·계정)을 대신하지는 않는다 — 설정 화면에 그렇게 알린다.
- PIN 을 잊으면 그 학생의 기록은 백업 파일(그 백업의 암호)로만 되살릴 수 있다. 학생 삭제는 PIN 없이도 할 수 있다(기록이 함께 지워진다).
- 화면이 메모리에 들고 있는 상태(풀던 예상문제 `S.quiz`·복습 `S.review`·대화 `S.chats`·보던 개념 카드 위치 `S.unitUI`)는 학생이 바뀌면 버린다 —
  학생 고르기(`setCurrent`)뿐 아니라 다른 탭에서 바꾼 경우도 화면을 그릴 때 지금 학생 id 와 견주어(`S.statePid`). 앞 학생의 상태가 다음 학생의 기록에 섞이지 않게(2026-10-08). 시험: `tests/ui/learn-resume.spec.js`.

### 9.5 다른 사람이 볼 수 없게 — 점검 목록

- 페이지는 외부로 아무것도 보내지 않는다: CSP `connect-src 'self'`, 외부 요청 0건 테스트, 분석 도구·광고·외부 글꼴 없음.
- 주소(#/…)·문서 제목·서비스 워커 캐시에 학생 별명·답·기록을 넣지 않는다(캐시는 앱 파일만).
- 화면에 다른 학생의 기록을 보여 주지 않는다(학생 고르기 화면에는 별명·아바타만).
- 공용 컴퓨터 안내: "공부를 마치면 [이 기기에서 기록 지우기]" (설정).

### 9.6 저장하지 못할 때 (2026-10-08 — 1순위 데이터 보호)

- 쓰기가 실패하면(저장 공간 부족 `QuotaExceededError` 등) 값은 **메모리에 그대로** 두고 그 키를 다시 "밀린 쓰기"로 표시한다. 예전에는 다음 변경이 있을 때만 다시 썼다 —
  더 바꾸지 않고 창을 닫으면 그 사이 기록이 사라질 수 있었다. 이제 저장소가 **잠시 뒤 저절로 다시 쓴다**(2초부터 두 배씩, 30초마다까지).
- `store.status()` = `{ ok, failing(이어서 실패한 횟수), since, error(오류 이름만), provider, pending(못 쓴 키 수) }`, `store.onStatus(fn)` 은 실패가 시작되거나 다시 될 때 부른다.
  밀린 것을 다 쓰면 실패 상태를 거둔다.
- 화면(`initSaveWatch`)은 위쪽에 알린다(`#save-problem`): "학습 기록을 이 기기에 저장하지 못하고 있어요" + 저장 공간이면 정리 안내, 설정의 백업으로 파일에 남기기(백업은 메모리의 지금 기록을 쓴다),
  [지금 다시 저장하기]. 다시 시도할 때마다 같은 알림을 되풀이하지 않고, 저장되면 감추고 "밀린 학습 기록을 저장했어요"라고 알린다.
  아예 저장소를 열 수 없는 브라우저(메모리뿐)는 예전처럼 홈에 "이 브라우저에서는 기록을 저장할 수 없어요".
- 시험: `tests/logic/storage.spec.js`(상태·저절로 다시 쓰기), `tests/ui/save-fail.spec.js`(알림·단추·저절로 — 저장소 쓰기를 막아 흉내).

### 9.7 기록 지키기 (2026-10-08 — 1순위 데이터 보호)

- 브라우저는 기기 저장 공간이 모자라면 사이트 기록(IndexedDB)을 지울 수 있다('best-effort' 저장). 아이폰·아이패드 사파리는 7일 넘게 열지 않은 사이트의 기록도 지울 수 있다(홈 화면에 추가한 앱은 빼고).
- 학생 기록이 생기면(지금 학생이 있는 화면을 처음 그릴 때) 한 번 `navigator.storage.persist()` 를 부른다. 크롬·엣지·사파리는 묻지 않고 스스로 정하고(설치한 앱·자주 쓰는 사이트면 받아 줌),
  파이어폭스는 창을 띄워 물어서 저절로는 부르지 않는다. 기록은 밖으로 나가지 않는다 — 이 기기 브라우저에 보존을 부탁하는 것뿐이다.
- 설정 → 학습 기록 옮기기: 지금 상태("지켜 주고 있어요" / "저장 공간이 모자라면 지울 수 있어요 — 백업을 권함" + [기록을 지켜 달라고 요청하기])·이 사이트가 쓰는 공간(`navigator.storage.estimate()`),
  아이폰 사파리면 7일 삭제 안내. 백업을 쓸 수 없는 화면(암호화 기능 없음)에서는 백업을 권하지 않는다. 아이폰 설치 안내 막대에도 "홈 화면에 추가하면 학습 기록도 오래 남아요".
- 시험: `tests/ui/keep.spec.js`(저장 관리자를 바꿔 끼워 받아 줌·거절·파이어폭스·아이폰·없음).

---

## 10. 복습 일정 (`js/review.js` — `TutorReview`, 2026-10-08)

오답노트의 문제를 며칠 뒤에 다시 낸다. **틀리면 다음 날, 한 번 맞히면 3일 뒤**, 두 번 연속 맞히면 오답노트에서 뺀다(예전 규칙 그대로).
이 기기 안에서만 계산하고, 날짜는 그 기기의 날짜를 `'YYYY-MM-DD'` 글자로만 다룬다. DOM 을 쓰지 않는 순수 함수다.

```
TutorReview.AFTER_WRONG = 1 · AFTER_RIGHT = 3 · CLEAR_STREAK = 2
TutorReview.isDay(s) · addDays(iso, n) · dayOf(ms)          날짜 글자 검사·더하기(시간대 무관)·그 기기의 날짜
TutorReview.dueOf(note) → 'YYYY-MM-DD'    note.due, 없으면 틀린 날(at) 다음 날, 그것도 없으면 '1970-01-01'(바로)
TutorReview.isDue(note, today) · firstDue(today)          새로 틀린 문제의 다음 복습 날 = 다음 날
TutorReview.dueList(notes, today) → note[]               오늘 복습할 것 — 복습 날이 오래된 것부터, 같으면 먼저 틀린 것부터
TutorReview.dueCount(notes, today) · nextDue(notes, today) → { date, n } | null   오늘 뒤의 가장 이른 복습 날과 그날 문제 수
TutorReview.answer(note, correct, today) → { cleared, due, streak }   채점 뒤 note 를 그 자리에서 고친다(맞힘: rightStreak+1·3일 뒤 / 틀림: wrongCount+1·다음 날)
TutorReview.label(due, today) → '오늘' | '내일' | '모레' | '10월 11일'
```

- 화면: 예상문제에서 틀리면 `addNote` 가 `due` = 다음 날. 오답노트의 '다시 풀기'와 '오늘의 복습'이 같은 채점 저장(`gradeNote`)을 쓴다.
  홈에 오늘 복습할 문제가 있으면 "📅 오늘의 복습" 카드, 오답노트 위에 문제 수와 [복습 시작](없으면 다음 복습 날), 문제마다 "다음 복습 …".
- `#/review` 는 한 번에 10문제까지(오래된 복습 날부터) 내고, 다른 화면에 다녀와도 이어서 푼다(메모리의 `S.review`). 결과에 맞힌 문제·뺀 문제·내일 다시 볼 문제·남은 복습.
- `js/review.js` 가 없으면 복습 안내만 빠지고 오답노트는 예전처럼 동작한다(두 번 연속 맞히면 뺀다).

---

## 11. 틀린 곳 알리기 (2026-10-08 — 사용자 결정: 그 기기에만 모은다)

- 채점 전 안내(2026-10-09): 빈 답이면 '답을 입력해 주세요', 수·모음·식 답인데 읽을 수 없으면(수가 들어 있는 '2와 3 사이'·'12 m', 식의 괄호 짝이 틀림)
  채점하지 않고 '답을 수로 읽지 못했어요 …' 안내(`.pw-msg`)와 입력칸 초점 — 맞는 수를 쓰고도 오답으로 남지 않게. 수가 하나도 없는 답('모르겠어요')은 그대로 채점한다(막히지 않게).
- 버튼: 문제 위젯은 **채점한 뒤**(`problemWidget(p, { report: { unit, kind: 'problem', ref, q } })` — 예상문제·오답노트·오늘의 복습·개념 카드의 이해 확인),
  개념 카드(`kind: 'concept', ref: 'c<번호>'`)·예제(`kind: 'example', ref: 'ex<번호>'`)는 늘. 이해 확인 문제의 ref 는 `check-<카드 번호>`.
  문제 ref: 문제은행은 문제 번호, 생성기 문제는 `g-<생성기>-<seed>`(같은 문제를 다시 만들 수 있다), 낱말 문제는 `v-<seed>`.
- 펼치는 칸: 이유 5가지(`answer` 정답이 틀린 것 같아요 · `question` 문제나 보기가 이상해요 · `explain` 설명·해설이 틀린 것 같아요 · `typo` 글자·그림이 잘못됐어요 · `other` 기타) + 200자 메모.
  문제 위젯(`<form>`) 안에도 들어가므로 `<form>` 을 쓰지 않고, 바깥 화면의 `data-act` 처리와 섞이지 않게 `data-rp` 를 쓴다.
- 저장: `p.<id>.reports`(§9.2) — 같은 단원·종류·ref 를 다시 알리면 하나로 고친다. 메모는 제어 문자를 빼고 200자, 화면에는 글자로만 넣는다. 서버·외부 요청 없음.
- 설정의 **틀린 곳 알림**(지금 학생 것만): 목록·하나씩 지우기·모두 지우기(확인)·[글로 복사하기](클립보드, 안 되면 글을 보여 주고 직접 복사).
  복사하는 글에는 날짜·과목·단원(id)·종류·ref·이유·메모·내용 앞부분만 — **별명 같은 학생 정보는 넣지 않는다.** 백업에 함께 들어간다(`DATA_KINDS`).

---

## 12. 보호자용 학습 요약 (`js/summary.js` — `TutorSummary`, 2026-10-08)

지금 학생 **한 명**의 기록(`attempts`·`days`·`progress`·`notes`·`reports`)만 받아 이 기기 안에서 요약한다. 다른 학생 기록은 받지도 않는다. 순수 함수.

```
TutorSummary.build(input, { today, period: 7|30, unitInfo(unitId) → { subject, subjectName, title } | null, due, conceptTitle(unitId, c) → 제목 | null })
  → { from, to, period, studyDays, solved, correct, rate, checks, checksOk,
      daily: [{ date, n, c }] (기간의 모든 날), bySubject: [{ subject, name, n, c, rate }] (많이 푼 순),
      units, strong(3문제 이상·80% 이상, 최대 3), weak(3문제 이상·60% 미만, 최대 3), causes(최대 3, 같으면 최근 것),
      concepts(자주 틀린 개념 — 풀이 기록의 c 로 개념 카드마다 센다, 기간에 2번 이상 틀린 것, 많이 틀린 차례·같으면 최근, 최대 5: { unit, c, n, wrong, title, unitTitle }),
      studied(개념을 본 단원 — progress.last 가 기간 안, 최대 5), studiedCount, notes, due, reports,
      partial(풀이 기록 2000개가 다 차서 기간 앞부분이 빠졌을 수 있음) }
TutorSummary.toText(summary, { grade }) → 글로 복사할 요약 (학년만 — 별명은 넣지 않는다)
```

- 푼 문제(`solved`)는 level 1 이상, 이해 확인(`checks`)은 level 0 — 날짜별 막대(`daily`)는 둘 다 센다. 자주 틀린 개념도 둘 다 센다.
- 자주 틀린 개념의 제목은 단원 파일에 있어서, 요약 화면은 그 단원을 먼저 싣고 그린다(실패하면 '개념 n'). 누르면 그 카드로(`?card=`). 글로 복사에도 넣는다. 2026-10-08 전 기록에는 c 가 없어 세지 않는다.
- 화면 `#/summary`(기록 화면 아래 링크): 기간 고르기(7·30일, 메모리에만 — 저장 안 함)·숫자 4칸·날짜별 막대(30일은 일주일마다 날짜)·과목별·단원·자주 틀린 까닭·
  오답노트·복습·틀린 곳 알림·개념을 공부한 단원, [인쇄하기](`@media print` — 막대·버튼을 숨기고 맨 위에 '가정교사 · 날짜 기준')·[글로 복사하기].
  문서 제목은 '학습 요약 · 가정교사'(별명 없음 — 인쇄 머리글에 남지 않게). PIN 이 걸린 학생은 PIN 을 맞혀야 연다(다른 화면과 같다).

---

## 13. 읽어 주기 (`js/speech.js` — `TutorSpeech`, 2026-10-08)

```
TutorSpeech.toSpeech(src) → string   서식 글(마크다운 일부 + $TeX$) → 소리 내어 읽기 좋은 한국어
   분수 \frac{a}{b}·a/b → "b분의 a", 대분수 → "2와 3분의 1", + - × ÷ → 더하기·빼기(앞이 수·글자면)/마이너스·곱하기·나누기,
   = → "A는 B"(받침에 맞게 은/는), < > ≤ ≥ ≠ → "A는 B보다 작다/크다/작거나 같다/크거나 같다, 와 같지 않다",
   식은 조각(⇒ "그러면" · 쉼표 · 쌍반점)마다 따로, 기호만 늘어놓으면 기호 이름, ^2·^3·^{n} → 제곱·세제곱·n제곱, ^\circ → 도,
   \sqrt → 루트(세제곱근), \overline → 선분, \text{…} → 글자, [[빈칸]] → 빈칸, 굵게·목록·인용·표 기호는 빼고 글만, 그림 글자(이모지)는 읽지 않는다
TutorSpeech.pickVoice(voices) → voice | null   이 기기 안(localService)의 한국어 목소리만, 기본 목소리 먼저
```

- **인터넷 목소리는 쓰지 않는다**(규칙 4·7) — 크롬·엣지의 온라인 목소리는 읽을 글을 회사 서버로 보낸다. 기기 안 한국어 목소리가 없으면
  `html.can-speak` 가 붙지 않아 🔊 버튼이 숨고, 설정의 '읽어 주기'가 까닭과 설치 방법(윈도·안드로이드·아이폰)을 알린다. `voiceschanged` 로 늦게 와도 붙는다.
- 화면(app.js): `speakBtn(fn, 이름)` — 누를 때 fn() 의 서식 글을 읽는다(같은 버튼을 다시 누르면 멈춤, `aria-pressed`). 개념 카드(`.cc-tools`: 제목·(기초 다지기면 쉬운 설명)·본문),
  예제(`.ex-tools`: 문제와 지금까지 펼친 풀이), 문제(`.pw-tools` '문제 읽어 주기': 문제 + 화면에 보인 순서의 보기 번호), 채점 뒤 해설('해설 읽어 주기': 정답·왜 틀렸을까·해설).
  다른 화면으로 가면 멈춘다(`render` 가 `speechSynthesis.cancel`). 빠르기: 천천히 0.85 · 보통 1. 읽어 주기를 지원하지 않는 브라우저에서는 버튼을 만들지 않는다.

---

- 수식은 왼쪽부터 `$` 짝을 지어 나눈다(붙어 있는 `$a$$b$` 도 화면처럼 두 수식, `$$…$$` 는 한 수식). 이온 전하·한쪽 극한 첨자(`Na^+`·`Ca^{2+}`·`a^-`)는 "Na 플러스"·"Ca 2플러스"·"a 마이너스",
  별표 첨자는 "스타", n제곱근의 지수 안 수식도 말로. 빈칸 `___`·`_at` 의 밑줄은 "빈칸"(2026-10-08 — 전체 단원 글 83,825개를 읽어 주기 글로 바꿔 수식 명령이 남는 곳 251 → 9, 남은 9곳은 "x^2 처럼 입력"처럼 글자 그대로가 맞는 안내).

## 14. 새 학년 안내 (2026-10-08)

- 한국 학년도는 3월 1일에 시작한다(`TutorImpact.schoolYear`). 학생(초1~고3)의 `gradeAt`(학년을 정한 때 — 없으면 `created`)의 학년도가 지금 학년도보다 앞이고,
  `gradeAsk`(그 안내에 '그대로 두기'로 답한 학년도)가 지금 학년도가 아니면 홈 맨 위에 "🌸 새 학년이 되었나요?" 카드(`.grade-up`).
- [○학년으로 올리기] → `grade`·`level`(초6 → 중1 처럼 학교급도)·`gradeAt` 를 고친다. [그대로 두기] → `gradeAsk` = 지금 학년도. [다른 학년 고르기] → `#/setup?change=1`.
  고3 은 올리기 대신 대학교·성인을 고를 수 있다고 알린다. 대학교·성인 학생에게는 묻지 않는다.
- 학년 바꾸기(`#/setup?change=1`)·새 학생은 `gradeAt` 을 그때로 적는다. 2026-03-01 보다 앞선 시각은 알 수 없는 값으로 보고 묻지 않는다(가정교사가 나오기 전 — 시험용 가짜 프로필 등).
  백업은 두 칸을 그대로 옮긴다(`cleanProfile`).

---

## 15. 예상문제 이어 풀기 (2026-10-08 — 사용자 지시 3순위 '중단된 학습 이어하기')

- 예상문제 주소(`#/quiz/…?…&seed=`)가 같으면 같은 문제지다. 답을 하나라도 한 뒤부터 문제를 보일 때·채점할 때마다 `p.<id>.quiz` 한 칸에
  낸 문제 사본(`packProblem`)·답(맞음·쓴 답)·지금 번호·맞춤 난이도 상태를 적고, **채점하면 바로 저장**(`store.flush` — 사파리는 닫히기 직전의 모아 쓰기를 끝내 주지 않았다).
- 같은 주소를 다시 열면(새로고침·탭 다시 불러오기·홈의 "풀던 예상문제 이어 풀기" 카드) 저장한 문제·답으로 되살리고 그 번호부터 낸다("지난번에 풀던 곳부터 이어서 풀어요").
  답한 문제에서 [다음 문제]를 누르기 전에 닫혔으면 다음 문제로. 맞춤 난이도는 이미 낸 문제를 다시 내지 않는다. 틀린 문제 다시 풀기도 그대로 이어진다.
- 다 풀면 지운다. 일주일이 지났거나 모양이 틀리면 버린다. 단원 묶음이 다른 주소면 되살리지 않는다. 학생별 키라 다른 학생에게 보이지 않고, 학생 삭제·기록 지우기에 함께 지워진다.

## 16. 좁은 화면의 긴 수식 (2026-10-08 — 사용자 지시 3순위 '모바일·태블릿·PC 사용성')

- `js/mathtext.js` 는 줄 안 수식을 맨 바깥 관계 기호 뒤와 괄호 밖 +·− 뒤에서만 나눈다. 괄호·분수 안처럼 **줄을 바꿀 수 없는 덩어리**가 글 칸보다 넓으면
  칸 밖으로 삐져나오고, 화면 끝을 넘으면 화면 전체가 옆으로 밀렸다(2026-10-08 휴대폰 360px 검사: 준비된 891단원 중 5단원. 예제 풀이 칸은 230px 남짓).
- `js/app.js` 의 `fitMath` 가 `#main` 의 줄 안 수식(`.mt` — 가운데 블록 수식 `.mt-disp` 는 원래 옆으로 민다)마다 가장 넓은 덩어리와 쓸 수 있는 너비를 잰다.
  쓸 수 있는 너비는 글 칸 안쪽 왼쪽 끝부터 **글 칸과 그 위 칸들 가운데 가장 먼저 끝나는 안쪽 오른쪽 끝**까지(사이 칸들의 오른쪽 여백을 덜어서) —
  보기 단추(격자 안)처럼 칸이 긴 수식에 밀려 넓어질 수 있어서다. 옆으로 미는 상자(표 상자) 안이면 거기서 멈춘다(표는 상자째 민다).
  - 조금 넓으면(줄여서 0.8배 이상이면) 그 수식의 글자를 줄인다(`style.fontSize`).
  - 그래도 넓으면 `.mt-fit` — 그 수식만 한 줄로 떼어 옆으로 민다(`contain: inline-size` 로 위 칸을 밀어 넓히지 않음, 보기 단추 밖이면 `tabindex=0` 으로 키보드로도).
- 화면을 그릴 때·칸이 보이거나 바뀔 때(MutationObserver — 자식·`hidden`·`open`·`class`)·`#main` 크기가 바뀔 때(ResizeObserver — 화면 돌리기·글자 크기) 한 프레임에 한 번 다시 잰다.
  늘 다시 재고(줄인 수식은 원래 크기로 되돌려 센다) **바뀐 수식만** 고친다. 고친 뒤 둘레 칸이 바뀌었을 수 있어 바뀐 것이 없을 때까지 몇 번(최대 4번) 더 잰다. 숨은 칸은 보일 때 잰다.
- 단원 글에서는 같은 값의 줄바꿈 가능한 꼴로 쓰는 것이 먼저다(망원급수 `\frac12\{(…)+(…)\}` → `\frac12(…)+\frac12(…)`, 성분이 긴 벡터 → 성분마다). 시험: `tests/ui/math-fit.spec.js`.

## 17. 개념 카드 이어 보기 (2026-10-08 — 사용자 지시 3순위 '중단된 학습 이어하기')

- 개념 탭은 이번에 그 단원을 처음 열 때(화면 상태 `unitUI(id).fresh`) 진도 기록(`p.<id>.progress` 의 `seen`)을 보고 **아직 안 본 첫 카드**부터 보인다.
  새 저장 칸은 없다 — 이미 있는 "본 카드" 기록을 쓴다. 안 본 카드가 없으면(다 봄) 또는 하나도 안 봤으면 첫 카드부터.
- 이어 보일 때는 말풍선이 "지난번에 본 다음인 ‘…’부터"로 바뀌고, 카드 위에 안내와 [처음부터 보기](`#cvResume`)가 뜬다. 같은 때에 다른 탭에 다녀오면 보던 카드 그대로(안내 없음).
- 주소로 카드를 고르면(`?card=` — 오답노트·예상문제의 "개념 카드에서 보기 ›") 그 카드가 먼저다. 시험: `tests/ui/learn-resume.spec.js`.
- 홈의 "이어서 공부하기" 카드도 어디부터인지 적는다("개념 3/4 · ‘일차부등식 풀기’부터"). 카드 이름은 단원 파일에만 있어서, 아직 안 불러온 단원이면
  화면을 먼저 "개념 3/4부터"로 그린 뒤 단원 파일을 불러와 채운다(못 불러오면 번호만 — 오류 없음). 개념 카드를 다 봤으면 "개념 카드 다 봄 · 문제 풀기"로, 누르면 문제 탭으로 간다.

## 18. 다시 볼 개념 (2026-10-08 — 사용자 지시 2순위 '오답 분석 및 복습 추천')

- 예상문제 결과 화면은 틀린 문제를 보여 줄 뿐 아니라, 틀린 문제가 묶인 **개념 카드**(문제의 `concept` 번호)를 모아 "다시 볼 개념"으로 보인다 —
  많이 틀린 차례로(같으면 먼저 틀린 차례로) 5개까지, 카드마다 "틀린 문제 n개", 여러 단원을 섞은 문제지면 단원 이름도. 누르면 그 카드로 바로 간다(`#/unit/<id>/learn?card=n` — §17 의 이어 보기보다 먼저).
- 개념 번호가 없는 문제(낱말 문제 등)는 세지 않는다. 다 맞히면 이 칸이 없다. 기기 안 계산이고 저장하는 것은 없다. 시험: `tests/ui/quiz-again.spec.js`.
- '오늘의 복습' 결과에도 같은 칸 — 복습에서도 또 틀린 문제의 개념 카드(오답노트의 문제 사본에 든 `concept`). 단원이 아직 안 실렸으면 싣고 채운다. 시험: `tests/ui/review.spec.js`.
- 학생이 보는 기록 화면(`#/stats`)에도 "다시 볼 개념"을 3개까지 — 최근 30일 동안 두 번 이상 틀린 개념 카드(보호자용 요약 §12 의 `concepts` 와 같은 계산, 풀이 기록의 `c`). 시험: `tests/ui/summary.spec.js`.
