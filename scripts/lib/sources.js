/* 교육과정 고시·별책 원문을 찾는 공식 경로들 — 한 곳에 기대지 않는다 (AI·비공식 자료 없음)
 *
 *   1) 국가교육위원회 > 자료실 > 법령자료 — 고시 글과 첨부(고시문, 때로 별책)
 *   2) 법제처 국가법령정보센터 — 행정규칙 「초·중등학교 교육과정」의 연혁(고시 번호·날짜)과 판마다의 첨부(고시문·제개정이유서)
 *   3) 교육부 > 입법·행정예고 — 교육부 고시 시절의 고시 글과 첨부(2022-33호의 별책 원문 묶음)
 * 비공식 블로그·자료 공유 사이트는 쓰지 않는다. 국가교육과정정보센터(ncic)는 robots.txt 가 자동 접근을 막아 자동으로는 보지 않는다
 * (사람이 거기서 받은 파일은 scripts/curriculum-standards.js analyze 로 같은 규칙에 넣을 수 있다).
 */
'use strict';
const N = require('./notices');
const R = require('./revision');

const NEC = {
  name: '국가교육위원회 법령자료',
  origin: 'https://www.ne.go.kr',
  list: '/user/bbs/BD_selectBbsList.do?q_bbsSn=1016',
  view: (docNo) => 'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=' + docNo,
};
const LAW = {
  name: '국가법령정보센터(행정규칙 초·중등학교 교육과정)',
  origin: 'https://www.law.go.kr',
  rule: '/행정규칙/초·중등학교교육과정',
  history: '/LSW/admRulHstListR.do',
  files: '/LSW/admRulAttFlList.do',
  download: (flSeq) => 'https://www.law.go.kr/LSW/flDownload.do?flSeq=' + flSeq,
  info: (seq) => 'https://www.law.go.kr/LSW/admRulInfoP.do?admRulSeq=' + seq,
};
const MOE = {
  name: '교육부 입법·행정예고',
  origin: 'https://www.moe.go.kr',
  search: (q) => 'https://www.moe.go.kr/boardCnts/listRenew.do?boardID=141&m=040401&s=moe&searchType=S&searchStr=' + encodeURIComponent(q),
  view: (seq) => 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=141&boardSeq=' + seq + '&lev=0&m=040401&s=moe',
};

const decode = (s) => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&middot;/g, '·').replace(/\s+/g, ' ').trim();
const squash = (s) => N.norm(String(s || '')).replace(/\s+/g, '');

/* ---------- 국가법령정보센터 ---------- */

// 행정규칙 바로가기 페이지 → 지금 판의 admRulSeq
function parseLawFrame(html) {
  const m = /admRulInfoP\.do\?admRulSeq=(\d+)/.exec(html || '');
  return m ? m[1] : null;
}
// 연혁 목록 → [{ seq, no, date, kind }]  ("[국가교육위원회고시 제2026-1호, 2026. 1. 21., 일부개정]")
function parseLawHistory(html) {
  const out = [];
  const re = /admRulViewHst\('[A-Z]*',\s*'(\d+)'\)[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html || ''))) {
    const t = decode(m[2]) + ' ' + decode((html.slice(m.index + m[0].length, m.index + m[0].length + 400).match(/^[\s\S]*?(?=<a\s|$)/) || [''])[0]);
    const k = /(국가교육위원회|교육부|교육과학기술부)\s*고시\s*제\s*(\d{4})\s*-\s*(\d+)\s*호\s*,\s*(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\.\s*,\s*([^\]]+)\]/.exec(t);
    if (!k) continue;
    out.push({
      seq: m[1],
      no: k[1] + ' 고시 제' + k[2] + '-' + k[3] + '호',
      date: k[4] + '-' + k[5].padStart(2, '0') + '-' + k[6].padStart(2, '0'),
      kind: k[7].trim(),
    });
  }
  return out;
}
// 첨부 목록 → [{ name, href }]
function parseLawAttachments(html) {
  const out = [];
  const re = /<a[^>]*href="(flDownload\.do\?flSeq=(\d+))"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html || ''))) {
    const name = decode(m[3]);
    if (name) out.push({ name, href: LAW.download(m[2]) });
  }
  if (out.length) return out;
  // 이름과 주소가 따로 있는 꼴: 이름 목록과 주소 목록을 순서대로 맞춘다
  const hrefs = [...String(html || '').matchAll(/href="flDownload\.do\?flSeq=(\d+)"/g)].map((x) => x[1]);
  const names = decode(html).match(/[^\s][^]*?\.(?:hwpx|hwp|pdf|zip|xlsx)(?=\s|$)/gi) || [];
  return hrefs.length === names.length ? hrefs.map((h, i) => ({ name: names[i].trim(), href: LAW.download(h) })) : [];
}

