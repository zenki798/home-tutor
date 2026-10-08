# PROGRESS — 지금 상태 한 장 (가정교사)

> 사용자 지시(2026-10-08 "자율개발·자동복구", 기한 2026-10-10)에 따라 작업 단위마다 고친다. 날짜별 자세한 기록은 `docs/PROGRESS.md`.
> 함께 보는 문서: `NEXT_TASK.md`(다음 작업·재개 방법) · `DECISIONS.md`(설계 결정) · `TEST_RESULTS.md`(시험 결과·미해결 문제).
> 마지막 갱신: 2026-10-09 새벽 (W9 뒤)

## 1. 마지막 완료 작업
- **W9 성인 16단원 작성 + 독립 검토**(생활 법률·경제 01~10·한국사 09~10·생활 속 과학·건강 01~04, 워크플로 30분, 과목별 당부 args.notes): 검토자가 25곳 고침,
  남은 의문 42건(tmp/w9-review.json), 내용 검사 오류 0·경고 0(1043단원), 휴대폰 폭 예상문제 점검 192문제 문제 0.
- 채점: 과학 표기·위첨자 지수(10³ = 1000)·우리말 큰 수(15만·1억 2천만) · 그림: 길쭉한 도형의 보조선 이름(겹침 0) · 초5 수학 06 생성기 비율.
- 전체 시험 **1188 passed**(9.4m).

## 2. 현재 진행 중인 작업
- 위 내용 커밋·push → 마지막 묶음 **W10**(생활 속 과학·건강 05~10, 6단원) 워크플로.

## 3. 최근에 고친 파일
- 엔진: `js/mathlib.js`(과학 표기·위첨자·우리말 큰 수) · `js/figures.js`(길쭉한 도형의 이름 자리) · 단원 `data/units/math-e5-06.js`(생성기 비율)
- 시험: `tests/logic/mathlib.spec.js`·`figures.spec.js` · 도구: `tools/content-workflow.js`(args.notes)
- 단원: 새 16개(`soc-a-law-01~10`·`hist-a-korea-09~10`·`sci-a-life-01~04`), `data/catalog.js`·`data/index/*`
- 문서: `README.md`·`docs/ARCHITECTURE.md`·`docs/CONTENT-GUIDE.md`·`DECISIONS.md`·이 파일·`NEXT_TASK.md`·`TEST_RESULTS.md`·`docs/PROGRESS.md`

## 4. 시험 결과
- 마지막 전체 시험: **1188 passed(9.4m)** — 자세히는 `TEST_RESULTS.md`.

## 5. 남아 있는 문제
- 성인 6단원 '준비 중'(W10), 검토자 의문(대부분 "확인했고 그대로 둠"), 공공 위기 상담 번호(심리학 10 — 109·119)·'1372 소비자상담센터'(생활 법률 04 — 기관 이름이 곧 번호) 사용자 확인 바람,
  교육과정 수동 확인 3건(원문 필요), 아이폰 실제 기기 확인, 검색 색인 속도 시험이 같은 PC 부하에 흔들림(여섯 번 중 가장 빠른 값 1.03초로 통과, 한도 1.5초) — 자세히는 `TEST_RESULTS.md`.

## 6. 다음에 실행할 명령과 작업
- `node scripts/content-jobs.js --run 5` 의 첫 묶음으로 W10 워크플로(sci 당부 `tmp/w9-notes.md`) → `node scripts/after-wave.js` → `QW=360 node tmp/quiz-scan.js <W10 단원…>` → `npx playwright test` → 커밋·push. 차례는 `NEXT_TASK.md` 2절.

## 7. 복구 시 주의사항
- 워크플로가 도는 동안에는 `data/units/` 를 고치거나 전체 시험을 돌리지 않는다. 화면 코드(app.js·css)는 전체 시험이 도는 동안 고치지 않는다(시험 도중 섞인다).
  오래 걸리는 화면 점검은 `tmp/snap/` 사본으로 돌리면 코드를 고치면서도 섞이지 않는다. 끊기면 `NEXT_TASK.md` 4절.
- 보조 스크립트·시험 기록은 작업 폴더의 `tmp/`(git 무시)에 둔다 — 같은 PC 의 다른 Claude 세션이 임시 폴더(scratchpad)를 지울 수 있다(10-09 새벽 겪음). 워크플로 스크립트 예비본: `tmp/workflow-script-backup.js`.
- 학생 기록은 기기에만 — 실제 학생 데이터·백업 파일을 저장소에 넣지 않는다. 비밀정보 검사(`node scripts/scan-secrets.js`)를 지우거나 우회하지 않는다.
- 커밋은 파일 이름을 적어서(`git add .` 금지), 작성자 noreply, push 전에 `git fetch`(매주 교육과정 확인 봇이 커밋할 수 있다).
