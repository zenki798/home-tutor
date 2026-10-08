const { test, expect } = require('@playwright/test');
const path = require('path');
const S = require(path.join(__dirname, '..', '..', 'js', 'storage.js'));

/*
 * 학습 데이터 저장 계층 (js/storage.js, ARCHITECTURE §9)
 * - 학생별로 데이터를 완전히 나눈다, 저장은 한 번에(원자적으로), 실패해도 기존 데이터가 그대로
 * - 백업은 암호 필수(AES-GCM): 틀린 암호·바뀐 파일·엉뚱한 파일은 받지 않고, 기존 데이터를 건드리지 않는다
 * - 학생 PIN 은 해시로만 저장한다
 * 시험 학생 이름은 가상의 이름만 쓴다.
 */

// node 에는 localStorage 가 없다 — 시험용 가짜
function fakeLocalStorage(init) {
  const m = new Map(Object.entries(init || {}));
  return {
    get length() { return m.size; },
    key(i) { return Array.from(m.keys())[i] || null; },
    getItem(k) { return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { m.set(k, String(v)); },
    removeItem(k) { m.delete(k); },
    _map: m,
  };
}
function memProvider(name) {
  const p = new S.MemoryProvider();
  if (name) p.name = name;
  return p;
}
function failingProvider(base) {
  const p = base || new S.MemoryProvider();
  p.failWrites = false;
  const write = p.write.bind(p);
  p.write = (changes) => (p.failWrites ? Promise.reject(p.failError || new Error('디스크가 가득 찼어요')) : write(changes));
  return p;
}
const ITER = 100000; // 시험은 반복 횟수를 줄인다(최솟값)
const PW = ['family', '2026'].join('-'); // 시험용 가짜 암호
const BAD_PW = ['wrong', 'pass'].join('-');

async function storeWithStudents() {
  const prov = memProvider();
  const store = S.createStore({ providers: [prov], win: { localStorage: fakeLocalStorage() } });
  await store.ready();
  store.set('profiles', [
    { id: 'pa', name: '민수', avatar: '🐻', level: 'elem', grade: 'e3', pace: 'normal', created: 1 },
    { id: 'pb', name: '지아', avatar: '🐰', level: 'mid', grade: 'm1', pace: 'easy', created: 2 },
  ]);
  store.set('current', 'pa');
  store.set('settings', { fontScale: 2, theme: 'dark' });
  store.set('p.pa.progress', { 'math-e3-01': { seen: [0, 1], solved: 10, correct: 8 } });
  store.set('p.pa.notes', [{ key: 'k1', unit: 'math-e3-01', problem: { type: 'ox', q: '문제', answer: true }, cause: '분모끼리 더함' }]);
  store.set('p.pb.progress', { 'eng-m1-01': { seen: [0], solved: 3, correct: 3 } });
  store.set('p.pb.chat', { eng: [{ who: 'me', text: 'be동사가 뭐예요?' }] });
  await store.flush();
  return { store, prov };
}

test.describe('저장소: 동기 API + 모아서 저장', () => {
  test('get/set/remove/keys — 받은 값은 사본이다', async () => {
    const prov = memProvider();
    const store = S.createStore({ providers: [prov], win: {} });
    await store.ready();
    expect(store.provider).toBe('memory');
    store.set('a', { n: 1 });
    const v = store.get('a');
    v.n = 99;
    expect(store.get('a')).toEqual({ n: 1 });
    expect(store.get('없음', 7)).toBe(7);
    store.set('p.x.progress', {});
    expect(store.keys('p.x.')).toEqual(['p.x.progress']);
    store.remove('a');
    expect(store.get('a')).toBe(null);
    await store.flush();
    expect(prov.data).toEqual({ 'p.x.progress': {} });
  });

  test('저장할 수 없는 값(순환 참조)은 거절하고 죽지 않는다', async () => {
    const store = S.createStore({ providers: [memProvider()], win: {} });
    await store.ready();
    const o = {};
    o.self = o;
    expect(store.set('bad', o)).toBe(false);
    expect(store.get('bad')).toBe(null);
  });

  test('batch 는 여러 값을 한 번의 쓰기로 저장한다', async () => {
    const prov = memProvider();
    let writes = 0;
    const w = prov.write.bind(prov);
    prov.write = (c) => { writes++; return w(c); };
    const store = S.createStore({ providers: [prov], win: {} });
    await store.ready();
    store.batch((s) => { s.set('x', 1); s.set('y', 2); s.remove('x'); });
    await store.flush();
    expect(writes).toBe(1);
    expect(prov.data).toEqual({ y: 2 });
  });

  test('Provider 를 열 수 없으면 다음 Provider 로 넘어간다', async () => {
    const broken = { name: 'broken', open: () => Promise.reject(new Error('막힘')) };
    const store = S.createStore({ providers: [broken, 'memory'], win: {} });
    await store.ready();
    expect(store.provider).toBe('memory');
  });

  test('다시 열면 저장된 기록을 그대로 불러온다', async () => {
    const prov = memProvider();
    const a = S.createStore({ providers: [prov], win: {} });
    await a.ready();
    a.set('p.pa.progress', { u: { solved: 5 } });
    await a.flush();
    const b = S.createStore({ providers: [prov], win: {} });
    await b.ready();
    expect(b.get('p.pa.progress')).toEqual({ u: { solved: 5 } });
  });

  test('쓰기가 실패해도 화면은 계속되고 다음 기회에 다시 저장한다', async () => {
    const prov = failingProvider();
    const store = S.createStore({ providers: [prov], win: {} });
    await store.ready();
    prov.failWrites = true;
    store.set('p.pa.progress', { u: 1 });
    await store.flush().catch(() => {});
    expect(store.get('p.pa.progress')).toEqual({ u: 1 });
    prov.failWrites = false;
    await store.flush();
    expect(prov.data['p.pa.progress']).toEqual({ u: 1 });
  });

  test('쓰기가 실패하면 상태로 알리고(status·onStatus) 잠시 뒤 저절로 다시 저장한다 — 되면 알림을 거둔다', async () => {
    const prov = failingProvider();
    const store = S.createStore({ providers: [prov], win: {}, retryMs: 20 });
    await store.ready();
    expect(store.status()).toMatchObject({ ok: true, failing: 0, pending: 0 });
    const seen = [];
    store.onStatus((st) => seen.push(st.ok ? 'ok' : 'fail:' + st.error));
    prov.failWrites = true;
    prov.failError = Object.assign(new Error('저장 공간이 가득 찼어요'), { name: 'QuotaExceededError' });
    store.set('p.pa.progress', { u: 1 });
    await store.flush().catch(() => {});
    expect(store.status()).toMatchObject({ ok: false, failing: 1, error: 'QuotaExceededError', pending: 1 });
    expect(store.get('p.pa.progress')).toEqual({ u: 1 }); // 값은 메모리에 그대로 — 화면은 계속된다
    // 아무것도 하지 않아도 다시 쓴다(실패가 이어지면 횟수가 는다)
    await expect.poll(() => store.status().failing).toBeGreaterThan(1);
    prov.failWrites = false;
    await expect.poll(() => store.status().ok, { timeout: 5000 }).toBe(true);
    expect(prov.data['p.pa.progress']).toEqual({ u: 1 });
    expect(store.status()).toMatchObject({ ok: true, failing: 0, error: '', pending: 0 });
    expect(seen[0]).toBe('fail:QuotaExceededError');
    expect(seen[seen.length - 1]).toBe('ok');
    // 다시 되면 더는 다시 쓰지 않는다(쓸 것이 없다)
    const n = seen.length;
    await new Promise((r) => setTimeout(r, 120));
    expect(seen.length).toBe(n);
  });

  test('예전 localStorage(tutor.*) 기록을 IndexedDB 로 옮기고 지운다', async () => {
    const ls = fakeLocalStorage({ 'tutor.profiles': JSON.stringify([{ id: 'pa', grade: 'e3' }]), 'tutor.p.pa.progress': JSON.stringify({ u: { solved: 2 } }), '다른앱.x': '1' });
    const idb = memProvider('indexeddb');
    const store = S.createStore({ providers: [idb], win: { localStorage: ls } });
    await store.ready();
    expect(store.get('profiles')).toEqual([{ id: 'pa', grade: 'e3' }]);
    expect(idb.data['p.pa.progress']).toEqual({ u: { solved: 2 } });
    expect(ls.getItem('tutor.profiles')).toBe(null);
    expect(ls.getItem('다른앱.x')).toBe('1'); // 남의 값은 건드리지 않는다
  });

  test('설정(글자 크기·테마)은 화면을 그리기 전에 동기로 읽을 수 있다 — 학습 기록은 사본을 두지 않는다', async () => {
    const ls = fakeLocalStorage();
    const prov = memProvider();
    const a = S.createStore({ providers: [prov], win: { localStorage: ls } });
    await a.ready();
    a.set('settings', { fontScale: 3 });
    a.set('p.pa.progress', { secret: 1 });
    const b = S.createStore({ providers: [prov], win: { localStorage: ls } });
    expect(b.get('settings')).toEqual({ fontScale: 3 }); // ready 전
    expect(b.get('p.pa.progress')).toBe(null);
    expect(Array.from(ls._map.keys()).some((k) => k.includes('progress'))).toBe(false);
  });
});

test.describe('학생별 분리', () => {
  test('한 학생의 기록을 지워도 다른 학생 기록은 그대로', async () => {
    const { store } = await storeWithStudents();
    const n = store.removePrefix('p.pa.');
    expect(n).toBe(2);
    expect(store.keys('p.pa.')).toEqual([]);
    expect(store.get('p.pb.progress')).toEqual({ 'eng-m1-01': { seen: [0], solved: 3, correct: 3 } });
  });
  test('removePrefix 는 너무 짧은 앞머리로 전부 지우지 못한다', async () => {
    const { store } = await storeWithStudents();
    expect(store.removePrefix('p')).toBe(0);
    expect(store.removePrefix('')).toBe(0);
    expect(store.get('p.pb.progress')).not.toBe(null);
  });
});

test.describe('원자적 바꾸기(replaceAll)', () => {
  test('저장소가 실패하면 메모리의 기존 데이터가 그대로 남는다', async () => {
    const prov = failingProvider();
    const store = S.createStore({ providers: [prov], win: {} });
    await store.ready();
    store.set('profiles', [{ id: 'pa', grade: 'e3' }]);
    store.set('p.pa.progress', { u: 1 });
    await store.flush();
    prov.failWrites = true;
    await expect(store.replaceAll({ profiles: [] })).rejects.toThrow();
    expect(store.get('profiles')).toEqual([{ id: 'pa', grade: 'e3' }]);
    expect(store.get('p.pa.progress')).toEqual({ u: 1 });
  });
});

test.describe('백업: 암호 필수 내보내기', () => {
  test('암호가 짧으면 거절한다', async () => {
    const { store } = await storeWithStudents();
    await expect(S.exportBackup(store, { password: '1234' + '5' })).rejects.toThrow(/6자/);
  });
  test('내보낸 파일에는 별명·기록이 평문으로 보이지 않는다', async () => {
    const { store } = await storeWithStudents();
    const out = await S.exportBackup(store, { password: PW, iterations: ITER });
    expect(out.profiles).toBe(2);
    expect(out.fileName).toMatch(/^가정교사-백업-\d{4}-\d{2}-\d{2}\.json$/);
    for (const s of ['민수', '지아', 'math-e3-01', '분모끼리', 'be동사']) expect(out.text).not.toContain(s);
    const env = JSON.parse(out.text);
    expect(env.encrypted).toBe(true);
    expect(env.cipher.name).toBe('AES-GCM');
    expect(env.kdf.iterations).toBe(ITER);
  });
  test('맞는 암호로 읽으면 학생·기록이 검사를 통과한다', async () => {
    const { store } = await storeWithStudents();
    const out = await S.exportBackup(store, { password: PW, iterations: ITER });
    const r = await S.readBackup(out.text, PW);
    expect(r.ok, r.errors.join()).toBe(true);
    expect(r.summary.profiles.map((p) => p.name)).toEqual(['민수', '지아']);
    expect(r.payload.data['p.pa.notes'][0].cause).toBe('분모끼리 더함');
    expect(r.payload.settings).toEqual({ fontScale: 2, theme: 'dark' });
  });
  test('학생 한 명만 골라 내보낼 수 있다', async () => {
    const { store } = await storeWithStudents();
    const out = await S.exportBackup(store, { password: PW, iterations: ITER, profileIds: ['pb'] });
    const r = await S.readBackup(out.text, PW);
    expect(r.summary.profiles.map((p) => p.name)).toEqual(['지아']);
    expect(Object.keys(r.payload.data).every((k) => k.startsWith('p.pb.'))).toBe(true);
    expect(r.payload.settings).toBe(null);
  });
});

test.describe('백업: 잘못된 파일은 받지 않는다(기존 데이터 무사)', () => {
  let text;
  test.beforeAll(async () => {
    const { store } = await storeWithStudents();
    text = (await S.exportBackup(store, { password: PW, iterations: ITER })).text;
  });
  test('틀린 암호', async () => {
    const r = await S.readBackup(text, BAD_PW);
    expect(r.ok).toBe(false);
    expect(r.errors[0]).toMatch(/암호가 맞지 않거나/);
  });
  test('한 글자라도 바뀐 파일(변조·손상)', async () => {
    const env = JSON.parse(text);
    const i = Math.floor(env.data.length / 2);
    env.data = env.data.slice(0, i) + (env.data[i] === 'A' ? 'B' : 'A') + env.data.slice(i + 1);
    const r = await S.readBackup(JSON.stringify(env), PW);
    expect(r.ok).toBe(false);
  });
  const bads = [
    ['JSON 이 아닌 파일', 'hello world'],
    ['다른 앱의 JSON', JSON.stringify({ hello: 1 })],
    ['빈 파일', ''],
  ];
  for (const [name, t] of bads) {
    test(name, async () => {
      const r = await S.readBackup(t, PW);
      expect(r.ok).toBe(false);
    });
  }
  test('암호로 잠기지 않은 백업', async () => {
    const env = JSON.parse(text);
    env.encrypted = false;
    expect((await S.readBackup(JSON.stringify(env), PW)).errors[0]).toMatch(/암호로 잠기지 않은/);
  });
  test('더 새로운 판의 백업', async () => {
    const env = JSON.parse(text);
    env.version = 99;
    expect((await S.readBackup(JSON.stringify(env), PW)).errors[0]).toMatch(/더 새로운/);
  });
  test('반복 횟수를 줄여 놓은 백업(약한 잠금)', async () => {
    const env = JSON.parse(text);
    env.kdf.iterations = 10;
    expect((await S.readBackup(JSON.stringify(env), PW)).ok).toBe(false);
  });
});

test.describe('백업 내용 검사(validatePayload)', () => {
  const V = S._internal.validatePayload;
  const ok = () => ({
    format: S._internal.PAYLOAD_FORMAT, version: 1, profiles: [{ id: 'pa', name: '민수', grade: 'e3', level: 'elem' }],
    data: { 'p.pa.progress': { u: { solved: 1 } } },
  });
  test('정상', () => { expect(V(ok()).ok).toBe(true); });
  test('학생 id 가 이상하면 거절', () => {
    const p = ok();
    p.profiles[0].id = '../../x';
    expect(V(p).ok).toBe(false);
  });
  test('알 수 없는 학생·종류의 기록은 버리고 경고', () => {
    const p = ok();
    p.data['p.zz.progress'] = {};
    p.data['p.pa.passwords'] = {};
    p.data.tokens = 'x';
    const r = V(p);
    expect(r.ok).toBe(true);
    expect(Object.keys(r.payload.data)).toEqual(['p.pa.progress']);
    expect(r.warnings.length).toBeGreaterThan(0);
  });
  test('__proto__ 같은 위험한 키는 지운다(프로토타입 오염 방지)', () => {
    const p = JSON.parse(JSON.stringify(ok()).replace('"u":', '"__proto__":{"polluted":true},"u":'));
    const r = V(p);
    expect(r.ok).toBe(true);
    expect(({}).polluted).toBeUndefined();
    expect(Object.keys(r.payload.data['p.pa.progress'])).toEqual(['u']);
  });
  test('기록 형식이 틀리면 거절', () => {
    const p = ok();
    p.data['p.pa.notes'] = 'not array';
    expect(V(p).ok).toBe(false);
  });
  test('별명의 제어 문자·꺾쇠는 지우고 20자로 자른다', () => {
    const p = ok();
    p.profiles[0].name = '<b>민수</b>\u0000' + '가'.repeat(30);
    const r = V(p);
    expect(r.payload.profiles[0].name).not.toMatch(/[<>\u0000]/);
    expect(r.payload.profiles[0].name.length).toBeLessThanOrEqual(20);
  });
  test('학생이 너무 많으면 거절', () => {
    const p = ok();
    p.profiles = Array.from({ length: 31 }, (_, i) => ({ id: 'p' + i, grade: 'e1' }));
    expect(V(p).ok).toBe(false);
  });
  test('틀린 곳 알림(reports)도 백업에 들어가고, 배열이 아니면 거절', () => {
    expect(S.DATA_KINDS).toContain('reports');
    const p = ok();
    p.data['p.pa.reports'] = [{ t: 1, unit: 'math-m2-01', kind: 'problem', ref: 'p6', reason: 'answer', memo: '', q: '문제' }];
    const r = V(p);
    expect(r.ok).toBe(true);
    expect(Object.keys(r.payload.data).sort()).toEqual(['p.pa.progress', 'p.pa.reports']);
    p.data['p.pa.reports'] = { not: 'array' };
    expect(V(p).ok).toBe(false);
  });
  test('학년을 정한 때(gradeAt)·새 학년 안내에 답한 학년도(gradeAsk)는 남기고, 이상한 값은 버린다', () => {
    const p = ok();
    p.profiles[0].gradeAt = 1790000000000;
    p.profiles[0].gradeAsk = 2027;
    expect(V(p).payload.profiles[0]).toMatchObject({ gradeAt: 1790000000000, gradeAsk: 2027 });
    p.profiles[0].gradeAt = 'x';
    p.profiles[0].gradeAsk = 99999;
    const c = V(p).payload.profiles[0];
    expect(c.gradeAt).toBeUndefined();
    expect(c.gradeAsk).toBeUndefined();
  });
});

test.describe('복원', () => {
  async function exported() {
    const { store } = await storeWithStudents();
    const out = await S.exportBackup(store, { password: PW, iterations: ITER });
    return (await S.readBackup(out.text, PW)).payload;
  }
  test('더하기: 지금 기록은 그대로, 백업 학생은 새 학생으로(이름이 같으면 표시)', async () => {
    const payload = await exported();
    const prov = memProvider();
    const store = S.createStore({ providers: [prov], win: {} });
    await store.ready();
    store.set('profiles', [{ id: 'pz', name: '민수', grade: 'e5', level: 'elem' }]);
    store.set('p.pz.progress', { mine: 1 });
    const r = await S.restoreBackup(store, payload, { mode: 'add' });
    expect(r.added.length).toBe(2);
    const profiles = store.get('profiles');
    expect(profiles.length).toBe(3);
    expect(profiles[0]).toEqual({ id: 'pz', name: '민수', grade: 'e5', level: 'elem' });
    expect(profiles.map((p) => p.name)).toContain('민수 (가져옴)');
    expect(store.get('p.pz.progress')).toEqual({ mine: 1 });
    const newA = profiles.find((p) => p.name === '민수 (가져옴)').id;
    expect(store.get('p.' + newA + '.progress')['math-e3-01'].solved).toBe(10);
    expect(r.added).not.toContain('pa'); // 새 id
  });
  test('바꾸기: 되돌리기 지점을 만들고, 되돌리면 원래대로', async () => {
    const payload = await exported();
    const store = S.createStore({ providers: [memProvider()], win: {} });
    await store.ready();
    store.set('profiles', [{ id: 'pz', name: '서준', grade: 'h1', level: 'high' }]);
    store.set('p.pz.progress', { mine: 1 });
    store.set('settings', { fontScale: 1 });
    await S.restoreBackup(store, payload, { mode: 'replace' });
    expect(store.get('profiles').map((p) => p.id)).toEqual(['pa', 'pb']);
    expect(store.get('p.pz.progress')).toBe(null);
    expect(store.get('settings')).toEqual({ fontScale: 2, theme: 'dark' });
    expect(S.restorePointInfo(store).profiles).toBe(1);
    await S.undoRestore(store);
    expect(store.get('profiles')).toEqual([{ id: 'pz', name: '서준', grade: 'h1', level: 'high' }]);
    expect(store.get('p.pz.progress')).toEqual({ mine: 1 });
    expect(S.restorePointInfo(store)).toBe(null);
  });
  test('바꾸기 도중 저장이 실패하면 기존 데이터가 그대로 남는다', async () => {
    const payload = await exported();
    const prov = failingProvider();
    const store = S.createStore({ providers: [prov], win: {} });
    await store.ready();
    store.set('profiles', [{ id: 'pz', name: '서준', grade: 'h1' }]);
    store.set('p.pz.progress', { mine: 1 });
    await store.flush();
    prov.failWrites = true;
    await expect(S.restoreBackup(store, payload, { mode: 'replace' })).rejects.toThrow();
    expect(store.get('profiles')).toEqual([{ id: 'pz', name: '서준', grade: 'h1' }]);
    expect(store.get('p.pz.progress')).toEqual({ mine: 1 });
    expect(prov.data['p.pz.progress']).toEqual({ mine: 1 });
  });
  test('검사를 통과하지 않은 것은 복원하지 않는다', async () => {
    const store = S.createStore({ providers: [memProvider()], win: {} });
    await store.ready();
    await expect(S.restoreBackup(store, { profiles: [] }, {})).rejects.toThrow();
  });
  test('모두 지우기(설정은 남길 수 있다)', async () => {
    const { store } = await storeWithStudents();
    await S.wipeAll(store, true);
    expect(store.keys()).toEqual(['settings']);
  });
});

test.describe('학생 PIN', () => {
  test('PIN 은 해시로만 저장하고, 맞는 PIN 만 통과한다', async () => {
    const lock = await S.hashPin('2468', 2000);
    expect(JSON.stringify(lock)).not.toContain('2468');
    expect(await S.verifyPin('2468', lock)).toBe(true);
    expect(await S.verifyPin('2469', lock)).toBe(false);
    expect(await S.verifyPin('', lock)).toBe(false);
  });
  test('PIN 형식: 숫자 4~8자리', async () => {
    await expect(S.hashPin('12')).rejects.toThrow();
    await expect(S.hashPin('abcd')).rejects.toThrow();
  });
  test('같은 PIN 이라도 소금이 달라 해시가 다르다', async () => {
    const a = await S.hashPin('1357', 2000);
    const b = await S.hashPin('1357', 2000);
    expect(a.hash).not.toBe(b.hash);
  });
  test('망가진 잠금 정보로는 통과하지 않는다', async () => {
    expect(await S.verifyPin('1234', { v: 1, salt: '!!', iter: 5, hash: 'x' })).toBe(false);
    expect(await S.verifyPin('1234', null)).toBe(false);
  });
});

test('UMD: 브라우저처럼 실으면 전역 TutorStorage', () => {
  const vm = require('vm');
  const fs = require('fs');
  const ctx = { self: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'storage.js'), 'utf8'), ctx);
  expect(typeof ctx.self.TutorStorage.createStore).toBe('function');
});
