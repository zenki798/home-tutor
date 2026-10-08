const { test, expect } = require('@playwright/test');
const path = require('path');
const T = require(path.join(__dirname, '..', '..', 'js', 'mathtext.js'));

/*
 * 서식 글(마크다운 일부 + $TeX$) 렌더러 — 학습 내용의 모든 글이 이것을 거친다. 계약: docs/ARCHITECTURE.md §3
 * 이스케이프(안전), 블록·한 줄 문법, 교과서 수식 모양(클래스 계약), 평문(검색·aria-label), 검사(check) 를 본다.
 * 테스트 글에서 백슬래시를 헷갈리지 않게 ~ 를 백슬래시로 바꿔 쓴다: S('~frac{1}{2}') === '\\frac{1}{2}'
 */
const B = String.fromCharCode(92);
const S = (s) => s.split('~').join(B);
const tex = (s) => T.tex(S(s));
// h 안에 class 속성으로 c(공백으로 여러 개)가 모두 붙은 요소가 있는지
const hasClass = (h, c) => new RegExp('class="' + c.split(' ').map((x) => '(?=[^"]*\\b' + x + '\\b)').join('') + '[^"]*"').test(h);
const count = (h, re) => (h.match(re) || []).length;

test.describe('안전: 모든 입력을 이스케이프한다', () => {
  test('태그·속성·따옴표가 글자로 보인다', () => {
    const h = T.render('<script>alert(1)</script> <img src=x onerror=alert(1)> "따옴표" \'작은\' & 그리고');
    expect(h).not.toContain('<script');
    expect(h).not.toContain('<img');
    expect(h).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(h).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(h).toContain('&quot;따옴표&quot; &#39;작은&#39; &amp; 그리고');
  });
  test('inline·표·목록·상자 안에서도 이스케이프한다', () => {
    expect(T.inline('<b>굵게</b>')).toBe('<span class="rt-inline">&lt;b&gt;굵게&lt;/b&gt;</span>');
    const h = T.render('| <i>가</i> | 나 |\n|---|---|\n| <svg onload=x> | 1 |\n\n- <script>\n\n> <img src=x>');
    expect(h).not.toMatch(/<(i|svg|script|img)[\s>]/);
    expect(h).toContain('&lt;svg onload=x&gt;');
  });
  test('수식 안의 글자도 이스케이프한다 (\\text, 한글, 기호)', () => {
    const h = tex('~text{<b>굵게</b>} < x > "y"');
    expect(h).not.toContain('<b>');
    expect(h).toContain('&lt;b&gt;굵게&lt;/b&gt;');
    expect(h).toContain('&lt;');
    expect(h).toContain('&gt;');
  });
  test('속성값(aria-label)도 이스케이프한다', () => {
    const h = T.tex('a"><img src=x onerror=alert(1)>');
    expect(h).not.toContain('<img');
    const label = /aria-label="([^"]*)"/.exec(h)[1];
    expect(label).not.toMatch(/[<>"]/);
    expect(label).toContain('a&quot; &gt; &lt; img');
  });
  test('빈칸 안 글자는 어디에도 나오지 않는다 (정답 숨김 + 속성 주입 불가)', () => {
    const h = T.render('[["><script>alert(1)</script>]] 와 [[정답]]');
    expect(h).not.toContain('script');
    expect(h).not.toContain('정답');
  });
  test('자리표 글자(U+E000~E003)를 넣어도 수식 자리를 흉내 낼 수 없다', () => {
    const h = T.render('가0나 $x$');
    expect(h).not.toContain('undefined');
    expect(h).toContain('가0나');
  });
});

test.describe('블록 문법', () => {
  test('문단·줄바꿈 — 뿌리는 <div class="rt">', () => {
    const h = T.render('첫 줄\n둘째 줄\n\n새 문단');
    expect(h).toBe('<div class="rt"><p>첫 줄<br>둘째 줄</p><p>새 문단</p></div>');
  });
  test('점 목록(- 와 *)·번호 목록(시작 번호 유지)', () => {
    expect(T.render('- 사과\n* 배')).toContain('<ul><li>사과</li><li>배</li></ul>');
    expect(T.render('1. 하나\n2. 둘')).toContain('<ol><li>하나</li><li>둘</li></ol>');
    expect(T.render('3. 셋\n4. 넷')).toContain('<ol start="3"><li>셋</li><li>넷</li></ol>');
  });
  test('목록처럼 보이지만 목록이 아닌 줄: -3, **굵게**, 1), 3.14', () => {
    expect(T.render('-3은 음수예요.')).not.toContain('<ul>');
    expect(T.render('**분모**는 그대로예요.')).toBe('<div class="rt"><p><strong>분모</strong>는 그대로예요.</p></div>');
    expect(T.render('1) 다음을 계산하세요.')).not.toContain('<ol');
    expect(T.render('3.14는 원주율의 근삿값')).not.toContain('<ol');
  });
  test('강조 상자(> 💡, > ⚠️)와 소제목(### → h4)', () => {
    const h = T.render('### 정리\n\n> 💡 분모는 그대로\n> 분자만 더해요\n\n> ⚠️ 주의');
    expect(h).toContain('<h4 class="rt-h">정리</h4>');
    expect(h).toContain('<div class="rt-box">💡 분모는 그대로<br>분자만 더해요</div>');
    expect(h).toContain('<div class="rt-box">⚠️ 주의</div>');
  });
  test('표: 머리행은 thead, 정렬 표시, 수식 안의 | 는 칸을 나누지 않는다', () => {
    const h = T.render('| 수 | 절댓값 |\n|:---:|---:|\n| $-3$ | $|-3|=3$ |\n| 2 | 2 |');
    expect(h).toContain('<table class="rt-table">');
    expect(h).toContain('<thead><tr><th style="text-align:center">수</th><th style="text-align:right">절댓값</th></tr></thead>');
    expect(count(h, /<tr>/g)).toBe(3);
    expect(count(h, /<td/g)).toBe(4);
  });
  test('머리행 없는 표, \\| 는 글자 |', () => {
    const h = T.render(S('| 가 ~| 나 | 다 |\n| 1 | 2 |'));
    expect(h).not.toContain('<thead>');
    expect(h).toContain('<td>가 | 나</td>');
  });
  test('수식만 있는 문단(줄)은 가운데 블록 .mt-block', () => {
    const h = T.render(S('계산해 보세요.\n\n$~frac{2}{5}+~frac{1}{5}$'));
    expect(h).toMatch(/<div class="mt-block"><span class="mt mt-disp" role="math"/);
    expect(T.render('$x$와 $y$')).not.toContain('mt-block');
    // 줄마다 수식 하나면 줄마다 블록 (풀이 단계)
    expect(count(T.render('$2x+3=7$\n$2x=4$\n$x=2$'), /class="mt-block"/g)).toBe(3);
  });
  test('inline 은 블록 문법을 글자 그대로 둔다', () => {
    const h = T.inline('- 목록 아님 **굵게**\n### 제목 아님');
    expect(h.startsWith('<span class="rt-inline">')).toBe(true);
    expect(h).not.toMatch(/<(ul|li|h4)/);
    expect(h).toContain('<strong>굵게</strong>');
    expect(h).toContain('<br>### 제목 아님');
  });
});

