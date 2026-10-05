/* 아주 작은 zip 읽기 (외부 라이브러리 없이) — 한글 문서 hwpx(=zip 안의 XML)를 읽는 데 쓴다
 *   readZip(buffer) → { names: [...], read(name) → Buffer | null }
 * 저장(0)·deflate(8) 방식만 다룬다. 암호·zip64 는 다루지 않는다(그런 파일이면 throw).
 */
'use strict';
const zlib = require('zlib');

function readZip(buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 22) throw new Error('zip 이 아니에요(너무 짧음)');
  // 끝에서 '중앙 디렉터리 끝' 표시(0x06054b50)를 찾는다(주석이 있으면 앞쪽에 있다)
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 22 - 0xffff); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('zip 이 아니에요(끝 표시 없음)');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries = new Map();
  for (let k = 0; k < count; k++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('zip 목록이 깨졌어요');
    const flags = buf.readUInt16LE(p + 8);
    const method = buf.readUInt16LE(p + 10);
    const csize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.slice(p + 46, p + 46 + nameLen).toString((flags & 0x800) ? 'utf8' : 'latin1');
    entries.set(name, { method, csize, local, encrypted: !!(flags & 1) });
    p += 46 + nameLen + extraLen + commentLen;
  }
  function read(name) {
    const e = entries.get(name);
    if (!e) return null;
    if (e.encrypted) throw new Error('암호가 걸린 zip 이에요: ' + name);
    if (buf.readUInt32LE(e.local) !== 0x04034b50) throw new Error('zip 항목이 깨졌어요: ' + name);
    const start = e.local + 30 + buf.readUInt16LE(e.local + 26) + buf.readUInt16LE(e.local + 28);
    const data = buf.slice(start, start + e.csize);
    if (e.method === 0) return data;
    if (e.method === 8) return zlib.inflateRawSync(data);
    throw new Error('모르는 압축 방식(' + e.method + '): ' + name);
  }
  return { names: [...entries.keys()], read };
}

module.exports = { readZip };
