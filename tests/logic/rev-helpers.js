/* 성취기준 자동 반영 시험들이 같이 쓰는 도구 — *.spec.js 가 아니다
 *   실제 기준 자료(공식 원문에서 뽑은 curriculum/standards/)와 실제 지도(curriculum/*.json)를 임시 폴더에 복사해 쓰고,
 *   공식 사이트 응답은 가짜로 만든다(네트워크 없음).
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const B = require('./builders');

const ROOT = path.join(__dirname, '..', '..');
const R = require(path.join(ROOT, 'scripts', 'lib', 'revision.js'));
const REAL = path.join(ROOT, 'curriculum', 'standards');
const readReg = (v) => JSON.parse(fs.readFileSync(path.join(REAL, 'v' + v + '.json'), 'utf8'));
const META = {
  basis: { no: '교육부 고시 제2022-33호', date: '2022-12-22' },
  volumes: { 7: '사회과', 14: '영어과', 15: '바른 생활, 슬기로운 생활, 즐거운 생활' },
  covers: { 7: { subjects: ['soc', 'hist'], except: ['soc-h-ethics'] }, 14: { subjects: ['eng'] }, 15: { subjects: ['life'] } },
  name: '2022 개정 교육과정', version: '2022',
};
const NEC_URL = 'https://www.ne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1016&q_bbsDocNo=20240927163706792';
const NOTICE = {
  id: 'nec-2024-3', no: '국가교육위원회 고시 제2024-3호', date: '2024-08-16', discovered: '2024-08-20', amends: ['교육부 고시 제2022-33호'],
  volumes: [{ n: 1, name: '총론' }, { n: 7, name: '사회과' }, { n: 14, name: '영어과' }],
  effective: [{ date: '2025-03-01', grades: ['e1', 'e2', 'e3', 'e4', 'm1', 'h1'] }, { date: '2026-03-01', grades: ['e5', 'e6', 'm2', 'h2'] }, { date: '2027-03-01', grades: ['m3', 'h3'] }],
  url: NEC_URL,
};
// 실제 사회과 성취기준 두 개를 조금 고친 판(국가유산기본법에 따른 용어 정리를 흉내) — [4사06-01] 은 초4 사회, [9역10-04] 는 중3 역사 단원이 쓴다
const CHANGE7 = {
  '[4사06-01]': '지역의 국가유산을 통해 국가유산의 의미와 유형을 알아보고, 국가유산의 가치를 탐색한다.',
  '[9역10-04]': '고려의 국가유산과 대외 교류의 사례를 조사하여 그 특징을 파악한다.',
};
// 실제 공공기관 zip 처럼 UTF-8 표시가 없는 CP949 이름(교육부 별책 묶음에서 그대로 가져온 바이트)
const CP949 = {
  '[별책7] 사회과 교육과정.hwp': Buffer.from('5bbab0c3a5375d20bbe7c8b8b0fa20b1b3c0b0b0fac1a42e687770', 'hex'),
  '[별책14] 영어과 교육과정.hwp': Buffer.from('5bbab0c3a531345d20bfb5beeeb0fa20b1b3c0b0b0fac1a42e687770', 'hex'),
};
const SAME = { status: 'same' }; // 두 공식 경로의 시행일·별책이 같다고 확인됨

// 임시 curriculum 폴더: 기준 자료 + meta + (기본) 실제 지도 파일
//   full: 다루는 별책 7권 모두 + 실제 meta.json (지도 코드 전체를 견주는 --check 용)
function tmpCur(vols, opts) {
  const o = Object.assign({ map: true }, opts || {});
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tutor-rev-'));
  fs.mkdirSync(path.join(dir, 'standards'));
  for (const v of o.full ? [5, 6, 7, 8, 9, 14, 15] : vols || [7, 14, 15]) fs.copyFileSync(path.join(REAL, 'v' + v + '.json'), path.join(dir, 'standards', 'v' + v + '.json'));
  if (o.full) fs.copyFileSync(path.join(ROOT, 'curriculum', 'meta.json'), path.join(dir, 'meta.json'));
  else fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(META));
  if (o.map) {
    for (const f of fs.readdirSync(path.join(ROOT, 'curriculum'))) {
      if (/\.json$/.test(f) && !['meta.json', 'notices.json'].includes(f)) fs.copyFileSync(path.join(ROOT, 'curriculum', f), path.join(dir, f));
    }
  }
  return dir;
}
const clone = (x) => JSON.parse(JSON.stringify(x));
// 실제 기준 자료로 만든 별책 문서(hwp) — 후보 문서 꼴
function doc7(change, no, opts) {
  const lines = B.volumeLines(readReg((opts && opts.volume) || 7), { notice: no || NOTICE.no, change: change || CHANGE7 });
  const buf = (opts && opts.edit) ? B.makeHwp(opts.edit(lines)) : B.makeHwp(lines);
  return { url: (opts && opts.url) || 'https://www.ne.go.kr/component/file/ND_fileDownload.do?q_fileId=s7', name: (opts && opts.name) || '[별책 7] 사회과 교육과정.hwp', buf, sha256: R.sha256(buf), bytes: buf.length };
}
// R.judgeVolume 을 두 공식 경로 확인(same)과 함께
function judge(cur, store, notice, docs, extra) {
  return R.judgeVolume(Object.assign({ curDir: cur, store, notice, volume: 7, docs, at: '2026-10-05T12:00:00.000Z', cross: SAME }, extra || {}));
}
const ATTACH = (name, id) => '<li><p>' + name + '</p><a href="/component/file/ND_fileDownload.do?q_fileSn=1&amp;q_fileId=' + id + '">다운로드</a></li>';
const GOSI_LINES = (n) => [n.no, ' 초·중등교육법 제23조제2항에 의거하여 초·중등학교 교육과정(교육부 고시 제2022-33호)을 다음과 같이 일부 개정하여 고시합니다.', '2024년 8월 16일']
  .concat(n.volumes.map((v, i) => ' ' + (i + 1) + '. ' + v.name + ' 교육과정은 【별책 ' + v.n + '】과 같습니다.'))
  .concat(['부 칙', '   가. 2025년 3월 1일: 초등학교 1~4학년, 중학교 1학년, 고등학교 1학년', '   나. 2026년 3월 1일: 초등학교 5, 6학년, 중학교 2학년, 고등학교 2학년', '   다. 2027년 3월 1일: 중학교 3학년, 고등학교 3학년']);

// 가짜 공식 사이트: NEC 글(첨부 목록) · 첨부 파일 · 국가법령정보센터(바로가기·연혁·첨부)
function fakeNet(o) {
  const calls = [];
  const files = o.files || {};
  return {
    calls,
    robots: async (origin) => !(o.blocked || []).includes(origin),
    sleep: async () => {},
    getText: async (u) => {
      calls.push(u);
      if (o.post && u === NEC_URL) return o.post;
      if (/law\.go\.kr/.test(u) && o.law) return '<iframe src="/LSW//admRulInfoP.do?admRulSeq=111&amp;chrClsCd=010201"></iframe>';
      throw new Error('없는 주소 ' + u);
    },
    post: async (u, form) => {
      calls.push(u + ' ' + JSON.stringify(form));
      if (!o.law) throw new Error('없는 주소 ' + u);
      // lawAbsent: 국가법령정보센터에 아직 이 고시가 실리지 않음(연혁에 기준 고시만)
      if (/admRulHstListR/.test(u) && o.lawAbsent) return '<a href="#AJAX" onclick="javascript:admRulViewHst(\'N\',\'333\');return false;"> 1. 초·중등학교 교육과정 [시행 2024. 3. 1.] [교육부고시 제2022-33호, 2022. 12. 22., 전부개정]</a>';
      if (/admRulHstListR/.test(u)) return '<a href="#AJAX" onclick="javascript:admRulViewHst(\'N\',\'222\');return false;"> 1. 초·중등학교 교육과정 [시행 2025. 3. 1.] [국가교육위원회고시 제2024-3호, 2024. 8. 16., 일부개정]</a>';
      if (/admRulAttFlList/.test(u)) return '<a href="flDownload.do?flSeq=9">국가교육위원회 고시 제2024-3호(초·중등학교 교육과정).hwpx</a>';
      throw new Error('없는 주소 ' + u);
    },
    getBuffer: async (u) => {
      calls.push(u);
      const m = /q_fileId=([a-z0-9]+)/.exec(u);
      if (m && files[m[1]]) return files[m[1]];
      if (/flSeq=9/.test(u) && o.law) return B.hwpx(GOSI_LINES(o.lawNotice || NOTICE));
      throw new Error('없는 주소 ' + u);
    },
  };
}
// 폴더 안 모든 파일의 sha256 (기록 전·후 비교)
function treeHash(dir) {
  const out = {};
  (function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) walk(f);
      else out[path.relative(dir, f).split(path.sep).join('/')] = R.sha256(fs.readFileSync(f));
    }
  })(dir);
  return out;
}

module.exports = { ROOT, R, REAL, readReg, META, NEC_URL, NOTICE, CHANGE7, CP949, SAME, tmpCur, clone, doc7, judge, ATTACH, GOSI_LINES, fakeNet, treeHash };
