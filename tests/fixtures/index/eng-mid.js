/* 테스트용 질문 검색 색인 · 영어 · 중학교 */
Tutor.registerIndex('eng-mid', [
  { id: 'eng-m-01', kind: 'unit', subject: 'eng', course: 'eng-m', unit: 'eng-m-01', grade: 'm2',
    title: '현재완료', text: '과거의 일이 지금까지 이어질 때 쓰는 have + 과거분사를 배워요.',
    keywords: ['현재완료', 'have', '과거분사'], ref: { tab: 'concepts', idx: 0 } },
  { id: 'eng-m-01#c2', kind: 'concept', subject: 'eng', course: 'eng-m', unit: 'eng-m-01', grade: 'm2',
    title: '과거와 현재완료', text: '분명한 과거 시점(yesterday, last week)과는 현재완료를 쓰지 않아요.',
    keywords: ['과거', '현재완료', '차이'], ref: { tab: 'concepts', idx: 2 } },
  { id: 'eng-m-01#f0', kind: 'faq', subject: 'eng', course: 'eng-m', unit: 'eng-m-01', grade: 'm2',
    title: '현재완료랑 과거는 뭐가 달라요?', text: '과거는 그때 있었던 일만 말해요. 현재완료는 그 일이 지금과 이어져 있다는 느낌을 더해요.',
    keywords: ['현재완료', '과거', '차이'], ref: { tab: 'faq', idx: 0 } },
]);
