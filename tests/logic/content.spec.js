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

test('값이 같은 보기 검사: 값만 묻는 문제는 경고하고, 형태(대분수·기약분수·약분 등)를 묻는 문제는 경고하지 않는다', () => {
  const fs = require('fs');
  const { validateUnitFile } = require(path.join(ROOT, 'scripts', 'validate-content.js'));
  const file = path.join(ROOT, 'tests', 'fixtures', 'units', 'math-m2-01.js');
  const add = (extra) => 'var __reg = Tutor.registerUnit; Tutor.registerUnit = function (u) { u.practice = u.practice.concat(' +
    JSON.stringify(extra) + '); __reg(u); };\n' + fs.readFileSync(file, 'utf8');
  const p = (id, q, choices) => ({ id, level: 1, type: 'choice', q, choices, answer: 0, why: ['', '다른 꼴이에요.', '크기가 달라요.'],
    explain: '보기를 하나씩 따져 봐요. 그래서 첫째 보기가 답이에요.', concept: 0 });
  const same = (extra) => validateUnitFile(file, { source: add(extra), seeds: 3, catalog: null })
    .warnings.filter((w) => /값이 같은 보기/.test(w.msg)).map((w) => w.path);
  // 값을 묻는데 1/2 와 2/4 가 함께 있으면 정답이 둘
  expect(same([p('z1', '$\\frac{1}{4}+\\frac{1}{4}$ 의 값은?', ['$\\frac{1}{2}$', '$\\frac{2}{4}$', '$\\frac{3}{4}$'])])).toHaveLength(1);
  // 형태를 묻는 문제는 값이 같아도 정답이 하나
  expect(same([
    p('z1', '대분수인 것은 무엇일까요?', ['$2\\frac{1}{3}$', '$\\frac{7}{3}$', '$\\frac{2}{3}$']),
    p('z2', '다음 중 **기약분수**는 무엇일까요?', ['$\\frac{2}{3}$', '$\\frac{4}{6}$', '$\\frac{1}{5}$']),
    p('z3', '$\\frac{12}{18}$를 약분한 분수가 **아닌** 것은?', ['$\\frac{4}{9}$', '$\\frac{6}{9}$', '$\\frac{2}{3}$']),
  ])).toEqual([]);
});

test('그림 지시 검사: "다음 그림을 보고"인데 그림이 없으면 경고, 인용 지문 속 이야기·그림 편지·줄기와 잎 그림은 그림 지시가 아니다', () => {
  const fs = require('fs');
  const { validateUnitFile } = require(path.join(ROOT, 'scripts', 'validate-content.js'));
  const file = path.join(ROOT, 'tests', 'fixtures', 'units', 'math-m2-01.js');
  const add = (extra) => 'var __reg = Tutor.registerUnit; Tutor.registerUnit = function (u) { u.practice = u.practice.concat(' +
    JSON.stringify(extra) + '); __reg(u); };\n' + fs.readFileSync(file, 'utf8');
  const p = (id, q) => ({ id, level: 1, type: 'ox', q, answer: true, explain: '글을 읽고 판단해요. 그래서 맞아요.', concept: 0 });
  const figWarn = (extra) => validateUnitFile(file, { source: add(extra), seeds: 3, catalog: null })
    .warnings.filter((w) => /그림을 가리키는데/.test(w.msg)).map((w) => w.path);
  expect(figWarn([p('z1', '다음 그림을 보고 알맞은 것을 고르세요.')])).toHaveLength(1);
  expect(figWarn([
    p('z1', '다음 글을 읽고 답하세요.\n\n> 나는 친구의 그림을 보고 "멋지다."라고 말했다.'),
    p('z2', '다음 그림 편지에 빠진 것은 쓴 사람이다.'),
    p('z3', '줄기와 잎 그림에서 같은 값은 한 번만 쓴다.'),
  ])).toEqual([]);
});