test.describe('한 줄 문법', () => {
  test('**굵게**, __밑줄__, \\$', () => {
    const h = T.inline(S('**굵게** 와 __밑줄 친 부분__, 가격 ~$5'));
    expect(h).toContain('<strong>굵게</strong>');
    expect(h).toContain('<u class="rt-u">밑줄 친 부분</u>');
    expect(h).toContain('가격 $5');
  });
  test('굵게 안의 수식', () => {
    expect(T.inline('**$x=2$ 일 때**')).toMatch(/^<span class="rt-inline"><strong><span class="mt" role="math"/);
  });
  test('빈칸 [[…]]: 계약 모양, 길이는 안 글자 수에 비례(최소 3), 글자는 숨김', () => {
    const h = T.inline('3 + [[5]] = 8');
    expect(h).toContain('<span class="rt-blank" aria-label="빈칸" style="--w:3ch" role="img"></span>');
    expect(h).not.toContain('>5<');
    expect(T.inline('[[사과나무]]')).toContain('style="--w:9ch"');   // 한글 4자 = 8칸 + 1
    expect(T.inline(S('[[$~frac{1}{2}$]]'))).toContain('style="--w:4ch"'); // 1/2 = 3칸 + 1
  });
  test('[[?]] 는 물음표 칸', () => {
    expect(T.inline('[[?]]')).toBe('<span class="rt-inline"><span class="rt-blank rt-q">?</span></span>');
  });
  test('수식 안의 빈칸 $3+[[?]]=5$', () => {
    const h = T.inline('$3+[[?]]=5$');
    expect(h).toContain('<span class="rt-blank rt-q">?</span>');
    expect(h).not.toContain('[[');
  });
});

