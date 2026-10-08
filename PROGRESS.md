# PROGRESS — 지금 상태 한 장 (가정교사)

> 사용자 지시(2026-10-08 "자율개발·자동복구", 기한 2026-10-10)에 따라 작업 단위마다 고친다. 날짜별 자세한 기록은 `docs/PROGRESS.md`.
> 함께 보는 문서: `NEXT_TASK.md`(다음 작업·재개 방법) · `DECISIONS.md`(설계 결정) · `TEST_RESULTS.md`(시험 결과·미해결 문제).
> 마지막 갱신: 2026-10-09 새벽 (W5 뒤)

## 1. 마지막 완료 작업
- **W5 대학·성인 16단원 작성 + 독립 검토**(일반물리 05~10·성인 문해 01~10, 워크플로 42분): 검토자가 53곳 고침, 남은 의문 27건(tmp/w5-review.json),
  내용 검사 오류 0·경고 0(975단원), 휴대폰 폭 예상문제 점검 264문제 문제 0.
- **수식 엔진**: `\mathrm{m/s^2}` 처럼 단위 안에 첨자·명령을 쓰면 화면에 글자째("m/s^2") 보이던 것(8단원 61곳, W5 작성자 보고) → m/s²로.
- **읽어 주기 정확도**: 전체 단원 글을 읽어 주기 글로 바꿔 수식 명령이 남는 곳 251 → 9(붙은 수식·빈칸 밑줄·n제곱근 지수·이온 전하).
- 전체 시험 **1171 passed**(11.2m). 배포 사이트(W4 반영본) 아이폰 WebKit 확인: 콘솔 오류 0·외부 요청 0.

## 2. 현재 진행 중인 작업
- 위 내용 커밋·push → 다음 묶음 **W6**(성인 맞춤법 01~10 · 성인 기초 수학 01~08, 18단원) 워크플로.

## 3. 최근에 고친 파일
- 엔진: `js/mathtext.js`(`\mathrm` 안 수식) · `js/speech.js`(읽어 주기)
- 시험: `tests/logic/mathtext.spec.js`·`speech.spec.js`·`search.spec.js`(여섯 번 재기)
- 단원: 새 16개(`sci-u-phy-05~10`·`kor-a-literacy-01~10`), `data/catalog.js`·`data/index/kor-adult.js`·`sci-univ.js`·`sci-high.js`·`sci-mid.js`
- 문서: `docs/ARCHITECTURE.md`(§3·§13)·`DECISIONS.md`·이 파일·`NEXT_TASK.md`·`TEST_RESULTS.md`·`docs/PROGRESS.md`

## 4. 시험 결과
- 마지막 전체 시험: **1171 passed(11.2m)** — 자세히는 `TEST_RESULTS.md`.

## 5. 남아 있는 문제
- 대학·성인 74단원 '준비 중'(W6~W10), 검토자 의문(대부분 "확인했고 그대로 둠"), 공공 위기 상담 번호(심리학 10) 사용자 확인 바람,
  교육과정 수동 확인 3건(원문 필요), 아이폰 실제 기기 확인, 검색 색인 속도 시험이 같은 PC 부하에 흔들림(여섯 번 중 가장 빠른 값 1.03초로 통과, 한도 1.5초) — 자세히는 `TEST_RESULTS.md`.

## 6. 다음에 실행할 명령과 작업
- `node scripts/content-jobs.js --run 5` 의 첫 묶음으로 W6 워크플로 → `node scripts/after-wave.js` → `QW=360 node tmp/quiz-scan.js <W6 단원…>` → `npx playwright test` → 커밋·push. 차례는 `NEXT_TASK.md` 2절.

## 7. 복구 시 주의사항
- 워크플로가 도는 동안에는 `data/units/` 를 고치거나 전체 시험을 돌리지 않는다. 화면 코드(app.js·css)는 전체 시험이 도는 동안 고치지 않는다(시험 도중 섞인다).
  오래 걸리는 화면 점검은 `tmp/snap/` 사본으로 돌리면 코드를 고치면서도 섞이지 않는다. 끊기면 `NEXT_TASK.md` 4절.
- 학생 기록은 기기에만 — 실제 학생 데이터·백업 파일을 저장소에 넣지 않는다. 비밀정보 검사(`node scripts/scan-secrets.js`)를 지우거나 우회하지 않는다.
- 커밋은 파일 이름을 적어서(`git add .` 금지), 작성자 noreply, push 전에 `git fetch`(매주 교육과정 확인 봇이 커밋할 수 있다).
