# 진행 상황 · 이어서 할 일 (가정교사)

> 새 세션은 이 파일부터 읽는다. 끝난 일은 다시 하지 않는다. 작업 단위가 끝날 때마다 갱신한다.
> 마지막 갱신: 2026-10-02 10:25

## 지금 하는 일 (현재 작업)

- **물결 B1(고1 공통과목 20작업·76단원)** 작성 중 (10:20 시작). 물결 B 를 20작업씩 나눠 돈다: B1 → B2 → B3 → B4(나머지). 목록 tmp/wave-B.json
  - 끊기면: data/units 의 끊긴 파일(lint 의 "파일을 실행하지 못했어요")을 tmp/partial-units/ 로 옮기고 build-catalog → soon 단원으로 다시 묶어 이어 쓴다.

## 다음 작업 (순서대로)

1. [x] (10:00) `node scripts/build-catalog.js && node scripts/build-index.js` → 모든 단원 lint 오류 0 확인. 끊긴 파일은 tmp/partial-units/ 로 옮기고 다시 build
2. [x] (10:10) 전체 테스트 `npx playwright test` — **693 passed** (logic·desktop·mobile·edge-file, 2.3m)
3. [x] (10:14) 첫 커밋 024093d. 커밋 직전 검사를 git cat-file --batch 로 빠르게(2분+ → 3.5초): 경로를 적어 `git add` → `git diff --staged --stat` 확인 → 커밋(pre-commit 훅이 비밀정보 검사, 작성자 noreply)
4. [x] (10:25) 공개 저장소 zenki798/home-tutor + Pages(build_type=workflow). push → Actions 36949937848 성공(비밀정보·내용 검사·테스트·배포, 2분 50초).
   https://zenki798.github.io/home-tutor/ 확인: HTTP 200, CSP 있음, 카탈로그 93과정·1,049단원(준비 540), IndexedDB, 외부 요청 0, 콘솔 오류 0 (tmp/live-check.js)
5. [ ] 물결 B(고등 316단원) → 물결 C(대학·성인 193단원). 물결이 끝날 때마다 1~3 반복 후 push(자동 배포)
6. [ ] (예산 되면) 수학·과학 단원 독립 검토(정답 가리고 풀기), Edge·휴대폰 실제 확인

## 지금 상태 한눈에

| 영역 | 상태 | 비고 |
|---|---|---|
| 규칙·설계 | ✅ | AGENTS.md(규칙 1~7), docs/ARCHITECTURE.md(§1~§9), docs/CONTENT-GUIDE.md |
| 엔진 mathlib·mathtext·figures·search·solver | ✅ | logic 테스트 통과 |
| 저장 계층 + 화면 연결 | ✅ | IndexedDB·학생별 분리·풀이 기록(attempts 2000)·오답 원인·통계·대화(과목별 30), 백업(암호 필수)·가져오기(검사·더하기/바꾸기·되돌리기), PIN(5번 틀리면 30초), 모든 기록 지우기 |
| 보안 | ✅ | CSP(connect-src 'self'), 외부 요청 0 테스트, scan-secrets(파일·스테이징·이력)·pre-commit 훅·CI |
| 화면 app.js | ✅ | 가정교사 흐름(개념→이해 확인→문제→오답 분석→추가 설명), 적응형 난이도, 아바타·공부 수준, 준비 중 단원, 과목-학교급 색인 |
| 검사·생성 도구 | ✅ | lint-unit / validate-content / build-catalog(soon) / build-index / print-unit / job-context / particles |
| 교육과정 지도 | ✅ | curriculum/*.json, 93과정 1,049단원 |
| 단원 내용 | 🟡 | 540 완성(초·중 거의 전부 + 고등·대학 일부). 남은 509 = 물결 B(고등) 316 + 물결 C(대학·성인) 193 |
| 배포 | ✅ | push 하면 Actions 가 검사·테스트 후 Pages 배포. 첫 배포 10:25 확인 |

## 끝난 일 (완료 기록)

- 2026-10-01: 뼈대·규칙·설계, 엔진 5종, 교육과정 지도(22명 검토), 견본 단원(math-e4-07)
- 2026-10-02 새벽: 내용 작성 워크플로 3개 → 세션 한도로 중단(단원 249개, 그중 끊긴 10개)
- 2026-10-02 08:00: 테스트 오탐 정리, solver 고침, build-catalog·build-index·content.spec, 고칠 단원 5개(생성기 경계·밑줄 빈칸 ___)
- 2026-10-02 08:50: 화면 통합 담당 완료 — index.html(CSP·storage.js), core.js(TutorStorage), sw.js v2, app.js(위 기능),
  새 UI 시험 records·backup·pin·soon·csp, 스크린샷 tmp/screens/. 전체 693 중 690 통과(실패 3 = 내용 작성 중인 content.spec)
- 2026-10-02 09:00: README(개인정보·백업 안내), 설정 저장 즉시 flush, CI 내용 검사 seeds 100, AGENTS.md 구조에 storage.js

## 내용 작성 방법 (다음 세션도 같게)

- 빠진 단원 = data/catalog.js 에서 `soon: true` (build-catalog 가 파일이 없거나 실행 안 되는 단원에 붙인다).
- 묶음: soon 단원을 과정별로 4개씩, 학교급 순(초·중 → 고 → 대학·성인). 이 세션의 목록은 tmp/wave-B.json·tmp/wave-C.json(tmp 는 커밋 안 됨 — 없으면 다시 뽑는다).
- 작성자 1명이 단원 2~4개: `node scripts/job-context.js <id,…>` → 단원 파일 → `node scripts/lint-unit.js <id>` 오류 0 → `node scripts/print-unit.js --unit <id> --hide-answers` 로 직접 풀기.
- 워크플로는 한 번에 하나(동시 14명). 2026-10-02 새벽에 3개(42명)를 동시에 돌려 한 시간 만에 세션 한도에 걸렸다.
- 쓰다 끊긴 초안 tmp/partial-units/: eng-h-c1-09, eng-h-c2-05, eng-h-e1-01, sci-h-c1-02, sci-h-c1-10, sci-h-c2-10, sci-h-chem-01, sci-h-phy-02 (물결 B 에 포함)

## 결정·주의 기록

- 2026-10-01: AI 없이 무료, 전 과목 같은 깊이, 공개 저장소+Pages, 테스트는 창 없이 workers 2.
- 2026-10-02: 보안 원칙(규칙 6·7) — 비밀정보 금지, 학생 정보는 기기에만, 백업은 암호 필수, 학생별 분리·PIN.
- 2026-10-02: 백업 가져오기의 "PIN 잠금도 그대로 가져오기"(기본 켬) — 백업 암호를 아는 사람은 이미 기록을 볼 수 있으므로,
  PIN 을 잊었을 때 백업으로 되살릴 수 있게 끄는 선택도 둔다.
- 2026-10-02: 생성기의 "정답과 같은 틀린 답"은 화면이 버리고 검사는 경고. 생성기 실패 2% 이하는 경고(화면이 다른 seed 로 다시 만든다).
- 2026-10-02: 세션 한도가 가까우면 새 큰 작업을 시작하지 않고 지금 작업을 마무리한다(사용자 지시).
- 실제 학생 이름은 저장소 어디에도 쓰지 않는다(테스트는 민수·지아 등 가상 이름).
