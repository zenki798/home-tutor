/* 미적분학 · 적분 기법
 * 부분적분의 반복(표 방법)과 되돌아오는 적분, 삼각함수의 거듭제곱, 삼각치환, 부분분수 분해, 수치적분(사다리꼴·심프슨). */
(function () {
  // 일차식 인수 (x-a) → TeX. a=0 이면 x
  function lin(a) {
    if (a === 0) return 'x';
    return 'x' + (a > 0 ? '-' + a : '+' + (-a));
  }
  function plin(a) { return a === 0 ? 'x' : '(' + lin(a) + ')'; }
  function binom(n, k) {
    var r = 1, i;
    for (i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return Math.round(r);
  }
  // 표의 수(정수·소수) 글자
  function dnum(R, v) { return R.fmt.dec(v, 4); }

  Tutor.registerUnit({
    id: 'math-u-calc-05',
    course: 'math-u-calc',
    title: '적분 기법',
    summary: '부분적분의 반복, 삼각함수의 거듭제곱, 삼각치환, 부분분수 분해로 여러 가지 적분을 계산하고, 사다리꼴 공식과 심프슨 공식으로 정적분의 근삿값을 구합니다.',
    goals: [
      '부분적분을 반복하거나 되돌아오는 적분을 방정식처럼 풀어 적분할 수 있다.',
      '삼각함수의 거듭제곱과 삼각치환이 필요한 적분을 계산할 수 있다.',
      '유리함수를 부분분수로 분해하여 적분할 수 있다.',
      '사다리꼴 공식과 심프슨 공식으로 정적분의 근삿값을 구하고 오차 한계를 말할 수 있다.',
    ],
    standards: [],

    concepts: [
      {
        title: '부분적분의 반복과 표 방법',
        body: '부분적분 $\\int u\\,dv=uv-\\int v\\,du$는 미분하면 간단해지는 $u$와 적분하기 쉬운 $dv$를 골라 적분을 바꾸는 방법입니다. $u$가 $n$차 다항식이면 한 번 할 때마다 차수가 하나씩 내려가므로 $n$번 반복하면 다항식이 사라집니다.\n\n' +
          '예: $\\int x^2e^x\\,dx$에서 $u=x^2$, $dv=e^x\\,dx$로 놓으면\n\n' +
          '$\\int x^2e^x\\,dx=x^2e^x-\\int 2xe^x\\,dx=x^2e^x-\\left(2xe^x-\\int 2e^x\\,dx\\right)=e^x(x^2-2x+2)+C$\n\n' +
          '반복이 길어지면 **표 방법**이 편합니다. 왼쪽 열에는 $u$를 계속 미분한 것을, 오른쪽 열에는 $dv$를 계속 적분한 것을 적고, 같은 행끼리 곱하면서 부호를 $+,-,+,\\cdots$로 번갈아 붙입니다. 왼쪽이 $0$이 되면 멈춥니다.\n\n' +
          '| 미분하는 쪽 | 적분하는 쪽 | 부호 |\n|---|---|---|\n| $x^2$ | $e^x$ | $+$ |\n| $2x$ | $e^x$ | $-$ |\n| $2$ | $e^x$ | $+$ |\n\n' +
          '세 곱을 부호대로 더하면 $x^2e^x-2xe^x+2e^x$입니다.\n\n' +
          '> 💡 $u$를 고르는 어림 규칙으로 **로그 → 역삼각 → 다항(대수) → 삼각 → 지수** 순서(LIATE)가 흔히 쓰입니다. 앞에 있는 것을 $u$로 둡니다.',
        easy: '부분적분을 한 번 하면 "곱셈 적분"이 "조금 더 쉬운 곱셈 적분"으로 바뀝니다. $x^2e^x$이 $2xe^x$이 되고, 또 하면 $2e^x$이 됩니다. 다항식 쪽이 미분될 때마다 계단을 하나씩 내려가다가 상수가 되면 끝나는 셈입니다.\n\n' +
          '표 방법은 이 계단을 한눈에 정리한 것입니다. 왼쪽은 "미분 계단", 오른쪽은 "적분 계단"이고, 같은 줄을 곱해 $+,-,+$ 부호를 차례로 붙이면 답이 나옵니다.',
        check: {
          type: 'choice',
          q: '$\\int x^2e^x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
          choices: ['$e^x(x^2-2x+2)+C$', '$e^x(x^2+2x+2)+C$', '$x^2e^x-2xe^x+C$'],
          answer: 0,
          why: [
            '',
            '부호를 번갈아 붙이지 않았습니다. 부분적분을 할 때마다 빼기가 들어가므로 $+,-,+$ 순서입니다.',
            '부분적분을 한 번 덜 했습니다. $\\int 2e^x\\,dx=2e^x$이 남아 있습니다.',
          ],
          explain: '표 방법으로 $x^2\\cdot e^x-2x\\cdot e^x+2\\cdot e^x$이므로 $e^x(x^2-2x+2)+C$입니다. 미분해 보면 $e^x(x^2-2x+2)+e^x(2x-2)=x^2e^x$으로 확인됩니다.',
        },
      },
      {
        title: '되돌아오는 적분',
        body: '$\\int e^x\\sin x\\,dx$는 부분적분을 아무리 해도 다항식처럼 사라지는 쪽이 없습니다. 대신 두 번 하면 **처음 적분이 다시 나타나고**, 이것을 방정식처럼 풉니다.\n\n' +
          '$I=\\int e^x\\sin x\\,dx$라 하고 $u=\\sin x$, $dv=e^x\\,dx$로 놓으면\n\n' +
          '$I=e^x\\sin x-\\int e^x\\cos x\\,dx$\n\n' +
          '다시 $u=\\cos x$, $dv=e^x\\,dx$로 놓으면 $\\int e^x\\cos x\\,dx=e^x\\cos x+\\int e^x\\sin x\\,dx=e^x\\cos x+I$이므로\n\n' +
          '$I=e^x\\sin x-e^x\\cos x-I \\quad\\Rightarrow\\quad 2I=e^x(\\sin x-\\cos x)$\n\n' +
          '$\\int e^x\\sin x\\,dx=\\dfrac{1}{2}e^x(\\sin x-\\cos x)+C$\n\n' +
          '같은 방법으로 일반적인 공식을 얻습니다.\n\n' +
          '$\\int e^{ax}\\sin bx\\,dx=\\dfrac{e^{ax}(a\\sin bx-b\\cos bx)}{a^2+b^2}+C,\\quad \\int e^{ax}\\cos bx\\,dx=\\dfrac{e^{ax}(a\\cos bx+b\\sin bx)}{a^2+b^2}+C$\n\n' +
          '> ⚠️ 두 번째 부분적분에서도 **같은 종류**(여기서는 지수함수)를 $dv$로 둡니다. 두 번째에 $e^x$을 미분하는 쪽으로 바꾸면 첫 번째 계산이 그대로 되돌려져 $I=I$라는 쓸모없는 식이 나옵니다.',
        easy: '거울 두 개를 마주 세운 것과 비슷합니다. $\\sin$를 미분하면 $\\cos$, $\\cos$를 미분하면 다시 $-\\sin$가 되고, $e^x$은 적분해도 $e^x$이므로 두 번 만에 처음 모양 $e^x\\sin x$가 돌아옵니다.\n\n' +
          '돌아온 것을 "모르는 수 $I$"로 보고 $I=(\\text{식})-I$를 풀면 됩니다. $2I=(\\text{식})$이니 마지막에 2로 나누는 것을 잊지 마십시오.',
        check: {
          type: 'choice',
          q: '부분적분을 두 번 하여 $I=e^x\\sin x-e^x\\cos x-I$를 얻었습니다. $I=\\int e^x\\sin x\\,dx$는 무엇입니까?',
          choices: ['$e^x(\\sin x-\\cos x)+C$', '$\\dfrac{1}{2}e^x(\\sin x-\\cos x)+C$', '$\\dfrac{1}{2}e^x(\\sin x+\\cos x)+C$'],
          answer: 1,
          why: [
            '$2I=e^x(\\sin x-\\cos x)$에서 2로 나누는 것을 빠뜨렸습니다.',
            '',
            '부호가 바뀌었습니다. 식에서 $e^x\\cos x$ 앞의 부호는 $-$입니다.',
          ],
          explain: '$I$를 왼쪽으로 옮기면 $2I=e^x(\\sin x-\\cos x)$이므로 $I=\\dfrac{1}{2}e^x(\\sin x-\\cos x)+C$입니다.',
        },
      },
      {
        title: '삼각함수의 거듭제곱의 적분',
        body: '$\\int\\sin^m x\\cos^n x\\,dx$는 지수가 홀수인지 짝수인지에 따라 방법을 고릅니다.\n\n' +
          '| 경우 | 방법 |\n|---|---|\n| $\\cos$의 지수 $n$이 홀수 | $\\cos x$ 하나를 떼어 두고 나머지를 $\\cos^2x=1-\\sin^2x$로 바꾼 뒤 $u=\\sin x$ |\n| $\\sin$의 지수 $m$이 홀수 | $\\sin x$ 하나를 떼어 두고 나머지를 $\\sin^2x=1-\\cos^2x$로 바꾼 뒤 $u=\\cos x$ |\n| 둘 다 짝수 | 반각 공식 $\\sin^2x=\\dfrac{1-\\cos 2x}{2}$, $\\cos^2x=\\dfrac{1+\\cos 2x}{2}$로 차수를 낮춤 |\n\n' +
          '예: $\\int\\sin^3x\\,dx=\\int(1-\\cos^2x)\\sin x\\,dx$에서 $u=\\cos x$, $du=-\\sin x\\,dx$이므로\n\n' +
          '$-\\int(1-u^2)\\,du=-u+\\dfrac{u^3}{3}+C=-\\cos x+\\dfrac{1}{3}\\cos^3x+C$\n\n' +
          '예: $\\int\\cos^2x\\,dx=\\int\\dfrac{1+\\cos 2x}{2}\\,dx=\\dfrac{x}{2}+\\dfrac{\\sin 2x}{4}+C$\n\n' +
          '$\\tan$와 $\\sec$의 거듭제곱은 $(\\tan x)\'=\\sec^2x$, $(\\sec x)\'=\\sec x\\tan x$와 $\\tan^2x=\\sec^2x-1$을 씁니다. $\\sec$의 지수가 짝수이면 $\\sec^2x$를 떼어 $u=\\tan x$, $\\tan$의 지수가 홀수이면 $\\sec x\\tan x$를 떼어 $u=\\sec x$로 놓습니다.\n\n' +
          '- $\\int\\tan^2x\\,dx=\\int(\\sec^2x-1)\\,dx=\\tan x-x+C$\n' +
          '- $\\int\\sec x\\,dx=\\ln|\\sec x+\\tan x|+C$ (분자·분모에 $\\sec x+\\tan x$를 곱하면 분자가 분모의 도함수가 됩니다)',
        easy: '핵심은 "치환할 때 $du$가 될 짝을 하나 남겨 두기"입니다. $u=\\sin x$로 치환하려면 $du=\\cos x\\,dx$가 필요하니 $\\cos x$를 하나 떼어 둡니다. 나머지 $\\cos$는 짝수 개이므로 $\\cos^2x=1-\\sin^2x$로 모두 $\\sin$로 바꿀 수 있습니다.\n\n' +
          '홀수 지수가 하나도 없으면 떼어 둘 짝이 없으니, 반각 공식으로 제곱을 없애 차수를 반으로 줄입니다.',
        check: {
          type: 'choice',
          q: '$\\int\\sin^4x\\cos^3x\\,dx$를 계산하는 가장 알맞은 첫걸음은 무엇입니까?',
          choices: ['$\\cos x$ 하나를 떼고 $u=\\sin x$로 치환한다', '$\\sin x$ 하나를 떼고 $u=\\cos x$로 치환한다', '반각 공식으로 $\\sin^4x$와 $\\cos^3x$의 차수를 낮춘다'],
          answer: 0,
          why: [
            '',
            '$\\sin$의 지수 4는 짝수라서 하나를 떼면 $\\sin^3x$가 남고, 이것은 $\\cos$로 깔끔하게 바꿀 수 없습니다.',
            '반각 공식은 두 지수가 모두 짝수일 때 씁니다. 여기서는 $\\cos$의 지수가 홀수입니다.',
          ],
          explain: '$\\cos$의 지수 3이 홀수이므로 $\\cos x$ 하나를 떼고 $\\cos^2x=1-\\sin^2x$로 바꿉니다. $u=\\sin x$로 놓으면 $\\int u^4(1-u^2)\\,du$가 되어 다항식 적분이 됩니다.',
        },
      },
      {
        title: '삼각치환',
        body: '$\\sqrt{a^2-x^2}$, $\\sqrt{a^2+x^2}$, $\\sqrt{x^2-a^2}$ $(a>0)$이 들어 있는 적분은 피타고라스 항등식으로 근호를 없앨 수 있도록 $x$를 삼각함수로 바꿉니다.\n\n' +
          '| 식 | 치환 | 쓰는 항등식 |\n|---|---|---|\n| $\\sqrt{a^2-x^2}$ | $x=a\\sin\\theta$, $-\\dfrac{\\pi}{2}\\le\\theta\\le\\dfrac{\\pi}{2}$ | $1-\\sin^2\\theta=\\cos^2\\theta$ |\n| $\\sqrt{a^2+x^2}$ | $x=a\\tan\\theta$, $-\\dfrac{\\pi}{2}<\\theta<\\dfrac{\\pi}{2}$ | $1+\\tan^2\\theta=\\sec^2\\theta$ |\n| $\\sqrt{x^2-a^2}$ | $x=a\\sec\\theta$, $0\\le\\theta<\\dfrac{\\pi}{2}$ 또는 $\\pi\\le\\theta<\\dfrac{3\\pi}{2}$ | $\\sec^2\\theta-1=\\tan^2\\theta$ |\n\n' +
          'θ의 범위를 이렇게 정하면 근호를 벗길 때 절댓값이 필요 없습니다. 예를 들어 $x=a\\sin\\theta$이면 $\\cos\\theta\\ge 0$이어서 $\\sqrt{a^2-x^2}=a\\cos\\theta$입니다.\n\n' +
          '예: $\\int\\dfrac{dx}{x^2\\sqrt{9-x^2}}$에서 $x=3\\sin\\theta$로 놓으면 $dx=3\\cos\\theta\\,d\\theta$, $\\sqrt{9-x^2}=3\\cos\\theta$이므로\n\n' +
          '$\\int\\dfrac{3\\cos\\theta}{9\\sin^2\\theta\\cdot 3\\cos\\theta}\\,d\\theta=\\dfrac{1}{9}\\int\\csc^2\\theta\\,d\\theta=-\\dfrac{1}{9}\\cot\\theta+C$\n\n' +
          '$x$로 되돌릴 때는 $\\sin\\theta=\\dfrac{x}{3}$인 직각삼각형(빗변 3, 높이 $x$, 밑변 $\\sqrt{9-x^2}$)을 그리면 $\\cot\\theta=\\dfrac{\\sqrt{9-x^2}}{x}$이므로 답은 $-\\dfrac{\\sqrt{9-x^2}}{9x}+C$입니다.',
        easy: '$\\sqrt{9-x^2}$은 빗변이 3이고 한 변이 $x$인 직각삼각형의 나머지 변입니다. 그림처럼 각 θ를 잡으면 $x=3\\sin\\theta$, 나머지 변은 $3\\cos\\theta$가 되어 근호가 사라집니다.\n\n' +
          '세 가지 경우 모두 "근호 안의 식을 직각삼각형의 한 변으로 보기"입니다. 빗변이 $a$이면 $\\sin$, 두 직각변이 $a$와 $x$이면 $\\tan$, 빗변이 $x$이면 $\\sec$로 치환합니다.',
        fig: {
          type: 'polygon',
          points: [[0, 0], [4, 0], [4, 3]],
          sides: ['√(9−x²)', 'x', '3'],
          angles: [{ at: 0, label: 'θ' }, { at: 1, right: true }],
          alt: '빗변이 3, 각 θ의 맞은편 변이 x, 밑변이 √(9−x²)인 직각삼각형',
        },
        check: {
          type: 'choice',
          q: '$\\int\\dfrac{dx}{\\sqrt{x^2+16}}$를 계산할 때 알맞은 치환은 무엇입니까?',
          choices: ['$x=4\\sin\\theta$', '$x=4\\sec\\theta$', '$x=4\\tan\\theta$'],
          answer: 2,
          why: [
            '$x=4\\sin\\theta$는 $\\sqrt{16-x^2}$ 꼴에 씁니다. $16+x^2$에서는 근호가 사라지지 않습니다.',
            '$x=4\\sec\\theta$는 $\\sqrt{x^2-16}$ 꼴에 씁니다.',
            '',
          ],
          explain: '$x=4\\tan\\theta$로 놓으면 $x^2+16=16(\\tan^2\\theta+1)=16\\sec^2\\theta$이므로 $\\sqrt{x^2+16}=4\\sec\\theta$가 되어 근호가 없어집니다.',
        },
      },
      {
        title: '부분분수 분해',
        body: '다항식의 몫 $\\dfrac{P(x)}{Q(x)}$를 **유리함수**라 합니다. 유리함수는 더 간단한 분수(**부분분수**)의 합으로 나누어 적분합니다.\n\n' +
          '1. $P$의 차수가 $Q$의 차수와 같거나 크면 먼저 나눗셈을 하여 (다항식) + (진분수식)으로 만듭니다.\n' +
          '2. $Q$를 일차식과 (실수 범위에서 더 인수분해되지 않는) 이차식의 곱으로 인수분해합니다.\n' +
          '3. 인수마다 다음 꼴의 항을 둡니다.\n\n' +
          '| 분모의 인수 | 부분분수의 항 |\n|---|---|\n| $x-a$ | $\\dfrac{A}{x-a}$ |\n| $(x-a)^k$ | $\\dfrac{A_1}{x-a}+\\dfrac{A_2}{(x-a)^2}+\\cdots+\\dfrac{A_k}{(x-a)^k}$ |\n| $x^2+bx+c$ (판별식 $<0$) | $\\dfrac{Bx+C}{x^2+bx+c}$ |\n\n' +
          '예: $\\dfrac{x+5}{(x-1)(x+2)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+2}$에서 분모를 없애면 $x+5=A(x+2)+B(x-1)$입니다. $x=1$을 넣으면 $6=3A$, $x=-2$를 넣으면 $3=-3B$이므로 $A=2$, $B=-1$입니다.\n\n' +
          '$\\int\\dfrac{x+5}{(x-1)(x+2)}\\,dx=2\\ln|x-1|-\\ln|x+2|+C$\n\n' +
          '> 💡 서로 다른 일차식 인수만 있으면 **가리기 방법**이 빠릅니다. $A$를 구할 때는 원래 식에서 $(x-1)$을 손으로 가리고 남은 $\\dfrac{x+5}{x+2}$에 $x=1$을 넣으면 $A=\\dfrac{6}{3}=2$입니다.',
        easy: '분수의 덧셈을 거꾸로 하는 것입니다. $\\dfrac{2}{x-1}-\\dfrac{1}{x+2}$을 통분하면 $\\dfrac{x+5}{(x-1)(x+2)}$가 됩니다. 부분분수 분해는 합쳐진 분수를 보고 "원래 어떤 분수 둘을 더했을까?"를 찾는 일입니다.\n\n' +
          '조각으로 나누고 나면 $\\int\\dfrac{A}{x-a}\\,dx=A\\ln|x-a|$처럼 하나하나는 쉽게 적분됩니다.',
        check: {
          type: 'short', check: 'number',
          q: '$\\dfrac{3}{(x-1)(x+2)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+2}$일 때, $B$의 값을 구하십시오.',
          answer: '-1',
          wrong: [{ a: '1', why: '부호를 놓쳤습니다. $3=A(x+2)+B(x-1)$에 $x=-2$를 넣으면 $3=-3B$이므로 $B=-1$입니다.' }],
          explain: '$3=A(x+2)+B(x-1)$에 $x=-2$를 넣으면 $3=-3B$이므로 $B=-1$입니다. ($x=1$을 넣으면 $A=1$입니다.)',
        },
      },
      {
        title: '수치적분: 사다리꼴 공식과 심프슨 공식',
        body: '$e^{-x^2}$처럼 원시함수를 식으로 쓸 수 없는 함수나, 표로만 주어진 자료의 정적분은 근삿값으로 구합니다. 구간 $[a,b]$를 $n$등분하여 $h=\\dfrac{b-a}{n}$, $x_i=a+ih$, $y_i=f(x_i)$라 합니다.\n\n' +
          '**사다리꼴 공식** 작은 구간마다 곡선을 선분으로 바꾸어 사다리꼴의 넓이를 더합니다.\n\n' +
          '$T_n=\\dfrac{h}{2}\\left(y_0+2y_1+2y_2+\\cdots+2y_{n-1}+y_n\\right)$\n\n' +
          '**심프슨 공식** ($n$은 짝수) 두 구간씩 묶어 세 점을 지나는 포물선으로 바꿉니다.\n\n' +
          '$S_n=\\dfrac{h}{3}\\left(y_0+4y_1+2y_2+4y_3+\\cdots+2y_{n-2}+4y_{n-1}+y_n\\right)$\n\n' +
          '**오차 한계** 구간에서 $|f\'\'(x)|\\le K_2$, $|f^{(4)}(x)|\\le K_4$이면\n\n' +
          '$|E_T|\\le\\dfrac{K_2(b-a)^3}{12n^2},\\qquad |E_S|\\le\\dfrac{K_4(b-a)^5}{180n^4}$\n\n' +
          '$n$을 2배로 하면 사다리꼴 공식의 오차 한계는 $\\dfrac{1}{4}$배, 심프슨 공식은 $\\dfrac{1}{16}$배가 됩니다. 삼차 이하의 다항식은 $f^{(4)}=0$이므로 심프슨 공식이 참값을 그대로 줍니다.\n\n' +
          '예: $\\int_{0}^{2}x^2\\,dx=\\dfrac{8}{3}$을 $n=2$($h=1$)로 근사하면 $T_2=\\dfrac{1}{2}(0+2\\cdot 1+4)=3$, $S_2=\\dfrac{1}{3}(0+4\\cdot 1+4)=\\dfrac{8}{3}$입니다.',
        easy: '그림의 곡선 아래 넓이를 직접 구하기 어렵다면, 곡선을 꺾은선으로 바꾸어 사다리꼴 여러 개의 넓이를 더하면 됩니다. 이것이 사다리꼴 공식입니다. 안쪽 점은 양옆 사다리꼴에 한 번씩, 모두 두 번 쓰이므로 계수가 2입니다.\n\n' +
          '심프슨 공식은 꺾은선 대신 휘어진 포물선 조각을 씁니다. 곡선에 더 잘 붙으므로 같은 $n$에서 훨씬 정확합니다. 계수 $1,4,2,4,\\cdots,4,1$의 순서를 외워 두십시오.',
        fig: {
          type: 'coord', xmin: -0.5, xmax: 2.5, ymin: -0.5, ymax: 4.5,
          fns: [{ expr: 'x^2', from: 0, to: 2.1, label: 'y=x²' }],
          segments: [
            { from: [0, 0], to: [1, 1] }, { from: [1, 1], to: [2, 4] },
            { from: [1, 0], to: [1, 1], dashed: true }, { from: [2, 0], to: [2, 4], dashed: true },
          ],
          alt: 'y=x² 의 그래프와, 구간 [0, 2]를 두 칸으로 나누어 곡선을 선분으로 바꾼 사다리꼴 두 개',
        },
        check: {
          type: 'short', check: 'number',
          q: '심프슨 공식에서 $n=2$로 하여 $\\int_{0}^{2}x^3\\,dx$의 근삿값을 구하십시오.',
          answer: '4',
          wrong: [
            { a: '5', why: '사다리꼴 공식 $\\dfrac{1}{2}(0+2\\cdot 1+8)$을 썼습니다. 심프슨 공식은 $\\dfrac{h}{3}(y_0+4y_1+y_2)$입니다.' },
            { a: '12', why: '$\\dfrac{h}{3}$를 곱하지 않았습니다.' },
          ],
          explain: '$h=1$, $y_0=0$, $y_1=1$, $y_2=8$이므로 $S_2=\\dfrac{1}{3}(0+4\\cdot 1+8)=4$입니다. 참값 $\\left[\\dfrac{x^4}{4}\\right]_{0}^{2}=4$와 같습니다. 삼차함수에서는 심프슨 공식이 정확합니다.',
        },
      },
    ],

    examples: [
      {
        q: '$\\int e^x\\cos x\\,dx$를 구하십시오.',
        steps: [
          '$I=\\int e^x\\cos x\\,dx$라 하고 $u=\\cos x$, $dv=e^x\\,dx$로 놓으면 $I=e^x\\cos x+\\int e^x\\sin x\\,dx$입니다.',
          '남은 적분에서도 $u=\\sin x$, $dv=e^x\\,dx$로 놓으면 $\\int e^x\\sin x\\,dx=e^x\\sin x-\\int e^x\\cos x\\,dx=e^x\\sin x-I$입니다.',
          '대입하면 $I=e^x\\cos x+e^x\\sin x-I$이므로 $2I=e^x(\\cos x+\\sin x)$입니다.',
          '따라서 $I=\\dfrac{1}{2}e^x(\\sin x+\\cos x)+C$입니다. 미분하면 $\\dfrac{1}{2}e^x(\\sin x+\\cos x)+\\dfrac{1}{2}e^x(\\cos x-\\sin x)=e^x\\cos x$로 확인됩니다.',
        ],
        answer: '$\\dfrac{1}{2}e^x(\\sin x+\\cos x)+C$',
      },
      {
        q: '$\\int_{0}^{1}\\sqrt{4-x^2}\\,dx$를 구하십시오.',
        steps: [
          '$x=2\\sin\\theta$로 놓으면 $dx=2\\cos\\theta\\,d\\theta$, $\\sqrt{4-x^2}=2\\cos\\theta$입니다.',
          '$x=0$일 때 $\\theta=0$, $x=1$일 때 $\\sin\\theta=\\dfrac{1}{2}$이므로 $\\theta=\\dfrac{\\pi}{6}$입니다.',
          '$\\int_{0}^{\\frac{\\pi}{6}}4\\cos^2\\theta\\,d\\theta=\\int_{0}^{\\frac{\\pi}{6}}2(1+\\cos 2\\theta)\\,d\\theta=\\left[2\\theta+\\sin 2\\theta\\right]_{0}^{\\frac{\\pi}{6}}$',
          '$=\\dfrac{\\pi}{3}+\\sin\\dfrac{\\pi}{3}=\\dfrac{\\pi}{3}+\\dfrac{\\sqrt{3}}{2}$입니다. (반지름 2인 원에서 부채꼴 넓이 $\\dfrac{\\pi}{3}$와 삼각형 넓이 $\\dfrac{\\sqrt{3}}{2}$의 합과 같습니다.)',
        ],
        answer: '$\\dfrac{\\pi}{3}+\\dfrac{\\sqrt{3}}{2}$',
      },
      {
        q: '다음 정적분을 구하십시오.\n\n$\\int_{2}^{3}\\dfrac{dx}{x^2-1}$',
        steps: [
          '$x^2-1=(x-1)(x+1)$이고 가리기 방법으로 $\\dfrac{1}{(x-1)(x+1)}=\\dfrac{1/2}{x-1}-\\dfrac{1/2}{x+1}$입니다.',
          '적분하면 $\\dfrac{1}{2}\\ln|x-1|-\\dfrac{1}{2}\\ln|x+1|=\\dfrac{1}{2}\\ln\\left|\\dfrac{x-1}{x+1}\\right|$입니다.',
          '$\\dfrac{1}{2}\\left(\\ln\\dfrac{2}{4}-\\ln\\dfrac{1}{3}\\right)=\\dfrac{1}{2}\\ln\\dfrac{3}{2}$입니다.',
        ],
        answer: '$\\dfrac{1}{2}\\ln\\dfrac{3}{2}$',
      },
    ],

    terms: [
      { term: '표 방법', def: '부분적분을 여러 번 해야 할 때, 미분하는 쪽과 적분하는 쪽을 표로 늘어놓고 같은 행끼리 곱해 부호를 $+,-,+,\\cdots$로 붙이는 방법입니다.' },
      { term: '되돌아오는 적분', def: '부분적분을 두 번 하면 처음 적분이 다시 나타나는 적분입니다. $I=(\\text{식})-I$를 풀어 구합니다. 예: $\\int e^x\\sin x\\,dx$' },
      { term: '반각 공식', def: '$\\sin^2x=\\dfrac{1-\\cos 2x}{2}$, $\\cos^2x=\\dfrac{1+\\cos 2x}{2}$입니다. 삼각함수의 짝수 거듭제곱의 차수를 낮출 때 씁니다.' },
      { term: '삼각치환', def: '$\\sqrt{a^2-x^2}$, $\\sqrt{a^2+x^2}$, $\\sqrt{x^2-a^2}$이 있는 적분에서 $x=a\\sin\\theta$, $a\\tan\\theta$, $a\\sec\\theta$로 치환해 근호를 없애는 방법입니다.' },
      { term: '유리함수', def: '두 다항식의 몫 $\\dfrac{P(x)}{Q(x)}$로 나타낸 함수입니다.' },
      { term: '부분분수 분해', def: '유리함수를 $\\dfrac{A}{x-a}$, $\\dfrac{Bx+C}{x^2+bx+c}$ 같은 간단한 분수의 합으로 나타내는 것입니다.' },
      { term: '사다리꼴 공식', def: '구간을 $n$등분하고 곡선을 선분으로 바꾸어 정적분을 근사하는 공식 $T_n=\\dfrac{h}{2}(y_0+2y_1+\\cdots+2y_{n-1}+y_n)$입니다.' },
      { term: '심프슨 공식', def: '구간을 짝수 $n$개로 나누고 두 칸씩 포물선으로 바꾸어 근사하는 공식 $S_n=\\dfrac{h}{3}(y_0+4y_1+2y_2+\\cdots+4y_{n-1}+y_n)$입니다.' },
      { term: '오차 한계', def: '근삿값과 참값의 차가 넘지 않는 값입니다. 사다리꼴 공식은 $\\dfrac{K_2(b-a)^3}{12n^2}$, 심프슨 공식은 $\\dfrac{K_4(b-a)^5}{180n^4}$입니다.' },
    ],

    practice: [
      {
        id: 'p1', level: 1, type: 'choice', concept: 0,
        q: '$\\int x^2\\cos x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: [
          '$x^2\\sin x-2x\\cos x-2\\sin x+C$',
          '$x^2\\sin x+2x\\cos x-2\\sin x+C$',
          '$x^2\\sin x+2x\\cos x+2\\sin x+C$',
          '$\\dfrac{x^3}{3}\\sin x+C$',
        ],
        answer: 1,
        why: [
          '$\\cos x$를 두 번 적분하면 $-\\cos x$이므로 둘째 항은 $(-)\\cdot 2x\\cdot(-\\cos x)=+2x\\cos x$입니다.',
          '',
          '셋째 항의 부호를 확인하십시오. $\\cos x$를 세 번 적분하면 $-\\sin x$이고 표의 부호는 $+$이므로 $-2\\sin x$입니다.',
          '두 함수를 따로 적분해 곱했습니다. 곱의 적분은 이렇게 할 수 없습니다.',
        ],
        explain: '표 방법: 미분하는 쪽 $x^2, 2x, 2$, 적분하는 쪽 $\\sin x, -\\cos x, -\\sin x$, 부호 $+,-,+$입니다.\n\n$x^2\\sin x-2x(-\\cos x)+2(-\\sin x)=x^2\\sin x+2x\\cos x-2\\sin x+C$\n\n미분하면 $2x\\sin x+x^2\\cos x+2\\cos x-2x\\sin x-2\\cos x=x^2\\cos x$로 확인됩니다.',
      },
      {
        id: 'p2', level: 1, type: 'short', check: 'number', concept: 2,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{\\frac{\\pi}{2}}\\sin^3x\\,dx$',
        answer: '2/3',
        wrong: [{ a: '1/4', why: '$\\sin^3x$의 원시함수를 $\\dfrac{\\sin^4x}{4}$로 놓았습니다. 그 도함수는 $\\sin^3x\\cos x$입니다. $\\sin x$ 하나를 떼고 $u=\\cos x$로 치환합니다.' }],
        explain: '$\\sin^3x=(1-\\cos^2x)\\sin x$이고 $u=\\cos x$로 놓으면 $x=0$일 때 $u=1$, $x=\\dfrac{\\pi}{2}$일 때 $u=0$, $du=-\\sin x\\,dx$입니다.\n\n$\\int_{1}^{0}(1-u^2)(-du)=\\int_{0}^{1}(1-u^2)\\,du=1-\\dfrac{1}{3}=\\dfrac{2}{3}$',
      },
      {
        id: 'p3', level: 1, type: 'ox', concept: 2,
        q: '$\\int\\cos^2x\\,dx=\\dfrac{1}{3}\\cos^3x+C$입니다.',
        answer: false,
        explain: '$\\dfrac{1}{3}\\cos^3x$를 미분하면 $-\\cos^2x\\sin x$이므로 틀립니다. 반각 공식을 쓰면 $\\int\\cos^2x\\,dx=\\int\\dfrac{1+\\cos 2x}{2}\\,dx=\\dfrac{x}{2}+\\dfrac{\\sin 2x}{4}+C$입니다.',
      },
      {
        id: 'p4', level: 1, type: 'choice', concept: 3,
        q: '$\\int\\dfrac{dx}{x\\sqrt{x^2-9}}$ $(x>3)$를 계산할 때 알맞은 치환은 무엇입니까?',
        choices: ['$x=3\\sin\\theta$', '$x=3\\tan\\theta$', '$x=3\\sec\\theta$', '$x=9\\sec\\theta$'],
        answer: 2,
        why: [
          '$x=3\\sin\\theta$는 $\\sqrt{9-x^2}$ 꼴에 씁니다. 여기서는 $x^2-9$입니다.',
          '$x=3\\tan\\theta$는 $\\sqrt{x^2+9}$ 꼴에 씁니다.',
          '',
          '치환에는 $a^2=9$가 아니라 $a=3$을 씁니다. $x=9\\sec\\theta$이면 $x^2-9=81\\sec^2\\theta-9$가 되어 근호가 사라지지 않습니다.',
        ],
        explain: '$x=3\\sec\\theta$로 놓으면 $x^2-9=9(\\sec^2\\theta-1)=9\\tan^2\\theta$이므로 $\\sqrt{x^2-9}=3\\tan\\theta$입니다. (계속 계산하면 $\\dfrac{1}{3}\\int d\\theta=\\dfrac{\\theta}{3}+C$가 됩니다.)',
      },
      {
        id: 'p5', level: 1, type: 'short', check: 'number', concept: 4,
        q: '$\\dfrac{5x+1}{(x-1)(x+1)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+1}$일 때, $A$의 값을 구하십시오.',
        answer: '3',
        wrong: [{ a: '2', why: '$B$를 구했습니다. $A$는 $x-1$ 위의 수이므로 $x=1$을 넣어 구합니다.' }],
        explain: '$5x+1=A(x+1)+B(x-1)$에 $x=1$을 넣으면 $6=2A$이므로 $A=3$입니다. ($x=-1$을 넣으면 $-4=-2B$, $B=2$입니다. 확인: $\\dfrac{3}{x-1}+\\dfrac{2}{x+1}=\\dfrac{5x+1}{x^2-1}$)',
      },
      {
        id: 'p6', level: 1, type: 'short', check: 'number', concept: 5,
        q: '함수 $f$의 값이 표와 같습니다. 사다리꼴 공식 $T_4$로 $\\int_{0}^{4}f(x)\\,dx$의 근삿값을 구하십시오.\n\n| $x$ | 0 | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|---|\n| $f(x)$ | 3 | 5 | 4 | 6 | 2 |',
        answer: '17.5',
        wrong: [
          { a: '35', why: '$\\dfrac{h}{2}$를 곱하지 않았습니다. $h=1$이므로 $\\dfrac{1}{2}$을 곱합니다.' },
          { a: '10', why: '안쪽 점에 계수 2를 곱하지 않았습니다. 안쪽 점은 양옆 사다리꼴에 한 번씩 쓰여 계수가 2입니다.' },
          { a: '20', why: '모든 값을 한 번씩 더하기만 했습니다. 안쪽 점에는 2를 곱하고, 전체에 $\\dfrac{h}{2}$를 곱합니다.' },
        ],
        explain: '$h=1$이므로 $T_4=\\dfrac{1}{2}\\left(3+2(5+4+6)+2\\right)=\\dfrac{1}{2}\\times 35=17.5$입니다.',
      },
      {
        id: 'p7', level: 1, type: 'choice', concept: 5,
        q: '구간을 나누는 개수 $n$을 2배로 늘리면, 심프슨 공식의 오차 한계는 몇 배가 됩니까?',
        choices: ['$\\dfrac{1}{2}$배', '$\\dfrac{1}{4}$배', '$\\dfrac{1}{8}$배', '$\\dfrac{1}{16}$배'],
        answer: 3,
        fixed: true,
        why: [
          '오차 한계는 $n$에 반비례하지 않고 $n^4$에 반비례합니다.',
          '사다리꼴 공식(분모 $n^2$)의 경우입니다. 심프슨 공식의 분모에는 $n^4$이 있습니다.',
          '분모의 $n$의 지수를 다시 확인하십시오. $n^4$입니다.',
          '',
        ],
        explain: '$|E_S|\\le\\dfrac{K_4(b-a)^5}{180n^4}$이므로 $n$을 2배로 하면 분모가 $2^4=16$배가 되어 오차 한계는 $\\dfrac{1}{16}$배입니다. 사다리꼴 공식은 $\\dfrac{1}{4}$배입니다.',
      },
      {
        id: 'p8', level: 2, type: 'short', check: 'number', concept: 5,
        q: '함수 $f$의 값이 표와 같습니다. 심프슨 공식 $S_4$로 $\\int_{0}^{4}f(x)\\,dx$의 근삿값을 구하십시오.\n\n| $x$ | 0 | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|---|\n| $f(x)$ | 1 | 3 | 4 | 3 | 1 |',
        answer: '34/3',
        hint: '계수는 $1,4,2,4,1$이고 앞에 $\\dfrac{h}{3}$를 곱합니다.',
        wrong: [
          { a: '11', why: '사다리꼴 공식을 썼습니다. 심프슨 공식의 계수는 $1,4,2,4,1$입니다.' },
          { a: '34', why: '$\\dfrac{h}{3}$를 곱하지 않았습니다.' },
          { a: '10', why: '가운데 점에 4, 그 옆에 2를 곱했습니다. 홀수 번째 점($y_1, y_3$)에 4, 짝수 번째 안쪽 점($y_2$)에 2입니다.' },
        ],
        explain: '$h=1$이므로 $S_4=\\dfrac{1}{3}(1+4\\cdot 3+2\\cdot 4+4\\cdot 3+1)=\\dfrac{1}{3}\\times 34=\\dfrac{34}{3}$입니다.',
      },
      {
        id: 'p9', level: 2, type: 'choice', concept: 1,
        q: '$\\int e^{2x}\\cos x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: [
          '$\\dfrac{e^{2x}(2\\cos x-\\sin x)}{5}+C$',
          '$\\dfrac{e^{2x}(\\cos x+2\\sin x)}{5}+C$',
          '$\\dfrac{e^{2x}(2\\cos x+\\sin x)}{5}+C$',
          '$\\dfrac{e^{2x}(2\\cos x+\\sin x)}{3}+C$',
        ],
        answer: 2,
        why: [
          '$\\sin x$ 앞의 부호가 틀렸습니다. 미분해 보면 $e^{2x}\\cos x$가 나오지 않습니다.',
          '$a$와 $b$의 자리가 바뀌었습니다. $e^{ax}\\cos bx$의 적분에서 $\\cos$ 앞에 $a=2$가 붙습니다.',
          '',
          '분모는 $a^2+b^2=4+1=5$입니다. $a+b$가 아닙니다.',
        ],
        hint: '부분적분을 두 번 하여 처음 적분이 다시 나오게 하십시오.',
        explain: '$I=\\int e^{2x}\\cos x\\,dx$에서 $u=\\cos x$, $dv=e^{2x}dx$로 두 번 부분적분하면\n\n$I=\\dfrac{1}{2}e^{2x}\\cos x+\\dfrac{1}{2}\\left(\\dfrac{1}{2}e^{2x}\\sin x-\\dfrac{1}{2}I\\right)$이므로 $\\dfrac{5}{4}I=\\dfrac{1}{4}e^{2x}(2\\cos x+\\sin x)$, 곧 $I=\\dfrac{e^{2x}(2\\cos x+\\sin x)}{5}+C$입니다.',
      },
      {
        id: 'p10', level: 2, type: 'choice', concept: 3,
        q: '$\\int_{0}^{3}\\sqrt{9-x^2}\\,dx$의 값은 무엇입니까?',
        choices: ['$\\dfrac{9\\pi}{2}$', '$\\dfrac{9\\pi}{4}$', '$\\dfrac{3\\pi}{4}$', '$9\\pi$'],
        answer: 1,
        why: [
          '반원의 넓이를 구했습니다. $x$가 0부터 3까지이므로 사분원입니다.',
          '',
          '반지름 3의 제곱을 쓰지 않았습니다. 넓이는 $\\dfrac{1}{4}\\pi r^2$입니다.',
          '원 전체의 넓이입니다.',
        ],
        hint: '$y=\\sqrt{9-x^2}$의 그래프가 어떤 도형인지 생각하거나 $x=3\\sin\\theta$로 치환하십시오.',
        explain: '$x=3\\sin\\theta$로 놓으면 $\\int_{0}^{\\frac{\\pi}{2}}9\\cos^2\\theta\\,d\\theta=\\dfrac{9}{2}\\left[\\theta+\\dfrac{\\sin 2\\theta}{2}\\right]_{0}^{\\frac{\\pi}{2}}=\\dfrac{9\\pi}{4}$입니다. 반지름 3인 사분원의 넓이 $\\dfrac{1}{4}\\pi\\cdot 9$와 같습니다.',
      },
      {
        id: 'p11', level: 2, type: 'choice', concept: 4,
        q: '$\\int_{0}^{1}\\dfrac{x}{(x+1)(x+2)}\\,dx$의 값은 무엇입니까?',
        choices: ['$\\ln\\dfrac{9}{2}$', '$\\ln\\dfrac{8}{9}$', '$\\ln\\dfrac{3}{2}$', '$\\ln\\dfrac{9}{8}$'],
        answer: 3,
        why: [
          '위끝의 값만 넣고 아래끝 $x=0$의 값 $2\\ln 2$를 빼지 않았습니다.',
          '부분분수의 계수 부호가 바뀌었습니다. $A=-1$, $B=2$입니다.',
          '부분분수의 계수를 다시 구해 보십시오. $x=-1$, $x=-2$를 차례로 넣습니다.',
          '',
        ],
        hint: '$\\dfrac{x}{(x+1)(x+2)}=\\dfrac{A}{x+1}+\\dfrac{B}{x+2}$로 놓으십시오.',
        explain: '$x=A(x+2)+B(x+1)$에서 $x=-1$이면 $A=-1$, $x=-2$이면 $B=2$입니다.\n\n$\\left[-\\ln(x+1)+2\\ln(x+2)\\right]_{0}^{1}=(-\\ln 2+2\\ln 3)-2\\ln 2=2\\ln 3-3\\ln 2=\\ln\\dfrac{9}{8}$',
      },
      {
        id: 'p12', level: 2, type: 'short', check: 'number', concept: 2,
        q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{\\frac{\\pi}{2}}\\sin^2x\\cos^3x\\,dx$',
        answer: '2/15',
        hint: '$\\cos$의 지수가 홀수입니다. $\\cos x$ 하나를 떼어 두십시오.',
        wrong: [{ a: '1/3', why: '$\\cos^2x=1-\\sin^2x$로 바꾼 부분을 빠뜨리고 $\\int_{0}^{1}u^2\\,du$만 계산했습니다.' }],
        explain: '$\\sin^2x\\cos^3x=\\sin^2x(1-\\sin^2x)\\cos x$이고 $u=\\sin x$로 놓으면 $u$는 0부터 1까지입니다.\n\n$\\int_{0}^{1}(u^2-u^4)\\,du=\\dfrac{1}{3}-\\dfrac{1}{5}=\\dfrac{2}{15}$',
      },
    ],

    advanced: [
      {
        id: 'a1', level: 3, type: 'choice', concept: 1,
        q: '$\\int_{0}^{\\pi}e^x\\sin x\\,dx$의 값은 무엇입니까?',
        choices: ['$\\dfrac{e^{\\pi}-1}{2}$', '$e^{\\pi}+1$', '$\\dfrac{e^{\\pi}+1}{2}$', '$\\dfrac{1-e^{\\pi}}{2}$'],
        answer: 2,
        why: [
          '아래끝 $x=0$에서 $\\sin 0-\\cos 0=-1$이므로 빼면 $+1$이 됩니다. 부호를 확인하십시오.',
          '$2I=\\cdots$에서 2로 나누지 않았습니다.',
          '',
          '위끝에서 $\\sin\\pi-\\cos\\pi=1$입니다. $-1$로 계산했는지 확인하십시오.',
        ],
        hint: '원시함수 $\\dfrac{1}{2}e^x(\\sin x-\\cos x)$를 쓰십시오.',
        explain: '$\\left[\\dfrac{1}{2}e^x(\\sin x-\\cos x)\\right]_{0}^{\\pi}=\\dfrac{1}{2}e^{\\pi}(0+1)-\\dfrac{1}{2}(0-1)=\\dfrac{e^{\\pi}+1}{2}$입니다. 피적분함수가 구간에서 0 이상이므로 양수가 나오는 것도 맞습니다.',
      },
      {
        id: 'a2', level: 3, type: 'choice', concept: 3,
        q: '$\\int\\dfrac{dx}{(x^2+4)^{3/2}}$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: [
          '$\\dfrac{x}{2\\sqrt{x^2+4}}+C$',
          '$\\dfrac{\\sqrt{x^2+4}}{4x}+C$',
          '$\\dfrac{x}{4\\sqrt{x^2+4}}+C$',
          '$-\\dfrac{1}{\\sqrt{x^2+4}}+C$',
        ],
        answer: 2,
        why: [
          '상수를 다시 확인하십시오. $\\dfrac{2\\sec^2\\theta}{8\\sec^3\\theta}=\\dfrac{1}{4}\\cos\\theta$입니다.',
          '$\\cos\\theta$ 대신 $\\cot\\theta$로 되돌렸습니다. 직각삼각형에서 $\\sin\\theta=\\dfrac{x}{\\sqrt{x^2+4}}$입니다.',
          '',
          '이것을 미분하면 $\\dfrac{x}{(x^2+4)^{3/2}}$가 되어 분자에 $x$가 생깁니다.',
        ],
        hint: '$x=2\\tan\\theta$로 놓고, 끝에서 직각삼각형(밑변 2, 높이 $x$)으로 되돌리십시오.',
        explain: '$x=2\\tan\\theta$이면 $dx=2\\sec^2\\theta\\,d\\theta$, $(x^2+4)^{3/2}=8\\sec^3\\theta$입니다.\n\n$\\int\\dfrac{2\\sec^2\\theta}{8\\sec^3\\theta}\\,d\\theta=\\dfrac{1}{4}\\int\\cos\\theta\\,d\\theta=\\dfrac{1}{4}\\sin\\theta+C$\n\n밑변 2, 높이 $x$인 직각삼각형에서 빗변은 $\\sqrt{x^2+4}$이므로 $\\sin\\theta=\\dfrac{x}{\\sqrt{x^2+4}}$, 답은 $\\dfrac{x}{4\\sqrt{x^2+4}}+C$입니다.',
      },
      {
        id: 'a3', level: 3, type: 'short', check: 'number', concept: 4,
        q: '$\\dfrac{x^2+1}{x(x-1)^2}=\\dfrac{A}{x}+\\dfrac{B}{x-1}+\\dfrac{C}{(x-1)^2}$일 때, $B$의 값을 구하십시오.',
        answer: '0',
        hint: '분모를 없앤 뒤 $x=0$, $x=1$을 넣어 $A$, $C$를 먼저 구하고, $x^2$의 계수를 비교하십시오.',
        wrong: [
          { a: '2', why: '$C$의 값을 구했습니다. $x=1$을 넣으면 $C$만 남습니다.' },
          { a: '1', why: '$A$의 값을 구했습니다. $B$는 $x^2$의 계수 $A+B=1$에서 구합니다.' },
        ],
        explain: '$x^2+1=A(x-1)^2+Bx(x-1)+Cx$입니다. $x=0$이면 $A=1$, $x=1$이면 $C=2$입니다. $x^2$의 계수를 비교하면 $A+B=1$이므로 $B=0$입니다.\n\n확인: $\\dfrac{1}{x}+\\dfrac{2}{(x-1)^2}=\\dfrac{(x-1)^2+2x}{x(x-1)^2}=\\dfrac{x^2+1}{x(x-1)^2}$. 그래서 적분은 $\\ln|x|-\\dfrac{2}{x-1}+C$입니다.',
      },
      {
        id: 'a4', level: 3, type: 'short', check: 'number', concept: 5,
        q: '사다리꼴 공식으로 $\\int_{1}^{2}\\dfrac{1}{x}\\,dx$를 근사할 때, 오차 한계 공식이 오차를 $0.0001$ 이하로 보장하는 가장 작은 $n$을 구하십시오.',
        answer: '41',
        hint: '$[1,2]$에서 $|f\'\'(x)|=\\dfrac{2}{x^3}$의 최댓값을 $K_2$로 쓰십시오.',
        wrong: [
          { a: '40', why: '$n\\ge 40.8\\cdots$에서 내림을 했습니다. 부등식을 만족하는 가장 작은 자연수는 41입니다.' },
          { a: '1667', why: '$n^2\\ge 1666.6\\cdots$에서 제곱근을 구하지 않았습니다.' },
        ],
        explain: '$f\'\'(x)=\\dfrac{2}{x^3}$이고 $[1,2]$에서 최댓값은 $K_2=2$입니다.\n\n$\\dfrac{2\\cdot 1^3}{12n^2}\\le 0.0001 \\iff n^2\\ge\\dfrac{10000}{6}=1666.6\\cdots \\iff n\\ge 40.8\\cdots$\n\n따라서 가장 작은 $n$은 41입니다.',
      },
      {
        id: 'a5', level: 3, type: 'choice', concept: 2,
        q: '$\\int\\tan^3x\\sec x\\,dx$를 구한 것으로 옳은 것은 무엇입니까?',
        choices: [
          '$\\dfrac{1}{3}\\sec^3x+\\sec x+C$',
          '$\\dfrac{1}{3}\\sec^3x-\\sec x+C$',
          '$\\dfrac{1}{4}\\tan^4x\\sec x+C$',
          '$\\dfrac{1}{3}\\tan^3x-\\tan x+C$',
        ],
        answer: 1,
        why: [
          '$\\tan^2x=\\sec^2x-1$에서 $-1$의 부호를 놓쳤습니다.',
          '',
          '$\\sec x$를 상수처럼 두고 $\\tan^3x$만 적분했습니다.',
          '$u=\\tan x$로 치환하려면 $\\sec^2x$가 남아 있어야 하는데 여기에는 $\\sec x$ 하나뿐입니다.',
        ],
        hint: '$\\tan$의 지수가 홀수입니다. $\\sec x\\tan x$를 떼어 두십시오.',
        explain: '$\\tan^3x\\sec x=\\tan^2x\\cdot\\sec x\\tan x=(\\sec^2x-1)\\sec x\\tan x$이고 $u=\\sec x$이면 $du=\\sec x\\tan x\\,dx$입니다.\n\n$\\int(u^2-1)\\,du=\\dfrac{u^3}{3}-u+C=\\dfrac{1}{3}\\sec^3x-\\sec x+C$',
      },
      {
        id: 'a6', level: 3, type: 'ox', concept: 1,
        q: '$\\int e^x\\sin x\\,dx$를 구할 때, 첫 번째 부분적분에서 $dv=e^x\\,dx$로 두었다면 두 번째 부분적분에서는 $u=e^x$으로 바꾸어 두어도 답을 얻을 수 있습니다.',
        answer: false,
        explain: '두 번째에 $e^x$을 미분하는 쪽으로 바꾸면 첫 번째 부분적분을 거꾸로 되돌리는 셈이 되어 $I=I$라는 항등식만 남습니다. 두 번째에도 $dv=e^x\\,dx$로 두어야 $I=e^x(\\sin x-\\cos x)-I$를 얻습니다.',
      },
    ],

    deeper: [
      {
        title: '심프슨 공식은 왜 삼차함수까지 정확할까',
        body: '심프슨 공식은 두 칸 $[-h,h]$마다 세 점을 지나는 이차함수(포물선)의 넓이 $\\dfrac{h}{3}(y_0+4y_1+y_2)$를 씁니다. 이차 이하의 다항식에서 정확한 것은 당연합니다.\n\n' +
          '그런데 $x^3$을 넣어 보면 $\\int_{-h}^{h}x^3\\,dx=0$이고 공식도 $\\dfrac{h}{3}(-h^3+0+h^3)=0$입니다. 홀함수의 대칭 덕분에 삼차항의 오차가 저절로 사라지는 것입니다. 그래서 오차는 사차항에서 처음 생기고, 오차 한계에 $f$의 4계 도함수가 들어갑니다.\n\n' +
          '이 생각은 "더 적은 계산으로 더 높은 차수까지 정확한" 가우스 구적법 같은 수치해석의 방법으로 이어집니다.',
      },
      {
        title: '원시함수를 식으로 쓸 수 없는 함수',
        body: '$e^{-x^2}$, $\\dfrac{\\sin x}{x}$, $\\sqrt{1+x^3}$ 같은 함수는 연속이므로($\\dfrac{\\sin x}{x}$는 $x=0$에서 값을 1로 정합니다) 원시함수가 있지만, 그 원시함수를 다항식·지수·로그·삼각함수 등을 유한 번 조합한 식(초등함수)으로는 쓸 수 없다는 것이 19세기에 리우빌·체비쇼프 등의 연구로 밝혀졌습니다.\n\n' +
          '이런 적분은 이 단원의 수치적분이나, 다음에 배울 테일러 급수(피적분함수를 다항식의 무한 합으로 바꾸어 항별로 적분하기)로 계산합니다. 정규분포의 확률을 표로 찾는 것도 $e^{-x^2}$의 적분을 미리 수치로 계산해 둔 것입니다.',
      },
    ],

    faq: [
      {
        q: '부분적분에서 $u$를 어떻게 골라야 해요?',
        a: '미분하면 간단해지는 것을 $u$로, 적분해도 복잡해지지 않는 것을 $dv$로 둡니다. 흔히 쓰는 순서는 로그 → 역삼각 → 다항 → 삼각 → 지수(LIATE)로, 앞에 있는 것을 $u$로 둡니다. 예를 들어 $\\int x\\ln x\\,dx$는 $u=\\ln x$, $\\int x\\sin x\\,dx$는 $u=x$입니다. 어림 규칙이므로 잘 안 되면 바꾸어 봅니다.',
      },
      {
        q: '삼각치환을 하고 나서 $x$로 어떻게 되돌려요?',
        a: '치환 식($\\sin\\theta=\\dfrac{x}{a}$ 등)에 맞는 직각삼각형을 그리고, 피타고라스 정리로 나머지 변을 구한 뒤 필요한 삼각비를 읽습니다. θ 자체가 남으면 $\\theta=\\arcsin\\dfrac{x}{a}$, $\\arctan\\dfrac{x}{a}$처럼 역삼각함수로 씁니다. 정적분이면 적분 구간을 θ의 값으로 바꾸어 되돌리지 않아도 됩니다.',
      },
      {
        q: '분자의 차수가 분모보다 크면 부분분수로 바로 나누면 안 돼요?',
        a: '안 됩니다. 부분분수 분해는 진분수식(분자의 차수 < 분모의 차수)에서만 성립합니다. 먼저 다항식의 나눗셈으로 $\\dfrac{x^3}{x^2-1}=x+\\dfrac{x}{x^2-1}$처럼 몫과 진분수식으로 나눈 뒤, 진분수식 부분만 분해합니다.',
      },
      {
        q: '사다리꼴 공식과 심프슨 공식 중 무엇을 써야 해요?',
        a: '함수가 충분히 매끄러우면 같은 $n$에서 심프슨 공식이 훨씬 정확합니다(오차가 $n^4$에 반비례). 다만 심프슨 공식은 $n$이 짝수여야 하고, 자료가 홀수 개의 구간으로 주어지거나 함수가 매끄럽지 않으면 사다리꼴 공식을 씁니다.',
      },
    ],

    mistakes: [
      '되돌아오는 적분에서 $2I=(\\text{식})$을 얻고 2로 나누는 것을 잊는 실수 — $I=\\dfrac{1}{2}(\\text{식})+C$입니다.',
      '$\\int\\sin^3x\\,dx=\\dfrac{\\sin^4x}{4}+C$처럼 거듭제곱 공식을 그대로 쓰는 실수 — $\\sin x$의 도함수 $\\cos x$가 곱해져 있지 않으면 쓸 수 없습니다. $\\sin x$ 하나를 떼고 $u=\\cos x$로 치환합니다.',
      '심프슨 공식의 계수를 $1,2,4,2,1$로 바꾸어 쓰거나 $n$이 홀수인데 쓰는 실수 — 계수는 $1,4,2,4,\\cdots,4,1$이고 $n$은 짝수여야 합니다.',
    ],

    gens: [
      {
        id: 'trapezoid-table',
        level: 1,
        title: '표로 주어진 함수의 사다리꼴 공식',
        make: function (R) {
          var n = R.int(2, 5);
          var h = R.pick([1, 1, 2, 0.5]);
          var a = R.pick([0, 0, 1, 2]);
          var ys = [], i;
          for (i = 0; i <= n; i++) ys.push(R.int(0, 9));
          if (ys.every(function (v) { return v === ys[0]; })) ys[1] = (ys[1] + 3) % 10;
          var inner = 0;
          for (i = 1; i < n; i++) inner += ys[i];
          var all = ys[0] + ys[n] + 2 * inner;
          var H = R.F(Math.round(h * 2), 2);
          var ans = H.div(2).mul(all);
          var sumAll = H.div(2).mul(ys[0] + ys[n] + inner);
          var noHalf = H.mul(all);
          var xs = [];
          for (i = 0; i <= n; i++) xs.push(dnum(R, a + i * h));
          var b = dnum(R, a + n * h);
          var head = '| $x$ | ' + xs.join(' | ') + ' |\n|' + new Array(n + 3).join('---|') + '\n| $f(x)$ | ' + ys.join(' | ') + ' |';
          var wrong = [], seen = {};
          seen[ans.toString()] = true;
          [[noHalf, '$\\dfrac{h}{2}$에서 2로 나누는 것을 빠뜨렸습니다.'],
            [sumAll, '안쪽 점에 계수 2를 곱하지 않았습니다. 안쪽 점은 양옆 사다리꼴에 한 번씩 두 번 쓰입니다.'],
            [R.F(all, 2), '칸의 너비 $h=' + dnum(R, h) + '$를 곱하지 않았습니다.'],
          ].forEach(function (w) {
            var k = w[0].toString();
            if (!seen[k]) { seen[k] = true; wrong.push({ a: k, why: w[1] }); }
          });
          var innerTex = [];
          for (i = 1; i < n; i++) innerTex.push(String(ys[i]));
          return {
            type: 'short', check: 'number', concept: 5,
            q: '함수 $f$의 값이 표와 같습니다. 사다리꼴 공식 $T_{' + n + '}$' + R.josa(n, '으로/로') + ' $\\int_{' + a + '}^{' + b + '}f(x)\\,dx$의 근삿값을 구하십시오.\n\n' + head,
            answer: ans.toString(),
            wrong: wrong,
            explain: '칸의 너비는 $h=' + dnum(R, h) + '$입니다. 양 끝 값은 한 번, 안쪽 값은 두 번 더합니다.\n\n' +
              '$T_{' + n + '}=\\dfrac{h}{2}\\left(' + ys[0] + '+2(' + innerTex.join('+') + ')+' + ys[n] + '\\right)=' + R.fmt.frac(H.div(2)) + '\\times ' + all + '=' + R.fmt.frac(ans) + '$\n\n' +
              (ans.isInt() ? '' : '답은 소수 ' + (ans.toDecimal() || '') + '로 써도 됩니다.'),
          };
        },
      },
      {
        id: 'pf-coef',
        level: 1,
        title: '부분분수 분해의 계수 구하기',
        make: function (R) {
          var a = R.int(-4, 4);
          var b = R.int(-4, 4);
          while (b === a) b = R.int(-4, 4);
          var A = R.nonzero(-5, 5);
          var B = R.nonzero(-5, 5);
          // A/(x-a) + B/(x-b) = ((A+B)x - (Ab + Ba)) / ((x-a)(x-b))
          var p = A + B, q = -(A * b + B * a);
          if (p === 0 && q === 0) { B = B + 1 === 0 ? 2 : B + 1; p = A + B; q = -(A * b + B * a); }
          var num = R.fmt.poly([p, q]);
          var askA = R.bool();
          var ans = askA ? A : B;
          var other = askA ? B : A;
          var at = askA ? a : b, ot = askA ? b : a;
          var wrong = [], seen = {};
          seen[String(ans)] = true;
          [[other, '다른 계수를 구했습니다. 구하는 계수는 $' + lin(at) + '$ 위의 수이므로 $x=' + at + '$' + R.josa(at, '을/를') + ' 넣어 구합니다.'],
            [-ans, '부호를 놓쳤습니다. $x=' + at + '$일 때 남은 인수 $' + lin(ot) + '$의 값은 $' + (at - ot) + '$입니다.'],
            [p * at + q, '$x=' + at + '$' + R.josa(at, '을/를') + ' 넣은 분자의 값에서 멈추었습니다. 남은 인수의 값 $' + (at - ot) + '$' + R.josa(at - ot, '으로/로') + ' 나누어야 합니다.'],
          ].forEach(function (w) {
            var k = String(w[0]);
            if (!seen[k]) { seen[k] = true; wrong.push({ a: k, why: w[1] }); }
          });
          var den = plin(a) + plin(b);
          var nameAsk = askA ? 'A' : 'B';
          return {
            type: 'short', check: 'number', concept: 4,
            q: '$\\dfrac{' + num + '}{' + den + '}=\\dfrac{A}{' + lin(a) + '}+\\dfrac{B}{' + lin(b) + '}$일 때, $' + nameAsk + '$의 값을 구하십시오.',
            answer: String(ans),
            wrong: wrong,
            explain: '분모를 없애면 $' + num + '=A' + plin(b) + '+B' + plin(a) + '$입니다.\n\n' +
              '$x=' + at + '$' + R.josa(at, '을/를') + ' 넣으면 $' + (p * at + q) + '=' + nameAsk + '\\times' + R.fmt.paren(at - ot) + '$이므로 $' + nameAsk + '=' + ans + '$입니다.\n\n' +
              '(같은 방법으로 $' + (askA ? 'B' : 'A') + '=' + other + '$이고, 확인하면 $\\dfrac{' + A + '}{' + lin(a) + '}' + (B > 0 ? '+' : '-') + '\\dfrac{' + Math.abs(B) + '}{' + lin(b) + '}$' + R.josa(Math.abs(B), '을/를') + ' 통분한 분자는 $' + num + '$입니다.)',
          };
        },
      },
      {
        id: 'simpson-table',
        level: 2,
        title: '표로 주어진 함수의 심프슨 공식',
        make: function (R) {
          var n = R.pick([2, 4, 4, 6]);
          var h = R.pick([1, 1, 0.5, 2]);
          var ys = [], i;
          for (i = 0; i <= n; i++) ys.push(R.int(0, 9));
          if (ys.every(function (v) { return v === ys[0]; })) ys[1] = (ys[1] + 4) % 10;
          var odd = 0, even = 0;
          for (i = 1; i < n; i++) { if (i % 2) odd += ys[i]; else even += ys[i]; }
          var core = ys[0] + ys[n] + 4 * odd + 2 * even;
          var H = R.F(Math.round(h * 2), 2);
          var ans = H.div(3).mul(core);
          var trap = H.div(2).mul(ys[0] + ys[n] + 2 * (odd + even));
          var swapped = H.div(3).mul(ys[0] + ys[n] + 2 * odd + 4 * even);
          var noH = R.F(core);
          var wrong = [], seen = {};
          seen[ans.toString()] = true;
          [[trap, '사다리꼴 공식을 썼습니다. 심프슨 공식은 $\\dfrac{h}{3}$와 계수 $1,4,2,\\cdots,4,1$을 씁니다.'],
            [swapped, '계수 4와 2의 자리를 바꾸었습니다. 홀수 번째 점($y_1, y_3, \\cdots$)에 4를 곱합니다.'],
            [noH, '앞의 $\\dfrac{h}{3}$를 곱하지 않았습니다.'],
          ].forEach(function (w) {
            var k = w[0].toString();
            if (!seen[k]) { seen[k] = true; wrong.push({ a: k, why: w[1] }); }
          });
          var xs = [];
          for (i = 0; i <= n; i++) xs.push(dnum(R, i * h));
          var head = '| $x$ | ' + xs.join(' | ') + ' |\n|' + new Array(n + 3).join('---|') + '\n| $f(x)$ | ' + ys.join(' | ') + ' |';
          var terms = [String(ys[0])];
          for (i = 1; i < n; i++) terms.push((i % 2 ? '4' : '2') + '\\cdot ' + ys[i]);
          terms.push(String(ys[n]));
          return {
            type: 'short', check: 'number', concept: 5,
            q: '함수 $f$의 값이 표와 같습니다. 심프슨 공식 $S_{' + n + '}$' + R.josa(n, '으로/로') + ' $\\int_{0}^{' + dnum(R, n * h) + '}f(x)\\,dx$의 근삿값을 구하십시오.\n\n' + head,
            answer: ans.toString(),
            hint: '계수는 $1,4,2,\\cdots,4,1$이고 앞에 $\\dfrac{h}{3}$를 곱합니다.',
            wrong: wrong,
            explain: '$h=' + dnum(R, h) + '$이고 계수 $1,4,2,\\cdots,4,1$을 곱해 더합니다.\n\n' +
              '$S_{' + n + '}=\\dfrac{h}{3}(' + terms.join('+') + ')=' + R.fmt.frac(H.div(3)) + '\\times ' + core + '=' + R.fmt.frac(ans) + '$' +
              (ans.isInt() ? '' : (ans.toDecimal() ? '\n\n답은 소수 ' + ans.toDecimal() + '로 써도 됩니다.' : '')),
          };
        },
      },
      {
        id: 'trig-power-definite',
        level: 2,
        title: '삼각함수 거듭제곱의 정적분',
        make: function (R) {
          var oddOne = R.pick([1, 3, 5]);
          var other = R.int(0, 4);
          if (oddOne === 1 && other === 0) other = R.int(1, 4);
          var sinOdd = R.bool();
          var m = sinOdd ? oddOne : other;   // sin 의 지수
          var n = sinOdd ? other : oddOne;   // cos 의 지수
          var k = (oddOne - 1) / 2;
          var e = other;
          // ∫_0^1 (1-u^2)^k u^e du = Σ C(k,j)(-1)^j / (2j+e+1)
          var ans = R.F(0), allPlus = R.F(0), j, parts = [];
          for (j = 0; j <= k; j++) {
            var c = binom(k, j) * (j % 2 ? -1 : 1);
            ans = ans.add(R.F(c, 2 * j + e + 1));
            allPlus = allPlus.add(R.F(Math.abs(c), 2 * j + e + 1));
          }
          // 다항식 (1-u^2)^k u^e 를 전개한 글자
          var coeffs = {}, deg = 2 * k + e;
          for (j = 0; j <= k; j++) coeffs[2 * j + e] = binom(k, j) * (j % 2 ? -1 : 1);
          var arr = [];
          for (j = deg; j >= 0; j--) arr.push(coeffs[j] || 0);
          var polyU = R.fmt.poly(arr, 'u');
          function pw(f, p) { return p === 0 ? '' : (p === 1 ? '\\' + f + ' x' : '\\' + f + '^{' + p + '}x'); }
          var integrand = (pw('sin', m) + pw('cos', n)).replace('x\\cos', 'x\\,\\cos');
          var keep = sinOdd ? '\\sin x' : '\\cos x';
          var sub = sinOdd ? 'u=\\cos x' : 'u=\\sin x';
          var conv = sinOdd ? '\\sin^2x=1-\\cos^2x' : '\\cos^2x=1-\\sin^2x';
          var wrong = [], seen = {};
          seen[ans.toString()] = true;
          var uPow = e === 0 ? '1' : (e === 1 ? 'u' : 'u^{' + e + '}');
          [[allPlus, '$' + conv + '$에서 빼기를 더하기로 바꾸었습니다. 전개한 다항식의 부호를 확인하십시오.'],
            [R.F(1, e + 1), '$' + conv + '$로 바꾼 부분을 빠뜨리고 $\\int_{0}^{1}' + uPow + '\\,du$만 계산했습니다.'],
            [ans.neg(), '부호를 확인하십시오. 구간 $\\left[0,\\dfrac{\\pi}{2}\\right]$에서 피적분함수는 0 이상이므로 정적분은 양수입니다.'],
          ].forEach(function (w) {
            var key = w[0].toString();
            if (!seen[key]) { seen[key] = true; wrong.push({ a: key, why: w[1] }); }
          });
          var steps = oddOne === 1
            ? '$' + keep + '$ 하나를 떼어 두고 $' + sub + '$로 놓으면'
            : '$' + keep + '$ 하나를 떼어 두고 나머지를 $' + conv + '$로 바꾼 뒤 $' + sub + '$로 놓으면';
          var range = sinOdd
            ? ' $du=-\\sin x\\,dx$이고 $u$는 1에서 0으로 움직입니다. 부호와 구간의 방향이 함께 바뀌므로 $u$에 대해 0부터 1까지 적분하면 됩니다.'
            : ' $du=\\cos x\\,dx$이고 $u$는 0부터 1까지 움직입니다.';
          var body = k === 0 ? uPow : (e === 0 ? '' : uPow) + '(1-u^{2})' + (k === 1 ? '' : '^{' + k + '}');
          return {
            type: 'short', check: 'number', concept: 2,
            q: '다음 정적분의 값을 구하십시오.\n\n$\\int_{0}^{\\frac{\\pi}{2}}' + integrand + '\\,dx$',
            answer: ans.toString(),
            hint: '지수가 홀수인 쪽에서 하나를 떼어 두십시오.',
            wrong: wrong,
            explain: steps + range + '\n\n' +
              '$\\int_{0}^{1}' + body + '\\,du' + (k === 0 ? '' : '=\\int_{0}^{1}\\left(' + polyU + '\\right)du') + '=' + R.fmt.frac(ans) + '$',
          };
        },
      },
    ],
  });
})();
