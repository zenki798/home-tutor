/* 테스트용 질문 검색 색인 · 과학 */
Tutor.registerIndex('sci', [
  { id: 'sci-e5-01', kind: 'unit', subject: 'sci', course: 'sci-e5', unit: 'sci-e5-01', grade: 'e5',
    title: '물질의 용해', text: '물질이 물에 녹는 현상과 용액을 알아봐요.',
    keywords: ['용해', '용액', '녹다'], ref: { tab: 'concepts', idx: 0 } },
  { id: 'sci-e5-01#c0', kind: 'concept', subject: 'sci', course: 'sci-e5', unit: 'sci-e5-01', grade: 'e5',
    title: '용해와 용액', text: '설탕이 물에 골고루 섞이는 것을 용해라고 해요. 용질은 녹는 물질, 용매는 녹이는 물질, 용액은 용질이 용매에 골고루 섞인 것이에요.',
    keywords: ['용해', '용질', '용매', '용액'], ref: { tab: 'concepts', idx: 0 } },
  { id: 'sci-e5-01#t2', kind: 'term', subject: 'sci', course: 'sci-e5', unit: 'sci-e5-01', grade: 'e5',
    title: '용매', text: '녹이는 물질이에요. 설탕물에서는 물이에요.',
    keywords: ['용매'], ref: { tab: 'terms', idx: 2 } },
  { id: 'sci-e5-01#f0', kind: 'faq', subject: 'sci', course: 'sci-e5', unit: 'sci-e5-01', grade: 'e5',
    title: '설탕이 물에 녹으면 없어진 거예요?', text: '아니요. 설탕은 아주 작게 나뉘어 물속에 골고루 퍼져 있어요. 그래서 물이 달고, 무게도 그대로예요.',
    keywords: ['설탕', '녹다', '없어지다'], ref: { tab: 'faq', idx: 0 } },
]);
