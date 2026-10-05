/* 시험용 파일 만들기 (네트워크·외부 라이브러리 없이) — *.spec.js 가 아니라 시험들이 같이 쓰는 도구
 *   makeZip(files)         zip (항목: { name, data: 글자|Buffer, deflate?, cp949Name? })
 *   hwpx(lines)            한글 hwpx (문단마다 한 줄)
 *   makeCfb(streams)       MS 복합 문서(CFB, 512바이트 섹터) — { '경로/이름': Buffer } (4096바이트 미만은 미니 스트림)
 *   makeHwp(paras, opts)   한글 hwp 5.0 — 문단 글자를 HWPTAG_PARA_TEXT 레코드로, opts.compress(기본 true)·password·distribute
 *   makeXlsx(sheets)       엑셀 xlsx — [{ name, rows: [[칸…]] }] (공유 글자 사용)
 *   volumeLines(reg, opts) 기준 자료(curriculum/standards/v*.json)로 실제 별책과 같은 짜임의 문서 줄 만들기(고친 판 흉내)
 */
'use strict';
const zlib = require('zlib');

function crc32(buf) {
  let crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    let c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeZip(files) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const f of files) {
    const raw = Buffer.isBuffer(f.data) ? f.data : Buffer.from(f.data, 'utf8');
    const data = f.deflate ? zlib.deflateRawSync(raw) : raw;
    // cp949Name: UTF-8 표시 없이 한국 윈도 이름(공공기관 zip 처럼)
    const name = f.cp949Name ? f.cp949Name : Buffer.from(f.name, 'utf8');
    const flag = f.cp949Name ? 0 : 0x800;
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(flag, 6); lh.writeUInt16LE(f.deflate ? 8 : 0, 8);
    lh.writeUInt32LE(crc32(raw), 14); lh.writeUInt32LE(data.length, 18); lh.writeUInt32LE(raw.length, 22); lh.writeUInt16LE(name.length, 26);
    locals.push(lh, name, data);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(flag, 8); ch.writeUInt16LE(f.deflate ? 8 : 0, 10);
    ch.writeUInt32LE(crc32(raw), 16); ch.writeUInt32LE(data.length, 20); ch.writeUInt32LE(raw.length, 24); ch.writeUInt16LE(name.length, 28);
    ch.writeUInt32LE(offset, 42);
    centrals.push(ch, name);
    offset += 30 + name.length + data.length;
  }
  const cd = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat(locals.concat([cd, end]));
}

const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function hwpx(lines) {
  const xml = '<hs:sec xmlns:hs="x" xmlns:hp="y">' + lines.map((l) => '<hp:p><hp:run><hp:t>' + xmlEsc(l) + '</hp:t></hp:run></hp:p>').join('') + '</hs:sec>';
  return makeZip([{ name: 'mimetype', data: 'application/hwp+zip' }, { name: 'Contents/section0.xml', data: xml, deflate: true }]);
}

/* ---------- CFB(복합 문서) ---------- */
const FREE = 0xffffffff;
const END = 0xfffffffe;
const FATSECT = 0xfffffffd;
const NOSTREAM = 0xffffffff;

