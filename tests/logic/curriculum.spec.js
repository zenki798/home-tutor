const { test, expect } = require('@playwright/test');
const fs = require('fs');
const os = require('os');
const path = require('path');

/*
 * 교육과정 개정 반영 (docs/CURRICULUM-REVISION.md)
 *   지도 읽기(meta.json 제외) · 개정 비교(curriculum-diff) · 적용(curriculum-apply) ·
 *   카탈로그의 '개정 반영 중'(rev) 자동 판정(build-catalog) · 개정 소식 확인(curriculum-watch, 네트워크 없이)
 * 저장소의 curriculum/·data/ 는 건드리지 않고 임시 폴더에서 시험한다.
 */
const ROOT = path.join(__dirname, '..', '..');
const { loadMap, sameStandards, validateMap } = require(path.join(ROOT, 'scripts', 'lib', 'curriculum'));
const { diffMaps, jobsOf, report } = require(path.join(ROOT, 'scripts', 'curriculum-diff.js'));
const { applyRevision } = require(path.join(ROOT, 'scripts', 'curriculum-apply.js'));
const { build } = require(path.join(ROOT, 'scripts', 'build-catalog.js'));
const { parseList, isRevisionNews, robotsDisallows } = require(path.join(ROOT, 'scripts', 'curriculum-watch.js'));

function tmpDir(name) {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'tutor-' + name + '-'));
}
function writeMap(dir, version, courses) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({ version, name: version + ' 개정 교육과정' }));
  fs.writeFileSync(path.join(dir, 'math-A.json'), JSON.stringify({ group: 'math-A', courses }));
}
const U = (id, standards, extra) => Object.assign({ id, title: id + ' 제목', summary: id + ' 요약입니다.', standards, topics: ['t1'] }, extra || {});
const C = (id, units, extra) => Object.assign({ id, subject: 'math', level: 'mid', grades: ['m1'], title: id + ' 과정', units }, extra || {});
// 아주 작은 단원 파일(카탈로그 판정에 필요한 만큼)
function writeUnit(dir, id, course, standards) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, id + '.js'), 'Tutor.registerUnit(' + JSON.stringify({ id, course, title: id + ' 제목', standards }) + ');\n');
}

const OLD = [C('math-x1', [U('math-x1-01', ['[9수01-01]']), U('math-x1-02', ['[9수01-02]']), U('math-x1-03', ['[9수01-03]']), U('math-x1-04', ['[9수01-04]'])]),
  C('math-x9', [U('math-x9-01', ['[9수09-01]'])])];
const NEW = [C('math-x1', [
  U('math-x1-01', ['[9수01-01]']),                                   // 그대로
  U('math-x1-02', ['[9수01-02]', '[9수01-05]']),                      // 성취기준 바뀜 → 다시 쓰기
  U('math-x1-03', ['[9수01-03]'], { topics: ['t1', '새 topic'] }),   // topics 만 → 검토
  U('math-x1-05', ['[9수01-06]']),                                   // 새 단원 → 작성
  // math-x1-04 없어짐 → 뺄 단원
]), C('math-x2', [U('math-x2-01', ['[9수02-01]'])])];                 // 새 과정 / math-x9 없어진 과정

test('지도 읽기: meta.json 은 과정 파일로 읽지 않고, 지금 지도(curriculum/)에 판·이름이 있다', () => {
  const m = loadMap();
  expect(m.meta).toMatchObject({ version: '2022', name: '2022 개정 교육과정' });
  expect(m.courses.length).toBe(93);
  expect(Object.keys(m.units).length).toBe(1049);
  expect(validateMap(m)).toEqual([]);
  expect(sameStandards(['[a]', '[b]'], ['[b]', '[a]'])).toBe(true);
  expect(sameStandards(['[a]'], ['[a]', '[b]'])).toBe(false);
  expect(sameStandards(undefined, [])).toBe(true);
});

