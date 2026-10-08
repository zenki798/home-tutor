/* 단원 내용 작성·고쳐 쓰기·독립 검토 워크플로 (Claude Code 의 Workflow 도구용 스크립트)
 *
 * 쓰는 법: Workflow 도구에 이 파일 내용을 script 로 넣고 args 를 준다.
 *   args = { root: '<프로젝트 폴더 절대경로>', tag: '설명', jobs: [ … ], notes?: { 과목: '이번 단원들의 당부' } }
 *   notes 는 그 과목 작업의 작성자·검토자 모두에게 덧붙는다(예: 자주 바뀌는 법·제도 숫자는 연도와 함께, 2026-10-09)
 *   jobs 한 줄 = 단원 2~4개 묶음
 *     '과정#n|과목|id,id'      새로 쓰기 → 독립 검토       (curriculum-diff.js 의 write)
 *     'V|라벨|과목|id,id'      교육과정 개정: 고쳐 쓰기 → 독립 검토 (curriculum-diff.js 의 revise)
 *     'R|라벨|과목|id,id'      독립 검토만                  (curriculum-diff.js 의 review, 이미 쓴 단원 점검)
 * 차례·주의: docs/CURRICULUM-REVISION.md, docs/PROGRESS.md(내용 작성 방법). 워크플로는 한 번에 하나만 돌린다(세션 한도).
 */
export const meta = {
  name: 'tutor-content-write-review',
  description: '빠진 단원 작성 → 독립 검토자가 정답 가리고 다시 풀기·사실·인용·애매함 검토 후 직접 고침 (검토만 하는 작업도 받음)',
  phases: [
    { title: 'Write', detail: '단원 2~4개씩 작성·lint·직접 풀기' },
    { title: 'Review', detail: '다른 사람이 정답 가리고 다시 풀고, 사실·인용·하나뿐인 정답·학년 눈높이 검토 → 고침' },
  ],
}

