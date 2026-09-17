/**
 * ui.js
 * ─────────────────────────────────────────────────────────────────────
 * 각 화면의 HTML을 생성하고 #app 요소에 렌더링합니다.
 * Builds HTML for each screen and injects it into #app.
 *
 * 의존성: router.js (SCREENS, getCurrentScreen, canGoBack)
 *         app.js    (t  — 손님 언어 번역 객체 반환 함수)
 *                   (ts — 직원 언어 번역 객체 반환 함수, 작은 해석용)
 *                   (tsUI, getLang, getStaffLang)
 *         messages.js (LANGUAGES, STAFF_LANGUAGES)
 *         speech.js (speakScreen — 화면 전환 시 음성 안내)
 *
 * ★ 화면에는 두 가지 글이 함께 나옵니다.
 *   - 크게 보이는 글: 손님 언어. 음성으로도 읽어줍니다.
 *   - 그 아래 작은 회색 글: 직원 언어 해석(.sub-label). 손님이 어떤 버튼을
 *     눌렀는지 직원이 알 수 있게 하려는 것이라 음성으로는 읽지 않습니다.
 *     두 언어가 같으면 중복이므로 표시하지 않습니다.
 * ─────────────────────────────────────────────────────────────────────
 */

// ── 메인 렌더 디스패처 ────────────────────────────────────────────────
/**
 * 현재 화면 상태를 읽어 해당 화면을 렌더링합니다.
 * router.js의 navigate / goBack / goHome 에서 호출됩니다.
 */
function renderCurrentScreen() {
  const screen = getCurrentScreen();
  const appEl  = document.getElementById('app');

  // 화면별 HTML 빌더 매핑
  const builders = {
    [SCREENS.STAFF_SELECT]: buildStaffSelect,
    [SCREENS.LANG_SELECT] : buildLangSelect,
    [SCREENS.SCREEN2]     : buildScreen2,
    [SCREENS.SCREEN3A]    : buildScreen3A,
    [SCREENS.SCREEN3B]    : buildScreen3B,
    [SCREENS.SCREEN3C]    : buildScreen3C,
    [SCREENS.SCREEN3D]    : buildScreen3D,
  };

  const builder = builders[screen];
  if (builder) {
    // innerHTML 교체 → CSS animation(.screen)이 자동으로 재생됩니다.
    // 주의: 여기에 삽입되는 모든 텍스트는 messages.js에서 온 신뢰된 데이터입니다.
    appEl.innerHTML = builder();
    // 화면이 바뀔 때마다 안내 문구를 음성으로 읽어줍니다. (speech.js)
    speakScreen(screen);
  }
}

// ── 공통: 내비게이션 바 (뒤로가기 + 처음으로) ────────────────────────
/**
 * 화면 상단에 표시되는 내비게이션 버튼 바를 만듭니다.
 * 언어 선택 화면에서는 사용하지 않습니다.
 */
function buildNavBar() {
  const tr  = t();
  const trS = ts();
  return `
    <nav class="nav-bar" role="navigation">
      ${canGoBack()
        ? `<button class="nav-btn" data-action="back" aria-label="back">
             ${escHtml(tr.nav.back)}${staffSub(trS.nav.back, 'sub-label--nav')}
           </button>`
        : '<div></div>'}
      <button class="nav-btn nav-btn-home" data-action="home" aria-label="home">
        ${escHtml(tr.nav.home)}${staffSub(trS.nav.home, 'sub-label--nav')}
      </button>
    </nav>`;
}

// ── 화면 0: 직원 언어 선택 ───────────────────────────────────────────
// 앱을 처음 쓸 때 직원이 자기 언어를 고르는 화면입니다. 여기서 고른 언어가
// 이후 손님용 화면의 작은 해석 문구에 쓰입니다. 한 번 고르면 기기에 저장돼
// 다음에 앱을 열 때는 이 화면을 건너뜁니다(app.js).
// 아직 직원 언어를 모르는 화면이므로, 제목은 직원 언어들의 '직원' 단어를
// 나란히 보여줍니다. (직원 · Staff · 员工 · কর্মী · Funcionário)
function buildStaffSelect() {
  const title = STAFF_LANGUAGES
    .map(lang => STAFF_UI[lang.code].staffLabel)
    .join(' · ');

  // 버튼이 홀수 개면 마지막 버튼이 한 칸만 차지해 허전하므로 두 칸으로 넓힙니다.
  const lastSpansTwo = STAFF_LANGUAGES.length % 2 === 1;

  const buttons = STAFF_LANGUAGES.map((lang, index) => {
    const isLast = index === STAFF_LANGUAGES.length - 1;
    const wide   = lastSpansTwo && isLast ? ' lang-btn--wide' : '';
    return `
    <button class="lang-btn${wide}" data-action="select-staff-lang" data-lang="${lang.code}">
      <img class="lang-flag-img" src="${escHtml(lang.img)}" alt="" aria-hidden="true" />
      <span class="lang-name">${escHtml(lang.name)}</span>
    </button>`;
  }).join('');

  return `
    <div class="screen lang-screen">
      <p class="staff-title">${escHtml(title)}</p>
      <div class="lang-grid" role="list">
        ${buttons}
      </div>
    </div>`;
}

