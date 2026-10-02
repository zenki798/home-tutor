const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/*
 * js/solver.js (TutorSolver) — 브라우저 없이 검사한다.
 * 학생이 친 그대로의 질문(공백·한글 섞임·전각 기호·말꼬리)을 풀어 정확한 답과 풀이 단계를 내는지,
 * 학년에 맞는 말투인지, 모르는 질문에는 null(모르겠어요)을 내는지 본다.
 * 풀이 단계·답은 모두 서식 글(ARCHITECTURE §3)이어야 한다 — mathtext.js 가 있으면 TutorText.check 로도 확인한다.
 */

const S = require(path.resolve(__dirname, '..', '..', 'js', 'solver.js'));
const TEXT_FILE = path.resolve(__dirname, '..', '..', 'js', 'mathtext.js');
const TT = fs.existsSync(TEXT_FILE) ? require(TEXT_FILE) : null;

/* ---------- 서식 글 검사 (TutorText 와 따로, 계약 §3.3 의 TeX 부분집합만 쓰는지) ---------- */

const ALLOWED_CMDS = new Set((
  'frac dfrac sqrt times div pm mp cdot le ge leq geq ne neq approx equiv sim simeq cong propto lt gt ' +
  'alpha beta gamma delta theta lambda mu pi sigma phi omega Delta Sigma Omega ' +
  'infty angle triangle square circ degree cdots ldots therefore because perp parallel prime ' +
  'in notin subset subseteq supset cup cap emptyset varnothing forall exists neg land lor setminus ' +
  'to rightarrow leftarrow Rightarrow Leftarrow Leftrightarrow leftrightarrow iff implies ' +
  'sin cos tan log ln lim max min exp det sum int prod overline overrightarrow vec hat bar widehat ' +
  'text mathrm mathbf binom left right quad begin end'
).split(' '));
const ALLOWED_SYMS = new Set(['{', '}', ',', ';', ' ', '%', '\\', ':']);
const RAW_OK = /^[A-Za-z0-9가-힣\s+\-=<>()[\],.:;!'|^_{}&]$/;

function mathParts(src) {
  const parts = String(src).split('$');
  return parts.filter((_, i) => i % 2 === 1);
}
function outsideMath(src) {
  return String(src).split('$').filter((_, i) => i % 2 === 0).join(' ');
}
// 문제점 목록 (정상이면 [])
function texProblems(src) {
  const out = [];
  const s = String(src);
  if ((s.split('$').length - 1) % 2) out.push('닫히지 않은 $');
  for (const m of mathParts(s)) {
    if (!m.trim()) out.push('빈 수식');
    let depth = 0;
    for (let i = 0; i < m.length; i++) {
      const c = m[i];
      if (c === '\\') {
        const rest = m.slice(i + 1);
        const word = /^[A-Za-z]+/.exec(rest);
        if (word) {
          if (!ALLOWED_CMDS.has(word[0])) out.push('모르는 명령 \\' + word[0]);
          i += word[0].length;
        } else {
          if (!ALLOWED_SYMS.has(rest[0])) out.push('모르는 기호 명령 \\' + rest[0]);
          i += 1;
        }
        continue;
      }
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth < 0) out.push('닫는 중괄호가 남음'); }
      else if (!RAW_OK.test(c)) out.push('수식 안에 쓸 수 없는 글자 "' + c + '"');
    }
    if (depth !== 0) out.push('중괄호 짝이 안 맞음: ' + m);
  }
  if (/undefined|NaN|Infinity|\[object|null/.test(s)) out.push('잘못된 값이 글에 섞임');
  return out;
}

function checkFormat(r, label) {
  const texts = [r.title, r.answer].concat(r.steps);
  for (const t of texts) {
    expect(typeof t, label).toBe('string');
    expect(texProblems(t), label + ' → ' + t).toEqual([]);
    if (TT) expect(TT.check(t), label + ' → ' + t).toEqual([]);
  }
}

function solve(q, grade) { return S.solve(q, { grade: grade }); }

