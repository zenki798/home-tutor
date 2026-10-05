/* 한글 문서(.hwp, HWP 5.0) 글자 읽기 — 외부 라이브러리 없이
 *   readCfb(buf)  → { names: ['FileHeader', 'BodyText/Section0', …], read(path) → Buffer | null }
 *     .hwp 는 MS 복합 문서(CFB/OLE2) 안에 스트림으로 저장된다. 큰 스트림은 일반 섹터(FAT), 작은 스트림은 미니 스트림(miniFAT).
 *   hwpText(buf)  → 본문 글자(문단마다 줄바꿈). 표 칸의 글자도 문서 순서대로 나온다.
 *     BodyText/SectionN 을 (압축이면 raw deflate 를 풀어) 레코드로 읽고, 문단 글자(HWPTAG_PARA_TEXT)만 모은다.
 *     암호가 걸렸거나 배포용(잠긴) 문서는 읽지 않는다(throw) → 호출하는 쪽이 "수동 확인"으로 돌린다.
 * 근거: 한글과컴퓨터 공개 문서 "한글 문서 파일 형식 5.0", MS-CFB.
 */
'use strict';
const zlib = require('zlib');

const END = 0xfffffffe;
const FREE = 0xffffffff;

function readCfb(buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 512 || buf.readUInt32LE(0) !== 0xe011cfd0 || buf.readUInt32LE(4) !== 0xe11ab1a1) {
    throw new Error('복합 문서(hwp)가 아니에요');
  }
  const sectorSize = 1 << buf.readUInt16LE(0x1e);
  const miniSize = 1 << buf.readUInt16LE(0x20);
  const numFat = buf.readUInt32LE(0x2c);
  const dirStart = buf.readUInt32LE(0x30);
  const cutoff = buf.readUInt32LE(0x38);
  const miniFatStart = buf.readUInt32LE(0x3c);
  const numMiniFat = buf.readUInt32LE(0x40);
  let difat = buf.readUInt32LE(0x44);
  const numDifat = buf.readUInt32LE(0x48);
  const maxSector = Math.floor(buf.length / sectorSize);
  const offset = (s) => (s + 1) * sectorSize; // 머리(헤더)가 0번 앞 한 섹터를 차지한다

  // FAT 섹터 목록(DIFAT): 머리에 109개, 넘으면 DIFAT 섹터 사슬
  const fatSectors = [];
  for (let i = 0; i < 109 && fatSectors.length < numFat; i++) {
    const s = buf.readUInt32LE(0x4c + i * 4);
    if (s !== FREE) fatSectors.push(s);
  }
  for (let k = 0; fatSectors.length < numFat && difat !== END && difat !== FREE && k <= numDifat; k++) {
    if (difat >= maxSector) throw new Error('복합 문서의 DIFAT 가 깨졌어요');
    const off = offset(difat);
    for (let i = 0; i < sectorSize / 4 - 1 && fatSectors.length < numFat; i++) {
      const s = buf.readUInt32LE(off + i * 4);
      if (s !== FREE) fatSectors.push(s);
    }
    difat = buf.readUInt32LE(off + sectorSize - 4);
  }
  const per = sectorSize / 4;
  const fat = new Uint32Array(fatSectors.length * per);
  fatSectors.forEach((s, k) => {
    if (s >= maxSector) throw new Error('복합 문서의 FAT 가 깨졌어요');
    const off = offset(s);
    for (let i = 0; i < per; i++) fat[k * per + i] = buf.readUInt32LE(off + i * 4);
  });

  function chain(start, table, limit) {
    const out = [];
    const seen = new Set();
    let s = start;
    while (s !== END && s !== FREE) {
      if (s >= table.length || seen.has(s) || out.length > limit) throw new Error('복합 문서의 섹터 사슬이 깨졌어요');
      seen.add(s);
      out.push(s);
      s = table[s];
    }
    return out;
  }
  function readRegular(start, size) {
    if (start === END || start === FREE) return Buffer.alloc(0);
    const secs = chain(start, fat, maxSector + 1);
    const data = Buffer.concat(secs.map((s) => {
      if (s >= maxSector) throw new Error('복합 문서의 섹터가 파일 밖이에요');
      return buf.slice(offset(s), offset(s) + sectorSize);
    }));
    return size === undefined ? data : data.slice(0, size);
  }

  // 디렉터리(항목 128바이트): 이름(UTF-16LE), 종류(1 저장소·2 스트림·5 뿌리), 왼쪽·오른쪽·자식, 시작 섹터, 크기
  const dir = readRegular(dirStart);
  const entries = [];
  for (let i = 0; i + 128 <= dir.length; i += 128) {
    const nameLen = dir.readUInt16LE(i + 0x40);
    entries.push({
      name: nameLen >= 2 ? dir.slice(i, i + Math.min(64, nameLen) - 2).toString('utf16le') : '',
      type: dir[i + 0x42],
      left: dir.readUInt32LE(i + 0x44),
      right: dir.readUInt32LE(i + 0x48),
      child: dir.readUInt32LE(i + 0x4c),
      start: dir.readUInt32LE(i + 0x74),
      size: dir.readUInt32LE(i + 0x78),
    });
  }
  const root = entries[0];
  if (!root || root.type !== 5) throw new Error('복합 문서의 뿌리 항목이 없어요');

  // 미니 스트림(뿌리 항목의 데이터)과 미니 FAT
  const miniStream = readRegular(root.start, root.size);
  const miniFatBuf = numMiniFat ? readRegular(miniFatStart) : Buffer.alloc(0);
  const miniFat = new Uint32Array(Math.floor(miniFatBuf.length / 4));
  for (let i = 0; i < miniFat.length; i++) miniFat[i] = miniFatBuf.readUInt32LE(i * 4);

  function readStream(e) {
    if (e.size < cutoff) {
      const secs = chain(e.start, miniFat, Math.ceil(miniStream.length / miniSize) + 1);
      return Buffer.concat(secs.map((s) => miniStream.slice(s * miniSize, (s + 1) * miniSize))).slice(0, e.size);
    }
    return readRegular(e.start, e.size);
  }

  // 트리(형제는 왼쪽·오른쪽, 하위는 자식) → "저장소/스트림" 경로
  const paths = new Map();
  const visited = new Set();
  (function walk(id, prefix) {
    if (id === FREE || id >= entries.length || visited.has(id)) return;
    visited.add(id);
    const e = entries[id];
    walk(e.left, prefix);
    walk(e.right, prefix);
    if (e.type === 2) paths.set(prefix + e.name, e);
    else if (e.type === 1) walk(e.child, prefix + e.name + '/');
  })(root.child, '');

  return { names: [...paths.keys()], read: (p) => (paths.has(p) ? readStream(paths.get(p)) : null) };
}