// 연혁 → [{ seq, no, date, kind }] — 한 번 돌 때 한 번만 읽도록 o 에 담아 둔다
async function lawVersions(o) {
  if (!o._lawVersions) {
    o._lawVersions = (async () => {
      if (!(await o.robots(LAW.origin, '/LSW/'))) throw new Error('robots.txt 가 국가법령정보센터를 막았어요');
      const seq = parseLawFrame(await o.getText(encodeURI(LAW.origin + LAW.rule)));
      if (!seq) throw new Error(LAW.name + ': 행정규칙 페이지에서 판 번호를 찾지 못했어요(모양이 바뀌었을 수 있어요)');
      const list = parseLawHistory(await o.post(LAW.origin + LAW.history, { admRulSeq: seq }));
      if (!list.length) throw new Error(LAW.name + ': 연혁 목록을 읽지 못했어요(모양이 바뀌었을 수 있어요)');
      return list;
    })();
  }
  return o._lawVersions;
}
async function lawAttachments(seq, o) {
  return parseLawAttachments(await o.post(LAW.origin + LAW.files, { admRulSeq: seq }));
}

// 국가법령정보센터만으로 고시 찾기(국가교육위원회 경로가 막히거나 바뀌었을 때) → parseNotices 꼴 고시들
async function lawNotices(o, meta) {
  const basis = (meta && meta.basis) || {};
  const versions = (await lawVersions(o)).filter((v) => !basis.date || v.date > basis.date);
  const out = [];
  const problems = [];
  for (const v of versions) {
    await o.sleep(800);
    const files = (await lawAttachments(v.seq, o)).filter((f) => /고시/.test(f.name) && !/이유서/.test(f.name) && /\.(hwpx|hwp|pdf)$/i.test(f.name));
    // 같은 고시문이 여러 형식이면 hwpx → hwp → pdf 순으로 하나만
    const pick = ['hwpx', 'hwp', 'pdf'].map((x) => files.find((f) => new RegExp('\\.' + x + '$', 'i').test(f.name))).find(Boolean);
    if (!pick) { problems.push({ where: LAW.info(v.seq), title: v.no, why: '고시문 첨부가 없어요' }); continue; }
    await o.sleep(800);
    const buf = await o.getBuffer(pick.href);
    let text = null;
    try { text = /\.hwp$/i.test(pick.name) ? require('./hwp').hwpText(buf) : N.attachmentText(pick.name, buf); } catch (e) { text = null; }
    const found = text ? N.parseNotices(text).filter((n) => squash(n.no) === squash(v.no)) : [];
    if (!found.length) { problems.push({ where: LAW.info(v.seq), title: v.no, why: '고시문에서 고시를 읽지 못했어요' }); continue; }
    for (const n of found) out.push(Object.assign(n, { url: LAW.info(v.seq), file: pick.name, via: 'law' }));
  }
  return { notices: out, problems };
}

/* ---------- 교육부 입법·행정예고 ---------- */

function parseMoeSearch(html) {
  const out = [];
  const re = /goView\('141',\s*'(\d+)'[^>]*>([\s\S]{0,400}?)<\/a>/g;
  let m;
  while ((m = re.exec(html || ''))) out.push({ seq: m[1], title: decode(m[2]) });
  return out;
}
// 글 보기 → [{ name, href }] ("<li> 이름 [ 15.1 MB ] <a href="/boardCnts/fileDown.do?…">")
function parseMoeAttachments(html) {
  const out = [];
  const re = /<li>\s*([^<]*?)\s*\[\s*[\d.,]+\s*[KMG]?B\s*\]\s*<a[^>]*href="(\/boardCnts\/fileDown\.do\?[^"]+)"/g;
  let m;
  while ((m = re.exec(html || ''))) out.push({ name: decode(m[1]).replace(/\+/g, ' '), href: MOE.origin + m[2].replace(/&amp;/g, '&') });
  return out;
}

/* ---------- 별책 원문 찾기 ---------- */

// 첨부 이름이 이 별책을 담고 있을 수 있는가: "[별책7] 사회과…", "[별책5_14] 국어+…zip", "사회과 교육과정.hwp"
function mayContain(name, v, volName) {
  const t = N.norm(name);
  const r = /별책\s*(\d+)\s*(?:[_~∼-]\s*(\d+))?/.exec(t);
  if (r) return Number(r[1]) === v || (!!r[2] && v >= Number(r[1]) && v <= Number(r[2]));
  return !!volName && squash(t).includes(squash(volName));
}

