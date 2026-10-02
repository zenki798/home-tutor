/* 테스트용 질문 검색 색인 · 과학 · 중학교 (가까운 학교급에서 찾기 확인용) */
Tutor.registerIndex('sci-mid', [
  { id: 'sci-m1-01', kind: 'unit', subject: 'sci', course: 'sci-m1', unit: 'sci-m1-01', grade: 'm1',
    title: '기체의 성질', text: '기체의 압력과 부피, 온도와 부피 사이의 관계를 알아봐요.',
    keywords: ['기체', '압력', '부피'], ref: { tab: 'concepts', idx: 0 } },
  { id: 'sci-m1-01#c0', kind: 'concept', subject: 'sci', course: 'sci-m1', unit: 'sci-m1-01', grade: 'm1',
    title: '보일 법칙', text: '온도가 일정할 때 기체에 가하는 압력이 커지면 기체의 부피는 작아져요. 압력과 부피를 곱한 값은 일정해요.',
    keywords: ['보일', '보일 법칙', '압력', '부피'], ref: { tab: 'concepts', idx: 0 } },
  { id: 'sci-m1-01#t0', kind: 'term', subject: 'sci', course: 'sci-m1', unit: 'sci-m1-01', grade: 'm1',
    title: '압력', text: '일정한 넓이에 수직으로 작용하는 힘이에요.',
    keywords: ['압력'], ref: { tab: 'terms', idx: 0 } },
]);
