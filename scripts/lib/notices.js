/* 교육과정 고시 읽기 (AI 없이 규칙으로) — scripts/curriculum-watch.js 가 쓴다
 *
 * 국가교육위원회 법령자료 게시판의 글과 첨부 고시문(hwpx·pdf)에서
 *   고시 번호 · 날짜 · 무엇을 고쳤는지(별책 = 교과) · 학년별 시행일 · 새로 생긴 과목 이름
 * 을 뽑아 curriculum/notices.json 에 적는다. 교과별 성취기준 원문(별책 본문)은 국가교육과정정보센터에만 있고
 * 그 사이트는 자동 접근을 막아 두어(robots.txt) 여기서 다루지 않는다 (docs/CURRICULUM-REVISION.md).
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { readZip } = require('./zip');

/* 글자 다듬기: 가운뎃점·쌍점·물결·빈칸의 여러 꼴을 하나로 */
function norm(s) {
  return String(s || '')
    .replace(/&middot;/g, '·').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[⋅‧ㆍ･・∙•]/g, '·')
    .replace(/[：]/g, ':').replace(/[∼～〜]/g, '~').replace(/[｢「]/g, '「').replace(/[｣」]/g, '」')
    .replace(/[ 　\t]/g, ' ')
    .replace(/\r/g, '').replace(/\f/g, '\n'); // pdftotext 는 쪽마다 \f, 윈도에서는 \r\n
}

/* ---------- 첨부 고시문 → 글자 ---------- */

