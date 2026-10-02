const { test, expect } = require('@playwright/test');
const path = require('path');

/*
 * 비밀 인증정보·개인정보 (AGENTS.md 규칙 2·6) — 공개 저장소·GitHub Pages 에 올라가는 모든 것은 공개된 것으로 본다.
 * 1) 지금 커밋될 수 있는 파일 전체와 Git 이력에 키·토큰·비밀번호·실제 연락처·로컬 사용자 경로·학생 백업 파일이 없다.
 * 2) 검사기가 실제로 그런 값을 잡는다 (시험 값은 코드에서 조립해 이 파일 자체에는 비밀 모양 글자가 없게 한다).
 */
const ROOT = path.join(__dirname, '..', '..');
const { scanText } = require(path.join(ROOT, 'scripts', 'lib', 'secret-patterns'));
const scan = require(path.join(ROOT, 'scripts', 'scan-secrets'));

const fmt = (list) => list.map((f) => f.file + ':' + f.line + ' ' + f.rule + ' ' + f.sample).join('\n');

test('커밋될 수 있는 파일 전체에 비밀정보·개인정보가 없다', () => {
  const found = scan.scanWorkingTree();
  expect(found, fmt(found)).toEqual([]);
});

test('Git 이력 전체(커밋 메시지 포함)에 비밀정보·개인정보가 없다', () => {
  const found = scan.scanHistory();
  expect(found, fmt(found)).toEqual([]);
});

test('.gitignore 가 비밀 파일·학습 기록 백업·테스트 산출물을 덮는다', () => {
  const gi = require('fs').readFileSync(path.join(ROOT, '.gitignore'), 'utf8');
  for (const p of ['.env', '.env.*', '!.env.example', '*.pem', '*.key', 'node_modules/', 'playwright-report/', 'test-results/', '*.tutor-backup.json', 'tmp/']) {
    expect(gi, p).toContain(p);
  }
});

test('GitHub Actions 는 secrets 를 쓰지 않는다', () => {
  const fs = require('fs');
  const dir = path.join(ROOT, '.github', 'workflows');
  for (const f of fs.readdirSync(dir)) {
    const y = fs.readFileSync(path.join(dir, f), 'utf8');
    expect(y, f).not.toMatch(/\$\{\{\s*secrets\./);
  }
});

const J = (...parts) => parts.join('');
const SAMPLES = [
  ['sk- 키', 'const k = "' + J('sk', '-', 'proj-', 'A1b2'.repeat(8)) + '";'],
  ['Anthropic 키', J('sk', '-ant-', 'api03-', 'x9Y8'.repeat(8))],
  ['Google API 키', J('AI', 'za', 'Sy', 'A'.repeat(33))],
  ['GitHub 토큰', J('gh', 'p_', 'a1B2'.repeat(9))],
  ['AWS 키', J('AK', 'IA', 'ABCDEFGHIJ234567')],
  ['개인키', J('-----BEGIN ', 'RSA PRIVATE', ' KEY-----')],
  ['JWT', J('ey', 'JhbGciOiJIUzI1NiJ9', '.', 'ey', 'JzdWIiOiIxMjM0In0', '.', 'abcdefghijklmno')],
  ['비밀번호 대입', J('pass', 'word', ' = "', 'hunter2-real-pass', '"')],
  ['Bearer', J('Authorization: Bear', 'er ', 'abcDEF123456ghiJKL7890xyz')],
  ['주소 속 비밀번호', J('https://', 'user', ':', 'p4ssw0rd', '@', 'host.example/x')],
  ['실제 같은 이메일', J('minsu.kim', '@', 'gmail', '.com')],
  ['휴대전화', J('010', '-', '1234', '-', '5678')],
  ['주민등록번호', J('900101', '-', '1234567')],
  ['카드번호', J('4111', ' ', '1111', ' ', '1111', ' ', '1111')],
  ['로컬 사용자 경로', J('C:', '\\', 'Users', '\\', 'kimminsu', '\\', 'Desktop')],
];
for (const [name, text] of SAMPLES) {
  test('검사기가 잡는다: ' + name, () => {
    expect(scanText(text).length, text.slice(0, 12)).toBeGreaterThan(0);
  });
}

test('더미·허용 값은 넘긴다', () => {
  const ok = [
    J('hong', '@', 'example.com'),
    J('zenki798', '@users.', 'noreply.github.com'),
    J('41898282+github-actions[bot]', '@users.', 'noreply.github.com'),
    J('010', '-0000-', '0000'),
    '@playwright/test',
    '분수 3/4, 수 1 2/5, 넓이 12 cm², 연도 2026-10-02',
    'password 를 저장하지 않는다 (설명 글)',
    J('C:', '/Users/', 'Public', '/x'),
  ];
  for (const t of ok) expect(scanText(t), t).toEqual([]);
});

test('찾은 값을 그대로 보여 주지 않는다(가려서 보고)', () => {
  const key = J('sk', '-', 'proj-', 'Z9y8'.repeat(8));
  const f = scanText(key)[0];
  expect(f.sample).not.toContain(key);
  expect(f.sample).toMatch(/…/);
});