// 고시 하나에서 필요한 별책들의 확정 원문 후보를 공식 경로마다 찾는다
//   → { docs: { v: [{ url, name, title, archive?, buf, sha256, bytes, route }] }, tried: [{ route, result }] }
async function findVolumeDocs(notice, volumes, o, volNames) {
  const docs = {};
  const tried = [];
  const want = (name) => volumes.filter((v) => mayContain(name, v, volNames && volNames[v]));
  // base: 첨부 주소가 "/component/…" 처럼 상대 주소일 때 붙일 글 주소
  async function take(route, title, files, base) {
    let used = 0;
    for (const f of files) {
      const vs = want(f.name);
      if (!vs.length) continue;
      if (R.isDraft(f.name, title)) { tried.push({ route, result: '확정 전 문서(행정예고본·신구대비표 등)라 쓰지 않음: ' + f.name }); continue; }
      let url;
      try { url = new URL(f.href, base).href; } catch (e) { tried.push({ route, result: '첨부 주소를 알 수 없음: ' + f.name }); continue; }
      await o.sleep(800);
      let buf;
      try { buf = await o.getBuffer(url); } catch (e) { tried.push({ route, result: '내려받지 못함: ' + f.name + ' (' + e.message + ')' }); continue; }
      for (const d of R.expandFiles(f.name, buf)) {
        const dv = R.volumeOfName(d.name);
        for (const v of vs) {
          if (dv !== null && dv !== v) continue;
          if (R.isDraft(d.name)) continue;
          (docs[v] = docs[v] || []).push({ url, name: d.name, title, archive: d.archive, buf: d.buf, sha256: R.sha256(d.buf), bytes: d.buf.length, route });
          used++;
        }
      }
    }
    return used;
  }

  // 1) 국가교육위원회 법령자료: 고시를 찾은 그 글
  if (notice.url && /ne\.go\.kr/.test(notice.url)) {
    try {
      const html = await o.getText(notice.url);
      const files = N.parseAttachments(html);
      const n = await take(NEC.name, notice.no, files, notice.url);
      tried.push({ route: NEC.name, result: n ? '별책 원문 ' + n + '개 찾음' : '첨부 ' + files.length + '개 중 별책 원문 없음(고시문만 있음)' });
    } catch (e) { tried.push({ route: NEC.name, result: '읽지 못함: ' + e.message }); }
  }
  // 2) 국가법령정보센터: 이 고시 판의 첨부
  try {
    await o.sleep(800);
    const ver = (await lawVersions(o)).find((x) => squash(x.no) === squash(notice.no));
    if (!ver) tried.push({ route: LAW.name, result: '연혁에 이 고시가 아직 없음' });
    else {
      const files = await lawAttachments(ver.seq, o);
      const n = await take(LAW.name, notice.no, files, LAW.origin + "/LSW/");
      tried.push({ route: LAW.name, result: n ? '별책 원문 ' + n + '개 찾음' : '첨부 ' + files.length + '개 중 별책 원문 없음(고시문·제개정이유서만 있음)' });
    }
  } catch (e) { tried.push({ route: LAW.name, result: '읽지 못함: ' + e.message }); }
  // 3) 교육부 입법·행정예고: 교육부 고시일 때만(2022년 9월 뒤로는 국가교육위원회가 고시한다)
  if (/^교육부/.test(notice.no)) {
    try {
      if (!(await o.robots(MOE.origin, '/boardCnts/'))) throw new Error('robots.txt 가 막았어요');
      const q = notice.no.replace(/^교육부\s*/, '').replace(/\s+/g, '');
      const posts = parseMoeSearch(await o.getText(MOE.search(q))).filter((p) => squash(p.title).includes(squash(q)) && !R.isDraft(p.title));
      let n = 0;
      for (const p of posts.slice(0, 3)) {
        await o.sleep(800);
        n += await take(MOE.name, p.title, parseMoeAttachments(await o.getText(MOE.view(p.seq))), MOE.view(p.seq));
      }
      tried.push({ route: MOE.name, result: n ? '별책 원문 ' + n + '개 찾음' : '글 ' + posts.length + '개에서 별책 원문 없음' });
    } catch (e) { tried.push({ route: MOE.name, result: '읽지 못함: ' + e.message }); }
  }
  return { docs, tried };
}

module.exports = {
  NEC, LAW, MOE,
  parseLawFrame, parseLawHistory, parseLawAttachments, parseMoeSearch, parseMoeAttachments,
  lawVersions, lawAttachments, lawNotices, mayContain, findVolumeDocs,
};