// hwpx: zip 안의 Contents/section*.xml 에서 글자만
function hwpxText(buf) {
  const z = readZip(buf);
  const sections = z.names.filter((n) => /^Contents\/section\d+\.xml$/.test(n))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  if (!sections.length) throw new Error('hwpx 안에 본문(section)이 없어요');
  return sections.map((n) => z.read(n).toString('utf8')
    .replace(/<\/hp:p>/g, '\n').replace(/<hp:lineBreak\s*\/>/g, '\n').replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&')).join('\n');
}

// pdf: poppler 의 pdftotext 가 있어야 한다(Actions 에서는 poppler-utils 를 설치한다). 없으면 throw
function pdfText(buf) {
  const file = path.join(os.tmpdir(), 'tutor-notice-' + process.pid + '-' + Date.now() + '.pdf');
  fs.writeFileSync(file, buf);
  try {
    return execFileSync('pdftotext', ['-layout', '-enc', 'UTF-8', file, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } finally {
    try { fs.unlinkSync(file); } catch (e) { /* 지우지 못해도 된다 */ }
  }
}

// 파일 이름으로 읽는 법을 고른다. 옛 한글(.hwp)은 읽지 않는다(null)
function attachmentText(name, buf) {
  if (/\.hwpx$/i.test(name)) return hwpxText(buf);
  if (/\.pdf$/i.test(name)) return pdfText(buf);
  return null;
}

/* ---------- 게시판 ---------- */

// 법령자료 목록 → [{ docNo, title }]
function parseBoardList(html) {
  const out = [];
  const seen = new Set();
  const re = /q_bbsDocNo=(\d+)[^>]*>([\s\S]{0,300}?)<\/a>/g;
  let m;
  while ((m = re.exec(String(html || '')))) {
    const title = norm(m[2].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    if (!title || seen.has(m[1])) continue;
    seen.add(m[1]);
    out.push({ docNo: m[1], title });
  }
  return out;
}

// 글 → 첨부 [{ name, href }]
function parseAttachments(html) {
  const out = [];
  // 별책 원문은 zip·xlsx 로 올라올 수도 있다(고시문 고르기는 isCurriculumAttachment 가 따로 한다)
  const re = /<p>\s*([^<]{1,300}?\.(?:pdf|hwpx|hwp|zip|xlsx))\s*<\/p>[\s\S]{0,800}?href="([^"]*ND_fileDownload\.do[^"]*)"/gi;
  let m;
  while ((m = re.exec(String(html || '')))) out.push({ name: norm(m[1]).replace(/\s+/g, ' ').trim(), href: m[2].replace(/&amp;/g, '&') });
  return out;
}

// 초·중등학교 교육과정 고시 글인가(특수교육만의 글이 아닌가)
function isCurriculumTitle(title) {
  const t = norm(title).replace(/\s+/g, '');
  return /초·중등학교교육과정/.test(t) && /(고시|개정)/.test(t);
}
// 우리가 따르는 2022 개정 계열의 초·중등학교 교육과정 첨부인가 (2015 개정 관련·특수교육 첨부는 뺀다)
function isCurriculumAttachment(name) {
  const t = norm(name).replace(/\s+/g, '');
  return /초·중등학교교육과정/.test(t) && !/특수교육/.test(t) && !/2015개정/.test(t) && /\.(pdf|hwpx)$/i.test(t);
}

/* ---------- 고시문 → 고시 ---------- */

const LEVEL_PREFIX = { 초등학교: 'e', 중학교: 'm', 고등학교: 'h' };
const LEVEL_MAX = { e: 6, m: 3, h: 3 };

// "초등학교 1~4학년, 중학교 1학년, 고등학교 1, 2학년" → ['e1','e2','e3','e4','m1','h1','h2']
function parseGrades(text) {
  const out = [];
  const re = /(초등학교|중학교|고등학교)\s*([0-9][0-9\s,~-]*?)\s*학년/g;
  let m;
  while ((m = re.exec(norm(text)))) {
    const p = LEVEL_PREFIX[m[1]];
    for (const tok of m[2].split(',')) {
      const r = tok.trim().match(/^(\d+)\s*(?:[~-]\s*(\d+))?$/);
      if (!r) continue;
      const a = Number(r[1]);
      const b = r[2] ? Number(r[2]) : a;
      for (let g = a; g <= b && g <= LEVEL_MAX[p]; g++) if (g >= 1 && !out.includes(p + g)) out.push(p + g);
    }
  }
  return out;
}

function isoDate(y, mo, d) {
  return y + '-' + String(mo).padStart(2, '0') + '-' + String(d).padStart(2, '0');
}
function noticeId(issuer, y, n) {
  return (issuer === '교육부' ? 'moe-' : 'nec-') + y + '-' + n;
}

// 고시문(여러 고시가 이어 붙은 통합본도 된다) → [{ id, no, date, amends: [고시 번호], volumes: [{ n, to?, name }], effective: [{ date, grades }] }]
// 고시마다 머리글 "국가교육위원회 고시 제2026-1호" 가 한 줄을 차지하고, 바로 뒤에 "…에 의거하여 … 고시합니다/고시한다" 가 온다
function parseNotices(text) {
  const t = norm(text);
  const heads = [];
  // 국가법령정보센터 첨부본은 머리글 앞에 "◉" 같은 표가 붙기도 한다
  const re = /(^|\n)[ ]*(?:[◉●○◎■□▶▷◆◇•※][ ]*)?(국가교육위원회|교육부)[ ]*고시[ ]*제[ ]*(\d{4})[ ]*-[ ]*(\d+)[ ]*호[ ]*(?=\n)/g;
  let m;
  while ((m = re.exec(t))) heads.push({ at: m.index + m[1].length, issuer: m[2], y: m[3], n: m[4] });
  const out = [];
  heads.forEach((h, i) => {
    let sec = t.slice(h.at, i + 1 < heads.length ? heads[i + 1].at : t.length);
    const intro = sec.slice(0, 700);
    if (!/의거하여/.test(intro) || !/고시(합니다|한다)/.test(intro)) return; // 다른 글 속에서 고시 번호를 부른 것
    const cut = sec.search(/<참고>|\n[ ]*(전부개정|일부개정)[ ]*(교육부|국가교육위원회)/);
    if (cut > 0) sec = sec.slice(0, cut);
    sec = sec.slice(0, 6000);
    const flat = sec.replace(/\n+/g, ' ').replace(/[ ]+/g, ' ');
    const dm = sec.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
    // 무엇을 고쳤나: "초·중등학교 교육과정(교육부 고시 제2022-33호)을" / "(국가교육위원회 고시 제2024-3호, 2024. 8. 16.)의"
    const amends = [];
    const am = flat.match(/교육과정\s*\(([^)]*고시[^)]*)\)\s*(?:을|를|의)/);
    if (am) {
      const r2 = /(국가교육위원회|교육부)\s*고시\s*제\s*(\d{4})\s*-\s*(\d+)\s*호/g;
      let k;
      while ((k = r2.exec(am[1]))) amends.push(k[1] + ' 고시 제' + k[2] + '-' + k[3] + '호');
    }
    // 별책: "5. 사회과 교육과정은 【별책 7】과 같습니다." / "11. 전문 교과 교육과정은 【별책 23~39】와"
    const volumes = [];
    // (2022-33 의 "25. 한국어 교육과정 【별책 41】과 같다." 처럼 '은/는'이 빠진 줄도 받는다)
    const vr = /(?:^|\n)[ ]*\d+[ ]*\.[ ]*([^\n]*?)(?:은|는)?[ ]*【[ ]*별책[ ]*(\d+)(?:[ ]*~[ ]*(\d+))?[ ]*】/g;
    let v;
    while ((v = vr.exec(sec))) {
      const name = v[1].replace(/\s+/g, ' ').trim().replace(/[ ]*교육과정$/, '').replace(/^초·중등학교 교육과정 /, '').trim();
      const item = { n: Number(v[2]), name };
      if (v[3]) item.to = Number(v[3]);
      if (!volumes.some((x) => x.n === item.n)) volumes.push(item);
    }
    // 시행일: 부칙의 "가. 2026년 3월 1일: 고등학교 1, 2학년"
    const effective = [];
    const bu = sec.search(/부[ ]*칙/);
    if (bu >= 0) {
      const er = /(?:^|\n)[ ]*[가-하][ ]*\.[ ]*(\d{4})년[ ]*(\d{1,2})월[ ]*(\d{1,2})일[ ]*:[ ]*([^\n]+)/g;
      const part = sec.slice(bu);
      let e;
      while ((e = er.exec(part))) {
        const grades = parseGrades(e[4]);
        if (grades.length) effective.push({ date: isoDate(e[1], e[2], e[3]), grades });
      }
    }
    out.push({
      id: noticeId(h.issuer, h.y, h.n),
      no: h.issuer + ' 고시 제' + h.y + '-' + h.n + '호',
      date: dm ? isoDate(dm[1], dm[2], dm[3]) : null,
      amends,
      volumes,
      effective,
    });
  });
  // 같은 고시가 두 번 나오면(통합본) 내용이 더 많은 쪽
  const by = new Map();
  for (const n of out) {
    const old = by.get(n.id);
    if (!old || n.volumes.length + n.effective.length > old.volumes.length + old.effective.length) by.set(n.id, n);
  }
  return [...by.values()];
}

/* ---------- 지도(meta.json)와 견주기 ---------- */

// 별책 이름 목록에서 기준 고시(meta.volumes)에 없던 과목 이름: "바른 생활, 슬기로운 생활, 건강한 생활, 즐거운 생활" → ['건강한 생활']
function newSubjectNames(name, baseName) {
  const split = (s) => String(s || '').split(/\s*,\s*/).map((x) => x.trim()).filter(Boolean);
  const base = new Set(split(baseName));
  if (!base.size) return [];
  return split(name).filter((x) => !base.has(x));
}

// 받아들일 고시인가: 기준 고시보다 뒤이고, 고친 대상이 기준 고시이거나 이미 받아들인 고시
function acceptable(notice, meta, acceptedIds) {
  if (!notice.date || !notice.volumes.length || !notice.effective.length) return false;
  const basis = meta.basis || {};
  if (basis.date && notice.date <= basis.date) return false;
  if (notice.no === basis.no) return false;
  return notice.amends.some((a) => a === basis.no || acceptedIds.has(a));
}

// 새로 읽은 고시들을 기록에 더한다(날짜 순, 이미 있는 것은 건너뜀) → { notices, added }
function mergeNotices(existing, parsed, meta, source) {
  const list = (existing || []).slice();
  const accepted = new Set(list.map((n) => n.no));
  const added = [];
  const sorted = parsed.slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  for (const n of sorted) {
    if (list.some((x) => x.id === n.id)) continue;
    if (!acceptable(n, meta, accepted)) continue;
    const rec = Object.assign({}, n, source || {});
    const base = (meta.volumes || {});
    rec.volumes = n.volumes.map((v) => {
      const extra = newSubjectNames(v.name, base[v.n]);
      return extra.length ? Object.assign({}, v, { newSubjects: extra }) : v;
    });
    list.push(rec);
    accepted.add(n.no);
    added.push(rec);
  }
  list.sort((a, b) => a.date.localeCompare(b.date));
  return { notices: list, added };
}

module.exports = {
  norm, hwpxText, pdfText, attachmentText,
  parseBoardList, parseAttachments, isCurriculumTitle, isCurriculumAttachment,
  parseGrades, parseNotices, newSubjectNames, acceptable, mergeNotices,
};
