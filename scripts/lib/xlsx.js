/* 엑셀 문서(.xlsx) 글자 읽기 — 외부 라이브러리 없이
 *   xlsxSheets(buf) → [{ name, rows: [[칸 글자, …], …] }]   (빈 칸은 '', 행·열 위치를 지킨다)
 *   xlsxText(buf)   → 시트마다 "[시트 이름]" 줄 + 한 행 = 한 줄(칸은 탭으로 구분)
 * .xlsx 는 zip 안의 XML 이다: xl/workbook.xml(시트 이름·순서), xl/_rels/workbook.xml.rels(시트 파일),
 * xl/sharedStrings.xml(글자 모음), xl/worksheets/sheetN.xml(<row><c r="B3" t="s"><v>번호</v></c>…).
 * 근거: ECMA-376(Office Open XML) SpreadsheetML.
 */
'use strict';
const { readZip } = require('./zip');

function unxml(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (m, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&');
}

// <si> 또는 <is> 안의 글자: <t> 를 모두 잇는다(서식이 다른 조각 <r><t>…</t></r> 포함, 읽는 법 <rPh> 는 뺀다)
function runText(xml) {
  return unxml((xml.replace(/<rPh\b[\s\S]*?<\/rPh>/g, '').match(/<t(?:\s[^>]*)?>[\s\S]*?<\/t>|<t\s*\/>/g) || [])
    .map((t) => t.replace(/^<t[^>]*>|<\/t>$|<t\s*\/>/g, '')).join(''));
}

// "AB12" → 열 번호(0부터)
function colIndex(ref) {
  const m = /^([A-Z]+)\d*$/i.exec(ref || '');
  if (!m) return -1;
  let n = 0;
  for (const ch of m[1].toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

const MAX_ROWS = 200000;
const MAX_COLS = 2000;

function xlsxSheets(buf) {
  const z = readZip(buf);
  const has = (n) => z.names.includes(n);
  const read = (n) => (has(n) ? z.read(n).toString('utf8') : null);
  if (!has('xl/workbook.xml')) throw new Error('엑셀(xlsx) 문서가 아니에요');

  const shared = [];
  const ss = read('xl/sharedStrings.xml');
  if (ss) for (const si of ss.match(/<si\b[\s\S]*?<\/si>/g) || []) shared.push(runText(si));

  // 시트 이름·순서 → 파일
  const wb = read('xl/workbook.xml');
  const rels = read('xl/_rels/workbook.xml.rels') || '';
  const target = {};
  for (const r of rels.match(/<Relationship\b[^>]*>/g) || []) {
    const id = /\bId="([^"]+)"/.exec(r);
    const t = /\bTarget="([^"]+)"/.exec(r);
    if (id && t) target[id[1]] = t[1].replace(/^\/?xl\//, '').replace(/^\//, '');
  }
  const sheets = [];
  for (const s of wb.match(/<sheet\b[^>]*>/g) || []) {
    const name = /\bname="([^"]*)"/.exec(s);
    const rid = /\br:id="([^"]+)"/.exec(s) || /\bid="([^"]+)"/.exec(s);
    let file = rid && target[rid[1]] ? 'xl/' + target[rid[1]] : null;
    if (!file || !has(file)) continue;
    sheets.push({ name: name ? unxml(name[1]) : '', file });
  }
  if (!sheets.length) {
    for (const n of z.names.filter((n) => /^xl\/worksheets\/sheet\d+\.xml$/.test(n)).sort()) sheets.push({ name: n.replace(/^.*\/|\.xml$/g, ''), file: n });
  }

  return sheets.map((s) => {
    const xml = read(s.file);
    const rows = [];
    let next = 0;
    for (const row of xml.match(/<row\b[\s\S]*?<\/row>|<row\b[^>]*\/>/g) || []) {
      if (rows.length >= MAX_ROWS) throw new Error('엑셀 행이 너무 많아요');
      const rn = /\br="(\d+)"/.exec(row.slice(0, row.indexOf('>') + 1));
      const at = rn ? Number(rn[1]) - 1 : next;
      while (rows.length < at) rows.push([]);
      const cells = [];
      let col = 0;
      for (const c of row.match(/<c\b[^>]*\/>|<c\b[^>]*>[\s\S]*?<\/c>/g) || []) {
        const head = c.slice(0, c.indexOf('>') + 1);
        const ref = /\br="([A-Z]+\d+)"/i.exec(head);
        const i = ref ? colIndex(ref[1]) : col;
        if (i < 0 || i >= MAX_COLS) continue;
        const type = (/\bt="([^"]+)"/.exec(head) || [])[1];
        const v = /<v>([\s\S]*?)<\/v>/.exec(c);
        let text = '';
        if (type === 's') text = v ? (shared[Number(v[1])] || '') : '';
        else if (type === 'inlineStr') text = runText((/<is>([\s\S]*?)<\/is>/.exec(c) || ['', ''])[1]);
        else if (v) text = unxml(v[1]);
        while (cells.length < i) cells.push('');
        cells[i] = text;
        col = i + 1;
      }
      rows[at] = cells;
      next = at + 1;
    }
    return { name: s.name, rows };
  });
}

function xlsxText(buf) {
  return xlsxSheets(buf).map((s) => ['[' + s.name + ']'].concat(s.rows.map((r) => r.join('\t').replace(/\s+$/, ''))).join('\n')).join('\n');
}

module.exports = { xlsxSheets, xlsxText, colIndex };
