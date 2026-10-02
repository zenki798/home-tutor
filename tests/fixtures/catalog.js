/* 테스트용 가짜 카탈로그 — UI 테스트가 data/catalog.js 대신 끼워 넣는다(진짜 학습 내용과 상관없이 결정적으로 검사하려고).
   학교급 5개 · 과목 7개(과정이 있는 것은 수학·영어·과학) · 과정 3개 · 단원 4개 */
Tutor.registerCatalog({
  version: 1,
  curriculum: '2022 개정 교육과정',
  levels: [
    { id: 'elem', name: '초등학교', short: '초등', grades: [
      { id: 'e1', name: '1학년' }, { id: 'e2', name: '2학년' }, { id: 'e3', name: '3학년' },
      { id: 'e4', name: '4학년' }, { id: 'e5', name: '5학년' }, { id: 'e6', name: '6학년' },
    ] },
    { id: 'mid', name: '중학교', short: '중등', grades: [
      { id: 'm1', name: '1학년' }, { id: 'm2', name: '2학년' }, { id: 'm3', name: '3학년' },
    ] },
    { id: 'high', name: '고등학교', short: '고등', grades: [
      { id: 'h1', name: '1학년' }, { id: 'h2', name: '2학년' }, { id: 'h3', name: '3학년' },
    ] },
    { id: 'univ', name: '대학교', short: '대학', grades: [{ id: 'u', name: '교양·기초' }] },
    { id: 'adult', name: '성인', short: '성인', grades: [{ id: 'a', name: '성인' }] },
  ],
  subjects: [
    { id: 'kor', name: '국어', teacher: '국어 선생님', icon: '📖' },
    { id: 'math', name: '수학', teacher: '수학 선생님', icon: '📐' },
    { id: 'eng', name: '영어', teacher: '영어 선생님', icon: '🔤' },
    { id: 'soc', name: '사회', teacher: '사회 선생님', icon: '🌏' },
    { id: 'hist', name: '역사', teacher: '역사 선생님', icon: '🏛️' },
    { id: 'sci', name: '과학', teacher: '과학 선생님', icon: '🔬' },
    { id: 'life', name: '통합교과', teacher: '통합교과 선생님', icon: '🌱' },
  ],
  courses: [
    {
      id: 'math-m2', subject: 'math', level: 'mid', grades: ['m2'], title: '중학교 수학 2',
      note: '테스트용 과정 · 2022 개정 교육과정 중학교 1~3학년군',
      units: [
        { id: 'math-m2-01', title: '일차부등식', summary: '부등식의 뜻과 성질을 알고, 일차부등식을 풀어 해를 수직선에 나타내요.', sem: 1 },
        { id: 'math-m2-02', title: '연립일차방정식', summary: '두 일차방정식을 함께 만족하는 해를 가감법으로 구해요.', sem: 1 },
      ],
    },
    {
      id: 'eng-m', subject: 'eng', level: 'mid', grades: ['m1', 'm2', 'm3'], title: '중학교 영어',
      note: '테스트용 과정 · 중학교 1~3학년 공통',
      units: [
        { id: 'eng-m-01', title: '현재완료', summary: '과거의 일이 지금까지 이어질 때 쓰는 have + 과거분사를 배워요.' },
      ],
    },
    {
      id: 'sci-e5', subject: 'sci', level: 'elem', grades: ['e5'], title: '초등 과학 5',
      note: '테스트용 과정 · 초등학교 5~6학년군',
      units: [
        { id: 'sci-e5-01', title: '물질의 용해', summary: '물질이 물에 녹는 현상과 용액을 알아봐요.', sem: 2 },
      ],
    },
  ],
});
