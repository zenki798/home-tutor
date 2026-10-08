const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

/*
 * js/mathlib.js (TutorMath) — 브라우저 없이 검사한다.
 * 분수·정수 도구·난수와 문제 생성 도구(R)·식 계산·채점. 수백 개의 생성기와 채점이 이 모듈 위에 서므로
 * 정답이 정확한지, 경계(0·음수·큰 수·잘못된 입력)에서 조용히 틀리지 않는지 본다.
 */

const FILE = path.resolve(__dirname, '..', '..', 'js', 'mathlib.js');
const M = require(FILE);
const { F, Frac } = M;
const MAX = Number.MAX_SAFE_INTEGER;

/* checkAnswer 결과를 짧게: 'T'(맞음) 'F'(틀림) 'Fe'(빈 입력) */
function mark(problem, input) {
  const r = M.checkAnswer(problem, input);
  return (r.correct ? 'T' : 'F') + (r.empty ? 'e' : '');
}

test.describe('분수 Frac', () => {
  test('만들면 항상 기약분수, 분모는 양수, 0 은 0/1', () => {
    expect(F(2, 4)).toEqual({ num: 1, den: 2 });
    expect(F(3, -6)).toEqual({ num: -1, den: 2 });
    expect(F(-3, -6)).toEqual({ num: 1, den: 2 });
    expect(F(5)).toEqual({ num: 5, den: 1 });
    const zero = F(0, -5);
    expect(zero.den).toBe(1);
    expect(Object.is(zero.num, 0)).toBe(true); // -0 이 남지 않는다
    expect(F(1.5, 2)).toEqual({ num: 3, den: 4 }); // 유한소수도 정확히
    expect(new Frac(6, 8).toString()).toBe('3/4');
    expect(F(1, 2) instanceof Frac).toBe(true);
    expect(Object.isFrozen(F(1, 2))).toBe(true);
  });

  test('분모 0·범위 초과·수가 아닌 값은 throw', () => {
    expect(() => F(1, 0)).toThrow();
    expect(() => F(MAX + 1)).toThrow(RangeError);
    expect(() => F(NaN)).toThrow();
    expect(() => F(Infinity, 2)).toThrow();
  });

  test('Frac.from: 유한소수는 부동소수 오차 없이', () => {
    expect(Frac.from(0.1)).toEqual({ num: 1, den: 10 });
    expect(Frac.from(0.25)).toEqual({ num: 1, den: 4 });
    expect(Frac.from(-2.5)).toEqual({ num: -5, den: 2 });
    expect(Frac.from(1e-7)).toEqual({ num: 1, den: 10000000 });
    expect(Frac.from(123.456).toString()).toBe('15432/125');
    expect(Frac.from(MAX).toString()).toBe(String(MAX));
    // 부동소수 찌꺼기·무한소수 근삿값은 정확한 분수가 아니므로 throw (생성기 버그를 드러낸다)
    expect(() => Frac.from(0.1 + 0.2)).toThrow(RangeError);
    expect(() => Frac.from(1 / 3)).toThrow(RangeError);
    expect(() => Frac.from(1e21)).toThrow(RangeError);
  });

  test('Frac.from: 문자열', () => {
    const cases = {
      '3/4': '3/4', '-1 2/3': '-5/3', '1 2/3': '5/3', '0.25': '1/4', '2': '2', '1,000': '1000',
      ' -3 ': '-3', '+5': '5', '1,234.5': '2469/2', '.5': '1/2', '−3': '-3', '3 / 4': '3/4',
      '1.5/2': '3/4', '12,345,678': '12345678', '0.10000000000000000000': '1/10', '-0': '0',
    };
    for (const [s, want] of Object.entries(cases)) expect(Frac.from(s).toString(), s).toBe(want);
    for (const bad of ['abc', '', '   ', '1/0', '1,00', '3/-4', '--3', '1 000', '1.5 1/2', '1/2/3']) {
      expect(() => Frac.from(bad), JSON.stringify(bad)).toThrow();
    }
  });

  test('Frac.from: Frac·{num, den}·잘못된 값', () => {
    const f = F(3, 4);
    expect(Frac.from(f)).toBe(f);
    expect(Frac.from({ num: 6, den: 8 })).toEqual({ num: 3, den: 4 });
    expect(Frac.from(JSON.parse(JSON.stringify({ a: F(1, 2) })).a)).toEqual({ num: 1, den: 2 }); // 저장했다 되살려도
    expect(() => Frac.from(null)).toThrow();
    expect(() => Frac.from(undefined)).toThrow();
    expect(() => Frac.from(NaN)).toThrow();
  });

  test('사칙연산 (인자는 Frac·number·string)', () => {
    expect(F(1, 2).add(F(1, 3)).toString()).toBe('5/6');
    expect(F(1, 2).sub('3/4').toString()).toBe('-1/4');
    expect(F(2, 3).mul(F(9, 4)).toString()).toBe('3/2');
    expect(F(3, 4).div('2/5').toString()).toBe('15/8');
    expect(F(1, 10).add(0.2).toString()).toBe('3/10'); // 0.1 + 0.2 = 0.3 정확히
    expect(F(-3, 4).neg().toString()).toBe('3/4');
    expect(F(-3, 4).inv().toString()).toBe('-4/3');
    expect(F(-3, 4).abs().toString()).toBe('3/4');
    expect(F(2, 3).pow(3).toString()).toBe('8/27');
    expect(F(2, 3).pow(-2).toString()).toBe('9/4');
    expect(F(-2).pow(3).toString()).toBe('-8');
    expect(F(5, 7).pow(0).toString()).toBe('1');
    expect(() => F(3, 4).div(0)).toThrow();
    expect(() => F(0).inv()).toThrow();
    expect(() => F(0).pow(-1)).toThrow();
    expect(() => F(2).pow(1.5)).toThrow();
  });

  test('계산 결과가 안전한 정수 범위를 넘으면 throw', () => {
    expect(() => F(MAX).add(1)).toThrow(RangeError);
    expect(() => F(MAX).mul(2)).toThrow(RangeError);
    expect(() => F(2).pow(60)).toThrow(RangeError);
    expect(F(MAX, 2).sub(F(MAX, 2)).isZero()).toBe(true);
  });

  test('비교: cmp·eq·sign·isInt·isZero (곱이 범위를 넘는 큰 수도 정확히)', () => {
    expect(F(1, 2).cmp(F(2, 3))).toBe(-1);
    expect(F(2, 3).cmp('1/2')).toBe(1);
    expect(F(1, 2).cmp(0.5)).toBe(0);
    expect(F(-1, 2).cmp(0)).toBe(-1);
    // n/(n-1) < (n-1)/(n-2): 교차곱이 2^53 을 넘는다
    expect(F(MAX, MAX - 1).cmp(F(MAX - 1, MAX - 2))).toBe(-1);
    expect(F(MAX - 1, MAX).cmp(F(MAX - 2, MAX - 1))).toBe(1);
    expect(F(-MAX, MAX - 1).cmp(F(-(MAX - 1), MAX - 2))).toBe(1);
    expect(F(MAX, MAX - 1).cmp(F(MAX, MAX - 1))).toBe(0);
    expect(F(2, 4).eq('1/2')).toBe(true);
    expect(F(1, 3).eq(0.33)).toBe(false);
    expect([F(-3).sign(), F(0).sign(), F(2, 7).sign()]).toEqual([-1, 0, 1]);
    expect(F(4, 2).isInt()).toBe(true);
    expect(F(1, 2).isInt()).toBe(false);
    expect(F(0, 9).isZero()).toBe(true);
  });

  test('큰 수 비교를 BigInt 로 교차 검증 (무작위 3000쌍)', () => {
    const r = M.rng(2026);
    const big = () => Math.floor(r() * MAX) + 1;
    let checked = 0;
    for (let i = 0; i < 3000; i++) {
      const f = F((r() < 0.5 ? -1 : 1) * big(), big());
      const g = F((r() < 0.5 ? -1 : 1) * big(), big());
      const lhs = BigInt(f.num) * BigInt(g.den);
      const rhs = BigInt(g.num) * BigInt(f.den);
      const want = lhs < rhs ? -1 : lhs > rhs ? 1 : 0;
      if (f.cmp(g) !== want) throw new Error('cmp 틀림: ' + f + ' vs ' + g);
      checked++;
    }
    expect(checked).toBe(3000);
  });

  test('valueOf·toString·toJSON', () => {
    expect(F(3, 4) + 0).toBe(0.75);
    expect(String(F(3, 4))).toBe('3/4');
    expect(`${F(-2)}`).toBe('-2');
    expect(F(1, 2) < F(2, 3)).toBe(true);
    expect(JSON.stringify({ a: F(1, 2) })).toBe('{"a":"1/2"}');
  });

  test('toTex·toMixed', () => {
    expect(F(3, 4).toTex()).toBe('\\frac{3}{4}');
    expect(F(-3, 4).toTex()).toBe('-\\frac{3}{4}');
    expect(F(2).toTex()).toBe('2');
    expect(F(3, 2).toTex({ mixed: true })).toBe('1\\frac{1}{2}');
    expect(F(-7, 4).toTex({ mixed: true })).toBe('-1\\frac{3}{4}');
    expect(F(1, 2).toTex({ mixed: true })).toBe('\\frac{1}{2}');
    expect(F(-7, 4).toMixed()).toEqual({ sign: -1, whole: 1, num: 3, den: 4 });
    expect(F(0).toMixed()).toEqual({ sign: 0, whole: 0, num: 0, den: 1 });
    expect(F(2).toMixed()).toEqual({ sign: 1, whole: 2, num: 0, den: 1 });
  });

  test('toDecimal: 분모에 2·5 말고 소인수가 있으면 null', () => {
    expect(F(3, 4).toDecimal()).toBe('0.75');
    expect(F(-1, 8).toDecimal()).toBe('-0.125');
    expect(F(5).toDecimal()).toBe('5');
    expect(F(0).toDecimal()).toBe('0');
    expect(F(123456789, 1000).toDecimal()).toBe('123456.789');
    expect(F(1, 1024).toDecimal()).toBe('0.0009765625');
    expect(F(1, 3).toDecimal()).toBeNull();
    expect(F(7, 6).toDecimal()).toBeNull();
    // 유한소수라도 자리가 maxDigits(기본 12)를 넘으면 null — 반올림해서 틀린 값을 내지 않는다
    expect(F(1, 2 ** 20).toDecimal()).toBeNull();
    expect(F(1, 2 ** 20).toDecimal(20)).toBe('0.00000095367431640625');
  });
});

