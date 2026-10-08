# PROGRESS — 지금 상태 한 장 (가정교사)

> 사용자 지시(2026-10-08 "자율개발·자동복구", 기한 2026-10-10)에 따라 작업 단위마다 고친다. 날짜별 자세한 기록은 `docs/PROGRESS.md`.
> 함께 보는 문서: `NEXT_TASK.md`(다음 작업·재개 방법) · `DECISIONS.md`(설계 결정) · `TEST_RESULTS.md`(시험 결과·미해결 문제).
> 마지막 갱신: 2026-10-08 밤 (W2 뒤)

## 1. 마지막 완료 작업
- **W2 대학 16단원 작성 + 독립 검토**(토익 05~10·경제학원론 01~10, 워크플로 53분): 검토자가 46곳 고침, 남은 의문 31건(tmp/w2-review.json),
  내용 검사 오류 0·경고 0(925단원), 휴대폰 폭 예상문제 점검 192문제 문제 0.
- W2 가 도는 동안 화면 보완 5가지(모두 시험 포함):
  - **좁은 화면의 긴 수식 맞춤**(§16, 3순위): 글자 0.8배까지 줄이기 → 그 수식만 옆으로 밀기. 고등·대학 수학 112단원 1,344문제 휴대폰 폭 확인 넘침 0.
  - **기록 저장 실패 알림·자동 재시도**(§9.6, 1순위 데이터 보호): 저장 공간이 차도 기록을 메모리에 두고 저절로 다시 쓰며 화면 위에 알림.
  - **개념 카드 이어 보기**(§17, 3순위): 단원을 다시 열면 안 본 첫 카드부터.
  - **다시 볼 개념**(§18, 2순위): 예상문제 결과에 틀린 문제가 묶인 개념 카드.
  - **첨자 별표**: `x^*` 를 ×로 그리던 수식 엔진 고침(검토자 보고).
- 전체 시험 **1114 passed**(9.7m). (1차에서 실패한 2건은 이어 보기로 바뀐 동작을 시험 기대값이 몰랐던 것 — 기대값을 새 동작으로 정확히 고침)

## 2. 현재 진행 중인 작업
- 위 내용 커밋·push(자동 배포) → 다음 묶음 **W3**(심리학 01~10 · 생물학 01~08, 18단원) 워크플로.

## 3. 최근에 고친 파일
- 화면·엔진: `js/app.js`(§16·§17·§18·저장 알림) · `js/storage.js`(status·onStatus·자동 재시도) · `js/mathtext.js`(첨자 별표) · `js/speech.js` · `css/app.css` · `css/mathtext.css` · `index.html`(저장 문제 알림 막대)
- 시험: 새 `tests/ui/math-fit.spec.js`·`save-fail.spec.js`·`learn-resume.spec.js`·`quiz-again.spec.js`, 더함 `tests/logic/storage.spec.js`·`mathtext.spec.js`·`speech.spec.js`, 기대값 고침 `tests/ui/pwa.spec.js`
- 단원: 새 16개(`eng-u-toeic-05~10`·`soc-u-econ-01~10`), `data/catalog.js`·`data/index/eng-univ.js`·`math-univ.js`·`soc-univ.js`
- 문서: `README.md`·`docs/ARCHITECTURE.md`(§9.6·§16·§17·§18)·`DECISIONS.md`·이 파일·`NEXT_TASK.md`·`TEST_RESULTS.md`·`docs/PROGRESS.md`

## 4. 시험 결과
- 마지막 전체 시험: **1114 passed(9.7m)** — 자세히는 `TEST_RESULTS.md`.

## 5. 남아 있는 문제
- 대학·성인 124단원 '준비 중'(W3~W10 진행), 검토자 의문(24 + 45 + 31 + 약 1,150건 — 대부분 "확인했고 그대로 둠"),
  교육과정 수동 확인 3건(원문 필요), 아이폰 실제 기기 확인 — 자세히는 `TEST_RESULTS.md`.

## 6. 다음에 실행할 명령과 작업
- `node scripts/content-jobs.js --run 5` 의 첫 묶음으로 W3 워크플로 → `node scripts/after-wave.js` → `QW=360 node tmp/quiz-scan.js <W3 단원…>` → `npx playwright test` → 커밋·push. 차례는 `NEXT_TASK.md` 2절.

## 7. 복구 시 주의사항
- 워크플로가 도는 동안에는 `data/units/` 를 고치거나 전체 시험을 돌리지 않는다. 화면 코드(app.js·css)는 전체 시험이 도는 동안 고치지 않는다(시험 도중 섞인다). 끊기면 `NEXT_TASK.md` 4절.
- 학생 기록은 기기에만 — 실제 학생 데이터·백업 파일을 저장소에 넣지 않는다. 비밀정보 검사(`node scripts/scan-secrets.js`)를 지우거나 우회하지 않는다.
- 커밋은 파일 이름을 적어서(`git add .` 금지), 작성자 noreply, push 전에 `git fetch`(매주 교육과정 확인 봇이 커밋할 수 있다).
