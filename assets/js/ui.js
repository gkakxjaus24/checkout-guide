/**
 * ui.js
 * ─────────────────────────────────────────────────────────────────────
 * 각 화면의 HTML을 생성하고 #app 요소에 렌더링합니다.
 * Builds HTML for each screen and injects it into #app.
 *
 * 의존성: router.js (SCREENS, getCurrentScreen, canGoBack)
 *         app.js    (t — 현재 언어 번역 객체 반환 함수)
 *         messages.js (LANGUAGES)
 *         speech.js (speakScreen — 화면 전환 시 음성 안내)
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
    [SCREENS.LANG_SELECT] : buildLangSelect,
    [SCREENS.SCREEN2]     : buildScreen2,
    [SCREENS.SCREEN3A]    : buildScreen3A,
    [SCREENS.SCREEN3B]    : buildScreen3B,
    [SCREENS.SCREEN3C]    : buildScreen3C,
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
  const tr = t();
  return `
    <nav class="nav-bar" role="navigation">
      ${canGoBack()
        ? `<button class="nav-btn" data-action="back" aria-label="back">
             ${escHtml(tr.nav.back)}
           </button>`
        : '<div></div>'}
      <button class="nav-btn nav-btn-home" data-action="home" aria-label="home">
        ${escHtml(tr.nav.home)}
      </button>
    </nav>`;
}

// ── 화면 1: 언어 선택 ─────────────────────────────────────────────────
function buildLangSelect() {
  // 국기 이미지를 버튼 배경에 옅게 깔고, 언어명은 전면에 표시합니다.
  const buttons = LANGUAGES.map(lang => `
    <button class="lang-btn" data-action="select-lang" data-lang="${lang.code}">
      <img class="lang-flag-img" src="${escHtml(lang.img)}" alt="" aria-hidden="true" />
      <span class="lang-name">${escHtml(lang.name)}</span>
    </button>`).join('');

  return `
    <div class="screen lang-screen">
      <div class="lang-grid" role="list">
        ${buttons}
      </div>
    </div>`;
}

// ── 화면 2: 체크아웃 안내 + 버튼 3개 ─────────────────────────────────
function buildScreen2() {
  const tr = t();
  const s2 = tr.screen2;

  return `
    <div class="screen">
      ${buildNavBar()}
      <div class="card">
        <p class="message-text">${nl2br(escHtml(s2.message))}</p>
      </div>
      <div class="btn-group" role="group">
        <button class="action-btn btn-green" data-action="btn1">
          ${escHtml(s2.btn1)}
        </button>
        <button class="action-btn btn-blue" data-action="btn2">
          ${escHtml(s2.btn2)}
        </button>
        <button class="action-btn btn-orange" data-action="btn3">
          ${escHtml(s2.btn3)}
        </button>
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
      </div>
    </div>`;
}

// ── 화면 3B: 버튼2 결과 — 연장 안내 ──────────────────────────────────
function buildScreen3B() {
  const tr  = t();
  const s3b = tr.screen3b;

  // 불릿 아이템 목록 HTML
  const bulletItems = s3b.bullets.map(bullet => `
    <li class="bullet-item">
      <span class="bullet-dash" aria-hidden="true">-</span>
      <span>${escHtml(bullet)}</span>
    </li>`).join('');

  return `
    <div class="screen">
      ${buildNavBar()}
      <div class="card">
        <p class="response-intro">${nl2br(escHtml(s3b.intro))}</p>
        <ul class="bullet-box" role="list">
          ${bulletItems}
        </ul>
        <p class="response-outro">${escHtml(s3b.outro)}</p>
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
      </div>
    </div>`;
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
