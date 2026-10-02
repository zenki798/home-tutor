/* TutorFig — 학습 그림을 SVG 문자열로 만든다 (docs/ARCHITECTURE.md §4).
   시계·수직선·분수 모형·좌표평면·다각형·원·각·막대/꺾은선/원그래프·수 모형·직육면체·직접 그린 SVG.
   - DOM 을 쓰지 않는 순수 함수다. 다른 모듈에 기대지 않는다(그래프 식 계산기도 안에 있다).
   - width/height 없이 viewBox 만 쓴다. viewBox 1단위 ≈ 화면 1px 로 잡았다(글자 12~20).
   - 선·글자는 currentColor, 강조색은 CSS 변수 --fig-1~4(없으면 기본값) → 밝은/어두운 화면 모두.
   - id 를 쓰지 않는다: 한 화면에 그림이 여러 개 있어도 서로 부딪히지 않게(화살촉도 직접 그린다).
   - 페이지가 --fig-bg(그림 바탕색)를 주면 선 위에 놓인 글자에 바탕색 테두리가 생겨 또렷해진다(없으면 효과 없음).
   - 화면 크기: TutorFig.size(svg).w 를 max-width(px)로 주면 모든 그림의 글자가 같은 크기로 보인다.
   계약(§4) 밖에 더한 선택 칸: numberline.fractions(1/k 눈금을 분수로), coord.points[].open(빈 점),
   polygon.segments[{from,to,dashed?,label?,right?}](높이 등 보조선·직각 표시), circle.d(지름 글),
   bars·line.showValues(값 글자, 기본 true), line.fromZero(물결선 없이 0부터). */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorFig = mod;
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var COLORS = ['var(--fig-1, #2563eb)', 'var(--fig-2, #f59e0b)', 'var(--fig-3, #10b981)', 'var(--fig-4, #ef4444)'];
  var ERROR_TEXT = '그림을 그릴 수 없어요';
  var PI = Math.PI;

  /* ───────────── 작은 도구 ───────────── */

  function col(i) { return COLORS[((i % 4) + 4) % 4]; }
  function hasOwn(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function isObj(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function isInt(v) { return isNum(v) && Math.floor(v) === v; }
  function isText(v) { return typeof v === 'string' || isNum(v); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function num(v, def) { return isNum(v) ? v : def; }
  function sum(arr) { var t = 0; for (var i = 0; i < arr.length; i++) t += arr[i]; return t; }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  // 좌표는 소수 한 자리면 충분하다(파일 크기). -0 은 0 으로.
  function rd(v) { var t = Math.round(v * 10) / 10; return t === 0 ? 0 : t; }
  function rd2(v) { var t = Math.round(v * 100) / 100; return t === 0 ? 0 : t; }
  // 부동소수 오차 지우기 (0.1+0.2 → 0.3)
  function clean(v) { var t = parseFloat(Number(v).toPrecision(12)); return t === 0 ? 0 : t; }

  // 화면에 보일 수: 다섯 자리 이상 정수는 콤마(group 이면 네 자리부터), 음수는 진짜 빼기 기호(−)
  function numText(v, group) {
    v = clean(v);
    var a = Math.abs(v), s = String(a);
    if (/\.\d{7,}/.test(s)) s = String(parseFloat(a.toFixed(4)));
    if (Math.floor(a) === a && a >= (group ? 1000 : 10000) && s.indexOf('e') < 0) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (v < 0 ? '\u2212' : '') + s;
  }
  // 한 축의 눈금 수는 같은 꼴로: 만 단위가 하나라도 있으면 천 단위부터 모두 콤마
  function axisFormat(values) {
    var big = values.some(function (v) { return Math.abs(v) >= 10000; });
    return function (v) { return numText(v, big); };
  }
  // aria-label 에 쓸 수 (읽어 주는 기능이 알아듣게 보통 빼기표)
  function numPlain(v) { return String(clean(v)); }
  function show(v) {
    if (v === undefined) return '없음';
    if (typeof v === 'string') return "'" + (v.length > 30 ? v.slice(0, 30) + '…' : v) + "'";
    if (typeof v === 'number') return String(v);
    try { var j = JSON.stringify(v); return j && j.length > 40 ? j.slice(0, 40) + '…' : String(j); } catch (e) { return String(v); }
  }
  // 그림 안 글자로 보일 라벨 (수는 − 기호로)
  function labelText(v) { return typeof v === 'number' ? numText(v) : String(v); }

  // 글자 폭 어림 (DOM 이 없으니 글자 종류별 평균 폭으로)
  function textWidth(s, size) {
    s = String(s);
    var w = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if ((c >= 0xAC00 && c <= 0xD7A3) || (c >= 0x3130 && c <= 0x318F) || (c >= 0x1100 && c <= 0x11FF) ||
          (c >= 0x4E00 && c <= 0x9FFF)) w += 0.98;               // 한글·한자: 거의 정사각
      else if (c >= 48 && c <= 57) w += 0.57;                  // 숫자
      else if (c >= 65 && c <= 90) w += 0.67;                  // 대문자
      else if (c >= 97 && c <= 122) w += 0.53;                 // 소문자
      else if (c === 32) w += 0.28;
      else if ('.,:;\'!|()[]'.indexOf(s.charAt(i)) >= 0) w += 0.33;
      else if (c === 176) w += 0.4;                            // °
      else if (c >= 0xD800 && c <= 0xDFFF) w += 0.5;           // 이모지(두 칸) 반씩
      else w += 0.62;
    }
    return w * size;
  }

  /* ───────────── SVG 조각 만들기 ───────────── */

  function attrs(o) {
    var s = '';
    for (var k in o) {
      if (!hasOwn(o, k)) continue;
      var v = o[k];
      if (v === null || v === undefined || v === false) continue;
      s += ' ' + k + '="' + esc(typeof v === 'number' ? rd2(v) : v) + '"';
    }
    return s;
  }
  function el(name, o, inner) {
    return '<' + name + attrs(o || {}) + (inner === undefined || inner === null ? '/>' : '>' + inner + '</' + name + '>');
  }
  // 칠하기 옵션 → 속성. 색 'cur' = currentColor, 'none', 또는 CSS 색(var(--fig-1, …)).
  // CSS 변수는 표현 속성에서 안 먹는 브라우저가 있어 style 로 넣는다.
  function paint(a, o) {
    var st = [];
    if (o.stroke) { if (o.stroke === 'cur') a.stroke = 'currentColor'; else if (o.stroke === 'none') a.stroke = 'none'; else st.push('stroke:' + o.stroke); }
    if (o.fill) { if (o.fill === 'cur') a.fill = 'currentColor'; else if (o.fill === 'none') a.fill = 'none'; else st.push('fill:' + o.fill); }
    if (o.w !== undefined) a['stroke-width'] = o.w;
    if (o.so !== undefined) a['stroke-opacity'] = o.so;
    if (o.fo !== undefined) a['fill-opacity'] = o.fo;
    if (o.dash) a['stroke-dasharray'] = o.dash;
    if (o.cap) a['stroke-linecap'] = o.cap;
    if (o.join) a['stroke-linejoin'] = o.join;
    if (o.cls) a['class'] = o.cls;
    if (st.length) a.style = st.join(';');
    return a;
  }
  function L(x1, y1, x2, y2, o) { return el('line', paint({ x1: rd(x1), y1: rd(y1), x2: rd(x2), y2: rd(y2) }, o || {})); }
  function C(cx, cy, r, o) { return el('circle', paint({ cx: rd(cx), cy: rd(cy), r: r }, o || {})); }
  function R(x, y, w, h, o) { o = o || {}; return el('rect', paint({ x: rd(x), y: rd(y), width: rd(w), height: rd(h), rx: o.rx }, o)); }
  function P(d, o) { return el('path', paint({ d: d }, o || {})); }
  function pt(x, y) { return rd(x) + ' ' + rd(y); }
  function polyD(pts, close) {
    var d = '';
    for (var i = 0; i < pts.length; i++) d += (i ? 'L' : 'M') + pt(pts[i][0], pts[i][1]);
    return d + (close ? 'Z' : '');
  }
  // 글자: (x, y) 는 글자의 가운데 높이. o = { size, anchor, color, bold, italic, cls, halo }
  function T(x, y, s, o) {
    o = o || {};
    var a = { x: rd(x), y: rd(y), 'font-size': o.size || 14 };
    var anchor = o.anchor || 'middle';
    if (anchor !== 'start') a['text-anchor'] = anchor;
    a.dy = '.35em';
    var st = [];
    if (o.color) st.push('fill:' + o.color); else a.fill = 'currentColor';
    // 글자 테두리: 페이지가 --fig-bg(그림 바탕색)를 주면 선 위의 글자가 또렷해진다. 없으면 투명(효과 없음)
    if (o.halo) st.push('paint-order:stroke', 'stroke:var(--fig-bg, transparent)', 'stroke-width:3px', 'stroke-linejoin:round');
    if (st.length) a.style = st.join(';');
    if (o.bold) a['font-weight'] = 'bold';
    if (o.italic) a['font-style'] = 'italic';
    if (o.cls) a['class'] = o.cls;
    return el('text', a, esc(s));
  }
  // 화살촉(채운 삼각형): 끝점 (x, y), 방향 ang(화면 좌표 라디안)
  function arrowHead(x, y, ang, size, color) {
    var a1 = ang + PI - 0.45, a2 = ang + PI + 0.45;
    var d = 'M' + pt(x, y) + 'L' + pt(x + size * Math.cos(a1), y + size * Math.sin(a1)) +
      'L' + pt(x + size * Math.cos(a2), y + size * Math.sin(a2)) + 'Z';
    return P(d, { fill: color || 'cur', stroke: 'none' });
  }

  // 그린 것 전체를 감싸는 상자 → 잘리는 글자 없이 viewBox 를 맞춘다
  function Box() { this.x1 = Infinity; this.y1 = Infinity; this.x2 = -Infinity; this.y2 = -Infinity; }
  Box.prototype.add = function (x, y, r) {
    r = r || 0;
    if (x - r < this.x1) this.x1 = x - r;
    if (x + r > this.x2) this.x2 = x + r;
    if (y - r < this.y1) this.y1 = y - r;
    if (y + r > this.y2) this.y2 = y + r;
    return this;
  };
  Box.prototype.rect = function (b) { this.add(b.x1, b.y1); this.add(b.x2, b.y2); return this; };
  Box.prototype.viewBox = function (pad, minW, minH) {
    var x = this.x1 - pad, y = this.y1 - pad, w = this.x2 - this.x1 + 2 * pad, h = this.y2 - this.y1 + 2 * pad;
    if (minW && w < minW) { x -= (minW - w) / 2; w = minW; }
    if (minH && h < minH) { y -= (minH - h) / 2; h = minH; }
    return [rd(x), rd(y), rd(w), rd(h)].join(' ');
  };
  // 글자가 차지하는 상자
  function textRect(x, y, s, size, anchor) {
    var w = textWidth(s, size), x1 = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2;
    return { x1: x1, y1: y - size * 0.62, x2: x1 + w, y2: y + size * 0.62 };
  }
  function overlap(a, b, gap) {
    gap = gap || 0;
    return a.x1 < b.x2 + gap && b.x1 < a.x2 + gap && a.y1 < b.y2 + gap && b.y1 < a.y2 + gap;
  }

  // 그림을 쌓아 가는 붓: 그린 조각 + 감싸는 상자. halo 면 글자에 테두리(--fig-bg)
  function Pen(halo) { this.out = []; this.box = new Box(); this.halo = !!halo; }
  Pen.prototype.push = function (s) { this.out.push(s); return this; };
  Pen.prototype.text = function (x, y, s, o) {
    o = o || {};
    if (this.halo && o.halo === undefined) o.halo = true;
    var r = textRect(x, y, s, o.size || 14, o.anchor);
    this.out.push(T(x, y, s, o));
    this.box.rect(r);
    return r;
  };
  Pen.prototype.svg = function () { return this.out.join(''); };

  function wrap(type, viewBox, body, label) {
    return '<svg xmlns="' + NS + '" viewBox="' + viewBox + '" class="fig fig-' + type +
      '" role="img" aria-label="' + esc(label) + '">' + body + '</svg>';
  }
  function errorFigure() {
    var body = R(2, 2, 236, 52, { rx: 8, fill: 'none', stroke: 'cur', so: 0.5, w: 1.5, dash: '5 4' }) +
      T(120, 28, ERROR_TEXT, { size: 14 });
    return wrap('error', '0 0 240 56', body, ERROR_TEXT);
  }

  // 보기 좋은 간격: 1·2·5 × 10^k 중 raw 이상인 가장 작은 값
  function niceStep(raw) {
    if (!(raw > 0) || !isFinite(raw)) return 1;
    var p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10 + 1e-12)), m = raw / p;
    var n = m <= 1 + 1e-9 ? 1 : m <= 2 + 1e-9 ? 2 : m <= 5 + 1e-9 ? 5 : 10;
    return clean(n * p);
  }
  // 1 → 2 → 5 → 10 → 20 → 50 …
  function nextNice(k) {
    var p = Math.pow(10, Math.floor(Math.log(k) / Math.LN10 + 1e-9)), m = Math.round(k / p);
    return m < 2 ? 2 * p : m < 5 ? 5 * p : 10 * p;
  }
  // [lo, hi] 를 담는 보기 좋은 눈금 (target 칸 안팎)
  function axisScale(lo, hi, target) {
    if (hi - lo <= 0) hi = lo + 1;
    var step = niceStep((hi - lo) / target);
    var a = Math.floor(lo / step + 1e-9) * step, b = Math.ceil(hi / step - 1e-9) * step, ticks = [];
    for (var i = 0, v = a; v <= b + step * 1e-6 && i < 200; i++, v = a + i * step) ticks.push(clean(v));
    return { lo: clean(a), hi: clean(b), step: step, ticks: ticks };
  }

  /* ───────────── 그래프 식 계산기 (변수 x 하나) ─────────────
     + - * / ^, 암묵적 곱(2x, 3(x+1), (x+1)(x-1)), 괄호 ( ) [ ] { }, |x|, 소수,
     sqrt abs sin cos tan log(상용) ln exp, pi π e, √ ² ³ × ÷ −.  'y=' 'f(x)=' 는 떼고 읽는다.
     암묵적 곱은 곱셈과 같은 순위: 1/2x = (1/2)·x  (분모로 쓰려면 1/(2x)). */
  var FUNCS = {
    sqrt: Math.sqrt, abs: Math.abs, sin: Math.sin, cos: Math.cos, tan: Math.tan, exp: Math.exp, ln: Math.log,
    log: function (v) { return Math.log(v) / Math.LN10; }
  };
  var NAMES = ['sqrt', 'abs', 'sin', 'cos', 'tan', 'log', 'ln', 'exp', 'pi', 'x', 'e'];

  function normExpr(src) {
    // ² ³ 은 NFKC 가 2·3 으로 바꿔 버리므로 먼저 거듭제곱으로 바꾼다
    var s = String(src).replace(/²/g, '^2').replace(/³/g, '^3');
    if (s.normalize) s = s.normalize('NFKC');
    s = s.replace(/[\u2212\u2013\u2014]/g, '-').replace(/[×·∙⋅]/g, '*').replace(/÷/g, '/')
      .replace(/π/g, 'pi').replace(/√/g, 'sqrt');
    return s.replace(/^\s*(?:y|[a-zA-Z]\s*\(\s*x\s*\))\s*=/, '');
  }
  function tokenize(s) {
    var toks = [], i = 0, m;
    while (i < s.length) {
      var ch = s.charAt(i);
      if (/\s/.test(ch)) { i++; continue; }
      if (/[0-9.]/.test(ch)) {
        m = /^(?:\d+\.?\d*|\.\d+)/.exec(s.slice(i));
        if (!m) throw new Error('수를 읽을 수 없어요');
        toks.push({ t: 'num', v: parseFloat(m[0]) });
        i += m[0].length;
        continue;
      }
      if (/[a-zA-Z]/.test(ch)) {
        var rest = s.slice(i).toLowerCase(), hit = null;
        for (var k = 0; k < NAMES.length; k++) if (rest.indexOf(NAMES[k]) === 0) { hit = NAMES[k]; break; }
        if (!hit) throw new Error("'" + ch + "' 는 쓸 수 없어요 (변수는 x 하나)");
        if (FUNCS[hit]) toks.push({ t: 'fn', v: hit });
        else if (hit === 'x') toks.push({ t: 'x' });
        else toks.push({ t: 'num', v: hit === 'pi' ? PI : Math.E, c: true });   // 상수 π·e
        i += hit.length;
        continue;
      }
      if ('+-*/^()[]{}|'.indexOf(ch) >= 0) { toks.push({ t: ch }); i++; continue; }
      throw new Error("'" + ch + "' 기호는 쓸 수 없어요");
    }
    return toks;
  }
  function parseExpr(src) {
    var toks = tokenize(normExpr(src)), pos = 0, bars = 0;
    var CLOSE = { '(': ')', '[': ']', '{': '}' };
    function peek() { return toks[pos]; }
    function next() { return toks[pos++]; }
    function startsPrimary(k) {
      return !!k && (k.t === 'num' || k.t === 'x' || k.t === 'fn' || !!CLOSE[k.t] || (k.t === '|' && bars === 0));
    }
    function expr() {
      var node = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) {
        var op = next().t;
        node = { op: op, a: node, b: term() };
      }
      return node;
    }
    function term() {
      var node = unary();
      for (;;) {
        var k = peek();
        if (k && (k.t === '*' || k.t === '/')) { next(); node = { op: k.t, a: node, b: unary() }; }
        else if (startsPrimary(k)) {
          if (k.t === 'num' && !k.c && node.op === 'num' && !node.c) throw new Error('수 두 개가 붙어 있어요');
          node = { op: '*', a: node, b: power() };
        } else break;
      }
      return node;
    }
    function unary() {
      var k = peek();
      if (k && (k.t === '-' || k.t === '+')) {
        next();
        var u = unary();
        return k.t === '-' ? { op: 'neg', a: u } : u;
      }
      return power();
    }
    function power() {
      var base = primary();
      if (peek() && peek().t === '^') { next(); return { op: '^', a: base, b: unary() }; }
      return base;
    }
    function primary() {
      var k = next();
      if (!k) throw new Error('식이 덜 끝났어요');
      if (k.t === 'num') return { op: 'num', v: k.v, c: !!k.c };
      if (k.t === 'x') return { op: 'x' };
      if (k.t === 'fn') {
        var arg = peek() && CLOSE[peek().t] ? primary() : power();
        return { op: 'fn', f: k.v, a: arg };
      }
      if (CLOSE[k.t]) {
        var inner = expr(), c = next();
        if (!c || c.t !== CLOSE[k.t]) throw new Error('괄호가 닫히지 않았어요');
        return inner;
      }
      if (k.t === '|') {
        bars++;
        var body = expr();
        bars--;
        var e = next();
        if (!e || e.t !== '|') throw new Error('절댓값 | | 이 닫히지 않았어요');
        return { op: 'fn', f: 'abs', a: body };
      }
      throw new Error("'" + k.t + "' 자리가 이상해요");
    }
    if (!toks.length) throw new Error('식이 비어 있어요');
    var ast = expr();
    if (pos < toks.length) throw new Error("'" + toks[pos].t + "' 뒤를 읽을 수 없어요");
    return ast;
  }
  // 음수의 분수 거듭제곱: 홀수 제곱근이면 실수 값 (x^(1/3) 등)
  function powReal(b, e) {
    if (b >= 0 || Math.floor(e) === e) return Math.pow(b, e);
    for (var q = 1; q <= 9; q += 2) {
      var p = e * q, rp = Math.round(p);
      if (Math.abs(p - rp) < 1e-9) return (rp % 2 ? -1 : 1) * Math.pow(-b, e);
    }
    return NaN;
  }
  function evalAst(n, x) {
    switch (n.op) {
      case 'num': return n.v;
      case 'x': return x;
      case 'neg': return -evalAst(n.a, x);
      case '+': return evalAst(n.a, x) + evalAst(n.b, x);
      case '-': return evalAst(n.a, x) - evalAst(n.b, x);
      case '*': return evalAst(n.a, x) * evalAst(n.b, x);
      case '/': return evalAst(n.a, x) / evalAst(n.b, x);
      case '^': return powReal(evalAst(n.a, x), evalAst(n.b, x));
      case 'fn': return FUNCS[n.f](evalAst(n.a, x));
    }
    return NaN;
  }
  // 식 → (x) => 수.  못 읽으면 throw (메시지는 한국어)
  function compile(src) {
    var ast = parseExpr(src);
    return function (x) { var v = evalAst(ast, x); return typeof v === 'number' ? v : NaN; };
  }
  // 라벨용으로 식을 보기 좋게: x^2 → x², * 는 지우고 - 는 −
  function prettyExpr(s) {
    return String(s).replace(/\^\s*2(?![0-9.])/g, '²').replace(/\^\s*3(?![0-9.])/g, '³')
      .replace(/\s*\*\s*/g, '').replace(/-/g, '\u2212');
  }

  /* ───────────── 평면 기하 도구 (화면 좌표) ───────────── */

  // 선분 (x1,y1)-(x2,y2) 를 사각형 안으로 자른다 (Liang–Barsky). 밖이면 null
  function clipSeg(x1, y1, x2, y2, r) {
    var t0 = 0, t1 = 1, dx = x2 - x1, dy = y2 - y1;
    var p = [-dx, dx, -dy, dy], q = [x1 - r.x1, r.x2 - x1, y1 - r.y1, r.y2 - y1];
    for (var i = 0; i < 4; i++) {
      if (p[i] === 0) { if (q[i] < 0) return null; continue; }
      var t = q[i] / p[i];
      if (p[i] < 0) { if (t > t1) return null; if (t > t0) t0 = t; }
      else { if (t < t0) return null; if (t < t1) t1 = t; }
    }
    return [x1 + t0 * dx, y1 + t0 * dy, x1 + t1 * dx, y1 + t1 * dy];
  }
  // 선분에서 빈 원(holes: {x, y, r}) 안쪽 부분을 뺀 조각들 — 배경색 없이도 '속이 빈 원'이 되게
  function cutSeg(x1, y1, x2, y2, holes) {
    var parts = [[0, 1]], dx = x2 - x1, dy = y2 - y1, aa = dx * dx + dy * dy;
    if (!holes || !holes.length || aa === 0) return [[x1, y1, x2, y2]];
    holes.forEach(function (h) {
      var fx = x1 - h.x, fy = y1 - h.y, b = 2 * (fx * dx + fy * dy), c = fx * fx + fy * fy - h.r * h.r;
      var disc = b * b - 4 * aa * c;
      if (disc <= 0) return;
      var s = Math.sqrt(disc), ta = (-b - s) / (2 * aa), tb = (-b + s) / (2 * aa), next = [];
      parts.forEach(function (pp) {
        if (tb <= pp[0] || ta >= pp[1]) { next.push(pp); return; }
        if (ta > pp[0]) next.push([pp[0], ta]);
        if (tb < pp[1]) next.push([tb, pp[1]]);
      });
      parts = next;
    });
    return parts.filter(function (pp) { return pp[1] - pp[0] > 1e-6; }).map(function (pp) {
      return [x1 + pp[0] * dx, y1 + pp[0] * dy, x1 + pp[1] * dx, y1 + pp[1] * dy];
    });
  }
  function segsD(segs) {
    var d = '';
    segs.forEach(function (g) { d += 'M' + pt(g[0], g[1]) + 'L' + pt(g[2], g[3]); });
    return d;
  }
  function insidePoly(x, y, poly) {
    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  function unit(x, y) { var l = Math.sqrt(x * x + y * y) || 1; return [x / l, y / l]; }
  function dist(a, b) { return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])); }
  // 방향 (ux, uy) 로 글자 상자를 놓을 때, 상자 가운데가 기준점에서 떨어져야 할 거리
  function textReach(ux, uy, w, h) { return Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2; }
  // 글자를 기준점 (x, y) 에서 방향 u 로 gap 만큼 띄워 놓는다 → 상자 가운데
  function placeOut(x, y, u, s, size, gap) {
    var w = textWidth(s, size), h = size * 1.1, r = gap + textReach(u[0], u[1], w, h);
    return [x + u[0] * r, y + u[1] * r];
  }

  /* ───────────── 형식 검사 ─────────────
     fatal: 그릴 수 없는 오류(render 는 오류 그림), warn: 그릴 수는 있지만 고칠 것(모르는 칸·안 보이는 그래프).
     check() 는 둘 다 돌려준다. */
  var KEYS = {
    clock: ['h', 'm', 'showNumbers'],
    numberline: ['min', 'max', 'step', 'labelEvery', 'points', 'ranges', 'arrows', 'fractions'],
    fraction: ['shape', 'n', 'd', 'whole'],
    coord: ['xmin', 'xmax', 'ymin', 'ymax', 'grid', 'points', 'fns', 'segments'],
    polygon: ['points', 'labels', 'sides', 'angles', 'fill', 'segments'],
    circle: ['r', 'd', 'showCenter', 'showRadius', 'showDiameter', 'label'],
    angle: ['deg', 'label', 'showArc'],
    bars: ['labels', 'values', 'unit', 'title', 'horizontal', 'showValues'],
    line: ['labels', 'values', 'unit', 'title', 'showValues', 'fromZero'],
    pie: ['labels', 'values', 'title'],
    blocks: ['hundreds', 'tens', 'ones'],
    cuboid: ['w', 'h', 'd', 'labels'],
    svg: ['svg']
  };
  var TYPES = Object.keys(KEYS);

  function now(v) { return ' (지금: ' + show(v) + ')'; }
  function optBool(s, k, bad) { if (s[k] !== undefined && typeof s[k] !== 'boolean') bad(k + ' 는 true 또는 false 여야 해요' + now(s[k])); }
  function optText(s, k, bad) { if (s[k] !== undefined && s[k] !== null && !isText(s[k])) bad(k + ' 는 글자나 수여야 해요' + now(s[k])); }
  function isPair(v) { return Array.isArray(v) && v.length === 2 && isNum(v[0]) && isNum(v[1]); }
  function isEnd(v) { return isNum(v) || v === Infinity || v === -Infinity; }
  // 배열 칸의 항목마다 검사. fn(item, '이름[i]') → 오류 문구(들)
  function eachItem(s, key, bad, soft, allowed, max, fn) {
    var arr = s[key];
    if (arr === undefined) return;
    if (!Array.isArray(arr)) { bad(key + ' 는 배열이어야 해요' + now(arr)); return; }
    if (arr.length > max) { bad(key + ' 는 ' + max + '개까지예요 (지금 ' + arr.length + '개)'); return; }
    arr.forEach(function (it, i) {
      var at = key + '[' + i + ']';
      if (!isObj(it)) { bad(at + ' 는 { … } 꼴이어야 해요' + now(it)); return; }
      Object.keys(it).forEach(function (k) { if (allowed.indexOf(k) < 0) soft(at + " 에 모르는 칸 '" + k + "' 이 있어요 (쓸 수 있는 칸: " + allowed.join(', ') + ')'); });
      var r = fn(it, at);
      if (r) [].concat(r).forEach(bad);
    });
  }
  function textItem(v, at, k) {
    return v !== undefined && v !== null && !isText(v) ? at + ' 의 ' + k + ' 는 글자여야 해요' + now(v) : null;
  }
  function boolItem(v, at, k) {
    return v !== undefined && typeof v !== 'boolean' ? at + ' 의 ' + k + ' 는 true/false 여야 해요' + now(v) : null;
  }
  function compact(arr) { return arr.filter(function (v) { return !!v; }); }

  // 직접 그린 SVG 에서 막는 것: 스크립트·이벤트 속성·외부 주소(요청이 나가거나 화면을 바꿀 수 있는 것)
  var SVG_RULES = [
    [/<\s*script/i, '<script> 는 쓸 수 없어요'],
    [/[\s"'\/]on[a-z]+\s*=/i, 'on…= 속성(onclick·onload 등)은 쓸 수 없어요'],
    [/<\s*foreignObject/i, '<foreignObject> 는 쓸 수 없어요'],
    [/<\s*image\b/i, '<image> 는 쓸 수 없어요'],
    [/<\s*(img|iframe|embed|object|link|meta|style|a|audio|video|canvas|form|input|button|textarea|base)\b/i, '<$1> 태그는 쓸 수 없어요'],
    [/javascript\s*:/i, 'javascript: 는 쓸 수 없어요'],
    [/(?:xlink:)?href\s*=\s*(?:"(?!\s*#)|'(?!\s*#)|(?![\s"'#]))/i, 'href 는 그림 안(#…)만 가리킬 수 있어요 — 외부 주소 금지'],
    [/[\s"'\/]src\s*=/i, 'src 속성은 쓸 수 없어요'],
    [/url\(\s*(?:"(?!\s*#)|'(?!\s*#)|(?![\s"'#]))/i, 'url(…) 은 그림 안(#…)만 가리킬 수 있어요 — 외부 주소 금지'],
    [/@import/i, '@import 는 쓸 수 없어요'],
    [/<!\s*(?:DOCTYPE|ENTITY)/i, 'DOCTYPE·ENTITY 는 쓸 수 없어요'],
    [/attributeName\s*=\s*["']?\s*(?:xlink:)?href/i, 'href 를 바꾸는 애니메이션은 쓸 수 없어요']
  ];
  var SVG_MAX_BYTES = 20 * 1024;
  function utf8Len(s) {
    var n = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c < 0x80) n += 1;
      else if (c < 0x800) n += 2;
      else if (c >= 0xD800 && c <= 0xDBFF) { n += 4; i++; }
      else n += 3;
    }
    return n;
  }
  var ROOT_RE = /^\s*<svg\b([^>]*)>/i;
  function svgProblems(src) {
    var e = [];
    if (!/^\s*<svg[\s>]/i.test(src)) e.push('svg 는 <svg 로 시작해야 해요');
    else {
      var m = ROOT_RE.exec(src);
      if (!m || !/\bviewBox\s*=\s*["']\s*-?[\d.]+[\s,]+-?[\d.]+[\s,]+[\d.]+[\s,]+[\d.]+\s*["']/.test(m[1])) e.push('svg 의 맨 바깥 <svg> 에 viewBox="0 0 너비 높이" 가 있어야 해요');
      if (!/<\/svg>\s*$/i.test(src)) e.push('svg 는 </svg> 로 끝나야 해요');
    }
    var bytes = utf8Len(src);
    if (bytes > SVG_MAX_BYTES) e.push('svg 가 너무 커요: ' + Math.ceil(bytes / 1024) + 'KB (20KB 이하)');
    SVG_RULES.forEach(function (r) {
      var m2 = r[0].exec(src);
      if (m2) e.push(r[1].replace('$1', m2[1] || ''));
    });
    return e;
  }

  function chartCheck(s, bad, minLen) {
    var Ls = s.labels, Vs = s.values, ok = true;
    if (!Array.isArray(Ls) || !Ls.length) { bad('labels(항목 이름) 배열이 없어요' + now(Ls)); ok = false; }
    else if (!Ls.every(isText)) { bad('labels 의 항목은 글자여야 해요' + now(Ls)); ok = false; }
    if (!Array.isArray(Vs) || !Vs.length) { bad('values(값) 배열이 없어요' + now(Vs)); ok = false; }
    else if (!Vs.every(isNum)) { bad('values 의 항목은 모두 수여야 해요' + now(Vs)); ok = false; }
    if (ok && Ls.length !== Vs.length) { bad('labels(' + Ls.length + '개)와 values(' + Vs.length + '개)의 개수가 달라요'); ok = false; }
    if (ok && Ls.length > 24) { bad('항목이 너무 많아요 (24개 이하)'); ok = false; }
    if (ok && Ls.length < minLen) { bad('항목이 ' + minLen + '개 이상이어야 해요'); ok = false; }
    optText(s, 'title', bad);
    optText(s, 'unit', bad);
    return ok;
  }

  var CHECKS = {
    clock: function (s, bad) {
      if (!isInt(s.h) || s.h < 0 || s.h > 23) bad('h(시)는 0~23 사이의 정수여야 해요' + now(s.h));
      if (s.m !== undefined && (!isInt(s.m) || s.m < 0 || s.m > 59)) bad('m(분)은 0~59 사이의 정수여야 해요' + now(s.m));
      optBool(s, 'showNumbers', bad);
    },

    numberline: function (s, bad, soft) {
      var ok = true;
      if (!isNum(s.min)) { bad('min(왼쪽 끝 수)이 수가 아니에요' + now(s.min)); ok = false; }
      if (!isNum(s.max)) { bad('max(오른쪽 끝 수)가 수가 아니에요' + now(s.max)); ok = false; }
      if (ok && s.min >= s.max) { bad('min 은 max 보다 작아야 해요 (min ' + s.min + ', max ' + s.max + ')'); ok = false; }
      if (s.step !== undefined) {
        if (!isNum(s.step) || s.step <= 0) bad('step(눈금 간격)은 0보다 큰 수여야 해요' + now(s.step));
        else if (ok && (s.max - s.min) / s.step > 2000) bad('눈금이 너무 많아요 (2000칸 넘음) — step 을 크게 하세요');
      }
      if (s.labelEvery !== undefined && (!isInt(s.labelEvery) || s.labelEvery < 1)) bad('labelEvery 는 1 이상의 정수여야 해요' + now(s.labelEvery));
      optBool(s, 'fractions', bad);
      function out(v) { return ok && (v < s.min - 1e-9 || v > s.max + 1e-9); }
      var where = ok ? ' 수직선 범위(' + s.min + '~' + s.max + ') 밖이에요' : '';
      eachItem(s, 'points', bad, soft, ['x', 'label', 'open'], 50, function (p, at) {
        return compact([
          !isNum(p.x) ? at + ' 의 x 가 수가 아니에요' + now(p.x) : out(p.x) ? at + ' 의 x=' + p.x + ' 가' + where : null,
          textItem(p.label, at, 'label'), boolItem(p.open, at, 'open')
        ]);
      });
      eachItem(s, 'ranges', bad, soft, ['from', 'to', 'fromOpen', 'toOpen'], 6, function (r, at) {
        var e = [];
        if (!isEnd(r.from)) e.push(at + ' 의 from 이 수가 아니에요 (왼쪽 끝이 없으면 -Infinity)' + now(r.from));
        if (!isEnd(r.to)) e.push(at + ' 의 to 가 수가 아니에요 (오른쪽 끝이 없으면 Infinity)' + now(r.to));
        if (!e.length) {
          if (r.from >= r.to) e.push(at + ' 의 from 은 to 보다 작아야 해요 (from ' + r.from + ', to ' + r.to + ')');
          if (isNum(r.from) && out(r.from)) e.push(at + ' 의 from=' + r.from + ' 이' + where);
          if (isNum(r.to) && out(r.to)) e.push(at + ' 의 to=' + r.to + ' 가' + where);
        }
        return e.concat(compact([boolItem(r.fromOpen, at, 'fromOpen'), boolItem(r.toOpen, at, 'toOpen')]));
      });
      eachItem(s, 'arrows', bad, soft, ['from', 'to', 'label'], 20, function (a, at) {
        var e = [];
        if (!isNum(a.from)) e.push(at + ' 의 from 이 수가 아니에요' + now(a.from));
        else if (out(a.from)) e.push(at + ' 의 from=' + a.from + ' 이' + where);
        if (!isNum(a.to)) e.push(at + ' 의 to 가 수가 아니에요' + now(a.to));
        else if (out(a.to)) e.push(at + ' 의 to=' + a.to + ' 가' + where);
        if (isNum(a.from) && a.from === a.to) e.push(at + ' 의 from 과 to 가 같아요');
        return e.concat(compact([textItem(a.label, at, 'label')]));
      });
    },

    fraction: function (s, bad) {
      if (s.shape !== undefined && s.shape !== 'bar' && s.shape !== 'circle') bad("shape 는 'bar' 또는 'circle' 이어야 해요" + now(s.shape));
      var okD = isInt(s.d) && s.d >= 1 && s.d <= 60, okN = isInt(s.n) && s.n >= 0;
      if (!isInt(s.d) || s.d < 1) bad('d(전체 칸 수)는 1 이상의 정수여야 해요' + now(s.d));
      else if (s.d > 60) bad('d(전체 칸 수)가 너무 커요 (60 이하)' + now(s.d));
      if (!okN) bad('n(색칠한 칸 수)은 0 이상의 정수여야 해요' + now(s.n));
      if (s.whole !== undefined && (!isInt(s.whole) || s.whole < 1 || s.whole > 12)) bad('whole(모형 수)은 1~12 사이의 정수여야 해요' + now(s.whole));
      if (okD && okN && Math.ceil(s.n / s.d) > 12) bad('n 이 너무 커요 — 모형이 12개를 넘어요 (n ≤ d×12)');
    },

    coord: function (s, bad, soft) {
      ['xmin', 'xmax', 'ymin', 'ymax'].forEach(function (k) { if (s[k] !== undefined && !isNum(s[k])) bad(k + ' 는 수여야 해요' + now(s[k])); });
      var x0 = num(s.xmin, -5), x1 = num(s.xmax, 5), y0 = num(s.ymin, -5), y1 = num(s.ymax, 5), ok = true;
      if (x0 >= x1) { bad('xmin 은 xmax 보다 작아야 해요 (xmin ' + x0 + ', xmax ' + x1 + ')'); ok = false; }
      if (y0 >= y1) { bad('ymin 은 ymax 보다 작아야 해요 (ymin ' + y0 + ', ymax ' + y1 + ')'); ok = false; }
      if (ok && ((x1 - x0) / (y1 - y0) > 1e4 || (y1 - y0) / (x1 - x0) > 1e4)) { bad('가로·세로 범위 차이가 너무 커요'); ok = false; }
      optBool(s, 'grid', bad);
      eachItem(s, 'points', bad, soft, ['x', 'y', 'label', 'open'], 50, function (p, at) {
        return compact([
          !isNum(p.x) ? at + ' 의 x 가 수가 아니에요' + now(p.x) : null,
          !isNum(p.y) ? at + ' 의 y 가 수가 아니에요' + now(p.y) : null,
          ok && isNum(p.x) && isNum(p.y) && (p.x < x0 || p.x > x1 || p.y < y0 || p.y > y1) ? at + ' (' + p.x + ', ' + p.y + ') 이 그림 범위 밖이에요' : null,
          textItem(p.label, at, 'label'), boolItem(p.open, at, 'open')
        ]);
      });
      eachItem(s, 'fns', bad, soft, ['expr', 'from', 'to', 'label'], 8, function (f, at) {
        var e = [], fn = null;
        if (typeof f.expr !== 'string' || !f.expr.trim()) e.push(at + ' 의 expr(식)이 없어요' + now(f.expr));
        else {
          try { fn = compile(f.expr); } catch (err) { e.push(at + " 의 식 '" + f.expr + "' 을 읽을 수 없어요: " + err.message); }
        }
        if (f.from !== undefined && !isNum(f.from)) e.push(at + ' 의 from 은 수여야 해요' + now(f.from));
        if (f.to !== undefined && !isNum(f.to)) e.push(at + ' 의 to 는 수여야 해요' + now(f.to));
        if (isNum(f.from) && isNum(f.to) && f.from >= f.to) e.push(at + ' 의 from 은 to 보다 작아야 해요');
        var lt = textItem(f.label, at, 'label');
        if (lt) e.push(lt);
        if (fn && ok && !e.length) {
          var a = Math.max(x0, num(f.from, x0)), b = Math.min(x1, num(f.to, x1)), seen = false;
          for (var i = 0; i <= 200 && a < b && !seen; i++) {
            var y = fn(a + (b - a) * i / 200);
            if (isFinite(y) && y >= y0 && y <= y1) seen = true;
          }
          if (!seen) soft(at + " 의 그래프 '" + f.expr + "' 가 그림 범위 안에 보이지 않아요");
        }
        return e;
      });
      eachItem(s, 'segments', bad, soft, ['from', 'to', 'dashed'], 30, function (g, at) {
        return compact([
          !isPair(g.from) ? at + ' 의 from 은 [x, y] 여야 해요' + now(g.from) : null,
          !isPair(g.to) ? at + ' 의 to 는 [x, y] 여야 해요' + now(g.to) : null,
          boolItem(g.dashed, at, 'dashed')
        ]);
      });
    },

    polygon: function (s, bad, soft) {
      var n = 0, P0 = s.points;
      if (!Array.isArray(P0) || P0.length < 3) bad('points 는 꼭짓점 좌표 [[x, y], …] 3개 이상이어야 해요' + now(P0));
      else if (P0.length > 20) bad('꼭짓점이 너무 많아요 (20개 이하)');
      else if (!P0.every(isPair)) bad('points 의 항목은 [x, y] (수 두 개)여야 해요' + now(P0));
      else {
        n = P0.length;
        var a2 = 0, xs = P0.map(function (q) { return q[0]; }), ys = P0.map(function (q) { return q[1]; });
        var diag = Math.max.apply(null, xs) - Math.min.apply(null, xs) + Math.max.apply(null, ys) - Math.min.apply(null, ys);
        for (var i = 0; i < n; i++) { var p = P0[i], q2 = P0[(i + 1) % n]; a2 += p[0] * q2[1] - q2[0] * p[1]; }
        if (!(diag > 0) || Math.abs(a2) < 1e-9 * diag * diag) bad('꼭짓점이 한 줄 위에 있어서 다각형이 되지 않아요');
      }
      ['labels', 'sides'].forEach(function (k) {
        var v = s[k];
        if (v === undefined) return;
        if (!Array.isArray(v)) { bad(k + ' 는 배열이어야 해요 (예: ' + (k === 'labels' ? "['A', 'B', 'C']" : "['5cm', null, '3cm']") + ')' + now(v)); return; }
        if (n && v.length !== n) bad(k + ' 의 개수(' + v.length + ')가 꼭짓점 수(' + n + ')와 달라요');
        v.forEach(function (t, i) { if (t !== null && t !== undefined && !isText(t)) bad(k + '[' + i + '] 는 글자나 null 이어야 해요' + now(t)); });
      });
      eachItem(s, 'angles', bad, soft, ['at', 'label', 'right'], 20, function (a, at) {
        return compact([
          !isInt(a.at) || a.at < 0 || (n && a.at >= n) ? at + ' 의 at 은 꼭짓점 번호(0~' + (n ? n - 1 : 'n-1') + ')여야 해요' + now(a.at) : null,
          textItem(a.label, at, 'label'), boolItem(a.right, at, 'right')
        ]);
      });
      if (s.fill !== undefined && typeof s.fill !== 'boolean' && [1, 2, 3, 4].indexOf(s.fill) < 0) bad('fill 은 true/false 또는 색 번호 1~4 여야 해요' + now(s.fill));
      eachItem(s, 'segments', bad, soft, ['from', 'to', 'dashed', 'label', 'right'], 20, function (g, at) {
        return compact([
          !isPair(g.from) ? at + ' 의 from 은 [x, y] 여야 해요' + now(g.from) : null,
          !isPair(g.to) ? at + ' 의 to 는 [x, y] 여야 해요' + now(g.to) : null,
          boolItem(g.dashed, at, 'dashed'), boolItem(g.right, at, 'right'), textItem(g.label, at, 'label')
        ]);
      });
    },

    circle: function (s, bad) {
      optText(s, 'r', bad);
      optText(s, 'd', bad);
      optText(s, 'label', bad);
      ['showCenter', 'showRadius', 'showDiameter'].forEach(function (k) { optBool(s, k, bad); });
    },

    angle: function (s, bad) {
      if (!isNum(s.deg) || s.deg < 0 || s.deg > 360) bad('deg(각도)는 0~360 사이의 수여야 해요' + now(s.deg));
      optText(s, 'label', bad);
      optBool(s, 'showArc', bad);
    },

    bars: function (s, bad) {
      chartCheck(s, bad, 1);
      optBool(s, 'horizontal', bad);
      optBool(s, 'showValues', bad);
    },

    line: function (s, bad) {
      chartCheck(s, bad, 2);
      optBool(s, 'showValues', bad);
      optBool(s, 'fromZero', bad);
    },

    pie: function (s, bad) {
      if (!chartCheck(s, bad, 1)) return;
      if (s.values.some(function (v) { return v < 0; })) bad('원그래프의 values 는 0 이상이어야 해요' + now(s.values));
      else if (!(sum(s.values) > 0)) bad('원그래프의 values 합이 0이에요');
    },

    blocks: function (s, bad) {
      var any = false, err = false, lim = { hundreds: 20, tens: 40, ones: 40 };
      var names = { hundreds: '백 모형', tens: '십 모형', ones: '일 모형' };
      ['hundreds', 'tens', 'ones'].forEach(function (k) {
        if (s[k] === undefined) return;
        if (!isInt(s[k]) || s[k] < 0 || s[k] > lim[k]) { bad(k + '(' + names[k] + ' 수)는 0~' + lim[k] + ' 사이의 정수여야 해요' + now(s[k])); err = true; }
        else if (s[k] > 0) any = true;
      });
      if (!any && !err) bad('수 모형이 하나도 없어요 (hundreds·tens·ones 중 하나는 1 이상)');
    },

    cuboid: function (s, bad, soft) {
      var ok = true;
      ['w', 'h', 'd'].forEach(function (k) {
        if (!isNum(s[k]) || s[k] <= 0) { bad(k + ' 는 0보다 큰 수여야 해요' + now(s[k])); ok = false; }
      });
      if (ok && Math.max(s.w, s.h, s.d) / Math.min(s.w, s.h, s.d) > 20) bad('세 길이의 차이가 너무 커요 (20배 이하)');
      if (s.labels !== undefined) {
        if (!isObj(s.labels)) bad("labels 는 { w: '5cm', h: '3cm', d: '4cm' } 꼴이어야 해요" + now(s.labels));
        else Object.keys(s.labels).forEach(function (k) {
          if (['w', 'h', 'd'].indexOf(k) < 0) soft("labels 에 모르는 칸 '" + k + "' 이 있어요 (w, h, d)");
          else if (s.labels[k] !== null && !isText(s.labels[k])) bad('labels.' + k + ' 는 글자여야 해요' + now(s.labels[k]));
        });
      }
    },

    svg: function (s, bad, soft) {
      if (typeof s.svg !== 'string' || !s.svg.trim()) { bad('svg(그림 글)가 없어요' + now(s.svg)); return; }
      var probs = svgProblems(s.svg);
      probs.forEach(bad);
      // 화면은 viewBox 1단위를 약 1px 로 보여 준다(app.js 가 viewBox 너비를 max-width 로 쓴다) → 너무 작거나 크면 알려 준다
      var z = probs.length ? null : size(s.svg);
      if (z && (z.w < 120 || z.w > 640)) soft('svg 의 viewBox 너비가 ' + z.w + ' 이에요 — 화면에서 1단위가 약 1px 로 보이니 너비 200~480 으로 그려 주세요');
    }
  };

  function validate(spec) {
    var fatal = [], warn = [];
    if (!isObj(spec)) { fatal.push('그림 정보는 { type: … } 꼴의 객체여야 해요' + now(spec)); return { fatal: fatal, warn: warn }; }
    var type = spec.type;
    if (typeof type !== 'string' || !type) { fatal.push('type(그림 종류)이 없어요' + now(type)); return { fatal: fatal, warn: warn }; }
    if (!hasOwn(KEYS, type)) {
      fatal.push("모르는 그림 종류예요: '" + type + "' (쓸 수 있는 것: " + TYPES.join(', ') + ')');
      return { fatal: fatal, warn: warn };
    }
    var pre = type + ': ';
    function bad(m) { fatal.push(pre + m); }
    function soft(m) { warn.push(pre + m); }
    if (spec.alt !== undefined && typeof spec.alt !== 'string') bad('alt(그림 설명)는 글자여야 해요' + now(spec.alt));
    Object.keys(spec).forEach(function (k) {
      if (k !== 'type' && k !== 'alt' && KEYS[type].indexOf(k) < 0) soft("모르는 칸 '" + k + "' 이 있어요 (쓸 수 있는 칸: " + KEYS[type].join(', ') + ')');
    });
    CHECKS[type](spec, bad, soft);
    return { fatal: fatal, warn: warn };
  }

  function check(spec) {
    try {
      var r = validate(spec);
      return r.fatal.concat(r.warn);
    } catch (e) {
      return ['그림 정보를 검사하다 문제가 생겼어요: ' + (e && e.message)];
    }
  }

  /* ───────────── 그리기: 시계 ───────────── */
  function drawClock(s) {
    var h = s.h, m = isInt(s.m) ? s.m : 0, cx = 120, cy = 120, Rr = 108, o = [];
    o.push(C(cx, cy, Rr, { fill: 'cur', fo: 0.04, stroke: 'cur', w: 3, cls: 'fig-face' }));
    // 분 눈금 60개: 5분마다 굵고 길게 (가는 눈금 48개 + 굵은 눈금 12개를 각각 한 path 로)
    var minor = '', major = '';
    for (var i = 0; i < 60; i++) {
      var a = i * PI / 30, big = i % 5 === 0, r1 = Rr - 5, r2 = Rr - (big ? 15 : 10);
      var seg = 'M' + pt(cx + r1 * Math.sin(a), cy - r1 * Math.cos(a)) + 'L' + pt(cx + r2 * Math.sin(a), cy - r2 * Math.cos(a));
      if (big) major += seg; else minor += seg;
    }
    o.push(P(minor, { fill: 'none', stroke: 'cur', w: 1.3, cls: 'fig-tick' }));
    o.push(P(major, { fill: 'none', stroke: 'cur', w: 3, cap: 'round', cls: 'fig-tick fig-tick-major' }));
    if (s.showNumbers !== false) {
      for (var k = 1; k <= 12; k++) {
        var b = k * PI / 6, rn = Rr - 31;
        o.push(T(cx + rn * Math.sin(b), cy - rn * Math.cos(b), String(k), { size: 20, cls: 'fig-num' }));
      }
    }
    // 시침은 분에 따라 움직인다(3시 30분 → 3과 4 사이). 분침이 더 길다.
    var ha = ((h % 12) + m / 60) * PI / 6, ma = m * PI / 30, hl = Rr * 0.5, ml = Rr * 0.8;
    o.push(L(cx - 10 * Math.sin(ha), cy + 10 * Math.cos(ha), cx + hl * Math.sin(ha), cy - hl * Math.cos(ha),
      { stroke: 'cur', w: 7, cap: 'round', cls: 'fig-hour' }));
    o.push(L(cx - 14 * Math.sin(ma), cy + 14 * Math.cos(ma), cx + ml * Math.sin(ma), cy - ml * Math.cos(ma),
      { stroke: COLORS[0], w: 3.5, cap: 'round', cls: 'fig-minute' }));
    o.push(C(cx, cy, 5.5, { fill: 'cur' }));
    return { vb: '0 0 240 240', body: o.join('') };
  }

  /* ───────────── 그리기: 수직선 ─────────────
     축은 y=0. 위로 점 이름·뛰어 세기 화살표·범위(층마다 하나), 아래로 눈금 수. 끝으로 감싸는 상자에 맞춘다. */
  function drawNumberline(s) {
    var min = s.min, max = s.max, span = max - min;
    var step = isNum(s.step) && s.step > 0 ? s.step : niceStep(span / 10);
    var points = s.points || [], ranges = s.ranges || [], arrows = s.arrows || [];
    var FS = 13, W = 480, EXT = 18, RD = 5.5;
    var pen = new Pen(true), o = pen.out, box = pen.box;

    var ticks = [], nT = Math.floor(span / step + 1e-9);
    for (var i = 0; i <= nT; i++) ticks.push(clean(min + i * step));
    // 눈금 글자: 보통은 수, fractions:true 이고 step 이 1/k 꼴이면 분수(k 를 분모로, 약분하지 않음)
    var fmt = axisFormat(ticks), fracDen = 0;
    if (s.fractions === true) {
      var kk = Math.round(1 / step);
      if (kk >= 2 && kk <= 100 && Math.abs(kk * step - 1) < 1e-6) fracDen = kk;
    }
    var labs = ticks.map(function (v) {
      if (!fracDen) return { t: fmt(v) };
      var nn = Math.round(v * fracDen);
      return nn % fracDen === 0 ? { t: fmt(nn / fracDen) } : { n: nn, d: fracDen };
    });
    function labW(l) {
      return l.t !== undefined ? textWidth(l.t, FS) : Math.max(textWidth(String(Math.abs(l.n)), FS), textWidth(String(l.d), FS)) + 4 + (l.n < 0 ? 10 : 0);
    }
    var maxLab = 0;
    labs.forEach(function (l) { maxLab = Math.max(maxLab, labW(l)); });
    var leftArrow = min < 0;
    var padL = Math.max(leftArrow ? EXT + 8 : 16, labW(labs[0]) / 2 + 4);
    var padR = Math.max(EXT + 8, labW(labs[labs.length - 1]) / 2 + 4);
    var x0 = padL, x1 = W - padR, kx = (x1 - x0) / span;
    function X(v) { return x0 + (v - min) * kx; }

    // 눈금이 촘촘하면 일부만, 글자는 겹치지 않을 만큼 건너뛴다 (가능하면 0 에 맞춘 배수 자리)
    var tickPx = step * kx, zeroAligned = Math.abs(min / step - Math.round(min / step)) < 1e-6;
    function every(idx, m) {
      if (m <= 1) return true;
      if (zeroAligned) { var q = ticks[idx] / (m * step); return Math.abs(q - Math.round(q)) < 1e-6; }
      return idx % m === 0;
    }
    var tickEvery = 1;
    while (tickPx * tickEvery < 5) tickEvery = nextNice(tickEvery);
    var base = isInt(s.labelEvery) && s.labelEvery > 0 ? s.labelEvery : 1, mult = 1, le = base;
    while ((le * tickPx < maxLab + 8 || le % tickEvery !== 0) && le < 1e7) { mult = nextNice(mult); le = base * mult; }

    // 속이 빈 원 자리: 축·눈금을 그 안에 그리지 않는다
    var holes = [], dots = [];
    function addDot(x, open, color) {
      dots.push({ x: x, open: open, color: color });
      if (open) holes.push({ x: x, y: 0, r: RD });
    }
    points.forEach(function (p) { addDot(X(p.x), !!p.open, 'cur'); });
    ranges.forEach(function (r, j) {
      if (isFinite(r.from)) addDot(X(r.from), !!r.fromOpen, col(j));
      if (isFinite(r.to)) addDot(X(r.to), !!r.toOpen, col(j));
    });
    function inHole(x) { return holes.some(function (hh) { return Math.abs(hh.x - x) < RD; }); }

    // 위쪽 층 높이
    var hasPtLabel = points.some(function (p) { return p.label !== undefined && p.label !== null && p.label !== ''; });
    var arcs = [], arcTop = 0;
    arrows.forEach(function (a) {
      var lo = Math.min(a.from, a.to), hi = Math.max(a.from, a.to), level = 0;
      arcs.forEach(function (b) { if (lo < b.hi - 1e-9 && hi > b.lo + 1e-9) level = Math.max(level, b.level + 1); });
      var hgt = clamp(Math.abs(X(a.to) - X(a.from)) * 0.3, 14, 34) + level * 22;
      arcs.push({ a: a, lo: lo, hi: hi, level: level, h: hgt });
      var hasLab = a.label !== undefined && a.label !== null && a.label !== '';
      arcTop = Math.max(arcTop, hgt + (hasLab ? 22 : 8));
    });
    var rangeBase = -24 - (hasPtLabel ? 12 : 0) - arcTop;

    var axL = x0 - (leftArrow ? EXT : 12), axR = x1 + EXT;
    box.add(axL, 0, 6).add(axR, 0, 6);

    // 눈금과 눈금 수
    var tickD = '';
    ticks.forEach(function (v, idx) {
      if (!every(idx, tickEvery)) return;
      var x = X(v), lab = every(idx, le), len = lab ? 7 : 5;
      if (!inHole(x)) tickD += 'M' + pt(x, -len) + 'L' + pt(x, len);
      if (!lab) return;
      var l = labs[idx];
      if (l.t !== undefined) { pen.text(x, fracDen ? 26 : 20, l.t, { size: FS, cls: 'fig-tick-label' }); return; }   // 분수 눈금이면 분수 가로선 높이에 맞춘다
      // 분수 글자: 분자 / 가로선 / 분모 (음수면 앞에 빼기 기호)
      var fw = Math.max(textWidth(String(Math.abs(l.n)), FS), textWidth(String(l.d), FS)) + 4, cy = 26;
      o.push('<g class="fig-tick-label fig-frac">' + T(x, cy - FS * 0.66, String(Math.abs(l.n)), { size: FS }) +
        L(x - fw / 2, cy, x + fw / 2, cy, { stroke: 'cur', w: 1.1 }) + T(x, cy + FS * 0.7, String(l.d), { size: FS }) +
        (l.n < 0 ? T(x - fw / 2 - 1, cy, '−', { size: FS, anchor: 'end' }) : '') + '</g>');
      box.add(x - fw / 2 - (l.n < 0 ? 10 : 0), cy - FS * 1.3).add(x + fw / 2, cy + FS * 1.35);
    });
    if (tickD) o.push(P(tickD, { fill: 'none', stroke: 'cur', w: 1.4, cls: 'fig-tick' }));
    // 축 (빈 원 자리는 끊는다)
    o.push(P(segsD(cutSeg(axL + (leftArrow ? 5 : 0), 0, axR - 5, 0, holes)), { fill: 'none', stroke: 'cur', w: 1.6, cls: 'fig-axis' }));
    o.push(arrowHead(axR, 0, 0, 9));
    if (leftArrow) o.push(arrowHead(axL, 0, PI, 9));

    // 범위: 축 위 원에서 위로 올라가 옆으로 (층마다 하나). 끝이 없으면 화살표
    ranges.forEach(function (r, j) {
      var c = col(j), yl = rangeBase - j * 16, fa = isFinite(r.from), fb = isFinite(r.to);
      var xa = fa ? X(r.from) : axL, xb = fb ? X(r.to) : axR, d = '';
      d += fa ? 'M' + pt(xa, -RD - 1) + 'L' + pt(xa, yl) : 'M' + pt(xa + 6, yl);
      d += 'L' + pt(fb ? xb : xb - 6, yl);
      if (fb) d += 'L' + pt(xb, -RD - 1);
      o.push(P(d, { fill: 'none', stroke: c, w: 2.6, join: 'round', cap: 'round', cls: 'fig-range' }));
      if (!fa) o.push(arrowHead(xa, yl, PI, 10, c));
      if (!fb) o.push(arrowHead(xb, yl, 0, 10, c));
      box.add(xa, yl, 6).add(xb, yl, 6);
    });

    // 뛰어 세기 화살표: 눈금 위의 호
    arcs.forEach(function (c) {
      var xa = X(c.a.from), xb = X(c.a.to), yb = -4, mx = (xa + xb) / 2, cy = yb - 2 * c.h;
      o.push(P('M' + pt(xa, yb) + 'Q' + pt(mx, cy) + ' ' + pt(xb, yb), { fill: 'none', stroke: COLORS[0], w: 1.8, cls: 'fig-jump' }));
      o.push(arrowHead(xb, yb, Math.atan2(yb - cy, xb - mx), 8, COLORS[0]));
      box.add(mx, yb - c.h, 2);
      var lab = c.a.label;
      if (lab !== undefined && lab !== null && lab !== '') pen.text(mx, yb - c.h - 10, labelText(lab), { size: FS, cls: 'fig-jump-label' });
    });

    // 점(닫힌 원 ●·열린 원 ○)과 이름
    dots.forEach(function (d) {
      o.push(d.open ? C(d.x, 0, RD, { fill: 'none', stroke: d.color, w: 2, cls: 'fig-dot fig-open' })
        : C(d.x, 0, RD, { fill: d.color, stroke: d.color, w: 1, cls: 'fig-dot' }));
    });
    points.forEach(function (p) {
      if (p.label !== undefined && p.label !== null && p.label !== '') pen.text(X(p.x), -18, labelText(p.label), { size: 14, cls: 'fig-pt-label' });
    });

    var vx1 = Math.min(0, box.x1 - 4), vx2 = Math.max(W, box.x2 + 4), vy1 = box.y1 - 6, vy2 = box.y2 + 6;
    return { vb: [rd(vx1), rd(vy1), rd(vx2 - vx1), rd(vy2 - vy1)].join(' '), body: pen.svg() };
  }

  /* ───────────── 그리기: 분수 모형 ─────────────
     d 칸 중 앞에서부터 n 칸 색칠. n > d 면 모형을 필요한 만큼(가분수·대분수) 나란히. */
  function sectorD(cx, cy, r, a0, a1) {    // 12시 방향에서 시계 방향으로 잰 각(라디안)
    return 'M' + pt(cx, cy) + 'L' + pt(cx + r * Math.sin(a0), cy - r * Math.cos(a0)) +
      'A' + rd(r) + ' ' + rd(r) + ' 0 ' + (a1 - a0 > PI ? 1 : 0) + ' 1 ' + pt(cx + r * Math.sin(a1), cy - r * Math.cos(a1)) + 'Z';
  }
  function drawFraction(s) {
    var d = s.d, n = s.n, shape = s.shape === 'circle' ? 'circle' : 'bar';
    var wholes = Math.max(isInt(s.whole) ? s.whole : 1, Math.ceil(n / d), 1);
    var o = [], k = 0, W, H;
    var on = { fill: COLORS[0], fo: 0.45, stroke: 'cur', w: 1.4, cls: 'fig-cell fig-on' };
    var off = { fill: 'none', stroke: 'cur', w: 1.4, cls: 'fig-cell' };
    var perRow, rows, j;
    if (shape === 'bar') {
      perRow = wholes <= 3 ? wholes : wholes === 4 ? 2 : 3;
      rows = Math.ceil(wholes / perRow);
      var gap = 18, bw = Math.min(300, (456 - (perRow - 1) * gap) / perRow), bh = 46, cw = bw / d;
      for (var w = 0; w < wholes; w++) {
        var bx = 12 + (w % perRow) * (bw + gap), by = 12 + Math.floor(w / perRow) * (bh + 16);
        for (j = 0; j < d; j++, k++) o.push(R(bx + j * cw, by, cw, bh, k < n ? on : off));
        o.push(R(bx, by, bw, bh, { fill: 'none', stroke: 'cur', w: 2.2, cls: 'fig-whole' }));
      }
      W = 24 + perRow * bw + (perRow - 1) * gap;
      H = 24 + rows * bh + (rows - 1) * 16;
    } else {
      perRow = wholes <= 4 ? wholes : Math.ceil(wholes / 2);
      rows = Math.ceil(wholes / perRow);
      var r = wholes === 1 ? 72 : wholes <= 3 ? 62 : 50, g2 = 20;
      for (var c = 0; c < wholes; c++) {
        var cx = 12 + r + (c % perRow) * (2 * r + g2), cy = 12 + r + Math.floor(c / perRow) * (2 * r + g2);
        if (d === 1) { o.push(C(cx, cy, r, k < n ? on : off)); k++; }
        else for (j = 0; j < d; j++, k++) o.push(P(sectorD(cx, cy, r, j * 2 * PI / d, (j + 1) * 2 * PI / d), k < n ? on : off));
        o.push(C(cx, cy, r, { fill: 'none', stroke: 'cur', w: 2.2, cls: 'fig-whole' }));
      }
      W = 24 + perRow * 2 * r + (perRow - 1) * g2;
      H = 24 + rows * 2 * r + (rows - 1) * g2;
    }
    return { vb: '0 0 ' + rd(W) + ' ' + rd(H), body: o.join('') };
  }

  /* ───────────── 그리기: 좌표평면 ───────────── */

  // 함수 값을 촘촘히(300점) 얻어 이어진 조각(run)들로 나눈다.
  // 정의역 끝(√ 등)은 반으로 나누어 찾아 끝점까지 잇고, 점근선(분모 0 근처 큰 점프)에서는 끊는다.
  function sampleFn(fn, a, b, ry) {
    var N = 300, runs = [], cur = null, prevX = a;
    function val(x) { var y = fn(x); return isFinite(y) ? y : NaN; }
    function edge(xOk, xBad) {
      for (var t = 0; t < 40; t++) { var m = (xOk + xBad) / 2; if (isFinite(val(m))) xOk = m; else xBad = m; }
      return xOk;
    }
    for (var i = 0; i <= N; i++) {
      var x = a + (b - a) * i / N, y = val(x);
      if (isFinite(y)) {
        if (!cur) {
          cur = [];
          runs.push(cur);
          if (i > 0) { var ex = edge(x, prevX); if (ex < x) cur.push([ex, val(ex)]); }
        } else {
          var last = cur[cur.length - 1], dy = Math.abs(y - last[1]);
          if (dy > ry * 0.5) {
            var my = val((last[0] + x) / 2), lo = Math.min(last[1], y), hi = Math.max(last[1], y);
            if (!isFinite(my) || my < lo - dy * 0.1 || my > hi + dy * 0.1) { cur = []; runs.push(cur); }
          }
        }
        cur.push([x, y]);
      } else if (cur) {
        var ex2 = edge(prevX, x);
        if (ex2 > prevX) cur.push([ex2, val(ex2)]);
        cur = null;
      }
      prevX = x;
    }
    return runs.filter(function (r) { return r.length > 1; });
  }

  function drawCoord(s) {
    var x0 = num(s.xmin, -5), x1 = num(s.xmax, 5), y0 = num(s.ymin, -5), y1 = num(s.ymax, 5);
    // 가로·세로 단위 길이를 같게 (너무 길쭉해지면 비율만 제한)
    var rx = x1 - x0, ry = y1 - y0, ratio = clamp(rx / ry, 0.625, 1.6), S = 300;
    var pw = ratio >= 1 ? S : S * ratio, ph = ratio >= 1 ? S / ratio : S, sx = pw / rx, sy = ph / ry;
    function X(x) { return (x - x0) * sx; }
    function Y(y) { return (y1 - y) * sy; }
    var pen = new Pen(), o = pen.out, box = pen.box, FS = 12, EXT = 16;
    var plot = { x1: 0, y1: 0, x2: pw, y2: ph };
    box.rect(plot);

    function gridStep(range, scale) {
      var st = niceStep(Math.max(range / 20, 12 / scale));
      return st < 1 && range >= 4 ? 1 : st;
    }
    function vals(a, b, st) {
      var out = [];
      for (var i = Math.ceil(a / st - 1e-9); i <= Math.floor(b / st + 1e-9); i++) out.push(clean(i * st));
      return out;
    }
    function onStep(v, st) { var q = v / st; return Math.abs(q - Math.round(q)) < 1e-6; }
    function labelStep(st, scale, need) { var m = 1; while (st * m * scale < need && m < 1e7) m = nextNice(m); return clean(st * m); }
    var gx = gridStep(rx, sx), gy = gridStep(ry, sy), xs = vals(x0, x1, gx), ys = vals(y0, y1, gy);

    // 축 자리: 0 이 범위 안이면 0, 아니면 가장자리
    var hasX0 = x0 <= 0 && 0 <= x1, hasY0 = y0 <= 0 && 0 <= y1, origin = hasX0 && hasY0;
    var axY = hasY0 ? Y(0) : (y0 > 0 ? ph : 0), axX = hasX0 ? X(0) : (x0 > 0 ? 0 : pw);
    var pts = s.points || [];
    var holes = pts.filter(function (p) { return p.open; }).map(function (p) { return { x: X(p.x), y: Y(p.y), r: 4.2 }; });

    // 글자는 맨 위에 그리려고 따로 모은다. occupied: 놓인 글자·점 상자, obst: 피할 점(곡선·선분·축 위)
    var texts = [], occupied = [], obst = [], curveObst = [];
    function addText(x, y, str, op) {
      op = op || {};
      op.halo = true;
      var r = textRect(x, y, str, op.size || 14, op.anchor);
      texts.push(T(x, y, str, op));
      box.rect(r);
      occupied.push(r);
      return r;
    }
    function sampleLine(list, ax, ay, bx, by) {
      var n = Math.max(1, Math.ceil(Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)) / 5));
      for (var i = 0; i <= n; i++) list.push([ax + (bx - ax) * i / n, ay + (by - ay) * i / n]);
    }
    function hits(r, list) {
      var c = 0;
      list.forEach(function (q) { if (q[0] > r.x1 - 2 && q[0] < r.x2 + 2 && q[1] > r.y1 - 2 && q[1] < r.y2 + 2) c++; });
      return c;
    }

    if (s.grid !== false) {
      var gd = [];
      xs.forEach(function (v) { var x = X(v); if (Math.abs(x - axX) > 0.5) gd = gd.concat(cutSeg(x, 0, x, ph, holes)); });
      ys.forEach(function (v) { var y = Y(v); if (Math.abs(y - axY) > 0.5) gd = gd.concat(cutSeg(0, y, pw, y, holes)); });
      if (gd.length) o.push(P(segsD(gd), { fill: 'none', stroke: 'cur', so: 0.18, w: 1, cls: 'fig-grid' }));
    }

    (s.segments || []).forEach(function (g) {
      var c = clipSeg(X(g.from[0]), Y(g.from[1]), X(g.to[0]), Y(g.to[1]), plot);
      if (!c) return;
      o.push(P(segsD(cutSeg(c[0], c[1], c[2], c[3], holes)), {
        fill: 'none', stroke: 'cur', w: g.dashed ? 1.3 : 1.8, dash: g.dashed ? '5 4' : null, cap: g.dashed ? null : 'round', cls: 'fig-seg'
      }));
      sampleLine(curveObst, c[0], c[1], c[2], c[3]);
    });

    // 축과 화살표
    o.push(P(segsD(cutSeg(-6, axY, pw + EXT - 5, axY, holes)), { fill: 'none', stroke: 'cur', w: 1.5, cls: 'fig-axis' }));
    o.push(arrowHead(pw + EXT, axY, 0, 9));
    o.push(P(segsD(cutSeg(axX, ph + 6, axX, -EXT + 5, holes)), { fill: 'none', stroke: 'cur', w: 1.5, cls: 'fig-axis' }));
    o.push(arrowHead(axX, -EXT, -PI / 2, 9));
    box.add(pw + EXT, axY, 5).add(axX, -EXT, 5).add(-6, axY).add(axX, ph + 6);
    sampleLine(obst, 0, axY, pw, axY);
    sampleLine(obst, axX, 0, axX, ph);

    // 그래프 (그리기는 눈금 뒤, 글자 앞)
    var curves = [], curveSvg = [];
    (s.fns || []).forEach(function (f, i) {
      var fn = compile(f.expr), a = Math.max(x0, num(f.from, x0)), b = Math.min(x1, num(f.to, x1));
      if (!(a < b)) return;
      var d = '', vis = [], lastKey = '';
      sampleFn(fn, a, b, ry).forEach(function (run) {
        var down = false, lx = 0, ly = 0;
        for (var j = 1; j < run.length; j++) {
          var c = clipSeg(X(run[j - 1][0]), Y(run[j - 1][1]), X(run[j][0]), Y(run[j][1]), plot);
          if (!c) { down = false; continue; }
          (holes.length ? cutSeg(c[0], c[1], c[2], c[3], holes) : [c]).forEach(function (g) {
            if (!down || Math.abs(lx - g[0]) > 0.05 || Math.abs(ly - g[1]) > 0.05) { d += 'M' + pt(g[0], g[1]); lastKey = ''; vis.push([g[0], g[1]]); }
            var key = pt(g[2], g[3]);
            if (key !== lastKey) d += 'L' + key;
            lastKey = key;
            lx = g[2]; ly = g[3]; down = true;
            vis.push([g[2], g[3]]);
          });
        }
      });
      if (!d) return;
      curveSvg.push(P(d, { fill: 'none', stroke: col(i), w: 2.4, join: 'round', cap: 'round', cls: 'fig-fn' }));
      curveObst = curveObst.concat(vis);
      curves.push({ vis: vis, color: col(i), label: f.label });
    });
    obst = obst.concat(curveObst);

    // 점
    var ptSvg = [];
    pts.forEach(function (p) {
      var x = X(p.x), y = Y(p.y);
      ptSvg.push(p.open ? C(x, y, 4.2, { fill: 'none', stroke: 'cur', w: 1.6, cls: 'fig-pt fig-open' })
        : C(x, y, 3.8, { fill: 'cur', cls: 'fig-pt' }));
      occupied.push({ x1: x - 4.5, y1: y - 4.5, x2: x + 4.5, y2: y + 4.5 });
    });

    // 눈금 수: 겹치지 않게 건너뛴다. 한쪽에 가지런히 두고(x 는 아래, y 는 왼쪽) 곡선보다 위에 그린다.
    // 원점에서는 0 대신 O. 음수는 숫자가 눈금 가운데 오게 빼기 기호 반 폭만큼 왼쪽으로.
    var fx = axisFormat(xs), fy = axisFormat(ys), maxWx = 0;
    xs.forEach(function (v) { maxWx = Math.max(maxWx, textWidth(fx(v), FS)); });
    var lsx = labelStep(gx, sx, maxWx + 6), lsy = labelStep(gy, sy, FS + 4), tickD = '';
    var minusHalf = textWidth('\u2212', FS) / 2;
    xs.forEach(function (v) {
      if (!onStep(v, lsx) || (origin && v === 0)) return;
      var x = X(v);
      tickD += 'M' + pt(x, axY - 3) + 'L' + pt(x, axY + 3);
      addText(v < 0 ? x - minusHalf : x, axY + 12, fx(v), { size: FS, cls: 'fig-tick-label' });
    });
    ys.forEach(function (v) {
      if (!onStep(v, lsy) || (origin && v === 0)) return;
      var y = Y(v);
      tickD += 'M' + pt(axX - 3, y) + 'L' + pt(axX + 3, y);
      addText(axX - 6, y, fy(v), { size: FS, anchor: 'end', cls: 'fig-tick-label' });
    });
    if (tickD) o.push(P(tickD, { fill: 'none', stroke: 'cur', w: 1.2, cls: 'fig-tick' }));
    if (origin) addText(axX - 5, axY + 12, 'O', { size: FS + 1, anchor: 'end', cls: 'fig-origin' });
    addText(pw + EXT - 2, axY + 13, 'x', { size: 15, italic: true, cls: 'fig-axis-label' });
    addText(axX + 11, -EXT + 2, 'y', { size: 15, italic: true, cls: 'fig-axis-label' });

    // 이름표: 후보 자리 중 그림 안에서 선·글자와 가장 덜 겹치는 곳
    function score(r) {
      var sc = 0;
      if (r.x1 < -2 || r.x2 > pw + 2 || r.y1 < -2 || r.y2 > ph + 2) sc += 40;
      sc += 3 * hits(r, obst);
      occupied.forEach(function (b) { if (overlap(r, b, 1)) sc += 30; });
      return sc;
    }
    function around(x, y, g) {
      return [[x + g, y - g - 4, 'start'], [x - g, y - g - 4, 'end'], [x + g, y + g + 5, 'start'], [x - g, y + g + 5, 'end'],
        [x + g + 2, y, 'start'], [x - g - 2, y, 'end'], [x, y - g - 7, 'middle'], [x, y + g + 8, 'middle']];
    }
    function place(cands, txt, size, color, cls) {
      var best = null;
      cands.forEach(function (c, idx) {
        var r = textRect(c[0], c[1], txt, size, c[2]), sc = score(r) + idx * 0.01;
        if (!best || sc < best.sc) best = { sc: sc, c: c };
      });
      addText(best.c[0], best.c[1], txt, { size: size, anchor: best.c[2], color: color, cls: cls });
    }
    pts.forEach(function (p) {
      if (!hasLabel(p.label)) return;
      place(around(X(p.x), Y(p.y), 5), labelText(p.label), 13, null, 'fig-pt-label');
    });
    curves.forEach(function (c) {
      if (!hasLabel(c.label)) return;
      var cands = [];
      [0.93, 0.82, 0.7, 0.55, 0.4, 0.25].forEach(function (f) {
        var q = c.vis[Math.min(c.vis.length - 1, Math.floor(c.vis.length * f))];
        cands = cands.concat(around(q[0], q[1], 8));
      });
      place(cands, prettyExpr(labelText(c.label)), 14, c.color, 'fig-fn-label');
    });

    o.push(curveSvg.join(''), ptSvg.join(''), texts.join(''));
    return { vb: box.viewBox(6), body: pen.svg() };
  }

  /* ───────────── 그리기: 다각형 ─────────────
     points 는 수학 좌표(y 가 위쪽). 가로세로 비율을 지키며 260×200 안에 맞춘다. */
  // 꼭짓점 P0 에서 u·v 방향 변 사이의 '안쪽'(w 쪽)을 지나는 호
  function arcThrough(P0, u, v, w, r) {
    var tu = Math.atan2(u[1], u[0]), tv = Math.atan2(v[1], v[0]), tw = Math.atan2(w[1], w[0]), T2 = 2 * PI;
    var D = ((tv - tu) % T2 + T2) % T2, Wd = ((tw - tu) % T2 + T2) % T2;
    var pos = Wd < D, size = pos ? D : T2 - D;
    return 'M' + pt(P0[0] + r * u[0], P0[1] + r * u[1]) + 'A' + rd(r) + ' ' + rd(r) + ' 0 ' + (size > PI ? 1 : 0) + ' ' +
      (pos ? 1 : 0) + ' ' + pt(P0[0] + r * v[0], P0[1] + r * v[1]);
  }
  function hasLabel(v) { return v !== undefined && v !== null && v !== ''; }
  // 각 이름표 가운데까지의 거리: 기본은 호 바로 바깥, 좁은 각이면 두 변 사이에 글자가 들어갈 만큼 멀리(cap 까지)
  function angleLabelDist(u, v, w, half, txt, size, base, cap) {
    var tw0 = textWidth(txt, size), th0 = size * 1.1, d = base + textReach(w[0], w[1], tw0, th0);
    if (half < PI / 2) {
      var eu = Math.abs(u[1]) * tw0 / 2 + Math.abs(u[0]) * th0 / 2, ev = Math.abs(v[1]) * tw0 / 2 + Math.abs(v[0]) * th0 / 2;
      d = Math.max(d, Math.min((Math.max(eu, ev) + 2) / Math.sin(half), cap));
    }
    return d;
  }
  // 직각 표시(작은 사각형): 꼭짓점 P0 에서 u·v 방향으로 q 만큼
  function rightMark(P0, u, v, q, cls) {
    return P('M' + pt(P0[0] + q * u[0], P0[1] + q * u[1]) + 'L' + pt(P0[0] + q * (u[0] + v[0]), P0[1] + q * (u[1] + v[1])) +
      'L' + pt(P0[0] + q * v[0], P0[1] + q * v[1]), { fill: 'none', stroke: 'cur', w: 1.5, cls: cls || 'fig-right' });
  }

  function drawPolygon(s) {
    var raw = s.points, n = raw.length, segs = s.segments || [];
    var all = raw.slice();
    segs.forEach(function (g) { all.push(g.from, g.to); });
    var mnx = Infinity, mxx = -Infinity, mny = Infinity, mxy = -Infinity;
    all.forEach(function (q) {
      mnx = Math.min(mnx, q[0]); mxx = Math.max(mxx, q[0]); mny = Math.min(mny, q[1]); mxy = Math.max(mxy, q[1]);
    });
    var bw = mxx - mnx, bh = mxy - mny, sc = Math.min(bw > 0 ? 260 / bw : Infinity, bh > 0 ? 200 / bh : Infinity);
    function tr(q) { return [(q[0] - mnx) * sc, (mxy - q[1]) * sc]; }
    var V = raw.map(tr), pen = new Pen(true), o = pen.out, box = pen.box;
    V.forEach(function (v) { box.add(v[0], v[1], 2); });

    var fillC = s.fill ? (s.fill === true ? COLORS[0] : col(s.fill - 1)) : null;
    o.push(P(polyD(V, true), { fill: fillC || 'none', fo: fillC ? 0.14 : undefined, stroke: 'cur', w: 2.2, join: 'round', cls: 'fig-shape' }));

    // 꼭짓점마다: 두 변 방향 u·v, 안쪽 이등분 방향, 안쪽 각
    var info = V.map(function (P0, i) {
      var A = V[(i - 1 + n) % n], B = V[(i + 1) % n];
      var u = unit(A[0] - P0[0], A[1] - P0[1]), v = unit(B[0] - P0[0], B[1] - P0[1]);
      var bx = u[0] + v[0], by = u[1] + v[1], bl = Math.sqrt(bx * bx + by * by);
      var w = bl < 1e-6 ? [-u[1], u[0]] : [bx / bl, by / bl], small = Math.acos(clamp(u[0] * v[0] + u[1] * v[1], -1, 1));
      var reflex = false;
      if (!insidePoly(P0[0] + w[0] * 3, P0[1] + w[1] * 3, V)) { w = [-w[0], -w[1]]; reflex = bl >= 1e-6; }
      return { u: u, v: v, w: w, angle: reflex ? 2 * PI - small : small, minEdge: Math.min(dist(P0, A), dist(P0, B)) };
    });

    (s.segments || []).forEach(function (g) {
      var A = tr(g.from), B = tr(g.to);
      o.push(L(A[0], A[1], B[0], B[1], { stroke: 'cur', w: g.dashed ? 1.4 : 1.8, dash: g.dashed ? '5 4' : null, cls: 'fig-seg' }));
      box.add(A[0], A[1]).add(B[0], B[1]);
      if (g.right) {
        // 높이의 발: to 가 놓인 변을 찾아 그 변과 이루는 직각을 표시 (다각형 안쪽으로)
        var u0 = unit(A[0] - B[0], A[1] - B[1]);
        for (var k = 0; k < n; k++) {
          var E1 = V[k], E2 = V[(k + 1) % n], ex = E2[0] - E1[0], ey = E2[1] - E1[1], el2 = ex * ex + ey * ey;
          var t = el2 ? ((B[0] - E1[0]) * ex + (B[1] - E1[1]) * ey) / el2 : -1;
          if (t < -0.01 || t > 1.01) continue;
          if (dist(B, [E1[0] + t * ex, E1[1] + t * ey]) > 1.5) continue;
          var e1 = unit(ex, ey);
          if (!insidePoly(B[0] + 5 * (u0[0] + e1[0]), B[1] + 5 * (u0[1] + e1[1]), V)) e1 = [-e1[0], -e1[1]];
          o.push(rightMark(B, u0, e1, 9));
          break;
        }
      }
      if (hasLabel(g.label)) {
        var M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], e = unit(B[0] - A[0], B[1] - A[1]), nrm = [e[1], -e[0]];
        if (nrm[0] < -1e-6 || (Math.abs(nrm[0]) <= 1e-6 && nrm[1] > 0)) nrm = [-nrm[0], -nrm[1]];   // 오른쪽(또는 위)으로
        var txt0 = labelText(g.label), c0 = placeOut(M[0], M[1], nrm, txt0, 13, 4);
        pen.text(c0[0], c0[1], txt0, { size: 13, cls: 'fig-seg-label' });
      }
    });

    (s.angles || []).forEach(function (a) {
      var I = info[a.at], P0 = V[a.at], txt = hasLabel(a.label) ? labelText(a.label) : '';
      var q = clamp(I.minEdge * 0.16, 8, 14), rA = clamp(I.minEdge * 0.25, 14, 26);
      var d = txt ? angleLabelDist(I.u, I.v, I.w, I.angle / 2, txt, 13, (a.right ? q * 1.5 : rA) + 3, I.minEdge * 0.75) : 0;
      if (a.right) o.push(rightMark(P0, I.u, I.v, q));
      else {
        // 좁은 각은 호를 크게 그려 멀리 놓인 이름표와 이어 보이게
        if (txt && I.angle < 40 * PI / 180) rA = clamp(d - textReach(I.w[0], I.w[1], textWidth(txt, 13), 14.3) - 5, rA, I.minEdge * 0.8);
        o.push(P(arcThrough(P0, I.u, I.v, I.w, rA), { fill: 'none', stroke: COLORS[3], w: 1.6, cls: 'fig-arc' }));
      }
      if (txt) pen.text(P0[0] + I.w[0] * d, P0[1] + I.w[1] * d, txt, { size: 13, cls: 'fig-angle-label' });
    });

    if (Array.isArray(s.sides)) s.sides.forEach(function (t, i) {
      if (!hasLabel(t) || i >= n) return;
      var A = V[i], B = V[(i + 1) % n], M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      var e = unit(B[0] - A[0], B[1] - A[1]), nrm = [e[1], -e[0]];
      if (insidePoly(M[0] + nrm[0] * 3, M[1] + nrm[1] * 3, V)) nrm = [-nrm[0], -nrm[1]];
      var txt = labelText(t), c = placeOut(M[0], M[1], nrm, txt, 13, 5);
      pen.text(c[0], c[1], txt, { size: 13, cls: 'fig-side-label' });
    });

    if (Array.isArray(s.labels)) s.labels.forEach(function (t, i) {
      if (!hasLabel(t) || i >= n) return;
      var txt = labelText(t), c = placeOut(V[i][0], V[i][1], [-info[i].w[0], -info[i].w[1]], txt, 15, 4);
      pen.text(c[0], c[1], txt, { size: 15, cls: 'fig-vertex-label' });
    });

    return { vb: box.viewBox(8, 200, 120), body: pen.svg() };
  }

  /* ───────────── 그리기: 원 ───────────── */
  function drawCircle(s) {
    var Rr = 80, pen = new Pen(true), o = pen.out, box = pen.box;
    var rText = hasLabel(s.r) ? labelText(s.r) : null, dText = hasLabel(s.d) ? labelText(s.d) : null;
    var showD = s.showDiameter === true || (s.showDiameter === undefined && !!dText);
    var showR = s.showRadius === true || (s.showRadius === undefined && !!rText);
    o.push(C(0, 0, Rr, { fill: 'none', stroke: 'cur', w: 2.2, cls: 'fig-shape' }));
    box.add(0, 0, Rr + 2);
    if (showD) {
      o.push(L(-Rr, 0, Rr, 0, { stroke: COLORS[3], w: 2, cls: 'fig-diameter' }));
      o.push(C(-Rr, 0, 2.6, { fill: COLORS[3] }) + C(Rr, 0, 2.6, { fill: COLORS[3] }));
      if (dText) pen.text(showR ? -Rr / 2 : Rr / 2, 13, dText, { size: 14, cls: 'fig-diameter-label' });
    }
    if (showR) {
      var ang = (showD ? -55 : -35) * PI / 180, ex = Rr * Math.cos(ang), ey = Rr * Math.sin(ang);
      o.push(L(0, 0, ex, ey, { stroke: COLORS[0], w: 2, cls: 'fig-radius' }));
      o.push(C(ex, ey, 2.6, { fill: COLORS[0] }));
      if (rText) {
        var c = placeOut(ex / 2, ey / 2, unit(ey, -ex), rText, 14, 4);
        pen.text(c[0], c[1], rText, { size: 14, cls: 'fig-radius-label' });
      }
    }
    if (s.showCenter !== false || hasLabel(s.label)) {
      o.push(C(0, 0, 3.2, { fill: 'cur', cls: 'fig-center' }));
      if (hasLabel(s.label)) {
        var t = labelText(s.label), cc = placeOut(0, 0, unit(-0.55, 0.85), t, 15, 4);
        pen.text(cc[0], cc[1], t, { size: 15, cls: 'fig-center-label' });
      }
    }
    return { vb: box.viewBox(8, 200, 120), body: pen.svg() };
  }

  /* ───────────── 그리기: 각 ───────────── */
  function drawAngle(s) {
    var deg = s.deg, th = deg * PI / 180, Lr = 130, pen = new Pen(true), o = pen.out, box = pen.box;
    var ex = Lr * Math.cos(th), ey = -Lr * Math.sin(th);
    o.push(L(0, 0, Lr, 0, { stroke: 'cur', w: 2.2, cap: 'round', cls: 'fig-ray' }));
    o.push(L(0, 0, ex, ey, { stroke: 'cur', w: 2.2, cap: 'round', cls: 'fig-ray' }));
    box.add(0, 0, 4).add(Lr, 0, 2).add(ex, ey, 2);
    var label = s.label === undefined ? numText(deg) + '°' : (hasLabel(s.label) ? labelText(s.label) : '');
    var right = Math.abs(deg - 90) < 1e-9, rA = 30, arc = s.showArc !== false && deg > 0;
    var dir = deg < 1 ? unit(0.4, -1) : [Math.cos(th / 2), -Math.sin(th / 2)];
    var d = label ? angleLabelDist([1, 0], [Math.cos(th), -Math.sin(th)], dir, deg < 1 ? PI : th / 2, label, 15,
      (arc ? (right ? 20 : rA) : 8) + 5, 100) : 0;
    // 좁은 각은 호를 크게 그려 이름표와 이어 보이게
    if (label && arc && !right && deg < 40) rA = clamp(d - textReach(dir[0], dir[1], textWidth(label, 15), 16.5) - 6, rA, 104);
    if (arc) {
      if (right) {
        o.push(P('M16 0L16 -16L0 -16', { fill: 'none', stroke: 'cur', w: 1.6, cls: 'fig-right' }));
      } else if (deg >= 360) {
        o.push(C(0, 0, rA, { fill: 'none', stroke: COLORS[3], w: 1.8, cls: 'fig-arc' }));
      } else {
        o.push(P('M' + pt(rA, 0) + 'A' + rA + ' ' + rA + ' 0 ' + (deg > 180 ? 1 : 0) + ' 0 ' + pt(rA * Math.cos(th), -rA * Math.sin(th)),
          { fill: 'none', stroke: COLORS[3], w: 1.8, cls: 'fig-arc' }));
      }
    }
    if (label) pen.text(dir[0] * d, dir[1] * d, label, { size: 15, cls: 'fig-angle-label' });
    o.push(C(0, 0, 3, { fill: 'cur' }));
    return { vb: box.viewBox(10, 220, 120), body: pen.svg() };
  }

  /* ───────────── 그리기: 직육면체 겨냥도 ─────────────
     앞면은 그대로, 깊이는 35° 방향으로 절반 길이(사투상). 보이지 않는 모서리 3개는 점선. */
  function drawCuboid(s) {
    var k = 0.5, ang = 35 * PI / 180, dx0 = s.d * k * Math.cos(ang), dy0 = s.d * k * Math.sin(ang);
    var sc = Math.min(240 / (s.w + dx0), 170 / (s.h + dy0));
    var W = s.w * sc, H = s.h * sc, DX = dx0 * sc, DY = dy0 * sc;
    var F = [[0, H], [W, H], [W, 0], [0, 0]];   // 앞면: 왼아래·오른아래·오른위·왼위
    var B = F.map(function (q) { return [q[0] + DX, q[1] - DY]; });
    var pen = new Pen(), o = pen.out, box = pen.box;
    F.concat(B).forEach(function (q) { box.add(q[0], q[1], 2); });
    o.push(P(polyD([F[3], F[2], B[2], B[3]], true), { fill: COLORS[0], fo: 0.16, stroke: 'none', cls: 'fig-face' }));
    o.push(P(polyD([F[1], B[1], B[2], F[2]], true), { fill: COLORS[0], fo: 0.1, stroke: 'none', cls: 'fig-face' }));
    o.push(P(polyD(F, true), { fill: COLORS[0], fo: 0.05, stroke: 'none', cls: 'fig-face' }));
    [[B[0], B[1]], [B[0], B[3]], [B[0], F[0]]].forEach(function (e) {
      o.push(L(e[0][0], e[0][1], e[1][0], e[1][1], { stroke: 'cur', w: 1.4, dash: '5 4', so: 0.85, cls: 'fig-hidden' }));
    });
    var vis = [[F[0], F[1]], [F[1], F[2]], [F[2], F[3]], [F[3], F[0]], [F[3], B[3]], [F[2], B[2]], [F[1], B[1]], [B[3], B[2]], [B[2], B[1]]];
    o.push(P(vis.map(function (e) { return 'M' + pt(e[0][0], e[0][1]) + 'L' + pt(e[1][0], e[1][1]); }).join(''),
      { fill: 'none', stroke: 'cur', w: 2, join: 'round', cap: 'round', cls: 'fig-edge' }));
    var lab = isObj(s.labels) ? s.labels : {};
    if (hasLabel(lab.w)) pen.text(W / 2, H + 15, labelText(lab.w), { size: 14, cls: 'fig-len-label' });
    if (hasLabel(lab.h)) pen.text(-8, H / 2, labelText(lab.h), { size: 14, anchor: 'end', cls: 'fig-len-label' });
    if (hasLabel(lab.d)) {
      var t = labelText(lab.d), c = placeOut(W + DX / 2, H - DY / 2, unit(DY, DX), t, 14, 4);
      pen.text(c[0], c[1], t, { size: 14, cls: 'fig-len-label' });
    }
    return { vb: box.viewBox(8, 200, 120), body: pen.svg() };
  }

  /* ───────────── 그리기: 막대그래프 ───────────── */
  // 그린 것이 [0,0,W,H] 밖으로 나가도 잘리지 않게
  function frameVB(box, W, H) {
    var x1 = Math.min(0, box.x1 - 4), y1 = Math.min(0, box.y1 - 4), x2 = Math.max(W, box.x2 + 4), y2 = Math.max(H, box.y2 + 4);
    return [rd(x1), rd(y1), rd(x2 - x1), rd(y2 - y1)].join(' ');
  }
  function fitSize(txt, size, room, minSize) {
    var w = textWidth(txt, size);
    return w > room ? Math.max(minSize, rd(size * room / w)) : size;
  }

  function drawBars(s) {
    var labs = s.labels.map(labelText), vals = s.values, n = vals.length, showV = s.showValues !== false;
    var vmin = Math.min(0, Math.min.apply(null, vals)), vmax = Math.max(0, Math.max.apply(null, vals));
    if (vmax === vmin) vmax = 1;
    var sc = axisScale(vmin, vmax, 5), pen = new Pen(), o = pen.out, W = 420, top = 4, unitTxt = hasLabel(s.unit) ? '(' + labelText(s.unit) + ')' : '';
    if (hasLabel(s.title)) { pen.text(W / 2, top + 10, labelText(s.title), { size: 15, bold: true, cls: 'fig-title' }); top += 28; }
    var gridD = '', i, ft = axisFormat(sc.ticks), fv = axisFormat(vals);

    if (s.horizontal) {
      var lw = 0, vw = 0;
      labs.forEach(function (t) { lw = Math.max(lw, textWidth(t, 13)); });
      vals.forEach(function (v) { vw = Math.max(vw, textWidth(fv(v), 12)); });
      var pl = Math.min(lw, 120) + 16, pr = W - Math.max(16, showV ? vw + 12 : 0), t0 = top + 6;
      var ph = clamp(n * 34, 90, 320), pb = t0 + ph, slot = ph / n, bh = Math.min(slot * 0.58, 28);
      var Xv = function (v) { return pl + (v - sc.lo) / (sc.hi - sc.lo) * (pr - pl); };
      sc.ticks.forEach(function (t) {
        var x = Xv(t);
        if (t !== 0) gridD += 'M' + pt(x, t0) + 'L' + pt(x, pb);
        pen.text(x, pb + 14, ft(t), { size: 12, cls: 'fig-tick-label' });
      });
      if (gridD) o.push(P(gridD, { fill: 'none', stroke: 'cur', so: 0.18, w: 1, cls: 'fig-grid' }));
      for (i = 0; i < n; i++) {
        var cy = t0 + slot * (i + 0.5), v = vals[i], xa = Xv(Math.min(0, v)), xb = Xv(Math.max(0, v));
        o.push(R(xa, cy - bh / 2, xb - xa, bh, { fill: COLORS[0], fo: 0.7, cls: 'fig-bar' }));
        if (showV) pen.text(v >= 0 ? xb + 6 : xa - 6, cy, fv(v), { size: 12, anchor: v >= 0 ? 'start' : 'end', cls: 'fig-val' });
        pen.text(pl - 8, cy, labs[i], { size: fitSize(labs[i], 13, 120, 9), anchor: 'end', cls: 'fig-cat' });
      }
      o.push(L(Xv(0), t0 - 4, Xv(0), pb, { stroke: 'cur', w: 1.5, cls: 'fig-axis' }));
      o.push(L(pl, pb, pr, pb, { stroke: 'cur', w: 1.2, cls: 'fig-axis' }));
      if (unitTxt) pen.text(pr, pb + 32, unitTxt, { size: 12, anchor: 'end', cls: 'fig-unit' });
      return { vb: frameVB(pen.box, W, pb + (unitTxt ? 40 : 24)), body: pen.svg() };
    }

    var yw = 0;
    sc.ticks.forEach(function (t) { yw = Math.max(yw, textWidth(ft(t), 12)); });
    var left = Math.max(30, yw + 14), right = W - 10, ptop = top + (unitTxt ? 24 : 8) + (showV ? 10 : 0), pbot = ptop + 190;
    var Yv = function (v) { return pbot - (v - sc.lo) / (sc.hi - sc.lo) * (pbot - ptop); };
    sc.ticks.forEach(function (t) {
      var y = Yv(t);
      if (t !== 0) gridD += 'M' + pt(left, y) + 'L' + pt(right, y);
      pen.text(left - 7, y, ft(t), { size: 12, anchor: 'end', cls: 'fig-tick-label' });
    });
    if (gridD) o.push(P(gridD, { fill: 'none', stroke: 'cur', so: 0.18, w: 1, cls: 'fig-grid' }));
    if (unitTxt) pen.text(left - 7, ptop - 16, unitTxt, { size: 12, anchor: 'end', cls: 'fig-unit' });
    var slotW = (right - left) / n, bw = Math.min(slotW * 0.58, 46);
    for (i = 0; i < n; i++) {
      var cx = left + slotW * (i + 0.5), val = vals[i], ya = Yv(Math.max(0, val)), yb = Yv(Math.min(0, val));
      o.push(R(cx - bw / 2, ya, bw, yb - ya, { fill: COLORS[0], fo: 0.7, cls: 'fig-bar' }));
      if (showV) pen.text(cx, val >= 0 ? ya - 9 : yb + 10, fv(val), { size: 12, cls: 'fig-val' });
      pen.text(cx, pbot + 15, labs[i], { size: fitSize(labs[i], 13, slotW - 4, 9), cls: 'fig-cat' });
    }
    o.push(L(left, ptop - 6, left, pbot, { stroke: 'cur', w: 1.5, cls: 'fig-axis' }));
    o.push(L(left, Yv(0), right, Yv(0), { stroke: 'cur', w: 1.5, cls: 'fig-axis' }));
    return { vb: frameVB(pen.box, W, pbot + 28), body: pen.svg() };
  }

  /* ───────────── 그리기: 꺾은선그래프 ─────────────
     값이 0 에서 멀리 몰려 있으면 세로축 아래를 물결선(≈)으로 줄인다 (교과서 방식, fromZero:true 면 안 줄임). */
  function drawLine(s) {
    var labs = s.labels.map(labelText), vals = s.values, n = vals.length, showV = s.showValues !== false;
    var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), sc, wave = false;
    if (!s.fromZero && mn > 0 && (mx - mn) / mx < 0.5) {
      sc = axisScale(mn, mx, 4);
      wave = sc.lo > 0;
    }
    if (!wave) sc = axisScale(Math.min(0, mn), Math.max(0, mx), 5);
    var pen = new Pen(), o = pen.out, W = 420, top = 4, unitTxt = hasLabel(s.unit) ? '(' + labelText(s.unit) + ')' : '';
    if (hasLabel(s.title)) { pen.text(W / 2, top + 10, labelText(s.title), { size: 15, bold: true, cls: 'fig-title' }); top += 28; }
    var yw = 0, ft = axisFormat(sc.ticks), fv = axisFormat(vals);
    sc.ticks.forEach(function (t) { yw = Math.max(yw, textWidth(ft(t), 12)); });
    var left = Math.max(30, yw + 14), right = W - 10, ptop = top + (unitTxt ? 24 : 8) + (showV ? 10 : 0), pbot = ptop + 190;
    var dataBot = wave ? pbot - 24 : pbot;
    var Yv = function (v) { return dataBot - (v - sc.lo) / (sc.hi - sc.lo) * (dataBot - ptop); };
    var gridD = '';
    sc.ticks.forEach(function (t) {
      var y = Yv(t);
      if (!(t === 0 && !wave)) gridD += 'M' + pt(left, y) + 'L' + pt(right, y);
      pen.text(left - 7, y, ft(t), { size: 12, anchor: 'end', cls: 'fig-tick-label' });
    });
    if (gridD) o.push(P(gridD, { fill: 'none', stroke: 'cur', so: 0.18, w: 1, cls: 'fig-grid' }));
    if (unitTxt) pen.text(left - 7, ptop - 16, unitTxt, { size: 12, anchor: 'end', cls: 'fig-unit' });
    if (wave) {
      pen.text(left - 7, pbot, '0', { size: 12, anchor: 'end', cls: 'fig-tick-label' });
      var yb1 = pbot - 15, yb2 = pbot - 9;
      o.push(L(left, ptop - 6, left, yb1, { stroke: 'cur', w: 1.5, cls: 'fig-axis' }));
      o.push(L(left, yb2, left, pbot, { stroke: 'cur', w: 1.5, cls: 'fig-axis' }));
      o.push(P('M' + pt(left - 7, yb1) + 'q3.5 -4 7 0t7 0M' + pt(left - 7, yb2) + 'q3.5 -4 7 0t7 0',
        { fill: 'none', stroke: 'cur', w: 1.4, cls: 'fig-wave' }));
    } else {
      o.push(L(left, ptop - 6, left, pbot, { stroke: 'cur', w: 1.5, cls: 'fig-axis' }));
    }
    o.push(L(left, wave ? pbot : Yv(0), right, wave ? pbot : Yv(0), { stroke: 'cur', w: 1.5, cls: 'fig-axis' }));
    var slotW = (right - left) / n, P2 = [];
    for (var i = 0; i < n; i++) {
      var cx = left + slotW * (i + 0.5);
      P2.push([cx, Yv(vals[i])]);
      pen.text(cx, pbot + 15, labs[i], { size: fitSize(labs[i], 13, slotW - 4, 9), cls: 'fig-cat' });
    }
    o.push(P(polyD(P2), { fill: 'none', stroke: COLORS[0], w: 2.4, join: 'round', cap: 'round', cls: 'fig-line' }));
    P2.forEach(function (q, j) {
      o.push(C(q[0], q[1], 4, { fill: COLORS[0], cls: 'fig-mark' }));
      if (showV) pen.text(q[0], q[1] - 12, fv(vals[j]), { size: 12, cls: 'fig-val' });
    });
    return { vb: frameVB(pen.box, W, pbot + 28), body: pen.svg() };
  }

  /* ───────────── 그리기: 원그래프 ─────────────
     12시에서 시계 방향. 백분율은 합이 100 이 되게 반올림(큰 나머지 순). 좁은 조각은 바깥에 지시선. */
  function percents(vals) {
    var total = sum(vals), raw = vals.map(function (v) { return v / total * 100; });
    var fl = raw.map(function (r) { return Math.floor(r + 1e-9); }), rest = 100 - sum(fl);
    var order = raw.map(function (r, i) { return i; }).sort(function (a, b) { return (raw[b] - fl[b]) - (raw[a] - fl[a]) || a - b; });
    for (var i = 0; i < rest && i < order.length; i++) fl[order[i]]++;
    return fl;
  }
  function drawPie(s) {
    var labs = s.labels.map(labelText), vals = s.values, total = sum(vals), pct = percents(vals);
    var Rr = 96, a = 0, outside = [], pen = new Pen(), o = pen.out, box = pen.box;
    box.add(0, 0, Rr + 2);
    vals.forEach(function (v, i) {
      if (!(v > 0)) return;
      var a0 = a, a1 = a + v / total * 2 * PI, full = v >= total;
      a = a1;
      var paintO = { fill: col(i), fo: i < 4 ? 0.55 : i < 8 ? 0.3 : 0.15, stroke: 'cur', w: 1.3, join: 'round', cls: 'fig-slice' };
      o.push(full ? C(0, 0, Rr, paintO) : P(sectorD(0, 0, Rr, a0, a1), paintO));
      var mid = (a0 + a1) / 2, span = a1 - a0, ptxt = pct[i] + '%';
      var need = Math.max(textWidth(labs[i], 13), textWidth(ptxt, 12)) + 6, chord = 2 * Rr * 0.6 * Math.sin(Math.min(span, PI) / 2);
      if (full || (span >= 0.5 && chord >= need && Rr * 0.4 >= 30)) {
        var rr = full ? 0 : Rr * 0.6, cx = rr * Math.sin(mid), cy = -rr * Math.cos(mid);
        pen.text(cx, cy - 8, labs[i], { size: 13, cls: 'fig-slice-label' });
        pen.text(cx, cy + 9, ptxt, { size: 12, cls: 'fig-slice-pct' });
      } else {
        outside.push({ mid: mid, txt: labs[i] + ' ' + ptxt, right: Math.sin(mid) >= 0 });
      }
    });
    [true, false].forEach(function (side) {
      var items = outside.filter(function (it) { return it.right === side; });
      items.forEach(function (it) { it.y = -(Rr + 16) * Math.cos(it.mid); });
      items.sort(function (p, q) { return p.y - q.y; });
      for (var j = 1; j < items.length; j++) if (items[j].y < items[j - 1].y + 16) items[j].y = items[j - 1].y + 16;
      items.forEach(function (it) {
        var sx = Math.sin(it.mid), sy = -Math.cos(it.mid), ex = (Rr + 10) * sx, tx = side ? Math.max(ex, 18) + 6 : Math.min(ex, -18) - 6;
        o.push(P('M' + pt(Rr * 0.9 * sx, Rr * 0.9 * sy) + 'L' + pt(ex, it.y) + 'L' + pt(tx + (side ? -3 : 3), it.y),
          { fill: 'none', stroke: 'cur', w: 1, so: 0.7, cls: 'fig-leader' }));
        pen.text(tx, it.y, it.txt, { size: 12, anchor: side ? 'start' : 'end', cls: 'fig-slice-label' });
      });
    });
    if (hasLabel(s.title)) pen.text(0, Math.min(box.y1, -Rr) - 16, labelText(s.title), { size: 15, bold: true, cls: 'fig-title' });
    return { vb: box.viewBox(8, 280, 200), body: pen.svg() };
  }

  /* ───────────── 그리기: 수 모형 ─────────────
     백 모형(10×10 판), 십 모형(10칸 막대), 일 모형(작은 정사각형, 5개씩 줄). 넓이를 넘으면 줄을 바꾼다. */
  function drawBlocks(s) {
    var hN = s.hundreds || 0, tN = s.tens || 0, oN = s.ones || 0, u = 9, maxW = 456, items = [], i;
    for (i = 0; i < hN; i++) items.push({ k: 'h', w: 10 * u, h: 10 * u });
    for (i = 0; i < tN; i++) items.push({ k: 't', w: u, h: 10 * u });
    for (i = 0; i < oN; i++) items.push({ k: 'o', w: u, h: u });
    // 일 모형은 5개씩 묶음 칸으로 (아래 정렬)
    var rows = [], row = null, x = 0, onesCol = 0;
    items.forEach(function (it) {
      var prev = row && row.items.length ? row.items[row.items.length - 1] : null;
      if (it.k === 'o') {
        var idx = onesCol++, colI = Math.floor(idx / 5), slot = idx % 5;
        if (slot === 0) {
          var gap0 = !prev ? 0 : prev.k === 'o' ? 4 : 18;
          if (!row || x + gap0 + u > maxW) { row = { items: [], h: 0 }; rows.push(row); x = 0; gap0 = 0; }
          it.x = x + gap0; x = it.x + u;
        } else it.x = prev.x;
        it.stack = slot;
        it.colI = colI;
        row.items.push(it);
        row.h = Math.max(row.h, (slot + 1) * (u + 3) - 3);
        return;
      }
      var gap = !prev ? 0 : prev.k === it.k ? (it.k === 'h' ? 8 : 5) : 18;
      if (!row || x + gap + it.w > maxW) { row = { items: [], h: 0 }; rows.push(row); x = 0; gap = 0; }
      it.x = x + gap;
      x = it.x + it.w;
      row.items.push(it);
      row.h = Math.max(row.h, it.h);
    });
    var y = 0, W = 0, o = [];
    var face = { fill: COLORS[1], fo: 0.4, stroke: 'none' }, grid = { fill: 'none', stroke: 'cur', so: 0.45, w: 0.8 };
    var edge = { fill: 'none', stroke: 'cur', w: 1.5 };
    rows.forEach(function (r) {
      r.items.forEach(function (it) {
        var bx = it.x, by, d = '', j;
        W = Math.max(W, it.x + it.w);
        if (it.k === 'o') {
          by = y + r.h - u - it.stack * (u + 3);
          o.push(R(bx, by, u, u, { fill: COLORS[1], fo: 0.4, stroke: 'cur', w: 1.2, cls: 'fig-one' }));
          return;
        }
        by = y + r.h - it.h;
        if (it.k === 'h') {
          for (j = 1; j < 10; j++) d += 'M' + pt(bx + j * u, by) + 'V' + rd(by + 10 * u) + 'M' + pt(bx, by + j * u) + 'H' + rd(bx + 10 * u);
          o.push('<g class="fig-hundred">' + R(bx, by, 10 * u, 10 * u, face) + P(d, grid) + R(bx, by, 10 * u, 10 * u, edge) + '</g>');
        } else {
          for (j = 1; j < 10; j++) d += 'M' + pt(bx, by + j * u) + 'H' + rd(bx + u);
          o.push('<g class="fig-ten">' + R(bx, by, u, 10 * u, face) + P(d, grid) + R(bx, by, u, 10 * u, edge) + '</g>');
        }
      });
      y += r.h + 14;
    });
    // 모형이 몇 개 안 되어도 그림이 너무 작게 잡히지 않게 바탕을 200×100 이상으로 (가운데 정렬)
    var H = Math.max(y - 14, u), vw = Math.max(W + 16, 200), vh = Math.max(H + 16, 100);
    return { vb: [rd(-8 - (vw - W - 16) / 2), rd(-8 - (vh - H - 16) / 2), rd(vw), rd(vh)].join(' '), body: o.join('') };
  }

  /* ───────────── 직접 그린 SVG ─────────────
     검사를 통과한 것만: 맨 바깥 <svg> 의 width/height/class/role/aria-label/xmlns 는 떼고 우리 것으로 붙인다. */
  function renderSvg(s, label) {
    var src = s.svg.trim(), m = ROOT_RE.exec(src), rest = src.slice(m[0].length);
    var re = /([^\s=\/]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?/g, a, viewBox = '', keep = '';
    var drop = { width: 1, height: 1, 'class': 1, role: 1, 'aria-label': 1, xmlns: 1 };
    while ((a = re.exec(m[1]))) {
      var name = a[1], low = name.toLowerCase();
      if (drop[low]) continue;
      var part = ' ' + name + (a[2] !== undefined ? '=' + a[2] : '');
      if (low === 'viewbox') viewBox = part; else keep += part;
    }
    return '<svg xmlns="' + NS + '"' + viewBox + keep + ' class="fig fig-svg" role="img" aria-label="' + esc(label) + '">' + rest;
  }

  /* ───────────── 그림 설명 (aria-label) ───────────── */
  function rangeWords(r) {
    var fa = isFinite(r.from), fb = isFinite(r.to);
    if (fa && fb) return numPlain(r.from) + (r.fromOpen ? ' 초과 ' : ' 이상 ') + numPlain(r.to) + (r.toOpen ? ' 미만' : ' 이하');
    if (fa) return numPlain(r.from) + (r.fromOpen ? ' 초과' : ' 이상');
    if (fb) return numPlain(r.to) + (r.toOpen ? ' 미만' : ' 이하');
    return '모든 수';
  }
  function listData(s) {
    var u = hasLabel(s.unit) ? String(s.unit) : '';
    return s.labels.map(function (l, i) { return l + ' ' + numPlain(s.values[i]) + u; }).join(', ');
  }
  var DESCRIBE = {
    clock: function (s) {
      var h = s.h, m = isInt(s.m) ? s.m : 0, hh = h % 12 === 0 ? 12 : h % 12;
      return (h >= 13 ? '오후 ' : '') + hh + '시' + (m ? ' ' + m + '분을' : '를') + ' 가리키는 시계';
    },
    numberline: function (s) {
      var parts = [numPlain(s.min) + '부터 ' + numPlain(s.max) + '까지 나타낸 수직선'];
      var pts = (s.points || []).map(function (p) {
        return (hasLabel(p.label) ? '점 ' + p.label + '(' + numPlain(p.x) + ')' : numPlain(p.x)) + (p.open ? ' 빈 점' : '');
      });
      if (pts.length) parts.push('표시한 점: ' + pts.join(', '));
      var rs = (s.ranges || []).map(rangeWords);
      if (rs.length) parts.push('나타낸 범위: ' + rs.join(', '));
      var ar = (s.arrows || []).map(function (a) {
        return numPlain(a.from) + '에서 ' + numPlain(a.to) + '까지' + (hasLabel(a.label) ? '(' + a.label + ')' : '');
      });
      if (ar.length) parts.push('화살표: ' + ar.join(', '));
      return parts.join('. ');
    },
    fraction: function (s) {
      var shape = s.shape === 'circle' ? '원' : '막대', wholes = Math.max(isInt(s.whole) ? s.whole : 1, Math.ceil(s.n / s.d), 1);
      if (wholes === 1) return s.d + '칸 중 ' + s.n + '칸을 색칠한 ' + shape;
      return s.d + '칸으로 나눈 ' + shape + ' ' + wholes + '개 중 ' + s.n + '칸을 색칠한 그림';
    },
    coord: function (s) {
      var parts = [];
      var fns = (s.fns || []).map(function (f) {
        if (hasLabel(f.label)) return String(f.label);
        var e = String(f.expr).trim();
        return /^\s*(y|[a-zA-Z]\s*\(\s*x\s*\))\s*=/.test(e) ? e : 'y=' + e;
      });
      if (fns.length) parts.push(fns.join(', ') + ' 그래프');
      var pts = (s.points || []).map(function (p) {
        if (hasLabel(p.label) && String(p.label).indexOf('(') >= 0) return '점 ' + p.label;
        return '점 ' + (hasLabel(p.label) ? p.label + ' ' : '') + '(' + numPlain(p.x) + ', ' + numPlain(p.y) + ')';
      });
      if (pts.length) parts.push(pts.join(', '));
      return parts.length ? '좌표평면 위의 ' + parts.join(', ') : '좌표평면';
    },
    polygon: function (s) {
      var n = s.points.length, name = { 3: '삼각형', 4: '사각형', 5: '오각형', 6: '육각형', 7: '칠각형', 8: '팔각형', 9: '구각형', 10: '십각형' }[n] || n + '각형';
      var lab = Array.isArray(s.labels) ? s.labels.filter(hasLabel).join('') : '';
      var out = name + (lab ? ' ' + lab : '');
      var sides = Array.isArray(s.sides) ? s.sides.filter(hasLabel) : [];
      if (sides.length) out += ', 변: ' + sides.join(', ');
      var angs = (s.angles || []).map(function (a) { return a.right ? '직각' : a.label; }).filter(hasLabel);
      if (angs.length) out += ', 각: ' + angs.join(', ');
      return out;
    },
    circle: function (s) {
      var out = hasLabel(s.r) ? '반지름이 ' + s.r + '인 원' : hasLabel(s.d) ? '지름이 ' + s.d + '인 원' : '원';
      if (hasLabel(s.r) && hasLabel(s.d)) out = '반지름이 ' + s.r + ', 지름이 ' + s.d + '인 원';
      return out + (hasLabel(s.label) ? ' (중심 ' + s.label + ')' : '');
    },
    angle: function (s) {
      if (hasLabel(s.label) && String(s.label) !== numPlain(s.deg) + '°') return '각 (' + s.label + ')';
      return '크기가 ' + numPlain(s.deg) + '°인 각';
    },
    bars: function (s) { return (hasLabel(s.title) ? s.title + ' ' : '') + '막대그래프: ' + listData(s); },
    line: function (s) { return (hasLabel(s.title) ? s.title + ' ' : '') + '꺾은선그래프: ' + listData(s); },
    pie: function (s) {
      var p = percents(s.values);
      return (hasLabel(s.title) ? s.title + ' ' : '') + '원그래프: ' + s.labels.map(function (l, i) { return l + ' ' + p[i] + '%'; }).join(', ');
    },
    blocks: function (s) {
      var parts = [];
      if (s.hundreds) parts.push('백 모형 ' + s.hundreds + '개');
      if (s.tens) parts.push('십 모형 ' + s.tens + '개');
      if (s.ones) parts.push('일 모형 ' + s.ones + '개');
      return '수 모형: ' + parts.join(', ');
    },
    cuboid: function (s) {
      var l = isObj(s.labels) ? s.labels : {}, parts = [];
      if (hasLabel(l.w)) parts.push('가로 ' + l.w);
      if (hasLabel(l.d)) parts.push('세로 ' + l.d);
      if (hasLabel(l.h)) parts.push('높이 ' + l.h);
      var cube = s.w === s.h && s.h === s.d;
      return (cube ? '정육면체' : '직육면체') + '의 겨냥도' + (parts.length ? ' (' + parts.join(', ') + ')' : '');
    },
    svg: function () { return '그림'; }
  };
  // 자동 그림 설명 (spec.alt 가 없을 때 aria-label 에 쓴다)
  function describe(spec) {
    try {
      if (isObj(spec) && typeof spec.alt === 'string' && spec.alt.trim()) return spec.alt.trim();
      return DESCRIBE[spec.type](spec);
    } catch (e) {
      return '그림';
    }
  }

  /* ───────────── 공개 API ───────────── */
  var DRAW = {
    clock: drawClock, numberline: drawNumberline, fraction: drawFraction, coord: drawCoord, polygon: drawPolygon,
    circle: drawCircle, angle: drawAngle, bars: drawBars, line: drawLine, pie: drawPie, blocks: drawBlocks, cuboid: drawCuboid
  };

  // 잘못된 spec 에도 throw 하지 않고 작은 오류 그림을 낸다
  function render(spec) {
    try {
      var r = validate(spec);
      if (r.fatal.length) return errorFigure();
      var label = describe(spec);
      if (spec.type === 'svg') return renderSvg(spec, label);
      var out = DRAW[spec.type](spec);
      return wrap(spec.type, out.vb, out.body, label);
    } catch (e) {
      return errorFigure();
    }
  }

  // 그림의 원래 크기(viewBox 너비·높이, px). 화면에서 max-width 로 쓰면 모든 그림의 글자가 같은 크기(12~15px)가 된다
  function size(svg) {
    var m = /viewBox="\s*(-?[\d.]+)[\s,]+(-?[\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/.exec(String(svg || ''));
    return m ? { w: Number(m[3]), h: Number(m[4]) } : null;
  }

  return {
    render: render,          // spec → '<svg …>'
    check: check,            // spec → 문제점 목록 (정상이면 [])
    describe: describe,      // spec → 그림 설명 글 (aria-label)
    compile: compile,        // 그래프 식 → (x) => 수 (못 읽으면 throw)
    size: size,              // render 결과 → { w, h } 원래 크기(px)
    types: TYPES.slice()     // 쓸 수 있는 type 목록
  };
});
