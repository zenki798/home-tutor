# PROGRESS — 지금 상태 한 장 (가정교사)

> 사용자 지시(2026-10-08 "자율개발·자동복구", 기한 2026-10-10)에 따라 작업 단위마다 고친다. 날짜별 자세한 기록은 `docs/PROGRESS.md`.
> 함께 보는 문서: `NEXT_TASK.md`(다음 작업·재개 방법) · `DECISIONS.md`(설계 결정) · `TEST_RESULTS.md`(시험 결과·미해결 문제).
> 마지막 갱신: 2026-10-09 새벽 (W8 뒤)

## 1. 마지막 완료 작업
- **W8 성인 18단원 작성 + 독립 검토**(성인 기초 영어 문법 05~12·생활 영어 표현 01~10, 워크플로 36분): 검토자가 70곳 고침, 남은 의문 29건(tmp/w8-review.json),
  내용 검사 오류 0·경고 0(1027단원), 휴대폰 폭 예상문제 점검 216문제 문제 0.
- 채점: 문장처럼 쓴 수 답·모음 답의 단위, 읽지 못한 답은 다시 써 달라고 · 홈 이어서 공부하기에 다음 카드 이름 · 그림 보조선 이름 자리(겹침 69 → 8).
- 전체 시험 **1185 passed**(10.7m).

## 2. 현재 진행 중인 작업
- 위 내용 커밋·push → 다음 묶음 **W9**(생활 법률·경제 01~10 · 한국사 09~10 · 생활 속 과학 01~04, 16단원) 워크플로.

## 3. 최근에 고친 파일
- 엔진·화면: `js/mathlib.js`(문장 답·모음 답 단위·readable) · `js/app.js`(다시 써 달라는 안내·홈 다음 카드 이름) · `js/figures.js`(보조선 이름 자리)
- 시험: `tests/logic/mathlib.spec.js`·`figures.spec.js` · `tests/ui/learn.spec.js`·`learn-resume.spec.js`
- 단원: 새 18개(`eng-a-basic-05~12`·`eng-a-talk-01~10`), `data/catalog.js`·`data/index/*`
- 문서: `README.md`·`docs/ARCHITECTURE.md`·`docs/CONTENT-GUIDE.md`·`DECISIONS.md`·이 파일·`NEXT_TASK.md`·`TEST_RESULTS.md`·`docs/PROGRESS.md`

## 4. 시험 결과
- 마지막 전체 시험: **1185 passed(10.7m)** — 자세히는 `TEST_RESULTS.md`.

## 5. 남아 있는 문제
- 성인 22단원 '준비 중'(W9~W10), 검토자 의문(대부분 "확인했고 그대로 둠"), 공공 위기 상담 번호(심리학 10) 사용자 확인 바람,
  교육과정 수동 확인 3건(원문 필요), 아이폰 실제 기기 확인, 검색 색인 속도 시험이 같은 PC 부하에 흔들림(여섯 번 중 가장 빠른 값 1.03초로 통과, 한도 1.5초) — 자세히는 `TEST_RESULTS.md`.

## 6. 다음에 실행할 명령과 작업
- `node scripts/content-jobs.js --run 5` 의 첫 묶음으로 W9 워크플로 → `node scripts/after-wave.js` → `QW=360 node tmp/quiz-scan.js <W9 단원…>` → `npx playwright test` → 커밋·push. 차례는 `NEXT_TASK.md` 2절.

## 7. 복구 시 주의사항
- 워크플로가 도는 동안에는 `data/units/` 를 고치거나 전체 시험을 돌리지 않는다. 화면 코드(app.js·css)는 전체 시험이 도는 동안 고치지 않는다(시험 도중 섞인다).
  오래 걸리는 화면 점검은 `tmp/snap/` 사본으로 돌리면 코드를 고치면서도 섞이지 않는다. 끊기면 `NEXT_TASK.md` 4절.
- 보조 스크립트·시험 기록은 작업 폴더의 `tmp/`(git 무시)에 둔다 — 같은 PC 의 다른 Claude 세션이 임시 폴더(scratchpad)를 지울 수 있다(10-09 새벽 겪음). 워크플로 스크립트 예비본: `tmp/workflow-script-backup.js`.
- 학생 기록은 기기에만 — 실제 학생 데이터·백업 파일을 저장소에 넣지 않는다. 비밀정보 검사(`node scripts/scan-secrets.js`)를 지우거나 우회하지 않는다.
- 커밋은 파일 이름을 적어서(`git add .` 금지), 작성자 noreply, push 전에 `git fetch`(매주 교육과정 확인 봇이 커밋할 수 있다).
