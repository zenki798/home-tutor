/* 비밀 인증정보·개인정보 패턴 (AGENTS.md 규칙 2·6)
 *
 *   scanText(text) → [{ kind: 'secret'|'pii'|'path', rule, line, sample }]
 *
 * sample 은 찾은 값을 그대로 보여 주지 않고 앞뒤 몇 글자만 남긴다(보고서·로그에 비밀이 다시 새지 않게).
 * 오탐을 일부러 허용해야 하는 줄에는 "scan-secrets: allow" 를 적는다(검사기 자체의 시험 등 — 최소한으로).
 */
'use strict';

// 비밀 인증정보: 이런 모양이면 진짜 값일 가능성이 높다
const SECRET_RULES = [
  ['OpenAI·Anthropic 등 sk- 키', /\bsk-(?:proj-|svcacct-|admin-|ant-)?[A-Za-z0-9_-]{20,}/g],
  ['Google API 키', /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ['Google OAuth 클라이언트 시크릿', /\bGOCSPX-[0-9A-Za-z_-]{20,}/g],
  ['Google OAuth 토큰', /\bya29\.[0-9A-Za-z_-]{20,}/g],
  ['GitHub 토큰', /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b/g],
  ['GitHub 세분화 토큰', /\bgithub_pat_[A-Za-z0-9_]{40,}\b/g],
  ['Slack 토큰', /\bxox[abposr]-[A-Za-z0-9-]{10,}/g],
  ['AWS 액세스 키', /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g],
  ['Hugging Face 토큰', /\bhf_[A-Za-z0-9]{30,}\b/g],
  ['개인키', /-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/g],
  ['JWT 토큰', /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{8,}/g],
  ['Bearer 토큰', /\bBearer\s+[A-Za-z0-9._~+/-]{20,}=*/g],
  ['Basic 인증 값', /\bBasic\s+[A-Za-z0-9+/]{20,}={0,2}/g],
  ['주소에 박힌 아이디:비밀번호', /\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@"'`]+:[^\s/:@"'`]+@/gi],
  ['비밀값 대입', /\b(?:api[_-]?key|apikey|secret|client[_-]?secret|password|passwd|pwd|access[_-]?token|refresh[_-]?token|auth[_-]?token|session[_-]?token|private[_-]?key)\b["']?\s*[:=]\s*["'][^"'\s]{8,}["']/gi],
];

// 개인정보: 실제 사람의 연락처·식별번호처럼 보이는 것 (예시는 더미만 쓴다: hong@example.com, 010-0000-0000)
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const EMAIL_ALLOW = [
  /@example\.(?:com|org|net)$/i,
  /@[a-z0-9-]+\.example$/i,
  /@users\.noreply\.github\.com$/i,
  /^noreply@github\.com$/i,
  /^noreply@anthropic\.com$/i,
];
const PII_RULES = [
  ['휴대전화 번호', /(?<![\d-])01[016789][-. ]?\d{3,4}[-. ]?\d{4}(?![\d-])/g, (m) => /^010[-. ]?0000[-. ]?0000$/.test(m)],
  ['유선 전화번호', /(?<![\d-])0(?:2|[3-6][1-5])-\d{3,4}-\d{4}(?![\d-])/g, (m) => /-0000-0000$/.test(m)],
  ['주민등록번호', /(?<!\d)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])-[1-4]\d{6}(?!\d)/g],
  ['카드번호', /(?<!\d)(?:\d{4}[- ]){3}\d{4}(?!\d)/g, (m) => !luhn(m.replace(/\D/g, ''))],
];
// 로컬 사용자 경로: C:\Users\<이름>\…, /c/Users/<이름>/… (사번·실명이 들어간다)
const PATH_RULES = [
  ['로컬 사용자 경로', /\b[A-Za-z]:[\\/]{1,2}Users[\\/]{1,2}(?!Public\b|Default\b|<|\{|\$|%|USER)[^\\/\s"'`<>]+/gi],
  ['로컬 사용자 경로', /\/[a-z]\/Users\/(?!Public\b|Default\b|<|\{|\$)[^/\s"'`<>]+/gi],
];

function luhn(digits) {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = digits.charCodeAt(digits.length - 1 - i) - 48;
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return digits.length >= 13 && sum % 10 === 0;
}

function mask(s) {
  s = String(s);
  if (s.length <= 8) return s.slice(0, 2) + '…';
  return s.slice(0, 6) + '…' + s.slice(-2) + ' (' + s.length + '자)';
}

function scanText(text) {
  const out = [];
  if (typeof text !== 'string' || !text) return out;
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.includes('scan-secrets: allow')) return;
    for (const [rule, re] of SECRET_RULES) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line))) out.push({ kind: 'secret', rule, line: i + 1, sample: mask(m[0]) });
    }
    EMAIL_RE.lastIndex = 0;
    let em;
    while ((em = EMAIL_RE.exec(line))) {
      const addr = em[0];
      if (EMAIL_ALLOW.some((r) => r.test(addr))) continue;
      out.push({ kind: 'pii', rule: '이메일 주소', line: i + 1, sample: mask(addr) });
    }
    for (const [rule, re, allow] of PII_RULES) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line))) {
        if (allow && allow(m[0])) continue;
        out.push({ kind: 'pii', rule, line: i + 1, sample: mask(m[0]) });
      }
    }
    for (const [rule, re] of PATH_RULES) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line))) out.push({ kind: 'path', rule, line: i + 1, sample: mask(m[0]) });
    }
  });
  return out;
}

module.exports = { scanText, SECRET_RULES, PII_RULES, EMAIL_ALLOW };
