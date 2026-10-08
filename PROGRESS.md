# PROGRESS — 지금 상태 한 장 (가정교사)

> 사용자 지시(2026-10-08 "자율개발·자동복구", 기한 2026-10-10)에 따라 작업 단위마다 고친다. 날짜별 자세한 기록은 `docs/PROGRESS.md`.
> 함께 보는 문서: `NEXT_TASK.md`(다음 작업·재개 방법) · `DECISIONS.md`(설계 결정) · `TEST_RESULTS.md`(시험 결과·미해결 문제).
> 마지막 갱신: 2026-10-09 아침 (W10 뒤 — 대학·성인 158단원 완성)

## 1. 마지막 완료 작업
- **대학·성인 158단원 작성 + 독립 검토 완성**(W1~W10) — 카탈로그 1049단원 모두 준비됨(준비 중 0). 검토자가 고친 곳 490곳.
- 마지막 묶음 **W10**(생활 속 과학·건강 05~10, 31분): 검토자가 16곳 고침(열사병 신호·일식 관측 안전 문구 등), 손으로 그린 그림 2개 화면 확인.
- 채점: 글 답의 가운뎃점·수 사이 마침표(5.18 = 5·18) · 수식 \text 안의 \% · 검색 5.18.
- 전체 시험 **1191 passed**(9.3m).

## 2. 현재 진행 중인 작업
- 위 내용 커밋·push → 배포 확인 → 사용자에게 최종 보고. 그 뒤는 `NEXT_TASK.md` 1절(사람의 확인·해마다 할 일).

## 3. 최근에 고친 파일
- 엔진: `js/mathlib.js`(가운뎃점·마침표) · `js/mathtext.js`(\text 안의 \%) · `js/search.js`(검색 5.18)
- 시험: `tests/logic/mathlib.spec.js`·`mathtext.spec.js`·`search.spec.js`
- 단원: 새 6개(`sci-a-life-05~10`), `data/catalog.js`·`data/index/*`
- 문서: `docs/ARCHITECTURE.md`·`docs/CONTENT-GUIDE.md`·`DECISIONS.md`·이 파일·`NEXT_TASK.md`·`TEST_RESULTS.md`·`docs/PROGRESS.md`

## 4. 시험 결과
- 마지막 전체 시험: **1191 passed(9.3m)** — 자세히는 `TEST_RESULTS.md`.

## 5. 남아 있는 문제
- 준비 중 단원 없음. 검토자 의문(대부분 "확인했고 그대로 둠"), 공공 위기 상담 번호(심리학 10 — 109·119)·'1372 소비자상담센터'(생활 법률 04 — 기관 이름이 곧 번호) 사용자 확인 바람,
  교육과정 수동 확인 3건(원문 필요), 아이폰 실제 기기 확인, 검색 색인 속도 시험이 같은 PC 부하에 흔들림(여섯 번 중 가장 빠른 값 1.03초로 통과, 한도 1.5초) — 자세히는 `TEST_RESULTS.md`.

## 6. 다음에 실행할 명령과 작업
- 새 단원이 생기면 `node scripts/content-jobs.js --run 5` 의 첫 묶음으로 워크플로(과목별 당부 `tmp/w9-notes.md` 참고) → `node scripts/after-wave.js` → `QW=360 node tmp/quiz-scan.js <단원…>` → `npx playwright test` → 커밋·push. 차례는 `NEXT_TASK.md` 2절.

## 7. 복구 시 주의사항
- 워크플로가 도는 동안에는 `data/units/` 를 고치거나 전체 시험을 돌리지 않는다. 화면 코드(app.js·css)는 전체 시험이 도는 동안 고치지 않는다(시험 도중 섞인다).
  오래 걸리는 화면 점검은 `tmp/snap/` 사본으로 돌리면 코드를 고치면서도 섞이지 않는다. 끊기면 `NEXT_TASK.md` 4절.
- 보조 스크립트·시험 기록은 작업 폴더의 `tmp/`(git 무시)에 둔다 — 같은 PC 의 다른 Claude 세션이 임시 폴더(scratchpad)를 지울 수 있다(10-09 새벽 겪음). 워크플로 스크립트 예비본: `tmp/workflow-script-backup.js`.
- 학생 기록은 기기에만 — 실제 학생 데이터·백업 파일을 저장소에 넣지 않는다. 비밀정보 검사(`node scripts/scan-secrets.js`)를 지우거나 우회하지 않는다.
- 커밋은 파일 이름을 적어서(`git add .` 금지), 작성자 noreply, push 전에 `git fetch`(매주 교육과정 확인 봇이 커밋할 수 있다).