// 풀려야 하는 질문: 종류·답(포함할 글자들)·단계·서식을 함께 본다
function solved(q, kind, answerParts, grade) {
  const r = solve(q, grade === undefined ? 'm2' : grade);
  expect(r, q).not.toBeNull();
  expect(r.kind, q).toBe(kind);
  expect(Array.isArray(r.steps) && r.steps.length > 0, q + ' 의 풀이 단계').toBe(true);
  for (const p of [].concat(answerParts)) expect(r.answer, q).toContain(p);
  checkFormat(r, q);
  return r;
}
function allText(r) { return [r.title, r.answer].concat(r.steps).join('\n'); }

/* ================================================================ */

test.describe('arith — 계산', () => {
  test('계약 예시를 정확히 푼다', () => {
    solved('3/4 ÷ 2/5', 'arith', ['\\frac{15}{8}', '1.875']);
    solved('1과 1/2 + 2/3', 'arith', '\\frac{13}{6}');
    solved('2.5×4-1', 'arith', '$9$');
    solved('(3+4)×2', 'arith', '$14$');
    solved('2^10', 'arith', '$1024$');
    solved('√16', 'arith', '$4$');
    solved('-3-(-5)', 'arith', '$2$');
  });

  test('분수: 통분·약분·역수를 단계로 보여 준다', () => {
    const add = solved('3/4 + 2/5', 'arith', ['\\frac{23}{20}', '1.15']);
    expect(allText(add)).toContain('통분');
    expect(allText(add)).toContain('\\frac{15}{20}+\\frac{8}{20}');
    const same = solved('2/7 + 3/7', 'arith', '\\frac{5}{7}');
    expect(allText(same)).toContain('분자끼리');
    const red = solved('1/6 + 1/3', 'arith', '\\frac{1}{2}');
    expect(allText(red)).toContain('약분');
    const div = solved('3/4 ÷ 2/5', 'arith', '\\frac{15}{8}');
    expect(allText(div)).toContain('나누는 수의 역수를 곱해요');
    expect(allText(div)).toContain('\\frac{3}{4}\\times\\frac{5}{2}');
    const mul = solved('2/3 × 9/4', 'arith', '\\frac{3}{2}');
    expect(allText(mul)).toContain('분자는 분자끼리');
  });

  test('계산 순서: 괄호 → 곱셈·나눗셈 → 덧셈·뺄셈, 한 단계씩', () => {
    const r = solved('2+3×4-6÷2', 'arith', '$11$');
    expect(r.steps.length).toBe(4);
    expect(r.steps[0]).toContain('곱셈과 나눗셈');
    expect(r.steps[0]).toContain('3\\times4=12');
    expect(r.steps[1]).toContain('6\\div2=3');
    const p = solved('(3+4)×2', 'arith', '$14$');
    expect(p.steps[0]).toContain('괄호');
    expect(p.steps[0]).toContain('3+4=7');
    solved('{(3+4)×2-1}÷13', 'arith', '$1$');
  });

  test('기약분수 · 초등은 대분수 병기 · 유한소수면 소수 병기', () => {
    expect(solve('7/4 + 1/2', 'e5').answer).toContain('2\\frac{1}{4}');
    expect(solve('7/4 + 1/2', 'm1').answer).not.toContain('2\\frac{1}{4}');
    expect(solve('7/4 + 1/2', 'm1').answer).toContain('\\frac{9}{4}=2.25');
    expect(solve('1/3 + 1/3', 'm1').answer).toBe('$\\frac{2}{3}$');      // 무한소수는 소수를 쓰지 않는다
    const q = solved('7÷2', 'arith', ['3\\frac{1}{2}', '3.5', '몫 3', '나머지 1'], 'e4');
    expect(allText(q)).toContain('나머지');
    solved('1.5+2.25', 'arith', '$3.75$');
    solved('0.1+0.2', 'arith', '$0.3$');
  });

  test('음수·거듭제곱·제곱근', () => {
    solved('(-2)^3', 'arith', '$-8$');
    solved('-2^2', 'arith', '$-4$');
    solved('(2/3)^2', 'arith', '\\frac{4}{9}');
    solved('√(9/4)', 'arith', '\\frac{3}{2}');
    solved('√12', 'arith', '2\\sqrt{3}');
    solved('16의 제곱근', 'arith', '\\pm4');
    const neg = solve('3-5', 'e3');
    expect(neg.answer).toBe('$-2$');
    expect(allText(neg)).toContain('중학교');                     // 초등에게 음수는 중학교에서 배운다고 알려 준다
  });

  test('0으로 나누기는 null 이 아니라 설명하는 결과', () => {
    for (const q of ['5÷0', '0÷0', '3/0', '1 + 4÷(2-2)']) {
      const r = solve(q, 'm1');
      expect(r, q).not.toBeNull();
      expect(r.kind).toBe('arith');
      expect(r.answer).toContain('0으로 나눌 수 없어요');
      expect(r.steps.join(' ')).toMatch(/0으로는 나눌 수 없|0으로 나누는 계산은 하지 않/);
      checkFormat(r, q);
    }
    expect(solve('5÷0', 'h2').answer).toContain('0으로 나눌 수 없습니다');
  });
});

