/* 교육과정 지도 읽기 (build-catalog · job-context · lint-unit · curriculum-diff · curriculum-apply 가 같이 쓴다)
 *
 * 지도 = 한 폴더 안의
 *   - 과정 묶음 파일 *.json  { group, courses: [{ id, subject, level, grades, title, note, units: [{ id, title, summary, sem, standards, topics }] }] }
 *   - meta.json              { version, name, note }   — 교육과정 이름·판
 * 지금 판은 curriculum/, 개정 판은 curriculum/revisions/<판>/ 에 같은 꼴로 둔다(docs/CURRICULUM-REVISION.md).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CURRENT = path.join(ROOT, 'curriculum');

function isMapFile(f) { return f.endsWith('.json') && f !== 'meta.json'; }

function mapFiles(dir) {
  return fs.readdirSync(dir || CURRENT).filter(isMapFile).sort();
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// → { dir, meta, files: [{ file, group, courses }], courses: [과정…(group 포함)], units: { id: { course, unit } } }
function loadMap(dir) {
  dir = dir || CURRENT;
  const out = { dir, meta: null, files: [], courses: [], units: {} };
  const metaFile = path.join(dir, 'meta.json');
  if (fs.existsSync(metaFile)) out.meta = readJson(metaFile);
  for (const f of mapFiles(dir)) {
    const j = readJson(path.join(dir, f));
    const courses = Array.isArray(j.courses) ? j.courses : [];
    out.files.push({ file: f, group: j.group, courses });
    for (const c of courses) {
      out.courses.push(Object.assign({ group: j.group }, c));
      for (const u of c.units || []) out.units[u.id] = { course: c, unit: u };
    }
  }
  return out;
}

// 성취기준 묶음이 같은가(순서 무시)
function sameStandards(a, b) {
  const x = (Array.isArray(a) ? a : []).slice().sort();
  const y = (Array.isArray(b) ? b : []).slice().sort();
  return x.length === y.length && x.every((s, i) => s === y[i]);
}

// 지도 검사 — 개정 지도를 적용하기 전에 본다. → 오류 글 목록(비면 통과)
const SUBJECTS = ['kor', 'math', 'eng', 'soc', 'hist', 'sci', 'life'];
const LEVELS = ['elem', 'mid', 'high', 'univ', 'adult'];
const GRADE_RE = /^(e[1-6]|m[1-3]|h[1-3]|u|a)$/;
function validateMap(map) {
  const errors = [];
  if (!map.meta || !map.meta.version || !map.meta.name) errors.push('meta.json 에 version·name 이 있어야 해요');
  if (!map.courses.length) errors.push('과정이 하나도 없어요');
  const seen = new Set();
  for (const c of map.courses) {
    const where = '과정 ' + (c.id || '(id 없음)');
    if (!c.id || seen.has(c.id)) errors.push(where + ': id 가 없거나 겹쳐요');
    seen.add(c.id);
    if (!SUBJECTS.includes(c.subject)) errors.push(where + ': 모르는 과목 ' + c.subject);
    if (!LEVELS.includes(c.level)) errors.push(where + ': 모르는 학교급 ' + c.level);
    if (!Array.isArray(c.grades) || !c.grades.length || c.grades.some((g) => !GRADE_RE.test(g))) errors.push(where + ': 학년이 이상해요');
    if (!c.title || !Array.isArray(c.units) || !c.units.length) errors.push(where + ': 제목이나 단원이 없어요');
    for (const u of c.units || []) {
      if (!u.id || !u.title || !u.summary) errors.push(where + ': 단원 칸(id·title·summary)이 빠졌어요 ' + (u.id || ''));
      if (u.id && seen.has(u.id)) errors.push(where + ': 단원 id 가 겹쳐요 ' + u.id);
      if (u.id) seen.add(u.id);
      if (u.standards !== undefined && !Array.isArray(u.standards)) errors.push(where + ': standards 는 배열이에요 ' + u.id);
    }
  }
  return errors;
}

module.exports = { ROOT, CURRENT, isMapFile, mapFiles, loadMap, sameStandards, validateMap };
