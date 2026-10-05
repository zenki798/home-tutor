const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/*
 * 화면 말투 지키기 — js/app.js 의 say({ e, m, h }) 는 학생 학교급에 맞는 말을 고른다(e 초등 해요체, m 중등 해요체, h 고등 이상 합니다체).
 * m 칸이 빠지면 중학생에게 h(합니다체)가 간다(say 의 대신 고르기 순서). 실제로 두 번 놓쳤던 실수라 검사로 막는다.
 */
function sayObjects(src) {
  const out = [];
  let i = 0;
  while ((i = src.indexOf('say({', i)) >= 0) {
    let d = 0;
    let j = i + 4;
    for (; j < src.length; j++) {
      const ch = src[j];
      if (ch === '{') d++;
      else if (ch === '}') { d--; if (d === 0) break; }
    }
    out.push({ line: src.slice(0, i).split('\n').length, body: src.slice(i, j + 1) });
    i = j;
  }
  return out;
}
const hasKey = (body, k) => new RegExp('(^|[{,\\s])' + k + ':').test(body);

test('말투 검사기는 m 칸이 빠진 say 를 찾아낸다', () => {
  const found = sayObjects("var a = say({ e: '해요', h: '합니다' }); var b = say({ e: 'x', m: 'y', h: 'z' }); var c = say({ m: '중', h: '고' });")
    .filter((o) => hasKey(o.body, 'e') && hasKey(o.body, 'h') && !hasKey(o.body, 'm'));
  expect(found).toHaveLength(1);
  expect(found[0].body).toContain("e: '해요'");
});

test('js/app.js: 초등(e)·고등(h) 말을 둔 say 는 중학생(m) 말도 둔다', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'app.js'), 'utf8');
  const all = sayObjects(src);
  expect(all.length).toBeGreaterThan(30); // 검사기가 실제로 say 를 찾았는지(2026-10 기준 43개)
  const missing = all.filter((o) => hasKey(o.body, 'e') && hasKey(o.body, 'h') && !hasKey(o.body, 'm'));
  expect(missing.map((o) => o.line + ': ' + o.body.replace(/\s+/g, ' ').slice(0, 80))).toEqual([]);
});