test.describe('방정식·부등식', () => {
  test('linear — 일차방정식', () => {
    solved('2x+3=7', 'linear', '$x=2$');
    const p = solved('3(x-1)=2x+5', 'linear', '$x=8$');
    expect(allText(p)).toContain('분배법칙');
    const f = solved('x/2+1=4', 'linear', '$x=6$');
    expect(allText(f)).toContain('분모');
    solved('0.2x+0.5=1.3', 'linear', '$x=4$');
    solved('5-2x=3x+20', 'linear', '$x=-3$');
    solved('2x+1=0', 'linear', ['x=-\\frac{1}{2}', '-0.5']);
    expect(solve('x+1=x+2', 'm1').answer).toContain('해가 없어요');
    expect(solve('x+1=x+1', 'm1').answer).toContain('무수히');
  });

  test('linear — 초등은 □ 를 거꾸로 생각해서, 이항이라는 말 없이', () => {
    const r = solved('□+3=7', 'linear', '\\square=4', 'e2');
    expect(allText(r)).toContain('거꾸로');
    expect(allText(r)).not.toContain('이항');
    expect(allText(r)).not.toMatch(/[xy]=/);
    solved('2×□+3=11', 'linear', '\\square=4', 'e3');
    solved('(□+3)×2=14', 'linear', '\\square=4', 'e3');
    solved('20-□=8', 'linear', '\\square=12', 'e3');
    solved('36÷□=4', 'linear', '\\square=9', 'e3');
    solved('?+3=7', 'linear', '\\square=4', 'e2');
    expect(solve('3+4=□', 'e2').answer).toBe('$7$');
  });

  test('quad — 이차방정식 (인수분해 · 제곱근 · 근의 공식 · 판별식)', () => {
    const a = solved('x^2-5x+6=0', 'quad', ['x=2', 'x=3']);
    expect(allText(a)).toContain('인수분해');
    solved('2x²=8', 'quad', ['x=-2', 'x=2']);
    const b = solved('x^2+2x-1=0', 'quad', '-1\\pm\\sqrt{2}');
    expect(allText(b)).toContain('근의 공식');
    solved('2x^2-5x+3=0', 'quad', ['x=1', 'x=\\frac{3}{2}']);
    solved('4x^2-4x+1=0', 'quad', ['x=\\frac{1}{2}', '중근']);
    solved('(x-1)(x+2)=0', 'quad', ['x=-2', 'x=1']);
    solved('x^2-3x=0', 'quad', ['x=0', 'x=3']);
    solved('x^2-3x+1=0', 'quad', '\\frac{3\\pm\\sqrt{5}}{2}');
  });

  test('quad — 판별식이 음수면 중등은 "실수인 해가 없어요", 고등 이상은 허수 i', () => {
    const m = solved('x^2+2x+5=0', 'quad', '실수인 해가 없어요', 'm3');
    expect(allText(m)).not.toContain('i$');
    const h = solved('x^2+2x+5=0', 'quad', '-1\\pm2i', 'h1');
    expect(allText(h)).toContain('판별식');
    expect(solve('x^2+2x+5=0').answer).toContain('실수인 해가 없어요');          // 학년 모름 → 중등
    solved('x^2+x+1=0', 'quad', '\\frac{-1\\pm\\sqrt{3}i}{2}', 'u');
  });

  test('system — 연립방정식 (가감법 · 대입법 · 해가 무수히 많음/없음)', () => {
    const a = solved('x+y=5, x-y=1', 'system', ['$x=3$', '$y=2$']);
    expect(allText(a)).toContain('가감법');
    solved('2x+3y=12 그리고 x-y=1', 'system', ['$x=3$', '$y=2$']);
    solved('3x+2y=7, 5x-3y=-1', 'system', ['$x=1$', '$y=2$']);
    const b = solved('y=2x, x+y=6', 'system', ['$x=2$', '$y=4$']);
    expect(allText(b)).toContain('대입');
    solved('x+y=3, 2x+2y=6', 'system', '무수히');
    solved('x+y=3, x+y=5', 'system', '해가 없어요');
    solved('연립방정식 a+b=10, a-b=4 풀어줘', 'system', ['$a=7$', '$b=3$']);
  });

  test('ineq — 부등식: 음수로 나누면 방향이 바뀌고, 수직선 설명이 붙는다', () => {
    const a = solved('2x+1>5', 'ineq', ['$x>2$', '수직선']);
    expect(allText(a)).toContain('빈 동그라미');
    const b = solved('-3x≤9', 'ineq', ['x\\ge -3', '●']);
    expect(allText(b)).toContain('부등호의 방향이 바뀌어요');
    solved('3x-2<2x+1', 'ineq', '$x<3$');
    solved('x/3 > 2', 'ineq', '$x>6$');
    solved('2<x+1<5', 'ineq', '$1<x<4$');
    solved('1≤-2x+3<5', 'ineq', '-1<x\\le 1');
  });
});

