const { test, expect } = require('@playwright/test');
const path = require('path');

/*
 * js/core.js (Tutor) — 브라우저 없이 검사한다.
 * 카탈로그 찾기, 저장소(막혀도 죽지 않기), 스크립트 지연 로딩(같은 src 한 번만, 실패하면 다시 시도 가능)
 */

const CORE = path.resolve(__dirname, '..', '..', 'js', 'core.js');

/* 매번 새로 싣는다. root 를 바꿔 끼우려면 global.self 를 잠깐 둔다(UMD 가 self 를 root 로 쓴다). */
function freshTutor(fakeRoot) {
  delete require.cache[CORE];
  if (fakeRoot) global.self = fakeRoot;
  try {
    return require(CORE);
  } finally {
    if (fakeRoot) delete global.self;
  }
}

const CATALOG = {
  version: 1,
  levels: [
    { id: 'elem', name: '초등학교', short: '초등', grades: [{ id: 'e5', name: '5학년' }] },
    { id: 'mid', name: '중학교', short: '중등', grades: [{ id: 'm1', name: '1학년' }, { id: 'm2', name: '2학년' }] },
  ],
  subjects: [
    { id: 'math', name: '수학', teacher: '수학 선생님', icon: '📐' },
    { id: 'eng', name: '영어', teacher: '영어 선생님', icon: '🔤' },
  ],
  courses: [
    { id: 'math-m2', subject: 'math', level: 'mid', grades: ['m2'], title: '중학교 수학 2',
      units: [{ id: 'math-m2-01', title: '일차부등식' }, { id: 'math-m2-02', title: '연립일차방정식' }] },
    { id: 'eng-m', subject: 'eng', level: 'mid', grades: ['m1', 'm2'], title: '중학교 영어',
      units: [{ id: 'eng-m-01', title: '현재완료' }] },
  ],
};

/* 가짜 localStorage (Map 기반) */
function fakeStorage() {
  const map = new Map();
  return {
    map,
    get length() { return map.size; },
    key: (i) => { const k = Array.from(map.keys())[i]; return k === undefined ? null : k; },
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)); },
    removeItem: (k) => { map.delete(k); },
  };
}

test.describe('카탈로그', () => {
  test('등록하면 id 로 학교급·과목·과정·단원을 찾는다', () => {
    const Tutor = freshTutor();
    expect(Tutor.catalog).toBeNull();
    expect(Tutor.level('mid')).toBeNull();
    Tutor.registerCatalog(CATALOG);
    expect(Tutor.catalog).toBe(CATALOG);
    expect(Tutor.level('mid').name).toBe('중학교');
    expect(Tutor.subject('eng').teacher).toBe('영어 선생님');
    expect(Tutor.course('math-m2').title).toBe('중학교 수학 2');
    expect(Tutor.course('없는과정')).toBeNull();
    expect(Tutor.level('toString')).toBeNull(); // 객체 기본 속성 이름에 속지 않는다

    const meta = Tutor.unitMeta('math-m2-02');
    expect(meta.course.id).toBe('math-m2');
    expect(meta.unit.title).toBe('연립일차방정식');
    expect(meta.index).toBe(1);
    expect(Tutor.unitMeta('nope')).toBeNull();
  });

  test('coursesFor: 그 학년이 보는 과정 (과목으로 거르기)', () => {
    const Tutor = freshTutor();
    Tutor.registerCatalog(CATALOG);
    expect(Tutor.coursesFor('m2').map((c) => c.id)).toEqual(['math-m2', 'eng-m']);
    expect(Tutor.coursesFor('m1').map((c) => c.id)).toEqual(['eng-m']);
    expect(Tutor.coursesFor('m2', 'eng').map((c) => c.id)).toEqual(['eng-m']);
    expect(Tutor.coursesFor('e5')).toEqual([]);
  });

  test('카탈로그를 다시 등록하면 찾기 표도 새로 만든다', () => {
    const Tutor = freshTutor();
    Tutor.registerCatalog(CATALOG);
    expect(Tutor.course('math-m2')).not.toBeNull();
    Tutor.registerCatalog({ levels: [], subjects: [], courses: [{ id: 'sci-e5', subject: 'sci', grades: ['e5'], units: [] }] });
    expect(Tutor.course('math-m2')).toBeNull();
    expect(Tutor.course('sci-e5')).not.toBeNull();
    expect(Tutor.coursesFor('e5').length).toBe(1);
  });

  test('카탈로그가 없어도 찾기 함수는 죽지 않는다', () => {
    const Tutor = freshTutor();
    expect(Tutor.coursesFor('m2')).toEqual([]);
    expect(Tutor.unitMeta('math-m2-01')).toBeNull();
    expect(Tutor.subject('math')).toBeNull();
  });

  test('단원·색인 등록', () => {
    const Tutor = freshTutor();
    Tutor.registerUnit({ id: 'math-m2-01', title: '일차부등식' });
    Tutor.registerUnit(null); // 무시
    Tutor.registerUnit({ title: 'id 없음' }); // 무시
    expect(Object.keys(Tutor.units)).toEqual(['math-m2-01']);
    Tutor.registerIndex('math', [{ id: 'a' }]);
    Tutor.registerIndex('eng', 'not-array');
    expect(Tutor.indexes.math).toEqual([{ id: 'a' }]);
    expect(Tutor.indexes.eng).toEqual([]);
  });
});