test('개정 비교: 새로 쓸·다시 쓸·살펴볼·뺄 단원과 과정 변화, 워크플로 작업 줄', () => {
  const base = tmpDir('diff');
  writeMap(path.join(base, 'old'), '2022', OLD);
  writeMap(path.join(base, 'new'), '2027', NEW);
  const d = diffMaps(loadMap(path.join(base, 'old')), loadMap(path.join(base, 'new')));
  expect(d.from).toBe('2022');
  expect(d.to).toBe('2027');
  expect(d.courses.added).toEqual(['math-x2']);
  expect(d.courses.removed).toEqual(['math-x9']);
  expect(d.units.added.map((u) => u.id).sort()).toEqual(['math-x1-05', 'math-x2-01']);
  expect(d.units.standards.map((u) => u.id)).toEqual(['math-x1-02']);
  expect(d.units.content).toEqual([expect.objectContaining({ id: 'math-x1-03', what: ['topics'] })]);
  expect(d.units.removed.map((u) => u.id).sort()).toEqual(['math-x1-04', 'math-x9-01']);
  expect(d.standards.added).toEqual(['[9수01-05]', '[9수01-06]', '[9수02-01]']);
  expect(d.standards.removed).toEqual(['[9수01-04]', '[9수09-01]']);
  const j = jobsOf(d);
  expect(j.write).toEqual(['math-x1#1|math|math-x1-05', 'math-x2#1|math|math-x2-01']);
  expect(j.revise).toEqual(['V|V math-x1#1|math|math-x1-02']);
  expect(j.review).toEqual(['R|R math-x1#1|math|math-x1-03']);
  expect(j.retire.sort()).toEqual(['math-x1-04', 'math-x9-01']);
  const md = report(d);
  expect(md).toContain('2022 → 2027');
  expect(md).toContain('math-x1-02: [9수01-02] → [9수01-02] [9수01-05]');
});

test('개정 적용: 새 지도로 바꾸고 옛 지도는 history/ 에, 없어진 단원 파일은 retired/ 로 — 미리 보기·잘못된 지도는 아무것도 바꾸지 않는다', () => {
  const base = tmpDir('apply');
  const cur = path.join(base, 'curriculum');
  const units = path.join(base, 'units');
  writeMap(cur, '2022', OLD);
  writeMap(path.join(base, 'next'), '2027', NEW);
  for (const id of ['math-x1-01', 'math-x1-02', 'math-x1-03', 'math-x1-04', 'math-x9-01']) writeUnit(units, id, id.replace(/-\d\d$/, ''), ['x']);
  const opts = { newDir: path.join(base, 'next'), curDir: cur, unitsDir: units, retiredDir: path.join(base, 'retired'), rebuild: false };

  // 잘못된 새 지도(meta 없음) → 그대로
  const bad = path.join(base, 'bad');
  fs.mkdirSync(bad);
  fs.writeFileSync(path.join(bad, 'math-A.json'), JSON.stringify({ group: 'math-A', courses: NEW }));
  const rb = applyRevision(Object.assign({}, opts, { newDir: bad }));
  expect(rb.ok).toBe(false);
  expect(rb.errors.join(' ')).toContain('meta.json');
  expect(loadMap(cur).meta.version).toBe('2022');

  // 미리 보기 → 그대로, 할 일만 알려 준다
  const dry = applyRevision(Object.assign({}, opts, { dryRun: true }));
  expect(dry.ok).toBe(true);
  expect(dry.retired.sort()).toEqual(['math-x1-04', 'math-x9-01']);
  expect(loadMap(cur).meta.version).toBe('2022');
  expect(fs.existsSync(path.join(units, 'math-x1-04.js'))).toBe(true);

  // 적용
  const r = applyRevision(opts);
  expect(r.ok).toBe(true);
  expect(loadMap(cur).meta.version).toBe('2027');
  expect(Object.keys(loadMap(cur).units).sort()).toEqual(['math-x1-01', 'math-x1-02', 'math-x1-03', 'math-x1-05', 'math-x2-01']);
  expect(loadMap(path.join(cur, 'history', '2022')).meta.version).toBe('2022');           // 옛 지도 보관
  expect(fs.existsSync(path.join(units, 'math-x1-04.js'))).toBe(false);
  expect(fs.existsSync(path.join(base, 'retired', '2022', 'math-x1-04.js'))).toBe(true);    // 뺀 단원 보관
  // 같은 판을 다시 적용하려 하면 막는다
  expect(applyRevision(opts).errors.join(' ')).toContain('같아요');
});

test('카탈로그: 파일이 없으면 준비 중, 성취기준이 지도와 다르면 "개정 반영 중"(rev), 같으면 표시 없음', () => {
  const base = tmpDir('catalog');
  const cur = path.join(base, 'curriculum');
  const units = path.join(base, 'units');
  writeMap(cur, '2027', NEW);
  writeUnit(units, 'math-x1-01', 'math-x1', ['[9수01-01]']);          // 지도와 같음
  writeUnit(units, 'math-x1-02', 'math-x1', ['[9수01-02]']);          // 옛 성취기준으로 쓴 단원 → rev
  writeUnit(units, 'math-x1-03', 'math-x1', ['[9수01-03]']);
  const r = build({ curDir: cur, unitsDir: units });
  const cat = JSON.parse(r.text.slice(r.text.indexOf('{'), r.text.lastIndexOf('}') + 1));
  const u = {};
  cat.courses.forEach((c) => c.units.forEach((x) => { u[x.id] = x; }));
  expect(cat.curriculum).toBe('2027 개정 교육과정');
  expect(u['math-x1-01'].rev).toBeUndefined();
  expect(u['math-x1-01'].soon).toBeUndefined();
  expect(u['math-x1-02'].rev).toBe(true);
  expect(u['math-x1-05'].soon).toBe(true);
  expect(u['math-x2-01'].soon).toBe(true);
  expect(r.rev).toBe(1);
  expect(r.text).toContain('개정 반영 중 1');
  // 다시 써서 새 성취기준으로 바꾸면 표시가 저절로 사라진다
  writeUnit(units, 'math-x1-02', 'math-x1', ['[9수01-05]', '[9수01-02]']);
  expect(build({ curDir: cur, unitsDir: units }).rev).toBe(0);
});