function makeCfb(streams) {
  const SS = 512;
  const MINI = 64;
  const CUT = 4096;
  // 디렉터리 항목: 0 뿌리, 그다음 저장소·스트림
  const entries = [{ name: 'Root Entry', type: 5, children: [] }];
  const byPath = { '': 0 };
  for (const p of Object.keys(streams)) {
    const parts = p.split('/');
    let parent = '';
    for (let i = 0; i < parts.length; i++) {
      const cur = parts.slice(0, i + 1).join('/');
      if (!(cur in byPath)) {
        const isStream = i === parts.length - 1;
        byPath[cur] = entries.length;
        entries.push({ name: parts[i], type: isStream ? 2 : 1, children: [], data: isStream ? streams[p] : null });
        entries[byPath[parent]].children.push(byPath[cur]);
      }
      parent = cur;
    }
  }
  // 미니 스트림(작은 스트림) 모으기
  const mini = [];
  const miniFat = [];
  for (const e of entries) {
    if (e.type !== 2 || e.data.length >= CUT) continue;
    const n = Math.ceil(e.data.length / MINI) || 0;
    e.start = n ? miniFat.length : END;
    for (let i = 0; i < n; i++) miniFat.push(i === n - 1 ? END : miniFat.length + 1);
    const padded = Buffer.alloc(n * MINI);
    e.data.copy(padded);
    mini.push(padded);
  }
  const miniStream = Buffer.concat(mini);
  // 일반 섹터에 놓을 덩어리들: 큰 스트림, 미니 스트림, 미니 FAT, 디렉터리
  const chunks = [];
  const place = (buf) => { const c = { buf, n: Math.max(1, Math.ceil(buf.length / SS)) }; chunks.push(c); return c; };
  for (const e of entries) if (e.type === 2 && e.data.length >= CUT) e.chunk = place(e.data);
  const miniChunk = miniStream.length ? place(miniStream) : null;
  const mfBuf = Buffer.alloc(Math.max(1, Math.ceil(miniFat.length * 4 / SS)) * SS, 0xff);
  miniFat.forEach((v, i) => mfBuf.writeUInt32LE(v, i * 4));
  const miniFatChunk = miniFat.length ? place(mfBuf) : null;
  const dirBuf = Buffer.alloc(Math.ceil(entries.length * 128 / SS) * SS);
  const dirChunk = place(dirBuf);
  const dataSectors = chunks.reduce((s, c) => s + c.n, 0);
  let fatSectors = 1;
  while (fatSectors * (SS / 4) < dataSectors + fatSectors) fatSectors++;
  let sec = 0;
  for (const c of chunks) { c.start = sec; sec += c.n; }
  const fatStart = sec;
  const fat = new Array(fatSectors * (SS / 4)).fill(FREE);
  for (const c of chunks) for (let i = 0; i < c.n; i++) fat[c.start + i] = i === c.n - 1 ? END : c.start + i + 1;
  for (let i = 0; i < fatSectors; i++) fat[fatStart + i] = FATSECT;
  // 디렉터리 채우기(형제는 오른쪽 사슬, 하위는 child)
  entries.forEach((e, i) => {
    const o = i * 128;
    const nm = Buffer.from(e.name + '\0', 'utf16le');
    nm.copy(dirBuf, o, 0, Math.min(64, nm.length));
    dirBuf.writeUInt16LE(Math.min(64, nm.length), o + 0x40);
    dirBuf[o + 0x42] = e.type;
    dirBuf[o + 0x43] = 1;
    dirBuf.writeUInt32LE(NOSTREAM, o + 0x44);
    dirBuf.writeUInt32LE(NOSTREAM, o + 0x48);
    dirBuf.writeUInt32LE(e.children.length ? e.children[0] : NOSTREAM, o + 0x4c);
    let start = END;
    let size = 0;
    if (e.type === 5) { start = miniChunk ? miniChunk.start : END; size = miniStream.length; }
    else if (e.type === 2) { size = e.data.length; start = e.chunk ? e.chunk.start : e.start; }
    dirBuf.writeUInt32LE(start, o + 0x74);
    dirBuf.writeUInt32LE(size, o + 0x78);
  });
  for (const e of entries) e.children.forEach((c, k) => { if (k + 1 < e.children.length) dirBuf.writeUInt32LE(e.children[k + 1], c * 128 + 0x48); });
  const head = Buffer.alloc(SS);
  Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]).copy(head, 0);
  head.writeUInt16LE(0x3e, 0x18); head.writeUInt16LE(3, 0x1a); head.writeUInt16LE(0xfffe, 0x1c);
  head.writeUInt16LE(9, 0x1e); head.writeUInt16LE(6, 0x20);
  head.writeUInt32LE(fatSectors, 0x2c);
  head.writeUInt32LE(dirChunk.start, 0x30);
  head.writeUInt32LE(CUT, 0x38);
  head.writeUInt32LE(miniFatChunk ? miniFatChunk.start : END, 0x3c);
  head.writeUInt32LE(miniFatChunk ? miniFatChunk.n : 0, 0x40);
  head.writeUInt32LE(END, 0x44);
  head.writeUInt32LE(0, 0x48);
  for (let i = 0; i < 109; i++) head.writeUInt32LE(i < fatSectors ? fatStart + i : FREE, 0x4c + i * 4);
  const body = Buffer.alloc((fatStart + fatSectors) * SS);
  for (const c of chunks) c.buf.copy(body, c.start * SS);
  const fatBuf = Buffer.alloc(fatSectors * SS);
  fat.forEach((v, i) => fatBuf.writeUInt32LE(v, i * 4));
  fatBuf.copy(body, fatStart * SS);
  return Buffer.concat([head, body]);
}