// 프로젝트 폴더: args.root (예: 'D:/11. AI 작업실/작업10(가정교사)'). Git Bash 경로는 드라이브 글자를 /d/ 꼴로 바꾼다
const ROOT = String((args && args.root) || 'D:/11. AI 작업실/작업10(가정교사)').split('\\').join('/').replace(/\/$/, '')
const BROOT = ROOT.replace(/^([A-Za-z]):/, (m, d) => '/' + d.toLowerCase())
const SUBJ = {
  math: ['수학', '생성기(gens)를 단원마다 2~4개 — 핵심 기술마다(기본 level 1, 실력 level 2, 되면 심화 level 3). 문제은행에는 생성기로 만들기 어려운 개념·문장제·그림 문제. 도형·측정·그래프는 fig 를 적극적으로. 생성기의 오답 후보는 넉넉히, 경계 값(직각 90°, 같은 수 등)에서 "틀린 답"이 정답과 같아지지 않게.',
    '계산을 모두 다시 한다(해설의 중간 계산까지). 생성기는 --seeds 30 으로 견본을 더 뽑아 경계 값에서 틀린 문제·정답이 둘인 보기·0 으로 나누기가 없는지 본다. 그림의 수치·눈금이 문제 글과 맞는지, 단위가 맞는지.'],
  kor: ['국어', '문학 인용은 저작권이 끝난 작품(1962년 이전 사망 작가·고전 문학)만, 확신이 없으면 직접 쓴 글로(CONTENT-GUIDE §7 국어). 쓰기·말하기는 "더 알맞은 문장 고르기" 꼴. 맞춤법·문법은 현행 규정. 초1~2 는 한글 깨치기 수준의 아주 쉬운 말.',
    '맞춤법·띄어쓰기·표준 발음·문법 용어를 현행 규정대로 하나하나 확인한다. 문학 인용은 원문과 한 글자도 다르면 안 된다 — 원문이 확실하지 않으면 인용을 빼고 내용 요약·직접 쓴 글로 바꾼다. 작가·작품 정보(연도·갈래·출전)도 확인한다.'],
  eng: ['영어', 'vocab 8~20개(초3~4 과정은 6개 이상) — w·m·ex·exm. 문법 설명은 한국어, 예문·지문은 직접 쓴 영어. 낱말 배열(order)에 같은 낱말 두 번 금지. short text 정답은 허용 표기(축약형 등)를 모두. 빈칸 선은 ___ (밑줄 세 개 이상)로 써도 된다. R.josa 는 영어 낱말에 맞지 않으니 영어 뒤에는 조사를 붙이지 않는 꼴로.',
    '영어 문장이 문법적으로 맞고 자연스러운지, 한국어 뜻풀이가 맞는지, 정답으로 받아야 할 다른 표현(축약형·대소문자·마침표 유무·같은 뜻의 다른 낱말)이 빠지지 않았는지. 빈칸에 들어갈 답이 하나뿐인지. vocab 의 뜻·예문.'],
  soc: ['사회', '정치적 중립·교육과정 서술 수준. 통계·자료 해석은 bars/line/pie 그림 + 가상의 수치임을 밝힌다. 실존 인물(역사 인물 제외)·상표·상호를 예로 쓰지 않는다.',
    '개념 정의·제도·법 조항·지리 사실(위치·기후·인구 경향)·연도가 정확한지. 가상 수치는 가상이라고 밝혔는지. 정치적으로 한쪽에 치우친 서술·단정이 없는지.'],
  hist: ['역사', '연도·인물·사건은 교과서 수준에서 정확히(불확실하면 쓰지 않는다). 사건 순서(order) 문제, 원인·결과·의미를 묻는 choice. 논쟁적 사안은 교육과정 서술을 넘지 않는다.',
    '연도·왕·인물·사건·순서·원인과 결과를 하나하나 확인한다. 순서 문제의 정답 순서가 실제 역사와 맞는지. 학계에서 갈리는 내용을 단정하지 않는지.'],
  sci: ['과학', '계산 단원(속력·밀도·용해도·전류·전압·저항·일·에너지·농도 등)은 생성기를 권장. 오개념은 faq·mistakes 로 바로잡기. 실험은 집에서 안전한 것만, 불·약품·전기는 어른과 함께. 단위는 SI.',
    '과학 개념·법칙·수치(물리 상수·단위 환산)·화학식·생물 구조가 정확한지, 계산 문제는 다시 계산. 오개념을 오히려 심는 설명이 없는지. 실험 안전 문구.'],
  life: ['통합교과', '초1~2: 아주 쉬운 말·짧은 문장, choice(보기 3개)·ox 위주, practice 8개 안팎, 생활 습관·안전·계절·우리나라·이웃·자연.',
    '1~2학년이 읽을 수 있는 낱말·문장 길이인지, 안전 수칙이 정확한지, 정답이 하나로 분명한지.'],
}

// 'kor-h-lit#1|kor|id1,id2' = 작성 → 검토,  'R|라벨|과목|id1,id2' = 검토만
function parse(s) {
  const p = s.split('|')
  if (p[0] === 'R') return { mode: 'review', job: p[1], subject: p[2], ids: p[3].split(',') }
  if (p[0] === 'V') return { mode: 'revise', job: p[1], subject: p[2], ids: p[3].split(',') }
  return { mode: 'write', job: p[0], subject: p[1], ids: p[2].split(',') }
}

