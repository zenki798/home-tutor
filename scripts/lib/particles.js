/* 수·수식 뒤 조사 검사 — "$\frac{9}{8}$은"(→는), "6이 아니라"(맞음), "3를"(→을) 같은 실수를 찾는다.
 * 읽는 소리의 마지막 받침으로 기대 조사를 정하고, 다르면 경고한다. 확신이 없으면 건너뛴다(오탐보다 놓침이 낫다).
 * 사용: const { lintParticles } = require('./particles'); lintParticles(서식 글) → [{ found, expected, context }] */
'use strict';

const DIGIT_JONG = [21, 8, 0, 16, 0, 0, 1, 8, 8, 0]; // 영 일 이 삼 사 오 육 칠 팔 구
// 영문자를 읽는 소리의 받침 (l 엘·r 알: ㄹ, m 엠: ㅁ, n 엔: ㄴ, 그 밖은 받침 없음)
const LETTER_JONG = { l: 8, r: 8, m: 16, n: 4 };
const GREEK_JONG = { pi: 0, theta: 0, alpha: 0, beta: 0, gamma: 0, delta: 0, lambda: 0, mu: 0, sigma: 0, phi: 0, omega: 0, infty: 0 };

function jongOfInteger(s) {
  s = s.replace(/,/g, '').replace(/^0+(?=\d)/, '');
  if (s === '0') return 21;
  const last = s.charCodeAt(s.length - 1) - 48;
  if (last !== 0) return DIGIT_JONG[last];
  const z = s.length - s.replace(/0+$/, '').length;
  if (z === 1) return 17; // 십
  if (z === 2) return 1;  // 백
  if (z === 3) return 4;  // 천
  if (z <= 7) return 4;   // 만
  if (z <= 11) return 1;  // 억
  return 0;
}

function jongOfNumberText(s) {
  const dec = /(\d+)\.(\d+)$/.exec(s);
  if (dec) return DIGIT_JONG[dec[2].charCodeAt(dec[2].length - 1) - 48];
  const int = /(\d[\d,]*)$/.exec(s);
  return int ? jongOfInteger(int[1]) : null;
}

/* 수식(TeX)을 읽을 때 마지막 소리의 받침. 모르면 null */
function jongOfTex(tex) {
  let t = tex.replace(/\\[,;: ]|\\quad|\\qquad/g, ' ').trim();
  t = t.replace(/\\right[.)\]|]?$/, '').trim();
  if (!t) return null;
  // 분수: 분자 ("b분의 a")
  let m = /\\d?frac\{([^{}]*)\}\{[^{}]*\}$/.exec(t);
  if (m) return jongOfTex(m[1]);
  // 거듭제곱: "…제곱"(ㅂ)
  if (/(\^\{?[^{}]*\}?|²|³)$/.test(t) && /\^|²|³/.test(t.slice(-6))) return 17;
  // 도(°)·퍼센트
  if (/(\\circ|°|\\degree)$/.test(t)) return 0;
  if (/(\\%|%)$/.test(t)) return 0;
  // 그리스 문자
  m = /\\([a-zA-Z]+)$/.exec(t);
  if (m) {
    if (Object.prototype.hasOwnProperty.call(GREEK_JONG, m[1])) return GREEK_JONG[m[1]];
    return null; // 그 밖의 명령으로 끝나면 모른다
  }
  // \text{…} \mathrm{…} 안의 글자
  m = /\\(?:text|mathrm)\{([^{}]*)\}$/.exec(t);
  if (m) return jongOfPlain(m[1]);
  // \overline{AB}, \vec{a} 등: 안의 마지막 글자
  m = /\\(?:overline|overrightarrow|vec|bar|hat|widehat)\{([^{}]*)\}$/.exec(t);
  if (m) return jongOfTex(m[1]);
  if (/[)\]}|]$/.test(t)) return null; // 괄호로 끝나면 읽는 법이 여러 가지
  // 수
  if (/\d$/.test(t)) return jongOfNumberText(t);
  // 변수 한 글자
  m = /([A-Za-z])$/.exec(t);
  if (m) {
    const c = m[1].toLowerCase();
    return Object.prototype.hasOwnProperty.call(LETTER_JONG, c) ? LETTER_JONG[c] : 0;
  }
  // 한글
  const ch = t.charCodeAt(t.length - 1);
  if (ch >= 0xac00 && ch <= 0xd7a3) return (ch - 0xac00) % 28;
  return null;
}

function jongOfPlain(s) {
  s = s.trim();
  if (!s) return null;
  const ch = s.charCodeAt(s.length - 1);
  if (ch >= 0xac00 && ch <= 0xd7a3) return (ch - 0xac00) % 28;
  if (/\d$/.test(s)) return jongOfNumberText(s);
  return null;
}

// 검사할 조사 (긴 것부터). next: 뒤에 와도 되는 글자 — 낱말의 일부(가지, 이상 …)를 조사로 오인하지 않게
const PARTICLES = [
  { a: '이에요', b: '예요' },
  { a: '이라고', b: '라고' },
  { a: '으로', b: '로', rieul: true },
  { a: '은', b: '는' },
  { a: '이', b: '가' },
  { a: '을', b: '를' },
  { a: '과', b: '와' },
];
const END = /^($|[\s.,!?)\]'"’”:;…·])/;

function expectedFor(jong, p) {
  if (p.rieul) return jong === 0 || jong === 8 ? p.b : p.a;
  return jong === 0 ? p.b : p.a;
}

function matchParticle(rest) {
  for (const p of PARTICLES) {
    for (const form of [p.a, p.b]) {
      if (rest.startsWith(form) && END.test(rest.slice(form.length))) return { p, form };
    }
  }
  return null;
}

function lintParticles(text) {
  if (typeof text !== 'string' || !text) return [];
  const out = [];
  const s = text;
  // 수식 구간 찾기 ($ 짝, \$ 는 글자)
  const segs = [];
  let i = 0;
  let open = -1;
  while (i < s.length) {
    if (s[i] === '\\' && s[i + 1] === '$') { i += 2; continue; }
    if (s[i] === '$') {
      if (open < 0) open = i;
      else { segs.push([open, i]); open = -1; }
    }
    i++;
  }
  const inMath = (k) => segs.some(([a, b]) => k > a && k < b);

  function check(jong, after, contextStart) {
    if (jong === null || jong === undefined) return;
    const rest = s.slice(after).replace(/^ /, ''); // 한 칸 띄어 쓴 조사도 본다
    const m = matchParticle(rest);
    if (!m) return;
    const want = expectedFor(jong, m.p);
    if (want !== m.form) {
      out.push({
        found: m.form,
        expected: want,
        context: s.slice(Math.max(0, contextStart), Math.min(s.length, after + 8)).replace(/\n/g, ' '),
      });
    }
  }

  // 1) 수식 뒤
  for (const [a, b] of segs) check(jongOfTex(s.slice(a + 1, b)), b + 1, a);
  // 2) 수식 밖의 수 (단위·세는 말 없이 조사가 바로 붙은 것만: "3을", "10은")
  const re = /(\d[\d,]*(?:\.\d+)?)(?=[은는이가을를과와으로예])/g;
  let mm;
  while ((mm = re.exec(s))) {
    const end = mm.index + mm[0].length;
    if (inMath(mm.index)) continue;
    const prev = s[mm.index - 1];
    if (prev && /[A-Za-z_\\{^]/.test(prev)) continue; // 변수 첨자·명령 안
    check(jongOfNumberText(mm[1]), end, mm.index);
  }
  return out;
}

module.exports = { lintParticles, jongOfTex };
