/*
 * 가정교사 — js/solver.js (전역 TutorSolver)
 * 학생이 친 수학 질문(계산·방정식·부등식·약수와 배수·단위·전개·미분·적분 …)을 풀이 단계와 함께 푼다.
 * DOM 을 쓰지 않는 순수 함수만 둔다. 계약: docs/ARCHITECTURE.md §6
 *
 *   TutorSolver.solve(text, { grade }) → null | { kind, title, steps: [서식 글…], answer: 서식 글 }
 *   TutorSolver.detect(text) → kind | null
 *
 * - 확신이 없으면 null 을 낸다(엉뚱한 답보다 "모르겠어요"가 낫다).
 * - 수는 모두 TutorMath 의 Frac(정확한 분수)으로 계산한다. 부동소수 근삿값으로 답을 내지 않는다.
 * - 말투: 초등(e*) 쉬운 해요체 · 중등(m*, 학년 모름) 교과 용어 해요체 · 고등(h*) 합니다체 · 대학·성인(u, a) 간결한 합니다체.
 * - 문법은 ES2018 까지(?. ?? 정규식 뒤보기 없음).
 */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorSolver = mod;
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  /* ================================================================
   * TutorMath 잇기 — 브라우저는 전역, node 는 require
   * ================================================================ */

  var TM = null;
  function M() {
    if (TM) return TM;
    if (root && root.TutorMath) TM = root.TutorMath;
    else if (typeof module === 'object' && module.exports && typeof require === 'function') TM = require('./mathlib.js');
    if (!TM) throw new Error('TutorSolver: TutorMath 가 없어요');
    return TM;
  }
  function F(n, d) { return M().F(n, d === undefined ? 1 : d); }
  function fr(x) { return M().Frac.from(x); }
  function isFrac(x) { return !!x && typeof x === 'object' && typeof x.num === 'number' && typeof x.den === 'number'; }

  // 풀 수 없는 꼴 — 잡아서 null 로 바꾼다
  function Unsolvable(msg) { this.message = msg || 'unsolvable'; }
  function nope(msg) { throw new Unsolvable(msg); }
  // 0 으로 나누기 — null 이 아니라 설명하는 결과를 낸다
  function DivZero() { this.message = 'div0'; }

  function hasOwn(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function uniq(a) { var o = []; for (var i = 0; i < a.length; i++) if (o.indexOf(a[i]) < 0) o.push(a[i]); return o; }

  var LIMIT_OPS = 20;       // 연산이 이보다 많으면 null
  var LIMIT_DIGITS = 12;    // 이보다 긴 수는 null
  var LIMIT_LEN = 200;      // 질문 글자 수

  /* ================================================================
   * 말투 — 해요체(중등) 문장 하나로 쓰고, 고등 이상은 합니다체로 바꾼다
   * ================================================================ */

  function toneOf(grade) {
    var g = (grade === undefined || grade === null) ? '' : String(grade).trim().toLowerCase();
    var c = g.charAt(0);
    if (c === 'e') return 'e';
    if (c === 'h') return 'h';
    if (c === 'u' || c === 'a') return 'u';
    return 'm';
  }

  // 한글 음절 나누기
  function hangul(ch) {
    var c = ch.charCodeAt(0) - 0xAC00;
    if (c < 0 || c > 11171) return null;
    return { l: Math.floor(c / 588), v: Math.floor((c % 588) / 28), t: c % 28 };
  }
  function syl(l, v, t) { return String.fromCharCode(0xAC00 + l * 588 + v * 28 + t); }

  // '~요' 로 끝나는 낱말(요 뺀 앞부분) → 합니다체. 모르는 꼴이면 null (그대로 둔다)
  var FORMAL_EXC = {
    '어려워': '어렵습니다', '쉬워': '쉽습니다', '가까워': '가깝습니다', '커': '큽니다', '써': '씁니다',
    '몰라': '모릅니다', '달라': '다릅니다', '만들어': '만듭니다', '그어': '긋습니다', '거예': '것입니다',
    '아니에': '아닙니다', '들어': '듭니다'
  };
  function formalWord(w) {
    var k;
    for (k in FORMAL_EXC) {
      if (hasOwn(FORMAL_EXC, k) && w.length >= k.length && w.slice(-k.length) === k) return w.slice(0, -k.length) + FORMAL_EXC[k];
    }
    if (/이에$/.test(w)) return w.slice(0, -2) + '입니다';
    if (/예$/.test(w)) return w.slice(0, -1) + '입니다';
    var last = w.charAt(w.length - 1), h = hangul(last);
    if (!h) return null;
    if ((last === '어' || last === '아') && w.length >= 2) {
      var p = w.charAt(w.length - 2), ph = hangul(p);
      if (!ph) return null;
      if (ph.t === 8) return w.slice(0, -2) + syl(ph.l, ph.v, 17) + '니다';      // ㄹ 받침: 풀어 → 풉니다
      if (ph.t) return w.slice(0, -1) + '습니다';                                  // 있어 → 있습니다
      return w.slice(0, -2) + syl(ph.l, ph.v, 17) + '니다';                        // 나누어 → 나눕니다
    }
    if (h.t) return null;
    var v = h.v;
    if (last === '해') return w.slice(0, -1) + '합니다';
    if (v === 10) v = 11;        // ㅙ → ㅚ (돼 → 됩)
    else if (v === 9) v = 8;     // ㅘ → ㅗ (봐 → 봅)
    else if (v === 14) v = 13;   // ㅝ → ㅜ (줘 → 줍)
    else if (v === 6) v = 20;    // ㅕ → ㅣ (져 → 집)
    return w.slice(0, -1) + syl(h.l, v, 17) + '니다';
  }

  // 수식($…$) 밖의 '…요' 를 합니다체로
  function formal(s) {
    var parts = String(s).split('$');
    for (var i = 0; i < parts.length; i += 2) {
      parts[i] = parts[i].replace(/([가-힣]+)요(?=[\s.!?,:;()\]~*]|$)/g, function (m0, w) {
        var r = formalWord(w);
        return r === null ? m0 : r;
      });
    }
    return parts.join('$');
  }

  // 말투 고르기: m(해요체) 하나만 주면 고등 이상은 자동으로 합니다체
  function say(ctx, m, e, h, u) {
    var t = ctx.tone;
    if (t === 'e') return e !== undefined && e !== null ? e : m;
    if (t === 'm') return m;
    if (t === 'h') return h !== undefined && h !== null ? h : formal(m);
    if (u !== undefined && u !== null) return u;
    return h !== undefined && h !== null ? h : formal(m);
  }

  /* ================================================================
   * 조사 — 수·식·낱말의 읽는 소리 끝으로 고른다
   * ================================================================ */

  // [받침 있음, ㄹ 받침]
  var NO = [false, false], YES = [true, false], RIEUL = [true, true];
  var DIGIT_SOUND = { '0': YES, '1': RIEUL, '2': NO, '3': YES, '4': NO, '5': NO, '6': YES, '7': RIEUL, '8': RIEUL, '9': NO };
  // 영어 글자 읽기 (l 엘, m 엠, n 엔, r 알 만 받침)
  var LETTER_SOUND = { l: RIEUL, m: YES, n: YES, r: RIEUL };
  var CMD_SOUND = { pi: NO, square: NO, infty: NO, alpha: NO, beta: NO, theta: NO, circ: NO, degree: NO };

  function numSound(s) {
    s = s.replace(/[^0-9.]/g, '');
    if (!s || s === '.') return null;
    if (s.indexOf('.') >= 0) return DIGIT_SOUND[s.charAt(s.length - 1)] || null;   // 소수점 아래는 한 자리씩 읽는다
    s = s.replace(/^0+(?=\d)/, '');
    if (s === '0') return YES;                       // 영
    var z = /0*$/.exec(s)[0].length;
    if (!z) return DIGIT_SOUND[s.charAt(s.length - 1)];
    return z >= 12 ? NO : YES;                       // 십·백·천·만·억 은 받침, 조 는 없음
  }

  // 닫는 '}' 와 짝인 '{' 위치
  function openOf(s, close) {
    var depth = 0;
    for (var i = close; i >= 0; i--) {
      var c = s.charAt(i);
      if (c === '}' && s.charAt(i - 1) !== '\\') depth++;
      else if (c === '{' && s.charAt(i - 1) !== '\\') { depth--; if (depth === 0) return i; }
    }
    return -1;
  }

  function lastSound(src) {
    var s = String(src);
    for (var guard = 0; guard < 30; guard++) {
      s = s.replace(/[\s$]+$/, '').replace(/\\[,;: ]$/, '').replace(/\\quad$/, '');
      if (!s) return null;
      var m;
      if ((m = /(\\right[)\].|]|\\right\\\}|\\\}|[)\]|])$/.exec(s))) { s = s.slice(0, -m[0].length); continue; }
      if (/[가-힣]$/.test(s)) {
        var h = hangul(s.charAt(s.length - 1));
        return h.t ? (h.t === 8 ? RIEUL : YES) : NO;
      }
      if (/[0-9]$/.test(s)) return numSound(/[0-9.]+$/.exec(s)[0]);
      if (/%$/.test(s)) return NO;                    // 퍼센트
      if ((m = /\\([a-zA-Z]+)$/.exec(s))) return CMD_SOUND[m[1]] || NO;
      if (/[a-zA-Z]$/.test(s)) return LETTER_SOUND[s.charAt(s.length - 1).toLowerCase()] || NO;
      if (/'$/.test(s)) return NO;                    // f' (프라임)
      if (/\}$/.test(s)) {
        var o = openOf(s, s.length - 1);
        if (o < 0) return null;
        var before = s.slice(0, o), inner = s.slice(o + 1, -1);
        if (/\^$/.test(before)) return YES;           // 제곱(ㅂ)
        if (/\}$/.test(before)) {                     // \frac{a}{b} 는 'b분의 a' — 분자로
          var o2 = openOf(before, before.length - 1);
          if (o2 >= 0 && /\\d?frac$/.test(before.slice(0, o2))) { s = before.slice(o2 + 1, -1); continue; }
        }
        s = inner;                                    // \sqrt{2}, \text{원}, 아래첨자 …
        continue;
      }
      return null;
    }
    return null;
  }

  // jo('$x=3$', '이에요/예요') → '이에요'
  function jo(word, pair) {
    var p = pair.split('/'), snd = lastSound(word) || NO;
    if (p.length === 1) return p[0];
    if (p[0] === '으로') return (snd[0] && !snd[1]) ? p[0] : p[1];
    return snd[0] ? p[0] : p[1];
  }
  function wj(word, pair) { return word + jo(word, pair); }

  /* ================================================================
   * 수 표기
   * ================================================================ */

  // Frac → TeX. opts.mixed: 대분수로
  function ftex(f, opts) { return fr(f).toTex(opts); }
  function isNeg(f) { return fr(f).sign() < 0; }
  // 음수면 괄호
  function ptex(f) {
    f = fr(f);
    if (f.sign() >= 0) return f.toTex();
    var t = f.toTex();
    return t.indexOf('\\frac') >= 0 ? '\\left(' + t + '\\right)' : '(' + t + ')';
  }
  // 소수로 끝나는 분수면 소수 글자, 아니면 null
  function decOf(f) { return fr(f).toDecimal(LIMIT_DIGITS); }
  // 큰 정수는 세 자리마다 쉼표(만 이상) — 수식 밖 글에 쓴다
  function commas(s) {
    var m = /^(-?)(\d+)(\.\d+)?$/.exec(String(s));
    if (!m || m[2].length < 5) return String(s);
    return m[1] + m[2].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (m[3] || '');
  }
  // 값 하나를 TeX 로: 정수·분수(초등은 가분수면 대분수도)·소수 병기 → '\frac{7}{2}=3\frac{1}{2}=3.5'
  function valueTex(f, ctx, opt) {
    f = fr(f);
    if (f.isInt()) return String(f.num);
    var out = f.toTex(), a = Math.abs(f.num);
    if (ctx && ctx.tone === 'e' && a > f.den) out += '=' + f.toTex({ mixed: true });
    var d = decOf(f);
    if (d !== null && !(opt && opt.noDec)) out += '=' + d;
    return out;
  }

  /* ================================================================
   * 입력 다듬기 — 전각 기호·위 첨자·말로 쓴 연산을 식 글자로
   * ================================================================ */

  var SUP = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5',
    '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-'
  };
  var SUP_RE = /[⁰¹²³⁴-⁹⁺⁻]+/g;
  var VULGAR_RE = /(\d*)[ \t]*([¼-¾⅐-⅞↉])/g;

  function prep(text) {
    var s = String(text === undefined || text === null ? '' : text);
    if (s.length > LIMIT_LEN * 2) return '';
    // x² → x^2 (NFKC 가 ² 를 2 로 바꾸기 전에), ½ → 1/2
    s = s.replace(SUP_RE, function (m) {
      var o = '';
      for (var i = 0; i < m.length; i++) o += SUP[m.charAt(i)];
      return '^' + (o.length > 1 ? '(' + o + ')' : o);
    }).replace(VULGAR_RE, function (m, w, ch) {
      var p = ch.normalize('NFKC').split('⁄');
      return (w ? w + ' ' : '') + p[0] + '/' + p[1];
    });
    s = s.normalize('NFKC')
      .replace(/[‐-―−﹣]/g, '-')
      .replace(/[✕✖∗⋅·∙]/g, '×')         // 곱하기 기호는 × 하나로
      .replace(/[∕⁄]/g, '/')
      .replace(/[≦⩽]/g, '≤').replace(/[≧⩾]/g, '≥')
      .replace(/<=|=</g, '≤').replace(/>=|=>/g, '≥')
      .replace(/[☐▢◻⬜■]/g, '□')               // 네모 칸은 □ 로
      .replace(/\(\s*\)/g, '□')                                         // ( )+3=7
      .replace(/[“”"]/g, ' ')
      .replace(/\s+/g, ' ').trim();
    // "다음 방정식을 푸시오: 3x-1=8" — 콜론 앞이 수 없는 한글 안내 말이면 뗀다 ("비 2:3" 처럼 수가 있으면 그대로)
    s = s.replace(/^[^0-9:]*[가-힣][^0-9:]*:\s*/, '');
    // 연산자 자리의 ? 는 모르는 수(□): ?+3=7, 3×?=12
    s = s.replace(/\?(?=\s*[+\-×÷*\/=<>≤≥)])/g, '□')
      .replace(/([+\-×÷*\/=(<>≤≥]\s*)\?(?=\s*[+\-×÷*\/=<>≤≥)])/g, '$1□');
    // 말로 쓴 분수: 1과 4분의 3, 4분의 3, 1과 1/2
    s = s.replace(/(\d+)\s*[과와]\s*(\d+)\s*분의\s*(\d+)/g, '$1 $3/$2')
      .replace(/(\d+)\s*분의\s*(\d+)/g, '$2/$1')
      .replace(/(\d+)\s*[과와]\s*(\d+)\s*\/\s*(\d+)/g, '$1 $2/$3');
    // 말로 쓴 연산: 3 곱하기 4, 5의 제곱
    s = s.replace(/\s*(?:더하기|플러스)\s*/g, '+').replace(/\s*(?:빼기|마이너스)\s*/g, '-')
      .replace(/\s*곱하기\s*/g, '×').replace(/\s*나누기\s*/g, '÷')
      .replace(/([0-9a-zA-Z)])\s*의\s*(\d+)\s*(?:제곱|승)(?!근)/g, '$1^$2')
      .replace(/([0-9a-zA-Z)])\s*의\s*세제곱(?!근)/g, '$1^3')
      .replace(/([0-9a-zA-Z)])\s*의\s*제곱(?!근)/g, '$1^2')
      .replace(/루트\s*/g, '√');
    return s.replace(/\s+/g, ' ').trim();
  }

  // 질문 끝·앞의 군말(계산해 줘, 의 값은?, 풀어 주세요 …). 남김없이 지워지면 군말이다
  var FILLER_WORDS = ('다음 아래 수식 문제 방정식 부등식 일차 이차 연립 계산 풀이 과정 정답 결과 알려 가르쳐 설명 보여 확인 ' +
    '구하 구해 하시오 하세요 하면 하여 해서 해줘 주세요 주실래요 줄래요 줄래 줘요 줘 봐요 봐 보세요 어떻게 얼마 무엇 뭐 몇 ' +
    '인가요 인가 이야 예요 이에요 에요 입니까 니까 나요 할래 할까 해요 합니다 부탁 제발 빨리 바로 그냥 한번 좀 쌤 선생님 님 ' +
    '식 값 답 해 근 풀 구 어 여 라 시오 세요 면 요 을 를 은 는 이 가 의 도 하 오 것 야 지 고 자 줄 수 있 번 할 래 까 나 서 게 기')
    .split(' ').sort(function (a, b) { return b.length - a.length; });

  function isFiller(t) {
    var s = String(t).replace(/[^가-힣]/g, '');
    for (var guard = 0; guard < 40 && s; guard++) {
      var before = s;
      for (var i = 0; i < FILLER_WORDS.length; i++) s = s.split(FILLER_WORDS[i]).join('');
      if (s === before) break;
    }
    return s === '';
  }

  // 질문에서 식 한 덩어리만 꺼낸다. 식이 여러 덩어리이거나 군말이 아닌 말이 있으면 null
  function onlyMath(s) {
    var parts = s.split(/([가-힣ㄱ-ㆎ]+)/), mathIdx = -1, words = '';
    for (var i = 0; i < parts.length; i++) {
      if (i % 2) { words += parts[i]; continue; }
      if (/[0-9a-zA-Z√π□]/.test(parts[i])) {
        if (mathIdx >= 0) return null;
        mathIdx = i;
      } else if (/[^\s?!.~,:;…'=]/.test(parts[i])) {
        return null;
      }
    }
    if (mathIdx < 0 || !isFiller(words)) return null;
    var t = parts[mathIdx].trim().replace(/^[?!.~,:;…]+/, '').replace(/[?!.~,:;…]+$/, '').trim();
    // 끝의 '=' '=?' '=□' 는 답을 묻는 표시
    return t.replace(/\s*=\s*□?\s*$/, '').trim();
  }

  /* ================================================================
   * 식 읽기 (TutorMath.parseExpr) — 크기 제한과 변수
   * ================================================================ */

  function tooLongNumber(t) {
    var nums = String(t).match(/\d[\d,]*(?:\.\d*)?|\.\d+/g) || [];
    for (var i = 0; i < nums.length; i++) {
      var p = nums[i].replace(/,/g, '').split('.');
      var len = p[0].replace(/^0+/, '').length + (p[1] ? p[1].length : 0);
      if (len > LIMIT_DIGITS) return true;
    }
    return false;
  }

  function countOps(n) {
    if (!n || typeof n !== 'object') return 0;
    var c = 0;
    if (n.type === 'op' && !n.frac && !n.mixed) c = 1;
    else if (n.type === 'func') c = 1;
    return c + countOps(n.left) + countOps(n.right) + countOps(n.arg);
  }

  function parse(t) {
    if (!t || tooLongNumber(t)) nope('size');
    var ast;
    try { ast = M().parseExpr(t); } catch (e) { nope('parse'); }
    if (countOps(ast) > LIMIT_OPS) nope('ops');
    return ast;
  }

  function varsOf(n, out) {
    out = out || [];
    if (!n || typeof n !== 'object') return out;
    if (n.type === 'var' && out.indexOf(n.name) < 0) out.push(n.name);
    varsOf(n.left, out); varsOf(n.right, out); varsOf(n.arg, out);
    return out;
  }
  function hasType(n, type) {
    if (!n || typeof n !== 'object') return false;
    return n.type === type || hasType(n.left, type) || hasType(n.right, type) || hasType(n.arg, type);
  }

  // 모르는 수 □ 는 parseExpr 가 못 읽으므로 안 쓰는 영문자로 바꿔 읽고, 보일 때는 다시 □ 로
  function boxVar(t) {
    if (t.indexOf('□') < 0) return { text: t, names: {} };
    var used = t.toLowerCase(), cand = 'xyzabcnmkpqrstuvw';
    for (var i = 0; i < cand.length; i++) {
      var v = cand.charAt(i);
      if (used.indexOf(v) < 0) {
        var names = {};
        names[v] = '\\square';
        return { text: t.split('□').join(v), names: names, box: v };
      }
    }
    nope('box');
  }

  /* ================================================================
   * 정확한 계산 (Frac) — 변수에 값 넣기 포함
   * ================================================================ */

  function isqrt(n) {
    if (!(n >= 0) || !Number.isInteger(n)) return null;
    var r = Math.round(Math.sqrt(n));
    while (r * r > n) r--;
    while ((r + 1) * (r + 1) <= n) r++;
    return r * r === n ? r : null;
  }
  // 유리수의 제곱근이 유리수면 그 값, 아니면 null
  function fsqrt(f) {
    f = fr(f);
    if (f.sign() < 0) return null;
    var a = isqrt(f.num), b = isqrt(f.den);
    return (a === null || b === null) ? null : F(a, b);
  }
  function fpow(x, y) {
    if (!y.isInt() || Math.abs(y.num) > 64) nope('exp');
    if (x.isZero() && y.num < 0) throw new DivZero();
    if (x.isZero() && y.num === 0) nope('0^0');
    return x.pow(y.num);
  }

  function ev(n, env) {
    switch (n.type) {
      case 'num': return fr(n.text !== undefined ? n.text : n.value);
      case 'val': return n.f;
      case 'var':
        if (env && hasOwn(env, n.name)) return fr(env[n.name]);
        return nope('var');
      case 'neg': return ev(n.arg, env).neg();
      case 'func': {
        var r = fsqrt(ev(n.arg, env));
        if (!r) nope('sqrt');
        return r;
      }
      case 'op': {
        var x = ev(n.left, env), y = ev(n.right, env);
        switch (n.op) {
          case '+': return x.add(y);
          case '-': return x.sub(y);
          case '*': return x.mul(y);
          case '/':
            if (y.isZero()) throw new DivZero();
            return x.div(y);
          case '^': return fpow(x, y);
        }
      }
    }
    return nope('node');
  }

  /* ================================================================
   * AST → TeX
   *   돌려주는 값 { s, p(우선순위), neg(맨 앞이 '-'), d(안쪽 괄호 깊이) }
   *   괄호는 안쪽부터 ( ) → { } → [ ] (교과서 표기)
   * ================================================================ */

  var P_SUM = 1, P_MUL = 2, P_NEG = 2.5, P_POW = 4, P_FRAC = 4.5, P_ATOM = 5;

  function atom(s) { return { s: s, p: P_ATOM, neg: false, d: 0 }; }
  function wrap(r) {
    var k = Math.min(r.d, 2), L = ['(', '\\{', '['][k], R = [')', '\\}', ']'][k];
    if (/\\frac|\\sqrt/.test(r.s)) { L = '\\left' + L; R = '\\right' + R; }
    return { s: L + r.s + R, p: P_ATOM, neg: false, d: r.d + 1 };
  }
  function fracT(f) {
    f = fr(f);
    var t = f.toTex(), neg = f.sign() < 0;
    return { s: t, p: neg ? P_NEG : (f.isInt() ? P_ATOM : P_FRAC), neg: neg, d: 0 };
  }
  // 계산 중의 값 노드: 입력 모양(소수·대분수·약분 전 분수)을 지켜서 보인다
  function valT(n) {
    var sh = n.show || {}, f = n.f, s;
    var neg = f.sign() < 0;
    if (sh.k === 'dec') s = (neg ? '-' : '') + sh.text;
    else if (sh.k === 'frac') s = (neg ? '-' : '') + '\\frac{' + sh.n + '}{' + sh.d + '}';
    else if (sh.k === 'mixed') s = (neg ? '-' : '') + sh.w + '\\frac{' + sh.n + '}{' + sh.d + '}';
    else return fracT(f);
    return { s: s, p: neg ? P_NEG : (sh.k === 'dec' ? P_ATOM : P_FRAC), neg: neg, d: 0 };
  }

  function implicitSep(L, R) {
    if (/^[0-9.]/.test(R.s) || /^-/.test(R.s) || /^\\d?frac/.test(R.s)) return '\\times ';
    if (/[0-9.]$/.test(L.s) && /^[0-9]/.test(R.s)) return '\\times ';
    if (/[a-zA-Z]$/.test(L.s) && /^\\(?:pi|square)/.test(R.s)) return '';
    return '';
  }

  function tx(n, o, noParen) {
    o = o || {};
    var r;
    switch (n.type) {
      case 'num': r = atom(n.text !== undefined ? n.text : String(n.value)); break;
      case 'val': r = valT(n); break;
      case 'var':
        if (o.sub && hasOwn(o.sub, n.name)) r = fracT(o.sub[n.name]);
        else r = atom(o.names && o.names[n.name] ? o.names[n.name] : n.name);
        break;
      case 'const': r = atom('\\pi'); break;
      case 'neg': {
        var a = tx(n.arg, o);
        if (a.p <= P_NEG || a.neg) a = wrap(a);
        r = { s: '-' + a.s, p: P_NEG, neg: true, d: a.d };
        break;
      }
      case 'func': {
        var b = tx(n.arg, o, true);
        r = { s: '\\sqrt{' + b.s + '}', p: P_ATOM, neg: false, d: b.d };
        break;
      }
      case 'op': r = opT(n, o); break;
      default: nope('node');
    }
    if (n.paren && !noParen && r.p <= P_NEG) r = wrap(r);
    return r;
  }

  function opT(n, o) {
    var op = n.op;
    if (n.mixed) {
      return { s: n.left.text + '\\frac{' + n.right.left.text + '}{' + n.right.right.text + '}', p: P_FRAC, neg: false, d: 0 };
    }
    if (op === '/' && n.frac) return { s: '\\frac{' + n.left.text + '}{' + n.right.text + '}', p: P_FRAC, neg: false, d: 0 };
    if (op === '/' && !n.sym) {
      var A = tx(n.left, o, true), B = tx(n.right, o, true);
      return { s: '\\frac{' + A.s + '}{' + B.s + '}', p: P_FRAC, neg: false, d: Math.max(A.d, B.d) };
    }
    var L = tx(n.left, o), R = tx(n.right, o);
    if (op === '+' || op === '-') {
      if (R.neg || (op === '-' && R.p <= P_SUM)) R = wrap(R);
      return { s: L.s + op + R.s, p: P_SUM, neg: L.neg, d: Math.max(L.d, R.d) };
    }
    if (op === '*' || op === '/') {
      var implicit = op === '*' && n.implicit;
      if (L.p < P_MUL || (!implicit && L.neg)) L = wrap(L);
      if (R.p <= P_MUL || R.neg || (!implicit && R.p < P_ATOM && R.p !== P_FRAC && R.p !== P_POW)) R = wrap(R);
      var sign = op === '/' ? '\\div ' : (implicit ? implicitSep(L, R) : '\\times ');
      return { s: L.s + sign + R.s, p: P_MUL, neg: L.neg, d: Math.max(L.d, R.d) };
    }
    if (op === '^') {
      if (L.p < P_ATOM || L.neg) L = wrap(L);
      var E = tx(n.right, o, true);
      return { s: L.s + '^{' + E.s + '}', p: P_POW, neg: false, d: L.d };
    }
    return nope('op');
  }

  function tex(n, o) { return tidy(tx(n, o, true).s); }
  // '\times 3' 처럼 명령 뒤 빈칸은 글자가 아닐 때 뺀다
  function tidy(s) { return s.replace(/(\\(?:times|div|cdot|pm)) (?=[^a-zA-Z])/g, '$1'); }

  /* ================================================================
   * 다항식 — 계수는 Frac, 변수 여러 개
   *   { 'x^2*y': { c: Frac, m: { x: 2, y: 1 } }, '': { c, m: {} } }
   * ================================================================ */

  var MAX_TERMS = 60, MAX_DEG = 24;

  function mkey(m) {
    var ks = Object.keys(m).sort(), out = [];
    for (var i = 0; i < ks.length; i++) if (m[ks[i]] > 0) out.push(m[ks[i]] === 1 ? ks[i] : ks[i] + '^' + m[ks[i]]);
    return out.join('*');
  }
  function mdeg(m) { var d = 0; for (var k in m) if (hasOwn(m, k)) d += m[k]; return d; }
  function each(p, fn) { for (var k in p) if (hasOwn(p, k)) fn(p[k], k); }

  function pc(f) { var p = {}; f = fr(f); if (!f.isZero()) p[''] = { c: f, m: {} }; return p; }
  function pv(name) { var m = {}, p = {}; m[name] = 1; p[name] = { c: F(1), m: m }; return p; }
  function padd1(p, c, m) {
    var k = mkey(m);
    if (hasOwn(p, k)) {
      var s = p[k].c.add(c);
      if (s.isZero()) delete p[k];
      else p[k] = { c: s, m: p[k].m };
    } else if (!c.isZero()) {
      var mm = {};
      for (var v in m) if (hasOwn(m, v) && m[v] > 0) mm[v] = m[v];
      p[k] = { c: c, m: mm };
    }
  }
  function checkSize(p) {
    var n = 0;
    each(p, function (t) { n++; if (mdeg(t.m) > MAX_DEG) nope('deg'); });
    if (n > MAX_TERMS) nope('terms');
    return p;
  }
  function padd(a, b) {
    var q = {};
    each(a, function (t) { padd1(q, t.c, t.m); });
    each(b, function (t) { padd1(q, t.c, t.m); });
    return checkSize(q);
  }
  function pneg(a) { var q = {}; each(a, function (t, k) { q[k] = { c: t.c.neg(), m: t.m }; }); return q; }
  function psub(a, b) { return padd(a, pneg(b)); }
  function pscale(a, f) {
    f = fr(f);
    var q = {};
    if (f.isZero()) return q;
    each(a, function (t, k) { q[k] = { c: t.c.mul(f), m: t.m }; });
    return q;
  }
  function mmul(m1, m2) {
    var m = {}, k;
    for (k in m1) if (hasOwn(m1, k)) m[k] = m1[k];
    for (k in m2) if (hasOwn(m2, k)) m[k] = (m[k] || 0) + m2[k];
    return m;
  }
  function pmul(a, b) {
    var q = {};
    each(a, function (s) { each(b, function (t) { padd1(q, s.c.mul(t.c), mmul(s.m, t.m)); }); });
    return checkSize(q);
  }
  function ppow(a, k) { var r = pc(1); for (var i = 0; i < k; i++) r = pmul(r, a); return r; }
  function pisZero(p) { return Object.keys(p).length === 0; }
  function pisConst(p) { var ks = Object.keys(p); return ks.length === 0 || (ks.length === 1 && ks[0] === ''); }
  function pconst(p) { return hasOwn(p, '') ? p[''].c : F(0); }
  function pvars(p) {
    var out = [];
    each(p, function (t) { for (var v in t.m) if (hasOwn(t.m, v) && out.indexOf(v) < 0) out.push(v); });
    return out.sort();
  }
  function pdeg(p, v) {
    var d = 0;
    each(p, function (t) { d = Math.max(d, v ? (t.m[v] || 0) : mdeg(t.m)); });
    return d;
  }
  function peq(a, b) { return pisZero(psub(a, b)); }

  // 식 → 다항식. 문자로 나누기·문자 지수·π·√(문자) 는 못 한다
  function toPoly(n) {
    switch (n.type) {
      case 'num': return pc(fr(n.text !== undefined ? n.text : n.value));
      case 'val': return pc(n.f);
      case 'var': return pv(n.name);
      case 'neg': return pneg(toPoly(n.arg));
      case 'func': {
        var a = toPoly(n.arg);
        if (!pisConst(a)) nope('sqrt-var');
        var r = fsqrt(pconst(a));
        if (!r) nope('sqrt');
        return pc(r);
      }
      case 'op': {
        var L = toPoly(n.left), R = toPoly(n.right);
        switch (n.op) {
          case '+': return padd(L, R);
          case '-': return psub(L, R);
          case '*': return pmul(L, R);
          case '/': {
            if (!pisConst(R)) nope('rational');
            var c = pconst(R);
            if (c.isZero()) throw new DivZero();
            return pscale(L, c.inv());
          }
          case '^': {
            if (!pisConst(R)) nope('exp-var');
            var e = pconst(R);
            if (pisConst(L)) return pc(fpow(pconst(L), e));
            if (!e.isInt() || e.num < 0 || e.num > 12) nope('exp');
            return ppow(L, e.num);
          }
        }
      }
    }
    return nope('node');
  }

  // 변수 이름순, 지수가 큰 것부터(사전식): x^2, xy, x, y^2, y, 상수
  function cmpMono(a, b, vars) {
    for (var i = 0; i < vars.length; i++) {
      var ea = a[vars[i]] || 0, eb = b[vars[i]] || 0;
      if (ea !== eb) return eb - ea;
    }
    return 0;
  }
  function pterms(p, vars) {
    vars = vars || pvars(p);
    var arr = [];
    each(p, function (t) { arr.push(t); });
    return arr.sort(function (a, b) { return cmpMono(a.m, b.m, vars); });
  }
  function mtex(m, vars, names) {
    var s = '';
    for (var i = 0; i < vars.length; i++) {
      var e = m[vars[i]];
      if (!e) continue;
      var nm = names && names[vars[i]] ? names[vars[i]] : vars[i];
      if (/\\[a-zA-Z]+$/.test(s) && /^[a-zA-Z]/.test(nm)) s += ' ';     // \square y 가 \squarey 로 붙지 않게
      s += nm + (e === 1 ? '' : '^{' + e + '}');
    }
    return s;
  }
  function polyTex(p, names, vars) {
    vars = vars || pvars(p);
    var ts = pterms(p, vars), out = '';
    for (var i = 0; i < ts.length; i++) out += M().fmt.term(ts[i].c, mtex(ts[i].m, vars, names), out === '');
    return out || '0';
  }
  // 한 변수 v 의 다항식 → [최고차 계수, …, 상수항]. 다른 변수가 있으면 nope
  function pcoeffs(p, v) {
    var d = 0;
    each(p, function (t) {
      for (var w in t.m) if (hasOwn(t.m, w) && w !== v) nope('multi');
      d = Math.max(d, t.m[v] || 0);
    });
    var arr = [];
    for (var i = 0; i <= d; i++) arr.push(F(0));
    each(p, function (t) { arr[d - (t.m[v] || 0)] = t.c; });
    return arr;
  }
  function fromCoeffs(cs, v) {
    var p = {}, d = cs.length - 1;
    for (var i = 0; i <= d; i++) {
      var m = {};
      if (d - i > 0) m[v] = d - i;
      padd1(p, fr(cs[i]), m);
    }
    return p;
  }
  // 모든 계수의 분모의 최소공배수 (분모 없애기에 곱할 수)
  function denLcm(list) {
    var l = 1;
    for (var i = 0; i < list.length; i++) l = M().lcm(l, fr(list[i]).den);
    return l;
  }
  function polyDenLcm(p) {
    var cs = [];
    each(p, function (t) { cs.push(t.c); });
    return denLcm(cs);
  }

  /* ================================================================
   * arith — 계산 순서(괄호 → 거듭제곱 → 곱셈·나눗셈 → 덧셈·뺄셈)대로 한 단계씩
   * ================================================================ */

  function DivZeroAt(a) { this.message = 'div0'; this.a = a; }
  DivZeroAt.prototype = Object.create(DivZero.prototype);

  function safeInt(n) { if (!Number.isSafeInteger(n)) nope('big'); return n; }
  function wrapS(r) { return wrap(r).s; }

  // 계산 결과 값: 정수 · 소수(소수끼리 계산했을 때) · 기약분수
  function vRes(f, decMode) {
    f = fr(f);
    if (f.isInt()) return { type: 'val', f: f, show: { k: 'int' } };
    if (decMode) {
      var d = decOf(f.abs());
      if (d !== null) return { type: 'val', f: f, show: { k: 'dec', text: d } };
    }
    return { type: 'val', f: f, show: { k: 'frac', n: Math.abs(f.num), d: f.den } };
  }
  function kindOf(v) { return (v.show && v.show.k) || (v.f.isInt() ? 'int' : 'frac'); }
  function isFracKind(v) { var k = kindOf(v); return k === 'frac' || k === 'mixed'; }

  // 처음 식의 수를 값 노드로 바꾼다 (입력 모양 — 소수·대분수·약분 전 분수 — 을 기억)
  function toVals(n) {
    switch (n.type) {
      case 'num':
        return { type: 'val', f: fr(n.text), show: /\./.test(n.text) ? { k: 'dec', text: n.text } : { k: 'int' }, paren: n.paren };
      case 'neg': {
        var a = n.arg;
        if (!a.paren && (a.type === 'num' || (a.type === 'op' && (a.frac || a.mixed)))) {
          var v = toVals(a);
          if (v.type === 'val') { v.f = v.f.neg(); v.paren = n.paren; return v; }
        }
        return { type: 'neg', arg: toVals(a), paren: n.paren };
      }
      case 'func': return { type: 'func', name: n.name, arg: toVals(n.arg), paren: n.paren };
      case 'op':
        if (n.mixed) {
          var w = Number(n.left.text), a1 = Number(n.right.left.text), b1 = Number(n.right.right.text);
          if (b1 === 0) throw new DivZeroAt(n.right.left.text);
          return { type: 'val', f: F(w).add(F(a1, b1)), show: { k: 'mixed', w: w, n: a1, d: b1 }, paren: n.paren };
        }
        if (n.frac && /^\d+$/.test(n.left.text) && /^\d+$/.test(n.right.text)) {
          var p = Number(n.left.text), q = Number(n.right.text);
          if (q === 0) throw new DivZeroAt(n.left.text);
          return { type: 'val', f: F(p, q), show: { k: 'frac', n: p, d: q }, paren: n.paren };
        }
        return { type: 'op', op: n.op, left: toVals(n.left), right: toVals(n.right), implicit: n.implicit, sym: n.sym, paren: n.paren };
      default:
        return nope('node');
    }
  }

  function rankOf(n) {
    if (n.type === 'func' || n.type === 'neg' || n.op === '^') return 0;
    if (n.op === '*' || n.op === '/') return 1;
    return 2;
  }
  function kidsOf(n) { return n.type === 'op' ? [n.left, n.right] : (n.type === 'val' ? [] : [n.arg]); }
  function collect(n, depth, out) {
    if (n.type === 'val') return;
    var d = depth + (n.paren ? 1 : 0), kids = kidsOf(n), ready = true;
    for (var i = 0; i < kids.length; i++) if (kids[i].type !== 'val') ready = false;
    if (ready) out.push({ node: n, depth: d, rank: rankOf(n), order: out.length });
    else for (var j = 0; j < kids.length; j++) collect(kids[j], d, out);
  }
  function rankCount(n, out) {
    if (n.type === 'val') return out;
    out[rankOf(n)]++;
    var kids = kidsOf(n);
    for (var i = 0; i < kids.length; i++) rankCount(kids[i], out);
    return out;
  }
  function replaceNode(n, target, repl) {
    if (n === target) return repl;
    if (n.type === 'op') { n.left = replaceNode(n.left, target, repl); n.right = replaceNode(n.right, target, repl); }
    else if (n.type === 'neg' || n.type === 'func') n.arg = replaceNode(n.arg, target, repl);
    return n;
  }
  function anyNeg(n) {
    if (n.type === 'val') return n.f.sign() < 0;
    if (n.type === 'neg') return true;
    var kids = kidsOf(n);
    for (var i = 0; i < kids.length; i++) if (anyNeg(kids[i])) return true;
    return false;
  }

  // 분수 글자 (부호는 앞에)
  function fracS(n, d) {
    if (d === 1) return String(n);
    return (n < 0 ? '-' : '') + '\\frac{' + Math.abs(n) + '}{' + d + '}';
  }
  function fracSP(n, d) {        // 뒤에 오는 항: 음수면 괄호
    var s = fracS(n, d);
    return n < 0 ? (d === 1 ? '(' + s + ')' : '\\left(' + s + '\\right)') : s;
  }
  function numP(n) { return n < 0 ? '(' + n + ')' : String(n); }

  // 값 → 가분수 {n, d} (약분 전 모양 그대로). 대분수·소수는 바꾸는 과정을 lines 에 적는다
  function toFracParts(v, ctx, lines) {
    var k = kindOf(v), sg = v.f.sign() < 0 ? -1 : 1;
    if (k === 'frac') return { n: sg * v.show.n, d: v.show.d };
    if (k === 'mixed') {
      var sh = v.show, n = sg * (sh.w * sh.d + sh.n);
      lines.push(say(ctx, '대분수를 가분수로 바꿔요: $' + valT(v).s + '=' + fracS(n, sh.d) + '$'));
      return { n: n, d: sh.d };
    }
    if (k === 'dec') {
      var f = v.f;
      lines.push(say(ctx, '소수를 분수로 바꿔요: $' + valT(v).s + '=' + f.toTex() + '$'));
      return { n: f.num, d: f.den };
    }
    return { n: v.f.num, d: v.f.den };
  }

  // 약분 전 분수 n/d 를 보이고, 약분되면 기약분수까지 이어 쓴다
  function rawThenReduced(n, d, chain) {
    n = safeInt(n); d = safeInt(d);
    var g = M().gcd(n, d);
    if (d === 1) { chain.push(String(n)); return false; }
    chain.push(fracS(n, d));
    if (g > 1) {
      chain.push(fracS(n / g, d / g));
      return true;
    }
    return false;
  }

  function opAddSub(a, b, op, ctx) {
    var r = op === '+' ? a.f.add(b.f) : a.f.sub(b.f);
    var A = valT(a), B = valT(b);
    var chain = [A.s + op + (B.neg ? wrapS(B) : B.s)], lines = [], notes = [];
    if (!isFracKind(a) && !isFracKind(b)) {
      var res = vRes(r, true);
      if (b.f.sign() < 0 && ctx.tone !== 'e') {
        var absB = valT({ type: 'val', f: b.f.neg(), show: b.show }).s;
        if (op === '-') {
          notes.push(say(ctx, '음수를 빼는 것은 그 수의 부호를 바꾸어 더하는 것과 같아요.'));
          chain.push(A.s + '+' + absB);
        } else {
          notes.push(say(ctx, '음수를 더하는 것은 그 수의 절댓값을 빼는 것과 같아요.'));
          chain.push(A.s + '-' + absB);
        }
      } else if (op === '+' && a.f.sign() < 0 && b.f.sign() > 0 && ctx.tone !== 'e') {
        notes.push(say(ctx, '부호가 다른 두 수의 덧셈은 절댓값의 차에 절댓값이 큰 수의 부호를 붙여요.'));
      }
      chain.push(valT(res).s);
      return { v: res, chain: chain, lines: lines, notes: notes };
    }
    var P = toFracParts(a, ctx, lines), Q = toFracParts(b, ctx, lines);
    if (lines.length) chain.push(fracS(P.n, P.d) + op + fracSP(Q.n, Q.d));
    var word = op === '+' ? '더해요' : '빼요', top;
    if (P.d === Q.d) {
      notes.push(say(ctx, '분모가 같으니 분모는 그대로 두고 분자끼리 ' + word + '.'));
      top = op === '+' ? P.n + Q.n : P.n - Q.n;
      chain.push('\\frac{' + P.n + op + numP(Q.n) + '}{' + P.d + '}');
      var red = rawThenReduced(top, P.d, chain);
      if (red) notes.push(say(ctx, '약분해서 기약분수로 나타내요.'));
    } else {
      var L = safeInt(M().lcm(P.d, Q.d)), p2 = safeInt(P.n * (L / P.d)), q2 = safeInt(Q.n * (L / Q.d));
      if (P.d === 1 || Q.d === 1) {
        var k = P.d === 1 ? P.n : Q.n;
        notes.push(say(ctx, wj(String(k), '을/를') + ' 분모가 ' + L + '인 분수로 바꾸어 ' + word + '.',
          wj(String(k), '을/를') + ' 분모가 ' + L + '인 분수로 바꾸어 ' + word + '.'));
      } else {
        notes.push(say(ctx,
          '분모가 다르니 통분해요. 두 분모 ' + wj(String(P.d), '과/와') + ' ' + Q.d + '의 최소공배수 ' + wj(String(L), '을/를') + ' 공통분모로 해요.',
          '분모가 다르니 분모를 같게 만들어요(통분). ' + wj(String(P.d), '과/와') + ' ' + Q.d + '의 최소공배수 ' + wj(String(L), '을/를') + ' 분모로 해요.'));
      }
      chain.push(fracS(p2, L) + op + fracSP(q2, L));
      top = op === '+' ? p2 + q2 : p2 - q2;
      chain.push('\\frac{' + p2 + op + numP(q2) + '}{' + L + '}');
      if (rawThenReduced(top, L, chain)) notes.push(say(ctx, '약분해서 기약분수로 나타내요.'));
    }
    return { v: vRes(r, false), chain: chain, lines: lines, notes: notes };
  }

  function signNote(fa, fb, op, ctx) {
    if (ctx.tone === 'e') return '';
    var negs = (fa.sign() < 0 ? 1 : 0) + (fb.sign() < 0 ? 1 : 0);
    if (!negs || fa.isZero()) return '';
    var w = op === '*' ? '곱하면' : '나누면';
    return negs === 1 ? say(ctx, '음수가 하나 있으니 결과의 부호는 $-$예요.') : say(ctx, '음수끼리 ' + w + ' 결과의 부호는 $+$예요.');
  }

  function opMulDiv(a, b, op, ctx) {
    var A = valT(a), B = valT(b);
    if (op === '/' && b.f.isZero()) throw new DivZeroAt(A.s);
    var r = op === '*' ? a.f.mul(b.f) : a.f.div(b.f);
    var chain = [(A.neg ? wrapS(A) : A.s) + (op === '*' ? '\\times ' : '\\div ') + (B.neg ? wrapS(B) : B.s)];
    var lines = [], notes = [], res;
    var sn = signNote(a.f, b.f, op, ctx);
    if (sn) notes.push(sn);
    if (!isFracKind(a) && !isFracKind(b)) {
      if (op === '/' && kindOf(a) === 'int' && kindOf(b) === 'int' && !r.isInt()) {
        notes.push(say(ctx, '나누어떨어지지 않으면 몫을 분수로 나타낼 수 있어요. 나누어지는 수가 분자, 나누는 수가 분모예요.'));
        var dn = b.f.num < 0 ? -1 : 1;
        rawThenReduced(dn * a.f.num, Math.abs(b.f.num), chain);
        res = vRes(r, false);
      } else {
        res = vRes(r, kindOf(a) === 'dec' || kindOf(b) === 'dec' || r.isInt());
        chain.push(valT(res).s);
      }
      return { v: res, chain: chain, lines: lines, notes: notes };
    }
    var P = toFracParts(a, ctx, lines), Q = toFracParts(b, ctx, lines);
    if (lines.length) chain.push(fracSP(P.n, P.d) + (op === '*' ? '\\times ' : '\\div ') + fracSP(Q.n, Q.d));
    if (op === '/') {
      notes.push(say(ctx, '나누는 수의 역수를 곱해요. 역수는 분자와 분모를 바꾼 수예요.',
        '나누는 수의 역수를 곱해요. 역수는 분자와 분모를 바꾼 수예요.'));
      Q = { n: (Q.n < 0 ? -1 : 1) * Q.d, d: Math.abs(Q.n) };
      chain.push(fracSP(P.n, P.d) + '\\times ' + fracSP(Q.n, Q.d));
    }
    notes.push(say(ctx, '분자는 분자끼리, 분모는 분모끼리 곱해요.'));
    var dens = [];
    if (P.d !== 1) dens.push(P.d);
    if (Q.d !== 1) dens.push(Q.d);
    if (!dens.length) dens.push(1);
    chain.push('\\frac{' + numP(P.n) + '\\times ' + numP(Q.n) + '}{' + dens.join('\\times ') + '}');
    if (rawThenReduced(safeInt(P.n * Q.n), safeInt(P.d * Q.d), chain)) notes.push(say(ctx, '약분해서 기약분수로 나타내요.'));
    res = vRes(r, false);
    return { v: res, chain: chain, lines: lines, notes: notes };
  }

  function opPow(a, b, ctx) {
    if (!b.f.isInt()) nope('exp');
    var k = b.f.num, f = a.f;
    if (f.isZero() && k < 0) throw new DivZeroAt('1');
    if (f.isZero() && k === 0) nope('0^0');
    if (Math.abs(k) > 64) nope('exp');
    var r = f.pow(k), A = valT(a);
    var base = (A.p < P_ATOM || A.neg) ? wrapS(A) : A.s;
    var chain = [base + '^{' + k + '}'], notes = [];
    if (k === 0) {
      notes.push(say(ctx, '0이 아닌 수의 0제곱은 1이에요.'));
    } else if (k < 0) {
      notes.push(say(ctx, '지수가 음수이면 $a^{-n}=\\frac{1}{a^{n}}$이에요.'));
      chain.push('\\frac{1}{' + base + '^{' + (-k) + '}}');
    } else {
      if (k >= 2 && k <= 5 && base.length <= 24) {
        var rep = [];
        for (var i = 0; i < k; i++) rep.push(base);
        chain.push(rep.join('\\times '));
      }
      notes.push(say(ctx, wj('$' + base + '^{' + k + '}$', '은/는') + ' ' + wj('$' + base + '$', '을/를') + ' ' + k + '번 곱한 수예요.'));
      if (f.sign() < 0) notes.push(say(ctx, k % 2 ? '음수를 홀수 번 곱하면 음수예요.' : '음수를 짝수 번 곱하면 양수예요.'));
      if (isFracKind(a) && f.den !== 1) {
        chain.push('\\frac{' + (f.num < 0 ? '(' + f.num + ')' : f.num) + '^{' + k + '}}{' + f.den + '^{' + k + '}}');
        notes.push(say(ctx, '분수의 거듭제곱은 분자와 분모를 각각 거듭제곱해요.'));
      }
    }
    var res = vRes(r, kindOf(a) === 'dec');
    chain.push(valT(res).s);
    return { v: res, chain: chain, lines: [], notes: notes };
  }

  function opSqrt(a, ctx) {
    var r = fsqrt(a.f);
    if (!r) nope('sqrt');
    var A = valT(a).s, res = vRes(r, kindOf(a) === 'dec'), R = valT(res).s;
    var notes = [say(ctx, wj('$\\sqrt{' + A + '}$', '은/는') + ' 제곱해서 ' + wj('$' + A + '$', '이/가') + ' 되는 양수예요. ' +
      '$' + (res.f.isInt() && kindOf(res) === 'int' ? R : '\\left(' + R + '\\right)') + '^{2}=' + A + '$')];
    return { v: res, chain: ['\\sqrt{' + A + '}', R], lines: [], notes: notes };
  }

  function opNeg(a, ctx) {
    var A = valT(a), res = vRes(a.f.neg(), kindOf(a) === 'dec');
    return { v: res, chain: ['-' + wrapS(A), valT(res).s], lines: [], notes: [say(ctx, '괄호 앞의 $-$는 부호를 바꿔요.')] };
  }

  function performOp(n, ctx) {
    if (n.type === 'neg') return opNeg(n.arg, ctx);
    if (n.type === 'func') return opSqrt(n.arg, ctx);
    if (n.op === '+' || n.op === '-') return opAddSub(n.left, n.right, n.op, ctx);
    if (n.op === '*' || n.op === '/') return opMulDiv(n.left, n.right, n.op, ctx);
    if (n.op === '^') return opPow(n.left, n.right, ctx);
    return nope('op');
  }

  function rulePrefix(c, tree, ctx) {
    if (c.depth > 0) return say(ctx, '괄호 안을 먼저 계산해요.');
    var cnt = rankCount(tree, [0, 0, 0]);
    if (c.rank === 0) {
      if (c.node.type === 'neg') return '';
      if (cnt[1] + cnt[2] === 0) return '';
      return c.node.type === 'func' ? say(ctx, '제곱근을 먼저 계산해요.') : say(ctx, '거듭제곱을 먼저 계산해요.');
    }
    if (c.rank === 1 && cnt[2] > 0) return say(ctx, '곱셈과 나눗셈을 덧셈과 뺄셈보다 먼저 해요.');
    if (cnt[c.rank] > 1) return say(ctx, '앞에서부터 차례로 계산해요.');
    return '';
  }

  function divZeroStep(ctx, a) {
    a = a || '6';
    if (a === '0') {
      return say(ctx, '$0\\div0$은 어떤 수를 넣어도 $\\square\\times0=0$이 맞아서 답을 하나로 정할 수 없어요. 그래서 0으로 나누는 계산은 하지 않아요.');
    }
    var eq = '$\\square\\times0=' + a + '$';
    return say(ctx,
      '0으로는 나눌 수 없어요. $' + a + '\\div0=\\square$라고 하면 ' + eq + jo(eq, '이어야/여야') + ' 하는데, 어떤 수에 0을 곱해도 0이라서 그런 수가 없어요.',
      '0으로는 나눌 수 없어요. $' + a + '\\div0=\\square$라고 하면 ' + eq + jo(eq, '이/가') + ' 되어야 하는데, 어떤 수에 0을 곱해도 0이 되니까 그런 $\\square$는 없어요.');
  }

  function solveArith(t, ctx, extra) {
    var ast = parse(t);
    if (varsOf(ast).length || hasType(ast, 'const')) nope('not arith');
    var title = '계산: $' + tex(ast) + '$';
    var steps = [], tree;
    try {
      tree = toVals(ast);
    } catch (e) {
      if (e instanceof DivZero) return { kind: 'arith', title: title, steps: [divZeroStep(ctx, e.a)], answer: say(ctx, '0으로 나눌 수 없어요.') };
      throw e;
    }
    if (tree.type === 'val') nope('no op');
    var hadNeg = anyNeg(tree), single = tree.type === 'op' && tree.left.type === 'val' && tree.right.type === 'val' ? tree : null;
    for (var guard = 0; guard <= LIMIT_OPS + 2 && tree.type !== 'val'; guard++) {
      var all = [];
      collect(tree, 0, all);
      all.sort(function (x, y) { return (y.depth - x.depth) || (x.rank - y.rank) || (x.order - y.order); });
      var c = all[0], out;
      try {
        out = performOp(c.node, ctx);
      } catch (e) {
        if (e instanceof DivZero) {
          steps.push(divZeroStep(ctx, e.a));
          return { kind: 'arith', title: title, steps: steps, answer: say(ctx, '0으로 나눌 수 없어요.') };
        }
        throw e;
      }
      var pre = rulePrefix(c, tree, ctx);
      tree = replaceNode(tree, c.node, out.v);
      if (out.v.f.sign() < 0) hadNeg = true;
      var parts = [];
      if (pre) parts.push(pre);
      parts = parts.concat(out.lines);
      if (out.notes.length) parts.push(out.notes.join(' '));
      parts.push('$' + tidy(out.chain.join('=')) + '$');
      if (tree.type !== 'val') parts.push('→ $' + tex(tree) + '$');
      steps.push(parts.join('\n'));
    }
    if (tree.type !== 'val') nope('loop');
    var f = tree.f, ans = '$' + (kindOf(tree) === 'dec' ? valT(tree).s : valueTex(f, ctx)) + '$';    // 소수끼리 계산했으면 소수로
    // 초등: 자연수 ÷ 자연수 가 나누어떨어지지 않으면 몫과 나머지도
    if (ctx.tone === 'e' && single && single.op === '/' && kindOf(single.left) === 'int' && kindOf(single.right) === 'int' &&
        single.left.f.sign() > 0 && single.right.f.sign() > 0 && !f.isInt()) {
      var x = single.left.f.num, y = single.right.f.num, q = Math.floor(x / y), rem = x - q * y;
      var dd = decOf(f);
      steps.push('$' + x + '\\div' + y + '$의 몫은 ' + q + '이고 나머지는 ' + wj(String(rem), '이에요/예요') + '.\n' +
        '분수로 나타내면 $' + valueTex(f, ctx, { noDec: true }) + '$' + (dd !== null ? ', 소수로 나타내면 ' + wj(dd, '이에요/예요') + '.' : jo('$' + valueTex(f, ctx, { noDec: true }) + '$', '이에요/예요') + '.'));
      ans += ' (몫 ' + q + ', 나머지 ' + rem + ')';
    } else if (ctx.tone === 'e' && !f.isInt() && Math.abs(f.num) > f.den) {
      steps.push('가분수는 대분수로도 나타낼 수 있어요: $' + f.toTex() + '=' + f.toTex({ mixed: true }) + '$');
    }
    if (extra && extra.length) steps = steps.concat(extra);
    if (ctx.tone === 'e' && hadNeg) steps.push('> 💡 0보다 작은 수(음수)는 중학교 1학년에서 배워요.');
    return { kind: 'arith', title: title, steps: steps, answer: ans };
  }

  // √12 → 2√3 처럼 근호 안을 간단히 (√ 하나만 있을 때)
  function radicalParts(n) {
    var out = 1, inside = 1, pf = M().primeFactors(n);
    for (var i = 0; i < pf.length; i++) {
      out *= Math.pow(pf[i][0], Math.floor(pf[i][1] / 2));
      if (pf[i][1] % 2) inside *= pf[i][0];
    }
    return { out: out, inside: inside, pf: pf };
  }
  function pfTex(pf, expo) {
    var parts = [];
    for (var i = 0; i < pf.length; i++) {
      if (expo === false) { for (var j = 0; j < pf[i][1]; j++) parts.push(String(pf[i][0])); }
      else parts.push(pf[i][1] === 1 ? String(pf[i][0]) : pf[i][0] + '^{' + pf[i][1] + '}');
    }
    return parts.join('\\times ');
  }
  function approx(x) { return M().fmt.dec(x, 3); }
  function radTex(o, i) { return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }

  function solveRadical(n, ctx, both) {
    if (!Number.isSafeInteger(n) || n < 0 || n > 1e12) nope('rad');
    var title = both ? '제곱근: ' + n + '의 제곱근' : '제곱근: $\\sqrt{' + n + '}$';
    var steps = [], rp = n > 1 ? radicalParts(n) : { out: n, inside: 1, pf: [] };
    var main;
    if (n === 0 || n === 1) {
      main = String(n);
      steps.push(say(ctx, '$' + n + '^{2}=' + n + '$이므로 $\\sqrt{' + n + '}=' + n + '$예요.'));
    } else if (rp.inside === 1) {
      main = String(rp.out);
      steps.push(say(ctx, '제곱해서 ' + wj(String(n), '이/가') + ' 되는 양수를 찾아요: $' + rp.out + '^{2}=' + n + '$'));
      steps.push('$\\sqrt{' + n + '}=' + rp.out + '$');
    } else if (rp.out === 1) {
      main = '\\sqrt{' + n + '}';
      steps.push(say(ctx, '$' + n + '=' + pfTex(rp.pf) + '$에는 제곱인 인수가 없어서 더 간단히 할 수 없어요.'));
      steps.push(say(ctx, '$\\sqrt{' + n + '}$의 값은 약 ' + approx(Math.sqrt(n)) + '예요.'));
    } else {
      main = radTex(rp.out, rp.inside);
      steps.push(say(ctx, '근호 안의 수를 소인수분해해요: $' + n + '=' + pfTex(rp.pf) + '$'));
      steps.push(say(ctx, '제곱인 인수는 근호 밖으로 꺼내요: $\\sqrt{' + n + '}=\\sqrt{' + (rp.out * rp.out) + '\\times ' + rp.inside + '}=' + main + '$',
        null, null, '$\\sqrt{' + n + '}=\\sqrt{' + rp.out + '^{2}\\times ' + rp.inside + '}=' + main + '$'));
    }
    var ans;
    if (both) {
      if (n === 0) {
        steps.push(say(ctx, '0의 제곱근은 0 하나뿐이에요.'));
        ans = '$0$';
      } else {
        steps.push(say(ctx, '제곱해서 ' + wj(String(n), '이/가') + ' 되는 수는 양수와 음수 두 개예요: $\\pm' + main + '$'));
        ans = '$\\pm' + main + '$' + (rp.inside === 1 ? ' (' + main + ', $-' + main + '$)' : '');
      }
    } else {
      ans = '$' + (rp.inside === 1 ? main : '\\sqrt{' + n + '}' + (main !== '\\sqrt{' + n + '}' ? '=' + main : '')) + '$';
      if (rp.inside !== 1) ans += ' (약 ' + approx(Math.sqrt(n)) + ')';
    }
    return { kind: 'arith', title: title, steps: steps, answer: ans };
  }

  /* ================================================================
   * 방정식·부등식 공통
   * ================================================================ */

  var REL_TEX = { '=': '=', '<': '<', '>': '>', '≤': '\\le ', '≥': '\\ge ' };
  var REL_FLIP = { '=': '=', '<': '>', '>': '<', '≤': '≥', '≥': '≤' };
  function eqTex(a, rel, b) { return tidy(a + REL_TEX[rel] + b); }
  function relHolds(x, rel, y) {
    var c = fr(x).cmp(y);
    switch (rel) {
      case '=': return c === 0;
      case '<': return c < 0;
      case '>': return c > 0;
      case '≤': return c <= 0;
      case '≥': return c >= 0;
    }
    return false;
  }

  function containsVar(n, v) { return varsOf(n).indexOf(v) >= 0; }
  function countVar(n, v) {
    if (!n || typeof n !== 'object') return 0;
    return (n.type === 'var' && n.name === v ? 1 : 0) + countVar(n.left, v) + countVar(n.right, v) + countVar(n.arg, v);
  }
  // 괄호로 묶인 합에 곱하기(분배법칙)가 있나
  function hasParenSum(n) {
    if (!n || typeof n !== 'object') return false;
    var isSum = function (k) { return k && k.type === 'op' && (k.op === '+' || k.op === '-') && !k.mixed; };
    if (n.type === 'op' && (n.op === '*' || (n.op === '/' && !n.frac)) && (isSum(n.left) || isSum(n.right))) return true;
    if (n.type === 'neg' && isSum(n.arg)) return true;
    if (n.type === 'op' && n.op === '-' && isSum(n.right) && n.right.paren) return true;
    return hasParenSum(n.left) || hasParenSum(n.right) || hasParenSum(n.arg);
  }
  function hasDecimal(n) {
    if (!n || typeof n !== 'object') return false;
    if (n.type === 'num' && /\./.test(n.text || '')) return true;
    return hasDecimal(n.left) || hasDecimal(n.right) || hasDecimal(n.arg);
  }
  function hasFracLit(n) {
    if (!n || typeof n !== 'object') return false;
    if (n.type === 'op' && n.op === '/') return true;
    return hasFracLit(n.left) || hasFracLit(n.right) || hasFracLit(n.arg);
  }
  function vname(v, names) { return names && names[v] ? names[v] : v; }
  function term(c, vt, first) { return M().fmt.term(c, vt, first); }

  // 관계식 하나를 읽는다: 'A=B', 'A<B' … (관계 기호는 하나만)
  function readRel(t) {
    var rels = t.match(/[=<>≤≥]/g) || [];
    if (rels.length !== 1) return null;
    var bx = boxVar(t), s = bx.text, i = s.search(/[=<>≤≥]/);
    var left = s.slice(0, i).trim(), right = s.slice(i + 1).trim();
    if (!left || !right) return null;
    return { L: parse(left), R: parse(right), rel: rels[0], names: bx.names, box: bx.box };
  }

  /* ---------------- 일차방정식·일차부등식 ---------------- */

  // 초등: □ 가 한 번만 나오면 바깥 연산부터 거꾸로 생각한다 (□+3=7 → □=7-3)
  function unwrapSolve(L, R, v, names, ctx) {
    var side = containsVar(L, v) ? L : R, other = side === L ? R : L;
    if (containsVar(other, v) || countVar(side, v) !== 1) return null;
    var c = ev(other), node = side, steps = [];
    var o = { names: names };
    for (var guard = 0; guard < 12 && node.type !== 'var'; guard++) {
      if (node.type !== 'op' || node.mixed || node.frac) return null;
      var inLeft = containsVar(node.left, v), X = inLeft ? node.left : node.right, K = inLeft ? node.right : node.left;
      var k = ev(K), xs = '$' + tex(X, o) + '$', ks = '$' + fracT(k).s + '$', cs = '$' + fracT(c).s + '$', nc, how, calc;
      switch (node.op) {
        case '+':
          nc = c.sub(k);
          how = wj(xs, '에') + ' ' + wj(ks, '을/를') + ' 더해서 ' + wj(cs, '이/가') + ' 됐어요. 거꾸로 생각하면 ' + wj(xs, '은/는') + ' ' + cs + '에서 ' + wj(ks, '을/를') + ' 뺀 수예요.';
          calc = fracT(c).s + '-' + ptex(k);
          break;
        case '-':
          if (inLeft) {
            nc = c.add(k);
            how = xs + '에서 ' + wj(ks, '을/를') + ' 빼서 ' + wj(cs, '이/가') + ' 됐어요. 거꾸로 생각하면 ' + wj(xs, '은/는') + ' ' + cs + '에 ' + wj(ks, '을/를') + ' 더한 수예요.';
            calc = fracT(c).s + '+' + ptex(k);
          } else {
            nc = k.sub(c);
            how = ks + '에서 ' + wj(xs, '을/를') + ' 빼서 ' + wj(cs, '이/가') + ' 됐어요. 거꾸로 생각하면 ' + wj(xs, '은/는') + ' ' + ks + '에서 ' + wj(cs, '을/를') + ' 뺀 수예요.';
            calc = fracT(k).s + '-' + ptex(c);
          }
          break;
        case '*':
          if (k.isZero()) return null;
          nc = c.div(k);
          how = wj(xs, '에') + ' ' + wj(ks, '을/를') + ' 곱해서 ' + wj(cs, '이/가') + ' 됐어요. 거꾸로 생각하면 ' + wj(xs, '은/는') + ' ' + wj(cs, '을/를') + ' ' + wj(ks, '으로/로') + ' 나눈 수예요.';
          calc = fracT(c).s + '\\div ' + ptex(k);
          break;
        case '/':
          if (inLeft) {
            if (k.isZero()) return null;
            nc = c.mul(k);
            how = wj(xs, '을/를') + ' ' + wj(ks, '으로/로') + ' 나눠서 ' + wj(cs, '이/가') + ' 됐어요. 거꾸로 생각하면 ' + wj(xs, '은/는') + ' ' + wj(cs, '에') + ' ' + wj(ks, '을/를') + ' 곱한 수예요.';
            calc = fracT(c).s + '\\times ' + ptex(k);
          } else {
            if (c.isZero()) return null;
            nc = k.div(c);
            how = wj(ks, '을/를') + ' ' + wj(xs, '으로/로') + ' 나눠서 ' + wj(cs, '이/가') + ' 됐어요. 거꾸로 생각하면 ' + wj(xs, '은/는') + ' ' + wj(ks, '을/를') + ' ' + wj(cs, '으로/로') + ' 나눈 수예요.';
            calc = fracT(k).s + '\\div ' + ptex(c);
          }
          break;
        default:
          return null;
      }
      steps.push(say(ctx, how) + '\n$' + tidy(tex(X, o) + '=' + calc + '=' + fracT(nc).s) + '$');
      c = nc;
      node = X;
    }
    if (node.type !== 'var') return null;
    return { steps: steps, sol: c };
  }

  // 변수 v 의 일차식 다항식 → [계수, 상수]
  function lin(p, v) {
    var cs = pcoeffs(p, v);
    if (cs.length > 2) nope('deg');
    return cs.length === 2 ? cs : [F(0), cs[0]];
  }

  // 일차방정식·부등식의 핵심 풀이 (이항 → 정리 → 나누기)
  function linearCore(L, R, v, names, rel, ctx) {
    var steps = [], o = { names: names }, vs = [v], e = ctx.tone === 'e';
    var PL = toPoly(L), PR = toPoly(R);
    var V = '$' + vname(v, names) + '$';
    var cur = eqTex(tex(L, o), rel, tex(R, o));
    if (pdeg(PL, v) > 1 || pdeg(PR, v) > 1) {
      var P0 = psub(PL, PR), t0 = eqTex(polyTex(P0, names, vs), rel, '0');
      steps.push(say(ctx, '모든 항을 좌변으로 옮겨 정리해요.') + '\n$' + t0 + '$');
      PL = P0; PR = {}; cur = t0;
    } else if (hasParenSum(L) || hasParenSum(R)) {
      var t1 = eqTex(polyTex(PL, names, vs), rel, polyTex(PR, names, vs));
      if (t1 !== cur) {
        steps.push(say(ctx, '분배법칙으로 괄호를 풀어요.', '괄호 안의 수에 각각 곱해서 괄호를 풀어요.') + '\n$' + t1 + '$');
        cur = t1;
      }
    }
    var k = M().lcm(polyDenLcm(PL), polyDenLcm(PR));
    if (k > 1) {
      var dec = (hasDecimal(L) || hasDecimal(R)) && /^10*$/.test(String(k));
      PL = pscale(PL, k); PR = pscale(PR, k);
      var t2 = eqTex(polyTex(PL, names, vs), rel, polyTex(PR, names, vs));
      var msg = dec ? say(ctx, '양변에 ' + wj(String(k), '을/를') + ' 곱해서 계수를 정수로 만들어요.', '양쪽에 ' + wj(String(k), '을/를') + ' 곱해서 소수를 자연수로 만들어요.')
        : say(ctx, '양변에 분모의 최소공배수 ' + wj(String(k), '을/를') + ' 곱해서 분모를 없애요.', '양쪽에 ' + wj(String(k), '을/를') + ' 곱해서 분모를 없애요.');
      if (rel !== '=') msg += ' ' + say(ctx, '양수를 곱하면 부등호의 방향은 그대로예요.');
      steps.push(msg + '\n$' + t2 + '$');
      cur = t2;
    }
    var A1 = lin(PL, v), A2 = lin(PR, v);
    var a = A1[0].sub(A2[0]), b = A2[1].sub(A1[1]), vt = vname(v, names);
    var t4 = eqTex(polyTex(fromCoeffs([a, 0], v), names, vs), rel, fracT(b).s);
    if (!A2[0].isZero() || !A1[1].isZero()) {
      var lt = '', rt = '';
      lt += term(A1[0], vt, lt === ''); lt += term(A2[0].neg(), vt, lt === '');
      rt += term(A2[1], '', rt === ''); rt += term(A1[1].neg(), '', rt === '');
      var t3 = eqTex(lt || '0', rel, rt || '0');
      steps.push(say(ctx, wj(V, '이/가') + ' 있는 항은 좌변으로, 상수항은 우변으로 이항해요. 이항하면 부호가 바뀌어요.',
        (rel === '=' ? '등호' : '부등호') + ' 양쪽에 같은 수를 더하거나 빼도 ' + (rel === '=' ? '등식은' : '부등식은') + ' 그대로예요. ' + wj(V, '은/는') + ' 왼쪽에, 수는 오른쪽에 모아요.',
        null, '이항합니다.') + '\n$' + t3 + '$');
      if (t4 !== t3) steps.push(say(ctx, '양변을 각각 정리해요.', '양쪽을 각각 계산해요.') + '\n$' + t4 + '$');
    } else if (t4 !== cur) {
      steps.push(say(ctx, '동류항끼리 모아 정리해요.', '같은 것끼리 모아 계산해요.') + '\n$' + t4 + '$');
    }
    if (a.isZero()) return { steps: steps, sol: null, all: relHolds(0, rel, b), b: b };
    var sol = b.div(a), rel2 = a.sign() < 0 ? REL_FLIP[rel] : rel;
    if (!a.eq(1)) {
      var at = '$' + fracT(a).s + '$', m2;
      if (a.eq(-1)) m2 = say(ctx, '양변에 $-1$을 곱해요.');
      else m2 = say(ctx, '양변을 ' + wj(at, '으로/로') + ' 나눠요.', '양쪽을 ' + wj(at, '으로/로') + ' 나눠요.');
      if (rel !== '=' && a.sign() < 0) m2 += ' ' + say(ctx, '**음수로 나누거나 곱하면 부등호의 방향이 바뀌어요.**');
      steps.push(m2 + '\n$' + eqTex(vt, rel2, fracT(sol).s) + '$');
    }
    return { steps: steps, sol: sol, rel: rel2 };
  }

  // 검산: 처음 식에 넣어서 맞는지 (틀리면 답을 내지 않는다)
  function checkLinear(L, R, v, sol, ctx, names) {
    var env = {};
    env[v] = sol;
    var lv = ev(L, env), rv = ev(R, env);
    if (!lv.eq(rv)) nope('check');
    var dec = hasDecimal(L) || hasDecimal(R);
    var sv = function (f) { var d = dec ? decOf(f) : null; return d !== null ? d : fracT(f).s; };
    var lt = tex(L, { sub: env }), rt = tex(R, { sub: env });
    var lshow = tidy(lt === sv(lv) ? lt : lt + '=' + sv(lv)), rshow = tidy(rt === sv(rv) ? rt : rt + '=' + sv(rv));
    var vt = '$' + eqTex(vname(v, names), '=', fracT(sol).s) + '$', vtE = '$' + vname(v, names) + '$', val = '$' + fracT(sol).s + '$';
    if (rt === sv(rv)) {        // 우변이 수 하나
      return say(ctx, '확인: ' + wj(vt, '을/를') + ' 처음 식에 넣으면 좌변은 $' + lshow + '$' + jo('$' + sv(lv) + '$', '으로/로') + ' 우변과 같아요.',
        '확인: ' + vtE + '에 ' + wj(val, '을/를') + ' 넣으면 $' + lshow + '$' + jo('$' + sv(lv) + '$', '이/가') + ' 되어 맞아요.');
    }
    return say(ctx, '확인: ' + wj(vt, '을/를') + ' 처음 식에 넣으면 좌변은 $' + lshow + '$, 우변은 $' + rshow + '$' + jo('$' + sv(rv) + '$', '으로/로') + ' 같아요.',
      '확인: ' + vtE + '에 ' + wj(val, '을/를') + ' 넣으면 왼쪽은 $' + lshow + '$, 오른쪽은 $' + rshow + '$' + jo('$' + sv(rv) + '$', '으로/로') + ' 같아요.');
  }

  function solTex(v, sol, ctx, names) {
    var s = vname(v, names) + '=' + fracT(sol).s;
    if (!sol.isInt()) {
      if (ctx.tone === 'e' && Math.abs(sol.num) > sol.den) s += '=' + sol.toTex({ mixed: true });
      var d = decOf(sol);
      if (d !== null) s += '=' + d;
    }
    return '$' + s + '$';
  }

  function solveLinear(rd, v, ctx) {
    var L = rd.L, R = rd.R, names = rd.names, o = { names: names };
    var title = say(ctx, '일차방정식', '□의 값 구하기') + ': $' + eqTex(tex(L, o), '=', tex(R, o)) + '$';
    var byUnwrap = function (notLinear) {
      var u = unwrapSolve(L, R, v, names, ctx);
      if (!u) return null;
      var steps = u.steps.slice();
      steps.push(checkLinear(L, R, v, u.sol, ctx, names));
      if (ctx.tone === 'e' && u.sol.sign() < 0) steps.push('> 💡 0보다 작은 수(음수)는 중학교 1학년에서 배워요.');
      var t2 = notLinear && ctx.tone !== 'e' ? title.replace('일차방정식', '방정식') : title;
      return { kind: 'linear', title: t2, steps: steps, answer: solTex(v, u.sol, ctx, names) };
    };
    if (ctx.tone === 'e') {
      var ue = byUnwrap();
      if (ue) return ue;
    }
    var r;
    try {
      r = linearCore(L, R, v, names, '=', ctx);
    } catch (e) {
      // 36÷□=4 처럼 문자로 나누는 꼴은 거꾸로 생각해서 푼다
      var uw = (e instanceof Unsolvable) ? byUnwrap(true) : null;
      if (uw) return uw;
      throw e;
    }
    var st = r.steps.slice();
    if (!r.sol) {
      if (r.all) {
        st.push(say(ctx, '$0=0$은 항상 참이라서 어떤 수를 넣어도 성립해요. 이런 등식을 항등식이라고 해요.'));
        return { kind: 'linear', title: title, steps: st, answer: say(ctx, '해가 무수히 많아요(모든 수가 해예요).') };
      }
      var zb = '$0=' + fracT(r.b).s + '$';
      st.push(say(ctx, wj(zb, '은/는') + ' 항상 거짓이라서 어떤 수를 넣어도 성립하지 않아요.'));
      return { kind: 'linear', title: title, steps: st, answer: say(ctx, '해가 없어요.') };
    }
    var chk = checkLinear(L, R, v, r.sol, ctx, names);
    if (ctx.tone !== 'u') st.push(chk);
    if (!st.length) st.push(say(ctx, '이미 풀린 꼴이에요.'));
    return { kind: 'linear', title: title, steps: st, answer: solTex(v, r.sol, ctx, names) };
  }

  function numberLineText(v, rel, c, ctx, names) {
    var cs = '$' + fracT(c).s + '$', closed = rel === '≤' || rel === '≥', right = rel === '>' || rel === '≥';
    var dot = closed ? '색칠한 동그라미(●)' : '빈 동그라미(○)';
    return say(ctx, '수직선으로 나타내면: ' + wj(cs, '에') + ' ' + dot + '를 그리고 ' + (right ? '오른쪽' : '왼쪽') + '으로 화살표를 그려요. ' +
      wj(cs, '은/는') + ' ' + (closed ? '해에 포함돼요.' : '해에 포함되지 않아요.'));
  }

  function solveIneq(rd, v, ctx) {
    var L = rd.L, R = rd.R, names = rd.names, o = { names: names };
    var title = '부등식: $' + eqTex(tex(L, o), rd.rel, tex(R, o)) + '$';
    var r = linearCore(L, R, v, names, rd.rel, ctx);
    var st = r.steps.slice();
    if (!r.sol) {
      if (r.all) {
        st.push(say(ctx, '정리하면 $0' + REL_TEX[rd.rel] + fracT(r.b).s + '$로 항상 참이에요. 그래서 모든 수가 해예요.'));
        return { kind: 'ineq', title: title, steps: st, answer: say(ctx, '해는 모든 수예요.') };
      }
      st.push(say(ctx, '정리하면 $0' + REL_TEX[rd.rel] + fracT(r.b).s + '$로 항상 거짓이에요. 그래서 해가 없어요.'));
      return { kind: 'ineq', title: title, steps: st, answer: say(ctx, '해가 없어요.') };
    }
    // 안전장치: 경계와 양옆의 수로 처음 부등식을 확인한다
    var env = {}, tests = [[r.sol, r.rel === '≤' || r.rel === '≥'], [r.sol.add(1), r.rel === '>' || r.rel === '≥'], [r.sol.sub(1), r.rel === '<' || r.rel === '≤']];
    for (var i = 0; i < tests.length; i++) {
      env[v] = tests[i][0];
      if (relHolds(ev(L, env), rd.rel, ev(R, env)) !== tests[i][1]) nope('check');
    }
    st.push(numberLineText(v, r.rel, r.sol, ctx, names));
    var ans = '$' + eqTex(vname(v, names), r.rel, fracT(r.sol).s) + '$';
    var closed = r.rel === '≤' || r.rel === '≥', right = r.rel === '>' || r.rel === '≥';
    ans += ' (수직선: $' + fracT(r.sol).s + '$에 ' + (closed ? '●' : '○') + ', ' + (right ? '오른쪽' : '왼쪽') + ')';
    return { kind: 'ineq', title: title, steps: st, answer: ans };
  }

  // a < (일차식) < b 꼴: 세 부분에 같은 계산을 한다
  function solveCompound(t, ctx) {
    var m = /^(.*?)([<>≤≥])(.*?)([<>≤≥])(.*)$/.exec(t);
    if (!m) return null;
    var up = function (r) { return r === '<' || r === '≤'; };
    if (up(m[2]) !== up(m[4])) return null;
    var bx = boxVar(m[3]), A = parse(m[1].trim()), Mid = parse(bx.text.trim()), B = parse(m[5].trim());
    if (varsOf(A).length || varsOf(B).length) return null;
    var vs = varsOf(Mid);
    if (vs.length !== 1) return null;
    var v = vs[0], names = bx.names, vt = vname(v, names);
    var cs = lin(toPoly(Mid), v), k = cs[0], c = cs[1], a = ev(A), b = ev(B), r1 = m[2], r2 = m[4];
    if (k.isZero()) return null;
    var full = function (x, y, z, p, q) { return tidy(x + REL_TEX[p] + y + REL_TEX[q] + z); };
    var title = '부등식: $' + full(tex(A), tex(Mid, { names: names }), tex(B), r1, r2) + '$', steps = [];
    var kx = polyTex(fromCoeffs([k, 0], v), names, [v]);
    if (!c.isZero()) {
      a = a.sub(c); b = b.sub(c);
      steps.push(say(ctx, '세 부분에서 모두 ' + wj('$' + fracT(c).s + '$', '을/를') + ' 빼요.') + '\n$' + full(fracT(a).s, kx, fracT(b).s, r1, r2) + '$');
    }
    if (!k.eq(1)) {
      a = a.div(k); b = b.div(k);
      var msg = say(ctx, '세 부분을 모두 ' + wj('$' + fracT(k).s + '$', '으로/로') + ' 나눠요.');
      if (k.sign() < 0) {
        msg += ' ' + say(ctx, '**음수로 나누면 부등호의 방향이 모두 바뀌어요.**');
        r1 = REL_FLIP[r1]; r2 = REL_FLIP[r2];
      }
      steps.push(msg + '\n$' + full(fracT(a).s, vt, fracT(b).s, r1, r2) + '$');
    }
    if (!up(r1)) {           // 5 > x > 1 → 1 < x < 5 로 읽기 쉽게
      var t3 = a; a = b; b = t3;
      var t4 = r1; r1 = REL_FLIP[r2]; r2 = REL_FLIP[t4];
    }
    var lo = a, hi = b;
    if (lo.cmp(hi) > 0 || (lo.eq(hi) && (r1 === '<' || r2 === '<'))) {
      steps.push(say(ctx, '두 조건을 함께 만족하는 수가 없어요.'));
      return { kind: 'ineq', title: title, steps: steps, answer: say(ctx, '해가 없어요.') };
    }
    // 안전장치: 가운데 값과 경계 밖 값으로 처음 식을 확인한다
    var env = {}, mid = lo.add(hi).div(2), o1 = m[2], o2 = m[4];
    env[v] = mid;
    if (!(relHolds(ev(A), o1, ev(Mid, env)) && relHolds(ev(Mid, env), o2, ev(B)))) nope('check');
    env[v] = hi.add(1);
    if (relHolds(ev(A), o1, ev(Mid, env)) && relHolds(ev(Mid, env), o2, ev(B))) nope('check');
    var ls = '$' + fracT(lo).s + '$', hs = '$' + fracT(hi).s + '$';
    var dot = function (r) { return r === '≤' ? '●' : '○'; };
    steps.push(say(ctx, '수직선으로 나타내면: ' + wj(ls, '에') + ' ' + dot(r1) + ', ' + wj(hs, '에') + ' ' + dot(r2) + '를 그리고 그 사이를 선으로 이어요.'));
    var ans = '$' + full(fracT(lo).s, vt, fracT(hi).s, r1, r2) + '$ (수직선: ' + ls + '에 ' + dot(r1) + ', ' + hs + '에 ' + dot(r2) + ', 그 사이)';
    return { kind: 'ineq', title: title, steps: steps, answer: ans };
  }

  /* ---------------- 이차방정식 ---------------- */

  // (nb ± p√q)/den, imag 면 √q 뒤에 i. 공약수로 줄인다
  function pmRoot(nb, p, q, den, imag) {
    var g = M().gcd(nb, p, den);
    nb /= g; p /= g; den /= g;
    if (den < 0) { den = -den; nb = -nb; }
    var surd = (q === 1 ? (p === 1 && !imag ? '1' : (p === 1 ? '' : String(p))) : (p === 1 ? '' : String(p)) + '\\sqrt{' + q + '}') + (imag ? 'i' : '');
    if (nb === 0) return '\\pm' + (den === 1 ? surd : '\\frac{' + surd + '}{' + den + '}');
    var top = nb + '\\pm' + surd;
    return den === 1 ? top : '\\frac{' + top + '}{' + den + '}';
  }
  function orRoots(v, list, names) {
    var vt = vname(v, names), sorted = list.slice().sort(function (x, y) { return x.cmp(y); });
    return sorted.map(function (r) { return '$' + vt + '=' + fracT(r).s + '$'; }).join(' 또는 ');
  }
  function linFactorTex(a, b, v, names) {      // ax+b 를 인수 하나로: x 면 그대로, 아니면 괄호
    var t = polyTex(fromCoeffs([a, b], v), names, [v]);
    return fr(b).isZero() && fr(a).eq(1) ? t : '(' + t + ')';
  }
  function checkQuadRoots(L, R, v, roots) {
    for (var i = 0; i < roots.length; i++) {
      var env = {};
      env[v] = roots[i];
      if (!ev(L, env).eq(ev(R, env))) nope('check');
    }
  }
  function checkQuadNum(L, R, v, xs) {
    for (var i = 0; i < xs.length; i++) {
      var vars = {};
      vars[v] = xs[i];
      var l = M().evalExpr(L, vars), r = M().evalExpr(R, vars);
      if (!(Math.abs(l - r) <= 1e-7 * Math.max(1, Math.abs(l), Math.abs(r)))) nope('check');
    }
  }

  // (x-1)(x+2)=0 처럼 이미 곱 꼴이면 바로 읽는다
  function quadFactored(L, R, v, names, ctx, title) {
    var side, other;
    if (!containsVar(R, v)) { side = L; other = R; } else if (!containsVar(L, v)) { side = R; other = L; } else return null;
    if (!ev(other).isZero()) return null;
    var facs = [];
    (function flat(n) { if (n.type === 'op' && n.op === '*') { flat(n.left); flat(n.right); } else facs.push(n); })(side);
    var lins = [], deg = 0;
    for (var i = 0; i < facs.length; i++) {
      var f = facs[i], P = toPoly(f), d = pdeg(P, v);
      if (d === 0) { if (pisZero(P)) return null; continue; }
      if (d === 1) { lins.push(lin(P, v)); deg++; continue; }
      if (f.type === 'op' && f.op === '^' && pdeg(toPoly(f.left), v) === 1 && ev(f.right).eq(2)) {
        var l2 = lin(toPoly(f.left), v);
        lins.push(l2); lins.push(l2); deg += 2;
        continue;
      }
      return null;
    }
    if (deg !== 2 || facs.length < 2 && !(facs[0].type === 'op' && facs[0].op === '^')) return null;
    var roots = lins.map(function (ab) { return ab[1].neg().div(ab[0]); });
    checkQuadRoots(L, R, v, roots);
    var vt = vname(v, names), steps = [];
    if (roots[0].eq(roots[1])) {
      steps.push(say(ctx, '제곱이 0이면 괄호 안이 0이에요.') + '\n$' + eqTex(polyTex(fromCoeffs(lins[0], v), names, [v]), '=', '0') + '$');
      steps.push(say(ctx, '같은 근이 두 번 나오는 중근이에요.') + '\n$' + vt + '=' + fracT(roots[0]).s + '$');
      return { kind: 'quad', title: title, steps: steps, answer: '$' + vt + '=' + fracT(roots[0]).s + '$ ' + say(ctx, '(중근)') };
    }
    steps.push(say(ctx, '두 식의 곱이 0이면 적어도 하나는 0이에요.') + '\n$' + eqTex(polyTex(fromCoeffs(lins[0], v), names, [v]), '=', '0') + '$ 또는 $' +
      eqTex(polyTex(fromCoeffs(lins[1], v), names, [v]), '=', '0') + '$');
    steps.push(say(ctx, '각각 풀면') + '\n' + orRoots(v, roots, names));
    return { kind: 'quad', title: title, steps: steps, answer: orRoots(v, roots, names) };
  }

  function solveQuad(rd, v, ctx) {
    var L = rd.L, R = rd.R, names = rd.names, o = { names: names }, vs = [v], vt = vname(v, names);
    var hi = ctx.tone === 'h' || ctx.tone === 'u';
    var title = '이차방정식: $' + eqTex(tex(L, o), '=', tex(R, o)) + '$';
    var fq = quadFactored(L, R, v, names, ctx, title);
    if (fq) return fq;
    var P = psub(toPoly(L), toPoly(R)), cs = pcoeffs(P, v), steps = [];
    if (cs.length !== 3) nope('not quad');
    var roots;
    // x^2 = k 꼴 (일차항이 없음): 제곱근으로 바로 푼다
    if (cs[1].isZero() && !cs[2].isZero()) {
      var kk = cs[2].neg().div(cs[0]), sqT = eqTex(vt + '^{2}', '=', fracT(kk).s);
      if (sqT !== eqTex(tex(L, o), '=', tex(R, o))) steps.push(say(ctx, '$' + vt + '^{2}$만 남도록 정리해요.') + '\n$' + sqT + '$');
      if (kk.sign() < 0 && !hi) {
        steps.push(say(ctx, '제곱해서 음수가 되는 실수는 없어요.'));
        return { kind: 'quad', title: title, steps: steps, answer: say(ctx, '실수인 해가 없어요.') };
      }
      var sq = fsqrt(kk.abs());
      if (sq && kk.sign() > 0) {
        roots = [sq.neg(), sq];
        checkQuadRoots(L, R, v, roots);
        steps.push(say(ctx, '제곱해서 ' + wj('$' + fracT(kk).s + '$', '이/가') + ' 되는 수를 구해요(제곱근).') + '\n$' + vt + '=\\pm' + fracT(sq).s + '$');
        return { kind: 'quad', title: title, steps: steps, answer: orRoots(v, roots, names) };
      }
      var nn = safeInt(kk.abs().num * kk.den), rp = radicalParts(nn);
      var res = pmRoot(0, rp.out, rp.inside, kk.den, kk.sign() < 0);
      if (kk.sign() > 0) checkQuadNum(L, R, v, [Math.sqrt(kk.valueOf()), -Math.sqrt(kk.valueOf())]);
      steps.push((kk.sign() < 0 ? say(ctx, '제곱해서 음수가 되는 수는 허수 $i$를 써서 나타내요.') : say(ctx, '제곱해서 ' + wj('$' + fracT(kk).s + '$', '이/가') + ' 되는 수를 구해요(제곱근).')) +
        '\n$' + vt + '=' + res + '$');
      return { kind: 'quad', title: title, steps: steps, answer: '$' + vt + '=' + res + '$' };
    }
    var polyT = function (list) { return eqTex(polyTex(fromCoeffs(list, v), names, vs), '=', '0'); };
    var std = polyT(cs);
    if (std !== eqTex(tex(L, o), '=', tex(R, o))) steps.push(say(ctx, '모든 항을 좌변으로 이항해서 정리해요.') + '\n$' + std + '$');
    var k = denLcm(cs);
    if (k > 1) {
      cs = cs.map(function (c) { return c.mul(k); });
      steps.push(say(ctx, '양변에 ' + wj(String(k), '을/를') + ' 곱해서 계수를 정수로 만들어요.') + '\n$' + polyT(cs) + '$');
    }
    if (cs[0].sign() < 0) {
      cs = cs.map(function (c) { return c.neg(); });
      steps.push(say(ctx, '양변에 $-1$을 곱해서 $' + vt + '^{2}$의 계수를 양수로 만들어요.') + '\n$' + polyT(cs) + '$');
    }
    var g = M().gcd(cs[0].num, cs[1].num, cs[2].num);
    if (g > 1) {
      cs = cs.map(function (c) { return c.div(g); });
      steps.push(say(ctx, '양변을 ' + wj(String(g), '으로/로') + ' 나눠요.') + '\n$' + polyT(cs) + '$');
    }
    var a = cs[0].num, b = cs[1].num, c = cs[2].num;
    var D = safeInt(safeInt(b * b) - safeInt(4 * a * c));

    if (b === 0 && c === 0) {
      steps.push(say(ctx, '$' + vt + '^{2}=0$이므로 $' + vt + '=0$이에요. 같은 근이 두 번 나오는 중근이에요.'));
      checkQuadRoots(L, R, v, [F(0)]);
      return { kind: 'quad', title: title, steps: steps, answer: '$' + vt + '=0$ ' + say(ctx, '(중근)') };
    }
    if (c === 0) {
      var inner = polyTex(fromCoeffs([a, b], v), names, vs);
      steps.push(say(ctx, '공통인수 ' + wj('$' + vt + '$', '으로/로') + ' 묶어서 인수분해해요.') + '\n$' + vt + '(' + inner + ')=0$');
      roots = [F(0), F(-b, a)];
      checkQuadRoots(L, R, v, roots);
      steps.push(say(ctx, '두 식의 곱이 0이면 적어도 하나는 0이에요.') + '\n$' + vt + '=0$ 또는 $' + inner + '=0$');
      return { kind: 'quad', title: title, steps: steps, answer: orRoots(v, roots, names) };
    }
    var s = isqrt(D);
    if (D >= 0 && s !== null) {
      var r1 = F(-b - s, 2 * a), r2 = F(-b + s, 2 * a);
      roots = [r1, r2];
      checkQuadRoots(L, R, v, roots);
      var f1 = linFactorTex(r1.den, -r1.num, v, names), f2 = linFactorTex(r2.den, -r2.num, v, names);
      var lead = F(a, r1.den * r2.den);
      if (!lead.eq(1)) nope('lead');
      var hint = '';
      if (a === 1 && r1.isInt() && r2.isInt() && ctx.tone !== 'u') {
        var m1 = '$' + (-r1.num) + '$', m2 = '$' + (-r2.num) + '$';
        hint = ' ' + say(ctx, '곱해서 $' + c + '$, 더해서 ' + wj('$' + b + '$', '이/가') + ' 되는 두 수는 ' + (r1.eq(r2) ? wj(m1, '이에요/예요') : wj(m1, '과/와') + ' ' + wj(m2, '이에요/예요')) + '.');
      }
      if (r1.eq(r2)) {
        steps.push(say(ctx, '인수분해해요.') + hint + '\n$' + f1 + '^{2}=0$');
        steps.push(say(ctx, '같은 근이 두 번 나오는 중근이에요.') + '\n$' + vt + '=' + fracT(r1).s + '$');
        return { kind: 'quad', title: title, steps: steps, answer: '$' + vt + '=' + fracT(r1).s + '$ ' + say(ctx, '(중근)') };
      }
      steps.push(say(ctx, '인수분해해요.') + hint + '\n$' + f1 + f2 + '=0$');
      steps.push(say(ctx, '두 식의 곱이 0이면 적어도 하나는 0이에요.') + '\n$' + eqTex(f1.replace(/^\(|\)$/g, ''), '=', '0') + '$ 또는 $' +
        eqTex(f2.replace(/^\(|\)$/g, ''), '=', '0') + '$');
      return { kind: 'quad', title: title, steps: steps, answer: orRoots(v, roots, names) };
    }
    // 근의 공식
    var bsq = b < 0 ? '(' + b + ')^{2}' : b + '^{2}';
    var subst = vt + '=\\frac{' + (-b) + '\\pm\\sqrt{' + bsq + '-4\\times ' + a + '\\times ' + numP(c) + '}}{2\\times ' + a + '}';
    var formula = vt + '=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}';
    var abc = '$a=' + a + '$, $b=' + b + '$, $c=' + wj(c + '$', '을/를');
    if (D < 0 && !hi) {
      steps.push(say(ctx, '근의 공식 $' + formula + '$에서 근호 안의 값(판별식)을 계산해요.') + '\n$' + tidy('b^{2}-4ac=' + bsq + '-4\\times ' + a + '\\times ' + numP(c) + '=' + D) + '$');
      steps.push(say(ctx, '근호 안이 음수예요. 제곱해서 음수가 되는 실수는 없으므로 실수인 해가 없어요.'));
      return { kind: 'quad', title: title, steps: steps, answer: say(ctx, '실수인 해가 없어요.') };
    }
    if (hi) {
      steps.push(say(ctx, '판별식 $D=b^{2}-4ac=' + D + (D > 0 ? '>0' : '<0') + '$이므로 ' + (D > 0 ? '서로 다른 두 실근' : '서로 다른 두 허근') + '을 가져요.'));
    } else {
      steps.push(say(ctx, '인수분해가 되지 않으니 근의 공식을 써요. 근호 안의 값(판별식) $b^{2}-4ac=' + D + '$' + jo('$' + D + '$', '이/가') + ' 양수라서 해가 두 개예요.'));
    }
    var rp2 = radicalParts(Math.abs(D));
    var mid = '\\frac{' + (b === 0 ? '' : -b) + '\\pm\\sqrt{' + D + '}}{' + (2 * a) + '}';
    var fin = pmRoot(-b, rp2.out, rp2.inside, 2 * a, D < 0);
    steps.push(say(ctx, '근의 공식 $' + formula + '$에 ' + abc + ' 대입해요.') + '\n$' + tidy(subst + '=' + mid) + '$');
    var simp = '';
    if (D < 0) simp = '$\\sqrt{' + D + '}=' + (rp2.inside === 1 ? (rp2.out === 1 ? '' : rp2.out) : radTex(rp2.out, rp2.inside)) + 'i$';
    else if (rp2.out > 1) simp = '$\\sqrt{' + D + '}=' + radTex(rp2.out, rp2.inside) + '$';
    if (simp || fin !== mid) steps.push((simp ? say(ctx, simp + '이므로 정리하면') : say(ctx, '약분해서 정리하면')) + '\n$' + vt + '=' + fin + '$');
    if (D > 0) checkQuadNum(L, R, v, [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)]);
    return { kind: 'quad', title: title, steps: steps, answer: '$' + vt + '=' + fin + '$' };
  }

  /* ---------------- 연립일차방정식 ---------------- */

  function rowOf(rd, X, Y) {
    var P = psub(toPoly(rd.L), toPoly(rd.R)), a = F(0), b = F(0), c = F(0);
    each(P, function (t, k) {
      if (k === '') c = t.c.neg();
      else if (k === X) a = t.c;
      else if (k === Y) b = t.c;
      else nope('nonlinear');
    });
    var l = denLcm([a, b, c]);
    return { a: a.mul(l), b: b.mul(l), c: c.mul(l) };
  }
  function rowTex(r, X, Y) {
    var lt = term(r.a, X, true);
    lt += term(r.b, Y, lt === '');
    return eqTex(lt || '0', '=', fracT(r.c).s);
  }
  function rowScale(r, m) { return { a: r.a.mul(m), b: r.b.mul(m), c: r.c.mul(m) }; }
  function rowAdd(r, s, sign) { return { a: r.a.add(s.a.mul(sign)), b: r.b.add(s.b.mul(sign)), c: r.c.add(s.c.mul(sign)) }; }
  function labelJo(label) {
    var last = label.charAt(label.length - 1);
    if (last === '①') return label + '을';
    if (last === '②') return label + '를';
    return label + jo(last, '을/를');
  }
  function substAst(n, v, e) {
    if (!n || typeof n !== 'object') return n;
    if (n.type === 'var' && n.name === v) {
      var c = JSON.parse(JSON.stringify(e));
      c.paren = c.type === 'neg' || (c.type === 'op' && (c.op === '+' || c.op === '-') && !c.mixed);
      return c;
    }
    var out = {};
    for (var k in n) if (hasOwn(n, k)) out[k] = n[k];
    if (n.left) out.left = substAst(n.left, v, e);
    if (n.right) out.right = substAst(n.right, v, e);
    if (n.arg) out.arg = substAst(n.arg, v, e);
    return out;
  }

  function solveSystem(rds, ctx) {
    var vars = [];
    for (var i = 0; i < 2; i++) vars = vars.concat(varsOf(rds[i].L), varsOf(rds[i].R));
    vars = uniq(vars).sort();
    if (vars.length !== 2) nope('vars');
    var X = vars[0], Y = vars[1];
    var t1 = eqTex(tex(rds[0].L), '=', tex(rds[0].R)), t2 = eqTex(tex(rds[1].L), '=', tex(rds[1].R));
    var title = '연립방정식: $' + t1 + '$, $' + t2 + '$';
    var r1 = rowOf(rds[0], X, Y), r2 = rowOf(rds[1], X, Y), steps = [];
    var s1 = rowTex(r1, X, Y), s2 = rowTex(r2, X, Y);
    steps.push(say(ctx, '앞의 식을 ①, 뒤의 식을 ②라고 해요.') + '\n$\\begin{cases}' + t1 + '\\\\' + t2 + '\\end{cases}$');
    var det = r1.a.mul(r2.b).sub(r2.a.mul(r1.b));
    if (det.isZero()) {
      var t = !r1.a.isZero() ? r2.a.div(r1.a) : (!r1.b.isZero() ? r2.b.div(r1.b) : null);
      if (!t || t.isZero()) nope('degenerate');
      var sr = rowScale(r1, t), srt = rowTex(sr, X, Y);
      steps.push(say(ctx, '①의 양변에 ' + wj('$' + fracT(t).s + '$', '을/를') + ' 곱하면 $' + srt + '$' + jo('$' + srt + '$', '이에요/예요') + '.'));
      if (sr.c.eq(r2.c)) {
        steps.push(say(ctx, '②와 똑같은 식이에요. ①을 만족하는 해는 모두 ②도 만족하므로 해가 무수히 많아요.'));
        return { kind: 'system', title: title, steps: steps, answer: say(ctx, '해가 무수히 많아요.') };
      }
      steps.push(say(ctx, '②와 좌변은 같은데 우변이 달라요. 두 식을 동시에 만족하는 해는 없어요.'));
      return { kind: 'system', title: title, steps: steps, answer: say(ctx, '해가 없어요.') };
    }
    var xv, yv;
    // 대입법: 한 식이 'y=…' 꼴이면
    var iso = -1, V = null, expr = null;
    for (var j = 0; j < 2 && iso < 0; j++) {
      var rd = rds[j];
      if (rd.L.type === 'var' && !containsVar(rd.R, rd.L.name)) { iso = j; V = rd.L.name; expr = rd.R; }
      else if (rd.R.type === 'var' && !containsVar(rd.L, rd.R.name)) { iso = j; V = rd.R.name; expr = rd.L; }
    }
    if (iso >= 0 && containsVar(expr, V === X ? Y : X)) {
      var W = V === X ? Y : X, other = rds[1 - iso];
      var sL = substAst(other.L, V, expr), sR = substAst(other.R, V, expr);
      steps.push(say(ctx, (iso === 0 ? '①을 ②에' : '②를 ①에') + ' 대입해요(대입법).') + '\n$' + eqTex(tex(sL), '=', tex(sR)) + '$');
      var lc = linearCore(sL, sR, W, {}, '=', ctx);
      if (!lc.sol) nope('system-sub');
      steps = steps.concat(lc.steps);
      var wv = lc.sol, envW = {};
      envW[W] = wv;
      var vv = ev(expr, envW);
      steps.push(say(ctx, wj('$' + W + '=' + fracT(wv).s + '$', '을/를') + ' ' + (iso === 0 ? '①' : '②') + '에 대입하면') +
        '\n$' + V + '=' + tidy(tex(expr, { sub: envW })) + '=' + fracT(vv).s + '$');
      if (V === X) { xv = vv; yv = wv; } else { xv = wv; yv = vv; }
    } else {
      // 가감법
      if (s1 !== t1 || s2 !== t2) steps.push(say(ctx, '두 식을 각각 $ax+by=c$ 꼴로 정리해요.') + '\n①: $' + s1 + '$\n②: $' + s2 + '$');
      var pick = null;
      var cands = [{ v: Y, o: X, e1: r1.b, e2: r2.b }, { v: X, o: Y, e1: r1.a, e2: r2.a }];
      if (r1.a.isZero() || r1.b.isZero() || r2.a.isZero() || r2.b.isZero()) {
        // 한 문자만 있는 식에서 바로 구한다
        var one = (r1.a.isZero() || r1.b.isZero()) ? 0 : 1, rr = one ? r2 : r1, lab = one ? '②' : '①';
        var onlyX = rr.b.isZero(), vv2 = rr.c.div(onlyX ? rr.a : rr.b), Vn = onlyX ? X : Y;
        steps.push(say(ctx, lab + '에서 바로 구해요.') + '\n$' + Vn + '=' + fracT(vv2).s + '$');
        var other2 = one ? r1 : r2, lab2 = one ? '①' : '②';
        var co = onlyX ? other2.a : other2.b, cw = onlyX ? other2.b : other2.a, Wn = onlyX ? Y : X;
        var rest = other2.c.sub(co.mul(vv2)), wv2 = rest.div(cw);
        steps.push(say(ctx, wj('$' + Vn + '=' + fracT(vv2).s + '$', '을/를') + ' ' + lab2 + '에 대입하면') + '\n$' + eqTex(term(cw, Wn, true), '=', fracT(rest).s) + '$, $' + Wn + '=' + fracT(wv2).s + '$');
        if (onlyX) { xv = vv2; yv = wv2; } else { yv = vv2; xv = wv2; }
      } else {
        for (var q = 0; q < 2; q++) if (cands[q].e1.abs().eq(cands[q].e2.abs())) { pick = cands[q]; break; }
        if (!pick) {
          var l0 = M().lcm(cands[0].e1.num, cands[0].e2.num), l1 = M().lcm(cands[1].e1.num, cands[1].e2.num);
          pick = l1 < l0 ? cands[1] : cands[0];
        }
        var Lm = M().lcm(pick.e1.num, pick.e2.num), m1 = Lm / Math.abs(pick.e1.num), m2 = Lm / Math.abs(pick.e2.num);
        var S1 = rowScale(r1, m1), S2 = rowScale(r2, m2);
        if (m1 !== 1 || m2 !== 1) {
          var mul = [];
          if (m1 !== 1) mul.push('①×' + m1 + ': $' + rowTex(S1, X, Y) + '$');
          if (m2 !== 1) mul.push('②×' + m2 + ': $' + rowTex(S2, X, Y) + '$');
          steps.push(say(ctx, '$' + pick.v + '$의 계수의 절댓값을 ' + wj(String(Lm), '으로/로') + ' 같게 만들려고 양변에 수를 곱해요.') + '\n' + mul.join('\n'));
        }
        var addIt = pick.e1.sign() !== pick.e2.sign();
        var Rw = rowAdd(S1, S2, addIt ? 1 : -1);
        var label = '①' + (m1 !== 1 ? '×' + m1 : '') + (addIt ? '+' : '-') + '②' + (m2 !== 1 ? '×' + m2 : '');
        steps.push(say(ctx, wj('$' + pick.v + '$', '을/를') + ' 없애려고 ' + labelJo(label) + ' 해요(가감법).') + '\n$' + rowTex(Rw, X, Y) + '$');
        var kc = pick.v === Y ? Rw.a : Rw.b, ov = Rw.c.div(kc);
        if (!kc.eq(1)) steps.push(say(ctx, '양변을 ' + wj('$' + fracT(kc).s + '$', '으로/로') + ' 나누면') + '\n$' + pick.o + '=' + fracT(ov).s + '$');
        // ① 에 대입
        var cE = pick.v === Y ? r1.b : r1.a, cO = pick.v === Y ? r1.a : r1.b;
        var rest2 = r1.c.sub(cO.mul(ov)), ev2 = rest2.div(cE);
        var shown = pick.v === Y ? term(cO.mul(ov), '', true) + term(cE, Y, cO.mul(ov).isZero()) : term(cE, X, true) + term(cO.mul(ov), '', false);
        var chainS = ['$' + eqTex(shown || '0', '=', fracT(r1.c).s) + '$'];
        if (!cE.eq(1)) chainS.push('$' + eqTex(term(cE, pick.v, true), '=', fracT(rest2).s) + '$');
        chainS.push('$' + pick.v + '=' + fracT(ev2).s + '$');
        steps.push(say(ctx, wj('$' + pick.o + '=' + fracT(ov).s + '$', '을/를') + ' ①에 대입하면') + '\n' + uniq(chainS).join(', '));
        if (pick.v === Y) { xv = ov; yv = ev2; } else { yv = ov; xv = ev2; }
      }
    }
    var env = {};
    env[X] = xv; env[Y] = yv;
    for (var z = 0; z < 2; z++) if (!ev(rds[z].L, env).eq(ev(rds[z].R, env))) nope('check');
    var ans = '$' + X + '=' + fracT(xv).s + '$, $' + Y + '=' + fracT(yv).s + '$';
    if (ctx.tone !== 'u') steps.push(say(ctx, '확인: 두 식에 모두 넣어 보면 성립해요.'));
    return { kind: 'system', title: title, steps: steps, answer: ans };
  }

  /* ================================================================
   * 약수와 배수 — gcd · lcm · factor(소인수분해)
   * ================================================================ */

  // 글에서 자연수들을 꺼낸다 (소수·분수·음수가 있으면 null)
  function naturalsIn(s) {
    if (/\d\s*[.\/]\s*\d|-\s*\d/.test(s)) return null;
    var m = s.match(/\d{1,3}(?:,\d{3})+(?!\d)|\d+/g) || [], out = [];
    for (var i = 0; i < m.length; i++) {
      var t = m[i].replace(/,/g, '');
      if (t.replace(/^0+/, '').length > LIMIT_DIGITS) nope('size');
      out.push(Number(t));
    }
    return out;
  }
  function pfMap(n) {
    var o = {}, pf = n > 1 ? M().primeFactors(n) : [];
    for (var i = 0; i < pf.length; i++) o[pf[i][0]] = pf[i][1];
    return o;
  }
  function powProd(map, expo) {      // { 2: 3, 3: 1 } → '2^{3}\times3' (expo false 면 2×2×2×3)
    var ps = Object.keys(map).map(Number).filter(function (p) { return map[p] > 0; }).sort(function (a, b) { return a - b; });
    if (!ps.length) return '1';
    var parts = [];
    for (var i = 0; i < ps.length; i++) {
      if (expo === false) for (var j = 0; j < map[ps[i]]; j++) parts.push(String(ps[i]));
      else parts.push(map[ps[i]] === 1 ? String(ps[i]) : ps[i] + '^{' + map[ps[i]] + '}');
    }
    return tidy(parts.join('\\times '));
  }
  function listNums(a) { return a.join(', '); }
  function joinAnd(nums) {          // 12, 18 → '12와 18', 4, 6, 10 → '4, 6, 10'
    if (nums.length === 2) return wj(String(nums[0]), '과/와') + ' ' + nums[1];
    return nums.join(', ');
  }

  function solveGcdLcm(nums, which, ctx) {
    if (!nums || nums.length < 2 || nums.length > 6) nope('count');
    for (var i = 0; i < nums.length; i++) if (!(nums[i] >= 1)) nope('zero');
    var isG = which === 'gcd', G = M().gcd(nums), Lc = isG ? null : M().lcm(nums);
    var word = isG ? '최대공약수' : '최소공배수';
    var title = word + ': ' + nums.join(', ');
    var steps = [], e = ctx.tone === 'e', maps = nums.map(pfMap), primes = [];
    maps.forEach(function (m) { Object.keys(m).forEach(function (p) { if (primes.indexOf(Number(p)) < 0) primes.push(Number(p)); }); });
    primes.sort(function (a, b) { return a - b; });
    var minMap = {}, maxMap = {};
    primes.forEach(function (p) {
      var mn = Infinity, mx = 0;
      maps.forEach(function (m) { var ex = m[p] || 0; mn = Math.min(mn, ex); mx = Math.max(mx, ex); });
      minMap[p] = mn; maxMap[p] = mx;
    });
    var ans = isG ? G : Lc;
    if (e && nums.length === 2 && isG && Math.max(nums[0], nums[1]) <= 100) {
      var d1 = M().divisors(nums[0]), d2 = M().divisors(nums[1]);
      var common = d1.filter(function (d) { return d2.indexOf(d) >= 0; });
      steps.push('$' + nums[0] + '$의 약수: ' + listNums(d1) + '\n$' + nums[1] + '$의 약수: ' + listNums(d2));
      steps.push('두 수의 공약수(둘 다의 약수): ' + listNums(common));
      steps.push('공약수 중에서 가장 큰 수가 최대공약수예요. ' + wj(String(G), '이에요/예요') + '.');
    } else if (e && nums.length === 2 && !isG && Lc <= 120) {
      var mult = function (n) { var o = []; for (var k = 1; k * n <= Lc + n && o.length < 12; k++) o.push(k * n); return o; };
      var m1 = mult(nums[0]), m2 = mult(nums[1]);
      steps.push('$' + nums[0] + '$의 배수: ' + listNums(m1) + ', …\n$' + nums[1] + '$의 배수: ' + listNums(m2) + ', …');
      steps.push('두 수의 공배수(둘 다의 배수) 중에서 가장 작은 수가 최소공배수예요. ' + wj(String(Lc), '이에요/예요') + '.');
    } else if (e) {
      steps.push('각 수를 곱셈식으로 나타내요.\n' + nums.map(function (n, k) { return '$' + n + '=' + powProd(maps[k], false) + '$'; }).join('\n'));
      if (isG) steps.push('모든 곱셈식에 공통으로 들어 있는 수를 곱하면 최대공약수예요.\n$' + powProd(minMap, false) + '=' + G + '$');
      else steps.push('곱셈식에 들어 있는 수를 가장 많이 나온 만큼씩 모두 곱하면 최소공배수예요.\n$' + powProd(maxMap, false) + '=' + Lc + '$');
    } else {
      steps.push(say(ctx, '각 수를 소인수분해해요.') + '\n' + nums.map(function (n, k) { return '$' + n + '=' + powProd(maps[k]) + '$'; }).join('\n'));
      if (isG) steps.push(say(ctx, '공통인 소인수를 찾아 지수가 작은(같거나 작은) 것을 곱해요.') + '\n$' + powProd(minMap) + '=' + G + '$');
      else steps.push(say(ctx, '모든 소인수를 곱하되, 지수가 다르면 큰 것을 택해요.') + '\n$' + powProd(maxMap) + '=' + Lc + '$');
    }
    if (isG && G === 1 && !e) steps.push(say(ctx, '최대공약수가 1이므로 ' + (nums.length === 2 ? '두 수는' : '이 수들은') + ' 서로소예요.'));
    if (!isG && !e && nums.length === 2 && ctx.tone !== 'u') {
      steps.push(say(ctx, '확인: 두 수의 곱은 최대공약수와 최소공배수의 곱과 같아요.') +
        '\n$' + nums[0] + '\\times' + nums[1] + '=' + G + '\\times' + Lc + '=' + (nums[0] * nums[1]) + '$');
    }
    return { kind: which, title: title, steps: steps, answer: joinAnd(nums) + '의 ' + word + ': $' + ans + '$' };
  }

  function solveFactor(n, ctx, onlyPrimes) {
    if (!Number.isSafeInteger(n) || n < 1 || n > 1e12) nope('range');
    var title = (onlyPrimes ? '소인수: ' : '소인수분해: ') + n;
    if (n === 1) {
      return { kind: 'factor', title: title, steps: [say(ctx, '1은 소수도 합성수도 아니어서 소인수분해하지 않아요.')], answer: say(ctx, '1은 소인수분해하지 않아요.') };
    }
    var pf = M().primeFactors(n), map = pfMap(n), steps = [];
    if (pf.length === 1 && pf[0][1] === 1) {
      steps.push(say(ctx, wj(String(n), '은/는') + ' 1과 자기 자신만을 약수로 가지는 소수예요. 더 나눌 수 없어요.'));
      return { kind: 'factor', title: title, steps: steps, answer: onlyPrimes ? '$' + n + '$' : '$' + n + '$ ' + say(ctx, '(소수)') };
    }
    var lines = [], cur = n;
    for (var i = 0; i < pf.length && !M().isPrime(cur); i++) {
      for (var j = 0; j < pf[i][1] && !M().isPrime(cur); j++) {
        lines.push('$' + cur + '\\div' + pf[i][0] + '=' + (cur / pf[i][0]) + '$');
        cur /= pf[i][0];
      }
    }
    lines.push(say(ctx, wj(String(cur), '은/는') + ' 소수라서 더 나누지 않아요.'));
    if (lines.length > 12) {
      lines = pf.map(function (p) { return say(ctx, wj(String(p[0]), '으로/로') + ' ' + p[1] + '번 나누어떨어져요.'); });
    }
    steps.push(say(ctx, '가장 작은 소수부터 차례로 나누어떨어질 때까지 나눠요.') + '\n' + lines.join('\n'));
    var flat = powProd(map, false), expo = powProd(map);
    steps.push(say(ctx, '나눈 소수를 모두 곱셈식으로 쓰고, 같은 수는 거듭제곱으로 나타내요.') + '\n$' + n + '=' + flat + (flat !== expo ? '=' + expo : '') + '$');
    if (onlyPrimes) {
      var ps = pf.map(function (p) { return p[0]; });
      steps.push(say(ctx, '소인수는 소인수분해에 나오는 소수예요.'));
      return { kind: 'factor', title: title, steps: steps, answer: n + '의 소인수: ' + ps.join(', ') };
    }
    return { kind: 'factor', title: title, steps: steps, answer: '$' + n + '=' + expo + '$' };
  }

  /* ---------------- 약분 ---------------- */

  function solveSimplify(src, ctx) {
    var m, whole = 0, a, b, steps = [], fromDec = null;
    src = src.trim();
    if ((m = /^(\d+)\s+(\d+)\s*\/\s*(\d+)$/.exec(src))) { whole = Number(m[1]); a = Number(m[2]); b = Number(m[3]); }
    else if ((m = /^(\d+)\s*\/\s*(\d+)$/.exec(src))) { a = Number(m[1]); b = Number(m[2]); }
    else if ((m = /^(\d*\.\d+)$/.exec(src))) {
      var places = m[1].split('.')[1].length;
      if (places > 6) nope('dec');
      b = Math.pow(10, places); a = Math.round(Number(m[1]) * b); fromDec = m[1];
    } else return null;
    if (tooLongNumber(src)) nope('size');
    var shown = (whole ? whole : '') + '\\frac{' + a + '}{' + b + '}';
    var title = '약분: $' + (fromDec || shown) + '$';
    if (b === 0) return { kind: 'simplify', title: title, steps: [say(ctx, '분모가 0인 분수는 없어요. 분수 $\\frac{a}{b}$는 $a\\div b$와 같은데, 0으로는 나눌 수 없기 때문이에요.')], answer: say(ctx, '분모가 0인 분수는 없어요.') };
    if (fromDec) steps.push(say(ctx, '소수를 분모가 ' + b + '인 분수로 나타내요.') + '\n$' + fromDec + '=\\frac{' + a + '}{' + b + '}$');
    var g = M().gcd(a, b);
    if (a === 0) {
      steps.push(say(ctx, '분자가 0이면 분수의 값은 0이에요.'));
      return { kind: 'simplify', title: title, steps: steps, answer: '$' + (whole || 0) + '$' };
    }
    if (g === 1) {
      steps.push(say(ctx, '분자 ' + wj(String(a), '과/와') + ' 분모 ' + b + '의 공약수가 1뿐이라서 더 약분할 수 없어요. 이미 기약분수예요.'));
    } else {
      steps.push(say(ctx, '분자 ' + wj(String(a), '과/와') + ' 분모 ' + b + '의 최대공약수는 ' + wj(String(g), '이에요/예요') + '.'));
      steps.push(say(ctx, '분자와 분모를 최대공약수 ' + wj(String(g), '으로/로') + ' 나눠요.', '분자와 분모를 똑같이 ' + wj(String(g), '으로/로') + ' 나누면 한 번에 기약분수가 돼요.') +
        '\n$' + (whole ? whole : '') + '\\frac{' + a + '}{' + b + '}=' + (whole ? whole : '') + '\\frac{' + a + '\\div' + g + '}{' + b + '\\div' + g + '}=' + (whole ? whole : '') + fracS(a / g, b / g) + '$');
    }
    var f = F(a, b).add(whole), ans = whole ? f.toTex({ mixed: true }) : f.toTex();
    if (!whole && ctx.tone === 'e' && Math.abs(f.num) > f.den && f.den !== 1) ans += '=' + f.toTex({ mixed: true });
    return { kind: 'simplify', title: title, steps: steps, answer: '$' + ans + '$' };
  }

  /* ================================================================
   * 백분율
   * ================================================================ */

  var NUM_SRC = '(\\d[\\d,]*(?:\\.\\d+)?(?:\\s*\\/\\s*\\d+)?|\\.\\d+)';
  var COUNTER = '(원|명|개|점|권|마리|쪽|장|대|송이|병|살|kg|g|km|cm|mm|m|mL|L|t)?';
  function numOf(t) {
    if (tooLongNumber(t)) nope('size');
    var f = M().parseNumberAnswer(t.replace(/\s+/g, ''));
    if (!f) nope('num');
    return f;
  }
  function plainNum(f) {      // 수식 밖에 쓰는 수: 정수·유한소수는 그대로, 아니면 분수 TeX
    f = fr(f);
    var d = decOf(f);
    return d !== null ? commas(d) : '$' + f.toTex() + '$';
  }
  function texNum(f) { f = fr(f); var d = decOf(f); return d !== null ? d : f.toTex(); }

  function solvePercent(s, ctx) {
    var m, re = function (src) { return new RegExp(src, 'i'); };
    var PCT = '\\s*(?:%|퍼센트|프로)';
    // A는 B의 몇 %
    if ((m = re('^' + NUM_SRC + '\\s*' + COUNTER + '\\s*(?:은|는|이|가)\\s*' + NUM_SRC + '\\s*' + COUNTER + '\\s*의\\s*몇' + PCT).exec(s))) {
      var A = numOf(m[1]), B = numOf(m[3]), u = m[2] || m[4] || '';
      if (B.isZero()) nope('zero');
      var P = A.div(B).mul(100), title = '백분율: ' + plainNum(A) + u + '은 ' + plainNum(B) + u + '의 몇 %';
      var steps = [
        say(ctx, '비율은 (비교하는 양) ÷ (기준량)이에요. 기준량은 ' + wj(plainNum(B) + u, '이에요/예요') + '.') + '\n$' + texNum(A) + '\\div' + texNum(B) + '=\\frac{' + texNum(A) + '}{' + texNum(B) + '}$',
        say(ctx, '백분율은 비율에 100을 곱해서 %를 붙여요.') + '\n$\\frac{' + texNum(A) + '}{' + texNum(B) + '}\\times100=' + texNum(P) + '$'
      ];
      var ans = plainNum(P) + '%';
      if (decOf(P) === null) ans += ' (약 ' + approx(P.valueOf()) + '%)';
      return { kind: 'percent', title: title.replace('은 ', jo(plainNum(A) + u, '은/는') + ' '), steps: steps, answer: ans };
    }
    // A의 B% (할인·증가)
    if ((m = re('^' + NUM_SRC + '\\s*' + COUNTER + '\\s*(?:의|에서)\\s*' + NUM_SRC + PCT + '\\s*(할인|인상|증가|감소|늘|줄|올|내|더|싸)?').exec(s))) {
      var A2 = numOf(m[1]), u2 = m[2] || '', B2 = numOf(m[3]), mode = m[4] || '';
      var R = A2.mul(B2).div(100), st = [], hund = '$\\frac{' + texNum(B2) + '}{100}$';
      st.push(say(ctx, plainNum(B2) + '%는 ' + hund + jo(hund, '이에요/예요') + '. 그래서 ' + plainNum(A2) + u2 + '의 ' + plainNum(B2) + '%는 다음과 같아요.',
        plainNum(B2) + '%는 100을 기준으로 ' + plainNum(B2) + '만큼이라는 뜻이라서 ' + hund + jo(hund, '과/와') + ' 같아요. 그래서 ' + plainNum(A2) + u2 + '의 ' + plainNum(B2) + '%는 다음과 같아요.') +
        '\n$' + texNum(A2) + '\\times\\frac{' + texNum(B2) + '}{100}=' + texNum(R) + '$');
      var title2 = '백분율: ' + plainNum(A2) + u2 + '의 ' + plainNum(B2) + '%';
      if (/할인|감소|줄|내|싸/.test(mode)) {
        var after = A2.sub(R);
        st.push(say(ctx, mode === '할인' ? '할인된 값은 처음 값에서 할인 금액을 빼요.' : '줄어든 뒤의 값은 처음 값에서 빼요.') + '\n$' + texNum(A2) + '-' + texNum(R) + '=' + texNum(after) + '$');
        return { kind: 'percent', title: title2 + ' ' + (mode === '할인' ? '할인' : '감소'), steps: st, answer: plainNum(after) + u2 + ' (' + (mode === '할인' ? '할인 금액' : '줄어든 양') + ' ' + plainNum(R) + u2 + ')' };
      }
      if (/인상|증가|늘|올|더/.test(mode)) {
        var up = A2.add(R);
        st.push(say(ctx, '늘어난 뒤의 값은 처음 값에 더해요.') + '\n$' + texNum(A2) + '+' + texNum(R) + '=' + texNum(up) + '$');
        return { kind: 'percent', title: title2 + ' 증가', steps: st, answer: plainNum(up) + u2 + ' (늘어난 양 ' + plainNum(R) + u2 + ')' };
      }
      return { kind: 'percent', title: title2, steps: st, answer: plainNum(R) + u2 };
    }
    // B% 를 소수로·분수로
    if ((m = re('^' + NUM_SRC + PCT + '\\s*(?:을|를|은|는)?\\s*(소수|분수)\\s*로').exec(s))) {
      var B3 = numOf(m[1]), v3 = B3.div(100), toDec = m[2] === '소수';
      if (toDec && decOf(v3) === null) nope('dec');
      var st3 = [say(ctx, '%는 100에 대한 비율이라서 100으로 나눠요.') + '\n$' + texNum(B3) + '\\div100=' + (toDec ? decOf(v3) : '\\frac{' + texNum(B3) + '}{100}' + (v3.toTex() !== '\\frac{' + texNum(B3) + '}{100}' ? '=' + v3.toTex() : '')) + '$'];
      return { kind: 'percent', title: '백분율: ' + plainNum(B3) + '%를 ' + m[2] + '로', steps: st3, answer: '$' + (toDec ? decOf(v3) : v3.toTex()) + '$' };
    }
    // X 를 백분율로
    if ((m = re('^' + NUM_SRC + '\\s*(?:을|를|은|는)?\\s*(?:백분율|퍼센트|%)\\s*로').exec(s))) {
      var X = numOf(m[1]), P4 = X.mul(100);
      var st4 = [say(ctx, '백분율은 비율에 100을 곱하고 %를 붙여요.') + '\n$' + (m[1].indexOf('/') >= 0 ? X.toTex() : texNum(X)) + '\\times100=' + texNum(P4) + '$'];
      var a4 = plainNum(P4) + '%';
      if (decOf(P4) === null) a4 += ' (약 ' + approx(P4.valueOf()) + '%)';
      var xs = m[1].indexOf('/') >= 0 ? '$' + X.toTex() + '$' : plainNum(X);
      return { kind: 'percent', title: '백분율: ' + wj(xs, '을/를') + ' 백분율로', steps: st4, answer: a4 };
    }
    return null;
  }

  /* ================================================================
   * 단위 바꾸기 — 길이·무게·들이·넓이·부피·시간 (복합 단위 포함)
   * ================================================================ */

  // [별칭들, 보일 이름, 묶음, 기준 단위로 얼마, 읽는 소리 받침(조사용)]
  var UNIT_DEFS = [
    [['mm', '밀리미터'], 'mm', 'len', '1/1000', NO],
    [['cm', '센티미터', '센티'], 'cm', 'len', '1/100', NO],
    [['km', '킬로미터'], 'km', 'len', '1000', NO],
    [['m', '미터'], 'm', 'len', '1', NO],
    [['mg', '밀리그램'], 'mg', 'wt', '1/1000', YES],
    [['kg', '킬로그램'], 'kg', 'wt', '1000', YES],
    [['g', '그램'], 'g', 'wt', '1', YES],
    [['t', '톤'], 't', 'wt', '1000000', YES],
    [['ml', '밀리리터', 'cc'], 'mL', 'vol', '1', NO],
    [['kl', '킬로리터'], 'kL', 'vol', '1000000', NO],
    [['l', '리터'], 'L', 'vol', '1000', NO],
    [['cm^3', 'cm3', '세제곱센티미터'], 'cm³', 'vol', '1', NO],
    [['m^3', 'm3', '세제곱미터'], 'm³', 'vol', '1000000', NO],
    [['cm^2', 'cm2', '제곱센티미터'], 'cm²', 'area', '1/10000', NO],
    [['km^2', 'km2', '제곱킬로미터'], 'km²', 'area', '1000000', NO],
    [['m^2', 'm2', '제곱미터', '평방미터'], 'm²', 'area', '1', NO],
    [['ha', '헥타르'], 'ha', 'area', '10000', NO],
    [['a', '아르'], 'a', 'area', '100', NO],
    [['초'], '초', 'time', '1', NO],
    [['분'], '분', 'time', '60', YES],
    [['시간'], '시간', 'time', '3600', YES],
    [['일'], '일', 'time', '86400', RIEUL]
  ];
  var UNIT_ALIASES = (function () {
    var out = [];
    UNIT_DEFS.forEach(function (d) { d[0].forEach(function (a) { out.push({ a: a, d: d }); }); });
    return out.sort(function (x, y) { return y.a.length - x.a.length; });
  })();
  var UNIT_SRC = '(' + UNIT_ALIASES.map(function (x) { return x.a.replace(/\^/g, '\\^'); }).join('|') + ')(?![a-z0-9^])';
  function unitDef(alias) {
    alias = alias.toLowerCase();
    for (var i = 0; i < UNIT_ALIASES.length; i++) if (UNIT_ALIASES[i].a === alias) return UNIT_ALIASES[i].d;
    return null;
  }
  // 수 + 단위 글자 ('3500 m', '2시간') — 한글 단위는 붙여 쓴다
  function qty(f, d) {
    var n = plainNum(f);
    return /^[a-zA-Z]/.test(d[1]) ? n + ' ' + d[1] : n + d[1];
  }
  var UNIT_REASON = {
    'cm²|m²': '1 m = 100 cm이므로 1 m²는 한 변이 100 cm인 정사각형의 넓이 $100\\times100=10000$ cm²예요.',
    'm²|km²': '1 km = 1000 m이므로 1 km² = $1000\\times1000=1000000$ m²예요.',
    'cm³|m³': '1 m = 100 cm이므로 1 m³ = $100\\times100\\times100=1000000$ cm³예요.',
    'm²|a': '1 a는 한 변이 10 m인 정사각형의 넓이예요.',
    'm²|ha': '1 ha는 한 변이 100 m인 정사각형의 넓이예요.'
  };
  // 단위 뒤 조사 (읽는 소리: 미터·그램·분 …)
  function ujo(d, pair) {
    var p = pair.split('/'), snd = d[4] || NO;
    if (p[0] === '으로') return (snd[0] && !snd[1]) ? p[0] : p[1];
    return snd[0] ? p[0] : p[1];
  }
  // 양수 분수의 내림 (정확히)
  function ffloor(f) { f = fr(f); return (f.num - (((f.num % f.den) + f.den) % f.den)) / f.den; }

  function solveUnit(s, ctx) {
    var low = s.toLowerCase(), pos = 0, pairs = [], m;
    var pre = /^\s*(?:다음|아래)?\s*/.exec(low);
    pos = pre ? pre[0].length : 0;
    var pairRe = new RegExp('^\\s*(\\d[\\d,]*(?:\\.\\d+)?(?:\\s*\\/\\s*\\d+)?|\\.\\d+)\\s*' + UNIT_SRC, 'i');
    while ((m = pairRe.exec(low.slice(pos)))) {
      pairs.push({ v: numOf(m[1]), d: unitDef(m[2]) });
      pos += m[0].length;
    }
    if (!pairs.length) return null;
    var rest = low.slice(pos);
    if (!/몇|로|=|→|->|단위/.test(rest)) return null;
    var tRe = new RegExp('(?:몇\\s*)?' + UNIT_SRC, 'gi'), targets = [], leftover = rest;
    while ((m = tRe.exec(rest))) {
      var d = unitDef(m[1]);
      if (targets.indexOf(d) < 0) targets.push(d);
    }
    leftover = rest.replace(tRe, ' ').replace(/[=?!.~,→>\-]/g, ' ');
    if (!targets.length) return null;
    if (!isFiller(leftover.replace(/바꾸면|바꿔|바꾸|나타내면|나타내|고치면|고쳐|환산|변환|단위|으로|로|몇|개/g, ''))) return null;
    var g = pairs[0].d[2];
    for (var i = 0; i < pairs.length; i++) if (pairs[i].d[2] !== g) return null;
    for (var j = 0; j < targets.length; j++) if (targets[j][2] !== g) return null;
    for (var a = 0; a < pairs.length; a++) for (var b = a + 1; b < pairs.length; b++) if (pairs[a].d === pairs[b].d) return null;
    targets.sort(function (x, y) { return fr(y[3]).cmp(x[3]); });
    var steps = [], total = F(0);
    pairs.forEach(function (p) { total = total.add(p.v.mul(p.d[3])); });
    var qText = pairs.map(function (p) { return qty(p.v, p.d); }).join(' ');
    var tText = targets.map(function (d) { return '몇 ' + d[1]; }).join(' ');
    var title = '단위 바꾸기: ' + qText + ' → ' + targets.map(function (d) { return d[1]; }).join(' ');
    var S = targets[targets.length - 1];                 // 가장 작은 목표 단위
    // 1) 관계 알려 주기
    var rels = [], seen = {};
    pairs.forEach(function (p) {
      targets.forEach(function (d) {
        if (p.d === d) return;
        var key = [p.d[1], d[1]].sort().join('|');
        if (seen[key]) return;
        seen[key] = 1;
        rels.push(relLine(p.d, d));
      });
    });
    function relLine(x, y) {
      var big = fr(x[3]).cmp(y[3]) >= 0 ? x : y, small = big === x ? y : x, r = fr(big[3]).div(small[3]);
      var why = UNIT_REASON[small[1] + '|' + big[1]];
      return (why ? say(ctx, why) + '\n' : '') + '1' + (/^[a-zA-Z]/.test(big[1]) ? ' ' : '') + big[1] + ' = ' + qty(r, small);
    }
    if (rels.length) steps.push(say(ctx, '단위 사이의 관계를 먼저 알아봐요.') + '\n' + rels.join('\n'));
    // 2) 가장 작은 목표 단위로 모으기
    var inS = total.div(S[3]), parts = [];
    pairs.forEach(function (p) {
      var conv = p.v.mul(p.d[3]).div(S[3]);
      if (p.d === S) { parts.push(conv); return; }
      var r = fr(p.d[3]).div(S[3]);
      var how = r.cmp(1) >= 0 ? '$' + texNum(p.v) + '\\times' + texNum(r) + '=' + texNum(conv) + '$' : '$' + texNum(p.v) + '\\div' + texNum(r.inv()) + '=' + texNum(conv) + '$';
      steps.push(how + '이므로 ' + qty(p.v, p.d) + ' = ' + qty(conv, S));
      parts.push(conv);
    });
    if (pairs.length > 1) steps.push(say(ctx, '모두 더해요.') + '\n' + parts.map(function (c) { return qty(c, S); }).join(' + ') + ' = ' + qty(inS, S));
    // 3) 목표가 여러 단위면 큰 단위부터 나누어 담기
    var answer;
    if (targets.length === 1) {
      answer = qty(inS, S);
      if (decOf(inS) === null && g === 'time') {
        var secs = total, hh = [];
        [['일', 86400], ['시간', 3600], ['분', 60], ['초', 1]].forEach(function (u) {
          var k = ffloor(secs.div(u[1]));
          if (k > 0) { hh.push(k + u[0]); secs = secs.sub(k * u[1]); }
        });
        if (secs.isZero()) answer += ' (= ' + hh.join(' ') + ')';
      }
    } else {
      var rem = inS, outParts = [], lines = [];
      for (var t = 0; t < targets.length - 1; t++) {
        var per = fr(targets[t][3]).div(S[3]), k2 = ffloor(rem.div(per));
        lines.push(say(ctx, '1' + (/^[a-zA-Z]/.test(targets[t][1]) ? ' ' : '') + targets[t][1] + ' = ' + qty(per, S) + '이므로 ' + qty(rem, S) + '에는 ' +
          qty(per, S) + ujo(S, '이/가') + ' ' + k2 + '번 들어가요.'));
        rem = rem.sub(F(k2).mul(per));
        outParts.push(qty(F(k2), targets[t]));
      }
      outParts.push(qty(rem, S));
      lines.push(say(ctx, '남은 것은 ' + qty(rem, S) + ujo(S, '이에요/예요') + '.'));
      steps.push(lines.join('\n') + '\n' + qty(inS, S) + ' = ' + outParts.join(' '));
      answer = outParts.join(' ');
    }
    if (!steps.length) steps.push(qText + ' = ' + answer);
    // 안전장치: 다시 기준 단위로 바꿔 같은지
    return { kind: 'unit', title: title, steps: steps, answer: answer };
  }

  /* ================================================================
   * 식의 전개 · 미분 · 적분 (다항식만)
   * ================================================================ */

  // 동류항을 모으지 않은 전개 목록 [{c, m}]
  function expandList(n) {
    switch (n.type) {
      case 'num': return [{ c: fr(n.text !== undefined ? n.text : n.value), m: {} }];
      case 'var': { var mm = {}; mm[n.name] = 1; return [{ c: F(1), m: mm }]; }
      case 'neg': return expandList(n.arg).map(function (t) { return { c: t.c.neg(), m: t.m }; });
      case 'op': {
        if (n.op === '+' || n.op === '-') {
          var R = expandList(n.right);
          if (n.op === '-') R = R.map(function (t) { return { c: t.c.neg(), m: t.m }; });
          return expandList(n.left).concat(R);
        }
        if (n.op === '*') return cross(expandList(n.left), expandList(n.right));
        if (n.op === '/') {
          var d = toPoly(n.right);
          if (!pisConst(d) || pconst(d).isZero()) nope('div');
          var inv = pconst(d).inv();
          return expandList(n.left).map(function (t) { return { c: t.c.mul(inv), m: t.m }; });
        }
        if (n.op === '^') {
          var e = toPoly(n.right);
          if (!pisConst(e) || !pconst(e).isInt() || pconst(e).num < 0 || pconst(e).num > 6) nope('exp');
          var base = expandList(n.left), out = [{ c: F(1), m: {} }];
          for (var i = 0; i < pconst(e).num; i++) out = cross(out, base);
          return out;
        }
      }
    }
    return nope('expand');
  }
  function cross(A, B) {
    if (A.length * B.length > 64) nope('big');
    var out = [];
    A.forEach(function (a) { B.forEach(function (b) { out.push({ c: a.c.mul(b.c), m: mmul(a.m, b.m) }); }); });
    return out;
  }
  function listTex(list, vars) {
    var out = '';
    for (var i = 0; i < list.length; i++) out += term(list[i].c, mtex(list[i].m, vars), out === '');
    return out || '0';
  }
  function needsExpand(n) {
    if (!n || typeof n !== 'object') return false;
    var isSum = function (k) { return k && k.type === 'op' && (k.op === '+' || k.op === '-'); };
    if (n.type === 'op' && n.op === '*' && (isSum(n.left) || isSum(n.right))) return true;
    if (n.type === 'op' && n.op === '^' && isSum(n.left)) return true;
    if (n.type === 'neg' && isSum(n.arg)) return true;
    return needsExpand(n.left) || needsExpand(n.right) || needsExpand(n.arg);
  }
  function grp(t) { return /^[a-z0-9]$|^\d+$/.test(t) ? t : '(' + t + ')'; }

  function solveExpand(t, ctx) {
    var ast = parse(t), vars = varsOf(ast).sort();
    if (!vars.length || hasType(ast, 'const') || hasType(ast, 'func')) nope('expand');
    var P = toPoly(ast), orig = tex(ast), res = polyTex(P, null, vars);
    if (orig === res) nope('same');
    var steps = [], used = false, title = (needsExpand(ast) ? '식의 전개: $' : '식 간단히 하기: $') + orig + '$';
    var tm = function (p) { return polyTex(p, null, vars); };
    if (ctx.tone !== 'e' && ast.type === 'op' && ast.op === '^' && toPoly(ast.right) && pisConst(toPoly(ast.right)) && pconst(toPoly(ast.right)).eq(2)) {
      var bp = toPoly(ast.left), bt = pterms(bp, vars);
      if (bt.length === 2) {
        var A = {}, B = {};
        padd1(A, bt[0].c, bt[0].m);
        var neg = bt[1].c.sign() < 0;
        padd1(B, neg ? bt[1].c.neg() : bt[1].c, bt[1].m);
        var at = grp(tm(A)), btx = grp(tm(B));
        steps.push(say(ctx, '곱셈 공식 $(a' + (neg ? '-' : '+') + 'b)^{2}=a^{2}' + (neg ? '-' : '+') + '2ab+b^{2}$을 써요.' + (tm(A) === 'a' && tm(B) === 'b' ? '' : ' 여기서 $a=' + tm(A) + '$, $b=' + wj(tm(B) + '$', '이에요/예요') + '.')) +
          '\n$' + tidy(orig + '=' + at + '^{2}' + (neg ? '-' : '+') + '2\\times ' + at + '\\times ' + btx + '+' + btx + '^{2}=' + res) + '$');
        used = true;
      }
    } else if (ctx.tone !== 'e' && ast.type === 'op' && ast.op === '*') {
      var Lp = toPoly(ast.left), Rp = toPoly(ast.right), lt = pterms(Lp, vars), rt = pterms(Rp, vars);
      if (lt.length === 2 && rt.length === 2) {
        var same0 = lt[0].c.eq(rt[0].c) && mkey(lt[0].m) === mkey(rt[0].m);
        var opp1 = lt[1].c.eq(rt[1].c.neg()) && mkey(lt[1].m) === mkey(rt[1].m);
        if (same0 && opp1) {
          var a2 = {}, b2 = {};
          padd1(a2, lt[0].c, lt[0].m); padd1(b2, lt[1].c.abs(), lt[1].m);
          steps.push(say(ctx, '곱셈 공식 $(a+b)(a-b)=a^{2}-b^{2}$을 써요.') + '\n$' + tidy(orig + '=' + grp(tm(a2)) + '^{2}-' + grp(tm(b2)) + '^{2}=' + res) + '$');
          used = true;
        } else if (vars.length === 1 && pdeg(Lp) === 1 && pdeg(Rp) === 1 && lt[0].c.eq(1) && rt[0].c.eq(1) && !mkey(lt[1].m) && !mkey(rt[1].m)) {
          var p = lt[1].c, q = rt[1].c, v = vars[0];
          steps.push(say(ctx, '곱셈 공식 $(x+a)(x+b)=x^{2}+(a+b)x+ab$를 써요.') +
            '\n$' + tidy(orig + '=' + v + '^{2}+\\{' + fracT(p).s + '+' + ptex(q) + '\\}' + v + '+' + ptex(p) + '\\times ' + ptex(q) + '=' + res) + '$');
          used = true;
        } else if (vars.length === 1 && pdeg(Lp) === 1 && pdeg(Rp) === 1 && !mkey(lt[1].m) && !mkey(rt[1].m)) {
          var a3 = lt[0].c, b3 = lt[1].c, c3 = rt[0].c, d3 = rt[1].c, v3 = vars[0];
          steps.push(say(ctx, '곱셈 공식 $(ax+b)(cx+d)=acx^{2}+(ad+bc)x+bd$를 써요.') +
            '\n$' + tidy(orig + '=' + ptex(a3) + '\\times ' + ptex(c3) + v3 + '^{2}+\\{' + ptex(a3) + '\\times ' + ptex(d3) + '+' + ptex(b3) + '\\times ' + ptex(c3) + '\\}' + v3 + '+' + ptex(b3) + '\\times ' + ptex(d3) + '=' + res) + '$');
          used = true;
        }
      }
    }
    if (!used) {
      var list = expandList(ast), lt2 = listTex(list, vars);
      if (lt2 !== orig) steps.push(say(ctx, '분배법칙으로 괄호를 풀어요.', '괄호 밖의 수(식)를 괄호 안의 각 항에 곱해서 괄호를 풀어요.') + '\n$' + tidy(orig + '=' + lt2) + '$');
      if (lt2 !== res) steps.push(say(ctx, '동류항끼리 모아서 정리해요.', '문자가 같은 항끼리 모아서 계산해요.') + '\n$' + tidy(lt2 + '=' + res) + '$');
    }
    return { kind: 'expand', title: title, steps: steps, answer: '$' + res + '$' };
  }

  // 'f(x)=…' 'y=…' 를 떼고 다항함수 하나를 읽는다
  function readFunc(t) {
    var name = null, m;
    t = t.trim();
    if ((m = /^([a-z])\s*\(\s*([a-z])\s*\)\s*=/i.exec(t))) { name = m[1] + '(' + m[2] + ')'; t = t.slice(m[0].length); }
    else if ((m = /^y\s*=/i.exec(t))) { name = 'y'; t = t.slice(m[0].length); }
    if (/[=<>≤≥]/.test(t)) nope('rel');
    var ast = parse(t), vars = varsOf(ast);
    if (vars.length > 1 || hasType(ast, 'const')) nope('vars');
    var v = vars[0] || 'x', P = toPoly(ast);
    if (pvars(P).length > 1) nope('vars');
    return { ast: ast, v: v, P: P, cs: pcoeffs(P, v), name: name };
  }
  function derivOfCoeffs(cs) {     // 내림차순 계수 → 도함수 계수
    var n = cs.length - 1, out = [];
    for (var i = 0; i < n; i++) out.push(cs[i].mul(n - i));
    return out.length ? out : [F(0)];
  }
  function monoTex(c, k, v) { return term(c, k === 0 ? '' : (k === 1 ? v : v + '^{' + k + '}'), true) || '0'; }

  function solveDeriv(t, ctx, at) {
    var f = readFunc(t), v = f.v, cs = f.cs, n = cs.length - 1, steps = [];
    var fname = f.name === 'y' ? 'y' : 'f(' + v + ')', dname = f.name === 'y' ? "y'" : "f'(" + v + ')';
    var orig = tex(f.ast), poly = polyTex(f.P, null, [v]);
    var title = '미분: $' + fname + '=' + orig + '$';
    if (orig !== poly) steps.push(say(ctx, '먼저 전개해서 정리해요.') + '\n$' + fname + '=' + poly + '$');
    var lines = [];
    for (var i = 0; i <= n; i++) {
      if (cs[i].isZero()) continue;
      var k = n - i, d = k === 0 ? '0' : monoTex(cs[i].mul(k), k - 1, v);
      lines.push('$(' + monoTex(cs[i], k, v) + ")'=" + d + '$');
    }
    steps.push(say(ctx, '다항함수는 항마다 미분해요. $(' + v + "^{n})'=n" + v + '^{n-1}$이고, 상수항을 미분하면 0이에요.') + '\n' + lines.join('\n'));
    var dc = derivOfCoeffs(cs), dt = polyTex(fromCoeffs(dc, v), null, [v]);
    steps.push(say(ctx, '모두 더하면') + '\n$' + dname + '=' + dt + '$');
    var ans = '$' + dname + '=' + dt + '$';
    if (at) {
      var val = F(0);
      for (var j = 0; j < dc.length; j++) val = val.mul(at).add(dc[j]);
      var sub = {};
      sub[v] = at;
      var dAst = parse(polyText(dc, v));
      var shown = tex(dAst, { sub: sub });
      var pn = f.name === 'y' ? "y'" : "f'";
      steps.push(say(ctx, '$' + v + '=' + fracT(at).s + '$에서의 미분계수는 도함수에 ' + wj('$' + fracT(at).s + '$', '을/를') + ' 넣은 값이에요.') +
        '\n$' + pn + '(' + fracT(at).s + ')=' + tidy(shown) + '=' + fracT(val).s + '$');
      ans = '$' + pn + '(' + fracT(at).s + ')=' + fracT(val).s + '$';
    }
    return { kind: 'deriv', title: title, steps: steps, answer: ans };
  }
  // 계수 → parseExpr 가 읽는 글자 (미분계수 대입 표시용)
  function polyText(cs, v) {
    var n = cs.length - 1, out = '';
    for (var i = 0; i <= n; i++) {
      var c = fr(cs[i]), k = n - i;
      if (c.isZero()) continue;
      var a = c.abs(), cs2 = a.isInt() ? String(a.num) : '(' + a.num + '/' + a.den + ')';
      var mono = k === 0 ? cs2 : ((a.eq(1) ? '' : cs2) + v + (k > 1 ? '^' + k : ''));
      out += (c.sign() < 0 ? '-' : (out ? '+' : '')) + mono;
    }
    return out || '0';
  }

  function solveInteg(t, ctx, lo, hi) {
    var f = readFunc(t), v = f.v, cs = f.cs, n = cs.length - 1, steps = [];
    var orig = tex(f.ast), poly = polyTex(f.P, null, [v]);
    var defin = lo !== null && hi !== null && lo !== undefined && hi !== undefined;
    var body = /^[^+\-]*$/.test(poly.replace(/^-/, '')) && !/[+\-]/.test(orig.replace(/^-/, '')) ? orig : '(' + orig + ')';
    var intTex = '\\int' + (defin ? '_{' + fracT(lo).s + '}^{' + fracT(hi).s + '}' : '') + ' ' + body + '\\,d' + v;
    var title = (defin ? '정적분: $' : '부정적분: $') + intTex + '$';
    if (orig !== poly) steps.push(say(ctx, '먼저 전개해서 정리해요.') + '\n$' + orig + '=' + poly + '$');
    var anti = [F(0)], lines = [];
    for (var i = 0; i <= n; i++) {
      var k = n - i, c = cs[i];
      anti[i] = c.div(k + 1);
      if (c.isZero()) continue;
      lines.push('$\\int ' + monoTex(c, k, v) + '\\,d' + v + '=' + monoTex(c.div(k + 1), k + 1, v) + '$');
    }
    anti.push(F(0));
    var Ftex = polyTex(fromCoeffs(anti, v), null, [v]);
    steps.push(say(ctx, '항마다 $\\int ' + v + '^{n}\\,d' + v + '=\\frac{1}{n+1}' + v + '^{n+1}$을 써요.') + '\n' + (lines.length ? lines.join('\n') : '$\\int 0\\,d' + v + '=0$'));
    if (!defin) {
      steps.push(say(ctx, '모두 더하고 적분상수 $C$를 붙여요.') + '\n$' + intTex + '=' + (Ftex === '0' ? '' : Ftex + '+') + 'C$');
      return { kind: 'integ', title: title, steps: steps, answer: '$' + (Ftex === '0' ? '' : Ftex + '+') + 'C$ ' + say(ctx, '($C$는 적분상수)') };
    }
    var Fv = function (x) { var s = F(0); for (var j = 0; j < anti.length; j++) s = s.mul(x).add(anti[j]); return s; };
    var Fb = Fv(hi), Fa = Fv(lo), val = Fb.sub(Fa);
    steps.push(say(ctx, '부정적분 하나를 $F(' + v + ')=' + Ftex + '$' + jo('$' + Ftex + '$', '이라고/라고') + ' 하면 정적분은 $F(' + fracT(hi).s + ')-F(' + fracT(lo).s + ')$' + jo('$' + fracT(lo).s + '$', '이에요/예요') + '.') +
      '\n$F(' + fracT(hi).s + ')=' + fracT(Fb).s + '$, $F(' + fracT(lo).s + ')=' + fracT(Fa).s + '$');
    steps.push('$' + intTex + '=' + fracT(Fb).s + '-' + ptex(Fa) + '=' + fracT(val).s + '$');
    var d = decOf(val), ans = '$' + fracT(val).s + (d !== null && !val.isInt() ? '=' + d : '') + '$';
    return { kind: 'integ', title: title, steps: steps, answer: ans };
  }

  /* ================================================================
   * 질문 나누기 (어떤 꼴인지) → 풀기
   * ================================================================ */

  // 3x4, (2+3)x4 처럼 x 를 곱하기로 쓴 경우: 등호·다른 문자 없음, x 의 양옆이 수·괄호
  function timesX(t) {
    if (/[=<>≤≥]/.test(t)) return t;
    var letters = t.replace(/sqrt|pi/gi, '').match(/[a-zA-Z]/g) || [];
    if (!letters.length) return t;
    for (var i = 0; i < letters.length; i++) if (letters[i].toLowerCase() !== 'x') return t;
    var r = t.replace(/([0-9.)\]}])\s*[xX]\s*(?=[0-9.(\[{√])/g, '$1×');
    return /[xX]/.test(r) ? t : r;
  }

  // 수 글자 하나 (정수·소수·분수, 음수 가능)
  function numToken(t) {
    t = String(t).replace(/[{}]/g, '').trim();
    if (!/^-?\s*(?:\d+(?:\.\d+)?(?:\s*\/\s*\d+)?|\.\d+)$/.test(t)) nope('num');
    return numOf(t);
  }

  // 연립방정식: 등호가 둘, 쉼표·그리고·와 등으로 나뉜 두 식
  function splitSystem(s) {
    var t = s.replace(/연립\s*(?:일차\s*)?방정식/g, ' ').replace(/^\s*\{|\}\s*$/g, ' ');
    if ((t.match(/=/g) || []).length !== 2 || /[<>≤≥]/.test(t)) return null;
    var seps = [/\s*,(?!\d{3}(?![\d.a-z(]))\s*|\s*;\s*/, /\s*(?:그리고|이고|이며|및|하고)\s*/, /(?:와|과)\s+(?=[a-z0-9(□-])/i, /\s+/];
    for (var i = 0; i < seps.length; i++) {
      var parts = t.split(seps[i]).filter(function (p) { return p.trim() !== ''; });
      if (seps[i].source === '\\s+') {
        // 띄어쓰기로 나뉜 경우: 등호를 하나씩 갖도록 두 덩어리로 다시 묶는다
        for (var k = 1; k < parts.length; k++) {
          var a = parts.slice(0, k).join(' '), b = parts.slice(k).join(' ');
          var ma = onlyMath(a), mb = onlyMath(b);
          if (ma && mb && (ma.match(/=/g) || []).length === 1 && (mb.match(/=/g) || []).length === 1) return [ma, mb];
        }
        continue;
      }
      if (parts.length !== 2) continue;
      var x = onlyMath(parts[0]), y = onlyMath(parts[1]);
      if (x && y && (x.match(/=/g) || []).length === 1 && (y.match(/=/g) || []).length === 1) return [x, y];
    }
    return null;
  }

  function route(s, ctx) {
    var low = s.toLowerCase(), m, nums;
    // 1. 최대공약수·최소공배수
    var hasG = /최대\s*공약수|gcd/.test(low), hasL = /최소\s*공배수|lcm/.test(low);
    if (hasG || hasL) {
      var rest = s.replace(/최대\s*공약수|최소\s*공배수|gcd|lcm/gi, ' ');
      if (/[a-zA-Z]/.test(rest)) return null;
      nums = naturalsIn(rest);
      if (!nums) return null;
      if (hasG && hasL) {
        var rg = solveGcdLcm(nums, 'gcd', ctx), rl = solveGcdLcm(nums, 'lcm', ctx);
        return { kind: 'gcd', title: '최대공약수와 최소공배수: ' + nums.join(', '), steps: rg.steps.concat(rl.steps.slice(ctx.tone === 'e' ? 0 : 1)), answer: rg.answer + ', ' + rl.answer.replace(/^.*의 /, '') };
      }
      return solveGcdLcm(nums, hasG ? 'gcd' : 'lcm', ctx);
    }
    // 2. 소인수분해·소인수
    if (/소인수|인수\s*분해/.test(low) && !/[a-zA-Z]/.test(s)) {
      nums = naturalsIn(s);
      if (!nums || nums.length !== 1) return null;
      return solveFactor(nums[0], ctx, /소인수/.test(low) && !/분해/.test(low));
    }
    // 3. 약분·기약분수
    if (/약분|기약\s*분수/.test(low)) {
      m = /^(.*?)\s*(?:을|를|은|는|의)?\s*(?:약분|기약\s*분수)/.exec(s);
      if (!m) return null;
      return solveSimplify(m[1].replace(/^(?:다음|분수)\s*/, '').trim(), ctx);
    }
    // 4. 미분
    if (/미분|도함수/.test(low)) {
      var at = null, s4 = s;
      if ((m = /([a-z])\s*=\s*(-?\s*[\d.\/]+)\s*에서(?:의)?/i.exec(s4))) { at = numToken(m[2]); s4 = s4.replace(m[0], ' '); }
      s4 = s4.replace(/(?:의|을|를)?\s*(?:도함수|미분\s*계수|미분)(?:을|를|하면|해|한)?/g, ' ');
      var t4 = onlyMath(s4);
      if (!t4) return null;
      return solveDeriv(t4, ctx, at);
    }
    // 5. 적분
    if (/적분|∫/.test(low)) {
      var lo = null, hi = null, s5 = s;
      if ((m = /∫\s*_\s*\{?\s*(-?[\d.\/]+)\s*\}?\s*\^\s*\{?\s*(-?[\d.\/]+)\s*\}?/.exec(s5))) { lo = numToken(m[1]); hi = numToken(m[2]); s5 = s5.replace(m[0], ' '); }
      else if ((m = /(?:[a-z]\s*=\s*)?(-?[\d.\/]+)\s*(?:부터|에서)\s*(?:[a-z]\s*=\s*)?(-?[\d.\/]+)\s*까지(?:의)?/i.exec(s5))) { lo = numToken(m[1]); hi = numToken(m[2]); s5 = s5.replace(m[0], ' '); }
      else if ((m = /(?:구간\s*)?\[\s*(-?[\d.\/]+)\s*,\s*(-?[\d.\/]+)\s*\]\s*(?:에서)?/.exec(s5))) { lo = numToken(m[1]); hi = numToken(m[2]); s5 = s5.replace(m[0], ' '); }
      s5 = s5.replace(/∫/g, ' ').replace(/(?:을|를|의)?\s*(?:정적분|부정적분|적분)(?:을|를|하면|해|한|값)?/g, ' ');
      var t5 = onlyMath(s5);
      if (!t5) return null;
      t5 = t5.replace(/\s*d\s*[a-z]\s*$/i, '').trim();          // 끝의 dx
      if (/^\(.*\)$/.test(t5)) { try { var inner = t5.slice(1, -1); M().parseExpr(inner); t5 = inner; } catch (e) { /* 괄호 짝이 다르면 그대로 */ } }
      return solveInteg(t5, ctx, lo, hi);
    }
    // 6. 백분율
    if (/%|퍼센트|프로|백분율/.test(low)) return solvePercent(s, ctx);
    // 7. 단위 바꾸기
    var u = solveUnit(s, ctx);
    if (u) return u;
    // 8. 제곱근 (말로 물은 것)
    if ((m = /^(.+?)\s*의\s*제곱근/.exec(s)) && isFiller(s.slice(m[0].length))) {
      var n8 = M().parseNumberAnswer(m[1].trim());
      if (!n8 || !n8.isInt() || n8.sign() < 0) return null;
      return solveRadical(n8.num, ctx, true);
    }
    if ((m = /^제곱근\s*(\d+)\s*(.*)$/.exec(s)) && isFiller(m[2])) return solveRadical(Number(m[1]), ctx, false);
    // 9. 연립방정식
    var sys = splitSystem(s);
    if (sys) {
      var rds = sys.map(readRel);
      if (!rds[0] || !rds[1] || rds[0].rel !== '=' || rds[1].rel !== '=') return null;
      return solveSystem(rds, ctx);
    }
    // 10. 식 하나
    var kw = /전개|간단히|정리/.test(low);
    var t = onlyMath(kw ? s.replace(/전개|간단히|정리/g, ' ') : s);
    if (!t) return null;
    var rels = t.match(/[=<>≤≥]/g) || [];
    if (rels.length) {
      if (rels.length === 2 && rels.indexOf('=') < 0) return solveCompound(t, ctx);
      if (rels.length !== 1) return null;
      var rd = readRel(t);
      if (!rd) return null;
      var vs = uniq(varsOf(rd.L).concat(varsOf(rd.R)));
      if (vs.length !== 1) return null;
      var v = vs[0];
      // □ = (계산식): 계산 문제
      if (rd.rel === '=' && ((rd.L.type === 'var' && !containsVar(rd.R, v)) || (rd.R.type === 'var' && !containsVar(rd.L, v)))) {
        var other = rd.L.type === 'var' ? rd.R : rd.L;
        if (other.type === 'num') return null;
        var ar = solveArith(textOf(t, rd), ctx);
        ar.answer = ar.answer.replace(/^\$/, '$' + vname(v, rd.names) + '=');
        return ar;
      }
      var P = null;
      try { P = psub(toPoly(rd.L), toPoly(rd.R)); } catch (e) { if (!(e instanceof Unsolvable)) throw e; }
      if (!P) return rd.rel === '=' ? solveLinear(rd, v, ctx) : null;     // 36÷□=4: 거꾸로 생각하기로
      var deg = pdeg(P, v);
      if (pvars(P).length > 1) return null;
      if (rd.rel !== '=') {
        if (deg > 1) return null;
        return solveIneq(rd, v, ctx);
      }
      if (deg <= 1) return solveLinear(rd, v, ctx);
      if (deg === 2) return solveQuad(rd, v, ctx);
      return null;
    }
    t = timesX(t);
    var ast = parse(t);
    if (!varsOf(ast).length) {
      if (ast.type === 'func' && ast.arg.type === 'num' && /^\d+$/.test(ast.arg.text) && !fsqrt(fr(ast.arg.text))) return solveRadical(Number(ast.arg.text), ctx, false);
      return solveArith(t, ctx);
    }
    if (!kw && !needsExpand(ast)) return null;
    return solveExpand(t, ctx);
  }
  // '□=3+4' 에서 계산할 쪽 글자
  function textOf(t, rd) {
    var bx = boxVar(t), s = bx.text, i = s.indexOf('=');
    var left = s.slice(0, i).trim(), right = s.slice(i + 1).trim();
    return rd.L.type === 'var' ? right : left;
  }

  // 결과가 계약에 맞는지 마지막으로 본다
  function valid(r) {
    if (!r || typeof r !== 'object' || typeof r.kind !== 'string') return null;
    if (!Array.isArray(r.steps) || !r.steps.length || typeof r.answer !== 'string' || !r.answer) return null;
    for (var i = 0; i < r.steps.length; i++) {
      if (typeof r.steps[i] !== 'string' || !r.steps[i].trim() || /undefined|NaN|Infinity|\[object/.test(r.steps[i])) return null;
    }
    if (/undefined|NaN|Infinity|\[object/.test(r.answer + r.title)) return null;
    return { kind: r.kind, title: r.title || '', steps: r.steps, answer: r.answer };
  }

  function solve(text, opts) {
    try {
      var ctx = { tone: toneOf(opts && opts.grade) };
      var s = prep(text);
      if (!s || s.length > LIMIT_LEN) return null;
      return valid(route(s, ctx));
    } catch (e) {
      if (e instanceof Unsolvable || e instanceof DivZero || e instanceof RangeError || (e && /TutorMath/.test(String(e.message)))) return null;
      return null;
    }
  }

  function detect(text) {
    var r = solve(text, {});
    return r ? r.kind : null;
  }

  return {
    solve: solve,
    detect: detect,
    // 계약 밖 덤: 화면·테스트가 말투 바꾸기·조사를 쓸 수 있게
    _formal: formal,
    _josa: jo
  };
});