test.describe('저장소 Tutor.store', () => {
  test('localStorage 가 없으면(node) 메모리에서 JSON 으로 동작한다', () => {
    const Tutor = freshTutor();
    const s = Tutor.store;
    expect(s.get('x')).toBeNull();
    expect(s.get('x', [])).toEqual([]);
    s.set('profiles', [{ id: 'p1', name: '테스트사용자' }]);
    expect(s.get('profiles')).toEqual([{ id: 'p1', name: '테스트사용자' }]);
    // 꺼낸 값을 고쳐도 저장된 값은 그대로 (사본)
    s.get('profiles')[0].name = '바뀜';
    expect(s.get('profiles')[0].name).toBe('테스트사용자');
    s.set('current', 'p1');
    expect(s.keys().sort()).toEqual(['current', 'profiles']);
    s.remove('current');
    expect(s.get('current', 'none')).toBe('none');
    expect(s.keys()).toEqual(['profiles']);
  });

  test('localStorage 에 tutor. 접두어로 저장하고, 다른 키는 keys() 에 섞지 않는다', () => {
    const ls = fakeStorage();
    ls.setItem('other.key', '1');
    const Tutor = freshTutor({ localStorage: ls });
    Tutor.store.set('settings', { fontScale: 2, theme: 'dark' });
    expect(ls.getItem('tutor.settings')).toBe('{"fontScale":2,"theme":"dark"}');
    expect(Tutor.store.keys()).toEqual(['settings']);

    // 새로 실어도(다시 열기) 저장된 값을 읽는다
    const again = freshTutor({ localStorage: ls });
    expect(again.store.get('settings')).toEqual({ fontScale: 2, theme: 'dark' });
    again.store.remove('settings');
    expect(ls.getItem('tutor.settings')).toBeNull();
  });

  test('깨진 JSON 은 fallback 을 돌려준다', () => {
    const ls = fakeStorage();
    ls.setItem('tutor.bad', '{not json');
    const Tutor = freshTutor({ localStorage: ls });
    expect(Tutor.store.get('bad', 'fb')).toBe('fb');
  });

  test('localStorage 가 접근만 해도 예외를 던지면 메모리로 조용히 계속한다', () => {
    const root = {};
    Object.defineProperty(root, 'localStorage', { get() { throw new Error('blocked'); } });
    const Tutor = freshTutor(root);
    expect(() => Tutor.store.set('a', 1)).not.toThrow();
    expect(Tutor.store.get('a')).toBe(1);
    expect(Tutor.store.keys()).toEqual(['a']);
    expect(() => Tutor.store.remove('a')).not.toThrow();
    expect(Tutor.store.get('a', 0)).toBe(0);
  });

  test('setItem 이 실패해도(가득 참) 이 세션 안에서는 값이 이어진다', () => {
    const ls = fakeStorage();
    ls.setItem = () => { throw new Error('QuotaExceededError'); };
    const Tutor = freshTutor({ localStorage: ls });
    expect(Tutor.store.set('notes', [1, 2])).toBe(false);
    expect(Tutor.store.get('notes')).toEqual([1, 2]);
  });
});

