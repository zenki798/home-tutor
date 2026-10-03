/* 단원 하나 검사 — lint-unit.js(작성자용 빠른 검사)와 validate-content.js(전체 검사)가 함께 쓴다.
 * 형식: docs/ARCHITECTURE.md §7, 작성 안내: docs/CONTENT-GUIDE.md
 *
 *   checkUnit(unit, ctx) → { errors: [{path, msg}], warnings: [{path, msg}], stats }
 *     ctx: { TutorMath, TutorText, TutorFig, meta?: { course, unit(카탈로그·지도 항목) }, subject?, grades?, seeds?: 200, source?: 파일 원문 }
 */
'use strict';
const { lintParticles } = require('./particles');
const { scanText } = require('./secret-patterns');

const FORBIDDEN = ['undefined', 'NaN', '[object Object]', 'Infinity', 'TODO', 'FIXME', 'lorem', 'XXX'];
// 'null' 은 낱말 경계로만 (영어 지문의 "nullify" 같은 것은 괜찮다)
const NULL_RE = /(^|[^A-Za-z])null([^A-Za-z]|$)/;
const TYPES = ['choice', 'short', 'ox', 'order'];
const CHECKS = ['text', 'number', 'expr', 'set'];

const RANGES = {
  concepts: [3, 6], examples: [1, 3], terms: [3, 10], practice: [8, 12], advanced: [3, 6],
  deeper: [1, 2], faq: [2, 4], mistakes: [1, 3],
};

function isStr(x) { return typeof x === 'string'; }
function nonEmpty(x) { return isStr(x) && x.trim().length > 0; }

