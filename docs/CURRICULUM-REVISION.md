# 교육과정이 개정될 때 (자동 반영 체계)

> 이 사이트는 **AI 없이** 동작하므로, 바뀐 교육과정에 맞는 새 설명·문제를 사람 손 없이 써 넣을 수는 없다.
> 대신 **알아차리기 → 영향 계산 → 표시 → 작업 목록 → 학생 기기 반영**을 자동으로 하고,
> 사람(또는 내용 작성 워크플로)은 "다시 쓰기"만 하면 되게 만들었다.

## 한눈에

| 단계 | 무엇이 | 자동? | 도구 |
|---|---|---|---|
| 1. 개정 소식 알아차리기 | 매주 월요일 교육부 보도자료에서 "교육과정 + 개정·고시·확정…" 제목을 찾아 **GitHub 이슈**를 연다 | ✅ 자동 | `.github/workflows/curriculum-watch.yml` · `scripts/curriculum-watch.js` |
| 2. 새 지도 만들기 | 바뀐 성취기준·단원 차례를 `curriculum/revisions/<판>/` 에 지금 지도와 같은 꼴로 | ✋ 사람(또는 지도 작성 워크플로) | — |
| 3. 무엇이 바뀌었나 | 새로 쓸·다시 쓸·살펴볼·뺄 단원, 새·없어진 성취기준, 작업 목록 | ✅ 자동 | `scripts/curriculum-diff.js` |
| 4. 적용 | 지도 교체(옛 지도 보관), 없어진 단원 보관, 카탈로그·색인 다시 | ✅ 자동 | `scripts/curriculum-apply.js` |
| 5. 사이트 표시 | 새 단원 **"준비 중"**, 성취기준이 바뀐 단원 **"개정 반영 중"**(열 수 있고 안내가 뜬다) | ✅ 자동 | `scripts/build-catalog.js` 가 단원 파일과 지도의 성취기준을 견준다 |
| 6. 다시 쓰기 | 작업 목록대로 새로 쓰기·고쳐 쓰기·독립 검토 | ✋ 워크플로(사용자가 시작) | `tools/content-workflow.js` |
| 7. 학생 기기 | push → 검사·테스트 → 배포. 다시 쓴 단원은 "개정 반영 중"이 **저절로** 사라지고, 학생 기기는 다음에 열 때 새 내용을 받는다 | ✅ 자동 | GitHub Actions · 서비스 워커 |

## 차례 (개정 소식 이슈가 열렸을 때)

1. **소식 확인**: 이슈의 원문을 열어 초·중·고 교육과정(총론·교과 성취기준)이 실제로 바뀌는지, 어느 학년부터 언제 적용되는지 본다.
   관계없는 소식이면 이슈를 닫는다. 교육과정 원문은 국가교육과정정보센터(ncic.re.kr)에서 사람이 내려받는다
   (그 사이트는 자동 프로그램의 접근을 막아 두어 감지 도구가 보지 않는다).
2. **새 지도**: `curriculum/revisions/<판>/` 폴더를 만들고
   - `meta.json` — `{ "version": "<판>", "name": "<판> 개정 교육과정" }`
   - 과정 묶음 파일들(`kor-A.json` …) — 지금 `curriculum/*.json` 을 복사해 바뀐 곳만 고친다.
     단원 id 는 **그대로 쓸 수 있으면 그대로**(학생 기록·오답노트가 단원 id 로 기억한다), 단원마다 `standards` 를 새 성취기준 코드로.
3. **비교**:
   ```
   node scripts/curriculum-diff.js curriculum/revisions/<판> --md docs/revisions/<판>.md --jobs tmp/revision-<판>.json
   ```
   보고서(docs/revisions/<판>.md)를 읽고 이상한 곳(실수로 바뀐 id 등)이 있으면 2로 돌아간다.
4. **적용**:
   ```
   node scripts/curriculum-apply.js curriculum/revisions/<판> --dry-run   # 미리 보기
   node scripts/curriculum-apply.js curriculum/revisions/<판>
   ```
   - 옛 지도 → `curriculum/history/<옛 판>/`, 새 지도에 없는 단원 파일 → `retired/units/<옛 판>/` (둘 다 배포되지 않는다)
   - 카탈로그·색인을 다시 만든다 → 새 단원 "준비 중", 성취기준이 바뀐 단원 "개정 반영 중"
   - 여기서 `npx playwright test` 를 통과시키고 커밋·push 해도 된다(사이트는 그대로 동작하고, 학생은 무엇이 바뀌는 중인지 본다).
5. **다시 쓰기**: `tmp/revision-<판>.json` 의 `write`(새로 쓰기)·`revise`(고쳐 쓰기)·`review`(검토만)를 이어 붙여
   `tools/content-workflow.js` 를 Workflow 도구로 돌린다 (args `{ root, tag, jobs }`, 작업은 20개 안팎씩, 워크플로는 한 번에 하나).
   고쳐 쓰기는 단원 파일의 `standards` 를 새 지도와 같게 바꾸므로 "개정 반영 중"이 저절로 사라진다.
6. **마무리**: `bash` 로 `node scripts/build-catalog.js && node scripts/build-index.js` → `node scripts/validate-content.js` 오류 0 →
   `npx playwright test` 전부 통과 → 경로를 적어 커밋 → push(자동 배포). `curriculum/revisions/<판>/` 는 지워도 된다(history 에 남는다).

## 규칙

- **지도와 단원 파일의 성취기준은 같아야 한다.** 다르면 `lint-unit` 이 경고하고 화면에 "개정 반영 중"으로 보인다(그것이 개정 표시의 원리).
- 판이 같은 지도를 다시 적용하지 않는다(`curriculum-apply` 가 막는다).
- 개정 소식 확인은 저장소 관리 도구다. 사이트(페이지)와 학생 기기는 여전히 외부에 아무 요청도 보내지 않는다(AGENTS.md 규칙 4).
  감지 도구는 robots.txt 를 지키고, 비밀(secrets) 없이 Actions 의 기본 토큰으로만 이슈를 연다.
- 감지 도구가 목록을 읽지 못하면(페이지 모양이 바뀜 등) 실행이 실패로 끝나 저장소 주인에게 GitHub 알림이 간다 → `scripts/curriculum-watch.js` 의 읽는 방법을 고친다.
