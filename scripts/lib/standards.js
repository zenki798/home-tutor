/* 성취기준 읽기·비교 — 규칙만으로(AI 없이)
 *
 * 교육과정 별책(교과 교육과정 문서)의 글자에서 성취기준을 뽑는다.
 *   parseStandards(text) → { volume, notice, title, courses, standards: [{ code, text, course, area, band }], issues, warnings, stats }
 *     - 성취기준 코드 문법: [학년군 + 과목 약어 + 영역 2자리 - 순번 2자리]   예) [2수01-01] [9사(지리)01-01] [10공수1-01-01] [12대수01-01] [12미적Ⅱ-01-01]
 *     - 문서 구조: "나. 성취기준" → [초등학교 1∼2학년] 같은 학년(군) 머리 → (1) 영역 → 코드로 시작하는 성취기준 문장
 *                  → (가) 성취기준 해설(코드로 시작하지만 정의가 아니다) → (나) 성취기준 적용 시 고려 사항 → 다음 영역 …
 *     - 과목 이름은 문서 앞 "차 례"의 순서와 "1. 성격 및 목표"의 순서를 맞춰 붙인다.
 *     - 확신할 수 없는 것은 issues 에 적는다. issues 가 하나라도 있으면 이 결과로 자동 반영하지 않는다(호출하는 쪽 규칙).
 *   parseStandardsRows(rows) → 같은 꼴 (엑셀처럼 칸으로 된 표: 코드 칸 + 문장 칸)
 *   diffStandards(oldMap, newMap) → { added, removed, changed, same }   (띄어쓰기·가운뎃점 모양 차이는 같은 것으로 본다)
 */
'use strict';

const SUBJ = '[가-힣]+(?:\\([가-힣]+\\))?(?:\\d|[ⅠⅡⅢⅣ])?';
const CODE_BODY = '\\[\\s*(\\d{1,2})\\s*(' + SUBJ + ')\\s*[-–]?\\s*(\\d{2})\\s*[-–]\\s*(\\d{2})\\s*\\]';
const CODE_AT = new RegExp('^' + CODE_BODY);
const CODE_ONLY = new RegExp('^' + CODE_BODY + '$');
const BANDS = { 2: ['e1', 'e2'], 4: ['e3', 'e4'], 6: ['e5', 'e6'], 9: ['m1', 'm2', 'm3'], 10: ['h1'], 12: ['h1', 'h2', 'h3'] };
const SCHOOL_BAND = { 초등학교: { '1-2': 2, '3-4': 4, '5-6': 6 }, 중학교: { '1-3': 9 } };

// 코드 표준 꼴: 과목 약어가 숫자·로마 숫자로 끝나면 영역 앞에 '-' 를 둔다 ([10공수1-01-01], [12미적Ⅱ-01-01]), 아니면 붙인다([12대수01-01])
function canonFromParts(band, subj, area, seq) {
  return '[' + band + subj + (/[\dⅠⅡⅢⅣ]$/.test(subj) ? '-' : '') + area + '-' + seq + ']';
}
function canonCode(s) {
  const m = CODE_ONLY.exec(String(s || '').trim());
  return m ? canonFromParts(m[1], m[2], m[3], m[4]) : null;
}
function codeParts(code) {
  const m = CODE_ONLY.exec(code || '');
  return m ? { band: Number(m[1]), subj: m[2], area: m[3], seq: m[4], prefix: m[1] + m[2] } : null;
}

