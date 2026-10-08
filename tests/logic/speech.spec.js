const { test, expect } = require('@playwright/test');
const path = require('path');

/*
 * 읽어 주기 글 만들기 — js/speech.js (순수 함수)
 *   서식 글(마크다운 일부 + $TeX$)을 소리 내어 읽기 좋은 한국어로: 분수·사칙연산·관계(은/는 …보다)·거듭제곱·근호·도·퍼센트.
 *   목소리는 이 기기 안의 한국어 목소리(localService)만 — 인터넷 목소리는 글을 밖으로 보내므로 고르지 않는다.
 */
const SP = require(path.join(__dirname, '..', '..', 'js', 'speech.js'));
const say = SP.toSpeech;

test('분수·대분수·사칙연산·등호(받침에 맞는 은/는)', () => {
  expect(say('$\\frac{3}{4}$')).toBe('4분의 3');
  expect(say('$2\\frac{1}{3}$')).toBe('2와 3분의 1');
  expect(say('$3\\dfrac{1}{2}$')).toBe('3과 2분의 1');
  expect(say('$\\dfrac{1}{2}+\\dfrac{1}{3}=\\dfrac{5}{6}$')).toBe('2분의 1 더하기 3분의 1은 6분의 5');
  expect(say('$2+3=5$')).toBe('2 더하기 3은 5');
  expect(say('$7 \\times 8 = 56$')).toBe('7 곱하기 8은 56');
  expect(say('$12 \\div 4 = 3$')).toBe('12 나누기 4는 3');
  expect(say('$y = 2x + 1$')).toBe('y는 2x 더하기 1');
  expect(say('$m=3$')).toBe('m은 3');
  expect(say('3/4 ÷ 2/5')).toBe('4분의 3 나누기 5분의 2'); // 수식 칸 밖의 분수·기호도
});

test('빼기와 음수, 부등호, 거듭제곱·근호·도·퍼센트·선분', () => {
  expect(say('$x^2-5x+6=0$')).toBe('x 제곱 빼기 5x 더하기 6은 0');
  expect(say('$-3$')).toBe('마이너스 3');
  expect(say('$x<-2$')).toBe('x는 마이너스 2보다 작다');
  expect(say('$a>b$')).toBe('a는 b보다 크다');
  expect(say('$x \\le 3$')).toBe('x는 3보다 작거나 같다');
  expect(say('$a \\ne b$')).toBe('a는 b와 같지 않다');
  expect(say('$2^{10}$')).toBe('2의 10제곱');
  expect(say('$x^3$')).toBe('x 세제곱');
  expect(say('$\\sqrt{16}=4$')).toBe('루트 16은 4');
  expect(say('$\\sqrt[3]{8} = 2$')).toBe('세제곱근 8은 2');
  expect(say('$90^\\circ$')).toBe('90도');
  expect(say('$50\\%$')).toBe('50퍼센트');
  expect(say('$\\overline{AB}$ 의 길이')).toBe('선분 AB 의 길이');
  expect(say('$\\text{넓이} = 3 \\times 4$')).toBe('넓이는 3 곱하기 4');
  // 기호만 늘어놓으면 기호 이름으로, 왼쪽이 비면 "…보다 크다"
  expect(say('부등호 $<, >, \\le, \\ge$ 로')).toBe('부등호 작다, 크다, 작거나 같다, 크거나 같다 로');
  expect(say('$=$ 표시')).toBe('같다 표시');
  expect(say('(일차식) $> 0$')).toBe('일차식 0보다 크다');
  // 식을 조각마다: ⇒ 는 "그러면", 쉼표로 나뉜 식은 따로
  expect(say('$2x+3>7 \\Rightarrow 2x>4 \\Rightarrow x>2$')).toBe('2x 더하기 3은 7보다 크다. 그러면 2x는 4보다 크다. 그러면 x는 2보다 크다');
  expect(say('$x+y=5, x-y=1$')).toBe('x 더하기 y는 5, x 빼기 y는 1');
  expect(say('$1,000$원')).toBe('1,000 원');
  // 별표 첨자는 '스타', 수식 안 * 는 화면처럼 곱하기
  expect(say('$x^*$')).toBe('x 스타');
  expect(say('$P^{*}$')).toBe('P 스타');
  expect(say('$2*3$')).toBe('2 곱하기 3');
  // 제목 끝의 물음표 뒤에 마침표를 덧붙이지 않는다
  expect(say('부등식이란?\n\n수나 식의 크기')).toBe('부등식이란? 수나 식의 크기');
});

test('마크다운: 굵게·밑줄·빈칸·목록·인용·표는 글만, 그림 글자(이모지)는 읽지 않는다', () => {
  expect(say('**용질**이에요. [[빈칸]] 에 알맞은 말')).toBe('용질이에요. 빈칸 에 알맞은 말');
  expect(say('__밑줄__ 친 말')).toBe('밑줄 친 말');
  expect(say('[[?]] 에 들어갈 수')).toBe('물음표 에 들어갈 수');
  expect(say('- 첫째\n- 둘째')).toBe('첫째. 둘째');
  expect(say('1. 하나\n2. 둘')).toBe('하나. 둘');
  expect(say('> 💡 팁: 받침이 있으면 **을**')).toBe('팁: 받침이 있으면 을');
  expect(say('| 가 | 나 |\n|---|---|\n| 1 | 2 |')).toBe('가, 나. 1, 2');
  expect(say('### 정리\n덧셈은 모으기')).toBe('정리. 덧셈은 모으기');
  expect(say('')).toBe('');
  expect(say(null)).toBe('');
});

test('이상한 입력에도 죽지 않는다', () => {
  for (const bad of ['$', '$$', '$\\frac{1}$', '$\\sqrt$', '$x^$', '{{{', '\\', '$\\unknown{x}$', 12345, {}, '$' + 'a+'.repeat(2000) + '$']) {
    expect(() => say(bad)).not.toThrow();
  }
  expect(say('$\\unknown{x}$')).toBe('x');
});

test('목소리 고르기: 이 기기 안의 한국어 목소리만, 기본 목소리 먼저', () => {
  const v = (name, lang, local, def) => ({ name, lang, localService: local, default: !!def });
  expect(SP.pickVoice([v('구글 한국의', 'ko-KR', false), v('영어', 'en-US', true, true)])).toBeNull();
  expect(SP.pickVoice([v('인터넷', 'ko-KR', false, true), v('기기 1', 'ko-KR', true), v('기기 2', 'ko_KR', true, true)]).name).toBe('기기 2');
  expect(SP.pickVoice([v('기기', 'ko', true)]).name).toBe('기기');
  expect(SP.pickVoice([v('코사어', 'kok-IN', true)])).toBeNull(); // ko 로 시작해도 다른 언어
  expect(SP.pickVoice(null)).toBeNull();
  expect(SP.pickVoice([null, {}, v('기기', 'KO-kr', true)]).name).toBe('기기');
});