const WRITE = (j) => {
  const sj = SUBJ[j.subject] || [j.subject, '', '']
  return [
    '당신은 "가정교사"(초등~성인이 혼자 공부하는 무료 학습 사이트 — AI 없음, 아이들이 실제로 쓴다)의 ' + sj[0] + ' 내용 작성자다. 경험 많은 ' + sj[0] + ' 교사처럼 정확하고 친절하게 쓴다.',
    '프로젝트 폴더(절대경로): ' + ROOT + '  (Git Bash: ' + BROOT + '). 명령은 Bash 도구로(PowerShell 은 막혀 있다). Bash 명령은 cd "' + BROOT + '" && … 로 시작한다.',
    SCRATCH(j, 'write'),
    '',
    '## 먼저 읽기 (빠짐없이)',
    '1. AGENTS.md — 특히 규칙 3(정확성·안전·저작권), 규칙 6·7(비밀정보·개인정보: 예시 연락처는 hong@example.com·010-0000-0000 같은 더미만, 실존 인물·실명 금지)',
    '2. docs/CONTENT-GUIDE.md — 전부 (§1.5 가정교사 흐름, §4 채점 함정, §5 백슬래시·조사, §6 생성기, §7 과목별 안내, §8 점검표)',
    '3. docs/ARCHITECTURE.md §2.3(R·R.josa), §3(서식 글·TeX), §4(그림), §7(데이터 형식, §7.4 가정교사 흐름)',
    '4. 견본 단원 data/units/math-e4-07.js — 과목이 달라도 칸 쓰는 법(check·concept·why·wrong·생성기·조사)의 기준',
    '',
    '## 맡은 일: 단원 ' + j.ids.length + '개 — ' + j.ids.join(', '),
    '맥락(과정·전체 차례·topics·성취기준·앞뒤 과정·말투)을 먼저 본다:  node scripts/job-context.js ' + j.ids.join(','),
    '같은 과정의 이미 완성된 단원(data/units/<과정id>-*.js)이 있으면 하나를 훑어 말투·분량을 맞춘다.',
    '단원마다 data/units/<단원id>.js 하나를 쓴다 (CONTENT-GUIDE §3 틀, 견본과 같은 칸 구성).',
    '- title 은 지도의 단원 제목 그대로. topics 를 빠짐없이 다룬다(개념 카드·문제에 고루). 앞 과정 내용은 써도 되고, 다음 과정 내용은 풀이에 쓰지 않는다.',
    '- 개념 카드마다 이해 확인 check, 모든 문제에 concept, choice 에 why, short 에 자주 나오는 틀린 답 wrong. easy 는 기초 학생이 처음 읽는 다른 길의 설명.',
    '- ' + sj[1],
    NOTE(j) ? '- 이번 단원들의 당부: ' + NOTE(j) : '',
    '- 앞 물결에서 나온 실수(되풀이하지 않는다): 문학·노랫말 인용을 기억에 기대어 옮겨 원문과 달라짐 → 원문이 확실하지 않으면 인용하지 말고 요약. 영어 낱말·수식 바로 뒤의 조사(2021는·this morning는) → 조사 없는 꼴이나 R.josa. 표 칸 안의 <br> 은 글자로 보인다. 정답 보기가 늘 가장 긴 보기. fixed 로 보기 순서를 고정해 정답이 늘 같은 자리.',
    '- tmp/partial-units/<단원id>.js 가 있으면 전에 쓰다 끊긴 초안이다 — 참고해서 완성본을 data/units/ 에 새로 쓴다(초안은 그대로 둔다).',
    '- 파일이 길면 Write 로 앞부분을 쓰고 Edit 로 이어 붙인다 — 한 번의 응답에 너무 긴 출력을 만들지 않는다.',
    '',
    '## 단원 하나를 쓸 때마다 (반드시)',
    '1. node scripts/lint-unit.js <단원id>  → 오류 0. 경고(조사·why·concept 등)도 고친다.',
    '2. node scripts/print-unit.js --unit <단원id> --hide-answers --seeds 6 → 정답을 가린 채 이해 확인·문제·생성기 견본을 직접 풀고, --hide-answers 없이 다시 뽑아 비교. 다르면 누가 맞는지 따져 고친다.',
    '하지 않는 것: 다른 단원 파일·js/·scripts/·docs/·curriculum/·data/catalog.js·data/index/ 고치기, npx playwright test 실행(사용자 PC 부하), 커밋.',
    '',
    '## 최종 응답 (오케스트레이터가 읽는다, 짧게)',
    '단원별 한 줄: id · 개념 n(이해 확인 n) · 문제 · 심화 · 생성기 · vocab · lint 오류/경고 수(그대로). 직접 풀어 고친 것. 확신이 없는 내용(나중에 검토할 곳).',
  ].join('\n')
}