/* ---------- HWP 5.0 ---------- */
function record(tag, payload) {
  const size = payload.length;
  if (size < 0xfff) {
    const h = Buffer.alloc(4);
    h.writeUInt32LE((tag & 0x3ff) | (size << 20), 0);
    return Buffer.concat([h, payload]);
  }
  const h = Buffer.alloc(8);
  h.writeUInt32LE((tag & 0x3ff) | (0xfff << 20), 0);
  h.writeUInt32LE(size, 4);
  return Buffer.concat([h, payload]);
}
// 문단 글자: 보통 글자 + 문단 끝(13). opts.ctrl 이 있으면 앞에 확장 제어(8글자 크기, 예: 2=구역 정의)와 탭(9)을 섞는다
function paraPayload(text, ctrl) {
  const parts = [];
  if (ctrl) {
    const ext = Buffer.alloc(16);
    ext.writeUInt16LE(2, 0); ext.write('dces', 2, 'latin1'); ext.writeUInt16LE(2, 14);
    parts.push(ext);
  }
  for (const seg of String(text).split('\t').map((s, i) => [s, i])) {
    if (seg[1] > 0) { const tab = Buffer.alloc(16); tab.writeUInt16LE(9, 0); tab.writeUInt16LE(9, 14); parts.push(tab); }
    parts.push(Buffer.from(seg[0], 'utf16le'));
  }
  const end = Buffer.alloc(2); end.writeUInt16LE(13, 0);
  parts.push(end);
  return Buffer.concat(parts);
}
function makeHwp(paras, opts) {
  const o = Object.assign({ compress: true, password: false, distribute: false, sections: 1, ctrl: false }, opts || {});
  const fh = Buffer.alloc(256);
  fh.write('HWP Document File', 0, 'latin1');
  fh.writeUInt32LE(0x05000300, 32);
  fh.writeUInt32LE((o.compress ? 1 : 0) | (o.password ? 2 : 0) | (o.distribute ? 4 : 0), 36);
  const streams = { FileHeader: fh };
  const per = Math.ceil(paras.length / o.sections);
  for (let s = 0; s < o.sections; s++) {
    const recs = [];
    paras.slice(s * per, (s + 1) * per).forEach((p, i) => {
      recs.push(record(0x10 + 50, Buffer.alloc(22))); // 문단 머리(읽지 않는다)
      recs.push(record(0x10 + 51, paraPayload(p, o.ctrl && i === 0)));
    });
    const raw = Buffer.concat(recs);
    streams['BodyText/Section' + s] = o.compress ? zlib.deflateRawSync(raw) : raw;
  }
  return makeCfb(streams);
}