test('개정 소식 확인: 교육부 보도자료 목록에서 글 번호·제목을 읽고, 교육과정 개정 소식만 고른다 (네트워크 없이)', () => {
  const html = '<ul>' +
    '<li><a href="#" onclick="javascript:goView(\'294\', \'200001\', \'0\', null, \'W\', \'1\', \'N\', \'\');"><strong>초·중등학교 교육과정 일부 개정 고시</strong> <span>2027.01.05</span></a></li>' +
    '<li><a href="#" onclick="javascript:goView(\'294\', \'200002\', \'0\', null, \'W\', \'1\', \'N\', \'\');">2027학년도 수시모집 &amp; 정시 안내</a></li>' +
    '<li><a href="#" onclick="javascript:goView(\'294\', \'200003\', \'0\', null, \'W\', \'1\', \'N\', \'\');">대학 교육과정 혁신 지원 사업 발표</a></li>' +
    '<li><a href="#" onclick="javascript:goView(\'294\', \'200001\', \'0\', null, \'W\', \'1\', \'N\', \'\');">초·중등학교 교육과정 일부 개정 고시</a></li>' +
    '</ul>';
  const items = parseList(html);
  expect(items.map((x) => x.seq)).toEqual(['200001', '200002', '200003']);                // 같은 글은 한 번
  expect(items[0].title).toBe('초·중등학교 교육과정 일부 개정 고시 2027.01.05');
  expect(items[1].title).toBe('2027학년도 수시모집 & 정시 안내');
  expect(items.filter((x) => isRevisionNews(x.title)).map((x) => x.seq)).toEqual(['200001']);
  for (const t of ['2022 개정 교육과정 확정·발표', '고등학교 교육과정 성취기준 시안 공청회']) expect(isRevisionNews(t), t).toBe(true);
  for (const t of ['OECD 교육지표 결과 발표', '디지털 교육과정 교원 연수 운영', '대학 교육과정 혁신 지원']) expect(isRevisionNews(t), t).toBe(false);
  // robots.txt 를 지킨다: User-agent: * 의 Disallow
  expect(robotsDisallows('User-agent: *\nDisallow: /search', '/boardCnts/listRenew.do')).toBe(false);
  expect(robotsDisallows('User-agent: Googlebot\nAllow: /\n\nUser-agent: *\nDisallow: /', '/anything')).toBe(true);
});

test('개정 확인·자동 반영은 Actions 에서 매주, 비밀 없이 기본 토큰으로 — 테스트를 통과해야만 올리고 배포한다', () => {
  const yml = fs.readFileSync(path.join(ROOT, '.github', 'workflows', 'curriculum-watch.yml'), 'utf8');
  expect(yml).toMatch(/schedule:\s*\n\s*- cron: '0 0 \* \* 1'/);
  for (const p of ['contents: write', 'issues: write', 'actions: write']) expect(yml).toContain(p);
  expect(yml).toContain('node scripts/curriculum-watch.js --update --issue');
  expect(yml).toContain('poppler-utils');                                    // PDF 고시문 읽기
  expect(yml).toMatch(/npx playwright test/);
  expect(yml).toContain("steps.test.outcome == 'success'");                   // 테스트 통과 뒤에만 커밋
  expect(yml).toContain('git commit -F tmp/curriculum-watch-commit.txt');     // 바깥 글을 셸 명령에 끼워 넣지 않는다
  expect(yml).toContain('git add -- curriculum/standards');                   // 자동 반영한 기준 자료
  expect(yml).toContain('git add -- curriculum/history');                     // 반영 전 보관본·기록(되돌리기)
  expect(yml).not.toMatch(/git add (\.|-A|--all)(\s|$)/);                     // 정해 둔 경로만(AGENTS.md 규칙 2)
  expect(yml).toContain('gh workflow run pages.yml');
  expect(yml).toContain('--keepalive');
  expect(yml).not.toMatch(/\$\{\{\s*secrets\./);
  expect(yml).not.toMatch(/\$\{\{\s*steps\.[^}]*outputs\.(summary|title)/);   // 출력값을 run 안에 직접 넣지 않는다
});