test.describe('스크립트 지연 로딩', () => {
  /* <script> 를 흉내 내는 가짜 문서. appendChild 하면 src 별 동작(성공·실패·무응답)을 흉내 낸다. */
  function fakeDocument(behave) {
    const added = [];
    const head = {
      appendChild(el) {
        added.push(el);
        el.parentNode = head;
        const how = behave(el.src, added.filter((e) => e.src === el.src).length);
        if (typeof how === 'function') setTimeout(() => { how(); el.onload && el.onload(); }, 0);
        else if (how === 'error') setTimeout(() => el.onerror && el.onerror(), 0);
        return el;
      },
      removeChild(el) { el.parentNode = null; },
    };
    return { added, head, createElement: () => ({}) };
  }

  test('loadUnit: 단원 파일을 싣고 등록된 단원을 돌려준다. 같은 단원은 다시 싣지 않는다', async () => {
    let Tutor;
    const doc = fakeDocument((src) => () => Tutor.registerUnit({ id: src.replace(/^.*\/|\.js$/g, ''), title: 'T' }));
    Tutor = freshTutor({ document: doc });
    const [a, b] = await Promise.all([Tutor.loadUnit('math-m2-01'), Tutor.loadUnit('math-m2-01')]);
    expect(a).toBe(b);
    expect(a.id).toBe('math-m2-01');
    expect(doc.added.map((e) => e.src)).toEqual(['data/units/math-m2-01.js']);
    await Tutor.loadUnit('math-m2-01');
    expect(doc.added.length).toBe(1);
  });

  test('실패하면 reject 하고, 다시 부르면 새로 시도한다 (다시 시도 버튼)', async () => {
    let Tutor;
    const doc = fakeDocument((src, nth) => (nth === 1 ? 'error' : () => Tutor.registerUnit({ id: 'sci-e5-01' })));
    Tutor = freshTutor({ document: doc });
    await expect(Tutor.loadUnit('sci-e5-01')).rejects.toThrow('불러오지 못했습니다');
    expect(doc.added[0].parentNode).toBeNull(); // 실패한 태그는 치운다
    const u = await Tutor.loadUnit('sci-e5-01');
    expect(u.id).toBe('sci-e5-01');
    expect(doc.added.length).toBe(2);
  });

  test('파일은 실렸는데 단원이 등록되지 않으면 reject', async () => {
    const doc = fakeDocument(() => () => {});
    const Tutor = freshTutor({ document: doc });
    await expect(Tutor.loadUnit('eng-m-01')).rejects.toThrow('내용이 없습니다');
  });

  test('경로를 벗어나는 이름은 싣지 않는다', async () => {
    const doc = fakeDocument(() => 'none');
    const Tutor = freshTutor({ document: doc });
    await expect(Tutor.loadUnit('../secret')).rejects.toThrow('올바르지 않습니다');
    await expect(Tutor.loadIndex('a/b')).rejects.toThrow('올바르지 않습니다');
    expect(doc.added.length).toBe(0);
  });

  test('loadIndex: 색인 파일을 싣고 항목 배열을 돌려준다', async () => {
    let Tutor;
    const doc = fakeDocument((src) => () => Tutor.registerIndex('math', [{ id: 'x', title: '부등식' }]));
    Tutor = freshTutor({ document: doc });
    const entries = await Tutor.loadIndex('math');
    expect(entries).toEqual([{ id: 'x', title: '부등식' }]);
    expect(doc.added[0].src).toBe('data/index/math.js');
  });

  test('문서가 없으면(node) loadScript 는 reject 한다', async () => {
    const Tutor = freshTutor();
    await expect(Tutor.loadScript('data/units/x.js')).rejects.toThrow();
  });
});