test.describe('정수 도구', () => {
  test('gcd·lcm (여러 개도)', () => {
    expect(M.gcd(12, 18)).toBe(6);
    expect(M.gcd(0, 5)).toBe(5);
    expect(M.gcd(-4, 6)).toBe(2);
    expect(M.gcd(0, 0)).toBe(0);
    expect(M.gcd(12, 18, 30)).toBe(6);
    expect(M.lcm(4, 6)).toBe(12);
    expect(M.lcm(0, 3)).toBe(0);
    expect(M.lcm(4, 6, 10)).toBe(60);
    expect(() => M.gcd(1.5, 2)).toThrow();
  });

  test('isPrime', () => {
    expect([2, 3, 5, 97, 1000000007].every(M.isPrime)).toBe(true);
    expect([1, 0, -7, 91, 1.5, 100].some(M.isPrime)).toBe(false);
  });

  test('primeFactors·divisors', () => {
    expect(M.primeFactors(360)).toEqual([[2, 3], [3, 2], [5, 1]]);
    expect(M.primeFactors(97)).toEqual([[97, 1]]);
    expect(M.primeFactors(1024)).toEqual([[2, 10]]);
    expect(M.primeFactors(1)).toEqual([]);
    expect(M.divisors(12)).toEqual([1, 2, 3, 4, 6, 12]);
    expect(M.divisors(36)).toEqual([1, 2, 3, 4, 6, 9, 12, 18, 36]);
    expect(M.divisors(1)).toEqual([1]);
    expect(() => M.primeFactors(0)).toThrow();
    expect(() => M.divisors(-1)).toThrow();
  });
});

