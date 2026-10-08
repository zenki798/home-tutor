/*
 * 가정교사 — js/mathlib.js (전역 TutorMath)
 * 정확한 분수(Frac) · 정수 도구 · 난수와 문제 생성 도구(R) · 식 계산 · 채점.
 * DOM 을 쓰지 않는 순수 함수만 둔다. 계약: docs/ARCHITECTURE.md §2
 *
 * - 문법은 ES2018 까지(구형 태블릿 사파리): ?. ?? 정규식 뒤보기(lookbehind)·이름 붙은 그룹을 쓰지 않는다.
 * - 정규식과 비교용 문자열 안의 한글·특수 글자는 \u 이스케이프로 적는다(오류 문구·주석은 그대로).
 *   페이지 인코딩 선언이 빠져도 채점이 틀어지지 않게.
 */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorMath = mod;
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  /* ================================================================
   * 공통
   * ================================================================ */

  var MAX = Number.MAX_SAFE_INTEGER;
  // 10 의 거듭제곱 — Math.pow 대신 표로 둔다(정확한 값이 보장된다)
  var POW10 = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15];
  // 빼기 기호로 볼 글자: ‐ ‑ ‒ – — ― − ﹣ －
  var MINUS_RE = /[\u2010-\u2015\u2212\uFE63\uFF0D]/g;
  // 답 끝에 붙은 마침표·물음표(。 포함)
  var END_PUNCT_RE = /[.?\u3002]+$/;

  function fail(msg) { throw new Error('TutorMath: ' + msg); }
  function tooBig() { throw new RangeError('TutorMath: 수가 너무 커서 정확히 계산할 수 없어요'); }
  function isInt(n) { return typeof n === 'number' && Number.isInteger(n) && Math.abs(n) <= MAX; }
  // 정수 계산 결과가 안전 범위를 넘으면 throw (넘은 값은 이미 부정확하므로)
  function chk(n) { if (!(Math.abs(n) <= MAX)) tooBig(); return n; }
  function hasOwn(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function show(x) { try { return String(x); } catch (e) { return typeof x; } }
  function trim(s) { return String(s).trim(); }
  // 상대오차 1e-9 (0 근처는 절대오차 1e-9)
  function close(a, b) { return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)); }

  /* ================================================================
   * 2.2 정수 도구
   * ================================================================ */

  function gcd2(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { var t = a % b; a = b; b = t; }
    return a;
  }

  // gcd(a, b, c …) 처럼 여러 개, 또는 배열 하나도 받는다
  function intArgs(args, name) {
    var list = (args.length === 1 && Array.isArray(args[0])) ? args[0] : Array.prototype.slice.call(args);
    if (!list.length) fail(name + ' 에 수를 넣어 주세요');
    for (var i = 0; i < list.length; i++) {
      if (!isInt(list[i])) fail(name + ' 는 정수만 받아요: ' + show(list[i]));
    }
    return list;
  }

  function gcd() {
    var list = intArgs(arguments, 'gcd'), g = 0;
    for (var i = 0; i < list.length; i++) g = gcd2(g, list[i]);
    return g;
  }

  function lcm() {
    var list = intArgs(arguments, 'lcm'), l = 1;
    for (var i = 0; i < list.length; i++) {
      var v = Math.abs(list[i]);
      if (v === 0) return 0;
      l = chk(l / gcd2(l, v) * v);
    }
    return l;
  }

  function isPrime(n) {
    if (!isInt(n) || n < 2) return false;
    if (n < 4) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (var i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }

  function primeFactors(n) {
    if (!isInt(n) || n < 1) fail('소인수분해는 1 이상의 정수만 할 수 있어요: ' + show(n));
    var out = [], p = 2;
    while (n > 1 && p * p <= n) {
      if (n % p === 0) {
        var e = 0;
        while (n % p === 0) { n /= p; e++; }
        out.push([p, e]);
      }
      p += (p === 2) ? 1 : 2;
    }
    if (n > 1) out.push([n, 1]);
    return out;
  }

  function divisors(n) {
    if (!isInt(n) || n < 1) fail('약수는 1 이상의 정수만 구할 수 있어요: ' + show(n));
    var small = [], large = [];
    for (var i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        small.push(i);
        if (i !== n / i) large.push(n / i);
      }
    }
    return small.concat(large.reverse());
  }

  /* ================================================================
   * 2.1 분수 Frac — 항상 기약, den > 0, 값을 바꿀 수 없다(freeze)
   * ================================================================ */

  // new Frac(n, d) 와 Frac(n, d) 모두 F(n, d) 와 같다 (생성자가 객체를 돌려주면 그것이 결과가 된다)
  function Frac(n, d) { return F(n, d); }
  var P = Frac.prototype;

  // 안전한 정수 n, d 로 기약분수를 만든다
  function mk(n, d) {
    if (d === 0) fail('분모가 0 인 분수는 없어요');
    if (!isInt(n) || !isInt(d)) tooBig();
    var f = Object.create(P);
    if (n === 0) {            // -0 이 남지 않게
      f.num = 0; f.den = 1;
    } else {
      var g = gcd2(n, d);
      if (d < 0) g = -g;
      f.num = n / g; f.den = d / g;
    }
    return Object.freeze(f);
  }

  function F(n, d) {
    if (d === undefined) d = 1;
    if (isInt(n) && isInt(d)) return mk(n, d);
    // 정수가 아니면(유한소수·문자열·Frac) 정확히 바꿔서 나눈다
    return from(n).div(from(d));
  }

  function isFracLike(x) {
    return x !== null && typeof x === 'object' && !(x instanceof Frac) &&
      typeof x.num === 'number' && typeof x.den === 'number';
  }

  // 소수 문자열(지수 표기 포함) → Frac. 소수 꼴이 아니면 null, 범위를 넘으면 throw
  var DEC_RE = /^([+-]?)(\d*)(?:\.(\d*))?(?:e([+-]?\d+))?$/i;
  function decToFrac(s) {
    var m = DEC_RE.exec(s);
    if (!m || (!m[2] && !m[3])) return null;
    var digits = ((m[2] || '') + (m[3] || '')).replace(/^0+/, '');
    var scale = (m[3] || '').length - (m[4] ? parseInt(m[4], 10) : 0);   // 값 = digits × 10^(-scale)
    // 끝의 0 을 먼저 떼어 분모를 줄인다 ('0.10000' 도 1/10)
    while (scale > 0 && digits.charAt(digits.length - 1) === '0') { digits = digits.slice(0, -1); scale--; }
    if (!digits) return mk(0, 1);
    if (digits.length > 16 || Number(digits) > MAX) tooBig();
    var n = Number(digits) * (m[1] === '-' ? -1 : 1);
    if (scale <= 0) {
      if (-scale >= POW10.length) tooBig();
      return mk(chk(n * POW10[-scale]), 1);
    }
    if (scale >= POW10.length) tooBig();
    return mk(n, POW10[scale]);
  }

  // 부호 없는 수 '1,000' '0.25' '.5' '12' — 콤마는 세 자리 묶음일 때만
  var UNUM_RE = /^(?:\d{1,3}(?:,\d{3})+|\d*)(?:\.\d*)?(?:e[+-]?\d+)?$/i;
  function unsignedNum(t) {
    if (!t || !UNUM_RE.test(t)) return null;
    return decToFrac(t.replace(/,/g, ''));
  }

  function fromString(str) {
    var s = trim(str.replace(MINUS_RE, '-')), neg = false, m, v = null;
    if (s.charAt(0) === '+' || s.charAt(0) === '-') {
      neg = s.charAt(0) === '-';
      s = trim(s.slice(1));
    }
    if ((m = /^(\d[\d,]*)\s+([\d,.]+)\s*\/\s*([\d,.]+)$/.exec(s))) {          // 대분수 '1 2/3'
      var w = unsignedNum(m[1]), a = unsignedNum(m[2]), b = unsignedNum(m[3]);
      if (w && a && b && w.isInt()) v = w.add(a.div(b));
    } else if ((m = /^([\d,.]+)\s*\/\s*([\d,.]+)$/.exec(s))) {                 // 분수 '3/4'
      var p = unsignedNum(m[1]), q = unsignedNum(m[2]);
      if (p && q) v = p.div(q);
    } else {
      v = unsignedNum(s);                                                      // 정수·소수
    }
    if (!v) fail('수로 읽을 수 없어요: "' + str + '"');
    return neg ? v.neg() : v;
  }

  function from(x) {
    if (x instanceof Frac) return x;
    if (typeof x === 'number') {
      if (!isFinite(x)) fail('유한한 수가 아니에요: ' + x);
      if (Number.isInteger(x)) return mk(chk(x), 1);
      // 유한소수는 짧은 문자열로 바꿔 읽어 부동소수 오차 없이 (0.1 → 1/10)
      var f = decToFrac(String(x));
      if (!f) fail('수로 읽을 수 없어요: ' + x);
      return f;
    }
    if (typeof x === 'string') return fromString(x);
    if (isFracLike(x)) return F(x.num, x.den);   // 다른 사본의 Frac, 저장했다 되살린 {num, den}
    return fail('분수로 바꿀 수 없어요: ' + show(x));
  }
  Frac.from = from;

  function addRaw(a, b, c, d) {
    if (b === d) return mk(chk(a + c), b);
    var g = gcd2(b, d), b1 = b / g, d1 = d / g;
    return mk(chk(chk(a * d1) + chk(c * b1)), chk(b1 * d));
  }

  function mulRaw(a, b, c, d) {
    if (a === 0 || c === 0) return mk(0, 1);
    var g1 = gcd2(a, d), g2 = gcd2(c, b);   // 먼저 약분해 넘침을 줄인다
    return mk(chk((a / g1) * (c / g2)), chk((b / g2) * (d / g1)));
  }

  // 정수 b 의 k 제곱 (k ≥ 0). 넘치면 throw
  function ipow(b, k) {
    var r = 1;
    while (k > 0) {
      if (k % 2 === 1) r = chk(r * b);
      k = Math.floor(k / 2);
      if (k > 0) b = chk(b * b);
    }
    return r;
  }

  // a/b 와 c/d 비교 (b, d > 0). 곱이 범위를 넘으면 연분수 전개로 정확히 비교한다
  function cmpRaw(a, b, c, d) {
    var x = a * d, y = c * b;
    if (Math.abs(x) <= MAX && Math.abs(y) <= MAX) return x < y ? -1 : (x > y ? 1 : 0);
    var sa = a > 0 ? 1 : (a < 0 ? -1 : 0), sc = c > 0 ? 1 : (c < 0 ? -1 : 0);
    if (sa !== sc) return sa < sc ? -1 : 1;
    if (sa < 0) {           // 둘 다 음수: -A/b ? -C/d  ⇔  C/d ? A/b
      var t = a, u = b;
      a = -c; b = d; c = -t; d = u;
    }
    for (;;) {
      var r1 = a % b, r2 = c % d, q1 = (a - r1) / b, q2 = (c - r2) / d;
      if (q1 !== q2) return q1 < q2 ? -1 : 1;
      if (r1 === 0 || r2 === 0) return r1 === r2 ? 0 : (r1 === 0 ? -1 : 1);
      // r1/b ? r2/d  ⇔  d/r2 ? b/r1 (뒤집으면 크기가 반대)
      var na = d, nb = r2, nc = b, nd = r1;
      a = na; b = nb; c = nc; d = nd;
    }
  }

  // 정수 n × 2^p2 × 5^p5 를 10진 문자열로 (자릿수 배열 곱셈 — 범위 제한 없음)
  function bigMulString(n, p2, p5) {
    var ds = String(n).split('').reverse().map(Number);
    function mul(m) {
      var carry = 0;
      for (var i = 0; i < ds.length; i++) {
        var v = ds[i] * m + carry;
        ds[i] = v % 10;
        carry = (v - v % 10) / 10;
      }
      while (carry) { ds.push(carry % 10); carry = (carry - carry % 10) / 10; }
    }
    for (var i = 0; i < p2; i++) mul(2);
    for (var j = 0; j < p5; j++) mul(5);
    return ds.reverse().join('').replace(/^0+(?=\d)/, '');
  }

  P.add = function (g) { g = from(g); return addRaw(this.num, this.den, g.num, g.den); };
  P.sub = function (g) { g = from(g); return addRaw(this.num, this.den, -g.num, g.den); };
  P.mul = function (g) { g = from(g); return mulRaw(this.num, this.den, g.num, g.den); };
  P.div = function (g) {
    g = from(g);
    if (g.num === 0) fail('0 으로 나눌 수 없어요');
    return mulRaw(this.num, this.den, g.den, g.num);
  };
  P.neg = function () { return mk(-this.num, this.den); };
  P.inv = function () {
    if (this.num === 0) fail('0 의 역수는 없어요');
    return mk(this.den, this.num);
  };
  P.abs = function () { return this.num < 0 ? mk(-this.num, this.den) : this; };
  P.pow = function (k) {
    if (!isInt(k)) fail('거듭제곱의 지수는 정수여야 해요: ' + show(k));
    var n = this.num, d = this.den;
    if (k < 0) {
      if (n === 0) fail('0 의 음수 거듭제곱은 정의되지 않아요');
      var t = n; n = d; d = t; k = -k;
    }
    return mk(ipow(n, k), ipow(d, k));
  };
  P.cmp = function (g) { g = from(g); return cmpRaw(this.num, this.den, g.num, g.den); };
  P.eq = function (g) { g = from(g); return this.num === g.num && this.den === g.den; };
  P.sign = function () { return this.num > 0 ? 1 : (this.num < 0 ? -1 : 0); };
  P.isInt = function () { return this.den === 1; };
  P.isZero = function () { return this.num === 0; };
  P.valueOf = function () { return this.num / this.den; };
  P.toString = function () { return this.den === 1 ? String(this.num) : this.num + '/' + this.den; };
  // 저장(JSON)하면 '3/4' 문자열이 된다 — 되살려도 채점·Frac.from 이 그대로 읽는다
  P.toJSON = function () { return this.toString(); };
  P.toTex = function (opts) {
    if (this.den === 1) return String(this.num);
    var a = Math.abs(this.num), d = this.den, s;
    if (opts && opts.mixed && a > d) s = ((a - a % d) / d) + '\\frac{' + (a % d) + '}{' + d + '}';
    else s = '\\frac{' + a + '}{' + d + '}';
    return (this.num < 0 ? '-' : '') + s;
  };
  P.toMixed = function () {
    var a = Math.abs(this.num), d = this.den;
    return { sign: this.sign(), whole: (a - a % d) / d, num: a % d, den: d };
  };
  // 유한소수면 정확한 소수 문자열. 분모에 2·5 말고 다른 소인수가 있으면(무한소수) null.
  // 유한소수라도 소수점 아래가 maxDigits 자리를 넘으면 null (반올림하지 않는다)
  P.toDecimal = function (maxDigits) {
    if (typeof maxDigits !== 'number' || !(maxDigits >= 0)) maxDigits = 12;
    var d = this.den, two = 0, five = 0;
    while (d % 2 === 0) { d /= 2; two++; }
    while (d % 5 === 0) { d /= 5; five++; }
    if (d !== 1) return null;
    var k = Math.max(two, five);
    if (k > maxDigits) return null;
    var a = Math.abs(this.num), den = this.den, s = String((a - a % den) / den);
    if (k > 0) {
      // 나머지/분모 = 나머지 × 2^(k-two) × 5^(k-five) / 10^k
      var fr = bigMulString(a % den, k - two, k - five);
      while (fr.length < k) fr = '0' + fr;
      s += '.' + fr;
    }
    return (this.num < 0 ? '-' : '') + s;
  };

  /* ================================================================
   * 2.3 난수 (mulberry32) 와 표기 도구 fmt
   * ================================================================ */

  // 정수 seed 는 그대로, 그 밖(문자열 등)은 FNV-1a 로 32비트 정수로
  function seedToInt(seed) {
    if (typeof seed === 'number' && Number.isInteger(seed)) return seed >>> 0;
    var s = show(seed), h = 2166136261;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function rng(seed) {
    var a = seedToInt(seed) | 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // 지수 표기('1.5e-7')를 보통 표기로
  function toPlain(s) {
    var m = /^(-?)(\d+)(?:\.(\d+))?e([+-]\d+)$/i.exec(s);
    if (!m) return s;
    var digits = m[2] + (m[3] || ''), point = m[2].length + parseInt(m[4], 10), out;
    if (point <= 0) out = '0.' + '0'.repeat(-point) + digits;
    else if (point >= digits.length) out = digits + '0'.repeat(point - digits.length);
    else out = digits.slice(0, point) + '.' + digits.slice(point);
    return m[1] + out;
  }

  // 10진 문자열을 소수점 아래 places 자리로 반올림(0.5 는 0 에서 먼 쪽), 끝의 0 은 뗀다
  function roundDec(s, places) {
    var neg = s.charAt(0) === '-';
    if (neg) s = s.slice(1);
    var p = s.indexOf('.');
    if (p >= 0 && s.length - p - 1 > places) {
      var ds = (s.slice(0, p) + s.slice(p + 1, p + 1 + places)).split('');
      if (s.charAt(p + 1 + places) >= '5') {
        var i = ds.length - 1;
        while (i >= 0 && ds[i] === '9') { ds[i] = '0'; i--; }
        if (i < 0) ds.unshift('1');
        else ds[i] = String(+ds[i] + 1);
      }
      var cut = ds.length - places;
      s = ds.slice(0, cut).join('') + (places > 0 ? '.' + ds.slice(cut).join('') : '');
    }
    if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    s = s.replace(/^0+(?=\d)/, '') || '0';
    if (/^0(\.0*)?$/.test(s)) neg = false;      // '-0' 을 만들지 않는다
    return (neg ? '-' : '') + s;
  }

  // 분수를 소수점 아래 n 자리까지 자른 10진 문자열 (분모 ≤ MAX/10 일 때만)
  function fracDigits(f, n) {
    var a = Math.abs(f.num), d = f.den, r = a % d, s = String((a - r) / d) + '.';
    for (var i = 0; i < n; i++) {
      r *= 10;
      var q = Math.floor(r / d);
      if (r - q * d < 0) q--;
      else if (r - q * d >= d) q++;
      s += q;
      r -= q * d;
    }
    return (f.num < 0 ? '-' : '') + s;
  }

  // 소수 표기. 숫자는 유효숫자 15자리로 부동소수 찌꺼기(0.1+0.2)를 먼저 없앤 뒤 digits 자리(기본 10)로 반올림.
  // Frac·문자열은 정확히 계산한다. 끝의 0 은 뗀다 (2.50 → '2.5')
  function fmtDec(x, digits) {
    var hasDigits = digits !== undefined && digits !== null;
    if (hasDigits && !(isInt(digits) && digits >= 0 && digits <= 20)) fail('자릿수는 0~20 사이 정수여야 해요: ' + show(digits));
    var places = hasDigits ? digits : 10;
    if (typeof x === 'number') {
      if (!isFinite(x)) return String(x);
      var s = (Number.isInteger(x) && Math.abs(x) < 1e21) ? String(x) : toPlain(x.toPrecision(15));
      return roundDec(s, places);
    }
    var f;
    if (typeof x === 'string') {
      try { f = from(x); } catch (e) {
        var nx = Number(x);
        return (trim(x) && isFinite(nx)) ? fmtDec(nx, digits) : x;
      }
    } else {
      f = from(x);
    }
    var exact = f.toDecimal(places);
    if (exact !== null) return exact;
    if (f.den > MAX / 10) return fmtDec(f.valueOf(), digits);
    return roundDec(fracDigits(f, places + 1), places);
  }

  // 정수만 세 자리 콤마. 소수는 콤마 없이 그대로(부동소수 찌꺼기는 없앤다)
  function fmtNum(n) {
    if (typeof n === 'string') {
      try { n = from(n); } catch (e) { return n; }
    }
    if (n instanceof Frac || isFracLike(n)) {
      var f = from(n);
      if (!f.isInt()) return f.toDecimal() || f.toString();
      n = f.num;
    }
    if (typeof n !== 'number' || !isFinite(n)) return show(n);
    if (!Number.isInteger(n)) return fmtDec(n);
    var s = String(Math.abs(n));
    if (s.indexOf('e') >= 0) return String(n);
    return (n < 0 ? '-' : '') + s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function fmtFrac(f, opts) { return from(f).toTex(opts); }

  // 계수 → { neg, abs(절댓값 TeX), zero, one }
  function coefParts(c) {
    var neg, abs;
    if (typeof c === 'number') {
      if (!isFinite(c)) fail('계수가 수가 아니에요: ' + c);
      neg = c < 0;
      abs = fmtDec(Math.abs(c));
    } else {
      var f = from(c);
      neg = f.num < 0;
      abs = f.abs().toTex();
    }
    return { neg: neg && abs !== '0', abs: abs, zero: abs === '0', one: abs === '1' };
  }

  function fmtSigned(n) {
    var p = coefParts(n);
    return (p.neg ? '-' : '+') + p.abs;
  }

  function fmtParen(n) {
    var p = coefParts(n);
    if (!p.neg) return p.abs;
    // 분수는 괄호 크기를 맞춘다
    return p.abs.indexOf('\\frac') >= 0 ? '\\left(-' + p.abs + '\\right)' : '(-' + p.abs + ')';
  }

  // 한 항: 계수 c, 문자 부분 v('x^{2}', 'x', '' = 상수항), first 면 앞에 '+' 를 붙이지 않는다. c 가 0 이면 ''
  function fmtTerm(c, v, first) {
    var p = coefParts(c);
    if (p.zero) return '';
    v = (v === undefined || v === null) ? '' : String(v);
    var body = v ? (p.one ? '' : p.abs) + v : p.abs;
    return (p.neg ? '-' : (first ? '' : '+')) + body;
  }

  // 내림차순 계수 → TeX.  [2,-3,1] → '2x^{2}-3x+1'
  function fmtPoly(coeffs, v) {
    if (v === undefined || v === null) v = 'x';
    if (!Array.isArray(coeffs)) fail('poly 는 계수 배열을 받아요');
    var n = coeffs.length - 1, out = '';
    for (var i = 0; i <= n; i++) {
      var p = n - i;
      var vp = p === 0 ? '' : (p === 1 ? v : v + '^{' + p + '}');
      out += fmtTerm(coeffs[i], vp, out === '');
    }
    return out || '0';
  }

  var FMT = { num: fmtNum, dec: fmtDec, frac: fmtFrac, signed: fmtSigned, paren: fmtParen, poly: fmtPoly, term: fmtTerm };

  // 보기 하나 → 문자열. 잘못된 값(NaN·undefined …)이면 null
  function choiceText(x) {
    if (x === null || x === undefined) return null;
    if (typeof x === 'number') {
      if (!isFinite(x)) return null;
      return Number.isInteger(x) ? String(x) : fmtDec(x);
    }
    if (x instanceof Frac || isFracLike(x)) {
      var f = from(x);
      return f.isInt() ? String(f.num) : '$' + f.toTex() + '$';
    }
    var s = show(x);
    if (!trim(s) || /NaN|undefined|Infinity|\[object /.test(s)) return null;
    return s;
  }

  /* ---------- 조사 고르기 (R.josa / TutorMath.josa) ----------
   * 수·낱말을 "읽는 소리"의 마지막 받침으로 조사를 고른다.
   *   josa(9, '은/는') → '는' (구),  josa(6, '이/가') → '이' (육),  josa(7, '으로/로') → '로' (칠: ㄹ 받침)
   *   josa('3/4', '을/를') → '을' (4분의 삼),  josa('1 2/5', '이에요/예요') → '예요' (1과 5분의 이)
   *   josa('민수', '이/가') → '가',  josa('cm', '을/를') → '를' (센티미터) */
  // 받침 번호: 0 없음, 1 ㄱ, 4 ㄴ, 8 ㄹ, 16 ㅁ, 17 ㅂ, 21 ㅇ (한글 음절 (code-0xAC00)%28 과 같은 번호)
  var DIGIT_JONG = [21, 8, 0, 16, 0, 0, 1, 8, 8, 0]; // 영 일 이 삼 사 오 육 칠 팔 구
  var UNIT_JONG = {
    m: 0, cm: 0, mm: 0, km: 0, g: 16, kg: 16, mg: 16, t: 4, l: 0, ml: 0, kl: 0,
    'm²': 0, 'cm²': 0, 'km²': 0, 'm³': 0, 'cm³': 0, a: 0, ha: 0,
    '%': 0, '°': 0, '°c': 0, '℃': 0, s: 0, h: 0, v: 0, w: 0, kw: 0, kwh: 0, j: 8, n: 4, hz: 0, pa: 8, 'ω': 16, mol: 8,
  };

  function jongOfInteger(str) {
    // str: 0 이상의 정수 숫자열
    var s = str.replace(/^0+(?=\d)/, '');
    if (s === '0') return DIGIT_JONG[0];
    var last = s.charCodeAt(s.length - 1) - 48;
    if (last !== 0) return DIGIT_JONG[last];
    var z = s.length - s.replace(/0+$/, '').length; // 끝의 0 개수
    if (z === 1) return 17;          // 십
    if (z === 2) return 1;           // 백
    if (z === 3) return 4;           // 천
    if (z <= 7) return 4;            // 만, 십만, 백만, 천만
    if (z <= 11) return 1;           // 억 …
    return 0;                        // 조
  }

  function jongOfText(x) {
    var s = String(x).replace(/\s+$/, '');
    // 서식 글의 수식 꼬리($…$)·괄호·문장부호는 떼고 본다 (TeX 분수의 '}' 는 분수를 알아본 뒤에)
    s = s.replace(/[\$\)\]"'’”.,!?]+$/, '');
    if (!s) return 0;
    // 분수·대분수: 분자를 읽는다 — "\frac{3}{4}" → 3 ("4분의 삼"), "1 2/5" → 2
    var tex = /\\d?frac\{([^{}]*)\}\{[^{}]*\}$/.exec(s);
    if (tex) return jongOfText(tex[1]);
    s = s.replace(/[}]+$/, '');
    if (!s) return 0;
    var frac = /(-?\d+)\s*\/\s*\d+$/.exec(s);
    if (frac) return jongOfText(frac[1]);
    var ch = s.charCodeAt(s.length - 1);
    if (ch >= 0xac00 && ch <= 0xd7a3) return (ch - 0xac00) % 28;          // 한글 음절
    if (ch >= 48 && ch <= 57) {
      var dec = /(\d+)\.(\d+)$/.exec(s);
      if (dec) return DIGIT_JONG[dec[2].charCodeAt(dec[2].length - 1) - 48]; // 소수점 아래는 한 자리씩 읽는다
      var int = /(\d[\d,]*)$/.exec(s);
      return jongOfInteger(int[1].replace(/,/g, ''));
    }
    // 단위·영어 낱말
    var word = /([A-Za-zΩω°℃%²³]+)$/.exec(s);
    if (word) {
      var w = word[1].toLowerCase();
      if (Object.prototype.hasOwnProperty.call(UNIT_JONG, w)) return UNIT_JONG[w];
      if (/(ng)$/.test(w)) return 21;
      if (/[lr]l$|l$/.test(w)) return 8;
      if (/m$/.test(w)) return 16;
      if (/n$/.test(w)) return 4;
      if (/(ck|k|g)$/.test(w) && w.length > 2) return 1; // book 북, big 빅
      return 0;                                         // 그 밖은 '으'·모음으로 끝나게 읽는다 (dog 도그, cat 캣은 예외)
    }
    return 0;
  }

  function josa(x, pair) {
    var parts = String(pair).split('/');
    if (parts.length !== 2) throw new Error('조사 쌍은 "은/는" 꼴이어야 합니다: ' + pair);
    var withJong = parts[0];
    var without = parts[1];
    var jong;
    if (x && typeof x === 'object' && typeof x.num === 'number') jong = jongOfText(String(Math.abs(x.num))); // Frac: 분자
    else if (typeof x === 'number') {
      if (!isFinite(x)) throw new Error('조사를 고를 수 없는 수: ' + x);
      jong = jongOfText(String(Math.abs(x)));
    } else jong = jongOfText(x);
    if (withJong === '으로') return jong === 0 || jong === 8 ? without : withJong; // ㄹ 받침은 '로'
    return jong === 0 ? without : withJong;
  }

  /* ================================================================
   * 2.3 문제 생성 도구 R
   * ================================================================ */

  function toolkit(seed) {
    var rand = rng(seed);

    function intRange(a, b, name) {
      if (typeof a !== 'number' || typeof b !== 'number' || !isFinite(a) || !isFinite(b)) {
        fail(name + ' 의 범위는 수여야 해요: ' + show(a) + ', ' + show(b));
      }
      if (a > b) { var t = a; a = b; b = t; }
      a = Math.ceil(a); b = Math.floor(b);
      if (a > b) fail(name + ' 범위 안에 정수가 없어요');
      return [a, b];
    }

    function shuffle(arr) {
      var a = Array.prototype.slice.call(arr || []);
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(rand() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    // R 의 함수는 this 를 쓰지 않는다 — var int = R.int 처럼 떼어 써도 된다
    var R = {
      seed: seed,
      random: function () { return rand(); },
      int: function (a, b) {
        var r = intRange(a, b, 'int');
        return r[0] + Math.floor(rand() * (r[1] - r[0] + 1));
      },
      nonzero: function (a, b) {
        var r = intRange(a, b, 'nonzero'), lo = r[0], hi = r[1];
        var hasZero = lo <= 0 && hi >= 0;
        var count = hi - lo + 1 - (hasZero ? 1 : 0);
        if (count <= 0) fail('0 이 아닌 정수를 고를 수 없어요');
        var v = lo + Math.floor(rand() * count);
        if (hasZero && v >= 0) v += 1;       // 0 자리를 건너뛴다 (고르게 뽑힘)
        return v;
      },
      pick: function (arr) {
        if (!arr || !arr.length) fail('pick: 빈 배열이에요');
        return arr[Math.floor(rand() * arr.length)];
      },
      shuffle: shuffle,
      sample: function (arr, n) {
        if (!arr || !isInt(n) || n < 0 || n > arr.length) fail('sample: ' + show(n) + '개를 뽑을 수 없어요');
        return shuffle(arr).slice(0, n);
      },
      bool: function (p) { return rand() < (p === undefined ? 0.5 : p); },
      sign: function () { return rand() < 0.5 ? -1 : 1; },
      F: F,
      distinct: function (n, make, tries) {
        if (typeof make !== 'function') fail('distinct: 값을 만드는 함수를 넣어 주세요');
        if (tries === undefined) tries = 200;
        var out = [], seen = {};
        for (var i = 0; i < tries && out.length < n; i++) {
          var v = make(), k = 'k' + show(v);
          if (!seen[k]) { seen[k] = true; out.push(v); }
        }
        if (out.length < n) fail('distinct: 서로 다른 값 ' + n + '개를 만들지 못했어요 (' + out.length + '개)');
        return out;
      },
      // 정답 1 + 서로 다른 오답 (n-1)개를 섞는다. 오답은 앞에서부터 쓴다(우선순위). 보기는 모두 문자열
      choices: function (correct, wrongs, n) {
        if (n === undefined) n = 4;
        if (!isInt(n) || n < 2) fail('choices: 보기 수는 2 이상이어야 해요');
        var c = choiceText(correct);
        if (c === null) fail('choices: 정답 보기가 비었거나 잘못됐어요: ' + show(correct));
        var seen = {}, picked = [], list = Array.isArray(wrongs) ? wrongs : [];
        seen['k' + trim(c)] = true;
        for (var i = 0; i < list.length && picked.length < n - 1; i++) {
          var w = choiceText(list[i]);
          if (w === null || seen['k' + trim(w)]) continue;
          seen['k' + trim(w)] = true;
          picked.push(w);
        }
        if (picked.length < n - 1) {
          fail('choices: 서로 다른 오답이 ' + (n - 1) + '개 필요한데 ' + picked.length + '개뿐이에요');
        }
        var all = shuffle([c].concat(picked));
        return { choices: all, answer: all.indexOf(c) };
      },
      fmt: FMT,
      josa: josa,
      // 계약 밖 덤: 생성기가 전역 TutorMath 없이도 쓰게
      gcd: gcd, lcm: lcm, isPrime: isPrime, primeFactors: primeFactors, divisors: divisors
    };
    return R;
  }

  /* ================================================================
   * 2.4 식 계산
   * AST: { type:'num', value, text } | { type:'var', name } | { type:'const', name:'pi', value }
   *      | { type:'neg', arg } | { type:'func', name:'sqrt', arg }
   *      | { type:'op', op:'+'|'-'|'*'|'/'|'^', left, right }
   *      덧붙는 표시: implicit(암묵적 곱), sym:'÷'(÷ 로 쓴 나눗셈), frac(숫자/숫자 분수), mixed(대분수 '2 3/4' 의 +),
   *      paren(괄호로 묶였던 노드)
   *      변수 이름은 소문자로 바뀐다(X → x).
   * ================================================================ */

  var SUP_MAP = {
    '\u2070': '0', '\u00B9': '1', '\u00B2': '2', '\u00B3': '3', '\u2074': '4', '\u2075': '5',
    '\u2076': '6', '\u2077': '7', '\u2078': '8', '\u2079': '9', '\u207A': '+', '\u207B': '-'
  };
  var SUP_RE = /[\u2070\u00B9\u00B2\u00B3\u2074-\u2079\u207A\u207B]+/g;
  // ¼ ½ ¾ ⅐ … ⅞ ↉ (앞에 붙은 숫자는 대분수의 자연수 부분)
  var VULGAR_RE = /(\d*)[ \t]*([\u00BC-\u00BE\u2150-\u215E\u2189])/g;
  var FUNC_WORDS = ['arcsin', 'arccos', 'arctan', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh',
    'sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'log', 'ln', 'lg', 'exp', 'abs',
    'floor', 'ceil', 'round', 'max', 'min', 'mod', 'gcd', 'lcm', 'lim'];
  var CLOSE_OF = { '(': ')', '[': ']', '{': '}' };

  function vulgarParts(ch) { return ch.normalize('NFKC').split('\u2044'); }

  function exprPre(src) {
    var s = String(src)
      // 위 첨자는 NFKC 가 보통 숫자로 바꾸기 전에 ^(…) 로 (x² → x^(2))
      .replace(SUP_RE, function (m) {
        var out = '';
        for (var i = 0; i < m.length; i++) out += SUP_MAP[m.charAt(i)];
        return '^(' + out + ')';
      })
      .replace(VULGAR_RE, function (m, w, ch) {
        var p = vulgarParts(ch);
        return '(' + (w ? w + '+' : '') + p[0] + '/' + p[1] + ')';
      });
    // 대문자도 받는다(휴대폰 자동 대문자): 2X+1 = 2x+1. ÷ 는 남겨 둔다(토큰에서 / 와 구별)
    // 자판에 √·π 가 없어 아이들이 치는 말: 2루트5 · root16 → √, 3파이 → π
    return s.normalize('NFKC').toLowerCase()
      .replace(/\s*(?:루트|root)\s*/g, '√').replace(/\s*파이\s*/g, 'π')
      .replace(MINUS_RE, '-')
      .replace(/[\u00D7\u2715\u2716\u2217\u22C5\u00B7\u2219]/g, '*')   // × ✕ ✖ ∗ ⋅ · ∙
      .replace(/[\u2215\u2044]/g, '/');                                 // ∕ ⁄
  }

  function tokenize(s) {
    var toks = [], i = 0, m;
    while (i < s.length) {
      var ch = s.charAt(i), rest = s.slice(i);
      if (/\s/.test(ch)) { i++; continue; }
      if ((ch >= '0' && ch <= '9') || ch === '.') {
        m = /^(?:\d{1,3}(?:,\d{3})+(?!\d)|\d+)?(?:\.\d+)?/.exec(rest);
        if (!m[0]) fail('식을 읽을 수 없어요: "' + rest.slice(0, 6) + '"');
        var text = m[0].replace(/,/g, '');
        if (text.charAt(0) === '.') text = '0' + text;
        toks.push({ t: 'num', text: text, value: parseFloat(text) });
        i += m[0].length;
        continue;
      }
      if (ch >= 'a' && ch <= 'z') {
        if (rest.indexOf('sqrt') === 0) { toks.push({ t: 'sqrt' }); i += 4; continue; }
        if (rest.indexOf('pi') === 0) { toks.push({ t: 'pi' }); i += 2; continue; }
        for (var k = 0; k < FUNC_WORDS.length; k++) {
          if (rest.indexOf(FUNC_WORDS[k]) === 0) fail('지원하지 않는 함수예요: ' + FUNC_WORDS[k]);
        }
        toks.push({ t: 'var', name: ch });
        i++;
        continue;
      }
      if (ch === '\u03C0') { toks.push({ t: 'pi' }); i++; continue; }      // π
      if (ch === '\u221A') { toks.push({ t: 'sqrt' }); i++; continue; }    // √
      if (ch === '\u00F7') { toks.push({ t: 'op', v: '/', sym: '\u00F7' }); i++; continue; }   // ÷
      if ('+-*/^'.indexOf(ch) >= 0) { toks.push({ t: 'op', v: ch }); i++; continue; }
      if (hasOwn(CLOSE_OF, ch)) { toks.push({ t: '(', v: ch }); i++; continue; }
      if (ch === ')' || ch === ']' || ch === '}') { toks.push({ t: ')', v: ch }); i++; continue; }
      fail('식에 쓸 수 없는 글자예요: "' + ch + '"');
    }
    return toks;
  }

  // 우선순위: ^(오른쪽 결합) > 단항 - > 곱(암묵적 곱 포함)·*·/ (왼쪽 결합) > + -
  // 단, ÷ · × 뒤(와 맨 앞)의 '숫자/숫자' 는 한 분수로 읽는다: 3/4÷2/5 = (3/4)÷(2/5), 6÷2/3 = 6÷(2/3).
  // 교과서에서 a/b 는 분수 막대이기 때문. 이 경우 말고는 값이 왼쪽 결합과 같다(6/2(1+2) = 9, 1/2/3 = 1/6).
  // 지수 자리(2^3/4 = 2^3 ÷ 4)와 분모 뒤에 ^ 가 올 때(3/4^2 = 3/16)는 묶지 않는다.
  // '2 3/4' 처럼 정수 뒤에 띄어 쓴 분수는 대분수다. 그 밖에 숫자 앞의 곱('2 3', 'x2')은 모호해서 throw.
  function parseExpr(str) {
    if (str && typeof str === 'object' && typeof str.type === 'string') return str;   // 이미 AST
    if (typeof str !== 'string' && typeof str !== 'number') fail('식은 문자열이어야 해요');
    var src = String(str);
    if (src.length > 500) fail('식이 너무 길어요');
    var toks = tokenize(exprPre(src));
    if (!toks.length) fail('빈 식이에요');
    var pos = 0, depth = 0;

    function peek() { return toks[pos]; }
    function isOp(t, v) { return !!t && t.t === 'op' && t.v === v; }
    function isWhole(t) { return !!t && t.t === 'num' && /^\d+$/.test(t.text); }
    function numNode(t) { return { type: 'num', value: t.value, text: t.text }; }

    function expr() {
      if (++depth > 60) fail('괄호가 너무 깊어요');
      var node = term();
      while (isOp(peek(), '+') || isOp(peek(), '-')) {
        var op = toks[pos++].v;
        node = { type: 'op', op: op, left: node, right: term() };
      }
      depth--;
      return node;
    }
    function term() {
      var node = unary(true);
      for (;;) {
        var t = peek();
        if (isOp(t, '*') || isOp(t, '/')) {
          pos++;
          // ASCII '/' 뒤에서는 분수로 묶지 않는다(1/2/3 = (1/2)/3)
          node = { type: 'op', op: t.v, left: node, right: unary(!(t.v === '/' && !t.sym)) };
          if (t.sym) node.sym = t.sym;
        } else if (t && (t.t === 'var' || t.t === 'pi' || t.t === 'sqrt' || t.t === '(')) {
          node = { type: 'op', op: '*', left: node, right: power(true), implicit: true };
        } else if (t && t.t === 'num') {
          // '2 3' 'x2' 처럼 숫자 앞의 곱은 뜻이 모호하다 — 곱하기 기호를 쓰게 한다
          fail('숫자 앞에는 곱하기 기호(×)를 써 주세요');
        } else {
          return node;
        }
      }
    }
    function unary(fracOk) {
      var t = peek();
      if (isOp(t, '-')) { pos++; return { type: 'neg', arg: unary(fracOk) }; }
      if (isOp(t, '+')) { pos++; return unary(fracOk); }
      return power(fracOk);
    }
    function power(fracOk) {
      var base = primary(fracOk);
      if (isOp(peek(), '^')) {
        pos++;
        return { type: 'op', op: '^', left: base, right: unary(false) };   // 2^3^2 = 2^(3^2), 2^-1
      }
      return base;
    }
    function group() {
      var open = toks[pos++];
      var inner = expr();
      var close = toks[pos++];
      if (!close || close.t !== ')' || CLOSE_OF[open.v] !== close.v) fail('괄호 짝이 맞지 않아요');
      inner.paren = true;
      return inner;
    }
    function primary(fracOk) {
      var t = peek();
      if (!t) fail('식이 덜 끝났어요');
      if (t.t === '(') return group();
      pos++;
      if (t.t === 'num') {
        var node = { type: 'num', value: t.value, text: t.text };
        var sl = toks[pos], dn = toks[pos + 1];
        // 대분수 '2 3/4' = 2 + 3/4 (Frac.from·parseNumberAnswer 와 같게): 정수 뒤에 띄어 쓴 정수/정수
        if (fracOk && isWhole(t) && isWhole(sl) && isOp(dn, '/') && !dn.sym && isWhole(toks[pos + 2]) &&
            !isOp(toks[pos + 3], '^')) {
          var fr = { type: 'op', op: '/', left: numNode(sl), right: numNode(toks[pos + 2]), frac: true };
          pos += 3;
          return { type: 'op', op: '+', left: node, right: fr, mixed: true };
        }
        if (fracOk && isOp(sl, '/') && !sl.sym && dn && dn.t === 'num' && !isOp(toks[pos + 2], '^')) {
          pos += 2;
          return { type: 'op', op: '/', left: node, right: { type: 'num', value: dn.value, text: dn.text }, frac: true };
        }
        return node;
      }
      if (t.t === 'var') return { type: 'var', name: t.name };
      if (t.t === 'pi') return { type: 'const', name: 'pi', value: Math.PI };
      if (t.t === 'sqrt') {
        // √(…) 은 괄호 안만, 괄호 없으면 바로 뒤 거듭제곱까지: √x^2 = √(x^2), √2x = √2·x, √3/4 = (√3)/4
        var nx = peek();
        var arg = (nx && nx.t === '(') ? group() : unary(false);
        return { type: 'func', name: 'sqrt', arg: arg };
      }
      return fail('식을 읽을 수 없어요: "' + (t.v || t.t) + '" 자리');
    }

    var ast = expr();
    if (pos < toks.length) fail('식을 끝까지 읽지 못했어요 (괄호나 기호를 확인해 주세요)');
    return ast;
  }

  function toNumber(v) {
    if (typeof v === 'number') return v;
    if (v instanceof Frac || isFracLike(v)) return v.num / v.den;
    return from(v).valueOf();
  }

  // 정의되지 않는 값(0 으로 나누기, 음수의 제곱근)은 throw 하지 않고 NaN·±Infinity 로 낸다
  function evalNode(n, vars) {
    switch (n.type) {
      case 'num': return n.value;
      case 'const': return Math.PI;
      case 'var':
        if (!vars || !hasOwn(vars, n.name)) fail('변수 ' + n.name + ' 의 값이 없어요');
        return toNumber(vars[n.name]);
      case 'neg': return -evalNode(n.arg, vars);
      case 'func':
        if (n.name === 'sqrt') return Math.sqrt(evalNode(n.arg, vars));
        break;
      case 'op':
        var a = evalNode(n.left, vars), b = evalNode(n.right, vars);
        switch (n.op) {
          case '+': return a + b;
          case '-': return a - b;
          case '*': return a * b;
          case '/': return a / b;
          case '^': return Math.pow(a, b);
        }
        break;
    }
    return fail('알 수 없는 식 노드예요: ' + show(n.type));
  }

  function evalExpr(x, vars) {
    return evalNode(parseExpr(x), vars || {});
  }

  // 식에 나오는 변수 이름 (정렬)
  function exprVars(x) {
    var ast = parseExpr(x), seen = {}, out = [];
    (function walk(n) {
      if (!n || typeof n !== 'object') return;
      if (n.type === 'var') {
        if (!seen[n.name]) { seen[n.name] = true; out.push(n.name); }
        return;
      }
      walk(n.arg); walk(n.left); walk(n.right);
    })(ast);
    return out.sort();
  }

  // 정수·0 근처를 피한 무작위 소수 (-range, range)
  function sampleVal(rand, range) {
    for (;;) {
      var u = (rand() * 2 - 1) * range;
      if (Math.abs(u - Math.round(u)) >= 0.1) return u;
    }
  }

  // 두 식이 같은 식인지: 변수에 무작위 값(-3~3 소수, 고정 seed)을 대입해 비교.
  // 한쪽이라도 정의되지 않는 점은 건너뛴다. -3~3 에서 유효한 점이 8개가 안 되면 -10~10, -100~100 에서 더 찾는다
  // (√(x-5) 처럼 정의역이 좁은 식). 유효한 점이 5개 미만이면 false.
  var EQ_RANGES = [3, 10, 100];
  function exprEqual(a, b, opts) {
    var A, B;
    try { A = parseExpr(a); B = parseExpr(b); } catch (e) { return false; }
    var names = exprVars(A).concat(exprVars(B)), fixed = null;
    var ov = opts && opts.vars;
    if (Array.isArray(ov)) names = names.concat(ov);
    else if (ov && typeof ov === 'object') fixed = ov;     // { a: 2 } 처럼 값을 고정할 변수
    var uniq = [];
    for (var i = 0; i < names.length; i++) if (uniq.indexOf(names[i]) < 0) uniq.push(names[i]);
    var rand = rng(0x5EED), valid = 0;
    for (var r = 0; r < EQ_RANGES.length && valid < 8; r++) {
      for (var tries = 0; tries < 30 && valid < 8; tries++) {
        var env = {};
        for (var j = 0; j < uniq.length; j++) {
          env[uniq[j]] = (fixed && hasOwn(fixed, uniq[j])) ? toNumber(fixed[uniq[j]]) : sampleVal(rand, EQ_RANGES[r]);
        }
        var va, vb;
        try { va = evalNode(A, env); vb = evalNode(B, env); } catch (e) { return false; }
        if (!isFinite(va) || !isFinite(vb)) continue;
        if (!close(va, vb)) return false;
        valid++;
      }
    }
    return valid >= 5;
  }

  function exactNode(n) {
    switch (n.type) {
      case 'num': return from(n.text !== undefined ? n.text : n.value);   // '0.1' 은 정확히 1/10
      case 'neg': return exactNode(n.arg).neg();
      case 'op':
        var a = exactNode(n.left), b = exactNode(n.right);
        switch (n.op) {
          case '+': return a.add(b);
          case '-': return a.sub(b);
          case '*': return a.mul(b);
          case '/': return a.div(b);
          case '^':
            if (!b.isInt() || Math.abs(b.num) > 4096) fail('정수 지수만 정확히 계산해요');
            return a.pow(b.num);
        }
    }
    return fail('정확한 분수로 계산할 수 없어요');   // 변수, π, √
  }

  // 변수 없는 + - × ÷ 거듭제곱(정수 지수)·괄호 식 → Frac. 그 밖(변수·π·√·0 으로 나누기·범위 초과·못 읽음)은 null
  function exactValue(x) {
    try { return exactNode(parseExpr(x)); } catch (e) { return null; }
  }

  /* ================================================================
   * 2.5 채점
   * ================================================================ */

  // 비교용 글자 다듬기
  function normText(s) {
    if (s === null || s === undefined) return '';
    var t = show(s)
      .replace(/\u00B2/g, '^2').replace(/\u00B3/g, '^3')                   // NFKC 가 ²를 2로 바꾸기 전에
      .replace(/[\u2018\u2019\u201A\u201B\u2032`\u00B4]/g, "'")       // ‘ ’ ‚ ‛ ′ ` ´
      .replace(/[\u201C\u201D\u201E\u201F\u2033]/g, '"');                  // “ ” „ ‟ ″
    return t.normalize('NFKC').toLowerCase()
      .replace(MINUS_RE, '-')
      .replace(/\u00D7/g, '*').replace(/[\u00F7\u2044]/g, '/')            // ÷, ½ 의 NFKC 결과(1⁄2)의 빗금
      .replace(/\s+/g, '')
      .replace(END_PUNCT_RE, '');
  }

  // ½ 같은 분수 글자를 'a b/c' 꼴로 풀고 NFKC (전각 숫자 등)
  function prenorm(s) {
    return String(s).replace(VULGAR_RE, function (m, w, ch) {
      var p = vulgarParts(ch);
      return (w ? w + ' ' : '') + p[0] + '/' + p[1];
    }).normalize('NFKC').replace(MINUS_RE, '-').replace(/\u2044/g, '/');
  }

  function mixedOf(sign, whole, num, den) {
    var f = F(Number(num), Number(den));
    if (whole) f = f.add(Number(whole));
    return sign === '-' ? f.neg() : f;
  }

  // 학생이 쓴 수 → Frac. 못 읽으면 null (throw 하지 않는다)
  function parseNumberAnswer(s) {
    try {
      if (s === null || s === undefined) return null;
      if (s instanceof Frac) return s;
      if (typeof s === 'number') return isFinite(s) ? from(s) : null;
      if (isFracLike(s)) return from(s);
      if (typeof s !== 'string') return null;
      var t = trim(prenorm(s)).replace(END_PUNCT_RE, ''), m;
      t = trim(t);
      if ((m = /^\$(.*)\$$/.exec(t))) t = trim(m[1]);                                   // $…$
      if ((m = /^([+-]?)\s*(\d+)?\s*\\d?frac\s*\{\s*(\d+)\s*\}\s*\{\s*(\d+)\s*\}$/.exec(t))) {
        return mixedOf(m[1], m[2], m[3], m[4]);                                          // \frac{3}{4}, 1\frac{1}{2}
      }
      // 1과 4분의 3
      if ((m = /^([+-]?)\s*(\d+)\s*[\uACFC\uC640]\s*(\d+)\s*\uBD84\uC758\s*(\d+)$/.exec(t))) return mixedOf(m[1], m[2], m[4], m[3]);
      // 4분의 3 = 3/4
      if ((m = /^([+-]?)\s*(\d+)\s*\uBD84\uC758\s*(\d+)$/.exec(t))) return mixedOf(m[1], '', m[3], m[2]);
      // 1과 2/3, 2와 1/2
      if ((m = /^([+-]?)\s*(\d+)\s*[\uACFC\uC640]\s*(\d+)\s*\/\s*(\d+)$/.exec(t))) return mixedOf(m[1], m[2], m[3], m[4]);
      return from(t);
    } catch (e) {
      return null;
    }
  }

  function toList(a) { return Array.isArray(a) ? a : [a]; }

  // 단위 변형(입력처럼 NFKC·소문자·공백 없음): 'cm²' → cm2, cm^2 / '°' ↔ '도' / '°C'·'℃' ↔ '도' / '%' ↔ '퍼센트' / '%p' ↔ '퍼센트포인트'
  // 여러 낱말 단위는 앞 낱말만 써도 된다: '7번째'(번째 달) '80만'(만 원) '16π'(π cm²) — 뒤 낱말만은 아니다('80원' 은 80만 원이 아니다)
  function unitVariants(unit) {
    var u = String(unit), base = trim(prenorm(u).toLowerCase()).replace(/\s+/g, ' ');
    var list = [u, base, u.replace(/²/g, '^2').replace(/³/g, '^3')];
    if (base === '°' || base === '도') list.push('°', '도', '˚', 'º', '°c', '°f');   // ° 도 ˚ º °C °F (℃·℉ 는 NFKC 로 °c·°f)
    if (base === '°c' || base === '°f') list.push('도', '˚' + base.slice(1), 'º' + base.slice(1));   // 25도 = 25°C
    if (base === '%') list.push('퍼센트', '프로');                                                        // 퍼센트 프로
    if (base === '%p') list.push('퍼센트포인트', '%포인트', '포인트');          // 퍼센트포인트 %포인트 포인트
    var words = base.split(' ');
    if (words.length > 1 && words[0]) list.push(words[0]);
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var v = prenorm(list[i]).toLowerCase().replace(/\s+/g, '');
      if (v && out.indexOf(v) < 0) out.push(v);
    }
    return out.sort(function (x, y) { return y.length - x.length; });   // 긴 것부터
  }

  // low 의 끝이 v(공백 없음)와 같으면 — 사이의 공백은 건너뛴다('80만 원' = '80만원') — v 가 시작하는 자리, 아니면 -1
  function unitStart(low, v) {
    var i = low.length;
    for (var j = v.length - 1; j >= 0; j--) {
      do { i--; } while (i >= 0 && /\s/.test(low.charAt(i)));
      if (i < 0 || low.charAt(i) !== v.charAt(j)) return -1;
    }
    return i;
  }

  function stripUnit(s, unit) {
    if (unit === undefined || unit === null || unit === '') return s;
    var low = s.toLowerCase(), vs = unitVariants(unit);
    for (var i = 0; i < vs.length; i++) {
      var k = unitStart(low, vs[i]);
      if (k > 0 && trim(low.slice(0, k))) return trim(low.slice(0, k));
    }
    return s;
  }

  // 답을 문장처럼 쓴 꼴(2026-10-09): 끝 '쯤·정도'·'입니다·이에요·예요·이요·요', 앞 '답은·정답:·답'·'약·대략' — 떼고 수만 본다
  var ANS_TAIL_RE = /\s*(?:쯤|정도)?\s*(?:입니다|이에요|예요|이요|요)?$/;
  var ANS_LEAD_RE = /^(?:(?:정답|답)\s*(?:은|는|:|=)?\s*)?(?:약|대략)?\s*/;

  // 'number' 채점용: 끝 문장부호·말끝·단위·앞말·'x=' 를 뗀다
  function cleanNumberInput(x, unit) {
    var s = trim(prenorm(show(x))).replace(END_PUNCT_RE, '');
    s = trim(trim(s).replace(ANS_TAIL_RE, ''));
    s = stripUnit(s, unit);
    s = trim(s.replace(ANS_LEAD_RE, ''));
    return trim(s.replace(/^[a-z]\s*=\s*/i, ''));
  }

  var PM_LEAD_RE = /^(±|\+\s*\/?\s*-)\s*/;   // ± +- +/-

  // 학생이 쓴 수 답을 읽을 글로: 위 정리 + 문제 글이 '±'를 이미 보이면('오차 범위는 ±몇 %p') 앞에 붙여 쓴 ±는 뗀다 — 그 밖에는 답이 둘이라 틀린 답
  function numberInput(problem, input) {
    var s = cleanNumberInput(input, problem.unit);
    if (PM_LEAD_RE.test(s) && typeof problem.q === 'string' && problem.q.indexOf('±') >= 0) s = s.replace(PM_LEAD_RE, '');
    return s;
  }

  function checkNumber(problem, input) {
    var v = parseNumberAnswer(numberInput(problem, input));
    if (!v) return false;
    var answers = toList(problem.answer);
    for (var i = 0; i < answers.length; i++) {
      var a = answers[i];
      var f = typeof a === 'string' ? parseNumberAnswer(cleanNumberInput(a, problem.unit)) : parseNumberAnswer(a);
      if (f && f.eq(v)) return true;
    }
    return false;
  }

  // 'y = 2x+1' 처럼 앞에 '글자 =' 하나가 있으면 오른쪽만. $ 와 끝 문장부호는 뗀다
  function cleanExprText(x) {
    var s = trim(show(x).replace(/\$/g, '')).replace(END_PUNCT_RE, '');
    var m = /^\s*[a-zA-Z]\s*=([^=]*)$/.exec(s);
    if (m) s = m[1];
    return trim(s);
  }

  function checkExpr(problem, input) {
    var s = cleanExprText(input), answers = toList(problem.answer);
    for (var i = 0; i < answers.length; i++) {
      if (answers[i] === null || answers[i] === undefined) continue;
      var t = cleanExprText(answers[i]);
      if (exprEqual(s, t) || (normText(s) !== '' && normText(s) === normText(t))) return true;
    }
    return false;
  }

  // 모음 원소 하나: 정확한 수(Frac)면 f, 아니면(√2 등) 값 v 만
  function setElem(t) {
    var f = parseNumberAnswer(t) || exactValue(t);
    if (f) return { f: f, v: f.valueOf() };
    var ast = parseExpr(t);
    if (exprVars(ast).length) return null;
    var v = evalNode(ast, {});
    return isFinite(v) ? { f: null, v: v } : null;
  }

  // 'x=2, x=3' '2 또는 3' '-1,4' 'x=-1 또는 x=4' '±2' '1±√2' → [{f, v}] (못 읽으면 null)
  function parseSetList(x) {
    if (typeof x === 'number' || x instanceof Frac || isFracLike(x)) {
      var one = parseNumberAnswer(x);
      return one ? [{ f: one, v: one.valueOf() }] : null;
    }
    if (typeof x !== 'string') return null;
    var s = trim(prenorm(x).toLowerCase()).replace(END_PUNCT_RE, '');
    s = trim(s);
    // 전체를 감싼 괄호 하나({2, 3} (2, 3))는 벗긴다
    var m = /^([({[])([^(){}[\]]*)([)}\]])$/.exec(s);
    if (m && CLOSE_OF[m[1]] === m[3]) s = m[2];
    s = s.replace(/[a-z][a-z0-9_]*\s*=\s*/g, ' ')                 // x= x1= 떼기
      .replace(/\+\/-|\+-/g, '\u00B1')                            // +- +/- → ±
      // , ; 、 또는 그리고 이고 및 and or 와 과
      .replace(/,|;|\u3001|\uB610\uB294|\uADF8\uB9AC\uACE0|\uC774\uACE0|\uBC0F|and|or|[\uACFC\uC640]/g, ' ')
      .replace(/\s+([+\-])\s+/g, '$1')                            // 앞뒤로 띄운 + - 는 이어 쓴 식: '1 + √2'
      .replace(/\s*([*\/^\u00B1\u00D7\u00F7])\s*/g, '$1')
      .replace(/\u221A\s+/g, '\u221A');
    var parts = trim(s).split(/\s+/), out = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (!p) continue;
      var k = p.indexOf('\u00B1');
      if (k >= 0 && p.indexOf('\u00B1', k + 1) >= 0) return null;   // ± 는 하나만
      var alts = k >= 0 ? [p.replace('\u00B1', '+'), p.replace('\u00B1', '-')] : [p];
      for (var j = 0; j < alts.length; j++) {
        var e = setElem(alts[j]);
        if (!e) return null;
        out.push(e);
      }
    }
    return out.length ? out : null;
  }

  function sameVal(a, b) { return (a.f && b.f) ? a.f.eq(b.f) : close(a.v, b.v); }
  function uniqVals(list) {
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var dup = false;
      for (var j = 0; j < out.length; j++) if (sameVal(out[j], list[i])) { dup = true; break; }
      if (!dup) out.push(list[i]);
    }
    return out;
  }
  function someVal(list, x) {
    for (var i = 0; i < list.length; i++) if (sameVal(list[i], x)) return true;
    return false;
  }

  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&'); }

  // 모음 답에서 수 바로 뒤에 붙여 쓴 단위를 뗀다('3 N, 11 N' → '3, 11') — 단위 글자 사이 공백은 있어도 없어도,
  // 단위 뒤에 글자·숫자가 이어지면 다른 단위라 그대로 둔다('3 nm' 의 n, '2 or 3' 의 o)
  function stripSetUnits(x, unit) {
    if (unit === undefined || unit === null || unit === '' || typeof x !== 'string') return x;
    var s = prenorm(x).toLowerCase(), vs = unitVariants(unit);
    for (var i = 0; i < vs.length; i++) {
      var pat = Array.from(vs[i]).map(reEsc).join('\\s*');
      s = s.replace(new RegExp('(\\d)\\s*' + pat + '(?![a-z0-9^])', 'g'), '$1');
    }
    return s;
  }

  function checkSet(problem, input) {
    var mine = parseSetList(stripSetUnits(show(input), problem.unit));
    if (!mine) return false;
    var want = [], answers = toList(problem.answer);
    for (var i = 0; i < answers.length; i++) {
      var part = parseSetList(stripSetUnits(answers[i], problem.unit));
      if (!part) return false;
      want = want.concat(part);
    }
    mine = uniqVals(mine); want = uniqVals(want);
    if (mine.length !== want.length) return false;
    for (var a = 0; a < mine.length; a++) if (!someVal(want, mine[a])) return false;
    for (var b = 0; b < want.length; b++) if (!someVal(mine, want[b])) return false;
    return true;
  }

  function checkText(problem, input) {
    var s = normText(show(input).replace(/\$/g, '')), answers = toList(problem.answer);
    if (!s) return false;
    for (var i = 0; i < answers.length; i++) {
      if (answers[i] === null || answers[i] === undefined) continue;
      if (normText(show(answers[i]).replace(/\$/g, '')) === s) return true;
    }
    return false;
  }

  // 보기 번호: 숫자 또는 '2' 같은 숫자 글자
  function toIndex(v) {
    if (typeof v === 'number') return Number.isInteger(v) ? v : NaN;
    if (typeof v === 'string' && /^\s*\d+\s*$/.test(v)) return Number(v);
    return NaN;
  }

  // O/X: true/false, 'O'/'X', '○'/'×', 'true'/'false'
  function toBool(v) {
    if (v === true || v === false) return v;
    if (typeof v === 'string') {
      var s = trim(v).toLowerCase();
      if (s === 'o' || s === '\u25CB' || s === '\u25EF' || s === 'true') return true;
      if (s === 'x' || s === '\u00D7' || s === '\u2715' || s === 'false') return false;
    }
    return null;
  }

  function checkChoice(answer, input) {
    if (Array.isArray(answer)) {       // 여러 개 고르기 (계약 밖 덤)
      if (!Array.isArray(input)) return answer.length === 1 && toIndex(answer[0]) === toIndex(input);
      var a = answer.map(toIndex).sort(), b = input.map(toIndex).sort();
      if (a.length !== b.length) return false;
      for (var i = 0; i < a.length; i++) if (a[i] !== b[i] || isNaN(a[i])) return false;
      return true;
    }
    var k = toIndex(input);
    return !isNaN(k) && k === toIndex(answer);
  }

  function checkOrder(answer, input) {
    if (!Array.isArray(answer) || !Array.isArray(input) || answer.length !== input.length) return false;
    for (var i = 0; i < answer.length; i++) {
      var k = toIndex(input[i]);
      if (isNaN(k) || k !== toIndex(answer[i])) return false;
    }
    return true;
  }

  function isEmptyInput(input) {
    if (input === null || input === undefined) return true;
    if (typeof input === 'string') return trim(input) === '';
    if (typeof input === 'number') return isNaN(input);
    if (Array.isArray(input)) return input.length === 0;
    return false;
  }

  function checkShortOne(problem, kind, input) {
    switch (kind) {
      case 'number': return checkNumber(problem, input);
      case 'expr': return checkExpr(problem, input);
      case 'set': return checkSet(problem, input);
      default: return checkText(problem, input);
    }
  }

  // 학생 답을 그 문제의 채점 방식(수·모음·식)으로 읽을 수 있는가 — 값이 맞는지는 따지지 않는다. 화면이 채점 전에
  // '수로 읽지 못했어요 — 다시 써 주세요' 안내에 쓴다(2026-10-09). 글 답·보기 문제·빈 답·판단할 수 없을 때는 true(막지 않는다)
  function readable(problem, input) {
    try {
      if (!problem || typeof problem !== 'object' || problem.type !== 'short' || isEmptyInput(input) || Array.isArray(input)) return true;
      var kind = problem.check || 'text', s = show(input);
      if (kind !== 'number' && kind !== 'set' && kind !== 'expr') return true;
      var ok = false;
      try { ok = checkShortOne(problem, kind, s); } catch (e3) { ok = false; }   // 정답이면 읽을 수 있다(식으로 못 읽어도 글자가 같은 정답)
      if (ok) return true;
      if (kind === 'number') return !!parseNumberAnswer(numberInput(problem, s));
      if (kind === 'set') { try { return !!parseSetList(stripSetUnits(s, problem.unit)); } catch (e2) { return false; } }
      try { parseExpr(cleanExprText(s)); return true; } catch (e1) { return false; }
    } catch (e) {
      return true;
    }
  }

  function checkShort(problem, input) {
    var kind = problem.check || 'text';
    if (Array.isArray(input)) {
      // 'set' 은 배열을 모음으로. 그 밖은 정답 배열을 그대로 넣어 본 경우: 원소 하나하나가 모두 정답이어야 한다
      if (kind === 'set') return checkSet(problem, input.join(', '));
      for (var i = 0; i < input.length; i++) {
        if (isEmptyInput(input[i]) || !checkShortOne(problem, kind, input[i])) return false;
      }
      return input.length > 0;
    }
    return checkShortOne(problem, kind, input);
  }

  // 절대 throw 하지 않는다: 이상한 문제·입력은 { correct: false }
  function checkAnswer(problem, input) {
    var empty = false;
    try {
      empty = isEmptyInput(input);
      if (empty || !problem || typeof problem !== 'object') return { correct: false, empty: empty };
      var ok = false;
      switch (problem.type) {
        case 'choice': ok = checkChoice(problem.answer, input); break;
        case 'ox': ok = toBool(input) !== null && toBool(input) === toBool(problem.answer); break;
        case 'order': ok = checkOrder(problem.answer, input); break;
        case 'short': ok = checkShort(problem, input); break;
        default: ok = false;
      }
      return { correct: ok === true, empty: false };
    } catch (e) {
      return { correct: false, empty: empty };
    }
  }

  function valText(v) {
    if (v === null || v === undefined) return '';
    if (v instanceof Frac) return v.toString();
    if (typeof v === 'number') return Number.isInteger(v) ? String(v) : fmtDec(v);
    return show(v);
  }

  function choiceAt(problem, i) {
    var c = problem.choices, k = toIndex(i);
    return (Array.isArray(c) && c[k] !== undefined) ? show(c[k]) : valText(i);
  }

  // 화면에 보일 정답 문구. choice: 보기 내용, ox: 'O'/'X', order: 'ㄱ → ㄴ → ㄷ', short: 첫 정답('set' 이면 모두)
  function answerText(problem) {
    try {
      if (!problem || typeof problem !== 'object') return '';
      var a = problem.answer;
      switch (problem.type) {
        case 'choice':
          if (Array.isArray(a)) return a.map(function (i) { return choiceAt(problem, i); }).join(', ');
          return choiceAt(problem, a);
        case 'ox':
          var b = toBool(a);
          return b === true ? 'O' : (b === false ? 'X' : '');
        case 'order':
          return Array.isArray(a) ? a.map(function (i) { return choiceAt(problem, i); }).join(' \u2192 ') : '';
        case 'short':
          if (Array.isArray(a)) return problem.check === 'set' ? a.map(valText).join(', ') : valText(a[0]);
          return valText(a);
        default:
          return valText(a);
      }
    } catch (e) {
      return '';
    }
  }

  return {
    // 2.1 분수
    F: F,
    Frac: Frac,
    // 2.2 정수
    gcd: gcd,
    lcm: lcm,
    isPrime: isPrime,
    primeFactors: primeFactors,
    divisors: divisors,
    // 2.3 난수·생성 도구
    rng: rng,
    toolkit: toolkit,
    fmt: FMT,                 // = R.fmt (계약 밖 덤: 풀이 엔진도 쓰게)
    // 2.4 식
    parseExpr: parseExpr,
    evalExpr: evalExpr,
    exprEqual: exprEqual,
    exactValue: exactValue,
    exprVars: exprVars,       // 계약 밖 덤
    // 2.5 채점
    normText: normText,
    parseNumberAnswer: parseNumberAnswer,
    checkAnswer: checkAnswer,
    readable: readable,       // (problem, input) → 그 채점 방식으로 읽을 수 있는가(값은 따지지 않음)
    answerText: answerText,
    // 조사 고르기 (ARCHITECTURE §2.3)
    josa: josa
  };
});