/* ---------- HWP 본문 ---------- */

const TAG_PARA_TEXT = 0x10 + 51;
// 한 글자(2바이트) 제어 문자. 나머지 0~31 은 8글자(16바이트)짜리 확장·인라인 제어
const CHAR_CTRL = new Set([0, 10, 13, 24, 25, 26, 27, 28, 29, 30, 31]);

function paraText(b) {
  let s = '';
  for (let i = 0; i + 1 < b.length;) {
    const c = b.readUInt16LE(i);
    if (c < 32) {
      if (CHAR_CTRL.has(c)) {
        if (c === 10) s += '\n';
        else if (c === 30 || c === 31) s += ' ';
        i += 2;
      } else {
        if (c === 9) s += '\t';
        i += 16;
      }
    } else {
      s += String.fromCharCode(c);
      i += 2;
    }
  }
  return s;
}

function hwpText(buf) {
  const cfb = readCfb(buf);
  const fh = cfb.read('FileHeader');
  if (!fh || fh.length < 40 || fh.slice(0, 17).toString('latin1') !== 'HWP Document File') throw new Error('한글(hwp) 문서가 아니에요');
  const props = fh.readUInt32LE(36);
  if (props & 2) throw new Error('암호가 걸린 hwp 예요');
  if (props & 4) throw new Error('배포용(잠긴) hwp 예요');
  const compressed = !!(props & 1);
  const sections = cfb.names.filter((n) => /^BodyText\/Section\d+$/.test(n))
    .sort((a, b) => Number(a.match(/\d+$/)[0]) - Number(b.match(/\d+$/)[0]));
  if (!sections.length) throw new Error('hwp 안에 본문(BodyText)이 없어요');
  const out = [];
  for (const name of sections) {
    let data = cfb.read(name);
    if (compressed) data = zlib.inflateRawSync(data);
    let p = 0;
    while (p + 4 <= data.length) {
      const h = data.readUInt32LE(p);
      p += 4;
      const tag = h & 0x3ff;
      let size = (h >>> 20) & 0xfff;
      if (size === 0xfff) {
        if (p + 4 > data.length) break;
        size = data.readUInt32LE(p);
        p += 4;
      }
      if (p + size > data.length) throw new Error('hwp 본문 레코드가 깨졌어요');
      if (tag === TAG_PARA_TEXT) out.push(paraText(data.slice(p, p + size)));
      p += size;
    }
  }
  return out.join('\n');
}

module.exports = { readCfb, hwpText };
