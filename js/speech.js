/* 가정교사 — 읽어 주기 글 만들기 (window.TutorSpeech)
 * 계약: docs/ARCHITECTURE.md §13
 * - 서식 글(마크다운 일부 + $TeX$)을 소리 내어 읽기 좋은 한국어 글로 바꾼다: 3/4 → "4분의 3", 2+3=5 → "2 더하기 3은 5".
 * - 목소리는 이 기기 안의 목소리(localService)만 고른다 — 인터넷 목소리는 글을 회사 서버로 보내므로 쓰지 않는다(AGENTS.md 규칙 4·7).
 * - DOM 을 쓰지 않는 순수 함수다(node 시험에서 그대로 부른다). 실제로 소리를 내는 일은 화면(app.js)이 한다.
 */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorSpeech = mod;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---- 받침으로 조사 고르기 (숫자는 읽는 소리, 영문자는 한국어로 읽는 이름) ---- */
  var DIGIT_JONG = [21, 8, 0, 16, 0, 0, 1, 8, 8, 0]; // 영 일 이 삼 사 오 육 칠 팔 구
  function jong(word) {
    var w = String(word || '').replace(/[\s'"()[\]{}.,!?~·…:;*_-]+$/, '');
    if (!w) return -1;
    var ch = w.charAt(w.length - 1);
    var code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) return (code - 0xac00) % 28;
    if (ch >= '0' && ch <= '9') return DIGIT_JONG[+ch];
    if (/[a-z]/i.test(ch)) return /[lmnr]/i.test(ch) ? 8 : 0; // 엘·엠·엔·알만 받침
    return -1;
  }
  function josa(word, pair) {
    var p = pair.split('/');
    var j = jong(word);
    if (j < 0) return p[1];
    return j > 0 ? p[0] : p[1];
  }

  var WORDS = {
    times: ' 곱하기 ', cdot: ' 곱하기 ', div: ' 나누기 ', pm: ' 플러스 마이너스 ', mp: ' 마이너스 플러스 ',
    le: ' ≤ ', leq: ' ≤ ', ge: ' ≥ ', geq: ' ≥ ', ne: ' ≠ ', neq: ' ≠ ', lt: ' < ', gt: ' > ',
    approx: ' 약 ', equiv: ' 합동 ', sim: ' 닮음 ', cong: ' 합동 ', propto: ' 비례 ',
    pi: '파이', alpha: '알파', beta: '베타', gamma: '감마', delta: '델타', theta: '세타', lambda: '람다', mu: '뮤',
    sigma: '시그마', phi: '파이', omega: '오메가', Delta: '델타', Sigma: '시그마', Omega: '오메가',
    infty: '무한대', angle: '각 ', triangle: '삼각형 ', square: '사각형 ', circ: '도', degree: '도',
    cdots: ' … ', ldots: ' … ', therefore: '따라서 ', because: '왜냐하면 ', perp: ' 수직 ', parallel: ' 평행 ',
    in: ' 원소 ', notin: ' 원소가 아님 ', subset: ' 부분집합 ', subseteq: ' 부분집합 ', cup: ' 합집합 ', cap: ' 교집합 ',
    emptyset: '공집합', varnothing: '공집합', to: ' ', rightarrow: ' ', Rightarrow: ' ⇒ ', implies: ' ⇒ ', iff: ' 필요충분조건 ',
    sin: '사인 ', cos: '코사인 ', tan: '탄젠트 ', log: '로그 ', ln: '자연로그 ', lim: '극한 ', sum: '합 ', int: '적분 ',
  };

  /* {…} 짝 맞춰 꺼내기: s[i] 가 '{' 일 때 → { body, end } */
  function group(s, i) {
    if (s.charAt(i) !== '{') {
      // 중괄호 없이 한 글자(또는 한 명령)
      if (s.charAt(i) === '\\') {
        var m = /^\\[a-zA-Z]+/.exec(s.slice(i));
        if (m) return { body: m[0], end: i + m[0].length };
      }
      return { body: s.charAt(i), end: i + 1 };
    }
    var d = 0;
    for (var j = i; j < s.length; j++) {
      if (s.charAt(j) === '{') d++;
      else if (s.charAt(j) === '}') { d--; if (d === 0) return { body: s.slice(i + 1, j), end: j + 1 }; }
    }
    return { body: s.slice(i + 1), end: s.length };
  }

  function powerWord(base, exp) {
    var e = exp.replace(/\s+/g, '');
    if (e === '\\circ' || e === '°') return base + '도';
    if (e === '2') return base + ' 제곱';
    if (e === '3') return base + ' 세제곱';
    return base + '의 ' + texWords(exp).trim() + '제곱';
  }

  /* TeX 한 덩어리 → 읽는 말 (관계 기호는 그대로 두고 relWords 가 문장으로 바꾼다) */
  function texWords(tex) {
    var s = String(tex);
    var out = '';
    var i = 0;
    while (i < s.length) {
      var ch = s.charAt(i);
      if (ch === '\\') {
        var m = /^\\([a-zA-Z]+|.)/.exec(s.slice(i));
        var name = m[1];
        i += m[0].length;
        if (name === 'frac' || name === 'dfrac' || name === 'tfrac') {
          var a = group(s, skipSpace(s, i));
          var b = group(s, skipSpace(s, a.end));
          i = b.end;
          var whole = /(\d+)\s*$/.exec(out);
          var fr = texWords(b.body).trim() + '분의 ' + texWords(a.body).trim();
          if (whole) out = out.slice(0, out.length - whole[0].length) + whole[1] + josa(whole[1], '과/와') + ' ' + fr; // 대분수
          else out += fr;
        } else if (name === 'sqrt') {
          var k = skipSpace(s, i);
          var nth = '';
          if (s.charAt(k) === '[') { var close = s.indexOf(']', k); nth = s.slice(k + 1, close); k = close + 1; }
          var g = group(s, skipSpace(s, k));
          i = g.end;
          out += (nth === '3' ? '세제곱근 ' : nth ? nth + '제곱근 ' : '루트 ') + texWords(g.body).trim();
        } else if (name === 'text' || name === 'mathrm' || name === 'mathbf' || name === 'textbf' || name === 'mathit') {
          var t = group(s, skipSpace(s, i));
          i = t.end;
          out += texWords(t.body);
        } else if (name === 'overline') {
          var o = group(s, skipSpace(s, i));
          i = o.end;
          out += '선분 ' + texWords(o.body).trim();
        } else if (name === 'overrightarrow' || name === 'vec') {
          var v = group(s, skipSpace(s, i));
          i = v.end;
          out += '벡터 ' + texWords(v.body).trim();
        } else if (name === 'widehat') {
          var w = group(s, skipSpace(s, i));
          i = w.end;
          out += '호 ' + texWords(w.body).trim();
        } else if (name === 'left' || name === 'right' || name === 'displaystyle' || name === 'quad' || name === ',' || name === ';' || name === ' ' || name === '!') {
          if (s.charAt(i) === '.') i += 1;
          out += ' ';
        } else if (name === '{' || name === '}' || name === '%' || name === '$') {
          out += name === '%' ? '퍼센트' : ' ';
        } else if (name === 'begin' || name === 'end') {
          var env = group(s, skipSpace(s, i));
          i = env.end;
          out += ' ';
        } else if (name === '\\') {
          out += ', ';
        } else if (WORDS[name] !== undefined) {
          out += WORDS[name];
        } else {
          out += ' ';
        }
        continue;
      }
      if (ch === '^') {
        var p = group(s, skipSpace(s, i + 1));
        i = p.end;
        var base = /(\S+)\s*$/.exec(out);
        if (base) out = out.slice(0, out.length - base[0].length) + powerWord(base[1], p.body);
        else out += powerWord('', p.body);
        continue;
      }
      if (ch === '_') {
        var sub = group(s, skipSpace(s, i + 1));
        i = sub.end;
        out += ' ' + texWords(sub.body).trim();
        continue;
      }
      if (ch === '{' || ch === '}') { out += ''; i += 1; continue; }
      if (ch === '&') { out += ' '; i += 1; continue; }
      out += ch;
      i += 1;
    }
    return out;
  }
  function skipSpace(s, i) { while (i < s.length && s.charAt(i) === ' ') i++; return i; }

  /* 기호 → 말: 더하기·빼기(앞이 수·글자·괄호면 빼기, 아니면 마이너스)·곱하기·나누기, 분수 a/b, 퍼센트·도 */
  function opWords(s) {
    return s
      .replace(/(\d+)\s*\/\s*(\d+)/g, function (all, a, b) { return b + '분의 ' + a; })
      .replace(/×|✕/g, ' 곱하기 ').replace(/÷/g, ' 나누기 ').replace(/\+/g, ' 더하기 ')
      .replace(/(^|[^\s\w가-힣)\]])\s*[-−–]\s*(?=[\w가-힣(√])/g, function (all, pre) { return pre + ' 마이너스 '; })
      .replace(/([\w가-힣)\]])\s*[-−–]\s*(?=[\w가-힣(√])/g, '$1 빼기 ')
      .replace(/%/g, '퍼센트').replace(/°/g, '도').replace(/√/g, '루트 ').replace(/π/g, '파이')
      .replace(/²/g, ' 제곱').replace(/³/g, ' 세제곱')
      .replace(/[()[\]]/g, ' ');
  }

  /* 관계: "A = B" → "A는 B", "A < B" → "A는 B보다 작다", "A ≤ B" → "A는 B보다 작거나 같다" */
  var REL = { '=': '', '<': '보다 작다', '>': '보다 크다', '≤': '보다 작거나 같다', '≥': '보다 크거나 같다', '≠': '와 같지 않다' };
  var REL_NAME = { '=': '같다', '<': '작다', '>': '크다', '≤': '작거나 같다', '≥': '크거나 같다', '≠': '같지 않다' };
  function has(x) { return /[0-9A-Za-z가-힣]/.test(x || ''); }
  function relClause(s) {
    var parts = s.split(/\s*(=|<|>|≤|≥|≠)\s*/);
    if (parts.length < 3) return s;
    // 왼쪽만 비었으면("(일차식) > 0") 오른쪽만: "0보다 크다"
    if (parts.length === 3 && !has(parts[0]) && has(parts[2])) return parts[2].trim() + REL[parts[1]];
    // 기호만 늘어놓은 경우("부등호 <, >, ≤, ≥") — 양쪽에 수·글자가 없으면 기호 이름으로 읽는다
    for (var k = 0; k < parts.length; k += 2) {
      if (!has(parts[k])) return s.replace(/=|<|>|≤|≥|≠/g, function (r) { return ' ' + REL_NAME[r] + ' '; });
    }
    var out = parts[0].trim();
    for (var i = 1; i < parts.length; i += 2) out += josa(out, '은/는') + ' ' + parts[i + 1].trim() + REL[parts[i]];
    return out;
  }
  /* 식을 조각(⇒ · 쉼표 · 쌍반점)마다 따로 읽는다: "2x+3>7 ⇒ 2x>4" → "2x 더하기 3은 7보다 크다. 그러면 2x는 4보다 크다" */
  function relWords(s) {
    return s.split(/(\s*⇒\s*|\s*[,;]\s*)/).map(function (seg) {
      if (/^\s*⇒\s*$/.test(seg)) return '. 그러면 ';
      if (/^\s*[,;]\s*$/.test(seg)) return seg;
      return relClause(seg);
    }).join('');
  }

  function clean(s) {
    return s.replace(/\s+/g, ' ').replace(/\s+([,.?!])/g, '$1').replace(/([.?!])(?:\s*\.)+/g, '$1').replace(/^[\s.,]+/, '').trim();
  }

  /* 서식 글 → 읽는 글 */
  function toSpeech(src) {
    if (src === null || src === undefined) return '';
    var s = String(src).replace(/\r\n?/g, '\n');
    s = s.replace(/\[\[\?\]\]/g, ' 물음표 ').replace(/\[\[[^\]]*\]\]/g, ' 빈칸 ');
    // 수식 $…$ (\$ 는 달러 글자)
    var parts = [];
    var re = /(^|[^\\])\$([^$]+)\$/g;
    var last = 0;
    var m;
    while ((m = re.exec(s))) {
      var start = m.index + m[1].length;
      parts.push({ text: s.slice(last, start) });
      parts.push({ math: m[2] });
      last = start + m[2].length + 2;
      re.lastIndex = last;
    }
    parts.push({ text: s.slice(last) });
    var out = parts.map(function (p) {
      if (p.math !== undefined) return ' ' + relWords(clean(opWords(texWords(p.math)))) + ' ';
      var t = p.text.replace(/\\\$/g, '달러')
        .replace(/^\s*#{1,6}\s+/gm, '').replace(/^\s*>\s?/gm, '').replace(/^\s*(?:[-*]|\d+\.)\s+/gm, '')
        .replace(/^[ \t]*\|.*$/gm, function (line) {          // 표: 가르는 줄은 빼고, 칸은 쉼표로
          if (/^[\s|:-]+$/.test(line)) return '';
          return line.split('|').map(function (c) { return c.trim(); }).filter(Boolean).join(', ');
        })
        .replace(/\*\*|__/g, '');
      return opWords(t);
    }).join('');
    // 그림 글자(이모지)·보이지 않는 이음 글자는 읽지 않는다
    try { out = out.replace(new RegExp('[\\p{Extended_Pictographic}\\u{FE0F}\\u{200D}]', 'gu'), ' '); } catch (e) { /* 오래된 엔진 */ }
    return clean(out.replace(/\n+/g, '. ').replace(/\.\s*\./g, '.'));
  }

  /* 이 기기 안의 한국어 목소리만 (localService). 기본 목소리가 있으면 그것 — 없으면 null */
  function pickVoice(voices) {
    var list = (voices || []).filter(function (v) {
      return v && v.localService === true && /^ko(?:[-_]|$)/i.test(String(v.lang || ''));
    });
    if (!list.length) return null;
    for (var i = 0; i < list.length; i++) if (list[i]['default']) return list[i];
    return list[0];
  }

  return { toSpeech: toSpeech, pickVoice: pickVoice, josa: josa };
});
