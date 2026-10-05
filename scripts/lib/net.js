/* 저장소 관리 도구가 공개 공식 자료를 읽을 때 쓰는 내려받기 (사이트·학생 기기는 쓰지 않는다)
 *   - 자기 이름(UA)을 밝힌다. 로그인·쿠키·비밀(secrets)·학생 정보는 보내지 않는다 — 공개 페이지를 읽기만 한다.
 *   - robots.txt 를 지킨다(RFC 9309: 2xx 는 규칙대로, 읽을 수 없는 4xx 는 제한 없음, 5xx·연결 실패는 막힌 것으로).
 */
'use strict';

const UA = 'home-tutor-curriculum-watch/1.0 (+https://github.com/zenki798/home-tutor)';

async function fetchRes(url, init) {
  const o = Object.assign({ redirect: 'follow' }, init || {});
  o.headers = Object.assign({ 'User-Agent': UA, 'Accept-Language': 'ko' }, (init && init.headers) || {});
  return fetch(url, o);
}
async function get(url) {
  const res = await fetchRes(url);
  if (!res.ok) throw new Error(url + ' → HTTP ' + res.status);
  return res.text();
}
async function getBuffer(url) {
  const res = await fetchRes(url);
  if (!res.ok) throw new Error(url + ' → HTTP ' + res.status);
  return Buffer.from(await res.arrayBuffer());
}
// 공개 페이지가 화면 조각을 POST 로 받아 오는 곳(국가법령정보센터) — 양식 값만 보낸다
async function post(url, form) {
  const res = await fetchRes(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' },
    body: new URLSearchParams(form).toString(),
  });
  if (!res.ok) throw new Error(url + ' → HTTP ' + res.status);
  return res.text();
}

// robots.txt: User-agent: * 묶음의 Disallow 로 이 경로가 막혔는가
function robotsDisallows(robots, pathname) {
  let star = false;
  const rules = [];
  for (const raw of String(robots || '').split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1].toLowerCase();
    if (key === 'user-agent') star = m[2].trim() === '*';
    else if (star && key === 'disallow' && m[2].trim()) rules.push(m[2].trim());
  }
  return rules.some((r) => pathname.startsWith(r));
}

// RFC 9309: 2xx 면 규칙대로, 4xx(읽을 수 없음)면 제한 없음, 5xx·연결 실패면 막힌 것으로 본다
function robotsVerdict(status, text, pathname) {
  if (status === 0 || status >= 500) return false;
  if (status >= 400) return true;
  return !robotsDisallows(text, pathname);
}

const robotsCache = new Map();
async function robotsAllowed(origin, pathname) {
  if (!robotsCache.has(origin)) {
    let v;
    try {
      const res = await fetchRes(origin + '/robots.txt');
      v = { status: res.status, text: res.ok ? await res.text() : '' };
    } catch (e) { v = { status: 0, text: '' }; }
    robotsCache.set(origin, v);
  }
  const r = robotsCache.get(origin);
  return robotsVerdict(r.status, r.text, pathname);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = { UA, fetchRes, get, getBuffer, post, robotsDisallows, robotsVerdict, robotsAllowed, sleep };