test.describe('계약 §3.3 의 TeX 명령을 모두 그린다 (기대 글자·클래스) + check 통과', () => {
  const ab = (c) => 'a ~' + c + ' b';
  const one = (c) => '~' + c;
  const groups = [
    ['연산', { times: '×', div: '÷', pm: '±', mp: '∓', cdot: '·' }, ab, 'mt-op'],
    ['관계', { le: '≤', ge: '≥', leq: '≤', geq: '≥', ne: '≠', neq: '≠', approx: '≈', equiv: '≡', sim: '∼', simeq: '≃', cong: '≅', propto: '∝', lt: '&lt;', gt: '&gt;' }, ab, 'mt-rel'],
    ['집합 관계', { in: '∈', notin: '∉', subset: '⊂', subseteq: '⊆', supset: '⊃' }, ab, 'mt-rel'],
    ['집합 연산·논리', { cup: '∪', cap: '∩', setminus: '∖', land: '∧', lor: '∨' }, ab, 'mt-op'],
    ['화살표', { to: '→', rightarrow: '→', leftarrow: '←', Rightarrow: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔', leftrightarrow: '↔', iff: '⇔', implies: '⇒' }, ab, 'mt-rel'],
    ['관계처럼 띄우는 기호', { therefore: '∴', because: '∵', perp: '⊥', parallel: '∥' }, ab, 'mt-rel'],
    ['기호', { infty: '∞', angle: '∠', triangle: '△', square: '□', degree: '°', '%': '%', cdots: '⋯', ldots: '…', prime: '′',
      emptyset: '∅', varnothing: '∅', forall: '∀', exists: '∃', neg: '¬' }, one, 'mt-ord'],
    ['그리스 소문자(기울임)', { alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', theta: 'θ', lambda: 'λ', mu: 'μ', pi: 'π', sigma: 'σ', phi: 'φ', omega: 'ω' }, one, 'mt-v'],
    ['그리스 대문자(곧게)', { Delta: 'Δ', Sigma: 'Σ', Omega: 'Ω' }, one, 'mt-up'],
  ];
  for (const [name, map, make, klass] of groups) {
    test(name, () => {
      for (const [cmd, glyph] of Object.entries(map)) {
        const src = make(cmd);
        expect(tex(src), src).toContain('class="' + klass + '">' + glyph + '<');
        expect(T.check('$' + S(src) + '$'), src).toEqual([]);
      }
    });
  }
  test('함수 이름(곧은 글씨)', () => {
    for (const f of ['sin', 'cos', 'tan', 'log', 'ln', 'max', 'min', 'exp', 'det']) {
      expect(tex('~' + f + ' x'), f).toContain('<span class="mt-fn">' + f + '</span>');
      expect(T.check(S('$~' + f + ' x$')), f).toEqual([]);
    }
  });
  test('나머지 계약 명령·환경도 check 를 통과한다', () => {
    const rest = ['~frac{1}{2}', '~dfrac{1}{2}', '~sqrt{2}', '~sqrt[3]{8}', '~sum_{k=1}^{n} k', '~int_{a}^{b} x~,dx', '~lim_{x ~to 0} x',
      '~prod_{i=1}^{n} i', '~overline{AB}', '~overrightarrow{AB}', '~vec{a}', '~hat{p}', '~bar{x}', '~widehat{AB}', '~text{원}',
      '~mathrm{cm}', '~mathbf{v}', '{}_{n}~mathrm{P}_{r}', '{}_{n}~mathrm{C}_{r}', '~binom{n}{r}', '~left( x ~right)', '~left[ x ~right]',
      '~left~{ x ~right~}', '~left| x ~right|', '~left. x ~right.', 'a~,b~;c~quad d~ e', '~{1, 2~}', '90^~circ', 'x^{10}', 'a_{n+1}',
      'x_1^2', '2~frac{1}{3}', '~begin{cases} x & (x~ge 0) ~~ -x & (x<0) ~end{cases}', '~begin{pmatrix} a & b ~~ c & d ~end{pmatrix}',
      '~begin{bmatrix} 1 ~end{bmatrix}', '~begin{vmatrix} a & b ~~ c & d ~end{vmatrix}', "f'(x)", '|x|', 'x!', '[0, 1)'];
    for (const r of rest) expect(T.check('$' + S(r) + '$'), r).toEqual([]);
  });
});

test.describe('TeX → 교과서 모양 (구조)', () => {
  const thin = '<span class="mt-sp mt-sp-thin"></span>';
  test('분수·\\dfrac·대분수·중괄호 없는 \\frac12', () => {
    expect(tex('~frac{3}{4}')).toContain('<span class="mt-frac"><span class="mt-num">3</span><span class="mt-den">4</span></span>');
    expect(tex('~dfrac{a}{b}')).toContain('<span class="mt-frac"><span class="mt-num"><i class="mt-v">a</i></span><span class="mt-den"><i class="mt-v">b</i></span></span>');
    expect(tex('2~frac{1}{3}')).toContain('2<span class="mt-frac">');
    expect(tex('~frac12')).toContain('<span class="mt-num">1</span><span class="mt-den">2</span>');
  });
  test('근호: √ 그림(.mt-rsym) + 윗줄(.mt-rad), n제곱근 .mt-idx', () => {
    expect(tex('~sqrt{2}')).toContain('<span class="mt-sqrt"><span class="mt-rsym" aria-hidden="true"></span><span class="mt-rad">2</span></span>');
    expect(tex('~sqrt[3]{8}')).toContain('<span class="mt-sqrt"><span class="mt-idx">3</span><span class="mt-rsym" aria-hidden="true"></span><span class="mt-rad">8</span></span>');
  });
  test('위·아래 첨자', () => {
    expect(tex('x^2')).toContain('<i class="mt-v">x</i><span class="mt-sup">2</span>');
    expect(tex('x^{10}')).toContain('<span class="mt-sup">10</span>');
    expect(tex('x^23')).toContain('<span class="mt-sup">2</span>3'); // 중괄호가 없으면 한 글자만 올린다
    expect(tex('a_1')).toContain('<span class="mt-sub">1</span>');
    expect(tex('a_{n+1}')).toContain('<span class="mt-sub"><i class="mt-v">n</i><span class="mt-op">+</span>1</span>');
    expect(tex('x_1^2')).toContain('<span class="mt-supsub"><span class="mt-sup">2</span><span class="mt-sub">1</span></span>');
    expect(tex('x^2_1')).toContain('<span class="mt-supsub"><span class="mt-sup">2</span><span class="mt-sub">1</span></span>');
  });
  test('변수는 기울임, 숫자는 곧게, 한글은 \\text 없이도 곧은 .mt-text', () => {
    const h = tex('2x+3=7');
    expect(h).toContain('2<i class="mt-v">x</i>');
    expect(h).not.toMatch(/<i class="mt-v">\d/);
    const k = tex('~text{넓이}=가로~times세로');
    expect(k).toContain('<span class="mt-text">넓이</span>');
    expect(k).toContain('<span class="mt-text">가로</span><span class="mt-op">×</span><span class="mt-text">세로</span>');
    expect(tex('한 변의 길이')).toContain('<span class="mt-text">한 변의 길이</span>');
    expect(tex('3~mathrm{cm}')).toContain('3<span class="mt-text mt-rm">cm</span>');
    expect(tex('~mathbf{v}')).toContain('<span class="mt-text mt-bf">v</span>');
  });
  test('단항 부호는 붙이고 빼기는 띄운다 (빼기는 U+2212)', () => {
    const h = tex('-3-(-5)');
    expect(count(h, /class="mt-op mt-un"/g)).toBe(2);
    expect(count(h, /class="mt-op"/g)).toBe(1);
    expect(h).toContain('<span class="mt-op">−</span>');
  });
  test('함수 이름 앞뒤는 조금 띄우고 sin(x) 는 붙인다', () => {
    expect(tex('2~sin x')).toContain('2' + thin + '<span class="mt-fn">sin</span>' + thin + '<i class="mt-v">x</i>');
    expect(tex('~sin(x)')).toContain('<span class="mt-fn">sin</span>(');
    expect(tex('~log_{2} 8')).toContain('<span class="mt-fn">log</span><span class="mt-sub">2</span>' + thin + '8');
  });
  test('도(30^\\circ → 30°)와 합성함수(f∘g)', () => {
    expect(tex('90^~circ')).toContain('90<span class="mt-ord">°</span>');
    expect(tex('30^{~circ}')).not.toContain('mt-sup');
    expect(tex('f ~circ g')).toContain('<span class="mt-op">∘</span>');
  });
  test('중첩: 분수 안 근호 안 분수, 위첨자 안 분수, 위첨자 안 위첨자', () => {
    const h = tex('~frac{~sqrt{~frac{1}{2}}}{3}');
    expect(h).toContain('<span class="mt-frac"><span class="mt-num"><span class="mt-sqrt">');
    expect(h).toContain('<span class="mt-rad"><span class="mt-frac"><span class="mt-num">1</span><span class="mt-den">2</span></span></span>');
    expect(count(h, /class="mt-frac"/g)).toBe(2);
    expect(tex('2^{~frac{1}{2}}')).toContain('<span class="mt-sup"><span class="mt-frac">');
    expect(tex('x^{2^{3}}')).toContain('<span class="mt-sup">2<span class="mt-sup">3</span></span>');
  });
  test('높은 밑(분수·큰 괄호)의 지수는 더 올린다 (mt-hi)', () => {
    expect(hasClass(tex('~left(~frac{1}{2}~right)^{3}'), 'mt-sup mt-hi')).toBe(true);
    expect(hasClass(tex('x^{3}'), 'mt-hi')).toBe(false);
  });
  test('\\left \\right: 높은 내용은 CSS 로 그린 늘어나는 괄호, 한 줄 내용은 보통 괄호 글자', () => {
    const h = tex('~left(~frac{1}{2}~right)');
    expect(h).toContain('<span class="mt-delim mt-tall"><span class="mt-dl mt-dl-p" aria-hidden="true"></span><span class="mt-dbody">');
    expect(h).toContain('<span class="mt-dl mt-dl-p mt-dl-r" aria-hidden="true"></span></span>');
    expect(tex('~left( x+1 ~right)')).toContain('<span class="mt-delim">(<span class="mt-dbody">');
    expect(hasClass(tex('~left[~frac{a}{b}~right]'), 'mt-dl mt-dl-b')).toBe(true);
    expect(tex('~left~{~frac{a}{b}~right~}')).toContain('<span class="mt-dl mt-dl-c" aria-hidden="true"><span></span></span>');
    expect(hasClass(tex('~left|~frac{-3}{4}~right|'), 'mt-dl mt-dl-v')).toBe(true);
    expect(count(tex('~left. ~frac{x^2}{2} ~right|_{0}^{1}'), /class="mt-dl /g)).toBe(1);
  });
  test('cases: 왼쪽 큰 중괄호 + 칸(식·조건)', () => {
    const c = tex('~begin{cases} x+y=5 ~~ x-y=1 ~end{cases}');
    expect(hasClass(c, 'mt-cases')).toBe(true);
    expect(c).toContain('<span class="mt-dl mt-dl-c" aria-hidden="true"><span></span></span>');
    expect(hasClass(c, 'mt-grid mt-grid-cases')).toBe(true);
    expect(count(c, /class="mt-cell"/g)).toBe(2);
    const f = tex('f(x)=~begin{cases} x & (x~ge 0) ~~ -x & (x<0) ~end{cases}');
    expect(f).toContain('grid-template-columns:repeat(2,auto)');
    expect(count(f, /class="mt-cell"/g)).toBe(4);
  });
  test('행렬 pmatrix·bmatrix, 행렬식 vmatrix', () => {
    const p = tex('~begin{pmatrix} 1 & 2 ~~ 3 & 4 ~end{pmatrix}');
    expect(hasClass(p, 'mt-mat mt-mat-p')).toBe(true);
    expect(p).toContain('grid-template-columns:repeat(2,auto)');
    expect(count(p, /class="mt-cell"/g)).toBe(4);
    expect(count(p, /class="mt-dl mt-dl-p/g)).toBe(2);
    const b = tex('~begin{bmatrix} a & b ~~ c & d ~end{bmatrix}');
    expect(hasClass(b, 'mt-mat mt-mat-b')).toBe(true);
    expect(count(b, /class="mt-dl mt-dl-b/g)).toBe(2);
    const v = tex('~begin{vmatrix} a & b ~~ c & d ~end{vmatrix}=ad-bc');
    expect(hasClass(v, 'mt-mat mt-mat-v')).toBe(true);
    expect(count(v, /class="mt-dl mt-dl-v/g)).toBe(2);
    expect(count(tex('~begin{pmatrix} 1 ~~ 2 ~~ ~end{pmatrix}'), /class="mt-cell"/g)).toBe(2); // 끝의 \\ 는 빈 줄을 만들지 않는다
  });
  test('큰 연산자: .mt-big > .mt-over + .mt-sym + .mt-under (∫ 는 mt-int, lim 은 아래만)', () => {
    expect(tex('~sum_{k=1}^{n} k')).toMatch(/<span class="mt-big"><span class="mt-over"><i class="mt-v">n<\/i><\/span><span class="mt-sym">∑<\/span><span class="mt-under"><i class="mt-v">k<\/i><span class="mt-rel">=<\/span>1<\/span><\/span>/);
    expect(tex('~prod_{i=1}^{n} i')).toContain('<span class="mt-sym">∏</span>');
    expect(tex('~int_{a}^{b} f(x)~,dx')).toContain('<span class="mt-big mt-int"><span class="mt-over"><i class="mt-v">b</i></span><span class="mt-sym">∫</span><span class="mt-under"><i class="mt-v">a</i></span></span>');
    expect(tex('~lim_{x ~to 0} f(x)')).toContain('<span class="mt-big mt-lim"><span class="mt-sym mt-fn">lim</span><span class="mt-under"><i class="mt-v">x</i><span class="mt-rel">→</span>0</span></span>');
    expect(hasClass(tex('~sum k'), 'mt-big mt-bare')).toBe(true);
  });
  test('꾸밈: 선분·반직선(벡터)·호·모자·평균', () => {
    expect(tex('~overline{AB}')).toContain('<span class="mt-ol"><i class="mt-v">A</i><i class="mt-v">B</i></span>');
    expect(tex('~overrightarrow{AB}')).toContain('<span class="mt-acc mt-vec"><span class="mt-acc-mark" aria-hidden="true"></span><i class="mt-v">A</i>');
    expect(hasClass(tex('~vec{a}'), 'mt-acc mt-vec')).toBe(true);
    expect(hasClass(tex('~widehat{AB}'), 'mt-acc mt-arc')).toBe(true);
    expect(tex('~hat{p}')).toContain('<span class="mt-acc-mark mt-acc-ch" aria-hidden="true">^</span><i class="mt-v">p</i>');
    expect(tex('~bar{x}')).toContain('<span class="mt-ol"><i class="mt-v">x</i></span>');
  });
  test('순열·조합: {}_{n}C_{r}, {}_{n}P_{r}, \\binom', () => {
    expect(tex('{}_{5}~mathrm{C}_{2}')).toContain('<span class="mt-sub">5</span><span class="mt-text mt-rm">C</span><span class="mt-sub">2</span>');
    expect(tex('{}_{n}~mathrm{P}_{r}')).toContain('<span class="mt-text mt-rm">P</span>');
    const b = tex('~binom{5}{2}');
    expect(hasClass(b, 'mt-frac mt-nobar')).toBe(true);
    expect(count(b, /class="mt-dl mt-dl-p/g)).toBe(2);
  });
  test('공백 명령 \\, \\; \\quad \\(공백)', () => {
    expect(tex('a~,b')).toContain('mt-sp-thin');
    expect(tex('a~;b')).toContain('mt-sp-med');
    expect(tex('a~quad b')).toContain('mt-sp-quad');
    expect(tex('a~ b')).toContain('mt-sp-med');
  });
  test('SVG 를 쓰지 않는다 (괄호·근호·화살표·호는 CSS)', () => {
    const all = tex('~sqrt{~frac{1}{2}} ~left(~frac{1}{2}~right) ~overrightarrow{AB} ~widehat{AB} ~begin{pmatrix}1~end{pmatrix} ~begin{cases}1~end{cases}');
    expect(all).not.toContain('<svg');
  });
  test('수식은 role="math" + 평문 aria-label, 화면 글자는 aria-hidden', () => {
    expect(tex('~frac{3}{4}')).toMatch(/^<span class="mt" role="math" aria-label="3\/4"><span class="mt-in" aria-hidden="true">/);
  });
  test('긴 한 줄 수식은 맨 바깥 관계 기호 뒤에서만 줄을 바꿀 수 있다 (<wbr>), 가운데 블록은 나누지 않는다', () => {
    const h = tex('x^2-5x+6=(x-2)(x-3)');
    expect(h).toContain('<span class="mt-in mt-wrap" aria-hidden="true"><span class="mt-c">');
    expect(count(h, /<wbr>/g)).toBe(1);
    expect(tex('x=2')).not.toContain('<wbr>'); // 짧은 수식은 통째로 넘긴다
    expect(count(T.render('답: $x^2+2x+1=(x+1)^2=0$'), /<wbr>/g)).toBe(2);
    expect(T.render('$x^2+2x+1=(x+1)^2=0$')).not.toContain('<wbr>');
  });
  test('관계 기호 사이가 길면 괄호 밖의 + − 뒤에서도 줄을 바꿀 수 있다 (곱·괄호 안·부호는 나누지 않는다)', () => {
    // 휴대폰(360px)에서 '=' 사이 한 덩어리가 화면보다 넓어 가로로 넘치던 수식
    const h = tex('x^{2}+y^{2}+4+2xy+4y+4x=x^{2}+y^{2}+2^{2}+2~cdot x~cdot y+2~cdot y~cdot2+2~cdot2~cdot x=(x+y+2)^{2}');
    const parts = h.split('<wbr>');
    expect(parts).toHaveLength(13); // 덩어리마다 + 다섯 번 뒤 + '=' 두 번 뒤
    expect(parts[0]).toMatch(/<span class="mt-op">\+<\/span><\/span>$/);   // + 는 앞 덩어리 끝에 남는다
    expect(parts[5]).toMatch(/<span class="mt-rel">=<\/span><\/span>$/);
    expect(h).not.toMatch(/·<\/span><\/span><wbr>/);                     // 2·x·y 같은 곱은 붙어 있다
    expect(count(parts[12], /class="mt-op"/g)).toBe(2);                     // (x+y+2)^2 는 통째로
    expect(h).toContain('aria-label="x²+y²+4+2xy+4y+4x = ');                // 화면 읽기용 평문은 그대로
    // 짧은 덩어리는 + 뒤에서 나누지 않는다
    expect(count(tex('x^2-5x+6=(x-2)(x-3)'), /<wbr>/g)).toBe(1);
    // 관계 기호 없이 긴 식도 + − 뒤에서 나누고, 괄호 안은 그대로
    expect(count(tex('3x^{2}y-6xy^{2}+9xy+12x^{2}y^{2}-15xy^{3}'), /<wbr>/g)).toBe(4);
    expect(count(tex('2(a+b+c+d+e+f+g+h+i+j)'), /<wbr>/g)).toBe(0);
    // 부호(단항 −) 뒤에서는 나누지 않는다
    expect(count(tex('-3x^{2}+-4y^{2}+5z^{2}+6w^{2}+7v^{2}'), /<wbr>/g)).toBe(4);
  });
  test('비의 쌍점(3 : 4)은 관계 기호처럼 띄운다', () => {
    expect(tex('3:4')).toContain('3<span class="mt-rel">:</span>4');
    expect(T.plain('$3:4$')).toBe('3 : 4');
  });
  test('자릿점 쉼표(1,000)는 붙이고 좌표·나열의 쉼표 (1, 2) 는 띄운다', () => {
    expect(tex('1,000+2,500')).toContain('1,000<span class="mt-op">+</span>2,500');
    expect(tex('(1,2)')).toContain('<span class="mt-punct">,</span>');
  });
});

test.describe('평문 plain (검색·aria-label)', () => {
  test('계약의 예: 분수·거듭제곱·근호·곱하기·부등호', () => {
    expect(T.plain(S('$~frac{3}{4}$'))).toBe('3/4');
    expect(T.plain('$x^{2}$')).toBe('x²');
    expect(T.plain('$x^{10}$')).toBe('x^10');
    expect(T.plain(S('$~sqrt{2}$'))).toBe('√2');
    expect(T.plain(S('$3~times 4$'))).toBe('3×4');
    expect(T.plain(S('$a ~le b$'))).toBe('a ≤ b');
  });
  test('대분수·복잡한 분자·근호·n제곱근·첨자·도·조합', () => {
    expect(T.plain(S('$2~frac{1}{3}$'))).toBe('2 1/3');
    expect(T.plain(S('$~frac{x+1}{2}$'))).toBe('(x+1)/2');
    expect(T.plain(S('$~sqrt{x+1}$'))).toBe('√(x+1)');
    expect(T.plain(S('$~sqrt[3]{8}$'))).toBe('∛8');
    expect(T.plain('$a_1+a_{n+1}$')).toBe('a₁+a_(n+1)');
    expect(T.plain('$x^{n+1}$')).toBe('x^(n+1)');
    expect(T.plain(S('$90^~circ$'))).toBe('90°');
    expect(T.plain(S('${}_{5}~mathrm{C}_{2}$'))).toBe('₅C₂');
  });
  test('한글·기호·함수·큰 연산자', () => {
    expect(T.plain(S('$~text{넓이}=가로~times세로$'))).toBe('넓이 = 가로×세로');
    expect(T.plain(S('$~angle A=90^~circ$'))).toBe('∠A = 90°');
    expect(T.plain(S('$2~sin x+~log_2 8$'))).toBe('2 sin x+log₂ 8');
    expect(T.plain(S('$~lim_{x~to 0}~frac{~sin x}{x}$'))).toBe('lim(x→0) (sin x)/x');
    expect(T.plain(S('$~sum_{k=1}^{n} k$'))).toBe('∑[k=1~n] k');
    expect(T.plain(S('$~overline{AB}$'))).toBe('AB');
    expect(T.plain('$1,000$')).toBe('1,000');
  });
  test('연립방정식·행렬', () => {
    expect(T.plain(S('$~begin{cases} x+y=5 ~~ x-y=1 ~end{cases}$'))).toBe('{ x+y = 5, x−y = 1 }');
    expect(T.plain(S('$~begin{pmatrix} 1 & 2 ~~ 3 & 4 ~end{pmatrix}$'))).toBe('[1, 2; 3, 4]');
  });
  test('마크다운 기호·목록 표시·표 구분선을 지운다', () => {
    expect(T.plain('**굵게** 와 __밑줄__')).toBe('굵게 와 밑줄');
    expect(T.plain('- 하나\n- 둘\n1. 셋')).toBe('하나\n둘\n셋');
    expect(T.plain('### 정리\n\n> 💡 분모는 그대로')).toBe('정리\n\n💡 분모는 그대로');
    expect(T.plain('| 가 | 나 |\n|---|---|\n| 1 | 2 |')).toBe('가 · 나\n1 · 2');
    expect(T.plain(S('가격은 ~$5'))).toBe('가격은 $5');
  });
  test('빈칸의 답은 평문에도 나오지 않는다', () => {
    expect(T.plain('3 + [[5]] = 8, [[?]]')).toBe('3 + (   ) = 8, □');
    expect(T.plain('$3+[[5]]=8$')).toBe('3+(   ) = 8');
  });
  test('평문에는 TeX 명령·$·HTML 표시가 남지 않는다', () => {
    const p = T.plain(S('$~frac{~sqrt{2}}{~pi}~times~left(~alpha~right)$ 와 **$x$**'));
    expect(p).toBe('√2/π×(α) 와 x');
    expect(p).not.toMatch(/[\\$*]/);
  });
});

test.describe('검사 check', () => {
  // 실제 교과 문장 (초등 → 대학, 여러 과목). ~ 는 백슬래시
  const OK = [
    '사과 3개와 배 2개가 있어요. 과일은 모두 몇 개일까요?',
    '$7+5=12$ 예요. 10을 만들고 남은 2를 더해요.',
    '$36 ~div 4 = 9$ 이므로 한 사람이 9개씩 가져요.',
    '분모는 그대로 두고 분자끼리 더해요. $~frac{2}{5}+~frac{1}{5}=~frac{3}{5}$',
    '$1~frac{3}{4}$은 $~frac{7}{4}$와 같아요.',
    '직사각형의 넓이: $~text{넓이}=~text{가로}~times~text{세로}$',
    '3 + [[?]] = 8 에서 빈칸에 알맞은 수를 구하세요. 답: [[5]]',
    '시계의 긴바늘이 **6**을 가리키면 30분이에요.',
    '| 요일 | 월 | 화 | 수 |\n|---|---|---|---|\n| 우유(개) | 3 | 5 | 2 |',
    '> 💡 받아올림이 있으면 십의 자리에 1을 더해요.',
    '$x^2-5x+6=0$의 두 근을 구하세요.',
    '연립방정식 $~begin{cases} 2x+y=7 ~~ x-y=2 ~end{cases}$을 풀어요.',
    '$~left(~frac{1}{2}~right)^{3}=~frac{1}{8}$',
    '$~angle A+~angle B+~angle C=180^~circ$',
    '$~overline{AB}=~overline{CD}$ 이고 $~triangle ABC ~equiv ~triangle DEF$',
    '$~sqrt{2}~approx 1.414$, $~sqrt[3]{27}=3$',
    '일차함수 $y=ax+b$의 그래프에서 $a$는 기울기, $b$는 $y$절편이에요.',
    '$-3-(-5)=-3+5=2$',
    '부등식 $2x+1>5$의 해는 $x>2$예요.',
    '1. 양변에 같은 수를 더해도 등식은 성립해요.\n2. 양변을 0이 아닌 같은 수로 나누어도 성립해요.',
    '$~lim_{x ~to 2}~frac{x^2-4}{x-2}=4$',
    '$~int_{0}^{2} 3x^2~,dx=8$',
    "$f'(x)=2x$ 이므로 $f~prime(1)=2$",
    '$~log_{2} 8=3$, $~sin^{2}~theta+~cos^{2}~theta=1$',
    '$~sum_{k=1}^{n} k=~frac{n(n+1)}{2}$',
    '$P(A ~cap B)=P(A)P(B)$이면 두 사건은 서로 독립이에요.',
    '${}_{5}~mathrm{C}_{2}=~binom{5}{2}=10$',
    '$~begin{vmatrix} a & b ~~ c & d ~end{vmatrix}=ad-bc$',
    '$~vec{a}~cdot~vec{b}=|~vec{a}||~vec{b}|~cos~theta$',
    '$A=~begin{pmatrix} 1 & 2 ~~ 3 & 4 ~end{pmatrix}$의 역행렬을 구하세요.',
    '$~{1, 2, 3~}$은 집합이에요. $2 ~in A$, $A ~cup B$',
    '$~text{속력}=~dfrac{~text{거리}}{~text{시간}}$, $v=~dfrac{s}{t}$',
    '다음 문장에서 __밑줄 친 부분__의 품사를 고르세요.',
    'I **am** a student. 이 문장의 동사는 **am** 이에요.',
    '가격은 ~$5예요.',
  ].map(S);
  // 수식 밖의 일반 기호(%, &, #, ~, _ 한 개, 부등호, 백슬래시)는 오류가 아니다 — S() 를 거치지 않는다
  const RAW_OK = ['물가가 50% 올랐어요. #1 & 2번 문항, 약 ~3km, snake_case', '3<5 이고 a<b 이고 c>d 예요', '경로는 C:' + B + 'temp 예요'];
  for (const s of OK.concat(RAW_OK)) {
    test('정상: ' + s.slice(0, 28).replace(/\n/g, ' '), () => {
      expect(T.check(s)).toEqual([]);
    });
  }
  const BAD = [
    ['$~frac{3}$', /~frac 의 분모에 들어갈 내용이 없어요/],
    ['$~sqrt$', /~sqrt 의 안에 들어갈 내용이 없어요/],
    ['$x^$', /위첨자에 들어갈 내용이 없어요/],
    ['$x_$', /아래첨자에 들어갈 내용이 없어요/],
    ['$x^2^3$', /첨자가 겹쳐요/],
    ['$~foo{x}$', /모르는 TeX 명령이 있어요: ~foo/],
    ['${x+1$', /\{ 가 닫히지 않았어요/],
    ['$x}$', /짝이 없는 \}/],
    ['$~left( x$', /~left 의 짝 ~right 가 없어요/],
    ['$x ~right)$', /~right 의 짝 ~left 가 없어요/],
    ['$~begin{cases} x ~end{pmatrix}$', /~end\{pmatrix\} 로 닫았어요/],
    ['$~begin{cases} x$', /짝 ~end\{cases\} 가 없어요/],
    ['$x ~end{cases}$', /~end 의 짝 ~begin 이 없어요/],
    ['$~begin{foo} x ~end{foo}$', /모르는 환경/],
    ['$a & b$', /& 는 행렬·cases 안에서만/],
    ['닫히지 않은 $x+1', /닫히지 않은 \$/],
    ['빈 수식 $$ 이에요', /빈 수식/],
    ['공백뿐인 $ $', /빈 수식/],
    ['| a | b |\n|---|---|\n| 1 |', /칸 수가 맞지 않아요 — 이 줄 1칸, 첫 줄 2칸/],
    ['| a | b |\n|---|\n| 1 | 2 |', /구분선/],
    ['**굵게 짝이 없음', /굵게\(\*\*\) 표시의 짝/],
    ['__밑줄 짝이 없음', /밑줄\(__\) 표시의 짝/],
    ['[[빈칸이 닫히지 않음', /빈칸 \[\[ 가/],
    ['<b>굵게</b>', /HTML 태그/],
    ['$' + String.fromCharCode(12) + 'rac{3}{4}$', /제어 문자/],
    ['$3' + String.fromCharCode(9) + 'imes 4$', /제어 문자/],
    ['$sqrt{2}$', /백슬래시가 빠진 명령 같아요: sqrt/],
    ['$3 times 4$', /백슬래시가 빠진 명령 같아요: times/],
  ].map(([s, re]) => [S(s), new RegExp(re.source.split('~').join('\\\\'))]);
  for (const [s, re] of BAD) {
    test('오류: ' + s.slice(0, 26).replace(/[\n\f\t]/g, ' '), () => {
      const errs = T.check(s);
      expect(errs.length, JSON.stringify(errs)).toBeGreaterThan(0);
      expect(errs.join(' / ')).toMatch(re);
      for (const e of errs) expect(e).toMatch(/번째 (글자|줄)/); // 어느 위치인지 알린다
    });
  }
  test('위치를 줄·글자로 정확히 알린다', () => {
    expect(T.check('가나 $x+1')[0]).toMatch(/^4번째 글자: 닫히지 않은 \$/);
    expect(T.check(S('첫 줄\n둘째 $~foo$'))[0]).toMatch(/^2번째 줄 5번째 글자: 모르는 TeX 명령이 있어요: \\foo/);
    expect(T.check('| a | b |\n|---|---|\n| 1 |')[0]).toMatch(/^3번째 줄:/);
  });
  test('null·undefined·문자열 아닌 값은 오류, 숫자는 정상', () => {
    expect(T.check(null).length).toBe(1);
    expect(T.check(undefined).length).toBe(1);
    expect(T.check({}).length).toBe(1);
    expect(T.check(12)).toEqual([]);
  });
});

test.describe('견고함·성능', () => {
  test('이상한 입력에도 throw 하지 않는다', () => {
    const weird = ['$', '$$$', B, B + B + B, '$' + B + '$', '{{{', '}}}', '$^_^$', S('$~frac$'), '[[]]', '[[', ']]', '|', '||||', '\u0000',
      S('$~begin{cases}$'), S('$~left$'), S('$~right$'), S('$~sqrt[$'), '$' + '{'.repeat(200) + '$', '**'.repeat(50), '- ', '> ', '### ', '| |\n|-|'];
    for (const s of weird) {
      expect(() => T.render(s), JSON.stringify(s)).not.toThrow();
      expect(() => T.inline(s)).not.toThrow();
      expect(() => T.plain(s)).not.toThrow();
      expect(() => T.check(s)).not.toThrow();
      expect(() => T.tex(s)).not.toThrow();
    }
  });
  test('null·undefined·숫자 입력', () => {
    expect(T.render(null)).toBe('<div class="rt"></div>');
    expect(T.inline(undefined)).toBe('<span class="rt-inline"></span>');
    expect(T.plain(null)).toBe('');
    expect(T.render(12)).toBe('<div class="rt"><p>12</p></div>');
    expect(() => T.tex(undefined)).not.toThrow();
  });
  test('서식 글 500개 렌더가 50ms 안팎', () => {
    const src = S('분모는 그대로 $~frac{2}{5}+~frac{1}{5}=~frac{3}{5}$ 이고 **굵게** 와 $x^2+~sqrt{x+1}$\n\n- 목록 $a_n$\n- 둘\n\n| $x$ | 1 |\n|---|---|\n| $y$ | 2 |');
    for (let i = 0; i < 100; i++) T.render(src + i); // 데우기
    // 세 번 재어 가장 빠른 것으로 판정한다 — 같은 PC 의 다른 일 때문에 한 번 재기가 흔들린다(2026-10-08). 한도는 그대로
    const runs = [];
    for (let r = 0; r < 3; r++) {
      const t0 = process.hrtime.bigint();
      for (let i = 0; i < 500; i++) T.render(src + i);
      runs.push(Number(process.hrtime.bigint() - t0) / 1e6);
    }
    const ms = Math.min(...runs);
    expect(ms, '500개 렌더 ' + runs.map((x) => x.toFixed(0)).join(' / ') + 'ms').toBeLessThan(150); // 이 PC 에서 약 30~50ms. 느린 CI 를 생각해 여유를 둔다
  });
  test('UMD: 브라우저처럼 실으면 전역 TutorText, ES2018 문법(?. ?? 없음)', () => {
    const fs = require('fs');
    const vm = require('vm');
    const code = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'mathtext.js'), 'utf8');
    const ctx = { self: {} };
    vm.runInNewContext(code, ctx);
    for (const k of ['render', 'inline', 'tex', 'plain', 'check']) expect(typeof ctx.self.TutorText[k]).toBe('function');
    expect(code).not.toMatch(/[\w)\]]\?\.[\w([]|\?\?/);
  });
});

test.describe('css/mathtext.css', () => {
  const css = require('fs').readFileSync(path.join(__dirname, '..', '..', 'css', 'mathtext.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  test('색을 박지 않는다(currentColor·반투명 회색만), 웹 글꼴·외부 파일·SVG 없음', () => {
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(css).not.toMatch(/(?<![\w-])(black|white|red|blue|green|gray|grey|navy)(?![\w-])/i);
    expect(css).not.toMatch(/@font-face|@import|url\(|svg/i);
    for (const c of css.match(/rgba?\([^)]*\)/g) || []) expect(c).toMatch(/^rgba\(127, 127, 127, \.\d+\)$/);
    expect(css).toContain('currentColor');
  });
  test('계약 클래스의 모양이 있다', () => {
    for (const sel of ['.rt-blank', '.rt-q', '.rt-u', '.rt-box', '.rt-table', '.rt-h', '.mt-frac', '.mt-num', '.mt-den', '.mt-sqrt', '.mt-rad', '.mt-idx',
      '.mt-sup', '.mt-sub', '.mt-supsub', '.mt-v', '.mt-fn', '.mt-op', '.mt-rel', '.mt-big', '.mt-over', '.mt-sym', '.mt-under', '.mt-ol', '.mt-vec',
      '.mt-mat', '.mt-cases', '.mt-delim', '.mt-text', '.mt-block']) {
      expect(css, sel).toContain(sel);
    }
    expect(css).toMatch(/\.mt-frac \{[^}]*inline-flex;[^}]*flex-direction: column/);
    expect(css).toMatch(/\.mt-rad \{[^}]*border-top/);
    expect(css).toMatch(/\.mt-block \{[^}]*overflow-x: auto/);
    expect(css).toMatch(/\.mt-v \{[^}]*font-style: italic/);
    expect(css).toMatch(/\.mt-grid \{[^}]*inline-grid/);
    expect(css).toMatch(/\.rt-blank \{[^}]*border: 1\.5px solid currentColor/);
  });
});
