# PROGRESS — 지금 상태 한 장 (가정교사)

> 사용자 지시(2026-10-08 "자율개발·자동복구", 기한 2026-10-10)에 따라 작업 단위마다 고친다. 날짜별 자세한 기록은 `docs/PROGRESS.md`.
> 함께 보는 문서: `NEXT_TASK.md`(다음 작업·재개 방법) · `DECISIONS.md`(설계 결정) · `TEST_RESULTS.md`(시험 결과·미해결 문제).
> 마지막 갱신: 2026-10-08 밤

## 1. 마지막 완료 작업
- **W1 대학 18단원 작성 + 독립 검토**(미적분학 05~08·선형대수 01~04·통계 05~08·영문법 09~10·토익 01~04, 워크플로 31분):
  검토자가 정답을 가리고 다시 풀어 66곳 고침, 남은 의문 45건(tmp/w1-review.json), 내용 검사 오류 0·경고 0(909단원), 화면 문제 풀이 점검 216문제 문제 0.
- W1 이 도는 동안: **예상문제 이어 풀기**(새로고침해도 풀던 문제부터) · **기록 지우기 보완**(읽어 주기 설정·틀린 곳 알림은 남김) ·
  내용 검사 경고 8건 모두 처리(형태를 묻는 보기는 검사에서 빼고, 보기 2개짜리 이해 확인 4곳·선형대수 생성기 고침) · 휴대폰 폭 검사에서 넘치던 수식 4곳 고침.
- 전체 시험 **1073 passed**(8.8m).

## 2. 현재 진행 중인 작업
- 위 내용 커밋·push(자동 배포) → 다음 묶음 **W2**(토익 05~10 · 경제학 01~10, 16단원) 워크플로.
- W2 가 도는 동안(화면 코드만): **좁은 화면의 긴 수식 맞춤**(§16) — 글 칸보다 넓은 수식은 글자를 0.8배까지 줄이고, 그래도 넓으면 그 수식만 옆으로 밀게.
  코드와 시험 초안은 준비됨(아직 저장소에 넣지 않음 — W1 커밋 뒤에 넣는다).

## 3. 최근에 고친 파일
- 단원: 새 단원 18개(`data/units/math-u-calc-05~08`·`math-u-linalg-01~04`·`math-u-stat-05~08`·`eng-u-grammar-09~10`·`eng-u-toeic-01~04`),
  고친 단원 8개(`eng-e3-04`·`eng-h-e1-02`·`math-e1-04`·`math-h-alg-11`·`math-h-calc1-04`·`math-h-calc2-02`·`math-u-linalg-06`·`math-u-linalg-07`), `data/catalog.js`·`data/index/eng-univ.js`·`math-univ.js`
- 화면: `js/app.js`(예상문제 이어 풀기·기록 지우기)
- 도구·시험: `scripts/validate-content.js`·`tests/logic/content.spec.js`(형태를 묻는 보기), `tests/ui/quiz-resume.spec.js`·`tests/ui/clear-records.spec.js`(새로)
- 문서: `README.md`·`docs/ARCHITECTURE.md`(§15)·`DECISIONS.md`·이 파일·`NEXT_TASK.md`·`TEST_RESULTS.md`·`docs/PROGRESS.md`

## 4. 시험 결과
- 마지막 전체 시험: **1073 passed(8.8m)** — W1 18단원 + 이어 풀기 + 기록 지우기 + 내용 고침. 자세히는 `TEST_RESULTS.md`.

## 5. 남아 있는 문제
- 대학·성인 140단원 '준비 중'(W2~W10 진행), 검토자 의문(24 + 45 + 약 1,150건), 글 칸 밖으로 삐져나오는 긴 수식(§16 으로 막는 중),
  교육과정 수동 확인 3건(원문 필요), 아이폰 실제 기기 확인 — 자세히는 `TEST_RESULTS.md`.

## 6. 다음에 실행할 명령과 작업
- `node scripts/content-jobs.js --run 5` 의 첫 묶음으로 W2 워크플로 → (도는 동안) §16 넣기·화면 시험 → `node scripts/after-wave.js` → `npx playwright test` → 커밋·push. 차례는 `NEXT_TASK.md` 2절.

## 7. 복구 시 주의사항
- 워크플로가 도는 동안에는 `data/units/` 를 고치거나 전체 시험을 돌리지 않는다. 화면 코드(app.js·css)는 전체 시험이 도는 동안 고치지 않는다(시험 도중 섞인다). 끊기면 `NEXT_TASK.md` 4절.
- 학생 기록은 기기에만 — 실제 학생 데이터·백업 파일을 저장소에 넣지 않는다. 비밀정보 검사(`node scripts/scan-secrets.js`)를 지우거나 우회하지 않는다.
- 커밋은 파일 이름을 적어서(`git add .` 금지), 작성자 noreply, push 전에 `git fetch`(매주 교육과정 확인 봇이 커밋할 수 있다).
