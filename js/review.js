/* 가정교사 — 복습 일정 (window.TutorReview)
 * 계약: docs/ARCHITECTURE.md §10
 * - 오답노트의 문제를 며칠 뒤에 다시 낸다: 틀리면 다음 날, 한 번 맞히면 3일 뒤. 두 번 연속 맞히면 오답노트에서 뺀다(예전 규칙 그대로).
 * - 이 기기 안에서만 계산한다. 날짜는 그 기기의 날짜를 'YYYY-MM-DD' 글자로만 다룬다.
 * - 다음 복습 날(due)이 없는 예전 오답은 틀린 날(at) 다음 날로 본다 — 그래서 예전 기록도 바로 복습에 나온다.
 * - DOM 을 쓰지 않는 순수 함수다(node 시험에서 그대로 부른다).
 */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorReview = mod;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var AFTER_WRONG = 1;   // 틀리면 다음 날
  var AFTER_RIGHT = 3;   // 한 번 맞히면 3일 뒤
  var CLEAR_STREAK = 2;  // 두 번 연속 맞히면 오답노트에서 뺀다
  var EPOCH = '1970-01-01';
  var DAY_MS = 86400000;
  var DAY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

  function num(v) { return typeof v === 'number' && isFinite(v) ? v : 0; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function isDay(s) {
    var m = typeof s === 'string' ? DAY_RE.exec(s) : null;
    if (!m) return false;
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3];
  }
  /* 날짜 글자에 n 일을 더한다 — 시간대와 상관없이 날짜만 계산 */
  function addDays(iso, n) {
    var m = DAY_RE.exec(iso);
    return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]) + n * DAY_MS).toISOString().slice(0, 10);
  }
  /* 그 기기의 날짜 (시각 → 'YYYY-MM-DD') */
  function dayOf(ms) {
    var d = new Date(ms);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function dueOf(note) {
    if (note && isDay(note.due)) return note.due;
    if (note && typeof note.at === 'number' && isFinite(note.at) && note.at > 0) return addDays(dayOf(note.at), AFTER_WRONG);
    return EPOCH;
  }
  function isDue(note, today) { return dueOf(note) <= today; }
  function firstDue(today) { return addDays(today, AFTER_WRONG); }

  /* 오늘 복습할 오답: 복습 날이 오래된 것부터, 같으면 먼저 틀린 것부터 */
  function dueList(notes, today) {
    if (!Array.isArray(notes)) return [];
    return notes.map(function (n, i) { return { n: n, i: i, d: dueOf(n) }; })
      .filter(function (x) { return x.n && x.d <= today; })
      .sort(function (a, b) {
        if (a.d !== b.d) return a.d < b.d ? -1 : 1;
        return (num(a.n.at) - num(b.n.at)) || (a.i - b.i);
      })
      .map(function (x) { return x.n; });
  }
  function dueCount(notes, today) { return dueList(notes, today).length; }

  /* 오늘 뒤의 가장 이른 복습 날과 그날 문제 수 — 없으면 null */
  function nextDue(notes, today) {
    var best = null;
    var n = 0;
    (Array.isArray(notes) ? notes : []).forEach(function (note) {
      if (!note) return;
      var d = dueOf(note);
      if (d <= today) return;
      if (best === null || d < best) { best = d; n = 1; } else if (d === best) n += 1;
    });
    return best ? { date: best, n: n } : null;
  }

  /* 복습 문제를 채점한 뒤: 오답노트 항목(note)을 그 자리에서 고친다.
   *   → { cleared: 두 번 연속 맞혀 뺄지, due: 다음 복습 날(뺄 때는 null), streak: 연속 맞힘 } */
  function answer(note, correct, today) {
    if (correct) {
      note.rightStreak = num(note.rightStreak) + 1;
      if (note.rightStreak >= CLEAR_STREAK) return { cleared: true, due: null, streak: note.rightStreak };
      note.due = addDays(today, AFTER_RIGHT);
    } else {
      note.wrongCount = num(note.wrongCount) + 1;
      note.rightStreak = 0;
      note.due = addDays(today, AFTER_WRONG);
    }
    return { cleared: false, due: note.due, streak: note.rightStreak };
  }

  /* 화면 말: 오늘(지났으면 오늘)·내일·모레·몇 월 며칠 */
  function label(due, today) {
    if (!isDay(due) || due <= today) return '오늘';
    if (due === addDays(today, 1)) return '내일';
    if (due === addDays(today, 2)) return '모레';
    return Number(due.slice(5, 7)) + '월 ' + Number(due.slice(8, 10)) + '일';
  }

  return {
    AFTER_WRONG: AFTER_WRONG, AFTER_RIGHT: AFTER_RIGHT, CLEAR_STREAK: CLEAR_STREAK,
    isDay: isDay, addDays: addDays, dayOf: dayOf,
    dueOf: dueOf, isDue: isDue, firstDue: firstDue, dueList: dueList, dueCount: dueCount, nextDue: nextDue,
    answer: answer, label: label,
  };
});