/* ---------- XLSX ---------- */
function makeXlsx(sheets) {
  const shared = [];
  const idx = new Map();
  const si = (s) => { if (!idx.has(s)) { idx.set(s, shared.length); shared.push(s); } return idx.get(s); };
  const col = (i) => { let s = ''; i++; while (i) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; };
  const files = [
    { name: '[Content_Types].xml', data: '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>' },
    { name: 'xl/workbook.xml', data: '<workbook xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
      sheets.map((s, i) => '<sheet name="' + xmlEsc(s.name) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>').join('') + '</sheets></workbook>' },
    { name: 'xl/_rels/workbook.xml.rels', data: '<Relationships>' + sheets.map((s, i) => '<Relationship Id="rId' + (i + 1) + '" Target="worksheets/sheet' + (i + 1) + '.xml"/>').join('') + '</Relationships>' },
  ];
  sheets.forEach((s, i) => {
    const rows = s.rows.map((r, ri) => '<row r="' + (ri + 1) + '">' + r.map((c, ci) => {
      if (c === null || c === undefined || c === '') return '';
      const ref = col(ci) + (ri + 1);
      return typeof c === 'number' ? '<c r="' + ref + '"><v>' + c + '</v></c>' : '<c r="' + ref + '" t="s"><v>' + si(String(c)) + '</v></c>';
    }).join('') + '</row>').join('');
    files.push({ name: 'xl/worksheets/sheet' + (i + 1) + '.xml', data: '<worksheet><sheetData>' + rows + '</sheetData></worksheet>', deflate: true });
  });
  files.push({ name: 'xl/sharedStrings.xml', data: '<sst>' + shared.map((s) => '<si><t xml:space="preserve">' + xmlEsc(s) + '</t></si>').join('') + '</sst>', deflate: true });
  return makeZip(files);
}

/* ---------- 기준 자료 → 별책 문서 줄 ---------- */
// opts: { notice, volume, change: { 코드: 새 문장 }, remove: [코드], add: [{ code, text, course, area, band }] }
function volumeLines(reg, opts) {
  const o = opts || {};
  const items = [];
  for (const code of Object.keys(reg.standards)) {
    if ((o.remove || []).includes(code)) continue;
    const e = reg.standards[code];
    items.push({ code, text: (o.change || {})[code] || e.t, course: e.c, area: e.a, band: e.b });
  }
  for (const a of o.add || []) {
    // 같은 과목·영역의 마지막 뒤에 넣는다
    let at = -1;
    items.forEach((x, i) => { if (x.course === a.course && x.area === a.area) at = i; });
    items.splice(at + 1, 0, a);
  }
  const courses = [];
  for (const x of items) if (!courses.includes(x.course)) courses.push(x.course);
  const lines = [(o.notice || reg.notice) + ' [별책 ' + (o.volume || reg.volume) + ']', reg.name, '', '차   례'];
  courses.forEach((c, i) => lines.push(c + '\t' + (3 + i * 10)));
  for (const c of courses) {
    lines.push('', c, '1. 성격 및 목표', '가. 성격', c + '은 학생이 배우는 과목이다.', '2. 내용 체계 및 성취기준', '가. 내용 체계', '핵심 아이디어', '⋅예시 내용 요소', '나. 성취기준');
    let band = null;
    let area = null;
    const mine = items.filter((x) => x.course === c);
    mine.forEach((x, i) => {
      if (x.band && x.band !== band) { band = x.band; area = null; lines.push('[' + x.band.replace('~', '∼') + ']'); }
      if (x.area !== area) {
        area = x.area;
        if (x.area) lines.push('(' + Number(/(\d{2})-\d{2}\]$/.exec(x.code)[1]) + ') ' + x.area, '');
      }
      lines.push(x.code + ' ' + x.text);
      const nx = mine[i + 1];
      if (!nx || nx.area !== x.area || nx.band !== x.band) {
        lines.push('(가) 성취기준 해설', x.code + ' 이 성취기준은 예시 해설이다.', '(나) 성취기준 적용 시 고려 사항', '예시 고려 사항을 적는다.');
      }
    });
    lines.push('3. 교수⋅학습 및 평가', '가. 교수⋅학습', '(1) 교수⋅학습의 방향', '(가) 예시 방향');
  }
  return lines;
}

module.exports = { crc32, makeZip, hwpx, makeCfb, makeHwp, makeXlsx, volumeLines, xmlEsc };