test.describe('약수와 배수 · 약분', () => {
  test('gcd / lcm', () => {
    solved('12와 18의 최대공약수', 'gcd', '$6$');
    solved('4, 6, 10의 최소공배수', 'lcm', '$60$');
    solved('최대공약수 120 150', 'gcd', '$30$');
    solved('8과 12의 최소공배수는?', 'lcm', '$24$');
    const co = solved('7과 9의 최대공약수', 'gcd', '$1$');
    expect(allText(co)).toContain('서로소');
  });

  test('gcd / lcm — 초등은 약수·배수를 늘어놓고, 중등은 소인수분해로', () => {
    const e = solve('12와 18의 최대공약수', 'e5');
    expect(allText(e)).toContain('약수');
    expect(allText(e)).not.toContain('소인수분해');
    const m = solve('12와 18의 최대공약수', 'm1');
    expect(allText(m)).toContain('소인수분해');
    expect(allText(m)).toContain('2^{2}\\times3');
    expect(allText(solve('4와 6의 최소공배수', 'e5'))).toContain('배수');
  });

  test('factor — 소인수분해', () => {
    solved('360을 소인수분해', 'factor', '360=2^{3}\\times3^{2}\\times5');
    solved('1024 소인수분해', 'factor', '2^{10}');
    solved('97을 소인수분해 해줘', 'factor', '소수');
    solved('84의 소인수', 'factor', '2, 3, 7');
  });

  test('simplify — 약분·기약분수', () => {
    solved('12/18 약분', 'simplify', '$\\frac{2}{3}$');
    solved('24/36을 기약분수로', 'simplify', '$\\frac{2}{3}$');
    solved('1 6/8 약분', 'simplify', '1\\frac{3}{4}');
    solved('0.75를 기약분수로', 'simplify', '\\frac{3}{4}');
    const r = solved('3/7 약분', 'simplify', '\\frac{3}{7}');
    expect(allText(r)).toContain('기약분수');
  });
});