function checkUnit(unit, ctx) {
  const errors = [];
  const warnings = [];
  const stats = { problems: 0, gens: 0, genSamples: 0, concepts: 0, checks: 0 };
  const M = ctx.TutorMath;
  const T = ctx.TutorText;
  const Fg = ctx.TutorFig;
  const err = (path, msg) => errors.push({ path, msg });
  const warn = (path, msg) => warnings.push({ path, msg });

  if (!unit || typeof unit !== 'object') {
    err('', 'Tutor.registerUnit 에 단원 객체가 없어요');
    return { errors, warnings, stats };
  }

  /* ---------- 서식 글 ---------- */
  function rich(path, v, opts) {
    opts = opts || {};
    if (v === undefined || v === null || v === '') {
      if (opts.required) err(path, '비어 있어요');
      return;
    }
    if (!isStr(v)) { err(path, '글(문자열)이어야 해요: ' + JSON.stringify(v).slice(0, 60)); return; }
    if (opts.min && v.trim().length < opts.min) err(path, opts.min + '자 이상 써 주세요 (지금 ' + v.trim().length + '자)');
    for (const m of T.check(v)) err(path, m);
    const plain = (() => { try { return T.plain(v); } catch (e) { return v; } })();
    for (const f of FORBIDDEN) if (plain.includes(f)) err(path, '들어가면 안 되는 글자: ' + f);
    if (NULL_RE.test(plain)) err(path, '들어가면 안 되는 글자: null');
    if (!opts.noParticles) {
      for (const p of lintParticles(v)) warn(path, '조사: "' + p.context + '" — ' + p.found + ' → ' + p.expected + ' (읽는 소리 기준)');
    }
  }

  function fig(path, f) {
    if (f === undefined || f === null) return;
    let msgs;
    try { msgs = Fg.check(f); } catch (e) { msgs = ['그림 검사 중 오류: ' + e.message]; }
    for (const m of msgs) err(path, m);
  }

  /* ---------- 문제 ---------- */
  // where: 'bank' | 'gen' | 'check'
  function problem(path, p, where, conceptCount) {
    if (!p || typeof p !== 'object') { err(path, '문제 객체가 아니에요'); return; }
    stats.problems++;
    if (!TYPES.includes(p.type)) { err(path + '.type', "type 은 'choice' 'short' 'ox' 'order' 중 하나: " + JSON.stringify(p.type)); return; }
    rich(path + '.q', p.q, { required: true });
    rich(path + '.explain', p.explain, { required: true, min: where === 'check' ? 5 : 10 });
    rich(path + '.hint', p.hint);
    fig(path + '.fig', p.fig);
    if (where === 'bank' && ![1, 2, 3].includes(p.level)) err(path + '.level', 'level 은 1, 2, 3 중 하나: ' + JSON.stringify(p.level));
    if (p.concept !== undefined) {
      if (!Number.isInteger(p.concept) || p.concept < 0 || p.concept >= conceptCount) {
        err(path + '.concept', '개념 카드 번호(0~' + (conceptCount - 1) + ')가 아니에요: ' + JSON.stringify(p.concept));
      }
    } else if (where !== 'check') {
      warn(path + '.concept', '관련 개념 카드 번호(concept)가 없어요 — 틀린 학생에게 "추가 설명"을 보여 줄 수 없어요');
    }

    if (p.type === 'choice' || p.type === 'order') {
      const c = p.choices;
      if (!Array.isArray(c)) { err(path + '.choices', '보기 배열이 없어요'); return; }
      const min = p.type === 'order' ? 3 : (where === 'check' ? 2 : 3);
      if (c.length < min || c.length > (p.type === 'order' ? 6 : 5)) err(path + '.choices', '보기 수가 알맞지 않아요: ' + c.length + '개');
      const seen = new Set();
      c.forEach((x, i) => {
        if (!nonEmpty(x)) err(path + '.choices[' + i + ']', '빈 보기');
        else {
          rich(path + '.choices[' + i + ']', x);
          const k = T.plain(x).replace(/\s+/g, '');
          if (seen.has(k)) err(path + '.choices[' + i + ']', '같은 보기가 두 번 있어요: ' + x);
          seen.add(k);
        }
      });
    }
    if (p.type === 'choice') {
      if (!Number.isInteger(p.answer) || p.answer < 0 || p.answer >= (p.choices || []).length) {
        err(path + '.answer', '정답은 보기 번호(0부터)여야 해요: ' + JSON.stringify(p.answer));
      }
      if (p.why !== undefined) {
        if (!Array.isArray(p.why) || p.why.length !== (p.choices || []).length) err(path + '.why', 'why 는 보기와 같은 개수의 배열이어야 해요');
        else {
          p.why.forEach((w, i) => {
            if (i === p.answer) { if (nonEmpty(w)) warn(path + '.why[' + i + ']', '정답 보기의 why 는 빈 글자로 두세요'); }
            else if (!nonEmpty(w)) warn(path + '.why[' + i + ']', '이 오답 보기를 고른 학생에게 보여 줄 이유가 비어 있어요');
            else rich(path + '.why[' + i + ']', w);
          });
        }
      } else if (where !== 'check') {
        warn(path + '.why', '보기마다 틀린 이유(why)가 없어요 — 오답 분석이 일반 해설로만 나와요');
      }
    } else if (p.type === 'ox') {
      if (p.answer !== true && p.answer !== false) err(path + '.answer', 'ox 정답은 true/false: ' + JSON.stringify(p.answer));
    } else if (p.type === 'order') {
      const a = p.answer;
      const n = (p.choices || []).length;
      const ok = Array.isArray(a) && a.length === n && a.slice().sort((x, y) => x - y).every((v, i) => v === i);
      if (!ok) err(path + '.answer', 'order 정답은 0~' + (n - 1) + ' 의 순서 배열이어야 해요: ' + JSON.stringify(a));
    } else if (p.type === 'short') {
      const kind = p.check || 'text';
      if (!CHECKS.includes(kind)) err(path + '.check', "check 는 'text' 'number' 'expr' 'set' 중 하나: " + JSON.stringify(p.check));
      const answers = Array.isArray(p.answer) && kind !== 'set' ? p.answer : [p.answer];
      if (!answers.length || answers.some((a) => !(nonEmpty(a) || (Array.isArray(a) && a.length)))) {
        err(path + '.answer', '정답이 비어 있어요');
        return;
      }
      for (const a of answers) {
        const s = Array.isArray(a) ? a.join(', ') : String(a);
        if (kind === 'number' && !M.parseNumberAnswer(s)) err(path + '.answer', '수로 읽을 수 없는 정답: ' + s);
        if (kind === 'expr') { try { M.parseExpr(s); } catch (e) { err(path + '.answer', '식으로 읽을 수 없는 정답: ' + s); } }
        if (kind === 'text' && /^[\s\d.,/+\-−]+$/.test(s) && /\d/.test(s)) {
          err(path + '.check', "수 정답에 text 채점을 쓰면 '1 3/6'과 '13/6'이 같아져요 — check: 'number' 를 쓰세요: " + s);
        }
      }
      // 자기 일관성: 정답을 넣으면 정답이어야 한다
      const tries = kind === 'set' ? [Array.isArray(p.answer) ? p.answer.join(', ') : String(p.answer)] : answers.map(String);
      for (const a of tries) {
        let r;
        try { r = M.checkAnswer(p, a); } catch (e) { r = { correct: false }; }
        if (!r || !r.correct) err(path + '.answer', '정답 "' + a + '" 를 넣었는데 채점기가 정답으로 보지 않아요 (check=' + kind + ')');
      }
      if (p.wrong !== undefined) {
        if (!Array.isArray(p.wrong)) err(path + '.wrong', 'wrong 은 [{ a, why }] 배열이어야 해요');
        else {
          p.wrong.forEach((w, i) => {
            const wp = path + '.wrong[' + i + ']';
            if (!w || (!nonEmpty(w.a) && !Array.isArray(w.a))) { err(wp, '틀린 답 a 가 없어요'); return; }
            rich(wp + '.why', w.why, { required: true });
            let r;
            try { r = M.checkAnswer(p, Array.isArray(w.a) ? w.a.join(', ') : String(w.a)); } catch (e) { r = null; }
            if (r && r.correct) {
              if (where === 'gen') warn(wp + '.a', '이번 수에서는 "틀린 답"이 정답과 같아져요(화면은 이 진단을 버려요) — 경계 값을 피하면 더 좋아요: ' + w.a);
              else err(wp + '.a', '이 "틀린 답"을 채점기가 정답으로 봐요(값이 같아요): ' + w.a);
            }
          });
        }
      }
      if (p.unit !== undefined && !nonEmpty(p.unit)) err(path + '.unit', 'unit 은 글자여야 해요');
    }
    if (p.type !== 'short' && p.wrong !== undefined) warn(path + '.wrong', 'wrong 은 short 문제에만 쓰여요');
    if (p.type !== 'choice' && p.why !== undefined) warn(path + '.why', 'why 는 choice 문제에만 쓰여요');
    // 정답 판정 함수 자체가 throw 하지 않는지
    try {
      const probe = p.type === 'choice' ? p.answer : p.type === 'ox' ? p.answer : p.type === 'order' ? p.answer : String(Array.isArray(p.answer) ? p.answer[0] : p.answer);
      const r = M.checkAnswer(p, probe);
      if (p.type !== 'short' && (!r || !r.correct)) err(path + '.answer', '정답을 넣었는데 채점기가 정답으로 보지 않아요');
    } catch (e) {
      err(path, '채점 중 오류: ' + e.message);
    }
  }

  /* ---------- 비밀 인증정보·개인정보 (AGENTS.md 규칙 6) ---------- */
  if (isStr(ctx.source)) {
    for (const f of scanText(ctx.source)) {
      err('파일 ' + f.line + '번째 줄', (f.kind === 'secret' ? '비밀 인증정보' : '개인정보') + '처럼 보이는 값: ' + f.rule + ' ' + f.sample +
        ' — 예시 연락처는 hong@example.com · 010-0000-0000 같은 더미만 써요');
    }
  }

  /* ---------- 단원 칸 ---------- */
  const meta = ctx.meta || null;
  if (!nonEmpty(unit.id)) err('id', 'id 가 없어요');
  if (ctx.fileId && unit.id !== ctx.fileId) err('id', '파일 이름(' + ctx.fileId + ')과 id(' + unit.id + ')가 달라요');
  if (meta) {
    if (unit.course !== meta.course.id) err('course', '과정 id 가 달라요: ' + unit.course + ' (지도: ' + meta.course.id + ')');
    if (meta.unit && unit.title !== meta.unit.title) warn('title', '지도의 단원 제목과 달라요: "' + unit.title + '" / 지도 "' + meta.unit.title + '"');
    // 성취기준은 지도와 똑같이 — 다르면 화면에 "개정 반영 중"으로 표시된다(build-catalog). 교육과정 개정 뒤 다시 쓴 단원은 새 성취기준으로 바꾼다
    if (meta.unit && Array.isArray(meta.unit.standards) && !require('./curriculum').sameStandards(unit.standards, meta.unit.standards)) {
      warn('standards', '성취기준이 교육과정 지도와 달라요: ' + JSON.stringify(unit.standards || []) + ' / 지도 ' + JSON.stringify(meta.unit.standards) +
        ' — 지도의 성취기준을 그대로 써요(다르면 화면에 "개정 반영 중"으로 보여요)');
    }
  } else if (ctx.requireMeta) {
    err('id', '교육과정 지도(curriculum/*.json)에 없는 단원이에요: ' + unit.id);
  }
  if (!nonEmpty(unit.title)) err('title', '제목이 없어요');
  rich('summary', unit.summary, { required: true });
  if (!Array.isArray(unit.goals) || unit.goals.length < 1) err('goals', '학습 목표가 없어요');
  else unit.goals.forEach((g, i) => rich('goals[' + i + ']', g, { required: true }));
  if (unit.standards !== undefined && !Array.isArray(unit.standards)) err('standards', '배열이어야 해요');

  for (const key of Object.keys(RANGES)) {
    const arr = unit[key];
    const [lo, hi] = RANGES[key];
    if (!Array.isArray(arr) || arr.length === 0) { err(key, '비어 있어요 (' + lo + '~' + hi + '개)'); continue; }
    if (arr.length < lo || arr.length > hi) warn(key, arr.length + '개 — 권장 ' + lo + '~' + hi + '개');
  }

  const concepts = Array.isArray(unit.concepts) ? unit.concepts : [];
  stats.concepts = concepts.length;
  concepts.forEach((c, i) => {
    const p = 'concepts[' + i + ']';
    if (!c || typeof c !== 'object') { err(p, '개념 카드 객체가 아니에요'); return; }
    rich(p + '.title', c.title, { required: true });
    rich(p + '.body', c.body, { required: true, min: 30 });
    rich(p + '.easy', c.easy);
    fig(p + '.fig', c.fig);
    if (c.check === undefined) warn(p + '.check', '이해 확인 문제(check)가 없어요');
    else { stats.checks++; problem(p + '.check', c.check, 'check', concepts.length); }
  });

  (unit.examples || []).forEach((e, i) => {
    const p = 'examples[' + i + ']';
    rich(p + '.q', e && e.q, { required: true });
    fig(p + '.fig', e && e.fig);
    if (!e || !Array.isArray(e.steps) || !e.steps.length) err(p + '.steps', '풀이 단계가 없어요');
    else e.steps.forEach((s, k) => rich(p + '.steps[' + k + ']', s, { required: true }));
    rich(p + '.answer', e && e.answer, { required: true });
  });

  (unit.terms || []).forEach((t, i) => {
    if (!t || !nonEmpty(t.term)) err('terms[' + i + '].term', '용어가 없어요');
    rich('terms[' + i + '].def', t && t.def, { required: true });
  });

  const ids = new Set();
  for (const key of ['practice', 'advanced']) {
    (unit[key] || []).forEach((p, i) => {
      const path = key + '[' + i + ']';
      if (p && p.id !== undefined) {
        if (ids.has(p.id)) err(path + '.id', '문제 id 가 겹쳐요: ' + p.id);
        ids.add(p.id);
      }
      problem(path, p, 'bank', concepts.length);
      if (p && key === 'practice' && p.level === 3) warn(path + '.level', 'practice 에는 level 1·2 를 둬요 (심화는 advanced)');
      if (p && key === 'advanced' && p.level !== 3) warn(path + '.level', 'advanced 는 level 3 이에요');
    });
  }
  const prac = unit.practice || [];
  if (prac.length && prac.filter((p) => p && p.level === 1).length < prac.length / 2) warn('practice', 'level 1(기본) 문제가 절반보다 적어요');

  (unit.deeper || []).forEach((d, i) => { rich('deeper[' + i + '].title', d && d.title, { required: true }); rich('deeper[' + i + '].body', d && d.body, { required: true, min: 30 }); });
  (unit.faq || []).forEach((f, i) => { rich('faq[' + i + '].q', f && f.q, { required: true }); rich('faq[' + i + '].a', f && f.a, { required: true, min: 10 }); });
  (unit.mistakes || []).forEach((m, i) => rich('mistakes[' + i + ']', m, { required: true }));

  /* ---------- 과목별 ---------- */
  const subject = ctx.subject || String(unit.course || '').split('-')[0];
  const gens = Array.isArray(unit.gens) ? unit.gens : [];
  if (subject === 'math') {
    if (gens.length === 0) err('gens', '수학 단원은 문제 생성기가 2개 이상 있어야 해요');
    else if (gens.length === 1) warn('gens', '수학 단원은 문제 생성기 2개 이상을 권장해요');
  }
  if (subject === 'eng') {
    const low = (ctx.grades || []).some((g) => g === 'e3' || g === 'e4');
    const need = low ? 6 : 8;
    if (!Array.isArray(unit.vocab) || unit.vocab.length < need) err('vocab', '영어 단원은 낱말(vocab)이 ' + need + '개 이상 있어야 해요 (지금 ' + ((unit.vocab || []).length) + '개)');
  }
  (unit.vocab || []).forEach((v, i) => {
    const p = 'vocab[' + i + ']';
    if (!v || !nonEmpty(v.w)) err(p + '.w', '낱말이 없어요');
    if (!v || !nonEmpty(v.m)) err(p + '.m', '뜻이 없어요');
    if (v && v.ex !== undefined) rich(p + '.ex', v.ex, { noParticles: true });
    if (v && v.exm !== undefined) rich(p + '.exm', v.exm);
  });
  const wordsSeen = new Set();
  (unit.vocab || []).forEach((v, i) => {
    if (v && nonEmpty(v.w)) {
      const k = v.w.trim().toLowerCase();
      if (wordsSeen.has(k)) warn('vocab[' + i + '].w', '같은 낱말이 두 번 있어요: ' + v.w);
      wordsSeen.add(k);
    }
  });

  /* ---------- 생성기 ---------- */
  const seeds = ctx.seeds || 200;
  const genIds = new Set();
  gens.forEach((g, gi) => {
    const gp = 'gens[' + gi + ']';
    if (!g || typeof g !== 'object') { err(gp, '생성기 객체가 아니에요'); return; }
    stats.gens++;
    if (!nonEmpty(g.id)) err(gp + '.id', 'id 가 없어요');
    else if (genIds.has(g.id)) err(gp + '.id', '생성기 id 가 겹쳐요: ' + g.id);
    genIds.add(g.id);
    if (![1, 2, 3].includes(g.level)) err(gp + '.level', 'level 은 1, 2, 3 중 하나');
    if (!nonEmpty(g.title)) err(gp + '.title', '제목이 없어요');
    if (typeof g.make !== 'function') { err(gp + '.make', 'make(R) 함수가 없어요'); return; }
    const src = g.make.toString();
    if (/Math\.random/.test(src)) err(gp + '.make', 'Math.random 을 쓰면 안 돼요 — R 만 쓰세요(같은 seed → 같은 문제)');
    if (/\bDate\b/.test(src)) err(gp + '.make', 'Date 를 쓰면 안 돼요');
    const keys = new Set();
    let firstErr = 0;
    let throws = 0;
    const throwMsgs = [];
    let slow = 0;
    for (let s = 1; s <= seeds; s++) {
      let p;
      const t0 = Date.now();
      try {
        p = g.make(M.toolkit(s));
      } catch (e) {
        throws++;
        if (throws <= 3) throwMsgs.push('seed ' + s + ': ' + e.message);
        continue;
      }
      if (Date.now() - t0 > 50) slow++;
      stats.genSamples++;
      // 형식·자기 일관성 검사는 처음 몇 개 오류만 보고(같은 오류 수백 줄 방지)
      const before = errors.length;
      problem(gp + ' seed ' + s, p, 'gen', concepts.length);
      if (errors.length - before > 0 && firstErr++ >= 3) errors.length = before;
      if (p && typeof p === 'object') keys.add(String(p.q) + '|' + JSON.stringify(p.answer) + '|' + JSON.stringify(p.choices || ''));
      if (s <= 3) {
        let again;
        try { again = g.make(M.toolkit(s)); } catch (e) { again = null; }
        if (JSON.stringify(again) !== JSON.stringify(p)) err(gp + ' seed ' + s, '같은 seed 인데 다른 문제가 나와요(결정적이어야 해요)');
      }
    }
    if (throws) {
      const msg = seeds + '번 중 ' + throws + '번 생성기가 오류를 냈어요 (' + throwMsgs.join(' / ') + ')';
      if (throws / seeds > 0.02) err(gp, msg);
      else warn(gp, msg + ' — 드물어서 화면은 다른 seed 로 다시 만들어요. 그래도 고치는 것이 좋아요');
    }
    if (keys.size < 3) err(gp, seeds + '번 중 서로 다른 문제가 ' + keys.size + '개뿐이에요');
    else if (keys.size < 20) warn(gp, seeds + '번 중 서로 다른 문제가 ' + keys.size + '개 — 범위를 넓혀 보세요');
    if (slow) warn(gp, '한 번 만드는 데 50ms 넘게 걸린 경우 ' + slow + '번');
  });
  // 생성기 경고는 seed 마다 같은 것이 반복된다 — 같은 (칸 경로에서 seed 를 뺀 것, 메시지) 는 하나로
  const seenW = new Set();
  const dedup = [];
  for (const w of warnings) {
    const k = w.path.replace(/ seed \d+/, ' seed *') + '|' + w.msg.replace(/"[^"]*"/g, '"…"');
    if (!seenW.has(k)) { seenW.add(k); dedup.push(w); }
  }
  return { errors, warnings: dedup, stats };
}

module.exports = { checkUnit, RANGES };