// ── 화면 1: 손님 언어 선택 ───────────────────────────────────────────
// 손님에게 보여주는 화면입니다. 각 언어 버튼 아래에 그 언어의 이름을 직원
// 언어로 작게 달아, 손님이 무엇을 골랐는지 직원도 바로 알 수 있게 합니다.
// (예: 직원이 한국어면 '中文' 버튼 아래에 '중국어')
function buildLangSelect() {
  const staffUI = tsUI();

  // 국기 이미지를 버튼 배경에 옅게 깔고, 언어명은 전면에 표시합니다.
  const buttons = LANGUAGES.map(lang => {
    const staffName = staffUI.langNames[lang.code];
    // 표기가 똑같으면(직원 언어 = 그 언어) 중복이라 해석을 달지 않습니다.
    const sub = staffName && staffName !== lang.name
      ? `<span class="sub-label sub-label--lang">${escHtml(staffName)}</span>`
      : '';
    return `
    <button class="lang-btn" data-action="select-lang" data-lang="${lang.code}">
      <img class="lang-flag-img" src="${escHtml(lang.img)}" alt="" aria-hidden="true" />
      <span class="lang-name">${escHtml(lang.name)}</span>
      ${sub}
    </button>`;
  }).join('');

  return `
    <div class="screen lang-screen">
      <div class="staff-bar">
        <p class="staff-prompt">${escHtml(staffUI.guestPrompt)}</p>
        <button class="staff-lang-btn" data-action="change-staff-lang">
          ${escHtml(staffUI.staffLabel)}: ${escHtml(currentStaffLangName())} ⇄
        </button>
      </div>
      <div class="lang-grid" role="list">
        ${buttons}
      </div>
    </div>`;
}

// ── 화면 2: 체크아웃 안내 + 버튼 4개 ─────────────────────────────────
// 각 버튼 안의 btn-progress-track/fill: 버튼을 누르면 화면은 그대로 두고
// app.js가 이 안에 그 버튼 문구 음성의 재생 진행률을 채워 넣습니다
// (평소엔 숨김 상태). 음성이 끝나는 순간 결과 화면으로 넘어갑니다.
function buildScreen2() {
  const s2  = t().screen2;
  const s2S = ts().screen2; // 같은 버튼 문구의 직원 언어판

  // label  : 손님이 읽는 문구 (크게, 음성으로도 읽힘)
  // subLabel: 그 아래 직원 언어 해석 (작게, 음성 없음)
  const choiceButton = (action, cls, label, subLabel) => `
    <button class="action-btn ${cls}" data-action="${action}">
      <span class="btn-label">${escHtml(label)}</span>
      ${staffSub(subLabel)}
      <span class="btn-progress-track" data-role="progress-track">
        <span class="btn-progress-fill" data-role="progress-fill"></span>
      </span>
    </button>`;

  return `
    <div class="screen">
      ${buildNavBar()}
      <div class="card">
        <p class="message-text">${nl2br(escHtml(s2.message))}</p>
        ${staffSub(s2S.message, 'sub-label--message')}
      </div>
      <div class="btn-group" role="group">
        ${choiceButton('btn1', 'btn-green',  s2.btn1, s2S.btn1)}
        ${choiceButton('btn4', 'btn-purple', s2.btn4, s2S.btn4)}
        ${choiceButton('btn2', 'btn-blue',   s2.btn2, s2S.btn2)}
        ${choiceButton('btn3', 'btn-orange', s2.btn3, s2S.btn3)}
      </div>
    </div>`;
}

// ── 화면 3A: 버튼1 결과 — 감사합니다 ──────────────────────────────────
function buildScreen3A() {
  const tr = t();

  return `
    <div class="screen screen-center">
      ${buildNavBar()}
      <div class="card card-center response-card response-card--green">
        <span class="response-emoji" aria-hidden="true">🙏</span>
        <p class="response-text response-text--large">
          ${nl2br(escHtml(tr.screen3a.message))}
        </p>
        ${staffSub(ts().screen3a.message)}
      </div>
    </div>`;
}