test.describe('백분율 · 단위', () => {
  test('percent', () => {
    solved('200의 15%', 'percent', '30');
    solved('30은 120의 몇 %', 'percent', '25%');
    solved('0.35를 백분율로', 'percent', '35%');
    solved('20000원의 15% 할인', 'percent', ['17,000원', '3000원']);
    solved('25%를 분수로', 'percent', '\\frac{1}{4}');
    solved('12.5%를 소수로', 'percent', '0.125');
    solved('3/4를 백분율로', 'percent', '75%');
  });

  test('unit — 길이·무게·들이·넓이·부피·시간, 복합 단위', () => {
    solved('3.5km는 몇 m', 'unit', '3500 m');
    solved('2시간 15분은 몇 분', 'unit', '135분');
    solved('1.2L는 몇 mL', 'unit', '1200 mL');
    solved('3kg 200g은 몇 g', 'unit', '3200 g');
    solved('135분은 몇 시간 몇 분', 'unit', '2시간 15분');
    solved('3200g은 몇 kg', 'unit', '3.2 kg');
    solved('150cm는 몇 m 몇 cm', 'unit', '1 m 50 cm');
    solved('2m²는 몇 cm²', 'unit', '20,000 cm²');
    solved('3ha는 몇 m²', 'unit', '30,000 m²');
    solved('1m³는 몇 cm³', 'unit', '1,000,000 cm³');
    solved('2.5t은 몇 kg', 'unit', '2500 kg');
    solved('5000cm³는 몇 L', 'unit', '5 L');
    solved('3일은 몇 시간', 'unit', '72시간');
  });
});

test.describe('식의 전개 · 미분 · 적분', () => {
  test('expand', () => {
    solved('(x+2)(x-3) 전개', 'expand', '$x^{2}-x-6$');
    solved('(2x-1)^2', 'expand', '$4x^{2}-4x+1$');
    solved('(a+b)^2', 'expand', '$a^{2}+2ab+b^{2}$');
    solved('(x+3)(x-3)', 'expand', '$x^{2}-9$');
    solved('2(x+3)-3(x-1)', 'expand', '$-x+9$');
    solved('2x+3x 간단히', 'expand', '$5x$');
    const f = solved('(x+1)(x+2)(x+3)', 'expand', '$x^{3}+6x^{2}+11x+6$');
    expect(allText(f)).toContain('동류항');
  });

  test('deriv — 다항함수 미분', () => {
    solved('x^3-2x+1 미분', 'deriv', "f'(x)=3x^{2}-2");
    solved('f(x)=(x+1)(x-1) 미분', 'deriv', "f'(x)=2x");
    solved('x^2+3x 의 x=2에서의 미분계수', 'deriv', "f'(2)=7");
    solved('y=5x^4 의 도함수', 'deriv', "y'=20x^{3}");
  });

  test('integ — 다항함수 적분 (정적분은 값까지 분수로 정확히)', () => {
    solved('3x^2+2x 적분', 'integ', '$x^{3}+x^{2}+C$');
    solved('0부터 2까지 x^2 적분', 'integ', '$\\frac{8}{3}$');
    solved('∫_1^3 (2x+1) dx', 'integ', '$10$');
    solved('x^2-1을 -1부터 1까지 적분', 'integ', '-\\frac{4}{3}');
    solved('1에서 2까지 x^3 정적분', 'integ', ['\\frac{15}{4}', '3.75']);
  });
});

