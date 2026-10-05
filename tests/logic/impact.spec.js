const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

/*
 * 교육과정 변경이 이 학생에게 닿는가 — js/impact.js (기기 안에서만 계산, 이름·학년·기록은 밖으로 보내지 않는다)
 *   학년도는 3월 1일에 시작한다. 지금 학년에서 해마다 한 학년씩 올라간다고 보고, 고시 부칙의 학년별 시행일과 견준다.
 *   시험 학생은 지어낸 이름(민수·지아)만 쓴다.
 */
const ROOT = path.join(__dirname, '..', '..');
const FILE = path.join(ROOT, 'js', 'impact.js');
const I = require(FILE);

const NOTICES = [
  { // 사회과: 성취기준 2개 자동 반영 — 초3~4·중1·고1 은 2025년, 초5~6·중2·고2 는 2026년, 중3·고3 은 2027년부터
    id: 'nec-2024-3', no: '국가교육위원회 고시 제2024-3호', date: '2024-08-16',
    effective: [{ date: '2025-03-01', grades: ['e1', 'e2', 'e3', 'e4', 'm1', 'h1'] }, { date: '2026-03-01', grades: ['e5', 'e6', 'm2', 'h2'] }, { date: '2027-03-01', grades: ['m3', 'h3'] }],
    parts: [
      { name: '사회과', subjects: ['soc'], courses: [], except: [], status: 'applied', changes: [
        { k: 'chg', code: '[4사06-01]', from: '옛 문장이다.', to: '새 문장이다.', courses: ['soc-e4'], units: ['soc-e4-06'] },
        { k: 'add', code: '[9사01-09]', text: '새로 생긴 성취기준이다.', courses: ['soc-m-1'] },
      ] },
      { name: '영어과', subjects: ['eng'], courses: [], except: [], status: 'unchanged' },
    ],
  },
  { // 통합교과: 2028년부터 초1·2 — 자동으로 확실히 반영하지 못함
    id: 'nec-2026-1', no: '국가교육위원회 고시 제2026-1호', date: '2026-01-21',
    effective: [{ date: '2026-03-01', grades: ['h1', 'h2'] }, { date: '2027-03-01', grades: ['h3'] }, { date: '2028-03-01', grades: ['e1', 'e2'] }],
    parts: [{ name: '바른 생활, 슬기로운 생활, 건강한 생활, 즐거운 생활', subjects: ['life'], courses: [], except: [], status: 'manual' }],
  },
];
const COURSES = [
  { id: 'life-e1', subject: 'life', grades: ['e1'], title: '1학년 통합교과' },
  { id: 'life-e2', subject: 'life', grades: ['e2'], title: '2학년 통합교과' },
  { id: 'soc-e4', subject: 'soc', grades: ['e4'], title: '4학년 사회' },
  { id: 'soc-m-1', subject: 'soc', grades: ['m1'], title: '중학교 사회①' },
  { id: 'eng-e4', subject: 'eng', grades: ['e4'], title: '4학년 영어' },
];
const CAT = { notices: NOTICES, courses: COURSES };
const TODAY = '2026-10-05';

test('학년도와 학년 계산: 3월 1일 시작, 지난 학년은 null, 학교 학년이 아니면 null', () => {
  expect(I.schoolYear('2026-10-05')).toBe(2026);
  expect(I.schoolYear('2027-02-28')).toBe(2026);
  expect(I.schoolYear('2027-03-01')).toBe(2027);
  expect(I.gradeYear('e3', 'e5', TODAY)).toBe(2028);
  expect(I.gradeYear('e6', 'm1', TODAY)).toBe(2027);
  expect(I.gradeYear('m2', 'e4', TODAY)).toBeNull();
  expect(I.gradeYear('u', 'e1', TODAY)).toBeNull();
  expect(I.effectiveYear(NOTICES[0], 'm3')).toBe(2027);
  expect(I.effectiveYear(NOTICES[1], 'e3')).toBeNull();
});