test.describe('난수와 문제 생성 도구 R', () => {
  test('rng: 같은 seed → 같은 수열, mulberry32 원본과 같다', () => {
    const a = M.rng(42), b = M.rng(42), c = M.rng(43);
    const sa = [a(), a(), a()], sb = [b(), b(), b()], sc = [c(), c(), c()];
    expect(sa).toEqual(sb);
    expect(sa).not.toEqual(sc);
    expect(sa.every((v) => v >= 0 && v < 1)).toBe(true);
    function mulberry32(s) {
      return function () {
        let t = (s += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const ref = mulberry32(12345), mine = M.rng(12345);
    for (let i = 0; i < 200; i++) expect(mine()).toBe(ref());
    expect(M.rng('단원-3')()).toBe(M.rng('단원-3')()); // 문자열 seed 도
  });

  test('R.int·R.nonzero: 양 끝 포함, 0 제외', () => {
    const R = M.toolkit(1);
    const ints = new Set(), nz = new Set();
    for (let i = 0; i < 2000; i++) { ints.add(R.int(-3, 3)); nz.add(R.nonzero(-2, 2)); }
    expect([...ints].sort((x, y) => x - y)).toEqual([-3, -2, -1, 0, 1, 2, 3]);
    expect([...nz].sort((x, y) => x - y)).toEqual([-2, -1, 1, 2]);
    expect(() => R.nonzero(0, 0)).toThrow();
    expect(() => R.int(1.2, 1.8)).toThrow();
  });

  test('R.pick·shuffle(사본)·sample·bool·sign·F·seed', () => {
    const R = M.toolkit(7);
    const arr = [1, 2, 3, 4, 5];
    const s = R.shuffle(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]); // 원본은 그대로
    expect([...s].sort()).toEqual(arr);
    const smp = R.sample(arr, 3);
    expect(new Set(smp).size).toBe(3);
    expect(arr).toContain(R.pick(arr));
    expect(typeof R.bool()).toBe('boolean');
    expect([-1, 1]).toContain(R.sign());
    expect(R.F).toBe(M.F);
    expect(R.seed).toBe(7);
    expect(() => R.sample(arr, 6)).toThrow();
    expect(() => R.pick([])).toThrow();
    const int = R.int; // 떼어 써도 된다
    expect(Number.isInteger(int(1, 9))).toBe(true);
  });

  test('R.distinct: 서로 다른 값 n 개, 못 만들면 throw', () => {
    const R = M.toolkit(3);
    const v = R.distinct(3, () => R.int(1, 4));
    expect(new Set(v).size).toBe(3);
    expect(() => R.distinct(5, () => R.int(1, 3))).toThrow();
  });

  test('R.choices: 정답 1 + 서로 다른 오답, 문자열 기준 중복 제거, 모자라면 throw', () => {
    const R = M.toolkit(11);
    const c = R.choices('$\\frac{1}{2}$', ['$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{2}{3}$', '$1$', '$2$']);
    expect(c.choices).toHaveLength(4);
    expect(new Set(c.choices).size).toBe(4);
    expect(c.choices[c.answer]).toBe('$\\frac{1}{2}$');
    // 오답은 앞에서부터(우선순위) 쓴다
    expect([...c.choices].sort()).toEqual(['$1$', '$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{2}{3}$'].sort());
    // 숫자는 문자열로, 0.1+0.2 는 0.3 과 같은 보기로 본다, NaN·null 은 뺀다
    const n = R.choices(0.3, [0.1 + 0.2, 0.4, NaN, null, 0.5, 0.6]);
    expect(n.choices.sort()).toEqual(['0.3', '0.4', '0.5', '0.6']);
    expect(() => R.choices('a', ['a', 'b', 'b', 'c'])).toThrow();
    expect(() => R.choices(NaN, ['1', '2', '3'])).toThrow();
    // 같은 seed → 같은 순서
    expect(M.toolkit(5).choices('a', ['b', 'c', 'd'])).toEqual(M.toolkit(5).choices('a', ['b', 'c', 'd']));
  });
});

test.describe('R.fmt 표기', () => {
  const fm = M.toolkit(1).fmt;

  test('fmt.num: 정수만 세 자리 콤마', () => {
    expect(fm.num(1234567)).toBe('1,234,567');
    expect(fm.num(-1234)).toBe('-1,234');
    expect(fm.num(999)).toBe('999');
    expect(fm.num(0)).toBe('0');
    expect(fm.num(1234.5)).toBe('1234.5');
    expect(fm.num(0.1 + 0.2)).toBe('0.3');
  });

  test('fmt.dec: 부동소수 오차 없이, 반올림(0.5 는 0 에서 먼 쪽), 끝 0 제거', () => {
    expect(fm.dec(0.1 + 0.2)).toBe('0.3');
    expect(fm.dec(0.1 * 3)).toBe('0.3');
    expect(fm.dec(0.3 - 0.1 - 0.2)).toBe('0');
    expect(fm.dec(4.35 * 100)).toBe('435');
    expect(fm.dec(1.005, 2)).toBe('1.01');
    expect(fm.dec(3.14159, 2)).toBe('3.14');
    expect(fm.dec(2.5, 0)).toBe('3');
    expect(fm.dec(-2.5, 0)).toBe('-3');
    expect(fm.dec(-0.4, 0)).toBe('0');
    expect(fm.dec(9.995, 2)).toBe('10');
    expect(fm.dec(2.5, 2)).toBe('2.5');
    expect(fm.dec(1e-7)).toBe('0.0000001');
    expect(fm.dec(F(3, 4))).toBe('0.75');
    expect(fm.dec(F(1, 3), 4)).toBe('0.3333');
    expect(fm.dec(F(2, 3), 2)).toBe('0.67');
    expect(() => fm.dec(1, -1)).toThrow();
  });

  test('fmt.frac·signed·paren', () => {
    expect(fm.frac(F(3, 4))).toBe('\\frac{3}{4}');
    expect(fm.frac(F(3, 2), { mixed: true })).toBe('1\\frac{1}{2}');
    expect(fm.frac('6/8')).toBe('\\frac{3}{4}');
    expect(fm.signed(3)).toBe('+3');
    expect(fm.signed(-3)).toBe('-3');
    expect(fm.signed(F(-1, 2))).toBe('-\\frac{1}{2}');
    expect(fm.signed(2.5)).toBe('+2.5');
    expect(fm.paren(-3)).toBe('(-3)');
    expect(fm.paren(3)).toBe('3');
    expect(fm.paren(F(-1, 2))).toBe('\\left(-\\frac{1}{2}\\right)');
  });

  test('fmt.poly·term: 1·-1 계수 생략, 0 항 생략, 분수 계수는 \\frac', () => {
    expect(fm.poly([2, -3, 1])).toBe('2x^{2}-3x+1');
    expect(fm.poly([1, 0, -4])).toBe('x^{2}-4');
    expect(fm.poly([0, 0, 0])).toBe('0');
    expect(fm.poly([-1, 1, 0])).toBe('-x^{2}+x');
    expect(fm.poly([0, 2, 1])).toBe('2x+1');
    expect(fm.poly([F(1, 2), 0, F(-1, 3)])).toBe('\\frac{1}{2}x^{2}-\\frac{1}{3}');
    expect(fm.poly([1, -1], 'y')).toBe('y-1');
    expect(fm.poly([0.5, 0])).toBe('0.5x');
    expect(fm.poly([0.1 + 0.2, 1])).toBe('0.3x+1');
    expect(fm.term(-1, 'x', false)).toBe('-x');
    expect(fm.term(3, 'x', false)).toBe('+3x');
    expect(fm.term(1, '', true)).toBe('1');
    expect(fm.term(0, 'x', true)).toBe('');
    expect(() => fm.term(NaN, 'x', true)).toThrow();
  });
});

test.describe('식 읽기와 계산 parseExpr·evalExpr', () => {
  const E = (s, v) => M.evalExpr(s, v);

  test('우선순위: ^(오른쪽 결합) > 단항 - > 곱·나눗셈(암묵적 곱 포함, 왼쪽 결합) > + -', () => {
    expect(E('-x^2', { x: 3 })).toBe(-9);
    expect(E('-2^2')).toBe(-4);
    expect(E('2^3^2')).toBe(512);
    expect(E('2x^2', { x: 3 })).toBe(18);
    expect(E('6/2(1+2)')).toBe(9);
    expect(E('2^-1')).toBe(0.5);
    expect(E('1/2/3')).toBeCloseTo(1 / 6, 12);
    expect(E('2*-3x', { x: 2 })).toBe(-12);
    expect(E('2 - -3')).toBe(5);
    expect(E('2^3/4')).toBe(2);
    expect(E('3/4^2')).toBe(3 / 16);
  });

  test('÷ 뒤의 숫자/숫자는 한 분수: 3/4÷2/5 = 15/8, 6÷2/3 = 9', () => {
    expect(E('3/4÷2/5')).toBeCloseTo(15 / 8, 12);
    expect(E('6÷2/3')).toBeCloseTo(9, 12);
    expect(E('6÷2×3')).toBe(9);
    expect(E('2×3÷4·2')).toBe(3);
  });

  test('√·sqrt·제곱 기호·π·괄호 종류·콤마·분수 글자·대분수', () => {
    expect(E('√16')).toBe(4);
    expect(E('√(x+1)', { x: 8 })).toBe(3);
    expect(E('sqrt(2)')).toBeCloseTo(Math.SQRT2, 15);
    expect(E('2√3')).toBeCloseTo(2 * Math.sqrt(3), 15);
    expect(E('√2x', { x: 3 })).toBeCloseTo(Math.SQRT2 * 3, 15);
    expect(E('x²', { x: 4 })).toBe(16);
    expect(E('x³', { x: 4 })).toBe(64);
    expect(E('-x²', { x: 3 })).toBe(-9);
    expect(E('π')).toBe(Math.PI);
    expect(E('pi')).toBe(Math.PI);
    expect(E('2πr', { r: 3 })).toBeCloseTo(6 * Math.PI, 12);
    // 아이들이 자판에서 치는 말: 루트·root → √, 파이 → π
    expect(E('2루트5')).toBeCloseTo(2 * Math.sqrt(5), 15);
    expect(E('루트(x+1)', { x: 8 })).toBe(3);
    expect(E('root16')).toBe(4);
    expect(E('3파이')).toBeCloseTo(3 * Math.PI, 15);
    expect(M.checkAnswer({ type: 'short', check: 'expr', answer: '2sqrt(5)' }, '2 루트 5').correct).toBe(true);
    expect(M.checkAnswer({ type: 'short', check: 'expr', answer: '2sqrt(5)' }, '2루트6').correct).toBe(false);
    expect(E('3.14')).toBe(3.14);
    expect(E('[1+2]*{3}')).toBe(9);
    expect(E('(x+1)(x-1)', { x: 3 })).toBe(8);
    expect(E('xy', { x: 2, y: 5 })).toBe(10);
    expect(E('1,000+1')).toBe(1001);
    expect(E('½+¼')).toBe(0.75);
    expect(E('2 3/4')).toBe(2.75);
    expect(E('-1 1/2')).toBe(-1.5);
    expect(E('2X+1', { x: 2 })).toBe(5); // 휴대폰 자동 대문자
    expect(E('−3 + 5')).toBe(2);
  });

  test('AST 모양', () => {
    expect(M.parseExpr('2x')).toEqual({
      type: 'op', op: '*', implicit: true,
      left: { type: 'num', value: 2, text: '2' },
      right: { type: 'var', name: 'x' },
    });
    expect(M.parseExpr('-x^2')).toEqual({
      type: 'neg',
      arg: { type: 'op', op: '^', left: { type: 'var', name: 'x' }, right: { type: 'num', value: 2, text: '2' } },
    });
    expect(M.exprVars('x^2+2xy+π')).toEqual(['x', 'y']);
  });

  test('못 읽는 식은 throw (sin 같은 함수, 모호한 숫자 곱, 괄호 짝, 빈 식)', () => {
    for (const bad of ['sin(x)', 'log2', 'abs(x)', '2 3', 'x2', '(1+2', '1+2)', '(1+2]', '', '  ', '2+', '*3',
      'x=1', 'αβ', '3!', '|x|', '5.', '1,2']) {
      expect(() => M.parseExpr(bad), JSON.stringify(bad)).toThrow();
    }
  });

  test('evalExpr: 변수 값이 없으면 throw, 정의되지 않는 값은 NaN·Infinity', () => {
    expect(() => E('x+1')).toThrow();
    expect(() => E('x+y', { x: 1 })).toThrow();
    expect(E('x+1', { x: F(1, 2) })).toBe(1.5);
    expect(E('1/0')).toBe(Infinity);
    expect(E('√-4')).toBeNaN();
  });
});

test.describe('exprEqual', () => {
  const Q = M.exprEqual;

  test('같은 식', () => {
    expect(Q('2(x+1)', '2x+2')).toBe(true);
    expect(Q('(x+1)^2', 'x^2+2x+1')).toBe(true);
    expect(Q('x^2-1', '(x-1)(x+1)')).toBe(true);
    expect(Q('xy', 'yx')).toBe(true);
    expect(Q('2πr', '2rπ')).toBe(true);
    expect(Q('x', 'X')).toBe(true);
    expect(Q('2+3', '5')).toBe(true);
    expect(Q('ax+a', 'a(x+1)', { vars: { a: 2 } })).toBe(true);
  });

  test('다른 식', () => {
    expect(Q('x+1', 'x-1')).toBe(false);
    expect(Q('x', 'y')).toBe(false);
    expect(Q('x^2', 'x')).toBe(false);
    expect(Q('√(x^2)', 'x')).toBe(false); // x<0 에서 다르다
    expect(Q('x', 'x+0.0000001')).toBe(false);
    expect(Q('2+3', '6')).toBe(false);
  });

  test('정의되지 않는 점은 건너뛰고, 유효한 점이 5개 미만이면 false', () => {
    expect(Q('(x^2-1)/(x-1)', 'x+1')).toBe(true);
    expect(Q('√x·√x', 'x')).toBe(true); // x<0 은 건너뛴다
    expect(Q('√(x-5)', '√(x-5)')).toBe(true); // 정의역이 좁아도 찾는다
    expect(Q('√(x-5)', '√(x-6)')).toBe(false);
    expect(Q('√x', '√(x-100)')).toBe(false); // 둘 다 정의되는 점이 없다
    expect(Q('1/0', '1/0')).toBe(false);
  });

  test('못 읽으면 false, 결과는 언제나 같다(고정 seed)', () => {
    expect(Q('x+', 'x')).toBe(false);
    const runs = new Set();
    for (let i = 0; i < 5; i++) runs.add(Q('x^3', 'x^3+0.0000001x'));
    expect([...runs]).toEqual([false]);
  });
});

test.describe('exactValue', () => {
  test('변수 없는 식을 정확한 분수로', () => {
    const X = (s) => { const v = M.exactValue(s); return v === null ? null : v.toString(); };
    expect(X('1/2+1/3')).toBe('5/6');
    expect(X('0.1+0.2')).toBe('3/10');
    expect(X('2^-2')).toBe('1/4');
    expect(X('(2/3)^3')).toBe('8/27');
    expect(X('2^10')).toBe('1024');
    expect(X('-3-(-5)')).toBe('2');
    expect(X('3/4÷2/5')).toBe('15/8');
    expect(X('2^(4/2)')).toBe('4');
    expect(X('1,000×3')).toBe('3000');
    expect(X('1 1/2 + 2/3')).toBe('13/6');
    expect(X('½+⅓')).toBe('5/6');
  });

  test('√·변수·π·0 으로 나누기·정수 아닌 지수·범위 초과·못 읽음은 null', () => {
    for (const s of ['√4', 'x+1', 'π', '1/0', '4^(1/2)', '2^100', 'garbage+', '0^-1']) {
      expect(M.exactValue(s), s).toBeNull();
    }
  });
});

test.describe('normText·parseNumberAnswer', () => {
  test('normText: NFKC·공백 제거·소문자·끝 문장부호·기호 통일', () => {
    expect(M.normText(' Hello World. ')).toBe('helloworld');
    expect(M.normText('사과?')).toBe('사과');
    expect(M.normText('x²+y³')).toBe('x^2+y^3');
    expect(M.normText('３×４')).toBe('3*4');
    expect(M.normText('6÷2')).toBe('6/2');
    expect(M.normText('−3')).toBe('-3');
    expect(M.normText('–3')).toBe('-3');
    expect(M.normText('“hi”')).toBe('"hi"');
    expect(M.normText('don’t')).toBe("don't");
    expect(M.normText('답...')).toBe('답');
    expect(M.normText(null)).toBe('');
    expect(M.normText(12)).toBe('12');
  });

  test('parseNumberAnswer: 학생이 쓰는 여러 꼴', () => {
    const P = (s) => { const v = M.parseNumberAnswer(s); return v === null ? null : v.toString(); };
    const cases = {
      '3/4': '3/4', '-0.25': '-1/4', '1 2/3': '5/3', '1과 2/3': '5/3', '2와 1/2': '5/2', '4분의 3': '3/4',
      '4분의3': '3/4', '1과 4분의 3': '7/4', '-4분의 3': '-3/4', '-1과 2/3': '-5/3', '1,000': '1000', '+5': '5',
      '½': '1/2', '1½': '3/2', '-½': '-1/2', '３': '3', '5.': '5', ' 7 ': '7', '−2': '-2',
      '$\\frac{3}{4}$': '3/4', '1\\frac{1}{2}': '3/2',
    };
    for (const [s, want] of Object.entries(cases)) expect(P(s), s).toBe(want);
    expect(P(5)).toBe('5');
    expect(P(0.1)).toBe('1/10');
    expect(P(F(1, 2))).toBe('1/2');
    for (const bad of ['abc', '', '1/0', '3/4/5', '1 2', NaN, null, undefined, {}]) expect(P(bad)).toBeNull();
  });
});

test.describe('checkAnswer', () => {
  test('choice·ox·order', () => {
    const ch = { type: 'choice', choices: ['가', '나', '다', '라'], answer: 2 };
    expect([mark(ch, 2), mark(ch, 1), mark(ch, 0), mark(ch, '2'), mark(ch, null)]).toEqual(['T', 'F', 'F', 'T', 'Fe']);
    const ox = { type: 'ox', answer: false };
    expect([mark(ox, false), mark(ox, true), mark(ox, 'X'), mark(ox, null)]).toEqual(['T', 'F', 'T', 'Fe']);
    const ord = { type: 'order', choices: ['a', 'b', 'c'], answer: [2, 0, 1] };
    expect([mark(ord, [2, 0, 1]), mark(ord, [0, 1, 2]), mark(ord, [2, 0]), mark(ord, [])]).toEqual(['T', 'F', 'F', 'Fe']);
  });

  test("short 'text': 정답 중 하나와 normText 로 비교 (check 가 없으면 text)", () => {
    const p = { type: 'short', answer: ['apple', '사과'] };
    expect(mark(p, 'Apple')).toBe('T');
    expect(mark(p, ' 사과. ')).toBe('T');
    expect(mark(p, 'APPLE?')).toBe('T');
    expect(mark(p, 'banana')).toBe('F');
    expect(mark(p, '')).toBe('Fe');
    expect(mark(p, '   ')).toBe('Fe');
    expect(mark({ type: 'short', check: 'text', answer: 'ice cream' }, 'Ice  Cream')).toBe('T');
  });

  test("short 'number': 단위(cm·cm²·개·원·명)·공백을 떼고 값으로 비교", () => {
    const cm = { type: 'short', check: 'number', unit: 'cm', answer: '12' };
    expect(['12 cm', '12cm', '12', '12.0', '24/2', '12CM', '１２ｃｍ', 'x=12', '12 cm.'].map((s) => mark(cm, s)))
      .toEqual(Array(9).fill('T'));
    expect([mark(cm, '12 m'), mark(cm, '13'), mark(cm, 'cm')]).toEqual(['F', 'F', 'F']);
    const area = { type: 'short', check: 'number', unit: 'cm²', answer: '24' };
    expect(['24cm²', '24 cm^2', '24cm2', '24㎠', '24'].map((s) => mark(area, s))).toEqual(Array(5).fill('T'));
    expect(mark(area, '24 cm')).toBe('F'); // 단위가 다르다
    expect(mark({ type: 'short', check: 'number', unit: '개', answer: 5 }, '5개')).toBe('T');
    expect(mark({ type: 'short', check: 'number', unit: '원', answer: '1000' }, '1,000원')).toBe('T');
    expect(mark({ type: 'short', check: 'number', unit: '명', answer: '30' }, '30 명')).toBe('T');
    expect(mark({ type: 'short', check: 'number', unit: '°', answer: '30' }, '30도')).toBe('T');
  });

  test("short 'number': 단위를 붙여 쓰거나(80만원) 앞 낱말만 쓰거나(7번째) 도·℃·포인트로 써도 정답 — 뒤 낱말만(80원)·다른 단위는 틀림", () => {
    const man = { type: 'short', check: 'number', unit: '만 원', answer: '80' };
    expect(['80만 원', '80만원', '80 만 원', '80만', '80'].map((s) => mark(man, s))).toEqual(Array(5).fill('T'));
    expect(['80원', '800000원', '80만 명'].map((s) => mark(man, s))).toEqual(['F', 'F', 'F']);
    const nth = { type: 'short', check: 'number', unit: '번째 달', answer: '7' };
    expect(['7번째 달', '7번째달', '7번째', '7'].map((s) => mark(nth, s))).toEqual(Array(4).fill('T'));
    expect(mark(nth, '7달')).toBe('F');
    const pi = { type: 'short', check: 'number', unit: 'π cm²', answer: '16' };
    expect(['16π cm²', '16πcm²', '16π', '16'].map((s) => mark(pi, s))).toEqual(Array(4).fill('T'));
    expect(mark(pi, '16 cm²')).toBe('F'); // π 를 빼면 다른 값
    const c = { type: 'short', check: 'number', unit: '°C', answer: '25' };
    expect(['25°C', '25 ℃', '25도', '25 도', '25˚C', '25'].map((s) => mark(c, s))).toEqual(Array(6).fill('T'));
    expect(mark({ type: 'short', check: 'number', unit: '℃', answer: '10' }, '10도')).toBe('T');
    expect(mark({ type: 'short', check: 'number', unit: '도', answer: '-40' }, '-40°C')).toBe('T');
    expect(mark({ type: 'short', check: 'number', unit: '°', answer: '30' }, '30˚')).toBe('T');
    const pp = { type: 'short', check: 'number', unit: '%p', answer: '4.9' };
    expect(['4.9%p', '4.9 %p', '4.9퍼센트포인트', '4.9퍼센트 포인트', '4.9%포인트', '4.9포인트'].map((s) => mark(pp, s))).toEqual(Array(6).fill('T'));
    expect(mark(pp, '4.9%')).toBe('F'); // %와 %p 는 다르다
    expect(mark({ type: 'short', check: 'number', unit: 'cm', answer: '12' }, 'cm')).toBe('F');
  });

  test("short 'number': 답을 문장처럼 써도(답은 … 입니다 · 약 … · …쯤 · …요) 수만 보고 채점", () => {
    const man = { type: 'short', check: 'number', unit: '만 원', answer: '80' };
    expect(['답은 80만 원입니다.', '약 80만 원', '80만 원 정도요', '정답: 80', '80만원쯤', '80이요', '대략 80만 원이에요', '답 80'].map((s) => mark(man, s)))
      .toEqual(Array(8).fill('T'));
    expect(['답은 81만 원입니다', '약 8만 원', '80원입니다'].map((s) => mark(man, s))).toEqual(['F', 'F', 'F']);
    expect(mark({ type: 'short', check: 'number', unit: 'cm', answer: '12' }, '12 cm예요')).toBe('T');
  });

  test('readable: 학생 답을 그 문제의 채점 방식(수·모음·식)으로 읽을 수 있는가 — 화면이 "다시 써 주세요" 안내에 쓴다', () => {
    const num = { type: 'short', check: 'number', unit: 'cm', answer: '12' };
    expect(['12', '12 cm', '1 2/3', '답은 13 cm입니다', '', '   '].map((s) => M.readable(num, s))).toEqual([true, true, true, true, true, true]);
    expect(['12 m', '2와 3 사이', '모르겠어요', '12cm가 넘어요'].map((s) => M.readable(num, s))).toEqual([false, false, false, false]);
    const set = { type: 'short', check: 'set', answer: ['1', '2', '3'] };
    expect([M.readable(set, '1, 2, 3'), M.readable(set, '3 2'), M.readable(set, '1, 2, 셋')]).toEqual([true, true, false]);
    const ex = { type: 'short', check: 'expr', answer: '2x+1' };
    expect([M.readable(ex, '2x+1'), M.readable(ex, 'y=3x-1'), M.readable(ex, '2x+'), M.readable(ex, '((x+1)')]).toEqual([true, true, false, false]);
    // 글 답·보기 문제는 늘 읽을 수 있다(채점이 판단)
    expect([M.readable({ type: 'short', answer: '사과' }, '바나나 12'), M.readable({ type: 'choice', answer: 1 }, 3)]).toEqual([true, true]);
  });

  test("short 'number': 문제 글에 ±가 있으면 앞에 붙여 쓴 ±는 떼고 본다 — 없으면 답이 둘이라 틀림", () => {
    const moe = { type: 'short', check: 'number', unit: '%p', answer: '4.9', q: '오차 범위는 ±몇 %p일까요?' };
    expect(['±4.9', '± 4.9%p', '+-4.9', '4.9'].map((s) => mark(moe, s))).toEqual(Array(4).fill('T'));
    expect(mark(moe, '±5')).toBe('F');
    expect(mark({ type: 'short', check: 'number', answer: '2', q: '양수인 해를 쓰세요.' }, '±2')).toBe('F');
  });

  test("short 'number': 분수·소수·대분수는 값이 같으면 정답", () => {
    expect(mark({ type: 'short', check: 'number', answer: '1/2' }, '0.5')).toBe('T');
    expect(mark({ type: 'short', check: 'number', answer: ['3/4'] }, '6/8')).toBe('T');
    expect(mark({ type: 'short', check: 'number', answer: 0.75 }, '3/4')).toBe('T');
    expect(mark({ type: 'short', check: 'number', answer: F(7, 6) }, '1 1/6')).toBe('T');
    expect(mark({ type: 'short', check: 'number', answer: F(7, 6) }, '1과 6분의 1')).toBe('T');
    expect(mark({ type: 'short', check: 'number', answer: '-3' }, '−3')).toBe('T');
    expect(mark({ type: 'short', check: 'number', answer: '1/3' }, '0.333')).toBe('F');
  });

  test("short 'expr': 같은 식이면 정답", () => {
    const p = { type: 'short', check: 'expr', answer: '2(x+1)' };
    expect(['2x+2', '2X+2', 'y=2x+2', '2x+2.'].map((s) => mark(p, s))).toEqual(['T', 'T', 'T', 'T']);
    expect(['2x+1', '2x+', ')))'].map((s) => mark(p, s))).toEqual(['F', 'F', 'F']);
    expect(mark({ type: 'short', check: 'expr', answer: ['x^2-1'] }, '(x+1)(x-1)')).toBe('T');
    expect(mark({ type: 'short', check: 'expr', answer: '$2x^{2}$' }, '2x²')).toBe('T');
  });

  test("short 'set': 'x=2, x=3' '2 또는 3' '-1,4' 'x=-1 또는 x=4' 모두, 순서 무관", () => {
    const p = { type: 'short', check: 'set', answer: ['2', '3'] };
    const ok = ['x=2, x=3', '3, 2', '2 또는 3', '2,3', 'x = 2 또는 x = 3', '{2, 3}', '2와 3', '2 3', 'x₁=2, x₂=3', '2 or 3'];
    expect(ok.map((s) => mark(p, s))).toEqual(Array(ok.length).fill('T'));
    expect(['2', '2, 3, 4', '2, x', 'abc'].map((s) => mark(p, s))).toEqual(['F', 'F', 'F', 'F']);
    const q = { type: 'short', check: 'set', answer: '-1, 4' };
    expect([mark(q, '-1,4'), mark(q, 'x=-1 또는 x=4'), mark(q, '4, -1'), mark(q, '1, -4')]).toEqual(['T', 'T', 'T', 'F']);
    expect(mark({ type: 'short', check: 'set', answer: ['2', '-2'] }, 'x=±2')).toBe('T');
    expect(mark({ type: 'short', check: 'set', answer: ['1+√2', '1-√2'] }, '1±√2')).toBe('T');
    expect(mark({ type: 'short', check: 'set', answer: ['1+√2', '1-√2'] }, 'x = 1 + √2, x = 1 - √2')).toBe('T');
    expect(mark({ type: 'short', check: 'set', answer: ['-3', '0.5'] }, '1/2, -3')).toBe('T');
    expect(mark({ type: 'short', check: 'set', answer: [2, 3] }, '3 2')).toBe('T');
  });

  test("short 'set': 문제에 단위가 있으면 원소마다 붙여 쓴 단위를 뗀다(3 N, 11 N · 38.9%, 45.1%) — 다른 단위는 틀림", () => {
    const f = { type: 'short', check: 'set', unit: 'N', answer: ['3', '11'] };
    expect(['3 N, 11 N', '3N과 11N', '11 N, 3 N', '3, 11', '3 N 또는 11 N'].map((s) => mark(f, s))).toEqual(Array(5).fill('T'));
    expect(['3 nm, 11 nm', '3 N', '3 N, 12 N'].map((s) => mark(f, s))).toEqual(['F', 'F', 'F']);
    const pct = { type: 'short', check: 'set', unit: '%', answer: ['38.9', '45.1'] };
    expect(['38.9%, 45.1%', '38.9 %, 45.1 %', '38.9퍼센트, 45.1퍼센트', '45.1, 38.9'].map((s) => mark(pct, s))).toEqual(Array(4).fill('T'));
    expect(mark(pct, '38.9%p, 45.1%p')).toBe('F'); // %p 는 % 가 아니다
    expect(mark({ type: 'short', check: 'set', unit: 'cm', answer: ['2', '-2'] }, '±2 cm')).toBe('T');
    // 단위가 없는 모음 문제는 예전 그대로('2 or 3' 의 o 를 단위로 보지 않는다)
    expect(mark({ type: 'short', check: 'set', unit: '°', answer: ['2', '3'] }, '2 or 3')).toBe('T');
  });

  test('절대 throw 하지 않는다 (이상한 문제·입력은 correct:false)', () => {
    const weird = [
      [null, 'x'], [undefined, undefined], [{}, 'x'], [{ type: 'short', check: 'number' }, '1'],
      [{ type: 'weird' }, 'x'], [{ type: 'short', check: 'set', answer: null }, '1'],
      [{ type: 'short', check: 'expr', answer: undefined }, 'x'], [{ type: 'choice', answer: 1 }, {}],
      [{ type: 'short', answer: 'a' }, { toString() { throw new Error('x'); } }],
      [{ type: 'short', check: 'number', answer: 'abc' }, '1'], [{ type: 'short', check: 'expr', answer: '((' }, 'x'],
    ];
    for (const [p, i] of weird) {
      let r;
      expect(() => { r = M.checkAnswer(p, i); }).not.toThrow();
      expect(r.correct).toBe(false);
    }
    expect(M.checkAnswer(null, undefined)).toEqual({ correct: false, empty: true });
  });

  test('정답 배열을 그대로 넣어도 채점된다 (내용 검사용)', () => {
    expect(mark({ type: 'short', answer: ['apple', '사과'] }, ['apple', '사과'])).toBe('T');
    expect(mark({ type: 'short', answer: ['apple', '사과'] }, ['apple', 'pear'])).toBe('F');
    expect(mark({ type: 'short', check: 'set', answer: ['2', '3'] }, ['3', '2'])).toBe('T');
  });
});

test.describe('answerText', () => {
  test('choice 는 보기 내용, ox 는 O/X, short 는 첫 정답(set 이면 모두)', () => {
    expect(M.answerText({ type: 'choice', choices: ['가', '나', '다'], answer: 2 })).toBe('다');
    expect(M.answerText({ type: 'ox', answer: false })).toBe('X');
    expect(M.answerText({ type: 'ox', answer: true })).toBe('O');
    expect(M.answerText({ type: 'order', choices: ['a', 'b', 'c'], answer: [2, 0, 1] })).toBe('c → a → b');
    expect(M.answerText({ type: 'short', answer: ['apple', '사과'] })).toBe('apple');
    expect(M.answerText({ type: 'short', check: 'set', answer: ['2', '3'] })).toBe('2, 3');
    expect(M.answerText({ type: 'short', answer: F(3, 4) })).toBe('3/4');
    expect(M.answerText(null)).toBe('');
  });
});

/* ---------- 문제 생성기가 쓰는 흐름 예시: 분모가 다른 분수의 덧셈 (초등 5학년) ---------- */

function genFracAddChoice(R) {
  const d1 = R.int(2, 9);
  let d2 = R.int(2, 9);
  while (d2 === d1) d2 = R.int(2, 9);
  const a = R.F(R.int(1, d1 - 1), d1);
  const b = R.F(R.int(1, d2 - 1), d2);
  const sum = a.add(b);
  const tex = (f) => '$' + R.fmt.frac(f, { mixed: true }) + '$';
  const wrongs = [
    R.F(a.num + b.num, a.den + b.den), // 분자끼리·분모끼리 더하는 실수
    sum.add(R.F(1, sum.den)),
    sum.sub(R.F(1, sum.den)),
    a.mul(b),
    sum.add(1),
  ].map(tex);
  const c = R.choices(tex(sum), wrongs);
  return {
    type: 'choice',
    q: '$' + R.fmt.frac(a) + ' + ' + R.fmt.frac(b) + '$ 를 계산하세요.',
    choices: c.choices,
    answer: c.answer,
    explain: '분모를 ' + M.lcm(a.den, b.den) + '(으)로 통분해서 더해요.',
    _sum: sum.toString(),
  };
}

function genFracAddShort(R) {
  const d1 = R.int(2, 9);
  let d2 = R.int(2, 9);
  while (d2 === d1) d2 = R.int(2, 9);
  const a = R.F(R.int(1, d1 - 1), d1);
  const b = R.F(R.int(1, d2 - 1), d2);
  const sum = a.add(b);
  return {
    type: 'short',
    check: 'number',
    q: '$' + R.fmt.frac(a) + ' + ' + R.fmt.frac(b) + '$ 의 값을 기약분수로 쓰세요.',
    answer: sum.toString(),
    explain: '통분하면 $' + R.fmt.frac(sum) + '$ 이에요.',
  };
}

test.describe('문제 생성기 흐름 (R → R.choices → checkAnswer)', () => {
  test('같은 seed 면 같은 문제, 다른 seed 면 여러 문제', () => {
    expect(genFracAddChoice(M.toolkit(42))).toEqual(genFracAddChoice(M.toolkit(42)));
    expect(genFracAddShort(M.toolkit('math-e5-03:g1:7'))).toEqual(genFracAddShort(M.toolkit('math-e5-03:g1:7')));
    const qs = new Set();
    for (let s = 1; s <= 20; s++) qs.add(genFracAddChoice(M.toolkit(s)).q);
    expect(qs.size).toBeGreaterThan(10);
  });

  test('300개 seed: 정답이 채점기를 통과하고, 보기는 4개·중복 없음, NaN·undefined 없음', () => {
    for (let s = 1; s <= 300; s++) {
      const p = genFracAddChoice(M.toolkit(s));
      const json = JSON.stringify(p);
      if (/NaN|undefined|Infinity/.test(json)) throw new Error('seed ' + s + ': ' + json);
      if (p.choices.length !== 4 || new Set(p.choices).size !== 4) throw new Error('seed ' + s + ' 보기: ' + json);
      if (!M.checkAnswer(p, p.answer).correct) throw new Error('seed ' + s + ' 정답 채점 실패');
      if (M.checkAnswer(p, (p.answer + 1) % 4).correct) throw new Error('seed ' + s + ' 오답이 정답 처리됨');
      if (M.answerText(p) !== p.choices[p.answer]) throw new Error('seed ' + s + ' answerText');
      // 정답 보기의 값이 실제 합과 같다
      const shown = M.parseNumberAnswer(p.choices[p.answer]);
      if (!shown || shown.toString() !== p._sum) throw new Error('seed ' + s + ' 정답 값: ' + p.choices[p.answer]);

      const q = genFracAddShort(M.toolkit(s));
      const sum = Frac.from(q.answer);
      const m = sum.toMixed();
      const mixedText = m.whole ? m.whole + ' ' + m.num + '/' + m.den : m.num + '/' + m.den;
      if (!M.checkAnswer(q, q.answer).correct) throw new Error('seed ' + s + ' short 정답');
      if (!M.checkAnswer(q, M.answerText(q)).correct) throw new Error('seed ' + s + ' answerText 로 채점');
      if (m.num && !M.checkAnswer(q, mixedText).correct) throw new Error('seed ' + s + ' 대분수 ' + mixedText);
      if (M.checkAnswer(q, sum.add(F(1, 100)).toString()).correct) throw new Error('seed ' + s + ' 틀린 값이 정답');
    }
    expect(true).toBe(true);
  });

  test('보기 하나를 직접 확인: seed 42', () => {
    const p = genFracAddChoice(M.toolkit(42));
    expect(p.choices[p.answer]).toBe('$' + Frac.from(p._sum).toTex({ mixed: true }) + '$');
    expect(M.checkAnswer(p, p.answer)).toEqual({ correct: true, empty: false });
  });
});

test.describe('모듈 형식', () => {
  const src = fs.readFileSync(FILE, 'utf8');

  test('브라우저처럼 실으면 전역 TutorMath 가 생긴다 (UMD)', () => {
    const sandbox = {};
    sandbox.self = sandbox;
    vm.runInNewContext(src, sandbox);
    expect(typeof sandbox.TutorMath).toBe('object');
    expect(sandbox.TutorMath.F(2, 4).toString()).toBe('1/2');
    expect(sandbox.TutorMath.checkAnswer({ type: 'short', check: 'number', answer: '3/4' }, '0.75').correct).toBe(true);
  });

  test('ES2018 밖 문법·DOM 을 쓰지 않는다', () => {
    // 주석을 뺀 코드에서만 본다
    const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '$1');
    expect(code).not.toMatch(/\?\.(?!\d)/); // 선택적 체이닝
    expect(code).not.toMatch(/\?\?/); // 널 병합
    expect(code).not.toMatch(/\(\?<[=!a-zA-Z]/); // 정규식 뒤보기·이름 붙은 그룹
    expect(code).not.toMatch(/catch\s*\{/); // catch 매개변수 생략(ES2019)
    expect(code).not.toMatch(/\b(document|window|localStorage)\b/);
  });
});