test.describe('모르는 질문 · 크기 제한', () => {
  const NULLS = ['안녕', '사과 3개', 'x+y', '', '   ', '광합성이 뭐야', '이순신은 누구야', '3', 'x', 'abc', '2x+3y=7', 'x^3=8',
    'sin(x)', '2x', 'x^2', '3+4=7', 'x=3', '2 3', 'π+1', '분수의 나눗셈은 왜 뒤집어서 곱해요?', '최대공약수가 뭐야'];
  for (const q of NULLS) {
    test('null: ' + JSON.stringify(q), () => {
      expect(S.solve(q, { grade: 'm1' })).toBeNull();
      expect(S.detect(q)).toBeNull();
    });
  }

  test('연산이 20개를 넘는 식, 12자리를 넘는 수는 null', () => {
    const ops20 = Array(21).fill('1').join('+');           // 연산 20개
    const ops21 = Array(22).fill('1').join('+');           // 연산 21개
    expect(solve(ops20).answer).toBe('$21$');
    expect(solve(ops21)).toBeNull();
    expect(solve('123456789012+1').answer).toBe('$123456789013$');   // 12자리는 된다
    expect(solve('1234567890123+1')).toBeNull();
    expect(solve('2^60')).toBeNull();                       // 답이 너무 크면 정확히 계산할 수 없다
    expect(solve('1+'.repeat(150) + '1')).toBeNull();       // 너무 긴 질문
  });

  test('이상한 입력에도 예외를 던지지 않는다', () => {
    for (const x of [null, undefined, 123, {}, [], '((((', ')))', '=', '==', '÷÷', '□', '√', '%', '몇 m', 'x=', '1/', '∫', '미분', '적분']) {
      expect(() => S.solve(x, { grade: 'e1' })).not.toThrow();
      expect(() => S.detect(x)).not.toThrow();
    }
    expect(S.solve('3+4')).not.toBeNull();                 // opts 가 없어도 된다
    expect(S.solve('3+4', { grade: 'zz' })).not.toBeNull(); // 모르는 학년은 중등 말투
  });
});

test.describe('입력 다듬기', () => {
  test('학생이 친 그대로: 전각·말꼬리·물음표·곱하기 x·대문자·위 첨자', () => {
    const cases = [
      ['３＋４', '$7$'], ['3+4는?', '$7$'], ['3 + 4 = ?', '$7$'], ['3+4=', '$7$'], ['3+4 계산해 줘', '$7$'],
      ['1/2+1/3은 얼마야?', '$\\frac{5}{6}$'], ['12 곱하기 3', '$36$'], ['100 나누기 4', '$25$'], ['3x4', '$12$'],
      ['3 x 4', '$12$'], ['(3+4)x2', '$14$'], ['2*3', '$6$'], ['5−3', '$2$'], ['루트 25', '$5$'], ['2의 10제곱', '$1024$'],
      ['1과 4분의 3 + 2분의 1', '\\frac{9}{4}'], ['2x+3=7 풀어주세요', '$x=2$'], ['2X+3=7', '$x=2$'],
      ['x²-5x+6=0의 해는?', 'x=3'], ['다음 방정식을 푸시오: 3x-1=8', '$x=3$'],
    ];
    for (const [q, want] of cases) {
      const r = solve(q, 'm1');
      expect(r, q).not.toBeNull();
      expect(r.answer, q).toContain(want);
    }
  });

  test('detect 는 풀 수 있는 꼴의 종류를 알려 준다', () => {
    const kinds = {
      '3/4 ÷ 2/5': 'arith', '2x+3=7': 'linear', 'x^2-5x+6=0': 'quad', 'x+y=5, x-y=1': 'system', '2x+1>5': 'ineq',
      '12와 18의 최대공약수': 'gcd', '4, 6, 10의 최소공배수': 'lcm', '360을 소인수분해': 'factor', '12/18 약분': 'simplify',
      '200의 15%': 'percent', '3.5km는 몇 m': 'unit', '(x+2)(x-3) 전개': 'expand', 'x^3-2x+1 미분': 'deriv', '3x^2+2x 적분': 'integ',
    };
    for (const q of Object.keys(kinds)) expect(S.detect(q), q).toBe(kinds[q]);
  });
});

