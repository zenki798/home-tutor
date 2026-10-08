const { test, expect } = require('@playwright/test');
const path = require('path');

/*
 * 복습 일정 — js/review.js (기기 안에서만 계산)
 *   틀리면 다음 날, 한 번 맞히면 3일 뒤에 다시 낸다. 두 번 연속 맞히면 오답노트에서 뺀다(예전 규칙 그대로).
 *   날짜는 'YYYY-MM-DD' 글자로만 다룬다(그 기기의 날짜). 다음 복습 날(due)이 없는 예전 오답은 틀린 날(at) 다음 날로 본다.
 */
const R = require(path.join(__dirname, '..', '..', 'js', 'review.js'));

/* 그 기기 시간대의 그날 정오 — 시험 컴퓨터의 시간대와 상관없이 같은 날짜가 나오게 */
function noon(y, m, d) { return new Date(y, m - 1, d, 12).getTime(); }

test('날짜 더하기: 달·해가 바뀌어도, 윤년도', () => {
  expect(R.addDays('2026-10-08', 1)).toBe('2026-10-09');
  expect(R.addDays('2026-10-31', 1)).toBe('2026-11-01');
  expect(R.addDays('2026-12-30', 3)).toBe('2027-01-02');
  expect(R.addDays('2028-02-28', 1)).toBe('2028-02-29');
  expect(R.addDays('2027-02-28', 1)).toBe('2027-03-01');
  expect(R.addDays('2026-10-08', 0)).toBe('2026-10-08');
});

test('그 기기의 날짜(dayOf)와 날짜 글자 검사', () => {
  expect(R.dayOf(noon(2026, 10, 8))).toBe('2026-10-08');
  expect(R.dayOf(noon(2027, 1, 2))).toBe('2027-01-02');
  expect(R.isDay('2026-10-08')).toBe(true);
  for (const bad of ['2026-1-8', '2026-13-01', '2026-02-30', '', null, 20261008, '2026-10-08T00:00']) expect(R.isDay(bad)).toBe(false);
});

test('다음 복습 날: due 가 있으면 그것, 없으면 틀린 날 다음 날, 그것도 없으면 바로', () => {
  expect(R.dueOf({ due: '2026-10-11', at: noon(2026, 10, 1) })).toBe('2026-10-11');
  expect(R.dueOf({ at: noon(2026, 10, 7) })).toBe('2026-10-08');
  expect(R.dueOf({ due: '엉뚱한 값', at: noon(2026, 10, 7) })).toBe('2026-10-08');
  expect(R.dueOf({})).toBe('1970-01-01');
  expect(R.dueOf(null)).toBe('1970-01-01');
  expect(R.isDue({ due: '2026-10-08' }, '2026-10-08')).toBe(true);
  expect(R.isDue({ due: '2026-10-07' }, '2026-10-08')).toBe(true);
  expect(R.isDue({ due: '2026-10-09' }, '2026-10-08')).toBe(false);
});

test('틀리면 다음 날, 한 번 맞히면 3일 뒤, 두 번 연속 맞히면 뺀다', () => {
  const n = { key: 'a', wrongCount: 1, rightStreak: 0, due: '2026-10-08' };
  expect(R.answer(n, true, '2026-10-08')).toEqual({ cleared: false, due: '2026-10-11', streak: 1 });
  expect(n).toMatchObject({ rightStreak: 1, wrongCount: 1, due: '2026-10-11' });
  expect(R.answer(n, true, '2026-10-11')).toEqual({ cleared: true, due: null, streak: 2 });
  expect(n.rightStreak).toBe(2);

  const w = { key: 'b', wrongCount: 2, rightStreak: 1, due: '2026-10-08' };
  expect(R.answer(w, false, '2026-10-08')).toEqual({ cleared: false, due: '2026-10-09', streak: 0 });
  expect(w).toMatchObject({ wrongCount: 3, rightStreak: 0, due: '2026-10-09' });

  // 이상한 값이 들어 있어도 숫자로 다룬다
  const odd = { rightStreak: '두 번', wrongCount: null };
  R.answer(odd, false, '2026-10-08');
  expect(odd).toMatchObject({ rightStreak: 0, wrongCount: 1, due: '2026-10-09' });
});

test('새로 틀린 문제의 다음 복습 날은 다음 날', () => {
  expect(R.firstDue('2026-10-08')).toBe('2026-10-09');
  expect(R.AFTER_WRONG).toBe(1);
  expect(R.AFTER_RIGHT).toBe(3);
  expect(R.CLEAR_STREAK).toBe(2);
});

test('오늘 복습할 목록: 날짜가 된 것만, 오래된 복습 날부터(같으면 먼저 틀린 것부터)', () => {
  const notes = [
    { key: 'later', due: '2026-10-10', at: 5 },
    { key: 'today2', due: '2026-10-08', at: 9 },
    { key: 'old', at: noon(2026, 9, 30) },          // due 없음 → 10-01
    { key: 'today1', due: '2026-10-08', at: 3 },
    { key: 'past', due: '2026-10-05', at: 7 },
  ];
  expect(R.dueList(notes, '2026-10-08').map((n) => n.key)).toEqual(['old', 'past', 'today1', 'today2']);
  expect(R.dueCount(notes, '2026-10-08')).toBe(4);
  expect(R.dueList([], '2026-10-08')).toEqual([]);
  expect(R.dueList(null, '2026-10-08')).toEqual([]);
  // 다음 복습: 오늘 뒤의 가장 이른 날과 그날 문제 수
  expect(R.nextDue(notes, '2026-10-08')).toEqual({ date: '2026-10-10', n: 1 });
  expect(R.nextDue([{ due: '2026-10-08' }], '2026-10-08')).toBeNull();
});

test('날짜 말: 오늘·내일·모레·그 뒤는 몇 월 며칠', () => {
  expect(R.label('2026-10-05', '2026-10-08')).toBe('오늘');
  expect(R.label('2026-10-08', '2026-10-08')).toBe('오늘');
  expect(R.label('2026-10-09', '2026-10-08')).toBe('내일');
  expect(R.label('2026-10-10', '2026-10-08')).toBe('모레');
  expect(R.label('2026-10-11', '2026-10-08')).toBe('10월 11일');
  expect(R.label('2027-01-02', '2026-12-30')).toBe('1월 2일');
});