// ── 화면 3B: 버튼2 결과 — 연장 안내 ──────────────────────────────────
function buildScreen3B() {
  const s3b  = t().screen3b;
  const s3bS = ts().screen3b; // 직원 언어판

  // 불릿 아이템 목록 HTML. 각 항목 아래에 같은 순서의 직원 언어 해석을 답니다.
  const bulletItems = s3b.bullets.map((bullet, index) => `
    <li class="bullet-item">
      <span class="bullet-dash" aria-hidden="true">-</span>
      <span>
        ${escHtml(bullet)}
        ${staffSub(s3bS.bullets[index])}
      </span>
    </li>`).join('');

  return `
    <div class="screen">
      ${buildNavBar()}
      <div class="card">
        <p class="response-intro">${nl2br(escHtml(s3b.intro))}</p>
        ${staffSub(s3bS.intro)}
        <ul class="bullet-box" role="list">
          ${bulletItems}
        </ul>
        <p class="response-outro">${escHtml(s3b.outro)}</p>
        ${staffSub(s3bS.outro)}
      </div>
    </div>`;
}

// ── 화면 3C: 버튼3 결과 — 날짜 착오 ──────────────────────────────────
function buildScreen3C() {
  const tr = t();

  return `
    <div class="screen screen-center">
      ${buildNavBar()}
      <div class="card card-center response-card response-card--orange">
        <span class="response-emoji" aria-hidden="true">🙇</span>
        <p class="response-text">
          ${nl2br(escHtml(tr.screen3c.message))}
        </p>
        ${staffSub(ts().screen3c.message)}
      </div>
    </div>`;
}

// ── 화면 3D: 버튼4 결과 — 다른 방 이동 안내 ───────────────────────────
function buildScreen3D() {
  const s3d  = t().screen3d;
  const s3dS = ts().screen3d; // 직원 언어판

  return `
    <div class="screen screen-center">
      ${buildNavBar()}
      <div class="card card-center response-card response-card--purple">
        <span class="response-emoji" aria-hidden="true">🚪</span>
        <p class="response-text response-text--large">
          ${nl2br(escHtml(s3d.message))}
        </p>
        ${staffSub(s3dS.message)}
        <p class="response-note">${escHtml(s3d.note)}</p>
        ${staffSub(s3dS.note)}
      </div>
    </div>`;
}

// ── 직원 언어 해석 ────────────────────────────────────────────────────

/**
 * 손님용 문구 아래에 붙는 작은 직원 언어 해석 한 덩어리를 만듭니다.
 * 손님 언어와 직원 언어가 같으면 똑같은 문장이 두 번 나오는 셈이라
 * 빈 문자열을 반환해 아무것도 표시하지 않습니다.
 *
 * 이 문구는 화면에만 표시되고 음성으로는 읽지 않습니다. 읽어줄 문구는
 * speech.js가 손님 언어(t())에서 따로 가져갑니다.
 *
 * @param {string} staffText - ts()에서 가져온 직원 언어 문구
 * @param {string} [extraClass] - 자리에 맞춰 크기를 조절하는 추가 클래스
 * @returns {string} HTML 문자열 (표시하지 않을 때는 '')
 */
function staffSub(staffText, extraClass) {
  if (!staffText || getStaffLang() === getLang()) return '';
  const cls = extraClass ? ' ' + extraClass : '';
  return `<span class="sub-label${cls}">${nl2br(escHtml(staffText))}</span>`;
}

/**
 * 현재 직원 언어의 표기 이름(예: '한국어', 'Português')을 반환합니다.
 * 손님 언어 선택 화면의 '직원 언어 바꾸기' 버튼에 표시합니다.
 * @returns {string}
 */
function currentStaffLangName() {
  const match = STAFF_LANGUAGES.find(lang => lang.code === getStaffLang());
  return match ? match.name : getStaffLang();
}

// ── 유틸리티 ──────────────────────────────────────────────────────────

/**
 * XSS 방지용 HTML 이스케이프.
 * messages.js의 데이터는 신뢰된 소스이지만, 미래의 동적 입력에 대비합니다.
 */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * 문자열의 \n 을 HTML <br> 태그로 변환합니다.
 * escHtml() 적용 이후에 사용해야 합니다.
 */
function nl2br(str) {
  return str.replace(/\n/g, '<br>');
}
