/* 가정교사 — 보호자용 학습 요약 (window.TutorSummary)
 * 계약: docs/ARCHITECTURE.md §12
 * - 지금 학생 한 명의 기록만 받아 요약한다(다른 학생 기록은 받지도 않는다). 이 기기 안에서만 계산한다.
 * - 기간은 오늘을 포함한 최근 n일(7·30). 날짜는 그 기기의 날짜 'YYYY-MM-DD' 글자로만 다룬다.
 * - DOM 을 쓰지 않는 순수 함수다(node 시험에서 그대로 부른다).
 */
(function (root, factory) {
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  else root.TutorSummary = mod;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var MAX_ATTEMPTS = 2000; // 화면이 남기는 풀이 기록 수(app.js 와 같다) — 다 차면 앞부분이 빠졌을 수 있다
  var MIN_UNIT = 3;        // 잘한 단원·더 연습할 단원은 그 기간에 3문제 이상 푼 단원만
  var DAY_MS = 86400000;
  var DAY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

  function isObj(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
  function num(v) { return typeof v === 'number' && isFinite(v) ? v : 0; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function dayOf(ms) {
    var d = new Date(ms);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function addDays(iso, n) {
    var m = DAY_RE.exec(iso);
    return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]) + n * DAY_MS).toISOString().slice(0, 10);
  }
  function pct(c, n) { return n ? Math.round((100 * c) / n) : null; }

  /* input: { attempts, days, progress, notes, reports }  — 모두 그 학생의 기록(없으면 빈 것)
   * opts:  { today: 'YYYY-MM-DD', period: 7|30, unitInfo(unitId) → { subject, subjectName, title } | null, due: 오늘 복습할 수 }
   * → { from, to, period, studyDays, solved, correct, rate, checks, checksOk, daily, bySubject, units, strong, weak, causes, studied, notes, due, reports, partial } */
  function build(input, opts) {
    input = input || {};
    opts = opts || {};
    var period = opts.period === 30 ? 30 : 7;
    var to = opts.today;
    var from = addDays(to, -(period - 1));
    var info = typeof opts.unitInfo === 'function' ? opts.unitInfo : function () { return null; };
    function inRange(d) { return d >= from && d <= to; }

    var attempts = (Array.isArray(input.attempts) ? input.attempts : []).filter(function (a) {
      return isObj(a) && typeof a.ok === 'boolean' && typeof a.t === 'number' && isFinite(a.t);
    });
    var daily = [];
    var byDay = {};
    for (var i = 0; i < period; i++) {
      var d = addDays(from, i);
      byDay[d] = { date: d, n: 0, c: 0 };
      daily.push(byDay[d]);
    }
    var subj = {};
    var subjOrder = [];
    var units = {};
    var unitOrder = [];
    var causes = {};
    var causeOrder = [];
    var solved = 0;
    var correct = 0;
    var checks = 0;
    var checksOk = 0;
    attempts.forEach(function (a, idx) {
      var day = dayOf(a.t);
      if (!inRange(day)) return;
      byDay[day].n += 1;
      if (a.ok) byDay[day].c += 1;
      if (num(a.level) === 0) { // 개념 카드의 이해 확인
        checks += 1;
        if (a.ok) checksOk += 1;
        return;
      }
      solved += 1;
      if (a.ok) correct += 1;
      var u = typeof a.unit === 'string' ? a.unit : '';
      var ui = info(u) || {};
      var sid = ui.subject || 'etc';
      if (!subj[sid]) { subj[sid] = { subject: sid, name: ui.subjectName || '기타', n: 0, c: 0 }; subjOrder.push(sid); }
      subj[sid].n += 1;
      if (a.ok) subj[sid].c += 1;
      if (u) {
        if (!units[u]) { units[u] = { unit: u, title: ui.title || u, subject: sid, n: 0, c: 0, last: 0 }; unitOrder.push(u); }
        units[u].n += 1;
        if (a.ok) units[u].c += 1;
        units[u].last = Math.max(units[u].last, a.t);
      }
      if (!a.ok && typeof a.cause === 'string' && a.cause) {
        if (!causes[a.cause]) { causes[a.cause] = { text: a.cause, n: 0, i: idx }; causeOrder.push(a.cause); }
        causes[a.cause].n += 1;
        causes[a.cause].i = idx;
      }
    });

    var bySubject = subjOrder.map(function (k) { var s = subj[k]; return { subject: s.subject, name: s.name, n: s.n, c: s.c, rate: pct(s.c, s.n) }; })
      .sort(function (a, b) { return b.n - a.n; });
    var unitList = unitOrder.map(function (k) { var u = units[k]; return { unit: u.unit, title: u.title, subject: u.subject, n: u.n, c: u.c, rate: pct(u.c, u.n), last: u.last }; });
    var enough = unitList.filter(function (u) { return u.n >= MIN_UNIT; });
    var strong = enough.filter(function (u) { return u.rate >= 80; })
      .sort(function (a, b) { return (b.rate - a.rate) || (b.n - a.n); }).slice(0, 3);
    var weak = enough.filter(function (u) { return u.rate < 60; })
      .sort(function (a, b) { return (a.rate - b.rate) || (b.n - a.n); }).slice(0, 3);
    var topCauses = causeOrder.map(function (k) { return causes[k]; })
      .sort(function (a, b) { return (b.n - a.n) || (b.i - a.i); }).slice(0, 3)
      .map(function (c) { return { text: c.text, n: c.n }; });

    /* 개념 카드를 본 단원(진도의 마지막 공부 시각이 기간 안) */
    var prog = isObj(input.progress) ? input.progress : {};
    var studied = Object.keys(prog).map(function (k) {
      var p = isObj(prog[k]) ? prog[k] : {};
      var last = num(p.last);
      var ui = info(k) || {};
      return { unit: k, title: ui.title || k, subject: ui.subject || 'etc', last: last,
        seen: Array.isArray(p.seen) ? p.seen.length : 0, cards: num(p.cards) };
    }).filter(function (x) { return x.last > 0 && inRange(dayOf(x.last)); })
      .sort(function (a, b) { return b.last - a.last; });

    var days = (Array.isArray(input.days) ? input.days : []).filter(function (x) { return typeof x === 'string' && inRange(x); });
    var uniqDays = days.filter(function (x, k) { return days.indexOf(x) === k; });
    var first = attempts.length ? attempts[0].t : 0;

    return {
      from: from, to: to, period: period,
      studyDays: uniqDays.length,
      solved: solved, correct: correct, rate: pct(correct, solved),
      checks: checks, checksOk: checksOk,
      daily: daily, bySubject: bySubject, units: unitList, strong: strong, weak: weak, causes: topCauses,
      studied: studied.slice(0, 5), studiedCount: studied.length,
      notes: Array.isArray(input.notes) ? input.notes.length : 0,
      due: num(opts.due),
      reports: Array.isArray(input.reports) ? input.reports.length : 0,
      partial: attempts.length >= MAX_ATTEMPTS && first > 0 && dayOf(first) > from,
    };
  }

  function mdText(iso) { return Number(iso.slice(5, 7)) + '월 ' + Number(iso.slice(8, 10)) + '일'; }

  /* 글로 복사할 요약 — 별명 같은 학생 정보는 넣지 않는다(보호자가 필요하면 직접 적는다) */
  function toText(s, opt) {
    opt = opt || {};
    var lines = [];
    lines.push('가정교사 학습 요약' + (opt.grade ? ' (' + opt.grade + ')' : ''));
    lines.push('기간: ' + mdText(s.from) + ' ~ ' + mdText(s.to) + ' (최근 ' + s.period + '일)');
    lines.push('');
    lines.push('공부한 날 ' + s.studyDays + '일 · 푼 문제 ' + s.solved + '개 · 정답률 ' + (s.rate === null ? '-' : s.rate + '%') +
      ' · 이해 확인 ' + s.checks + '개');
    if (s.bySubject.length) {
      lines.push('');
      lines.push('과목별');
      s.bySubject.forEach(function (x) { lines.push('- ' + x.name + ': ' + x.n + '문제, 정답률 ' + x.rate + '%'); });
    }
    if (s.strong.length) {
      lines.push('');
      lines.push('잘한 단원');
      s.strong.forEach(function (x) { lines.push('- ' + x.title + ' (' + x.n + '문제, ' + x.rate + '%)'); });
    }
    if (s.weak.length) {
      lines.push('');
      lines.push('더 연습하면 좋은 단원');
      s.weak.forEach(function (x) { lines.push('- ' + x.title + ' (' + x.n + '문제, ' + x.rate + '%)'); });
    }
    if (s.causes.length) {
      lines.push('');
      lines.push('자주 틀린 까닭');
      s.causes.forEach(function (x) { lines.push('- ' + x.text + ' (' + x.n + '번)'); });
    }
    lines.push('');
    lines.push('오답노트 ' + s.notes + '문제 · 오늘 복습할 문제 ' + s.due + '개');
    if (s.partial) lines.push('(풀이 기록이 많아 기간 앞부분은 빠졌을 수 있어요)');
    return lines.join('\n');
  }

  return { build: build, toText: toText, dayOf: dayOf, addDays: addDays, MIN_UNIT: MIN_UNIT };
});
