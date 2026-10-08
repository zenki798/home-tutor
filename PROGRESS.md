# PROGRESS — 지금 상태 한 장 (가정교사)

> 사용자 지시(2026-10-08 "자율개발·자동복구", 기한 2026-10-10)에 따라 작업 단위마다 고친다. 날짜별 자세한 기록은 `docs/PROGRESS.md`.
> 함께 보는 문서: `NEXT_TASK.md`(다음 작업·재개 방법) · `DECISIONS.md`(설계 결정) · `TEST_RESULTS.md`(시험 결과·미해결 문제).
> 마지막 갱신: 2026-10-09 새벽 (W6 뒤)

## 1. 마지막 완료 작업
- **W6 성인 18단원 작성 + 독립 검토**(성인 맞춤법 01~10·성인 기초 수학 01~08, 워크플로 39분): 검토자가 61곳 고침, 남은 의문 47건(tmp/w6-review.json),
  내용 검사 오류 0·경고 0(993단원), 휴대폰 폭 예상문제 점검 228문제 문제 0.
- 수식 엔진: `\mathrm{A'B}` → A′B(프라임) · 깨진 글자(U+FFFD) 검사 · 내용 검사의 "다른 것 고르기" 오탐 고침.
- 전체 시험 **1172 passed**(10.1m).

## 2. 현재 진행 중인 작업
- 위 내용 커밋·push → 다음 묶음 **W7**(성인 기초 수학 09~10 · 생활 수학 01~10 · 성인 기초 영어 01~04, 16단원) 워크플로.

## 3. 최근에 고친 파일
- 엔진·검사기: `js/mathtext.js`(프라임·깨진 글자) · `scripts/validate-content.js`(다른 것 고르기)
- 시험: `tests/logic/mathtext.spec.js`·`content.spec.js`
- 단원: 새 18개(`kor-a-spell-01~10`·`math-a-basic-01~08`), `data/catalog.js`·`data/index/*`
- 문서: `docs/ARCHITECTURE.md`·`docs/CONTENT-GUIDE.md`(깨진 글자·띄어쓰기 보기 ∨)·`DECISIONS.md`·이 파일·`NEXT_TASK.md`·`TEST_RESULTS.md`·`docs/PROGRESS.md`

## 4. 시험 결과
- 마지막 전체 시험: **1172 passed(10.1m)** — 자세히는 `TEST_RESULTS.md`.

## 5. 남아 있는 문제
- 성인 56단원 '준비 중'(W7~W10), 검토자 의문(대부분 "확인했고 그대로 둠"), 공공 위기 상담 번호(심리학 10) 사용자 확인 바람,
  교육과정 수동 확인 3건(원문 필요), 아이폰 실제 기기 확인, 검색 색인 속도 시험이 같은 PC 부하에 흔들림(여섯 번 중 가장 빠른 값 1.03초로 통과, 한도 1.5초) — 자세히는 `TEST_RESULTS.md`.

## 6. 다음에 실행할 명령과 작업
- `node scripts/content-jobs.js --run 5` 의 첫 묶음으로 W7 워크플로 → `node scripts/after-wave.js` → `QW=360 node tmp/quiz-scan.js <W7 단원…>` → `npx playwright test` → 커밋·push. 차례는 `NEXT_TASK.md` 2절.

## 7. 복구 시 주의사항
- 워크플로가 도는 동안에는 `data/units/` 를 고치거나 전체 시험을 돌리지 않는다. 화면 코드(app.js·css)는 전체 시험이 도는 동안 고치지 않는다(시험 도중 섞인다).
  오래 걸리는 화면 점검은 `tmp/snap/` 사본으로 돌리면 코드를 고치면서도 섞이지 않는다. 끊기면 `NEXT_TASK.md` 4절.
- 보조 스크립트·시험 기록은 작업 폴더의 `tmp/`(git 무시)에 둔다 — 같은 PC 의 다른 Claude 세션이 임시 폴더(scratchpad)를 지울 수 있다(10-09 새벽 겪음). 워크플로 스크립트 예비본: `tmp/workflow-script-backup.js`.
- 학생 기록은 기기에만 — 실제 학생 데이터·백업 파일을 저장소에 넣지 않는다. 비밀정보 검사(`node scripts/scan-secrets.js`)를 지우거나 우회하지 않는다.
- 커밋은 파일 이름을 적어서(`git add .` 금지), 작성자 noreply, push 전에 `git fetch`(매주 교육과정 확인 봇이 커밋할 수 있다).