// 여러 작성자·검토자가 같은 scratchpad 를 함께 쓴다 — 보조 파일 이름이 겹치면 서로 덮어쓴다(물결 B4 에서 실제로 겪음)
const SCRATCH = (j, role) => '보조 스크립트·임시 파일은 scratchpad 안의 **자기 폴더** ' + role + '-' + String(j.job).replace(/[^A-Za-z0-9]+/g, '-') + '/ 에만 만든다(다른 작성자·검토자와 같은 scratchpad 를 함께 쓰므로 같은 파일 이름을 쓰면 서로 덮어쓴다).'
// 물결마다 과목별로 덧붙이는 당부(args.notes = { 과목: '…' }) — 작성자·검토자 모두에게
const NOTE = (j) => (args && args.notes && typeof args.notes[j.subject] === 'string') ? args.notes[j.subject] : ''

// 교육과정 개정: 이미 있는 단원을 새 지도(성취기준·topics)에 맞게 고쳐 쓴다
const REVISE = (j) => {
  const sj = SUBJ[j.subject] || [j.subject, '', '']
  return [
    '당신은 "가정교사"(초등~성인이 혼자 공부하는 무료 학습 사이트 — AI 없음, 아이들이 실제로 쓴다)의 ' + sj[0] + ' 내용 작성자다. **교육과정이 개정되어** 아래 단원의 성취기준·내용 요소가 바뀌었다. 기존 단원을 새 교육과정에 맞게 고쳐 쓴다.',
    '프로젝트 폴더(절대경로): ' + ROOT + '  (Git Bash: ' + BROOT + '). 명령은 Bash 도구로. Bash 명령은 cd "' + BROOT + '" && … 로 시작한다.',
    SCRATCH(j, 'revise'),
    '',
    '## 먼저 읽기: AGENTS.md 규칙 3, docs/CONTENT-GUIDE.md 전부, docs/CURRICULUM-REVISION.md, 견본 data/units/math-e4-07.js',
    '## 맡은 단원: ' + j.ids.join(', '),
    '새 지도(이미 curriculum/ 에 적용됨)의 맥락: node scripts/job-context.js ' + j.ids.join(','),
    '바뀐 점: curriculum/history/<옛 판>/ 의 같은 단원과 견주거나 node scripts/curriculum-diff.js 보고서(docs/revisions/)를 본다.',
    '',
    '## 고쳐 쓰기 규칙',
    '- 단원 파일의 standards 를 새 지도와 **똑같이** 바꾼다 — 그래야 화면의 "개정 반영 중" 표시가 저절로 사라진다(build-catalog 가 견준다).',
    '- 새로 들어온 내용 요소(topics)는 개념 카드·문제를 더해 다루고, 빠진 내용은 고쳐 쓰거나 줄인다. title 은 지도 그대로.',
    '- 문제 id 는 지우지 말고 고쳐 쓴다(학생 기록·오답노트가 id 로 기억한다). 새 문제는 새 id. 개념 카드는 뒤에 더한다.',
    '- 나머지는 새로 쓸 때와 같다: ' + sj[1],
    '- 단원마다: node scripts/lint-unit.js <id> → 오류 0 · 경고 0 (성취기준 경고가 없어야 한다), print-unit --hide-answers 로 직접 풀고 맞춰 보기.',
    '하지 않는 것: 다른 단원·js/·scripts/·docs/·curriculum/·data/catalog.js·data/index/ 고치기, npx playwright test, 커밋.',
    '',
    '## 최종 응답(짧게): 단원별 무엇을 바꿨는지(성취기준·더한 카드·고친 문제), lint 결과, 확신이 없는 곳.',
  ].join('\n')
}

