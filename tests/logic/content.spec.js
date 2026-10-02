const { test, expect } = require('@playwright/test');
const path = require('path');
const { execFileSync } = require('child_process');

/*
 * 학습 내용 전체 검사 (AGENTS.md 규칙 1·3) — 단원 파일의 형식·정답 자기 일관성·서식 글·그림·생성기·조사·비밀정보.
 * 카탈로그(data/catalog.js)와 검색 색인(data/index)이 원본(curriculum·단원 파일)과 맞는지도 본다.
 * 아직 쓰지 않은 단원은 카탈로그에 soon(준비 중)으로 표시되어 있어야 하고, 화면은 그 단원을 "준비 중"으로 보인다.
 */
const ROOT = path.join(__dirname, '..', '..');
const { validateAll } = require(path.join(ROOT, 'scripts', 'validate-content.js'));
const SEEDS = Number(process.env.CONTENT_SEEDS) || 80;

test.describe.configure({ timeout: 10 * 60 * 1000 });

test('모든 단원 파일이 검사를 통과한다 (오류 0)', () => {
  const r = validateAll({ seeds: SEEDS });
  const lines = r.errors.slice(0, 60).map((e) => (e.file || e.unit || '') + ' · ' + (e.path || '') + ' · ' + e.msg);
  expect(r.errors.length, '오류 ' + r.errors.length + '건\n' + lines.join('\n')).toBe(0);
});

test('카탈로그가 교육과정 지도·단원 파일과 맞다 (scripts/build-catalog.js --check)', () => {
  let out = '';
  try {
    out = execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'build-catalog.js'), '--check'], { encoding: 'utf8' });
  } catch (e) {
    throw new Error((e.stdout || '') + (e.stderr || '') || e.message);
  }
  expect(out).toContain('최신');
});

test('검색 색인이 단원 내용과 맞다 (scripts/build-index.js --check)', () => {
  let out = '';
  try {
    out = execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'build-index.js'), '--check'], { encoding: 'utf8' });
  } catch (e) {
    throw new Error((e.stdout || '') + (e.stderr || '') || e.message);
  }
  expect(out).toContain('최신');
});

test('카탈로그: 준비 중이 아닌 단원은 모두 파일이 있고, 준비 중 단원은 파일이 없다', () => {
  const fs = require('fs');
  const vm = require('vm');
  let cat;
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data', 'catalog.js'), 'utf8'), { Tutor: { registerCatalog(c) { cat = c; } } });
  const bad = [];
  for (const c of cat.courses) {
    for (const u of c.units) {
      const has = fs.existsSync(path.join(ROOT, 'data', 'units', u.id + '.js'));
      if (!u.soon && !has) bad.push(u.id + ' (준비됨인데 파일 없음)');
    }
  }
  expect(bad).toEqual([]);
});

test('같은 문제 검사: 글·보기가 같으면 경고하고, 그림이 다르면 다른 문제로 본다', () => {
  const fs = require('fs');
  const { validateUnitFile } = require(path.join(ROOT, 'scripts', 'validate-content.js'));
  const file = path.join(ROOT, 'tests', 'fixtures', 'units', 'math-m2-01.js');
  const svg = (n) => ({ type: 'svg', svg: '<svg viewBox="0 0 40 20"><text x="20" y="15" text-anchor="middle" fill="currentColor">' + n + '</text></svg>' });
  // 단원을 등록하기 직전에 문제를 덧붙인다: 그림만 다른 두 문제 + 그림까지 같은 한 문제
  const add = (extra) => 'var __reg = Tutor.registerUnit; Tutor.registerUnit = function (u) { u.practice = u.practice.concat(' +
    JSON.stringify(extra) + '); __reg(u); };\n' + fs.readFileSync(file, 'utf8');
  const p = (id, n) => ({ id, level: 1, type: 'short', check: 'number', q: '그림의 수를 읽어 보세요.', answer: String(n), fig: svg(n), explain: '그림에 쓰인 수를 그대로 읽어요. 그래서 답이에요.', concept: 0 });
  const dupWarnings = (extra) => validateUnitFile(file, { source: add(extra), seeds: 3, catalog: null })
    .warnings.filter((w) => /같은 문제가 이미 있어요/.test(w.msg));
  expect(dupWarnings([p('z1', 5), p('z2', 7)])).toEqual([]);
  const dup = dupWarnings([p('z1', 5), p('z2', 5)]);
  expect(dup).toHaveLength(1);
  expect(dup[0].msg).toContain('practice[');
});
