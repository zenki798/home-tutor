# PROGRESS — 지금 상태 한 장 (가정교사)

> 사용자 지시(2026-10-08 "자율개발·자동복구", 기한 2026-10-10)에 따라 작업 단위마다 고친다. 날짜별 자세한 기록은 `docs/PROGRESS.md`.
> 함께 보는 문서: `NEXT_TASK.md`(다음 작업·재개 방법) · `DECISIONS.md`(설계 결정) · `TEST_RESULTS.md`(시험 결과·미해결 문제).
> 마지막 갱신: 2026-10-08 저녁

## 1. 마지막 완료 작업
- **C-R1 대학 35단원 독립 검토**(워크플로 검토자 9명, 15분): 1,685문항을 정답을 가린 채 다시 풀어 68곳 고침, 남은 의문 24건, 형식 검사 오류 0, 화면 문제 풀이 점검 420문제 이상 없음.
- 그 전(같은 날): 기능 6가지 — 오늘의 복습 · 틀린 곳 알리기(기기에만) · 보호자용 학습 요약 · 읽어 주기(기기 안 목소리) · 새 학년 안내 · 아이폰(WebKit) 화면 시험 — 모두 배포.

## 2. 현재 진행 중인 작업
- 남은 대학·성인 **158단원 작성 + 독립 검토** — 묶음 W1~W10(`NEXT_TASK.md` 표). W1 부터.

## 3. 최근에 고친 파일
- 단원: `data/units/` 의 대학 단원 28개(대학 글쓰기·미적분학·선형대수·통계·영문법 — 검토자 수정), 색인 `data/index/kor-univ.js`·`math-univ.js`
- 시험: `tests/logic/search.spec.js`·`mathtext.spec.js`(속도 시험을 여러 번 재어 가장 빠른 값으로 — 한도 그대로)
- 도구: `scripts/after-wave.js`(물결 뒤 정리), `scripts/content-jobs.js`(준비 중 단원 → 워크플로 작업)
- 문서: 이 파일 · `NEXT_TASK.md` · `DECISIONS.md` · `TEST_RESULTS.md` · `docs/PROGRESS.md`

## 4. 시험 결과
- 마지막 전체 시험: `TEST_RESULTS.md` 표의 맨 아래 줄. 기능 6가지 뒤 1048 passed(12.7m), CI 1047 passed.

## 5. 남아 있는 문제
- 대학·성인 158단원 '준비 중'(진행 중), 검토자 의문(24 + 약 1,150건), 내용 검사 경고 8건, 교육과정 수동 확인 3건(원문 필요), 아이폰 실제 기기 확인 — 자세히는 `TEST_RESULTS.md`.

## 6. 다음에 실행할 명령과 작업
- `node scripts/content-jobs.js --run 5` 의 첫 묶음으로 단원 워크플로 → `node scripts/after-wave.js` → `npx playwright test` → 커밋·push. 차례는 `NEXT_TASK.md` 2절.

## 7. 복구 시 주의사항
- 워크플로가 도는 동안에는 `data/units/` 를 고치거나 전체 시험을 돌리지 않는다. 끊기면 `NEXT_TASK.md` 4절.
- 학생 기록은 기기에만 — 실제 학생 데이터·백업 파일을 저장소에 넣지 않는다. 비밀정보 검사(`node scripts/scan-secrets.js`)를 지우거나 우회하지 않는다.
- 커밋은 파일 이름을 적어서(`git add .` 금지), 작성자 noreply, push 전에 `git fetch`(매주 교육과정 확인 봇이 커밋할 수 있다).
