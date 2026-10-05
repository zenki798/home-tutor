/* 교육과정 변경이 이 학생에게 닿는가 — 이 기기 안에서만 계산한다(이름·학년·학습 기록은 밖으로 나가지 않는다)
 *
 * 쓰는 것: 카탈로그의 notices(공개 교육과정 정보)와 이 기기에 저장된 학생의 지금 학년(e1~e6, m1~m3, h1~h3)뿐.
 * 한국 학년도는 3월 1일에 시작한다. 지금 학년이 g 인 학생은 해마다 한 학년씩 올라간다고 보고,
 * 고시 부칙의 학년별 시행일과 견주어 "바뀐 교육과정으로 배우게 되는 학년과 학년도"를 찾는다.
 *   schoolYear('2026-10-05') → 2026 (3월 1일 전이면 한 해 앞)
 *   gradeYear('e3', 'e5', today) → 2028 — 지금 초3이면 초5를 배우는 학년도(지난 학년이면 null)
 *   forCourse(notice, course, grade, today) → [{ grade, year, now }] — 이 과정의 학년 가운데 바뀐 교육과정으로 배우게 되는 것
 *   forStudent(catalog, grade, today) → [{ notice, part, status, when, courses: [{ id, title, hits }], changes }]
 *     status: applied(성취기준 자동 반영) · manual(교육과정 변경 감지 - 수동 확인 필요) · pending(아직 비교 전)
 *     unchanged(성취기준 문장 변화 없음)는 배우는 내용에 닿지 않으므로 넣지 않는다.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TutorImpact = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var ORDER = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'm1', 'm2', 'm3', 'h1', 'h2', 'h3'];

  function idx(g) { return ORDER.indexOf(g); }
  function schoolYear(iso) {
    var y = Number(String(iso).slice(0, 4));
    var m = Number(String(iso).slice(5, 7));
    return m >= 3 ? y : y - 1;
  }
  function gradeYear(cur, g, today) {
    var a = idx(cur);
    var b = idx(g);
    if (a < 0 || b < 0 || b < a) return null;
    return schoolYear(today) + (b - a);
  }
  // 고시에서 학년 g 가 바뀐 교육과정을 쓰기 시작하는 학년도(부칙에 없으면 null)
  function effectiveYear(notice, g) {
    var list = (notice && notice.effective) || [];
    var best = null;
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (e && Array.isArray(e.grades) && e.grades.indexOf(g) >= 0) {
        var y = schoolYear(e.date);
        if (best === null || y < best) best = y;
      }
    }
    return best;
  }
  function forCourse(notice, course, cur, today) {
    var out = [];
    var now = schoolYear(today);
    (course.grades || []).forEach(function (g) {
      var y = gradeYear(cur, g, today);
      var ey = effectiveYear(notice, g);
      if (y !== null && ey !== null && y >= ey) out.push({ grade: g, year: y, now: y === now });
    });
    return out;
  }
  function partHas(part, c) {
    return (Array.isArray(part.courses) && part.courses.indexOf(c.id) >= 0) ||
      (Array.isArray(part.subjects) && part.subjects.indexOf(c.subject) >= 0 && !(Array.isArray(part.except) && part.except.indexOf(c.id) >= 0));
  }
  function forStudent(catalog, cur, today) {
    var out = [];
    if (idx(cur) < 0) return out; // 대학·성인: 학교 교육과정 학년이 없다
    var notices = (catalog && Array.isArray(catalog.notices)) ? catalog.notices : [];
    var courses = (catalog && Array.isArray(catalog.courses)) ? catalog.courses : [];
    notices.forEach(function (n) {
      if (!n || !Array.isArray(n.parts)) return;
      n.parts.forEach(function (p) {
        var status = p.status || 'pending';
        if (status === 'unchanged') return;
        var changes = status === 'applied' && Array.isArray(p.changes) ? p.changes : [];
        if (status === 'applied' && !changes.length) return;
        var hitCourses = [];
        courses.forEach(function (c) {
          if (!partHas(p, c)) return;
          var mine = changes.filter(function (x) { return Array.isArray(x.courses) && x.courses.indexOf(c.id) >= 0; });
          if (status === 'applied' && !mine.length) return;
          var hits = forCourse(n, c, cur, today);
          if (hits.length) hitCourses.push({ id: c.id, title: c.title, hits: hits, changes: mine });
        });
        if (!hitCourses.length) return;
        var when = null;
        hitCourses.forEach(function (c) { c.hits.forEach(function (h) { if (!when || h.year < when.year) when = h; }); });
        var codes = {};
        var list = [];
        hitCourses.forEach(function (c) { c.changes.forEach(function (x) { if (!codes[x.code]) { codes[x.code] = 1; list.push(x); } }); });
        out.push({ notice: n, part: p, status: status, when: when, courses: hitCourses, changes: list });
      });
    });
    out.sort(function (a, b) { return a.when.year - b.when.year || (a.notice.date < b.notice.date ? -1 : 1); });
    return out;
  }
  // 이 단원의 성취기준 변화 가운데 이 학생에게 닿는 것 → [{ notice, change, hit }]
  function forUnit(catalog, unitId, course, cur, today) {
    var out = [];
    var notices = (catalog && Array.isArray(catalog.notices)) ? catalog.notices : [];
    notices.forEach(function (n) {
      (n.parts || []).forEach(function (p) {
        if (p.status !== 'applied' || !Array.isArray(p.changes)) return;
        p.changes.forEach(function (x) {
          if (!Array.isArray(x.units) || x.units.indexOf(unitId) < 0) return;
          var hits = idx(cur) >= 0 ? forCourse(n, course, cur, today) : [];
          out.push({ notice: n, change: x, hit: hits.length ? hits[0] : null });
        });
      });
    });
    return out;
  }

  return { ORDER: ORDER, schoolYear: schoolYear, gradeYear: gradeYear, effectiveYear: effectiveYear, forCourse: forCourse, forStudent: forStudent, forUnit: forUnit };
});