test('과정별: 바뀐 교육과정으로 배우게 되는 학년만 (이미 지난 학년·시행 전 학년은 아니다)', () => {
  // 민수: 지금(2026) 초3 → 2027년 초4 에 사회(초4)를 바뀐 교육과정으로 배운다
  expect(I.forCourse(NOTICES[0], COURSES[2], 'e3', TODAY)).toEqual([{ grade: 'e4', year: 2027, now: false }]);
  // 지금 초4 → 지금 배우는 중
  expect(I.forCourse(NOTICES[0], COURSES[2], 'e4', TODAY)).toEqual([{ grade: 'e4', year: 2026, now: true }]);
  // 지금 초1 → 통합교과 초1(2026)·초2(2027)는 2028년 시행 전이라 닿지 않는다
  expect(I.forCourse(NOTICES[1], COURSES[0], 'e1', TODAY)).toEqual([]);
  expect(I.forCourse(NOTICES[1], COURSES[1], 'e1', TODAY)).toEqual([]);
});

test('학생별: 지금·앞으로 다닐 학년에 실제로 닿는 변경만, 반영됨/수동 확인 필요를 나눈다', () => {
  // 민수(초3): 사회 초4(2027)·중1(2030) 변화가 닿는다, 통합교과는 이미 지난 학년이라 아니다, 영어는 성취기준 그대로라 아니다
  const minsu = I.forStudent(CAT, 'e3', TODAY);
  expect(minsu.map((x) => [x.notice.id, x.part.name, x.status, x.when])).toEqual([
    ['nec-2024-3', '사회과', 'applied', { grade: 'e4', year: 2027, now: false }],
  ]);
  expect(minsu[0].courses.map((c) => [c.id, c.hits.map((h) => h.grade + '/' + h.year).join()])).toEqual([['soc-e4', 'e4/2027'], ['soc-m-1', 'm1/2030']]);
  expect(minsu[0].changes.map((c) => c.code)).toEqual(['[4사06-01]', '[9사01-09]']);
  // 2027년 3월이 되면 같은 변화가 "지금"이 된다(학생 학년은 기기에 저장된 대로 다시 고른다고 본다)
  expect(I.forStudent(CAT, 'e4', '2027-03-02')[0].when).toEqual({ grade: 'e4', year: 2027, now: true });
});

test('학생별: 아직 어린 학생은 통합교과 변경(2028년 초1·2)이 닿는다 — 수동 확인 필요로', () => {
  // 지아: 2026년 10월에 초1 → 초2(2027)는 시행 전, 2028년에는 초3 이라 닿지 않는다
  expect(I.forStudent(CAT, 'e1', TODAY).filter((x) => x.notice.id === 'nec-2026-1')).toEqual([]);
  // 2028년 3월에 초1 이 되는 학생(그때 기기에 초1 로 저장)
  const later = I.forStudent(CAT, 'e1', '2028-03-05').filter((x) => x.notice.id === 'nec-2026-1');
  expect(later.map((x) => [x.status, x.when])).toEqual([['manual', { grade: 'e1', year: 2028, now: true }]]);
  expect(later[0].courses.map((c) => c.id)).toEqual(['life-e1', 'life-e2']);
});

test('대학·성인·학년 없는 학생, 고시 없는 카탈로그에는 아무것도 없다', () => {
  expect(I.forStudent(CAT, 'u', TODAY)).toEqual([]);
  expect(I.forStudent(CAT, 'a', TODAY)).toEqual([]);
  expect(I.forStudent(CAT, '', TODAY)).toEqual([]);
  expect(I.forStudent({ courses: COURSES }, 'e3', TODAY)).toEqual([]);
});

test('단원별: 이 단원의 성취기준 변화와 이 학생에게 닿는 때', () => {
  const u = I.forUnit(CAT, 'soc-e4-06', COURSES[2], 'e3', TODAY);
  expect(u.map((x) => [x.change.code, x.hit])).toEqual([['[4사06-01]', { grade: 'e4', year: 2027, now: false }]]);
  expect(I.forUnit(CAT, 'soc-e4-06', COURSES[2], 'e5', TODAY)[0].hit).toBeNull(); // 이미 배운 학년
  expect(I.forUnit(CAT, 'eng-e4-01', COURSES[4], 'e3', TODAY)).toEqual([]);
});

test('UMD: 브라우저처럼 실으면 전역 TutorImpact, 네트워크·저장소를 쓰지 않는다', () => {
  const src = fs.readFileSync(FILE, 'utf8');
  const ctx = { self: {} };
  vm.runInNewContext(src, ctx);
  expect(typeof ctx.self.TutorImpact.forStudent).toBe('function');
  expect(src).not.toMatch(/fetch\(|XMLHttpRequest|localStorage|indexedDB|sendBeacon|WebSocket/);
});
