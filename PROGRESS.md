# PROGRESS — 지금 상태 한 장 (가정교사)

> 사용자 지시(2026-10-08 "자율개발·자동복구", 기한 2026-10-10)에 따라 작업 단위마다 고친다. 날짜별 자세한 기록은 `docs/PROGRESS.md`.
> 함께 보는 문서: `NEXT_TASK.md`(다음 작업·재개 방법) · `DECISIONS.md`(설계 결정) · `TEST_RESULTS.md`(시험 결과·미해결 문제).
> 마지막 갱신: 2026-10-08 밤 (W3 뒤)

## 1. 마지막 완료 작업
- **W3 대학 18단원 작성 + 독립 검토**(심리학 01~10·생명과학 01~08, 워크플로 42분): 검토자가 58곳 고침, 남은 의문 38건(tmp/w3-review.json),
  내용 검사 오류 0·경고 0(943단원), 휴대폰 폭 예상문제 점검 216문제 문제 0.
- **전체 925단원 예상문제 점검**(휴대폰 폭, 11,012문제): 문제 0 · 넘침 0. 개념·예제·심화 탭도 넘침 0.
- 화면 보완: **자주 틀린 개념**(보호자용 요약·학생 기록 화면, 풀이 기록에 개념 카드 번호) · **홈 "이어서 공부하기"에 어디부터인지** ·
  **태블릿 세로 + 글자 '아주 크게'에서 화면이 옆으로 밀리던 것 고침**(새 태블릿 폭 시험이 찾음) · 초6 과학 보기 1곳.
- 전체 시험 **1142 passed**(12.9m).

## 2. 현재 진행 중인 작업
- 위 내용 커밋·push → 다음 묶음 **W4**(생명과학 09~10 · 화학 01~10 · 물리학 01~04, 16단원) 워크플로.
- W4 가 도는 동안: **기록 지키기**(1순위 데이터 보호) — 브라우저에 기록 보존을 요청(navigator.storage.persist)하고, 설정에서 상태·사용량을 보이며,
  아이폰 사파리의 "7일 넘게 열지 않으면 지워질 수 있음"을 알린다.

## 3. 최근에 고친 파일
- 화면: `js/app.js`(자주 틀린 개념·홈 카드) · `js/summary.js`(concepts) · `css/app.css`(태블릿 메뉴·이름표)
- 시험: `tests/ui/summary.spec.js`·`learn-resume.spec.js`·`quiz-again.spec.js`·`layout.spec.js`(태블릿 폭) · `tests/logic/summary.spec.js`
- 단원: 새 18개(`soc-u-psych-01~10`·`sci-u-bio-01~08`), 고침 `sci-e6-05`, `data/catalog.js`·`data/index/sci-univ.js`·`soc-univ.js`
- 문서: `README.md`·`docs/ARCHITECTURE.md`(§12·§17·§18)·`DECISIONS.md`·이 파일·`NEXT_TASK.md`·`TEST_RESULTS.md`·`docs/PROGRESS.md`

## 4. 시험 결과
- 마지막 전체 시험: **1142 passed(12.9m)** — 자세히는 `TEST_RESULTS.md`.

## 5. 남아 있는 문제
- 대학·성인 106단원 '준비 중'(W4~W10), 검토자 의문(대부분 "확인했고 그대로 둠"), 공공 위기 상담 번호(심리학 10) 사용자 확인 바람,
  교육과정 수동 확인 3건(원문 필요), 아이폰 실제 기기 확인, 검색 색인 속도 시험이 같은 PC 부하에 한도(1.5초) 가까이(1.09초) — 자세히는 `TEST_RESULTS.md`.

## 6. 다음에 실행할 명령과 작업
- `node scripts/content-jobs.js --run 5` 의 첫 묶음으로 W4 워크플로 → `node scripts/after-wave.js` → `QW=360 node tmp/quiz-scan.js <W4 단원…>` → `npx playwright test` → 커밋·push. 차례는 `NEXT_TASK.md` 2절.

## 7. 복구 시 주의사항
- 워크플로가 도는 동안에는 `data/units/` 를 고치거나 전체 시험을 돌리지 않는다. 화면 코드(app.js·css)는 전체 시험이 도는 동안 고치지 않는다(시험 도중 섞인다).
  오래 걸리는 화면 점검은 `tmp/snap/` 사본으로 돌리면 코드를 고치면서도 섞이지 않는다. 끊기면 `NEXT_TASK.md` 4절.
- 학생 기록은 기기에만 — 실제 학생 데이터·백업 파일을 저장소에 넣지 않는다. 비밀정보 검사(`node scripts/scan-secrets.js`)를 지우거나 우회하지 않는다.
- 커밋은 파일 이름을 적어서(`git add .` 금지), 작성자 noreply, push 전에 `git fetch`(매주 교육과정 확인 봇이 커밋할 수 있다).
