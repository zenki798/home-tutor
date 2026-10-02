/* 가정교사 — 서식 글(마크다운 일부 + $TeX$ 수식) → HTML (window.TutorText)
 * 계약: docs/ARCHITECTURE.md §3
 * - 학습 내용의 모든 글(개념·문제·보기·해설 …)이 여기를 거친다. 입력은 모두 HTML 이스케이프한다(태그로 해석하지 않는다).
 * - DOM 을 쓰지 않는 순수 함수다. node 에서 require 해서 테스트·내용 검사(check)에 쓴다.
 * - 수식은 교과서처럼: 분수는 위아래로 쌓고, 근호는 √ + 윗줄, 행렬·연립방정식은 늘어나는 괄호로 그린다.
 *   괄호·근호·화살표는 CSS(테두리·그라디언트)로 그린다 — SVG·웹 글꼴 없이 내용 높이에 맞춰 늘어난다(css/mathtext.css). */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorText = mod;
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  var hasOwn = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ================================================================
   * TeX 기호표
   * ================================================================ */

  // 관계 기호: 양옆을 넓게 띄운다
  var REL = {
    le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', approx: '≈', equiv: '≡', sim: '∼', simeq: '≃',
    cong: '≅', propto: '∝', lt: '<', gt: '>', in: '∈', notin: '∉', subset: '⊂', subseteq: '⊆', supset: '⊃',
    supseteq: '⊇', perp: '⊥', parallel: '∥', to: '→', rightarrow: '→', leftarrow: '←', Rightarrow: '⇒',
    Leftarrow: '⇐', Leftrightarrow: '⇔', leftrightarrow: '↔', iff: '⇔', implies: '⇒', mapsto: '↦',
    mid: '|', backsim: '∽', ll: '≪', gg: '≫',
    therefore: '∴', because: '∵', // ∴ x=2 : 관계 기호처럼 띄운다
  };
  // 연산 기호: 보통 간격
  // \circ 는 위첨자로 쓰면 도(30^\circ → 30°), 그 밖에는 합성함수 기호(f∘g)
  var OP = { times: '×', div: '÷', pm: '±', mp: '∓', cdot: '·', cup: '∪', cap: '∩', setminus: '∖', land: '∧', lor: '∨', circ: '∘', circledast: '⊛' };
  // 글자처럼 쓰는 기호
  var ORD = {
    infty: '∞', angle: '∠', triangle: '△', square: '□', degree: '°', cdots: '⋯', ldots: '…', dots: '…', vdots: '⋮', ddots: '⋱',
    prime: '′', emptyset: '∅', varnothing: '∅', forall: '∀', exists: '∃', neg: '¬',
    lnot: '¬', partial: '∂', nabla: '∇', star: '⋆', bigcirc: '○', triangleright: '▷',
  };
  // 백슬래시 + 기호 한 글자
  var ESC_CHAR = { '%': '%', '{': '{', '}': '}', '$': '$', '#': '#', '&': '&', '_': '_', '|': '‖' };
  var GREEK = {
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ',
    iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ',
    phi: 'φ', varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
    Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
  };
  var FN = { sin: 1, cos: 1, tan: 1, sec: 1, csc: 1, cot: 1, log: 1, ln: 1, max: 1, min: 1, exp: 1, det: 1, gcd: 1, lcm: 1, arcsin: 1, arccos: 1, arctan: 1 };
  var BIG = { sum: '∑', prod: '∏', int: '∫', iint: '∬', oint: '∮', lim: 'lim', bigcup: '⋃', bigcap: '⋂' };
  var SPACE = { ',': 'thin', ';': 'med', ':': 'med', ' ': 'med', '!': 'neg', quad: 'quad', qquad: 'qquad', enspace: 'med' };
  var ACCENT = { overline: 'ol', bar: 'bar', overrightarrow: 'vec', vec: 'vec', hat: 'hat', widehat: 'arc', overarc: 'arc', underline: 'ul', dot: 'dot' };
  var TEXTCMD = { text: 'text', mathrm: 'rm', textrm: 'rm', mathbf: 'bf', textbf: 'bf', mathit: 'it', operatorname: 'rm' };
  var ENVS = { cases: 'cases', pmatrix: 'p', bmatrix: 'b', vmatrix: 'v', Bmatrix: 'B', matrix: 'n', array: 'n', aligned: 'n' };
  var SIZING = { big: 1, Big: 1, bigg: 1, Bigg: 1, displaystyle: 1, textstyle: 1, limits: 1, nolimits: 1 };

  // 유니코드로 직접 쓴 기호
  var UNI_REL = { '=': '=', '<': '<', '>': '>', '≤': '≤', '≥': '≥', '≠': '≠', '≈': '≈', '≡': '≡', '→': '→', '⇒': '⇒', '⇔': '⇔', '∈': '∈', '⊂': '⊂', '∥': '∥', '⊥': '⊥', '∽': '∽', '≅': '≅' };
  var UNI_OP = { '+': '+', '-': '−', '−': '−', '×': '×', '÷': '÷', '±': '±', '·': '·', '*': '×', '∪': '∪', '∩': '∩' };

  // 늘어나는 괄호 → CSS 로 그리는 모양 이름 (p 소괄호, b 대괄호, c 중괄호, v 막대, V 겹막대, f 바닥, e 천장)
  // 오른쪽 괄호는 왼쪽 모양을 좌우로 뒤집는다(mt-dl-r)
  var DELIM_SHAPE = {
    '(': 'p', ')': 'p-r', '[': 'b', ']': 'b-r', '{': 'c', '}': 'c-r', '|': 'v', '‖': 'V',
    '⌊': 'f', '⌋': 'f-r', '⌈': 'e', '⌉': 'e-r',
  };
  var DELIM_TOKEN = { '(': '(', ')': ')', '[': '[', ']': ']', '|': '|', '.': '', '/': '/' };
  var DELIM_CMD = { '{': '{', '}': '}', lbrace: '{', rbrace: '}', '|': '‖', vert: '|', Vert: '‖', langle: '⟨', rangle: '⟩', lfloor: '⌊', rfloor: '⌋', lceil: '⌈', rceil: '⌉' };

  /* ================================================================
   * TeX 낱말 나누기
   * ================================================================ */

  function texTokens(src) {
    var out = [];
    var i = 0;
    var n = src.length;
    while (i < n) {
      var c = src.charAt(i);
      if (c === '\\') {
        var j = i + 1;
        while (j < n && /[A-Za-z]/.test(src.charAt(j))) j++;
        if (j > i + 1) {
          out.push({ t: 'cmd', v: src.slice(i + 1, j), at: i });
          i = j;
        } else if (i + 1 < n) {
          out.push({ t: 'cmd', v: src.charAt(i + 1), at: i });
          i += 2;
        } else {
          out.push({ t: 'bad', v: '\\', at: i });
          i++;
        }
        continue;
      }
      // [[…]] 빈칸은 수식 안에서도 빈칸 상자 ($3+[[?]]=5$)
      if (c === '[' && src.charAt(i + 1) === '[') {
        var close = src.indexOf(']]', i + 2);
        if (close >= 0) {
          out.push({ t: 'blank', v: src.slice(i + 2, close), at: i });
          i = close + 2;
          continue;
        }
      }
      if (c === '{' || c === '}' || c === '^' || c === '_' || c === '&') {
        out.push({ t: c, at: i });
        i++;
        continue;
      }
      if (/\s/.test(c)) {
        var k = i;
        while (i < n && /\s/.test(src.charAt(i))) i++;
        out.push({ t: 'ws', at: k });
        continue;
      }
      var cp = src.codePointAt(i);
      var ch = String.fromCodePoint(cp);
      out.push({ t: 'ch', v: ch, at: i });
      i += ch.length;
    }
    return out;
  }

  /* ================================================================
   * TeX 구문 분석 → 노드 트리
   * 노드: num var text op rel ord fn space punct group frac binom sqrt scripts accent delim matrix big styled empty
   * ================================================================ */

  function Parser(src) {
    this.src = src;
    this.toks = texTokens(src);
    this.i = 0;
    this.errors = [];
  }

  Parser.prototype.peek = function () { return this.toks[this.i]; };
  // 오류는 수식 안의 위치(at)와 함께 모은다 — check 가 글 전체의 줄·칸으로 바꿔 알린다
  Parser.prototype.err = function (msg, at) {
    this.errors.push({ msg: msg, at: typeof at === 'number' ? at : this.src.length });
  };
  Parser.prototype.skipWs = function () {
    while (this.i < this.toks.length && this.toks[this.i].t === 'ws') this.i++;
  };

  // 중괄호 안의 원문 그대로 (\text{…} 처럼 띄어쓰기를 살려야 하는 곳)
  Parser.prototype.rawGroup = function (what) {
    this.skipWs();
    var t = this.peek();
    if (!t || t.t !== '{') {
      this.err(what + ' 뒤에 {…} 가 있어야 해요', t ? t.at : this.src.length);
      return '';
    }
    var start = t.at + 1;
    var depth = 0;
    for (; this.i < this.toks.length; this.i++) {
      var x = this.toks[this.i];
      if (x.t === '{') depth++;
      else if (x.t === '}') {
        depth--;
        if (depth === 0) {
          this.i++;
          return this.src.slice(start, x.at);
        }
      }
    }
    this.err(what + ' 의 { 가 닫히지 않았어요', t.at);
    return this.src.slice(start);
  };

  // 인자 하나: {…} 묶음, 글자 하나, 또는 명령 하나
  Parser.prototype.parseArg = function (what) {
    this.skipWs();
    var t = this.peek();
    if (!t || t.t === '}' || t.t === '&' || t.t === '^' || t.t === '_' ||
        (t.t === 'cmd' && (t.v === 'right' || t.v === 'end' || t.v === '\\'))) {
      this.err(what + '에 들어갈 내용이 없어요', t ? t.at : this.src.length);
      return { type: 'group', items: [] };
    }
    if (t.t === '{') {
      this.i++;
      var items = this.parseList(function (x) { return x.t === '}'; });
      if (this.peek() && this.peek().t === '}') this.i++;
      else this.err('{ 가 닫히지 않았어요', t.at);
      return { type: 'group', items: items };
    }
    var atom = this.parseAtom();
    return atom || { type: 'group', items: [] };
  };

  // 목록: stop(토큰) 이 참이면 멈춘다(그 토큰은 먹지 않는다)
  Parser.prototype.parseList = function (stop) {
    var items = [];
    while (this.i < this.toks.length) {
      var t = this.peek();
      if (stop(t)) break;
      if (t.t === '}') {
        this.err('짝이 없는 } 가 있어요', t.at);
        this.i++;
        continue;
      }
      if (t.t === '&') {
        this.err('& 는 행렬·cases 안에서만 써요', t.at);
        this.i++;
        continue;
      }
      if (t.t === '^' || t.t === '_') {
        this.i++;
        var slot = t.t === '^' ? 'sup' : 'sub';
        var arg = this.parseArg(slot === 'sup' ? '위첨자' : '아래첨자');
        while (items.length && items[items.length - 1].type === 'ws') items.pop();
        // 30^\circ → 30° (도 기호는 원래 위에 붙는 글자라 한 번 더 올리지 않는다)
        if (slot === 'sup' && isCircArg(arg)) {
          items.push({ type: 'ord', v: '°' });
          continue;
        }
        var base = items.length ? items.pop() : { type: 'empty' };
        if (base.type === 'big') {
          if (base[slot]) this.err((slot === 'sup' ? '위' : '아래') + '첨자가 두 번 붙었어요', t.at);
          base[slot] = arg;
          items.push(base);
        } else if (base.type === 'scripts') {
          if (base[slot]) this.err('첨자가 겹쳐요 — x^2^3 은 x^{2^3} 처럼 묶어 주세요', t.at);
          base[slot] = arg;
          items.push(base);
        } else {
          var s = { type: 'scripts', base: base, sup: null, sub: null };
          s[slot] = arg;
          items.push(s);
        }
        continue;
      }
      if (t.t === 'ws') {
        this.i++;
        items.push({ type: 'ws' });
        continue;
      }
      var atom = this.parseAtom();
      if (atom) items.push(atom);
    }
    return items;
  };

  Parser.prototype.parseAtom = function () {
    var t = this.peek();
    if (!t) return null;
    this.i++;
    if (t.t === '{') {
      var items = this.parseList(function (x) { return x.t === '}'; });
      if (this.peek() && this.peek().t === '}') this.i++;
      else this.err('{ 가 닫히지 않았어요', t.at);
      return { type: 'group', items: items };
    }
    if (t.t === 'bad') {
      this.err('수식 끝에 백슬래시(\\)만 있어요', t.at);
      return null;
    }
    if (t.t === 'ch') return charNode(t.v);
    if (t.t === 'blank') return { type: 'blank', v: t.v };
    if (t.t !== 'cmd') return null;
    return this.parseCommand(t);
  };

  function isCircArg(a) {
    if (a.type === 'op') return a.v === '∘';
    if (a.type !== 'group') return false;
    var xs = a.items.filter(function (x) { return x.type !== 'ws'; });
    return xs.length === 1 && xs[0].type === 'op' && xs[0].v === '∘';
  }

  function charNode(ch) {
    if (/[0-9.]/.test(ch)) return { type: 'num', v: ch };
    if (/[A-Za-z]/.test(ch)) return { type: 'var', v: ch };
    if (hasOwn(UNI_REL, ch)) return { type: 'rel', v: UNI_REL[ch] };
    if (hasOwn(UNI_OP, ch)) return { type: 'op', v: UNI_OP[ch], raw: ch };
    if (ch === '(' || ch === '[') return { type: 'punct', v: ch, open: true };
    if (ch === ')' || ch === ']') return { type: 'punct', v: ch, close: true };
    if (ch === ':') return { type: 'rel', v: ':' }; // 비 3 : 4 — TeX 처럼 관계 기호 간격
    if (ch === '|' || ch === ',' || ch === ';' || ch === '!' || ch === '?' || ch === '/') return { type: 'punct', v: ch };
    if (ch === "'") return { type: 'ord', v: '′' };
    if (ch === '~') return { type: 'space', v: 'med' };
    if (/[α-ωΑ-Ω]/.test(ch)) return { type: 'var', v: ch };
    return { type: 'text', v: ch };
  }

  Parser.prototype.parseCommand = function (t) {
    var v = t.v;
    var self = this;
    if (v === 'frac' || v === 'dfrac' || v === 'tfrac' || v === 'cfrac') {
      return { type: 'frac', num: this.parseArg('\\' + v + ' 의 분자'), den: this.parseArg('\\' + v + ' 의 분모') };
    }
    if (v === 'binom' || v === 'dbinom' || v === 'tbinom') {
      return { type: 'binom', num: this.parseArg('\\binom 의 위'), den: this.parseArg('\\binom 의 아래') };
    }
    if (v === 'sqrt') {
      var index = null;
      this.skipWs();
      var p = this.peek();
      if (p && p.t === 'ch' && p.v === '[') {
        this.i++;
        index = { type: 'group', items: this.parseList(function (x) { return x.t === 'ch' && x.v === ']'; }) };
        if (this.peek() && this.peek().t === 'ch' && this.peek().v === ']') this.i++;
        else this.err('\\sqrt[ 의 ] 가 없어요', p.at);
      }
      return { type: 'sqrt', index: index, rad: this.parseArg('\\sqrt 의 안') };
    }
    if (hasOwn(ACCENT, v)) return { type: 'accent', kind: ACCENT[v], body: this.parseArg('\\' + v + ' 의 안') };
    if (hasOwn(TEXTCMD, v)) return { type: 'styled', style: TEXTCMD[v], text: this.rawGroup('\\' + v) };
    if (v === 'left') return this.parseLeftRight(t);
    if (v === 'right') {
      this.err('\\right 의 짝 \\left 가 없어요', t.at);
      this.readDelim();
      return null;
    }
    if (v === 'begin') return this.parseEnv(t);
    if (v === 'end') {
      this.err('\\end 의 짝 \\begin 이 없어요', t.at);
      this.rawGroup('\\end');
      return null;
    }
    if (v === '\\') return { type: 'space', v: 'med' }; // 환경 밖 줄바꿈은 띄어쓰기로
    if (hasOwn(REL, v)) return { type: 'rel', v: REL[v] };
    if (hasOwn(OP, v)) return { type: 'op', v: OP[v] };
    if (hasOwn(ORD, v)) return { type: 'ord', v: ORD[v] };
    if (hasOwn(ESC_CHAR, v)) return { type: 'ord', v: ESC_CHAR[v] };
    if (hasOwn(GREEK, v)) return { type: 'var', v: GREEK[v], greek: true, upright: /^[A-Z]/.test(v) };
    if (hasOwn(FN, v)) return { type: 'fn', v: v };
    if (hasOwn(BIG, v)) return { type: 'big', v: v, sym: BIG[v], sub: null, sup: null };
    if (hasOwn(SPACE, v)) return { type: 'space', v: SPACE[v] };
    if (hasOwn(SIZING, v)) return null; // 크기 명령은 무시(화면이 알아서 맞춘다)
    if (v === 'not') {
      var nx = this.parseAtom();
      if (nx && nx.type === 'rel') return { type: 'rel', v: nx.v + '̸' };
      return nx;
    }
    this.err('모르는 TeX 명령이 있어요: \\' + v, t.at);
    return { type: 'text', v: '\\' + v };
  };

  // \left 나 \right 뒤의 괄호 하나
  Parser.prototype.readDelim = function () {
    this.skipWs();
    var t = this.peek();
    if (!t) return null;
    if (t.t === 'ch' && hasOwn(DELIM_TOKEN, t.v)) {
      this.i++;
      return t.v === '.' ? '' : t.v;
    }
    if (t.t === 'cmd' && hasOwn(DELIM_CMD, t.v)) {
      this.i++;
      return DELIM_CMD[t.v];
    }
    this.err('\\left·\\right 뒤에는 괄호가 와야 해요', t.at);
    return null;
  };

  Parser.prototype.parseLeftRight = function (t) {
    var open = this.readDelim();
    var body = this.parseList(function (x) { return x.t === 'cmd' && x.v === 'right'; });
    var close = '';
    if (this.peek() && this.peek().t === 'cmd' && this.peek().v === 'right') {
      this.i++;
      close = this.readDelim();
    } else {
      this.err('\\left 의 짝 \\right 가 없어요', t.at);
    }
    return { type: 'delim', open: open || '', close: close || '', body: body };
  };

  Parser.prototype.parseEnv = function (t) {
    var name = this.rawGroup('\\begin').trim();
    if (!hasOwn(ENVS, name)) {
      this.err('모르는 환경이에요: \\begin{' + name + '}', t.at);
    }
    if (name === 'array') this.rawGroup('\\begin{array} 의 칸 정렬'); // {cc} 같은 칸 정렬은 읽고 버린다
    var rows = [];
    var row = [];
    var ended = false;
    while (this.i < this.toks.length) {
      var cell = this.parseList(function (x) {
        return x.t === '&' || (x.t === 'cmd' && (x.v === '\\' || x.v === 'end'));
      });
      row.push(cell);
      var s = this.peek();
      if (!s) break;
      this.i++;
      if (s.t === '&') continue;
      if (s.t === 'cmd' && s.v === '\\') {
        rows.push(row);
        row = [];
        continue;
      }
      if (s.t === 'cmd' && s.v === 'end') {
        var endName = this.rawGroup('\\end').trim();
        if (endName !== name) this.err('\\begin{' + name + '} 를 \\end{' + endName + '} 로 닫았어요', s.at);
        ended = true;
        break;
      }
    }
    if (!ended) this.err('\\begin{' + name + '} 의 짝 \\end{' + name + '} 가 없어요', t.at);
    // 마지막 줄이 \\ 로 끝나 생긴 빈 줄은 버린다
    if (row.length && !(row.length === 1 && isBlank(row[0]))) rows.push(row);
    return { type: 'matrix', kind: hasOwn(ENVS, name) ? ENVS[name] : 'n', rows: rows };
  };

  function isBlank(items) {
    for (var i = 0; i < items.length; i++) if (items[i].type !== 'ws') return false;
    return true;
  }

  function parseTex(src) {
    var p = new Parser(String(src));
    var items = p.parseList(function () { return false; });
    return { items: items, errors: p.errors };
  }

  /* ================================================================
   * 노드 → HTML
   * ================================================================ */

  // 늘어나는 괄호 하나
  // 늘어나는 괄호 하나 — 빈 상자를 CSS 테두리로 그려 내용 높이만큼 늘인다. 중괄호는 네 조각이라 안에 상자 하나를 더 둔다
  function delimHtml(d) {
    if (!d) return '';
    var shape = DELIM_SHAPE[d];
    if (!shape) return '<span class="mt-dl mt-dl-ch">' + esc(d) + '</span>';
    var k = shape.charAt(0);
    return '<span class="mt-dl mt-dl-' + k + (shape.length > 1 ? ' mt-dl-r' : '') + '" aria-hidden="true">' +
      (k === 'c' ? '<span></span>' : '') + '</span>';
  }

  // 근호 √ — 꺾인 선을 CSS 그라디언트로 그려 근호 안 높이에 맞춰 늘인다. 윗줄은 .mt-rad 의 border-top
  var RADICAL = '<span class="mt-rsym" aria-hidden="true"></span>';

  // 높이가 있는 노드(분수·행렬 …)가 들었는지 — 괄호 크기와 세로 정렬에 쓴다
  function isTall(n) {
    if (!n) return false;
    switch (n.type) {
      case 'frac': case 'binom': case 'matrix': return true;
      case 'big': return n.v !== 'lim' && !!(n.sub || n.sup);
      case 'group': return n.items.some(isTall);
      case 'delim': return n.body.some(isTall);
      case 'scripts': return isTall(n.base) || isTall(n.sup) || isTall(n.sub);
      case 'sqrt': return isTall(n.rad);
      case 'accent': return isTall(n.body);
    }
    return false;
  }

  function isTextish(n) { return !!n && (n.type === 'text' || n.type === 'styled'); }

  function renderArg(a) { return a.type === 'group' ? renderList(a.items) : renderNode(a); }

  function renderList(items) {
    var out = '';
    var prev = null; // 앞 노드 — 단항 부호(−3)를 가린다
    for (var i = 0; i < items.length; i++) {
      var n = items[i];
      if (n.type === 'ws') {
        // TeX 은 수식 안 띄어쓰기를 무시한다. 한글 낱말 사이만 살린다
        if (isTextish(items[i - 1]) && isTextish(items[i + 1])) out += ' ';
        continue;
      }
      if (n.type === 'text') {
        // 이어진 한글·기타 글자는 한 덩어리로 (띄어쓰기 포함)
        var buf = n.v;
        while (i + 1 < items.length && (items[i + 1].type === 'text' ||
          (items[i + 1].type === 'ws' && items[i + 2] && items[i + 2].type === 'text'))) {
          i++;
          buf += items[i].type === 'ws' ? ' ' : items[i].v;
        }
        out += '<span class="mt-text">' + esc(buf) + '</span>';
        prev = n;
        continue;
      }
      if (n.type === 'punct' && n.v === ',' && isThousands(items, i)) {
        out += ','; // 1,000 의 자릿점은 띄우지 않는다
        continue;
      }
      if (n.type === 'rel' && !prev) {
        // 맨 앞 관계 기호(∴ x=2, → 뒤 글)는 왼쪽을 띄우지 않는다
        out += '<span class="mt-rel mt-l0">' + esc(n.v) + '</span>';
        prev = n;
        continue;
      }
      if (n.type === 'op') {
        var unary = !prev || prev.type === 'op' || prev.type === 'rel' || prev.type === 'big' ||
          (prev.type === 'punct' && (prev.open || prev.v === ',' || prev.v === ';'));
        out += '<span class="mt-op' + (unary ? ' mt-un' : '') + '">' + esc(n.v) + '</span>';
        prev = n;
        continue;
      }
      // 함수 이름·큰 연산자 앞뒤는 TeX 처럼 조금 띄운다: 2 sin x, sin x (단 sin(x) 는 붙인다)
      var op = isFnLike(n) || n.type === 'big';
      if (op && isOrdLike(prev)) out += THIN;
      out += renderNode(n);
      if (op) {
        var next = nextSolid(items, i);
        if (isOrdLike(next) || isFnLike(next) || (next && next.type === 'big')) out += THIN;
      }
      prev = n;
    }
    return out;
  }

  var THIN = '<span class="mt-sp mt-sp-thin"></span>';
  function isDigitNode(n) { return !!n && n.type === 'num' && n.v !== '.'; }
  // 숫자 사이 쉼표 뒤에 숫자가 정확히 세 개면 자릿점(1,000). 좌표 (1, 2) 의 쉼표와 구별한다
  function isThousands(items, i) {
    return isDigitNode(items[i - 1]) && isDigitNode(items[i + 1]) && isDigitNode(items[i + 2]) &&
      isDigitNode(items[i + 3]) && !isDigitNode(items[i + 4]);
  }
  function nextSolid(items, i) {
    for (var j = i + 1; j < items.length; j++) if (items[j].type !== 'ws') return items[j];
    return null;
  }
  function isFnLike(n) { return !!n && (n.type === 'fn' || (n.type === 'scripts' && n.base.type === 'fn')); }
  // 글자처럼 다루는 덩어리(띄어쓰기 판단용)
  function isOrdLike(n) {
    if (!n) return false;
    switch (n.type) {
      case 'num': case 'var': case 'ord': case 'frac': case 'binom': case 'sqrt': case 'group': case 'delim':
      case 'accent': case 'styled': case 'matrix': case 'blank': return true;
      case 'punct': return !!n.close;
      case 'scripts': return !isFnLike(n);
    }
    return false;
  }

  function renderNode(n) {
    switch (n.type) {
      case 'num': return esc(n.v);
      case 'var': return n.upright ? '<span class="mt-up">' + esc(n.v) + '</span>' : '<i class="mt-v">' + esc(n.v) + '</i>';
      case 'rel': return '<span class="mt-rel">' + esc(n.v) + '</span>';
      case 'op': return '<span class="mt-op">' + esc(n.v) + '</span>';
      case 'ord': return '<span class="mt-ord">' + esc(n.v) + '</span>';
      case 'fn': return '<span class="mt-fn">' + esc(n.v) + '</span>';
      case 'space': return '<span class="mt-sp mt-sp-' + n.v + '"></span>';
      case 'punct': return n.v === ',' || n.v === ';' ? '<span class="mt-punct">' + n.v + '</span>' : esc(n.v);
      case 'text': return '<span class="mt-text">' + esc(n.v) + '</span>';
      case 'styled':
        return '<span class="mt-text' + (n.style === 'bf' ? ' mt-bf' : n.style === 'it' ? ' mt-it' : n.style === 'rm' ? ' mt-rm' : '') + '">' + esc(n.text) + '</span>';
      case 'group': return renderList(n.items);
      case 'empty': return '';
      case 'frac':
        return '<span class="mt-frac"><span class="mt-num">' + renderArg(n.num) + '</span><span class="mt-den">' + renderArg(n.den) + '</span></span>';
      case 'binom':
        return '<span class="mt-delim mt-tall">' + delimHtml('(') +
          '<span class="mt-dbody"><span class="mt-frac mt-nobar"><span class="mt-num">' + renderArg(n.num) + '</span><span class="mt-den">' + renderArg(n.den) + '</span></span></span>' +
          delimHtml(')') + '</span>';
      case 'sqrt':
        return '<span class="mt-sqrt">' + (n.index ? '<span class="mt-idx">' + renderArg(n.index) + '</span>' : '') +
          RADICAL + '<span class="mt-rad">' + renderArg(n.rad) + '</span></span>';
      case 'scripts': return renderScripts(n);
      case 'accent': return renderAccent(n);
      case 'blank': return blankHtml(n.v);
      case 'delim':
        // 내용이 한 줄 높이면 보통 괄호 글자 — 늘어나는 괄호는 분수·행렬처럼 높은 내용에만
        if (!n.body.some(isTall)) {
          return '<span class="mt-delim">' + esc(n.open) + '<span class="mt-dbody">' + renderList(n.body) + '</span>' + esc(n.close) + '</span>';
        }
        return '<span class="mt-delim mt-tall">' + delimHtml(n.open) +
          '<span class="mt-dbody">' + renderList(n.body) + '</span>' + delimHtml(n.close) + '</span>';
      case 'matrix': return renderMatrix(n);
      case 'big': return renderBig(n);
    }
    return '';
  }

  function renderScripts(n) {
    var base = n.base.type === 'empty' ? '' : renderArg(n.base);
    // 밑이 높으면(분수·큰 괄호) 첨자를 더 올리고 내린다
    var hi = isTall(n.base) ? ' mt-hi' : '';
    if (n.sup && n.sub) {
      return base + '<span class="mt-supsub' + hi + '"><span class="mt-sup">' + renderArg(n.sup) + '</span><span class="mt-sub">' + renderArg(n.sub) + '</span></span>';
    }
    if (n.sup) return base + '<span class="mt-sup' + hi + '">' + renderArg(n.sup) + '</span>';
    return base + '<span class="mt-sub' + hi + '">' + renderArg(n.sub) + '</span>';
  }

  function renderAccent(n) {
    var body = renderArg(n.body);
    switch (n.kind) {
      case 'ol': case 'bar': return '<span class="mt-ol">' + body + '</span>';
      case 'ul': return '<span class="mt-ul">' + body + '</span>';
      // 화살표·호는 빈 상자(mt-acc-mark)를 CSS 로 그린다 — 글자 폭만큼 늘어난다
      case 'vec': return '<span class="mt-acc mt-vec"><span class="mt-acc-mark" aria-hidden="true"></span>' + body + '</span>';
      case 'arc': return '<span class="mt-acc mt-arc"><span class="mt-acc-mark" aria-hidden="true"></span>' + body + '</span>';
      case 'hat': return '<span class="mt-acc"><span class="mt-acc-mark mt-acc-ch" aria-hidden="true">^</span>' + body + '</span>';
      case 'dot': return '<span class="mt-acc"><span class="mt-acc-mark mt-acc-ch" aria-hidden="true">˙</span>' + body + '</span>';
    }
    return body;
  }

  function renderMatrix(n) {
    var cols = 1;
    n.rows.forEach(function (r) { if (r.length > cols) cols = r.length; });
    var cells = '';
    n.rows.forEach(function (r) {
      for (var c = 0; c < cols; c++) cells += '<span class="mt-cell">' + (r[c] ? renderList(r[c]) : '') + '</span>';
    });
    var cases = n.kind === 'cases';
    var grid = '<span class="mt-grid' + (cases ? ' mt-grid-cases' : '') + '" style="grid-template-columns:repeat(' + cols + ',auto)">' + cells + '</span>';
    var open = '';
    var close = '';
    if (n.kind === 'p') { open = '('; close = ')'; }
    else if (n.kind === 'b') { open = '['; close = ']'; }
    else if (n.kind === 'v') { open = '|'; close = '|'; }
    else if (n.kind === 'B') { open = '{'; close = '}'; }
    else if (cases) { open = '{'; }
    var cls = cases ? 'mt-cases' : 'mt-mat mt-mat-' + n.kind;
    return '<span class="mt-delim mt-tall ' + cls + '">' + delimHtml(open) + grid + delimHtml(close) + '</span>';
  }

  function renderBig(n) {
    var sup = n.sup ? renderArg(n.sup) : '';
    var sub = n.sub ? renderArg(n.sub) : '';
    var over = n.sup ? '<span class="mt-over">' + sup + '</span>' : '';
    var under = n.sub ? '<span class="mt-under">' + sub + '</span>' : '';
    if (n.v === 'lim') {
      return '<span class="mt-big mt-lim">' + over + '<span class="mt-sym mt-fn">lim</span>' + under + '</span>';
    }
    // 적분은 교과서처럼 위끝·아래끝을 기호 오른쪽 위·아래에 (같은 구조, CSS 배치만 다르다)
    var kind = n.v === 'int' || n.v === 'iint' || n.v === 'oint' ? ' mt-int' : '';
    return '<span class="mt-big' + kind + (over || under ? '' : ' mt-bare') + '">' + over +
      '<span class="mt-sym">' + esc(n.sym) + '</span>' + under + '</span>';
  }

  // 빈칸 상자: 안 글자는 보이지 않고 칸 길이만 (한글·전각은 2칸으로 센다)
  function blankHtml(inner) {
    if (inner.trim() === '?') return '<span class="rt-blank rt-q">?</span>';
    var w = Math.max(3, Math.min(24, visualLength(texPlainLoose(inner)) + 1));
    return '<span class="rt-blank" aria-label="빈칸" style="--w:' + w + 'ch" role="img"></span>';
  }

  // 빈칸 안 글자 수를 셀 때만 쓴다: $…$ 가 섞여 있으면 수식을 평문으로 바꿔 센다
  function texPlainLoose(s) {
    return String(s).replace(/\$([^$]*)\$/g, function (m, t) { return texPlain(t); });
  }

  // 수식 하나 → HTML (화면이 읽는 평문은 aria-label 로)
  // display: 가운데 블록(.mt-block) 안의 수식 — 줄을 나누지 않고 가로로 스크롤한다
  function texHtml(src, display) {
    var parsed = parseTex(src);
    var label = tidy(plainList(parsed.items));
    // 짧은 수식(x = 2)은 통째로 다음 줄로 넘긴다 — 아이들이 읽기에 한 덩어리가 낫다
    var chunks = display || label.length < 16 ? [] : splitAtRel(parsed.items);
    var body = chunks.length > 1
      ? '<span class="mt-in mt-wrap" aria-hidden="true">' + chunks.map(function (c) {
        return '<span class="mt-c">' + renderList(c) + '</span>';
      }).join('<wbr>') + '</span>'
      : '<span class="mt-in" aria-hidden="true">' + renderList(parsed.items) + '</span>';
    return '<span class="mt' + (display ? ' mt-disp' : '') + '" role="math" aria-label="' + esc(label) + '">' + body + '</span>';
  }

  // 긴 한 줄 수식은 맨 바깥 관계 기호(=, <, ≤ …) 뒤에서 줄을 바꿀 수 있게 덩어리로 나눈다 (좁은 화면).
  // 관계 기호 사이 덩어리도 길면(평문 BIN_SPLIT 글자 넘게) 괄호 밖의 덧셈·뺄셈 기호 뒤에서 한 번 더 나눈다.
  // 곱(2·x·y)·괄호 안·부호(단항 −)에서는 나누지 않는다 — 아이들이 읽기에 한 항은 한 덩어리가 낫다
  var BIN_SPLIT = 16;
  var BIN_BREAK = { '+': 1, '−': 1, '-': 1, '±': 1, '∓': 1 };
  function splitAtRel(items) {
    var chunks = [];
    var cur = [];
    for (var i = 0; i < items.length; i++) {
      cur.push(items[i]);
      if (items[i].type === 'rel' && items[i].v !== ':' && nextSolid(items, i)) {
        splitAtBin(cur, chunks);
        cur = [];
      }
    }
    if (cur.length && !isBlank(cur)) splitAtBin(cur, chunks);
    return chunks;
  }
  function isCloser(n) {
    return (n.type === 'punct' && !!n.close) || (n.type === 'scripts' && !!n.base && n.base.type === 'punct' && !!n.base.close);
  }
  function splitAtBin(list, chunks) {
    if (tidy(plainList(list)).replace(/\s+/g, '').length <= BIN_SPLIT) { chunks.push(list); return; }
    var cur = [], depth = 0, prev = null;
    for (var i = 0; i < list.length; i++) {
      var n = list[i];
      cur.push(n);
      if (n.type === 'punct' && n.open) depth++;
      else if (isCloser(n)) depth = Math.max(0, depth - 1);
      else if (depth === 0 && n.type === 'op' && hasOwn(BIN_BREAK, n.v) && prev &&
        prev.type !== 'op' && prev.type !== 'rel' && prev.type !== 'big' && !(prev.type === 'punct' && !isCloser(prev)) &&
        nextSolid(list, i)) {
        chunks.push(cur);
        cur = [];
      }
      if (n.type !== 'ws') prev = n;
    }
    if (cur.length && !isBlank(cur)) chunks.push(cur);
  }

  /* ================================================================
   * 노드 → 평문 (검색 색인·aria-label·검토 도구)
   * ================================================================ */

  var SUP_CH = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', n: 'ⁿ' };
  var SUB_CH = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };

  function wrapPlain(s) {
    s = String(s).trim();
    return /^[−-]?[0-9A-Za-z.α-ωΑ-Ω′²³√]+$/.test(s) ? s : '(' + s + ')';
  }
  function plainArg(a) { return a.type === 'group' ? plainList(a.items) : plainNode(a); }

  function plainList(items) {
    var out = '';
    var prev = null;
    for (var i = 0; i < items.length; i++) {
      var n = items[i];
      if (n.type === 'ws') {
        if (isTextish(items[i - 1]) && isTextish(items[i + 1])) out += ' ';
        continue;
      }
      var s = n.type === 'punct' && n.v === ',' && isThousands(items, i) ? ',' : plainNode(n);
      if (n.type === 'frac' && /\d$/.test(out)) out += ' '; // 대분수 2 1/3
      // 함수 이름 앞뒤 띄어쓰기: 2 sin x, log₂ 8 (sin(x) 는 붙인다)
      if (isFnLike(n) && /[0-9A-Za-z)]$/.test(out)) out += ' ';
      if (isFnLike(prev) && s && !/^[(\s]/.test(s)) out += ' ';
      out += s;
      prev = n;
    }
    return out;
  }

  function plainNode(n) {
    switch (n.type) {
      case 'num': case 'var': case 'text': case 'ord': case 'fn': return n.v;
      case 'op': return n.v;
      case 'rel': return ' ' + n.v + ' ';
      case 'punct': return n.v === ',' ? ', ' : n.v;
      case 'space': return ' ';
      case 'styled': return n.text;
      case 'group': return plainList(n.items);
      case 'empty': return '';
      case 'frac': return wrapPlain(plainArg(n.num)) + '/' + wrapPlain(plainArg(n.den));
      case 'binom': return 'C(' + plainArg(n.num) + ', ' + plainArg(n.den) + ')';
      case 'sqrt': {
        var idx = n.index ? plainArg(n.index).trim() : '';
        var sym = idx === '3' ? '∛' : idx === '4' ? '∜' : idx ? idx + '제곱근 ' : '√';
        return sym + wrapPlain(plainArg(n.rad));
      }
      case 'scripts': {
        var out = plainArg(n.base);
        if (n.sub) {
          var sb = plainArg(n.sub).trim();
          out += /^\d+$/.test(sb) ? sb.split('').map(function (c) { return SUB_CH[c]; }).join('') : '_' + wrapPlain(sb);
        }
        if (n.sup) {
          var sp = plainArg(n.sup).trim();
          out += sp.length === 1 && hasOwn(SUP_CH, sp) ? SUP_CH[sp] : '^' + wrapPlain(sp);
        }
        return out;
      }
      case 'accent': return plainArg(n.body);
      // 빈칸 안 글자(정답)는 평문에도 내지 않는다. tidy 가 괄호 안 공백을 지우지 않게 자리표로 두었다가 바꾼다
      case 'blank': return n.v.trim() === '?' ? '□' : BLANK_MARK;
      case 'delim': return (n.open || '') + plainList(n.body) + (n.close || '');
      case 'matrix': {
        var rows = n.rows.map(function (r) { return r.map(plainList).map(tidy).join(', '); });
        return n.kind === 'cases' ? '{ ' + rows.join(', ') + ' }' : '[' + rows.join('; ') + ']';
      }
      case 'big': {
        // 위끝·아래끝은 붙여 쓴다: ∑[k=1~n] k, ∫[0~2] 3x², lim(x→0)
        var sub = n.sub ? tidy(plainArg(n.sub)).replace(/ /g, '') : '';
        var sup = n.sup ? tidy(plainArg(n.sup)).replace(/ /g, '') : '';
        if (n.v === 'lim') return 'lim' + (sub ? '(' + sub + ')' : '') + ' ';
        return n.sym + (sub || sup ? '[' + sub + (sup ? '~' + sup : '') + '] ' : '');
      }
    }
    return '';
  }

  var BLANK_MARK = '';
  function tidy(s) {
    return String(s).replace(/[ \t]+/g, ' ').replace(/\( /g, '(').replace(/ \)/g, ')').trim()
      .replace(//g, '(   )');
  }

  function texPlain(src) { return tidy(plainList(parseTex(src).items)); }

  /* ================================================================
   * 글을 수식 구간과 글 구간으로 나누기
   * \$ 는 글자 $ . 수식 안의 \$ 는 수식을 닫지 않는다.
   * ================================================================ */

  function splitMath(s) {
    var out = [];
    var buf = '';
    var i = 0;
    var n = s.length;
    while (i < n) {
      var c = s.charAt(i);
      if (c === '\\' && s.charAt(i + 1) === '$') { buf += '$'; i += 2; continue; }
      if (c === '$') {
        var j = i + 1;
        var found = -1;
        while (j < n) {
          var d = s.charAt(j);
          if (d === '\\') { j += 2; continue; }
          if (d === '$') { found = j; break; }
          j++;
        }
        if (buf) { out.push({ t: 'text', v: buf }); buf = ''; }
        if (found < 0) {
          out.push({ t: 'unclosed', at: i });
          buf = s.slice(i); // 닫히지 않은 $ 부터 끝까지는 글자 그대로
          i = n;
          break;
        }
        out.push({ t: 'math', v: s.slice(i + 1, found), at: i });
        i = found + 1;
        continue;
      }
      buf += c;
      i++;
    }
    if (buf) out.push({ t: 'text', v: buf });
    return out;
  }

  /* ================================================================
   * 서식 글 (마크다운 일부) → HTML
   * ================================================================ */

  // 자리표: 수식·빈칸을 잠시 사용자 영역 글자(U+E000~E003)로 바꿔 두고, 굵게·밑줄을 처리한 뒤 되돌린다
  var PH_OPEN = '\uE000';
  var PH_CLOSE = '\uE001';
  var PH_RE = /\uE000(\d+)\uE001/g;
  var PB_OPEN = '\uE002';
  var PB_CLOSE = '\uE003';
  var PB_RE = /\uE002(\d+)\uE003/g;
  var PH_ANY = /[\uE000-\uE003]/g;

  // 화면에서 차지하는 너비(한글·전각은 2칸)
  function visualLength(s) {
    var w = 0;
    for (var i = 0; i < s.length; i++) w += /[\u1100-\u11ff\u3000-\u9fff\uac00-\ud7a3\uff00-\uffef]/.test(s.charAt(i)) ? 2 : 1;
    return w;
  }

  // 한 줄 서식: 수식, **굵게**, __밑줄__, [[빈칸]], 줄바꿈
  function inlineHtml(raw) {
    var maths = [];
    var plains = [];
    var blanks = [];
    var text = '';
    // 입력에 자리표 글자가 섞여 있으면 지운다(수식 자리를 흉내 낼 수 없게)
    splitMath(String(raw).replace(PH_ANY, '')).forEach(function (g) {
      if (g.t === 'math') {
        maths.push(g.v.trim() ? texHtml(g.v) : '');
        plains.push(texPlain(g.v));
        text += PH_OPEN + (maths.length - 1) + PH_CLOSE;
      } else if (g.t === 'text') {
        text += g.v;
      }
    });
    text = text.replace(/\[\[([^\]\n]*)\]\]/g, function (m, inner) {
      blanks.push(blankHtml(inner.replace(PH_RE, function (x, k) { return plains[+k]; })));
      return PB_OPEN + (blanks.length - 1) + PB_CLOSE;
    });
    // ___ (밑줄 세 개 이상)은 영어 학습지의 빈칸 선 — 밑줄 표시(__…__)로 읽지 않는다
    text = text.replace(/_{3,}/g, function (m) {
      blanks.push('<span class="rt-line" role="img" aria-label="빈칸" style="--w:' + Math.max(3, Math.min(12, m.length)) + 'ch"></span>');
      return PB_OPEN + (blanks.length - 1) + PB_CLOSE;
    });
    var h = esc(text);
    h = h.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/__([\s\S]+?)__/g, '<u class="rt-u">$1</u>');
    h = h.replace(/\n/g, '<br>');
    h = h.replace(PB_RE, function (m, k) { return blanks[+k]; });
    h = h.replace(PH_RE, function (m, k) { return maths[+k]; });
    return h;
  }

  // 표: | 로 칸을 나누되 수식 안의 | 는 나누지 않는다
  function splitCells(line) {
    var s = line.trim();
    if (s.charAt(0) === '|') s = s.slice(1);
    if (s.charAt(s.length - 1) === '|' && s.charAt(s.length - 2) !== '\\') s = s.slice(0, -1);
    var cells = [];
    var buf = '';
    var inMath = false;
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if (c === '\\' && i + 1 < s.length) {
        if (!inMath && s.charAt(i + 1) === '|') { buf += '|'; i++; continue; } // \| 는 글자 |
        buf += c + s.charAt(i + 1);
        i++;
        continue;
      }
      if (c === '$') inMath = !inMath;
      if (c === '|' && !inMath) { cells.push(buf.trim()); buf = ''; continue; }
      buf += c;
    }
    cells.push(buf.trim());
    return cells;
  }

  var SEP_RE = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

  function alignOf(cell) {
    var c = cell.trim();
    if (/^:-+:$/.test(c)) return 'center';
    if (/^-+:$/.test(c)) return 'right';
    if (/^:-+$/.test(c)) return 'left';
    return '';
  }
  function alignAttr(a) { return a ? ' style="text-align:' + a + '"' : ''; }

  function tableHtml(rows) {
    var head = null;
    var body = rows;
    var aligns = [];
    if (rows.length >= 2 && SEP_RE.test(rows[1])) {
      head = splitCells(rows[0]);
      aligns = splitCells(rows[1]).map(alignOf);
      body = rows.slice(2);
    }
    var out = '<div class="rt-tablewrap"><table class="rt-table">';
    if (head) {
      out += '<thead><tr>' + head.map(function (c, k) { return '<th' + alignAttr(aligns[k]) + '>' + inlineHtml(c) + '</th>'; }).join('') + '</tr></thead>';
    }
    out += '<tbody>' + body.map(function (r) {
      return '<tr>' + splitCells(r).map(function (c, k) { return '<td' + alignAttr(aligns[k]) + '>' + inlineHtml(c) + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
    return out;
  }

  var UL_RE = /^\s*[-*]\s+/;
  var OL_RE = /^\s*\d{1,3}\.\s+/; // '1)' 은 글자 그대로 둔다(문제 번호·국어 표기)
  var H_RE = /^\s*#{1,6}\s+(.*)$/;
  function isUl(l) { return UL_RE.test(l) && !/^\s*\*\*/.test(l); } // "**굵게**" 로 시작하는 줄은 목록이 아니다
  function isBlockStart(l) { return /^\s*(#{1,6}\s|>|\|)/.test(l) || OL_RE.test(l) || isUl(l); }
  function li(x) { return '<li>' + inlineHtml(x) + '</li>'; }

  // 수식 하나뿐인 문단인가 ($…$ 만)
  function onlyMath(p) {
    var segs = splitMath(p.trim());
    return segs.length === 1 && segs[0].t === 'math' && segs[0].v.trim() ? segs[0].v : null;
  }

  function render(src) {
    if (src === null || src === undefined) return '<div class="rt"></div>';
    var lines = String(src).replace(/\r\n?/g, '\n').split('\n');
    var html = '';
    var i = 0;
    var m;
    while (i < lines.length) {
      var line = lines[i];
      if (!line.trim()) { i++; continue; }
      if ((m = H_RE.exec(line))) {
        html += '<h4 class="rt-h">' + inlineHtml(m[1]) + '</h4>';
        i++;
        continue;
      }
      if (isUl(line)) {
        var items = [];
        while (i < lines.length && isUl(lines[i])) { items.push(lines[i].replace(UL_RE, '')); i++; }
        html += '<ul>' + items.map(li).join('') + '</ul>';
        continue;
      }
      if (OL_RE.test(line)) {
        var start = parseInt(/^\s*(\d+)/.exec(line)[1], 10);
        var oitems = [];
        while (i < lines.length && OL_RE.test(lines[i])) { oitems.push(lines[i].replace(OL_RE, '')); i++; }
        html += '<ol' + (start !== 1 ? ' start="' + start + '"' : '') + '>' + oitems.map(li).join('') + '</ol>';
        continue;
      }
      if (/^\s*>/.test(line)) {
        var q = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
        html += '<div class="rt-box">' + inlineHtml(q.join('\n')) + '</div>';
        continue;
      }
      if (/^\s*\|/.test(line)) {
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(lines[i]); i++; }
        html += tableHtml(rows);
        continue;
      }
      var para = [line];
      i++;
      while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) { para.push(lines[i]); i++; }
      // 줄마다 수식 하나뿐이면(풀이 단계를 줄줄이 쓴 것) 줄마다 가운데 블록
      var texs = para.map(onlyMath);
      if (texs.every(function (x) { return x !== null; })) {
        html += texs.map(function (x) { return '<div class="mt-block">' + texHtml(x, true) + '</div>'; }).join('');
      } else {
        html += '<p>' + inlineHtml(para.join('\n')) + '</p>';
      }
    }
    return '<div class="rt">' + html + '</div>';
  }

  function inline(src) {
    if (src === null || src === undefined) return '<span class="rt-inline"></span>';
    return '<span class="rt-inline">' + inlineHtml(String(src).replace(/\r\n?/g, '\n')) + '</span>';
  }

  function tex(src) { return texHtml(String(src === null || src === undefined ? '' : src)); }

  /* ================================================================
   * 평문
   * ================================================================ */

  function inlinePlain(raw) {
    return splitMath(raw).map(function (g) {
      if (g.t === 'math') return texPlain(g.v);
      if (g.t === 'text') {
        return g.v.replace(/\[\[\?\]\]/g, '□').replace(/\[\[[^\]]*\]\]/g, '(   )').replace(/\*\*/g, '').replace(/__/g, '');
      }
      return '';
    }).join('');
  }

  function plain(src) {
    if (src === null || src === undefined) return '';
    var out = [];
    String(src).replace(/\r\n?/g, '\n').split('\n').forEach(function (line) {
      if (/\|/.test(line) && SEP_RE.test(line)) return; // 표 구분선
      var l = line.replace(/^\s*###\s+/, '').replace(/^\s*>\s?/, '').replace(OL_RE, '');
      if (isUl(l)) l = l.replace(UL_RE, '');
      if (/^\s*\|/.test(l)) l = splitCells(l).join(' · ');
      out.push(inlinePlain(l));
    });
    return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  /* ================================================================
   * 검사 — 학습 내용 검사기가 모든 서식 글에 돌린다
   * ================================================================ */

  // \n 을 뺀 제어 문자: JS 문자열에 백슬래시를 하나만 쓴 TeX 명령의 흔적 (\f rac, \t imes, \r ightarrow, \b eta, \v ec)
  var CTRL_RE = /[\u0000-\u0009\u000b-\u001f\u007f]/;
  // 백슬래시가 빠져 글자로 남은 명령 이름 ("\sqrt" 가 JS 에서 "sqrt" 가 된 것 등)
  var BARE_RE = /(^|[^\\A-Za-z])(frac|dfrac|sqrt|times|div|cdot|left|right|begin|end|mathrm|text|overline|overrightarrow|infty|angle|triangle|alpha|beta|gamma|theta|lambda|sigma|omega|leq|geq|neq|approx|rightarrow|Rightarrow|sin|cos|tan|log|lim)(?![A-Za-z])/;

  function bareCommand(texSrc) {
    // \text{…} 안의 낱말은 글자이므로 빼고 본다
    var s = texSrc.replace(/\\(text|mathrm|textrm|mathbf|textbf|operatorname)\s*\{[^{}]*\}/g, ' ');
    var m = BARE_RE.exec(s);
    return m ? m[2] : null;
  }

  function clip(s) { s = String(s); return s.length > 40 ? s.slice(0, 37) + '…' : s; }

  // 글 안의 위치 → "3번째 줄 5번째 글자" (한 줄짜리 글이면 "5번째 글자")
  function where(s, idx) {
    var before = s.slice(0, idx);
    var col = idx - before.lastIndexOf('\n');
    return (s.indexOf('\n') >= 0 ? before.split('\n').length + '번째 줄 ' : '') + col + '번째 글자';
  }

  // 수식($…$)과 \$ 를 같은 길이의 공백으로 가린다 — 글 쪽 검사(굵게·빈칸·태그)가 원문 위치를 그대로 쓰게.
  // 닫히지 않은 $ 뒤는 화면처럼 글자로 남긴다
  function maskMath(s) {
    var out = '';
    var i = 0;
    var n = s.length;
    while (i < n) {
      var c = s.charAt(i);
      if (c === '\\' && s.charAt(i + 1) === '$') { out += '  '; i += 2; continue; }
      if (c === '$') {
        var j = i + 1;
        var found = -1;
        while (j < n) {
          var d = s.charAt(j);
          if (d === '\\') { j += 2; continue; }
          if (d === '$') { found = j; break; }
          j++;
        }
        if (found < 0) return out + s.slice(i);
        out += s.slice(i, found + 1).replace(/[^\n]/g, ' ');
        i = found + 1;
        continue;
      }
      out += c;
      i++;
    }
    return out;
  }

  // 표: 줄마다 칸 수가 같은지 (구분선 |---| 포함). 위치는 원문 줄 번호로
  function tableErrors(s, errs) {
    var lines = s.split('\n');
    var i = 0;
    while (i < lines.length) {
      if (!/^\s*\|/.test(lines[i])) { i++; continue; }
      var first = i;
      var rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
      var want = splitCells(rows[0]).length;
      for (var k = 1; k < rows.length; k++) {
        var got = splitCells(rows[k]).length;
        if (got !== want) {
          var sep = k === 1 && SEP_RE.test(rows[k]);
          errs.push((first + k + 1) + '번째 줄: 표의 칸 수가 맞지 않아요 — ' + (sep ? '구분선(|---|)' : '이 줄') + ' ' + got + '칸, 첫 줄 ' + want + '칸');
        }
      }
    }
  }

  function check(src) {
    if (src === null || src === undefined) return ['글이 비어 있어요 (' + src + ')'];
    if (typeof src !== 'string' && typeof src !== 'number') return ['서식 글은 문자열이어야 해요 (지금은 ' + typeof src + ')'];
    var s = String(src).replace(/\r\n?/g, '\n');
    var errs = [];
    var cm = CTRL_RE.exec(s);
    if (cm) {
      errs.push(where(s, cm.index) + ': 보이지 않는 제어 문자(코드 ' + cm[0].charCodeAt(0) + ')가 있어요 — JS 문자열에서 TeX 명령의 ' +
        '백슬래시를 하나만 쓰면 \\f(폼피드)·\\t(탭) 같은 글자가 돼요. \\\\frac 처럼 두 번 쓰세요');
    }
    splitMath(s).forEach(function (g) {
      if (g.t === 'unclosed') {
        errs.push(where(s, g.at) + ': 닫히지 않은 $ 가 있어요 — 수식은 $…$ 로 감싸고, 달러 글자는 \\$ 로 써요');
      } else if (g.t === 'math') {
        var at = g.at;
        if (!g.v.trim()) {
          errs.push(where(s, at) + ': 빈 수식($$)이 있어요 — $ 와 $ 사이에 수식이 없어요');
          return;
        }
        parseTex(g.v).errors.forEach(function (e) {
          errs.push(where(s, at + 1 + e.at) + ': ' + e.msg + ' — $' + clip(g.v) + '$');
        });
        var bare = bareCommand(g.v);
        if (bare) {
          errs.push(where(s, at) + ': 백슬래시가 빠진 명령 같아요: ' + bare + ' (TeX 에서는 \\' + bare + ', JS 문자열에서는 \\\\' + bare + ') — $' + clip(g.v) + '$');
        }
      }
    });
    // 글 쪽(수식 밖) 검사
    // 밑줄 세 개 이상(___)은 빈칸 선이라 짝 검사에서 뺀다(같은 길이의 공백으로 바꿔 위치는 그대로)
    var t = maskMath(s).replace(/_{3,}/g, function (m) { return m.replace(/_/g, ' '); });
    var pairs = [['**', '굵게(**)'], ['__', '밑줄(__)']];
    pairs.forEach(function (p) {
      var idx = [];
      for (var k = t.indexOf(p[0]); k >= 0; k = t.indexOf(p[0], k + 2)) idx.push(k);
      if (idx.length % 2) errs.push(where(s, idx[idx.length - 1]) + ': ' + p[1] + ' 표시의 짝이 맞지 않아요');
    });
    var rest = t.replace(/\[\[([^\]\n]*)\]\]/g, function (m) { return m.replace(/[^\n]/g, ' '); });
    var ob = rest.indexOf('[[');
    if (ob >= 0) errs.push(where(s, ob) + ': 빈칸 [[ 가 같은 줄에서 ]] 로 닫히지 않았어요');
    var cb = rest.indexOf(']]');
    if (cb >= 0 && (ob < 0 || cb < ob)) errs.push(where(s, cb) + ': 짝이 없는 빈칸 닫기 ]] 가 있어요');
    // 태그 안은 ASCII 만 본다 (부등식 "a<b 이고 c>d" 를 태그로 오해하지 않게)
    var tag = /<\/?(b|i|u|s|br|p|div|span|strong|em|sup|sub|img|a|script|style|table|tr|td|th|ul|ol|li|h[1-6]|font|center|iframe|svg)\b[^>\u0080-\uffff]*>/i.exec(t);
    if (tag) errs.push(where(s, tag.index) + ': HTML 태그는 쓸 수 없어요(글자 그대로 보여요): ' + clip(tag[0]) + ' — 굵게는 **…**');
    tableErrors(s, errs);
    return errs;
  }

  return {
    render: render,
    inline: inline,
    tex: tex,
    plain: plain,
    check: check,
    // 계약 밖 덤: 검사기·검색 색인이 쓴다
    splitMath: splitMath,
    texPlain: texPlain,
  };
});
