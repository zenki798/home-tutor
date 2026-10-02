/* 비밀 인증정보·개인정보 검사 (AGENTS.md 규칙 2·6)
 *
 *   node scripts/scan-secrets.js            커밋될 수 있는 파일 전체 (git 이 추적하거나 무시되지 않는 파일)
 *   node scripts/scan-secrets.js --staged   커밋하려고 올린 내용(index)만 — pre-commit 훅이 쓴다
 *   node scripts/scan-secrets.js --history  Git 이력 전체(모든 커밋에서 더해진 줄과 커밋 메시지)
 *   node scripts/scan-secrets.js --json
 *
 * 찾은 값은 화면에 그대로 내지 않고 앞뒤 몇 글자만 보인다. 발견되면 종료 코드 1.
 * 실제 학생 학습 데이터(백업 파일)가 저장소에 들어가는 것도 막는다.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { scanText } = require('./lib/secret-patterns');

const ROOT = path.join(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', 'playwright-report', 'test-results', 'blob-report', 'tmp', '_site']);
const BINARY = /\.(png|jpe?g|gif|webp|ico|pdf|zip|gz|woff2?|ttf|otf|mp3|mp4|wav)$/i;
// 학습 기록 백업 파일 표시 — 테스트 픽스처의 가짜 백업만 허용한다
const BACKUP_MARK = /"format"\s*:\s*"home-tutor-backup"/;
const BACKUP_ALLOW = /^tests\/fixtures\//;

function git(args, opts) {
  return execFileSync('git', args, Object.assign({ cwd: ROOT, encoding: 'utf8', maxBuffer: 1024 * 1024 * 512 }, opts || {}));
}

function hasGit() {
  try { git(['rev-parse', '--is-inside-work-tree']); return true; } catch (e) { return false; }
}

// 커밋될 수 있는 파일: 추적 중 + 추적 안 하지만 무시되지 않는 파일
function candidateFiles() {
  if (hasGit()) {
    const out = git(['ls-files', '--cached', '--others', '--exclude-standard', '-z']);
    return out.split('\0').filter(Boolean).filter((f) => fs.existsSync(path.join(ROOT, f)));
  }
  const files = [];
  (function walk(dir, rel) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), rel + e.name + '/'); }
      else files.push(rel + e.name);
    }
  })(ROOT, '');
  return files;
}

function scanFiles(list, read) {
  const findings = [];
  for (const f of list) {
    const rel = f.replace(/\\/g, '/');
    if (BINARY.test(rel)) continue;
    let text;
    try { text = read(rel); } catch (e) { continue; }
    if (typeof text !== 'string') continue;
    for (const x of scanText(text)) findings.push(Object.assign({ file: rel }, x));
    if (BACKUP_MARK.test(text) && !BACKUP_ALLOW.test(rel)) {
      findings.push({ file: rel, kind: 'pii', rule: '학생 학습 기록 백업 파일', line: 1, sample: '백업 파일은 저장소에 넣지 않는다' });
    }
  }
  return findings;
}

function scanWorkingTree() {
  return scanFiles(candidateFiles(), (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

// 스테이징된 내용(index 의 blob)을 git cat-file --batch 한 번으로 읽는다 — 파일마다 git 을 띄우면 수백 개에 몇 분이 걸린다
function readIndexBlobs(names) {
  const want = new Set(names);
  const sha = {};
  for (const line of git(['ls-files', '-s', '-z']).split('\0')) {
    const m = /^\d+ ([0-9a-f]{40,64}) \d+\t(.+)$/.exec(line);
    if (m && want.has(m[2])) sha[m[2]] = m[1];
  }
  const list = names.filter((n) => sha[n]);
  if (!list.length) return {};
  const out = execFileSync('git', ['cat-file', '--batch'], {
    cwd: ROOT, input: list.map((n) => sha[n]).join('\n') + '\n', maxBuffer: 1024 * 1024 * 1024,
  });
  const res = {};
  let pos = 0;
  for (const n of list) {
    const nl = out.indexOf(10, pos);
    const size = Number(out.slice(pos, nl).toString('utf8').split(' ')[2]);
    res[n] = out.slice(nl + 1, nl + 1 + size).toString('utf8');
    pos = nl + 1 + size + 1;
  }
  return res;
}

function scanStaged() {
  if (!hasGit()) return [];
  const names = git(['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z']).split('\0').filter(Boolean);
  const blobs = readIndexBlobs(names.filter((n) => !BINARY.test(n)));
  return scanFiles(names, (rel) => (rel in blobs ? blobs[rel] : null));
}

function scanHistory() {
  if (!hasGit()) return [];
  let count = 0;
  try { count = Number(git(['rev-list', '--all', '--count']).trim()); } catch (e) { return []; }
  if (!count) return [];
  const findings = [];
  // 모든 커밋의 메시지와 더해진 줄(+)
  const log = git(['log', '--all', '-p', '--no-color', '--format=@@COMMIT %H%n%B']);
  let commit = '';
  let file = '';
  const added = [];
  const flush = () => {
    if (!added.length) return;
    for (const x of scanText(added.join('\n'))) findings.push(Object.assign({ file: (file || '(커밋 메시지)') + ' @' + commit.slice(0, 8) }, x));
    added.length = 0;
  };
  for (const line of log.split('\n')) {
    if (line.startsWith('@@COMMIT ')) { flush(); commit = line.slice(9); file = ''; continue; }
    if (line.startsWith('+++ ')) { flush(); file = line.slice(6); continue; }
    if (line.startsWith('+') && !line.startsWith('+++')) { added.push(line.slice(1)); continue; }
    if (!file && line && !line.startsWith('diff ') && !line.startsWith('index ') && !line.startsWith('---')) added.push(line); // 커밋 메시지
  }
  flush();
  return findings;
}

function main() {
  const args = process.argv.slice(2);
  const mode = args.includes('--staged') ? 'staged' : args.includes('--history') ? 'history' : 'tree';
  const findings = mode === 'staged' ? scanStaged() : mode === 'history' ? scanHistory() : scanWorkingTree();
  if (args.includes('--json')) {
    console.log(JSON.stringify(findings, null, 1));
  } else {
    const what = { tree: '프로젝트 파일', staged: '커밋할 내용', history: 'Git 이력' }[mode];
    if (!findings.length) console.log('✓ ' + what + ': 비밀 인증정보·개인정보를 찾지 못했어요');
    for (const f of findings) {
      console.log('✗ [' + (f.kind === 'secret' ? '비밀정보' : f.kind === 'path' ? '로컬 경로' : '개인정보') + '] ' + f.rule + ' — ' + f.file + ':' + f.line + ' ' + f.sample);
    }
    if (findings.length) {
      console.log('\n' + findings.length + '건. 값을 지우고(환경변수·더미 값으로 바꾸고), 이미 올라간 키·토큰은 폐기·재발급하세요 (AGENTS.md 규칙 2·6).');
    }
  }
  process.exit(findings.length ? 1 : 0);
}

if (require.main === module) main();
module.exports = { scanWorkingTree, scanStaged, scanHistory, candidateFiles };