// 보여 줄 글자: 공백 하나로, 가운뎃점·물결 모양을 하나로
function cleanText(s) {
  return String(s || '').replace(/[⋅∙・‧･]/g, '·').replace(/[∼～〜]/g, '~').replace(/\s+/g, ' ').trim();
}
// 비교 열쇠: 띄어쓰기·문장부호 모양 차이를 지운다
function compareKey(s) {
  return cleanText(s).replace(/[‘’`´]/g, "'").replace(/[“”]/g, '"').replace(/[ㆍ·]/g, '·').replace(/\s+/g, '').replace(/[.。]$/, '');
}
// 글자 두 개씩 묶음으로 본 닮은 정도(0~1)
function similarity(a, b) {
  const x = compareKey(a);
  const y = compareKey(b);
  if (x === y) return 1;
  if (x.length < 2 || y.length < 2) return 0;
  const grams = new Map();
  for (let i = 0; i + 1 < x.length; i++) { const g = x.slice(i, i + 2); grams.set(g, (grams.get(g) || 0) + 1); }
  let hit = 0;
  for (let i = 0; i + 1 < y.length; i++) {
    const g = y.slice(i, i + 2);
    const n = grams.get(g);
    if (n) { hit++; grams.set(g, n - 1); }
  }
  return (2 * hit) / (x.length - 1 + y.length - 1);
}

function normLines(text) {
  return String(text || '').replace(/\r/g, '').replace(/\f/g, '\n').split('\n').map((l) => l.replace(/ /g, ' ').trim());
}

// 차례: "수학\t3", "공통수학1, 공통수학2\t57", PDF 의 "수학 ········ 3" / "수학      3"
function parseToc(lines) {
  const start = lines.findIndex((l) => /^차\s*례$/.test(l));
  if (start < 0) return [];
  const out = [];
  for (let i = start + 1; i < Math.min(lines.length, start + 120); i++) {
    const l = lines[i];
    if (/^1\.\s*성격\s*및\s*목표/.test(l)) break;
    const m = /^(.+?)(?:\t+|\s*[·.…‥]{2,}\s*|\s{2,})(\d{1,3})$/.exec(l);
    if (!m) continue;
    const name = m[1].trim();
    if (/^\[.*\]$/.test(name) || !/[가-힣]/.test(name)) continue;
    out.push(name.split(/\s*,\s*/).map((s) => s.trim()).filter(Boolean));
  }
  return out;
}

const squash = (s) => String(s || '').replace(/\s+/g, '');

// 머리말·쪽 번호처럼 여러 번 되풀이되는 짧은 줄(PDF 의 쪽 머리)은 문장 이음에서 뺀다
function repeatedLines(lines) {
  const n = new Map();
  for (const l of lines) if (l && l.length <= 40 && !CODE_AT.test(l)) n.set(l, (n.get(l) || 0) + 1);
  const rep = new Set();
  // 문장 꼬리("한다." 처럼 줄이 넘어가 홀로 남은 끝말)는 여러 번 나와도 머리말이 아니다
  for (const [l, k] of n) if (k >= 5 && !/^\(\d+\)|^\([가-하]\)|^\d+\.|^[가-하]\./.test(l) && !/다\.?$/.test(l)) rep.add(l);
  return rep;
}
const PAGE_NO = /^[-–—]?\s*\d{1,4}\s*[-–—]?$/;
// 성취기준 문장이 아닌 줄(덧붙인 활동·묶음 제목·글머리표)
const NOT_SENTENCE = /^(?:[•◦○●▪■□◆◇※*<〈《\-–·⋅∙]|[\u{F0000}-\u{FFFFD}-]|[①-⑳]|\[\s*(?:탐구|활동|참고|예시))/u;
// 문장 끝: "다." 가 확실한 끝이다. "다" 만 있으면(마침표 빠짐) 경고로 받아 준다 — "바다"처럼 낱말 끝일 수도 있어서 이을지는 마침표로만 판단한다
const ENDS = /다\.?$/;
const DONE = /다\.$/;

function bandOf(school, a, b) {
  const t = SCHOOL_BAND[school];
  return t ? t[a + '-' + b] || null : null;
}

function parseStandards(text, opts) {
  opts = opts || {};
  const lines = normLines(text);
  const issues = [];
  const warnings = [];
  const out = { volume: null, notice: null, title: null, courses: [], standards: [], issues, warnings, stats: {} };

  // 머리: "교육부 고시 제2022-33호 [별책 8]" / "국가교육위원회 고시 제2026-1호 [별책 15]"
  const head = lines.slice(0, 40).join('\n');
  const nm = /(교육부|국가교육위원회)\s*고시\s*제\s*(\d{4})\s*[-–]\s*(\d+)\s*호/.exec(head);
  if (nm) out.notice = nm[1] + ' 고시 제' + nm[2] + '-' + nm[3] + '호';
  const vm = /\[\s*별책\s*(\d+)\s*\]|【\s*별책\s*(\d+)\s*】/.exec(head);
  if (vm) out.volume = Number(vm[1] || vm[2]);
  const tm = /^(.{2,40}?교육과정)$/m.exec(lines.slice(0, 12).filter((l) => l && !/고시/.test(l)).join('\n'));
  if (tm) out.title = cleanText(tm[1]);

  const toc = parseToc(lines);
  const rep = repeatedLines(lines);
  let entry = -1;
  let course = null;
  let inStd = false;
  let mode = null;
  let band = null;
  let courseBands = false;
  let area = null;
  let areaNo = null;
  let last = null;
  const defs = new Map();
  const dups = [];
  const explained = new Map();
  const lineCodes = new Map(); // 성취기준 구역 밖까지 포함해 줄 첫머리에 나온 모든 코드
  const starts = [];

  // 두 과목을 한 장에 담은 경우(공통수학1, 공통수학2)의 과목 머리: "[공통수학2]" 또는 "<통합과학2>"
  function courseHeading(l) {
    const m = /^[[<〈＜【]\s*([^\]>〉＞】]+?)\s*[\]>〉＞】]$/.exec(l);
    if (!m || CODE_ONLY.test(l) || /학년/.test(m[1])) return null;
    const want = squash(m[1]);
    const names = entry >= 0 && toc[entry] ? toc[entry] : [];
    const hit = names.find((x) => squash(x) === want);
    return hit || (!toc.length && l[0] === '[' ? m[1].trim() : null);
  }
  function finishLast() {
    if (!last) return;
    last.text = cleanText(last.text);
    if (!last.text) issues.push(last.code + ': 성취기준 문장이 비었어요(' + (last.line + 1) + '줄)');
    else if (!ENDS.test(last.text)) issues.push(last.code + ': 문장이 "다."로 끝나지 않아요 — ' + last.text.slice(-30));
    else if (!DONE.test(last.text)) warnings.push(last.code + ': 문장 끝 마침표가 없어요'); // 원문 오탈자(실제 [6도03-03])
    if (last.text.length > 400) issues.push(last.code + ': 문장이 너무 길어요(다음 글이 섞였을 수 있어요)');
    last = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l) { if (last && DONE.test(cleanText(last.text))) finishLast(); continue; }
    if (PAGE_NO.test(l) || rep.has(l)) continue;
    if (!inStd) {
      const om = CODE_AT.exec(l);
      if (om) { const oc = canonFromParts(om[1], om[2], om[3], om[4]); if (!lineCodes.has(oc)) lineCodes.set(oc, i); }
    }

    if (/^1\.\s*성격\s*및\s*목표$/.test(l)) {
      finishLast();
      entry++;
      starts.push(i);
      course = toc[entry] ? toc[entry][0] : null;
      courseBands = false;
      inStd = false;
      continue;
    }
    // 과목 머리는 "가. 내용 체계" 앞에도, "나. 성취기준" 바로 뒤에도([한국사 1]) 온다 — 성취기준 구역 안이면 그대로 이어 읽는다
    const ch = courseHeading(l);
    if (ch) { finishLast(); course = ch; band = null; area = null; areaNo = null; if (inStd) mode = 'def'; continue; }
    if (/^나\.\s*성취\s*기준$/.test(l)) { finishLast(); inStd = true; mode = 'def'; band = null; area = null; areaNo = null; continue; }
    if (!inStd) continue;
    if (/^\d+\.\s*\S/.test(l) || /^가\.\s*내용\s*체계/.test(l)) { finishLast(); inStd = false; continue; }

    let m = /^\[\s*(초등학교|중학교|고등학교)\s*(\d)\s*[∼~\-–]\s*(\d)\s*학년\s*\]$/.exec(l);
    if (m) { finishLast(); band = { school: m[1], code: bandOf(m[1], m[2], m[3]), label: m[1] + ' ' + m[2] + '~' + m[3] + '학년' }; courseBands = true; mode = 'def'; area = null; areaNo = null; continue; }
    // 영역 머리 "(1) 수와 연산" — 짧고 마침표로 끝나지 않는다("(6) 지구와 바다"처럼 '다'로 끝날 수는 있다)
    m = /^\((\d{1,2})\)\s*(\S.{0,30})$/.exec(l);
    if (m && !/[.。]$/.test(m[2]) && !CODE_AT.test(m[2])) { finishLast(); area = cleanText(m[2]); areaNo = Number(m[1]); mode = 'def'; continue; }
    if (/^\([가-하]\)\s*\S/.test(l)) { finishLast(); mode = /^\(가\)\s*성취\s*기준\s*해설/.test(l) ? 'exp' : 'other'; continue; }

    const cm = CODE_AT.exec(l);
    if (cm) {
      const code = canonFromParts(cm[1], cm[2], cm[3], cm[4]);
      if (!lineCodes.has(code)) lineCodes.set(code, i);
      if (mode === 'def') {
        finishLast();
        const rest = l.slice(cm[0].length).trim();
        const p = codeParts(code);
        if (!BANDS[p.band]) issues.push(code + ': 학년군 숫자(' + p.band + ')를 모르겠어요');
        if (band && band.code && band.code !== p.band) issues.push(code + ': [' + band.label + '] 아래에 있는데 학년군 숫자가 달라요');
        if (!band && courseBands) warnings.push(code + ': 학년(군) 머리 없이 나왔어요');
        if (areaNo && Number(p.area) !== areaNo) issues.push(code + ': (' + areaNo + ') ' + area + ' 영역 아래인데 영역 번호가 ' + p.area + '예요');
        const s = { code, text: rest, course, area, band: band ? band.label : null, line: i };
        if (defs.has(code)) dups.push([defs.get(code), s]); // 문장이 다 모인 뒤에 비교한다
        else defs.set(code, s);
        last = s;
      } else if (mode === 'exp') {
        if (!explained.has(code)) explained.set(code, i);
      }
      continue;
    }
    if (mode === 'def' && last) {
      // 글머리표·활동 제목 줄은 성취기준 문장이 아니다
      if (NOT_SENTENCE.test(l)) { finishLast(); continue; }
      // PDF 처럼 한 문장이 여러 줄로 나뉜 경우: "다." 로 끝나기 전의 보통 줄은 이어 붙인다
      if (!DONE.test(cleanText(last.text))) { last.text += ' ' + l; continue; }
      finishLast();
    }
  }
  finishLast();
  for (const [a, b] of dups) {
    if (compareKey(a.text) !== compareKey(b.text)) issues.push(a.code + ': 같은 코드가 두 번, 다른 문장으로 나와요(' + (a.line + 1) + '줄, ' + (b.line + 1) + '줄)');
  }

  // 결과(문서 순서)
  for (const s of defs.values()) out.standards.push({ code: s.code, text: cleanText(s.text), course: s.course, area: s.area, band: s.band });
  const byCourse = new Map();
  for (const s of out.standards) {
    const k = s.course || '';
    if (!byCourse.has(k)) byCourse.set(k, 0);
    byCourse.set(k, byCourse.get(k) + 1);
  }
  out.courses = [...byCourse].map(([name, count]) => ({ name: name || null, count }));

  // 줄 첫머리에 코드로 나온 것(해설·표 포함)은 모두 정의가 있어야 한다 — 없으면 구조를 잘못 읽은 것이다(과목 하나를 통째로 놓치는 것도 여기서 잡힌다)
  const missed = [...lineCodes].filter(([code]) => !defs.has(code));
  if (missed.length) {
    issues.push('줄 첫머리에 나온 코드 ' + missed.length + '개의 성취기준 문장을 찾지 못했어요: ' +
      missed.slice(0, 8).map(([code, line]) => code + '(' + (line + 1) + '줄)').join(', ') + (missed.length > 8 ? ' …' : ''));
  }
  // 순번 빈자리(개정으로 빠졌을 수 있어 경고만)
  const seqs = new Map();
  for (const s of out.standards) {
    const p = codeParts(s.code);
    const k = p.prefix + '/' + p.area;
    if (!seqs.has(k)) seqs.set(k, []);
    seqs.get(k).push(Number(p.seq));
  }
  for (const [k, list] of seqs) {
    list.sort((a, b) => a - b);
    for (let i = 0; i < list.length; i++) if (list[i] !== i + 1) { warnings.push(k + ': 순번이 ' + (i + 1) + '부터 비어 있어요'); break; }
  }
  if (!toc.length) warnings.push('차례를 찾지 못해 과목 이름을 붙이지 못했어요');
  else if (starts.length !== toc.length) issues.push('차례의 과목 수(' + toc.length + ')와 본문의 과목 수(' + starts.length + ')가 달라요');
  if (out.standards.some((s) => !s.course) && toc.length) issues.push('과목을 알 수 없는 성취기준이 있어요');
  if (!out.standards.length) issues.push('성취기준을 하나도 찾지 못했어요');
  out.stats = { lines: lines.length, standards: out.standards.length, explained: explained.size, tocEntries: toc.length, courseStarts: starts.length };
  return out;
}

// 칸으로 된 표(엑셀 등): 한 행에서 코드만 있는 칸 + "다."로 끝나는 가장 긴 칸
function parseStandardsRows(rows) {
  const issues = [];
  const warnings = [];
  const map = new Map();
  (rows || []).forEach((r, i) => {
    if (!Array.isArray(r)) return;
    const cells = r.map((c) => cleanText(c));
    const ci = cells.findIndex((c) => CODE_ONLY.test(c));
    if (ci < 0) return;
    const code = canonCode(cells[ci]);
    const texts = cells.filter((c, j) => j !== ci && ENDS.test(c) && /[가-힣]/.test(c) && c.length >= 8).sort((a, b) => b.length - a.length);
    if (!texts.length) { issues.push(code + ': 성취기준 문장 칸을 찾지 못했어요(' + (i + 1) + '행)'); return; }
    const p = codeParts(code);
    if (!BANDS[p.band]) issues.push(code + ': 학년군 숫자(' + p.band + ')를 모르겠어요');
    if (map.has(code)) {
      if (compareKey(map.get(code).text) !== compareKey(texts[0])) issues.push(code + ': 같은 코드가 다른 문장으로 두 번 나와요');
      return;
    }
    map.set(code, { code, text: texts[0], course: null, area: null, band: null });
  });
  const standards = [...map.values()];
  if (!standards.length) issues.push('성취기준을 하나도 찾지 못했어요');
  return { volume: null, notice: null, title: null, courses: [], standards, issues, warnings, stats: { rows: (rows || []).length, standards: standards.length } };
}

// { code: text } 두 개 비교
function diffStandards(oldMap, newMap) {
  const added = [];
  const removed = [];
  const changed = [];
  let same = 0;
  for (const code of Object.keys(newMap)) {
    if (!(code in oldMap)) added.push({ code, text: newMap[code] });
    else if (compareKey(oldMap[code]) !== compareKey(newMap[code])) changed.push({ code, from: oldMap[code], to: newMap[code], sim: Math.round(similarity(oldMap[code], newMap[code]) * 100) / 100 });
    else same++;
  }
  for (const code of Object.keys(oldMap)) if (!(code in newMap)) removed.push({ code, text: oldMap[code] });
  const order = (a, b) => (a.code < b.code ? -1 : a.code > b.code ? 1 : 0);
  return { added: added.sort(order), removed: removed.sort(order), changed: changed.sort(order), same };
}

module.exports = {
  CODE_AT, CODE_ONLY, BANDS, canonCode, codeParts, cleanText, compareKey, similarity,
  parseStandards, parseStandardsRows, diffStandards, parseToc,
};