test.describe('학년에 맞는 말투', () => {
  test('초등: 쉬운 해요체, 이항·문자 없이 / 중등: 이항·통분 같은 교과 용어', () => {
    const e = solve('2/3 + 1/4', 'e5');
    const m = solve('2/3 + 1/4', 'm1');
    expect(allText(e)).toContain('분모를 같게 만들어요');
    expect(allText(m)).toContain('통분해요');
    const le = solve('□+5=12', 'e3'), lm = solve('x+5=12', 'm1');
    expect(allText(le)).toContain('거꾸로');
    expect(allText(lm)).toContain('이항');
    expect(allText(lm)).toContain('해요');
  });

  test('고등 이상은 합니다체 — 수식 밖에 "~요." 로 끝나는 말이 없다', () => {
    const qs = ['2x+3=7', '3/4 ÷ 2/5', 'x^2+2x-1=0', 'x+y=5, x-y=1', '-3x≤9', '12와 18의 최대공약수', '360을 소인수분해',
      '12/18 약분', '200의 15%', '3.5km는 몇 m', '(x+2)(x-3) 전개', 'x^3-2x+1 미분', '0부터 2까지 x^2 적분', '5÷0', 'x+1=x+1'];
    for (const g of ['h2', 'u', 'a']) {
      for (const q of qs) {
        const r = solve(q, g);
        expect(r, q).not.toBeNull();
        for (const t of [r.answer].concat(r.steps)) {
          expect(outsideMath(t), g + ' ' + q + ' → ' + t).not.toMatch(/요(?=[\s.!?,:;()\]~*]|$)/);
        }
      }
    }
    expect(allText(solve('2x+3=7', 'h1'))).toContain('이항합니다');
  });

  test('대학·성인은 간결하게 (검산 단계 생략)', () => {
    const h = solve('2x+3=7', 'h1'), u = solve('2x+3=7', 'u');
    expect(u.steps.length).toBeLessThan(h.steps.length);
    expect(allText(u)).not.toContain('확인');
  });
});

test.describe('서식 글 문법', () => {
  const CORPUS = [
    '3/4 ÷ 2/5', '1과 1/2 + 2/3', '2.5×4-1', '{(3+4)×2-1}÷13', '(-2)^3', '(2/3)^2', '2^-1', '√12', '√2', '16의 제곱근', '5÷0', '7÷3',
    '2x+3=7', '3(x-1)=2x+5', 'x/2+1=4', '0.2x+0.5=1.3', '□+3=7', '(□+3)×2=14', 'x+1=x+1',
    'x^2-5x+6=0', '2x²=8', 'x^2+2x-1=0', 'x^2+2x+5=0', '4x^2-4x+1=0', '(x-1)(x+2)=0', '2x^2=1',
    'x+y=5, x-y=1', '3x+2y=7, 5x-3y=-1', 'y=2x, x+y=6', 'x+y=3, x+y=5', '2x+1>5', '-3x≤9', '1≤-2x+3<5',
    '12와 18의 최대공약수', '4, 6, 10의 최소공배수', '36과 48의 최대공약수와 최소공배수', '360을 소인수분해', '84의 소인수', '1 6/8 약분',
    '200의 15%', '1은 3의 몇 %', '20000원의 15% 할인', '3kg 200g은 몇 g', '135분은 몇 시간 몇 분', '100분은 몇 시간', '2m²는 몇 cm²',
    '(2x-1)^2', '(2x+1)(3x-2)', '(x+1)(x+2)(x+3)', 'x^2+3x 의 x=2에서의 미분계수', '∫_1^3 (2x+1) dx', '3x^2+2x 적분',
  ];
  test('모든 학년에서 제목·단계·답이 TeX 부분집합과 서식 글 문법에 맞는다' + (TT ? ' (TutorText.check 포함)' : ''), () => {
    let n = 0;
    for (const g of ['e3', 'e6', 'm2', 'h1', 'u', undefined]) {
      for (const q of CORPUS) {
        const r = S.solve(q, { grade: g });
        if (!r) continue;
        checkFormat(r, (g || '-') + ' ' + q);
        n++;
      }
    }
    expect(n).toBeGreaterThan(CORPUS.length * 5);
  });

  test('수식 안에 / * ? × ÷ □ 같은 날 글자를 쓰지 않는다', () => {
    for (const q of CORPUS) {
      const r = S.solve(q, { grade: 'm2' });
      if (!r) continue;
      for (const m of mathParts(allText(r))) expect(m, q).not.toMatch(/[/*?×÷□%]/);
    }
  });
});