const REVIEW = (j, writerNote) => {
  const sj = SUBJ[j.subject] || [j.subject, '', '']
  return [
    '당신은 "가정교사"(초등~성인이 혼자 공부하는 무료 학습 사이트 — AI 없음, 아이들이 실제로 쓴다)의 ' + sj[0] + ' **독립 검토자**다. 다른 사람이 쓴 단원을 경험 많은 ' + sj[0] + ' 교사이자 꼼꼼한 편집자로서 검토하고, 틀린 곳은 직접 고친다.',
    '목표: 아이가 틀린 정답·정답이 둘인 문제·틀린 설명·원문과 다른 인용을 만나지 않게 하는 것. 작성자가 "맞다"고 한 것도 믿지 말고 스스로 확인한다.',
    '프로젝트 폴더(절대경로): ' + ROOT + '  (Git Bash: ' + BROOT + '). 명령은 Bash 도구로(PowerShell 은 막혀 있다). Bash 명령은 cd "' + BROOT + '" && … 로 시작한다.',
    SCRATCH(j, 'review'),
    '',
    '## 먼저 읽기',
    '1. AGENTS.md 규칙 3(정확성·안전·저작권)·6·7',
    '2. docs/CONTENT-GUIDE.md §1.5(가정교사 흐름), §2(말투·눈높이), §4(채점 함정), §5(백슬래시·조사), §6(생성기), §7(' + sj[0] + '), §8(검증자 점검표 — 빠짐없이 따른다)',
    '3. docs/ARCHITECTURE.md §7(데이터 형식) — 칸 이름 확인용',
    '',
    '## 맡은 단원 ' + j.ids.length + '개: ' + j.ids.join(', '),
    '맥락(과정·학년·topics·성취기준·말투): node scripts/job-context.js ' + j.ids.join(','),
    writerNote ? '작성자가 남긴 말(참고만 — "확신이 없는 곳"은 특히 확인):\n' + String(writerNote).slice(0, 3000) : '',
    '',
    '## 단원마다 (하나도 빼지 않고)',
    '1. 정답 가리고 풀기: node scripts/print-unit.js --unit <id> --hide-answers --seeds 8',
    '   이해 확인·예제·문제(practice·advanced)·생성기 견본을 모두 먼저 스스로 풀어 답을 적어 둔다.',
    '2. 맞춰 보기: node scripts/print-unit.js --unit <id> --seeds 8 — 내 답과 단원의 정답이 다르면 누가 맞는지 끝까지 따진다. 단원이 틀렸으면 고친다(정답·보기·해설·why·wrong 이 서로 맞게).',
    '   생성기 견본이 틀리면 생성기 코드(make)를 고친다.',
    '3. 정답은 하나: choice 는 정답이 딱 하나(다른 보기도 맞게 읽히면 고친다). short 는 아이가 맞게 쓸 만한 다른 꼴(띄어쓰기·단위·동의어·분수/소수·축약형)도 정답으로 받는지 — §4 대로 answer 를 배열로 늘리거나 check 를 고친다. ox 는 참·거짓이 분명해야 한다. order 는 순서가 하나로 정해져야 한다.',
    '4. 사실: 정의·공식·단위·연도·인물·사건·지명·과학 사실·문법 규칙·맞춤법을 하나하나 확인한다. 확신이 없는 사실은 확실한 서술로 바꾸거나 지운다(지어내지 않는다).',
    '5. ' + sj[0] + ' 검토 중점: ' + sj[2] + (NOTE(j) ? '\n   이번 단원들의 당부(작성자에게 준 것 — 지켜졌는지 확인): ' + NOTE(j) : ''),
    '6. 가정교사 흐름: 이해 확인이 그 카드 내용만으로 풀리는지, 문제의 concept 번호가 맞는 카드를 가리키는지, why·wrong 이 그 오답을 실제로 설명하는지, easy 가 정말 더 쉬운 말인지, 해설이 단계별로 이해되는지.',
    '7. 눈높이·안전: 그 학년이 모르는 낱말·방법을 풀이에 쓰지 않는지, 말투가 job-context 안내와 맞는지, 위험한 실험·실존 인물(역사 인물 제외)·실명·연락처·상처가 될 말이 없는지.',
    '8. 고친 뒤마다: node scripts/lint-unit.js <id> → 오류 0(경고도 되도록 0), 고친 곳을 print-unit 으로 다시 확인.',
    '',
    '## 지킬 것',
    '- 고칠 것만 고친다(단원을 새로 쓰지 않는다). 문제 id·개념 카드 순서는 바꾸지 않는다(학생 기록·오답노트가 id 로 기억한다). 문제를 지우지 말고 고쳐 쓴다.',
    '- 맡은 단원 파일만 고친다. js/·scripts/·docs/·curriculum/·data/catalog.js·data/index/ 는 고치지 않는다. npx playwright test 를 돌리지 않는다(사용자 PC 부하). 커밋하지 않는다.',
    '- 파일은 Edit 도구로 고친다(셸 sed·node -e 로 고치면 백슬래시·따옴표가 깨진다).',
    '',
    '## 최종 응답 (구조화 출력)',
    '단원마다 id, 스스로 푼 문항 수(solved), 고친 것(fixed — 한 줄에 하나: 무엇이 왜 틀렸고 어떻게 고쳤는지), 남은 의문(doubts — 확인하지 못한 사실 등), lint 결과(예: "오류 0 · 경고 0"). summary 는 두세 문장.',
  ].filter((x) => x !== '').join('\n')
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    units: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          solved: { type: 'integer' },
          fixed: { type: 'array', items: { type: 'string' } },
          doubts: { type: 'array', items: { type: 'string' } },
          lint: { type: 'string' },
        },
        required: ['id', 'solved', 'fixed', 'doubts', 'lint'],
      },
    },
    summary: { type: 'string' },
  },
  required: ['units', 'summary'],
}

