/* 중2 과학 · 원소·원자·분자·이온
 * 가정교사 흐름: 개념 카드(+이해 확인 check) → 문제(concept·why·wrong 으로 오답 분석) → 추가 설명(easy) */
Tutor.registerUnit({
  id: 'sci-m2-06',
  course: 'sci-m2',
  title: '원소·원자·분자·이온',
  summary: '물질을 이루는 기본 성분인 원소와 화합물을 구별하고, 원자의 구조와 주기율표, 분자와 화학식, 이온의 형성과 이온식을 배워요.',
  goals: [
    '원소와 화합물을 구별하고, 주요 원소를 원소 기호로 나타낼 수 있어요.',
    '원자의 구조를 설명하고, 양성자 수로 원소의 종류가 정해짐을 알 수 있어요.',
    '주기율표의 족과 주기를 알고, 1족 원소와 18족 원소의 성질을 말할 수 있어요.',
    '분자를 화학식으로, 이온을 이온식으로 나타내고 그 뜻을 해석할 수 있어요.',
  ],
  standards: ['[9과11-01]', '[9과11-02]', '[9과11-03]', '[9과11-04]'],

  concepts: [
    {
      title: '원소와 원소 기호',
      body: '물질을 이루는 기본 성분으로, **더 이상 다른 물질로 분해되지 않는 것**을 **원소**라고 해요. 수소, 산소, 탄소, 철, 구리 등이 원소예요. 지금까지 알려진 원소는 118가지이고, 그중 일부는 사람이 인공적으로 만든 것이에요.\n\n물을 전기 분해하면 수소와 산소로 나뉘어요. 그래서 물은 원소가 아니에요. 물처럼 **두 가지 이상의 원소가 결합해 만들어진 물질**을 **화합물**이라고 해요. 이산화 탄소, 염화 나트륨(소금의 주성분), 설탕도 화합물이에요.\n\n원소는 **원소 기호**로 간단히 나타내요. 원소의 영어나 라틴어 이름의 첫 글자를 **대문자**로 쓰고, 첫 글자가 같은 원소가 있으면 중간 글자 하나를 **소문자**로 덧붙여요.\n\n| 원소 | 기호 | 원소 | 기호 |\n|---|---|---|---|\n| 수소 | H | 나트륨(소듐) | Na |\n| 헬륨 | He | 마그네슘 | Mg |\n| 탄소 | C | 염소 | Cl |\n| 질소 | N | 칼륨(포타슘) | K |\n| 산소 | O | 칼슘 | Ca |\n| 플루오린 | F | 철 | Fe |\n| 네온 | Ne | 구리 | Cu |\n\n> ⚠️ 두 글자 원소 기호의 둘째 글자는 반드시 소문자예요. Co(코발트)와 CO(일산화 탄소)는 전혀 다른 물질이에요.',
      easy: '블록 장난감을 떠올려 보세요. 블록 종류는 몇 가지뿐이지만, 조립하면 집·자동차·로봇처럼 수많은 모양을 만들 수 있지요.\n\n**원소**는 블록의 **종류**, **화합물**은 서로 다른 종류의 블록을 조립해 만든 **작품**과 같아요. 물이라는 작품을 분해하면 수소 블록과 산소 블록이 나오지만, 수소 블록은 더 이상 다른 블록으로 나눠지지 않아요.',
      check: {
        type: 'choice',
        q: '다음 중 원소인 것은 무엇일까요?',
        choices: ['산소', '물', '이산화 탄소'],
        answer: 0,
        why: ['', '물은 전기 분해하면 수소와 산소로 나뉘는 화합물이에요.', '이산화 탄소는 탄소와 산소가 결합한 화합물이에요.'],
        explain: '산소는 더 이상 다른 물질로 분해되지 않는 원소예요. 물과 이산화 탄소는 두 가지 원소가 결합한 화합물이에요.',
      },
    },
    {
      title: '원자의 구조',
      body: '물질을 이루는 기본 입자를 **원자**라고 해요. 원자는 가운데의 **원자핵**과 그 주위를 움직이는 **전자**로 이루어져 있어요.\n\n| 구성 입자 | 위치 | 전하 |\n|---|---|---|\n| 양성자 | 원자핵 속 | (+) |\n| 중성자 | 원자핵 속 | 없음 |\n| 전자 | 원자핵 주위 | (−) |\n\n원자핵은 (+)전하를 띠는 **양성자**와 전하를 띠지 않는 **중성자**로 이루어져 있어요. 한 원자 안에서 **양성자 수와 전자 수는 같아서** 원자핵의 (+)전하량과 전자 전체의 (−)전하량이 같아요. 그래서 원자는 전체적으로 **전기적으로 중성**이에요.\n\n원소의 종류는 **양성자 수**로 정해져요. 양성자가 1개면 수소, 6개면 탄소, 8개면 산소예요. 원자핵 속 양성자 수를 그 원소의 **원자 번호**라고 해요.\n\n> 💡 원자핵은 원자 전체에 비해 아주 작지만 원자 질량의 대부분을 차지해요. 원자 속은 대부분 빈 공간이에요.',
      easy: '원자를 커다란 운동장만 하게 키운다면, 원자핵은 운동장 한가운데 놓인 작은 구슬 정도이고 전자는 그 바깥을 돌아다니는 아주 작은 알갱이예요.\n\n구슬(원자핵) 속에는 (+)를 띤 양성자와 전하가 없는 중성자가 있고, 바깥의 전자는 (−)를 띠어요. 양성자 수와 전자 수가 같아 (+)와 (−)가 꼭 맞게 상쇄되니 원자 전체는 전기를 띠지 않아요.',
      fig: {
        type: 'svg',
        alt: '헬륨 원자 모형. 가운데 원자핵에 양성자 2개와 중성자 2개가 있고, 바깥에 전자 2개가 있어요',
        svg: '<svg viewBox="0 0 330 180" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="90" r="62" fill="none" stroke="currentColor" stroke-dasharray="4 4"/><circle cx="93" cy="83" r="9" fill="var(--fig-1)" stroke="currentColor"/><circle cx="107" cy="83" r="9" fill="var(--fig-3)" stroke="currentColor"/><circle cx="93" cy="97" r="9" fill="var(--fig-3)" stroke="currentColor"/><circle cx="107" cy="97" r="9" fill="var(--fig-1)" stroke="currentColor"/><circle cx="162" cy="90" r="8" fill="var(--fig-2)" stroke="currentColor"/><circle cx="38" cy="90" r="8" fill="var(--fig-2)" stroke="currentColor"/><g fill="currentColor" font-size="12" font-weight="bold" text-anchor="middle"><text x="93" y="87">+</text><text x="107" y="101">+</text><text x="162" y="94">−</text><text x="38" y="94">−</text></g><g stroke="currentColor"><line x1="116" y1="80" x2="196" y2="40"/><line x1="170" y1="88" x2="196" y2="78"/></g><g fill="currentColor" font-size="13"><text x="200" y="44">원자핵</text><text x="200" y="82">전자</text></g><circle cx="210" cy="118" r="7" fill="var(--fig-1)" stroke="currentColor"/><circle cx="210" cy="142" r="7" fill="var(--fig-3)" stroke="currentColor"/><circle cx="210" cy="166" r="7" fill="var(--fig-2)" stroke="currentColor"/><g fill="currentColor" font-size="12"><text x="224" y="122">양성자 (+)</text><text x="224" y="146">중성자 (전하 없음)</text><text x="224" y="170">전자 (−)</text></g></svg>',
      },
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '양성자 수가 8인 산소 원자에는 전자가 몇 개 있을까요?',
        answer: '8',
        wrong: [{ a: '16', why: '양성자 수와 전자 수를 더했어요. 원자에서는 양성자 수와 전자 수가 같아요.' }],
        explain: '원자는 양성자 수와 전자 수가 같아서 전기적으로 중성이에요. 그래서 산소 원자의 전자는 8개예요.',
      },
    },
    {
      title: '주기율표: 족과 주기',
      body: '**주기율표**는 원소들을 **원자 번호 순서**로 늘어놓되, **성질이 비슷한 원소가 같은 세로줄**에 오도록 배열한 표예요.\n\n- **족**: 주기율표의 세로줄이에요. 1족부터 18족까지 있어요. **같은 족 원소는 화학적 성질이 비슷해요.**\n- **주기**: 주기율표의 가로줄이에요. 1주기부터 7주기까지 있어요.\n\n**1족 원소**(수소 제외)인 리튬(Li), 나트륨(Na), 칼륨(K)은 금속인데도 칼로 잘릴 만큼 무르고, **물과 격렬하게 반응**하여 수소 기체를 내놓아요. 반응한 뒤의 수용액은 염기성이에요. 공기 중의 산소나 물과 쉽게 반응하므로 **석유 속에 보관**해요.\n\n**18족 원소**인 헬륨(He), 네온(Ne), 아르곤(Ar)은 다른 물질과 **거의 반응하지 않는 안정한** 기체예요. 그래서 헬륨은 풍선이나 비행선을 띄우는 데, 아르곤은 전구 속을 채우는 데 쓰여요.\n\n> ⚠️ 1족 원소와 물의 반응은 불이 붙거나 튈 수 있어 위험해요. 학교에서 선생님이 시범으로 보여 주는 실험이고, 집에서는 절대 하지 않아요.',
      easy: '주기율표는 "원소들의 아파트 배치도"예요. 원자 번호 순서대로 방을 채우되, 성격이 비슷한 원소들은 같은 세로줄(족)에 살게 했어요.\n\n그래서 1족 줄에 사는 리튬·나트륨·칼륨은 모두 물을 만나면 격렬하게 반응하고, 18족 줄에 사는 헬륨·네온·아르곤은 모두 다른 원소와 어울리지 않고(반응하지 않고) 조용히 지내요.',
      fig: {
        type: 'svg',
        alt: '원자 번호 1번부터 20번까지의 원소를 나타낸 간단한 주기율표. 3족부터 12족은 빼고 1족, 2족, 13족부터 18족만 그렸어요. 1족의 리튬, 나트륨, 칼륨과 18족의 헬륨, 네온, 아르곤 칸에 색을 칠했어요',
        svg: '<svg viewBox="0 0 380 186" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" font-size="11" text-anchor="middle"><text x="64" y="18">1족</text><text x="104" y="18">2족</text><text x="144" y="18">13족</text><text x="184" y="18">14족</text><text x="224" y="18">15족</text><text x="264" y="18">16족</text><text x="304" y="18">17족</text><text x="344" y="18">18족</text></g><g fill="currentColor" font-size="11" text-anchor="end"><text x="38" y="50">1주기</text><text x="38" y="88">2주기</text><text x="38" y="126">3주기</text><text x="38" y="164">4주기</text></g><rect x="44" y="26" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="48" y="37" font-size="9" fill="currentColor">1</text><text x="64" y="55" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">H</text><rect x="324" y="26" width="40" height="38" fill="var(--fig-2)" fill-opacity="0.25" stroke="currentColor"/><text x="328" y="37" font-size="9" fill="currentColor">2</text><text x="344" y="55" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">He</text><rect x="44" y="64" width="40" height="38" fill="var(--fig-1)" fill-opacity="0.25" stroke="currentColor"/><text x="48" y="75" font-size="9" fill="currentColor">3</text><text x="64" y="93" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Li</text><rect x="84" y="64" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="88" y="75" font-size="9" fill="currentColor">4</text><text x="104" y="93" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Be</text><rect x="124" y="64" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="128" y="75" font-size="9" fill="currentColor">5</text><text x="144" y="93" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">B</text><rect x="164" y="64" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="168" y="75" font-size="9" fill="currentColor">6</text><text x="184" y="93" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">C</text><rect x="204" y="64" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="208" y="75" font-size="9" fill="currentColor">7</text><text x="224" y="93" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">N</text><rect x="244" y="64" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="248" y="75" font-size="9" fill="currentColor">8</text><text x="264" y="93" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">O</text><rect x="284" y="64" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="288" y="75" font-size="9" fill="currentColor">9</text><text x="304" y="93" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">F</text><rect x="324" y="64" width="40" height="38" fill="var(--fig-2)" fill-opacity="0.25" stroke="currentColor"/><text x="328" y="75" font-size="9" fill="currentColor">10</text><text x="344" y="93" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Ne</text><rect x="44" y="102" width="40" height="38" fill="var(--fig-1)" fill-opacity="0.25" stroke="currentColor"/><text x="48" y="113" font-size="9" fill="currentColor">11</text><text x="64" y="131" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Na</text><rect x="84" y="102" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="88" y="113" font-size="9" fill="currentColor">12</text><text x="104" y="131" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Mg</text><rect x="124" y="102" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="128" y="113" font-size="9" fill="currentColor">13</text><text x="144" y="131" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Al</text><rect x="164" y="102" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="168" y="113" font-size="9" fill="currentColor">14</text><text x="184" y="131" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Si</text><rect x="204" y="102" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="208" y="113" font-size="9" fill="currentColor">15</text><text x="224" y="131" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">P</text><rect x="244" y="102" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="248" y="113" font-size="9" fill="currentColor">16</text><text x="264" y="131" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">S</text><rect x="284" y="102" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="288" y="113" font-size="9" fill="currentColor">17</text><text x="304" y="131" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Cl</text><rect x="324" y="102" width="40" height="38" fill="var(--fig-2)" fill-opacity="0.25" stroke="currentColor"/><text x="328" y="113" font-size="9" fill="currentColor">18</text><text x="344" y="131" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Ar</text><rect x="44" y="140" width="40" height="38" fill="var(--fig-1)" fill-opacity="0.25" stroke="currentColor"/><text x="48" y="151" font-size="9" fill="currentColor">19</text><text x="64" y="169" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">K</text><rect x="84" y="140" width="40" height="38" fill="none" fill-opacity="0.25" stroke="currentColor"/><text x="88" y="151" font-size="9" fill="currentColor">20</text><text x="104" y="169" font-size="15" font-weight="bold" text-anchor="middle" fill="currentColor">Ca</text></svg>',
      },
      check: {
        type: 'ox',
        q: '주기율표에서 같은 가로줄(주기)에 있는 원소들은 화학적 성질이 비슷해요.',
        answer: false,
        explain: '화학적 성질이 비슷한 원소는 같은 **세로줄**, 곧 같은 **족**에 있어요. 가로줄은 주기라고 해요.',
      },
    },
    {
      title: '분자와 화학식',
      body: '**분자**는 원자들이 결합하여 만들어진 입자로, **독립된 입자로 존재하며 물질의 성질을 나타내는 가장 작은 입자**예요. 물 분자 하나는 수소 원자 2개와 산소 원자 1개가 결합해 있어요. 물 분자를 수소 원자와 산소 원자로 쪼개면 더 이상 물의 성질을 띠지 않아요.\n\n**화학식**은 원소 기호와 숫자로 물질을 나타낸 식이에요.\n\n- 원소 기호 오른쪽 **아래의 작은 숫자**: 분자 하나에 들어 있는 그 원자의 개수(1이면 쓰지 않아요)\n- 화학식 **앞의 큰 숫자**: 분자의 개수\n\n| 물질 | 화학식 | 분자 하나를 이루는 원자 |\n|---|---|---|\n| 수소 | $\\mathrm{H}_{2}$ | 수소 원자 2개 |\n| 산소 | $\\mathrm{O}_{2}$ | 산소 원자 2개 |\n| 물 | $\\mathrm{H}_{2}\\mathrm{O}$ | 수소 2개, 산소 1개 |\n| 이산화 탄소 | $\\mathrm{CO}_{2}$ | 탄소 1개, 산소 2개 |\n| 암모니아 | $\\mathrm{NH}_{3}$ | 질소 1개, 수소 3개 |\n| 메테인 | $\\mathrm{CH}_{4}$ | 탄소 1개, 수소 4개 |\n\n예를 들어 $2\\mathrm{H}_{2}\\mathrm{O}$는 물 분자 2개를 뜻하고, 여기에는 수소 원자 4개와 산소 원자 2개, 모두 6개의 원자가 있어요.\n\n> 💡 수소($\\mathrm{H}_{2}$)나 산소($\\mathrm{O}_{2}$)처럼 한 종류의 원자로 된 물질은 원소이고, 물이나 이산화 탄소처럼 여러 종류의 원자로 된 물질은 화합물이에요. 철($\\mathrm{Fe}$), 구리($\\mathrm{Cu}$) 같은 금속은 분자를 이루지 않아 원소 기호를 그대로 화학식으로 써요.',
      easy: '분자는 "블록으로 조립한 완성품 하나"예요. 물 완성품은 수소 블록 2개와 산소 블록 1개로 만든 모양이에요. 이것을 화학식으로 쓰면 $\\mathrm{H}_{2}\\mathrm{O}$예요. H 옆의 작은 2는 "수소 블록 2개"라는 뜻이고, O 옆에는 1이 생략되어 있어요.\n\n완성품 두 개를 나타내고 싶으면 앞에 큰 숫자를 붙여 $2\\mathrm{H}_{2}\\mathrm{O}$라고 써요.',
      check: {
        type: 'short', check: 'number', unit: '개',
        q: '암모니아($\\mathrm{NH}_{3}$) 분자 1개를 이루는 원자는 모두 몇 개일까요?',
        answer: '4',
        wrong: [{ a: '3', why: '수소 원자 3개만 셌어요. N 옆에는 1이 생략되어 있으니 질소 원자 1개도 더해요.' }],
        explain: '$\\mathrm{NH}_{3}$에는 질소 원자 1개와 수소 원자 3개가 있어요. 모두 $1+3=4$개예요.',
      },
    },
    {
      title: '이온의 형성과 이온식',
      body: '원자는 양성자 수와 전자 수가 같아 전기적으로 중성이에요. 그런데 원자가 **전자를 잃거나 얻으면** 양성자 수와 전자 수가 달라져 전하를 띠게 돼요. 이렇게 **전하를 띠는 입자**를 **이온**이라고 해요.\n\n- **양이온**: 원자가 전자를 **잃어서** (+)전하를 띠는 입자. 예: 나트륨 원자가 전자 1개를 잃으면 나트륨 이온\n- **음이온**: 원자가 전자를 **얻어서** (−)전하를 띠는 입자. 예: 염소 원자가 전자 1개를 얻으면 염화 이온\n\n이온은 **이온식**으로 나타내요. 원소 기호의 오른쪽 위에 잃거나 얻은 전자의 수와 전하의 종류(+, −)를 써요. 1은 쓰지 않아요.\n\n| 양이온 | 이온식 | 음이온 | 이온식 |\n|---|---|---|---|\n| 수소 이온 | $\\mathrm{H}^{+}$ | 염화 이온 | $\\mathrm{Cl}^{-}$ |\n| 나트륨 이온 | $\\mathrm{Na}^{+}$ | 플루오린화 이온 | $\\mathrm{F}^{-}$ |\n| 칼륨 이온 | $\\mathrm{K}^{+}$ | 산화 이온 | $\\mathrm{O}^{2-}$ |\n| 마그네슘 이온 | $\\mathrm{Mg}^{2+}$ | 황화 이온 | $\\mathrm{S}^{2-}$ |\n| 칼슘 이온 | $\\mathrm{Ca}^{2+}$ | 수산화 이온 | $\\mathrm{OH}^{-}$ |\n| 구리 이온 | $\\mathrm{Cu}^{2+}$ | 황산 이온 | $\\mathrm{SO}_{4}^{2-}$ |\n\n음이온의 이름은 원소 이름 뒤에 "~화 이온"을 붙여요. 이름이 "소"로 끝나면 "소"를 빼요(염소 → 염화 이온, 산소 → 산화 이온). 이온이 되어도 **양성자 수는 그대로이고 전자 수만 변해요.**\n\n> 💡 나트륨 원자(양성자 11개, 전자 11개)가 전자 1개를 잃으면 나트륨 이온이 되어 양성자 11개, 전자 10개가 돼요. (+)가 하나 더 많으니 원소 기호 오른쪽 위에 +를 붙여 나타내요: $\\mathrm{Na}^{+}$',
      easy: '원자를 "(+)구슬과 (−)구슬이 같은 수만큼 든 주머니"라고 생각해 보세요. (+)와 (−)가 같으니 주머니는 중성이에요.\n\n이 주머니에서 (−)구슬(전자)이 하나 빠져나가면 (+)가 하나 더 많아져 (+)를 띠어요 → **양이온**. 반대로 (−)구슬을 하나 더 받으면 (−)가 하나 더 많아져 (−)를 띠어요 → **음이온**. (+)구슬(양성자)은 언제나 그대로예요.',
      check: {
        type: 'choice',
        q: '어떤 원자가 전자 2개를 잃었어요. 이 원자는 어떻게 될까요?',
        choices: ['2+의 전하를 띠는 양이온이 돼요.', '2−의 전하를 띠는 음이온이 돼요.', '양성자 2개가 줄어 다른 원소의 원자가 돼요.'],
        answer: 0,
        why: ['', '전자를 잃으면 (−)가 줄어 (+)가 더 많아져요. 음이온은 전자를 얻을 때 생겨요.', '이온이 될 때 양성자 수는 변하지 않고 전자 수만 변해요.'],
        explain: '(−)전하를 띤 전자를 2개 잃으면 양성자의 (+)전하가 2만큼 더 많아져요. 그래서 2+의 전하를 띠는 양이온이 돼요.',
      },
    },
    {
      title: '이온이 전하를 띤다는 증거',
      body: '이온이 정말 전하를 띠고 있다면, 전압을 걸었을 때 (+)극이나 (−)극 쪽으로 끌려가야 해요. 이것을 색깔 있는 이온으로 확인할 수 있어요.\n\n1. 질산 칼륨 수용액을 적신 거름종이를 유리판 위에 놓고, 양쪽 끝에 전극을 연결해요.\n2. 거름종이 가운데에 파란색의 황산 구리(Ⅱ) 수용액과 보라색의 과망가니즈산 칼륨 수용액을 한 방울씩 떨어뜨려요.\n3. 전압을 걸고 색깔이 어느 쪽으로 움직이는지 관찰해요.\n\n| 색 | 이온 | 움직이는 쪽 |\n|---|---|---|\n| 파란색 | 구리 이온 $\\mathrm{Cu}^{2+}$ (양이온) | (−)극 쪽 |\n| 보라색 | 과망가니즈산 이온 $\\mathrm{MnO}_{4}^{-}$ (음이온) | (+)극 쪽 |\n\n(+)전하를 띤 양이온은 (−)극으로, (−)전하를 띤 음이온은 (+)극으로 끌려가요. 서로 다른 전하끼리는 끌어당기기 때문이에요. 질산 칼륨 수용액은 색이 없는 이온이 들어 있어서 관찰을 방해하지 않고, 거름종이에 전류가 잘 흐르게 해 줘요.\n\n소금물처럼 이온이 녹아 있는 수용액에 전류가 흐르는 것도 이온이 전하를 띠고 움직이기 때문이에요. 설탕물에는 이온이 없어서 전류가 거의 흐르지 않아요.\n\n> ⚠️ 이 실험은 약품과 전원 장치를 쓰므로 학교 실험실에서 선생님과 함께, 보안경과 장갑을 끼고 해요.',
      easy: '(+)와 (−)는 서로 끌어당겨요. 그래서 (+)를 띤 이온은 (−)극 쪽으로, (−)를 띤 이온은 (+)극 쪽으로 끌려가요.\n\n파란 구리 이온(+)과 보라색 과망가니즈산 이온(−)을 거름종이 가운데에 떨어뜨리고 전압을 걸면, 파란색은 (−)극 쪽으로, 보라색은 (+)극 쪽으로 번져 가요. 두 색이 **서로 반대쪽**으로 움직이는 것이 이온이 전하를 띠고 있다는 증거예요.',
      check: {
        type: 'ox',
        q: '이 실험에서 파란색을 띠는 구리 이온($\\mathrm{Cu}^{2+}$)은 (+)극 쪽으로 이동해요.',
        answer: false,
        explain: '구리 이온은 (+)전하를 띤 양이온이라서 반대 전하인 (−)극 쪽으로 이동해요. (+)극 쪽으로 이동하는 것은 보라색의 과망가니즈산 이온(음이온)이에요.',
      },
    },
  ],

  examples: [
    {
      q: '마그네슘 원자는 양성자가 12개예요. 마그네슘 원자가 전자 2개를 잃어 이온이 되었을 때, 이 이온의 양성자 수, 전자 수, 이온식을 구해 보세요.',
      steps: [
        '원자는 양성자 수와 전자 수가 같아요. 그래서 마그네슘 원자의 전자는 12개예요.',
        '이온이 될 때 양성자 수는 변하지 않아요. 양성자는 그대로 12개예요.',
        '전자 2개를 잃었으니 전자는 $12-2=10$개예요.',
        '(+)전하가 (−)전하보다 2만큼 많으니 2+의 전하를 띠는 양이온이에요. 이온식은 원소 기호 오른쪽 위에 2+를 써서 나타내요: $\\mathrm{Mg}^{2+}$',
      ],
      answer: '양성자 12개, 전자 10개, 이온식 $\\mathrm{Mg}^{2+}$(마그네슘 이온)',
    },
    {
      q: '$3\\mathrm{NH}_{3}$에 들어 있는 분자 수, 질소 원자 수, 수소 원자 수, 전체 원자 수를 구해 보세요.',
      steps: [
        '화학식 앞의 큰 숫자 3은 분자의 개수예요. 암모니아 분자가 3개예요.',
        '분자 1개에는 질소 원자 1개(N 옆의 1은 생략)와 수소 원자 3개가 있어요.',
        '분자가 3개이므로 질소 원자는 $1 \\times 3=3$개, 수소 원자는 $3 \\times 3=9$개예요.',
        '전체 원자 수는 $3+9=12$개예요.',
      ],
      answer: '분자 3개, 질소 원자 3개, 수소 원자 9개, 전체 원자 12개',
    },
  ],

  terms: [
    { term: '원소', def: '물질을 이루는 기본 성분으로, 더 이상 다른 물질로 분해되지 않는 것이에요. 예: 수소, 산소, 철' },
    { term: '화합물', def: '두 가지 이상의 원소가 결합하여 만들어진 물질이에요. 예: 물, 이산화 탄소, 염화 나트륨' },
    { term: '원소 기호', def: '원소를 알파벳으로 간단히 나타낸 것이에요. 첫 글자는 대문자, 둘째 글자는 소문자로 써요. 예: H(수소), Na(나트륨), Cl(염소)' },
    { term: '원자', def: '물질을 이루는 기본 입자예요. 원자핵과 전자로 이루어지며, 양성자 수와 전자 수가 같아 전기적으로 중성이에요.' },
    { term: '원자핵', def: '원자의 가운데에 있는 아주 작은 부분이에요. (+)전하를 띠는 양성자와 전하가 없는 중성자로 이루어져 있어요.' },
    { term: '원자 번호', def: '원자핵 속 양성자의 수예요. 원자 번호가 같으면 같은 원소예요. 예: 원자 번호 8은 산소' },
    { term: '주기율표', def: '원소를 원자 번호 순서로 늘어놓되 성질이 비슷한 원소가 같은 세로줄에 오도록 배열한 표예요. 세로줄은 족, 가로줄은 주기라고 해요.' },
    { term: '분자', def: '원자들이 결합하여 만들어진 입자로, 독립된 입자로 존재하며 물질의 성질을 나타내는 가장 작은 입자예요. 예: 물 분자 $\\mathrm{H}_{2}\\mathrm{O}$' },
    { term: '화학식', def: '원소 기호와 숫자로 물질을 나타낸 식이에요. 원소 기호 오른쪽 아래 숫자는 원자 수, 앞의 숫자는 분자 수예요.' },
    { term: '이온', def: '원자가 전자를 잃거나 얻어 전하를 띠게 된 입자예요. 전자를 잃으면 양이온(+), 얻으면 음이온(−)이 돼요. 예: $\\mathrm{Na}^{+}$, $\\mathrm{Cl}^{-}$' },
  ],

  practice: [
    {
      id: 'p1', level: 1, type: 'choice', concept: 0,
      q: '원소 기호 Na가 나타내는 원소는 무엇일까요?',
      choices: ['나트륨', '질소', '네온', '니켈'],
      answer: 0,
      why: ['', '질소의 원소 기호는 N이에요.', '네온의 원소 기호는 Ne예요.', '니켈의 원소 기호는 Ni예요.'],
      explain: 'Na는 나트륨(소듐)이에요. 나트륨의 라틴어 이름 natrium에서 따왔어요.',
    },
    {
      id: 'p2', level: 1, type: 'choice', concept: 0,
      q: '구리의 원소 기호를 바르게 쓴 것은 무엇일까요?',
      choices: ['Cu', 'CU', 'Ca', 'C'],
      answer: 0,
      why: ['', '두 글자 원소 기호의 둘째 글자는 소문자로 써요.', 'Ca는 칼슘의 원소 기호예요.', 'C는 탄소의 원소 기호예요.'],
      explain: '구리의 원소 기호는 Cu예요. 첫 글자는 대문자, 둘째 글자는 소문자로 써요.',
    },
    {
      id: 'p3', level: 1, type: 'ox', concept: 0,
      q: '물은 전기 분해하면 수소와 산소로 나뉘므로 원소가 아니라 화합물이에요.',
      answer: true,
      explain: '다른 물질로 분해되는 물질은 원소가 아니에요. 물은 수소와 산소, 두 가지 원소가 결합한 화합물이에요.',
    },
    {
      id: 'p4', level: 1, type: 'choice', concept: 1,
      q: '원자핵을 이루는 입자를 바르게 짝지은 것은 무엇일까요?',
      choices: ['양성자와 중성자', '양성자와 전자', '중성자와 전자', '전자만'],
      answer: 0,
      why: ['', '전자는 원자핵 주위를 움직이는 입자예요. 원자핵 속에는 중성자가 있어요.', '전자는 원자핵 바깥에 있고, 원자핵 속에는 양성자가 있어요.', '전자는 원자핵 바깥에 있어요.'],
      explain: '원자핵은 (+)전하를 띠는 양성자와 전하가 없는 중성자로 이루어져 있어요. 전자는 원자핵 주위를 움직여요.',
    },
    {
      id: 'p5', level: 1, type: 'choice', concept: 1,
      q: '원소의 종류를 결정하는 것은 무엇일까요?',
      choices: ['양성자 수', '중성자 수', '전자 수', '원자의 크기'],
      answer: 0,
      why: ['', '중성자 수가 달라도 양성자 수가 같으면 같은 원소예요.', '이온이 되어 전자 수가 바뀌어도 원소의 종류는 그대로예요.', '원소의 종류는 원자핵 속 양성자 수로 정해져요.'],
      explain: '원소의 종류는 원자핵 속 양성자 수로 정해져요. 양성자 수가 곧 원자 번호예요.',
    },
    {
      id: 'p6', level: 1, type: 'choice', concept: 2,
      q: '주기율표의 세로줄을 무엇이라고 할까요?',
      choices: ['족', '주기', '원자 번호', '화학식'],
      answer: 0,
      why: ['', '주기는 주기율표의 가로줄이에요.', '원자 번호는 원소마다 붙은 번호로, 양성자 수예요.', '화학식은 물질을 원소 기호와 숫자로 나타낸 식이에요.'],
      explain: '주기율표의 세로줄은 족, 가로줄은 주기예요. 같은 족 원소는 화학적 성질이 비슷해요.',
    },
    {
      id: 'p7', level: 2, type: 'choice', concept: 2,
      q: '어떤 원소 X는 칼로 쉽게 잘릴 만큼 무른 금속이고, 물과 격렬하게 반응하여 수소 기체를 내놓아요. 반응한 뒤의 수용액은 염기성이에요. X와 같은 족에 속할 것으로 예상되는 원소는 무엇일까요?',
      choices: ['칼륨', '헬륨', '마그네슘', '염소'],
      answer: 0,
      why: [
        '',
        '헬륨은 18족 원소로, 다른 물질과 거의 반응하지 않아요.',
        '마그네슘은 2족 원소예요. 이런 성질을 보이는 것은 1족 원소예요.',
        '염소는 금속이 아닌 17족 원소예요.',
      ],
      hint: '설명한 성질은 몇 족 원소의 성질인지 먼저 떠올려 보세요.',
      explain: '무르고 물과 격렬하게 반응해 수소 기체를 내는 금속은 1족 원소(리튬, 나트륨, 칼륨 …)의 성질이에요. 같은 족 원소는 성질이 비슷하므로 칼륨이 알맞아요.',
    },
    {
      id: 'p8', level: 1, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '물($\\mathrm{H}_{2}\\mathrm{O}$) 분자 1개를 이루는 원자는 모두 몇 개일까요?',
      answer: '3',
      wrong: [{ a: '2', why: '산소 원자를 빠뜨렸어요. O 옆에는 1이 생략되어 있어요.' }],
      explain: '$\\mathrm{H}_{2}\\mathrm{O}$에는 수소 원자 2개와 산소 원자 1개가 있어요. 모두 $2+1=3$개예요.',
    },
    {
      id: 'p9', level: 2, type: 'choice', concept: 4,
      q: '나트륨 원자가 나트륨 이온($\\mathrm{Na}^{+}$)이 될 때 변하는 것은 무엇일까요?',
      choices: ['전자 수', '양성자 수', '원소의 종류', '중성자 수'],
      answer: 0,
      why: [
        '',
        '이온이 될 때 양성자 수는 변하지 않아요. 양성자 수가 바뀌면 다른 원소가 돼요.',
        '양성자 수가 그대로이니 원소의 종류도 그대로 나트륨이에요.',
        '이온이 될 때 원자핵 속 입자는 변하지 않아요.',
      ],
      hint: '이온은 원자가 무엇을 잃거나 얻어서 생기는지 떠올려 보세요.',
      explain: '나트륨 원자는 전자 1개를 잃고 나트륨 이온이 돼요. 원자핵 속 양성자와 중성자는 그대로이고 전자 수만 11개에서 10개로 줄어요.',
    },
    {
      id: 'p10', level: 1, type: 'choice', concept: 4,
      q: '염화 이온을 바르게 나타낸 이온식은 무엇일까요?',
      choices: ['$\\mathrm{Cl}^{-}$', '$\\mathrm{Cl}^{+}$', '$\\mathrm{Cl}_{2}$', '$\\mathrm{C}^{-}$'],
      answer: 0,
      why: [
        '',
        '염소 원자는 전자를 얻어 음이온이 돼요. (−)를 써요.',
        '$\\mathrm{Cl}_{2}$는 염소 원자 2개로 된 염소 분자의 화학식이에요.',
        'C는 탄소의 원소 기호예요. 염소는 Cl이에요.',
      ],
      explain: '염소 원자가 전자 1개를 얻으면 염화 이온이 돼요. 전하의 크기 1은 쓰지 않아요. 이온식: $\\mathrm{Cl}^{-}$',
    },
    {
      id: 'p11', level: 2, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '$3\\mathrm{CO}_{2}$에 들어 있는 산소 원자는 모두 몇 개일까요?',
      answer: '6',
      wrong: [
        { a: '2', why: '분자 1개에 든 산소 원자만 셌어요. 앞의 3은 분자가 3개라는 뜻이에요.' },
        { a: '9', why: '탄소 원자까지 모두 센 전체 원자 수예요. 문제는 산소 원자만 물어요.' },
        { a: '5', why: '3과 2를 더했어요. 분자 3개에 산소 원자가 2개씩 있으니 곱해요.' },
      ],
      hint: '분자 1개에 산소 원자가 몇 개인지 먼저 세어 보세요.',
      explain: '$\\mathrm{CO}_{2}$ 분자 1개에는 산소 원자가 2개 있어요. 분자가 3개이므로 산소 원자는 $2 \\times 3=6$개예요.',
    },
    {
      id: 'p12', level: 2, type: 'choice', concept: 5,
      q: '질산 칼륨 수용액을 적신 거름종이 가운데에 보라색의 과망가니즈산 칼륨 수용액을 떨어뜨리고 전압을 걸었더니 보라색이 (+)극 쪽으로 이동했어요. 그 까닭으로 알맞은 것은 무엇일까요?',
      choices: [
        '보라색을 띠는 이온이 (−)전하를 띠기 때문',
        '보라색을 띠는 이온이 (+)전하를 띠기 때문',
        '보라색을 띠는 입자가 전하를 띠지 않기 때문',
        '질산 칼륨이 보라색 입자를 밀어내기 때문',
      ],
      answer: 0,
      why: [
        '',
        '(+)전하를 띤 이온은 (−)극 쪽으로 끌려가요. 같은 전하끼리는 밀어내요.',
        '전하를 띠지 않으면 전압을 걸어도 한쪽으로 끌려가지 않아요.',
        '질산 칼륨 수용액은 전류가 잘 흐르게 해 주는 역할을 해요.',
      ],
      hint: '서로 다른 전하끼리 끌어당긴다는 것을 떠올려 보세요.',
      explain: '보라색을 띠는 과망가니즈산 이온($\\mathrm{MnO}_{4}^{-}$)은 (−)전하를 띠는 음이온이라서 반대 전하인 (+)극 쪽으로 끌려가요.',
    },
  ],

  advanced: [
    {
      id: 'a1', level: 3, type: 'short', check: 'number', unit: '개', concept: 4,
      q: '어떤 원소 X의 원자가 전자 2개를 얻어 $\\mathrm{X}^{2-}$ 이온이 되었어요. 이 이온의 전자가 18개일 때, X의 양성자 수는 몇 개일까요?',
      answer: '16',
      wrong: [
        { a: '20', why: '전자를 얻은 것을 잃은 것으로 거꾸로 계산했어요. 전자를 2개 얻어 18개가 되었으니 원래 전자는 16개예요.' },
        { a: '18', why: '이온의 전자 수를 그대로 썼어요. 원자 상태의 전자 수가 양성자 수와 같아요.' },
      ],
      hint: '이온이 되기 전, 원자 상태일 때 전자는 몇 개였을까요?',
      explain: '전자 2개를 얻어 18개가 되었으니 원자 상태일 때 전자는 $18-2=16$개예요. 원자는 양성자 수와 전자 수가 같으므로 양성자 수는 16개예요. (양성자 16개인 원소는 황이고, 이 이온은 황화 이온($\\mathrm{S}^{2-}$)이에요.)',
    },
    {
      id: 'a2', level: 3, type: 'choice', concept: 4,
      q: '표는 입자 A~D의 양성자 수와 전자 수예요. 설명으로 옳은 것은 무엇일까요?\n\n| 입자 | A | B | C | D |\n|---|---|---|---|---|\n| 양성자 수 | 9 | 11 | 10 | 9 |\n| 전자 수 | 10 | 10 | 10 | 9 |',
      choices: ['A와 D는 같은 원소예요.', 'B는 음이온이에요.', 'C는 양이온이에요.', 'A는 양이온이에요.'],
      answer: 0,
      why: [
        '',
        'B는 양성자 11개, 전자 10개로 (+)가 더 많아요. 양이온이에요.',
        'C는 양성자 수와 전자 수가 같아 전기적으로 중성인 원자예요.',
        'A는 전자가 양성자보다 1개 많아 (−)전하를 띠는 음이온이에요.',
      ],
      hint: '원소의 종류는 양성자 수로, 전하는 양성자 수와 전자 수의 차이로 판단해요.',
      explain: 'A와 D는 양성자 수가 9로 같으므로 같은 원소예요(플루오린). A는 전자가 하나 더 많은 음이온($\\mathrm{F}^{-}$), D는 중성 원자예요. B는 양이온, C는 중성 원자예요.',
    },
    {
      id: 'a3', level: 3, type: 'short', check: 'number', unit: '개', concept: 3,
      q: '$2\\mathrm{NH}_{3}$와 $3\\mathrm{H}_{2}\\mathrm{O}$에 들어 있는 수소 원자를 모두 합하면 몇 개일까요?',
      answer: '12',
      wrong: [
        { a: '5', why: '분자 1개씩에 든 수소 원자만 더했어요. 앞의 큰 숫자(분자 수)를 곱해요.' },
        { a: '10', why: '분자 수와 수소 원자 수를 곱하지 않고 모두 더했어요. 분자 수 × 분자 1개의 수소 원자 수로 계산해요.' },
      ],
      hint: '각 물질에서 수소 원자 수를 따로 구한 뒤 더해 보세요.',
      explain: '$2\\mathrm{NH}_{3}$에는 수소 원자가 $3 \\times 2=6$개, $3\\mathrm{H}_{2}\\mathrm{O}$에는 $2 \\times 3=6$개 있어요. 모두 $6+6=12$개예요.',
    },
    {
      id: 'a4', level: 3, type: 'choice', concept: 5,
      q: '파란색의 황산 구리(Ⅱ) 수용액과 보라색의 과망가니즈산 칼륨 수용액으로 이온의 이동 실험을 하다가, 전원 장치의 (+)극과 (−)극 연결을 서로 바꾸었어요. 이때 일어나는 일로 옳은 것은 무엇일까요?',
      choices: [
        '파란색은 새로 (−)극이 된 쪽으로, 보라색은 새로 (+)극이 된 쪽으로 이동해요.',
        '파란색과 보라색 모두 처음과 같은 방향으로 계속 이동해요.',
        '파란색과 보라색이 같은 방향으로 함께 이동해요.',
        '전극을 바꾸면 이온이 전하를 잃어 더 이상 움직이지 않아요.',
      ],
      answer: 0,
      why: [
        '',
        '이온은 극의 위치가 아니라 전하의 종류에 따라 움직여요. 극이 바뀌면 방향도 바뀌어요.',
        '구리 이온은 (+), 과망가니즈산 이온은 (−)라서 언제나 서로 반대쪽으로 움직여요.',
        '극을 바꾸어도 이온의 전하는 그대로예요.',
      ],
      hint: '양이온과 음이온은 각각 어떤 극으로 끌려가는지 생각해 보세요.',
      explain: '구리 이온($\\mathrm{Cu}^{2+}$)은 언제나 (−)극으로, 과망가니즈산 이온($\\mathrm{MnO}_{4}^{-}$)은 언제나 (+)극으로 끌려가요. 연결을 바꾸면 극의 위치가 바뀌므로 두 색의 이동 방향도 처음과 반대가 돼요.',
    },
    {
      id: 'a5', level: 3, type: 'choice', concept: 2,
      q: '수소는 헬륨보다 가벼운 기체인데도 사람이 많은 곳에서 띄우는 풍선에는 주로 헬륨을 넣어요. 그 까닭으로 가장 알맞은 것은 무엇일까요?',
      choices: [
        '헬륨은 18족 원소라서 다른 물질과 거의 반응하지 않아 불이 붙지 않기 때문',
        '헬륨은 1족 원소라서 물과 잘 반응하기 때문',
        '헬륨은 공기보다 무거워서 풍선이 천천히 올라가기 때문',
        '헬륨은 화합물이라서 분해되지 않기 때문',
      ],
      answer: 0,
      why: [
        '',
        '헬륨은 1족이 아니라 18족 원소예요. 1족 원소는 금속이에요.',
        '헬륨은 공기보다 가벼워서 풍선을 띄울 수 있어요.',
        '헬륨은 원소예요. 화합물이 아니에요.',
      ],
      hint: '18족 원소의 성질을 떠올려 보세요.',
      explain: '수소는 공기 중에서 불이 붙으면 폭발하듯 탈 수 있어 위험해요. 헬륨은 18족 원소로 다른 물질과 거의 반응하지 않아 불이 붙지 않으므로 안전하게 쓸 수 있어요.',
    },
  ],

  deeper: [
    {
      title: '원소를 찾아낸 사람들',
      body: '옛날 그리스의 아리스토텔레스는 모든 물질이 물·불·흙·공기 네 가지로 이루어진다고 생각했어요. 이 생각은 2000년 가까이 이어졌어요.\n\n1700년대 후반 프랑스의 **라부아지에**는 뜨겁게 달군 철 관에 물을 흘려 보내 물이 분해되며 수소 기체가 생기는 것을 보여 주었어요. 물이 다른 물질로 나뉜다는 것은 물이 원소가 아니라는 뜻이었지요.\n\n1869년 러시아의 **멘델레예프**는 그때까지 알려진 원소들을 성질에 따라 표로 정리하면서, 아직 발견되지 않은 원소의 자리를 빈칸으로 남기고 그 성질을 예상했어요. 뒤에 실제로 그 원소들(갈륨, 저마늄 등)이 발견되어 예상이 맞았음이 확인되었어요. 오늘날의 주기율표는 원소를 원자 번호 순서로 배열해요.',
    },
    {
      title: '화학식에서 화학 반응식으로',
      body: '이 단원에서 배운 화학식은 중3에서 배우는 **화학 반응식**의 재료가 돼요. 예를 들어 물을 전기 분해하면 물 분자 2개에서 수소 분자 2개와 산소 분자 1개가 생기는데, 이것을 화학식으로 $2\\mathrm{H}_{2}\\mathrm{O} \\to 2\\mathrm{H}_{2}+\\mathrm{O}_{2}$처럼 나타내요.\n\n화살표 왼쪽과 오른쪽의 원자 수를 세어 보세요. 왼쪽은 수소 원자 4개, 산소 원자 2개이고, 오른쪽도 수소 원자 4개, 산소 원자 2개예요. 화학 반응이 일어나도 원자는 없어지거나 새로 생기지 않고 결합만 바뀌기 때문이에요.',
    },
  ],

  faq: [
    {
      q: '원소랑 원자는 뭐가 달라요?',
      a: '원소는 물질을 이루는 성분의 **종류**이고, 원자는 물질을 이루는 **입자** 하나하나예요. 예를 들어 물 분자 $\\mathrm{H}_{2}\\mathrm{O}$ 하나는 수소와 산소라는 **원소 2종류**로 되어 있고, 수소 원자 2개와 산소 원자 1개, 곧 **원자 3개**로 되어 있어요.',
    },
    {
      q: '나트륨이랑 소듐은 같은 거예요?',
      a: '네, 같은 원소예요. 원소 기호는 둘 다 Na예요. 대한화학회가 정한 이름은 소듐이지만, 오랫동안 써 온 나트륨이라는 이름도 함께 쓰여요. 칼륨과 포타슘(K)도 같은 원소예요.',
    },
    {
      q: '이온이 되면 다른 원소가 되나요?',
      a: '아니에요. 이온은 전자를 잃거나 얻어서 생기고, 원자핵 속 양성자 수는 그대로예요. 원소의 종류는 양성자 수로 정해지니 나트륨 이온도 여전히 나트륨이에요. 다만 전하를 띠어서 성질은 원자와 달라져요.',
    },
    {
      q: '1족 원소는 왜 석유 속에 보관해요?',
      a: '1족 원소(리튬, 나트륨, 칼륨 등)는 반응성이 아주 커서 공기 중의 산소나 수분과 쉽게 반응해요. 석유는 이 원소들과 반응하지 않으므로, 석유 속에 넣어 공기와 물이 닿지 않게 보관해요.',
    },
  ],

  mistakes: [
    '화학식 앞의 큰 숫자를 빠뜨리고 원자 수를 세는 실수 — $2\\mathrm{H}_{2}\\mathrm{O}$의 수소 원자는 2개가 아니라 $2 \\times 2=4$개예요.',
    '양이온은 양성자를 얻어서, 음이온은 양성자를 잃어서 생긴다고 생각하는 실수 — 이온이 될 때 변하는 것은 전자예요. 전자를 잃으면 양이온, 얻으면 음이온이에요.',
    '두 글자 원소 기호의 둘째 글자를 대문자로 쓰는 실수 — 코발트는 Co, CO는 일산화 탄소의 화학식이에요.',
  ],

  gens: [
    {
      id: 'ion-particles',
      level: 1,
      title: '이온의 양성자 수와 전자 수',
      make: function (R) {
        var atoms = [
          ['리튬', 'Li', 3, 1, '리튬 이온'], ['나트륨', 'Na', 11, 1, '나트륨 이온'], ['칼륨', 'K', 19, 1, '칼륨 이온'],
          ['마그네슘', 'Mg', 12, 2, '마그네슘 이온'], ['칼슘', 'Ca', 20, 2, '칼슘 이온'], ['알루미늄', 'Al', 13, 3, '알루미늄 이온'],
          ['플루오린', 'F', 9, -1, '플루오린화 이온'], ['염소', 'Cl', 17, -1, '염화 이온'], ['산소', 'O', 8, -2, '산화 이온'], ['황', 'S', 16, -2, '황화 이온'],
        ];
        var a = R.pick(atoms);
        var name = a[0], z = a[2], c = a[3], n = Math.abs(c);
        var act = c > 0 ? '잃어' : '얻어';
        var e = z - c;
        var askElectron = R.bool(0.7);
        var q = name + ' 원자는 양성자가 ' + z + '개예요. 이 원자가 전자 ' + n + '개를 ' + act + ' ' + a[4] + R.josa(a[4], '이/가') + ' 되었어요. ';
        if (askElectron) {
          return {
            type: 'short', check: 'number', unit: '개', concept: 4,
            q: q + '이 이온의 **전자**는 몇 개일까요?',
            answer: String(e),
            wrong: [
              { a: String(z + c), why: c > 0 ? '전자를 잃었는데 더했어요. 잃었으면 빼요.' : '전자를 얻었는데 뺐어요. 얻었으면 더해요.' },
              { a: String(z), why: '원자 상태의 전자 수예요. 이온이 되면서 전자 수가 바뀌었어요.' },
            ],
            explain: '원자 상태에서 전자는 양성자 수와 같은 ' + z + '개예요. 전자 ' + n + '개를 ' + (c > 0 ? '잃었으니 $' + z + '-' + n + '=' + e + '$' : '얻었으니 $' + z + '+' + n + '=' + e + '$') + '개예요.',
          };
        }
        return {
          type: 'short', check: 'number', unit: '개', concept: 4,
          q: q + '이 이온의 **양성자**는 몇 개일까요?',
          answer: String(z),
          wrong: [{ a: String(e), why: '전자 수를 구했어요. 이온이 될 때 양성자 수는 변하지 않아요.' }],
          explain: '이온이 될 때는 전자만 잃거나 얻고 원자핵 속 양성자 수는 변하지 않아요. 그래서 양성자는 그대로 ' + z + '개예요.',
        };
      },
    },
    {
      id: 'ion-formula',
      level: 2,
      title: '전자의 이동으로 이온식 고르기',
      make: function (R) {
        var atoms = [
          ['리튬', 'Li', 1, '리튬 이온'], ['나트륨', 'Na', 1, '나트륨 이온'], ['칼륨', 'K', 1, '칼륨 이온'],
          ['마그네슘', 'Mg', 2, '마그네슘 이온'], ['칼슘', 'Ca', 2, '칼슘 이온'], ['알루미늄', 'Al', 3, '알루미늄 이온'],
          ['플루오린', 'F', -1, '플루오린화 이온'], ['염소', 'Cl', -1, '염화 이온'], ['산소', 'O', -2, '산화 이온'], ['황', 'S', -2, '황화 이온'],
        ];
        var a = R.pick(atoms);
        var c = a[2], n = Math.abs(c);
        function ion(k) {
          var m = Math.abs(k);
          return '$\\mathrm{' + a[1] + '}^{' + (m === 1 ? '' : m) + (k > 0 ? '+' : '-') + '}$';
        }
        var correct = ion(c);
        var reasons = {};
        reasons[ion(-c)] = '전하의 부호를 거꾸로 썼어요. 전자를 잃으면 (+), 얻으면 (−)예요.';
        var others = [c + (c > 0 ? 1 : -1), c > 0 ? (c === 1 ? 2 : c - 1) : (c === -1 ? -2 : c + 1), -(c + (c > 0 ? 1 : -1))];
        others.forEach(function (k) {
          var s = ion(k);
          if (reasons[s]) return;
          reasons[s] = (k > 0) === (c > 0)
            ? '전하의 크기는 잃거나 얻은 전자의 수와 같아요. 전자 수를 다시 확인해 보세요.'
            : '부호와 크기를 모두 다시 확인해 보세요. 전자를 잃으면 (+), 얻으면 (−)이고, 크기는 잃거나 얻은 전자의 수예요.';
        });
        var pick = R.choices(correct, [ion(-c)].concat(others.map(ion)));
        return {
          type: 'choice', concept: 4,
          q: a[0] + ' 원자가 전자 ' + n + '개를 ' + (c > 0 ? '잃어' : '얻어') + ' 만들어진 이온을 바르게 나타낸 이온식은 무엇일까요?',
          choices: pick.choices,
          answer: pick.answer,
          why: pick.choices.map(function (x) { return x === correct ? '' : reasons[x]; }),
          explain: '전자 ' + n + '개를 ' + (c > 0 ? '잃으면 (+)전하가 ' : '얻으면 (−)전하가 ') + n + '만큼 많아져요. 그래서 원소 기호 오른쪽 위에 ' + (n === 1 ? '' : n) + (c > 0 ? '+' : '−') + '를 써서 나타내요: ' + correct + ' (' + a[3] + ')',
        };
      },
    },
    {
      id: 'formula-count',
      level: 2,
      title: '화학식에서 원자 수 세기',
      make: function (R) {
        var NAME = { H: '수소', O: '산소', C: '탄소', N: '질소', Cl: '염소' };
        var mols = [
          ['물', [['H', 2], ['O', 1]]], ['이산화 탄소', [['C', 1], ['O', 2]]], ['암모니아', [['N', 1], ['H', 3]]],
          ['메테인', [['C', 1], ['H', 4]]], ['산소', [['O', 2]]], ['수소', [['H', 2]]], ['질소', [['N', 2]]],
          ['과산화 수소', [['H', 2], ['O', 2]]], ['일산화 탄소', [['C', 1], ['O', 1]]], ['염화 수소', [['H', 1], ['Cl', 1]]],
        ];
        var m = R.pick(mols);
        var k = R.int(2, 5);
        var tex = m[1].map(function (p) { return '\\mathrm{' + p[0] + '}' + (p[1] > 1 ? '_{' + p[1] + '}' : ''); }).join('');
        var per = 0;
        m[1].forEach(function (p) { per += p[1]; });
        var askAll = m[1].length === 1 ? false : R.bool(0.4);
        var q, ans, one, ex;
        if (askAll) {
          ans = per * k; one = per;
          q = '$' + k + tex + '$에 들어 있는 원자는 모두 몇 개일까요?';
          ex = m[0] + ' 분자 1개를 이루는 원자는 ' + m[1].map(function (p) { return NAME[p[0]] + ' ' + p[1] + '개'; }).join(', ') + '로 모두 ' + per + '개예요. 분자가 ' + k + '개이므로 $' + per + ' \\times ' + k + '=' + ans + '$개예요.';
        } else {
          var el = R.pick(m[1]);
          one = el[1]; ans = el[1] * k;
          q = '$' + k + tex + '$에 들어 있는 ' + NAME[el[0]] + ' 원자는 모두 몇 개일까요?';
          ex = m[0] + ' 분자 1개에는 ' + NAME[el[0]] + ' 원자가 ' + one + '개 있어요. 앞의 ' + k + R.josa(k, '은/는') + ' 분자 수이므로 $' + one + ' \\times ' + k + '=' + ans + '$개예요.';
        }
        var wrong = [{ a: String(one), why: '분자 1개에 든 원자만 셌어요. 앞의 큰 숫자 ' + k + R.josa(k, '은/는') + ' 분자의 개수라서 곱해야 해요.' }];
        if (k + one !== ans) wrong.push({ a: String(k + one), why: '분자 수와 원자 수를 더했어요. 분자 수 × 분자 1개의 원자 수로 계산해요.' });
        return {
          type: 'short', check: 'number', unit: '개', concept: 3,
          q: q,
          answer: String(ans),
          wrong: wrong,
          hint: '분자 1개에 든 원자 수를 먼저 세고, 앞의 숫자(분자 수)를 곱해요.',
          explain: ex,
        };
      },
    },
  ],
});