const jobs = (args && args.jobs ? args.jobs : []).map(parse)
const nW = jobs.filter((j) => j.mode !== 'review').length
log((args && args.tag ? args.tag + ': ' : '') + '작성·고쳐 쓰기+검토 ' + nW + '작업, 검토만 ' + (jobs.length - nW) + '작업, 단원 ' + jobs.reduce((s, j) => s + j.ids.length, 0) + '개')

// 검토만 하는 작업은 1단계에서 빈 글('')을 넘긴다 — null 을 넘기면 pipeline 이 그 항목을 건너뛴다(검토도 안 돈다)
const results = await pipeline(
  jobs,
  (j) => j.mode === 'write'
    ? agent(WRITE(j), { label: '작성 ' + j.job, phase: 'Write', effort: 'high' }).then((w) => w || '(작성자 응답 없음)')
    : j.mode === 'revise'
      ? agent(REVISE(j), { label: '고쳐 쓰기 ' + j.job, phase: 'Write', effort: 'high' }).then((w) => w || '(작성자 응답 없음)')
      : Promise.resolve(''),
  (w, j) => agent(REVIEW(j, w), { label: '검토 ' + j.job, phase: 'Review', effort: 'high', schema: REVIEW_SCHEMA })
    .then((r) => ({ job: j.job, mode: j.mode, ids: j.ids, write: w, review: r })),
)
const ok = results.filter(Boolean)
const fixedN = ok.reduce((s, r) => s + ((r.review && r.review.units) || []).reduce((t, u) => t + (u.fixed || []).length, 0), 0)
log('끝: ' + ok.length + '/' + jobs.length + '작업, 검토자가 고친 곳 ' + fixedN + '개')
return results
